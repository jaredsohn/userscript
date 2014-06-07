// ==UserScript==
// @name           AMP Member Tracker
// @namespace      eRepublik
// @version        1.0
// @description    This will show you the amount of people in the american military party at all times
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready( function() {
	var localPageData = $("html").html();

	if( $('.user_notify').length ) {
		$('.user_notify').after( '<div class="user_notify">' + 
		'<img src="data:image/jpeg;base64,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" width="16" height="16" style="position: absolute; left:10px; top:9px;" />' + 
		'<strong id="party_member_count" style="position: absolute; left:32px; top:9px;">0</strong>&nbsp;<span style="font-size:11px;color:#9F9B9B;position:absolute;left:82px;top:9px;">Members</span>' + 
		'</div>' );
		
		$.get( 'http://www.erepublik.com/en/party/american-military-party-2721/1', function( x ) {
			var a = /<p class=\"largepadded\">\n\t\t\t\t<span class=\"field\">Members<\/span>\n\t\t\t\t<span class=\"special\">(.+?)<\/span>/g.exec( x );
			$('#party_member_count').html(a[1]);
		});
	}
});