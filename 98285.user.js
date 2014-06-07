// ==UserScript==
// @name           Desheen
// @description    Remove references to Charlie Sheen
// @namespace http://userscripts.org/users/302035
// @include http://*.theage.com.au/*
// @include http://*.smh.com.au/*
// @match http://*.theage.com.au/*
// @match http://*.smh.com.au/*
// ==/UserScript==

function hideNavOf(tag) {
    for (var parent = tag.parentNode; parent; parent = parent.parentNode) {
        if (parent.tagName == 'DIV') {
            parent.style.visibility = 'hidden';
            break;
        }
    }
}

/* must be a faster way to do this? */
var links = document.getElementsByTagName('A');
for (var i = 0; i < links.length; i++) {
    if (links[i].textContent.indexOf('Sheen') != -1) {
        console.log('hiding based on link textContent = ' + links[i].textContent);
        hideNavOf(links[i]);
    }
    else {
        var title = links[i].getAttribute('title');
        if (title && title.indexOf('Sheen') != -1) {
            console.log('hiding based link title = ' + links[i].textContent);
            hideNavOf(links[i]);
        }
    }
}
var paras = document.getElementsByTagName('P');
for (var i = 0; i < paras.length; i++) {
    if (paras[i].textContent.indexOf('Sheen') != -1) {
        console.log('hiding based on paragraph textContent = ' + paras[i].textContent);
        hideNavOf(paras[i]);
    }
}

