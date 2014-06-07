(function() {

// ==UserScript==
// @name          Bing_Tidy
// @description   Removes the "unnecessary" stuff from Bing.com
// @version       0.1.0
// @include       http://www.bing.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

	// hide the classes
	$(".sw_sform").hide();
	$(".sc_exp").hide();

	// hide the ids
	$("#hp_sw_hdr").hide();
	$("#sb_foot").hide();
	$("#sw_pb").hide();
	$("#sc_hst1").hide();
	$("#sc_hs1").hide();
	$("#sc_hst2").hide();
	$("#sc_hs2").hide();
	$("#sc_hst3").hide();
	$("#sc_hs3").hide();
	$("#sc_hst4").hide();
	$("#sc_hs4").hide();
	$("#sc_hst5").hide();
	$("#sc_hs5").hide();
	$("#sc_hst6").hide();
	$("#sc_hs6").hide();


})();