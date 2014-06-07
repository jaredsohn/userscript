// ==UserScript==
// @name			Oros
// @namespace		oros
// @description		Ogame Redesign Ouadjet Script
// @include			http://*.ogame.*/game/index.php?page=*
// @require			http://userscripts.org/scripts/source/79503.user.js
// @version			1.2.5b
// ==/UserScript==

console.time('Oros');
var $ = unsafeWindow.jQuery;
var version = '1.2.5b';


/*============================================================================*\
|                                  PROTOTYPE                                   |
\*============================================================================*/

Boolean.prototype.toAttrCheck = function () {
	return this == true ? 'checked="checked"' : '';
}
Date.prototype.format = function (sFormat, bHideDateIfCurrent) {
	var now = new Date();
	var D, d, m, y, h, n, s, z;

	if (!sFormat || sFormat == '')
		sFormat = 'ddd dd/mm/yy hh:nn:ss';

	D = this.getDay();
	d = this.getDate();
	m = this.getMonth();
	y = this.getFullYear();
	h = this.getHours();
	n = this.getMinutes();
	s = this.getSeconds();
	z = this.getMilliseconds();

	if (bHideDateIfCurrent && d == now.getDate())
		sFormat = sFormat.replace(/[^\\]{1}d{1,4}/g, '');

	if (bHideDateIfCurrent && m == now.getMonth())
		sFormat = sFormat.replace(/[^\\]{1}m{1,4}/g, '');

	if (bHideDateIfCurrent && y == now.getFullYear())
		sFormat = sFormat.replace(/[^\\]{1}y{2,4}/g, '');

	//Jour de la semaine
	sFormat = sFormat.replace(/d{4}/, TXT.date.day[D].long);
	sFormat = sFormat.replace(/d{3}/, TXT.date.day[D].short);
	//Jour du mois
	sFormat = sFormat.replace(/d{2}/, (d < 10 ? '0' : '') + d);
	sFormat = sFormat.replace(/[^\\]d/, d);
	//Mois
	sFormat = sFormat.replace(/m{4}/, TXT.date.month[m].long);
	sFormat = sFormat.replace(/m{3}/, TXT.date.month[m].short);
	m++;
	sFormat = sFormat.replace(/m{2}/, (m < 10 ? '0' : '') + m);
	sFormat = sFormat.replace(/[^\\]m{1}/, m);
	//Année
	sFormat = sFormat.replace(/y{4}/, y);
	sFormat = sFormat.replace(/y{2}/, new String(y).substr(2, 2));
	//Heure
	sFormat = sFormat.replace(/h{2}/, (h < 10 ? '0' : '') + h);
	sFormat = sFormat.replace(/[^\\]h{1}/, h);
	//Minutes
	sFormat = sFormat.replace(/n{2}/, (n < 10 ? '0' : '') + n);
	sFormat = sFormat.replace(/[^\\]n{1}/, n);
	//Secondes
	sFormat = sFormat.replace(/s{2}/, (s < 10 ? '0' : '') + s);
	sFormat = sFormat.replace(/[^\\]s{1}/, s);
	//Millisecondes
	sFormat = sFormat.replace(/z{2}/, (z < 100 ? '0' : '') + (z < 10 ? '0' : '') + z);
	sFormat = sFormat.replace(/[^\\]z{1}/, z);
	
	while (sFormat.match(/\\(.){1}/))
		sFormat = sFormat.replace(/\\(.){1}/, '$1');

	return sFormat;
}
Date.prototype.parse = function (sText) {
	sText = sText.split(/(\d{1,2})[a-z]{1}/);
	var z = 0;
	var f = 1000;
	for (var i = sText.length - 1; i > -1; i--) {
		if (sText[i] == '') sText.
		z += sText[i] * f;
		f *= f < 3600000 ? 60 : 24
	}
	this.setTime(z);
}
Object.prototype.merge = function (anObject) {
	for (var attr in anObject) {
		if (typeof(anObject[attr]) == 'function') continue;

		if (this[attr] && typeof(anObject[attr]) == 'object' && anObject[attr] != null)
			this[attr].merge(anObject[attr]);
		else
			this[attr] = anObject[attr];
	}
	return this;
}
String.prototype.format = function() {
    var text = this;
    var result = text.match(/\\{0}\{\d+\\{0}\}/g);
    if (result)
        for (var i = 0; i < result.length; i++)
            text = text.replace(result[i], arguments[i]);

    return text;
}
String.prototype.getMatch = function (reg, i, def) {
	return this.find(reg) && this.match(reg).length > i ? this.match(reg)[i] : def;
}
String.prototype.find = function (value) {
	return this.search(value) > -1;
}
String.prototype.trim = function () {
	return this.replace(/^\s+|\s+$/g, '');
}
String.prototype.toCoord = function () {
	var reg = /[\[\(](\d{1})[:|,](\d{1,3})[:|,](\d{1,2})[\]|\)]/;
	var result = reg.exec(this);
	var coord = null;
	if (result) {
		coord = new Coord();
		coord.galaxy = parseInt(result[1]);
		coord.system = parseInt(result[2]);
		coord.position = parseInt(result[3]);
	}
	return coord;
}
String.prototype.toNum = function (separator) {
	separator = separator ? separator : '';
	var x = this.replace(/\./g, '').replace(/\s+/g, '').replace(',', '.').replace(new RegExp(separator, 'g'), '');
	if (x.find(/[kK]/i))
		return x.replace(/[kK]/i, '') * 1000;
	if (x.find(/[mM]/i))
		return x.replace(/[mM]/i, '') * 1000000;
	return x * 1;
}
Number.prototype.toStr = function (full) {
	var negative = this < 0 ? '-' : '';
	var i = Math.abs(this);
	var unit = '';
	var str = '';

	if (!full) {
		if (i >= 1000000) {
			i /= 1000000;
			unit = options.unit.mega;
		} else if (i >= 100000) {
			i /= 1000; 
			unit = options.unit.kilo;
		}
	}
	str = i.toFixed(2).toString().replace('.00', '').replace('.', options.unit.decimal);

	i = str.indexOf(options.unit.decimal);
	i = (i == -1 ? str.length : i) - 4;
	for (i; i > -1; i -= 3)
		str = str.substring(0, i + 1) + options.unit.thousand + str.substring(i + 1);
	return negative + str + unit;
}
console.debugInfo = function (title, depth) {
	var c = console.debugInfo.caller;
	depth = depth || 3;

	console.group(title);
	for (var i = 0; i < depth; i++) {
		console.info(c);
		console.info(c.arguments);
		c = c.caller;
	}
	console.groupEnd();
}

/*============================================================================*\
|                                   DONNEES                                    |
\*============================================================================*/

var GID = {
	resources: ['mmet', 'mcri', 'mdet', 'ces', 'cef', 'ss', 'hmet', 'hcri', 'hdet'],
	station: ['rob', 'cspa', 'lab', 'depo', 'silo', 'nan', 'ter', 'base', 'phal', 'port'],
	shipyard: ['cle', 'clo', 'crois', 'vb', 'traq', 'bomb', 'dest', 'edlm', 'pt', 'gt', 'vc', 'rec', 'esp', 'ss'],
	defense: ['lm', 'lle', 'llo', 'gauss', 'ion', 'pla', 'pb', 'gb', 'mic', 'mip'],
	research: ['ener', 'lase', 'ions', 'hype', 'plas', 'comb', 'impu', 'phyp', 'espi', 'ordi', 'astr', 'rese', 'grav', 'arme', 'bouc', 'prot'],
	mmet: {id: 1, cost: new Cost(60, 15, 0, 1.5) },
	mcri: {id: 2, cost: new Cost(48, 24, 0, 1.6) },
	mdet: {id: 3, cost: new Cost(225, 75, 0, 1.5) },
	ces: {id: 4, cost: new Cost(75, 30, 0, 1.5) },
	cef: {id: 12, cost: new Cost(900, 360, 180, 1.8) },
	rob: {id: 14, cost: new Cost(400, 120, 200, 2) },
	nan: {id: 15, cost: new Cost(1000000, 500000, 100000, 2) },
	cspa: {id: 21, cost: new Cost(400, 200, 100, 2) },
	hmet: {id: 22, cost: new Cost(1000, 0, 0, 2) },
	hcri: {id: 23, cost: new Cost(1000, 500, 0, 2) },
	hdet: {id: 24, cost: new Cost(1000, 1000, 0, 2) },
	lab: {id: 31, cost: new Cost(200, 400, 200, 2) },
	ter: {id: 33, cost: new Cost(0, 50000, 100000, 2, 1000) },
	depo: {id: 34, cost: new Cost(20000, 40000, 0, 2) },
	base: {id: 41, cost: new Cost(20000, 40000, 20000, 2) },
	phal: {id: 42, cost: new Cost(20000, 40000, 20000, 2) },
	port: {id: 43, cost: new Cost(2000000, 4000000, 2000000, 2) },
	silo: {id: 44, cost: new Cost(20000, 20000, 1000, 2) },
	espi: {id: 106, cost: new Cost(200, 1000, 200, 2) },
	ordi: {id: 108, cost: new Cost(0, 400, 600, 2), bonus: 1 },
	arme: {id: 109, cost: new Cost(800, 200, 2), bonus: 10 },
	bouc: {id: 110, cost: new Cost(200, 600, 2), bonus: 10 },
	prot: {id: 111, cost: new Cost(1000, 0, 0, 2), bonus: 10 },
	ener: {id: 113, cost: new Cost(0, 800, 400, 2) },
	hype: {id: 114, cost: new Cost(4000, 2000, 2) },
	comb: {id: 115, cost: new Cost(400, 600, 0, 2), bonus: 10 },
	impu: {id: 117, cost: new Cost(2000, 4000, 600, 2), bonus: 20 },
	phyp: {id: 118, cost: new Cost(10000, 20000, 6000, 2), bonus: 30 },
	lase: {id: 120, cost: new Cost(200, 100, 0, 2) },
	ions: {id: 121, cost: new Cost(1000, 300, 100, 2) },
	plas: {id: 122, cost: new Cost(2000, 4000, 1000, 2) },
	rese: {id: 123, cost: new Cost(240000, 400000, 160000, 2), bonus: 1 },
	astr: {id: 124, cost: new Cost(4000, 8000, 4000, 2) },
	grav: {id: 199, cost: new Cost(0, 0, 0, 3, 300000) },
	pt: {id: 202, cost: new Cost(2000, 2000), power: 5, shield: 10, structure: 4000, speed: [{lvl: 1, tag: 'comb', base: 5000}, {lvl: 5, tag: 'impu', base: 10000}], cargo: 5000 },
	gt: {id: 203, cost: new Cost(6000, 6000), power: 5, shield: 25, structure: 12000, speed: [{tag: 'comb', base: 7500}], cargo: 25000 },
	cle: {id: 204, cost: new Cost(3000, 1000), power: 50, shield: 10, structure: 4000, speed: [{tag: 'comb', base: 12500}] },
	clo: {id: 205, cost: new Cost(6000, 4000), power: 150, shield: 25, structure: 10000, speed: [{tag: 'comb', base: 10000}] },
	crois: {id: 206, cost: new Cost(20000, 7000, 2000), power: 400, shield: 50, structure: 27000, speed: [{tag: 'impu', base: 15000}] },
	vb: {id: 207, cost: new Cost(45000, 15000), power: 1000, shield: 200, structure: 60000, speed: [{tag: 'phyp', base: 10000}] },
	vc: {id: 208, cost: new Cost(10000, 20000, 10000), power: 50, shield: 100, structure: 30000, speed: [{tag: 'impu', base: 2500}] },
	rec: {id: 209, cost: new Cost(10000, 6000, 2000), power: 1, shield: 10, structure: 16000, speed: [{tag: 'comb', base: 2000}], cargo: 20000 },
	esp: {id: 210, cost: new Cost(0, 1000), power: 0, shield: 0, structure: 1000, speed: [{tag: 'comb', base: 100000000}] },
	bomb: {id: 211, cost: new Cost(50000, 25000, 15000), power: 1000, shield: 500, structure: 75000, speed: [{lvl: 1, tag: 'impu', base: 4000}, {lvl: 8, tag: 'phyp', base: 5000}]  },
	ss: {id: 212, cost: new Cost(0, 2000, 500), power: 1, shield: 1, structure: 2000 },
	dest: {id: 213, cost: new Cost(60000, 50000, 15000), power: 2000, shield: 500, structure: 110000, speed: [{tag: 'phyp', base: 5000}] },
	edlm: {id: 214, cost: new Cost(5000000, 4000000, 1000000), power: 200000, shield: 50000, structure: 9000000, speed: [{tag: 'comb', base: 100}] },
	traq: {id: 215, cost: new Cost(30000, 40000, 15000), power: 700, shield: 400, structure: 70000, speed: [{tag: 'phyp', base: 10000}] },
	lm: {id: 401, cost: new Cost(2000), power: 80, shield: 20, structure: 2000 },
	lle: {id: 402, cost: new Cost(1500, 500), power: 100, shield: 25, structure: 2000 },
	llo: {id: 403, cost: new Cost(6000, 2000), power: 250, shield: 100, structure: 8000 },
	gauss: {id: 404, cost: new Cost(20000, 15000, 2000), power: 1100, shield: 200, structure: 35000 },
	ion: {id: 405, cost: new Cost(2000, 6000), power: 150, shield: 500, structure: 8000 },
	pla: {id: 406, cost: new Cost(50000, 50000, 30000), power: 3000, shield: 300, structure: 100000 },
	pb: {id: 407, cost: new Cost(10000, 10000), power: 1, shield: 2000, structure: 20000 },
	gb: {id: 408, cost: new Cost(50000, 50000), power: 1, shield: 10000, structure: 100000 },
	mic: {id: 502, cost: new Cost(8000, 0, 2000) },
	mip: {id: 503, cost: new Cost(12500, 2500, 10000) },
	getTag: function (id) {
		for (var tag in this) {
			if (typeof(this[tag]) == 'function') continue;
			if (this[tag].id == id)
				return tag;
		}
	},
	getCost: function (tag, lvl) {
		var cost = new Cost();
		if (this[tag].id > 199) {
			cost.m = this[tag].cost.m * lvl;
			cost.c = this[tag].cost.c * lvl;
			cost.d = this[tag].cost.d * lvl;
		} else {
			cost.m = this[tag].cost.m * Math.pow(this[tag].cost.f, lvl - 1);
			cost.c = this[tag].cost.c * Math.pow(this[tag].cost.f, lvl - 1);
			cost.d = this[tag].cost.d * Math.pow(this[tag].cost.f, lvl - 1);
			cost.e = this[tag].cost.e * Math.pow(this[tag].cost.f, lvl - 1);
		}
		return cost;
	},
	getTotalCost: function(tag, lvl, initialLvl) {
		if (this[tag].id > 199) {
			return this.getCost(tag, lvl);
		}

		var cost = new Cost(GID[tag].cost.m * (1 - Math.pow(2, lvl)) * -1,
			GID[tag].cost.c * (1 - Math.pow(2, lvl)) * -1,
			GID[tag].cost.d * (1 - Math.pow(2, lvl)) * -1);
		if (initialLvl) {
			var cost2 = new Cost(GID[tag].cost.m * (1 - Math.pow(2, initialLvl)) * -1,
			GID[tag].cost.c * (1 - Math.pow(2, initialLvl)) * -1,
			GID[tag].cost.d * (1 - Math.pow(2, initialLvl)) * -1);

			cost.m -= cost2.m;
			cost.c -= cost2.c;
			cost.d -= cost2.d;
		}
		return cost
	}
}

