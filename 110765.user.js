// ==UserScript==
// @name           Strat-O-Matic Dropped Players
// @namespace      baseballsimulator.com
// @description    Mark players that have been dropped during the season
// @include        http://fantasygames.sportingnews.com/stratomatic/trade/release_pickup_option.html*
// @include	   http://fantasygames.sportingnews.com/stratomatic/about/popup_research_h_categories.html
// @include	   http://fantasygames.sportingnews.com/stratomatic/about/popup_research_p_categories.html
// @include	   http://fantasygames.sportingnews.com/stratomatic/league/transactions.html
// @include	   http://fantasygames.sportingnews.com/stratomatic/league/player.html*
// @include	   http://fantasygames.sportingnews.com/stratomatic/about/popup_faq.html
// ==/UserScript==

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

var dpHideCheckboxes = GM_getValue('dpHideCheckboxes',  true);

var theLink;
var theLinkText;
var leftArray = new Array();
var rightArray = new Array();

var thisURL = document.URL;

var droppedColumn;
var dcElement;

var HIDDEN_DIV_ID = 'baseballsimulatorDiv';

var checked = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%04%03%00%00%00%7F%1C%D2%8E%00%00%000PLTE333%FF%CC%FF%DD%DD%DDfff%EE%EE%EE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00w_%5CJ%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%D2%DD~%FC%00%00%003IDAT%08%99c%10%04%01%06AcccA%06%E1%D0%D0PC%06%E1%20%25U%20%A9%C4%A0%04'%9D%94T%80%A4%8B%8B%8B!%83%20%03%03%10%83u%01%00%D4%7C%06%94%2F%D1Ae%00%00%00%00IEND%AEB%60%82";

var unchecked = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00%04gAMA%00%00%B1%8F%0B%FCa%05%00%00%004IDAT(Sc%FC%0F%04%0C%C4%00%90B%10HKK%C3%8Aa%F2%0C0E0%01t%1Ad%00%D8%D6a%A7%10%E4!ccc%AC%18%25xp%05%0D%B28%00o%8D%3C%07K%8Ay%A6%00%00%00%00IEND%AEB%60%82";

var theTeams = document.evaluate("//div[@class='text11']/text()[2]|//div[@class='text11']/text()[4]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var theTeam;
var theTeam2=''


for (var i = 0; i < theTeams.snapshotLength; i++) {

	theTeam = theTeams.snapshotItem(i);
	theTeam = theTeam.nodeValue;
	theTeam = trim(theTeam);


	if(i + 1 == theTeams.snapshotLength){
		
		theTeam2 += theTeam;
	}
	else
	{
		
		theTeam2 += theTeam + "-";
	}



}

if(theTeam2.indexOf(',')!=-1){

	theTeam2=theTeam2.replace(/,/g,'');

}


var droppedColumnID;

var droppedColumns = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < droppedColumns.snapshotLength; i++) {


	droppedColumn = droppedColumns.snapshotItem(i);

	droppedColumnID = droppedColumn.innerHTML;
	droppedColumnID = droppedColumnID.substring(droppedColumnID.indexOf('player_id=')+10,droppedColumnID.indexOf('&amp;'));


	dcElement = document.createElement("td");
	//dcElement.innerHTML = '<input type="checkbox">&nbsp;'
	dcElement.innerHTML = '<img src="' + checked + '" style="cursor: pointer;" id="'+droppedColumnID+'" title="Remove dropped player status" border="0">';

	if(dpHideCheckboxes == true){
		//droppedColumn.parentNode.insertBefore(dcElement,droppedColumn.folowingSibling);
	}

}

var droppedColumnNot;
var dcElementNot;

var droppedColumnsNot = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'added')]/following-sibling::td|//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'traded with')]/following-sibling::td|//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'Action')]/following-sibling::td",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < droppedColumnsNot.snapshotLength; i++) {


	droppedColumnNot = droppedColumnsNot.snapshotItem(i);

	dcElementNot = document.createElement("td");

	if(i==0){
		
		//dcElementNot.innerHTML = '&nbsp;'
		dcElementNot.innerHTML = ''

	}
	else
	{
		//dcElementNot.innerHTML = '&nbsp;'
		dcElementNot.innerHTML = ''			
	}

	if(dpHideCheckboxes == true){
		//droppedColumnNot.parentNode.insertBefore(dcElementNot,droppedColumnNot.folowingSibling);
	}

}


