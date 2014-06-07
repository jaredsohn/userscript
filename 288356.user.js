// ==UserScript==
// @name        follow links in maplewood
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Automatically follow Maplewood links to grade entry form
// @include        https://hosting.maplewood.com/ON/Private/Rehoboth/Staff/viewer/Viewer/MainTe.aspx
// @include        https://hosting.maplewood.com/ON/Private/Rehoboth/Staff/viewer/Viewer/MeAc.aspx
// @exclude        https://hosting.maplewood.com/ON/Private/Rehoboth/Staff/viewer/Clsmgr/Markbook/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @grant       none
// @version     1
// ==/UserScript==


var links = document.getElementsByTagName('a');

var evt = document.createEvent("MouseEvents");
evt.initEvent("click", true, true);

for(var i = 0; i < links.length; ++i) {
	var a = links[i];
	if((a.title.indexOf("Work with class and student achievement") == 0) || (a.title.indexOf("View and edit markbook evaluation for a class.") == 0)) {
			a.dispatchEvent(evt);
	}
}
