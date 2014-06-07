// ==UserScript==
// @name           CE Hilo -> Titulo
// @namespace      *
// @include        http://www.crisisenergetica.org/forum/viewtopic.php?forum=*
// @include        http://www.crisisenergetica.org/forum/createtopic.php*
// ==/UserScript==

if (location.href.match('createtopic')) 
{
document.title = 'CE - Edit:' + document.images[8].parentNode.textContent;
}
else
{
document.title = 'CE - ' + document.images[10].parentNode.textContent;
}