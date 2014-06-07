// ==UserScript==
// @name           BoringRPG
// @namespace      BoringRPG
// @include        http://www.boringrpg.com/game
// ==/UserScript==

timer();

function timer() {
var doctitl = document.title;
document.getElementById("chat-chatbox").style.height="400px";
//document.forms[0].elements[1].value="Pray game now!";

	if (doctitl == "Click now! :: Boring RPG :: Home"){
		document.title = "going";
		setTimeout(delaysubmit, 2000);	
	};
  setTimeout(timer, 1000);
}

function delaysubmit() {
	document.forms[0].elements[1].click();
}