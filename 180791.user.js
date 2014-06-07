// ==UserScript==
// @name        BFH Force English
// @namespace   bfhforceenglish
// @description Force BFH page in English.
// @author      PumaDias
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.0
// @include     http://www.battlefieldheroes.com/*
// ==/UserScript==

if (window.location.href.indexOf('http://www.battlefieldheroes.com/en/')!==0)
    window.location.href = 'http://www.battlefieldheroes.com/en/'+window.location.href.substr(36);