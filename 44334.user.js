// ==UserScript==
// @name Skyrates Background Blackifier
// @description Darkens the background of skyrates/play
// @include http://skyrates.net/play.php
// @include https://skyrates.net/play.php
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
        'body { background-color: black; color: white; }' +
	'a { color: white ! important; }' +
	'table a { background-color: black ! important; }' +
	'td td { background-color: black ! important; color: white ! important; }'
);
