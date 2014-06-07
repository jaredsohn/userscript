// ==UserScript==
// @name          blackjack for Opera
// @description   forumwarz automatic blackjack script v1.02, by Neona, ported to Opera by quangntenemy
// @include       http://forumwarz.com/characters/me
// @include       http://*.forumwarz.com/characters/me
// ==/UserScript==

GM_log = alert;//opera.postError;

 // !-------------------------!\\
// start stuff you should edit \\

var minflezz = 1000000;		// script will stop playing if flezz would drop below this level
var maxwins = 20;			// how many times you want to win. usually 20, if you're aiming for your daily antifreeze
var betamount = 10000;	// how much to bet. usually 10000, again for antifreeze
var debug = false;			// set to true to see debug output in error log

 // !---------------------! \\
// end stuff you should edit \\

window.addEventListener('load', function() { waitForStart(); },false); 

var flezz;
var botname = "Gamble-Bot 3000";
var wins = 0;
var bottotal = 0;
var playertotal = 0;
var playeraces = 0;
var first = false;
var chatindex = 0;
var lose = 0;

var hard8 = [1,1,1,1,3,3,1,1,1,1];
var hard9 = [1,3,3,3,3,3,1,1,1,1];
var hard10 = [1,3,3,3,3,3,3,3,3,1];
var hard12 = [1,1,1,0,0,0,1,1,1,1];
var hard13 = [1,0,0,0,0,0,1,1,1,1];

var soft1 = [1,1,1,3,3,3,1,1,1,1];
var soft6 = [1,3,3,3,3,3,1,1,1,1];
var soft7 = [1,0,2,2,2,2,0,0,1,1];
var soft8 = [3,3,3,3,3,2,3,3,3,3];

function waitForStart() {
	if(document.getElementById("chat_table")) {
		waitForChat(botname, function(chat) { Start(chat); });
	} else {
		setTimeout(waitForStart, 1000);
	}
}

function waitForChat(from, action) {
	if(debug) GM_log("Waiting");
	var ChatTable = document.getElementById("chat_table");
	if(ChatTable.lastChild && ChatTable.lastChild.innerHTML.indexOf(from) != -1 && document.getElementById("container_" + (chatindex+2).toString()) && document.getElementById("choices").style.display != 'none') {
		setTimeout(function() {action(ChatTable.lastChild.lastChild);}, 500);
		chatindex++;
		chatindex++;
	} else {
		setTimeout(function() {waitForChat(from, action);},500);
	}
}

function Start(chat) {
	if(chat.innerHTML.indexOf("Hey there") != -1) {
		takeChoice("I sure am");
		waitForChat(botname, function(text) { Start(text); });
		return;
	}
	if(chat.innerHTML.indexOf("You can play") != -1) {
		flezz = parseInt(chat.getElementsByTagName("span")[0].innerHTML.replace(/[^0-9]/g, ""));
		takeChoice("Blackjack");
		waitForChat(botname, function(text) { Play(text); });
		return;
	}
}

function takeChoice(text) {
	text = text.toLowerCase();
	if(document.getElementById("choices").innerHTML.toLowerCase().indexOf(text) == -1) {
		setTimeout( function() { takeChoice(text); }, 200);
		if(debug) GM_log("waiting for choices");
		return;
	}
	var Choices = document.getElementById("choices").getElementsByTagName("li");
	for (i = 0; i < Choices.length; i++) {
		var Choice = Choices[i];
		if(Choice.innerHTML.toLowerCase().indexOf(text) != -1) {
			try {
				var fireOnThis = Choice.getElementsByTagName("a")[0];
				var evObj = document.createEvent('MouseEvents');
				evObj.initMouseEvent( 'click', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null );
				fireOnThis.dispatchEvent(evObj);
				if(debug) GM_log("Taking choice: "+text);
				return;
			} catch(e) {
				if(debug) GM_log(e.toString());
				setTimeout( function() { takeChoice(text); }, 200);
				return;
			}
		}
	}
}


function Play(chat) {
	if(chat.innerHTML.indexOf("How much do you want to bet") != -1) {
		takeChoice('<span class="flezz">' + betamount.toString().replace(/000$/, ",000") + '</span>');
		first = true;
		waitForChat(botname, function(text) { Play2(text); });
		return;
	}
}

function Play2(chat) {
	if(chat.innerHTML.indexOf("You win") != -1) {
		Finish(chat);
		return;
	}
	if(chat.innerHTML.indexOf("I'm showing") == -1) {
		setTimeout(function() { Play2(chat); }, 200);
		return;
	}
	var items = chat.getElementsByTagName("div");
	var pos = 0;
	while(pos < items.length) {
		if(items[pos].innerHTML.indexOf("Your Hand") != -1) {
			pos++;
			playertotal = 0;
			playeraces = 0;
			var cards = items[pos].getElementsByTagName("img");
			for (i = 0; i < cards.length; i++) {
				var url = cards[i].getAttribute("src");
				if(readCard(url) != 1) {
					playertotal = playertotal + readCard(url);
				} else {
					playeraces = playeraces + 1;
				}
			}
		}
		if(items[pos].innerHTML.indexOf("I'm showing") != -1) {
			pos++;
			bottotal = 0;
			var cards = items[pos].getElementsByTagName("img");
			for (i = 0; i < cards.length; i++) {
				var url = cards[i].getAttribute("src");
				bottotal = bottotal + readCard(url);
			}
		}
		pos++;
	}
	Decide();
}

