// Proxy Adder
// version 1.0
// 12-7-07
// Copyright (c) 2007, Matt Whorton
// email: pluto@plutosforge.com

// ==UserScript==
// @name           Proxy Adder
// @namespace      www.plutosforge.com
// @description  Adds a proxy domain to the URL for a journal article so you can access it if you are off site
// @include   http://aac.asm.org/*
// @include   http://arjournals.annualreviews.org/*
// @include   http://*.aspetjournals.org/*
// @include   http://*.acs.org/*
// @include   http://www.biophysj.org/*
// @include   http://www.bioscience.org/*
// @include   http://www.blackwell-synergy.com/*
// @include   http://www.fasebj.org/*
// @include   http://www.iop.org/*
// @include   http://www.jbc.org/*
// @include   http://www.jlr.org/*
// @include   http://www.nature.com/*
// @include   http://www.pnas.org/*
// @include   http://www.proteinscience.org/*
// @include   http://www.sciencedirect.com/*
// @include   http://www.sciencemag.org/*
// ==/UserScript==

var proxyString = ".proxy.lib.umich.edu";

window.location.href = window.location.href.substr(0,window.location.href.indexOf('/',7)) 
						+ proxyString 
						+ window.location.href.substr(window.location.href.indexOf('/',7));

