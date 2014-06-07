// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Myspace formatting shortcuts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// Myspace plain editor default
// By Jonatron - sjhu52i02@sneakemail.com - http://www.myspace.com/negatron
// version 0.001
// 2005-10-30
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Myspace plain editor default
// @namespace     http://mysite.verizon.net/negatron/
// @description   Defaults to the regular text editor instead of the rich text editor.  In other words, it clicks "if edit window does not show up click here" for you.
// @include       http://*.myspace.com/*
// ==/UserScript==

// Rewrite blog post links to point to the plain text editor instead of the rich text editor (unless it is already on the plain text editor)

// var curtime = new Date()

var x,i;
x=document.links; //Get all the links in the page

if (!/editor=false/.test(window.location.href)) {  		//On any page *but* the plain text editor...
	for(i=0;i<x.length;++i) {							//Go through every link on the page
		if (/editor=true/.test(x[i].href)) {			//If a link points to the rich text editor...
			x[i].href = x[i].href.replace(/editor=true/, 'editor=false');	//redirect it to the plain one
			// GM_log('Replaced true with false');
		} 
		else if (/fuseaction=blog.(create|edit|comment|commentreply)/.test(x[i].href)) {	//Otherwise if a link looks like a page with posting  (What are (processCreate|processCreateComment|processCreateCommentReply|processEdit)?)
			x[i].href = x[i].href.replace(/(fuseaction=.*?)&/, '$1&editor=false&');	//add the thingy for the plain editor
			// GM_log('Added false');
		} 
	}
}

// var newtime = new Date()
// var elapsedtime = newtime.getTime()-curtime.getTime()
// GM_log('Blog link reformat took ' + elapsedtime + ' ms');
