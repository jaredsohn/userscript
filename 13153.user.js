// ==UserScript==
// @name           XangaNewHome
// @namespace      http://xanga.noandwhere.com/userscripts
// @description    changes private home links to new home page
// @include        *.xanga.com*
// ==/UserScript==

function newPrivateHome() {
    for (var i = 0; i < document.links.length; i++) {
        if (document.links[i].href.indexOf('http://www.xanga.com/private/home.aspx') != -1) {
            document.links[i].href='http://www.xanga.com/private/homemain.aspx';
        }
    }
}

//if (window.location.href.indexOf('http://www.xanga.com/private/yourhome.aspx') != -1) {
//    window.location.href='http://www.xanga.com/private/homemain.aspx';
//}

window.addEventListener('load', newPrivateHome, false);
