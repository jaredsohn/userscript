// ==UserScript==
// @name           	34P Name Sync
// @namespace      	34P Name Sync
// @author         	Kinu
// @description    	Allows names and tripcodes on 34pchan.org/b/
// @include        	http://*34pchan.org/b/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @downloadURL		http://kinuch.in/userscripts/scripts/34pname.user.js
// @homepage		http://kinuch.in/userscripts/34pnamesync.php
// @icon64			http://34pchan.org/favicon.png
// @version        	0.2
// ==/UserScript==

$("#nameformfield").append('<tr><td class="postblock">Name </td><td><input type="text" name="name" size="28" maxlength="75" accesskey="n" /></td></tr>');
$("#versionlog").append(document.createTextNode("0.2"));
GM_addStyle("#anname { display: none !important; } #bnname { display: inherit !important; } .postertrip { display: inherit !important; }");

//Protips: this won't work on other chans, even with modification. Most of what this works with is server side mods, hence so short.
//If you really really want it, gimme a shout the regular way, or see what you can do with milky's /b/ Name Sync.

