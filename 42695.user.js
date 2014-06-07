// ==UserScript==
// @name           Woot! Off Helper
// @namespace      http://userscripts.10ninetysix.com
// @description    Refreshes the page and shows how much is left in the title bar.
// @include        http://www.woot.com/
// @include        http://woot.com/
// @include        http://www.woot.com/default.aspx
// @include        http://woot.com/default.aspx
// @version			0.6
// ==/UserScript==

$ = unsafeWindow.jQuery;

autoUpdateFromUserscriptsDotOrg({
	name: 'Woot! Off Helper',
	url: 'http://userscripts.org/scripts/source/42695.meta.js',
	version: 0.6
});

var REFRESH_TIME = 30; // Time between refreshes

// Show Total Price
var price = Number( $('div.productDescription:first > h3.price:first > span.money:first > span.amount:first').html() );
var priceString =  "$" + ( price + 5 );
$('div.productDescription:first > h3:first').html( priceString );
$('ul#shippingOptions > li:first').html( '$' + ( price * 2 + 5 ).toFixed(2) + " for 2 | $" + ( price * 3 + 5 ).toFixed(2) + " for 3" );

// Check for WootOff
if ( unsafeWindow.isWootOff )
{		
	// Get Remaining percent
	var percent = Math.round( $('div.wootOffProgressBarValue:first').width() / $('div.wootOffProgressBar:first').width() * 100 );
	
	// Set Title
	var newTitle;
	if ( isNaN( percent ) ) newTitle = "Sold Out!";
	else newTitle = percent + "%";
	
	newTitle += " - " + $('div.productDescription:first > h2:first').html();

	document.title = newTitle;
	
	// Display percentage on page
	var displayPercent = isNaN( percent ) ? '0' : percent.toString();
	$('<dt>Amount Left:</dt><dd>' + displayPercent + '&#37;</dd>').insertBefore( $('div.productDescription:first > dl:first > dt:first') )
	
	// Determine Refresh Interval	
	if ( isNaN( percent ) ) setTimeout( refresh, 2000 );
	else setTimeout( refresh, REFRESH_TIME * 1000 );
}

function refresh() { document.location = document.location; }

// Auto Update script
function autoUpdateFromUserscriptsDotOrg( SCRIPT ) {
	// Update code from Junk Blocker: http://loonyone.livejournal.com/
	// usage example
	// autoUpdateFromUserscriptsDotOrg({
	//   name: 'RSS+Atom Feed Subscribe Button Generator',
	//   url: 'http://userscripts.org/scripts/source/688.user.js',
	//   version: "1.2",
	// });
	try {
		if ( !GM_getValue ) return; // Older version of Greasemonkey. Can't run.
		
		// avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
		// and a script with * includes or opening a tabgrop
		var DoS_PREVENTION_TIME = 2 * 60 * 1000;
		var isSomeoneChecking = GM_getValue( 'CHECKING', null );
		var now = new Date().getTime();
		GM_setValue( 'CHECKING', now.toString() );

		if ( isSomeoneChecking && ( now - isSomeoneChecking ) < DoS_PREVENTION_TIME ) return;

		// check daily
		var ONE_DAY = 24 * 60 * 60 * 1000;
		var ONE_WEEK = 7 * ONE_DAY;
		var TWO_WEEKS = 2 * ONE_WEEK;
		var lastChecked = GM_getValue( 'LAST_CHECKED', null );
		if ( lastChecked && ( now - lastChecked ) < ONE_DAY ) return;

		GM_xmlhttpRequest({
			method: 'GET',
			url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
			onload: function( result ) {
				if ( !result.responseText.match( /@version\s+([\d\.]+)/ ) ) return;     // did not find a suitable version header

				var theOtherVersion = parseFloat( RegExp.$1 );
				if ( theOtherVersion <= parseFloat( SCRIPT.version ) ) return;      // no updates or older version on userscripts.orge site

				if ( window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n' ) ) {
					GM_openInTab( SCRIPT.url );   // better than location.replace as doing so might lose unsaved data
				}
			}
		});
		GM_setValue( 'LAST_CHECKED', now.toString() );
	} catch (ex) {}
}