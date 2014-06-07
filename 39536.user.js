//
// ==UserScript==
// @name          URLCash / UserCash filter (v3)
// @description   Removes wrapper frame on image pages.
// @include       http://*.usercash.com/*
// @include       http://*.urlcash.net/*
// ==/UserScript==

var r_dn = new RegExp('http://[^.]*\.([a-z]*\.[a-z]*)/');
var r_me = new RegExp('[0-9]*; URL=(http://.*)');

function foreach(tag, func) {
        var a = document.getElementsByTagName(tag);
        for (var i=0; i<a.length; i++) func(a[i]);
}

m = r_dn.exec(document.location);
if (m) {
        dn = m[1];
        if (dn == 'usercash.com') {
                foreach('frame', function(t) {
                        var m = r_dn.exec(t.src);
                        if (m && m[1] != 'usercash.com') document.location = t.src;
                });
        } else if (dn == 'urlcash.net') {
                foreach('meta', function(t) {
                        var ma = t.getAttribute('http-equiv');
                        if (ma && ma.toLowerCase() == 'refresh') {
                                ma = t.getAttribute('content');
                                if (ma) {
                                        var m = r_me.exec(ma);
                                        if (m) document.location = m[1];
                                }
                        }
                });
                foreach('iframe', function(t) {
                        var id = t.getAttribute('id');
                        if (id && id == 'redirectframe') document.location = t.src;
                });
        }
}
