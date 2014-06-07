// ==UserScript==
// @name          Fast MyAnimeList
// @namespace     fast_mal
// @version       1.1
// @description   Instant add series as completed, Instant select whole anime title
// @match         http://myanimelist.net/anime/*
// @match         http://myanimelist.net/addtolist.php*
// @run-at        document-end
// @grant         none
// @noframes
// ==/UserScript==

if (typeof myinfo_toggleAdd !== "undefined")
{
	myinfo_toggleAdd = function () // lets just rewrite it
	{
		$("#addtolist").toggle("slow");
		$("#addclicker").toggle();
		$("#myinfo_status")[0].selectedIndex = 1; // completed
		$("#myinfo_status")[0].onchange(); // set watched № of series to max
		document.getElementsByName("myinfo_submit")[0].click(); // click "add"
	}
	
	function selectText() 
	{
		var range = document.createRange();
		range.selectNode(this);
		window.getSelection().removeAllRanges();
		window.getSelection().addRange(range);
	}
	
	function makeselectable() 
	{
		var title = document.getElementsByTagName("h1");
		if(title.length != 0)
		{
			var title = title[0].lastChild;
			var newElement = document.createElement("b");
			newElement.innerHTML = title.nodeValue;
			title.parentNode.insertBefore(newElement, title);
			title.parentNode.removeChild(title);
			newElement.addEventListener("click", selectText, true);
		}
		else
		{
			setTimeout(function() { makeselectable(); }, 333);
		}
	}
	makeselectable();
}

if (typeof addAnime !== "undefined")
{
	addAnimeN = addAnime;
	addAnime = function (a,b,c,d) // too long, let's hook it
	{
		addAnimeN(a,b,c,d);
		$("#status"+a)[0].selectedIndex = 2; // completed
		$("#status"+a)[0].onchange(); // set watched № of series to max
		confirmAdd(a); // add it
	}
}
