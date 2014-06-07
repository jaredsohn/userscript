// ==UserScript==
// @name		Synchtube Auto Scroll Down
// @namespace	synchtube.com
// @version		1.0
// @description	Detects Auto Scrolls Down like its supposed to
// @include		http://www.synchtube.com/r/*
// @include		http://synchtube.com/r/*
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

function LocalMain() {
    window.setInterval("checkLeaderChange()", 1000);
    alert("Script active.");
}

function checkLeaderChange() {
var objDiv = document.getElementById("window");
objDiv.scrollTop = objDiv.scrollHeight;
return false;
}