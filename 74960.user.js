// ==UserScript==
// @name           Sparknotes de-eyecancer-ifyer
// @namespace      will@psychdesigns.net
// @include        *sparknotes.com*
// @description    Gets rid of all the crap on sparknotes.com, making it more readable and less distracting
// ==/UserScript==

(function(){
    var byId = function(id){
        return document.getElementById(id);
    }
    var dElem = function(id){
        var e = byId(id);
        e.parentNode.removeChild(e);
    };
    var makeOpaque = function(id){
        byId(id).style.opacity = 0.75;
    }
    document.body.style.backgroundImage = "none";
    byId("containerInner").style.backgroundImage = "none";
    byId("mainContent").style.width="730px";
    var killElems = ["sidebar2", "news_ticker"];
    for(var i in killElems){
        dElem(killElems[i]);
    }
    var fadeElems = ["container_header"];
    for(var i in fadeElems){
        makeOpaque(fadeElems[i]);
    }
    
})();
