// ==UserScript==
// @name           ConquerStats - ScoreCharts
// @namespace      cspare.ConquerStats.ScoreCharts
// @include       http://*.conquerclub.com/forum/memberlist.php?mode=viewprofile&u=*
// ==/UserScript==

var xmlGameHistory;
var UserId;

var chartWidth = 650;
var scoreLog, scoreDeltaLog, timeLog;
var encodedChartDataX, encodedChartDataY;
var maxScore = 1000, minScore = 1000, maxTime, minTime;
var promotionMarkers = new Array();
var simpleEncoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.';
var debugnfo;

function getGameHistoryPage(userid, page, callback)
{
	var url = "http://www.conquerclub.com/api.php?mode=gamelist&p1=" + userid + "&gs=F&events=Y&page=" + page;
	
	var req = new XMLHttpRequest();
	req.open('GET', url, true);
	req.onreadystatechange = function (aEvt) {
	  if (req.readyState == 4) {
		 if(req.status == 200)
		  callback(page, req.responseXML);
		 else
		  alert('Error requesting game history.');
	  }
	};
	req.send(null);
}

function getGameHistory(userid, callback)
{
	getGameHistoryPage(userid, 1, function(page, result)
	{
		xmlData = result;
		
		var pagesReceived = 1;
		var pageCount = getPageCount(xmlData);
		
		var arrGameHistory = new Array(pageCount);
		
		arrGameHistory[page -1] = xmlData;
		
		if (pagesReceived == pageCount)
		{
				callback(arrGameHistory);
		}
				
		for (var i = 1; i < pageCount; i++)
		{
			getGameHistoryPage(userid, i + 1, function(page2, result2)
			{
				arrGameHistory[page2 - 1] = result2;
				pagesReceived++;
				
				if (pagesReceived == pageCount)
				{
					callback(arrGameHistory);
				}
			});
		}
		
		
	});
}

