// ==UserScript==
// @name           Stratomatic Stat Ticker
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/your_teams.html
// ==/UserScript==

var teamName;
var teamName2;
var record;
var record2;
var place;
var gb;
var recordArray = new Array();
var teamNameArray = new Array();
var teamNameArray2 = new Array();
var teamLinkArray = new Array();
var statStringArray = new Array();
var statStringArray2 = new Array();
var gamesPlayed;
var count = -1;
var statsString = '';
var todaysWins = GM_getValue('todaysWins', 0);
var todaysLosses = GM_getValue('todaysLosses', 0);

var todaysGameTotal;
var actualGameTotal;

var HIDDEN_DIV_ID = 'baseballsimulatorDiv';

var teamNames = document.evaluate("//table[@class='datatab_nowidth']/tbody/tr/td/a[not(contains(string(),'See all'))]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var records = document.evaluate("//table[@class='datatab_nowidth']/tbody/tr/td[8][contains(string(),'-')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var lastRow = document.evaluate("//td[@class='odd'][@colspan='9']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

lastRow = lastRow.snapshotItem(0);

var todaysRecord = document.createElement("td");
var todaysRecord2 = document.createElement("td");


todaysRecord.setAttribute('class', 'odd'); 
todaysRecord.setAttribute('nowrap', ''); 
todaysRecord.setAttribute('colspan', '1'); 
todaysRecord.setAttribute('title', 'Last night\'s combined record');
todaysRecord.setAttribute('align', 'right');
todaysRecord2.setAttribute('class', 'odd'); 
todaysRecord2.setAttribute('colspan', '7'); 

todaysRecord2.innerHTML = '';




var storedStatString = GM_getValue('record', '');

var tempString;


statStringArray = storedStatString.split("*");




for (var i=0;i < teamNames.snapshotLength;i++)
{

	teamName = teamNames.snapshotItem(i);
	teamName2 = teamName.textContent;

	teamName = teamName.href;

	teamName = teamName.substring(teamName.indexOf('team_id=')+8);

	record = records.snapshotItem(i);

	place = record.previousSibling;
	gb = record.nextSibling;

	record2 = record.textContent;

	

	recordArray = record2.split('-');
	gamesPlayed = parseInt(recordArray[0]) + parseInt(recordArray[1]);


	if(record2 != '0-0' && gamesPlayed < 162){

		count++;
		teamNameArray[count] = teamName;
		teamNameArray2[count] = teamName2;


		if(count == statStringArray.length){

			statStringArray.push('');			

		}		


		if(statStringArray != ''){

			statStringArray2 = statStringArray[count].split(",");
			
		}
		else
		{
		
			statStringArray2.length = 0;

		}


		statsString += place.textContent + ',' + record2 + ',' + gb.textContent + '*';
		tempString = place.textContent + ',' + record2 + ',' + gb.textContent;

		if(statStringArray2.length > 1){

			
			if(place.textContent != statStringArray2[0]){

				
				if(parseFloat(place.textContent) < parseFloat(statStringArray2[0])){

					place.setAttribute('style','font-weight: bold;color: green;');

				}
				else
				{
				
					place.setAttribute('style','font-weight: bold;color: red;');

				}
	
			}

		}

		if(statStringArray2.length > 1){


		var record2Array = record2.split('-');
		var record2Array2 = statStringArray2[1].split('-');
		var record2Array2Temp = parseFloat(record2Array2) + 1;

		
			

		if(record2 != statStringArray2[1]){


			todaysGameTotal = statStringArray.length * 3;

			savedGameTotal = GM_getValue('actualGametotal', 0);

			if(savedGameTotal >= todaysGameTotal){

				todaysWins = 0;
				todaysLosses = 0;
			}

			

			todaysWins += record2Array[0] - record2Array2[0];
			todaysLosses += record2Array[1] - record2Array2[1];	
			
	
			actualGameTotal = todaysWins + todaysLosses;		

			GM_setValue('todaysWins', todaysWins);
			GM_setValue('todaysLosses', todaysLosses);
			GM_setValue('actualGametotal', actualGameTotal);



			if(todaysWins < 0){

				todaysWins = 0;

			}

			if(todaysLosses < 0){

				todaysLosses = 0;

			}

			if(actualGameTotal < 0){

				actualGameTotal = 0;

			}			



			if(record2Array[0] > record2Array2Temp){

				record.setAttribute('style','font-weight: bold;color: green;');

			}
			else
			{

				record.setAttribute('style','font-weight: bold;color: red;');

			}


		}


		todaysRecord.innerHTML = todaysWins + "-" + todaysLosses;
		lastRow.parentNode.insertBefore(todaysRecord2,lastRow);
		lastRow.parentNode.insertBefore(todaysRecord,lastRow);		

		var gb2 = parseFloat(gb.textContent);

		if(isNaN(gb2) == true){
		
			gb2 = 0;

		}

		var gb3 = parseFloat(statStringArray2[2]);

	
		if(isNaN(gb3) == true){
		
			gb3 = 0;

		}
		

		if(gb.textContent != statStringArray2[2]){

			if(gb2 < gb3){

				gb.setAttribute('style','font-weight: bold;color: green;');

			}
			else
			{
				gb.setAttribute('style','font-weight: bold;color: red;');

			}


		

		}

		}//if(statStringArray2.length != 0)


	}


}


statsString = statsString.substring(0,statsString.length-1);
GM_setValue('record', statsString);

var randomnumber=Math.floor(Math.random()*teamNameArray.length);


var u;

var recordsArrayBatting = new Array();
var recordsArrayPitching = new Array();

var avgArray = new Array();
var runsscoredArray = new Array();
var hitsArray = new Array();
var doublesArray = new Array();
var triplesArray = new Array();
var homerunsArray = new Array();
var runsbattedinArray = new Array();
var walksArray = new Array();
var intentionalwalksArray = new Array();
var strikeoutsArray = new Array();
var hitbypitchArray = new Array();
var sacrificehitsArray = new Array();
var stolenbasesArray = new Array();
var stolenbasepctArray = new Array();
var gidpArray = new Array();
var hittingstreakArray = new Array();
var sluggingpctArray = new Array();
var onbasepctArray = new Array();
var runscreated27outArray = new Array();
var totalaverageArray = new Array();
var totalbasesArray = new Array();
var batavgvsleftArray = new Array();
var hrvsleftArray = new Array();
var batavgvsrightArray = new Array();
var hrvsrightArray = new Array();
var errorsArray = new Array();
var opponentstealsArray = new Array();
var opponentsbpctArray = new Array();




var winsArray = new Array();
var lossesArray = new Array();
var winningpctArray = new Array();
var eraArray = new Array();
var inningspitchedArray = new Array();
var tbfArray = new Array();
var gamespitchedArray = new Array();
var completegamesArray = new Array();
var gamesfinishedArray = new Array();
var savesArray = new Array();
var savepctArray = new Array();
var shutoutsArray = new Array();
var hitsallowedArray = new Array();
var runsArray = new Array();
var earnedrunsArray = new Array();
var homerunsallowedArray = new Array();
var pitcherwalksArray = new Array();
var pitcherstrikeoutsArray = new Array();
var wildpitchesArray = new Array();
var balksArray = new Array();
var pitcheropponentstealsArray = new Array();
var pitcheropponentsbpctArray = new Array();
var hits9inningsArray = new Array();
var bb9inningsArray = new Array();
var ks9inningsArray = new Array();
var hrs9inningsArray = new Array();
var opponentbatavgArray = new Array();
var leftoppbatavgArray = new Array();
var rightoppbatavgArray = new Array();
var runsupportArray = new Array();
var inheritedscoreArray = new Array();
var strikeoutswalksArray = new Array();

var mvpArray = new Array();
var cyyoungArray = new Array();


//awards voting displays 1 out of 9 times?

var rndPage=Math.floor(Math.random()*10);


if(rndPage < 9){

	setTimeout( callFirstGM_xmlhttpRequest, 1000);

}
else
{

	setTimeout( callSecondGM_xmlhttpRequest, 1000);

}


//Awards voting
function callSecondGM_xmlhttpRequest(){

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasygames.sportingnews.com/stratomatic/league/stats_award_voting.html?user_id='+teamNameArray[randomnumber],
    //url: 'http://fantasygames.sportingnews.com/stratomatic/league/stats_leaders.html',	
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s = new String(details.responseText);

   var document = appendToDocument(s);
    }
});	

function appendToDocument(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;


	//code goes here
var teamLinks = document.evaluate("//table/tbody/tr/td[@class='text10']/following::a[contains(@href,'team_other')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var abbreviations = document.evaluate("//table/tbody/tr/td[@class='text10']/descendant::td[string-length(string())<4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var teamLink;
var teamLink2;
var abbr;
var anchorName;
var theText;


for (var i = 0; i < abbreviations.snapshotLength; i++) {


	abbr = abbreviations.snapshotItem(i);
	teamLink = teamLinks.snapshotItem(i);	

	anchorName = abbr.textContent;

	teamLink2 = teamLink.href;
	theText = teamLink.textContent;		

	teamLink2 = '<a href="'+ teamLink2 + '&stats=sim&onroster=1" title="' + theText + '" target="_blank">' + anchorName + '</a>';


	teamLinkArray.push(teamLink2);

	
}

var pre = document.evaluate("//pre", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

pre = pre.snapshotItem(0);
pre = pre.textContent;
u = pre;

	//MVP AWARD
	var mvp = u.indexOf('CY YOUNG AWARD');

	var mvpString = u.substring(mvp + 15, mvp + 15 + 40);

	var cyyoungString = u.substring(u.indexOf(mvpString)+mvpString.length,u.length);
	cyyoungString = cyyoungString.substring(0,cyyoungString.indexOf(')')+5);

	var mvpString2 = u.substring(u.indexOf(cyyoungString)+cyyoungString.length,u.length);
	mvpString2 = mvpString2.substring(0,mvpString2.indexOf(')')+5);

	var cyyoungString2 = trim(u.substring(u.indexOf(mvpString2)+mvpString2.length,u.length));
	cyyoungString2 = cyyoungString2.substring(0,cyyoungString2.indexOf(')')+5);

	var mvpString3 = u.substring(u.indexOf(cyyoungString2)+cyyoungString2.length,u.length);
	mvpString3 = mvpString3.substring(0,mvpString3.indexOf(')')+5);	

	var cyyoungString3 = trim(u.substring(u.indexOf(mvpString3)+mvpString3.length,u.length));
	cyyoungString3 = cyyoungString3.substring(0,cyyoungString3.indexOf(')')+5);

	//team abbreviation
	myTempString = mvpString.substring(mvpString.indexOf('(')+1,mvpString.indexOf(')'));
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		mvpString = mvpString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		mvpString = mvpString.replace(myTempString,myTempString2);

	}

	myTempString = mvpString2.substring(mvpString2.indexOf('(')+1,mvpString2.indexOf(')'));
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		mvpString2 = mvpString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		mvpString2 = mvpString2.replace(myTempString,myTempString2);

	}

	myTempString = mvpString3.substring(mvpString3.indexOf('(')+1,mvpString3.indexOf(')'));
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		mvpString3 = mvpString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		mvpString3 = mvpString3.replace(myTempString,myTempString2);

	}

	myTempString = cyyoungString.substring(cyyoungString.indexOf('(')+1,cyyoungString.indexOf(')'));
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		cyyoungString = cyyoungString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		cyyoungString = cyyoungString.replace(myTempString,myTempString2);

	}

	myTempString = cyyoungString2.substring(cyyoungString2.indexOf('(')+1,cyyoungString2.indexOf(')'));
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		cyyoungString2 = cyyoungString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		cyyoungString2 = cyyoungString2.replace(myTempString,myTempString2);

	}

	myTempString = cyyoungString3.substring(cyyoungString3.indexOf('(')+1,cyyoungString3.indexOf(')'));
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		cyyoungString3 = cyyoungString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		cyyoungString3 = cyyoungString3.replace(myTempString,myTempString2);

	}


	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		
		if(noRegex.indexOf('">') != -1){


			var checkNameLength = teamLinkArray[i].substring(teamLinkArray[i].indexOf('target="_blank">')+16,teamLinkArray[i].indexOf('</a>'));

			if(checkNameLength.length == 1){

				teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-4)+ '__</a>';
				regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
			}
			else if(checkNameLength.length == 2){
			
				teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-4)+ '_</a>';
				regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));

			}
		
		}
		
	

		if(mvpString.search(regex) != -1){

					

			if(mvpString.indexOf('team_other.html') == -1){
				//avgString = avgString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				mvpString = mvpString.replace(regex,teamLinkArray[i]);
				mvpString = trim(mvpString);
			}

		}
		if(mvpString2.search(regex) != -1){

			if(mvpString2.indexOf('team_other.html') == -1){
				//avgString2 = avgString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				mvpString2 = mvpString2.replace(regex,teamLinkArray[i]);
				mvpString2 = trim(mvpString2);
				
			}

		}
		if(mvpString3.search(regex) != -1){

			if(mvpString3.indexOf('team_other.html') == -1){
				//avgString3 = avgString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				mvpString3 = mvpString3.replace(regex,teamLinkArray[i]);
				mvpString3 = trim(mvpString3);
			}

		}
//////////////////////////////
		if(cyyoungString.search(regex) != -1){

					

			if(cyyoungString.indexOf('team_other.html') == -1){
				//avgString = avgString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				cyyoungString = cyyoungString.replace(regex,teamLinkArray[i]);
				cyyoungString = trim(cyyoungString);
			}

		}
		if(cyyoungString2.search(regex) != -1){

			if(cyyoungString2.indexOf('team_other.html') == -1){
				//avgString2 = avgString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				cyyoungString2 = cyyoungString2.replace(regex,teamLinkArray[i]);
				cyyoungString2 = trim(cyyoungString2);
				
			}

		}
		if(cyyoungString3.search(regex) != -1){

			if(cyyoungString3.indexOf('team_other.html') == -1){
				//avgString3 = avgString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				cyyoungString3 = cyyoungString3.replace(regex,teamLinkArray[i]);
				cyyoungString3 = trim(cyyoungString3);
			}

		}
		

		

	}


		mvpArray.push(mvpString);
		mvpArray.push(mvpString2);
		mvpArray.push(mvpString3);

		cyyoungArray.push(cyyoungString);
		cyyoungArray.push(cyyoungString2);
		cyyoungArray.push(cyyoungString3);

	var myNamesArray = new Array();
	var myTeamsArray = new Array();
	var myStatsArray = new Array();

	var myNamesPitchingArray = new Array();
	var myTeamsPitchingArray = new Array();
	var myStatsPitchingArray = new Array();		

	for (var i = 0; i < mvpArray.length; i++) {

		if(mvpArray[i].indexOf('***') != -1){
			
			myNamesArray[i] = mvpArray[i].substring(0,mvpArray[i].indexOf('('));
			myTeamsArray[i] = mvpArray[i].substring(mvpArray[i].indexOf('(')+1,mvpArray[i].indexOf(')')+1);
			myStatsArray[i] = mvpArray[i].substring(mvpArray[i].indexOf(')')+1);

		}
		else
		{
			myNamesArray[i] = mvpArray[i].substring(0,mvpArray[i].indexOf('('));
			myTeamsArray[i] = mvpArray[i].substring(mvpArray[i].indexOf('(')+1,mvpArray[i].indexOf('</a>')+4);
			myStatsArray[i] = mvpArray[i].substring(mvpArray[i].indexOf(')')+1);
							       
		}

	}

	for (var i = 0; i < cyyoungArray.length; i++) {

		if(cyyoungArray[i].indexOf('***') != -1){
			
			myNamesPitchingArray[i] = cyyoungArray[i].substring(0,cyyoungArray[i].indexOf('('));
			myTeamsPitchingArray[i] = cyyoungArray[i].substring(cyyoungArray[i].indexOf('(')+1,cyyoungArray[i].indexOf(')')+1);
			myStatsArray[i] = cyyoungArray[i].substring(cyyoungArray[i].indexOf(')')+1);

		}
		else
		{
			myNamesPitchingArray[i] = cyyoungArray[i].substring(0,cyyoungArray[i].indexOf('('));
			myTeamsPitchingArray[i] = cyyoungArray[i].substring(cyyoungArray[i].indexOf('(')+1,cyyoungArray[i].indexOf('</a>')+4);
			myStatsPitchingArray[i] = cyyoungArray[i].substring(cyyoungArray[i].indexOf(')')+1);
							       
		}

	}

//////////////////////////////

//var newTeamLink = document.evaluate("//table[@width='740'][3]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var newTeamLink = document.evaluate("//table[@class='datatab_nowidth']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

newTeamLink = newTeamLink.snapshotItem(0);

var myTable2 = document.createElement("table");
myTable2.setAttribute('class', 'odd'); 
myTable2.setAttribute('width', '740'); 
myTable2.setAttribute('cellspacing', '1'); 
myTable2.setAttribute('cellpadding', '1'); 
myTable2.setAttribute('border', '0'); 
myTable2.setAttribute('align', 'center'); 

myTable2.innerHTML = '<tr class="odd"><td class="odd text12" colspan="2">&nbsp;</td></tr><tr class="odd"><td class="odd text12" colspan="2"><b>Stat Leaders: '+teamNameArray2[randomnumber]+' League</b></td></tr>';


var myTable = document.createElement("table");
myTable.setAttribute('class', 'odd'); 
myTable.setAttribute('width', '740'); 
myTable.setAttribute('cellspacing', '1'); 
myTable.setAttribute('cellpadding', '1'); 
myTable.setAttribute('border', '0'); 
myTable.setAttribute('align', 'center'); 

var myTableInnerHTML;

if(myNamesArray[0]==''){

	myTableInnerHTML = '';

}
else
{
myTableInnerHTML = '<tbody>'+'\r\n'+
	'<tr>'+ '\r\n'+
   	'<td>'+'\r\n'+
    	'<table id="90s records1" width="370" class="datatab_nowidth" border="0" cellspacing="1" cellpadding="1">'+'\r\n'+
	'<tbody>'+'\r\n'+
     	'<tr>'+'\r\n'+
      	'<td>'+'\r\n'+
	'<strong>'+'MVP AWARD VOTING'+'</strong>' +'\r\n'+ 
	'</td>'+'\r\n'+
      	'<td>'+'\r\n'+ 
	'</td>'+'\r\n'+	
      	'<td>'+'\r\n'+
	'</td>'+'\r\n'+	
     	'</tr>'+'\r\n';
	
	for (var i = 0; i < 3; i++) {

		var m2 = i/2;

		if(myNamesArray[i] == '              '){

			myNamesArray[i] = '&nbsp;';

		}

		if(myNamesArray[i].indexOf('TIED') != -1){
			
			myNamesArray[i] = 'TIED';
			myTeamsArray[i] = '&nbsp;';
			myStatsArray[i] = '&nbsp;';
		}

		if (m2 == m2.toFixed()){

			myTableInnerHTML+= '<tr class="odd">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';
		}
		else
		{
			myTableInnerHTML+= '<tr class="even">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';

		}

	}
	myTableInnerHTML+= '</tbody>'+'\r\n'+	
    	'</table>'+'\r\n'+
   	'</td>'+'\r\n'+
   	'<td>'+'\r\n'+
    	'<table id="90s records2" width="370" class="datatab_nowidth" border="0" cellspacing="1" cellpadding="1">'+'\r\n'+
	'<tbody>'+'\r\n'+	
     	'<tr>'+'\r\n'+
      	'<td>'+'\r\n'+
       	'<strong>'+'CY YOUNG AWARD VOTING'+'</strong>' +'\r\n'+ 
      	'</td>'+'\r\n'+
      	'<td>'+'\r\n'+ 
	'</td>'+'\r\n'+	
      	'<td>'+'\r\n'+
	'</td>'+'\r\n'+	
	'</tr>'+'\r\n';

	for (var i = 0; i < 3; i++) {

		var m2 = i/2;

		if(myNamesPitchingArray[i] == '              '){

			myNamesPitchingArray[i] = '&nbsp;';

		}		

		if(myNamesPitchingArray[i].indexOf('TIED') != -1){
			
			myNamesPitchingArray[i] = 'TIED';
			myTeamsPitchingArray[i] = '&nbsp;';
			myStatsPitchingArray[i] = '&nbsp;';
		}		

		if (m2 != m2.toFixed()){

			myTableInnerHTML+= '<tr class="even">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesPitchingArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';
		}
		else
		{
			myTableInnerHTML+= '<tr class="odd">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesPitchingArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';

		}
	}

	myTableInnerHTML+= '</tbody>';

var mySubString;
var myReg;

for (var i=0;i < teamNameArray.length;i++){

	if(myTableInnerHTML.indexOf(teamNameArray[i])!= -1){


		mySubString = myTableInnerHTML.substring(myTableInnerHTML.indexOf(teamNameArray[i]),myTableInnerHTML.indexOf('\r\n',myTableInnerHTML.indexOf(teamNameArray[i])+1));

		myReg = new RegExp(mySubString,'g');

		mySubString = mySubString.replace('>','><b>');
		mySubString = mySubString.replace('</a>','</b></a>');

		myTableInnerHTML = myTableInnerHTML.replace(myReg,mySubString);

	}


}



myTable.innerHTML = myTableInnerHTML;


newTeamLink.parentNode.insertBefore(myTable,newTeamLink.nextSibling);
newTeamLink.parentNode.insertBefore(myTable2,newTeamLink.nextSibling);


}

        return document;
}	


}



