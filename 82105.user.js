// ==UserScript==
// @name          Gmail FullScreen
// @description   View Gmail Inbox in Fullscreen mode
// @autor         1nfected
// @version       0.6.5
// @namespace     1nfected
// @license       CC by-nc-sa  http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*

// @require       http://www.betawarriors.com/bin/gm/57756user.js

// @history       0.6.5 Fixed for changes in Gmail.
// @history       0.6.2 Changed @require for updater to point to the betawarriors domain.
// ==/UserScript==


(function() {

var scriptid = 82105;
var version = '0.6.5';

var canvas = document.getElementById('canvas_frame');
if(canvas && canvas.contentDocument) var gmail = canvas.contentDocument;
if(!gmail) return;

var css = ".vI8oZc+.nH>.nH>.nH:first-child,.vI8oZc+.nH>.nH>.nH:first-child+div.nH>div>div:first-child,.vI8oZc+.nH>.nH>.nH:first-child+div.nH>.no>div:nth-child(2)>div:nth-child(2),table[class=\"Bs nH\"]>tr>.Bu:first-child,table[class=\"Bs nH\"]>tr>.Bu:nth-child(3),table[class=\"Bs nH\"]>tr>.Bu:nth-child(4),table[class=\"Bs nH\"]>tr>.Bu:nth-child(2) .ov{display:none}table.Bs,table.Bs.nH>tr>td:nth-child(2),table.Bs.nH>tr>td:nth-child(2) .l.m .no,table.Bs.nH>tr>td:nth-child(2) .l.m .no .nH.nn,table.iY>tr>td:first-child,.vI8oZc+.nH>.nH>.nH:first-child+div .no,.vI8oZc+.nH>.nH>.nH:first-child+div .no>.nH:nth-child(2){width:100%!important}.vI8oZc+.nH>.nH>.nH>.no>div+div>div:first-child{margin-right:0!important}";

gmail.addEventListener('keydown', function(event) {
	if(!event.cltrKey && event.shiftKey && event.which == 123) { // SHIFT+F12
		var contacts = gmail.evaluate('//iframe[contains(@src,"contacts/ui/ContactManager") and contains(@style,"visible")]',gmail,null,9,null).singleNodeValue;
		!!gmail.getElementById('pmgstyle_fullview') ? removeStyle() : addStyle();
	}
}, false);

if(typeof ScriptUpdater == 'object') ScriptUpdater.check(scriptid, version);

function addStyle() {
	var head = gmail.getElementsByTagName('head')[0];
	if(!head) return;
	var style = document.createElement('style');
	style.type = 'text/css';
	style.id = 'pmgstyle_fullview';
	style.appendChild(document.createTextNode(css));
	head.appendChild(style);
}

function removeStyle() {
 	var style = gmail.getElementById('pmgstyle_fullview');
	if(style) style.parentNode.removeChild(style);
}

})();