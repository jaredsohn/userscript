// Last.fm Hide My-Radio Section
// version 1.0
// By zloh - http://www.subatomiq.com
// Last Updated: 2007-16-5
// Released to the public domain.
//
// ==UserScript==
// @name          Last.fm Hide My-Radio
// @description   Hides the horrible My Radio section eyesore
// @include       http*://*last.fm/*
// ==/UserScript==

(function () { //EDIT ME
	var newstyle = "#firstRadioStation {display:none !important;} "; //END EDIT ME

	var ss = document.createElement("style"); var t = document.createTextNode(newstyle); 
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]); ss.appendChild(t); root.appendChild(ss); })();