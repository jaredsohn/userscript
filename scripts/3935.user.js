// ==UserScript==
// @name          Show Password onMouseOver and warn
// @namespace     http://hanjo-net.de/downloads/
// @include       *
// @description	  Show password when mouseover on password field and highlight it
// ==/UserScript==
//
// Based on "Show Password onMouseOver" by "LouCypher"
// enhanced by Hanjo
//
// Changelog:
// - 20060426: First release

(function() {
	var inputs, input;
	var tmp1, tmp2, saved;
	inputs = document.evaluate(
		'//input[@type="password"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	if(!inputs.snapshotLength) return;
	for(var i = 0; i < inputs.snapshotLength; i++) {
		input = inputs.snapshotItem(i);
		input.addEventListener('mouseover', function(event) {
			if ( !saved ) {
				tmp1 = this.style.borderStyle;
				if (!tmp1)
					tmp1 = null;
				tmp2 = this.style.borderColor;
				if (!tmp2)
					tmp2 = null;
				saved = true;
			}
			this.style.borderStyle = 'solid';
			this.style.borderColor = 'red';
			this.type = 'text';
		}, false);
		input.addEventListener('mouseout', function(event) {
			this.type = 'password';
			this.style.borderStyle = tmp1;
			this.style.borderColor = tmp2;
			saved = false;
		}, false);
	}
})();


