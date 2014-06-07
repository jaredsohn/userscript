// ==UserScript==
// @name          LinksInNewTab
// @namespace     http://www.brucestockwell.net/
// @description   Modifies page links to open in new tab.
// @include       http://www.google.com/*
// ==/UserScript==

gnt = function () {

    window.addEventListener("load", loadEvents, false); 
    
    function loadEvents() {
        var fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };
        var links = document.getElementsByTagName('a');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", fn, false);
        };
    };
};

gnt();
