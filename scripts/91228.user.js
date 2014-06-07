// ==UserScript==
// @name           Vic MH
// @namespace      Facebook - Mouse Hunt Auto-Hunt LOL
// @description    Facebook - Mouse Hunt Auto-Hunt LOL
// @include        http://apps.facebook.com/mousehunt/*
// @include        http://apps.new.facebook.com/mousehunt/*
// @include		   *facebook.com/common/error*
// ==/UserScript==

if (document.title != "MouseHunt on Facebook | Claim a King's Reward!")
{
	timeoutValueA = 900000 + Math.round(Math.random() * 33000);
	timeoutValueB = 1500 + Math.round(Math.random() * 2500);
	timeoutValueC = 4500 + Math.round(Math.random() * 5500);
	timeoutValueD = 6500 + Math.round(Math.random() * 7500);
	var timeoutxxx = Math.floor(Math.random()*30+30 * 800);
	lolFailCats = Math.ceil(Math.random() * 26);
	if (lolFailCats == 1) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/boards.php';}, timeoutValueD);
	}
	else if (lolFailCats == 2) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/inventory.php?tab=2';}, timeoutValueC);
	}
	else if (lolFailCats == 3) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/inventory.php';}, timeoutValueD);
	}
	else if (lolFailCats == 4) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/scoreboards.php';}, timeoutValueC);
	}
	else if (lolFailCats == 5) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/boards.php';}, timeoutValueD);
	}
	else if (lolFailCats == 6) {
		setTimeout(function(){document.location = 'http://apps.facebook.com/mousehunt/index.php';}, timeoutValueB);
	}
	else {
	setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/soundthehorn.php'; } , 900000 + timeoutxxx);
	}
}

else if (document.title == "MouseHunt on Facebook | Claim a King's Reward!")
{
	var timeoutxxx = Math.floor(Math.random()*780+240) * 1000;

	setTimeout(function() { document.location = 'http://apps.facebook.com/mousehunt/index.php'; } , 100000 + timeoutxxx);
}
