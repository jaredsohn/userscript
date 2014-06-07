// ==UserScript==
// @name           Ikariam Detaylı Bilgi
// @namespace      IkariamMilitaryTooltipChanger
// @author         Martynius
// @version        0.1.1
// @description    Filo da olan biten bilgileri kolayca ögrenin (www.ikariam.forumm.biz)
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @include        http://s*.ikariam.*/index.php?*view=militaryAdvisorMilitaryMovements*
// @include        http://s*.ikariam.*/index.php
// @exclude        http://support.ikariam.*/*
// @exclude        http://support.*.ikariam.*/*
//
// @history	0.1.1	Updated to show number of ships sent by other players.
// @history	0.1.0	Original Version (developed from <a href="http://userscripts.org/scripts/show/34766">Ikariam Pulldown Changer</a>).
// ==/UserScript==

if ( $("body").attr("id") != "militaryAdvisorMilitaryMovements") return;

ScriptUpdater.check( 67238 );

GM_registerMenuCommand(
		"Ikariam Military Tooltip Changer: Check for update",
		function() { ScriptUpdater.forceNotice( 67238, '0.1.1' ) }
	);

GM_addStyle(
		'div#fleetMovements div.content td		{ margin: 0px; padding: 0px; }' +
		'div.tooltip2					{ display: block; position: relative; border-width: 2px 0px 0px; left: 0px; width: 100%; margin: 1px; }' +
		'div.tooltip2 h5 				{ display: none; }' +
		'.tooltip2 div.unitBox				{ margin: 1px; }' +
		'.tooltip2 div.unitBox div.icon			{ height: 21px; margin: 1px; width: auto; padding: 1px; }' +
		'.tooltip2 div.unitBox div.icon img		{ height: 20px; margin: 0px; width: auto; }' +
		'.tooltip2 div.unitBox div.iconSmall		{ height: 21px; margin: 1px; width: auto; padding: 1px; }' +
		'.tooltip2 div.unitBox div.iconSmall img	{ height: 16px; margin: 2px 0px; width: auto; }' +
		'.tooltip2 div.unitBox div.count		{ margin: 0px; width: auto; }'

	);

const shipIcon = 'data:image/gif;base64,R0lGODlhKAAoANUAAI1RK/rmsHFLNrSokMW7nNTKqzAGA+Pbt/36x04LBEc0JhQKB5WEctmTY61ZJaWbiKxsRm0QBnBkVfXPnI5KHVUrGIsQBG1ZRlg/LaiUeoh9aJInFG89GZZnR93ClS0fFs9wOKaGaJd8XldPQoBDGzwrIIdxVqoXBGlBLseGXn9kTMKZdLxbLc+nfaFRIch+Xf/+5rAuGLSgfnpxYIVZP31vWKGNdeywfZQ5JbaSbJhcOJyQgKx8WZBvU5pzU+7mwiH5BAEAAD8ALAAAAAAoACgAAAb/wJ9wSCwWRIeicslsCm2yh3NKHQ4kpV2hyl0SZoTKYNAtCw+SQ6Hye5DN3BmZUDocBkn4VMMQFuptb3pMDzNDf3kDW4NKBBJEfzsZGjU7KhIagnoFaX47Fx8XKh0FBTg3dowHM0kDFxcoPAcBLCcTMCsvCKoaBA+YMhsnMRMIATEnCAcveXCrIwIRKTAwLSfDAQgtFtMEHs1dB5kMFhYbCNQs5SnGG+dq4FWFiyQb0gjK5TjFKRYeCDkImDFhYoiNCBE2ZEMAodyKAB4sQGAopQwPVH4QRliBzwNCHQUCuEPAI4MmKjICCOKAkEKAlzgQpowZgMePAQK5HLgRwA6B/2gIPUwIACFBAhEFACTwIOIHgZNTcgSQYaOBDqMJVgjlYdTEzwRUhbjpkmGC2RVKjfogQCBEAgMqBqA4uuhmTioPMoRQIUAAVhoDZIh4qyJDhQoaiDytcsBGIRQC5hoVICODCgMGLmj4oKDikLFTCPRQAbkvVgE2NFzAfGGEAQWlMmRY9OAukxCi+mLAcJoSBswKaHSAkKKBcR5bCuBxkkMAtMi83wqoAWqBdQEQiKfYnoIHgQKgmRAAUUEAjchGDYwYUcK69Q/Chxc3nqPFBA+2ixyAcP685NcfYMCAZQosIAAPPHRwXmQKSDDgckzooMMrr1TwgXUhvPTSABgEuP9bCSUoAOIFDFQG1RAdOMABZCOIuIACBAyFjgcleFhjiJyt0MINKwzIxAEOsOACAOdhoAAKeQ3ggQczLBCgAkZ+cGEWYzjSFBMFOODAkDokWFgGD+ygwQhO1siRByF0yMAAD4QAQQdOHNCBCy5QAIAOPbQpWw3tOWlgNgGY8AEKKlwggAMQoOSCliSQwMcONkhwoQq4KXADPi2AKIACALCQAWMQbFknDTWMacJQAUwgQgjGeEDmBwKAAEBdVORA55YSVuBDfR6kmoMHMjAwAgadOnBlFx4AsKgDJHDQKAccCNCBDgAoy4KQJKAQDxciuIAtBeCC2+i4HBzGwYlcEDAfZ6MAUNBouHZWC4AMjFgxbQc2KBdCDx344K8M2woRBAA7';

$( "div#mainview div#fleetMovements div.content table.locationEvents tbody tr:first td:eq(4)" )
	.css( 'width', '70px' );
$( "div#mainview div#fleetMovements div.content table.locationEvents tbody tr" ).each( function() {
		$( "td:eq(0)", this ).css( 'width', '25px' );
		$( "td:eq(2)", this ).each( function() {
			var that = $( this );
			var ships = that.html().match( /^\d+/ );
			if ( ships != null ) {
				$( "div.tooltip2 div.info", this ).before( '<div title="Cargo Ship" class="unitBox"><div class="icon"><img src="' + shipIcon + '"></div><div class="count">' + ships + '</div></div>' );
			}
			that	.html( that.html().replace( /^[^<]*/, '' ) )
				.mouseout( function() {
					$( "div.tooltip2", that ).css( 'display', 'block' );
				} )
				.css( 'cursor', 'auto' )
				.css( 'width', '210px' );
		} );
		$( "td:last", this ).css( 'width', '40px' );
		
		
	} ); 