// ==UserScript==
// @name           Mods.de Leisten und Dropdown weg
// @namespace      gm.kricke.org
// @description    Entfernt alles ueber dem Forenbanner
// @include        http://82.149.226.131/bb/*
// @include        http://forum.counter-strike.de/bb/*
// @include        http://forum.cstrike.de/bb/*
// @include        http://forum.mods.de/bb/*
// @exclude        http://forum.mods.de/bb/pm/*
// @exclude        http://my.mods.de/*
// ==/UserScript==

//document.getElementById('infobar').style.position='fixed';
//document.getElementsByTagName('div')[0].style.marginTop='25px';
//document.getElementById("mdeleiste").style.display = "none";
document.getElementsByTagName("form")[0].style.display = "none";
GM_addStyle("#mdeleiste, form[name='fswitch']{display: none;}");