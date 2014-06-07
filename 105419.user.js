// ==UserScript==
// @name           Gdfsgsdfhgsdfghsdgfh (gog.com)
// @namespace      http://userscripts.org/users/274735
// @description    Just for fun - relive the glory of gdfsgsdfhgsdfghsdgfh
// @include        http://www.gog.com/en/forum/*
// @exclude        http://www.gog.com/en/forum/ajax/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$("#bottomSpacer").before(
	$("<div>").css('cursor', 'pointer').text("Gdfsgsdfhgsdfghsdgfh").click(function() {
		alert('"Gog Defies Failed Security, Games Shall Definately Forever Have Gone Security DRM For Good. Haters Show Distress. For Gog , For Heavan!" - Matchstickman');
	}));