function callFirstGM_xmlhttpRequest(){

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasygames.sportingnews.com/stratomatic/league/stats_leaders.html?user_id='+teamNameArray[randomnumber],
    //url: 'http://fantasygames.sportingnews.com/stratomatic/league/stats_leaders.html',	
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s = new String(details.responseText);

   var document = appendToDocument(s);
    }
});



function appendToDocument(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;


var teamLinks = document.evaluate("//table/tbody/tr/td[@class='text10']/following::a[contains(@href,'team_other')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var abbreviations = document.evaluate("//table/tbody/tr/td[@class='text10']/descendant::td[string-length(string())<4]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var teamLink;
var teamLink2;
var abbr;
var anchorName;
var theText;


for (var i = 0; i < abbreviations.snapshotLength; i++) {


	abbr = abbreviations.snapshotItem(i);
	teamLink = teamLinks.snapshotItem(i);	

	anchorName = abbr.textContent;

	teamLink2 = teamLink.href;
	theText = teamLink.textContent;		

	teamLink2 = '<a href="'+ teamLink2 + '&stats=sim&onroster=1" title="' + theText + '" target="_blank">' + anchorName + '</a>';

	teamLinkArray.push(teamLink2);

	
}

var pre = document.evaluate("//pre", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

pre = pre.snapshotItem(0);
pre = pre.textContent;
u = pre;


///----BATTING AVERAGE----///
	var avg = u.indexOf('----BATTING AVERAGE----');
	var avgString = u.substring(avg + 79, avg + 79 + 23);
	var avgString2 = u.substring(avg + 159, avg + 159 + 23);
	var avgString3 = u.substring(avg + 239, avg + 239 + 23);

	var myTempString;
	var myTempString2;	

	//team abbreviation
	myTempString = avgString.slice(14,17);
	myTempString2 = trim(myTempString);


	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		avgString = avgString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		avgString = avgString.replace(myTempString,myTempString2);

	}

	myTempString = avgString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		avgString2 = avgString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		avgString2 = avgString2.replace(myTempString,myTempString2);

	}	

	myTempString = avgString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		avgString3 = avgString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		avgString3 = avgString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		
		if(noRegex.indexOf('">') != -1){


			var checkNameLength = teamLinkArray[i].substring(teamLinkArray[i].indexOf('target="_blank">')+16,teamLinkArray[i].indexOf('</a>'));

			if(checkNameLength.length == 1){

				teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-4)+ '__</a>';
				regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
			}
			else if(checkNameLength.length == 2){
			
				teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-4)+ '_</a>';
				regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));

			}
		
		}
		
	

		if(avgString.search(regex) != -1){

					

			if(avgString.indexOf('team_other.html') == -1){
				//avgString = avgString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				avgString = avgString.replace(regex,teamLinkArray[i]);
				avgString = trim(avgString);
			}

		}
		if(avgString2.search(regex) != -1){

			if(avgString2.indexOf('team_other.html') == -1){
				//avgString2 = avgString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				avgString2 = avgString2.replace(regex,teamLinkArray[i]);
				avgString2 = trim(avgString2);
				
			}

		}
		if(avgString3.search(regex) != -1){

			if(avgString3.indexOf('team_other.html') == -1){
				//avgString3 = avgString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				avgString3 = avgString3.replace(regex,teamLinkArray[i]);
				avgString3 = trim(avgString3);
			}

		}

		

	}

		avgArray.push(avgString);
		avgArray.push(avgString2);
		avgArray.push(avgString3);

		
var avgString = avgArray.toString();
var avgTempArray = new Array();



///------RUNS SCORED------///
	var runsscored = u.indexOf('------RUNS SCORED------');
	var runsscoredString = u.substring(runsscored + 79, runsscored + 79 + 23);
	var runsscoredString2 = u.substring(runsscored + 159, runsscored + 159 + 23);
	var runsscoredString3 = u.substring(runsscored + 239, runsscored + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = runsscoredString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsscoredString = runsscoredString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsscoredString = runsscoredString.replace(myTempString,myTempString2);

	}

	myTempString = runsscoredString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsscoredString2 = runsscoredString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsscoredString2 = runsscoredString2.replace(myTempString,myTempString2);

	}	

	myTempString = runsscoredString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsscoredString3 = runsscoredString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsscoredString3 = runsscoredString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(runsscoredString.search(regex) != -1){

					

			if(runsscoredString.indexOf('team_other.html') == -1){
				//runsscoredString = runsscoredString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsscoredString = runsscoredString.replace(regex,teamLinkArray[i]);
				runsscoredString = trim(runsscoredString);
			}

		}
		if(runsscoredString2.search(regex) != -1){

			if(runsscoredString2.indexOf('team_other.html') == -1){
				//runsscoredString2 = runsscoredString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsscoredString2 = runsscoredString2.replace(regex,teamLinkArray[i]);
				runsscoredString2 = trim(runsscoredString2);
				
			}

		}
		if(runsscoredString3.search(regex) != -1){

			if(runsscoredString3.indexOf('team_other.html') == -1){
				//runsscoredString3 = runsscoredString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsscoredString3 = runsscoredString3.replace(regex,teamLinkArray[i]);
				runsscoredString3 = trim(runsscoredString3);
			}

		}

		

	}

		runsscoredArray.push(runsscoredString);
		runsscoredArray.push(runsscoredString2);
		runsscoredArray.push(runsscoredString3);

		

var runsscoredString = runsscoredArray.toString();
var runsscoredTempArray = new Array();

///------HITS------///
	var hits = u.indexOf('----------HITS---------');
	var hitsString = u.substring(hits + 79, hits + 79 + 23);
	var hitsString2 = u.substring(hits + 159, hits + 159 + 23);
	var hitsString3 = u.substring(hits + 239, hits + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hitsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitsString = hitsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitsString = hitsString.replace(myTempString,myTempString2);

	}

	myTempString = hitsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitsString2 = hitsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitsString2 = hitsString2.replace(myTempString,myTempString2);

	}	

	myTempString = hitsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitsString3 = hitsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitsString3 = hitsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hitsString.search(regex) != -1){

					

			if(hitsString.indexOf('team_other.html') == -1){
				//hitsString = hitsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitsString = hitsString.replace(regex,teamLinkArray[i]);
				hitsString = trim(hitsString);
			}

		}
		if(hitsString2.search(regex) != -1){

			if(hitsString2.indexOf('team_other.html') == -1){
				//hitsString2 = hitsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitsString2 = hitsString2.replace(regex,teamLinkArray[i]);
				hitsString2 = trim(hitsString2);
				
			}

		}
		if(hitsString3.search(regex) != -1){

			if(hitsString3.indexOf('team_other.html') == -1){
				//hitsString3 = hitsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitsString3 = hitsString3.replace(regex,teamLinkArray[i]);
				hitsString3 = trim(hitsString3);
			}

		}

		

	}

		hitsArray.push(hitsString);
		hitsArray.push(hitsString2);
		hitsArray.push(hitsString3);

		

var hitsString = hitsArray.toString();
var hitsTempArray = new Array();


///------DOUBLES------///
	var doubles = u.indexOf('--------DOUBLES--------');
	var doublesString = u.substring(doubles + 79, doubles + 79 + 23);
	var doublesString2 = u.substring(doubles + 159, doubles + 159 + 23);
	var doublesString3 = u.substring(doubles + 239, doubles + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = doublesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		doublesString = doublesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		doublesString = doublesString.replace(myTempString,myTempString2);

	}

	myTempString = doublesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		doublesString2 = doublesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		doublesString2 = doublesString2.replace(myTempString,myTempString2);

	}	

	myTempString = doublesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		doublesString3 = doublesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		doublesString3 = doublesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(doublesString.search(regex) != -1){

					

			if(doublesString.indexOf('team_other.html') == -1){
				//doublesString = doublesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				doublesString = doublesString.replace(regex,teamLinkArray[i]);
				doublesString = trim(doublesString);
			}

		}
		if(doublesString2.search(regex) != -1){

			if(doublesString2.indexOf('team_other.html') == -1){
				//doublesString2 = doublesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				doublesString2 = doublesString2.replace(regex,teamLinkArray[i]);
				doublesString2 = trim(doublesString2);
				
			}

		}
		if(doublesString3.search(regex) != -1){

			if(doublesString3.indexOf('team_other.html') == -1){
				//doublesString3 = doublesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				doublesString3 = doublesString3.replace(regex,teamLinkArray[i]);
				doublesString3 = trim(doublesString3);
			}

		}

		

	}

		doublesArray.push(doublesString);
		doublesArray.push(doublesString2);
		doublesArray.push(doublesString3);

		

var doublesString = doublesArray.toString();
var doublesTempArray = new Array();

///------triples------///
	var triples = u.indexOf('--------TRIPLES--------');
	var triplesString = u.substring(triples + 79, triples + 79 + 23);
	var triplesString2 = u.substring(triples + 159, triples + 159 + 23);
	var triplesString3 = u.substring(triples + 239, triples + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = triplesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		triplesString = triplesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		triplesString = triplesString.replace(myTempString,myTempString2);

	}

	myTempString = triplesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		triplesString2 = triplesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		triplesString2 = triplesString2.replace(myTempString,myTempString2);

	}	

	myTempString = triplesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		triplesString3 = triplesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		triplesString3 = triplesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(triplesString.search(regex) != -1){

					

			if(triplesString.indexOf('team_other.html') == -1){
				//triplesString = triplesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				triplesString = triplesString.replace(regex,teamLinkArray[i]);
				triplesString = trim(triplesString);
			}

		}
		if(triplesString2.search(regex) != -1){

			if(triplesString2.indexOf('team_other.html') == -1){
				//triplesString2 = triplesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				triplesString2 = triplesString2.replace(regex,teamLinkArray[i]);
				triplesString2 = trim(triplesString2);
				
			}

		}
		if(triplesString3.search(regex) != -1){

			if(triplesString3.indexOf('team_other.html') == -1){
				//triplesString3 = triplesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				triplesString3 = triplesString3.replace(regex,teamLinkArray[i]);
				triplesString3 = trim(triplesString3);
			}

		}

		

	}

		triplesArray.push(triplesString);
		triplesArray.push(triplesString2);
		triplesArray.push(triplesString3);

		

var triplesString = triplesArray.toString();
var triplesTempArray = new Array();

///------homeruns------///
	var homeruns = u.indexOf('--------HOMERUNS-------');
	var homerunsString = u.substring(homeruns + 79, homeruns + 79 + 23);
	var homerunsString2 = u.substring(homeruns + 159, homeruns + 159 + 23);
	var homerunsString3 = u.substring(homeruns + 239, homeruns + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = homerunsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		homerunsString = homerunsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		homerunsString = homerunsString.replace(myTempString,myTempString2);

	}

	myTempString = homerunsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		homerunsString2 = homerunsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		homerunsString2 = homerunsString2.replace(myTempString,myTempString2);

	}	

	myTempString = homerunsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		homerunsString3 = homerunsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		homerunsString3 = homerunsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(homerunsString.search(regex) != -1){

					

			if(homerunsString.indexOf('team_other.html') == -1){
				//homerunsString = homerunsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				homerunsString = homerunsString.replace(regex,teamLinkArray[i]);
				homerunsString = trim(homerunsString);
			}

		}
		if(homerunsString2.search(regex) != -1){

			if(homerunsString2.indexOf('team_other.html') == -1){
				//homerunsString2 = homerunsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				homerunsString2 = homerunsString2.replace(regex,teamLinkArray[i]);
				homerunsString2 = trim(homerunsString2);
				
			}

		}
		if(homerunsString3.search(regex) != -1){

			if(homerunsString3.indexOf('team_other.html') == -1){
				//homerunsString3 = homerunsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				homerunsString3 = homerunsString3.replace(regex,teamLinkArray[i]);
				homerunsString3 = trim(homerunsString3);
			}

		}

		

	}

		homerunsArray.push(homerunsString);
		homerunsArray.push(homerunsString2);
		homerunsArray.push(homerunsString3);

		

var homerunsString = homerunsArray.toString();
var homerunsTempArray = new Array();

///------runsbattedin------///
	var runsbattedin = u.indexOf('-----RUNS BATTED IN----');
	var runsbattedinString = u.substring(runsbattedin + 79, runsbattedin + 79 + 23);
	var runsbattedinString2 = u.substring(runsbattedin + 159, runsbattedin + 159 + 23);
	var runsbattedinString3 = u.substring(runsbattedin + 239, runsbattedin + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = runsbattedinString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsbattedinString = runsbattedinString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsbattedinString = runsbattedinString.replace(myTempString,myTempString2);

	}

	myTempString = runsbattedinString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsbattedinString2 = runsbattedinString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsbattedinString2 = runsbattedinString2.replace(myTempString,myTempString2);

	}	

	myTempString = runsbattedinString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsbattedinString3 = runsbattedinString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsbattedinString3 = runsbattedinString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(runsbattedinString.search(regex) != -1){

					

			if(runsbattedinString.indexOf('team_other.html') == -1){
				//runsbattedinString = runsbattedinString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsbattedinString = runsbattedinString.replace(regex,teamLinkArray[i]);
				runsbattedinString = trim(runsbattedinString);
			}

		}
		if(runsbattedinString2.search(regex) != -1){

			if(runsbattedinString2.indexOf('team_other.html') == -1){
				//runsbattedinString2 = runsbattedinString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsbattedinString2 = runsbattedinString2.replace(regex,teamLinkArray[i]);
				runsbattedinString2 = trim(runsbattedinString2);
				
			}

		}
		if(runsbattedinString3.search(regex) != -1){

			if(runsbattedinString3.indexOf('team_other.html') == -1){
				//runsbattedinString3 = runsbattedinString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsbattedinString3 = runsbattedinString3.replace(regex,teamLinkArray[i]);
				runsbattedinString3 = trim(runsbattedinString3);
			}

		}

		

	}

		runsbattedinArray.push(runsbattedinString);
		runsbattedinArray.push(runsbattedinString2);
		runsbattedinArray.push(runsbattedinString3);

		

var runsbattedinString = runsbattedinArray.toString();
var runsbattedinTempArray = new Array();

///------walks------///
	var walks = u.indexOf('---------WALKS---------');
	var walksString = u.substring(walks + 79, walks + 79 + 23);
	var walksString2 = u.substring(walks + 159, walks + 159 + 23);
	var walksString3 = u.substring(walks + 239, walks + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = walksString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		walksString = walksString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		walksString = walksString.replace(myTempString,myTempString2);

	}

	myTempString = walksString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		walksString2 = walksString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		walksString2 = walksString2.replace(myTempString,myTempString2);

	}	

	myTempString = walksString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		walksString3 = walksString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		walksString3 = walksString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(walksString.search(regex) != -1){

					

			if(walksString.indexOf('team_other.html') == -1){
				//walksString = walksString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				walksString = walksString.replace(regex,teamLinkArray[i]);
				walksString = trim(walksString);
			}

		}
		if(walksString2.search(regex) != -1){

			if(walksString2.indexOf('team_other.html') == -1){
				//walksString2 = walksString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				walksString2 = walksString2.replace(regex,teamLinkArray[i]);
				walksString2 = trim(walksString2);
				
			}

		}
		if(walksString3.search(regex) != -1){

			if(walksString3.indexOf('team_other.html') == -1){
				//walksString3 = walksString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				walksString3 = walksString3.replace(regex,teamLinkArray[i]);
				walksString3 = trim(walksString3);
			}

		}

		

	}

		walksArray.push(walksString);
		walksArray.push(walksString2);
		walksArray.push(walksString3);

		

var walksString = walksArray.toString();
var walksTempArray = new Array();

///------intentionalwalks------///
	var intentionalwalks = u.indexOf('---INTENTIONAL WALKS---');
	var intentionalwalksString = u.substring(intentionalwalks + 79, intentionalwalks + 79 + 23);
	var intentionalwalksString2 = u.substring(intentionalwalks + 159, intentionalwalks + 159 + 23);
	var intentionalwalksString3 = u.substring(intentionalwalks + 239, intentionalwalks + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = intentionalwalksString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		intentionalwalksString = intentionalwalksString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		intentionalwalksString = intentionalwalksString.replace(myTempString,myTempString2);

	}

	myTempString = intentionalwalksString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		intentionalwalksString2 = intentionalwalksString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		intentionalwalksString2 = intentionalwalksString2.replace(myTempString,myTempString2);

	}	

	myTempString = intentionalwalksString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		intentionalwalksString3 = intentionalwalksString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		intentionalwalksString3 = intentionalwalksString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(intentionalwalksString.search(regex) != -1){

					

			if(intentionalwalksString.indexOf('team_other.html') == -1){
				//intentionalwalksString = intentionalwalksString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				intentionalwalksString = intentionalwalksString.replace(regex,teamLinkArray[i]);
				intentionalwalksString = trim(intentionalwalksString);
			}

		}
		if(intentionalwalksString2.search(regex) != -1){

			if(intentionalwalksString2.indexOf('team_other.html') == -1){
				//intentionalwalksString2 = intentionalwalksString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				intentionalwalksString2 = intentionalwalksString2.replace(regex,teamLinkArray[i]);
				intentionalwalksString2 = trim(intentionalwalksString2);
				
			}

		}
		if(intentionalwalksString3.search(regex) != -1){

			if(intentionalwalksString3.indexOf('team_other.html') == -1){
				//intentionalwalksString3 = intentionalwalksString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				intentionalwalksString3 = intentionalwalksString3.replace(regex,teamLinkArray[i]);
				intentionalwalksString3 = trim(intentionalwalksString3);
			}

		}

		

	}

		intentionalwalksArray.push(intentionalwalksString);
		intentionalwalksArray.push(intentionalwalksString2);
		intentionalwalksArray.push(intentionalwalksString3);

		

var intentionalwalksString = intentionalwalksArray.toString();
var intentionalwalksTempArray = new Array();

