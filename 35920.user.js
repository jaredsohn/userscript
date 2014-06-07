// ==UserScript==
// @name           RuneScape Assist
// @namespace      http://userscripts.org/users/63868
// @version        1.3
// @creator        Tim Smart
// @copyright      (c) 2008 Tim Smart
// @include        http://*world*.runescape.com/*
// @require        http://updater.usotools.co.cc/35920.js
// ==/UserScript==

// ==Credits==
// All Content by Tim Smart
// Item and Quest information provided by http://tip.it/
// It is forbidden to distribute this script without this header
// ==/Credits==

Page = {
	last_input: 'user_stats'
};
Menu = {};
Action = {};
Data = {};
var level_exp = [-1, 0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20224, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333, 111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051, 737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294, 4385776, 4842295, 5346332, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431];
Page.init = function () {
	Page.change_layout();
	Menu.init();
	return true;
}
Page.change_layout = function () { //remove ads and top links
	dom.remove(document.getElementById('gametable').getElementsByTagName('tr')[0]);
	return true;
}
Page.open_popup = function (url) {
	if (window.open(url, 'rstools', 'innerHeight=600,innerWidth=950,scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=yes')) {
		return true;
	}
	return false;
}
Menu.height = 255;
Menu.shown = false;
Menu.init = function () {
	var menu_html = '<div id="top_bar"> <span class="white_text">RuneScape Assist</span> - <input id="input_box" type="text" /> <span id="user_lookup" class="link">User Lookup</span> | <span id="item_lookup" class="link">Item Lookup</span> | <span id="npc_lookup" class="link">NPC Lookup</span> | <span id="quest_lookup" class="link">Quest Lookup</span> - <span id="calc_show" class="link">Calculators</span> - <span id="swiftirc" class="link">SwiftIRC Chat</span> <span id="menu_hide_show" class="link">[Show]</span> </div> <center> <div id="user_stats" class="section"><center style="padding:10px 0 0 0;"> <table id="user_table" cellpadding="0" cellspacing="0" summary="User Statistics"> <tbody> <tr> <td skill="attack"></td> <td skill="hitpoints"></td> <td skill="mining"></td> <td skill="firemaking"></td> <td skill="agility"></td> <td skill="crafting"></td> </tr> <tr> <td skill="strength"></td> <td skill="prayer"></td> <td skill="smithing"></td> <td skill="woodcutting"></td> <td skill="herblore"></td> <td skill="fletching"></td> </tr> <tr> <td skill="defence"></td> <td skill="magic"></td> <td skill="fishing"></td> <td skill="farming"></td> <td skill="thieving"></td> <td skill="slayer"></td> </tr> <tr> <td skill="range"></td> <td skill="runecrafting"></td> <td skill="cooking"></td> <td skill="summoning"></td> <td skill="construction"></td> <td skill="hunting"></td> </tr> </tbody> </table><br /> RS Username: <span id="username"></span>&nbsp;&nbsp;&nbsp;&nbsp;Total Level: <span id="total_level"></span> </center></div> <div id="item_stats" class="section"><center style="padding:15px 0 0 0;"></center></div> <div id="npc" class="section"><center style="padding:15px 0 0 0;"></center></div> <div id="quest" class="section"><center style="padding:15px 0 0 0;"></center></div> <div id="calc" class="section"><center style="padding:15px 0 0 0;"> <span class="white_text">Choose from the following:</span><br /> <span id="skill_calc" class="link">Skill Calculators</span><br /> <span id="skill_plan" class="link">Skill Planners</span><br /> <span id="spec_calc" class="link">Special Calculators</span><br /> </center></div> <div id="irc" class="section"> <applet id="ircapplet" code="IRCApplet.class" archive="irc.jar,pixx.jar" codebase="http://webchat.evolu.net/pjirc/v2/" width="100%" height="100%"> <param name="CABINETS" value="" /> <param name="nick" value="SwiftIRC???" /> <param name="fullname" value="PJIRC User" /> <param name="host" value="irc.swiftirc.net" /> <param name="gui" value="pixx" /> <param name="command1" value="join #runescapeassist" /> <param name="asl" value="true" /> <param name="useinfo" value="true" /> <param name="pixx:helppage" value="http://www.pjirc.com/help.php" /> <param name="style:sourcefontrule1" value="all all Serif 12" /> <param name="style:floatingasl" value="true" /> <param name="pixx:timestamp" value="true" /> <param name="pixx:highlight" value="true" /> <param name="pixx:highlightnick" value="true" /> <param name="pixx:nickfield" value="true" /> </applet> </div> </center>';
	var css = 'span.white_text { color:white; } span.link { text-decoration:underline; cursor:pointer; } td#rstools_container { height:24px; border-top:1px solid #FFFFFF; position:relative; background-color:#222222; color:#CCCCCC; font-family:"lucida grande",tahoma,verdana,arial,sans-serif; font-size:12px; overflow:hidden; } div.section { display:none; height:230px; width:100%; text-align:center; } div#top_bar { width:100%; height:22px; border-bottom:1px solid #333333; text-align:center; padding:2px 0 0; position:relative; } input#input_box { height:21px; padding:2px 0 0 0; background-color:#666666; font-size:11px; color:#EEEEEE; border:1px solid #CCCCCC; } span#menu_hide_show { position:absolute; top:4px; right:5px; } table#user_table { height:128px; width:326px; display:block; background-image:url("http://img115.imageshack.us/img115/4272/statssl3.jpg"); background-repeat:no-repeat; background-position:top left; } table.results_table td { text-align:left; vertical-align:top; padding:0 0 0 10px; } table.results_table span { color:#CCCCCC; font-size:12px; } table#user_table td { text-align:right; font-family:arial, sans-serif !important; font-size:10px; width:43px; height:32px; padding:0 12px 0 0; color:yellow; } span#username, span#total_level { color:yellow; } div#item_container { width:634px; position:relative; background-color:#261C09; border:1px solid #3F3320; padding:4px; text-align:left; color:#D4CEC3; font-size:12px; font-family:Arial,Helvetica,FreeSans,sans-serif; } .subsectionHeader { background:transparent url("http://www.runescape.com/img/main/layout/subsection_header_bg.png") repeat-x scroll 0 0; color:#F3C334; font-weight:bold; height:26px; line-height:24px; text-align:center; } #item_additional { height:112px; } .inner_brown_box { background-color:#392C14; padding:8px; text-align:left; } #item_image { background:#2C210D none repeat scroll 0 0; border:1px solid #3E321F; float:right; margin-top:8px; } .spaced_span { margin:0 30px; } span.rise { color:#319631; } span.drop { color:#C02020; } .clear { clear:both; font-size:0; height:0; }';
	GM_addStyle(css); //Rearrange gametable
	var table = dom.get('gametable'),
	tr = table.getElementsByTagName('tr')[0],
	td = tr.getElementsByTagName('td')[0];
	dom.remove(td);
	tr = table.getElementsByTagName('tr')[1];
	td = tr.getElementsByTagName('td')[0];
	td.colspan = '';
	td.id = 'rstools_container';
	td.innerHTML = menu_html; //Get html from pre-formatted containers
	Data.calc_html = dom.get('calc').innerHTML; //Add events to menu
	Menu.add_events();
	return true;
}
Menu.add_events = function () {
	event.add('input_box', 'keydown', function (event) {
		if (event.keyCode === 27) {
			Menu.toggle();
			return;
		} else if (event.keyCode === 13) {
			if (Menu.shown === false) Menu.toggle();
			switch (Page.last_input) {
			case 'item_stats':
				Action.get_item_stats(dom.get('input_box').value);
				break;
			case 'npc':
				Action.get_npc(dom.get('input_box').value);
				break;
			case 'quest':
				Action.get_quests(dom.get('input_box').value);
				break;
			default:
				Action.get_user_stats(dom.get('input_box').value);
				break;
			}
			Menu.section(Page.last_input);
		}
	});
	event.add('user_lookup', 'click', function () {
		if (Menu.shown === false) {
			Menu.toggle();
		}
		Page.last_input = 'user_stats';
		Action.get_user_stats(dom.get('input_box').value);
		Menu.section('user_stats');
		return true;
	});
	event.add('item_lookup', 'click', function () {
		if (Menu.shown === false) {
			Menu.toggle();
		}
		Page.last_input = 'item_stats';
		Action.get_item_stats(dom.get('input_box').value);
		Menu.section('item_stats');
		return true;
	});
	event.add('npc_lookup', 'click', function () {
		if (Menu.shown === false) {
			Menu.toggle();
		}
		Page.last_input = 'npc';
		Menu.section('npc');
		Action.get_npc(dom.get('input_box').value);
		return true;
	});
	event.add('quest_lookup', 'click', function () {
		if (Menu.shown === false) {
			Menu.toggle();
		}
		Page.last_input = 'quest';
		Menu.section('quest');
		Action.get_quests(dom.get('input_box').value);
		return true;
	});
	event.add('calc_show', 'click', function () {
		if (Menu.shown === false) {
			Menu.toggle();
		}
		Action.show_calcs();
		Menu.section('calc');
		return true;
	});
	event.add('swiftirc', 'click', function () {
		if (Menu.shown === false) {
			Menu.toggle();
		}
		Menu.section('irc');
		return true;
	});
	event.add('menu_hide_show', 'click', function () {
		Menu.toggle();
	});
	return true;
}
Data.chat_started = false;
Menu.section = function (section) {
	var menu = dom.get('rstools_container');
	var divs = dom.get_by_class('section', menu);
	for (var i = 0; i < divs.length; i++) {
		var div = divs[i];
		if (div.id == 'irc' && Data.chat_started) {
			div.style.height = 0 + 'px';
		} else {
			div.style.display = 'none';
		}
	}
	for (var i = 0; i < divs.length; i++) {
		var div = divs[i];
		if (div.id == section) {
			div.style.display = 'block';
			Menu.current_section = section;
			if (section == 'irc') {
				div.style.height = '';
				Data.chat_started = true;
			}
			return true;
		}
	}
	Menu.current_section = false;
	return false;
}
Menu.toggle = function () {
	var table = dom.get('gametable');
	var menu = dom.get('rstools_container');
	if (Menu.shown === false) {
		if (Menu.current_section) {
			if (Menu.current_section == 'irc' && Data.chat_started) {
				dom.get(Menu.current_section).style.height = '';
			} else {
				dom.get(Menu.current_section).style.display = 'block';
			}
		} else {
			Menu.current_section = 'user_stats';
			dom.get(Menu.current_section).style.display = 'block';
		}
		dom.get('menu_hide_show').innerHTML = '[Hide]';
		menu.style.height = Menu.height + 'px';
		Menu.shown = true;
		return true;
	} else {
		if (Menu.current_section) {
			if (Menu.current_section == 'irc') {
				dom.get(Menu.current_section).style.height = '0px';
			} else {
				dom.get(Menu.current_section).style.display = 'none';
			}
		}
		dom.get('menu_hide_show').innerHTML = '[Show]';
		menu.style.height = 24 + 'px';
		Menu.shown = false;
		return true;
	}
	return false;
}
Action.show_page = function (url, element) {
	element = dom.get(element) || dom.get(Menu.current_section);
	var html = '<iframe src="' + url + '" style="border:0;width:100%;height:100%;"></iframe>';
	element.style.padding = '0 0 0 0';
	element.innerHTML = html;
	return true;
}
Action.get_item_stats = function (item) {
	var center = dom.get('item_stats').getElementsByTagName('center')[0];
	center.style.padding = '15px 0 0 0';
	center.innerHTML = 'Loading...';
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://itemdb-rs.runescape.com/results.ws?price=all&query=' + encodeURIComponent( item ),
		onload: function (object) {
			var html = object.responseText,
				link_reg = new RegExp('"(http://services\.runescape\.com/m=itemdb_rs/.*?)"> (.*?)</a>', "g"),
				items = [],
				name_re = /"> (.+?)<\/a>/;

			html.replace( link_reg, function( $0, $1, $2 ) {
				items.push({
					href: $1,
					name: $2
				});
				return $0;
			});

			if ( items.length <= 0 ) {
				dom.get('item_stats').getElementsByTagName('center')[0].innerHTML = '<span class="error">No Results.</span>';
				return false;
			}

			html = '<div id="item_results" style="display:none;"><span class="white_text">Choose from the following:</span><br />';
			for (var i = 0; i < 12; i++) {
				if (items[i]) {
					item = items[i];
					html = html + '<span class="link" href="' + item.href + '">' + item.name + '</span><br />';
				}
			}
			html = html + '</div>';
			var center = dom.get('item_stats').getElementsByTagName('center')[0];
			center.innerHTML = html; //Assign events
			var results = dom.get_by_class('link', dom.get('item_results'));
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				event.add(result, 'click', function () {
					Action.show_item(this.getAttribute('href'));
					Data.item_name = this.innerHTML;
					return true;
				});
			}
			dom.get('item_results').style.display = '';
			return true;
		}
	});
}
Action.show_item = function ( href ) {
	Data.item = href;
	var center = dom.get('item_stats').getElementsByTagName('center')[0];
	center.innerHTML = 'Loading...';
	GM_xmlhttpRequest({
		method: "GET",
		url: Data.item,
		onload: function (object) {
			var html = object.responseText;
			var html_reg = new RegExp('<div class="brown_box main_ge_page vertically_spaced">((.|\\n)*?<br class="clear">\\n</div>) </div>');
			if (html = html.match(html_reg)) {
				html = html[1]; //Update page
				var div = document.createElement('div');
				div.id = 'item_container';
				div.innerHTML = html;
				var center = dom.get('item_stats').getElementsByTagName('center')[0];
				center.innerHTML = '';
				center.appendChild(div);
				center.innerHTML += '<br /><span class="link" id="item_more">Show more information...</span>';
				event.add('item_more', 'click', function () {
					Action.show_page('http://runescape.wikia.com/wiki/' + Data.item_name + '#siteNotice', center);
				});
			} else {
				dom.get('item_stats').getElementsByTagName('center')[0].innerHTML = '<span class="error">No Results.</span>';
				return false;
			}
			return true;
		}
	});
}
Action.get_user_stats = function (user) {
	user = user.substr(0, 12);
	var table = dom.get('user_table');
	var tds = table.getElementsByTagName('td');
	for (var i = 0; i < tds.length; i++) {
		var td = tds[i];
		td.innerHTML = '';
	}
	dom.get('total_level').innerHTML = '';
	dom.get('username').innerHTML = 'Loading...';
	Data.username = user;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://hiscore.runescape.com/index_lite.ws?player=' + user,
		onload: function (object) {
			var raw_data = object.responseText.split('\n');
			if (20 > raw_data.length) {
				dom.get('username').innerHTML = 'Not Found!';
				return false;
			}
			var data = [];
			var c_skill = [];
			for (var i = 0; i < 25; i++) {
				var skill = {};
				c_skill = raw_data[i];
				c_skill = c_skill.split(',');
				skill.rank = c_skill[0];
				skill.level = c_skill[1];
				skill.exp = c_skill[2];
				data.push(skill);
			}
			var skills = {};
			skills.total = data[0];
			skills.attack = data[1];
			skills.defence = data[2];
			skills.strength = data[3];
			skills.hitpoints = data[4];
			skills.range = data[5];
			skills.prayer = data[6];
			skills.magic = data[7];
			skills.cooking = data[8];
			skills.woodcutting = data[9];
			skills.fletching = data[10];
			skills.fishing = data[11];
			skills.firemaking = data[12];
			skills.crafting = data[13];
			skills.smithing = data[14];
			skills.mining = data[15];
			skills.herblore = data[16];
			skills.agility = data[17];
			skills.thieving = data[18];
			skills.slayer = data[19];
			skills.farming = data[20];
			skills.runecrafting = data[21];
			skills.hunting = data[22];
			skills.construction = data[23];
			skills.summoning = data[24]; //Insert into page
			var username = dom.get('username');
			username.innerHTML = Data.username;
			var table = dom.get('user_table');
			var tds = table.getElementsByTagName('td');
			for (var i = 0; i < tds.length; i++) {
				var td = tds[i];
				var skill = '';
				if (td.getAttribute('skill')) {
					skill = td.getAttribute('skill');
					var c_skill = eval('skills.' + skill);
					c_skill.level = parseInt(c_skill.level);
					if (99 > c_skill.level && 0 < c_skill.level) {
						var next_level = level_exp[c_skill.level + 1] - parseInt(c_skill.exp);
					} else {
						var next_level = 0;
					} //Replace -1's
					if (c_skill.level != -1) {
						td.innerHTML = c_skill.level;
						td.title = 'Rank:' + c_skill.rank + '; Experience: ' + c_skill.exp + '; Exp to Next Level: ' + next_level;
					} else {
						td.innerHTML = '';
						td.title = '';
					}
				}
			}
			if (skills.total.level == -1) {
				var total_level = dom.get('total_level');
				total_level.innerHTML = '';
				total_level.title = '';
			} else {
				var total_level = dom.get('total_level');
				total_level.innerHTML = skills.total.level;
				total_level.title = 'Rank: ' + skills.total.rank + '; Experience: ' + skills.total.exp;
			}
			Data.skills = skills;
			return true;
		}
	});
	return true;
}
Action.get_npc = function (q) {
	q = escape(q);
	Data.npc = q;
	var center = dom.get('npc').getElementsByTagName('center')[0];
	center.style.padding = '15px 0 0 0';
	center.innerHTML = 'Loading...';
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.tip.it/runescape/index.php?rs2monster&orderby=2&levels=All&keywords=' + Data.npc,
		onload: function (object) {
			var center = dom.get('npc').getElementsByTagName('center')[0];
			var html = object.responseText;
			var list_regex = new RegExp('<td>[0-9]+?</td>(.|\\n|\\r)*?<a href="\\?rs2monster_id=[0-9]*?">.*?</a>', 'g');
			html = html.match(list_regex);
			if (!html) {
				center.innerHTML = 'No Results.';
				return false;
			}
			var results = [];
			for (var i = 0; i < html.length; i++) {
				var c_html = html[i];
				var result = {};
				if (result.name = c_html.match(new RegExp('<a href="\\?rs2monster_id=[0-9]*?">(.*?)</a>'))[1]) {
					result.level = parseInt(c_html.match(new RegExp('<td>([0-9]+?)</td>'))[1]);
					result.id = c_html.match(new RegExp('<a href="\\?rs2monster_id=([0-9]*?)">.*?</a>'))[1];
					results.push(result);
				}
			}
			if (results.length === 0) {
				center.innerHTML = 'No Results.';
				return false;
			}
			var table_html = '<span class="white_text">Choose from the following:</span><br /><table class="results_table" id="npc_table" cellpadding="0" cellspacing="0" summary="NPC Links"><tbody><tr><td>';
			if (results.length > 36) {
				results.length = 36;
			}
			var column = 1;
			var row = 1;
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				if (row > 12) {
					table_html = table_html + '</td><td>';
					row = 1;
					column++;
				}
				table_html = table_html + '<span class="link" npc="' + result.id + '">' + result.name + ' Lvl:' + result.level + '</span><br />'
				row++;
			}
			table_html = table_html + '</td></tr></table>';
			center.style.display = 'none';
			center.innerHTML = table_html;
			var spans = dom.get('npc_table').getElementsByTagName('span');
			for (var i = 0; i < spans.length; i++) {
				var span = spans[i];
				event.add(span, 'click', function () {
					var center = dom.get('npc').getElementsByTagName('center')[0];
					var html = '<iframe src="http://www.tip.it/runescape/?rs2monster_id=' + this.getAttribute('npc') + '#content" style="border:0;width:100%;height:100%;"></iframe>';
					center.innerHTML = html;
					center.style.padding = '';
					return true;
				});
			}
			center.style.display = '';
			return true;
		}
	});
	return true;
}
Action.get_quests = function (q) {
	q = escape(q);
	Data.quest = q;
	var center = dom.get('quest').getElementsByTagName('center')[0];
	center.style.padding = '15px 0 0 0';
	center.innerHTML = "Loading...";
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.tip.it/runescape/index.php?rs2quest&orderby=1&keywords=' + Data.quest,
		onload: function (object) {
			var center = dom.get('quest').getElementsByTagName('center')[0];
			var html = object.responseText;
			var list_regex = new RegExp('<a href="(index\\.php\\?|\\?)rs2quest_id=[0-9]+?(#.+?)??">.*?</a>', 'g');
			html = html.match(list_regex);
			if (!html) {
				center.innerHTML = 'No Results.';
				return false;
			}
			var results = [];
			for (var i = 0; i < html.length; i++) {
				var c_html = html[i];
				var result = {};
				if (result.name = c_html.match(new RegExp('">(.*?)</a>'))[1]) {
					result.id = c_html.match(new RegExp('\\?rs2quest_id=([0-9]+?(#.+?)??)"'))[1];
					results.push(result);
				}
			}
			if (results.length === 0) {
				center.innerHTML = 'No Results.';
				return false;
			}
			var table_html = '<span class="white_text">Choose from the following:</span><br /><table class="results_table" id="quest_table" cellpadding="0" cellspacing="0" summary="NPC Links"><tbody><tr><td>';
			if (results.length > 36) {
				results.length = 36;
			}
			var column = 1;
			var row = 1;
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				if (row > 12) {
					table_html = table_html + '</td><td>';
					row = 1;
					column++;
				}
				table_html = table_html + '<span class="link" quest="' + result.id + '">' + result.name + '</span><br />'
				row++;
			}
			table_html = table_html + '</td></tr></table>';
			center.style.display = 'none';
			center.innerHTML = table_html;
			var spans = dom.get('quest_table').getElementsByTagName('span');
			for (var i = 0; i < spans.length; i++) {
				var span = spans[i];
				event.add(span, 'click', function () {
					var center = dom.get('quest').getElementsByTagName('center')[0];
					var html = '<iframe src="http://www.tip.it/runescape/?rs2quest_id=' + this.getAttribute('quest') + '#content" style="border:0;width:100%;height:100%;"></iframe>';
					center.innerHTML = html;
					center.style.padding = '';
					return true;
				});
			}
			center.style.display = '';
			return true;
		}
	});
}
Action.show_calcs = function () {
	dom.get('calc').innerHTML = Data.calc_html;
	event.add('skill_calc', 'click', function () {
		Action.show_page('http://www.tip.it/runescape/?page=skill_calculators.htm#content', 'calc');
		return true;
	});
	event.add('skill_plan', 'click', function () {
		Action.show_page('http://www.tip.it/runescape/?page=skill_planners.htm#content', 'calc');
		return true;
	});
	event.add('spec_calc', 'click', function () {
		Action.show_page('http://www.tip.it/runescape/?page=special_calculators.htm#content', 'calc');
		return true;
	});
}
/**
 * Document elements
 * 
 * @var	object
 */
