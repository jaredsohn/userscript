// ==UserScript==
// @name			DarkPic
// @description		v0.3 Removes AdBrite's traffic-snooping/user-profiling system disguised as a image handling "service".
// @author		http://www.ruinsofmorning.net/greasemonkey/
// @include		*
// ==/UserScript==

// NOTE: This is designed to work in conjunction with your ad blocking system.
// Firefox: add "britepic.com" to the AdBlock extension (Tools > AdBlock >
//	Preferences > New Filter:).
// 	Install AdBlock here: https://addons.mozilla.org/en-US/firefox/addon/10
// Opera: add "http://*.britepic.com/*" and "http://britepic.com/*" to the
// 	Blocked Content list (Tools > Advanced > Blocked Content... > Add).

d = document;

// Get all embedded scripts //
scripts = d.getElementsByTagName('script');

// Identify BritePic scripts //
for (i in scripts) {
	if (!scripts[i].innerHTML) {continue;}
	
	// Pick up embedded script source and extract real image address //
	if (m = String(scripts[i].innerHTML).match(/britepic_src="(.*?)"/)) {
		// Build and insert new image //
		ni = d.createElement('img');
		ni.setAttribute('src', m[1]);
		scripts[i].parentNode.insertBefore(ni, scripts[i]);

		// Remove Script //
		scripts[i].parentNode.removeChild(scripts[i]);
	}

	// Remove remote script call //
	if (String(scripts[i].src).indexOf('britepic.com') >= 0) {
		scripts[i].parentNode.removeChild(scripts[i]);
	}
}
