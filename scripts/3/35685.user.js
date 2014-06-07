// ==UserScript==
// @name           BBC RealPlayer URL Finder
// @namespace      http://www.secomputing.co.uk/bbcschedulelinks
// @include        http://www.bbc.co.uk/*/programmes/schedules*
// @include        http://www.bbc.co.uk/*/progs/listenagain.shtml
// @description    Script to add links below each show on a BBC radio schedule to the RealPlayer file for that show. A "Get RAM Link" link is added to each show, clicking on this fetches the URL of the RAM file and displays it. Working as of 2008-10-19.
// ==/UserScript==

var links = document.links;

function f(l, URL) {
    return function() {
        var console = GM_xmlhttpRequest({method : "GET",
                             url : URL,
                             onload : function(res) {
            var ram = /http.*ram/.exec(res.responseText);
            if(ram == null) {
                var error = document.createElement('SPAN');
                error.innerHTML = "Could not find link";
                l.parentNode.insertBefore(error, l.nextSibling);
                l.parentNode.removeChild(l);
            } else {
                var newLink = document.createElement('A');
                newLink.href = ram;
                newLink.innerHTML = ram;
                l.parentNode.insertBefore(newLink, l.nextSibling);
                l.parentNode.removeChild(l);
            }
        }});
    };
}

// http://www.bbc.co.uk/*/progs/listenagain.shtml
if(/.*listenagain\.shtml/.exec(document.URL)) {
    for(var i=0;i<links.length;i++) {
        var link = links[i];
        if(link.href.match(/.*_aod.shtml.*/)) {
            var loadlink = document.createElement("A");
            loadlink.innerHTML = "Get RAM link.";
            loadlink.style.cursor = "hand";
            loadlink.addEventListener("click", f(loadlink, link.href), false);
            var br = document.createElement("BR");
            link.parentNode.insertBefore(br, link.nextSibling);
            link.parentNode.insertBefore(loadlink, br.nextSibling);
        }
    }
} else {
    // http://www.bbc.co.uk/*/programmes/schedules*
    for(var i=0;i<links.length;i++) {
        var link = links[i];
        if(link.href.match(/http:\/\/www.bbc.co.uk\/programmes\/.*/)) {
            var showid = /http:\/\/www.bbc.co.uk\/programmes\/(.*)/.exec(link)[1];
            var URL = "http://www.bbc.co.uk/iplayer/console/" + showid;
            var loadlink = document.createElement("A");
            loadlink.innerHTML = "Get RAM link.";
            loadlink.style.cursor = "hand";
            loadlink.addEventListener("click", f(loadlink, URL), false);
            var br = document.createElement("BR");
            link.parentNode.insertBefore(br, link.nextSibling);
            link.parentNode.insertBefore(loadlink, br.nextSibling);
        }
    }
}
