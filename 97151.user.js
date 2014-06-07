// ==UserScript==
// @name           FB_RemoveTheaterBox
// @namespace      http://userscripts.org/users/293955
// @description    Removes theaterbox from facebook
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
$(document).ready(function(){$('a[rel="theater"]').live('mouseover',function(){$(this).removeAttr('rel').attr("target","_self");});});