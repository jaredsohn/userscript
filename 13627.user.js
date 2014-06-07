// ==UserScript==
// @name           Wowhead Favorites
// @namespace      wowhead
// @description    Allows you to save your Favorite Pages
// @include        http://*wowhead.com/*
// ==/UserScript==

RefreshData()

function RefreshData() {
	if(document.getElementById('favorites-tab')) {
		document.getElementById('favorites-tab').parentNode.removeChild(document.getElementById('favorites-tab'));
	}

	var mn_items=[];
	var mn_spells=[];
	var mn_npcs=[];
	var mn_searches=[];
	var mn_posts=[];
	var mn_quests=[];
	var mn_zones=[];
	var mn_factions=[];
	var mn_objects=[];
	var mn_builds=[];
	var mn_profiles=[];
	var mn_maps=[];
	var mn_screenshots=[];
	var mn_other=[];

	var mn_extra=[
	];
	
	var mn_path=[[5, 'Favorites',, mn_extra]];

	if(GM_getValue('items', 0) != 0) { 
		mn_extra.push([0, 'Items',, mn_items]) 
		var items = GM_getValue('items', 0);
		if (items != 0) {
			var item_list = items.split('|');
			for (var i = 0; i < item_list.length; i++) {
				item = item_list[i].split(',');
				mn_items.push([0, unescape(item[0]), '?'+item[1]]);
			}
		}
	}
	if(GM_getValue('spells', 0) != 0) { 
		mn_extra.push([0, 'Spells',, mn_spells]) 
		var spells = GM_getValue('spells', 0);
		if (spells != 0) {
			var spell_list = spells.split('|');
			for (var i = 0; i < spell_list.length; i++) {
				spell = spell_list[i].split(',');
				mn_spells.push([0, unescape(spell[0]), '?'+spell[1]]);
			}
		}
	}
	if(GM_getValue('npcs', 0) != 0) { 
		mn_extra.push([0, 'NPCs',, mn_npcs]) 
		var npcs = GM_getValue('npcs', 0);
		if (npcs != 0) {
			var npc_list = npcs.split('|');
			for (var i = 0; i < npc_list.length; i++) {
				npc = npc_list[i].split(',');
				mn_npcs.push([0, unescape(npc[0]), '?'+npc[1]]);
			}
		}
	}
	if(GM_getValue('searches', 0) != 0) { 
		mn_extra.push([0, 'Searches',, mn_searches]) 
		var searches = GM_getValue('searches', 0);
		if (searches != 0) {
			var search_list = searches.split('|');
			for (var i = 0; i < search_list.length; i++) {
				search = search_list[i].split(',');
				mn_searches.push([0, unescape(search[0]), '?'+search[1]]);
			}
		}
	}
	if(GM_getValue('posts', 0) != 0) { 
		mn_extra.push([0, 'Forum Topics',, mn_posts]) 
		var posts = GM_getValue('posts', 0);
		if (posts != 0) {
			var post_list = posts.split('|');
			for (var i = 0; i < post_list.length; i++) {
				post = post_list[i].split(',');
				mn_posts.push([0, unescape(post[0]), '?'+post[1]]);
			}
		}
	}
	if(GM_getValue('quests', 0) != 0) { 
		mn_extra.push([0, 'Quests',, mn_quests])
		var quests = GM_getValue('quests', 0);
		if (quests != 0) {
			var quest_list = quests.split('|');
			for (var i = 0; i < quest_list.length; i++) {
				quest = quest_list[i].split(',');
				mn_quests.push([0, unescape(quest[0]), '?'+quest[1]]);
			}
		}
	}
	if(GM_getValue('zones', 0) != 0) { 
		mn_extra.push([0, 'Zones',, mn_zones]) 
		var zones = GM_getValue('zones', 0);
		if (zones != 0) {
			var zone_list = zones.split('|');
			for (var i = 0; i < zone_list.length; i++) {
				zone = zone_list[i].split(',');
				mn_zones.push([0, unescape(zone[0]), '?'+zone[1]]);
			}
		}
	}
	if(GM_getValue('factions', 0) != 0) { 
		mn_extra.push([0, 'Factions',, mn_factions]) 
		var factions = GM_getValue('factions', 0);
		if (factions != 0) {
			var faction_list = factions.split('|');
			for (var i = 0; i < faction_list.length; i++) {
				faction = faction_list[i].split(',');
				mn_factions.push([0, unescape(faction[0]), '?'+faction[1]]);
			}
		}
	}
	if(GM_getValue('objects', 0) != 0) { 
		mn_extra.push([0, 'Objects',, mn_objects]) 
		var objects = GM_getValue('objects', 0);
		if (objects != 0) {
			var object_list = objects.split('|');
			for (var i = 0; i < object_list.length; i++) {
				object = object_list[i].split(',');
				mn_objects.push([0, unescape(object[0]), '?'+object[1]]);
			}
		}
	}
	if(GM_getValue('builds', 0) != 0) { 
		var builds = GM_getValue('builds', 0);
		if (builds != 0) {
			var build_list = builds.split('|');
			for (var i = 0; i < build_list.length; i++) {
				build = build_list[i].split(',');
				mn_builds.push([0, unescape(build[0]), '?'+build[1]]);
			}
		}
		mn_extra.push([0, 'Talent Builds',, mn_builds]) 
	}
	if(GM_getValue('profiles', 0) != 0) { 
		mn_extra.push([0, 'User Profiles',, mn_profiles]) 
		var profiles = GM_getValue('profiles', 0);
		if (profiles != 0) {
			var profile_list = profiles.split('|');
			for (var i = 0; i < profile_list.length; i++) {
				profile = profile_list[i].split(',');
				mn_profiles.push([0, unescape(profile[0]), '?'+profile[1]]);
			}
		}
	}
	if(GM_getValue('maps', 0) != 0) { 
		mn_extra.push([0, 'Maps',, mn_maps]) 
		var maps = GM_getValue('maps', 0);
		if (maps != 0) {
			var map_list = maps.split('|');
			for (var i = 0; i < map_list.length; i++) {
				map = map_list[i].split(',');
				mn_maps.push([0, unescape(map[0]), '?'+map[1]]);
			}
		}
	}
	if(GM_getValue('screenshots', 0) != 0) { 
		mn_extra.push([0, 'Screenshots',, mn_screenshots]) 
		var screenshots = GM_getValue('screenshots', 0);
		if (screenshots != 0) {
			var screenshot_list = screenshots.split('|');
			for (var i = 0; i < screenshot_list.length; i++) {
				screenshot = screenshot_list[i].split(',');
				mn_screenshots.push([0, unescape(screenshot[0]), '?'+screenshot[1]]);
			}
		}
	}
	if(GM_getValue('others', 0) != 0) { 
		mn_extra.push([0, 'Other',, mn_other]) 
		var others = GM_getValue('others', 0);
		if (others != 0) {
			var other_list = others.split('|');
			for (var i = 0; i < other_list.length; i++) {
				other = other_list[i].split(',');
				mn_other.push([0, unescape(other[0]), '?'+other[1]]);
			}
		}
	}
	

	if(window.location.href == 'http://www.wowhead.com/') {
		unsafeWindow.Menu.addButtons(unsafeWindow.ge('h43jv6jk346'), mn_path);
	} else {
		var dl = unsafeWindow.ce('dl');
		for(var i = 0; i < mn_path.length; ++i) {
			var dt = unsafeWindow.ce('dt');
			dt.id='favorites-tab';
			var a = unsafeWindow.ce('a');
			var ins = unsafeWindow.ce('ins');
			var sp = unsafeWindow.ce('span');
			var firstLetter = unsafeWindow.ce('big');

			if(mn_path[i][0] != -1) {
				a.menu = mn_path[i][3];
				a.onmouseover = unsafeWindow.Menu.show;
				a.onmouseout = unsafeWindow.Menu.hide;
			}

			if(mn_path[i][2]) {
				a.href = mn_path[i][2];
			} else {
				a.href = 'javascript:;';
				unsafeWindow.ns(a);
				a.style.cursor = 'default';
			}

			unsafeWindow.ae(firstLetter, unsafeWindow.ct(mn_path[i][1].charAt(0)));
			unsafeWindow.ae(ins, firstLetter);
			unsafeWindow.ae(ins, unsafeWindow.ct(mn_path[i][1].substr(1)));
			unsafeWindow.ae(a, ins);
			unsafeWindow.ae(a, sp);
			unsafeWindow.ae(dt, a);
			unsafeWindow.ae(dl, dt);
		}
	unsafeWindow.ae(unsafeWindow.ge('ptewhjkst46'), dl);
	}
}

