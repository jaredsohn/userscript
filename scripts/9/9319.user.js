// ==UserScript==
// @name			GDR Pitching Probables
// @namespace		http://www.boxcardata.com
// @description		For players of GameDayRitual.com's Fantasy Baseball, provides a mouseover with the date of the next likely start for each pitcher on the lineup and matchup pages.
// @include			http://gamedayritual.mlb.com/baseball/clubhouse/lineup.aspx
// @include			http://gamedayritual.mlb.com/baseball/leaguehome/matchup*
// @include			http://www.gamedayritual.com/baseball/clubhouse/lineup.aspx
// @include			http://www.gamedayritual.com/baseball/leaguehome/matchup.aspx*
// @creator			Pat Markland |pmarkland<at>yahoo<dot>com|
// @version			1.3
// @date			2009-08-01
// ==/UserScript==

// Global variables
var gsESPNSearchString = "/mlb/players/profile?playerId";
var gsESPNProbablesURLString = "http://espn.go.com/mlb/probables/_/date/";
var gxToday = new Date();
var gnDatesFetched = 0;
var gnNumberOfDaysToGet = 6;

var aWeekday = new Array(7);
aWeekday[0]="Sunday";
aWeekday[1]="Monday";
aWeekday[2]="Tuesday";
aWeekday[3]="Wednesday";
aWeekday[4]="Thursday";
aWeekday[5]="Friday";
aWeekday[6]="Saturday";

var aProbables = new Array();

