// ==UserScript==
// @name           eRepublik battle master
// @version        1.16
// @author         hesar
// @description    http://userscripts.org/scripts/show/115705
// @description    based on original BattleMaster with new features
// @description    v1.0.6 added added hits done in battle window calculated with max hit and curretn damage (only finished kills wihtout NE)
// @description    v1.0.7 small fix for new Military Module (q6 hit and hits count)
// @description    v1.0.8 fix BH CH list 
// @description    v1.0.9 fix MultiHIT problem
// @description    v1.0.10 updates for Q7 weapon
// @description    v1.0.11 fix for hidden 'ma damage' info (up 30 pixels)
// @description    v1.0.12 support for GoW * - counts now correctly for stronger soldiers too
// @description    v1.0.13 a little fix for displaying numbers in pvp window
// @description    v1.1 multilingual support - thanks for titanicus (http://userscripts.org/users/26334)
// @description    v1.11 shows travel cost inside list (for battle window)
// @description    v1.12 small fixes after last changes from eRep team (new address erpeublik.net)
// @description    v1.13 few bug fixes
// @description    v1.14 few improvements for Mercenary (better view, added new ranks (Titans)
// @description    v1.15 added tooltips in Campaigns window with info about available Combat Orders (on hover on CO battle)
// @description    v1.16 move down booster activation placeholder
// @include        http*://*erepublik.com/*/citizen/profile/*
// @include        http*://*erepublik.com/*/military/battlefield/*
// @include        http*://*erepublik.com/*/military/campaigns
// 
// ==/UserScript==

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
var lang = document.evaluate('//meta[@name="language"]',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue.getAttribute('content');

var currURL		= location.href;			// http://www.erepublik.com/pl/citizen/profile/2622385
var arrURL		= currURL.split('/');	// wersja w tablicy
var BASE_URL	= arrURL[0] + '/' + arrURL[1] + '/' + arrURL[2] + '/' + arrURL[3] + '/';		// http://www.erepublik.com/pl/
var subURL		= currURL.substr(BASE_URL.length);
var defaultMaxFights = 130;

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
		'<div id="BHTableL" style="margin-top:130px;">' +
		'<div class="BHTable" style="float:left"><table class="BHTable"><tr><th>Citizen</th><th>Kills</th><th>Influence</th></tr>' + att + '</table></div>' +
		'</div>'
		);
	$j('#BHTableR').remove();
	$j('div#myStatBoxR').html(
		'<div id="BHTableR" style="margin-top:60px;">' +
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
	if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled')) {return true;}
	
	// can eat food?
	if ($j('input#multihit_food').is(':checked') && !trigger.hasClass('disabled') 
			&& !trigger.hasClass('buy') && !trigger.hasClass('energy')) {return true;}
	
	// can use energy bar?
	if ($j('input#multihit_energy').is(':checked') && !trigger.hasClass('disabled') 
			&& trigger.hasClass('energy')) {return true;}
	
	// can use healt kit?
	if ($j('input#multihit_hk').is(':checked') && unsafeWindow.ERPK.canUseHealthKit()) {return true;}

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
			setTimeout(function() {getRegionInfo(id);}, 2500);

		}

	});

}

function countPersonalDamage(S1,S2,YourFirePower,EnemyFirePower) {
    return (60 + ((S1-S2)/10)) * (1 + (YourFirePower-EnemyFirePower)/400) / 2;
}

function countHitsLeft() {
    //log(hitsLeft());
}
function hitsLeft() {
    if(youHaveBazooka()) return 1; 
    S1 = Number($j('#fighter_skill').text().replace(",",""));
    S2 = Number($j('#enemy_skill').text().replace(",",""));
    return 2;
}
function youHaveBazooka() {
    arr = $j('#scroller .listing span:last').children('img').attr('src').split('/');
    weapon = arr[arr.length-1];
    if(weapon == 'weapon_q10.png' || weapon == 'weapon_q10_special.png') return true;
    return false;
}

var weaponsFirePower = new Array;
var rank = new Array;

weaponsFirePower['weapon_q1.png'] = 20;
weaponsFirePower['weapon_q2.png'] = 40;
weaponsFirePower['weapon_q3.png'] = 60;
weaponsFirePower['weapon_q4.png'] = 80;
weaponsFirePower['weapon_q5.png'] = 100;
weaponsFirePower['weapon_q6.png'] = 120;
weaponsFirePower['weapon_q7.png'] = 200;
weaponsFirePower['weapon_q10.png'] = 100;
weaponsFirePower['weapon_q10_special.png'] = 100;