function AddData(type, name, url) {
	var type_list = GM_getValue(type, 0);
	var data_list = '';
	if(type_list != 0) {
		if(!Exists(type, url.split("#")[0])) {
			if(type_list[type_list.length-1] == "|") { data_list = type_list + name+','+url.split("#")[0]; }
			else { data_list = type_list + "|" + name+','+url.split("#")[0]; }
		} else { 
			data_list = type_list
		}
	} else {
		var data_list = name+','+url.split("#")[0]
	}
	GM_setValue(type, data_list);
}

function RemoveData(type, name, url) {
	var type_list = GM_getValue(type, 0);
	var data_list;
	if(type_list != 0) {
		data_list = type_list.replace('|'+name+','+url.split("#")[0], '');
		if (data_list == type_list) { data_list = type_list.replace(name+','+url.split("#")[0]+'|', ''); }
		if (data_list == type_list) { data_list = type_list.replace(name+','+url.split("#")[0], 0); }
		data_list = data_list.replace('||', '|');
	} else {
		data_list = 0;
	}
	GM_setValue(type, data_list);
}

function Exists(type, url) {
	var type_list = GM_getValue(type, 0)
	if (type_list == 0) { return false };
	var type_list = type_list.split("|")
	for (var i = 0; i < type_list.length; i++) {
		if (type_list[i].split(",")[1] == url.split("#")[0]) { return true; }
	}
	return false;
}

