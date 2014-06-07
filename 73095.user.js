// ==UserScript==
// @name	Tweakers l33tified
// @namespace	http://www.tweakers.net
// @description	Leetify Tweakers.
// @include	http://*.tweakers.net/*
// ==/UserScript==
// ORIGINAL SCRIPT BY TWEAKERS.NET
// I DID NOT MAKE THIS, JUST TRANSFORMED IT INTO AN USERSCRIPT
// Script (C) Tweakers.net

window.make1337 = function() {
	var 	replaceChars = {a:4,e:3,g:9,l:1,o:0,s:5,t:7,z:2},
		replaceWords = {hacker:'haxor',hackt:'haxorez',gehackt:'haxored',porno:'pr0n',gewonnen:'pwned'},
		undo = false,
		now  =new Date().getTime(),
		replaceFunc = function(s) { 
			s = s.replace(/\b[a-z]+\b/ig, function(w) { 
								return w.toLowerCase() in replaceWords? replaceWords[w] : w
							});
			s = s.replace(/([ekrtw])s([ ']|$)/g,'$1z$2');
			s = s.replace(/([^a])at([ ']|$)/g,'$1@$2');
			var i = 1;
			s = s.replace(/[aeglostz]+/g, function(c){
								if(++i%2) 
									return c;
								for(var s = '', j = 0; j < c.length; j++)
									s+=replaceChars[c.charAt(j)];
									return s
								});
			return s
		},
		replace = function(root) {
			var next = root && root.firstChild;
			while( (node=next) ) {
				if(node.nodeType==3) {
					if(!is_whitespace(node.nodeValue)) {
						if(undo) {
							node.nodeValue = node.parentNode.originalValue
						} else {
							node.parentNode.originalValue = node.nodeValue;
							node.nodeValue = replaceFunc(node.nodeValue)
						};
						if(node.parentNode.nodeName == 'A' && node.parentNode.title)
							node.parentNode.title = node.nodeValue
					};
					next = node.nextSibling
				} else 
					next = node.firstChild || node.nextSibling;
				while(!next && (node=node.parentNode) !=root)
					next=node.nextSibling
			}
		},
		do_replace = function() {
			var 	items=getElementsByClassName('frontpageItem'),
				item,
				h2,
				i = 0;
			while((item = items[i++])) {
				h2=item.getElementsByTagName('h2');
				if(h2.length) {
 					h2=h2[0];
					if(h2.replaced || /(Nieuws|Reviews)/.test(h2.innerHTML)) {
						replace(h2);
						h2.replaced = true;
						item = node_after(h2)
					} else 
						continue
				};
				replace(item)
			};
			undo = !undo
		},
		set_cookie = function(time) {
			setCookie('1april',time,'/',new Date(now + 86400000))
		},
		award = document.getElementById('award');
		if(award) {
			award=first_child(award);
			if(award&&award.nodeName == 'A') {
				award.onclick = function() {
							do_replace();
							set_cookie(now);
							return false
						};
				award = award.firstChild;
				award.title = '1 april!';
				award.src = ImgURL+'g/if/v2/breadcrumb/award_20100104.png'
			}
		};
		var cookie=getCookie('1april');
		if(!cookie) {
			cookie=now+600000;
			set_cookie(cookie)
		};
		if(cookie>now)
			do_replace()
}
if(window.make1337)
	make1337();