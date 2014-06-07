// ==UserScript==
// @name           IDC emote words
// @namespace      derp
// @description    puts a button on the IDC fullscreen to barf a phrase into a 5 line brick of emoticons.
// @include        http://www.forumwarz.com/idc
// @include        http://forumwarz.com/idc
// @version        1.2
// @copyright	   March 2010
// @creator		   TUBSWEETIE
// ==/UserScript==

// change this if lines get garbled, it's how long it waits between posts
// (milliseconds) (250)
var pausetime = 400;

// change these for different emoticon outputs.  use ones that have different colours and are the same width.
var emot_dark = ":choco:";
var emot_lite = ":vanil:";

function pause(millis){
	var date = new Date();
	var curDate = null;
	do { curDate = new Date(); }
	while(curDate-date < millis);
} 

function postLine(line) {
	var postal = line;
	document.getElementById("boring_stuff").value = postal;
	document.getElementById("ladyberries").click();
	pause(pausetime);
}

function oneLineOfText(inputstring) {

	var postable = new Array(5);
	var c;
	var word = inputstring;

	// init lines of string
	postable[0] = "";
	postable[1] = "";
	postable[2] = "";
	postable[3] = "";
	postable[4] = "";
	for (i = 0; i < word.length; i++) {
		c = word.substr(i,1);
		c = c.toUpperCase();
		switch(c){
			case  " ":
				postable[0] = postable[0] + emot_lite;
				postable[1] = postable[1] + emot_lite;
				postable[2] = postable[2] + emot_lite;
				postable[3] = postable[3] + emot_lite; 
				postable[4] = postable[4] + emot_lite;
				break;
			case "A":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_dark;
				break;
			case "B":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_lite;
				break;
			case "C":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_dark;
				break;
			case "D":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_lite;
				break;
			case "E":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_dark;
				break;
			case "F":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_lite;
				break;
			case "G":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_dark + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_dark;
				break;
			case "H":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_dark;
				break;
			case "I":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_lite + emot_dark + emot_lite;
				postable[2] = postable[2] + emot_lite + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark;
				break;
			case "J":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_lite + emot_lite + emot_dark + emot_lite;
				postable[2] = postable[2] + emot_lite + emot_lite + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_lite;
				break;
			case "K":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_lite + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_dark;
				break;
			case "L":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark;
				break;
			case "M":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_dark + emot_lite + emot_dark + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_dark + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				break;
			case "N":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_dark + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				break;
			case "O":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_lite;
				break;
			case "P":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_lite;
				break;
			case "Q":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark + emot_lite;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_dark + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_lite + emot_dark;
				break;
			case "R":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_dark;
				break;
			case "S":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[2] = postable[2] + emot_lite + emot_dark + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_lite;
				break;
			case "T":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_lite + emot_dark + emot_lite;
				postable[2] = postable[2] + emot_lite + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_lite;
				break;
			case "U":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_lite;
				break;
			case "V":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_lite + emot_lite + emot_dark + emot_lite + emot_lite;
				break;
			case "W":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_dark + emot_lite + emot_dark;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_lite + emot_dark + emot_lite;
				break;
			case "X":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_lite + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[2] = postable[2] + emot_lite + emot_lite + emot_dark + emot_lite + emot_lite;
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_lite + emot_dark;
				break;
			case "Y":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_dark;
				postable[1] = postable[1] + emot_dark + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_lite + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite;
				postable[4] = postable[4] + emot_lite + emot_dark + emot_lite;
				break;
			case "Z":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_dark;
				postable[1] = postable[1] + emot_lite + emot_lite + emot_lite + emot_dark;
				postable[2] = postable[2] + emot_lite + emot_dark + emot_dark + emot_lite;
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_lite;
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_dark;
				break;
			case "1":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_lite
				postable[1] = postable[1] + emot_dark + emot_dark + emot_lite
				postable[2] = postable[2] + emot_lite + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark
				break;
			case "2":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark
				postable[2] = postable[2] + emot_lite + emot_lite + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite + emot_lite
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_dark
				break;
			case "3":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_lite
				postable[1] = postable[1] + emot_lite + emot_lite + emot_lite + emot_dark
				postable[2] = postable[2] + emot_lite + emot_dark + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_lite + emot_lite + emot_dark
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_lite
				break;
			case "4":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_dark
				postable[1] = postable[1] + emot_dark + emot_lite + emot_dark
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark
				postable[3] = postable[3] + emot_lite + emot_lite + emot_dark
				postable[4] = postable[4] + emot_lite + emot_lite + emot_dark
				break;
			case "5":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_dark
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_lite + emot_lite + emot_dark
				postable[4] = postable[4] + emot_dark + emot_dark + emot_dark + emot_lite
				break;
			case "6":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_lite
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark + emot_lite
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_lite
				break;
			case "7":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark + emot_dark
				postable[1] = postable[1] + emot_lite + emot_lite + emot_lite + emot_dark
				postable[2] = postable[2] + emot_lite + emot_lite + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite + emot_lite
				postable[4] = postable[4] + emot_dark + emot_lite + emot_lite + emot_lite
				break;
			case "8":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark + emot_lite
				postable[1] = postable[1] + emot_dark + emot_lite + emot_lite + emot_dark
				postable[2] = postable[2] + emot_lite + emot_dark + emot_dark + emot_lite
				postable[3] = postable[3] + emot_dark + emot_lite + emot_lite + emot_dark
				postable[4] = postable[4] + emot_lite + emot_dark + emot_dark + emot_lite
				break;
			case "9":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_dark
				postable[1] = postable[1] + emot_dark + emot_lite + emot_dark
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark
				postable[3] = postable[3] + emot_lite + emot_lite + emot_dark
				postable[4] = postable[4] + emot_lite + emot_lite + emot_dark
				break;
			case "0":
				postable[0] = postable[0] + emot_lite + emot_dark + emot_lite
				postable[1] = postable[1] + emot_dark + emot_lite + emot_dark
				postable[2] = postable[2] + emot_dark + emot_lite + emot_dark
				postable[3] = postable[3] + emot_dark + emot_lite + emot_dark
				postable[4] = postable[4] + emot_lite + emot_dark + emot_lite
				break;
			case ".":
				postable[0] = postable[0] + emot_lite
				postable[1] = postable[1] + emot_lite
				postable[2] = postable[2] + emot_lite
				postable[3] = postable[3] + emot_lite
				postable[4] = postable[4] + emot_dark
				break;
			case ",":
				postable[0] = postable[0] + emot_lite + emot_lite
				postable[1] = postable[1] + emot_lite + emot_lite
				postable[2] = postable[2] + emot_lite + emot_lite
				postable[3] = postable[3] + emot_lite + emot_dark
				postable[4] = postable[4] + emot_dark + emot_lite
				break;
			case "?":
				postable[0] = postable[0] + emot_dark + emot_dark + emot_dark
				postable[1] = postable[1] + emot_lite + emot_lite + emot_dark
				postable[2] = postable[2] + emot_lite + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_lite + emot_lite
				postable[4] = postable[4] + emot_lite + emot_dark + emot_lite
				break;
			case "!":
				postable[0] = postable[0] + emot_dark + emot_lite
				postable[1]	= postable[2] + emot_dark + emot_lite
				postable[2] = postable[2] + emot_dark + emot_lite
				postable[3] = postable[3] + emot_lite + emot_lite
				postable[4] = postable[4] + emot_dark + emot_lite
				break;
			case "-":
				postable[0] = postable[0] + emot_lite + emot_lite + emot_lite
				postable[1] = postable[1] + emot_lite + emot_lite + emot_lite
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark
				postable[3] = postable[3] + emot_lite + emot_lite + emot_lite
				postable[4] = postable[4] + emot_lite + emot_lite + emot_lite
				break;
			case "+":
				postable[0] = postable[0] + emot_lite + emot_lite + emot_lite
				postable[1] = postable[1] + emot_lite + emot_dark + emot_lite
				postable[2] = postable[2] + emot_dark + emot_dark + emot_dark
				postable[3] = postable[3] + emot_lite + emot_dark + emot_lite
				postable[4] = postable[4] + emot_lite + emot_lite + emot_lite
				break;
			case "*":
				postable[0] = postable[0] + emot_dark + emot_lite + emot_dark
				postable[1] = postable[1] + emot_lite + emot_dark + emot_lite
				postable[2] = postable[2] + emot_dark + emot_lite + emot_dark
				postable[3] = postable[3] + emot_lite + emot_lite + emot_lite
				postable[4] = postable[4] + emot_lite + emot_lite + emot_lite
				break;
		}

		if (i < word.length-1) {
			postable[0] = postable[0] + emot_lite;
			postable[1] = postable[1] + emot_lite;
			postable[2] = postable[2] + emot_lite;
			postable[3] = postable[3] + emot_lite;
			postable[4] = postable[4] + emot_lite;
		}
	}

	for (i = 0; i <= 4; i++) {
		for (x = 0; x < i; x++) {
			if (postable[x] == postable[i]) {
				for (q = 1; q <= i; q++) {
					postable[i] += "&nbsp;";
				}
			}
		}
	}

	if (postable[4].length > 255)
	{
		alert("that is too long and won't display properly you buffoon");
		return 0;
	}

	for(i=0; i<5; i++) {
		postLine(postable[i]);
	}
}

