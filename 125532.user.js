// ==UserScript==
// @name           Improved Battlelog
// @namespace      Chathurga
// @description    Improves the Battlelog for Battlefield 3 with several changes
// @include        *battlelog.battlefield.com/bf3/*
// ==/UserScript==

// wrap the script in a function and inject it into the page
// easiest way to get access to the real window on chrome
function improvedBattlelog() {

var	init = {}, // will contain functions for initialization on different parts of Battlelog
	j$ = window.$, // get jQuery + jQuery UI from the page
	baseUrl = location.protocol + '//' + location.host + '/bf3/'; // the base Battlelog url


/* General Functions */

// store/retrieve a value that can be read between page sessions
// Battlelog started wiping localStorage on chrome every page load so use cookies instead
function store(name, value) {
	document.cookie = name + '=' + value + '; max-age=' + (60 * 60 * 24 * 365);
}
function retrieve(name, defaultVal) {
	var cookies = document.cookie.split('; '), value;
	for (var i = 0, cookie; (cookie = cookies[i]); i++) {
		var parts = cookie.split('=');
		if (parts[0] == name) {
			value = parts[1];
		}
	}
	return (value != null) ? value : defaultVal;
}
// rounds a number to a decimal place
// place: a value of 2 will round 4.527 to 4.53, place should be larger than 0
function round(num, place) {
	if (place <= 0) {
		return Math.round(num);
	}
	var divide = Math.pow(10, place);
	return Math.round(num * divide) / divide;
}
// get one element
function $(selector, context) {
	return (context || document).querySelector(selector);
}
// get a list of elements
function $$(selector, context) {
	return (context || document).querySelectorAll(selector, context);
}

// adds a listener for DOMNodeInserted and runs the callback when an element matching selector is found
// parent: event to attach the listener to, can be string selector
// selector: what kind of an element to match
// callback: function to run on match, in the form callback(event, matchedElement, parent)
function monitorDOM(parent, selector, callback) {
	if (typeof parent == 'string') {
		parent = $(parent);
	}
	
	parent.addEventListener('DOMNodeInserted', function(e) {
		// make sure the target is an element and not a text node
		if (e.target.nodeType != 1) {
			return;
		}
		// check for a match
		if (!j$.find.matchesSelector(e.target, selector)) return;
		
		callback(e, e.target, parent);
	}, false);
}
// retrieve data from Battlelog in JSON format
// url: The URL to retrieve
// data: array of data to place into the URL where data[0] will replace %1, data[1] %2 etc
// callback: function to call with the response, in the form callback(response)
function getJSON(url, data, callback) {
	for (var i = 0; i < data.length; i++) {
		url = url.replace('%' + (i + 1), data[i]);
	}
	return j$.getJSON(baseUrl + url, callback);
}

// Queues and loads JSON requests
// numParallel: the number of requests to run in parallel
// callback: the callback to run on each response, in the form callback(response, args) see below
function getJSONQueue(numParallel, callback) {
	this.numParallel = numParallel;
	this.callback = callback;
	this.working = 0;
	this.queue = [];
	this.requests = [];
}
// queue a url
// url and data work in the same way as in getJSON
// args: array of arguments to pass into the callback
getJSONQueue.prototype.add = function(url, data, args) {
	this.queue.push([url, data, args]);
	if (this.working < this.numParallel) {
		this.next();
	}
}
// loads the next item in the queue
getJSONQueue.prototype.next = function() {
	var self = this, parts = this.queue.shift(),
		url = parts[0], data = parts[1], args = parts[2];
	
	this.working++;
	var request = getJSON(url, data, function(resp) {
		// remove this request from the list of requests
		var reqIndex = self.requests.indexOf(request);
		self.requests.splice(reqIndex, 1);
		
		self.working--;
		self.callback(resp, args);
		
		if (self.queue.length) {
			self.next();
		}
	});
	this.requests.push(request);
}
// stops and removes the queue and any open requests
getJSONQueue.prototype.abort = function() {
	for (var i = 0, request; (request = this.requests[i]); i++) {
		request.abort();
	}
	this.queue = [];
	this.working = 0;
}


/** Settings **/

var settings = {
	serversShowall: {
		value: retrieve('bb-servers-showall', 1),
		text: 'Load all servers possible at the one time (requires refresh)'
	},
	serversSliders: {
		value: retrieve('bb-servers-sliders', 1),
		text: 'Changes Free Slots to a slider and adds a Filled Slots slider',
		callback: function(value) {
			if (value == 1) {
				filterSlotsInit();
			} else {
				// show the original filter
				$('.bb-slot-orig').style.display = 'block';
				// hide sliders
				var sliderAreas = $$('.bb-slider-area');
				for (var i = 0, area; (area = sliderAreas[i]); i++) {
					area.parentNode.removeChild(area);
				}
				// stop listening for game size changes
				var column = $('input[name="slots"]').parentNode.parentNode,
					limitList = $('.serverguide-filter-selectables', column);
				j$(limitList).unbind('.slotfilter');
			}
			
			filterServerRows();
		}
	},
	serversPlayerinfo: {
		value: retrieve('bb-servers-playerinfo', 1),
		text: 'Display information like Player rank, top class on server info',
		callback: function(value) {
			
		}
	}
};

function settingsInit() {
	var	els = template('settings', {
			appendTo: document.body
		}, {multiple: true}),
		button = els[0], container = els[1],
		rows = $('.bb-settings-rows', container);
	
	button.addEventListener('click', function() {
		container.style.display = 'block';
		document.body.style.overflow = 'hidden';
	}, false);
	
	$('.bb-settings-close', container).addEventListener('click', function() {
		container.style.display = 'none';
		document.body.style.overflow = '';
	});
	
	for (var settingName in settings) {
		(function(name, setting) {
			var	row = template('settings-row', {
					checked: (setting.value == 1),
					text: setting.text,
					appendTo: rows
				}),
				input = $('input', row);
			
			row.addEventListener('click', function() {
				var	value = (setting.value == 1) ? 0 : 1,
					storeName = name.replace(/[A-Z]/g, function(letter) {
						return '-' + letter.toLowerCase();
					});
				setting.value = value;
				input.checked = (value == 1);
				store('bb-' + storeName, value);
				
				if (setting.callback) {
					setting.callback(value);
				}
			}, false);
			
			input.addEventListener('click', function(e) {
				e.preventDefault();
			}, false);
		})(settingName, settings[settingName]);
	}
}


/** Server Page **/

/* Server filtering by free or filled slots */
var	sliderTypes = ['free', 'filled'],
	sliderStored = ['min', 'max', 'state'],
	sliderDefaults = [0, null, 'exclude'],
	sliderValues = {free: {}, filled: {}},
	pingVals = {
		value: retrieve('ping-value', 100),
		state: retrieve('ping-state', 'exclude')
	};

// goes through all the servers and runs filterServerRow on them
function filterServerRows() {
	var rows = $$('#serverguide-listcontainer > *:not(div)');
	for (var i = 0, row; (row = rows[i]); i++) {
		filterServerRow(row);
	}
}

// checks a server against the filters and hides it if it fails
// data: can either be the row or an event with the row as data.target
function filterServerRow(data) {
	var row = (data.target) ? data.target : data,
		playerCell = $('.serverguide-cell-players', row),
		pingCell = $('span', $('.serverguide-cell-ping ', row)),
		parts = playerCell.textContent.trim().split(' / '),
		players = parts[0],
		max = parts[1].split(' ')[0]; // remove the queue number
	
	row.style.display = ''; // make sure the row starts displayed
	
	// filter on slots
	if (settings.serversSliders.value == 1) {
		for (var i = 0, type; (type = sliderTypes[i]); i++) {
			var	filter = sliderValues[type],
				check = (type == 'free') ? (max - players) : players;
			if (filter.state == 'exclude') {
				continue;
			}
			
			if (!(filter.min <= check && check <= filter.max)) {
				row.style.display = 'none';
				break;
			}
		}
	}
	// filter on ping
	if (pingVals.state == 'include') {
		filterPing(row, pingCell);
	}
}

function filterPing(row, pingCell) {
	var ping = parseInt(pingCell.innerHTML, 10);
	if (ping) {
		if (ping > pingVals.value) {
			row.style.display = 'none';
		}
	} else {
		setTimeout(function() {
			filterPing(row, pingCell);
		}, 500);
	}
}

function tickBox(el, name, obj) {
	el.addEventListener('click', function(e) {
		if (e.target.nodeName == 'INPUT') return;
		
		var	oldState = (el.className.indexOf('exclude') != -1) ? 'exclude' : 'include',
			newState = (oldState == 'exclude') ? 'include' : 'exclude';
		obj.state = newState;
		store(name, newState);
		el.className = el.className.replace(oldState, newState);
		
		filterServerRows(); // refilter the rows
	}, false);
}

// finds the largest game size selected, Other = None = 64
function getServerLimit(input) {
	var	nums = input.value.split('|').sort(function(a, b) {
			return a - b;
		}),
		highest = (nums[0] == '0') ? 0 : nums[nums.length - 1];
	
	return highest || 64;
}

function filterSlotsInit() {
	if (settings.serversSliders.value != 1) return;
	
	var slots = $('input[name="slots"]'), // input that stores the real free slot value
		slotList = slots.parentNode,
		column = slotList.parentNode,
		// the game size buttons list
		limitList = $('.serverguide-filter-selectables', column),
		limitInput = $('input[name="gameSize"]'), // input that stores the game size value
		limit = getServerLimit(limitInput),
		$sliders = [];
	
	sliderDefaults[1] = limit; // fill in the filter max default
	// make sure the real slots value is blank
	if (slots.value != '') {
		slots.value = '';
		// refresh the list
		$('#serverguide-filter-form').submit();
	}
	// listen for clicks to the 'Game Size' buttons and change the sliders limit to reflect them
	j$(limitList).delegate('.serverguide-selectable', 'click.slotfilter', function() {
		// get the new server limit
		var newLimit = getServerLimit(limitInput);
		if (newLimit == limit) return;
		// change the sliders to reflect the new limit
		for (var i = 0, $slider; ($slider = $sliders[i]); i++) {
			var filter = sliderValues[sliderTypes[i]];
			// make sure the filters aren't out of bounds
			if (filter.max > newLimit) filter.max = newLimit;
			if (filter.min > newLimit) filter.min = 0;
			
			// set the new min/max values and the actual values tehn update the slider
			// this section could be cleaned up but my initial attempts yielded odd results so it's fine for now
			$slider.slider('option', 'max', newLimit);
			$slider.slider('values', 0, filter.min);
			$slider.slider('values', 1, filter.max);
			
			var slider = $slider.data('slider');
			$slider.slider('option', 'slide').call($slider, null, {values: slider._values()});
			
			filterServerRows();
		}
		limit = newLimit;
	});
	
	// hide the slot list
	var	origWrap = document.createElement('div'),
		header = slotList.previousElementSibling;
	
	// hide the original slot filter
	origWrap.className = 'bb-slot-orig';
	origWrap.style.display = 'none';
	column.insertBefore(origWrap, header);
	origWrap.appendChild(header);
	origWrap.appendChild(slotList);
	
	// add the free and filled slots sliders
	for (var i = 0, type; (type = sliderTypes[i]); i++) {
		// wrap the block in an anonymous function so the variables are scoped
		(function(type) {
			// get the stored values for this slider
			var filter = sliderValues[type];
			for (var i = 0, get; (get = sliderStored[i]); i++) {
				filter[get] = retrieve(type + '-' + get, sliderDefaults[i]);
				if (get != 'state') {
					filter[get] = parseInt(filter[get], 10);
				}
			}
			// create the slider
			var	area = template('slider-area', {
					title: type + ' Slots',
					min: filter.min, max: filter.max,
					state: filter.state,
					appendTo: column
				}),
				slider = $('.bb-slider', area),
				wrap = $('.serverguide-selectable', area),
				display = $('.bb-slider-display', wrap),
				delay;
			
			// listen for a state toggle
			wrap.addEventListener('click', function(e) {
				var oldState = filter.state;
				filter.state = (oldState == 'exclude') ? 'include' : 'exclude';
				store(type + '-state', filter.state);
				wrap.className = wrap.className.replace(oldState, filter.state);
				
				filterServerRows(); // refilter the rows
			}, false);
			
			var $slider = j$(slider).slider({
				range: true,
				min: 0, max: limit,
				values: [filter.min, filter.max],
				// gets called when the slider moves
				slide: function(e, ui) {
					display.innerHTML = ui.values[0] + ' - ' + ui.values[1];
					filter.min = ui.values[0];
					filter.max = ui.values[1];
					// delay the saving and filtering for a bit so it doesn't needlessly run in quick succession
					clearTimeout(delay);
					delay = setTimeout(function() {
						store(type + '-min', ui.values[0]);
						store(type + '-max', ui.values[1]);
						filterServerRows();
					}, 100);
				}
			});
			
			$sliders.push($slider);
		})(type);
	}
}

// initializes the slider filters and ping limit
function filterInit() {
	filterSlotsInit();
	
	// ping filter
	var pingRow = template('server-ping', {
		state: pingVals.state, value: pingVals.value,
		appendTo: $('.serverguide-filter-extra')
	});
	
	tickBox($('.bb-ping-checkbox'), 'ping-state', pingVals);
	
	var delay;
	$('input', pingRow).addEventListener('keyup', function(e) {
		clearTimeout(delay);
		delay = setTimeout(function() {
			var val = e.target.value;
			if (parseInt(val, 10) == val) {
				pingVals.value = val;
				store('ping-value', val);
				filterServerRows();
			}
		}, 500);
	}, false);
}


/* Auto display server players */
// also shows their rank, most played class and more stats on hover
var	prevQueue,
	// cache of player stats, valid for 5 minutes
	playerCache = {};

// return a string with an img tag containing a kit image
function getKitImage(kit) {
	return '<img src="http://battlelog-cdn.battlefield.com/public/profile/bf3/kit-icon-%1.png" />'.replace('%1', kit);
}

// spaces out a number, e.g. 3456789 to 3 456 789
function spaceNumber(num) {
	var	numStr = '' + num, // convert to string
		offset = numStr.length % 3,
		retNum = numStr.substr(0, offset);
	
	for (var i = offset; i < numStr.length; i += 3) {
		retNum += ' ' + numStr.substr(i, 3);
	}
	return retNum;
}

// loads a server's player list and then queues and loads their stats
function loadServerPlayers() {
	var	viewButton = $('#serverinfo-players-all-view');
	if (!viewButton || settings.serversPlayerinfo.value != 1) return;
	
	var	wrap = $('#serverinfo-players-all-wrapper'),
		serverID = viewButton.getAttribute('data');
	viewButton.parentNode.removeChild(viewButton);
	wrap.style.display = 'block';
	
	if (prevQueue) {
		prevQueue.abort();
	}
	// will load player stats in a queue
	var queue = prevQueue = new getJSONQueue(5, function(resp, args) {
		var id = args[0], row = args[1];
		loadPlayerRow(id, row, resp);
		// cache the data
		playerCache[id] = {
			time: Date.now(), data: resp
		};
	});
	
	template('player-list-header', {
		appendTo: wrap
	});
	
	getJSON('servers/getPlayersOnServer/%1/', [serverID], function(resp) {
		var hold = false,
			// after the morestats box is displayed the page will be monitored for a mouse click
			// if the mouse click didn't happen inside the morestats box then hide the box
			bodyEvent = function(e) {
				var el = e.target;
				while (el) {
					if (el.id == 'bb-morestats-active') {
						return;
					}
					el = el.parentNode;
				}
				hold = false;
				hideMoreStats();
				document.body.removeEventListener('click', bodyEvent, false);
			};
		// display/hide the morestats box on mouse enter/leave, if hold is on then do nothing
		j$(wrap)
			.delegate('.bb-player-row', 'mouseenter', function(e) {
				if (!hold) showMorestats(e);
			})
			.delegate('.bb-player-row', 'mouseleave', function(e) {
				if (!hold) hideMoreStats();
			});
		
		for (var i = 0, player; (player = resp.players[i]); i++) {
			var id = player.personaId, cache;
			// add the player row
			var row = template('player-row', {
				username: player.persona.personaName,
				avatar: player.persona.user.gravatarMd5,
				type: (i % 2 == 0) ? 'even' : 'odd',
				appendTo: wrap,
				events: {
					click: function(e) {
						if (this.className.indexOf('loaded') == -1) {
							return;
						}
						e.stopPropagation(); // stop the body click event below firing due to this click
						hold = true;
						document.body.addEventListener('click', bodyEvent, false);
					}
				}
			});
			
			// load their stats
			if ((cache = playerCache[id]) && (Date.now() - cache.time < (5 * 60 * 1000))) {
				loadPlayerRow(id, row, cache.data);
			} else {
				queue.add('overviewPopulateStats/%1/_/1/', [id], [id, row]);
			}
		}
	});
}

// displays a player's rank and top class, and more stats on hover
// id: player id
// row: (Element) the player's row in the server's player list
// data: Their stats as returned by overviewPopulateStats
function loadPlayerRow(id, row, data) {
	data = data.data;
	var stats = data.overviewStats,
		user = data.user,
		topKit, topScore = 0;
	// find the user's most played class
	for (var kit in stats.kitScores) {
		var score = stats.kitScores[kit];
		if (score > topScore) {
			topScore = score;
			topKit = kit;
		}
	}
	
	template('player-stats', {
		rank: (stats.rank > 45) ? 'ss' + (stats.rank - 45) : 'r' + stats.rank,
		kit: data.kitMap[topKit].name,
		scoreminute: stats.scorePerMinute,
		appendTo: row
	});
	
	template('player-morestats', {
		username: user.username,
		id: id,
		sections: [
			{section: 'left', rows: [
				{name: 'Kills', value: spaceNumber(stats.kills)},
				{name: 'Deaths', value: spaceNumber(stats.deaths)},
				{name: 'K/D Ratio', value: round(stats.kdRatio, 2)},
				{name: 'Accuracy', value: round(stats.accuracy, 2)},
				{name: 'Score/Minute', value: stats.scorePerMinute},
				{name: 'Quits', value: round(stats.quitPercentage, 2) + '%'}
			]},
			{section: 'right', rows: [
				{name: getKitImage('assault') + 'Assault', value: spaceNumber(stats.kitScores[1])},
				{name: getKitImage('engineer') + 'Engineer', value: spaceNumber(stats.kitScores[2])},
				{name: getKitImage('support') + 'Support', value: spaceNumber(stats.kitScores[8])},
				{name: getKitImage('recon') + 'Recon', value: spaceNumber(stats.kitScores[32])},
				{name: 'Vehicles', value: spaceNumber(stats.sc_vehicle)},
				{name: 'Total', value: spaceNumber(stats.score)},
			]}
		],
		after: row
	});
	
	row.className += ' loaded';
}

function showMorestats(e) {
	// the event will probably have triggered on a sub-element, go up until the row is found
	var playerRow = e.target;
	while (playerRow.className.indexOf('player-row') == -1) {
		playerRow = playerRow.parentNode;
	}
	
	if (playerRow.className.indexOf('loaded') == -1) {
		return;
	}
	
	var morestats = playerRow.nextElementSibling;
	morestats.id = 'bb-morestats-active';
	morestats.style.display = 'block';
	morestats.style.left = (playerRow.offsetLeft - morestats.offsetWidth) + 'px';
	morestats.style.top = (playerRow.offsetTop
		+ (playerRow.offsetHeight / 2)
		- (morestats.offsetHeight / 2)) + 'px';
}

function hideMoreStats() {
	var active = $('#bb-morestats-active');
	if (active) {
		active.style.display = 'none';
		active.id = '';
	}
}

/* Show More Servers */

function showMoreServers(callback, num) {
	num = num || 0;
	if (++num > 9) return;
	var	$window = j$(window),
		scrollPos = $window.scrollTop();
	// the callback will only fire if the page is scrolled down
	$window.scrollTop(1000 * 1000);
	callback();
	$window.scrollTop(scrollPos);
	setTimeout(function() {
		showMoreServers(callback, num);
	}, 1000);
}

// initializes the server page modifications
init.server = function() {
	filterInit(); // create the sliders + ping filter
	// listen for new server rows, filter them if needed
	monitorDOM('#serverguide-listcontainer', '[id^="serverguide-server"]', function(e, row) {
		filterServerRow(row);
	});
	// listen for a new server info being displayed, then auto load the player info
	monitorDOM('#serverguide-show', '.serverguide-online-info', loadServerPlayers);
	loadServerPlayers(); // if there is a server open already, get its players
	
	if (settings.serversShowall.value == 1) {
		// display a large amount of servers
		var	$container = j$('#serverguide-listcontainer'),
			scrollCallback = $container.data('scrollCallback');
		$container.autobrowse('unbind');
		showMoreServers(scrollCallback);
	}
}

/** End Server Page **/


/* Templating */

// simple templating function
//   name: The template name, found in templates[name]
//   data: A map of values to replace in the template, where data[key] replaces {{key}}
//   options: a map of other options
//     isHTML: (bool) if true name is actually the HTML to replace values in, this will make it return HTML too
//     multiple: (bool) if true the function will return an array of elements
// tags can be used in the template in the form {{#tag key}}content{{/tag key}}, where tag is tmplTags[tag]
// there's also special functions that run on the returned element, data[special] will run tmplSpecial[special]
// look at tmplTags and tmplSpecial to see what they do
// {{.}} has a special meaning, it's the data variable
function template(name, data, options) {
	options = options || {};
	var	html = (!options.isHTML) ? templates[name] : name,
		keyRegex;
	data['.'] = data;
	
	if (html == null && console) {
		console.error('Template "' + name + '" was not found');
	}
	
	// match any tags
	while (html.indexOf('{{#') != -1) {
		var matches = html.match(tmplTagRegex),
			block = matches[0], tag = matches[1],
			key = matches[2], content = matches[3],
			result = tmplTags[tag](data[key], matches[3], data);
		
		html = html.replace(block, result);
	}
	
	for (var key in data) {
		// only create a regex once per key
		if (!(keyRegex = tmplKeyRegexes[key])) {
			keyRegex = tmplKeyRegexes[key] = new RegExp('{{' + key + '}}', 'g');
		}
		html = html.replace(keyRegex, data[key]);
	}
	
	if (options.isHTML) {
		return html;
	}
	
	tmplTemp.innerHTML = html;
	// turn els into a normal array
	var els = Array.prototype.slice.call(tmplTemp.children, 0);
	// execute any special functions
	for (var i = 0, el; (el = els[i]); i++) {
		for (var special in tmplSpecial) {
			if (data[special]) {
				tmplSpecial[special](el, data[special]);
			}
		}
	}
	return (options.multiple) ? els : els[0];
}

var	tmplTemp = document.createElement('div'),
	tmplTagRegex = /{{#(.*?) (.*?)}}(.*?){{\/\1 \2}}/,
	tmplKeyRegexes = {},
	// tags that have a special meaning in the template
	tmplTags = {
		// each item in the array will be used to replace values in a duplicate of content
		each: function(arr, content) {
			var html = '';
			for (var i = 0, item; (item = arr[i]); i++) {
				html += template(content, item, {isHTML: true});
			}
			return html;
		},
		// if data is falsey (null, 0, '', []) the content will not get templated
		'if': function(item, content, data) {
			if (item && item.length !== 0) {
				return template(content, parent, {isHTML: true});
			}
			return '';
		}
	},
	// special functions for the templating system
	tmplSpecial = {
		appendTo: function(element, parent) {
			parent.appendChild(element);
		},
		before: function(element, ref) {
			ref.parentNode.insertBefore(element, ref);
		},
		after: function(element, ref) {
			if (ref.nextSibling) {
				ref.parentNode.insertBefore(element, ref.nextSibling);
			} else {
				ref.parentNode.appendChild(element);
			}
		},
		// binds events in the form events = {eventName: callback, click: ... etc}
		events: function(element, events) {
			for (var eventName in events) {
				var callback = events[eventName];
				element.addEventListener(eventName, function(e) {
					callback.call(element, e);
				}, false);
			}
		}
	},
	avatarDefault = encodeURIComponent('http://battlelog-cdn.battlefield.com/public/base/shared/default-avatar-22.png'),
	// the templates
	templates = {
		'settings':
			'<div class="bb-settings-button"></div>' +
			'<div class="bb-settings-container">' +
				'<div class="bb-settings">' +
					'<div class="bb-settings-header bb-header">Improved Battlelog Settings</div>' +
					'<div class="bb-settings-rows"></div>' +
					'<div class="bb-settings-close">Close</div>' +
				'</div>' +
			'</div>',
		
		'settings-row':
			'<div class="bb-settings-row"><input type="checkbox" {{#if checked}}checked="true"{{/if checked}} /> {{text}}</div>',
		
		'slider-area':
			'<div class="bb-slider-area">' +
				'<div class="serverguide-filter-name"><h1>{{title}}</h1></div>' +
				'<div class="serverguide-filter-selectables bb-selectables">' +
					'<div class="bb-slider"></div>' +
					'<div class="serverguide-selectable serverguide-{{state}}">' +
						'<div class="ticbox"></div>' +
						'<span class="bb-slider-display">{{min}} - {{max}}</span>' +
					'</div>' +
				'</div>' +
			'</div>',
		
		'server-ping':
			'<div class="serverguide-filter-selectables bb-ping-row">' +
 				'<div class="serverguide-selectable serverguide-{{state}} bb-ping-checkbox">' +
 					'<div class="ticbox"></div>' +
					'<span>Max Ping</span>' +
					'<input class="popup-serveradvancedfilter-input bb-ping-input" type="text" maxlength="3" value="{{value}}">' +
				'</div>' +
			'</div>',
		
		'player-list-header':
			'<div class="bb-players-header">' +
				'<div class="bb-players-scoreminute">Score / Min</div>' +
				'<div class="bb-players-class">Top Class</div>' +
			'</div>',
		
		'player-row':
			'<div class="bb-player-row {{type}}">' +
				'<img class="bb-avatar" src="http://www.gravatar.com/avatar/{{avatar}}?s=22&d=' + avatarDefault + '" />' +
				'<span class="bb-username">{{username}}</span>' +
			'</div>',
		
		'player-stats':
			'<span class="bb-player-extra">' +
				'<span class="bb-scoreminute">{{scoreminute}}</span>' +
				'<img class="bb-kit" src="http://battlelog-cdn.battlefield.com/public/profile/bf3/kit-icon-{{kit}}.png" />' +
				'<img class="bb-rank" src="http://battlelog-cdn.battlefield.com/public/profile/bf3/stats/ranks/tiny/{{rank}}.png" />' +
			'</span>',
		
		'player-morestats':
			'<div class="bb-morestats">' +
				'<a class="bb-ms-username bb-header" href="' + baseUrl + 'soldier/{{username}}/stats/{{id}}/">{{username}}</a>' +
				'{{#each sections}}' +
				'<div class="bb-ms-{{section}} bb-ms-column">' +
					'{{#each rows}}' +
					'<div class="bb-ms-row">' +
						'<div class="bb-ms-row-name">{{name}}:</div>' +
						'<div class="bb-ms-row-value">{{value}}</div>' +
					'</div>' +
					'{{/each rows}}' +
				'</div>' +
				'{{/each sections}}' +
			'</div>'
	};


/* Styling */

// takes a CSS like object and inserts it as a stylesheet
// stylesheet: object in the form {'selector': {'prop-first': 'value', 'prop-second': 'value'}, '#next': ... etc}
function toCSS(stylesheet) {
	var	styleText = '',
		br = "\r\n";
	for (var selector in stylesheet) {
		styleText += selector + ' {' + br;
		
		var styles = stylesheet[selector];
		for (var property in styles) {
			var value = styles[property];
			styleText += '  ' + property + ': ' + value + ';' + br;
		}
		
		styleText += '}' + br + br;
	}
	// insert it
	var styleEl = document.createElement('style');
	styleEl.appendChild(document.createTextNode(styleText));
	document.body.appendChild(styleEl);
}

// 
function gradientCSS(colorFrom, colorTo) {
	var gradient =
		(j$.browser.mozilla) ? '-moz-linear-gradient(top, %from 0%,%to 100%)' :
		((j$.browser.webkit) ? '-webkit-linear-gradient(top, %from 0%,%to 100%)' :
		//((j$.browser.opera) ? '-o-linear-gradient(top, %from 0%,%to 100%)' : colorFrom));
		colorFrom);
	
	return gradient.replace('%from', colorFrom).replace('%to', colorTo);
}

var imageWrench =
	'data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///+fn5+bm5t7e3t3d3dzc3Nvb29ra2tnZ2djY2NfX19XV1dTU' +
	'1NPT09LS0tHR0dDQ0M/Pz87Ozs3NzczMzMvLy8nJycfHx8XFxcTExMPDw8DAwL6+vr29vbq6urS0tLKysrCwsKurq6ioqK' +
	'amppycnJaWlpWVlYiIiIeHh35+fnp6enh4eHR0dHJycm9vb2hoaGdnZ2ZmZmVlZWBgYF9fX15eXl1dXVZWVlRUVE5OTklJ' +
	'SUdHR0NDQ0FBQUBAQD4+Pj09PTw8PDk5OTg4ODc3NzY2Nv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' +
	'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEgALA' +
	'AAAAAQABAAAAeRgEiCg4JAKR8bIDSEjD8hAwQFHzKMhCoCCRgtPpWDRB8HBiSER5VHHQoJIkJIRS4vlTUTDhIQIy4lCiyM' +
	'NxQLExUWERAKHzyEOBYJwBMQEhMeMYQ2FArADxwoJio5yBUIwBAaMURCRtO+1xoznTsXB+qUnSsEEhXi8p0wBg0MGeydBA' +
	'U5oSEEwICChujogXBQIAA7';

// set up the stylesheet - long!
toCSS({
	'.bb-header': {
		'margin': '0 10px 4px 10px',
		'border-bottom': '1px solid #999',
		'padding': '8px 0px 4px 0',
		
		'color': '#308dbf',
		'font-size': '20px',
		'text-align': 'center'
	},
	
	'.bb-settings-container': {
		'display': 'none',
		'width': '100%',
		'height': '100%',
		'position': 'fixed',
		'left': '0px',
		'top': '0px',
		'z-index': 1000,
		
		'background-color': 'rgba(0, 0, 0, 0.5)'
	},
	
	'.bb-settings': {
		'margin-left': '-250px',
		'margin-top': '-100px',
		'width': '500px',
		'height': '200px',
		'position': 'fixed',
		'left': '50%',
		'top': '50%',
		'background-color': 'white',
		
		'-webkit-border-radius': '5px',
		'-moz-border-radius': '5px',
		'border-radius': '5px'
	},
	
	'.bb-settings-header': {
		'text-align': 'center'
	},
	
	'.bb-settings-button': {
		'border': '2px solid #5c5c5c',
		'width': '21px',
		'height': '21px',
		'padding': '2px',
		'position': 'fixed',
		'right': '10px',
		'top': '3px',
		'z-index': 200,
		
		'background-color': '#353535',
		'background-image': 'url(' + imageWrench + ')',
		'background-repeat': 'no-repeat',
		'background-position': 'center center',
		'cursor': 'pointer',
		
		'-webkit-border-radius': '25px',
		'-moz-border-radius': '25px',
		'border-radius': '25px'
	},
	
	'.bb-settings-button:hover': {
		'border-color': '#0072ff'
	},
	
	'.bb-settings-row': {
		'margin': '8px 10px',
		'padding': '4px 10px',
		
		'background-color': '#f5f5f5',
		'font-size': '15px',
		
		'-webkit-border-radius': '5px',
		'-moz-border-radius': '5px',
		'border-radius': '5px'
	},
	
	'.bb-settings-row:hover': {
		'background-color': '#e9e9e9',
		'cursor': 'pointer'
	},
	
	'.bb-settings-close': {
		'position': 'absolute',
		'right': '5px',
		'bottom': '5px',
		
		'color': '#308dbf',
		'cursor': 'pointer',
		'font-size': '12px',
		'font-weight': 'bold',
		'text-decoration': 'underline'
	},
	
	'.bb-selectables': {
		'float': 'left'
	},
	
	'.bb-slider': {
		'margin': '3px 16px 5px 16px',
		// column width minus twice the margin
		'width': (138 - (16 * 2)) + 'px',
		'height': '5px',
		
		'background-color': '#cfcfcf',
		'border-color': '#939393 #c0c0c0 #c0c0c0'
	},
	
	'.bb-slider .ui-slider-handle': {
		'height': '10px',
		'outline': 'none'
	},
	
	'.bb-slider .ui-slider-range': {
		'background-color': '#3b3b3b'
	},
	
	'.bb-ping-row': {
		'margin-top': '5px'
	},
	
	'.bb-ping-input': {
		'margin-left': '10px'
	},
	
	'.bb-players-header': {
		'height': '30px',
		'position': 'relative',
		
		'font-size': '10px',
		'font-weight': 'bold',
		'line-height': '12px',
		'text-align': 'center'
	},
	
	'.bb-players-header > div': {
		'position': 'absolute'
	},
	
	'.bb-players-scoreminute': {
		'width': '40px',
		'right': '75px'
	},
	
	'.bb-players-class': {
		'width': '40px',
		'right': '40px'
	},
	
	'.bb-player-row': {
		'padding': '3px 5px',
		'height': '26px',
		'position': 'relative',
		
		'cursor': 'pointer',
		'opacity': 0.5
	},
	
	'.bb-player-row.odd': {
		'background-color': '#e8e8e8'
	},
	
	'.bb-player-row.loaded': {
		'opacity': 1
	},
	
	'.bb-player-row:hover': {
		'background-color': '#d7d7d7'
	},
	
	'.bb-username': {
		'display': 'inline-block',
		'height': '26px',
		
		'color': '#308dbf',
		'cursor': 'pointer',
		'font-size': '12px',
		'font-weight': 'bold',
		'line-height': '26px',
		'vertical-align': 'top'
	},
	
	'.bb-avatar': {
		'margin-right': '10px',
		'border': '2px solid #4eb0e6',
		'width': '22px',
		'height': '22px',
		
		'-webkit-border-radius': '3px',
		'-moz-border-radius': '3px',
		'border-radius': '3px'
	},
	
	'.bb-player-extra': {
		'width': '103px',
		'height': '26px',
		
		'position': 'absolute',
		'right': '0px',
		'top': '2px'
	},
	
	'.bb-player-extra > span': {
		'display': 'inline-block'
	},
	
	'.bb-scoreminute': {
		'width': '38px',
		'position': 'relative',
		'top': '-5px',
		
		'color': '#353535',
		'font-size': '11px'
	},
	
	'.bb-kit': {
		'margin-right': '15px',
		'margin-bottom': '5px',
		'width': '12px'
	},
	
	'.bb-rank': {
		'width': '29px'
	},
	
	'.bb-morestats': {
		'display': 'none',
		'width': '400px',
		'height': '200px',
		'position': 'absolute',
		'z-index': 100,
		
		'background': gradientCSS('#fefefe', '#f4f4f4'),
		
		'-webkit-border-radius': '5px',
		'-moz-border-radius': '5px',
		'border-radius': '5px',
		
		'box-shadow': '0 0 8px rgba(0, 0, 0, 0.3)',
		'-moz-box-shadow': '0 0 8px rgba(0, 0, 0, 0.3)',
		'-webkit-box-shadow': '0 0 8px rgba(0, 0, 0, 0.3)'
	},
	
	'.bb-ms-username': {
		'display': 'block'
	},
	
	'.bb-ms-column': {
		'height': '170px',
		'float': 'left'
	},
	
	'.bb-ms-left': {
		'width': '160px',
		'padding': '0 15px 0 20px',
	},
	
	'.bb-ms-right': {
		'width': '160px',
		'padding': '0 20px 0 15px',
	},
	
	'.bb-ms-row': {
		'border-bottom': '1px solid #ededed',
		'height': '26px',
		'position': 'relative',
		
		'color': '#353535',
		'font-size': '12px',
		'font-weight': 'bold',
		'line-height': '26px'
	},
	
	'.bb-ms-row > div': {
		'width': '80px',
		'height': '26px',
		'float': 'left'
	},
	
	'.bb-ms-row img': {
		'position': 'absolute',
		'left': '-17px',
		'top': '6px'
	},
	
	// make the total score larger
	'.bb-ms-right > .bb-ms-row:last-child': {
		'font-size': '15px'
	},
	
	'.bb-ms-row-value': {
		'text-align': 'right'
	},
	
	// stop the server info following the scroll position
	'#serverguide-show-column': {
		'position': 'static !important'
	},
	
	'.serverguide-autobrowse-divider': {
		'display': 'none'
	}
});


/* Init Script */

var	content = $('#content'), reference,
	current = location.pathname,
	o
	// map of the pages modified by the script
	// the key is the init function to run, the value is what to look for in the URL
	pages = {
		'server': 'servers'
	};

function initPage() {
	var section;
	current = location.pathname;
	
	for (var initName in pages) {
		var search = pages[initName];
		if (current.indexOf(search) != -1) {
			init[initName]();
			break;
		}
	}
}

// monitor Battlelog for pages changes
setInterval(function() {
	if (content.children[0] && content.children[0] != reference) {
		reference = content.children[0];
		initPage();
	}
}, 500);

settingsInit();

}

// insert the script
var script = document.createElement('script');
script.textContent = '(' + improvedBattlelog.toString() + ')()';
document.body.appendChild(script);