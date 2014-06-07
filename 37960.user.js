// ==UserScript==
// @name           ESPNgamelogWoW
// @namespace      http://userscripts.org/users/72607
// @description    Add win score, wins produced, and wp48 to the espn gamelog page.  Example page: http://sports.espn.go.com/nba/players/gamelog?playerId=3027
// @include        http://*espn.go.com/nba/players/gamelog?playerId=*
// @include        http://*espn.go.com/nba/players/gamelog?statsId=*
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2008 dustinc

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

//CONSTANTS
var CENTER = 0.225;
var FORWARDCENTER = .220;
var POWERFORWARD = 0.215;
var FORWARD = 0.183;
var SMALLFORWARD = 0.152;
var SHOOTINGGUARD = 0.128;
var GUARD = .130;
var POINTGUARD = 0.132;

//SCRIPT

//position of the player
var positionAdjustment = getPositionAdjustment();

//get the year heading
var yearHeading = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='stathead s1']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
fixColspan(yearHeading);

//get the stat column headings
var columnHeadings = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='colhead']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var l = 0; l < columnHeadings.snapshotLength; l++)
{
    fixColhead(columnHeadings.snapshotItem(l));
}

//get regular season and postseason table headings
var tableHeadings = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='stathead']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var k = 0; k < tableHeadings.snapshotLength; k++)
{
    fixTableHeadings(tableHeadings.snapshotItem(k));
}

//get the game rows
var gameRows = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[(@class='oddrow' or @class='evenrow') and count(td)=19]", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i< gameRows.snapshotLength; i++)
{
    var gameRow = gameRows.snapshotItem(i);
    var gameBoxScore = parseGame(gameRow);
    gameBoxScore[16] = positionAdjustment;
    var gameStats = calculateStats(gameBoxScore);
    addGameStats(gameRow, gameStats);
    shrinkRow(gameRow);
}

//get  totals
var seasonTotals = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='oddrow' or @class='evenrow']/td/b[text()='Totals']/parent::*/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var m = 0; m < seasonTotals.snapshotLength; m++)
{
    var seasonTotalsRow = seasonTotals.snapshotItem(m);
    var seasonTotalsBoxScore = parseSeasonTotals(seasonTotalsRow);
    seasonTotalsBoxScore[16] = positionAdjustment;
    var seasonTotalsStats = calculateStats(seasonTotalsBoxScore);
    addTotalsStats(seasonTotalsRow, seasonTotalsStats);
    shrinkRow(seasonTotalsRow);
}

//get season averages
var seasonAverages = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='oddrow' or @class='evenrow']/td/b[text()='Averages']/parent::*/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var n = 0; n < seasonAverages.snapshotLength; n++)
{
    var seasonAveragesRow = seasonAverages.snapshotItem(n);
    var seasonAveragesBoxScore = parseSeasonAverages(seasonAveragesRow);
    seasonAveragesBoxScore[16] = positionAdjustment;
    var seasonAveragesStats = calculateStats(seasonAveragesBoxScore);
    addAveragesStats(seasonAveragesRow, seasonAveragesStats);
    shrinkRow(seasonAveragesRow);
}

//get monthly averages
var monthlyAverages = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='oddrow' or @class='evenrow']/td/b[starts-with(text(),'Numbers')]/parent::*/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var p = 0; p < monthlyAverages.snapshotLength; p++)
{
    var monthlyAveragesRow = monthlyAverages.snapshotItem(p);
    var monthlyAveragesBoxScore = parseMonthlyAverages(monthlyAveragesRow);
    monthlyAveragesBoxScore[16] = positionAdjustment;
    var monthlyAveragesStats = calculateStats(monthlyAveragesBoxScore);
    addAveragesStats(monthlyAveragesRow, monthlyAveragesStats);
    shrinkRow(monthlyAveragesRow);
}

//END SCRIPT

//FUNCTIONS
//get the position of the player
function getPositionAdjustment()
{
    var positionTD = document.evaluate("//table[@class='metaData']/tbody/tr/td/table/tbody/tr/td/strong[text()='Position']/parent::*/following-sibling::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var positionAdjustment;
    switch(positionTD.snapshotItem(0).textContent)
    {
        case 'C':
            positionAdjustment = CENTER;
            break;
        case 'FC':
            positionAdjustment = FORWARDCENTER;
            break;
        case 'PF':
            positionAdjustment = POWERFORWARD;
            break;
        case 'F':
            positionAdjustment = FORWARD;
            break;
        case 'SF':
            positionAdjustment = SMALLFORWARD;
            break;
        case 'SG':
            positionAdjustment = SHOOTINGGUARD;
            break;
        case 'G':
            positionAdjustment = GUARD;
            break;
        case 'PG':
            positionAdjustment = POINTGUARD;
            break;
    }
    return positionAdjustment;
};

function fixTableHeadings(row)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wowHeader = document.createElement('td');
    wowHeader.setAttribute('colspan', 3);
    wowHeader.setAttribute('align','center');
    //set their text
    wowHeader.textContent = 'Wages of Wins';
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wowHeader, row.lastChild.nextSibling);  
}

