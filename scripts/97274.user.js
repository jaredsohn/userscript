// ==UserScript==
// @name           eFejsbuk
// @namespace      ivicaSR_eFejsbuk
// @description    A na ovo ne stedite supci jedni?
// @include        http://www.erepublik.com/*
// ==/UserScript==



var content = document.getElementById('content');

var shouter = content.getElementsByClassName('column')[1];

shouter.innerHTML = "";


