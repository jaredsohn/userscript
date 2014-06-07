// ==UserScript==
// @author         Peter Adrianov
// @version        1
// @name           Habrahabr Comments Hide
// @namespace      habrahabr
// @description    Hides comments at habrahabr.ru, so you don't waste time reading them.
// @include        http://habrahabr.ru/*

// @include        http://*.habrahabr.ru/*
// ==/UserScript==

document.getElementById('comments').style.display = 'none';
