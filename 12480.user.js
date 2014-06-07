// ==UserScript==
// @name            Deviant Statistics
// @namespace       falexx.deviantart.com
// @description     Displays additional statistics about a Deviant.
// @version         7.1
// @scriptsource    http://userscripts.org/scripts/show/12480
// @include         http://*.deviantart.com/
// @include         http://*.deviantart.com/?*
// ==/UserScript==

/**
 * COPYRIGHT STUFF GOES HERE
 * If you have done some improvements to this script, please let me know :)
 *
 *
 * HISTORY
 * visit http://userscripts.org/scripts/show/12480
 */
var DAS = {
	Id: '12480',
	ScriptName: 'Deviant Statistics',
	Version: '7.1',
	
	
	init: function() {
		Cache.startTime = new Date().getTime();
		_log('init');
		
		Cache.lastChecked = GM_getValue('lastChecked', 0);
		Cache.remoteVersion = GM_getValue('remoteVersion', 0);
		
		UI.addStyles();
		
		Cache.displayDiv = $X(Config.displayDiv)[0];
		Cache.previewDiv = $X(Config.previewDiv)[0];
		
		if (typeof(Cache.displayDiv) !== 'undefined' && typeof(Cache.previewDiv) !== 'undefined' ) {
			_log('found stats display');
			Cache.previewText = Cache.previewDiv.innerHTML;
			Cache.previewDiv.innerHTML = 'Loading...';
			this._get(Config.statsUrl, this.parseStatsPage);
		}
		else {
			_log('exiting - no display found');
		}
	},
	
	checkNewerVersion: function() {
		_log('checkNewerVersion');
		
		_log('r/l version: ' + Cache.remoteVersion + '/' + this.Version);
		
		if (Cache.lastChecked + 60 * 60 * 24 < this._currentTime()) {
			this._get(Config.metaUrl, this.compareVersions);
		}
		else 
			if (Cache.remoteVersion > this.Version) {
				UI.showUpdateBar();
			}
	},
	
	compareVersions: function(responseText) {
		_log('compareVersions');
		
		GM_setValue('lastChecked', DAS._currentTime());
		
		var remoteVersion = responseText.match(/\/\/\s*@version\s*(\d.*)/);
		Cache.remoteVersion = (null === remoteVersion) ? 0 : remoteVersion[1];
		GM_setValue('remoteVersion', Cache.remoteVersion);
		
		var releaseDate = responseText.match(/\/\/\s*@uso:timestamp\s*(.*)/);
		Cache.releaseDate = (null === releaseDate) ? 0 : new Date(releaseDate[1]);
		
		if (Cache.remoteVersion > DAS.Version) {
			UI.showUpdateBar();
		}
	},
	
	parseStatsPage: function(responseText) {
		_log('parseStatsPage');
		
		var jsonLine = responseText.match(/\s*deviantART\.pageData={(.*)};\s*/)[1];
		jsonLine = '{' + jsonLine.replace(/\\'|\\\\"/g, '\'') + '}';
		
		var data = JSON.parse(jsonLine);
		
		if (typeof(data.userstats) === 'undefined') {
			if (window.location.host.substring(0, window.location.host.indexOf('.')) == unsafeWindow.deviantART.deviant.username) {
				Cache.displayDiv.parentNode.appendChild($E('div', {
					className: 'pbox pppbox'
				}, ['Make sure you checked the "Accept third-party cookies" in your Firefox Preferences => Privacy => Cookies or added an exception for "deviantart.com" on the right side of the preference window!']));
			}
			if ($X(Config.bannedDiv)[0].innerHTML.indexOf('!') >= 0) {
				Cache.displayDiv.parentNode.appendChild($E('div', {
					className: 'pbox pppbox'
				}, ['No additional statistics, because this Deviant got banned.']));
			}
			else {
				Cache.displayDiv.parentNode.appendChild($E('div', {
					className: 'pbox pppbox'
				}, ['This user doesn\'t allow you to access the statistics.']));
			}
			
			Cache.previewDiv.innerHTML = Cache.previewText;
			return;
		}
		
		_log('Loading statistics for ' + data.userstats.username);
		
		Cache.username = data.userstats.username;
		Cache.total.given.comments = data.userstats.comments;
		Cache.total.given.favourites = data.userstats.favourites;
		Cache.total.given.watches = data.userstats.friends;
		
		Cache.total.received.watches = data.userstats.friendswatching;
		
		Cache.total.pageviews = data.userstats.pageviews;
		Cache.total.deviations = data.userstats.deviations;
		Cache.total.scraps = data.userstats.scraps;
		Cache.total.shouts = data.userstats.shouts;
		Cache.total.forumposts = data.userstats.forum_posts;
		
		var cat = [];
		var caty = [];
		for (i in data.devstats) {
			var D = data.devstats[i];
			
			Cache.total.received.comments += D.comments;
			Cache.total.received.favourites += D.favourites;
			Cache.total.views += D.views;
			
			if (null === Cache.top.fullviews || D.fullviews > Cache.top.fullviews.fullviews) {
				Cache.top.fullviews = D;
			}
			if (null === Cache.top.views || D.views > Cache.top.views.views) {
				Cache.top.views = D;
			}
			if (null === Cache.top.favourites || D.favourites > Cache.top.favourites.favourites) {
				Cache.top.favourites = D;
			}
			if (null === Cache.top.comments || D.comments > Cache.top.comments.comments) {
				Cache.top.comments = D;
			}
			
			
			D.cat = D.category.split('/')[0];
			
			cat[D.cat] = (!cat[D.cat]) ? 1 : cat[D.cat] + 1;
			if (cat[D.cat] > Cache.top.cat.count) {
				Cache.top.cat.name = D.cat;
				Cache.top.cat.count = cat[D.cat];
			}
			
			if (!caty[D.category]) {
				Cache.total.categories++;
			}
			
			caty[D.category] = (!caty[D.category]) ? 1 : caty[D.category] + 1;
			if (caty[D.category] > Cache.top.caty.count) {
				Cache.top.caty.name = D.category;
				Cache.top.caty.count = caty[D.category];
			}
		}
		
		Cache.daysSinceJoined = Math.floor((new Date().getTime() - new Date(data.userstats.since).getTime()) / 1000 / 60 / 60 / 24);
		
		Cache.average.day.given.comments = Cache.total.given.comments / Cache.daysSinceJoined;
		Cache.average.day.given.favourites = Cache.total.given.favourites / Cache.daysSinceJoined;
		Cache.average.day.given.watches = Cache.total.given.watches / Cache.daysSinceJoined;
		Cache.average.day.received.comments = Cache.total.received.comments / Cache.daysSinceJoined;
		Cache.average.day.received.favourites = Cache.total.received.favourites / Cache.daysSinceJoined;
		Cache.average.day.received.watches = Cache.total.received.watches / Cache.daysSinceJoined;
		Cache.average.day.uploads = (Cache.total.deviations + Cache.total.scraps) / Cache.daysSinceJoined;
		Cache.average.day.pageviews = Cache.total.pageviews / Cache.daysSinceJoined;
		Cache.average.day.views = Cache.total.views / Cache.daysSinceJoined;
		
		Cache.average.deviation.comments = Cache.total.received.comments / (Cache.total.deviations + Cache.total.scraps);
		Cache.average.deviation.favourites = Cache.total.received.favourites / (Cache.total.deviations + Cache.total.scraps);
		Cache.average.deviation.views = Cache.total.views / (Cache.total.deviations + Cache.total.scraps);
	
		UI.appendStatistics();
	},
	
	_get: function(url, cb) {
		_log('_get: ' + url);
		GM_xmlhttpRequest({
			method: 'GET',
			url: url,
			headers: {
				'User-Agent': 'Firefox / GreaseMonkey / ' + DAS.ScriptName
			},
			onload: function(xhr) {
				cb(xhr.responseText);
			}
		});
	},
	
	_currentTime: function() {
		return Math.round(new Date().getTime() / 1000);
	}
};

