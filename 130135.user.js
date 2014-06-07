// ==UserScript==
// @name          FurAffinity double.back
// @version       0.1
// @description   Puts additional gallery navigation at the top of galleries.
// @include       *://*furaffinity.net/browse*
// @include       *://*furaffinity.net/gallery/*
// @include       *://*furaffinity.net/scraps/*
// @include       *://*furaffinity.net/favorites/*
// ==/UserScript==

(function() {
    var nav = null;
    var gallery = null;
    
    console.log('loaded');
    if (location.href.indexOf('/browse/') > 0) {
        var nav     = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody/tr/td/div[3]/table/tbody/tr/td/table/tbody/tr[3]", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
        var gallery = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody/tr/td/div[3]/table/tbody/tr/td/table/tbody/tr[2]", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    } else {
        var nav     = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody/tr/td/div[3]/table[2]/tbody/tr/td/table/tbody/tr[3]", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
        var gallery = document.evaluate("/html/body/div/table/tbody/tr[2]/td/table/tbody/tr/td/div[3]/table[2]/tbody/tr/td/table/tbody/tr[2]", document, null, XPathResult.ANY_TYPE, null ).iterateNext();
    }
    
    console.log(gallery);
    console.log(nav);
    
    if (gallery != null && nav != null) {
        gallery.parentNode.insertBefore(nav.cloneNode(true), gallery);
    }
    
})();

