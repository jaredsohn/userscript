// ==UserScript==
// @name           ThePirateBay.org - Cleaner
// @description    Removes Ads And Trash From Pirate Bay
// @include        http://www.thepiratebay.org/*
// @include        http://thepiratebay.org/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==

var tempdiv= document.createElement('span');
tempdiv.setAttribute('id','tempdiv');
main = document.getElementById('foot');
document.body.insertBefore(tempdiv,main);
var innerstyle = '<style type="text/css"> .ad, .ads, iframe, #zzsldr, #open-software, #fbanners, #foot, .bannerBorder { display:none !important; } #main-content { margin:0px !important; } br {line-height:0px !important;} #content { margin-top:2px !important; } </style>';
tempdiv.innerHTML = innerstyle;
