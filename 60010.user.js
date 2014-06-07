// ==UserScript==
// @name           Don't edit red links
// @namespace      http://userscripts.org/
// @description    Looks for red links in wikimedia sites and sets them to open in view mode, rather than edit mode
// @include        http://*.wiki*edia.org/*
// @include        https://*.wiki*edia.org/*
// ==/UserScript==



//based on http://userscripts.org/scripts/show/57453

(function () {

    dl=document.links;

    for(i in dl){

        if(dl[i].href.substr(-22)=="&action=edit&redlink=1"){

            dl[i].href=dl[i].href.slice(0,-22);

        }

    }

})();