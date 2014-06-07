

// ==UserScript==
// @name		  Tuts+ Premium Link Generator
// @namespace	  
// @description   Go to the Tuts+ site and go down to "Download Source Files" to find the DL link.
// @version       1.0
// @include		*tutsplus.com/*
// @exclude	   
// ==/UserScript==
function UpdateTitle(){
alert("Test");
}

$("qrform").getElementsByTagName("submit").setAttribute('onChange', 'UpdateTitle()');