// ==UserScript==
// @name           PtP - Red forum post headers for unread
// @namespace      http://notsecret.dyndns.org
// @description    makes the header for the whole post red if unread
// @author         p4lindromica
// @include        http://*passthepopcorn.me/forums*
// @include        https://*passthepopcorn.me/forums*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==


$('table.forum_unread tr.colhead_dark td').css('backgroundColor', 'red')