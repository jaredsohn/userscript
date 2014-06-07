// ==UserScript==
// @name          Gmail Plain HTML mode browser warning removal
// @namespace     http://youngerson.livejournal.com
// @description   removes "use supported browser" warning in the plain html mode of Gmail
// @include       http://mail.google.com/mail/h/*
// ==/UserScript==

var warning = document.getElementById("bm");
warning.style.display = "none";
