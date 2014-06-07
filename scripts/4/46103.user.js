// ==UserScript==
// @name           Card Chances 80s cardset
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/baseball/stratomatic/80s/league/player.html?*
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/80s/draft*
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/80s/about*
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/80s/*
// @include        http://fantasygames.sportingnews.com/baseball/stratomatic/70s/league/player.html?*
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/70s/draft*
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/70s/about*
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/70s/*
// ==/UserScript==

//to do:  lbpSingles only being used.

//Make player card windows larger
var pageAddr, a, href;
pageAddr = window.location.href;
var newLink;
var links2,links3;
var myLink;

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
    if (thisLink.href.match(/%20650,%20650/)) {
        		thisLink.href = thisLink.href.replace(/%20650,%20650/, '%20650,%20850');
        	}

    if (thisLink.href.match(/650, 650/)) {
		thisLink.href = thisLink.href.replace(/650, 650/, '650, 850');
	}

    if (thisLink.href.match(/650, 550/)) {
		thisLink.href = thisLink.href.replace(/650, 550/, '650, 850');
	
	}

    //check to see what set the links are for

    if (thisLink.href.match(/70s/)) {
		var cardSet = '70s';
	}    

    if (thisLink.href.match(/80s/)) {
		var cardSet = '80s';
	}     

}
//make player card windows larger


var hbpVSLeft = new Array(10);
var hbpVSRight = new Array(10);
var walkVSLeft= new Array(10);
var walkVSRight= new Array(10);
var strikeoutVSLeft= new Array(10);
var strikeoutVSRight= new Array(10);
var singleVSLeft= new Array(10);
var singleVSRight= new Array(10);
var doubleVSLeft= new Array(10);
var doubleVSRight= new Array(10);
var tripleVSLeft= new Array(10);
var tripleVSRight= new Array(10);
var hrVSLeft= new Array(10);
var hrVSRight= new Array(10);
var outVSLeft= new Array(10);
var outVSRight= new Array(10);
var gbdpVSLeft= new Array(10);
var gbdpVSRight= new Array(10);
var clutchVSLeft= new Array(10);
var clutchVSRight= new Array(10);
var bpdiamondsVSLeft= new Array(10);
var bpdiamondsVSRight= new Array(10);
var bestresultsVSLeft= new Array(10);
var bestresultsVSRight= new Array(10);

var hbpOverall = new Array(10);
var walkOverall = new Array(10);
var strikeoutOverall = new Array(10);
var singleOverall = new Array(10);
var doubleOverall  = new Array(10);
var tripleOverall = new Array(10);
var hrOverall  = new Array(10);
var outOverall = new Array(10);
var gbdpOverall = new Array(10);
var clutchOverall = new Array(10);
var bpdiamondsOverall = new Array(10);
var bestresultsOverall = new Array(10);

for (var i = 0; i < 10; i++){

 hbpVSLeft[i] = 0;
 hbpVSRight[i] = 0;
 walkVSLeft[i] = 0;
 walkVSRight[i]= 0;
 strikeoutVSLeft[i]= 0;
 strikeoutVSRight[i]= 0;
 singleVSLeft[i]= 0;
 singleVSRight[i]= 0;
 doubleVSLeft[i]= 0;
 doubleVSRight[i]= 0;
 tripleVSLeft[i]= 0;
 tripleVSRight[i]= 0;
 hrVSLeft[i]= 0;
 hrVSRight[i]= 0;;
 outVSLeft[i]= 0;
 outVSRight[i]= 0;
 gbdpVSLeft[i]= 0;
 gbdpVSRight[i]= 0;
 clutchVSLeft[i]= 0;
 clutchVSRight[i]= 0;
 bpdiamondsVSLeft[i]= 0;
 bpdiamondsVSRight[i]= 0;
 bestresultsVSLeft[i]= 0;
 bestresultsVSRight[i]= 0;

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

for (var m = 0; m < 10; m++){


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
if(cardSet == '80s'){

	if (m%2){
	
		//color = "id('card_" + m2.toFixed() + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/text()|id('card_" + m2.toFixed() + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/b/text()";//right
		color = "id('card_" + m3 + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/text()|id('card_" + m2.toFixed() + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/b/text()";//right		

	}
	else
	{
	
		color = "id('card_" + m3 + "')//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/text()|id('card_" + m3 + "')//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/b/text()";//left

	}
}
else if(cardSet == '70s'){

	if (m%2){
		color = "id('card_" + m2.toFixed() + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/text()|id('card_" + m2.toFixed() + "')//tr/td[@class='text9'][@bgcolor='#FFEEEE']/table/tbody/tr/td/b/text()";//right	
		//color = "//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#ffeeee']/table/tbody/tr/td/b/text()";//right

	}
	else
	{
		color = "id('card_" + m3 + "')//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/text()|id('card_" + m3 + "')//tr/td[@class='text9'][@bgcolor='#DDEEFF']/table/tbody/tr/td/b/text()";//left	
		//color = "//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/text()|//tr/td[@class='text9'][@bgcolor='#ddeeff']/table/tbody/tr/td/b/text()";//left

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

/*
if (m%2 == false)
{
	hbpOverall = 0;
	walkOverall = 0;
	strikeoutOverall = 0;
	singleOverall = 0;
	doubleOverall = 0;
	tripleOverall = 0;
	hrOverall = 0;
	outOverall = 0;
	gbdpOverall = 0;
	clutchOverall = 0;
	bpdiamondsOverall = 0;
	bestresultsOverall = 0;
}
*/



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

				if (m3==5){
				
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
		
					if(cardSet == "80s"){

						myClick = GM_getValue('ballpark80s', 'Memorial Stadium');
						bpRatings(myClick);

						mybatsClick = GM_getValue('bats80s', 'Left');	
					}
					else if(cardSet == "70s"){

						myClick = GM_getValue('ballpark70s', 'Anaheim Stadium');
						bpRatings(myClick);

						mybatsClick = GM_getValue('bats70s', 'Left');						



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

					if (cardSet == "80s"){	

						myClick = GM_getValue('ballpark80s', 'Memorial Stadium');
						bpRatings(myClick);
					}
					else if(cardSet == "70s"){

						myClick = GM_getValue('ballpark70s', 'Anaheim Stadium');
						bpRatings(myClick);

					}

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

//alert("right: " +  strikeoutOverall[m3]+ " m3: " + m3);

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

//alert("trChancesTotal2: " + trChancesTotal2 + " tripleChances: " + tripleChances);

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

//alert("left: " +  strikeoutOverall[m3] + " m3: " + m3);

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

hrOverall[m3] = hrOverall[m3] + homerunChances + hrChancesTotal2 + rbphrChancesTotal;

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

for (var m = 0; m < 2; m++){

hbpOverall[m3] = hbpOverall[m3]/216;
hbpOverall[m3] = hbpOverall[m3]*100;
hbpOverall[m3] = hbpOverall[m3].toFixed(2);

if (hbpOverall[m3].length > 4){

	hbpOverall[m3] = hbpOverall[m3].substr(0,4);
}

walkOverall[m3] = walkOverall[m3]/216;
walkOverall[m3] = walkOverall[m3]*100;
walkOverall[m3] = walkOverall[m3].toFixed(2);

if (walkOverall[m3].length > 4){

	walkOverall[m3] = walkOverall[m3].substr(0,4);
}

strikeoutOverall[m3] = strikeoutOverall[m3]/216;
strikeoutOverall[m3] = strikeoutOverall[m3]*100;
strikeoutOverall[m3] = strikeoutOverall[m3].toFixed(2);

if (strikeoutOverall[m3].length > 4){

	strikeoutOverall[m3] = strikeoutOverall[m3].substr(0,4);
}



singleOverall[m3] = singleOverall[m3]/216;
singleOverall[m3] = singleOverall[m3]*100;
singleOverall[m3] = singleOverall[m3].toFixed(2);

if (singleOverall[m3].length > 4){

	singleOverall[m3] = singleOverall[m3].substr(0,4);
}

doubleOverall[m3] = doubleOverall[m3]/216;
doubleOverall[m3] = doubleOverall[m3]*100;
doubleOverall[m3] = doubleOverall[m3].toFixed(2);

if (doubleOverall[m3].length > 4){

	doubleOverall[m3] = doubleOverall[m3].substr(0,4);
}

tripleOverall[m3] = tripleOverall[m3]/216;
tripleOverall[m3] = tripleOverall[m3]*100;
tripleOverall[m3] = tripleOverall[m3].toFixed(2);

if (tripleOverall[m3].length > 4){

	tripleOverall[m3] = tripleOverall[m3].substr(0,4);
}

hrOverall[m3] = hrOverall[m3]/216;
hrOverall[m3] = hrOverall[m3]*100;
hrOverall[m3] = hrOverall[m3].toFixed(2);

if (hrOverall[m3].length > 4){

	hrOverall[m3] = hrOverall[m3].substr(0,4);
}

outOverall[m3] = 216 - outOverall[m3];
outOverall[m3] = outOverall[m3]/216;
outOverall[m3] = outOverall[m3]*100;
outOverall[m3] = outOverall[m3].toFixed(2);

if (outOverall[m3].length > 4){

	outOverall[m3] = outOverall[m3].substr(0,4);
}

gbdpOverall[m3] = gbdpOverall[m3]/216;
gbdpOverall[m3] = gbdpOverall[m3]*100;
gbdpOverall[m3] = gbdpOverall[m3].toFixed(2);

if (gbdpOverall[m3].length > 4){

	gbdpOverall[m3] = gbdpOverall[m3].substr(0,4);
}

bestresultsOverall[m3] = bestresultsOverall[m3]/216;
bestresultsOverall[m3] = bestresultsOverall[m3]*100;
bestresultsOverall[m3] = bestresultsOverall[m3].toFixed(2);

if (bestresultsOverall[m3].length > 4){

	bestresultsOverall[m3] = bestresultsOverall[m3].substr(0,4);
}


if (position == null){
	bestresultsOverall[m3] = "n/a";
}

if (position != null){
	clutchOverall[m3] = "n/a";
}

}

}//myRefresh
postResults();


document.addEventListener('click', function(event) {

clickFlag = true;

if (event.target.parentNode == "[object XPCNativeWrapper [object HTMLTableCellElement]]" ||  event.target.parentNode == "[object XrayWrapper [object HTMLTableCellElement]]"|| event.target.parentNode == "[object HTMLSelectElement]"|| event.target.parentNode == "[object HTMLTableCellElement]") {

	myTest = event.target.parentNode.innerHTML;
		
	myTest = myTest.substring(myTest.indexOf("showCard") + 9,myTest.indexOf("showCard") + 10);


//	alert(myTest + " " + event.target.parentNode);

	postResults();
}


myClick = event.target.innerHTML;



if (event.target.parentNode == "[object XPCNativeWrapper [object HTMLSelectElement]]" || event.target.parentNode == "[object XrayWrapper [object HTMLSelectElement]]" || event.target.parentNode == "[object HTMLSelectElement]") {


	if(cardSet == "80s"){
			if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){

			location.reload(true)
			bpRatings(myClick);
			GM_setValue('ballpark80s', myClick);
		}
		else
		{
			//location.reload(true)
			//GM_setValue('bats80s', myClick);
			//mybatsClick = myClick;
			//location.reload(true)
			//bpRatings(myClick);
			//GM_setValue('ballpark80s', myClick);
		}

	}
	else if(cardSet == "70s"){
			if ((event.target.innerHTML != "Left") && (event.target.innerHTML != "Right") && (event.target.innerHTML != '<option selected="selected">Right</option><option selected="selected">Left</option>')){

			location.reload(true)
			bpRatings(myClick);
			GM_setValue('ballpark70s', myClick);
		}
		else
		{
			//location.reload(true)
			//GM_setValue('bats70s', myClick);
			//mybatsClick = myClick;
			//location.reload(true)
			//bpRatings(myClick);
			//GM_setValue('ballpark70s', myClick);
		}


	}
}


}, true);

