// ==UserScript==
// @name           Analyze Upcoming Opponent
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/home_good.html
// @include        http://fantasygames.sportingnews.com/stratomatic/team/team_other.html?*&stats=*&onroster=*
// @include        http://fantasygames.sportingnews.com/stratomatic/team/team.html?stats=splits&onroster=*
// ==/UserScript==


//What to add?
// BP info of owner's pitchers
// BP info of home ballpark
// number of right handed batters opponent might use (table)
// number of left handed batters opponent might use (table)
// opponent OPS against r and l pitchers.
// opponents avg balance on hitter side?  (table)


//test data
/*
5|11|9|12
1L|1L|3R|6R|3L|2R
2|7
.818|.736
0/3|3/1|0/4|7/1|3/0|2/1
Foras
0
1R
*/



var playerLink, teamName, teamName2, playerLink2, playerLinkNoHref, teamLink;
var playerLinksArray = new Array();
var responseTextArray = new Array();
var responseTextArray2 = new Array();
var opsArrayL = new Array();
var opsArrayR = new Array();
var opsArray = new Array();
var opsArray2 = new Array();
var teamLinkURL;
var k = -1;
var ops, righties;
var count = 0;
var rightbatterCount = 0,leftbatterCount = 0;
var rightbatterCount2,leftbatterCount2;


var rightBalance;
var leftBalance;
var switchBalance;
var balanceMeter = 0;
var balanceMeterTest = 0;
var balanceMeterAVG;
var balanceMeterAVGTest;
var unbalancedCount = 0;

var testArray = new Array();

var ballParkLink;
var ballParkLink2;
var ballParkLinkURL;
var ballParkSource;
var bp = new Array();
var bp2 = new Array();

var blue,pink, blue2, pink2;
var blueTotal = 0;
var pinkTotal = 0;
var bluePinkArray = new Array();
var bluePinkArray2 = new Array();

var salaryRight;
var salaryLeft;
var salarySwitch;

var noLongerRosterCheck;

var teamLocation;
var newColor;

var opponentsTeamName;

var analyzeNextOpponentFlag = false;

var thisURL = document.URL;

var helpToggle = false;

//Get team name
var theTeams = document.evaluate("//div[@class='text11']/text()[2]|//div[@class='text11']/text()[4]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theTeamsTest = document.evaluate("//div[@class='text11']",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


	var theTeamsTest2 = theTeamsTest.snapshotItem(0);
	theTeamsTest2 = theTeamsTest2.textContent;

	var theTeamsTest2Name = theTeamsTest2.substring(theTeamsTest2.indexOf('Team:')+6,theTeamsTest2.indexOf('Type:'));
	theTeamsTest2Name = trim(theTeamsTest2Name);
	
	var theTeamsTest2Set = theTeamsTest2.substring(theTeamsTest2.indexOf('Player Set:')+12);	
	theTeamsTest2Set = trim(theTeamsTest2Set);


	var theTeam2 = theTeamsTest2Name + "-" + theTeamsTest2Set;


if(theTeam2.indexOf(',')!=-1){

	theTeam2=theTeam2.replace(/,/g,'');

}


//Get owner's team name
if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

var ownersTeamNames = document.evaluate("//td[@class='yellow tleft']/b/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

ownersTeamName = ownersTeamNames.snapshotItem(0);
ownersTeamName = ownersTeamName.nodeValue;

var playerLinks = document.evaluate("//td[@class='odd']/a[contains(@href,'player.html?player_id=')]/@href",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var teamNames = document.evaluate("//td[@class='odd']/a[contains(@href,'team_other.html?user_id=')]/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i < playerLinks.snapshotLength;i++)
{

	teamName = teamNames.snapshotItem(i);
	teamName = teamName.nodeValue;

		if (teamName != ownersTeamName){
			
			opponentsTeamName = teamName;

		}	

}



////

var a = GM_getValue("analyzeOpponentTeamName",'');


if(a.indexOf(theTeam2) != -1){

	theTeam = a.substring(a.indexOf(',')+1);

}

var b = GM_getValue("analyzeOpponentTeamNameb",'');


if(b.indexOf(theTeam2) != -1){

	theTeam = b.substring(b.indexOf(',')+1);

}

var c = GM_getValue("analyzeOpponentTeamNamec",'');


if(c.indexOf(theTeam2) != -1){

	theTeam = c.substring(c.indexOf(',')+1);

}

var d = GM_getValue("analyzeOpponentTeamNamed",'');


if(d.indexOf(theTeam2) != -1){

	theTeam = d.substring(d.indexOf(',')+1);

}

var e = GM_getValue("analyzeOpponentTeamNamee",'');


if(e.indexOf(theTeam2) != -1){

	theTeam = e.substring(e.indexOf(',')+1);

}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){


	theTeam = opponentsTeamName;
	

}



if(theTeam != opponentsTeamName || a==''){

	if(a.indexOf(theTeam2) != -1){

		GM_setValue("analyzeOpponentTeamName", theTeam2 + "," +opponentsTeamName);
		refreshOnce();

	}	
	if(b.indexOf(theTeam2) != -1){

		GM_setValue("analyzeOpponentTeamNameb", theTeam2 + "," +opponentsTeamName);
		refreshOnce();

	}
	if(c.indexOf(theTeam2) != -1){

		GM_setValue("analyzeOpponentTeamNamec", theTeam2 + "," +opponentsTeamName);
		refreshOnce();

	}
	if(d.indexOf(theTeam2) != -1){

		GM_setValue("analyzeOpponentTeamNamed", theTeam2 + "," +opponentsTeamName);
		refreshOnce();

	}
	if(e.indexOf(theTeam2) != -1){

		GM_setValue("analyzeOpponentTeamNamee", theTeam2 + "," +opponentsTeamName);
		refreshOnce();

	}
	
}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	if(a == ''){

		GM_setValue('analyzeOpponentTeamName', theTeam2 + "," + opponentsTeamName);
		refreshOnce();
	}
	else if(b == ''){
		GM_setValue('analyzeOpponentTeamNameb', theTeam2 + "," + opponentsTeamName);
		refreshOnce();
	}
	else if(c == ''){
		GM_setValue('analyzeOpponentTeamNamec', theTeam2 + "," + opponentsTeamName);
		refreshOnce();
	}
	else if(d == ''){
		GM_setValue('analyzeOpponentTeamNamed', theTeam2 + "," + opponentsTeamName);
		refreshOnce();
	}
	else if(e == ''){
		GM_setValue('analyzeOpponentTeamNamee', theTeam2 + "," + opponentsTeamName);
		refreshOnce();
	}

	if(a != '' && b != '' && c != '' && d != '' && e != ''){		

		refreshOnce();

	}

}

}//if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){


function refreshOnce(){


	analyzeNextOpponentFlag = true;

	var managerialStrategys, managerialStrategysLink;


	var managerialStrategy = document.evaluate("//a[contains(string(),'Set your Managerial Strategy')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if (managerialStrategy.snapshotLength != 0){

		managerialStrategys =  managerialStrategy.snapshotItem(0);

		managerialStrategysLink = document.createElement("text");		

		var a = GM_getValue("analyzeOpponentTeamName",'');
		var b = GM_getValue("analyzeOpponentTeamNameb",'');
		var c = GM_getValue("analyzeOpponentTeamNamec",'');
		var d = GM_getValue("analyzeOpponentTeamNamed",'');
		var e = GM_getValue("analyzeOpponentTeamNamee",'');	
	

		if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){
			if(a != '' && b != '' && c != '' && d != '' && e != ''){
//Glenallen Hills-Back to the '90s,Baseballs
			

				managerialStrategysLink.innerHTML = '<br><br>All team slots for GM script "Analyze Next Opponent" have been filled up.  Choose team from drop down below to overwrite.<br><br>'+
'Slots: <select class="text11" name="Analyze">'+
'<option id="Analyze" value="slot1">------</option>'+
'<option id="Analyze" value="'+a.substring(0,a.indexOf(','))+'">'+a.substring(0,a.indexOf(','))+'</option>'+
'<option id="Analyze" value="'+b.substring(0,b.indexOf(','))+'">'+b.substring(0,b.indexOf(','))+'</option>'+
'<option id="Analyze" value="'+c.substring(0,c.indexOf(','))+'">'+c.substring(0,c.indexOf(','))+'</option>'+
'<option id="Analyze" value="'+d.substring(0,d.indexOf(','))+'">'+d.substring(0,d.indexOf(','))+'</option>'+
'<option id="Analyze" value="'+e.substring(0,e.indexOf(','))+'">'+e.substring(0,e.indexOf(','))+'</option>'+
'</select><br>';				


			}

		}
		else
		{
			managerialStrategysLink.innerHTML =  '<br>-  <a href=' + 'http://fantasygames.sportingnews.com/stratomatic/home_good.html' + '><font color="red">Analyze Next Opponent</font></a>';
		}		





	


		managerialStrategys.parentNode.insertBefore(managerialStrategysLink,managerialStrategys.nextSibling);

		//location.href = "http://fantasygames.sportingnews.com/stratomatic/home_good.html";


		
	}

}//function refreshOnce(){

if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

//Set probable starter tables to 100% so cells don't wrap.
var colSpans = document.getElementsByTagName('table');

for (var i = 0; i < colSpans.length; i++) {
  var colSpan = colSpans[i];
	if (colSpan.getAttribute('width')) {

      	var match95 =     colSpan.getAttribute('width').match('95%');
      		if (match95)
         		colSpan.setAttribute('width', '100%');
			//colSpan.setAttribute('width', '300');  This might look better?
    	}	
}

}



Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}


///

