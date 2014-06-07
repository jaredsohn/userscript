// ==UserScript==
// @name           ESPNprofileWoW
// @namespace      http://userscripts.org/users/72607
// @description    Add win score and wp48 to espn player profiles
// @include        http://*espn.go.com/nba/players/profile?playerId=*
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

//Parse and modify the career/season stats table

//find the season/career table
var careerStats = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='stathead' and count(td)=6]/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
//fix the meta-stat heading
var metastatsRow = document.evaluate("tr[@class='stathead']", careerStats, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);   
fixTableHeading(metastatsRow);
//fix the column headings
var columnHeadings = document.evaluate("tr[@class='colhead']", careerStats, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 
fixColumns(columnHeadings);
//for the season and career rows, calculate WS, WP48, and WP
var careerStatsRows = document.evaluate("tr[@class='oddrow' or @class='evenrow']", careerStats, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);                                      
for(var i = 0; i < careerStatsRows.snapshotLength; i++)
{
    var currentRow = careerStatsRows.snapshotItem(i);
    var boxScore = parseCareerStatRow(currentRow);
    boxScore[16] = positionAdjustment;
    var stats = calculateStats(boxScore);
    addStats(currentRow, stats);
    shrinkRow(currentRow);
}

//Parse and modify the game logs

var gameLogTable = document.evaluate("//div[@class='gp-body']/table[@class='tablehead']/tbody/tr[@class='stathead']/td[@colspan='11']/parent::*/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
//fix up the game log heading
var gameLogHeading = document.evaluate("tr[@class='stathead']", gameLogTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
fixTableHeading(gameLogHeading);
//fix the column headings
var gameLogColumns = document.evaluate("tr[@class='colhead']", gameLogTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 
fixColumns(gameLogColumns);
//for the last 5 games, calculate WS, WP48, and WP
var gameLogRows = document.evaluate("tr[(@class='oddrow' or @class='evenrow') and count(td)=16]", gameLogTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < gameLogRows.snapshotLength; i++)
{
    var gameLogRow = gameLogRows.snapshotItem(i);
    var gameLogBxScr = parseGameLogRow(gameLogRow);
    gameLogBxScr[16]=positionAdjustment;
    var gameLogRowStats = calculateStats(gameLogBxScr);
    addStats(gameLogRow, gameLogRowStats);
}
//parse the 5game average row
var lastFive = document.evaluate("tr[(@class='oddrow' or @class='evenrow') and count(td)=14]", gameLogTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var lastFiveBoxScore = parseLastFiveAverages(lastFive);
lastFiveBoxScore[16]=positionAdjustment;
var lastFiveStats = calculateStats(lastFiveBoxScore);
addStats(lastFive, lastFiveStats);
//ENDSCRIPT

//FUNCTIONS

//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseCareerStatRow(row)
{
    //get all the data in the cells
    var tdCells = row.getElementsByTagName('td');
    var boxScoreArray = new Array();
    var games = parseInt(tdCells[1].textContent);
    //minutes
    boxScoreArray[0] = parseFloat(tdCells[2].textContent);
    //fgm
    boxScoreArray[1] = parseInt(tdCells[3].textContent.substring(0, tdCells[3].textContent.indexOf('-')))/games;
    //fga
    boxScoreArray[2] = parseInt(tdCells[3].textContent.substring(tdCells[3].textContent.indexOf('-')+1))/games;
    //3pm
    boxScoreArray[3] = parseInt(tdCells[5].textContent.substring(0, tdCells[5].textContent.indexOf('-')))/games;
    //3pa
    boxScoreArray[4] = parseInt(tdCells[5].textContent.substring(tdCells[5].textContent.indexOf('-')+1))/games;
    //ftm
    boxScoreArray[5] = parseInt(tdCells[7].textContent.substring(0, tdCells[7].textContent.indexOf('-')))/games;
    //fta
    boxScoreArray[6] = parseInt(tdCells[7].textContent.substring(tdCells[7].textContent.indexOf('-')+1))/games;
    //orb
    boxScoreArray[7] = parseFloat(tdCells[9].textContent);
    //drb
    boxScoreArray[8] = parseFloat(tdCells[10].textContent);
    //trb
    boxScoreArray[9] = parseFloat(tdCells[11].textContent);
    //ast
    boxScoreArray[10] = parseFloat(tdCells[16].textContent);
    //stl
    boxScoreArray[11] = parseFloat(tdCells[12].textContent);
    //blk
    boxScoreArray[12] = parseFloat(tdCells[13].textContent);
    //to
    boxScoreArray[13] = parseFloat(tdCells[14].textContent);
    //pf
    boxScoreArray[14] = parseFloat(tdCells[15].textContent);
    //pts, calculate this as (fgm*2+3pm+ftm)/games.  this has more precision than the box
    boxScoreArray[15] = (parseInt(tdCells[3].textContent.substring(0, tdCells[3].textContent.indexOf('-')))*2 +
                        parseInt(tdCells[5].textContent.substring(0, tdCells[5].textContent.indexOf('-'))) +
                        parseInt(tdCells[7].textContent.substring(0, tdCells[7].textContent.indexOf('-'))))/games;
    return boxScoreArray;
};

//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseGameLogRow(row)
{
    var tdCells = row.getElementsByTagName('td');
    var boxScoreArray = new Array();
    //minutes
    boxScoreArray[0] = parseInt(tdCells[3].textContent);
    //fgm
    boxScoreArray[1] = parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')));
    //fga
    boxScoreArray[2] = parseInt(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf('-')+1));
    //3pm
    boxScoreArray[3] = parseInt(tdCells[5].textContent.substring(0, tdCells[5].textContent.indexOf('-')));
    //3pa
    boxScoreArray[4] = parseInt(tdCells[5].textContent.substring(tdCells[5].textContent.indexOf('-')+1));
    //ftm
    boxScoreArray[5] = parseInt(tdCells[6].textContent.substring(0, tdCells[6].textContent.indexOf('-')));
    //fta
    boxScoreArray[6] = parseInt(tdCells[6].textContent.substring(tdCells[6].textContent.indexOf('-')+1));
    //orb
    boxScoreArray[7] = parseInt(tdCells[11].textContent);
    //drb
    boxScoreArray[8] = parseInt(tdCells[12].textContent);
    //trb
    boxScoreArray[9] = parseInt(tdCells[13].textContent);
    //ast
    boxScoreArray[10] = parseInt(tdCells[14].textContent);
    //stl
    boxScoreArray[11] = parseInt(tdCells[7].textContent);
    //blk
    boxScoreArray[12] = parseInt(tdCells[8].textContent);
    //to
    boxScoreArray[13] = parseInt(tdCells[9].textContent);
    //pf
    boxScoreArray[14] = parseInt(tdCells[10].textContent);
    //pts
    boxScoreArray[15] = parseInt(tdCells[15].textContent);
    return boxScoreArray;  
};

//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseLastFiveAverages(row)
{
//get all the data in the cells
    var tdCells = row.getElementsByTagName('td');
    var boxScoreArray = new Array();
    //Hack to calculate the number of games in the last 5 averages, as it lists games where the player did not play
    //calculate this by points/ppg = (fgm*2 + 3pm + ftm)/ppg
    var points = (parseInt(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')))*2 +
                parseInt(tdCells[3].textContent.substring(0, tdCells[3].textContent.indexOf('-'))) +
                parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-'))))
    var games = Math.round(points/
                parseFloat(tdCells[13].textContent));
    //minutes
    boxScoreArray[0] = parseFloat(tdCells[1].textContent);
    //fgm
    boxScoreArray[1] = parseInt(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')))/games;
    //fga
    boxScoreArray[2] = parseInt(tdCells[2].textContent.substring(tdCells[2].textContent.indexOf('-')+1))/games;
    //3pm
    boxScoreArray[3] = parseInt(tdCells[3].textContent.substring(0, tdCells[3].textContent.indexOf('-')))/games;
    //3pa
    boxScoreArray[4] = parseInt(tdCells[3].textContent.substring(tdCells[3].textContent.indexOf('-')+1))/games;
    //ftm
    boxScoreArray[5] = parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')))/games;
    //fta
    boxScoreArray[6] = parseInt(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf('-')+1))/games;
    //orb
    boxScoreArray[7] = parseFloat(tdCells[9].textContent);
    //drb
    boxScoreArray[8] = parseFloat(tdCells[10].textContent);
    //trb
    boxScoreArray[9] = parseFloat(tdCells[11].textContent);
    //ast
    boxScoreArray[10] = parseFloat(tdCells[12].textContent);
    //stl
    boxScoreArray[11] = parseFloat(tdCells[5].textContent);
    //blk
    boxScoreArray[12] = parseFloat(tdCells[6].textContent);
    //to
    boxScoreArray[13] = parseFloat(tdCells[7].textContent);
    //pf
    boxScoreArray[14] = parseFloat(tdCells[8].textContent);
    //pts
    boxScoreArray[15] = points/games;
    return boxScoreArray;
};

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

//Insert the wins produced info into a given row
function addStats(row, stats)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wsTD = document.createElement('td');
    var wp48TD = document.createElement('td');
    //set their text
    wsTD.textContent = stats[0];
    wp48TD.textContent = stats[1];
    //insert them into the document
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wsTD, row.lastChild.nextSibling);
    row.insertBefore(wp48TD, row.lastChild.nextSibling);
};

function fixTableHeading(row)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wowHeader = document.createElement('td');
    wowHeader.setAttribute('colspan', 2);
    wowHeader.setAttribute('align','center');
    //set their text
    wowHeader.textContent = 'Wages of Wins';
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wowHeader, row.lastChild.nextSibling);  
};

function fixColumns(headings)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var ws = document.createElement('td');
    var wp48 = document.createElement('td');
    var wp = document.createElement('td');
    //set their text
    ws.textContent = 'WS';
    wp48.textContent = 'WP48';
    //put into document
    headings.insertBefore(buffer, headings.lastChild.nextSibling);
    headings.insertBefore(ws, headings.lastChild.nextSibling);
    headings.insertBefore(wp48, headings.lastChild.nextSibling);
};

function shrinkRow(row)
{
    //we are going to add a space after dashes to allow word wrapping if a cell has text longer than 5 characters
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
};