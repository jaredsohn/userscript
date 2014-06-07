// ==UserScript==
// @name           eRep Master Eater
// @version        0.5a
// @namespace      http://userscripts.org/users/132233
// @include        http://*.erepublik.com/*
// @description    Please take care of your mouse.
// ==/UserScript==

// Changelog:
// ===============================================================================
// v0.5
// - Modified to fit the Unified Inventory implemented on Day 1210
//  + Added streak limit for continuous eating to avoid reCapcha popup
//  - Nolonger remove button when reaching full health on battlefield
//  - fixMarketDropdown() removed
// ===============================================================================
// v0.4a
// - Added fixMarketDropdown() from eRepublik Advanced 2.6.3
// ===============================================================================
// v0.4
// - Doesn't add the button when health is 100 or there's no food in inventory
// ===============================================================================

var foodUrl = "";
var foodId = "";

var multiEatFoodId = 0;
var multiEatRunning = false;

var eatStreak = 0;
var eatStreakCap = 20;

var onBattlefield = false;

function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else {
		$j = unsafeWindow.jQuery;

		onBattlefield = document.location.href.split('/')[5] == 'battlefield';

		var trigger = $j('#DailyConsumtionTrigger');
		if ((!trigger.hasClass('disabled') || onBattlefield) && !trigger.hasClass('buy'))
			letsJQuery();
	}

}
GM_wait();

function letsJQuery() {

	if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }

	foodId = $j('li#DailyConsumtion input[type=hidden]').attr('id');
	foodUrl = '/eat?format=json&_token=' + $j('#' + foodId).val() + '&jsoncallback=?';

	clearInterval(unsafeWindow.globalSleepInterval);

	unsafeWindow.jQuery.fn.eatFood = function() {

		var trigger = $j('#DailyConsumtionTrigger');

		if (unsafeWindow.globalStop || !multiEatRunning) {

			multiEatRunning = false;
			eatStreak = 0;
			$j('a#multieat_start').html('<strong>Dine in hell</strong>');
			return;
		}

		if (!trigger.hasClass('disabled') && !trigger.hasClass('buy') && eatStreak < eatStreakCap) {
		
			$j.post(foodUrl, {}, function (data) {

			data.health = parseFloat(data.health);
			unsafeWindow.processResponse(data);
			$j('#DailyConsumtion').show();
			eatStreak++;

			if (multiEatRunning)
				multiEatFoodId = setTimeout("jQuery.fn.eatFood()", 500);

			}, 'json');
		
		} else {

			multiEatRunning = false;
			eatStreak = 0;
			$j('a#multieat_start').html('<strong>Dine in hell</strong>');
			if (trigger.hasClass('buy') || (trigger.hasClass('disabled') && !onBattlefield))
				$j('li#master_eater').hide();
			return;

		}

	};

	$j('li#DailyConsumtion').after(
		'<li class="nomargin" id="master_eater">' +
		'<a class="eat_food buy" id="multieat_start">' +
		'<strong>Dine in hell</strong></a>'
	);

	$j('a#multieat_start').click(function() {

		if (multiEatRunning) {

			clearTimeout(multiEatFoodId);
			multiEatRunning = false;
			eatStreak = 0;
			$j('a#multieat_start').html('<strong>Dine in hell</strong>');

		} else {

			multiEatRunning = true;
			$j('a#multieat_start').html('<strong>STOP THERE</strong>');

			unsafeWindow.jQuery.fn.eatFood();
	
		}

	});

	$j(document).ready(function() {

		clearInterval(unsafeWindow.globalSleepInterval);

	});

}
