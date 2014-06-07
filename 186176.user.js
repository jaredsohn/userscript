// ==UserScript==
// @name        Coup'd Bungie Chrome Edition
// @description Personalize your bungie.net experience.
// @namespace   http://iggyhopper.strangled.net/
// @include     http://*.bungie.net/*
// @include     https://*.bungie.net/*
// @version     6.2.3
// @resource    SPECTRUM_CSS http://iggyhopper.strangled.net/gm/cdb/resources/spectrum.css
// @require     http://iggyhopper.strangled.net/gm/cdb/resources/spectrum.js
// ==/UserScript==
var XT = (function()
{
    // package
    var api = {};
    
    // private
    var prefix = '';
    
    // public
    api.get = function(name, defval)
    {
        var result = JSON.parse(localStorage.getItem(prefix + name));
        return result !== null ? result : defval;
    };
    
    api.getAll = function(asObject)
    {
        var result = asObject ? {} : [];
        for (var key in localStorage)
            if (key.substr(0, prefix.length) === prefix)
                if (asObject)
                    result[key] = api.get(key.substr(prefix.length));
                else
                    result.push({key: key, value: api.get(key.substr(prefix.length))});
        return result;
    };
    
    api.init = function(name)
    {
        prefix = name + '.';
    };
    
    api.remove = function(name)
    {
        localStorage.removeItem(prefix + name);
    };
    
    api.set = function(name, value)
    {
        localStorage.setItem(prefix + name, JSON.stringify(value));
    };
    
    return api;
})();
var Locache = (function()
{
	// package
    var api = {};
    
    // private
	
	
    // public
	
	api.get = function(key, threshold, callback)
	{
		// Retrieve the cache from localStorage, default to null.
		var cache = XT.get(key, null);
		
		// Does the cache exist?
		if (cache)
		{
			// Always send it out, because we need to have a fallback.
			callback(cache);
			
			// Does it still taste good?
			if (Date.now() - cache.time > threshold)
			{
				// It's stale.
				callback(null);
			}
		}
		else
		{
			// It doesn't exist.
			callback(null);
		}
	};
	
	api.update = function(key, subkeys, thresholds, callback)
	{
		// Get current time for timestamping purposes.
		var now = Date.now();
		
		// Retrieve the cache from localStorage, default to object.
		var cache = XT.get(key, null);
		
		if (cache === null) {
			log('Locache: Cache is empty.');
			cache = {};
		}
		
		// Create the cache status object.
		var results = {cached: {}, expired: {}, uncached: {}};
		
		// Main process determines subkey cache status.
		for (var subkeyKey in subkeys)
		{
			var subkeyValue = subkeys[subkeyKey];
			var cacheValue = cache[subkeyValue];
			// Does it exist? Have we chacked before?
			// TODO: Clean A
			if (cacheValue && mSign(cacheValue.time) === 1)
			{
				// Is it fresh?
				if (now - cacheValue.time < thresholds.expired)
				{
					// It's fresh.
					results.cached[subkeyValue] = cacheValue;
				}
				else
				{
					// It's stale.
					results.expired[subkeyValue] = cacheValue;
				}
			}
			else
			{
				cacheValue = cacheValue || {time: 0};
				
				// Do we need to trigger a request for new data on a non-existent subkey?
				// TODO: Clean A
				if (now - +cacheValue.time > thresholds.uncached)
				{
					results.uncached[subkeyValue] = {time: -now};
				}
			}
		}
		
		// Send results, and wait for the update callback.
		callback(results, function(things)
		{
			log('Loback:', things);
			var now = Date.now();
			for (var thing in things)
			{
				var data = things[thing];
				data.time = data.time < 0 ? -now : now;
				cache[thing] = data;
			}
			XT.set(key, cache);
		});
	};
	
	return api;
})();
var Coup = (function()
{
	// package
    var api = {};
    
    // private
	var $;
	
    var urls =
	{
		server: '',
		get: '',
		set: ''
	};
    
    // public
	api.get = function(userIds, callback, errback)
    {
		if (userIds.length === 0) {
			log('Coup Request: No users requested.');
			return;
		}
		log('Coup Request:', userIds);
		$.getJSON(urls.server + urls.get + '?ver=' + VERSION + '&uids=' + userIds.join(','), callback).fail(errback);
    };
	
	api.getSingle = function(userId, callback, errback)
	{
		log(urls, userId);
		$.getJSON(urls.server + urls.get + '?ver=' + VERSION + '&uids=' + userId, callback, errback);
	};
	
	api.init = function(_$, urlObj)
	{
		$ = _$;
		urls.server = urlObj.server;
		urls.get = urlObj.get;
		urls.set = urlObj.set;
	};
	
	api.set = function()
	{
		
	};
	
	api.idSelector = 'article > div > a > img';
	api.idAction = 'data';
	api.idAttr = 'membershipid';
	
//Fridge Gnome Edit 2, Replace all 'color' with 'url'
	api.mods =
	[
		{
			name: 'Avatar',
			type:'url',
			info: '',
			key: 'avatar',
			selector: 'a.avatar > img',
			action: 'attr',
			args: ['src']
		},
		{
			name: 'Name Color',
			type:'url',
			info: '',
			key: 'nameColor',
			selector: 'h1 > a',
			fn: function(value)
			{
				this.style.setProperty('color', value, 'important');
				this.classList.add('nodark');
			}
		},
		{
			name: 'Title Text',
			type: 'text',
			info: '',
			key: 'title',
			selector: 'div.content a[data-membershipid]',
			fn: function(value)
			{
				
			}
		},
		{
			name: 'Title Color',
			type: 'url',
			info: '',
			key: 'titleColor',
			selector: 'div.content a[data-membershipid]',
			fn: function(value)
			{
				
			}
		},
		{
			name: 'Title Background Color',
			type: 'url',
			info: '',
			key: 'titleBgColor',
			selector: 'div.content a[data-membershipid]',
			fn: function(value)
			{
				
			}
		},
		{
			name: 'Title Border Color',
			type: 'url',
			info: '',
			key: 'titleBdColor',
			selector: 'div.content a[data-membershipid]',
			fn: function(value)
			{
				
			}
		}
	];
	
	api.groupMods =
	[
		
	];
	
	api.pageModMemory = {};
	
	api.pageMods =
	[
		{
			name: 'User Titles',
			key: 'titles',
			// TODO: Clean up.
			fn: function(data, selfKey)
			{
				if (!data || !data.users) return;
				
				// Do not stack styles.
				this.appliedUsers = this.appliedUsers || {};
				this.runOnce = this.runOnce || false;
				
				
				var users = data.users;
				// TODO: Remove duplicate users when appending styles.
				var styleString = [];
				if (this.runOnce === false) {
					styleString.push('h1 > a[data-membershipid]:after {',
					'display: inline-block !important;',
					'font-family: "OpenSansSemiBold", Arial, sans-serif !important;',
					'font-size: 11px !important;',
					'line-height: 14px !important;',
					'margin-left: 5px !important;',
					'padding: 0 3px 0 2px !important;',
					'position: relative !important;',
					'top: -1px !important;',
					'vertical-align: middle !important;',
					'}');
					this.runOnce = true;
				}
				$(document.body).append($('<style type="text/css"></style>').text(htmlDecode(styleString.join(''))));
				
				for (var userId in users) {
					if (!this.appliedUsers[userId]) {
						var userData = users[userId];
						var $userStyle = $('<style type="text/css"/>')
							.text('h1 > a[data-membershipid="' + userId + '"]:after { }')
							.appendTo(document.body);
						var userRule = $userStyle[0].sheet.cssRules[0];
						userRule.style.backgroundColor = userData.titleBgColor;
						userRule.style.border = '1px solid ' + userData.titleBdColor;
						userRule.style.color = userData.titleColor;
						if (userData.title) {
							userRule.style.content = '"' + userData.title + '"';
						}
						this.appliedUsers[userId] = true;
					}
				}
			}
		}
	];
	
	api.options =
	[
		{
			name: 'Disable Group Styling',
            type: 'option',
            info: '',
            key: 'disableGroupStyling',
            defval: false
		},
		{
			name: 'Group Style Banlist',
			type: 'list',
			info: '',
			key: 'groupStyleBanlist',
			size: 3,
			init: function($select) {
				log($select);
				var select = $select.get(0);
				var groups = unsafeWindow.viewModels.myFollowedGroupsModel();
				for (var i = 0, ic = groups.length; i < ic; ++i) {
					var group = groups[i];
					var id = group.following.identity;
					var name = group.detail.displayName;
					log(id, name);
					select.add($('<option/>').text(name).val(id)[0], null);
				}
				return $select;
			},
			add: function() {
				var $select = $('#cdb_groupStyleBanlist');
				alert('Not working!');
			},
			remove: function() {
				var $select = $('#cdb_groupStyleBanlist');
			}
		},
		{
			name: 'Clear Local Data',
			type: 'action',
			info: '',
			key: 'clearLocalData',
			text: 'Clear',
			fn: function() {
				XT.getAll().forEach(function(e) { XT.remove(e.key); });
				confirm('Are you sure you want to clear local data?')
					&& alert('Local data has been cleared.');
			}
		}
	];
	
	return api;
})();
const ERROR_CACHE_FLUSH_THRESHOLD         = 1000 * 60 * 60 * 3;       // 03h
const GROUP_CACHE_FLUSH_THRESHOLD         = 1000 * 60 * 60 * 24 * 10; // 10d
const USER_CACHE_FLUSH_THRESHOLD_EXPIRED  = 1000 * 60 * 15;           // 15m
const USER_CACHE_FLUSH_THRESHOLD_UNCACHED = 1000 * 60 * 60;           // 01h
const USER_CACHE_FLUSH_THRESHOLD_SET      = {expired: USER_CACHE_FLUSH_THRESHOLD_EXPIRED, uncached: USER_CACHE_FLUSH_THRESHOLD_UNCACHED};
const SERVER_URL                          = 'http://iggyhopper.us.to:8080/gm/cdb/app/';
var VERSION                               = 'pub';

