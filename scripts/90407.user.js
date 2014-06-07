// Lemming Logo hack 
// version 1
// 2010-11-13
// Copyright (c) 2010, Evgeny Reznikov
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Lemming Logo hack
// @namespace     http://userscripts.org/users/249676
// @description   changes logo link for gadial.net social forum from main forum page to social forum
// @include       http://gadial.net/forum/*
// ==/UserScript==

var logoLink = document.getElementById('logo');
logoLink.href = 'http://gadial.net/forum/viewforum.php?f=5';
		