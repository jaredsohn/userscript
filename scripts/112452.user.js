// ==UserScript==
// @name           eRepublik Hide Energy Bar
// @namespace      eRepublik Hide Energy Bar
// @description    Hide eat energy bar button at left side
// @autor          Botherlong
// @match  	       http://*.erepublik.com/*
// @include  	   http://*.erepublik.com/*
// @version        0.0.5
// @date	       2011-11-15
// ==/UserScript==

/* Changelog:
v0.0.5 (2011-11-15)
	- Improve the coding method
	- Modify the health bar display
v0.0.4 (2011-09-26)
	- Hide eat energy button in my Land
v0.0.3 (2011-09-12)
	- Recoding by jQuery
	- Modify food bar disappeared
v0.0.2 (2011-09-10)
	- Modify cannot eat energy bar in war, replaced "disabled" by "hide" in left menu
v0.0.1 (2011-09-08)
	- First public release
*/

var HighEnergyBarInsert = function($, window, undefined) {
	function Check_energy(){
		if(!$('*').is('#DailyConsumtionTrigger_R')) {
			$('#DailyConsumtionTrigger').filter('a[class*=energy]').hide().after('<a href="javascript:;" title="" class="eat_food_wide energy disabled reset" id="DailyConsumtionTrigger_R"><q><span><img alt="" class="warn" src="http://www.erepublik.com/images/modules/_icons/swarning.png" /></span><strong id="foodText">Energy lock</strong></q></a>');
			sidebar_tooltip("#DailyConsumtionTrigger_R", "#eatFoodTooltip");
		}
	}
	$(document).ready(function(){
		Check_energy();
		$(".workTrigger").add(".trainTrigger").click(function(){
			if($('*').is('#DailyConsumtionTrigger_R')) {
				$('#eatFoodPopUp').hide();
				$('#eatFoodPopUp+a[title="Cancel"]').css('margin-left','50px').css('padding-left','110px').css('padding-right','130px').text('Energy lock');
			}
		}).add("#DailyConsumtionTrigger").add("#heal_btn").add("#eatFoodPopUp").add("#fight_btn").click(Check_energy);
	});
}

// Script Insert
var script = document.createElement('script');
script.textContent = '(' + HighEnergyBarInsert + ')(jQuery, window);';
document.body.appendChild(script);