///------strikeouts------///
	var strikeouts = u.indexOf('------STRIKE OUTS------');
	var strikeoutsString = u.substring(strikeouts + 79, strikeouts + 79 + 23);
	var strikeoutsString2 = u.substring(strikeouts + 159, strikeouts + 159 + 23);
	var strikeoutsString3 = u.substring(strikeouts + 239, strikeouts + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = strikeoutsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		strikeoutsString = strikeoutsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		strikeoutsString = strikeoutsString.replace(myTempString,myTempString2);

	}

	myTempString = strikeoutsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		strikeoutsString2 = strikeoutsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		strikeoutsString2 = strikeoutsString2.replace(myTempString,myTempString2);

	}	

	myTempString = strikeoutsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		strikeoutsString3 = strikeoutsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		strikeoutsString3 = strikeoutsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(strikeoutsString.search(regex) != -1){

					

			if(strikeoutsString.indexOf('team_other.html') == -1){
				//strikeoutsString = strikeoutsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				strikeoutsString = strikeoutsString.replace(regex,teamLinkArray[i]);
				strikeoutsString = trim(strikeoutsString);
			}

		}
		if(strikeoutsString2.search(regex) != -1){

			if(strikeoutsString2.indexOf('team_other.html') == -1){
				//strikeoutsString2 = strikeoutsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				strikeoutsString2 = strikeoutsString2.replace(regex,teamLinkArray[i]);
				strikeoutsString2 = trim(strikeoutsString2);
				
			}

		}
		if(strikeoutsString3.search(regex) != -1){

			if(strikeoutsString3.indexOf('team_other.html') == -1){
				//strikeoutsString3 = strikeoutsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				strikeoutsString3 = strikeoutsString3.replace(regex,teamLinkArray[i]);
				strikeoutsString3 = trim(strikeoutsString3);
			}

		}

		

	}

		strikeoutsArray.push(strikeoutsString);
		strikeoutsArray.push(strikeoutsString2);
		strikeoutsArray.push(strikeoutsString3);

		

var strikeoutsString = strikeoutsArray.toString();
var strikeoutsTempArray = new Array();

///------hitbypitch------///
	var hitbypitch = u.indexOf('------HIT BY PITCH-----');
	var hitbypitchString = u.substring(hitbypitch + 79, hitbypitch + 79 + 23);
	var hitbypitchString2 = u.substring(hitbypitch + 159, hitbypitch + 159 + 23);
	var hitbypitchString3 = u.substring(hitbypitch + 239, hitbypitch + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hitbypitchString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitbypitchString = hitbypitchString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitbypitchString = hitbypitchString.replace(myTempString,myTempString2);

	}

	myTempString = hitbypitchString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitbypitchString2 = hitbypitchString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitbypitchString2 = hitbypitchString2.replace(myTempString,myTempString2);

	}	

	myTempString = hitbypitchString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitbypitchString3 = hitbypitchString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitbypitchString3 = hitbypitchString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hitbypitchString.search(regex) != -1){

					

			if(hitbypitchString.indexOf('team_other.html') == -1){
				//hitbypitchString = hitbypitchString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitbypitchString = hitbypitchString.replace(regex,teamLinkArray[i]);
				hitbypitchString = trim(hitbypitchString);
			}

		}
		if(hitbypitchString2.search(regex) != -1){

			if(hitbypitchString2.indexOf('team_other.html') == -1){
				//hitbypitchString2 = hitbypitchString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitbypitchString2 = hitbypitchString2.replace(regex,teamLinkArray[i]);
				hitbypitchString2 = trim(hitbypitchString2);
				
			}

		}
		if(hitbypitchString3.search(regex) != -1){

			if(hitbypitchString3.indexOf('team_other.html') == -1){
				//hitbypitchString3 = hitbypitchString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitbypitchString3 = hitbypitchString3.replace(regex,teamLinkArray[i]);
				hitbypitchString3 = trim(hitbypitchString3);
			}

		}

		

	}

		hitbypitchArray.push(hitbypitchString);
		hitbypitchArray.push(hitbypitchString2);
		hitbypitchArray.push(hitbypitchString3);

		

var hitbypitchString = hitbypitchArray.toString();
var hitbypitchTempArray = new Array();

///------sacrificehits------///
	var sacrificehits = u.indexOf('-----SACRIFICE HITS----');
	var sacrificehitsString = u.substring(sacrificehits + 79, sacrificehits + 79 + 23);
	var sacrificehitsString2 = u.substring(sacrificehits + 159, sacrificehits + 159 + 23);
	var sacrificehitsString3 = u.substring(sacrificehits + 239, sacrificehits + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = sacrificehitsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		sacrificehitsString = sacrificehitsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		sacrificehitsString = sacrificehitsString.replace(myTempString,myTempString2);

	}

	myTempString = sacrificehitsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		sacrificehitsString2 = sacrificehitsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		sacrificehitsString2 = sacrificehitsString2.replace(myTempString,myTempString2);

	}	

	myTempString = sacrificehitsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		sacrificehitsString3 = sacrificehitsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		sacrificehitsString3 = sacrificehitsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(sacrificehitsString.search(regex) != -1){

					

			if(sacrificehitsString.indexOf('team_other.html') == -1){
				//sacrificehitsString = sacrificehitsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				sacrificehitsString = sacrificehitsString.replace(regex,teamLinkArray[i]);
				sacrificehitsString = trim(sacrificehitsString);
			}

		}
		if(sacrificehitsString2.search(regex) != -1){

			if(sacrificehitsString2.indexOf('team_other.html') == -1){
				//sacrificehitsString2 = sacrificehitsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				sacrificehitsString2 = sacrificehitsString2.replace(regex,teamLinkArray[i]);
				sacrificehitsString2 = trim(sacrificehitsString2);
				
			}

		}
		if(sacrificehitsString3.search(regex) != -1){

			if(sacrificehitsString3.indexOf('team_other.html') == -1){
				//sacrificehitsString3 = sacrificehitsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				sacrificehitsString3 = sacrificehitsString3.replace(regex,teamLinkArray[i]);
				sacrificehitsString3 = trim(sacrificehitsString3);
			}

		}

		

	}

		sacrificehitsArray.push(sacrificehitsString);
		sacrificehitsArray.push(sacrificehitsString2);
		sacrificehitsArray.push(sacrificehitsString3);

		

var sacrificehitsString = sacrificehitsArray.toString();
var sacrificehitsTempArray = new Array();

///------stolenbases------///
	var stolenbases = u.indexOf('------STOLEN BASES-----');
	var stolenbasesString = u.substring(stolenbases + 79, stolenbases + 79 + 23);
	var stolenbasesString2 = u.substring(stolenbases + 159, stolenbases + 159 + 23);
	var stolenbasesString3 = u.substring(stolenbases + 239, stolenbases + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = stolenbasesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		stolenbasesString = stolenbasesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		stolenbasesString = stolenbasesString.replace(myTempString,myTempString2);

	}

	myTempString = stolenbasesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		stolenbasesString2 = stolenbasesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		stolenbasesString2 = stolenbasesString2.replace(myTempString,myTempString2);

	}	

	myTempString = stolenbasesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		stolenbasesString3 = stolenbasesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		stolenbasesString3 = stolenbasesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(stolenbasesString.search(regex) != -1){

					

			if(stolenbasesString.indexOf('team_other.html') == -1){
				//stolenbasesString = stolenbasesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				stolenbasesString = stolenbasesString.replace(regex,teamLinkArray[i]);
				stolenbasesString = trim(stolenbasesString);
			}

		}
		if(stolenbasesString2.search(regex) != -1){

			if(stolenbasesString2.indexOf('team_other.html') == -1){
				//stolenbasesString2 = stolenbasesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				stolenbasesString2 = stolenbasesString2.replace(regex,teamLinkArray[i]);
				stolenbasesString2 = trim(stolenbasesString2);
				
			}

		}
		if(stolenbasesString3.search(regex) != -1){

			if(stolenbasesString3.indexOf('team_other.html') == -1){
				//stolenbasesString3 = stolenbasesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				stolenbasesString3 = stolenbasesString3.replace(regex,teamLinkArray[i]);
				stolenbasesString3 = trim(stolenbasesString3);
			}

		}

		

	}

		stolenbasesArray.push(stolenbasesString);
		stolenbasesArray.push(stolenbasesString2);
		stolenbasesArray.push(stolenbasesString3);

		

var stolenbasesString = stolenbasesArray.toString();
var stolenbasesTempArray = new Array();

///------stolenbasepct------///
	var stolenbasepct = u.indexOf('----STOLEN BASE PCT----');
	var stolenbasepctString = u.substring(stolenbasepct + 79, stolenbasepct + 79 + 23);
	var stolenbasepctString2 = u.substring(stolenbasepct + 159, stolenbasepct + 159 + 23);
	var stolenbasepctString3 = u.substring(stolenbasepct + 239, stolenbasepct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = stolenbasepctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		stolenbasepctString = stolenbasepctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		stolenbasepctString = stolenbasepctString.replace(myTempString,myTempString2);

	}

	myTempString = stolenbasepctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		stolenbasepctString2 = stolenbasepctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		stolenbasepctString2 = stolenbasepctString2.replace(myTempString,myTempString2);

	}	

	myTempString = stolenbasepctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		stolenbasepctString3 = stolenbasepctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		stolenbasepctString3 = stolenbasepctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(stolenbasepctString.search(regex) != -1){

					

			if(stolenbasepctString.indexOf('team_other.html') == -1){
				//stolenbasepctString = stolenbasepctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				stolenbasepctString = stolenbasepctString.replace(regex,teamLinkArray[i]);
				stolenbasepctString = trim(stolenbasepctString);
			}

		}
		if(stolenbasepctString2.search(regex) != -1){

			if(stolenbasepctString2.indexOf('team_other.html') == -1){
				//stolenbasepctString2 = stolenbasepctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				stolenbasepctString2 = stolenbasepctString2.replace(regex,teamLinkArray[i]);
				stolenbasepctString2 = trim(stolenbasepctString2);
				
			}

		}
		if(stolenbasepctString3.search(regex) != -1){

			if(stolenbasepctString3.indexOf('team_other.html') == -1){
				//stolenbasepctString3 = stolenbasepctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				stolenbasepctString3 = stolenbasepctString3.replace(regex,teamLinkArray[i]);
				stolenbasepctString3 = trim(stolenbasepctString3);
			}

		}

		

	}

		stolenbasepctArray.push(stolenbasepctString);
		stolenbasepctArray.push(stolenbasepctString2);
		stolenbasepctArray.push(stolenbasepctString3);

		

var stolenbasepctString = stolenbasepctArray.toString();
var stolenbasepctTempArray = new Array();

///------gidp------///
	var gidp = u.indexOf('----------GIDP---------');
	var gidpString = u.substring(gidp + 79, gidp + 79 + 23);
	var gidpString2 = u.substring(gidp + 159, gidp + 159 + 23);
	var gidpString3 = u.substring(gidp + 239, gidp + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = gidpString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gidpString = gidpString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gidpString = gidpString.replace(myTempString,myTempString2);

	}

	myTempString = gidpString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gidpString2 = gidpString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gidpString2 = gidpString2.replace(myTempString,myTempString2);

	}	

	myTempString = gidpString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gidpString3 = gidpString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gidpString3 = gidpString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(gidpString.search(regex) != -1){

					

			if(gidpString.indexOf('team_other.html') == -1){
				//gidpString = gidpString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gidpString = gidpString.replace(regex,teamLinkArray[i]);
				gidpString = trim(gidpString);
			}

		}
		if(gidpString2.search(regex) != -1){

			if(gidpString2.indexOf('team_other.html') == -1){
				//gidpString2 = gidpString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gidpString2 = gidpString2.replace(regex,teamLinkArray[i]);
				gidpString2 = trim(gidpString2);
				
			}

		}
		if(gidpString3.search(regex) != -1){

			if(gidpString3.indexOf('team_other.html') == -1){
				//gidpString3 = gidpString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gidpString3 = gidpString3.replace(regex,teamLinkArray[i]);
				gidpString3 = trim(gidpString3);
			}

		}

		

	}

		gidpArray.push(gidpString);
		gidpArray.push(gidpString2);
		gidpArray.push(gidpString3);

		

var gidpString = gidpArray.toString();
var gidpTempArray = new Array();

///------hittingstreak------///
	var hittingstreak = u.indexOf('-----HITTING STREAK----');
	var hittingstreakString = u.substring(hittingstreak + 79, hittingstreak + 79 + 23);
	var hittingstreakString2 = u.substring(hittingstreak + 159, hittingstreak + 159 + 23);
	var hittingstreakString3 = u.substring(hittingstreak + 239, hittingstreak + 239 + 23);

	if(hittingstreakString.indexOf('MANY TIED WITH') == -1){	

	
	if(hittingstreakString.indexOf(' * ') != -1){

		hittingstreakString = hittingstreakString.replace(' * ', '   ');
		hittingstreakString = hittingstreakString + '*';
	}

	if(hittingstreakString2.indexOf(' * ') != -1){

		hittingstreakString2 = hittingstreakString2.replace(' * ', '   ');
		hittingstreakString2 = hittingstreakString2 + '*';
	}

	if(hittingstreakString3.indexOf(' * ') != -1){

		hittingstreakString3 = hittingstreakString3.replace(' * ', '   ');
		hittingstreakString3 = hittingstreakString3 + '*';
	}


	var myTempString;
	var myTempString2;	

	myTempString = hittingstreakString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hittingstreakString = hittingstreakString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hittingstreakString = hittingstreakString.replace(myTempString,myTempString2);

	}

	myTempString = hittingstreakString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hittingstreakString2 = hittingstreakString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hittingstreakString2 = hittingstreakString2.replace(myTempString,myTempString2);

	}	

	myTempString = hittingstreakString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hittingstreakString3 = hittingstreakString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hittingstreakString3 = hittingstreakString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hittingstreakString.search(regex) != -1){

					

			if(hittingstreakString.indexOf('team_other.html') == -1){
				//hittingstreakString = hittingstreakString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hittingstreakString = hittingstreakString.replace(regex,teamLinkArray[i]);
				hittingstreakString = trim(hittingstreakString);
			}

		}
		if(hittingstreakString2.search(regex) != -1){

			if(hittingstreakString2.indexOf('team_other.html') == -1){
				//hittingstreakString2 = hittingstreakString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hittingstreakString2 = hittingstreakString2.replace(regex,teamLinkArray[i]);
				hittingstreakString2 = trim(hittingstreakString2);
				
			}

		}
		if(hittingstreakString3.search(regex) != -1){

			if(hittingstreakString3.indexOf('team_other.html') == -1){
				//hittingstreakString3 = hittingstreakString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hittingstreakString3 = hittingstreakString3.replace(regex,teamLinkArray[i]);
				hittingstreakString3 = trim(hittingstreakString3);
			}

		}

		

	}

	}//if(hittingstreakString.indexOf('MANY TIED WITH') == -1){
	else
	{
	
		hittingstreakString =  'Many Tied     ***          ';
		hittingstreakString2 = '              ***          ';
		hittingstreakString3 = '              ***          ';	

	}
		hittingstreakArray.push(hittingstreakString);
		hittingstreakArray.push(hittingstreakString2);
		hittingstreakArray.push(hittingstreakString3);

		

var hittingstreakString = hittingstreakArray.toString();
var hittingstreakTempArray = new Array();



///------sluggingpct------///
	var sluggingpct = u.indexOf('------SLUGGING PCT-----');
	var sluggingpctString = u.substring(sluggingpct + 79, sluggingpct + 79 + 23);
	var sluggingpctString2 = u.substring(sluggingpct + 159, sluggingpct + 159 + 23);
	var sluggingpctString3 = u.substring(sluggingpct + 239, sluggingpct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = sluggingpctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		sluggingpctString = sluggingpctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		sluggingpctString = sluggingpctString.replace(myTempString,myTempString2);

	}

	myTempString = sluggingpctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		sluggingpctString2 = sluggingpctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		sluggingpctString2 = sluggingpctString2.replace(myTempString,myTempString2);

	}	

	myTempString = sluggingpctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		sluggingpctString3 = sluggingpctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		sluggingpctString3 = sluggingpctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(sluggingpctString.search(regex) != -1){

					

			if(sluggingpctString.indexOf('team_other.html') == -1){
				//sluggingpctString = sluggingpctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				sluggingpctString = sluggingpctString.replace(regex,teamLinkArray[i]);
				sluggingpctString = trim(sluggingpctString);
			}

		}
		if(sluggingpctString2.search(regex) != -1){

			if(sluggingpctString2.indexOf('team_other.html') == -1){
				//sluggingpctString2 = sluggingpctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				sluggingpctString2 = sluggingpctString2.replace(regex,teamLinkArray[i]);
				sluggingpctString2 = trim(sluggingpctString2);
				
			}

		}
		if(sluggingpctString3.search(regex) != -1){

			if(sluggingpctString3.indexOf('team_other.html') == -1){
				//sluggingpctString3 = sluggingpctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				sluggingpctString3 = sluggingpctString3.replace(regex,teamLinkArray[i]);
				sluggingpctString3 = trim(sluggingpctString3);
			}

		}

		

	}

		sluggingpctArray.push(sluggingpctString);
		sluggingpctArray.push(sluggingpctString2);
		sluggingpctArray.push(sluggingpctString3);

		

var sluggingpctString = sluggingpctArray.toString();
var sluggingpctTempArray = new Array();

///------onbasepct------///
	var onbasepct = u.indexOf('------ON BASE PCT------');
	var onbasepctString = u.substring(onbasepct + 79, onbasepct + 79 + 23);
	var onbasepctString2 = u.substring(onbasepct + 159, onbasepct + 159 + 23);
	var onbasepctString3 = u.substring(onbasepct + 239, onbasepct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = onbasepctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		onbasepctString = onbasepctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		onbasepctString = onbasepctString.replace(myTempString,myTempString2);

	}

	myTempString = onbasepctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		onbasepctString2 = onbasepctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		onbasepctString2 = onbasepctString2.replace(myTempString,myTempString2);

	}	

	myTempString = onbasepctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		onbasepctString3 = onbasepctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		onbasepctString3 = onbasepctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(onbasepctString.search(regex) != -1){

					

			if(onbasepctString.indexOf('team_other.html') == -1){
				//onbasepctString = onbasepctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				onbasepctString = onbasepctString.replace(regex,teamLinkArray[i]);
				onbasepctString = trim(onbasepctString);
			}

		}
		if(onbasepctString2.search(regex) != -1){

			if(onbasepctString2.indexOf('team_other.html') == -1){
				//onbasepctString2 = onbasepctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				onbasepctString2 = onbasepctString2.replace(regex,teamLinkArray[i]);
				onbasepctString2 = trim(onbasepctString2);
				
			}

		}
		if(onbasepctString3.search(regex) != -1){

			if(onbasepctString3.indexOf('team_other.html') == -1){
				//onbasepctString3 = onbasepctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				onbasepctString3 = onbasepctString3.replace(regex,teamLinkArray[i]);
				onbasepctString3 = trim(onbasepctString3);
			}

		}

		

	}

		onbasepctArray.push(onbasepctString);
		onbasepctArray.push(onbasepctString2);
		onbasepctArray.push(onbasepctString3);

		

var onbasepctString = onbasepctArray.toString();
var onbasepctTempArray = new Array();

///------runscreated27out------///
	var runscreated27out = u.indexOf('---RUNSCREATED/27OUT---');
	var runscreated27outString = u.substring(runscreated27out + 79, runscreated27out + 79 + 23);
	var runscreated27outString2 = u.substring(runscreated27out + 159, runscreated27out + 159 + 23);
	var runscreated27outString3 = u.substring(runscreated27out + 239, runscreated27out + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = runscreated27outString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runscreated27outString = runscreated27outString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runscreated27outString = runscreated27outString.replace(myTempString,myTempString2);

	}

	myTempString = runscreated27outString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runscreated27outString2 = runscreated27outString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runscreated27outString2 = runscreated27outString2.replace(myTempString,myTempString2);

	}	

	myTempString = runscreated27outString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runscreated27outString3 = runscreated27outString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runscreated27outString3 = runscreated27outString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(runscreated27outString.search(regex) != -1){

					

			if(runscreated27outString.indexOf('team_other.html') == -1){
				//runscreated27outString = runscreated27outString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runscreated27outString = runscreated27outString.replace(regex,teamLinkArray[i]);
				runscreated27outString = trim(runscreated27outString);
			}

		}
		if(runscreated27outString2.search(regex) != -1){

			if(runscreated27outString2.indexOf('team_other.html') == -1){
				//runscreated27outString2 = runscreated27outString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runscreated27outString2 = runscreated27outString2.replace(regex,teamLinkArray[i]);
				runscreated27outString2 = trim(runscreated27outString2);
				
			}

		}
		if(runscreated27outString3.search(regex) != -1){

			if(runscreated27outString3.indexOf('team_other.html') == -1){
				//runscreated27outString3 = runscreated27outString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runscreated27outString3 = runscreated27outString3.replace(regex,teamLinkArray[i]);
				runscreated27outString3 = trim(runscreated27outString3);
			}

		}

		

	}

		runscreated27outArray.push(runscreated27outString);
		runscreated27outArray.push(runscreated27outString2);
		runscreated27outArray.push(runscreated27outString3);

		

