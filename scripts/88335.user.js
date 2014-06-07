// ==UserScript==
// @name          monospace for gmail
// @namespace     http://okisan.net/
// @description	  monospace font for gmail
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

function monospacing(){
	var s = <><![CDATA[
		.ii,
		.editable{
			font-family:monospace!important;
			font-size:12px!important;
		}]]></>;
	GM_addStyle(s);
}

document.body.appendChild(monospacing());
