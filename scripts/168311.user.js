// ==UserScript==
// @name        Facebook Comments Plugin - Auto Order: Social Ranking
// @description	Order automatically comment section by social ranking instead of chronicly
// @namespace   http://javan.de
// @author		Javan
// @include     http*/*
// @version     1
// @updateURL		http://userscripts.org/scripts/source/168311.user.js
// @downloadURL		http://userscripts.org/scripts/source/168311.user.js
// @icon		http://javan.de/tools/live/favicon.png
// ==/UserScript==

window.setTimeout(function(){
var elementList = document.getElementsByClassName("fb_ltr");

for (var i = 0; i < elementList.length; i++)
{
	var src = elementList[i].src;
	elementList[i].src = src + '&order_by=social';
}
}, 2000);

// Copyright (c) by Javan_xD
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.