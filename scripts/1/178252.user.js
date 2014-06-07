// ==UserScript==
// @name WorkIT_ver1
// @include https://na3.salesforce.com/*
// ==/UserScript==

var a = document.getElementsByClassName("htmlAreaComponentModule")[0];
var b = a[0].getElementsByTagName('div');
a[0].style.position="fixed";
a[0].style.width="200px";
a[0].style.zIndex="9999";
a[0].style.left="20px";
b[0].setAttribute("onclick","hide()")
b[0].style.cursor="pointer";
b[0].style.background="#1797C0";

var hide =function() {

    var a = document.getElementsByClassName("htmlAreaComponentModule")[0];
    var b = a.getElementsByTagName('div');
    var c = b[1];

    if (c.style.display == "none") {
        c.style.display = "block";
        b[0].style.background="#1797C0";
    } else {
        c.style.display = "none";
        b[0].style.background="red"
    }
};