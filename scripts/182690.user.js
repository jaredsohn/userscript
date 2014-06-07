// ==UserScript==
// @name       VK.COM NSFW
// @namespace  http://use.i.E.your.homepage/
// @version    100.500
// @description  NSFW userjs (vk.com)
// @match      http://vk.com/*
// @match      http://vk.com/im*
// @match      http://vk.com/mail*
// @copyright  Антон Штольц (/antoshashto)
// ==/UserScript==

var cst = '.page_post_thumb_sized_photo{ opacity: 0.1; } .page_post_thumb_sized_photo:hover{opacity:1}';
var html_doc = document.getElementsByTagName('head').item(0);
var js = document.createElement('style');
js.setAttribute('type', 'text/css');
js.innerHTML = cst;
html_doc.appendChild(js);