// ==UserScript==
// @name           dofiga.net thumb linker
// @namespace      spat72
// @description    changes default image link to a direct image link
// @include        http://dofiga.net/*
// ==/UserScript==

var allLinks = document.getElementsByTagName('a')

for(var i=0; i < allLinks.length; i++) {
if (allLinks[i].href.match('/?image')){
        allLinks[i].href = allLinks[i].href.replace('/?image=','/photos/');
        allLinks[i].href = allLinks[i].href += '.jpg';}
}