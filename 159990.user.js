// ==UserScript==
// @name         Youdao Dict Ad Removal
// @namespace    http://jixun.org/
// @version      1.0.0.1
// @description  Remove Ads at right hand side.
// @include      http://dict.youdao.com/search*
// @copyright    2012+, Jixun
// ==/UserScript==

(function () {
    var s = document.createElement ('style');
    s.innerHTML = '#ads, #topImgAd, a[href*="survey"] { display:none; } .results-content {width: auto;} .result_navigator { margin-top: 70px; }';
    
    document.querySelector ('body').appendChild (s);
})();