var runscreated27outString = runscreated27outArray.toString();
var runscreated27outTempArray = new Array();

///------totalaverage------///
	var totalaverage = u.indexOf('-----TOTAL AVERAGE-----');
	var totalaverageString = u.substring(totalaverage + 79, totalaverage + 79 + 23);
	var totalaverageString2 = u.substring(totalaverage + 159, totalaverage + 159 + 23);
	var totalaverageString3 = u.substring(totalaverage + 239, totalaverage + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = totalaverageString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		totalaverageString = totalaverageString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		totalaverageString = totalaverageString.replace(myTempString,myTempString2);

	}

	myTempString = totalaverageString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		totalaverageString2 = totalaverageString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		totalaverageString2 = totalaverageString2.replace(myTempString,myTempString2);

	}	

	myTempString = totalaverageString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		totalaverageString3 = totalaverageString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		totalaverageString3 = totalaverageString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(totalaverageString.search(regex) != -1){

					

			if(totalaverageString.indexOf('team_other.html') == -1){
				//totalaverageString = totalaverageString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				totalaverageString = totalaverageString.replace(regex,teamLinkArray[i]);
				totalaverageString = trim(totalaverageString);
			}

		}
		if(totalaverageString2.search(regex) != -1){

			if(totalaverageString2.indexOf('team_other.html') == -1){
				//totalaverageString2 = totalaverageString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				totalaverageString2 = totalaverageString2.replace(regex,teamLinkArray[i]);
				totalaverageString2 = trim(totalaverageString2);
				
			}

		}
		if(totalaverageString3.search(regex) != -1){

			if(totalaverageString3.indexOf('team_other.html') == -1){
				//totalaverageString3 = totalaverageString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				totalaverageString3 = totalaverageString3.replace(regex,teamLinkArray[i]);
				totalaverageString3 = trim(totalaverageString3);
			}

		}

		

	}

		totalaverageArray.push(totalaverageString);
		totalaverageArray.push(totalaverageString2);
		totalaverageArray.push(totalaverageString3);

		

var totalaverageString = totalaverageArray.toString();
var totalaverageTempArray = new Array();

///------totalbases------///
	var totalbases = u.indexOf('------TOTAL BASES------');
	var totalbasesString = u.substring(totalbases + 79, totalbases + 79 + 23);
	var totalbasesString2 = u.substring(totalbases + 159, totalbases + 159 + 23);
	var totalbasesString3 = u.substring(totalbases + 239, totalbases + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = totalbasesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		totalbasesString = totalbasesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		totalbasesString = totalbasesString.replace(myTempString,myTempString2);

	}

	myTempString = totalbasesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		totalbasesString2 = totalbasesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		totalbasesString2 = totalbasesString2.replace(myTempString,myTempString2);

	}	

	myTempString = totalbasesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		totalbasesString3 = totalbasesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		totalbasesString3 = totalbasesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(totalbasesString.search(regex) != -1){

					

			if(totalbasesString.indexOf('team_other.html') == -1){
				//totalbasesString = totalbasesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				totalbasesString = totalbasesString.replace(regex,teamLinkArray[i]);
				totalbasesString = trim(totalbasesString);
			}

		}
		if(totalbasesString2.search(regex) != -1){

			if(totalbasesString2.indexOf('team_other.html') == -1){
				//totalbasesString2 = totalbasesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				totalbasesString2 = totalbasesString2.replace(regex,teamLinkArray[i]);
				totalbasesString2 = trim(totalbasesString2);
				
			}

		}
		if(totalbasesString3.search(regex) != -1){

			if(totalbasesString3.indexOf('team_other.html') == -1){
				//totalbasesString3 = totalbasesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				totalbasesString3 = totalbasesString3.replace(regex,teamLinkArray[i]);
				totalbasesString3 = trim(totalbasesString3);
			}

		}

		

	}

		totalbasesArray.push(totalbasesString);
		totalbasesArray.push(totalbasesString2);
		totalbasesArray.push(totalbasesString3);

		

var totalbasesString = totalbasesArray.toString();
var totalbasesTempArray = new Array();

///------batavgvsleft------///
	var batavgvsleft = u.indexOf('----BAT AVG VS. LEFT---');
	var batavgvsleftString = u.substring(batavgvsleft + 79, batavgvsleft + 79 + 23);
	var batavgvsleftString2 = u.substring(batavgvsleft + 159, batavgvsleft + 159 + 23);
	var batavgvsleftString3 = u.substring(batavgvsleft + 239, batavgvsleft + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = batavgvsleftString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		batavgvsleftString = batavgvsleftString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		batavgvsleftString = batavgvsleftString.replace(myTempString,myTempString2);

	}

	myTempString = batavgvsleftString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		batavgvsleftString2 = batavgvsleftString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		batavgvsleftString2 = batavgvsleftString2.replace(myTempString,myTempString2);

	}	

	myTempString = batavgvsleftString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		batavgvsleftString3 = batavgvsleftString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		batavgvsleftString3 = batavgvsleftString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(batavgvsleftString.search(regex) != -1){

					

			if(batavgvsleftString.indexOf('team_other.html') == -1){
				//batavgvsleftString = batavgvsleftString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				batavgvsleftString = batavgvsleftString.replace(regex,teamLinkArray[i]);
				batavgvsleftString = trim(batavgvsleftString);
			}

		}
		if(batavgvsleftString2.search(regex) != -1){

			if(batavgvsleftString2.indexOf('team_other.html') == -1){
				//batavgvsleftString2 = batavgvsleftString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				batavgvsleftString2 = batavgvsleftString2.replace(regex,teamLinkArray[i]);
				batavgvsleftString2 = trim(batavgvsleftString2);
				
			}

		}
		if(batavgvsleftString3.search(regex) != -1){

			if(batavgvsleftString3.indexOf('team_other.html') == -1){
				//batavgvsleftString3 = batavgvsleftString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				batavgvsleftString3 = batavgvsleftString3.replace(regex,teamLinkArray[i]);
				batavgvsleftString3 = trim(batavgvsleftString3);
			}

		}

		

	}

		batavgvsleftArray.push(batavgvsleftString);
		batavgvsleftArray.push(batavgvsleftString2);
		batavgvsleftArray.push(batavgvsleftString3);

		

var batavgvsleftString = batavgvsleftArray.toString();
var batavgvsleftTempArray = new Array();

///------hrvsleft------///
	var hrvsleft = u.indexOf('------HR VS. LEFT------');
	var hrvsleftString = u.substring(hrvsleft + 79, hrvsleft + 79 + 23);
	var hrvsleftString2 = u.substring(hrvsleft + 159, hrvsleft + 159 + 23);
	var hrvsleftString3 = u.substring(hrvsleft + 239, hrvsleft + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hrvsleftString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrvsleftString = hrvsleftString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrvsleftString = hrvsleftString.replace(myTempString,myTempString2);

	}

	myTempString = hrvsleftString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrvsleftString2 = hrvsleftString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrvsleftString2 = hrvsleftString2.replace(myTempString,myTempString2);

	}	

	myTempString = hrvsleftString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrvsleftString3 = hrvsleftString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrvsleftString3 = hrvsleftString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hrvsleftString.search(regex) != -1){

					

			if(hrvsleftString.indexOf('team_other.html') == -1){
				//hrvsleftString = hrvsleftString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrvsleftString = hrvsleftString.replace(regex,teamLinkArray[i]);
				hrvsleftString = trim(hrvsleftString);
			}

		}
		if(hrvsleftString2.search(regex) != -1){

			if(hrvsleftString2.indexOf('team_other.html') == -1){
				//hrvsleftString2 = hrvsleftString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrvsleftString2 = hrvsleftString2.replace(regex,teamLinkArray[i]);
				hrvsleftString2 = trim(hrvsleftString2);
				
			}

		}
		if(hrvsleftString3.search(regex) != -1){

			if(hrvsleftString3.indexOf('team_other.html') == -1){
				//hrvsleftString3 = hrvsleftString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrvsleftString3 = hrvsleftString3.replace(regex,teamLinkArray[i]);
				hrvsleftString3 = trim(hrvsleftString3);
			}

		}

		

	}

		hrvsleftArray.push(hrvsleftString);
		hrvsleftArray.push(hrvsleftString2);
		hrvsleftArray.push(hrvsleftString3);

		

var hrvsleftString = hrvsleftArray.toString();
var hrvsleftTempArray = new Array();

///------batavgvsright------///
	var batavgvsright = u.indexOf('---BAT AVG VS. RIGHT---');
	var batavgvsrightString = u.substring(batavgvsright + 79, batavgvsright + 79 + 23);
	var batavgvsrightString2 = u.substring(batavgvsright + 159, batavgvsright + 159 + 23);
	var batavgvsrightString3 = u.substring(batavgvsright + 239, batavgvsright + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = batavgvsrightString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		batavgvsrightString = batavgvsrightString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		batavgvsrightString = batavgvsrightString.replace(myTempString,myTempString2);

	}

	myTempString = batavgvsrightString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		batavgvsrightString2 = batavgvsrightString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		batavgvsrightString2 = batavgvsrightString2.replace(myTempString,myTempString2);

	}	

	myTempString = batavgvsrightString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		batavgvsrightString3 = batavgvsrightString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		batavgvsrightString3 = batavgvsrightString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(batavgvsrightString.search(regex) != -1){

					

			if(batavgvsrightString.indexOf('team_other.html') == -1){
				//batavgvsrightString = batavgvsrightString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				batavgvsrightString = batavgvsrightString.replace(regex,teamLinkArray[i]);
				batavgvsrightString = trim(batavgvsrightString);
			}

		}
		if(batavgvsrightString2.search(regex) != -1){

			if(batavgvsrightString2.indexOf('team_other.html') == -1){
				//batavgvsrightString2 = batavgvsrightString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				batavgvsrightString2 = batavgvsrightString2.replace(regex,teamLinkArray[i]);
				batavgvsrightString2 = trim(batavgvsrightString2);
				
			}

		}
		if(batavgvsrightString3.search(regex) != -1){

			if(batavgvsrightString3.indexOf('team_other.html') == -1){
				//batavgvsrightString3 = batavgvsrightString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				batavgvsrightString3 = batavgvsrightString3.replace(regex,teamLinkArray[i]);
				batavgvsrightString3 = trim(batavgvsrightString3);
			}

		}

		

	}

		batavgvsrightArray.push(batavgvsrightString);
		batavgvsrightArray.push(batavgvsrightString2);
		batavgvsrightArray.push(batavgvsrightString3);

		

var batavgvsrightString = batavgvsrightArray.toString();
var batavgvsrightTempArray = new Array();

///------hrvsright------///
	var hrvsright = u.indexOf('------HR VS. RIGHT-----');
	var hrvsrightString = u.substring(hrvsright + 79, hrvsright + 79 + 23);
	var hrvsrightString2 = u.substring(hrvsright + 159, hrvsright + 159 + 23);
	var hrvsrightString3 = u.substring(hrvsright + 239, hrvsright + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hrvsrightString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrvsrightString = hrvsrightString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrvsrightString = hrvsrightString.replace(myTempString,myTempString2);

	}

	myTempString = hrvsrightString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrvsrightString2 = hrvsrightString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrvsrightString2 = hrvsrightString2.replace(myTempString,myTempString2);

	}	

	myTempString = hrvsrightString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrvsrightString3 = hrvsrightString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrvsrightString3 = hrvsrightString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hrvsrightString.search(regex) != -1){

					

			if(hrvsrightString.indexOf('team_other.html') == -1){
				//hrvsrightString = hrvsrightString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrvsrightString = hrvsrightString.replace(regex,teamLinkArray[i]);
				hrvsrightString = trim(hrvsrightString);
			}

		}
		if(hrvsrightString2.search(regex) != -1){

			if(hrvsrightString2.indexOf('team_other.html') == -1){
				//hrvsrightString2 = hrvsrightString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrvsrightString2 = hrvsrightString2.replace(regex,teamLinkArray[i]);
				hrvsrightString2 = trim(hrvsrightString2);
				
			}

		}
		if(hrvsrightString3.search(regex) != -1){

			if(hrvsrightString3.indexOf('team_other.html') == -1){
				//hrvsrightString3 = hrvsrightString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrvsrightString3 = hrvsrightString3.replace(regex,teamLinkArray[i]);
				hrvsrightString3 = trim(hrvsrightString3);
			}

		}

		

	}

		hrvsrightArray.push(hrvsrightString);
		hrvsrightArray.push(hrvsrightString2);
		hrvsrightArray.push(hrvsrightString3);

		

var hrvsrightString = hrvsrightArray.toString();
var hrvsrightTempArray = new Array();

///------errors------///
	var errors = u.indexOf('---------ERRORS--------');
	var errorsString = u.substring(errors + 79, errors + 79 + 23);
	var errorsString2 = u.substring(errors + 159, errors + 159 + 23);
	var errorsString3 = u.substring(errors + 239, errors + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = errorsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		errorsString = errorsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		errorsString = errorsString.replace(myTempString,myTempString2);

	}

	myTempString = errorsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		errorsString2 = errorsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		errorsString2 = errorsString2.replace(myTempString,myTempString2);

	}	

	myTempString = errorsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		errorsString3 = errorsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		errorsString3 = errorsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(errorsString.search(regex) != -1){

					

			if(errorsString.indexOf('team_other.html') == -1){
				//errorsString = errorsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				errorsString = errorsString.replace(regex,teamLinkArray[i]);
				errorsString = trim(errorsString);
			}

		}
		if(errorsString2.search(regex) != -1){

			if(errorsString2.indexOf('team_other.html') == -1){
				//errorsString2 = errorsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				errorsString2 = errorsString2.replace(regex,teamLinkArray[i]);
				errorsString2 = trim(errorsString2);
				
			}

		}
		if(errorsString3.search(regex) != -1){

			if(errorsString3.indexOf('team_other.html') == -1){
				//errorsString3 = errorsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				errorsString3 = errorsString3.replace(regex,teamLinkArray[i]);
				errorsString3 = trim(errorsString3);
			}

		}

		

	}

		errorsArray.push(errorsString);
		errorsArray.push(errorsString2);
		errorsArray.push(errorsString3);

		

var errorsString = errorsArray.toString();
var errorsTempArray = new Array();

///------opponentsteals------///
	var opponentsteals = u.indexOf('----OPPONENT STEALS----');
	var opponentstealsString = u.substring(opponentsteals + 79, opponentsteals + 79 + 23);
	var opponentstealsString2 = u.substring(opponentsteals + 159, opponentsteals + 159 + 23);
	var opponentstealsString3 = u.substring(opponentsteals + 239, opponentsteals + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = opponentstealsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentstealsString = opponentstealsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentstealsString = opponentstealsString.replace(myTempString,myTempString2);

	}

	myTempString = opponentstealsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentstealsString2 = opponentstealsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentstealsString2 = opponentstealsString2.replace(myTempString,myTempString2);

	}	

	myTempString = opponentstealsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentstealsString3 = opponentstealsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentstealsString3 = opponentstealsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(opponentstealsString.search(regex) != -1){

					

			if(opponentstealsString.indexOf('team_other.html') == -1){
				//opponentstealsString = opponentstealsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentstealsString = opponentstealsString.replace(regex,teamLinkArray[i]);
				opponentstealsString = trim(opponentstealsString);
			}

		}
		if(opponentstealsString2.search(regex) != -1){

			if(opponentstealsString2.indexOf('team_other.html') == -1){
				//opponentstealsString2 = opponentstealsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentstealsString2 = opponentstealsString2.replace(regex,teamLinkArray[i]);
				opponentstealsString2 = trim(opponentstealsString2);
				
			}

		}
		if(opponentstealsString3.search(regex) != -1){

			if(opponentstealsString3.indexOf('team_other.html') == -1){
				//opponentstealsString3 = opponentstealsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentstealsString3 = opponentstealsString3.replace(regex,teamLinkArray[i]);
				opponentstealsString3 = trim(opponentstealsString3);
			}

		}

		

	}

		opponentstealsArray.push(opponentstealsString);
		opponentstealsArray.push(opponentstealsString2);
		opponentstealsArray.push(opponentstealsString3);

		

var opponentstealsString = opponentstealsArray.toString();
var opponentstealsTempArray = new Array();

///------opponentsbpct------///
	var opponentsbpct = u.indexOf('----OPPONENT SB PCT----');
	var opponentsbpctString = u.substring(opponentsbpct + 79, opponentsbpct + 79 + 23);
	var opponentsbpctString2 = u.substring(opponentsbpct + 159, opponentsbpct + 159 + 23);
	var opponentsbpctString3 = u.substring(opponentsbpct + 239, opponentsbpct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = opponentsbpctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentsbpctString = opponentsbpctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentsbpctString = opponentsbpctString.replace(myTempString,myTempString2);

	}

	myTempString = opponentsbpctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentsbpctString2 = opponentsbpctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentsbpctString2 = opponentsbpctString2.replace(myTempString,myTempString2);

	}	

	myTempString = opponentsbpctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentsbpctString3 = opponentsbpctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentsbpctString3 = opponentsbpctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(opponentsbpctString.search(regex) != -1){

					

			if(opponentsbpctString.indexOf('team_other.html') == -1){
				//opponentsbpctString = opponentsbpctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentsbpctString = opponentsbpctString.replace(regex,teamLinkArray[i]);
				opponentsbpctString = trim(opponentsbpctString);
			}

		}
		if(opponentsbpctString2.search(regex) != -1){

			if(opponentsbpctString2.indexOf('team_other.html') == -1){
				//opponentsbpctString2 = opponentsbpctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentsbpctString2 = opponentsbpctString2.replace(regex,teamLinkArray[i]);
				opponentsbpctString2 = trim(opponentsbpctString2);
				
			}

		}
		if(opponentsbpctString3.search(regex) != -1){

			if(opponentsbpctString3.indexOf('team_other.html') == -1){
				//opponentsbpctString3 = opponentsbpctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentsbpctString3 = opponentsbpctString3.replace(regex,teamLinkArray[i]);
				opponentsbpctString3 = trim(opponentsbpctString3);
			}

		}

		

	}

		opponentsbpctArray.push(opponentsbpctString);
		opponentsbpctArray.push(opponentsbpctString2);
		opponentsbpctArray.push(opponentsbpctString3);

		

var opponentsbpctString = opponentsbpctArray.toString();
var opponentsbpctTempArray = new Array();


//--------------------------------------------------pitcher_records--------------------------------------------------//
///------wins------///
	var wins = u.indexOf('----------WINS---------');
	var winsString = u.substring(wins + 79, wins + 79 + 23);
	var winsString2 = u.substring(wins + 159, wins + 159 + 23);
	var winsString3 = u.substring(wins + 239, wins + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = winsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		winsString = winsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		winsString = winsString.replace(myTempString,myTempString2);

	}

	myTempString = winsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		winsString2 = winsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		winsString2 = winsString2.replace(myTempString,myTempString2);

	}	

	myTempString = winsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		winsString3 = winsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		winsString3 = winsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(winsString.search(regex) != -1){

					

			if(winsString.indexOf('team_other.html') == -1){
				//winsString = winsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				winsString = winsString.replace(regex,teamLinkArray[i]);
				winsString = trim(winsString);
			}

		}
		if(winsString2.search(regex) != -1){

			if(winsString2.indexOf('team_other.html') == -1){
				//winsString2 = winsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				winsString2 = winsString2.replace(regex,teamLinkArray[i]);
				winsString2 = trim(winsString2);
				
			}

		}
		if(winsString3.search(regex) != -1){

			if(winsString3.indexOf('team_other.html') == -1){
				//winsString3 = winsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				winsString3 = winsString3.replace(regex,teamLinkArray[i]);
				winsString3 = trim(winsString3);
			}

		}

		

	}

		winsArray.push(winsString);
		winsArray.push(winsString2);
		winsArray.push(winsString3);

		

