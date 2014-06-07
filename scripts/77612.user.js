// ==UserScript==
// @name           Mods
// @namespace      http://www.w3.org/1999/xhtml
// @description    Shows who are the mods
// @include        *twilightheroes.com/*
// ==/UserScript==

var mods =

// Satan
'a[href="showchar.php?charid=1297"]:before, ' +

// Harry Dresden
'a[href="showchar.php?charid=989"]:before, ' +

// Malk-a-mite
'a[href="showchar.php?charid=5953"]:before, ' +

// Neocamp22
'a[href="showchar.php?charid=59"]:before, ' +

// Cristiona
'a[href="showchar.php?charid=24"]:before, ' +

// Chineselegolas
'a[href="showchar.php?charid=463"]:before, ' +

// Ryme
'a[href="showchar.php?charid=1"]:before' +

'{content: " (Mod) " !important; font-weight: bold !important; color: #a00 !important;}' +
'#div_chat font b a:before, #div_chat font b a:before, #div_chat b + i a:before {content: "" !important;}' +



// Satan
'font b a[href="showchar.php?charid=1297"] font:after {content: " (Satan)" !important;}' +

// Harry Dresden
'font b a[href="showchar.php?charid=989"] font:after {content: " (Harry Dresden)" !important;}' +

// Malk-a-mite
'font b a[href="showchar.php?charid=5953"] font:after {content: " (Malk-a-mite)" !important;}' +

// Neocamp22
'font b a[href="showchar.php?charid=59"] font:after {content: " (NeoCamp22)" !important;}' +

// Cristiona
'font b a[href="showchar.php?charid=24"] font:after {content: " (Cristiona)" !important;}' +

// Chineselegolas
'font b a[href="showchar.php?charid=463"] font:after {content: " (ChineseLegolas)" !important;}' +

//Ryme
'font b a[href="showchar.php?charid=1"] font:after {content: " (Ryme)" !important;}' +

'font[color="blue"] b a font[color="blue"]:after {content: "" !important;}';

