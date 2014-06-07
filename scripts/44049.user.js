// ==UserScript==
// @name           What.CD Tasteometer
// @namespace      http://jonls.dk
// @description    Insert musical compatibility and top albums from Last.fm into What.CD user pages.
// @include        http://what.cd/user.php?id=*
// @include        https://ssl.what.cd/user.php?id=*
// @include        http://what.cd/forums.php*
// @include        https://ssl.what.cd/forums.php*
// @include        http://what.cd/torrents.php?id=*
// @include        https://ssl.what.cd/torrents.php?id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.13.1
// @date           2010-01-02
// ==/UserScript==

(function() {
	var LASTFM_API_KEY = 'ccb2f85d2a42b863827329db6abe4eda';
	var LASTFM_URL_RE = /http:\/\/(?:(?:www|cn)\.)?last(?:\.fm|fm\.(?:de|es|fr|it|jp|pl|com\.br|ru|se|com\.tr))\/user\/([^\/\?]+)/;

	var CACHE_TIME = 1000*60*60*24*2;
	var DEBUG = 0;

	/* Throttled proxy */
	function Proxy(url_base, delay) {
		var last_req = new Date(0);
		var queue = [];
		var processing = false;

		return {
			get: function(req) {
				var now = new Date();
				queue.push(req);
				if (!processing) {
					/* Race condition: atomic test and set would be appropriate here, to ensure thread safety (is it a problem?) */
					processing = true;
					var diff = last_req.getTime() + delay - now.getTime();
					if (diff > 0) {
						var that = this;
						window.setTimeout(function() { that.process_queue(); }, diff);
					} else {
						this.process_queue();
					}
				}
			},

			process_queue: function() {
				var req = queue.shift();
				this.do_request(req);
				processing = (queue.length > 0);
				if (processing) {
					var that = this;
					window.setTimeout(function() { that.process_queue(); }, delay);
				}
			},

			do_request: function(req) {
				last_req = new Date();
				var timer;
				var req_timed_out = false; /* We cannot abort a request, so we need keep track of whether it timed out */

				/* Create timeout handler */
				timer = window.setTimeout(function() {
					/* Race condition: what if the request returns successfully now? */
					req_timed_out = true;
					if (req.error) req.error(null);
				}, req.timeout || 5000);

				/* Do the actual request */
				GM_xmlhttpRequest({
					method: req.method || 'GET',
					url: url_base+req.url,
					headers: { 'User-Agent': navigator.userAgent, 'Accept': req.accept || 'text/xml' },
					onload: function(response) {
						window.clearTimeout(timer);
						if (!req_timed_out) req.callback(response);
					},
					onerror: function(response) {
						window.clearTimeout(timer);
						if (!req_timed_out && req.error) req.error(response);
					}
				});
			}
		};
	}

	/* Simple rounding (extracted from jQuery Corner) */
	$.fn.round = function(radius) {
		radius = radius || "10px";
		return this.each(function(i) {
			if ($.browser.mozilla && /gecko/i.test(navigator.userAgent)) {
				$(this).css('-moz-border-radius', radius);
			} else if ($.browser.safari && $.browser.version >= 3) {
				$(this).css('webkit-border-radius', radius);
			}
		});
	};

	/* Global status area - feel free to reuse in your own scripts :)
	   Requires jQuery and the round extension above. */
	function StatusBox(title) {
		/* Setup status area */
		var status_area = $('#greasemonkey_status_area').eq(0);
		if (status_area.length == 0) {
			status_area = $('<div id="greasemonkey_status_area"></div>').css({
				'position': 'fixed',
				'top': '0', 'right': '0',
				'margin': '20px',
				'width': '20%',
				'z-index': 500
			});
			$('body').append(status_area);
		}

		/* Create box */
		var box = $('<div></div>').hide();
		box.css({
			'color': 'white',
			'background-color': 'black',
			'opacity': 0.5,
			'margin': '0 0 10px 0',
			'padding': '10px 10px 20px 10px'}).round();
		box.append($('<div>'+title+'</div>').css('font-weight', 'bold'));

		/* Create contents area */
		var contents = $('<div></div>');
		box.append(contents);

		var timer = null;
		var timeout = 0;
		var inhibit_fade = false;

		function set_visible(visible) {
			if (visible && box.is(':hidden')) box.fadeIn(500);				
			else if (!visible && box.is(':visible')) box.fadeOut(500);
		}

		function clear_timer() {
			if (timer) {
				window.clearTimeout(timer);
				timer = null;
			}
		}

		function set_timer() {
			if (!timer && timeout > 0) {
				timer = window.setTimeout(function() { clear_timer(); set_visible(false); }, timeout);
			}			
		}

		function update_timer(t) {
			clear_timer();
			timeout = t;
			if (!inhibit_fade) set_timer();
		}

		function set_inhibit_fade(inhibit) {
			inhibit_fade = inhibit;
			if (!inhibit_fade) { set_timer(); }
			else clear_timer();
		}

		/* Register event handlers */
		box.mouseenter(function(event) {
			set_inhibit_fade(true);
			$(this).fadeTo(500, 0.8);
		});

		box.mouseleave(function(event) {
			set_inhibit_fade(false);
			$(this).fadeTo(500, 0.5);
		});

		box.click(function(event) {
			clear_timer();
			set_visible(false);
		});

		/* Append to global status area */
		status_area.append(box);

		return {
			contents: function() {
				return contents;
			},

			show: function(t) {
				t = t || 0;
				update_timer(t);
				set_visible(true);
			},

			hide: function() {
				clear_timer();
				set_visible(false);
			}
		};
	}

	/* Cache */
	function Cache(name, def_value) {
		var cache;
		return {
			serialize: function() {
				GM_setValue(name, uneval(cache));
			},
			unserialize: function() {
				cache = eval(GM_getValue(name, 'false'));
				if (!cache) cache = $.extend({}, def_value); /* clone */
				return cache;
			},
			clear: function() {
				cache = $.extend({}, def_value); /* clone */
				this.serialize();
			}
		};
	}

	/* Create status box */
	var status = StatusBox('What.CD Tasteometer');

	/* Find link to Last.fm user page in the profile contents */
	function whatcd_find_lastfm_name(doc) {
		var lastfm_name;
		$(doc).find('#content .box').filter(function(i) {
			return (/Profile/.test($(this).children('.head').eq(0).text()));
		}).eq(0).children('.pad').eq(0).find('a').each(function(i) {
			var m = this.href.match(LASTFM_URL_RE);
			if (m) {
				lastfm_name = m[1];
				return false;
			}
		});

		return lastfm_name;
	}
	
	/* Get Last.fm name of this user */
	var lastfm_self = GM_getValue('lastfm_name');
	if (!lastfm_self) {
		var re = /user\.php\?id=(\d+)/;
		var m = $('#userinfo_username .username').eq(0).attr('href').match(re);
		if (m) {
			var user_id = m[1];
			var n = document.URL.match(re);
			if (n && n[1] == user_id) {
				lastfm_self = whatcd_find_lastfm_name(document);
				if (lastfm_self) GM_setValue('lastfm_name', lastfm_self);
			}
		}
	}

	/* Create proxy */
	var lastfm_proxy = Proxy('http://ws.audioscrobbler.com', 1000);

	/* Load cached data */
	var user_cache = Cache('user_cache', {});

	GM_registerMenuCommand('Last.fm Tasteometer: Clear cache', function() { user_cache.clear(); });

	/* Get What.CD user from cache */
	function get_user(whatcd_name) {
		var users = user_cache.unserialize();
		if (!users[whatcd_name]) users[whatcd_name] = {};
		return users[whatcd_name];		
	}

	/* Log request error */
	function log_request_error(text) {
		status.contents().html('<span style="color: red;">Request error:</span> '+text);
		status.show();
	}

	/* Get Last.fm name */
	function get_lastfm_name(whatcd_name) {
		var users = user_cache.unserialize();
		var lastfm_name;
		if (users[whatcd_name] && users[whatcd_name].lastfm_name) {
			lastfm_name = users[whatcd_name].lastfm_name;
		}
		return lastfm_name;
	}

	/* Set Last.fm name, clear cached data on user */
	function set_lastfm_name(whatcd_name, lastfm_name) {
		var users = user_cache.unserialize();
		if (!users[whatcd_name] || !users[whatcd_name].lastfm_name ||
			(users[whatcd_name].lastfm_name && lastfm_name && users[whatcd_name].lastfm_name != lastfm_name)) {
			users[whatcd_name] = { lastfm_name: lastfm_name };
			user_cache.serialize();
		}
	}

	/* Send request to last.fm 2.0 API */
	function request_lastfm(whatcd_name, method, user_key, args, callback) {
		var lastfm_name = get_lastfm_name(whatcd_name);
		if (lastfm_name) {
			var argstr = user_key+'='+encodeURIComponent(lastfm_name)+'&';
			$.each(args, function(name, value) { argstr += name + '=' + encodeURIComponent(value) + '&'; });
			argstr += 'format=json&api_key='+LASTFM_API_KEY;

			lastfm_proxy.get({
				url: '/2.0/?method='+method+'&'+argstr,
				accept: 'application/json',
				callback: function(response) {
					if (response.status == 200) {
						var doc_text = response.responseText;
						var doc = !(/[^,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]/.test(doc_text.replace(/"(\\.|[^"\\])*"/g, ''))) && eval('(' + doc_text + ')');

						if (!doc.error) {
							if (DEBUG) {
								status.contents().text('Response: last.fm '+method+' for '+lastfm_name);
								status.show(5000);
							}
							callback(doc);
						} else {
							log_request_error('last.fm '+method+' for '+lastfm_name+' ('+doc.message+' ('+doc.error+'))');
						}
					} else {
						log_request_error('last.fm '+method+' for '+lastfm_name+' returned '+response.status);
					}
				},
				error: function(response) { log_request_error('last.fm '+method+' for '+lastfm_name); }
			});
		}
	}

	/* Get profile data */
	function get_lastfm_profile(whatcd_name, callback) {
		var users = user_cache.unserialize();
		if (users[whatcd_name] && users[whatcd_name].lastfm_profile) {
			var lastfm_profile = users[whatcd_name].lastfm_profile;
			var now = new Date();
			if (lastfm_profile.cache_date + CACHE_TIME > now.getTime()) {
				callback(lastfm_profile);
				return;
			}
		}
		request_lastfm_profile(whatcd_name, callback);
	}

	/* Request user profile date */
	function request_lastfm_profile(whatcd_name, callback) {
		request_lastfm(whatcd_name, 'user.getInfo', 'user', {}, function(doc) {
			var user = get_user(whatcd_name);
			user.lastfm_profile = { cache_date: new Date().getTime() };

			/* Find real name */
			if (doc.user.realname) user.lastfm_profile.real_name = doc.user.realname;

			/* Find age */
			if (doc.user.age) user.lastfm_profile.age = doc.user.age;

			/* Find gender */
			if (doc.user.gender && doc.user.gender != 'n') {
				user.lastfm_profile.gender = (doc.user.gender == 'm' ? 'Male' : 'Female');
			}

			/* Find country */
			if (doc.user.country) {
				user.lastfm_profile.country_code = doc.user.country.toLowerCase();
			}

			/* Playcount */
			if (doc.user.playcount) user.lastfm_profile.playcount = doc.user.playcount;

			user_cache.serialize();
			callback(user.lastfm_profile);
		});
	}

	/* Get musical compatibility */
	function get_lastfm_music_compat(whatcd_name, callback) {
		var users = user_cache.unserialize();
		if (users[whatcd_name] && users[whatcd_name].lastfm_music_compat) {
			var lastfm_music_compat = users[whatcd_name].lastfm_music_compat;
			var now = new Date();
			if (lastfm_music_compat.cache_date + CACHE_TIME > now.getTime() &&
				lastfm_music_compat.self_name == lastfm_self) {
				callback(lastfm_music_compat);
				return;
			}
		}
		request_lastfm_music_compat(whatcd_name, callback);
	}

	/* Request musical compatibility */
	function request_lastfm_music_compat(whatcd_name, callback) {
		request_lastfm(whatcd_name, 'tasteometer.compare', 'value2',
			{ 'type1': 'user', 'type2': 'user', 'value1': lastfm_self , 'limit': '10' },
			function(doc) {
				var user = get_user(whatcd_name);
				user.lastfm_music_compat = {
					cache_date: new Date().getTime(),
					self_name: lastfm_self,
					score: parseFloat(doc.comparison.result.score),
					artists: []
				};

				/* Add artist names */
				if (doc.comparison.result.artists.artist) {
					for (var i = 0; i < doc.comparison.result.artists.artist.length; i++) {
						var artist = doc.comparison.result.artists.artist[i];
						user.lastfm_music_compat.artists.push(artist.name);
					}
				}

				user_cache.serialize();
				callback(user.lastfm_music_compat);
			}
		);
	}

	/* Get top albums */
	function get_lastfm_top_albums(whatcd_name, period, callback) {
		var users = user_cache.unserialize();
		if (users[whatcd_name] && users[whatcd_name].lastfm_top_albums) {
			var lastfm_top_albums = users[whatcd_name].lastfm_top_albums;
			if (lastfm_top_albums[period]) {
				var top_albums_period = lastfm_top_albums[period];
				var now = new Date();
				if (top_albums_period.cache_date + CACHE_TIME > now.getTime()) {
					callback(top_albums_period);
					return;
				}
			}
		}
		request_lastfm_top_albums(whatcd_name, period, callback);
	}

	/* Request top albums */
	function request_lastfm_top_albums(whatcd_name, period, callback) {
		request_lastfm(whatcd_name, 'user.getTopAlbums', 'user', { 'period': period }, function(doc) {
			var user = get_user(whatcd_name);
			if (!user.lastfm_top_albums) user.lastfm_top_albums = {};
				user.lastfm_top_albums[period] = {
				cache_date: new Date().getTime(),
				albums: []
			};

			/* Find five top albums */
			for (var i = 0; i < Math.min(5, doc.topalbums.album.length); i++) {
				var album = doc.topalbums.album[i];
				var album_info = {
					name: album.name,
					artist: album.artist.name
				};

				/* Find largest image */
				var image_sizes = { 'extralarge': 4, 'large': 3, 'medium': 2, 'small': 1 };
				var image_source;
				var image_size = 0;
				for (var j = 0; j < album.image.length; j++) {
					if (image_sizes[album.image[j].size] > image_size) {
						image_size = image_sizes[album.image[j].size];
						image_source = album.image[j]['#text'];
					}
				}
							
				if (image_source && image_source != 'http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png') album_info.image = image_source;
				user.lastfm_top_albums[period].albums.push(album_info);
			}

			user_cache.serialize();
			callback(user.lastfm_top_albums[period]);
		});
	}

	/* Get top artists */
	function get_lastfm_top_artists(whatcd_name, period, callback) {
		var users = user_cache.unserialize();
		if (users[whatcd_name] && users[whatcd_name].lastfm_top_artists) {
			var lastfm_top_artists = users[whatcd_name].lastfm_top_artists;
			if (lastfm_top_artists[period]) {
				var top_artists_period = lastfm_top_artists[period];
				var now = new Date();
				if (top_artists_period.cache_date + CACHE_TIME > now.getTime()) {
					callback(top_artists_period);
					return;
				}
			}
		}
		request_lastfm_top_artists(whatcd_name, period, callback);
	}

	/* Request top artists */
	function request_lastfm_top_artists(whatcd_name, period, callback) {
		request_lastfm(whatcd_name, 'user.getTopArtists', 'user', { 'period': period }, function(doc) {
			var user = get_user(whatcd_name);
			if (!user.lastfm_top_artists) user.lastfm_top_artists = {};
			user.lastfm_top_artists[period] = {
				cache_date: new Date().getTime(),
				artists: []
			};

			/* Find five top artists */
			for (var i = 0; i < Math.min(5, doc.topartists.artist.length); i++) {
				var artist = doc.topartists.artist[i];
				var artist_info = { name: artist.name };

				/* Find largest image */
				var image_sizes = { 'extralarge': 4, 'large': 3, 'medium': 2, 'small': 1 };
				var image_source;
				var image_size = 0;
				for (var j = 0; j < artist.image.length; j++) {
					if (image_sizes[artist.image[j].size] > image_size) {
						image_size = image_sizes[artist.image[j].size];
						image_source = artist.image[j]['#text'];
					}
				}
							
				if (image_source) artist_info.image = image_source;
				user.lastfm_top_artists[period].artists.push(artist_info);
			}

			user_cache.serialize();
			callback(user.lastfm_top_artists[period]);
		});
	}

	/* Get recent tracks */
	function get_lastfm_recent_tracks(whatcd_name, callback) {
		/* Probably no need to cache unless this is called on the same page
		   several times for the same user. */
		request_lastfm_recent_tracks(whatcd_name, callback);
	}

	/* Request recent tracks */
	function request_lastfm_recent_tracks(whatcd_name, callback) {
		request_lastfm(whatcd_name, 'user.getRecentTracks', 'user', {}, function(doc) {
			if (doc.recenttracks.track[0]) {
				var track = { playing: false };
				track.title = doc.recenttracks.track[0].name;
				track.artist = doc.recenttracks.track[0].artist['#text'];
				track.album = doc.recenttracks.track[0].album['#text'];
				if (doc.recenttracks.track[0].date) track.date = doc.recenttracks.track[0].date['#text'];
				if (doc.recenttracks.track[0]['@attr'] && doc.recenttracks.track[0]['@attr'].nowplaying &&
						doc.recenttracks.track[0]['@attr'].nowplaying == 'true') {
					track.playing = true;
				}
				callback(track);
			}
		});
	}

	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];

	if (/what\.cd\/user\.php\?id=/.test(document.URL)) {
		/* What.CD user name */
		var w_name = $('#content > div.thin > h2').text();

		/* Cache Last.fm name for current user page */
		set_lastfm_name(w_name, whatcd_find_lastfm_name(document));

		/* Last.fm name */
		var l_name = get_lastfm_name(w_name);
		if (l_name) {
			/* Find stats box */
			var stats_box = $('#content .box').filter(function(i) {
				return (/Stats/.test($(this).children('.head').eq(0).text()));
			}).eq(0);

			/* Create Last.fm box */
			var lastfm_box = $('<div id="lastfm_box" class="box"><div class="head colhead_dark">Last.fm</div></div>');
			var lastfm_list = $('<ul/>').addClass('stats').addClass('nobullet');
			var lastfm_user_item = $('<li>User name: <a href="http://www.last.fm/user/'+l_name+'">'+l_name+'</li>').hide();
			lastfm_list.append(lastfm_user_item);
			lastfm_box.append(lastfm_list);
			stats_box.after(lastfm_box);
			lastfm_user_item.slideDown(500);

			/* Insert profile data */
			get_lastfm_profile(w_name,
				function(profile) {
					var items = [];

					/* Find real name */
					if (profile.real_name) items.push($('<li>Real name: '+profile.real_name+'</li>'));

					/* Find age */
					if (profile.age) items.push($('<li>Age: '+profile.age+'</li>'));

					/* Find gender */
					if (profile.gender) items.push($('<li>Gender: '+profile.gender+'</li>'));

					/* Find country */
					if (profile.country_code) {
						items.push($('<li>Country: <img alt="'+profile.country_code+'" title="'+profile.country_code+'" src="http://famfamfam.googlecode.com/svn/wiki/images/flags/'+profile.country_code+'.png"/></li>'));
					}

					if (profile.playcount) {
						items.push($('<li>Tracks played: '+profile.playcount+'</li>'));
					}

					/* Insert all items */
					for (var i = 0; i < items.length; i++) {
						items[i].hide();
						lastfm_list.append(items[i]);
						items[i].slideDown(500);
					}
				}
			);

			/* Insert recent track */
			get_lastfm_recent_tracks(w_name, function(track) {
				var artist_url = whatcd_url_base+'/artist.php?artistname='+escape(track.artist.replace(/ /g, '+'));
				var track_url = whatcd_url_base+'/torrents.php?action=advanced&artistname='+
					escape(track.artist.replace(/ /g, '+'))+'&filelist='+escape(track.title.replace(/ /g, '+'));

				var date_string = '';
				if (track.playing) date_string = 'Now playing';
				else if (track.date) date_string = 'Listened on '+track.date;

				var recent_item = $('<li>Recent track: <span title="'+date_string+'">'+
					'<a href="'+artist_url+'">'+track.artist+'</a>'+
					' - <a href="'+track_url+'">'+track.title+'</a></span></li>').hide();
				lastfm_list.append(recent_item);
				recent_item.slideDown(500);
			});

			/* Insert musical compatibility */
			if (lastfm_self && l_name != lastfm_self) {
				get_lastfm_music_compat(w_name,
					function(music_compat) {
						/* Create list item */
						var compat_item = $('<li>Musical compatibility: </li>').hide();

						/* Insert coloured score text */
						var score = music_compat.score;
						var score_class = 'bad';
						if (score > 0.75) score_class = 'good';
						else if (score > 0.5) score_class = 'goodish';
						else if (score > 0.25) score_class = 'badish';
						var score_span = $('<span>'+Math.floor(score*100)+'%</span>').addClass(score_class).css({cursor: 'pointer'});
						compat_item.append(score_span);

						/* Insert list of common artists */
						var artist_list = $('<ul></ul>').css('list-style', 'none').hide();
						for (var i = 0; i < music_compat.artists.length; i++) {
							var artist = music_compat.artists[i];
							var link = whatcd_url_base+'/artist.php?name='+escape(artist.replace(/ /g, '+'));
							var artist_item = $('<li><a href="'+link+'">'+artist+'</a></li>');
							artist_list.append(artist_item);
						}
						compat_item.append(artist_list);					
						score_span.click(function(event) { artist_list.slideToggle(500); });
						lastfm_list.append(compat_item);
						compat_item.slideDown(500);
					}
				);
			}

			/* Insert top artists and albums */
			var periods = ['7day', '3month', '6month', '12month', 'overall'];
			var period_text = ['Last 7 Days', 'Last 3 Months', 'Last 6 Months', 'Last 12 Months', 'Overall'];
			var artist_period_index = GM_getValue('lastfm_top_artist_period', 0);
			var album_period_index = GM_getValue('lastfm_top_album_period', 0);

			/* Find profile box */
			var profile_box = $('#content .box').filter(function(i) {
				return (/Profile/.test($(this).children('.head').eq(0).text()));
			}).eq(0);

			/* Create table of top artists */
			var artist_table = $('<table/>').attr({'cellspacing': '0', 'cellpadding': '0', 'border': '0'}).hide();
			var artist_tbody = $('<tbody><tr class="colhead"><td colspan="5">Top Artists (<span class="period"></span>)</td></tr><tr> </tr></tbody>');
			var artist_row = $('<tr/>');
			var artist_period_switch = artist_tbody.find('span.period');
			artist_period_switch.css('cursor', 'pointer');
			artist_tbody.append(artist_row);
			artist_table.append(artist_tbody);
			profile_box.after(artist_table);

			/* Create table of top albums */
			var album_table = $('<table/>').attr({'cellspacing': '0', 'cellpadding': '0', 'border': '0'}).hide();
			var album_tbody = $('<tbody><tr class="colhead"><td colspan="5">Top Albums (<span class="period"></span>)</td></tr><tr> </tr></tbody>');
			var album_row = $('<tr/>');
			var album_period_switch = album_tbody.find('span.period');
			album_period_switch.css('cursor', 'pointer');
			album_tbody.append(album_row);
			album_table.append(album_tbody);
			artist_table.after(album_table);

			/* Period loading */
			var artist_period_loading, album_period_loading;

			/* Update top artists contents */
			function top_artists_update(period_index) {
				/* Set this as the loading period */
				artist_period_loading = period_index;

				/* Update header */
				artist_period_switch.text(period_text[period_index]);

				/* Clear row */
				artist_row.empty();

				get_lastfm_top_artists(w_name, periods[artist_period_index], function(top_artists) {
					if (artist_period_loading == period_index) {
						/* Insert top artists */
						for (var i = 0; i < Math.min(5, top_artists.artists.length); i++) {
							var artist = top_artists.artists[i];

							/* Get artist name */
							var search_url = whatcd_url_base+'/artist.php?artistname='+escape(artist.name.replace(/ /g, '+'));

							var image_source = artist.image || whatcd_url_base+'/static/common/avatars/default.png';

							/* Create field */
							var artist_field = $('<td><a title="'+artist.name+'" href="'+search_url+'">'+
								'<img width="107" alt="'+artist.name+'" src="'+image_source+'"/></a></td>');
							artist_row.append(artist_field);
						}

						/* Show table */
						artist_table.show();
					}
				});
			}

			/* Update top albums contents */
			function top_albums_update(period_index) {
				/* Set this as the loading period */
				album_period_loading = period_index;

				/* Update header */
				album_period_switch.text(period_text[period_index]);

				/* Clear row */
				album_row.empty();

				get_lastfm_top_albums(w_name, periods[album_period_index], function(top_albums) {
					if (album_period_loading == period_index) {
						/* Insert top albums */
						for (var i = 0; i < Math.min(5, top_albums.albums.length); i++) {
							var album = top_albums.albums[i];

							/* Get artist and album names */
							var search_url = whatcd_url_base+'/torrents.php?action=advanced&artistname='+
								escape(album.artist.replace(/ /g, '+'))+'& groupname='+escape(album.name.replace(/ /g, '+'));

							var image_source = album.image || whatcd_url_base+'/static/common/noartwork/music.png';

							/* Create field */
							var album_field = $('<td><a title="'+album.artist+' - '+album.name+'" href="'+search_url+'">'+
								'<img width="107" alt="'+album.artist+' - '+album.name+'" src="'+image_source+'"/></a></td>');
							album_row.append(album_field);
						}

						/* Show table */
						album_table.show();
					}
				});
			}

			/* Initialize table data */
			top_artists_update(artist_period_index);
			top_albums_update(album_period_index);

			/* Setup event listeners */
			artist_period_switch.click(function(event) {
				artist_period_index = (artist_period_index + 1) % periods.length;
				GM_setValue('lastfm_top_artist_period', artist_period_index);
				top_artists_update(artist_period_index);
			});

			album_period_switch.click(function(event) {
				album_period_index = (album_period_index + 1) % periods.length;
				GM_setValue('lastfm_top_album_period', album_period_index);
				top_albums_update(album_period_index);
			});
		}
	} else if (/what\.cd\/forums\.php/.test(document.URL) ||
		/what\.cd\/torrents\.php\?id=/.test(document.URL)) {
		$('#content > div.thin table.forum_post').each(function(i) {
			var post = $(this);

			/* Find post author */
			var w_name;
			var link = post.find('tbody > tr.colhead_dark > td > span > strong > a').eq(0);
			if (link && /^user\.php\?id=/.test(link.attr('href'))) w_name = link.text();

			/* Last.fm name */
			var l_name = get_lastfm_name(w_name);

			/* Find Last.fm links in post */
			post.find('tbody > tr > td.body > div > a').each(function(i) {
				var m = $(this).attr('href').match(LASTFM_URL_RE);
				if (m && m[1] != l_name) {
					var tie_link = $('<a>[Tie to '+w_name+']</a>').css('cursor', 'pointer');
					var tied = false;
					tie_link.click(function(event) {
						if (!tied) {
							set_lastfm_name(w_name, m[1]);
							tie_link.text('[Undo]');
							tied = true;
						} else {
							set_lastfm_name(w_name, l_name);
							tie_link.text('[Tie to '+w_name+']');
							tied = false;
						}
						event.stopPropagation();
					});
						
					$(this).after(tie_link).after(' ');
				}
			});

			if (l_name) {
				/* Insert table row with profile info */
				var profile_row = $('<tr/>').addClass('colhead_dark');
				var profile_field = $('<td/>').attr('colspan', '2');
				var profile_list = $('<ul/>').css({'display': 'inline', 'float': 'right', 'list-style': 'none'});

				/* Last.fm profile */
				get_lastfm_profile(w_name,
					function(profile) {
						if (profile.real_name) {
							var real_name_item = $('<li>Name: <strong>'+profile.real_name+'</strong></li>');
							profile_list.append(real_name_item.css('display', 'inline'));
						}
						if (profile.age) {
							var age_item = $('<li>Age: <strong>'+profile.age+'</strong></li>');
							profile_list.append(age_item.css('display', 'inline'));
						}
						if (profile.gender) {
							var gender_item = $('<li>Gender: <strong>'+profile.gender+'</strong></li>');
							profile_list.append(gender_item.css('display', 'inline'));
						}
						if (profile.country_code) {
							var country_item = $('<li>Country: <strong><img alt="'+profile.country_code+'" title="'+profile.country_code+'" src="http://famfamfam.googlecode.com/svn/wiki/images/flags/'+profile.country_code+'.png"/></strong></li>');
							profile_list.append(country_item.css('display', 'inline'));
						}

						profile_field.append(profile_list);
						profile_row.append(profile_field);
						post.children('tbody').eq(0).append(profile_row);
					}
				);

				/* Musical compatibility */
				if (lastfm_self && l_name != lastfm_self) {
					get_lastfm_music_compat(w_name,
						function(music_compat) {
							var score = music_compat.score;
							var score_class = 'bad';
							if (score > 0.75) score_class = 'good';
							else if (score > 0.5) score_class = 'goodish';
							else if (score > 0.25) score_class = 'badish';
							var score_item = $('<li>Musical compatibility: <span class="'+score_class+'">'+Math.floor(score*100)+'%</span></li>');
							score_item.css('display', 'inline');
							profile_list.append(score_item);
						}
					);
				}
			}
		});
	}
})();
