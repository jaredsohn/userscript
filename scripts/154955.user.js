// ==UserScript==
// @name        MSE Simple Forum
// @namespace   MSESF_Script
// @author 		Tom Richardson
// @description Simplifies the MSE forum layout
// @include     http://forums.moneysavingexpert.com/*
// @require     http://code.jquery.com/jquery-latest.min.js 
// @updateURL	https://userscripts.org/scripts/source/154955.meta.js
// @version     1.01
// ==/UserScript==


// Right/Left Navigation Bar
	$("#MSEForumsRHS").hide(); 										// Righthand navigation bar		
	$("#footer").hide(); 											// Footer
//	$(".footer").hide(); 											// Footer
// Header Links	
	$(".forum_top_outer_2.forum_top_outer_right").hide(); 			// Toplinks (help/etiquette etc)
	$(".forum_top_outer_2.forum_top_outer_left").hide(); 			// Toplinks (help/etiquette etc)	
	$(".forum_top_outer_2.forum_top_outer_center").hide(); 			// Toplinks (help/etiquette etc)	
	$(".MSETitle").hide(); 											// Forum title bar
	$("#MSEResourceBar").hide(); 									// Forum resource bar
	
// Quick Message	
	//$(".panelsurround").hide(); 									// Footer quick message	
	//$(".tcat").hide(); 												// Footer quick message title		

// Coloured Header Buttons
	$(".cards").hide(); 											// Header cards button
	$(".shopping").hide(); 											// Header shopping button
	$(".deals").hide(); 											// Header deals button
	$(".utilities").hide(); 										// Header utilities button
	$(".banking").hide(); 											// Header banking button
	$(".travel").hide(); 											// Header travel button
	$(".insurance").hide(); 										// Header insurance button
	$(".mortgages").hide(); 										// Header mortgages button
	$(".family").hide(); 											// Header family button	
	$(".reclaim").hide(); 											// Header reclaim button	
	$("#masthead").hide(); 											// Header reclaim button	
	
	$("#collapseobj_forumrules").hide(); 							// Posting rules	
	$(".thead").hide(); 											// Posting rules	
	//$("#msebreadcrumb").hide(); 									// Breadcrumbs
