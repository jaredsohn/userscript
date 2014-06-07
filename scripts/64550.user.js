// ==UserScript==
// @name            SU V4 Double-post to groups
// @version	    	0.1
// @namespace       http://www.foresthippy.com
// @description     John
// @include         http://www.stumbleupon.com/group/*
// @license         Who knows
// ==/UserScript==

var hiddeninput = null;
var submitbtn;
var allinps = document.getElementsByTagName ('input');
var i;
for (i=0; i<allinps.length; i++) {
	if (allinps[i].type=='submit') {
		submitbtn = allinps[i];
	} else if (allinps[i].name=='edit') {
		hiddeninput = allinps[i];
	}
}

if (hiddeninput != null) {
	var textarea = document.getElementById ('posttext');
	var dpbtn = document.createElement ('button');

	dpbtn.textContent = 'Enable double-post';
	dpbtn.type = 'button';
	dpbtn.addEventListener ('click', function () {
		textarea.textContent = '';
		hiddeninput.parentNode.removeChild (hiddeninput);
		this.textContent = 'Double-post enabled';
		this.disabled = true;
		submitbtn.value = submitbtn.value.replace ('Edit','Post');
	}, false);
	
	textarea.parentNode.insertBefore (dpbtn, textarea);
}
		
