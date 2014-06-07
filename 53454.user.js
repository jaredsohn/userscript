// ==UserScript==
// @name           Ubernote Interface Fixer
// @namespace      http://streem.us/earthshine
// @include        http://www.ubernote.com/webnote/*
// ==/UserScript==


var elem = document.getElementById('topStatus');
if (elem) {
    elem.parentNode.removeChild(elem);
}


elem = document.getElementById('MainControlUntagged');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('MainControlUnchecked');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('MainControlHidden');
if (elem) {
    elem.parentNode.removeChild(elem);
}


elem = document.getElementById('MainControlSearch');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('advertisement');
if (elem) {
    elem.parentNode.removeChild(elem);
}



elem = document.getElementById('test1-header');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('test1-content');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('test2-header');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('test2-content');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('test3-header');
if (elem) {
    elem.parentNode.removeChild(elem);
}

elem = document.getElementById('test3-content');
if (elem) {
    elem.parentNode.removeChild(elem);
}


