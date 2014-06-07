// ==UserScript==
// @name	Zpag.es Skipper
// @version	1.0
// @date	2011-08-11
// @description	Ce script ouvre automatiquement les liens créés par Zpag.es sans temps d'attente.
// @author         Source Sascha Heldt <sascha@softcreatr.de>
// @license        Creative Commons Attribution-ShareAlike 3.0
// @include       *zpag.es/*
// ==/UserScript==

// Bypass function
function bypass(go_to) {
    if(go_to) {
        document.title = 'Bypassed!';
        document.getElementsByTagName('html').innerHTML = 'Redirecting to: <a href="' + go_to + '">' + go_to + '</a>';
        window.location = go_to;
    }
}

// Extract function
function extract(lf1, lf2, elm) {
    var a = elm || document.getElementsByTagName('script');
    var b = null;
    var c = 0;
    
    if (a && lf1 && lf2) {
        for (c; c < a.length; c += 1) {
            if (a[c].text.indexOf(lf1) !== -1) {
                b = a[c].text.split(lf1)[1].split(lf2)[0].replace(/\\/g, '');
                
                if(b) {
                    bypass(b);
                }
            }
        }
    }
    
    return false;
}

extract('window.location = "', '"');
