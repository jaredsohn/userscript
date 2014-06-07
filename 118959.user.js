// ==UserScript==
// @name           gamekult surprise !
// @namespace      gamekult.com
// @description    Gamkult surprise !
// @include        *www.gamekult.com*
// ==/UserScript==
document.getElementsByTagName('head')[0].innerHTML += '<link href="http://static.gamekult.com/css/skin.php?v='+Math.random()+'" media="screen" rev="stylesheet" rel="stylesheet" type="text/css"/>';
