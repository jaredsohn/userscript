// ==UserScript==
// @name           Not my Gallery, Not my Problem
// @namespace      http://userscripts.org/users/232477
// @description    Kills those stupid gallery views on gawker sites.

// @include        http://lifehacker.com/*/gallery/*
// @include        http://gizmodo.com/*/gallery/*
// @include        http://gawker.com/*/gallery/*
// @include        http://deadspin.com/*/gallery/*
// @include        http://kotaku.com/*/gallery/*
// @include        http://jezebel.com/*/gallery/*
// @include        http://io9.com/*/gallery/*
// @include        http://jalopnik.com/*/gallery/*

// @include        http://*.lifehacker.com/*/gallery/*
// @include        http://*.gizmodo.com/*/gallery/*
// @include        http://*.gawker.com/*/gallery/*
// @include        http://*.deadspin.com/*/gallery/*
// @include        http://*.kotaku.com/*/gallery/*
// @include        http://*.jezebel.com/*/gallery/*
// @include        http://*.io9.com/*/gallery/*
// @include        http://*.jalopnik.com/*/gallery/*
// ==/UserScript==


window.location = window.location.toString().replace(/\/gallery\//, '');
