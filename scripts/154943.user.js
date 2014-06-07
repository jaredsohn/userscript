// ==UserScript==
// @name        Google Homepage Cleaner
// @namespace   GHC_Script
// @author      Tom Richardson
// @description Removes certain elements from the Google homepage to make it more managable and sleak
// @include     *www.google.*
// @require     http://code.jquery.com/jquery-latest.min.js 
// @updateURL	https://userscripts.org/scripts/source/154943.meta.js
// @version     1.00
// ==/UserScript==

// Header Links Control	
	$("#prm").hide(); 				// New phone or tablet (text under search buttons)	
	$("#footer").hide(); 			// Removes the entire footer
	$("#fll").hide(); 				// Removes just the footer links
	
// Information Banners
	$("#pushdownno").hide(); 		// Add google to start page no button
	$("#pushdownyes").hide(); 		// Add google to start page yes button
	$("#pmocntr2").hide(); 			// Install Chrome layer
	$(".pdtext").hide(); 			// Install Chrome layer
	
// Buttons
	//$("#gbqfbb").hide(); 			// I'm Feeling Lucky button
	//$("#gbqfba").hide(); 			// Google Search button	
	//$(".gbtc").hide(); 			// Account login button	
	//$("#gbqfqw").hide(); 			// Search form
	
// Remove Top Navigation Buttons
	$("#gb_119").hide(); 			// Removes +You button
	//$("#gb_1").hide(); 			// Removes search button
	//$("#gb_2").hide(); 			// Removes images button
	//$("#gb_8").hide(); 			// Removes maps button
	//$("#gb_78").hide(); 			// Removes play button
	//$("#gb_36").hide(); 			// Removes youtube button
	$("#gb_5").hide(); 				// Removes news button
	$("#gb_23").hide(); 			// Removes gmail button
	$("#gb_25").hide(); 			// Removes drive button
	$("#gb_24").hide(); 			// Removes calendar button
	$("#gbztms").hide(); 			// Removes more button
	//$("#gbx3").hide(); 			// Removes entire navigation header background
	
// Search Results Elements
	$("#pplicrhs").hide(); 			// Removes +You button


	
// Revert to classic logo
//	var Logo = document.getElementById('hplogo');
//	Logo.id = "Google";
//	Logo.border = 'no'
//	Logo.width = '276'
//	Logo.height = '110'
//	Logo.src = 'http://www.google.com/intl/en_ALL/images/logo.gif';
//	$("#lga").height(1); 				// Removes white space
//	$("#prm-pt").hide(); 				// Removes white space























