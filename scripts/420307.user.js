// No Want Want
// version 0.1
// Yi-Huan Chan
// 2014-03-20
// Released to the public domain.
//
// Inspired by 旺中守門員 (https://chrome.google.com/webstore/detail/%E6%97%BA%E4%B8%AD%E5%AE%88%E9%96%80%E5%93%A1/jgoljbdcdakinkigihjocpniamcgofmm?hl=zh-TW)
// Inspired by Block Sites (https://userscripts.org/scripts/review/18722)
//
// ==UserScript==
// @name          No Want Want
// @description   Blocks Want Want related websites
// @include       /^https?://.*\.chinatimes\.com/.*$/
// @include       /^https?://.*\.ctitv\.com\.tw/.*$/
// @include       /^https?://.*\.ctv\.com\.tw/.*$/
// @include       /^https?://.*\.want-daily\.com/.*$/
// @grant         none
// ==/UserScript==

(function () {
        var b = (document.getElementsByTagName("body")[0]);
        b.innerHTML = '';
        b.setAttribute('style', 'display:none!important');
        alert("This site has been blocked!");
})();