/* @Translators
	How to translate Oros :
	* copy the text below (between the "START COPY HERE" and "END COPY HERE")
	* paste it just !before! the "PASTE HERE" at the end of the file
	* change "YOURLANG" in the text you just paste by your language as it appears in the Ogame url (for exemple en, fr, cn, de, ...)
	* translate only the part that are between ' or "
	* if you see "{0}" (or any number within the {}), don't translate it ^^
	* you have to put a backslash "\" before all ' or ", depending on the one you choose to start the string
		exemple:
			don't write 'My tailor isn't "rich"' but 'My tailor isn\'t "rich"'
			don't write "My tailor isn't "rich"" but "My tailor isn't \"rich\""
*/
var defaultTXT = {
	en: {
		general: {
			on: 'on',
			off: 'off',
			save: 'Save',
			saveSuccess: 'Save successed',
			saveFailed: 'Save failed',
			production: { long: 'Production', short: 'Prod' },
			consumption: { long: 'Consumption', short: 'Cons' },
			endTimeConstruction: 'Construction end time',
			total: 'Total',
			remaining: 'remaining',
			missing: 'missing',
			needed: 'needed',
			notdone: 'Not done yet. Check back on version updates.',
			date: 'Date',
			activity: 'Activity',
			attack: 'Attack',
			copy: 'Copy',
			state: 'State',
			time: 'Time',
			init: 'Reset',
			version: 'Version',
			active: 'Active',
			send: 'Send'
		},
		calc: {
			title: 'Calculator',
			converter: 'Converter',
			shortDeut: 'Deut.',
			valueError: 'The value "{0}" isn\'t a correct value !',
			totalLink: 'Click here to set the calculator resources to this cost.',
			missingLink: 'Click here to set the calculator resources to the missing cost.'
		},
		dailyTransport: {
			title: 'Daily Transport',
			nextPlanet: 'Next planet',
			done: 'Daily transport complete'
		},
		date: { //@Translators: in the "date" section, put 2 backslash "\\" before all the following letters : d m y h n s z
			day: [
				{ short: 'Su', long: 'Su\\n\\da\\y' },
				{ short: 'Mo', long: 'Mo\\n\\da\\y' },
				{ short: 'Tu', long: 'Tue\\s\\da\\y' },
				{ short: 'We', long: 'We\\d\\ne\\s\\da\\y' },
				{ short: 'Th', long: 'T\\hur\\s\\da\\y' },
				{ short: 'Fr', long: 'Fri\\da\\y' },
				{ short: 'Sa', long: 'Satur\\da\\y' }
			],
			month: [
				{ short: 'Ja\\n', long: 'Ja\\nuar\\y' },
				{ short: 'Feb', long: 'Februar\\y' },
				{ short: 'Mar', long: 'Marc\\h'},
				{ short: 'Apr', long: 'April'},
				{ short: 'Ma\\y', long: 'Ma\\y'},
				{ short: 'Ju\\ne', long: 'Ju\\ne'},
				{ short: 'Jul', long: 'Jul\\y' },
				{ short: 'Aug', long: 'Augu\\st'},
				{ short: 'Sep', long: 'Septe\\mber' },
				{ short: 'Oct', long: 'October' },
				{ short: 'Nov', long: 'Nove\\mber' },
				{ short: 'Dec', long: 'Dece\\mber' },
			],
			timespan: {
				year: {short: 'y', long: 'Year'},
				month: {short: 'M', long: 'Month'},
				week: {short: 'w', long: 'Week'},
				day: {short: 'd', long: 'Day'},
				hour: {short: 'h', long: 'Hour'},
				minute: {short: 'm', long: 'Minute'},
				second: {short: 's', long: 'Second'}
			}
		},
		resources: {
			metal: { long: 'Metal', short: 'm' }, // /!\ "M" is used for million (depending on your language)
			cristal: { long: 'Crystal', short: 'c' },
			deuterium: { long: 'Deuterium', short: 'd' },
			energy: { long: 'Energy', short: 'e' },
			mmet: { long: 'Metal Mine', short: 'mmet' },
			mcri: { long: 'Crystal Mine', short: 'mcry' },
			mdet: { long: 'Deuterium Synthesizer', short: 'mdet' },
			ces: { long: 'Solar Plant', short: 'sp' },
			cef: { long: 'Fusion Reactor', short: 'fr' },
			hmet: { long: 'Metal Storage', short: 'smet' },
			hcri: { long: 'Crystal Storage', short: 'scri' },
			hdet: { long: 'Deuterium Tank', short: 'sdet' }
		},
		station: {
			time: 'Time gained',
			slot: 'Maximum usable fields',
			network: 'This Research Lab is part of the Intergalactic Research Network which is level {0}.',
			rob: { long: 'Robotic Factory', short: 'RF' },
			cspa: { long: 'Shipyard', short: 'SY' },
			lab: { long: 'Research Lab', short: 'Lab' },
			silo: { long: 'Missile Silo', short: 'Silo' },
			depo: { long: 'Alliance Depot', short: 'AD' },
			nan: { long: 'Nanite Factory', short: 'NAN' },
			ter: { long: 'Terraformer', short: 'Terra' },
		},
		shipyard: {
			cle: { long: 'Light Fighter', short: 'LF' },
			clo: { long: 'Heavy Fighter', short: 'HF' },
			crois: { long: 'Cruiser', short: 'CR' },
			vb: { long: 'Battleship', short: 'BS' },
			traq: { long: 'Battlecruiser', short: 'BC' },
			bomb: { long: 'Bomber', short: 'Bomb' },
			dest: { long: 'Destroyer', short: 'Dest' },
			edlm: { long: 'Deathstar', short: 'RIP' },
			pt: { long: 'Small Cargo Ship', short: 'SC' },
			gt: { long: 'Large Cargo Ship', short: 'LC' },
			vc: { long: 'Colony Ship', short: 'CS' },
			rec: { long: 'Recycler', short: 'Rec' },
			esp: { long: 'Espionage Probe', short: 'Probe' },
			ss: { long: 'Solar Satellite', short: 'Sat' }
		},
		defense: {
			lm: { long: 'Rocket Launcher', short: 'RL' },
			lle: { long: 'Light Laser', short: 'LL' },
			llo: { long: 'Heavy Laser', short: 'HL' },
			gauss: { long: 'Gauss Cannon', short: 'Gauss' },
			ion: { long: 'Ion Cannon', short: 'Ion' },
			pla: { long: 'Plasma Turret', short: 'PT' },
			pb: { long: 'Small Shield Dome', short: 'SSD' },
			gb: { long: 'Large Shield Dome', short: 'LSD' },
			mic: { long: 'Anti-Ballistic Missile', short: 'ABM' },
			mip: { long: 'Interplanetary Missile', short: 'IPM' }
		},
		options: {
			langTitle: 'Language',
			tabs: { general: 'General', page: 'Pages' },
			calc: { title: 'Calculator', show: 'Show' },
			dailyTransport: {title: 'Daily Transport', active: 'Active', main: 'Homeland' },
			date: {
				title: 'Date & Time',
				format: 'Display format of dates',
				complete: 'Show full date',
				formatHelp: '<table class="zebra" cellpadding="0" cellspacing="0">'
					+ '<tr><th colspan="3">Available date format</th></tr>'
					+ '<tr><th>Format</th>	<th>Description</th>						<th>Example</th></tr>'
					+ '<tr><td>dddd</td>	<td>Day name</td>							<td>Monday</td></tr>'
					+ '<tr><td>ddd</td>		<td>Short day name</td>						<td>Mo</td></tr>'
					+ '<tr><td>dd</td>		<td>Day (2 digits)</td>						<td>01</td></tr>'
					+ '<tr><td>d</td>		<td>Day</td>								<td>1</td></tr>'
					+ '<tr><td>mmmm</td>	<td>Month name</td>							<td>January</td></tr>'
					+ '<tr><td>mmm</td>		<td>Short month name</td>					<td>Jan</td></tr>'
					+ '<tr><td>mm</td>		<td>Month (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>m</td>		<td>Month</td>								<td>1</td></tr>'
					+ '<tr><td>yyyy</td>	<td>Year</td>								<td>2010</td></tr>'
					+ '<tr><td>yy</td>		<td>Year (2 digits)</td>					<td>10</td></tr>'
					+ '<tr><td>hh</td>		<td>Hour (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>h</td>		<td>Hour</td>								<td>1</td></tr>'
					+ '<tr><td>nn</td>		<td>Minute (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>n</td>		<td>Minute</td>								<td>1</td></tr>'
					+ '<tr><td>ss</td>		<td>Second (2 digits)</td>					<td>01</td></tr>'
					+ '<tr><td>s</td>		<td>Second</td>								<td>1</td></tr></table><br />'
					+ 'By default : "ddd dd/mm/yy hh:nn:ss" soit "Sa 26/06/10 16:30:45"<br />'
					+ 'To use one of the special chars above, write two backslashes "\\" before.'
					+ 'For example, "hh\\hnn\\mss\\s" give "16h30m45s"'
			},
			pages: {
				buildings: 'Resources & Station',
				research: 'Research',
				shipyard: 'Shipyard',
				defense: 'Defense',
				defenceOptimizer: 'Defense optimizer',
				showConso: 'Show consumption',
				showCost: 'Show cost',
				showEndTime: 'Show construction end time',
				showOptimizer: 'Show optimizer',
				showProd: 'Show production',
				messages: 'Messages',
				showShortcut: 'Show shortcuts',
				galaxy: 'Galaxy',
				showDebris: 'Show debris\' resources',
				minDebris: 'Display in red debris that contain more than ...',
				showColors: 'Show colors on all the line (inactive, vacation, strong, weak)',
				showDestroyed: 'Show available colony slot and destroyed planet in red<br />(only if you have at least one available colony slot)'
			}
		},
		oros: { 
			tabs: { home: 'Home', sim: 'Simulator & Tools', options: 'Options' }
		},
		setup: {
			title: 'Setup',
			step: 'step',
			step1: {
				desc: 'First of all, you need to visit at least two different planets to get all planets\' informations.',
				info: 'Click on a different planet on the right to continue.'
			},
			step2: {
				desc: 'Now that Oros know your planets, click on the Oros button to access Oros Home, Simulators and Options pages.',
				info: 'Click on the Oros button at the bottom of Ogame menu to continue.'
			},
			step3: {
				desc: 'This is the main frame for Oros. Here you\'ll find oros\' options, tools and help.',
				info: 'Click on the Options tab to continue.'
			},
			step4: {
					desc: '<p>General options allow you to enable/disable tools. Pages\' options will let you choose which information'
						+ ' you want to see on the Ogame pages.</p>'
						+ '<p>This is the last step of this setup. Visit each resources, station, shipyard and defenses pages'
						+ ' (as well as one research page) to get all your account informations. If you have the commander account,'
						+ ' you can just go to the Empire page to get everything, excepts constructions\' end time.</p>'
						+ '<p>After you finish this, you might want to check out Oros\' tutorials on Oros\' home page.</p>',
					info: 'Choose your home planet then click the "Save" button to finish the setup.'
			}
		},
		msg: {
			read: 'Mark as read',
			selected: 'Delete selected',
			notSelected: 'Delete not selected',
			shown: 'Delete shown',
			all: 'Delete all',
			empty: 'Empty',
			restore: 'Restore marked',
			restoreAll: 'Restore all'
		},
		home: {
			tabs: { home: 'Home', tuto: 'Tutorials', translation: 'Translations'},
			tuto: {
				desc: 'Do you want to know what Oros can do ?',
				info: 'Click on the button below or on the tab above to get on a tour of Oros.',
				btn: 'Start the tutorial',
				infoEnhancment: {
					desc: '',
					prod: '',
					cons: '',
					cefprod: '',
					cefcons: '',
					sat: '',
					research: '',
					cost: ''
				},
				calc: {
					desc: '',
					info: ''
				},
				dailyTransport: {
					desc: '',
					info: ''
				},
			},
			welcome: 'Welcome in Oros (Ogame Redesign Ouadjet Script) !',
			develop: 'Developped by Ouadjet, 2009-2010',
			homepage: 'View home page',
			reset: {
				title: 'Reset Oros',
				desc: 'Did you find bugs in Oros ? Did you installed it a long time ago, and many new versions have come ?',
				info: 'Reset your settings and data could help fixing bugs due to evolution.'
			}
		},
		sim: {
			tabs: { spy: 'SpyTool', grav: 'Graviton', costs: 'Construction' },
			spytool: { 
				state: ['Ok', 'Poor', 'Stronger', 'More probes', 'Too old', ''],
				supprAll: 'Delete all spy reports',
				minTotal: 'Minimum total resources to be "Ok" (set 0 to take each resource into account)',
				minM: 'Minimum metal to be "Ok"',
				minC: 'Minimum crystal to be "Ok"',
				minD: 'Minimum deuterium to be "Ok"',
				validTime: 'Time before it\'s "Too old"'
			},
			grav: {
				cspahelp: 'The shipyard is used to speed up your ships construction.<br/>'
					+ 'Enter the wanted level to get the total cost to it displayed on the right.',
				nanhelp: 'The nanite factory is used to speed up your ships construction.<br/>'
					+ 'Enter the wanted level to get the total cost to it displayed on the right.',
				labhelp: 'The research lab is necessary to research the graviton technology. It has to be level 12.<br/>'
					+ 'Enter the wanted level to get the total cost to it displayed on the right.',
				sshelp: 'Satellites are used to get enough energy to research graviton. You need 300k energy to do it.<br/>'
					+ 'The number on the right side of the image is the needed amount taking into account'
					+ ' your actual energy production.',
				gthelp: 'Large cargo ships are used to deliver the resources for satellites to be done at once.<br/>'
					+ 'In the bottom right corner, it displays the needed amount and in the top right corner you will find'
					+ ' the missing amount, taking into account ships on your main planet (defined in the options).',
				rechelp: 'Recyclers are used to get back the cristal when the research is done and your satellites are down.<br/>'
					+ 'In the bottom right corner, it displays the needed amount and in the top right corner you will find'
					+ ' the missing amount, taking into account ships on your main planet (defined in the options).',
				totalhelp: 'The total shows the total amount of resources needed to build everything and the time needed to'
					+ ' get all this resources taking into account your overall production and your home planet\'s stock.<br/>'
					+ 'Add/Remove an item from it by clicking on the <Take into account> link in front of each element.'
			}
		},
		update: {
			title: 'A new version of Oros is available.',
			help: '|Click here to go to the script\'s page.'
		},
		hint: {
			nextProd: 'Production at next level',
			curProd: 'Current production',
			diff: 'Difference between the two',
			energyLeft: 'Energy left on the planet after the construction',
			ssProd: 'Production per satellite',
			ssProdn: 'Production of {0} satellite(s)',
			nextCons: 'Consumption at next level',
			curCons: 'Current consumption',
			nextConsD: 'Deuterium consumption at next level',
			curConsD: 'Current deuterium consumption',
			deutLeft: 'Deuterium production after the construction',
			nextStock: 'Max stock at next level',
			curStock: 'Current max stock',
			rob: 'Used by Resources & Station',
			cspa: 'Used by Shipyard & Defense',
			nan: 'Used by Resources, Station, Shipyard & Defense',
			lab: 'Used by Research. Take into account the Intergalactic Research Network',
			nextSlot: 'Max planet slot after construction',
			curSlot: 'Current max planet slot'
		}
	}
};
var TXT = null;

var JSON = {};
(function () { // JSON
	var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			esc = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			meta = {'\b': '\\b', '\t': '\\t','\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'};
	function quote (x) {
		esc.lastIndex = 0;
		return '"' + (esc.test(x) ? x.replace(esc, function (a) { return typeof meta[a] == 'string' ? meta[a] : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); }) : x) + '"';
	}
	function str (key, holder) {
		var value = holder[key];
		value = value == null ? -1 : value;
		if ('string number boolean'.search(typeof value.valueOf()) + 1)
			value = value.valueOf();
		switch (typeof value) {
		case 'string':
			return quote(value);
		case 'number':
			return isFinite(value) ? String(value) : 'null';
		case 'boolean':
			return String(value);
		case 'object':
			if (!value)
				return 'null';
			var partial = [];
			if (typeof value.length == 'number' && !value.propertyIsEnumerable('length')) { // Array
				for (var i = 0; i < value.length; i++)
					partial[i] = str(i, value) || 'null';
				return partial.length === 0 ? '[]' : '[' + partial.join(',') + ']';
			}
			for (var k in value)
				if (Object.hasOwnProperty.call(value, k)) {
					var v = str(k, value);
					if (v)
							partial.push(quote(k) + (':') + v);
				}
			return partial.length === 0 ? '{}' : '{' + partial.join(',') + '}';
		}
	}
	JSON.stringify = function (value) { return str('', {'': value}); };
	JSON.parse = function (text) {
		cx.lastIndex = 0;
		if (cx.test(text))
			text = text.replace(cx, function (a) { return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4); });

		if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
			return eval('(' + text + ')');
		throw new SyntaxError('JSON.parse');
	};
})();

var defaultData = {
	activIndex: -1,
	isMoon: false,
	planet: [],
	moon: [],
	research: {
		getMIP: function (lvl) { return (5 * lvl) - 1; },
		getBonus: function (tag, lvl) {
			lvl = lvl || this[tag];
			switch (tag) {
			case 'ordi':
			case 'rese':
				return lvl + 1;
			case 'arme':
			case 'bouc':
			case 'prot':
			case 'comb':
			case 'impu':
			case 'phyp':
				return GID[tag].bonus * lvl;
			case 'astr':
				var bonus = { expe: Math.floor(Math.sqrt(lvl)) };
				if (info.redesign)
					bonus.colo = Math.ceil(lvl / 2) + 1;
				return bonus;
			}
		}
	},
	friends: [],
	ally: { name: '', tag: '', members: [] },
	calc: { m: 0, c: 0, d: 0, active: false, converter: false, rate: {m: 3, c: 2, d: 1} },
	officers: { commander: false, admiral: false, engineer: false, geologist: false, technocrat: false },
	activ: function () { return this.isMoon ? this.moon[this.activIndex] : this.planet[this.activIndex]; },
	main: function () {
		for (var i = 0; i < this.planet.length; i ++) { 
			if (this.planet[i].coord.equal(options.dailyTransport.main))
				return this.planet[i];
		}
	},
	getShip: function (total) {
		var result = {gt: 0, pt: 0, rec: 0, reste: 0, needed: 0};
		
		//Nombre de gt nécessaire ou disponible
		result.gt = Math.min(Math.ceil(total / 25000), this.activ().shipyard.gt);
		//Soute restante (< 0) ou ressources non prises (> 0)
		result.reste = total - result.gt * 25000;
/*		if (result.reste < -5000) {
			//Ressources non prises avec 1 gt en moins
			result.reste = total - (--result.gt * 25000);
			//Nombre de pt nécessaire pour les ressources restantes ou disponible
			result.pt = Math.min(Math.ceil(result.reste / 5000), this.activ().shipyard.pt);
			//Soutes restantes (< 0) ou ressources non prises (> 0) pour tous les vaisseaux
			result.reste = total - result.gt * 25000 - result.pt * 5000;
			if (result.reste > 0) {
				//il n'y a pas assez de pt pour tout prendre donc on remet le nombre de gt original
				result.gt++;
				result.pt = 0;
				result.reste = total - result.gt * 25000;
			}
		}
*/		
		if (result.reste < 0 && result.gt == this.activ().shipyard.gt) {
			//Nombre de pt nécessaire pour les ressources restantes ou disponible
			result.pt = Math.min(Math.ceil(result.reste / 5000), this.activ().shipyard.pt);
			//Soutes restantes (< 0) ou ressources non prises (> 0) pour tous les vaisseaux
			result.reste = total - result.gt * 25000 - result.pt * 5000;
			if (result.reste > 0) {
				//il n'y a pas assez de pt pour tout prendre donc on remet le nombre de gt original
				result.gt++;
				result.pt = 0;
				result.reste = total - result.gt * 25000;
			}
		}
		if (result.reste > 0) {
			result.pt = Math.min(Math.ceil(result.reste / 5000), this.activ().shipyard.pt);
			result.reste -= result.pt * 5000;
		}
		
		if (result.reste > 0) {
			result.rec = Math.min(Math.ceil(result.reste / 20000), this.activ().shipyard.rec);
			result.reste -= result.rec * 20000;
		}

		if (result.reste > 0) {
			result.needed = Math.ceil(result.reste / 25000);
		}

		return result;
	},
	getOverallProd: function () {
		var prod = new Cost();
		for (var i = 0; i < this.planet.length; i++) {
			prod.m += this.planet[i].getProd('mmet');
			prod.c += this.planet[i].getProd('mcri');
			prod.d += this.planet[i].getProd('mdet');
		}
		return prod;
	},
	getPlanetById: function (id) {
		for (var i = 0; i < this.planet.length; i++)
			if (this.planet[i].id == id)
				return this.planet[i];
	}
};

var defaultOptions = {
	lang: '',
	calc: {show: true},
	dailyTransport: {active: false, main: null},
	date: {format: 'ddd dd/mm/yy hh:nn:ss', complete: false},
	unit: {mega: 'M', kilo: 'K', decimal: ',', thousand: '.'},
	buildings: {showProd: true, showConso: true, showEndTime: true},
	research: {showEndTime: true, showBonus: true},
	shipyard: {showCost: true, showEndTime: true, showTime: true},
	spytool: {active: false, minTotal: 0, minM: 0, minC: 0, minD: 0, validTime: 3600000},
	galaxy: {showColors: true, showDestroyed: false, showDebris: true, minDebris: 15000},
	empire: {showProduction: true},
	messages: {showShortcut: true},
	defense: {
		showCost: true,
		showOptimizer: true,
		showEndTime: true,
		showTime: true,
		optimizer: {
			lm: 100,
			lle: 100,
			llo: 50,
			gauss: 15,
			ion: 0,
			pla: 5
		}
	}
};

/*============================================================================*\
|                                CONSTRUCTEURS                                 |
\*============================================================================*/

function BuildInfo(tag) {
	this.tag = tag;
	this.lvl = 0;
	this.end = 0;
}

function Coord(coord) {
	this.galaxy = coord ? coord.galaxy : 1;
	this.system = coord ? coord.system : 1;
	this.position = coord ? coord.position : 1;
	this.type = coord ? coord.type : 1;

	this.parse = function (txt) {
		txt = txt.replace('\(\)\[\]', '').split(':,');
		this.galaxy = txt[1];
		this.system = txt[2];
		thix.position = txt[3];
	}

	this.toString = function () {
		return '[' + this.galaxy + ':' + this.system + ':' + this.position + ']';
	}

	this.toLink = function () {
		return 'javascript:showGalaxy(' + this.galaxy + ',' + this.system + ',' + this.position + ')';
	}

	this.equal = function (coord) {
		return coord.galaxy == this.galaxy && coord.system == this.system && coord.position == this.position;
	}
}

function Proceed() {
	alert(document.forms.details);
}

function Cost(m, c, d, f, e) {
	this.m = (m || 0);
	this.c = (c || 0);
	this.d = (d || 0);
	this.f = (f || 1);
	this.e = (e || 0);

	this.toString = function () {
		var txt = '';
		if (this.m) txt = this.m.toStr() + TXT.resources.metal.short;
		if (this.c) txt += (txt ? ', ' : '') + this.c.toStr() + TXT.resources.cristal.short;
		if (this.d) txt += (txt ? ', ' : '') + this.d.toStr() + TXT.resources.deuterium.short;
		return txt;
	}

	this.total = function () {
		return this.m + this.c + this.d;
	}
}

function TimeSpan() {
	this.d = 0;
	this.h = 0;
	this.m = 0;
	this.s = 0;
	this.time = 0;

	this.setDays = function (value) {
		this.time = value;
		this.d = Math.floor(value);
		value = value % 1 * 24;
		this.h = Math.floor(value);
		value = value % 1 * 60;
		this.m = Math.floor(value);
		value = value % 1 * 60;
		this.s = Math.floor(value);
	}

	this.setHours = function (value) {
		value = value / 24;
		this.setDays(value);
	}

	this.setMinutes = function (value) {
		value = value / 24 / 60;
		this.setDays(value);
	}

	this.setSeconds = function (value) {
		value = value / 24 / 60 / 60;
		this.setDays(value);
	}

	this.toShortString = function () {
		var txt = '~' + (this.d > 0 ? this.d + TXT.date.timespan.day.short + ' ' : '')
			+ (this.h > 0 ? (this.h < 10 ? '0' : '') + this.h + TXT.date.timespan.hour.short : '');
		if (this.d > 0 && this.h > 0)
			return txt;

		txt += (this.m > 0 ? (this.m < 10 ? '0' : '') + this.m : '00') + TXT.date.timespan.minute.short;
		if (this.h > 0)
			return txt;

		txt += (this.s > 0 ? (this.s < 10 ? '0' : '') + this.s : '00') + TXT.date.timespan.second.short;
		return txt.replace('~', '');
	}

	this.toString = function () {
		return (this.d > 0 ? this.d + TXT.date.timespan.day.short + ' ' : '')
			+ (this.h > 0 ? (this.h < 10 ? '0' : '') + this.h + TXT.date.timespan.hour.short : '')
			+ (this.m > 0 ? (this.m < 10 ? '0' : '') + this.m + TXT.date.timespan.minute.short : '')
			+ (this.s > 0 ? (this.s < 10 ? '0' : '') + this.s : '00') + TXT.date.timespan.second.short;
	}
}

