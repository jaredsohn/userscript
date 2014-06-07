// ==UserScript==
// @name       Turn off autocomplete in CAPTCHA field
// @namespace  http://ivan.ivanych.net/
// @version    0.1
// @author     Ivan Boldyrev
// @licence    MIT
// @grant none
// @description Add autocomplete=off to CAPTCHA input field on some sites...
// @include     http://intmail.183.com.cn/*
// @include     http://www.russianpost.ru/*
// @include     http://russianpost.ru/*
// ==/UserScript==

(function () {
    function off(id) {
        var inp = document.getElementById(id);
        if (inp) {
            inp.setAttribute('autocomplete', 'off');
        }
    };
    if (/^http:\/\/intmail\.183\.com\.cn\//.test(window.location.href)) {
        off('sql_KCODE');
    } else if (/^http:\/\/(www\.)?russianpost\.ru\//.test(window.location.href)) {
        off('InputedCaptchaCode');
        
    }
})();