function postResults(){

if(cardSet == "80s"){

var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
	'Memorial Stadium':     '0',
	'Fenway Park':     '1',
	'Cleveland Stadium':     '2',
	'Tiger Stadium':     '3',
	'County Stadium':     '4',
	'Yankee Stadium':     '5',
	'Exhibition Stadium':     '6',
	'Anaheim Stadium':     '7',
	'Comiskey Park':     '8',
	'Royals Stadium':     '9',
	'Metrodome':     '10',
	'Oakland Coliseum':     '11',
	'Kingdome':     '12',
	'Arlington Stadium':     '13',
	'Wrigley Field':     '14',
	'Olympic Stadium':     '15',
	'Shea Stadium':     '16',
	'Veterans Stadium':     '17',
	'Three Rivers Stadium':     '18',
	'Busch Stadium':     '19',
	'Fulton County Stad.':     '20',
	'Riverfront Stadium':     '21',
	'Astrodome':     '22',
	'Dodger Stadium':     '23',
	'Jack Murphy Stadium':     '24',
	'Candlestick Park':     '25',

};

}
else if(cardSet == "70s"){

var bp = {
	// Ballpark        BallparkId
	// ----------   -------------------
	'Anaheim Stadium':     '2',
	'Arlington Stadium':     '11',
	'Astrodome':     '15',
	'Busch Stadium':     '23',
	'Candlestick Park':     '22',
	'Cleveland Municipal':     '4',
	'Comiskey Park':     '3',
	'County Stadium':     '7',
	'Dodger Stadium':     '16',
	'Fenway Park':     '1',
	'Fulton County Stadium':     '12',
	'Jack Murphy Stadium':     '21',
	'Jarry Park':     '17',
	'Memorial Stadium':     '0',
	'Metropolitan Stadium':     '8',
	'Oakland Coliseum':     '10',
	'Riverfront Stadium':     '14',
	'Royals Stadium':     '6',
	'Shea Stadium':     '18',
	'Three Rivers Stadium':     '20',
	'Tiger Stadium':     '5',
	'Veteran\'s Stadium':     '19',
	'Wrigley Field':     '13',
	'Yankee Stadium':     '9',


};	


}

