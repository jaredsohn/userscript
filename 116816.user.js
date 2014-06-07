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

var backupsig = "The jam was excellent!! The rock n roll was perfect!!!" 

// Add more options in format: Options[x] = "message";
// To add a new line, use "\n" (without quotes) - you may only have two lines. 

Options[0] = "Rock over London, Rock on Chicago,\nSam Goody - Goody got it";
Options[1] = "Rock over London, Rock on Chicago,\nWheaties the breakfast of champions!";
Options[2] = "Rock over London, Rock on Chicago,\nWestern Union: It's the Fastest Way To Send Money!";
Options[3] = "Rock over London, Rock on Chicago,\nFolger's, It's good to the last drop!";
Options[4] = "Rock over London, Rock on Chicago,\nPolaroid. See What Develops.";
Options[5] = "Rock over London, Rock on Chicago,\nMusic Land, we got what's hot!";
Options[6] = "Rock over London, Rock on Chicago,\nWal-Mart, always a low price, always!";
Options[7] = "Rock over London, Rock on Chicago,\nCompUSA, it's the computer superstore!";
Options[8] = "Rock over London, Rock on Chicago,\nGuitar Center, it's the musician's choice!";
Options[9] = "Rock over London, Rock on Chicago,\nRent-a-Center, it's the one store that has it all!";
Options[10] = "Rock over London, Rock on Chicago,\nAll-State, you're in good hands!";


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