// ==UserScript==
// @name           What.CD Advanced Buffer Calculator
// @namespace      http://jonls.dk
// @description    Show buffer in page header and on user pages.
// @author         jonls
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.1.7
// @date           2010-01-05
// ==/UserScript==

(function() {
	/* Ratio gradient */
	var RATIO_GRADIENT = [
		{ color: { r: 255, g: 0, b: 0 }, size: 0.25 },
		{ color: { r: 229, g: 178, b: 68 }, size: 0.25 },
		{ color: { r: 0, g: 255, b: 0 }, size: 0.5 },
		{ color: { r: 0, g: 125, b: 198 }, size: 0 }
	];

	var RATIO_COLORING_MODEL = function(ratio) { return ratio/2; };
	/*var RATIO_COLORING_MODEL = function(ratio) { return ((Math.log(ratio) / Math.LN2) + 1) / 2; };*/

	/* Binary size constants */
	var KiB = Math.pow(2,10);
	var MiB = Math.pow(2,20);
	var GiB = Math.pow(2,30);
	var TiB = Math.pow(2,40);
	var PiB = Math.pow(2,50);

	/* Targets to cycle through */
	var targets = [3.0, 2.0, 1.5, 1.05, 1.0, 0.95, 0.7, 0.65, 0.6, 0.5, 0.4, 0.3, 0.2, 0.15];

	/* Parse binary size string  */
	function parse_binary_size(s) {
		var s = s.split(' ');
		var amount = parseFloat(s[0].replace(/,/, ''));
		var unit = s[1];

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

	/* Return human-style date difference */
	function human_date_diff(d1, d2, threshold, elements) {
		var diff = d2.getTime() - d1.getTime();
		var e = [];

		var SECOND = 1000;
		var MINUTE = 60*SECOND;
		var HOUR = 60*MINUTE;
		var DAY = 24*HOUR;
		var WEEK = 7*DAY;
		var MONTH = 30*DAY;
		var YEAR = 365*DAY;

		if (diff < threshold) return 'Just now';

		function append_element(unit, singular, plural) {
			if (diff >= unit) {
				var v = Math.floor(diff / unit);
				e[e.length] = v+' '+(v > 1 ? plural : singular);
				diff -= v*unit;
			}
		}

		append_element(YEAR, 'year', 'years');
		append_element(MONTH, 'month', 'months');
		append_element(WEEK, 'week', 'weeks');
		append_element(DAY, 'day', 'days');
		append_element(HOUR, 'hour', 'hours');
		append_element(MINUTE, 'minute', 'minutes');

		return e.slice(0, elements).join(', ');
	}

	/* Sets the color based on the amount, similar to ratio coloring */
	function ratio_class(amount) {
		if (amount > (100*GiB)) return 'r50';
		else if (amount > (10*GiB)) return 'r20';
		else if (amount > 0) return 'r10';
		else if (amount > (-1*GiB)) return 'r05';
		return 'r00';
	}

	/* Calculate color based on model suggested by Myddraal */
	function ratio_color(ratio) {
		function interpolate(c1, c2, f) {
			return { r: c1.r+f*(c2.r-c1.r), g: c1.g+f*(c2.g-c1.g), b: c1.b+f*(c2.b-c1.b) };
		}

		function lookup_color(gradient, index) {
			var offset = 0;
			for (var i = 0; i < gradient.length; i++) {
				if (index < offset + gradient[i].size) return interpolate(gradient[i].color, gradient[i+1].color, (index-offset)/gradient[i].size);
				offset += gradient[i].size;
			}
			return gradient[gradient.length-1].color;
		}

		function color_to_hex(c) {
			var rs = Math.round(c.r).toString(16);
			if (rs.length < 2) rs = '0'+rs;
			var gs = Math.round(c.g).toString(16);
			if (gs.length < 2) gs = '0'+gs;
			var bs = Math.round(c.b).toString(16);
			if (bs.length < 2) bs = '0'+bs;
			return '#'+rs+gs+bs;
		}

		return color_to_hex(lookup_color(RATIO_GRADIENT, RATIO_COLORING_MODEL(ratio)));
	}

	/* Calculate buffer size */
	function calculate_buffer(up, down, target) {
		if ((up/down) > target) {
			return (up / target) - down;
		} else {
			return up - down*target;
		}
	}

	/* Register menu command to hide buffer in header */
	var display_in_header = GM_getValue('display_in_header', true);
	GM_registerMenuCommand('What.CD Advanced Buffer Calculator: '+(display_in_header ? 'Hide buffer in header' : 'Show buffer in header'), function() {
		GM_setValue('display_in_header', !display_in_header);
		location.reload();
	});

	/* Register menu command to change ratio coloring */
	var use_ratio_coloring = GM_getValue('ratio_coloring', false);
	GM_registerMenuCommand('What.CD Advanced Buffer Calculator: '+(use_ratio_coloring ? 'Use simple ratio coloring' : 'Use advanced ratio coloring'), function() {
		GM_setValue('ratio_coloring', !use_ratio_coloring);
		location.reload();
	});

	/* Insert buffer */
	function insert_buffer(parent, up, down, save_name) {
		var target_index = parseInt(GM_getValue(save_name+'_target_index', '4'));

		/* Append buffer stats */
		var buffer_item = $('<li>Buffer: </li>');
		var buffer_stat = $('<span></span>').addClass('stat').css('cursor', 'pointer');
		var buffer_amount = $('<span></span>');
		var buffer_extend = $('<span> / </span>').hide();
		var buffer_target = $('<span></span>').css('cursor', 'pointer');
		buffer_extend.append(buffer_target);
		buffer_stat.append(buffer_amount);
		buffer_item.append(buffer_stat).append(buffer_extend);
		parent.append(buffer_item);

		if (use_ratio_coloring) buffer_amount.css('color', ratio_color(up/down));
		else buffer_amount.addClass(ratio_class(calculate_buffer(up, down, 1.0)));

		/* Change target */
		function update_target() {
			var target = targets[target_index];
			buffer_amount.text(binary_size_string(calculate_buffer(up, down, target)));
			buffer_target.text('('+target.toFixed(2)+')');
			GM_setValue(save_name+'_target_index', target_index);
		}

		/* Set buffer text */
		update_target();

		/* Set event listeners */
		buffer_stat.click(function (event) {
			buffer_extend.toggle();
		});

		buffer_target.click(function (event) {
			target_index = (target_index + 1) % targets.length;
			update_target();
		});
	}

	/* Find stats in header */
	var header_up_string, header_down_string;
	var header_ratio_span;
	var header_req_elm;
	$('#userinfo_stats').children('li').each(function() {
		if (/Up:/.test($(this).text())) header_up_string = $(this).children('.stat').text();
		else if (/Down:/.test($(this).text())) header_down_string = $(this).children('.stat').text();
		else if (/Ratio:/.test($(this).text())) header_ratio_span = $(this).find('span > span').eq(0);
		else if (/Required:/.test($(this).text())) header_req_elm = $(this);
	});

	/* Parse size strings */
	var header_up = parse_binary_size(header_up_string);
	var header_down = parse_binary_size(header_down_string);

	/* Insert buffer in header */
	if (display_in_header) {
		/* Insert buffer */
		insert_buffer($('#userinfo_stats'), header_up, header_down, 'header');
	}

	/* Change ratio color in header */
	if (use_ratio_coloring) {
		header_ratio_span.removeClass('r00 r05 r10 r20 r50');
		header_ratio_span.css('color', ratio_color(header_up/header_down));
	}

	/* Show required as title to ratio */
	header_ratio_span.attr('title', header_req_elm.text());
	header_req_elm.remove();

	if (/what\.cd\/user\.php\?id=/.test(document.URL)) {
		/* Find stats box */
		var stats_list = $('#content .box').filter(function(i) {
			return (/Stats/.test($(this).children('.head').eq(0).text()));
		}).eq(0).children('ul').eq(0);
		
		/* Find stats */
		var user_up_item, user_down_item;
		var user_join_date, user_up_string, user_down_string;
		var ratio_span;
		stats_list.children('li').each(function (i) {
			var m;
			if (m = $(this).text().match(/Uploaded: (\d.+)/)) {
				user_up_item = $(this);
				user_up_string = m[1];
			} else if (m = $(this).text().match(/Downloaded: (\d.+)/)) {
				user_down_item = $(this);
				user_down_string = m[1];
			} else if (/Joined:/.test($(this).text())) {
				user_join_date = new Date($(this).children('span').eq(0).attr('title'));
			} else if (/Ratio:/.test($(this).text())) {
				ratio_span = $(this).children('span').eq(0);
			}
		});

		/* Parse size strings */
		var user_up = parse_binary_size(user_up_string);
		var user_down = parse_binary_size(user_down_string);

		/* Insert buffer */
		insert_buffer(stats_list, user_up, user_down, 'user');

		/* Change ratio color */
		if (use_ratio_coloring) {
			ratio_span.removeClass('r00 r05 r10 r20 r50');
			ratio_span.css('color', ratio_color(user_up/user_down));
		}

		/* Calculate average speeds */
		var time_delta = (new Date().getTime() - user_join_date.getTime()) / 1000;
		var user_up_speed = user_up / time_delta;
		var user_down_speed = user_down / time_delta;
		user_up_item.attr('title', 'Average speed: '+binary_size_string(user_up_speed)+'/s');
		user_down_item.attr('title', 'Average speed: '+binary_size_string(user_down_speed)+'/s');

		/* Calculate expected class transition date */
		function append_transition_date(amount, name) {
			var now = new Date();
			var transition = new Date(now.getTime() + (((amount / user_up) - 1) * time_delta * 1000));
			var date_string = transition.toLocaleFormat('%b %d %Y, %H:%M');
			date_string = date_string.slice(0, 1).toUpperCase() + date_string.slice(1); /* Title Case the Date String */
			var human_date_string = human_date_diff(now, transition, 3*60, 2);
			stats_list.append($('<li><span title="'+binary_size_string(amount)+'">'+name+' class</span> transition: <span title="'+date_string+'">In '+human_date_string+'</span></li>'));
		}

		if (user_up < 10*GiB) append_transition_date(10*GiB, 'Member');
		else if (user_up < 25*GiB) append_transition_date(25*GiB, 'Power User');
		else if (user_up < 100*GiB) append_transition_date(100*GiB, 'Elite');
		else if (user_up < 500*GiB) append_transition_date(500*GiB, 'TorrentMaster');
	}

	/* Insert projected ratio for downloads */
	$('.torrent_table .torrent, .torrent_table .group_torrent').children('td').each(function (i) {
		var field = $(this);
		if (/^[\d.]+ (B|KB|MB|GB|TB|PB)$/.test(field.text())) {
			var size = parse_binary_size(field.text());
			var ratio = header_up / (header_down + size);
			field.attr('title', 'Projected ratio: '+ratio.toFixed(2));
		}
	});
})();
