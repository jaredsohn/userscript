// ==UserScript==
// @id             ShareScriptToForum
// @name           Userscripts: Share The Script To A Forum
// @namespace      hateradio)))
// @author         hateradio
// @version        1.7
// @description    Creates a URL within a script's page, so that it's easily pasted into a forum.
// @homepage       http://userscripts.org/scripts/show/102869
// @updateURL      http://userscripts.org/scripts/source/102869.meta.js
// @screenshot     http://i.min.us/iltNhW.png
// @include        http*://*userscripts.org/scripts/*
// @match          *://*.userscripts.org/scripts/*
// @modified       4 May 2012
// @since          12 May 2011
// @license        Creative Commons
// @grant          none
// 2011+, hateradio
// ==/UserScript==

var f = {
	p:document.getElementById('details'),
	title:document.getElementsByTagName('h2')[0].textContent,
	getID:function(){
		if(!this.id){
			this.id = document.querySelector('a[href*="fans"]');
			this.id = this.id.href.match(/(?:fans\/(\d+))/)[1];
		}
	},
	set:function(){
		this.getID();
		var d = document.createElement('input');
		d.value = '[url=http://userscripts.org/scripts/show/'+this.id+']'+this.title+'[/url]';
		d.style.width='100%';
		d.style.border='1px solid #ccc';
		d.style.background='#ddd';
		d.style.color='#444';
		d.addEventListener('click',this.sel,false);
		this.p.appendChild(d);
	},
	sel:function(){
		try {
			GM_setClipboard(this.value);
			GM_notification('GM Forum Link Copied!');
		} finally {
			this.select();
		}
	}
};

f.set();