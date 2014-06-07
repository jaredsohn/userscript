// ==UserScript==
// @name       爱漫画
// @author     Zelig
// @version    0.1
// @include    http://imanhua.com/comic/*
// @include    http://*.imanhua.com/comic/*
// @copyright  2012+, Zelig
// ==/UserScript==
(function(){
    var head = document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    head.appendChild(style);
    var css_text = "#subBookList li a:visited {color: green}";
    var css = document.createTextNode(css_text);
    style.appendChild(css);
})();