// ==UserScript==
// @name      HF Group leader username colour change
// @namespace  M1N3RMΛN/BEACON_USER_COLOUR
// @description  Script for Groupd to colour all leaders usernames.
// @include        http://www.hackforums.net/showthread.php?tid=*
// @include        http://hackforums.net/showthread.php?tid=*	
// @include        http://www.hackforums.net/member.php?action=profile&uid=*
// @include        http://hackforums.net/member.php?action=profile&uid=*
// @include        http://www.hackforums.net/usercp.php?action=options
// @include        http://hackforums.net/usercp.php?action=options
// ==/UserScript==

// HF GROUP LEADER USERNAME COLOUR CHANGER
// THIS USERSCRIPT WAS MADE BY M1N3RMΛN, DO NOT REMOVE ANY NAMES.

// ==VARIABLES==
var html = document.body.innerHTML;
// ==/VARIABLES==

// ==DO-NOT-REMOVE==
html = html.replace( /Tοny/g, '<span style="text-shadow: 0px 2px 3px #000"><b>Tοny</b></span>' );
// ==/DO-NOT-REMOVE==

html = html.replace( /мr. X/g, '<span style="color: #4DD0FC;"><b>мr. X</b></span>' );


document.body.innerHTML = html;