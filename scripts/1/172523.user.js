// ==UserScript==
// @name		DS Helper
// @namespace	http://dsHelper.net/
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @require		http://testarea.at/dshelper/datejs/Datejs-all/build/date-de-DE.js
// @description	Applies elements to DS Page to help user
// @include		http://de94.die-staemme.de/*
// @version		0.1
// @copyright	2013+
// ==/UserScript==

if (window.attachEvent) {
	window.attachEvent('onload', yourFunctionName);
} else {
	if (window.onload) {
		var currentOnload = window.onload;
		var newonload = function() {
			currentOnload();
			setTimeout(hooked, 1000);
		};
		window.onload = newonload;
	} else {
		window.onload = hooked;
	}
}

function hooked() {
	if (document.URL.indexOf("screen=main") != -1) {
		// Hauptgebaeude
		var tableBuildQueue = $("#build_queue tbody");
		var tableBuildings = $("#buildings tbody");
		attachButtonToTable(tableBuildings);
		setInterval(function() {
			watchBuildingQueue(tableBuildQueue)
		}, 30000);
	}
	if (document.URL.indexOf("screen=map") != -1) {
		// Karte
	}
	if (document.URL.indexOf("screen=forum") != -1) {
		// Forum
		var tableForum = $("th:contains('Letzter Beitrag')").parent().parent();
		for ( var i = 1; i < ($(tableForum).children().length - 1); i++) {
			var currentRow = $(tableForum).children()[i];
			var currentLastPost = $($(currentRow).children()[2]).children()[0];
			var content = $(currentLastPost).html();
			var regex = /(\d\d\.\d\d\.\d\d\d\d)/g;
			if (regex.test(content)) {
				var dateText = content.match(regex)[0];
				var extractedDate = Date.parse(dateText);
				if (Date.today().addDays(-30).compareTo(extractedDate) == 1) {
					$(currentLastPost).html(content.replace(regex, "<span style='color: red; font-weight: bold;'>" + extractedDate.toString("dd.MM.yyyy") + "</span>"));
					continue;
				}
				if (Date.today().addDays(-2).compareTo(extractedDate) == 1) {
					$(currentLastPost).html(content.replace(regex, "<span style='color: blue; font-weight: bold;'>" + extractedDate.toString("dd.MM.yyyy") + "</span>"));
					continue;
				}
			}
		}
	}
}

function attachButtonToTable(tableBuildings) {
	if (tableBuildings != null) {
		var buildingRows = $(tableBuildings).children();
		$(buildingRows[0]).append($("<th>&nbsp;</th>"));

		for ( var i = 1; i < buildingRows.length; i++) {
			var row = $(buildingRows[i]);

			var privateQueueImage = $("<img>");
			privateQueueImage.attr("id", "privateQueueImage" + i);
			privateQueueImage.attr("alt", "privateQueue");
			privateQueueImage.attr("src", "http://cdn2.tribalwars.net/graphic/icons/account_manager.png");

			var privateQueueLink = $("<a>");
			privateQueueLink.attr("id", "privateQueueLink" + i);
			privateQueueLink.attr("href", "#");

			privateQueueLink.append(privateQueueImage);

			row.append(privateQueueLink);
		}
	}
}

function watchBuildingQueue(tableBuildQueue) {
	if (tableBuildQueue != null) {

	}
}