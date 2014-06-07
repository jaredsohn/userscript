// nasza-klasa.pl - Lepsza kolejność elementów na stronie głównej
// version 0.1
// 2009-09-09
// Copyright (c) 2009, maryla
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          nasza-klasa.pl - Sledzik Off
// @description   Ukrywa caly DIV sledzika
// @include       http://nasza-klasa.pl/
// ==/UserScript==
//
// Usuń główny banner reklamowy
banner = document.getElementById('sledzik_box');
banner.style.display = 'none';
