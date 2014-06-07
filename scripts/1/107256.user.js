// ==UserScript==
// @name          No Twitter Sidebar
// @namespace     http://kevingh.com
// @description   Clears Twitter's sidebar content.
// @include       http://*twitter.com/*
// @include       https://*twitter.com/*
// @version       1.0
// ==/UserScript==

function addCSS (css)
{
    unsafeWindow.addEventListener('load', function ()
    {
        var style = document.createElement('style');

        style.type = 'text/css';
        style.textContent = css;

        document.getElementsByTagName("head")[0].appendChild(style);
    }, false);
}

addCSS('#page-container {width: 540px !important;} .dashboard {display: none !important;}');