rank['recruit_0.png'] = 1;
rank['private_0.png'] = 2;
rank['private_1.png'] = 3;
rank['private_2.png'] = 4;
rank['private_3.png'] = 5;
rank['corporal_0.png'] = 6;
rank['corporal_1.png'] = 7;
rank['corporal_2.png'] = 8;
rank['corporal_3.png'] = 9;
rank['sergeant_0.png'] = 10;
rank['sergeant_1.png'] = 11;
rank['sergeant_2.png'] = 12;
rank['sergeant_3.png'] = 13;
rank['lieutenant_0.png'] = 14;
rank['lieutenant_1.png'] = 15;
rank['lieutenant_2.png'] = 16;
rank['lieutenant_3.png'] = 17;
rank['captain_0.png'] = 18;
rank['captain_1.png'] = 19;
rank['captain_2.png'] = 20;
rank['captain_3.png'] = 21;
rank['major_0.png'] = 22;
rank['major_1.png'] = 23;
rank['major_2.png'] = 24;
rank['major_3.png'] = 25;
rank['commander_0.png'] = 26;
rank['commander_1.png'] = 27;
rank['commander_2.png'] = 28;
rank['commander_3.png'] = 29;
rank['lt_colonel_0.png'] = 30;
rank['lt_colonel_1.png'] = 31;
rank['lt_colonel_2.png'] = 32;
rank['lt_colonel_3.png'] = 33;
rank['colonel_0.png'] = 34;
rank['colonel_1.png'] = 35;
rank['colonel_2.png'] = 36;
rank['colonel_3.png'] = 37;
rank['general_0.png'] = 38;
rank['general_1.png'] = 39;
rank['general_2.png'] = 40;
rank['general_3.png'] = 41;
rank['field_marshal_0.png'] = 42;
rank['field_marshal_1.png'] = 43;
rank['field_marshal_2.png'] = 44;
rank['field_marshal_3.png'] = 45;
rank['supreme_marshal_0.png'] = 46;
rank['supreme_marshal_1.png'] = 47;
rank['supreme_marshal_2.png'] = 48;
rank['supreme_marshal_3.png'] = 49;
rank['national_force_0.png'] = 50;
rank['national_force_1.png'] = 51;
rank['national_force_2.png'] = 52;
rank['national_force_3.png'] = 53;
rank['world_class_force_0.png'] = 54;
rank['world_class_force_1.png'] = 55;
rank['world_class_force_2.png'] = 56;
rank['world_class_force_3.png'] = 57;
rank['legendary_force_0.png'] = 58;
rank['legendary_force_1.png'] = 59;
rank['legendary_force_2.png'] = 60;
rank['legendary_force_3.png'] = 61;
rank['god_of_war_0.png'] = 62;
rank['god_of_war_1.png'] = 63;
rank['god_of_war_2.png'] = 64;
rank['god_of_war_3.png'] = 65;
rank['titan_0.png'] = 66;
rank['titan_1.png'] = 67;
rank['titan_2.png'] = 68;
rank['titan_3.png'] = 69;



function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {

	var rankKoef	= (militaryRank - 1)/20 + 0.3;
	var strKoef		= (strength / 10) + 40;
	var weaponKoef	= 1 + weaponPower/100;
	
	return Math.floor(rankKoef * strKoef * weaponKoef * fights * bonus);

}
function log(text) {
    unsafeWindow.console.log(text);
}
function getZonesOnMove() {
        $j('.change_residence').css('margin-top','40px');
        var countryID = $j("#country_list").val();
        $j("#region_list option").each(function() {
            var zoneId = $j(this).attr('value');
            if(zoneId == '0') return;
            var travelCost = unsafeWindow.regionsInvolved[countryID][zoneId]["travelCost"];
            $j(this).text($j(this).text() + ": " + travelCost + " " + $j('.currency_amount span').text());
        });
       
}
// Upewniamy siÄ™ czy wymagana eRepowa jQuery jest zaĹ‚adowana
function GM_wait() {

	if (typeof unsafeWindow.jQuery == 'undefined') {window.setTimeout(GM_wait, 100);}
	else {$j = unsafeWindow.jQuery;letsJQuery();}

}
GM_wait();

