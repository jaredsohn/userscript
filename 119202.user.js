// ==UserScript==
// @name           Auto Kongregate API Checker
// @namespace      tag://kongregate
// @homepage       http://userscripts.org/scripts/show/119202
// @description    When on kongregate, this script checks if any games have API.
// @include        http://www.kongregate.com/*games*
// @include        http://www.kongregate.com/my_favorites*
// @include        http://www.kongregate.com/accounts/*

// @author         987456321
// @version        1.1.3
// @date           11/25/2011
// ==/UserScript==
// Written by Ventero (http://www.kongregate.com/accounts/Ventero), 02/17/10
// Added and edited some code - 987456321 (http://www.kongregate.com/accounts/987456321), Nov. 25 2011 
// Fixed includes, so it will show API on all pages (including your profile and ALL categories) Also removed auto updater, as it was preventing the script from working. Nov. 26 2011
// Licensed under CC BY-NC-SA
// http://creativecommons.org/licenses/by-nc-sa/3.0/
// Thanks to musicdemon for the idea of writing this 

var cache = {};

function checkAPI(gameNode){
	var URL = gameNode.getElementsByTagName("a")[0].href;
	if(cache[URL]) return;
	cache[URL] = 1
	
	var target = gameNode.getElementsByClassName("thumb img")[0].getElementsByTagName("dd")[0];
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
						apiNode.innerHTML = "Badged";
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

var games = document.getElementsByClassName("callout_listing");

for(i = 0; i < games.length; i++){
	//games[i].addEventListener("mouseover", function(){checkAPI(this)}, false);
	checkAPI(games[i]); //comment this line out if you uncomment the above line
}
