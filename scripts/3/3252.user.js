// MySpace Favorites Confirmation v0.5
// by mrk (bbzmark{at}gmail)
//
// ==UserScript==
// @name         MySpace Favorites Confirmation
// @namespace    http://bbzspace.com/
// @description  Confirms if you want to add the person to Private or Public Favorites
// @include      http://collect.myspace.com/*
// ==/UserScript==

var location = window.location.toString();
var ref = document.referrer;

if (ref && ref.indexOf('user\.favorites') <= -1) {
	if (location.indexOf('user\.favorites') > -1) {
		var friendID_value = location.split("&");
		var friendID = friendID_value[1].split("=");
		var addFav = confirm("Do you want to add this user to your Private or Public Favorites?\nPress OK for Private, CANCEL for Public.")
		if (addFav)
			 window.location.href = "http://www.myspace.com/index.cfm?fuseaction=user.UpdateFavorite&public=0&friendID="+friendID[1];
		else
			 window.location.href = "http://www.myspace.com/index.cfm?fuseaction=user.UpdateFavorite&public=1&friendID="+friendID[1];
	}
}