// Copyright (c) 2009, LeroyLeroy
// Released under the GPL license
// ******************************
// ==UserScript==
// @name          farkgeek
// @namespace     http://www.fark.com/*
// @description   replaces this newfangled http://www.fark.com/geek_ext/ with the old http://www.fark.com/geek/
// @include       http://www.fark.com/*
// @include       http://fark.com/*
// @include       http://totalfark.com/*
// @include       https://totalfark.com/*
// @include       http://www.totalfark.com/*
// @include       https://www.totalfark.com/*
// ==/UserScript==

document.getElementById('bodyTabGeek').href = 'http://www.fark.com/geek/';