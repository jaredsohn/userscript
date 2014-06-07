// Conquer Club - Card Counter, Card Redemption Value, Status Indicator
var versionString = "4.6.4";

//  
//  This monkey is now called 
//





             /////    ////   /////      
             //  //  //  //  //  //     
             /////   //  //  /////      
             //  //  //  //  //  //     
             /////    ////   /////      


//
//  
//    PLEASE READ ALL THE COMMENTS AT THE START OF THIS FILE BEFORE EDITING 
//  
//-----------------------------------------------------------------------------
// Installation
//-----------------------------------------------------------------------------
// This is a Greasemonkey user script.
//
// To use, first install Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Conquer Club - BOB", and click Uninstall.
//
//-----------------------------------------------------------------------------
//  Meta Data - required for Greasemonkey
//-----------------------------------------------------------------------------
// ==UserScript==
// @name          Conquer Club - BETA BOB
// @namespace     http://yeti_c.co.uk/conquerClub
// @description   Adds Stats, card counter, redemption value, animated clock, text based map, map inspection tools
// @include       http://*conquerclub.com*
// ==/UserScript==

// 
//-----------------------------------------------------------------------------
// DO NOT EDIT BELOW THIS ( unless you know what you are doing )
//-----------------------------------------------------------------------------
// NO REALLY, THERE IS NO NEED TO EDIT THIS FILE ALL OPTIONS ARE CONTROLLED BY THE GAME MENU
//
//
//  I mean it dont even read past here


















// If you are still reading then on your own head be it, however pleaae post your modification to this thread
// http://www.conquerclub.com/forum/viewtopic.php?t=33445 so that I can look at improving the script.

//-----------------------------------------------------------------------------
//  Please Wait coding - creates a Div that gets in the way of people doing things!
//-----------------------------------------------------------------------------


// Start/stop please wait...
function startWaiting() { showPleaseWait(true);  }
function stopWaiting()  { showPleaseWait(false); }

// Start please wait with custom message
function customStartWaiting(msg) 
{
	startWaiting();
	var pleaseWaitCaption = document.getElementById('pleaseWaitMessage');
	if (pleaseWaitCaption)
		pleaseWaitCaption.innerHTML = msg;
}

// Functions for showing/hiding please wait message
function showPleaseWait(show)
{
	var pleaseWait = document.getElementById('pleaseWait');
	if (!pleaseWait)
		pleaseWait = createPleaseWait();
	if (pleaseWait)
	{
		if (show) 
			pleaseWait.style.display = "";
		else 
			pleaseWait.style.display = "none";
	}
}

function createPleaseWait()
{
	var opacity = "0.5";
	var backColour = "#000000";
	var frontColour = "#FFFFFF";
	
	
	var pleaseWait = document.createElement('div');
	pleaseWait.id = "pleaseWait";
	pleaseWait.style.position = "absolute";
	pleaseWait.style.height = "100%";
	pleaseWait.style.width = "100%";
	pleaseWait.style.display = "none";
	pleaseWait.style.zIndex = "99";
	pleaseWait.style.top = "0";
	pleaseWait.style.left = "0";

	// Show please wait over central column only.
	var midcol = document.getElementById("middleColumn");
	if (midcol) // note it may not exist in secondary included pages like topic review
		document.getElementById("middleColumn").appendChild(pleaseWait);
	else
		return;


	var pwTable = document.createElement('table');
	pwTable.style.height = "100%"
	pwTable.style.width = "100%";
	pwTable.cellSpacing = "0";
	pwTable.cellPadding = "0";

	var pwRow1 = document.createElement('tr');
	pwRow1.style.height = "300px";
	pwRow1.style.verticalAlign = "top";

	var pwTdRow1 = document.createElement('td');
	pwTdRow1.style.backgroundColor = backColour;
	pwTdRow1.style.opacity = opacity;
	pwTdRow1.colSpan = '3';


	var pwRow2 = document.createElement('tr');
	pwRow2.style.height = "1px";
	pwRow2.style.padding = "0px";


	var pwTd1Row2 = document.createElement('td');
	pwTd1Row2.style.backgroundColor = backColour;
	pwTd1Row2.style.opacity = opacity;
	pwTd1Row2.style.width = "25%";


	var pwTd2Row2 = document.createElement('td');

	pwTd2Row2.style.padding = "0px 0px 0px 0px";
	pwTd2Row2.style.backgroundColor = frontColour;
	pwTd2Row2.style.border = "1px";
	pwTd2Row2.style.padding = "10px";
	pwTd2Row2.style.borderStyle = "solid";
	pwTd2Row2.style.opacity = 1;

	var pwMessageTable = document.createElement('table');
	pwMessageTable.style.backgroundColor = frontColour;
	pwMessageTable.style.color = "#000000";
	pwMessageTable.style.padding = 0;
	pwMessageTable.style.width = "100%";
	pwMessageTable.style.height = "100%";


	var pwMessTableRow = document.createElement('tr');
	pwMessTableRow.style.padding = 0;


	var pwMessTableImageCell = document.createElement('td');
	pwMessTableImageCell.style.padding = 0;
	pwMessTableImageCell.style.width = "75px";
	
	
	var pwMessTableImage = document.createElement('img');
	pwMessTableImage.id = "pleaseWaitImage";
	pwMessTableImage.src = "http://www.conquerclub.com/static/loading.gif";
	pwMessTableImage.style.paddingRight = "2px";

	var pwMessTableCell = document.createElement('span');
	pwMessTableCell.id = "pleaseWaitMessage";
	pwMessTableCell.style.padding = 0;


	var pwTd3Row2 = document.createElement('td');
	pwTd3Row2.style.backgroundColor = backColour;
	pwTd3Row2.style.opacity = opacity;
	pwTd3Row2.style.width = "25%";


	var pwRow3 = document.createElement('tr');
	pwRow3.style.height = "100%";
	pwRow3.style.verticalAlign=  "top";


	var pwTdRow3 = document.createElement('td');
	pwTdRow3.style.backgroundColor = backColour;
	pwTdRow3.style.opacity = opacity;
	pwTdRow3.colSpan = '3';

	pwRow1.appendChild(pwTdRow1);

	pwTd2Row2.appendChild(pwMessageTable);

	pwMessTableImageCell.appendChild(pwMessTableImage);
	pwMessTableImageCell.appendChild(pwMessTableCell);

	pwMessTableRow.appendChild(pwMessTableImageCell);

	pwMessageTable.appendChild(pwMessTableRow);

	pwRow2.appendChild(pwTd1Row2);
	pwRow2.appendChild(pwTd2Row2);
	pwRow2.appendChild(pwTd3Row2);

	pwRow3.appendChild(pwTdRow3);

	pwTable.appendChild(pwRow1);
	pwTable.appendChild(pwRow2);
	pwTable.appendChild(pwRow3);


	pleaseWait.appendChild(pwTable);

	return pleaseWait;
}


//-----------------------------------------------------------------------------
//  DEFAULT OPTIONS SETTINGS
//-----------------------------------------------------------------------------

// THERE IS NO POINT IN EDITING THESE: CHANGES HERE WILL HAVE NO EFFECT
// There are TWO ways to edit the settings, EASY WAY: Use the new settings menu.
// HARD WAY. Go to about:Config in FireFox and - Search for BOB.OPTIONS.
// Then Edit that value - BE CAREFULL if you get the format wrong the script will crash, 
// if you crash it and want to recover, set that option value to exactly the next 4 chars ({}) 
// this will re load the defaults below.
var DEFAULT_OPTIONS = new Object();
DEFAULT_OPTIONS['jumptomap'] = false;
DEFAULT_OPTIONS['textMapType'] = "Standard";
DEFAULT_OPTIONS['fadeMap'] = 1; // 0 = No Fade  1 = Total WhiteOut
DEFAULT_OPTIONS['MapLeft'] = 0;
DEFAULT_OPTIONS['MapTop'] = 0;
DEFAULT_OPTIONS['24hourClockFormat'] = "am/pm";
DEFAULT_OPTIONS['Clock'] = "on";
DEFAULT_OPTIONS['mapInspect'] = true;
DEFAULT_OPTIONS['confirmEnds'] = true;
DEFAULT_OPTIONS['confirmAutoAttack'] = true;
DEFAULT_OPTIONS['confirmDeploy'] = true;
DEFAULT_OPTIONS['statsMode'] = "Extended";
DEFAULT_OPTIONS['floatActions'] = "Off";
DEFAULT_OPTIONS['hideMenu'] = "Off";
DEFAULT_OPTIONS['MinimumFormWidth'] = "600";
DEFAULT_OPTIONS['ccdd'] = "On";
DEFAULT_OPTIONS['fulllog'] = "Off";
DEFAULT_OPTIONS['swapavas'] = "Off";
DEFAULT_OPTIONS['smallavas'] = "Off";
DEFAULT_OPTIONS['hidesigs'] = "Off";
DEFAULT_OPTIONS['confirm_drop'] = "Off";
DEFAULT_OPTIONS['continent_overview'] = "Off";
var startLogTime = Math.round((new Date()).getTime()/1000)
var Logging =  "";

//-------------------------------------------------------------------------
// Images as strings
//-------------------------------------------------------------------------

//var attackonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00TIDATHKcd%60%60%F8%0F%C4%03%02%40%16%0F%04%1E%10K%C1%A1%3C%10%BE%1Dd%16%BF%7B%F7%EE%3F%AD1%D6%A0%A6%B5%A5%20%F3G-%06%A7%F0%D1%A0%A6E%08%8C%26%AE%D1%C4E%B3%AC5%9A%B8%066q%D1%A9q0%DA%02%A1%5B%08%D0%CD%22%94F%25%00Y%5D%E4q)%2F%DC%C8%00%00%00%00IEND%AEB%60%82";
//var bombardimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00XIDATHKcd%60%60%F8%0F%C4%03%02%40%16%0F%04%1E%10K%C1%A1%3C%10%BE%1Dd%16%BF%7B%F7%EE%3F51%8EP%C5%0CjjZ%0A2k%D4bX%D9%81%11%14%A3AMi%08%8C%26%AE%D1%C4%05%CFV%94%26%26t%FD%A3%89k4q%8D%26.%AA%B5B%06Uv%02%00%D5U*%3AT%02%D2%0C%00%00%00%00IEND%AEB%60%82";
//var bombardedimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00gIDATHKcd%60%60%F8%0F%C4(%E0%DD%BBw%E8B%14%F1%85%84%84%B0%EA%07Y%8C%82%81%16%FF%A7%26F7%1F%E6%D9Q%8B%A9%1A%CC%A0(%1B%0D%EA%D1%C4%05O%04%D4%CC%C3%A3%89%0B)k%A1%16%97%20%89%D1%A0%A64%04FK%AE%D1%92k%E0K.%1C%A9%10W%BDJ%AE8f%012j1%8DB%60%60%82%1A%00%E5%E3%F5cK%EA~%D4%00%00%00%00IEND%AEB%60%82";
//var defendonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00NIDATHKcd%60%60%F8%0F%C4%03%02%40%16%0F%04%1E%10K%C1%A1%3C%10%BE%1D%40%8B%DF%BD%7B%F7%9F%D6%18k%A8%D2%DAR%90%F9%A3%16%83C%604%A8i%11%02%A3%89k4q%D1%AC%E8%1CM%5C%03%9B%B8F%5EC%60%D4%C7%F4%0A%01%00%14%23%E4q_%D8%FDT%00%00%00%00IEND%AEB%60%82";
//var mutualbombimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5DIDATHKcd%60%60%F8%0F%C4(%E0%DD%BBw%E8B%14%F1%85%84%84%B0%EA%07Y%8C%82%81%16%FF%A7%26F7%1F%E6%D9Q%8B%A9%1A%CC%A0(%1B%0D%EA%D1%C4%05O%04%D4%CC%C3%A3%89%0B)k%A1%16%97%20%89%D1%A0%A64%04FK%AE%D1%92k%B4%E4%A2ZA2%9A%9D%064%3B%01%00%15%E0%0Ci%0C%BF%B9%F4%00%00%00%00IEND%AEB%60%82";
//var normalimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00LIDATHK%ED%96%B9%0D%000%08%C4.%FB%EF%CA%0A%E4)%D3%83%0B%0E%E9j%0B%83%10KR%9E%20u%C1D%10%E8%B3Lt%0B%82%23%22%89%88%80%5E%A6%C1m%F3%B6j%AB.3%E0%E5*S%FB%9F%E6%81%AA%E7%3D%02%EE%B8%CB%C0%06%C8%0A%B5%AE%09G%D2%BC%00%00%00%00IEND%AEB%60%82";
//var safeimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%19%08%06%00%00%00%265%9E%1A%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5EIDATHKcd%60%60%F8%0F%C4%03%02%40%16%0F%04%1E%10K%C1%A1%3C%10%BE%1Dd%16%BF%7B%F7%EE%3F51%8EP%C5%0CjjZ%0A2k%D4bX%D9%81%11%14%A3AMi%08%8C%26%AE%D1%C4%05%CFV%94%26%26t%FD%A3%89k%F0%25.%3A5%0EF%5B%20t%0B%01%BAY%84R%FD%02%00%A5g%13CokP%E0%00%00%00%00IEND%AEB%60%82";

//var attackonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00YIDAT8Ocd%60%60%F8%0F%C4T%05%20%03%A9%89%A9j%18%D8%B7%04%5D%C7%CE%CE%FE%9F%9B%9B%9B%A0%3A%B0Y%92%92%92p%85lll%FF%DF%BD%7BG%11%C6p%E1%F3%E7%CF%A9k%20%D5%5D8j%20%C9%11%84%11%CB%230%0C%89%C9%8A%04%D4%10%CE%CB%24Z2%C8%0D%04%00%FDK%12%98%26%AC%E3%C2%00%00%00%00IEND%AEB%60%82";
//var defendonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%01sRGB%00%AE%CE%1C%E9%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%20cHRM%00%00z%26%00%00%80%84%00%00%FA%00%00%00%80%E8%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17p%9C%BAQ%3C%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00JIDAT8Ocd%60%60%F8%0F%C4T%05%20%03%A9%89%A9j%18%D8%B7%04%5D%C7%CE%CE%FE%9F%9B%9B%9B%A0%3A%B0Y%EF%DE%BD%FBO%09%C6p%10%25%86%81%F4%8E%1A8%1A)d%A4I%DA'%1Bb%B2%1E%89j%08%E7%E5%E1e%20%00%9Dc%12P%26%DA%9E(%00%00%00%00IEND%AEB%60%82";

var attackonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00SIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%08%14%04I%90%8B!.%94%94%94%84%BB%90%02%C3h%E8B%E40%1Cu!%A9%B1%8D%99%0EG%C3p%10%86!%25%05%05%7DJ%1Bj%B8%10%00%F6%99%89%EE%AE%84%9A%9C%00%00%00%00IEND%AEB%60%82";
var bombardedimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00%5BIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86%E1h%B2%19%99Y%0F9%E5%93%CA%C6Z%DA%90j%08%C1%AC%C7%C2%C2%F2%9F%9D%9D%1D%5E%9C%91b%01%CC%85%00%16%23rE%C7(%B7)%00%00%00%00IEND%AEB%60%82";
var bombardimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%A3%C9%06%9Cl%00x%E0%90%9C%EB%B7%F2%06%00%00%00%00IEND%AEB%60%82";
var defendonlyimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00JIDAT8O%ED%94%C1%0A%000%08B%ED%FF%FF%B5_p%C9%D8%D8%B9%DA-%C1c%8F%10%D1%000%5C%16I%3B%10%01%CB%0E%20d%A9%0C%13%E3%02%DD%9DY%BF%CF%0C0%97%E3d%B8%8B%9D%ED%A0%EE%26%C3O%E3%D0%BE6%DD%C0%05%90%82%90%9C%E5%9D%92.%00%00%00%00IEND%AEB%60%82";
var mutualbombimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00IIDAT8Ocd%60%60%F8%0F%C4%60%F0%EE%DD%3B%18%93(ZHH%08%AE%EE%FF%FF%FF%8C0%0E%C8%400%06%1AH%12%86%E9%03%D1%40%00%22%C0f%8E%1AH%7C8%8E%86!E%C9%E6%3D(%CD%8E%86%E1h%18%0E%D6%E2%0B%00%3C%03%D6l4%B8H%5D%00%00%00%00IEND%AEB%60%82";
var normalimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00NIDAT8Ocd%60%60%F8%0F%C4%14%83w%EF%DE1%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%8Aa%E7%A1%EA%EF%A3%EB%83%1B%08d%FC%A7%12%86%B8%90J%86%81%1C5j%20%E5%913%1A%86%23'%0CI%2C%1Cp%16%24%E4%966%F47%10%00%AB%88%ED%BB%03%F0'%AC%00%00%00%00IEND%AEB%60%82";
var safeimage = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%12%08%06%00%00%00%5B%D0%FE%10%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%00%18tEXtSoftware%00Paint.NET%20v3.22%B7%91%17%7D%00%00%00PIDAT8Ocd%60%60%F8%0F%C4%14%83%FF%FF%FF3%C2%0C%01%19H1%06%1A%C8%00%C2%20%40%B1a%203%B0%1A%F8%EE%DD%BB%FF%A4%60d%C7%8C%1A%08%89%18R%C2%0F%A4v4%0C1%13%F6h%18%12LF%04%93%0D%25%05%05%7DJ%1Bj%B8%10%00%0A%D1%2C4%3D%FCt%15%00%00%00%00IEND%AEB%60%82";

//-------------------------------------------------------------------------
//    LOGGING PATTERNS
//-------------------------------------------------------------------------

var str_receiveCard = " gets spoils";
var str_outOfTime = " ran out of time";
var str_fortified = " reinforced ";
var str_deployed = " deployed ";
var str_attacked = " assaulted ";
var str_conquered = "conquered";
var str_neutralPlayer = "neutral player";
var str_bombarded = " bombarded ";
var str_missedTurn = " missed a turn";
var str_cashed = " cashed";
var str_eliminated = " eliminated ";
var str_receives = " receives ";
var str_holding = " holding ";
var str_deferred = " deferred ";
var str_armiesFor = "troops for";
var str_territories = "regions";
var str_annihilated = "annihilated";
var str_receives = "receives";
var str_armies = "troops";
var str_lost = " lost ";
var str_loses = " loses ";
var str_gains = " gains ";
var str_points = "points";
var str_kickedOut = " was kicked out ";
var str_deadbeated = " was a deadbeat";
var str_incrementedRound = "Incrementing game to round";
var str_initGame = "Game has been initialized";
var str_wonGame = "won the game";

//-------------------------------------------------------------------------
//    OBJECTS
//-------------------------------------------------------------------------

    //Reinforcements Object
    function Reinforcement(lower, upper, divisor)
    {
    	this._lower = lower;
    	this._upper = upper;
    	this._divisor = divisor;
    }

    //Player Class
    function Player( name, pid, color ){
        this._name = name;
        this._pid = pid;
        this._color = color;
        this._cards = 0;
        this._armies = 0;
        this._countries = 0;
				this._calculatedCountries = 0;
        this._continentBonus = 0;
        this._territoryBonus = 0;
				this._lastBonus = 0;
				this._lastBonusFixed = false;
				this._points = 0;
				this._deferred = 0;
        this._skipped = 0;
        this._total_skipped = 0;
        this._continents = new Array();
        this.toString = function() { return  this._name; }
				this.getArmiesPerTurn = function()
				{
				}
        this.getTurninP = function() { if( this._cards < 3 ) return 0; if( this._cards > 4 ) return 1; if( this._cards == 3 ) return 0.3341; return 0.778; }
        this.alert = function() {
            alert(    "Name:\t"            +    this._name        +
                    "\nPID:\t"            +    this._pid        +
                    "\nCards:\t"        +    this._cards        +
                    "\nArmies:\t"        +    this._armies    +
                    "\nCountries:\t"    +    this._countries +
                    "\nArmies/Turn:\t"  +    this.getArmiesPerTurn()
            );
        }
        this.killToReduce = function() { 
            if( this._countries < 12 ) return "-"; 
            var rem = (this._countries/3 - Math.floor(this._countries/3));    
            return (rem==0)?"*": ( rem < 0.5 ? "**" : "***") ; 
            }
        this.calcKillToReduce = function() { 
            if( this._calculatedCountries < 12 ) return "-"; 
            var rem = (this._calculatedCountries/3 - Math.floor(this._calculatedCountries/3));    
            return (rem==0)?"*": ( rem < 0.5 ? "**" : "***") ; 
            }
    this.ContinentsDisplay = function ContinentsDisplay() 
    {
        var ret = "";
        var contSum = new Array();
        var flashList = new Array();
        for (var cntn  in this._continents) 
        {
            var ctn = continentsArray[this._continents[cntn]];
            if (typeof(contSum[ctn._name])=="undefined")
                {
                    contSum[ctn._name] =  ctn._bonus;
                    flashList[ctn._name] =  ctn._realName;
                }
                else 
                {
                    contSum[ctn._name] += ctn._bonus;
                    flashList[ctn._name] +=  "|" + ctn._realName;
                }
            
        }
        for (var cntnn  in contSum ) 
        {

            ret += '<span class="JumpClick" title="' + flashList[cntnn] + '">' + cntnn.replace(" ","&nbsp;") + "&nbsp(" + contSum[cntnn] + ") </span>";
        }
        var contSum = new Array();
        var flashList = new Array();
        for (country in countriesArray) 
        {
		var cnt = countriesArray[country];

		if ((cnt._bonus!=0) && (cnt._pid == this._pid))
		{
			if (typeof(contSum[cnt._name])=="undefined")
                	{
                    		contSum[cnt._name] =  cnt._bonus;
                    		flashList[cnt._name] =  cnt._name;
                	}
			else 
			{
				contSum[cnt._name] += cnt._bonus;
				flashList[cnt._name] +=  "," + cnt._name;
			}
		}
        }
        for (var cntnn  in contSum ) 
        {
            ret += '<span class="clickJump" title="' + flashList[cntnn] + '">' + cntnn.replace(" ","&nbsp;") + "&nbsp[" + contSum[cntnn] + "] </span>";
        }
        return ret;

    }
    }
    
    // Country Class
    function Country (name,pid,armies) {
        this._name = name;
        this._pid = pid;
        this._armies = armies;
        this.toString = function() { return this._name; }
        this._borders = new Array();
        this._DefendBorders = new Array();
        this._bombards = new Array();
        this._bombardedBy = new Array();
        this._inContenent = false;
				this._bonus = 0;
				this._killer = false;
				this._neutral = 0;
        this._smallxPos = 0;
        this._smallyPos = 0;
        this._largexPos = 0;
        this._largeyPos = 0;
        this.isSafe = function () {
            var howSafe = 2;
           
            for (var k =0; k < this._borders.length && howSafe > 0; k++){
                var bb = countriesArray[this._borders[k]];
                if (bb._pid != this._pid) {
                    // it's not mine
                    howSafe = 1
                    if (teamNumber(bb._pid) != teamNumber(this._pid)) {
                        // And it's not team
                        howSafe = 0
                        
                    }
                }
            }
            for (var k =0; k < this._DefendBorders.length && howSafe > 0; k++){
                var bb = countriesArray[this._DefendBorders[k]];
                if (bb._pid != this._pid) {
                    // it's not mine
                    howSafe = 1
                    if (teamNumber(bb._pid) != teamNumber(this._pid)) {
                        // And it's not team
                        howSafe = 0
                        
                    }
                }
            }
            for (var k =0; k < this._bombardedBy.length && howSafe > 0; k++){
                var bb = countriesArray[this._bombardedBy[k]];
                if (bb._pid != this._pid) {
                    // it's not mine
                    howSafe = 1
                    if (teamNumber(bb._pid) != teamNumber(this._pid)) {
                        // And it's not team
                        howSafe = 0
                        
                    }
                }
            }
            return howSafe;
        }
        this.textMap = function () { 
            var txtMapHtml2 = "";
            var txtMapHtmlA = "";
            var txtMapHtmlD = "";
            var txtMapHtmlC = "";
            var txtMapHtmlE = "";
            var txtMapHtmlF = "";
            var txtMapHtmlG = "";
            var aAttack = new Array();
            var aDefend = new Array();
            var aBombard = new Array();
            var aBombarded = new Array();
            
            for (var k =0; k < this._borders.length; k++){
                var bb = countriesArray[this._borders[k]];
                aAttack[bb._name] = bb;
            }
            for (var k =0; k < this._DefendBorders.length; k++){
                var bb = countriesArray[this._DefendBorders[k]];
                aDefend[bb._name] = bb;
            }
                
            for (var k =0; k < this._bombards.length; k++){
                var bb = countriesArray[this._bombards[k]];
                aBombard[bb._name] = bb;
            }
            for (var k =0; k < this._bombardedBy.length; k++){
                var bb = countriesArray[this._bombardedBy[k]];
                aBombarded[bb._name] = bb;
            }

            txtMapHtml2 += this.displayString(); 

                    for (var k =0; k < this._borders.length; k++){
                        var bb = countriesArray[this._borders[k]];
                         if (typeof(aDefend[bb._name])=="undefined"){
                                txtMapHtmlA +=  bb.displayString();
                            }
                            else
                            {
                                txtMapHtmlC +=  bb.displayString();
                            }
                    }
                    
                    for (var k =0; k < this._DefendBorders.length; k++)
		    						{
                        var bb = countriesArray[this._DefendBorders[k]];
                        
                        if (typeof(aAttack[bb._name])=="undefined")
												{
                                txtMapHtmlD += bb.displayString();
                        }
                    }


										for (var bombard in  this._bombards) 
										{
														var bb = countriesArray[this._bombards[bombard]];
														var b = this._bombards[bombard].makeID();

														if (typeof(aBombarded[bb._name])=="undefined")
														{
			                        txtMapHtmlE += bb.displayString();
														}
														else
														{
			                        txtMapHtmlG += bb.displayString();
														}
										}
										for (var bombard in  this._bombardedBy) 
										{
														var bb = countriesArray[this._bombardedBy[bombard]];
														var b = this._bombardedBy[bombard].makeID();
														if (typeof(aBombard[bb._name])=="undefined")
														{
			                        txtMapHtmlF += bb.displayString();
														}
														// don't need else as if will have been done by the bombard loop.
										}

                    if (txtMapHtmlC != "") 
		   							{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+normalimage+'>';
                        txtMapHtml2 += '<span> Borders </span>';
                        txtMapHtml2 += '[ ' + txtMapHtmlC + ' ]';
                    }
                    if (txtMapHtmlA != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+attackonlyimage+'>';
                        txtMapHtml2 += '<span> Attacks </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlA + ' ]'

                    }
                    if (txtMapHtmlD != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+defendonlyimage+'>';
                        txtMapHtml2 += '<span> Attacked By </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlD + ' ]'
										}
                    if (txtMapHtmlE != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+bombardimage+'>';
                        txtMapHtml2 += '<span> Bombards </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlE + ' ]';
                    }
                    if (txtMapHtmlF != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+bombardedimage+'>';
                        txtMapHtml2 += '<span> Bombarded by </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlF + ' ]';
                    }
                    if (txtMapHtmlG != "") 
		    						{
                       	txtMapHtml2 += '<br><img class="attackhovers" src='+mutualbombimage+'>';
                        txtMapHtml2 += '<span> Mutual Bombardment </span>';
												txtMapHtml2 += '[ ' + txtMapHtmlG + ' ]';
                    }
                    
                    
                return  txtMapHtml2;
         }
         this.displayString = function () 
				 {
						var pid = this._pid;
					 	if (pid == UID)
								pid = NID;
						result = '<span class="playerBG' + pid + '"><span class="clickJump" title="' + this._name + '">'  + replaceSpace(this._name) + '&nbsp;(' +  this._armies + ')';
						if (this._bonus != 0)
								result += '&nbsp;['+this._bonus+']';
						result += '</span> </span>';
						return result;
         }
    }

    //Continent Class - Note all Continents now have required elements
    // If a Traditional continent - then required matches the size of the countrys array.
    function Continent (name,bonus,realname) {
        this._name = name;
        this._realName = realname;
        this._bonus = bonus;
				this._required = 0;
        this.toString = function() { return this._name; }
        this._countrys = new Array();
        this._continents = new Array();
        this._owners = new Array(); // hold the owners of this continent (note could be many more than one)
				this._overrides = new Array(); // Hold overriders for this continent.
				this._overriden = new Array(); // hold an array to match the owners to say if this is overriden or not.
				this.clearOwners = function() // clean out owners array - called before processing.
				{
					this._owners = new Array();
					this._overriden = new Array();
				}
        this.alert = function() {
            alert(    "Name:\t"            +    this._name        +
                    "\nrealName:\t"            +    this._realName        +
                    "\nBonus:\t"        +    this._bonus        +
                    "\nRequired:\t"        +    this._required        +
                    "\nCountries:\t"    +    this._countrys +
                    "\nOverrides:\t"    +    this._overrides +
                    "\nOwners:\t"  +    this._owners +
                    "\nOverriden:\t"    +    this._overriden);
        }
				this.displayString = function () 
				{
						var result = "";
						for (i in this._owners)
						{
							for (name in playersArray)
							{
								var pid = this._owners[i]
								if (playersArray[name]._pid == pid) 
								{
									if (!this._overriden[i])
									{
											result += '<span class="playerBG' + pid + '"><span class="hovermap" title="' + this._realName + '">'  + replaceSpace(this._name) + '&nbsp;';
											if (this._bonus != 0)
														result += '&nbsp;['+this._bonus+']';
											result += '</span></span>';
									}
								}
							}
						}
						if (this._owners.length<1)
						{
								var pid = NID;
								result += '<span class="playerBG' + pid + '"><span class="hovermap" title="' + this._realName + '">'  + replaceSpace(this._name) + '&nbsp;';
								if (this._bonus != 0)
										result += '&nbsp;['+this._bonus+']';
								result += '</span></span>';
						}


					

					return result;
        }
    }

	function objective (name, realname)
	{
		this._name = name;
		this._realname = realname;
		this._countrys = new Array();
	        this._continents = new Array();
		this._required = 0;
	        this._owners = new Array(); // hold the owners of this objective (note could be many more than one)
		this.clearOwners = function() // clean out owners array - called before processing.
			{
				this._owners = new Array();
			}
	}


