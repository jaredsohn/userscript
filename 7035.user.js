// Aidenavigation page killer
// version 0.1
// 2007-01-09
// Copyright (c) 2007, Viktor Nagy
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Aidenavigation page killer
// @namespace      http://blog.educomm.hu/
// @description    Instead of the useless aidenavigation page this script redirects you to Google. Au lieu de la page 'aidenavigation.club-inernet.fr' cette script nous renvoie sur Google.
// @include        http://aidenavigation.club-internet.fr/*
// ==/UserScript==

window.location.href = 'http://www.google.com';
