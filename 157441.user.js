// ==UserScript==
// @name        Hide prices on nubert.de
// @namespace   nubert_hide_prices_264
// @description Hide the price tags on nubert.de (WAF++)
// @icon        http://www.nubert.de/images/cms/nusletter/nus_2010-10_nubi.jpg
// @include     http://www.nubert.de/index.php?action=product*
// @include     http://www.nubert.de/index.php?action=set*
// @include     http://www.nubert.de/index.php?id=*
// @version     1.0
// @grant       none
// ==/UserScript==

var currentURL = (document.location+'');
 
if (currentURL.match(/http:\/\/www\.nubert.de\/index.php\?id=\d+/)) {
    // Remove prices from lists of single products
    var pricelist = document.getElementsByClassName("productlist_price");
    for (var i=0; i < pricelist.length; i++)
    {
        removeNode(pricelist[i]);
        i--;
    }
    
    // Remove prices from lists of sets
    var morelist = document.getElementsByClassName("more");
    for (var i=0; i < morelist.length; i++)
    {
        var pricelist = morelist[i].parentNode.getElementsByTagName("em");
        for (var k=0; k < pricelist.length; k++) {
            removeNode(pricelist[k].parentNode);
            k--;
        }
    }
} else if (currentURL.match(/http:\/\/www\.nubert.de\/index.php\?action=(product|set).*/)) {
    var price = document.getElementById("product_price").parentNode;

    // Remove "Preis pro Set/Stück"
    var priceparentlist = price.parentNode.getElementsByTagName("div");
    for (var i=0; i < priceparentlist.length; i++) {
        if (priceparentlist[i].innerHTML.match(/Preis pro .*/))
            removeNode(priceparentlist[i]);
    }
    
    // Remove "Finanzierung"
    removeNode(price.parentNode.getElementsByClassName("finanzierung")[0]);
    
    // "Zuzüglich Versandkosten..." -> "Versandkosten"
    try { price.parentNode.getElementsByClassName("shipping")[0].innerHTML="Versandkosten"; } catch(e) {}
    
    // Remove price
    removeNode(price);
}

function removeNode(node) {
    if (node != undefined)
        return (node.parentNode.removeChild(node));
}