// ==UserScript==
// @name        4chan /vg/ Puzzle and Dragons General Monster Icons
// @namespace   cc@PF
// @include     http://boards.4chan.org/vg/res/*
// @include     https://boards.4chan.org/vg/res/*
// @include     https://boards.4chan.org/r/res/*
// @version     0.1.4
// @grant       GM_addStyle
// @grant       GM_getResourceText
// @grant       GM_getResourceURL
// @require       http://gdriv.es/vgpadg/lzw.js
// @require       http://gdriv.es/vgpadg/base64.js
// @require       http://gdriv.es/vgpadg/DataStream.js
// @resource       PADGCSS http://gdriv.es/vgpadg/4chan_vg_padg.css
// @resource       PADGIMG http://gdriv.es/vgpadg/allmonsters_60.jpg
// @priority       6
// @run-at         document-end
// ==/UserScript==

const MAX_ICONS_PER_POST = 24;
const TILE_SIZE = 60;
const ATLAS_SIZE = 32;
const MAX_TEAM_SIZE = 6;
const MAX_MONSTER_ID = 1600;
const MAX_VALUES = {
	level: 99,
	skill: 99,
	awoken: 9,
	plus: 99,
};


// [m:643;lv:max;s:max;a:max;p:99,99,99]
var monster_regex = /\[m:(\d{1,4})(?:;([^\]\s]*))?\]/;
var team_regex = /\[mteam:([\w\+\/\=]+)\]/;
var lastmID = "m0";
var numMons = 0;
var numTeams = 0;

var monsterDef = [
	'id', 'uint16',
	'level', 'uint8',
	'skill', 'uint8',
	'awoken', 'uint8',
	'plus', ['[]', 'uint8', '3']
];
var teamDef = [
	'len', 'uint8',
	'monsters', ['[]', monsterDef, function(s,ds){ return s.len > MAX_TEAM_SIZE ? MAX_TEAM_SIZE : s.len; }]
];

var subject = document.querySelector("div.op .subject");
if (/*1 ||*/ subject && subject.innerHTML.match(/puzzle.*drag/i)) {
	begin();
}

function begin() {
	console.log("[PADG] Starting");
	if (!(typeof(GM_getResourceText) === 'undefined')) {
		//console.log("GM:", GM_getResourceText);
		var localcss = GM_getResourceText("PADGCSS");
		GM_addStyle(localcss);
	}
	var mons_imgurl = null;
	if (!(typeof(chrome) === 'undefined')) {
		mons_imgurl = chrome.extension.getURL("allmonsters_60.jpg")
	} else if (!(typeof(GM_getResourceURL) === 'undefined')) {
		mons_imgurl = GM_getResourceURL("PADGIMG");
	}
	console.log("[PADG] IMGURL:", mons_imgurl);
	GM_addStyle("a.mon[data-ready='1'] { background-image: url('"+mons_imgurl+"'); }");

	var docblocks = document.querySelectorAll("blockquote.postMessage");

	parseBlocks(docblocks);
	document.addEventListener('DOMNodeInserted', onNodeInsert, false);
	console.log("[PADG] Finished first pass");
}

function onNodeInsert(e) {
	if (!e || !e.target)
		return;
	if (e.target.nodeName == 'DIV' && e.target.className.match(/\breplyContainer\b/)) {
		//console.log("add", e.target);
		var blocks = e.target.querySelectorAll("blockquote.postMessage");
		if (blocks.length) {
			parseBlocks(blocks);
		}
	}
}

function viewMonsterPage(e) {
	var mon = e.target;
	var url = "http://www.puzzledragonx.com/en/monster.asp?n="+mon.dataset.id;
	var win = unsafeWindow.open(url, '_blank');
}



function parseBlocks(blocks) {
	var scale = 1;
	for (var i = 0; i < blocks.length; i++) {
		var block = blocks[i];

		try {
			parseBlock(block);
		} catch(e) {
			console.log("[PADG] parseBlock error:", e, block);
		}
	}
}

