// ==UserScript==
// @name         Grooveshark to TDC PLAY
// @namespace    GroovePlay
// @match        *grooveshark.*
// @require       http://code.jquery.com/jquery-latest.min.js
// @author       Delusional Logic
// @description  This script aims to implement TDC play playlists into grooveshark.
// ==/UserScript==

var playUrl = "http://musik.tdconline.dk/servlets/2452306090224Dispatch/19/jspforward?file=.%2Findex.jsp&page=search&searchquery=";
var processed = true;

// the guts of this userscript
function main() {
    console.log("Insert");
	if (processed == true)
	{
		processed = false;
		$(".grid-canvas .slick-row").each(function (i) {
			if ($(this).children(".slick-cell").children(".songName").children("a").html() == undefined)
				return true;
			var songName = $(this).children(".slick-cell").children(".songName").children("a").html();
			if (songName == undefined)
				return true;
			songName = songName.replace(/ /g, "+");
			var optionsPanel = $(this).children(".song").children("div.options");
			if(optionsPanel.find("a.TDCPlay").length === 0)
			{
				optionsPanel.append('<a class="rowOption option TDCPlay" target="_blank" href="' + playUrl + songName + '"> </a>');
				var option = optionsPanel.find("a.TDCPlay").css({
					"background" : "url(http://musik.tdconline.dk/hostshops/247/type_d/sites/tdcdk2453325083407/jsp/public/pix/icon_orange_phone_dimmed-hovered.gif)",
					"width" : "18px",
					"height" : "18px",
					"margin-left" : "1px",
					"target-new" : "tab ! important",
					});
			}
		});
	}
	processed = true;
}

var container = document.getElementById("page");
container.addEventListener("DOMNodeInserted", main, false);