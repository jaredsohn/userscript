// ==UserScript==
// @name                        GunzRPG Bot
// @namespace                   GunzRPG hax - www.gunzrpg.com
// @description			GunzRPG Bot
// @include                     http:/*gunzrpg.com/*
// ==/UserScript==

var CurrentURL = document.URL;
TehURL = CurrentURL.split(".com/");

if (TehURL[1])
{
	TehURL = TehURL[1].split(".php");
}

function autorepair() {
	var healthBar = document.getElementsByName("health").item(0);
	healthBar.value = 100;
	var armorBar = document.getElementsByName("armor").item(0);
	armorBar.value = 100;
	var submitBar = document.getElementsByTagName("form").item(0);
	submitBar.submit();
}

function letsgorecruit() {
	document.location = document.URL.split(".com/")[0] + ".com/recruit.php";
}

function recruitthisguy() {
	var recruitLink = document.body.innerHTML.split("recruit.php?id=");
	if (recruitLink[1]) {
		recruitLink = recruitLink[1].split('"')[0];
		document.location = document.URL.split(".com/")[0] + ".com/recruit.php?id=" + recruitLink;
	}
	else
	{
		document.location = document.URL.split(".com/")[0] + ".com/index.php";
	}
}

if (TehURL[0] == "index") {
	var myArmor = document.getElementsByTagName("span")[1];
	var myHP = document.getElementsByTagName("span")[2];

	if (myArmor < 100 || myHP < 100) {
		function cheat() {
			setTimeout(autorepair, 2000);
		}
	}
	else
	{
		function cheat() {
			setTimeout(letsgorecruit, 2000);
		}
	}
}
else if (TehURL[0] == "recruit") {
	function cheat() {
		setTimeout(recruitthisguy, 2000);
	}
}
else if (TehURL[0] == "challenge") {
	function cheat() {
		document.location = document.URL.split(".com/")[0] + ".com/index.php";
	}
}

cheat();