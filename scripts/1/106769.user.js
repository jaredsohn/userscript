// ==UserScript==
// @name           fotokritikAllowSaveAs
// @description    removes div protection from fotokritik.com so you can right click and save as
// @copyright      2010, Hasan Tayyar BEŞİK (http://hasantayyar.com)
// @license        LGPL 
// @include        http://www.fotokritik.com/*
// ==/UserScript==

function removeDivL1(){
 pl1 = document.getElementById("protectedlayer");
 sl1 = pl1.parentElement;
 sl1.removeChild(pl1);
}
removeDivL1();