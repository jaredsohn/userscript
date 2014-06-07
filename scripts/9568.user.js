// Last.fm Hide My-Radio + Playlist Sections
// version 1.5
// By zloh - http://www.subatomiq.com
// Last Updated: 2007-31-5
// Released to the public domain.
//
// ==UserScript==
// @name          Last.fm Hide My-Radio + My-Playlist
// @description   Hides the horrible MyRadio section eyesore + the MyPlaylist sections 
// @include       http*://*last.fm/*
// ==/UserScript==

(function () { //EDIT ME
	var newstyle = "#firstRadioStation {display:none !important;}  #playlist  {display:none !important;} >"; //END EDIT ME

	var ss = document.createElement("style"); var t = document.createTextNode(newstyle); 
    var root = (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0]); ss.appendChild(t); root.appendChild(ss); })();