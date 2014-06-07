// ==UserScript==
// @name           better fukung
// @namespace      http://userscripts.org/users/33073/scripts
// @include        http://www.fukung.net/*
// @include        http://fukung.net/*
// ==/UserScript==

var div = document.getElementById("image");
div.innerHTML += "<br/><a style='font-weight: bold; font-size: 9pt;' href='#' id='better_fukung'>good one</a>\
				 | <a style='font-weight: bold; font-size: 9pt;' href='#' id='show_favs'>show favorites"+
				 ((GM_getValue("good_ones")) ? (" ("+(GM_getValue("good_ones")).split("|").length+")") : "")
				 +"</a>";
document.getElementById("better_fukung").addEventListener("click", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var rating = GM_getValue("good_ones") || "";
	if (rating == "") rating += document.getElementById("image").getElementsByTagName("img")[0].src;
	else rating += "|"+document.getElementById("image").getElementsByTagName("img")[0].src;
	GM_setValue("good_ones", rating);
}, false);


document.getElementById("show_favs").addEventListener("click", function(e) {
	e.stopPropagation();
	e.preventDefault();
	var rating = GM_getValue("good_ones") || "", string, i, favs;
	if (rating == "") alert("no favorites stored yet, sorry.");
	else {
		string = "<div style='text-align: center;' id='favs'>";
		favs = rating.split("|");
		for (i=0; i<favs.length; i++) {
			string += "\n<img src='"+favs[i]+"' /><br/>";
		}
		document.body.innerHTML += string+"</div>";
		GM_addStyle(".bottom_menu, .ad, .bottommenu, .disclaim, .keys { display: none; }");
	}
}, false);

document.addEventListener("DOMNodeInserted", function() {
	if (document.getElementById("favs")) {
		if (document.getElementById("favs").getElementsByTagName("img").length) {
			var imgs = document.getElementById("favs").getElementsByTagName("img");
			for (var i=0; i<imgs.length; i++) {
				imgs[i].style.cursor = "pointer";
				imgs[i].addEventListener("click", function() {
						GM_setValue("good_ones", GM_getValue("good_ones").replace((new RegExp("\\|\?"+this.src, "gi")), ""));
						this.style.display = "none";
				}, true);
			}
		}
	}
}, true);