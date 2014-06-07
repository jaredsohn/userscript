// ==UserScript==
// @name           Card Chances 1986
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/baseball/1986/players/player.php?*
// @include        http://fantasygames.sportingnews.com/stratomatic*year=1986*
// @include        http://fantasygames.sportingnews.com/stratomatic/*
// @exclude	   http://fantasygames.sportingnews.com/stratomatic/trade/compose_message.html?compose=1 
// ==/UserScript==
//Harrah, Toby, Lynn, Ripken

//Make player card windows larger
var pageAddr, a, href;
pageAddr = window.location.href;
var newLink;
var links2,links3;
var myLink;

var dontRefresh = false;

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

    if (thisLink.href.match(/%20650,%20550/)) {
        		thisLink.href = thisLink.href.replace(/%20650,%20550/, '%20650,%20850');
        	}

    if (thisLink.href.match(/650, 650/)) {
		thisLink.href = thisLink.href.replace(/650, 650/, '650, 850');
	}

    if (thisLink.href.match(/650, 550/)) {
		thisLink.href = thisLink.href.replace(/650, 550/, '650, 850');
	}
   

}

var leagueLinks, leagueLink2s;

var myLink = document.createElement("a");


var leagueLink = document.evaluate("//a[contains(@href,'research.html')]/@href",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (leagueLink.snapshotLength > 0){

	for (var i = 0; i < leagueLink.snapshotLength; i++) {
	leagueLinks = leagueLink.snapshotItem(i);
	leagueLinks = leagueLinks.nodeValue

		if (leagueLinks.match(/pool_id=201/)) {
			var cardSet = 'ATG4';
		}

		if (leagueLinks.match(/pool_id=101/)) {
			var cardSet = '1986';
		


		if (leagueLinks.match(/pool_id=2008/)) {
			var cardSet = '2008';
		}		

		GM_setValue('myPool86', cardSet);		

	}
}
}
else
{

		cardSet = GM_getValue('myPool86', '1986'); 

}
//make player card windows larger




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

}

var hbpOverall = 0;
var walkOverall = 0;
var strikeoutOverall = 0;
var singleOverall = 0;
var doubleOverall = 0;
var tripleOverall = 0;
var hrOverall = 0;
var outOverall = 0;
var gbdpOverall = 0;
var clutchOverall = 0;
var bpdiamondsOverall = 0;
var bestresultsOverall = 0;

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

