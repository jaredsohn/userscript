// ==UserScript==
// @name           MetaKittyiFrameScrolling
// @namespace      Klondike42
// @include        http://www.metakitty.com/*
// ==/UserScript==

var iframe = document.getElementsByName('frame1')[0];
iframe.scrolling = 'yes';