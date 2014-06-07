// ==UserScript==
// @name           EasyUniverse
// @namespace      Ogame
// @include        http://ogame.fr/
// @include        http://www.ogame.fr/
// ==/UserScript==

var univers=4;

try
{
var select=document.getElementById("uni_select_box").options[univers-1].selected=true;
}catch(e){}
