// Rapidshare delay removal script
// Copyright (c) 2007, Alexander (Sasha) Sirotkin
// http://gruimed.blogspot.com
//
// ==UserScript==
// @name          Rapidshare Delay
// @namespace     http://gruimed.blogspot.com
// @description   Rapidshare delay removal script
// @include       http://*.rapidshare.com/*
// ==/UserScript==

window.addEventListener(
    'load', 
    function() { this.c = 0},
    true);

