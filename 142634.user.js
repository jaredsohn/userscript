// ==UserScript==
// @name        HabrahabrClean
// @namespace   adverCleaners
// @description To remove all ads from habrahabr
// @include     http://habrahabr.ru/*
// @version     1
// ==/UserScript==
function remove_element(selector){
    var element = document.querySelector(selector);
    if(element)element.parentNode.removeChild(element);
}

remove_element('#topline');
remove_element('.banner_240x400');
remove_element('.banner_special');
remove_element('div.sidebar_right iframe');