var theLinks = document.evaluate("//a[contains(@href,'player.html')]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var j = 0;

for (var i = 0; i < theLinks.snapshotLength; i++) {

	theLink = theLinks.snapshotItem(i);
	
	theLink = theLink.href;
	theLink = theLink.substring(theLink.indexOf('/'),theLink.indexOf(',%')-1);
	theLink = 'http://fantasygames.sportingnews.com' + theLink;
	
  j = 1+i;

  GM_xmlhttpRequest({
      method: 'GET',
      url: theLink,
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function.bind( {}, i, j )
  });  


}

var data;
var simStats;
var simAVG;
var simERA;
var position;
var userID;
var todaysDroppedPlayersArray = new Array();
var flag = false;
 

function callback_function(parameter1, parameter2, responseDetails)
{



	var leftBP = 0;
	var rightBP = 0;

	data = responseDetails.responseText;

	simStats = data.substring(data.indexOf('<td align="left" colspan="2"><b>TOTAL</b></td>')+45,data.indexOf('MLB Stats')-85);
	simStats = trim(simStats);
	position = (data.indexOf('WHIP'));
	userID = data.substring(data.indexOf('add_id=')+7,data.indexOf('&add_year'));

var a = GM_getValue("dpTodaysDroppedPlayers",'');

if(a.indexOf(theTeam2) != -1){

	myRetrievedGMValue = a;

}

var b = GM_getValue("dpTodaysDroppedPlayersb",'');

if(b.indexOf(theTeam2) != -1){

	myRetrievedGMValue = b;

}

var c = GM_getValue("dpTodaysDroppedPlayersc",'');

if(c.indexOf(theTeam2) != -1){

	myRetrievedGMValue = c;

}

var d = GM_getValue("dpTodaysDroppedPlayersd",'');

if(d.indexOf(theTeam2) != -1){

	myRetrievedGMValue = d;

}

var e = GM_getValue("dpTodaysDroppedPlayerse",'');

if(e.indexOf(theTeam2) != -1){

	myRetrievedGMValue = e;

}

if(myRetrievedGMValue == undefined){

	myRetrievedGMValue = '';

}	



	if(position != -1){

		if(simStats.indexOf('<b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>   0.0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>   0.00</b></td><td><b>  0.00</b></td><td colspan="2"></td>') == -1){


			simERA = simStats.substring(simStats.indexOf('.')+11);
			simERA = simERA.substring(simERA.indexOf('.')-2,simERA.indexOf('.')+3);

			//leftArray[parameter1] = 'yes';
			leftArray[parameter1] = simERA;
			

		}
		else
		{

			
			if (myRetrievedGMValue != null) todaysDroppedPlayersArray = myRetrievedGMValue.split(",");

			for (var i = 0; i < todaysDroppedPlayersArray.length; i++) {

				if(userID == todaysDroppedPlayersArray[i]){

					
					flag = true;

				}


			}

			if(flag == true){

				leftArray[parameter1] = 'DNP';
				flag = false;

			}
			else
			{

				leftArray[parameter1] = '';
			}
		}
	}
	else
	{

		if(simStats.indexOf('<b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>0</b></td><td><b>  .000</b></td><td><b>  .000</b></td><td><b>  .000</b></td><td><b>  .000</b></td><td colspan="2"></td>') == -1){


			simAVG = simStats.substring(simStats.indexOf('.'),simStats.indexOf('.')+4);

			//leftArray[parameter1] = 'yes';
			leftArray[parameter1] = simAVG;

		}
		else
		{

			
			if (myRetrievedGMValue != null) todaysDroppedPlayersArray = myRetrievedGMValue.split(",");

			for (var i = 0; i < todaysDroppedPlayersArray.length; i++) {

				if(userID == todaysDroppedPlayersArray[i]){

					
					flag = true;

				}


			}

			if(flag == true){

				leftArray[parameter1] = 'DNP';
				flag = false;

			}
			else
			{

				leftArray[parameter1] = '';
			}

			
		}



	}	

	
setTimeout( delay, 500); 

function delay(){	
	
var mylastColumn;
var lastColumn;
var priceColumn;
var colElement;
var colElement2;
var colElement3;

var lastColumns = document.evaluate("//tr[@class='odd' or @class='even']/td[contains(text(),'M')]|//td[contains(a/@href,'release_year')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var j = 0; j < lastColumns.snapshotLength; j++) {

	lastColumn = lastColumns.snapshotItem(j);

	colElement = document.createElement("td");
	colElement.innerHTML = leftArray[j];

	if (parameter1 + 1 == lastColumns.snapshotLength){

		if(colElement.innerHTML == 'undefined'){
			colElement.innerHTML = '?';
		}

		if (position == -1){

			lastColumn.parentNode.insertBefore(colElement,lastColumn.previousSibling.previousSibling.previousSibling.previousSibling);

		}
		else
		{

			lastColumn.parentNode.insertBefore(colElement,lastColumn.previousSibling.previousSibling);

		}

		
	}
}




var priceColumns = document.evaluate("//td[contains(a,'Price')]|//td[contains(a,'Buy For:')]|//td[contains(a,'Waivers:')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

priceColumn = priceColumns.snapshotItem(0);

colElement2 = document.createElement("td");
colElement2.innerHTML = 'SIM';

for (var j = 0; j < lastColumns.snapshotLength; j++) {

	if (parameter1 + 1 == lastColumns.snapshotLength){

		if (position == -1){
			
			priceColumn.parentNode.insertBefore(colElement2,priceColumn.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling);

		}
		else
		{

			priceColumn.parentNode.insertBefore(colElement2,priceColumn.previousSibling.previousSibling.previousSibling.previousSibling)

		}

		

	}
}

}//function delay



}


if(thisURL == 'http://fantasygames.sportingnews.com/stratomatic/about/popup_research_h_categories.html' || thisURL == 'http://fantasygames.sportingnews.com/stratomatic/about/popup_research_p_categories.html'){

	var category;
	var bElement;

	var categories = document.evaluate("//b[contains(text(),'SLG')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	category = categories.snapshotItem(0);

	bElement = document.createElement("text");
	bElement.innerHTML = '<b>SIM</b> - Simulated Batting Average (Generated by Greasemonkey script)<br>';	

	if(category==null){

		var categories = document.evaluate("//b[contains(text(),'WHIP')]",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		category = categories.snapshotItem(0);		

		bElement = document.createElement("text");
		bElement.innerHTML = '<b>SIM</b> - Simulated Earned Run Average (Generated by Greasemonkey script)<br>';


	}



	category.parentNode.insertBefore(bElement,category.previousSibling);

}

/*
if(thisURL.indexOf('http://fantasygames.sportingnews.com/stratomatic/league/player.html') != -1){

document.addEventListener('click', function(event) {


	if(event.target.text == 'Mark as dropped'){

		

	}

    }, true);

	var theLocation  = document.evaluate("//a[contains(string(),'Update your Strategy Settings')]|//a[contains(string(),'Offer a trade for this player')]|//a[contains(string(),'Free Agent - Pick up this player')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	theLocation = theLocation.snapshotItem(0);

	var newLink = document.createElement('a');

	var simStat;
	var simStats  = document.evaluate("//td[@align='left'][@colspan='2'][not(contains(string(),'TOTAL'))]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	if(simStats.snapshotLength == 0){

		newLink.innerHTML = '<br>-  <a href=' + thisURL + '>Mark as dropped</a>';
	}

	

	theLocation.parentNode.insertBefore(newLink,theLocation.nextSibling);


}
*/

if(thisURL == 'http://fantasygames.sportingnews.com/stratomatic/league/transactions.html'){

document.addEventListener('click', function(event) {

	switch(event.target.innerHTML)
	{

		case aa.substring(0,aa.indexOf(',')):	

			GM_setValue('dpTodaysDroppedPlayers',  '');
			location.href = thisURL;

					
		break;

		case bb.substring(0,bb.indexOf(',')):	

			GM_setValue('dpTodaysDroppedPlayersb',  '');
			location.href = thisURL;

					
		break;		

		case cc.substring(0,cc.indexOf(',')):	

			GM_setValue('dpTodaysDroppedPlayersc',  '');
			location.href = thisURL;
					
		break;

		case dd.substring(0,dd.indexOf(',')):	

			GM_setValue('dpTodaysDroppedPlayersd',  '');
			location.href = thisURL;
					
		break;		

		case ee.substring(0,ee.indexOf(',')):	

			GM_setValue('dpTodaysDroppedPlayerse',  '');
			location.href = thisURL;
					
		break;		




	}

	if(event.target.text == 'Hide Checkboxes'){

		GM_setValue('dpHideCheckboxes',  false);


	}

	if(event.target.text == 'Show Checkboxes'){

		GM_setValue('dpHideCheckboxes',  true);


	}


	if(event.target.getAttribute('title')=='Remove dropped player status'){

		//setTimeout( setUnChecked, 500); 
		event.target.setAttribute('src', unchecked);
		event.target.setAttribute('title', 'Mark as dropped');

		var theID = event.target.getAttribute('id');
/*
		var a = GM_getValue("dpChecked",'');

		if(a.indexOf(theTeam2) != -1){

			GM_setValue('dpChecked',  splitArray);

		}

		var b = GM_getValue("dpCheckedb",'');

		if(b.indexOf(theTeam2) != -1){

			GM_setValue('dpCheckedb',  splitArray);

		}

		var c = GM_getValue("dpCheckedc",'');

		if(c.indexOf(theTeam2) != -1){

			GM_setValue('dpCheckedc', splitArray);

		}

		var d = GM_getValue("dpCheckedd",'');

		if(d.indexOf(theTeam2) != -1){

			GM_setValue('dpCheckedd',  splitArray);

		}

		var e = GM_getValue("dpCheckede",'');

		if(e.indexOf(theTeam2) != -1){

			GM_setValue('dpCheckede',  splitArray);

		}		
*/		

	}
	else if(event.target.getAttribute('title')=='Mark as dropped'){

		//setTimeout( setChecked, 500); 
		event.target.setAttribute('src', checked);
		event.target.setAttribute('title', 'Remove dropped player status');		

		var theID = event.target.getAttribute('id');

	}



/*
function setUnChecked()
{

	event.target.setAttribute('src', unchecked);
	event.target.setAttribute('title', 'Mark as dropped');

}		

function setChecked()
{

	event.target.setAttribute('src', checked);
	event.target.setAttribute('title', 'Remove dropped player status');

}
*/

    }, true);

var waiverLink  = document.evaluate("//a[@href='/stratomatic/trade/waivers_results.html']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var waiverLink = waiverLink.snapshotItem(0);

var newLink = document.createElement('a');

var dpHideCheckboxes = GM_getValue('dpHideCheckboxes',  true);


if(dpHideCheckboxes == false){

	newLink.innerHTML = '<br><a href=' + thisURL + '>Show Checkboxes</a>';
}
else
{
	newLink.innerHTML = '<br><a href=' + thisURL + '>Hide Checkboxes</a>';
}

//waiverLink.parentNode.insertBefore(newLink,waiverLink.nextSibling);

var transactionsTitles  = document.evaluate("//table[@class='cleft']/tbody/tr/td[@class='text12']/span[contains(string(),'Transactions')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var transactionsTitle = transactionsTitles.snapshotItem(0);

var newButton = document.createElement('td');

var aa = GM_getValue("dpTodaysDroppedPlayers",'');
var bb = GM_getValue("dpTodaysDroppedPlayersb",'');
var cc = GM_getValue("dpTodaysDroppedPlayersc",'');
var dd = GM_getValue("dpTodaysDroppedPlayersd",'');
var ee = GM_getValue("dpTodaysDroppedPlayerse",'');

if(aa.indexOf(theTeam2) == -1 && bb.indexOf(theTeam2) == -1 && cc.indexOf(theTeam2) == -1 && dd.indexOf(theTeam2) == -1 && ee.indexOf(theTeam2) == -1){

	if(aa != '' && bb != '' && cc != '' && dd != '' && ee != ''){

			newButton.innerHTML = '<br>All team slots for GM script "Dropped Players" have been filled up.  Choose team from drop down below to overwrite.<br><br>'+
'Slots: <select class="text12" name="slots">'+
'<option value="slot1">------</option>'+
'<option value="'+aa.substring(0,aa.indexOf(','))+'">'+aa.substring(0,aa.indexOf(','))+'</option>'+
'<option value="'+bb.substring(0,bb.indexOf(','))+'">'+bb.substring(0,bb.indexOf(','))+'</option>'+
'<option value="'+cc.substring(0,cc.indexOf(','))+'">'+cc.substring(0,cc.indexOf(','))+'</option>'+
'<option value="'+dd.substring(0,dd.indexOf(','))+'">'+dd.substring(0,dd.indexOf(','))+'</option>'+
'<option value="'+ee.substring(0,ee.indexOf(','))+'">'+ee.substring(0,ee.indexOf(','))+'</option>'+
'</select>';		


	}
	else
	{
		newButton.innerHTML = '';
	}
}

transactionsTitle.parentNode.insertBefore(newButton, transactionsTitle.nextSibling);




var userID;
var userIDS = document.evaluate("//td/a[contains(@href,'?user_id')]/@href",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



userID = userIDS.snapshotItem(0);
userID = userID.nodeValue;
userID = userID.substring(userID.indexOf('user_id=')+8);


GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasygames.sportingnews.com/stratomatic/league/scores_date.html',
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


	

	

var weeks = document.evaluate("//span[@class='text12']/a",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var week = weeks.snapshotItem(0);


if(week.textContent == 1){

	var weekHref = week.getAttribute('href');
	var openingMonth = weekHref.substring(weekHref.indexOf('-')+1,weekHref.indexOf('-')+4);



switch(openingMonth)
	{
	case 'JAN':
		openingMonth = '01';
	break;
	case 'FEB':
		openingMonth = '02';
	break;
	case 'MAR':
		openingMonth = '03';
	break;
	case 'APR':
		openingMonth = '04';
	break;
	case 'MAY':
		openingMonth = '05';
	break;
	case 'JUN':
		openingMonth = '06';
	break;
	case 'JUL':
		openingMonth = '07';
	break;
	case 'AUG':
		openingMonth = '08';
	break;
	case 'SEP':
		openingMonth = '09';
	break;
	case 'OCT':
		openingMonth = '10';
	break;
	case 'NOV':
		openingMonth = '11';
	break;
	case 'DEC':
		openingMonth = '12';
	break;	

	}

	var openingDate = weekHref.substring(weekHref.indexOf('=')+1,weekHref.indexOf('-'));
	var openingDay = openingMonth + '/' + openingDate;

}
else
{	

	var weeks = document.evaluate("//td[@class='text10']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
	var week = weeks.snapshotItem(0);
	//var weekHref = week.getAttribute('href');
	

	//var openingMonth = weekHref.substring(weekHref.indexOf('-')+1,weekHref.indexOf('-')+4);
	var openingMonth = week.textContent.substring(3,5);

/*
switch(openingMonth)
	{
	case 'JAN':
		openingMonth = '01';
	break;
	case 'FEB':
		openingMonth = '02';
	break;
	case 'MAR':
		openingMonth = '03';
	break;
	case 'APR':
		openingMonth = '04';
	break;
	case 'MAY':
		openingMonth = '05';
	break;
	case 'JUN':
		openingMonth = '06';
	break;
	case 'JUL':
		openingMonth = '07';
	break;
	case 'AUG':
		openingMonth = '08';
	break;
	case 'SEP':
		openingMonth = '09';
	break;
	case 'OCT':
		openingMonth = '10';
	break;
	case 'NOV':
		openingMonth = '11';
	break;
	case 'DEC':
		openingMonth = '12';
	break;	

	}	
*/	
	//var openingDate = weekHref.substring(weekHref.indexOf('=')+1,weekHref.indexOf('-'));
	var openingDate = week.textContent.substring(week.textContent.indexOf('/')+1);
			
	var openingDay = openingMonth + '/' + openingDate;


}



var date2;
var month;
var day;
var href;
var todaysDroppedPlayers='';

var dates = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'/')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var droppedPlayers = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var droppedhref = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td/a/@href",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var d = new Date();
	var month = d.getMonth() + 1;

	month = month.toString();

	if(month.length == 1)
	{
		month = '0' + month;
	}	
	var day = d.getDate();

	day = day.toString();

	if(day.length == 1)
	{	
		day = '0' + day;
	}


	var theDate = month + "/" + day;

	
for (var i = 0; i < droppedPlayers.snapshotLength; i++) {


	droppedPlayer = droppedPlayers.snapshotItem(i);

	//if(href != null){
		href = droppedhref.snapshotItem(i);
		href=href.nodeValue;
	//}


	date2 = droppedPlayer.previousSibling.previousSibling.previousSibling;
	date2 = date2.textContent;
	month = date2.substring(0,date2.indexOf('/'));
	day = date2.substring(date2.indexOf('/')+1);


	if(parseFloat(month) >= parseFloat(openingMonth)){

		if(parseFloat(month) == parseFloat(openingMonth)){

			if(parseFloat(day) > parseFloat(openingDate)){

				if(href != null){
					href = href.substring(href.indexOf('player_id=')+10,href.indexOf('&year='));
					
					todaysDroppedPlayers = todaysDroppedPlayers + href + ',';
				}
				

			}		

		}
		else
		{

			
				if(href != null){
					href = href.substring(href.indexOf('player_id=')+10,href.indexOf('&year='));
					todaysDroppedPlayers = todaysDroppedPlayers + href + ',';
				}
			

		}


	}

		

}

var gmValueArray = new Array();
var droppedPlayersArray = new Array();
var droppedFlag = false;
var splitArray;
var myRetrievedGMValue;

todaysDroppedPlayers = todaysDroppedPlayers.substring(0,todaysDroppedPlayers.length-1);

droppedPlayersArray = todaysDroppedPlayers.split(",");

//var myRetrievedGMValue =  GM_getValue('dpTodaysDroppedPlayers','');

var a = GM_getValue("dpTodaysDroppedPlayers",'');

if(a.indexOf(theTeam2) != -1){

	myRetrievedGMValue = a;

}

var b = GM_getValue("dpTodaysDroppedPlayersb",'');

if(b.indexOf(theTeam2) != -1){

	myRetrievedGMValue = b;

}

var c = GM_getValue("dpTodaysDroppedPlayersc",'');

if(c.indexOf(theTeam2) != -1){

	myRetrievedGMValue = c;

}

var d = GM_getValue("dpTodaysDroppedPlayersd",'');

if(d.indexOf(theTeam2) != -1){

	myRetrievedGMValue = d;

}

var e = GM_getValue("dpTodaysDroppedPlayerse",'');

if(e.indexOf(theTeam2) != -1){

	myRetrievedGMValue = e;

}

if(myRetrievedGMValue == undefined){

	myRetrievedGMValue = '';

}


if (myRetrievedGMValue != '') gmValueArray = myRetrievedGMValue.split(",");


for (var j = 0; j < droppedPlayersArray.length; j++) {

	for (var i = 1; i < gmValueArray.length; i++) {

		if(droppedPlayersArray[j]==gmValueArray[i]){

			droppedFlag = true;
		}

	}

	if(droppedFlag == false){

		gmValueArray.push(droppedPlayersArray[j]);

	}
	else
	{
	
		droppedFlag = false;

			
	}

}


splitArray = gmValueArray.join(",");



//todaysDroppedPlayers = myRetrievedGMValue + todaysDroppedPlayers;

var a = GM_getValue("dpTodaysDroppedPlayers",'');

if(a.indexOf(theTeam2) != -1){

	GM_setValue('dpTodaysDroppedPlayers',  splitArray);


}

var b = GM_getValue("dpTodaysDroppedPlayersb",'');

if(b.indexOf(theTeam2) != -1){

	GM_setValue('dpTodaysDroppedPlayersb',  splitArray);

}

var c = GM_getValue("dpTodaysDroppedPlayersc",'');

if(c.indexOf(theTeam2) != -1){

	GM_setValue('dpTodaysDroppedPlayersc', splitArray);

}

var d = GM_getValue("dpTodaysDroppedPlayersd",'');

if(d.indexOf(theTeam2) != -1){

	GM_setValue('dpTodaysDroppedPlayersd',  splitArray);

}

var e = GM_getValue("dpTodaysDroppedPlayerse",'');

if(e.indexOf(theTeam2) != -1){

	GM_setValue('dpTodaysDroppedPlayerse',  splitArray);

}

if(a.indexOf(theTeam2) == -1 && b.indexOf(theTeam2) == -1 && c.indexOf(theTeam2) == -1 && d.indexOf(theTeam2) == -1 && e.indexOf(theTeam2) == -1){

	if(a == ''){

		GM_setValue('dpTodaysDroppedPlayers', theTeam2 + "," + splitArray);
	}
	else if(b == ''){
		GM_setValue('dpTodaysDroppedPlayersb', theTeam2 + "," + splitArray);
	}
	else if(c == ''){
		GM_setValue('dpTodaysDroppedPlayersc', theTeam2 + "," + splitArray);
	}
	else if(d == ''){
		GM_setValue('dpTodaysDroppedPlayersd', theTeam2 + "," + splitArray);
	}
	else if(e == ''){
		GM_setValue('dpTodaysDroppedPlayerse', theTeam2 + "," + splitArray);
	}	

}


/*
//if(gameIDS.snapshotLength > 0){

todaysDroppedPlayers='';	
var droppedPlayer;
var href;

var droppedPlayers = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var droppedhref = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td/a/@href",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	
for (var i = 0; i < droppedPlayers.snapshotLength; i++) {


	droppedPlayer = droppedPlayers.snapshotItem(i);
	href = droppedhref.snapshotItem(i);
	href=href.nodeValue;
	//date = droppedPlayer.previousSibling.previousSibling.previousSibling;
	//date = date.textContent;

	
		href = href.substring(href.indexOf('player_id=')+10,href.indexOf('&year='));
		todaysDroppedPlayers = todaysDroppedPlayers + href + ',';

		

}

todaysDroppedPlayers = todaysDroppedPlayers.substring(0,todaysDroppedPlayers.length-1);

GM_setValue('dpTodaysDroppedPlayers', todaysDroppedPlayers);


}//if(gameIDS.snapshotLength > 0){
*/
/*

	var d = new Date();
	var month = d.getMonth() + 1;

	month = month.toString();

	if(month.length == 1)
	{
		month = '0' + month;
	}	
	var day = d.getDate();

	day = day.toString();

	if(day.length == 1)
	{	
		day = '0' + day;
	}


	var theDate = month + "/" + day;	

var droppedPlayer;
var todaysDroppedPlayers='';

var date;
var href;

var dates = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'/')]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var droppedPlayers = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var droppedhref = document.evaluate("//table[@class='datatab_nowidth cleft tleft']/tbody/tr/td[contains(string(),'dropped')]/following-sibling::td/a/@href",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	
for (var i = 0; i < droppedPlayers.snapshotLength; i++) {


	droppedPlayer = droppedPlayers.snapshotItem(i);
	href = droppedhref.snapshotItem(i);
	href=href.nodeValue;
	date = droppedPlayer.previousSibling.previousSibling.previousSibling;
	date = date.textContent;

	
	if(date == theDate){

		href = href.substring(href.indexOf('player_id=')+10,href.indexOf('&year='));
		todaysDroppedPlayers = todaysDroppedPlayers + href + ',';

	}
		

}

todaysDroppedPlayers = todaysDroppedPlayers.substring(0,todaysDroppedPlayers.length-1);

GM_setValue('dpTodaysDroppedPlayers', todaysDroppedPlayers);


}

*/

        return document;
}

}






