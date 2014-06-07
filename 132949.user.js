// ==UserScript==
// @name           KRUG13 Member Tracker
// @namespace      eRepublik
// @version        1.0
// @description    This will show you the amount of people in the KRUG13 party at all times
// @include        http://www.erepublik.com/*
// @include        http://economy.erepublik.com/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(document).ready( function() {
	var localPageData = $("html").html();

	if( $('.user_notify').length ) {
		$('.user_notify').after( '<div class="user_notify">' + 
		'<img src="http://static.erepublik.com/uploads/avatars/Parties/2010/08/15/326fb04c3abf030fe3f4e341f39b573f_55x55.jpg" width="16" height="16" style="position: absolute; left:10px; top:9px;" />' + 
		'<strong id="party_member_count" style="position: absolute; left:32px; top:9px;">0</strong>&nbsp;<span style="font-size:11px;color:#9F9B9B;position:absolute;left:82px;top:9px;">Members</span>' + 
		'</div>' );
		
		$.get( 'http://www.erepublik.com/en/party/krug-13--3250/1', function( x ) {
			var a = /<p class=\"largepadded\">\n\t\t\t\t<span class=\"field\">Members<\/span>\n\t\t\t\t<span class=\"special\">(.+?)<\/span>/g.exec( x );
			$('#party_member_count').html(a[1]);
		});
	}
});