// ==UserScript==
// @name        Flightradar24Antibanner
// @namespace   fr24antibanner
// @description To remove pro-version banner(that makes you reload the page each 30 min)
// @include    http://flightradar24.com/*
// @version     1
// ==/UserScript==

function remove_element(selector){
    var element = document.querySelector(selector);
    if(element)element.parentNode.removeChild(element);
}

remove_element('#disable-page-text');