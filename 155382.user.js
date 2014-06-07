// ==UserScript==
// @name        Email links in salesforce open in a new tab
// @namespace   DavidAffinito
// @description Makes Email links in salesforce open in a new tab
// @include     https://*.salesforce.com/*
// @copyright   Copyright 2012 David Affinito
// @license     CC BY http://creativecommons.org/licenses/by/3.0/
// @version     1.0
// ==/UserScript==

if (document.body){
    checkNode(document.body);
    
    var MutOb, chgMon, i, httpels, opts;
    var MutOb = (window.MutationObserver) ? window.MutationObserver : window.WebKitMutationObserver;
    
    if (MutOb){
        chgMon = new MutOb(function(mutationSet){
            mutationSet.forEach(function(mutation){
                for (i=0; i<mutation.addedNodes.length; i++){
                    if (mutation.addedNodes[i].nodeType == 1){
                        checkNode(mutation.addedNodes[i]);
                    }
                }
            });
        });
        opts = {childList: true, subtree: true};
        chgMon.observe(document.body, opts);
    }

}
function checkNode(el){
    var aLinks = el.querySelectorAll('.actionLink');
    var same_site = window.location.protocol.toLowerCase() + "//" + window.location.hostname.toLowerCase();
    var href = "";
    if (aLinks.length > 0){
        for (var j = 0; j < aLinks.length; j++){
            href = aLinks[j].href.toLowerCase();
            if (href.indexOf("javascript:") != 0){
                aLinks[j].setAttribute("target", "_blank");
            }
        }
        var addshad = document.createElement("style");
        addshad.setAttribute("type", "text/css");
        addshad.appendChild(document.createTextNode(".actionLink:hover{text-shadow: 1px 2px 5px #000066}"));
        document.body.appendChild(addshad); 

    }
    
}