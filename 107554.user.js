// ==UserScript==
// @name PTP Staff Inbox Change
// @namespace /
// @include http*://*passthepopcorn.me/*
// ==/UserScript==

document.getElementById('nav_staffinbox').style.display = "none";
document.getElementById('nav_inbox').innerHTML += " <a href='/staffpm.php'>(S)</a>";

