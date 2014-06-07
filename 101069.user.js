// ActiveInboxDarkCSS
// version 0.1 BETA!
// 2011-04-13
// Copyright (c) 2011, Gabriel Tran
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          ActiveInboxDarkCSS
// @namespace     tag:tran.gabriel@gmail.com,2011-04-13:ActiveInboxDarkCSS
// @description   Overwrites ActiveInbox CSS values (http://www.activeinboxhq.com/) for dark gmail themes
// @include       http://mail.google.com*
// @include       https://mail.google.com*
// ==/UserScript==

var ActiveInboxDarkCSS = {
	textColor: '#eff',
	backColor1: '#333',
	backColor2: '#444',
	backColor3: '#555',
	backColorPopped: '#aaa',
	addGlobalStyle: function(css) {
	    var head, style;
	    head = document.getElementsByTagName('head')[0];
	    if (!head) { return; }
	    style = document.createElement('style');
	    style.type = 'text/css';
	    style.innerHTML = css;
	    head.appendChild(style);
	}
}

//remove border
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box, .gtdi-conversationsidebar-content { border: 0 !important; }');
//title 1
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-section-expand, .gtdi-searchbuilder-menu-section-title, .gtdi-menusection-title, .gtdi-searchbuilder-typelist-title, .gtdi-dropdown-actionlist-categorise-type-title { color: ' + ActiveInboxDarkCSS.textColor + ' !important; background-color: ' + ActiveInboxDarkCSS.backColor1 + ' !important; text-shadow: white 0px 0px 0px !important; -moz-text-shadow: 0 !important; -webkit-text-shadow: 0 !important; }');
//title 2
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-row { border: 0 !important; color: ' + ActiveInboxDarkCSS.textColor + ' !important; background-color: ' + ActiveInboxDarkCSS.backColor2 + ' !important; }');
//title 3
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-treelist-item { color: ' + ActiveInboxDarkCSS.textColor + ' !important; background-color: ' + ActiveInboxDarkCSS.backColor3 + ' !important; }');
//hover
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-row-gtdtypes:hover, .gtdi-box-row-gtdtypes-statuses:hover, .gtdi-treelist-item.gtdi-active, .gtdi-deadlinebutton-menu-item:hover, .gtdi-dropdown-actionlist-row:hover, .gtdi-box-row-popped-out, .gtdi-treelist-item-hasactiveitems:hover, .gtdi-treelist-item:hover { background: ' + ActiveInboxDarkCSS.backColorPopped + ' !important; }');
//comment next line if you have "plus"
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-row-account { display: none !important; }');