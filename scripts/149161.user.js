// ==UserScript==
// @name        Villavu Monospacifier
// @namespace   VillavuMonospace
// @description Monospacifies the broken [code] and [simba] tags on Villavu.
// @include     http://villavu.com/forum/*
// @include     https://villavu.com/forum/*
// @include     http://villavu.com/vb/*
// @include     https://villavu.com/vb/*
// @version     1
// ==/UserScript==

// Created by Daniel (Mayazcherquoi) of Villavu.com for Villavu.com. ;D

GM_addStyle('.codetags { background: #EDEFF1; color: #283A5E; font-family: monospace; border-left: 1px solid #FFFFFF; border-top: 1px solid #FFFFFF; }');

codeTags = document.querySelectorAll('pre.alt2');
for (var I = 0; I < codeTags.length; I++) {
    codeTags[I].classList.remove('alt2');
    codeTags[I].classList.add('codetags');
}