// ==UserScript==
// @name            GGn Snatched Chrome
// @namespace       GGn
// @description     Mark snatched torrents.
// @author          Modified By gamingfreak [Chrome version by Mordred (original by jonls)]
// @include 	    https://gazellegames.net/*
// @include         https://www.gazellegames.net/*
// @include 	    http://gazellegames.net/*
// @include         http://www.gazellegames.net/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL	    https://github.com/gamingfreakdev/GGnScripts/raw/master/SnatchList/GGnSnatched.user.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_deleteValue
// @grant           GM_xmlhttpRequest
// @grant           GM_registerMenuCommand
// @grant           GM_addStyle
// @grant           GM_log
// @version         0.1.0
// @date            2012-11-17
// ==/UserScript==

// TODO: full_update and fullUpdateStarted should be re-enabled as needed depending on version changes. Disabling due to lots of updates recently

{
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

// this code is used to get the server version so we can notify the user there is a new version available. The value returned from UserScript is stored in local storage
if( ! /opera/i.test(navigator.userAgent) ) {
	var now = new Date();
	var lastChecked = parseInt(GM_getValue('lastUpdateCheck', 0))
	req = GM_xmlhttpRequest({
		method: 'GET',
		url: 'https://github.com/gamingfreakdev/GGnScripts/raw/master/SnatchList/GGnSnatched.user.js',
		onload: function(response) {
			GM_setValue("lastUpdateCheck", now.getTime().toString());	// don't check again until tomorrow
			if (response.status == 200) {
				var m = response.responseText.match(/@version(?:\s*)(\d+)\.(\d+)\.(\d+)/);	// this code expects the version in format x.x.x
				if (m) GM_setValue("serverVersion", m[1] + '.' + m[2] + '.' + m[3]);
			}
		}
	});
	if( ! /firefox/i.test(navigator.userAgent) ) {	/* yes I know these three functions are also defined below. There are scoping issues at play here. */
		function GM_getValue (key, defaultValue) {
			var value = window.localStorage.getItem(key);
			if (value == null) value = defaultValue;
			return value;
		}
		function GM_setValue(key, value) {
			window.localStorage.setItem( key, value );
		}
	}
}

function main() {
	var CURRENT_VERSION = "0.1.0"	// used for check after update
	var SCRIPT_URL = "https://github.com/gamingfreakdev/GGnScripts/blob/master/SnatchList/GGnSnatched.user.js"
	var DEFAULT_STYLE =
		'.group_snatched { font-style:italic; font-weight:bolder; text-decoration:underline; } '+
		'.snatched { color: #E5B244 !important; text-decoration:line-through !important; display:inline; background:url(http://whatimg.com/i/79134515421796820992.png) top right no-repeat; padding:0 18px 1px 0; } ' +
		'.uploaded { color: #63b708 !important; text-decoration:line-through !important; display:inline; background:url(http://whatimg.com/i/10191197078498637000.png) top right no-repeat; padding:0 18px 1px 0; } ' +
		'.leeching { color: #F70000 !important; display:inline; background:url(http://whatimg.com/i/74717951646239422377.png) top right no-repeat; padding:0 18px 1px 0; } ' +
		'.seeding { color: #63b708; font-style:italic; text-decoration:none !important; }' + 
		'.bookmarked { display:inline; background:url(http://whatimg.com/i/69988735850961204998.png) top right no-repeat; padding:0 18px 1px 0; }';
	var HEADER_STYLE = '.sBoxTitle { color: white; } .sBoxTitle:visited { color: white; } .sboxTitleVersion { color: red; } .sboxTitleVersion:visited { color: red; }'
	var AUTO_UPDATE_INTERVAL = 20*60; /* seconds */

	function log(text) {
		GM_log(text);
	}

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
				}, req.timeout || 20000);

				/* Do the actual request */
				GM_xmlhttpRequest({
					method: req.method || 'GET',
					url: url_base+req.url,
					headers: { /*'User-Agent': navigator.userAgent,*/ 'Accept': req.accept || 'text/xml' },
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
	
	function cmpVersion(v1, v2) {
		if(v1===v2) return 0;
		var a1 = v1.toString().split(".");
		var a2 = v2.toString().split(".");
		for( var i = 0; i < a1.length && i < a2.length; i++ ) {
			var diff = parseInt(a1[i],10) - parseInt(a2[i],10);
			if( diff>0 ) {
				return 1;
			}
			else if( diff<0 ) {
				return -1;
			}
		}
		diff = a1.length - a2.length;
		return (diff>0) ? 1 : (diff<0) ? -1 : 0;
	}

	
	/* Simple rounding (extracted from jQuery Corner) */
	jQuery.fn.rounding = function(radius) {
		radius = radius || "10px";
		return this.each(function(i) {
			//log ("IsMoz = " + $.browser.mozilla + " Agent: '" + navigator.userAgent + "' Version:"+ $.browser.version);
			if ($.browser.mozilla && /gecko/i.test(navigator.userAgent) && cmpVersion($.browser.version,"8.0")==-1) {
				$(this).css('-moz-border-radius', radius);
			} else if ($.browser.safari && cmpVersion($.browser.version,"3.0")>=0) {
				$(this).css('-webkit-border-radius', radius);
			}
			else {
				$(this).css('border-radius', radius);
			}
		});
	};

	/* Global status area - feel free to reuse in your own scripts :)
	   Requires jQuery and the round extension above. */
	function StatusBox(title, newVersion) {
		/* Setup status area */
		var status_area = $('#greasemonkey_status_area').eq(0);
		if (status_area.length == 0) {
			var statWidth = '20%';
			if (window.innerWidth < 1340)
				statWidth = 268;
			status_area = $('<div id="greasemonkey_status_area"></div>').css({
				'position': 'fixed',
				'top': '0', 'right': '0',
				'margin': '20px',
				'width': statWidth,
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
			'padding': '10px 10px 20px 10px'}).rounding();
		if (newVersion == CURRENT_VERSION)
			box.append($('<div><a class="sBoxTitle" href='+SCRIPT_URL+' target="new">'+title+'</a></div>').css({'font-weight':'bold'}));
		else
			box.append($('<div><a class="sBoxTitle" href='+SCRIPT_URL+' target="new">'+title+' - <span class="sboxTitleVersion">Version '+newVersion+' available</span></a></div>').css({'font-weight':'bold'}));

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
			jQuery(this).fadeTo(500, 0.8);
		});

		box.mouseleave(function(event) {
			set_inhibit_fade(false);
			jQuery(this).fadeTo(500, 0.5);
		});

		box.click(function(event) {
			clear_timer();
			jQuery(this).unbind('mouseenter');
			jQuery(this).unbind('mouseleave');
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
				//GM_setValue(name, uneval(cache));
				//GM_setValue(name, toJSON(cache));
				GM_setValue(name, JSON.stringify(cache));
			},
			unserialize: function() {
				//cache = eval(GM_getValue(name, 'false'));
				cache = evalJSON(GM_getValue(name, 'false'));
				if (!cache) cache = jQuery.extend({}, def_value); /* clone */
				return cache;
			},
			clear: function() {
				cache = jQuery.extend({}, def_value); /* clone */
				this.serialize();
			}
		};
	}

	/* Get ggn base URL */
	var ggn_url_base = document.URL.match(/^(https?:\/\/www\.gazellegames\.net|https?:\/\/gazellegames\.net)/)[1];

	/* Create proxy */
	var ggn_proxy = Proxy(ggn_url_base, 1000);

	/* Get user id of this user */
	var ggn_id = (function() {
		var m = $('#userinfo_username .username').eq(0).attr('href').match(/user\.php\?id=(\d+)/);
		if (m) return m[1];
		return null;
	})();

	if (!ggn_id) return; /* Exceptional condition: User ID not found */

	/* Create status box */
	var server_version = GM_getValue("serverVersion", CURRENT_VERSION);
	var status = StatusBox('GGn Snatched', server_version);

	/* Cache of snatched torrents */
	var snatch_cache = Cache('snatch_cache', { groups: {}, torrents: {} });
	var bookmark_cache = Cache('bookmark_cache', { groups: {} });

	/* Scan torrent table in doc and mark links as type in cache */
	function scan_torrent_page(doc, type) {
		//log(type);
		var torrent_table = jQuery(doc).find('#content > .thin > table').eq(0);
		if (torrent_table.length == 0) return 0;
		var found = 0;

		/* Old version: {"groups":{"2417":{"name":"pg.lost - Yes I Am"}}, "torrents":{941290:{type:"snatched", seeding:true}}} */
		/* New version: {"groups":{"2417":{"nm":"pg.lost - Yes I Am"}}, "torrents":{941290:{ty:"snatched", sd:1}}} // this was changed to save space */
		var d = snatch_cache.unserialize();
		torrent_table.find('tr').not('.colhead').each(function(i) {
			/* Find group and torrent ID */
			var group_id;
			var torrent_id;
			var link = jQuery(this).children('td').eq(1).children('a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)&torrentid=(\d+)/);
			if (m) {
				group_id = m[1];
				torrent_id = m[2];
			} else {
				m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
				if (m) {
					group_id = m[1];
					link = jQuery(this).children('td').eq(1).children('span').eq(0).children('a').eq(0);
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
						(type != 'seeding' && d.torrents[torrent_id].ty != type) ||
						(type == 'seeding' && !d.torrents[torrent_id].sd)) {
					var nm = jQuery.trim(jQuery(this).children('td').eq(1).clone().children('span, div').remove().end().text().match(/\s+([^[]+)(\s+\[|$)/)[1]);
					d.groups[group_id] = { nm: nm.replace(/"/g,"'") };
					if (type == 'seeding') { /* Special case seeding */
						if (d.torrents[torrent_id])
							d.torrents[torrent_id].sd = 1;
						else
							d.torrents[torrent_id] = { ty: 'seeding', sd: 1 };
							//d.torrents[torrent_id] = { ty: 'unknown', sd: 1 };
					} else {
						if (d.torrents[torrent_id])
							d.torrents[torrent_id].ty = type;
						else 
							d.torrents[torrent_id] = { ty: type, sd: 0 };
					}
					//log ("adding:" + name + " with group_id="+group_id+", torrent_id="+torrent_id);
					found += 1;
				}
			}
		});

		if (found == 0) return 0;

		snatch_cache.serialize();
		return found;
	}
	
	function scan_bookmark_page(doc) {
		//log ('scanning bookmark page');
		var torrent_table = jQuery(doc).find('#torrent_table').eq(0);
		if (torrent_table.length == 0) return 0;
		var found = 0;

		bookmark_cache.clear();		// makes sense not to save bookmarks because they get added/removed a lot and it's just one page
		var b = bookmark_cache.unserialize();
		torrent_table.find('tr.group.discog').each(function(i) {
			/* Find group and torrent ID */
			var group_id;
			
			var link = jQuery(this).children('td').eq(2).children('span').eq(0).children('strong').eq(0).children('a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
			if (m) {
				group_id = m[1];
				b.groups[group_id] = 1;
				found++;
				}
			//log (found + ". group_id:" + group_id + " - " + link.text());
		});
		torrent_table.find('tr.torrent').each(function(i) {	// single, non-music torrents show up not in a group
			/* Find group and torrent ID */
			var group_id;
			
			var link = jQuery(this).children('td').eq(2).children('strong').eq(0).children('a:last').eq(0);
			var m = link.attr('href').match(/torrents\.php\?id=(\d+)/);
			if (m) {
				group_id = m[1];
				b.groups[group_id] = 1;
				found++;
				}
			//log (found + ". group_id:" + group_id + " - " + link.text());
		});
		bookmark_cache.serialize();
		return found;
	}

	/* Fetch and scan all pages of type, call callback when done */
	function scan_all_torrent_pages(type, page_cb, finish_cb, forced_full) {
		var page = 1;
		var total = 0;
		var lastPage = 0;

		function request_url() {
			if (type == 'bookmark')
				return '/bookmarks.php?type=torrents';
			else
				return '/torrents.php?type='+type+'&userid='+ggn_id+'&page='+page;
		}

		function error_handler(response, reason) {
			status.contents().append('<div><span style="color: red;">Error:</span> Unable to fetch '+type+' page '+page+' ('+reason+')</div>');
			status.show();
			finish_cb(total);
		}

		function page_handler(response) {
			if (response.status == 200) {
				//pageText = response.responseText.replace(/collageShow.*\);/g,";");
				//log (pageText);
				//var doc = jQuery(new DOMParser().parseFromString(pageText, 'text/xml'));
				var doc = document.implementation.createHTMLDocument('');
				doc.documentElement.innerHTML = response.responseText; //.replace(/<head>[\s\S]*<\/head>/,"<head><\/head>");
				
				page_cb(type, page);
				
				if (forced_full == 1) {
					lastPage = 1;
					jQuery(doc).find('#content .linkbox').eq(0).find('a').last().each(function(i) {
						var href = jQuery(this).attr('href');
						var pgVal = href.match(/torrents\.php\?page=(\d+)&type/);
						lastPage = pgVal[1];
					});
				}
				if (type == 'bookmark') {
					//log(doc); // There's a big <script> block that appears right before the torrent_table. This causes the XML parser fits, so we are just removing it up above
					var found = scan_bookmark_page(doc);
					}
				else
					var found = scan_torrent_page(doc, type);
				total += found;
				if ((found == 0 && forced_full == 0) || (forced_full == 1 && page >= lastPage) || (type == 'bookmark')) { finish_cb(type, total); return; } /* End of asynchronous chain */

				page += 1;
				ggn_proxy.get({ url: request_url(), callback: page_handler, error: error_handler });
			} else {
				error_handler(response, 'HTTP '+response.status);
			}
		}

		ggn_proxy.get({ url: request_url(), callback: page_handler, error: error_handler });
	}

	GM_falsifiedMenuCom = [];
	var hasPageGMloaded = false;

	/* Reset command */
	GM_registerMenuCommand('GGn Snatched: Reset Snatched', function() { snatch_cache.clear(); bookmark_cache.clear(); GM_setValue('last_update', '0'); GM_setValue('full_update','1'); GM_setValue('fullUpdateStarted','1'); location.reload(); });
	/* Update w/o clear */
	GM_registerMenuCommand('GGn Snatched: Update', function() { GM_setValue('last_update', '0'); GM_setValue('full_update','1'); GM_setValue('force_all','1'); GM_setValue('fullUpdateStarted','1'); location.reload(); });
	
	/* Register menu command to enter custom style */
	var custom_style = GM_getValue('custom_style', DEFAULT_STYLE);
	GM_registerMenuCommand('GGn Snatched: Enter custom style...', function() {
		var style = window.prompt('Enter CSS style (or blank to clear & use default)\nClasses: .group_snatched, .snatched, .uploaded, .leeching, .seeding', custom_style);
		if (style && style!=DEFAULT_STYLE) {
			GM_setValue('custom_style', style);
			location.reload();
		} else if (style == '') {
			GM_deleteValue('custom_style');
			location.reload();
		}
	});
	
	if( ! /firefox/i.test(navigator.userAgent) )
		doGMMenu();

	/* Inject CSS style */
	GM_addStyle(custom_style);
	GM_addStyle(HEADER_STYLE);

	/* Mark all links to torrents that are snatched/uploaded/leeching/seeding/bookmarked */
	function mark_snatched_links() {
		var d = snatch_cache.unserialize();
		var b = bookmark_cache.unserialize();

		/* Go through all links */
		jQuery('#content').find('a').each(function(i) {
			var href = jQuery(this).attr('href');
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
						(!torrent_id || !jQuery(this).parent().parent().is('.group_torrent')) && !jQuery(this).is('.post_id')) {
					jQuery(this).addClass('group_snatched');
				}
				if (group_id && b.groups[group_id] && !(/gazellegames\.net\/bookmarks\.php/.test(document.URL)) &&
						!(/gazellegames\.net\/user\.php/.test(document.URL)) &&
						(!torrent_id || !jQuery(this).parent().parent().is('.group_torrent')) && !jQuery(this).is('.post_id')) {
					jQuery(this).addClass('bookmarked');
				}
				if (torrent_id && d.torrents[torrent_id]) {
					if (jQuery(this).parent().parent().parent().is('tr.group_torrent')) {
						console.log("SPAN")
						jQuery(this).parent().next().addClass(d.torrents[torrent_id].ty);
					} else {
						jQuery(this).addClass(d.torrents[torrent_id].ty);
					}
					if (d.torrents[torrent_id].sd) jQuery(this).addClass('seeding snatched');	// we're really just marking seeding here, but you can't seed if you haven't snatched so adding that class as well
				}

				/* Change text if text is url */
				if (('/'+jQuery(this).text()) == jQuery(this).attr('href')
					&& group_id && d.groups[group_id] && d.groups[group_id].nm) {
					jQuery(this).text(d.groups[group_id].nm);
				}
			}
		});

		/* Mark links on album page in torrent table */
		if (/gazellegames\.net\/torrents\.php/.test(document.URL)) {
			/* Parse search */
			var search = {};
			var search_list = document.location.search.substring(1).split('&');
			for (var i = 0; i < search_list.length; i++) {
				var pair = search_list[i].split('=');
				search[pair[0]] = pair[1];
			}

			if (search.id) {
				/* Album page */
				jQuery('#content .torrent_table:first tr.group_torrent').each(function(i) {
					/* Find torrent id */
					var torrent_id;
					jQuery(this).children('td').eq(0).children('span').eq(0).children('a').each(function(i) {
						var href = jQuery(this).attr('href');
						if (href) {
							var m = href.match(/torrents\.php\?torrentid=(\d+)/);
							if (m) {
								torrent_id = m[1];
								jQuery(this).removeClass('group_snatched snatched uploaded leeching seeding');
								return false;
							}
						}
					});

					if (torrent_id && d.torrents[torrent_id]) {
						var link = jQuery(this).children('td').eq(0).children('a').eq(0);
						link.addClass(d.torrents[torrent_id].ty);
						if (d.torrents[torrent_id].sd) link.addClass('seeding snatched');	// we're really just marking seeding here, but you can't seed if you haven't snatched so setting that class too
					}
				});
			}
		}
		
		/* Show bookmark link on bookmarked album page */
		if (/gazellegames\.net\/torrents\.php\?id/.test(document.URL)) {
			var albumName = jQuery('#content > .thin > h2 > span').eq(0);
			if (albumName) {
				var m = document.URL.match(/torrents\.php\?id=(\d+)/);
				if (m) {
					group_id = m[1];
					if (b.groups[group_id])
						albumName.addClass('bookmarked');
				}
			}
		}
	}

	/* Mark torrent as leeching when download link is clicked */
	function mark_download_links() {
		jQuery('#content').find('a').each(function(i) {
			var href = jQuery(this).attr('href');
			if (href) {
				/* Find download links */
				var m = href.match(/torrents\.php\?action=download&id=(\d+)/);
				if (m) {
					var torrent_id = m[1];
					jQuery(this).click(function(event) {
						var d = snatch_cache.unserialize();
						d.torrents[torrent_id] = { ty: 'leeching', sd: 0 };
						snatch_cache.serialize();
						mark_snatched_links();
					});
				}
			}
		});
	}

	function mark_bookmark_links() {
		jQuery('#content').find('a').each(function(i) {
			var id = jQuery(this).attr('id');
			if (id) {
				/* Find download links */
				var m = id.match(/bookmarklink_torrent_(\d+)/);
				if (m) {
					//log (m);
					var group_id = m[1];
					jQuery(this).click(function(event) {
						if (!/remove/i.test(jQuery(this).text()) && !/unbookmark/i.test(jQuery(this).text())) {
							//log ("Bookmark");
							var b = bookmark_cache.unserialize();
							b.groups[group_id] = 1;
							bookmark_cache.serialize();
							mark_snatched_links();
						} else {
							//log ("Removing Bookmark");
							var b = bookmark_cache.unserialize();
							delete b.groups[group_id];
							bookmark_cache.serialize();
							jQuery('#content').find('a.bookmarked').each(function(i) {
								var href = jQuery(this).attr('href');
								torrentString = 'torrents.php?id='+group_id;
								if (href && href=='torrents.php?id='+group_id) {
									jQuery(this).removeClass('bookmarked');
								}
							});
							jQuery('#content > .thin > h2 > span').eq(0).removeClass('bookmarked');
						}
					});
				}
			}
		});
	}
	
	
	/* Scan current page */
	if (/gazellegames\.net\/torrents\.php/.test(document.URL)) {
		/* Parse search */
		var search = {};
		var search_list = document.location.search.substring(1).split('&');
		for (var i = 0; i < search_list.length; i++) {
			var pair = search_list[i].split('=');
			search[pair[0]] = pair[1];
		}

		var full_update = GM_getValue('full_update','0');
		
		if ((search.type == 'snatched' || search.type == 'uploaded' || search.type == 'seeding' || search.type == 'leeching') && 
				search.userid == ggn_id && full_update == 0) {
			var scan_status = $('<div>Scanning current page... <span></span></div>');
			status.contents().append(scan_status);
			status.show();
			
			/* Scan current page */
			var found = scan_torrent_page(document, search.type);
			scan_status.children('span').text('Done ('+((found > 0) ? (found+' updates found') : 'no updates found')+')');
			status.show(5000);
		}
	}
	if (/gazellegames\.net\/bookmarks\.php/.test(document.URL)) {
		var scan_status = $('<div>Scanning current page... <span></span></div>');
		status.contents().append(scan_status);
		status.show();
		
		bookmark_cache.clear();
		var found = scan_bookmark_page(document);
		
		scan_status.children('span').text(((found > 0) ? (found+' bookmarks found') : 'no bookmarks found'));
		status.show(5000);
	}

	/* Mark links */
	mark_download_links();
	mark_bookmark_links();
	mark_snatched_links();

	/* Auto update */
	var now = new Date();
	var last_update = parseInt(GM_getValue('last_update', '0'));
	var next_update = last_update + AUTO_UPDATE_INTERVAL*1000;
	var full_update = GM_getValue('full_update','0');
	var forced_full = GM_getValue('force_all','0');
	var scriptVersion = GM_getValue('script_version','0.0.0');
	if (scriptVersion != CURRENT_VERSION) {
		log("Script was recently updated to " + CURRENT_VERSION);
		// the script was recently updated
		//GM_setValue('full_update', '1');
		GM_setValue('script_version', CURRENT_VERSION);
		//GM_setValue('fullUpdateStarted','1');
		//GM_deleteValue('custom_style');		// I might have to reset this on occasion
		//GM_deleteValue('snatch_cache');			// Had to reset this due to changes in the cache structure. Will remove in a version or two.
		GM_deleteValue('serverVersion');		// we remove this just to make sure it will be properly retrieved in the future
		GM_deleteValue('lastUpdateCheck');
		location.reload();
	}
	if (full_update == 1 /*&& !(/gazellegames\.net\/torrents\.php/.test(document.URL))*/) {
		GM_deleteValue('full_update');
		GM_deleteValue('last_update');
		GM_deleteValue('force_all');
		next_update = 0;
		last_update = 0;
		}
	if (next_update < now.getTime()) {
		GM_setValue('last_update', now.getTime().toString());
		var fullUpdateFinished = GM_getValue('fullUpdateStarted', '0');
		var jobs = 5;
		var total_found = {};
		
		/* Show auto update status */
		last_update = 0;
		if (last_update == 0) {
			var update_status = {
				snatched: $('<div>Updating snatched: <span>Initializing...</span></div>'),
				uploaded: $('<div>Updating uploaded: <span>Initializing...</span></div>'),
				leeching: $('<div>Updating leeching: <span>Initializing...</span></div>'),
				seeding: $('<div>Updating seeding: <span>Initializing...</span></div>'),
				bookmark: $('<div>Updating bookmarks: <span>Initializing...</span></div>'),
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
				if (type != 'bookmark')
					update_status[type].children('span').text('Done ('+((found > 0) ? (found+' updates found') : 'no updates found')+')');
				else
					update_status[type].children('span').text('Done ('+((found > 0) ? (found+' bookmarks found') : 'no bookmarks found')+')');
			}

			jobs -= 1;
			total_found[type] = found;

			if (jobs == 0) {
				mark_snatched_links();
				if (last_update == 0) {
					var total = [];
					for (var type in total_found) 
						if (total_found[type] > 0) 
							total.push(type+': '+total_found[type]);
					status.contents().append('<div>Auto update done</div>');
					GM_deleteValue('fullUpdateStarted');
					status.show(6000);
				}
			}
		}

		/* Rescan all types of torrent lists */
		if (fullUpdateFinished == 1)
			forced_full = 1;
		scan_all_torrent_pages('snatched', scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('uploaded', scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('leeching', scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('seeding',  scan_page_handler, scan_finished_handler, forced_full);
		scan_all_torrent_pages('bookmark', scan_page_handler, scan_finished_handler, 0);
	}

	/*** Functions for Chrome ***/
	function evalJSON(src){
		return eval("("+src+")");
	};	
	function quoteString(string){
		if(string.match(_escapeable)) {
		return'"'+string.replace(_escapeable,function(a){
			var c=_meta[a];
			//log(c + " - " + string);  // this was spitting out a bunch of logged stuff whenever there was a '\' in the torrent name
			if(typeof c==='string')return c;
			c=a.charCodeAt();
			return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';
		}return'"'+string+'"';
	};
	var _escapeable=/["\\\x00-\x1f\x7f-\x9f]/g;
	var _meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};

	if( ! /firefox/i.test(navigator.userAgent)) {
		if (typeof GM_addStyle == 'undefined' ) {
			function GM_addStyle(css) {
				var head = document.getElementsByTagName('head')[0];
				if (head) {
					var style = document.createElement("style");
					style.type = "text/css";
					style.appendChild(document.createTextNode(css));
					head.appendChild(style);
				}
			}
		}
		function GM_getValue (key, defaultValue) {
			var value = window.localStorage.getItem(key);
			if (value == null) value = defaultValue;
			return value;
		}
		function GM_setValue(key, value) {
			window.localStorage.setItem( key, value );
		}
		function GM_deleteValue(key) {
			window.localStorage.removeItem( key );
		}
		

		function GM_registerMenuCommand( oText, oFunc ) {
			GM_falsifiedMenuCom[GM_falsifiedMenuCom.length] = [oText.replace("GGn Snatched: ",""),oFunc];
			//if( hasPageGMloaded ) { doGMMenu(); } //if the page has already loaded, do it now
		}

		/* This function was hacked from a generic one to work much better with GGn Snatched.
		   If you'd like to see that version it's here: http://userscripts.org/scripts/show/68559 */
		function doGMMenu() {
			if( !GM_falsifiedMenuCom.length ) { return; }
			var baz = document.createElement('div');
			for( var i = 0; GM_falsifiedMenuCom[i]; i++) {
				var bing;
				baz.appendChild(bing = document.createElement('a'));
				bing.setAttribute('href','#');
				bing.onclick = new Function('GM_falsifiedMenuCom['+i+'][1](arguments[0]);return false;');
				//bing.onmouseover = function () { this.style.textDecoration = 'underline'; };
				//bing.onmouseout = function () { this.style.textDecoration = ''; };
				bing.appendChild(document.createTextNode(GM_falsifiedMenuCom[i][0]));
				if (i+1<GM_falsifiedMenuCom.length) {
						baz.appendChild(document.createTextNode('\u00A0\u00A0' + "|" + '\u00A0\u00A0'));
					}
			}
			status.contents().append(baz);
		}

		function GM_xmlhttpRequest(details) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function() {
				var responseState = {
					responseXML:(xmlhttp.readyState==4 ? xmlhttp.responseXML : ''),
					responseText:(xmlhttp.readyState==4 ? xmlhttp.responseText : ''),
					readyState:xmlhttp.readyState,
					responseHeaders:(xmlhttp.readyState==4 ? xmlhttp.getAllResponseHeaders() : ''),
					status:(xmlhttp.readyState==4 ? xmlhttp.status : 0),
					statusText:(xmlhttp.readyState==4 ? xmlhttp.statusText : '')
				}
				if (details["onreadystatechange"]) {
					details["onreadystatechange"](responseState);
				}
				if (xmlhttp.readyState==4) {
					if (details["onload"] && xmlhttp.status>=200 && xmlhttp.status<300) {
						details["onload"](responseState);
					}
					if (details["onerror"] && (xmlhttp.status<200 || xmlhttp.status>=300)) {
						details["onerror"](responseState);
					}
				}
			}
			try {
			  //cannot do cross domain
			  xmlhttp.open(details.method, details.url);
			} catch(e) {
			  if( details["onerror"] ) {
				//simulate a real error
				details["onerror"]({responseXML:'',responseText:'',readyState:4,responseHeaders:'',status:403,statusText:'Forbidden'});
			  }
			  return;
			}
			if (details.headers) {
				for (var prop in details.headers) {
					xmlhttp.setRequestHeader(prop, details.headers[prop]);
				}
			}
			xmlhttp.send((typeof(details.data)!='undefined')?details.data:null);
		}
		function GM_log(message) { 
			console.log(message); 
		}
	}
	jQuery.noConflict();
}
// load jQuery and execute the main function
if( /opera/i.test(navigator.userAgent)) {
	console.log("GGn Snatched: If this script is not working in Opera, make sure the filename ends in user.js");
	addJQuery(main);
}
else if( ! /firefox/i.test(navigator.userAgent) ) {	// chrome and safari
	addJQuery(main);
	}
else {
	this.$ = this.jQuery = jQuery.noConflict(true);
	main();
}
}
