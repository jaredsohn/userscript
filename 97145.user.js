// ==UserScript==
// @id           org.userscripts.users.kuehlschrank.UserscriptsBullshitFilter
// @name         userscripts.org Bullshit Filter
// @author       kuehlschrank
// @description  Hides scripts for popular browser games and social networks as well as scripts that use "foreign" characters in description
// @homepage     http://userscripts.org/users/kuehlschrank
// @updateURL    https://userscripts.org/scripts/source/97145.meta.js
// @version      2014.2.14
// @icon         https://s3.amazonaws.com/uso_ss/icon/97145/large.png
// @include      http*://userscripts.org/
// @include      http*://userscripts.org/scripts
// @include      http*://userscripts.org/scripts?*
// @include      http*://userscripts.org/tags/*
// @include      http*://userscripts.org/users/*/scripts*
// @include      http*://userscripts.org/users/*/favorites*
// @include      http*://userscripts.org/scripts/search*
// ==/UserScript==

(function() {

	var filters = {
		'Games': /AntiGame|Astro\s*Empires|^\s*Attack|^\s*Battle|BiteFight|Blood\s*Wars|Bots4|Brawler|\bBvS\b|Business\s*Tycoon|Castle\s*Age|City\s*Ville|Comunio|Conquer\s*Club|CosmoPulse|Dark\s*Orbit|Dead\s*Frontier|\bDOA\b|Dossergame|Dragons\s*of\s*Atlantis|Dugout|\bDS[a-z]+\n|Empire\s*Board|eRep(ublik)?|Epic.*War|ExoPlanet|Falcon Tools|Feuerwache|Farming|FarmVille|Fightinfo|Frontier\s*Ville|Ghost\s*Trapper|Gladiatus|Goalline|Gondal|Grepolis|Hobopolis|\bhwm(\b|_)|Ikariam|\bIT2\b|Jellyneo|Kapi\s*Hospital|Kings\s*Age|Kingdoms?\s*of|knastv(ö|oe)gel|Knight\s*Fight|\b(Power)?KoC(Atta?ck)?\b|\bKOL\b|Kongregate|Last\s*Emperor|Legends?\s*of|Light\s*Rising|Lockerz|\bLoU\b|Mafia\s*(Wars|Mofo)|Menelgame|Mob\s*Wars|Mouse\s*Hunt|Molehill\s*Empire|NeoQuest|MyFreeFarm|Neopets|Nemexia|\bOGame\b|Pardus|Pennergame|Pigskin\s*Empire|PlayerScripts|Popmundo|Po?we?r\s*(Bot|Tools)|PsicoTSI|Ravenwood|Schulterglatze|SpaceWars|\bSW_[a-z]+\n|\bSnP\b|The\s*Crims|The\s*West|Travian|Treasure\s*Isl(and|e)|Tribal\s*Wars|TW.?PRO|Vampire\s*Wars|War\s*of\s*Ninja|West\s*Wars|\bWoD\b|World\s*of\s*Dungeons|wtf\s*battles|Wurzelimperium/i,
		'Social Networks': /Face\s*book|Google(\+| Plus)|\bHabbo|Kaskus|\bLepra|Leprosorium|MySpace|meinVZ|odnoklassniki|Одноклассники|Orkut|sch(ue|ü)ler(VZ|\.cc)?|studiVZ|Unfriend|Valenth|vkontakte|ВКонтакте|Qzone/i,
		'Non-ASCII':/[^\x00-\x80\s]+/i,
		'Clutter':/^\s*(.{1,3})\1+\n|^\s*(.+?)\n+\2\n*$|^\s*.{1,5}\n|do\s*n('|o)?t (install|download)|nicht installieren|just(\s*a)?\s*test|^\s*.{0,4}test.{0,4}\n|\ntest(ing)?\s*|^\s*(\{@|Smolka|Hacks)|\[\d{4,5}\]|free\s*download/i
	};

	if(typeof GM_getValue == 'undefined' || (typeof GM_getValue.toString == 'function' && GM_getValue.toString().indexOf('not supported') > -1)) {
		GM_getValue = my_GM_getValue;
		GM_setValue = my_GM_setValue;
	}

	insertStyle();
	insertStatus();
	filterScripts();
	insertSwitches();


	function insertStyle() {
		var style = document.createElement('style');
		style.textContent = 'tr.filtered { display:none !important; } .filter-status { margin-left: 6px; } .filter-switches { display:none; } *:hover > .filter-switches { display:inline; } .filter-switches a { text-decoration:none !important; color:inherit; cursor:pointer; } .filter-switches a { margin-left: 8px; padding: 0 4px; } a.filter-on { background-color:#ffcccc; color:#333333 } a.filter-off { background-color:#ccffcc; color:#333333 }  ';
		style.type = 'text/css';
		document.querySelector('head').appendChild(style);
	}


	function insertStatus() {
		var p = document.querySelector('#content h1, h2 + p.subtitle');
		if(p) {
			var status = document.createElement('span');
			status.className = 'filter-status';
			p.appendChild(status);
		}
	}


	function filterScripts() {
		var activeFilters = [];
		for(var filter in filters) {
			if(filters.hasOwnProperty(filter) && GM_getValue(filter, 'on') == 'on') {
				activeFilters.push(filters[filter]);
			}
		}
		var nodes = document.querySelectorAll('td.script-meat'), numActiveFilters = activeFilters.length, numFiltered = 0;
		for(var i = 0, numNodes = nodes.length, td = null; i < numNodes && (td = nodes[i]); i++) {
			td.parentNode.className = '';
			for(var j = 0; j < numActiveFilters; j++) {
				if(td.textContent.match(activeFilters[j])) {
					td.parentNode.className = 'filtered';
					numFiltered++;
					break;
				}
			}
		}
		document.querySelector('.filter-status').textContent = '(' + numFiltered + ' filtered)';
	}


	function insertSwitches() {
		var span = document.createElement('span');
		span.className = 'filter-switches';
		for(var filter in filters) {
			if(filters.hasOwnProperty(filter)) {
				span.appendChild(createSwitch(filter, GM_getValue(filter, 'on') == 'on'));
			}
		}
		document.querySelector('.filter-status').parentNode.appendChild(span);
	}


	function createSwitch(label, isOn) {
		var a = document.createElement('a');
		a.className = isOn ? 'filter-on' : 'filter-off';
		a.textContent = label;
		a.addEventListener('click', function(e) {
			if(this.className == 'filter-on') {
				this.className = 'filter-off';
				GM_setValue(this.textContent, 'off');
			} else {
				this.className = 'filter-on';
				GM_setValue(this.textContent, 'on');
			}
			filterScripts();
			e.preventDefault();
		}, false);
		return a;
	}

	function my_GM_setValue(name, value) {
		localStorage.setItem(name, value);
	}


	function my_GM_getValue(name, defaultValue) {
		var value;
		if (!(value = localStorage.getItem(name))) {
			return defaultValue;
		}
		return value;
	}

})();
