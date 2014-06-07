// ==UserScript==
// @name           eRepublik battle master
// @version        1.0.1
// @author         eCitizen Scyld
// @namespace      eCitizenScyld
// @description    http://userscripts.org/scripts/show/100931
// @include        http://www.erepublik.com/*/citizen/profile/*
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

var multiHitRunning = false;
var multiHitCount = 0;
var multiHitDone = 0;
var multiHitEnemyKill = 0;
var multiHitLastKilled = false;
var multiHitLoopId = 0;
var wellInc = 0;
var regionName = "";
var foodUrl = "";
var foodId = "";

var currURL		= location.href;			// http://www.erepublik.com/pl/citizen/profile/2622385
var arrURL		= currURL.split('/');	// wersja w tablicy
var BASE_URL	= arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/' + arrURL[3] + '/';		// http://www.erepublik.com/pl/
var subURL		= currURL.substr(BASE_URL.length);


function str_replace(haystack, needle, replacement) {

	var temp = haystack.split(needle);
	return temp.join(replacement);

}

function pad(numNumber, numLength) {
	var strString = '' + numNumber;
	while(strString.length < numLength) {
		strString = '0' + strString;
	}
	return strString;
}

function bLog(content) {

	var now = new Date();
	var hour = pad(now.getHours(), 2);
	var minute = pad(now.getMinutes(), 2);
	var second = pad(now.getSeconds(), 2);
	var msec = pad(now.getMilliseconds(), 3);
	$j('div#battlelog').append('<div>[' + hour + ':' + minute + ':' + second + '.' + msec + '] ' + content + '</div>');

}

function bhStats(att, def) {

	$j('#BHTableL').remove();
	$j('div#myStatBoxL').html(
		'<div id="BHTableL">' +
		'<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + att + '</table></div>' +
		'</div>'
		);
	$j('#BHTableR').remove();
	$j('div#myStatBoxR').html(
		'<div id="BHTableR">' +
		'<div class="BHTable" style="float:right"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + def + '</table></div>' +
		'</div>'
	);

}

function histStats(hist) {

	$j('#OOTable').remove();
	$j('div#myOverBox').html(
		'<div id="OOTable">' +
		'<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + hist + '</table></div>' +
		'</div>'
	);

}

function setLink2BH(a, d) {

	$j('#attackerHero').html(a);
	$j('#defenderHero').html(d);

}

function canGetWell() {

	var h = $j('#heal_btn');
	var trigger = $j('#DailyConsumtionTrigger');

	// can use hospital?
	if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled')) { return true; }
	
	// can eat food?
	if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') 
			&& !trigger.hasClass('buy') && !trigger.hasClass('energy')) { return true; }
	
	// can use energy bar?
	if ($j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') 
			&& trigger.hasClass('energy')) { return true; }
	
	// can use healt kit?
	if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) { return true; }

	return false;

}

function getRegionInfo(id)
{

	$j('button#hospitals_get').html('Please wait...').attr('disabled', 'true');

	GM_xmlhttpRequest({

		method:	'GET',
		url:	'http://api.erepublik.com/v2/feeds/countries/' + id + '/regions.json',
		onload:	function(response) {

			regionsData = eval('(' + response.responseText + ')');

			if (regionsData && regionsData.length > 0) {

				for (var a = 0; a < regionsData.length; a++) {

					// alert(regionsData[a].name + ' - ' + regionsData[a].buildings.hospitals.length);

					if (regionsData[a].name == regionName && regionsData[a].buildings.hospitals.length > 0) {

						var hospitals = regionsData[a].buildings.hospitals;

						var table = '<table cellpadding="2" cellspacing="0" width="100%" style="opacity:0.8"><tbody><tr>';

						for (var b = 0; b < 15; b++) {

							var row = '<td align="center" valign="top" style="border:1px solid #000;width:50px;height:60px" bgcolor="';

							if (b + 1 == unsafeWindow.SERVER_DATA.zoneId) {

								row += '#00ffff">';

							} else {

								row += '#ffffff">';

							}

							for (var c = 0; c < hospitals.length; c++) {

								if (hospitals[c].zone_id == b + 1) {

									var quality = hospitals[c].max_heal_per_citizen;
									if (quality > 5) {quality = 5}
									row += '<small><img width="33" src="http://www.erepublik.com/images/icons/industry/5/q' + quality + '.png" />';
									row += '<br />' + hospitals[c].wellness_budget + ' / ' + hospitals[c].max_heal_per_citizen + '</small>';

								}

							}

							row += '</td>';
							table += row;

						}

						table += '</tr></tbody></table>';
						// alert(table);

						$j('div#hospitals_info').html(table);

					} else {

						$j('button#hospitals_get').html('no hospitals - maybe later').removeAttr('disabled');

					}

				}

			}

		},
		onreadystatechange:	function(response) {

			$j('button#hospitals_get').html('Please wait...');

		},
		onerror: function(response) {

			$j('button#hospitals_get').html('Error! Retrying...');
			setTimeout(function() { getRegionInfo(id); }, 2500);

		}

	});

}

