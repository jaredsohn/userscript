// ==UserScript==
// @name			NeoGAF - Flip AusGAF Users
// @namespace		http://neogaf.com/forum
// @description		Flip AusGAF avatars!
// @include			http://www.neogaf.com/forum/*
// @include			http://neogaf.com/forum/*
// @version			0.0.1
// ==/UserScript==
							
console.log("* NeoGAF - Flip AusGAF: Starting");

if (document.title.indexOf("AusGAF") > -1)
{

	console.log("  - NeoGAF - Flip AusGAF: This is AusGAF dude. Flipping pics.");

	var usersFlipped = 0;
	var userDivs = document.getElementsByClassName("smallfont");
	var userDivsCount = userDivs.length;

	if (userDivsCount > 0)
	{
		for (i = 0; i < userDivsCount; ++i)
		{
		
			var userPics = userDivs[i].getElementsByTagName("img");
			var userPicsCount = userPics.length;
			
			for (j = 0; j < userPicsCount; ++j)
			{
				userPics[j].style.transform = "scaleY(-1)";
				userPics[j].style.msTransform = "scaleY(-1)";
				userPics[j].style.MozTransform = "scaleY(-1)";
				userPics[j].style.oTransform = "scaleY(-1)";
				userPics[j].style.webkitTransform = "scaleY(-1)";
				++usersFlipped;
			}
		}
	}
	else
	{
		console.log("  - NeoGAF - Flip AusGAF: Found no users");
	}

}
else
{
	console.log("  - NeoGAF - Flip AusGAF: This is NeoGAF dude. Not flipping pics.");
}


console.log("* NeoGAF - Flipped " + usersFlipped + " pictures.");
console.log("* NeoGAF - Flip AusGAF: Finished");