// ==UserScript==
// @id           org.userscripts.users.kuehlschrank.AddRel
// @name         Add rel
// @author       kuehlschrank
// @homepage     http://userscripts.org/users/kuehlschrank
// @description  Groundwork for inserting link relationship attributes (e.g. prev and next) based on hostname and CSS selectors.
// @version      0.1
// @date         2011-02-16
// @include      http://*
// ==/UserScript==

(function() {

	var hosts = {
		'amazon.': {'prev':'#pagnPrevLink', 'next':'#pagnNextLink'},
		'blogspot.com': {'prev':'a.blog-pager-newer-link', 'next':'a.blog-pager-older-link'},
		'oneddl.com': {'prev':'a.previouspostslink', 'next':'a.nextpostslink'}
	};

	for(var h in hosts) {
		if(hosts.hasOwnProperty(h) && window.location.hostname.indexOf(h) > -1) {
			var node = null;
			for(var r in hosts[h]) {
				if(hosts[h].hasOwnProperty(r) && (node = document.querySelector(hosts[h][r]))) {
					node.setAttribute('rel', r);
				}
			}
			break;
		}
	}

})();