var winsString = winsArray.toString();
var winsTempArray = new Array();


///------losses------///
	var losses = u.indexOf('---------LOSSES--------');
	var lossesString = u.substring(losses + 79, losses + 79 + 23);
	var lossesString2 = u.substring(losses + 159, losses + 159 + 23);
	var lossesString3 = u.substring(losses + 239, losses + 239 + 23);


	var myTempString;
	var myTempString2;	

	myTempString = lossesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		lossesString = lossesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		lossesString = lossesString.replace(myTempString,myTempString2);

	}

	myTempString = lossesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		lossesString2 = lossesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		lossesString2 = lossesString2.replace(myTempString,myTempString2);

	}	

	myTempString = lossesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		lossesString3 = lossesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		lossesString3 = lossesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(lossesString.search(regex) != -1){

					

			if(lossesString.indexOf('team_other.html') == -1){
				//lossesString = lossesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				lossesString = lossesString.replace(regex,teamLinkArray[i]);
				lossesString = trim(lossesString);
			}

		}
		if(lossesString2.search(regex) != -1){

			if(lossesString2.indexOf('team_other.html') == -1){
				//lossesString2 = lossesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				lossesString2 = lossesString2.replace(regex,teamLinkArray[i]);
				lossesString2 = trim(lossesString2);
				
			}

		}
		if(lossesString3.search(regex) != -1){

			if(lossesString3.indexOf('team_other.html') == -1){
				//lossesString3 = lossesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				lossesString3 = lossesString3.replace(regex,teamLinkArray[i]);
				lossesString3 = trim(lossesString3);
			}

		}

		

	}

		lossesArray.push(lossesString);
		lossesArray.push(lossesString2);
		lossesArray.push(lossesString3);

	

var lossesString = lossesArray.toString();
var lossesTempArray = new Array();
/*
if(lossesString.indexOf('***') != -1){


	lossesString = lossesString.replace(/[***]{3}/g,'<a>***</a>');

	lossesString = lossesTempArray.toString();
	lossesString = lossesString.replace(/[<a>***</a>]{10}/g,'***');
	lossesArray = lossesString.split(',');
	
}
*/

///------winningpct------///
	var winningpct = u.indexOf('------WINNING PCT------');
	var winningpctString = u.substring(winningpct + 79, winningpct + 79 + 23);
	var winningpctString2 = u.substring(winningpct + 159, winningpct + 159 + 23);
	var winningpctString3 = u.substring(winningpct + 239, winningpct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = winningpctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		winningpctString = winningpctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		winningpctString = winningpctString.replace(myTempString,myTempString2);

	}

	myTempString = winningpctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		winningpctString2 = winningpctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		winningpctString2 = winningpctString2.replace(myTempString,myTempString2);

	}	

	myTempString = winningpctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		winningpctString3 = winningpctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		winningpctString3 = winningpctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(winningpctString.search(regex) != -1){

					

			if(winningpctString.indexOf('team_other.html') == -1){
				//winningpctString = winningpctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				winningpctString = winningpctString.replace(regex,teamLinkArray[i]);
				winningpctString = trim(winningpctString);
			}

		}
		if(winningpctString2.search(regex) != -1){

			if(winningpctString2.indexOf('team_other.html') == -1){
				//winningpctString2 = winningpctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				winningpctString2 = winningpctString2.replace(regex,teamLinkArray[i]);
				winningpctString2 = trim(winningpctString2);
				
			}

		}
		if(winningpctString3.search(regex) != -1){

			if(winningpctString3.indexOf('team_other.html') == -1){
				//winningpctString3 = winningpctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				winningpctString3 = winningpctString3.replace(regex,teamLinkArray[i]);
				winningpctString3 = trim(winningpctString3);
			}

		}

		

	}

		winningpctArray.push(winningpctString);
		winningpctArray.push(winningpctString2);
		winningpctArray.push(winningpctString3);

		

var winningpctString = winningpctArray.toString();
var winningpctTempArray = new Array();

///------era------///
	var era = u.indexOf('----------ERA----------');
	var eraString = u.substring(era + 79, era + 79 + 23);
	var eraString2 = u.substring(era + 159, era + 159 + 23);
	var eraString3 = u.substring(era + 239, era + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = eraString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		eraString = eraString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		eraString = eraString.replace(myTempString,myTempString2);

	}

	myTempString = eraString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		eraString2 = eraString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		eraString2 = eraString2.replace(myTempString,myTempString2);

	}	

	myTempString = eraString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		eraString3 = eraString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		eraString3 = eraString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(eraString.search(regex) != -1){

					

			if(eraString.indexOf('team_other.html') == -1){
				//eraString = eraString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				eraString = eraString.replace(regex,teamLinkArray[i]);
				eraString = trim(eraString);
			}

		}
		if(eraString2.search(regex) != -1){

			if(eraString2.indexOf('team_other.html') == -1){
				//eraString2 = eraString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				eraString2 = eraString2.replace(regex,teamLinkArray[i]);
				eraString2 = trim(eraString2);
				
			}

		}
		if(eraString3.search(regex) != -1){

			if(eraString3.indexOf('team_other.html') == -1){
				//eraString3 = eraString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				eraString3 = eraString3.replace(regex,teamLinkArray[i]);
				eraString3 = trim(eraString3);
			}

		}

		

	}

		eraArray.push(eraString);
		eraArray.push(eraString2);
		eraArray.push(eraString3);

		

var eraString = eraArray.toString();
var eraTempArray = new Array();

///------inningspitched------///
	var inningspitched = u.indexOf('----INNINGS PITCHED----');
	var inningspitchedString = u.substring(inningspitched + 79, inningspitched + 79 + 23);
	var inningspitchedString2 = u.substring(inningspitched + 159, inningspitched + 159 + 23);
	var inningspitchedString3 = u.substring(inningspitched + 239, inningspitched + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = inningspitchedString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		inningspitchedString = inningspitchedString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		inningspitchedString = inningspitchedString.replace(myTempString,myTempString2);

	}

	myTempString = inningspitchedString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		inningspitchedString2 = inningspitchedString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		inningspitchedString2 = inningspitchedString2.replace(myTempString,myTempString2);

	}	

	myTempString = inningspitchedString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		inningspitchedString3 = inningspitchedString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		inningspitchedString3 = inningspitchedString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(inningspitchedString.search(regex) != -1){

					

			if(inningspitchedString.indexOf('team_other.html') == -1){
				//inningspitchedString = inningspitchedString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				inningspitchedString = inningspitchedString.replace(regex,teamLinkArray[i]);
				inningspitchedString = trim(inningspitchedString);
			}

		}
		if(inningspitchedString2.search(regex) != -1){

			if(inningspitchedString2.indexOf('team_other.html') == -1){
				//inningspitchedString2 = inningspitchedString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				inningspitchedString2 = inningspitchedString2.replace(regex,teamLinkArray[i]);
				inningspitchedString2 = trim(inningspitchedString2);
				
			}

		}
		if(inningspitchedString3.search(regex) != -1){

			if(inningspitchedString3.indexOf('team_other.html') == -1){
				//inningspitchedString3 = inningspitchedString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				inningspitchedString3 = inningspitchedString3.replace(regex,teamLinkArray[i]);
				inningspitchedString3 = trim(inningspitchedString3);
			}

		}

		

	}

		inningspitchedArray.push(inningspitchedString);
		inningspitchedArray.push(inningspitchedString2);
		inningspitchedArray.push(inningspitchedString3);

		

var inningspitchedString = inningspitchedArray.toString();
var inningspitchedTempArray = new Array();

///------tbf------///
	var tbf = u.indexOf('----------TBF----------');
	var tbfString = u.substring(tbf + 79, tbf + 79 + 23);
	var tbfString2 = u.substring(tbf + 159, tbf + 159 + 23);
	var tbfString3 = u.substring(tbf + 239, tbf + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = tbfString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		tbfString = tbfString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		tbfString = tbfString.replace(myTempString,myTempString2);

	}

	myTempString = tbfString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		tbfString2 = tbfString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		tbfString2 = tbfString2.replace(myTempString,myTempString2);

	}	

	myTempString = tbfString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		tbfString3 = tbfString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		tbfString3 = tbfString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(tbfString.search(regex) != -1){

					

			if(tbfString.indexOf('team_other.html') == -1){
				//tbfString = tbfString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				tbfString = tbfString.replace(regex,teamLinkArray[i]);
				tbfString = trim(tbfString);
			}

		}
		if(tbfString2.search(regex) != -1){

			if(tbfString2.indexOf('team_other.html') == -1){
				//tbfString2 = tbfString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				tbfString2 = tbfString2.replace(regex,teamLinkArray[i]);
				tbfString2 = trim(tbfString2);
				
			}

		}
		if(tbfString3.search(regex) != -1){

			if(tbfString3.indexOf('team_other.html') == -1){
				//tbfString3 = tbfString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				tbfString3 = tbfString3.replace(regex,teamLinkArray[i]);
				tbfString3 = trim(tbfString3);
			}

		}

		

	}

		tbfArray.push(tbfString);
		tbfArray.push(tbfString2);
		tbfArray.push(tbfString3);

		

var tbfString = tbfArray.toString();
var tbfTempArray = new Array();

///------gamespitched------///
	var gamespitched = u.indexOf('-----GAMES PITCHED-----');
	var gamespitchedString = u.substring(gamespitched + 79, gamespitched + 79 + 23);
	var gamespitchedString2 = u.substring(gamespitched + 159, gamespitched + 159 + 23);
	var gamespitchedString3 = u.substring(gamespitched + 239, gamespitched + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = gamespitchedString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gamespitchedString = gamespitchedString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gamespitchedString = gamespitchedString.replace(myTempString,myTempString2);

	}

	myTempString = gamespitchedString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gamespitchedString2 = gamespitchedString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gamespitchedString2 = gamespitchedString2.replace(myTempString,myTempString2);

	}	

	myTempString = gamespitchedString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gamespitchedString3 = gamespitchedString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gamespitchedString3 = gamespitchedString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(gamespitchedString.search(regex) != -1){

					

			if(gamespitchedString.indexOf('team_other.html') == -1){
				//gamespitchedString = gamespitchedString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gamespitchedString = gamespitchedString.replace(regex,teamLinkArray[i]);
				gamespitchedString = trim(gamespitchedString);
			}

		}
		if(gamespitchedString2.search(regex) != -1){

			if(gamespitchedString2.indexOf('team_other.html') == -1){
				//gamespitchedString2 = gamespitchedString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gamespitchedString2 = gamespitchedString2.replace(regex,teamLinkArray[i]);
				gamespitchedString2 = trim(gamespitchedString2);
				
			}

		}
		if(gamespitchedString3.search(regex) != -1){

			if(gamespitchedString3.indexOf('team_other.html') == -1){
				//gamespitchedString3 = gamespitchedString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gamespitchedString3 = gamespitchedString3.replace(regex,teamLinkArray[i]);
				gamespitchedString3 = trim(gamespitchedString3);
			}

		}

		

	}

		gamespitchedArray.push(gamespitchedString);
		gamespitchedArray.push(gamespitchedString2);
		gamespitchedArray.push(gamespitchedString3);

		

var gamespitchedString = gamespitchedArray.toString();
var gamespitchedTempArray = new Array();

///------completegames------///
	var completegames = u.indexOf('-----COMPLETE GAMES----');
	var completegamesString = u.substring(completegames + 79, completegames + 79 + 23);
	var completegamesString2 = u.substring(completegames + 159, completegames + 159 + 23);
	var completegamesString3 = u.substring(completegames + 239, completegames + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = completegamesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		completegamesString = completegamesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		completegamesString = completegamesString.replace(myTempString,myTempString2);

	}

	myTempString = completegamesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		completegamesString2 = completegamesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		completegamesString2 = completegamesString2.replace(myTempString,myTempString2);

	}	

	myTempString = completegamesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		completegamesString3 = completegamesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		completegamesString3 = completegamesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(completegamesString.search(regex) != -1){

					

			if(completegamesString.indexOf('team_other.html') == -1){
				//completegamesString = completegamesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				completegamesString = completegamesString.replace(regex,teamLinkArray[i]);
				completegamesString = trim(completegamesString);
			}

		}
		if(completegamesString2.search(regex) != -1){

			if(completegamesString2.indexOf('team_other.html') == -1){
				//completegamesString2 = completegamesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				completegamesString2 = completegamesString2.replace(regex,teamLinkArray[i]);
				completegamesString2 = trim(completegamesString2);
				
			}

		}
		if(completegamesString3.search(regex) != -1){

			if(completegamesString3.indexOf('team_other.html') == -1){
				//completegamesString3 = completegamesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				completegamesString3 = completegamesString3.replace(regex,teamLinkArray[i]);
				completegamesString3 = trim(completegamesString3);
			}

		}

		

	}

		completegamesArray.push(completegamesString);
		completegamesArray.push(completegamesString2);
		completegamesArray.push(completegamesString3);

		

var completegamesString = completegamesArray.toString();
var completegamesTempArray = new Array();

///------gamesfinished------///
	var gamesfinished = u.indexOf('-----GAMES FINISHED----');
	var gamesfinishedString = u.substring(gamesfinished + 79, gamesfinished + 79 + 23);
	var gamesfinishedString2 = u.substring(gamesfinished + 159, gamesfinished + 159 + 23);
	var gamesfinishedString3 = u.substring(gamesfinished + 239, gamesfinished + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = gamesfinishedString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gamesfinishedString = gamesfinishedString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gamesfinishedString = gamesfinishedString.replace(myTempString,myTempString2);

	}

	myTempString = gamesfinishedString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gamesfinishedString2 = gamesfinishedString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gamesfinishedString2 = gamesfinishedString2.replace(myTempString,myTempString2);

	}	

	myTempString = gamesfinishedString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		gamesfinishedString3 = gamesfinishedString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		gamesfinishedString3 = gamesfinishedString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(gamesfinishedString.search(regex) != -1){

					

			if(gamesfinishedString.indexOf('team_other.html') == -1){
				//gamesfinishedString = gamesfinishedString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gamesfinishedString = gamesfinishedString.replace(regex,teamLinkArray[i]);
				gamesfinishedString = trim(gamesfinishedString);
			}

		}
		if(gamesfinishedString2.search(regex) != -1){

			if(gamesfinishedString2.indexOf('team_other.html') == -1){
				//gamesfinishedString2 = gamesfinishedString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gamesfinishedString2 = gamesfinishedString2.replace(regex,teamLinkArray[i]);
				gamesfinishedString2 = trim(gamesfinishedString2);
				
			}

		}
		if(gamesfinishedString3.search(regex) != -1){

			if(gamesfinishedString3.indexOf('team_other.html') == -1){
				//gamesfinishedString3 = gamesfinishedString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				gamesfinishedString3 = gamesfinishedString3.replace(regex,teamLinkArray[i]);
				gamesfinishedString3 = trim(gamesfinishedString3);
			}

		}

		

	}

		gamesfinishedArray.push(gamesfinishedString);
		gamesfinishedArray.push(gamesfinishedString2);
		gamesfinishedArray.push(gamesfinishedString3);

		

var gamesfinishedString = gamesfinishedArray.toString();
var gamesfinishedTempArray = new Array();

///------saves------///
	var saves = u.indexOf('---------SAVES---------');
	var savesString = u.substring(saves + 79, saves + 79 + 23);
	var savesString2 = u.substring(saves + 159, saves + 159 + 23);
	var savesString3 = u.substring(saves + 239, saves + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = savesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		savesString = savesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		savesString = savesString.replace(myTempString,myTempString2);

	}

	myTempString = savesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		savesString2 = savesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		savesString2 = savesString2.replace(myTempString,myTempString2);

	}	

	myTempString = savesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		savesString3 = savesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		savesString3 = savesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(savesString.search(regex) != -1){

					

			if(savesString.indexOf('team_other.html') == -1){
				//savesString = savesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				savesString = savesString.replace(regex,teamLinkArray[i]);
				savesString = trim(savesString);
			}

		}
		if(savesString2.search(regex) != -1){

			if(savesString2.indexOf('team_other.html') == -1){
				//savesString2 = savesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				savesString2 = savesString2.replace(regex,teamLinkArray[i]);
				savesString2 = trim(savesString2);
				
			}

		}
		if(savesString3.search(regex) != -1){

			if(savesString3.indexOf('team_other.html') == -1){
				//savesString3 = savesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				savesString3 = savesString3.replace(regex,teamLinkArray[i]);
				savesString3 = trim(savesString3);
			}

		}

		

	}

		savesArray.push(savesString);
		savesArray.push(savesString2);
		savesArray.push(savesString3);

		

var savesString = savesArray.toString();
var savesTempArray = new Array();

///------savepct------///
	var savepct = u.indexOf('--------SAVE PCT-------');
	var savepctString = u.substring(savepct + 79, savepct + 79 + 23);
	var savepctString2 = u.substring(savepct + 159, savepct + 159 + 23);
	var savepctString3 = u.substring(savepct + 239, savepct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = savepctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		savepctString = savepctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		savepctString = savepctString.replace(myTempString,myTempString2);

	}

	myTempString = savepctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		savepctString2 = savepctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		savepctString2 = savepctString2.replace(myTempString,myTempString2);

	}	

	myTempString = savepctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		savepctString3 = savepctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		savepctString3 = savepctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(savepctString.search(regex) != -1){

					

			if(savepctString.indexOf('team_other.html') == -1){
				//savepctString = savepctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				savepctString = savepctString.replace(regex,teamLinkArray[i]);
				savepctString = trim(savepctString);
			}

		}
		if(savepctString2.search(regex) != -1){

			if(savepctString2.indexOf('team_other.html') == -1){
				//savepctString2 = savepctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				savepctString2 = savepctString2.replace(regex,teamLinkArray[i]);
				savepctString2 = trim(savepctString2);
				
			}

		}
		if(savepctString3.search(regex) != -1){

			if(savepctString3.indexOf('team_other.html') == -1){
				//savepctString3 = savepctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				savepctString3 = savepctString3.replace(regex,teamLinkArray[i]);
				savepctString3 = trim(savepctString3);
			}

		}

		

	}

		savepctArray.push(savepctString);
		savepctArray.push(savepctString2);
		savepctArray.push(savepctString3);

		

var savepctString = savepctArray.toString();
var savepctTempArray = new Array();

///------shutouts------///
	var shutouts = u.indexOf('--------SHUTOUTS-------');
	var shutoutsString = u.substring(shutouts + 79, shutouts + 79 + 23);
	var shutoutsString2 = u.substring(shutouts + 159, shutouts + 159 + 23);
	var shutoutsString3 = u.substring(shutouts + 239, shutouts + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = shutoutsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		shutoutsString = shutoutsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		shutoutsString = shutoutsString.replace(myTempString,myTempString2);

	}

	myTempString = shutoutsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		shutoutsString2 = shutoutsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		shutoutsString2 = shutoutsString2.replace(myTempString,myTempString2);

	}	

	myTempString = shutoutsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		shutoutsString3 = shutoutsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		shutoutsString3 = shutoutsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(shutoutsString.search(regex) != -1){

					

			if(shutoutsString.indexOf('team_other.html') == -1){
				//shutoutsString = shutoutsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				shutoutsString = shutoutsString.replace(regex,teamLinkArray[i]);
				shutoutsString = trim(shutoutsString);
			}

		}
		if(shutoutsString2.search(regex) != -1){

			if(shutoutsString2.indexOf('team_other.html') == -1){
				//shutoutsString2 = shutoutsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				shutoutsString2 = shutoutsString2.replace(regex,teamLinkArray[i]);
				shutoutsString2 = trim(shutoutsString2);
				
			}

		}
		if(shutoutsString3.search(regex) != -1){

			if(shutoutsString3.indexOf('team_other.html') == -1){
				//shutoutsString3 = shutoutsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				shutoutsString3 = shutoutsString3.replace(regex,teamLinkArray[i]);
				shutoutsString3 = trim(shutoutsString3);
			}

		}

		

	}

		shutoutsArray.push(shutoutsString);
		shutoutsArray.push(shutoutsString2);
		shutoutsArray.push(shutoutsString3);

		

