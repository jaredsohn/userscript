// ==UserScript==
// @name			8BC Favs per View
// @namespace		http://userscripts.org/users/82025
// @include			http://8bc.org/music/*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==
jQuery.noConflict()(function($) {;
		var $table = $("#content .col1 table"),
			$views = $table.children("tbody").children(".views").first();
			indexes = [];
		index[$views] = $views.index();
		alert(index[$views]);
	});
});