// ==UserScript==
// @name           Bliposfera Tweak
// @namespace      blip.pl
// @author         Łukasz 'filthy' Korecki
// @description    Poprawia wyglad bliposfery + dodaje pare usprawnień
// @include        http://www.blip.pl/bliposphere
// @include        http://blip.pl/bliposphere
// ==/UserScript==
// szukamy scierwa z class status-outer-container
// status-outer-container - klasa dla spanów z blipnieciamia
css = 'span.status-outer-container { display: block ;} '+
'span.status { font-size: 110% ;} '+
'span.status>a { font-style:italic; background-color: #FAFAFA; color: #FF5B00 !important; ; font-size:105%; font-weight:bold; padding:1px; border:1px solid #d5d5d5; border-right:none;} '+
'span.status>a:after { content: "^"attr(title)":";} '+
'span.body>a {color: #FF5B00 !important; font-weight:bold;}';
var head = document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
head.appendChild(style);