// ==UserScript==
// @name           Kongregate Forum Voices
// @namespace      ventero.de
// @author         Ventero, BobTheCoolGuy
// @description    Brings back the "voices" in forum threads on Kongregate
// @include        http://www.kongregate.com/forums/*
// @date           30.03.2013
// @version        0.6.1
// ==/UserScript==
// Written by Ventero (http://www.kongregate.com/accounts/Ventero) 07.11.2010
// Licensed under MIT/X11 license
// Copyright (c) 2010 Ventero
// http://www.opensource.org/licenses/mit-license.php

function createVoices(){
	var sidebar = $$("div.forum_info.media.mbl").first().insert(new Element("h5").update("Voices"));
	var ul = new Element("ul", {"class": "flat talking"});
	$$(".fn").map(function(ele){
		return ele.down("a").getAttribute("href").split("/").last();
	}).uniq().each(function(user){
		ul.insert(new Element("li", {"style": "display: inline-block;"}).insert(
			new Element("a", {href: "/accounts/" + user}).update(user)
		));
	});
	sidebar.insert(ul);
}

if(document.getElementById("forum_posts")){
	var s = document.createElement("script");
	s.setAttribute("type", "text/javascript");
	s.innerHTML = "(" + createVoices.toString() + ")();";
	document.body.appendChild(s);
	setTimeout(function(){document.body.removeChild(s);}, 100);
}
