// ==UserScript==
// @name           Daily Plate info on Google homepage, Firefox 3 version
// @namespace      http://tapuri.org
// @include        http://google.com*
// @include        http://*.google.com*
// @include        https://google.com*
// @include        https://*.google.com*
// ==/UserScript==



var strScriptName = 'Daily Plate info on Google homepage, Firefox 3 version';
var strScriptNumber = '39580';

var intScriptVersion = '2.0';

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





















function GetUsernameFromPromptBox()
{
	var strUsername = prompt("What is the DailyPlate username of the person you would like to follow?", GetUsername());
	SetUsername(strUsername);
	window.location.reload();
}




function SetUsername(strUsername)
{
	GM_setValue("DailyPlateUserFollowedOnGoogle", strUsername);
}




function GetUsername()
{
	return GM_getValue("DailyPlateUserFollowedOnGoogle", "(none)");
}









var strUserA = GetUsername();

if (strUserA == "(none)")
{
	GetUsernameFromPromptBox();
}
else
{
	/////////////////////////////////////////////////////////////////////////
	//////////////START page-scraping thedailyplate.com prolile//////////////
	/////////////////////////////////////////////////////////////////////////

	var intCalories_Remaining = 0;
	var intCalories_Total = 0;

	GM_xmlhttpRequest({
		   method:"GET",
		   url:"http://www.thedailyplate.com/users/profile/" + strUserA + "/",
		   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script by SwornPacifist'},
		   onload:function(response) {
			var strPageText = response.responseText;
			var intIndexOfStart_Logout = strPageText.indexOf("couldn't find the profile you were looking for");

			if (intIndexOfStart_Logout == -1)
			{
			
			
			
			
			
			
				////////////////////////////////////////////////////////////////
				//////////////START gathering today's calorie info//////////////
				////////////////////////////////////////////////////////////////

				var strTotalCalories_string = "Calorie goal: ";
				var intIndexOfStart_totalCalories = strPageText.indexOf(strTotalCalories_string);
				var intIndexOfStop_totalCalories = strPageText.indexOf("&bull;", intIndexOfStart_totalCalories + 1);

				intCalories_Total = parseInt(strPageText.substring(intIndexOfStart_totalCalories, intIndexOfStop_totalCalories).replace("<b>", "").replace("</b>", "").replace(",", "").replace("Calorie goal: ", "").replace(" ", "").replace(" ", "").replace(" ", ""));

				if(strPageText.indexOf("hasn't tracked anything for today") > -1)
				{
					intCalories_Remaining = intCalories_Total;
				}
				else
				{
				
					var strConsumedCalories_string = "Consumed:";
					var intIndexOfStart_CaloriesConsumed = strPageText.indexOf(strConsumedCalories_string);

					if(intIndexOfStart_CaloriesConsumed >= -1)
					{
						var intIndexOfStop_CaloriesConsumed = strPageText.indexOf("&bull;", intIndexOfStart_CaloriesConsumed + 1);
					}
					
					intCalories_Remaining = intCalories_Total - parseInt(strPageText.substring(intIndexOfStart_CaloriesConsumed, intIndexOfStop_CaloriesConsumed).replace("<b>", "").replace("</b>", "").replace("Consumed: ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));
				
				}
				////////////////////////////////////////////////////////////////
				///////////////END gathering today's calorie info///////////////
				////////////////////////////////////////////////////////////////




			}
				buildGoogleLink();
		}
	});
	/////////////////////////////////////////////////////////////////////////
	///////////////END page-scraping thedailyplate.com prolile///////////////
	/////////////////////////////////////////////////////////////////////////


	function removePunctuation(parStr)
	{
		return parStr.replace(/\W/g," ");
	}




	function replaceAll(strString, strReplaceMe, strReplaceWith)
	{
		if((strReplaceWith.length > 0) && (strReplaceWith.indexOf(strReplaceMe) >= 0))
		{
			return strString;
		}

		while(strString.indexOf(strReplaceMe) >= 0)
		{
			strString = strString.replace(strReplaceMe, strReplaceWith);
		}

		return strString;
	}



	function buildDailyPlateLink(strAElementText)
	{
		var strReturn = '';

		if(intCalories_Total == 0)
		{
			strReturn = "Can't retrieve data from ";
			strReturn += '<a href="' + strInfoURL + '" ' + strAElementText + '>';
			strReturn += 'this page';
			strReturn += '</a>';
		}
		else
		{
			strReturn = '<a href="http://www.thedailyplate.com/users/myplate" ' + strAElementText + '>';

			if(intCalories_Remaining < 0)
			{
				strReturn += 'DailyPlate(' + (intCalories_Remaining * -1) + ' OVER, eaten ' + (intCalories_Total - intCalories_Remaining) + ' of ' + intCalories_Total;
			}
			else
			{
				strReturn += 'DailyPlate(' + intCalories_Remaining + ' left, eaten ' + (intCalories_Total - intCalories_Remaining) + ' of ' + intCalories_Total;
			}


			strReturn += ')</a>';
		}


		return strReturn;
	}


	function buildGoogleLink()
	{
		try
		{
			var elGbarDiv = document.getElementById('gbar');
			var elFirstGbarElement = elGbarDiv.firstChild;
			var spanNew = document.createElement('span');
			spanNew.innerHTML = buildDailyPlateLink('class="gb1"');
			elGbarDiv.insertBefore(spanNew,elFirstGbarElement);
		}
		catch(err)
		{
			//Ignore error, some Google sub-page components throw errors here
		}
	}
}

GM_registerMenuCommand("Set DailyPlate user to follow on Google", GetUsernameFromPromptBox);
