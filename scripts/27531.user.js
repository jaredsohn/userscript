// ==UserScript==
// @name           LJ Now
// @namespace      http://gecko.535design.com/grease/
// @description    Adds a "Now" link to the Date field.
// @include        http://www.livejournal.com/*
// ==/UserScript==

var uF;

function init() {
	uF = document.getElementById("updateForm");

	if (!uF) return; // not a post editor

	var a = document.createElement("a");
	a.style.backgroundColor = "transparent";
	a.style.color = "#00c";
	a.style.cursor = "pointer";
	a.style.fontSize = "85%";
	a.style.marginLeft = "5px";
	a.style.textDecoration = "underline";
	a.innerHTML = "Now";
	a.addEventListener("click", updateTime, false);

	document.getElementById("currentdate").insertBefore(a, document.getElementById("currentdate-edit"));
}

function updateTime() {
	var now = new Date();

	uF.elements.namedItem("date_ymd_mm").value   = now.getMonth() + 1;
	uF.elements.namedItem("date_ymd_dd").value   = now.getDate();
	uF.elements.namedItem("date_ymd_yyyy").value = now.getFullYear();
	uF.elements.namedItem("hour").value          = now.getHours();
	uF.elements.namedItem("min").value           = now.getMinutes();

	document.getElementById("currentdate-date").innerHTML = now.toLocaleFormat("%B %d, %Y, %H:%M");
}

init();