function Planet() {
	this.id = 0;
	this.name = '';
	this.minTemp = 0;
	this.maxTemp = 0;
	this.avgTemp = 0;
	this.maxCells = 0;
	this.coord = new Coord();
	this.resources = {};
	this.station = {};
	this.shipyard = {};
	this.defense = {};
	this.isMoon = false;

	initPlanet(this);
}

function initPlanet(planet) {
	planet.getProd = function(tag, lvl, ener) {
		var geo = data.officers.geologist ? 1.1 : 1;
		lvl = lvl || this.resources[tag] || this.shipyard[tag] || 0;
		if (tag == 'mmet')
			return Math.floor(30 * lvl * Math.pow(1.1, lvl) * geo + 20) * info.speed;
		else if (tag == 'mcri')
			return Math.floor(20 * lvl * Math.pow(1.1, lvl) * geo + 10) * info.speed;
		else if (tag == 'mdet') {
			if (info.redesign)
				return Math.floor(10 * lvl * Math.pow(1.1, lvl) * (1.36 - 0.004 * this.avgTemp) * geo) * info.speed;
			else
				return Math.floor(10 * lvl * Math.pow(1.1, lvl) * (1.28 - 0.002 * this.maxTemp) * geo) * info.speed;
		}
		else if (tag == 'ces')
			return Math.floor(20 * lvl * Math.pow(1.1, lvl));
		else if (tag == 'cef') {
			ener = ener || data.research.ener;
			return Math.floor(30 * lvl * Math.pow(1.05 + ener * 0.01, lvl));
		}
		else if (tag == 'ss')
			return lvl * Math.min(50, Math.floor((this.avgTemp + 160) / 6));
		else if ('hmet,hcri,hdet'.indexOf(tag) > -1)
			return lvl == 0 ? 10000 : 5000 * Math.floor(2.5 * Math.exp(20 * lvl / 33));
		else
			return 0;
	}
	planet.getConso = function(tag, lvl) {
		if (tag == 'mmet')
			return Math.ceil(10 * lvl * Math.pow(1.1, lvl));
		else if (tag == 'mcri')
			return Math.ceil(10 * lvl * Math.pow(1.1, lvl));
		else if (tag == 'mdet')
			return Math.ceil(20 * lvl * Math.pow(1.1, lvl));
		else if (tag == 'cef')
			return Math.ceil(10 * lvl * Math.pow(1.1, lvl)) * info.speed;
		else
			return 0;
	}
	planet.getTime = function(tag, lvl) {
		if ('rob,cspa'.indexOf(tag) == -1) return;

		return (100 / (lvl + 1)).toFixed(2);
	}
	planet.getEnergyProd = function(tag, lvl) {
		var cesLvl = tag == 'ces' ? this.getLvl(tag, lvl) : this.resources.ces;
		var cefLvl = tag == 'cef' ? this.getLvl(tag, lvl) : this.resources.cef;
		var ssLvl = tag == 'ss' ? this.getLvl(tag, lvl) : this.resources.ss;
		return this.getProd('ces', cesLvl) + this.getProd('cef', cefLvl) + this.getProd('ss', ssLvl);
	}
	planet.getEnergyConso = function(tag, lvl) {
		var mmetLvl = tag == 'mmet' ? this.getLvl(tag, lvl) : this.resources.mmet;
		var mcriLvl = tag == 'mcri' ? this.getLvl(tag, lvl) : this.resources.mcri;
		var mdetLvl = tag == 'mdet' ? this.getLvl(tag, lvl) : this.resources.mdet;
		return this.getConso('mmet', mmetLvl) + this.getConso('mcri', mcriLvl) + this.getConso('mdet', mdetLvl);
	}
	planet.getLvl = function(tag, lvl) {
		var actual = this[info.page][tag];
		return lvl ? (lvl == -1 ? (actual + 1) : lvl) : actual;
	}
	planet.getResearch = function () {
		var labs = [];
		var oldTime, newTime, index;
		var result = {network: false, lvl: 0, time: 0};
		
		function sortByLevel(a, b) { return b.level - a.level; } //Tri décroissant
		function sortByIndex(a, b) { return a.index - b.index; } //Tri croissant
		function total() {
			var total = 0;
			for (i = 0; i < labs.length; i++)
				if (labs[i].network)
					total += labs[i].level;
			return total;
		}

		//Récupération des informations sur les labo de chaque planète.
		for (i = 0; i < data.planet.length; i++) {
			labs[i] = {index: i, level: data.planet[i].station.lab, network: false};
			if (data.planet[i] == this) index = i;
		}

		//Recherche des labos en réseau
		labs.sort(sortByLevel);
		for (i = 0; i < data.research.getBonus('rese'); i++)
			labs[i].network = true;

		//Recherche du niveau de la planète (niveau total si en réseau, niveau individuel sinon)
		labs.sort(sortByIndex);
		result.network = labs[index].network;
		result.lvl = result.network ? total() : this.station.lab;

		//Recherche du gain de temps
		oldTime = 1000 * result.lvl;
		newTime = 1000 * (result.lvl + 1);
		result.time = ((newTime - oldTime) * 100 / newTime).toFixed(2);

		return result;
	}
	planet.getStock = function () {
		return this.resources.stock.m + this.resources.stock.c + this.resources.stock.d
	}
	planet.toString = function () {
		return this.name + ' ' + this.coord.toString();
	}
}

function Oros() {
	var that = this;
	this.info = null;
	this.updateUrl = 'http://userscripts.org/scripts/source/74440.user.js';
	this.homePage = 'http://userscripts.org/scripts/show/74440';
	this.updater = { session: info.session, updated: true, mustReset: true };

	function initLang() {
		switch (info.lang) {
		case 'us':
		case 'org': 
			info.lang = 'en';
			break;
		case 'br': 
			info.lang = 'pt';
			break;
		case 'ar':
		case 'mx': 
			info.lang = 'es';
			break;
		}

		var lang = options.lang || info.lang;
		TXT = JSON.parse(JSON.stringify(defaultTXT.en));
		if (unsafeWindow.orosTranslations && unsafeWindow.orosTranslations[lang] && lang != 'en')
			TXT.merge(unsafeWindow.orosTranslations[lang]);
		if (localStorage.getItem('orosLang_' + lang)) {
			TXT.merge(JSON.parse(localStorage.getItem('orosLang_' + lang)));
			unsafeWindow.orosTranslations[lang].merge(JSON.parse(localStorage.getItem('orosLang_' + lang)));
		}
	}

	function orosFadeBox(message, failed) {
		if (failed)
			$("#orosFadeBoxStyle").attr("class", "failed");
		else
			$("#orosFadeBoxStyle").attr("class", "success");

		$("#orosFadeBoxContent").html(message);
		$("#orosFadeBox").stop(false, true).show().fadeOut(5000); 
	}

	function showHome() {
		$('#buddies #tabs_example_one').html(
			'<li>'
				+ '<a id="orosHomeHome" class="reiter" href="#">'
					+ '<span>' + TXT.home.tabs.home + '</span>'
				+ '</a>'
			+ '</li>'
			+ '<li>'
				+ '<a id="orosHomeTuto" class="reiter" href="#">'
					+ '<span>' + TXT.home.tabs.tuto + '</span>'
				+ '</a>'
			+ '</li>'
			+ '<li>'
				+ '<a id="orosHomeTranslation" class="reiter" href="#">'
					+ '<span>' + TXT.home.tabs.translation + '</span>'
				+ '</a>'
			+ '</li>');
			
		$("a.reiter").click(function () {
			$("#buddies ul#tabs_example_one li a").removeClass("active");
			$(this).addClass("active");

			switch (this.id) {
			case 'orosHomeHome':
				showHomeHome();
				break;
			case 'orosHomeTuto':
				showHomeTuto();
				break;
			case 'orosHomeTranslation':
				showHomeTranslation();
				break;
			}
		});
		$('#orosHomeHome').click();
	}

	function showHomeHome() {
		$('#ajaxContent').html(
			'<div class="content-box-s">'
				+ '<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">'
					+ '<h3>' + 'Oros' + '</h3>'
				+ '</div>'
				+ '<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">'
					+ '<p>' + TXT.home.welcome + '</p>'
					+ '<p><span class="orosSetup_info">' + TXT.general.version + ' : ' + version + '</span>'
					+ '<br />' + TXT.home.develop + '</p>'
					+ '<p><a href="' + oros.updater.url + '">' + TXT.home.homepage + '</a></p>'
				+ '</div>'
				+ '<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;"></div>'
			+ '</div>'
			+ '<div class="content-box-s" style="clear: left">'
				+ '<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">'
					+ '<h3>' + TXT.home.reset.title + '</h3>'
				+ '</div>'
				+ '<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">'
					+ '<p>' + TXT.home.reset.desc + '</p>'
					+ '<p class="orosSetup_info">' + TXT.home.reset.info + '</p>'
					+ '<a class="button188" href="#" id="orosInit">' + TXT.general.init + '</a>'
				+ '</div>'
				+ '<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;"></div>'
			+ '</div>'
			+ '<iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FOros%2F114996765225275%3Fref%3Dsgm&amp;width=312&amp;connections=10&amp;stream=true&amp;header=true&amp;height=356" scrolling="yes" frameborder="0" style="border:none; overflow:auto; margin-left: 5px; width: 312px; height: 356px;" allowTransparency="true"></iframe>');

		$('#ajaxContent .content-box-s').css({width: '50%'});
		$('#ajaxContent .content-box-s .content').css({height: '120px'});
		$('#ajaxContent .content-box-s h3').css({width: '100%', textShadow: '0px 0px 2px #999'});
		$('.orosSetup_info').css({color: '#99CC00'});



		$('#orosInit').click(function () {
			unsafeWindow.errorBoxDecision("Warning", "By reseting you will lose all your preferences and datas."
				+ "<br/><br/>Do you want to continue ?", "Yes", "No", function () {
				localStorage.removeItem('oros');
				unsafeWindow.closeErrorBox();
				unsafeWindow.location.reload();
			}, true, true);
		});

		if (!oros[info.player].setup.done)
			oros[info.player].setup.show();
	}

	function showHomeTuto() {
		$('#ajaxContent').html(TXT.general.notdone);
	}
	
	function showHomeTranslation() {
		function getTree(lang, attr) {
			var txt = '';
			
			if (attr)
				txt = '<li rel="' + attr + '"><a href="#" ' + (typeof(lang) != 'object' ? 'class="orosLangItem"' : '') 
					+ '>' + attr;

			if (typeof(lang) == 'object') {
				txt += '<ul>'
				for (var attr2 in lang)
					if (typeof(lang[attr2]) != 'function')
						txt += getTree(lang[attr2], attr2);
				txt += '</ul>';
			}

			if (attr)
				txt += '</a></li>';

			return txt;
		}

		function getLang() {
			var result = '';

			for (var lang in unsafeWindow.orosTranslations)
				if (typeof(unsafeWindow.orosTranslations[lang]) == 'object' && lang != 'en')
					result += '<option value="' + lang + '">' + lang + '</option>';

			return result;
		}

		function setColor() {
			$('.orosLangItem').each(function (index) {
				var lang = 'unsafeWindow.orosTranslations.' + $('#orosLangChoose').val() + '.';
				var path = getPath(this);

				try {
					if (!eval(lang + path))
						this.style.color = '#D43635';
					else if (eval(lang + path) == eval('defaultTXT.en.' + path))
						this.style.color = '#ffd722';
					else
						this.style.color = '#99cc00';
				} catch (err) {
					this.style.color = '#d43635';
				}
			});

			$('#orosLangTree li a:not(.orosLangItem)').each(function () {
				var colors = $(this).siblings('ul').find('.orosLangItem').map(function () { return $(this).css('color'); }).get();
				colors.sort();
				if (colors.indexOf('rgb(212, 54, 53)') > -1)
					this.style.color = '#D43635';
				else if (colors.indexOf('rgb(255, 215, 34)') > -1)
					this.style.color = '#ffd722';
				else
					this.style.color = '#99cc00';
			});
		}

		function getPath(elm) {
			var path = $(elm).parents('li').map(function () { return $(this).attr('rel'); })
				.get().reverse().join('.');
			path = path.replace(/\.(\d+)(\.?)/g, '[$1]$2');
			return path;
		}

		$('#ajaxContent').html(
			'<div id="orosLangTree" style="overflow: scroll; width: 260px; height: 370px; float: left; position: relative;">'
				+ getTree(defaultTXT.en)
			+ '</div>'
			+ '<div style="width: 380px; float: left; padding: 5px;">'
				+ '<span style="text-align: center; display: block;">'
					+ '<label>Language</label>'
					+ '<select id="orosLangChoose">'
						+ getLang()
					+ '</select>'
				+ '</span>'
				+ '<label>Original text</label>'
				+ '<textarea id="orosLangEn" readonly="true"></textarea>'
				+ '<label>Translation</label>'
				+ '<textarea id="orosLang2"></textarea>'
				+ '<a class="button188" href="#" id="orosLangSave">' + TXT.general.save + '</a>'
				//+ '<a class="button188" href="#" id="orosLangSend">' + TXT.general.send + '</a>'
			+ '</div>'
		);
		
		$('#orosLangTree ul').css({
			margin: 'auto',
			paddingLeft: '16px',
			listStyleType: 'none',
			lineHeight: '20px'
		});
		$('#ajaxContent textarea').css({
			width: '95%',
			height: '90px'
		});
		$('#orosLangTree li a:not(.orosLangItem)').css({
			background: 'url("img/layout/fleetCloseDetails.gif") no-repeat transparent',
			paddingLeft: '20px',
			marginLeft: '-16px'
		});

		$('#orosLangTree ul li a:not(.orosLangItem)').click(function (e) {
			var ul = $(this).siblings('ul');
			if (ul.hasClass('hidden')) {
				ul.removeClass('hidden').addClass('visible').show();
				$(this).css('background-image', 'url("img/layout/fleetCloseDetails.gif")');
			} else {
				ul.removeClass('visible').addClass('hidden').hide();
				$(this).css('background-image', 'url("img/layout/fleetOpenDetails.gif")');
			}
		}).click();
		$('.orosLangItem').click(function (e) {
			var path = getPath(this);

			$('#orosLangEn').val(eval('defaultTXT.en.' + path));

			try {
				$('#orosLang2')
					.attr('ref', path)
					.val(eval('unsafeWindow.orosTranslations.' + $('#orosLangChoose').val() + '.' + path) || '');
			} catch (err) {
				$('#orosLang2').val('');
			}
		});
		$('#orosLangChoose').change(function (e) {
			setColor();
		});
		$('#orosLangSave').click(function () {
			var txt = $('#orosLang2').val()
				.replace('\\', '\\\\')
				.replace('\'', '\\\'')
				.replace('\"', '\\\"');

			eval('unsafeWindow.orosTranslations.' + $('#orosLangChoose').val() + '.' + $('#orosLang2').attr('rel') + ' = "' + txt + '"');
			eval('TXT.' + $('#orosLang2').attr('ref') + ' = "' + txt + '"');
			localStorage.setItem('orosLang_' + $('#orosLangChoose').val(), JSON.stringify(TXT));
			setColor();
		});
		/*$('#orosLangSend').click(function () {
			location.href = 'mailto:oros_translation@sfr.fr?subject=' + $('#orosLangChoose').val();
			$('#orosLang2').val(localStorage.getItem('orosLang_' + $('#orosLangChoose').val()));
			$('#orosLang2').attr('rel', 'Copy the text in the "Translation" part and paste it into the email.')
				.cluetip({
					local: true,
					showTitle: false,
					arrows: true,
					sticky: true,
					cluezIndex: 9997
				}).cluetip();
		});*/

		setColor();
	}

	function showOptions() {
		$('#buddies #tabs_example_one').html(
			'<li>'
				+ '<a id="orosOptionsGeneral" class="reiter" href="#">'
					+ '<span>' + TXT.options.tabs.general + '</span>'
				+ '</a>'
			+ '</li>'
			+ '<li>'
				+ '<a id="orosOptionsPage" class="reiter" href="#">'
					+ '<span>' + TXT.options.tabs.page + '</span>'
				+ '</a>'
			+ '</li>'
			+ '<li>'
				+ '<a id="orosOptionsSpytool" class="reiter" href="#">'
					+ '<span>' + TXT.sim.tabs.spytool + '</span>'
				+ '</a>'
			+ '</li>');
			
		$("a.reiter").click(function () {
			$("#buddies ul#tabs_example_one li a").removeClass("active");
			$(this).addClass("active");

			switch (this.id) {
			case 'orosOptionsGeneral':
				showOptionsGeneral();
				break;
			case 'orosOptionsPage':
				showOptionsPage();
				break;
			case 'orosOptionsSpytool':
				showOptionsSpytool();
				break;
			}
		});
		$('#orosOptionsGeneral').click();
	}

	function showOptionsGeneral() {
		function selectPlanets() {
			var result = '';
			for (var i = 0; i < data.planet.length; i++)
				result += '<option value="' + data.planet[i].coord.toString()
					+ (data.planet[i].coord.equal(options.dailyTransport.main) ? ' selected="selected"' : '') + '">'
					+ data.planet[i].toString() + '</option>';
			return result;
		}

		function selectLang() {
			var result = '';
			for (var attr in unsafeWindow.orosTranslations) {
				if (typeof(unsafeWindow.orosTranslations[attr]) == 'object')
					result += '<option value="' + attr
						+ ((options.lang || info.lang) == attr ? ' selected="selected"' : '') + '">'
						+ attr + '</option>';
			}
			return result;
		}

		try {
			$('#ajaxContent').html(
				'<table class="zebra" cellpadding="0" cellspacing="0">'
					+ '<tr>'
						+ '<td>' + TXT.options.langTitle + '</td>'
						+ '<td><select id="optionsLang" class="planets">'
							+ selectLang()
						+ '</select></td>'
					+ '</tr>'
					+ '<tr><th colspan="2">' + TXT.options.calc.title + '</th></tr>'
					+ '<tr>'
						+ '<td>' + TXT.options.calc.show + '</td>'
						+ '<td><input type="checkbox" id="optionsCalcShow" ' + options.calc.show.toAttrCheck() + '></td>'
					+ '</tr>'
					+ '<tr><th colspan="2">' + TXT.options.dailyTransport.title + '</th></tr>'
					+ '<tr>'
						+ '<td>' + TXT.options.dailyTransport.main + '</td>'
						+ '<td><select id="optionsDailyTransportMain" class="planets">'
							+ selectPlanets()
						+ '</select></td>'
					+ '</tr>'
					+ '<tr><th colspan="2">' + TXT.options.date.title + '</th></tr>'
					+ '<tr>'
						+ '<td>' + TXT.options.date.complete + '</td>'
						+ '<td><input type="checkbox" id="optionsDateComplete" ' + options.date.complete.toAttrCheck() + '></td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td>' + TXT.options.date.format + '</td>'
						+ '<td>'
							+ '<input type="text" id="optionsDateFormat" value="' + options.date.format + '"><br />'
							+ '<label id="lblDateFormat"></label>'
						+ '</td>'
					+ '</tr>'
					+ '<tr>'
						+ '<td colspan="2"><a class="button188" href="#" id="optionsSave">' + TXT.general.save + '</a></td>'
					+ '</tr>'
				+ '</table>'
				+ TXT.options.date.formatHelp);

			that.initTable();
			$('#optionsDateFormat').keyup(function () {
				$('#lblDateFormat').html(new Date().format(this.value, false));
			}).keyup();
			$('#optionsSave').click(function () {
				try {
					options.lang = $('#optionsLang option:selected').val();
					options.calc.show = $('#optionsCalcShow').attr('checked') != 0;
					options.dailyTransport.main = $('#optionsDailyTransportMain option:selected').val().toCoord(); 
					options.date.format = $('#optionsDateFormat').val();
					options.date.complete = $('#optionsDateComplete').attr('checked') == 'checked';
					that.save();
					orosFadeBox(TXT.general.saveSuccess, false);
				}
				catch (e) {
					orosFadeBox(TXT.general.saveFailed + '<br /><br />' + e.description, true);
				}
			});
		}
		catch (err) {
			$('#ajaxContent').html('An error occured (' + err.description + '). Please reset your settings.<br />'
				+ '<a class="button188" href="#" id="orosInit">' + TXT.general.init + '</a>');
			$('#orosInit').click(function () {
				unsafeWindow.errorBoxDecision("Warning", "By reseting you will lose all your preferences and datas."
					+ "<br/><br/>Do you want to continue ?", "Yes", "No", function () {
					localStorage.removeItem('oros');
					unsafeWindow.closeErrorBox();
				}, true, true);
			});
		}
	}

	function showOptionsPage() {
		function getOptimizer() {
			var result = '';
			for (var def in options.defense.optimizer) {
				if (typeof(options.defense.optimizer[def]) == 'function') continue;
				result += '<tr><td>' + TXT.defense[def].long + '</td><td><input type="text" id="defOptimizer' + def 
					+ '" value="' + options.defense.optimizer[def] + '"></td></tr>';
			}
			return result;
		}

		var html = 
			'<table class="zebra" cellpadding="0" cellspacing="0">'
				+ '<tr><th colspan="2">' + TXT.options.pages.buildings + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showProd + '</td>'
					+ '<td><input type="checkbox" id="optionsBuildingsShowProd" ' + options.buildings.showProd.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showConso + '</td>'
					+ '<td><input type="checkbox" id="optionsBuildingsShowConso" ' + options.buildings.showConso.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showEndTime + '</td>'
					+ '<td><input type="checkbox" id="optionsBuildingsShowEndTime" ' + options.buildings.showEndTime.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr><th colspan="2">' + TXT.options.pages.research + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showEndTime + '</td>'
					+ '<td><input type="checkbox" id="optionsResearchShowEndTime" ' + options.research.showEndTime.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr><th colspan="2">' + TXT.options.pages.shipyard + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showCost + '</td>'
					+ '<td><input type="checkbox" id="optionsShipyardShowCost" ' + options.shipyard.showCost.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showEndTime + '</td>'
					+ '<td><input type="checkbox" id="optionsShipyardShowEndTime" ' + options.shipyard.showEndTime.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr><th colspan="2">' + TXT.options.pages.defense + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showCost + '</td>'
					+ '<td><input type="checkbox" id="optionsDefenceShowCost" ' + options.defense.showCost.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showEndTime + '</td>'
					+ '<td><input type="checkbox" id="optionsDefenceShowEndTime" ' + options.defense.showEndTime.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr><th colspan="2">' + TXT.options.pages.defenceOptimizer + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showOptimizer + '</td>'
					+ '<td><input type="checkbox" id="optionsDefenceShowOptimizer" ' + options.defense.showOptimizer.toAttrCheck() + '></td>'
				+ '</tr>'
				+ getOptimizer()
				+ '<tr><th colspan="2">' + TXT.options.pages.messages + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showShortcut + '</td>'
					+ '<td><input type="checkbox" id="optionsMessagesShowShortcut" ' + options.messages.showShortcut.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr><th colspan="2">' + TXT.options.pages.galaxy + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showColors + '</td>'
					+ '<td><input type="checkbox" id="optionsGalaxyShowColors" ' + options.galaxy.showColors.toAttrCheck() + '></td>'
				+ '</tr>'
				/*+ '<tr>'
					+ '<td>' + TXT.options.pages.showDestroyed + '</td>'
					+ '<td><input type="checkbox" id="optionsGalaxyShowDestroyed" ' + options.galaxy.showDestroyed.toAttrCheck() + '></td>'
				+ '</tr>'*/
				+ '<tr>'
					+ '<td>' + TXT.options.pages.showDebris + '</td>'
					+ '<td><input type="checkbox" id="optionsGalaxyShowDebris" ' + options.galaxy.showDebris.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.options.pages.minDebris + '</td>'
					+ '<td><input type="text" id="optionsGalaxyMinDebris" value="' + options.galaxy.minDebris + '"></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td colspan="2"><a class="button188" href="#" id="optionsSave">' + TXT.general.save + '</a></td>'
				+ '</tr>'
			+ '</table>';

		$('#ajaxContent').html(html);

		that.initTable();
		$('#optionsSave').click(function () {
			try {
				options.buildings.showProd = $('#optionsBuildingsShowProd').attr('checked');
				options.buildings.showConso = $('#optionsBuildingsShowConso').attr('checked');
				options.buildings.showEndTime = $('#optionsBuildingsShowEndTime').attr('checked');
				options.research.showEndTime = $('#optionsResearchShowEndTime').attr('checked');
				options.shipyard.showCost = $('#optionsShipyardShowCost').attr('checked');
				options.shipyard.showEndTime = $('#optionsShipyardShowEndTime').attr('checked');
				options.defense.showCost = $('#optionsDefenceShowCost').attr('checked');
				options.defense.showEndTime = $('#optionsDefenceShowEndTime').attr('checked');
				options.defense.showOptimizer = $('#optionsDefenceShowOptimizer').attr('checked');
				options.messages.showShortcut = $('#optionsMessagesShowShortcut').attr('checked');
				options.galaxy.showColors = $('#optionsGalaxyShowColors').attr('checked');
				options.galaxy.showDestroyed = $('#optionsGalaxyShowDestroyed').attr('checked');
				options.galaxy.showDebris = $('#optionsGalaxyShowDebris').attr('checked');
				options.galaxy.minDebris = $('#optionsGalaxyMinDebris').val().toNum();
				for (var def in options.defense.optimizer) {
					if (typeof(options.defense.optimizer[def]) == 'function') continue;
					options.defense.optimizer[def] = parseInt($('#defOptimizer' + def).val());
				}
				that.save();
				orosFadeBox(TXT.general.saveSuccess, false);
			}
			catch (e) {
				orosFadeBox(TXT.general.saveFailed + '<br /><br />' + e.description, true);
			}
		});
	}

	function showOptionsSpytool() {
		function getValidTime() {
			var time = options.spytool.validTime;
			var index = 0;

			if (time >= 86400000) {
				time /= 86400000;
				index = 0;
			} else if (time >= 3600000) {
				time /= 3600000;
				index = 1;
			} else if (time >= 60000) {
				time /= 60000;
				index = 2;
			} else if (time >= 1000) {
				time /= 1000;
				index = 3;
			}

			return '<td><input type="text" id="optionsSpytoolValidTime" value="' + time + '" />'
				+ '<select id="optionsSpytoolValidTimeUnit">'
					+ '<option value="86400000"' + (index == 0 ? ' selected="selected">' : '>') + TXT.date.timespan.day.long + '</option>'
					+ '<option value="3600000"' + (index == 1 ? ' selected="selected">' : '>') + TXT.date.timespan.hour.long + '</option>'
					+ '<option value="60000"' + (index == 2 ? ' selected="selected">' : '>') + TXT.date.timespan.minute.long + '</option>'
					+ '<option value="1000"' + (index == 3 ? ' selected="selected">' : '>') + TXT.date.timespan.second.long + '</option>'
				+ '</select></td>';
		}

		var html = 
			'<table class="zebra" cellpadding="0" cellspacing="0">'
				+ '<tr><th colspan="2">' + TXT.sim.tabs.spytool + '</th></tr>'
				+ '<tr>'
					+ '<td>' + TXT.general.active + '</td>'
					+ '<td colspan="2"><input type="checkbox" id="optionsSpytoolActive" ' + options.spytool.active.toAttrCheck() + '></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.sim.spytool.minTotal + '</td>'
					+ '<td colspan="2"><input type="text" id="optionsSpytoolMinTotal" value="' + options.spytool.minTotal + '"></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.sim.spytool.minM + '</td>'
					+ '<td colspan="2"><input type="text" id="optionsSpytoolMinM" value="' + options.spytool.minM + '"></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.sim.spytool.minC + '</td>'
					+ '<td colspan="2"><input type="text" id="optionsSpytoolMinC" value="' + options.spytool.minC + '"></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.sim.spytool.minD + '</td>'
					+ '<td colspan="2"><input type="text" id="optionsSpytoolMinD" value="' + options.spytool.minD + '"></td>'
				+ '</tr>'
				+ '<tr>'
					+ '<td>' + TXT.sim.spytool.validTime + '</td>'
					+ getValidTime()
				+ '</tr>'
				+ '<tr>'
					+ '<td colspan="3"><a class="button188" href="#" id="optionsSave">' + TXT.general.save + '</a></td>'
				+ '</tr>'
			+ '</table>';

		$('#ajaxContent').html(html);

		that.initTable();
		$('#optionsSave').click(function () {
			try {
				options.spytool.active = $('#optionsSpytoolActive').attr('checked');
				options.spytool.minTotal = $('#optionsSpytoolMinTotal').val().toNum();
				options.spytool.minM = $('#optionsSpytoolMinM').val().toNum();
				options.spytool.minC = $('#optionsSpytoolMinC').val().toNum();
				options.spytool.minD = $('#optionsSpytoolMinD').val().toNum();
				options.spytool.validTime = $('#optionsSpytoolValidTime').val().toNum() * $('#optionsSpytoolValidTimeUnit').val().toNum();
				that.save();
				orosFadeBox(TXT.general.saveSuccess, false);
			}
			catch (e) {
				orosFadeBox(TXT.general.saveFailed + '<br /><br />' + e.description, true);
			}
		});
	}

	function showSim() {
		$('#buddies #tabs_example_one').html(
			'<li>'
				+ '<a id="orostoolspy" class="reiter" href="#">'
					+ '<span>' + TXT.sim.tabs.spy + '</span>'
				+ '</a>'
			+ '</li>'
			+ '<li>'
				+ '<a id="orossimgraviton" class="reiter" href="#">'
					+ '<span>' + TXT.sim.tabs.grav + '</span>'
				+ '</a>'
			+ '</li>'
			+ '<li>'
				+ '<a id="orossimcosts" class="reiter" href="#">'
					+ '<span>' + TXT.sim.tabs.costs + '</span>'
				+ '</a>'
			+ '</li>');
			
		$("a.reiter").click(function () {
			$("#buddies ul#tabs_example_one li a").removeClass("active");
			$(this).addClass("active");

			switch (this.id) {
			case 'orostoolspy':
				that[info.player].spytool.show();
				break;
			case 'orossimgraviton':
				that[info.player].gravitonSim.show();
				break;
			case 'orossimcosts':
				that[info.player].costsSim.show();
				break;
			}
		});

		$('#orostoolspy').click();
	}

	function updateSuccess(response) {
		var result = (/<b>Version:<\/b>\W*([\d\.a-z]*)\W*<br/).exec(response.responseText);
		if (result) {
			result = result[1];
			console.group('Version');
			console.info('Actuelle : ' + version);
			console.info('En ligne : ' + result);
			console.groupEnd();
			that.updater.updated = result == version;
			that.save();
		}
	}

	function updateError(response) {
		console.info(response);
	}
	
	this.checkUpdate = function () {
		if (this.updater.session != info.session) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: this.homePage,
				onload: updateSuccess,
				onerror: updateError
			});
			this.updater.session = info.session;
			this.save();
			(new Overview()).showUpdate();
		}
	}

	this.initTable = function () {
		$('#buddies table').addClass('zebra');
		$('#buddies .zebra tr').mouseover(function() {
			$(this).addClass('over');
		}).mouseout(function() {
			$(this).removeClass('over');
		});

		$('#buddies .zebra tr:even').addClass('alt');
	}

	this.load = function () {
		if (info.player != '')
			this[info.player] = { data: defaultData, options: defaultOptions };

		if (!localStorage.getItem('oros'))
			localStorage.setItem('oros', JSON.stringify(this));
		else {
			var savedOros = JSON.parse(localStorage.getItem('oros'), JSON.stringify(this));
			if (info.player == '')
				info.player = savedOros.info.player;
			this[info.player] = { data: defaultData, options: defaultOptions };
			this.merge(savedOros);
			data = this[info.player].data;
			options = this[info.player].options;
		}

		initLang();

		var spytool = new SpyTool();
		oros[info.player].spytool = spytool.merge(oros[info.player].spytool);
		oros[info.player].spytool.init();

		var gravitonSim = new GravitonSimulator();
		oros[info.player].gravitonSim = gravitonSim.merge(oros[info.player].gravitonSim);

		var costsSim = new CostsSimulator();
		oros[info.player].costsSim = costsSim.merge(oros[info.player].costsSim);

		var setup = new Setup();
		oros[info.player].setup = setup.merge(oros[info.player].setup);

		this.info = info;

		for (var index in data.planet)
			initPlanet(data.planet[index]);
	}

	this.save = function () {
		localStorage.setItem('oros', JSON.stringify(this));
	}

	this.showButton = function () {
		$('#menuTable').append('<li>'
				+ '<span class="menu_icon">'
					+ '<img src="img/navigation/ikon_edit_a.gif" height="29" width="38">'
				+ '</span>'
				+ '<a id="oros" class="menubutton" ' + 'href="#">'
					+ '<span class="textlabel">Oros</span>'
				+ '</a>'
			+ '</li>');
		$('a#oros').click(function () {
			unsafeWindow.tb_show('Oros');
			oros.show();
		});
	}

	this.show = function () {
		$('head').append('<link media="screen" href="http://uni32.ogame.fr/game/css/thickbox-message.css" type="text/css" rel="stylesheet">');
		$('div#TB_window').css({marginLeft: '-400px', width: '800px', marginTop: '-270px', display: 'block'}).html(
			'<div id="buddies">'
				+ '<div style="display: none;" class="fadeBox" id="orosFadeBox">'
					+ '<div>'
						+ '<span class="success" id="orosFadeBoxStyle"></span>'
						+ '<p id="orosFadeBoxContent"></p>'
						+ '<br class="clearfloat">'
					+ '</div>'
				+ '</div>'
				+ '<div id="messagebox">'
					+ '<h2>Oros</h2>'
					+ '<a class="closeTB" onclick="self.parent.tb_remove();">'
						+ '<img width="16" height="16" src="img/layout/pixel.gif">'
					+ '</a>'
					+ '<ul class="tabsbelow">'
						+ '<li class="first aktiv">'
							+ '<a id="oroshome" href="#" class="nav">'
								+ '<span>' + TXT.oros.tabs.home + '</span>'
							+ '</a>'
						+ '</li>'
						+ '<li class="">'
							+ '<a id="orossim" href="#" class="nav">'
								+ '<span>' + TXT.oros.tabs.sim + '</span>'
							+ '</a>'
						+ '</li>'
						+ '<li class="">'
							+ '<a id="orosoptions" href="#" class="nav">'
								+ '<span>' + TXT.oros.tabs.options + '</span>'
							+ '</a>'
						+ '</li>'
					+ '</ul>'
					+ '<div id="messages" style="margin-top: 5px;"><div id="netz">'
						+ '<ul id="tabs_example_one" class="subsection_tabs" style="margin: 0 auto;"></ul>'
					+ '</div></div>'
					+ '<div id="ajaxContent" style="margin-top: 5px;">'
					+ '</div>'
				+ '</div>'
			+ '</div>');

		$('div#TB_load').css({display: 'none'});
		$("a.nav").click(function () {
			$("#buddies ul.tabsbelow li").removeClass("aktiv");
			$(this).parent().addClass("aktiv");

			switch (this.id) {
			case 'oroshome': 
				showHome();
				break;
			case 'orossim':
				showSim();
				break;
			case 'orosoptions':
				showOptions();
				break;
			}
		});
		$('#oroshome').click();
	}
}

