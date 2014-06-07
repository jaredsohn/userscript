// ==UserScript==
// @name	Lnk.co Skipper
// @version	1.1
// @date	2011-08-11
// @description	Ce script ouvre automatiquement les liens créés par Lnk.co sans temps d'attente.
// @creator	Source Sascha Heldt <sascha@softcreatr.de>
// @include	*lnk.co/*
// ==/UserScript==

// Bypass function
function bypass(go_to) {
    if(go_to) {
        document.title = 'Bypassed!';
        document.getElementsByTagName('html').innerHTML = 'Redirecting to: <a href="' + go_to + '">' + go_to + '</a>';
        window.location = go_to;
    }
}

// Let's go
if(document.getElementById('urlholder')) {
    bypass(document.getElementById('urlholder').value);
}