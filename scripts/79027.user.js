// ==UserScript==
// @name           GC Friends Finds&Hides Count
// @namespace      tenrapid
// @version        1.1
// @author         tenrapid@gmx.de
// @include        http*://www.geocaching.com/my/myfriends.aspx
// @description    Provisionally adds finds & hides counts to the friend list
// ==/UserScript==


(function() {

var ENVIRONMENT = (function() {
	if (typeof chrome != "undefined") {
		return 'chrome';
	}
	else if (typeof GM_log != "undefined") {
		return 'greasemonkey';
	}
	else {
		return 'document';
	}
})();

var GCFriendsFindsHides = {
	VERSION: 1.1,
	USERSCRIPTS_EXTENSION_URL: 'http://userscripts.org/scripts/show/79027',
	USERSCRIPTS_META_URL: 'http://userscripts.org/scripts/source/79027.meta.js',
	USERSCRIPTS_SCRIPT_URL: 'http://userscripts.org/scripts/source/79027.user.js',
	CHROME_EXTENSION_URL: 'https://chrome.google.com/extensions/detail/mbcohjkjefegefnkkmnhmenoefeakjlc',
	SETTINGS_PREFIX: 'GCFriendsFindsHides',
	SETTINGS_PROPERTIES: {
	  'version': {type: 'number', defaultValue: 0},
	  'last_update_check': {type: 'number', defaultValue: 0},
	  'update_available': {type: 'bool', defaultValue: false},
	  'update_message_dismissed': {type: 'bool', defaultValue: false}
	},
	STYLE: {
		all: 
		'.gcfriendsfindshides {position: relative; overflow: hidden; width: 145px; height: 14px; margin: 2px 0 14px;}' + 
		'.gcfriendsfindshides img {position: absolute; top: -20px; left: -52px;}' + 
		'#gcfriendsfindshides-message {padding: 1em; margin:0 1em 1em; background: #fcf6ce;}' +
		'#gcfriendsfindshides-message img {display: block; width: 16px; height: 16px; float: right; cursor: pointer;}' +
		''
	},
	init: function() {
		this.checkForUpdate();
		
		var style = [this.STYLE.all, this.STYLE[ENVIRONMENT]].join(' ');
		this.appendStyle(style);

		this.processPage();
	},
	processPage: function() {
		X('//div[@class="FriendText"]').each(function(i) {
			var friend = X(this);
			var anchor = friend.find('.//a[contains(@href, "http://www.geocaching.com/profile/?guid=")]');
			var guid = anchor.attr('href').match('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}')[0];
			var name = anchor.text();
			var nameEncoded = encodeURIComponent(name).replace(/%20/g, '+');
			var source = 'http://img.geocaching.com/stats/img.aspx?uid=' + guid;
			X.createElement('div').attr('class', 'gcfriendsfindshides')
				.html(
					'<img src="' + source + '" usemap="#gcfriendsfindshides-map' + i + '">' +
					'<map name="gcfriendsfindshides-map' + i + '">' +
					'    <area shape="rect" coords="0,0,120,50" href="http://www.geocaching.com/seek/nearest.aspx?ul=' + nameEncoded + '" title="List caches found by ' + name + '">' +
					'    <area shape="rect" coords="125,0,200,50" href="http://www.geocaching.com/seek/nearest.aspx?u=' + nameEncoded + '" title="List caches hidden by ' + name + '">' +
					'</map>'
				)
				.insertBefore(friend.find('.//dl[@class="FriendList"]'));
		});
	},
	appendStyle: function(style) {
		var element = document.createElement('style');
		element.setAttribute('type', 'text/css');
		element.textContent = style;
		document.getElementsByTagName('head')[0].appendChild(element);
	},
	checkForUpdate: function() {
		if (ENVIRONMENT != 'greasemonkey') {
			return;
		}
		if (this.get('version') < this.VERSION) {
			this.set('version', this.VERSION);
			this.set('update_available', false);
		}
		var now = (new Date()).getTime();
		var lastCheck = this.get('last_update_check');
		if (lastCheck + (24 * 60 * 60 * 1000) > now) {
			if (this.get('update_available') && !this.get('update_message_dismissed')) {
				this.displayUpdateMessage();
			}
			return;
		}
		this.set('last_update_check', now);

		function onSuccess(data) {
			var version = data.match(/@version\s*([0-9\.]*)/);
			if (version && Number(version[1]) > this.VERSION) {
				this.set('update_available', true);
				this.set('update_message_dismissed', false);
				this.displayUpdateMessage();
			}
		}

		var request = {
			type: 'GET',
			url: this.USERSCRIPTS_META_URL,
			success: onSuccess,
			context: this
		};
		this.xmlHttpRequest(request);
	},
	displayUpdateMessage: function() {
		var message =
			'A new version of GC Friends Finds&Hides Count is available. <a href="' + this.USERSCRIPTS_SCRIPT_URL + '">Install now</a>' +
			' or visit <a href="' + this.USERSCRIPTS_EXTENSION_URL + '">' + this.USERSCRIPTS_EXTENSION_URL + '</a> for more information.';
		var that = this;
		X.createElement('div').attr('id', 'gcfriendsfindshides-message')
			.html('<img src="http://www.geocaching.com/images/silk/cross.png" title="Dismiss">' + message)
			.prependTo('//body')
			.find('.//img').bind('click', function() {
				X('//div[@id="gcfriendsfindshides-message"]').remove();
				that.set('update_message_dismissed', true);
			});
	},
	xmlHttpRequest : function(request) {
		switch (ENVIRONMENT) {
			case 'chrome':
				chrome.extension.sendRequest(request, function(response) {
					var context = request.context || request;
					if (response.type == 'success' && request.success) {
						request.success.call(context, response.data, response.textStatus);
					} 
					else if (response.type == 'error' && request.error) {
						request.error.call(context, response.xmlHttpRequest, response.textStatus);
					}
				});
				break;
			case 'greasemonkey':
				GM_xmlhttpRequest({
					method: request.type,
					url: request.url,
					onload: function(response) {
						request.success && request.success.call(request.context || response, response.responseText, response.statusText);
					},
					onError: function(response) {
						request.error && request.error.call(request.context || response, response, response.statusText);
					}
				});
				break;
		}
	},
	get: function(key) {
		var property = this.SETTINGS_PROPERTIES[key];
		if (!property) {
			throw(this.SETTINGS_PREFIX + ': Property "' + key + '" is undefined.');
		}
		var value = this._get(key, property);
		return value;
	},
	set: function(key, value) {
		var property = this.SETTINGS_PROPERTIES[key];
		if (!property) {
			throw(this.SETTINGS_PREFIX + ': Property "' + key + '" is undefined.');
		}
		this._set(key, value);
	},
	_get: function(key, property) {
		var value;
		switch (ENVIRONMENT) {
			case 'chrome':
				value = localStorage.getItem(this.SETTINGS_PREFIX + '_' + key);
				break;
			case 'greasemonkey':
				value = GM_getValue(key);
				break;
			case 'document':
				value = (typeof localStorage != 'undefined') ? localStorage.getItem(this.SETTINGS_PREFIX + '_' + key) : null;
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
				localStorage.setItem(this.SETTINGS_PREFIX + '_' + key, value);
				break;
			case 'greasemonkey':
				value = GM_setValue(key, String(value));
				break;
			case 'document':
				value = (typeof localStorage != 'undefined') && localStorage.setItem(this.SETTINGS_PREFIX + '_' + key, value);
				break;
		}
	}
};


var X = function(xpath, context) {
	var result; 
	if (typeof xpath === 'string') {
		context = context || document;
		var xpathResult = document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		
		result = [];
		for (var i = 0; i < xpathResult.snapshotLength; i++) {
			result.push(xpathResult.snapshotItem(i));
		}
		X.extend(result, X.methods);
	}
	else if (typeof xpath === 'object' && typeof xpath.length === 'undefined') {
		result = [xpath];
		X.extend(result, X.methods);
	}
	else {
		result = xpath;
	}
	return result;
};
X.extend = function(a, b) {
	for (var i in b) {
		a[i] = b[i];
	}
	return a;
};
X.methods = {
	find: function(xpath) {
		if (this.length) {
			return X(xpath, this[0]);
		}
		else {
			return X.extend([], X.methods);
		}
	},
	attr: function() {
		if (!this.length) {
			return;
		}
		switch (arguments.length) {
			case 1:
				return this[0].getAttribute(arguments[0]);
			case 2:
				this[0].setAttribute(arguments[0], arguments[1]);
				return this;
		}
	},
	text: function() {
		if (!this.length) {
			return;
		}
		switch (arguments.length) {
			case 0:
				return this[0].textContent;
			case 1:
				this[0].textContent = arguments[0];
				return this;
		}
	},
	html: function() {
		if (!this.length) {
			return;
		}
		switch (arguments.length) {
			case 0:
				return this[0].innerHTML;
			case 1:
				this[0].innerHTML = arguments[0];
				return this;
		}
	},
	remove: function() {
		for (var i = 0; i < this.length; i++) {
			if (this[i].parentNode) {
				this[i].parentNode.removeChild(this[i]);
			}
		}
		return this;
	},
	insertBefore: function(xpath) {
		xpath = X(xpath);
		if (!this.length || !xpath.length) {
			return this;
		}
		for (var i = 0; i < xpath.length; i++) {
			if (xpath[i].parentNode) {
				for (var j = 0; j < this.length; j++) {
					xpath[i].parentNode.insertBefore(this[j], xpath[i]);
				}
			}
		}
		return this;
	},
	before: function(xpath) {
		X(xpath).insertBefore(this);
		return this;
	},
	appendTo: function(xpath) {
		xpath = X(xpath);
		if (!this.length || !xpath.length) {
			return this;
		}
		for (var i = 0; i < xpath.length; i++) {
			for (var j = 0; j < this.length; j++) {
				xpath[i].appendChild(this[j]);
			}
		}
		return this;
	},
	append: function(xpath) {
		X(xpath).appendTo(this);
		return this;
	},
	prependTo: function(xpath) {
		xpath = X(xpath);
		if (!this.length || !xpath.length) {
			return this;
		}
		for (var i = 0; i < xpath.length; i++) {
			for (var j = 0; j < this.length; j++) {
				xpath[i].insertBefore(this[j], xpath[i].firstChild);
			}
		}
		return this;
	},
	prepend: function(xpath) {
		X(xpath).prependTo(this);
		return this;
	},
	bind: function(event, handler) {
		for (var i = 0; i < this.length; i++) {
			this[i].addEventListener(event, handler, false);
		}
		return this;
	},
	each: function(f) {
		for (var i = 0; i < this.length; i++) {
			f.call(this[i], i, this[i]);
		}
		return this;
	}
};
X.createElement = function(element) {
	var node = document.createElement(element);
	return X(node);
};


return GCFriendsFindsHides;
})().init();