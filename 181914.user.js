// ==UserScript==
// @name           linuxprint
// @author		   Mordred666
// @description    shows remaining pages
// @include        https://linuxprint.informatik.uni-hamburg.de/*
// ==/UserScript==

(
function() 
{ 
	var fonts = new Array();
	fonts = document.getElementsByTagName("font")  

	var tagged;

	for(var i = 0; i < fonts.length ; i++)
	{
		if(fonts[i].size == "+2" && fonts[i].innerHTML.indexOf("Restguthaben") != -1)
		{
			tagged = fonts[i];
			break;
		}
	}
 
	if(tagged)
	{
		var value =  tagged.innerHTML.replace(/[^0-9]*/, "");
		value = value.replace("<sup>", "");
		value = value.replace("</sup>", "");
		value = parseInt(parseFloat(value) / 0.021);
		tagged.innerHTML = tagged.innerHTML +" Seiten: <b>"+ value+"</b>";
	}

}
)();