function Play3(chat) {
	first = false;
	if(chat.innerHTML.indexOf("BUSTED") != -1) {
		Finish(chat);
		return;
	}
	playertotal = 0;
	playeraces = 0;
	var cards = chat.lastChild.getElementsByTagName("img");
	for (i = 0; i < cards.length; i++) {
		var url = cards[i].getAttribute("src");
		if(readCard(url) != 1) {
			playertotal = playertotal + readCard(url);
		} else {
			playeraces = playeraces + 1;
		}
	}
	Decide();
}
function Decide() {
	if(debug) GM_log("Total: " + playertotal + "  Aces: " + playeraces);
	while(playeraces > 1) {
		playertotal++;
		playeraces--;
	}
	if(playeraces == 1 && 11+playertotal > 21) {
		playertotal++;
		playeraces--;
	}
	if(playeraces == 0) {
		switch(playertotal) {
			case 21:
			case 20:
			case 19:
			case 18:
			case 17:
				decideChoice(0);
				break;
			case 16:
			case 15:
			case 14:
			case 13:
				decideChoice(hard13[bottotal-1]);
				break;
			case 12:
				decideChoice(hard12[bottotal-1]);
				break;
			case 11:
				decideChoice(3);
				break;
			case 10:
				decideChoice(hard10[bottotal-1]);
				break;
			case 9:
				decideChoice(hard9[bottotal-1]);
				break;
			case 8:
				decideChoice(soft8[bottotal-1]);
				break;
			case 7:
			case 6:
			case 5:
			case 4:
				decideChoice(1);
				break;
			default:
				decideChoice(0);
		}
	} else {
		switch(playertotal) {
			case 9:
				decideChoice(0);
				break;
			case 8:
				decideChoice(soft8[bottotal-1]);
				break;
			case 7:
				decideChoice(soft7[bottotal-1]);
				break;
			case 6:
				decideChoice(soft6[bottotal-1]);
				break;
			case 5:
			case 4:
			case 3:
			case 2:
			case 1:
				decideChoice(soft1[bottotal-1]);
				break;
			default:
				decideChoice(0);
		}
	}
}
function decideChoice(choice) {
	switch(choice) {
		case 0:
			takeChoice("Stand");
			waitForChat(botname, function(text) { Finish(text); });
			break;
		case 1:
			takeChoice("Hit");
			waitForChat(botname, function(text) { Play3(text); });
			break;
		case 2:
			if(first && ((flezz - 2 * betamount) > minflezz)) {
				takeChoice("Double");
			} else {
				takeChoice("Stand");
			}
			waitForChat(botname, function(text) { Finish(text); });
			break;
		case 3:
			if(first && ((flezz - 2 * betamount) > minflezz)) {
				takeChoice("Double");
				waitForChat(botname, function(text) { Finish(text); });
			} else {
				takeChoice("Hit");
				waitForChat(botname, function(text) { Play3(text); });
			}
			break;
		default:
			takeChoice("Stand");
			waitForChat(botname, function(text) { Finish(text); });
	}
}
function Finish(chat) {
	if(chat.innerHTML.indexOf("win") != -1) {
		wins++;
	} else {
		lose++;
	}
	var divs = chat.getElementsByTagName("div");
	for (i = 0; i < divs.length; i++) {
		var div = divs[i];
		if(div.innerHTML.indexOf("You have") != -1) {
			flezz = parseInt(div.getElementsByTagName("span")[0].innerHTML.replace(/[^0-9]/g, ""));
			break;
		}
	}
	if(wins <= maxwins && (flezz - betamount) >= minflezz) {
		takeChoice("same bet");
		waitForChat(botname, function(text) { Play2(text); });
	} else {
		if(debug) GM_log("Lost " + lose + " times.");
	}
}
function readCard(text) {
	var Card = text.substring(text.lastIndexOf('/')+1,text.indexOf(".jpg"));
	if(debug) GM_log("Read: " + Card);
	switch(Card) {
		case "queen":
		case "king":
		case "jack":
		case "ten":
			return 10;
		case "nine":
			return 9;
		case "eight":
			return 8;
		case "seven":
			return 7;
		case "six":
			return 6;
		case "five":
			return 5;
		case "four":
			return 4;
		case "three":
			return 3;
		case "two":
			return 2;
		case "ace":
			return 1;
		default:
			return 0;
	}
}
//*/
