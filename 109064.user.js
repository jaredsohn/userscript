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
// @name          ActiveInboxGeoffappleCSS
// @namespace     tag:tran.gabriel@gmail.com,2011-04-13:ActiveInboxDarkCSS
// @description   Overwrites ActiveInbox CSS values (http://www.activeinboxhq.com/) with geoffapple css (http://getsatisfaction.com/activeinbox/topics/please_update_for_preview_theme)
// @include       http://mail.google.com*
// @include       https://mail.google.com*
// ==/UserScript==

var ActiveInboxDarkCSS = {
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
ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box, .gtdi-conversationsidebar-content { border: 1px solid #dedede !important; margin-left:3px !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-section-expanded, .gtdi-searchbuilder-menu-section-title.gtdi-expanded, .gtdi-menusection-title.gtdi-expanded, .gtdi-searchbuilder-typelist-title { background-color: #e0e0e0 !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-row-gtdtypes:hover, .gtdi-box-row-gtdtypes-statuses:hover, .gtdi-treelist-item.gtdi-active, .gtdi-deadlinebutton-menu-item:hover, .gtdi-dropdown-actionlist-row:hover, .gtdi-box-row-popped-out { background: #cccccc !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-row { background: #F1F1F1 !important; border-bottom: 1px solid #E0E0E0 !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-circlecount { background: #d94a39 !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-treelist-item:hover { background: #cccccc !important; }');

ActiveInboxDarkCSS.addGlobalStyle('img.gtdi-dropdown-actionlist-row-pin{ background: #d94a39 !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-box-row-gtdtypes:hover img.gtdi-treelist-item-extend{ background: #d94a39 !important; border:1px solid #b23d30 !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-hab-status-buttons .gtdi-label-button.gtdi-active a, .gtdi-hab-deadline-buttons-today.gtdi-active a, .gtdi-hab-status-buttons .gtdi-label-button.gtdi-active-partial a, .gtdi-hab-deadline-buttons-today.gtdi-active-partial a { -moz-box-shadow: inset 0 1px 4px rgba(0,0,0,.4) !important; -webkit-box-shadow: inset 0 1px 4px rgba(0,0,0,.4) !important; box-shadow: inset 0 1px 4px rgba(0,0,0,.4) !important; background-color: #D94A39 !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-hab { background: #f1f1f1 !important; -moz-box-shadow: inset 0 0px 0px #aaa !important; -webkit-box-shadow: inset 0 0px 0px #aaa !important; box-shadow: inset 0 0px 0px #aaa !important; border: 1px solid #E4E4E4 !important; border-radius: 2px !important; -webkit-border-radius: 2px !important; -moz-border-radius: 2px !important; }');

ActiveInboxDarkCSS.addGlobalStyle('.gtdi-label-button:hover{ background: #cccccc !important; }');
