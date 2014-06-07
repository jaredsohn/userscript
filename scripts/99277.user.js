// ==UserScript==
// @name           Gawker Skip To Source
// @namespace      Seven Round Things
// @include        http://*engadget.com/*
// @include        http://*joystiq.com/*
// @include        http://*gizmodo.com/*
// ==/UserScript==



function f() {

var s = "//div[@class='post_source img_label']/span/a | " +
        "//ul[@class='sources']/li/a | " +
        "//div[@class='related']/a";


var a = document.evaluate(s, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);


window.location.href = a.singleNodeValue;
//alert(a.singleNodeValue);
}

window.setTimeout(f, 3000);