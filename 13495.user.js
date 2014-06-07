// ==UserScript==
// @name           LJ Snpashots Disable
// @namespace      http://www.glump.net
// @author         Brendan Kidwell
// @description    Disable LiveJournal Snapshots
// @include        http://*livejournal.tld/*
// @include        https://*livejournal.tld/*
// ==/UserScript==

(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div#snap_com_shot_main { display: none; }');

})();

