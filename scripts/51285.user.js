// ==UserScript==
// @name           pandora_skinned
// @namespace      www.ajcvisual.com
// @description    Skins Pandora with whatever image you want.
// @include        http://www.pandora.com/*
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

//overloading Pandora css
addGlobalStyle(
'body {' +
'  background: url(http://ajcvisual.com/test_arena/images/pandora_bg_02.jpg) no-repeat scroll 0 0 ! important;' +
'  background-color: #000000 ! important;' +
'}' +
'#container {' +
'  background: none;' +
'  background-color: transparent ! important;' +
'}');

//sentinel
//alert("Script Working");


//removes right commercial (AVIV GOLL)
//http://userscripts.org/scripts/review/4047
var addiv, adfaqdiv;

addiv = (document.evaluate("//div[@id='advertisement']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null)).snapshotItem(0);
addiv.parentNode.removeChild(addiv);

adfaqdiv = (document.evaluate("//div[@id='ad_faq_link']",
				document,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null)).snapshotItem(0);
adfaqdiv.parentNode.removeChild(ad_faq_link);