var shutoutsString = shutoutsArray.toString();
var shutoutsTempArray = new Array();

///------hitsallowed------///
	var hitsallowed = u.indexOf('------HITS ALLOWED-----');
	var hitsallowedString = u.substring(hitsallowed + 79, hitsallowed + 79 + 23);
	var hitsallowedString2 = u.substring(hitsallowed + 159, hitsallowed + 159 + 23);
	var hitsallowedString3 = u.substring(hitsallowed + 239, hitsallowed + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hitsallowedString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitsallowedString = hitsallowedString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitsallowedString = hitsallowedString.replace(myTempString,myTempString2);

	}

	myTempString = hitsallowedString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitsallowedString2 = hitsallowedString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitsallowedString2 = hitsallowedString2.replace(myTempString,myTempString2);

	}	

	myTempString = hitsallowedString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hitsallowedString3 = hitsallowedString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hitsallowedString3 = hitsallowedString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hitsallowedString.search(regex) != -1){

					

			if(hitsallowedString.indexOf('team_other.html') == -1){
				//hitsallowedString = hitsallowedString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitsallowedString = hitsallowedString.replace(regex,teamLinkArray[i]);
				hitsallowedString = trim(hitsallowedString);
			}

		}
		if(hitsallowedString2.search(regex) != -1){

			if(hitsallowedString2.indexOf('team_other.html') == -1){
				//hitsallowedString2 = hitsallowedString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitsallowedString2 = hitsallowedString2.replace(regex,teamLinkArray[i]);
				hitsallowedString2 = trim(hitsallowedString2);
				
			}

		}
		if(hitsallowedString3.search(regex) != -1){

			if(hitsallowedString3.indexOf('team_other.html') == -1){
				//hitsallowedString3 = hitsallowedString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hitsallowedString3 = hitsallowedString3.replace(regex,teamLinkArray[i]);
				hitsallowedString3 = trim(hitsallowedString3);
			}

		}

		

	}

		hitsallowedArray.push(hitsallowedString);
		hitsallowedArray.push(hitsallowedString2);
		hitsallowedArray.push(hitsallowedString3);

		

var hitsallowedString = hitsallowedArray.toString();
var hitsallowedTempArray = new Array();

///------runs------///
	var runs = u.indexOf('----------RUNS---------');
	var runsString = u.substring(runs + 79, runs + 79 + 23);
	var runsString2 = u.substring(runs + 159, runs + 159 + 23);
	var runsString3 = u.substring(runs + 239, runs + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = runsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsString = runsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsString = runsString.replace(myTempString,myTempString2);

	}

	myTempString = runsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsString2 = runsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsString2 = runsString2.replace(myTempString,myTempString2);

	}	

	myTempString = runsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsString3 = runsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsString3 = runsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(runsString.search(regex) != -1){

					

			if(runsString.indexOf('team_other.html') == -1){
				//runsString = runsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsString = runsString.replace(regex,teamLinkArray[i]);
				runsString = trim(runsString);
			}

		}
		if(runsString2.search(regex) != -1){

			if(runsString2.indexOf('team_other.html') == -1){
				//runsString2 = runsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsString2 = runsString2.replace(regex,teamLinkArray[i]);
				runsString2 = trim(runsString2);
				
			}

		}
		if(runsString3.search(regex) != -1){

			if(runsString3.indexOf('team_other.html') == -1){
				//runsString3 = runsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsString3 = runsString3.replace(regex,teamLinkArray[i]);
				runsString3 = trim(runsString3);
			}

		}

		

	}

		runsArray.push(runsString);
		runsArray.push(runsString2);
		runsArray.push(runsString3);

		

var runsString = runsArray.toString();
var runsTempArray = new Array();

///------earnedruns------///
	var earnedruns = u.indexOf('------EARNED RUNS------');
	var earnedrunsString = u.substring(earnedruns + 79, earnedruns + 79 + 23);
	var earnedrunsString2 = u.substring(earnedruns + 159, earnedruns + 159 + 23);
	var earnedrunsString3 = u.substring(earnedruns + 239, earnedruns + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = earnedrunsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		earnedrunsString = earnedrunsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		earnedrunsString = earnedrunsString.replace(myTempString,myTempString2);

	}

	myTempString = earnedrunsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		earnedrunsString2 = earnedrunsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		earnedrunsString2 = earnedrunsString2.replace(myTempString,myTempString2);

	}	

	myTempString = earnedrunsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		earnedrunsString3 = earnedrunsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		earnedrunsString3 = earnedrunsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(earnedrunsString.search(regex) != -1){

					

			if(earnedrunsString.indexOf('team_other.html') == -1){
				//earnedrunsString = earnedrunsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				earnedrunsString = earnedrunsString.replace(regex,teamLinkArray[i]);
				earnedrunsString = trim(earnedrunsString);
			}

		}
		if(earnedrunsString2.search(regex) != -1){

			if(earnedrunsString2.indexOf('team_other.html') == -1){
				//earnedrunsString2 = earnedrunsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				earnedrunsString2 = earnedrunsString2.replace(regex,teamLinkArray[i]);
				earnedrunsString2 = trim(earnedrunsString2);
				
			}

		}
		if(earnedrunsString3.search(regex) != -1){

			if(earnedrunsString3.indexOf('team_other.html') == -1){
				//earnedrunsString3 = earnedrunsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				earnedrunsString3 = earnedrunsString3.replace(regex,teamLinkArray[i]);
				earnedrunsString3 = trim(earnedrunsString3);
			}

		}

		

	}

		earnedrunsArray.push(earnedrunsString);
		earnedrunsArray.push(earnedrunsString2);
		earnedrunsArray.push(earnedrunsString3);

		

var earnedrunsString = earnedrunsArray.toString();
var earnedrunsTempArray = new Array();

///------homerunsallowed------///
	var homerunsallowed = u.indexOf('---HOME RUNS ALLOWED---');
	var homerunsallowedString = u.substring(homerunsallowed + 79, homerunsallowed + 79 + 23);
	var homerunsallowedString2 = u.substring(homerunsallowed + 159, homerunsallowed + 159 + 23);
	var homerunsallowedString3 = u.substring(homerunsallowed + 239, homerunsallowed + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = homerunsallowedString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		homerunsallowedString = homerunsallowedString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		homerunsallowedString = homerunsallowedString.replace(myTempString,myTempString2);

	}

	myTempString = homerunsallowedString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		homerunsallowedString2 = homerunsallowedString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		homerunsallowedString2 = homerunsallowedString2.replace(myTempString,myTempString2);

	}	

	myTempString = homerunsallowedString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		homerunsallowedString3 = homerunsallowedString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		homerunsallowedString3 = homerunsallowedString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(homerunsallowedString.search(regex) != -1){

					

			if(homerunsallowedString.indexOf('team_other.html') == -1){
				//homerunsallowedString = homerunsallowedString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				homerunsallowedString = homerunsallowedString.replace(regex,teamLinkArray[i]);
				homerunsallowedString = trim(homerunsallowedString);
			}

		}
		if(homerunsallowedString2.search(regex) != -1){

			if(homerunsallowedString2.indexOf('team_other.html') == -1){
				//homerunsallowedString2 = homerunsallowedString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				homerunsallowedString2 = homerunsallowedString2.replace(regex,teamLinkArray[i]);
				homerunsallowedString2 = trim(homerunsallowedString2);
				
			}

		}
		if(homerunsallowedString3.search(regex) != -1){

			if(homerunsallowedString3.indexOf('team_other.html') == -1){
				//homerunsallowedString3 = homerunsallowedString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				homerunsallowedString3 = homerunsallowedString3.replace(regex,teamLinkArray[i]);
				homerunsallowedString3 = trim(homerunsallowedString3);
			}

		}

		

	}

		homerunsallowedArray.push(homerunsallowedString);
		homerunsallowedArray.push(homerunsallowedString2);
		homerunsallowedArray.push(homerunsallowedString3);

		

var homerunsallowedString = homerunsallowedArray.toString();
var homerunsallowedTempArray = new Array();

///------pitcherwalks------///
	var pitcherwalks = u.indexOf('---------WALKS---------',homerunsallowed);
	var pitcherwalksString = u.substring(pitcherwalks + 79, pitcherwalks + 79 + 23);
	var pitcherwalksString2 = u.substring(pitcherwalks + 159, pitcherwalks + 159 + 23);
	var pitcherwalksString3 = u.substring(pitcherwalks + 239, pitcherwalks + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = pitcherwalksString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcherwalksString = pitcherwalksString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcherwalksString = pitcherwalksString.replace(myTempString,myTempString2);

	}

	myTempString = pitcherwalksString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcherwalksString2 = pitcherwalksString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcherwalksString2 = pitcherwalksString2.replace(myTempString,myTempString2);

	}	

	myTempString = pitcherwalksString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcherwalksString3 = pitcherwalksString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcherwalksString3 = pitcherwalksString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(pitcherwalksString.search(regex) != -1){

					

			if(pitcherwalksString.indexOf('team_other.html') == -1){
				//pitcherwalksString = pitcherwalksString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcherwalksString = pitcherwalksString.replace(regex,teamLinkArray[i]);
				pitcherwalksString = trim(pitcherwalksString);
			}

		}
		if(pitcherwalksString2.search(regex) != -1){

			if(pitcherwalksString2.indexOf('team_other.html') == -1){
				//pitcherwalksString2 = pitcherwalksString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcherwalksString2 = pitcherwalksString2.replace(regex,teamLinkArray[i]);
				pitcherwalksString2 = trim(pitcherwalksString2);
				
			}

		}
		if(pitcherwalksString3.search(regex) != -1){

			if(pitcherwalksString3.indexOf('team_other.html') == -1){
				//pitcherwalksString3 = pitcherwalksString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcherwalksString3 = pitcherwalksString3.replace(regex,teamLinkArray[i]);
				pitcherwalksString3 = trim(pitcherwalksString3);
			}

		}

		

	}

		pitcherwalksArray.push(pitcherwalksString);
		pitcherwalksArray.push(pitcherwalksString2);
		pitcherwalksArray.push(pitcherwalksString3);

		

var pitcherwalksString = pitcherwalksArray.toString();
var pitcherwalksTempArray = new Array();

///------pitcherstrikeouts------///
	var pitcherstrikeouts = u.indexOf('-------STRIKEOUTS------',homerunsallowed);
	var pitcherstrikeoutsString = u.substring(pitcherstrikeouts + 79, pitcherstrikeouts + 79 + 23);
	var pitcherstrikeoutsString2 = u.substring(pitcherstrikeouts + 159, pitcherstrikeouts + 159 + 23);
	var pitcherstrikeoutsString3 = u.substring(pitcherstrikeouts + 239, pitcherstrikeouts + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = pitcherstrikeoutsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcherstrikeoutsString = pitcherstrikeoutsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcherstrikeoutsString = pitcherstrikeoutsString.replace(myTempString,myTempString2);

	}

	myTempString = pitcherstrikeoutsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcherstrikeoutsString2 = pitcherstrikeoutsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcherstrikeoutsString2 = pitcherstrikeoutsString2.replace(myTempString,myTempString2);

	}	

	myTempString = pitcherstrikeoutsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcherstrikeoutsString3 = pitcherstrikeoutsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcherstrikeoutsString3 = pitcherstrikeoutsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(pitcherstrikeoutsString.search(regex) != -1){

					

			if(pitcherstrikeoutsString.indexOf('team_other.html') == -1){
				//pitcherstrikeoutsString = pitcherstrikeoutsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcherstrikeoutsString = pitcherstrikeoutsString.replace(regex,teamLinkArray[i]);
				pitcherstrikeoutsString = trim(pitcherstrikeoutsString);
			}

		}
		if(pitcherstrikeoutsString2.search(regex) != -1){

			if(pitcherstrikeoutsString2.indexOf('team_other.html') == -1){
				//pitcherstrikeoutsString2 = pitcherstrikeoutsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcherstrikeoutsString2 = pitcherstrikeoutsString2.replace(regex,teamLinkArray[i]);
				pitcherstrikeoutsString2 = trim(pitcherstrikeoutsString2);
				
			}

		}
		if(pitcherstrikeoutsString3.search(regex) != -1){

			if(pitcherstrikeoutsString3.indexOf('team_other.html') == -1){
				//pitcherstrikeoutsString3 = pitcherstrikeoutsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcherstrikeoutsString3 = pitcherstrikeoutsString3.replace(regex,teamLinkArray[i]);
				pitcherstrikeoutsString3 = trim(pitcherstrikeoutsString3);
			}

		}

		

	}

		pitcherstrikeoutsArray.push(pitcherstrikeoutsString);
		pitcherstrikeoutsArray.push(pitcherstrikeoutsString2);
		pitcherstrikeoutsArray.push(pitcherstrikeoutsString3);

		

var pitcherstrikeoutsString = pitcherstrikeoutsArray.toString();
var pitcherstrikeoutsTempArray = new Array();

///------wildpitches------///
	var wildpitches = u.indexOf('------WILD PITCHES-----');
	var wildpitchesString = u.substring(wildpitches + 79, wildpitches + 79 + 23);
	var wildpitchesString2 = u.substring(wildpitches + 159, wildpitches + 159 + 23);
	var wildpitchesString3 = u.substring(wildpitches + 239, wildpitches + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = wildpitchesString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		wildpitchesString = wildpitchesString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		wildpitchesString = wildpitchesString.replace(myTempString,myTempString2);

	}

	myTempString = wildpitchesString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		wildpitchesString2 = wildpitchesString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		wildpitchesString2 = wildpitchesString2.replace(myTempString,myTempString2);

	}	

	myTempString = wildpitchesString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		wildpitchesString3 = wildpitchesString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		wildpitchesString3 = wildpitchesString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(wildpitchesString.search(regex) != -1){

					

			if(wildpitchesString.indexOf('team_other.html') == -1){
				//wildpitchesString = wildpitchesString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				wildpitchesString = wildpitchesString.replace(regex,teamLinkArray[i]);
				wildpitchesString = trim(wildpitchesString);
			}

		}
		if(wildpitchesString2.search(regex) != -1){

			if(wildpitchesString2.indexOf('team_other.html') == -1){
				//wildpitchesString2 = wildpitchesString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				wildpitchesString2 = wildpitchesString2.replace(regex,teamLinkArray[i]);
				wildpitchesString2 = trim(wildpitchesString2);
				
			}

		}
		if(wildpitchesString3.search(regex) != -1){

			if(wildpitchesString3.indexOf('team_other.html') == -1){
				//wildpitchesString3 = wildpitchesString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				wildpitchesString3 = wildpitchesString3.replace(regex,teamLinkArray[i]);
				wildpitchesString3 = trim(wildpitchesString3);
			}

		}

		

	}

		wildpitchesArray.push(wildpitchesString);
		wildpitchesArray.push(wildpitchesString2);
		wildpitchesArray.push(wildpitchesString3);

		

var wildpitchesString = wildpitchesArray.toString();
var wildpitchesTempArray = new Array();

///------balks------///
	var balks = u.indexOf('---------BALKS---------');
	var balksString = u.substring(balks + 79, balks + 79 + 23);
	var balksString2 = u.substring(balks + 159, balks + 159 + 23);
	var balksString3 = u.substring(balks + 239, balks + 239 + 23);

	if(balksString.indexOf('*****NONE*****') == -1){	

	var myTempString;
	var myTempString2;	

	myTempString = balksString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		balksString = balksString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		balksString = balksString.replace(myTempString,myTempString2);

	}

	myTempString = balksString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		balksString2 = balksString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		balksString2 = balksString2.replace(myTempString,myTempString2);

	}	

	myTempString = balksString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		balksString3 = balksString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		balksString3 = balksString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(balksString.search(regex) != -1){

					

			if(balksString.indexOf('team_other.html') == -1){
				//balksString = balksString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				balksString = balksString.replace(regex,teamLinkArray[i]);
				balksString = trim(balksString);
			}

		}
		if(balksString2.search(regex) != -1){

			if(balksString2.indexOf('team_other.html') == -1){
				//balksString2 = balksString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				balksString2 = balksString2.replace(regex,teamLinkArray[i]);
				balksString2 = trim(balksString2);
				
			}

		}
		if(balksString3.search(regex) != -1){

			if(balksString3.indexOf('team_other.html') == -1){
				//balksString3 = balksString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				balksString3 = balksString3.replace(regex,teamLinkArray[i]);
				balksString3 = trim(balksString3);
			}

		}

		

	}

		balksArray.push(balksString);
		balksArray.push(balksString2);
		balksArray.push(balksString3);

		

var balksString = balksArray.toString();
var balksTempArray = new Array();

	}//if(balksString.indexOf('*****NONE*****') == -1){

///------pitcheropponentsteals------///
	var pitcheropponentsteals = u.indexOf('----OPPONENT STEALS----',homerunsallowed);
	var pitcheropponentstealsString = u.substring(pitcheropponentsteals + 79, pitcheropponentsteals + 79 + 23);
	var pitcheropponentstealsString2 = u.substring(pitcheropponentsteals + 159, pitcheropponentsteals + 159 + 23);
	var pitcheropponentstealsString3 = u.substring(pitcheropponentsteals + 239, pitcheropponentsteals + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = pitcheropponentstealsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcheropponentstealsString = pitcheropponentstealsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcheropponentstealsString = pitcheropponentstealsString.replace(myTempString,myTempString2);

	}

	myTempString = pitcheropponentstealsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcheropponentstealsString2 = pitcheropponentstealsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcheropponentstealsString2 = pitcheropponentstealsString2.replace(myTempString,myTempString2);

	}	

	myTempString = pitcheropponentstealsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcheropponentstealsString3 = pitcheropponentstealsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcheropponentstealsString3 = pitcheropponentstealsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(pitcheropponentstealsString.search(regex) != -1){

					

			if(pitcheropponentstealsString.indexOf('team_other.html') == -1){
				//pitcheropponentstealsString = pitcheropponentstealsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcheropponentstealsString = pitcheropponentstealsString.replace(regex,teamLinkArray[i]);
				pitcheropponentstealsString = trim(pitcheropponentstealsString);
			}

		}
		if(pitcheropponentstealsString2.search(regex) != -1){

			if(pitcheropponentstealsString2.indexOf('team_other.html') == -1){
				//pitcheropponentstealsString2 = pitcheropponentstealsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcheropponentstealsString2 = pitcheropponentstealsString2.replace(regex,teamLinkArray[i]);
				pitcheropponentstealsString2 = trim(pitcheropponentstealsString2);
				
			}

		}
		if(pitcheropponentstealsString3.search(regex) != -1){

			if(pitcheropponentstealsString3.indexOf('team_other.html') == -1){
				//pitcheropponentstealsString3 = pitcheropponentstealsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcheropponentstealsString3 = pitcheropponentstealsString3.replace(regex,teamLinkArray[i]);
				pitcheropponentstealsString3 = trim(pitcheropponentstealsString3);
			}

		}

		

	}

		pitcheropponentstealsArray.push(pitcheropponentstealsString);
		pitcheropponentstealsArray.push(pitcheropponentstealsString2);
		pitcheropponentstealsArray.push(pitcheropponentstealsString3);

		

var pitcheropponentstealsString = pitcheropponentstealsArray.toString();
var pitcheropponentstealsTempArray = new Array();

