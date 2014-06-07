// ==UserScript==
// @name           What.CD Snatched
// @namespace      http://jonls.dk
// @description    Mark snatched torrents.
// @author         jonls
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.2.9
// @date           2010-05-19
// ==/UserScript==

(function() {
	var DEFAULT_STYLE =
		'.group_snatched { color: #E5B244; } '+
		'.snatched { color: #35BF00; } '+
		'.uploaded { color: red; } '+
		'.leeching { color: #2B75A1; }'+
		'.seeding { border-bottom: 1px dotted red; }';

	var AUTO_UPDATE_INTERVAL = 10*60; /* seconds */

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
					if (req.error) req.error(null, 'Network timeout');
				}, req.timeout || 10000);

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
						if (!req_timed_out && req.error) req.error(response, 'GM_xmlhttpRequest error');
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
				$(this).css('-webkit-border-radius', radius);
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

	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];

	/* Create proxy */
	var whatcd_proxy = Proxy(whatcd_url_base, 1000);

	/* Get user id of this user */
	var whatcd_id = (function() {
		var m = $('#userinfo_username .username').eq(0).attr('href').match(/user\.php\?id=(\d+)/);
		if (m) return m[1];
		return null;
	})();

	if (!whatcd_id) return; /* Exceptional condition: User ID not found */

	/* Create status box */
	var status = StatusBox('What.CD Snatched');

	/* Cache of snatched torrents */
	var snatch_cache = Cache('snatch_cache', { groups: {}, torrents: {} });

	/* Scan torrent table in doc and mark links as type in cache */
	function scan_torrent_page(doc, type) {
		var torrent_table = doc.find('#content > .thin > table').eq(0);
		if (torrent_table.length == 0) return 0;

		var found = 0;

		var d = snatch_cache.unserialize();
		torrent_table.find('tr').not('.colhead').each(function(i) {
			/* Find group and torrent ID */
			var group_id;
			var torrent_id;
			var link = $(this).children('td').eq(1).children('a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
			if (m) {
				group_id = m[1];
				torrent_id = m[2];
			} else {
				m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
				if (m) {
					group_id = m[1];
					link = $(this).children('td').eq(1).children('span').eq(0).children('a').eq(0);
					m = link.attr('href').match(/torrents\.php\?action=download&id=(\d+)/);
					if (m) torrent_id = m[1];
				}

				if (!m) {
					status.contents().append('<div><span style="color: red;">Failed:</span> '+$(this).children('td').eq(1).text()+'</div>');
					status.show();
				}
			}

			/* Save in cache */
			if (group_id && torrent_id) {
				if (!d.torrents[torrent_id] ||
						(type != 'seeding' && d.torrents[torrent_id].type != type) ||
						(type == 'seeding' && !d.torrents[torrent_id].seeding)) {
					var name = $.trim($(this).children('td').eq(1).clone().children('span, div').remove().end().text().match(/\s+([^[]+)(\s+\[|$)/)[1]);
					d.groups[group_id] = { name: name };
					if (type == 'seeding') { /* Special case seeding */
						if (d.torrents[torrent_id]) d.torrents[torrent_id].seeding = true;
						else d.torrents[torrent_id] = { type: 'unknown', seeding: true };
					} else {
						if (d.torrents[torrent_id]) d.torrents[torrent_id].type = type;
						else d.torrents[torrent_id] = { type: type, seeding: false };
					}
					found += 1;
				}
			}
		});

		if (found == 0) return 0;

		snatch_cache.serialize();
		return found;
	}

	/* Fetch and scan all pages of type, call callback when done */
	function scan_all_torrent_pages(type, page_cb, finish_cb) {
		var page = 1;
		var total = 0;

		function request_url() {
			return '/torrents.php?type='+type+'&userid='+whatcd_id+'&page='+page;
		}

		function error_handler(response, reason) {
			status.contents().append('<div><span style="color: red;">Error:</span> Unable to fetch '+type+' page '+page+' ('+reason+')</div>');
			status.show();
			finish_cb(total);
		}

		function page_handler(response) {
			if (response.status == 200) {
				var doc = $(new DOMParser().parseFromString(response.responseText, 'text/xml'));

				page_cb(type, page);

				var found = scan_torrent_page(doc, type);
				total += found;
				if (found == 0) { finish_cb(type, total); return; } /* End of asynchronous chain */

				page += 1;
				whatcd_proxy.get({ url: request_url(), callback: page_handler, error: error_handler });
			} else {
				error_handler(response, 'HTTP '+response.status);
			}
		}

		whatcd_proxy.get({ url: request_url(), callback: page_handler, error: error_handler });
	}

	/* Reset command */
	GM_registerMenuCommand('What.CD Snatched: Reset', function() { snatch_cache.clear(); GM_setValue('last_update', '0'); location.reload(); });

	/* Register menu command to enter custom style */
	var custom_style = GM_getValue('custom_style', DEFAULT_STYLE);
	GM_registerMenuCommand('What.CD Snatched: Enter custom style...', function() {
		var style = window.prompt('Enter CSS style (or blank to use default)\nClasses: .group_snatched, .snatched, .uploaded, .leeching, .seeding', custom_style);
		if (style) {
			GM_setValue('custom_style', style);
			location.reload();
		} else if (style == '') {
			GM_deleteValue('custom_style');
			location.reload();
		}
	});

	/* Inject CSS style */
	GM_addStyle(custom_style);

	/* Mark all links to torrents that are snatched/uploaded/leeching */
	function mark_snatched_links() {
		var d = snatch_cache.unserialize();

		/* Go through all links */
		$('#content').find('a').each(function(i) {
			var href = $(this).attr('href');
			if (href) {
				var group_id;
				var torrent_id;

				/* Find and mark links to snatched torrents */
				var m = href.match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
				if (m) {
					group_id = m[1];
					torrent_id = m[2];
				} else {
					m = href.match(/torrents\.php\?torrentid=(\d+)/);
					if (m) {
						torrent_id = m[1];
					} else {
						m = href.match(/torrents\.php\?id=(\d+)/);
						if (m) group_id = m[1];
					}
				}

				/* Add classes */
				if (group_id && d.groups[group_id] &&
						(!torrent_id || !$(this).parent().parent().is('.group_torrent'))) {
					$(this).addClass('group_snatched');
				}
				if (torrent_id && d.torrents[torrent_id]) {
					$(this).addClass(d.torrents[torrent_id].type);
					if (d.torrents[torrent_id].seeding) $(this).addClass('seeding');
				}

				/* Change text if text is url */
				if ($(this).text() == $(this).attr('href') && group_id &&
						d.groups[group_id] && d.groups[group_id].name) {
					$(this).text(d.groups[group_id].name);
				}
			}
		});

		/* Mark links on album page in torrent table */
		if (/what\.cd\/torrents\.php/.test(document.URL)) {
			/* Parse search */
			var search = {};
			var search_list = document.location.search.substring(1).split('&');
			for (var i = 0; i < search_list.length; i++) {
				var pair = search_list[i].split('=');
				search[pair[0]] = pair[1];
			}

			if (search.id) {
				/* Album page */
				$('#content .torrent_table:first tr.group_torrent').each(function(i) {
					/* Find torrent id */
					var torrent_id;
					$(this).children('td').eq(0).children('span').eq(0).children('a').each(function(i) {
						var href = $(this).attr('href');
						if (href) {
							var m = href.match(/torrents\.php\?torrentid=(\d+)/);
							if (m) {
								torrent_id = m[1];
								$(this).removeClass('group_snatched snatched uploaded leeching seeding');
								return false;
							}
						}
					});

					if (torrent_id && d.torrents[torrent_id]) {
						var link = $(this).children('td').eq(0).children('a').eq(0);
						link.addClass(d.torrents[torrent_id].type);
						if (d.torrents[torrent_id].seeding) link.addClass('seeding');
					}
				});
			}
		}
	}

	/* Mark torrent as leeching when download link is clicked */
	function mark_download_links() {
		$('#content').find('a').each(function(i) {
			var href = $(this).attr('href');
			if (href) {
				/* Find download links */
				var m = href.match(/torrents\.php\?action=download&id=(\d+)/);
				if (m) {
					var torrent_id = m[1];
					$(this).click(function(event) {
						var d = snatch_cache.unserialize();
						d.torrents[torrent_id] = { type: 'leeching', seeding: false };
						snatch_cache.serialize();
						mark_snatched_links();
					});
				}
			}
		});
	}

	/* Scan current page */
	if (/what\.cd\/torrents\.php/.test(document.URL)) {
		/* Parse search */
		var search = {};
		var search_list = document.location.search.substring(1).split('&');
		for (var i = 0; i < search_list.length; i++) {
			var pair = search_list[i].split('=');
			search[pair[0]] = pair[1];
		}

		if ((search.type == 'snatched' || search.type == 'uploaded'
				|| search.type == 'seeding' || search.type == 'leeching') && search.userid == whatcd_id) {
			var scan_status = $('<div>Scanning current page... <span></span></div>');
			status.contents().append(scan_status);
			status.show();

			/* Scan current page */
			var found = scan_torrent_page($(document), search.type);

			scan_status.children('span').text('Done ('+((found > 0) ? (found+' updates found') : 'no updates found')+')')
			status.show(5000);
		}
	}

	/* Mark links */
	mark_download_links();
	mark_snatched_links();

	/* Auto update */
	var now = new Date();
	var last_update = parseInt(GM_getValue('last_update', '0'));
	if (last_update + AUTO_UPDATE_INTERVAL*1000 < now.getTime()) {
		GM_setValue('last_update', now.getTime().toString());
		var jobs = 4;
		var total_found = {};

		/* Show auto update status */
		if (last_update == 0) {
			var update_status = {
				snatched: $('<div>Updating snatched: <span>Initializing...</span></div>'),
				uploaded: $('<div>Updating uploaded: <span>Initializing...</span></div>'),
				leeching: $('<div>Updating leeching: <span>Initializing...</span></div>'),
				seeding: $('<div>Updating seeding: <span>Initializing...</span></div>')
			};

			for (var type in update_status) status.contents().append(update_status[type]);
			status.show();
		}

		function scan_page_handler(type, page) {
			if (last_update == 0) {
				update_status[type].children('span').text('Page '+page+'...');
				status.show();
			}
		}

		function scan_finished_handler(type, found) {
			if (last_update == 0) {
				update_status[type].children('span').text('Done ('+((found > 0) ? (found+' updates found') : 'no updates found')+')');
			}

			jobs -= 1;
			total_found[type] = found;

			if (jobs == 0) {
				mark_snatched_links();
				if (last_update == 0) {
					var total = [];
					for (var type in total_found) if (total_found[type] > 0) total.push(type+': '+total_found[type]);
					status.contents().append('<div>Auto update done</div>');
					status.show(5000);
				}
			}
		}

		/* Rescan all types of torrent lists */
		scan_all_torrent_pages('snatched', scan_page_handler, scan_finished_handler);
		scan_all_torrent_pages('uploaded', scan_page_handler, scan_finished_handler);
		scan_all_torrent_pages('leeching', scan_page_handler, scan_finished_handler);
		scan_all_torrent_pages('seeding', scan_page_handler, scan_finished_handler);
	}
})();
