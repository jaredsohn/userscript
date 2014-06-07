// ==UserScript==
// @name Alfaclick OnStartPassFocus
// @description Focus password field on alfaclick page loaded.
// @author Adik Servitola
// @license Public Domain
// @version 1.0
// @include https://click.alfabank.ru/adfform/*
// ==/UserScript==

(function (window, undefined) {
       
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    
    // check if window is top window (script will not run in frames)
    if (w.self != w.top) {
        return;
    }
    
    // second check of url (
    if (/https:\/\/click.alfabank.ru\/adfform/.test(w.location.href)) {
        var form = document.getElementById('form');
        
        if(form.username.value == '') {
            form.username.focus();
        } else {
            form.password.focus();
        }
    }
})(window);