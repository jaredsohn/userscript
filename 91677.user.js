// ==UserScript==
// @name           Battle v1
// @namespace      http://www.erepublik.com/en/referrer/ivicaSR
// @description    Zanimacija
// @version        4
// @include        http://www.erepublik.com/*/military/battlefield/*
// @require        http://sizzlemctwizzle.com/updater.php?id=91677&uso
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// ==/UserScript==


function fixCountryNames(name) {
	var fixed = "";
	switch(name) {
		case "Bosnia and Herzegovina":
			fixed ="Bosnia-Herzegovina";
			break;
		case "Czech Republic":
			fixed ="Czech-Republic";
			break;
		case "New Zealand":
			fixed ="New=Zealand";
			break;
		case "North Korea":
			fixed ="North-Korea";
			break;
		case "Republic of China (Taiwan)":
			fixed ="Republic-of-China-Taiwan";
			break;
		case "Republic of Macedonia (FYROM)":
			fixed ="Republic-of-Macedonia-FYROM";
			break;
		case "Republic of Moldova":
			fixed ="Republic-of-Moldova";
			break;
		case "South Africa":
			fixed ="South-Africa";
			break;
		case "South Korea":
			fixed ="South-Korea";
			break;
		case "United Kingdom":
			fixed ="United-Kingdom";
			break;
		default:
			fixed = name;
			break;
	}
	return fixed;
}

//podaci sa stranice pre promene
var loc = document.location.href;
var battleID1 = loc.split("/");
var battleID = battleID1[6];
var pvp = document.getElementById("pvp_header");

//invertovanje

var mustInvert = unsafeWindow.SERVER_DATA.mustInvert;

//kraj invertovanje


//trenutni rezultat

var left_crowns = pvp.getElementsByTagName("div")[4];
var right_crowns = pvp.getElementsByTagName("div")[16];
var left_crowns_score_div="";
var right_crowns_score_div="";
var left_crowns_score_tmp = left_crowns.className.split(" ");
var left_crowns_score_tmp1 = left_crowns_score_tmp[1].split("no");
left_crowns_score_div = left_crowns_score_tmp1[1];
var right_crowns_score_tmp = right_crowns.className.split(" ");
var right_crowns_score_tmp1 = right_crowns_score_tmp[1].split("no");
right_crowns_score_div = right_crowns_score_tmp1[1];
var mustInvertScore="";
if (!mustInvert) {
	mustInvertScore = left_crowns_score_div;
	left_crowns_score_div = right_crowns_score_div;
	right_crowns_score_div = mustInvertScore;
} 

//kraj trenutni rezultat

//mppovi

var defender_allies = document.getElementById("defender_allies");
var attacker_allies = document.getElementById("attacker_allies");

var defender_allies_nr = defender_allies.innerHTML.split("<div")[0];
var attacker_allies_nr = attacker_allies.innerHTML.split("<div")[0];

var left_allies_drop_down = defender_allies_nr+' <a title="show allies" onclick="javascript: allies_dropdown(\'left\'); return false;" href="#"><img class="iconsoft left" alt="show allies" src="images/parts/img-dropdown.gif"></a>';
var right_allies_drop_down = attacker_allies_nr+' <a title="show allies" onclick="javascript: allies_dropdown(\'right\'); return false;" href="#"><img class="iconsoft right" alt="show allies" src="images/parts/img-dropdown.gif"></a>';

if (!mustInvert) {
	mustInvertDrop = left_allies_drop_down;
	left_allies_drop_down = right_allies_drop_down;
	right_allies_drop_down = mustInvertDrop;
} 

var left_allies_ul = defender_allies.getElementsByTagName("ul")[0];
var right_allies_ul = attacker_allies.getElementsByTagName("ul")[0];

var left_allies_li = left_allies_ul.getElementsByTagName("li");
var right_allies_li = right_allies_ul.getElementsByTagName("li");


left_crowns_div = "<ul class=\"allies left\" style=\"display: none;\">\n";
left_crowns_div += "		<div class=\"core\">\n";

for (i=0;i<left_allies_li.length;i++) {
	//alert(left_allies_li[i]);
	var left_allie_tmp = left_allies_li[i].innerHTML.split(">")[1];
	var left_allie = left_allie_tmp.split("</li>")[0];
	var left_allie_fixed = fixCountryNames(left_allie);
	left_crowns_div += "											<li><a href=\"/en/country/"+left_allie_fixed+"\"><div class=\"flagholder\"><img src=\"/images/flags_png/M/"+left_allie_fixed+".png\" alt=\""+left_allie+"\" title=\"Spain\"></div>"+left_allie+"</a></li>\n";
}

left_crowns_div += "		</div>\n";
left_crowns_div += "	</ul>\n";

right_crowns_div = "<ul class=\"allies right\" style=\"display: none;\">\n";
right_crowns_div += "		<div class=\"core\">\n";

for (i=0;i<right_allies_li.length;i++) {
	//alert(left_allies_li[i]);
	var right_allie_tmp = right_allies_li[i].innerHTML.split(">")[1];
	var right_allie = right_allie_tmp.split("</li>")[0];
	var right_allie_fixed = fixCountryNames(right_allie);
	right_crowns_div += "											<li><a href=\"/en/country/"+right_allie_fixed+"\"><div class=\"flagholder\"><img src=\"/images/flags_png/M/"+right_allie_fixed+".png\" alt=\""+right_allie+"\" title=\"Spain\"></div>"+right_allie+"</a></li>\n";
}


right_crowns_div += "		</div>\n";
right_crowns_div += "	</ul>\n";

if (!mustInvert) {
	mustInvertMPP = left_crowns_div;
	left_crowns_div = right_crowns_div;
	right_crowns_div = mustInvertMPP;
} 


//kraj mppovi

//fight dugme
var pvp_actions = document.getElementById("pvp_actions");
var pvp_battle_area = document.getElementById("pvp_battle_area");
//kraj fight dugme

//naziv regije i drzava
var regionName = pvp.getElementsByTagName("h2")[0].innerHTML;
var regionNametmp = regionName.split(" ");

regionNameFix="";
for (i=0;i<regionNametmp.length-1;i++) {
	regionNameFix+=regionNametmp[i]+"-";
}
regionNameFix+=regionNametmp[regionNametmp.length-1];


//alert(regionName);
var leftCountry = pvp.getElementsByClassName("country left_side")[0];
var leftCountryName = leftCountry.getElementsByTagName("h3")[0].innerHTML;
//alert(leftCountryName);

var rightCountry = pvp.getElementsByClassName("country right_side")[0];
var rightCountryName = rightCountry.getElementsByTagName("h3")[0].innerHTML;
//alert(rightCountryName);

var leftCountryLink = fixCountryNames(leftCountryName);
var rightCountryLink = fixCountryNames(rightCountryName);

