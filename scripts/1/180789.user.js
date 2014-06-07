// ==UserScript==
// @name        UGHH Image Link
// @namespace   ughhimagelink
// @description Creates a button on the UGHH site for viewing a large album picture.
// @author      PumaDias
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.1
// @updateURL   https://userscripts.org/scripts/source/180789.user.js
// @downloadURL https://userscripts.org/scripts/source/180789.user.js
// @homepage    https://userscripts.org/scripts/show/180789
// @include     http://ughh.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

if ($('.MagicZoomPlus').attr('href').length && $('.b').length) {
    sUrl = 'http://ughh.com'+$('.MagicZoomPlus').attr('href');
    $('.b a:first').before('<br><a href="'+sUrl+'" target="_blank" style="text-align:center;float:left;display:block;width:194px;margin:-15px 0 3px;padding:5px 0;font-size:24px;background:#FFC114;border:#000 3px solid;border-radius:10px;color:#000;text-decoration:none;font-weight:bold" title="View Bigger Image!">Show Image</a>');
}