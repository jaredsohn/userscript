// ==UserScript==
// @name            .Tk - Ad Frame Remover
// @namespace       http://userscripts.org/users/39650/scripts
// @description     Hide ad frame from all .tk domains
// @version         0.2
// @date            01/09/2008
// @author          Andre Gil
// @include         http*://*.tk*
// @exclude         http*://*.dot.tk*
// @exclude         http*://dot.tk*
// ==/UserScript==

(function() {

	var tkLoaded = false;

	function hideBanner() {
		frameset = document.getElementsByTagName('frameset')[0];

		if( frameset != undefined && frameset.childNodes.length == 5 ) {

			if( frameset.childNodes[1].name == "dot_tk_dashboard" && frameset.childNodes[3].name == "dot_tk_frame_content" ) {
				frameset.rows = "0,*";
			}

		} else {

			if ( !tkLoaded ) {
				window.setTimeout(function(){ hideBanner(); }, 100);
			}

		}
	}

	window.setTimeout(function(){ hideBanner(); }, 100);
	window.addEventListener( 'load', function(){ tkLoaded = true; }, true);

})();