UI = {
	showUpdateBar: function() {
		_log('showUpdateBar');
		
		var text = '<p><strong>' + DAS.ScriptName + '</strong> update available v' + Cache.remoteVersion + ' (current: v' + DAS.Version + ') - <a href="' + Config.updateUrl + '">Update</a> - <a href="' + Config.homeUrl + '">Homepage</a></p>';
		
		document.body.appendChild($E('div', {
			id: 'devstatsupdatebar'
		}, [text]));
	},
	
	appendStatistics: function() {
		_log('appendStatistics');
		
		var html = '';
		
		html += this.genInfo('Deviation#', Cache.total.deviations);
		html += this.genInfo('Scrap#', Cache.total.scraps);
		html += this.genInfo('Pageview#', Cache.total.pageviews);
		html += this.genInfo('View#', Cache.total.views);
		html += this.genInfo('Shout#', Cache.total.shouts);
		html += this.genInfo('Forum Post#', Cache.total.forumposts);
		html += this.genInfo('Different Categories', Cache.total.categories);
		html += this.genSpacer();
		html += this.genInfo('Comment# given', Cache.total.given.comments);
		html += this.genInfo('Comment# received', Cache.total.received.comments);
		html += this.genInfo('Favourite# given', Cache.total.given.favourites);
		html += this.genInfo('Favourite# received', Cache.total.received.favourites);
		html += this.genInfo('Friend#', Cache.total.given.watches);
		html += this.genInfo('Watcher#', Cache.total.received.watches);
		html += this.genSpacer();
		html += this.genInfo('Comment# given per day', Cache.average.day.given.comments);
		html += this.genInfo('Comment# received per day', Cache.average.day.received.comments);
		html += this.genInfo('Favourite# given per day', Cache.average.day.given.favourites);
		html += this.genInfo('Favourite# received per day', Cache.average.day.received.favourites);
		html += this.genInfo('Friend# added per day', Cache.average.day.given.watches);
		html += this.genInfo('Watche# received per day', Cache.average.day.received.watches);
		html += this.genSpacer();
		html += this.genInfo('Submission# per day', Cache.average.day.uploads);
		html += this.genInfo('Pageview# per day', Cache.average.day.pageviews);
		html += this.genInfo('View# per day', Cache.average.day.views);
		html += this.genSpacer();
		html += this.genInfo('Comment# received per Deviation', Cache.average.deviation.comments);
		html += this.genInfo('Favourite# received per Deviation', Cache.average.deviation.favourites);
		html += this.genInfo('View# received per Deviation', Cache.average.deviation.views);
		html += this.genSpacer();
		html += this.genUrl('Most viewed Deviation', Cache.top.views.views, Cache.top.views.id, Cache.top.views.title);
		html += this.genUrl('Most fullviewed Deviation', Cache.top.fullviews.fullviews, Cache.top.fullviews.id, Cache.top.fullviews.title);
		html += this.genUrl('Most favoured Deviation', Cache.top.favourites.favourites, Cache.top.favourites.id, Cache.top.favourites.title);
		html += this.genUrl('Most commented Deviation', Cache.top.comments.comments, Cache.top.comments.id, Cache.top.comments.title);
		html += this.genSpacer();
		html += this.genCat('Most used gallery', Cache.top.cat.count, Cache.top.cat.name);
		html += this.genCat('Most used category', Cache.top.caty.count, Cache.top.caty.name);
		
		Cache.displayDiv.innerHTML = html;
		Cache.previewDiv.innerHTML = Cache.previewText;
	},
	
	genInfo: function(txt, num) {
		return '<strong>' + this.comma(num) + '</strong> ' + ((num == 1) ? txt.replace(/#/, '') : txt.replace(/#/, 's')) + '<br />';
	},
	genUrl: function(txt, num, url, urlTxt) {
		return txt + ': <a href="http://www.deviantart.com/deviation/' + url + '/" class="a">' + urlTxt + '</a> (<strong>' + this.comma(num) + '</strong>)<br />';
	},
	genCat: function(txt, num, cat) {
		return txt + ': <a href="http://' + Cache.username + '.deviantart.com/gallery/#_browse/' + cat + '" class="a">' + cat.replace(/\//g, ' > ') + '</a> (<strong>' + this.comma(num) + ((num == 1) ? ' Deviation' : ' Deviations') + '</strong>)<br />';
	},
	genSpacer: function() {
		return '<hr />';
	},
	comma: function(flo) {
		if (!flo) {
			return 'none';
		}
		
		flo = new String(Math.floor(flo * 100) / 100);
		var integer = flo.split('.')[0];
		
		
		if (integer.length > 3) {
			var start = integer.length - 3;
			return this.comma(integer.substring(0, start)) + ',' + integer.substring(start);
		}
		else {
			if (flo.split('.').length > 1) {
				return integer + '.' + flo.split('.')[1];
			}
			else {
				return integer;
			}
		}
	},
	
	addStyles: function() {
		_log('addStyles');
		
		GM_addStyle([
			'body div.popup2-gruser-stats { height: auto !important; min-width:380px; white-space:nowrap; width:auto; }',
			'#devstatsupdatebar { -moz-border-radius:5px 5px 5px 5px; background-color:#DAE4D9; border:1px solid #A6B2A6; font-family:Helvetica; left:250px; line-height:2em; position:absolute; text-align:center; top:45px; width:500px; }',
			'#devstatsupdatebar p { margin: 0px; }'
		].join('\n'));
	}
};

Cache = {
	startTime: null,
	lastChecked: null,
	remoteVersion: null,
	releaseDate: null,
	displayDiv: null,
	previewDiv: null,
	previewText: null,
	
	top: {
		fullviews: null,
		views: null,
		favourites: null,
		comments: null,
		cat: {
			name: '',
			count: 0
		},
		caty: {
			name: '',
			count: 0
		}
	},
	total: {
		given: {
			comments: 0,
			favourites: 0,
			watches: 0
		},
		received: {
			comments: 0,
			favourites: 0,
			watches: 0
		},
		categories: 0,
		pageviews: 0,
		views: 0,
		deviations: 0,
		scraps: 0,
		shouts: 0,
		forumposts: 0
	},
	daysSinceJoined: 0,
	username: null,
	average: {
		day: {
			given: {
				comments: 0,
				favourites: 0,
				watches: 0
			},
			received: {
				comments: 0,
				favourites: 0,
				watches: 0
			},
			uploads: 0,
			pageviews: 0,
			views: 0
		},
		deviation: {
			comments: 0,
			favourites: 0,
			views: 0
		}
	}
};

Config = {
	homeUrl: 'http://userscripts.org/scripts/show/' + DAS.Id,
	updateUrl: 'http://userscripts.org/scripts/source/' + DAS.Id + '.user.js',
	metaUrl: 'http://userscripts.org/scripts/source/' + DAS.Id + '.meta.js',
	statsUrl: 'http://' + window.location.host + '/stats/gallery/',
	previewDiv: '//div[@class="blues-bar-ctrl"]/span[@class="bb"]/a/span[@class="tight"]',
	displayDiv: '//div[@id="super-secret-stats"]/div[@class="gr-body"]/div/div[@class="pbox pppbox"]',
	bannedDiv: '//div[@class="gruserbadge"]/h1',
	debug: false
};

/**
 * log to console if Config.debug is true
 */
function _log(text) {
	if (Config.debug) {
		GM_log((new Date().getTime() - Cache.startTime) + 'ms | ' + text);
	}
}

function $X(xpath, root) {
	var got = document.evaluate(xpath, root || document, null, null, null);
	var result = [];
	while ((next = got.iterateNext()) !== null) {
		result.push(next);
	}
	return result;
}

function $E(tag, attributes, children) {
	var e = document.createElement(tag);
	
	function applyObj(to, obj) {
		for (prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (typeof(obj[prop]) === 'object') {
					applyObj(to[prop], obj[prop]);
				}
				else {
					to[prop] = obj[prop];
				}
			}
		}
	}
	
	applyObj(e, attributes);
	for (var c in children) {
		if (typeof(children[c]) === 'string') {
			e.innerHTML += children[c];
		}
		else {
			e.appendChild(children[c]);
		}
	}
	return e;
}

DAS.init();
DAS.checkNewerVersion();
