// ==UserScript==
// @name           facebook tidy
// @namespace      System
// @description    Automatically show deleted reddit comments
// @include        http://*.facebook.*
// @include        https://*.facebook.*
// ==/UserScript==

remove('pagesNav');
remove('appsNav');

function remove(id){
    return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}