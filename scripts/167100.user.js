// ==UserScript==
// @name       Wiki append other lang title/URL (Eng<>Rus)
// @namespace  http://fluffme.ru
// @version    1
// @description  add russian title for english page on wiki and vice versa
// @match      http://en.wikipedia.org/wiki/*
// @match      http://ru.wikipedia.org/wiki/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @copyright  2013, FLuff
// ==/UserScript==
if ($('ul > li.interwiki-ru > a').length>0) {
var RuName = $('ul > li.interwiki-ru > a').clone();
RuName.html(RuName.attr('title'));
$('#firstHeading').append(' | ');
$('#firstHeading').append(RuName);
}

else if ($('ul > li.interwiki-en > a').length>0) {
var EnName = $('ul > li.interwiki-en > a').clone();
EnName.html(EnName.attr('title'));
$('#firstHeading').append(' | ');
$('#firstHeading').append(EnName);
}