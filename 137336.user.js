// ==UserScript==
// @id             org.userscripts.users.kuehlschrank.ImdbOverlappingCastAndCrew
// @name           IMDb: Overlapping Cast and Crew
// @version        2012.6.29
// @author         kuehlschrank
// @description    Highlights companies and people who appear in other IMDb tabs. Helps you to spot intersections between two projects.
// @include        http://www.imdb.com/title/*
// @include        http://akas.imdb.com/title/*
// @noframes
// ==/UserScript==

(function() {

	'use strict';

	var titleId     = window.location.pathname.match(/\/(tt\d+)\//)[1];
	var title       = document.title.match(/^(.+?)( - |$)/)[1];
	var localMap    = {};
	var foreignMaps = {};

	function init() {
		if(!parseLinkIds()) return;
	    window.addEventListener('beforeunload', onUnload, false);
	    window.addEventListener('storage', onStorage, false);
	    sendLinkIds(true);
	}

	function parseLinkIds() {
		var links = document.body.querySelectorAll('a[href*="/name/nm"], a[href*="/company/co"]');
		if(!links.length) return;
		var re = /\/([a-z]{2}\d+)\//;
		loop(links, function(a) {
			var linkId = re.exec(a.href)[1];
			if(localMap[linkId]) {
				localMap[linkId].push(a);
			} else {
				localMap[linkId] = [a];
				localMap[linkId].refCount = 0;
			}
		});
		return true;
	}

	function onStorage(e) {
		if(e.key != 'iocac') return;
 		var d = JSON.parse(e.newValue);
 		if(d.titleId == titleId) return;
 		if(d.linkIds) {
 			if(!foreignMaps[d.titleId]) {
 				foreignMaps[d.titleId] = d.linkIds;
 				foreignMaps[d.titleId].title = d.title;
 				mark(foreignMaps[d.titleId]);
 				if(d.reply) sendLinkIds();
 			}
 		} else {
 			unmark(foreignMaps[d.titleId]);
 			delete foreignMaps[d.titleId];
 		}
	}

	function sendLinkIds(reply) {
		send({titleId:titleId, title:title, linkIds:Object.keys(localMap), reply:reply});
	}

	function onUnload() {
		send({titleId:titleId});
	}

	function send(o) {
		localStorage.setItem('iocac', JSON.stringify(o));
	}

	function mark(linkIds) {
		if(!mark.styled) {
			var style = document.createElement('style');
		    style.type = 'text/css';
		    style.textContent = 'a.iocac { font-weight:bold!important; color:#BD0000!important; }';
		    document.head.appendChild(style);
		    mark.styled = true;
		}
		var t = linkIds.title;
 		loop(linkIds, function(linkId) {
			var links = localMap[linkId];
			if(!links) return;
			links.refCount++;
			loop(links, function(a) {
				a.classList.add('iocac');
				if(a.title.indexOf(t) == -1) {
					a.title = a.title ? a.title + ', ' + t : t;
				}
			});
		});
	}

	function unmark(linkIds) {
		var t = linkIds.title;
		loop(linkIds, function(linkId) {
			var links = localMap[linkId];
			if(!links) return;
			links.refCount--;
			loop(links, function(a) {
				if(links.refCount < 1) a.classList.remove('iocac');
				a.title = a.title.replace(t, '').replace(/^, |, $/g, '');
			});
		});
	}

	function loop(a, f) {
		for(var i = a.length; i--;) f(a[i]);
	}
	
	init();

})();