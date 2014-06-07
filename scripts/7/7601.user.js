// ==UserScript==
// @name           Orkut Scrapbook Link
// @namespace      
// @description    Adds A Scrapbook Link to the top Header of orkut in each page. By Achintya.
// @include        http://www.orkut.com/*
// ==/UserScript==

var x=document.getElementById("headerMenu")
x.innerhtml=x.innerhtml+" |  <a href='http://www.orkut.com/Scrapbook.aspx'>Scrapbook</a>"