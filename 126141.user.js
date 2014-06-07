// ==UserScript==
// @name           eRepublik indonesia battle submit
// @version        1.1.8.0
// @author         SDF_R98 editted mark_hoopus
// @namespace      mark_hoopus
// @include        http://www.erepublik.com/*/military/battlefield/*
// ==/UserScript==
//---------------------------------------------------------------------------
// reference http://userscripts.org/scripts/show/100931
//
// v1.1.8 changeLog (24 February 2012)
// - update code
//
// v1.1.7 changeLog (24 February 2012)
// - change the controller name from aberi to indonesia (handray request)
// 
// v1.1.6 changeLog (24 February 2012)
// - enhanced function getMilitaryUnit
// - Fixed function getUpdate
//
// v1.1.5 changeLog
// add function getMilitaryUnit to add user military information
//===========================================================================

var rank = {
	Recruit: 1,
	Private: 2,
	'Private *': 3,
	'Private **': 4,
	'Private ***': 5,
	Corporal: 6,
	'Corporal *': 7,
	'Corporal **': 8,
	'Corporal ***': 9,
	Sergeant: 10,
	'Sergeant *': 11,
	'Sergeant **': 12,
	'Sergeant ***': 13,
	Lieutenant: 14,
	'Lieutenant *': 15,
	'Lieutenant **': 16,
	'Lieutenant ***': 17,
	Captain: 18,
	'Captain *': 19,
	'Captain **': 20,
	'Captain ***': 21,
	Major: 22,
	'Major *': 23,
	'Major **': 24,
	'Major ***': 25,
	Commander: 26,
	'Commander *': 27,
	'Commander **': 28,
	'Commander ***': 29,
	'Lt Colonel': 30,
	'Lt Colonel *': 31,
	'Lt Colonel **': 32,
	'Lt Colonel ***': 33,
	Colonel: 34,
	'Colonel *': 35,
	'Colonel **': 36,
	'Colonel ***': 37,
	General: 38,
	'General *': 39,
	'General **': 40,
	'General ***': 41,
	'Field Marshal': 42,
	'Field Marshal *': 43,
	'Field Marshal **': 44,
	'Field Marshal ***': 45,
	'Supreme Marshal': 46,
	'Supreme Marshal *': 47,
	'Supreme Marshal **': 48,
	'Supreme Marshal ***': 49,
	'National Force': 50,
	'National Force *': 51,
	'National Force **': 52,
	'National Force ***': 53,
	'World Class Force': 54,
	'World Class Force *': 55,
	'World Class Force **': 56,
	'World Class Force ***': 57,
	'Legendary Force': 58,
	'Legendary Force *': 59,
	'Legendary Force **': 60,
	'Legendary Force ***': 61,
	'God of War': 62,
	'God of War *': 63,
	'God of War **': 64,
	'God of War ***': 65
};
var ccode = {
	Argentina: 'ARG',
	Venezuela: 'VEN',
	'United Kingdom': 'UK',
	Switzerland: 'CH',
	Netherlands: 'NL',
	'Czech Republic': 'Czech',
	'South Korea': 'SK',
	Indonesia: 'IND',
	Australia: 'AUS',
	'South Africa': 'ZA',
	'Republic of Moldova': 'Moldova',
	Philippines: 'PH',
	Singapore: 'SGP',
	'Bosnia and Herzegovina': 'BIH',
	Lithuania: 'LT',
	'North Korea': 'NK',
	'Republic of Macedonia (FYROM)': 'MKD',
	Montenegro: 'MNE',
	'Republic of China (Taiwan)': 'ROC',
	'New Zealand': 'NZ',
	'Saudi Arabia': 'SA',
	'United Arab Emirates': 'UAE'
};
var VERSION="1.1.8.0";
var MILITARYUNIT = ""; 
var MILITARYLINK = "";

function dmgCalc(militaryRank, strength, weaponPower, fights, bonus) {
	var damage = Math.floor((militaryRank + 5) * (strength + 400) * 0.005 * (1 + weaponPower * 0.01));
	return Math.floor(damage * bonus) * fights;
}

function str_replace(haystack, needle, replacement) {
	var temp = haystack.split(needle);
	return temp.join(replacement);
}

