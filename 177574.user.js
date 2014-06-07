// ==UserScript==
// @name         EventHubs AdBlock Fix (Salty Edition)
// @author       _nderscore
// @run-at       document-start
// @namespace    http://www.reddit.com/r/Kappa
// @version      0.5
// @description  Blocks the Adblock blocks that are blocking content on EventHubs for people using Adblock
// @match        http://eventhubs.com/*
// @match        https://eventhubs.com/*
// @match        http://*.eventhubs.com/*
// @match        https://*.eventhubs.com/*
// @copyright    2013 _nderscore
// ==/UserScript==

unsafeWindow.setInterval = (function(o){
    return function(a){
        if(~a.toString().indexOf('AdBlock')) return;
		return o.apply(this, arguments);
    };
})(unsafeWindow.setInterval);