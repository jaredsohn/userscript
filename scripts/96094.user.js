// ==UserScript==
// @name           BGG_Image_Module_Fix-V1.0
// @namespace      http://mallgur.com
// @description    Torna "All" o valor por omissão para a galeria no módulo de imagens do BGG - Makes "All" the selected value for the images modules on BGG.
// @include http://boardgamegeek.com/
// ==/UserScript==

var sel = document.getElementById("gallery");
var interval1=setTimeout("MOD_Module_SetField( 'gallery','all', 'moduleform_7')",0);
var interval2=setTimeout("MOD_Module_Load('moduleform_7')",0);

// Created by Mallgur - 2011
//Thanks to Jefferson Scher for his help while I was hacking at this.