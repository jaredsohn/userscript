// ==UserScript==
// @name           ToodleDo PSP Games List
// @namespace      google.com
// @description    Displays Metacritic scores and Gamestop used game prices for PSP game lists
// @include        http://*.toodledo.com*
// ==/UserScript==



var strConsoleName = 'PSP';
var strFolderName = 'PSP Games';
var strMetaCriticCategory = 'psp';
var strGameStopCategoryNumber = '136';





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

		if(parstrPageLink.length > 0)
		{
			strPriceSubString = '<a href="' + parstrPageLink + '">' + strPriceSubString + "</a>"
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
			parSpanElement.innerHTML += ' ' + strPriceSubString;
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
{	try
	{
		if(GetConfig('Toodledo ' + strConsoleName + ' Gamestop') == 'false')
		{
			return "";
		}

		var strPriceSubString = "";

		var strGameName = parSpanElement.innerHTML;
		if(strGameName.indexOf("-") == 0)
		{
			strGameName = strGameName.substring(1, 99999);
		}
		if(strGameName.indexOf("{") == 0)
		{
			strGameName = strGameName.substring(1, 99999);
		}
		var intParenStart = strGameName.indexOf("(");
		if(intParenStart == 0)
		{
			strGameName = strGameName.substring((strGameName.indexOf(")") + 1), 99999);
		}
		intParenStart = strGameName.indexOf("(");
		if(intParenStart > 0)
		{
			strGameName = trim(strGameName.substring(0, intParenStart));
		}

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




function getGameScore(parSpanElement)
{
	try
	{
		if(GetConfig('Toodledo ' + strConsoleName + ' Metacritic') == 'false')
		{
			return "";
		}

		var strGameName = parSpanElement.innerHTML;
		if(strGameName.indexOf("-") == 0)
		{
			strGameName = strGameName.substring(1, 99999);
		}
		if(strGameName.indexOf("{") == 0)
		{
			strGameName = strGameName.substring(1, 99999);
		}
		var intParenStart = strGameName.indexOf("(");
		if(intParenStart == 0)
		{
			strGameName = strGameName.substring((strGameName.indexOf(")") + 1), 99999);
		}
		intParenStart = strGameName.indexOf("(");
		if(intParenStart > 0)
		{
			strGameName = trim(strGameName.substring(0, intParenStart));
		}

		var strGameScore = "";
		var strGameScoreSubString = "";
		strMetacriticGameURL = strGameName;
		strMetacriticGameURL = URLEncode(strMetacriticGameURL);
		strMetacriticGameURL = 'http://apps.metacritic.com/search/process?ty=3&tfs=game_title&sb=0&game_platform=' + strMetaCriticCategory + '&x=5&y=12&ts=' + strMetacriticGameURL;

		GM_xmlhttpRequest({
		   method:"GET",
		   url:strMetacriticGameURL,
		   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script'},
		   onload:function(response) {
			var strResults = response.responseText;
			var intIndexOfStart = strResults.indexOf('View Results:');
			if(intIndexOfStart > 0)
			{
				var intIndexOfEnd = strResults.lastIndexOf('View Results:');
				strResults = strResults.substring(intIndexOfStart, intIndexOfEnd).toLowerCase();

				var intGameLinkStart = strResults.lastIndexOf('href=');
				var strPageLink = '';
				
				if(intGameLinkStart >= 0)
				{
					intGameLinkStart += 6;
					var intGameLinkEnd = strResults.indexOf('>', intGameLinkStart);


					if(intGameLinkStart >= 0)
					{
						strPageLink = strResults.substring(intGameLinkStart, (intGameLinkEnd - 1));
					}
				}

				intIndexOfStart = strResults.indexOf('<span');

				if(intIndexOfStart < 0)
				{
					return "";
				}

				intIndexOfStart = strResults.indexOf('>', intIndexOfStart);
				intIndexOfEnd = strResults.indexOf('</span>',intIndexOfStart);

				strGameScore = strResults.substring((intIndexOfStart + 1), intIndexOfEnd);

				if(strGameScore != "xx")
				{
					var strPriceAndLink = '';
					
					strPriceAndLink += ' (';

					if(strPageLink.length > 0)
					{
						strPriceAndLink +=  '<a href="' + strPageLink + '">';
					}

					strPriceAndLink += 'MC' + strGameScore;

					if(strPageLink.length > 0)
					{
						strPriceAndLink += "</a>";
					}

					strPriceAndLink += ')';
					parSpanElement.innerHTML += strPriceAndLink;
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





var strSkip = '---@' + strFolderName + '---';
var statusH3 = document.getElementById('status');
if(statusH3.innerHTML.indexOf(strFolderName) >= 0)
{
	var spans = document.getElementsByTagName('span');
	for (var a = 0; a < spans.length; a++)
	{
		if(GetConfig('Toodledo ' + strConsoleName + ' Gamestop') == 'false')
		{
			GM_registerMenuCommand('Turn ' + strConsoleName + ' Gamestop Prices ON',function(){toggle('Toodledo ' + strConsoleName + ' Gamestop');});
		}
		else
		{
			GM_registerMenuCommand('Turn ' + strConsoleName + ' Gamestop Prices OFF',function(){toggle('Toodledo ' + strConsoleName + ' Gamestop');});
		}


		if(GetConfig('Toodledo ' + strConsoleName + ' Metacritic') == 'false')
		{
			GM_registerMenuCommand('Turn ' + strConsoleName + ' Metacritic Scores ON',function(){toggle('Toodledo ' + strConsoleName + ' Metacritic');});
		}
		else
		{
			GM_registerMenuCommand('Turn ' + strConsoleName + ' Metacritic Scores OFF',function(){toggle('Toodledo ' + strConsoleName + ' Metacritic');});
		}

		if((spans[a].hasAttribute('id')) && (0 == (spans[a].getAttribute('id').indexOf('tsk'))) && (-1 == (spans[a].innerHTML.indexOf(strSkip))) && (-1 == (spans[a].innerHTML.indexOf("~"))))
		{
			getGamePrice(spans[a]);
			getGameScore(spans[a]);

			//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
			//a = spans.length + 1;
			//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
		}
	}
}