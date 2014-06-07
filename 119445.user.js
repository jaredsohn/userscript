// ==UserScript==
// @name           The Space Jam Thing
// @namespace      The Space Jam Thing
// @include        http://www.gamefaqs.com/boards/402-life-the-universe-and-everything/*
// ==/UserScript==

var verseCounter = 0;

var lyrics = [
"Everybody get up it's time to slam now<br>"+
"We got a real jam goin' down<br>"+
"Welcome to the Space Jam<br>"+
"Here's your chance, do your dance at the Space Jam<br>"+
"Alright....",

"Come on and slam, and welcome to the jam<br>"+
"Come on and slam, if you wanna jam<br>"+
"Hey you, watcha gonna do<br>"+
"Hey you, watcha gonna do<br>"+
"Hey you, watcha gonna do<br>"+
"Hey you, watcha gonna do",

"Party people in the house lets go<br>"+
"It's your boy Rooski a'ight so<br>"+
"Pass that thing and watch me flex<br>"+
"Behind my back, you know what's next<br>"+
"To the jam, all in your face<br>"+
"Wassup, just feel the bass<br>"+
"Drop it, rock it, down the room<br>"+
"Shake it, quake it, space KABOOM...",

"C'mon it's time to get hyped say \"Hoop there it is\"<br>"+
"C'mon all the fellas say \"Hoop there it is\"<br>"+
"C'mon one time for the ladies say \"Hoop there it is\"<br>"+
"Now all the fellas say \"Hoop there it is\"<br>"+
"C'mon and run, baby run<br>"+
"C'mon, C'mon, do it, run baby run",

"C'mon and slam, and welcome to the jam<br>"+
"C'mon and slam, if you wanna jam<br>"+
"C'mon and slam, and welcome to the jam<br>"+
"C'mon and slam, if you wanna jam",

"Slam, Bam, Thank you ma'am<br>"+
"Get on the floor and jam<br>"+
"It's the QCD on the microphone<br>"+
"Girl you got me in the zone"
];


// Check for username in message list
var selectedMessagesUser =
document.evaluate("//table[@class='board message']//tr/td//a[@class='name']/text()", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var selectedMessagesBodies =
document.evaluate("//table[@class='board message']//tr[@class='even']/td/div[@class='msg_body']", document, null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


// Check messages
for ( var i = 0; i < selectedMessagesUser.snapshotLength; ++i ) {
  var item1 = selectedMessagesUser.snapshotItem(i);
  var item2 = selectedMessagesBodies.snapshotItem(i);
  if ( item1.nodeValue.match( "roos1046 Reborn" )){
	  var nodeChildren = item2.childNodes;
	  
	  while(item2.childNodes.length>1){
		  var item3 = item2.childNodes.item(1);
		  item2.removeChild(item3);
	  }
	item2.innerHTML = "<b><font face='comic sans ms' color='darkred'>"+lyrics[verseCounter%lyrics.length]+"</font></b>";
	verseCounter++;
  }
}