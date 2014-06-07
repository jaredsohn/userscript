// ==UserScript==
// @name      PiRaLiStIcS (Pirate Power Tool modded by Dawlers)
// @namespace http://userscripts.org/scripts/show/152122
// @icon      http://le-pirate-infographiste.com/design/icone-pirate.png
// @description Tools - By Dawlers for "Pirates Of Fortune" games
// @grant     GM_xmlhttpRequest
// @match     *://apps.facebook.com/pirates-game/*
// @match     *://plus.google.com/games/play/675111897657*
// @include   *://apps.facebook.com/pirates-game/*
// @exclude   *://www.facebook.com/pages/Pirates-Tides-Of-Fortune-Community/109358109188776
// @exclude   *://apps.facebook.com/ai.php*
// @exclude   *://www.facebook.com/plugins/like.php*
// @exclude   *://plus.google.com/_/apps-static/*
// @exclude   *://plus.google.com/u/0/_/gadgets/contactPicker*
// @exclude   *://accounts.google.com/*
// @exclude   *://talkgadget.google.com/*
// @exclude   *://www.googleapis.com/static*
// @version 1.1
// @changeLog <ul><li>Ajout du Script sur UserScripts</li></ul>
// ==/UserScript==


function workElements() {
document.getElementById('pagelet_bluebar').style.display = 'none';
document.getElementById('rightCol').style.display = 'none';
document.getElementById('contentArea').style.padding = '0px';
document.getElementById('contentArea').style.width = '100%';
document.getElementById('contentArea').style.margin = '0';
document.getElementById('contentArea').style.border = '0';
document.getElementById('contentArea').style.backgroundColor = 'transparent';
}

setTimeout( workElements, 10000 );