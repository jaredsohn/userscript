// ==UserScript==
// @name           Newgrounds search results filter
// @namespace      http://scripts.namdx1987.org/
// @description    Filter the search results
// @include        http://www.newgrounds.com/*/search/*
// @version        1.0
// ==/UserScript==
window=unsafeWindow;
document=window.document;

function search(path, element)
{
	if(!element)
		element=document.body;
	
	var result=[];
	var pathResult = document.evaluate(path, element, null, 7, null);
	
	for (var i = 0; i < pathResult.snapshotLength; i++)
		result.push(pathResult.snapshotItem(i));
		
	return result;
}
//var log=window.console.log;

function changeScore()
{
	var score=5.0;
	try {
		var currentScore=GM_getValue("score");
		if (!currentScore) 
		{
			GM_setValue("score", score.toString());
			currentScore=score;
		}
		
		var scorestr=prompt("Enter new filter score (currently "+currentScore+")");
		score=parseFloat(scorestr);
		GM_setValue("score", scorestr);
	}
	catch(exc)
	{
		alert("Sorry, that was not a valid score");
	}
	
	return score;
}

try {
	var score = parseFloat(GM_getValue("score"));
}
catch(exc)
{
	score=changeScore();
}
GM_registerMenuCommand("Change filter score", changeScore, "c", "shift alt");

var rows = search("//table[@class='searchlist']//tr");
	
for (var i = 1; i < rows.length; i++) {
	var r = rows[i];
	var sp = search(".//span[@class='yellow']", r)[0];
	var currentScore = parseFloat(sp.textContent);
	if (currentScore < score) 
		r.style.display = "none";
}

