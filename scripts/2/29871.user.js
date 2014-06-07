// ==UserScript==
// @name           Rotten Tomatoes movie links to VideoETA
// @namespace      http://swornpacifist.net/RottenTomatoesMovieLinkToVideoETA/
// @description    Rotten Tomatoes movie links to VideoETA
// @include        http://www.rottentomatoes.com/*
// @include        http://rottentomatoes.com/*
// ==/UserScript==


//http://userscripts.org/scripts/review/29871?format=txt
//http://userscripts.org/scripts/show/29871
//http://userscripts.org/scripts/source/29871.user.js

var strScriptName = 'Rotten Tomatoes movie links to VideoETA';
var strScriptNumber = '29871';

var intScriptVersion = '1.8';

var strURLScriptText = 'http://userscripts.org/scripts/review/' + strScriptNumber+ '?format=txt';
var strURLScriptInstall = 'http://userscripts.org/scripts/source/' + strScriptNumber+ '.user.js';
var strURLScriptInfo = 'http://userscripts.org/scripts/show/' + strScriptNumber;



GM_xmlhttpRequest({
	   method:"GET",
	   url:strURLScriptText,
	   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script by SwornPacifist'},
	   onload:function(response) {
		var strScriptText = response.responseText;
		var intVersionStart = strScriptText.indexOf("var intScriptVersion = '") + 24;
		var intVersionStop = strScriptText.indexOf("'", intVersionStart);
		var dblVersion = parseFloat(strScriptText.substring(intVersionStart, intVersionStop));
		
		if (dblVersion > parseFloat(intScriptVersion))
		{
			var answer = confirm('There is a newer version of the Greasemonkey script: "' + strScriptName + '" script, it will now install the most recent version');

			if (answer == true)
			{
				GM_openInTab(strURLScriptInfo);
				window.location.href = strURLScriptInstall;
			}
		}
	}
});



function isNumber(sText)
{
	var ValidChars = "0123456789.";
	var blnIsNumber=true;
	var Char;

	for (i = 0; i < sText.length && blnIsNumber == true; i++) 
	{ 
		Char = sText.charAt(i); 
		if (ValidChars.indexOf(Char) == -1) 
		{
			blnIsNumber= false;
		}
	}
	return blnIsNumber;
}






function cleanMovieName(parstrMovieTitle)
{
	var strMovieTitle = '';
	parstrMovieTitle = removePunctuation(parstrMovieTitle);
	parstrMovieTitle = trim(parstrMovieTitle);
	parstrMovieTitle = parstrMovieTitle.replace(/(\s)/g, '_');
	var arrMovieTitleParts = parstrMovieTitle.split('_');

	for (b = 0; b < arrMovieTitleParts.length; b++)
	{
		if (isNumber(arrMovieTitleParts[b]) && (parseInt(arrMovieTitleParts[b]) > 1000000))
		{
			//ignore number
		}
		else
		{
			strMovieTitle = strMovieTitle + removePunctuation(arrMovieTitleParts[b]) + ' ';
		}
	}

	return strMovieTitle;
}






function getTitleFromURL(parstrURL)
{
	var strMovieTitle = '';
	var blnMovieTitleNext = false;
	var arrMovieTitleParts = parstrURL.split('/');

	for (c = 0; c < arrMovieTitleParts.length; c++)
	{
		if (arrMovieTitleParts[c] == "m")
		{
			strMovieTitle = arrMovieTitleParts[c+1];
			break;
		}
	}
	return strMovieTitle;
}






function removePunctuation(parStr)
{
	return parStr.replace(/\W/g," ");
}






