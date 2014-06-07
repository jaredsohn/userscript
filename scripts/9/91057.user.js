// ==UserScript==
// @name           WoW Forum Condense
// @namespace      Lasre
// @description    Condenses the World of Warcraft forum just a little in an effort to alleviate scroll-wheel ache
// @include        http://*.battle.net/wow/*/forum/*
// ==/UserScript==

if (typeof(GM_addStyle) == 'undefined') { // http://www.google.com/support/forum/p/Chrome/thread?tid=661c9da64bd2b38f
	function GM_addStyle(styles) {
		// Smelly Chrome users up in here. I hope this works.
		var s = document.createElement('style');
		s.type = 'text/css';
		s.appendChild(document.createTextNode(''+styles+''));
		document.body.appendChild(s);
	}
}

var altstyle = true; // Don't like the alternating row colours? Switch this to false

var style = '.forum-post-icon { background-position: 0 -2px !important; height: 22px !important }\
#posts .post-title a, #posts .post-status { padding-top: 0 !important; padding-bottom: 0 !important }\
#posts .post-pageNav .pageNav { padding-top: 0 !important; padding-bottom: 0 !important }\
#posts .post-replies, #posts .post-views { color: #A68450 !important }' +
(altstyle ? '#posts tr:nth-child(even) { background-color: #23140B !important }\
#posts tr:hover { background-color: #2D1809 !important }' : null) +
'.post { border-top: 2px solid #000 !important }\
.post-user, .talkback .post-user { height: 105px !important; background-position: 0 -16px !important }\
.post-user .avatar, .post-user .character-info { top: 10px !important }\
.post-info-int { padding: 7px 19px 0 0 !important }\
.post-options { padding: 0 20px !important }\
.post-detail { padding: 10px 0 5px !important }';
GM_addStyle('@media screen {' + style + '}');