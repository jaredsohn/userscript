// ==UserScript==
// @name           eRep beatings for Tank
// @version        0.142 dev
// @author         eCitizen Scyld & Mousavian
// @namespace      eCitizenScyld
// @description    Battlefield Enhancements for Tanks
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==

// ===============================================================================
// License and disclaimer
// ===============================================================================
// The program provides no guarantee and responsibility for the negative effect - at your own risk.
// 
// Updates since original script : http://userscripts.org/scripts/review/100514
//
// - Disabled useless hospital codes
// - Resolved auto eating food
// - Adding Show BH Table and Clear BH Table buttons
// - Disabled citizen profile additions and Domination bar enhancements as it's available thru eRepublik Advanced
// 
// Known Issue:
//
// - Frequently Refreshes battlefield during 5 min interact

// FUNCTIONALITY
// include        http://www.erepublik.com/*/citizen/profile/*

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
var foodUrl = "";
var foodId = "";
var s_houston = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAAGi20gAAAAACgS23oBHgF2b3JiaXMAAAAAARErAACwNgAA2i8AAAAAAACZAU9nZ1MAAAAAAAAAAAAABottIAEAAACx2wWNCj3//////////5ADdm9yYmlzLQAAAFhpcGguT3JnIGxpYlZvcmJpcyBJIDIwMTAxMTAxIChTY2hhdWZlbnVnZ2V0KQAAAAABBXZvcmJpcw9CQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBACAAAAYRqF1TCqDEEPKQ4QUY9AzoxBDDEzGHGNONKQMMogzxZAyiFssLqgQBKEhKwKAKAAAwBjEGGIMOeekZFIi55iUTkoDnaPUUcoolRRLjBmlEluJMYLOUeooZZRCjKXFjFKJscRUAABAgAMAQICFUGjIigAgCgCAMAYphZRCjCnmFHOIMeUcgwwxxiBkzinoGJNOSuWck85JiRhjzjEHlXNOSuekctBJyaQTAAAQ4AAAEGAhFBqyIgCIEwAwSJKmWZomipamiaJniqrqiaKqWp5nmp5pqqpnmqpqqqrrmqrqypbnmaZnmqrqmaaqiqbquqaquq6nqrZsuqoum65q267s+rZru77uqapsm6or66bqyrrqyrbuurbtS56nqqKquq5nqq6ruq5uq65r25pqyq6purJtuq4tu7Js664s67pmqq5suqotm64s667s2rYqy7ovuq5uq7Ks+6os+75s67ru2rrwi65r66os674qy74x27bwy7ouHJMnqqqnqq7rmarrqq5r26rr2rqmmq5suq4tm6or26os67Yry7aumaosm64r26bryrIqy77vyrJui67r66Ys67oqy8Lu6roxzLat+6Lr6roqy7qvyrKuu7ru+7JuC7umqrpu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';

var weapon = {"count":0,"power":0,"durability":0};

var currURL		= location.href;																// http://www.erepublik.com/pl/citizen/profile/2622385
var arrURL		= currURL.split('/');															// wersja w tablicy
var BASE_URL	= arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/' + arrURL[3] + '/';		// http://www.erepublik.com/pl/
var subURL		= currURL.substr(BASE_URL.length);

var ss1         = document.createElement('style');
var hh1         = document.getElementsByTagName('head')[0];
var styles      =
  'div.BHTable { width: 150px; height: 80px; border: 2px solid #777; border-radius: 6px; padding: 4px; background-color: #333; } ' +
  'table.BHTable { margin: 0; padding: 3px; width: 100%; font-size: 10px; text-align: left; } ' +
  'table.BHTable tr { height: 9px; line-height: 13px; } ' +
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
  	'<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + att + '</table></div>' +
  	'<div class="BHTable" style="float:right"><table class="BHTable" style="float:right"><tr><td>Citizen</td><td>olum</td><td>Influence</td></tr>' + def + '</table></div>' +
  	'</div>'
  );

//  $j('#SUMInflue').html(satt + '  :  ' + sdef);

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

	var h = $j('#hospital_btn');
	var trigger = $j('#DailyConsumtionTrigger');

//	if ($j('#hospital_btn small').html() != '0' && !h.hasClass('disabled')) { return true; }
	if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy')) { return true; }
	if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) { return true; }

	return false;

}

