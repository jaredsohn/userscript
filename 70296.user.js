// ==UserScript==
// @name           Genie Game Settings
// @namespace      http://homepages.nyu.edu/~ef820
// @include        http://genie.game-host.org/openlist.htm
// ==/UserScript==

//Set game type

var gametype = 2;
//0 = Race for the Galaxy
//1 = Gathering Storm
//2 = Gathering Storm with Goals

var game = document.getElementsByName("type");
if (!game.length)
	return;
game[gametype].checked = true;

//Set number of players

var numplayers = 2
//0 = solo player
//1 = 2p
//2 = 2p adv
//3 = 3p
//4 = 4p

var nump = document.getElementsByName("nump");
if (!nump.length)
	return;
nump[numplayers].checked = true;

//Set description

var desc = "realtime";

var textareas = document.getElementsByTagName("textarea");
for(var i=0; i < textareas.length; i++)
{
	if(textareas[i].name == 'ghead')
	{
		textareas[i].focus();
		textareas[i].value = desc;
		break;
	}
}