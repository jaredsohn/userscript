// ==UserScript==
// @name           Torrent Crosslink - Demonoid/IsoHunt/BTJunkie
// @namespace      tapuri.org
// @include        http://isohunt.com/torrents/*
// @include        http://www.demonoid.com/files/?*
// @include        http://btjunkie.org/search?*
// ==/UserScript==


var strScriptName = 'Torrent Crosslink - Demonoid/IsoHunt/BTJunkie';
var strScriptNumber = '30161';

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



var blnOnIsohunt = false;
var blnOnDemonoid = false;
var blnOnBtjunkie = false;

var strSearchParseURL = '';
var strSearchPhraseTermString = '';
var strSearchString = '';

var strIsohuntSearchURL = 'http://isohunt.com/torrents/?ihq=';
var strDemonoidSearchURL = 'http://www.demonoid.com/files/?sort=S&query=';
var strBtjunkieSearchURL = 'http://btjunkie.org/search?f=1&q=';


if (window.location.href.indexOf("http://isohunt.com/torrents/?") == 0)
{
	blnOnIsohunt = true;
	strSearchParseURL = 'ihq=';
	strSearchPhraseTermString = '&';
}
else if (window.location.href.indexOf("http://isohunt.com/torrents/") == 0)
{
	blnOnIsohunt = true;
	strSearchParseURL = 'torrents/';
	strSearchPhraseTermString = '?';
}
else if (window.location.href.indexOf("http://www.demonoid.com/files/?") == 0)
{
	blnOnDemonoid = true;
	strSearchParseURL = 'query=';
	strSearchPhraseTermString = '&';
}
else if (window.location.href.indexOf("http://btjunkie.org/search?") == 0)
{
	blnOnBtjunkie = true;
	strSearchParseURL = 'q=';
	strSearchPhraseTermString = '&';
}


var intIndexOfStart = window.location.href.indexOf(strSearchParseURL) + strSearchParseURL.length;
var intIndexOfStop = window.location.href.indexOf(strSearchPhraseTermString, intIndexOfStart + 1);

if (intIndexOfStop <= intIndexOfStart)
{
	intIndexOfStop = window.location.href.length;
}

strSearchString = window.location.href.substring(intIndexOfStart, intIndexOfStop);

function buildIsoHuntLink(strQuery, strColor, strAElementText)
{
	var strReturn = '<a href="' + strIsohuntSearchURL + strQuery + '" ' + strAElementText + '>';
	if (strColor != "")
	{
		strReturn += '<span style="color:' + strColor + ';font-style:bold">';
	}
	strReturn += 'IsoHunt';
	if (strColor != "")
	{
		strReturn += '</span>';
	}
	strReturn += '</a>';
	
	return strReturn;
}


function buildDemonoidLink(strQuery, strColor, strAElementText)
{
	var strReturn = '<a href="' + strDemonoidSearchURL + strQuery + '" ' + strAElementText + '>';
	if (strColor != "")
	{
		strReturn += '<span style="color:' + strColor + ';font-style:bold">';
	}
	strReturn += 'Demonoid';
	if (strColor != "")
	{
		strReturn += '</span>';
	}
	strReturn += '</a>';
	
	return strReturn;
}


function buildBTJunkieLink(strQuery, strColor, strAElementText)
{
	var strReturn = '<a href="' + strBtjunkieSearchURL + strQuery + '" ' + strAElementText + '>';
	if (strColor != "")
	{
		strReturn += '<span style="color:' + strColor + ';font-style:bold">';
	}
	strReturn += 'BTJunkie';
	if (strColor != "")
	{
		strReturn += '</span>';
	}
	strReturn += '</a>';
	
	return strReturn;
}




if (blnOnIsohunt == true)
{
	var elsTD = document.getElementsByTagName('td');
	for (var a = 0; a < elsTD.length; a++)
	{
		if(elsTD[a].getAttribute("class") == "ihLogo")
		{
			elsTD[a].width = '60%';
			elsTD[a].parentNode.getElementsByTagName('td')[0].width= '40%';
			
			elsTD[a].getElementsByTagName('table')[0].getElementsByTagName('table')[0].width='420';
			break;
		}
	}
	
	var navUL = document.getElementById('nav');
	
	navUL.innerHTML = '<li>Searches<ul><li>' + buildDemonoidLink(strSearchString, '', ' class="blocked_wht"') + '</li>' +
				'<li>' + buildBTJunkieLink(strSearchString, '', ' class="blocked_wht"') + '</li></ul></li>' +
				navUL.innerHTML;
}
else if (blnOnDemonoid == true)
{
	var elsTDs = document.getElementsByTagName('td');
	for (var a = 0; a < elsTDs.length; a++)
	{
		if(elsTDs[a].getAttribute("class") == "main_content")
		{
			elsTDs[a].getElementsByTagName("tr")[0].getElementsByTagName("tr")[0].innerHTML +=
				'<td class="menu_item">' + buildIsoHuntLink(strSearchString, '', ' class="menu_item_link"') + '</td>' + 
				'<td class="menu_separator"><img src="/images/p.gif" height="1" width="9"></td>' + 
				'<td class="menu_item">' + buildBTJunkieLink(strSearchString, '', ' class="menu_item_link"') + '</td>' + 
				'<td class="menu_separator"><img src="/images/p.gif" height="1" width="9"></td>';
		}
	}
}
else if (blnOnBtjunkie == true)
{
	var elsTable = document.getElementsByTagName('table');
	for (var a = 0; a < elsTable.length; a++)
	{
		if(elsTable[a].getAttribute("class") == "headertext")
		{
			elsTable[a].width = '750';

			var thInsertBefore = elsTable[a].getElementsByTagName('tr')[1].getElementsByTagName('th')[1];
			var thSplitLine = elsTable[a].getElementsByTagName('tr')[1].getElementsByTagName('th')[2].cloneNode(true);

			var thDemonoid = document.createElement('th');
			thDemonoid.align = 'center';
			thDemonoid.width = '16%';
			thDemonoid.innerHTML = buildDemonoidLink(strSearchString, '', ' class="blocked_wht"');

			var thIsohunt = document.createElement('th');
			thIsohunt.align = 'center';
			thIsohunt.width = '16%';
			thIsohunt.innerHTML = buildIsoHuntLink(strSearchString, '', ' class="blocked_wht"');

			elsTable[a].getElementsByTagName('tr')[1].insertBefore(thDemonoid,thInsertBefore.nextSibling);
			elsTable[a].getElementsByTagName('tr')[1].insertBefore(thSplitLine,thInsertBefore.nextSibling);

			thSplitLine = elsTable[a].getElementsByTagName('tr')[1].getElementsByTagName('th')[2].cloneNode(true);

			elsTable[a].getElementsByTagName('tr')[1].insertBefore(thIsohunt,thInsertBefore.nextSibling);
			elsTable[a].getElementsByTagName('tr')[1].insertBefore(thSplitLine,thInsertBefore.nextSibling);
			
			thSplitLine = elsTable[a].getElementsByTagName('tr')[1].getElementsByTagName('th')[2].cloneNode(true);
			break;
		}
	}
}