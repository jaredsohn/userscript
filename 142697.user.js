// ==UserScript==
//
// @name        Memrise Tweaks
// @namespace   Memrise Tweaks
// @description Fix some of the minor display issues at memrise.com
//
// @author      thedannywahl
// @copyright   2012, Danny Wahl (http://iyware.com)
// @license     GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
//
// @include     http://www.memrise.com/course/*/grow/
// @version     2.1
//
// @grant       unsafeWindow
//
// ==/UserScript==

//Call jQuery from memrise
var $ = unsafeWindow.jQuery;

//Wait for the main AJAX request to be complete before we start anything
$(document).ajaxComplete(function(){

//==Auto More
	$(".thing-show").addClass("show-more"); //Add show-more class
	$(".show-more-link").css("display", "none"); //hide more/less toggle
	
//==Clarity
    $(".garden-box .column-label").css("max-width", "none"); //stop "Pronunciation" from being truncated

	$(".column-label:contains('Word'), .row-label:contains('Word')").css("color", "#73C7F4"); //"Word" is always memrise-blue
	$(".column-label:contains('Definition'), .row-label:contains('Definition')").css("color", "#AA5F86"); //"Definition" is always memrise-purple
	$(".column-label:contains('Pronunciation'), .row-label:contains('Pronunciation')").css("color", "#FAAE1A"); //"Pronunciation" is always memrise-yellow

});