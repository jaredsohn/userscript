// ==UserScript==
// @name			NeoGAF Spoiler Remover
// @namespace		
// @description		Make spoilers readable on NeoGAF
// @include			http://www.neogaf.com/*
// @include			http://neogaf.com/*

// ==/UserScript==

document.styleSheets[0].insertRule('.spoiler{color:#161F9F !important; background: none !important}', 0);