// ==UserScript==
// @name           Disable GOGL Instant Previews
// @namespace      http://havelog.ayumusato.com/
// @description    Disable Google Instant Previews.
// @include        http://*.google.*/search*
// @include        https://encrypted.google.com/*
// @version        1.3
// ==/UserScript==

(function(doc){
    doc.body.addEventListener('DOMNodeInserted', function(e) {
        var vsc, vspib, i, iz, j, jz,
            nid = e.target.id;

        if ( nid !== '' && nid !== 'xjsi' ) {
            return false;
        }

        vsc     = doc.getElementsByClassName('vsc');
        vspib   = doc.getElementsByClassName('vspib');
        i       = 0;
        iz      = vsc.length;
        j       = 0;
        jz      = vspib.length;

        for ( ; i < iz; i++ ) vsc[i].className = '';

        for ( ; j < jz; j++ ) vspib[j].parentNode.removeChild(vspib[j]);

    }, true);
})(document);