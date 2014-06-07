// ==UserScript==
// @name           BalooHaskell
// @namespace      oracle.com
// @description    Adds the bare necessities to Haskell Docs
// @include        http://www.haskell.org/ghc/docs/*
// ==/UserScript==

var doc = window.document;
var baloo = doc.createElement('img');
baloo.setAttribute('src','http://img859.imageshack.us/img859/1407/baloo.png');
baloo.setAttribute('style','position: fixed; right: 30px; bottom: 0px;');
var body = window.document.getElementsByTagName('body')[0];
body.appendChild(baloo);