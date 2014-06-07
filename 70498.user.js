// ==UserScript==
// @name           Card Chances Current Seasons (200x & ATG)
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/*
// @include        http://onlinegames.strat-o-matic.com/player/*
// @include        http://onlinegames.strat-o-matic.com/*
// @exclude	   http://fantasygames.sportingnews.com/stratomatic/trade/compose_message.html?compose=1
// ==/UserScript==

var thisURL = document.URL;

//Make player card windows larger
var pageAddr, a, href;
pageAddr = window.location.href;


var newLink;
var links2,links3;
var myLink;

var cardSet='';

function get_anchors(){
       var anchors = new Array();
       var elms = document.getElementsByTagName('a');
       for(var i=0; i<elms.length; i++){
	  
            if(elms[i].href) anchors.push(elms[i]);
       }
       return anchors;
    }

var allLinks, thisLink;
allLinks = get_anchors();


for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];

    if (thisLink.href.match(/width=740,%20height=650,%20/)) {
        		thisLink.href = thisLink.href.replace(/width=740,%20height=650,%20/, 'width=740,%20height=880,%20');
        	}

    if (thisLink.href.match(/650, 650/)) {
		thisLink.href = thisLink.href.replace(/650, 650/, '650, 880');
	}

    if (thisLink.href.match(/650, 550/)) {
		thisLink.href = thisLink.href.replace(/650, 550/, '650, 880');
	}

    //check to see what set the links are for
/*
    if (thisLink.href.match(/year=2008/)) {
		var cardSet = '2008';
	}    

    if (thisLink.href.match(/year=19/)) {
		var cardSet = 'ATG4';
	}   

	

   if (thisLink.href.match(/pool_id=201/)) {
		var cardSet = 'ATG4';
	}    
*/
  
 

}

var myLink = document.createElement("a");



