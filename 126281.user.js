// ==UserScript==
// @name           dA message notifications
// @namespace      http://error-unlimited.net/userscripts/deviantart
// @include        http://my.deviantart.com/messages/
// ==/UserScript==

( function( $ ) {
	var checkIntervalInSeconds = 30;

	var notificationCount = parseInt( $( '#overhead a:has(i.icon.h-icon.i3)' ).eq( 0 ).text().replace( /^\s*(\d+).*$/, '$1' ), 10 );
	if( isNaN( notificationCount ) || !isFinite( notificationCount ) ) return;
	
	var originalTitle = document.title;
	
	if( notificationCount > 0 ) {
		setTimeout( function() {
			document.title = [
				'(',
				notificationCount,
				') ',
				originalTitle
			].join( '' );
		}, 0 );
	}

	var check =
		function() {
			$.ajax( location.href, {
				success: function( data, textStatus, jqXHR ) {
					var newNotificationCount = parseInt( $( '#overhead a:has(i.icon.h-icon.i3)', data ).eq( 0 ).text().replace( /^\s*(\d+).*$/, '$1' ), 10 );
					if( isNaN( newNotificationCount ) || !isFinite( newNotificationCount ) ) return;

					if( newNotificationCount === notificationCount ) {
						setTimeout( check, checkIntervalInSeconds * 1000 );
					} else {
						document.title = [
							'(',
							newNotificationCount,
							') ',
							originalTitle
						].join( '' );
						
						location.reload();
					}
				},
				error: function() {
						location.reload();
				},
				timeout: checkIntervalInSeconds * 1000
			} );
		};
		
	setTimeout( check, checkIntervalInSeconds * 1000 );
}( unsafeWindow.jQuery ) );