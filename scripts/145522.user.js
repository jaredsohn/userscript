// ==UserScript==
// @name        FA Media Cacher
// @namespace   http://facache.artsifter.com
// @include     http://www.furaffinity.net/*
// @include     https://www.furaffinity.net/*
// @version     3
// @grant       none
// ==/UserScript==
for(var i=0, cnt=document.images.length, elm; i<cnt; i++) {
        elm = document.images[i];
        if(elm.src.indexOf('t.facdn.net') != -1) {
            elm.src = elm.src.replace('t.facdn.net', 'fa.snowme.ws/t');
        } else if(elm.src.indexOf('d.facdn.net') != -1) {
            elm.src = elm.src.replace('d.facdn.net', 'fa.snowme.ws/d');
        }  else if(elm.src.indexOf('a.furaffinity.net') != -1) {
            elm.src = elm.src.replace('a.furaffinity.net', 'fa.snowme.ws/a')
        }
    }

