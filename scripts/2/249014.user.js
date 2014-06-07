// ==UserScript==
// @name       imas-cg.net greatest readable
// @namespace  http://aycabta.github.io/
// @version    0.2
// @description  remove fuckin' br tag
// @include    http://imas-cg.net/*
// @copyright  2014+, Code Ass
// ==/UserScript==
 
(function() {
    var nodesToRemove = [];
 
    var resMains = document.getElementsByClassName("resMain");
    for (i = 0; i < resMains.length; i++) {
        var res = resMains[i];
        var br = res.childNodes[0];
        if (br.tagName == "BR") {
            nodesToRemove.push(br);
        }
    }
 
    var reses = document.evaluate('//span[@id="res"]', document, null, XPathResult.ANY_TYPE, null);
    var thisNode = reses.iterateNext();
    while (thisNode) {
        var br;
        br = thisNode.parentNode.nextSibling;
        if (br.tagName == "BR") {
            nodesToRemove.push(br);
        }
        br = thisNode.parentNode.nextSibling.nextSibling;
        if (br.tagName == "BR") {
            nodesToRemove.push(br);
        }
        thisNode = reses.iterateNext();
    }
 
    for (var i = 0; i < nodesToRemove.length; ++i) {
        var node = nodesToRemove[i];
        node.parentNode.removeChild(node);
    }
 
    var style = document.createElement('style');
    style.type = "text/css";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(style);
 
    var sheet = style.sheet;
    sheet.insertRule('.resMain { margin: 0 0 0px 10px; }', sheet.cssRules.length);
})();