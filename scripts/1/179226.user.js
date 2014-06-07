// ==UserScript==
// @name        Xvideos Download link
// @namespace   Angablade
// @description Adds download link for Xvidoes video
// @include     http://www.xvideos.com/video*
// @version     1
//
// @grant        GM_getValue
// @grant        GM_log
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// ==/UserScript==

link = document.getElementById('content');
link.innerHTML+='<a href="'+decodeURIComponent(document.body.innerHTML.split("flv_url=")[1].split('&amp;url_bigthumb')[0])+'" download="video'+Math.floor(Math.random()*100001)+'.flv"><button>Download</button></a>'