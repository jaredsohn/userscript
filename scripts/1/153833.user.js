// ==UserScript==
// @name        matchgame.user.js
// @namespace   http://userscripts.org/scripts/show/152151
// @include     http://www.online-appz.com/apps/fine_memory/index.php?r=site/game&language=ar
// @version     1
// ==/UserScript==
var SHHDGUBNIUDHI;
$["support"]["cors"] = true;
$(document)["ready"](startGame);
var allCards = ["GdaGLWEzEWJO7QPWNVOT", "H3DggDQdB5H7Iif2dDas", "gMDS6Ty0buSBpxAqCnD5", "u94md2pFNKXJCbCsSINY", "gaZdw8P8qOjjOe02iDez", "TJ7VTCUCJr0hw7Pi0OJZ", "d4MKP6V56rUbdg3ZPwdE", "LXjaHbh8kpMn2w3VeLdq", "jEamXoqnDxbH1GYdmb4L", "yWN1FA0i40yBQnmYxcex", "CPcK9JQYATQ5ocSYuBdF", "TR3cWhD9Vk4nMxQIjEAs", "OdYEbXJZUtjFiPh7yFe6", "axqkUsznupGYRunReg1H"];
var info = {
	name: "game",
	random: 0
};
var pairsCount = 0;
var customeURL = "";
if (document.location.protocol == "https:") {
	customeURL = "https://online-appz.com/apps/fine_memory"
} else {
	customeURL = "http://www.online-appz.com/apps/fine_memory"
}
}
var currentScore = 0;
function startGame() {
	var matchingGame = {};
	SHHDGUBNIUDHI = setInterval(function () {
		info["random"] += 1;
		$("#clicks")["text"](info["random"])
	},
	1000);
	matchingGame = allCards["sort"](shuffle)["slice"](0, 12);
	matchingGame["deck"] = $["merge"](matchingGame, matchingGame);
	if ($(".card:first-child")["hasClass"]("first")) {
		$(".card:first-child")["removeClass"]("first");
		$(".card:first-child")["html"]("<div class=\"face front\"></div><div class=\"face back\"></div>")
	};
	$("#clicks, #pairs")["text"]("0");
	function shuffle() {
		return 0.5 - Math["random"]()
	};
	matchingGame["deck"]["sort"](shuffle);
	for (var i = 0; i < 23; i++) {
		$(".card:first-child")["clone"]()["appendTo"]("#cards")
	};
	$("#cards")["children"](".card")["each"](function (index) {
		$(this)["css"]({
			"left": ($(this)["width"]() + 10) * (index % 6),
			"top": ($(this)["height"]() + 10) * Math["floor"](index / 6)
		});
		var pattern = $(matchingGame["deck"])["get"]();
		$(this)["find"](".back")["addClass"](pattern[index]);
		$(this)["attr"]("data-pattern", pattern[index]);
		$(this)["click"](selectCard)
	});
	setTimeout(function () {
		$("#update-val tr")["remove"]();
		var items = [];
		$["ajax"]({
			type: "GET",
			url: "data/highscores.xml",
			dataType: "xml",
			success: function (xml) {
				$(xml)["find"]("highscore")["each"](function () {
					var name_text = $(this)["find"]("name")["text"]();
					var value_text = parseInt($(this)["find"]("value")["text"]());
					items["push"]({
						"key": name_text,
						"value": value_text
					})
				});
				if (items["length"] >= 1) {
					$("#update-val")["html"]("<thead><td>Name</td><td>Highscore</td></thead>");
					var j;
					var cmp = function (x, y) {
						return x > y ? 1 : x < y ? -1 : 0
					};
					items = items["sort"](function (x, y) {
						return cmp(x["value"], y["value"]) < cmp(y["value"], x["value"]) ? -1 : 1
					});
					if (items["length"] < 20) {
						for (j in items) {
							$("<tr></tr>")["html"]("<td>" + items[j]["key"] + "</td>" + "<td>" + items[j]["value"] + "</td>")["appendTo"]("#update-val")
						}
					} else {
						for (j = 0; j <= 19; j++) {
							$("<tr></tr>")["html"]("<td>" + items[j]["key"] + "</td>" + "<td>" + items[j]["value"] + "</td>")["appendTo"]("#update-val")
						}
					}
				} else {
					$("<tr></tr>")["html"]("<td>Hmmmm... no records so far!</td>")["appendTo"]("#update-val")
				}
			}
		})
	},
	1800)
};
function selectCard() {
	if ($(".card-flipped")["size"]() > 1) {
		return
	};
	if ($(this)["hasClass"]("card-flipped") == false) {
		update($("#clicks"))
	};
	$(this)["addClass"]("card-flipped");
	if ($(".card-flipped")["size"]() == 2) {
		setTimeout(checkPattern, 500)
	}
};
function checkPattern() {
	if (isMatchPattern()) {
		$(".card-flipped")["removeClass"]("card-flipped")["addClass"]("card-removed");
		pairsCount++;
		$(".card-removed")["bind"]("fadeOut", removeTookCards);
		setTimeout(function () {
			$(".card-removed")["addClass"]("noclick")
		},
		300)
	} else {
		$(".card-flipped")["removeClass"]("card-flipped")
	};
	if ($("#cards")["children"]()["length"] == pairsCount * 2) {
		clearInterval(SHHDGUBNIUDHI);
		$.ajax({
			url: customeURL + "/index.php?r=site/game",
			type: "post",
			data: {
				score: info["random"]
			},
			success: function (response, textStatus, jqXHR) {
				console.log("Hooray, it worked!");
				window.location.href = customeURL + "/index.php?r=site/dashboard&language=ar"
			},
			error: function (jqXHR, textStatus, errorThrown) {
				console.log("The following error occured: " + textStatus, errorThrown)
			},
			complete: function () {}
		})
	};
	var pairs = Math["floor"]($(".card-removed")["length"] / 2);
	if ($("#pairs")["text"]() != pairs) {
		$("#pairs")["text"](pairs)
	}
};
function isMatchPattern() {
	var cards = Array();
	$(".card-flipped")["each"](function () {
		cards["push"]($(this)["attr"]("data-pattern"))
	});
	return (cards[0] == cards[1])
};
function removeTookCards() {
	$(".card-removed")["remove"]()
};
function update(j) {
	var n = parseInt(j["text"](), 10);
	j["text"](info["random"])
};