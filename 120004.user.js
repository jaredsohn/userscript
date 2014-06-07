// ==UserScript==
// @name        Ehris CPH Fixer
// @version     2011.12.09.03
// @namespace   http://tech.manic.tw/plugins/ehris-cph-fixer
// @description Fix HTML and style in Ehris CPH web site.
// @homepage    http://tech.manic.tw
// @include     http://ehris.cph.com.tw/EHRIS/*
// @include     http://ehris.cph.com.tw/ehris/intranet/*
// ==/UserScript==
(function(){
    var t = document.getElementsByTagName('table');
    t[0].setAttribute('height', '');
})();