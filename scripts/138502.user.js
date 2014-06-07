// ==UserScript==
// @id             bleh
// @name           rapidmoviez add navigation for adblock
// @version        1.0
// @namespace      rapidmoviez
//@match        http://rapidmoviez.com/*
// @run-at         document-end
// ==/UserScript==

window.setTimeout(function(){

var checkNav = document.querySelector('.pagination a');

if(checkNav)
    return;

var docu = document.URL;
var newUrl = '/l/b/2';
var oldUrl='';
var nS=null;
if(docu.match('/l/b/')){
    nS=Number(document.URL.split('/l/b/')[1]);
    newUrl='/l/b/'+(nS+1);
    oldUrl='/l/b/'+(nS-1);
}

document.querySelector('.pagination').innerHTML='<a class="page" href="'+oldUrl+'"><</a><a class="page" href="'+newUrl+'">></a>';
},1500);