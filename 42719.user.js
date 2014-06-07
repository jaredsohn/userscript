// ==UserScript==
// @name           LJ ad remover
// @namespace      zrum
// @description    Removes ads from LiveJournal friend feed
// @include        http://*.livejournal.*
// ==/UserScript==

/*
(C) 2009 Pavel Zryumov
Use this freely under the GNU GPLv3, http://www.gnu.org/licenses/gpl.html
*/

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


addGlobalStyle('div.adv {display: none}');