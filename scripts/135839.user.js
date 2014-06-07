// ==UserScript==
// @id             www.bodden-angeln.de-f091638f-032b-498a-bbc3-060e1fb13d2d@scriptish
// @name           bodden-angeln.de Image Inliner
// @version        1.0
// @namespace      
// @author         kloetpatra
// @description    Shows full size images at galleries.
// @include        http://www.bodden-angeln.de/*
// @run-at         document-end
// ==/UserScript==

es = document.getElementsByTagName("a");
for (i=0; i<es.length; i++) {
    if (es[i].href.search("zeige_b") >= 0) {
        ret = es[i].href.match("zeige_bild%20\\('(.*?)'");
        if (ret.length >= 2) {
            img = document.createElement("img");
            img.src = ret[1];
            es[i].replaceChild(img, es[i].firstChild);
        }
    }
}