function Setup() {
	var that = this;
	this.done = false;
	this.step = 1;

	function step1() {
		if ($('#orosSetup_step1').length == 0)
			$('#planet h2').after(
				'<div id="orosSetup_step1" class="content-box-s">'
					+ '<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<h3>Oros ' + TXT.setup.title + ' - ' + TXT.setup.step + ' 1/4</h3>'
					+ '</div>'
					+ '<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<p>' + TXT.setup.step1.desc + '</p>'
						+ '<p class="orosSetup_info">' + TXT.setup.step1.info + '</p>'
					+ '</div>'
					+ '<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;"></div>'
				+ '</div>');

		$('#orosSetup_step1').css({
			margin: '50px 0px 0px 40px',
			height: '200px',
			width: '222px',
			fontSize: '11px',
			zIndex: '300',
			position: 'relative'
		});

		$('.orosSetup_info').css({color: '#99CC00'});

		$('.smallplanet a:not(.active)').click(function () {
			that.step = 2;
			oros.save();
		});
	}

	function step2() {
		if ($('#orosSetup_step2').length == 0)
			$('#planet h2').after(
				'<div id="orosSetup_step2" class="content-box-s">'
					+ '<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<h3>Oros ' + TXT.setup.title + ' - ' + TXT.setup.step + ' 2/4</h3>'
					+ '</div>'
					+ '<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<p>' + TXT.setup.step2.desc + '</p>'
						+ '<p class="orosSetup_info">' + TXT.setup.step2.info + '</p>'
					+ '</div>'
					+ '<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;"></div>'
				+ '</div>');

		$('.orosSetup_info').css({color: '#99CC00'});

		$('#orosSetup_step2').css({
			margin: '50px 0px 0px 40px',
			height: '200px',
			width: '222px',
			fontSize: '11px',
			zIndex: '300',
			position: 'relative'
		});

		$('#oros').click(function () {
			that.step = 3;
			step3();
		});
	}

	function step3() {
		if ($('#orosSetup_step3').length == 0)
			$('#ajaxContent .content-box-s:first').before(
				'<div id="orosSetup_step3" class="content-box-s">'
					+ '<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<h3>Oros ' + TXT.setup.title + ' - ' + TXT.setup.step + ' 3/4</h3>'
					+ '</div>'
					+ '<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<p>' + TXT.setup.step3.desc + '</p>'
						+ '<p class="orosSetup_info">' + TXT.setup.step3.info + '</p>'
					+ '</div>'
					+ '<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;"></div>'
				+ '</div>');


		$('#ajaxContent .content-box-s').css({width: '50%'});
		$('#ajaxContent .content-box-s .content').css({height: '120px'});
		$('#ajaxContent .content-box-s h3').css({width: '100%', textShadow: '0px 0px 2px #999'});
		$('.orosSetup_info').css({color: '#99CC00'});

		$('#orosoptions').click(function () {
			that.step = 4;
			step4();
		});
	}

	function step4() {
		if ($('#orosSetup_step4').length == 0)
			$('#ajaxContent table:first').before(
				'<div id="orosSetup_step4" class="content-box-s">'
					+ '<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<h3>Oros ' + TXT.setup.title + ' - ' + TXT.setup.step + ' 4/4</h3>'
					+ '</div>'
					+ '<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">'
						+ '<p>' + TXT.setup.step4.desc + '</p>'
						+ '<p class="orosSetup_info">' + TXT.setup.step4.info + '</p>'
					+ '</div>'
					+ '<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;"></div>'
				+ '</div>');

		$('#ajaxContent .content-box-s').css({width: '100%'});
		$('#ajaxContent .content-box-s .content').css({height: 'auto', padding: '5px 30px'});
		$('#ajaxContent .content-box-s h3').css({width: '100%', textShadow: '0px 0px 2px #999'});
		$('.orosSetup_info').css({color: '#99CC00'});

		$('#optionsSave').click(function () {
			that.step = 5;
			that.done = true;
			oros.save();
			unsafeWindow.location.reload();
		});
	}

	this.show = function () {
		switch (this.step) {
		case 1: 
			step1();
			break;
		case 2:
		case 3:
		case 4:
			this.step = 2;
			oros.save();
			step2();
			break;
		}
	}
}

function Tuto() {
	this.active = false;
	 
	
	this.showCalc = function () {
		
	}
}


/*============================================================================*\
|                                  CALCULETTE                                  |
\*============================================================================*/