var unSelect = document.createElement('select');

	var accountCount = 0;



	for (var key in bp) {

		if(cardSet=="80s"){

			if (GM_getValue('ballpark80s', 'Memorial Stadium') == key){

				unSelect.innerHTML += '<option selected>'+key+'</option>';
			}
			else
			{
				unSelect.innerHTML += '<option value="">'+key+'</option>';
			}
		}
		else if(cardSet=="70s"){

			
			if (GM_getValue('ballpark70s', 'Anaheim Stadium') == key){

				unSelect.innerHTML += '<option selected>'+key+'</option>';
			}
			else
			{
				unSelect.innerHTML += '<option value="">'+key+'</option>';
			}


		}		

		accountCount++;
	}

var theBat = {'Right':'0','Left':'1',};
var theBatDropDown = document.createElement('select');

	var accountCount2 = 0;

	for (var key2 in theBat) {

		if(cardSet == "80s"){

			if (GM_getValue('bats80s', 'Left') == key2){
		
				theBatDropDown.innerHTML += '<option selected>'+key2+'</option>';
				mybatsClick = key2;
			

			}
			else
			{
				theBatDropDown.innerHTML += '<option value="">'+key2+'</option>';
	
			}
		}
		else if(cardSet == "70s"){

			if (GM_getValue('bats70s', 'Left') == key2){
		
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
/*
if(cardSet == "80s"){

	var locateCopyright = document.evaluate("id('card_" + myTest + "')//td/a",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

}
else if(cardSet == "70s"){

	var locateCopyright = document.evaluate("id('card_" + myTest + "')//td/a",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


}
*/

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
if(cardSet == "80s"){

myElement.innerHTML = '<tr><td class="text10" valign="top" colspan="6" align="right"><a href="#" onClick="window.close();" class="text10">close window</a><BR><BR></td></tr><table width="300" border="0" cellpadding=2 cellspacing=0 border=0 align="center"><tr><td class="title" colspan="40">Player Probability Results</td></tr><tr><td class="text10" align="left">Ballpark:</td></tr><td align="left"><form name="selector2" onSubmit="go2()"><select name="select2" onChange="go2()" class="text10">' + unSelect.innerHTML + '</select></form></td><tr align="left"><td class="alttitle" align="left">Result</td><td class="alttitle" align="left">Vs. Left</td><td class="alttitle" align="left">Vs. Right</td></tr><TR align="left"><td class="text10" align="left">HBP</a></td><td class="text10" align="left">' + hbpVSLeft[myTest2] + '</td><td class="text10" align="left">' + hbpVSRight[myTest2] + '</td></TR><TR class="altrow" align="left"><td class="text10" align="left">Walk</a></td><td class="text10" align="left">' + walkVSLeft[myTest2] + '</td><td class="text10 "align="left">' + walkVSRight[myTest2] + '</td></TR><TR class="text10" align="left"><td class="text10" align="left">Strikeout</a></td><td class="text10" align="left">' + strikeoutVSLeft[myTest2] + '</td><td class="text10" align="left">' + strikeoutVSRight[myTest2] + '</td></TR><TR class="altrow" align="left"><td class="text10" align="left">Single</a></td><td class="text10" align="left">' + singleVSLeft[myTest2] + '</td><td class="text10" align="left">' + singleVSRight[myTest2] + '</td></TR><TR class="text10" align="left"><td class="text10" align="left">Double</a></td><td class="text10" align="left">' + doubleVSLeft[myTest2] + '</td><td class="text10" align="left">' + doubleVSRight[myTest2] + '</td></TR><TR class="altrow" align="left"><td class="text10" align="left">Triple</a></td><td class="text10" align="left">' + tripleVSLeft[myTest2] + '</td><td class="text10" align="left">' + tripleVSRight[myTest2] + '</td></TR><TR class="text10" align="left"><td class="text10" align="left">Home Run</a></td><td class="text10" align="left">' + hrVSLeft[myTest2] + '</td><td class="text10" align="left">' + hrVSRight[myTest2] + '</td></TR><TR class="altrow" align="left"><td class="text10" align="left">Out</a></td><td class="text10" align="left">' + outVSLeft[myTest2] + '</td><td class="text10" align="left">' + outVSRight[myTest2] + '</td></TR><TR class="text10" align="left"><td class="text10" align="left">GB-DP</a></td><td class="text10" align="left">' + gbdpVSLeft[myTest2] + '</td><td class="text10" align="left">' + gbdpVSRight[myTest2] + '</td></TR><TR class="altrow" align="left"><td class="text10" align="left">Clutch Rating</a></td><td class="text10" align="left">' + clutchVSLeft[myTest2] + '</td><td class="text10" align="left">' + clutchVSRight[myTest2] + '</td></TR><TR class="text10" align="left"><td class="text10" align="left">Ballpark Diamonds</a></td><td class="text10" align="left">' + bpdiamondsVSLeft[myTest2] + '</td><td class="text10" align="left">' + bpdiamondsVSRight[myTest2] + '</td></TR><TR class="altrow" align="left"><td class="text10" align="left">Best Results</a></td><td class="text10" align="left">' + bestresultsVSLeft[myTest2] + '</td><td class="text10" align="left">' + bestresultsVSRight[myTest2] +'</td></TR><br>';
}
else if(cardSet == "70s"){

myElement.innerHTML = '<tr><td class="text10" valign="top" colspan="6" align="right"><a href="#" onClick="window.close();" class="text10">close window</a><BR><BR></td></tr><table width="300" border="0" cellpadding=2 cellspacing=0 border=0 align="center"><tr><td class="title" colspan="40">Player Probability Results</td></tr><tr><td class="text10" align="left">Ballpark:</td></tr><td align="left"><form name="selector2" onSubmit="go2()"><select name="select2" onChange="go2()" class="text10">' + unSelect.innerHTML + '</select></form></td><tr class="databox_header black" align="left"><td class="alttitle" align="left">Result</td><td class="alttitle" align="left">Vs. Left</td><td class="alttitle" align="left">Vs. Right</td></tr><TR class="odd" align="left"><td class="text10" align="left">HBP</a></td><td class="text10" align="left">' + hbpVSLeft[myTest2] + '</td><td class="text10" align="left">' + hbpVSRight[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Walk</a></td><td class="text10" align="left">' + walkVSLeft[myTest2] + '</td><td class="text10 "align="left">' + walkVSRight[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Strikeout</a></td><td class="text10" align="left">' + strikeoutVSLeft[myTest2] + '</td><td class="text10" align="left">' + strikeoutVSRight[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Single</a></td><td class="text10" align="left">' + singleVSLeft[myTest2] + '</td><td class="text10" align="left">' + singleVSRight[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Double</a></td><td class="text10" align="left">' + doubleVSLeft[myTest2] + '</td><td class="text10" align="left">' + doubleVSRight[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Triple</a></td><td class="text10" align="left">' + tripleVSLeft[myTest2] + '</td><td class="text10" align="left">' + tripleVSRight[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Home Run</a></td><td class="text10" align="left">' + hrVSLeft[myTest2] + '</td><td class="text10" align="left">' + hrVSRight[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Out</a></td><td class="text10" align="left">' + outVSLeft[myTest2] + '</td><td class="text10" align="left">' + outVSRight[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">GB-DP</a></td><td class="text10" align="left">' + gbdpVSLeft[myTest2] + '</td><td class="text10" align="left">' + gbdpVSRight[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Clutch Rating</a></td><td class="text10" align="left">' + clutchVSLeft[myTest2] + '</td><td class="text10" align="left">' + clutchVSRight[myTest2] + '</td></TR><TR class="odd" align="left"><td class="text10" align="left">Ballpark Diamonds</a></td><td class="text10" align="left">' + bpdiamondsVSLeft[myTest2] + '</td><td class="text10" align="left">' + bpdiamondsVSRight[myTest2] + '</td></TR><TR class="even" align="left"><td class="text10" align="left">Best Results</a></td><td class="text10" align="left">' + bestresultsVSLeft[myTest2] + '</td><td class="text10" align="left">' + bestresultsVSRight[myTest2] +'</td></TR><br>';


}		




	locateCopyright2.parentNode.replaceChild(myElement,locateCopyright2);
	}//for (var i = 0; i < locateCopyright.snapshotLength; i++) {

}


function bpRatings(myClick){

if(cardSet == "80s"){	

if (myClick == "Memorial Stadium"){

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 10;
	rbpHomeruns = 10;
}
else if (myClick == "Fenway Park"){

	lbpSingles = 19;
	rbpSingles = 16;
	lbpHomeruns = 5;
	rbpHomeruns = 9;
}
else if (myClick == "Cleveland Stadium"){

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 4;
	rbpHomeruns = 7;
}
else if (myClick == "Tiger Stadium"){

	lbpSingles = 2;
	rbpSingles = 10;
	lbpHomeruns = 16;
	rbpHomeruns = 13;
}
else if (myClick == "County Stadium"){

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Yankee Stadium"){

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 10;
	rbpHomeruns = 10;
}
else if (myClick == "Exhibition Stadium"){

	lbpSingles = 6;
	rbpSingles = 6;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Anaheim Stadium"){

	lbpSingles = 2;
	rbpSingles = 2;
	lbpHomeruns = 13;
	rbpHomeruns = 13;
}
else if (myClick == "Comiskey Park"){

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 3;
	rbpHomeruns = 3;
}
else if (myClick == "Royals Stadium"){

	lbpSingles = 16;
	rbpSingles = 16;
	lbpHomeruns = 2;
	rbpHomeruns = 2;
}
else if (myClick == "Metrodome"){

	lbpSingles = 12;
	rbpSingles = 9;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Oakland Coliseum"){

	lbpSingles = 4;
	rbpSingles = 4;
	lbpHomeruns = 5;
	rbpHomeruns = 5;
}
else if (myClick == "Kingdome"){

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 18;
	rbpHomeruns = 18;
}
else if (myClick == "Arlington Stadium"){

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 12;
	rbpHomeruns = 12;
}
else if (myClick == "Wrigley Field"){

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 15;
	rbpHomeruns = 15;
}
else if (myClick == "Olympic Stadium"){

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Shea Stadium"){

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 7;
	rbpHomeruns = 7;
}
else if (myClick == "Veterans Stadium"){

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
else if (myClick == "Three Rivers Stadium"){

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 10;
	rbpHomeruns = 10;
}
else if (myClick == "Busch Stadium"){

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else if (myClick == "Fulton County Stad."){

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 12;
	rbpHomeruns = 12;
}
else if (myClick == "Riverfront Stadium"){

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 14;
	rbpHomeruns = 14;
}
else if (myClick == "Astrodome"){

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 2;
	rbpHomeruns = 2;
}
else if (myClick == "Dodger Stadium"){

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else if (myClick == "Jack Murphy Stadium"){

	lbpSingles = 0;
	rbpSingles = 0;
	lbpHomeruns = 16;
	rbpHomeruns = 16;
}
else if (myClick == "Candlestick Park"){

	lbpSingles = 2;
	rbpSingles = 2;
	lbpHomeruns = 9;
	rbpHomeruns = 9;
}
}
else if(cardSet == "70s"){

if (myClick == "Anaheim Stadium"){

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 3;
	rbpHomeruns = 3;
}
else if (myClick == "Arlington Stadium"){

	lbpSingles = 10;
	rbpSingles = 11;
	lbpHomeruns = 6;
	rbpHomeruns = 6;
}
else if (myClick == "Astrodome"){

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 1;
	rbpHomeruns = 1;
}
else if (myClick == "Busch Stadium"){

	lbpSingles = 12;
	rbpSingles = 12;
	lbpHomeruns = 4;
	rbpHomeruns = 4;
}
else if (myClick == "Candlestick Park"){

	lbpSingles = 6;
	rbpSingles = 6;
	lbpHomeruns = 2;
	rbpHomeruns = 2;
}
else if (myClick == "Cleveland Municipal"){

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 7;
	rbpHomeruns = 12;
}
else if (myClick == "Comiskey Park"){

	lbpSingles = 14;
	rbpSingles = 14;
	lbpHomeruns = 5;
	rbpHomeruns = 5;
}
else if (myClick == "County Stadium"){

	lbpSingles = 7;
	rbpSingles = 7;
	lbpHomeruns = 5;
	rbpHomeruns = 6;
}
else if (myClick == "Dodger Stadium"){

	lbpSingles = 5;
	rbpSingles = 5;
	lbpHomeruns = 8;
	rbpHomeruns = 9;
}
else if (myClick == "Fenway Park"){

	lbpSingles = 19;
	rbpSingles = 16;
	lbpHomeruns = 12;
	rbpHomeruns = 17;
}
else if (myClick == "Fulton County Stadium"){

	lbpSingles = 12;
	rbpSingles = 12;
	lbpHomeruns = 17;
	rbpHomeruns = 17;
}
else if (myClick == "Jack Murphy Stadium"){

	lbpSingles = 9;
	rbpSingles = 9;
	lbpHomeruns = 7;
	rbpHomeruns = 6;
}
else if (myClick == "Jarry Park"){

	lbpSingles = 16;
	rbpSingles = 16;
	lbpHomeruns = 14;
	rbpHomeruns = 14;
}
else if (myClick == "Memorial Stadium"){

	lbpSingles = 11;
	rbpSingles = 11;
	lbpHomeruns = 12;
	rbpHomeruns = 12;
}
else if (myClick == "Metropolitan Stadium"){

	lbpSingles = 1;
	rbpSingles = 3;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Oakland Coliseum"){

	lbpSingles = 3;
	rbpSingles = 3;
	lbpHomeruns = 3;
	rbpHomeruns = 3;
}
else if (myClick == "Riverfront Stadium"){

	lbpSingles = 12;
	rbpSingles = 12;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Royals Stadium"){

	lbpSingles = 12;
	rbpSingles = 19;
	lbpHomeruns = 3;
	rbpHomeruns = 3;
}
else if (myClick == "Shea Stadium"){

	lbpSingles = 8;
	rbpSingles = 4;
	lbpHomeruns = 11;
	rbpHomeruns = 8;
}
else if (myClick == "Three Rivers Stadium"){

	lbpSingles = 10;
	rbpSingles = 10;
	lbpHomeruns = 8;
	rbpHomeruns = 8;
}
else if (myClick == "Tiger Stadium"){

	lbpSingles = 13;
	rbpSingles = 11;
	lbpHomeruns = 16;
	rbpHomeruns = 13;
}
else if (myClick == "Veteran's Stadium"){

	lbpSingles = 8;
	rbpSingles = 8;
	lbpHomeruns = 11;
	rbpHomeruns = 11;
}
else if (myClick == "Wrigley Field"){

	lbpSingles = 13;
	rbpSingles = 13;
	lbpHomeruns = 14;
	rbpHomeruns = 16;
}
else if (myClick == "Yankee Stadium"){

	lbpSingles = 5;
	rbpSingles = 4;
	lbpHomeruns = 10;
	rbpHomeruns = 3;
}
	


}
}


for (var iz = 0; iz < 10; iz++){


}
if(cardSet == "80s"){

	GM_setValue('bats80s', 'Left');
}
else if(cardSet == "70s"){

	GM_setValue('bats70s', 'Left');
}
