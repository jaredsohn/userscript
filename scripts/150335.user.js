// ==UserScript== 
// @author plasmatic
// @name Remove Facebook Emoticons
// @namespace http://userscripts.org/ removefacebookemoticons/
// @description Gets rid of emoticons on facebook
// @include *.facebook.com/* 
// ==/UserScript== 

GM_addStyle('.emote_text { display: inline !important; } .emote_img { display: none !important; }');
