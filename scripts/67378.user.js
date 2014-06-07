// ==UserScript==
// @name           Blognone Live Blogging
// @namespace      bn-live-blogging
// @include        http://www.blognone.com/node/*
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

'#entry-list {' +
'  border: 1px solid #000;' +
'  height: 60em;' +
'  overflow: auto;' +
'}' +
'.lc-entry {' +
'  margin: 0 ! important;' +
'  padding: 0.2em 1em;' +
'}' +
'.lc-date {' +
'  margin: 0 ! important;' +
'  width: 5em;' +
'}' +
'.lc-body {' +
'  margin-left: 5em ! important;' +
'}' +
'.lc-body p {' +
'  color: #666 ! important;' +
'}');


