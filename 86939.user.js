// ==UserScript==
// @name           LJTimes Remover
// @description    Removes annoying LJTimes bar
// @include        *livejournal.com*
// ==/UserScript==

var ljTime;
if (ljTime = document.getElementById('ljtime')) {
    ljTime.parentNode.removeChild(ljTime);
}
