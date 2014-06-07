// Zasłanianie Śledzika na naszej-klasie
// wersja 0.4
// 14.11.2009
// Copyright (c) 2009, Piotr Zierhoffer
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// ==UserScript==
// @name Sledzik
// @description hides Śledzik feature on nasza-klasa.pl
// @include http://nasza-klasa.pl/*
// @include http://www.nasza-klasa.pl/*
// ==/UserScript==

document.getElementById('sledzik_box').style.display = 'none';