// ==UserScript==
// @name                Foxconn's Facepunch Icons
// @version             0.15
// @description         A little W.I.P. set of revamped and redesigned Icons for facepunch. REFRESH YOUR CACHE AFTER UPDATEING!!!
// @include             http://www.facepunch.com/*
// @include             http://facepunch.com/*
// @copyright           2012+, Foxconn (Icons) and Call Me Kiwi (Code)
// @downloadURL http://fpuiicons.googlecode.com/svn/trunk/Script.js
// ==/UserScript==
//Display when an update is found
var newImage = document.createElement("img");
newImage.src="http://fpuiicons.googlecode.com/svn/trunk/Update.gif";
document.getElementById("lastelement").appendChild(newImage);



function runS(elem) {
	var allImages = elem.getElementsByTagName("img");

	var types = ["browser", "social", "navbar", "ratings", "events"];
	var browsers = ["chrome", "firefox", "opera", "safari", "iphone", "ipad", "android", "unknown", "ie6", "ie7", "ie8", "ie9", "ie10", "steam", "ie5"];
	var browserNames = ["Chrome", "Firefox", "Opera", "Safari", "iPhone", "iPad", "Android", "Something should go here...\n The monkeys don't know what however.", "Internet Explorer 6", "Internet Explorer 7", "Internet Explorer 8", "Internet Explorer 9", "Internet Explorer 10", "Steam In-Game", "Too old for an Icon."];
	var bindir = "http://fpuiicons.googlecode.com/svn/trunk/V5_GIF/";
	for (var i = 0; i < allImages.length; i++) {
		var imgsrc = allImages[i].src;
		var strings = imgsrc.split("/");
		var suf = strings[strings.length - 1];
		suf = suf.split(".");
		var sufix = suf[0];
		strings.pop();
		for (var j = 0; j < 5; j++) {
			var type = types[j];
			if (strings[strings.length - 1] == type) {
				allImages[i].src = bindir + type + "/" + sufix + ".gif";
				if (type == "browser") {
					for (var b = 0; b < browsers.length; b++) {
						if (sufix == browsers[b]) {
							allImages[i].title = browserNames[b];
							break;
						}
					}
				}
				break;
			}
		}
		//report
		if (imgsrc == "http://www.facepunch.com/fp/report.png") {
			allImages[i].src = bindir + "report.gif";
		}
	}
}
runS(document);
//rateing check
var prevRBX = document.getElementsByClassName("top popupbox ratingslist").length;

function deltaRBX() {
	var curRBX = document.getElementsByClassName("top popupbox ratingslist");
	var curRBXL = curRBX.length;
	if (prevRBX != curRBXL) {
		prevRBX = document.getElementsByClassName("top popupbox ratingslist").length;
		var rb = curRBX[curRBXL - 1];
		var idN = rb.getAttribute('id');
		idN = idN.split("_")[1];
		var pid = document.getElementById("rating_" + idN);
		pid.removeEventListener('click', deltaRBX, false);
		runS(rb);
		//alert(idN);
	}
	else {
		window.setTimeout(deltaRBX, 100);
	}

}
//element listeners
//list
var rr = document.getElementsByClassName("rating_results");
for (var i = 0; i < rr.length; i++) {
	var post = rr[i];
	post.addEventListener("click", deltaRBX, false);
}

//rating
rr = document.getElementsByClassName("postrating");
var pl = document.getElementById("postlist");
for (i = 0; i < rr.length; i++) {
	post = rr[i];
	post.addEventListener("click", function () {
		window.setTimeout(function () {
			runS(pl)
		}, 1000);
	}, false);
}

//ticker
var url = window.location.href;
var urlsplt = url.split("/");
if (urlsplt[urlsplt.length - 1] == "fp_ticker.php") {
	var prevTCK = document.getElementsByClassName("ticker_item").length;

	function deltaTCK() {
		var curTCK = document.getElementsByClassName("ticker_item");
		var curTCKL = curTCK.length;
		if (prevTCK != curTCKL) {
			var prevTCK = document.getElementsByClassName("ticker_item").length;
			runS(document.getElementById("TickerBox"));
			window.setTimeout(deltaTCK, 100);
		}
		else {

		}
	}
	window.setTimeout(deltaTCK, 100);
}