if(thisURL.indexOf('http://onlinegames.strat-o-matic.com/team/') != -1){


	var theImage = document.evaluate("//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	theImage = theImage.snapshotItem(1);


			switch(theImage.src)
			{
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb60s-sm.gif':
					cardSet = '60s';
					break;

				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb90s-sm.gif':
					cardSet = '90s';
					break;
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2012-sm.gif':
					cardSet = '2012';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bbatg7-sm.gif':
					cardSet = 'ATG7';
					break;	
				//case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb80-sm.gif':
				//	myTitle = 'Back to the 80s';
				//	break;	
				//case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb70-sm.gif':
				//	myTitle = 'The \'70s Game';
				//	break;	
				//case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb1999-sm.gif':
				//	myTitle = 'Strato 1999';
				//	break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb1986-sm.gif':
					cardSet = '1986';
					break;	
				/*case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2011-sm.gif':
					myTitle = 'Strato 2011';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2010-sm.gif':
					myTitle = 'Strato 2010';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2009-sm.gif':
					myTitle = 'Strato 2009';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2008-sm.gif':
					myTitle = 'Strato 2008';
					break;		
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2007-sm.gif':
					myTitle = 'Strato 2007';
					break;	
				*/					

			}

	if(cardSet == ''){

		switch(theImage.title)
		{
			case 'Superstar Sixties':
				cardSet = '60s';
				break;		

			case 'Back to the \'90s':
				cardSet = '90s';
				break;	

			case 'Strato 2012':
				cardSet = '2012';
				break;

			case 'All-Time Greats VI':
				cardSet = 'ATG7';
				break;	

			case 'Strato 1986':
				cardSet = '1986';
				break;	

			default:
				cardSet = 'ATG7';				

		}


	}

		GM_setValue('myPool', cardSet);	


}

if(thisURL.indexOf('http://onlinegames.strat-o-matic.com/player/') != -1){

	cardSet = GM_getValue('myPool', 'ATG7'); 


}


if(thisURL.indexOf('http://onlinegames.strat-o-matic.com/league/') != -1){

	var leagueLinks, leagueLink2s;	

	var leagueLink = document.evaluate("//a[contains(@href,'player')]/@href", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 1; i < leagueLink.snapshotLength; i++) {
		leagueLinks = leagueLink.snapshotItem(i);
		leagueLinks = leagueLinks.nodeValue

		leagueLinks = leagueLinks.substring(leagueLinks.indexOf('/'),leagueLinks.lastIndexOf('/'));
		leagueLinks = leagueLinks.substring(leagueLinks.lastIndexOf('/')+1);
		

		switch(leagueLinks)
		{
			case '60':
				cardSet = '60s';
				break;	
			case '271':
				cardSet = 'ATG7';
				break;
			case '101':
				cardSet = '1986';
				break;	
			case '2012':
				cardSet = '2012';
				break;	
			case '90':
				cardSet = '90s';
				break;				

		}		
			

	}

	GM_setValue('myPool', cardSet);	

}

if(thisURL.indexOf('http://onlinegames.strat-o-matic.com/playerset/') != -1){


var thePlayerset = thisURL.substring(thisURL.lastIndexOf('/')+1);

		switch(thePlayerset)
		{
			case '60':
				cardSet = '60s';
				break;	
			case '271':
				cardSet = 'ATG7';
				break;
			case '272':
				cardSet = 'ATG7';
				break;	
			case '273':
				cardSet = 'ATG7';
				break;
			case '274':
				cardSet = 'ATG7';
				break;	
			case '275':
				cardSet = 'ATG7';
				break;				
			case '101':
				cardSet = '1986';
				break;	
			case '2012':
				cardSet = '2012';
				break;	
			case '3012':
				cardSet = '2012';
				break;				
			case '90':
				cardSet = '90s';
				break;				

		}


		GM_setValue('myPool', cardSet);	

}





var hbpVSLeft = new Array(10);
var hbpVSRight = new Array(10);
//var hbpOverall = new Array(10);
var walkVSLeft= new Array(10);
var walkVSRight= new Array(10);
//var walkOverall= new Array(10);
var strikeoutVSLeft= new Array(10);
var strikeoutVSRight= new Array(10);
//var strikeoutOverall= new Array(10);
var singleVSLeft= new Array(10);
var singleVSRight= new Array(10);
//var singleOverall= new Array(10);
var doubleVSLeft= new Array(10);
var doubleVSRight= new Array(10);
//var doubleOverall= new Array(10);
var tripleVSLeft= new Array(10);
var tripleVSRight= new Array(10);
//var tripleOverall= new Array(10);
var hrVSLeft= new Array(10);
var hrVSRight= new Array(10);
//var hrOverall= new Array(10);
var outVSLeft= new Array(10);
var outVSRight= new Array(10);
//var outOverall= new Array(10);
var gbdpVSLeft= new Array(10);
var gbdpVSRight= new Array(10);
//var gbdpOverall= new Array(10);
var clutchVSLeft= new Array(10);
var clutchVSRight= new Array(10);
//var clutchOverall= new Array(10);
var bpdiamondsVSLeft= new Array(10);
var bpdiamondsVSRight= new Array(10);
//var bpdiamondsOverall= new Array(10);
var bestresultsVSLeft= new Array(10);
var bestresultsVSRight= new Array(10);
//var bestresultsOverall= new Array(10);

var hbpOverall = new Array(10);
var walkOverall = new Array(10);
var strikeoutOverall= new Array(10);
var singleOverall = new Array(10);
var doubleOverall = new Array(10);
var tripleOverall = new Array(10);
var hrOverall= new Array(10);
var outOverall = new Array(10);
var gbdpOverall = new Array(10);
var clutchOverall = new Array(10);
var bpdiamondsOverall = new Array(10);
var bestresultsOverall= new Array(10);

for (var i = 0; i < 10; i++){

 hbpVSLeft[i] = 0;
 hbpVSRight[i] = 0;
// hbpOverall[i] = 0;
 walkVSLeft[i] = 0;
 walkVSRight[i]= 0;
 //walkOverall[i]= 0;
 strikeoutVSLeft[i]= 0;
 strikeoutVSRight[i]= 0;
// strikeoutOverall[i]= 0;
 singleVSLeft[i]= 0;
 singleVSRight[i]= 0;
// singleOverall[i]= 0;
 doubleVSLeft[i]= 0;
 doubleVSRight[i]= 0;
// doubleOverall[i]= 0;
 tripleVSLeft[i]= 0;
 tripleVSRight[i]= 0;
// tripleOverall[i]= 0;
 hrVSLeft[i]= 0;
 hrVSRight[i]= 0;
// hrOverall[i]= 0;
 outVSLeft[i]= 0;
 outVSRight[i]= 0;
// outOverall[i]= 0;
 gbdpVSLeft[i]= 0;
 gbdpVSRight[i]= 0;
// gbdpOverall[i]= 0;
 clutchVSLeft[i]= 0;
 clutchVSRight[i]= 0;
// clutchOverall[i]= 0;
 bpdiamondsVSLeft[i]= 0;
 bpdiamondsVSRight[i]= 0;
// bpdiamondsOverall[i]= 0;
 bestresultsVSLeft[i]= 0;
 bestresultsVSRight[i]= 0;
// bestresultsOverall[i]= 0;

hbpOverall[i] = 0;
walkOverall[i] = 0;
strikeoutOverall[i] = 0;
singleOverall[i] = 0;
doubleOverall[i] = 0;
tripleOverall[i] = 0;
hrOverall[i] = 0;
outOverall[i] = 0;
gbdpOverall[i] = 0;
clutchOverall[i] = 0;
bpdiamondsOverall[i] = 0;
bestresultsOverall[i] = 0;

}



var mybatsClick;
var cardVSLeftArray = new Array();
var fiveCardArray = new Array();
var cardVSLeftString;
var column1_2, column1_3, column2_2, column2_3, column3_2, column3_3;
var chances, chances2 = 0;
var myClick;
var lbpSingles, rbpSingles, lbpHomeruns, rbpHomeruns;
var lbpLineouts, rbpLineouts, lbpLineoutsTotal, rbpLineoutsTotal, lbpLineoutsTotal2 = 0,lbpLineoutsTotal2 = 0,rbpLineoutsTotal2 = 0,rbpLineoutsTotal2 = 0;
var myTest = 1,myTest2 = 0;

var hbpChances,walkChances, strikeoutChances, singleChances = 0, bpsiChances = 0, siChances = 0, doChances = 0, doubleChances = 0,tripleChances = 0,trChances = 0;
var hrChances = 0, homerunChances = 0, bphrChances = 0, gbdpChances = 0, clutchChances = 0, negativeclutchChances = 0;
var bpsiChancesTotal,lbpsiChancesTotal,rbpsiChancesTotal,bpsiChancesTotal2 = 0,lbpsiChancesTotal2 = 0,rbpsiChancesTotal2 = 0, singleChancesTotal, siChancesTotal,siChancesTotal2 = 0, doChancesTotal,doChancesTotal2 = 0, doubleChancesTotal, trChancesTotal, trChancesTotal2 = 0;
var hrChancesTotal,hrChancesTotal2 = 0, homerunChancesTotal, bphrChancesTotal,lbphrChancesTotal,rbphrChancesTotal, gbdpChancesTotal, clutchChancesTotal, negativeclutchChancesTotal;
var flyCChances = 0, lineoutChances = 0,lineoutChancesTotal, lineoutChancesTotal2 = 0, popoutChances = 0;

var color;
var color3x;
var color4x;
var clickFlag = false;



var position = document.evaluate("//tr/td[contains(string(),'throws')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
position = position.snapshotItem(0);
/*
if (position == null){

	//then he's not a pitcher
}
*/

var bat = document.evaluate("//tr/td[contains(string(),'bats: S')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
bat = bat.snapshotItem(0);
/*
if (bat == null){

	//then he's not a switch hitter.
}
*/

var isLeft = document.evaluate("//tr/td[contains(string(),'bats: L')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
isLeft = isLeft.snapshotItem(0);


var isRight = document.evaluate("//tr/td[contains(string(),'bats: R')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
isRight = isRight.snapshotItem(0);




myRefresh();

var numberOfCards;




function myRefresh(){

	
if(cardSet == '90s'|| cardSet == '60s'){

	numberOfCards = 10;
}
else
{

	numberOfCards = 2;
}

var cardIDArray = new Array();

	var cardID;
	var cardIDs = document.evaluate("//div[@class='card_image']/@id", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < cardIDs.snapshotLength; i++) {
		cardID = cardIDs.snapshotItem(i);
		cardIDArray[i] = cardID.nodeValue;

	}

for (var m = 0; m < numberOfCards; m++){


var m2 = m/2;



if (m2 == m2.toFixed()){

	var m3 = m2  +1;

}//if (m2 == m2.toFixed()){	


/*
if (m%2)
   {
   alert(m + " Number is Odd");
   }
else
   {
   alert(m + " Number is even");
   }
*/

var m2ForArray;


if(cardSet == '90s' || cardSet == '60s'){



	if (m%2){
		
		m2ForArray = m2.toFixed();
		m2ForArray = m2ForArray - 1;

		

		color4x = "id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/text()|id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/b/text()";//right

		color3x = "id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/text()|id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/b/text()";//right		

	}
	else
	{
	
		m2ForArray = m2;

		color4x = "id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/text()|id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/b/text()";//left

		color3x = "id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/text()|id('" + cardIDArray[m2ForArray] + "')//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/b/text()";//left		

	}	

}
else
{

	if (m%2){
	
		color4x = "//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/b/text()";//right

		color3x = "//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/b/text()";//right		
	}
	else
	{
	
		color4x = "//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/b/text()";//left

		color3x = "//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/b/text()";//left		

	}
}


hbpChances = 0;
walkChances = 0;
strikeoutChances = 0;
singleChances = 0;
bpsiChances = 0;
siChances = 0;
bpsiChancesTotal = 0;
bpsiChancesTotal2 = 0;
lbpsiChancesTotal = 0;
lbpsiChancesTotal2 = 0;
rbpsiChancesTotal = 0;
rbpsiChancesTotal2 = 0;
singleChancesTotal = 0;
siChancesTotal = 0;
siChancesTotal2 = 0;
doChances = 0;
doChancesTotal = 0;
doChancesTotal2 = 0;
doubleChancesTotal = 0;
doubleChances = 0;
tripleChances = 0;
trChances = 0;
trChancesTotal = 0;
trChancesTotal2 = 0;
hrChances = 0;
homerunChances = 0;
bphrChances = 0;
gbdpChances = 0;
clutchChances = 0;
negativeclutchChances = 0;
hrChancesTotal = 0;
hrChancesTotal2 = 0;
homerunChancesTotal = 0;
bphrChancesTotal = 0;
lbphrChancesTotal = 0;
rbphrChancesTotal = 0;
gbdpChancesTotal = 0;
clutchChancesTotal = 0;
negativeclutchChancesTotal = 0;
flyCChances = 0;
lineoutChances = 0;
lineoutChancesTotal = 0;
lineoutChancesTotal2 = 0;
popoutChances = 0;
lbpLineouts = 0;
lbpLineoutsTotal = 0;
lbpLineoutsTotal2 = 0;

for (i in cardVSLeftArray){

	cardVSLeftArray.length = 0

}



var cardVSLeft = document.evaluate(color3x, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if(cardVSLeft.snapshotLength == 0){

	cardVSLeft = document.evaluate(color4x, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

}


	for (var i = 0; i < cardVSLeft.snapshotLength; i++){
		var cardVSLeft2 = cardVSLeft.snapshotItem(i);
		cardVSLeft2 = cardVSLeft2.nodeValue;
		cardVSLeftArray[i] = cardVSLeft2;
	}



var column1_3_rt_arrow, column1_3_pound, column1_3_dollar;
cardVSLeftString = cardVSLeftArray.toString();

//Search for # and replace its result with "BPHR". 

var myBallParkHR;
var myBallParkHR2;
var BPHR_flag;
var BPSI_flag;

for (i in cardVSLeftArray){

	if (cardVSLeftArray[i].search(/#/) != -1){

		cardVSLeftArray[parseInt(i) + 1] = "BPHR";

	}
}


//Search for > and replace its result with "BPSI". 
var myBallParkSI;
var myBallParkSI2;

var pattern = />/g;
var result
while((result = pattern.exec(cardVSLeftString)) != null){
	
	myBallParkSI = cardVSLeftString.substring(result.index,cardVSLeftString.indexOf(",", result.index));
	myBallParkSI2 = cardVSLeftArray.indexOf(myBallParkSI);
	cardVSLeftArray[myBallParkSI2 + 1] = "BPSI";
}

//Search for all double play chances and replace the results with gbdp.
var myDP;
var myDP2;


var pattern = /\)A/g;
var result
while((result = pattern.exec(cardVSLeftString)) != null){
	
	myDP = cardVSLeftString.substring(result.index - 5,cardVSLeftString.indexOf(",", result.index));

	//This is used if it's the last result (ie. on 12).
	if (cardVSLeftString.indexOf(",", result.index) == -1){

		myDP = cardVSLeftString.substring(result.index - 5);

	}

	myDP = myDP.replace(",",""); //This is used when gb(p)A chances come up.
	myDP2 = cardVSLeftArray.indexOf(myDP);
	cardVSLeftArray[myDP2] = "gbdp";	
	
}


//Search for $ and replace its result with gbdp_clutch if its a gbdp result like what is found in Willie Aikens card.



for (i in cardVSLeftArray){
	
		if (cardVSLeftArray[i].search(/\$/) != -1){
	
			if (cardVSLeftArray[parseInt(i) + 1] == "gbdp"){

				cardVSLeftArray[parseInt(i) + 1] = "gbdp_clutch";
			}
			else if (cardVSLeftArray[parseInt(i) + 1].search(/SINGLE/) != -1){

				cardVSLeftArray[parseInt(i) + 1] = "SI_CLUTCH";

			}
			else if (cardVSLeftArray[parseInt(i) + 1].search(/strikeout/) != -1){

				cardVSLeftArray[parseInt(i) + 1] = "k_clutch";

			}
			else {
				cardVSLeftArray[parseInt(i) + 1] = "ou_clutch";

			}

		}
}

//Best Results

for (i in cardVSLeftArray){
	
		if (cardVSLeftArray[i].search(/f\)C/g) != -1){
	
			cardVSLeftArray[parseInt(i)] = "flyC";

		}
}

for (i in cardVSLeftArray){
	
		if (cardVSLeftArray[i].search(/popout\(/g) != -1){
	
			cardVSLeftArray[i] = "popout";

		}
}

//Search for all singles and replace its result with SINGLE.
var mySingle;
var mySingle2;
 

var pattern = /SINGLE/g;
var result
while((result = pattern.exec(cardVSLeftString)) != null){
	
	mySingle = cardVSLeftString.substring(result.index,cardVSLeftString.indexOf(",", result.index));
	mySingle2 = cardVSLeftArray.indexOf(mySingle);
	cardVSLeftArray[mySingle2] = "SINGLE";


}

//Search for all doubles and replace the results with DOUBLE.
var myDouble;
var myDouble2;
 


var pattern = /DOUBLE/g;
var result
while((result = pattern.exec(cardVSLeftString)) != null){
	
	myDouble = cardVSLeftString.substring(result.index,cardVSLeftString.indexOf(",", result.index));
	myDouble2 = cardVSLeftArray.indexOf(myDouble);
	cardVSLeftArray[myDouble2] = "DOUBLE";
}

//Search for all SI and replace the results with SI.
var mySI;
var mySI2;


var pattern = /SI/g;
var result
while((result = pattern.exec(cardVSLeftString)) != null){
	
	mySI = cardVSLeftString.substring(result.index,cardVSLeftString.indexOf(",", result.index));
	mySI2 = cardVSLeftArray.indexOf(mySI);
	cardVSLeftArray[mySI2] = "SI";
}


//Search for all "1-" splits and replace the results with the end result.
var my1Split;
var my1Split2;
var my1Split3;
var my1Split_index;
 
var pattern = /1-/g;
var result

while((result = pattern.exec(cardVSLeftString)) != null){
	
	my1Split = cardVSLeftString.substring(result.index,cardVSLeftString.indexOf(",", result.index));
	//if the result isn't the 1-12 dice number...
	if (my1Split != "1-"){
		my1Split_index = my1Split.indexOf("1-");
		my1Split_index = my1Split_index + 2;
		my1Split3 = my1Split.substr(my1Split_index);
		
	}
	my1Split2 = cardVSLeftArray.indexOf(my1Split);
	
	if (my1Split2 != -1){
		cardVSLeftArray[my1Split2] = my1Split3;
	}
}

//Search for all "-20" splits and replace the results with the beginning result.
var my20Split;
var my20Split2;
var my20Split3;
var my20Split_index;
 
var pattern = /-20/g;
var result

while((result = pattern.exec(cardVSLeftString)) != null){

	
	my20Split = cardVSLeftString.substring(cardVSLeftString.lastIndexOf(",", result.index) + 1,cardVSLeftString.indexOf(",", result.index));

	//Added in cases where the last result is a split.  See 1989 Aguayo card vs. Right:  17-20
	if (my20Split.length > 5){

		my20Split = cardVSLeftString.substring(cardVSLeftString.length - 5,cardVSLeftString.length);
		my20Split = my20Split.replace(",",""); //This is needed if the value is less than 5 like in Kirk Gibson's '85 card vs righties.

		
	}
	//See 1989 Aguayo card vs. Right
		
		my20Split_index = my20Split.indexOf("-20");

		my20Split3 = my20Split.substring(0,my20Split_index);
		my20Split3 = 20 - my20Split3;
		my20Split3 = my20Split3 +1;
		


	my20Split2 = cardVSLeftArray.indexOf(my20Split);
	
	if (my20Split2 != -1){
		cardVSLeftArray[my20Split2] = my20Split3;
	}
}




var cardVSLeftString = cardVSLeftArray.toString();

//Remove all characters so numbers can be read as numbers.
cardVSLeftString = cardVSLeftString.replace(/>/g," ");
cardVSLeftString = cardVSLeftString.replace(/#/g," ");
cardVSLeftString = cardVSLeftString.replace(/\$/g," ");
cardVSLeftString = cardVSLeftString.replace(/ @/g," ");
var cardVSLeftNewArray = cardVSLeftString.split(",");

//Find out which number correlates with which result.	

for (var i = 2; i < 13; i++){

	column1_2 = 0;
	column1_3 = 0;
	
	for (var j = 0; j < 3; j++){

		
			column1_2 = cardVSLeftNewArray.indexOf(" " + i + "-",column1_2 + j);
			
		
			if (i == 12){
				
				column1_3 = cardVSLeftNewArray.indexOf(" 2-", column1_2 + j)
				
				if (column1_3 == -1){

					column1_3 = cardVSLeftNewArray.length;


				}
				
			}
			else{

				column1_3 = cardVSLeftNewArray.indexOf(" " + (parseInt(i) + 1) + "-",column1_3 + j);
			}

			

		

			for (var k = column1_2 + 1; k < column1_3; k++){

				if (cardVSLeftNewArray[k] == "BPHR"){
					
					BPHR_flag = true;
					
				}
		
				if ((BPHR_flag == true) && (cardVSLeftNewArray[k] != "BPHR")){

					cardVSLeftNewArray[k] = "BPHR_ignore";
				
				}

				if (m3==1){
			
				}

				if (i < 8){

					chances = i - 1;

				}
				else if (i == 8){

					chances = 5;

				}
				else if (i == 9){

					chances = 4;

				}
				else if (i == 10){

					chances = 3;

				}
				else if (i == 11){

					chances = 2;
				}
				else if  (i == 12){

					chances = 1;
				}
				



				if (cardVSLeftNewArray[k]=="HBP"){


					hbpChances = hbpChances + chances;

				}

				if (hbpChances == undefined){

					hbpChances = 0;

				}

					
				if (cardVSLeftNewArray[k]=="WALK"){

					walkChances = walkChances + chances;
		
				}
				
				if (walkChances == undefined){

					walkChances = 0;

				}

				if ((cardVSLeftNewArray[k]=="strikeout")||(cardVSLeftNewArray[k]=="k_clutch")){

					strikeoutChances = strikeoutChances + chances;

				}
				
				if ((cardVSLeftNewArray[k]=="SINGLE")||(cardVSLeftNewArray[k]=="SI_CLUTCH")){

					singleChances = singleChances + chances;


				}


				if (cardVSLeftNewArray[k]=="BPSI"){
					
					
					bpsiChances = bpsiChances + chances;

					if (cardSet == '2012'){

						myClick = GM_getValue('ballpark2012playerset', "Angels Stadium '12");
						bpRatings(myClick);


						mybatsClick = GM_getValue('bats2012playerset', 'Left');	

					}
					else if (cardSet == 'ATG7')
					{

						myClick = GM_getValue('ballparkATG7playerset', "Ameriquest Field '05");
						
						bpRatings(myClick);


						mybatsClick = GM_getValue('batsATG7playerset', 'Left');	
					}	
					else if (cardSet == '90s')
					{

						myClick = GM_getValue('ballpark90splayerset', "Anaheim Stadium '90");
						
						bpRatings(myClick);


						mybatsClick = GM_getValue('bats90splayerset', 'Left');	
					}
					else if (cardSet == '60s')
					{

						myClick = GM_getValue('ballpark60splayerset', "Anaheim Stadium '67");
						
						bpRatings(myClick);


						mybatsClick = GM_getValue('bats90splayerset', 'Left');	
					}					

					if (mybatsClick == "Right"){

						isRight = mybatsClick;	

					}

					/*
					if (position == null){

					//then he's not a pitcher
					}
					*/				

					if (m%2){
					
						
						if ((isRight != null) && (position == null) && (bat == null)){//righty

							rbpsiChancesTotal = (rbpSingles/20) * bpsiChances;
		
							rbpLineouts = 20 - rbpSingles;
							rbpLineoutsTotal = (rbpLineouts/20) * chances;
							rbpLineoutsTotal2 = rbpLineoutsTotal2 + rbpLineoutsTotal;
						}
						else if ((isRight == null) && (position == null) && (bat == null))//lefty
						{
							rbpsiChancesTotal = (lbpSingles/20) * bpsiChances;

							rbpLineouts = 20 - lbpSingles;
							rbpLineoutsTotal = (lbpLineouts/20) * chances;
							rbpLineoutsTotal2 = rbpLineoutsTotal2 + rbpLineoutsTotal;
						}
						else if ((isRight == null) && (position == null) && (bat != null))//switchy
						{
							rbpsiChancesTotal = (lbpSingles/20) * bpsiChances;

							rbpLineouts = 20 - lbpSingles;
							rbpLineoutsTotal = (lbpLineouts/20) * chances;
							rbpLineoutsTotal2 = rbpLineoutsTotal2 + rbpLineoutsTotal;

						}
						else if (position != null)//pitcher
						{
							rbpsiChancesTotal = (rbpSingles/20) * bpsiChances;

							rbpLineouts = 20 - rbpSingles;
							rbpLineoutsTotal = (rbpLineouts/20) * chances;
							rbpLineoutsTotal2 = rbpLineoutsTotal2 + rbpLineoutsTotal;
						}
					
						
					}
					else
					{

						if ((isRight != null) && (position == null) && (bat == null)){//righty

							lbpsiChancesTotal = (rbpSingles/20) * bpsiChances;

							lbpLineouts = 20 - rbpSingles;
							lbpLineoutsTotal = (lbpLineouts/20) * chances;
							lbpLineoutsTotal2 = lbpLineoutsTotal2 + lbpLineoutsTotal;
						}
						else if ((isRight == null) && (position == null) && (bat == null))//lefty
						{
							lbpsiChancesTotal = (lbpSingles/20) * bpsiChances;

							lbpLineouts = 20 - lbpSingles;
							lbpLineoutsTotal = (lbpLineouts/20) * chances;
							lbpLineoutsTotal2 = lbpLineoutsTotal2 + lbpLineoutsTotal;
						}
						else if ((isRight == null) && (position == null) && (bat != null))//switchy
						{
							lbpsiChancesTotal = (rbpSingles/20) * bpsiChances;

							lbpLineouts = 20 - rbpSingles;
							lbpLineoutsTotal = (lbpLineouts/20) * chances;
							lbpLineoutsTotal2 = lbpLineoutsTotal2 + lbpLineoutsTotal;
						}
						else if (position != null)//pitcher
						{
							lbpsiChancesTotal = (lbpSingles/20) * bpsiChances;

							lbpLineouts = 20 - lbpSingles;
							lbpLineoutsTotal = (lbpLineouts/20) * chances;
							lbpLineoutsTotal2 = lbpLineoutsTotal2 + lbpLineoutsTotal;
						
						}
					

					}

				
		
				}

				

				if (cardVSLeftNewArray[k]=="SI"){

					
					siChances = siChances + chances;

					//This is needed for SI chances that don't have splits.  See Chris Bando '85 card vs left.
					if (isNaN(cardVSLeftNewArray[k+1])){
	
						siChancesTotal = chances;
					}
					else
					{
						siChancesTotal = (cardVSLeftNewArray[k+1]/20) * chances;
					}
					
					siChancesTotal2 = siChancesTotal2 + siChancesTotal;
					

				}

				if ((cardVSLeftNewArray[k]=="DO")||(cardVSLeftNewArray[k]=="DO**")){

					
					doChances = doChances + chances;
					doChancesTotal = (cardVSLeftNewArray[k+1]/20) * chances;
					doChancesTotal2 = doChancesTotal2 + doChancesTotal;
	
					
				}

				if (cardVSLeftNewArray[k]=="DOUBLE"){

					doubleChances = doubleChances + chances;
					
				}

				if (cardVSLeftNewArray[k]=="TR"){

					
					trChances = trChances + chances;
					trChancesTotal = (cardVSLeftNewArray[k+1]/20) * chances;
					trChancesTotal2 = trChancesTotal2 + trChancesTotal;
					
				}

				if (cardVSLeftNewArray[k]=="TRIPLE"){

					tripleChances = tripleChances + chances;
				}
				
				if (trChancesTotal == undefined){

					trChancesTotal = 0;

				}

				if (cardVSLeftNewArray[k]=="HR"){

					
					hrChances = hrChances + chances;
					hrChancesTotal = (cardVSLeftNewArray[k+1]/20) * chances;
					hrChancesTotal2 = hrChancesTotal2 + hrChancesTotal;
					
				}

				if (cardVSLeftNewArray[k]=="HOMERUN"){

					homerunChances = homerunChances + chances;
					
				}
				

				if (cardVSLeftNewArray[k]=="BPHR"){

					
					bphrChances = bphrChances + chances;

				

					if (cardSet == '2012'){

						myClick = GM_getValue('ballpark2012playerset', "Angels Stadium '12");
				
					}
					else if(cardSet == 'ATG7')
					{

						myClick = GM_getValue('ballparkATG7playerset', "Ameriquest Field '05");
					
					}	
					else if(cardSet == '90s')
					{

						myClick = GM_getValue('ballpark90splayerset', "Anaheim Stadium '90");
					
					}
					else if(cardSet == '60s')
					{

						myClick = GM_getValue('ballpark60splayerset', "Anaheim Stadium '67");
					
					}					

					bpRatings(myClick);

					

					if (m%2){
					
						if ((isRight != null) && (position == null) && (bat == null)){ //righty

							rbphrChancesTotal = (rbpHomeruns/20) * bphrChances;
						}
						else if ((isRight == null) && (position == null) && (bat == null)) //lefty
						{
				
							rbphrChancesTotal = (lbpHomeruns/20) * bphrChances

						}
						else if ((isRight == null) && (position == null) && (bat != null)) //switch hitter
						{
							rbphrChancesTotal = (lbpHomeruns/20) * bphrChances;
						
						}
						else if (position != null)//pitcher
						{
							rbphrChancesTotal = (rbpHomeruns/20) * bphrChances;
						}
					}
					else
					{
						
						if ((isRight != null) && (position == null) && (bat == null)){ //righty

							lbphrChancesTotal = (rbpHomeruns/20) * bphrChances;
						}
						else if ((isRight == null) && (position == null) && (bat == null))//lefty
						{
				
							lbphrChancesTotal = (lbpHomeruns/20) * bphrChances;

						}
						else if ((isRight == null) && (position == null) && (bat != null))//switch hitter
						{
							lbphrChancesTotal = (rbpHomeruns/20) * bphrChances;
							
						}									
						else if (position != null)//pitcher
						{
							lbphrChancesTotal = (lbpHomeruns/20) * bphrChances;
						}
						
					}
					
								
				}

				if ((cardVSLeftNewArray[k]=="gbdp")||(cardVSLeftNewArray[k]=="gbdp_clutch")){

					gbdpChances = gbdpChances + chances;
					
				}


				if ((cardVSLeftNewArray[k]=="gbdp_clutch")||(cardVSLeftNewArray[k]=="ou_clutch")||(cardVSLeftNewArray[k]=="k_clutch")){

					clutchChances = clutchChances + chances;
					
				}

				if (cardVSLeftNewArray[k]=="SI_CLUTCH"){

					negativeclutchChances = negativeclutchChances + chances;
		
					
				}

				if (cardVSLeftNewArray[k]=="flyC"){

					
					flyCChances = flyCChances + chances;
					
								
				}

				if (cardVSLeftNewArray[k]=="lineout"){

					lineoutChances = lineoutChances + chances;
					
					//This is needed for lineout chances that don't have splits.

					if (isNaN(cardVSLeftNewArray[k+1])){
	
						lineoutChancesTotal = chances;
					}
					else
					{
						lineoutChancesTotal = (cardVSLeftNewArray[k+1]/20) * chances;
					}
					
					lineoutChancesTotal2 = lineoutChancesTotal2 + lineoutChancesTotal;
								
				}

				if (cardVSLeftNewArray[k]=="popout"){

					
					popoutChances = popoutChances + chances;
					
								
				}
				
				
				
			}
			
			BPHR_flag = false;
			BPSI_flag = false;	

	}

} 


if (m%2){


hbpVSRight[m3] = hbpChances/108;
hbpVSRight[m3] = hbpVSRight[m3]*100;
hbpVSRight[m3] = hbpVSRight[m3].toFixed(2);


hbpOverall[m3] = hbpOverall[m3] + hbpChances;

walkVSRight[m3] = walkChances/108;
walkVSRight[m3] = walkVSRight[m3]*100;
walkVSRight[m3] = walkVSRight[m3].toFixed(2);

if (walkVSRight[m3].length > 4){

	walkVSRight[m3] = walkVSRight[m3].substr(0,4);
}

walkOverall[m3] = walkOverall[m3] + walkChances;

strikeoutVSRight[m3] = strikeoutChances/108;
strikeoutVSRight[m3] = strikeoutVSRight[m3]*100;
strikeoutVSRight[m3] = strikeoutVSRight[m3].toFixed(2);

if (strikeoutVSRight[m3].length > 4){

	strikeoutVSRight[m3] = strikeoutVSRight[m3].substr(0,4);					
}

strikeoutOverall[m3] = strikeoutOverall[m3] + strikeoutChances;

singleVSRight[m3] = singleChances + rbpsiChancesTotal + siChancesTotal2;
singleVSRight[m3] = singleVSRight[m3]/108;
singleVSRight[m3] = singleVSRight[m3]*100;
singleVSRight[m3] = singleVSRight[m3].toFixed(2);


if (singleVSRight[m3].length > 4){

	singleVSRight[m3] = singleVSRight[m3].substr(0,4);
}

singleOverall[m3] = singleOverall[m3] + singleChances + rbpsiChancesTotal + siChancesTotal2;


doubleVSRight[m3] = doChancesTotal2 + doubleChances;
doubleVSRight[m3] = doubleVSRight[m3]/108;
doubleVSRight[m3] = doubleVSRight[m3]*100;
doubleVSRight[m3] = doubleVSRight[m3].toFixed(2);

if (doubleVSRight[m3].length > 4){

	doubleVSRight[m3] = doubleVSRight[m3].substr(0,4);
}

doubleOverall[m3] = doubleOverall[m3] + doChancesTotal2 + doubleChances;

tripleVSRight[m3] = trChancesTotal2 + tripleChances;
tripleVSRight[m3] = tripleVSRight[m3]/108;
tripleVSRight[m3] = tripleVSRight[m3]*100;
tripleVSRight[m3] = tripleVSRight[m3].toFixed(2);

if (tripleVSRight[m3].length > 4){

	tripleVSRight[m3] = tripleVSRight[m3].substr(0,4);
}

tripleOverall[m3] = tripleOverall[m3] + trChancesTotal2 + tripleChances;

if (bphrChancesTotal == undefined){

	bphrChancesTotal = 0;

}


hrVSRight[m3] = homerunChances + hrChancesTotal2 + rbphrChancesTotal;
hrVSRight[m3] = hrVSRight[m3]/108;
hrVSRight[m3] = hrVSRight[m3]*100;
hrVSRight[m3] = hrVSRight[m3].toFixed(2);



if (hrVSRight[m3].length > 4){

	hrVSRight[m3] = hrVSRight[m3].substr(0,4);
}

hrOverall[m3] = hrOverall[m3] + homerunChances + hrChancesTotal2 + rbphrChancesTotal;


gbdpVSRight[m3] = gbdpChances;
gbdpVSRight[m3] = gbdpVSRight[m3]/108;
gbdpVSRight[m3] = gbdpVSRight[m3]*100;
gbdpVSRight[m3] = gbdpVSRight[m3].toFixed(2);

if (gbdpVSRight[m3].length > 4){

	gbdpVSRight[m3] = gbdpVSRight[m3].substr(0,4);
}

gbdpOverall[m3] = gbdpOverall[m3] + gbdpChances;

negativeclutchChances = "-" + negativeclutchChances;
clutchVSRight[m3] = parseInt(clutchChances) + parseInt(negativeclutchChances);

if (position != null){
	clutchVSRight[m3] = "n/a";
}

clutchOverall[m3] = clutchOverall[m3] + parseInt(clutchChances) + parseInt(negativeclutchChances);

bpdiamondsVSRight[m3] = bphrChances;

bpdiamondsOverall[m3] = bpdiamondsOverall[m3] + bphrChances;



outVSRight[m3] = 108 - (hbpChances + walkChances + singleChances + rbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + rbphrChancesTotal);

outVSRight[m3] = outVSRight[m3]/108;
outVSRight[m3] = outVSRight[m3]*100;
outVSRight[m3] = outVSRight[m3].toFixed(2);


if (outVSRight[m3].length > 4){

	outVSRight[m3] = outVSRight[m3].substr(0,4);
}

outOverall[m3] = outOverall[m3] + hbpChances + walkChances + singleChances + rbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + rbphrChancesTotal;

//Best Results
bestresultsVSRight[m3] = strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + rbpLineoutsTotal2 + popoutChances;
bestresultsVSRight[m3] = bestresultsVSRight[m3]/108;
bestresultsVSRight[m3] = bestresultsVSRight[m3]*100;
bestresultsVSRight[m3] = bestresultsVSRight[m3].toFixed(2);

bestresultsOverall[m3] = bestresultsOverall[m3] + strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + rbpLineoutsTotal2 + popoutChances;

if (position == null){
	bestresultsVSRight[m3] = "n/a";
}

}//if (color == " "){
else
{

hbpVSLeft[m3] = hbpChances/108;
hbpVSLeft[m3] = hbpVSLeft[m3]*100;
hbpVSLeft[m3] = hbpVSLeft[m3].toFixed(2);


hbpOverall[m3] = hbpOverall[m3] + hbpChances;

walkVSLeft[m3] = walkChances/108;
walkVSLeft[m3] = walkVSLeft[m3]*100;
walkVSLeft[m3] = walkVSLeft[m3].toFixed(2);

walkOverall[m3] = walkOverall[m3] + walkChances;

if (walkVSLeft[m3].length > 4){

	walkVSLeft[m3] = walkVSLeft[m3].substr(0,4);
}

strikeoutVSLeft[m3] = strikeoutChances/108;
strikeoutVSLeft[m3] = strikeoutVSLeft[m3]*100;
strikeoutVSLeft[m3] = strikeoutVSLeft[m3].toFixed(2);

if (strikeoutVSLeft[m3].length > 4){

	strikeoutVSLeft[m3] = strikeoutVSLeft[m3].substr(0,4);					
}

strikeoutOverall[m3] = strikeoutOverall[m3] + strikeoutChances;


singleVSLeft[m3] = singleChances + lbpsiChancesTotal + siChancesTotal2;
singleVSLeft[m3] = singleVSLeft[m3]/108;
singleVSLeft[m3] = singleVSLeft[m3]*100;
singleVSLeft[m3] = singleVSLeft[m3].toFixed(2);


if (singleVSLeft[m3].length > 4){

	singleVSLeft[m3] = singleVSLeft[m3].substr(0,4);
}

singleOverall[m3] = singleOverall[m3] + singleChances + lbpsiChancesTotal + siChancesTotal2;



doubleVSLeft[m3] = doChancesTotal2 + doubleChances;
doubleVSLeft[m3] = doubleVSLeft[m3]/108;
doubleVSLeft[m3] = doubleVSLeft[m3]*100;
doubleVSLeft[m3] = doubleVSLeft[m3].toFixed(2);

if (doubleVSLeft[m3].length > 4){

	doubleVSLeft[m3] = doubleVSLeft[m3].substr(0,4);
}

doubleOverall[m3] = doubleOverall[m3] + doChancesTotal2 + doubleChances;

tripleVSLeft[m3] = trChancesTotal2 + tripleChances;
tripleVSLeft[m3] = tripleVSLeft[m3]/108;
tripleVSLeft[m3] = tripleVSLeft[m3]*100;
tripleVSLeft[m3] = tripleVSLeft[m3].toFixed(2);

if (tripleVSLeft[m3].length > 4){

	tripleVSLeft[m3] = tripleVSLeft[m3].substr(0,4);
}

tripleOverall[m3] = tripleOverall[m3] + trChancesTotal2 + tripleChances;

if (bphrChancesTotal == undefined){

	bphrChancesTotal = 0;

}


hrVSLeft[m3] = homerunChances + hrChancesTotal2 + lbphrChancesTotal;
hrVSLeft[m3] = hrVSLeft[m3]/108;
hrVSLeft[m3] = hrVSLeft[m3]*100;
hrVSLeft[m3] = hrVSLeft[m3].toFixed(2);


if (hrVSLeft[m3].length > 4){

	hrVSLeft[m3] = hrVSLeft[m3].substr(0,4);
}

hrOverall[m3] = hrOverall[m3] + homerunChances + hrChancesTotal2 + lbphrChancesTotal;

gbdpVSLeft[m3] = gbdpChances;
gbdpVSLeft[m3] = gbdpVSLeft[m3]/108;
gbdpVSLeft[m3] = gbdpVSLeft[m3]*100;
gbdpVSLeft[m3] = gbdpVSLeft[m3].toFixed(2);

if (gbdpVSLeft[m3].length > 4){

	gbdpVSLeft[m3] = gbdpVSLeft[m3].substr(0,4);
}

gbdpOverall[m3] = gbdpOverall[m3] + gbdpChances;

negativeclutchChances = "-" + negativeclutchChances;
clutchVSLeft[m3] = parseInt(clutchChances) + parseInt(negativeclutchChances);

clutchOverall[m3] = clutchOverall[m3] + parseInt(clutchChances) + parseInt(negativeclutchChances);

if (position != null){
	clutchVSLeft[m3] = "n/a";
}

bpdiamondsVSLeft[m3] = bphrChances;

bpdiamondsOverall[m3] = bpdiamondsOverall[m3] + bphrChances;



outVSLeft[m3] = 108 - (hbpChances + walkChances + singleChances + lbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + lbphrChancesTotal);
outVSLeft[m3] = outVSLeft[m3]/108;
outVSLeft[m3] = outVSLeft[m3]*100;
outVSLeft[m3] = outVSLeft[m3].toFixed(2);

if (outVSLeft[m3].length > 4){

	outVSLeft[m3] = outVSLeft[m3].substr(0,4);
}

outOverall[m3] = outOverall[m3] + hbpChances + walkChances + singleChances + rbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + rbphrChancesTotal;

bestresultsVSLeft[m3] = strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + lbpLineoutsTotal2 + popoutChances;
bestresultsVSLeft[m3] = bestresultsVSLeft[m3]/108;
bestresultsVSLeft[m3] = bestresultsVSLeft[m3]*100;
bestresultsVSLeft[m3] = bestresultsVSLeft[m3].toFixed(2);

bestresultsOverall[m3] = bestresultsOverall[m3] + strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + lbpLineoutsTotal2 + popoutChances;

if (position == null){
	bestresultsVSLeft[m3] = "n/a";
}




}//if (color == " "){


}//for (var j = 0; i < 2; i++){

for(var i = 1; i < 6;i++){

hbpOverall[i] = hbpOverall[i]/216;
hbpOverall[i] = hbpOverall[i]*100;
hbpOverall[i] = hbpOverall[i].toFixed(2);

if (hbpOverall[i].length > 4){

	hbpOverall[i] = hbpOverall[i].substr(0,4);
}

walkOverall[i] = walkOverall[i]/216;
walkOverall[i] = walkOverall[i]*100;
walkOverall[i] = walkOverall[i].toFixed(2);

if (walkOverall[i].length > 4){

	walkOverall[i] = walkOverall[i].substr(0,4);
}

strikeoutOverall[i] = strikeoutOverall[i]/216;
strikeoutOverall[i] = strikeoutOverall[i]*100;
strikeoutOverall[i] = strikeoutOverall[i].toFixed(2);

if (strikeoutOverall[i].length > 4){

	strikeoutOverall[i] = strikeoutOverall[i].substr(0,4);
}

singleOverall[i] = singleOverall[i]/216;
singleOverall[i] = singleOverall[i]*100;
singleOverall[i] = singleOverall[i].toFixed(2);

if (singleOverall[i].length > 4){

	singleOverall[i] = singleOverall[i].substr(0,4);
}

doubleOverall[i] = doubleOverall[i]/216;
doubleOverall[i] = doubleOverall[i]*100;
doubleOverall[i] = doubleOverall[i].toFixed(2);

if (doubleOverall[i].length > 4){

	doubleOverall[i] = doubleOverall[i].substr(0,4);
}

tripleOverall[i] = tripleOverall[i]/216;
tripleOverall[i] = tripleOverall[i]*100;
tripleOverall[i] = tripleOverall[i].toFixed(2);

if (tripleOverall[i].length > 4){

	tripleOverall[i] = tripleOverall[i].substr(0,4);
}


hrOverall[i] = hrOverall[i]/216;
hrOverall[i] = hrOverall[i]*100;
hrOverall[i] = hrOverall[i].toFixed(2);

if (hrOverall[i].length > 4){

	hrOverall[i] = hrOverall[i].substr(0,4);
}


outOverall[i] = 216 - outOverall[i];
outOverall[i] = outOverall[i]/216;
outOverall[i] = outOverall[i]*100;
outOverall[i] = outOverall[i].toFixed(2);

if (outOverall[i].length > 4){

	outOverall[i] = outOverall[i].substr(0,4);
}

gbdpOverall[i] = gbdpOverall[i]/216;
gbdpOverall[i] = gbdpOverall[i]*100;
gbdpOverall[i] = gbdpOverall[i].toFixed(2);

if (gbdpOverall[i].length > 4){

	gbdpOverall[i] = gbdpOverall[i].substr(0,4);
}

bestresultsOverall[i] = bestresultsOverall[i]/216;
bestresultsOverall[i] = bestresultsOverall[i]*100;
bestresultsOverall[i] = bestresultsOverall[i].toFixed(2);

if (bestresultsOverall[i].length > 4){

	bestresultsOverall[i] = bestresultsOverall[i].substr(0,4);
}


if (position == null){
	bestresultsOverall[i] = "n/a";
}

if (position != null){
	clutchOverall[i] = "n/a";
}

}//for(var i = 1: i < 6;i++){

}//myRefresh


if((cardSet == 'ATG7') || (cardSet == '2012')|| (cardSet == '90s') || (cardSet == '60s')){

	

		postResults();
		

}

document.addEventListener('click', function(event) {

clickFlag = true;


if (event.target.parentNode == "[object XPCNativeWrapper [object HTMLTableCellElement]]" || event.target.parentNode == "[object XrayWrapper [object HTMLTableCellElement]]"|| event.target.parentNode == "[object HTMLSelectElement]") {

	myTest = event.target.parentNode.innerHTML;


	myTest = myTest.substring(myTest.indexOf("showCard") + 9,myTest.indexOf("showCard") + 10);

	
	
	//alert(myTest + " " + event.target.parentNode);
	postResults();
}


myClick = event.target.innerHTML;


if (myClick == "AT&amp;T Park"){
	//alert(myClick);

	myClick = "AT&T Park";
}


if (event.target.parentNode == "[object XPCNativeWrapper [object HTMLSelectElement]]" || event.target.parentNode == "[object XrayWrapper [object HTMLSelectElement]]" || event.target.parentNode == "[object HTMLSelectElement]") {


//if(pageAddr.indexOf("player.html?player_id=") != -1){
if(pageAddr.indexOf("/player/") != -1){

if (cardSet == '2012'){



	if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){
//alert(myClick);
		location.reload(true)
		bpRatings(myClick);
		GM_setValue('ballpark2012playerset', myClick);
		
		
	}
	else
	{
		//location.reload(true)
		//GM_setValue('bats2009playerset', myClick);
		//mybatsClick = myClick;
	}
}
else if (cardSet == 'ATG7')
{
	if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){
//alert(myClick);
		location.reload(true)
		bpRatings(myClick);
		GM_setValue('ballparkATG7playerset', myClick);
		
	}
	else
	{
		//location.reload(true)
		//GM_setValue('batsATG5playerset', myClick);
		//mybatsClick = myClick;
		
	}

}	
else if (cardSet == '90s')
{
	if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){
//alert(myClick);
		location.reload(true)
		bpRatings(myClick);
		GM_setValue('ballpark90splayerset', myClick);
		
		
	}
	else
	{
		//location.reload(true)
		//GM_setValue('bats90splayerset', myClick);
		//mybatsClick = myClick;
		
	}

}
else if (cardSet == '60s')
{
	if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){
//alert(myClick);
		location.reload(true)
		bpRatings(myClick);
		GM_setValue('ballpark60splayerset', myClick);
		
		
	}
	else
	{
		//location.reload(true)
		//GM_setValue('bats90splayerset', myClick);
		//mybatsClick = myClick;
		
	}

}

}//if(pageAddr.indexOf("player.html?player_id=") != -1){

}


}, true);

function postResults(){

if (cardSet == '2012'){

var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
"Angels Stadium '12":'477',
"AT&T Park '12":'499',
"Busch Stadium '12":'497',
"Camden Yards '12":'471',
"Chase Field '12":'485',
"Citi Field '12":'494',
"Citizen's Bank Pk '12":'495',
"Comerica Park '12":'475',
"Coors Field '12":'489',
"Dodger Stadium '12":'491',
"Fenway Park '12":'472',
"Great Amer. Bpk '12":'488',
"Kauffman Stadium '12":'476',
"Marlins Park '12":'492',
"Miller Park '12":'493',
"Minute Maid Park '12":'490',
"Nationals Park '12":'500',
"O.co Coliseum '12":'480',
"Petco Park '12":'498',
"PNC Park '12":'496',
"Progressive Field '12":'474',
"Rangers Ballpark '12":'483',
"Rogers Centre '12":'484',
"SAFECO Field '12":'481',
"Target Field '12":'478',
"Tropicana Field '12":'482',
"Turner Field '12":'486',
"US Cellular Field '12":'473',
"Wrigley Field '12":'487',
"Yankee Stadium '12":'479',

};
}
else if (cardSet == 'ATG7'){

var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
"Ameriquest Field '05": '392',
"Angels Stadium '05": '386',
"Bank One Ballpark '05": '394',
"Busch Stadium '05": '406',
"Camden Yards '05": '380',
"Citizen's Bank Pk '05": '404',
"Comerica Park '05": '384',
"Coors Field '05": '398',
"Dodger Stadium '05": '401',
"Dolphins Stadium '05": '399',
"Fenway Park '05": '381',
"Great Amer. Bpk '05": '397',
"Jacobs Field '05": '383',
"Kauffman Stadium '05": '385',
"McAfee Coliseum '05": '389',
"Metrodome '05": '387',
"Miller Park '05": '402',
"Minute Maid Field '05": '400',
"PNC Park '05": '405',
"Petco Park '05": '407',
"RFK Stadium '05": '409',
"Rogers Centre '05": '393',
"SAFECO Field '05": '390',
"SBC Park '05": '408',
"Shea Stadium '05": '403',
"Tropicana Field '05": '391',
"Turner Field '05": '395',
"US Cellular Field '05": '382',
"Wrigley Field '05": '396',
"Yankee Stadium '05": '388',
"Forbes Field '09": '3',
"Baker Bowl '11": '133',
"Bennett Park '11": '125',
"Comiskey Park '11": '123',
"Forbes Field '11": '134',
"Griffith Stadium '11": '128',
"Hilltop Park '11": '126',
"Hunt. Ave. Grds '11": '122',
"League Park '11": '124',
"Palace of the Fns '11": '132',
"Polo Grounds '11": '47',
"Robison Field '11": '135',
"Shibe Park '11": '46',
"South End Grounds '11": '129',
"Sportsman's Park '11": '127',
"Washington Park '11": '130',
"West Side Park '11": '131',
"Braves Field '20": '272',
"Dunn Field '20": '6',
"Ebbets Field '20": '300',
"Sportsman's Park '20": '48',
"St. Louis '20": '301',
"Griffith Stadium '24": '7',
"League Park '24": '285',
"Polo Grounds '24": '288',
"Baker Bowl '34": '271',
"League Park '34": '53',
"Navin Field '34": '287',
"Braves Field '41": '144',
"Briggs Stadium '41": '139',
"Comiskey Park '41": '137',
"Crosley Field '41": '147',
"Ebbets Field '41": '145',
"Fenway Park '41": '136',
"Forbes Field '41": '150',
"Griffith Stadium '41": '143',
"League Park '41": '138',
"Polo Grounds '41": '148',
"Shibe Park (AL) '41": '141',
"Shibe Park (NL) '41": '149',
"Sportsman's Pk AL '41": '142',
"Sportsman's Pk NL '41": '151',
"Wrigley Field '41": '146',
"Yankee Stadium '41": '140',
"Fenway Park '46": '15',
"Braves Field '48": '273',
"Yankee Stadium '48": '295',
"Shibe Park '50": '17',
"Cleveland Stadium '51": '275',
"Crosley Field '51": '279',
"Forbes Field '54": '282',
"Griffith Stadium '54": '284',
"Comiskey Park '55": '56',
"Ebbets Field '55": '281',
"Yankee Stadium '56": '377',
"Briggs Stadium '57": '156',
"Cleveland Stadium '57": '155',
"Comiskey Park '57": '154',
"Connie Mack Stdm '57": '164',
"County Stadium '57": '52',
"Crosley Field '57": '162',
"Ebbets Field '57": '160',
"Fenway Park '57": '153',
"Forbes Field '57": '165',
"Griffith Stadium '57": '159',
"Memorial Stadium '57": '152',
"Municipal Stadium '57": '157',
"Polo Grounds '57": '163',
"Sportsman's Park '57": '166',
"Wrigley Field '57": '161',
"Yankee Stadium '57": '158',
"Comiskey Park '59": '379',
"Memorial Stadium '59": '286',
"Sportsman's Park '59": '289',
"Wrigley Field '59": '20',
"Comiskey Park '60": '278',
"Sportsman's Park '60": '290',
"Cleveland Stadium '63": '276',
"Wrigley Field '63": '293',
"Connie Mack Stdm '64": '59',
"Dodger Stadium '64": '280',
"Shea Stadium '64": '303',
"Forbes Field '65": '283',
"Metropolitan Stdm '65": '24',
"Cleveland Stadium '66": '277',
"Crosley Field '66": '299',
"Wrigley Field '66": '294',
"Busch Stadium '67": '274',
"Fenway Park '67": '25',
"Memorial Stadium '70": '378',
"Astrodome '71": '270',
"Fenway Park '71": '297',
"Metropolitan Stdm '71": '298',
"Shea Stadium '71": '302',
"Yankee Stadium '71": '296',
"Tiger Stadium '75": '291',
"Veterans Stadium '75": '292',
"Anaheim Stadium '78": '178',
"Arlington Stadium '78": '175',
"Astrodome '78": '189',
"Busch Stadium '78": '183',
"Candlestick Park '78": '190',
"Comiskey Park '78": '173',
"County Stadium '78": '171',
"Dodger Stadium '78": '187',
"Exhibition Stdm '78": '167',
"Fenway Park '78": '63',
"Fulton Cnty Stdm '78": '185',
"Jack Murphy Stdm'78": '188',
"Kingdome '78": '176',
"Memorial Stadium '78": '170',
"Metropolitan Stdm '78": '172',
"Municipal Stadium '78": '169',
"Oakland Coliseum '78": '174',
"Olympic Stadium '78": '182',
"Riverfront Stdm '78": '186',
"Royals Stadium '78": '177',
"Shea Stadium '78": '181',
"Three Rivers Stdm '78": '179',
"Tiger Stadium '78": '168',
"Veterans Stadium '78": '180',
"Wrigley Field '78": '184',
"Yankee Stadium '78": '64',
"Royals Stadium '80": '33',
"Cath. Prep Oval (NeL)": '305',
"Greenlee Field (NeL)": '317',
"Griffith Stdm (NeL)": '318',
"Hilldale Park (NeL)": '306',
"Mack Park (NeL)": '316',
"Martin Park (NeL)": '314',
"Muehlebach Fld (NeL)": '319',
"Penmar Park (NeL)": '309',
"Rickwood Field (NeL)": '312',
"Ruppert Stadium (NeL)": '307',
"Schorling Park (NeL)": '311',
"South Side Pk (NeL)": '304',
"Stars Park (NeL)": '315',
"Terrapin Park (NeL)": '308',
"Washington Park (NeL)": '313',
"Yankee Stadium (NeL)": '310',
};	


}	
else if (cardSet == '90s'){
var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
	"Anaheim Stadium '90":     '350',
	"Arlington Stadium '90":	'351',
	"Astrodome '97":	'352',
	"Bank One Ballpark '99":	'244',
	"Busch Stadium '92":	'353',
	"Camden Yards '96":	'354',
	"Candlestick Park '90": 	'355',
	"Cleveland Stadium '92": '375',
	"Comiskey Park '92": '356',
	"Coors Field '95": '357',
	"County Stadium '90": '358',
	"Fenway Park '91": '359',
	"Jacobs Field '94": '361',
	"Kauffman Stadium '93": '362',
	"Kingdome '95": '363',
	"Memorial Stadium '91": '376',
	"Metrodome '94": '364',
	"Oakland Coliseum '96": '365',
	"Olympic Stadium '94": '366',
	"Pro Player Stdm '99": '249',
	"Qualcomm Stadium '95": '367',
	"Riverfront Stdm '93": '368',
	"Shea Stadium '98": '369',
	"Skydome '93": '370',
	"Three Rivers Stdm '92": '371',
	"Tiger Stadium '92": '372',
	"Turner Field '97": '360',
	"Veterans Stadium '99": '255',
	"Wrigley Field '92": '373',
	"Yankee Stadium '96": '374',
};
}
else if (cardSet == '60s'){
var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
	"Anaheim Stadium '67":     '630',
	"Astrodome '66":	'638',
	"Atlanta Stadium '66":	'635',
	"Busch Stadium '67":	'274',
	"Candlestick Park '64":	'643',
	"Cleveland Stadium '63":	'276',
	"Colt Stadium '63": 	'637',
	"Comiskey Park '60": '278',
	"Connie Mack Stdm '67": '641',
	"County Stadium '61": '640',	
	"Crosley Field '61": '636',
	"DC Stadium '66": '634',
	"Dodger Stadium '63": '639',
	"Fenway Park '67": '25',
	"Forbes Field '60": '642',
	"Memorial Stadium '66": '60',
	"Metropolitan Stdm '65": '24',
	"Municipal Stadium '60": '632',
	"Shea Stadium '64": '303',
	"Tiger Stadium '63": '631',
	"Wrigley Field '63": '293',
	"Yankee Stadium '61": '633',
};
}
	
var unSelect = document.createElement('select');

	var accountCount = 0;


if (cardSet == '2012'){

	for (var key in bp) {
		if (GM_getValue('ballpark2012playerset', "Angels Stadium '12") == key){

			unSelect.innerHTML += '<option selected>'+key+'</option>';
		}
		else
		{
			unSelect.innerHTML += '<option value="">'+key+'</option>';
		}

		accountCount++;
	}
}
else if (cardSet == 'ATG7'){

	for (var key in bp) {
		if (GM_getValue('ballparkATG7playerset', "Ameriquest Field '05") == key){

			unSelect.innerHTML += '<option selected>'+key+'</option>';
		}
		else
		{
			unSelect.innerHTML += '<option value="">'+key+'</option>';
		}

		accountCount++;
	}


}	
else if (cardSet == '90s'){

	for (var key in bp) {
		if (GM_getValue('ballpark90splayerset', "Anaheim Stadium '90") == key){

			unSelect.innerHTML += '<option selected>'+key+'</option>';
		}
		else
		{
			unSelect.innerHTML += '<option value="">'+key+'</option>';
		}

		accountCount++;
	}


}
else if (cardSet == '60s'){

	for (var key in bp) {
		if (GM_getValue('ballpark60splayerset', "Anaheim Stadium '67") == key){

			unSelect.innerHTML += '<option selected>'+key+'</option>';
		}
		else
		{
			unSelect.innerHTML += '<option value="">'+key+'</option>';
		}

		accountCount++;
	}


}



var theBat = {'Right':'0','Left':'1',};
var theBatDropDown = document.createElement('select');

	var accountCount2 = 0;

	for (var key2 in theBat) {

		if (cardSet == '2012'){

			if (GM_getValue('bats2012playerset', 'Left') == key2){
		
				theBatDropDown.innerHTML += '<option selected>'+key2+'</option>';
				mybatsClick = key2;
			

			}
			else
			{
				theBatDropDown.innerHTML += '<option value="">'+key2+'</option>';
	
			}
		}
		else if (cardSet == 'ATG7'){

			if (GM_getValue('batsATG7playerset', 'Left') == key2){
		
				theBatDropDown.innerHTML += '<option selected>'+key2+'</option>';
				mybatsClick = key2;
			

			}
			else
			{
				theBatDropDown.innerHTML += '<option value="">'+key2+'</option>';
	
			}			



		}
		else if (cardSet == '90s'){

			if (GM_getValue('bats90splayerset', 'Left') == key2){
		
				theBatDropDown.innerHTML += '<option selected>'+key2+'</option>';
				mybatsClick = key2;
			

			}
			else
			{
				theBatDropDown.innerHTML += '<option value="">'+key2+'</option>';
	
			}			



		}
		else if (cardSet == '60s'){

			if (GM_getValue('bats60splayerset', 'Left') == key2){
		
				theBatDropDown.innerHTML += '<option selected>'+key2+'</option>';
				mybatsClick = key2;
			

			}
			else
			{
				theBatDropDown.innerHTML += '<option value="">'+key2+'</option>';
	
			}			



		}		
		
		accountCount2++;
	}


//td/a[@onClick='window.close();']...old
var locateCopyright2;
var locateCopyright = document.evaluate("//td/a[@onClick='window.close();'][@class='text10']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < locateCopyright.snapshotLength; i++) {

locateCopyright2 = locateCopyright.snapshotItem(i);


if (myTest == 1){

	myTest2 = myTest;

}
else if (myTest == 2){

	myTest2 = parseInt(myTest) + 1;

}
else if (myTest == 3){

	myTest2 = parseInt(myTest) + 2;

}
else if (myTest == 4){

	myTest2 = parseInt(myTest) + 3;

}
else if (myTest == 5){

	myTest2 = parseInt(myTest) + 4;

}

myTest2 = i+1;



var myElement = document.createElement("baseballsimulator");
myElement.innerHTML = '<tr><td class="text10" valign="top" colspan="6" align="right"><a href="#" onClick="window.close();" class="text10">close window</a><BR><BR></td></tr><tr><table class="title" width="330" border="0" cellpadding=2 cellspacing=1 border=0 align="center"><tr><td class="text12" align="center"><b>Player Card Chances</b></td></tr></table><table class="text10" width="330" border="0" cellpadding=2 cellspacing=1 border=0 align="center"><tr><td class="text10" align="left">Ballpark:</td><tr><td nowrap align="left"><form name="selector2" onSubmit="go2()"><select title="SI: L 1-'+lbpSingles+', R 1-'+rbpSingles+' / HR: L 1-'+lbpHomeruns+', R 1-'+rbpHomeruns+'" name="select2" onChange="go2()" class="text10">' + unSelect.innerHTML + '</select></form></td><table class="datatab_nowidth cleft tright" width="330" border="0" cellpadding=2 cellspacing=1 border=0 align="center"><tr class="ui-widget-header""><td align="left">Result</td><td class="alttitle" align="left">Vs. Left</td><td class="alttitle" align="left">Vs. Right</td><td class="alttitle" align="left">Overall</td></tr><TR class="odd"><td class="text10" align="left">HBP</a></td><td class="text10" align="left">' + hbpVSLeft[myTest2] + '</td><td class="text10" align="left">' + hbpVSRight[myTest2] + '</td><td class="text10" align="left">' + hbpOverall[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Walk</a></td><td class="text10" align="left">' + walkVSLeft[myTest2] + '</td><td class="text10" align="left">' + walkVSRight[myTest2] + '</td><td class="text10" align="left">' + walkOverall[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Strikeout</a></td><td class="text10" align="left">' + strikeoutVSLeft[myTest2] + '</td><td class="text10" align="left">' + strikeoutVSRight[myTest2] + '</td><td class="text10" align="left">' + strikeoutOverall[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Single</a></td><td class="text10" align="left">' + singleVSLeft[myTest2] + '</td><td class="text10" align="left">' + singleVSRight[myTest2] + '</td><td class="text10" align="left">' + singleOverall[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Double</a></td><td class="text10" align="left">' + doubleVSLeft[myTest2] + '</td><td class="text10" align="left">' + doubleVSRight[myTest2] + '</td><td class="text10" align="left">' + doubleOverall[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Triple</a></td><td class="text10" align="left">' + tripleVSLeft[myTest2] + '</td><td class="text10" align="left">' + tripleVSRight[myTest2] + '</td><td class="text10" align="left">' + tripleOverall[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Home Run</a></td><td class="text10" align="left">' + hrVSLeft[myTest2] + '</td><td class="text10" align="left">' + hrVSRight[myTest2] + '</td><td class="text10" align="left">' + hrOverall[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Out</a></td><td class="text10" align="left">' + outVSLeft[myTest2] + '</td><td class="text10" align="left">' + outVSRight[myTest2] + '</td><td class="text10" align="left">' + outOverall[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">GB-DP</a></td><td class="text10" align="left">' + gbdpVSLeft[myTest2] + '</td><td class="text10" align="left">' + gbdpVSRight[myTest2] + '</td><td class="text10" align="left">' + gbdpOverall[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Clutch Rating</a></td><td class="text10" align="left">' + clutchVSLeft[myTest2] + '</td><td class="text10" align="left">' + clutchVSRight[myTest2] + '</td><td class="text10" align="left">' + clutchOverall[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Ballpark Diamonds</a></td><td class="text10" align="left">' + bpdiamondsVSLeft[myTest2] + '</td><td class="text10" align="left">' + bpdiamondsVSRight[myTest2] + '</td><td class="text10" align="left">' + bpdiamondsOverall[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Best Results</a></td><td class="text10" align="left">' + bestresultsVSLeft[myTest2] + '</td><td class="text10" align="left">' + bestresultsVSRight[myTest2] + '</td><td class="text10" align="left">' + bestresultsOverall[myTest2] + '</td></TR></table><br>';



	locateCopyright2.parentNode.replaceChild(myElement,locateCopyright2);
	}//for (var i = 0; i < locateCopyright.snapshotLength; i++) {

}

function bpRatings(myClick){

if (myClick == "AT&amp;T Park '12"){

	myClick = "AT&T Park '12";

}

//alert(myClick);
if (myClick == "Angels Stadium '12"){
lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 3;
rbpHomeruns = 3;
}
else if (myClick == "AT&T Park '12"){
lbpSingles = 5;
rbpSingles = 8;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Busch Stadium '12"){
lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 8;
rbpHomeruns = 2;
}
else if (myClick == "Camden Yards '12"){
lbpSingles = 12;
rbpSingles = 9;
lbpHomeruns = 14;
rbpHomeruns = 14;
}
else if (myClick == "Chase Field '12"){
lbpSingles = 12;
rbpSingles = 12;
lbpHomeruns = 11;
rbpHomeruns = 11;
}
else if (myClick == "Citi Field '12"){
lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 11;
rbpHomeruns = 11;
}
else if (myClick == "Citizen's Bank Pk '12"){
lbpSingles = 5;
rbpSingles = 5;
lbpHomeruns = 16;
rbpHomeruns = 8;
}
else if (myClick == "Comerica Park '12"){
lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 8;
rbpHomeruns = 8;
}
else if (myClick == "Coors Field '12"){
lbpSingles = 19;
rbpSingles = 19;
lbpHomeruns = 19;
rbpHomeruns = 19;
}
else if (myClick == "Dodger Stadium '12"){
lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Fenway Park '12"){
lbpSingles = 19;
rbpSingles = 19;
lbpHomeruns = 1;
rbpHomeruns = 9;
}
else if (myClick == "Great Amer. Bpk '12"){
lbpSingles = 4;
rbpSingles = 9;
lbpHomeruns = 16;
rbpHomeruns = 19;
}
else if (myClick == "Kauffman Stadium '12"){
lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 5;
rbpHomeruns = 5;
}
else if (myClick == "Marlins Park '12"){
lbpSingles = 8;
rbpSingles = 13;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Miller Park '12"){
lbpSingles = 4;
rbpSingles = 9;
lbpHomeruns = 16;
rbpHomeruns = 16;
}
else if (myClick == "Minute Maid Park '12"){
lbpSingles = 6;
rbpSingles = 3;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Nationals Park '12"){
lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "O.co Coliseum '12"){
lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 1;
rbpHomeruns = 4;
}
else if (myClick == "Petco Park '12"){
lbpSingles = 2;
rbpSingles = 2;
lbpHomeruns = 1;
rbpHomeruns = 4;
}
else if (myClick == "PNC Park '12"){
lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Progressive Field '12"){
lbpSingles = 9;
rbpSingles = 3;
lbpHomeruns = 16;
rbpHomeruns = 4;
}
else if (myClick == "Rangers Ballpark '12"){
lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 15;
rbpHomeruns = 15;
}
else if (myClick == "Rogers Centre '12"){
lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 9;
rbpHomeruns = 15;
}
else if (myClick == "SAFECO Field '12"){
lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 5;
rbpHomeruns = 1;
}
else if (myClick == "Target Field '12"){
lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 2;
rbpHomeruns = 7;
}
else if (myClick == "Tropicana Field '12"){
lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 6;
rbpHomeruns = 6;
}
else if (myClick == "Turner Field '12"){
lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 7;
rbpHomeruns = 7;
}
else if (myClick == "US Cellular Field '12"){
lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 19;
rbpHomeruns = 19;
}
else if (myClick == "Wrigley Field '12"){
lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 9;
rbpHomeruns = 9;
}
else if (myClick == "Yankee Stadium '12"){
lbpSingles = 8;
rbpSingles = 5;
lbpHomeruns = 19;
rbpHomeruns = 14;
}
//ATG6///////////////////////////////////////////////////////////////////////////////////////////////
else if (myClick == "Ameriquest Field '05"){

lbpSingles = 13;
rbpSingles = 13;
lbpHomeruns = 19;
rbpHomeruns = 11;
}
else if (myClick == "Angels Stadium '05"){

lbpSingles = 5;
rbpSingles = 8;
lbpHomeruns = 8;
rbpHomeruns = 8;
}
else if (myClick == "Bank One Ballpark '05"){

lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 13;
rbpHomeruns = 13;
}
else if (myClick == "Busch Stadium '05"){

lbpSingles = 5;
rbpSingles = 11;
lbpHomeruns = 6;
rbpHomeruns = 6;
}
else if (myClick == "Camden Yards '05"){

lbpSingles = 4;
rbpSingles = 7;
lbpHomeruns = 8;
rbpHomeruns = 11;
}
else if (myClick == "Citizen's Bank Pk '05"){

lbpSingles = 9;
rbpSingles = 14;
lbpHomeruns = 15;
rbpHomeruns = 15;
}
else if (myClick == "Comerica Park '05"){

lbpSingles = 13;
rbpSingles = 8;
lbpHomeruns = 6;
rbpHomeruns = 6;
}
else if (myClick == "Coors Field '05"){

lbpSingles = 19;
rbpSingles = 19;
lbpHomeruns = 15;
rbpHomeruns = 15;
}
else if (myClick == "Dodger Stadium '05"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 11;
rbpHomeruns = 11;
}
else if (myClick == "Dolphins Stadium '05"){

lbpSingles = 5;
rbpSingles = 5;
lbpHomeruns = 9;
rbpHomeruns = 3;
}
else if (myClick == "Fenway Park '05"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 4;
rbpHomeruns = 10;
}
else if (myClick == "Great Amer. Bpk '05"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 13;
rbpHomeruns = 13;
}
else if (myClick == "Jacobs Field '05"){

lbpSingles = 5;
rbpSingles = 5;
lbpHomeruns = 3;
rbpHomeruns = 3;
}
else if (myClick == "Kauffman Stadium '05"){

lbpSingles = 10;
rbpSingles = 13;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "McAfee Coliseum '05"){

lbpSingles = 7;
rbpSingles = 4;
lbpHomeruns = 4;
rbpHomeruns = 10;
}
else if (myClick == "Metrodome '05"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Miller Park '05"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 11;
rbpHomeruns = 11;
}
else if (myClick == "Minute Maid Field '05"){

lbpSingles = 3;
rbpSingles = 11;
lbpHomeruns = 3;
rbpHomeruns = 16;
}
else if (myClick == "PNC Park '05"){

lbpSingles = 16;
rbpSingles = 10;
lbpHomeruns = 10;
rbpHomeruns = 4;
}
else if (myClick == "Petco Park '05"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "RFK Stadium '05"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 9;
rbpHomeruns = 3;
}
else if (myClick == "Rogers Centre '05"){

lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 13;
rbpHomeruns = 13;
}
else if (myClick == "SAFECO Field '05"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 14;
rbpHomeruns = 6;
}
else if (myClick == "SBC Park '05"){

lbpSingles = 7;
rbpSingles = 16;
lbpHomeruns = 4;
rbpHomeruns = 7;
}
else if (myClick == "Shea Stadium '05"){

lbpSingles = 15;
rbpSingles = 10;
lbpHomeruns = 7;
rbpHomeruns = 4;
}
else if (myClick == "Tropicana Field '05"){

lbpSingles = 8;
rbpSingles = 5;
lbpHomeruns = 9;
rbpHomeruns = 6;
}
else if (myClick == "Turner Field '05"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 8;
rbpHomeruns = 8;
}
else if (myClick == "US Cellular Field '05"){

lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 18;
rbpHomeruns = 18;
}
else if (myClick == "Wrigley Field '05"){

lbpSingles = 5;
rbpSingles = 8;
lbpHomeruns = 10;
rbpHomeruns = 14;
}
else if (myClick == "Yankee Stadium '05"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Forbes Field '09"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 0;
rbpHomeruns = 0;
}
else if (myClick == "Baker Bowl '11"){

lbpSingles = 19;
rbpSingles = 6;
lbpHomeruns = 19;
rbpHomeruns = 19;
}
else if (myClick == "Bennett Park '11"){

lbpSingles = 12;
rbpSingles = 12;
lbpHomeruns = 9;
rbpHomeruns = 19;
}
else if (myClick == "Comiskey Park '11"){

lbpSingles = 1;
rbpSingles = 6;
lbpHomeruns = 3;
rbpHomeruns = 9;
}
else if (myClick == "Forbes Field '11"){

lbpSingles = 9;
rbpSingles = 13;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Griffith Stadium '11"){

lbpSingles = 5;
rbpSingles = 5;
lbpHomeruns = 19;
rbpHomeruns = 5;
}
else if (myClick == "Hilltop Park '11"){

lbpSingles = 17;
rbpSingles = 12;
lbpHomeruns = 1;
rbpHomeruns = 19;
}
else if (myClick == "Hunt. Ave. Grds '11"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 19;
rbpHomeruns = 19;
}
else if (myClick == "League Park '11"){

lbpSingles = 13;
rbpSingles = 17;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Palace of the Fns '11"){

lbpSingles = 15;
rbpSingles = 7;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Polo Grounds '11"){

lbpSingles = 2;
rbpSingles = 8;
lbpHomeruns = 7;
rbpHomeruns = 16;
}
else if (myClick == "Robison Field '11"){

lbpSingles = 6;
rbpSingles = 15;
lbpHomeruns = 2;
rbpHomeruns = 1;
}
else if (myClick == "Shibe Park '11"){

lbpSingles = 3;
rbpSingles = 3;
lbpHomeruns = 4;
rbpHomeruns = 1;
}
else if (myClick == "South End Grounds '11"){

lbpSingles = 3;
rbpSingles = 3;
lbpHomeruns = 17;
rbpHomeruns = 19;
}
else if (myClick == "Sportsman's Park '11"){

lbpSingles = 11;
rbpSingles = 6;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Washington Park '11"){

lbpSingles = 4;
rbpSingles = 1;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "West Side Park '11"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 7;
rbpHomeruns = 2;
}
else if (myClick == "Braves Field '20"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Dunn Field '20"){

lbpSingles = 16;
rbpSingles = 6;
lbpHomeruns = 10;
rbpHomeruns = 1;
}
else if (myClick == "Ebbets Field '20"){

lbpSingles = 16;
rbpSingles = 10;
lbpHomeruns = 19;
rbpHomeruns = 8;
}
else if (myClick == "Sportsman's Park '20"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 19;
rbpHomeruns = 4;
}
else if (myClick == "St. Louis '20"){

lbpSingles = 15;
rbpSingles = 7;
lbpHomeruns = 4;
rbpHomeruns = 1;
}
else if (myClick == "Griffith Stadium '24"){

lbpSingles = 9;
rbpSingles = 7;
lbpHomeruns = 0;
rbpHomeruns = 0;
}
else if (myClick == "League Park '24"){

lbpSingles = 13;
rbpSingles = 6;
lbpHomeruns = 4;
rbpHomeruns = 1;
}
else if (myClick == "Polo Grounds '24"){

lbpSingles = 1;
rbpSingles = 3;
lbpHomeruns = 15;
rbpHomeruns = 15;
}
else if (myClick == "Baker Bowl '34"){

lbpSingles = 19;
rbpSingles = 12;
lbpHomeruns = 12;
rbpHomeruns = 16;
}
else if (myClick == "League Park '34"){

lbpSingles = 15;
rbpSingles = 11;
lbpHomeruns = 16;
rbpHomeruns = 2;
}
else if (myClick == "Navin Field '34"){

lbpSingles = 9;
rbpSingles = 12;
lbpHomeruns = 2;
rbpHomeruns = 4;
}
else if (myClick == "Braves Field '41"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 2;
rbpHomeruns = 0;
}
else if (myClick == "Briggs Stadium '41"){

lbpSingles = 12;
rbpSingles = 12;
lbpHomeruns = 18;
rbpHomeruns = 18;
}
else if (myClick == "Comiskey Park '41"){

lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Crosley Field '41"){

lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Ebbets Field '41"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 15;
rbpHomeruns = 8;
}
else if (myClick == "Fenway Park '41"){

lbpSingles = 12;
rbpSingles = 12;
lbpHomeruns = 14;
rbpHomeruns = 19;
}
else if (myClick == "Forbes Field '41"){

lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Griffith Stadium '41"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 0;
rbpHomeruns = 0;
}
else if (myClick == "League Park '41"){

lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 9;
rbpHomeruns = 3;
}
else if (myClick == "Polo Grounds '41"){

lbpSingles = 0;
rbpSingles = 0;
lbpHomeruns = 20;
rbpHomeruns = 20;
}
else if (myClick == "Shibe Park (AL) '41"){

lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 3;
rbpHomeruns = 15;
}
else if (myClick == "Shibe Park (NL) '41"){

lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 3;
rbpHomeruns = 15;
}
else if (myClick == "Sportsman's Pk AL '41"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 20;
rbpHomeruns = 6;
}
else if (myClick == "Sportsman's Pk NL '41"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 20;
rbpHomeruns = 6;
}
else if (myClick == "Wrigley Field '41"){

lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 0;
rbpHomeruns = 2;
}
else if (myClick == "Yankee Stadium '41"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 15;
rbpHomeruns = 10;
}
else if (myClick == "Fenway Park '46"){

lbpSingles = 12;
rbpSingles = 11;
lbpHomeruns = 8;
rbpHomeruns = 17;
}
else if (myClick == "Braves Field '48"){

lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Yankee Stadium '48"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 19;
rbpHomeruns = 6;
}
else if (myClick == "Shibe Park '50"){

lbpSingles = 9;
rbpSingles = 7;
lbpHomeruns = 3;
rbpHomeruns = 14;
}
else if (myClick == "Cleveland Stadium '51"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 12;
rbpHomeruns = 12;
}
else if (myClick == "Crosley Field '51"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 1;
rbpHomeruns = 6;
}
else if (myClick == "Forbes Field '54"){

lbpSingles = 5;
rbpSingles = 16;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Griffith Stadium '54"){

lbpSingles = 2;
rbpSingles = 14;
lbpHomeruns = 3;
rbpHomeruns = 1;
}
else if (myClick == "Comiskey Park '55"){

lbpSingles = 6;
rbpSingles = 13;
lbpHomeruns = 1;
rbpHomeruns = 6;
}
else if (myClick == "Ebbets Field '55"){

lbpSingles = 13;
rbpSingles = 1;
lbpHomeruns = 9;
rbpHomeruns = 18;
}
else if (myClick == "Yankee Stadium '56"){

lbpSingles = 10;
rbpSingles = 9;
lbpHomeruns = 19;
rbpHomeruns = 5;
}
else if (myClick == "Briggs Stadium '57"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 19;
rbpHomeruns = 16;
}
else if (myClick == "Cleveland Stadium '57"){

lbpSingles = 1;
rbpSingles = 8;
lbpHomeruns = 8;
rbpHomeruns = 16;
}
else if (myClick == "Comiskey Park '57"){

lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 4;
rbpHomeruns = 4;
}
else if (myClick == "Connie Mack Stdm '57"){

lbpSingles = 11;
rbpSingles = 6;
lbpHomeruns = 1;
rbpHomeruns = 12;
}
else if (myClick == "County Stadium '57"){

lbpSingles = 3;
rbpSingles = 3;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Crosley Field '57"){

lbpSingles = 6;
rbpSingles = 11;
lbpHomeruns = 19;
rbpHomeruns = 15;
}
else if (myClick == "Ebbets Field '57"){

lbpSingles = 14;
rbpSingles = 11;
lbpHomeruns = 14;
rbpHomeruns = 19;
}
else if (myClick == "Fenway Park '57"){

lbpSingles = 16;
rbpSingles = 19;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Forbes Field '57"){

lbpSingles = 17;
rbpSingles = 17;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Griffith Stadium '57"){

lbpSingles = 15;
rbpSingles = 2;
lbpHomeruns = 1;
rbpHomeruns = 16;
}
else if (myClick == "Memorial Stadium '57"){

lbpSingles = 7;
rbpSingles = 3;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Municipal Stadium '57"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 6;
rbpHomeruns = 15;
}
else if (myClick == "Polo Grounds '57"){

lbpSingles = 4;
rbpSingles = 1;
lbpHomeruns = 19;
rbpHomeruns = 16;
}
else if (myClick == "Sportsman's Park '57"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 12;
rbpHomeruns = 6;
}
else if (myClick == "Wrigley Field '57"){

lbpSingles = 4;
rbpSingles = 8;
lbpHomeruns = 7;
rbpHomeruns = 12;
}
else if (myClick == "Yankee Stadium '57"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 9;
rbpHomeruns = 1;
}
else if (myClick == "Comiskey Park '59"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 6;
rbpHomeruns = 6;
}
else if (myClick == "Memorial Stadium '59"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 7;
rbpHomeruns = 7;
}
else if (myClick == "Sportsman's Park '59"){

lbpSingles = 16;
rbpSingles = 16;
lbpHomeruns = 13;
rbpHomeruns = 7;
}
else if (myClick == "Wrigley Field '59"){

lbpSingles = 4;
rbpSingles = 5;
lbpHomeruns = 4;
rbpHomeruns = 17;
}
else if (myClick == "Comiskey Park '60"){

lbpSingles = 12;
rbpSingles = 9;
lbpHomeruns = 1;
rbpHomeruns = 7;
}
else if (myClick == "Sportsman's Park '60"){

lbpSingles = 8;
rbpSingles = 17;
lbpHomeruns = 15;
rbpHomeruns = 9;
}
else if (myClick == "Cleveland Stadium '63"){

lbpSingles = 7;
rbpSingles = 1;
lbpHomeruns = 13;
rbpHomeruns = 7;
}
else if (myClick == "Wrigley Field '63"){

lbpSingles = 4;
rbpSingles = 13;
lbpHomeruns = 19;
rbpHomeruns = 10;
}
else if (myClick == "Connie Mack Stdm '64"){

lbpSingles = 12;
rbpSingles = 3;
lbpHomeruns = 1;
rbpHomeruns = 8;
}
else if (myClick == "Dodger Stadium '64"){

lbpSingles = 4;
rbpSingles = 7;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Shea Stadium '64"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 4;
rbpHomeruns = 13;
}
else if (myClick == "Forbes Field '65"){

lbpSingles = 18;
rbpSingles = 8;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Metropolitan Stdm '65"){

lbpSingles = 7;
rbpSingles = 12;
lbpHomeruns = 9;
rbpHomeruns = 9;
}
else if (myClick == "Cleveland Stadium '66"){

lbpSingles = 5;
rbpSingles = 5;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Crosley Field '66"){

lbpSingles = 13;
rbpSingles = 18;
lbpHomeruns = 19;
rbpHomeruns = 19;
}
else if (myClick == "Wrigley Field '66"){

lbpSingles = 5;
rbpSingles = 9;
lbpHomeruns = 13;
rbpHomeruns = 13;
}
else if (myClick == "Busch Stadium '67"){

lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 9;
rbpHomeruns = 9;
}
else if (myClick == "Fenway Park '67"){

lbpSingles = 20;
rbpSingles = 18;
lbpHomeruns = 17;
rbpHomeruns = 20;
}
else if (myClick == "Memorial Stadium '70"){

lbpSingles = 17;
rbpSingles = 5;
lbpHomeruns = 12;
rbpHomeruns = 12;
}
else if (myClick == "Astrodome '71"){

lbpSingles = 1;
rbpSingles = 10;
lbpHomeruns = 1;
rbpHomeruns = 1;
}
else if (myClick == "Fenway Park '71"){

lbpSingles = 13;
rbpSingles = 19;
lbpHomeruns = 9;
rbpHomeruns = 17;
}
else if (myClick == "Metropolitan Stdm '71"){

lbpSingles = 8;
rbpSingles = 14;
lbpHomeruns = 3;
rbpHomeruns = 12;
}
else if (myClick == "Shea Stadium '71"){

lbpSingles = 3;
rbpSingles = 3;
lbpHomeruns = 19;
rbpHomeruns = 4;
}
else if (myClick == "Yankee Stadium '71"){

lbpSingles = 8;
rbpSingles = 2;
lbpHomeruns = 12;
rbpHomeruns = 1;
}
else if (myClick == "Tiger Stadium '75"){

lbpSingles = 13;
rbpSingles = 10;
lbpHomeruns = 16;
rbpHomeruns = 13;
}
else if (myClick == "Veterans Stadium '75"){

lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Anaheim Stadium '78"){

lbpSingles = 12;
rbpSingles = 12;
lbpHomeruns = 9;
rbpHomeruns = 9;
}
else if (myClick == "Arlington Stadium '78"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 5;
rbpHomeruns = 5;
}
else if (myClick == "Astrodome '78"){

lbpSingles = 3;
rbpSingles = 3;
lbpHomeruns = 2;
rbpHomeruns = 2;
}
else if (myClick == "Busch Stadium '78"){

lbpSingles = 10;
rbpSingles = 10;
lbpHomeruns = 4;
rbpHomeruns = 4;
}
else if (myClick == "Candlestick Park '78"){

lbpSingles = 0;
rbpSingles = 0;
lbpHomeruns = 5;
rbpHomeruns = 5;
}
else if (myClick == "Comiskey Park '78"){

lbpSingles = 12;
rbpSingles = 12;
lbpHomeruns = 7;
rbpHomeruns = 7;
}
else if (myClick == "County Stadium '78"){

lbpSingles = 15;
rbpSingles = 15;
lbpHomeruns = 10;
rbpHomeruns = 10;
}
else if (myClick == "Dodger Stadium '78"){

lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 12;
rbpHomeruns = 12;
}
else if (myClick == "Exhibition Stdm '78"){

lbpSingles = 11;
rbpSingles = 11;
lbpHomeruns = 9;
rbpHomeruns = 9;
}
else if (myClick == "Fenway Park '78"){

lbpSingles = 17;
rbpSingles = 14;
lbpHomeruns = 9;
rbpHomeruns = 15;
}
else if (myClick == "Fulton Cnty Stdm '78"){

lbpSingles = 13;
rbpSingles = 13;
lbpHomeruns = 20;
rbpHomeruns = 20;
}
else if (myClick == "Jack Murphy Stdm'78"){

lbpSingles = 7;
rbpSingles = 7;
lbpHomeruns = 4;
rbpHomeruns = 4;
}
else if (myClick == "Kingdome '78"){

lbpSingles = 5;
rbpSingles = 5;
lbpHomeruns = 17;
rbpHomeruns = 17;
}
else if (myClick == "Memorial Stadium '78"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 4;
rbpHomeruns = 4;
}
else if (myClick == "Metropolitan Stdm '78"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 6;
rbpHomeruns = 5;
}
else if (myClick == "Municipal Stadium '78"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 3;
rbpHomeruns = 5;
}
else if (myClick == "Oakland Coliseum '78"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 9;
rbpHomeruns = 9;
}
else if (myClick == "Olympic Stadium '78"){

lbpSingles = 3;
rbpSingles = 3;
lbpHomeruns = 5;
rbpHomeruns = 5;
}
else if (myClick == "Riverfront Stdm '78"){

lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 11;
rbpHomeruns = 11;
}
else if (myClick == "Royals Stadium '78"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 3;
rbpHomeruns = 3;
}
else if (myClick == "Shea Stadium '78"){

lbpSingles = 4;
rbpSingles = 4;
lbpHomeruns = 7;
rbpHomeruns = 7;
}
else if (myClick == "Three Rivers Stdm '78"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 12;
rbpHomeruns = 12;
}
else if (myClick == "Tiger Stadium '78"){

lbpSingles = 10;
rbpSingles = 7;
lbpHomeruns = 19;
rbpHomeruns = 16;
}
else if (myClick == "Veterans Stadium '78"){

lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 15;
rbpHomeruns = 15;
}
else if (myClick == "Wrigley Field '78"){

lbpSingles = 18;
rbpSingles = 18;
lbpHomeruns = 18;
rbpHomeruns = 18;
}
else if (myClick == "Yankee Stadium '78"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 15;
rbpHomeruns = 8;
}
else if (myClick == "Royals Stadium '80"){

lbpSingles = 17;
rbpSingles = 20;
lbpHomeruns = 3;
rbpHomeruns = 3;
}
else if (myClick == "Cath. Prep Oval (NeL)"){

lbpSingles = 18;
rbpSingles = 16;
lbpHomeruns = 19;
rbpHomeruns = 18;
}
else if (myClick == "Greenlee Field (NeL)"){

lbpSingles = 8;
rbpSingles = 10;
lbpHomeruns = 14;
rbpHomeruns = 4;
}
else if (myClick == "Griffith Stdm (NeL)"){

lbpSingles = 13;
rbpSingles = 8;
lbpHomeruns = 2;
rbpHomeruns = 1;
}
else if (myClick == "Hilldale Park (NeL)"){

lbpSingles = 6;
rbpSingles = 6;
lbpHomeruns = 13;
rbpHomeruns = 16;
}
else if (myClick == "Mack Park (NeL)"){

lbpSingles = 14;
rbpSingles = 8;
lbpHomeruns = 19;
rbpHomeruns = 18;
}
else if (myClick == "Martin Park (NeL)"){

lbpSingles = 2;
rbpSingles = 2;
lbpHomeruns = 1;
rbpHomeruns = 2;
}
else if (myClick == "Muehlebach Fld (NeL)"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 3;
rbpHomeruns = 3;
}
else if (myClick == "Penmar Park (NeL)"){

lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 17;
rbpHomeruns = 2;
}
else if (myClick == "Rickwood Field (NeL)"){

lbpSingles = 2;
rbpSingles = 1;
lbpHomeruns = 5;
rbpHomeruns = 2;
}
else if (myClick == "Ruppert Stadium (NeL)"){

lbpSingles = 8;
rbpSingles = 8;
lbpHomeruns = 13;
rbpHomeruns = 15;
}
else if (myClick == "Schorling Park (NeL)"){

lbpSingles = 1;
rbpSingles = 1;
lbpHomeruns = 3;
rbpHomeruns = 1;
}
else if (myClick == "South Side Pk (NeL)"){

lbpSingles = 9;
rbpSingles = 9;
lbpHomeruns = 6;
rbpHomeruns = 6;
}
else if (myClick == "Stars Park (NeL)"){

lbpSingles = 16;
rbpSingles = 19;
lbpHomeruns = 12;
rbpHomeruns = 19;
}
else if (myClick == "Terrapin Park (NeL)"){

lbpSingles = 14;
rbpSingles = 14;
lbpHomeruns = 2;
rbpHomeruns = 1;
}
else if (myClick == "Washington Park (NeL)"){

lbpSingles = 17;
rbpSingles = 10;
lbpHomeruns = 1;
rbpHomeruns = 4;
}
else if (myClick == "Yankee Stadium (NeL)"){

lbpSingles = 3;
rbpSingles = 2;
lbpHomeruns = 13;
rbpHomeruns = 8;
}

//90s///////////////////////////////////////////////////////////////////////////////////////////////
else if (myClick == "Anaheim Stadium '90"){//8	8	14	11

	lbpSingles = 5;
	rbpSingles = 5;
	lbpHomeruns = 14;
	rbpHomeruns = 14;
}
else if (myClick == "Arlington Stadium '90"){//8	8	14	11

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Astrodome '97"){//8	8	14	11

	lbpSingles = 2;
	rbpSingles = 2;
	lbpHomeruns = 2;
	rbpHomeruns = 2;
}
else if (myClick == "Bank One Ballpark '99"){//8	8	14	11

	lbpSingles = 10;
	rbpSingles = 13;
	lbpHomeruns = 6;
	rbpHomeruns = 6;
}
else if (myClick == "Busch Stadium '92"){//8	8	14	11

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Camden Yards '96"){//8	8	14	11

	lbpSingles = 9;
	rbpSingles = 6;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Candlestick Park '90"){//8	8	14	11

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Cleveland Stadium '92"){//8	8	14	11

	lbpSingles = 11;
	rbpSingles = 17;
	lbpHomeruns = 13;
	rbpHomeruns = 13;
}
else if (myClick == "Comiskey Park '92"){//8	8	14	11

	lbpSingles = 6;
	rbpSingles = 6;
	lbpHomeruns = 6;
	rbpHomeruns = 6;
}
else if (myClick == "Coors Field '95"){//8	8	14	11

	lbpSingles = 19;
	rbpSingles = 19;
	lbpHomeruns = 19;
	rbpHomeruns = 19;
}
else if (myClick == "County Stadium '90"){//8	8	14	11

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Fenway Park '91"){//8	8	14	11

	lbpSingles = 18;
	rbpSingles = 15;
	lbpHomeruns = 8;
	rbpHomeruns = 12;
}
else if (myClick == "Jacobs Field '94"){//8	8	14	11

	lbpSingles = 6;
	rbpSingles = 9;
	lbpHomeruns = 14;
	rbpHomeruns = 14;
}
else if (myClick == "Kauffman Stadium '93"){//8	8	14	11

	lbpSingles = 14;
	rbpSingles = 14;
	lbpHomeruns = 3;
	rbpHomeruns = 3;
}
else if (myClick == "Kingdome '95"){//8	8	14	11

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 15;
	rbpHomeruns = 9;
}
else if (myClick == "Memorial Stadium '91"){//8	8	14	11

	lbpSingles = 4;
	rbpSingles = 6;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Metrodome '94"){//8	8	14	11

	lbpSingles = 6;
	rbpSingles = 6;
	lbpHomeruns = 6;
	rbpHomeruns = 12;
}
else if (myClick == "Oakland Coliseum '96"){//8	8	14	11

	lbpSingles = 14;
	rbpSingles = 9;
	lbpHomeruns = 2;
	rbpHomeruns = 8;
}
else if (myClick == "Olympic Stadium '94"){//8	8	14	11

	lbpSingles = 14;
	rbpSingles = 8;
	lbpHomeruns = 9;
	rbpHomeruns = 6;
}
else if (myClick == "Pro Player Stdm '99"){//8	8	14	11

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else if (myClick == "Qualcomm Stadium '95"){//8	8	14	11

	lbpSingles = 1;
	rbpSingles = 3;
	lbpHomeruns = 8;
	rbpHomeruns = 14;
}
else if (myClick == "Riverfront Stdm '93"){//8	8	14	11

	lbpSingles = 7;
	rbpSingles = 4;
	lbpHomeruns = 17;
	rbpHomeruns = 17;
}
else if (myClick == "Shea Stadium '98"){//8	8	14	11

	lbpSingles = 7;
	rbpSingles = 4;
	lbpHomeruns = 11;
	rbpHomeruns = 3;
}
else if (myClick == "Skydome '93"){//8	8	14	11

	lbpSingles = 9;
	rbpSingles = 10;
	lbpHomeruns = 6;
	rbpHomeruns = 18;
}
else if (myClick == "Three Rivers Stdm '92"){//8	8	14	11

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 5;
	rbpHomeruns = 5;
}
else if (myClick == "Tiger Stadium '92"){//8	8	14	11

	lbpSingles = 6;
	rbpSingles = 3;
	lbpHomeruns = 14;
	rbpHomeruns = 12;
}
else if (myClick == "Turner Field '97"){//8	8	14	11

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 5;
	rbpHomeruns = 5;
}
else if (myClick == "Veterans Stadium '99"){//8	8	14	11

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 10;
	rbpHomeruns = 10;
}
else if (myClick == "Wrigley Field '92"){//8	8	14	11

	lbpSingles = 14;
	rbpSingles = 11;
	lbpHomeruns = 14;
	rbpHomeruns = 16;
}
else if (myClick == "Yankee Stadium '96"){//8	8	14	11

	lbpSingles = 16;
	rbpSingles = 7;
	lbpHomeruns = 12;
	rbpHomeruns = 7;
}
//60s///////////////////////////////////////////////////////////////////////////////////////////////
else if (myClick == "Anaheim Stadium '67"){//8	8	14	11

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 7;
	rbpHomeruns = 7;
}
else if (myClick == "Astrodome '66"){//8	8	14	11

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 1;
	rbpHomeruns = 2;
}
else if (myClick == "Atlanta Stadium '66"){//8	8	14	11

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 19;
	rbpHomeruns = 16;
}
else if (myClick == "Busch Stadium '67"){//8	8	14	11

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Candlestick Park '64"){

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 18;
	rbpHomeruns = 10;
}
else if (myClick == "Cleveland Stadium '63"){

	lbpSingles = 7;
	rbpSingles = 1;
	lbpHomeruns = 13;
	rbpHomeruns = 7;
}
else if (myClick == "Colt Stadium '63"){

	lbpSingles = 7;
	rbpSingles = 1;
	lbpHomeruns = 1;
	rbpHomeruns = 4;
}
else if (myClick == "Comiskey Park '60"){

	lbpSingles = 12;
	rbpSingles = 9;
	lbpHomeruns = 1;
	rbpHomeruns = 7;
}
else if (myClick == "Connie Mack Stdm '67"){

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 4;
	rbpHomeruns = 10;
}
else if (myClick == "County Stadium '61"){

	lbpSingles = 1;
	rbpSingles = 1;
	lbpHomeruns = 1;
	rbpHomeruns = 8;
}
else if (myClick == "Crosley Field '61"){

	lbpSingles = 10;
	rbpSingles = 14;
	lbpHomeruns = 7;
	rbpHomeruns = 7;
}
else if (myClick == "DC Stadium '66"){

	lbpSingles = 2;
	rbpSingles = 7;
	lbpHomeruns = 8;
	rbpHomeruns = 14;
}
else if (myClick == "Dodger Stadium '63"){

	lbpSingles = 5;
	rbpSingles = 9;
	lbpHomeruns = 1;
	rbpHomeruns = 1;
}
else if (myClick == "Fenway Park '67"){

	lbpSingles = 20;
	rbpSingles = 18;
	lbpHomeruns = 17;
	rbpHomeruns = 20;
}
else if (myClick == "Forbes Field '60"){

	lbpSingles = 12;
	rbpSingles = 12;
	lbpHomeruns = 4;
	rbpHomeruns = 1;
}
else if (myClick == "Memorial Stadium '60"){

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Shea Stadium '64"){

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 4;
	rbpHomeruns = 13;
}
else if (myClick == "Tiger Stadium '63"){

	lbpSingles = 8;
	rbpSingles = 6;
	lbpHomeruns = 19;
	rbpHomeruns = 16;
}
else if (myClick == "Wrigley Field '63"){

	lbpSingles = 4;
	rbpSingles = 13;
	lbpHomeruns = 19;
	rbpHomeruns = 10;
}
else if (myClick == "Yankee Stadium '61"){

	lbpSingles = 7;
	rbpSingles = 2;
	lbpHomeruns = 10;
	rbpHomeruns = 4;
}



}


if (cardSet == '2012'){

	GM_setValue('bats2012playerset', 'Left');

}
else if (cardSet == 'ATG7'){

	GM_setValue('batsATG7playerset', 'Left');

}	
else if (cardSet == '90s'){

	GM_setValue('bats90splayerset', 'Left');

}
else if (cardSet == '60s'){

	GM_setValue('bats60splayerset', 'Left');

}

