// ==UserScript==
// @name           Punkty gracza 
// @author         Wszechmogący
// @include        http://*.grepolis.*/game*
// @description    Skrypt który pokazuje liczbę punktów gracza na każdej podstronie.
// ==/UserScript== 

(function () {
	var uW;
	if (typeof unsafeWindow === 'object'){
		uW = unsafeWindow;
	} else {
		uW = window;
	}
	var $ = uW.jQuery;
	var Rank = 0;
	var GetRank = function () {
		Rank = getUrlVars($("#link_ranking a").attr("href"))["rank"];
	};

	var GetRankPage = function () {
		$.get("http://" + document.location.host + "/game/ranking?rank=" + Rank, ParseRankPage);
	};

	function ParseRankPage(data)
	{
		var Points = $(data).find("tr[class^=current_player] td:nth-child(3)").html();
		$("#links ul").append("<li style='color:#fff;'>Punkty: <strong>"+Points+"</strong></li>");
	}

	var UserPoints = (function () {

		return function () {			
			GetRank();
			GetRankPage();
		};
	}());

	UserPoints();
}());

function getUrlVars(path) {
	var vars = {};
	var parts = path.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}