function trim(inputString)
{
	// Removes leading and trailing spaces from the passed string. Also removes
	// consecutive spaces and replaces it with one space. If something besides
	// a string is passed in (null, custom object, etc.) then return the input.
	if (typeof inputString != "string")
	{
		return inputString;
	}
	var retValue = inputString;
	var ch = retValue.substring(0, 1);
	while (ch == " ")
	{ // Check for spaces at the beginning of the string
		retValue = retValue.substring(1, retValue.length);
		ch = retValue.substring(0, 1);
	}
	ch = retValue.substring(retValue.length-1, retValue.length);
	while (ch == " ")
	{ // Check for spaces at the end of the string
		retValue = retValue.substring(0, retValue.length-1);
		ch = retValue.substring(retValue.length-1, retValue.length);
	}
	while (retValue.indexOf("  ") != -1)
	{ // Note that there are two spaces in the string - look for multiple spaces within the string
		retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
	}
	return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function



function createVideoETALinkAtElement(parEl, parMovieTitle)
{
		var divNew = document.createElement('span');
		var strURL = cleanMovieName(parMovieTitle);
		strURL = trim(strURL);
		strURL = strURL.replace(/(\s)/g, '+');

		//divNew.innerHTML='<i><a href="http://videoeta.com/search/?search_query=' + strURL + '"> <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAADNJREFUCNd9jEEOACAIw4Yv78/naQkalFMHHQIMWJLCydmdcB8aA16TPBUj1kesLj4/ZjaWUSN8xrMoWQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM1MO6znwAAAABJRU5ErkJggg0K"></a></i>';
		//elmLink.addEventListener("click", my_func, true);

		divNew.innerHTML=' <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAADNJREFUCNd9jEEOACAIw4Yv78/naQkalFMHHQIMWJLCydmdcB8aA16TPBUj1kesLj4/ZjaWUSN8xrMoWQAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM1MO6znwAAAABJRU5ErkJggg0K">';
		var divIMGs = divNew.getElementsByTagName('img');
		divIMGs[0].addEventListener('click', handleETAClicked, true);

		parEl.parentNode.insertBefore(divNew,parEl.nextSibling);
}




function URLEncode (clearString) {
  var output = '';
  var x = 0;
  clearString = clearString.toString();
  var regex = /(^[a-zA-Z0-9_.]*)/;
  while (x < clearString.length) {
    var match = regex.exec(clearString.substr(x));
    if (match != null && match.length > 1 && match[1] != '') {
    	output += match[1];
      x += match[1].length;
    } else {
      if (clearString[x] == ' ')
        output += '+';
      else {
        var charCode = clearString.charCodeAt(x);
        var hexVal = charCode.toString(16);
        output += '%' + ( hexVal.length < 2 ? '0' : '' ) + hexVal.toUpperCase();
      }
      x++;
    }
  }
  return output;
}






function handleETAClicked()
{
	var titles = this.parentNode.parentNode.parentNode.getElementsByTagName('a');
	var strVideoETASearchURL = '';
	
	if (window.location.href.indexOf("rottentomatoes.com/m/") >= 0)
	{
		strVideoETASearchURL = trim(cleanMovieName(getTitleFromURL(window.location.href)));
	}
	else if (titles[0].href.indexOf("rottentomatoes.com/m/") == -1)
	{
		strVideoETASearchURL = trim(cleanMovieName(getTitleFromURL(window.location.href)));
	}
	else
	{
		strVideoETASearchURL = trim(cleanMovieName(getTitleFromURL(titles[0].href)));
	}
	
	var strRottenMovieName = strVideoETASearchURL;
	
	strVideoETASearchURL = URLEncode(strVideoETASearchURL);
	strVideoETASearchURL = 'http://videoeta.com/search/?search_query=' + strVideoETASearchURL;

	 GM_xmlhttpRequest({
	   method:"GET",
	   url:strVideoETASearchURL,
	   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script by SwornPacifist'},
	   onload:function(response) {
		var spanEl = document.createElement('span');
		spanEl.innerHTML = response.responseText;
		
		var tableRows = spanEl.getElementsByTagName('tr');
	   	var intRowsUpcoming = 0;
	   	var ahrefLastUpcoming;
	   	var intRowsPreTheater = 0;
	   	var ahrefLastPreTheater;
	   	var intRowsCurrent = 0;
	   	var ahrefLastCurrent;
	   	
	   	var intRowsUpcomingFiltered = 0;
	   	var ahrefLastUpcomingFiltered;
	   	var intRowsPreTheaterFiltered = 0;
	   	var ahrefLastPreTheaterFiltered;
	   	var intRowsCurrentFiltered = 0;
	   	var ahrefLastCurrentFiltered;
	   	
	   	var intRowsUpcomingExactMatch = 0;
	   	var ahrefLastUpcomingExactMatch;
	   	var intRowsPreTheaterExactMatch = 0;
	   	var ahrefLastPreTheaterExactMatch;
	   	var intRowsCurrentExactMatch = 0;
	   	var ahrefLastCurrentExactMatch;
	   	
		for (var a = 0; a < tableRows.length; a++)
		{
		
			var linksInForLoop = tableRows[a].getElementsByTagName('a');

			if (linksInForLoop.length > 0)
			{
				var strVideoETAMovieTitleForLoop = ''
				
				if(tableRows[a].getAttribute('class') == 'upcoming')
				{
					strVideoETAMovieTitleForLoop = linksInForLoop[0].text;
					
					if (strVideoETAMovieTitleForLoop == '')
					{
						strVideoETAMovieTitleForLoop = linksInForLoop[1].text;
					}
					
					
					intRowsUpcoming += 1;
					ahrefLastUpcoming = linksInForLoop[0].href;

					if (similarTitle(cleanMovieName(strRottenMovieName), strVideoETAMovieTitleForLoop))
					{
						intRowsUpcomingFiltered += 1;
						ahrefLastUpcomingFiltered = ahrefLastUpcoming;
						
						if (exactTitle(cleanMovieName(strRottenMovieName), strVideoETAMovieTitleForLoop))
						{
							intRowsUpcomingExactMatch += 1;
							ahrefLastUpcomingExactMatch = ahrefLastUpcoming;
						}
					}
				}
				else if(tableRows[a].getAttribute('class') == 'pretheatrical')
				{
					strVideoETAMovieTitleForLoop = linksInForLoop[0].text;
					intRowsPreTheater += 1;
					ahrefLastPreTheater = linksInForLoop[0].href;

					if (similarTitle(cleanMovieName(strRottenMovieName), strVideoETAMovieTitleForLoop))
					{
						intRowsPreTheaterFiltered += 1;
						ahrefLastPreTheaterFiltered = ahrefLastPreTheater;

						if (exactTitle(cleanMovieName(strRottenMovieName), strVideoETAMovieTitleForLoop))
						{
							intRowsPreTheaterExactMatch += 1;
							ahrefLastPreTheaterExactMatch = ahrefLastPreTheater;
						}
					}
				}
				else if(tableRows[a].getAttribute('class') == 'current')
				{
					strVideoETAMovieTitleForLoop = linksInForLoop[0].text;
					intRowsCurrent += 1;
					ahrefLastCurrent = linksInForLoop[0].href;

					if (similarTitle(cleanMovieName(strRottenMovieName), strVideoETAMovieTitleForLoop))
					{
						intRowsCurrentFiltered += 1;
						ahrefLastCurrentFiltered = ahrefLastCurrent;

						if (exactTitle(cleanMovieName(strRottenMovieName), strVideoETAMovieTitleForLoop))
						{
							intRowsCurrentExactMatch += 1;
							ahrefLastCurrentExactMatch = ahrefLastCurrent;
						}
					}
				}
			}
		}
		
//		alert("intRowsCurrent= " + intRowsCurrent + "      "  + 
//			"intRowsCurrentFiltered= " + intRowsCurrentFiltered + "      "  + 
//			"intRowsCurrentExactMatch= " + intRowsCurrentExactMatch + "      "  + 
//			"intRowsPreTheater= " + intRowsPreTheater + "      "  + 
//			"intRowsPreTheaterFiltered= " + intRowsPreTheaterFiltered + "      "  + 
//			"intRowsPreTheaterExactMatch= " + intRowsPreTheaterExactMatch + "      "  + 
//			"intRowsUpcoming= " + intRowsUpcoming + "      "  + 
//			"intRowsUpcomingFiltered= " + intRowsUpcomingFiltered + "      "  + 
//			"intRowsUpcomingExactMatch= " + intRowsUpcomingExactMatch);

		var strLoadURL = strVideoETASearchURL;
		
		if (intRowsPreTheaterExactMatch == 1)
		{
			strLoadURL = ahrefLastPreTheaterExactMatch;
		}
		else if (intRowsUpcomingExactMatch == 1)
		{
			strLoadURL = ahrefLastUpcomingExactMatch;
		}
		else if (intRowsCurrentExactMatch == 1)
		{
			strLoadURL = ahrefLastCurrentExactMatch;
		}
		else if (intRowsPreTheaterFiltered == 1)
		{
			strLoadURL = ahrefLastPreTheaterFiltered;
		}
		else if (intRowsUpcomingFiltered == 1)
		{
			strLoadURL = ahrefLastUpcomingFiltered;
		}
		else if (intRowsCurrentFiltered == 1)
		{
			strLoadURL = ahrefLastCurrentFiltered;
		}
		else if (intRowsPreTheater == 1)
		{
			strLoadURL = ahrefLastPreTheater;
		}
		else if (intRowsUpcoming == 1)
		{
			strLoadURL = ahrefLastUpcoming;
		}
		else if (intRowsCurrent == 1)
		{
			strLoadURL = ahrefLastCurrent;
		}
		
		
		if (strLoadURL.indexOf('/movie/') >= 0)
		{
			    strLoadURL = 'http://videoeta.com/movie/' + strLoadURL.split("/movie/")[1];
		}

		window.location.href = strLoadURL;
	   }
	 });
}









function getURLFromVideoETAtr(parElementTR)
{
	var strReturnURL = '';
	
	var aLinks = parElementTR.getElementsByTagName('a');
	
	if (aLinks.length > 0)
	{
		strReturnURL = aLinks[0].href;
	}

	return strReturnURL;
}







function similarTitle(parstrTitle1, parstrTitle2)
{
	if (
		(parstrTitle1.length == 0) ||
		(parstrTitle2.length == 0)
		)
	{
		return false;
	}


	parstrTitle1 = trim(parstrTitle1.toUpperCase().replace(/^THE /, ""));
	parstrTitle2 = trim(parstrTitle2.toUpperCase().replace(/^THE /, ""));
	
	if (
		(parstrTitle1.indexOf(parstrTitle2) >= 0) || 
		(parstrTitle2.indexOf(parstrTitle1) >= 0)
	) 
	{
		return true;
	}
	else
	{
		return false;
	}
}




function exactTitle(parstrTitle1, parstrTitle2)
{
	if (
		(parstrTitle1.length == 0) ||
		(parstrTitle2.length == 0)
		)
	{
		return false;
	}


	parstrTitle1 = trim(parstrTitle1.toUpperCase().replace(/^THE /, ""));
	parstrTitle2 = trim(parstrTitle2.toUpperCase().replace(/^THE /, ""));
	
	if (parstrTitle1 == parstrTitle2)
	{
		return true;
	}
	else
	{
		return false;
	}
}









if (
	(location.href.indexOf("http://www.rottentomatoes.com/m/") == 0) ||
	(location.href.indexOf("http://rottentomatoes.com/m/") == 0)
	)
{
	var h1s = document.getElementsByTagName('h1');
	for (var e = 0; e < h1s.length; e++)
	{
		if(h1s[e].getAttribute("class").indexOf("movie_title") >= 0)
		{
		    createVideoETALinkAtElement(h1s[e],h1s[e].innerHTML);
		}
	}
}




var links = document.getElementsByTagName('a');
for (var d = 0; d < links.length; d++)
{

if (links[d].href.indexOf("/m/") >= 0)
{
	if(!((links[d].text.indexOf('%') >= 0) &&
                       (isNumber(parseInt(links[d].text.replace('%', '')))))
            && 
           (links[d].innerHTML.indexOf("<img") < 0)
            && 
           (links[d].innerHTML.indexOf("&gt;") < 0)
            &&
           ((links[d].href.indexOf("/m/") == 0) || 
               (links[d].href.indexOf("http://www.rottentomatoes.com/m/") == 0) || 
               (links[d].href.indexOf("http://rottentomatoes.com/m/") == 0))
            &&
           ((links[d].href.length <= (links[d].href.indexOf(getTitleFromURL(links[d].href)) + getTitleFromURL(links[d].href).length) + 1) || (links[d].href.indexOf(getTitleFromURL(links[d].href) + "/showtimes.php") >= 0))
            &&
           (links[d].text.indexOf("More..") == -1)
            &&
           (links[d].text.indexOf("More Info..") == -1)
            &&
           (trim(cleanMovieName(getTitleFromURL(links[d].href))).length > 0)
)
	{
               createVideoETALinkAtElement(links[d], getTitleFromURL(links[d].href));
	}
	}
}