// ==UserScript==
// @name			NeoGAF - Skinny AusGAF
// @namespace		http://neogaf.com/forum
// @description		Make AusGAF (and all of NeoGAF) skinny!
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			1.0.1
// ==/UserScript==

// ********************************************************************************

var ausGAFThreadID = 480803;
var backgroundImages = new Array(
									"http://images3.alphacoders.com/871/87149.jpg",
									"http://images.alphacoders.com/372/37281.jpg",
									"http://images4.alphacoders.com/198/198884.jpg",
									"http://images4.alphacoders.com/198/198884.jpg",
									"http://images4.alphacoders.com/161/161586.jpg",
									"http://images4.alphacoders.com/231/2318.jpg",
									"http://modusproductions.com/neogaf/wallpaper/rocketkight.jpg",
									"http://www.deviantart.com/download/92284772/Green_Hill_Zone_by_Orioto.jpg",
									"http://www.deviantart.com/download/100678031/Night_Encounter_by_Orioto.jpg",
									"http://www.deviantart.com/download/97824569/Aquatic_Run_by_Orioto.jpg",
									"http://orioto.free.fr/Prints/PlumberSummer1200p.jpg",
									"http://ns223506.ovh.net/rozne/8e16d1e54547dcddc849a96108e35d8b/wallpaper-111670.jpg"
								);

// ********************************************************************************
								
console.log("* NeoGAF - Skinny AusGAF: Starting");

var ausGAFThread = "showthread.php?t=" + ausGAFThreadID;
var ausGAFSteamChat = "steam://friends/joinchat/103582791430120104";
var ausGAFIRC = "http://webchat.gamesurge.net/?channels=AusGAF";
var newTab = "<li class=\"\"><a href=\"" + ausGAFThread + "&goto=newpost\">AusGAF</a></li><li class=\"child\"><a href=\"" + ausGAFSteamChat + "&goto=newpost\" _target=\"new\">Steam</a></li><li class=\"child\"><a href=\"" + ausGAFIRC + "&goto=newpost\" _target=\"new\">IRC</a></li>";
var numBackgroundImages = backgroundImages.length;

var forumTabs = document.getElementsByClassName("forum-tabs");
var liveButton = document.getElementsByClassName("live-button");
var theContent = document.getElementById("contentwrap");
var theHeader = document.getElementById("header");
var theFooter = document.getElementById("footer");

if (theContent)
{
	console.log("  - NeoGAF - Skinny AusGAF: Reducing size of page");
	theContent.style.width = "1060px";
	theContent.style.margin = "auto";
}
else
{
	console.log("  - NeoGAF - Skinny AusGAF: Could not reduce size of page");
}

if (theHeader)
{
	console.log("  - NeoGAF - Skinny AusGAF: Moving header up to make it look nicer");
	theHeader.style.marginBottom = "-13px";
}
else
{
	console.log("  - NeoGAF - Skinny AusGAF: Could not find header");
}

if (theFooter)
{
	console.log("  - NeoGAF - Skinny AusGAF: Moving footer up to make it look nicer");
	theFooter.style.marginTop = "-27px";
}
else
{
	console.log("  - NeoGAF - Skinny AusGAF: Could not find footer");
}

if (numBackgroundImages > 0)
{
	console.log("  - NeoGAF - Skinny AusGAF: Setting random background image from " + numBackgroundImages + " available");
	var randomImage = Math.floor(Math.random() * numBackgroundImages);
	var theBody = document.getElementsByTagName("body");
	theBody[0].style.backgroundImage = "url('" + backgroundImages[randomImage] + "')";
	theBody[0].style.backgroundAttachment = "fixed";
	theBody[0].style.backgroundRepeat = "no-repeat";
	theBody[0].style.backgroundPosition = "top center";
}
else
{
	console.log("  - NeoGAF - Skinny AusGAF: No background images specified");
}

if (forumTabs[0])
{
	console.log("  - NeoGAF - Skinny AusGAF: Adding AusGAF tab");
	forumTabs[0].innerHTML += newTab;
	forumTabs[1].innerHTML += newTab;
}
else
{
	console.log("  - NeoGAF - Skinny AusGAF: Could not find forum tabs");
}

if (liveButton[0])
{
	console.log("  - NeoGAF - Skinny AusGAF: Starting live thread updates");
	liveButton[0].click();
}
else
{
	console.log("  - NeoGAF - Skinny AusGAF: Live thread not found");
}

console.log("  - NeoGAF - Skinny AusGAF: Changing maximum image width");
document.body.innerHTML += "<style>img { max-width: 858px; }</style>";

console.log("* NeoGAF - Skinny AusGAF: Finished");
