// ==UserScript==
// @name       Mouse Position
// @version    0.1
// @description  Find your X and Y mouse position.
// @match      http://*/*
// @match      https://*/*
// ==/UserScript==
window.onload = init;
function init() {
	if (window.Event) {
	document.captureEvents(Event.MOUSEMOVE);
	}
	document.onmousemove = getCursorXY;
}
function getCursorXY(e) {
	document.getElementById('cursorX').value = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	document.getElementById('cursorY').value = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
}
var logo = document.createElement ("div");
logo.innerHTML = '<div class="" style="z-index:1; position: fixed; bottom: 6px; left: 6px"><font size="2" color="black">X-<input type="text" id="cursorX" size="2"><br>Y-<input type="text" id="cursorY" size="2"></font></div>';
document.body.insertBefore (logo, document.body.firstChild);