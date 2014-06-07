// ==UserScript==
// @name        OCRemix direct download link
// @namespace   xorus.helper
// @include     http://ocremix.org/remix/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version     1
// ==/UserScript==

var downloadLink = $("#panel-download ul li a:first").attr("href");
var downloadLinkInfo = $("#panel-download ul li a:first").html();
var block = "#panel-main .panel-2-white div:first";
var text = '<div class="panel-2-green"><a href="'+downloadLink+'" download>' +
           '<img align="left" style="margin-right:5px;" alt="download" src="/images/template/icons/icon_download_32.png">' +
           '<strong style="font-size:140%;">Direct download</strong></a><br />' +
           '<span style="font-size:85%;">'+downloadLinkInfo+'</span><br />' +
           '</div>'

$(block).html(text + $(block).html());
