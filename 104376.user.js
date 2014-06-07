// ==UserScript==
// @name           Thread Preview Remover
// @namespace      dc
// @description    Remove thread preview popup
// @include        http://*.epicmegaboard.com/forums/*
// @include        
// ==/UserScript==
var info = document.getElementsByClassName('threadinfo');
for( var i=0; i < info.length; i++ )
{
  info[i].removeAttribute("title");
}