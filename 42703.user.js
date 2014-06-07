// ==UserScript==
// @name          Outwar bar teleport removal
// @namespace     
// @description   Deletes bar teleport link
// @include       http://*.outwar.com/*
// ==/UserScript==

oaf = function () {

    window.addEventListener("load", fixLinks, false); 

    function fixLinks(){
        fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };

        el = document.getElementsByTagName('a');
        if (el) {          
            loadEvents(el,fn);
        };
    }

    function loadEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.indexOf("world.php?teleport=1") > 0) {
                var link = document.createElement('a');
                link.setAttribute('href',links[i].href);
                link.setAttribute('title',"");
                link.appendChild(document.createTextNode(''));
                link.addEventListener("click", fn, false);
                links[i].parentNode.appendChild(link);
                links[i].parentNode.removeChild(links[i]);
            };
        };
    };
};

oaf();
