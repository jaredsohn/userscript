// ==UserScript==
// @name           Updated Forum Remover
// @namespace      Branden Guess 
// @description    This removes the specified  forum(s) from the main forum page. Edited by Vilita
// @include        http://goallineblitz.com/game/forum_main.pl
// ==/UserScript==

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
    	
	var els = par.getElementsByTagName("*");
 
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
    

	return a;
};

//Position of Team Forum (1,2,etc.)
var forums=getElementsByClassName('alternating_color2 forum',document)
// Remove the "//" from the last line of code of any forum you wish to hide

// Announcements Forum
var forum0 = "0"
//forums[forum0].style.display="none"

// SUGGESTIONS
var forum1 = "1"
//forums[forum1].style.display="none"

// BUGS
var forum2 = "2"
//forums[forum2].style.display="none"

// FAQs
var forum3 = "3"
//forums[forum3].style.display="none"

//GOAL LINE BLITZ
var forum4 = "4"
//forums[forum4].style.display="none"

//TEST SERVER DISCUSSION
var forum5 = "5"
//forums[forum5].style.display="none"

// GAME RECAPS
var forum6 = "6"
//forums[forum6].style.display="none"

// TEAMS LOOKING FOR PLAYERS
var forum7 = "7"
//forums[forum7].style.display="none"

// PLAYERS LOOKING FOR TEAMS
var forum8 = "8"
// forums[forum8].style.display="none"

// TEAM PRESS RELEASES
var forum9 = "9"
//forums[forum9].style.display="none"

//TRADING BLOCK
var forum10 = "10"
 //forums[forum10].style.display="none"

//FRIENDLIES
var forum11 = "11"
//forums[forum11].style.display="none"

//FREE FOR ALL
var forum12 = "12"
//forums[forum12].style.display="none"

//General Discussion
var forum13 = "13"
//forums[forum13].style.display="none"

//TRASH TALKIN'
var forum14 = "14"
//forums[forum14].style.display="none"

//INTRODUCTIONS
var forum15 = "15"
//forums[forum15].style.display="none"

//Private forum Announcements
var forum16 = "16"
//forums[forum16].style.display="none"

//World League
var forum17 = "17"
//forums[forum17].style.display="none"

//USA
var forum18 = "18"
//forums[forum18].style.display="none"

//CANADA
var forum19 = "19"
//forums[forum19].style.display="none"

//EUROPE EAST
var forum20 = "20"
//forums[forum20].style.display="none"

//EUROPE WEST
var forum21 = "21"
//forums[forum21].style.display="none"

//OCEANIA
var forum22 = "22"
//forums[forum22].style.display="none"

//SOUTH AMERICA
var forum23 = "23"
//forums[forum23].style.display="none"

//SOUTHEAST ASIA
var forum24 = "24"
//forums[forum24].style.display="none"

//AFRICA
var forum25 = "25"
//forums[forum25].style.display="none"

//CASUAL LEAGUES
var forum26 = "26"
//forums[forum26].style.display="none"

//PEE WEE LEAGUES
var forum27 = "27"
//forums[forum27].style.display="none"

//MINOR LEAGUES
var forum28 = "28"
//forums[forum28].style.display="none"