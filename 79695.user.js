// ==UserScript==

// @name           What.CD: disable avatars

// @namespace      http://amy.com

// @description    Removes all avatars on the site.

// @include        http://what.cd/*

// @include        https://ssl.what.cd/*

// ==/UserScript==


var loc = location.href.split("/")[3].split("=")[0];


//forum posts
if (loc == "forums.php?action") {

var img = document.getElementsByTagName("td");

	for (var i in img) {

		if (img[i].className == "avatar")

			img[i].style.display = "none";

	}

}
//torrent comments
if (loc == "torrents.php?id") {

var img = document.getElementsByTagName("td");

	for (var i in img) {

		if (img[i].className == "avatar")

			img[i].style.display = "none";

	}

}

//post history/subscriptions
if (loc == "userhistory.php?action") {

var img = document.getElementsByTagName("td");

	for (var i in img) {

		if (img[i].className == "avatar")

			img[i].style.display = "none";

	}

}

//profiles (remove everything below if you want want avatars in profiles)

if (loc == "user.php?id") {

var img = document.getElementsByTagName("img");

	for (var e in img) {

		var proof = img[e].alt.split(" ")[1];

		if (proof == "avatar") {

			img[e].style.display = "none";

		}

	}



var img = document.getElementsByClassName("head colhead_dark");

var box = document.getElementsByClassName("box");

	for (var o in img) {

		if (img[o].innerHTML == "Avatar")

			img[o].style.display = "none";
				if (box.length >= 6) {

					box[0].style.display = "none";
				}

	}


}