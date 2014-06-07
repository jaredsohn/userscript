// ==UserScript==
// @name           gamenewshq bypass link intercepter
// @namespace      http://www.andydremeaux.com
// @include        http://www.gamenewshq.com/news/*
// ==/UserScript==

var link = document.getElementsByName("main")[0];
window.location.href = link.src;