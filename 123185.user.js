// neofresh
// Version 1.0
// ENERO 12 2012
// Copyright (c) 2012, MARCELO ESTIGARRIBIA
//
// ==UserScript==
// @name          neofresh
// @namespace     WWW.PILARCITY.ES.TL
// @description	  Neobux reload ads page
// @include       http*://www.neobux.com/m/v/
// ==/UserScript==
//
// Changelog:
// - 20120112: work started
//     + v0.1 BETA: first working version
// - 20120112: released
//     + v1.0: Initial public release
// - 20120112:
//     + v1.0.1: Cleaned up source.
//
// Use tabsize=4
// Global constants

var INTERVAL = 500 ;			// How often is page refreshed (in ms)
	
window.setTimeout(
	function()
	{
		window.location.reload() ;
	},
	INTERVAL
) ;

