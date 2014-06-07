// ==UserScript==
// @name           NASL No Spoiler
// @namespace      http://userscripts.org/users/189987
// @description    Hides the "Standings" section on the NASL page until you click
// @includes       http://nasl.tv/*
// @match          http://nasl.tv/*
// ==/UserScript==

function createShowLink(css, fn){
	var showBox, showH3, showLink;
	//link
	showLink = document.createElement("a");
	showLink.appendChild(document.createTextNode("Click to reveal standings"));
	showLink.href = "javascript:;";
	showLink.addEventListener("click", fn, false);

	//h3
	var showH3 = document.createElement("h3");
	showH3.appendChild(showLink);

	//box
	showBox = document.createElement('div');
	for (var s in css){
		showBox.style[s] = css[s];
	}
	showBox.appendChild(showH3);

	return showBox;
}

// Home standings
var standings = document.getElementById("home-standings");
if (standings) {
	var spoilers = standings.getElementsByTagName("ol")[0];
	if (spoilers) {
		spoilers.style.display = "none";

		// append
		standings.appendChild(createShowLink({
			align: "center",
			position: "relative",
			top: "85px",
		}, function(){
			this.style.display = "none";
			spoilers.style.display = "";
		}));
	}
}

// Individual pages
var hiddens = [];
var overlay = document.getElementsByClassName("defeated_overlay")[0];
if (overlay) {
	overlay.style.display = "none";
	hiddens.push(overlay);


	// Can't do Cufons until after page load
	window.addEventListener("load", function(){
		var group = document.getElementsByClassName("game-wrapper")[0].getElementsByTagName("span"); 
		for (var i=0;i<group.length;i++) {
			var elmts = group[i].getElementsByTagName("cufon");
			var elmt = elmts[elmts.length-1];
			hiddens.push(elmt);
			hiddens.push(elmt.childNodes[0]);
		}

		for (var i in hiddens) {
			hiddens[i].style.display = "none";
		}

	}, false);

	// Add show
	var mid = document.getElementsByClassName("matchDetail")[0];

	mid.appendChild(createShowLink({
		align: "center",
		position: "relative",
		top: "10px",
	}, function(){
		this.style.display = "none";
		for (var i in hiddens) {
			hiddens[i].style.display = "";
		}
	}));
}
