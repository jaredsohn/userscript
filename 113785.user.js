// ==UserScript==
// @name          Hide FB Ticker
// @namespace     hidefbticker@shebo.com
// @description   Get rid of the new facebook ticker.
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// ==/UserScript==

function hideTicker(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

hideTicker('#pagelet_rhc_ticker {display: none !important;}#pagelet_ticker {height: 0 !important;}.tickerActivityStories {display: none !important;}.fbFeedTicker {display: none !important;}.fbFeedTickerStory {display: none !important;}.ticker_container {display: none !important;}.canvasTicker {display: none !important;}#pagelet_ego_pane {position: static !important;}');
