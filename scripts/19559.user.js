// ==UserScript==
// @name           Weewar Tournament Watcher
// @namespace      plutosforge.com
// @description    tells you when there has been activity in a game
// @include        http://www.weewar.info/weewar/show/Inaugural+Tournament+Bracket*
// ==/UserScript==

var tableCells = document.getElementById('bracket').getElementsByTagName('td');

for(var i = 0; i < tableCells.length; i++)
{	
	if(tableCells[i].innerHTML.indexOf('http') > -1)
	{
		var gameURL = tableCells[i].childNodes[1].href;
		var gameId = gameURL.substr(gameURL.lastIndexOf('/')+1);
		getRounds(i,gameId);
	}
} 

function getRounds(i,id)
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'http://weewar.com/api1/game/' + id,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
			'Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: function(responseDetails)
		{
			var parser = new DOMParser();
			var dom = parser.parseFromString(responseDetails.responseText,"application/xml");
			var gameRoundKey = "cell_" + i;
			var oldRounds = GM_getValue(gameRoundKey,-1);
			var rounds = dom.getElementsByTagName('round')[0].textContent;
			if(rounds != oldRounds) tableCells[i].childNodes[1].textContent += " (" + rounds + "*)";
			else  tableCells[i].childNodes[1].textContent += " (" + rounds + ")";
			GM_setValue(gameRoundKey,rounds);
		}
	});
}