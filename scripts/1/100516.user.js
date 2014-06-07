// ==UserScript==
// @name           apachi attack
// @version        0.138 dev
// @author         torlax
// @namespace      torlax
// @description    isik hizinda saldırı
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

// ===============================================================================
// erep battle master benzeri bi seyin uzerinde oynama yapilan bu script
// seri hit imkani saglar. savas ekraninda her iki taraftaki 5 damageyi
// ve toplamda 5 damageyi gosterir. uzerinde oynama yapilarak vatana 
// millete faydali hale getirilebilir. food_btn healt_kit ve energy bar
// kisminda sorun var can dolumu yapmiyor. ilgili bilgili arkadaslara

// basla

var regionName;
var countdownRefresh = 25;
var countdownWeapon = 15;
var monitorRefresh = 10000;
var monitorRefreshIntervalId = 0;
var updateDomination = false;
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

var weapon = {"count":0,"power":0,"durability":0};

var currURL		= 
location.href;																// http://www.erepublik.com/en/citizen/profile/xx
var arrURL		= 
currURL.split('/');															// wersja w tablicy

var BASE_URL	= arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/' + arrURL[3] + '/';		// http://www.erepublik.com/en/
var subURL		= currURL.substr(BASE_URL.length);

var ss1         = document.createElement('style');
var hh1         = document.getElementsByTagName('head')[0];
var styles      =
  'div.BHTable { width: 200px; height: 95px; border: 1px solid #777; border-radius: 5px; padding: 6px; background-color: #333; } ' +
  'table.BHTable { margin: 0; padding: 2px; width: 100%; font-size: 10px; text-align: left; } ' +
  'table.BHTable tr { height: 10px; line-height: 12px; } ' +
  '#myStatBox, #myOverBox { color: #fff; } ' +
  '#myStatBox a, #myOverBox a { color: #abc; } ' +
  '#SUMInflue { text-align: center; font-size: 20px; color: #fefefe; font-weight: 900; }';
var tt1         = document.createTextNode(styles);

ss1.type = 'text/css';
ss1.appendChild(tt1);
hh1.appendChild(ss1);

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

function str_replace(haystack, needle, replacement) {

    var temp = haystack.split(needle);
    return temp.join(replacement);

}

function bLog(content) {

	var current = new Date();
	$j('div#battlelog').append('<div>[' + current.toLocaleString() + '] ' + content + '</div>');

}

function bhStats(att, def, satt, sdef) {

  $j('#BHTable').remove();
  $j('div#myStatBox').html(
  	'<div id="BHTable">' +
  	'<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>reyis</th><th>leş</th><th>atmık</th></tr>' + att + '</table></div>' +
  	'<div class="BHTable" style="float:right"><table class="BHTable" style="float:right"><tr><td>vatandas</td><td>leş</td><td>atmık</td></tr>' + def + '</table></div>' +
  	'</div>'
  );

  $j('#SUMInflue').html(satt + '  :  ' + sdef);

}

function histStats(hist) {

	$j('#OOTable').remove();
	$j('div#myOverBox').html(
	  	'<div id="OOTable">' +
	  	'<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>reyis</th><th>leş</th><th>atmık</th></tr>' + hist + '</table></div>' +
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

	if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled')) { return true; }
	if ($j('input#multihit_heal').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy')) { return true; }
	if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) { return true; }

	return false;

}

function doIHaveWeapon() {

	var dummy = $j(".fighter_weapon_image:last").attr("src").indexOf("q0") == -1;

	return dummy;

}

function getRegionInfo(id)
{

	$j('button#hospitals_get').html('bekliyorsun görüyorum').attr('disabled', 'true');

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

							var row = '<td align="center" valign="top" style="border:1px solid #000;width:55px;height:65px" bgcolor="';

							if (b + 1 == unsafeWindow.SERVER_DATA.zoneId) {

								row += '#00ffff">';

							} else {

								row += '#ffffff">';

							}

							for (var c = 0; c < hospitals.length; c++) {

								if (hospitals[c].zone_id == b + 1) {

									row += '<small><img width="33" src="http://www.erepublik.com/images/icons/industry/4/q' + hospitals[c].max_heal_per_citizen + '.png" />';
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

						$j('button#hospitals_get').html('hastane yok - duble yol var').removeAttr('disabled');

					}

				}

			}

		},
		onreadystatechange:	function(response) {

			$j('button#hospitals_get').html('bekle bi');

		},
		onerror: function(response) {

			$j('button#hospitals_get').html('errörö. zorluyorum');
			setTimeout(function() { getRegionInfo(id); }, 2500);

		}

	});

}

