// ==UserScript==
// @name			Reddit - Calculate the expiry date of Steam deals
// @description		Looks for a specifically formatted title in /r/steamdeals and /r/gamedeals, e.g. "X ends Tuesday 2012/11/06 10am PDT", and appends the expiry time in your local date/time format
// @author			Sarkos
// @include			http://*.reddit.com/r/steamdeals*
// @include			http://*.reddit.com/r/gamedeals*
// @include			http://*.reddit.com/user/bryanhbell*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var now = new Date();
var re = /(ends|expires)\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday),?\s*(\d\d\d\d)\/(\d\d)\/(\d\d),?\s*(\d\d?)(am|pm) (pdt|pst)/;
$( 'p.title a[href]' ).each( function () {
	var text = $( this ).html().toLowerCase();
	var result = re.exec( text );
	if (result && result.length == 9) {
		var year = parseInt( result[3], 10 );
		var month = parseInt( result[4], 10 );
		var day = parseInt( result[5], 10 );
		var hour = parseInt( result[6], 10 );
		if (result[6] == 'pm')
			hour += 12;

		var expires = new Date();
		expires.setUTCFullYear( year, month - 1, day );
		expires.setUTCHours( hour, 0, 0, 0 );

		var utcOffset = (result[8] == 'pdt' ? 7 : 8);
		expires = new Date( expires.getTime() + utcOffset * 60 * 60 * 1000 );

		if (expires < now) {
			$( this ).parent().append( '<br/><span style="color:red;font-size:small;font-style:italic;">EXPIRED</span>' );
		} else {
			var hoursLeft = parseInt( (expires.getTime() - now.getTime()) / 60 / 60 / 1000 );
			var daysLeft = parseInt( hoursLeft / 24 );
			hoursLeft -= daysLeft * 24;
			$( this ).parent().append( '<br/><span style="color:green;font-size:small;font-style:italic;">Expires in ' +
					daysLeft + ' day' + (daysLeft == 1 ? ' ' : 's ') +
					hoursLeft + ' hour' + (hoursLeft == 1 ? ' ' : 's ') +
					' at ' + expires + '</span>' );
		}
	}
} );
