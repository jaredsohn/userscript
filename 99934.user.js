// ==UserScript==
// @name           Youtube Pocodot Remover
// @include	http://youtube.com/*v=*
// @include	http://www.youtube.com/*v=*
// ==/UserScript==

//As we learned from Viagra I probably won't think of all the variations of pocodot
// I'll create a regex for each letter and expand it as I see variations
//3 days after I first started using this I see the first extended characters
//Youtube viewers are quick to report the spam so I don't necessarily get to test
//As this regex grows you'll notice a delay in removing the comments.
//There seems to be a bug catching the particular unicode range I'm looking for \u24C5 etc
var regxSpace="[\\s_]?";
var regxP="[pP\\u24C5\\u24DF]"+regxSpace;
var regxO="(\\(\\)|[oO0ÒÓÔÕÖØðòôóõöø¤\\u24C4\\u24DE\\u25CE]|\\[\\])"+regxSpace;
var pregxC="[cC©ç\\u24B8\\u24D2]"; //p for private (doesn't match properly because it doesn't look for a space
var pregxD="[dD\\u24B9\\u24D3]";
var regxCD="("+pregxC+"|"+pregxD+")"+regxSpace;//Some people use the wrong spelling let alone l33t
var regxT="[tT\\u24C9\\u24E3]";
var pattern=new RegExp(regxP+regxO+regxCD+regxO+regxCD+regxO+regxT);

// Start by getting the comments they are identified by their class
// Thanks to variant of http://www.dustindiaz.com/getelementsbyclass/
// The code is posted to be shared but no license is given. I want to thank him anyway
// I implmented his code staticly instead of as a function
// I've made searchClass="comment", node="document", tag="li"
// I created declarations of i and j
// I removed elsLen, it was only used once
// I changed the count direction after I ran into issues removing elements of the "comment hidden flagged" class
// As mentioned on the previous line I added added code to remove all the instances of one class regardless of content.
var classElements = new Array();
var els = document.getElementsByTagName("li");
//Declare the counters now to avoid script errors
var i = 0;
var j = 0;
//Counting backwards is needed to remove the "comment hidden flagged" (spam) comments
//Otherwise the wrong comments are removed (I suspect the index shifts)
for (i=els.length-1 ; i >= 0; i--) 
{
	if(els[i].className=="comment hidden flagged")
	{
		els[i].parentNode.removeChild(els[i]);
	}
	else if ( els[i].className=="comment" )
	{
		classElements[j] = els[i];
		j++;
	}
}
//Now remove comments containg podocot
//Search backwards to avoid shifting index problems experienced with removing the spam comments
for(i=classElements.length-1;i>=0;i--)
{
	var comTexts = classElements[i].getElementsByTagName("p");
	//Remember to check all the paragraphs there frequently comTexts.length=1, which is fine
	for(j=comTexts.length-1;j>=0;j--)
	{
		//The paragraph element does not contain the comment, the innerHTML does.
		if(pattern.test(comTexts[j].innerHTML))
		{
			classElements[i].parentNode.removeChild(classElements[i]);
			break; //Found podocot and removed the entire comemnt. Don't need to check more
		}
	}
}