///------pitcheropponentsbpct------///
	var pitcheropponentsbpct = u.indexOf('----OPPONENT SB PCT----',homerunsallowed);
	var pitcheropponentsbpctString = u.substring(pitcheropponentsbpct + 79, pitcheropponentsbpct + 79 + 23);
	var pitcheropponentsbpctString2 = u.substring(pitcheropponentsbpct + 159, pitcheropponentsbpct + 159 + 23);
	var pitcheropponentsbpctString3 = u.substring(pitcheropponentsbpct + 239, pitcheropponentsbpct + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = pitcheropponentsbpctString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcheropponentsbpctString = pitcheropponentsbpctString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcheropponentsbpctString = pitcheropponentsbpctString.replace(myTempString,myTempString2);

	}

	myTempString = pitcheropponentsbpctString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcheropponentsbpctString2 = pitcheropponentsbpctString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcheropponentsbpctString2 = pitcheropponentsbpctString2.replace(myTempString,myTempString2);

	}	

	myTempString = pitcheropponentsbpctString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		pitcheropponentsbpctString3 = pitcheropponentsbpctString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		pitcheropponentsbpctString3 = pitcheropponentsbpctString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(pitcheropponentsbpctString.search(regex) != -1){

					

			if(pitcheropponentsbpctString.indexOf('team_other.html') == -1){
				//pitcheropponentsbpctString = pitcheropponentsbpctString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcheropponentsbpctString = pitcheropponentsbpctString.replace(regex,teamLinkArray[i]);
				pitcheropponentsbpctString = trim(pitcheropponentsbpctString);
			}

		}
		if(pitcheropponentsbpctString2.search(regex) != -1){

			if(pitcheropponentsbpctString2.indexOf('team_other.html') == -1){
				//pitcheropponentsbpctString2 = pitcheropponentsbpctString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcheropponentsbpctString2 = pitcheropponentsbpctString2.replace(regex,teamLinkArray[i]);
				pitcheropponentsbpctString2 = trim(pitcheropponentsbpctString2);
				
			}

		}
		if(pitcheropponentsbpctString3.search(regex) != -1){

			if(pitcheropponentsbpctString3.indexOf('team_other.html') == -1){
				//pitcheropponentsbpctString3 = pitcheropponentsbpctString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				pitcheropponentsbpctString3 = pitcheropponentsbpctString3.replace(regex,teamLinkArray[i]);
				pitcheropponentsbpctString3 = trim(pitcheropponentsbpctString3);
			}

		}

		

	}

		pitcheropponentsbpctArray.push(pitcheropponentsbpctString);
		pitcheropponentsbpctArray.push(pitcheropponentsbpctString2);
		pitcheropponentsbpctArray.push(pitcheropponentsbpctString3);

		

var pitcheropponentsbpctString = pitcheropponentsbpctArray.toString();
var pitcheropponentsbpctTempArray = new Array();

///------hits9innings------///
	var hits9innings = u.indexOf('----HITS / 9 INNINGS---');
	var hits9inningsString = u.substring(hits9innings + 79, hits9innings + 79 + 23);
	var hits9inningsString2 = u.substring(hits9innings + 159, hits9innings + 159 + 23);
	var hits9inningsString3 = u.substring(hits9innings + 239, hits9innings + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hits9inningsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hits9inningsString = hits9inningsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hits9inningsString = hits9inningsString.replace(myTempString,myTempString2);

	}

	myTempString = hits9inningsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hits9inningsString2 = hits9inningsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hits9inningsString2 = hits9inningsString2.replace(myTempString,myTempString2);

	}	

	myTempString = hits9inningsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hits9inningsString3 = hits9inningsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hits9inningsString3 = hits9inningsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hits9inningsString.search(regex) != -1){

					

			if(hits9inningsString.indexOf('team_other.html') == -1){
				//hits9inningsString = hits9inningsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hits9inningsString = hits9inningsString.replace(regex,teamLinkArray[i]);
				hits9inningsString = trim(hits9inningsString);
			}

		}
		if(hits9inningsString2.search(regex) != -1){

			if(hits9inningsString2.indexOf('team_other.html') == -1){
				//hits9inningsString2 = hits9inningsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hits9inningsString2 = hits9inningsString2.replace(regex,teamLinkArray[i]);
				hits9inningsString2 = trim(hits9inningsString2);
				
			}

		}
		if(hits9inningsString3.search(regex) != -1){

			if(hits9inningsString3.indexOf('team_other.html') == -1){
				//hits9inningsString3 = hits9inningsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hits9inningsString3 = hits9inningsString3.replace(regex,teamLinkArray[i]);
				hits9inningsString3 = trim(hits9inningsString3);
			}

		}

		

	}

		hits9inningsArray.push(hits9inningsString);
		hits9inningsArray.push(hits9inningsString2);
		hits9inningsArray.push(hits9inningsString3);

		

var hits9inningsString = hits9inningsArray.toString();
var hits9inningsTempArray = new Array();

///------bb9innings------///
	var bb9innings = u.indexOf('-----BB / 9 INNINGS----',homerunsallowed);
	var bb9inningsString = u.substring(bb9innings + 79, bb9innings + 79 + 23);
	var bb9inningsString2 = u.substring(bb9innings + 159, bb9innings + 159 + 23);
	var bb9inningsString3 = u.substring(bb9innings + 239, bb9innings + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = bb9inningsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		bb9inningsString = bb9inningsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		bb9inningsString = bb9inningsString.replace(myTempString,myTempString2);

	}

	myTempString = bb9inningsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		bb9inningsString2 = bb9inningsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		bb9inningsString2 = bb9inningsString2.replace(myTempString,myTempString2);

	}	

	myTempString = bb9inningsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		bb9inningsString3 = bb9inningsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		bb9inningsString3 = bb9inningsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(bb9inningsString.search(regex) != -1){

					

			if(bb9inningsString.indexOf('team_other.html') == -1){
				//bb9inningsString = bb9inningsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				bb9inningsString = bb9inningsString.replace(regex,teamLinkArray[i]);
				bb9inningsString = trim(bb9inningsString);
			}

		}
		if(bb9inningsString2.search(regex) != -1){

			if(bb9inningsString2.indexOf('team_other.html') == -1){
				//bb9inningsString2 = bb9inningsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				bb9inningsString2 = bb9inningsString2.replace(regex,teamLinkArray[i]);
				bb9inningsString2 = trim(bb9inningsString2);
				
			}

		}
		if(bb9inningsString3.search(regex) != -1){

			if(bb9inningsString3.indexOf('team_other.html') == -1){
				//bb9inningsString3 = bb9inningsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				bb9inningsString3 = bb9inningsString3.replace(regex,teamLinkArray[i]);
				bb9inningsString3 = trim(bb9inningsString3);
			}

		}

		

	}

		bb9inningsArray.push(bb9inningsString);
		bb9inningsArray.push(bb9inningsString2);
		bb9inningsArray.push(bb9inningsString3);

		

var bb9inningsString = bb9inningsArray.toString();
var bb9inningsTempArray = new Array();

///------ks9innings------///
	var ks9innings = u.indexOf('-----Ks / 9 INNINGS----',homerunsallowed);
	var ks9inningsString = u.substring(ks9innings + 79, ks9innings + 79 + 23);
	var ks9inningsString2 = u.substring(ks9innings + 159, ks9innings + 159 + 23);
	var ks9inningsString3 = u.substring(ks9innings + 239, ks9innings + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = ks9inningsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		ks9inningsString = ks9inningsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		ks9inningsString = ks9inningsString.replace(myTempString,myTempString2);

	}

	myTempString = ks9inningsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		ks9inningsString2 = ks9inningsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		ks9inningsString2 = ks9inningsString2.replace(myTempString,myTempString2);

	}	

	myTempString = ks9inningsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		ks9inningsString3 = ks9inningsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		ks9inningsString3 = ks9inningsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(ks9inningsString.search(regex) != -1){

					

			if(ks9inningsString.indexOf('team_other.html') == -1){
				//ks9inningsString = ks9inningsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				ks9inningsString = ks9inningsString.replace(regex,teamLinkArray[i]);
				ks9inningsString = trim(ks9inningsString);
			}

		}
		if(ks9inningsString2.search(regex) != -1){

			if(ks9inningsString2.indexOf('team_other.html') == -1){
				//ks9inningsString2 = ks9inningsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				ks9inningsString2 = ks9inningsString2.replace(regex,teamLinkArray[i]);
				ks9inningsString2 = trim(ks9inningsString2);
				
			}

		}
		if(ks9inningsString3.search(regex) != -1){

			if(ks9inningsString3.indexOf('team_other.html') == -1){
				//ks9inningsString3 = ks9inningsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				ks9inningsString3 = ks9inningsString3.replace(regex,teamLinkArray[i]);
				ks9inningsString3 = trim(ks9inningsString3);
			}

		}

		

	}

		ks9inningsArray.push(ks9inningsString);
		ks9inningsArray.push(ks9inningsString2);
		ks9inningsArray.push(ks9inningsString3);

		

var ks9inningsString = ks9inningsArray.toString();
var ks9inningsTempArray = new Array();

///------hrs9innings------///
	var hrs9innings = u.indexOf('----HRs / 9 INNINGS----',homerunsallowed);
	var hrs9inningsString = u.substring(hrs9innings + 79, hrs9innings + 79 + 23);
	var hrs9inningsString2 = u.substring(hrs9innings + 159, hrs9innings + 159 + 23);
	var hrs9inningsString3 = u.substring(hrs9innings + 239, hrs9innings + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = hrs9inningsString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrs9inningsString = hrs9inningsString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrs9inningsString = hrs9inningsString.replace(myTempString,myTempString2);

	}

	myTempString = hrs9inningsString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrs9inningsString2 = hrs9inningsString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrs9inningsString2 = hrs9inningsString2.replace(myTempString,myTempString2);

	}	

	myTempString = hrs9inningsString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		hrs9inningsString3 = hrs9inningsString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		hrs9inningsString3 = hrs9inningsString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(hrs9inningsString.search(regex) != -1){

					

			if(hrs9inningsString.indexOf('team_other.html') == -1){
				//hrs9inningsString = hrs9inningsString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrs9inningsString = hrs9inningsString.replace(regex,teamLinkArray[i]);
				hrs9inningsString = trim(hrs9inningsString);
			}

		}
		if(hrs9inningsString2.search(regex) != -1){

			if(hrs9inningsString2.indexOf('team_other.html') == -1){
				//hrs9inningsString2 = hrs9inningsString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrs9inningsString2 = hrs9inningsString2.replace(regex,teamLinkArray[i]);
				hrs9inningsString2 = trim(hrs9inningsString2);
				
			}

		}
		if(hrs9inningsString3.search(regex) != -1){

			if(hrs9inningsString3.indexOf('team_other.html') == -1){
				//hrs9inningsString3 = hrs9inningsString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				hrs9inningsString3 = hrs9inningsString3.replace(regex,teamLinkArray[i]);
				hrs9inningsString3 = trim(hrs9inningsString3);
			}

		}

		

	}

		hrs9inningsArray.push(hrs9inningsString);
		hrs9inningsArray.push(hrs9inningsString2);
		hrs9inningsArray.push(hrs9inningsString3);

		

var hrs9inningsString = hrs9inningsArray.toString();
var hrs9inningsTempArray = new Array();

///------opponentbatavg------///
	var opponentbatavg = u.indexOf('----OPPONENT BAT AVG---',homerunsallowed);
	var opponentbatavgString = u.substring(opponentbatavg + 79, opponentbatavg + 79 + 23);
	var opponentbatavgString2 = u.substring(opponentbatavg + 159, opponentbatavg + 159 + 23);
	var opponentbatavgString3 = u.substring(opponentbatavg + 239, opponentbatavg + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = opponentbatavgString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentbatavgString = opponentbatavgString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentbatavgString = opponentbatavgString.replace(myTempString,myTempString2);

	}

	myTempString = opponentbatavgString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentbatavgString2 = opponentbatavgString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentbatavgString2 = opponentbatavgString2.replace(myTempString,myTempString2);

	}	

	myTempString = opponentbatavgString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		opponentbatavgString3 = opponentbatavgString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		opponentbatavgString3 = opponentbatavgString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(opponentbatavgString.search(regex) != -1){

					

			if(opponentbatavgString.indexOf('team_other.html') == -1){
				//opponentbatavgString = opponentbatavgString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentbatavgString = opponentbatavgString.replace(regex,teamLinkArray[i]);
				opponentbatavgString = trim(opponentbatavgString);
			}

		}
		if(opponentbatavgString2.search(regex) != -1){

			if(opponentbatavgString2.indexOf('team_other.html') == -1){
				//opponentbatavgString2 = opponentbatavgString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentbatavgString2 = opponentbatavgString2.replace(regex,teamLinkArray[i]);
				opponentbatavgString2 = trim(opponentbatavgString2);
				
			}

		}
		if(opponentbatavgString3.search(regex) != -1){

			if(opponentbatavgString3.indexOf('team_other.html') == -1){
				//opponentbatavgString3 = opponentbatavgString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				opponentbatavgString3 = opponentbatavgString3.replace(regex,teamLinkArray[i]);
				opponentbatavgString3 = trim(opponentbatavgString3);
			}

		}

		

	}

		opponentbatavgArray.push(opponentbatavgString);
		opponentbatavgArray.push(opponentbatavgString2);
		opponentbatavgArray.push(opponentbatavgString3);

		

var opponentbatavgString = opponentbatavgArray.toString();
var opponentbatavgTempArray = new Array();

///------leftoppbatavg------///
	var leftoppbatavg = u.indexOf('----LEFT OPP BAT AVG---',homerunsallowed);
	var leftoppbatavgString = u.substring(leftoppbatavg + 79, leftoppbatavg + 79 + 23);
	var leftoppbatavgString2 = u.substring(leftoppbatavg + 159, leftoppbatavg + 159 + 23);
	var leftoppbatavgString3 = u.substring(leftoppbatavg + 239, leftoppbatavg + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = leftoppbatavgString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		leftoppbatavgString = leftoppbatavgString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		leftoppbatavgString = leftoppbatavgString.replace(myTempString,myTempString2);

	}

	myTempString = leftoppbatavgString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		leftoppbatavgString2 = leftoppbatavgString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		leftoppbatavgString2 = leftoppbatavgString2.replace(myTempString,myTempString2);

	}	

	myTempString = leftoppbatavgString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		leftoppbatavgString3 = leftoppbatavgString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		leftoppbatavgString3 = leftoppbatavgString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(leftoppbatavgString.search(regex) != -1){

					

			if(leftoppbatavgString.indexOf('team_other.html') == -1){
				//leftoppbatavgString = leftoppbatavgString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				leftoppbatavgString = leftoppbatavgString.replace(regex,teamLinkArray[i]);
				leftoppbatavgString = trim(leftoppbatavgString);
			}

		}
		if(leftoppbatavgString2.search(regex) != -1){

			if(leftoppbatavgString2.indexOf('team_other.html') == -1){
				//leftoppbatavgString2 = leftoppbatavgString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				leftoppbatavgString2 = leftoppbatavgString2.replace(regex,teamLinkArray[i]);
				leftoppbatavgString2 = trim(leftoppbatavgString2);
				
			}

		}
		if(leftoppbatavgString3.search(regex) != -1){

			if(leftoppbatavgString3.indexOf('team_other.html') == -1){
				//leftoppbatavgString3 = leftoppbatavgString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				leftoppbatavgString3 = leftoppbatavgString3.replace(regex,teamLinkArray[i]);
				leftoppbatavgString3 = trim(leftoppbatavgString3);
			}

		}

		

	}

		leftoppbatavgArray.push(leftoppbatavgString);
		leftoppbatavgArray.push(leftoppbatavgString2);
		leftoppbatavgArray.push(leftoppbatavgString3);

		

var leftoppbatavgString = leftoppbatavgArray.toString();
var leftoppbatavgTempArray = new Array();

///------rightoppbatavg------///
	var rightoppbatavg = u.indexOf('---RIGHT OPP BAT AVG---',homerunsallowed);
	var rightoppbatavgString = u.substring(rightoppbatavg + 79, rightoppbatavg + 79 + 23);
	var rightoppbatavgString2 = u.substring(rightoppbatavg + 159, rightoppbatavg + 159 + 23);
	var rightoppbatavgString3 = u.substring(rightoppbatavg + 239, rightoppbatavg + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = rightoppbatavgString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		rightoppbatavgString = rightoppbatavgString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		rightoppbatavgString = rightoppbatavgString.replace(myTempString,myTempString2);

	}

	myTempString = rightoppbatavgString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		rightoppbatavgString2 = rightoppbatavgString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		rightoppbatavgString2 = rightoppbatavgString2.replace(myTempString,myTempString2);

	}	

	myTempString = rightoppbatavgString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		rightoppbatavgString3 = rightoppbatavgString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		rightoppbatavgString3 = rightoppbatavgString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(rightoppbatavgString.search(regex) != -1){

					

			if(rightoppbatavgString.indexOf('team_other.html') == -1){
				//rightoppbatavgString = rightoppbatavgString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				rightoppbatavgString = rightoppbatavgString.replace(regex,teamLinkArray[i]);
				rightoppbatavgString = trim(rightoppbatavgString);
			}

		}
		if(rightoppbatavgString2.search(regex) != -1){

			if(rightoppbatavgString2.indexOf('team_other.html') == -1){
				//rightoppbatavgString2 = rightoppbatavgString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				rightoppbatavgString2 = rightoppbatavgString2.replace(regex,teamLinkArray[i]);
				rightoppbatavgString2 = trim(rightoppbatavgString2);
				
			}

		}
		if(rightoppbatavgString3.search(regex) != -1){

			if(rightoppbatavgString3.indexOf('team_other.html') == -1){
				//rightoppbatavgString3 = rightoppbatavgString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				rightoppbatavgString3 = rightoppbatavgString3.replace(regex,teamLinkArray[i]);
				rightoppbatavgString3 = trim(rightoppbatavgString3);
			}

		}

		

	}

		rightoppbatavgArray.push(rightoppbatavgString);
		rightoppbatavgArray.push(rightoppbatavgString2);
		rightoppbatavgArray.push(rightoppbatavgString3);

		

var rightoppbatavgString = rightoppbatavgArray.toString();
var rightoppbatavgTempArray = new Array();

///------runsupport------///
	var runsupport = u.indexOf('------RUN SUPPORT------',homerunsallowed);
	var runsupportString = u.substring(runsupport + 79, runsupport + 79 + 23);
	var runsupportString2 = u.substring(runsupport + 159, runsupport + 159 + 23);
	var runsupportString3 = u.substring(runsupport + 239, runsupport + 239 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = runsupportString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsupportString = runsupportString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsupportString = runsupportString.replace(myTempString,myTempString2);

	}

	myTempString = runsupportString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsupportString2 = runsupportString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsupportString2 = runsupportString2.replace(myTempString,myTempString2);

	}	

	myTempString = runsupportString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		runsupportString3 = runsupportString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		runsupportString3 = runsupportString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(runsupportString.search(regex) != -1){

					

			if(runsupportString.indexOf('team_other.html') == -1){
				//runsupportString = runsupportString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsupportString = runsupportString.replace(regex,teamLinkArray[i]);
				runsupportString = trim(runsupportString);
			}

		}
		if(runsupportString2.search(regex) != -1){

			if(runsupportString2.indexOf('team_other.html') == -1){
				//runsupportString2 = runsupportString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsupportString2 = runsupportString2.replace(regex,teamLinkArray[i]);
				runsupportString2 = trim(runsupportString2);
				
			}

		}
		if(runsupportString3.search(regex) != -1){

			if(runsupportString3.indexOf('team_other.html') == -1){
				//runsupportString3 = runsupportString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				runsupportString3 = runsupportString3.replace(regex,teamLinkArray[i]);
				runsupportString3 = trim(runsupportString3);
			}

		}

		

	}

		runsupportArray.push(runsupportString);
		runsupportArray.push(runsupportString2);
		runsupportArray.push(runsupportString3);

		

var runsupportString = runsupportArray.toString();
var runsupportTempArray = new Array();