function getPageCount(xmlData)
{
	var nsResolver = xmlData.createNSResolver( xmlData.ownerDocument == null ? xmlData.documentElement : xmlData.ownerDocument.documentElement);

	var pageCountIterator = xmlData.evaluate('/api/page/text()', xmlData, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var pageContent = pageCountIterator.snapshotItem(0).textContent;

	
	var qryPageCount = /\d+ of (\d+)/i
	var pageCount = qryPageCount.exec(pageContent);
	
	return pageCount[1];
}

function getGameCount(xmlData)
{
	var nsResolver = xmlData.createNSResolver( xmlData.ownerDocument == null ? xmlData.documentElement : xmlData.ownerDocument.documentElement);

	var gameCountIterator = xmlData.evaluate('/api/games/@total', xmlData, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var gameCount = gameCountIterator.snapshotItem(0).textContent;
	
	return gameCountIterator.snapshotItem(0).textContent

}

function parseGameHistory()
{

	var xmlData = xmlGameHistory[0];

	var nsResolver = xmlData.createNSResolver( xmlData.ownerDocument == null ? xmlData.documentElement : xmlGameHistory.ownerDocument.documentElement);

	var gameCount = getGameCount(xmlData);

	scoreDeltaLog = new Array();
	timeLog = new Array();
	var currentScore = 1000;
	
	for (var xmlPage = 0; xmlPage < xmlGameHistory.length; xmlPage++)
	{
		var xmlData = xmlGameHistory[xmlPage];
		var nsResolver = xmlData.createNSResolver( xmlData.ownerDocument == null ? xmlData.documentElement : xmlGameHistory.ownerDocument.documentElement);

		var eventItem;
		var eventIterator = xmlData.evaluate('/api/games/game/events/event[starts-with(.,count(../../players/player[following-sibling::player|.='+UserId+']))]', xmlData, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var eventNumber = 0; eventItem = eventIterator.snapshotItem(eventNumber); eventNumber++) 
		{
			var qryPoints = /\d+ (loses|gains) (\d+) points/i;
			var points = qryPoints.exec(eventItem.textContent);
			if (points != null)
			{
				var newScore = points[2];
				if (points[1] == 'loses')
				{
					newScore *= -1;
				}

				scoreDeltaLog.push(parseInt(newScore));
	
				var timeIterator =  xmlData.evaluate('@timestamp', eventItem, nsResolver, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var timeStampVal = timeIterator.snapshotItem(0);
				if (timeStampVal != null)
				{		
					timeLog.push(Math.round(parseInt(timeIterator.snapshotItem(0).textContent) / 86400));
				}
			}


		}


			
	}

}

function SortGames()
{
	for(var j = 0; j < timeLog.length - 1; j++)
	{
		for(var i = 0; i < timeLog.length - 1; i++)
		{
			if (timeLog[i] > timeLog[i + 1])
			{
				SwapGames(i, i+1);
			}
		}
	}
}

function SwapGames(from, to)
{
	var tempTime = timeLog[to];
	var tempScore = scoreDeltaLog[to];
	
	timeLog[to] = timeLog[from];
	scoreDeltaLog[to] = scoreDeltaLog[from];
	
	timeLog[from] = tempTime;
	scoreDeltaLog[from] = tempScore;
}
 
 function ScaleData(chartWidth)
 {
	var pixelsPerDataPoint = 5;
	var dataPoints = Math.round(chartWidth / pixelsPerDataPoint);
	if (dataPoints > scoreDeltaLog.length) 
	{
		dataPoints = scoreDeltaLog.length;
		pixelsPerDataPoint = Math.round(chartWidth / dataPoints);
	}
	var gamesPerDataPoint = Math.floor(scoreDeltaLog.length / dataPoints);
	if (gamesPerDataPoint < 1) 
	{
		gamesPerDataPoint = 1;	
	}
	var score = 1000;

	SortGames();
	
	scoreLog = new Array(dataPoints);	
	
	for(var dataPoint = 0; dataPoint < dataPoints; dataPoint++)
	{
		for (var gameNr = dataPoint * gamesPerDataPoint; gameNr < (dataPoint + 1) * gamesPerDataPoint; gameNr++)
		{
			score += scoreDeltaLog[gameNr];

			if (score > maxScore)
				maxScore = score;
			if (score < minScore)
				minScore = score;
		}
		
		scoreLog[dataPoint] = score;
	}
	
	// Last data point
	for(var gameNr = dataPoints * gamesPerDataPoint ; gameNr < scoreDeltaLog.length; gameNr++)
	{
		score += scoreDeltaLog[gameNr];
		
		if (score > maxScore)
			maxScore = score;
		if (score < minScore)
			minScore = score;
	}
	
	scoreLog[dataPoints - 1] = score;
 }
 
 
function simpleEncode(valueArray,minValue,maxValue)
{
	var chartData = [''];
	for (var i = 0; i < valueArray.length; i++)
	{
		var currentValue = (valueArray[i] - minValue);
		if (!isNaN(currentValue) && currentValue >= 0)
		{
			currentValue = Math.round((currentValue * 4095) / (maxValue - minValue));

			chartData.push(simpleEncoding.charAt(Math.round(Math.floor(currentValue / 64))) + simpleEncoding.charAt(Math.round((currentValue) % 64)) );
			//debugnfo += '-' + valueArray[i] + ' -> ' + currentValue + ' -> ' + Math.round(Math.floor(constant * currentValue / 64)) + ", "+ Math.round((constant * currentValue) % 64) + " = " + simpleEncoding.charAt(Math.round(Math.floor(constant * currentValue / 64))) + simpleEncoding.charAt(Math.round((constant * currentValue) % 64)) + '<br/>';
		}
		else
		{
			chartData.push('__');
			alert(i + 'Error: val :'+currentValue);
			break;
		} 
	}
  
	return chartData.join('');
}

function GetUserId()
{
	var qryUserId = /&u=(\d+)($|&)/i;
	var userIdIterator = qryUserId.exec(window.location.search);
	return userIdIterator[1];
}

function DrawUI()
{
	var divWall = document.getElementById('wall');
	var divChart = document.createElement('div');

	divChart.id = "Graph1";
	divChart.className = "panel bg2";

	divWall.parentNode.insertBefore(divChart, divWall);
	
	
	divChart.innerHTML = "<div class=\"inner\"><span class=\"corners-top\"><span></span></span>";
	divChart.innerHTML += "<h3>ConquerStats</h3>";

	//divChart.innerHTML += "<img width=\"500\" height=\"200\" id=\"scoreChart\" src=\"http://chart.apis.google.com/chart?chs=500x200&chd=e:" +encodedChartDataX + "&cht=lc&chco=FF0000&chf=bg,s,E9EBE8&chtt=Score flow&chxt=x,y&chxl=0:|"+startDateString+"|"+endDateString+"|1:|"+minScore+"|"+maxScore+"\" alt=\"Score chart\" />";
	divChart.innerHTML += "<div id=\"chartContent\" height=\"200\" style=\"width: 100%; height: 200px;\">Loading chart...</div>";



	divChart.innerHTML += "<span class=\"corners-bottom\"><span></span></span>";
}

function UpdateUI()
{
	var divChartContent = document.getElementById('chartContent');
	var startDateString, endDateString;
	var markers = "";

	startDateString = "First game";
	endDateString = "Last game";
		
	divChartContent.innerHTML = "<img width=\""+chartWidth+"\" height=\"200\" id=\"scoreChart\" src=\"http://chart.apis.google.com/chart?chs="+chartWidth+"x200&chd=e:" +encodedChartDataX + "&cht=lc&chco=FF0000&chf=bg,s,E9EBE8&chtt=Score flow&chxt=x,y&chxl=0:|"+startDateString+"|"+endDateString+"|1:|"+minScore+"|"+maxScore+"\" alt=\"Score chart\" />";

//	var rangeMarkerHeight = Math.round((1100 - minScore) / (maxScore - minScore) * 100) / 100;

/* Debugging:
	for (var o = 0; o < timeLog.length; o++)
{
	divChart.innerHTML += o + '. ' + (timeLog[o]) + ',' + (scoreLog[o] - minScore) + '<br/>';
}
divChart.innerHTML += "<hr/>" + debugnfo;
*/


}


function calcScoreLog()
{
	var score = 1000, previousScore = 1000;

	SortGames();
	
	for(var i = 0; i < scoreDeltaLog.length; i++)
	{
		score += scoreDeltaLog[i];
		scoreLog[i] = score;

		previousScore = score;
	}
}

function CheckForPromotion(previousScore, newScore)
{
		if ( newScore >= 1100 && previousScore < 1100 )
		{
			var pos = Math.round((1100 - previousScore) / (newScore - previousScore) * 10) / 10;
			
			return pos;
		}
		return null;
}

function GenerateChartData()
{

	var maxChartScore = Math.max.apply({}, scoreLog);
	var minChartScore = Math.min.apply({}, scoreLog);
	maxTime =  Math.max.apply({}, timeLog);
	minTime =  Math.min.apply({}, timeLog);

	if (maxScore < 1000) maxScore = 1000;

	encodedChartDataX = simpleEncode(scoreLog, minChartScore, maxChartScore);

}

function Init()
{
	DrawUI();

	var divChartContent = document.getElementById('chartContent')
	if (divChartContent.offsetWidth > chartWidth)
	{
		chartWidth = divChartContent.offsetWidth;
	}
	if (chartWidth > 1000) 
	{ // Max allowed by Google charts.
		chartWidth = 1000;
	}

	
	UserId = GetUserId();

	getGameHistory(UserId, function(result) {
		xmlGameHistory = result;
		
		parseGameHistory();
		
		ScaleData(chartWidth);

		GenerateChartData();

		UpdateUI();
	
	});

}

Init();