// ==UserScript==
// @name           UOL_Houaiss
// @namespace      http://userscripts.org/scripts
// @description    Remove propagandas do dicionário Houaiss (UOL)
// @include        http://houaiss.uol.com.br/busca*
// @include        http://houaiss.uol.com.br/topo*
// ==/UserScript==



if (document.getElementsByTagName ("frameset")[0]) {
if (document.getElementsByTagName ("frameset")[0].rows = "223,*") {document.getElementsByTagName ("frameset")[0].rows = "130,*"}}

if (document.getElementsByTagName ("div")[0]) {
if (document.getElementsByTagName ("div")[0].style.height = "100px") {document.getElementsByTagName ("div")[0].style.height = "0"}}
