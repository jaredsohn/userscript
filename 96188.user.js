// ==UserScript==
// @name           Zombipolis - Megamagnate - BandasCallejeras - Invasion Zombie - RicoPolis  AutoClicker (Casinos)
// @namespace      TathtaT
// @description    Autoclick para ZP - MM - RP - IZ - BC
// @include        http://www.ricopolis.com/*
// @include        http://ricopolis.com/*
// @include        http://www.invasionzombie.com/*
// @include        http://invasionzombie.com/*
// @include        http://www.bandascallejeras.com/*
// @include        http://bandascallejeras.com/*
// @include        http://www.megamagnate.net/*
// @include        http://megamagnate.net/*
// @include        http://www.zombipolis.com/*
// @include        http://zombipolis.com/*
// ==/UserScript==

var fichas = document.getElementById("fichas");
fichas.value = fichas.length*5;


setInterval("apostar()",500);