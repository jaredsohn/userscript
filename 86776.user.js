// ==UserScript==
// @name           Animexx Gallery Notifications
// @namespace      http://frz.cc/userscripts
// @include        http://animexx.onlinewelten.com/fotos/fotoreihe.php?id=*
// @include 	   http://animexx.onlinewelten.com/fotos/*
// ==/UserScript==

/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://sam.zoy.org/wtfpl/COPYING for more details. */ 

(function($){
	function lastPathNumber(path) {
		return /\/([0-9]+)\/?$/.exec(path)[1]
	}

	var galleryId = lastPathNumber(window.document.location.pathname);
	var headingTable = $('table[style="width: 100%; background-color: #C3C3FF;"] td[style="text-align: center;"]:eq(0)');
	var page = /Seite (?:\[|)([0-9]+)(?:\]|)/.exec(headingTable.text())[1];
	galleryId = galleryId + "_" + page;
	
	var store = {};
	var picus = {};
	$('td[style="width: 200px; text-align: center; vertical-align: bottom;"] > i').each(function(index, elem) {
		var link = $(elem).parent().find("a").attr("href");
		var pictureId = lastPathNumber(link);
		picus[pictureId] = picus[pictureId] || {picu: $(elem).parent().parent()};
		
		var pictureData = store[pictureId] || {};
		var members = pictureData.members || 0;
		var comments = pictureData.comments || 0;
		
		var text = $(elem).text();
		var res = /([0-9]+) Mitglied/.exec(text);
		if (res) {
			pictureData.members = res[1];
			picus[pictureId].memberText = elem;
		}
		res = /([0-9]+) Kommentar/.exec(text);
		if (res) {
			pictureData.comments = res[1];
			picus[pictureId].commentText = elem;
		}
		store[pictureId] = pictureData;
	});
	var existingStore = JSON.parse(GM_getValue(galleryId, "{}"));

	var newComments = false;
	var newMembers = false;
	var picusToHighlight = new Array();
	for (var id in store) {
		var oldElem = existingStore[id] || {};
		var newElem = store[id];
				
		if (oldElem.members != newElem.members) {
			newMembers = true;
			picusToHighlight.push({picu: picus[id].picu, text: $(picus[id].memberText)});
		}
		if (oldElem.comments != newElem.comments) {
			newComments = true;
			picusToHighlight.push({picu: picus[id].picu, text: $(picus[id].commentText)});
		}
	}
	
	function highlight(picu, picuText) {
		picu.attr("style", "border: 2px dashed #ABC96F; ");
		picuText.attr("style", "color: #4E573C; font-weight: bold");
	}
	
	function unhighlight(picu, picuText) {
		picu.attr("style", "");
		picuText.attr("style", "");
	}
	
	function doHighlight() {
		$("html")[0].scrollTop = picusToHighlight[0].picu.offset().top - 40;
		for (var i in picusToHighlight) {
			highlight(picusToHighlight[i].picu, picusToHighlight[i].text);
		}
		$(this).slideUp("default", function(){ saveNewElem.slideDown(); });
	}
	
	function finishSession() {
		for (var i in picusToHighlight) {
			unhighlight(picusToHighlight[i].picu, picusToHighlight[i].text);
		}
		$(this).slideUp();
		GM_setValue(galleryId, JSON.stringify(store));
	}
	
	if (newMembers || newComments) {
		var saveNewElem = $('<div style="width: 700px; border: 2px solid black; background: #FBC96F; cursor: pointer; display: none">Klicken um als gesehen zu markieren</div>');
		var showNewElem = $('<div style="width: 700px; border: 2px solid black; background: #ABC96F; cursor: pointer;">' + (newMembers?'<div>Neue Mitglieder sind eingetragen</div>':'') +  (newComments?'<div>Neue Kommentare vorhanden</div>':'') + '<div>Klicke um zu markieren</div></div>');

		headingTable.append(saveNewElem);
		headingTable.append(showNewElem);
		
		saveNewElem.click(finishSession);
		showNewElem.click(doHighlight);
	}
})(unsafeWindow.$);