if(thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

var j = 0;


for (var i=0;i < playerLinks.snapshotLength;i++)
{

	    	playerLink = playerLinks.snapshotItem(i);
		playerLink = playerLink.nodeValue;

		playerLinkURL = playerLink.substring(25,playerLink.indexOf('&')) + "&year=1690";
		playerLinkURL = "http://fantasygames.sportingnews.com" + playerLinkURL;

		playerLinksArray[i] = playerLinkURL;

		teamName = teamNames.snapshotItem(i);
		teamName = teamName.nodeValue;

	
  j = 1+i;


if (playerLinksArray[i] != undefined){

  GM_xmlhttpRequest({
      method: 'GET',
      url: playerLinksArray[i],
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function.bind( {}, i, j )
  });

}
}

}//if(thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

function callback_function(parameter1, parameter2, responseDetails)
{

	balance = responseDetails.responseText;



	if(balance.indexOf('Balance:') != -1){
		responseTextArray[parameter1] = balance.substr(balance.indexOf('Balance:')+ 13, 2);



	blue = balance.substring(balance.indexOf('<td class="text9" bgcolor="#DDEEFF">') + 36,balance.indexOf('<td class="text9" bgcolor="#FFEEEE">') + 36)


	var pattern = />#/g;		
	var result
	
	while((result = pattern.exec(blue)) != null){

	
		blue2 = blue.substring(result.index + 2, result.index + 4);


		switch(blue2)
		{
		case "2-":
			blueTotal = blueTotal + 1;
		break;

		case "3-":
			blueTotal = blueTotal + 2;
		break;

		case "4-":
			blueTotal = blueTotal + 3;
		break;

		case "5-":
			blueTotal = blueTotal + 4;
		break;

		case "6-":
			blueTotal = blueTotal + 5;
		break;

		case "7-":
			blueTotal = blueTotal + 6;
		break;

		case "8-":
			blueTotal = blueTotal + 5;
		break;

		case "9-":
			blueTotal = blueTotal + 4;
		break;

		case "10":
			blueTotal = blueTotal + 3;
		break;	

		case "11":
			blueTotal = blueTotal + 2;
		break;	

		case "12":
			blueTotal = blueTotal + 1;
		break;	

		}	
	
	}

	

///
	pink = balance.substring(balance.indexOf('<td class="text9" bgcolor="#FFEEEE">') + 36,balance.indexOf('<td class="text10" valign="top" colspan="6" align="right">') + 58)

	

	var pattern = />#/g;		
	var result
	
	while((result = pattern.exec(pink)) != null){

	
		pink2 = pink.substring(result.index + 2, result.index + 4);


		switch(pink2)
		{
		case "2-":
			pinkTotal = pinkTotal + 1;
		break;

		case "3-":
			pinkTotal = pinkTotal + 2;
		break;

		case "4-":
			pinkTotal = pinkTotal + 3;
		break;

		case "5-":
			pinkTotal = pinkTotal + 4;
		break;

		case "6-":
			pinkTotal = pinkTotal + 5;
		break;

		case "7-":
			pinkTotal = pinkTotal + 6;
		break;

		case "8-":
			pinkTotal = pinkTotal + 5;
		break;

		case "9-":
			pinkTotal = pinkTotal + 4;
		break;

		case "10":
			pinkTotal = pinkTotal + 3;
		break;

		case "11":
			pinkTotal = pinkTotal + 2;
		break;	

		case "12":
			pinkTotal = pinkTotal + 1;
		break;		

		}
			
	
	}		
	

	

	bluePinkArray[parameter1] = blueTotal + "/" + pinkTotal;
	pinkTotal = 0;
	blueTotal = 0;

	
var a = GM_getValue("analyzeOpponentBalance",'');

if(a.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentBalance', theTeam2 + "|" + responseTextArray.join("|"));

}

var b = GM_getValue("analyzeOpponentBalanceb",'');

if(b.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentBalanceb', theTeam2 + "|" + responseTextArray.join("|"));

}

var c = GM_getValue("analyzeOpponentBalancec",'');

if(c.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentBalancec', theTeam2 + "|" + responseTextArray.join("|"));

}

var d = GM_getValue("analyzeOpponentBalanced",'');

if(d.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentBalanced', theTeam2 + "|" + responseTextArray.join("|"));

}

var e = GM_getValue("analyzeOpponentBalancee",'');

if(e.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentBalancee', theTeam2 + "|" + responseTextArray.join("|"));

}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	

		if(a == ''){

			GM_setValue('analyzeOpponentBalance', theTeam2 + "|" + responseTextArray.join("|"));
		}
		else if(b == ''){
			GM_setValue('analyzeOpponentBalanceb', theTeam2 + "|" + responseTextArray.join("|"));
		}
		else if(c == ''){
			GM_setValue('analyzeOpponentBalancec', theTeam2 + "|" + responseTextArray.join("|"));
		}
		else if(d == ''){
			GM_setValue('analyzeOpponentBalanced', theTeam2 + "|" + responseTextArray.join("|"));
		}
		else if(e == ''){
			GM_setValue('analyzeOpponentBalancee', theTeam2 + "|" + responseTextArray.join("|"));
		}	


}

////////////////////////////////////////////////////////////////////////////////

var a = GM_getValue("analyzeOpponentPitcherBP",'');

if(a.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentPitcherBP', theTeam2 + "|" + bluePinkArray.join("|"));

}

var b = GM_getValue("analyzeOpponentPitcherBPb",'');

if(b.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentPitcherBPb', theTeam2 + "|" + bluePinkArray.join("|"));

}

var c = GM_getValue("analyzeOpponentPitcherBPc",'');

if(c.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentPitcherBPc', theTeam2 + "|" + bluePinkArray.join("|"));

}

var d = GM_getValue("analyzeOpponentPitcherBPd",'');

if(d.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentPitcherBPd', theTeam2 + "|" + bluePinkArray.join("|"));

}

var e = GM_getValue("analyzeOpponentPitcherBPe",'');

if(e.indexOf(theTeam2) != -1){

	GM_setValue('analyzeOpponentPitcherBPe', theTeam2 + "|" + bluePinkArray.join("|"));

}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	

		if(a == ''){

			GM_setValue('analyzeOpponentPitcherBP', theTeam2 + "|" + bluePinkArray.join("|"));
		}
		else if(b == ''){
			GM_setValue('analyzeOpponentPitcherBPb', theTeam2 + "|" + bluePinkArray.join("|"));
		}
		else if(c == ''){
			GM_setValue('analyzeOpponentPitcherBPc', theTeam2 + "|" + bluePinkArray.join("|"));
		}
		else if(d == ''){
			GM_setValue('analyzeOpponentPitcherBPd', theTeam2 + "|" + bluePinkArray.join("|"));
		}
		else if(e == ''){
			GM_setValue('analyzeOpponentPitcherBPe', theTeam2 + "|" + bluePinkArray.join("|"));
		}	


}


}//if(balance.indexOf('Balance:') != -1){ 

}


	var a = GM_getValue("analyzeOpponentBalance",'');

	if(a.indexOf(theTeam2) != -1){


		if (a != ''){
			responseTextArray2 = a.split("|");
		}
		else
		{
			responseTextArray2.length = 0;
		}

	}

	var b = GM_getValue("analyzeOpponentBalanceb",'');

	if(b.indexOf(theTeam2) != -1){


		if (b != ''){
			responseTextArray2 = b.split("|");
		}
		else
		{
			responseTextArray2.length = 0;
		}

	}

	var c = GM_getValue("analyzeOpponentBalancec",'');

	if(c.indexOf(theTeam2) != -1){


		if (c != ''){
			responseTextArray2 = c.split("|");
		}
		else
		{
			responseTextArray2.length = 0;
		}

	}

	var d = GM_getValue("analyzeOpponentBalanced",'');

	if(d.indexOf(theTeam2) != -1){


		if (d != ''){
			responseTextArray2 = d.split("|");
		}
		else
		{
			responseTextArray2.length = 0;
		}

	}

	var e = GM_getValue("analyzeOpponentBalance",'');

	if(e.indexOf(theTeam2) != -1){


		if (e != ''){
			responseTextArray2 = e.split("|");
		}
		else
		{
			responseTextArray2.length = 0;
		}

	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	if(a == ''){

		responseTextArray2.length = 0;
	}
	else if(b == ''){
		responseTextArray2.length = 0;
	}
	else if(c == ''){
		responseTextArray2.length = 0;
	}
	else if(d == ''){
		responseTextArray2.length = 0;
	}
	else if(e == ''){
		responseTextArray2.length = 0;
	}	


}


	//var d = GM_getValue("analyzeOpponentBalance");




	var a = GM_getValue("analyzeOpponentPitcherBP",'');

	if(a.indexOf(theTeam2) != -1){

		if (a != '') bluePinkArray2 = a.split("|");	

	}	

	var b = GM_getValue("analyzeOpponentPitcherBPb",'');

	if(b.indexOf(theTeam2) != -1){

		if (b != '') bluePinkArray2 = b.split("|");	

	}

	var c = GM_getValue("analyzeOpponentPitcherBPc",'');

	if(c.indexOf(theTeam2) != -1){

		if (c != '') bluePinkArray2 = c.split("|");	

	}

	var d = GM_getValue("analyzeOpponentPitcherBPd",'');

	if(d.indexOf(theTeam2) != -1){

		if (d != '') bluePinkArray2 = d.split("|");	

	}

	var e = GM_getValue("analyzeOpponentPitcherBPe",'');

	if(e.indexOf(theTeam2) != -1){

		if (e != '') bluePinkArray2 = e.split("|");	

	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){


	if (a != '') bluePinkArray2 = a.split("|");	

}


if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

var playerLinkURLArray = new Array();

