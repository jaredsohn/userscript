// ==UserScript==
// @id             Amazon URL Cleaner
// @name           Amazon URL Cleaner
// @namespace      http://efcl.info/
// @description    replaceState for Amazon
// @include        http://www.amazon.*/dp/*
// @include        http://www.amazon.*/*gp/product/*
// @include        http://www.amazon.*/exec/obidos/ASIN/*
// @include        http://www.amazon.*/o/ASIN/*
// ==/UserScript==
(function(doc) {
    // ASIN.0 in kindle store
    var asin = doc.getElementById("ASIN") || doc.getElementsByName("ASIN.0")[0];
    if (asin) {
        asin = asin.value
        history.replaceState(null, "Amazon URL Cleaner", "/dp/" + asin + "/");
    }
})(document);