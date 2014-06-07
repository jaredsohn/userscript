// ==UserScript==
// @name        Bones AP
// @namespace   Zachafer
// @description Autoplays Bones for you. Start at the page where you place a move.
// @include     *subeta.net/games/bones*
// @version     1
// @grant       none
// ==/UserScript==

var minPause = 1; //minimum pause (in seconds)
var maxPause = 3; //maximum pause (in seconds)

if(location.href.match(/take=[1-3]/i))
{
	setRandTimeout("/games/bones.php?act=play");
	return;
}

var bonesLeft = document.body.innerHTML.match(/<b>([0-9]+)<\/b> bones/i);
if(null == bonesLeft)
{
	return;
}
bonesLeft = bonesLeft[1];
var play = findPlay(bonesLeft);
if(play > 0)
{
	setRandTimeout("/games/bones.php?act=play&take=" + play);
	return;
}

function setRandTimeout(redirect)
{ 
	 setTimeout('location.href = "' + redirect + '";', Math.floor(Math.random() * (maxPause - minPause + 1)) + minPause);
}

function findPlay(amtLeft)
{
	//var bonesNeeded = 29, 25, 21, 17, 13, 9, 5, 1;
	for (var bonesNeeded = 29; bonesNeeded >= 1; bonesNeeded -= 4)
	{
		var difference = amtLeft - bonesNeeded;
		if(difference > 0 && difference < 4)
		{
			return difference;
		}
		else if(difference == 0)
		{
			return 3;
		}
	}
	return -1;
}
