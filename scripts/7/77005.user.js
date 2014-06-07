// ==UserScript==
// @name           ZetaBoards Ad-Removal Tool
// @namespace      http://userscripts.org/users/quasimodo
// @description    Removes ads from Zetaboards.
// @include        http://*.zetaboards.com/*/*/
// @include        http://*.zetaboards.com/*/*/*/
// ==/UserScript==

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