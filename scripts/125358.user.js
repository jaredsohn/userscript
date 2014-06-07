// ==UserScript==
// @name           Remove facebook Ads
// @namespace      remfaceads
// @version        1.3
// @author         FDisk
// @description    Remove facebook ads, layout fixes
// @include        http://www.facebook.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://usocheckup.redirectme.net/125358.js
// ==/UserScript==

GM_addStyle( '.ego_column, #rightCol { display:none !important; }' );
GM_addStyle( '.uiUfi { width: inherit }' );
GM_addStyle( '#contentArea { width: 760px !important; }' );
GM_addStyle( '.homeWiderContent .uiStreamStory { margin-left: inherit !important; }' );

$( function() {

	$( '#pagelet_reminders' ).clone( true ).prependTo("#sideNav");
	$( '#rightCol' ).remove();
	$('#contentArea').width(760);

});