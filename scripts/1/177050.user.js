// ==UserScript==
// @id             OC_theMarkerComment
// @name           fix themarker comment scrolling when adblock easyprivacy is enabled
// @version        1.0
// @namespace      ohadcn
// @author         Ohad Cohen
// @description    fix themarker comment scrolling when adblock easyprivacy is enabled
// @include        *.themarker.com/*
// @run-at         document-end
// ==/UserScript==

fixCommentsLinks=function(){
    jQuery().ready(function() {
        $(".content-tab .title").removeAttr("href");
        _continueToUpdateStatisticsServer=false;
    });
}

//inject the script into the page, this is needed for the call to work
var myScript=document.createElement("script");
myScript.innerHTML="("+fixCommentsLinks+")()";
document.head.appendChild(myScript);