///------inheritedscore------///
	var inheritedscore = u.indexOf('---INHERITED SCORE %---');
	var inheritedscoreString = u.substring(inheritedscore + 53, inheritedscore + 53 + 23);
	var inheritedscoreString2 = u.substring(inheritedscore + 107, inheritedscore + 107 + 23);
	var inheritedscoreString3 = u.substring(inheritedscore + 161, inheritedscore + 161 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = inheritedscoreString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		inheritedscoreString = inheritedscoreString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		inheritedscoreString = inheritedscoreString.replace(myTempString,myTempString2);

	}

	myTempString = inheritedscoreString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		inheritedscoreString2 = inheritedscoreString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		inheritedscoreString2 = inheritedscoreString2.replace(myTempString,myTempString2);

	}	

	myTempString = inheritedscoreString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		inheritedscoreString3 = inheritedscoreString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		inheritedscoreString3 = inheritedscoreString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(inheritedscoreString.search(regex) != -1){

					

			if(inheritedscoreString.indexOf('team_other.html') == -1){
				//inheritedscoreString = inheritedscoreString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				inheritedscoreString = inheritedscoreString.replace(regex,teamLinkArray[i]);
				inheritedscoreString = trim(inheritedscoreString);
			}

		}
		if(inheritedscoreString2.search(regex) != -1){

			if(inheritedscoreString2.indexOf('team_other.html') == -1){
				//inheritedscoreString2 = inheritedscoreString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				inheritedscoreString2 = inheritedscoreString2.replace(regex,teamLinkArray[i]);
				inheritedscoreString2 = trim(inheritedscoreString2);
				
			}

		}
		if(inheritedscoreString3.search(regex) != -1){

			if(inheritedscoreString3.indexOf('team_other.html') == -1){
				//inheritedscoreString3 = inheritedscoreString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				inheritedscoreString3 = inheritedscoreString3.replace(regex,teamLinkArray[i]);
				inheritedscoreString3 = trim(inheritedscoreString3);
			}

		}

		

	}

		inheritedscoreArray.push(inheritedscoreString);
		inheritedscoreArray.push(inheritedscoreString2);
		inheritedscoreArray.push(inheritedscoreString3);

		

var inheritedscoreString = inheritedscoreArray.toString();
var inheritedscoreTempArray = new Array();

///------strikeoutswalks------///
	var strikeoutswalks = u.indexOf('----STRIKEOUTS/WALKS---');
	var strikeoutswalksString = u.substring(strikeoutswalks + 53, strikeoutswalks + 53 + 23);
	var strikeoutswalksString2 = u.substring(strikeoutswalks + 107, strikeoutswalks + 107 + 23);
	var strikeoutswalksString3 = u.substring(strikeoutswalks + 161, strikeoutswalks + 161 + 23);

	var myTempString;
	var myTempString2;	

	myTempString = strikeoutswalksString.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		strikeoutswalksString = strikeoutswalksString.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		strikeoutswalksString = strikeoutswalksString.replace(myTempString,myTempString2);

	}

	myTempString = strikeoutswalksString2.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		strikeoutswalksString2 = strikeoutswalksString2.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		strikeoutswalksString2 = strikeoutswalksString2.replace(myTempString,myTempString2);

	}	

	myTempString = strikeoutswalksString3.slice(14,17);
	myTempString2 = trim(myTempString);

	if(myTempString2.length == 1){

		myTempString2 = myTempString2 + '__';
		strikeoutswalksString3 = strikeoutswalksString3.replace(myTempString,myTempString2);

	}
	else if(myTempString2.length == 2){
		
		myTempString2 = myTempString2 + '_';
		strikeoutswalksString3 = strikeoutswalksString3.replace(myTempString,myTempString2);

	}

	for (var i = 0; i <teamLinkArray.length ; i++) {

		var regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4));
		var noRegex = teamLinkArray[i].substring(teamLinkArray[i].length-7,teamLinkArray[i].length-4);

		if(noRegex.indexOf('</') != -1){
			
			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-2)+ '__';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));
			
		}

		if(noRegex.indexOf('<') != -1 && noRegex.indexOf('</') == -1){

			teamLinkArray[i] = teamLinkArray[i].substring(0,teamLinkArray[i].length-1)+ '_';
			regex = new RegExp(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length));	
		}

		if(strikeoutswalksString.search(regex) != -1){

					

			if(strikeoutswalksString.indexOf('team_other.html') == -1){
				//strikeoutswalksString = strikeoutswalksString.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				strikeoutswalksString = strikeoutswalksString.replace(regex,teamLinkArray[i]);
				strikeoutswalksString = trim(strikeoutswalksString);
			}

		}
		if(strikeoutswalksString2.search(regex) != -1){

			if(strikeoutswalksString2.indexOf('team_other.html') == -1){
				//strikeoutswalksString2 = strikeoutswalksString2.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				strikeoutswalksString2 = strikeoutswalksString2.replace(regex,teamLinkArray[i]);
				strikeoutswalksString2 = trim(strikeoutswalksString2);
				
			}

		}
		if(strikeoutswalksString3.search(regex) != -1){

			if(strikeoutswalksString3.indexOf('team_other.html') == -1){
				//strikeoutswalksString3 = strikeoutswalksString3.replace(teamLinkArray[i].substring(teamLinkArray[i].length-3,teamLinkArray[i].length),teamLinkArray[i]+'</a>');
				strikeoutswalksString3 = strikeoutswalksString3.replace(regex,teamLinkArray[i]);
				strikeoutswalksString3 = trim(strikeoutswalksString3);
			}

		}

		

	}

		strikeoutswalksArray.push(strikeoutswalksString);
		strikeoutswalksArray.push(strikeoutswalksString2);
		strikeoutswalksArray.push(strikeoutswalksString3);

		

var strikeoutswalksString = strikeoutswalksArray.toString();
var strikeoutswalksTempArray = new Array();


///////////////////////////////////////////////////////////////////////////////////////

var titleBatting;
var titlePitching;

var rndBatting=Math.floor(Math.random()*27);
var rndPitching=Math.floor(Math.random()*32);

//temp
//rndBatting = 21;
//rndPitching = 30;

switch(rndBatting)
{
case 0:
  recordsArrayBatting = avgArray;
  titleBatting = 'Batting Average';
  break;

case 1:
  recordsArrayBatting = runsscoredArray;
  titleBatting = 'Runs Scored';
  break;
case 2:
  recordsArrayBatting = hitsArray;
  titleBatting = 'Hits';
  break;
case 3:
  recordsArrayBatting = doublesArray;
  titleBatting = 'Doubles';
  break;
case 4:
  recordsArrayBatting = triplesArray;
  titleBatting = 'Triples';
  break;
case 5:
  recordsArrayBatting = homerunsArray;
  titleBatting = 'Home Runs';
  break;
case 6:
  recordsArrayBatting = runsbattedinArray;
  titleBatting = 'Runs Batted In';
  break;
case 7:
  recordsArrayBatting = walksArray;
  titleBatting = 'Walks';
  break;
case 8:
  recordsArrayBatting = intentionalwalksArray;
  titleBatting = 'Intentional Walks';
  break;
case 9:
  recordsArrayBatting = strikeoutsArray;
  titleBatting = 'Strikeouts';
  break;
case 10:
  recordsArrayBatting = sacrificehitsArray;
  titleBatting = 'Sacrifice Hits';
  break;
case 11:
  recordsArrayBatting = stolenbasesArray;
  titleBatting = 'Stolen Bases';
  break;
case 12:
  recordsArrayBatting = stolenbasepctArray;
  titleBatting = 'Stolen Base Pct.';
  break;
case 13:
  recordsArrayBatting = gidpArray;
  titleBatting = 'GIDP';
  break;
case 14:
  recordsArrayBatting = hittingstreakArray;
  titleBatting = 'Hitting Streak';
  break;
case 15:
  recordsArrayBatting = sluggingpctArray;
  titleBatting = 'Slugging Pct.';
  break;
case 16:
  recordsArrayBatting = onbasepctArray;
  titleBatting = 'On Base Pct.';
  break;
case 17:
  recordsArrayBatting = runscreated27outArray;
  titleBatting = 'Runs Created/27 Out';
  break;
case 18:
  recordsArrayBatting = totalaverageArray;
  titleBatting = 'Total Average';
  break;
case 19:
  recordsArrayBatting = totalbasesArray;
  titleBatting = 'Total Bases';
  break;
case 20:
  recordsArrayBatting = batavgvsleftArray;
  titleBatting = 'Bat AVG VS. Left';
  break;
case 21:
  recordsArrayBatting = hrvsleftArray;
  titleBatting = 'HR VS. Left';
  break;
case 22:
  recordsArrayBatting = batavgvsrightArray;
  titleBatting = 'Bat AVG VS. Right';
  break;
case 23:
  recordsArrayBatting = hrvsrightArray;
  titleBatting = 'HR VS. Right';
  break;
case 24:
  recordsArrayBatting = errorsArray;
  titleBatting = 'Errors';
  break;
case 25:
  recordsArrayBatting = opponentstealsArray;
  titleBatting = 'Opponent Steals';
  break;
case 26:
  recordsArrayBatting = opponentsbpctArray;
  titleBatting = 'Opponent SB Pct.';
  break;  

}


switch(rndPitching)
{
case 0:
  recordsArrayPitching = winsArray;
  titlePitching = 'Wins';
  break;

case 1:
  recordsArrayPitching = lossesArray;
  titlePitching = 'Losses';
  break;

case 2:
  recordsArrayPitching = winningpctArray;
  titlePitching = 'Winning Pct.';
  break;

case 3:
  recordsArrayPitching = eraArray;
  titlePitching = 'ERA';
  break;
  
case 4:
  recordsArrayPitching = inningspitchedArray;
  titlePitching = 'Innings Pitched';
  break;
 
case 5:
  recordsArrayPitching = tbfArray;
  titlePitching = 'TBF';
  break;
 
case 6:
  recordsArrayPitching = gamespitchedArray;
  titlePitching = 'Games Pitched';
  break;
 
case 7:
  recordsArrayPitching = completegamesArray;
  titlePitching = 'Complete Games';
  break;
 
case 8:
  recordsArrayPitching = gamesfinishedArray;
  titlePitching = 'Games Finished';
  break;
 
case 9:
  recordsArrayPitching = savesArray;
  titlePitching = 'Saves';
  break;
 
case 10:
  recordsArrayPitching = savepctArray;
  titlePitching = 'Save Pct.';
  break;
 
case 11:
  recordsArrayPitching = shutoutsArray;
  titlePitching = 'Shutouts';
  break;
 
case 12:
  recordsArrayPitching = hitsallowedArray;
  titlePitching = 'Hits Allowed';
  break;
 
case 13:
  recordsArrayPitching = runsArray;
  titlePitching = 'Runs';
  break;
 
case 14:
  recordsArrayPitching = earnedrunsArray;
  titlePitching = 'Earned Runs';
  break;
 
case 15:
  recordsArrayPitching = homerunsallowedArray;
  titlePitching = 'Home Runs Allowed';
  break;
 
case 16:
  recordsArrayPitching = pitcherwalksArray;
  titlePitching = 'Walks';
  break;
 
case 17:
  recordsArrayPitching = pitcherstrikeoutsArray;
  titlePitching = 'Strikeouts';
  break;
 
case 18:
  recordsArrayPitching = wildpitchesArray;
  titlePitching = 'Wild Pitches';
  break;
 
case 19:
  recordsArrayPitching = balksArray;
  titlePitching = 'Balks';
  break;
 
case 20:
  recordsArrayPitching = pitcheropponentstealsArray;
  titlePitching = 'Opponent Steals';
  break;
 
case 21:
  recordsArrayPitching = pitcheropponentsbpctArray;
  titlePitching = 'Opponent SB Pct.';
  break;
 
case 22:
  recordsArrayPitching = hits9inningsArray;
  titlePitching = 'Hits / 9 Innings';
  break;
 
case 23:
  recordsArrayPitching = bb9inningsArray;
  titlePitching = 'BB / 9 Innings';
  break;
 
case 24:
  recordsArrayPitching = ks9inningsArray;
  titlePitching = 'Ks / 9 Innings';
  break;
 
case 25:
  recordsArrayPitching = hrs9inningsArray;
  titlePitching = 'HRs / 9 Innings';
  break;
 
case 26:
  recordsArrayPitching = opponentbatavgArray;
  titlePitching = 'Opponent Bat AVG';
  break;
 
case 27:
  recordsArrayPitching = leftoppbatavgArray;
  titlePitching = 'Left Opp Bat AVG';
  break;
 
case 28:
  recordsArrayPitching = rightoppbatavgArray;
  titlePitching = 'Right Opp Bat AVG';
  break;
 
case 29:
  recordsArrayPitching = runsupportArray;
  titlePitching = 'Run Support';
  break;
 
case 30:
  recordsArrayPitching = inheritedscoreArray;
  titlePitching = 'Inherited Score %';
  break;
 
case 31:
  recordsArrayPitching = strikeoutswalksArray;
  titlePitching = 'Strikeouts/Walks';
  break;
   
}



	var myNamesArray = new Array();
	var myTeamsArray = new Array();
	var myStatsArray = new Array();

	var myNamesPitchingArray = new Array();
	var myTeamsPitchingArray = new Array();
	var myStatsPitchingArray = new Array();	


	for (var i = 0; i < recordsArrayBatting.length; i++) {

		if(recordsArrayBatting[i].indexOf('***') != -1){
			
			myNamesArray[i] = recordsArrayBatting[i].substring(0,14);
			myTeamsArray[i] = recordsArrayBatting[i].substring(14,17);
			myStatsArray[i] = recordsArrayBatting[i].substring(18);

		}
		else
		{
			myNamesArray[i] = recordsArrayBatting[i].substring(0,14);
			myTeamsArray[i] = recordsArrayBatting[i].substring(14,recordsArrayBatting[i].indexOf('</a>')+4);
			myStatsArray[i] = recordsArrayBatting[i].substring(recordsArrayBatting[i].indexOf('</a>')+4);
				       
		}

	}

	for (var i = 0; i < recordsArrayPitching.length; i++) {

		if(recordsArrayPitching[i].indexOf('***') != -1){
			
			myNamesPitchingArray[i] = recordsArrayPitching[i].substring(0,14);
			myTeamsPitchingArray[i] = recordsArrayPitching[i].substring(14,17);
			myStatsPitchingArray[i] = recordsArrayPitching[i].substring(18);

		}
		else
		{
			myNamesPitchingArray[i] = recordsArrayPitching[i].substring(0,14);
			myTeamsPitchingArray[i] = recordsArrayPitching[i].substring(14,recordsArrayPitching[i].indexOf('</a>')+4);
			myStatsPitchingArray[i] = recordsArrayPitching[i].substring(recordsArrayPitching[i].indexOf('</a>')+4);
				       
		}

	}

//////////////////////////////////


//var newTeamLink = document.evaluate("//table[@width='740'][3]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var newTeamLink = document.evaluate("//table[@class='datatab_nowidth']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

newTeamLink = newTeamLink.snapshotItem(0);

var myTable2 = document.createElement("table");
myTable2.setAttribute('class', 'odd'); 
myTable2.setAttribute('width', '740'); 
myTable2.setAttribute('cellspacing', '1'); 
myTable2.setAttribute('cellpadding', '1'); 
myTable2.setAttribute('border', '0'); 
myTable2.setAttribute('align', 'center'); 

myTable2.innerHTML = '<tr class="odd"><td class="odd text12" colspan="2">&nbsp;</td></tr><tr class="odd"><td class="odd text12" colspan="2"><b>Stat Leaders: '+teamNameArray2[randomnumber]+' League</b></td></tr>';

var myTable = document.createElement("table");
myTable.setAttribute('class', 'odd'); 
myTable.setAttribute('width', '740'); 
myTable.setAttribute('cellspacing', '1'); 
myTable.setAttribute('cellpadding', '1'); 
myTable.setAttribute('border', '0'); 
myTable.setAttribute('align', 'center'); 

var myTableInnerHTML;

if(myNamesArray[0]==''){

	myTableInnerHTML = '';

}
else
{
myTableInnerHTML = '<tbody>'+'\r\n'+
	'<tr>'+ '\r\n'+
   	'<td>'+'\r\n'+
    	'<table id="90s records1" width="370" class="datatab_nowidth" border="0" cellspacing="1" cellpadding="1">'+'\r\n'+
	'<tbody>'+'\r\n'+
     	'<tr>'+'\r\n'+
      	'<td>'+'\r\n'+
	'<strong>'+titleBatting+'</strong>' +'\r\n'+ 
	'</td>'+'\r\n'+
      	'<td>'+'\r\n'+ 
	'</td>'+'\r\n'+	
      	'<td>'+'\r\n'+
	'</td>'+'\r\n'+	
     	'</tr>'+'\r\n';
	
	for (var i = 0; i < 3; i++) {

		var m2 = i/2;

		if(myNamesArray[i] == '              '){

			myNamesArray[i] = '&nbsp;';

		}

		if(myNamesArray[i].indexOf('TIED') != -1){
			
			myNamesArray[i] = 'TIED';
			myTeamsArray[i] = '&nbsp;';
			myStatsArray[i] = '&nbsp;';
		}

		if (m2 == m2.toFixed()){

			myTableInnerHTML+= '<tr class="odd">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';
		}
		else
		{
			myTableInnerHTML+= '<tr class="even">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';

		}

	}
	myTableInnerHTML+= '</tbody>'+'\r\n'+	
    	'</table>'+'\r\n'+
   	'</td>'+'\r\n'+
   	'<td>'+'\r\n'+
    	'<table id="90s records2" width="370" class="datatab_nowidth" border="0" cellspacing="1" cellpadding="1">'+'\r\n'+
	'<tbody>'+'\r\n'+	
     	'<tr>'+'\r\n'+
      	'<td>'+'\r\n'+
       	'<strong>'+titlePitching+'</strong>' +'\r\n'+ 
      	'</td>'+'\r\n'+
      	'<td>'+'\r\n'+ 
	'</td>'+'\r\n'+	
      	'<td>'+'\r\n'+
	'</td>'+'\r\n'+	
	'</tr>'+'\r\n';

	for (var i = 0; i < 3; i++) {

		var m2 = i/2;

		if(myNamesPitchingArray[i] == '              '){

			myNamesPitchingArray[i] = '&nbsp;';

		}		

		if(myNamesPitchingArray[i].indexOf('TIED') != -1){
			
			myNamesPitchingArray[i] = 'TIED';
			myTeamsPitchingArray[i] = '&nbsp;';
			myStatsPitchingArray[i] = '&nbsp;';
		}		

		if (m2 != m2.toFixed()){

			myTableInnerHTML+= '<tr class="even">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesPitchingArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';
		}
		else
		{
			myTableInnerHTML+= '<tr class="odd">'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myNamesPitchingArray[i] +'\r\n'+ 
			'</td>'+'\r\n'+
	      		'<td>'+'\r\n'+ 
			myTeamsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	      		'<td>'+'\r\n'+
			myStatsPitchingArray[i] + '\r\n'+
			'</td>'+'\r\n'+	
	     		'</tr>'+'\r\n';

		}
	}

	myTableInnerHTML+= '</tbody>';



//myDiv.innerHTML='test';
var mySubString;
var myReg;

for (var i=0;i < teamNameArray.length;i++){

	if(myTableInnerHTML.indexOf(teamNameArray[i])!= -1){


		mySubString = myTableInnerHTML.substring(myTableInnerHTML.indexOf(teamNameArray[i]),myTableInnerHTML.indexOf('\r\n',myTableInnerHTML.indexOf(teamNameArray[i])+1));

		myReg = new RegExp(mySubString,'g');

		mySubString = mySubString.replace('>','><b>');
		mySubString = mySubString.replace('</a>','</b></a>');

		myTableInnerHTML = myTableInnerHTML.replace(myReg,mySubString);

	}


}

myTable.innerHTML = myTableInnerHTML;


newTeamLink.parentNode.insertBefore(myTable,newTeamLink.nextSibling);
newTeamLink.parentNode.insertBefore(myTable2,newTeamLink.nextSibling);

}//if(myNamesArray[0]==''){

        return document;
}

}//function callFirstGM_xmlhttpRequest(){

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}