//-------------------------------------------------------------------------
//    FUNCTIONS
//-------------------------------------------------------------------------


function getElementText(elem)
{
	if(elem.innerText)
	{
    return elem.innerText;
	} 
	else
	{
    return elem.textContent;
	}
}


// Aerial Attacks Drop Game Confirmations. (Modified to be able to be turned off!)
// function to add Drop Game confirmation event listeners to the drop game URL click event
function addConfirmDropGameClickHandlers()
{
			var arrFinderOptions = document.getElementById('middleColumn').getElementsByTagName("a");
			var txtAnchorURL = "";
			for( i in arrFinderOptions )
			{
						txtAnchorURL = new String(arrFinderOptions[i].href);
						if(txtAnchorURL.indexOf("submit=Drop") != -1 )
						{
									var arrGameNoIndex = txtAnchorURL.split("=");
									if (myOptions["confirm_drop"]=="On")
									{
											if (!txtAnchorURL.indexOf("confirm")>=0) // ensure we don't need to run again!
											{
													var intGameNo = arrGameNoIndex[2]; // sub 0 is URL, sub 1 is submit type of Drop, sub 2 is game #
													arrFinderOptions[i].href = "javascript: if (confirm('Drop Game #" + intGameNo + "?')) { window.location.href='" + txtAnchorURL + "' } else { void('') };";
											}
									}
									else
									{
											if (txtAnchorURL.indexOf("confirm")>=0) // ensure we need to turn this off.
											{
													var intGameNo = arrGameNoIndex[3]; // sub 0 is URL, sub 1 is submit type of Drop, sub 2 is game #
													intGameNo = intGameNo.substring(0,intGameNo.indexOf("'"));
													arrFinderOptions[i].href = "http://www.conquerclub.com/player.php?submit=Drop&game="+intGameNo;
											}
									}
						}
			}
} 

function showMoreTextMap()
{
				var sml = document.getElementById('showMoreLink')
				if (sml.innerHTML=="fixed text map")
				{
								textMap.style.height="";
								textMap.style.overflowY = "hidden";
								textMap.style.overflowX = "hidden";
								sml.innerHTML = "scrollable text map";
				}
				else
				{
								if (textMap.clientHeight>=200)
								{
												textMap.style.height="200px";
												textMap.style.overflowY = "auto";
												textMap.style.overflowX = "hidden";
												sml.innerHTML = "fixed text map";
								}
								else
								{
												sml.parentNode.style.display = "none";
								}
				}
				updateMenuHiderHeight();
}

function showMoreStats()
{
				var sml = document.getElementById('showMoreStatsLink')
				if (sml.innerHTML=="fixed statistics")
				{
								statsbody = document.getElementById("statsbody");
								statsbody.style.height="";
								statsbody.style.overflowY = "hidden";
								statsbody.style.overflowX = "hidden";
								sml.innerHTML = "scrollable statistics";
				}
				else
				{
								if (stats.clientHeight>=200)
								{
												statsbody = document.getElementById("statsbody");
												statsbody.style.overflowY = "auto";
												statsbody.style.height="200px";
												statsbody.style.overflowX = "hidden";
												sml.innerHTML = "fixed statistics";
								}
				}
				updateMenuHiderHeight();
}


function replaceSpace(text)
{
	var newText="";

	for (var i=0;i<text.length;i++)
	{
		if (text[i]==' ')
			newText += "&nbsp;";
		else
			newText += text[i];
	}
	return newText;
}

function deserialize(name, def) 
{
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) 
{
  GM_setValue(name, uneval(val));
}

function upgrade(o,name) 
{
    // Copies a default option if there is a missing option.
    if (typeof(o[name]) == "undefined") {
        o[name] = DEFAULT_OPTIONS[name];
    }
     
}
// Load Options 
var myOptions = (deserialize("OPTIONS", DEFAULT_OPTIONS))
if (typeof(myOptions) == "undefined") 
{
    // poor editing in the about:config page
    myOptions = new Object();
}

// LIST ALL OPTIONS HERE 
// This part will handle options MISSING from the config section
upgrade(myOptions,'jumptomap');

upgrade(myOptions,'fadeMap');
upgrade(myOptions,'MapLeft');
upgrade(myOptions,'MapTop');
upgrade(myOptions,'mapInspect');
upgrade(myOptions,'confirmEnds');
upgrade(myOptions,'statsMode');
upgrade(myOptions,'floatActions');

upgrade(myOptions,'hideMenu');
upgrade(myOptions,'MinimumFormWidth');
upgrade(myOptions,'ccdd');
upgrade(myOptions,'fulllog');
upgrade(myOptions,'swapavas');
upgrade(myOptions,'smallavas');
upgrade(myOptions,'clock');
upgrade(myOptions,'hidesigs');
upgrade(myOptions,'confirm_drop');
upgrade(myOptions,'continent_overview');

// REPLACED OPTIONS.
if (typeof(myOptions["showEstimatedArmies"]) != "undefined") {
    delete myOptions["showEstimatedArmies"];
}
if (typeof(myOptions["focuscolor"]) != "undefined") {
    delete myOptions["focuscolor"];
}
if (typeof(myOptions["hoverHighlight"]) != "undefined") {
    myOptions["mapInspect"] = myOptions["hoverHighlight"];
    delete myOptions["hoverHighlight"];
}
if (typeof(myOptions["mapInspect"]) != "undefined") {
    if (myOptions["mapInspect"] == "Standard" || myOptions["mapInspect"] == "Extended")
    		myOptions["mapInspect"]=true;
    else if (myOptions["mapInspect"] == "Off")
    		myOptions["mapInspect"]=false;
}

// TEXT MAP TYPE
    if (typeof(myOptions["textMapType"]) == "undefined") {
        // textMapType = new option
        if (typeof(myOptions["textMap"]) != "undefined") {
            // we have an option to upgrade.
            if (myOptions["textMap"]) {
                myOptions["textMapType"] = "Extended";
                alert ("This version of the script changes the text map option - there are now two varaitons large and small, you have been upgraded to the large setting which is the same as the previous version");
            }
            else 
            {
                myOptions["textMapType"] = "Off";
            }
            delete myOptions["textMap"];
        }
        else
        {
            upgrade(myOptions,'textMapType');
        }
    }
// CLOCK FORMAT
 if (typeof(myOptions["24hourClockFormat"]) == "undefined") {
  // 24hourClockFormat = new option
        if (typeof(myOptions["24hourClock"]) != "undefined") {
            // we have an option to upgrade.
            if (myOptions["24hourClock"]) {
                myOptions["24hourClockFormat"] = "24h";
             }
            else 
            {
                myOptions["24hourClockFormat"] = "am/pm";
            }
            delete myOptions["24hourClock"];
        }
        else
        {
            upgrade(myOptions,'24hourClockFormat');
           
        }
}
else {
    if (myOptions["24hourClockFormat"] == "AM/PM") {
        myOptions["24hourClockFormat"] = "am/pm";
    }
}
// Confirm Actions
if (typeof(myOptions["confirmAutoAttack"]) == "undefined") {
  if (typeof(myOptions["confirmActions"]) == "undefined") {
    upgrade(myOptions,'confirmAutoAttack');
  }
  else
  {
    myOptions["confirmAutoAttack"] = myOptions["confirmActions"];
  }
}
if (typeof(myOptions["confirmDeploy"]) == "undefined") {
  if (typeof(myOptions["confirmActions"]) == "undefined") {
    upgrade(myOptions,'confirmDeploy');
  }
  else
  {
    myOptions["confirmDeploy"] = myOptions["confirmActions"];
  }
}
 if (typeof(myOptions["confirmActions"]) != "undefined") {
     delete myOptions["confirmActions"];
}
serialize("OPTIONS", myOptions);

function parseTerritory(entry)
{
	var title = getElementText(entry.getElementsByTagName('name')[0]).normiliseSpaces()
	var pid = parseInt( armiesArr[(i*2)] );
	var amrs = armiesArr[(i*2)+1];
	countriesArray[title] =  new Country (title,pid,amrs);
	var borders = entry.getElementsByTagName('border');

	for (var j = 0; j <borders.length; j++) 
	{
		var bb = borders[j].textContent.normiliseSpaces();

		countriesArray[title]._borders.push(bb);
	}

	countriesArray[title]._smallxPos = entry.getElementsByTagName('smallx')[0].textContent;
	countriesArray[title]._smallyPos = entry.getElementsByTagName('smally')[0].textContent;
	countriesArray[title]._largexPos = entry.getElementsByTagName('largex')[0].textContent;
	countriesArray[title]._largeyPos = entry.getElementsByTagName('largey')[0].textContent;

	bombardments = entry.getElementsByTagName('bombardment');

	for (var j = 0; j <bombardments.length; j++) 
	{
		var bb = bombardments[j].textContent.normiliseSpaces();
		countriesArray[title]._bombards.push(bb);
	}

	var bonusElements = entry.getElementsByTagName('bonus');
	if (bonusElements.length>0)
	{
		var bonus = bonusElements[0].textContent;
		countriesArray[title]._bonus = parseInt(bonus);
	}
	var neutral = entry.getElementsByTagName('neutral');
	if (!neutral.length>0)
	{
		totalStartCountries++;
	}
	else
	{
		killer = neutral[0].getAttribute("killer");
		if (killer=="yes")
		{
			countriesArray[title]._killer=true;
			countriesArray[title]._neutral=neutral[0].textContent;
		}
	}
}

function parseContinent(entry)
{
	var title = entry.getElementsByTagName('name')[0].textContent.normiliseSpaces();
	var dedupename = 1;
	var titleRoot = title
	while (continentsArray[title]) { title = titleRoot + "_" + dedupename++ ; }
	var bonus = parseInt(entry.getElementsByTagName('bonus')[0].textContent);
	var partial = false;
	var required = 0;
	var requiredEl = entry.getElementsByTagName('required');
	if (requiredEl.length>0) // Partial continent - hold required value from XML
	{
		required = parseInt(requiredEl[0].textContent);
		partial = true;
	}

	continentsArray[title] = new Continent(titleRoot,bonus,title);
	var countries = entry.getElementsByTagName('territory');
	for (var j = 0; j <countries.length; j++) 
	{
		var bb = countries[j].textContent.normiliseSpaces();
		continentsArray[title]._countrys.push(bb);
		if (!partial) // Traditional continent we will need to capture how many components there are.
			required++;
	}
	var continents = entry.getElementsByTagName('continent');
	for (var j = 0; j <continents.length; j++) 
	{
		var bb = continents[j].textContent.normiliseSpaces();
		continentsArray[title]._continents.push(bb); 
		if (!partial) // Traditional continent we will need to capture how many components there are.
			required++;
	}
	continentsArray[title]._required = required;
	var overrides = entry.getElementsByTagName('override');
	for (var j = 0; j <overrides.length; j++) 
	{
		var bb = overrides[j].textContent.normiliseSpaces();
		continentsArray[title]._overrides.push(bb); 
	}
}

function parseObjective(entry)
{
	title = entry.getElementsByTagName('name')[0].textContent.normiliseSpaces();
	var dedupename = 1;
	var titleRoot = title
	while (objectivesArray[title]) { title = titleRoot + "_" + dedupename++ ; }
	objectivesArray[title] =  new objective(titleRoot,title);
	var countries = entry.getElementsByTagName('territory');
	for (var j = 0; j <countries.length; j++) 
	{
		var bb = countries[j].textContent.normiliseSpaces();
		objectivesArray[title]._countrys.push(bb); 
		objectivesArray[title]._required++; 
	}
	var continents = entry.getElementsByTagName('continent');
	for (var j = 0; j <continents.length; j++) 
	{
		var bb = continents[j].textContent.normiliseSpaces();
		objectivesArray[title]._continents.push(bb); 
		objectivesArray[title]._required++; 
	}
}

function showKillers()
{
	var ret="";

        var contSum = new Array();
        var flashList = new Array();
        for (country in countriesArray) 
        {
		var cnt = countriesArray[country];

		if (cnt._killer)
		{
			if (typeof(contSum[cnt._name])=="undefined")
                	{
                    		contSum[cnt._name] =  cnt._neutral;
                    		flashList[cnt._name] =  cnt._name;
                	}
			else 
			{
				contSum[cnt._name] += cnt._neutral;
				flashList[cnt._name] +=  "," + cnt._name;
			}
		}
        }
        for (var cntnn  in contSum ) 
        {
            ret += '<span class="clickJump" title="' + flashList[cntnn] + '">' + cntnn.replace(" ","&nbsp;") + "&nbsp[" + contSum[cntnn] + "] </span>";
        }
        return ret;
}

function reinitClock()
{
	var response = unsafeWindow.request.responseText
	if (response)
	{
		response = response.split("&");
		timeStr = response[3];
		if (timeStr.indexOf("span")>-1) // if countdown alert here then strip it out before continuing
		{
			timeStr = timeStr.substring(30,(timeStr.length-7));
		}
		time = timeStr.split("\n");

	/*        hours1 = parseInt(time[0]);
		minutes1 = parseInt(time[1]);
		seconds1 = parseInt(time[2]);*/
		//Yowsers clock fix
		hours1 = parseInt(time[0],10);
		minutes1 = parseInt(time[1],10);
		seconds1 = parseInt(time[2],10); 
	}
	if (!clockInterval || clockInterval=="")
		clockInterval = window.setInterval(countDown,1000);
}

function getCardType()
{
    var dash = dashboard.innerHTML
    if( dash.indexOf("Escalating") > -1 )
        m_bonusCards = eBonusCards.ESCALATING;
    else if( dash.indexOf("Flat Rate") > -1 )
        m_bonusCards = eBonusCards.FLATRATE;
    else 
        m_bonusCards = eBonusCards.NOCARDS;
}

function recalcRedemption()
{
	RedemptionValue = calcRedemption();
	if(m_bonusCards == eBonusCards.ESCALATING)
		redemption.innerHTML = "<table><tr><td colspan=2>Next Redemption Value is <b>" + RedemptionValue +".</b></td></tr></table>";
	else if(m_bonusCards == eBonusCards.FLATRATE)
		redemption.innerHTML = "<table><tr><td colspan=2><font color=red><b>Red:</b></font> 4&nbsp;<font color=green><b>Green:</b></font> 6&nbsp;<font color=blue><b>Blue:</b></font> 8&nbsp;<b>Mixed:</b> 10</td></tr></table>";
	else 
		redemption.innerHTML = "";
}


function updatePlayerCards()
{
    //    --- Get Player Card Counts ---
    var tmp2 = getElementsByClassName(rightside,"li","status");    
    for ( i in tmp2 ) 
    {
        var indx = tmp2[i].innerHTML.has("Assassin Target") ? 2:1;
        var tmp3 = tmp2[i].textContent.split(/\W/);
        playersArray[pIndxs[i].innerHTML]._cards=parseInt(tmp3[indx]);
    }
}

function getLeft(length)
{
	if (length==1)
		return 6;
	return 2;
}

function GET_MAPLEFT(OPTIONS,mapName) 
{
	var left = 0;
	if (typeof(OPTIONS["MapLeft:"+mapName])=="undefined") 
        {
            left = OPTIONS["MapLeft"];
        }
        else
        {
            left = OPTIONS["MapLeft:" + mapName];
        }
	if (!left)
		left = 0;
	return left;
}


function GET_MAPTOP(OPTIONS,mapName) 
{
	var top = 0;
	if (typeof(OPTIONS["MapTop:"+mapName])=="undefined") 
        {
            top = OPTIONS["MapTop"];
        }
        else
        {
            top = OPTIONS["MapTop:" + mapName];
        }
	if (!top)
		top = 0;
	return top;
}

function GET_MINFORMWIDTH(OPTIONS,mapName) 
{
	var width = 600;
	if (typeof(OPTIONS["MinimumFormWidth:"+mapName])=="undefined") 
        {
            width = OPTIONS["MinimumFormWidth"];
        }
        else
        {
            width = OPTIONS["MinimumFormWidth:" + mapName];
        }
	if (!width)
		width = 600;
	return width;
}


function SHIFT_MAGICMAP(options, name)
{
        var mm = document.getElementById("magicmap");
        left = 12 + GET_MAPLEFT(options,name);
        top = 22 + GET_MAPTOP(options,name);
        if (tournamentGame)
        	top += 20;
	mm.style.top= top+"px";
	mm.style.left= left+"px";
}

function checkFloatDice()
{
    if (myOptions["floatActions"] == "On")
    {
	var outerRolls = document.getElementById('rolls');
	if (outerRolls)
	{
		outerRolls.style.position='fixed';
		outerRolls.style.backgroundColor="#EEEEEE";
		outerRolls.style.top=0;
		outerRolls.style.zIndex=2;
	}
	var actionForm = document.getElementById('action-form');
	if (actionForm)
	{
		var mapInspect = document.getElementById('mapinspect');
		var wrapperDiv = document.getElementById('actionWrapper');
		if (document.getElementById('from_country'))
			wrapperDiv.style.paddingTop="24px";
		else
			wrapperDiv.style.paddingTop="0px";
	}
    }
	
}

function showMapInspectDiv()
{
    var mapInspectDiv = document.getElementById('mapinspect');
    var mapInspetHTML = myOptions['mapInspect'] ? "<table><tr><td colspan=2>Map Inspect: <b><span id=hoverInfo /></b></td></tr></table>":"";
    mapInspectDiv.innerHTML = mapInspetHTML;
}


var newfilterTo = unsafeWindow.filterTo;

unsafeWindow.filterTo = 
function(selected) 
{
	newfilterTo(selected);
	colourCodeDD();
};

// code to find the country in the drop down.
function findCountry(title)
{
			var cntry = countriesArray[title.text];
			if (!cntry) // if we can't find the country - then we need to remove the brackets.
			{
				bracket = title.text.lastIndexOf("(");
				if (bracket!=-1)
				{
					title.text = title.text.substring(0,bracket); // remove stuff after the bracket so that we can find the country OK.
				}
				cntry = countriesArray[title.text];
			}
			// fix for ? mark in drop down - Massive looping problem could be involved so uncomment at your peril.
/*			if (!cntry)
			{
					var idx = title.text.indexOf('?');
					if (idx>-1)
					{
							ignoreQmarks(title, idx);
					}
			}*/
			return cntry;
}


function ignoreQmarks(title, idx)
{
			for (cnt in countriesArray)
			{
					var cnter = countriesArray[cnt];
					if (cnter._name.substring(0,idx)==title.text.substring(0,idx)) // matches first half.
					{
								title.text = cnter._name.substring(0,idx+1)+title.text.substring(idx+1);
								var idx = title.text.indexOf('?');
								if (idx>-1)
								{
										ignoreQmarks(title, idx);
								}
								if (cnter._name.substring(idx+1)==title.text.substring(idx+1)) // matches second half.
								{
										cntry = cnter;
										title.text = cnter._name;
										break;
								}
					}
			}
}


// Colour codes & Adds army counts to the Dropdown. (Note if Colour Codes is off - then sets class name back to default)
function colourCodeDD()
{
	cc_log("Color Coding the Drop downs");

//     		--- Color Code the TO drop down ---
	var tocountry = document.getElementById('to_country');
	if (tocountry) 
	{
		// We have the to drop down on Screen
		var tcopts = tocountry.options;
		for (var ttt =0 ; ttt < tcopts.length; ttt++)
		{
			var toop = tcopts[ttt];
			var cntry = findCountry(toop);
			var owner = cntry._pid;
			toop.innerHTML += " (" + cntry._armies + ")";
			if (myOptions['ccdd']=="On")
			{
				toop.className = "playerBGDD"+owner;
			}
			else
			{
				toop.className = "";
			}
		}
	}
//     		--- Color Code the from drop down ---
	var fromcountry = document.getElementById('from_country');
	if (fromcountry) 
	{
		// We have the to drop down on Screen
		var tcopts = fromcountry.options;
		for (var ttt =0 ; ttt < tcopts.length; ttt++)
		{
			var toop = tcopts[ttt];
			var cntry = findCountry(toop);
			var owner = cntry._pid;
			toop.innerHTML += " (" + cntry._armies + ")";
			if (myOptions['ccdd']=="On")
			{
				toop.className = "playerBGDD"+owner;
			}
			else
			{
				toop.className = "";
			}
		}
	}
}

function prepareMenuHider()
{
    // hide the menu to start with...
    hideMenu();

    // add events to hide the menu again. - occasionally these don't quite work so check they exist before adding events
    var centre = document.getElementById("middleColumn");
    if (centre)
    	centre.addEventListener('mouseover', hideMenu, true);
    var header = document.getElementById("masthead");
    if (header)
    	header.addEventListener('mouseover', hideMenu, true);
    var footer = document.getElementById("footer");
    if (footer)
    	footer.addEventListener('mouseover', hideMenu, true);

    // add div to show the menu.
    showDiv = document.createElement('div');
    showDiv.id="showDiv";
    showDiv.style.position = "absolute";
    showDiv.style.width = "2%";
    showDiv.style.height = document.height+"px";
    showDiv.style.left=0;
    showDiv.style.top=0;
    document.body .appendChild(showDiv);
    showDiv.addEventListener('mouseover', showMenu, true); 
}

function updateMenuHiderHeight()
{
    var showDiv = document.getElementById("showDiv");
    showDiv.style.height = document.height+"px";
}

function hideMenu()
{
	if (myOptions["hideMenu"]=="On")
	{
		hideSideBar();
	}
	else if (myOptions["hideMenu"]=="Game")
	{
		if (document.getElementById("inner-map"))
		{
			hideSideBar();
		}
	}
	else if (myOptions["hideMenu"]=="Site")
	{
		if (!document.getElementById("inner-map"))
		{
			hideSideBar();
		}
	}
	hideMapSettingsMenu();
	hideViewSettingsMenu();
	hideSnapshotsMenu();
	hideConfSettingsMenu();
	hideSiteSettingsMenu();
}

function hideSideBar()
{
	var outerMenu = document.getElementById("outerColumnContainer");
	var leftMenu = document.getElementById("leftColumn");
	if (leftMenu.innerHTML.indexOf('<span class="inbox">')==-1)
	{
		// Don't hide the menu if you have a PM!
		leftMenu.style.display = "none";
		outerMenu.style.borderLeft = "0em solid #DDEEDD";
	}
}

