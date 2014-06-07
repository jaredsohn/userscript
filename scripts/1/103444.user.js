// ==UserScript==
// @name		  Hentaiverse Equipment Comparison
// @namespace	  http://userscripts.org/users/106844
// @description	  Allows to compare pieces of equipment.
// @match		  http://hentaiverse.org/?s=Bazaar&ss=es*
// @match		  http://hentaiverse.org/?s=Character&ss=eq*
// @match		  http://hentaiverse.org/pages/showequip.php?eid=*&key=*
// @match		  http://hentaiverse.org/?s=Bazaar&ss=fr*
// @match		  http://hentaiverse.org/?s=Battle&ss=iw*
// @match		  http://hentaiverse.org/?s=Character&ss=in
// @match		  http://ehwiki.org/wiki/Equipment_Ranges?where=*
// @version		  0.5.0.10
// @run-at		  document-end
// ==/UserScript==

var Parser, Cruncher, Formatter, Controller, Wiki;

/* * * * * * * * * * * * * * * * * * * * * * * */

Parser = {

	parse: function(source) {	
	
		// decorator for _parseObject
		
		if (source != null && source.constructor == String) {
			var tokens = source.match(/'.+?'/g), temp = document.createElement('div');
			temp.innerHTML = tokens[2].slice(1,tokens[2].length-1);
			var result = Parser._parseObject(temp.firstElementChild);
			result.Info.Name = tokens[1].slice(1,tokens[1].length-1);
			return result;
		}
		
		if (document.getElementById('equipment')) {
			var result = Parser._parseObject(document.querySelector('#equipment > div:first-child'));
			result.Info.Name = document.querySelector('div').textContent;
			return result;
		}
		
		var popup = document.getElementById('popup_box');
		if (popup.childElementCount) {
			var result = Parser._parseObject(document.querySelector('#popup_box > div + div > div'));
			result.Info.Name = document.querySelector('#popup_box > div').textContent;
			return result;
		}
	
	},

	_parseObject: function(source) {

		function hasChildren(x) {
			for (var y in x) return true;
			return false;
		}
		
		if (source.constructor == String) {
			var temp = document.createElement('div');
			temp.innerHTML = source;
			return parseObject(temp);
		}
		
		var res = { Info: { } }, n = source.childNodes.length;
		var section = null, sectionContents = { };
		for (var i=0;i<n;i++) {

			var child = source.childNodes[i];
			
			// check for equipment procs & info
			if (child.firstElementChild.nodeName == 'STRONG') {
			
				if (child.textContent.indexOf('Level') != -1) {
					// type, level and EXP
					var tokens = child.textContent.match(/^(.+?)\s+Level (\d+)\s+(.+)$/);
					res.Info.Type = tokens[1];
					res.Info.Level = parseInt(tokens[2],10);
					res.Info.EXP = tokens[3];
				}
				
				else if (child.textContent.indexOf('turn') != -1) {
					// proc type, chance, duration and damage
					var tokens = child.textContent.match(/^(.+): (\d+)%.+(\d+) turns?(?:.+?(\d+)% DOT)?/);
					res.Proc = { Type: tokens[1], Chance: parseInt(tokens[2],10), Duration: parseInt(tokens[3],10) };
					if (tokens[4]) res.Proc.Damage = parseInt(tokens[4],10);
				}
				
				else if (child.textContent.indexOf('points') != -1) {
					// siphon type, chance and damage
					var tokens = child.textContent.match(/^Siphon (.+): (\d+)%.+ ([\d\.]+) points/)
					res.Siphon = { Type: tokens[1], Chance: parseInt(tokens[2],10), Damage: parseFloat(tokens[3]) };
				}
				
				else if (child.textContent.indexOf('Damage') != -1) {
					// weapon damage and damage type
					var tokens = child.textContent.match(/^\+(\d+) (.+) Damage/);
					res.Damage = { Damage: parseInt(tokens[1],10), Type: tokens[2] };
				}
				
				else if (child.textContent.indexOf('Strike') != -1) {
					// elemental strike
					res.Info.Element = child.textContent.match(/^(.+) Strike/)[1];
				}
			
				continue;
			}
				
			// check for section name
			if (!child.firstElementChild.childElementCount && child.textContent.trim().length) {
			
				if (hasChildren(sectionContents)) // previous section or stats
					res[section||'Stats'] = sectionContents; // clone
					
				section = child.firstElementChild.textContent;
				sectionContents = { };
				
			}
			
			// retrieve section contents
			var targets = child.querySelectorAll('div:not(:last-child)');
			var attributeName = null;
			
			for (var j=0;j<targets.length;j++) {
			
				if (targets[j].firstElementChild && targets[j].firstElementChild.nodeName == 'DIV') continue;
				if (targets[j].textContent.trim()[0] == '%') continue;
				
				if (targets[j].textContent[0] != '+') // attribute name
					attributeName = targets[j].textContent;
				else // attribute value
					sectionContents[attributeName] = parseFloat(targets[j].textContent.slice(1));
					
			}
			
		}
		
		if (hasChildren(sectionContents)) // last section
			res[section||'Stats'] = sectionContents; // clone
			
		return res;

	}
	
};

