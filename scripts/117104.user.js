// ==UserScript==
// @name           Cross Site Torrent Search
// @namespace      http://jonls.dk/
// @description    Cross search for requests and snatches on What.CD and Waffles.fm. Small changes made by jondb: updated the what.cd search url, added date to search results, added what.cd button in waffles request page
// @author         jonls
// @include        http://what.cd/torrents.php*
// @include        https://ssl.what.cd/torrents.php*
// @include        http://what.cd/requests.php*
// @include        https://ssl.what.cd/requests.php*
// @include        http://www.waffles.fm/requests.php*
// @include        https://www.waffles.fm/requests.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.3.4
// @date           2011-01-15
// ==/UserScript==

(function() {
	var WAFFLES_ICON_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kEGhIYNxbFvDQAAACDSURBVDjLY2RgYGBYUcf/n4EMENH0kZFlRR3/fy/vPwwMDAwM27ayMJDCXsHA/58JZtrlM78YyGEzkut8GGBiYGBg8PL+A3dWRNNHhoimjwzEimP1wtGprAzEilPfC6SyqR8LsIDCBVbU8eP3wqeT3Dg1w+RIigVkzfRJSPSPBUqzMwAxZpuO9+ZbLgAAAABJRU5ErkJggg==';
	var WHATCD_ICON_URI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/gD+AP7rGNSCAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAAQAAAAEABcxq3DAAABGElEQVQ4y+2SPW7CUBCEv316j9SEC1AEgpAgJ6CgobULjklhaiRc+QRIrqhM7TZG3pWcIrKx83OBKFutZrSjmdHC/0i7JEnSmNmA3O/3AnA4HJo+7r0njmMB8O3x+HnMcrFk9DQC4HQ6DcR2ux0AdV2T5zlJkjRxHIsDMDNmLzPEOVQN1aETADXDTHHOMX+d07r1XRYRVGuyLPsxa3o+A7DZbJBH8oeAqgLCZDJhu91K/7jtIk3TRlWRHtsJmCk0QlmWXWlfSyzLkul02qu+J1C93/HBs1qtALhcLoMI6/UbAqgaZnWHO4AQAsWtoKoqzBS17yV+4sr9XlEUN0IIDwdRFMnxeGyu1+uvD5PnebeHEIiiSPgb8wGmm3+v17vMdQAAACV0RVh0Y3JlYXRlLWRhdGUAMjAwOS0wNS0xNFQyMDo1NDozOCswMjowMM/8r/oAAAAldEVYdG1vZGlmeS1kYXRlADIwMDktMDUtMTRUMjA6NTQ6MzgrMDI6MDCQTdnOAAAAAElFTkSuQmCC';

	/* Binary size constants */
	var KiB = Math.pow(2,10);
	var MiB = Math.pow(2,20);
	var GiB = Math.pow(2,30);
	var TiB = Math.pow(2,40);
	var PiB = Math.pow(2,50);

	/* Parse binary size string  */
	function parse_binary_size(s) {
		var s = s.match(/([\d\.,]+)\s*(B|KB|MB|GB|TB|PB)/);
		var amount = parseFloat(s[1].replace(/,/, ''));
		var unit = s[2];

		if (unit == 'KB') amount *= KiB;
		else if (unit == "MB" ) amount *= MiB;
		else if (unit == "GB" ) amount *= GiB;
		else if (unit == "TB" ) amount *= TiB;
		else if (unit == "PB" ) amount *= PiB;

		return amount;
	}

	/* Convert byte size to string representation */
	function binary_size_string(amount) {
		var unit = 'B';
		if (Math.abs(amount) >= PiB) {
			amount /= PiB;
			unit = 'PB';
		} else if (Math.abs(amount) >= TiB) {
			amount /= TiB;
			unit = 'TB';
		} else if (Math.abs(amount) >= GiB) {
			amount /= GiB;
			unit = 'GB';
		} else if (Math.abs(amount) >= MiB) {
			amount /= MiB;
			unit = 'MB';
		} else if (Math.abs(amount) >= KiB) {
			amount /= KiB;
			unit = 'KB';
		}

		return amount.toFixed(2)+' '+unit;
	}

	/* Throttled proxy */
	function Proxy(delay) {
		var last_req = new Date(0);
		var queue = [];
		var processing = false;

		return {
			get: function(url, accept, callback) {
				var now = new Date();
				queue.push({ url: url, accept: accept, callback: callback });
				if (!processing) {
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
				this.do_request(req.url, req.accept, req.callback);
				processing = (queue.length > 0);
				if (processing) {
					var that = this;
					window.setTimeout(function() { that.process_queue(); }, delay);
				}
			},

			do_request: function(url, accept, callback) {
				last_req = new Date();
				GM_xmlhttpRequest({
					method: 'GET',
					url: url,
					headers: { 'User-Agent': navigator.userAgent, 'Accept': accept },
					onload: callback
				});
			}
		};
	}

	/* Search Waffles.fm */
	function search_waffles(uid, passkey, artist, torrent, callback) {
		var query = 'album:"'+torrent+'"';
		if (artist) query += ' artist:"'+artist+'"';

		var search_url = 'https://www.waffles.fm/browse.php?type=&userid=&q='+encodeURIComponent(query)+'&c=0&uid='+uid+'&passkey='+passkey+'&rss=1';
		waffles_proxy.get(search_url, 'application/rss+xml',
			function(response) {
				var doc = $(new DOMParser().parseFromString(response.responseText, 'text/xml'));
				
				var results = [];
				doc.find('channel > item').each(function(i) {
					var result = {
						text: $(this).children('title').text(),
						url: $(this).children('comments').text(),
						//jondb added date
						date: $(this).children('[nodeName=dc:date]').text()
					};
					m = $(this).children('description').text().match(/Size: (\d+)/);
					if (m) result.size = parseInt(m[1]);

					results.push(result);
				});

				var web_search_url = 'https://www.waffles.fm/browse.php?type=&userid=&q='+encodeURIComponent(query)+'&c=0';
				callback(web_search_url, results);
			}
		);
	}

	/* Waffles.fm proxy */
	var waffles_proxy = Proxy(2500);

	/* Search What.CD */
	function search_whatcd(url_base, artist, torrent, callback) {
		var search_url = url_base+'/torrents.php?action=advanced&groupname='+encodeURIComponent(torrent);
		if (artist) search_url += '&artistname='+encodeURIComponent(artist);
		whatcd_proxy.get(search_url, 'text/xml',
			function(response) {
				m = response.responseText.match(/<table [^>]*?id="torrent_table"(.|\s)*?<\/table>/);
				if (m) {
					doc = $(new DOMParser().parseFromString('<html xmlns="http://www.w3.org/1999/xhtml"><head><title></title></head><body>'+m[0].replace(/&raquo;/g, '')+'</body></html>', 'text/xml'));

					var results = [];
					doc.find('#torrent_table tr.group').each(function(i) {
						var result = {
							artist: $(this).children('td').eq(2).children('a').eq(0).text(),
							release: $(this).children('td').eq(2).children('a').eq(1).text(),
							url: $(this).children('td').eq(2).children('a').eq(1).attr('href'),
							date: $(this).children('td').eq(3).children('span').eq(0).attr('title').substr(0,11)
						};
						results.push(result);
					});

					callback(search_url, results);
				} else {
					callback(search_url, []);
				}
			}
		);
	}

	/* What.CD proxy */
	var whatcd_proxy = Proxy(2500);

	/* Initialize Waffles.fm values */
	if (!GM_getValue('waffles_uid')) {
		if (/waffles\.fm/.test(document.URL)) {
			$('#header-main a').each(function(i) {
				var m = $(this).attr('href').match(/userdetails\.php\?id=(\d+)/);
				if (m) {
					GM_setValue('waffles_uid', parseInt(m[1]));
					return false;
				}
			});
		}
	}

	GM_registerMenuCommand('Cross Site Torrent Search: Enter Waffles.fm passkey', function() {
		var key = window.prompt('Cross Site Torrent Search: Please enter your Waffles.fm passkey. It can be found in the announce URL which is displayed when you edit your profile.');
		if (key) GM_setValue('waffles_passkey', key);
	});

	/* Initialize What.CD values */
	if (!GM_getValue('whatcd_url_base')) {
		if (/^https:\/\/ssl\.what\.cd\//.test(document.URL)) GM_setValue('whatcd_url_base', 'https://ssl.what.cd');
		else if (/^http:\/\/what\.cd\//.test(document.URL)) GM_setValue('whatcd_url_base', 'http://what.cd');
	}

	if (/what\.cd\/torrents\.php/.test(document.URL)) {
		GM_registerMenuCommand('Cross Site Torrent Search: Search Waffles.fm', function() {
			var waffles_uid = GM_getValue('waffles_uid');
			if (!waffles_uid) {
				window.alert('Cross Site Torrent Search: Please visit the requests page at Waffles.fm to initialize the script.');
				return;
			}

			var waffles_passkey = GM_getValue('waffles_passkey');
			if (!waffles_passkey) {
				window.alert('Cross Site Torrent Search: Please use the user script command to set your Waffles.fm passkey.');
				return;
			}

			$('#torrent_table tr.torrent').each(function(i) {
				var row = $(this);
				var artist = row.children('td').eq(1).children('a').eq(0).text();
				var release = row.children('td').eq(1).children('a').eq(1).text();
				var size = parse_binary_size(row.children('td').eq(4).text());

				/* Snitch! workaround */
				if (row.children('td').eq(1).children('a').eq(1).children('span').text() == 'S') release = release.slice(0, -2);

				var result_span = $('<span>Loading...</span>');
				var result_div = $('<div><span style="font-weight: bold; padding-left: 18px; height: 16px; background: transparent url('+WAFFLES_ICON_URI+') no-repeat scroll left center;">Waffles.fm</span>: </div>');
				result_div.append(result_span);
				row.children('td').eq(1).append(result_div);

				search_waffles(waffles_uid, waffles_passkey, artist, release, function(search_url, results) {
					/* Check the size to find a good match */
					results.sort(function(a, b) { return Math.abs(a.size-size) - Math.abs(b.size-size); });
					if (results.length > 0) {
						if (results[0].size < 1.05*size && results[0].size > 0.95*size) {
							result_span.html('<a href="'+results[0].url+'">'+results[0].text+'</a>'+(Math.abs(results[0].size-size) < 28000 ? ' (<span class="good">Perfect match</span>)' : '')+' (<i><a href="'+search_url+'">Other results</a></i>)');
						} else {
							result_span.html('<i><a href="'+search_url+'">Results found</a></i>');
							result_div.slideUp(500);
							row.children('td').eq(1).click(function() { result_div.slideToggle(500); });
						}
					} else {
						result_span.html('Nothing found (<i><a href="'+search_url+'">Refine search</a></i>)');
						result_div.slideUp(500);
						row.children('td').eq(1).click(function() { result_div.slideToggle(500); });
					}
				});
			});
		});
	} else if (/what\.cd\/requests\.php/.test(document.URL)) {
		function requests_search_waffles() {
			$('#content table > tbody > tr.rowa, #content table > tbody > tr.rowb').each(function(i) {
				var waffles_uid = GM_getValue('waffles_uid');
				if (!waffles_uid) {
					window.alert('Cross Site Torrent Search: Please visit the requests page at Waffles.fm to initialize the script.');
					return;
				}

				var waffles_passkey = GM_getValue('waffles_passkey');
				if (!waffles_passkey) {
					window.alert('Cross Site Torrent Search: Please use the user script command to set your Waffles.fm passkey.');
					return;
				}

				var row = $(this);
				var artist = row.children('td').eq(0).children('a').eq(0).text();
				var request = row.children('td').eq(0).children('a').eq(1).text();

				/* Skip if filled */
				if (/Yes/.test(row.children('td').eq(3).text())) return;

				var result_span = $('<span>Loading...</span>');
				var result_div = $('<div><span id="waf" style="font-weight: bold; padding-left: 18px; height: 16px; background: transparent url('+WAFFLES_ICON_URI+') no-repeat scroll left center;">Waffles.fm</span>: </div>');
				result_div.append(result_span);
				row.children('td').eq(0).append(result_div);

				/* Modify request string */
				request = $.trim(request.replace(/\([^\)]*\)/g, '').replace(/\[[^\]]*\]/g, '').replace(/\bflac\b/gi, '').replace(/\bv[02]\b/gi, ''));

				search_waffles(waffles_uid, waffles_passkey, artist, request, function(search_url, results) {
					if (results.length > 0) {//jondb date
						result_div.find("#waf").text(results[0].date.substr(8,2)+'-'+results[0].date.substr(5,2)+'-'+results[0].date.substr(0,4));
						result_span.html('<a href="'+results[0].url+'">'+results[0].text+' ('+binary_size_string(results[0].size)+')</a> (<i><a href="'+search_url+'">('+(results.length-1)+')Other results</a></i>)');
					} else {
						result_span.html('Nothing found (<i><a href="'+search_url+'">Refine search</a></i>)');
						result_div.slideUp(500);
						row.children('td').eq(0).click(function(event) { result_div.slideToggle(500); });
					}
				});
			});
		}

		/* Install menu command */
		GM_registerMenuCommand('Cross Site Torrent Search: Search Waffles.fm', requests_search_waffles);

		/* Create link in linkbox */
		var search_waffles_link = $('<a href="#">[Search Waffles.fm]</a>');
		search_waffles_link.click(function(event) { requests_search_waffles(); event.preventDefault(); return false; });
		$('#content > div.thin > div.linkbox').eq(0).append(search_waffles_link);
	} else if (/waffles\.fm\/requests\.php/.test(document.URL)) {
		function requests_search_what() {
			var whatcd_url_base = GM_getValue('whatcd_url_base');
			if (!whatcd_url_base) {
				window.alert('Cross Site Torrent Search: Please visit the requests page at What.CD to initialize the script.');
				return;
			}

			$('#requesttable > tbody > tr').each(function(i) {
				if (i == 0) return; /* skip table head */

				var row = $(this);

				/* Skip if filled */
				if (/Yes/.test(row.children('td').eq(5).text())) return;

				m = row.children('td').eq(0).text().match(/(.+?) - (.+?)( \[\d{4}.*\])?\s*$/);
				if (m) {
					var artist = m[1];
					var request = m[2];

					var result_span = $('<span>Loading...</span>');
					var result_div = $('<div><span id="what" style="font-weight: bold; padding-left: 18px; height: 16px; background: transparent url('+WHATCD_ICON_URI+') no-repeat scroll left center;">What.CD</span>: </div>');
					result_div.append(result_span);
					row.children('td').eq(0).append(result_div);

					search_whatcd(whatcd_url_base, artist, request, function(search_url, results) {
						if (results.length > 0) {
							result_div.find("#what").text(results[0].date);
							result_span.html('<a href="'+whatcd_url_base+'/'+results[0].url+'">'+results[0].artist+' - '+results[0].release+'</a> (<i><a href="'+search_url+'">('+(results.length-1)+')Other results</a></i>)');
						} else {
							result_span.html('Nothing found (<i><a href="'+search_url+'">Refine search</a></i>)');
							result_div.slideUp(500);
							row.children('td').eq(0).click(function(event) { result_div.slideToggle(500); });
						}
					});
				}
			});
		};
		/* jondb Create link in linkbox */
		var search_what_link = $('<span> | </span><a href="#">Search What.cd</a>');
		search_what_link.click(function(event) { requests_search_what(); event.preventDefault(); return false; });
		$('td.embedded > div').eq(0).append(search_what_link);
		GM_registerMenuCommand('Cross Site Torrent Search: Search What.CD', requests_search_what);
	}
})();