function showMenu()
{
	if (myOptions["hideMenu"]=="On")
	{
		showSideBar();
	}
	else if (myOptions["hideMenu"]=="Game")
	{
		if (document.getElementById("inner-map"))
		{
			showSideBar();
		}
	}
	else if (myOptions["hideMenu"]=="Site")
	{
		if (!document.getElementById("inner-map"))
		{
			showSideBar();
		}
	}
}

function showSideBar()
{
	var outerMenu = document.getElementById("outerColumnContainer");
	var leftMenu = document.getElementById("leftColumn");
	leftMenu.style.display = "inline";
	outerMenu.style.borderLeft = "14em solid #DDEEDD";
}


function setFormWidth()
{
	var width = GET_MINFORMWIDTH(myOptions,mapName);
	if (mapSize=="L")
	{
		lwidth = parseInt(largewidth,10)+5;
		if (lwidth>width)
			width = lwidth;
	}
	else
	{
		swidth = parseInt(smallwidth,10)+5;
		if (swidth>width)
			width = swidth;
	}
	var actionForm = document.getElementById('action-form');
	if (actionForm)
		actionForm.style.width=width+"px";
}

function toggleConfDrop()
{
	if (myOptions["confirm_drop"] == "Off")
	{
		myOptions["confirm_drop"] = "On";
	}
	else
	{
		myOptions["confirm_drop"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_confirm_drop');
	option.innerHTML = "Confirm Drop: <b>" + myOptions["confirm_drop"] + '</b>';
	addConfirmDropGameClickHandlers();
}

function toggleColourCodeDD()
{
	if (myOptions["ccdd"] == "Off")
	{
		myOptions["ccdd"] = "On";
	}
	else
	{
		myOptions["ccdd"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_colourcode_dd');
	option.innerHTML = "Colour DropDown: <b>" + myOptions["ccdd"] + '</b>';
	colourCodeDD();
}

function toggleFullLog()
{
	if (myOptions["fulllog"] == "Off")
	{
		myOptions["fulllog"] = "On";
	}
	else
	{
		myOptions["fulllog"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_fulllog');
	option.innerHTML = "Full Log: <b>" + myOptions["fulllog"] + '</b>';
}

function toggleSwapAvas()
{
	if (myOptions["swapavas"] == "Off")
	{
		myOptions["swapavas"] = "On";
	}
	else
	{
		myOptions["swapavas"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_swapavas');
	option.innerHTML = "Swap Avatars: <b>" + myOptions["swapavas"] + '</b>';
	swapAvatars();
}

function toggleSmallAvas()
{
	if (myOptions["smallavas"] == "Off")
	{
		myOptions["smallavas"] = "On";
	}
	else
	{
		myOptions["smallavas"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_smallavas');
	option.innerHTML = "Small Avatars: <b>" + myOptions["smallavas"] + '</b>';
	smallAvatars();
}

function toggleHideSigs()
{
	if (myOptions["hidesigs"] == "Off")
	{
		myOptions["hidesigs"] = "On";
	}
	else
	{
		myOptions["hidesigs"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_hidesigs');
	option.innerHTML = "Hide Signatures: <b>" + myOptions["hidesigs"] + '</b>';
	hideSigs();
}


function showContOver()
{
	var contOverviewWrapper = document.getElementById("contOverviewWrapper");
	if (myOptions["continent_overview"] == "On")
	{
		contOverviewWrapper.style.display = "";
		if (num_players<=8) // only need to do this if players less than or equal to 8.
		{
			var h = smallheight;
			if (mapSize == "L")
				h = largeheight;
	
			rightside.style.height = h+"px";
			rightside.style.overflow = "auto";
		}
	}
	else
	{
		contOverviewWrapper.style.display = "none";
		if (num_players<=8) // only need to do this if players less than or equal to 8.
		{
			rightside.style.height="";
			rightside.style.overflow = "none";
		}
	}
}

function toggleContOver()
{
	var contOverviewWrapper = document.getElementById("contOverviewWrapper");
	if (myOptions["continent_overview"] == "Off")
	{
		myOptions["continent_overview"] = "On";
	}
	else
	{
		myOptions["continent_overview"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_contoverview');
	option.innerHTML = "Continent Overview: <b>" + myOptions["continent_overview"] + '</b>';
	showContOver();
}


function toggleFloatingActionForm()
{
	// Code below stolen from edthemaster
	var actionForm = document.getElementById('action-form')
	if (myOptions["floatActions"] == "Off")
	{
		myOptions["floatActions"] = "On";
		showMenuOption("menu_hudWidth");
		if (actionForm)
		{
			var mapInspect = document.getElementById('mapinspect');
			actionForm.style.position='fixed';
			actionForm.style.bottom=0;
			actionForm.style.zIndex=2;
			var wrapperDiv = document.createElement('div');
			wrapperDiv.id="actionWrapper";
			if (document.getElementById('from_country'))
				wrapperDiv.style.paddingTop="24px";
			else
				wrapperDiv.style.paddingTop="0px";
			wrapperDiv.appendChild(mapInspect);
			var cards = document.getElementById('cards');
			if (cards)
			{
				cards = cards.parentNode.parentNode;
				cards.style.backgroundColor="#EEEEEE";
				wrapperDiv.appendChild(cards);
			}
			actionForm.childNodes[1].appendChild(wrapperDiv);
			setFormWidth();
		}
		var outerRolls = document.getElementById('rolls');
		if (outerRolls)
		{
			outerRolls.style.position='fixed';
			outerRolls.style.backgroundColor="#EEEEEE";
			outerRolls.style.top=0;
			outerRolls.style.zIndex=2;
		}
	}
	else
	{
		myOptions["floatActions"] = "Off";
		hideMenuOption("menu_hudWidth");
		if (actionForm)
		{
			var cards = document.getElementById('cards');
			if (cards)
			{
				cards = cards.parentNode.parentNode;
				dashboard.childNodes[1].insertBefore(cards, document.getElementById('outer-rolls').parentNode);
			}

			var mapInspect = document.getElementById('mapinspect');
			dashboard.parentNode.insertBefore(mapInspect, siblings);

			actionForm.style.position='relative'
			actionForm.style.bottom=0
			actionForm.style.zIndex=2 
			actionForm.style.width="100%";
		}
		var outerRolls = document.getElementById('rolls');
		if (outerRolls)
		{
			outerRolls.style.position='relative';
			outerRolls.style.backgroundColor="#EEEEEE";
			outerRolls.style.top=0;
			outerRolls.style.zIndex=2;
		}
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_hud');
	option.innerHTML = "HUD: <b>" + myOptions["floatActions"] + '</b>';
	updateMenuHiderHeight();
}

function toggleTextMap() 
{
	startWaiting();
	if (myOptions["textMapType"] == "Off") 
	{
		myOptions["textMapType"] = "Standard";
	} 
	else if (myOptions["textMapType"] == "Standard") 
	{
		myOptions["textMapType"] = "Extended";
	} 
	else 
	{
		myOptions["textMapType"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_textMap');
	option.innerHTML = "Text Map: <b>" + (myOptions["textMapType"]) + '</b>';
	setTimeout(doTextMap,100);
}

function doTextMap()
{
	updateTextmap(true);
	APPLY_TEXTMAP(myOptions);
	updateMagicMap(true);
	updateMenuHiderHeight();			
	stopWaiting();
}


function toggleJumpToMap() 
{
	myOptions["jumptomap"] = ! myOptions["jumptomap"];
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_jtm');
	option.innerHTML = "Jump to Map: <b>" + (myOptions["jumptomap"] ? " On" : " Off")+ '</b>';
	if (!myOptions["jumptomap"] )
		window.location.hash="top";
	else 
		window.location.hash="map";
}

function toggleStatsMode() 
{
	if (myOptions["statsMode"] == "Off") 
	{
		myOptions["statsMode"] = "Standard";
	} 
	else if (myOptions["statsMode"] == "Standard") 
	{
		myOptions["statsMode"] = "Extended";
	} 
	else 
	{
		myOptions["statsMode"] = "Off";
	}

	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_stats');
	option.innerHTML = "Stats: <b> " + myOptions["statsMode"] + '</b>';
	var sml = document.getElementById('showMoreStatsLink');
	sml.innerHTML="scrollable statistics";
	APPLY_STATS(myOptions);
	updateMagicMap(false);
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleMagicMap() 
{
	myOptions["mapInspect"] = ! myOptions["mapInspect"];
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_mapInspect');
	option.innerHTML = "Map Inspect: <b>" + (myOptions["mapInspect"] ? " On" : " Off")+ '</b>';
	showMapInspectDiv();
	updateMagicMap(false);
	updateMenuHiderHeight();
	stopWaiting();
}

function toggleConfirmActionsAA() 
{
	myOptions["confirmAutoAttack"] = ! myOptions["confirmAutoAttack"];
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_conf_attack');
	option.innerHTML = "Confirm AutoAttack: <b>" + (myOptions["confirmAutoAttack"] ? " On" : " Off")+ '</b>';
} 
function toggleConfirmActionsDeploy() 
{
	myOptions["confirmDeploy"] = ! myOptions["confirmDeploy"];
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_conf_deploy');
	option.innerHTML = "Confirm Deploy: <b>" + (myOptions["confirmDeploy"] ? " On" : " Off")+ '</b>';
}    
function toggleConfirmEnds() 
{
	myOptions["confirmEnds"] = ! myOptions["confirmEnds"];
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_conf_phase');
	option.innerHTML = "Confirm Phase End: <b>" + (myOptions["confirmEnds"] ? " On" : " Off")+ '</b>';
}
function toggleFadeMap() 
{
	var cur = GET_MAPFADE(myOptions,mapName);
	cur = Math.round((cur*10) - 1);
	if (cur >= 11) { cur = 1;}
	if (cur <= 0) { cur = 10;}
	myOptions["fadeMap:" + mapName] = cur/10;
	if (myOptions["fadeMap:" + mapName] == myOptions["fadeMap"])
	{
		delete myOptions["fadeMap:" + mapName];
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_fade');
	option.innerHTML = "Map Opacity:  <b>" + Math.round(cur*10) + '%</b>';
	APPLY_MAPFADE(myOptions,mapName);
}

function toggleFormWidth() 
{
	var cur = GET_MINFORMWIDTH(myOptions,mapName);
	cur = cur-50;
	if (cur >= 1000) { cur = 600;}
	if (cur <= 599) { cur = 1000;}
	myOptions["MinimumFormWidth:" + mapName] = cur;
	if (myOptions["MinimumFormWidth:" + mapName] == myOptions["MinimumFormWidth"])
	{
		delete myOptions["MinimumFormWidth:" + mapName];
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_hudWidth');
	option.innerHTML = "Min HUD Width:  <b>"+cur+'</b>';
	if (myOptions["floatActions"] == "On")
	{
		setFormWidth();
	}
}

function resetMap()
{
	var cur = 0;
	myOptions["MapLeft:" + mapName] = cur;
	if (myOptions["MapLeft:" + mapName] == myOptions["MapLeft"])
	{
		delete myOptions["MapLeft:" + mapName];
	}
	var option = document.getElementById('menu_align_left');
	option.innerHTML = "Map Align Left: <b>"+cur+' px</b>';

	myOptions["MapTop:" + mapName] = cur;
	if (myOptions["MapTop:" + mapName] == myOptions["MapTop"])
	{
		delete myOptions["MapTop:" + mapName];
	}
	option = document.getElementById('menu_align_top');
	option.innerHTML = "Map Align Top: <b>"+cur+' px</b>';
	SHIFT_MAGICMAP(myOptions,mapName);

	cur = 10;
	if (cur >= 11) { cur = 1;}
	if (cur <= 0) { cur = 10;}
	myOptions["fadeMap:" + mapName] = cur/10;
	if (myOptions["fadeMap:" + mapName] == myOptions["fadeMap"])
	{
		delete myOptions["fadeMap:" + mapName];
	}
	option = document.getElementById('menu_fade');
	option.innerHTML = "Map Opacity:  <b>" + Math.round(cur*10) + '%</b>';
	APPLY_MAPFADE(myOptions,mapName);

	serialize("OPTIONS",  myOptions);
}

function toggleMapLeft() 
{
	var cur = GET_MAPLEFT(myOptions,mapName);
	cur--;
	if (cur >= 22) { cur = -22;}
	if (cur <= -22) { cur = 22;}
	myOptions["MapLeft:" + mapName] = cur;
	if (myOptions["MapLeft:" + mapName] == myOptions["MapLeft"])
	{
		delete myOptions["MapLeft:" + mapName];
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_align_left');
	option.innerHTML = "Map Align Left: <b>"+cur+' px</b>';
	SHIFT_MAGICMAP(myOptions,mapName);
}

function toggleMapTop() 
{
	var cur = GET_MAPTOP(myOptions,mapName);
	cur--;
	if (cur >= 22) { cur = -22;}
	if (cur <= -22) { cur = 22;}
	myOptions["MapTop:" + mapName] = cur;
	if (myOptions["MapTop:" + mapName] == myOptions["MapTop"])
	{
		delete myOptions["MapTop:" + mapName];
	}
	serialize("OPTIONS",  myOptions);
	var option = document.getElementById('menu_align_top');
	option.innerHTML = "Map Align Top: <b>"+cur+' px</b>';
	SHIFT_MAGICMAP(myOptions,mapName);
}

function createOption(id, text, func, ul, bgcolour, before)
{
	var option1 = document.createElement ('li');
	if (before)
		ul.insertBefore(option1,before.parentNode);
	else
		ul.appendChild(option1);

	var option1a = document.createElement ('a');
	this.id = option1a.id=id;
	option1.appendChild(option1a);
	option1a.href="javascript:void(0);";
	if (bgcolour)
		option1a.style.backgroundColor = bgcolour;
	this.innerHTML = option1a.innerHTML = text;
	option1a.addEventListener("click", func, false);
}

function hideMenuOption(id)
{
	var option = document.getElementById(id);
	if (option)
	{
		option.parentNode.style.display="none";
	}
}

function showMenuOption(id)
{
	var option = document.getElementById(id);
	if (option)
		option.parentNode.style.display="block";
}

function removeMenuOption(id)
{
	var option = document.getElementById(id);
	if (option)
	{
		var parentParent = option.parentNode.parentNode;
		var parent = option.parentNode;
		parent.removeChild(option);
		parentParent.removeChild(parent);
	}
}

function showSnapshotsMenu()
{
	var option = document.getElementById("menu_takesnap");
	if (option)
	{
		if (option.parentNode.style.display=="block")
		{
			hideSnapshotsMenu();
		}
		else
		{
			showMenuOption("menu_takesnap");
			showMenuOption("menu_analyse");
			showMenuOption("menu_refresh");
			loadSnapshots();
			showMenuOption("menu_delete_snaps_game");
			showMenuOption("menu_delete_snaps_all");
		}
	}
	hideMapSettingsMenu();
	hideViewSettingsMenu();
	hideConfSettingsMenu()
}

function hideSnapshotsMenu()
{
	hideMenuOption("menu_takesnap");
	hideMenuOption("menu_analyse");
	hideMenuOption("menu_refresh");
	hideMenuOption("menu_delete_snaps_game");
	hideMenuOption("menu_delete_snaps_all");
	for (var i=0;i<snapshotsMenuLength;i++)
	{
		removeMenuOption("menu_snapshot_"+i);
	}
	snapshotsMenuLength=0;
}


function showMapSettingsMenu()
{
	var option = document.getElementById("menu_fade");
	if (option)
	{
		if (option.parentNode.style.display=="block")
		{
			hideMapSettingsMenu();
		}
		else
		{
			showMenuOption("menu_fade");
			showMenuOption("menu_align_left");
			showMenuOption("menu_align_top");
			showMenuOption("menu_map_reset");
		}
	}
	hideViewSettingsMenu();
	hideSnapshotsMenu();
	hideConfSettingsMenu()
}

function hideMapSettingsMenu()
{
	hideMenuOption("menu_fade");
	hideMenuOption("menu_align_left");
	hideMenuOption("menu_align_top");
	hideMenuOption("menu_map_reset");
}

function showViewSettingsMenu()
{
	var option = document.getElementById("menu_stats");
	if (option)
	{
		if (option.parentNode.style.display=="block")
		{
			hideViewSettingsMenu();
		}
		else
		{
			showMenuOption("menu_stats");
			showMenuOption("menu_mapInspect");
			showMenuOption("menu_textMap");
			showMenuOption("menu_contoverview");
			showMenuOption("menu_clock");
			showMenuOption("menu_clockformat");
			showMenuOption("menu_jtm");
			showMenuOption("menu_hud");
			if (myOptions["floatActions"]=="On")
				showMenuOption("menu_hudWidth");
			showMenuOption("menu_colourcode_dd");
		}
	}
	hideMapSettingsMenu();
	hideSnapshotsMenu();
	hideConfSettingsMenu()
}

function hideViewSettingsMenu()
{
	hideMenuOption("menu_stats");
	hideMenuOption("menu_mapInspect");
	hideMenuOption("menu_textMap");
	hideMenuOption("menu_contoverview");
	hideMenuOption("menu_clock");
	hideMenuOption("menu_clockformat");
	hideMenuOption("menu_jtm");
	hideMenuOption("menu_hud");
	hideMenuOption("menu_hudWidth");
	hideMenuOption("menu_colourcode_dd");
}

function showConfSettingsMenu()
{
	var option = document.getElementById("menu_conf_phase");
	if (option)
	{
		if (option.parentNode.style.display=="block")
		{
			hideConfSettingsMenu();
		}
		else
		{
			showMenuOption("menu_conf_phase");
			showMenuOption("menu_conf_attack");
			showMenuOption("menu_conf_deploy");
		}
	}
	hideMapSettingsMenu()
	hideViewSettingsMenu();
	hideSnapshotsMenu();
}

function hideConfSettingsMenu()
{
	hideMenuOption("menu_conf_phase");
	hideMenuOption("menu_conf_attack");
	hideMenuOption("menu_conf_deploy");
}

function showSiteSettingsMenu()
{
	var option = document.getElementById("menu_fulllog");
	if (option)
	{
		if (option.parentNode.style.display=="block")
		{
			hideSiteSettingsMenu();
		}
		else
		{
			showMenuOption("menu_fulllog");
			showMenuOption("menu_swapavas");
			showMenuOption("menu_smallavas");
			showMenuOption("menu_hidesigs");
			showMenuOption("menu_confirm_drop");
			showMenuOption("menu_clockformat_mygames");
		}
	}
}

function hideSiteSettingsMenu()
{
	hideMenuOption("menu_fulllog");
	hideMenuOption("menu_swapavas");
	hideMenuOption("menu_smallavas");
	hideMenuOption("menu_hidesigs");
	hideMenuOption("menu_confirm_drop");
	hideMenuOption("menu_clockformat_mygames");
}

function createGameMenu()
{
    
	cc_log("Building the Settings Menu 2");          
	var ul = setupMenu();
	
	createOption("menu_sub_map", "Map Options", showMapSettingsMenu, ul);
	
	createOption("menu_fade", "Map Opacity:  <b>" + Math.round(GET_MAPFADE(myOptions,mapName)*100) + '%</b>', toggleFadeMap, ul, "#77AA77");

	createOption("menu_align_left", "Map Align Left: <b>" + Math.round(GET_MAPLEFT(myOptions,mapName)) + ' px</b>', toggleMapLeft, ul, "#77AA77");

	createOption("menu_align_top", "Map Align Top: <b>" + Math.round(GET_MAPTOP(myOptions,mapName)) + ' px</b>', toggleMapTop, ul, "#77AA77");

	createOption("menu_map_reset", "Reset Map Options", resetMap, ul, "#77AA77");

	createOption("menu_sub_view", "View Options", showViewSettingsMenu, ul);

	createOption("menu_stats", "Stats: <b>" + myOptions["statsMode"] + '</b>', toggleStatsMode, ul, "#77AA77");

	createOption("menu_mapInspect", "Map Inspect: <b>" + (myOptions["mapInspect"] ? " On" : " Off")+ '</b>', toggleMagicMap, ul, "#77AA77");

	createOption("menu_textMap", "Text Map: <b>" + (myOptions["textMapType"] )+ '</b>', toggleTextMap, ul, "#77AA77");

	createOption("menu_contoverview", "Continent Overview: <b>" + (myOptions["continent_overview"] )+ '</b>', toggleContOver, ul, "#77AA77");

	createOption("menu_clock", "Clock: <b>" + myOptions["Clock"] + '</b>', toggleClock, ul, "#77AA77");

	createOption("menu_clockformat", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock, ul, "#77AA77");

	createOption("menu_jtm", "Jump to Map: <b>" + (myOptions["jumptomap"] ? " On" : " Off")+ '</b>', toggleJumpToMap, ul, "#77AA77");

	createOption("menu_hud", "HUD: <b>" + myOptions["floatActions"] + '</b>', toggleFloatingActionForm, ul, "#77AA77");

	createOption("menu_hudWidth", "Min HUD Width:  <b>"+GET_MINFORMWIDTH(myOptions,mapName)+'</b>', toggleFormWidth, ul, "#77AA77");

	createOption("menu_colourcode_dd", "Colour DropDown: <b>" + myOptions["ccdd"] + '</b>', toggleColourCodeDD, ul, "#77AA77");

	createOption("menu_sub_snapshots", "Snapshots", showSnapshotsMenu, ul);

	createOption("menu_takesnap", "Take Snapshot", takeSnapshot, ul, "#77AA77");

	createOption("menu_analyse", "Analyse Snapshot", analyse, ul, "#77AA77");

	createOption("menu_refresh", "Revert To Live", 	reloadToLive, ul, "#77AA77");

	createOption("menu_delete_snaps_game", "Delete&nbsp;Game&nbsp;Snapshots", deleteGameSnaps, ul, "#77AA77");

	createOption("menu_delete_snaps_all", "Delete&nbsp;All&nbsp;Snapshots", deleteAllSnaps, ul, "#77AA77");

	createOption("menu_sub_conf", "Confirmations", showConfSettingsMenu, ul);

	createOption("menu_conf_phase", "Confirm Phase End: <b>" + (myOptions["confirmEnds"] ? " On" : " Off")+ '</b>', toggleConfirmEnds, ul, "#77AA77");

	createOption("menu_conf_attack", "Confirm AutoAttack: <b>" + (myOptions["confirmAutoAttack"] ? " On" : " Off")+ '</b>', toggleConfirmActionsAA, ul, "#77AA77");

	createOption("menu_conf_deploy", "Confirm Deploy: <b>" + (myOptions["confirmDeploy"] ? " On" : " Off")+ '</b>', toggleConfirmActionsDeploy, ul, "#77AA77");

	addSiteWideMenuOptions(ul);
}

function toggleHideMenu()
{
	if (myOptions["hideMenu"] == "Off")
	{
		myOptions["hideMenu"] = "Game";
	}
	else if (myOptions["hideMenu"] == "Game")
	{
		myOptions["hideMenu"] = "Site";
	}
	else if (myOptions["hideMenu"] == "Site")
	{
		myOptions["hideMenu"] = "On";
	}
	else
	{
		myOptions["hideMenu"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	hider = document.getElementById("menu_hider");
	hider.innerHTML = "Hide Menu: <b>" + myOptions["hideMenu"] + '</b>';
}


function toggleUpdateAvailable() 
{
	upgrader = document.getElementById("menu_upgrader");
	if (newVersionAvailable)
	{
		upgrader.innerHTML = "<span class='countdown-alert'>Update Available</span>";
	}
	else
	{
		upgrader.innerHTML = "Latest Version Installed";
	}
}

function toggleClock() 
{
	if (myOptions["Clock"] == "Off") 
	{
		myOptions["Clock"] = "On";
	} 
	else 
	{
		myOptions["Clock"] = "Off";
		clearInterval(clockInterval); // stop clock.
		clockInterval = "";
	}
	serialize("OPTIONS",  myOptions);
	var clock = document.getElementById("menu_clock");
	clock.innerHTML = "Clock: <b> " + myOptions["Clock"] + '</b>';
}

function toggle24HourClock() 
{
	clockformat = document.getElementById("menu_clockformat");
	if (!clockformat) // remember we might not be in the game menu - so we might need to get this one.
		clockformat = document.getElementById("menu_clockformat_mygames");
	if (myOptions["24hourClockFormat"] == "Off") 
	{
		myOptions["24hourClockFormat"] = "am/pm";
	} 
	else if (myOptions["24hourClockFormat"] == "am/pm") 
	{
		myOptions["24hourClockFormat"] = "24h";
	} 
	else 
	{
		myOptions["24hourClockFormat"] = "Off";
	}
	serialize("OPTIONS",  myOptions);
	clockformat.innerHTML = "Clock Format: <b> " + myOptions["24hourClockFormat"] + '</b>';
	updateMyGamesClocks();
}


function checkForUpdate() 
{
	scriptURL = 'http://www.fileden.com/files/2008/1/19/1707364/conquerclubbobsupport.txt?nocache=' + Math.random();
	GM_xmlhttpRequest({method: 'GET', url: scriptURL, onload: function(response) {
		responseArray = response.responseText.split('\n')
		var serverVersion = "1.1.1";
		for ( line in responseArray ) {
			if ( responseArray[line].match('var versionString = ') ) 
			{
				serverVersion = responseArray[line].split('"')[1]
				break;
			}
		}
		var serverVersionNumbers = serverVersion.split('.');
		var installedVersionNumbers = versionString.split('.');
		if (parseInt(serverVersionNumbers[0],10)>parseInt(installedVersionNumbers[0],10))
		{
			newVersionAvailable = true;
		}
		else if (parseInt(serverVersionNumbers[0],10)<parseInt(installedVersionNumbers[0],10))
		{
			newVersionAvailable = false;
		}
		else if (parseInt(serverVersionNumbers[1],10)>parseInt(installedVersionNumbers[1],10))
		{
			newVersionAvailable = true;
		}
		else if (parseInt(serverVersionNumbers[1],10)<parseInt(installedVersionNumbers[1],10))
		{
			newVersionAvailable = false;
		}
		else if (parseInt(serverVersionNumbers[2],10)>parseInt(installedVersionNumbers[2],10))
		{
			newVersionAvailable = true;
		}
		else
		{
			newVersionAvailable = false;
		}
		toggleUpdateAvailable();
	}})
}

function setupMenu()
{
	// setup menu headings.
	var leftBar = document.getElementById("leftColumn");

	var ul = leftBar.getElementsByTagName("ul");

	var gmMenu = document.createElement('div');
	gmMenu.id="bobmenu";
	ul[0].parentNode.appendChild(gmMenu);

	var t = document.createElement('h3');
	t.innerHTML =  "BOB Menu <span style='font-size:7pt;' ><a href='http://www.conquerclub.com/forum/viewtopic.php?t=33445'> " + versionString + "</a></span>"; 
	gmMenu.appendChild(t);


	var ul = document.createElement ('ul');
	ul.id = "bobmenuUl";
	gmMenu.appendChild(ul);
	return ul;
}

function addSiteMenuOptions(ul)
{

	createOption("menu_sub_sitemenu", "Site Options", showSiteSettingsMenu, ul);

	createOption("menu_fulllog", "Full Log: <b>" + myOptions["fulllog"] + '</b>', toggleFullLog, ul, "#77AA77");

	createOption("menu_swapavas", "Swap Avatars: <b>" + myOptions["swapavas"] + '</b>', toggleSwapAvas, ul, "#77AA77");

	createOption("menu_smallavas", "Small Avatars: <b>" + myOptions["smallavas"] + '</b>', toggleSmallAvas, ul, "#77AA77");

	createOption("menu_hidesigs", "Hide Signatures: <b>" + myOptions["hidesigs"] + '</b>', toggleHideSigs, ul, "#77AA77");

	createOption("menu_confirm_drop", "Confirm Drop: <b>" + myOptions["confirm_drop"] + '</b>', toggleConfDrop, ul, "#77AA77");
}

function addSiteWideMenuOptions(ul)
{

	createOption("menu_hider", "Hide Menu: <b>" + myOptions["hideMenu"] + '</b>', toggleHideMenu, ul);

	createOption("menu_help", "Help/Info", function() {showHelp(Logging)}, ul);

	createOption("menu_upgrader", "Latest Version Installed", function() {showUpgrade()}, ul);

}

function hideSigs()
{
	if (location.href.indexOf("mode=viewprofile")==-1)
	{
			var body = document.getElementById("page-body");
			if (body)
			{
						if (myOptions["hidesigs"]=="On")
						{
							var sigs = getElementsByClassName(body,'div','signature');
							for (var i=0;i<sigs.length;i++)
							{
								sigs[i].style.display = "none";
							}
						}
						else
						{
							var sigs = getElementsByClassName(body,'div','signature');
							for (var i=0;i<sigs.length;i++)
							{
								sigs[i].style.display = "block";
							}
						}
			}
	}
}

function smallAvatars()
{
	if (location.href.indexOf("mode=viewprofile")==-1)
	{
					var body = document.getElementById("page-body");
					if (body)
					{
						if (myOptions["smallavas"]=="On")
						{
							var avas = getElementsByClassName(body,'dl','postprofile');
							for (var i=0;i<avas.length;i++)
							{
									var dds = avas[i].getElementsByTagName("dd");
									for (var j=0;j<dds.length;j++)
									{
											var profIcons = getElementsByClassName(dds[j],'ul','profile');
											if (!profIcons.length>0)
											{
													if (dds[j].id)
													{
															var expand = document.getElementById("expander"+i);
															expand.value = "Expand";
													}
													else
													{
															dds[j].style.display = "none";
													}
											}
									}

									if (!dds[dds.length-1].id) // only add if we don't already have a button
									{
												var expand = createButtonDD("Expand", i);
												avas[i].appendChild(expand);
									}
							}
						}
						else
						{
							var avas = getElementsByClassName(body,'dl','postprofile');
							for (var i=0;i<avas.length;i++)
							{
									var dds = avas[i].getElementsByTagName("dd");
									for (var j=0;j<dds.length;j++)
									{
											var profIcons = getElementsByClassName(dds[j],'ul','profile');
											if (!profIcons.length>0)
											{
													if (dds[j].id)
													{
															var expand = document.getElementById("expander"+i);
															expand.value = "Collapse";
													}
													else
													{
															dds[j].style.display = "";
													}
											}
									}
									if (!dds[dds.length-1].id) // only add if we don't already have a button
									{
												var expand = createButtonDD("Collapse", i);
												avas[i].appendChild(expand);
									}

							}
						}
					}
	}
}

function createButtonDD(text, which)
{
				var makeExpander = function (n) {
				 return function () {expander (n);}
				};

				var expand = document.createElement("dd");
				expand.id = "expanderdd"+which;
				var expandButton = document.createElement("input");
				expandButton.value = text;
				expandButton.type = "Button";
				expandButton.id = "expander"+which;
				expandButton.className = "button1";
				expandButton.addEventListener("click", makeExpander(which), false);
				expand.appendChild(expandButton);
				return expand;
}

function expander(which)
{
		var expand = document.getElementById("expander"+which);
		var body = document.getElementById("page-body");
		var avas = getElementsByClassName(body,'dl','postprofile');
		var dds = avas[which].getElementsByTagName("dd");
		for (var j=0;j<dds.length;j++)
		{
				var profIcons = getElementsByClassName(dds[j],'ul','profile');
				if (!profIcons.length>0)
				{
						if (!dds[j].id)
						{
								if (expand.value=="Expand")
									dds[j].style.display = "";
								else
									dds[j].style.display = "none";
						}
				}
		}
		if (expand.value=="Expand")
				expand.value="Collapse";
		else
				expand.value="Expand";
}

function swapAvatars()
{
	if (location.href.indexOf("mode=viewprofile")==-1)
	{
					var body = document.getElementById("page-body");
					if (body)
					{
						if (myOptions["swapavas"]=="On")
						{
							var avas = getElementsByClassName(body,'dl','postprofile');
							for (var i=0;i<avas.length;i++)
							{
								avas[i].setAttribute("style","float:left;border-right:1px solid #FFFFFF;border-left:0px solid #FFFFFF;");//background-image:url('./styles/prosilver/imageset/en/icon_user_online.gif');background-position:100% 0pt;background-repeat:no-repeat");
							}
							if (avas.length>0)
							{
								var posts = getElementsByClassName(body,'div','postbody');
								for (var i=0;i<posts.length;i++)
								{
									posts[i].setAttribute("style","float:right");
								}
								var online = getElementsByClassName(body,'div','online');
								for (var i=0;i<online.length;i++)
								{
									online[i].setAttribute("style","background-position:100% 17pt");
								}
							}
						}
						else
						{
							var avas = getElementsByClassName(body,'dl','postprofile');
							for (var i=0;i<avas.length;i++)
							{
								avas[i].setAttribute("style","float:right;border-left:1px solid #FFFFFF;border-right:0px solid #FFFFFF");
							}
							if (avas.length>0)
							{
								var posts = getElementsByClassName(body,'div','postbody');
								for (var i=0;i<posts.length;i++)
								{
									posts[i].setAttribute("style","float:left");
								}
								var online = getElementsByClassName(body,'div','online');
								for (var i=0;i<online.length;i++)
								{
									online[i].setAttribute("style","background-position:100% 0pt");
								}
							}
						}
					}
	}
}

// function to change game links to load full log.
function updateGameLinks()
{
	if (myOptions["fulllog"]=="On")
	{
		var hrefs = document.getElementById('middleColumn').getElementsByTagName("a");
		for (var i=0;i<hrefs.length;i++)
		{
			if (hrefs[i].href.has("game.php"))
			{
				hrefs[i].href += "&full_log=Y";
			}
		}
	}
}

function updateMyGamesClocks()
{
	if (location.href.indexOf("mygames")>=0 || location.href.indexOf("mode=next")>=0) // if in mygames...
	{
		if (location.href.indexOf("mygames2")>=0 || location.href.indexOf("mygames3")>=0 || location.href.indexOf("mygames4")>=0) // but if not in active
			return;
		var middle = document.getElementById('middleColumn');
		var evens = getElementsByClassName(middle,"tr","even",true);
		updateMyGamesClock(evens);
		var odds = getElementsByClassName(middle,"tr","odd",true);
		updateMyGamesClock(odds);
	}
}

function updateMyGamesClock(elements)
{
	for (i=0;i<elements.length;i++)
	{
		var tr = elements[i];
		var tds = tr.childNodes;
		var tds = tr.childNodes;
		var td = tds[9];
		var hrsidx = td.innerHTML.indexOf("hrs");
		var bridx = td.innerHTML.lastIndexOf("<br>");
		time = td.innerHTML.substring(hrsidx-2);
		time = time.split(" ");
		finish = calcEndOfTurnTime(myOptions["24hourClockFormat"], parseInt(time[0],10), parseInt(time[1],10));
		if (bridx<hrsidx)
			td.innerHTML += "<br/>"+finish;
		else
			td.innerHTML = td.innerHTML.substring(0,bridx) + "<br/>" + finish;
	}


}

function showHelp(tlog) 
{
	var win = window.open("http://www.hometag.net/downloads/CC/BOB/help_4.6.1.htm","bobHelp","height=600, width=600, toolbar=no, scrollbars=yes, menubar=no");
	win.focus();
}

function showUpgrade() 
{
	var win = window.open("http://userscripts.org/scripts/source/13076.user.js","bobUpgrade","height=1, width=1, toolbar=no, scrollbars=no, menubar=no, resizable=no");
	win.focus();
	win.close();
}

function cc_log (m) 
{
	Logging += Math.round((new Date()).getTime()/1000)-startLogTime + ":" + m + "<br />" 
}

// Altered to allow partial matches... player matches player1 ... 2 etc.
function getElementsByClassName(oElm, strTagName, strClassName, exact)
{
        var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
        var arrReturnElements = new Array();
        strClassName = strClassName.replace(/\-/g, "\\-");
        var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s)");
        var oElement;
        for(var i=0; i<arrElements.length; i++){
            oElement = arrElements[i];
	        if (exact)
	        {
		    if(oElement.className==strClassName){
			arrReturnElements.push(oElement);
		    }
	        }
		else
		{
		    if(oElement.className.has(strClassName)){
			arrReturnElements.push(oElement);
		    }
		}
        }
        return (arrReturnElements)
}

//mfontlans zslash function
function zslash(svalue, iwidth)
{
   var szero = String(svalue);
   var ch = szero.substr(0,1);
   while (ch == ' ')
   {
      szero = szero.substr(1, szero.length);
      ch = szero.substr(0,1);
   }
   ch = szero.substr(szero.length - 1, szero.length);
   while (ch == ' ')
   {
      szero = szero.substr(0, szero.length - 1);
   ch = szero.substr(szero.length - 1, szero.length);
   }
   
   var i=0;
   for (i=0; i < (iwidth - szero.length); i++)
   {
      szero = '0' + szero;
   }   

   return szero;
} 
    
function countDown()
{
	var clock = document.getElementById('clock');
	var clockFormat = myOptions['24hourClockFormat'];
	
        --seconds1;
        if(seconds1 < 0 ){
            --minutes1;
            if( minutes1 < 0 ){
                --hours1;
                if( hours1 < 0 ){
                    hours1 = 0;
                    if( minutes1 <= 0 && seconds1 <= 0 ){
                        clearInterval(clockInterval);//No more counting down
                        //No weird negative #s
                        minutes1= 0;
                        seconds1 = 0;
                        return;
                    }
                }
                minutes1 = 59;
            }
            seconds1 = 59;
        }
//	clock.innerHTML = hours1+'hrs '+minutes1+'min '+seconds1+'sec';

	var clockhtml = "";

	//mfontlans clock fix.
	if (((hours1==0) && (minutes1<10) && !unsafeWindow.speed) || (unsafeWindow.speed && minutes1<1))
		clockhtml += '<span class="countdown-alert">';
		
	clockhtml +=  zslash(hours1, 2) + 'hrs ' + zslash(minutes1, 2) + 'min ' + zslash(seconds1, 2) + 'sec';
	
	if (((hours1==0) && (minutes1<10) && !unsafeWindow.speed) || (unsafeWindow.speed && minutes1<1))
		clockhtml += "</span>";
		
        if (clockFormat !="Off") 
				{
             clockhtml += ' [' + calcEndOfTurnTime(clockFormat,hours1,minutes1)+ "]";
        }
        clock.innerHTML = clockhtml;


   // yowsers clock fix
/*   if( hours1 < 10)
   {
      clock.innerHTML = '0'+hours1+'hrs ';
   }
   else
   {
      clock.innerHTML = hours1+'hrs ';
   }
   if( minutes1 < 10)
   {
      clock.innerHTML = clock.innerHTML+'0'+minutes1+'min ';
   }
   else
   {
      clock.innerHTML = clock.innerHTML+minutes1+'min ';
   }
   if( seconds1 < 10)
   {
      clock.innerHTML = clock.innerHTML+'0'+seconds1+'sec';
   }
   else
   {
      clock.innerHTML = clock.innerHTML+seconds1+'sec';
   } */
}

function calcEndOfTurnTime(clockFormat, h, m)
{
	if (clockFormat=="Off")
		return "";
        var day = ' @ ';
        var ampm = '';

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();

        minutes = (minutes + m);
        if (minutes >= 60) {
                hours = hours + 1;
                minutes = minutes - 60;
            }

        hours = (hours + h);
        if (hours >= 24)
            {
                day = "Tomorrow @ ";
                hours = hours - 24
            }
        else
        {
                day = "Today @ ";
        }

	if (clockFormat == "am/pm") 
	{
		ampm = " am";
                if (hours >= 12)
                {
                    ampm = " pm";
                    hours = hours - 12;
                }
                if (hours == 0) hours = 12;
	}
	var timeDisplay = day + "<b>" + zslash(hours, 2) + ":" + zslash(minutes, 2) + ampm + "</b>";
	return timeDisplay;
}


function calcRedemption()
{
        if( m_bonusCards == eBonusCards.ESCALATING )
	{
		if( num_turnins < 5 ) 
			return num_turnins * 2 + 4;
		else 
			return num_turnins * 5 - 10;
        } 
	else if( m_bonusCards == eBonusCards.FLATRATE) 
		return 7;
        return 0; //no cards
}

function calcArmiesNextTurn(countries)
{
	var ret = 0; 
	if (reinforcementsArray.length==0) // old school.
	{
		if(countries < 12 ) 
			return 3; 
		ret = Math.floor(countries/3);
	}
	else // new territory array stuff.
	{
		var armiesAwarded = 0;
		for (i=0;i<reinforcementsArray.length;i++)
		{
			var lower = reinforcementsArray[i]._lower;
			var upper = reinforcementsArray[i]._upper;
			var divisor = reinforcementsArray[i]._divisor;
			if (countries>=lower)
			{
				armiesAwarded += Math.floor(  (Math.min(countries, upper)-(lower-1))/divisor);
			}
		}
		ret = Math.max(armiesAwarded,minimumReinforcements);
	}
	return ret;
}

//---- Returns probability of a tunin - http://www.kent.ac.uk/IMS/personal/odl/riskfaq.htm#3.5 ----
function getTurnInP(num_cards)
{
        if( num_cards < 3 ) return 0;
        if( num_cards > 4 ) return 1;
        if( num_cards == 3 ) return 0.3341;
        return 0.778; // has 4 cards
}

// START TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS
// The following functions are derived from the calculations at:
// http://www.conquerclub.com/forum/viewtopic.php?t=15620
    
// Returns the probability of having a set 
// when holding the given number of cards.
function getSetProbability(cards) 
{
        if (cards < 3) return 0;
        if (cards == 3) return 0.333333;
        if (cards == 4) return 0.777778;
        if (cards >= 5) return 1;
        return -1;
}
    
    // Returns the number of armies expected from cashing in
    // a set when holding the given number of cards.
function getArmiesFromCardSet(cards) 
{
        if (m_bonusCards != eBonusCards.FLATRATE) {
            return getSetProbability(cards) * calcRedemption();
        } else {
            if (cards < 3) return 0;
            if (cards == 3) return 2.888889;
            if (cards == 4) return 5.333333;
            if (cards >= 5) return 7.333333;
            return -1;
        }
}  
    
// Returns the number of armies received from owning countries.
function getArmiesFromCountries(countries, continentBonus, missedTurns) 
{
        return (calcArmiesNextTurn(countries) + continentBonus) * (missedTurns + 1);
}
    
// Returns the estimated number of armies due for cashing in a set 
// of cards.
function getEstimatedArmiesFromCards(cards, countries, totalCountries) 
{
        return getArmiesFromCardSet(cards) + (6 * getSetProbability(cards) * (countries / totalCountries));
}

    // Returns the total number of armies expected for the next turn.
function getTotalExpectedArmies(countries, continentBonus, missedTurns, cards, totalCountries) 
{
        return getArmiesFromCountries(countries, continentBonus, missedTurns) + getEstimatedArmiesFromCards(cards, countries, totalCountries);
}

// Returns the calculated strength of a players position rounded to the 
// nearest hundreth.
function getStrength(currentArmies, expectedArmies, countries) 
{
        return Math.round ((currentArmies + expectedArmies - ((2 / 3) * countries)) * 100) / 100;
}
    
// END TAHITIWAHINI ARMIES FROM CARDS CALCULATIONS

function GET_MAPFADE(OPTIONS,mapName) 
{
	var fade = 1;
	if (typeof(OPTIONS["fadeMap:"+mapName])=="undefined") 
        {
            fade = OPTIONS["fadeMap"];
        }
        else
        {
            fade = OPTIONS["fadeMap:" + mapName];
        }
	// force Opacity to not be 0.
	if (fade==0)
	{
		return 1;
	}
	else
	{
		return fade;
	}
}

function APPLY_MAPFADE(OPTIONS,mapName) 
{ 
        var fm = document.getElementById("outer-map");
        fm.style.opacity = GET_MAPFADE(OPTIONS,mapName);
}   

function APPLY_TEXTMAP(OPTIONS) 
{
	if (OPTIONS['textMapType']!="Off")
	{
		if (OPTIONS['textMapType']=="Standard") 
		{ 
			textMap.innerHTML = txtMapSmallHtml;
		}
		else 
		{
			textMap.innerHTML = txtMapHtml;
		}
		var showMoreLink = document.getElementById('showMoreLink');
		showMoreLink.addEventListener('click', showMoreTextMap, true);
		showMoreLink.parentNode.style.display = "";
		var wrapper = document.getElementById('textMapWrapper');
		wrapper.style.display = "";
	}
	else
	{
		textMap.innerHTML = "";
		var wrapper = document.getElementById('textMapWrapper');
		wrapper.style.display = "none";
	}
}


function teamNumber(pid) 
{
	// OK game type = doubles
        //  0 = 0, 1&2 = 1, 3&4 = 2, 5&6 = 3 7&8 = 4
        // game type = triples
        //  0 = 0, 1&2&3 = 1, 4&5&6 = 2
        // Other Games Team=PID
        var tid = pid;
        
        if (pid==UID)
        	return 0;
        
        if (pid!=0 && m_gameType == eGameType.DOUBLES) {
            if (pid==1 || pid == 2) {
                tid = 1;
            }else if (pid==3 || pid == 4) {
                tid = 2;
            }else if ((pid==5 || pid == 6) && num_players>5) {
                tid = 3;
            }else if (num_players>7) {
                tid = 4;
            }
        }
        else if (pid!=0 && m_gameType == eGameType.TRIPLES) {
            if (pid==1 || pid == 2 || pid == 3) {
                tid = 1;
            }else {
                tid = 2;
            }
        } 
        else if (pid!=0 && m_gameType == eGameType.QUADRUPLES) {
            if (pid==1 || pid == 2 || pid == 3 || pid == 4) {
                tid = 1;
            }else {
                tid = 2;
            }
        } 
        return tid;
}
    
function isTeamGame() 
{
	return m_gameType == eGameType.DOUBLES || m_gameType == eGameType.TRIPLES || m_gameType == eGameType.QUADRUPLES;
}


function makeTableCellTextWorker(bEliminated,pid, strText,bwrap, id) 
{
	if (pid==UID)
		pid=0;
        return "<td" + (id?" id="+id:"") + (bwrap?"":" nowrap") +"><span " + (bEliminated ? "class=eliminated" : "" ) + "><span class='playerBG"+ pid +"'>"+  strText +  " </span></span></td>\n" 
}

function makeTableCellText(bEliminated,pid, strText,bwrap, id) 
{
        return makeTableCellTextWorker(bEliminated,pid, strText,false, id) ;
}

function makeTableCellTextWrap(bEliminated,pid, strText, id) 
{
        return makeTableCellTextWorker(bEliminated,pid, strText,true, id) ;
}

function APPLY_STATS(OPTIONS) 
{
    
        if (OPTIONS["statsMode"] == "Off") 
        {
								stats.innerHTML = "";
								var wrapper = document.getElementById('statsWrapper');
								wrapper.style.display = "none";

        }
        else
        {
								if (OPTIONS["statsMode"] == "Standard") 
								{
										stats.innerHTML = statsStr2;
								}
								else // Extended
								{
										stats.innerHTML = statsStr;
								}
								var showMoreLink = document.getElementById('showMoreStatsLink');
								showMoreLink.addEventListener('click', showMoreStats, true);
								showMoreLink.parentNode.style.display = "";
								var wrapper = document.getElementById('statsWrapper');
								wrapper.style.display = "";
								var hideButt = document.getElementById('hideConts');
								hideButt.addEventListener('click', hideContinents, true);
				}
}


function getFullLog()
{
	var thisLog = logDiv.innerHTML.split('<br>'); //Get logs on screen
	
	if (downloadedLog=="" && !thisLog[0].has("Game has been initialized"))
	{
		var failureMsg = "Log Downloading Failed - Would you like to retry?";
		try
		{
			var lastSend = new Date();
			var url = "http://www.conquerclub.com/game.php?";
//			url+= "game=" + unsafeWindow.game.value + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&log_number=" + unsafeWindow.logNumber + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
			url+= "game=" + unsafeWindow.game.value + "&ajax=1&map_key=" + unsafeWindow.mapKey + "&chat_number=" + unsafeWindow.chatNumber+"&lastSend="+lastSend.getTime()+"&full_log=Y";
			var req = new XMLHttpRequest();
			//Setting the URL with a synchronous GET
			req.open('GET',url,false);
			req.send(null);
		}
		catch (e)
		{
			alert(e);
			reloadFullLog(failureMsg);
			return "";
		}
		if (req.status != 200)
		{
			reloadFullLog(failureMsg);
			return "";
		}

		var response = req.responseText.split("&");
		downloadedLog = unescape(response[15]);
		logLength = thisLog.length-1;
	}
	var amendedLog = downloadedLog.split('<br />');
	
	for (var i=logLength;i<thisLog.length-1;i++)
	{
		amendedLog.push(thisLog[i]);
	}
	return amendedLog;

}

function reloadFullLog(message)
{
	if (confirm(message))
	{
		location.href = location.href + "&full_log=Y";
	}
}

// the following are the major functions for this script.

function processLog(start, init, showProgress, end)
{
    if (showProgress)
    	customStartWaiting("Processing Log");
    var log = getFullLog();
    if (end)
    {
    	start=0;
    	init=true;
    }
    if (!init)
    {
			rounds = stored_rounds;
			num_turnins = stored_num_turnins;
			for (name in playersArray)
			{
				playersArray[name]._skipped = stored_skipped[playersArray[name]._pid];
				playersArray[name]._total_skipped = stored_total_skipped[playersArray[name]._pid];
				playersArray[name]._lastBonus = stored_last_bonus[playersArray[name]._pid];
				playersArray[name]._points = stored_terminator_counter[playersArray[name]._pid];
			}
			if (fog)
			{
				for (name in playersArray)
				{
					playersArray[name]._calculatedCountries = stored_countries[playersArray[name]._pid];
				}
			}
			TerminatorSummary = stored_terminator_summary;
		}
		else
		{
			rounds = stored_rounds = 0;
			num_turnins = stored_num_turnins = 0;
			for (name in playersArray)
			{
				playersArray[name]._skipped = stored_skipped[playersArray[name]._pid] = 0;
				playersArray[name]._total_skipped = stored_total_skipped[playersArray[name]._pid] = 0;
				playersArray[name]._lastBonus = stored_last_bonus[playersArray[name]._pid] = 0;
				playersArray[name]._points = stored_terminator_counter[playersArray[name]._pid] = 0;
			}
			if (fog)
			{
				for (name in playersArray)
				{
					playersArray[name]._calculatedCountries = stored_countries[playersArray[name]._pid] = 0;
				}
			}
			TerminatorSummary = stored_terminator_summary = "";
		
			if (fog)
			{
				var np = num_players;
				if (np==2)
					np=3;
				var startingTerrs = Math.floor(totalStartCountries / np);
				if (totalPositions>0 && totalPositions<num_players)
					startingTerrs += ((totalPositionCountries / totalPositions) * Math.floor(totalPositions/num_players));
				for (name in playersArray)
				{
					if (name!="Neutral")
						playersArray[name]._calculatedCountries = startingTerrs;
				}
			}
    }

    /*---- Process Log ----*/
    cc_log("Starting Log Processing");
    cc_log("Log Processing Info - Length :" + log.length);
    for( i = start; i < log.length; i++ )
    {
    	if (end)
    	{
    		var dateStr = log[i].split(" - ")[0];
    		var front = dateStr.split(" ")[0];
    		var back = dateStr.split(" ")[1];
				if (front)
				{
	    		var dArray = front.split("-");
	    		var dyr = dArray[0];
	    		var dmth = dArray[1];
	    		dmth--; //minus 1 off of the month
	    		var dday = dArray[2];
	    		if (back)
	    		{
		    		var tArray = back.split(":");
		    		var thour = tArray[0];
		    		var tmin = tArray[1];
		    		var tsec = tArray[2];
		    		var dateStr2 = Date.UTC(dyr, dmth, dday, thour, tmin, tsec);
		    		if (dateStr2 >= end.getTime())
		    		{
		    			break;
		    		}
		    	}
				}
    	}
        // cc_log("Log Processing Info - indx :" + i + ":" + log[i]);
        // ID the player
        name = log[i].split(/<[^>]*>/)[1];
        if (! playersArray[name] && log[i].has('<span class="player')) {
                // Player Rename mid game?
                var num = parseInt(log[i].split(/"/)[1].split(/player/)[1]);
                name = pIndxs[num-1].innerHTML;
            }
        // Process the log
        if( log[i].has(str_receiveCard) ){
            playersArray[name]._skipped = 0;
            playersArray[name]._deferred = 0;
        }
        else if(  log[i].has(str_outOfTime) ){
            playersArray[name]._skipped = 0;
            playersArray[name]._deferred = 0;
        }
        else if(  log[i].has(str_fortified) )
        {
            playersArray[name]._skipped = 0;
            playersArray[name]._deferred = 0;
        }
        else if (log[i].has(str_deployed) )
        {
            playersArray[name]._skipped = 0;
        }
        else if(log[i].has(str_attacked))
				{
            playersArray[name]._skipped = 0;
				    if (fog)
				    {
							//add 1 to player who conquered...
							playersArray[name]._calculatedCountries++;
							// then minus 1 from player who lost...
							conquered = log[i].substring(log[i].indexOf(str_conquered));
		        	lossname = conquered.split(/<[^>]*>/)[1];
							if (!playersArray[lossname] && conquered.has('<span class="player')) 
							{
                	// Player Rename mid game?
                	var num = parseInt(conquered.split(/"/)[1].split(/player/)[1]);
									if (num!=0)
                		lossname = pIndxs[num-1].innerHTML;
            	}
							if (lossname!=str_neutralPlayer) // don't minus from neutral player...
							{
								playersArray[lossname]._calculatedCountries--;
							}
				    }

				}
        else if(log[i].has(str_bombarded))
				{
            playersArray[name]._skipped = 0;
				    if (fog)
				    {
							// then minus 1 from player who lost...
							annihilated = log[i].substring(log[i].indexOf(str_annihilated));
		        	lossname = annihilated.split(/<[^>]*>/)[1];
							if (!playersArray[lossname] && annihilated.has('<span class="player')) 
							{
                	// Player Rename mid game?
                	var num = parseInt(annihilated.split(/"/)[1].split(/player/)[1]);
									if (num!=0)
                		lossname = pIndxs[num-1].innerHTML;
            	}
							if (lossname!=str_neutralPlayer) // don't minus from neutral player...
							{
								playersArray[lossname]._calculatedCountries--;
							}
				    }

				}
        
        else if( log[i].has(str_missedTurn) ){
            playersArray[ name ]._skipped += 1;
            playersArray[ name ]._total_skipped += 1;
        }
        else if( log[i].has(str_cashed) ){
            playersArray[ name ]._skipped = 0;
            num_turnins++;
        }
        else if( log[i].has(str_eliminated) )
        {
            playersArray[ name ]._skipped = 0;
            TerminatorSummary += log[i] + " in round - "+rounds+"<br/>"
            
        }
	        else if( log[i].has(str_receives) )
					{
						if(fog && !log[i].has(str_holding) && !log[i].has(str_deferred)) // territory count calculation we know this is correct thus force correction.
						{
							var terrCount = log[i].substring(log[i].indexOf(str_armiesFor)+11,log[i].indexOf(str_territories)-1);
							alert("tc = "+terrCount);
							terrCount = parseInt(terrCount,10);
							alert("tc2 = "+terrCount);
				    	playersArray[name]._calculatedCountries = terrCount;
						}
						playersArray[name]._skipped = 0; // Copied from above as receives was previously checked for and did this.
						//calculate how many armies received... add to last bonus.
						if (playersArray[name]._lastBonusFixed)
						{
							playersArray[name]._lastBonus = 0;
							playersArray[name]._lastBonusFixed = false;
						}
						armies = log[i].substring(log[i].indexOf(str_receives)+8,log[i].indexOf(str_armies)-1);
						armies = parseInt(armies,10);
						if (log[i].has(str_deferred))
							playersArray[name]._deferred = armies;
						else
							playersArray[name]._lastBonus = playersArray[name]._lastBonus + armies;
					}
        else if( log[i].has(str_lost) )
        {
			    if (fog)
			    {
			    	playersArray[name]._calculatedCountries--;
			    }
        }
        else if( log[i].has(str_loses) ){
            playersArray[name]._deferred = 0;
            TerminatorSummary += log[i] + " in round - "+rounds+"<br/>"
						var points = log[i].substring(log[i].indexOf(str_loses)+5,log[i].indexOf(str_points)-1);
						points = parseInt(points,10);
						playersArray[ name ]._points -= points;
        }
        else if( log[i].has(str_gains) ){
            playersArray[ name ]._skipped = 0;
            TerminatorSummary += log[i] + " in round - "+rounds+"<br/>"
						var points = log[i].substring(log[i].indexOf(str_gains)+5,log[i].indexOf(str_points)-1);
						points = parseInt(points,10);
						playersArray[ name ]._points += points;
        }
        else if( log[i].has(str_kickedOut) || log[i].has(str_deadbeated) )
        {
            playersArray[ name ]._skipped = -1;
            TerminatorSummary += log[i] + " in round - "+rounds+"<br/>"
				    if (fog && isTeamGame())
				    {
				    	//work out where the armies go to after DB gives territories to team mate.
				    	var goto = calculateBenficiary(name);
				    	if (goto!="-1")
				    	{
				    		playersArray[goto]._calculatedCountries+=playersArray[name]._calculatedCountries;
				    	}
							playersArray[ name ]._calculatedCountries = 0;
				    }
            else if (m_gameType != eGameType.TERMINATOR) 
				    { // if player kicked out and not terminator then blat this to 0.
							playersArray[ name ]._calculatedCountries = 0;
				    }
				}
				else if( log[i].has(str_incrementedRound) || log[i].has(str_initGame) )
				{
						stored_rounds = rounds++;
						// update starter place - and stored vars.
						logFixed=i;
						stored_num_turnins = num_turnins;
						stored_skipped = new Array();
						stored_total_skipped = new Array();
						stored_last_bonus = new Array();
						stored_terminator_counter = new Array();
						if (fog)
							stored_countries = new Array();
						for (name in playersArray)
						{
							stored_skipped.push(playersArray[name]._skipped);
							stored_total_skipped.push(playersArray[name]._total_skipped);
							stored_last_bonus.push(playersArray[name]._lastBonus);
							playersArray[name]._lastBonusFixed = true;
							playersArray[name]._deferred = 0;
							stored_terminator_counter.push(playersArray[name]._points);
							if (fog)
								stored_countries.push(playersArray[name]._calculatedCountries);
						}
						stored_terminator_summary = TerminatorSummary;
								}
								else if (log[i].has(str_wonGame))
								{
						showDeleteAll = true;
						if (!end && !start)
						{
							logFixed=i+1; // Only show this on initial load.
						}
				}
		} // end of processing loops
		var termDiv = document.getElementById('summary');
		if (termDiv)
		{
			outputTerminatorSummary(TerminatorSummary, termDiv)
		}
		else
		{
			var termWrapper = document.getElementById('termWrapper');
			termDiv = document.createElement('div');
			termDiv.id="summary";
			termWrapper.appendChild(termDiv);
			outputTerminatorSummary(TerminatorSummary, termDiv)
		}
}

function outputTerminatorSummary(TerminatorSummary, div)
{
			var termCounter = "<b>Points Totals</b><br/>";
			var found = false;
			for (name in playersArray)
			{
						var player = playersArray[name];
						if (player._pid!=0 && player._pid!=UID)
						{
									var nameStr = "<span class='playerBG"+ player._pid +"'>"+name+"</span>";
									termCounter += nameStr+" scored <b>"+player._points+"</b> points in this game<br/>";
									if (player._points!=0)
											found = true;
						}
			}
			div.innerHTML = TerminatorSummary + (found?termCounter:"");
}

function calculateBenficiary(name)
{
	var curPlayer = playersArray[name];
	var curTeam = teamNumber(curPlayer._pid);
	for (var otherName in playersArray) // loop through from top to bottom...
	{
		possPlayer = playersArray[otherName];
		if (possPlayer._pid != curPlayer._pid) // ensure not the same player...
		{
			if (teamNumber(possPlayer._pid)==curTeam) // ensure on the same team...
			{
				if (possPlayer._skipped!=-1) // ensure teammate not a DB already!
				{
					return otherName;
				}
			}
		}
	}
	return "-1";
}

function hideContinents()
{
	var button = document.getElementById("hideConts");
	var title = document.getElementById("conts");
	if (button.value == "Hide")
	{
			button.value = "Show";
			title.style.color = "#999999";
			for (name in playersArray)
			{
					var disp = document.getElementById("cont"+playersArray[name]._pid);
					if (disp)
						disp.style.display = "none";
			}
	}
	else
	{
			button.value = "Hide";
			title.style.color = "#000000";
			for (name in playersArray)
			{
					var disp = document.getElementById("cont"+playersArray[name]._pid);
					if (disp)
						disp.style.display = "";
			}
	}
}

function createStats(showProgress)
{
    if (showProgress)
    	customStartWaiting("Creating Statistics Table");
    statsStr = "";
    statsStr2 = "";
    tmp = "";
    var tmp2 = "";
    unk = "";
    var unk2 = "";

    var plyrCnt = 0;

		statsStr = "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' rules=rows><thead><tr style='font-weight:normal;' ><td nowrap><b>P</b>layer&nbsp;</td>" + ( m_bonusCards?"<td nowrap><b>S</b>poils&nbsp;</td>":"" )+"<td nowrap><b>M</b>issed<br><b>T</b>urns&nbsp;(Total)</td><td nowrap><b>A</b>rmies&nbsp;</td><td nowrap><b>T</b>erritories&nbsp;";
		if (fog)	{statsStr +="[Calc]";}
		statsStr+= "</td><td nowrap><b>S</b>trength&nbsp;</td><td nowrap><b>L</b>ast<br><b>B</b>onus&nbsp;</td><td nowrap><b>A</b>rmies due<br>(<b>T</b> + <b>C</b> + <b>TB</b>)&nbsp;</td><td nowrap><b>D</b>eferred<br><b>A</b>rmies&nbsp;</td>" + ( m_bonusCards  ?"<td nowrap><b>S</b>poils <br><b>E</b>stimate&nbsp;</td>":"" )+"<td nowrap><span id='conts'><b>C</b>ontinents&nbsp;</span><input type='button' value='Hide' id='hideConts'></td></tr></thead><tbody id=statsbody>";
		statsStr2 = "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' rules=rows><thead><tr style='font-weight:normal;' ><td nowrap><b>P</b>layer&nbsp;</td>" + ( m_bonusCards?"<td nowrap><b>S</b>poils&nbsp;</td>":"" )+"<td nowrap><b>M</b>issed<br><b>T</b>urns&nbsp;</td><td nowrap><b>A</b>rmies&nbsp;</td><td nowrap><b>T</b>erritories&nbsp;";
		if (fog)	{statsStr2 +="[Calc]";}
		statsStr2 += "</td><td nowrap><b>L</b>ast<br><b>B</b>onus&nbsp;</td><td nowrap><b>A</b>rmies<br><b>D</b>ue&nbsp;</td><td nowrap><b>D</b>eferred<br><b>A</b>rmies&nbsp;</td><td nowrap><span id='conts'><b>C</b>ontinents&nbsp;</span><input type='button' value='Hide' id='hideConts'></td></tr></thead><tbody id=statsbody>";

		var LastTeamID = -1;
		var teamArmies = 0;
		var teamTerritories  = 0;
		var teamCalcedTerrs = 0;
		var teamStrength =0;
		var teamID = 0;

    for( name in playersArray )
    {
//        if( playersArray[name]._countries != 0 || playersArray[name]._calculatedCountries != 0)
        {
			    var tid = teamNumber(playersArray[name]._pid);
			    if (tid!=0)
            	teamID = tid;
	            if (isTeamGame() && LastTeamID != -1 && LastTeamID != teamID && name!="Unknown") 
	            {
                var pctArmies = Math.round(teamArmies*100/totalArmies);
                var pctCountries = Math.round(teamTerritories*100/totalCountries);
								pctCalcCountries = Math.round(teamCalcedTerrs*100/totalCountries);
            
                var curpid = 0;
                var nameStr = "Team " + LastTeamID;
                var isEliminated = false;
                if (LastTeamID != 0 ) 
                {
						                statsStr+= "<tr>" + 
                            	makeTableCellText(isEliminated, curpid, nameStr) + 
                            	( m_bonusCards?  makeTableCellText(isEliminated, curpid, "") :"" ) +
                            	makeTableCellText(isEliminated, curpid, "") + 
                            	makeTableCellText(isEliminated, curpid,  teamArmies +" ( " + pctArmies +"% )"); 
														if (fog)
																statsStr += makeTableCellText(isEliminated, curpid, teamTerritories + " ( " + pctCountries +"% ) ["+teamCalcedTerrs+" (" + pctCalcCountries +"%) ]" );
														else
																statsStr += makeTableCellText(isEliminated, curpid, teamTerritories + " ( " + pctCountries +"% )" );
                						statsStr += makeTableCellText(isEliminated, curpid, teamStrength) + 
                            	makeTableCellText(isEliminated, curpid, "") + 
                            	makeTableCellText(isEliminated, curpid, "") + 
                            	makeTableCellText(isEliminated, curpid, "") + 
                            	"</tr>\n";
                						statsStr2+= "<tr>" +
                            	makeTableCellText(isEliminated, curpid, nameStr) + 
                            	( m_bonusCards?  makeTableCellText(isEliminated, curpid, "") :"" ) +
                            	makeTableCellText(isEliminated, curpid, "") + 
                            	makeTableCellText(isEliminated, curpid,  teamArmies );
														if (fog)
      		                      statsStr2+= makeTableCellText(isEliminated, curpid, teamTerritories+" ["+teamCalcedTerrs+"]" );
														else
      		                      statsStr2+= makeTableCellText(isEliminated, curpid, teamTerritories); 
      						          statsStr2+= makeTableCellText(isEliminated, curpid, "") + 
      	                      makeTableCellText(isEliminated, curpid, "") + 
      	                      "</tr>\n";
                }
                teamArmies = 0;
                teamTerritories  = 0;
                teamStrength =0;
                teamCalcedTerrs = 0;
            }

            var curpid = playersArray[name]._pid;
            var nameStr = '<span class="ClickPlayerJumper">'+name+'</span>';
            
            var cardStr = m_bonusCards ?  '<img width="18" height="16" title="' + playersArray[name]._cards + 
                                          ' Bonus Cards" alt="' + playersArray[name]._cards + ' Bonus Cards" class="icon3" src="static/cards.gif"/>' + playersArray[name]._cards + ' '
                                       :  '';
                                       
            var pctArmies = (totalArmies!=0)?Math.round(playersArray[name]._armies*100/totalArmies):0;
            var pctCountries = Math.round(playersArray[name]._countries*100/totalCountries);
            var pctCalcCountries = Math.round(playersArray[name]._calculatedCountries*100/totalCountries);
            var numArmiesNextTurn = ( playersArray[name]._pid )?calcArmiesNextTurn(playersArray[name]._countries):0;
	    			if (fog)
							numArmiesNextTurn = ( playersArray[name]._pid )?calcArmiesNextTurn(playersArray[name]._calculatedCountries):0;
            var eliminated1 = (playersArray[name]._skipped == -1) ? "<span class=eliminated>" : "" ;
            var eliminated2 = (playersArray[name]._skipped == -1) ? "</span>" : "";
            var isEliminated = (playersArray[name]._skipped == -1) || (playersArray[name]._countries == 0 && playersArray[name]._calculatedCountries == 0);
            // strength = Armies + PotentialArmies - 2*Countries/3
            var pl_Strength = Math.round( ( playersArray[name]._armies + (((numArmiesNextTurn + playersArray[name]._continentBonus + playersArray[name]._territoryBonus)*(playersArray[name]._skipped+1))) + (getTurnInP(playersArray[name]._cards) * RedemptionValue) - (2*playersArray[name]._countries/3) ) * 100 )/100;

            var currentArmies = playersArray[name]._armies;
            var cards = playersArray[name]._cards;
            var countries = playersArray[name]._countries;
						var calced_countries = playersArray[name]._calculatedCountries;
            var continentBonus = playersArray[name]._continentBonus + playersArray[name]._territoryBonus;
            var missedTurns = playersArray[name]._skipped;

						if (curpid!=UID)
				    {
            	teamArmies += currentArmies;
            	teamTerritories  += countries;
							teamCalcedTerrs += calced_countries;
            	teamStrength += pl_Strength;
				    }
            
            var estimatedArmiesFromCards = Math.round(getEstimatedArmiesFromCards(cards, countries, totalCountries) * 100) / 100;
            var expectedArmies = Math.round(getTotalExpectedArmies(countries, continentBonus, missedTurns, cards, totalCountries)  * 100) / 100;
            var strength = getStrength(currentArmies, expectedArmies, countries);
      
            if(curpid) // if not neutral
            {
								if (curpid!=UID) // if not UNKNOWN
								{
			                statsStr+= "<tr>" + 
                            makeTableCellText(isEliminated, curpid, nameStr) + 
                            ( m_bonusCards?  makeTableCellText(isEliminated, curpid, cardStr) :"" ) +
                            makeTableCellText(isEliminated, curpid, playersArray[name]._skipped+"&nbsp;("+playersArray[name]._total_skipped+")") + 
                            makeTableCellText(isEliminated, curpid,  playersArray[name]._armies +" ( " + pctArmies +"% )"); 
											if (fog)
                            statsStr+= makeTableCellText(isEliminated, curpid, playersArray[name]._countries + " ( " + pctCountries +"% ) [ "+playersArray[name]._calculatedCountries+" (" + pctCalcCountries +"%) ]"+ playersArray[name].calcKillToReduce());
											else
                            statsStr+= makeTableCellText(isEliminated, curpid, playersArray[name]._countries + " ( " + pctCountries +"% ) " + playersArray[name].killToReduce());
											statsStr+= makeTableCellText(isEliminated, curpid, pl_Strength) + 
                            makeTableCellTextWrap(isEliminated, curpid, playersArray[name]._lastBonus) + 
                            makeTableCellText(isEliminated, curpid, "("+ numArmiesNextTurn +" + " + playersArray[name]._continentBonus + " + " + playersArray[name]._territoryBonus + ") = " + (numArmiesNextTurn + playersArray[name]._continentBonus + playersArray[name]._territoryBonus) );
											if (playersArray[name]._skipped==0)
											    statsStr+= makeTableCellTextWrap(isEliminated, curpid, playersArray[name]._deferred );
											else
											    statsStr+= makeTableCellTextWrap(isEliminated, curpid, ((numArmiesNextTurn + playersArray[name]._continentBonus)*(playersArray[name]._skipped)) );
                      statsStr+= ( m_bonusCards  ? makeTableCellText(isEliminated, curpid, estimatedArmiesFromCards) : "" )+ 
		                         makeTableCellTextWrap(isEliminated, curpid, playersArray[name].ContinentsDisplay(), "cont"+playersArray[name]._pid) + 
                            "</tr>\n";

		        	        statsStr2+= "<tr>" +
                            makeTableCellText(isEliminated, curpid, nameStr) + 
                            ( m_bonusCards?  makeTableCellText(isEliminated, curpid, cardStr) :"" ) +
                            makeTableCellText(isEliminated, curpid, playersArray[name]._skipped) + 
                            makeTableCellText(isEliminated, curpid, playersArray[name]._armies); 
											if (fog)
													statsStr2+= makeTableCellText(isEliminated, curpid, playersArray[name]._countries+" [ "+playersArray[name]._calculatedCountries+" ]");
											else
													statsStr2+= makeTableCellText(isEliminated, curpid, playersArray[name]._countries);
											statsStr2+= makeTableCellTextWrap(isEliminated, curpid, playersArray[name]._lastBonus) + 
			    									makeTableCellText(isEliminated, curpid, ((numArmiesNextTurn + playersArray[name]._continentBonus + playersArray[name]._territoryBonus)));
											if (playersArray[name]._skipped==0)
			    								statsStr2+= makeTableCellTextWrap(isEliminated, curpid, playersArray[name]._deferred );
											else
													statsStr2+= makeTableCellTextWrap(isEliminated, curpid, ((numArmiesNextTurn + playersArray[name]._continentBonus)*(playersArray[name]._skipped)) );
													statsStr2+= makeTableCellTextWrap(isEliminated, curpid, playersArray[name].ContinentsDisplay(), "cont"+playersArray[name]._pid) + "</tr>\n";
								}
								else
								{
											pid = playersArray["Neutral"]._pid;
	                		unk +=        "<tr><td><span class='playerBG"+ pid +"'>"+ nameStr + "</span></td>" +
                            "" + ( m_bonusCards?"<td></td>":"" )+
                            "<td></td>" + // Skiped
                            "<td><span class='playerBG"+ pid +"'>"+ playersArray[name]._armies +" ( " + pctArmies +"% )</span></td>" +
                            "<td><span class='playerBG"+ pid +"'>"+ playersArray[name]._countries + " ( " + pctCountries +"% )</span></td>" +
                            "<td></td>" +
                            "" + ( m_bonusCards ?"<td></td>":"" )+
                            "<td></td>" + 
                            "<td></td>" +
                            "<td></td>" +
                            "</tr>\n";
	                		unk2 +=      "<tr><td><span class='playerBG"+ pid +"'>"+ nameStr + "</span></td>" +
                            "" + ( m_bonusCards?"<td></td>":"" )+
                            "<td></td>" +
                            "<td><span class='playerBG"+ pid +"'>"+ playersArray[name]._armies +" </span></td>" +
                            "<td><span class='playerBG"+ pid +"'>"+ playersArray[name]._countries + " </span></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "</tr>\n";
								}
            }
            else //neutral
            {

                tmp =        "<tr><td><span class='playerBG"+ playersArray[name]._pid +"'>"+ nameStr + "</span></td>" +
                            "" + ( m_bonusCards?"<td></td>":"" )+
                            "<td></td>" + // Skiped
                            "<td><span class='playerBG"+ playersArray[name]._pid +"'>"+ playersArray[name]._armies +" ( " + pctArmies +"% )</span></td>" +
                            "<td><span class='playerBG"+ playersArray[name]._pid +"'>"+ playersArray[name]._countries + " ( " + pctCountries +"% )</span></td>" +
                            "<td><span class='playerBG"+ playersArray[name]._pid +"'>"+ pl_Strength +"</span></td>" +
                            "" + ( m_bonusCards ?"<td></td>":"" )+
                            "<td></td>" + 
                            "<td></td>" +
                            "<td></td>" +
                            "<td id='cont0'>"+showKillers()+"</td>" +
                            "</tr>\n";
                tmp2 =      "<tr><td><span class='playerBG"+ playersArray[name]._pid +"'>"+ nameStr + "</span></td>" +
                            "" + ( m_bonusCards?"<td></td>":"" )+
                            "<td></td>" +
                            "<td><span class='playerBG"+ playersArray[name]._pid +"'>"+ playersArray[name]._armies +" </span></td>" +
                            "<td><span class='playerBG"+ playersArray[name]._pid +"'>"+ playersArray[name]._countries + " </span></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td></td>" +
                            "<td id='cont0'>"+showKillers()+"</td>" +
                            "</tr>\n";
            }
            
            
        LastTeamID = teamID;
        }
    }
    if (isTeamGame())
    {
						pctArmies = Math.round(teamArmies*100/totalArmies);
						pctCountries = Math.round(teamTerritories*100/totalCountries);
						pctCalcCountries = Math.round(teamCalcedTerrs*100/totalCountries);

						curpid = 0;
						nameStr = "Team " + teamID;
						isEliminated = false;
						statsStr+= "<tr>" + 
									makeTableCellText(isEliminated, curpid, nameStr) + 
									( m_bonusCards?  makeTableCellText(isEliminated, curpid, "") :"" ) +
									makeTableCellText(isEliminated, curpid, "") + 
									makeTableCellText(isEliminated, curpid,  teamArmies +" ( " + pctArmies +"% )"); 
						if (fog)
								statsStr += makeTableCellText(isEliminated, curpid, teamTerritories + " ( " + pctCountries +"% ) ["+teamCalcedTerrs+" (" + pctCalcCountries +"%) ]" );
						else
								statsStr += makeTableCellText(isEliminated, curpid, teamTerritories + " ( " + pctCountries +"% )" );
						statsStr += makeTableCellText(isEliminated, curpid, teamStrength) + 
									makeTableCellText(isEliminated, curpid, "") + 
									makeTableCellText(isEliminated, curpid, "") + 
									makeTableCellText(isEliminated, curpid, "") + 
									"</tr>\n";

						statsStr2+= "<tr>" +
									makeTableCellText(isEliminated, curpid, nameStr) + 
									( m_bonusCards?  makeTableCellText(isEliminated, curpid, "") :"" ) +
									makeTableCellText(isEliminated, curpid, "") + 
									makeTableCellText(isEliminated, curpid,  teamArmies );
						if (fog)
									statsStr2+= makeTableCellText(isEliminated, curpid, teamTerritories+" ["+teamCalcedTerrs+"]" );
						else
									statsStr2+= makeTableCellText(isEliminated, curpid, teamTerritories); 
						statsStr2+= makeTableCellText(isEliminated, curpid, "") + 
									makeTableCellText(isEliminated, curpid, "") + 
									"</tr>\n";
    }
    
    statsStr+= unk + tmp; //neutral & Unknowns
    statsStr2+= unk2 + tmp2; //neutral & Unknowns
   
    statsStr+="</tbody><tfoot><tr style='font-weight:bold;color:#000;'><td>Totals</td>" + ( m_bonusCards?"<td></td>":"" )+"<td></td><td>" + totalArmies + " ( 100% )</td><td>" + totalCountries + " ( 100% )</td><td> - </td>" + ( m_bonusCards ?"<td> - </td>":"" )+"<td> - </td></tr>\n";
    statsStr+= "</tfoot></table>"
    statsStr2+= "</tbody></table>"

}


function analyseMap(override)
{
    var aa = override;
    if (!aa)
    	aa = unsafeWindow.gameArmies.innerHTML;
    // store live version in here always.
    liveSnapshotArray = unsafeWindow.gameArmies.innerHTML.replace(/-/g,"~").split(/armies=|,|~|" alt="/);
    // replace all occurences of - with ~ -> this means we can split the array easily.
    armiesArr = aa.replace(/-/g,"~").split(/armies=|,|~|" alt="/);
    var tmpArmies = new Array(); //temp holding for armies
    var tmpCountries = new Array(); //temp holding for countries
    
    for( i in playersArray ){ tmpArmies.push(0); tmpCountries.push(0); }
    totalCountries = 0;
    totalArmies = 0;

    //Get individual scores
    for( i = 0; i < armiesArr.length-1;i+=2 )
    {
	    if (armiesArr[i]=="?")
	    {
		pid = UID;
		tmpCountries[pid]++;
	    }
	    else
	    {
		pid = parseInt( armiesArr[i] );
		tmpArmies[pid]+= parseInt( armiesArr[i+1] );
		tmpCountries[pid]++;
	    }
    }

    i = 0;
    for ( name in playersArray )
    {
        totalArmies += tmpArmies[i];
        playersArray[name]._armies = tmpArmies[i];
        totalCountries = totalCountries+tmpCountries[i];
        playersArray[name]._countries = tmpCountries[i++];
	// init ownership and bonuses out for all players...
	playersArray[name]._continents = new Array();
	playersArray[name]._continentBonus = 0;
	playersArray[name]._territoryBonus = 0;
    }
	
}

function updateCountries()
{
	i=0;
        for (country in countriesArray) 
	{
		var pid;
		if (armiesArr[i*2]=="?")
		{
			pid = UID;
		}
		else
		{
			pid = parseInt( armiesArr[i*2] );
		}
		amrs = armiesArr[(i*2)+1];
		countriesArray[country]._pid = pid;
		countriesArray[country]._armies = amrs;
		if (countriesArray[country]._bonus!=0 && pid>=0 && pid != UID)
		{
			for ( name in playersArray )
			{
				if (pid == playersArray[name]._pid)
				{
					if (countriesArray[country]._bonus<0)
					{
						if ((parseInt(countriesArray[country]._armies,10)+countriesArray[country]._bonus)>1) // if decay leaves more than 1 then bonus stands.
						{
							playersArray[name]._territoryBonus = playersArray[name]._territoryBonus + countriesArray[country]._bonus;
						}
						else // if decay goes beyond 1 then the bonus is negative the rest plus 1.
						{
							playersArray[name]._territoryBonus = (playersArray[name]._territoryBonus - countriesArray[country]._armies)+1;
						}
					}
					else // if positive always happens.
					{
						playersArray[name]._territoryBonus = playersArray[name]._territoryBonus + countriesArray[country]._bonus;
					}
				}
			}	
		}
		i++;
	}
}

function updateObjectives()
{
	var objWrapperDiv = document.getElementById('objectives');
	if (!objWrapperDiv)
	{
		objWrapperDiv = document.createElement('div');
		objWrapperDiv.id="objectives";
		dashboard.parentNode.insertBefore(objWrapperDiv, document.getElementById('chat').previousSibling.previousSibling.previousSibling);
		objWrapperDiv.style.margin = '10px 0 0 0';
		objWrapperDiv.innerHTML = "<h3>Objective Summary</h3>";
		var objDiv = document.createElement('div');
		objDiv.id="objectivessummary";
		objDiv.style.margin = '10px 0 0 0';
		objDiv.style.backgroundColor = "#EEEEEE";
		objWrapperDiv.appendChild(objDiv);
	}

	var objSummary = "";
	var show = false;
	for (var obj in objectivesArray) 
	{
		show = true;
		var objective = objectivesArray[obj];
		objective._owner=-1;	
		var obSummary = "";


		objective.clearOwners(); // empty continent of owners before processing

		pids = new Array();
		for (name in playersArray) // set up empty array for holding player counts of countries.
		{
			pids.push(0);
		}

		for (var j = 0; j < objective._countrys.length; j++ ) 
		{
			var cc = countriesArray[objective._countrys[j]];
			pids[cc._pid]++;
			obSummary += cc.displayString();
		}
		for (var j = 0; j < objective._continents.length; j++ ) 
		{
			var cc = continentsArray[objective._continents[j]];
			for (owner in cc._owners)
			{
				pids[cc._owners[owner]]++;
				var obOwner = 'class="playerBG' + cc._owners[owner] +'"';
				var obOwnerSumm = '<span ' + txtMapSmallOwner + '><span class="JumpClick" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span></span>&nbsp;';
				obSummary += obOwnerSumm;
			}
		}
		leng = pids.length;
		if (fog)
			leng--;
		for (i=1;i<leng;i++) // 1 to start to avoid Neutral player
		{
			if (pids[i]>=objective._required)
			{
				for(name in playersArray)
				{
					if (playersArray[name]._pid == i) 
					{
						objective._owners.push(i);
					}
				}
			}
		}


		if (objective._owners.length>0)
		{
			for (owner in objective._owners)
			{
				for (name in playersArray)
				{
					if (playersArray[name]._pid == objective._owners[owner])
					{
						objSummary += '<br><span class="playerBG' + objective._owners[owner] + '">'+objective._name+" ==> </span>";
						objSummary += obSummary + '<span class="playerBG' + objective._owners[owner] + '">'+" - Held by "+name+"</span><br/>";
					}
				}
			}
		}
		else
		{
			objSummary += "<br><span>"+objective._name+" ==> </span>";	
			objSummary += obSummary;
		}
	}
	if (show)
	{
		objWrapperDiv.style.display = "inline";
		var objDiv = document.getElementById('objectivessummary');
		objDiv.innerHTML = objSummary;
	}
	else
	{
		objWrapperDiv.style.display = "none";
	}
}


// a three phase function...
// First loop through all the continents to see if who they are owned by.
// Next loop through all the continents to see if any should be overriden.
// Once we've decided whether or not a continent is overriden - then we can assign it to the player.

function updateContinents()
{
	// roll through all the continents and assign ownership to each continent.
	for (var continentn in continentsArray) 
	{
		var continent = continentsArray[continentn];

		continent.clearOwners(); // empty continent of owners before processing

		pids = new Array();
		for (name in playersArray) // set up empty array for holding player counts of countries.
		{
			pids.push(0);
		}

		for (var j = 0; j < continent._countrys.length; j++ ) 
		{
			var cc = countriesArray[continent._countrys[j]];
			cc._inContenent = true;
			pids[cc._pid]++;

		}
		for (var j = 0; j < continent._continents.length; j++ ) 
		{
			var cc = continentsArray[continent._continents[j]];
			for (owner in cc._owners)
			{
				pids[cc._owners[owner]]++;
			}
		}
		leng = pids.length;
		if (fog)
			leng--;
		for (i=1;i<leng;i++) // 1 to start to avoid Neutral player
		{
			if (pids[i]>=continent._required)
			{
				for(name in playersArray)
				{
					if (playersArray[name]._pid == i) 
					{
						continent._owners.push(i);
						continent._overriden.push(false);
					}
				}
			}
		}
        }

	// now we have all the owners we need to loop back through and work out if any continents need to override.
	for (var continentn in continentsArray) 
	{
		var continent = continentsArray[continentn];
		// if this continent is owned by anyone then we need to see if it's overriden.
		if (continent._owners.length>0)
		{
			for (var continentn2 in continentsArray) 
			{
				var continent2 = continentsArray[continentn2];
				// don't compare the same continents.
				if (continent!=continent2)
				{
					// loop through overrides for this continent.
					for (over in continent2._overrides)
					{
						// found a match.
						if (continent2._overrides[over]==continent._name)
						{
							for (owner in continent._owners)
							{
								for (owner2 in continent2._owners)
								{
									if (continent._owners[owner]==continent2._owners[owner2])
									{
										continent._overriden[owner]=true;
									}
								}
							}
						}
					}
				}
			}
		}
		// now we've established ownership and overriden ness we then need to assign the bonuses and owner ship to the players.
		for (owner in continent._owners)
		{
			for(name in playersArray)
			{
				if (playersArray[name]._pid == continent._owners[owner]) 
				{
					if (!continent._overriden[owner])
					{
						playersArray[name]._continents.push(continentn);
						playersArray[name]._continentBonus += continent._bonus;
					}
				}
			}
		}
	}

	var contOverview = document.getElementById("contOverview");

	var contOutput = "";
	for (cont in continentsArray)
	{
			var cnt = continentsArray[cont];
			contOutput += cnt.displayString();
			contOutput += " &nbsp;";
	}
	contOverview.innerHTML = contOutput;
	var players = document.getElementById("players");
	var hgt = players.offsetTop + players.clientHeight;
	var h = smallheight;
	if (mapSize == "L")
		h = largeheight;
	var height = (h - hgt)-2;
	var contOverviewWrapper = document.getElementById("contOverviewWrapper");
	if (height>100)
			contOverviewWrapper.style.height = height+"px";
	else
			contOverviewWrapper.style.height = 100+"px";
	showContOver();
}

function updateTextmap(showProgress)
{
	if (showProgress)
		customStartWaiting("Updating Text Map");
	
//               init for Text Based Map 
	txtMapHtml = "";
	txtMapSmallHtml = "<table align=center style='width:100%;border:1px solid #FFF;background:#eee;' rules=rows >";
	txtMapSmallHtml2 = "";
	txtMapSmallOwner = "";
	bDone = false;

	for (var continentn in continentsArray) 
	{
		txtMapSmallOwner = "";
		var continent = continentsArray[continentn];
		bDone = true;
		txtMapHtml += '<h4 ><span class="JumpClick" title="' + continentn + '">' + continent._name + ' (' +  continent._bonus + ')</span></h4>'; 
		txtMapSmallHtml2 = "";

		for (var j = 0; j < continent._countrys.length; j++ ) 
		{
			var cc = countriesArray[continent._countrys[j]];
			cc._inContenent = true;

			txtMapSmallHtml2  +=  cc.displayString();
                   		
			txtMapHtml += cc.displayString() + ' ==> ['; 
			for (var k =0; k < cc._borders.length; k++)
			{
				var bb = countriesArray[cc._borders[k]];
				txtMapHtml += bb.displayString();
			}
			txtMapHtml += ']';
			if (cc._bombards.length>1)
			{
				txtMapHtml += ' __> ['; 
				for (var k =0; k < cc._bombards.length; k++)
				{
					var bb = countriesArray[cc._bombards[k]];
					txtMapHtml += bb.displayString();
				}
				txtMapHtml += ']';
			}
			txtMapHtml += '<br>';
		}
		for (var j = 0; j < continent._continents.length; j++ ) 
		{
			var cc = continentsArray[continent._continents[j]];

			for (i in cc._owners)
			{
				for (name in playersArray)
				{
					if (playersArray[name]._pid == cc._owners[i]) 
					{
						//if (!cc._overriden[i])
						{
							txtMapHtml += '<span class="playerBG' + cc._owners[i] + '"><span class="JumpClick" title="' + cc._name + '">' + cc._name +' ('+cc._bonus+')</span></span>';
							var txtMapSmallContOwner = 'class="playerBG' + cc._owners[i] +'"';
							txtMapSmallHtml2 += '<span ' + txtMapSmallContOwner + '><span class="JumpClick" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span></span>&nbsp;';
						}
					}  
				}
			}
			if (cc._owners.length<1)
			{
				txtMapHtml += '<span class="playerBG0"><span class="JumpClick" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span></span>';
				txtMapSmallHtml2 += '<span class="playerBG0"><span class="JumpClick" title="' + cc._name + '">' + cc._name + ' ('+cc._bonus+')</span></span>&nbsp;';
			}
			txtMapHtml += '<br>';
		}
		for (i in continent._owners)
		{
			for (name in playersArray)
			{
				if (playersArray[name]._pid == continent._owners[i]) 
				{
					if (!continent._overriden[i])
					{
						txtMapHtml += '<br><span class="playerBG' + continent._owners[i] + '"> BONUS for ' + name + ' : ' + continent._bonus + ' </span>';
						txtMapSmallOwner = 'class="playerBG' + continent._owners[i] +'"';
						txtMapSmallHtml += '<tr><td nowrap><span ' + txtMapSmallOwner + '><b><span class="JumpClick" title="' + continentn + '">' + continent._name + ' (' +  continent._bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
					}
				}
			}
		}
		if (continent._owners.length<1)
			txtMapSmallHtml += '<tr><td nowrap><span ' + txtMapSmallOwner + '><b><span class="JumpClick" title="' + continentn + '">' + continent._name + ' (' +  continent._bonus + ')</span></b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
	}

//		Add Text Map
	cc_log("Adding Text Map");
            
	if (bDone) 
	{
		var txtMapHtml2 = "";
                var bDone2 = false;
		txtMapHtml2 += '<h4>No Continent</h4>'; 
		txtMapSmallHtml2 = "";
         
		for (var countr in countriesArray) 
		{
                    var cc = countriesArray[countr];
                    if (!cc._inContenent) 
		    {
                      	txtMapHtml2 +=  cc.displayString() + '==> ['; 
                      	txtMapSmallHtml2 +=  cc.displayString()
                      	for (var k =0; k < cc._borders.length; k++)
			{
                        	var bb = countriesArray[cc._borders[k]];
                            	txtMapHtml2 += bb.displayString();
                            
			}
			txtMapHtml2 += ']';
			if (cc._bombards.length>1)
			{
				txtMapHtml2 += ' __> ['; 
				for (var k =0; k < cc._bombards.length; k++)
				{
					var bb = countriesArray[cc._bombards[k]];
					txtMapHtml2 += bb.displayString();
				}
			}
			txtMapHtml2 += '<br>';
                    	bDone2 = true;
                    }
                 }
                 if (bDone2) 
		 {
                    txtMapHtml += txtMapHtml2;
                    txtMapSmallHtml += '<tr><td nowrap><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
                 }
	}
	else
	{
                 txtMapHtml += '<h2>No Continents</h2>'; 
                 for (var countr in countriesArray) 
	         {
                    var cc = countriesArray[countr];
                    
                    txtMapHtml += cc.displayString() + ' ==> ['; 
	            txtMapSmallHtml2 +=  cc.displayString();
                  
                    for (var k =0; k < cc._borders.length; k++)
		    {
                        var bb = countriesArray[cc._borders[k]];
                            txtMapHtml += bb.displayString();
                    }
                    txtMapHtml += ' ]<br>';
                 }
                 txtMapSmallHtml += '<tr><td nowrap><span><b>No Continent</b></span>&nbsp;&nbsp;</td><td> ' + txtMapSmallHtml2 + '</td></tr>';
	}
	txtMapSmallHtml += "</table>"
}

function updateMagicMap(showProgress)
{
	if (showProgress)
		customStartWaiting("Updating Magic Map");
	var magicmap = document.getElementById('magicmap');
	var magicInnerMap = document.getElementById("inner-map").cloneNode(true);
	magicmap.innerHTML="";
	magicmap.appendChild(magicInnerMap);
	magicmap.style.position="absolute";
	SHIFT_MAGICMAP(myOptions, mapName);
	if (mapSize=="L")
	{
		magicmap.style.height=largeheight;
		magicmap.style.width=largewidth;
	}
	else
	{
		magicmap.style.height=smallheight;
		magicmap.style.width=smallwidth;
	}
	if (!myOptions['mapInspect']) // only bother dicking about in here if we have this on - this will save us time!! (above stuff for non map fade numbers!);
		return;
	var mmaphtml = "";
//             -- And magic map squares -- 
            for (var cou in countriesArray) 
	    {
                var cc = countriesArray[cou];
                var highlightType;
                if (cc.isSafe()==2)  
 		{
                    // Compleatly Safe
                    if (m_gameType == eGameType.DOUBLES || m_gameType == eGameType.TRIPLES || m_gameType == eGameType.QUADRUPLES) 
		    {
                        
                        highlightType = "m";
                    }
                    else 
		    {
                        highlightType = "n";
                    }
                }
                else if (cc.isSafe()==1)  
		{
                    // Team Internal
                    highlightType = "n";

                }
                else
                {
                    // Enemy Border
                    highlightType = "l";

                }
		var pid = cc._pid;
		if (pid == UID)
			pid = NID; // set pid to neutral colour...
    mmaphtml += "<div ID='ARMY"+cc._name.makeID()+"' class='" + highlightType + "player"+pid+"' style='z-index:1; height:18px; width: " + (12 + ((""+cc._armies).length) *8 ) + "px;  left:";
		if (mapSize=='S')
			mmaphtml += (parseInt(cc._smallxPos)-11);
		else
			mmaphtml += (parseInt(cc._largexPos)-11);
		mmaphtml += "px; top:";
		if (mapSize=='S')
			mmaphtml += (parseInt(cc._smallyPos)-37) +"px;'>";
		else
			mmaphtml += (parseInt(cc._largeyPos)-37) +"px;'>";
		mmaphtml += cc._name + "</div>";

    mmaphtml += "<div ID='ATTACK"+cc._name.makeID()+"' class='off"+pid+"' style='z-index:1; height:18px; width: " + (12 + ((""+cc._armies).length) *8 ) + "px;  left:";
		if (mapSize=='S')
			mmaphtml += (parseInt(cc._smallxPos)-11);
		else
			mmaphtml += (parseInt(cc._largexPos)-11);
		mmaphtml += "px; top:";
		if (mapSize=='S')
			mmaphtml += (parseInt(cc._smallyPos)-37) +"px;'>";
		else
			mmaphtml += (parseInt(cc._largeyPos)-37) +"px;'>";
		mmaphtml += cc._name + "</div>";

            }
            magicmap.innerHTML += mmaphtml;


    if ( myOptions['mapInspect']) {

  
      cc_log("Attaching the hover handlers");
    
  
  cc_log("Attaching the hover handlers (MAP SQUARES)");
        // Add Rollovers to map squares
   var mm1 =  document.getElementById('magicmap');
    var arrElements1 = mm1.getElementsByTagName("div");
    var oElement1;
        for(var i=0; i<arrElements1.length; i++) 
	{
	     oElement1 = arrElements1[i];
	
             var title = oElement1.innerHTML; 

		if (title.indexOf('&')>-1)
		{
			title = title.replace("&amp;","&");
			title = title.replace("&lt;",/</);
			title = title.replace("&gt;",/>/);
		}

             oElement1.addEventListener('mouseout', onMouseOutHover , true); 
	     oElement1.innerHTML = "";
             var c = countriesArray[title];
             oElement1.addEventListener('mouseover', makeHandlerName(c.textMap()) , true);              
             
             var type;

            var aAttack = new Array();
            var aDefend = new Array();
            for (var k =0; k < c._borders.length; k++)
            {
                var bb = countriesArray[c._borders[k]];
                aAttack[bb._name] = bb;
            }
            for (var k =0; k < c._DefendBorders.length; k++)
            {
                var bb = countriesArray[c._DefendBorders[k]];
                aDefend[bb._name] = bb;
            }

             
						for (var k =0; k < c._borders.length; k++)
						{
								var bb = countriesArray[c._borders[k]];
								if (typeof(aDefend[bb._name])=="undefined")
								{
									type = "ATTACK"
								}
								else
								{
									type = "BORDER";
								}
                var b = c._borders[k].makeID();
                oElement1.addEventListener('mouseover', makeHandler(b, type) , true); 
						}

						for (var k =0; k < c._DefendBorders.length; k++)
						{
								var bb = countriesArray[c._DefendBorders[k]];

  							if (typeof(aAttack[bb._name])=="undefined")
  							{
  								var b = c._DefendBorders[k].makeID();
  								oElement1.addEventListener('mouseover', makeHandler(b,"DEFEND") , true); 
  							}
						}

            var aBombard = new Array();
            var aBombarded = new Array();
            for (var k =0; k < c._bombards.length; k++){
                var bb = countriesArray[c._bombards[k]];
                aBombard[bb._name] = bb;
            }
            for (var k =0; k < c._bombardedBy.length; k++){
                var bb = countriesArray[c._bombardedBy[k]];
                aBombarded[bb._name] = bb;
            }

						for (var bombard in  c._bombards) 
						{
										var bb = countriesArray[c._bombards[bombard]];
										var b = c._bombards[bombard].makeID();

										if (typeof(aBombarded[bb._name])=="undefined")
										{
											oElement1.addEventListener('mouseover', makeHandler(b.makeID(),"BOMBARDS") , true); 
										}
										else
										{
											oElement1.addEventListener('mouseover', makeHandler(b.makeID(),"MUTUAL") , true); 
										}
            }
						for (var bombard in  c._bombardedBy) 
						{
										var bb = countriesArray[c._bombardedBy[bombard]];
										var b = c._bombardedBy[bombard].makeID();
										if (typeof(aBombard[bb._name])=="undefined")
										{
	                    oElement1.addEventListener('mouseover', makeHandler(b.makeID(),"BOMBARDED") , true); 
	                  }
	                  // don't need else as if will have been done by the bombard loop.
						}
        }


  cc_log("Attaching the hover handlers (CARDS)");  
    // Add Rollovers to cards
    var allC = getElementsByClassName(document.getElementById('dashboard'), "span","card");
    if (allC.length==0)
    {
    	var cards = document.getElementById('cards');
    	if (cards)
    		allC = getElementsByClassName(cards, "span","card");
    }
    for( i in allC ) {
        var title = allC[i].innerHTML;
	if (colourblind=="Y")
		title = title.substring(2);
	if (title.indexOf('&')>-1)
	{
		title = title.replace("&amp;","&");
		title = title.replace("&lt;",/</);
		title = title.replace("&gt;",/>/);
	}
        var c = countriesArray[title];
        
        allC[i].addEventListener('mouseover', makeHandlerName(c.textMap()) , true); 
           
        allC[i].addEventListener('mouseover', makeHandler(title.makeID()) , true); 
        allC[i].addEventListener('mouseout', onMouseOutHover , true); 
        }
 
  cc_log("Attaching the hover handlers (PLAYERS)");  
    // Add Rollovers to playernames
    var allP = getElementsByClassName(document.getElementById('right_hand_side'), "span","player");
    for( i in allP ) {
        
        allP[i].addEventListener('mouseover', onMouseOverPlayer , true); 
        allP[i].addEventListener('mouseout', onMouseOutHover , true); 
        }
  
    cc_log("Attaching the hover handlers (TEAMS)");  
    // Add Rollovers to Team.
    var allT = getElementsByClassName(document.getElementById('right_hand_side'), "li","");
    var playerNumber = 1;
    for (i in allT) {
    if (allT[i].innerHTML.has("Team")) {
            
            allT[i].addEventListener('mouseout', onMouseOutHover , true);
            if (m_gameType == eGameType.TRIPLES ) {
                // This is 3v3
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                
            }
            else if (m_gameType == eGameType.DOUBLES ) {
                // The next 2 players
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
            }
            else if (m_gameType == eGameType.QUADRUPLES ) {
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
                allT[i].addEventListener('mouseover', makeHandlerMOT('player' + (playerNumber++)) , true)
            }
        }
    }


   cc_log("Attaching the click handlers");  


        // Add Click Handlers to Text Map
        var allCntry = getElementsByClassName(document.getElementById('textMap'), "span","clickJump");
        for (i in allCntry) 
				{
            allCntry[i].addEventListener('click', MakeCntryClickHandler(allCntry[i].title) , true)
            
        }
        var allCntry = getElementsByClassName(document.getElementById('textMap'), "span","JumpClick");
        for (i in allCntry) 
				{
            recurseContinents(allCntry[i], allCntry[i].title, "click", MakeCntntClickHandler);
        }
        // Add Click Handler to stats
        var allCntry = getElementsByClassName(document.getElementById('statsTable'), "span","JumpClick");
        for (i in allCntry) 
				{
            recurseContinents(allCntry[i], allCntry[i].title, "click", MakeCntntClickHandler);
        }
        var allCntry = getElementsByClassName(document.getElementById('statsTable'), "span","clickJump");
        for (i in allCntry) 
				{
            allCntry[i].addEventListener('click', MakeCntryClickHandler(allCntry[i].title) , true)
        }
        
        // Click handlers for Player names in Stats table
        var allCntry = getElementsByClassName(document.getElementById('statsTable'), "span","ClickPlayerJumper");
        for (i in allCntry) 
				{
						for (cnt in countriesArray)
						{
								country = countriesArray[cnt];
								if (playersArray[allCntry[i].innerHTML]._pid==country._pid)
								{
										allCntry[i].addEventListener('click', MakeCntryClickHandler(country._name) , true);
								}
						}
				}

        // Add Hover Handler to continents overview
        var allCntry = getElementsByClassName(document.getElementById('contOverview'), "span","hovermap");
        for (i in allCntry) 
				{
            recurseContinents(allCntry[i], allCntry[i].title, "mouseover", MakeCntntHoverHandler);
				    allCntry[i].addEventListener("mouseout", onMouseOutHover, true);
        }

	}

}

	// various Magicmap functions (now outside magicmap)

      var onMouseOverPlayer = function () { 
        var mm =  document.getElementById('magicmap');
        var arrElements = mm.getElementsByTagName("div");
        var oElement;
        var player = this.className;
       
        for(var i=0; i<arrElements.length; i++)
        {
            oElement = arrElements[i];
            if (oElement.id.indexOf("ARMY")>=0)
            {
										if(oElement.className==("l" + player))
												{
												oElement.className  ="h" + player;
												}
										if(oElement.className==("m" + player))
												{
												oElement.className  ="i" + player;
												}

										if(oElement.className==("n" + player))
												{
												oElement.className  ="j" + player;
												}
						}
        }
      } ;
     var onMouseOverTeam = function (player) {
        var mm =  document.getElementById('magicmap');
            var arrElements = mm.getElementsByTagName("div");
            var oElement;
            for(var i=0; i<arrElements.length; i++)
            {
                oElement = arrElements[i];
                if (oElement.id.indexOf("ARMY")>=0)
               {
												if(oElement.className==("l" + player))
														{
																oElement.className  ="h" + player;
														}

												if(oElement.className==("m" + player))
														{
																oElement.className  ="i" + player;
														}
												if(oElement.className==("n" + player))
														{
																oElement.className  ="j" + player;
														}
							  }
            }
        } ;
        var makeHandlerMOT = function (n) {
         return function () {onMouseOverTeam (n);}
        };
    
   
    
       var onMouseOutHover = function () { 
       var mm =  document.getElementById('magicmap');
       var arrElements = mm.getElementsByTagName("div");
        var oElement;
        for(var i=0; i<arrElements.length; i++){
            oElement = arrElements[i];
          if(oElement.className.substring(0,4)=="type"){
          			var player = oElement.className.substring(oElement.className.length-1);
                oElement.className  ="off"+player;
          }
          else if(oElement.className.substring(0,1)=="h"){
                oElement.className  ="l" + oElement.className.substring(1);
            }
          else if(oElement.className.substring(0,1)=="i"){
                oElement.className  ="m" + oElement.className.substring(1);
            }
          else if(oElement.className.substring(0,1)=="j"){
                oElement.className  ="n" + oElement.className.substring(1);
            }
        }
        var hoverInfo = document.getElementById("hoverInfo");
        if (hoverInfo)
	        hoverInfo.innerHTML = "";
    } ;


    var onMouseOverTerritory = function mm123 (n, type) { 
	    
        var args = mm123.arguments;

        for (var i = 0; i < args.length; i++) {
            var oElement =  document.getElementById("ARMY" +args[i]);
            if (oElement)
            {
										if (type) // show attack type
										{
														var aElement =  document.getElementById("ATTACK" +args[i]);
														var player = aElement.className.substring(aElement.className.length-1);
														if (type=="BORDER")
														{
																aElement.className = "typeborder"+player;
														}
														else if (type=="ATTACK")
														{
																aElement.className = "typeattack"+player;
														}
														else if (type=="DEFEND")
														{
																aElement.className = "typedefend"+player;
														}
														else if (type=="BOMBARDS")
														{
																aElement.className = "typebombards"+player;
														}
														else if (type=="BOMBARDED")
														{
																aElement.className = "typebombarded"+player;
														}
														else if (type=="MUTUAL")
														{
																aElement.className = "typemutualbombard"+player;
														}
										}
										else
										{
														if(oElement.className.substring(0,1)=="l"){
																oElement.className  ="h" + oElement.className.substring(1);
														}
														if(oElement.className.substring(0,1)=="m"){
																oElement.className  ="i" + oElement.className.substring(1);
														}
														if(oElement.className.substring(0,1)=="n"){
																oElement.className  ="j" + oElement.className.substring(1);
														}
										}
						}
        }
        } ;
       var makeHandler = function (n, type) {
        return function () {onMouseOverTerritory(n, type);}
    };
    
    var onMouserOverShowName = function mm123321 (n) {
        var hoverInfo = document.getElementById("hoverInfo");
				if (hoverInfo)
        	hoverInfo.innerHTML = n;
    
    };
     var makeHandlerName = function (n) {
        return function () {onMouserOverShowName(n);}
        };


   var cntryClickHandler = function cntryClickHandler(cntryName) 
   {
					if ( myOptions['mapInspect']) // only do stuff if map inspect is on!!
					{
									window.setTimeout(jtm,100);
									window.setTimeout(makeHandler(cntryName.makeID()),500);
									window.setTimeout(onMouseOutHover,1000);
									window.setTimeout(makeHandler(cntryName.makeID()),1500);
									window.setTimeout(onMouseOutHover,2000);
									window.setTimeout(makeHandler(cntryName.makeID()),2500);
									window.setTimeout(onMouseOutHover,3000);
									window.setTimeout(makeHandler(cntryName.makeID()),3500);
									window.setTimeout(onMouseOutHover,4000);
									window.setTimeout(makeHandler(cntryName.makeID()),4500);
									window.setTimeout(onMouseOutHover,5000);
									window.setTimeout(makeHandler(cntryName.makeID()),5500);
									window.setTimeout(onMouseOutHover,6000);
									window.setTimeout(makeHandler(cntryName.makeID()),6500);
									window.setTimeout(onMouseOutHover,7000);
									window.setTimeout(makeHandler(cntryName.makeID()),7500);
									window.setTimeout(onMouseOutHover,8000);
									window.setTimeout(makeHandler(cntryName.makeID()),8500);
									window.setTimeout(onMouseOutHover,9000);
									window.setTimeout(makeHandler(cntryName.makeID()),9500);
									window.setTimeout(onMouseOutHover,10000);
					}
    }

    var MakeCntryClickHandler = function MakeCntryClickHandler(c) 
    {
        return function () { cntryClickHandler(c);};
    }

    function MakeCntntClickHandler(c)
    {
        return function () 
        {
                var ctn = continentsArray[c];
                for (var t in ctn._countrys) 
                {
                        cntryClickHandler(countriesArray[ctn._countrys[t]]._name);
								}
        };
    }

    function MakeCntntHoverHandler(c)
    {
        return function () 
        {
                var ctn = continentsArray[c];
                for (var t in ctn._countrys) 
                {
                			var id = countriesArray[ctn._countrys[t]]._name.makeID();
											onMouseOverTerritory(id);
								}
        };
    }

    function recurseContinents(clicker, cnt, action, func)
    {
	    var cnts = cnt.split("|");
	    for (i=0;i<cnts.length;i++)
	    {
		    clicker.addEventListener(action, func(cnts[i]) , true)
		    var ctn = continentsArray[cnts[i]];
		    for (var cntn  in ctn._continents) 
		    {
						var cont = continentsArray[ctn._continents[cntn]]._name;
						recurseContinents(clicker, cont, action, func);
		    }
	    }
    }


function checkElimSummary()
{
    	var termWrapper = document.getElementById('termWrapper');
	if (TerminatorSummary!="")
	    	termWrapper.style.display="inline";
	else	  
	    	termWrapper.style.display="none";
}


function takeSnapshot()
{
	reloadToLive();
	// get date
	var date = new Date();
	// get armies array...
	var arms = unsafeWindow.gameArmies.innerHTML;
	var innerMapSrc = "http://www.conquerclub.com/map.php?key="+unsafeWindow.mapKey+'&nocache=' + Math.random();
	// get the image.
	var image = "";
	var retry = 0;
	while (image.length<40 && retry<=10)
	{
		image = getImgAsDataScheme(innerMapSrc);
		retry++;
	}
	if (retry>=10)
	{
		alert("Snapshot failed - Please Refresh your browser and retry.");
	}
	else
	{
		// get game number.
		var game = document.getElementById("game2").value;
		// save this data...

		saveSnapshot(date.getTime(),arms,image, game);
	}
	hideSnapshotsMenu(); // hide the menu so I don't have to poke in a new option on the fly.
}

function saveSnapshot(date, arms, image, game)
{
	var savename = game+"~"+date+"~"+rounds;

	var snapshots = GM_getValue("SNAPSHOTS");	
	
	var snapshotsarray = new Array();
	if (snapshots)
		snapshotsarray = snapshots.split(",");
	snapshotsarray.push(savename);
	

	GM_setValue("SNAPSHOTS", snapshotsarray.toString());

	var data = arms+"~~~~~~~~~~"+image;
	
	GM_setValue(savename, data);
}

var onSnapShot = function (loadName,date,id) 
{
	removePointer();
	var data = GM_getValue(loadName);
	dataarray = data.split("~~~~~~~~~~");
	var armies = dataarray[0];
	var image = dataarray[1];
	var img = document.getElementById("inner-map");
	img.src = image;
	unsafeWindow.refreshGMScript(armies, date);
	var option = document.getElementById("menu_snapshot_"+id);
	option.innerHTML = currentSnapshotSelectStringStart + option.innerHTML + currentSnapshotSelectString;
	currentSnapshot = id;
	currentSnapshotArray = armies;

} ;

function reloadToLive()
{
	unsafeWindow.sendRequest();
}

function analyse()
{
	if (currentSnapshot!=-1)
	{
		// liveSnapshotArray is the global variable containing an the live array of armies data.
		var currentArmiesArr = currentSnapshotArray.replace(/-/g,"~").split(/armies=|,|~|" alt="/);;
		
		// loop through arrays
		if (currentArmiesArr.length!=liveSnapshotArray.length)
		{
			alert("error army arrays are different lengths - This Snapshot is invalid");
		}
		else
		{
			i=0; // to keep track of where we are in the armies array.
			for (country in countriesArray) 
			{
				var currentOwner = currentArmiesArr[i*2];
				var currentArmy = currentArmiesArr[i*2+1];
				var liveOwner = liveSnapshotArray[i*2];
				var liveArmy = liveSnapshotArray[i*2+1];
				if (currentOwner!=liveOwner || currentArmy!=liveArmy)
				{
		                        cntryClickHandler(countriesArray[country]._name);
				}
				i++;
			}
		}
	}
}

function removePointer()
{
	if (currentSnapshot!=-1)
	{
		var id = "menu_snapshot_"+currentSnapshot;
		var option = document.getElementById(id);
		if (option) // if option removed then we don't need to remove pointer - just set current to -1;
		{
			var idx=option.innerHTML.indexOf(currentSnapshotSelectString);
			if (idx>=0)
			{
				var menuOption = option.innerHTML.toString();
				menuOption = menuOption.substring(currentSnapshotSelectStringStart.length,idx);
				option.innerHTML = menuOption;
			}
		}
		currentSnapshot=-1;
	}
}

var makeOSS = function (n,d,i) 
{
         return function () {onSnapShot (n,d,i);}
};

function deleteGameSnaps()
{
	if (confirm("Are you sure you wish to delete this games Snapshots?"))
	{
		delGameSnaps();
	}
}

function delGameSnaps()
{
	var gameNo = document.getElementById("game2").value;
	var newSnapshotsArray = new Array();
	var snapshots = GM_getValue("SNAPSHOTS");
	if (snapshots)
	{
			var snapshotsarray = snapshots.split(",");
			for (var i=0;i<snapshotsarray.length;i++)
			{
				var snapshot = snapshotsarray[i].split("~");
				var game = snapshot[0];
				var loadname = snapshotsarray[i];
				if (game==gameNo)
				{
					GM_setValue(loadname,""); // blat out images and data for the data.
				}
				else
				{
					newSnapshotsArray.push(loadname);
				}
			}
			GM_setValue("SNAPSHOTS", newSnapshotsArray.toString());
	}
	currentSnapshot=-1;
	hideSnapshotsMenu(); // hide the menu so I don't have to poke in a new option on the fly.
}

// Blat all data held for snapshots.
function deleteAllSnaps()
{

	var snapshots = GM_getValue("SNAPSHOTS");
	if (snapshots)
	{
		if (confirm("Are you sure you wish to delete all your Snapshots?"))
		{
			var snapshotsarray = snapshots.split(",");
			for (var i=snapshotsarray.length-1;i>=0;i--)
			{
				var loadname = snapshotsarray[i];
				GM_setValue(loadname,""); // blat out images and data for the data.
			}
			GM_setValue("SNAPSHOTS","");
			currentSnapshot=-1;
		}
	}
	hideSnapshotsMenu(); // hide the menu so I don't have to poke in a new option on the fly.
}

function loadSnapshots()
{
	var gameNo = document.getElementById("game2").value;
	var snapshots = GM_getValue("SNAPSHOTS");
	if (snapshots)
	{
		var snapshotsarray = snapshots.split(",");
		for (var i=snapshotsarray.length-1;i>=0;i--)
		{
			var snapshot = snapshotsarray[i].split("~");
			var game = snapshot[0];
			var date = snapshot[1];
			var round;
			if (snapshot.length>2)
				round = snapshot[2];
			var ul = document.getElementById("bobmenuUl");
			var loadname = snapshotsarray[i];
			if (game==gameNo)
			{
				var date2 = new Date();
				date2.setTime(date);
				var d2mins = date2.getMinutes();
				if (d2mins<10)
					d2mins = "0"+d2mins;
				var date3 = date2.getHours()+":"+d2mins+" - "+date2.getDate()+"/"+(date2.getMonth()+1)+"/"+date2.getFullYear();
				if (round)
					date3 = round+" - "+date3;
				if (currentSnapshot==snapshotsMenuLength)
					date3 = currentSnapshotSelectStringStart + date3 + currentSnapshotSelectString;
				var delSnaps = document.getElementById("menu_delete_snaps_game")
				createOption("menu_snapshot_"+snapshotsMenuLength, date3, makeOSS(loadname, date2, snapshotsMenuLength), ul, "#77AA77", delSnaps);
				snapshotsMenuLength++;
			}
		}
	}
}

function showDeleteSnapshots()
{
	var gameNo = document.getElementById("game2").value;
	var snapshots = GM_getValue("SNAPSHOTS");
	if (snapshots)
	{
		var snapshotsarray = snapshots.split(",");
		for (var i=snapshotsarray.length-1;i>=0;i--)
		{
			var snapshot = snapshotsarray[i].split("~");
			var game = snapshot[0];
			var date = snapshot[1];
			if (game==gameNo)
			{
				if (confirm("Would you like to delete Snapshots from this game?"))
				{
					delGameSnaps();
				}
				break; // once we found one - drop out of the loop.
			}
		}
	}


}

function getImgAsDataScheme(url) 
{
	try
	{
		//asking for privilÃ¨ge
		//building the request
		var req = new XMLHttpRequest();
		//Setting the URL with a synchronous GET
		req.open('GET',url,false);
		//XHR binary charset opt by Marcus Granado 2006 [http://mgran.blogspot.com]
		req.overrideMimeType('text/plain; charset=x-user-defined');
		//rending the request
		req.send(null);

		//Server reported something bad ==> exiting with null
		if (req.status != 200) return "";

		//building the dataScheme given the true content-type
		var dataScheme = 'data:'+req.getResponseHeader('content-type')+';base64,';

		//translating the text to a valid binary stream
		var stream = translateToBinaryString(req.responseText);
		//translating the binaryStream to Bas64
		dataScheme+=window.btoa(stream);
		//returning the result
		return dataScheme
	}
	catch(e)
	{
		return "";
	}
}

function translateToBinaryString(text)
{
	var out;
	out='';
	for(i=0;i<text.length;i++)
	{
	//*bugfix* by Marcus Granado 2006 [http://mgran.blogspot.com] adapted by Thomas Belot
		out+=String.fromCharCode(text.charCodeAt(i) & 0xff);
	}
	return out;
}





//---- Prototyping ----
String.prototype.has = function(key) { return this.indexOf(key) > -1; }
String.prototype.makeID = function() { return this.replace(/ /g,"_").replace(/'/g,"_").replace(/#/g,"_").replace(/\?/g,"_"); }
String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); };

String.prototype.normiliseSpaces = function() { return this.replace(/  /g," ").trim(); }

var jtm = function jtm() {window.location.hash="map-cell";}


//-------------------------------------------------------------------------
//    VARIABLE DECLARATIONS
//-------------------------------------------------------------------------

// Static enums - now globalised
//Game Enumerations
var eGameType = { TERMINATOR:0, STANDARD:1, DOUBLES:2, TRIPLES:3, QUADRUPLES:4, ASSASSIN:5 }
var ePlayOrder = { NDTFREESTYLE: 0, FREESTYLE:1, SEQUENTIAL:2 }
var eBonusCards = { NOCARDS:0, FLATRATE:1, ESCALATING:2 }

// globalise variable to easily function out calls.
var m_gameType;
var m_bonusCards;
var fog = false;
var logDiv = document.getElementById('log');
var rightside = document.getElementById('right_hand_side');
var dashboard = document.getElementById('dashboard');
var map = document.getElementById('outer-map');
var armies = document.getElementById('armies');
var colourBlind;
var newVersionAvailable = false;
var minimumReinforcements = 3;
var siblings;
var tournamentGame = false;

//---- Log Processing ----
var downloadedLog = "";
var logLength = 0;
var rounds = 0;
var stored_rounds = 0;
var num_turnins = 0;
var stored_num_turnins = 0;
var stored_skipped = new Array();
var stored_total_skipped = new Array();
var stored_countries = new Array();
var stored_terminator_summary;
var stored_terminator_counter = new Array();
var stored_territories = new Array();
var stored_last_bonus = new Array();

//---- Gameplay ----
var TerminatorSummary = "";
var num_players = 0;
var m_playOrder;
var RedemptionValue;
var redemption;
var pIndxs;

var smallwidth;
var smallheight;
var largewidth;
var largeheight;

//---- Player ----
var NID = 0; // Neutral ID
var UID = 0; // Unknown ID <-- set to 0 here to ensure a value always set
var pl_Colors = new Array("666","f00","090","00f","cc0","0cc","f0f");//Player Colors
    
var pl_cbIDs = new Array("n","r","g","b","y","t","p"); //Color Blind Identifiers

//---- Misc ----
var i;
var tmp;
var re;
var pid; // player identifier
var name; // tmp name

var mapName;
var mapSize;

var textMap;
var txtMapHtml;
var txtMapSmallHtml;
var txtMapSmallHtml2;
var txtMapSmallOwner;
var bDone;


var RedemptionValue=0;
var stats;
var statsStr = "";
var statsStr2 = "";

var totalArmies = 0;
var totalCountries = 0;
var totalStartCountries = 0;
var totalPositions = 0;
var totalPositionCountries = 0;

//---- Clock ----
var today = new Date();
var time = new Array();// { hh, mm, ss }
var timeStr;
var timeLocStr;
var timeLoc;//location of the time
var timeindexOffset;//location of the time + the index ( hr, min, or sec )
var timeWIDTH = 18;
var clock;
var clockInterval;
var hours1;
var minutes1;
var seconds1;
var colourblind = unsafeWindow.colourblind;
var snapshotsMenuLength = 0;
var currentSnapshot = -1;
var currentSnapshotSelectStringStart = "<b>";
var currentSnapshotSelectString = "</b>";
var currentSnapshotArray = new Array();
var liveSnapshotArray = new Array();
var showDeleteAll = false;

// this function is run ONCE on initial INIT of the script.
function gm_ConquerClubGame(OPTIONS)
{
    cc_log("Starting");

//    ---- Check for Required Components ----

    //If we cannot find any of the following then we're not in a game.
    if( !( logDiv && rightside && dashboard && armies) ) 
    {
	var centre = document.getElementById("middleColumn");
	if (centre) // check center exists - this may be a page within a page.
	{
		var leftBar = document.getElementById("leftColumn");
		var ul = leftBar.getElementsByTagName("ul");
		if (ul[0]) // check ul exists - user may not be logged in.
		{
			prepareMenuHider();

			var ul = setupMenu();
			addSiteMenuOptions(ul);
			updateMyGamesClocks();
			createOption("menu_clockformat_mygames", "Clock Format: <b>" + myOptions["24hourClockFormat"] + '</b>', toggle24HourClock, ul, '#77AA77');
			addSiteWideMenuOptions(ul);
			updateGameLinks();
			addConfirmDropGameClickHandlers();
			swapAvatars();
			smallAvatars();
			hideSigs();
			hideMenu();
			updateMenuHiderHeight()
			checkForUpdate();
		}
	}
	stopWaiting();
    	return;
    }
    customStartWaiting("Initializing BOB");

    timeLocStr = rightside.innerHTML.has('<span class="countdown-alert">')?'<h4 id="time-remaining">Time Remaining</h4>\n<span id="clock">\n<span class="countdown-alert">':'<h4 id="time-remaining">Time Remaining</h4>\n<span id="clock">';

    //-------------------------------------------------------------------------
    //    INIT
    //-------------------------------------------------------------------------


//    ---- Start Clock ----
/*    tmp = rightside.innerHTML.indexOf(timeLocStr);//to make sure there is a clock.
    if( tmp > -1 ){
        timeLoc = tmp + timeLocStr.length ;
        tmp = rightside.innerHTML;
        timeStr = tmp.substring(timeLoc,timeLoc + timeWIDTH);
        time = timeStr.split(/hrs\n|min\n|sec\n/);

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var day = ' @ ';
        var ampm = ' '; 
         
        minutes = (minutes + parseInt(time[1]));
        if (minutes >= 60) {
                hours = hours + 1;
                minutes = minutes - 60;
            }
        
        if (time[0][0] == '0')
        {
            time[0] = time[0][1];
        }
        hours = (hours + parseInt(time[0]));
        if (hours >= 24) 
            {
                day = "tomorrow @ ";
                hours = hours - 24
            }
            if (OPTIONS['24hourClockFormat']=="am/pm") {
                ampm = " am";
                if (hours >= 12)
                {
                    ampm = " pm";
                    hours = hours - 12;
                } 
                if (hours == 0) hours = 12; 
            }
        else
        {
            if (hours < 10)
            {
                hours = "0" + hours;
            }
        }
        
        if (minutes < 10)
            minutes = "0" + minutes;
        
        if (OPTIONS['24hourClockFormat']!="Off") {
            clock =  day + "<b>" + hours + ":" + minutes + ampm + " " + "</b>"
        }
        else
        {
            clock = ""
        }
        hours1 = parseInt(time[0]);
        minutes1 = parseInt(time[1]);
        seconds1 = parseInt(time[2]);

        clockInterval = window.setInterval(countDown,1000);
    }*/

    // Yowsers clock fix
    tmp = rightside.innerHTML.indexOf(timeLocStr);//to make sure there is a clock.
    if( tmp > -1 ){
        timeLoc = tmp + timeLocStr.length ;
        tmp = rightside.innerHTML;
        timeStr = tmp.substring(timeLoc,timeLoc + timeWIDTH);
       
        time = timeStr.split(/hrs\n|min\n|sec\n/);

        var currentTime = new Date();
        var hours = currentTime.getHours();
        var minutes = currentTime.getMinutes();
        var day = ' @ ';
        var ampm = ' ';
         
        minutes = (minutes + parseInt(time[1],10));
        if (minutes >= 60) {
                hours = hours + 1;
                minutes = minutes - 60;
            }
       
        if (time[0][0] == '0')
        {
            time[0] = time[0][1];
        }
        hours = (hours + parseInt(time[0],10));
        if (hours >= 24)
            {
                day = "tomorrow @ ";
                hours = hours - 24
            }
            if (OPTIONS['24hourClockFormat']=="am/pm") {
                ampm = " am";
                if (hours >= 12)
                {
                    ampm = " pm";
                    hours = hours - 12;
                }
                if (hours == 0) hours = 12;
            }
        else
        {
            if (hours < 10)
            {
                hours = "0" + hours;
            }
        }
       
        if (minutes < 10)
            minutes = "0" + minutes;
       
        if (OPTIONS['24hourClockFormat']!="Off") {
            clock =  day + "<b>" + hours + ":" + minutes + ampm + " " + "</b>"
        }
        else
        {

            clock = ""
        }
        hours1 = parseInt(time[0],10);
        minutes1 = parseInt(time[1],10);
        seconds1 = parseInt(time[2],10);

        clockInterval = window.setInterval(countDown,1000);
    } 

    // is this game with fog of war on?
    if (dashboard.innerHTML.indexOf("Fog of War: <b>Yes")!=-1)
    {
	fog = true;
    }


    getCardType();


//    ---- Create Divisions ----
		statsWrapper = document.createElement('div');
		statsWrapper.id = "statsWrapper";
		statsWrapper.innerHTML = "<span style='float:right;margin-right:20px'>[<a id='showMoreStatsLink'>scrollable statistics</a>]</span><H3>Statistics</H3>"
		statsWrapper.style.display = "none";

    stats = document.createElement('div');
    stats.id="statsTable";
		statsWrapper.appendChild(stats);

    dashboard.parentNode.insertBefore(statsWrapper, logDiv.previousSibling.previousSibling);
    stats.style.margin = '10px 0 0 0';

//     Create text map 
		textMapWrapper = document.createElement('div');
		textMapWrapper.id = "textMapWrapper";
		textMapWrapper.innerHTML = "<span style='float:right;margin-right:20px'>[<a id='showMoreLink'>scrollable text map</a>]</span><H3>Text Map</H3>"
		textMapWrapper.style.display = "none";

    textMap = document.createElement('div');
    textMap.id="textMap";
    textMap.style.backgroundColor = "#EEEEEE";

		textMapWrapper.appendChild(textMap);

    dashboard.parentNode.insertBefore(textMapWrapper, logDiv.previousSibling.previousSibling);
    textMap.style.margin = '10px 0 0 0';

    if (document.getElementById("action-form"))
    	siblings = statsWrapper.previousSibling.previousSibling.previousSibling.previousSibling;
    else
    	siblings = statsWrapper.previousSibling.previousSibling;

    var mapInspectDiv = document.createElement('div');
    mapInspectDiv.id="mapinspect";
    dashboard.parentNode.insertBefore(mapInspectDiv, siblings);
    mapInspectDiv.style.backgroundColor = "#EEEEEE";

    redemption = document.createElement('div');
    redemption.id="redemption";
    dashboard.parentNode.insertBefore(redemption, siblings);
    redemption.style.backgroundColor = "#EEEEEE";


    var chatDiv = document.getElementById("chat");

//     Create text map 
    termWrapper = document.createElement('div');
    termWrapper.id="termWrapper";
    dashboard.parentNode.insertBefore(termWrapper, chatDiv.previousSibling.previousSibling);
    termWrapper.style.margin = '10px 0 0 0';
	if (m_gameType == eGameType.TERMINATOR) 
	{
		termWrapper.innerHTML = "<h3>Terminator Points Summary</h3>"
	}
	else
	{
		termWrapper.innerHTML += "<h3>Elimination Summary</h3>"
	}
		var contOverviewWrapper = document.createElement('div');
		contOverviewWrapper.innerHTML = "<H4>Continents Overview</H4>";
		contOverviewWrapper.id = "contOverviewWrapper";
		var contOverview = document.createElement('div');
		contOverview.id = "contOverview";
		contOverviewWrapper.style.display = "none";
		contOverviewWrapper.style.overflowY = "auto";
		contOverviewWrapper.style.overflowX = "hidden";
		contOverviewWrapper.appendChild(contOverview);
		rightside.appendChild(contOverviewWrapper);

    if (OPTIONS["floatActions"] == "On")
    {
	var actionForm = document.getElementById('action-form');
	if (actionForm)
	{
		actionForm.style.position='fixed';
		actionForm.style.bottom=0;
		actionForm.style.zIndex=2;
		var wrapperDiv = document.createElement('div');
		wrapperDiv.id="actionWrapper";
		if (document.getElementById('from_country'))
			wrapperDiv.style.paddingTop="22px";
		else
			wrapperDiv.style.paddingTop="0px";
		var mapInspect = document.getElementById('mapinspect');
		wrapperDiv.appendChild(mapInspect);
		var cards = document.getElementById('cards');
		if (cards)
		{
			cards = cards.parentNode.parentNode;
			cards.style.backgroundColor="#EEEEEE";
			wrapperDiv.appendChild(cards);
		}
		actionForm.childNodes[1].appendChild(wrapperDiv);
		setFormWidth();
	}
	var outerRolls = document.getElementById('rolls');
	if (outerRolls)
	{
		outerRolls.style.position='fixed';
		outerRolls.style.backgroundColor="#EEEEEE";
		outerRolls.style.top=0;
		outerRolls.style.zIndex=1;
	}
    }


//    ---- Get Game Modes ----
    if( dashboard.innerHTML.has("Sequential") ) 
        {
            m_playOrder = ePlayOrder.SEQUENTIAL;
        }
    else 
        {
            if( dashboard.innerHTML.has("Freestyle (no double turns)") )
                m_playOrder = ePlayOrder.NDTFREESTYLE;
            else
                m_playOrder = ePlayOrder.FREESTYLE;
        }

//    ---- Get Game Type ----
    if (dashboard.innerHTML.has("Doubles") ) m_gameType = eGameType.DOUBLES;
    else if (dashboard.innerHTML.has("Triples") ) m_gameType = eGameType.TRIPLES;
    else if (dashboard.innerHTML.has("Quadruples") ||  dashboard.innerHTML.has("Game Type: <b></b>")) m_gameType = eGameType.QUADRUPLES;
    else if (dashboard.innerHTML.has("Terminator") ) m_gameType = eGameType.TERMINATOR;
    else if (dashboard.innerHTML.has("Assassin") ) m_gameType = eGameType.ASSASSIN;
    else m_gameType = eGameType.STANDARD;

//		---- Is it a tourney game? ----
		var tr = dashboard.getElementsByTagName("TR")[0];
		var td = tr.getElementsByTagName("TD")[0];
		if (td.id!="map-cell")
			tournamentGame = true;


//     --- Add Styles ---
/*
Number Colors
#FFFFFF: White (Neutral)
#FF0000: Red (Both Same)
#0000FF: Blue (Both Same)
#009A04: Green (Both Same)
#FFFF00: Yellow (Bright)
#FF00FF: Magenta/pink (Both Same)
#00FFFF: Cyan (Bright)
#7F7F7F: Gray (Both Same)
#FF9922: Orange (Both Same)

Log Colors
#000000: Black (Neutral) <- Neutral has always been black in the logs!
#FF0000: Red (Both Same)
#0000FF: Blue (Both Same)
#009A04: Green (Both Same)
#CCCC00: Yellow (Muted)
#FF00FF: Magenta/pink (Both Same)
#00CCCC: Cyan (Muted)
#7F7F7F: Gray (Both Same)
#FF9922: Orange (Both Same) 
*/


// Colour Defs
// Number
var col0 = new Array();
col0[0] = "#FFFFFF"; // neutral
col0[1] = "#FF0000";
col0[2] = "#009A04";
col0[3] = "#0000FF";
col0[4] = "#FFFF00";
col0[5] = "#FF00FF";
col0[6] = "#00FFFF";
col0[7] = "#FF9922";
col0[8] = "#7F7F7F";
col0[9] = "#000000"; // BR colour
//Log
var col1 = new Array();
col1[0] = "#000000";
col1[1] = "#FF0000";
col1[2] = "#009A04";
col1[3] = "#0000FF";
col1[4] = "#DDDD00";
col1[5] = "#FF00FF";
col1[6] = "#00CCCC";
col1[7] = "#FF9922";
col1[8] = "#7F7F7F";
col1[9] = "#BBBBBB"; // BR colour

GM_addStyle(' #outer-map { position:relative;} ' +
                ' #inner-map img { position:absolute;} ' +
                ' .attackhovers { vertical-align:middle; padding-top:1px; padding-bottom:1px;} ' +
                ' #summary {height: 150px;overflow: auto;background-color: #eee; margin:10px 0 0 0;} ' +
                ' #magicmap div   { height: 18px; height: 100%; width: 100%; position:absolute; opacity:0.0;} ' +

                ' #magicmap .hplayer0  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .hplayer1  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[1] + ';border-bottom:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .hplayer2  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[2] + ';border-bottom:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .hplayer3  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[3] + ';border-bottom:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .hplayer4  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[4] + ';border-bottom:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .hplayer5  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[5] + ';border-bottom:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .hplayer6  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[6] + ';border-bottom:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .hplayer7  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[7] + ';border-bottom:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .hplayer8  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[8] + ';border-bottom:thick solid ' + col0[8] + ';} ' +


                ' #magicmap .lplayer0  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .lplayer1  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[1] + ';border-bottom:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .lplayer2  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[2] + ';border-bottom:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .lplayer3  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[3] + ';border-bottom:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .lplayer4  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[4] + ';border-bottom:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .lplayer5  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[5] + ';border-bottom:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .lplayer6  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[6] + ';border-bottom:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .lplayer7  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[7] + ';border-bottom:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .lplayer8  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[8] + ';border-bottom:thick solid ' + col0[8] + ';} ' +


                ' #magicmap .iplayer0  {  opacity:0.8; border:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .iplayer1  {  opacity:0.8; border:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .iplayer2  {  opacity:0.8; border:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .iplayer3  {  opacity:0.8; border:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .iplayer4  {  opacity:0.8; border:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .iplayer5  {  opacity:0.8; border:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .iplayer6  {  opacity:0.8; border:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .iplayer7  {  opacity:0.8; border:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .iplayer8  {  opacity:0.8; border:thick solid ' + col0[8] + ';} ' +

                ' #magicmap .mplayer0  {  opacity:0.0; border:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .mplayer1  {  opacity:0.0; border:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .mplayer2  {  opacity:0.0; border:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .mplayer3  {  opacity:0.0; border:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .mplayer4  {  opacity:0.0; border:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .mplayer5  {  opacity:0.0; border:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .mplayer6  {  opacity:0.0; border:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .mplayer7  {  opacity:0.0; border:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .mplayer8  {  opacity:0.0; border:thick solid ' + col0[8] + ';} ' +


                ' #magicmap .jplayer0  {  opacity:10.8; border:thick solid  ' + col0[0] + ';} ' +
                ' #magicmap .jplayer1  {  opacity:10.8; border:thick solid  ' + col0[1] + ';} ' +
                ' #magicmap .jplayer2  {  opacity:10.8; border:thick solid  ' + col0[2] + ';} ' +
                ' #magicmap .jplayer3  {  opacity:10.8; border:thick solid  ' + col0[3] + ';} ' +
                ' #magicmap .jplayer4  {  opacity:10.8; border:thick solid  ' + col0[4] + ';} ' +
                ' #magicmap .jplayer5  {  opacity:10.8; border:thick solid  ' + col0[5] + ';} ' +
                ' #magicmap .jplayer6  {  opacity:10.8; border:thick solid  ' + col0[6] + ';} ' +
                ' #magicmap .jplayer7  {  opacity:10.8; border:thick solid  ' + col0[7] + ';} ' +
                ' #magicmap .jplayer8  {  opacity:10.8; border:thick solid  ' + col0[8] + ';} ' +

                ' #magicmap .nplayer0  {  opacity:0.0; border:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .nplayer1  {  opacity:0.0; border:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .nplayer2  {  opacity:0.0; border:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .nplayer3  {  opacity:0.0; border:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .nplayer4  {  opacity:0.0; border:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .nplayer5  {  opacity:0.0; border:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .nplayer6  {  opacity:0.0; border:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .nplayer7  {  opacity:0.0; border:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .nplayer8  {  opacity:0.0; border:thick solid ' + col0[8] + ';} ' +

                ' #magicmap .off0    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder0    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .typeattack0    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[0] + ';border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .typedefend0    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[0] + ';border-top:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .typebombards0  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[0] + ';border-top:thick solid ' + col0[0] + ';border-right:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .typebombarded0 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[0] + ';border-right:thick solid ' + col0[0] + ';border-bottom:thick solid ' + col0[0] + ';} ' +
                ' #magicmap .typemutualbombard0 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[0] + ';border-right:thick solid ' + col0[0] + ';} ' +

                ' #magicmap .off1    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder1    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[1] + ';border-bottom:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .typeattack1    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[1] + ';border-top:thick solid ' + col0[1] + ';border-bottom:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .typedefend1    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[1] + ';border-top:thick solid ' + col0[1] + ';border-bottom:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .typebombards1  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[1] + ';border-top:thick solid ' + col0[1] + ';border-right:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .typebombarded1 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[1] + ';border-right:thick solid ' + col0[1] + ';border-bottom:thick solid ' + col0[1] + ';} ' +
                ' #magicmap .typemutualbombard1 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[1] + ';border-right:thick solid ' + col0[1] + ';} ' +

                ' #magicmap .off2    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder2    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[2] + ';border-bottom:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .typeattack2    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[2] + ';border-top:thick solid ' + col0[2] + ';border-bottom:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .typedefend2    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[2] + ';border-top:thick solid ' + col0[2] + ';border-bottom:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .typebombards2  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[2] + ';border-top:thick solid ' + col0[2] + ';border-right:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .typebombarded2 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[2] + ';border-right:thick solid ' + col0[2] + ';border-bottom:thick solid ' + col0[2] + ';} ' +
                ' #magicmap .typemutualbombard2 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[2] + ';border-right:thick solid ' + col0[2] + ';} ' +

                ' #magicmap .off3    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder3    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[3] + ';border-bottom:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .typeattack3    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[3] + ';border-top:thick solid ' + col0[3] + ';border-bottom:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .typedefend3    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[3] + ';border-top:thick solid ' + col0[3] + ';border-bottom:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .typebombards3  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[3] + ';border-top:thick solid ' + col0[3] + ';border-right:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .typebombarded3 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[3] + ';border-right:thick solid ' + col0[3] + ';border-bottom:thick solid ' + col0[3] + ';} ' +
                ' #magicmap .typemutualbombard3 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[3] + ';border-right:thick solid ' + col0[3] + ';} ' +

                ' #magicmap .off4    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder4    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[4] + ';border-bottom:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .typeattack4    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[4] + ';border-top:thick solid ' + col0[4] + ';border-bottom:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .typedefend4    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[4] + ';border-top:thick solid ' + col0[4] + ';border-bottom:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .typebombards4  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[4] + ';border-top:thick solid ' + col0[4] + ';border-right:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .typebombarded4 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[4] + ';border-right:thick solid ' + col0[4] + ';border-bottom:thick solid ' + col0[4] + ';} ' +
                ' #magicmap .typemutualbombard4 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[4] + ';border-right:thick solid ' + col0[4] + ';} ' +

                ' #magicmap .off5    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder5    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[5] + ';border-bottom:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .typeattack5    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[5] + ';border-top:thick solid ' + col0[5] + ';border-bottom:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .typedefend5    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[5] + ';border-top:thick solid ' + col0[5] + ';border-bottom:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .typebombards5  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[5] + ';border-top:thick solid ' + col0[5] + ';border-right:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .typebombarded5 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[5] + ';border-right:thick solid ' + col0[5] + ';border-bottom:thick solid ' + col0[5] + ';} ' +
                ' #magicmap .typemutualbombard5 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[5] + ';border-right:thick solid ' + col0[5] + ';} ' +

                ' #magicmap .off6    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder6    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[6] + ';border-bottom:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .typeattack6    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[6] + ';border-top:thick solid ' + col0[6] + ';border-bottom:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .typedefend6    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[6] + ';border-top:thick solid ' + col0[6] + ';border-bottom:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .typebombards6  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[6] + ';border-top:thick solid ' + col0[6] + ';border-right:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .typebombarded6 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[6] + ';border-right:thick solid ' + col0[6] + ';border-bottom:thick solid ' + col0[6] + ';} ' +
                ' #magicmap .typemutualbombard6 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[6] + ';border-right:thick solid ' + col0[6] + ';} ' +

                ' #magicmap .off7    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder7    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[7] + ';border-bottom:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .typeattack7    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[7] + ';border-top:thick solid ' + col0[7] + ';border-bottom:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .typedefend7    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[7] + ';border-top:thick solid ' + col0[7] + ';border-bottom:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .typebombards7  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[7] + ';border-top:thick solid ' + col0[7] + ';border-right:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .typebombarded7 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[7] + ';border-right:thick solid ' + col0[7] + ';border-bottom:thick solid ' + col0[7] + ';} ' +
                ' #magicmap .typemutualbombard7 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[7] + ';border-right:thick solid ' + col0[7] + ';} ' +

                ' #magicmap .off8    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
                ' #magicmap .typeborder8    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[8] + ';border-bottom:thick solid ' + col0[8] + ';} ' +
                ' #magicmap .typeattack8    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[8] + ';border-top:thick solid ' + col0[8] + ';border-bottom:thick solid ' + col0[8] + ';} ' +
                ' #magicmap .typedefend8    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[8] + ';border-top:thick solid ' + col0[8] + ';border-bottom:thick solid ' + col0[8] + ';} ' +
                ' #magicmap .typebombards8  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[8] + ';border-top:thick solid ' + col0[8] + ';border-right:thick solid ' + col0[8] + ';} ' +
                ' #magicmap .typebombarded8 {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[8] + ';border-right:thick solid ' + col0[8] + ';border-bottom:thick solid ' + col0[8] + ';} ' +
                ' #magicmap .typemutualbombard8 {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[8] + ';border-right:thick solid ' + col0[8] + ';} ' +


                ' .playerBG0 { color: ' + col1[0] + '; } ' +
                ' .playerBG1 { color: ' + col1[1] + '; font-weight: bold} ' +
                ' .playerBG2 { color: ' + col1[2] + '; font-weight: bold} ' +
                ' .playerBG3 { color: ' + col1[3] + '; font-weight: bold} ' +
                ' .playerBG4 { color: ' + col1[4] + '; font-weight: bold} ' +
                ' .playerBG5 { color: ' + col1[5] + '; font-weight: bold} ' +
                ' .playerBG6 { color: ' + col1[6] + '; font-weight: bold} ' +
                ' .playerBG7 { color: ' + col1[7] + '; font-weight: bold} ' +
                ' .playerBG8 { color: ' + col1[8] + '; font-weight: bold} ' +

                ' .playerBGDD0 { background-color: ' + col0[0] + '; } ' +
                ' .playerBGDD1 { background-color: ' + col1[1] + '; } ' +
                ' .playerBGDD2 { background-color: ' + col1[2] + '; } ' +
                ' .playerBGDD3 { background-color: ' + col1[3] + '; } ' +
                ' .playerBGDD4 { background-color: ' + col1[4] + '; } ' +
                ' .playerBGDD5 { background-color: ' + col1[5] + '; } ' +
                ' .playerBGDD6 { background-color: ' + col1[6] + '; } ' +
                ' .playerBGDD7 { background-color: ' + col1[7] + '; } ' +
                ' .playerBGDD8 { background-color: ' + col1[8] + '; } '); 

//    ---- Get Player Names ----
    cc_log("Player IDs");
    playersArray["Neutral"] = new Player("Neutral",NID,pl_Colors[NID]);
   
    pIndxs = getElementsByClassName(rightside,"span","player");
    for( i in pIndxs )
    {
        if( pIndxs[i].innerHTML ) 
        {
            playersArray[pIndxs[i].innerHTML] = new Player(pIndxs[i],++num_players,pl_Colors[i]);
        }
	if (i>7) // create styles for this player. (BR Coding!)
	{
		var num = parseInt(i,10)+1;
		var styl = ' #magicmap .hplayer'+num+'  {  opacity:1.5; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[9] + ';border-bottom:thick solid ' + col0[9] + ';} ' +
				' #magicmap .lplayer'+num+'  {  opacity:0.0; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[9] + ';border-bottom:thick solid ' + col0[9] + ';} ' +
				' #magicmap .iplayer'+num+'  {  opacity:0.8; border:thick solid ' + col0[9] + ';} ' +
				' #magicmap .mplayer'+num+'  {  opacity:0.0; border:thick solid ' + col0[9] + ';} ' +
				' #magicmap .jplayer'+num+'  {  opacity:10.8; border:thick solid  ' + col0[9] + ';} ' +
				' #magicmap .nplayer'+num+'  {  opacity:0.0; border:thick solid ' + col0[9] + ';} ' +
        ' #magicmap .off'+num+'    	 {  opacity:0.0;  border:medium dotted #FFFFFF;} ' +
        ' #magicmap .typeborder'+num+'    {  opacity:10.8; padding-left:4px;padding-right:4px;border-top:thick solid ' + col0[9] + ';border-bottom:thick solid ' + col0[9] + ';} ' +
        ' #magicmap .typeattack'+num+'    {  opacity:10.8; padding-right:4px;border-left:thick solid ' + col0[9] + ';border-top:thick solid ' + col0[9] + ';border-bottom:thick solid ' + col0[9] + ';} ' +
        ' #magicmap .typedefend'+num+'    {  opacity:10.8; padding-left:4px;border-right:thick solid ' + col0[9] + ';border-top:thick solid ' + col0[9] + ';border-bottom:thick solid ' + col0[9] + ';} ' +
        ' #magicmap .typebombards'+num+'  {  opacity:10.8; padding-bottom:4px;border-left:thick solid ' + col0[9] + ';border-top:thick solid ' + col0[9] + ';border-right:thick solid ' + col0[9] + ';} ' +
        ' #magicmap .typebombarded'+num+' {  opacity:10.8; padding-top:4px;border-left:thick solid ' + col0[9] + ';border-right:thick solid ' + col0[9] + ';border-bottom:thick solid ' + col0[9] + ';} ' +
        ' #magicmap .typemutualbombard'+num+' {  opacity:10.8; padding-top:4px;padding-bottom:4px;border-left:thick solid ' + col0[9] + ';border-right:thick solid ' + col0[9] + ';} ' +
				' .playerBG'+num+' { color: ' + col0[9] + '; font-weight: bold} ' +
				' .playerBGDD'+num+' { background-color: ' + col1[9] + '; } ';
		GM_addStyle(styl);
	}
    }

    if (fog) // create extra player for Unknown territories.
    {
			for (name in playersArray)
			{
				UID++;
			}
			playersArray["Unknown"] = new Player("Unknown",UID,pl_Colors[NID]);
    }

    // ID THE MAP
    mapName = unsafeWindow.mapFile;
    mapSize = unsafeWindow.mapResolution;

//    ---- Map Analysis ----
    cc_log("Map Analysis");
    analyseMap();

    cc_log("Starting Request XML");
    GM_xmlhttpRequest({method: 'GET',url: 'http://www.conquerclub.com/maps/'+mapName+'.xml?nocache='+Math.random(),headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3 BOB' , 'Accept': 'application/xml,text/xml'},onload: 
	function(responseDetails) 
	{
		customStartWaiting("Parsing XML");

		cc_log("Received XML response");

		var parser = new DOMParser();
		var dom = parser.parseFromString(responseDetails.responseText,"application/xml");

		smallwidth = dom.getElementsByTagName('smallwidth')[0].textContent.normiliseSpaces();
		smallheight = dom.getElementsByTagName('smallheight')[0].textContent.normiliseSpaces();
		largewidth = dom.getElementsByTagName('largewidth')[0].textContent.normiliseSpaces();
		largeheight = dom.getElementsByTagName('largeheight')[0].textContent.normiliseSpaces();


		if (num_players>8) // make the right hand side scrollable for BR's
		{
			var h = smallheight;
			if (mapSize == "L")
				h = largeheight;

			rightside.style.height = h+"px";
			rightside.style.overflow = "auto";
		}


		var entries = dom.getElementsByTagName('name');

		for (var i = 0; i < entries.length; i++) 
		{
			var parent = entries[i].parentNode;
			comp = parent.getElementsByTagName('components');
			if (comp.length==1)
			{
				bonus = parent.getElementsByTagName('bonus');
				if (bonus.length==1)
					parseContinent(parent);
				else
					parseObjective(parent);
			  
			}
			else
				parseTerritory(parent);
		}

		// get amount of starting positions.
		var entries = dom.getElementsByTagName('position');
		if (entries.length>0) 
		{
			for (var i = 0; i < entries.length; i++) 
			{
				var terrs = entries[i].getElementsByTagName('territory');
				for (var j = 0; j < terrs.length; j++) 
				{
					totalPositionCountries++;
				}
				totalPositions++;
			}
		}

		
		// get minimum reinforcements - defaulted to 3.
		var entries = dom.getElementsByTagName('minreinforcement');
		if (entries.length>0) 
		{
			minimumReinforcements = entries[0].textContent.normiliseSpaces();
		}
		
		// read out the reinforcements matrix.
		var entries = dom.getElementsByTagName('reinforcement');

		for (var i = 0; i < entries.length; i++) 
		{
			lower = entries[i].getElementsByTagName('lower')[0].textContent.normiliseSpaces();
			upper = entries[i].getElementsByTagName('upper')[0].textContent.normiliseSpaces();
			divisor = entries[i].getElementsByTagName('divisor')[0].textContent.normiliseSpaces();
			reinforcementsArray.push(new Reinforcement(lower, upper, divisor));
		}
		cc_log("Parsed XML");


//             -- Calculate Defensive Borders -- 

		for (var cou in countriesArray) 
		{
			var cc = countriesArray[cou];
			// Now update all those places I can attack with my details
			for (var k=0; k < cc._borders.length; k++)
			{
				var bb = countriesArray[cc._borders[k]];
				if (!bb._DefendBorders[cc._name]) 
				{
					bb._DefendBorders.push(cc._name);
				}
			}
			for (var k=0; k < cc._bombards.length; k++)
			{
				var bb = countriesArray[cc._bombards[k]];
				bb._bombardedBy.push(cc._name);
			}
		}

		//Auto Scroll to Game
	    	if( OPTIONS['jumptomap'] )
	    	{
			window.setTimeout(jtm,1000);
		}

		// always create this DIV now - we need it for the mapfade number show...
		var magicMapDiv = document.createElement('div');
		magicMapDiv.id="magicmap";
		magicMapDiv.innerHTML = "";
		map.parentNode.appendChild(magicMapDiv);

		APPLY_MAPFADE(OPTIONS,mapName);

		showMapInspectDiv();

		updatePlayerCards();

		processLog(0, true, true);

		checkElimSummary();

		recalcRedemption();

		updateCountries();

		updateContinents();

		updateObjectives();

		if (OPTIONS["textMapType"] != "Off")
		{
			updateTextmap(true);
		}

		createStats(true);

		APPLY_TEXTMAP(myOptions);

		APPLY_STATS(myOptions);

		updateMagicMap(false);

		colourCodeDD();

		updateMenuHiderHeight();

    		if (OPTIONS["floatActions"] == "On")
    		{
			setFormWidth();
		}

		checkForUpdate();

	   if (showDeleteAll)
	   {
		showDeleteSnapshots();
	   }

	stopWaiting();
    cc_log("Done after request");          
    }}); // END Map Get response Function

    cc_log("Done Outside request");



    cc_log("Building the Settings Menu");          
    createGameMenu();
    
    prepareMenuHider();

     cc_log("Checking for previous versions");
    
    var hrs = document.getElementById('hrs'); // Tr0y's & roberts mods
    var bhrs = document.getElementById('bhrs'); // BOB
    if (hrs ) {
        alert("You are currently running more than one Conquer Club Greasemonkey script. This causes unpredictable results/errors. It is recommended that you disable the 'Conquer Club' and/or 'Conquer Club - Roberts Mods' scripts leaving only this script 'Conquer Club - BOB' enabled.\n\n To do this right click on the Greasemonkey icon and untick the redundant scripts, then press F5 to refresh the page." );
    }
    

	/* Ishiro's Confirm Commands code */
	var newsendRequest = unsafeWindow.sendRequest;
	unsafeWindow.sendRequest = function(command) {
    /* ---    Confirmation Popups --- */
      if (((command == 'End Attacks' || command == 'End Fortification' || (command == 'Fortify' && !(dashboard.innerHTML.indexOf("Unlimited") > -1))) && myOptions['confirmEnds']) || (command == 'Auto-Attack' && myOptions['confirmAutoAttack']) || (command == 'Deploy' && myOptions['confirmDeploy']))
      {
        var message = command;
      	if (command == "Fortify") // if the command is fortify - then we are actually doing an "end fort" so modify the message.
      		message = "End Fortification";
         if (confirm("Are you sure you wish to "+message+"?"))
         {
            return newsendRequest(command);
         }
         else {
            return false;
         }
      }
      else {
         return newsendRequest(command);
      }
   }

   updateMenuHiderHeight();

} // End GAME Processing

// upgrade refreshGMScript with new version.
unsafeWindow.refreshGMScript = function(armiesArray, date)
{
	var response = unsafeWindow.request.responseText.split("&");
	if (response.length > 2) 
	{ 
		if (response[16]=='Y')
		{
			downloadedLog = ""; // if full log clicked - blat downloaded log
			logLength=0;
		}
	}


	var innermap = document.getElementById('inner-map');
	if (!date)
	{
		removePointer();
		innermap.src = "map.php?key="+unsafeWindow.mapKey;
	}
	colourblind = unsafeWindow.colourblind;
	map = unsafeWindow.gameOuterMap;
	mapSize = unsafeWindow.mapResolution;
	processLog(logFixed, false, false, date);
  	if (myOptions["floatActions"] == "On") // only change the form width if HUD is on.
    	{
		setFormWidth();
	}
	checkFloatDice();
	checkElimSummary();
	reinitClock(); // call to ensure clock is correct.
	recalcRedemption();
	updatePlayerCards();
	analyseMap(armiesArray); // reread the armies array back into the players array...
	updateCountries();
	updateContinents();
	updateObjectives();
	createStats(false);
	if (myOptions["textMapType"] != "Off")
	{
		updateTextmap(false);
	}
	APPLY_TEXTMAP(myOptions);
	APPLY_STATS(myOptions);
	updateMagicMap(false);
	colourCodeDD();
	updateMenuHiderHeight();
	stopWaiting();
	return true;
}

// global vars so refresh function still has scope on them.
var armiesArr;
var playersArray = new Array();
var countriesArray = new Array();
var continentsArray = new Array();
var objectivesArray = new Array();
var reinforcementsArray = new Array();

var logFixed;

// Run init on first load.
var theGame = new gm_ConquerClubGame(myOptions);