// ==UserScript==
// @name           What.CD Weighted Tags and Similar Artists
// @namespace      http://jonls.dk
// @description    Change the font size of tags and similar artists according to the vote count.
// @include        http://what.cd/torrents.php?id=*
// @include        https://ssl.what.cd/torrents.php?id=*
// @include        http://what.cd/artist.php?id=*
// @include        https://ssl.what.cd/artist.php?id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.1.3
// @date           2010-01-26
// ==/UserScript==

(function() {
	/* Tag cloud */
	function create_tag_cloud(box) {
		/* Find list */
		var list = box.children('ul').eq(0);

		/* Create a sorted array */
		var items = [];
		var items_total_votes = 0;
		var re = /\d+/;
		list.children('li').each(function(i) {
			var item = {
				name: $(this).children('a').text(),
				count: parseInt($(this).children('div').text().match(re)[0]),
				elm: $(this)
			};
			items_total_votes += item.count;
			items.push(item);
		});
		items.sort(function(a, b) { return b.count - a.count; });
		
		/* Rebuild list */
		list.empty();
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var item_div = item.elm.children('div').eq(0);
			var vote_links = [];

			item_div.children('a').each(function (i) { vote_links.push($(this)); });
			item_div.empty();
			if (vote_links.length > 0) item_div.append(vote_links[0]);
			item_div.append($('<span>'+item.count+'</span>').addClass('count'));
			for (var j = 1; j < vote_links.length; j++) item_div.append(vote_links[j]);

			if (item.name == '') item.elm.children('a').html('<i>(no name)</i>');
			item.elm.children('a').attr('title', item.count + (item.count != 1 ? ' votes' : 'vote'));
			list.append(item.elm);
		}

		var items_avg_votes = items_total_votes / items.length;

		function apply_weight(enable) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var size = Math.max(1/(1.5), Math.min(item.count/items_avg_votes, 1.5));
				if (enable) {
					item.elm.children('a').css({'font-weight': 'bold', 'font-size': size+'em'});
					item.elm.children('div').children('.count').hide();
				} else {
					item.elm.children('a').css({'font-weight': null, 'font-size': null});
					item.elm.children('div').children('.count').show();
				}
			}
		}

		/* Apply weight to list */
		apply_weight(true);
		var weighted = true;

		/* Listen for toggle */
		box.children('.head').children('strong').css('cursor', 'pointer').click(function(event) {
			apply_weight(!weighted);
			weighted = !weighted;
		});
	}

	/* Artist cloud */
	function create_artist_cloud(box) {
		/* Find list */
		var list = box.children('ul').eq(0);

		/* Create a sorted array */
		var items = [];
		var items_total_votes = 0;
		list.children('li').each(function(i) {
			var item = {
				name: $(this).find('span > a').eq(0).text(),
				count: parseInt($(this).children('span').attr('title')),
				elm: $(this)
			};
			items_total_votes += item.count;
			items.push(item);
		});
		items.sort(function(a, b) { return b.count - a.count; });

		/* Rebuild list */
		list.empty();
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var item_div = item.elm.children('div').eq(0);
			var vote_links = [];

			var link = item.elm.find('span > a').eq(0);
			link.remove();
			item.elm.children('span').eq(0).before(link)
			item.elm.children('span').eq(0).remove();

			item_div.children('a').each(function (i) { vote_links.push($(this)); });
			item_div.empty();
			if (vote_links.length > 0) item_div.append(vote_links[0]);
			item_div.append($('<span>'+item.count+'</span>').addClass('count'));
			for (var j = 1; j < vote_links.length; j++) item_div.append(vote_links[j]);

			if (item.name == '') link.html('<i>(no name)</i>');
			link.attr('title', item.count + (item.count != 1 ? ' votes' : 'vote'));
			list.append(item.elm);
		}

		var items_avg_votes = items_total_votes / items.length;

		function apply_weight(enable) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var size = Math.max(1/(1.5), Math.min(item.count/items_avg_votes, 1.5));
				if (enable) {
					item.elm.children('a').css({'font-weight': 'bold', 'font-size': size+'em'});
					item.elm.children('div').children('.count').hide();
				} else {
					item.elm.children('a').css({'font-weight': null, 'font-size': null});
					item.elm.children('div').children('.count').show();
				}
			}
		}

		/* Apply weight to list */
		apply_weight(true);
		var weighted = true;

		/* Listen for toggle */
		box.children('.head').children('strong').css('cursor', 'pointer').click(function(event) {
			apply_weight(!weighted);
			weighted = !weighted;
		});
	}

	/* Artist tag cloud */
	function create_artist_tag_cloud(box) {
		/* Find list */
		var list = box.children('ul').eq(0);

		/* Create a sorted array */
		var re = /\((\d+)\)/;
		var items = [];
		var items_total_votes = 0;
		list.children('li').each(function(i) {
			console.log($(this).text());
			var item = {
				name: $(this).children('a').text(),
				count: parseInt($(this).text().match(re)[1]),
				elm: $(this)
			};
			console.log(item);
			items_total_votes += item.count;
			items.push(item);
		});
		items.sort(function(a, b) { return b.count - a.count; });

		/* Rebuild list */
		list.empty();
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var link = item.elm.children('a').eq(0);
			link.remove();

			item.elm.empty();
			item.elm.append(link);
			item.elm.append('<span class="count"> ('+item.count+')</span>');

			if (item.name == '') link.html('<i>(no name)</i>');
			link.attr('title', item.count + (item.count != 1 ? ' votes' : 'vote'));
			list.append(item.elm);
		}

		var items_avg_votes = items_total_votes / items.length;

		function apply_weight(enable) {
			for (var i = 0; i < items.length; i++) {
				var item = items[i];
				var size = Math.max(1/(1.5), Math.min(item.count/items_avg_votes, 1.5));
				if (enable) {
					item.elm.children('a').css({'font-weight': 'bold', 'font-size': size+'em'});
					item.elm.children('.count').hide();
				} else {
					item.elm.children('a').css({'font-weight': null, 'font-size': null});
					item.elm.children('.count').show();
				}
			}
		}

		/* Apply weight to list */
		apply_weight(true);
		var weighted = true;

		/* Listen for toggle */
		box.children('.head').children('strong').css('cursor', 'pointer').click(function(event) {
			apply_weight(!weighted);
			weighted = !weighted;
		});
	}
	
	if (/what\.cd\/torrents\.php\?id=/.test(document.URL)) {
		/* Create cloud for tags box */
		create_tag_cloud($('#content .box').filter(function(i) {
			return (/Tags/.test($(this).children('.head').text()));
		}).eq(0));
	} else if (/what\.cd\/artist\.php\?id=/.test(document.URL)) {
		/* Create cloud for similar artists box */
		create_artist_cloud($('#content .box').filter(function(i) {
			return (/Similar artists/.test($(this).children('.head').text()));
		}).eq(0));

		/* Create cloud for artist tags box */
		create_artist_tag_cloud($('#content .box').filter(function(i) {
			return (/Tags/.test($(this).children('.head').text()));
		}).eq(0));
	}
})();
