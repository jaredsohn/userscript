// ==UserScript==
// @name           Daily Plate - Follow Other User
// @namespace      http://tapuri.org
// @include        http://*.thedailyplate.com/*
// ==/UserScript==




// NOTE: THIS SCRIPT NO LONGER NEEDS TO BE EDITED TO FOLLOW A USER.
//         ONCE INSTALLED, RIGHT-CLICK ON THE GREASEMONKEY ICON ON 
//         THE STATUSBAR, LEFT-CLICK ON "User Script Commands", THEN
//         CLICK ON THE "Set DailyPlate user to follow" OPTION, AND
//         IT WILL PROMPT YOU FOR THE USERNAME TO FOLLOW





var strScriptName = 'Daily Plate - Follow Other User';
var strScriptNumber = '31585';

var intScriptVersion = '1.1';

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
	GM_setValue("UserFollowed", strUsername);
}




function GetUsername()
{
	return GM_getValue("UserFollowed", "(none)");
}









var strUserA = GetUsername();

if (strUserA == "(none)")
{
	GetUsernameFromPromptBox();
}
else
{
	var strBlankImg = "<img src='data:image/gif;base64,R0lGODlhZAABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAABkAAEAAAgSAP8JHEiwoMGDCBMqXMiwYcKAADs='>";


	var strUserProfileURL = 'http://www.thedailyplate.com/users/profile/';


	/////////////////////////////////////////////////////////////////////////
	//////////////START page-scraping thedailyplate.com prolile//////////////
	/////////////////////////////////////////////////////////////////////////

	var intCalories_Total = 0;
	var intCalories_consumedCalories = 0;
	var intCalories_burnedCalories = 0;

	GM_xmlhttpRequest({
		   method:"GET",
		   url:(strUserProfileURL + strUserA),
		   headers: {'User-Agent': 'Mozilla/4.0 (compatible) Greasemonkey script by SwornPacifist'},
		   onload:function(response) {
			var strPageText = response.responseText;
			var intIndexOfStart_Logout = strPageText.indexOf("hasn't logged");

			if (intIndexOfStart_Logout < 0)
			{
				////////////////////////////////////////////////////////////////
				//////////////START gathering today's calorie info//////////////
				////////////////////////////////////////////////////////////////
				var intIndexOfStart_totalCalories = strPageText.indexOf("Calorie goal") + 13;
				var intIndexOfStop_totalCalories = strPageText.indexOf("Consumed", intIndexOfStart_totalCalories + 1);
				//alert('totalCalories = [' + strPageText.substring(intIndexOfStart_totalCalories, intIndexOfStop_totalCalories).replace("<b>", "").replace("</b>", "").replace(" &bull; ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", "") + ']');
				intCalories_Total = parseInt(strPageText.substring(intIndexOfStart_totalCalories, intIndexOfStop_totalCalories).replace("<b>", "").replace("</b>", "").replace(" &bull; ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));

				var intIndexOfStart_calories = intIndexOfStop_totalCalories + 9;
				var intIndexOfStop_calories = strPageText.indexOf("Burned", intIndexOfStart_calories + 1);
				//alert('consumedCalories = ' + strPageText.substring(intIndexOfStart_calories, intIndexOfStop_calories).replace("<b>", "").replace("</b>", "").replace(" &bull; ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));
				intCalories_consumedCalories = parseInt(strPageText.substring(intIndexOfStart_calories, intIndexOfStop_calories).replace("<b>", "").replace("</b>", "").replace(" &bull; ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));

				var intIndexOfStart_burnedCalories = intIndexOfStop_calories + 7;
				var intIndexOfStop_burnedCalories = strPageText.indexOf("Net calories", intIndexOfStart_burnedCalories + 1);
				//alert('burnedCalories = ' + strPageText.substring(intIndexOfStart_burnedCalories, intIndexOfStop_burnedCalories).replace("<br>", "").replace("<b>", "").replace("</b>", "").replace(" &bull; ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));
				intCalories_burnedCalories = parseInt(strPageText.substring(intIndexOfStart_burnedCalories, intIndexOfStop_burnedCalories).replace("<br>", "").replace("<b>", "").replace("</b>", "").replace(" &bull; ", "").replace(",", "").replace(" ", "").replace(" ", "").replace(" ", ""));
				////////////////////////////////////////////////////////////////
				///////////////END gathering today's calorie info///////////////
				////////////////////////////////////////////////////////////////



				buildLink();
			}
		}
	});
	/////////////////////////////////////////////////////////////////////////
	///////////////END page-scraping thedailyplate.com prolile///////////////
	/////////////////////////////////////////////////////////////////////////
}


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



function buildDailyPlateLink()
{
	var strReturn = '';

	strReturn = '<b>' + strUserA + ':</b> ' ;
	strReturn += '<a href="' + strUserProfileURL + strUserA + '">';
	strReturn += 'G: ' + intCalories_Total + ',';
	strReturn += ' C: ' + intCalories_consumedCalories;
	strReturn += ' (' + (Math.round((intCalories_consumedCalories * 1000.0) / intCalories_Total) / 10) + '%)' + ',';
	strReturn += ' B: ' + intCalories_burnedCalories + ',';
	strReturn += ' N: ' + (intCalories_consumedCalories - intCalories_burnedCalories);
	strReturn += '</a>';

	return strReturn;
}


function buildLink()
{
	try
	{
		//var elsDiv = document.getElementsByTagName('div');
		//var strInnerHTML = buildDailyPlateLink();
		//strInnerHTML += strBlankImg;
		//strInnerHTML += elsDiv[3].innerHTML;
		//elsDiv[3].removeAttribute("style");
		//elsDiv[3].setAttribute("style", "width: 800px; text-align: center;");
		//elsDiv[3].innerHTML = strInnerHTML;


		var elsDiv = document.getElementsByTagName('div');
		var divNew = document.createElement('div');
		divNew.setAttribute("style", "width: 800px; text-align: right;");
		divNew.innerHTML = buildDailyPlateLink();
		var centerNew = document.createElement('center');
		centerNew.appendChild(divNew);
		elsDiv[0].parentNode.insertBefore(centerNew,elsDiv[0].nextSibling);
		

		//var elsCenter = document.getElementsByTagName('center');
		//var divNew = document.createElement('div');
		//divNew.setAttribute("style", "width: 800px; text-align: center;");
		//divNew.innerHTML = buildDailyPlateLink();
		//elsCenter[0].insertBefore(divNew,elsCenter.firstChild);
	}
	catch(err)
	{
		//Ignore error, some Google sub-page components throw errors here
	}
}




GM_registerMenuCommand("Set DailyPlate user to follow", GetUsernameFromPromptBox);