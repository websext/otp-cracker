var timer = {h:0, m:0, s:0}, teek, h, s, m;
export default function countdown() {
	timer.s++;
	timer.s > 60 && (timer.m++, timer.s=1);
	timer.m > 60 && (timer.h++, timer.m=0);
	timer.h >= 24 && (timer.h=1);

	teek = Object.values(timer);

	h = teek[0] < 10 ? "0" + teek[0] : teek[0];
	m = teek[1] < 10 ? "0" + teek[1] : teek[1];
	s = teek[2] < 10 ? "0" + teek[2] : teek[2];
	document.querySelector(".timestamp").textContent=`${h}:${m}:${s}`;
}