var playerLinkNoHrefs = document.evaluate("//td[@class='odd'][contains(text(),'R')]/text()|//td[@class='odd'][contains(text(),'L')]/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	
	for (var i=0;i < playerLinkNoHrefs.snapshotLength;i++)
	{	

		newCell = document.createElement("text");

	    	playerLink = playerLinks.snapshotItem(i);
		playerLink2 = playerLink.nodeValue;

		

		playerLinkNoHref = playerLinkNoHrefs.snapshotItem(i)

		playerLinkURL = playerLink2.substring(playerLink2.indexOf('SNOpenWindow(\'')+14,playerLink2.indexOf('_blank')-4);

		playerLinkURL = "http://fantasygames.sportingnews.com" + playerLinkURL;

		playerLinkURLArray[i] = playerLinkURL;
		
		

		teamName = teamNames.snapshotItem(i);
		teamName = teamName.nodeValue;

		/*
			if(responseTextArray2.length !=0){

		
			newCell.innerHTML = playerLinkNoHref.nodeValue + " " + '<font color="red">'+ responseTextArray2[i] + '<br>bp ' + bluePinkArray2[i] + '</font>';

			
				if(theTeam == opponentsTeamName){
					playerLinkNoHref.parentNode.replaceChild(newCell, playerLinkNoHref);
				}
			

			}
*/
	}

////////////////////////////////////////////

//var teamLinks = document.evaluate("//td[@class='odd']/a[contains(@href,'team_other.html?user_id=')]/@href",
//document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var teamLinks = document.evaluate("//td[@class='odd']/a[contains(@href,'team_other.html?user_id=')]/@href",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var j = 0;


var directTeamLinkURL;

for (var i=0;i < teamLinks.snapshotLength;i++)
{

		teamLink = teamLinks.snapshotItem(i);
		teamLink = teamLink.nodeValue;

		teamName = teamNames.snapshotItem(i);
		teamName = teamName.nodeValue;

		if (teamName != ownersTeamName){

			teamLinkURL = "http://fantasygames.sportingnews.com" + teamLink + "&stats=splits&onroster=0";

			directTeamLinkURL = teamLink.substring(teamLink.indexOf('user_id=')+8);
			directTeamLinkURL = "http://fantasygames.sportingnews.com/stratomatic/team/team_other.html?user_id=" + directTeamLinkURL;

			if(teamLinkURL.indexOf('playoffs') != -1){

				teamLinkURL = teamLinkURL.replace('playoffs', 'team');
				teamLinkURL = teamLinkURL.replace('&stats=sim', '');

			}


		}

	 j = 1+i;

      GM_xmlhttpRequest({
      method: 'GET',
      url: teamLinkURL,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function2.bind( {}, i, j )
  });	


}
/*
////////////////////////////////////////////////////////////////////////added 7/20/2011      
      GM_xmlhttpRequest({
      method: 'GET',
      url: directTeamLinkURL,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function4.bind( {}, i, j )
  });

////////////////////////////////////////////////////////////////////////
*/
}//if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

