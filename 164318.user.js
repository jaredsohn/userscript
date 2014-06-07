// ==UserScript==
// @name          Prettify-URL
// @namespace     https://danielnr.com/release-prettify-url/
// @description   Removes the ugly from some URLs, making them easier to link to other people
// @include       /https?://(www|encrypted)?\.?google\.com/(search|webhp).*/
// @run-at document-start
// @version       1.0
// ==/UserScript==

// getUrlVars from http://snipplr.com/view/19838/get-url-parameters/

function getUrlVars() {
	var vars = {};
	var parts =
		window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
		function(m,key,value) {vars[key] = value;});
	return vars;
}

/* Load current domain and scope */

domain = window.location.href.split('//')[1].split('/')[0];
scope = window.location.href.split('://')[0];
uri = window.location.href.split(domain)[1].split('#')[0].split('?')[0];

/* Google Search Support */

if ((domain == 'google.com' || domain == 'encrypted.google.com' || domain ==
	'www.google.com') && 
	(!getUrlVars()['tbm'])) {
	// Check if URL is ugly
	googleUglyParameters = [
		'hl',
		'tab',
		'output',
		'sclipnt',
		'oq',
		'gs_l',
		'pbx',
		'bav',
		'bvm',
		'fp',
		'biw',
		'bih',
		'client',
		'channel',
		'ie',
		'oe'
	];

	for(i=0;i<googleUglyParameters.length;i++) {
		if(getUrlVars()[googleUglyParameters[i]]) {
			// Paint me like one of your French girls, Jack
			window.location.href = scope + '://' + domain + 
				uri + '?q=' + getUrlVars()['q'];
		}
	}
}
