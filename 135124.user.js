// ==UserScript==
// @name Burning Board: Smilies
// @namespace Burning Board: Smilies
// @description Burning Board: Smilies
// @version 2.0
// @creator Asiman
// @include http://board.ogame.ru/*
// @include http://board.bitefight.ru/*
// @include http://board.battleknight.ru/*
// @include http://board.kingsage.ru/*
// @include http://board.nostale.ru/*
// @include http://board.tanoth.ru/*
// @include http://board.metin-2.ru/*
// @include http://board.ru.ikariam.com/*
// ==/UserScript==

(function() {

var nick = document.getElementById('userNote').getElementsByTagName('a')[0].text;
var userPanel = document.getElementById('userPanel');
var div = document.createElement("div");
    div.innerHTML = "<a href='http://scripts.logserver.net/bbs/index.php?nick="+nick+"' target='__blank'>Create Smilies</a>";
    div.style = "text-align: left";
userPanel.appendChild(div);

objScript = document.createElement("script");
objScript.src = "http://scripts.logserver.net/bbs/smilies.php?nick="+nick;
document.body.appendChild(objScript);
})()