function Calc() {
	this.active = data.calc.active;
	this.converter = data.calc.converter;
	this.edtM = null;
	this.edtC = null;
	this.edtD = null;
	this.lblTotal = null; 
	this.total = 0;

	this.blur = function (e) {
		try {
			if(this.value == '') this.value = '0';
			this.value = this.value.replace(/k/ig, '000').replace(/m/ig, '000000').replace(/^0(.+)/, '$1');
			this.value = Math.round(eval(this.value), 1);

			calc.set(parseInt(calc.edtM.value, '10'), parseInt(calc.edtC.value, '10'), parseInt(calc.edtD.value, '10'));
			calc.getTotal();
			oros.save();
		}
		catch (e) {
			alert(TXT.calc.valueError.format(this.value));
		}
	}

	this.getTotal = function () {
		this.total = data.calc.m + data.calc.c + data.calc.d;
		this.lblTotal.innerHTML = this.total.toStr();
		var opt = data.getShip(this.total);
		this.lblOpt.innerHTML = (opt.gt > 0 ? '<span class="level">' + opt.gt.toStr() + '</span> ' + TXT.shipyard.gt.short : '')
			+ (opt.gt > 0 && opt.pt > 0 ? ', ' : '') 
			+ (opt.pt > 0 ? '<span class="level">' + opt.pt.toStr() + '</span> ' + TXT.shipyard.pt.short : '')
			+ ((opt.gt > 0 || opt.pt > 0) && opt.rec > 0 ? ', ' : '') 
			+ (opt.rec > 0 ? '<span class="level">' + opt.rec.toStr() + '</span> ' + TXT.shipyard.rec.short : '')
			+ (opt.reste > 0 ? '<br/><span class="level">' + opt.reste.toStr() + '</span> ' + TXT.general.remaining : '')
			+ (opt.needed > 0 ? '<br/><span class="level">' + opt.needed.toStr() + '</span> ' + TXT.shipyard.gt.short + ' ' + TXT.general.needed : '');
		return this.total;
	}

	this.keyup = function (e) {
		/*this.value = this.value.replace(/k/ig, '000').replace(/m/ig, '000000');
		if (!this.value) this.value = '0';
		
		if (calc.converter) {
			
		}
		calc.set(parseInt(calc.edtM.value, '10'), parseInt(calc.edtC.value, '10'), parseInt(calc.edtD.value, '10'));
		calc.getTotal();
		oros.save();*/
		if (e.keyCode == 13) {
			e.keyCode = 9;
		}
	}

	this.refresh = function () {
		this.edtM.value = data.calc.m;
		this.edtC.value = data.calc.c;
		this.edtD.value = data.calc.d;

		this.getTotal();
	}

	this.set = function (m, c, d) {
		data.calc.m = (m < 0 ? 0 : m);
		data.calc.c = (c < 0 ? 0 : c);
		data.calc.d = (d < 0 ? 0 : d);
	}

	this.setC = function (c) { this.set(data.calc.m, c, data.calc.d); };

	this.setD = function (d) { this.set(data.calc.m, data.calc.c, d); };

	this.setM = function (m) { this.set(m, data.calc.c, data.calc.d); };

	this.setResources = function () {
		$('#missionButton3').click();
		$('input#deuterium')[0].value = data.calc.d;
		$('input#crystal')[0].value = data.calc.c;
		$('input#metal')[0].value = data.calc.m;
		unsafeWindow.updateVariables();
		$('#start').click();
	}

	this.setShips = function () {
		var ships = data.getShip(this.total);
		$('#ship_202').val(ships.pt);
		$('#ship_203').val(ships.gt);
		unsafeWindow.checkShips('shipsChosen');
		$('#continue').click();
	}

	this.show = function () {
		if (!options.calc.show) return false;

		$('#menuTable').after(
			'<div id="orosCalc" class="content-box-s" style="width: 135px; font-size: 11px;">' +
				'<div class="header" style="padding: 0px; -moz-background-size: 100% 100%;">' +
					'<h3 style="width: 135px; padding-top: 9px; font-size: 11px;">' +
						/*'<a id="orosCalcTitle" href="#">' + */TXT.calc.title + /*'</a>' +*/
					'</h3>' +
				'</div>' +
				'<div class="content" style="padding: 0px; -moz-background-size: 100% 100%;">' +
					'<ul id="resources" style="color: #6F9FC8; padding: 5px 15px 0px 15px">' +
						'<li style="height: 20px; color: #6F9FC8;">' +
							'<label for="" style="width: 40px; float: left; line-height: 16px; height: 16px; font-size: 10px;">' + TXT.resources.metal.long + '</label>' +
							'<input id="calcm" type="text" style="width: 65px;" value="' + data.calc.m + '" />' +
							'<input id="ratem" type="text" style="float: right; width: 18px; display: none;" value="' + data.calc.rate.m + '" />' +
						'</li>' +
						'<li class="enter" style="height: 20px;">' +
							'<label for="" style="width: 40px; float: left; line-height: 16px; height: 16px; font-size: 10px;">' + TXT.resources.cristal.long + '</label>' +
							'<input id="calcc" type="text" style="width: 65px;" value="' + data.calc.c + '" />' +
							'<input id="ratec" type="text" style="float: right; width: 18px; display: none;" value="' + data.calc.rate.c + '" />' +
						'</li>' +
						'<li class="enter" style="height: 20px;">' +
							'<label for="" style="width: 40px; float: left; line-height: 16px; height: 16px; font-size: 10px;">' + TXT.calc.shortDeut + '</label>' +
							'<input id="calcd" type="text" style="width: 65px;" value="' + data.calc.d + '" />' +
							'<input id="rated" type="text" style="float: right; width: 18px; display: none;" value="' + data.calc.rate.d + '" />' +
						'</li>' +
						'<li class="enter" style="text-align: center;">' +
							TXT.general.total + ' : ' +
							'<span id="totalRes" class="level">0</span>' +
						'</li>' +
						'<li class="enter" style="text-align: center; margin: 0px -10px;" id="optimalCalc">' +
						'</li>' +
					'</ul>' +
				'</div>' +
				'<div class="footer" style="padding: 0px; -moz-background-size: 100% 100%;" />' +
			'</div>');

		$('#calcm').blur(this.blur);
		$('#calcc').blur(this.blur);
		$('#calcd').blur(this.blur);

		$('#calcm').keyup(this.keyup);
		$('#calcc').keyup(this.keyup);
		$('#calcd').keyup(this.keyup);

		$('#orosCalcTitle').click(function (e) {
			calc.converter = !calc.converter;
			data.calc.converter = calc.converter;
			oros.save();

			$(this).html(calc.converter ? TXT.calc.converter : TXT.calc.title);
			$('#ratem,#ratec,#rated').css('display', calc.converter ? 'block' : 'none');
			$('#calcm,#calcc,#calcd').css('width', calc.converter ? '45px' : '65px');
		});

		this.edtM = $('#calcm')[0];
		this.edtC = $('#calcc')[0];
		this.edtD = $('#calcd')[0];

		this.lblTotal = $('#totalRes')[0];
		/*this.lblPt = $('#totalPt')[0];
		this.lblGt = $('#totalGt')[0];*/
		this.lblOpt = $('#optimalCalc')[0];

		this.getTotal();
	}

	this.showCosts = function () {
		$('#costs').before('<a href="#" id="costsCalc">' + TXT.calc.title + '</a>');
		$('#costsCalc').click(function (e) {
			calc.set(0, 0, 0);
			$('#costs li.metal').each(function (index) {
				var img = $(this).children('img').attr('src');
				if (img.indexOf('metall') > -1)
					calc.setM($(this).children('span').text().toNum());
				else if (img.indexOf('kristal') > -1)
					calc.setC($(this).children('span').text().toNum());
				else if (img.indexOf('deuterium') > -1)
					calc.setD($(this).children('span').text().toNum());
			});
			calc.refresh();
			oros.save();
		});
		if ($('.missing_resource').size() > 0) {
			$('#costs').before('&nbsp;(<a href="#" id="missingCostsCalc">' + TXT.general.missing + '</a>)');
			$('#missingCostsCalc').click(function (e) {
				calc.set(0, 0, 0);
				$('#costs li.metal').each(function (index) {
					var img = $(this).children('img').attr('src');
					if (img.indexOf('metall') > -1)
						calc.setM($(this).children('span').text().toNum() - $('#resources_metal').text().toNum());
					else if (img.indexOf('kristal') > -1)
						calc.setC($(this).children('span').text().toNum() - $('#resources_crystal').text().toNum());
					else if (img.indexOf('deuterium') > -1)
						calc.setD($(this).children('span').text().toNum() - $('#resources_deuterium').text().toNum());
				});
				calc.refresh();
				oros.save();
			});
		}
	}

	this.showSpy = function() {
		$('.attack').prepend('<a id="spyCalc" href="#" class="buttonSave"><span>' + TXT.calc.title + '</span></a>');
		$('.buttonSave').css('display', 'inherit');
		$('#spyCalc').click(function (e) {
			var result = $('.fragment td:odd');

			calc.active = true;
			data.calc.active = true;
			calc.set(Math.floor(result[0].innerHTML.toNum() / 2),
				Math.floor(result[1].innerHTML.toNum() / 2),
				Math.floor(result[2].innerHTML.toNum() / 2));

			dailyTransport.active = false;
			options.dailyTransport.active = false;

			oros.save();
		});
	}

	this.substract = function (m, c, d) {
		data.calc.m -= (m || 0);
		data.calc.c -= (c || 0);
		data.calc.d -= (d || 0);
		
		oros.save();
		this.refresh();
	}
}
var calc;


/*============================================================================*\
|                               DAILY TRANSPORT                                |
\*============================================================================*/

function DailyTransport() {
	this.active = false;
	this.main = null;

	if (!options.dailyTransport) {
		options.dailyTransport = { active: false, main: null };
		oros.save();
	} else {
		this.active = options.dailyTransport.active;
		this.main = new Coord(options.dailyTransport.main);
	}

	this.checkActive = function () {
		this.active = this.active && $('div.fleetStatus ul').length == 0;
		return this.active;
	}

	this.setCoord = function () {
		if (this.main == null) {
			this.main = data.planet[0].coord;
			options.dailyTransport.main = data.planet[0].coord;
			oros.save();
		}

		$('#galaxy').val(this.main.galaxy);
		$('#system').val(this.main.system);
		$('#position').val(this.main.position);
                $('#type').val(3);
		unsafeWindow.updateVariables();
		$('#continue').click();
	}

	this.setResources = function () {
		$('#missionButton3').click();
		var max = $('.max');
		$(max[2]).click();
		$(max[1]).click();
		$(max[0]).click();
		$('#start').click();
                dailyTransport.active = false;
                options.dailyTransport.active = false;
		data.activIndex = data.planet.length - 1;
	}

	this.setShips = function () {
		var ships = data.getShip(data.activ().getStock());
		$('#ship_202').val(ships.pt);
		$('#ship_203').val(ships.gt);
		unsafeWindow.checkShips('shipsChosen');
		$('#continue').click();
	}
}
var dailyTransport;


/*============================================================================*\
|                                   SPY TOOL                                   |
\*============================================================================*/