try {

var pop = Array.prototype.pop;
var push = Array.prototype.push;
var slice = Array.prototype.slice;
var toString = Object.prototype.toString;
var partial = function(fn) {
    var args = slice.call(arguments, 1);
    return function() {
        return fn.apply(null, args.concat(slice.call(arguments)));
    };
};
var wrap = function(fn, wrapper) {
    return function() {
        var args = [fn];
        push.apply(args, arguments);
        return wrapper.apply(this, args);
    };
};
var patch = function(fn, patcher) {
	return function() {
		return fn.apply(null, arguments).done(patcher);
	};
};
var mapProperty = function(array, property, sub, unique) {
	var result = isObject(property) ? {} : [];
	if (isObject(property)) {
		for (var i in property) {
			result[i] = [];
			for (var j = 0, c = array.length; j < c; ++j) {
				result[i].push(array[j][property[i]]);
			}
		}
	} else {
		if (sub) {
			if (unique) {
				var u = {};
				for (var i = 0, c = array.length; i < c; ++i) {
					u[array[i][property] && array[i][property][sub]] = true;
				}
				for (var i in u) {
					result.push(i);
				}
			} else {
				for (var i = 0, c = array.length; i < c; ++i) {
					result.push(array[i][property] && array[i][property][sub]);
				}
			}
		} else {
			for (var i = 0, c = array.length; i < c; ++i) {
				result.push(array[i][property]);
			}
		}
	}
	return result;
};
var isArray = function(obj) {
	return toString.call(obj) === '[object Array]';
};
var isObject = function(obj) {
	return obj === Object(obj);
};

if (window.chrome || window.opera)
{
    // This is an unsafeWindow hack for Chrome.
	unsafeWindow = (function()
    {
        var e = document.createElement('p');
        e.setAttribute('onclick', 'return window;');
        return e.onclick();
    })();
    
    // Bring in variables because Opera doesn't do it.
    console      = unsafeWindow.console;
    localStorage = unsafeWindow.localStorage;
}

var logt = Date.now();
var logf = partial(console.log.bind(console), 'cdb:');
var log = function() {
	var td = Date.now() - logt;
	var m = td / 60000 >> 0 % 60;
	var s = ('0' + (td / 1000 >> 0 % 60)).slice(-2);
	var ms = (td / 1000 % 1).toFixed(4).substr(2, 4);
	var t = [['[', m, ':', s, '.', ms, ']'].join('')];
	push.apply(t, arguments);
	logf.apply(null, t);
};

var jlog = function(arg) {
	logf(JSON.stringify(arg));
};

var dbg = {
    on: false,
    msgs: ['Coup d\'Bungie Log']
};

log('Script loaded.');

// Pass a function f to be called when conditions are met.
(function(f) {
	
    var start = Date.now();
    var t = setInterval(function() {
        if (unsafeWindow.$('.spinner').length < 4 || ~unsafeWindow.location.href.search(/\/user\/edit/i))
        {
			clearInterval(t);
            f(start);
        }
    }, 500);
})
// f
(function(tstart) {
	log('Script started.');
    var fstart = Date.now();
    var $ = unsafeWindow.$;
	var bnet = unsafeWindow.bungieNetPlatform;
    var url = unsafeWindow.location.href;
    var myUserId = unsafeWindow.myID_cookie;
    var isSignedIn = myUserId !== 0;
	
	// Fix weird JSON error, I don't know, WTF.
	$.ajaxSetup({mimeType: "text/plain"});
    
    // Attach event listener for debugging log.
    window.addEventListener('keydown', function(ke) {
        // Exclude events where the active element is in a text field.
        if (ke.which === 191 && ke.shiftKey
                             && ke.target.localName !== 'input'
                             && ke.target.localName !== 'textarea')
            uAlert(dbg.msgs.join('<br/>'));
    }, false);
    
    // Initialize localStorage wrapper library with namespace "cdb".
    XT.init('cdb');
	
	// Initialize server API-thing with URLs.
	Coup.init($, {server: SERVER_URL, get: 'get', set: 'set'});
    
    // Fix page titles.
    if (~url.search(/\/forum\/topics/i))
        document.title += ' : ' + $('#searchedTag, #searchedTag > span').last().text();
    else if (~url.search(/\/view\/profile/i))
        document.title += ' : ' + $('h1.displayName > a').text();
    document.title = document.title.split(' : ').reverse().join(' : ');
    
	function uAlert() {
        var a = new unsafeWindow.LightBox(null, $('#alert'));
        a.showLightbox();
        var b = $('<div/>');
        b.append.apply(b, arguments);
        a.clearContent();
        a.loadLightbox(b, true);
    }
	
	if (isSignedIn) {
		// Hijack the notifications function and additionally display a count in the page title.
        //unsafeWindow.viewModels.newNotifications = wrap(unsafeWindow.viewModels.newNotifications, function(fn, n) {
		//	if (+n) {
		//		document.title = '(' + n + ') ' + document.title.split(/^\([0-9]+\) /).pop();
		//	}
		//	return fn(n);
		//});
		
		if (~url.search(/user\/edit/i)) {
			log('Loading profile settings...');
			if (window.XULElement) {
				$('head').append($('<style type="text/css"/>').text(GM_getResourceText('SPECTRUM_CSS')));
			}
			var $cdbPanel = $('#AccountSettings > :first').clone();
			$cdbPanel.find('div.collapsible').css({paddingTop: 10, paddingBottom: 0});
			var $ctPanel = $cdbPanel.find('div.container_form').html('');
			// $.append workaround to append an array of jQuery elements
			var colorNodes = [];
			$ctPanel.append.apply($ctPanel, (function() {
				var nodes = [];
				for (var i = 0, ic = Coup.mods.length; i < ic; ++i) {
					var mod = Coup.mods[i];
					switch (mod.type) {
						case 'url':
							nodes.push(
								$('<label/>').attr({for: 'cdb_' + mod.key, title: mod.name}).text(mod.name + ':'),
								$('<div/>').addClass('container_textbox container_textfield').append(
									$('<input/>').attr({id: 'cdb_' + mod.key, key: mod.key, type: 'text'})
								)
							);
							break;
						case 'color':
							var tmp;
							nodes.push(
								$('<label/>').attr({for: 'cdb_' + mod.name, title: mod.name}).text(mod.name + ':'),
								$('<div/>').addClass('container_textbox container_textfield').css('background', 'none').append(
									tmp = $('<input/>').attr({id: 'cdb_' + mod.key, key: mod.key, type: 'text'})
								)
							);
							colorNodes.push(tmp[0]);
							break;
						case 'text':
							nodes.push(
								$('<label/>').attr({for: 'cdb_' + mod.name, title: mod.name}).text(mod.name + ':'),
								$('<div/>').addClass('container_textbox container_textfield').append(
									$('<input/>').attr({id: 'cdb_' + mod.key, key: mod.key, type: 'text'}).keydown(function() {
										if (this.value.length > 50) {
											this.parentNode.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';
										} else {
											this.parentNode.style.backgroundColor = '';
										}
									})
								)
							);
							break;
					}
				}
				for (var i = 0, ic = Coup.options.length; i < ic; ++i) {
					var opt = Coup.options[i];
					var optStoreValue = XT.get(opt.key, opt.defval);
					switch (opt.type) {
						case 'option':
							nodes.push(
								$('<label/>').attr({for: 'cdb_' + opt.key, title: opt.name}).text(opt.name + ':'),
								$('<div/>').css({background: 'none', lineHeight: '25px', minHeight: 25}).append(
									$('<input/>').attr({id: 'cdb_' + opt.key, key: opt.key, type: 'checkbox'}).attr('checked', optStoreValue).click(function() {
										log('Setting', this.attributes.key.value, 'to', this.checked, '...');
										XT.set(this.attributes.key.value, this.checked);
									})
								)
							);
							break;
						case 'list':
							nodes.push(
								$('<label/>').attr({for: 'cdb_' + opt.key, title: opt.name}).text(opt.name + ':'),
								$('<div/>').addClass('container_textbox container_textfield').css('background', 'none').append(
									opt.init($('<select/>').attr({id: 'cdb_' + opt.key, key: opt.key}))
								),
								$('<input/>').attr({type: 'button', value: 'Add'}).click(opt.add),
								$('<input/>').attr({type: 'button', value: 'Remove'}).click(opt.remove),
								'<br/>',
								'<br/>'
							);
							break;
						case 'action':
							nodes.push(
								$('<label/>').attr({for: 'cdb_' + opt.key, title: opt.name}).text(opt.name + ':'),
								$('<div/>').css({background: 'none', lineHeight: '25px', minHeight: 25}).append(
									$('<input/>').attr({id: 'cdb_' + opt.key, key: opt.key, type: 'button', value: opt.text}).click(opt.fn)
								)
							);
							break;
					}
				}
				return nodes;
			})());
			$(colorNodes).spectrum({
				showInput: true,
				showInitial: true,
				showAlpha: true,
				preferredFormat: 'rgb'
			});
			$cdbPanel.find('a').attr({href: 'javascript:;', id: 'btn_saveCoup'}).end()
            .find('h3').css('background-color', 'rgba(15, 0, 40, 0.40)').click(function()
            {
                $(this).parent().toggleClass('open');
            }).end()
            .find('strong.heading').text("Coup'd Bungie").end()
            .find('span.description').text('Show who you really are.');
			
			$cdbPanel.appendTo('#AccountSettings');
			
			VERSION = 'devq';
			Coup.getSingle(myUserId, function(data) {
				log('Response:', data);
				var users = data.users;
				var user;
				if (user = users[myUserId]) {
					for (var i = 0, ic = Coup.mods.length; i < ic; ++i) {
						var mod = Coup.mods[i];
						if (mod.type === 'color') {
							$('#cdb_' + mod.key).spectrum('set', user[mod.key]);
						}
						else {
							$('#cdb_' + mod.key).val(user[mod.key]);
						}
					}
				}
			}, function() {
				uAlert('Server error.');
			});
            
            $('#btn_saveCoup').click(function() {
                var $cdb = $(this).parent().parent();
                if (!$cdb.hasClass('open')) return;
                var pd = {ver: VERSION, uid: myUserId};
				var cd = {};
                for (var i = 0, ic = Coup.mods.length; i < ic; ++i) {
					var mod = Coup.mods[i];
					if (mod.type === 'color') {
						cd[mod.key] = pd[mod.key] = $('#cdb_' + mod.key).spectrum('get').toString();
					} else if (mod.type === 'text') {
						var $el = $('#cdb_' + mod.key);
                        //Fridge Gnome Edit 1
						if ($el.val().length > 50) {
							uAlert(mod.name, ' is too long.');
							return;
						}
						cd[mod.key] = pd[mod.key] = $('#cdb_' + mod.key).val();
					} else {
						cd[mod.key] = pd[mod.key] = $('#cdb_' + mod.key).val();
					}
				}
				var userCache = XT.get('users.cache', {});
				cd.time = Date.now();
				userCache[pd.uid] = cd;
				XT.set('users.cache', userCache);
                $.post(SERVER_URL + 'set', pd, function(res) {
					uAlert(res.status === 200 ? res.message : 'Error! I don\'t know!');
				}, 'json').fail(function() {
					uAlert('Something went wrong!');
				});
            });
		}
		
		// Load and apply group styles.
		if (~url.search(/\/groups\//i) && !XT.get('disableGroupStyling', false)) {
			var gid = unsafeWindow.groupId;
			var ckey = template('groups.{id}.cache', {id: gid});
			log('Locaching group style...');
			Locache.get(ckey, GROUP_CACHE_FLUSH_THRESHOLD, function(cache) {
				log(cache ? 'Cache found...' : 'Cache not found; requesting new data...');
				if (cache) {
					// TODO: Deal with forums and pinned topics. Make nice replace function. Remove jQuery dependency?
					$('body').append($('<style type="text/css"/>').text(htmlDecode(cache.style).replace(/;/g, ' !important;')));
				}
				else {
					bnet.forumService.GetTopicsPaged(0, 10, gid, 0, 0, 32, '', function(data) {
						log('Bnet Response:', data);
						var styleString = '';
						var forums = [];
						var pinnedTopics = [];
						for (var i = 0, c = data.results.length; i < c; ++i) {
							var currentPost = data.results[i];
							if (currentPost.subject === 'CSS') {
								log('CSS found...');
								bnet.forumService.GetPostAndParent(currentPost.postId, '', function processPostData(postData) {
									currentPost = postData.results[postData.results.length - 1];
									var tags = currentPost.tags;
									if (tags) {
										for (var j = 0, d = tags.length; j < d; ++j) {
											var prefix = tags[j].substr(1,2);
											if (prefix === 'P_') {
												// TODO: Get thread data from thread ID and store it.
											}
											else if (prefix === 'F_') {
												forums.push(tags[j].substr(3));
											}
										}
									}
									styleString += currentPost.body;
									if (currentPost.parentPostId) {
										log('Parent post found; requesting...');
										bnet.forumService.GetPostAndParent(currentPost.parentPostId, '', processPostData);
									}
									else {
										var cval = {
											style: styleString,
											forums: forums,
											pins: pinnedTopics,
											time: Date.now()
										};
										log('Updating style cache...');
										XT.set(ckey, cval);
										log('Applying style...');
										$('body').append($('<style type="text/css"/>').text(htmlDecode(styleString).replace(/;/g, ' !important;')));
										// TODO: Add subforum and pin code.
									}
								});
							}
						}
					});
				}
			});
		}
    }
	
	if (~url.search(/\/forum\/post/i) || ~url.search(/\/groups\/post/i)) {
		// Apply styles to initial posts.
		// TODO: Users are cached individually. Fix this code.
		// TODO: Use solution #2.
		
		// TODO-L2: Wrap in locache call.
				
		// What do we want? A callback for cached users, and a callback for uncached users?
		// If I pass cache to callback, callback is expected to manage storage.
		// If I don't pass it, function is expected to manage storage. Function name `update` fits.
		
		
		function applyLocache(users, loback) {
			function applyUserData(data) {
				if (!data || !data.users) return;
				for (var i = 0, ic = Coup.pageMods.length; i < ic; ++i) {
					Coup.pageMods[i].fn.call(Coup.pageModMemory, data, Coup.pageMods[i].key);
				}
				for (var i = 0, ic = $posts.length; i < ic; ++i) {
					var userId = $posts.eq(i).find(Coup.idSelector)[Coup.idAction](Coup.idAttr);
					var userData = data.users[userId];
					if (userData) {
						for (var j = 0, jc = Coup.mods.length; j < jc; ++j) {
							var mod = Coup.mods[j];
							var $el = $posts.eq(i).find(' > article > div.post').find(mod.selector);
							if (mod.fn) {
								$el[0] && userData[mod.key] && mod.fn.call($el[0], userData[mod.key]);
							} else {
								userData[mod.key] && $el[mod.action].apply($el, mod.args.concat(userData[mod.key]));
							}
						}
					}
				}
			}
			var appliedUsers = $.extend(users.cached, users.expired);
			var requestedUsers = $.extend(users.expired, users.uncached);
			// TODO: Filter negative times.
			var requestedUserIds = Object.keys(requestedUsers).filter(function(e) { return users.uncached[e] && users.uncached[e].time < 0; });
			Locache.get('server.lastError', ERROR_CACHE_FLUSH_THRESHOLD, function(error) {
				if (!error) {
					Coup.get(requestedUserIds, function(responseData) {
						log('Coup Response:', responseData);
						applyUserData(responseData);
						loback($.extend(users.uncached, responseData.users));
					}, function() {
						XT.set('server.lastError', {time: Date.now()});
						uAlert('Coup d\'Bungie: Server cannot be reached. Retrying in 30 minutes.');
					});
				} else {
					log('Last server error was', (Date.now() - error.time) / 60000 >> 0 % 60,
						'minutes ago; retrying in', (error.time + ERROR_CACHE_FLUSH_THRESHOLD - Date.now()) / 60000 >> 0 % 60, 'minutes');
				}
			});
			log('Applying user styles...');
			applyUserData({users: appliedUsers});
		}
		
		// Solution #2
		var $posts = $('#forum_post, ul > li.cf[id]');
		var userIds = mapProperty($posts.find(Coup.idSelector), 'dataset', 'membershipid', true);
		log('Locaching initial users...', userIds);
		Locache.update('users.cache', userIds, USER_CACHE_FLUSH_THRESHOLD_SET, applyLocache);
		
		// Hijack PopulateReply, but only manage calls for the own user's new comments.
		unsafeWindow.Post.prototype.PopulateReply = wrap(unsafeWindow.Post.prototype.PopulateReply, function(fn, data, u1, u2) {
			log('PopulateReply:', arguments);
			// I do not know the API details of PopulateReply, but 2 additional boolean arguments are passed when
			// the user themself makes a new comment. 3 are passed if it is a question topic. For now, since
			// all these end with true, that is how I'm going to check for the source of the call to PopulateReply.
			//if (pop.call(arguments) === true && data.parentPostId === data.topicId) {
				// fn obj false true
				// fn obj false false true
			
			//} else {
				var args = slice.call(arguments, 1);
				fn.apply(this, args);
			//}
		});
	
		// Hijack dynamic loading of replies and apply styles to new comments.
		bnet.forumService.GetPostsThreadedPaged = patch(bnet.forumService.GetPostsThreadedPaged, function(bnetData) {
			log('Bnet Response:', bnetData);
			var info = mapProperty(bnetData.results, {userIds: 'authorMembershipId', postIds: 'postId'});
			$posts = $.call(null, info.postIds.map(function(i) { return '#' + i; }).toString());
			log('Locaching loaded users...');
			Locache.update('users.cache', info.userIds, USER_CACHE_FLUSH_THRESHOLD_SET, applyLocache);
		});
		
		
	}
});

(function(f) {
    if (currentRequests.length)
        currentRequests[currentRequests.length - 1].done(function() { triggered.push('ajax'); f('ajax'); });
    else
        triggered.push('ajax');
    window.addEventListener('load', function() { triggered.push('load'); f('load'); }, false);
    var t = setInterval(function()
    {
        if (unsafeWindow.$('.spinner').length < 4 || ~unsafeWindow.location.href.search(/\/user\/edit/i))
        {
            clearInterval(t);
            triggered.push('auto');
            f('auto');
        }
    }, 500);
})
(function (msg)
{
    if (msg !== 'auto')
        return // if (triggered['load'])
    /*if (msg === triggered[0])
        return log(msg, 'has been triggered; not last event, exiting call');
    else
        log(msg, 'has been triggered; last event, resuming call');
    */
    var $ = unsafeWindow.$;
    var url = unsafeWindow.location.href;
    var isSignedIn = unsafeWindow.myID_cookie !== 0;
	
	$.ajaxSetup({ mimeType: "text/plain" });
    
    /*if (isSignedIn)
    {
        unsafeWindow.viewModels._unreadMessages = unsafeWindow.viewModels.unreadMessages;
        unsafeWindow.viewModels.unreadMessages = function(n)
        {
            n = n || unsafeWindow.viewModels._unreadMessages(n);
            if (+n) document.title = '(' + n + ') ' + document.title.split(/^\([0-9]+\) /).pop();
        };
        unsafeWindow.viewModels.unreadMessages();
    }*/
    
    window.addEventListener('keydown', function(ke) {
        if (ke.which === 191 && ke.shiftKey && ke.target.localName !== 'input' && ke.target.localName !== 'textarea')
            uAlert(dbg.msgs.join('<br/>'));
    }, false);
    
        const VERSION = '6.1.15';
        const CACHE_FLUSH_THRESHOLD = 1000 * 60 * 60 * 24 * 10; // 10 days

        

        XT.init('cdb');
        
        // Fix page titles.
        if (~url.search(/forum\/topics/i))
            document.title += ' : ' + $('#searchedTag, #searchedTag > span').last().text();
        else if (~url.search(/view\/profile/i))
            document.title += ' : ' + $('h1.displayName > a').text();
        document.title = document.title.split(' : ').reverse().join(' : ');
        
        if (isSignedIn && false)
        {
            // Add group icons in the "following" menu.
            var followedGroups = unsafeWindow.viewModels.myFollowedGroupsModel();
            //var xtGroupAvatars = XT.get('following.groups.avatars');
            var groupLinks = $('ul.group > li > a:nth-child(odd)');
            for (var i = 0, c = groupLinks.length; i < c; ++i)
            {
                $(template('<img src="{path}"/>', {path: followedGroups[i].detail.avatarImage}))
                    .prependTo(groupLinks[i].parentNode);
            }
        }
        
        // Group Styling
        /*   
             load from localStorage (cache)
             compare time of last http request to now
             if recent, display from cache
             else request new data and display
        */
        if (isSignedIn && ~url.search(/\/groups\//i))
        {
            var now = Date.now();
            var groupId = unsafeWindow.groupId;
            var cacheKey = template('groups.{id}.style', {id: groupId});
            var cacheVal = XT.get(cacheKey, {});
            var forumsCacheKey = template('groups.{id}.forums', {id: groupId});
            var forumsCacheVal = XT.get(forumsCacheKey, []);
            if (now - cacheVal.time < CACHE_FLUSH_THRESHOLD)
            {
                $('head').append($('<style/>').attr('type', 'text/css').text(cacheVal.data));
                forumsCacheVal && forumsCacheVal.length && doGroupCustomForums(forumsCacheVal);
            }
            else
            {
                log('cache flush; retrieving style, custom forums');
                doGroupCustomStyle(groupId, true);
            }
            
            $('<a class="btn_blue"/>')
            .css('margin-right', 10).html('').text('Refresh Style')
            .insertBefore('a.btn_createMessage, a.btn_gotoCreateMessage').click(function()
            {
                var $this = $(this);
                doGroupCustomStyle(groupId, 2, function() {
                    $this.css({color: 'white', background: '#32CD32'}).attr('class', 'btn_gray');
                }, function() {
                    $this.css({color: 'white', background: '#CD32CD'}).attr('class', 'btn_gray');
                });
            });
        }
        if ($('h1.post_title').text() === 'CSS')
        {
            log('css thread detected');
            $('head').append($('<style/>').attr('type', 'text/css').text($('div.body').text()));
            XT.remove(template('groups.{id}.style', {id: unsafeWindow.groupId}));
            if ($('input.isAnnouncement').length)
            {
                $('.btn_submitEdit').click(function()
                {
                    log(template('groups.{id}.style', {id: unsafeWindow.viewModels.onPageGroupModel().detail.groupId}), 'deleted on edit');
                    XT.remove(template('groups.{id}.style', {id: unsafeWindow.viewModels.onPageGroupModel().detail.groupId}));
                });
            }
        }
        
        // COUP STYLING!
        if (~url.search(/\/groups\/post/i) || ~url.search(/\/forum\/post/i))
        {
            //Post.prototype.PopulateReply = wrap(Post.prototype.PopulateReply, function(fn) {
            //    var args = slice.call(arguments, 1);
            //    fn.apply(this, args);
            //    
            //});
            
            var URL_GET = SERVER_URL + '/get?uids=';
			console.log(URL_GET);
            var userIDs = {};
            $('a[data-membershipid]').map(function() { userIDs[this.attributes['data-membershipid'].value] = true; });
            userIDs[unsafeWindow.myID_cookie] = true;
            var users = [];
            for (var i in userIDs)
                users.push(i);
            
            console.log(users.join(','));
            $.getJSON(URL_GET + users.join(','), function(result) {
                
                
                console.log(arguments);
                if (window.XULElement || window.opera) {
                    if (result[0] && result[0].ver > VERSION)
                        uAlert('There is an update for Coup d\'Bungie: ' + result[0].ver, '<br/><br/>', $('<a/>').attr('href',
                            window.XULElement ? 'http://iggyhopper.us.to:8080/gm/cdb/download/coup_d_bungie.user.js' :
                            window.opera ? 'http://iggyhopper.strangled.net/gm/cdb/download/coup_d_bungie.oex' : 'javascript:;'
                            ).text('DOWNLOAD').css({fontSize: '200%'}));
                    //result.shift();
                }
                
                for (var user in result) {
                    if (result[user].uid == unsafeWindow.myID_cookie) {
                        XT.set('tmp-userdata', result[user]);
                    }
                    $('img[data-membershipid=' + result[user].uid + ']').attr('src', result[user].avatar);
                    $('a[data-membershipid=' + result[user].uid + ']').each(function() {
                        this.style.setProperty('color', result[user].color, 'important');
                        $(this).addClass('nodark');
                        });
                }
            }, function() {
                console.log(arguments);
            });
        }
        
        if (~url.search(/user\/edit/i))
        {
            var UD_DATA = [
                {
                    name: 'Avatar',
                    type: 'url',
                    info: '',
                    key: 'avatar'
                },
                // TODO: Add support for settings groups.
                {
                    name: 'Name Color',
                    type: 'color',
                    info: '',
                    key: 'color'
                },
                {
                    name: 'Disable Group Styling',
                    type: 'option',
                    info: '',
                    key: 'disable-group-styling',
                    val: false
                }
            ];
            
            $('#AccountSettings > :first').clone().appendTo('#AccountSettings')
            .find('div.container_form').html('').append(function() {
                var result = [];
                for (var i = 0; i < UD_DATA.length; ++i) {
                    result.push(
                        $('<label/>').attr({title: UD_DATA[i].info, for: 'coup_ud_' + i}).text(UD_DATA[i].name + ':').get(0),
                        UD_DATA[i].type !== 'option'?
                            $('<div/>').addClass('container_textbox container_textfield').append(
                                $('<input/>').attr({key: UD_DATA[i].key, type: 'text', id: 'coup_ud_' + UD_DATA[i].key})
                            ).get(0)
                        :
                            $('<input/>').attr({key: 'unknown', type: 'checkbox', disabled: 'true', id: 'coup_ud_' + UD_DATA[i].key, checked: !!XT.get(UD_DATA[i].key, UD_DATA[i].val)}).click(function()
                            {
                                XT.set(UD_DATA[i].key, this.value);
                            }).get(0)
                            
                    );
                }
                return result;
            }).append($('<br/><br/><a href="javascript:;">display local data</a>').click(function()
            {
                var data = XT.get('tmp-userdata', {});
            uAlert_NoClose('AVATAR:', data.avatar || 'n/a', '<br/><br/>', 'COLOR:', data.color || 'n/a', '<br/><br/>Click outside this box to close.'); 
            
            })).end()
            .find('a').attr({href: 'javascript:;', id: 'btn_saveCoup'}).end()
            .find('h3').css('background-color', 'rgba(15, 0, 40, 0.40)').click(function()
            {
                $(this).parent().toggleClass('open');
            }).end()
            .find('.heading').text("Coup'd Bungie").end()
            .find('.description').text('Show who you really are.');
            
            $.getJSON(SERVER_URL + '/get?uids=' + unsafeWindow.myID_cookie, function(results) {
                console.log(results);
                results.shift();
                if (results && results.length) {
                    var ud = results[0];
                    XT.set('tmp-userdata', ud);
                    for (var i in ud)
                        $('#coup_ud_' + i).val(ud[i]);
                }
            });
            
            $('#btn_saveCoup').click(function() {
                var $cdb = $(this).parent().parent();
                if (!$cdb.hasClass('open')) return;
                var pd = {};
                $cdb.find('input').each(function() { pd[this.attributes.key.value] = this.value; });
                pd.uid = unsafeWindow.myID_cookie;
                $.post(SERVER_URL + '/set', pd, function() { uAlert('Coup published. NOTICE: Your data will not be saved permanently until about 2 days. This is a test. I will be auto-updating daily. Don\'t hurt me.'); });
                console.log('posting..');
            });
        }
        else if (~url.search(/\/groups\/admin/i))
        {
            var GD_DATA = [
                {
                    name: 'Avatar',
                    type: 'url',
                    selector: 'div.identity > a.avatar',
                    style: 'background-image: url({v});',
                    size: '180x180'
                },
                {
                    name: 'Banner',
                    type: 'url',
                    selector: 'div.identity',
                    style: 'background-image: url({v});',
                    size: '960x165'
                },
                {
                    name: 'Display Name',
                    type: 'text',
                    // TODO: Add functionality for multiple selectors.
                    selector: 'h1.displayName > a { visiblity: hidden; }\r\nh1.displayName > a:after',
                    style: 'content: "{v}"; visibility: visible; float: left;'
                }
            ];
            
            $('#GroupSettings').clone().appendTo('#container_groupSettings')
            .find('h2').text('Group Design').css({backgroundColor: 'rgba(15, 0, 40, 0.4)', padding: '4px'}).end()
            .find('ul, a, span').remove().end()
            .append('<table id="cdb_gdt" style="width: 100%;"/>');
            var $gdt = $('#cdb_gdt');
            for (var i = 0, c = GD_DATA.length; i < c; ++i)
            {
                $gdt.append(template('<tr><td><span title="{size}">{name}: </span></td><td style="width: 100%;"><input style="width: 100%"/></td></tr>',
                {
                    name: GD_DATA[i].name.replace(' ', '&nbsp;'),
                    size: GD_DATA[i].size
                }));
            }
            $gdt.parent().append(
                $('<a/>').attr({class: 'btn_blue', href: 'javascript:;'}).text('Preview & Generate').click(function()
                {
                    var $inputs = $gdt.find('input');
                    $('#cdb_group_css')[0].value = '';
                    for (var i = 0, c = GD_DATA.length; i < c; ++i)
                    {
                        $('#cdb_group_css')[0].value += template('{sel} { {css} }\r\n',
                        {
                            sel: GD_DATA[i].selector,
                            css: template(GD_DATA[i].style, {v: $inputs[i].value})
                        });
                    }
                    $('head').append($('<style/>').attr('type', 'text/css').text($('#cdb_group_css').val().replace(';', '!important;')));
                }),
                '<br/>',
                '<br/>',
                '<div class="container_textfield container_textarea floatingLabel hideLabel"><textarea id="cdb_group_css"/></div>'
            );
        }

        function doGroupCustomForums(tags, redo)
        {
            redo && $('li.cdb.group_forum').remove();
            if (!tags) return;
            var forums = tags.map(function(i) { return i.charAt(1).toUpperCase() + i.substr(2); });
            var $li = $('li.group_forum.forum').find('span').text('All Topics').end();
            var isOn = $li.hasClass('on');
            $li.removeClass('on');
            for (var i = 0, c = forums.length; i < c; ++i)
            {
                var $clone = $li.clone().addClass('cdb');
                if (~url.search('tg=%23' + tags[i].substr(1)))
                    $clone.addClass('on');
                if ($clone.children().length)
                    $clone.children()[0].href += '&tg=' + tags[i].replace('#', '%23');
                $clone.children().children().text(forums[i]);
                $li.after($clone);
            }
            if (isOn && !~url.search('tg=%23'))
                $li.addClass('on');
        }

        function doGroupCustomStyle(groupId, doForums, callback, errback)
        {
            var cacheKey = template('groups.{id}.style', {id: groupId});
            var cacheVal = {};
            var forumsCacheKey = template('groups.{id}.forums', {id: groupId});
            var forumsCacheVal = [];
            unsafeWindow.bungieNetPlatform.forumService.GetTopicsPaged(0, 10, groupId, 0, 0, 32, '', function(tResponse)
            {
                var i = 0;
                for (var c = tResponse.results.length; i < c; ++i)
                    if (tResponse.results[i].subject === 'CSS')
                        break;
                if (!tResponse.results[i])
                    return XT.set(cacheKey, {data: null, time: now}) + XT.set(forumsCacheKey, null);
                log('found css announcement', tResponse.results[i]);
                unsafeWindow.bungieNetPlatform.forumService.GetPostAndParent(tResponse.results[i].postId, '', function(pResponse)
                {
                    log('parsing thread body', pResponse);
                    cacheVal.data = pResponse && htmlDecode(pResponse.results[0].body).replace(/;/g, ' !important;') || null;
                    cacheVal.time = Date.now();
                    XT.set(cacheKey, cacheVal);
                    $('head').append($('<style/>').attr('type', 'text/css').text(cacheVal.data));
                    forumsCacheVal = pResponse && pResponse.results[0].tags || null;
                    XT.set(forumsCacheKey, forumsCacheVal);
                    doForums && doGroupCustomForums(forumsCacheVal, doForums === 2);
                    callback && callback();
                },
                function(a, b, c, d) { errback && errback(a, b, c, d); log(a, b, c, d); XT.set(cacheKey, {data: null, time: now})});
            }, function() { errback && errback(arguments); log(arguments); XT.set(cacheKey, {data: null, time: now})});
        }

        
    
    function htmlDecode(value) { 
        return $('<div/>').html(value).text(); 
    }
    
	
    
    function uAlert_NoClose() {
        var a = new unsafeWindow.LightBox(null, $('#signInAlert'));
        a.showLightbox();
        var b = $('<div/>');
        b.append.apply(b, arguments);
        a.clearContent();
        a.loadLightbox(b, true);
    }
    
});
}
catch (e) {
	dbg.msgs.push('Error: ' + e.message);
}

function template(str, dat)
        {
            for (var prop in dat)
                str = str.replace(new RegExp('{' + prop + '}','g'), dat[prop]);
            return str;
        }

		function htmlDecode(value) { 
        return unsafeWindow.$('<div/>').html(value).text(); 
    }

function mSign(i) {
	return (i > 0) - (i < 0);
}
	
	