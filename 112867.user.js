// ==UserScript==
// @name           Search Box Scores
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/league/team_schedule.html*
// ==/UserScript==

//TODO:
//Pinch hit situations (ie. SUBSTITUTE PH- Reggie Jefferson)
//Caught Stealing 
//

var responseTextArray = new Array();
var responseTextArrayIBB = new Array();
var responseTextArraySacBunt = new Array();
var responseTextArraySQZ = new Array();
var responseTextArrayHANDR = new Array();
var responseTextArrayPickoff = new Array();
var responseTextArrayDP = new Array();
var responseTextArrayGIDP = new Array();
var responseTextArrayBPHR = new Array();
var responseTextArrayBPSI = new Array();
var responseTextArrayPH = new Array();
var responseTextArrayCS = new Array();

var responseTextArray2 = new Array();

var boxscoreData;
var patternString;
var myCount = 0;
var theInjury;
var theIntWalk;
var theSacBunt;
var theSqueeze;
var theHANDR;
var thepickoff;
var theDP;
var theGIDP;
var theBPHR;
var theBPSI;
var thePH;
var theCS;
var result;
var injuryLine = '';
var intWalkLine='';
var sacBuntLine='';
var squeezeLine='';
var handrLine='';
var pickoffLine='';
var dpLine='';
var gidpLine='';
var bphrLine='';
var bpsiLine='';
var phLine='';
var csLine='';
var recapDescriptionCount = -1;

var thisURL = document.URL;

