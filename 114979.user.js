// ==UserScript==
// @name           MAL - repair list design
// @description    Repairs list design for ppl with '-' in nickname.
// @include        http://myanimelist.net/animelist/*
// @include        http://myanimelist.net/mangalist/*
// ==/UserScript==
(function(){
	document.getElementById("mal_cs_listinfo").style.whiteSpace="nowrap";
})();