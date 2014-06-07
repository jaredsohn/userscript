// ==UserScript==
// @name           ESPNstatsWoW
// @namespace      http://userscripts.org/users/72607
// @description    Add win score, wins produced, and wp48 to the espn stats page
// @include        http://*espn.go.com/nba/players/stats?playerId=*
// @include        http://*espn.go.com/nba/players/stats?statsId=*
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

//Do everything for season averages table

//get the table with the season averages
seasonAveragesTable = document.evaluate("//div[@class='gp-body']/div[@id='classicDiv']/table[@class='tablehead']/tbody/tr[@class='stathead']/td[1][@colspan='15']/parent::*/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
//fix the meta-stat heading
var metastatsRow = document.evaluate("tr[@class='stathead']", seasonAveragesTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);   
fixTableHeading(metastatsRow);
//fix the column headings
var columnHeadings = document.evaluate("tr[@class='colhead']", seasonAveragesTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var j = 0; j < columnHeadings.snapshotLength; j++)
{
    fixColumnsSeasonTable(columnHeadings.snapshotItem(j));
}
//for each row of season averages, calculate ws and wp48
seasonAveragesRows = document.evaluate("tr[@class='oddrow' or @class='evenrow']", seasonAveragesTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var i = 0; i < seasonAveragesRows.snapshotLength; i++)
{
    var currentRow = seasonAveragesRows.snapshotItem(i);
    var boxScore = parseSeasonAveragesRow(currentRow);
    boxScore[16] = positionAdjustment;
    var stats = calculateStats(boxScore);
    addStatsSeasonAveragesRow(currentRow, stats);
}

//Do everything for season totals table.  Espn is lame and stores pf data in a separate table, so for now we need to work with two tables

//get the table and personal foul data
seasonTotalsTable = document.evaluate("//div[@class='gp-body']/div[@id='classicDiv']/table[@class='tablehead']/tbody/tr[@class='stathead']/td[1][@colspan='13']/parent::*/parent::*", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
personalFoulsCells = document.evaluate("//div[@class='gp-body']/div[@id='classicDiv']/table[@class='tablehead']/tbody/tr[@class='stathead']/td[1][@colspan='16']/parent::*/parent::*/tr[@class='oddrow' or @class='evenrow']/td[11]", document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
//fix the meta-stat heading
var totalsMetastatsRow = document.evaluate("tr[@class='stathead']", seasonTotalsTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);   
fixTableHeading(totalsMetastatsRow);
//fix the column headings
var totalsColumnHeadings = document.evaluate("tr[@class='colhead']", seasonTotalsTable, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(var k = 0; k < totalsColumnHeadings.snapshotLength; k++)
{
    fixColumnsTotalsTable(totalsColumnHeadings.snapshotItem(k));
}
//for each row of season totals, calculate wp48 and wp
seasonTotalsRows = document.evaluate("tr[@class='oddrow' or @class='evenrow']", seasonTotalsTable, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for(var l = 0; l < seasonTotalsRows.snapshotLength; l++)
{
    var currRow = seasonTotalsRows.snapshotItem(l);
    var boxScr = parseSeasonTotalsRow(currRow);
    boxScr[14] = parseInt(personalFoulsCells.snapshotItem(l).textContent);
    boxScr[16] = positionAdjustment;
    var totalStats = calculateStats(boxScr);
    addStatsSeasonTotalsRow(currRow, totalStats);
    shrinkRow(currRow);
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

function fixColumnsSeasonTable(headings)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var ws = document.createElement('td');
    var wp48 = document.createElement('td');
    //set their text
    ws.textContent = 'WS';
    wp48.textContent = 'WP48';
    //put into document
    headings.insertBefore(buffer, headings.lastChild.nextSibling);
    headings.insertBefore(ws, headings.lastChild.nextSibling);
    headings.insertBefore(wp48, headings.lastChild.nextSibling);
};

function fixColumnsTotalsTable(headings)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wp48 = document.createElement('td');
    var wp = document.createElement('td');
    //set their text
    wp48.textContent = 'WP48';
    wp.textContent = 'WP';
    //put into document
    headings.insertBefore(buffer, headings.lastChild.nextSibling);
    headings.insertBefore(wp48, headings.lastChild.nextSibling);
    headings.insertBefore(wp, headings.lastChild.nextSibling);
};


//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseSeasonAveragesRow(row)
{
    //get all the data in the cells
    var tdCells = row.getElementsByTagName('td');
    var boxScoreArray = new Array();
    //minutes
    boxScoreArray[0] = parseFloat(tdCells[4].textContent);
    //fga
    boxScoreArray[2] = parseFloat(tdCells[5].textContent.substring(tdCells[5].textContent.indexOf('-')+1));
    //fgm, the fg% cell has more precision, will calculate fgm by fga*fg%
    boxScoreArray[1] = parseFloat(tdCells[6].textContent)*boxScoreArray[2]; 
       
    //3pa
    boxScoreArray[4] = parseFloat(tdCells[7].textContent.substring(tdCells[7].textContent.indexOf('-')+1));
    //3pm, the 3pfg% cell has more precision, will calculate 3pm by 3pa*3pfg%
    boxScoreArray[3] = parseFloat(tdCells[8].textContent)*boxScoreArray[4];
    
    //fta
    boxScoreArray[6] = parseFloat(tdCells[9].textContent.substring(tdCells[9].textContent.indexOf('-')+1));
    //ftm, the ft% cell has more precision, will calculate fgm by fta*ft%
    boxScoreArray[5] = parseFloat(tdCells[10].textContent)*boxScoreArray[6];
    
    //orb
    boxScoreArray[7] = parseFloat(tdCells[15].textContent);
    //drb
    boxScoreArray[8] = parseFloat(tdCells[16].textContent);
    //trb
    boxScoreArray[9] = parseFloat(tdCells[17].textContent);
    //ast
    boxScoreArray[10] = parseFloat(tdCells[18].textContent);
    //stl
    boxScoreArray[11] = parseFloat(tdCells[11].textContent);
    //blk
    boxScoreArray[12] = parseFloat(tdCells[12].textContent);
    //to
    boxScoreArray[13] = parseFloat(tdCells[13].textContent);
    //pf
    boxScoreArray[14] = parseFloat(tdCells[14].textContent);
    //pts, calculate this as fgm*2+3pm+ftm.  this has more precision than the box
    boxScoreArray[15] = boxScoreArray[1]*2+boxScoreArray[3]+boxScoreArray[5];
    return boxScoreArray;
};

//Insert the wins produced info into a given row
function addStatsSeasonAveragesRow(row, stats)
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

function shrinkRow(row)
{
    //we are going to add a space after dashes to allow word wrapping if a cell has text longer than 5 characters
    //we need to get rid of some pesky nobr tags
    var tdCells = document.evaluate("td/nobr[string-length(text()) > 5]/parent::*", row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i = 0; i < tdCells.snapshotLength; i++)
    {
        var currentCell = tdCells.snapshotItem(i);
        if(currentCell.textContent.indexOf('-') > 0)
        {
            var newText = currentCell.lastChild.textContent.substring(0, currentCell.textContent.indexOf('-')+1);
            newText = newText + ' ' + currentCell.textContent.substring(currentCell.textContent.indexOf('-')+1);
            currentCell.removeChild(currentCell.lastChild);
            currentCell.textContent = newText;            
        }       
    }
};

//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseSeasonTotalsRow(row)
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
    boxScoreArray[7] = parseInt(tdCells[13].textContent);
    //defensive rebounds
    boxScoreArray[8] = parseInt(tdCells[14].textContent);
    //total rebounds
    boxScoreArray[9] = parseInt(tdCells[15].textContent);
    //assists
    boxScoreArray[10] = parseInt(tdCells[16].textContent);
    //steals
    boxScoreArray[11] = parseInt(tdCells[10].textContent);
    //blocks
    boxScoreArray[12] = parseInt(tdCells[11].textContent);
    //turnovers
    boxScoreArray[13] = parseInt(tdCells[12].textContent);
    //personal fouls
        //undefined
    //points
    boxScoreArray[15] = parseInt(tdCells[17].textContent);
    return boxScoreArray;
};

//Insert the wins produced info into a given row
function addStatsSeasonTotalsRow(row, stats)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wp48TD = document.createElement('td');
    var wpTD = document.createElement('td');
    //set their text
    wp48TD.textContent = stats[1];
    wpTD.textContent = stats[2];
    //insert them into the document
    row.insertBefore(buffer, row.lastChild.nextSibling);
    row.insertBefore(wp48TD, row.lastChild.nextSibling);
    row.insertBefore(wpTD, row.lastChild.nextSibling);
};