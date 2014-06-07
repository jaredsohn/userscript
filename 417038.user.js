// ==UserScript==
// @name       ybbs ad block
// @namespace  http://www.manong.ca/tampermonkey/ybbsadblock
// @version    0.1
// @description  Block ads for yorkbbs 
// @match      http://*.yorkbbs.ca/*
// @copyright  2012+, You
// ==/UserScript==

function addStyleString(str) {
    var node = document.createElement('style');
    node.innerHTML = str;
    document.body.appendChild(node);
}

addStyleString('#NLeftPic > a { display: none !important;}');
addStyleString('.t_signature {display: none !important;}');
addStyleString('#yellowpages {display: none !important;}');
