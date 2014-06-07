// ==UserScript==
// @name           Disable GOGL Instant Previews and white space
// @namespace      http://khlizard.vanu.jp/
// @description    Disable Google Instant Previews and white space. Forked from ahom (http://userscripts.org/scripts/show/90678).
// @include        http://*.google.*/search*
// @include        https://encrypted.google.com/*
// @version        1.0
// ==/UserScript==

(function(doc){
    doc.body.addEventListener('DOMNodeInserted', function(e) {
        var vsc, vspib, i, iz, j, jz, ccol, res,
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

        ccol = doc.getElementById('center_col');
        ccol.style.width = 'auto';
        ccol.style.marginRight = '0px';

        res  = doc.getElementsByClassName('s');
        iz   = res.length;
        for (i = 0; i < iz; i++) res[i].style.maxWidth = "none";

    }, true);
})(document);