function fixColhead(row)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var ws = document.createElement('td');
    var wp48 = document.createElement('td');
    var wp = document.createElement('td');
    //set their text
    ws.textContent = 'WS';
    wp48.textContent = 'WP48';
    wp.textContent = 'WP';
    //put into document
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(ws, row.lastChild.nextSibling);
    row.insertBefore(wp48, row.lastChild.nextSibling);
    row.insertBefore(wp, row.lastChild.nextSibling);
};

//fix the colspan attribute to accomodate the extra 4 cells
function fixColspan(row)
{
    var tdElem = row.getElementsByTagName('td')[0];
    var oldColspan = parseInt(tdElem.getAttribute('colspan'));
    tdElem.setAttribute('colspan', oldColspan+4);
};

//Takes an array of data created from parseRow and produces an array of stats.
//format of returned array is as follows
//0     1       2
//ws    wp48    wp
function calculateStats(boxScore)
{
    if(boxScore == null){
        return null;    
    }else{
        var statsArray = new Array();
        //calculate winscore
        //              pts           + reb       + stl           +.5*blk             +.5*ast         -fga            -.5*fta         - to            -.5*pf
        statsArray[0] = boxScore[15] + boxScore[9] + boxScore[11] + 0.5*boxScore[12] + 0.5*boxScore[10] - boxScore[2] - 0.5*boxScore[6] - boxScore[13] - 0.5*boxScore[14];
        //calculate PAWSmin = ws/min - position adjustment
        var pawsMin = statsArray[0]/boxScore[0] - boxScore[16];
        //calculate wp48 = .104 + 1.621*pawsMin
        statsArray[1] = 0.104 + 1.621*pawsMin;
        //calculate wp = wp48*min/48
        statsArray[2] = statsArray[1]*(boxScore[0]/48);
        //lets round ws to 1 decimal places
        statsArray[0] = Math.round(statsArray[0]*Math.pow(10,1))/Math.pow(10,1);
        //lets round wp48 and wp to the nearest 3 decimal places
        statsArray[1] = Math.round(statsArray[1]*Math.pow(10,3))/Math.pow(10,3);
        statsArray[2] = Math.round(statsArray[2]*Math.pow(10,3))/Math.pow(10,3);
        return statsArray;
    }
};

//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseSeasonTotals(row)
{
    var boxScoreArray = new Array();
    var tdCells = row.getElementsByTagName('td');
    //minutes
    boxScoreArray[0] = parseInt(tdCells[1].textContent);
    //field goals made
    boxScoreArray[1] = parseInt(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')));
    //field goals attempted
    boxScoreArray[2] = parseInt(tdCells[2].textContent.substring(tdCells[2].textContent.indexOf('-')+1));
    //3-point field goals made
    boxScoreArray[3] = parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')));
    //3-point field goals attempted
    boxScoreArray[4] = parseInt(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf("-")+1));
    //free throws made
    boxScoreArray[5] = parseInt(tdCells[6].textContent.substring(0, tdCells[6].textContent.indexOf('-')));
    //free throws attempted
    boxScoreArray[6] = parseInt(tdCells[6].textContent.substring(tdCells[6].textContent.indexOf('-')+1));
    //offensive rebounds
    boxScoreArray[7] = parseInt(tdCells[12].textContent);
    //defensive rebounds
    boxScoreArray[8] = parseInt(tdCells[13].textContent);
    //total rebounds
    boxScoreArray[9] = parseInt(tdCells[14].textContent);
    //assists
    boxScoreArray[10] = parseInt(tdCells[15].textContent);
    //steals
    boxScoreArray[11] = parseInt(tdCells[8].textContent);
    //blocks
    boxScoreArray[12] = parseInt(tdCells[9].textContent);
    //turnovers
    boxScoreArray[13] = parseInt(tdCells[10].textContent);
    //personal fouls
    boxScoreArray[14] = parseInt(tdCells[11].textContent);
    //points
    boxScoreArray[15] = parseInt(tdCells[16].textContent);
    return boxScoreArray;
};

