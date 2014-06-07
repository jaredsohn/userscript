// ==UserScript==
// @id             whatcd-better-add-format
// @name           What.CD : Add Format
// @version        2.1
// @namespace      hateradio)))
// @author         hateradio
// @description    Add Format links appear in Better.php and Artist.php
// @include        http*://*what.cd/better.php*
// @include        http*://*what.cd/artist.php*
// @date           14 Feb 2012
// @since          18 Dec 2011
// ==/UserScript==

var gm_better = {
	path:document.location.pathname.substring(1).replace('.php',''),
	route:function(){
		var p;
		switch(this.path){
			case 'artist': p = '.group a[href^="torrents.php?id="]'; break;
			case 'better': p = '#content .thin table a[href*="torrents.php?id="]'; break;
			default: return false;
		}
		this.a = document.querySelectorAll(p);
		this.go();
	},
	go:function(){
		var a, p, i = this.a.length, l, f, s;
		while(i--){
			a = this.a[i];
			if(/id\=(\d+)/.test(a.href)){
				p = a.parentNode;
				f = document.createDocumentFragment();
				l = document.createElement('a');
				l.href = '/upload.php?groupid='+RegExp.lastParen;
				l.textContent = 'AF';
				l.title = 'Add Format';
				f.appendChild(document.createTextNode(' ['));
				f.appendChild(l);
				f.appendChild(document.createTextNode(']'));
				s = this.path === 'artist' ? a.nextElementSibling : a.nextElementSibling.nextElementSibling;
				p.insertBefore(f,s);
			}
		}
	}
};

gm_better.route();