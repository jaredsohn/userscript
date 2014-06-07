// ==UserScript==
// @name           TW Massrecruitment
// @description    Advanced Massrecruitment
// @author         Michael Richter
// @namespace      http://osor.de/
// @include        http://de*.die-staemme.de/game.php?*screen=train&mode=mass*
// @include        http://ch*.staemme.ch/game.php?*screen=train&mode=mass*
// @include        http://en*.tribalwars.net/game.php?*screen=train&mode=mass*
// ==/UserScript==

// -----------------------------------------------------------------------------
//              Copyright (c) by Michael Richter, http://osor.de/
// ENG:  You are not allowed to modify or redistribute this script without 
//       permission of the author
// GER:  Modifikationen und Weiterverbreitung dieses Scripts benötigen die
//       Zustimmung des Autors.
// -----------------------------------------------------------------------------

(function(){
	
	var lang = {
		'en': {
			'settings': 'Settings for group',
			'troupsize': 'Desired troupsize',
			'troupsizedesc': 'The desired troup for the village (not only for this run).',
			'openend': 'Build further:',
			'openenddesc': 'If the desired troupsize is reached it builds further until the farm is full.',
			'farmfree': 'Leave farm places free:',
			'farmfreedesc': 'How many farm places shall be left free (e.g. 100 for a Nobleman).',
			'resfree': 'Leave ressources:',
			'resfreedesc': 'How many ressources shall be left.',
			'save': 'Save',
			'fill': 'Fill',
			'recruit': 'Recruit',
			'running': 'running...',
			'troupneeds': '(Desired troup needs %1 workers)',
			'filled': 'Filled: %1 in %2 villages',
			'settoobig': 'Massrecruitment settings are too big to be saved in a cookie. To solve this problem delete some of your groups.'
		},
		'de': {
			'settings': 'Einstellungen für Gruppe',
			'troupsize': 'Gewünschte Truppenstärke:',
			'troupsizedesc': 'Die gewünschte Menge für das fertige Dorf (nicht die Menge, die pro Durchgang gebaut werden soll).',
			'openend': 'Weiter bauen:',
			'openenddesc': 'Wenn die gewünschte Truppenstärke erreicht wurde, wird weiter gebaut, bis der BH voll ist.',
			'farmfree': 'BH-Plätze frei lassen:',
			'farmfreedesc': 'Wie viel BH-Plätze sollen frei gelassen werden (z.B. 100 für ein AG).',
			'resfree': 'Rohstoffe übrig lassen:',
			'resfreedesc': 'Wie viel Rohstoffe sollen mindestens übrig bleiben.',
			'save': 'Speichern',
			'fill': 'Ausfüllen',
			'recruit': 'Rekrutieren',
			'running': 'läuft...',
			'troupneeds': '(Wunschtruppe benötigt %1 Arbeiter)',
			'filled': 'Ausgefüllt: %1 in %2 Dörfern',
			'settoobig': 'Die Einstellungen für die Massenrekrutierung sind zu groß um in einem Cookie gespeichert zu werden. Es kann daher zu Problemen kommen. Das Löschen einiger Gruppen kann das Problem lösen.'
		}
	};
	
	var curlang = 'en';
	if(/en\d+\.tribalwars\.net/.test(location.href)) {
		curlang = 'en';
	} else if(/de\d+\.die-staemme\.de/.test(location.href)) {
		curlang = 'de';
	} else if(/ch\d+\.staemme\.ch/.test(location.href)) {
		curlang = 'de';
	}
	
	// XPath helper
	var $x = function(p, context) {
		if(!context)
			context = document;
		var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr;
	};

	// JSON support ( http://www.json.org/json2.js )
	if(!this._JSON){_JSON={};}(function(){function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.to_JSON!=='function'){Date.prototype.to_JSON=function(key){return this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z';};String.prototype.to_JSON=Number.prototype.to_JSON=Boolean.prototype.to_JSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.to_JSON==='function'){value=value.to_JSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(typeof value.length==='number'&&!value.propertyIsEnumerable('length')){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof _JSON.stringify!=='function'){_JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('_JSON.stringify');}return str('',{'':value});};}if(typeof _JSON.parse!=='function'){_JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('_JSON.parse');};}})();
	
	var win = window;
	if(typeof unsafeWindow != 'undefined')
		win = unsafeWindow;
	
	// debug: object and array dumper
	var dump = function(obj, depth) {
		if(obj.constructor == Array || obj.constructor == Object) {
			var text = '';
			if(!depth)
				var depth = 0;
			for(var p in obj) {
				if(typeof(obj[p]) == 'function')
					continue;
				for(var i = 0; i < depth; i++)
					text += '   ';
				text += '['+p+'] => ';
				if(obj[p].constructor == Array || obj[p].constructor == Object) {
					text += typeof(obj)+"...\n"+arguments.callee(obj[p], depth + 1);
				} else {
					var to = typeof(obj[p]);
					text += (to == 'string' ? '"' : '') + obj[p] + (to == 'string' ? '"' : '')+"\n";
				}
			}
			return text;
		}
		return '';
	}
	
	// createElement
	var ce = function(name) {
		return document.createElement(name);
	};
	
	// save settings as cookie
	var set_cookie = function(arr) {
		if(!/[&?]t=\d+/.test(location.href)) {
			var value = escape(_JSON.stringify(arr));
			if(win.localStorage) {
				win.localStorage.massrecruiting = value;
			} else {
				if(value.length > 4096) {
					alert(lang[curlang]['settoobig']);
				}
				document.cookie = 'massrecruiting=' + value + '; expires=' + (new Date(2036, 1, 1)).toGMTString() + ';';
			}
		}
	};
	var get_cookie = function() {
		var massrecruiting = /massrecruiting=(.*?)(?:;|$)/.exec(document.cookie);
		if(massrecruiting) {
			var value = _JSON.parse(unescape(massrecruiting[1]));
			if(win.localStorage) {
				document.cookie = 'massrecruiting=; expires=' + (new Date(1990, 1, 1)).toGMTString() + ';';
				set_cookie(value);
			}
			return value;
		} else if(win.localStorage && win.localStorage.massrecruiting) {
			return _JSON.parse(unescape(win.localStorage.massrecruiting));
		}
		return [];
	};
	
	// search settings array for a groupname
	Array.searchgroup = function(arr, grp) {
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].group == grp) {
				return i;
			}
		}
		return -1;
	};
	
	// get settings from the document (w/o saving)
	var getCurrentSettings = function(group) {
		var setunits = $x('//input[starts-with(@name,"massrecruitunit_")]');
		var setopenend = $x('//input[starts-with(@name,"massrecruitopenend_")]');
		var cursettings = {
			group: group,
			units: [],
			openend: [],
			free: 0,
			res: [0, 0, 0]
		};
		for(var i = 0; i < setunits.length; i++) {
			var u = parseInt(setunits[i].value, 10);
			cursettings.units[i] = u ? u : 0;
			cursettings.openend[i] = setopenend[i].checked;
		}
		var bh = parseInt(document.getElementById('massrecruitfree').value, 10);
		cursettings.free = bh ? bh : 0;
		for(var i = 0; i < 3; i++) {
			var r = parseInt(document.getElementById('massrecruitres_'+i).value, 10);
			cursettings.res[i] = r ? r : 0; 
		}
		return cursettings;
	};
	
	// troup costs
	var costs = {
		// [wood, stone, iron, worker, time]
		spear: [50, 30, 10, 1, 159],
		sword: [30, 30, 70, 1, 239],
		axe: [60, 30, 40, 1, 206],
		archer: [100, 30, 60, 1, 206],
		spy: [50, 50, 20, 2, 188],
		light: [125, 100, 250, 4, 375],
		marcher: [250, 100, 150, 5, 375],
		heavy: [200, 150, 600, 6, 749],
		ram: [300, 200, 200, 5, 1336],
		catapult: [320, 400, 100, 8, 2003],
		priest: [800, 500, 750, 100]
	};
	
	// update needed workers for selected troups
	var updateWorkers = function() {
		var el = document.getElementById('massrecruit_neededworkers');
		var curset = getCurrentSettings(selectedgroup);
		var neededworkers = 0;
		for(j = 0; j < curset.units.length; j++) {
			neededworkers += curset.units[j] * costs[units[j].unit][3];
		}
		el.textContent = lang[curlang]['troupneeds'].replace(/%1/, neededworkers);
	}
	
	// get available groups
	var groups = [];
	var selectedgroup = '';
	var grps = $x('//td/a[contains(@href,"screen=train") and contains(@href,"mode=mass") and contains(@href,"group=") and not(contains(@href,"page=")) and starts-with(.," [")]');
	if(grps.length > 0) {
		var grpsel = $x('parent::td/strong[starts-with(.," >")]', grps[0]);
		for(var i = 0; i < grps.length; i++) {
			var grp = / \[(.*)\] /.exec(grps[i].textContent);
			if(grp)
				groups.push(grp[1]);
		}
	} else {
		var grpsel = $x('//td/strong[starts-with(.," >")]');
	}
	if(grpsel.length > 0) {
		var grp = / >(.*)< /.exec(grpsel[0].textContent);
		if(grp) {
			groups.push(grp[1]);
			selectedgroup = grp[1];
		}
	}	
	
	selectedgroup = document.getElementsByTagName('strong')[0].innerHTML.substring(4, document.getElementsByTagName('strong')[0].innerHTML.length - 5);

	// get settings
	var settings = get_cookie();
	var recform = $x('//form[contains(@action,"screen=train") and contains(@action,"mode=success") and contains(@action,"action=train_mass") and contains(@action,"h=")]');
	if(recform.length == 0)
		return;
	
	// get available units
	var units = [];
	var u = $x('table[1]/thead/tr[1]/th/img[contains(@src,"unit_")]', recform[0]);
	for(var i = 0; i < u.length; i++) {
		var unit = /unit_([a-z]+)\.png/.exec(u[i].src);
		if(unit)
			units.push({unit: unit[1], name: u[i].title, src: u[i].src});
	}
	
	// settings table
	var grpidx = Array.searchgroup(settings, selectedgroup);
	var setcon = ce('div');
	setcon.setAttribute('style', 'padding:5px;');
	var h3 = ce('h3');
	h3.textContent = lang[curlang]['settings'] + ' »'+selectedgroup+'«';
	setcon.appendChild(h3);
	var table = ce('table');
	table.className = 'vis';
	
	var thead = ce('thead');
	var tr = ce('tr');
	tr.appendChild(ce('td'));
	for(var i = 0; i < units.length; i++) {
		var th = ce('th');
		th.style.textAlign = 'center';
		var img = ce('img');
		img.src = units[i].src;
		img.title = units[i].name;
		img.alt = '';
		th.appendChild(img);
		tr.appendChild(th);
	}
	thead.appendChild(tr);
	table.appendChild(thead);
	
	var tbody = ce('tbody');
	var tr = ce('tr');
	var th = ce('th');
	th.textContent = lang[curlang]['troupsize'];
	th.title = lang[curlang]['troupsizedesc'];
	th.style.textAlign = 'right';
	tr.appendChild(th);
	for(var i = 0; i < units.length; i++) {
		var td = ce('td');
		td.style.textAlign = 'center';
		var input = ce('input');
		input.type = 'text';
		input.name = 'massrecruitunit_'+i;
		input.size = '3';
		input.setAttribute('maxlength', '5');
		if(grpidx >= 0)
			input.value = settings[grpidx].units[i] > 0 ? settings[grpidx].units[i] : '';
		input.addEventListener('keyup', function(){
			updateWorkers();
		}, false);
		td.appendChild(input);
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
	
	var tr = ce('tr');
	var th = ce('th');
	th.textContent = lang[curlang]['openend'];
	th.title = lang[curlang]['openenddesc'];
	th.style.textAlign = 'right';
	tr.appendChild(th);
	for(var i = 0; i < units.length; i++) {
		var td = ce('td');
		td.style.textAlign = 'center';
		var input = ce('input');
		input.type = 'checkbox';
		input.name = 'massrecruitopenend_'+i;
		if(grpidx >= 0)
			input.checked = settings[grpidx].openend[i] ? 'checked' : '';
		td.appendChild(input);
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
	
	
	var tr = ce('tr');
	var th = ce('th');
	th.textContent = lang[curlang]['farmfree'];
	th.title = lang[curlang]['farmfree'];
	th.style.textAlign = 'right';
	tr.appendChild(th);
	var td = ce('td');
	td.setAttribute('colspan', units.length);
	var span = ce('span');
	span.id = 'massrecruit_neededworkers';
	span.style.cssFloat = 'right';
	td.appendChild(span);
	var input = ce('input');
	input.id = 'massrecruitfree';
	input.type = 'text';
	input.size = '3';
	input.setAttribute('maxlength', '5');
	if(grpidx >= 0)
		input.value = settings[grpidx].free == 0 ? '' : settings[grpidx].free;
	td.appendChild(input);
	tr.appendChild(td);
	tbody.appendChild(tr);
	
	var tr = ce('tr');
	var th = ce('th');
	th.textContent = lang[curlang]['resfree'];
	th.title = lang[curlang]['resfree'];
	th.style.textAlign = 'right';
	tr.appendChild(th);
	var td = ce('td');
	td.setAttribute('colspan', units.length);
	
	for(var i = 0; i < 3; i++) {
		var img = ce('img');
		if(i == 0) {
			img.src = 'graphic/holz.png';
			img.title = img.alt = 'Holz';
		} else if(i == 1) {
			img.src = 'graphic/lehm.png';
			img.title = img.alt = 'Lehm';
		} else if(i == 2) {
			img.src = 'graphic/eisen.png';
			img.title = img.alt = 'Eisen';
		}
		img.setAttribute('style', 'vertical-align: middle;');
		td.appendChild(img);
		var input = ce('input');
		input.id = 'massrecruitres_'+i;
		input.type = 'text';
		input.size = '6';
		input.setAttribute('maxlength', '6');
		if(grpidx >= 0 && settings[grpidx].res)
			input.value = settings[grpidx].res[i] == 0 ? '' : settings[grpidx].res[i];
		td.appendChild(input);
		if(i != 2)
			td.appendChild(document.createTextNode(' '));
	}
	tr.appendChild(td);
	tbody.appendChild(tr);
	
	var tr = ce('tr');
	tr.appendChild(ce('td'));
	var td = ce('td');
	td.setAttribute('colspan', units.length);
	td.style.textAlign = 'center';
	var btn = ce('button');
	btn.setAttribute('style', 'font-size:8pt;');
	btn.textContent = lang[curlang]['save'];
	btn.addEventListener('click', function(){
		// save settings
		var currentsettings = getCurrentSettings(selectedgroup);
		if(grpidx < 0) {
			settings.push(currentsettings);
			grpidx = Array.searchgroup(settings, selectedgroup);
		} else {
			settings[grpidx] = currentsettings;
		}
		set_cookie(settings);
	}, false);
	td.appendChild(btn);
	td.appendChild(document.createTextNode(' '));
	
	var btn = ce('button');
	btn.setAttribute('style', 'font-size:8pt;');
	btn.textContent = lang[curlang]['fill'];
	btn.addEventListener('click', function(evt){
		// calculate and fill
		evt.target.disabled = true;
		evt.target.textContent = lang[curlang]['running'];
		var currentsettings = getCurrentSettings(selectedgroup);
		var rows = $x('//form[contains(@action,"screen=train") and contains(@action,"mode=success") and contains(@action,"action=train_mass") and contains(@action,"h=")]/table[1]/tbody/tr/td/parent::tr');
		var builtsum = [];
		for(var i = 0; i < units.length; i++) {
			builtsum[i] = 0;
		}
		var builtvilnum = 0;
		for(var i = 0; i < rows.length; i++) {
			var cells = $x('td', rows[i]);
			if(cells.length > 0) {
				// get resources
				var r = cells[1].textContent.split("\n");
				var res = [];
				var offset = 1;
				if(/\d/.test(r[0]))
					offset = 0;
				for(var j = 0; j < 3; j++) {
					res[j] = parseInt(r[j+offset].replace(/\./, ''), 10) - currentsettings.res[j];
					if(!res[j] || res[j] < 0)
						res[j] = 0;
				}
				// get worker
				var worker = cells[2].textContent.split('/');
				worker[0] = parseInt(worker[0], 10);
				worker[1] = parseInt(worker[1], 10);
				// get units
				var vilunits = [];
				for(var j = 3; j < cells.length; j++) {
					var idx = j - 3;
					vilunits[idx] = {ok: false, units: 0};
					var indicator = $x('div/a/img[contains(@src,"/prod_")]', cells[j]);
					if(indicator.length == 0)
						continue;
					vilunits[idx].ok = true;
					vilunits[idx].units = parseInt(indicator[0].parentNode.parentNode.textContent, 10);
					if(indicator[0].title != '')
						vilunits[idx].units += parseInt(indicator[0].title, 10);
				}
				// calculate
				
				// calculate costs for x units
				var getCosts = function(unit, num) {
					return [
						num * costs[unit][0],
						num * costs[unit][1],
						num * costs[unit][2],
						num * costs[unit][3],
						num * costs[unit][4]
					];
				};
				// add up all troup costs
				var sumCosts = function(unitcosts) {
					var sumunitcosts = new Array(unitcosts[0].length);
					for(var j = 0; j < sumunitcosts.length; j++) {
						sumunitcosts[j] = 0;
					}
					for(var j = 0; j < unitcosts.length; j++) {
						for(var k = 0; k < unitcosts[j].length; k++) {
							sumunitcosts[k] += unitcosts[j][k];
						}
					}
					return sumunitcosts;
				};
				// calculate max available resources
				var getMaxCosts = function(unitcosts, resavail, workerfree, openend) {
					var maxfactor = 0;
					var idx = 0;
					var factor = 0;
					for(var j = 0; j < 4; j++) {
						if(j == 3)
							factor = unitcosts[j] / workerfree;
						else
							factor = unitcosts[j] / resavail[j];
						if((openend || (!openend && factor > 1)) && factor > maxfactor) {
							maxfactor = factor;
							idx = j;
						}
					}
					var maxcosts = [];
					if(!openend && maxfactor < 1) {
						maxcosts = unitcosts;
					} else {
						for(var j = 0; j < 4; j++) {
							maxcosts[j] = unitcosts[j] / maxfactor;
						}
					}
					return maxcosts;
				};
				// calculate max units
				var getPossibleUnits = function(resavail, workeravail) {
					var openendunits = [];
					var numunits = 0;
					for(var j = 0; j < currentsettings.units.length; j++) {
						if(currentsettings.openend[j]) {
							openendunits.push(getCosts(units[j].unit, currentsettings.units[j]));
							numunits += currentsettings.units[j];
						}
					}
					var sum = sumCosts(openendunits);
					var max = getMaxCosts(sum, resavail, workeravail, true);
					var build = new Array(currentsettings.units.length);
					for(var j = 0; j < currentsettings.units.length; j++) {
						if(currentsettings.openend[j]) {
							build[j] = (max[0] / sum[0]) * currentsettings.units[j];
						} else
							build[j] = 0;
					}
					return build;
				};
				var tobuild = [];
				for(var j = 0; j < vilunits.length; j++) {
					if(vilunits[j].ok) {
						tobuild[j] = currentsettings.units[j] - vilunits[j].units;
						if(tobuild[j] < 0)
							tobuild[j] = 0;
					} else
						tobuild[j] = 0;
				}
				var build = new Array(tobuild.length);
				var scosts = [];
				for(var j = 0; j < tobuild.length; j++) {
					scosts.push(getCosts(units[j].unit, tobuild[j]));
				}
				var sum = sumCosts(scosts);
				var max = getMaxCosts(sum, res, worker[1] - (worker[0] + currentsettings.free));
				var factor = (worker[1] - (worker[0] + currentsettings.free)) > 0 ? (max[0] / sum[0]) : 0;
				for(var j = 0; j < build.length; j++) {
					if(max[0] == 0) {
						build[j] = 0;
						continue;
					}
					build[j] = tobuild[j] * factor;
				}
				// open end
				if(Math.ceil(max[0]) < res[0] && Math.ceil(max[1]) < res[1] && Math.ceil(max[2]) < res[2] && ((worker[1] - Math.ceil(max[3])) - worker[0]) - currentsettings.free > 0) {
					var more = false;
					for(var j = 0; j < currentsettings.units.length; j++) {
						if(currentsettings.openend[j] && currentsettings.units[j] > 0) {
							var possible = getPossibleUnits([res[0] - max[0], res[1] - max[1], res[2] - max[2]], ((worker[1] - worker[0]) - max[3]) - currentsettings.free);
							for(var k = 0; k < build.length; k++) {
								build[k] += possible[k];
							}
							break;
						}
					}
					
				}
			}
			// fill form
			var vilcounted = false;
			for(var j = 3; j < cells.length; j++) {
				var idx = j - 3;
				builtsum[idx] += Math.floor(build[idx]);
				var field = $x('input[not(@disabled)]', cells[j]);
				if(field.length > 0) {
					if(Math.floor(build[idx]) > 0) {
						field[0].value = Math.floor(build[idx]);
						if(!vilcounted) {
							builtvilnum++;
							vilcounted = true;
						}
					} else {
						if(field[0].value != '')
							field[0].value = '';
					}
				}
			}
		}
		var builtstr = '';
		for(var i = 0; i < builtsum.length; i++) {
			builtstr += '' + builtsum[i];
			if(builtsum.length - 1 != i)
				builtstr += ', ';
		}
		document.getElementById('massrecruitbuilt').textContent = lang[curlang]['filled'].replace(/%1/, builtstr).replace(/%2/, builtvilnum);
		evt.target.textContent = lang[curlang]['fill'];
		evt.target.disabled = false;
	}, false);
	td.appendChild(btn);
	td.appendChild(document.createTextNode(' '));
	
	var btn = ce('button');
	btn.setAttribute('style', 'font-size:8pt;');
	btn.textContent = lang[curlang]['recruit'];
	btn.addEventListener('click', function(){
		// click recruiting button
		var submit = $x('input[@type="submit"]', recform[0]);
		if(submit.length > 0)
			submit[0].click();
	}, false);
	td.appendChild(btn);
	
	var div = ce('div');
	div.id = 'massrecruitbuilt';
	div.setAttribute('style', 'padding: 2px');
	td.appendChild(div);
	
	tr.appendChild(td);
	tbody.appendChild(tr);
	
	table.appendChild(tbody);
	
	setcon.appendChild(table);
	recform[0].parentNode.insertBefore(ce('hr'), recform[0]);
	recform[0].parentNode.insertBefore(setcon, recform[0]);
	recform[0].parentNode.insertBefore(ce('hr'), recform[0]);
	if(grpidx > 0)
		updateWorkers();

})();
