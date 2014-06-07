// ==UserScript==
// @name           Google Header Links
// @namespace      http://tapuri.org
// @include        http://*.google.com/*
// ==/UserScript==


var strScriptName = 'Google Header Links';
var strScriptNumber = '30388';

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


if(window.location.href.indexOf('q=') != -1)
{
	var strSearchParseURL = 'q=';
	var strSearchPhraseTermString = '&';
	var strSearchString = '';

	var strDemonoidSearchURL = 'http://www.demonoid.com/files/?sort=S&query=';
	var strWikipediaSearchURL = 'http://en.wikipedia.org/wiki/Special:Search?go=Go&search=';
	var strRottenTomatoesSearchURL = 'http://www.rottentomatoes.com/search/full_search.php?search=';

	var intIndexOfStart = window.location.href.indexOf(strSearchParseURL) + strSearchParseURL.length;
	var intIndexOfStop = window.location.href.indexOf(strSearchPhraseTermString, intIndexOfStart + 1);

	if (intIndexOfStop <= intIndexOfStart)
	{
		intIndexOfStop = window.location.href.length;
	}

	strSearchString = window.location.href.substring(intIndexOfStart, intIndexOfStop);

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


	function buildRottenTomatoesLink(strQuery, strColor, strAElementText)
	{
		var strReturn = '<a href="' + strRottenTomatoesSearchURL + strQuery + '" ' + strAElementText + '>';
		if (strColor != "")
		{
			strReturn += '<span style="color:' + strColor + ';font-style:bold">';
		}
		strReturn += 'RottenTomatoes';
		if (strColor != "")
		{
			strReturn += '</span>';
		}
		strReturn += '</a>';

		return strReturn;
	}


	function buildWikipediaLink(strQuery, strColor, strAElementText)
	{
		var strReturn = '<a href="' + strWikipediaSearchURL + strQuery + '" ' + strAElementText + '>';
		if (strColor != "")
		{
			strReturn += '<span style="color:' + strColor + ';font-style:bold">';
		}
		strReturn += 'Wikipedia';
		if (strColor != "")
		{
			strReturn += '</span>';
		}
		strReturn += '</a>';

		return strReturn;
	}



	var lastLink = 1;

	var elsALinks = document.getElementsByTagName('a');
	for (var a = 0; a < elsALinks.length; a++)
	{
		if(elsALinks[a].getAttribute("class") == "gb1")
		{
			lastLink = elsALinks[a];
		}
		else if(elsALinks[a].getAttribute("class") == "gb3")
		{
			break;
		}
	}

	if (lastLink != 1)
	{
		spanNew = document.createElement('span');
		spanNew.innerHTML = buildRottenTomatoesLink(strSearchString, '', 'class="gb1"');
		lastLink.parentNode.insertBefore(spanNew,lastLink.nextSibling);

		spanNew = document.createElement('span');
		spanNew.innerHTML = buildWikipediaLink(strSearchString, '', 'class="gb1"');
		lastLink.parentNode.insertBefore(spanNew,lastLink.nextSibling);

		var spanNew = document.createElement('span');
		spanNew.innerHTML = buildDemonoidLink(strSearchString, '', 'class="gb1"');
		lastLink.parentNode.insertBefore(spanNew,lastLink.nextSibling);
	}
}