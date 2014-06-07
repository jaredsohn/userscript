// ==UserScript==
// @name           Philip Bloom Comment Area Fixer
// @namespace      pigeontech.com
// @description    This moves the comment area up so there's not a big gap when the article is shorter than the sidebar.
// @include        http://philipbloom.net/*
// ==/UserScript==

var bl = document.getElementsByClassName("span-p-100 first last responsebox");
var n = document.getElementsByTagName("body")[0];
var arr = [];
var re = new RegExp('\\b' + "span-p-100 first last responsebox" + '\\b');
var elem = n.getElementsByTagName("*");
for (var i = 0; i < elem.length; i++) {
    if (re.test(elem[i].className)) {
       arr.push(elem[i]);
    }
}

var i = 0;
(function eachOne() {
    if (i < arr.length) {
    arr[i].className = arr[i].className.replace( /(?:^|\s)span-p-100(?!\S)/ , 'span-p-66' );
    arr[i].setAttribute("style", arr[i].getAttribute("style") + "; float:left; ");
    i++;
    eachOne();
    }
})();

document.getElementById("pbsidebar").setAttribute("style", document.getElementById("pbsidebar").getAttribute("style") + "; float:right; ");

document.getElementById("respond").setAttribute("style", document.getElementById("respond").getAttribute("style") + "; clear:left; ");