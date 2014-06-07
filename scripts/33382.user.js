// ==UserScript==
// @name           Test
// @description   test
// @include        http://*.newz.dk/*
// @include        http://newz.dk/*
// @exclude       http://openx.newz.dk/*
// ==/UserScript==

function test() {
var wrap = document.getElementById('wrapper');
wrap.offsetHeight = wrap.offsetHeight - 10 + 'px';
}

test();