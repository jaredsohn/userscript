// ==UserScript==
// @name           ExperteerFreeSearch
// @namespace      http://www.iniqua.com
// @description    Only unlock results in Experteer trial accounts Keyword Search.
// @include        http://www.experteer.es/*
// @include        https://www.experteer.es/*
// @include        https://eu.experteer.com/*
// @include        http://eu.experteer.com/*
// ==/UserScript==
disable_div = document.getElementById('search_disabled');
disquieter_div = document.getElementById('disquieter_wrapper');
if (disable_div){
     disable_div.parentNode.removeChild(disable_div);
}
if (disquieter_div){
     disquieter_div.parentNode.removeChild(disquieter_div);
}
