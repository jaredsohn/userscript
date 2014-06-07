// ==UserScript==
// @name			NeoGAF - Show banned users
// @namespace		http://neogaf.com/forum
// @description		Put those banned users behind bars!
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			0.0.1
// ==/UserScript==
							
console.log("* NeoGAF - Show banned users: Starting");

var bannedText = document.getElementsByClassName("smallfont");
var bannedTextCount = bannedText.length;
var bannedImage = "http://i.imgur.com/3psTH.png";

if (bannedTextCount > 0)
{

	console.log("  - NeoGAF - Show banned users: Parsing " + bannedTextCount + " instances of the smallfont class");

	for (i = 0; i < bannedTextCount; ++i)
	{
		if (bannedText[i].innerHTML.toUpperCase() == "BANNED")
		{
			console.log("  - NeoGAF - Show banned users: Found a banned user at " + i + "/" + bannedTextCount);
			bannedText[i + 2].innerHTML += "<img style=\"position: relative; float: left; top: 132px; margin-top: -120px;\" src=\"" + bannedImage + "\" />";
		}
	}

}
else
{
	console.log("  - NeoGAF - Show banned users: Found no users");
}

console.log("* NeoGAF - Show banned users: Finished");