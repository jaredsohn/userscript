// ==UserScript==
// @name           Ignore Lowbies
// @namespace      http://userscripts.org/users/61807
// @description    Hide posts from lowbie posters on the World of Warcraft forums
// @include        http://forums.worldofwarcraft.com/*
// ==/UserScript==

// ignores people under this level, feel free to change
var lowbie = 10

var divs = document.getElementsByTagName("div")
var postid


for (var i = 0; i < divs.length; i++) {

	var _id = divs[i].id
	if ((_id.indexOf("avatar") == 0) && (_id.length > 8)) {
		postid = _id.substring(6)
	}

	if ( divs[i].className == "iconPosition") {
		strip = divs[i].innerHTML.replace(/(<([^>]+)>)/ig,"")
		level = parseFloat(strip)
		if (level < lowbie) {
			collapse(postid)
		}
	}
}

function collapse(postId, uncollapse) {
	if (uncollapse) {
		document.getElementById("body"+postId).style.display = "table-row";
		document.getElementById("avatar"+postId).style.display = "table-cell";
		document.getElementById("afterAvatar"+postId).style.display = "table-cell";
		document.getElementById("hideplayerfooter"+postId).style.display = "block";
		document.getElementById("userpanel"+postId).style.top = "-77px";
		document.getElementById("pinfo"+postId).style.background = "transparent url('/images/pinfo-tile.gif') repeat-y 3px 0";
		document.getElementById("pinfo"+postId).style.padding = "8px 0 0 0";
		document.getElementById("id"+postId).style.backgroundImage = "";
		document.getElementById("pinfobackground"+postId).style.background = "url('/images/back.png') repeat 0 0";
	} else {
		document.getElementById("body"+postId).style.display = "none";
		document.getElementById("avatar"+postId).style.display = "none";
		document.getElementById("afterAvatar"+postId).style.display = "none";
		document.getElementById("hideplayerfooter"+postId).style.display = "none";
		document.getElementById("userpanel"+postId).style.top = "-4px";
		document.getElementById("pinfo"+postId).style.background = "none";
		document.getElementById("pinfo"+postId).style.padding = "5px 0 0 0";
		document.getElementById("id"+postId).style.backgroundImage = "none";
		document.getElementById("pinfobackground"+postId).style.background = "none";
	}
}