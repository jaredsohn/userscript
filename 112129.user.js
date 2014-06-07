// ==UserScript==
// @name           eRepublik battle pupil
// @version        v1.4.5
// @author         SDF_R98
// @namespace      SDF_R98
// @include        http://www.erepublik.com/*/military/battlefield/*
// @grant          GM_xmlhttpRequest
// ==/UserScript==
//---------------------------------------------------------------------------
// reference http://userscripts.org/scripts/show/100931
(function () {
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
	'God of War ***': 65,
	Titan: 66,
	'Titan *': 67,
	'Titan **': 68,
	'Titan ***': 69 
};
var abbr = {
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
var country = {
	1: 'Romania',
	9: 'Brazil',
	10: 'Italy',
	11: 'France',
	12: 'Germany',
	13: 'Hungary',
	14: 'China',
	15: 'Spain',
	23: 'Canada',
	24: 'USA',
	26: 'Mexico',
	27: 'Argentina',
	28: 'Venezuela',
	29: 'United Kingdom',
	30: 'Switzerland',
	31: 'Netherlands',
	32: 'Belgium',
	33: 'Austria',
	34: 'Czech Republic',
	35: 'Poland',
	36: 'Slovakia',
	37: 'Norway',
	38: 'Sweden',
	39: 'Finland',
	40: 'Ukraine',
	41: 'Russia',
	42: 'Bulgaria',
	43: 'Turkey',
	44: 'Greece',
	45: 'Japan',
	47: 'South Korea',
	48: 'India',
	49: 'Indonesia',
	50: 'Australia',
	51: 'South Africa',
	52: 'Republic of Moldova',
	53: 'Portugal',
	54: 'Ireland',
	55: 'Denmark',
	56: 'Iran',
	57: 'Pakistan',
	58: 'Israel',
	59: 'Thailand',
	61: 'Slovenia',
	63: 'Croatia',
	64: 'Chile',
	65: 'Serbia',
	66: 'Malaysia',
	67: 'Philippines',
	68: 'Singapore',
	69: 'Bosnia and Herzegovina',
	70: 'Estonia',
	71: 'Latvia',
	72: 'Lithuania',
	73: 'North Korea',
	74: 'Uruguay',
	75: 'Paraguay',
	76: 'Bolivia',
	77: 'Peru',
	78: 'Colombia',
	79: 'Republic of Macedonia (FYROM)',
	80: 'Montenegro',
	81: 'Republic of China (Taiwan)',
	82: 'Cyprus',
	83: 'Belarus',
	84: 'New Zealand',
	164: 'Saudi Arabia',
	165: 'Egypt',
	166: 'United Arab Emirates',
	167: 'Albania'
};
var leileme = 'http://cmc.erep-newsmth.com';
var showMsg = {
	1: 'Succeed',
	2: 'Failed',
	3: 'Failed: dupl submittion',
	4: 'Failed: N/A',
	5: 'Failed: incomplete data',
	6: 'Failed: new user',
	7: 'Failed: update statistic',
	8: 'Failed: user info',
	9: 'Failed: processed data'
};

function calcDmg(militaryRank, strength, weaponPower, fights, bonus) {
	var damage = Math.floor((militaryRank + 5) * (strength + 400) * 0.005 * (1 + weaponPower * 0.01));
	return Math.floor(damage * bonus) * fights;
}

function replaceStr(haystack, needle, replacement) {
	var temp = haystack.split(needle);
	return temp.join(replacement);
}

function getMilInfo(greedy) {
	var str = $j('#fighter_skill').text().trim(),
		mRank = $j('#rank_icon').attr('title'),
		info = {};

	info.str = parseFloat(replaceStr(str, ',', ''));
	if (!mRank || mRank.length == 0) {
		mRank = $j('#rank_icon').attr('original-title').replace(/.*:/, '').trim();
	} else {
		mRank = mRank.replace(/.*:/, '').trim();
	}
	info.rank = rank[mRank];
	if (greedy) {
		info.level = $j('#experienceTooltip').find('strong').html();
		info.leftSide = $j('#content').html().split('countryId		   : ')[1].split(',')[0];
		info.inf = $j('#total_damage').find('strong').text().replace(/\D/g, '');
		info.fight = $j('#total_f').find('strong').text().trim();
		info.citizenId = $j('#financier').attr('href').substring(20);
		info.name = $j('#large_sidebar').find('a.user_avatar').attr('title');
	}
	return info;
}

function getMilDmg(bonus) {
	var info = getMilInfo();
	return calcDmg(info.rank, info.str, 200, 1, bonus);
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
		key = getKey();
	stats.push('<tr><th>Battle</th><th>Influence</th><th></th></tr>');
	for (i = 0, len = key.length; i < len; i++) {
		value = localStorage.getItem(key[i]).split('_', 2);
		tmp = key[i].split('_');
		cmcFight += parseInt(value[0], 10);
		cmcInf += parseInt(value[1], 10);
		stats.push('<tr><td>' + tmp[1] + '_'  + tmp[2] + '_' + value[0] + '</td><td>' + value[1] + '</td><td><a href="javascript:;" class="delete_stat" id="' + key[i] + '">X</a></td></tr>');
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
		tstats += '<tr><td>CMC Influence</td><td>' + cmcInf + '</td></tr><tr><td>CMC Q7fight</td><td>' + cmcFight + '</td></tr>';
	} else {
		tstats = '<tr><td style="text-align:center;font-weight:bold;"><a href="http://userscripts.org/scripts/show/112129" target="_blank">battle pupil v1.4.5</a></td></tr>';
	}
	$j('#tstats_table').html(tstats);
	stats_table.find('tr:gt(0)').click(function () {
		var key = $j(this).find('a.delete_stat').attr('id'),
			value = localStorage.getItem(key).split('_', 2),
			tmp = key.split('_').slice(1);
		tmp[2] = country[tmp[2]];
		$j('#stats_report').html('[' + tmp.join('_') + '] ' + value[0] + '_' + value[1]);
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
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

function addFight() {
	var battleId = location.href.substring(location.href.lastIndexOf('/') + 1),
		zoneId = $j('#content').html().split('zoneId			   : ')[1].split(',')[0],
		leftSide = country[$j('#content').html().split('countryId		   : ')[1].split(',')[0]],
		totalDmg = parseInt($j('#total_damage').find('strong').text().replace(/\D/g, ''), 10),
		dmg = getMilDmg(1),
		neDmg = getMilDmg(1.1),
		initFight,
		scriptNode = document.createElement('script'),
		text = [];
	if (leftSide.length > 8) {
		leftSide = abbr[leftSide];
	}
	if (localStorage.getItem('ne') != null && localStorage.getItem('ne') == battleId) {
		initFight = Math.round(totalDmg / neDmg);
	} else if (totalDmg % dmg != 0 && totalDmg % neDmg == 0) {
		initFight = Math.round(totalDmg / neDmg);
	} else {
		initFight = Math.round(totalDmg / dmg);
	}
	$j('#total_damage').parent().after(
		'<td>&nbsp;&nbsp;&nbsp;&nbsp;</td><td><div id="total_f" style="width:auto;height:25px;display:block;cursor:default;"><small style="font-size:11px;color:#fff;float:left;text-shadow:#333 0px 1px 1px;display:block;height:25px;opacity:0.7;-moz-opacity:0.7;-ms-fiter:' + "'progid:DXImageTransform.Microsoft.Alpha(Opacity=70)'" + ';filter:alpha(opacity=70);line-height:25px;font-weight:bold;padding:0 5px;background-image:url(' + "'/images/modules/pvp/influence_left.png?1321873582'" + ');background-position:left;">' + battleId + '_' + zoneId + '_' + leftSide + '</small><strong style="color:#fff;text-shadow:#014471 0px 1px 0px;float:left;display:block;height:25px;font-size:12px;line-height:25px;padding:0 5px;background-image:url(' + "'/images/modules/pvp/influence_right.png?1321873582'" + ');background-position:right;">' + initFight + '</strong></div></td>'
	);
	function localMain() {
		//remove ScrollToFixed
		$j(document).ready(function () {
			$j(window).load(function () {
				var tmp = $j('#large_sidebar').next();
				if (!tmp.attr('id') || !tmp.attr('id').length) {
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
			var fight, key,
				info = getMilInfo(),
				response = JSON.parse(xhr.responseText),
				user = response.user;
			if (response.error) {
				return;
			}
			if (response.message === 'ENEMY_KILLED') {
				totalDmg += user.givenDamage;
				if (response.oldEnemy.isNatural === true) {
					localStorage.setItem('ne', SERVER_DATA.battleId);
					totalDmg += Math.floor(user.givenDamage * 0.1);
					fight = Math.round(totalDmg / getMilDmg(1.1));
				} else {
					fight = Math.round(totalDmg / getMilDmg(1));
				}
				$j(this).find('strong').html(fight);
				key = $j(this).find('small').text().trim().split('_', 2);
				key = '@_' + key[0] + '_' + key[1] + '_' + SERVER_DATA.countryId;
				if (localStorage.getItem(key) == null) {
					return;
				}
				localStorage.setItem(key, fight + '_' + totalDmg + '_' + SERVER_DATA.level + '_' + info.rank + '_' + info.str);
				showStats();
			}
		});
	}
	text.push('(function () {');
	text.push('var rank = ' + JSON.stringify(rank) + ';');
	text.push('var totalDmg = ' + totalDmg + ';');
	text.push(replaceStr.toString());
	text.push(calcDmg.toString());
	text.push(getMilInfo.toString());
	text.push(getMilDmg.toString());
	text.push(sortStats.toString());
	text.push(getKey.toString());
	text.push(showStats.toString());
	text.push(localMain.toString());
	text.push('localMain();');
	text.push('})();');
	scriptNode.textContent = text.join('\n');
	document.head.appendChild(scriptNode);
}

function addBtnHandler() {
	$j('#stats_btn').click(function () {
		$j('#my_stats').toggle();
		$j('#addstats_btn').toggle();
		$j('#clear_btn').css('display', 'none');
		$j('#gen_txt').css('display', 'none');
		$j('#stats_report').html('');
		showStats();
	});
	$j('#addstats_btn').click(function () {
		var info = getMilInfo(true),
			key = $j('#total_f').find('small').text().trim().split('_', 2);
		key = '@_' + key[0] + '_' + key[1] + '_' + info.leftSide;
		localStorage.setItem(key, info.fight + '_' + info.inf + '_' + info.level + '_' + info.rank + '_' + info.str);
		showStats();
	});
	$j('#clear_btn').click(function () {
		var r, key, i, len;
		r = confirm('Clear all the statistic?');
		if (r) {
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
		var r, cmcs, tmp, key, i, len, request, info, msg;
		r = confirm('Submit to EC CMC?');
		if (r) {
			showStats();
			cmcs = [];
			key = getKey();
			for (i = 0, len = key.length; i < len; i++) {
				tmp = key[i].split('_').slice(1);
				cmcs.push(tmp.join('_') + '_' + localStorage.getItem(key[i]));
			}
			if (cmcs.length == 0) {
				$j('#clear_btn').css('display', 'none');
				$j('#gen_txt').css('display', 'none');
				$j('#stats_report').html('');
				return;
			}
			$j('#stats_report').html('Wait a mo...');
			info = getMilInfo(true);
			request = 'userid=' + info.citizenId + '&name=' + info.name + '&level=' + info.level + '&rank=' + info.rank + '&strength=' + info.str + '&data=' + cmcs.join('#');
			$j('#clear_btn').css('display', 'block');
			$j('#gen_txt').css('display', 'none');
			setTimeout(function () {
				GM_xmlhttpRequest({
					method:	'POST',
					url: leileme + '/addapi.php',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: request,
					onload:	function (response) {
						var data = JSON.parse(response.responseText);
						if (data.all) {
							$j('#stats_report').html('<span style="color:green;">Submitted. Feel good. <a href="http://cmc.erep-newsmth.com/tasklog.html?name=' + info.name + '" target="_blank">&gt;&gt;&gt;&gt;&gt;LOG</a></span>');
						} else {
							msg = [];
							for (i = 0, len = data.result.length; i < len; i++) {
								tmp = cmcs[i].split('_', 3);
								tmp[2] = country[tmp[2]];
								if (tmp[2].length > 8) {
									tmp[2] = abbr[tmp[2]];
								}
								msg.push('[' + tmp.join('_') + '] ' + showMsg[data.result[i].msgCode]);
							}
							$j('#stats_report').html('<span style="color:red;">' + msg.join('<br>') + '</span>');
						}
					}
				});
			}, 0);
		}
	});
}

function addStats() {
	$j('#limit_health_pop').before(
		'<div style="float:left;width:153px;margin-bottom:7px;"><a href="javascript:;" id="stats_btn" style="margin-top:10px;float:left;"><strong>Stats</strong></a><a href="javascript:;" id="addstats_btn" style="margin-top:10px;float:right;"><strong>Add</strong></a><br/><br/><div id="my_stats"><table id="stats_table" style="width:100%;"></table><hr/><table id="tstats_table" style="width:100%;"></table><hr/><a href="javascript:;" id="submit_btn" style="float:left;"><strong>Submit</strong></a><a href="http://ec-cmc.diandian.com" target="_blank" id="help_btn" style="float:right;"><strong>Help</strong></a><br/><div id="stats_report" style="width:100%;"></div><textarea id="gen_txt" style="width:100%;display:none;"></textarea><a href="javascript:;" id="clear_btn" style="float:left;display:none;"><strong>Clear</strong></a></div></div>'
	);
	var info = getMilInfo(true),
		key = $j('#total_f').find('small').text().trim().split('_', 2);
	key = '@_' + key[0] + '_' + key[1] + '_' + info.leftSide;
	if (localStorage.getItem(key) != null) {
		localStorage.setItem(key, info.fight + '_' + info.inf + '_' + info.level + '_' + info.rank + '_' + info.str);
	}
	showStats();
	addBtnHandler();
}

function removeAd() {
	$j('#large_sidebar').find('div.banner_place').hide();
}

function wait() {
	if (!unsafeWindow.jQuery) {
		window.setTimeout(wait, 100);
	} else {
		$j = unsafeWindow.jQuery;
		addFight();
		addStats();
		removeAd();
	}
}

wait();
})();