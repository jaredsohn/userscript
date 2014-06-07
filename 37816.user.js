// ==UserScript==
// @name			Remove Max Length
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		Remove Max Length
// ==/UserScript==
var newURL ='javascript:(function(){var%20x,k,f,j;x=document.forms;for(k=0;k<x.length;++k){f=x[k];for(j=0;j<f.length;++j)f[j].removeAttribute("maxLength");}})()';
content.document.location.replace(newURL);