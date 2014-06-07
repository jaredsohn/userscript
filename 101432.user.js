// ==UserScript==

// @name           Ibranch (workaround)

// @namespace      http://www.brucestockwell.net/

// @description    Workaround for Ibranch in new dc in outwar

// @include        *.outwar.com/*

// ==/UserScript==



oaf = function () {
if (( document.URL.indexOf("world.php") != -1 ) || ( document.URL.indexOf("wilderness.php") != -1 )) {
    window.addEventListener("click", fixLinks, false); 
}



    function fixLinks(){
        fn = function(e){
            GM_openInTab(this.href);
            e.preventDefault();
        };
        el = document.links;
        if (el) {          
            loadEvents(el,fn);
        };
    }
    function loadEvents(links, fn){
        for (var i = 0; i < links.length; i++) {
            if (links[i].href.indexOf("newattack.php?") > 0) {
                var link = document.createElement('a');
                link.setAttribute('href',links[i].href);
                link.setAttribute('title',"iBranch Attack");
                link.appendChild(document.createTextNode('iBranch'));
                link.addEventListener("click", fn, false);
		// Make it pretty
		link.setAttribute('style','color: #ffa500; font-weight: bold')
                links[i].parentNode.appendChild(link);
                links[i].parentNode.removeChild(links[i]);
            };
        };
    };
};

oaf();