var rank = new Array;

rank['Recruit'] = 1;
rank['Private'] = 2;
rank['Private*'] = 3;
rank['Private**'] = 4;
rank['Private***'] = 5;
rank['Corporal'] = 6;
rank['Corporal*'] = 7;
rank['Corporal**'] = 8;
rank['Corporal***'] = 9;
rank['Sergeant'] = 10;
rank['Sergeant*'] = 11;
rank['Sergeant**'] = 12;
rank['Sergeant***'] = 13;
rank['Lieutenant'] = 14;
rank['Lieutenant*'] = 15;
rank['Lieutenant**'] = 16;
rank['Lieutenant***'] = 17;
rank['Captain'] = 18;
rank['Captain*'] = 19;
rank['Captain**'] = 20;
rank['Captain***'] = 21;
rank['Major'] = 22;
rank['Major*'] = 23;
rank['Major**'] = 24;
rank['Major***'] = 25;
rank['Commander'] = 26;
rank['Commander*'] = 27;
rank['Commander**'] = 28;
rank['Commander***'] = 29;
rank['Lt Colonel'] = 30;
rank['Lt Colonel*'] = 31;
rank['Lt Colonel**'] = 32;
rank['Lt Colonel***'] = 33;
rank['Colonel'] = 34;
rank['Colonel*'] = 35;
rank['Colonel**'] = 36;
rank['Colonel***'] = 37;
rank['General'] = 38;
rank['General*'] = 39;
rank['General**'] = 40;
rank['General***'] = 41;
rank['Field Marshal'] = 42;
rank['Field Marshal*'] = 43;
rank['Field Marshal**'] = 44;
rank['Field Marshal***'] = 45;
rank['Supreme Marshal'] = 46;
rank['Supreme Marshal*'] = 47;
rank['Supreme Marshal**'] = 48;
rank['Supreme Marshal***'] = 49;
rank['National Force'] = 50;
rank['National Force*'] = 51;
rank['National Force**'] = 52;
rank['National Force***'] = 53;
rank['World Class Force'] = 54;
rank['World Class Force*'] = 55;
rank['World Class Force**'] = 56;
rank['World Class Force***'] = 57;
rank['Legendary Force'] = 58;
rank['Legendary Force*'] = 59;
rank['Legendary Force**'] = 60;
rank['Legendary Force***'] = 61;
rank['God of War'] = 62;

function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {

  var rankKoef   = (militaryRank - 1)/20 + 0.3;
  var strKoef    = (strength / 10) + 40;
  var weaponKoef = 1 + weaponPower/100;
  
  return Math.floor(rankKoef * strKoef * weaponKoef * fights * bonus);

}

// Upewniamy sie czy wymagana eRepowa jQuery jest zaladowana
function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { $j = unsafeWindow.jQuery; letsJQuery(); }

}
GM_wait();

