// ==UserScript==
// @name       Tribal Wars Premium Clean-up
// @namespace  http://use.i.E.your.homepage/
// @version    1.2
// @description  Removes all of the premium content, ads, and more from Tribal Wars
// @match      *.tribalwars.nl/*
// @match      *.tribalwars.net/*
// @match      *.tribalwars.us/*
// @copyright  2013, Saulios
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

// Removes the entire premium page
var premium = $("td td:contains('screen=premium')");
premium.remove ();


// Premium features Clean-up
$(".red-button.flag-purchase").hide(); // Removes the option to buy flags
$(".order_feature_reduce.small").hide(); // Removes the reduce option for building time
$(".tooltip.nowrap.inactive").hide(); // Removes the inactive reduce option for building time
$(".order_feature_reduce.small").hide(); // Removes the active reduce option for building time
$("#merchant_exchange").hide(); // Removes the merchant trade
var merchant_h3_nl = $("h3:contains('dorpshandelaar')"); // Removes the merchant title
merchant_h3_nl.remove ();
var merchant_p_nl = $("p:contains('dorpshandelaar')"); // Removes the merchant text
merchant_p_nl.remove ();
var merchant_h3_en = $("h3:contains('merchant')"); // Removes the merchant title
merchant_h3_nl.remove ();
var merchant_p_en = $("p:contains('merchant')"); // Removes the merchant text
merchant_p_nl.remove ();
var reducebuild = $("small:contains('Premium')"); // Removes the 'Reduce build with premium' text
reducebuild.remove ();
var menu_cheap = $("b:contains('reduce')"); // Removes the reduce option for building time
menu_cheap.remove ();
$("a.inactive").hide(); // Removes the options to recruit troops with premium


// Menu Clean-up
var premium_menu = document.getElementsByClassName("menu-item"); //Removes the Premium menu
premium_menu[8].parentNode.removeChild(premium_menu[8]);
var assistants_menu = document.getElementsByClassName("manager_icon"); //Removes Farm Assistant from the menu
assistants_menu[0].parentNode.removeChild(assistants_menu[0]); // Farm Assistant
var assistants_menu2 = document.getElementsByClassName("manager_icon"); //Removes Account Manager from the menu
assistants_menu2[0].parentNode.removeChild(assistants_menu2[0]); // Account Manager
