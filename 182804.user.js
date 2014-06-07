// ==UserScript==
// @name        irccloud registration thing
// @namespace   irccloud.com
// @description get rid of "LIMITED TRIAL" giant red thing
// @include     http://www.irccloud.com/*
// @include     https://www.irccloud.com/*
// @include     http://irccloud.com/*
// @include     https://irccloud.com/*
// @version     1
// @grant       none
// ==/UserScript==

function clearit() {
    lim = document.querySelector('div#limits.info');
    lim.style.display='none';
    window.setTimeout(clearit, 10);
}

window.setTimeout(clearit, 3000);
