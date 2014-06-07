// --------------------------------------------------------------------------
// ==UserScript==
// @name           CW Ihbar
// @namespace      http://www.efayazilim.com
// @description    CWde ihbar edilen konuları gösterir
// @include       http://www.cyber-warrior.org/Forum/Default.asp
// ==/UserScript==
//
// --------------------------------------------------------------------------


function ShowIhbar
{

IhbarGuncelle();

};


document.addEventListener("DOMReady", ShowIhbar, true);