var SpyState = { ssNone: 5, ssOld: 4, ssMoreProbes: 3, ssStrong: 2, ssPoor: 1, ssOk: 0 }
function SpyTool() {
	var that = this;
	this.filter = 'state';
	this.desc = false;
	this.spies = [];

	function Spy() {
		var that = this;
		this.id = 0;
		this.player = '';
		this.coord = new Coord();
		this.resources = new Cost();
		this.date = new Date();
		this.active = -1;
		this.info = '';
		this.text = '';
		this.state = SpyState.ssNone;

		function getState() {
			var d = new Date(that.date);
			if (d.setTime(d.getTime() + options.spytool.validTime) < new Date())
				that.state = SpyState.ssOld;
			else if (that.info.split('orosSpyInfoTitle').length < 3)
				that.state = SpyState.ssMoreProbes;
			else if (options.spytool.minTotal && (that.resources.total() / 2) < options.spytool.minTotal)
				that.state = SpyState.ssPoor;
			else if ((that.resources.m / 2) < options.spytool.minM && (that.resources.c / 2) < options.spytool.minC
			&& (that.resources.d / 2) < options.spytool.minD)
				that.state = SpyState.ssPoor;
			else
				that.state = SpyState.ssOk;
		}

		this.toHtml = function () {
			getState();
			var div = '<div class="fleft" style="margin-left: 10px;"><span><a {0}="{1}" rel="{2}">{3}</a></span></div>';
			var attack = 'index.php?page=fleet1&session={0}&galaxy={1}&system={2}&position={3}&planetType={4}&mission=1'
				.format(info.session, this.coord.galaxy, this.coord.system, this.coord.position, this.coord.type);
			var mip = 'index.php?page=missileattacklayer&session={0}&width=669&height=250&galaxy={1}&system={2}&position={3}&planetType={4}'
				.format(info.session, this.coord.galaxy, this.coord.system, this.coord.position, this.coord.type);

			return '<tr class="tipsOrosSpyInfo" rel="#' + this.id + '"><td>'
					+ '<div id="' + this.id + '" style="display: none;"><div>'
						+ '<div class="fleetStatus" style="width: auto; -moz-background-size: 100% 100%; margin-bottom: 10px;">'
							+ div.format('href', attack, '', TXT.general.attack)
							+ div.format('href', mip, '', TXT.defense.mip.long)
							+ div.format('class', 'orosSpyCalc', this.id, TXT.calc.title)
							+ div.format('class', 'orosSpyCopy', this.id, TXT.general.copy)
						+ '</div>'
						+ '<p>' + TXT.general.player + ': ' + this.player + '</p>'
						+ '<p><a onclick="self.parent.tb_remove();" target="_parent" href="' + this.coord.toLink() + '">'
							+ TXT.general.coordinate + ': ' + this.coord.toString() + '</a></p>'
						+ '<p>' + TXT.general.activity + ' : ' + (this.active == -1 ? '' : this.active) + '</p>'
						+ this.info
					+ '</div></div>'
					+ TXT.sim.spytool.state[this.state] + '</td><td>'
					+ this.player + '</td><td>'
					+ this.resources.m.toStr() + '</td><td>'
					+ this.resources.c.toStr() + '</td><td>'
					+ this.resources.d.toStr() + '</td><td>'
					+ Math.ceil(this.resources.total() / (2 * 25000)).toStr()
				+ '</td></tr>';
		}
	}

	function addSpy(spy) {
		for (var i = 0; i < that.spies.length; i++) {
			if (spy.coord.equal(that.spies[i].coord)) {
				that.spies[i].merge(spy);
				return false;
			}
		}

		that.spies.push(spy);
		return true;
	}

	function findSpy(id) {
		for (var i = 0; i < that.spies.length; i++) {
			if (that.spies[i].id == id)
				return that.spies[i];
			if (that.spies[i].id > id)
				break;
		}
		return false;
	}

	function sortSpy(a, b) {
		var valA, valB;
		if (that.filter == 'total') {
			valA = a.resources.total();
			valB = b.resources.total();
		} else {
			valA = ('mcd').indexOf(that.filter) > -1 ? a.resources[that.filter] : a[that.filter];
			valB = ('mcd').indexOf(that.filter) > -1 ? b.resources[that.filter] : b[that.filter];
		}

		if (valA < valB)
			return -1;
		if (valA > valB)
			return 1;
		return 0;
	}

	this.clear = function () {
		this.spies = [];
		oros.save();
	}

	this.init = function () {
		for (var i = 0; i < this.spies.length; i++) {
			var spy = new Spy();
			spy.merge(this.spies[i]);
			this.spies[i] = spy;
		}
	}
	
	this.read = function () {
		console.time('SpyTool reading');
		var oldFilter = this.filter;
		var desc = this.desc;
		this.filter = 'id';
		this.spies.sort(sortSpy);
		this.filter = oldFilter;
		this.desc = desc;

		$('div[id="showSpyReportsNow"]').each(function (index) {
			var spy = new Spy();
			var elm, parent, txt, array;
			var div = '<div class="orosSpyInfoTitle"><label class="styled textBeefy">{0}</label></div>'
				+ '<div class="orosSpyInfoGroup">{1}</div>';

			//Id & Date parsing
			parent = $(this).parent().parent().prev();
			spy.id = (/(\d+)/).exec(parent.attr('id'))[1];
			if (findSpy(spy.id))
				return false;
			txt = parent.find('.date').text().trim().replace(/\./g, '/');
			array = txt.split(/[\.:]?(\d+)[\.:]?/g);
			txt = ('{0}/{1}/{2} {3}:{4}:{5}').format(array[3], array[1], array[5], array[7], array[9], array[11]);
			spy.date = Date.parse(txt);

			//General info parsing
			elm = $(this).find('table.material th.area');
			spy.player = (/\'([^\']+)/).exec(elm.text())[1];
			spy.coord = elm.find('a').text().toCoord();
			spy.active = $(this).find('.aktiv font') ? $(this).find('.aktiv font').text().toNum() : -1;
			spy.text = $(this).text();
			
			//Resources parsing
			$(this).find('.fragment.spy2 td:odd').each(function (index) {
				switch (index) {
				case 0: spy.resources.m = $(this).text().toNum();
				case 1: spy.resources.c = $(this).text().toNum();
				case 2: spy.resources.d = $(this).text().toNum();
				}
			});

			//Other info parsing (fleet, def, building, research)
			elm = $('<div></div>');
			$(this).find('.fleetdefbuildings').each(function (index) {
				elm.append($(this).clone());
			});
			array = elm.html().split(/<th[^>]*>([^<]+)<\/th>/g);
			for (var i = 1; i < array.length; i += 2)
				spy.info += div.format(array[i], array[i + 1]);
			spy.info = spy.info.replace(/<td class=\"key\">([^<]+)<\/td>/g, '<p>$1: ')
				.replace(/<td class=\"value\">([^<]+)<\/td>/g, '$1</p>')
				.replace(/<\/?(table|tbody|tr|td)[^>]*>/g, '');
			elm.remove();
			
			addSpy(spy);
		});

		this.sort();
		oros.save();
		console.timeEnd('SpyTool reading');
	}

	this.show = function () {
		function spiesToHtml() {
			var result = '';
			for (var i = 0; i < that.spies.length; i++)
				result += that.spies[i].toHtml();
			return result;
		}

		var html =
			'<div class="fleetStatus" style="width: auto; -moz-background-size: 100% 100%; margin-bottom: 10px;">'
				+ '<div class="fright" style="margin-right: 10px;"><span><a id="orosClearSpies">' + TXT.sim.spytool.supprAll + '</a></span></div>'
			+ '</div>'
			+'<table cellpadding="0" cellspacing="0">'
				+ '<thead>'
					+ '<th><a class="orosSpySort" rel="state">' + TXT.general.state + '</a></th>'
					+ '<th><a class="orosSpySort" rel="player">' + TXT.general.player + '</a></th>'
					+ '<th><a class="orosSpySort" rel="m">' + TXT.resources.metal.short + '</a></th>'
					+ '<th><a class="orosSpySort" rel="c">' + TXT.resources.cristal.short + '</a></th>'
					+ '<th><a class="orosSpySort" rel="d">' + TXT.resources.deuterium.short + '</a></th>'
					+ '<th><a class="orosSpySort" rel="total">' + TXT.general.needed + '</a></th>'
				+ '</thead>'
				+ spiesToHtml()
			+ '</table>';
			
		$('#ajaxContent').html(html);
		oros.initTable();
		$('.orosSpySort').click(function () {
			that.sort(this.rel);
			that.show();
		});

		$('*.tipsOrosSpyInfo').cluetip("destroy").cluetip({
			local: true,
			cluezIndex: 9997,
			width: 'auto',
			showTitle: false,
			closeDelay: 500,
			mouseOutClose: true,
			hoverIntent: false,
			width: 330,
			debug: false
		});

		$('.orosSpyInfoTitle').css({
			background: 'url("../img/layout/toggleHeader-bg.gif") no-repeat scroll 0 0 #13181D',
			border: '1px solid #000000',
			color: '#6F9FC8',
			fontSize: '11px',
			height: '22px',
			lineHeight: '22px',
			marginTop: '10px',
			width: 'auto'
		}).click(function () {
			var next = $(this).next('.orosSpyInfoGroup');
			next.css('display', next.css('display') == 'block' ? 'none' : 'block');
		});

		$('.orosSpyCalc').click(function (e) {
			var spy = findSpy(this.rel);
			if (spy) {
				calc.set(spy.resources.m, spy.resources.c, spy.resources.d);
				calc.refresh();
				oros.save();
			}
		});

		$('#orosClearSpies').click(function (e) {
			that.clear();
			that.show();
		});

		/*$('.orosSpyCopy').click(function (e) {
			var spy = findSpy(this.rel);
			if (spy)
				window.clipboardData.setData('Text', spy.text);
		});*/
	}

	this.sort = function (filter) {
		if (filter != '') {
			if (filter != this.filter)
				this.desc = false;
			else
				this.desc = !this.desc;
			this.filter = filter;
		}

		this.spies.sort(sortSpy);
		if (this.desc)
			this.spies.reverse();
	}
}


/*============================================================================*\
|                              GRAVITON SIMULATOR                              |
\*============================================================================*/

function GravitonSimulator() {
	var that = this;
	var planet = null;
	this.planetIndex = -1;
	this.ss = {lvl: 0, missing: 0, cost: null};
	this.lab = {lvl: 0, cost: null};
	this.cspa = {lvl: 0, cost: null};
	this.nan = {lvl: 0, cost: null};
	this.rec = {nb: 0, miss: 0, cost: null};
	this.gt = {nb: 0, miss: 0, cost: null};

	function changePlanet(index, keepLvl) {
		that.planetIndex = index > -1 ? index : (that.planetIndex > -1 ? that.planetIndex : data.activIndex);
		planet = data.planet[that.planetIndex];
		with (planet.station) {
			if (!planet.station.build)
				planet.station.build = new BuildInfo();
			that.lab.lvl = keepLvl && that.lab.lvl > 0 ? that.lab.lvl : (build.tag == 'lab' ? build.lvl : Math.max(lab, 12));
			that.cspa.lvl = keepLvl && that.cspa.lvl > 0 ? that.cspa.lvl : (build.tag == 'cspa' ? build.lvl : cspa);
			that.nan.lvl = keepLvl && that.nan.lvl > 0 ? that.nan.lvl : (build.tag == 'nan' ? build.lvl : nan);
		}
		getSat();
		displayInfo();
	}

	function displayInfo() {
		with (planet.station) {
			$('#orosGS_lab').html(build.tag == 'lab' ? build.lvl : lab);
			$('#orosGS_labUp').val(that.lab.lvl);
			getCost('lab', that.lab.lvl, build.tag == 'lab' ? build.lvl : lab);
			
			$('#orosGS_cspa').html(build.tag == 'cspa' ? build.lvl : cspa);
			$('#orosGS_cspaUp').val(that.cspa.lvl);
			getCost('cspa', that.cspa.lvl, build.tag == 'cspa' ? build.lvl : cspa);
			
			$('#orosGS_nan').html(build.tag == 'nan' ? build.lvl : nan);
			$('#orosGS_nanUp').val(that.nan.lvl);
			getCost('nan', that.nan.lvl, build.tag == 'nan' ? build.lvl : nan);
		}
	}

	function getCost(tag, lvl) {
		with (planet) {
			that[tag].cost = GID.getTotalCost(tag, lvl, station.build.tag == tag ? station.build.lvl : station[tag]);
		}
		$('#orosGS_' + tag + 'M').html(that[tag].cost.m.toStr());
		$('#orosGS_' + tag + 'C').html(that[tag].cost.c.toStr());
		$('#orosGS_' + tag + 'D').html(that[tag].cost.d.toStr());
		if (('cspa,nan').indexOf(tag) > -1)
			getTime();
		getTotalCost();
	}

	function getTotalCost() {
		var cost = new Cost(
			that.lab.cost.m + that.cspa.cost.m + that.nan.cost.m + that.ss.cost.m + that.gt.cost.m + that.rec.cost.m,
			that.lab.cost.c + that.cspa.cost.c + that.nan.cost.c + that.ss.cost.c + that.gt.cost.c + that.rec.cost.c,
			that.lab.cost.d + that.cspa.cost.d + that.nan.cost.d + that.ss.cost.d + that.gt.cost.d + that.rec.cost.d);

		var main = data.main();
		var real = new Cost();
		real.m = Math.max(cost.m - main.resources.stock.m, 0);
		real.c = Math.max(cost.c - main.resources.stock.c, 0);
		real.d = Math.max(cost.d - main.resources.stock.d, 0);

		var prod = data.getOverallProd();
		var timeM = new TimeSpan();
		var timeC = new TimeSpan();
		var timeD = new TimeSpan();
		timeM.setHours(real.m / prod.m);
		timeC.setHours(real.c / prod.c);
		timeD.setHours(real.d / prod.d);

		$('#orosGS_totalM').html(cost.m.toStr() + '<br />' + real.m.toStr());
		$('#orosGS_totalC').html(cost.c.toStr() + '<br />' + real.c.toStr());
		$('#orosGS_totalD').html(cost.d.toStr() + '<br />' + real.d.toStr());
		$('#orosGS_totalTimeM').html(timeM.toShortString());
		$('#orosGS_totalTimeC').html(timeC.toShortString());
		$('#orosGS_totalTimeD').html(timeD.toShortString());
	}

	function getTime() {
		var time = new TimeSpan();
		time.setHours(GID.ss.cost.c / (2500 * (1 + that.cspa.lvl) * Math.pow(2, that.nan.lvl) * info.speed));
		var total = new TimeSpan();
		total.setDays(time.time * that.ss.lvl);

		$('#orosGS_ssTime').html(time.toString());
		$('#orosGS_ssTotalTime').html(total.toString());
	}

	function getSat() {
		var energy = GID.grav.cost.e - planet.getProd('ces') - planet.getProd('cef');
		that.ss.lvl = Math.ceil(energy / planet.getProd('ss', 1));
		that.ss.missing = that.ss.lvl - planet.shipyard.ss;
		$('#orosGS_ss').html(that.ss.lvl.toStr());
		$('#orosGS_ssMiss').html(that.ss.missing.toStr());
		getCost('ss', that.ss.missing);
		getTime();

		var main = data.main();
		that.gt.nb = Math.ceil((that.ss.cost.c + that.ss.cost.d) / GID.gt.cargo);
		that.gt.miss = Math.max(that.gt.nb - main.shipyard.gt, 0);
		getCost('gt', that.gt.miss);
		$('#orosGS_gt').html(that.gt.nb.toStr());
		$('#orosGS_gtMiss').html(that.gt.miss.toStr());

		that.rec.nb = Math.ceil(Math.floor(that.ss.cost.c / 3) / GID.rec.cargo);
		that.rec.miss = Math.max(that.rec.nb - main.shipyard.rec, 0);
		getCost('rec', that.rec.miss);
		$('#orosGS_debrisC').html(Math.floor(that.ss.cost.c / 3).toStr());
		$('#orosGS_rec').html(that.rec.nb.toStr());
		$('#orosGS_recMiss').html(that.rec.miss.toStr());
	}

	function planetsToOptions() {
		var index = that.planetIndex > -1 ? that.planetIndex : data.activIndex;
		var txt = '';
		for (var i = 0; i < data.planet.length; i++) {
			txt += '<option value="' + i + '"' + (i == index ? ' selected="selected"' : '') + '>'
				+ data.planet[i].toString() + '</option>';
		}
		return txt;
	}

	this.show = function () {
		$('#ajaxContent').html(
			'<h2>Planète&nbsp;<select id="orosGS_planet">' + planetsToOptions() + '</select></h2>'
			// ========== CSPA ==========
			+ '<div class="orosGS_item100">'
				+ '<ul>'
					+ '<li class="orosGS_building tipsTitle" style="background-position: -500px 0px;" title="' 
						+ TXT.station.cspa.long + '|' + TXT.sim.grav.cspahelp + '">'
						+ '<div class="orosGS_ecke100">'
							+ '<span class="level">'
								+ '<span id="orosGS_cspa"></span>&nbsp;&gt;&nbsp;'
								+ '<input id="orosGS_cspaUp" rel="cspa" type="text" value="0" />'
							+ '</span>'
						+ '</div>'
					+ '</li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_cspaM"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_cspaC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_cspaD"></span>'
							+ '</li>'
							+ '<li class="orosGS_info tipsStandard" title="|' + TXT.calc.totalLink + '">'
								+ '<a href="#" class="orosGS_calc" rel="cspa">' + TXT.calc.title + '</a>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
				// ========== NAN ==========
			+ '<div class="orosGS_item100">'
				+ '<ul>'
					+ '<li class="orosGS_building tipsTitle" style="background-position: 0px 0px;" title="' 
						+ TXT.station.nan.long + '|' + TXT.sim.grav.nanhelp + '">'
						+ '<div class="orosGS_ecke100">'
							+ '<span class="level">'
								+ '<span id="orosGS_nan"></span>&nbsp;&gt;&nbsp;'
								+ '<input id="orosGS_nanUp" rel="nan" type="text" value="0" />'
							+ '</span>'
						+ '</div>'
					+ '</li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_nanM"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_nanC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_nanD"></span>'
							+ '</li>'
							+ '<li class="orosGS_info tipsStandard" title="|' + TXT.calc.totalLink + '">'
								+ '<a href="#" class="orosGS_calc" rel="nan">' + TXT.calc.title + '</a>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
				// ========== LAB ==========
			+ '<div class="orosGS_item100">'
				+ '<ul>'
					+ '<li class="orosGS_building tipsTitle" style="background-position: -300px 0px;" title="' 
						+ TXT.station.lab.long + '|' + TXT.sim.grav.labhelp + '">'
						+ '<div class="orosGS_ecke100">'
							+ '<span class="level">'
								+ '<span id="orosGS_lab"></span>&nbsp;&gt;&nbsp;'
								+ '<input id="orosGS_labUp" rel="lab" type="text" value="0" />'
							+ '</span>'
						+ '</div>'
					+ '</li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_labM"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_labC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_labD"></span>'
							+ '</li>'
							+ '<li class="orosGS_info tipsStandard" title="|' + TXT.calc.totalLink + '">'
								+ '<a href="#" class="orosGS_calc" rel="lab">' + TXT.calc.title + '</a>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
				// ========== SS ==========
			+ '<div class="orosGS_item100">'
				+ '<ul>'
					+ '<li class="orosGS_building tipsTitle" style="background-position: -1700px 0px;" title="' 
						+ TXT.shipyard.ss.long + '|' + TXT.sim.grav.sshelp + '">'
						+ '<div class="orosGS_ecke100b">'
							+ '<span class="missing">'
								+ '<span id="orosGS_ssMiss"></span>'
							+ '</span>'
							+ '<span class="level">'
								+ '<span id="orosGS_ss"></span>'
							+ '</span>'
						+ '</div>'
					+ '</li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_ssM">0</span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_ssC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_ssD"></span>'
							+ '</li>'
							+ '<li class="orosGS_info tipsStandard" title="|' + TXT.calc.totalLink + '">'
								+ '<a href="#" class="orosGS_calc" rel="ss">' + TXT.calc.title + '</a><br />'
								+ TXT.general.time + '/' + TXT.shipyard.ss.short + '&nbsp;:&nbsp;'
								+ '<span id="orosGS_ssTime" class="time"></span><br />'
								+ TXT.general.time + ' ' + TXT.general.total.toLowerCase() + '&nbsp;:&nbsp;'
								+ '<span id="orosGS_ssTotalTime" class="time"></span>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
				// ========== GT ==========
			+ '<div class="orosGS_item80">'
				+ '<ul>'
					+ '<li class="orosGS_ship tipsTitle" style="background-position: -80px 0px;" title="' 
						+ TXT.shipyard.gt.long + '|' + TXT.sim.grav.gthelp + '">'
						+ '<div class="orosGS_ecke80b">'
							+ '<span class="missing">'
								+ '<span id="orosGS_gtMiss"></span>'
							+ '</span>'
							+ '<span class="level">'
								+ '<span id="orosGS_gt"></span>'
							+ '</span>'
						+ '</div>'
					+ '</li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_gtM">0</span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_gtC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_gtD"></span>'
							+ '</li>'
							+ '<li class="orosGS_info tipsStandard" title="|' + TXT.calc.totalLink + '">'
								+ '<a href="#" class="orosGS_calc" rel="gt">' + TXT.calc.title + '</a><br />'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
				// ========== REC ==========
			+ '<div class="orosGS_item80">'
				+ '<ul>'
					+ '<li class="orosGS_ship tipsTitle" style="background-position: -560px 0px;" title="' 
						+ TXT.shipyard.rec.long + '|' + TXT.sim.grav.rechelp + '">'
						+ '<div class="orosGS_ecke80b">'
							+ '<span class="missing">'
								+ '<span id="orosGS_recMiss"></span>'
							+ '</span>'
							+ '<span class="level">'
								+ '<span id="orosGS_rec"></span>'
							+ '</span>'
						+ '</div>'
					+ '</li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_recM">0</span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_recC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_recD"></span>'
							+ '</li>'
							+ '<li class="orosGS_info tipsStandard" title="|' + TXT.calc.totalLink + '">'
								+ '<a href="#" class="orosGS_calc" rel="rec">' + TXT.calc.title + '</a><br />'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
					+ '<li class="orosGS_debris">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_debrisC"></span>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
				// ========== TOTAL ==========
			+ '<div class="orosGS_item100">'
				+ '<ul>'
					+ '<li class="orosGS_total tipsTitle" style="-moz-background-size: 100% 100%;" title="' 
						+ TXT.general.total + '|' + TXT.sim.grav.totalhelp + '"></li>'
					+ '<li class="orosGS_resources">'
						+ '<ul>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_metall.gif"><br />'
								+ '<span id="orosGS_totalM"></span><br />'
								+ '<span id="orosGS_totalTimeM"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_kristal.gif"><br />'
								+ '<span id="orosGS_totalC"></span><br />'
								+ '<span id="orosGS_totalTimeC"></span>'
							+ '</li>'
							+ '<li class="orosGS_resource">'
								+ '<img src="img/layout/ressourcen_deuterium.gif"><br />'
								+ '<span id="orosGS_totalD"></span><br />'
								+ '<span id="orosGS_totalTimeD"></span>'
							+ '</li>'
						+ '</ul>'
					+ '</li>'
				+ '</ul>'
			+ '</div>'
		);

		$('#ajaxContent ul').css('list-style-type', 'none');
		$('#ajaxContent ul li').css({float: 'left'});
		$('#ajaxContent ul li input').css('width', '20px');
		$('.orosGS_item100').css({
			width: '320px',
			height: '100px',
			margin: '5px auto',
			padding: '5px',
			position: 'relative'
		});
		$('.orosGS_item80').css({
			width: '320px',
			height: '80px',
			margin: '5px auto',
			padding: '5px',
			position: 'relative'
		});
		$('.orosGS_building').css({
			backgroundImage: 'url("img/navigation/buildings-on.jpg")',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
			height: '100px',
			width: '100px',
			marginRight: '10px'
		});
		$('.orosGS_ship').css({
			backgroundImage: 'url("img/navigation/ships-on.jpg")',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
			height: '80px',
			width: '80px',
			marginRight: '20px',
			marginLeft: '10px'
		});
		$('.orosGS_total').css({
			backgroundImage: 'url("img/layout/sum-bg-empire.jpg")',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
			height: '100px',
			width: '100px',
			marginRight: '10px'
		});
		$('.orosGS_ecke100').css({
			backgroundImage: 'url("img/navigation/ecke_neu_100.gif")',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
			height: '100px',
			width: '100px'
		});
		$('.orosGS_ecke100b').css({
			backgroundImage: 'url("img/navigation/ecke_neu_100b.gif")',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
			height: '100px',
			width: '100px'
		});
		$('.orosGS_ecke80b').css({
			backgroundImage: 'url("img/navigation/ecke_neu_80b.gif")',
			backgroundRepeat: 'no-repeat',
			backgroundColor: 'transparent',
			height: '80px',
			width: '80px'
		});
		$('.orosGS_building .level').css({
			position: 'relative',
			top: '85px',
			left: '10px',
			width: '80px',
			textAlign: 'right',
			float: 'left'
		});
		$('.orosGS_ship .level').css({
			position: 'relative',
			top: '65px',
			left: '10px',
			width: '60px',
			textAlign: 'right',
			float: 'left'
		});
		$('.orosGS_building .missing').css({
			position: 'absolute',
			top: '7px',
			left: '10px',
			width: '85px',
			textAlign: 'right',
			float: 'left',
			color: '#99CC00',
			fontSize: '11px'
		});
		$('.orosGS_ship .missing').css({
			position: 'absolute',
			top: '7px',
			left: '20px',
			width: '65px',
			textAlign: 'right',
			float: 'left',
			color: '#99CC00',
			fontSize: '11px'
		});
		$('.orosGS_resources').css({
			position: 'relative'
		});
		$('.orosGS_debris').css({
			position: 'absolute',
			right: '-100px'
		});
		$('.orosGS_resource').css({
			width: '70px',
			height: '32px',
			textAlign: 'center',
			marginTop: '10px'
		});
		$('.orosGS_info').css({
			position: 'absolute',
			width: '190px',
			height: '40px',
			top: '60px',
			left: '10px',
			fontSize: '11px'
		});
		$('.orosGS_info.recycle').css({
			width: '70px',
			marginLeft: '-10px'
		});
		$('.orosGS_calc').css({
			width: '100%',
			float: 'left',
			textAlign: 'center',
			color: '#848484'
		});
		$('.orosGS_info .time').css('textAlign', 'left');


		$('#orosGS_planet').change(function () { changePlanet(parseInt(this.value)); });
		changePlanet(-1, true);

		$('.orosGS_building .level input').blur(function (e) {
			var rel = $(this).attr('rel');
			that[rel].lvl = parseInt(this.value);
			getCost(rel, that[rel].lvl);
		});

		$('.orosGS_calc').click(function () {
			var rel = $(this).attr('rel');
			calc.set(that[rel].cost.m, that[rel].cost.c, that[rel].cost.d);
			calc.refresh();
			oros.save();
		}).hover(function () { $(this).css('color', '#6F9FC8'); }, function () { $(this).css('color', '#848484'); });

		unsafeWindow.initCluetip();
	}
}


/*============================================================================*\
|                                COSTS SIMULATOR                               |
\*============================================================================*/

function CostsSimulator() {
	var that = this;

	this.show = function () {
		$('#ajaxContent').html(TXT.general.notdone);
	}
}

/*============================================================================*\
|                                  AFFICHAGE                                   |
\*============================================================================*/

function Defense() {
	var opt = {
		higher: '',
		lm: {ratio: 0, build: 0, needed: 0},	
		lle: {ratio: 0, build: 0, needed: 0},
		llo: {ratio: 0, build: 0, needed: 0},
		gauss: {ratio: 0, build: 0, needed: 0},
		ion: {ratio: 0, build: 0, needed: 0},
		pla: {ratio: 0, build: 0, needed: 0}
	};
	function calcOpt() {
		function initOpt(tag) {
			opt[tag].build = data.activ().defense[tag];
			opt[tag].ratio = opt[tag].build / options.defense.optimizer[tag];
			if (isNaN(opt[tag].ratio))
				opt[tag].ratio = 0;
			if (opt.higher == '' || opt[tag].ratio > opt[opt.higher].ratio)
				opt.higher = tag;
		}

		function calc(tag) {
			opt[tag].needed = options.defense.optimizer[tag] * opt[opt.higher].ratio - opt[tag].build;
		}
		
		initOpt('lm');
		initOpt('lle');
		initOpt('llo');
		initOpt('gauss');
		initOpt('ion');
		initOpt('pla');
		
		if (opt[opt.higher].ratio % 1 != 0) {
			opt[opt.higher].ratio = Math.ceil(opt[opt.higher].ratio);
		}

		calc('lm');
		calc('lle');
		calc('llo');
		calc('gauss');
		calc('ion');
		calc('pla');
	}

	this.showEndTime = function (tag) {
		if (!options.defense.showEndTime) return;

		if (tag) {
			if (data.activ().defense.build && data.activ().defense.build.tag == tag && data.activ().defense.build.end)
				$('#action ul').prepend('<li>Fin de la construction : <span class="time">'
					+ new Date(data.activ().defense.build.end).format(options.dateFormat, true) +  '</span></li>');
		} else {
			if (data.activ().shipyard.build && data.activ().shipyard.build.end)
				$('#shipAllCountdown').after('<br /><span style="color: #99CC00;">'
					+ new Date(data.activ().shipyard.build.end).format(options.dateFormat, true) + '</span>');
			else if (data.activ().defense.build && data.activ().defense.build.end)
				$('#shipAllCountdown').after('<br /><span style="color: #99CC00;">'
					+ new Date(data.activ().defense.build.end).format(options.dateFormat, true) + '</span>');
		}
	}

	this.showCost = function (tag) {
		if (!options.defense.showCost) return;

		$('input#number').keyup(function () {
			var cost = GID.getCost(tag, parseInt(this.value) || 1);
			$('div#costs ul#resources li.metal').each(function (index) {
				var src = $(this).find('img').attr('src');
				if (src.indexOf('metal') > -1)
					$(this).find('span').html(cost.m.toStr());
				else if (src.indexOf('kristal') > -1)
					$(this).find('span').html(cost.c.toStr());
				else if (src.indexOf('deuterium') > -1)
					$(this).find('span').html(cost.d.toStr());
			});
		});
		$('a#maxlink').click(function () {
			$('input#number').keyup();
		});
	}

	this.showTime = function (tag) {
		if (!options.defense.showTime) return false;

		$('input#number').keyup(function () {
			var time = new TimeSpan();
			time.setHours(((parseInt(this.value) || 1) * (GID[tag].cost.m + GID[tag].cost.c))
				/ (2500 * (1 + data.activ().station.cspa)
				* Math.pow(2, data.activ().station.nan) * info.speed));
			with (data.activ().defense)
				$('#action ul li:eq(' + (data.activ().defense.build && build.tag == tag ? 2 : 1) + ') .time').html(time.toString());
		});
		$('a#maxlink').click(function () {
			$('input#number').keyup();
		});
	}

	this.showOpt = function (tag) {
		if (!options.defense.showOptimizer || !opt[tag]) return false;

		$('#action ul').prepend('<li>' + TXT.options.pages.defenceOptimizer
			+ ' : <a id="orosDefOpt" href="#"><span style="color: #99cc00;">'
			+ (opt[tag].build + opt[tag].needed).toStr() + ' (+'
			+ (opt[tag].needed).toStr() + ')</span></a></li>');

		$('#orosDefOpt').css('text-decoration', 'none').click(function () {
			$('input#number').val(opt[tag].needed).keyup();			
		});
	}

	calcOpt();
}

function Empire() {
	this.showProduction = function () {
		if (!options.empire.showProduction) return false;
		if ($('#planetsTab.active').length == 0) return false;

		$('#resources').before(
			'<div group="prods" class="firstCat headers prods headersprods" id="prods">'
				+ '<h3 class="open"><span>' + TXT.general.production.long + '</span></h3>'
				+ '<ul class="secondCat group prods groupprods">'
					+ '<li class="metal"><span title="|Métal" class="ajaxTips">'
						+ TXT.resources.metal.long
					+ '</span></li>'
					+ '<li class="crystal"><span title="|Cristal" class="ajaxTips">'
						+ TXT.resources.cristal.long
					+ '</span></li>'
					+ '<li class="deuterium catbox-end"><span title="|Deutérium" class="ajaxTips">'
						+ TXT.resources.deuterium.long
					+ '</span></li>'
				+ '</ul>'
			+ '</div>');
		
		$('.planet .planetHead').each(function (index) {
			var prod;
			if (index < data.planet.length) {
				var id = parseInt($(this).parent().attr('id').replace('planet', ''));
				var planet = data.getPlanetById(id);
				if (!planet) return false;

				prod = new Cost();
				prod.m = planet.getProd('mmet');
				prod.c = planet.getProd('mcri');
				prod.d = planet.getProd('mdet');
			} else {
				prod = data.getOverallProd();
			}

			$(this).after('<div class="row"></div>'
				+ '<div class="values group prods groupprods">'
					+ '<div class="metal even">'
						+ '<span style="float: left; margin-left: 10px;">' + prod.m.toStr(true) + '</span>'
						+ '<span style="float: right; margin-right: 10px;">' + (prod.m * 24).toStr() + '</span>'
					+ '</div>'
					+ '<div class="crystal odd">'
						+ '<span style="float: left; margin-left: 10px;">' + prod.c.toStr() + '</span>'
						+ '<span style="float: right; margin-right: 10px;">' + (prod.c * 24).toStr() + '</span>'
					+ '</div>'
					+ '<div class="deuterium box-end even">'
						+ '<span style="float: left; margin-left: 10px;">' + prod.d.toStr() + '</span>'
						+ '<span style="float: right; margin-right: 10px;">' + (prod.d * 24).toStr() + '</span>'
					+ '</div>'
				+ '</div>');
		});
	}
}

function Fleet1() {
	this.showDailyTransport = function () {
		dailyTransport.checkActive();
		$('#slots br').before('<div class="fleft"><span>'
			+ TXT.dailyTransport.title + ':</span>&nbsp;<a id="dailyTransportActivator" href="#" style="color: '
			+ (dailyTransport.active ? '#99CC00' : '#D43635') + ';">' 
			+ (dailyTransport.active ? TXT.general.on : TXT.general.off) + '</a></div>');
		$('#dailyTransportActivator').click(function (e) {
			dailyTransport.active = !dailyTransport.active;
			options.dailyTransport.active = dailyTransport.active;
			this.innerHTML = dailyTransport.active ? TXT.general.on : TXT.general.off;
			this.style.color = dailyTransport.active ? '#99CC00' : '#D43635';
			if (dailyTransport.active) {
				if (calc.active) {
					calc.active = false;
					data.calc.active = false;
					$('#calcActivator').html(TXT.general.off).css('color', '#D43635');
				}
				dailyTransport.setShips();
			}

			oros.save();
		});
	}

	this.showCalc = function () {
		$('#slots br').before('<div class="fleft"><span>'
			+ TXT.calc.title + ':</span>&nbsp;<a id="calcActivator" href="#" style="color: '
			+ (calc.active ? '#99CC00' : '#D43635') + ';">' 
			+ (calc.active ? TXT.general.on : TXT.general.off) + '</a></div>');
		$('#calcActivator').click(function (e) {
			calc.active = !calc.active;
			data.calc.active = calc.active;
			this.innerHTML = calc.active ? TXT.general.on : TXT.general.off;
			this.style.color = calc.active ? '#99CC00' : '#D43635';
			if (calc.active) {
				if (dailyTransport.active) {
					dailyTransport.active = false;
					options.dailyTransport.active = false;
					$('#dailyTransportActivator').html(TXT.general.off).css('color', '#D43635');
				}
				calc.setShips();
			}

			oros.save();
		});
	}
	
}

function Fleet2() {
	this.showCalc = function () {
		$('#mission th:last').html(TXT.calc.title + ':&nbsp;<label style="color: '
			+ (calc.active ? '#99CC00' : '#D43635') + ';">'
			+ (calc.active ? TXT.general.on : TXT.general.off) + '</label>');
	}

	this.showDailyTransport = function () {
		$('#mission th:last').html(TXT.dailyTransport.title + ':&nbsp;<label style="color: '
			+ (dailyTransport.active ? '#99CC00' : '#D43635') + ';">'
			+ (dailyTransport.active ? TXT.general.on : TXT.general.off) + '</label>');
	}
}

function Fleet3() {
	this.showCalc = function () {
		$('#missionNameWrapper').after('<span class="fright" style="margin-right: 20px; margin-top: -5px; font-size: 10px; color: #6F9FC8">'
			+ TXT.calc.title + ':&nbsp;<label style="color: ' + (calc.active ? '#99CC00' : '#D43635') + '">'
			+ (calc.active ? TXT.general.on : TXT.general.off) + '</label></span>');
	}

	this.showDailyTransport = function () {
		$('#missionNameWrapper').after('<span class="fright" style="margin-right: 20px; margin-top: -5px; font-size: 10px; color: #6F9FC8">'
			+ TXT.dailyTransport.title + ':&nbsp;<label style="color: ' + (dailyTransport.active ? '#99CC00' : '#D43635') + '">'
			+ (dailyTransport.active ? TXT.general.on : TXT.general.off) + '</label></span>');
	}
}

function Galaxy() {
	this.showColors = function () {
		if (!options.galaxy.showColors) return;

		$('td.vacation').parent().find('td.planetname').addClass('status_abbr_vacation');
		$('td.noob:not(.vacation)').parent().find('td.planetname').addClass('status_abbr_noob');
		$('td.strong:not(.vacation)').parent().find('td.planetname').addClass('status_abbr_strong');
		$('td.inactive:not(.vacation)').parent().find('td.planetname').addClass('status_abbr_inactive');
		$('td.longinactive:not(.vacation)').parent().find('td.planetname').addClass('status_abbr_longinactive');
	}

	this.showDebris = function () {
		if (!options.galaxy.showDebris) return;

		$('td.debris:has(img)').each(function (index) {
			var debris = new Cost();
			$(this).find('li.debris-content').each(function (index) {
				var qte = $(this).text().substring($(this).text().indexOf(':') + 1).trim().toNum();
				switch (index) {
				case 0: debris.m = qte;
				case 1: debris.c = qte;
				}
			});

			if (debris.total() > 0) {
				var a = $(this).find('a.tipsGalaxy');
				a.html(debris.m.toStr() + '<br />' + debris.c.toStr());
				if (debris.total() > options.galaxy.minDebris)
					a.css('color', '#D43635');

				var script = $(this).find('ul.ListLinks li a');
				if ($(this).find('ul.ListLinks li a').length > 0)
					a[0].setAttribute('onclick', script[0].getAttribute('onclick'));
			}
		});
	}

	this.showDestroyed = function () {
		if (!options.galaxy.showDestroyed) return;

		if ((info.redesign && data.research.getBonus('astr').colo == data.planet.length)
		|| (!info.redesign && data.planet.length == 9))
			return;

		$('tr:has(td.playername a.tipsGalaxy[rel="#player99999"]) td.planetname').css({color: 'red'});
	}
}

function Messages() {
	this.showShortcut = function () {
		if (!options.messages.showShortcut || $('#orosMsgShortcut').length > 0 || $('#mailz select').length == 0) return false;

		function shortcut()	{
			$($('#mailz	select option')[parseInt($(this).attr('rel'))]).attr('selected', 'selected');
			$('#mailz select').change();
			$('#mailz .buttonOK.deleteIt').click();
		}

		function getLi(index, text)	{
			return '<li><a class="button188" href="#" rel="' + index + '" style="-moz-background-size: 100%	108px;">'
				+ text + '</a></li>';
		}

		switch (parseInt($('li.msgNavi.aktiv').attr('id')))
		{
			case 1:
				$('#mailz').before('<div id="orosMsgShortcut"><ul>'
					+ getLi(1, TXT.msg.read)
					+ getLi(2, TXT.msg.selected)
					+ getLi(3, TXT.msg.notSelected)
					+ getLi(4, TXT.msg.shown)
					+ getLi(5, TXT.msg.all)
				+ '</ul></div>');
				break;
			case 3:
				$('#mailz').before('<div id="orosMsgShortcut"><ul>'
					+ getLi(1, TXT.msg.empty)
					+ getLi(2, TXT.msg.restore)
					+ getLi(3, TXT.msg.restoreAll)
				+ '</ul></div>');
				break;		
		}


		$('#orosMsgShortcut').css({clear: 'right', width: '100%'});
		$('#orosMsgShortcut	ul').css({listStyleType: 'none', margin: '0', padding: '10px 10px',	width: '634px'});
		$('#orosMsgShortcut	li').css({
			float: 'left',
			padding: '0	5px	10px',
			background:	'url("") no-repeat transparent'
		});
		$('#orosMsgShortcut	a').css({
			width: 'auto',
			padding: '0	10px'
		}).click(shortcut);	
	}
}

function Movement() {
	this.showDailyTransport = function () {
		if (data.activIndex == data.planet.length - 1) {
			dailyTransport.active = !dailyTransport.active;
			options.dailyTransport.active = dailyTransport.active;
			oros.save();
			unsafeWindow.fadeBox(TXT.dailyTransport.done);
			return false;
		}
		var id = data.planet[data.activIndex + 1].id;
		if (data.main().id == id)
			id = data.planet[data.activIndex + 2].id;

		$('.fleetStatus').append(
			'<span style="float: right; margin-right: 35px;">'
				+ '<a id="oros_dailyTransport" href="' + location.href.substring(0, location.href.lastIndexOf('/') + 1)
					+ 'index.php?page=fleet1&session=' + info.session + '&cp=' + id + '">'
					+ '<span>' + TXT.dailyTransport.nextPlanet + '</span>'
				+ '</a>'
			+ '</span>');
		$('#oros_dailyTransport').focus();
	}
}

function Overview() {
	this.showEndTime = function () {
		if (data.activ().resources.build && data.activ().resources.build.end)
			$('#Countdown').after('<br /><span style="color: #99CC00;">'
				+ new Date(data.activ().resources.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
		else if (data.activ().station.build && data.activ().station.build.end)
			$('#Countdown').after('<br /><span style="color: #99CC00;">'
				+ new Date(data.activ().station.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');

		if (data.activ().shipyard.build && data.activ().shipyard.build.end)
			$('#shipAllCountdown').after('<br /><span style="color: #99CC00;">'
				+ new Date(data.activ().shipyard.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
		else if (data.activ().defense.build && data.activ().defense.build.end)
			$('#shipAllCountdown').after('<br /><span style="color: #99CC00;">'
				+ new Date(data.activ().defense.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');

		if (data.research.build && data.research.build.end)
			$('#researchCountdown').after('<br /><span style="color: #99CC00;">'
				+ new Date(data.research.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
	}

	this.showUpdate = function () {
		if (oros.updater.updated) return;

		$('#planetdata tr:first').before(
			'<tr>'
				+ '<td class="desc tipsStandard" colspan="2" style="text-align: center;" title="' + TXT.update.help + '">'
					+ '<span><a id="majOros" target="_blank" href="' + oros.updateUrl + '" style="color: #99CC00;">'
						+ TXT.update.title
					+ '</a></span>'
				+ '</td>'
			+ '</tr>');
		$('#majOros').click(function () { oros.updater.updated = true; oros.save(); });
	}
}

function Research() {
	this.showBonus = function () {
		if (!options.research.showBonus) return;

		
	}

	this.showEndTime = function (tag) {
		if (!options.research.showEndTime) return;

		if (!options.research.showEndTime) return false;
		if (data.research.build && data.research.build.tag == tag && data.research.build.end)
			$('#action ul').prepend('<li>' + TXT.general.endTimeConstruction + ' : <span class="time">'
				+ new Date(data.research.build.end).format('ddd dd/mm/yy hh:nn:ss', true) +  '</span></li>');
	}

	this.supprUseless = function (tag) {
		if (!options.research.showEndTime && !options.research.showBonus) return;

		var lis = $('div#action ul li').each(function (index) {
			switch (index) {
				case 0: //Temps de production
					if (data.research.build && data.research.build.tag == tag)
						$(this).remove();
					break;
				case 1: //Construction possible dans (si commandant)
					if (data.officers.commander && $('.missing_resource').size() == 0)
						$(this).remove();
					break;
			}
		});
	}
}

function Resources() {
	const TXTPROD = '<span class="tipsStandard" title="|{0}">{1}</span> ('
		+ '<span class="tipsStandard" title="|{2}">{3}</span> + '
		+ '<span class="tipsStandard" title="|{4}">{5}</span>)';

	const TXTENER = '<span class="tipsStandard" title="|{0}">{1}</span> ('
		+ '<span class="tipsStandard" title="|{2}">{3}</span> + '
		+ '<span class="tipsStandard" title="|{4}">{5}</span>) => '
		+ '<span class="tipsStandard" title="|{6}">{7}</span>';

	this.showEndTime = function (tag) {
		if (!options.buildings.showEndTime) return false;

		if (tag) {
			if (data.activ().resources.build && data.activ().resources.build.tag == tag && data.activ().resources.build.end)
				$('#action ul').prepend('<li>' + TXT.general.endTimeConstruction + ' : <span class="time">'
					+ new Date(data.activ().resources.build.end).format(options.date.format, !options.date.complete) +  '</span></li>');
		} else {
			if (data.activ().resources.build && data.activ().resources.build.end)
				$('#Countdown').after('<br /><span style="color: #99CC00;" class="tipsStandard" title="|' + TXT.general.endTimeConstruction + '>'
					+ new Date(data.activ().resources.build.end).format(options.date.format, !options.date.complete) + '</span>');
			else if (data.activ().station.build && data.activ().station.build.end)
				$('#Countdown').after('<br /><span style="color: #99CC00;" class="tipsStandard" title="|' + TXT.general.endTimeConstruction + '>'
					+ new Date(data.activ().station.build.end).format(options.date.format, !options.date.complete) + '</span>');

			if (data.activ().shipyard.build && data.activ().shipyard.build.end)
				$('#shipAllCountdown').after('<br /><span style="color: #99CC00;" class="tipsStandard" title="|' + TXT.general.endTimeConstruction + '>'
					+ new Date(data.activ().shipyard.build.end).format(options.date.format, !options.date.complete) + '</span>');
			else if (data.activ().defense.build && data.activ().defense.build.end)
				$('#shipAllCountdown').after('<br /><span style="color: #99CC00;" class="tipsStandard" title="|' + TXT.general.endTimeConstruction + '>'
					+ new Date(data.activ().defense.build.end).format(options.date.format, !options.date.complete) + '</span>');
		}
	}

	this.showProd = function (tag) {
		if (!options.buildings.showProd) return false;
		var prod, prod2, txt, energy;
		
		prod = data.activ().getProd(tag, data.activ().getLvl(tag)); //Production actuelle
		switch (tag) {
			case 'mmet':
			case 'mcri':
			case 'mdet':
				prod2 = data.activ().getProd(tag, data.activ().getLvl(tag, -1)); //Production au niveau suivant
				txt = TXTPROD.format(TXT.hint.nextProd, prod2.toStr(),
					TXT.hint.curProd, prod.toStr(),
					TXT.hint.diff, (prod2 - prod).toStr());
				break;
			case 'hmet':
			case 'hcri':
			case 'hdet':
				prod2 = data.activ().getProd(tag, data.activ().getLvl(tag, -1)); //Production au niveau suivant
				txt = TXTPROD.format(TXT.hint.nextStock, prod2.toStr(),
					TXT.hint.curStock, prod.toStr(),
					TXT.hint.diff, (prod2 - prod).toStr());
				break;
			case 'ces':
			case 'cef':
				energy = data.activ().getEnergyProd(tag, -1) - data.activ().getEnergyConso(tag); //Energie restante
				prod2 = data.activ().getProd(tag, data.activ().getLvl(tag, -1)); //Production au niveau suivant
				txt = TXTENER.format(TXT.hint.nextProd, prod2.toStr(),
					TXT.hint.curProd, prod.toStr(),
					TXT.hint.diff, (prod2 - prod).toStr(),
					TXT.hint.energyLeft, energy.toStr());
				break;
			case 'ss':
				txt = '<span class="tipsStandard" title="|' + TXT.hint.ssProd + '">' + data.activ().getProd(tag, 1) + '</span>'; //Production par satellite
				$('input#number').attr('autocomplete', 'off').keyup(function (e) {
					prod = data.activ().getProd(tag, 1);
					prod2 = data.activ().getProd('ss', this.value);
					energy = data.activ().getEnergyProd(tag, data.activ().resources.ss + parseInt(this.value)) - data.activ().getEnergyConso(tag);
					txt = TXTPROD.format(TXT.hint.ssProd, prod.toStr(),
						TXT.hint.ssProdn.format(this.value), prod2.toStr(),
						TXT.hint.energyLeft, energy.toStr());
					$('#action ul li:first span').html(txt);
					unsafeWindow.initCluetip();
				});
				$('a#maxlink').click(function() { $('input#number').keyup(); });
				break;
		}

		if (txt)
			$('#action ul').prepend('<li>' + TXT.general.production.long + ' : <span style="color: #99cc00;">' + txt + '</span></li>');
	}

	this.showConso = function (tag) {
		if (!options.buildings.showConso) return false;
		var conso, conso2, energy, txt;

		switch (tag) {
			case 'mmet':
			case 'mcri':
			case 'mdet':
				conso = data.activ().getConso(tag, data.activ().getLvl(tag));//Consommation actuelle
				conso2 = data.activ().getConso(tag, data.activ().getLvl(tag, -1)); //Consommation au niveau suivant
				energy = data.activ().getEnergyProd(tag) - data.activ().getEnergyConso(tag, -1); //Energie restante
				txt = TXTENER.format(TXT.hint.nextCons, conso2.toStr(),
					TXT.hint.curCons, conso.toStr(),
					TXT.hint.diff, (conso2 - conso).toStr(),
					TXT.hint.energyLeft, energy.toStr());
				break;
			case 'cef':
				conso = data.activ().getConso(tag, data.activ().getLvl(tag)); //Consommation actuelle
				conso2 = data.activ().getConso(tag, data.activ().getLvl(tag, -1)); //Consommation au niveau suivant
				energy = data.activ().getProd('mdet', data.activ().getLvl('mdet')) - conso2;  //Energie restante
				txt = TXTENER.format(TXT.hint.nextConsD, conso2.toStr(),
					TXT.hint.curConsD, conso.toStr(),
					TXT.hint.diff, (conso2 - conso).toStr(),
					TXT.hint.deutLeft, energy.toStr());
				break;
		}

		if (txt)
			$('#action ul').prepend('<li>' + TXT.general.consumption.long + ' : <span style="color: #D43635;">' + txt + '</span></li>');
	}

	this.changeCSS = function () {
		if (options.buildings.showEndTime || options.buildings.showProd || options.buildings.showConso)
			$('div#action ul').css({'line-height': 'auto', 'padding-top': '5px'});
	}

	this.supprUseless = function (tag) {
		if (options.buildings.showEndTime || options.buildings.showProd || options.buildings.showConso)
			var lis = $('div#action ul li').each(function (index) {
				switch (index) {
					case 0: //Temps de production
						if (tag != 'ss' && data.activ().resources.build && data.activ().resources.build.tag == tag)
							$(this).remove();
						break;
					case 1: //Construction possible dans (si commandant) || Energie nécessaire
						if (data.officers.commander) {
							if ($('.missing_resource').size() == 0)
								$(this).remove();
						}
						else if ('mmet,mcri,mdet'.indexOf(tag) > -1)
							$(this).remove();
						break;
					case 2: //Energie nécessaire
						if (data.officers.commander && 'mmet,mcri,mdet'.indexOf(tag) > -1)
							$(this).remove();
						break;
				}
			});
	}
}

function Shipyard() {
	this.showEndTime = function (tag) {
		if (!options.shipyard.showEndTime) return false;

		if (tag) {
			if (data.activ().shipyard.build && data.activ().shipyard.build.tag == tag && data.activ().shipyard.build.end)
				$('#action ul').prepend('<li>' + TXT.general.endTimeConstruction + ' : <span class="time">'
					+ new Date(data.activ().shipyard.build.end).format('ddd dd/mm/yy hh:nn:ss', true) +  '</span></li>');
		} else {
			if (data.activ().shipyard.build && data.activ().shipyard.build.end)
				$('#shipAllCountdown').after('<br /><span style="color: #99CC00;">'
					+ new Date(data.activ().shipyard.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
			else if (data.activ().defense.build && data.activ().defense.build.end)
				$('#shipAllCountdown').after('<br /><span style="color: #99CC00;">'
					+ new Date(data.activ().defense.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
		}
	}

	this.showCost = function (tag) {
		if (!options.shipyard.showCost) return false;

		$('input#number').keyup(function () {
			var cost = GID.getCost(tag, parseInt(this.value) || 1);
			$('div#costs ul#resources li.metal').each(function (index) {
				var src = $(this).find('img').attr('src');
				if (src.indexOf('metal') > -1)
					$(this).find('span').html(cost.m.toStr());
				else if (src.indexOf('kristal') > -1)
					$(this).find('span').html(cost.c.toStr());
				else if (src.indexOf('deuterium') > -1)
					$(this).find('span').html(cost.d.toStr());
			});
		});

		$('a#maxlink').click(function () {
			$('input#number').keyup();
		});
	}

	this.showTime = function (tag) {
		if (!options.shipyard.showTime) return false;

		$('input#number').keyup(function () {
			var time = new TimeSpan();
			time.setHours(((parseInt(this.value) || 1) * (GID[tag].cost.m + GID[tag].cost.c))
				/ (2500 * (1 + data.activ().station.cspa)
				* Math.pow(2, data.activ().station.nan) * info.speed));
			with (data.activ().shipyard)
				$('#action ul li:eq(' + (data.activ().shipyard.build && build.tag == tag ? 1 : 0) + ') .time').html(time.toString());
		});
		$('a#maxlink').click(function () {
			$('input#number').keyup();
		});		
	}
}

function Station() {
	const TXTTIME = '<li class="tipsStandardMax" title="|{0}">' + TXT.station.time
		+ ' : <span style="color: #99cc00;">{1}%</span></li>';
	const TXTSLOT = '<li>' + TXT.station.slot + ' : <span style="color: #99cc00;">'
			+ '<span class="tipsStandardMax" title="|{0}">{1}</span> ('
			+ '<span class="tipsStandardMax" title="|{2}">{3}</span> + '
			+ '<span class="tipsStandardMax" title="|{4}">5</span>)'
		+ '</li>';
	const TXT_NETWORK = '<span style="display: block; padding-top: 5px; color: #99cc00;">{0}</span>';

	this.showEndTime = function (tag) {
		if (!options.buildings.showEndTime) return false;

		if (tag) {
			if (data.activ().station.build && data.activ().station.build.tag == tag && data.activ().station.build.end)
				$('#action ul').prepend('<li>' + TXT.general.endTimeConstruction + ' : <span class="time">'
					+ new Date(data.activ().station.build.end).format('ddd dd/mm/yy hh:nn:ss', true) +  '</span></li>');
		} else {
			if (data.activ().resources.build && data.activ().resources.build.end)
				$('#Countdown').after('<br /><span style="color: #99CC00;">'
					+ new Date(data.activ().resources.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
			else if (data.activ().station.build && data.activ().station.build.end)
				$('#Countdown').after('<br /><span style="color: #99CC00;">'
					+ new Date(data.activ().station.build.end).format('ddd dd/mm/yy hh:nn:ss', true) + '</span>');
		}
	}

	this.showProd = function(tag) {
		if (!options.buildings.showProd) return false;
		var txt;
		
		switch (tag) {
			case 'rob':
			case 'cspa':
				txt = TXTTIME.format(TXT.hint[tag], data.activ().getTime(tag, data.activ().getLvl(tag, -1)));
				break;
			case 'nan':
				txt = TXTTIME.format(TXT.hint[tag], '50');
				break;
			case 'lab':
				var result = data.activ().getResearch();
				txt = TXTTIME.format(TXT.hint[tag], result.time);
				if (result.network)
					$('#description p').append(TXT_NETWORK.format(TXT.station.network.format(result.lvl)));
				break;
			case 'ter':
				txt = TXTSLOT.format(TXT.hint.nextSlot, data.activ().maxCells + 5,
					TXT.hint.curSlot, data.activ().maxCells,
					TXT.hint.diff);
		}

		if (txt)
			$('#action ul').prepend(txt);
	}

	this.supprUseless = function (tag) {
		if (options.buildings.showEndTime || options.buildings.showProd)
			var lis = $('div#action ul li').each(function (index) {
				switch (index) {
					case 0: //Temps de production
						if (data.activ().station.build && data.activ().station.build.tag == tag)
							$(this).remove();
						break;
					case 1: //Construction possible dans (si commandant)
						if (data.officers.commander && $('.missing_resource').size() == 0)
							$(this).remove();
						break;
				}
			});
	}
}


/*============================================================================*\
|                                    PARSER                                    |
\*============================================================================*/

function Parser() {
	this.parseAccount = function () {
		if (!data.officers)
			data.officers = defaultData.officers;
		data.officers.commander = $('img[src="/game/img/layout/commander_ikon.gif"]').length > 0 ? true : false;
		data.officers.admiral = $('img[src="/game/img/layout/admiral_ikon.gif"]').length > 0 ? true : false;
		data.officers.engineer = $('img[src="/game/img/layout/ingenieur_ikon.gif"]').length > 0 ? true : false;
		data.officers.geologist = $('img[src="/game/img/layout/geologe_ikon.gif"]').length > 0 ? true : false;
		data.officers.technocrat = $('img[src="/game/img/layout/technokrat_ikon.gif"]').length > 0 ? true : false;
	}

	this.parseCoord = function(sCoord) {
		var c = new Coord();
		var reg = /([\d]+)[^\d]*([\d]+)[^\d]*([\d]+)/;
		var result = reg.exec(sCoord);
		if (!result) {
			reg = /galaxy=(\d{1}).*system=(\d{1,3}).*planet=(\d{1,2})/;
			result = reg.exec(sCoord);
		}

		if (result) {
			c.galaxy = result[1];
			c.system = result[2];
			c.position = result[3];
			return c;
		} else 
			return null;
	}

	this.parseLevels = function () {
		var page = info.page == 'fleet1' ? 'shipyard' : info.page;
		var obj = data.activ()[page] || data[page] || null;
		if (obj == null) return false;

		$('.ecke .level').each(function (index) {
			tag = GID.getTag(parseInt($(this).parents('a.detail_button, a#details').attr('ref')));
			if (!tag) //Fleet page
				tag = GID.getTag(parseInt($(this).parents('li').attr('id').replace('button', '')));

			if (this.childNodes.length == 1) {
				obj[tag] = this.textContent.trim().toNum();
				obj.build = new BuildInfo(tag);
				obj.build.lvl = $(this).parents('a').find('.undermark').text().trim().toNum();
			} else {
				obj[tag] = $(this).contents().filter(function() {
						return this.nodeType == 3 && this.textContent.trim() != '';
					})[0].textContent.trim().toNum();
				if (obj.build && obj.build.tag == tag)
					obj.build = null;
			}

			if (tag == 'ss') {
				if (info.page == 'resources')
					data.activ().shipyard[tag] = obj[tag];
				else if (info.page == 'shipyard')
					data.activ().resources[tag] = obj[tag];
			}
		});
	}

	this.parseEmpire = function () {
		console.time('Empire Parsing');
		var planetType = $('#planetsTab.active').length > 0 ? 'planet' : 'moon';

		function parseGroup(group) {
			for (var i = 0; i < GID[group].length; i++) {
				var tag = GID[group][i];
				if (group == 'resources' && tag == 'ss') continue;

				$('.planetWrapper div.' + GID[tag].id).each(function (index) {
					var id = parseInt($(this).parents('.planet').attr('id').replace(planetType, ''));

					var planet;
					if (GID[tag].id > 99 && GID[tag].id < 200)
						planet = data;
					else {
						planet = data.getPlanetById(id);
						if (!planet)
							planet = createPlanet(id);
					}

					if (('resources,station').indexOf(group) > -1) {
						planet[group][tag] = $(this).find('a:not(.active)').text().toNum();
					
						//upgrade
						var up = $(this).find('a.active');
						if (up.length > 0) {
							if (parseInt(up[0].getAttribute('onclick').match(/,(\d+)\);/)[1]) == 1) 
								with (planet[group]) {
									if (!planet[group].build || planet[group].build == -1)
										planet[group].build = new BuildInfo();
									if (!(build.tag == tag && build.lvl == up.html().toNum()))
										build.end = 0;
									build.tag = tag;
									build.lvl = up.html().toNum();
								}
						} else if (planet[group].build && planet[group].build.tag == tag) {
							planet[group].build = new BuildInfo();
						}
					} else if (group == 'research' && $(this).find('img').length > 0) {
						var lvls = $(this).html().match(/(\d+)/g);

						planet[group][tag] = parseInt(lvls[1]);
						with (planet[group]) {
							if (!planet[group].build || build == -1)
								planet[group].build = new BuildInfo();
							if (!(build.tag == tag && build.lvl == lvls[2].toNum()))
								build.end = 0;
							build.tag = tag;
							build.lvl = lvls[2].toNum();
						}
					} else {
						planet[group][tag] = $(this).text().toNum();
					}

					return planet != data;
				});
			}
			oros.save();
		}

		function createPlanet(id) {
			var planet = new Planet();
			planet.id = id;
			planet.isMoon = planetType == 'moon';
			planet.name = $('#planet' + id + ' .planetname').html();
			planet.coord = $('#planet' + id + ' .coords').html().toCoord();
			data.planet.push(planet);
			return planet;
		}

		parseGroup('resources');
		parseGroup('station');
		parseGroup('defense');
		parseGroup('shipyard');
		parseGroup('research');
		console.timeEnd('Empire Parsing');
	}

	this.parseMain = function () {
		//Parsing de l'URL pour obtenir l'univers, la langue, la page et la session
		var reg = (/http:\/\/([^\.]+)(\.([^\.]*))?\.ogame.([^\/]+)\/game\/index\.php\?page=([^&]*).*&session=([^&]*)&?/).exec(document.URL);
		var result = { };
		if (reg) {
			result.uni = reg[1];
			result.lang = reg[3] || reg[4];
			result.page = reg[5];
			result.session = reg[6];
		}
		//Nom du joueur
		result.player = $('#playerName span.textBeefy').text();

		//Vitesse de l'univers
		if ('uni50,uni60,uni107,gemini'.indexOf(result.uni) > -1)
			result.speed = 2;
		else if ('uni106,fornax'.indexOf(result.uni) > -1)
			result.speed = 4;
		else
			result.speed = 1;

		reg = (/([a-zA-Z]+)(\d*)/).exec(result.uni);
		if (reg)
			result.redesign = reg[2] == '' || parseInt(reg[2]) > 99;

		return result;
	}

	this.parseOverview = function () {
		//
	}

	this.parsePlanets = function () {

		$('.smallplanet').each(function (index) {
			var title = $(this).find('.planetlink').attr('title').split(/([\d\.-]+)/);
			var href = $(this).find('.planetlink').attr('href');
			var planet, moon;

			if (!data.planet[index])
				data.planet[index] = new Planet();
			planet = data.planet[index];

			if (href != '#')
				planet.id = (/&cp=([^&#]*)/).exec(href)[1];
			planet.name = $(this).find('.planet-name').text();
			planet.coord = parser.parseCoord($(this).find('.planet-koords').text());
			planet.minTemp = parseInt(title[13]);
			planet.maxTemp = parseInt(title[15]);
			planet.avgTemp = (planet.minTemp + planet.maxTemp) / 2;
			planet.maxCells = parseInt(title[11]);
			planet.isMoon = false;

			if ($(this).find('.moonlink').length == 1) {
				href = $(this).find('.moonlink').attr('href');
				if (!data.moon[index])
					data.moon[index] = new Planet();
				moon = data.moon[index];
				
				moon.isMoon = true;
				moon.coord.merge(planet.coord);
				moon.coord.type = 2;
				if (href != '#')
					moon.id = (/&cp=([^&#]*)/).exec(href)[1];
			}

			if ($(this).find('.active').length == 1) {
				data.activIndex = index;
				data.isMoon = $(this).find('.active').attr('href') != '#';
			}
		});
	}

	this.parseQueue = function () {
		var obj = data.activ()[info.page] || null;
		if (obj == null) return false;
		
		obj.queue = [];
		$('#pqueue a').each(function (index) {
			if (!$(this).attr('ref')) return true;
			obj.queue[index] = {
				tag: GID.getTag($(this).attr('ref').toNum()),
				lvl: $(this).siblings('.number').text().toNum()
			};
		});
	}

	this.parseResourcesStock = function () {
		if (!data.activ().resources.stock)
			data.activ().resources.stock = {m: 0, c: 0, d: 0};
		data.activ().resources.stock.m = parseInt($('#resources_metal').text().trim().replace(/\./g, ''));
		data.activ().resources.stock.c = parseInt($('#resources_crystal').text().trim().replace(/\./g, ''));
		data.activ().resources.stock.d = parseInt($('#resources_deuterium').text().trim().replace(/\./g, ''));
	}

	this.parseTime = function () {
		var script = $('script:not([src])').text();

		var reg = /getElementByIdWithCache\([\'\"](Countdown|researchCountdown|shipSumCount|b_research[\d]{3})[^\d]+([\d]+),([^\d]+([\d]+),[^\d]+([\d]+),[^\d]+([\d]+),)*/gm;
		var result = script.split(reg);
		for (i = 0; i < result.length; i++) {
			if (result[i] == 'Countdown') {
				i++;
				if (typeof(data.activ().resources.build) == 'object')
					data.activ().resources.build.end = new Date(new Date().getTime() + parseInt(result[i]) * 1000).getTime();
				else if (typeof(data.activ().station.build) == 'object')
					data.activ().station.build.end = new Date(new Date().getTime() + parseInt(result[i]) * 1000).getTime();
			} else if (result[i] == 'shipSumCount') {
				i += 4;
				if (typeof(data.activ().shipyard.build) == 'object') {
					data.activ().shipyard.build.end = new Date(new Date().getTime() + parseInt(result[i]) * 1000).getTime();
					data.activ().shipyard.build.lvl = parseInt(result[++i]);
				} else if (typeof(data.activ().defense.build) == 'object') {
					data.activ().defense.build.end = new Date(new Date().getTime() + parseInt(result[i]) * 1000).getTime();
					data.activ().defense.build.lvl = parseInt(result[++i]);
				}
			} else if ((result[i] == 'researchCountdown' || result[i].indexOf('b_research') == 0) && data.research.build) {
				i++;
				data.research.build.end = new Date(new Date().getTime() + parseInt(result[i]) * 1000).getTime();
			}
		}
	}
}


/*============================================================================*\
|                                  EXECUTION                                   |
\*============================================================================*/

//Initialisation obligatoire pour récupérer l'univers et le nom du joueur, pour pouvoir récupérer ensuite données et options
var data = defaultData;
var options = defaultOptions;
var parser = new Parser();
var info = parser.parseMain();
var res, updater;

//Initialisation des données, options et langue
var oros = new Oros();
oros.load();
oros.checkUpdate();

//***************************** PARSING/AFFICHAGE ****************************\\
calc = new Calc();
if (('overview,resources,resourceSettings,station,trader,research,shipyard,defense,fleet1,fleet2,fleet3,galaxy,network,premium,messages,movement').indexOf(info.page) > -1) {
	parser.parseAccount();
	parser.parsePlanets();
	parser.parseResourcesStock();
	parser.parseLevels();
	parser.parseQueue();
	oros.showButton();
	calc.show();
	if (info.page == 'defense') {
		//parser.parseDefense();
		parser.parseTime();

		res = new Defense();
		res.showEndTime();
	}
	else if (info.page == 'fleet1') {
		//parser.parseShipyard();

		dailyTransport = new DailyTransport();
		res = new Fleet1();
		res.showDailyTransport();
		res.showCalc();

		if (dailyTransport.active)
			dailyTransport.setShips();
		else if (calc.active)
			calc.setShips();
	}
	else if (info.page == 'fleet2') {
		dailyTransport = new DailyTransport();
		res = new Fleet2();
		
		if (dailyTransport.active) {
			res.showDailyTransport();
			dailyTransport.setCoord();
		} else if (calc.active) {
			res.showCalc();
		}
	}
	else if (info.page == 'fleet3') {
		dailyTransport = new DailyTransport();
		res = new Fleet3();

		if (dailyTransport.active) {
			res.showDailyTransport();
			dailyTransport.setResources();
		} else if (calc.active) {
			res.showCalc();
			calc.setResources();
		}
	}
	else if (info.page == 'galaxy') {
		res = new Galaxy();
	}
	else if (info.page == 'messages') {
		res = new Messages();
		if (options.spytool.active)
			oros[info.player].spytool.read();
	}
	else if (info.page == 'movement') {
		dailyTransport = new DailyTransport();
		res = new Movement();

		if (dailyTransport.active)
			res.showDailyTransport();
	}
	else if (info.page == 'overview') {
		parser.parseOverview();
		parser.parseTime();

		dailyTransport = new DailyTransport();
		res = new Overview();
		res.showEndTime();
		res.showUpdate();
	}
	else if (info.page == 'research') {
		//parser.parseResearch();
		parser.parseTime();
	}
	else if (info.page == 'resources') {
		//parser.parseResources();
		parser.parseTime();

		res = new Resources();
		res.showEndTime();
	}
	else if (info.page == 'shipyard') {
		//parser.parseShipyard();
		parser.parseTime();

		res = new Shipyard();
		res.showEndTime();
	}
	else if (info.page == 'station') {
		//parser.parseStation();
		parser.parseTime();

		res = new Station();
		res.showEndTime();
	}
}
else if (info.page == 'empire') {
	res = new Empire();
	$(document).ready(function() {
		parser.parseEmpire();
		res.showProduction();
	});
}
else if (info.page == 'showmessage') {
	var cat = 0;
	var result = (/cat=([^&]*)/).exec(document.URL);
	if (result) {
		cat = parseInt(result[1]);
		data.msgCat = cat;
	}
	else
		cat = data.msgCat;

	if (cat == 7) {
		parser.parseSpyReport();
		calc.showSpy();
		if (options.spytool.active) oros[info.player].spytool.read();
	}
}

/******************************* AFFICHAGE/AJAX *******************************\
\*            Gestion de l'affichage sur les divs chargées en Ajax            */
$(document).ajaxSuccess(function (e, xhr, settings) {
	console.time('Oros (Ajax)');

	info = parser.parseMain(settings.url);
	if (settings.data)
		var tag = GID.getTag(parseInt(settings.data.replace('type=', '')));

	if (tag && info.page == 'resources') {
		res.supprUseless(tag);
		res.showEndTime(tag);
		res.showConso(tag);
		res.showProd(tag);
		res.changeCSS();
		calc.showCosts();
	}
	else if (tag && info.page == 'station') {
		res.supprUseless(tag);
		res.showEndTime(tag);
		res.showProd(tag);
		calc.showCosts();
	}
	else if (tag && info.page == 'shipyard') {
		res.showEndTime(tag);
		res.showCost(tag);
		res.showTime(tag);
		calc.showCosts();
	}
	else if (tag && info.page == 'defense') {
		res.showOpt(tag);
		res.showEndTime(tag);
		res.showCost(tag);
		res.showTime(tag);
		calc.showCosts();
	}
	else if (tag && info.page == 'research') {
		res = new Research();
		res.supprUseless(tag);
		res.showEndTime(tag);
		//res.showProd(tag);
		calc.showCosts();
	}
	else if (info.page == 'galaxy') {
		res.showDestroyed();
		res.showColors();
		res.showDebris();
	}
	else if (info.page == 'messages') {
		res.showShortcut();
		if (options.spytool.active)
			oros[info.player].spytool.read();
	}

	unsafeWindow.initCluetip();
	console.timeEnd('Oros (Ajax)');
});

oros.save();
unsafeWindow.oros = oros;
oros[info.player].setup.show();
console.timeEnd('Oros');