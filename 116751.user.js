// ==UserScript==
// @name          Za refrešat
// @namespace     Refrešer
// @description   Dodaj ?sec=10 na konec urlja in klikni enter! (lahko spreminjaš čas)
// @include       *
// ==/UserScript==


var params = getUrlVars();
var sec = (params['sec']) ? params['sec'] : 0;

if (sec > 0) {
    setTimeout(function() {
        document.location.reload();
        } , sec * 1000
    );
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}