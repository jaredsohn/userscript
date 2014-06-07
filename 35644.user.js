// ==UserScript==
// @name           ZetaBoards Ad remover
// @namespace      http://userscripts.org/users/70005
// @description    Removes the ads from the index pages of ZetaBoards message boards.
// @include        http://*.zetaboards.com/*/index
// @include        http://*.zetaboards.com/*/index/
// @include        http://*.zetaboards.com/*	
// @exclude       http://*.zetaboards.com/*/post/	
// @exclude       http://*.zetaboards.com/*/post/*
// @exclude       http://*.zetaboards.com/*/home/?c=32
// ==/UserScript==
/*Changelog
1.0.08.10.18. Initial Release
1.1.10.6.26. Works on more than index page
1.1.10.6.27. Changelog added.
1.1.10.7.24. Disabled for "Edit Signature" page 
*/ 
var i=0;
var tblCnt = document.getElementById('main').getElementsByTagName('table').length;

function removeAds(){
for (i=0;i<=tblCnt;i++)
{
if(document.getElementById('main').getElementsByTagName('table')[i].innerHTML.indexOf('<script') != "-1"){
document.getElementById('main').getElementsByTagName('table')[i].style.display = "none";
}
}
}
removeAds();