var dom = {
	get: function (element) {
		if (typeof element === 'string') {
			return document.getElementById(element);
		} else if (element.nodeType) {
			return element;
		} else {
			return false;
		}
	},
	get_by_class: function (string, element) {
		element = element || document;
		if (element.nodeType) {
			element = element;
		} else if (this.get(element)) {
			element = this.get(element);
		} else {
			return false;
		}
		var elements = element.getElementsByTagName('*');
		var result_elements = [];
		var count = 0;
		var re = new RegExp('\\b' + string + '\\b', 'i');
		for (var i = 0; i < elements.length; i++) {
			if (elements[i].className.match(re)) {
				result_elements.push(elements[i]);
				count++;
			}
		}
		return result_elements;
	},
	add: function (element, destination) {
		var element = this.get(element);
		var destination = this.get(destination);
		destination.appendChild(element);
	},
	remove: function (element) {
		var element = this.get(element);
		element.parentNode.removeChild(element);
	},
	replace: function (elementOne, elementTwo) {
		elementOne = this.get(elementOne);
		var theParent = elementOne.parentNode;
		this.remove(elementOne);
		this.add(elementTwo, theParent);
	}
};
/**
 * Events
 * 
 * @var	object
 */
var event = {
	add: function () {
		if (window.addEventListener) {
			return function (element, type, fn) {
				dom.get(element).addEventListener(type, fn, false);
			};
		} else if (window.attachEvent) {
			return function (element, type, fn) {
				var fn2 = function () {
					fn.call(dom.get(element), window.event);
				};
				dom.get(element).attachEvent('on' + type, fn2);
			};
		}
	} (),
	remove: function () {
		if (window.removeEventListener) {
			return function (element, type, fn) {
				dom.get(element).removeEventListener(type, fn, false);
			};
		} else if (window.detachEvent) {
			return function (element, type, fn) {
				var fn2 = function () {
					fn.call(dom.get(element), window.event);
				};
				dom.get(element).detachEvent('on' + type, fn2);
			};
		}
	} ()
};
Page.init();