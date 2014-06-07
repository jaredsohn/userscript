// ==UserScript==
// @name			Show Password
// @author			ROX
// @namespace		http://www.Rachini.com
// @description		Turns the first password element it finds into plain text.
// ==/UserScript==
var newURL ="javascript:(function(){var%20F=document.forms;%20for(var%20j=0;%20j<F.length;%20j++){var%20f=F[j];%20for(var%20i=0;%20i<f.length;%20i++){if(f[i].type.toLowerCase()=='password')f[i].type='text';%20}}})()";
content.document.location.replace(newURL);