function IDCemotWord() {
	var derp = document.getElementById('boring_stuff').value
	if (derp.length < 1)
	{
		return 0;
	}
	oneLineOfText(derp);
}


//fix the input thing so my button fits beside
var textbar = document.getElementById('boring_stuff');
textbar.setAttribute("style", "width: 85%;");
var where, newElement;

//hidden
where = document.getElementById('idc_form');
if (where) {
    newElement = document.createElement('input');
    newElement.setAttribute("value", "clickpost");
    newElement.setAttribute("id", "ladyberries");
    newElement.setAttribute("onclick", "javascript: submitform()");
    newElement.setAttribute("type", "button");
    newElement.setAttribute("style", "visibility:hidden");
    newElement.innerHTML  = '<script type="text/javascript">function submitform(){if(document.forms[0].onsubmit()){document.forms[0].submit();}}</script>';
    where.parentNode.insertBefore(newElement, where.nextSibling);
}

// clickable
where = document.getElementById('boring_stuff');
if (where) {
    newElement = document.createElement('input');
    newElement.setAttribute("value", "emotes");
    newElement.setAttribute("id", "cunts");
    newElement.setAttribute("type", "button");
    newElement.setAttribute("style", "margin-top: 6px;");
    newElement.addEventListener('click', IDCemotWord, false)
    where.parentNode.insertBefore(newElement, where.nextSibling);
}