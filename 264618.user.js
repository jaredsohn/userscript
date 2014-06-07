// ==UserScript==
// @name       VK Music Download
// @namespace  http://vk.com/audio*
// @version    0.4
// @description  This script was stolen from http://vkontaktemp3.ru/scripts.html I just store it on dropbox for avoiding possible unsafe changes on original script which can stole cookies.
// @include    /^https?://vk\.com/.*$/
// @copyright  Copyfuck
// ==/UserScript==

//	alert('Наведите мышку на песню и вы увидите "дискетку" для скачивания');

var s=document.createElement('script');
s.src='https://dl.dropboxusercontent.com/s/bupajthesh1nnwv/vkaudio.js?dl=1';
document.body.appendChild(s);
