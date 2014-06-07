// Copyright (c) 2010, n0yd aka Dylan Harkleroad
// Released under the GPL license
// ******************************
// ==UserScript==
// @name          farksports
// @namespace     http://www.fark.com/*
// @description   replaces this newfangled http://www.fark.com/sports_ext/ that has the ugly espn crap with the old http://www.fark.com/sports/ we all know and love
// @include       http://www.fark.com/*
// @include       http://fark.com/*
// @include       http://totalfark.com/*
// @include       https://totalfark.com/*
// @include       http://www.totalfark.com/*
// @include       https://www.totalfark.com/*
// @include       http://www.fark.com/*/*
// ==/UserScript==

document.getElementById('bodyTabSportsespn').href = 'http://www.fark.com/sports/';