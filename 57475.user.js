// ==UserScript==
// @name           Metacritic Top Xbox 360 Used Game Prices
// @namespace      tapuri.org
// @description    Display used game prices from Gamestop on the Metacritic top Xbox 360 games for all games rated 70 or higher
// @include        http://www.metacritic.com/games/xbox360/scores/
// ==/UserScript==




var strGameStopCategoryNumber = '133';





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









function removePunctuation(parStr)
{
	return parStr.replace(/\W/g," ");
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







function removeNL(s)
{
  /*
  ** Remove NewLine, CarriageReturn and Tab characters from a String
  **   s  string to be processed
  ** returns new string
  */
  r = "";
  for (i=0; i < s.length; i++) {
    if (s.charAt(i) != '\n' &&
        s.charAt(i) != '\r' &&
        s.charAt(i) != '\t') {
      r += s.charAt(i);
      }
    }
  return r;
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
	
	retValue = removeNL(retValue);
	
	return retValue; // Return the trimmed string back to the user
} // Ends the "trim" function






function getGamePriceFromPage(parSpanElement, strPageHTML, parintIndexOf, parstrGameName, parblnUsed, parstrPageLink)
{
	var strItemSubString = strPageHTML.substring(parintIndexOf, (parintIndexOf + 2200));
	var intPriceLoc = strItemSubString.indexOf('class="prodprice">');

	if(intPriceLoc > 0)
	{
		intPriceLoc = strItemSubString.indexOf('$', intPriceLoc);
		strPriceSubString = strItemSubString.substring(intPriceLoc, (intPriceLoc + 100));
		intPriceLoc = strPriceSubString.indexOf('<');
		strPriceSubString = trim(strPriceSubString.substring(0, intPriceLoc));

		if(parblnUsed == 'false')
		{
			strPriceSubString += "n";
		}

		var intMCScore = parSpanElement.innerHTML.indexOf('(<a href');
		
		if(intMCScore > -1)
		{
			//str1 = str1.substr(0,2) + str2 + str1.substr(2)
			var strInnerHTML = parSpanElement.innerHTML;
			strInnerHTML = strInnerHTML.substr(0, intMCScore) + ' ' + strPriceSubString + ' ' + strInnerHTML.substr(intMCScore);
			parSpanElement.innerHTML = strInnerHTML;
		}
		else
		{
			parSpanElement.innerHTML += ' (' + strPriceSubString + ')';
		}
	}





	var intPriceDropLoc = strItemSubString.indexOf('Price Drop - ');

	if(intPriceDropLoc > 0)
	{
		intPriceDropLoc = strItemSubString.indexOf('Save ');
		intPriceDropLoc += 5;
		var strPriceDropSubString = strItemSubString.substring(intPriceDropLoc, (intPriceDropLoc + 10));
		intPriceDropLoc = strPriceDropSubString.indexOf('<');
		strPriceDropSubString = strPriceDropSubString.substring(0, intPriceDropLoc).replace('.00','');
		parSpanElement.innerHTML += ' (-' + strPriceDropSubString + ')'; 
	}
}




function getGamePrice(parSpanElement)
{	
	try
	{
		var strPriceSubString = "";

		var strGameName = parSpanElement.getElementsByTagName('a')[0].innerHTML;

		var strGameStopGameURL = 'http://www.gamestop.com';
		var strGameStopSearchURL = URLEncode(strGameName);
		strGameStopSearchURL = 'http://www.gamestop.com/browse/search.aspx?N=' + strGameStopCategoryNumber + '&Ntk=TitleKeyword&Ntx=mode+matchallpartial&Ntt=' + strGameStopSearchURL;

		GM_xmlhttpRequest({
		   method:"GET",
		   url:strGameStopSearchURL,
		   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script'},
		   onload:function(response) {
			var blnUsed = 'false';
			var strResults = response.responseText;
			var intIndexOf = strResults.indexOf('search_Usedtitle.gif');
			if(intIndexOf > 0)
			{
				blnUsed = 'true';
			}
			else
			{
				var intIndexOf = strResults.indexOf('search_Newtitle.gif');
			}


			if(intIndexOf > 0)
			{
				var strPageBeforeNewUsedImage = strResults.substring(0, intIndexOf);
				var strPageLink = '';
				var intGameLinkStart = strPageBeforeNewUsedImage.lastIndexOf('href=');

				if(intGameLinkStart >= 0)
				{
					intGameLinkStart += 6;
					var intGameLinkEnd = strPageBeforeNewUsedImage.indexOf('>', intGameLinkStart);

					if(intGameLinkStart >= 0)
					{
						strPageLink = 'http://www.gamestop.com' + strPageBeforeNewUsedImage.substring(intGameLinkStart, (intGameLinkEnd - 1));
					}
				}

				if(blnUsed == 'false')
				{
					GM_xmlhttpRequest({
					   method:"GET",
					   url:strPageLink,
					   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script'},
					   onload:function(response) {
							strResults = response.responseText;
							intIndexOf = strResults.indexOf('header_prod_Usedshorter.gif');
							if(intIndexOf > 0)
							{
								blnUsed = 'true';
							}
							else
							{
								var intIndexOf = strResults.indexOf('header_prod_Newshorter.gif');
							}

							getGamePriceFromPage(parSpanElement, strResults, intIndexOf, strGameName, blnUsed, strPageLink);
						}
					});
				}
				else
				{
					if(intIndexOf > 0)
					{
						getGamePriceFromPage(parSpanElement, strResults, intIndexOf, strGameName, blnUsed, strPageLink);
					}
				}
			}
		   }
		});		
	}
	catch(myError)
	{
	  //ignore
	}
}








function SetConfig(parstrConfigValueName, strValue)
{
	GM_setValue(parstrConfigValueName, strValue);
}




function GetConfig(parstrConfigValueName)
{
	return GM_getValue(parstrConfigValueName, 'false');
}







function toggle(parstrToggleName)
{
	if(GetConfig(parstrToggleName) == 'false')
	{
		SetConfig(parstrToggleName, 'true');
	}
	else
	{
		SetConfig(parstrToggleName, 'false');
	}

}




function SleepWait(naptime)
{
      //naptime = naptime * 1000;
      var sleeping = true;
      var now = new Date();
      var alarm;
      var startingMSeconds = now.getTime();
      //alert("starting nap at timestamp: " + startingMSeconds + "\nWill sleep for: " + naptime + " ms");
      while(sleeping)
      {
         alarm = new Date();
         alarmMSeconds = alarm.getTime();
         if(alarmMSeconds - startingMSeconds > naptime){ sleeping = false; }
      }      
      //alert("Wakeup!");
   }






document.getElementById('row_content').setAttribute('style', 'border-left: 0px; border-right: 0px; border-top: 0px; padding: 0px 50px 0 20px; width: 0; background: #1A334B;');

document.getElementById('masthead').style.visibility = "hidden";
document.getElementById('masthead').style.height = 0;
document.getElementById('masthead').innerHTML = "";

document.getElementById('topleaderboard').style.visibility = "hidden";
document.getElementById('topleaderboard').style.height = 0;
document.getElementById('topleaderboard').innerHTML = "";

document.getElementById('leftcolumn').style.visibility = "hidden";
document.getElementById('leftcolumn').innerHTML = "";
document.getElementById('leftcolumn').style.padding = 0;
document.getElementById('leftcolumn').style.width = 0;

document.getElementById('adcolumn').style.visibility = "hidden";
document.getElementById('adcolumn').innerHTML = "";
document.getElementById('adcolumn').style.padding = 0;
document.getElementById('adcolumn').style.width = 0;

//document.getElementById('rightcolumn').style.background = "";
document.getElementById('adcolumn').width = 400;
document.getElementById('rightcolumn').setAttribute('style', 'padding: 0px 50px 0 20px; width: 0; background: #1A334B;');
//document.getElementById('rightcolumn').style.padding = "";
//document.getElementById('rightcolumn').style.background = '';
document.getElementById('rightcolumn').getElementsByTagName('p')[0].style.visibility = "hidden";
document.getElementById('rightcolumn').getElementsByTagName('p')[0].innerHTML = "";



//var divRow_content = document.getElementById('row_content');














var columnMain = document.getElementById('rightcolumn');
var tablesAll = columnMain.getElementsByTagName('table');
for (var a = 0; a < tablesAll.length; a++)
{
	if (tablesAll[a].getElementsByTagName('tr').length > 50)
	{
		var trGameRows = tablesAll[a].getElementsByTagName('tr');

		for (var b = 0; b < trGameRows.length; b++)
		{
			var tdRowCells = trGameRows[b].getElementsByTagName('td');
			
			//var tdRowCell_PositionNumber = tdRowCells[0];
			//var tdRowCell_LinkAndName = tdRowCells[1];
			//var tdRowCell_Year = tdRowCells[2];
			//var tdRowCell_Score = tdRowCells[3];
			
			if (tdRowCells[3].getElementsByTagName('span')[0].innerHTML < 70)
			{
				b = trGameRows.length + 1;
			}
			else
			{
				getGamePrice(tdRowCells[1]);
				tdRowCells[1].getElementsByTagName('a')[0].setAttribute('style', 'color: white;');
			}
		}

		a = tablesAll.length + 1;
	}
}

