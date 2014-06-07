// ==UserScript==
// @name           Kongregate Motto
// @namespace      KnongregateMotto
// @description    Adds some humorous mottos instead of the generic "X playing X online games"
// @include        http://www.kongregate.com/*
// @include         http://www.wolfthatissavage.com/updateS.php
// @version				2.0.1
// ==/UserScript==

//Created by SavageWolf (http://www.wolfthatissavage.com/)

var ver = "2.0.1";
if(unsafeWindow.checkUpdate){unsafeWindow.checkUpdate("www.wolfthatissavage.com/creations/kongregate_motto.user.js", "Kongregate Motto Script", ver, "SavageWolf");}

function set(what){
	document.getElementById("playing").style.display = "none";
	document.getElementById("header_logo").innerHTML = "<h3 class='motto' style='color:#FFE199;font:11px/15px Verdana,Arial,sans-serif;letter-spacing:0.2em;text-transform:uppercase;'>"+what+"</h3>"+document.getElementById("header_logo").innerHTML;
}

var mottos = [
	"Watch out, it's",
	"Now in beta",
	"It has ants",
	"0/5 needs more badges",
	"The Youtube of gaming, so you know it's good",
	"Now with more Kon, less Ate",
	"Help me",
	"Better than NewGrounds, apparently...",
	"♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥",
	"Oh dear god no",
	"All your games are belong to us",
	"Who Needs Sleep?",
	"Where gamers chill and argue over stuff",
	"You are wasting your life",
	"/b/etter than most",
	"&lt;motto class='stupid' /&gt;",
	"In color",
	"Causes madness in lab rats",
	"You are using Firefox (Or Chrome... Maybe?)",
	"Waste time to earn 50×50 pixelated images",
	"We have your soul",
	"Where the impossible is just really, really hard",
	"It hates your guts",
	"Do not eat",
	"Where hackers and trolls live",
	"What are you looking at?",
	"Go outside, that is called fresh air",
	"Not a Substitute for Human Interaction",
	"Nothing by no-one",
	"Na na na na",
	"That thing that does games",
	"Where only the BEST games get badges",
	"<i>This motto has been removed by an admin or mod</i>",
	"Better than nothing",
	"Please do not read this",
	"I hate the new cards",
	":D",
	"Do not use while driving",
	"EPIC WIN",
	"Brain control may be used to maintain operation",
	"We know what you did",	"Whe<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e<sub>e</sub>e<sup>e</sup>e",
	"Deal with it",
	"Better than your mom",
	"May cause cancer",
	"May cure cancer",
	"The back alleys of the internet",
	"Everyone with a \"K\" is Greg's alt",
	"As seen in your history menu",
	"We good spellers",
	"A proud result of slavery",
	"Not just great, but",
	"Greg ate kong",
	"Screw you",
	"ALT + F4 for free points",
	"[Blank space]",
	"Call that beta?",
	"Buy kreds or else we'll kill your parents!",
	"I am not copying some of these from futurama",
	"More fun than dividing by zero!",
	"I hope your not refreshing just to see these...", /*Or reading through the source... :(*/
	"We complain about all the changes!",
	"People online playing free games",
	"&39;); DROP TABLE Games;",
	"Adobe hates this website",
	"You just won the Motto Collector Badge and 15 points!"
]

set(mottos[Math.ceil(Math.random()*mottos.length)-1]);