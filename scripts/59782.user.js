// ==UserScript==
// @name           Always send using BCC
// @namespace      
// @description    Move recipients in TO and CC field to BCC field, avoiding SPAM
// @include        http*://mail.google.com/mail/*
// ==/UserScript==

	document.addEventListener("mousedown", function(e) {
		if (e.target.id == "snd") {
			var to  = e.target.form.elements.namedItem('to');
			var cc  = e.target.form.elements.namedItem('cc');
			var bcc = e.target.form.elements.namedItem('bcc');
			if (to && cc && bcc) {
	 			bcc.value += ', ' + to.value + ', ' + cc.value;
	 			to.value = '';
	 			cc.value = '';
	 		}
		}
	}, true);