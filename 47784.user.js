// ==UserScript==
// @name           DA Automatic Age
// @namespace      DA-AutoAge
// @description    Automatically sets the date of birth/age so you don't get bothered by the Agegate nagscreen.
// @include        http://dragonage.bioware.com/agegate.html*
// @include        http://daforums.bioware.com/agegate.html*
// ==/UserScript==
document.getElementById("ageSelector_year").value=1980
document.body.appendChild(document.createElement("SCRIPT")).innerHTML="onAgeSelect()"