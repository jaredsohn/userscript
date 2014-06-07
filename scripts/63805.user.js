// ==UserScript==
// @name lh.showhidecode.js
// @description	toggle display of <pre><code> blocks in the c74 forum
// @include	http://cycling74.com/forums/*
// ==/UserScript==

function init() {
	thebody = document.getElementsByTagName('body')[0];
	all = thebody.getElementsByTagName('*');
	for (i=0; i<all.length; i++) {
		if (all[i].tagName.toLowerCase() == "pre") {
			toggle(all[i]);
		}
	}
}

toggle = function(obj) {
	var button = document.createElement('a');
	button.setAttribute('expand','[show code]');
	button.setAttribute('shrink','[hide code]');
	button.setAttribute('state',-1);
	button.innerHTML = '[hide code]';
        obj.insertBefore(button,obj.getElementsByTagName('code')[0]);
	button.addEventListener('click',function() {
		var state = -(1*this.getAttribute('state'));
		this.setAttribute('state',state);
		this.parentNode.getElementsByTagName('code')[0].style.display = state==1?'none':'block';
		this.innerHTML = this.getAttribute(state==1?'expand':'shrink');
	} ,false);
	button.click();
} 

window.addEventListener("load", init, false);