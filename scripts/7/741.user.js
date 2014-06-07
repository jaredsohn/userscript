// ==UserScript==
// @name           Accessify
// @namespace      http://jzig.com
// @description    Adds accesskeys to next, previous, back, forward, home, and download text links
// @include        *
// ==/UserScript==

(function () {    
    var xpath = "//text()[(ancestor::a) and (" +
                "contains(translate(., 'NEXT', 'next'), 'next') or " +
                "contains(translate(., 'BACK', 'back'), 'back') or " +
                "contains(translate(., 'FORWARD', 'forward'), 'forward') or " +
                "contains(translate(., 'HOME', 'home'), 'home') or " +
                "contains(translate(., 'DOWNLOAD', 'download'), 'download') or " +
		"contains(translate(., 'PREV', 'prev'), 'prev'))]";

    var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var nf = false, pf = false, ff= false, bf = false, hf = false, df =  false;

    for (var cand = null, i = 0; (cand = candidates.snapshotItem(i)); i++) {

    	var keyvalue = null;
        if ((/^\W*next/i.test(cand.nodeValue) || /next\W*$/i.test(cand.nodeValue)) && !nf) {
            keyvalue = "n";
            nf = true;
        }
        else if ((/^\W*prev/i.test(cand.nodeValue)|| /prev(ious)?\W*$/i.test(cand.nodeValue)) && !pf) {            
            keyvalue = "p";
            pf = true;
        }
        else if ((/^\W*forward/i.test(cand.nodeValue)|| /forward\W*$/i.test(cand.nodeValue)) && !ff) {            
            keyvalue = "f";
            ff = true;
        }
        else if ((/^\W*back/i.test(cand.nodeValue)|| /back\W*$/i.test(cand.nodeValue)) && !bf) {            
            keyvalue = "b";
            bf = true;
        }
        else if ((/^\W*home/i.test(cand.nodeValue)|| /home\W*$/i.test(cand.nodeValue)) && !hf) {            
            keyvalue = "h";
            hf = true;
        }
        else if ((/^\W*download/i.test(cand.nodeValue)|| /download\W*$/i.test(cand.nodeValue)) && !df) {            
            keyvalue = "d";
            df = true;
        }
	if (keyvalue == null) continue;
        
        var anc = cand.parentNode;
        while (anc.tagName != "A") {
            anc = anc.parentNode;
        }
        if (anc.getAttribute("accesskey") == null) {
       	    anc.setAttribute("accesskey",keyvalue);
        }
    }
})();