function myRefresh(){

for (var m = 0; m < 2; m++){


var m2 = m/2;
if (m2 == m2.toFixed()){
	var m3 = m2  +1;	
}

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

if (m%2){
	
	color = "//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/b/text()";//right

}
else
{
	
	color = "//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/b/text()";//left

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



var cardVSLeft = document.evaluate(color, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

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
			//	GM_log("column1_2:" + column1_2 + " column1_3:" + column1_3 + " " + cardVSLeftNewArray[k] + " i: " + i + " k: "+ k + " m3: " + m3);
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

					myClick = GM_getValue('ballpark1986', "Candlestick Park '86");
					bpRatings(myClick);


					mybatsClick = GM_getValue('bats1986', 'Left');	

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

					myClick = GM_getValue('ballpark1986', "Candlestick Park '86");
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


hbpVSRight[m] = hbpChances/108;
hbpVSRight[m] = hbpVSRight[m]*100;
hbpVSRight[m] = hbpVSRight[m].toFixed(2);

hbpOverall = hbpOverall + hbpChances;

walkVSRight[m] = walkChances/108;
walkVSRight[m] = walkVSRight[m]*100;
walkVSRight[m] = walkVSRight[m].toFixed(2);

if (walkVSRight[m].length > 4){

	walkVSRight[m] = walkVSRight[m].substr(0,4);
}

walkOverall = walkOverall + walkChances;

strikeoutVSRight[m] = strikeoutChances/108;
strikeoutVSRight[m] = strikeoutVSRight[m]*100;
strikeoutVSRight[m] = strikeoutVSRight[m].toFixed(2);

if (strikeoutVSRight[m].length > 4){

	strikeoutVSRight[m] = strikeoutVSRight[m].substr(0,4);					
}

strikeoutOverall = strikeoutOverall + strikeoutChances;

singleVSRight[m] = singleChances + rbpsiChancesTotal + siChancesTotal2;
singleVSRight[m] = singleVSRight[m]/108;
singleVSRight[m] = singleVSRight[m]*100;
singleVSRight[m] = singleVSRight[m].toFixed(2);


if (singleVSRight[m].length > 4){

	singleVSRight[m] = singleVSRight[m].substr(0,4);
}

singleOverall = singleOverall + singleChances + rbpsiChancesTotal + siChancesTotal2;


doubleVSRight[m] = doChancesTotal2 + doubleChances;
doubleVSRight[m] = doubleVSRight[m]/108;
doubleVSRight[m] = doubleVSRight[m]*100;
doubleVSRight[m] = doubleVSRight[m].toFixed(2);

if (doubleVSRight[m].length > 4){

	doubleVSRight[m] = doubleVSRight[m].substr(0,4);
}

doubleOverall = doubleOverall + doChancesTotal2 + doubleChances;



tripleVSRight[m] = trChancesTotal2 + tripleChances;
tripleVSRight[m] = tripleVSRight[m]/108;
tripleVSRight[m] = tripleVSRight[m]*100;
tripleVSRight[m] = tripleVSRight[m].toFixed(2);

if (tripleVSRight[m].length > 4){

	tripleVSRight[m] = tripleVSRight[m].substr(0,4);
}

tripleOverall = tripleOverall + trChancesTotal2 + tripleChances;

if (bphrChancesTotal == undefined){

	bphrChancesTotal = 0;

}

hrVSRight[m] = homerunChances + hrChancesTotal2 + rbphrChancesTotal;
hrVSRight[m] = hrVSRight[m]/108;
hrVSRight[m] = hrVSRight[m]*100;
hrVSRight[m] = hrVSRight[m].toFixed(2);



if (hrVSRight[m].length > 4){

	hrVSRight[m] = hrVSRight[m].substr(0,4);
}

hrOverall = hrOverall + homerunChances + hrChancesTotal2 + rbphrChancesTotal;


gbdpVSRight[m] = gbdpChances;
gbdpVSRight[m] = gbdpVSRight[m]/108;
gbdpVSRight[m] = gbdpVSRight[m]*100;
gbdpVSRight[m] = gbdpVSRight[m].toFixed(2);

if (gbdpVSRight[m].length > 4){

	gbdpVSRight[m] = gbdpVSRight[m].substr(0,4);
}

gbdpOverall = gbdpOverall + gbdpChances;

negativeclutchChances = "-" + negativeclutchChances;
clutchVSRight[m] = parseInt(clutchChances) + parseInt(negativeclutchChances);

if (position != null){
	clutchVSRight[m] = "n/a";
}

clutchOverall = clutchOverall + parseInt(clutchChances) + parseInt(negativeclutchChances);

bpdiamondsVSRight[m] = bphrChances;

bpdiamondsOverall = bpdiamondsOverall + bphrChances;



outVSRight[m] = 108 - (hbpChances + walkChances + singleChances + rbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + rbphrChancesTotal);
outVSRight[m] = outVSRight[m]/108;
outVSRight[m] = outVSRight[m]*100;
outVSRight[m] = outVSRight[m].toFixed(2);


if (outVSRight[m].length > 4){

	outVSRight[m] = outVSRight[m].substr(0,4);
}

outOverall = outOverall + hbpChances + walkChances + singleChances + rbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + rbphrChancesTotal;

//Best Results
bestresultsVSRight[m] = strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + rbpLineoutsTotal2 + popoutChances;
bestresultsVSRight[m] = bestresultsVSRight[m]/108;
bestresultsVSRight[m] = bestresultsVSRight[m]*100;
bestresultsVSRight[m] = bestresultsVSRight[m].toFixed(2);

bestresultsOverall = bestresultsOverall + strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + rbpLineoutsTotal2 + popoutChances;

if (position == null){
	bestresultsVSRight[m] = "n/a";
}

}//if (color == " "){
else
{
hbpVSLeft[m] = hbpChances/108;
hbpVSLeft[m] = hbpVSLeft[m]*100;
hbpVSLeft[m] = hbpVSLeft[m].toFixed(2);

hbpOverall = hbpOverall + hbpChances;

walkVSLeft[m] = walkChances/108;
walkVSLeft[m] = walkVSLeft[m]*100;
walkVSLeft[m] = walkVSLeft[m].toFixed(2);

walkOverall = walkOverall + walkChances;

if (walkVSLeft[m].length > 4){

	walkVSLeft[m] = walkVSLeft[m].substr(0,4);
}

strikeoutVSLeft[m] = strikeoutChances/108;
strikeoutVSLeft[m] = strikeoutVSLeft[m]*100;
strikeoutVSLeft[m] = strikeoutVSLeft[m].toFixed(2);

if (strikeoutVSLeft[m].length > 4){

	strikeoutVSLeft[m] = strikeoutVSLeft[m].substr(0,4);					
}

strikeoutOverall = strikeoutOverall + strikeoutChances;


singleVSLeft[m] = singleChances + lbpsiChancesTotal + siChancesTotal2;
singleVSLeft[m] = singleVSLeft[m]/108;
singleVSLeft[m] = singleVSLeft[m]*100;
singleVSLeft[m] = singleVSLeft[m].toFixed(2);


if (singleVSLeft[m].length > 4){

	singleVSLeft[m] = singleVSLeft[m].substr(0,4);
}

singleOverall = singleOverall + singleChances + lbpsiChancesTotal + siChancesTotal2;



doubleVSLeft[m] = doChancesTotal2 + doubleChances;
doubleVSLeft[m] = doubleVSLeft[m]/108;
doubleVSLeft[m] = doubleVSLeft[m]*100;
doubleVSLeft[m] = doubleVSLeft[m].toFixed(2);

if (doubleVSLeft[m].length > 4){

	doubleVSLeft[m] = doubleVSLeft[m].substr(0,4);
}

doubleOverall = doubleOverall + doChancesTotal2 + doubleChances;

tripleVSLeft[m] = trChancesTotal2 + tripleChances;
tripleVSLeft[m] = tripleVSLeft[m]/108;
tripleVSLeft[m] = tripleVSLeft[m]*100;
tripleVSLeft[m] = tripleVSLeft[m].toFixed(2);

if (tripleVSLeft[m].length > 4){

	tripleVSLeft[m] = tripleVSLeft[m].substr(0,4);
}

tripleOverall = tripleOverall + trChancesTotal2 + tripleChances;

if (bphrChancesTotal == undefined){

	bphrChancesTotal = 0;

}

hrVSLeft[m] = homerunChances + hrChancesTotal2 + lbphrChancesTotal;
hrVSLeft[m] = hrVSLeft[m]/108;
hrVSLeft[m] = hrVSLeft[m]*100;
hrVSLeft[m] = hrVSLeft[m].toFixed(2);

if (hrVSLeft[m].length > 4){

	hrVSLeft[m] = hrVSLeft[m].substr(0,4);
}

hrOverall = hrOverall + homerunChances + hrChancesTotal2 + rbphrChancesTotal;

gbdpVSLeft[m] = gbdpChances;
gbdpVSLeft[m] = gbdpVSLeft[m]/108;
gbdpVSLeft[m] = gbdpVSLeft[m]*100;
gbdpVSLeft[m] = gbdpVSLeft[m].toFixed(2);

if (gbdpVSLeft[m].length > 4){

	gbdpVSLeft[m] = gbdpVSLeft[m].substr(0,4);
}

gbdpOverall = gbdpOverall + gbdpChances;

negativeclutchChances = "-" + negativeclutchChances;
clutchVSLeft[m] = parseInt(clutchChances) + parseInt(negativeclutchChances);

clutchOverall = clutchOverall + parseInt(clutchChances) + parseInt(negativeclutchChances);

if (position != null){
	clutchVSLeft[m] = "n/a";
}

bpdiamondsVSLeft[m] = bphrChances;

bpdiamondsOverall = bpdiamondsOverall + bphrChances;



outVSLeft[m] = 108 - (hbpChances + walkChances + singleChances + lbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + lbphrChancesTotal);
outVSLeft[m] = outVSLeft[m]/108;
outVSLeft[m] = outVSLeft[m]*100;
outVSLeft[m] = outVSLeft[m].toFixed(2);

if (outVSLeft[m].length > 4){

	outVSLeft[m] = outVSLeft[m].substr(0,4);
}

outOverall = outOverall + hbpChances + walkChances + singleChances + rbpsiChancesTotal + siChancesTotal2 + doChancesTotal2 + doubleChances + trChancesTotal2 +
hrChancesTotal2 + homerunChances + rbphrChancesTotal;

bestresultsVSLeft[m] = strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + lbpLineoutsTotal2 + popoutChances;
bestresultsVSLeft[m] = bestresultsVSLeft[m]/108;
bestresultsVSLeft[m] = bestresultsVSLeft[m]*100;
bestresultsVSLeft[m] = bestresultsVSLeft[m].toFixed(2);

bestresultsOverall = bestresultsOverall + strikeoutChances + gbdpChances + flyCChances + lineoutChancesTotal2 + lbpLineoutsTotal2 + popoutChances;

if (position == null){
	bestresultsVSLeft[m] = "n/a";
}




}//if (color == " "){


}//for (var j = 0; i < 2; i++){

hbpOverall = hbpOverall/216;
hbpOverall = hbpOverall*100;
hbpOverall = hbpOverall.toFixed(2);

if (hbpOverall.length > 4){

	hbpOverall = hbpOverall.substr(0,4);
}

walkOverall = walkOverall/216;
walkOverall = walkOverall*100;
walkOverall = walkOverall.toFixed(2);

if (walkOverall.length > 4){

	walkOverall = walkOverall.substr(0,4);
}

strikeoutOverall = strikeoutOverall/216;
strikeoutOverall = strikeoutOverall*100;
strikeoutOverall = strikeoutOverall.toFixed(2);

if (strikeoutOverall.length > 4){

	strikeoutOverall = strikeoutOverall.substr(0,4);
}

singleOverall = singleOverall/216;
singleOverall = singleOverall*100;
singleOverall = singleOverall.toFixed(2);

if (singleOverall.length > 4){

	singleOverall = singleOverall.substr(0,4);
}

doubleOverall = doubleOverall/216;
doubleOverall = doubleOverall*100;
doubleOverall = doubleOverall.toFixed(2);

if (doubleOverall.length > 4){

	doubleOverall = doubleOverall.substr(0,4);
}

tripleOverall = tripleOverall/216;
tripleOverall = tripleOverall*100;
tripleOverall = tripleOverall.toFixed(2);

if (tripleOverall.length > 4){

	tripleOverall = tripleOverall.substr(0,4);
}

hrOverall = hrOverall/216;
hrOverall = hrOverall*100;
hrOverall = hrOverall.toFixed(2);

if (hrOverall.length > 4){

	hrOverall = hrOverall.substr(0,4);
}

outOverall = 216 - outOverall;
outOverall = outOverall/216;
outOverall = outOverall*100;
outOverall = outOverall.toFixed(2);

if (outOverall.length > 4){

	outOverall = outOverall.substr(0,4);
}

gbdpOverall = gbdpOverall/216;
gbdpOverall = gbdpOverall*100;
gbdpOverall = gbdpOverall.toFixed(2);

if (gbdpOverall.length > 4){

	gbdpOverall = gbdpOverall.substr(0,4);
}

bestresultsOverall = bestresultsOverall/216;
bestresultsOverall = bestresultsOverall*100;
bestresultsOverall = bestresultsOverall.toFixed(2);

if (bestresultsOverall.length > 4){

	bestresultsOverall = bestresultsOverall.substr(0,4);
}


if (position == null){
	bestresultsOverall = "n/a";
}

if (position != null){
	clutchOverall = "n/a";
}

}//myRefresh

  var thisURL = document.URL;

GM_log(cardSet);
if((cardSet == '1986') && (thisURL.match(/year=1986/))){

postResults();

}

document.addEventListener('click', function(event) {

clickFlag = true;

if (event.target.parentNode == "[object XPCNativeWrapper [object HTMLTableCellElement]]") {

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


if (event.target.parentNode == "[object XPCNativeWrapper [object HTMLSelectElement]]") {

	if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){

		bpRatings(myClick);
		if (dontRefresh == false){
		
			location.reload(true)
			GM_setValue('ballpark1986', myClick);
			//alert(myClick);
		}
		else
		{
		
			dontRefresh = false;

		}
	}
	else
	{
		if (dontRefresh == false){

			location.reload(true)
			GM_setValue('bats1986', myClick);
			mybatsClick = myClick;
		}
		else
		{
			dontRefresh = false;
		}
	}


	//alert(event.target.text);
	//alert(myClick);

}


}, true);

function postResults(){

var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
	"Fenway Park '86":	'40',
	"Astrodome '86":	'41',
	"Shea Stadium '86":	'42',
	"Yankee Stadium '86":     '69',
	"Memorial Stadium '86":     '70',
	"Anaheim Stadium '86":     '71',
	"Comiskey Park '86":     '72',
	"Cleveland Stadium '86":     '73',
	"Tiger Stadium '86":     '74',
	"Royals Stadium '86":     '75',
	"County Stadium '86":     '76',
	"Metrodome '86":     '77',
	"Oakland Coliseum '86":     '78',
	"Kingdome '86":     '79',
	"Arlington Stadium '86":     '80',
	"Exhibition Stdm '86":     '81',
	"Fulton Cnty Stdm '86":     '82',
	"Wrigley Field '86":     '83',
	"Riverfront Stdm '86":     '84',
	"Dodger Stadium '86":	'85',
	"Olympic Stadium '86":     '86',
	"Veterans Stadium '86":     '87',
	"Three Rivers Stdm '86":     '88',
	"Jack Murphy Stdm '86":     '89',
	"Candlestick Park '86":     '90',
	"Busch Stadium '86":     '91',


};

var unSelect = document.createElement('select');

	var accountCount = 0;



	for (var key in bp) {
		if (GM_getValue('ballpark1986', "Candlestick Park '86") == key){

			unSelect.innerHTML += '<option selected>'+key+'</option>';
		}
		else
		{
			unSelect.innerHTML += '<option value="">'+key+'</option>';
		}

		accountCount++;
	}

var theBat = {'Right':'0','Left':'1',};
var theBatDropDown = document.createElement('select');

	var accountCount2 = 0;

	for (var key2 in theBat) {

		if (GM_getValue('bats1986', 'Left') == key2){
		
			theBatDropDown.innerHTML += '<option selected>'+key2+'</option>';
			mybatsClick = key2;
			

		}
		else
		{
			theBatDropDown.innerHTML += '<option value="">'+key2+'</option>';
	
		}
		
		accountCount2++;
	}


var locateCopyright = document.evaluate("//td/a[@onClick='window.close();'][@class='text10']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

locateCopyright = locateCopyright.snapshotItem(0);

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


var myElement = document.createElement("baseballsimulator");
myElement.innerHTML = '<tr><td class="text10" valign="top" colspan="6" align="right"><a href="#" onClick="window.close();" class="text10">close window</a><BR><BR></td></tr><tr><table class="title" width="330" border="0" cellpadding=2 cellspacing=1 border=0 align="center">Player Card Chances</td></tr></table><table class="text10" width="330" border="0" cellpadding=2 cellspacing=1 border=0 align="center"><tr><td class="text10" align="left">Ballpark:</td><tr><td align="left"><form name="selector2" onSubmit="go2()"><select name="select2" onChange="go2()" class="text10">' + unSelect.innerHTML + '</select></form></td><br><br><table class="datatab_nowidth cleft tright" width="330" border="0" cellpadding=2 cellspacing=1 border=0 align="center"><tr class="databox_header black"><td align="left">Result</td><td class="alttitle" align="left">Vs. Left</td><td class="alttitle" align="left">Vs. Right</td><td class="alttitle" align="left">Overall</td></tr><TR class="odd"><td class="text10" align="left">HBP</a></td><td class="text10" align="left">' + hbpVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + hbpVSRight[myTest2] + '</td><td class="text10" align="left">' + hbpOverall + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Walk</a></td><td class="text10" align="left">' + walkVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + walkVSRight[myTest2] + '</td><td class="text10" align="left">' + walkOverall + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Strikeout</a></td><td class="text10" align="left">' + strikeoutVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + strikeoutVSRight[myTest2] + '</td><td class="text10" align="left">' + strikeoutOverall + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Single</a></td><td class="text10" align="left">' + singleVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + singleVSRight[myTest2] + '</td><td class="text10" align="left">' + singleOverall + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Double</a></td><td class="text10" align="left">' + doubleVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + doubleVSRight[myTest2] + '</td><td class="text10" align="left">' + doubleOverall + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Triple</a></td><td class="text10" align="left">' + tripleVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + tripleVSRight[myTest2] + '</td><td class="text10" align="left">' + tripleOverall + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Home Run</a></td><td class="text10" align="left">' + hrVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + hrVSRight[myTest2] + '</td><td class="text10" align="left">' + hrOverall + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Out</a></td><td class="text10" align="left">' + outVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + outVSRight[myTest2] + '</td><td class="text10" align="left">' + outOverall + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">GB-DP</a></td><td class="text10" align="left">' + gbdpVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + gbdpVSRight[myTest2] + '</td><td class="text10" align="left">' + gbdpOverall + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Clutch Rating</a></td><td class="text10" align="left">' + clutchVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + clutchVSRight[myTest2] + '</td><td class="text10" align="left">' + clutchOverall + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Ballpark Diamonds</a></td><td class="text10" align="left">' + bpdiamondsVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + bpdiamondsVSRight[myTest2] + '</td><td class="text10" align="left">' + bpdiamondsOverall + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Best Results</a></td><td class="text10" align="left">' + bestresultsVSLeft[myTest2 - 1] + '</td><td class="text10" align="left">' + bestresultsVSRight[myTest2] + '</td><td class="text10" align="left">' + bestresultsOverall + '</td></TR></table><br>';



	locateCopyright.parentNode.replaceChild(myElement,locateCopyright);


}


function bpRatings(myClick){


if (myClick == "Fenway Park '86"){ //1-19	1-15	1-7	1-10

	lbpSingles = 19;
	rbpSingles = 15;
	lbpHomeruns = 7;
	rbpHomeruns = 10;
}
else if (myClick == "Astrodome '86"){ //1-10	1-10	1-2	1-2

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 2;
	rbpHomeruns = 2;
}
else if (myClick == "Shea Stadium '86"){ //1-9	1-6	1-9	1-9

	lbpSingles = 9;
	rbpSingles = 6;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Yankee Stadium '86"){ //1-7	1-7	1-9	1-8

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 9;
	rbpHomeruns = 8;
}
else if (myClick == "Memorial Stadium '86"){ //1-3	1-3	1-11	1-11

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Anaheim Stadium '86"){ //1-5	1-5	1-12	1-12

	lbpSingles = 5;
	rbpSingles = 5;
	lbpHomeruns = 12;
	rbpHomeruns = 12;
}
else if (myClick == "Comiskey Park '86"){ //1-9	1-9	1-4	1-4

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else if (myClick == "Cleveland Stadium '86"){//1-11	1-11	1-8	1-11

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 8;
	rbpHomeruns = 11;
}
else if (myClick == "Tiger Stadium '86"){//1-2	1-1	1-14	1-11

	lbpSingles = 2;
	rbpSingles = 1;
	lbpHomeruns = 14;
	rbpHomeruns = 11;
}
else if (myClick == "Royals Stadium '86"){//1-11	1-11	1-3	1-3

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 3;
	rbpHomeruns = 3;
}
else if (myClick == "County Stadium '86"){//1-6	1-6	1-5	1-5

	lbpSingles = 6;
	rbpSingles = 6;
	lbpHomeruns = 5;
	rbpHomeruns = 5;
}
else if (myClick == "Metrodome '86"){ //1-16	1-13	1-11	1-11

	lbpSingles = 16;
	rbpSingles = 13;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Oakland Coliseum '86"){ //1-3	1-3	1-5	1-5

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 5;
	rbpHomeruns = 5;
}
else if (myClick == "Kingdome '86"){//1-5	1-5	1-17	1-17

	lbpSingles = 5;
	rbpSingles = 5;
	lbpHomeruns = 17;
	rbpHomeruns = 17;
}
else if (myClick == "Arlington Stadium '86"){//1-11	1-11	1-11	1-11

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Exhibition Stdm '86"){//1-9	1-9	1-11	1-11

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Fulton Cnty Stdm '86"){//1-13	1-13	1-13	1-13

	lbpSingles = 13;
	rbpSingles = 13;
	lbpHomeruns = 13;
	rbpHomeruns = 13;
}
else if (myClick == "Wrigley Field '86"){//1-9	1-9	1-14	1-14

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 14;
	rbpHomeruns = 14;
}
else if (myClick == "Riverfront Stdm '86"){//1-12	1-12	1-11	1-11

	lbpSingles = 12;
	rbpSingles = 12;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Dodger Stadium '86"){//1-11	1-11	1-6	1-6

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 6;
	rbpHomeruns = 6;
}
else if (myClick == "Olympic Stadium '86"){//1-4	1-4	1-4	1-4

	lbpSingles = 4;
	rbpSingles = 4;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else if (myClick == "Veterans Stadium '86"){//1-8	1-8	1-9	1-9

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Three Rivers Stdm '86"){//1-10	1-10	1-9	1-9

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Jack Murphy Stdm '86"){//1-4	1-4	1-14	1-14

	lbpSingles = 4;
	rbpSingles = 4;
	lbpHomeruns = 14;
	rbpHomeruns = 14;
}
else if (myClick == "Candlestick Park '86"){//1-4	1-4	1-8	1-8

	lbpSingles = 4;
	rbpSingles = 4;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Busch Stadium '86"){//1-11	1-11	1-4	1-4

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else
{

	//alert(myClick);
	dontRefresh = true;


}
}

GM_setValue('bats1986', 'Left');
