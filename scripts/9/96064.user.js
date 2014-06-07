// ==UserScript==
// @name           eR battlemaster
// @version        0.125 dev
// @author         eCitizen Scyld
// @namespace      eCitizenScyld
// @description    Usprawnienia battlefielda dla Tanków
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

// ===============================================================================
// Licencja i zrzeczenie się odpowiedzialności
// ===============================================================================
// Ten program udostępniam na zasadzie : podoba Ci się - podeślij gold autorowi :D
// Ilość golda jest Twoją prywatną sprawą.
// Konto autora: http://www.erepublik.com/pl/citizen/profile/1283469
// Program dostarczam bez żadnych gwarancji oraz odpowiedzialności za negatywne
// działanie - korzystasz na własną odpowiedzialność.

// FUNKCJONALNOŚĆ
// - monitor muru : aktualizuje dane co zadaną ilość sekund, precyzja 5 miejsc po przecinku
// - przyśpieszenie wyświetlania bohaterów
// - BLOKADA WYSKAKUJĄCEGO POP-UP'a ADD WAR INFLUENCE - po prostu dodaje bez zbędnych ceregieli
// - BLOKADA WYSKAKUJĄCEGO POP-UP'a RANK UP - po prostu zmiana rangi i gra gitara
// - wyłączenie części animacji aby przyśpieszyć bicie
// - wyłączenie shootLockera - blokady powodującej "zacinanie się" przycisku FIGHT!

var countdownRefresh = 25;
var monitorRefresh = 10000;
var monitorRefreshIntervalId = 0;
var multiHitRunning = false;
var multiHitCount = 0;
var multiHitDone = 0;
var multiHitEnemyKill = 0;
var multiHitLastKilled = false;
var multiHitLoopId = 0;
var multiHitWellId = 0;
var waitingForWell = false;
var wellInc = 0;
var hitUrl = "/en/military/fight-shoot";
var foodUrl = "";
var foodId = "";

function mathRound(number, decimal) {
	if (decimal == 0) {
		var value = Math.round(number);
	} else if (decimal == 1) {
		var value = Math.round(number * 10) / 10;
	} else if (decimal == 2) {
		var value = Math.round(number * 100) / 100;
	} else if (decimal == 3) {
		var value = Math.round(number * 1000) / 1000;
	} else if (decimal == 4) {
		var value = Math.round(number * 10000) / 10000;
	} else if (decimal == 5) {
		var value = Math.round(number * 100000) / 100000;
	}
	return (value);
}

function bLog(content) {

	var current = new Date();
	$j('div#battlelog').append('<div>[' + current.toLocaleString() + '] ' + content + '</div>');

}

function canGetWell() {

	var h = $j('#hospital_btn');
	var trigger = $j('#DailyConsumtionTrigger');

	if ($j('#hospital_btn small').html() != '0' && !h.hasClass('disabled')) { return true; }
	if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy')) { return true; }
	if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) { return true; }
	
	return false;

}

function doIHaveAWeapon() {

	var weapon = $j(".fighter_weapon_image:last").attr("src").indexOf("q0") == -1;
	
	return weapon;

}

// Upewniamy się czy wymagana eRepowa jQuery jest załadowana
function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $j = unsafeWindow.jQuery; letsJQuery(); }

}
GM_wait();

