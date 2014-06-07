// ==UserScript==
// @name           Redirect to Armory Lite
// @namespace      shoecream@luelinks.net
// @description    Redirects all character sheet links from WowArmory to ArmoryLite.
// @include        http://armorylite.com/*
// @include        http://www.wowarmory.com/*
// @include        *
// ==/UserScript==

var a = document.getElementsByTagName('a');
Array.forEach(a, function(link) {
         link.href = link.href.replace(/wowarmory\.com\/character-sheet\.xml\?r=(.+?)&n=(.+?)/, 'armorylite.com/us/$1/$2');
   });