// ==UserScript==
// @name        qdOLScore
// @namespace   org.perzer.qdOLScore
// @include     http://me.qidian.com/profile/score.aspx
// @version     1
// ==/UserScript==
setInterval(function(){if(document.querySelectorAll('a[id^=online-exp-get]')[0]){document.querySelectorAll('a[id^=online-exp-get]')[0].click();setTimeout(function(){window.location.reload()},10000)}},60000 * 10);