var theTeams = document.evaluate("//div[@class='text11']/text()[2]|//div[@class='text11']/text()[4]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theTeam;
var theTeam2=''
var playerSet;


for (var i = 0; i < theTeams.snapshotLength; i++) {

	theTeam = theTeams.snapshotItem(i);

	if(i==1)
	{
		playerSet = theTeam.nodeValue;
		playerSet = trim(playerSet);

	}
	else
	{
		theTeam = theTeam.nodeValue;
		theTeam = trim(theTeam);
	}

	

	if(i + 1 == theTeams.snapshotLength){
		
		theTeam2 += theTeam;
	}
	else
	{
		
		theTeam2 += theTeam + "-";
	}



}


	var ButtonLocation = document.evaluate("//table[@class='datatab_nowidth cleft']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	ButtonLocation =  ButtonLocation.snapshotItem(0)

	var newButton = document.createElement('table');
	newButton.class = 'datatab_nowidth cleft';
	newButton.width = '95%';
	newButton.align = 'center';
	newButton.cellspacing = '1';
	newButton.cellpadding = '2';
	newButton.border = '0';

	//newButton.innerHTML = '<tr><td align="center">'+ '<input class="text12" id="injury" type="button" value="View Injuries" /></td><td align="center">'+ '<input class="text12" id="ibb" type="button" value="View IBB" /></td></tr>';
	

	if(playerSet == 'Back to the \'90s'){

		newButton.innerHTML = '<tr><td align="center" class="text11">Search: '+
	'<select class="text11" name="search">'+
	'<option value="slot1">------</option>'+
	'<option id="injury" value="INJURY:" id="injury">INJURY:</option>'+
	'<option id="ibb" value="Int Walk">Int Walk</option>'+
	'<option id="sac" value="Sac Bunt">Sac Bunt</option>'+
	'<option id="sqz" value="sqz">sqz</option>'+
	'<option id="pickoff" value="Pickoff">Pickoff</option>'+
	'<option id="gidp" value="gidp">GIDP</option>'+	
	'<option id="dp" value="Double Play">Other Double Plays</option>'+	
	'<option id="ph" value="ph">SUBSTITUTE PH</option>'+	
	'<option id="cs" value="cs">Caught Stealing</option>'+	
	'<option disabled="disabled" id="handr" value="h&r">h&r</option>'+	
	'<option disabled="disabled" id="bphr" value="bpHR">bpHR Chances</option>'+
	'<option disabled="disabled" id="bpsi" value="bpSI">bpSI Chances</option>'+	
	'</select></td></tr>';

	}
	else
	{

	newButton.innerHTML = '<tr><td align="center" class="text11">Search: '+
	'<select class="text11" name="search">'+
	'<option value="slot1">------</option>'+
	'<option id="injury" value="INJURY:" id="injury">INJURY:</option>'+
	'<option id="ibb" value="Int Walk">Int Walk</option>'+
	'<option id="sac" value="Sac Bunt">Sac Bunt</option>'+
	'<option id="sqz" value="sqz">sqz</option>'+
	'<option id="pickoff" value="Pickoff">Pickoff</option>'+
	'<option id="gidp" value="gidp">GIDP</option>'+	
	'<option id="dp" value="Double Play">Other Double Plays</option>'+
	'<option id="ph" value="ph">SUBSTITUTE PH</option>'+	
	'<option id="cs" value="cs">Caught Stealing</option>'+	
	'<option id="handr" value="h&r">h&r</option>'+		
	'<option id="bphr" value="bpHR">bpHR Chances</option>'+	
	'<option id="bpsi" value="bpSI">bpSI Chances</option>'+	
	'</select></td></tr>';
	}


	
	//newButton.innerHTML = '<tr><td align="center">'+ '<input class="text12" id="injury" type="button" value="View Injuries2" /></td></tr>';


	ButtonLocation.parentNode.insertBefore(newButton, ButtonLocation);

function callback_function(parameter1, parameter2, responseDetails)
{


	boxscoreData = responseDetails.responseText;

	var gameNumber = boxscoreData.substring(boxscoreData.indexOf('Game '),boxscoreData.indexOf('Game ') + 17);

	patternString = 'INJURY:';
	//patternString = 'Int Walk';
	//patternString = 'D.Brocail';
	

	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;



			theInjury = boxscoreData.substring(result.index + 7,boxscoreData.indexOf('\n',result.index + 7));
			theInjury = theInjury.substring(0,theInjury.indexOf(')') + 1);

			if(myCount > 1){

				injuryLine += ',' + theInjury ;
			}
			else
			{
				injuryLine = theInjury;

			}
	}

	myCount = 0;

	patternString = 'Int Walk';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;



			theIntWalk = boxscoreData.substring(result.index - 25,result.index - 5);

			if(myCount > 1){

				intWalkLine += ',' + theIntWalk ;
			}
			else
			{
				intWalkLine = theIntWalk;

			}
	}

	myCount = 0;

	
	patternString = 'Sac Bunt';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			theSacBunt = boxscoreData.substring(result.index - 25,result.index - 5);

			if(myCount > 1){

				sacBuntLine += ',' + theSacBunt ;
			}
			else
			{
				sacBuntLine = theSacBunt;

			}
	}	

	
	myCount = 0;

	patternString = 'sqz';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			theSqueeze = boxscoreData.substring(result.index - 20,result.index);

			if(myCount > 1){

				squeezeLine += ',' + theSqueeze ;
			}
			else
			{
				squeezeLine = theSqueeze;

			}
	}	

	myCount = 0;

	patternString = 'h&r';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			theHANDR = boxscoreData.substring(result.index - 20,result.index);

			if(myCount > 1){

				handrLine += ',' + theHANDR;
			}
			else
			{
				handrLine = theHANDR;

			}
	}	

	myCount = 0;

	patternString = 'Pickoff';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			thePickoff = 'Pickoff';


			if(myCount > 1){

				pickoffLine = thePickoff + ' (' + myCount + ')';
			}
			else
			{
				pickoffLine = thePickoff;

			}
	}

	myCount = 0;

	patternString = 'Double Play';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	


			theDP = boxscoreData.substring(result.index - 16,result.index + 11);

			if(theDP.indexOf('Ground Out') == -1){

				if(theDP.indexOf('1B') != -1){

					theDP = theDP.replace('1B', 'firstbase');
					theDP = theDP.replace(/[0-9]/g, '');
					theDP = theDP.replace('firstbase', '1B');

				}
				else if(theDP.indexOf('2B') != -1){

					theDP = theDP.replace('2B', 'secondbase');
					theDP = theDP.replace(/[0-9]/g, '');
					theDP = theDP.replace('secondbase', '2B');

				}				
				else if(theDP.indexOf('3B') != -1){

					theDP = theDP.replace('3B', 'thirdbase');
					theDP = theDP.replace(/[0-9]/g, '');
					theDP = theDP.replace('thirdbase', '3B');

				}
				else
				{

					theDP = theDP.replace(/[0-9]/g, '');
				}

				theDP = trim(theDP);

				myCount++;

				if(myCount > 1){

					dpLine = theDP + ' (' + myCount + ')';
				}
				else
				{
					dpLine = theDP;

				}				

			}
			else
			{

				theDP = theDP.replace(/\(([0-9][A-Z])\)|\(([A-Z][A-Z])\)|\(([A-Z])\)/g, '');
				theDP = theDP.replace(/[0-9]/g, '');
			

				theDP = trim(theDP);

				myCount++;

				if(myCount > 1){

					gidpLine = theDP + ' (' + myCount + ')';
				}
				else
				{
					gidpLine = theDP;

				}				

			}//if(theDP.indexOf('Ground Out') == -1){

	}

	myCount = 0;

	patternString = 'bpHR';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			theBPHR = boxscoreData.substring(result.index - 72,result.index - 52);
			theBPHR = trim(theBPHR);

			if(myCount > 1){

				bphrLine += ', ' + theBPHR;
			}
			else
			{
				bphrLine = theBPHR;

			}
	}	

	myCount = 0;

	patternString = 'bpSI';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			theBPSI = boxscoreData.substring(result.index - 72,result.index - 52);
			theBPSI = trim(theBPSI);

			if(myCount > 1){

				bpsiLine += ', ' + theBPSI;
			}
			else
			{
				bpsiLine = theBPSI;

			}
	}

	//exclude 'Explanation of Play-by-Play notation' matches
	bpsiLine = bpsiLine.replace(', A.Pujols, s the batter reached','');
	bpsiLine = bpsiLine.replace('A.Pujols, s the batter reached','');	

	myCount = 0;

	patternString = 'SUBSTITUTE PH-';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			thePH = boxscoreData.substring(result.index,boxscoreData.indexOf('\n',result.index + 14));
			

			if(myCount > 1){

				phLine += ', ' + thePH;
			}
			else
			{
				phLine = thePH;

			}
	}	

	myCount = 0;

	patternString = 'Caught Stealing';
	var pattern = new RegExp(patternString, "g");

	while((result = pattern.exec(boxscoreData)) != null){	

		myCount++;

			theCS = boxscoreData.substring(result.index,result.index + 15);

			if(myCount > 1){

				csLine =  theCS + ' (' + myCount + ')';
			}
			else
			{
				csLine = theCS;

			}
	}	





	responseTextArray[parameter1] = injuryLine;
	responseTextArrayIBB[parameter1] = intWalkLine;	
	responseTextArraySacBunt[parameter1] = sacBuntLine;
	responseTextArraySQZ[parameter1] = squeezeLine;	
	responseTextArrayHANDR[parameter1] = handrLine;		
	responseTextArrayPickoff[parameter1] = pickoffLine;
	responseTextArrayDP[parameter1] = dpLine;	
	responseTextArrayGIDP[parameter1] = gidpLine;	
	responseTextArrayBPHR[parameter1] = bphrLine;	
	responseTextArrayBPSI[parameter1] = bpsiLine;	
	responseTextArrayPH[parameter1] = phLine;	
	responseTextArrayCS[parameter1] = csLine;	

	GM_setValue("search_injuries", responseTextArray.join("|"));
	GM_setValue("search_ibb", responseTextArrayIBB.join("|"));
	GM_setValue("search_sac", responseTextArraySacBunt.join("|"));	
	GM_setValue("search_sqz", responseTextArraySQZ.join("|"));	
	GM_setValue("search_handr", responseTextArrayHANDR.join("|"));	
	GM_setValue("search_pickoff", responseTextArrayPickoff.join("|"));
	GM_setValue("search_dp", responseTextArrayDP.join("|"));	
	GM_setValue("search_gidp", responseTextArrayGIDP.join("|"));	
	GM_setValue("search_bphr", responseTextArrayBPHR.join("|"));	
	GM_setValue("search_bpsi", responseTextArrayBPSI.join("|"));
	GM_setValue("search_ph", responseTextArrayPH.join("|"));	
	GM_setValue("search_cs", responseTextArrayCS.join("|"));	

	injuryLine = '';
	intWalkLine = '';
	sacBuntLine = '';
	squeezeLine = '';
	handrLine = '';
	pickoffLine = '';
	dpLine = '';
	gidpLine = '';
	bphrLine = '';
	bpsiLine = '';
	phLine = '';
	csLine = '';
	myCount=0;


}

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}


	var boxscores = document.evaluate("//a/@href[contains(string(),'boxscore.html')]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var j = 0;

		for (var i = 0; i < boxscores.snapshotLength ; i++)
		{

			j = 1+i;

			boxscore =  boxscores.snapshotItem(i);
			
				

  				GM_xmlhttpRequest({
			      		method: 'GET',
 	     				url: boxscore.nodeValue,
      					headers: {
          					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          					'Accept': 'application/atom+xml,application/xml,text/xml',
      					},
      					onload:callback_function.bind( {}, i, j )
  					});			
		


		}


function startTime(){

		recapDescriptionCount = -1;

		var d = GM_getValue("search_injuries");
		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'Injury Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);


		var recapDescriptions = document.getElementsByTagName('td');

		

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}

		}

