// ==UserScript==
// @name           Hide Facebook Within Facebook
// @namespace      http://www.nickbloor.co.uk/
// @description    They put a Facebook in the upper right of your Facebook so you can Facebook while you Facebook. This script removes the upper right Facebook!
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// ==/UserScript==

var ticker = document.getElementById('pagelet_ticker');
if(ticker) {
	ticker.parentNode.removeChild(ticker);
}
