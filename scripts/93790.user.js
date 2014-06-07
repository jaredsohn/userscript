// ==UserScript==
// @name           Daily Burn Calories Left
// @namespace      http://*.dailyburn.com/
// @description    Display calories left to eat today
// @include        http://tracker.dailyburn.com/nutrition*
// @require				 http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

$.noConflict();
var $jq = jQuery;

$jq(document).ready(function(){
	var ate = $jq('#you_ate td:nth(1)').html().match(/(\d+)\sCalories/)[1];
	
	var lowcal = $jq('#you_ate td:nth(1) > span > a').html().match(/\b(\d+)\b/g)[0];
	
	var left = lowcal - ate;
	
	$jq('#you_ate td:nth(1) > span ').append('<div><span style="color: #0C4976">' + left + '</span> cals left</div>');
});