p2elems = document.getElementById('injury');
	
if(p2elems.id == 'injury'){

	p2elems.style.cursor = 'default';

}


document.body.style.cursor = "default";

}

function startTime2(){

		recapDescriptionCount = -1;

		var d = GM_getValue("search_ibb");

		responseTextArray2 = d.split("|");

		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'Int Walk Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);


		var recapDescriptions = document.getElementsByTagName('td');

		

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}

		}

p2elems = document.getElementById('ibb');
	
if(p2elems.id == 'ibb'){

	p2elems.style.cursor = 'default';

}


document.body.style.cursor = "default";

}

function startTimeSacBunt(){


		recapDescriptionCount = -1;

		var d = GM_getValue("search_sac");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'Sac Bunt Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);


		var recapDescriptions = document.getElementsByTagName('td');

		

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}

		}

p2elems = document.getElementById('sac');
	
if(p2elems.id == 'sac'){

	p2elems.style.cursor = 'default';

}


document.body.style.cursor = "default";

}

function startTimeSqueeze(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_sqz");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'sqz Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('sqz');
	
if(p2elems.id == 'sqz'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimeHANDR(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_handr");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'h&r Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('handr');
	
if(p2elems.id == 'handr'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimePickoff(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_pickoff");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'Pickoff Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('pickoff');
	
if(p2elems.id == 'pickoff'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimeDP(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_dp");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'Double Play Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('dp');
	
if(p2elems.id == 'dp'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimeGIDP(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_gidp");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'GIDP Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('gidp');
	
if(p2elems.id == 'gidp'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimeBPHR(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_bphr");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'bpHR Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('bphr');
	
if(p2elems.id == 'bphr'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimeBPSI(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_bpsi");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'bpSI Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('bpsi');
	
if(p2elems.id == 'bpsi'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimePH(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_ph");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'SUBSTITUTE PH Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('ph');
	
if(p2elems.id == 'ph'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

function startTimeCS(){

		recapDescriptionCount = -1;	

		var d = GM_getValue("search_cs");

		responseTextArray2 = d.split("|");


		var recapTitle = document.evaluate("//td[text()='Recap']|//td[@id='search']|//td[text()='Injury Report']",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		recapTitle =  recapTitle.snapshotItem(0);

		newRecap = document.createElement("td");
		newRecap.innerHTML = 'Caught Stealing Report';
		newRecap.setAttribute('id','search');

		recapTitle.parentNode.replaceChild(newRecap,recapTitle);

		var recapDescriptions = document.getElementsByTagName('td');

		for (var i = 0; i < recapDescriptions.length; i++) {
			var recapDescription = recapDescriptions[i];


				if (recapDescription.getAttribute('nowrap') != null && recapDescription.getAttribute('id') != 'labelCellnull' && recapDescription.getAttribute('width') != '100%' && recapDescription.getAttribute('class') != 'v10') {

					recapDescriptionCount ++;


					if (responseTextArray2[recapDescriptionCount].length > 63){

						recapDescription.textContent  = responseTextArray2[recapDescriptionCount].substring(0,60) + "...";
						recapDescription.setAttribute('title', responseTextArray2[recapDescriptionCount]);

					}
					else
					{
						recapDescription.textContent  = responseTextArray2[recapDescriptionCount];
						recapDescription.setAttribute('title', '');
					}

				}
		}

p2elems = document.getElementById('cs');
	
if(p2elems.id == 'cs'){

	p2elems.style.cursor = 'default';
}


document.body.style.cursor = "default";

}

var clickFlag = false;


document.addEventListener('click', function(event) {

	
	if (event.target.getAttribute('value') == "INJURY:" && clickFlag == false){

		
				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}
			

		document.body.style.cursor = "wait";
		//Set to 'default' because it's remains on 'wait' bewcause of the possible years script
		event.target.style.cursor = "default";
		tt=setTimeout(startTime,5000);
		//clickFlag = true;
	}

	
	if (event.target.getAttribute('value') == "Int Walk" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		
	
		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		//event.target.disabled = "disabled";

		tt=setTimeout(startTime2,5000);
		//clickFlag = true;
	}

	if (event.target.getAttribute('value') == "Sac Bunt" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeSacBunt,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "sqz" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeSqueeze,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "h&r" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeHANDR,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "Pickoff" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimePickoff,5000);
		//clickFlag = true;
	}

	if (event.target.getAttribute('value') == "Double Play" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeDP,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "gidp" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeGIDP,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "bpHR" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeBPHR,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "bpSI" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeBPSI,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "ph" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimePH,5000);
		//clickFlag = true;
	}	

	if (event.target.getAttribute('value') == "cs" && clickFlag == false){

				var saveToSlots = document.getElementsByTagName('select');

				blank = document.createElement("text");
				blank.innerHTML = ' <a href= "' + thisURL + '">' + 'Reset</a>';
			
				for (var i = 0; i < saveToSlots.length; i++) {
					var saveToSlot=saveToSlots[i];
					
					if (saveToSlot.getAttribute('name')){

						var matchSTS = saveToSlot.getAttribute('name').match('search');
						
						if(matchSTS)
						{
							//saveToSlot.setAttribute('disabled','disabled');
							//saveToSlot.parentNode.insertBefore(blank,saveToSlot.nextSibling);
													
						}
					}

				}		

		document.body.style.cursor = "wait";
		event.target.style.cursor = "wait";
		tt=setTimeout(startTimeCS,5000);
		//clickFlag = true;
	}	



}, true);


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
