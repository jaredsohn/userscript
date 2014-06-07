// ==UserScript==
// @name          Outwar iBranch Attack Fix
// @namespace     http://www.brucestockwell.net/
// @description   Modifies Outwar attack hyperlinks for use with the iMacros plugin for faster DCing.
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
            if (links[i].href.indexOf("attack.php?") > 0) {
                var link = document.createElement('a');
                link.setAttribute('href',links[i].href);
                link.setAttribute('title',"iBranch Attack");
                link.appendChild(document.createTextNode('iBranch'));
                link.addEventListener("click", fn, false);
                links[i].parentNode.appendChild(link);
                links[i].parentNode.removeChild(links[i]);
            };
        };
    };
};

oaf();
