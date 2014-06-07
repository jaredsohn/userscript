// ==UserScript==
// @name          LOR TreeView lite
// @description   Lite fork of LOR TreeView (http://userscripts.org/scripts/show/15985)
// @exclude http*://*linux.org.ru/forum/*/
// @exclude http*://*linux.org.ru/news/*/
// @exclude http*://*linux.org.ru/gallery/*/
// @exclude http*://*linux.org.ru/polls/*/
// @include http*://*linux.org.ru/forum/*/*
// @include http*://*linux.org.ru/news/*/*
// @include http*://*linux.org.ru/gallery/*/*
// @include http*://*linux.org.ru/polls/*/*
// @grant GM_log
// @UpdateURL http://userscripts.org/scripts/source/175288.user.js
// ==/UserScript==
//
// License: GNU GPL v3 or later
// Copyright (C) 2012 sdio
// Copyright (C) 2013 shutdown
//
// The JavaScript code in this page is free software: you can
// redistribute it and/or modify it under the terms of the GNU
// General Public License (GNU GPL) as published by the Free Software
// Foundation, either version 3 of the License, or (at your option)
// any later version.  The code is distributed WITHOUT ANY WARRANTY;
// without even the implied warranty of MERCHANTABILITY or FITNESS
// FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
//
// As additional permission under GNU GPL version 3 section 7, you
// may distribute non-source (e.g., minimized or compacted) forms of
// that code without the copy of the GNU GPL normally required by
// section 4, provided you include this license notice and a URL
// through which recipients can access the Corresponding Source.
//
// Author:  sdio (http://www.linux.org.ru/people/sdio/profile)
// Forked by: shutdown (http://userscripts.org/users/527453)
//

var jq;
if (typeof(GM_log) == 'function') {
	// For FF, Mozilla (with greasemonkey sandbox)
	jq = unsafeWindow.$;
} else {
	// For Epiphany, Opera
	jq = $;
}

// If false, creates a 'Tree view'/'Древо ответов' button near the
// topic starter message instead of applying tree view automatically
const autoTreeView = false;

// Indentation per reply level
const INDENT = '5px';

// Set the default theme in case autodetect fail
var THEME = 'tango';

// Length of the BACKGROUNDS array may be any, so change it as you want
const BACKGROUNDS = {
	'tango':  ['#452830', '#284542', '#283145', '#452845'],
	'white2': ['#ccf', '#ffc', '#cfc', '#fcc', '#cff', '#fcf', '#ccc'],
	'black':  ['#006', '#330', '#303', '#033', '#300', '#030', '#333']
};

// Theme autodetection
jq('link').each(function() {
	var found = this.href.match(/\/([^/]*)\/combined\.css/);
	if(found) {
		THEME = found[0].split('/')[1];
	}
});
// ---------------------------------------------------------------------
function doindent(index) {
	this.setAttribute('treelevel', '0');  // initial indent level
	var root = jq('div.comment').get(0);

	// is a message answer to other (non root) message?
	var a = jq('div.title a[data-samepage="samePage"]', this);
	if(a.length) {
		// #Id of reply message <DIV>
		var idr = a.attr('href').split('cid=')[1];
		idr = 'comment-'+idr;
		// "parent" message
		var idr_msg   = document.getElementById(idr);
		// child's indent level
		var idr_level = idr_msg.getAttribute('treelevel');
		idr_level++;

		// save child's indent level
		this.setAttribute('treelevel', idr_level);

		// move child to parent
		idr_msg.appendChild(this);
		// choose color accordingly to indent level
		var bgcolor = BACKGROUNDS[THEME][idr_level % BACKGROUNDS[THEME].length] + ' !important';
		// set background color to .title and .body
		jq(  'article#'
		   + this.id
		   + ', article#'
		   + this.id
		   +' div.title').css('cssText',   'padding-bottom: 1px'
		                                 + '; margin-top: 5px'
		                                 + '; margin-left: ' + INDENT
		                                 + '; background-color: ' + bgcolor);
	}
}
// ---------------------------------------------------------------------
var globalindent = function() {
	jq("article.msg").each(doindent);
};
if(autoTreeView) {
	globalindent();
} else {
	jq('<span> <li><a href="javascript:{}">Древо ответов</a></li></span>').
		appendTo('article[id*="topic-"].msg .reply ul').click(globalindent);
}
// ---------------------------------------------------------------------