// Main()
function letsJQuery() {

	if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }

	unsafeWindow.jQuery.fn.updateDominationBar = function() {

		var get_fighters_url = "/en/military/battle-log/" + unsafeWindow.SERVER_DATA.battleId;

		$j.getJSON(get_fighters_url, function(data) {

			if (data && data["domination"] != unsafeWindow.current_domination) {

				unsafeWindow.current_domination = data["domination"];

			}

		});

	}

	unsafeWindow.jQuery.fx.off = true;

	foodId = $j('li#DailyConsumtion input[type=hidden]').attr('id');
	foodUrl = '/eat?format=json&_token=' + $j('#' + foodId).val() + '&jsoncallback=?';

	clearInterval(unsafeWindow.globalSleepInterval);

	unsafeWindow.battleFX.hit = function() {		
		
		if (multiHitRunning) {

			multiHitDone++;
			multiHitLastKilled = false;
			bLog('HIT DONE!');
			$j('div#multihit_message').html('Hits: ' + multiHitDone + '&nbsp;&nbsp;Kills: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'Last Enemy killed!' : 'Last Enemy alive!') + ')');
			clearTimeout(multiHitLoopId);
			multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 500);
			
		}

		return false;

	};

	unsafeWindow.battleFX.blow = function() {
	
		if (multiHitRunning) {
		
			multiHitEnemyKill++;
			multiHitLastKilled = true;
			bLog('ENEMY KILLED!');
			$j('div#multihit_message').html('Hits: ' + multiHitDone + '&nbsp;&nbsp;Kills: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'Last Enemy killed!' : 'Last Enemy ALIVE!') + ')');
		}

		return false;

	};

	unsafeWindow.battleFX.setDominationPercents = function(){return false;};
	unsafeWindow.battleFX.updateDomination = function(){return false;};

	unsafeWindow.battleFX.pop = function(target){

		var useTarget = $j('#' + target)[0];
		
		if (target == 'enemy_defeated') {

			unsafeWindow.closeAddDamagePopup();
		
		} else if (target == 'rank_up') {
		
			unsafeWindow.closeAddRankPopup();
		
		} else if (target == 'battle_won') {

			top.location.href = document.location.href;/*+ '?info=' + encodeURIComponent('Last battle was ' + $j('#battle_won .heading h2').html()); */
			return;

		} else {
		
			$j('#pvp').block({
				message: useTarget,
				overlayCSS: {
					backgroundColor: '#FFF',
					opacity: 0.8
				},
				css: {
					width: '396px'
				}
			});
		
		}

		return false;

	};

//	$j(".battle_stats_button").click(function(){
//		alert('PAF > all :-D');
//	});
	
	$j('.progress').each(function() {
		$j(this).css({'text-align': 'center', 'overflow': 'visible'});
	});

	var exactDomination = parseFloat($j('#domination_bar').css('width'));
	$j('#blue_domination').text(mathRound(exactDomination, 2).toFixed(2) + '%');
	$j('#red_domination').text(mathRound(100 - exactDomination, 2).toFixed(2) + '%');

	monitorRefreshIntervalId = setInterval("jQuery.fn.updateDominationBar()", monitorRefresh);

	setInterval(function() {

		var progress = unsafeWindow.current_domination;
		var h = $j('#hospital_btn');

		unsafeWindow.shootLockout = 1;
		unsafeWindow.getStatsInterval = 5000;
		unsafeWindow.getFightersInterval = 2500;
		unsafeWindow.globalSleepTick = 1;

		if (unsafeWindow.SERVER_DATA.mustInvert) {
			progress = 100 - progress;
		}

		$j('#blue_domination').text(mathRound(progress, 5).toFixed(5) + '%');
		$j('#red_domination').text(mathRound(100 - progress, 5).toFixed(5) + '%');
		$j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
		$j('#red_domination').css({'opacity': '1', 'color': '#fff'});
		$j('#domination_bar').css({'width': progress + '%'});

		if (unsafeWindow.globalStop && --countdownRefresh == 0) {

			top.location.href = document.location.href;/* + '?info=' + encodeURIComponent('Last battle was ' + $j('#battle_won .heading h2').html()); */
			return;

		}

		if ($j('#hospital_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

			bLog('Getting EXTRA wellness from hospital...');
			unsafeWindow.useHospital();

		}


		$j('#bronId').html('Weapon: ' + doIHaveAWeapon());

	}, 150);

	$j('div#pvp_header h2').prepend('<div style="float:left;font-size:x-small">Refresh: <select id="monitor_refresh" size="1">' +
'<option value="0">off</option>' +
'<option value="1">1</option>' +
'<option value="2">2</option>' +
'<option value="3">3</option>' +
'<option value="4">4</option>' +
'<option value="5">5</option>' +
'<option value="6">6</option>' +
'<option value="7">7</option>' +
'<option value="8">8</option>' +
'<option value="9">9</option>' +
'<option value="10" selected="selected">10</option>' +
'</select> second/s</div>');

	$j('select#monitor_refresh').change(function() {
	
		if ($j(this).val() != "off") {

			monitorRefresh = $j(this).val() * 1000;
			clearInterval(monitorRefreshIntervalId);
			monitorRefreshIntervalId = setInterval("jQuery.fn.updateDominationBar()", monitorRefresh);

		} else {

			clearInterval(monitorRefreshIntervalId);

		}
	
	});

	unsafeWindow.jQuery.fn.getWell = function() {

		if (!unsafeWindow.ERPK.canFire()) {

			bLog('Cannot shoot - low wellness. Trying to get some.');

			if (!canGetWell()) { return; }

			if (!waitingForWell) {

				var h = $j('#hospital_btn');
				var trigger = $j('#DailyConsumtionTrigger');

				if ($j('#hospital_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

					bLog('Getting wellness from hospital...');
					unsafeWindow.useHospital();

				} else if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy')) {
		
					bLog('Getting wellness from food...');
					$j('#hospital_btn small').hide();
					h.removeClass('hospital_btn');
					h.addClass('food_btn');
					h.attr('title', 'Consume Food');
					unsafeWindow.ERPK.disableHospitalButton();
					
					$j.post(foodUrl, {}, function (data) {

						data.health = parseFloat(data.health);
						wellInc += data.health - unsafeWindow.SERVER_DATA.health;
						unsafeWindow.processResponse(data);
						$j('#DailyConsumtion').show();
						waitingForWell = false;	
						bLog('Wellness added: ' + wellInc);

					}, 'json');
		
				} else if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {

					bLog('Getting wellness from health kit...');
					$j('.health_kit_btn').click();

				}

				waitingForWell = true;
				
			}

			multiHitWellId = setTimeout("jQuery.fn.getWell()", 200);

		} else {

			waitingForWell = false;
			wellInc = 0;
			clearTimeout(multiHitLoopId);
			unsafeWindow.jQuery.fn.multiHIT();
	
		}

	};

	unsafeWindow.jQuery.fn.multiHIT = function() {

		if (unsafeWindow.globalStop || multiHitCount == multiHitDone) {

			multiHitRunning = false;
			$j('button#multihit_start').html('HIT!');
			bLog('All done.');
			return;

		}

		if (unsafeWindow.ERPK.canFire()) {

			bLog('Shooting...');
			unsafeWindow.shoot(0);
		
		} else if (canGetWell()) {

			unsafeWindow.jQuery.fn.getWell();

		} else {
		
			bLog('Cannot increase wellness. Stop.');
			multiHitRunning = false;
			$j('button#multihit_start').html('HIT!');
			return;
		
		}

		clearTimeout(multiHitLoopId);
		multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 500);

	};

