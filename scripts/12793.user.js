// ==UserScript==
// @name           StudiVZ: Benutzerlisten: Foto-Links
// @namespace      http://markushenn.de/
// @description    Fügt zu Benutzerlisten (Freundesliste, Benutzer in einer Gruppe, Suche, ...) Links für Fotos des jeweiligen Benutzers hinzu
// @include        http://www.studivz.net/Friends/*
// @include        http://www.studivz.net/Friendslists/Details/*
// @include        http://www.studivz.net/Search/*/doSearch/1*
// @include        http://www.studivz.net/Search/GroupInviteSearch/*
// @include        http://www.studivz.net/Groups/Memberlist/*
// @include        http://www.studivz.net/Education/InMyCourse/*
// @include        http://www.schuelervz.net/Friends/*
// @include        http://www.schuelervz.net/Friendslists/Details/*
// @include        http://www.schuelervz.net/Search/*/doSearch/1*
// @include        http://www.schuelervz.net/Search/GroupInviteSearch/*
// @include        http://www.schuelervz.net/Groups/Memberlist/*
// @include        http://www.schuelervz.net/Education/InMyCourse/*
// @include        http://www.meinvz.net/Friends/*
// @include        http://www.meinvz.net/Friendslists/Details/*
// @include        http://www.meinvz.net/Search/*/doSearch/1*
// @include        http://www.meinvz.net/Search/GroupInviteSearch/*
// @include        http://www.meinvz.net/Groups/Memberlist/*
// @include        http://www.meinvz.net/Education/InMyCourse/*
// ==/UserScript==
//
// By: Markus 'voks' Henn
// Email: brezelman at yahoo de
// Last update: 2008-12-14

var tables = document.getElementsByTagName('table');
var usertable = null;
for (i = 0; i < tables.length; i++) {
	if (tables[i].getAttribute('class').indexOf('bj-usertable') != -1) {
		usertable = tables[i];
		break;
	}
}
var linkLists = usertable.getElementsByTagName('ul');

for (j = 0; j < linkLists.length; j++) {
	if (linkLists[j].getAttribute('class') == 'obj-linklist') {
		var link_first        = linkLists[j].getElementsByTagName('li')[0];                    // li
		var link_first_a_href = link_first.getElementsByTagName('a')[0].getAttribute('href');  // li > a : href
		var user_id = null;
		
		if (link_first_a_href != 'javascript:;') {
			user_id = link_first_a_href.substr(link_first_a_href.lastIndexOf('/') + 1);
		} else {
			user_id = link_first.getElementsByTagName('input')[0].getAttribute('value');
		}
		
		var insertBefore = link_first.nextSibling;
		if (insertBefore.nextSibling != null) {
			insertBefore = insertBefore.nextSibling.nextSibling.nextSibling;
		}
		
		var link_linked = document.createElement('li');
		var link_alben  = document.createElement('li');
		
		var link_linked_a = document.createElement('a');
		var link_alben_a  = document.createElement('a');
		
		var link_linked_text = document.createTextNode('Fotos: Verlinkungen');
		var link_alben_text  = document.createTextNode('Fotos: Alben');
		
		link_linked_a.setAttribute('href', '/Photos/Tags/' + user_id, 0);
		link_alben_a.setAttribute('href', '/Photos/Album/' + user_id, 0);
		
		link_linked_a.appendChild(link_linked_text);
		link_alben_a.appendChild(link_alben_text);
		
		link_linked.appendChild(link_linked_a);
		link_alben.appendChild(link_alben_a);
		
		linkLists[j].insertBefore(link_linked, insertBefore);
		linkLists[j].insertBefore(link_alben, insertBefore);
	}
}
