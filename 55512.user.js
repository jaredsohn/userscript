// ==UserScript==
// @name          TinyThread
// @namespace     http://peterstuifzand.nl
// @description   A change to the CSS
// @include http://a.tinythread.com/*
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
"        dl { font-size:11pt; width: 640px; } "+
"        #title { margin-top: 0;}      " +
"        .you { background: #dddddd }      " +
"        h3 {font-weight:normal; }      " +
"        h4 {font-weight:normal; margin-bottom:10px;padding-top:5px; padding-bottom:4px; border-bottom:1px black solid;}      "+
"        dt { width: 30%; text-align:right; float:left; clear:left; width:150px; } " +
"        dd { width: 70%; float:left; margin-left:0; } " +
"        dt.you { background: inherit; } "
);
