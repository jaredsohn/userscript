// ==UserScript==
// @name          Self-Censorship
// @namespace     http://userscripts.org
// @description	  Keep double-plus ungood words off of your screen.  Edit the array "badwords" to control which words are removed from pages and replaced with ***.
// @include       http://www.anarchistblackcat.org/*
// ==/UserScript==

(function() {
    //edit the words here but ...
    var badwords=['anarchist','anarch'];

    //do not touch anything below here
    var bw="("+badwords.join("|")+")";
    bw=new RegExp(bw, "gi");
 
    var els = document.evaluate('//*', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var el,i=0;
    while (el=els.snapshotItem(i++)) {
        //don't mess with these tags
        if ('SCRIPT'==el.tagName) continue;
        if ('STYLE'==el.tagName) continue;

        for (var j=0; j<el.childNodes.length; j++) {
            if ('#text'==el.childNodes[j].nodeName) {
                el.childNodes[j].textContent=el.childNodes[j].textContent.replace(bw, '***');
            }
        }
    }
    document.title=document.title.replace(bw, '***');
})
();

// Future feature: user can add more words to censor, by typing them
//   into a handy text box.
//
// LICENSE:
//
// This script was modified by "red paint". Original license follows:
//
// Originally written by Anthony Lieuallen of http://www.arantius.com/
// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.
//
// If possible, please contact me regarding new features, bugfixes
// or changes that I could integrate into the existing code instead of
// creating a different script.  Thank you.
