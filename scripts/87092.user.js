// ==UserScript==
// @name           Yahoo Fantasy Football Add Avg Stats
// @namespace      www.yahoo.com
// @include        http://football.fantasysports.yahoo.com/*
// @description    Add avg fantasy points per game to My Team and Players pages
// @author         bbates
// $LastChangedDate: 2010-09-30
// ==/UserScript==
//I'll add comments soon hopefully so I know what is going on here in the future...
var version = "1.1";

Date.prototype.getWeek = function() {
var onejan = new Date(this.getFullYear(),0,1);
return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()-1)/7);
} 
var thisYear = 1900 + new Date().getYear();
var lastYear = thisYear - 1;
var twoYearsPast = lastYear - 1;
	
if (version != GM_getValue("version", ""))
{
	GM_setValue("playerGames - " + twoYearsPast, "");
	GM_setValue("playerGames - " + lastYear, "");
	GM_setValue("playerGames - " + thisYear, "");
	GM_setValue("version", version);
}

var today = new Date();
var weekno = today.getWeek();
var d = new Date();
var dayno =d.getDay();

if (dayno == 1){
	weekno = weekno + "-1";
	}

var selectedYear = thisYear;
if (document.URL.match(lastYear)){
	selectedYear = lastYear;
	weekno = -1;
}
else if (document.URL.match(twoYearsPast)){
	selectedYear = twoYearsPast;
	weekno = -1;
}

var playerStr = GM_getValue("playerGames - " + selectedYear, "");

var selected = document.evaluate("//div[@id='statsubnav']//li[contains(@class,'selected')]/*", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if ( selected.snapshotLength == 0 ){
  var mySelected = "";
}
else{
	var mySelected = selected.snapshotItem(0).innerHTML;
}

if ((mySelected.match( /\d\d\d\d-\d\d/gi )) || document.URL.match(/players$|&stat1=S_S[^P]|playersearch$/))
{
	var	ad = document.getElementById('yspsub');
	ad.setAttribute("style","visibility: hidden");

	var	tables = document.getElementsByTagName('table');
	for (mytable in tables){
		currTable = tables[mytable];
		if (currTable.id && currTable.id.match(/statTable/i)){
			addHeading(currTable, currTable.rows[0].cells.length - 1, currTable.rows[0].cells.length - 1)
			for (row = 2; row<currTable.rows.length; row++)
			{
				var getPage = 0;
				for (cell = 0; cell<currTable.rows[row].cells.length; cell++){
					if (currTable.rows[row].cells[cell].innerHTML.match(/class="name"/)){
						var playerHTML = (currTable.rows[row].cells[cell].innerHTML.replace( /<div.*href="|" target=.*|\/news/gi, "" ));
							}
				}
				var searchStr = playerHTML;
				var lengthSS = searchStr.length;
				if (playerStr.match(searchStr)){
					var startSS = playerStr.indexOf(searchStr);
					var endSS = startSS+lengthSS;
					var endWeek = playerStr.indexOf(":", endSS+1);
					var endDate = playerStr.indexOf(",", endWeek+1);
					var week = playerStr.slice(endSS+1, endWeek);
					var date = playerStr.slice(endWeek+1, endDate);
					if (date == weekno){ 						
						addAvg( week, currTable, row );
					}
					else {
						getOppPage(playerHTML, currTable, row, week, date);
					}
				}
				else {	
					var week = -1;
					var date = -1;
					getOppPage(playerHTML, currTable, row, week, date);
				}	
			}
		}
	}		
}

function getOppPage(playerPage, table, row, myweek, mydate){
    GM_xmlhttpRequest({
        method: 'GET',
        url: playerPage,
		onload: function (results){
			gamesPlayed = getGamesPlayed(results.responseText);
			myStr = GM_getValue("playerGames - " + selectedYear, "");
			if (myStr.match(playerPage)){
				myStr = myStr.replace(playerPage+":"+myweek+":"+mydate, playerPage+":"+gamesPlayed+":"+weekno);
			}
			else {
				myStr = myStr.concat(playerPage,":",gamesPlayed,":",weekno,",");
			}
			GM_setValue("playerGames - " + selectedYear, myStr);
			addAvg(gamesPlayed, table, row);
		}});

}

function getGamesPlayed( response )
{
	var game = new  Number(0);
	var tables = response.replace( /\r\n+/g, '' ).split( /<table[^>]+>/i );
    for ( var iTables = 0; iTables < tables.length; iTables++ )
    {
		if ( /Recent Career/i.test( tables[ iTables ] ) )
		{
			var rows = tables[ iTables ].replace( /\r\n+/g, '' ).split( /<tr/i );
			for ( var iRows = 0; iRows < rows.length; iRows++ )
			{
				if ( rows[ iRows ].match(selectedYear) )
				{
					var cols = rows[ iRows ].split( /<td/i );	
					for (iCols = 0; iCols<cols.length; iCols++)
					{
					
						if ( cols[ iCols ].match(selectedYear) ){
							mygame = cols[ iCols + 2 ].replace(/<td.*>|<*td>/i, "");
							game = game + Number(mygame.replace(/[^\d]/g, ''));
							
						}
					}
				}
			}
		}
	}
	if (game == "0"){
		if (selectedYear == thisYear){
			var div = response.replace( /\r\n+/g, '' ).split( /<div/i );
			for ( var iDiv = 0; iDiv < div.length; iDiv++ )
			{
				if ( /class="stats"/i.test( div[ iDiv ] ) )
				{
					var lists = div[ iDiv ].replace( /\r\n+/g, '' ).split( /<ul/i );
					for ( var iLists = 0; iLists < lists.length; iLists++ )
					{
						if ( /class="score"/i.test( lists[ iLists ] ) )
						{
							var each = lists[ iLists ].replace( /\r\n+/g, '' ).split( /<li/i );
							for ( var iEach = 0; iEach < each.length; iEach++ )
							{
								if ( /class="score"/i.test( each[ iEach ] ) )
								{
									var gameArr = each[ iEach ].replace(/class="score">|,.*/gi, "").split( /\-/i );
									for ( var iGame = 0; iGame < gameArr.length; iGame++ )
									{
										var myGame = new Number(gameArr[ iGame ].replace(/[^\d]/g, ''));
										game = game + myGame;
									}
								}	
							}	
						}
					}
				}
			}
		}
	}
	if (game == "0"){
		game = '16';
	}
	
	return (game);
}

function addHeading(table, x, y) {
			
				var firstTH = document.createElement('th');
				table.rows[0].appendChild(firstTH);
				firstTH.setAttribute("class","pts last");
				firstTH.innerHTML = "Avg";
				var secondTH = document.createElement('th');
				table.rows[1].appendChild(secondTH);
				secondTH.setAttribute("class","pts last");
				secondTH.innerHTML = "FPts/G";
}

function addAvg( gamesPlayed, table, row ){
					
				var totStat = table.rows[row].cells[table.rows[row].cells.length - 1].innerHTML;
				var perGame = Math.round((totStat/(gamesPlayed))*100)/100;
				var cell = table.rows[row].insertCell(table.rows[row].cells.length);
				cell.className = "pts last";
				cell.colSpan = "1";
				cell.innerHTML = perGame;	
}
