// ==UserScript==
// @name           Auto-Join from the Invite PM
// @namespace      AndrewB
// @include        http://www.conquerclub.com/forum/ucp.php?i=pm&mode=view*
// ==/UserScript==

var viewGame = document.getElementsByClassName('postlink');

if (viewGame.length > 0 && viewGame[0].innerHTML == 'View Game')
{
	var gameNumber = viewGame[0].attributes[1].value;
	gameNumber = gameNumber.substr(55, gameNumber.length - 55);
	var join = document.createElement('a');
	join.href = "http://www.conquerclub.com/player.php?mode=find&submit=Accept&game=" + gameNumber + "&gn=" + gameNumber;
	join.innerHTML = "Auto-Join Game";
	join.class = "postlink";
	var spanLeft = document.createElement('span');
	spanLeft.innerHTML = " (";
	var spanRight = document.createElement('span');
	spanRight.innerHTML = ")";
	
	viewGame[0].parentNode.insertBefore(spanRight, viewGame[0].nextSibling);
	viewGame[0].parentNode.insertBefore(join, viewGame[0].nextSibling);
	viewGame[0].parentNode.insertBefore(spanLeft, viewGame[0].nextSibling);
}
