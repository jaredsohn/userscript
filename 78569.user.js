// ==UserScript==
// @name           ThePirateBay.org - Cleaner - Enhanced
// @description    Removes Ads And Trash From Pirate Bay using simple CSS
// @include        http://www.thepiratebay.org/*
// @include        http://thepiratebay.org/*
// @author         Sathynarayana sastry
// @namespace      http://akshayapatra.co.cc
// @version        1.0
// ==/UserScript==

var tempdiv= document.createElement('span');
tempdiv.setAttribute('id','tempdiv');
main = document.getElementById('foot');
document.body.insertBefore(tempdiv,main);
var innerstyle = '<style type="text/css"> .ad, .ads, iframe, #zzsldr, #open-software, #fbanners, #foot, .bannerBorder { display:none !important; } #main-content { margin:0px !important; } br {line-height:0px !important;} #content { margin-top:2px !important; } #detailsouterframe { width:100% !important; }  </style>';
tempdiv.innerHTML = innerstyle;
