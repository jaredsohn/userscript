// ==UserScript==
// @name			NeoGAF - Restore Tinypic
// @namespace		http://neogaf.com/forum
// @description		Restore blocked tinypic images
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			1.0.0
// ==/UserScript==
							
//if (typeof console == "undefined") var console = { log: function() {} };
console.log("* NeoGAF - Restore Tinypic: Starting");

var imagesRestored = 0;
var postDivs = document.getElementsByClassName("post");
var postDivsCount = postDivs.length;
var textBlocked = '.************/';
var textReplace = '.tinypic.com/';

if (postDivsCount > 0)
{
	console.log("  - NeoGAF - Restore Tinypic: Parsing " + postDivsCount + " instances of the post class");
	
	for (i = 0; i < postDivsCount; ++i)
	{
		if ((postDivs[i].innerHTML.indexOf('[IMG]') > -1) && (postDivs[i].innerHTML.indexOf('[/IMG]') > -1) && (postDivs[i].innerHTML.indexOf(textBlocked) > -1))
		{
			var imageURL = postDivs[i].innerHTML.substring(postDivs[i].innerHTML.indexOf('[IMG]') + 5, postDivs[i].innerHTML.indexOf('[/IMG]'));
			imageURL = imageURL.replace(textBlocked, textReplace);
			postDivs[i].innerHTML = postDivs[i].innerHTML.replace(/\[IMG\](.*?)\[\/IMG\]/g, '<img src="' + imageURL + '" />');
			++imagesRestored;
			console.log("  - NeoGAF - Restore Tinypic: Found image - " + imageURL);
		}
	}
}
else
{
	console.log("  - NeoGAF - Restore Tinypic: Found no posts");
}

console.log("  - NeoGAF - Restore Tinypic: Restored " + imagesRestored + " images.");
console.log("* NeoGAF - Restore Tinypic: Finished");