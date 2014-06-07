// ==UserScript==
// @name           What.CD Lazy Load
// @namespace      http://jonls.dk
// @description    Load next page of torrents when the bottom of the page is scrolled into view.
// @include        http://what.cd/torrents.php*
// @include        https://ssl.what.cd/torrents.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.1
// @date           2009-04-02
// ==/UserScript==

(function() {
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

	/* Create proxy */
	var whatcd_proxy = Proxy(5000);

	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];

	/* Parse search */
	var search = {};
	var search_list = document.location.search.substring(1).split('&');
	for (var i = 0; i < search_list.length; i++) {
		var pair = search_list[i].split('=');
		search[pair[0]] = pair[1];
	}
	if (search.id) return; /* Disable on album pages */

	var next_page, last_page;

	/* Get next page number and last page number from document */
	function set_sequence_attributes(doc) {
		next_page = undefined;
		last_page = undefined;
		var linkbox_links = $(doc).find('#content div.linkbox').eq(0).find('a').each(function(i) {
			var m;
			if (/Next >/.test($(this).text()) && (m = $(this).attr('href').match(/\?.*page=(\d+)/))) next_page = parseInt(m[1]);
			if (/Last >>/.test($(this).text()) && (m = $(this).attr('href').match(/\?.*page=(\d+)/))) last_page = parseInt(m[1]);
		});
	}

	set_sequence_attributes(document);
	var end_element = $('#content div.linkbox').eq(1);

	/* Convert object to query string */
	function query_string(dict) {
		var a = [];
		for (var k in dict) a.push(k + '=' + dict[k]);
		return (a.length > 0 ? '?'+a.join('&') : '');
	}

	/* Listen for scroll */
	var loading = false;
	$(window).scroll(function(event) {
		var fold = $(window).height() + $(window).scrollTop();
		if (!loading && next_page && last_page && next_page <= last_page && end_element.offset().top < fold) {
			loading = true;
			var loading_div = $('<div>Loading...</div>').css({'font-size': '20pt', 'font-weight': 'bold', 'text-align': 'center'});
			end_element.after(loading_div);

			/* Request next page */
			var url = whatcd_url_base+'/torrents.php'+query_string(jQuery.extend({}, search, { page: next_page }));
			whatcd_proxy.get(url, 'text/xml',
				function(response) {
					var doc = new DOMParser().parseFromString(response.responseText, 'text/xml');
					var torrent_table = $(doc).find('#torrent_table').clone();
					var linkbox = $(doc).find('#content div.linkbox').eq(1).clone();
					loading_div.after(torrent_table);
					torrent_table.after(linkbox);
					set_sequence_attributes(doc);
					end_element = linkbox;
					loading_div.remove();
					loading = false;
				}
			);
		}
	});
})();
