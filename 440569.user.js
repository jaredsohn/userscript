// ==UserScript==
// @name           Partis Enhancement Script
// @version        1.1
// @namespace      partis
// @description    Provides various fixes and enhancement to Partis.
// @author         oғιcιr
// @include        http://*partis.si/*
// @require        http://userscripts.org/scripts/source/440569.user.js
// ==/UserScript==

$(document).ready(function(){
	
	// FUNCTIONS
	
	var currentURL = parseURL(window.top.location).path;
	
	function setCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function getCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}
	
	function parseURL(url) {
		var a =  document.createElement('a');
		a.href = url;
		return {
			source: url,
			protocol: a.protocol.replace(':',''),
			host: a.hostname,
			port: a.port,
			query: a.search,
			params: (function(){
				var ret = {},
					seg = a.search.replace(/^\?/,'').split('&'),
					len = seg.length, i = 0, s;
				for (;i<len;i++) {
					if (!seg[i]) { continue; }
					s = seg[i].split('=');
					ret[s[0]] = s[1];
				}
				return ret;
			})(),
			file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
			hash: a.hash.replace('#',''),
			path: a.pathname.replace(/^([^\/])/,'/$1'),
			relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
			segments: a.pathname.replace(/^\//,'').split('/')
		};
	}
	

	// FEATURE: DOCUMENT TITLE FIXED
	
	setNewPartisTitle = function(text) {
		document.title = text + ' :: Partis';
	}
	
	setTitleFromContent = function() {
		newTitle = document.getElementsByClassName('h11')[0].innerHTML.replace(/(<([^>]+)>)/ig, '');
		if (newTitle != '' || newTitle != null) {
			setNewPartisTitle(newTitle.replace(/\./gi, ' '));
		}
	}
	
	if (currentURL.indexOf('prva') != -1) setNewPartisTitle('Naslovnica');
	if (currentURL.indexOf('skupnost/forum') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('forums') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('topics') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('categories') != -1) setNewPartisTitle('Forum');
	if (currentURL.indexOf('edit') != -1) setNewPartisTitle('Urejanje teme');
	if (currentURL.indexOf('edit_user') != -1) setNewPartisTitle('Urejanje profila');
	if (currentURL.indexOf('skupnost/klepet') != -1) setNewPartisTitle('Klepet');
	if (currentURL.indexOf('skupnost/uporabniki') != -1) setNewPartisTitle('Seznam uporabnikov');
	if (currentURL.indexOf('skupnost/lestvice') != -1) setNewPartisTitle('Top lestvice');
	if (currentURL.indexOf('skupnost/sale') != -1) setNewPartisTitle('Šale');
	if (currentURL.indexOf('profil/posta') != -1) setNewPartisTitle('Moja pošta');
	if (currentURL.indexOf('/sporocilo') != -1) setNewPartisTitle('Novo sporočilo');
	if (currentURL.indexOf('torrent/xxxbrskaj') != -1) setNewPartisTitle('XXX');
	if (currentURL.indexOf('/brskaj') != -1) setNewPartisTitle('Seznam torrentov');
	if (currentURL.indexOf('/nalozi') != -1) setNewPartisTitle('Naloži');
	if (currentURL.indexOf('/latest') != -1) setNewPartisTitle('Novi uporabniki');
	if (currentURL.indexOf('/announce') != -1) setNewPartisTitle('Cheaters');
	if (currentURL.indexOf('/zaznamki') != -1) setNewPartisTitle('Moji zaznamki');
	if (currentURL.indexOf('/postal-bi') != -1) setNewPartisTitle('Postal bi');
	if (currentURL.indexOf('/kupon') != -1) setNewPartisTitle('Vnovči kupon');
	if (currentURL.indexOf('/podpora') != -1) setNewPartisTitle('Podpora');
	if (currentURL.indexOf('/pogoji-uporabe') != -1) setNewPartisTitle('Pogoji uporabe');
	if (currentURL.indexOf('/pravni-pouk') != -1) setNewPartisTitle('Pravni pouk');
	if (currentURL.indexOf('/vpisnovice') != -1) setNewPartisTitle('Vpis novic');
	if (currentURL.indexOf('/donacije') != -1) setNewPartisTitle('Donacije');	
	if (currentURL.indexOf('/shop') != -1) setNewPartisTitle('Partis shop');
	if (currentURL.indexOf('/oglasevanje') != -1) setNewPartisTitle('Oglaševanje');
	if (currentURL.indexOf('/osebje') != -1) setNewPartisTitle('Osebje');
	if (currentURL.indexOf('/radio') != -1) setNewPartisTitle('Partis radio');
	if (currentURL.indexOf('/press') != -1) setNewPartisTitle('Press');
	if (currentURL.indexOf('/ip') != -1) setNewPartisTitle('IP');
	if (currentURL.indexOf('/last50') != -1) setNewPartisTitle('Last50');
	if (currentURL.indexOf('/actions') != -1) setNewPartisTitle('Pregled akcij');
	if (currentURL.indexOf('/seznami2') != -1) setNewPartisTitle('Seznami 2');
	if (currentURL.indexOf('/seznami3') != -1) setNewPartisTitle('Seznami 3');
	if (currentURL.indexOf('/seznami3a') != -1) setNewPartisTitle('Seznami 3a');
	if (currentURL.indexOf('/accounts') != -1) setNewPartisTitle('Seznam računov');
	if (currentURL.indexOf('/cheaters') != -1) setNewPartisTitle('Goljufanje uporabnika');
	if (currentURL.indexOf('/categories/2') != -1) setNewPartisTitle('Računalništvo / kategorija');
	if (currentURL.indexOf('/categories/3') != -1) setNewPartisTitle('Internet');
	if (currentURL.indexOf('/categories/6') != -1) setNewPartisTitle('Mobilna tehnologija');
	if (currentURL.indexOf('/categories/4') != -1) setNewPartisTitle('Debate');
	if (currentURL.indexOf('/categories/5') != -1) setNewPartisTitle('Mali oglasi');
	if (currentURL.indexOf('/categories/1') != -1) setNewPartisTitle('partis.si ');
	if (currentURL.indexOf('/search') != -1) setNewPartisTitle('Iskanje tem');

	if (
		currentURL.indexOf('torrent/podrobno') != -1 ||
		currentURL.indexOf('profil/prikazi') != -1
	) {
		setTitleFromContent();
	}
	

});