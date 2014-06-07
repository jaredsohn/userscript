//
// ==UserScript==
// @name          MailRuDialogueExport
// @namespace     http://userscripts.org/
// @description   Exports whole dialogue with the user of the social network
// @author        SkyManPHP
// @include       http://my.mail.ru/my/*
// @version       0.0.5
// ==/UserScript==
//

window.console && console.log("Snippet loaded!!!");

var fileref = document.createElement('script');
fileref.setAttribute("type", "text/javascript");
fileref.setAttribute("src", "http://code.jquery.com/jquery-1.5.2.min.js");
fileref.onload = function() {
	window.console && console.log("jQuery is loaded!");
	
};
document.body.appendChild(fileref);
