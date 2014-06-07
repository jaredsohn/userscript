// ==UserScript==
// @name           View not download
// @namespace      
// @description    view original pictures vkontakte.ru in browser instead of downloading them
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==


function fixDD() {
var obj = document.getElementById('pv_download');
if (obj.href.match(/\?dl=1/)) {
obj.href = obj.href.substring(0, obj.href.length-5);
}
obj.setAttribute('target','_blank');
}
window.addEventListener("DOMNodeInserted", fixDD, false);