var rank = new Array;

rank['Recruit'] = 1;
rank['Private'] = 2;
rank['Private *'] = 3;
rank['Private **'] = 4;
rank['Private ***'] = 5;
rank['Corporal'] = 6;
rank['Corporal *'] = 7;
rank['Corporal **'] = 8;
rank['Corporal ***'] = 9;
rank['Sergeant'] = 10;
rank['Sergeant *'] = 11;
rank['Sergeant **'] = 12;
rank['Sergeant ***'] = 13;
rank['Lieutenant'] = 14;
rank['Lieutenant *'] = 15;
rank['Lieutenant **'] = 16;
rank['Lieutenant ***'] = 17;
rank['Captain'] = 18;
rank['Captain *'] = 19;
rank['Captain **'] = 20;
rank['Captain ***'] = 21;
rank['Major'] = 22;
rank['Major *'] = 23;
rank['Major **'] = 24;
rank['Major ***'] = 25;
rank['Commander'] = 26;
rank['Commander *'] = 27;
rank['Commander **'] = 28;
rank['Commander ***'] = 29;
rank['Lt Colonel'] = 30;
rank['Lt Colonel *'] = 31;
rank['Lt Colonel **'] = 32;
rank['Lt Colonel ***'] = 33;
rank['Colonel'] = 34;
rank['Colonel *'] = 35;
rank['Colonel **'] = 36;
rank['Colonel ***'] = 37;
rank['General'] = 38;
rank['General *'] = 39;
rank['General **'] = 40;
rank['General ***'] = 41;
rank['Field Marshal'] = 42;
rank['Field Marshal *'] = 43;
rank['Field Marshal **'] = 44;
rank['Field Marshal ***'] = 45;
rank['Supreme Marshal'] = 46;
rank['Supreme Marshal *'] = 47;
rank['Supreme Marshal **'] = 48;
rank['Supreme Marshal ***'] = 49;
rank['National Force'] = 50;
rank['National Force *'] = 51;
rank['National Force **'] = 52;
rank['National Force ***'] = 53;
rank['World Class Force'] = 54;
rank['World Class Force *'] = 55;
rank['World Class Force **'] = 56;
rank['World Class Force ***'] = 57;
rank['Legendary Force'] = 58;
rank['Legendary Force *'] = 59;
rank['Legendary Force **'] = 60;
rank['Legendary Force ***'] = 61;
rank['God of War'] = 62;

