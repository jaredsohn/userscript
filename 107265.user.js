// ==UserScript==
// @name          Hide Offline Facebook Users
// @namespace     http://kevingh.com
// @description   Hides offline contacts in Facebook's new chat interface.
// @include       http://*facebook.com/*
// @include       https://*facebook.com/*
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

addCSS('.fbChatOrderedList .item {display: none !important;} .fbChatOrderedList .item.active, .fbChatOrderedList .item.idle, .fbChatOrderedList .item.mobile {display: list-item !important;}');