function parseSeasonAverages(row)
{
    //get all the data in the cells
    var tdCells = row.getElementsByTagName('td');
    var boxScoreArray = new Array();
    //minutes
    boxScoreArray[0] = parseFloat(tdCells[1].textContent);
    //fgm
    boxScoreArray[1] = parseFloat(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')));
    //fga
    boxScoreArray[2] = parseFloat(tdCells[2].textContent.substring(tdCells[2].textContent.indexOf('-')+1));
    //3pm
    boxScoreArray[3] = parseFloat(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')));
    //3pa
    boxScoreArray[4] = parseFloat(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf('-')+1));
    //ftm
    boxScoreArray[5] = parseFloat(tdCells[6].textContent.substring(0, tdCells[6].textContent.indexOf('-')));
    //fta
    boxScoreArray[6] = parseFloat(tdCells[6].textContent.substring(tdCells[6].textContent.indexOf('-')+1));
    //orb
    boxScoreArray[7] = parseFloat(tdCells[12].textContent);
    //drb
    boxScoreArray[8] = parseFloat(tdCells[13].textContent);
    //trb
    boxScoreArray[9] = parseFloat(tdCells[14].textContent);
    //ast
    boxScoreArray[10] = parseFloat(tdCells[15].textContent);
    //stl
    boxScoreArray[11] = parseFloat(tdCells[8].textContent);
    //blk
    boxScoreArray[12] = parseFloat(tdCells[9].textContent);
    //to
    boxScoreArray[13] = parseFloat(tdCells[10].textContent);
    //pf
    boxScoreArray[14] = parseFloat(tdCells[11].textContent);
    //pts
    boxScoreArray[15] = parseFloat(tdCells[16].textContent);
    return boxScoreArray;
};

function parseMonthlyAverages(row)
{
    //get all the data in the cells
    var tdCells = row.getElementsByTagName('td');
    var boxScoreArray = new Array();
    //Hack to calculate the number of games in the monthly averages, as this number is not stored anywhere convenient
    //calculate this by points/ppg = (fgm*2 + 3pm + ftm)/ppg
    var points = (parseInt(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')))*2 +
                parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-'))) +
                parseInt(tdCells[6].textContent.substring(0, tdCells[6].textContent.indexOf('-'))))
    var games = Math.round(points/parseFloat(tdCells[16].textContent));
    //minutes
    boxScoreArray[0] = parseFloat(tdCells[1].textContent);
    //fgm
    boxScoreArray[1] = parseInt(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')))/games;
    //fga
    boxScoreArray[2] = parseInt(tdCells[2].textContent.substring(tdCells[2].textContent.indexOf('-')+1))/games;
    //3pm
    boxScoreArray[3] = parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')))/games;
    //3pa
    boxScoreArray[4] = parseInt(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf('-')+1))/games;
    //ftm
    boxScoreArray[5] = parseInt(tdCells[6].textContent.substring(0, tdCells[6].textContent.indexOf('-')))/games;
    //fta
    boxScoreArray[6] = parseInt(tdCells[6].textContent.substring(tdCells[6].textContent.indexOf('-')+1))/games;
    //orb
    boxScoreArray[7] = parseFloat(tdCells[12].textContent);
    //drb
    boxScoreArray[8] = parseFloat(tdCells[13].textContent);
    //trb
    boxScoreArray[9] = parseFloat(tdCells[14].textContent);
    //ast
    boxScoreArray[10] = parseFloat(tdCells[15].textContent);
    //stl
    boxScoreArray[11] = parseFloat(tdCells[8].textContent);
    //blk
    boxScoreArray[12] = parseFloat(tdCells[9].textContent);
    //to
    boxScoreArray[13] = parseFloat(tdCells[10].textContent);
    //pf
    boxScoreArray[14] = parseFloat(tdCells[11].textContent);
    //pts
    boxScoreArray[15] = points/games;
    return boxScoreArray;
};

//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseGame(row)
{
    var boxScoreArray = new Array();
    var tdCells = row.getElementsByTagName('td');
    //minutes
    boxScoreArray[0] = parseInt(tdCells[3].textContent);
    //field goals made
    boxScoreArray[1] = parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')));
    //field goals attempted
    boxScoreArray[2] = parseInt(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf('-')+1));
    //3-point field goals made
    boxScoreArray[3] = parseInt(tdCells[6].textContent.substring(0, tdCells[6].textContent.indexOf('-')));
    //3-point field goals attempted
    boxScoreArray[4] = parseInt(tdCells[6].textContent.substring(tdCells[6].textContent.indexOf("-")+1));
    //free throws made
    boxScoreArray[5] = parseInt(tdCells[8].textContent.substring(0, tdCells[8].textContent.indexOf('-')));
    //free throws attempted
    boxScoreArray[6] = parseInt(tdCells[8].textContent.substring(tdCells[8].textContent.indexOf('-')+1));
    //offensive rebounds
    boxScoreArray[7] = parseInt(tdCells[14].textContent);
    //defensive rebounds
    boxScoreArray[8] = parseInt(tdCells[15].textContent);
    //total rebounds
    boxScoreArray[9] = parseInt(tdCells[16].textContent);
    //assists
    boxScoreArray[10] = parseInt(tdCells[17].textContent);
    //steals
    boxScoreArray[11] = parseInt(tdCells[10].textContent);
    //blocks
    boxScoreArray[12] = parseInt(tdCells[11].textContent);
    //turnovers
    boxScoreArray[13] = parseInt(tdCells[12].textContent);
    //personal fouls
    boxScoreArray[14] = parseInt(tdCells[13].textContent);
    //points
    boxScoreArray[15] = parseInt(tdCells[18].textContent);
    return boxScoreArray;
};

function addTotalsStats(row, stats)
{
//create the elements to insert into the table
    var buffer = document.createElement('td');
    var wsTD = document.createElement('td');
    var wp48TD = document.createElement('td');
    var wpTD = document.createElement('td');
    //set their text
    //ws will be empty for totals
    wp48TD.textContent = stats[1];
    //it's ugly, but for this row only I will do rounding again here for space purposes
    wpTD.textContent = Math.round(stats[2]*Math.pow(10,2))/Math.pow(10,2);
    //insert them into the document
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wsTD, row.lastChild.nextSibling);
    row.insertBefore(wp48TD, row.lastChild.nextSibling);
    row.insertBefore(wpTD, row.lastChild.nextSibling);
};

