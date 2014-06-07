// ==UserScript==
// @name           New Hawtness Forum Update
// @namespace      http://userscripts.org/users/381173
// @description    Updates the forum styling to better match the July Update
// @include        http://*.bungie.net/*
// ==/UserScript==
// Author 		   Der Flatulator6

var x = document.styleSheets[1];
var y = document.styleSheets[3];
var z = document.styleSheets[0];
//Forums odd and even colours
x.insertRule('div table.grid tr.even { background: #141414; }',x.cssRules.length);
x.insertRule('div table.grid tr.odd { background: #242424; }',x.cssRules.length);
x.insertRule('div table.grid tr.new { background: #2F3032; }',x.cssRules.length);

//Top Forum Topics (Pinned Group Topics)
x.insertRule('div table.pinned_topic_grid tr { background-color: #141414; }',x.cssRules.length);
	//Groups
	z.insertRule('div.boxA table.pinned_topic_grid tr.even { background-color: #141414 !important; border-bottom: 1px solid #474747 !important; }',z.cssRules.length);
	z.insertRule('div.boxA table.pinned_topic_grid tr.odd { background-color: #141414 !important; border-bottom: 1px solid #474747 !important;  }',z.cssRules.length);
	
//div.boxA table.pinned_topic_grid tr.odd { background-color: #2f2f2f; border-bottom: 1px solid #474747;} 

//Thread Background
x.insertRule('div.block-a { background: #141414;}',x.cssRules.length);
	//Imports background image
	y.insertRule('.forum_cols_posts { background: url(http://i52.tinypic.com/2wcigpy.gif) repeat-y !important; }',y.cssRules.length);

//Quote Fix
y.insertRule('div.forumpost p span.IBBquotedtable { background-color: #1F1F1F !important; }',y.cssRules.length);

//Profile / Groups etc Background
x.insertRule('.content_matte { background: #141414 !important; }',x.cssRules.length);
	//Footer Fix
	x.insertRule('.pagination_container { background: #131313 !important; }',x.cssRules.length);
	x.insertRule('.pagination_container { border: solid 0px #3F484B !important; }',x.cssRules.length);
	
	