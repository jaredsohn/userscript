// ==UserScript==
// @name			remove tudou ad
// @namespace		remove tudou ad
// @include		http://*.tudou.com/*
// @author		
// @homepage       
// @description	      
// ==/UserScript==
var oAarray = document.getElementsByTagName('A');
for(i=0;i<oAarray.length;i++){
    oAarray[i].href += '?tid=-1';
    }