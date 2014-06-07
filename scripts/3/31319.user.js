// ==UserScript==
// @name           Daily Plate info on Google homepage
// @namespace      http://tapuri.org
// @include        http://*.google.com/*
// @include        https://*.google.com/*
// ==/UserScript==


var strScriptName = 'Daily Plate info on Google homepage';
var strScriptNumber = '31319';

var intScriptVersion = '1.4';

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




/////////////////////////////////////////////////////////////////////////
//////////////START page-scraping thedailyplate.com prolile//////////////
/////////////////////////////////////////////////////////////////////////

var intCalories_Remaining = 0;
var intCalories_Total = 0;

var intAverageCalories_DaysBack = 0;
var intAverageCalories_TotalCalories = 0;

GM_xmlhttpRequest({
	   method:"GET",
	   url:"http://www.thedailyplate.com/users/myplate/",
	   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script by SwornPacifist'},
	   onload:function(response) {
		var strPageText = response.responseText;
		var intIndexOfStart_Logout = strPageText.indexOf("Logout");
		
		if (intIndexOfStart_Logout >= 0)
		{
			////////////////////////////////////////////////////////////////
			//////////////START gathering today's calorie info//////////////
			////////////////////////////////////////////////////////////////

			var intIndexOfStart_totalCalories = strPageText.indexOf("should be around");
			var intIndexOfStop_totalCalories = strPageText.indexOf(" to", intIndexOfStart_totalCalories + 1);
			intCalories_Total = parseInt(strPageText.substring(intIndexOfStart_totalCalories, intIndexOfStop_totalCalories).replace("<b>", "").replace("</b>", "").replace(",", "").replace("should be around", "").replace(" ", "").replace(" ", "").replace(" ", ""));

			if(strPageText.indexOf("You haven't yet tracked any foods for today") > -1)
			{
				intCalories_Remaining = intCalories_Total;
			}
			else
			{
				var intIndexOfStart_calories = strPageText.indexOf("You may eat about");
				
				if(intIndexOfStart_calories == -1)
				{
					intIndexOfStart_calories = strPageText.indexOf("You are about ");
					var intIndexOfStop_calories = strPageText.indexOf("your recommended daily caloric", intIndexOfStart_calories + 1);
					intCalories_Remaining = (-1) * parseInt(strPageText.substring(intIndexOfStart_calories, intIndexOfStop_calories).replace("<b>", "").replace("</b>", "").replace("You are about ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));
				}
				else
				{
					var intIndexOfStop_calories = strPageText.indexOf("additional calories today", intIndexOfStart_calories + 1);
					intCalories_Remaining = parseInt(strPageText.substring(intIndexOfStart_calories, intIndexOfStop_calories).replace("<b>", "").replace("</b>", "").replace("You may eat about", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));
				}
			}
			////////////////////////////////////////////////////////////////
			///////////////END gathering today's calorie info///////////////
			////////////////////////////////////////////////////////////////
			
		
		
		
			///////////////////////////////////////////////////////////////////////
			//////////////START gathering week's average calorie info//////////////
			///////////////////////////////////////////////////////////////////////
			try
			{
				var intIndexOfStart_WeekTable = response.responseText.indexOf("document.location.href='myplate/?when=");
				var intIndexOfStart_TD = response.responseText.indexOf("<td", intIndexOfStart_WeekTable);
				var intIndexOfStop_TD = response.responseText.indexOf("</td", intIndexOfStart_TD + 4);

				for (var i = 0; i < 5; i++)
				{
					if((response.responseText.indexOf('Total cals', intIndexOfStart_TD) >= intIndexOfStart_TD) && 
						(response.responseText.indexOf('Total cals', intIndexOfStart_TD) <= intIndexOfStop_TD))
					{
						var strTotalCals = "Total cals:";
						var intIndexOfStart_TotalCals = response.responseText.indexOf(strTotalCals, intIndexOfStart_TD);
						var intIndexOfStart_NetCals = response.responseText.indexOf("Net cals:", intIndexOfStart_TotalCals + 1);

						intAverageCalories_TotalCalories += parseInt(replaceAll(removePunctuation(replaceAll(response.responseText.substring(intIndexOfStart_TotalCals + strTotalCals.length, intIndexOfStart_NetCals - 1), "<br>", "")), " ", ""));
						intAverageCalories_DaysBack += 1;
					}

				 intIndexOfStart_TD = response.responseText.indexOf("<td", intIndexOfStop_TD + 4);
				 intIndexOfStop_TD = response.responseText.indexOf("</td", intIndexOfStart_TD);
				}
			}
			catch(err)
			{
				//Ignoring error
			}
			///////////////////////////////////////////////////////////////////////
			///////////////END gathering week's average calorie info///////////////
			///////////////////////////////////////////////////////////////////////
		
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
		strReturn = '<a href="http://www.thedailyplate.com/users/login.php" ' + strAElementText + '>';
		strReturn += 'Daily Plate [login]';
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
		
		
		if(intAverageCalories_DaysBack > 0)
		{
			strReturn += ", weekly avg " + Math.round((intAverageCalories_TotalCalories * 1.0) / intAverageCalories_DaysBack);
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