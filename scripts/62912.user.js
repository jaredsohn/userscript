@-moz-document
// ==UserScript== 
// @name           CoTweet RTL
// @namespace      http://www.w3.org/1999/xhtml
// @description    Makes CoTweet right to left
// @include        http://cotweet.com/*
// ==/UserScript== 

domain("cotweet.com") {
* {font-family: tahoma !important}
.result_content, .message_text {font: 10pt tahoma; direction: rtl; text-align: right;}
}