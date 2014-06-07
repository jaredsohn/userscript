// ==UserScript==
// @name          Odnoklassniki Clock
// @description   Odnoklassniki Clock
// @author        drakulaboy
// @include       http://odnoklassniki.ru/*
// @include       https://odnoklassniki.ru/*
// @include       http://*.odnoklassniki.ru/*
// @include       https://*.odnoklassniki.ru/*
// ==/UserScript==

if (window.top != window.self) return;

var box = document.createElement("div");
box.setAttribute("style", "bottom: 0; color:#fa7d0f; font-family:sans-serif; font-size:14pt; left:3; line-height:20px; position:fixed; text-align:center; z-index:999;");

document.body.appendChild(box);

function tick()
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
    var s = d.getSeconds();
	
	if (h < 10) h = "0" + h;
	if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
	
	box.innerHTML = h + ":" + m + ":" + s;
}

tick();
setInterval(tick, 1000);