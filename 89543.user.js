// ==UserScript==
// @name           Search in new tab
// @namespace      http://what.cd
// @description    Search in new tab
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

// this is where you choose what the search link looks like:
var optionType = "img"; // img or link
var optionHTML = "http://imgur.com/L8Cns.png"; // either an image link, or search text

//## do not edit below here ##//

var ssl = window.location.href.split("what.cd/")[0];
var target = document.getElementById("searchbars");
var boxes = target.getElementsByTagName("input");

var searches = [];
var x = 0;
for (var e = 1; e < boxes.length; e++) {
	if (boxes[e].value != "search") {
		searches[x] = boxes[e];
		x++;
	}
}

var URL = [
	ssl + "what.cd/torrents.php?action=basic&groupname=",
	ssl + "what.cd/artist.php?artistname=",
	ssl + "what.cd/requests.php?search=",
	ssl + "what.cd/forums.php?action=search&search=",
	ssl + "what.cd/log.php?search=",
	ssl + "what.cd/user.php?action=search&search="
];
for (var e = 0; e < searches.length; e++) {
	var link = document.createElement("a");
	link.href = "#search";
	link.id = "search" + e;
	if (optionType != "img") {
		link.innerHTML = optionHTML;
	}
	else if (optionType == "img") {
		link.innerHTML = "";
		var img = document.createElement("img");
		img.src = optionHTML;
		link.appendChild(img);
	}

	searches[e].parentNode.appendChild(link);

	searches[e].setAttribute('something',e);
	searches[e].addEventListener('blur',
		function() {
			var num = this.getAttribute('something');
			document.getElementById("search" + num).href = URL[num] + this.value;
		},
	false);
}