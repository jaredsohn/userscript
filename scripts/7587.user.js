// ==UserScript==
// @name SongMeanings.net User Gender Obvious-izer
// @description Maybe it's just me, but those little lines are hard to see. This should make it easier to tell the gender of users on SongMeanings.net.
// @include http://www.songmeanings.net/*
// @include http://songmeanings.net/*
// ==/UserScript==

// VERSION: 1.1 by Alan Hogan - updated to support Opera

var tds = document.getElementsByTagName("td");

// alert("hey " + tds);

for (var i in tds)
{
	//alert("loop i is " + i); //debug
	if(tds[i].className == "tableheading")
	{
		if(tds[i].style.borderBottom == "1px solid blue" || tds[i].style.borderBottomColor == "#0000ff") 
		{
			// alert("loop i is " + i + "blue"); //debug
			tds[i].style.borderBottom = "1px solid white";
			tds[i].style.background = "#113399 none";
			tds[i].style.color = "#dde2ff";
			var atags = tds[i].getElementsByTagName("a")
			for (var j in atags){
				if(atags[j] && atags[j].style)
					atags[j].style.color = "#ffffff";
			}
		}
		else if(tds[i].style.borderBottom == "1px solid pink" || tds[i].style.borderBottomColor == "#0b0000") 
		{
			// alert("loop i is " + i + "pink"); //debug
			tds[i].style.borderBottom = "1px solid white";
			tds[i].style.background = "#bb2299 none";
			tds[i].style.color = "#ffddf2";
			var atags = tds[i].getElementsByTagName("a")
			for (var j in atags){
				if(atags[j] && atags[j].style)
					atags[j].style.color = "#ffffff";
			}
		}
		// else {
		// 	alert("didn't match. loop i is " + i); //debug
		// }
	}
}



// ==/UserScript==