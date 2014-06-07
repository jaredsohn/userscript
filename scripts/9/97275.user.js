// ==UserScript==
// @name           I like shout on the rigth 
// @namespace      ilikeshoutontherigtherep
// @description    I like shout on the rigth 
// @include        http://www.erepublik.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==
jQuery('div#citizen_feed').parent().css('float','right');
jQuery('body div#container div#content').append(jQuery('div#battle_listing').parent());