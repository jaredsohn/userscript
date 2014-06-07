// ==UserScript==
// @name           IT2 - Konzern Forum Link Ingame
// @namespace      IT2-Tools
// @description    Erstellt Ingame einen Link zum Konzernforum
// @include        http://www.itycoon2.de/*
// ==/UserScript==


// Konzern Forum Link Ingame

// Forum URL muss noch eingetragen werden!!!

	var div_selection = document.getElementById('main').getElementsByTagName("ul")[1];
	var insert_before = document.getElementById('main').getElementsByTagName("ul")[1].getElementsByTagName("li")[4];

	
	var create_li = document.createElement("li");
	create_li.innerHTML = "<img alt=\"Pencil\" border=\"false\" class=\"icon\" src=\"/images/icons/pencil.png\" title=\"\" /> <a href=\"Hier die Homepage URL eintragen/\" target=\"_blank\">Konzern Forum</a>";
	div_selection.insertBefore(create_li,insert_before);
