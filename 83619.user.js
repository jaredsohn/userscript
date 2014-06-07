// ==UserScript==
// @name          Kongregate played
// @description   Caches recently played games.
// @include       http://www.kongregate.com/*
// ==/UserScript==

if(typeof GM_setValue  == "undefined") {

	function GM_setValue(name, value) {
		localStorage.setItem(name, value);
	}

	function GM_getValue(name, defaultValue) {
		var value = localStorage.getItem(name);
		if(value) return value;
		else return defaultValue;
	}

	function GM_deleteValue(name) {
		localStorage.removeItem(name);
	}

}

if(location.toString().split("?")[0].split("#")[0] == "http://www.kongregate.com/accounts/"+unsafeWindow.active_user.username())
setTimeout(show, 0);
if(/^http:\/\/www\.kongregate.com\/games\/[a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+$/.test(location.toString()))
setTimeout(save, 5000);

function show() {

	var games = GM_getValue("kongregateRecentlyPlayedList", "null");
	var preferences = JSON.parse(GM_getValue("kongregateRecentlyPlayedPreferences", "{\"maxGames\":18,\"minRating\":2.75,\"registerUnrated\":false,\"autoLoad\":true}"));
	if(games == "null") return;
	var gamesList = games.split("|");
	var currentGame, firstOfPage;
	var pages = Math.floor((gamesList.length-1)/6)+1, settings, clearButton;
	var pagesList = [], currentSelectedPage = -1, currentPagePlaceHolder;
	
	var globalGamesHolder = document.getElementById("secondary");
	var insertBeforePoint = document.getElementById("cards");
	var mainGamesHolder = document.createElement("div");
	var gamesHolder = document.createElement("div");
	var recentlyPlayedTitle = document.createElement("h2");
	var recentlyPlayedPages = document.createElement("h3");

	function addGameToProfileList(name, target, imageURL, first) {
		var container_L0 = document.createElement("dl");
		container_L0.setAttribute("class", "favgame"+(first?" first":""));
		var container_L1 = document.createElement("dt");
		container_L0.appendChild(container_L1);
		var imageLink = document.createElement("a");
		imageLink.setAttribute("href", "http://www.kongregate.com/games/"+target);
		container_L1.appendChild(imageLink);
		var image = document.createElement("img");
		image.setAttribute("src", "http://cdn"+imageURL.charAt(0)+".kongregate.com/game_icons/"+imageURL.substring(1));
		image.setAttribute("alt", "Play "+name);
		image.setAttribute("width", 93);
		image.setAttribute("height", 74);
		imageLink.appendChild(image);
		var container_link = document.createElement("dd");
		container_L0.appendChild(container_link);
		var textLink = document.createElement("a");
		textLink.innerHTML = name;
		textLink.setAttribute("href", "http://www.kongregate.com/games/"+target);
		container_link.appendChild(textLink);
		gamesHolder.appendChild(container_L0);
	}
	
	function loadPage(pageIndex) {

		while(gamesHolder.childNodes.length)
		gamesHolder.removeChild(gamesHolder.childNodes[0]);

		flagSelectedPage(pageIndex, (pageIndex+1).toString());

		firstOfPage = true;
		for(var i=pageIndex*6;i<pageIndex*6+6&&i<gamesList.length;i++) {
			currentGame = gamesList[gamesList.length-i-1].split(";");
			addGameToProfileList(currentGame[2], currentGame[0], currentGame[1], firstOfPage);
			firstOfPage = false;
		}
	}
	
	function flagSelectedPage(pageIndex, flagText) {
		if(currentSelectedPage != -1) {
			recentlyPlayedPages.insertBefore(pagesList[currentSelectedPage], currentPagePlaceHolder);
			recentlyPlayedPages.removeChild(currentPagePlaceHolder);
		}
		recentlyPlayedPages.insertBefore(currentPagePlaceHolder = document.createTextNode(flagText), pagesList[pageIndex]);
		recentlyPlayedPages.removeChild(pagesList[pageIndex]);	
		currentSelectedPage = pageIndex;
	}
	
	function addItem(name) {
		var open_text = document.createTextNode(" (");
		var link = document.createElement("a");
		var close_text = document.createTextNode(")");
		link.innerHTML = name;
		link.setAttribute("href", "javascript:void(0);");
		recentlyPlayedPages.appendChild(open_text);
		recentlyPlayedPages.appendChild(link);
		recentlyPlayedPages.appendChild(close_text);
		pagesList.push(link);
		return link;
	}

	function addPage(index) {
		var link = addItem((index+1).toString());
		link.addEventListener("click", function(event) {loadPage(index)}, false);
	}

	function loadSettings(event) {
		var GM_preferences = GM_getValue("kongregateRecentlyPlayedPreferences", "{\"maxGames\":18,\"minRating\":2.75,\"registerUnrated\":false,\"autoLoad\":true}");
		var settings_input = unsafeWindow.prompt("This is a JSON reflection of the changeable variables:", GM_preferences);
		if(settings_input == null) return;
		settings_input.replace(/ /g, "");
		if(/^\{"maxGames":[0-9]+,"minRating":(([1-3](\.[0-9]{1,2})?)|(4(\.[0-4][0-9]?|\.50?))),"registerUnrated":(true|false),"autoLoad":(true|false)\}$/.test(settings_input)) {
			GM_setValue("kongregateRecentlyPlayedPreferences", settings_input);
			alert("Settings have been overwritten.");
		} else {
			alert("Invalid syntax.");
		}
	}

	for(var i=0;i<pages;i++)
	addPage(i);

	settings = addItem("Settings");
	settings.addEventListener("click", loadSettings, false);

	clearButton = addItem("Clear");
	clearButton.addEventListener("click", function(event) {
		if(!window.confirm("Are you sure you want to clear your recently played games history?")) return;
		GM_deleteValue("kongregateRecentlyPlayedList");
		globalGamesHolder.removeChild(mainGamesHolder);
		if(window.confirm("Do you want to clear the settings too? Reset them to default?"))
		GM_deleteValue("kongregateRecentlyPlayedPreferences");
	}, false);

	recentlyPlayedTitle.innerHTML = "Recently played";
	mainGamesHolder.appendChild(recentlyPlayedTitle);
	mainGamesHolder.appendChild(recentlyPlayedPages);
	gamesHolder.setAttribute("class", "games wrapper");
	mainGamesHolder.appendChild(gamesHolder);
	globalGamesHolder.insertBefore(mainGamesHolder, insertBeforePoint);

	if(preferences.autoLoad) loadPage(0);
}

function save() {

	var url = location.toString();
	var urlPart = url.match(/^http:\/\/www\.kongregate\.com\/games\/([a-zA-Z0-9_\-]+\/[a-zA-Z0-9_\-]+)/)[1];

	var metas = document.getElementsByTagName("meta"), icon;
	for(var i=0;i<metas.length;i++)
	if(metas[i].getAttribute("property") == "og:image") {
		icon = metas[i].getAttribute("content");
		break;
	}
	var iconPart = icon.match(/^http:\/\/cdn([0-9])\.kongregate\.com\/game_icons\/([0-9]{4}\/[0-9]{4}\/.+?\.(png|jpg|gif))/);
	iconPart = iconPart[1] + iconPart[2];

	var gameTitle = document.getElementById("gamepage_header").innerHTML.match(/<\/span>\W*([^\n\r]*)/)[1];

	var rating = document.getElementById("game_ratings_size").innerHTML.toString().match(/[1-5]\.[0-9]{2}/) || "0.00";
	var preferences = JSON.parse(GM_getValue("kongregateRecentlyPlayedPreferences", "{\"maxGames\":18,\"minRating\":2.75,\"registerUnrated\":false,\"autoLoad\":true}"));
	if(parseFloat(rating) >= preferences.minRating || (rating == "0.00" && preferences.registerUnrated)) {
		var games = GM_getValue("kongregateRecentlyPlayedList", "null");
		var games_list = games.split("|");
		var results = urlPart+";"+iconPart+";"+gameTitle;
		for(i=0;i<games_list.length;i++)
		if(games_list[i].match(urlPart) || games_list[i] == "null") {
			games_list.splice(i,1);
			break;
		}
		games_list.push(results);
		if(games_list.length>preferences.maxGames)
		games_list.splice(0,games_list.length-preferences.maxGames);
		GM_setValue("kongregateRecentlyPlayedList", games_list.join("|"));
	}
}