// Main()
function letsJQuery() {
    // remove idle timer
	$j(document).ready(function() {
		clearInterval(unsafeWindow.globalSleepInterval);
		unsafeWindow.shootLockout = 1;
	});

	if (typeof unsafeWindow == 'undefined') {unsafeWindow = window;}
        getZonesOnMove();
	if (subURL.match(/^citizen\/profile\/(\d+)$/)) {

		var str = $j('div.citizen_military:eq(0) h4').text().trim();
		str = parseFloat(str_replace(str, ',', ''));
  
		var mRank = $j($j('div.citizen_military:eq(1) h4 img').attr("src").split('/')).last()[0];
		$j('div.citizen_military:last').after(
			'<h3>Damage statistics</h3>' +
			'<div class="citizen_military">' +
			'<strong>Max hit: </strong>' +
			'<h4 style="margin-left:45px">' + dmgCalc(rank[mRank], str, 200, 1, 1) + '</h4>' +
			'<div class="stat"><small>' +
			' q0: ' + dmgCalc(rank[mRank], str, 0, 1, 1) + ' q1: ' + dmgCalc(rank[mRank], str, 20, 1, 1) +
			' q2: ' + dmgCalc(rank[mRank], str, 40, 1, 1) + '<br />q3: ' + dmgCalc(rank[mRank], str, 60, 1, 1) +
			' q4: ' + dmgCalc(rank[mRank], str, 80, 1, 1) + ' q5: ' + dmgCalc(rank[mRank], str, 100, 1, 1) +
                        ' q6: ' + dmgCalc(rank[mRank], str, 120, 1, 1) +
                        ' q7: ' + dmgCalc(rank[mRank], str, 200, 1, 1) +
			'</small></div></div>' +
			'<h3>Influence calculator' +
			'<span style="float:right">Weapon: <select id="dmgWeapon" size="1">' +
			'<option value="0">Q0</option><option value="20">Q1</option><option value="40">Q2</option><option value="60">Q3</option>' +
			'<option value="80">Q4</option><option value="100">Q5</option><option value="120" selected="selected">Q6</option><option value="200" selected="selected">Q7</option>' +
			'</select>&nbsp;&nbsp;&nbsp;&nbsp;# of fights: <input id="dmgFights" name="dmgFights" value="'+defaultMaxFights+'" size="4" maxlength="4" />' +
			'&nbsp;<button id="dmgCalc">go!</button>' +
			'</span></h3><div class="citizen_military" style="margin-bottom:2px">' +
			'<div id="dmgResults"><strong>'+defaultMaxFights+' fights: </strong>' +
			'<h4 style="margin-left:37px">' + dmgCalc(rank[mRank], str, 200, defaultMaxFights, 1) + '</h4>' +
			'<div class="stat"><small>With NE bonus: <strong><span style="font-size:12px;margin-right:15px">' +
			dmgCalc(rank[mRank], str, 200, defaultMaxFights, 1.1) + '</span></strong></small></div></div></div>'
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
/*
 * Mercenaries window - hack to display numbers under flags
 */
$j('.country_list li em').css('opacity','1');
$j('.country_list li em').css('margin-top','15px');
$j('.country_list li').css('height','30px');
$j('.country_list li em').each(function() {
    var kills = $j(this).text();
    if(kills != '0/25' && kills != '25/25' ) {
        $j(this).css('background','-moz-linear-gradient(center top , #E5FFE5 0%, #F2FFE5 100%) repeat scroll 0 0 #F2FFE5');
    }
    else if(kills == '25/25') {
        $j(this).css('background','-moz-linear-gradient(center top , #FFA3A3 0%, #FF6B6B 100%) repeat scroll 0 0 #FF6B6B');
    }
});

/**
 *end hack
 */
		return;
  
  } else if(subURL.match(/^military\/campaigns/gi)){
    
		$j('#battle_listing .bod_listing li').each(function() {
			get_counter($j(this));
			get_CO($j(this));
		});
		$j('#battle_listing .country_battles li').each(function() {
			get_counter($j(this));
			get_CO($j(this));
		});
		$j('#battle_listing .allies_battles li').each(function() {
			get_counter($j(this));
			get_CO($j(this));
		});
		$j('#battle_listing .all_battles li').each(function() {
			get_counter($j(this));
			get_CO($j(this));
		});
  }

	unsafeWindow.jQuery.fx.off = true;

	foodId = $j('div.user_health input[type=hidden]').attr('id');
	foodUrl = 'http://www.erepublik.com/'+lang+'/main/eat?format=json&_token=' + $j('#' + foodId).val() + '&jsoncallback=?';
	regionName = $j('div#pvp div#pvp_header h2').text();
        //D = (60 + ((S1-S2)/10)) × (1 + (Your FirePower-Enemys FirePower)/400) / 2
        //S1 - your strenth, S2 - enemy strength, D - damaage
        //D = (60 + ((15021-14902) / 10)) * (1 + (200 - 100)/400) / 2
        
        
	var styles =
		'<style type="text/css"> ' +
		'div.BHTable { margin-top:-100px; width: 200px; height: 85px; border: 1px solid #777; border-radius: 5px; padding: 6px; background-color: #333;z-index:99999;position:relative; } ' +
		'table.BHTable { margin: 0; padding: 2px; width: 100%; font-size: 10px; text-align: left; } ' +
		'table.BHTable tr { height: 10px; line-height: 12px; } ' +
		'#myStatBoxL, #myStatBoxR, #myOverBox { color: #fff; } ' +
		'#myStatBoxL a, #myStatBoxR a, #myOverBox a { color: #abc; } ' +
		'#multihit_start, #hospitals_get, #battlelog_clear {margin-top: 0px; margin-left: 0px; margin-bottom: 0px; position: relative;}' +
                '.pCurrentHit {color: #ffffff;text-shadow: #014471;float: left;display: block;height: 25px;font-size: 12px;line-height: 25px;padding-top: 0pt;padding-right: 5px;padding-bottom: 0pt;padding-left: 5px;background-image: url("/images/modules/pvp/influence_right.png?1321873582");background-position: right center;font-weight: bold; }' +
		'</style>';
		
	$j('head').append(styles);
        $j('.player').css('margin-top','40px');
        $j('#pvp_actions').css('bottom','5px');
	var content = $j('div#pvp_battle_area');
        /*
         * current hit hacks by hesar
         *  style="color: #ffffff;text-shadow: #014471;float: left;display: block;height: 25px;font-size: 12px;line-height: 25px;padding-top: 0pt;padding-right: 5px;padding-bottom: 0pt;padding-left: 5px;background-image: url("/images/modules/pvp/influence_right.png?1321873582");background-position: right center;font-weight: bold; background-color:blue;"
         */
        var current_damage = parseInt($j('#total_damage strong').text().replace(/,/g,''));
        var strength = $j('#fighter_skill').text().replace(",","");
        var rankString = $j($j('#rank_icon img').attr('src').split('/')).last()[0];
        var militaryRank = rank[rankString];
        //log('strength:' + strength + ', rank string:' + rankString + ', militaryRank:'+ militaryRank + ', current damage:'+ current_damage);
         
         var max_hitQ7 = dmgCalc(militaryRank, strength, 200, 1, 1);
        $j('#total_damage').prepend('<tr><td><div>'+
        '<div><b >&nbsp;</b><small>Q7 hit / done:</small>'+
        '<p id="pCurrentHitQ7" class="pCurrentHit">'+ max_hitQ7 +' / ' +  Math.round(current_damage/max_hitQ7) +'</p></div></td></tr>' +
        '<tr><td><div>');
        $j('#total_damage').css('margin-top','-60px');
        /*
         * current hit hacks end
         */
        
	content.prepend(
		'<div id="myStatBoxL" style="position: absolute; top: 360px; left: 18px; width: 200px; opacity: 0.8;"></div>' +
		'<div id="myOverBox" style="position: absolute; top: 275px; left: 275px; width: 200px; opacity: 0.8;"></div>'                
	);
	content.append(
		'<div id="myStatBoxR" style="position: absolute; top: 370px; left: 540px; width: 200px; opacity: 0.8;"></div>'
	);
            
	$j('div#enemy_defeated').before(
		'<div id="MHP" style="position:relative;width:836px;float:left;clear:both;padding:3px;margin:5px 0;font-weight:bold;color:#000;text-align:center;">' +
		'<strong>MultiHIT:&nbsp;</strong>' +
		'<input id="multihit_count" type="text" size="3" maxlength="3" value="1" /><button id="multihit_start">HIT!</button>' +
		'&nbsp;&nbsp;<input type="checkbox" id="multihit_food" name="multihit_food" checked="checked"><label for="multihit_food">&nbsp;Eat food when needed</label>' +
		'&nbsp;&nbsp;<input type="checkbox" id="multihit_bazooka" name="multihit_bazooka" checked="checked"><label for="multihit_bazooka">&nbsp;Not use Bazooka</label><br />' +
		'<input type="checkbox" id="multihit_energy" name="multihit_energy"><label for="multihit_energy">&nbsp;Use EnergyBars if no more food</label>' +
		'&nbsp;&nbsp;<input type="checkbox" id="multihit_hk" name="multihit_hk"><label for="multihit_hk">&nbsp;Use HealthKits if no more food</label><br /><br />' +
		'<div id="multihit_message" style="padding:2px;color:#ff0000"></div></div>' +
		'</div><br />' +
//                '<div id="donationware" style="vertical-align: middle;"><a href="'+ BASE_URL +'citizen/profile/1550860"><img src="http://static.erepublik.com/uploads/avatars/Citizens/2009/06/14/f93743f2326be6d93e51327365493298_55x55.jpg" style="border: 1px solid red;" />  Ask me anything or donate something :) </a></div>'+
//		'<div id="hospitals" style="clear:both"><br />' +
//		'<div id="hospitals_info" style="position:relative;width:755px;height:60px;-moz-border-radius:7px;float:left;padding:3px;font-weight:bold;color:#000;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAABBCAMAAAC5KTl3AAAAAXNSR0IArs4c6QAAADNQTFRFAAAABQYIBwgKCQoNCw0RDhEVDxIXERQZFBgeFhohGBwkGh8nHSIsHyQvISYxJCo2JSs3x4w3dgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAHdElNRQfbAgQPOSB/OWg0AAADI0lEQVRYw41X2baDIAxEtLVar/D/X3uBLCQh9NiHUq0TkiHLGK4QwpJTussacixf35TSq16VNZVlS+1T/7rKupX1A7dygMfO8r2W6792fZZfe1l3tJGL9bLLXX4tYCNXGwfiyx7v8tS3/bFKPO5fbSgvuw3aoSyv5pDFnxltqCiVHzWWA7x9KXz16sT4NUttKxNLCoAa8Wt28B4fjHw1PvbfeI5c83EIGxrPOIu/lR/KhtqfsAOe+chwZxU2HvgPTNRv9OEQtHY+Gr7ngIxfWtrgxuXYAOyKq0DJKzyLwxwv2Jj5b+7sLR+GFPmAt378412TIvPzX2YnG1SapRn/f56N7Nmw+MTxX9bGDnVVHuMgo46farSZjxn6h4qy4reMjnrxU50xTaviA/DtN+TtED/1Cok/FR8blU8FePxR1aoGNvIROGj//DX+7fBhif+FpwZ4KD6G4C0+DQ20Fsw9taHwNCC8Bgh8pNGG2j/TkBkbaOXjIifykO4J48csu97C/1b77Ah57pQM8MeZyvF/pA1AheQmpDtA1ix60EnRBydFwnyAHMbGCvkgbXjnfwYxtgcbujmnCX5d3F5Ye7Jt8D4+O+Ny5/Rtz8ReZb2gMMWbfUc+ED7gPvSI2J+yg9PvluPyQAGSIJzbEyBoQw0wPS6p/VQb3vnzycp88fiomPhUQDh8UEOkOB8LCLahj/d6io9zCaIECCF/NUBrQ+3f5deABxskIFSq0n6Q49RMzQCPLGQ2zJkx3Vv8sUsQMWaFmAImy7D3SmYqILS9eprZLbvZAHHuBUPrafhQ+y/efXM0cwH6WILM4nfyi8aXThHVK7FCbn7J0H6ggBjmFO/fq7z+EcexjQICi9yJnzqFzV8xLllA+AKsTfsu41E7O3wkPJJnAkLIh8QTB116gt+BDzX6s4HO6tc2MP3ypujTB4OD6hgb4DWTIGp/en1FStUAapySAlE0cv7X7ekV2GnAMbNsYCGh+Gj8CaEr4pe9EPuFVzJ8/nZ/LR9aA3PlQyL+bfxOTw4m3VmdTQaQ7esRRnNPs2sigCby4RzkwzR+txeCfv0HJup8UeBHV3gAAAAASUVORK5CYII=)">' +
//		'<button id="hospitals_get">get hospitals</button></div>' +
		'<fieldset id="BLOG"><legend>v1.0.1 BATTLE LOG:&nbsp;&nbsp;<button id="battlelog_clear">clear</button></legend><div id="battlelog"></div></fieldset>'
	);
           
//	if (unsafeWindow.SERVER_DATA.onlySpectator != 0) {
//
//		$j('div#MHP').hide();
//		$j('fieldset#BLOG').hide();
//
//	}

	// always show domination
	$j('#blue_domination').css({'opacity': '1', 'color': '#fff'});
	$j('#red_domination').css({'opacity': '1', 'color': '#fff'});

	// remove idle timer
	$j(document).ready(function() {
		clearInterval(unsafeWindow.globalSleepInterval);
		unsafeWindow.shootLockout = 1;
	});

	// check hospital
//	setInterval(function() {
//
//		var h = $j('#heal_btn');
//
//		if ($j('#heal_btn small').html() != '0' && !h.hasClass('disabled') && unsafeWindow.SERVER_DATA.onlySpectator == 0) {
//
//			bLog('Getting EXTRA wellness from hospital...');
//			unsafeWindow.useHospital();
//
//		}
//
//	}, 250);


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
			setTimeout(function() {top.location.href = document.location.href;}, 1000);
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
				setTimeout(function() {top.location.href = document.location.href;}, 2000);
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

		var url = "/"+lang+"/military/change-weapon";
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

		if (unsafeWindow.globalStop) {return;}

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

		$j.getJSON("/"+lang+"/military/battle-stats/"+unsafeWindow.SERVER_DATA.battleId , function(data) {
		});
	
	});
        
	$j("body").ajaxSuccess(function(e, res, opt) {
                var top5LeftSide = 0;
                var top5RightSide = 0;
                var top5LeftSideKills = 0;
                var top5RightSideKills = 0;
                var top5CHLeftSide =0;
                var top5CHLeftSideKills =0;
		if (opt.url.indexOf('/battle-stats/') > -1 && unsafeWindow.SERVER_DATA.onlySpectator != 1) {

			var att = unsafeWindow.SERVER_DATA.invaderId;
			var def = unsafeWindow.SERVER_DATA.defenderId;

			if (unsafeWindow.SERVER_DATA.mustInvert) {

				att = unsafeWindow.SERVER_DATA.defenderId;
				def = unsafeWindow.SERVER_DATA.invaderId;
				
			}
                        //var bh = $j.parseJSON(res.responseText);
			var zone = unsafeWindow.SERVER_DATA.zoneId;
                        var countryId = unsafeWindow.SERVER_DATA.countryId;
                        
                        var division = unsafeWindow.SERVER_DATA.division;
			var bh = eval("(" + res.responseText + ")");
                        var history = bh['stats']['overall'][0][countryId];
                        
			var top5HIST = '';

			for ( var i = 0; i < history.length; i++ ) {
			
				top5HIST = top5HIST+'<tr><td><a target="_blank" href="http://www.erepublik.com/'+lang+'/citizen/profile/'+bh.fightersData[history[i].citizen_id].id+'">'+bh.fightersData[history[i].citizen_id].name+'</a></td><td>'+history[i].kills+'</td><td align=right><strong>'+number_format (history[i].damage, 0, '', ' ')+'</strong></td></tr>';
                                top5CHLeftSide += parseInt(history[i].damage,10);
                                top5CHLeftSideKills += parseInt(history[i].kills,10)
			}
                        top5HIST = top5HIST+'<tr style="color:yellow;"><td>Suma influ TOP5:</td><td>'+top5CHLeftSideKills+'</td><td align=right>' + number_format (top5CHLeftSide, 0, '', ' ') + '</td></tr>';
		  histStats(top5HIST);

			var top5ABH = '';
			var top5DBH = '';
			var aBH = '';
			var dBH = '';
			if (typeof bh['stats']['current'] == 'undefined') {return;}
			if (typeof bh['stats']['current'][zone] == 'undefined') {return;}
			
			if (typeof bh['stats']['current'][zone][division][att] != 'undefined') {
	
				var attID = bh['stats']['current'][zone][division][att][0];
			
				if ( attID.citizen_id > 0 )
					aBH = '<a target="_blank" href="http://www.erepublik.com/'+lang+'/citizen/profile/'+bh.fightersData[attID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[attID.citizen_id].avatar+'"><small>'+bh.fightersData[attID.citizen_id].name+'</small><strong>'+attID.damage+'</strong></a>';

				for ( var i = 0; i < bh['stats']['current'][zone][division][att].length; i++ ) {

					top5ABH = top5ABH+'<tr><td><a target="_blank" href="http://www.erepublik.com/'+lang+'/citizen/profile/'+bh.fightersData[bh['stats']['current'][zone][division][att][i].citizen_id].id+'">'+bh.fightersData[bh['stats']['current'][zone][division][att][i].citizen_id].name+'</a></td><td>'+bh['stats']['current'][zone][division][att][i].kills+'</td><td align=right><strong>'+number_format (bh['stats']['current'][zone][division][att][i].damage, 0, '', ' ')+'</strong></td></tr>';
                                        top5LeftSide += parseInt(bh['stats']['current'][zone][division][att][i].damage,10);
                                        top5LeftSideKills += parseInt(bh['stats']['current'][zone][division][att][i].kills,10);

				}
                                
			}
                        top5ABH = top5ABH+'<tr style="color:yellow;"><td>Suma influ TOP5:</td><td>'+top5LeftSideKills+'</td><td align=right>' + number_format (top5LeftSide, 0, '', ' ') + '</td></tr>';
		  if (typeof bh['stats']['current'][zone][division][def] != 'undefined') {

				var defID = bh['stats']['current'][zone][division][def][0];

				if ( defID.citizen_id > 0 )
					dBH = '<a target="_blank" href="http://www.erepublik.com/'+lang+'/citizen/profile/'+bh.fightersData[defID.citizen_id].id+'"><div class="crown"></div><img width="25" height="25" alt="" src="'+bh.fightersData[defID.citizen_id].avatar+'"><small>'+bh.fightersData[defID.citizen_id].name+'</small><strong>'+defID.damage+'</strong></a>';

				for ( i = 0; i < bh['stats']['current'][zone][division][def].length; i++ ) {

					top5DBH = top5DBH+'<tr><td><a target="_blank" href="http://www.erepublik.com/'+lang+'/citizen/profile/'+bh.fightersData[bh['stats']['current'][zone][division][def][i].citizen_id].id+'">'+bh.fightersData[bh['stats']['current'][zone][division][def][i].citizen_id].name+'</a></td><td>'+bh['stats']['current'][zone][division][def][i].kills+'</td><td align=right><strong>'+number_format (bh['stats']['current'][zone][division][def][i].damage, 0, '', ' ')+'</strong></td></tr>';
                                        top5RightSide +=  parseInt(bh['stats']['current'][zone][division][def][i].damage,10);
                                        top5RightSideKills +=  parseInt(bh['stats']['current'][zone][division][def][i].kills,10);
	     	}

			}
                        top5DBH = top5DBH+'<tr style="color:yellow;"><td>Suma influ TOP5:</td><td>'+top5RightSideKills+'</td><td align=right>' + number_format (top5RightSide, 0, '', ' ') + '</td></tr>';
			setLink2BH(aBH, dBH);
			
			if (unsafeWindow.SERVER_DATA.mustInvert == false)
				bhStats(top5DBH, top5ABH);
			else
				bhStats(top5ABH, top5DBH);
                        pushGuerillaFightBox();
                        pushBoosterActivation();
  	}

	});
}
function get_counter(li)
	{
		var battleId = li.attr('id').split('-')[1];
		var url = '/en/military/battlefield/'+battleId;
		$j.ajax({
			url: url,
			dataType: 'html',
			success: function(data) {
				var tank_element = li.find('.tank_img');
				var a_style = 'background: none; margin: 14px 0 0 0;';
				var span_style = 'border-radius: 5px 5px 5px 5px;';
				
				try{
					var counter = data.split(/zoneElapsedTime/)[1].split(/"/)[1];
				}
				catch(e){
					tank_element.before('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 5px;">\
						<span style="'+span_style+'">Choose side</span>\
					</a>');
					tank_element.remove();
					return;
				}
				
				// Campain points
				var leftCountryName = li.find('img.side_flags').eq(0).attr('title');

				var leftPoints = $j(data).find('#left_campaign_points strong').html();
				var rightPoints = $j(data).find('#right_campaign_points strong').html();
				var leftCountryNamePoints = $j(data).find('.country h3').eq(0).html().replace('Resistance Force of ','').trim();
				
				if(leftCountryName != leftCountryNamePoints)
				{
					var tmp = leftPoints;
					leftPoints = rightPoints;
					rightPoints = tmp;
				}
				tank_element.before('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 0 0 10px;">\
						<span style="'+span_style+'">'+leftPoints+'</span>\
					</a>');
				tank_element.after('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 10px 0 0;">\
						<span style="'+span_style+'">'+rightPoints+'</span>\
					</a>');
				// Campain points END
				
				tank_element.after('<a href="'+url+'" class="county" style="'+a_style+' padding: 0 5px;">\
						<span style="'+span_style+'">'+counter+'</span>\
					</a>');
				tank_element.remove();
			}
		});
	}
function get_CO(li){
    var battleId = li.attr('id').split('-')[1];
    var url = '/en/military/battle-stats/'+battleId +'/4'; //http://www.erepublik.com/en/military/battle-status/43878/1
    $j.ajax({
			url: url,
			dataType: 'json',
			success: function(data) { 
                            var co_count = data.campaigns.length;
                            var co_content = '';
                            if(co_count>0)
                                {
                                    for(var i = 0;i<co_count;i++){
                                        var budget,division,reward,threshold;
                                        budget = data.campaigns[i].budget;
                                        division = data.campaigns[i].division;
                                        reward = data.campaigns[i].reward;
                                        threshold = data.campaigns[i].threshold;
                                        co_content += '<p>division: ' + division + '; reward: '+reward+'cc; treshold: ' + threshold+'%; budget: '+ budget+'cc;</p><br />';
                                        
                                    }
                                    $j(li).tipsy({
                                            gravity: 's',
                                            html: true,
                                            fallback: co_content
                                        });
                                }
                        }
    });

}        
function pushGuerillaFightBox(){
    //$j("#join_pvp").css('right','600px').css("bottom","-10px");
    $j(".listing").css("top","-20px");
    $j(".weapon").css("top","-10px");
    $j('#hit_explosion').css('display','none');
    $j('#final_explosion').css('display','none');
}
function pushBoosterActivation() {
    $j("#booster_activation").css("left","10px").css("bottom","8px");
}
function number_format (number, decimals, dec_point, thousands_sep) {
  // http://kevin.vanzonneveld.net
  // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +     bugfix by: Michael White (http://getsprink.com)
  // +     bugfix by: Benjamin Lupton
  // +     bugfix by: Allan Jensen (http://www.winternet.no)
  // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
  // +     bugfix by: Howard Yeend
  // +    revised by: Luke Smith (http://lucassmith.name)
  // +     bugfix by: Diogo Resende
  // +     bugfix by: Rival
  // +      input by: Kheang Hok Chin (http://www.distantia.ca/)
  // +   improved by: davook
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Jay Klehr
  // +   improved by: Brett Zamir (http://brett-zamir.me)
  // +      input by: Amir Habibi (http://www.residence-mixte.com/)
  // +     bugfix by: Brett Zamir (http://brett-zamir.me)
  // +   improved by: Theriault
  // +      input by: Amirouche
  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // *     example 1: number_format(1234.56);
  // *     returns 1: '1,235'
  // *     example 2: number_format(1234.56, 2, ',', ' ');
  // *     returns 2: '1 234,56'
  // *     example 3: number_format(1234.5678, 2, '.', '');
  // *     returns 3: '1234.57'
  // *     example 4: number_format(67, 2, ',', '.');
  // *     returns 4: '67,00'
  // *     example 5: number_format(1000);
  // *     returns 5: '1,000'
  // *     example 6: number_format(67.311, 2);
  // *     returns 6: '67.31'
  // *     example 7: number_format(1000.55, 1);
  // *     returns 7: '1,000.6'
  // *     example 8: number_format(67000, 5, ',', '.');
  // *     returns 8: '67.000,00000'
  // *     example 9: number_format(0.9, 0);
  // *     returns 9: '1'
  // *    example 10: number_format('1.20', 2);
  // *    returns 10: '1.20'
  // *    example 11: number_format('1.20', 4);
  // *    returns 11: '1.2000'
  // *    example 12: number_format('1.2000', 3);
  // *    returns 12: '1.200'
  // *    example 13: number_format('1 000,50', 2, '.', ' ');
  // *    returns 13: '100 050.00'
  // Strip all characters but numerical ones.
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
    s = '',
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

