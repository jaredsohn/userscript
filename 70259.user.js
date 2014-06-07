// ==UserScript==
// @name           RageZone.com - Clean Forum
// @description    Cleans Forums
// @include        http://forum.ragezone.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==

GM_addStyle("div.tborder {display: none !important;}");
$("div.tborder").remove();