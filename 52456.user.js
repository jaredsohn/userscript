// ==UserScript==
// @name           Kings Age - Agrandissement des avertissements
// @namespace       
// @include        http://s5.kingsage.fr/*
// ==/UserScript==

document.getElementsByTagName('head')[0].innerHTML += '<style type="text/css"> .warn {font-size:16px;font-weight:bold} .critical {font-size:18px;font-weight:bold}</style>';