// ==UserScript==
// @name           Smart spacebar → next page
// @namespace      http://arty.name/
// ==/UserScript==

(function(){
    var space = ' '.charCodeAt(0);
    document.addEventListener('keypress', function(event){
        if (event.charCode != space) return;
        if (window.scrollY < window.scrollMaxY) return;
        if (event.target.nodeName.match(/input|textarea|select/i)) return;

        var link, links = document.getElementsByTagName('link');
        for (var index = 0; index < links.length; index++) {
            link = links[index];
            if (link.rel != 'next' || !link.href) continue;
            window.location = link.href;
            return;
        }

        links = document.getElementsByTagName('a');
        for (var index = 0; index < links.length; index++) {
            link = links[index];
            if ((link.rel != 'next' && !/next|следующ/i.test(link.textContent)) || !link.href) continue;
            window.location = link.href;
            return;
        }
    }, false);
})()
