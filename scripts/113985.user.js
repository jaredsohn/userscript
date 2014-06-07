// ==UserScript==
// @name           Facebook Ticker Remover
// @namespace      TheNamelessAccount
// @description    Disables the Facebook Ticker.
// @include        http://*.facebook.*/*
// @include        http://apps.facebook.com/* @include        https://*.facebook.*/*
// ==/UserScript==


var ticker= document.getElementById('pagelet_ticker');
var ego_pane = document.getElementById('pagelet_ego_pane');
ticker.parentNode.removeChild(ticker);
ego_pane.parentNode.removeChild(ego_pane);
