// ==UserScript==
// @name          LUElinks Random Signature
// @description   Chooses a sig for you from your selection
// @namespace	http://links.endoftheinter.net/linkme.php?l=237420
// @include http://boards.endoftheinter.net/postmsg.php*
// @include http://links.endoftheinter.net/postmsg.php*
// @include http://endoftheinter.net/priv.php*
// @exclude http://boards.endoftheinter.net/postmsg.php?board=444
// ==/UserScript==

// Version 2.0
// ~Kalphak

var Options=new Array()


/*

*********WARNING!*********

Don't be a dick.

You know what I mean.

*/

// Edit the bit below here.

// Make "backupsig" to whatever your current sig is (minus the '---')
// When you're on LL on another computer (so you wont have this script on, it will display that)

var backupsig = "LOL SIG";

// Add more options in format: Options[x] = "message";
// To add a new line, use "\n" (without quotes) - you may only have two lines. 

Options[0] = "Sig #1";
Options[1] = "Sig #2";
Options[2] = "Sig #3 (Line 1)\n<i>Line 2</i>";
Options[3] = "Sig #4 (Line 1)\n<i>Line 2</i>";


// Don't edit anything below this line.
// -------------------------------------------------------------
























// No seriously, don't.

var O = Options.length;
var whichOption=Math.round(Math.random()*(O-1));
var opt = Options[whichOption];

var post = document.getElementsByTagName("textarea")[0];

var postval = post.value;

backupsig = backupsig;

post.value = postval.replace(backupsig, opt);

// ~Kalphak. PM with any bugs/problems.