// ==UserScript==
// @name           Symmetric Links
// @namespace      kol.interface.unfinished
// @description    Allows filtering of 'what links here' to discover non-symmetric links in the KoL wiki.
// @include        http://kol.coldfront.net/thekolwiki/index.php/Special:WhatLinksHere/*
// @include        http://kol.coldfront.net/thekolwiki/index.php?title=Special:WhatLinksHere/*
// ==/UserScript==

// Version 1.0

function addOption() {
    var snap = document.evaluate( '//p[contains(.,"The following pages link to")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (snap)  {
        var fpage = snap.getElementsByTagName('a');
        snap.appendChild(document.createElement('br'));
        var i = document.createElement('input');
        i.setAttribute('type','checkbox');4
        i.setAttribute('id','symmetriclinkanchor');
        i.setAttribute('style','vertical-align:middle;');
        i.addEventListener('click',filterHandler,true);
        if (fpage) {
            i.setAttribute('page',fpage[0].getAttribute('href'));
        }
        snap.appendChild(i);
        i = document.createElement('label');
        i.setAttribute('style','vertical-align:middle;');
        i.appendChild(document.createTextNode(' Filter out symmetric links.'));
        snap.appendChild(i);
    }
}

function filterHandler() {
    if (this.getAttribute('checked')) {
        this.removeAttribute('checked');
        var ps = document.getElementsByClassName('symmetric');
        for (var i=0;i<ps.length;i++) {
            ps[i].removeAttribute('style');
        }
    } else {
        this.setAttribute('checked','true');
        //GM_log('fetching: '+'http://kol.coldfront.net'+this.getAttribute('page'));
        getUrl('http://kol.coldfront.net'+this.getAttribute('page'));
    }
}

function processPage(p) {
    var links = {};
    p = p.replace(/[.\n]*<!-- start content -->/,'');
    p = p.replace(/<!-- end content -->[.\n]*/,'');
    //GM_log('processpage = '+p);
    var i = p.match(/href\s*=\s*\"[^\"]*\"/ig);
    if (i) {
        for (var k=0;k<i.length;k++) {
            var link = i[k].replace(/^[^\"]*\"/,'').replace(/\".*$/,'');
            if (link.indexOf('/thekolwiki')==0 && link.indexOf('?')<0) {
                //GM_log('link: '+link);
                links[link] = true;
            }
        }
    }
    // now find local list of links
    var x = document.getElementById('symmetriclinkanchor').parentNode.nextSibling;
    while (x) {
        if (x.tagName=='UL') {
            break;
        }
        x = x.nextSibling;
    }
    if (x) {
        var ps =  x.getElementsByTagName('a');
        for (var i=0;i<ps.length;i++) {
            var m = ps[i].getAttribute('href');
            if (links[m]) {
                ps[i].parentNode.setAttribute('class','symmetric');
                ps[i].parentNode.setAttribute('style','display:none');
            }
        }
    }
}


function getUrl(u) {
    GM_xmlhttpRequest({
            method: "GET",
                url: u,
                headers: {
                "User-Agent": "Mozilla/5.0",
                    "Accept": "text/xml"
                    },
                onload: function(response) {
                //GM_log('page='+response.responseText);
                processPage(response.responseText);
            }
        });
}


addOption();
