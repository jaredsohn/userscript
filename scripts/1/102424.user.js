// ==UserScript==
// @name       Appbrain to Market links
// @namespace  http://www.juhaninaskali.com/
// @version    0.1
// @description  Adds Android Market links to Appbrain website, in case you don't have AppBrain installed and want to use Market to install.
// @include    http://www.appbrain.com/app/*
// @copyright  2011, Juhani Naskali
// ==/UserScript==

var marketUrl, newLink;

marketUrl = window.location.pathname;

// Build link url. (Reusing marketUrl. Deal with it)
marketUrl = 'https://market.android.com/details?id=' + marketUrl.substring(marketUrl.lastIndexOf('/')+1);

// Create link with button style
newLink = document.createElement('a');
newLink.setAttribute('href', marketUrl);
newLink.setAttribute('class', 'sexy-button sexy-button-primary');
newLink.setAttribute('style', 'font-family: \'Lucida Grande\'; position: absolute; left: 240px; top: 225px; font-size: 11px; height: 13px; color: #000; text-decoration: none;');
newLink.innerText = 'Market';

// Add to actions bar
document.getElementById('actions').appendChild(newLink);