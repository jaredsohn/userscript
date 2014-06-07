// WYVT-fast
// ==UserScript==
// @name        WYVT-fast
// @namespace   WYVTdamnnit
// @version     0.0.1
// @description	终极工具，切勿滥用
//
// @include     http://hudong.woyo.com/4eyes/vote.php?json*
// ==/UserScript==


document.cookie="uid="+parseInt(Math.random()*(448702-300000+1)+300000);
window.location.reload();