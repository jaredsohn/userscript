// ==UserScript==
// @name           Userscripts.org : A Tab for New Scripts
// @namespace      hateradio)))
// @version        1.2
// @description    This script adds an upload tab to the navigation.
// @include        http*://*userscripts.org/*
// @match          *://*.userscripts.org/*
// @homepage       https://www.userscripts.org/scripts/show/116672
// @updateURL      https://www.userscripts.org/scripts/source/116672.meta.js
// ==/UserScript==

var newtab = {
	ul:document.getElementById('mainmenu'),
	li:document.createElement('li'),
	add:function(){
		this.li.innerHTML = '<a href="/scripts/new?form=true" title="Add a new script">+</a>';
		this.ul.appendChild(this.li);
	}
};
newtab.add();