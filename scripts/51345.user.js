// ==UserScript==
// @name           Esprit jvc
// @namespace      smileys jvc
// @include        http://www.noelisme.org/*
// ==/UserScript==

var chaine=document.body.innerHTML;

var reg=new RegExp("(Esprit)", "g");
chaine=chaine.replace(reg,"The King Of Noelisme.org");

document.body.innerHTML=chaine;