function parseBlock(block) {
	var mID = this.id;
	if (mID > lastmID || true) {
		lastmID = mID;

		var text = block.innerHTML;
		var numChanged = 0;
		//text = text.replace(/<wbr>/g, "");
		//text = text.replace(/(\[[^\[\]]*)<wbr>([^\[\]]*\])/g, "$1$2");
		text = text.replace(/<wbr>(?=[^\[]*?\])/g, ""); // remove 4chan wordwrap breaks that occur within square brackets
		//text = text.replace(/\]<wbr>\[m:/g, "][m:");
		//text = text.replace(/\"http/g, '"hXXp'); // preserve existing links

		var match = monster_regex.exec(text);
		while (match != null && numChanged < MAX_ICONS_PER_POST) {
			//console.log("MATCH:", match);
			//text = text.replace(match[0], '<img class="mon" src="http://www.puzzledragonx.com/en/img/thumbnail/'+match[1]+'.png">');

			var mon = document.createElement('a');
			mon.id = "mon" + (numMons++);
			mon.className = "mon";
			mon.dataset.id = match[1];
			if (match[2])
				mon.dataset.extra = match[2];

			text = text.replace(match[0], mon.outerHTML);
			match = monster_regex.exec(text);
			//match = null;
			numChanged++;
		}

		match = team_regex.exec(text);
		while (match != null && numChanged < MAX_ICONS_PER_POST) {
			//console.log("TEAM MATCH:", match);
			var team = document.createElement('ul');
			team.id = "team" + (numTeams++);
			team.className = "monteam";
			team.dataset.teamdata = match[1];
			text = text.replace(match[0], team.outerHTML);
			match = team_regex.exec(text);
			numChanged += 6;
		}
		

		if (numChanged > 0) {
			//text = text.replace(/hXXp/g, 'http'); // restore preserved links
			block.innerHTML = text;
			//console.log("newtext:", block.innerHTML);

			var teams = block.querySelectorAll('ul.monteam');
			for (var j = 0; j < teams.length; j++) {
				updateTeam(teams[j]);
			}
			
			var mons = block.querySelectorAll('a.mon');
			for (var j = 0; j < mons.length; j++) {
				updateMon(mons[j]);
			}
		}

	}
}

function updateTeam(team) {
	var teamdata = team.dataset.teamdata;
	var teamstr = "";
	var simstr = "http://www.puzzledragonx.com/en/simulator.asp?q=";
	var emptysimstr = "0.0.0.0.0.0.0..";
	if (teamdata.length > 0) {
		var mons = stringToMonsters(teamdata);
		//console.log("TEAM MONSTERS:", mons);
		//for (var i = 0; i < mons.length; i++) {
		for (var i = 0; i < MAX_TEAM_SIZE; i++) {
			if (i < mons.length) {
				var tmon = mons[i];
				if (tmon.id > 0 && tmon.id < MAX_MONSTER_ID) {
				
					["level", "skill", "awoken"].forEach(function(key) {
						if (tmon[key] > MAX_VALUES[key]) tmon[key] = MAX_VALUES[key];
					});
					[0, 1, 2].forEach(function(key) {
						if (tmon.plus[key] > MAX_VALUES.plus) tmon.plus[key] = MAX_VALUES.plus;
					});
				
					var mon = document.createElement('a');
					mon.id = "mon" + (numMons++);
					mon.className = "mon";
					mon.dataset.id = tmon.id;
					mon.dataset.extra = "lv:"+tmon.level+";sk:"+tmon.skill+";aw:"+tmon.awoken+";pl:"+tmon.plus[0]+","+tmon.plus[1]+","+tmon.plus[2];
					teamstr += mon.outerHTML;
					simstr += tmon.id+"."+tmon.level+"."+tmon.skill+"."+tmon.plus[0]+"."+tmon.plus[1]+"."+tmon.plus[2]+"."+tmon.awoken+"..";
				} else {
					simstr += emptysimstr;
				}
			} else {
				simstr += emptysimstr;
			}
		}
		teamstr += '<a class="sim" target="_blank" href="'+simstr+'">View<br>Simulator</a>';
	}
	team.innerHTML = teamstr;
}

