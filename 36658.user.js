// ==UserScript==
// @name		Skip Useless Steps Of GWO
// @author		Erik Vold
// @datecreated	2008-10-06
// @lastupdated	2010-05-16
// @updateURL   http://userscripts.org/scripts/source/36658.user.js
// @namespace	skipUselessStepsOfGWO
// @include		https://www.google.com/analytics/siteopt/planning?*
// @include		https://www.google.com/analytics/siteopt/ab_checklist?*
// @version		1.1.1
// @description	Automatically skips past the useless steps of GWO
// ==/UserScript==

skipUselessStepsOfGWO = {};

skipUselessStepsOfGWO.setup = function(){
	function skipObject(){
		this.setup = function(){
			var locationURL = window.location + "";
			
			if( locationURL.match( /^https:\/\/www.google.com\/analytics\/siteopt\/planning\?/i ) ){
				this.skipStep0();
			}
			else if( locationURL.match( /^https:\/\/www.google.com\/analytics\/siteopt\/ab_checklist\?/i ) ){
				this.skipStep0();
			}
		};

		this.skipStep0 = function(){
			var goButton = document.getElementById('continue');
			if( goButton.disabled ){
				goButton.disabled = false;
			}

			var confirmCheckbox = document.getElementById('pre');
			if( !confirmCheckbox.checked ){
				confirmCheckbox.checked = true;
			}

			setTimeout( "document.getElementById('continue').click()", 250 );
		};
	};

	var skipObjectInstance = new skipObject();

	skipObjectInstance.setup();

};

skipUselessStepsOfGWO.setup();