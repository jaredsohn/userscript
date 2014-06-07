// ==UserScript==
// @name Steamru Trainru
// @namespace SomethingUnique
// @match http://*.reddit.com/r/gamegrumps*
// @match https://*.reddit.com/r/gamegrumps*
// @match http://reddit.com/r/gamegrumps*
// @match https://reddit.com/r/gamegrumps*
// ==/UserScript==

replaceAllInElement = function(p) {
    if(!htmlRegex.test(p.innerHTML)) {
        if(!p.innerHTML)
            return;
        
        var words = p.innerHTML.split(" ");
        var magicRegex = /[\.,]+$/;
        for(var j = 0; j < words.length; j++) {
            if(words[j].search(magicRegex) != -1)
                words[j] = words[j].replace(magicRegex, "aru$&");
            else
                words[j] = words[j] + "aru";
        }
        p.innerHTML = words.join(" ");
    }	
}

var mds = document.getElementsByClassName("md");
for(var i = 0; i < mds.length; i++) {
    var ps = mds[i].getElementsByTagName("p");
    var htmlRegex = /.*<.*/;
    for(var k = 0; k < ps.length; k++) {
        var p = ps[k];
        replaceAllInElement(p);
        if(p.childNodes) {
            for(var l = 0; l < p.childNodes.length; l++)
                replaceAllInElement(p.childNodes[l]);
        }
    }
}
