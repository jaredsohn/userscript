// ==UserScript==
// @name           address-name-sweeper
// @namespace      http://twitter.com/#!/hongo
// @include        https://mail.google.com/*
// @version        0.6
// @description    Delete name from email address column on Gmail
// ==/UserScript==
(function(){
	document.addEventListener('blur', sweepName, true);
	function sweepName(event){
		var inputs = document.getElementsByTagName('input');
		for(var i=0, len=inputs.length; i<len; i++) {
			if ('hidden' == inputs[i].type && ('to' == inputs[i].name || 'cc' == inputs[i].name || 'bcc' == inputs[i].name)){
				inputs[i].value = inputs[i].value.match(/[^< ,]+@[^> ,]+/g).join(', ');
			}
		}
		// for reply window
		switch(event.target.name){
			case 'to':
			case 'cc':
			case 'bcc':
				event.target.value = event.target.value.match(/[^< ,]+@[^> ,]+/g).join(', ');
			break;
		}
	}
})();