function getMilitaryUnit(){
    var citizenLink = $j('#financier').attr('href');
	GM_xmlhttpRequest({
		method:"GET",
                url: "http://www.erepublik.com" + citizenLink,
		onload:function(a){
		MILITARYUNIT = $j(a.responseText).find('a[href*="/group-show/"] span').html();
                MILITARYLINK = $j(a.responseText).find('.one_newspaper a').attr('href');
        }
	});
}

function getVersion(){
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://userscripts.org/scripts/show/126141",
		onload:function(a){
			var a=$j(a.responseText).find("#summary").html().split("<b>Version:</b>")[1].replace(/^\s+|\s+$/g,"").split("\n")[0],
			a=a.substr(0,a.lastIndexOf(".")),
			b=VERSION.substr(0,VERSION.lastIndexOf("."));
			b.split(".")[2]<a.split(".")[2]?$j('#tstats_table').html('<tr><td style="text-align:center;font-weight:bold;"><a title="Update available! New version: '+a+'" href="http://userscripts.org/scripts/show/126141" target="_blank" style="color: #ff0000; font-weight: bold;"> New Update '+a+"</a></td></tr>"):
			b.split(".")[1]<a.split(".")[1]?$j('#tstats_table').html('<tr><td style="text-align:center;font-weight:bold;"><a title="Update available! New version: '+a+'" href="http://userscripts.org/scripts/show/126141" target="_blank" style="color: #ff0000; font-weight: bold;"> New Update '+a+"</a></td></tr>"):
			b.split(".")[0]<a.split(".")[0]&&$j('#tstats_table').html('<tr><td style="text-align:center;font-weight:bold;"><a title="Update available! New version: '+a+'" href="http://userscripts.org/scripts/show/126141" target="_blank" style="color: #ff0000; font-weight: bold;"> New Update '+a+"</a></td></tr>")
		}
	})
}

function dmgMilitary(bonus) {
	var str,
		mRank = $j('#rank_icon').attr('title');
	str = $j('#fighter_skill').text().trim();
	str = parseFloat(str_replace(str, ',', ''));
	if (typeof mRank == 'undefined' || mRank.length == 0) {
		mRank = $j('#rank_icon').attr('original-title').substr(15).trim();
	} else {
		mRank = mRank.substr(15).trim();
	}
	return dmgCalc(rank[mRank], str, 120, 1, bonus);
}

function sortStats(a, b) {
	var ta = a.split('_'),
		tb = b.split('_');
	if (parseInt(ta[1], 10) == parseInt(tb[1], 10)) {
		return parseInt(ta[2], 10) - parseInt(tb[2], 10);
	} else {
		return parseInt(ta[1], 10) - parseInt(tb[1], 10);
	}
}

function getKey() {
	var i, len, tmp,
		key = [];
	for (i = 0, len = localStorage.length; i < len; i++) {
		tmp = localStorage.key(i);
		if (tmp.charAt(0) != '@') {
			continue;
		}
		key.push(tmp);
	}
	key.sort(sortStats);
	return key;
}

