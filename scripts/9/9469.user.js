// Dice-A-Roomatic  2007-05-26
// version 0.9 BETA!
// please use it at your own risk & don't tell me I didn't warn you
// Copyright (c) 2007, Tcd
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Dice-a-Roomatic", and click Uninstall.
//
// The best way to use this script is in conjunction with the "QuikStok"
// script. Before starting this script, get the "QuikStok" script from
// userscripts, install it and activate it. This way you won't lose food
// items to the pant devil. :)
// --------------------------------------------------------------------
// HISTORY: Originally, it was called "Dice-A-Rite!" and was a script 
// by Tom Friday. I took it, modified and debugged it, while writing
// another scriptlet for neopets.com, that would automate in some
// fashion the quickstock form. You can find "QuikStok" at:
//       http://userscripts.org/scripts/show/9317
//
// If you want to see the "father" of this script, it's at:
//       http://userscripts.org/scripts/show/2445
//
// THANKS TO "alien_scum" and "Henrik N" who helped me in writing
//            the code for this script :)
//
// TO DO: substitute the often-long title string with something more
//        compact... (I know, I'm gonna bang my head on javascript's
//        arrays)
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Dice-a-Roomatic 0.9
// @namespace     neopets
// @description   Plays dice-a-roo for you. Used together with the script "QuikStok", makes you safe from the Pant Devil. Please read the first part of this script file!
// @include       http://www.neopets.com/games/play_dicearoo.phtml
// @include       http://www.neopets.com/games/dicearoo.phtml
// ==/UserScript==

// modifiable variable:
var TO = 6000;
// it's 6 seconds, FYI. You can tweak this to accommodate both your CPU & connection speeds.

// Don't ever EVER think about adding style="display:none" in code_str!
// The "display:none" prevents QuikStok from doing its job. Be happy the
// iframe is at the bottom of the page and has size 0*0 :)
function addQSframe()
{
	var ni = document.getElementById('footer');
	var QSname = "QSdiv";
	var QSiframe = document.createElement('div');
	QSiframe.setAttribute("id",QSname);
	var url = "http://neopets.com/quickstock.phtml";
	code_str = "<iframe align=\"center\" frameborder=\"0\" height=\"0\" id=\"quikstok\" "; 
	code_str += "name=\"quikstok\" scrolling=\"no\" src=\""+ url +"\" width=\"0\" ";
	code_str +="</iframe>";
	QSiframe.innerHTML = code_str;
	ni.appendChild(QSiframe);
	ni.insertBefore(QSiframe, ni.childNode);
}

// congrats go to Google for finding this elegant piece of code.
function removeQSframe()
{
	var d = document.getElementById('footer');
	var olddiv = document.getElementById('QSdiv');
	d.removeChild(olddiv);
}

// I'm starting to get the hang of functions... or not?
// the "returning value" function still elude me :(
function pressRollAgain()
{
	RAInput = document.evaluate(
		"//input[@value='Roll Again']", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	NewInput = RAInput.snapshotItem(0);
	window.setTimeout(function(){NewInput.parentNode.submit()},2*TO);
}

var allInput, thatInput, allImg, thisImg, Roll;

// Roll and RollHistory produces a string like
// RRRRBBBBGGGGGFGGGGFGGYYYYFYYYFYYYYY visible in both
// Tools -> Error Console and in the title bar of Dice-a-Roo window/tab
// that gets reset when you lost a game or get the jackpot. Won't get
// reset by your pet getting bored.
// I want to make it more compact before I hit a very lucky streak
// that might crash FF :)... something like mmhmmm...
// "4R 4B 5G F 2G 4Y F 3Y F 5Y"
Roll = GM_getValue("RollHistory", "");

allInput = document.evaluate(
	'//input[@value]', document, null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for (var i = 0; i < allInput.snapshotLength; i++)
{
	thatInput = allInput.snapshotItem(i);

	switch (thatInput.value)
	{
		case 'Roll Again':
			allImg = document.evaluate(
			'//img[@src]', document, null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);

			for (var x = 0; x < allImg.snapshotLength; x++)
			{
    			thisImg = allImg.snapshotItem(x);

				if (thisImg.src.indexOf('dice/red') != -1)
				{
					GM_setValue("RollHistory", Roll + 'R');
					document.title = 'Dice:' + Roll;
					thatInput.parentNode.submit();
				}

				if (thisImg.src.indexOf('dice/blue') != -1)
				{
					GM_setValue("RollHistory", Roll + 'B');
					document.title = 'Dice:' + Roll;
					thatInput.parentNode.submit();
				}

				if (thisImg.src.indexOf('dice/green') != -1)
				{
					GM_setValue("RollHistory", Roll + 'G');
					document.title = 'Dice:' + Roll;
					if (document.body.innerHTML.indexOf("Food!") !=-1)
					{
						GM_setValue("RollHistory", Roll + 'F');
						document.title = 'Dice:' + Roll;
						addQSframe();
						window.setTimeout(function(){removeQSframe()},TO);
						pressRollAgain();
					}
					else {thatInput.parentNode.submit();}
				}

				if (thisImg.src.indexOf('dice/yellow') != -1)
				{
					GM_setValue("RollHistory", Roll + 'Y');
					document.title = 'Dice:' + Roll;
					if (document.body.innerHTML.indexOf("Food!") !=-1)
					{
						GM_setValue("RollHistory", Roll + 'F');
						document.title = 'Dice:' + Roll;
						addQSframe();
						window.setTimeout(function(){removeQSframe()},TO);
						pressRollAgain();
					}
					else {thatInput.parentNode.submit();}
				}

				if (thisImg.src.indexOf('dice/silver') != -1)
				{
					GM_setValue("RollHistory", Roll + 'S');
					document.title = 'Dice:' + Roll;
					if (document.body.innerHTML.indexOf("Food!") !=-1)
					{
						GM_setValue("RollHistory", Roll + 'F');
						document.title = 'Dice:' + Roll;
						addQSframe();
						window.setTimeout(function(){removeQSframe()},TO);
						pressRollAgain();
					}
					else {thatInput.parentNode.submit();}
				}
			}
		break;

// 1st page
		case 'Play Dice-A-Roo':
			thatInput.parentNode.parentNode.submit();
		break;

// This is the jackpot!
		case 'Play Again!':
			GM_log(Roll + 'Jackpot!');
			GM_setValue("RollHistory", "");
		break;

// This is a losing game!
		case 'Press Me':
			GM_log(Roll + 'Lost');
			GM_setValue("RollHistory", "");
			thatInput.parentNode.parentNode.submit();
		break;

// Bypass the King Roo page
		case 'Lets Play! (Costs 5 NP)':
		thatInput.parentNode.submit();
		break;
		default:
	}
}

if (document.body.innerHTML.indexOf("SO BORED of Dice-A-Roo") !=-1)
	{alert("Duuuude, let's do something else now!");}