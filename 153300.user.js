// ==UserScript==
// @name			NeoGAF - StopGIF
// @namespace		http://neogaf.com/forum
// @description		Stop those damned animated GIFs!
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			1.0.0
// ==/UserScript==
							
//if (typeof console == "undefined") var console = { log: function() {} };
console.log("* NeoGAF - StopGIF: Starting");

var gifsHidden = 0;
var postDivs = document.getElementsByClassName("post");
var postDivsCount = postDivs.length;

if (postDivsCount > 0)
{
	console.log("  - NeoGAF - StopGIF: Parsing " + postDivsCount + " instances of the post class");
	
	for (i = 0; i < postDivsCount; ++i)
	{
		var postPics = postDivs[i].getElementsByTagName("img");
		var postPicsCount = postPics.length;
		
		if (postPicsCount > 0)
		{
			for (j = 0; j < postPicsCount; ++j)
			{
		
				if ((postPics[j].src.indexOf('.gif') > -1) && (postPics[j].src.indexOf('viewpost.gif') <= -1))
				{
					var hiddenImage = postPics[j].src;
					var newDivRandom = Math.floor((Math.random()*100000)+1);
					var newDivID = "stopGIF_message_" + newDivRandom;
					var gifID = "stopGIF_hidden_" + newDivRandom;
					var newElement = document.createElement('div');
					
					newElement.id = newDivID;
					
					postPics[j].parentNode.appendChild(newElement);
					postPics[j].id = gifID;
					postPics[j].style.display = "none";
					
					var addedElement = document.getElementById(newDivID);
					
					addedElement.innerHTML = "[A GIF was hidden, click here to unhide it]<br />";
					addedElement.style.cursor = "pointer";
					addedElement.setAttribute("data-GIF", newDivRandom);
					addedElement.addEventListener("click", function() { console.log("  - NeoGAF - StopGIF: Unhiding " + this.getAttribute("data-GIF")); document.getElementById("stopGIF_hidden_" + this.getAttribute("data-GIF")).style.display = "block"; this.style.display = "none"; }, false);
					
					++gifsHidden;
				}
			}
		}
	}
}
else
{
	console.log("  - NeoGAF - StopGIF: Found no posts");
}

console.log("  - NeoGAF - StopGIF: Hid " + gifsHidden + " GIFs.");
console.log("* NeoGAF - StopGIF: Finished");