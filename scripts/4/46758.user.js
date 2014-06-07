// ==UserScript==
// @name	friendfeed square-cut edition (reduced whitespace included)
// @namespace	Max Friedrich Hartmann
// @description	If you don't like rounded corners at all and don't need that much whitespace
// @date	2009-30-04
// @version	1.2
// @include	http://friendfeed.com/*
// @include	https://friendfeed.com/*
// @match  	http://friendfeed.com/*
// @match  	https://friendfeed.com/*
// @include	http://beta.friendfeed.com/*
// @include	https://beta.friendfeed.com/*
// @match  	http://beta.friendfeed.com/*
// @match  	https://beta.friendfeed.com/*
// @run-at document-start
// ==/UserScript==

GM_addStyle(
// removes rounded corners
'.box .bottom { display:none !important }' +
'.box .main { padding-bottom: 10px !important }' +
'.bar { -webkit-border-top-left-radius: 0px !important; -webkit-border-top-right-radius: 0px !important }' +
'#page, .subscribebar, .l_subscribe { -webkit-border-top-right-radius: 0px !important; -webkit-border-top-left-radius: 0px !important; -webkit-border-bottom-right-radius: 0px !important; -webkit-border-bottom-left-radius: 0px !important }' +
// whitespace and text size edits
'.entry { padding-bottom: 0px !important; margin-bottom: 8px !important; border-bottom: 0px  }' +
'.text { margin-top: 0px !important}' +
'.info, .date, .service, .name, .clusterlink, .comments, .likes  { margin-top: 3px !important; font-size: 11px !important; line-height: 13px !important}' +
'.likes { line-height: 16px !important; margin-top: 4px !important; }' +
'.entry .name { padding-bottom: 2px !important; margin-bottom: 2px !important; border-bottom: 1px solid rgb(238, 238, 238) !important}' +
'.entry { border-bottom: 0px !important}'
);