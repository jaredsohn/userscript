
// ==UserScript==
// @name        set_font_google_pda
// @include     http://mail.google.com/mail/x/*
// @include     https://mail.google.com/mail/x/*
// @include     http://www.google.com/calendar/m*
// @include     https://www.google.com/calendar/m*
// @version     0.0.1
// ==/UserScript==

var this_url = this.window.location.href;
var head, style;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
style = document.createElement('style');
style.type = 'text/css';
if(this_url.search(/\:\/\/mail\.google\.com\/mail\/x/) != -1) //mail
{
	style.innerHTML = 'td { font-size: 13px; padding-top:1px;}';
}
else if(this_url.search(/\:\/\/www\.google\.com\/calendar\/m/) != -1) //calendar
{
	style.innerHTML = 'td, div, span { font-size: 13px; padding-top:1px;} .c4, .c5, .firstevent {padding-top:1px; padding-bottom:0px;} .c8 {padding:0px; margin:0px;}';
}
head.appendChild(style);
