// ==UserScript==
// @name        ASSTR Sanitise
// @namespace   ASSTR
// @description Hides some posters (Nifty, PZA, Snuff etc.  Not for me), Makes some mass posters easier to understand by extracting more info and adding to the story link, and adds a [prefix] to some well known posters whose stories match no patterns.
// @include     http://www.asstr.org/newfiles*
// @version     1
// ==/UserScript==


GM_log("ASSTR Sanitise Start");
var links = document.getElementsByTagName("a");
if (links)
{
	for(var i=0; i<links.length; i++)
	{
		var parent = links[i].parentNode.parentNode;
		if (parent)
		{
			if (parent.nodeName == "TR")
			{
				// HIDE Stuff you don't want.  Looks for the author string in the 
				// href and sets the parent table row to display none
				if (links[i].href.indexOf("Nifty") > 0)
				{
					parent.style.display = "none";
					GM_log("ASSTR Sanitise: Nifty Cleaned")
				}
				if(links[i].href.indexOf("~pza") > 0)
				{
					parent.style.display = "none";
					GM_log("ASSTR Sanitise: PZA Cleaned")
				}
				if(links[i].href.indexOf("Joans_True_3-some_Stories") > 0)
				{
					parent.style.display = "none";
					GM_log("ASSTR Sanitise: Joan Cleaned")
				}
				if(links[i].href.indexOf("~himeros") > 0)
				{
					parent.style.display = "none";
					GM_log("ASSTR Sanitise: Himeros Cleaned")
				}
				if(links[i].href.indexOf("Snuff") > 0)
				{
					parent.style.display = "none";
					GM_log("ASSTR Sanitise: Snuff Cleaned")
				}
				
				// ADD data to the href.innerHTML.  
				// Useful for archive spams that all have the same title
				if(links[i].href.indexOf("/~LS/authors/") > 0)
				{
					GM_log("Loliwood Studios");
					var patt = new RegExp("/([a-z])[a-z][a-z].html");
					var array = patt.exec(links[i].href).toString().split(",");
					links[i].innerHTML += " - Authors " + array[1].toUpperCase() + " Index";
				}
				if(links[i].href.indexOf("/~LS/titles/") > 0)
				{
					GM_log("Loliwood Studios");
					var patt = new RegExp("/([a-z])[a-z][a-z].html");
					var array = patt.exec(links[i].href).toString().split(",");
					links[i].innerHTML += " - Titles " + array[1].toUpperCase() + " Index";
				}
				if(links[i].href.indexOf("/~LS/stories/") > 0)
				{
					GM_log("Loliwood Studios");
					var patt = new RegExp("/([a-z]*)[0-9]*.html");
					var array = patt.exec(links[i].href).toString().split(",");
					links[i].innerHTML += " - by " + array[1];
				}
				if(links[i].href.indexOf("/~Cordial_Knot/authors/") > 0)
				{
					GM_log("Cordial Knot");
					var patt = new RegExp("/([a-z0-9]*)/([a-z0-9]*).html", "i");
					var array = patt.exec(links[i].href).toString().split(",");
					links[i].innerHTML += " - " + array[2] + " by " + array[1];
				}
				
				// TAG certain authors for a consistent look and feel
				if(links[i].href.indexOf("Kelly85/") > 0)
				{
					GM_log("Kelly");
					links[i].innerHTML = "[Kelly] " + links[i].innerHTML;
				}
				if(links[i].href.indexOf("Donna_M/") > 0)
				{
					GM_log("Donna M");
					links[i].innerHTML = "[Donna M] " + links[i].innerHTML;
				}
				if(links[i].href.indexOf("mcstories/") > 0)
				{
					GM_log("MC Stories");
					links[i].innerHTML = "[MC] " + links[i].innerHTML;
				}

			}
			else
			{
				GM_log("Parent node is not a TR")
			}
		}
		else
		{
			GM_log("Parent node is null")
		}
	}
}
GM_log("ASSTR Sanitise End");

RegExp.escape = function(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}