// Main()
function letsJQuery() {

	if (typeof unsafeWindow == 'undefined') { unsafeWindow = window; }

 

        });

        $j('select#dmgWeapon').change(function() {
        
            $j('button#dmgCalc').click();
        
        });

        return;
    
    }

	unsafeWindow.jQuery.fn.updateDominationBar = function() {

		var get_fighters_url = "/en/military/battle-log/" + unsafeWindow.SERVER_DATA.battleId;

		$j.getJSON(get_fighters_url, function(data) {

			unsafeWindow.current_domination = data["domination"];
			updateDomination = true;

		});

	}

	unsafeWindow.jQuery.fx.off = true;

	foodId = $j('li#DailyConsumtionTrigger input[type=hidden]').attr('id');
	foodUrl = '/eat?format=json&_token=' + $j('#' + foodId).val() + '&jsoncallback=?';

	clearInterval(unsafeWindow.globalSleepInterval);

	unsafeWindow.battleFX.hit = function() {

		if (multiHitRunning) {

			multiHitDone++;
			multiHitLastKilled = false;
			bLog('ve goll!!');
			$j('div#multihit_message').html('posta: ' + multiHitDone + '&nbsp;&nbsp;ölü: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'dusman oldu mu!' : 'ılık göt hayatta!') + ')');
			clearTimeout(multiHitLoopId);
			multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 1001);

		}

		return false;

	};

	unsafeWindow.battleFX.blow = function() {

		if (multiHitRunning) {

			multiHitEnemyKill++;
			multiHitLastKilled = true;
			bLog('deyyus öldü!');
			$j('div#multihit_message').html('posta: ' + multiHitDone + '&nbsp;&nbsp;ölü: ' + multiHitEnemyKill + ' (' + (multiHitLastKilled ? 'deyyus öldü!' : 'ölmedi hayatta!') + ')');
		}

		return false;

	};

	unsafeWindow.battleFX.setDominationPercents = function(){return false;};
	unsafeWindow.battleFX.updateDomination = function(){return false;};

	unsafeWindow.battleFX.pop = function(target) {

		var useTarget = $j('#' + target)[0];

		if (target == 'enemy_defeated') {

			unsafeWindow.closeAddDamagePopup();

		} else if (target == 'rank_up') {

			unsafeWindow.closeAddRankPopup();

		} else if (target == 'battle_won') {

			top.location.href = document.location.href;
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
	$j('#blue_domination').text(mathRound(exactDomination, 5).toFixed(5) + '%');
	$j('#red_domination').text(mathRound(100 - exactDomination, 5).toFixed(5) + '%');
    $j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
    $j('#red_domination').css({'opacity': '1', 'color': '#fff'});
    $j('#domination_bar').css({'width': exactDomination + '%'});

	setInterval(function() {

		var progress = unsafeWindow.current_domination;
		var h = $j('#heal_btn');

		unsafeWindow.shootLockout = 1;
		unsafeWindow.getStatsInterval = 2500;
		unsafeWindow.getFightersInterval = 2500;
		unsafeWindow.globalSleepTick = 1;

		if (unsafeWindow.SERVER_DATA.mustInvert) {
			progress = 100 - progress;
		}

        if (updateDomination) {

    		$j('#blue_domination').text(mathRound(progress, 5).toFixed(5) + '%');
    		$j('#red_domination').text(mathRound(100 - progress, 5).toFixed(5) + '%');
    		$j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
    		$j('#red_domination').css({'opacity': '1', 'color': '#fff'});
    		$j('#domination_bar').css({'width': progress + '%'});
    		
    		updateDomination = false;

    	}

		if (unsafeWindow.globalStop && unsafeWindow.battleFinished != 1 && --countdownRefresh == 0) {

			top.location.href = document.location.href;
			return;

		}

	}, 150);


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

			// bLog('vuramadim - saglik yok.');

			if (!canGetWell()) { return; }

			if (!waitingForWell) {

				var h = $j('#heal_btn');
				var trigger = $j('#DailyConsumtionTrigger');

				if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {

					bLog('lokman reyis is basinda...');
					unsafeWindow.usefood();

				} else if ($j('input#multihit_heal').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy')) {

					bLog('eppek yiniyor.');
					$j('#heal_btn small').hide();
					h.removeClass('heal_btn');
					h.addClass('heal_btn');
					h.attr('title', 'Consume Food');
					unsafeWindow.ERPK.disableHospitalButton();

					$j.post(foodUrl, {}, function (data) {

						data.health = parseFloat(data.health);
						wellInc += data.health - unsafeWindow.SERVER_DATA.health;
						unsafeWindow.processResponse(data);
						$j('#DailyConsumtionTrigger').show();
						waitingForWell = false;
						bLog('Wellness added: ' + wellInc);

					}, 'json');

				} else if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {

					bLog('altinlar altinlar yaniyor.');
					$j('.health_kit_btn').click();

				}

				waitingForWell = true;

			}

			multiHitWellId = setTimeout("jQuery.fn.getWell()", 1001);

		} else {

			waitingForWell = false;
			wellInc = 0;
			clearTimeout(multiHitLoopId);
			multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 250);

		}

	};

	unsafeWindow.jQuery.fn.multiHIT = function() {

		if (unsafeWindow.globalStop || multiHitCount == multiHitDone) {

			multiHitRunning = false;
			$j('button#multihit_start').html('sikiş!');
			bLog('aysel gürelin memeleri.');
			return;

		}

		if (unsafeWindow.ERPK.canFire()) {

			bLog('vuruyor');
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
		multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 1001);

	};

    var content = $j('div#pvp_battle_area');
    content.prepend(
    	'<div id="myStatBox" style="position: absolute; top: 400px; left: 22px; width: 780px;"></div>' +
    	'<div id="myOverBox" style="position: absolute; top: 300px; left: 315px; width: 250px;"></div>' +
    	'<div id="SUMInflue" style="position: absolute; top: 240px; left: 325px; width: 180px;"></div>'
    );

