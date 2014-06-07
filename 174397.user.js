// ==UserScript==
// @name           Better CyanogenMod Download Page
// @description    Extend model names
// @include        http://get.cm/*
// @version        1.0
// @author         Balazs Nadasdi (http://balazsnadasdi.me)
// ==/UserScript==

var head = document.getElementsByTagName('head')[0],
    style = document.createElement('style');

style.type = "text/css";
style.innerHTML = "a.device span.codename{font-size: 0.9em;color:#888;padding-right: 2px;}a.device span.codename:before{content:'(';}a.device span.codename:after{content:')'}a.device span.fullname{display: inline;}a.device:hover span.codename{display:inline;background-color:#e8e8e8}";
head.appendChild(style);

var left = document.querySelectorAll('.span2');
for(var i = 0, _l = left.length; i < _l; i++) {
  left[i].className = left[i].className.replace(/span2/, "span3");
}

var right = document.querySelectorAll('.span10');
for(var i = 0, _l = right.length; i < _l; i++) {
  right[i].className = right[i].className.replace(/span10/, "span9");
}