function ToggleData(type, name, url, link) {
	var type_list = GM_getValue(type, 0);
	if(Exists(type, url)) {
		link.innerHTML='[+]'
		RemoveData(type, name, url)
		RefreshData()
	} else {
		link.innerHTML='[-]'
		AddData(type, name, url)
		RefreshData()
	}
}

if(window.location.href.split('#')[0].match("user=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('profiles', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('profiles', escape(window.location.href.split('=')[1]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}
if(window.location.href.split('#')[0].match("item=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('items', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('items', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("npc=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('npcs', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('npcs', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("object=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('objects', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('objects', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("quest=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('quests', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('quests', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("spell=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('spells', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('spells', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("zone=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('zones', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('zones', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("faction=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('factions', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('factions', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("maps")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('maps', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ var test = prompt("Describe the Zone"); ToggleData('maps', escape(test), document.getElementById("link-to-this-map").href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementById("link-to-this-map").parentNode, small);
}

if(window.location.href.split('#')[0].match("talent=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('builds', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('builds', escape(document.title.split("-")[0]), document.getElementById("mtwtcLink").href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementById("mtwtcLink").parentNode, small);
}


if(window.location.href.split('#')[0].match("forums&topic=")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('posts', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('posts', escape(document.title.split("-")[0]), window.location.href.split('?')[1].split("#")[0], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("screenshot=view")) { 
	var small = unsafeWindow.ce('small');
	small.innerHTML = ' ';
	var a = unsafeWindow.ce('a');
	if(Exists('screenshots', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ ToggleData('screenshots', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(small, a);
	unsafeWindow.ae(document.getElementsByTagName("h1")[1], small);
}

if(window.location.href.split('#')[0].match("&filter")) { 
	var a = unsafeWindow.ce('a');
	if(Exists('searches', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ var test = prompt("Name your Filter"); ToggleData('searches', escape(test), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(document.getElementById("main-precontents").getElementsByTagName("div")[0], a);
}

if(!window.location.href.split('#')[0].match("screenshot=view") && !window.location.href.split('#')[0].match("forums&topic=") && !window.location.href.split('#')[0].match("talent=") && !window.location.href.split('#')[0].match("maps") && !window.location.href.split('#')[0].match("faction=") && !window.location.href.split('#')[0].match("zone=") && !window.location.href.split('#')[0].match("spell=") && !window.location.href.split('#')[0].match("quest=") && !window.location.href.split('#')[0].match("user=") && !window.location.href.split('#')[0].match("item=") && !window.location.href.split('#')[0].match("npc=") && !window.location.href.split('#')[0].match("object=") && !window.location.href.split('#')[0].match("&filter")) { 
	var a = unsafeWindow.ce('a');
	if(Exists('others', window.location.href.split('?')[1])) {
		a.innerHTML='[-]';
		a.href='javascript:;';
	} else {
		a.innerHTML='[+]';
		a.href='javascript:;';
	}
	a.addEventListener('click', function(){ToggleData('others', escape(document.title.split("-")[0]), window.location.href.split('?')[1], this); }, 'false');
	unsafeWindow.ae(document.getElementById("kbl34h6b43"), a);
}

