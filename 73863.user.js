// ==UserScript==
// @name           bonuschecker extention
// @namespace      pjmtheman
// @include		   http://cafe-world.checker.karedas.org/*
// @include		   http://farm-town.checker.karedas.org/*
// @include        http://fv.checker.karedas.org/*
// @include        http://fishville.checker.karedas.org/*
// @include        http://fish-world.checker.karedas.org/*
// @include        http://happy-aquarium.checker.karedas.org/*
// @include        http://happy-island.checker.karedas.org/*
// @include        http://happy-pets.checker.karedas.org/*
// @include		   http://mafia-wars.checker.karedas.org/*
// @include		   http://pet-society.checker.karedas.org/*
// @include		   http://petville.checker.karedas.org/*
// @include		   http://restaurant-city.checker.karedas.org/*
// @include		   http://sorority-life.checker.karedas.org/*
// @include		   http://treasure-isle.checker.karedas.org/*
// @include		   http://yoville.checker.karedas.org/*
// @include		   http://zoo-world.checker.karedas.org/*
// ==/UserScript==

window.addEventListener('load', functionMain, false);

function functionMain() {
	GM_addStyle('.cadre2{display:none} body{background:#F5F5F5}');
	
	setTimeout('\
		bovenbalk = document.getElementsByClassName("infoTemps")[0].innerHTML;\
		\
		if (document.links.length != 0) {\
			if (confirm("Are you sure to open "+document.links.length+" frames?")) {\
				inner = "";\
				for(i=0;i<document.links.length;i++) {\
					inner = inner+"<iframe style=\'width:235px;height:160px;border:1px solid black;margin:auto\' src=\'"+document.links[i].href+"\'></iframe>";\
				}\
				clear = "&clear";\
				document.body.innerHTML = "<h2>Click <a href=\'javascript:window.self.location.reload(true)\'>here to refresh</a> so you can \'clear all bonuses\' (for that you have to ignore the \'open x frames\'-popup)</h2><br />"+inner;\
				alert("Don\'t forget to \'clear all bonuses\'!")\
			}\
		}\
		else {\
		alert("No bonuses for now...")\
	}', 5000);
}