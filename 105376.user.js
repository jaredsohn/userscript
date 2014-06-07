// ==UserScript==
// @name           Hwupgrade clean
// @namespace      *hwupgrade.it/forum/*
// @description    Sega via il blocco pubblicitario in cima alla pagina
// @include        *hwupgrade.it/forum/*
// @author         kache
// ==/UserScript==

var stuff_to_remove = [
    "//div[@id='fedHead']",
    "//html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td/div/div/div/table[2]",
    "//html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td/div/div/div/br[2]",
    "//html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td/div/div/div/style",
    "//html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td/div/div/div/br[3]",
    "//html/body/table/tbody/tr/td[2]/table[3]/tbody/tr/td/div[2]/div/div/div/div/div[2]",
];

function $x(p, context) {
    if (!context) context = document;
    var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

stuff_to_remove.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
                item.parentNode.removeChild(item);
            }
        );
    }
);
