// ==UserScript==
// @name        Wretch Album Style Remover
// @version     20120318.0
// @namespace   http://blog.gslin.org/plugins/wretch-album-style-remover
// @description Remove wretch album style
// @homepage    http://blog.gslin.org/plugins/wretch-album-style-remover
// @include     http://www.wretch.cc/album/*
// ==/UserScript==

(function(){
    var obj = document.styleSheets;
    for (var i = 0; i < obj.length; i++) {
        obj.item(i).disabled = true;
    }

    obj = document.getElementsByTagName('*');
    for (var i = 0; i < obj.length; i++) {
        obj[i].style.cssText = '';
    }

    // Id

    obj = document.getElementById('ad_banner');
    if (obj) {
        obj.parentElement.removeChild(obj);
    }

    obj = document.getElementById('footer-switch');
    if (obj) {
        obj.parentElement.removeChild(obj);
    }

    obj = document.getElementById('kukubar-lower');
    if (obj) {
        obj.parentElement.removeChild(obj);
    }

    var obj = document.getElementById('kukubar-upper');
    if (obj) {
        obj.parentElement.removeChild(obj);
    }

    obj = document.getElementById('photowall');
    if (obj) {
        obj.parentElement.removeChild(obj);
    }

    obj = document.getElementById('rapid_album');
    if (obj) {
        obj.parentElement.parentElement.removeChild(obj.parentElement);
    }

    // Class

    obj = document.getElementsByClassName('hidden');
    for (var i = 0; i < obj.length; i++) {
        obj[i].parentElement.removeChild(obj[i]);
    }

    obj = document.getElementsByClassName('social-wrapper');
    if (obj) {
        obj[0].parentElement.removeChild(obj[0]);
    }
})();