//	$j('div#pvp_actions').prepend(
	$j('div#enemy_defeated').before(
'<div style="position:relative;width:836px;float:left;clear:both;padding:3px;margin:15px 0;font-weight:bold;color:#000;text-align:center">' +
'<big>MultiHIT:&nbsp;</big>' +
'<input id="multihit_count" type="text" size="3" maxlength="3" value="10" /><button id="multihit_start">HIT!</button>&nbsp;&nbsp;' +
'<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food when needed</label>' +
'&nbsp;&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use HealthKits if no more food</label>' +
'<div id="multihit_message" style="padding:2px;color:#ff0000"></div></div>' +
'<div id="bronId"></div>' +
'<fieldset><legend>v0.125 BATTLE LOG:&nbsp;&nbsp;<button id="battlelog_clear">clear</button></legend><div id="battlelog"></div></fieldset><br />'
);

//	$j(document).ajaxError(function(e, xhr, settings, exception) {
//		alert('error in: ' + settings.url + ' \n' + 'error:\n' + xhr.responseText );
//	}); 

	$j('button#multihit_start').click(function() {

		if (multiHitRunning) {

			clearTimeout(multiHitLoopId);
			clearTimeout(multiHitWellId);
			multiHitRunning = false;
			$j('button#multihit_start').html('HIT!');
			bLog('Interupted!');

		} else {

			multiHitCount = $j('input#multihit_count').val();
		
			if (multiHitCount > 0) {

				multiHitDone = 0;
				multiHitEnemyKill = 0;
				multiHitLastKilled = false;
				multiHitRunning = true;
				$j('button#multihit_start').html('<strong>STOP!</strong>');
				bLog('Starting...');

				unsafeWindow.jQuery.fn.multiHIT();

			}
	
		}

	});
	
	$j('button#battlelog_clear').click(function() {
			$j('div#battlelog').html('');
	});
	
	$j(document).ready(function() {

		clearInterval(unsafeWindow.globalSleepInterval);

	});

}

