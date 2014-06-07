// ==UserScript==
// @name           WW Ranks
// @author         ReinerCY
// @version        0.1
// @namespace      Grepolis
// @include        http://de*.grepolis.com/game/*
// ==/UserScript==

var uW;

var rCY_wwranks_obj=document.createElement('script');
var rCY_wwranksUrl = 'http://www.g2.b0x.info/Grepo2-wwranks.user.js';
rCY_wwranks_obj.setAttribute('src', rCY_wwranksUrl);
rCY_wwranks_obj.setAttribute('id','WWRanks');
document.body.appendChild(rCY_wwranks_obj);
