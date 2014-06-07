
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// i hafta apologize for the sloppy code.  im sure there is > 1000 better / faster ways to do this same thing.
// hex to rgb code taken from http://jdstiles.com/java/rgb.html and modified to fit my purpose.
//
// this hunts down the first instances of your search terms (they show up in googles 'note' at the top)
// and turns them into links to the next instances of each.  Each successive instances links to the next.
//
// is anyone else too lazy for [ctrl] + [f] ?
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "googlecache", and click Uninstall.
//
// --------------------------------------------------------------------
//
// WHAT IT DOES:
// turn highlighted search terms into links to the next instance.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name    	    google cache
// @description     google cache surfing
// @include         http://*
// ==/UserScript==
	




(function() {


//does this look like a google archive page?
if(document.URL.indexOf("search?q=cache:") > 0){



	function gDec(Hex)
	{
	   if(Hex == "A")
	      Value = 10;
	   else
	   if(Hex == "B")
	      Value = 11;
	   else
	   if(Hex == "C")
	      Value = 12;
	   else
	   if(Hex == "D")
	      Value = 13;
	   else
	   if(Hex == "E")
	      Value = 14;
	   else
	   if(Hex == "F")
	      Value = 15;
	   else
	      Value = eval(Hex);
	
	   return Value;
	}


	function HexToDec(Input)
	{
	
	   Input = Input.toUpperCase();
	   if(Input.substring(0, 1) == "#"){Input = Input.substring(1, 7)}	   
	
	   a = gDec(Input.substring(0, 1));
	   b = gDec(Input.substring(1, 2));
	   c = gDec(Input.substring(2, 3));
	   d = gDec(Input.substring(3, 4));
	   e = gDec(Input.substring(4, 5));
	   f = gDec(Input.substring(5, 6));
	
	   x = (a * 16) + b;
	   y = (c * 16) + d;
	   z = (e * 16) + f;
	
	   return "rgb("+x+", "+y+", "+z+")"
	}
	
	
	
	var i;
	var ii;
	var CurB;
	var termCount = 0;
	var searchTerms = new Array(2);
	searchTerms[0] = new Array();
	searchTerms[1] = new Array();

	var currInst = new Array();

	
	//find our search terms
	for(i = 0; i < document.getElementsByTagName('td').length; i ++){
	     curB = document.getElementsByTagName('td')[i]
	     if(curB.childNodes[0].tagName == 'B' && curB.childNodes[0].childNodes[0].tagName == 'FONT'){  //this could easily turn up false positives.  work around?
	          searchTerms[0][termCount] = curB.childNodes[0].childNodes[0].innerHTML;  //grab the search term for good measure - we use the color to track terms.
	          curB.innerHTML = '<a href=\''+document.URL+'#term' + parseInt(termCount) + 'inst0\' style=text-decoration:none;color:black;>' + curB.innerHTML + '</a>'; 
	          currInst[termCount] = 0;   //initialize our occurrence tracker
	          searchTerms[1][termCount] = HexToDec(curB.bgColor);
	          termCount = termCount + 1;
	     };
	}
	 
	//find our occurrences
	for(i = 0; i < document.getElementsByTagName('b').length; i ++){   //cycle through bold tags
	     curB = document.getElementsByTagName('b')[i]
	     for(ii = 0; ii < searchTerms[0].length; ii ++){      //cycle through our terms
	          
	          if(curB.style.color == 'black' && curB.style.backgroundColor == searchTerms[1][ii]){  //could also turn up false positives :(
	               curB.innerHTML = '<a name=term' + ii + 'inst' + currInst[ii] +' href=\''+document.URL+'#term' + ii + 'inst' + (currInst[ii] + 1) + '\' style=text-decoration:none;color:black;>' + curB.innerHTML + '</a>'
	               currInst[ii] = currInst[ii] + 1;;
	          }
	
	     }
	     
	}


	
}



}

)();