// ==UserScript==
// @name           NativeSpell
// @namespace      https://userscripts.org/scripts/show/178795
// @icon           https://db.tt/rHhxXXJz
// @version        1.0
// @homepage       https://userscripts.org/scripts/show/178795
// @updateURL      https://userscripts.org/scripts/source/178795.meta.js
// @downloadURL    https://userscripts.org/scripts/source/178795.user.js
// @description    This script allows your browser's native spell checker to run normally when using the community.playstation.com's HTML [WYSIWYG] editor.  
// @include        /^https?:\/\/(?:www\.)?community\.us\.playstation\.com\/t5\/forums\/postpage(?:\/.*)?$/
// @include        http://community.us.playstation.com/t5/forums/replypage/*
// @include        /^https?:\/\/(?:www\.)?community\.us\.playstation\.com\/t5\/notes\/privatenotespage\/tab\/compose(?:\/.*)?$/
// ==/UserScript==
// =+===================================================================================+=
//  |*****Author: Xuchilbara [Xb|7F] SevenFactors*******************************WRJ*****|
//  |*****http://community.us.playstation.com/t5/user/viewprofilepage/user-id/52572*****|
//  |*****https://userscripts.org/scripts/show/178795***********************************|
//  |*****CC: https://creativecommons.org/licenses/by-nc/3.0/***************************|
//  |***********************************************************************************|
//  |*****Many thanks to JoeSimmons for his consultation********************************|
// =+===================================================================================+=

{
	document.getElementById('tinymce').setAttribute("spellcheck", "true");
}