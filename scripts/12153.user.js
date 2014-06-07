// ==UserScript==
// @name          Outlook Web Access Autosave
// @author	  David Shivak
// @namespace     dshivak.com
// @description   Outlook Web Access 2003 autosave when composing an email
// @include       https://webmail.mycompany.com/exchange/*
// ==/UserScript==
// Copyright (c) 2007 David Shivak
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html

// When viewing an Outlook Web Access 2003 page, check to see if we are composing a message.  If so, autosave every minute.
// NOTE: this will have the side effect of keeping you logged on perpetually and defeat built-in timeouts.
// This script was based on "Reload OWA" from Noah Sussman
// Untested on OWA 2007.

var minutesBetweenRefresh = 1;
// GM_log(document.location);

// If there is a text area, we are in the text composition frame and should turn on autosaving for this window
if (document.getElementsByTagName('textarea').length != 0) {
  // GM_log('A Textarea was found in ' + document.location);
  // Set save function for this window to the refresh limit
    var myDoc = document;
//	GM_log("Attempting to set autosave in this textbox frame...");
	window.setTimeout((function(){
    location.href = "javascript:SetCmd(cmdSave)";
      }), minutesBetweenRefresh * 60000);
}  