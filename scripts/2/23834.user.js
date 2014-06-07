// ==UserScript==
// @name           Twitter char count on Facebook - Fixes
// @namespace      ruiz
// @description    Change font, color and behaviour to match Twitter site
// @include        http://apps.facebook.com/twitter/
// ==/UserScript==
var APP = 'app2231777543';
var POSITIVE = '#cccccc';
var NEGATIVE = '#D40D12';

var TEXTAREA = APP+'_status';
var txt = document.getElementById(TEXTAREA);
txt.value = "";

var COUNTER = APP+'_char_count';
var c = document.getElementById(COUNTER);
c.style.fontFamily = 'Georgia,"lucida grande",tahoma,verdana,arial,sans-serif';
c.style.color = POSITIVE;

txt.addEventListener('keyup',
	function(e) { 
		if (e.target.value.length>140) {
			c.style.color = NEGATIVE;
			return;
		}
		c.style.color = POSITIVE; 
	},
	true);
