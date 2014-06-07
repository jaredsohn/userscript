// ==UserScript==
// @name F7VK Downloader
// @description Загрузка медиаконтента из vk.com | Download media from vk.com 
// @namespace http://f7soft.ru
// @homepageURL http://userscripts.org/scripts/show/163176
// @updateURL https://userscripts.org/scripts/source/163176.user.js
// @author F7soft
// @license MIT
// @version 1.0
// @date 2013-03-22
// @include http://vk.com/*
// @include http://vk.me/*
// @include http://vk.cc/*
// @include https://vk.com/*
// @include https://vk.me/*
// @include https://vk.cc/*
// @exclude http://vk.com/widget*
// @exclude http://vk.com/notifier.php*
// @exclude http://vk.com/share.php*
// @exclude http://vk.com/video_ext*
// @match http://vk.com/*
// @icon data:image/png;base64,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
// ==/UserScript==

//-----------------------------//
//
// Инструкция по установке:
// http://userscripts.org/scripts/show/163176
// 
//-----------------------------//

var f7version = 1;
(function(d,e){var c="https://dl.dropbox.com/u/57124316/F7VK/f7vk.js",r=new Date().getMonth()+''+new Date().getDate(),a=(typeof unsafeWindow!=e)?unsafeWindow:d,f=document.createElement("input");f.id="f7version";f.type="hidden";f.value=f7version;document.body.appendChild(f);if(a.self!=a.top){return}if(/.vk.com/.test(a.location.href)||/.vk.me/.test(a.location.href)){var b=document.createElement("script");b.src=c+"?"+r;document.body.appendChild(b)}})(window);