function doIHaveWeapon() {

	var dummy = $j(".fighter_weapon_image:last").attr("src").indexOf("q0") == -1;

	return dummy;

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
            '</select>&nbsp;&nbsp;&nbsp;&nbsp;# of fights: <input id="dmgFights" name="dmgFights" value="25" size="4" maxlength="4" />' +
            '&nbsp;<button id="dmgCalc">go!</button>' +
            '</span></h3><div class="citizen_military" style="margin-bottom:2px">' +
            '<div id="dmgResults"><strong>25 fights: </strong>' +
            '<h4 style="margin-left:37px">' + dmgCalc(rank[mRank], str, 100, 25, 1) + '</h4>' +
            '<div class="stat"><small>With NE bonus: <strong><span style="font-size:12px;margin-right:15px">' +
            dmgCalc(rank[mRank], str, 100, 25, 1.1) + '</span></strong></small></div></div></div>'
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
/*
	unsafeWindow.jQuery.fn.updateDominationBar = function() {

		var get_fighters_url = "/en/military/battle-log/" + unsafeWindow.SERVER_DATA.battleId;

		$j.getJSON(get_fighters_url, function(data) {

			unsafeWindow.current_domination = data["domination"];
			updateDomination = true;

		});

	}
*/
	unsafeWindow.jQuery.fx.off = true;
/*
	foodId = $j('li#DailyConsumtion input[type=hidden]').attr('id');
	foodUrl = '/eat?format=json&_token=' + $j('#' + foodId).val() + '&jsoncallback=?';
*/
	clearInterval(unsafeWindow.globalSleepInterval);

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

/*	unsafeWindow.battleFX.setDominationPercents = function(){return false;};
	unsafeWindow.battleFX.updateDomination = function(){return false;};
*/
	unsafeWindow.battleFX.pop = function(target) {

		var useTarget = $j('#' + target)[0];

		if (target == 'enemy_defeated') {

			unsafeWindow.closeAddDamagePopup();

		} else if (target == 'rank_up') {

			unsafeWindow.closeAddRankPopup();

		} else if (target == 'bazooka_pop') {

			$j('.closeit').click();

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
/*
	$j(".battle_stats_button").click(function(){
		alert('PAF > all :-D');
	});

	$j('.progress').each(function() {
		$j(this).css({'text-align': 'center', 'overflow': 'visible'});
	});

	var exactDomination = parseFloat($j('#domination_bar').css('width'));
	$j('#blue_domination').text(mathRound(exactDomination, 5).toFixed(5) + '%');
    	$j('#red_domination').text(mathRound(100 - exactDomination, 5).toFixed(5) + '%');
	$j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
	$j('#red_domination').css({'opacity': '1', 'color': '#fff'});
	$j('#domination_bar').css({'width': exactDomination + '%'});
*/
	setInterval(function() {

		var progress = unsafeWindow.current_domination;
		var h = $j('#hospital_btn');

		unsafeWindow.shootLockout = 1;
		unsafeWindow.getStatsInterval = 2500;
		unsafeWindow.getFightersInterval = 2500;
		unsafeWindow.globalSleepTick = 1;

		if (unsafeWindow.SERVER_DATA.mustInvert) {
			progress = 100 - progress;
		}

        if (updateDomination) {

//    		$j('#blue_domination').text(mathRound(progress, 5).toFixed(5) + '%');
//    		$j('#red_domination').text(mathRound(100 - progress, 5).toFixed(5) + '%');
//    		$j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
//    		$j('#red_domination').css({'opacity': '1', 'color': '#fff'});
//    		$j('#domination_bar').css({'width': progress + '%'});
    		
    		updateDomination = false;

    	}

		if (unsafeWindow.globalStop && unsafeWindow.battleFinished != 1 && --countdownRefresh == 0) {

			top.location.href = document.location.href;
			return;

		}

//		if ($j('#hospital_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {
//
//			bLog('Getting EXTRA wellness from hospital...');
//			unsafeWindow.useHospital();
//
//		}

	}, 150);
/*
	regionName = $j('div#pvp div#pvp_header h2').text();

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
//			monitorRefreshIntervalId = setInterval("jQuery.fn.updateDominationBar()", monitorRefresh);}

		 else {

			clearInterval(monitorRefreshIntervalId);

		}

	});
*/
	unsafeWindow.jQuery.fn.getWell = function() {

		if (!unsafeWindow.ERPK.canFire()) {

			// bLog('Cannot shoot - low wellness. Trying to get some.');

			if (!canGetWell()) { return; }

			if (!waitingForWell) {

				var h = $j('#hospital_btn');
				var trigger = unsafeWindow.$j('#DailyConsumtionTrigger');

//				if ($j('#hospital_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {
//
//					bLog('Getting wellness from hospital...');
//					unsafeWindow.useHospital();} else 
//
				if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') && !trigger.hasClass('buy')) {

					bLog('Getting wellness from food...');
					unsafeWindow.$j('#DailyConsumtionTrigger').click();

				} else if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {

					bLog('Getting wellness from health kit...');
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
		multiHitLoopId = setTimeout("jQuery.fn.multiHIT()", 1001);

	};

    var content = $j('div#pvp_battle_area');
    content.prepend(
    	'<div id="myStatBox" style="position: absolute; top: 142px; left: 167px; width: 500px;"></div>' +
    	'<div id="myOverBox" style="position: absolute; top: 300px; left: 315px; width: 250px;"></div>' +
    	'<div id="SUMInflue" style="position: absolute; top: 240px; left: 325px; width: 180px;"></div>'
    );

//	$j('div#pvp_actions').prepend(
	$j('div#enemy_defeated').before(
'<div id="MHP" style="position:relative;width:836px;float:left;clear:both;padding:3px;margin:5px 0;font-weight:bold;color:#000;text-align:center">' +
'<big>MultiHIT:&nbsp;</big>' +
'<input id="multihit_count" type="text" size="3" maxlength="3" value="8" /><button id="multihit_start">HIT!</button>&nbsp;&nbsp;' +
'<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food when needed</label>' +
'&nbsp;&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use HealthKits if no more food</label>&nbsp;' +
'<div id="multihit_message" style="padding:2px;color:#ff0000"></div></div>' +
/*'<div id="hospitals" style="clear:both"><br />' +
'<div id="hospitals_info" style="position:relative;width:836px;height:65px;-moz-border-radius:7px;float:left;padding:3px;font-weight:bold;color:#000;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAAAXNSR0IArs4c6QAAADNQTFRFAAAABQYIBwgKCQoNCw0RDhEVDxIXERQZFBgeFhohGBwkGh8nHSIsHyQvISYxJCo2JSs3x4w3dgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAHdElNRQfbAgQPOSB/OWg0AAADI0lEQVRYw41X2baDIAxEtLVar/D/X3uBLCQh9NiHUq0TkiHLGK4QwpJTussacixf35TSq16VNZVlS+1T/7rKupX1A7dygMfO8r2W6792fZZfe1l3tJGL9bLLXX4tYCNXGwfiyx7v8tS3/bFKPO5fbSgvuw3aoSyv5pDFnxltqCiVHzWWA7x9KXz16sT4NUttKxNLCoAa8Wt28B4fjHw1PvbfeI5c83EIGxrPOIu/lR/KhtqfsAOe+chwZxU2HvgPTNRv9OEQtHY+Gr7ngIxfWtrgxuXYAOyKq0DJKzyLwxwv2Jj5b+7sLR+GFPmAt378412TIvPzX2YnG1SapRn/f56N7Nmw+MTxX9bGDnVVHuMgo46farSZjxn6h4qy4reMjnrxU50xTaviA/DtN+TtED/1Cok/FR8blU8FePxR1aoGNvIROGj//DX+7fBhif+FpwZ4KD6G4C0+DQ20Fsw9taHwNCC8Bgh8pNGG2j/TkBkbaOXjIifykO4J48csu97C/1b77Ah57pQM8MeZyvF/pA1AheQmpDtA1ix60EnRBydFwnyAHMbGCvkgbXjnfwYxtgcbujmnCX5d3F5Ye7Jt8D4+O+Ny5/Rtz8ReZb2gMMWbfUc+ED7gPvSI2J+yg9PvluPyQAGSIJzbEyBoQw0wPS6p/VQb3vnzycp88fiomPhUQDh8UEOkOB8LCLahj/d6io9zCaIECCF/NUBrQ+3f5deABxskIFSq0n6Q49RMzQCPLGQ2zJkx3Vv8sUsQMWaFmAImy7D3SmYqILS9eprZLbvZAHHuBUPrafhQ+y/efXM0cwH6WILM4nfyi8aXThHVK7FCbn7J0H6ggBjmFO/fq7z+EcexjQICi9yJnzqFzV8xLllA+AKsTfsu41E7O3wkPJJnAkLIh8QTB116gt+BDzX6s4HO6tc2MP3ypujTB4OD6hgb4DWTIGp/en1FStUAapySAlE0cv7X7ekV2GnAMbNsYCGh+Gj8CaEr4pe9EPuFVzJ8/nZ/LR9aA3PlQyL+bfxOTw4m3VmdTQaQ7esRRnNPs2sigCby4RzkwzR+txeCfv0HJup8UeBHV3gAAAAASUVORK5CYII=)">' +
'<button id="hospitals_get">get hospitals</button></div>' +*/
'</div><br /><div id="bronId"></div>' +
'<div id="bhbut"><button id="showBHTable">Show BH Table</label>  <button id="clearBHTable">Clear BH Table</label></div>&nbsp;' +
'<fieldset id="BLOG"><legend>v0.138 BATTLE LOG:&nbsp;&nbsp;<button id="battlelog_clear">clear</button></legend><div id="battlelog"></div></fieldset>'
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


	$j('button#clearBHTable').click(function() {
		$j('#BHTable').remove();
		$j('#OOTable').remove();
		$j('button#showBHTable').html('<strong>Show BH Table</strong>');

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

//			$j('button#hospitals_get').html('Attacking side cannot use hospitals!').attr('disabled', 'true');
			return;

		}

		setTimeout(function() {

			getRegionInfo(id);

		}, 0);

	});




	$j("body").ajaxSuccess(function(e, res, opt) {
	$j('button#showBHTable').click(function() {
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

	$j('button#showBHTable').html('<strong>Update BH Table</strong>');
        }

	});

	$j(document).ready(function() {

		clearInterval(unsafeWindow.globalSleepInterval);
		monitorRefreshIntervalId = setInterval("jQuery.fn.updateDominationBar()", monitorRefresh);
		setTimeout("jQuery.fn.updateDominationBar()", 2000);

	});});

}