if(thisURL.indexOf('splits') != -1){

	var unbalancedCount = 0;

	var opsPrep;
	var opsPreps = document.evaluate("//tr[@class='odd']/td[contains(string(),'  .')]",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var opsPrepOBPL = opsPreps.snapshotLength - 5;
	var opsPrepSLGL = opsPreps.snapshotLength - 4;
	var opsPrepOBPR = opsPreps.snapshotLength - 2;
	var opsPrepSLGR = opsPreps.snapshotLength - 1;

	var opsprepOPSL=0;
	var opsprepOPSR=0;

	for (var i=0;i < opsPreps.snapshotLength;i++)
	{

		opsPrep = opsPreps.snapshotItem(i);

		if(i == opsPrepOBPL){

			opsprepOPSL += parseFloat(opsPrep.textContent);

		}

		if(i == opsPrepSLGL){

			opsprepOPSL += parseFloat(opsPrep.textContent);

		}	

		if(i == opsPrepOBPR){

			opsprepOPSR += parseFloat(opsPrep.textContent);

		}

		if(i == opsPrepSLGR){

			opsprepOPSR += parseFloat(opsPrep.textContent);

		}		

	}

	opsprepOPSL = opsprepOPSL.toFixed(3);
	opsprepOPSL = opsprepOPSL.toString();	

	opsprepOPSR = opsprepOPSR.toFixed(3);
	opsprepOPSR = opsprepOPSR.toString();	

	if(opsprepOPSL.substr(0,1) == "0"){	
		opsprepOPSL = opsprepOPSL.substr(1);
	}	

	if(opsprepOPSR.substr(0,1) == "0"){	
		opsprepOPSR = opsprepOPSR.substr(1);
	}	


	var theBatter;
	var theBatterR;
	var theSalary;
	var theBatterArray = new Array();

	var rABvsL;
	var rBAL;
	var rSalary;
	var rABvsR;
	var rABTot;

	var lABvsL;
	var lBAL;
	var lSalary;
	var lABvsR;
	var lABTot;	

	var sABvsL;
	var sBAL;
	var sSalary;
	var sABvsR;
	var sABTot;	


	//var rightBatters = document.evaluate("//table[6][@class='datatab_nowidth cleft tright']/tbody/tr[@class='odd']/td[contains(string(),'(R,')]",
//document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var theBatters = document.evaluate("//table[6][@class='datatab_nowidth cleft tright']/tbody/tr[@class='odd']/td[contains(string(),'(R,') or contains(string(),'(L,') or contains(string(),'(S,')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var theBattersR = document.evaluate("//table[6][@class='datatab_nowidth cleft tright']/tbody/tr[@class='odd']/td[contains(string(),'vs. R')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

	var theSalaries = document.evaluate("//table[6][@class='datatab_nowidth cleft tright']/tbody/tr[@class='even']/td[contains(string(),'M')]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

	for (var i=0;i < theBatters.snapshotLength;i++)
	{

		theBatter = theBatters.snapshotItem(i);
		theBatterR = theBattersR.snapshotItem(i);
		theSalary = theSalaries.snapshotItem(i);

		if(theBatter.textContent.indexOf('(R,') != -1){

			rABvsL = theBatter.nextSibling.nextSibling.textContent;
			rBAL = theBatter.textContent;
			rBAL = rBAL.substring(rBAL.lastIndexOf(',')+1,rBAL.indexOf(')'));
			rBAL = trim(rBAL)
			rSalary = theSalary.textContent;
			rSalary = rSalary.substring(rSalary.indexOf('$')+1,rSalary.indexOf('M'));
			rABvsR = theBatterR.nextSibling.textContent;
			rABTot = parseFloat(rABvsL) + parseFloat(rABvsR);

			theBatterArray[i] = rABTot + "r" + rBAL + "$" + rSalary;			
					
		}

		if(theBatter.textContent.indexOf('(L,') != -1){

			lABvsL = theBatter.nextSibling.nextSibling.textContent;
			lBAL = theBatter.textContent;
			lBAL = lBAL.substring(lBAL.lastIndexOf(',')+1,lBAL.indexOf(')'));
			lBAL = trim(lBAL)
			lSalary = theSalary.textContent;
			lSalary = lSalary.substring(lSalary.indexOf('$')+1,lSalary.indexOf('M'));
			lABvsR = theBatterR.nextSibling.textContent;
			lABTot = parseFloat(lABvsL) + parseFloat(lABvsR);

			theBatterArray[i] = lABTot + "l" + lBAL + "$" + lSalary;			

		}

		if(theBatter.textContent.indexOf('(S,') != -1){

			sABvsL = theBatter.nextSibling.nextSibling.textContent;
			sBAL = theBatter.textContent;
			sBAL = sBAL.substring(sBAL.lastIndexOf(',')+1,sBAL.indexOf(')'));
			sBAL = trim(sBAL)
			sSalary = theSalary.textContent;
			sSalary = sSalary.substring(sSalary.indexOf('$')+1,sSalary.indexOf('M'));		
			sABvsR = theBatterR.nextSibling.textContent;
			sABTot = parseFloat(sABvsL) + parseFloat(sABvsR);

			theBatterArray[i] = sABTot + "s" + sBAL + "$" + sSalary;			

		}		


	}

	//sort by at bats		
	theBatterArray = theBatterArray.sort(sortNumber2);

	var lCount = 0;
	var rCount = 0;

	for (var i=0;i < theBatterArray.length;i++)
	{


		if(theBatterArray[i].indexOf('r') != -1 && i < 9)
		{

			rCount++; //Number of potential right-handed batters in lineup.
				

		}

		if(theBatterArray[i].indexOf('l') != -1 && i < 9)
		{

			lCount++; //Number of potential left-handed batters in lineup.
			

		}

////////////
if(i < 9)
			{
			
				
				if(theBatterArray[i].indexOf("R") != -1)
				{
					var testSalary;
					var testSalary2;

					balanceMeter = balanceMeter + parseFloat(theBatterArray[i].substring(theBatterArray[i].indexOf("R")-1,theBatterArray[i].indexOf("R")));
					
					testSalary = theBatterArray[i].substring(theBatterArray[i].indexOf("$") + 1);
					testSalary2 = testSalary * parseFloat(theBatterArray[i].substring(theBatterArray[i].indexOf("R")-1,theBatterArray[i].indexOf("R")));

					
					
					balanceMeterTest = balanceMeterTest + testSalary2;
					
					unbalancedCount++;
					
				
				}
				else if (theBatterArray[i].indexOf("L") != -1)
				{
					var testSalary;
					var testSalary2;

					balanceMeter = balanceMeter - parseFloat(theBatterArray[i].substring(theBatterArray[i].indexOf("L")-1,theBatterArray[i].indexOf("L")));					
					
					testSalary = theBatterArray[i].substring(theBatterArray[i].indexOf("$") + 1);
					
					testSalary2 = testSalary * parseFloat(theBatterArray[i].substring(theBatterArray[i].indexOf("L")-1,theBatterArray[i].indexOf("L")));
					
					balanceMeterTest = balanceMeterTest - testSalary2;					

				    	unbalancedCount++;
					

				}

				

				balanceMeterAVG = balanceMeter/unbalancedCount;
			
				balanceMeterAVG = balanceMeterAVG.toFixed(0);
				

				balanceMeterAVGTest = balanceMeterTest/unbalancedCount;
				balanceMeterAVGTest = balanceMeterAVGTest.toFixed(0);
			

				if(balanceMeterAVG > 0){

					balanceMeterAVG = balanceMeterAVG + "R";

				}	
				else if(balanceMeterAVG < 0){

					balanceMeterAVG = Math.abs(balanceMeterAVG) + "L";
				}
				else if(balanceMeterAVG == 0){

					balanceMeterAVG = "E";
				}

				if(balanceMeterAVGTest > 0){

					balanceMeterAVGTest = balanceMeterAVGTest + "R";

				}	
				else if(balanceMeterAVGTest < 0){

					balanceMeterAVGTest = Math.abs(balanceMeterAVGTest) + "L";
				}
				else if(balanceMeterAVGTest == 0){

					balanceMeterAVGTest = "E";
				}	
			
					
			}//if(i < 9)
////////////		

	}

	//var bottomTable = document.evaluate("//table[@class='datatab_nowidth cleft tright'][2]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	
	
	var fillerTable = document.createElement("table");
	fillerTable.setAttribute('width', '95%'); 
	fillerTable.setAttribute('align', 'center');

	fillerTable.innerHTML = '<tbody><tr><td>&nbsp;</td></tr></tbody>';

	var myHelp = document.createElement("table");
	myHelp.id = 'help';
	myHelp.width = '35%';
	myHelp.border = '0';	
	myHelp.setAttribute('cellpadding','0');	
	myHelp.setAttribute('cellspacing','1');	
	myHelp.setAttribute('align','center');	

	myHelp.innerHTML= '<tr><td class="text10" align="right"><a class="helplink" id="bunting" style="cursor: pointer;">help</a></td></tr><tr><td class="text10" align="right"></td></tr>';	

	var bottomTable = document.evaluate("//table[7]",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);		

	bottomTable = bottomTable.snapshotItem(0);
	
	var myRow = document.createElement("table");
	myRow.setAttribute('class', 'datatab_nowidth cleft tright');
	myRow.width = '35%';
	myRow.setAttribute('cellspacing', '1');
	myRow.setAttribute('cellpadding', '1');
	myRow.border = '0';
	myRow.align = 'center';
	
	
	if(thisURL.indexOf('team.html?') != -1){

		var theTitle = 'Analyze My Team';

	}
	else
	{

		var theTitle = 'Analyze Opponent';
	}	

	myRow.innerHTML = '<tr><td colspan="2" align="center"><b>'+ theTitle +'</b></td></tr>'+
	'<tr class="odd"><td class="tleft" width="60%">Probable LHBs in lineup</td><td class="text10" align="center">'+lCount+'</td></tr>'+
	'<tr class="even"><td class="tleft">Probable RHBs in lineup</td><td align="center">'+rCount+'</td></tr>'+	
	'<tr class="odd"><td class="tleft">OPS vs L</td><td align="center">'+opsprepOPSL+'</td></tr>'+
	'<tr class="even"><td class="tleft">OPS vs R</td><td align="center">'+opsprepOPSR+'</td></tr>'+
	'<tr class="odd"><td class="tleft">AVG Hitter balance</td><td align="center">'+balanceMeterAVG+'</td></tr>'+
	'<tr class="even"><td class="tleft">Prorated Hitter balance</td><td align="center">'+balanceMeterAVGTest+'</td></tr>';	
	
	
	bottomTable.parentNode.insertBefore(fillerTable, bottomTable.nextSibling);
	bottomTable.parentNode.insertBefore(myHelp,bottomTable.nextSibling);
	bottomTable.parentNode.insertBefore(myRow, bottomTable.nextSibling);
	

}//if(thisURL.indexOf('onroster=') != -1){

		//sort by at bats
		function sortNumber(a,b)
		{
		return parseFloat(b) - parseFloat(a);
		
		}

		
		//sort by salary
		function sortNumber2(a,b)
		{
		return b.substring(b.indexOf('$')+1) - a.substring(a.indexOf('$')+1);
		
		}


var pitcherData2='';

function callback_function2(parameter1, parameter2, responseDetails)
{
	

	var pitcherData;
	var pitcherDataID;
	var pitcherDataVSLeft;
	var pitcherDataVSRight;

	ops = responseDetails.responseText;


	playerIDSubString = playerLinkURLArray[parameter1].substring(playerLinkURLArray[parameter1].indexOf('?player_id=')+1,playerLinkURLArray[parameter1].indexOf('&year='));


	if(ops.indexOf(playerIDSubString) != -1){

		pitcherData = ops.substring(ops.indexOf(playerIDSubString),ops.indexOf('TOTAL',ops.indexOf(playerIDSubString)));
	
		pitcherDataID = pitcherData.substring(pitcherData.indexOf('player_id='),pitcherData.indexOf('year=')-1);


		pitcherDataVSLeft = pitcherData.substring(pitcherData.indexOf('vs. L'),pitcherData.indexOf('<tr class="odd">',pitcherData.indexOf('vs. L')));
		pitcherDataVSLeft = pitcherDataVSLeft.replace(/<td><\/td>/g,'');
		pitcherDataVSLeft = pitcherDataVSLeft.substring(pitcherDataVSLeft.length-30);

		if(pitcherDataVSLeft.substring(0,1) != '<'){

			pitcherDataVSLeft = '<'+pitcherDataVSLeft;

		}

		pitcherDataVSLeft = pitcherDataVSLeft.replace(/<td>/,'');						

		pitcherDataVSLeft = pitcherDataVSLeft.replace(/<\/TD><td>/,' hr');
		pitcherDataVSLeft = pitcherDataVSLeft.replace(/<\/TD><\/tr>/,' avg');
		pitcherDataVSLeft = 'vs L: '+ pitcherDataVSLeft;

		pitcherDataVSRight = pitcherData.substring(pitcherData.indexOf('vs. R'),pitcherData.indexOf('<tr class="even">',pitcherData.indexOf('vs. R')));
		pitcherDataVSRight = pitcherDataVSRight.replace(/<td><\/td>/g,'');
		pitcherDataVSRight = pitcherDataVSRight.substring(pitcherDataVSRight.length-30);

		if(pitcherDataVSRight.substring(0,1) != '<'){

			pitcherDataVSRight = '<'+pitcherDataVSRight;

		}

		pitcherDataVSRight = pitcherDataVSRight.replace(/<td>/,'');		

		pitcherDataVSRight = pitcherDataVSRight.replace(/<\/TD><td>/,' hr');
		pitcherDataVSRight = pitcherDataVSRight.replace(/<\/TD><\/tr>/,' avg');
		pitcherDataVSRight = 'vs R: '+ pitcherDataVSRight;
		pitcherDataVSRight = trim(pitcherDataVSRight);

		pitcherData2 += pitcherDataID + "!" + pitcherDataVSLeft + "|"+ pitcherDataVSRight + "*";
	
	}


	var ops2 = ops.substr(ops.lastIndexOf('TOTALS') + 33, ops.lastIndexOf('OVERALL')- ops.lastIndexOf('TOTALS')-33);

	var OPSvsL = ops2.substr(ops2.indexOf('vs. R') - 81, 19);

	
	opsArrayL = OPSvsL.split("</td><td>  ");
	OPSvsL = parseFloat(opsArrayL[0]) + parseFloat(opsArrayL[1]);
	OPSvsL = OPSvsL.toFixed(3);
	OPSvsL = OPSvsL.toString();

	if(OPSvsL.substr(0,1) == "0"){	
		OPSvsL = OPSvsL.substr(1);
	}


	var OPSvsR = ops2.substr(ops2.length - 85,19)
	opsArrayR = OPSvsR.split("</td><td>  ");
	OPSvsR = parseFloat(opsArrayR[0]) + parseFloat(opsArrayR[1]);
	OPSvsR = OPSvsR.toFixed(3);
	OPSvsR = OPSvsR.toString();

	if(OPSvsR.substr(0,1) == "0"){	
		OPSvsR = OPSvsR.substr(1);
	}

	opsArray[0] = OPSvsL;
	opsArray[1] = OPSvsR;

	var a2 = GM_getValue("pitcherData",'');

	if(a2.indexOf(theTeam2) != -1){

		GM_setValue('pitcherData',  theTeam2 + "|" + pitcherData2);

	}

	var b2 = GM_getValue("pitcherDatab",'');

	if(b2.indexOf(theTeam2) != -1){

		GM_setValue('pitcherDatab',  theTeam2 + "|" + pitcherData2);

	}	

	var c2 = GM_getValue("pitcherDatac",'');

	if(c2.indexOf(theTeam2) != -1){

		GM_setValue('pitcherDatac',  theTeam2 + "|" + pitcherData2);

	}	

	var d2 = GM_getValue("pitcherDatad",'');

	if(d2.indexOf(theTeam2) != -1){

		GM_setValue('pitcherDatad',  theTeam2 + "|" + pitcherData2);

	}	

	var e2 = GM_getValue("pitcherDatae",'');

	if(e2.indexOf(theTeam2) != -1){

		GM_setValue('pitcherDatae',  theTeam2 + "|" + pitcherData2);

	}	

	if(a2.indexOf(theTeam2) == -1 && b2.indexOf(theTeam2) == -1 && c2.indexOf(theTeam2) == -1 && d2.indexOf(theTeam2) == -1 && e2.indexOf(theTeam2) == -1){

		if(a2 == ''){

			GM_setValue('pitcherData', theTeam2 + "|" + pitcherData2);
		}
		else if(b2 == ''){
			GM_setValue('pitcherDatab', theTeam2 + "|" + pitcherData2);
		}
		else if(c2 == ''){
			GM_setValue('pitcherDatac', theTeam2 + "|" + pitcherData2);
		}
		else if(d2 == ''){
			GM_setValue('pitcherDatad', theTeam2 + "|" + pitcherData2);
		}
		else if(e2 == ''){
			GM_setValue('pitcherDatae', theTeam2 + "|" + pitcherData2);
		}		


	}	
//

	var a = GM_getValue("analyzeOpponentOPS",'');

	if(a.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentOPS',   theTeam2 + "|" + opsArray.join("|") );

	}

	var b = GM_getValue("analyzeOpponentOPSb",'');

	if(b.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentOPSb',  theTeam2 + "|" + opsArray.join("|"));

	}	

	var c = GM_getValue("analyzeOpponentOPSc",'');

	if(c.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentOPSc',  theTeam2 + "|" + opsArray.join("|"));

	}	

	var d = GM_getValue("analyzeOpponentOPSd",'');

	if(d.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentOPSd',  theTeam2 + "|" + opsArray.join("|"));

	}	

	var e = GM_getValue("analyzeOpponentOPSe",'');

	if(e.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentOPSe',  theTeam2 + "|" + opsArray.join("|"));

	}

	if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

		if(a == ''){

			GM_setValue('analyzeOpponentOPS', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(b == ''){
			GM_setValue('analyzeOpponentOPSb', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(c == ''){
			GM_setValue('analyzeOpponentOPSc', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(d == ''){
			GM_setValue('analyzeOpponentOPSd', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(e == ''){
			GM_setValue('analyzeOpponentOPSe', theTeam2 + "|" + opsArray.join("|"));
		}		

	}	



	count++;

	rightbatterCount = 0;
	leftbatterCount = 0;
	var injuryCount = 0;
	
	//if (count == 5){ 		

	righties = responseDetails.responseText;

	righties = righties.substr(righties.lastIndexOf('datatab_nowidth cleft tright'),righties.lastIndexOf('TOTALS') - righties.lastIndexOf('datatab_nowidth cleft tright'));


	noLongerRosterCheck = righties.indexOf('#');

	if (righties.indexOf('#') != -1){

		righties = righties.substr(righties.lastIndexOf('datatab_nowidth cleft tright'),righties.indexOf('#') - righties.lastIndexOf('datatab_nowidth cleft tright'));

	}


	var pattern = /\(R,/g;		
	var result
	var count0 = -1;	
	while((result = pattern.exec(righties)) != null){

		salaryRight = righties.substring(result.index,righties.indexOf('$',result.index)+7);
		salaryRight = salaryRight.substring(salaryRight.indexOf('$') + 1,salaryRight.lastIndexOf('M'));
	

		righties2 = righties.substring(result.index,righties.indexOf('TOTAL',result.index)+25);
		righties2 = righties2.substr(righties2.length - 4);
		righties2 = parseFloat(righties2);


		rightBalance = righties.substring(result.index,result.index + 6);
		rightBalance =  rightBalance.substring(rightBalance.length - 2);
		
		var injury = righties.substring(result.index,result.index - 8);

		if(injury == '</font> '){

			injuryCount++;

		}

		count0++
		
		testArray[count0] = righties2 + "r" + rightBalance + "$" + salaryRight + "I" + injuryCount;	
		
			
	}

	var pattern = /\(L,/g;		
	var result

	while((result = pattern.exec(righties)) != null){

		salaryLeft = righties.substring(result.index,righties.indexOf('$',result.index)+7);
		salaryLeft = salaryLeft.substring(salaryLeft.indexOf('$') + 1,salaryLeft.lastIndexOf('M'));


		lefties = righties.substring(result.index,righties.indexOf('TOTAL',result.index)+25);
		lefties = lefties.substr(lefties.length - 4);
		lefties = parseFloat(lefties);
	
		leftBalance = righties.substring(result.index,result.index + 6);
		leftBalance =  leftBalance.substring(leftBalance.length - 2);

		var injury = righties.substring(result.index,result.index - 8);

		if(injury == '</font> '){

			injuryCount++;

		}

		count0++

		testArray[count0] = lefties + "l" + leftBalance + "$" + salaryLeft + "I" + injuryCount;			
		
	}	

	var pattern = /\(S,/g;		
	var result

	while((result = pattern.exec(righties)) != null){

		salarySwitch = righties.substring(result.index,righties.indexOf('$',result.index)+7);
		salarySwitch = salarySwitch.substring(salarySwitch.indexOf('$') + 1,salarySwitch.lastIndexOf('M'));

		switchies = righties.substring(result.index,righties.indexOf('TOTAL',result.index)+25);
		switchies = switchies.substr(switchies.length - 4);
		switchies = parseFloat(switchies);

		switchBalance = righties.substring(result.index,result.index + 6);
		switchBalance =  switchBalance.substring(switchBalance.length - 2);
			
		var injury = righties.substring(result.index,result.index - 8);

		if(injury == '</font> '){

			injuryCount++;

		}		

		count0++				

		testArray[count0] = switchies + "s" + switchBalance + "$" + salarySwitch + "I" + injuryCount;		
	
			
	}



		//sort by at bats
		function sortNumber(a,b)
		{
		return parseFloat(b) - parseFloat(a);
		
		}

		
		//sort by salary
		function sortNumber2(a,b)
		{

		return b.substring(b.indexOf('$')+1,b.indexOf('I')) - a.substring(a.indexOf('$')+1,a.indexOf('I'));
			
		}
		
		


		if(noLongerRosterCheck == -1){
			
			testArray = testArray.sort(sortNumber);

		}
		else
		{
			testArray = testArray.sort(sortNumber2);
		}

		

		for (var i=0;i < testArray.length;i++)
		{

			
			if(testArray[i].indexOf('r') != -1 && i < 9)
			{

				rightbatterCount++; //Number of potential right-handed batters in lineup.
				

			}

			if(testArray[i].indexOf('l') != -1 && i < 9)
			{

				leftbatterCount++; //Number of potential left-handed batters in lineup.
			

			}			
			
			

			if(parameter1 == 1){

			if(i < 9)
			{
			
				
				if(testArray[i].indexOf("R") != -1)
				{
					var testSalary;
					var testSalary2;

					balanceMeter = balanceMeter + parseFloat(testArray[i].substring(testArray[i].indexOf("R")-1,testArray[i].indexOf("R")));
					
					testSalary = testArray[i].substring(testArray[i].indexOf("$") + 1,testArray[i].indexOf("I"));
					testSalary2 = testSalary * parseFloat(testArray[i].substring(testArray[i].indexOf("R")-1,testArray[i].indexOf("R")));
					
					

					balanceMeterTest = balanceMeterTest + testSalary2;
					
					unbalancedCount++;
					
				
				}
				else if (testArray[i].indexOf("L") != -1)
				{
					var testSalary;
					var testSalary2;

					balanceMeter = balanceMeter - parseFloat(testArray[i].substring(testArray[i].indexOf("L")-1,testArray[i].indexOf("L")));				
					
					testSalary = testArray[i].substring(testArray[i].indexOf("$") + 1,testArray[i].indexOf("I"));
			
					testSalary2 = testSalary * parseFloat(testArray[i].substring(testArray[i].indexOf("L")-1,testArray[i].indexOf("L")));
					
					balanceMeterTest = balanceMeterTest - testSalary2;					

				    	unbalancedCount++;
					

				}


				balanceMeterAVG = balanceMeter/unbalancedCount;
			
				balanceMeterAVG = balanceMeterAVG.toFixed(0);


				balanceMeterAVGTest = balanceMeterTest/unbalancedCount;
				balanceMeterAVGTest = balanceMeterAVGTest.toFixed(0);

				
			

				if(balanceMeterAVG > 0){

					balanceMeterAVG = balanceMeterAVG + "R";

				}	
				else if(balanceMeterAVG < 0){

					balanceMeterAVG = Math.abs(balanceMeterAVG) + "L";
				}
				else if(balanceMeterAVG == 0){

					balanceMeterAVG = "E";
				}

				if(balanceMeterAVGTest > 0){

					balanceMeterAVGTest = balanceMeterAVGTest + "R";

				}	
				else if(balanceMeterAVGTest < 0){

					balanceMeterAVGTest = Math.abs(balanceMeterAVGTest) + "L";
				}
				else if(balanceMeterAVGTest == 0){

					balanceMeterAVGTest = "E";
				}				
					

			}//if(i < 9)	

		}//if parameter1 == 0

		}//for (var i=0;i < testArray.length;i++)

	//}//if (count == 5){ 
	
		var a = GM_getValue("analyzeOpponentInjuryCount",'');

		if(a.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentInjuryCount',   theTeam2 + "|" + injuryCount);

		}

		var b = GM_getValue("analyzeOpponentInjuryCountb",'');

		if(b.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentInjuryCountb',   theTeam2 + "|" + injuryCount);

		}		

		var c = GM_getValue("analyzeOpponentInjuryCountc",'');

		if(c.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentInjuryCountc',   theTeam2 + "|" + injuryCount);

		}		

		var d = GM_getValue("analyzeOpponentInjuryCountd",'');

		if(d.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentInjuryCountd',   theTeam2 + "|" + injuryCount);

		}		

		var e = GM_getValue("analyzeOpponentInjuryCounte",'');

		if(e.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentInjuryCounte',   theTeam2 + "|" + injuryCount);

		}		

		if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

		if(a == ''){

			GM_setValue('analyzeOpponentInjuryCount', theTeam2 + "|"  + injuryCount);
		}
		else if(b == ''){
			GM_setValue('analyzeOpponentInjuryCountb', theTeam2 + "|"  + injuryCount);
		}
		else if(c == ''){
			GM_setValue('analyzeOpponentInjuryCountc', theTeam2 + "|" + injuryCount);
		}
		else if(d == ''){
			GM_setValue('analyzeOpponentInjuryCountd', theTeam2 + "|" + injuryCount);
		}
		else if(e == ''){
			GM_setValue('analyzeOpponentInjuryCounte', theTeam2 + "|" + injuryCount);
		}			


		}		

		
		var a = GM_getValue("analyzeOpponentBatterCount",'');

		if(a.indexOf(theTeam2) != -1){


			GM_setValue('analyzeOpponentBatterCount',   theTeam2 + "|" + leftbatterCount + "|" + rightbatterCount);

		}

		var b = GM_getValue("analyzeOpponentBatterCountb",'');

		if(b.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentBatterCountb',   theTeam2 + "|" + leftbatterCount + "|" + rightbatterCount);

		}		

		var c = GM_getValue("analyzeOpponentBatterCountc",'');

		if(c.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentBatterCountc',   theTeam2 + "|" + leftbatterCount + "|" + rightbatterCount);

		}		

		var d= GM_getValue("analyzeOpponentBatterCountd",'');

		if(d.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentBatterCountd',   theTeam2 + "|" + leftbatterCount + "|" + rightbatterCount);

		}		

		var e = GM_getValue("analyzeOpponentBatterCounte",'');

		if(e.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentBatterCounte',   theTeam2 + "|" + leftbatterCount + "|" + rightbatterCount);

		}	

		if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

		

		if(a == ''){

			GM_setValue('analyzeOpponentBatterCount', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(b == ''){
			GM_setValue('analyzeOpponentBatterCountb', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(c == ''){
			GM_setValue('analyzeOpponentBatterCountc', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(d == ''){
			GM_setValue('analyzeOpponentBatterCountd', theTeam2 + "|" + opsArray.join("|"));
		}
		else if(e == ''){
			GM_setValue('analyzeOpponentBatterCounte', theTeam2 + "|" + opsArray.join("|"));
		}			

		}		
		
		/////////////////////////////////////////////////////////////////////////////////////////
	
		var a = GM_getValue("analyzeOpponentbalanceMeterAVG",'');

		if(a.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentbalanceMeterAVG',   theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);

		}

		var b = GM_getValue("analyzeOpponentbalanceMeterAVGb",'');

		if(b.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentbalanceMeterAVGb',   theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);

		}		

		var c = GM_getValue("analyzeOpponentbalanceMeterAVGc",'');

		if(c.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentbalanceMeterAVGc',   theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);

		}		

		var d = GM_getValue("analyzeOpponentbalanceMeterAVGd",'');

		if(d.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentbalanceMeterAVGd',   theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);

		}		

		var e = GM_getValue("analyzeOpponentbalanceMeterAVGe",'');

		if(e.indexOf(theTeam2) != -1){

			GM_setValue('analyzeOpponentbalanceMeterAVGe',   theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);

		}

		if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

			

			if(a == ''){

				GM_setValue('analyzeOpponentbalanceMeterAVG', theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);
			}
			else if(b == ''){
				GM_setValue('analyzeOpponentbalanceMeterAVGb', theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);
			}
			else if(c == ''){
				GM_setValue('analyzeOpponentbalanceMeterAVGc', theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);
			}
			else if(d == ''){
				GM_setValue('analyzeOpponentbalanceMeterAVGd', theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);
			}
			else if(e == ''){
				GM_setValue('analyzeOpponentbalanceMeterAVGe', theTeam2 + "|" + balanceMeterAVG+ "|"+balanceMeterAVGTest);
			}			

		}		

	
			
 
}//function callback_function2(parameter1, parameter2, responseDetails)

var pOpponentDataArray = new Array();


	var a2 = GM_getValue("pitcherData",'');

	if(a2.indexOf(theTeam2) != -1){

		if (a2 != '') pOpponentDataArray = a2.split("*");

	}

	var b2 = GM_getValue("pitcherDatab",'');

	if(b2.indexOf(theTeam2) != -1){

		if (b2 != '') pOpponentDataArray = b2.split("*");

	}

	var c2 = GM_getValue("pitcherDatac",'');

	if(c2.indexOf(theTeam2) != -1){

		if (c2 != '') pOpponentDataArray = c2.split("*");

	}

	var d2 = GM_getValue("pitcherDatad",'');

	if(d2.indexOf(theTeam2) != -1){

		if (d2 != '') pOpponentDataArray = d2.split("*");

	}

	var e2 = GM_getValue("pitcherDatae",'');

	if(e2.indexOf(theTeam2) != -1){

		if (e2 != '') pOpponentDataArray = e2.split("*");

	}

if(a2.indexOf(theTeam2) == -1 && b2.indexOf(theTeam2) == -1 && c2.indexOf(theTeam2) == -1 && d2.indexOf(theTeam2) == -1 && e2.indexOf(theTeam2) == -1){

	if (a2 != '') pOpponentDataArray = a2.split("*");

}


///

	var a = GM_getValue("analyzeOpponentOPS",'');

	if(a.indexOf(theTeam2) != -1){

		if (a != '') opsArray2 = a.split("|");

	}

	var b = GM_getValue("analyzeOpponentOPSb",'');

	if(b.indexOf(theTeam2) != -1){

		if (b != '') opsArray2 = b.split("|");

	}

	var c = GM_getValue("analyzeOpponentOPSc",'');

	if(c.indexOf(theTeam2) != -1){

		if (c != '') opsArray2 = c.split("|");

	}

	var d = GM_getValue("analyzeOpponentOPSd",'');

	if(d.indexOf(theTeam2) != -1){

		if (d != '') opsArray2 = d.split("|");

	}

	var e = GM_getValue("analyzeOpponentOPSe",'');

	if(e.indexOf(theTeam2) != -1){

		if (e != '') opsArray2 = e.split("|");

	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){


	if (a != '') opsArray2 = a.split("|");

}

	var a = GM_getValue("analyzeOpponentInjuryCount",'');

	if(a.indexOf(theTeam2) != -1){

		var injuryCount = a.slice(a.indexOf("|")+1);

	}

	var b = GM_getValue("analyzeOpponentInjuryCountb",'');

	if(b.indexOf(theTeam2) != -1){

		var injuryCount = b.slice(b.indexOf("|")+1);

	}

	var c = GM_getValue("analyzeOpponentInjuryCountc",'');

	if(c.indexOf(theTeam2) != -1){

		var injuryCount = c.slice(c.indexOf("|")+1);

	}

	var d = GM_getValue("analyzeOpponentInjuryCountd",'');

	if(d.indexOf(theTeam2) != -1){

		var injuryCount = d.slice(d.indexOf("|")+1);

	}

	var e = GM_getValue("analyzeOpponentInjuryCounte",'');

	if(e.indexOf(theTeam2) != -1){

		var injuryCount = e.slice(e.indexOf("|")+1);

	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	if (a != ''){

		var injuryCount = a.slice(a.indexOf("|")+1);

	}

}


	var a = GM_getValue("analyzeOpponentBatterCount",'');

	if(a.indexOf(theTeam2) != -1){

		if (a != ''){

			leftbatterCount2 = a.slice(a.indexOf("|")+1,a.indexOf("|")+2);
			rightbatterCount2 = a.slice(a.lastIndexOf("|")+1);			
			
		}
	}

	var b = GM_getValue("analyzeOpponentBatterCountb",'');

	if(b.indexOf(theTeam2) != -1){

		if (b != ''){

			leftbatterCount2 = b.slice(b.indexOf("|")+1,b.indexOf("|")+2);
			rightbatterCount2 = b.slice(b.lastIndexOf("|")+1);			
			
		}
	}

	var c = GM_getValue("analyzeOpponentBatterCountc",'');

	if(c.indexOf(theTeam2) != -1){

		if (c != ''){

			leftbatterCount2 = c.slice(c.indexOf("|")+1,c.indexOf("|")+2);
			rightbatterCount2 = c.slice(c.lastIndexOf("|")+1);			
			
		}
	}

	var d = GM_getValue("analyzeOpponentBatterCountd",'');

	if(d.indexOf(theTeam2) != -1){

		if (d != ''){

			leftbatterCount2 = d.slice(d.indexOf("|")+1,d.indexOf("|")+2);
			rightbatterCount2 = d.slice(d.lastIndexOf("|")+1);			
			
		}
	}

	var e = GM_getValue("analyzeOpponentBatterCounte",'');

	if(e.indexOf(theTeam2) != -1){

		if (e != ''){

			leftbatterCount2 = e.slice(e.indexOf("|")+1,e.indexOf("|")+2);
			rightbatterCount2 = e.slice(e.lastIndexOf("|")+1);			
			
		}
	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	if (a != ''){

		leftbatterCount2 = a.slice(a.indexOf("|")+1,a.indexOf("|")+2);
		rightbatterCount2 = a.slice(a.lastIndexOf("|")+1);			
			
	}	

}
	
	var a = GM_getValue("analyzeOpponentbalanceMeterAVG",'');

	if(a.indexOf(theTeam2) != -1){

		//avg balance/prorated balance
		var balanceMeterAVG2 = a.slice(a.indexOf("|")+1,a.lastIndexOf("|")) + "/" + a.slice(a.lastIndexOf("|")+1);
		var avgBalance = a.slice(a.indexOf("|")+1,a.lastIndexOf("|"));
		var proratedBalance = a.slice(a.lastIndexOf("|")+1);

	}

	var b = GM_getValue("analyzeOpponentbalanceMeterAVGb",'');

	if(b.indexOf(theTeam2) != -1){

		var balanceMeterAVG2 = b.slice(b.indexOf("|")+1,b.lastIndexOf("|")) + "/" + b.slice(b.lastIndexOf("|")+1);
		var avgBalance = b.slice(b.indexOf("|")+1,b.lastIndexOf("|"));
		var proratedBalance = b.slice(b.lastIndexOf("|")+1);

	}

	var c = GM_getValue("analyzeOpponentbalanceMeterAVGc",'');

	if(c.indexOf(theTeam2) != -1){

		var balanceMeterAVG2 = c.slice(c.indexOf("|")+1,c.lastIndexOf("|")) + "/" + c.slice(c.lastIndexOf("|")+1);
		var avgBalance = c.slice(c.indexOf("|")+1,c.lastIndexOf("|"));
		var proratedBalance = c.slice(c.lastIndexOf("|")+1);		
	}

	var d = GM_getValue("analyzeOpponentbalanceMeterAVGd",'');

	if(d.indexOf(theTeam2) != -1){

		var balanceMeterAVG2 = d.slice(d.indexOf("|")+1,d.lastIndexOf("|")) + "/" + d.slice(d.lastIndexOf("|")+1);
		var avgBalance = d.slice(d.indexOf("|")+1,d.lastIndexOf("|"));
		var proratedBalance = d.slice(d.lastIndexOf("|")+1);		
	}

	var e = GM_getValue("analyzeOpponentbalanceMeterAVGe",'');

	if(e.indexOf(theTeam2) != -1){

		var balanceMeterAVG2 = e.slice(e.indexOf("|")+1,e.lastIndexOf("|")) + "/" + e.slice(e.lastIndexOf("|")+1);
		var avgBalance = e.slice(e.indexOf("|")+1,e.lastIndexOf("|"));
		var proratedBalance = e.slice(e.lastIndexOf("|")+1);		
	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

		var balanceMeterAVG2 = a.slice(a.indexOf("|")+1,a.lastIndexOf("|")) + "/" + a.slice(a.lastIndexOf("|")+1);
		var avgBalance = a.slice(a.indexOf("|")+1,a.lastIndexOf("|"));
		var proratedBalance = a.slice(a.lastIndexOf("|")+1);		

}


	var playerLinkNoHrefs = document.evaluate("//td[@class='odd'][contains(text(),'(R)')]/text()|//td[@class='odd'][contains(text(),'(L)')]/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var playerLinkYesHrefs = document.evaluate("//td[@class='odd'][contains(text(),'(R)')]/a|//td[@class='odd'][contains(text(),'(L)')]/a",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

	var playerLinkYesHref;


	for (var i=0;i < playerLinkNoHrefs.snapshotLength;i++)
	{	

		newCell = document.createElement("text");

	    	playerLink = playerLinks.snapshotItem(i);
		playerLink2 = playerLink.nodeValue;


		playerLinkNoHref = playerLinkNoHrefs.snapshotItem(i);
		playerLinkYesHref = playerLinkYesHrefs.snapshotItem(i);

		var playerLinkYesHrefID = playerLinkYesHref.getAttribute('href');
		playerLinkYesHrefID = playerLinkYesHrefID.substring(playerLinkYesHrefID.indexOf('?player_id=')+1,playerLinkYesHrefID.indexOf('&year='));
		


		for (var i2=0;i2 < pOpponentDataArray.length;i2++){


			if(pOpponentDataArray[i2].indexOf(playerLinkYesHrefID) != -1){

				pOpponentDataArray[i2] = pOpponentDataArray[i2].substring(pOpponentDataArray[i2].indexOf('!')+1);
				pOpponentDataArray[i2] = pOpponentDataArray[i2].replace('|',' / ');

				if(analyzeNextOpponentFlag == false){
					playerLinkYesHref.setAttribute('TITLE',pOpponentDataArray[i2]);
				}
				
				

			}

		}
		
			


		



		playerLinkURL = playerLink2.substring(25,playerLink2.indexOf('&')) + "&year=1690";
		playerLinkURL = "http://fantasygames.sportingnews.com" + playerLinkURL;
		

		teamName = teamNames.snapshotItem(i);
		teamName = teamName.nodeValue;


		newCell.innerHTML = pOpponentDataArray[i];

		//playerLinkNoHref.parentNode.replaceChild(newCell, playerLinkNoHref);
			
		/*
			if(playerLinkNoHref.nodeValue == '(R)'){

		
				newCell.innerHTML = playerLinkNoHref.nodeValue + " " + '<font color="red">'+ opsArray2[1] + '</font>';
				//playerLinkNoHref.parentNode.replaceChild(newCell, playerLinkNoHref);
			

			}
			else
			{
				newCell.innerHTML = playerLinkNoHref.nodeValue + " " + '<font color="red">'+ opsArray2[0] + '</font>';
				//playerLinkNoHref.parentNode.replaceChild(newCell, playerLinkNoHref);

			}
*/
	}

document.addEventListener('click', function(event) {

		var a = GM_getValue("analyzeOpponentTeamName",'');
		var b = GM_getValue("analyzeOpponentTeamNameb",'');
		var c = GM_getValue("analyzeOpponentTeamNamec",'');
		var d = GM_getValue("analyzeOpponentTeamNamed",'');
		var e = GM_getValue("analyzeOpponentTeamNamee",'');


		
if(event.target.id == 'Analyze'){		
		
switch(event.target.innerHTML)
	{

		case a.substring(0,a.indexOf(',')):	

			GM_setValue('analyzeOpponentTeamName', theTeam2 + "," + '');
			GM_setValue('analyzeOpponentBPRatings', '');
			GM_setValue('analyzeOpponentBatterCount', '');	
			GM_setValue('analyzeOpponentInjuryCount', '');	
			GM_setValue('analyzeOpponentOPS', '');	
			GM_setValue('analyzeOpponentbalanceMeterAVG', '');
			GM_setValue('pitcherData', '');			
			location.href = thisURL;

					
		break;

		case b.substring(0,b.indexOf(',')):	

			GM_setValue('analyzeOpponentTeamNameb', theTeam2 + "," + '');
			GM_setValue('analyzeOpponentBPRatingsb', '');
			GM_setValue('analyzeOpponentBatterCountb', '');	
			GM_setValue('analyzeOpponentInjuryCountb', '');	
			GM_setValue('analyzeOpponentOPSb', '');	
			GM_setValue('analyzeOpponentbalanceMeterAVGb', '');
			GM_setValue('pitcherDatab', '');			
			location.href = thisURL;

					
		break;		

		case c.substring(0,c.indexOf(',')):	

			GM_setValue('analyzeOpponentTeamNamec', theTeam2 + "," + '');
			GM_setValue('analyzeOpponentBPRatingsc', '');
			GM_setValue('analyzeOpponentBatterCountc', '');	
			GM_setValue('analyzeOpponentInjuryCountc', '');	
			GM_setValue('analyzeOpponentOPSc', '');	
			GM_setValue('analyzeOpponentbalanceMeterAVGc', '');
			GM_setValue('pitcherDatac', '');			
			location.href = thisURL;
					
		break;

		case d.substring(0,d.indexOf(',')):	

			GM_setValue('analyzeOpponentTeamNamed', theTeam2 + "," + '');
			GM_setValue('analyzeOpponentBPRatingsd', '');
			GM_setValue('analyzeOpponentBatterCountd', '');	
			GM_setValue('analyzeOpponentInjuryCountd', '');	
			GM_setValue('analyzeOpponentOPSd', '');	
			GM_setValue('analyzeOpponentbalanceMeterAVGd', '');
			GM_setValue('pitcherDatad', '');			
			location.href = thisURL;
					
		break;		

		case e.substring(0,e.indexOf(',')):	

			GM_setValue('analyzeOpponentTeamNamee', theTeam2 + "," + '');
			GM_setValue('analyzeOpponentBPRatingse', '');
			GM_setValue('analyzeOpponentBatterCounte', '');	
			GM_setValue('analyzeOpponentInjuryCounte', '');	
			GM_setValue('analyzeOpponentOPSe', '');	
			GM_setValue('analyzeOpponentbalanceMeterAVGe', '');
			GM_setValue('pitcherDatae', '');			
			location.href = thisURL;
					
		break;		

	}
}

	if(event.target.text == 'help'){

		
		//document.body.appendChild(box);
		//injuryReportLocation.parentNode.insertBefore(box,injuryReportLocation);

		if(helpToggle == false){

			myHelp.innerHTML= '<tr><td class="text10" align="right"><a class="helplink" id="bunting" style="cursor: pointer;">help</a></td></tr><tr><td class="text10" ><div id="center_div" style="border:2px solid #0083C1; background:#EEEEFF; color:#000; padding:2px; -moz-border-radius:4px; -moz-appearance:none;"><b>Probable LHBs/RHBs in lineup</b> -- Determined by combination of the number of at bats and player\'s salary.<br><br><b>Injuries</b> -- Number of injured players.<br><br><b>OPS vs L/R</b> -- Sum of opponent\'s OBP and SLG on splits page.<br><br><b>AVG Hitter balance</b>-- Average balance of the 9 batters expected to be in the starting lineup.<br><br><b>Prorated Hitter balance</b> -- Average balance (based on salary) of the 9 batters expected to be in the starting lineup.</div></td></tr><br>';	
		

			helpToggle = true;


		}
		else
		{

			myHelp.innerHTML= '<tr><td class="text10" align="right"><a class="helplink" id="bunting" style="cursor: pointer;">help</a></td></tr><tr><td class="text10" align="right"></td></tr><br>';	
			helpToggle = false;			

		}

	}

    }, true);

if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){  

	var injuryReportLocation = document.evaluate("//span/center",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	injuryReportLocation = injuryReportLocation.snapshotItem(0);

	var myElement = document.createElement("baseballsimulator");
	myElement.id='bsim';

// Create box with certain style
var box = document.createElement('div');
	box.id = 'center_div';
	box.textContent = 'This is the center box.';
	box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/2+'px; left:'+window.innerWidth/2+'px; border:2px solid #0083C1; background:#D7F2FF; color:#000; padding:20px; -moz-border-radius:4px; -moz-appearance:none;');	


	var myHelp = document.createElement("table");
	myHelp.id = 'help';
	myHelp.width = '100%';
	myHelp.border = '0';	
	myHelp.setAttribute('cellpadding','0');	
	myHelp.setAttribute('cellspacing','1');	
	myHelp.setAttribute('align','center');	

	myHelp.innerHTML= '<tr><td class="text10" align="right"><a class="helplink" id="bunting" style="cursor: pointer;">help</a></td></tr><tr><td class="text10" align="right"></td></tr>';


	myElement.innerHTML = '<table class="datatab_nowidth" width="100%" border="0" cellpadding=0 cellspacing=1 border=0 align="center"><tr class="databox_header black"><td colspan="2" align="center"><b>Next Opponent</b></td></tr><TR class="odd"><td class="text10" align="left" width="60%">Probable LHBs in lineup</a></td><td class="text10" align="center">' + leftbatterCount2 + '</td></TR><TR class="even"><td class="text10" align="left" width="60%">Probable RHBs in lineup</a></td><td class="text10" align="center">' + rightbatterCount2 + '</td></TR><TR class="odd"><td class="text10" align="left" width="60%">Injuries</a></td><td class="text10" align="center">' + injuryCount + '</td></TR><TR class="even"><td class="text10" align="left">OPS vs L</a></td><td class="text10" align="center">' + opsArray2[1] + '</td></TR><TR class="odd"><td class="text10" align="left" width="60%">OPS vs R</a></td><td class="text10" align="center">' + opsArray2[2]  + '</td></TR><TR class="even"><td class="text10" align="left" width="60%">AVG Hitter balance</a></td><td class="text10" align="center">' + avgBalance + '</td></TR><TR class="odd"><td class="text10" align="left" width="60%">Prorated Hitter balance</a></td><td class="text10" align="center">' + proratedBalance + '</td></TR></table>';

	//if(theTeam == opponentsTeamName && a!= ''){
	
	if(analyzeNextOpponentFlag == false){


		injuryReportLocation.parentNode.insertBefore(myElement,injuryReportLocation);
		injuryReportLocation.parentNode.insertBefore(myHelp,injuryReportLocation);		
	}

}//if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

//insertLinkBefore('bsim');

function insertLinkBefore(id) {
   var e = document.getElementById(id);
   var newlink = document.createElement('a');
   var newlinktext = document.createTextNode('Show/Hide DIV');
   newlink.appendChild(newlinktext);
   newlink.setAttribute('href', '#');
   newlink.addEventListener('click', function () {
         toggle_visibility(id);
      }, false);
   e.parentNode.insertBefore(newlink, e);
}

function toggle_visibility(id) {
       var e = document.getElementById(id);
       if(window.getComputedStyle(e, null).getPropertyValue('display') == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
}



////////////////////////////////////////////	
//Example: San Francisco SI 13/13 HR 7/7 

if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

var ballParkLinks = document.evaluate("//td/a[contains(@href,'ballpark.html?bp=')]/@href",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

var j = 0;


	ballParkLink = ballParkLinks.snapshotItem(0);
	ballParkLink = ballParkLink.nodeValue;
	ballParkLinkURL = ballParkLink.substring(ballParkLink.indexOf('javascript:SNOpenWindow(') + 25,ballParkLink.indexOf('_blank') - 4);
	ballParkLinkURL = "http://fantasygames.sportingnews.com" + ballParkLinkURL;
	 j = 1+i;


      GM_xmlhttpRequest({
      method: 'GET',
      url: ballParkLinkURL,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function3.bind( {}, i, j )
  });	 

      }//if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

function callback_function3(parameter1, parameter2, responseDetails)
{

	ballParkSource = responseDetails.responseText;

	var pattern = /<td width="25%" >/g;		
	var result
	var count1 = -1;		
	while((result = pattern.exec(ballParkSource)) != null){

		//switchies = righties.substring(result.index,righties.indexOf('TOTAL',result.index)+25);
		count1++;
		bp[count1] = ballParkSource.substring(result.index + 17, result.index + 21)
		bp[count1] = bp[count1].replace('<','');
		bp[count1] = bp[count1].replace('1-','');
	
			
	}	

	var a = GM_getValue("analyzeOpponentBPRatings",'');

	if(a.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentBPRatings',   theTeam2 + "|" + bp.join("|"));

	}	

	var b = GM_getValue("analyzeOpponentBPRatingsb",'');

	if(b.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentBPRatingsb',   theTeam2 + "|" + bp.join("|"));

	}	

	var c = GM_getValue("analyzeOpponentBPRatingsc",'');

	if(c.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentBPRatingsc',   theTeam2 + "|" + bp.join("|"));

	}	

	var d = GM_getValue("analyzeOpponentBPRatingsd",'');

	if(d.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentBPRatingsd',   theTeam2 + "|" + bp.join("|"));

	}	

	var e = GM_getValue("analyzeOpponentBPRatingse",'');

	if(e.indexOf(theTeam2) != -1){

		GM_setValue('analyzeOpponentBPRatingse',   theTeam2 + "|" + bp.join("|"));

	}

	if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

		

			if(a == ''){

				GM_setValue('analyzeOpponentBPRatings', theTeam2 + "|" + bp.join("|"));
			}
			else if(b == ''){
				GM_setValue('analyzeOpponentBPRatingsb', theTeam2 + "|" + bp.join("|"));
			}
			else if(c == ''){
				GM_setValue('analyzeOpponentBPRatingsc', theTeam2 + "|" + bp.join("|"));
			}
			else if(d == ''){
				GM_setValue('analyzeOpponentBPRatingsd', theTeam2 + "|" + bp.join("|"));
			}
			else if(e == ''){
				GM_setValue('analyzeOpponentBPRatingse', theTeam2 + "|" + bp.join("|"));
			}		

	}	


}


	var a = GM_getValue("analyzeOpponentBPRatings",'');

	if(a.indexOf(theTeam2) != -1){

		if (a != '') bp2 = a.split("|");

	}

	var b = GM_getValue("analyzeOpponentBPRatingsb",'');

	if(b.indexOf(theTeam2) != -1){

		if (b != '') bp2 = b.split("|");

	}

	var c = GM_getValue("analyzeOpponentBPRatingsc",'');

	if(c.indexOf(theTeam2) != -1){

		if (c != '') bp2 = c.split("|");

	}

	var d = GM_getValue("analyzeOpponentBPRatingsd",'');

	if(d.indexOf(theTeam2) != -1){

		if (d != '') bp2 = d.split("|");

	}

	var e = GM_getValue("analyzeOpponentBPRatingse",'');

	if(e.indexOf(theTeam2) != -1){

		if (e != '') bp2 = e.split("|");

	}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	if (a != '') bp2 = a.split("|");

}

if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

var ballParkLinks2 = document.evaluate("//td/a[contains(@href,'ballpark.html?bp=')]",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

		/*
		newCell2 = document.createElement("text");

		for (var j = 0; j < bp2.length;j++)

		{
	

			newCell2.innerHTML += bp2[j];

		}
		*/
		


	for (var ii=0;ii < ballParkLinks2.snapshotLength;ii++)
	{

		newCell2 = document.createElement("text");
/*
		for (var j = 0; j < bp2.length;j++)

		{
	

			newCell2.innerHTML += bp2[j];

		}
		*/
		//Example: San Francisco SI 13/13 HR 7/7 		

		newCell2.innerHTML = '<BR><font color="red"> si ' + bp2[1] + '/' + bp2[2] + ' hr ' + bp2[3] + '/' + bp2[4] + '</font>';

		ballParkLink2 = ballParkLinks2.snapshotItem(ii);

		//if(a !=''){
		if(analyzeNextOpponentFlag == false){

			ballParkLink2.parentNode.insertBefore(newCell2,ballParkLink2.nextSibling);

		}
	
		
	}

//Get owner's team name

//table[@class='datatab_nowidth']/td[@class='yellow tleft']/b/text()



var ownersTeamNames = document.evaluate("//td[@class='yellow tleft']/b/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

ownersTeamName = ownersTeamNames.snapshotItem(0);
ownersTeamName = ownersTeamName.nodeValue;

//Set owner team cells to yellow

var colSpans = document.getElementsByTagName('TD');
for (var i = 0; i < colSpans.length; i++) {
  var colSpan = colSpans[i];
  	var name = colSpan.textContent;
	var theClass = colSpan.getAttribute('class');

	name = name.substring(0,name.indexOf('('));
	name = name.trim();


		if(name==ownersTeamName){

		  	colSpan.setAttribute('class', 'yellow');

			if(colSpans.length > '181'){

				colSpans[i+1].setAttribute('class', 'yellow');
			}
		}
}

}//if (thisURL == 'http://fantasygames.sportingnews.com/stratomatic/home_good.html'){

///added 7/20/2011
function callback_function4(parameter1, parameter2, responseDetails)
{

var theOpponent = responseDetails.responseText;



}



