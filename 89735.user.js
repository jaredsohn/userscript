// ==UserScript==
// @name           Battle.Net Forum Select Drop Down Box
// @description    Adds a forum select drop down box to the new battle.net forums (wow & sc2) until they fix it themselves.
// @author         lenvik
// @include        http://*.battle.net/*/*/forum/*
// @version        0.000000000000000000000000000004
// ==/UserScript==

if (window.location.href.match("/([^.]*).battle.net\/([^/]*)\/([^/]*)\/forum\/(.*)/")) {
	alistreq = new XMLHttpRequest();
	alistreq.onreadystatechange = function() {
		if (alistreq.readyState == 4) {
			if (alistreq.status == 200) { 
				alistsrc = alistreq.responseXML 
				alist = alistsrc.getElementsByClassName('forum-link');
				selboxstr = '<select onchange="if (this.value != \'\') { window.location = this.value }"><option value="">Jump to a Forum:</option>';
				for (x in alist) {
					if (x<=(alist.length)) {
						selboxstr = selboxstr + '<option value="' + alist[x].href + '">' + alist[x].children[1].children[0].innerHTML.match(/(.*)/ig)[1] + '</option>';
					}
				};
				selboxstr = selboxstr + '</select>';
				newEl = document.createElement('form');
				newEl.innerHTML = selboxstr;
				document.getElementById('forum-content').insertBefore(newEl, document.getElementById('forum-content').firstChild);
				newEl2 = newEl.cloneNode(true);
				document.getElementById('forum-content').appendChild(newEl2);
			}
		}
	}

	alistreq.open('GET', 'http://' + window.location.hostname.split('.')[0] + '.battle.net/' + window.location.pathname.split('/')[1] + '/' + window.location.pathname.split('/')[2] + '/forum/');
	alistreq.send(null);
}
