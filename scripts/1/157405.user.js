// ==UserScript==
// @name        Movpod-Daclips-Gorillavid Skip Countdown
// @namespace   MPS
// @include     http://movpod.in/*
// @include     http://daclips.in/*
// @include     http://gorillavid.in/*
// @version     1
// ==/UserScript==

if (document.getElementById("pre-download-block"))
	document.forms[1].submit();