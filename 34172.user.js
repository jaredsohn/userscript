// ==UserScript==
// @name           ToodleDo Favorites
// @namespace      http://userscripts.org/tdFavorites
// @description    Adds a list of favorite links that point to any tab
// @include        http://www.toodledo.com/views/*
// ==/UserScript==


var toodleDoFavorites = (function() {
	var debug = false;
	var cookieName = "tdFavorites";

	var $ = function(id) {
		return document.getElementById(id);
	}

	var log = function(item) {
		if (debug)
			unsafeWindow.console.log(item);
	}
	
	var addAddToFavoriteLinks = function() {
		//add to visible tabs
		var tabsElement = $("tabs");
		for (var i = 0; i < tabsElement.childNodes.length; i++) {
			var tab = tabsElement.childNodes[i];
			if (tab.nodeName == "DIV") {
				var a = document.createElement("a");
				a.innerHTML = "+";
				a.href = "#";
				a.addEventListener("click", function() { 
						addToFavorites(this); 
						return false; 
					}, false);
				tab.appendChild(a);
			}
		}

	}

	var addToFavorites = function(href) {
		var tabHref = href.previousSibling;
		var name = tabHref.innerHTML;
		var href = tabHref.getAttribute("href");
		appendFavorite(name, href);
		drawFavorites();
	}

	var appendFavorite = function(name, href) {
		var expires = 360;
		var cookie = readCookie(cookieName);
		if (cookie) {
			createCookie(cookieName, cookie+"||"+name+"|"+href, expires)
		} else {
			createCookie(cookieName, name + "|" + href, expires);
		}
	}

	var getFavorites = function() {
		var cookie = readCookie(cookieName);
		var favorites = {};
		if (cookie) {
			var items = cookie.split("||");
			items.sort();
			for(var i = 0; i < items.length; i++) {
				if (items[i]) {
					var item = items[i].split("|");
					favorites[item[0]] = item[1];
				}
			}
		}
		return favorites;
	}

	var saveFavorites = function(favorites) {
		var cookieString = ''
		for (var favorite in favorites) {
			cookieString += favorite+"|"+favorites[favorite]+"||";
		}
		createCookie(cookieName, cookieString, 360);
		drawFavorites();
	}

	var drawFavorites = function() {
		var favorites = getFavorites();
		var favoritesDivId = "tdFavorites";
		var divExists = false;
		var div = $(favoritesDivId);
		if (!div) {
			var div = document.createElement('div');
			div.id = favoritesDivId;
			div.style.marginBottom = "10px";
			div.style.fontSize = "10px";
		}
		else 
			divExists = true;
		div.innerHTML = "";
		var label = document.createElement("span");
		label.innerHTML = "Favorites: ";
		div.appendChild(label);
		for(var favorite in favorites) {
			div.appendChild(drawFavoriteLink(favorite, favorites[favorite]));
		}
		if (!divExists) {
			var viewby = $("viewby");
			viewby.parentNode.insertBefore(div, viewby.nextSibling);
		}
	}

	var cleanName = function(name) {
		var a = name.indexOf("(");
		if (a != -1) {
			name = name.substr(0, a);
		}
		return name;
	};

	var drawFavoriteLink = function(name, href) {
		var span = document.createElement("span");
		var favoriteHref = document.createElement("a");
		favoriteHref.href = href;
		favoriteHref.innerHTML = cleanName(name);
		favoriteHref.style.paddingRight = "3px";
		
		var removeHref = document.createElement("a");
		removeHref.innerHTML = "-";
		removeHref.href = "#";
		removeHref.style.paddingRight = "10px";
		removeHref.addEventListener("click", function() { removeFavorite(name); }, false);
		
		span.appendChild(favoriteHref);
		span.appendChild(removeHref);
		return span;
	}

	var removeFavorite = function(name) {
		var favorites = getFavorites();
		delete favorites[name];
		saveFavorites(favorites);
	}

	var addToTabOverflow = function() {
		var tabsOverflow = $("taboverflow");
		for(var i = 0; i < tabsOverflow.childNodes.length; i++) {
			var tab = tabsOverflow.childNodes[i];
			if (tab.nodeName == "A") {
				var add = document.createElement("a");
				add.href = "#";
				add.innerHTML = "+";
				tabsOverflow.insertBefore(add, tab.nextSibling);
			}
		}
	}

	var onload = function() {
		addAddToFavoriteLinks();
		drawFavorites();	
		//var tabsOverflow = $("taboverflow");
	}
		
	var createCookie = function(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	var readCookie = function(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	var eraseCookie = function(name) {
		createCookie(name,"",-1);
	}

	return {
		execute: function() {
			window.addEventListener("load", onload, false);
		}
	}
}())

toodleDoFavorites.execute()
