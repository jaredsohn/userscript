// ==UserScript==
// @name        Bing Homepage Cleaner
// @namespace   BHC_Script
// @author      Tom Richardson
// @description Removes certain elements from the Bing homepage to make it more managable and sleak
// @include     http://*.bing.com/*
// @require     http://code.jquery.com/jquery-latest.min.js 
// @updateURL	https://userscripts.org/scripts/source/154936.meta.js
// @version     1.04.1
// ==/UserScript==


// Header Links Control	
	$("#hp_sw_hdr").hide(); 			// Links header
	$("#scpt0").hide(); 				// Web header link
	$("#scpt1").hide(); 				// Images header link
	$("#scpt2").hide(); 				// Videos header link
	$(".pref.sw_pref").hide(); 			// Preferences header button		
	$("#scpt3").hide(); 				// Maps header link
	$("#scpt4").hide(); 				// News header link
	$("#scpt5").hide(); 				// Search history header link
	$("#scpt6").hide(); 				// More header link	
	$("#id_t").hide(); 					// Sign-in header link	
	$(".hp_hdvdr.li").hide(); 			// Link seperator (MSN/HOTMAIL)
	
	

// Main Content Control
	//$(".sw_sform").hide(); 			// Logo/search form	
	//$(".sw_b").hide(); 				// Search form only
	//$("#sb_form_go").hide(); 			// Search field magnifiying glass icon
	//$("#sw_filt").hide(); 			// Search location bar	
	//$(".hp_sw_logo").hide(); 			// Remove Bing logo but doesn't keep search form location
	//$(".hp_sw_logo").height(0.01);	// Remove Bing logo but keep search form H location
	$("#sc_hst1").hide(); 				// First content box
	$("#sc_hst2").hide(); 				// Second content box
	$("#sc_hst3").hide(); 				// Third content box
	$("#sc_hst4").hide(); 				// Forth content box

// Footer News Ticker Control
	$("#hp_pgm0").hide(); 				// First news ticker
	$("#hp_pgm1").hide(); 				// Second news ticker
	$("#hp_pgps").hide(); 				// Last news ticker
	$("#hp_pgbar").hide();				// Entire news ticker container
	$("#sb_foot").hide(); 				// Footer links

// Footer Image Controls
	$("#sh_fu").hide();					// Full screen footer button
	$(".hpcPrevious").hide();			// Previous image
	$(".hpcNext").hide();				// Next image
	$("#sh_cp_in").hide();				// Image info button
	$("#hp_ctrls").hide();				// Entire image footer controls
	
	
// Search Results Page	
	$(".sw_hdr_img").hide();			// Explore todays homepage
	$(".sw_menu").hide();				// Related searches
	//$(".sw_logo").height(0.01);			// Bing logo but keep search form H location
	$(".sw_logoT").hide();				// Logo alternative text
	$(".ans2.qsa").hide();				// Related searches