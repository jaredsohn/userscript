// ==UserScript==
// @name           Assembla Agile Planner Tweaks
// @namespace      http://userscripts.org/user/geary
// @description    Replace Agile Planner pulsing effect with a less annoying version
// @include        http://*.assembla.com/spaces/tickets/agile_planner/*
// @include        https://*.assembla.com/spaces/tickets/agile_planner/*
// ==/UserScript==

(function() {
	
	function run( code ) {
		if( typeof code == 'function' ) code = '(' + code + ')()';
		
		var script = document.createElement( 'script' );
		script.type = 'application/javascript';
		script.textContent = code;
		document.body.appendChild( script );
		document.body.removeChild( script );
	}
	
	run( function() {
		
		fixPulsate();
		
		function fixPulsate() {
			Effect._GearyLabs_Pulsate = Effect.Pulsate;
			Effect.Pulsate = function( element, options ) {
				options = Object.extend( Object.clone(options), {
					duration: 1,
					pulses: 2
				});
				return Effect._GearyLabs_Pulsate( element, options );
			};
		}
		
	});
	
})();
