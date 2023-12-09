import initAttacker from "../exports/initAttacker.js";
import contentui from "../view/contentui.js";

var source = {};
source["LowerAlpha"]="abcdefghijklmnopqrstuvwxyz";
source["Num"]="1234567890";
source["UpperAlpha"]=source["LowerAlpha"].toUpperCase();
source["UpperAlphaNum"]=source["UpperAlpha"]+source["Num"];
source["UpperLowerAlpha"]=source["UpperAlpha"]+source["LowerAlpha"];
source["LowerAlphaNum"]=source["LowerAlpha"]+source["Num"];
source["UpperLowerAlphaNum"]=source["UpperLowerAlpha"]+source["Num"];

function formValidate() {
	var combination = document.querySelector("#combination"),
		length = document.querySelector("#length"),
		selector = document.querySelector("#selector");

	var comberror = combination.nextElementSibling;
	var lengtherror = length.nextElementSibling;
	var selectorerror = selector.nextElementSibling;

	comberror.innerHTML=lengtherror.innerHTML=selectorerror.innerHTML="";

	if (!+length.value) {
		lengtherror.innerHTML="OTP Length is required.";
	}
	else if (combination.value==0) {
		comberror.innerHTML="Please Select OTP Combination.";
	} else if (!selector.value) {
		selectorerror.innerHTML="Enter Target OTP Field CLASS/ID";
	} else {
		initAttacker({src: source[combination.value].split(""),
				length: +length.value, selector: selector.value});
	}
}

const executePopup = (parent, text, failure, close) => {
	var popup = document.createElement("div");
	var header = document.createElement("h1");
	failure && popup.classList.add("failure");
	header.innerHTML=text;
	popup.classList.add("popup");
	popup.appendChild(header);
	parent.appendChild(popup);
	window.setTimeout(function() {
		var haspopup = document.querySelector(".popup");
		haspopup && haspopup.remove();
		close && window.close();
	}, 2000);
};

const content = document.querySelector("#content");
content.innerHTML=contentui;
const button = document.querySelector("#btnattacker");

button.addEventListener("click", function() {
	formValidate();
});

export {executePopup, content};