
// ==UserScript==
// @name           HUB - Pulse Fix - app.s4
// @namespace      ExactTarget
// @include        https://app.*.exct.net/Hub/dashboard.html*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==


pulse();

function pulse(){
	if( $(".pulse-tool-noGadgets").length > 0){
		$("#pulseGadget").html("");
		$('<div id="Pulse"><img src="http://www.exacttarget.in/greasy/pulse/pulse.png"/></div>').appendTo('#pulseGadget');
	}
	else{
		window.setTimeout(pulse,500); 
	}
}	
