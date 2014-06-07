// ==UserScript==
// @name           Auto Guess The Card
// @namespace      Evilchaos.com
// @include        http://www.ichumon.com/game_gtc.php
// @include        http://www.ichumon.com/game_gtc.php?action=begin
// @include        http://www.ichumon.com/game_gtc.php?action=guess*
// ==/UserScript==

// Settings

timeout = 500;

// Engine

function guess(higher)
{
	var guesstype = higher ? 'higher' : 'lower';
	var form = document.createElement('form');
	form.setAttribute('method', 'post');
	form.setAttribute('action', 'game_gtc.php?action=guess&&type='+guesstype);
	var hid = document.createElement('input');
	hid.setAttribute('type', 'hidden');
	hid.setAttribute('name', 'submit');
	hid.setAttribute('value', guesstype);
	form.appendChild(hid);
	document.body.appendChild(form);
	form.submit();
}

if (location.href.match(/ichumon\.com\/game_gtc\.php$/i))
{
	setTimeout(function() {location.href = 'http://www.ichumon.com/game_gtc.php?action=begin';}, timeout);
}
else if (location.href.match(/ichumon\.com\/game_gtc\.php\?action=begin/i))
{
	var imgsrc = document.getElementsByTagName('center')[4].getElementsByTagName('table')[1].getElementsByTagName('img')[0].src;
	var num = parseInt(imgsrc.substring(imgsrc.lastIndexOf('card_') + 5, imgsrc.lastIndexOf('.png')));
	setTimeout(guess, timeout, (num < 8));
}
else if (location.href.match(/ichumon\.com\/game_gtc\.php\?action=guess/i))
{
	setTimeout(function() {location.href = 'http://www.ichumon.com/game_gtc.php';}, timeout);
}