function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {

	var rankKoef	= (militaryRank - 1)/20 + 0.3;
	var strKoef		= (strength / 10) + 40;
	var weaponKoef	= 1 + weaponPower/100;
	
	return Math.floor(rankKoef * strKoef * weaponKoef * fights * bonus);

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

	if (subURL.match(/^citizen\/profile\/(\d+)$/)) {

		var str = $j('div.citizen_military:eq(0) h4').text().trim();
		str = parseFloat(str_replace(str, ',', ''));
      
		var mRank = $j('div.citizen_military:eq(1) h4').text().trim();

		$j('div.citizen_military:last').after(
			'<h3>Damage statistics</h3>' +
			'<div class="citizen_military">' +
			'<strong>Max hit: </strong>' +
			'<h4 style="margin-left:45px">' + dmgCalc(rank[mRank], str, 100, 1, 1) + '</h4>' +
			'<div class="stat"><small>' +
			' q0: ' + dmgCalc(rank[mRank], str, 0, 1, 1) + ' q1: ' + dmgCalc(rank[mRank], str, 20, 1, 1) +
			' q2: ' + dmgCalc(rank[mRank], str, 40, 1, 1) + '<br />q3: ' + dmgCalc(rank[mRank], str, 60, 1, 1) +
			' q4: ' + dmgCalc(rank[mRank], str, 80, 1, 1) + ' q5: ' + dmgCalc(rank[mRank], str, 100, 1, 1) +
			'</small></div></div>' +
			'<h3>Influence calculator' +
			'<span style="float:right">Weapon: <select id="dmgWeapon" size="1">' +
			'<option value="0">Q0</option><option value="20">Q1</option><option value="40">Q2</option><option value="60">Q3</option>' +
			'<option value="80">Q4</option><option value="100" selected="selected">Q5</option>' +
			'</select>&nbsp;&nbsp;&nbsp;&nbsp;# of fights: <input id="dmgFights" name="dmgFights" value="94" size="4" maxlength="4" />' +
			'&nbsp;<button id="dmgCalc">go!</button>' +
			'</span></h3><div class="citizen_military" style="margin-bottom:2px">' +
			'<div id="dmgResults"><strong>94 fights: </strong>' +
			'<h4 style="margin-left:37px">' + dmgCalc(rank[mRank], str, 100, 94, 1) + '</h4>' +
			'<div class="stat"><small>With NE bonus: <strong><span style="font-size:12px;margin-right:15px">' +
			dmgCalc(rank[mRank], str, 100, 94, 1.1) + '</span></strong></small></div></div></div>'
		);
      
		$j('button#dmgCalc').click(function() {

			var fights  = $j('input#dmgFights').val();

				$j('div#dmgResults').html(
					'<strong>' + fights + ' fights: </strong>' +
					'<h4 style="margin-left:37px">' + dmgCalc(rank[mRank], str, $j('select#dmgWeapon').val(), fights, 1) + '</h4>' +
					'<div class="stat"><small>With NE bonus: <strong><span style="font-size:12px;margin-right:15px">' +
					dmgCalc(rank[mRank], str, $j('select#dmgWeapon').val(), fights, 1.1) + '</span></strong></small></div>'
				);

		});

		$j('select#dmgWeapon').change(function() {

			$j('button#dmgCalc').click();

		});

		return;
  
  }

	unsafeWindow.jQuery.fx.off = true;

	foodId = $j('div.user_health input[type=hidden]').attr('id');
	foodUrl = 'http://www.erepublik.com/en/main/eat?format=json&_token=' + $j('#' + foodId).val() + '&jsoncallback=?';
	regionName = $j('div#pvp div#pvp_header h2').text();

	var styles =
		'<style type="text/css"> ' +
		'div.BHTable { width: 180px; height: 75px; border: 1px solid #777; border-radius: 5px; padding: 6px; background-color: #333; } ' +
		'table.BHTable { margin: 0; padding: 2px; width: 100%; font-size: 10px; text-align: left; } ' +
		'table.BHTable tr { height: 10px; line-height: 12px; } ' +
		'#myStatBoxL, #myStatBoxR, #myOverBox { color: #fff; } ' +
		'#myStatBoxL a, #myStatBoxR a, #myOverBox a { color: #abc; } ' +
		'#multihit_start, #hospitals_get, #battlelog_clear {margin-top: 0px; margin-left: 0px; margin-bottom: 0px; position: relative;}' +
		'</style>';
		
	$j('head').append(styles);

	var content = $j('div#pvp_battle_area');
	content.prepend(
		'<div id="myStatBoxL" style="position: absolute; top: 400px; left: 18px; width: 200px; opacity: 0.8;"></div>' +
		'<div id="myOverBox" style="position: absolute; top: 300px; left: 285px; width: 200px; opacity: 0.8;"></div>'
	);
	content.append(
		'<div id="myStatBoxR" style="position: absolute; top: 400px; left: 540px; width: 200px; opacity: 0.8;"></div>'
	);

	$j('div#enemy_defeated').before(
		'<div id="MHP" style="position:relative;width:836px;float:left;clear:both;padding:3px;margin:5px 0;font-weight:bold;color:#000;text-align:center">' +
		'<big>MultiHIT:&nbsp;</big>' +
		'<input id="multihit_count" type="text" size="3" maxlength="3" value="1" /><button id="multihit_start">HIT!</button>' +
		'&nbsp;&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food when needed</label>' +
		'&nbsp;&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;Not use Bazooka</label><br />' +
		'<input type="checkbox" id="multihit_energy" name="multihit_energy"><label for="multihit_energy">&nbsp;Use EnergyBars if no more food</label>' +
		'&nbsp;&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use HealthKits if no more food</label><br /><br />' +
		'<button id="heros_update">Update</button>&nbsp;&nbsp;Hero Lists updated automatically, but you can still update them here' +
		'<div id="multihit_message" style="padding:2px;color:#ff0000"></div></div>' +
		'<div id="hospitals" style="clear:both"><br />' +
		'<div id="hospitals_info" style="position:relative;width:755px;height:60px;-moz-border-radius:7px;float:left;padding:3px;font-weight:bold;color:#000;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAAAXNSR0IArs4c6QAAADNQTFRFAAAABQYIBwgKCQoNCw0RDhEVDxIXERQZFBgeFhohGBwkGh8nHSIsHyQvISYxJCo2JSs3x4w3dgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAHdElNRQfbAgQPOSB/OWg0AAADI0lEQVRYw41X2baDIAxEtLVar/D/X3uBLCQh9NiHUq0TkiHLGK4QwpJTussacixf35TSq16VNZVlS+1T/7rKupX1A7dygMfO8r2W6792fZZfe1l3tJGL9bLLXX4tYCNXGwfiyx7v8tS3/bFKPO5fbSgvuw3aoSyv5pDFnxltqCiVHzWWA7x9KXz16sT4NUttKxNLCoAa8Wt28B4fjHw1PvbfeI5c83EIGxrPOIu/lR/KhtqfsAOe+chwZxU2HvgPTNRv9OEQtHY+Gr7ngIxfWtrgxuXYAOyKq0DJKzyLwxwv2Jj5b+7sLR+GFPmAt378412TIvPzX2YnG1SapRn/f56N7Nmw+MTxX9bGDnVVHuMgo46farSZjxn6h4qy4reMjnrxU50xTaviA/DtN+TtED/1Cok/FR8blU8FePxR1aoGNvIROGj//DX+7fBhif+FpwZ4KD6G4C0+DQ20Fsw9taHwNCC8Bgh8pNGG2j/TkBkbaOXjIifykO4J48csu97C/1b77Ah57pQM8MeZyvF/pA1AheQmpDtA1ix60EnRBydFwnyAHMbGCvkgbXjnfwYxtgcbujmnCX5d3F5Ye7Jt8D4+O+Ny5/Rtz8ReZb2gMMWbfUc+ED7gPvSI2J+yg9PvluPyQAGSIJzbEyBoQw0wPS6p/VQb3vnzycp88fiomPhUQDh8UEOkOB8LCLahj/d6io9zCaIECCF/NUBrQ+3f5deABxskIFSq0n6Q49RMzQCPLGQ2zJkx3Vv8sUsQMWaFmAImy7D3SmYqILS9eprZLbvZAHHuBUPrafhQ+y/efXM0cwH6WILM4nfyi8aXThHVK7FCbn7J0H6ggBjmFO/fq7z+EcexjQICi9yJnzqFzV8xLllA+AKsTfsu41E7O3wkPJJnAkLIh8QTB116gt+BDzX6s4HO6tc2MP3ypujTB4OD6hgb4DWTIGp/en1FStUAapySAlE0cv7X7ekV2GnAMbNsYCGh+Gj8CaEr4pe9EPuFVzJ8/nZ/LR9aA3PlQyL+bfxOTw4m3VmdTQaQ7esRRnNPs2sigCby4RzkwzR+txeCfv0HJup8UeBHV3gAAAAASUVORK5CYII=)">' +
		'<button id="hospitals_get">get hospitals</button></div>' +
		'</div><br />' +
		'<fieldset id="BLOG"><legend>v1.0.1 BATTLE LOG:&nbsp;&nbsp;<button id="battlelog_clear">clear</button></legend><div id="battlelog"></div></fieldset>'
	);

	if (unsafeWindow.SERVER_DATA.onlySpectator != 0) {

		$j('div#MHP').hide();
		$j('fieldset#BLOG').hide();

	}

	// always show domination
	$j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
	$j('#red_domination').css({'opacity': '1', 'color': '#fff'});

	// remove idle timer
	$j(document).ready(function() {
		clearInterval(unsafeWindow.globalSleepInterval);
		unsafeWindow.shootLockout = 1;
	});

	// check hospital
	setInterval(function() {

		var h = $j('#heal_btn');

		if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

			bLog('Getting EXTRA wellness from hospital...');
			unsafeWindow.useHospital();

		}

	}, 250);


	unsafeWindow.battleFX.hit = function() {

		if (multiHitRunning) {

			multiHitDone++;
			multiHitLastKilled = false;
			bLog('HIT DONE!');
			$j('div#multihit_message').html('Hits: ' + multiHitDone + '&nbsp;&nbsp;Kills: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'Last Enemy killed!' : 'Last Enemy alive!') + ')');
			clearTimeout(multiHitLoopId);
			multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 1001);

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

	unsafeWindow.battleFX.pop = function(target, width) {

		if (target == 'enemy_defeated') {

			unsafeWindow.closeAddDamagePopup();

		} else if (target == 'rank_up') {

			unsafeWindow.closeAddRankPopup();

		} else {

			if (typeof(width) == 'undefined' || typeof(width) == undefined) width = '396px';
	
			var useTarget = $j('#'+target)[0]; // cache it
			$j('#pvp').block({
				message: useTarget,
				overlayCSS: {
					backgroundColor: '#000207',
					opacity: 0.5
				},
				css: {
					width: width
				}
			});
			
		}
		
		return false;

	};

	unsafeWindow.battleFX.countNextBattle = function(time) {
		// if we enter the next battle too fast, this function may be called again
		// with an invalid date() object, just refesh once more
		if (isNaN(time.getMonth())) {
			setTimeout(function() { top.location.href = document.location.href; }, 1000);
			return false;
		}

		$j('#next_battle_time').countdown({until: time, format: 'MS', compact: true, description: '', onTick: checkTime});
		function checkTime(periods) {
			if ($j.countdown.periodsToSeconds(periods) == 0) {
				// original part, just for reference
				$j('#time_details').fadeOut('fast');
				$j(this).parent().parent().removeClass('disabled').addClass('goNext');
				$j(".goNext").click(function(){
					location.reload(true);
				});
				
				// wait a few seconds before refresh
				setTimeout(function() { top.location.href = document.location.href; }, 2000);
			}
		}
		
		return false;

	};
	
	unsafeWindow.jQuery.fn.getWell = function() {

		var h = $j('#heal_btn');
		var trigger = $j('#DailyConsumtionTrigger');

		if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

			bLog('Getting wellness from hospital...');
			unsafeWindow.useHospital();

		} else if ( ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') 
				&& !trigger.hasClass('buy') && !trigger.hasClass('energy'))
			 || ($j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') 
				&& trigger.hasClass('energy')) ) {

			bLog('Getting wellness from food...');
			$j('#heal_btn small').hide();
			h.removeClass('hospital_btn');
			h.attr('title', 'Consume Food');
			unsafeWindow.ERPK.disableHealButton();
			$j('#DailyConsumtionTrigger').addClass('load');
			$j.getJSON(foodUrl, {},  function (data) {

				$j('#DailyConsumtionTrigger').removeClass('load');
				data.health = parseFloat(data.health);
				wellInc += data.health - unsafeWindow.SERVER_DATA.health;
				unsafeWindow.processResponse(data);
				bLog('Wellness added: ' + wellInc);

				wellInc = 0;
				clearTimeout(multiHitLoopId);
				multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);

			});

		} else if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {

			bLog('Getting wellness from health kit...');
			$j('.health_kit_btn').click();

		}

	};

	unsafeWindow.jQuery.fn.changeWeapon = function() {

	  bLog('Change Weapon');

		var url = "/en/military/change-weapon";
		unsafeWindow.ERPK.disableAllButtons();

		$j.post(url, {_token: unsafeWindow.SERVER_DATA.csrfToken, battleId: unsafeWindow.SERVER_DATA.battleId}, function (response) {

			unsafeWindow.updateFighterWeapon($j("#scroller").data("scrollable"), response);
			unsafeWindow.ERPK.enableAllButtons();
			
			if ($j(".listing span img").eq(-1).attr("src").indexOf("q10") !== -1) {

				bLog('Cannot change weapon. Stop.');
				multiHitRunning = false;
				$j('button#multihit_start').html('HIT!');
				return;

			} else {

				clearTimeout(multiHitLoopId);
				multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);
				return;

			}
			
		}, 'json');
			
	};

	
	unsafeWindow.jQuery.fn.multiHIT = function() {

		if (unsafeWindow.globalStop || multiHitCount == multiHitDone) {

			multiHitRunning = false;
			$j('button#multihit_start').html('HIT!');
			bLog('All done.');
			return;

		}

		if (unsafeWindow.ERPK.canFire()) {

			// When changing, new one is added to the scroller, not replacing old one,
			// so must check the latest one.
			if ($j('input#multihit_bazooka').is(':checked') && $j(".listing span img").eq(-1).attr("src").indexOf("q10") !== -1) {

				unsafeWindow.jQuery.fn.changeWeapon();

			} else {

				bLog('Shooting...');
				unsafeWindow.shoot();

			}

		} else if (canGetWell()) {

			unsafeWindow.jQuery.fn.getWell();

		} else {

			bLog('Cannot increase wellness. Stop.');
			multiHitRunning = false;
			$j('button#multihit_start').html('HIT!');
			return;

		}

	};

	$j('button#multihit_start').click(function() {

		if (multiHitRunning) {

			clearTimeout(multiHitLoopId);
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

	$j('button#hospitals_get').click(function() {

		var id = unsafeWindow.SERVER_DATA.defenderId;

		if (unsafeWindow.SERVER_DATA.mustInvert) {

			id = unsafeWindow.SERVER_DATA.invaderId;

		}

		if (unsafeWindow.globalStop) { return; }

		if (unsafeWindow.SERVER_DATA.onlySpectator != 1 && unsafeWindow.SERVER_DATA.isResistance != 1 && id != unsafeWindow.SERVER_DATA.countryId) {

			$j('button#hospitals_get').html('Attacking side cannot use hospitals!').attr('disabled', 'true');
			return;

		}

		setTimeout(function() {

			getRegionInfo(id);

		}, 0);

	});

	$j('button#heros_update').click(function() {
	
		if (unsafeWindow.globalStop) {return;}

		$j.getJSON("/en/military/battle-stats/"+unsafeWindow.SERVER_DATA.battleId, function(data) {
		});
	
	});

	$j("body").ajaxSuccess(function(e, res, opt) {

		if (opt.url.indexOf('/battle-stats/') > -1 && unsafeWindow.SERVER_DATA.onlySpectator != 1) {

			var att = unsafeWindow.SERVER_DATA.invaderId;
			var def = unsafeWindow.SERVER_DATA.defenderId;

			if (unsafeWindow.SERVER_DATA.mustInvert) {

				att = unsafeWindow.SERVER_DATA.defenderId;
				def = unsafeWindow.SERVER_DATA.invaderId;
				
			}

			var zone = unsafeWindow.SERVER_DATA.zoneId;
			var bh = eval("(" + res.responseText + ")");
			var history = bh['history'][0][unsafeWindow.SERVER_DATA.countryId];

			var top5HIST = '';

			for ( var i = 0; i < history.length; i++ ) {
			
				top5HIST = top5HIST+'<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[history[i].citizen_id].id+'">'+bh.fightersData[history[i].citizen_id].name+'</a></td><td>'+history[i].kills+'</td><td><strong>'+history[i].damage+'</strong></td></tr>';
			
			}

		  histStats(top5HIST);

			var top5ABH = '';
			var top5DBH = '';
			var aBH = '';
			var dBH = '';

			if (typeof bh['current'] == 'undefined') { return; }
			if (typeof bh['current'][zone] == 'undefined') { return; }
			
			if (typeof bh['current'][zone][att] != 'undefined') {
	
				var attID = bh['current'][zone][att][0];
			
				if ( attID.citizen_id > 0 )
					aBH = '<a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[attID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[attID.citizen_id].avatar+'"><small>'+bh.fightersData[attID.citizen_id].name+'</small><strong>'+attID.damage+'</strong></a>';

				for ( var i = 0; i < bh['current'][zone][att].length; i++ ) {

					top5ABH = top5ABH+'<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[bh['current'][zone][att][i].citizen_id].id+'">'+bh.fightersData[bh['current'][zone][att][i].citizen_id].name+'</a></td><td>'+bh['current'][zone][att][i].kills+'</td><td><strong>'+bh['current'][zone][att][i].damage+'</strong></td></tr>';

				}

			}

		  if (typeof bh['current'][zone][def] != 'undefined') {

				var defID = bh['current'][zone][def][0];

				if ( defID.citizen_id > 0 )
					dBH = '<a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[defID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[defID.citizen_id].avatar+'"><small>'+bh.fightersData[defID.citizen_id].name+'</small><strong>'+defID.damage+'</strong></a>';

				for ( var i = 0; i < bh['current'][zone][def].length; i++ ) {

					top5DBH = top5DBH+'<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[bh['current'][zone][def][i].citizen_id].id+'">'+bh.fightersData[bh['current'][zone][def][i].citizen_id].name+'</a></td><td>'+bh['current'][zone][def][i].kills+'</td><td><strong>'+bh['current'][zone][def][i].damage+'</strong></td></tr>';

	     	}

			}

			setLink2BH(aBH, dBH);
			
			if (unsafeWindow.SERVER_DATA.mustInvert == false)
				bhStats(top5DBH, top5ABH);
			else
				bhStats(top5ABH, top5DBH);

  	}

	});

}