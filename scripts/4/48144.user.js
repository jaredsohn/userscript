// ==UserScript==
// @name           What.CD Ratio to Spare Calculator
// @description    Show bandwidth to spare in page header
// @author         dieselz
// @namespace	   http://what.cd/user.php?id=142995
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// @version        0.1.0
// @date           2009-05-04
// ==/UserScript==

(function() {
	/* Binary size constants */
	var KiB = Math.pow(2,10);
	var MiB = Math.pow(2,20);
	var GiB = Math.pow(2,30);
	var TiB = Math.pow(2,40);
	var PiB = Math.pow(2,50);

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

	/* Sets the color based on the amount, similar to ratio coloring */
	function ratio_class(amount) {
		return amount > 0 ? 'r50' : 'r00';
	}

	/* Minimum Ratio */
	function minimum_ratio ( down ) {
		if ( down > (50*GiB) ) return 0.60;
		if ( down > (40*GiB) ) return 0.50;
		if ( down > (30*GiB) ) return 0.40;
		if ( down > (20*GiB) ) return 0.30;
		if ( down > (10*GiB) ) return 0.20;
		if ( down > (5*GiB) ) return 0.15;
		return 0;
	}

	/* Calculate To Spare */
	function to_spare ( up, down ) {
		var ratio = minimum_ratio( down );
		return up - ( down*ratio );
	}

	/* Parse Data */
	var header_up_string, header_down_string;
	$('#userinfo_stats').children('li').each(function() {
		if (/Up:/.test($(this).text())) header_up_string = $(this).children('.stat').text();
		else if (/Down:/.test($(this).text())) header_down_string = $(this).children('.stat').text();
	});

	/* Parse size strings */
	var up = parse_binary_size(header_up_string);
	var down = parse_binary_size(header_down_string);

	// console.log( 'Up: '+up+' ('+header_up_string+')' );
	// console.log( 'Down: '+down+' ('+header_down_string+')' );

	/* Show Spare */
	var spare = to_spare( up, down );
	var clean = binary_size_string( spare );
	// console.log( 'Spare: '+spare+' ('+clean+')' );

	/* Append stats */
	var item = $('<li>Spare: </li>');
	var stat = $('<span></span>').addClass('stat');
	var rc = ratio_class( spare );
	var amount = $('<span></span>').addClass(rc);
	stat.append( amount );
	item.append( stat );
	$('#userinfo_stats').append( item );
	amount.text( clean );

})();