// ==UserScript==
// @name           Disable Steam Trade Unload event
// @namespace      94m3k1n9
// @description    Prevents Steam Trading from cancelling the trade when closing tab
// @include        http://steamcommunity.com/trade/*
// @include        https://steamcommunity.com/trade/*
// ==/UserScript==

Event.stopObserving( window, 'unload', TradingUnloaded );
