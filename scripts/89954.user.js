// ==UserScript==
// @name           Kongregate Forum Voices
// @namespace      ventero.de
// @author         Ventero
// @description    Brings back the "voices" in forum threads on Kongregate
// @include        http://www.kongregate.com/forums/*
// @date           05.04.2013
// @version        0.7
// ==/UserScript==
// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 07.11.2010
// Licensed under MIT/X11 license
// Copyright (c) 2010-2013 Ventero
// http://www.opensource.org/licenses/mit-license.php

function createVoices(){
	var forum_info = $$(".forum_info")[0];
	forum_info.setStyle({overflow: "visible"});

	var sidebar = new Element("div", {
		style: "position: absolute; width: 300px; right: 0px; top: -30px;"
	}).insert(new Element("h5").update("Voices"));
	var container = sidebar.wrap(new Element("div", {
		style: "position: relative;"
	}));

	var ul = new Element("ul", {"class": "flat talking"});
	$$(".fn").map(function(ele){
		return $A(ele.down("a").getAttribute("href").split("/")).last();
	}).uniq().each(function(user){
		ul.insert(new Element("li", {"style": "display: inline-block;"}).insert(
			new Element("a", {href: "/accounts/" + user}).update(user)
		));
	});
	sidebar.insert(ul);
	forum_info.insert(container);
}

if($$(".forum_info").length){
	var s = document.createElement("script");
	s.setAttribute("type", "text/javascript");
	s.innerHTML = "(" + createVoices.toString() + ")();";
	document.body.appendChild(s);
	setTimeout(function(){document.body.removeChild(s);}, 100);
}
