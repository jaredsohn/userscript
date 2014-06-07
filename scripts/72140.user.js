// ==UserScript==
// @name           klavogonki: Sort results
// @version        0.19
// @namespace      klavogonki
// @author         novkostya
// @description    Adds "Sort" button to klavogonki site
// @include        http://klavogonki.ru/g/*
// ==/UserScript==
function sort(sortKey)
{
	function getProgress(a)
	{
		var car = document.getElementById(a.id.replace("player", "car"));
		var left = parseInt(car.style.left);
		if (isNaN(left))
			left = 0;
		return left;
	}

	function getPlace(a)
	{
		if (!a.firstChild.firstChild || !a.firstChild.firstChild.firstChild)
			return 100500 - getProgress(a);
		var text = a.firstChild.firstChild.firstChild.innerHTML;
		return text.split(" ")[0];
	}

	function getErrors(a)
	{
		var stats = document.getElementById(a.id.replace("player", "stats"));
		if (!stats || !stats.childNodes[2])
			return 100500;
		return stats.childNodes[2].childNodes[2].firstChild.innerHTML.replace(",", ".");
	}

	function getErrorsCount(a)
	{
		var stats = document.getElementById(a.id.replace("player", "stats"));
		if (!stats || !stats.childNodes[2])
			return 100500;
		return stats.childNodes[2].firstChild.firstChild.innerHTML;
	}
	
	function getRating(a)
	{
		var car_rating = a.getElementsByClassName("car_rating")[0];
		if (!car_rating)
			return 100500;
		return car_rating.textContent.replace(/[^0-9]/, '');
	}
	
	function getNickname(a)
	{
		var nick_content = a.getElementsByClassName("nick_content")[0];
		if (nick_content)
			return nick_content.textContent.toUpperCase();
		else
			return "Гость";
	}

	function getDefaultPosition(a)
	{
		if (a.hasClassName("you"))
			return -1;
		return a.id.split("player")[1];
	}

	var players = document.getElementById("players");
	var arr = [];
	for (var i = 0; i < players.childNodes.length; ++i)
		arr.push(players.childNodes[i]);

	var keySelector = getPlace;
	var isKeyNumber = true;
	switch (sortKey)
	{
		case "position":
			keySelector = getPlace;
			break;
		case "errors":
			keySelector = getErrors;
			break;
		case "errorsCount":
			keySelector = getErrorsCount;
			break;
		case "rating":
			keySelector = getRating;
			break;
		case "nickname":
			keySelector = getNickname;
			isKeyNumber = false;
			break;
		case "default":
			keySelector = getDefaultPosition;
			break;
		case "auto":
			var buttons = document.getElementsByClassName("active-sort");
			for (var i = 0; i < buttons.length; ++i)
				buttons[i].removeClassName("active-sort");
			$("position").addClassName("active-sort");
			break;
	}

	arr.sort(
		function(a, b)
		{
			var comp = 0;
			if (isKeyNumber)
				comp = keySelector(a) - keySelector(b);
			else
			{
				if (keySelector(a) > keySelector(b))
						comp = +1;
				else if (keySelector(a) < keySelector(b))
					comp = -1;
			}
			if (comp == 0)
				comp = getDefaultPosition(a) - getDefaultPosition(b);
			return comp;
		}
	);
	while (players.childNodes.length > 0)
		players.removeChild(players.firstChild);
	for (var i = 0; i < arr.length; ++i)
		players.appendChild(arr[i], players.childNodes[i]);
}

function autoSort(sender)
{
	var intervalId = document.getElementById("intervalId");
	if (sender.checked)
		intervalId.value = setInterval("sort('auto')", 500);
	else
		if (intervalId.value)
			clearInterval(intervalId.value);
}

function sortClick(sender)
{
	if ($("autosort").checked)
		$("autosort").click();
	if (sender.hasClassName("active-sort"))
	{
		sender.removeClassName("active-sort");
		sort("default");
	}
	else
	{
		var buttons = document.getElementsByClassName("active-sort");
		for (var i = 0; i < buttons.length; ++i)
			buttons[i].removeClassName("active-sort");
		sender.addClassName("active-sort");
		sort(sender.id);
	}
}

function updateStats()
{
	var totalCount = $$(".player").length;
	var guestsCount = totalCount;
	var byRang = [];
	for (var i = 9; i > 0; --i)
	{
		var profiles = $$(".profile.rang" + i);
		var cnt = profiles.length;
		if (cnt > 0)
		{
			var names = [];
			for (var j = 0; j < profiles.length; ++j)
				names.push(profiles[j].textContent)
			names.sort();
			names = names.join(", ");
			byRang.push("<" + "span class='rang" + i + "' style='font-weight: bold;' title='" + names + "'>" + cnt + "<" + "/span>"); // opera sucks
		}
		guestsCount -= cnt;
	}
	if (guestsCount > 0)
		byRang.push(guestsCount);
	$("players_count").innerHTML = "<b>" + totalCount + "</b> = " + byRang.join(" + ");
}

var script = document.createElement("script");
script.innerHTML = sort + autoSort + sortClick + updateStats + 'setInterval("(" + updateStats + ")()", 1000);';
document.body.appendChild(script);

var elem = document.createElement("div");
elem.id = "sort-panel";
elem.innerHTML =
	'<style type="text/css">' +
		'#players { clear: left; }' +
		'div.sort-button { float: left; }' +
		'div.sort-button span:hover { text-decoration: underline; cursor: pointer; }' +
		'div.sort-button span.active-sort { font-weight: bold; }' +
	'</style>' +
	'<div style="padding-left: 10px; width: 60px;" class="sort-button"><span id="position" onclick="sortClick(this)">место</span></div>' +
	'<div style="float: left; width: 220px">' +
		'<input type="checkbox" id="autosort" onclick="autoSort(this)">' +
		'<label for="autosort" style="position: relative; top: -3px">обновлять автоматически</label>' +
		'<input type="hidden" id="intervalId">' +
	'</div>' +
	'<div style="width: 60px;" class="sort-button"><span id="nickname" onclick="sortClick(this)">ник</span></div>' +
	'<div style="width: 75px;" class="sort-button"><span id="errorsCount" onclick="sortClick(this)">ошибки</span></div>' +
	'<div style="width: 80px;" class="sort-button"><span id="errors" onclick="sortClick(this)">% ошибок</span></div>' +
	'<div class="sort-button"><span id="rating" onclick="sortClick(this)">рейтинг</span></div>';
var players = document.getElementById("players");
players.parentNode.insertBefore(elem, players);

var elem = document.createElement("div");
elem.id = "statistics";
elem.style.backgroundColor = "#F8F4E6";
elem.style.lineHeight = "1.6em";
elem.style.marginBottom = "10px";
elem.innerHTML =
	'<div class="r tl"><div class="tr"><div class="bl"><div class="br"><div class="rc">' +
	'<h4>Статистика</h4>' +
	'Игроков: <span id="players_count" style="cursor: default;"><b>0</b></span>' +
	'</div></div></div></div></div>';
var invite = document.getElementById("invite");
invite.parentNode.insertBefore(elem, invite);


