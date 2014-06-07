// ==UserScript==
// @name Outpost prices
// @description backpack.tf suggested prices for outpost
// @author l1
// @license Anonymous License
// @version 1.0
// @include http://tf2outpost.com/*
// @include http://www.tf2outpost.com/*
// ==/UserScript==

//*
(function() {
	var API_KEY = "";	// Get yours here: http://backpack.tf/api/register/
	var DELAY = 1000 * 60 * 60; // 1 hour. No less than 1 minute.

	var IGNORED = [
		5002,	// refined because usd price and it's a base currency anyway
		5068,	// salvaged crate, because outpost can't distinguish between its series
	];

	// don't touch anything form here on

	// some ids on backpack.tf are different from schema's
	var IDs = {
		0: 190,
		1: 191,
		2: 192,
		3: 193,
		4: 194,
		5: 195,
		6: 196,
		7: 197,
		8: 198,
		9: 199,
		10: 199,
		11: 199,
		12: 199,
		13: 200,
		14: 201,
		15: 202,
		16: 203,
		17: 204,
		18: 205,
		19: 206,
		20: 207,
		21: 208,
		22: 209,
		23: 209,
		24: 210,
		25: 737,
		30: 212,
		29: 211,
		160: 294,
		735: 736,
		831: 810,
		832: 811,
		833: 812,
		834: 813,
		835: 814,
		836: 815,
		837: 816,
		838: 817,
		5999: 6000,
		2093: 5020,
	};

	// constants, hurr
	var UNUSUAL = 5, UNIQUE = 6, CRATE = 5022, TF2 = 440;

	function includeCss() {
		$("style#backpack-prices").remove();
		var style = $("<style>").attr("id", "backpack-prices").appendTo(document.head);
		style.text("\
.backpack_hint {\
	position: absolute;\
	bottom: 0;\
	left: 0;\
\
	text-align: center;\
	width: 100%;\
	font-size: 12px;\
	color: white;\
}\
		");
	};

	function loadData() {
		console.log("Updating backpack.tf prices");
		$.ajax({
			dataType: "jsonp",
			data: {
				"format": "jsonp",
				"key": API_KEY,
			},
			url: "http://backpack.tf/api/IGetPrices/v3/",
			success: handleResponse,
			error: console.log,
		});
	};

	function handleResponse(json) {
		console.log("backpack.tf prices loaded");
		var timestamp = parseInt(json["response"]["current_time"]) * 1000;
		prices = json["response"]["prices"];

		window.localStorage.setItem("backpack_prices", JSON.stringify(prices));
		window.localStorage.setItem("backpack_timestamp", timestamp.toString());

		displayPrices();
	};

	// from here on we rely on outpost retarded^W layout
	function displayPrices() {
		$(".backpack_hint").remove();

		$(".item[data-hash]").each(function() {
			var element = $(this);

			var hash = element.attr("data-hash").split(",");
			var game    = parseInt(hash[0]) || TF2,
			    id      = parseInt(hash[1]),
			    quality = parseInt(hash[2]) || UNIQUE;

			if (game != TF2)
				return;

			if (-1 != IGNORED.indexOf(id))
				return;
			
			id = IDs[id] || id;	// substitute some ids

			if (element.hasClass("uncraftable"))
				quality *= 100;	// that's just an assumption actually

			var index = 0; // crate number, unusual effect, etc

			// trying to guess the effect
			if (quality == UNUSUAL) {
				var m = element.css("background-image").match(/(\d+)\.png/);
				if (m)
					index = parseInt(m[1]);
			}

			// and the crate series
			if (id == CRATE) {
				var m = element.find(".series_no").text().match(/#(\d+)/);
				if(m)
					index = parseInt(m[1]);
			}

			index = index || 0;
			try {
				var price = prices[id][quality][index]["current"];
			}
			catch(e) {
				console.log("failed to find the price for this item:", this);
				return;
			}

			var text = price["value"];
			if (price["value_high"])
				text += " - " + price["value_high"]
			text += " " + price["currency"];
			var hint = $("<span>").addClass("backpack_hint");
			hint.text(text).attr("title", "Updated on " + (new Date(price["date"]*100)).toLocaleString());

			element.append(hint);
		});
	};

	var lastChecked = parseInt(window.localStorage.getItem("backpack_timestamp")) || -DELAY;
	var now = (new Date()).getTime();
	if (now >= lastChecked + DELAY)
		loadData();

	var prices = JSON.parse(localStorage.getItem("backpack_prices"));
	includeCss();
	displayPrices();
})();
//*/