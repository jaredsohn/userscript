// ==UserScript==
// @name           sendfile.su autoclick
// @namespace      sendfile
// @include        http://sendfile.su/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$(function(){$('#download_click').click();setTimeout(function(){document.location.href=$('p#download_p>a').html();},500)});