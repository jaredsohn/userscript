// ==UserScript==
// @name           Reply-TO-All, not Reply-CC-All
// @namespace      http://intensivedesign.co.uk/files
// @description    Move addresses in cc: field to to: field
// @include        http*://mail.google.com/mail/*
// ==/UserScript==

	var recipient_separator = /\s*\,\s*/g;

	document.addEventListener("mousedown", function(e) {
		if (e.target.id == "snd") {
			var to = e.target.form.elements.namedItem('to');
			var cc = e.target.form.elements.namedItem('cc');
			if (cc && to) {
	 			to.value += ', ' + cc.value;
	 			cc.value = '';
	 		}
		}
	}, true);