// ==UserScript==
// @name			OKCupid Notes
// @namespace		okcupidnotes
// @description		Adds back 'Notes' button to OkCupid (Replacing the 'Buy A-List' button)
// @include			http://www.okcupid.com/profile/*
// @version			1.4
// ==/UserScript==

//	Based on http://userscripts.org/scripts/show/176001

var notes = document.createElement("div");

notes.innerHTML = '<button onclick="Profile.loadWindow(\'edit_notes\'); return false;" class="flatbutton white" id="notes_btn"> Notes </button>';
var upgrade = document.getElementById("unhide_btn");
upgrade.parentElement.insertBefore(notes,upgrade.nextSibling);
upgrade.parentElement.style.cssText='height: 100%;';