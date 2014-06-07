// ==UserScript==
// @name           Putlocker skip waiting
// @namespace      http://m0.to/
// @description    Skips waiting for videos and stuff.
// @include        http://www.putlocker.com/file/*
// @include        https://www.putlocker.com/file/*
// @include        http://www.sockshare.com/file/*
// @include        https://www.sockshare.com/file/*
// @version        1.01
// ==/UserScript==

if(document.getElementById("submitButton")){
	document.getElementById("submitButton").disabled = false;
	document.getElementById("submitButton").click();
}