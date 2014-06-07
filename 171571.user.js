// ==UserScript==
// @name       Changba Resolver
// @namespace  http://openszone.com
// @author  Myfreedom614 <openszone@gmail.com>
// @version    0.1
// @description  Download audio from changba.com
// @homepage	https://userscripts.org/scripts/show/171571
// @updateURL	https://userscripts.org/scripts/source/171571.meta.js
// @downloadURL	https://userscripts.org/scripts/source/171571.user.js
// @include        http://changba.com/s/*
// @grant none
// @copyright  2013,Myfreedom614
// ==/UserScript==

/* History
 * 2013-06-22 v0.1 First Version
 */

var reg = /mp3:"((\w+.|\/)+(\w+).(mp3|wma))"/i;
var link = document.body.outerHTML.match( reg );
var dl = document.getElementsByClassName( 'nav_item_wrap' )[0].getElementsByTagName( 'a' )[0];
dl.href = link[1];
dl.innerHTML = "点击下载此歌曲";
dl.style.color = "white";
dl.style.fontSize = "20px";
document.getElementsByClassName( 'nav_item_wrap' )[0].style.marginTop = "10px";