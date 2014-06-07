// ==UserScript==
// @name			snakelp
// @namespace		GOVNOCODE
// @description		
// @include			http://*game.nemexia.ru/trade_center.php*
// ==/UserScript==

opera.addEventListener('BeforeEvent.DOMContentLoaded', function (e)
{
var tr = document.getElementById("latestOffersTabBox");
var predl = document.getElementsByTagName('table')[0];

var filt = document.createElement('div');
filt.innerHTML = '<div class="formbox"><div class="row"><label>Продает</label><select id="filter_sells_res" onchange="filterOffers();"><option value="0">Любой ресурс</option><option value="1">Металл</option><option value="2">Минералы</option><option value="3">Газ</option><option value="4">Обломки</option></select></div><div class="row"><label>Хочет</label><select id="filter_wants_res" onchange="filterOffers();"><option value="0">Любой ресурс</option><option value="1">Металл</option><option value="2">Минералы</option><option value="3">Газ</option><option value="4">Обломки</option></select></div></div>'
tr.insertBefore(filt, predl);

}, false);