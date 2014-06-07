// ==UserScript==
// @name           Gmail Clock
// @namespace      DrNick
// @include        https://mail.google.com/*
// ==/UserScript==

if (window.top != window.self) return;

var box = document.createElement("div");
box.setAttribute("style", "bottom: 0; color:#C4DDE8; font-family:sans-serif; font-size:9pt; left:0; line-height:20px; position:fixed; text-align:center; z-index:999; text-shadow: black 0.1em 0.1em 1px;");

document.body.appendChild(box);

function tick()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	
	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
	
	box.innerHTML = h + ":" + m;
}

tick();
setInterval(tick, 5000);
