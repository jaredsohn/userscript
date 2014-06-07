// ==UserScript==
// @name	Liberty-land AutoClick
// @version	1.0
// @date	2010-05-13
// @description	Ce script ouvre automatiquement les liens de téléchargement sans avoir la page de pub
// @include	http://www.liberty-land.net/dl.php*
// @creator	35niavlys
// ==/UserScript==

var href = document.getElementsByTagName("a");
for(i = 0; i < href.length; i++)
 {
document.location.href = href[i];
 }