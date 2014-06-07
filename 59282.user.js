// ==UserScript==
// @name           K12 Name Changer
// @namespace      Nick_Ninja
// @include        https://totalviewstudent.k12.com/cgi-bin/WebObjects/TotalViewStudent.woa/*
// ==/UserScript==

GM_registerMenuCommand("Change welcome message", changewm);

var namearea = document.getElementById("welcomeMessage");
var welcomemsg = GM_getValue("k12namechangermessage", namearea.innerHTML);
namearea.innerHTML = welcomemsg;

function changewm() {
	GM_setValue('k12namechangermessage', prompt("Welcome message: ", GM_getValue('k12namechangermessage', namearea.innerHTML)));
	alert("Refresh page for changes to apply");
}
