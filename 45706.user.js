// ==UserScript==
// @name           What.CD Album Images on Artist Pages
// @namespace      http://jonls.dk
// @description    Insert album images on artist pages.
// @include        http://what.cd/artist.php?id=*
// @include        https://ssl.what.cd/artist.php?id=*
// @include        http://what.cd/torrents.php*
// @include        https://ssl.what.cd/torrents.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.3.2
// @date           2010-08-02
// ==/UserScript==

(function() {
	/* List of possible tables in artist pages (must be updated if new types are added) */
	var ARTIST_TABLES = [
		'album', 'soundtrack', 'ep', 'anthology', 'compilation', 'single',
		'live_album', 'remix', 'bootleg', 'interview', 'mixtape',
        'guest_appearance', 'remixed_by', 'unknown'
	];

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

	/* What.CD proxy */
	var whatcd_proxy = Proxy(250);

	/* Get what.CD base URL */
	var whatcd_url_base = document.URL.match(/^(https:\/\/ssl\.what\.cd|http:\/\/what\.cd)/)[1];

	/* Register menu command to hide artist collages */
	var display_artist_collage = GM_getValue('display_artist_collage', true);
	GM_registerMenuCommand('What.CD Album Images: '+(display_artist_collage ? 'Hide artist collages' : 'Show artist collages'), function() {
		GM_setValue('display_artist_collage', !display_artist_collage);
		location.reload();
	});

	/* Register menu command to show on search pages */
	var display_on_torrents_php = GM_getValue('display_on_torrents_php', false);
	GM_registerMenuCommand('What.CD Album Images: '+(display_on_torrents_php ? 'Hide in search results' : 'Show in search results'), function() {
		GM_setValue('display_on_torrents_php', !display_on_torrents_php);
		location.reload();
	});

	/* Register menu command to set artist tables to show in collage */
	var artist_collage_tables = eval(GM_getValue('artist_collage_tables', 'false')) || ARTIST_TABLES;
	GM_registerMenuCommand('What.CD Album Images: Set artist collage tables...', function() {
		var tables = window.prompt('Enter comma separated list of artist tables '+
			'to include in collage (or leave empty for default):\n'+
			'Tables: '+ARTIST_TABLES.join(', '), artist_collage_tables.join(', '));
		if (tables) {
			GM_setValue('artist_collage_tables', uneval($.map(tables.split(','), $.trim)));
			location.reload();
		} else if (tables == '') {
			GM_deleteValue('artist_collage_tables');
			location.reload();
		}
	});

	if (/what\.cd\/artist\.php\?id=/.test(document.URL)) {
		/* Transform colhead */
		$('#discog_table tr.colhead_dark').each(function(i) {
			$(this).children('td').eq(0).attr('colspan', '2').attr('width', null);
		});

		if (display_artist_collage) {
			/* Create collage */
			$('#discog_table').before('<table id="collage_table" class="collage" cellspacing="0" cellpadding="0" border="0"><tbody><tr></tr></tbody></table>');
			var collage_tr = $('#collage_table > tbody > tr');
			var groups_in_collage_row = 0;
		}

		/* Transform groups */
		for (var i = 0; i < ARTIST_TABLES.length; i++) {
			$('#torrents_'+ARTIST_TABLES[i]+' tr.group').each(function(j) {
				/* Count torrents */
				var torrents = 0;
				var elm = $(this);
				while (elm.next().hasClass('group_torrent')) {
					torrents += 1;
					elm = elm.next();
				}

				/* Modify width of text cell */
				var text_td = $(this).children('td').eq(0);
				text_td.css('width', (width-96)+'px');

				/* Parse group ID */
				var m = text_td.find('strong > a').eq(0).attr('href').match(/\?.*id=(\d+)/);
				if (m) {
					var group_id = m[1];

					/* Create ID based on group ID */
					$(this).attr('id', 'group_'+group_id);

					/* Parse title and year */
					var group_title = text_td.find('strong > a').eq(0).text();

					var add_to_collage = (artist_collage_tables.indexOf(ARTIST_TABLES[i]) != -1);
					if (display_artist_collage && add_to_collage) {
						/* Create collage entry */
						if (groups_in_collage_row == 5) {
							collage_tr = $('<tr></tr>');
							$('#collage_table > tbody').append(collage_tr);
							groups_in_collage_row = 0;
						}

						var collage_td = $('<td><a href="'+whatcd_url_base+'/torrents.php?id='+group_id+'"></a></td>');
						var collage_image = $('<img/>').attr('width', 117).attr('alt', group_title).attr('title', group_title).attr('src', whatcd_url_base+'/static/common/noartwork/music.png');
						collage_td.children('a').eq(0).append(collage_image);
						collage_tr.append(collage_td);
						groups_in_collage_row += 1;

						collage_td.children('a').eq(0).click(function(event) {
							window.location.hash = 'group_'+group_id;
							event.preventDefault();
						});
					}

					/* Calculate width */
					var width = $(this).width();

					/* Add table cell for album cover */
					var cover_td = $('<td/>').attr('rowspan', torrents+1).css({'margin': '0', 'padding': '0', 'width': '96px', 'vertical-align': 'top'});
					var cover_image = $('<img/>').attr('alt', 'Album Cover').attr('src', whatcd_url_base+'/static/common/noartwork/music.png').css('width', '96px');
					cover_td.append(cover_image);
					$(this).prepend(cover_td);

					/* Request cover image */
					whatcd_proxy.get(whatcd_url_base+'/torrents.php?id='+group_id, 'text/xml',
						function(response) {
							var doc = $(new DOMParser().parseFromString(response.responseText, 'text/xml'));

							/* Find cover box */
							var cover_box = doc.find('#content div.sidebar > div.box').filter(function(i) {
								return (/Cover/.test($(this).children('.head').eq(0).text()));
							}).eq(0);

							/* Find image */
							var image = cover_box.find('p img').eq(0).attr('src');
							if (image) {
								cover_image.attr('src', image);
								if (display_artist_collage && add_to_collage) collage_image.attr('src', image);
							}
						}
					);
				}
			});
		}

		if (display_artist_collage) {
			/* Add sentinel collage table field */
			if (groups_in_collage_row < 5) collage_tr.append('<td colspan="'+(5-groups_in_collage_row)+'"> </td>');
		}
	} else if (/what\.cd\/torrents\.php/.test(document.URL) && display_on_torrents_php) {
		/* Parse search */
		var search = {};
		var search_list = document.location.search.substring(1).split('&');
		for (var i = 0; i < search_list.length; i++) {
			var pair = search_list[i].split('=');
			search[pair[0]] = pair[1];
		}
		if (search.id) return; /* Disable on album pages */

		/* Transform groups */
		$('#torrent_table tr.group').each(function(i) {
			/* Count torrents */
			var torrents = 0;
			var elm = $(this);
			while (elm.next().hasClass('group_torrent')) {
				torrents += 1;
				elm = elm.next();
				elm.children('td').eq(0).attr('colspan', elm.children('td').eq(0).attr('colspan')-1);
			}

			/* Calculate width */
			var width = $(this).width();

			/* Modify width of text cell */
			var text_td = $(this).children('td').eq(2);
			text_td.css('width', (width-96)+'px');

			/* Remove expansion button */
			$(this).children('td').eq(0).remove();

			/* Add table cell for album cover */
			var cover_td = $('<td/>').attr('rowspan', torrents+1).css({'margin': '0', 'padding': '0', 'width': '96px', 'vertical-align': 'top'});
			var cover_image = $('<img/>').attr('alt', 'Album Cover').attr('src', whatcd_url_base+'/static/common/noartwork/music.png').css('width', '96px');
			cover_td.append(cover_image);
			$(this).prepend(cover_td);

			/* Request cover image */
			var m = text_td.find('a').eq(1).attr('href').match(/\?.*id=(\d+)/);
			if (m) {
				whatcd_proxy.get(whatcd_url_base+'/torrents.php?id='+m[1], 'text/xml',
					function(response) {
						var doc = $(new DOMParser().parseFromString(response.responseText, 'text/xml'));

						/* Find cover box */
						var cover_box = doc.find('#content div.sidebar > div.box').filter(function(i) {
							return (/Cover/.test($(this).children('.head').eq(0).text()));
						}).eq(0);

						/* Find image */
						var image = cover_box.find('p img').eq(0).attr('src');
						if (image) cover_image.attr('src', image);
					}
				);
			}
		});		
	}
})();
