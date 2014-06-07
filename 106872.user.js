// ==UserScript==
// @name           DuckDuckGo — No duck
// @namespace      http://skami18.github.com/userscripts/duckduckgo-noduck
// @description    Remove the ugly duck logo from the DuckDuckGo main page
// @include        http://duckduckgo.com/
// @include        https://duckduckgo.com/
// ==/UserScript==

var css = '#dh {'
        + '    background: url("nduck.v104.png") no-repeat scroll center bottom transparent;'
        + '    height: 35px;'
        + '    padding: 0;'
        + '    margin: 50px auto 20px auto;'
        + '}';

head = document.getElementsByTagName("head")[0];

style = document.createElement("style");

inner_css = document.createTextNode(css);

style.appendChild(inner_css);

head.appendChild(style);