//	$j('div#pvp_actions').prepend(
	$j('div#enemy_defeated').before(
'<div id="MHP" style="position:relative;width:836px;float:left;ne iş?:both;padding:3px;margin:5px 0;font-weight:bold;color:#000;text-align:center">' +
'<big>kaç posta:&nbsp;</big>' +
'<input id="multihit_count" type="text" size="3" maxlength="3" value="8" /><button id="multihit_start">sikiş</button>&nbsp;&nbsp;' +
'<input type="checkbox" id="multihit_heal" name="multihit_heal" checked="checked"><label for="multihit_heal">&nbsp;lazım oldukca eppek yi</label>' +
'&nbsp;&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;eppek yoksa pasta yi</label>' +
'<div id="multihit_message" style="padding:2px;color:#ff0000"></div></div>' +
'<div id="hospitals" style="clear:both"><br />' +
'<div id="hospitals_info" style="position:relative;width:836px;height:65px;-moz-border-radius:7px;float:left;padding:3px;font-weight:bold;color:#000;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAAAXNSR0IArs4c6QAAADNQTFRFAAAABQYIBwgKCQoNCw0RDhEVDxIXERQZFBgeFhohGBwkGh8nHSIsHyQvISYxJCo2JSs3x4w3dgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAHdElNRQfbAgQPOSB/OWg0AAADI0lEQVRYw41X2baDIAxEtLVar/D/X3uBLCQh9NiHUq0TkiHLGK4QwpJTussacixf35TSq16VNZVlS+1T/7rKupX1A7dygMfO8r2W6792fZZfe1l3tJGL9bLLXX4tYCNXGwfiyx7v8tS3/bFKPO5fbSgvuw3aoSyv5pDFnxltqCiVHzWWA7x9KXz16sT4NUttKxNLCoAa8Wt28B4fjHw1PvbfeI5c83EIGxrPOIu/lR/KhtqfsAOe+chwZxU2HvgPTNRv9OEQtHY+Gr7ngIxfWtrgxuXYAOyKq0DJKzyLwxwv2Jj5b+7sLR+GFPmAt378412TIvPzX2YnG1SapRn/f56N7Nmw+MTxX9bGDnVVHuMgo46farSZjxn6h4qy4reMjnrxU50xTaviA/DtN+TtED/1Cok/FR8blU8FePxR1aoGNvIROGj//DX+7fBhif+FpwZ4KD6G4C0+DQ20Fsw9taHwNCC8Bgh8pNGG2j/TkBkbaOXjIifykO4J48csu97C/1b77Ah57pQM8MeZyvF/pA1AheQmpDtA1ix60EnRBydFwnyAHMbGCvkgbXjnfwYxtgcbujmnCX5d3F5Ye7Jt8D4+O+Ny5/Rtz8ReZb2gMMWbfUc+ED7gPvSI2J+yg9PvluPyQAGSIJzbEyBoQw0wPS6p/VQb3vnzycp88fiomPhUQDh8UEOkOB8LCLahj/d6io9zCaIECCF/NUBrQ+3f5deABxskIFSq0n6Q49RMzQCPLGQ2zJkx3Vv8sUsQMWaFmAImy7D3SmYqILS9eprZLbvZAHHuBUPrafhQ+y/efXM0cwH6WILM4nfyi8aXThHVK7FCbn7J0H6ggBjmFO/fq7z+EcexjQICi9yJnzqFzV8xLllA+AKsTfsu41E7O3wkPJJnAkLIh8QTB116gt+BDzX6s4HO6tc2MP3ypujTB4OD6hgb4DWTIGp/en1FStUAapySAlE0cv7X7ekV2GnAMbNsYCGh+Gj8CaEr4pe9EPuFVzJ8/nZ/LR9aA3PlQyL+bfxOTw4m3VmdTQaQ7esRRnNPs2sigCby4RzkwzR+txeCfv0HJup8UeBHV3gAAAAASUVORK5CYII=)">' +
'<button id="hospitals_get">hastane ara</button></div>' +
'</div><br /><div id="bronId"></div>' +
'<fieldset id="BLOG"><legend>savaş kayıtların:&nbsp;&nbsp;<button id="battlelog_clear">temizle</button></legend><div id="battlelog"></div></fieldset>'
);

	if (unsafeWindow.SERVER_DATA.onlySpectator != 0) {

		$j('div#MHP').hide();
		$j('fieldset#BLOG').hide();

	}

