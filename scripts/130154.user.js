// ==UserScript==
// @name           Gaia Online - Diedrich Detector 2012
// @namespace      com.shedosurashu.GaiaOnline.DiedrichDetector2012
// @description    Checks the page for a Diedrich offspring (all colors) and prompts the user about it.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @version        1.5
// ==/UserScript==


var _diedrichsrc = document.documentElement.innerHTML;
if (_diedrichsrc.search(/\/images\/event\/easter2012\/scav\/diedrich_head_(red|orange|yellow|green|teal|blue|purple|lavender|pink|albino|chocolate|rainbow).*\?[0-9]*/i) > 0) {
	var _diedrichcolor = (_diedrichsrc.match(/\/images\/event\/easter2012\/scav\/diedrich_head_(red|orange|yellow|green|teal|blue|purple|lavender|pink|albino|chocolate|rainbow).*\?[0-9]*/i)[1]);
	if (_diedrichsrc.search(/\/grant\?c\=(red|orange|yellow|green|teal|blue|purple|lavender|pink|albino|chocolate|rainbow)\&.*key\=easter2012\&.*nonce=([0-9\.]*)/i) > 0) {
		var _diedrichresponse=confirm("A "+_diedrichcolor+" Diedrich offspring has been detected! Grab it?");
		if (_diedrichresponse==true) {
			var _diedrichfinal = _diedrichsrc.match(/c\=(red|orange|yellow|green|teal|blue|purple|lavender|pink|albino|chocolate|rainbow)\&.*key\=easter2012\&.*nonce=([0-9\.]*)/i)[0];
			_diedrichfinal = _diedrichfinal.replace("&amp;","&");
			_diedrichfinal = _diedrichfinal.replace("&amp;","&");
			console.log(_diedrichfinal);
			window.location = ("http://www.gaiaonline.com/grant?"+_diedrichfinal+"&");
		}
	}
}