// ==UserScript==
// @name           Newgrounds submission stats
// @namespace      http://michhimself.com
// @description    Shows a box with overall submissions statistics
// @include        http://*.newgrounds.com/audio/
// @include        http://*.newgrounds.com/flash/
// ==/UserScript==
if (document.getElementById('rightcol'))
{
	var OverallInfo = new Array;
	var RightCol = document.getElementById('rightcol');
	var Alldivs = RightCol.getElementsByTagName('div');
	var YearDivs = getElementsByClass(Alldivs, 'box title twothird');
	var OverallSubsCount = 0;
	var AverageSubsAYear = 0;
	var YearNames = [];
	var SubsAYear = [];
	var NumberOfYears = YearDivs.length;
	if (NumberOfYears!=0)
	{	
		for (a=0; a<NumberOfYears; a++)
		{
			YearNames[a]			= YearDivs[a].getElementsByTagName('h3')[0].innerHTML.substr(0,4);	
			SubsAYear[a]			= parseInt(YearDivs[a].getElementsByTagName('h3')[0].innerHTML.substr(18));		
			OverallSubsCount +=	SubsAYear[a];
		}
		AverageSubsAYear = myRound((OverallSubsCount / NumberOfYears),2);
		theSpans = getElementsByClass(RightCol.getElementsByTagName('span'), 'fsub');
		var theScores = [];
		for (a=0; a<theSpans.length; a++)
		{
			if (theSpans[a].innerHTML.indexOf('Current Score')>-1)
			{
				theScores.push(parseFloat(theSpans[a].innerHTML.substr(theSpans[a].innerHTML.indexOf('</span>')+8)));
			}
		}
		var TotScore=0;
		for (a=0; a<theScores.length; a++)
		{
			TotScore += theScores[a];
		}
		var AvgScore = myRound((TotScore/theScores.length), 2);
		TheStatsBox='<div id="substatsbox" class="box title twothird"><div class="boxtop"><div></div></div><div class="boxl"><div class="boxr"><div class="boxm"><div class="headsizer"><div class="heading">	<h3 class="i-article">Submission statistics</h3></div></div><div style="font-size: 1.2em">Submission count: <span style="color:#FFCC00;font-weight:bold;font-style:italic">' + OverallSubsCount + '</span><br />Average submissions per year: <span style="color:#FFCC00;font-weight:bold;font-style:italic">' + AverageSubsAYear + '</span><br />Overall average submission score: <span style="color:#FFCC00;font-weight:bold;font-style:italic">' + AvgScore+'</span></div></div></div></div><div class="boxbot"><div></div></div></div>';
		RightCol.innerHTML = TheStatsBox + RightCol.innerHTML;	
	}
}
function myRound(theValue, Digits)
{
	var a = theValue * Math.pow(10, Digits);
	var b = Math.round(a);
	var c = (b / Math.pow(10, Digits));
	return c;
}
function getElementsByClass(fdivlist, fclassname)
{
	myReturn = [];	
	for (a=0; a<fdivlist.length; a++)
	{
		if (fdivlist[a].className == fclassname)
		{
			myReturn.push(fdivlist[a]);			
		}
	}
	return myReturn;
}