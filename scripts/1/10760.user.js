// ==UserScript==
// @name          GoogleInNewTab
// @namespace     http://www.brucestockwell.net/
// @description   Modifies Goodle search result links to open in new tab.
// @include       http://www.google.com/*
// @include       http://images.google.com/*
// @include       http://video.google.com/*
// ==/UserScript==

gnt = function () {

    window.addEventListener("load", init, false); 
    
    function init() {
        
    loadVideoLinks(document.getElementById('resultsdiv')); //video
    loadImageLinks(document.getElementById('ImgContent')); //images
    loadWebLinks(document.getElementById('res')); //web

    };

    function loadVideoLinks(el){
        fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };
        if (el) {
            el_links = el.getElementsByTagName('a');
            loadVideoEvents(el_links,fn);
        };
    };

    function loadImageLinks(el){
        fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };
        if (el) {
            el_links = el.getElementsByTagName('a');
            loadImageEvents(el_links,fn);
        };
    };

    function loadWebLinks(el){
        fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };
        if (el) {
            el_links = el.getElementsByTagName('a');
            loadWebEvents(el_links,fn);
        };
    };

    function loadVideoEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", fn, false);
        };
    };

    function loadImageEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", fn, false);
        };
    };

    function loadWebEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            if (links[i].className == "l") {
                links[i].addEventListener("click", fn, false);
            }
        };
    };

    function loadEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener("click", fn, false);
        };
    };
};

gnt();
