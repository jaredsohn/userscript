// ==UserScript==
// @name           catch fish
// @author         sans
// @include        https://www.eshuyuan.net/*
// @include        http://www.eshuyuan.net/*

// ==/UserScript==

var node = document.getElementsByClassName('pcr_rand pcr_ptod1');
if(node != undefined)
    node[0].childNodes[1].click()
