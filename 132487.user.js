// ==UserScript==
// @name           Stepashka video source
// @namespace      Stepashka
// @include        http://forum.stepashka.com/t*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
$('.post_body:first center').append('<br><a href="'+(/file=(.*)/ig).exec($('object param[name="flashvars"]').attr('value'))[1]+'">Source</a>');