if (!mustInvert) {
	mustInvertCountryName = leftCountryName;
	leftCountryName = rightCountryName;
	rightCountryName = mustInvertCountryName;
	
	mustInvertCountryLink = leftCountryLink;
	leftCountryLink = rightCountryLink;
	rightCountryLink = mustInvertCountryLink;
} 


//kraj naziv regije i drzava

//zastave

leftCountryFlag = fixCountryNames(leftCountryName);
rightCountryFlag = fixCountryNames(rightCountryName);


//kraj zastave


//skrivena polja

var enemy_defeated = document.getElementById("enemy_defeated");
var rank_up = document.getElementById("rank_up");
var battle_won = document.getElementById("battle_won");
var battle_end = document.getElementById("battle_end");
var battle_loader = document.getElementById("battle_loader");
var weapon_attributes = document.getElementById("weapon_attributes no_weapon");


//server data
//alert(unsafeWindow.SERVER_DATA.battle_critical_at);
var battle_critical_at = unsafeWindow.SERVER_DATA.battle_critical_at;
var server_time = unsafeWindow.SERVER_DATA.server_time;

//alert(battle_critical_at.getTime());



//stari cssovi

function replaceStyleSheet(oldCSS, newCSS) {
    document.evaluate('//link[@rel="stylesheet" and @href="'+oldCSS+'"]', document, null, 
		      XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.href = newCSS;
}

replaceStyleSheet("/css/cmp/pvp.css", "http://www.t2-studio.com/erep/bitke/simulator/css/cmp/pvp.css");


var css1 = document.createElement('link');
css1.media = 'screen';
css1.type = 'text/css';
css1.rel='stylesheet';
css1.href='http://www.t2-studio.com/erep/bitke/simulator/css/layout.css';

document.getElementsByTagName('head')[0].appendChild(css1);

var countdown = document.createElement('script');
countdown.type="text/javascript";
countdown.src="http://www.t2-studio.com/erep/bitke/simulator/js/jquery.countdown/jquery.countdown.min.js";
document.getElementsByTagName('head')[0].appendChild(countdown);



var scriptCode = new Array();

scriptCode.push('var battle_critical_at = new Date("'+ battle_critical_at +'");'        );
scriptCode.push('var server_time = new Date("'+ server_time +'");'        );


scriptCode.push('var visuals = {'        );
scriptCode.push('	initialize_battle_info: function() {'        );
//scriptCode.push('		alert(battle_critical_at.getTime());'        );
//scriptCode.push('		var battle_critical_at = new Date(\'Thu, 02 Dec 2010 18:14:01 -0800\');'        );
//scriptCode.push('		var server_time = new Date(\'Thu, 02 Dec 2010 16:42:21 -0800\');'        );
scriptCode.push('		if (battle_critical_at.getTime() - server_time.getTime() > 0){'        );
//scriptCode.push('			alert(1);'        );
scriptCode.push('			$j("#battle_countdown").countdown({until: battle_critical_at, serverTime: server_time, compact: true, onTick: visuals.watch_countdown});'        );
scriptCode.push('		}'        );
scriptCode.push('		//alert(1);'        );
scriptCode.push('		setTimeout("visuals._initialize_battle_info()", 1000);'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	watch_countdown: function(periods) {'        );
//scriptCode.push('		alert(1);'        );
scriptCode.push('		if (periods[5] < 15 && periods[4] == 0) {'        );
scriptCode.push('			$j(\'#battle_countdown\').css("color", "#f1706a");'        );
scriptCode.push('		}'        );
scriptCode.push(''        );
scriptCode.push('		if (periods[6] == 0 && periods[5] == 0 && periods[4] == 0) {'        );
scriptCode.push('			$j(\'#battle_countdown\').countdown(\'destroy\');'        );
scriptCode.push('			$j("#battle_countdown").html("00:00:00");'        );
scriptCode.push('			$j("#battle_countdown").css("color", "#bfbfbf");'        );
scriptCode.push('		}'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	_initialize_battle_info: function() {'        );
scriptCode.push('		//document.getElementsByClassName(\'backwhite\')[0].innerHTML = ++window["settings"]["visuals"]["maximum_number_of_fighters"];'        );
scriptCode.push('		//alert(2);'        );
scriptCode.push('		$j("div.battleinfo_loader").fadeOut();'        );
scriptCode.push('		//alert(window["settings"]["visuals"]["initial_battle_info_delay"]);'        );
scriptCode.push('		setTimeout(\'$j("div.battleinfo_container").fadeIn();\', window["settings"]["visuals"]["initial_battle_info_delay"]);'        );
scriptCode.push('		setTimeout("visuals.resize_defense_bar();",            window["settings"]["visuals"]["initial_defense_bar_delay"]);'        );
scriptCode.push('		setTimeout("visuals.display_heroes();",                window["settings"]["visuals"]["initial_display_heroes_delay"]);'        );
scriptCode.push('		if (true) setTimeout("visuals._display_attackers();",            window["settings"]["visuals"]["initial_display_attackers_delay"]);'        );
scriptCode.push('		if (true) setTimeout("visuals._display_defenders();",            window["settings"]["visuals"]["initial_display_defenders_delay"]);'        );
scriptCode.push('		//alert(1);'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	display_heroes: function() {'        );
scriptCode.push('		if (window[\'db\'][\'attacking_hero\'] && window[\'db\'][\'attacking_hero\'][\'name\']) {'        );
scriptCode.push('			with ($j("div.battleinfo div.attacker div.battlehero")) {'        );
scriptCode.push('				fadeOut();'        );
scriptCode.push('				queue(function() {'        );
scriptCode.push('					with ($j(this)) {'        );
scriptCode.push('						$j("img#attacker_battlehero_avatar").attr("src", window[\'db\'][\'attacking_hero\'][\'avatar\']);'        );
scriptCode.push('						$j("a#attacker_battlehero_avatar_link").attr("href", window[\'db\'][\'attacking_hero\'][\'url\']);'        );
scriptCode.push('						$j("a#attacker_nameholder_link").html(window[\'db\'][\'attacking_hero\'][\'name\']);'        );
scriptCode.push('						$j("a#attacker_nameholder_link").attr("href", window[\'db\'][\'attacking_hero\'][\'url\']);'        );
scriptCode.push('						children("div.damage").html(" "+window[\'db\'][\'attacking_hero\'][\'damage\']+" ");'        );
scriptCode.push('						fadeIn("fast");'        );
scriptCode.push('						window[\'db\'][\'previous_attacking_hero\'] = window[\'db\'][\'attacking_hero\'];'        );
scriptCode.push('						window[\'db\'][\'attacking_hero\'] = NaN;'        );
scriptCode.push('						dequeue();'        );
scriptCode.push('					}'        );
scriptCode.push('				});'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push(''        );
scriptCode.push('		if (window[\'db\'][\'defending_hero\'] && window[\'db\'][\'defending_hero\'][\'name\']) {'        );
scriptCode.push('			with ($j("div.battleinfo div.defender div.battlehero")) {'        );
scriptCode.push('				fadeOut();'        );
scriptCode.push('				queue(function() {'        );
scriptCode.push('					with ($j(this)) {'        );
scriptCode.push('						$j("img#defender_battlehero_avatar").attr("src", window[\'db\'][\'defending_hero\'][\'avatar\']);'        );
scriptCode.push('						$j("a#defender_battlehero_avatar_link").attr("href", window[\'db\'][\'defending_hero\'][\'url\']);'        );
scriptCode.push('						$j("a#defender_nameholder_link").html(window[\'db\'][\'defending_hero\'][\'name\']);'        );
scriptCode.push('						$j("a#defender_nameholder_link").attr("href", window[\'db\'][\'defending_hero\'][\'url\']);'        );
scriptCode.push('						children("div.damage").html(" "+window[\'db\'][\'defending_hero\'][\'damage\']+" ");'        );
scriptCode.push('						fadeIn("fast");'        );
scriptCode.push('						window[\'db\'][\'previous_defending_hero\'] = window[\'db\'][\'defending_hero\'];'        );
scriptCode.push('						window[\'db\'][\'defending_hero\'] = NaN;'        );
scriptCode.push('						dequeue();'        );
scriptCode.push('					}'        );
scriptCode.push('				});'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	_display_attackers: function() {'        );
scriptCode.push('		//alert(1);'        );
scriptCode.push('		//document.getElementsByClassName(\'backwhite\')[0].innerHTML = "debug1";'        );
scriptCode.push('		var safe_to_proceed = true;'        );
scriptCode.push('		'        );
scriptCode.push('		if (window[\'db\'][\'attackers\'].length && window[\'db\']["attackers_queue"].length == window.settings["visuals"][\'maximum_number_of_fighters\']) {'        );
scriptCode.push('			var last_in_que = window[\'db\']["attackers_queue"].pop();'        );
scriptCode.push('			if (util.date_diff(new Date(), last_in_que[\'visible_since\']) >= window.settings["visuals"][\'minimum_fighter_display_delay\']) {'        );
scriptCode.push('				last_in_que[\'ref\'].hide();'        );
scriptCode.push('			} else {'        );
scriptCode.push('				window[\'db\']["attackers_queue"].push(last_in_que);'        );
scriptCode.push('				safe_to_proceed = false;'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push(''        );
scriptCode.push('		if (window[\'db\'][\'attackers\'].length && safe_to_proceed) {'        );
scriptCode.push('			var attacker = window[\'db\'][\'attackers\'].shift();'        );
scriptCode.push('			window[\'db\'][\'already_queued\'].push(attacker["id"]);'        );
scriptCode.push('			$j("div#attacking_fighter_template").siblings("div.fighter").children("div.fighter").attr("class", "fighter grey");'        );
scriptCode.push('			var latest_in_queue = ({'        );
scriptCode.push('				ref: $j("div#attacking_fighter_template").clone().insertAfter("div#attacking_fighter_template"),'        );
scriptCode.push('				visible_since: new Date()'        );
scriptCode.push('			});'        );
scriptCode.push('			window[\'db\']["attackers_queue"].unshift(latest_in_queue);'        );
scriptCode.push('			with (latest_in_queue["ref"]) {'        );
scriptCode.push('				//window["db"]["current_dp"] += attacker[\'damage\'];'        );
scriptCode.push('				visuals.resize_defense_bar();'        );
scriptCode.push('				attr({id: (new Date()).getTime()});'        );
scriptCode.push('				children("div.fighter").children("div.avatarholder").children("img").attr({src:attacker[\'avatar\']});'        );
scriptCode.push('				children("div.fighter").children("div.nameholder").html(" "+attacker[\'name\']+" ")'        );
scriptCode.push('				children("div.fighter").children("div.damage").html(" -"+attacker[\'damage\']+" ");'        );
scriptCode.push(''        );
scriptCode.push('				slideDown("fast");'        );
scriptCode.push('				queue(function() {'        );
scriptCode.push('					setTimeout("visuals._display_attackers();", 1000);'        );
scriptCode.push('					with ($j(this)) {'        );
scriptCode.push('						children("*").fadeIn();'        );
scriptCode.push('						dequeue();'        );
scriptCode.push('					}'        );
scriptCode.push('				});'        );
scriptCode.push('			}'        );
scriptCode.push('		} else {'        );
scriptCode.push('			setTimeout("visuals._display_attackers();", 2000);'        );
scriptCode.push('		}'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push('	_display_defenders: function() {'        );
scriptCode.push('		var safe_to_proceed = true;'        );
scriptCode.push('		if (window[\'db\'][\'defenders\'].length && window[\'db\']["defenders_queue"].length == window.settings["visuals"][\'maximum_number_of_fighters\']) {'        );
scriptCode.push('			var last_in_que = window[\'db\']["defenders_queue"].pop();'        );
scriptCode.push('			if (util.date_diff(new Date(), last_in_que[\'visible_since\']) >= window.settings["visuals"][\'minimum_fighter_display_delay\']) {'        );
scriptCode.push('				last_in_que[\'ref\'].hide();'        );
scriptCode.push('			} else {'        );
scriptCode.push('				window[\'db\']["defenders_queue"].push(last_in_que);'        );
scriptCode.push('				safe_to_proceed = false;'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push(''        );
scriptCode.push('		if (window[\'db\'][\'defenders\'].length && safe_to_proceed) {'        );
scriptCode.push('			var defender = window[\'db\'][\'defenders\'].shift();'        );
scriptCode.push('			window[\'db\'][\'already_queued\'].push(defender["id"]);'        );
scriptCode.push('			$j("div#defending_fighter_template").siblings("div.fighter").children("div.fighter").attr("class", "fighter grey");'        );
scriptCode.push('			var latest_in_queue = ({'        );
scriptCode.push('				ref: $j("div#defending_fighter_template").clone().insertAfter("div#defending_fighter_template"),'        );
scriptCode.push('				visible_since: new Date()'        );
scriptCode.push('			});'        );
scriptCode.push('			window[\'db\']["defenders_queue"].unshift(latest_in_queue);'        );
scriptCode.push('			with (latest_in_queue["ref"]) {'        );
scriptCode.push('				//window["db"]["current_dp"] += defender[\'damage\'];'        );
scriptCode.push('				visuals.resize_defense_bar();'        );
scriptCode.push('				attr({id: (new Date()).getTime()});'        );
scriptCode.push('				children("div.fighter").children("div.avatarholder").children("img").attr({src:defender[\'avatar\']});'        );
scriptCode.push('				children("div.fighter").children("div.nameholder").html(" "+defender[\'name\']+" ")'        );
scriptCode.push('				children("div.fighter").children("div.damage").html(" +"+defender[\'damage\']+" ");'        );
scriptCode.push(''        );
scriptCode.push('				slideDown("fast");'        );
scriptCode.push('				queue(function() {'        );
scriptCode.push('					setTimeout("visuals._display_defenders();", 1000);'        );
scriptCode.push('					with ($j(this)) {'        );
scriptCode.push('						children("*").fadeIn();'        );
scriptCode.push('						dequeue();'        );
scriptCode.push('					}'        );
scriptCode.push('				});'        );
scriptCode.push('			}'        );
scriptCode.push('		} else {'        );
scriptCode.push('			setTimeout("visuals._display_defenders();", 1000);'        );
scriptCode.push('		}'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	resize_defense_bar: function() {'        );
scriptCode.push('		var dp_proc = (window[\'db\'][\'current_dp\'] / window[\'db\'][\'original_dp\']) * 100;'        );
scriptCode.push('		dp_proc = parseFloat(dp_proc);'        );
scriptCode.push('		dp_proc = dp_proc.toFixed(2);'        );
//scriptCode.push('		alert(dp_proc);'        );
scriptCode.push(''        );
scriptCode.push('		$j("span.wall_img").css("height", 59+"px");'        );
scriptCode.push('		$j("span#wall_img7").css("height", 0+"px");'        );
scriptCode.push('		$j("div#wall_img8").css("height", 0+"px");'        );
scriptCode.push('		$j("div#wall_img0").css("height", 0+"px");'        );
scriptCode.push('		$j("center#no_mans_land").attr("class", "free");'        );
scriptCode.push('		$j("center#underground").attr("class", "free");'        );
scriptCode.push('		var k = 0;'        );
scriptCode.push('	'        );
scriptCode.push(''        );
scriptCode.push('		if(dp_proc >= 100) {'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_1");'        );
scriptCode.push('			$j("center#no_mans_land").removeAttr("class");'        );
scriptCode.push('			'        );
scriptCode.push('			if(59/100 * (100 - (dp_proc - 100)*5) >= 0) {'        );
scriptCode.push('				$j("span#wall_img1").css("height", 59/100 * (100 - (dp_proc - 100)*5)+"px");'        );
scriptCode.push('			} else {'        );
scriptCode.push('				$j("span#wall_img1").css("height", 0+"px");'        );
scriptCode.push('				var v = 59/100 * ((dp_proc - 100)*5) - 100;'        );
scriptCode.push('				if(v > 200) {'        );
scriptCode.push('					v = 200;'        );
scriptCode.push('				}'        );
scriptCode.push('				$j("div#wall_img0").css("height", v+"px");'        );
scriptCode.push('			}'        );
scriptCode.push('		} else if(dp_proc >= 80 && dp_proc < 100) {'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_2");'        );
scriptCode.push('			$j("span#wall_img2").css("height", (59/100 * (100 - (dp_proc - 80)*5)).toFixed(2)+"px");'        );
scriptCode.push('			k=1;'        );
scriptCode.push('		} else if(dp_proc >= 60 && dp_proc < 80) {'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_3");'        );
scriptCode.push('			$j("span#wall_img3").css("height", (59/100 * (100 - (dp_proc - 60)*5)).toFixed(2)+"px");'        );
scriptCode.push('			k=2;'        );
scriptCode.push('		} else if(dp_proc >= 40 && dp_proc < 60) {'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_4");'        );
scriptCode.push('			$j("span#wall_img4").css("height", (59/100 * (100 - (dp_proc - 40)*5)).toFixed(2)+"px");'        );
scriptCode.push('			k=3;'        );
scriptCode.push('		} else if(dp_proc >= 20 && dp_proc < 40) {'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_5");'        );
scriptCode.push('			$j("span#wall_img5").css("height", (59/100 * (100 - (dp_proc - 20)*5)).toFixed(2)+"px");'        );
scriptCode.push('			k=4;'        );
scriptCode.push('		} else if(dp_proc >= 0 && dp_proc < 20) {'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_6");'        );
scriptCode.push('			$j("span#wall_img6").css("height", (59/100 * (100 - (dp_proc)*5)).toFixed(2)+"px");'        );
scriptCode.push('			k=5;'        );
scriptCode.push('		} else if(dp_proc < 0) {'        );
scriptCode.push('			k = 6;'        );
scriptCode.push('			$j("div#battlewall").attr("class", "wall bl_7");'        );
scriptCode.push('			$j("center#underground").removeAttr("class");'        );
scriptCode.push('	'        );
scriptCode.push('			if(59/100 * (100 - (-dp_proc)*5) >= 0) {'        );
scriptCode.push('				$j("span#wall_img7").css("height",59 - 59/100 * (100 - (-dp_proc)*5)+"px");'        );
scriptCode.push('			} else {'        );
scriptCode.push('				$j("span#wall_img7").css("height", 59+"px");'        );
scriptCode.push('				var v = 59/100 * ((-dp_proc)*5 - 100);'        );
scriptCode.push('				if(v > 200) {'        );
scriptCode.push('					v = 200;'        );
scriptCode.push('				}'        );
scriptCode.push('				$j("div#wall_img8").css("height", v+"px");'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push('		'        );
scriptCode.push('		//get how much is a 5th of the total defense points '        );
scriptCode.push('		var chunk = (window[\'db\'][\'original_dp\'] / 5);'        );
scriptCode.push('		// get an int value (multiple of chunk) of how much is left'        );
scriptCode.push('		var x = parseInt(window[\'db\'][\'current_dp\'] / chunk) * chunk;'        );
scriptCode.push('		//substract that to get what we want to display'        );
scriptCode.push('		var y = window[\'db\'][\'current_dp\'] - x;'        );
scriptCode.push('		'        );
scriptCode.push('		y = y.toFixed(2);'        );
scriptCode.push('		$j("em#wall_val"+k).html(y);'        );
scriptCode.push('		'        );
scriptCode.push('		//set to \'chunk\' the defense points of the remaining free zones'        );
scriptCode.push('		for(i = k+1; i<=5; i++) {'        );
scriptCode.push('			$j("em#wall_val"+i).html(chunk);'        );
scriptCode.push('		}'        );
scriptCode.push('		'        );
scriptCode.push('		if(k == 0 || k == 6) {'        );
scriptCode.push('			$j("em#wall_val"+k).html(window[\'db\'][\'current_dp\']);'        );
scriptCode.push('		}'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('		visuals.update_defense_points();'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	update_defense_points: function() {'        );
scriptCode.push('		setTimeout("visuals._increment_defense_points()", 0.001);'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	_increment_defense_points: function() {'        );
scriptCode.push('		var val        = parseInt($j("div#label").children("span").html());'        );
scriptCode.push('		var diff       = window[\'db\'][\'current_dp\'] - val;'        );
scriptCode.push('		var diff_speed = 10;'        );
scriptCode.push('		if (diff/diff_speed < -diff_speed || diff/diff_speed > diff_speed) {'        );
scriptCode.push('			$j("div#label").children("span").html(val+parseInt(diff/diff_speed));'        );
scriptCode.push('			setTimeout("visuals._increment_defense_points()", 0.001);'        );
scriptCode.push('		} else {'        );
scriptCode.push('			$j("div#label").children("span").html(" "+(val+diff)+" ");'        );
scriptCode.push('		}'        );
scriptCode.push('	}'        );
scriptCode.push(''        );
scriptCode.push('}'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('var server = {'        );
scriptCode.push(''        );
scriptCode.push('	_get_heroes: function() {'        );
scriptCode.push('		$j.getJSON("http://www.erepublik.com/en/military/battle-heroes/'+ battleID +'", function(data) {'        );
scriptCode.push('			//document.getElementsByClassName(\'backwhite\')[0].innerHTML = "heroes";'        );
scriptCode.push('			if (data[\'attacker\'] && data[\'attacker\'][\'name\']) {'        );
scriptCode.push('				if (!window[\'db\'][\'previous_attacking_hero\'] || window[\'db\'][\'previous_attacking_hero\'][\'name\'] != data[\'attacker\'][\'name\']) {'        );
scriptCode.push('					window[\'db\'][\'attacking_hero\'] = data[\'attacker\'];'        );
scriptCode.push('				}'        );
scriptCode.push('			}'        );
scriptCode.push(''        );
scriptCode.push('			if (data[\'defender\'] && data[\'defender\'][\'name\']) {'        );
scriptCode.push('				if (!window[\'db\'][\'previous_defending_hero\'] || window[\'db\'][\'previous_defending_hero\'][\'name\'] != data[\'defender\'][\'name\']) {'        );
scriptCode.push('					window[\'db\'][\'defending_hero\'] = data[\'defender\'];'        );
scriptCode.push('				}'        );
scriptCode.push('			}'        );
scriptCode.push('			visuals.display_heroes();'        );
scriptCode.push('			//alert(data[\'defender\'][\'name\']);'        );
scriptCode.push('			setTimeout("server._get_heroes();", window["settings"]["server"]["get_heroes_speed"]);'        );
scriptCode.push('		});'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push('    _get_fighters: function(how_many) {'        );
scriptCode.push('		if(window[\'db\'][\'attackers\'].length < 10 && window[\'db\'][\'defenders\'].length < 10) {'        );
scriptCode.push('			var get_fighters_url = "http://www.erepublik.com/en/military/battle-log/'+ battleID +'";'        );
scriptCode.push('			if (window.location.toString().match("frontend_dev.php")) {'        );
scriptCode.push('				get_fighters_url = "frontend_dev.php" + get_fighters_url;'        );
scriptCode.push('			}'        );
scriptCode.push('			//alert(get_fighters_url);'        );
scriptCode.push('			//alert($j.getJSON);'        );
scriptCode.push('			$j.getJSON(get_fighters_url, 5, function(data) {'        );
scriptCode.push('				//alert(1);'        );
scriptCode.push('				if (data["domination"] != window["db"]["domination"]) {'        );
scriptCode.push('					window["db"]["current_dp"] = parseFloat(data["domination"]).toFixed(2);'        );
scriptCode.push('					visuals.resize_defense_bar();'        );
scriptCode.push('				}'        );
scriptCode.push('				//alert(data["domination"]);'        );
scriptCode.push(''        );
scriptCode.push('				if (!data["attackers"].length && !data["defenders"].length) {'        );
scriptCode.push('					server.delay_getting_fighters();'        );
scriptCode.push('				} else {'        );
scriptCode.push('					server.reset_delay_getting_fighters();'        );
scriptCode.push('					$j.each(data[\'attackers\'], function(idx, attacker) {'        );
scriptCode.push('						if (!util.in_array(attacker["id"], window[\'db\'][\'already_queued\'])) {'        );
scriptCode.push('							if (attacker[\'damage\'] != 0) {'        );
scriptCode.push('								window[\'db\'][\'attackers\'].push(attacker);'        );
scriptCode.push('							}'        );
scriptCode.push('						}'        );
scriptCode.push('					});'        );
scriptCode.push('					$j.each(data[\'defenders\'], function(idx, defender) {'        );
scriptCode.push('						if (!util.in_array(defender["id"], window[\'db\'][\'already_queued\'])) {'        );
scriptCode.push('							if (defender[\'damage\'] != 0) {'        );
scriptCode.push('								window[\'db\'][\'defenders\'].push(defender);'        );
scriptCode.push('							}'        );
scriptCode.push('						}'        );
scriptCode.push('					});'        );
scriptCode.push('				}'        );
scriptCode.push('				//alert(window[\'db\'][\'defenders\'][0][\'damage\']);'        );
scriptCode.push('			});'        );
scriptCode.push('		}'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	delay_getting_fighters: function() {'        );
scriptCode.push('		window.settings[\'server\'][\'get_fighters_speed\'] += window.settings[\'server\'][\'get_fighters_inc_delay\'];'        );
scriptCode.push('		if (window.settings[\'server\'][\'get_fighters_speed\'] > window.settings[\'server\'][\'get_fighters_max_delay\']) {'        );
scriptCode.push('			window.settings[\'server\'][\'get_fighters_speed\'] = window.settings[\'server\'][\'get_fighters_max_delay\'];'        );
scriptCode.push('		}'        );
scriptCode.push('		clearInterval(window[\'db\'][\'__get_fighters_interval\']);'        );
scriptCode.push('		window[\'db\'][\'__get_fighters_interval\'] = setInterval("server._get_fighters(window.settings[\'server\'][\'how_many_fighters\'])", window.settings[\'server\'][\'get_fighters_speed\']);'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	reset_delay_getting_fighters: function() {'        );
scriptCode.push('		clearInterval(window[\'db\'][\'__get_fighters_interval\']);'        );
scriptCode.push('		window[\'db\'][\'__get_fighters_interval\'] = setInterval("server._get_fighters(window.settings[\'server\'][\'how_many_fighters\'])", window.settings[\'server\'][\'get_fighters_speed\']);'        );
scriptCode.push('	}'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('}'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('var util = {'        );
scriptCode.push(''        );
scriptCode.push('	date_diff: function(first_date, second_date) {'        );
scriptCode.push('		return (first_date.getTime() - second_date.getTime());'        );
scriptCode.push('	},'        );
scriptCode.push(''        );
scriptCode.push('	in_array: function(needle, haystack) {'        );
scriptCode.push('		for(var i=0; i<haystack.length; i++) {'        );
scriptCode.push('			if (haystack[i] == needle) {'        );
scriptCode.push('				return true;'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push('		return false;'        );
scriptCode.push('	}'        );
scriptCode.push(''        );
scriptCode.push('}'        );
scriptCode.push(''        );

scriptCode.push(''        );
scriptCode.push('var closeAddDamagePopup = function () {'        );
scriptCode.push('		$j(\'#content\').unblock();'        );
scriptCode.push('		setTimeout("updateEnemy(enemy)", 500);'        );
scriptCode.push(''        );
scriptCode.push('		if(rankChanged){'        );
scriptCode.push('			setTimeout( function() {'        );
scriptCode.push('				battleFX.pop("rank_up");'        );
scriptCode.push('			}, 500)'        );
scriptCode.push('			'        );
scriptCode.push('		}else{'        );
scriptCode.push('			if(rank_data){'        );
scriptCode.push('				battleFX.updateRank(rank_data);'        );
scriptCode.push('				rank_data = false;'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push('	};'        );
scriptCode.push(''        );

scriptCode.push(''        );
scriptCode.push('$j(document).ready(function() {'        );
scriptCode.push('	'        );
scriptCode.push('	window.settings = {'        );
scriptCode.push('		visuals: {'        );
scriptCode.push('			initial_battle_info_delay:       800,'        );
scriptCode.push('			initial_defense_bar_delay:       800,'        );
scriptCode.push('			initial_display_heroes_delay:    800,'        );
scriptCode.push('			initial_display_attackers_delay: 2000,'        );
scriptCode.push('			initial_display_defenders_delay: 2000,'        );
scriptCode.push('			defense_bar_resize_speed:        1200,'        );
scriptCode.push('			maximum_number_of_fighters:      5,'        );
scriptCode.push('			minimum_fighter_display_delay:   500'        );
scriptCode.push('		},'        );
scriptCode.push('		server: {'        );
scriptCode.push('			get_heroes_speed:       30000,'        );
scriptCode.push('			get_fighters_speed:     15000,'        );
scriptCode.push('			get_fighters_inc_delay: 5000,'        );
scriptCode.push('			get_fighters_max_delay: 30000,'        );
scriptCode.push('			how_many_fighters:      30'        );
scriptCode.push('		}'        );
scriptCode.push('	};'        );
scriptCode.push(''        );
scriptCode.push('	window[\'db\'] = {'        );
scriptCode.push('		battle_id:   2440,'        );
scriptCode.push('		current_dp:  50,'        );
scriptCode.push('		original_dp: 50,'        );
scriptCode.push('		initial_fortifications_in_px: 0,'        );
scriptCode.push('		extra_fortifications_in_px:   0,'        );
scriptCode.push('		bad_fortifications_in_px:     0,'        );
scriptCode.push('		attacking_hero: [],'        );
scriptCode.push('		defending_hero: [],'        );
scriptCode.push('		previous_attacking_hero: [],'        );
scriptCode.push('		previous_defending_hero: [],'        );
scriptCode.push('		attackers: [],'        );
scriptCode.push('		defenders: [],'        );
scriptCode.push('		already_queued:  [],'        );
scriptCode.push('		attackers_queue: [],'        );
scriptCode.push('		defenders_queue: []'        );
scriptCode.push('	};'        );
scriptCode.push('	'        );

scriptCode.push('	//alert(1);'        );
scriptCode.push('	visuals.initialize_battle_info();'        );
scriptCode.push('	//alert(1);'        );
scriptCode.push('	server._get_heroes();'        );
scriptCode.push('	if (true) server._get_fighters(window.settings[\'server\'][\'how_many_fighters\']);'        );
scriptCode.push('	//alert(1);'        );
scriptCode.push('	'        );
/*scriptCode.push('	var allowToFight = true; '        );
scriptCode.push('	var allowToFight4def = true; '        );
scriptCode.push('	var allowToFight4res = true; '        );
scriptCode.push(''        );
scriptCode.push('	$j(\'a.btnfight\').click(function(e){'        );
scriptCode.push('		e.preventDefault();'        );
scriptCode.push('		if (allowToFight) {'        );
scriptCode.push('			$j(\'a.btnfight\').hide(\'fast\');'        );
scriptCode.push('			allowToFight     = false;			'        );
scriptCode.push('		}'        );
scriptCode.push('		return false;'        );
scriptCode.push('	});'        );
scriptCode.push('	$j(\'a.btnfightdef\').click(function(){'        );
scriptCode.push('		if (allowToFight4def) {	'        );
scriptCode.push('			$j(\'a.btnfightdef\').hide(\'fast\');'        );
scriptCode.push('			$j(\'a.btnfightres\').hide(\'fast\');'        );
scriptCode.push('			allowToFight4def = false;'        );
scriptCode.push('			allowToFight4res = false;'        );
scriptCode.push('		}'        );
scriptCode.push('		return false;'        );
scriptCode.push('	});'        );
scriptCode.push('	$j(\'a.btnfightres\').click(function(){'        );
scriptCode.push('		if (allowToFight4res) {		'        );
scriptCode.push('			$j(\'a.btnfightres\').hide(\'fast\');'        );
scriptCode.push('			$j(\'a.btnfightdef\').hide(\'fast\');'        );
scriptCode.push('			allowToFight4res = false;'        );
scriptCode.push('			allowToFight4def = false;'        );
scriptCode.push('		}'        );
scriptCode.push('		return false;'        );
scriptCode.push('	});	'        );*/

scriptCode.push('$j("#gold_warning").hover(function(){'        );
scriptCode.push('		clearTimeout(goldWarningTimeoutHealth);'        );
scriptCode.push('		clearTimeout(goldWarningTimeoutHealth2);'        );
scriptCode.push('		clearTimeout(goldWarningTimeout);'        );
scriptCode.push('	});'        );
scriptCode.push(''        );

/*scriptCode.push('$j.blockUI.defaults.css = {'        );
scriptCode.push('		padding:	0,'        );
scriptCode.push('		margin:		0,'        );
scriptCode.push('		width:		\'30%\','        );
scriptCode.push('		top:		\'-1000px\','        );
scriptCode.push('		left:		\'35%\','        );
scriptCode.push('		textAlign:	\'center\','        );
scriptCode.push('		color:		\'#FFFFFF\','        );
scriptCode.push('		border:		\'none\','        );
scriptCode.push('		backgroundColor:\'transparent\','        );
scriptCode.push('		cursor:		\'wait\''        );
scriptCode.push('	}'        );*/

scriptCode.push(''        );
scriptCode.push('	battleFX.initialize_battle_info();'        );
scriptCode.push(''        );
scriptCode.push('	$j("#fight_btn").click(function(){'        );
scriptCode.push('		shoot(0);'        );
scriptCode.push('	});'        );
scriptCode.push(''        );
scriptCode.push('	$j("#btnfight").click(function(){'        );
scriptCode.push('		shoot(0);'        );
scriptCode.push('	});'        );
scriptCode.push(''        );
scriptCode.push('	$j("#rocket_btn").click(function(){'        );
scriptCode.push('		shoot(1);'        );
scriptCode.push('	});'        );
scriptCode.push(''        );
scriptCode.push('	$j("#scroller").scrollable();'        );
scriptCode.push('	$j("#scroller").tooltip({'        );
scriptCode.push('		tip: \'.weapon_attributes\','        );
scriptCode.push('		offset: [90, 120],'        );
scriptCode.push('		predelay: 300,'        );
scriptCode.push('		effect: \'fade\','        );
scriptCode.push('		delay: 50'        );
scriptCode.push('	});'        );
scriptCode.push(''        );
scriptCode.push('	var scrollable = $j("#scroller").data("scrollable");'        );
scriptCode.push(''        );
scriptCode.push('	$j("#change_weapon").click(changeWeapon(scrollable));'        );
scriptCode.push('	$j("#add_damage_btn").click(closeAddDamagePopup);'        );
scriptCode.push('	$j("#add_rank_btn").click(closeAddRankPopup);'        );
scriptCode.push(''        );
scriptCode.push('	$j(\'.rocket_btn, .battle_hero, #total_damage, .life, .help_button, #left_attackers li, #right_attackers li, .rank_icon, #rank_max\').tipsy({'        );
scriptCode.push('		gravity: \'s\','        );
scriptCode.push('		live: true'        );
scriptCode.push('	});'        );
scriptCode.push(''        );
scriptCode.push(''        );
scriptCode.push('	if (SERVER_DATA.health <= MIN_FIGHTER_HEALTH) {'        );
scriptCode.push('		ERPK.disableFightButtons();'        );
scriptCode.push('		battleFX.healthWarning(true);'        );
scriptCode.push('		ERPK.enableRocketLauncherButton();'        );
scriptCode.push('	}'        );

scriptCode.push('});'        );

scriptCode.push(''        );
scriptCode.push('battleFX.pop = function(target) {'        );
scriptCode.push('		var useTarget = $j(\'#\'+target)[0]; // cache it'        );
scriptCode.push('		$j(\'#content\').block({'        );
scriptCode.push('			message: useTarget,'        );
scriptCode.push('			overlayCSS: {'        );
scriptCode.push('				backgroundColor: \'#FFF\','        );
scriptCode.push('				opacity: 0.8'        );
scriptCode.push('			},'        );
scriptCode.push('			css: {'        );
scriptCode.push('				width: \'396px\''        );
scriptCode.push('			}'        );
scriptCode.push('		});'        );
scriptCode.push('		return false;'        );
scriptCode.push('	}'        );


scriptCode.push('function allies_dropdown(dropdown_identifier) {'        );
scriptCode.push('	with ($j("ul."+dropdown_identifier)) {'        );
scriptCode.push('		if (css("display") == "none") {'        );
scriptCode.push('			fadeIn("fast");'        );
scriptCode.push('			with ($j("img."+dropdown_identifier)) {'        );
scriptCode.push('				attr({'        );
scriptCode.push('					"src": attr("src").replace(/down/, "up")'        );
scriptCode.push('				});'        );
scriptCode.push('			}'        );
scriptCode.push('		} else {'        );
scriptCode.push('			fadeOut("fast");'        );
scriptCode.push('			with ($j("img."+dropdown_identifier)) {'        );
scriptCode.push('				attr({'        );
scriptCode.push('					"src": attr("src").replace(/up/, "down")'        );
scriptCode.push('				});'        );
scriptCode.push('			}'        );
scriptCode.push('		}'        );
scriptCode.push('	}'        );
scriptCode.push('}'        );



var htmlContent = new Array();

htmlContent.push('				<script type="text/javascript" charset="utf-8">'        );
htmlContent.push('		var battle_id          = 10550;'        );
htmlContent.push('		var battle_critical_at = new Date(\'Wed, 01 Dec 2010 23:25:02 -0800\'),'        );
htmlContent.push('		var server_time        = new Date(\'Wed, 01 Dec 2010 03:32:58 -0800\'), '        );
htmlContent.push('		var original_dp        = 50;'        );
htmlContent.push('		var current_dp         = 50;'        );
htmlContent.push('		var battle_log_enabled = true;'        );
htmlContent.push('	</script>'        );
htmlContent.push(''        );
htmlContent.push('<h1 class="section">War &gt; Battlefield</h1>'        );
htmlContent.push('<div class="battleinfo">'        );
htmlContent.push('		<div class="attacker">'        );
htmlContent.push('					<a class="btn-arrow-left-small" href="/en/wars">Wars</a>			</div>'        );
htmlContent.push('		<div class="defender"></div>'        );
htmlContent.push('	<div class="middle"><span class="special"><strong><a href="/en/region/'+ regionNameFix + '">'+ regionName + '</a></strong></span></div>'        );
htmlContent.push('			<br clear="all">'        );
htmlContent.push('				<iframe src="http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fwww.erepublik.com%2Fen%2Fbattles%2Fshow%2F10550%3Ferpk_source%3Dfacebook%26erpk_title%3Dbattle_like" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:100%; height:25px;" allowTransparency="true" show_faces=false"></iframe>'        );
htmlContent.push('			</div>'        );
htmlContent.push('<div class="warholder">'        );
htmlContent.push('		<div class="defender">'        );
htmlContent.push('		<div class="flagholder"><a href="/en/country/'+ rightCountryLink + '"><img width="48" title="'+ rightCountryName + '" alt="'+ rightCountryName + '" src="http://www.erepublik.com/images/flags_png/L/'+ rightCountryFlag + '.png" /></a></div>'        );
htmlContent.push('		<div class="nameholder"><a href="/en/country/'+ rightCountryLink + '">'+ rightCountryName + '</a></div>'        );
htmlContent.push('				<p>'+ right_allies_drop_down +'</p>'        );
htmlContent.push('				'+ right_crowns_div +''        );
htmlContent.push('	</div>'        );
htmlContent.push('	<div class="attacker">'        );
htmlContent.push('					<div class="flagholder"><a href="/en/country/'+ leftCountryLink + '"><img width="48" title="'+ leftCountryName + '" alt="'+ leftCountryName + '" src="/images/flags/XL/'+ leftCountryFlag + '.gif" /></a></div>'        );
htmlContent.push('			<div class="nameholder"><a href="/en/country/'+ leftCountryLink + '">'+ leftCountryName + '</a></div>'        );
htmlContent.push('				<p>'+ left_allies_drop_down +'</p>'        );
htmlContent.push('				'+ left_crowns_div +''        );
htmlContent.push('			</div>'        );
htmlContent.push('	<div class="middle">'+ left_crowns_score_div +'&nbsp;<img src="images/parts/img-vs.gif" alt="vs" />&nbsp;'+ right_crowns_score_div +'</div>'        );
htmlContent.push('</div>'        );
htmlContent.push(''        );
htmlContent.push('<div class="battleinfo_container" style="display: none; *float:left;">'        );
htmlContent.push('<div class="battleinfo_loader" style="display: none; overflow: hidden; text-align: center; padding: 20px; margin-top: 200px;">'        );
htmlContent.push('	<p class="padded"><img src="images/parts/ajax-loader.gif" /></p>'        );
htmlContent.push('	<p>Loading</p>'        );
htmlContent.push('</div>'        );
htmlContent.push(''        );
htmlContent.push('	<div class="battleinfo">'        );
htmlContent.push('		<div class="attacker">'        );
htmlContent.push('			<div class="battlehero" style="display: none;">'        );
htmlContent.push('				<div class="avatarholder"><a id="attacker_battlehero_avatar_link" href="#"><img id="attacker_battlehero_avatar" src="/uploads/avatars/Citizens/default_male.gif" /></a> Hero</div>'        );
htmlContent.push('				<div class="nameholder"><a id="attacker_nameholder_link" href="#">John Smith</a></div>'        );
htmlContent.push('				<div class="damage">+19</div>'        );
htmlContent.push('			</div>&nbsp;'        );
htmlContent.push('		</div>'        );
htmlContent.push(''        );
htmlContent.push('		<div class="defender">'        );
htmlContent.push('			<div class="battlehero" style="display: none;">'        );
htmlContent.push('				<div class="avatarholder"><a id="defender_battlehero_avatar_link" href="#"><img id="defender_battlehero_avatar" src="/uploads/avatars/Citizens/default_male.gif" /></a> Hero</div>'        );
htmlContent.push('				<div class="nameholder"><a id="defender_nameholder_link" href="#">John Smith</a></div>'        );
htmlContent.push('				<div class="damage">+19</div>'        );
htmlContent.push('			</div>&nbsp;'        );
htmlContent.push('		</div>'        );
htmlContent.push(''        );
htmlContent.push('		<div class="middle">'        );
htmlContent.push('			<p id="battle_countdown" class="countdown">00:00:00</p>'        );
htmlContent.push('			<p class="info padded">until the region can be occupied or secured</p>'        );
htmlContent.push('		</div>		'        );
htmlContent.push(''        );
htmlContent.push(' 		<div style="color:#808080; font-size:14px; margin-top: 50px;">'        );
htmlContent.push(' 			 			 			<a href="/en/region/Liaoning">'        );
htmlContent.push(' 				<img src="images/parts/icon_industry_hospital.gif" alt="" class="flag" />'        );
htmlContent.push(' 			</a>'        );
htmlContent.push(' 			 				 					 				 			 			 			'        );
htmlContent.push(' 		</div>		'        );
htmlContent.push('		<div class="battleaction">'        );
htmlContent.push('			                                                            <div class="middle">'        );
htmlContent.push('                            <a class="btnfight" id="btnfight"  href="javascript:;">Fight</a></div>'        );
htmlContent.push('                                                                                '        );
htmlContent.push('                					</div>'        );
htmlContent.push('		'        );
htmlContent.push('		<div class="battleaction">'        );
htmlContent.push('			<div class="attacker">'        );
htmlContent.push('				<div id="attacking_fighter_template" class="fighter" style="display: none; background: none; padding: 0;">'        );
htmlContent.push('					<div class="fighter" style="display: none;">'        );
htmlContent.push('						<div class="avatarholder"><img src="images/avatar-f-empty.gif" /></div>'        );
htmlContent.push('						<div class="nameholder">John Smith</div>'        );
htmlContent.push('						<div class="damage">+19</div>'        );
htmlContent.push('					</div>'        );
htmlContent.push('				</div>&nbsp;'        );
htmlContent.push('			</div>'        );
htmlContent.push('		'        );
htmlContent.push('			<div class="defender">'        );
htmlContent.push('				<div id="defending_fighter_template" class="fighter" style="display: none; background: none; padding: 0;">'        );
htmlContent.push('					<div class="fighter" style="display: none;">'        );
htmlContent.push('						<div class="avatarholder"><img src="images/avatar-f-empty.gif" /></div>'        );
htmlContent.push('						<div class="nameholder">John Smith</div>'        );
htmlContent.push('						<div class="damage">+19</div>'        );
htmlContent.push('					</div>'        );
htmlContent.push('				</div>&nbsp;'        );
htmlContent.push('			</div>'        );
htmlContent.push('			  '        );
htmlContent.push('			<div id="wall_container">'        );
htmlContent.push('        		<div id="wall_img0" class="over-wall-up" style="height:59px;"></div> '        );
htmlContent.push('		        <div class="secure-value">'        );
htmlContent.push('		            <em>50</em>'        );
htmlContent.push('		            <span>Secure</span>				'        );
htmlContent.push('		        </div>'        );
htmlContent.push('		        '        );
htmlContent.push('			    <div id="battlewall" class="wall bl_3">'        );
htmlContent.push('			            <div class="l_1"><div><span style="height:59px;" id="wall_img1" class="wall_img"></span></div><center id="no_mans_land" class="free"><em id="wall_val0" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			            <div class="l_2"><div><span style="height:59px;" id="wall_img2" class="wall_img"></span></div><center><em id="wall_val1" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			            <div class="l_3"><div><span style="height:59px;" id="wall_img3" class="wall_img"></span></div><center><em id="wall_val2" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			            <div class="l_4"><div><span style="height:59px;" id="wall_img4" class="wall_img"></span></div><center><em id="wall_val3" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			            <div class="l_5"><div><span style="height:59px;" id="wall_img5" class="wall_img"></span></div><center><em id="wall_val4" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			            <div class="l_6"><div><span style="height:59px;" id="wall_img6" class="wall_img"></span></div><center><em id="wall_val5" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			            <div class="l_7"><div><span style="height:0px;" id="wall_img7" class="wall_img"></span></div><center id="underground" class="free"><em id="wall_val6" class="wall_value">155.000</em><span></span></center></div>'        );
htmlContent.push('			    </div>'        );
htmlContent.push('			    '        );
htmlContent.push('		        <div class="conquer-value">'        );
htmlContent.push('		            <span>Conquer</span>'        );
htmlContent.push('		            <em>0</em>				'        );
htmlContent.push('		        </div>'        );
htmlContent.push('		    	<div id="wall_img8" class="over-wall-down" style="height:200px;"></div>'        );
htmlContent.push('		    </div>'        );
htmlContent.push('		</div>'        );
htmlContent.push('	</div>'        );
htmlContent.push('</div>'        );




var script = document.createElement('script');    // create the script element
script.innerHTML = scriptCode.join('\n');         // add the script code to it
scriptCode.length = 0;
document.getElementsByTagName('head')[0].appendChild(script);

var content = document.getElementById("content").innerHTML;
document.getElementById("content").innerHTML = htmlContent.join('\n');
htmlContent.length = 0;

document.getElementById("content").innerHTML += content;
document.getElementById("pvp_header").innerHTML = "";
var total_damage = document.getElementById("total_damage");
//total_damage.style.left="0px";
//total_damage.style.width="691px";
var class_battleinfo = document.getElementsByClassName("battleinfo")[1];
//alert(class_battleinfo.getElementsByTagName("div")[11].innerHTML);
//class_battleinfo.getElementsByTagName("div")[11].appendChild(total_damage);

//alert(pvp_actions.innerHTML);
//class_battleinfo.getElementsByClassName("battleaction")[0].innerHTML = pvp_battle_area.innerHTML;


/*
document.getElementById("content").appendChild(enemy_defeated);
document.getElementById("content").appendChild(rank_up);
document.getElementById("content").appendChild(battle_won);
document.getElementById("content").appendChild(battle_end);
document.getElementById("content").appendChild(battle_loader);
document.getElementById("content").appendChild(weapon_attributes);*/