// Begin functions
function getGDRNodes(){
	return document.evaluate("//a[@class=\"PlayerCardLink\"]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

// ## DATE FUNCTIONS
function getDayFromOffset(dayOffset){
	var x_dayToUse = new Date(gxToday.getFullYear(), gxToday.getMonth(), gxToday.getDate() + dayOffset);
	return x_dayToUse;
}

function getDateStringFromOffset(dayOffset){
	var x_dayToUse = getDayFromOffset(dayOffset);

	var s_year = x_dayToUse.getFullYear().toString();
	
	var s_month = x_dayToUse.getMonth() + 1;
	s_month = s_month.toString();	
	if (s_month.length < 2) {
		s_month = '0' + s_month;
	}

	var s_day = x_dayToUse.getDate().toString();	
	if (s_day.length < 2) {
		s_day = '0' + s_day;
	}
	var s_return = s_year + s_month + s_day;
	return s_return;
}

function getDayOfWeekFromOffset(dayOffset){
	var x_dayToUse = getDayFromOffset(dayOffset);
	var s_return = aWeekday[x_dayToUse.getDay()]
	if(dayOffset == 0){
		s_return += ' (Today)';
	}
	else if(dayOffset == 1) {
		s_return += ' (Tomorrow)';
	}
	return s_return;
}


// ## NAME-PARSING FUNCS
function parseFirstInitialFromESPNName(sName){
	var s_firstInitial = sName.substr(0, sName.indexOf(' ') - 1);
	return s_firstInitial;
}

function parseLastNameFromESPNName(sName){
	var s_lastName = sName.substr(sName.indexOf(' ') + 1);
	return s_lastName;
}

function parseLastNameFromGDRName(sName){
	var s_lastName = sName.substr(0, sName.indexOf(' ') - 1);
	return s_lastName;
}

function parseFirstInitialFromGDRName(sName){
	var s_firstInitial = sName.substr(sName.length - 3, 1);
	return s_firstInitial;
}


//## HTTP REQUEST TO ESPN
function main(){
	addTempMouseOvers();
	for(i = 0; i <= gnNumberOfDaysToGet - 1; i++){
		sendRequestToESPN(i);			
	}
}

function sendRequestToESPN(nOffset){
	var s_dateString = getDateStringFromOffset(nOffset);
	var s_dayOfWeek = getDayOfWeekFromOffset(nOffset);
	GM_xmlhttpRequest
		({
			method:'GET',
	//			url: 'http://sports.espn.go.com/mlb/probables?date=20070509',
			url: gsESPNProbablesURLString + s_dateString,
			onload:function(responseDetails){		
				parseProbablesFromESPN(responseDetails, s_dayOfWeek);	
				++gnDatesFetched;						
				if (gnDatesFetched == gnNumberOfDaysToGet) {
					addMouseOvers();
				}
			}
		});				
}

function parseProbablesFromESPN(responseDetails, sDayOfWeek){
	var page = responseDetails.responseText;
	var n_anchorStart = page.indexOf(gsESPNSearchString);
	var n_anchorEnd = 0;
	var s_slice;
	var s_name;
	var x_probable;
	var s_lastName;
	var s_firstInitial;
	var n_eraStart;
	var n_eraEnd;
	var s_era;
	while(n_anchorStart != -1){					
		n_anchorEnd = page.indexOf("</a>", n_anchorStart);
		s_slice = page.slice(n_anchorStart, n_anchorEnd);
		s_name = s_slice.substr(s_slice.indexOf('>') + 1);
		s_firstInitial = parseFirstInitialFromESPNName(s_name);
		s_lastName = parseLastNameFromESPNName(s_name);
				
		// look for the ERA
		n_eraStart = page.indexOf("td align=", n_anchorEnd + 1) + 18;
		n_eraEnd = page.indexOf("\/td", n_eraStart) - 1;
		s_era = page.substring(n_eraStart, n_eraEnd);
		
		x_probable = {lastname: s_lastName, firstinitial: s_firstInitial, dow: sDayOfWeek, era: s_era};		
		aProbables.push(x_probable);
		n_anchorStart = page.indexOf(gsESPNSearchString, n_anchorEnd);
	}				
}

// ## ADD TO OUR PAGE
function addTempMouseOvers(){
	var thisNode;
	var s_pitcherName;
	var s_startDay;
	var s_display;
	for(i = 1; i < nodes.snapshotLength; i++) {
    	thisNode = nodes.snapshotItem(i);
    	thisNode.setAttribute('title', 'Getting next start info...');		    	
	}
}

function addMouseOvers(){
	var thisNode;
	var s_pitcherName;
	var s_startDay;
	var s_display;
	for(i = 1; i < nodes.snapshotLength; i++) {
    	thisNode = nodes.snapshotItem(i);    	
    	if (window.location.href.indexOf('matchup') != -1) {
    		s_pitcherName = thisNode.parentNode.firstChild.innerHTML;
		}
		else{
			// lineup page
			if (thisNode.firstChild.nodeValue != null) {
				s_pitcherName = thisNode.firstChild.nodeValue;
			}
			else{
				// Pitcher on DL changes things
				s_pitcherName = thisNode.firstChild.firstChild.nodeValue;
			}		
		}		
		if (s_pitcherName != null) {
			s_startDay = getProbableStartDayForPitcher(s_pitcherName);		
			if (window.location.href.indexOf('matchup') != -1
					&& s_startDay == 'N/A') {
				s_display = '';
			}
			else{
				s_display = s_pitcherName + ' next start: ' + s_startDay;		
			}			
    		thisNode.setAttribute('title', s_display);				
		}
	}
}

function getProbableStartDayForPitcher(sPitcher){
	var s_lastName = parseLastNameFromGDRName(sPitcher);
	var s_firstInitial = parseFirstInitialFromGDRName(sPitcher);
	var s_startDay = 'N/A';
	var n_index = 0;
	while(n_index < aProbables.length){
		if(s_lastName == aProbables[n_index].lastname
				&& s_firstInitial == aProbables[n_index].firstinitial){
			s_startDay = aProbables[n_index].dow;
			break;
		}
		++n_index;
	}
	return s_startDay;
}
// End functions

// Begin main

// Collect the nodes
var nodes = getGDRNodes();
if(!nodes){
	return;
}

main();

// End main