function updateMon(mon) {
	var id = mon.dataset.id;
	var extra = mon.dataset.extra;
	//mon.removeAttribute('data-extra');

	if (id > 0 && id < MAX_MONSTER_ID) {
		
		var n = id - 1;
		var x = (n % ATLAS_SIZE) * TILE_SIZE; // + 2;
		var y = (Math.floor(n / ATLAS_SIZE)) * TILE_SIZE; // + 2;
		mon.style.backgroundPosition = "-" + x + "px -" + y + "px";

		if (extra) {

			var varTable = {};

			function addVar(key, val, classn) {
				if (varTable[key])
					return varTable[key];
				var v = document.createElement('var');
				v.dataset[key] = val;
				if (classn) {
					mon.className += " "+classn;
				}
				mon.appendChild(v);
				varTable[key] = v;
				return v;
			}

			var extraArr = extra.toLowerCase().split(';');
			for (var j = 0; j < extraArr.length; j++) {
				var pair = extraArr[j].split(':');
				if (pair.length >= 1) {
					//console.log("PAIR:", pair[0], pair[1]);
					var key = pair[0];
					var val = (pair.length >= 2 ? pair[1] : null);

					if (key == "level" || key == "lv" || key == "l") {
						if (val == "99" || val == "max" || parseInt(val) >= MAX_VALUES.level) {
							addVar("level", MAX_VALUES.level, "max-level");
						} else {
							addVar("level", val);
						}

					} else if (key == "skill" || key == "sk" || key == "s") {
						if (val == "max" || parseInt(val) >= MAX_VALUES.skill) {			// TODO: Max skill levels per monster
							addVar("skill", MAX_VALUES.skill, "max-skill");
						} else {
							addVar("skill", val);
						}

					} else if (key == "awoken" || key == "aw" || key == "a") {
						if (val == "max" || parseInt(val) >= MAX_VALUES.awoken) {			// TODO: Max awoken levels per monster
							addVar("awoken", MAX_VALUES.awoken, "awoken max-awoken");
						} else {
							addVar("awoken", val, "awoken");
						}

					} else if (key == "count" || key == "cnt" || key == "c") {
						addVar("count", val, "count");

					} else if (key == "plus" || key == "pl" || key == "p" || key == "+") {
						var plus = [];
						var totalplus = 0;
						if (val == "max") {
							plus = [MAX_VALUES.plus, MAX_VALUES.plus, MAX_VALUES.plus];
							totalplus = plus[0]+plus[1]+plus[2];
						} else {
							plus = val.split(',');
							if (plus.length == 3) {
								for (var k = 0; k < 3; k++) {
									if (parseInt(plus[k]) >= MAX_VALUES.plus)
										plus[k] = MAX_VALUES.plus;
								}
								totalplus = parseInt(plus[0]) + parseInt(plus[1]) + parseInt(plus[2]);
							} else {
								totalplus = parseInt(val);
							}
						}
						var v = addVar("plus", totalplus);
						if (v && plus && plus.length == 3) {
							v.dataset['plushp'] = plus[0];
							v.dataset['plusatk'] = plus[1];
							v.dataset['plusrcv'] = plus[2];
						}

					} else if (key == "allmax" || key == "max") {
						addVar("level", MAX_VALUES.level, "max-level");
						addVar("skill", MAX_VALUES.skill, "max-skill");
						addVar("awoken", MAX_VALUES.awoken, "awoken max-awoken");
						var v = addVar("plus", MAX_VALUES.plus*3);
						v.dataset['plushp'] = MAX_VALUES.plus;
						v.dataset['plusatk'] = MAX_VALUES.plus;
						v.dataset['plusrcv'] = MAX_VALUES.plus;
					}

				}
			}
		}


		//mon.addEventListener("click", viewMonsterPage, false);
		//mon.onclick = viewMonsterPage;
		mon.target = "_blank";
		mon.href = "http://www.puzzledragonx.com/en/monster.asp?n="+mon.dataset.id;
	
		mon.dataset.ready = 1;
	}
}















function monstersToString(monsters) {
	var team = {
		monsters: monsters.slice(0, MAX_TEAM_SIZE)
	};
	team.len = monsters.length;
	var ds = new DataStream;
	ds.writeStruct(teamDef, team);
	ds.seek(0);
	var raw = ds.readUint8Array(ds.byteLength);
	var rawstr = uint8ArrayToString(raw);
	var comp = LZW.compress(rawstr);
	var compstr = uint8ArrayToString(comp);
	var encstr = Base64.encode(compstr);
	var str = "[mteam:"+encstr+"]";
	return str;
}

function stringToMonsters(str) {
	//var match = str.match(/\[mteam:([\w\+\/\=]+)\]/);
	//if (match && match.length > 1) {
	//	var encstr = match[1];
	var encstr = str;
		var compstr = Base64.decode(encstr);
		var comp = stringToUint8Array(compstr);
		var rawstr = LZW.decompress(comp);
		var raw = stringToUint8Array(rawstr);

		var ds = new DataStream;
		ds.writeUint8Array(raw);
		ds.seek(0);
		var team = ds.readStruct(teamDef);
		return team.monsters;
	//}
}

function stringToUint8Array(str) {
	var u = new Array(str.length);
	for (var i = 0; i < str.length; i++) {
		u[i] = str.charCodeAt(i)
	}
	return u;
}
function uint8ArrayToString(u) {
	var str = "";
	for (var i = 0; i < u.length; i++) {
		str += String.fromCharCode(u[i]);
	}
	return str;
}



