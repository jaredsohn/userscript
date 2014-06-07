// ==UserScript==
// @name           ESPNboxscoreWoW
// @namespace      http://userscripts.org/users/72607
// @description    Add win score, wins produced, and wp48 to espn box scores
// @include        http://*espn.go.com/nba/boxscore*
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

//parse gamestatus class to determine whether it is a live game
var live = 0;
var gameStatus = document.evaluate("//div[@class='status-bar status-final']", document.body, null, 
                                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

											
if(gameStatus.snapshotItem(0) == null)
{
    live = 1;
}else{
	live = 0;
}

//get the team name headings
var teamHeadings = document.evaluate("//tr[@class='stathead']", document.body, null, 
                                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//get the stat table headings
var tableHeadings = document.evaluate("//tr[@class='colhead']", document.body, null, 
                                            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//get the aggregate team stats rows
var teamStatRows = document.evaluate("//tr[@class='oddrow']/td[1][@colspan='2']/parent::*[count(td) > 5] | //tr[@class='evenrow']/td[1][@colspan='2']/parent::*[count(td) > 5]", document.body, null, 
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
											
//get the last row of each team's stats, seems to be for spacing
var spacingRows = document.evaluate("//tr[@class='oddrow' and not(@align)] | //tr[@class='evenrow' and not(@align)]", document.body, null, 
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                         
//get the rows of player stats
var playerRows = document.evaluate("//tr[@class='oddrow']/td[1][@nowrap]/parent::* | //tr[@class='evenrow']/td[1][@nowrap]/parent::*", document.body, null, 
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//for each team heading, change it's colspan to accomodate the new columns
for(var k = 0; k < teamHeadings.snapshotLength; k++)
{
   fixColspan(teamHeadings.snapshotItem(k));
}                                                                                     
//for each stat column heading, add the extra stats
for(var j = 0; j < tableHeadings.snapshotLength; j++)
{
    addStatHeading(tableHeadings.snapshotItem(j));
}
//fix up the aggregate team stats rows
for(var l = 0; l < teamStatRows.snapshotLength; l++)
{
    fixTeamStatRow(teamStatRows.snapshotItem(l));
}
//fix spacing rows
for(var m = 0; m < spacingRows.snapshotLength; m++)
{
    fixColspan(spacingRows.snapshotItem(m));
}
//for each player row, calculate the win score stats and display the data                                           
for(var i = 0; i < playerRows.snapshotLength; i++)
{
    var currentRow = playerRows.snapshotItem(i);
    var boxScoreData = parseRow(currentRow);
    var stats = calculateStats(boxScoreData);
    addStats(currentRow, stats);
    
}

//END SCRIPT

//FUNCTIONS

//parse a player row and return an array of values.
//format of returned array is as follows
//0     1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  
//min   fgm fga 3pm 3pa ftm fta orb drb trb ast stl blk to  pf  pts 
function parseRow(playerRow)
{
    var boxScoreArray = new Array();
    var tdCells = playerRow.getElementsByTagName('td');
    //check if the player is DNP
    //using a hack for live data, it has one less td cell because it does not have DRB
    if(tdCells.length < 14 - live)    {
        return null;
    }
    //minutes
    boxScoreArray[0] = parseInt(tdCells[1].textContent);
    //field goals made
    boxScoreArray[1] = parseInt(tdCells[2].textContent.substring(0, tdCells[2].textContent.indexOf('-')));
    //field goals attempted
    boxScoreArray[2] = parseInt(tdCells[2].textContent.substring(tdCells[2].textContent.indexOf('-')+1));
    //3-point field goals made
    boxScoreArray[3] = parseInt(tdCells[3].textContent.substring(0, tdCells[3].textContent.indexOf('-')));
    //3-point field goals attempted
    boxScoreArray[4] = parseInt(tdCells[3].textContent.substring(tdCells[3].textContent.indexOf("-")+1));
    //free throws made
    boxScoreArray[5] = parseInt(tdCells[4].textContent.substring(0, tdCells[4].textContent.indexOf('-')));
    //free throws attempted
    boxScoreArray[6] = parseInt(tdCells[4].textContent.substring(tdCells[4].textContent.indexOf('-')+1));
    //offensive rebounds
    boxScoreArray[7] = parseInt(tdCells[5].textContent);
    
    //using a hack for this, live scores do not have DRB, whereas old box scores do
    //total rebounds
    boxScoreArray[9] = parseInt(tdCells[7-live].textContent);
    
    //defensive rebounds
    boxScoreArray[8] = boxScoreArray[9] - boxScoreArray[7];
    
    //assists
    boxScoreArray[10] = parseInt(tdCells[8-live].textContent);
    //steals
    boxScoreArray[11] = parseInt(tdCells[9-live].textContent);
    //blocks
    boxScoreArray[12] = parseInt(tdCells[10-live].textContent);
    //turnovers
    boxScoreArray[13] = parseInt(tdCells[11-live].textContent);
    //personal fouls
    boxScoreArray[14] = parseInt(tdCells[12-live].textContent);
    //points
    boxScoreArray[15] = parseInt(tdCells[14-live].textContent);
    //position adjustment
    var position = tdCells[0].textContent.substring(tdCells[0].textContent.lastIndexOf(' ')+1);
    var positionAdjustment = -1;
    switch(position)
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
    boxScoreArray[16] = positionAdjustment;
    return boxScoreArray;
};

//Takes an array of data created from parseRow and produces an array of stats.
//format of returned array is as follows
//0     1       2
//ws    wp48    wp
function calculateStats(boxScore)
{
    if(boxScore == null)    {
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
        //lets round wp48 and wp to the nearest 3 decimal places
        statsArray[1] = Math.round(statsArray[1]*Math.pow(10,3))/Math.pow(10,3);
        statsArray[2] = Math.round(statsArray[2]*Math.pow(10,3))/Math.pow(10,3);
        return statsArray;
    }
};

//Insert the wins produced info into a given row
function addStats(row, stats)
{
    if(stats == null)
    {//this is a DNP, just extend the DNP cell
        var oldColspan = parseInt(row.lastChild.getAttribute('colspan'));
        row.lastChild.setAttribute('colspan', oldColspan+4);
        return;
    }
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

//add new headings to the table
function addStatHeading(heading)
{
    //create the elements to insert into the table
    var buffer = document.createElement('td');
    var wsTD = document.createElement('td');
    var wp48TD = document.createElement('td');
    var wpTD = document.createElement('td');
    //set their text
    wsTD.textContent = 'WS';
    wp48TD.textContent = 'WP48';
    wpTD.textContent = 'WP';
    //insert them into the document
    heading.insertBefore(buffer, heading.lastChild.nextSibling);
    heading.insertBefore(wsTD, heading.lastChild.nextSibling);
    heading.insertBefore(wp48TD, heading.lastChild.nextSibling);
    heading.insertBefore(wpTD, heading.lastChild.nextSibling);
};

//fix the colspan attribute to accomodate the extra 4 cells
function fixColspan(row)
{
    var tdElem = row.getElementsByTagName('td')[0];
    var oldColspan = parseInt(tdElem.getAttribute('colspan'));
    tdElem.setAttribute('colspan', oldColspan+4);
};

//fix the rows with aggregated team stats to accomodate the extra 4 cells
function fixTeamStatRow(teamStatRow)
{
    var buffer = document.createElement('td');
    teamStatRow.insertBefore(buffer, teamStatRow.lastChild.nextSibling);
    for(var i = 0; i < 3; i++)
    {
        var emptyTD = document.createElement('td');
        emptyTD.textContent = 'NYI';
        teamStatRow.insertBefore(emptyTD, teamStatRow.lastChild.nextSibling);
    }
};