/*
	$j(document).ajaxError(function(e, xhr, settings, exception) {
		bLog('XHR Error in: ' + settings.url + ' \n' + 'error:\n' + xhr.responseText );
	});
*/

	$j('button#doIHW').click(function() {

		alert(unsafeWindow.currentStats.length);

		for (var a = 0; a < unsafeWindow.currentStats.length; a++) {

			alert(unsafeWindow.currentStats[a]);

		}

	});

	$j('button#multihit_start').click(function() {

		if (multiHitRunning) {

			clearTimeout(multiHitLoopId);
			clearTimeout(multiHitWellId);
			multiHitRunning = false;
			$j('button#multihit_start').html('HIT!');
			bLog('biri beni durdurdu');

		} else {

			multiHitCount = $j('input#multihit_count').val();

			if (multiHitCount > 0) {

				multiHitDone = 0;
				multiHitEnemyKill = 0;
				multiHitLastKilled = false;
				multiHitRunning = true;
				$j('button#multihit_start').html('<strong>dur!</strong>');
				bLog('geliyor');

				unsafeWindow.jQuery.fn.multiHIT();

			}

		}

	});

	$j('button#battlelog_clear').click(function() {

			$j('div#battlelog').html('');

	});

	$j('button#hospitals_get').live('click', function() {

		var id = unsafeWindow.SERVER_DATA.defenderId;

		if (unsafeWindow.SERVER_DATA.mustInvert) {

			id = unsafeWindow.SERVER_DATA.invaderId;

		}

		if (unsafeWindow.globalStop) { return; }

		if (id != unsafeWindow.SERVER_DATA.countryId && unsafeWindow.SERVER_DATA.isResistance != 1) {

			$j('button#hospitals_get').html('saldıran taraf hastaneyi kullanamasın').attr('disabled', 'true');
			return;

		}

		setTimeout(function() {

			getRegionInfo(id);

		}, 0);

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
		  var top5Over = 0;

          var top5ABH = '';
  	      var top5Att = 0;

          var top5DBH = '';
  	      var top5Def = 0;

  		  for ( var i = 0; i < history.length; i++ ) {

  		  	top5HIST = top5HIST+'<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[history[i].citizen_id].id+'">'+bh.fightersData[history[i].citizen_id].name+'</a></td><td>'+history[i].kills+'</td><td><strong>'+history[i].damage+'</strong></td></tr>';
  		  	top5Over = top5Over + parseInt(history[i].damage);

  		  }

		  histStats(top5HIST);

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
    	       top5Att = top5Att + parseInt(bh['current'][zone][att][i].damage);

    	      }

    	  }

		  if (typeof bh['current'][zone][def] != 'undefined') {

	          var defID = bh['current'][zone][def][0];

	          if ( defID.citizen_id > 0 )
	           	dBH = '<a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[defID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[defID.citizen_id].avatar+'"><small>'+bh.fightersData[defID.citizen_id].name+'</small><strong>'+defID.damage+'</strong></a>';

	      	  for ( var i = 0; i < bh['current'][zone][def].length; i++ ) {

	      	    top5DBH = top5DBH+'<tr><td><a target="_blank" href="http://www.erepublik.com/en/citizen/profile/'+bh.fightersData[bh['current'][zone][def][i].citizen_id].id+'">'+bh.fightersData[bh['current'][zone][def][i].citizen_id].name+'</a></td><td>'+bh['current'][zone][def][i].kills+'</td><td><strong>'+bh['current'][zone][def][i].damage+'</strong></td></tr>';
	            top5Def = top5Def + parseInt(bh['current'][zone][def][i].damage);

	      	  }

	      }

          setLink2BH(aBH, dBH);

          if (unsafeWindow.SERVER_DATA.mustInvert == false)
          	bhStats(top5DBH, top5ABH, top5Def, top5Att);
          else
          	bhStats(top5ABH, top5DBH, top5Att, top5Def);

        }

	});

	$j(document).ready(function() {

		clearInterval(unsafeWindow.globalSleepInterval);
		monitorRefreshIntervalId = setInterval("jQuery.fn.updateDominationBar()", monitorRefresh);
		setTimeout("jQuery.fn.updateDominationBar()", 2000);

	});

}