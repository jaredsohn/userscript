// ==UserScript==
// @name           Bliposfera Tweak alternative style
// @namespace      blip.pl
// @author         Łukasz 'filthy' Korecki
// @modded_by      Futomaki
// @description    Poprawia wyglad bliposfery + dodaje pare usprawnień
// @include        http://www.blip.pl/bliposphere
// @include        http://blip.pl/bliposphere
// ==/UserScript==
// szukamy scierwa z class status-outer-container
// status-outer-container - klasa dla spanów z blipnieciamia

css = 'span.status>a>img.avatar {margin-right: 10px !important;} '+
'div.bliposphere-content {background: #000; opacity: 0.9;  padding-bottom: 20px !important; padding-top: 20px !important; padding-left: 20px !important; padding-right: 20px !important;} '+
'span.status-outer-container { display: block; opacity: 1; } '+
'span.status { line-height:42px;font-size: 110%; color: #000 !important;} '+
'span.status>span.body {display: block; background: #fff !important; border: solid 3px #777 !important; border-top:none !important; border-left: solid 1px #d5d5d5; margin-bottom: 10px; padding-left: 10px !important;} '+
'span.status>a { display: block;  font-style:italic;  background-color: #ddd; color: #FF5B00 !important; ; font-size:100%; font-weight:bold; padding:2px;border:1px solid #d5d5d5; border: solid 3px #777; border-bottom:none  !important;  padding-left: 10px;} '+
'span.status>a:after { content: "^"attr(title)":";} '+
'span.body>a {color: #FF5B00 !important; font-weight:bold;}';
var head = document.getElementsByTagName('head')[0];
var style= document.createElement('style');
style.type = "text/css";
style.innerHTML = css;
head.appendChild(style);