function showStats() {
	var tmp, value, i, len,
		stats = [],
		stats_table = $j('#stats_table'),
		tstats = '',
		cmcInf = 0,
		cmcFight = 0,
		eliteInf = 0,
		eliteFight = 0,
		key = getKey();
	stats.push('<tr><th>Battle</th><th>Influence</th><th></th></tr>');
	for (i = 0, len = key.length; i < len; i++) {
		value = localStorage.getItem(key[i]).split('_');
		tmp = key[i].split('_');
		if (tmp[0].length == 1) {
			cmcFight += parseInt(value[0], 10);
			cmcInf += parseInt(value[1], 10);
			stats.push('<tr><td>' + tmp[1] +'</td><td>' + value[1] + '</td><td><a href="javascript:;" class="delete_stat" id="' + key[i] + '">X</a></td></tr>');
		} else {
			eliteFight += parseInt(value[0], 10);
			eliteInf += parseInt(value[1], 10);
			stats.push('<tr style="background-color:LightGreen;"><td>' + tmp[1] + '</td><td>' + value[1] + '</td><td><a href="javascript:;" class="delete_stat" id="' + key[i] + '">X</a></td></tr>');
		}
	}
	if (stats.length == 1) {
		stats = '';
	} else {
		stats = stats.join('');
	}
	stats_table.html(stats);
	stats_table.find('th').css({'border': '1px solid gray', 'padding': '2px'});
	stats_table.find('td').css({'border': '1px solid gray', 'padding': '1px'});
	if (cmcInf > 0) {
		tstats += '<tr><td>Cz Influence</td><td>' + cmcInf + '</td></tr><tr><td>Cz fight</td><td>' + cmcFight + '</td></tr>';
	}
	if (eliteInf > 0) {
		tstats += '<tr><td>MU Influence</td><td>' + eliteInf + '</td></tr><tr><td>MU fight</td><td>' + eliteFight + '</td></tr>';
	}
	if (cmcInf == 0 && eliteInf == 0) {
		tstats = '<tr><td style="text-align:center;font-weight:bold;"><a href="http://userscripts.org/scripts/show/126141" target="_blank">battle submit 1.1.8.0</a></td></tr>';
	}
	$j('#tstats_table').html(tstats);
	stats_table.find('tr:gt(0)').click(function () {
		var key = $j(this).find('a.delete_stat').attr('id'),
			value = localStorage.getItem(key),
			tmp = key.split('_');
		localStorage.removeItem(key);
		if (tmp[0].length == 1) {
			localStorage.setItem('@' + key, value);
		} else {
			key = key.substr(1);
			localStorage.setItem(key, value);
		}
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
	stats_table.find('a.delete_stat').click(function () {
		localStorage.removeItem($j(this).attr('id'));
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
}

function add_fight() {
	var battleId = location.href.substr(49),
		leftCrowns = $j('#popup_left_crowns').attr('crowns'),
		rightCrowns = $j('#popup_right_crowns').attr('crowns'),
		zoneId = parseInt(leftCrowns, 10) + parseInt(rightCrowns, 10) + 1,
		leftSide = $j('#pvp_header').find('h3:first').html(),
		totalDmg = parseInt($j('#total_damage').find('strong').text().replace(/\s/g, ''), 10),
		dmg = dmgMilitary(1),
		neDmg = dmgMilitary(1.1),
		initFight,
		scriptNode = document.createElement('script'),
		regionSplit = $j('#pvp_header').find('h2').text().trim().split(" "),
		region = "",
		text = [];
	if (leftSide.indexOf('Resistance') != -1) {
		leftSide = leftSide.substr(20);
	}
	
	for(var i = 0; i<regionSplit.length; i++)
	{
		if(regionSplit[i] != 'undefined')
		{
			region	+= regionSplit[i];
		}
	}
	
	if (leftSide.length > 8) {
		leftSide = ccode[leftSide];
	}
	if (localStorage.getItem('ne') != null && localStorage.getItem('ne') == battleId) {
		initFight = Math.round(totalDmg / neDmg);
	} else if (totalDmg % dmg != 0 && totalDmg % neDmg == 0) {
		initFight = Math.round(totalDmg / neDmg);
	} else {
		initFight = Math.round(totalDmg / dmg);
	}
	$j('#pvp_battle_area').find('table.damage_aligner').find('td').after(
		'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><div id="total_f" style="width:auto;height:25px;display:block;cursor:default;"><small style="font-size:11px;color:#fff;float:left;text-shadow:#333 0px 1px 1px;display:block;height:25px;opacity:0.7;-moz-opacity:0.7;-ms-fiter:' + "'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)'" + ';filter:alpha(opacity=70);line-height:25px;font-weight:bold;padding:0 5px;background-image:url(' + "'/images/modules/pvp/influence_left.png?1321873582'" + ');background-position:left;">' + battleId + '_' + region + '_' + leftSide + '</small><strong style="color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(' + "'/images/modules/pvp/influence_right.png?1321873582'" + ');background-position:right;">' + initFight + '</strong></div></td>'
	);
	function localMain() {
		//remove ScrollToFixed
		$j(document).ready(function () {
			$j(window).load(function () {
				var tmp = $j('#large_sidebar').next();
				if (typeof tmp.attr('id') == 'undefined' || !tmp.attr('id').length) {
					tmp.remove();
				}
				$j('#large_sidebar').css({'width' : '', 'position' : '', 'left' : '', 'top' : ''});
				$j(window).unbind('resize');
				$j(window).unbind('scroll');
			});
		});
		//update totalDmg
		$j('#total_f').ajaxSuccess(function (e, xhr, settings) {
			if (settings.url.indexOf('fight') == -1) {
				return;
			}
			var fight = parseInt($j(this).find('strong').html(), 10),
				key,
				response = JSON.parse(xhr.responseText),
				user = response.user;
			if (response.error) {
				return;
			}
			if (response.message === 'ENEMY_KILLED') {
				totalDmg += user.givenDamage;
				if (response.oldEnemy.isNatural === true) {
					localStorage.setItem('ne', location.href.substr(49));
					totalDmg += Math.floor(user.givenDamage * 0.1);
					fight = Math.round(totalDmg / dmgMilitary(1.1));
				} else {
					fight = Math.round(totalDmg / dmgMilitary(1));
				}
				$j(this).find('strong').html(fight);
				key = $j(this).find('small').text().trim().split('_', 3);
				key = '@_' + key[0] + '_' + key[1] + '_' + key[2];
				if (localStorage.getItem(key) == null) {
					key = '@' + key;
					if (localStorage.getItem(key) == null) {
						return;
					}
				}
				localStorage.setItem(key, fight + '_' + totalDmg);
				showStats();
			}
		});
	}
	text.push('(function () {');
	text.push("var rank = {Recruit: 1, Private: 2, 'Private *': 3, 'Private **': 4, 'Private ***': 5, Corporal: 6, 'Corporal *': 7, 'Corporal **': 8, 'Corporal ***': 9, Sergeant: 10, 'Sergeant *': 11, 'Sergeant **': 12, 'Sergeant ***': 13, Lieutenant: 14, 'Lieutenant *': 15, 'Lieutenant **': 16, 'Lieutenant ***': 17, Captain: 18, 'Captain *': 19, 'Captain **': 20, 'Captain ***': 21, Major: 22, 'Major *': 23, 'Major **': 24, 'Major ***': 25, Commander: 26, 'Commander *': 27, 'Commander **': 28, 'Commander ***': 29, 'Lt Colonel': 30, 'Lt Colonel *': 31, 'Lt Colonel **': 32, 'Lt Colonel ***': 33, Colonel: 34, 'Colonel *': 35, 'Colonel **': 36, 'Colonel ***': 37, General: 38, 'General *': 39, 'General **': 40, 'General ***': 41, 'Field Marshal': 42, 'Field Marshal *': 43, 'Field Marshal **': 44, 'Field Marshal ***': 45, 'Supreme Marshal': 46, 'Supreme Marshal *': 47, 'Supreme Marshal **': 48, 'Supreme Marshal ***': 49, 'National Force': 50, 'National Force *': 51, 'National Force **': 52, 'National Force ***': 53, 'World Class Force': 54, 'World Class Force *': 55, 'World Class Force **': 56, 'World Class Force ***': 57, 'Legendary Force': 58, 'Legendary Force *': 59, 'Legendary Force **': 60, 'Legendary Force ***': 61, 'God of War': 62, 'God of War *': 63, 'God of War **': 64, 'God of War ***': 65};");
	text.push('var totalDmg = ' + totalDmg + ';');
	text.push(str_replace.toString());
	text.push(dmgCalc.toString());
	text.push(dmgMilitary.toString());
	text.push(sortStats.toString());
	text.push(getKey.toString());
	text.push(showStats.toString());
	text.push(localMain.toString());
	text.push('localMain();');
	text.push('})();');
	scriptNode.textContent = text.join('\n');
	document.head.appendChild(scriptNode);
}

function add_stats() {
	//$j('#experienceTooltip').before(
    $j('#limit_health_pop').before(
		'<div style="float:left;width:153px;margin-bottom:7px;"><a href="javascript:;" id="stats_btn" style="margin-top:10px;float:left;"><strong>Stats</strong></a><a href="javascript:;" id="addstats_btn" style="margin-top:10px;float:right;"><strong>Add</strong></a><a href="http://testing-24.apphb.com/indonesia" target="_blank" id="help_btn" style="margin-top:10px;float:right;display:none;"><strong>Help</strong></a><br/><br/><div id="my_stats"><table id="stats_table" style="width:100%;"></table><hr/><table id="tstats_table" style="width:100%;"></table><hr/><a href="javascript:;" id="submit_btn" style="float:left;"><strong>Submit</strong></a><a href="javascript:;" id="gen_btn" style="float:right;"><strong>Report</strong></a><br/><div id="stats_report" style="width:100%;"></div><textarea id="gen_txt" style="width:100%;display:none;"></textarea><a href="javascript:;" id="clear_btn" style="float:left;display:none;"><strong>Clear</strong></a></div></div>'
	);
	var key, myInf, fight;
	key = $j('#total_f').find('small').text().trim().split('_', 3);
	key = '@_' + key[0] + '_' + key[1] + '_' + key[2];
	//alert(key);
	if (localStorage.getItem(key) != null) {
		myInf = $j('#total_damage').find('strong').text().replace(/\s/g, '');
		fight = $j('#total_f').find('strong').text().trim();
		localStorage.setItem(key, fight + '_' + myInf);
	}
	key = '@' + key;
	if (localStorage.getItem(key) != null) {
		myInf = $j('#total_damage').find('strong').text().replace(/\s/g, '');
		fight = $j('#total_f').find('strong').text().trim();
		localStorage.setItem(key, fight + '_' + myInf);
	}
	showStats();

	$j('#stats_btn').click(function () {
		$j('#my_stats').toggle();
		$j('#addstats_btn').toggle();
		$j('#help_btn').toggle();
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
	$j('#addstats_btn').click(function () {
		var myInf = $j('#total_damage').find('strong').text().replace(/\s/g, ''),
			fight = $j('#total_f').find('strong').text().trim(),
			key;
		key = $j('#total_f').find('small').text().trim().split("_", 3);
		key = '@_' + key[0] + '_' + key[1] + '_' + key[2];
		if (localStorage.getItem(key) != null) {
			localStorage.setItem(key, fight + "_" + myInf);
			showStats();
			return;
		}
		if (localStorage.getItem('@' + key) != null) {
			localStorage.setItem('@' + key, fight + "_" + myInf);
		} else { //add @_battleId_zondId
			localStorage.setItem(key, fight + "_" + myInf);
		}
		showStats();
	});
	$j('#gen_btn').click(function () {
		showStats();
		if ($j('#stats_report').html() != '') {
			$j('#clear_btn').css('display', 'none');
			$j('#gen_txt').css('display', 'none').val('');
			$j('#stats_report').html('');
			return;
		}
		var tmp, value, i, len, stats,
			cmcs = [],
			elites = [],
			key = getKey();
		for (i = 0, len = key.length; i < len; i++) {
			value = localStorage.getItem(key[i]).split('_');
			tmp = key[i].split('_');
			if (tmp[0].length == 1) {
				cmcs.push(tmp[1] + '_'  + tmp[2] + '_' + value[0]);
			} else {
				elites.push(tmp[1] + '_'  + tmp[2] + '_' + value[0]);
			}
		}
		if (cmcs.length == 0 && elites.length == 0) {
			$j('#stats_report').html('');
			$j('#gen_txt').css('display', 'none');
			return;
		}
		stats = '';
		if (cmcs.length > 0) {
			stats += 'Cz: [' + cmcs.join('] [') + ']<br/>';
		}
		if (elites.length > 0) {
			stats += 'MU: [' + elites.join('] [') + ']';
		}
		$j('#stats_report').html(stats);
		$j('#gen_txt').css('display', 'block');
	});
	$j('#clear_btn').click(function () {
		var r, key, i, len;
		r = confirm('Clear all the statistic?');
		if (r == true) {
			key = getKey();
			for (i = 0, len = key.length; i < len; i++) {
				localStorage.removeItem(key[i]);
			}
			$j('#clear_btn').css('display', 'none');
			$j('#stats_report').html('');
			showStats();
		}
	});
	$j('#submit_btn').click(function () {
		var r, cmcs, elites, cmcInf, cmcFight, eliteInf, tmp, value, key, i, len, comment, cmsg, emsg, citizenId, others, eFight;
		r = confirm('Submit to Indonesia Goverment?');
		if (r == true) {
			showStats();
			cmcs = [];
			elites = [];
			cmcInf = 0;
			cmcFight = 0;
			eliteInf = 0;
                        eFight = 0;
			key = getKey();
			for (i = 0, len = key.length; i < len; i++) {
				value = localStorage.getItem(key[i]).split('_');
				tmp = key[i].split('_');
				//alert(tmp);
				if (tmp[0].length == 1) {
					cmcFight += parseInt(value[0], 10);
					cmcInf += parseInt(value[1], 10);
					cmcs.push(tmp[1] + '_'  + tmp[2] + '_' + tmp[3] + '_' + value[0]);
				} else {
                                        eFight += parseInt(value[0], 10);
					eliteInf += parseInt(value[1], 10);
					elites.push(tmp[1] + '_'  + tmp[2] + '_' + tmp[3] + '_' + value[0]);
				}
			}
			if (cmcs.length == 0 && elites.length == 0) {
				$j('#clear_btn').css('display', 'none');
				$j('#gen_txt').css('display', 'none');
				$j('#stats_report').html('');
				return;
			}
			$j('#stats_report').html('30% - Wait a mo...');
			var battleId = location.href.substr(49);
            citizenId = $j('#financier').attr('href');
            var citizenName = $j('.user_info').find('a[href*="'+citizenId+'"]').html();        
			others = '';
			if ($j('#gen_txt').val() != '') {
				others = ' ' + $j('#gen_txt').val();
			}
			$j('#clear_btn').css('display', 'block');
			$j('#gen_txt').css('display', 'none');

			if (cmcs.length > 0 && elites.length > 0) {
				var totalFight = cmcFight + eFight;
                var totalInf = cmcInf + eliteInf;
				var comment = 'History [' + cmcs.join('] [') + ']' + others;
                var ecomment = '[' + elites.join('] [') + ']' + others;
				var cmsg = '?battleid='+battleId + '&citizenid=' + citizenId + '&cmcfight=' + totalFight + '&cmcInf=' + totalInf + '&comment=' + comment + ' ' +ecomment +'&militaryUnit='+ MILITARYUNIT + '&militaryLink=' + MILITARYLINK + '&citizenName=' + citizenName;
				setTimeout(function () {
					GM_xmlhttpRequest({
						method:	'GET',
						url: 'http://testing-24.apphb.com/Indonesia/SubmitDamage' + cmsg,
						onload:	function (response) {
							var data = JSON.stringify(response.responseText);
							if (data = 'success') {
                                                                $j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://testing-24.apphb.com/Indonesia" target="_blank">http://testing-24.apphb.com/Indonesia</a>');
							} else {
								$j('#stats_report').html('<span style="color:red;">' + data.message + ' Try to submit again </span>');
							}
						}
					});
				}, 0);
				return;
			}
			if (cmcs.length > 0) {
				var comment = 'History: [' + cmcs.join('] [') + ']' + others;
				var cmsg = '?battleid='+battleId + '&citizenid=' + citizenId + '&cmcfight=' + cmcFight + '&cmcInf=' + cmcInf + '&comment=' + comment + '&militaryUnit='+ MILITARYUNIT + '&militaryLink=' + MILITARYLINK + '&citizenName=' + citizenName;
                setTimeout(function () {
					GM_xmlhttpRequest({
						method:	'GET',
						url: 'http://testing-24.apphb.com/Indonesia/SubmitDamage' + cmsg,
						onload:	function (response) {
							var data = JSON.stringify(response.responseText);
							if (data = 'success') {
								$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://testing-24.apphb.com/Indonesia" target="_blank">http://testing-24.apphb.com/Indonesia</a>');
							} else {
								$j('#stats_report').html('<span style="color:red;">' + data.message + ' Try to submit again </span>');
							}
						}
					});
				}, 0);
			}
			if (elites.length > 0) {
				var comment = 'History: [' + elites.join('] [') + ']' + others;
				var emsg = '?battleid=' + battleId +'&citizenid=' + citizenId  +'&cmcfight=' + eFight +  '&cmcInf=' + eliteInf + '&comment=' + comment + '&militaryUnit='+ MILITARYUNIT + '&militaryLink=' + MILITARYLINK + '&citizenName=' + citizenName;;
				setTimeout(function () {
					GM_xmlhttpRequest({
						method:	'GET',
						url: 'http://testing-24.apphb.com/Indonesia/SubmitDamage' + emsg,
						onload:	function (response) {
							var data = JSON.stringify(response.responseText);
							if (data = 'success') {
								$j('#stats_report').html('<span style="color:green;">Submitted. <br/>Check: </span><a href="http://testing-24.apphb.com/Indonesia" target="_blank">http://testing-24.apphb.com/Indonesia</a>');
							} else {
								$j('#stats_report').html('<span style="color:red;">' + data.message + ' Try to submit again </span>');
							}
						}
					});
				}, 0);
			}
		}
	});
}

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$j = unsafeWindow.jQuery;
		if (typeof unsafeWindow == 'undefined') {
			unsafeWindow = window;
		}
		getVersion();
                getMilitaryUnit();
		add_fight();
		add_stats();
	}
}

GM_wait();