function addAveragesStats(row, stats)
{
//create the elements to insert into the table
    var buffer = document.createElement('td');
    var wsTD = document.createElement('td');
    var wp48TD = document.createElement('td');
    var wpTD = document.createElement('td');
    //set their text
    wsTD.textContent = stats[0];
    wp48TD.textContent = stats[1];
    //wp will be empty for averages
    //insert them into the document
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wsTD, row.lastChild.nextSibling);
    row.insertBefore(wp48TD, row.lastChild.nextSibling);
    row.insertBefore(wpTD, row.lastChild.nextSibling);
};

function addGameStats(row, stats)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wsTD = document.createElement('td');
    var wp48TD = document.createElement('td');
    var wpTD = document.createElement('td');
    //set their text
    wsTD.textContent = stats[0];
    wp48TD.textContent = stats[1];
    wpTD.textContent = stats[2];
    //insert them into the document
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wsTD, row.lastChild.nextSibling);
    row.insertBefore(wp48TD, row.lastChild.nextSibling);
    row.insertBefore(wpTD, row.lastChild.nextSibling);
};

function shrinkRow(row)
{
    //remove the no break element from the outcome-score cell e.g. (W 116-110)
    var scoreCells = document.evaluate("td/nobr/span[@class]/parent::*/parent::*", row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var m = 0; m < scoreCells.snapshotLength; m++)
    {
        var ce = scoreCells.snapshotItem(m);
        var data = ce.lastChild.innerHTML;
        ce.innerHTML = data;
    }
    //we are going to add a space after dashes to allow word wrapping if a cell has text longer than 4 characters
    var tdCells = document.evaluate("td[string-length(text()) > 5]", row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < tdCells.snapshotLength; i++)
    {
        var currentCell = tdCells.snapshotItem(i);
        if(currentCell.textContent.indexOf('-') > 0)
        {
            var newText = currentCell.textContent.substring(0, currentCell.textContent.indexOf('-')+1);
            newText = newText + ' ' + currentCell.textContent.substring(currentCell.textContent.indexOf('-')+1);
		    currentCell.textContent = newText;
        }       
    }
    //strip leading zeros from floats, ie 0.1 to .1 and -0.1 to -.1
    var leadZeros = document.evaluate("td[starts-with(text(),'0.') or starts-with(text(),'-0.')]", row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var j = 0; j < leadZeros.snapshotLength; j++)
    {
        var cell = leadZeros.snapshotItem(j);
        var text = '';
        if(cell.textContent.indexOf('-') != -1)
        {
            text = '-';
        }
        cell.textContent = text + cell.textContent.substring(cell.textContent.indexOf('.'));
    }
    //strip third decimal place from 1.000
    var trailingZeros = document.evaluate("td[text()='1.000']", row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var k = 0; k < trailingZeros.snapshotLength; k++)
    {
        var c = trailingZeros.snapshotItem(k);
        c.textContent = c.textContent.substring(0,4);
    }
    //put space after @sign to allow word wrapping
    var oppCells = document.evaluate("td[starts-with(text(), '@')]", row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var l = 0; l < oppCells.snapshotLength; l++)
    {
        var cel = oppCells.snapshotItem(l);
        var tail = cel.textContent.substring(1);
        cel.textContent = '@ ' + tail;
    }

};