/* * * * * * * * * * * * * * * * * * * * * * * */

Cruncher = {

	scalingFactors : {
		'Stats': {
			'Attack Damage': 16+2/3, 'Magic Damage': 22+3/4, 'Attack Accuracy': 5000, 'Magic Accuracy': 5000,
			'Attack Critical': 2000, 'Magic Critical': 2000, 'Block Chance': 2000, 'Evade Chance': 2000,
			'Parry Chance': 2000, 'Resist Chance': 2000,  'Physical Mitigation': 2000, 'Magical Mitigation': 2000,
			'Burden': 800, 'Interference': 800, 'Mana Conservation': Infinity
		},
		'Damage': 16+2/3,
		'Damage Mitigations': { 'Crushing': 2000, 'Slashing': 2000, 'Piercing': 2000, 'default': 2000 },
		'Proficiency': 35+5/7,
		'Spell Damage': 50 ,
		'Primary Attributes': 35+5/7,
		'Proc': { 'Duration': 200, 'Damage': Infinity, 'Chance': Infinity },
		'Siphon': { 'Damage': 25, 'Chance': Infinity }
	},

	compare: function(a,b) {
	
		// returns a-b (b = equipped item)
		
		var result = { };
		
		for (var x in a) {
			result[x] = { };
			for (var y in a[x]) {
				if (x == 'Info' && y != 'Level')
					result[x][y] = a[x][y];
				else if (!b.hasOwnProperty(x) || !b[x].hasOwnProperty(y)) {
					if (a[x][y].constructor == Number)
						result[x][y] = a[x][y];
					else
						result[x][y] = '!' + a[x][y];
				}
				else if (b[x][y].constructor == Number)
					result[x][y] = a[x][y] - b[x][y];
				else
					result[x][y] = a[x][y] == b[x][y] ? a[x][y] : '!' + a[x][y];
			}
		}
		
		for (var x in b) {
			if (!result.hasOwnProperty(x)) result[x] = { };
			for (var y in b[x]) {
				if (result.hasOwnProperty(x) && result[x].hasOwnProperty(y)) continue;
				if (b[x][y].constructor == Number)
					result[x][y] = -b[x][y];
				else
					result[x][y] = '!' + b[x][y];
			}
		}
		
		return result;
	
	},
	
	scale: function(source) {
	
		if (!Controller.Level) return source;
	
		var result = { };

		for (var x in source) {
		
			result[x] = { };
			var factor = Cruncher.scalingFactors[x] || Infinity, effectiveFactor;
			
			for (var y in source[x]) {

				if (source[x][y].constructor != Number) {
					result[x][y] = source[x][y];
					continue;
				}
				
				if (factor.constructor == Number) effectiveFactor = factor;
				else if (factor.hasOwnProperty(y)) effectiveFactor = factor[y];
				else if (factor.hasOwnProperty('default')) effectiveFactor = factor.default;
				else effectiveFactor = Infinity;
				
				result[x][y] = source[x][y] / (1 + Controller.Level / effectiveFactor);
				
			}
		
		}
		
		return result;
	
	}

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Formatter = {

	_sectionOrder: ['Info','Stats','Spell Damage','Damage Mitigations','Proficiency','Primary Attributes'],
	
	_format: function(string) {
		var parameters = arguments;
		return string.replace(/{(\d+)}/g,function(match,number) {
			return parameters.length > +number+1 ? parameters[+number+1] : match;
		});
	},
	
	_formatInfo: function(source) {
	
		var result = '';
		
		result += Formatter._format(
			'<div style="margin:3px auto; font-size:110%; text-align:center">' +
			'<b>{0}</b> &nbsp; &nbsp; <b>Level</b> <strong>{1}</strong> &nbsp; &nbsp; <b>{2}</b></div>',
			source.Info.Type,source.Info.Level,source.Info.EXP
		);
		
		if (source.hasOwnProperty('Proc')) {
			result += Formatter._format(
				'<div style="text-align:center; margin:3px auto"><b>{0}</b>: ' +
				'<strong>{1}%</strong> chance - <strong>{2}</strong> turns{3}</div>',
				source.Proc.Type,source.Proc.Chance,source.Proc.Duration.toFixed(2),
				!source.Proc.hasOwnProperty('Damage') ?
					'' :
					Formatter._format(' / <strong>{0}%</strong> DOT',source.Proc.Damage)
			);
		}
		
		if (source.hasOwnProperty('Siphon')) {
			result += Formatter._format(
				'<div style="text-align:center; margin:3px auto"><b>Siphon</b> <b>{0}</b>: ' +
				'<strong>{1}%</strong> chance - <strong>{2}</strong> points</div>',
				source.Siphon.Type,source.Siphon.Chance,source.Siphon.Damage.toFixed(1)
			);
		}
		
		if (source.hasOwnProperty('Damage')) {
			result += Formatter._format(
				'<div style="text-align:center; margin:3px auto">+<strong>{0}</strong> <b>{1}</b> <b>Damage</b> </div>',
				source.Damage.Damage.toFixed(2),source.Damage.Type
			);
		}
		
		if (source.Info.hasOwnProperty('Element')) {
			result += Formatter._format(
				'<div style="text-align:center; margin:3px auto"><strong>{0}</strong> <b>Strike</b></div>',
				source.Info.Element
			);
		}
		
		// removes contradicting signs
		result = result.replace(/\+<strong>-/g,'<strong>-');
		
		return result;
			
	},
	
	_formatSection: function(name,source) {
	
		var result = '', attributes = '', stats = (name == 'Stats'), attributeCount = 0;
		var newLine = [];
		
		for (var x in source) {
		
			var temp =
				Formatter._format('<div style="float:left; width:{0}px; text-align:right;">',stats ? '155' : '100') +
				Formatter._format('<div style="float:left; {0}">{1}</div>',stats ? 'width:99px; padding:2px' : 'width:65px',x) +
				Formatter._format(
					'<div style="float:left; width:35px; {0}">+<strong>{1}</strong></div>',
					stats ? 'padding:2px 0 2px 2px' : '',
					source[x].toFixed(2)
				) +
				// additional div needed for stats (containing the percent sign)
				(!stats ? '' : Formatter._format(
					'<div style="float:left; width:6px; text-align:left; padding:2px 2px 2px 1px">{0}</div>',
					stats && !/Damage|Interference|Burden/.test(x) ? ' %' : '' // exclude damage, burden and interference
				)) +
				'<div style="clear:both"></div></div>';
				
			// added later on a new line
			if (stats && (x == 'Burden' || x == 'Interference')) newLine.push(temp);
			else attributes += temp;
			
			attributeCount++; // needed later to center the floating div(s)
			
		}
		
		if (newLine.length) {
			attributes += newLine[0].replace(/">/,'clear: left;">');
			if (newLine[1]) attributes += newLine[1];
		}
		
		if (stats)
			result = Formatter._format(
				'<div style="border-top:1px solid #A47C78; margin:5px auto 2px; padding-top:2px">{0}<div style="clear:both"></div></div>',
				attributes
			);
		
		else
			result = Formatter._format(
				'<div style="margin:7px auto 2px"><div style="font-weight:bold; text-align:center">{0}</div>' +
				'<div style="padding-right:20px"><div style="margin:5px auto; width:{1}00px">{2}</div></div><div style="clear:both"></div></div>',
				name,Math.min(3,attributeCount),attributes
			);
		
		// add color to Burden and Interference
		result = result.replace(/((?:Burden|Interference).+?)">/g,'$1;color:#BF0000">');
		
		// removes contradicting signs
		result = result.replace(/\+<strong>-/g,'<strong>-');
		
		return result;
		
	},
	
	addColors: function(source, comparison) {
	
		// source must be a node
		// comparison = true > red/green
		// comparison = false > purple (base values)
		
		var targets = source.querySelectorAll('div[style^="float"] strong');
		for (var i=targets.length-1;i>=0;i--) {
			if (comparison) {
				if (Math.abs(parseFloat(targets[i].textContent)) <= 0.01) targets[i].parentNode.style.color = 'dodgerblue';
				else {
					var reverse = /Burden|Interference/.test(targets[i].parentNode.previousElementSibling.textContent);
					if (targets[i].parentNode.textContent[0] != '-') targets[i].parentNode.style.color = !reverse ? 'darkgreen' : 'red';
					else targets[i].parentNode.style.color = !reverse ? 'red' : 'darkgreen';
				}
			} else targets[i].parentNode.style.color = 'darkorchid';
		}
		
		// info & procs
		var targets = source.querySelectorAll('div:not([style^="float"]) > div > strong');
		for (var i=targets.length-1;i>=0;i--) {
			if (comparison) {
				if (!/[-\+\d]/.test(targets[i].textContent[0]) || Math.abs(parseFloat(targets[i].textContent)) <= 0.01)
					targets[i].style.color = 'dodgerblue';
				else {
					if (targets[i].textContent[0] != '-') {
						targets[i].style.color = 'darkgreen';
						if (targets[i].parentNode.textContent[0] != '+')
							targets[i].textContent = '+' + targets[i].textContent;
					}
					else targets[i].style.color = 'red';
				}
			} else if (/\d/.test(targets[i].textContent[0])) targets[i].style.color = 'darkorchid';
		}
		
		// highlight different strings
		var targets = source.querySelectorAll('strong, b');
		for (var i=targets.length-1;i>=0;i--) {
			if (targets[i].textContent[0] != '!' || targets[i].childElementCount) continue;
			targets[i].textContent = targets[i].textContent.slice(1);
			targets[i].style.color = 'dodgerblue';
		}
		
	},

	toHTML: function(source) {
	
		var result = '';
		
		Formatter._sectionOrder.forEach(function(section) {
			if (section == 'Info') result += Formatter._formatInfo(source);
			else if (source.hasOwnProperty(section))
				result += Formatter._formatSection(section,source[section]);
		});
		
		return result;
	
	}

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Controller = {

	toText: function(node) {
			
		if (!Controller.toText.map)
			Controller.toText.map = '0123456789.,!?%+-=/\'":;()[]-            abcdefghijklmnopqrstuvwxyz';
			
		var targets = node.querySelectorAll('.f10rb, .f12rb'), n = targets.length, result = '';
		if (n == 0) result = node.textContent;
		else {
			while (n --> 0) {
				var offset = parseInt(targets[n].style.backgroundPosition.match(/(\d+)px$/)[1],10);
				var height = targets[n].className.indexOf('10') == -1 ? 12 : 10;
				result += Controller.toText.map[offset/height];
			}
		}
		
		return result.replace(/^(.)|\s(.)/g,function(c) { return c.toUpperCase(); });
			
	},

	saveData: function() {
	
		var result = /slot/.test(window.location.href) ? JSON.parse(localStorage.getItem('HVEquipment')) : { };
		var targets = document.querySelectorAll('.eqde');
		for (var i=targets.length-1;i>=0;i--) {
			var data = Parser.parse(targets[i].getAttribute('onmouseover'));
			var slot = Controller.toText(targets[i].parentNode.firstElementChild);
			result[slot] = data;
		}
		localStorage.setItem('HVEquipment',JSON.stringify(result));
		
		var level = document.querySelector('.fd12');
		if (level.textContent.indexOf('Level') != -1) level = level.textContent;
		else level = Controller.toText(level);
		if (level.indexOf('Level') != -1) localStorage.setItem('HVLevel',level.match(/(\d+)/)[1]);

			
	},
	
	loadData: function() {
	
		var level = parseInt(localStorage.getItem('HVLevel'));
		if (level) Controller.Level = level;
		
		var equipment = JSON.parse(localStorage.getItem('HVEquipment'));
		if (!equipment) return;
		for (var x in equipment)
			this[x] = equipment[x];
		
	},
	
	hasData: function() {
		return localStorage.hasOwnProperty('HVEquipment') && localStorage.hasOwnProperty('HVLevel');
	},
	
	getTarget: function() {
		return document.querySelector('#popup_box > div + div > div, #equipment > div');
	},
	
	_extractSlot: function(name,slot) {
		if (/Weapon|Staff/i.test(slot)) return 'Main Hand';
		if (/Shield/i.test(slot)) return 'Off Hand';
		if (/Cap|Helm|Coif/i.test(name)) return 'Helmet'
		if (/Robe|Armor|Breastplate|Cuirass|Hauberk/i.test(name)) return 'Body';
		if (/Gloves|Gauntlets|Mitons/i.test(name)) return 'Hands';
		if (/Pants|Leggings|Greaves|Chausses/i.test(name)) return 'Legs';
		return 'Feet';
	},
	
	keyEvent: function(e) {
	
		var key = String.fromCharCode(e.keyCode).toLowerCase();
		if (!/[qwer]/.test(key) || !Controller.popup.childElementCount || !Controller.hasData()) return;
		if (!Controller.loaded) {
			Controller.loadData();
			Controller.laded = true;
		}
		
		var name = document.querySelector('#popup_box > div') || document.querySelector('body > div > div > div > .fd12 > div');
		name.textContent = name.textContent.replace(/\s\(.+\)/,'');
		
		var source = Parser.parse(), slot = Controller._extractSlot(source.Info.Name,source.Info.Type), result;
		
		if (key == 'r') {
			window.open('http://ehwiki.org/wiki/Equipment_Ranges?where=' + source.Info.Name.replace(/\s/g,'+'));
			return;
		}
		
		var switchSlot = ((key == 'q' || key == 'e') && Controller.lastEquip == source.Info.Name && Controller.lastSlot != 'Off Hand' &&
			source.Info.Type == 'One-handed Weapon' && document.getElementById('HVEquipment') != null);
		
		if (document.getElementById('HVEquipment') != null) {
			Controller.lastResult.parentNode.removeChild(Controller.lastResult);
			if (Controller.lastKey == key && !switchSlot) {
				Controller.getTarget().style.display = null;
				return;
			}
		}
		
		if (Controller.lastKey == key && switchSlot)
			slot = (Controller.lastSlot == 'Main Hand' ? 'Off Hand' : 'Main Hand');
		
		if (source.Info.Type == 'One-handed Weapon' && (key == 'q' || key == 'e')) name.textContent += ' (' + slot + ')';
		
		if (key == 'q' || key == 'e') {
			if (!Controller.Level) Controller.loadData();
			result = Cruncher.compare(source,Controller[slot] || { });
		} else result = source;
		
		if (key == 'w' || key == 'e')
			result = Cruncher.scale(result);
			
		var div = document.createElement('div');
		div.id = 'HVEquipment';
		div.innerHTML = Formatter.toHTML(result);
		Formatter.addColors(div,key == 'q' || key == 'e');
		
		var target = Controller.getTarget();
		target.parentNode.insertBefore(div,target.nextSibling);
		target.style.display = 'none';
		
		Controller.lastKey = key;
		Controller.lastResult = div;
		Controller.lastSlot = slot;
		Controller.lastEquip = source.Info.Name;
		
	}

};

/* * * * * * * * * * * * * * * * * * * * * * * */

Wiki = {

	_evaluate: function(query) {
		return document.evaluate(query,document,null,9,null).singleNodeValue;
	},

	check: function() {
	
		var equip = window.location.href.match(/where=([^#&]+)/)[1].replace(/\+/g,' '), temp, target;

		if (temp = equip.match(/(Cotton|Gossamer|Phase|Leather|Kevlar|Shade|Plate|Shield (?!of)|Power)/)) { // armor
			target = Wiki._evaluate(
				'.//h3[./span[text()="' + temp[1].trim() + '"]]/following-sibling::h4' +
				'[./span[text()="' + Controller._extractSlot(equip,'').replace(/Helmet/,'Head') + '"]]/following-sibling::table'
			);
		} else { // other
			var type = equip.replace(/Flimsy|Crude|Fair|Average|Fine|Superior|Exquisite|Magnificent|Legendary|Ethereal/g,'');
			type = type.replace(/Shocking|Arctic|Tempestuous|Fiery|Astral|Quintessential|Demonic|Hallowed/g,'');
			type = type.match(/([^\s]+)/)[1].trim();
			target = Wiki._evaluate('.//h3[./span[starts-with(text(),"' + type + '")]]/following-sibling::table');
		}
		
		Wiki._highlightTable(target,equip);
	
	},

	_highlightTable: function(target,equip) {

		if (!target) return;

		if (/collapsibleTable/.test(target.id)) {
			if (unsafeWindow && unsafeWindow.collapseTable) unsafeWindow.collapseTable(target.id.match(/(\d+)$/)[1]); // firefox
			else window.location.href = 'javascript:collapseTable(' + target.id.match(/(\d+)$/)[1] + ')'; //chrome
		}
		
		target.scrollIntoView();
		var offset = (/Exquisite/.test(equip)?1:/Magnificent/.test(equip)?2:/Legendary/.test(equip)?3:0);
		
		// highlight relevant rows
	 
		function isFirst(x) {
			return !x.firstElementChild.hasAttribute('scope');
		}
		
		function checkSuffix(td,suffix) {
			return td.indexOf(suffix) == 0 ||
				(/Mjolnir|Surtr|Niflheim|Freyr|Heimdall|Fenrir/.test(suffix) && /EDB/i.test(td)) ||
				(/Heaven-sent|Demon-fiend|Elementalist|Curse-weaver|Priestess|Earth-walker/.test(suffix) && /Prof/i.test(td)) ||
				(/Fox|Owl|Cheetah|Raccoon|Turtle|Ox/.test(suffix) && /PAB/i.test(td)) ||
				(/Dampening|Stone|Deflection|Warding|eater|born|child|waker|blessed|ward/.test(suffix) && /Mitigation/i.test(td));
		}

		function highlightRow(row) {
			var n = row.cells.length-4+offset;
			if (row.cells[n].textContent.trim() == 0) return;
			for (var i=n;i>=0;i--) highlightCell(row.cells[i]);
			highlightCell(row.cells[n],true);
			if (isFirst(row)) {
				temp = Wiki._evaluate('preceding-sibling::tr[./th[1][@scope]][1]/th[1]',row);
				if (temp) highlightCell(temp);
			}
		}
		
		function highlightCell(cell,text) {
			if (!cell) return;
			cell.style.cssText = 'background-color: bisque;' + (text?'color: firebrick; font-weight: bold; text-decoration: underline;':'');
		}
		
		var rows = Array.prototype.slice.call(target.rows,0).slice(3), n = rows.length;
		var suffix = equip.match(/([^\s]+)$/)[1].trim();
		
		for (var i=0;i<n;i++) {
			var rowspan = rows[i].firstElementChild.getAttribute('rowspan')||1, temp = false, temp2 = null;
			for (var j=0;j<rowspan;j++, i++) {
				if (temp) continue; 
				var suffixTD = isFirst(rows[i])?rows[i].firstElementChild:rows[i].firstElementChild.nextElementSibling, suffixTDtext = suffixTD.textContent.trim();
				if (checkSuffix(suffixTDtext,suffix)) {
					temp = true;
					highlightRow(rows[i]);
				} else if (/^$|Others?|All/.test(suffixTDtext) || (!temp2 && !suffixTD.nextElementSibling.textContent.trim().length)) temp2 = rows[i];
				
			}
			if (!temp && temp2) highlightRow(temp2);
			i--; 
		}
		
	}

};

/* * * * * * * * * * * * * * * * * * * * * * * */

if (window.location.host == 'hentaiverse.org') {

	if (/&ss=eq/.test(window.location.href)) Controller.saveData();
	Controller.popup = document.querySelector('#popup_box, #equipment');
	Controller.loaded = false;
	window.addEventListener('keyup',Controller.keyEvent,false);
	var level = document.evaluate('.//div[starts-with(text(),"Level")]',document,null,9,null).singleNodeValue;
	if (level) Controller.Level = parseInt(level.textContent.match(/(\d+)/)[1],10)
		
} else if (window.location.host == 'ehwiki.org') {

	window.addEventListener('load',Wiki.check,false);
	
}