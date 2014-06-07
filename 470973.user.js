// ==UserScript==
// @name       iLive Ad Remover
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http*://*.ilive.to/*
// @copyright  2014, SK
// ==/UserScript==

var scriptIdentifier = 'iliveadremover';

function addStyles(rules, id) {
    var node = document.createElement("style");
    node.setAttribute("type", "text/css");
    node.innerHTML = rules;
    if (id) node.setAttribute("id", id);

    document.getElementsByTagName("head")[0].appendChild(node);
}

addStyles('#ad_overlay, #ad_footer {display:none !important;}'
, scriptIdentifier+'general');