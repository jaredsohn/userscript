// ==UserScript==
// @name           Adfly Skip Plus
// @author         Cagri Ari
// @description    Adfly linklerini jet hizinda gecin!
// @version        1.0
// @include       *adf.ly/*
// ==/UserScript==
    var url = document.URL;
    if (url.indexOf("adf.ly/") != -1) {
        window.location.href = 'http://kill-adfly.comyr.com/?link=' + document.URL;
    }