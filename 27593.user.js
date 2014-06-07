// ==UserScript==
// @name           nicombspacebreak
// @namespace      http://22century.cute.bz/
// @description    nicovideo multibyte whitespace to break.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

// ==UserScript==
// @name           nicombspacebreak
// @namespace      http://22century.cute.bz/
// @description    nicovideo multibyte whitespace to break.
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

var d = document;
var user = d.evaluate('id("des_2")//*[@class="video_description"]', d, null, 9, null).singleNodeValue;
var user_html = user.innerHTML;
if ( !RegExp(/<br(?: \/)?>/i).test( user_html ) ) {
	user_html = user_html.replace(/(?:\u3000| ){2,}/g,"<br />");
	user.innerHTML = user_html;
}