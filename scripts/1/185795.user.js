// ==UserScript==
// @name          Kanbanflow old icon
// @namespace     ---
// @description   Replaces Kanbanflow's icon
// @source        ---
// @include        http://www.kanbanflow.com/*
// @include        https://www.kanbanflow.com/*
// @version       1.0
// ==/UserScript==

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "https://fbcdn-photos-h-a.akamaihd.net/hphotos-ak-prn2/v/1476796_10201952382663728_730880755_t.jpg?oh=9e954ff7dddcb63a94ecec11cf48dd2f&oe=52A90769&__gda__=1386847828_7ea2250d2a0691462753dfe9206afed0");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);