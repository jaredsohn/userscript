// ==UserScript==
// @name		Last.fm Greasemonkey Group Updates to Homepage
// @namespace	http://straylight.cz/userscripts/
// @description	Gets the date of the last post to the Greasemonkeys News and Script Updates forum thread and displays it on your Last.fm homepage. Based on 'Get Reply Date' by snyde1, edited by syntax_error.
// @version		0.2
// @date		2008-07-20
// @include		http://www.last.fm/home/
// @include		http://www.last.fm/home
// ==/UserScript==
// 
// Changelog
// 0.2 (2008-07-20): Minor fix: clicking on link now handles middle click
// 0.1 (2008-07-19): Initial public release.
//
// Known Issues
// * There is a (quite long) delay before the notice is displayed
//

var hideOnVisited = true;
var msgTitle = new RegExp(/>Greasemonkeys News and Script Updates<\/a>/);

function xpath(query)
{
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function insertUpdate(url, date)
{
	if(GM_getValue('lastVisited') == date && hideOnVisited == true)
		return;

	var column = document.getElementsByClassName('rightCol')[0]
	var columnChild = column.getElementsByTagName('h2')[0];
		// On problems, change 'h2' to any element '*'

	var div = document.createElement('div');
	div.setAttribute('style', 'font-size: 1.2em; margin: 10px 0 30px');
	div.innerHTML = '<strong>Greasemonkey Update:</strong>\n';
	
	var link = document.createElement('a');
	
	link.setAttribute('href', url);
	link.textContent = date;
	link.addEventListener('mouseup',
		function(e)
		{
			if(e.button == 0 || e.button == 1) // Only left and middle button
				GM_setValue('lastVisited', date)
				//GM_log(e.button);
		},
	false);
	
	div.appendChild(link);
	
	column.insertBefore(div, columnChild);
}

(function() {
	var latestText, latestPost;
	var theURL="http://www.last.fm/group/Greasemonkeys/forum";
	GM_xmlhttpRequest({
		method: "GET",
		url: theURL,
		onload: function(responseDetails)
		{
			var xmlText = responseDetails["responseText"];
			xmlText = xmlText.replace(/\&nbsp;/ig, '');
			var regexp = /(<td[^>]*class="subject")[^>]*>/g;
			xmlText = xmlText.replace(regexp, "$1>");
			if (!xmlText)
			{
				return;
			}
			if(xmlText.match(/forumtable/i))
			{
				xmlText = xmlText.split(/<table cellpadding="0" cellspacing="0" class="forumtable" width="100%">/)[1];
				xmlText = xmlText.split(/<\/table>/i)[0];
				theURLmod = theURL.replace(/\//g,".");
				theURLmod = theURL.replace(/http:..www.last.fm/i,"");
				theURLmod = theURLmod.replace(/\+/g,".");
				var dateRegex = new RegExp('<small><a href="'+theURLmod+'([^"]*)">([^<]*)<',"i");
				var timeEx = new RegExp('>(.+)<');
				var msgsTimes = xmlText.split(/<\/tr>/i);
				var textText, myAText;
				for (var k=0; k<msgsTimes.length; k++)
				{
					msgsTimes[k] = msgsTimes[k] + "";
					textText = msgsTimes[k].match(msgTitle);
					if (textText != null)
					{
						textText = msgsTimes[k].match(dateRegex)[1];
						textText = textText + "";
						myAText = msgsTimes[k].match(dateRegex)[2];
						currDate = Date.parse(myAText);
						insertUpdate(theURL+textText, myAText);
						break;
					}
				}
			}
		}
		});
})();
