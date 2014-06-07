// ==UserScript==
// @name           vkontakte duplicate track remover
// @namespace      http://vkontakte.ru
// @description    Removes duplicate tracks on pages containing audio on vkontakte.ru
// @include        http://vkontakte.ru/*
// ==/UserScript==

function isDuplicate(id, all) {

	var title = document.getElementById("title"+id).firstChild.nodeValue;
	var artist = document.getElementById("performer"+id).firstChild.nodeValue;
	

	
	for (var i=0; i<all.length; i++)
	{
		var item = all[i];
		if (item.title==title && item.artist==artist) return true;
	}
	
	all.push({"artist":artist, "title":title});
	
	return false;
}



function removeDuplicates() {
	var allSongs = [];

	var parent = document.getElementById("audios");   
        if (!parent) {
	    parent = document.getElementById("bigResult");
        }
	if(parent){
		var audios = parent.getElementsByTagName("div");
		re=/audio(\d+)/;
		for (var i=0;i<audios.length;i++) {
			var m = audios[i].id.match(re);
			if (!m) continue;
			var id = m[1];
			if (isDuplicate(id, allSongs)) {
				var audioDiv = document.getElementById("audio"+id);
				audioDiv.style.display="none";
				continue;
			}
		
			
		}
	}
}

removeDuplicates();
