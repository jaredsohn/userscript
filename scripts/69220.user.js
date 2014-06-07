// ==UserScript==
// @name           Kongregate Mouseover API Checker
// @namespace      tag://kongregate
// @description    When mouseovering a game in the game browser, this script checks if that game has API.
// @include        http://www.kongregate.com/games
// @include        http://www.kongregate.com/games/
// @include        http://www.kongregate.com/games?*
// @include        http://www.kongregate.com/top-rated-games*
// @include        http://www.kongregate.com/strategy-defense-games*
// @include        http://www.kongregate.com/adventure-rpg-games*
// @include        http://www.kongregate.com/shooter-games*
// @include        http://www.kongregate.com/puzzle-games*
// @include        http://www.kongregate.com/action-games*
// @include        http://www.kongregate.com/sports-racing-games*
// @include        http://www.kongregate.com/multiplayer-games*
// @include        http://www.kongregate.com/more-games*
// @include        http://www.kongregate.com/game_groups/*
// @include        http://www.kongregate.com/top-rated-games*
// @include        http://www.kongregate.com/my_favorites*
// @include        http://www.kongregate.com/accounts/*/favorites
// @include        http://www.kongregate.com/recommended-games
// @exclude        http://www.kongregate.com/games/*/*
// @author         Ventero
// @version        1.2
// @date           03.11.2012
// ==/UserScript==

// Written by Ventero (http://www.kongregate.com/accounts/Ventero), 02/17/10
// Copyright (c) 2010-2012 Ventero, licensed under MIT/X11 license
// http://www.opensource.org/licenses/mit-license.php
// Thanks to musicdemon for the idea of writing this

var cache = {};

function checkAPI(gameNode){
	var URL = gameNode.querySelector("a").href;
	if(cache[URL]) return;
	cache[URL] = 1

	var target = gameNode.querySelector(".thumb dd");
	var apiNode = document.createElement("div");

	apiNode.style.cssFloat = "left";
	apiNode.style.backgroundColor = "#f0f0f0";
	apiNode.style.border = "1px solid rgb(51,51,51)";
	apiNode.style.marginLeft = "2px";
	apiNode.style.marginRight = "2px";
	apiNode.style.marginTop = "-27px";
	apiNode.style.minWidth = "70px";
	apiNode.innerHTML = "Checking..."
	target.appendChild(apiNode);

	var xhr = new XMLHttpRequest();
	xhr.onload = function(){
		if(xhr.readyState == 4 && xhr.status < 400){
			var matchValues = xhr.responseText.match(/new\s+Holodeck\(([^\)]+)\)/);
			if(matchValues){
				if(/"statistics":\[[^\]]+/.test(matchValues[1])){
					if(/accomplishment_tasks":\[[^\]]/.test(matchValues[1])){
						apiNode.innerHTML = "Badges";
						apiNode.style.color = "#0000ff";
					} else {
						apiNode.innerHTML = "API";
						apiNode.style.color = "#00ff00";
					}
				} else {
					apiNode.innerHTML = "No API";
					apiNode.style.color = "#ff0000";
				}
				if(/shared_content_type_names":\[[^\]]/.test(matchValues[1])){
					apiNode.style.marginTop = "-40px";
					apiNode.innerHTML += "<br/>(User content)";
				}
			}
		}
	}

	xhr.open("GET", URL, true);
	xhr.send("");
}

var games = document.getElementsByClassName("game media");

for(i = 0; i < games.length; i++){
	games[i].addEventListener("mouseover", function(){checkAPI(this)}, false);
	//checkAPI(games[i]);
}
