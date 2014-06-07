// ==UserScript==
// @name           SOM Game Channel
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/baseball/stratomatic/2007/league/boxscore.html*
// @include        http://fantasygames.sportingnews.com/stratomatic/playoffs/boxscore.html*
// @include        http://fantasygames.sportingnews.com/stratomatic/league/boxscore.html*
// @include        http://fantasygames.sportingnews.com/stratomatic/home_good.html
// ==/UserScript==


//For Sample: 
//http://fantasygames.sportingnews.com/stratomatic/league/boxscore.html?group_id=52400&g_id=350


var speed = 5000; //Previous default was 3000.  Now it has been changed to 5 seconds.
var inning = 1; //default 1

//var style_href = "http://fantasygames.sportingnews.com/images/tsn/style_tsn.css"; //Previous default - black
var style_href = "http://fantasygames.sportingnews.com/images/baseball/stratomatic/2001/style.css"; //2001 - green
//var style_href = "http://fantasygames.sportingnews.com/images/baseball/stratomatic/2002/style.css"; //2002 - blue
//var style_href = "http://fantasygames.sportingnews.com/images/baseball/stratomatic/2003/style.css"; //2003 - red
//var style_href = "http://fantasygames.sportingnews.com/images/baseball/stratomatic/80s/style.css"; //80s - blue

	if (style_href == "http://fantasygames.sportingnews.com/images/tsn/style_tsn.css"){

		myClass = "alttitle";

	}
	else
	{

		myClass = "nav2";

	}
myClass2 = "alttitle";

if(document.location == "http://fantasygames.sportingnews.com/stratomatic/home_good.html"){

var blank;
var nodeResult;
var thisURL = document.URL;


 document.addEventListener('click', function(event) {
    
        if (event.target.text == "Disable GameChannel"){
            GM_setValue('SOMGameChannel',false);
        }
	else if (event.target.text == "Enable GameChannel")
	{
	    GM_setValue('SOMGameChannel',true);
	}
    
    }, true);




var myGameChannelClick = GM_getValue('SOMGameChannelClick',false);

if (myGameChannelClick == true){

	GM_setValue('SOMGameChannel',true);
	GM_setValue('SOMGameChannelClick',false);

}

var myGameChannel = GM_getValue('SOMGameChannel',false);

if (myGameChannel == true){



var resultFinals = document.evaluate("//td/b[contains(string(),'Finals')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (resultFinals.snapshotLength == 0){

	//example: Ted Lilly (BRE) fires shutout in 7-0 Breakers win  
	var result = document.evaluate("//td/a[contains(@href,'boxscore.html')]|//td[text()='- ']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < result.snapshotLength; i++) {
	nodeResult = result.snapshotItem(i);
	blank = document.createElement("a")

	if (i > result.snapshotLength - 4){

		blank.innerHTML = '<a href= "' + nodeResult + '">' + 'Results</a>';
		}
	else
		{
		blank.innerHTML = '';
		}
	nodeResult.parentNode.replaceChild(blank,nodeResult);
	}
}
else
{

	var result = document.evaluate("//td/a[contains(@href,'boxscore.html')]|//td[text()='- ']",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i = 0; i < result.snapshotLength; i++) {

		nodeResult = result.snapshotItem(i);
		blank = document.createElement("a")
		blank.innerHTML = '<a href= "' + nodeResult + '">' + 'Results</a>';
		nodeResult.parentNode.replaceChild(blank,nodeResult);
	}
}

//Remove 'END OF FINALS'
var result = document.evaluate("//td[@align='center'][@class='text12']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}

//Removes 'THANKS FOR PLAYING'
var result = document.evaluate("//td[@class='text11']/center/span",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}

//Removes any indication of extra credits.
var result = document.evaluate("//td[@class='text11']/span",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}



//removes standings and Runs, Hits, Errors scoreboards.
var result = document.evaluate("//td/table[@class='datatab_nowidth tright']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}

//removes winning pitcher, loser, save, and home run hitters
var result = document.evaluate("//td[@class='text9']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}

//removes winning pitcher, loser, save, and home run hitters during playoffs.
var result = document.evaluate("//td[@class='text10'][contains(string(),'W:')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}

//removes injuries and recently off injured list.
var result = document.evaluate("//span[@class='text12']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < result.snapshotLength; i++) {
nodeResult = result.snapshotItem(i);
blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}




}


var managerialStrategys, managerialStrategysLink;


var managerialStrategy = document.evaluate("//a[contains(string(),'Set your Managerial Strategy')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (managerialStrategy.snapshotLength != 0){

managerialStrategys =  managerialStrategy.snapshotItem(0);

managerialStrategysLink = document.createElement("a");

if (myGameChannel == true){
	managerialStrategysLink.innerHTML =  '<br>-  <a href=' + thisURL + '>Disable GameChannel</a>';

}
else if (myGameChannel == false){


	managerialStrategysLink.innerHTML =  '<br>-  <a href=' + thisURL + '>Enable GameChannel</a>';
	
}

managerialStrategys.parentNode.insertBefore(managerialStrategysLink,managerialStrategys.nextSibling);
}
else{
	var managerialStrategy = document.evaluate("//span[contains(text(),'Finals')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


	if (managerialStrategy.snapshotLength == 0){

		var managerialStrategy = document.evaluate("//span[contains(text(),'Previous Playoff Games')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	}


managerialStrategys =  managerialStrategy.snapshotItem(0);
managerialStrategysLink = document.createElement("a");

if (myGameChannel == true){
	managerialStrategysLink.innerHTML =  '<br><a href=' + thisURL + '>Disable GameChannel</a>';

}
else if (myGameChannel == false){
	managerialStrategysLink.innerHTML =  '<br><a href=' + thisURL + '>Enable GameChannel</a>';
	
}
managerialStrategys.parentNode.insertBefore(managerialStrategysLink,managerialStrategys.nextSibling);
}

}//if(document.location == "http://fantasygames.sportingnews.com/stratomatic/home_good.html"){
else
{
var myGameChannel = GM_getValue('SOMGameChannel',false);	

if (myGameChannel == true){

var link=document.createElement("link");
link.setAttribute("rel","stylesheet");
link.setAttribute("type","text/css");
link.setAttribute("href",style_href);
var head=document.getElementsByTagName("head")[0];
head.appendChild(link);

}

var myPause = false;
var myClick;
var myLink2;
var myBullets;

document.addEventListener('click', function(event) {


if (event.target.text == "Pause"){

myClick = event.target.text;
var myBullet = document.evaluate("//a[contains(@style,'cursor')]/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

myBullets = myBullet.snapshotItem(0);
myLink2 = document.createElement("a");

if (myClick == "Pause"){
	myLink2.innerHTML="Play";

	myBullets.parentNode.replaceChild(myLink2,myBullets);

}
myBullets.parentNode.replaceChild(myLink2,myBullets);
}

 }, true);


document.addEventListener('click', function(event) {
if (event.target.text == "Play"){

	if (myPause == false){
		myPause = true;
		stopCount();
	}
	else if (myPause == true){
		myPause = false;
		t=setTimeout(startTime(),speed);
	}

}

 }, true);

var boxscore,story;
var blank;

var allElements, thisElement,thisElement2;
allElements = document.getElementsByTagName('pre');
    thisElement = allElements[1];
    thisElement2 = allElements[0];
boxscore = thisElement.innerHTML;
story = thisElement2.innerHTML;

var thisURL = document.URL;

var msg = "";
var newString = "Pause";

var flag = false;
var flagCount = 0;
var patternString;
var patternString3;
var patternString4;
var halfInning;
var halfInning2;
var result3 = "";
var result1Pitcher="";
var result1Batter="";
var result2Pitcher="";
var result2Batter="";
var rollsPitcher="";
var rollsBatter="";
var xchancesPitcher="";
var xchancesBatter="";
var myOut = "";
var menOnBase = "";
var menOnBase2 = "";
var xChances = "";
var xChances_lg = 0;
var rolls = "";
var rollsVisitorPitcher = 0;
var rollsVisitorPitcherPCT = 0;
var rollsVisitor = 0;
var rollsHomePitcher = 0;
var rollsHomePitcherPCT = 0;
var rollsHome = 0;
var advance = "";
var t;
var BPHRHome = "";
var BPOutHome = "";
var BPHRVisitor = "";
var BPOutVisitor = "";


var innings = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1&nbsp;2&nbsp;3&nbsp;&nbsp;4&nbsp;5&nbsp;6&nbsp;&nbsp;7&nbsp;8&nbsp;9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;R&nbsp;&nbsp;H  E";

var visitorScore = 0;
var homeScore = 0;
var visitorHits = 0;
var homeHits = 0;
var visitorErrors = 0;
var homeErrors = 0;
var top1 = "&nbsp;";
var top2 = "&nbsp;";
var top3 = "&nbsp;";
var top4 = "&nbsp;";
var top5 = "&nbsp;";
var top6 = "&nbsp;";
var top7 = "&nbsp;";
var top8 = "&nbsp;";
var top9 = "&nbsp;";

var bot1 = "&nbsp;";
var bot2 = "&nbsp;";
var bot3 = "&nbsp;";
var bot4 = "&nbsp;";
var bot5 = "&nbsp;";
var bot6 = "&nbsp;";
var bot7 = "&nbsp;";
var bot8 = "&nbsp;";
var bot9 = "&nbsp;";

var nextResult = "";

var myGameChannel = GM_getValue('SOMGameChannel',false);

var firstBase = "&nbsp;";
var secondBase = "&nbsp;";
var thirdBase = "&nbsp;";
var firstBaseLn;
var secondBaseLn;
var thirdBaseLn;
var homeBase;
var nonBreakingSpace = "&nbsp;";
var isBullpenV2 = false;



if (myGameChannel == true){
var empty = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08c%00%08k%00%08k%08%08s%08%10c%00%10k%00%10k%08%10s%00%10s%08%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10%18%84%00!k%00!k%08!k%10!s%00!s%08!s%10!%7B%00!%7B%08!%7B%10!%84%08!%84%10)k%10)s%08)s%10)s%18)%7B%08)%7B%10)%7B%18)%84%101k%101s%181%7B%101%7B%181%84%101%84%18Bs%18B%84!B%84)B%8C!B%94!Jk%18Js)J%7B!J%7B)J%84!J%84)J%8C!J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C)R%8C1R%94)R%941R%9C1Zs1Z%7B1Z%849Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Bc%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%A5Jk%ADBk%ADJk%B5Js%84Bs%94Bs%94Js%94Rs%9CRs%A5Js%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5R%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%9Cc%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5c%94%B5k%94%B5s%94%BDk%94%C6c%94%C6k%94%CEk%94%D6k%94%D6s%94%DEk%9C%A5s%9C%B5k%9C%B5s%9C%BDs%9C%CEs%A5%AD%7B%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6s%A5%C6%7B%A5%EF%7B%AD%BD%84%AD%C6%7B%AD%C6%84%AD%C6%8C%AD%C6%94%AD%CE%84%AD%DE%7B%B5%BD%8C%B5%C6%94%B5%CE%7B%B5%CE%84%B5%CE%8C%BD%B5%84%BD%B5%8C%BD%C6%84%BD%CE%84%C6%DE%9C%CE%B5%94%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%9C%D6%B5%9C%D6%B5%A5%D6%BD%9C%D6%BD%A5%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%00%3F%5C%D0%40%B0%81%86%11%22L%98%C8Q%C5%8E%A0E%82%02%D5%19C%04%C6%8A%1A%035d%60%60A%83%88%0F%22Dh%C8%A8%81%C2%07%13e%3E%D9%C2e%2BW%AE%5B%2Fq%3D2b%92%20%07%8D%16Dj%CC%40P%04%08%14n6%C1ty%ABe.%5B%B6n%E1%1Ae%E8%C8%88%9C%3B3Hu%90%81%84%88%0BH%08%85%D2%F5R%16%CC%AF%2F%8D%E62%C4%05%C5%84%AA%190d%88%F0%20%83%05%14Y%5D%26%05%FB%D2e%DD%A2%B9F%B5%A9a!%C3%86%A9%7F%3D%40%D9D%B4%AE%AF%5C%A50%DD%E94%F7%16%D8Smh%F4%FD%2BU%04%94G%B8%5E%EE%BA%B5Y%E9%20%269%CC%84%22%CA%D91.SmP%F4%CDp%15%C5%A3%A3%8E%7D9%CE%85%2BO%11%03%0A%14%5C%D1%E4rs%2F%C7%BDNa%01!%C2%02%08%13%84%93v%86%89j%0F%8F%02%0A%0C%40%DF%C2%9B3%2F%CE%2FAi%F9%F0%C1%88%96R%2F9%FE%FBj%89kO%0D%E9%06%0E%A0%E7%02*%FC%AE%CD.%1B%F90%D1d%B4f%F8%A8%DC%D0%90~%A0%40%81%FE%D2e%01%8Ac%A5%C1%D4%CA%1D3%E8A%14%7CJ%B9%D1%82%01%E9%F9%D7%1F%02%10%16%20%E0o%A5%BD%84%8A%11%A9%E4%C2%0AL%B1%E4RK%16%0FR%F8%9F%01%0C%F8%87%00%85%06%18%01%8A-%BD%1Ce%D7%1B%83%A0%12%13b%84%40h%80%00%EA%F9W%40%85%03%E8%C8D%267%E6%02I%0F%3A%DCA%1B%2B%AF%EC%11%1D%02%02%F0%88%A2%02G%FC%00%A1%00%2B%E2v%85'%B8t%C9%C8%15%26%C4%60B%1E%AA%88%82%87%0C%3A%0E%40a%00I%1C%B2%CA%17%3FR(%00n%06%5C%E1%0A.%868%01%02%08%DC%A1%F0%85%24_Dg%80%06%06%04%40%E8%10%A4T%82%C8%0D%05%B0H%E7%13%9CPr%C4%04%1F%15g%C1%0Di%FC1%85%01(%A0G%E1%0Bs%90%B2%84%8E%0AtJ%80%12r%C0!%C4%079%B1v%C1G%FE%1A%7C%A1%A9%8E%0CH%B7%22%03%02%A8%80%00%01%08D%F7%83%1C%7D%08aAN%1F%B0%E6%91%08%13h%10F%22I%40((z%3F%A2h%00%005%FC%B1%C6%AA9%5D%E5%96%069%8D%00%D2%14%89l%DA(%84%0C%F4%FA%E3%05%05%DC%20%07%1F8L%00UGn%8D%A0%91%0A%1AL0B%18~PQ%A1%02%BBR%C8%00%00%0C%1C%02%08%0A%02%85%C4%ADN%24%8C%B0mH%16x%01%88%17%3A%FE(h%10%7C%C8%A1%80%05%17XE%10A%3C1PUO%16%3C5E%25%5E%40%87%DB%8F%0C%C8%E1%C7%08%1E%84tAG%1C%F3%C4%93F%1A%5D%15%C2%07R%1C%02%06n%14%FEpH%1C6sL%B3%CCC%0F-%02B%16D%F1G%1A%06%10%10%C5%1Ak%04%91%D3%05R%09-3%D1UW%F6%D1%07%60%F4%91%C6%14%7C%ACq%83%04%17%A8%B0Z%D1X_%8D%93%08*%5C%E0A%14%94X%92%06%C1%D9%AE%86%F5NQI%25%15%11%09%2Fs%07%C2%14ix%8B%D0%B6z%17%AEQ%40%00%00%3B";


empty =  '<img src="' + empty + '">';

var first = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08k%00%08k%08%08s%08%10k%00%10k%08%10s%00%10s%08%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10%18%84%00!k%00!k%08!k%10!s%08!s%10!%7B%00!%7B%08!%7B%10!%84%08!%84%10)k%10)s%10)s%18)%7B%08)%7B%10)%84%101k%101s%181%7B%101%7B%181%8C!9k%109s%189s!9%7B!9%84!Jk%18Js!J%84)J%8C!J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C1R%94)R%941Zs1Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Bc%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%A5Jk%ADBk%ADJk%B5Js%84Bs%94Js%94Rs%9CRs%A5Js%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5R%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%9Cc%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5k%94%B5s%94%BDk%94%C6c%94%C6k%94%CEk%94%D6k%94%D6s%94%DEk%9C%A5s%9C%B5k%9C%B5s%9C%BDs%A5%AD%7B%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6s%A5%C6%7B%A5%EF%7B%AD%BD%84%AD%C6%7B%AD%C6%84%AD%C6%8C%AD%C6%94%AD%DE%7B%B5%CE%84%B5%D6%94%C6%B5%94%C6%BD%94%C6%BD%9C%C6%C6%94%C6%C6%9C%C6%CE%94%C6%CE%9C%C6%CE%A5%C6%DE%9C%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%9C%CE%C6%A5%CE%CE%9C%CE%CE%A5%CE%D6%A5%D6%B5%9C%D6%BD%9C%D6%BD%A5%D6%C6%9C%D6%C6%A5%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%007P%B8%40p%C1%05%0F%1CB%AC%80%81%04%0D%9D%3Et%E6%9C%B1%92CE%88%11%03%2FXP0%E1%E0%06%0F%1E.d%BC%20a%03%8C%2B%8F%3Cy%EA%94%0A%D5'O%A8%3C%01%0A%02B%E0%85%0C%1A'%84%D4h%81%20%C2%11%60%18yJ%F5%C9e'%A3*%3DA%12dcDG%0F%16%A2Fe%60%E1%83%07%0A%3B%ECD*%D5%AAS'%98EQ%19-*%0A%CF%93%10%1D%3BX%A8%60%E1A%03%0B%13Fd%0D%B5%D2TX%B1w%C5%A2%EA%F4i%D2%17%A7%180L%15%3Ca%C8%A3PzQ%C1%12%DB%E9%0F%9DF%7C%ED%9A%D2%EB%E9%EF%84%A8%82-x%18%02%E8%14*S%A6%60%D9%E5%EB%E7%07%0C%2C%95%10%83%FE%8C%EA%94%25%CBQ%AF%CE%00%04%13%B4%E8%A2%9E%EC%9C(%11%01%81%92EaC%83Nei%09%07%0F%138%B0%08T%DB%94%AB%C91%DB%20%20%40%00%C1%00%04N%84%86~%EEJ%2C%A4%26%266%FE%D4%C0r%E9%13hW%B0%8E%82%023%FDz%81%EA%13%98%40%FA%EC%7C%F5%A7%3F5B%00%89%A4%EA%F3%AB%F41%81%A1%00%01%0A%24%90%40%01%09%18p%00%01O%2C%22V%7Dx%A5%11%02%1B%88%3D%E8%92'%60PG%00%82%06*%F0%1Eu%F2%B1f%1F%26%3Bd%12%0A_%7B%9DR%0A%13%D4%19%60%00%02%09%22%A0%00%00%06h%88%02%24%9E%ED%85J(%9C%ACQ%C7KE%9D%92%1B%015%D6%F8%DE%01%03%10%90%A4%00%D4I%10%C4%22%9E%0D%15J%204%C4%90FR%9E%B4%A1%A1%8B%D4!%80%80%0E%03%12%C9%25%01J82%CB%2C%9B%F8%C1%84%04l%DA%E1%89%24_xI%40%00.%060%40%0A%83h%22E%8BsV%17%C1%99g%06!%01%02%0BD%40%81%14yh%A1%E1%80%00(%60%00%09%94%18%A2G%91%1Az%09%E8%2C%08L%A0%80%02%5ERP%C5%1BF%C89%5D%8D%0A%94A%89%0F%95%D6%18%01%0Fd%9C%C9%E9%A6%FA%B0*%B0%C0%14%A0.J%00%8D%2F%1A%B0%00%01%07%BCH%C0%02b%C4%81%03%02%07%C4%AA%00%05%03N%40%C5%1E)T%A7!%01%09(%A9%E4%AE%07%20%10G%17%C3%CA%B8%00%AC%04.%80%EC%02F%14r%84%92a%0E%A8%40%92%9C%B2%40%86%1B8%5C'k%022%1A%00%EB%B6%84R%01%87%11%D4%0D%F0b%92%04R%A7G%1C%C8jk%AC%03%DB%C2%3A%01%01G%E8%11E%97%E8R%A7%80%1Bd%B8%EB%ED%BC%F2%0E%A0%80%03%9B.%90)%01F%18%12E%92%ED%11H%06%1C%C8%C2*%EF%A6'%CB%7Br%AC%08%14%91%C7%14%D5%BD%88%40%1Ec%D0k%AC%CA(%9B%0Ck%C0%3D%E4%B1%05%01%11%10%D1E%177%C8x%B3%A3%C6%EA%1C%EB%04R%B8%B1%85%11nt%E1B%B1%17X%9C%F3%CAJ'%B0)%01%13%04%1Cn!%5DP%E0%E5%BBH'%88t%D2f%2B%60%01%022%2F%E0D%17%1A%97%0Ck%01e%C3%1A%10%00%00%3B"

first =  '<img src="' + first + '">';

second = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%10c%00%10k%00%10k%08%10s%00%10s%08%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10%18%84%00!k%08!k%10!s%00!s%08!s%10!%7B%00!%7B%08!%7B%10!%84%08!%84%10)s%08)s%10)s%18)%7B%08)%7B%10)%7B%18)%84%101k%081s%081s%181%7B%101%7B%181%84%101%84%18Bk!Bs%18B%94!Jk%18Js!J%7B!J%7B)J%84%18J%84!J%84)J%8C!J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C)R%8C1R%94)R%941R%9C1Zs1Z%7B1Z%849Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%A5Jk%ADBk%ADJk%B5Js%84Bs%94Bs%94Js%9CRs%A5Js%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5R%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADs%94%B5c%94%B5k%94%B5s%94%BDk%94%C6c%94%C6k%94%CEk%94%D6k%94%D6s%94%DEk%9C%B5k%9C%B5s%9C%BDs%9C%CEs%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6s%A5%C6%7B%A5%EF%7B%AD%AD%84%AD%BD%84%AD%C6%7B%AD%C6%84%AD%C6%8C%AD%C6%94%AD%CE%84%AD%DE%7B%B5%BD%8C%B5%C6%8C%B5%C6%94%B5%CE%7B%B5%CE%84%B5%CE%8C%B5%D6%94%BD%B5%84%BD%BD%8C%BD%C6%84%BD%C6%8C%BD%CE%84%BD%CE%8C%BD%D6%94%BD%D6%9C%BD%D6%A5%BD%DE%8C%C6%BD%94%C6%BD%9C%C6%C6%94%C6%C6%9C%C6%D6%A5%C6%DE%9C%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%94%CE%C6%9C%CE%C6%A5%CE%CE%9C%CE%CE%A5%CE%D6%A5%D6%B5%9C%D6%BD%9C%D6%BD%A5%D6%C6%9C%D6%C6%A5%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%003H%A8%400A%85%0E%1CB%A8%98%E1%C4%8D%A0%87y%DAp%F1%91B%C5%8B%81%15(%20%88P%81C%06%0E%1C*%60%AC%F0%20%C3%0C%2F%93d%89%0A%A5k%D6%2CY%BAd%15%02R%92%E0%85%8C%11Bf%A4%40%90%83%86%11f%20%C9%E25KW.%981C%89%12u%A9%90%8E%11%1C9P%98%3AU%01%05%0F%1C%24%08%D9S%E9%16%B0P%99t%B5%2C%9At%16-W%85%AA%8Cpp%95%C2%04%0A%0D%16P%880b%AB%2BY%B3p%91%D5e%CC%98%D8%BF%BAB%C9%BAT%E6E%04%0A%16%AA%26%C6%90%04R-%B1%B8%C4%0E%9B%D5%B7o%A8%BC%91u%E1%E2%C5%A9%8C%8B%C3%89%A7rHR%88%96f%5C%C34%AB%AClL%D3c%5C%91%23%E7%DAT%06%AAh%096J%9F%1E%86%0B%E6%AC%3D%3F%FA%AE%80%F2%88%2Cj%D8%BC6E%D1%C0!%82%86%17%86d%C9%82%1D%2Cs%A796%0C8%40%60%40%02%95G0%83%FE%F1%0E%26%96%D2%94%0C%19%80L%E1tZ%3CLSs%5E%18%88%B0%F1%C0%FC*%94%DA%C3n9%08G%08%23%95%F4%22%96%7B%BAtb%86%0B%06%1C%80%C0%01%03(X%80%01RPR%14.%D5%895%CA%1B%2C%C8%01%0Bdb%CDb%8A%19%12%18%80%C0%82%07%94%B8%C0%88%10%E6%17%5Bd%B3t%02%84'%AF%5C%A6%0B*%B2%DC%22%C5%08%09%8CH%C0%01%11%D0G%00%02%09%18%90%00%10%94%E4%22%D6t%B5%9C2%87%1E%9D%CCb%A4%2C%9C%EC%91%40%02%04%FC8%E2%83%22%22%40%C0%94%06%40%E1%C8.1%F1%F2%8A!8%D0%F0%86)%B2%A8RJ%1C%0ELY%E5%8F.%B8%80%84%0D%3AN%99%80%03%5E%CA%92K)%83%40%11B%08%26%EC%F1%89%25p%AC%F0%80%969%12%60%C0%10~%80%82%85%90Tn%F9%80%03%5Dl%12%0B%1FGh%80%DEOX%20%82%C5%A1%DD%FD(%01%02%3D%60%B2%C8%1F%15%08%C9%9D%04!%26%11%89%22%FEA%7C0%C2G%3D%96%10%C6%1DL%18%F0%02w%40%22%20%C3%1A%98%14%81%22%AB%06%080%84%1Ah%0C%D1%5C%06%14d%E5Q%06Z%E0%1Adw%08%08%40%81A%02%C8%90%40%01%ACJ%10%83%1Au%F0%10%81%03%205%DB%11%07%18%40%0B%C8%10%09D%90%23%8A%05%0C%9B%00%00%12%DC1%06%0F%19%E4%94%D5%5C%15%E4%D4%81%04%1C0%A1H%AE%F3%E5(A%09%12%04%80%00%0C%06%8C%A0%06%1D2%60%40ns%3CE%D0A%BF%25x%D4%81%16v4a%80%88%EE%C6%1B%81%04%02D%F0%C7%1D%B3%02%AC%93T%15x%D0%01%BF%20%89%C0%C4%1FZ%88%F8%40%BC%A3%3A%10%83%1Djl%07%D2%C5%3CeT%01%02W%F5%04B%07%200%B1%C8%15%08l%17%A2%010%A8aG%07%FAJ%10%F4NBg%DD%9CGK%F8%91Ewk%C5%E0G%1A%1Eq%244Oh%9F%7D6%07%08E%A0%C4%1Da%7CL%04%1Ac%94%90S%05%1B%A4%1D%F4%40Tg%A3%DD%2C%BA%1C%5CQG%18L%D01%C6Z%19%94%00%81%DA%7C7%EEx%05%10p0%82%04%18(%A1%08%23a%CC%AA%2F%D1%8D%F7%DD7Uv%E7%94%81%06L%84%D1A%06%08%F1K%15UB%07%04%00%3B"

second =  '<img src="' + second + '">';

third = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08k%00%08k%08%08s%08%10c%00%10k%00%10k%08%10s%00%10s%08%10%7B%00%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10!k%08!k%10!s%08!s%10!%7B%00!%7B%08!%7B%10!%84%08!%84%10)s%10)%7B%08)%7B%10Bs%18B%7B!B%84!Jk%18Js!J%7B)J%84!J%84)J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C)R%8C1R%94)R%941R%9C1Zs1Z%7B1Z%849Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Bc%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%ADBk%ADJs%84Bs%94Bs%94Js%94Rs%9CRs%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%9Cc%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5c%94%B5k%94%B5s%94%BDk%94%C6c%94%CEk%94%D6k%94%D6s%94%DEk%9C%A5s%9C%B5k%9C%B5s%9C%BDs%9C%CEs%A5%AD%7B%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6%7B%A5%EF%7B%AD%BD%84%AD%C6%7B%AD%C6%84%AD%C6%8C%AD%C6%94%AD%DE%7B%B5%CE%7B%B5%D6%94%BD%B5%8C%BD%BD%8C%BD%BD%94%BD%C6%8C%BD%C6%94%BD%D6%94%BD%D6%9C%BD%DE%8C%C6%B5%94%C6%BD%94%C6%BD%9C%C6%C6%94%C6%C6%9C%C6%CE%A5%C6%DE%9C%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%94%CE%C6%9C%CE%C6%A5%CE%CE%9C%CE%CE%A5%D6%B5%9C%D6%BD%9C%D6%BD%A5%D6%C6%9C%D6%C6%A5%D6%CE%9C%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%00%19(%60%D0%E0%C0%01%82%14%24%8481%24%0C%9B%3Al%D6%80y%22%03D%08%12%14.%5C%B0%C0%60%C2%05%0E%1A%082%60p%A0A%03%05%0AD%40I%E4%A9%25*S%9F%3E%A1%F2%94%87%86%04%0D%1A3l%9C%C0%E1%C2%C8%9F%04Id!%24%13%A6)O%A6%8Ez%FA%E4iQ%1E%17%1F(%F4%B4%40%95%A3%81%03%0FN%DAx%A3hT%AAN%95d%C6L%FA%A9%93LMy%94%7C%98%C0%13C%85%09%06%0C%8C%A4%C0%C3M(%A6I%F3%C2L%A5%D7%94%A5O%8B%B0%90%D8%60%01%83%85%0A%06%1E%18P%E0%83%D0%CB%BC%AE%F8%5E%0A%24%C6%D0%D2O%A4L%B92%15%CA%12%96%11%13%A8b%F8%E9%03%8F)T%A4Hm%8E%E9%A9%8D%8E%13R%1A%85B%9D9%B3)G%9FCsT%A0%22O(S%A9%5D%91%FA%C4%D9%CD%8C%01%0A%24%18%19%94%97%95%F0R%A8%1E%19%D1%C0%81B%03%11D%3D%B5%22%B5%FDt%A6%2C*%12%FE%14P%40%80%82%11%A2%9AY%A9N%9A%08%89%06%0D4%904%22%1E%9CT(Oe(%14%20P%E0%01%01%02%0A(%91%08L%A4%B0%C2JR%A1%DC%C1%82%07%3B(%C2%97f%C2%A1rI%16%FA%11%60%C0%02%09%1C%F0_%01G%0C%08%9Cz%A6%A4r%89%18%22%90!J%5E%B6%81%92E%03%05%14%60%80%85%16%8E%B4_%87%7C%D5%06%13%244D%12%CA%25Iub%CA(G%E8w%10%7F%1D%11p%10%8B%0A%D0%90H)%AF%18%25%0A%25e%B4%91%09%5E%A8X%E2%86%02%05%1DP%80%86%1B%1A%19%80I%0A%14!HR%9E%A0%A2%89%1E%2C%A0%20%C6%7D%B2%C8R%86%04%2C%1A%A4%25%05%14%D4%D0B%8B%25%99%14%81%98%9E%9C%E2%C9%1DEH%20%E8%18m%B6%89g%03%24%11pC%1C%920%D1%22%04%065%20A%04P8%C2%C9%1B%3C%C0%D9%40%04%14%14*K%8B%14%08P%C0%05%05%C4%C0%88%1FsPP%1E%96%0AP%C0X!%FE%7D%D40%D0H(u*K%10%05TX%00%03%A3z%C1H%0E%5B%E6%EA%AA%027t%B1%05%0C%02M%00%94%40N%A4%81%EB%00%A3%EE%07%C1%04%10%10%40jytR%D0%C5%197%8C%B7%2C%05%BC2%E0%C4%1C7%20%89'%7F-b%3B%00%05iX%81%EC%40%CA%CAH%90%B2%0D%04%D1%07%AEF%82jA%03%E2Q%90%80%B6f%98%A0%C0%AE%B4%92%F4S%03%AAR%E0%84%17M%A4%7B%80%02%00%0C%3C%01%96r%A8a%9D%02%13%20%0A%14%04%1A%FF%A4%40%13i4%3C%1E%7F%0F%8FjF%17%00%8At%F0H%040%00%C1H'MP%40%10~0%C1%DF%C0%FCi%8B%86%AB%CBf9%D2A%07-%CB%C0%0Fr8Jg%01%1C%C4%C1%85%D0%3F7%1D%B4%C1s%09%84C%1CT%A0%84%C3%16V%BC%80%E5%B2%403%0D%F5O%130q%06%15A%98aE%09%09(pA%CBN%0B%1D%F4%022N%00%AE%02%F6%F6a%C5%B0%04-%10%B4%1A%5CA%3F%3D%92%DE%23Y%A0%C0%C3X%FE%60%85%04%0C%80%0B%94%5C%7F%07%1D%10%00%00%3B"

third =  '<img src="' + third + '">';

first_second = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08k%00%10c%00%10k%00%10k%08%10s%00%10s%08%18c%08%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10%18%84%00!k%08!k%10!s%08!s%10!%7B%00!%7B%08!%7B%10!%84%08!%84%10)s%08)s%10)s%18)%7B%08)%7B%10)%7B%18)%84%101k%101s%181%7B%101%7B%181%84%18Bs%18Jk%18Js!J%7B!J%7B)J%84!J%84)J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C)R%8C1R%94)R%941R%9C1Zs1Z%7B1Z%849Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%A5Jk%ADBk%ADJk%B5Js%84Bs%94Js%94Rs%9CRs%A5Js%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5R%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5k%94%B5s%94%BDk%94%C6c%94%C6k%94%CEk%94%D6k%94%D6s%94%DEk%9C%B5k%9C%B5s%9C%BDs%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6s%A5%C6%7B%A5%EF%7B%AD%AD%84%AD%BD%84%AD%C6%7B%AD%C6%84%AD%C6%8C%AD%C6%94%AD%CE%84%AD%DE%7B%BD%B5%94%BD%BD%8C%BD%BD%94%BD%C6%8C%BD%C6%94%BD%CE%9C%BD%D6%94%BD%D6%A5%C6%B5%8C%C6%BD%8C%C6%BD%94%C6%BD%9C%C6%C6%8C%C6%C6%94%C6%C6%9C%C6%CE%94%C6%CE%9C%C6%DE%9C%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%9C%CE%C6%A5%CE%CE%9C%CE%CE%A5%CE%D6%9C%D6%B5%9C%D6%BD%9C%D6%BD%A5%D6%C6%9C%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%005L%B0%40p%81%05%0F%1DP%9Cp%91%24M%9F%87t%D0%5C%C9a%E2%C4%8A%81%16*(%90%60%A1%83%86%0E%1D%2C%60%B4%10A%83%0B%2C%8DJq%EA%94%EA%95%A9R%A9P%F9%E9%01B%03A%0C%19%25%84%CCX%81%60%87%0D%2B%C2%2CBe%EA%D5%ABV%A5%5C%96%DA%C4%C9%93%23A%3C6%E8%E4Y%A1*%83%0A%1F%3AL%E8a%E7%11%ACW%9B%26%19%CD%95%CB%E8%D2W%A9B%E1%812%82%23%87%0A%14*%3ChPA%C2%08%AE%ABJ%B5je%B4%15Y%B2%B1%8C%1A%E5%84*%12%18%15%13*%5C%B0%BA8%03%91E%82%F9%F2%7D%F57W'S%7B%FB%A6%B2%04%A6%AD%E2%AA%15%3A%10%01%E4%EAh%AB%5B%7BMu%F2C6%0B%A5%AF%983%BB%AA%D4YBU%AD1%00%15%DD%8B%DAT%AAOvt%18%80%10%81%89%A2%A2GQ%B7%A2U%89%C9%86%0E%12%80%06B%B5%B7%D6%5E%BE%9E%D8%C4%40%20A%01%F7%26%8B%F4%FE%DE%AAe%DD%A8%23-%25w8%A1d%BA%D6%AD%A4%9F%C2%C48%B0Q%81%82%04%11%9E82%DD%AA%BC%A9%3F3%84%10%C4%23%7D%D5r%D4%2B%96%841%01%02%F7%25%40%40%02%0A%1C%90%9F%22%05%F2%15K'j%A4%D0F_%A8%B9%84J%18%11%D8%D7%60%02%094%E0%1D%02Mx%25%19_%A6%5C%B2%03%26%A2lr%D4(%A5%B0%D2%C4%04%05%2Cp_%7D%22%EA%88%C0%0E%8E%B8%F2%95%5E%A9%80%E2F%1D%97%BCd%94%25v%20%B0%40%01%05%88x%00%02%08%24%90%E3%02%0B%20%20%84%22%B0%B8R%0A%2C%A9%04%22%C3%0Bj%7CR%0A)%9E%B8%11%01%96PF9%81%0AC%C40%C1%00W.%10%81%12%89%90%E5%89%1FK%84%10A%04vx%B2%C8%1A(%84%98%A3%02%05%20%E0C%1E%9AL%C1%E0%939F%00AeBl%B0%C1%02%10L0%C5%20S%2C%88%00%8E%0AL%A0%00%0E%92%18%A2%87%05%088%E0d%A6%08T%06%81%08%FE%A2R9%81%15p%1C%F1%E9%02%07%E8%A8%80%05fH%02%84%8F%13%2C8%80%0Fe%90%A5%81N%1A%F5HE%AD%DE-%B0%20%01%1340%A7%05%B8%3A%3B%01%0De%C0q%03%04%3AAg%9F%A8%03(P%C5%1E%3E%2C%20%81%AE%0C%D2%E7%5D%B0%01L%20%87%177d%A0%93M%1A%85%EB%AC%02%11%1C%B1%87%AD%9F~%2B%92%00%A1%1E0A%19o%B4%C0mH%1CI%10%A5%7D%3E.PE%1CHP%B9%11%AE%1B%CD9%81%1Es%8C%20%10H%16H%F0%81%05%0A8%A0%AB%7D%12%20%80D%1EU%ACK_%AC4%C4Q%C6%01%12L%80%10A%04i%04%B0%03%0C3%88%C0%11%86H%C1%DD%A7TZPF%1C%1Ed%80P%5D4W%85%E8%D2%22%8AX%84%1E%3E%07%2B%01%0Dy%90%A1U%065g%A4%B5F%0B3%1D%AAw%3F%E4%C1%05%95%3F%8C%E1%85%0DSq%D4%D3%DA%195m_%D7%24K%01%07%17G%BC%E1%05%0B%DC%92%60%1B.%DBl%8B%B80%84%0A%0C%10%B3wG%14R%88%17%1Aw%BB7O%5B%BBm%A5%7D%15%20%90(%BEGx%B1%C1%04%22t%804h%A0i%1D%10%00%00%3B"

first_second =  '<img src="' + first_second + '">';

var second_third = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08k%00%10k%00%10k%08%10s%00%10s%08%10%7B%00%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10!k%00!k%08!k%10!s%00!s%08!s%10!%7B%00!%7B%109k%109s%109s%18Bs%10Bs%18B%7B!B%84!Jk%18Js!J%7B)J%84!J%84)J%8C!J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C)R%8C1R%94)R%941R%9C1Zs1Z%7B1Z%849Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%ADBk%ADJs%84Bs%94Bs%94Js%94Rs%9CRs%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5c%94%B5k%94%B5s%94%BDk%94%C6c%94%CEk%94%D6k%94%D6s%94%DEk%9C%B5k%9C%BDs%9C%CEs%A5%B5k%A5%BD%7B%A5%EF%7B%AD%B5%84%AD%BD%84%AD%C6%84%AD%C6%8C%AD%C6%94%AD%DE%7B%B5%BD%84%B5%BD%8C%B5%C6%94%B5%CE%7B%B5%CE%84%B5%CE%8C%B5%D6%94%BD%B5%8C%BD%B5%94%BD%BD%8C%BD%BD%94%BD%C6%8C%BD%C6%94%BD%D6%94%BD%D6%A5%BD%DE%8C%C6%B5%8C%C6%BD%8C%C6%BD%94%C6%BD%9C%C6%C6%8C%C6%C6%94%C6%C6%9C%C6%CE%9C%C6%D6%A5%C6%DE%9C%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%94%CE%C6%9C%CE%C6%A5%CE%CE%9C%CE%CE%A5%CE%D6%A5%D6%B5%9C%D6%BD%9C%D6%BD%A5%D6%C6%9C%D6%C6%A5%DE%BD%A5%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%00%13%1CH%A0%80%00%01%82%13%20x(%01%C4K%9C%87h%BA0%81%D1%C1C%88%04%18%09%08%C0%C8QAF%05%0A%0E%60%80%E0%24%D1%26I%93Jq%E2%B4%A9T%A5%3A2%0E%1C%F0%A8%80%C1%40%8E8%11Z!%D4%B2%94%CF%9E%9B%22i%92%A4%E8%0E%0B%0E7%13%0C%E08%80%00%83%904%D6(%12%A5%0A%12%A4Q%A5d%C9R%19%94%D3)Gu%8E%20M%C0%40%A9%D2%A5%09%26%E4P%F3i%D3(%B7%3E%B5j%F5I7%92'EU%40pD%40%60%00%83%01%07v%10%A2%8B%D5U%5C%B9)Gq%A2%5B%8AR%5E%B3%0B8%EE%A0%E3s%D4(%C3%2C'%C9%D1%FADQe%ACXI%E1%05%11%80%E3%81%09u%3E%BBR%EC2M%0C%0B%1A%20%0C%19%D4%F3%B2%E5S%85%86L%C0%A8%00%82%9FJ%A0Ya-%25I%0C%8A%03%0F%24%1C%90%40%84%E7eW%C2Om%0ATd%A6%8C%22%9E-%B3r%E5%B6%92%98%10%CB1%FE%22H%F0%E0H%A2R%96GE%FF4G%C5%06%1C%9E%D1%B7Z%DD%D8%CA%84%03%E3)D%18o%E0%00%91A%95%09W%0A*%8A%7C%F1A%18%97%80%86%D5%26%8EX%11%92x%14P%40%16F%10%10%91%C8)%A5%90%A2%18'%9F%18%22%C3!%97%40%E2S%26%9B%88B%C4n%1E%11%80%80%04%12%98E%93%0C%81l%F2J)%9Bl%F2%C9%23b%A41%09K%19*%A2%06H%06q%F4%80%01%02%25%40%00H%10%08%D1%87)%9E%D8%F8%89%1D*%98%F0E%25%9Bh%25%06%04)%069%01%08%3A%A0%F0%11H%0F(%D9%89'%8D%C8!%04%04h%AA!%97%2C3%1Di%E4%015%E0%81H%123%15D%10%04%19%08%C1%88%23t%E4%80%A5%02%0FL%B0fH%BB%11%B0%DB%0B%82%E8%F1F%053%11t%1A%06%3A%FC%91%C7%0CI%C9%24%A8%2C%3E%04%8A%5C%02%0D%1CP%C1%16%82%DC%80%D1i%09%3DP%83%16X%D8%20S%8B8%1D%B0%84%19%F0%3E%9C%A6%C0%04D%26PAH%B7%3E%A0%80%04%13%8C%A0%05%19.%E0%97%D3n%1B-%F1%86%0D%80z4%EAx%02M%40%EB%04fD%E1B%918m%B4k%02%10%F8%F0F%AC%A7a%E4%AC%02%0E%A4%F5%80%08%BF%92p%80%B5E%1E%C4%9B%02%06(%B0D%19%3FP%3BA%04iI%F0%00%07n%98%B1%DBr%CAr%D4%40%BF%09(%F7C%1BKXj%C0n%CA%B5%A0%85%16%06X%DB%AF%B2%A55%C0%DB%40%07%F8%A0G%12%E4a%3B%D0%04Z%94%B1%5BNF%AA%7B%90%BA9%F1%E0%06%9D%CEJ0B%1BY%B4%98TF0%93L%F2%BE6%B4%11%C5%05%0F%F00%C5%14-%080%01%C9F%06%0D%B2%D0%1CI%90%04%19Q%F80%C6%14%23%F4WAi1%83%AC.%B3%02%F0*%90%0Fy%E41%C5%7D%1B%A3%A5%E2%C8C%F3%85%91MEf%3B%05%04%DD%0A-v%02%CC%26%10%10%00%00%3B"

second_third =  '<img src="' + second_third + '">';

var first_third = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08k%00%08k%08%08s%08%10c%00%10k%00%10k%08%10s%00%10s%08%10%7B%00%18k%00%18k%08%18k%10%18s%00%18s%08%18s%10%18%7B%00%18%7B%08!k%08!k%10!s%08!s%10!%7B%109k%10Jk%18Js!J%7B!J%84)J%8C!J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C1R%94)R%941Zs1Z%8C1Z%8C9Z%9C9Z%A51c%84Bc%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%ADBk%ADJs%84Bs%94Js%94Rs%9CRs%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%9Cc%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5k%94%B5s%94%BDk%94%C6c%94%CEk%94%D6k%94%D6s%94%DEk%9C%A5s%9C%B5k%9C%B5s%9C%BDs%A5%AD%7B%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6%7B%A5%EF%7B%AD%BD%84%AD%C6%7B%AD%C6%84%AD%C6%8C%AD%C6%94%AD%CE%84%AD%DE%7B%B5%BD%8C%B5%C6%8C%B5%C6%94%B5%CE%84%B5%CE%8C%B5%D6%94%BD%B5%8C%C6%B5%8C%C6%BD%8C%C6%BD%94%C6%C6%8C%C6%C6%94%C6%DE%9C%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%C6%94%CE%C6%9C%CE%C6%A5%D6%B5%9C%D6%BD%9C%D6%BD%A5%D6%C6%9C%D6%C6%A5%DE%BD%A5%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%00%1B(h%E0%E0%C0%01%82%142%60%F0PCJ%173%5D%B8D%09r%E2%82%04%0A%0D2%1E(%90%B1%A3%03%8D%0E%1C(P%80A%C8%1DI%8B%18Q%92%24I%A5%A33)%24%0C%FC%08a%60%C7%9B%045(%A1%B3%92%12%A3%96%2C%19%0DZDHO%1A%12%14%0E%3A%60p%80AF%03%07%20%2CP%90%02L%1EJ%94%12%25b%C9%B5%25%23%95%94%C2%F0%A0%60%B3%81%01%B3g%1BPp%F1%C5'%23H%5D%B9Vb%89)%D2%A0Hz%92%60l%00%81%A9%01%08%06%14%C0%E0%C9%15%93%24L%94%F8%C4%99Rg%2B%5CH%97%24Q%F2%A3%97A%DA%8E0%D2D%CA%04%09%92aH%8C%08ya%E1a%08%9F%95%92%20%C3%8D%D4G%AF%82%B4%0AB%A4%99%94%DA3%A4H%92%1CQ%91%60!%82%82%1BsX%5E%B2%0D)%93%1E%1Cd%1B%2C%D0%40%C7%11%23K%AA%2FQ%FAcEA%01%EB%04%14%EC%98%E3%E8%B0%25K%97%22%FE%E3%D1AA%C2%88!yX~%C7%04%F7P%F5%02%04%0E%10%80_%80%07%9E%DA%DF-IF3BB%8B%3Cs%0D%C7%DEdJ%60g%00%03%96%D1%87%C3%7D%92%40%A7_%25%83LAA%15sI2%DC%25%91%1C%A2D%01%05%C8W%00%82%F1y%98%03%1E%91%0D%07%97%24%7F%A4%00Hbp)%C2%C8%239p%B8%91%01%F1)%40%40%7C%1C%16%B0%00%1E%91D%86%9B%24%88P%E1%C5%1F-Q%12%89%1F_t%A8%A4%7C7rH%80%00J%B2%20%87%91%91%AC%A4%86%08%1FL%E1%08'%9C4bE%8E%06q8%12%0A%0D%C8%B8%D1u7%D8%C1%25!i%DCP%9E%04%5Cri%5D%87%1B%09%40%80%03l%08%E2%83%8C%05%04p%9D%02qr%E2%82%04!E%10h%8Ee%06P%A6%03%7B%B8A%C6Fg%5EW%40%A0%0AL%90%D1H%5Cj1%C3H%F4A%FA%C4%1E%2B%E4%A8%C0F%0A8%E0%04%97%02%E1%24%10%10%9A%22%0A%9FA%DF%0D%00PPv%D69%C0%84%16%26(%90%00N%18q%04%04%19%0EH%9A%E3%7C%F4%95I%C0%02Z%18%91kY%19q%E4%80%A5%0B%CC%E0%C6%0C%AFr%D8%C0%016rT%80%06NdABv%04%A5zPF%0EP%40%00%05%40dA-%7C%C6%5Ew%C0%00%0A%8C%B1%05F3%E1T%C1G%E3%0AD%C3%18%7B%3A%A9m%01%0Ed%E1%04%B8%E5zt%10%00%E1%AAU%C0%04%0AH%3BCv%D7%CD%D7%40%B7%C9i%D4%D1%B8%18%E3%A4%80%0Cb%FC%E0%EEub4%F1%91%AA%07elqF%F4%AA%20F%11%05%24%10%C3%11G%94%C0%EC%B5'%93%8C%D3%04%3E%60Q%C4%0CW%1C%C1%C1%AE%E6%5EL3N%E3%3AU%E6%04%F4%CE%D0F%1BGh%90%EAR4354NR%F35%D0H%0E%BCL%D6%5E%1D%9Du%90%D1%0D%04%04%00%3B"

first_third =  '<img src="' + first_third + '">';

var first_second_third = "data:image/gif,GIF89a!%00%1D%00%F7%00%00%08k%00%10k%00%10k%08%10s%00%10s%08%10%7B%00%18k%00%18k%08%18s%00%18s%08%18s%10%18%7B%00%18%7B%08%18%7B%10!k%00!k%08!k%10!s%08!s%10!%7B%00!%7B%10!%7B%18)k%08)s%10)%7B%10Bs%18B%7B!Jk%18Js!J%7B)J%84!J%84)J%8C)J%94)Rs)Rs1R%7B1R%84)R%841R%849R%8C1R%94)R%941Zs1Z%849Z%8C1Z%8C9Z%941Z%9C9Z%A51c%84Jc%8C9c%941c%949c%9C9c%A59c%A5Bc%ADBk%7B9k%8C9k%8CBk%94Bk%94Jk%94Rk%9CBk%9CJk%A59k%A5Bk%ADBk%ADJs%84Bs%94Js%94Rs%9CRs%ADJs%B5Js%B5Rs%BDR%7B%A5R%7B%A5Z%7B%ADZ%7B%B5R%7B%BDR%7B%BDZ%7B%C6Z%7B%CER%84%8CR%84%94R%84%9Cc%84%A5c%84%A5k%84%ADZ%84%BDZ%84%BDc%84%C6Z%84%C6c%84%CEc%8C%94Z%8C%A5k%8C%ADc%8C%B5c%8C%B5k%8C%C6c%8C%CEc%8C%CEk%8C%D6c%94%9Cc%94%ADk%94%ADs%94%B5k%94%B5s%94%BDk%94%C6c%94%CEk%94%D6k%94%D6s%94%DEk%9C%B5k%9C%B5s%9C%BDs%A5%B5k%A5%BDs%A5%BD%7B%A5%BD%84%A5%C6%7B%A5%EF%7B%AD%BD%84%AD%C6%84%AD%C6%94%AD%DE%7B%B5%CE%84%B5%D6%94%BD%D6%94%BD%D6%9C%BD%D6%A5%C6%B5%94%C6%BD%94%C6%D6%94%C6%D6%9C%C6%D6%A5%C6%DE%9C%CE%B5%94%CE%B5%9C%CE%BD%94%CE%BD%9C%CE%D6%94%CE%D6%9C%CE%D6%A5%D6%B5%9C%D6%BD%9C%D6%BD%A5%FF%00%00%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%2C%00%00%00%00!%00%1D%00%00%08%FE%00%13%1CH%A0%80%00%01%82%12%20p%10%A1%E3%8A%9A%87a%AC%18Y%B1%81%C3%87%04%18%09%08%C0%C8QAF%05%0A%0E%1C%E8p%24%0F%A2F%87%20AB%E4he%1B%16%22%3D*%600%90%A3M%84O%EE%20%82%D4%12QJH%87%0E%3D%3A%C4%A7%0D%0A%09%071%0E%E08%80%00%83%90.%C8%ECQ4)%A8%CAK%97T%A2T9%A8M%10%095%13%2C%1D%B04%81%84%19c%08%1Dr%D4%88'%24%ACXU%BA%15%CA%C7%89%07%8C%0C%10%10%18%C0%60%C0%81%1Aw%12%B5l)%17%EE%A5%94%8E%D6%BAEdWl%02%04%1Ck%B4y%C4%D3Q%25G%89%11%AD%C1%8A%C4%8F%A2%96%8D0%B7e%1C%E1%40%D2%03%25%DA%EC%0C%7D%F9%E7%18%08%16%1E%40%E8a%A72%24Jl%25%1D%EA!%01%A3%82%0E%3A1%3B%A2%14z%E5%16%08%0F%CC%1A%90%D0%23%F8e%DC*%F5%FC8%A0%80%C5%0F%3F%95)A%1A%BD%05l%82%08%18%11%FE%40%08%A2g%3Bf%E8%90%D8%9C%D0%20c%8F%CA%E1%8B%9FxG0a%02d%03%07%7C%E8%01-%7C%25%96%0EZ%182%18h%88%C8W%13%02%08BFS~%E5a%F6%08f%2B%B1%00H!%8A5%82%88%22%3E%20%E5%11d%E0u%24%10%0Bz%B4%B5%1D%24%85%0C%92%85%18%3B%A5%F4%08%22c%80D%40%03%1C%E1w%80%5E%04%85%C4C%1D%91%A0%A4H!l%980%02%16%88%3C%82%D5q%1E%C1x%90%04%12%D0%80%A4%00%0D%80%A4%00%04%3B%D4%81%95%20k%F8%00%C1%95c%18F%1D%01%0A4%20%C0%01%18%98%11%C8%10%03%15%C4%25r%86%CD%00%01u%0FH%60XHH%99%95%40%05%7D%C8%81%06%05%07%E0%09%E7%01Z%F6%26%D0%01n%5E%82%03%A0%22%11%94%00%05T%F4%11%03F%80%82%F5%C0%0BS%60%25%D0M%02%15%F1%C5%A0%D4I%80%80%00%114%40%81%00%14(%60%80%02HJ0E%17*%1C%60%C0M%BDmT%04%1A%CB%15%F4%E6%A7%40%AB%0A%84%E4r_0%A1%C2%A46m%A4%00x%0A%E0%10%07%A6~J%40%81%04%01(g*%17*%04P%E6%A4I!%14%80%04Ex%91C%A1f%25%2BA%04%02Hp%C6%17%BD%3DkS%937%1D%90%83%19E%D8j%40%04%E1b0%C5%14%CE%22%D4%D1A%C9%C2H%D0%01%DC%E2%20%07%99%A5I%80%9F%A9%5E%F4%E6QF%04'pP%B46%D9p%06%99H%B2k%86%14%E1%DEtp%C1%06s%14.%0Cf(q%C0%030D%C1D%0A%9C%22%3C1%A5%15%DB%14%C1%10%5D(%81%03%17L%80%B0*%05%C9%12%8Cp%C1%90%25%C0i%B8%C2%C6%C1%C4E%03IP%16%01%90%8Dl%13%8D%09%D04)%0480%01%81%9C6%87%97T%CD%09%04%04%00%3B"

first_second_third =  '<img src="' + first_second_third + '">';





var bases;
var basesFiller;

//remove headline

var headline = document.evaluate("//td/span/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var k = 0; k < headline.snapshotLength; k++) {
var nodeResult = headline.snapshotItem(k);


blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);
}

//Remove score
var nodeResult;
var finalScore = document.evaluate("//td/span/following-sibling::b/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var j = 0; j < finalScore.snapshotLength; j++) {
nodeResult = finalScore.snapshotItem(j);

blank = document.createElement("div")
blank.innerHTML = '';
nodeResult.parentNode.replaceChild(blank,nodeResult);

}

//remove boxscore
allElements[0].parentNode.replaceChild(blank,allElements[0]);



var boxscoreLength = boxscore.length;


var visitor = story.substring(0,story.indexOf("."));
var home = story.substring( story.indexOf("\n") + 1,story.indexOf(".", story.indexOf("\n") + 1));
var visitorPitcher = boxscore.substring(boxscore.indexOf("PC    ERA") + 10,boxscore.indexOf("PC    ERA") + 35);
visitorPitcher = visitorPitcher.split(" ");
var homePitcher = boxscore.substring(boxscore.indexOf("PC    ERA",boxscore.indexOf("PC    ERA") + 37) + 10,boxscore.indexOf("PC    ERA",boxscore.indexOf("PC    ERA") + 37) + 35);
homePitcher = homePitcher.split(" ");


 document.addEventListener('click', function(event) {
    
        if (event.target.text == "View Boxscore"){
            GM_setValue('SOMGameChannel',false);
	    GM_setValue('SOMGameChannelClick',true);
        }
    
    }, true);


var myGameChannelClick = GM_getValue('SOMGameChannelClick',false);

if (myGameChannelClick == true){

	GM_setValue('SOMGameChannel',true);
	GM_setValue('SOMGameChannelClick',false);

}


var howManyInningsIndex = boxscore.lastIndexOf("BOTTOM OF INNING ");
var howManyInnings = boxscore.substring(howManyInningsIndex + 17,howManyInningsIndex + 19);
howManyInnings = trim(howManyInnings);
howManyInnings = parseFloat(howManyInnings) + 2;

var bullpenV2  = boxscore.substring(boxscore.indexOf("*** TOP OF INNING 1 ***")+112,boxscore.indexOf("*** TOP OF INNING 1 ***")+113);

if(bullpenV2 == "F"){

	isBullpenV2 = true;

}
else
{
	isBullpenV2 = false;
}



var result;

var width = 300;
var percentVisitor = rollsVisitorPitcherPCT;
var percentHome = rollsHomePitcherPCT;
var color = "DBDDCE";

for ( var i = inning; i < howManyInnings; i++) 
{ 

	for (var m = 1; m < 3; m++){
		var m2 = m/2;

		if (m2 == m2.toFixed())
		{
			halfInning = "BOTTOM";
			halfInning2 = "BOT";
			patternString = halfInning + " OF INNING " + i + " ";


			patternString4 = halfInning2 + " OF " + i + " ";
			
			var pattern = new RegExp(patternString, "g")
	   		
	
			while((result = pattern.exec(boxscore)) != null){

				var iNew = i + 1;

				var topOfInning1 = boxscore.substring(result.index + 26,boxscore.indexOf("TOP OF INNING " +  iNew , result.index) - 4);

				topOfInning1 = ltrim(topOfInning1);

				

				if (boxscore.indexOf("TOP OF INNING " +  iNew , result.index) == -1){

					if (iNew >= 10){
						var topOfInning1 = boxscore.substring(result.index + 27,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);		
				
					}
					else
					{
						var topOfInning1 = boxscore.substring(result.index + 26,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);

					}


				}
				topOfInning1 = topOfInning1.replace(/&amp;/g,"&");


				var pattern2 = /\n/;
				var result2;
				result2 = pattern2.exec(topOfInning1);
				var cr = result2.index;

				var atBat1 = topOfInning1.substring(0,20);

				if (trim(atBat1) == ""){

					atBat1 = "&nbsp;";					

				}
				
				advance = topOfInning1.substring(55,71);
				advance = trim(advance);

				var advance2 = advance.split(" ");
				var advance2_lg = advance2.length;

			if (i == "1"){

				bot1 = 0;		

			}
			if (i == "2"){

				bot2 = 0;		

			}
			if (i == "3"){

				bot3 = 0;
						

			}
			if (i == "4"){

				bot4 = 0;		

			}
			if (i == "5"){

				bot5 = 0;		

			}
			if (i == "6"){

				bot6 = 0;		

			}
			if (i == "7"){

				bot7 = 0;		

			}
			if (i == "8"){

				bot8 = 0;		

			}
			if (i == "9"){

				bot9 = 0;		

			}
		
				for(var a=0;a<advance2_lg;a++) {


					if  (advance2[a].match("-H") != null){

						homeScore = homeScore + 1;
			if (i == "1"){

				bot1 = parseFloat(bot1) + 1;	

			}
			if (i == "2"){

				bot2 = parseFloat(bot2) + 1;	

			}
			if (i == "3"){

				bot3 = parseFloat(bot3) + 1;	

			}
			if (i == "4"){

				bot4 = parseFloat(bot4) + 1;		

			}
			if (i == "5"){

				bot5 = parseFloat(bot5) + 1;		

			}
			if (i == "6"){

				bot6 = parseFloat(bot6) + 1;		

			}
			if (i == "7"){

				bot7 = parseFloat(bot7) + 1;		

			}
			if (i == "8"){

				bot8 = parseFloat(bot8) + 1;		

			}
			if (i == "9"){

				bot9 = parseFloat(bot9) + 1;		

			}
						
					}	


				}
				

				if (atBat1.search(/\UBSTITUTE/) != -1){

					var result1 = topOfInning1.substring(0,41);//changed from 31 to 41 for longer names likeJonathan Papelbon

					if (result1.indexOf('\n') != -1){
						result1 = result1.substring(0,result1.indexOf('\n'));
					}

					atBat1 = "&nbsp;";

				}
				else
				{
					var result1 = topOfInning1.substring(25,56);
				}

				result1 = result1.replace(/&amp;/,"&");

				if (result1.match("Single") != null){

					homeHits = homeHits + 1;

				}

				if (result1.match(/Double \(/) != null){

					homeHits = homeHits + 1;

				}

				if (result1.match(/Triple \(/) != null){

					homeHits = homeHits + 1;

				}

				if (result1.match("Home Run") != null){

					homeHits = homeHits + 1;

				}

				if (result1.match("Error") != null){

					visitorErrors = visitorErrors + 1;

				}

		if (result1.match("SUBSTITUTE P ")){
			visitorPitcher[0] = result1.substring(result1.indexOf("-") + 1);
			visitorPitcher[0] = trim(visitorPitcher[0])
		}			



				menOnBase = topOfInning1.substring(cr + 3,cr + 6);
				menOnBase = trim(menOnBase);
//.........................................................................................


					if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

						if(isBullpenV2 == true){

							nextResult = topOfInning1.substring(91 + xChances_lg ,146 + xChances_lg);//For Bullpen v2

						}
						else{

							nextResult = topOfInning1.substring(82 + xChances_lg ,139 + xChances_lg);

						}
						
						
						nextResult = nextResult.replace(/\n/," ");	

					}

if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

				var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
				var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);
				
if (trim(res4)!=""){

			if (trim(res4)!=""){

			if (res4.search(/\SUBSTITUTE/) != -1){

				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);  	
				}
				res4 = trim(res4);  
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			}

			if (flag == true){
				
				flagCount = flagCount + 1;

			}

			if(flagCount == 0){
				flag=true;
				flagCount = flagCount + 1;

			}
	
			  if ((flag==true) && (flagCount > 1)){
				
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){

				

				}	
				else
				{
	 				if (trim(menOnBase)==""){
					var menOnBase = topOfInning1.substring(res3.index + 2,res3.index + 7); 
					}
					menOnBase = trim(menOnBase);
				
					flag=false;
		

				}
}//if (trim(res4)!=""){
			}
			
			}//if (trim(res4)!=""){
			}

		//	}
flagCount = 0;
	}
	else if ((result1.search(/\SUBSTITUTE/) != -1) || (result1.search(/\Injured/) != -1))
	{
	menOnBase = topOfInning1.substring(topOfInning1.indexOf(result1)+result1.length+2,topOfInning1.indexOf(result1)+result1.length+7);
	menOnBase = trim(menOnBase);
	
	}
}
//.........................................................................................


		
				rolls =  topOfInning1.substring(20,25);

				if (rolls == "h&am"){

					rolls = "h&r";

				}

				if (rolls.search(/\n/) != -1){
						
					rolls = "&nbsp;";

				}

				if (result1.search(/\SUBSTITUTE/) != -1){

					rolls = "&nbsp;";	
				}
										

			
				xChances = topOfInning1.substring(72,81);

				

				//This is for instances when length of xChances is less than 8 (examples: bpHR 1, gb(P)x)
		if (xChances.indexOf("\n") != -1){

			if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

				xChances = xChances.substring(0,xChances.indexOf("\n"));
				xChances = trim(xChances);

			}
			else
			{

				xChances = xChances.replace(/\n/," ");

			}
						
		}



		if (xChances.length < 8){

			xChances = topOfInning1.substring(cr + 79,cr + 86);
			xChances = trim(xChances);

		}


		xChances = trim(xChances);


					if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

						xChances_lg = xChances.length;
			
					}
					else
					{
						xChances_lg = 0;
						xChances = "&nbsp;";		
					}


	var rollsLeft = rolls.substring(0,1);	

		//Keep track of BPHR count
		if (xChances.match("bpHR") != null){

			if (parseFloat(rollsLeft) > 3){

				if (result1.match("Home Run") != null){

					BPHRVisitor = BPHRVisitor + trim(visitorPitcher[0]) + ", ";
				}
				else
				{

					BPOutVisitor = BPOutVisitor + trim(visitorPitcher[0]) + ", ";

				}				


			}
			else if (parseFloat(rollsLeft) < 4)
			{

				if(result1.match("Home Run") != null){

					BPHRHome = BPHRHome + trim(atBat1) + ", ";
				}
				else
				{

					BPOutHome = BPOutHome + trim(atBat1) + ", ";
					

				}				




			}

			
		}	
	

	if (parseFloat(rollsLeft) > 3){
		result1Pitcher = result1;
		result1Batter = "&nbsp;";
		rollsPitcher = rolls;
		rollsBatter =  "&nbsp;";
		xchancesPitcher = xChances;
		xchancesBatter =  "&nbsp;";
		rollsVisitor = rollsVisitor + 1;
		rollsVisitorPitcher = rollsVisitorPitcher + 1;
		rollsVisitorPitcherPCT = rollsVisitorPitcher/rollsVisitor;
		rollsVisitorPitcherPCT = Math.round(rollsVisitorPitcherPCT*100);

	}
	else if (parseFloat(rollsLeft) < 4)
	{
	
		result1Batter = result1;
		result1Pitcher = "&nbsp;";
		rollsBatter = rolls;
		rollsPitcher = "&nbsp;";
		xchancesBatter = xChances;
		xchancesPitcher = "&nbsp;";
		rollsVisitor = rollsVisitor + 1;
		rollsVisitorPitcherPCT = rollsVisitorPitcher/rollsVisitor;
		rollsVisitorPitcherPCT = Math.round(rollsVisitorPitcherPCT*100);

	}
	else if ((rollsLeft == " ")||(isNaN(rollsLeft) == true))
	{
		rollsBatter =  "&nbsp;";
		rollsPitcher = "&nbsp;";

	}

	if ((rollsLeft == "h")||((rollsLeft) == "s")||((rollsLeft) == "b"))
	{
		rollsBatter = rolls;

	}

				myOut = topOfInning1.substring(cr + 1,cr + 2);

				if(isBullpenV2 == true){

					pitcherCondition = "(" + topOfInning1.substring(cr + 89,cr + 91) + ")";//For Bullpen v2

				}
				else
				{			
					pitcherCondition = ""

				}

				
				
	
				if(pitcherCondition.search(/\F/)==-1){

					pitcherCondition = "";

				}

//.......................
	if ((trim(myOut) == "") || (isNaN(myOut) == true)){
	
		if(isBullpenV2 == true){

			nextResult = topOfInning1.substring( 91 + xChances_lg ,146 + xChances_lg);//For Bullpen v2

		}
		else{

			nextResult = topOfInning1.substring( 80 + xChances_lg ,135 + xChances_lg);


		}
		
		

		nextResult = nextResult.replace(/\n/," ");


	}



if ((trim(myOut) == "") || (isNaN(myOut) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

			var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
			var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);
			 
			if (trim(res4)!=""){

			if (res4.search(/\SUBSTITUTE/) != -1){

				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);  
	
				}
				res4 = trim(res4);  
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			}

			if (flag == true){
				
				flagCount = flagCount + 1;

			}


			if(flagCount == 0){
				flag=true;
				flagCount = flagCount + 1;
			}
	
		
			  if ((flag==true) && (flagCount > 1)){
				
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){

			
				}	
				else
				{
	 				if (trim(myOut)==""){
						var myOut = topOfInning1.substring(res3.index + 1,res3.index + 2); 
					}
			
				
					flag=false;
		

				}

			}
			
			}//if (trim(res4)!=""){	

			}
			flagCount=0;

	}
	else if ((result1.search(/\SUBSTITUTE/) != -1) || (result1.search(/\Injured/) != -1))
		myOut = topOfInning1.substring(topOfInning1.indexOf(result1)+result1.length+1,topOfInning1.indexOf(result1)+result1.length+2);
	
	
	{
	

	
	}
}
//.......................

					if (menOnBase == "1"){
						bases = first;
									
						basesFiller = "FirsT";
					}
					else if(menOnBase == "2")
					{		
						bases = second;
						basesFiller = "SeconD";
					}
					else if(menOnBase == "3")
					{		
						bases = third;
						basesFiller = "ThirD";
					}
					else if(menOnBase == "12")
					{		
						bases = first_second;
						basesFiller = "First_seconD";
					}
					else if(menOnBase == "1 3")
					{		
						bases = first_third;
						basesFiller = "First_thirD";
					}
					else if(menOnBase == "23")
					{		
						bases = second_third;
						basesFiller = "Second_thirD";
					}
					else if(menOnBase == "123")
					{		
						bases = first_second_third;
						basesFiller = "First_second_thirD";
					}
					else if(menOnBase != "1")
					{
						bases = empty;
						
						basesFiller = "EmptY";
					}
var pixelsVisitor = width * (rollsVisitorPitcherPCT/100); 
var myBarVisitor = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsVisitor + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + visitor + '&nbsp;' + rollsVisitorPitcherPCT + '%</div></div>';


var pixelsHome = width * (rollsHomePitcherPCT/100); 
		
var myBarHome = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsHome + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + home + '&nbsp;' + rollsHomePitcherPCT + '%</div></div>';				

	

//This starts on the first play in the bottom of the first.			
result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + patternString4 + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + visitorPitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat1 + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + result1 + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'</tbody></table><br>' + 
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=1 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' +
"\n";


		

				var pattern2 = /\n/g;
				var result2

				while((result2 = pattern2.exec(topOfInning1)) != null){
					var cr = result2.index;
					
					var batter = topOfInning1.substring(result2.index,topOfInning1.indexOf(/\n/,result2.index));

					var atBat2 = topOfInning1.substring(result2.index + 6,result2.index + 20);

					if (trim(atBat2) == ""){

						atBat2 = "&nbsp;";


					}
					
					var result2Check = topOfInning1.substring(result2.index + 31,result2.index + 62);
				

				if ((result2Check.search(/\SUBSTITUTE/) != -1)||result2Check.search(/\Injured/) != -1){
	
					var result2 = topOfInning1.substring(result2.index + 31,result2.index + 92);
					var result2 = result2.substring(1,result2.indexOf('\n'));
	
				}
				else
				{
					var result2 = result2Check;
					
					
				}	
	
		


					result2 = result2.replace(/&amp;/,"&");

					if(result2 != ""){

						lastResult = result2;

					}

	
					if (result2.match("Single") != null){
	
						homeHits = homeHits + 1;

					}

					if (result2.match(/Double \(/) != null){

						homeHits = homeHits + 1;

					}	

					if (result2.match(/Triple \(/) != null){

						homeHits = homeHits + 1;

					}

					if (result2.match("Home Run") != null){

						homeHits = homeHits + 1;

					}

					if (result2.match("Error") != null){

						visitorErrors = visitorErrors + 1;

					}

		if (result2.match("SUBSTITUTE P ")){
		
			visitorPitcher[0] = result2.substring(result2.indexOf("-") + 1);
			visitorPitcher[0] = trim(visitorPitcher[0])
		}

					rolls =  topOfInning1.substring(cr + 27,cr + 31);

					if (rolls == "h&am"){

						rolls = "h&r";

					}

					if (result2.search(/\SUBSTITUTE/) != -1){

						rolls = "&nbsp;";	
					}
					

										

					xChances = topOfInning1.substring(cr + 79,cr + 88);

				
					
					//This is for instances when length of xChances is less than 8 (examples: bpHR 1, gb(P)x)
		if (xChances.indexOf("\n") != -1){

			if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

				xChances = xChances.substring(0,xChances.indexOf("\n"));
				xChances = trim(xChances);

			}
			else
			{

				xChances = xChances.replace(/\n/," ");

			}
						
		}




		if (xChances.length < 8){

			xChances = topOfInning1.substring(cr + 79,cr + 86);
			xChances = trim(xChances);

		}


		xChances = trim(xChances);

	
					if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

						xChances_lg = xChances.length;
						
			
					}
					else
					{
						xChances_lg = 0;
						xChances = "&nbsp;";		
					}

	var rollsLeft = rolls.substring(0,1);	

		//Keep track of BPHR count
		if (xChances.match("bpHR") != null){

			if (parseFloat(rollsLeft) > 3){

				if (result2.match("Home Run") != null){

					BPHRVisitor = BPHRVisitor + trim(visitorPitcher[0]) + ", ";
				}
				else
				{

					BPOutVisitor = BPOutVisitor + trim(visitorPitcher[0]) + ", ";

				}				


			}
			else if (parseFloat(rollsLeft) < 4)
			{

				if(result2.match("Home Run") != null){

					BPHRHome = BPHRHome + trim(atBat2) + ", ";
				}
				else
				{

					BPOutHome = BPOutHome + trim(atBat2) + ", ";
					

				}				




			}

			
		}	
	

	if (parseFloat(rollsLeft) > 3){
		result2Pitcher = result2;
		result2Batter = "&nbsp;";
		rollsPitcher = rolls;
		rollsBatter =  "&nbsp;";
		xchancesPitcher = xChances;
		xchancesBatter =  "&nbsp;";
		rollsVisitor = rollsVisitor + 1;
		rollsVisitorPitcher = rollsVisitorPitcher + 1;
		rollsVisitorPitcherPCT = rollsVisitorPitcher/rollsVisitor;
		rollsVisitorPitcherPCT = Math.round(rollsVisitorPitcherPCT*100);


	}
	else if (parseFloat(rollsLeft) < 4)
	{
	
		result2Batter = result2;
		result2Pitcher = "&nbsp;";
		rollsBatter = rolls;
		rollsPitcher = "&nbsp;";
		xchancesBatter = xChances;
		xchancesPitcher = "&nbsp;";
		rollsVisitor = rollsVisitor + 1;
		rollsVisitorPitcherPCT = rollsVisitorPitcher/rollsVisitor;
		rollsVisitorPitcherPCT = Math.round(rollsVisitorPitcherPCT*100);

	}
	else if ((rollsLeft == " ")||(isNaN(rollsLeft) == true))
	{
		rollsBatter =  "&nbsp;";
		rollsPitcher = "&nbsp;";

	}

	if ((rollsLeft == "h")||((rollsLeft) == "s")||((rollsLeft) == "b"))
	{
		rollsBatter = rolls;

	}	
		

		if(isBullpenV2 == true){

					if (xChances_lg > 0){
					
						myOut = topOfInning1.substring(cr + 92 ,cr + 93 );//For Bullpen v2
						
					
					}
					else
					{
						
						myOut = topOfInning1.substring(cr + 92 + xChances_lg ,cr + 93 + xChances_lg); //For Bullpen v2
					}

					pitcherCondition = "(" + topOfInning1.substring(cr + 89,cr + 91) + ")";//For Bullpen v2

					if(pitcherCondition.search(/\F/)==-1){

						pitcherCondition = "";

					}
		}
		else{

					if (xChances_lg > 0){

						myOut = topOfInning1.substring(cr + 81 + xChances_lg ,cr + 82 + xChances_lg);
					
					}
					else
					{
						myOut = topOfInning1.substring(cr + 80 + xChances_lg ,cr + 81 + xChances_lg);
					
					}

					pitcherCondition = "";

					if(pitcherCondition.search(/\F/)==-1){

						pitcherCondition = "";

					}			

		}		


//.......................


	if ((trim(myOut) == "") || (isNaN(myOut) == true)){

		if(isBullpenV2 == true){

			nextResult = topOfInning1.substring(cr + 91 + xChances_lg ,cr + 146 + xChances_lg);//For Bullpen v2

		}
		else
		{

			nextResult = topOfInning1.substring(cr + 80 + xChances_lg ,cr + 135 + xChances_lg);


		}
	
		
		

		nextResult = nextResult.replace(/\n/," ");


	}



if ((trim(myOut) == "") || (isNaN(myOut) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;



			while((res3 = patt3.exec(topOfInning1)) != null){

			var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
			var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);

			if (trim(res4)!=""){
	
			


			if (res4.search(/\SUBSTITUTE/) != -1){
				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(0,res4.indexOf('\n'));
					res4 = trim(res4);
						
				}
				else
				{
					var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 70);
					if (res4.indexOf('\n') != -1){
						var res4 = res4.substring(0,res4.indexOf('\n'));
						res4 = trim(res4);  
					}
					res4 = trim(res4);
					
				}
				
			}
			

			if (res4.search(/\Injured/) != -1){
				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			 
			}



			if (flag == true){
				
				flagCount = flagCount + 1;

			}

			if((result2.substring(0,res4.length) == res4)&&(flagCount == 0)){

				if (trim(atBat2)!="&nbsp;"){

					if (trim(atBat2)==trim(res4AtBat)){

						flag=true;
						flagCount = flagCount + 1;

					}

				}
				else
				{
						flag=true;
						flagCount = flagCount + 1;
				}

			}

	

			  if ((flag==true) && (flagCount > 1)){
					
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){
				
	
				}	
				else
				{
	 
					if (trim(myOut)==""){
						var myOut = topOfInning1.substring(res3.index + 1,res3.index + 2); 
						
					}

			
				
					flag=false;
					flagCount = 0;

				}

			}
		
			}//	if (trim(res4)!=""){
			}
				flagCount = 0;	

	}
	else if ((result2.search(/\SUBSTITUTE/) != -1) || (result2.search(/\Injured/) != -1))
		myOut = topOfInning1.substring(topOfInning1.indexOf(result2)+result2.length+1,topOfInning1.indexOf(result2)+result2.length+2);
	
	{
	

	
	}
}
//.......................

					if (trim(myOut) == ""){

						myOut = "3";

					}	

					if (trim(myOut) == "<"){

						myOut = "3";

					}


					menOnBase = topOfInning1.substring(cr + 2,cr + 7);
					menOnBase = trim(menOnBase);

if(isBullpenV2 == true){					

					if (xChances_lg > 0){

					
						menOnBase2 = topOfInning1.substring(cr + 93 ,cr + 98 );//For Bullpen v2
					
						menOnBase2 = trim(menOnBase2);
						menOnBase = String(menOnBase2);
						menOnBase = trim(menOnBase);
					}
					else
					{

						
						var menOnBase2Test = topOfInning1.substring(cr + 93 ,cr + 98);//For Bullpen v2
			

						if (menOnBase2Test.substring(menOnBase2Test.length-1,menOnBase2Test.length)=="-"){

							menOnBase2 = "";

						}
						else
						{
							
							menOnBase2 = topOfInning1.substring(cr + 93 ,cr + 97);//For Bullpen v2
						}

						menOnBase2 = trim(menOnBase2);
						menOnBase = String(menOnBase2);
						menOnBase = trim(menOnBase);
					}

}
else
{

					if (xChances_lg > 0){

						menOnBase2 = topOfInning1.substring(cr + 82 + xChances_lg,cr + 87 + xChances_lg);
						
					
						menOnBase2 = trim(menOnBase2);
						menOnBase = String(menOnBase2);
						menOnBase = trim(menOnBase);
					}
					else
					{

						var menOnBase2Test = topOfInning1.substring(cr + 81 ,cr + 86);
						
			

						if (menOnBase2Test.substring(menOnBase2Test.length-1,menOnBase2Test.length)=="-"){

							menOnBase2 = "";

						}
						else
						{
							menOnBase2 = topOfInning1.substring(cr + 81 ,cr + 85);
							
						}

						menOnBase2 = trim(menOnBase2);
						menOnBase = String(menOnBase2);
						menOnBase = trim(menOnBase);
					}	


}

//.........................................................................................


					if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

						if(isBullpenV2 == true){

							nextResult = topOfInning1.substring(cr + 91 + xChances_lg ,cr + 146 + xChances_lg);//For Bullpen v2

						}
						else
						{

							nextResult = topOfInning1.substring(cr + 82 + xChances_lg ,cr + 135 + xChances_lg);

						}
						
						
						nextResult = nextResult.replace(/\n/," ");	

					}

if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

				var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
				var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);
if (trim(res4)!=""){

			if (res4.search(/\SUBSTITUTE/) != -1){

				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);  	
				}
				res4 = trim(res4);  
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			}

	

			if (flag == true){
				
				flagCount = flagCount + 1;

			}


			if((result2.substring(0,res4.length) == res4)&&(flagCount == 0)){

				if (trim(atBat2)!="&nbsp;"){

					if (trim(atBat2)==trim(res4AtBat)){

						flag=true;
						flagCount = flagCount + 1;

					}

				}
				else
				{
						flag=true;
						flagCount = flagCount + 1;
				}

			}

	
		
			  if ((flag==true) && (flagCount > 1)){
				
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){

		
				
				}	
				else
				{
	 				if (trim(menOnBase)==""){
					var menOnBase = topOfInning1.substring(res3.index + 2,res3.index + 7); 
					}
					menOnBase = trim(menOnBase);
			
				
					flag=false;
					flagCount = 0;
		

				}
}//if (trim(res4)!=""){
			}
			

			}

		//	}
flagCount = 0;
	}
	else if ((result2.search(/\SUBSTITUTE/) != -1) || (result2.search(/\Injured/) != -1))
	{
	menOnBase = topOfInning1.substring(topOfInning1.indexOf(result2)+result2.length+2,topOfInning1.indexOf(result2)+result2.length+7);
	menOnBase = trim(menOnBase);
	
	}
}
//.........................................................................................





					advance = topOfInning1.substring(cr + 62,cr + 79);
					advance = trim(advance);
					
					
					
					var advance2 = advance.split(" ");
					var advance2_lg = advance2.length;
		
					//RESULTS FOR HOME TEAM
					for(var a=0;a<advance2_lg;a++) {

					if  (advance2[a].match("-H") != null){

						homeScore = homeScore + 1;

			if (i == "1"){

				bot1 = parseFloat(bot1) + 1;		

			}
			if (i == "2"){

				bot2 = parseFloat(bot2) + 1;		

			}
			if (i == "3"){

				bot3 = parseFloat(bot3) + 1;		

			}
			if (i == "4"){

				bot4 = parseFloat(bot4) + 1;		

			}
			if (i == "5"){

				bot5 = parseFloat(bot5) + 1;		

			}
			if (i == "6"){

				bot6 = parseFloat(bot6) + 1;		

			}
			if (i == "7"){

				bot7 = parseFloat(bot7) + 1;		

			}
			if (i == "8"){

				bot8 = parseFloat(bot8) + 1;		

			}
			if (i == "9"){

				bot9 = parseFloat(bot9) + 1;		

			}
					
					}

						
					}
					
			

					
					if (menOnBase == "1"){
						bases = first;
									
						basesFiller = "FirsT";
					}
					else if(menOnBase == "2")
					{		
						bases = second;
						basesFiller = "SeconD";
					}
					else if(menOnBase == "3")
					{		
						bases = third;
						basesFiller = "ThirD";
					}
					else if(menOnBase == "12")
					{		
						bases = first_second;
						basesFiller = "First_seconD";
					}
					else if(menOnBase == "1 3")
					{		
						bases = first_third;
						basesFiller = "First_thirD";
					}
					else if(menOnBase == "23")
					{		
						bases = second_third;
						basesFiller = "Second_thirD";
					}
					else if(menOnBase == "123")
					{		
						bases = first_second_third;
						basesFiller = "First_second_thirD";
					}
					else if(menOnBase != "1")
					{
						bases = empty;
						
						basesFiller = "EmptY";
					}
					
var pixelsVisitor = width * (rollsVisitorPitcherPCT/100); 
var myBarVisitor = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsVisitor + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + visitor + '&nbsp;' + rollsVisitorPitcherPCT + '%</div></div>';


var pixelsHome = width * (rollsHomePitcherPCT/100); 
		
var myBarHome = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsHome + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + home + '&nbsp;' + rollsHomePitcherPCT + '%</div></div>';			
//This begins after the first play at the bottom of the first.
		if(result2 != ""){				

result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + patternString4 + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + visitorPitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat2 + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + result2 + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'</tbody></table><br>' + 
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=1 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' +
"\n";

		


// HOME RESULTS????????????????????????


		}//if
	}//while

}//while
///
   		}
		else
	   	{
			halfInning = "TOP";
			patternString = halfInning + " OF INNING " + i + " ";
			patternString4 = halfInning + " OF " + i + " ";
			var pattern = new RegExp(patternString, "g")
   		

			if ( i == "1"){
				result3 = result3  + patternString  + "\n"; 
				
			}
			else
			{

				//result3 = result3 + patternString; 

			}


while((result = pattern.exec(boxscore)) != null){

var iNew = i + 1;


/* sample of topOfInning1

0     G.Sizemore          3-6  Fly Out (RF)                   b-0             
1     M.Derosa            2-8  Fly Out (RF)                   b-0             
2     B.Hawpe             6-7  Strike Out                     b-0  
*/

	var topOfInning1 = boxscore.substring(result.index + 26,boxscore.indexOf("BOTTOM OF INNING " +  i , result.index) - 4);

	topOfInning1 = ltrim(topOfInning1);

				if (boxscore.indexOf("BOTTOM OF INNING " +  i , result.index) == -1){

					if (i >= 10){
						var topOfInning1 = boxscore.substring(result.index + 27,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);						
					}
					else
					{
						var topOfInning1 = boxscore.substring(result.index + 26,boxscoreLength - 4);
						topOfInning1 = ltrim(topOfInning1);
						
					}


				}





topOfInning1 = topOfInning1.replace(/&amp;/g,"&");	

var pattern2 = /\n/;
var result2;

	result2 = pattern2.exec(topOfInning1);
	
	var cr = result2.index;
			
		


	var atBat1 = topOfInning1.substring(0,20);

	if (trim(atBat1) == ""){

		atBat1 = "&nbsp;";

	}

	advance = topOfInning1.substring(55,71);
	advance = trim(advance);
					
	var advance2 = advance.split(" ");
	var advance2_lg = advance2.length;



			if (i == "2"){

				top2 = 0;		

			}
			if (i == "3"){

				top3 = 0;
						

			}
			if (i == "4"){

				top4 = 0;		

			}
			if (i == "5"){

				top5 = 0;		

			}
			if (i == "6"){

				top6 = 0;		

			}
			if (i == "7"){

				top7 = 0;		

			}
			if (i == "8"){

				top8 = 0;		

			}
			if (i == "9"){

				top9 = 0;		

			}
		

	for(var a=0;a<advance2_lg;a++) {

		

		if  (advance2[a].match("-H") != null){

			visitorScore = visitorScore + 1;

			if (i == "1"){

				top1 = parseFloat(top1) + 1;		

			}
			if (i == "2"){

				top2 = parseFloat(top2) + 1;		

			}
			if (i == "3"){

				top3 = parseFloat(top3) + 1;
						

			}
			if (i == "4"){

				top4 = parseFloat(top4) + 1;		

			}
			if (i == "5"){

				top5 = parseFloat(top5) + 1;		

			}
			if (i == "6"){

				top6 = parseFloat(top6) + 1;		

			}
			if (i == "7"){

				top7 = parseFloat(top7) + 1;		

			}
			if (i == "8"){

				top8 = parseFloat(top8) + 1;		

			}
			if (i == "9"){

				top9 = parseFloat(top9) + 1;		

			}
		
		}
			

	}



	if (atBat1.search(/\UBSTITUTE/) != -1){

		var result1 = topOfInning1.substring(0,41);//changed from 31 to 41 for longer names like papelbon
		if (result1.indexOf('\n') != -1){
			result1 = result1.substring(0,result1.indexOf('\n'));
		}
		atBat1 = "&nbsp;";

	}
	else
	{
		var result1 = topOfInning1.substring(25,54);
		
	}

	result1 = result1.replace(/&amp;/,"&");

					if (result1.match("Single") != null){
	
						visitorHits = visitorHits + 1;

					}

					if (result1.match(/Double \(/) != null){

						visitorHits = visitorHits + 1;

					}	

					if (result1.match(/Triple \(/) != null){

						visitorHits = visitorHits + 1;

					}

					if (result1.match("Home Run") != null){

						visitorHits = visitorHits + 1;

					}

					if (result1.match("Error") != null){

						homeErrors = homeErrors + 1;

					}

		if (result1.match("SUBSTITUTE P ")){
		
			homePitcher[0] = result1.substring(result1.indexOf("-") + 1);
			homePitcher[0] = trim(homePitcher[0])
		}



	var pattern2 = /\n/g;
	var result2;

	
	menOnBase = topOfInning1.substring(cr + 3,cr + 6);
	menOnBase = trim(menOnBase);


//.........................................................................................


					if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

						if(isBullpenV2==true){

							nextResult = topOfInning1.substring(cr + 91 + xChances_lg ,cr + 146 + xChances_lg);//For Bullpen v2

						}
						else
						{
							nextResult = topOfInning1.substring(cr + 82 + xChances_lg ,cr + 139 + xChances_lg);

						}
						
						
						nextResult = nextResult.replace(/\n/," ");	

					}

if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

				var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
				var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);
if (trim(res4)!=""){

			if (res4.search(/\SUBSTITUTE/) != -1){

				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);  	
				}
				res4 = trim(res4);  
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			}

			if (flag == true){
				
				flagCount = flagCount + 1;

			}


			if(flagCount == 0){
				flag=true;
				flagCount = flagCount + 1;

			}
	
		
			  if ((flag==true) && (flagCount > 1)){
				
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){


				}	
				else
				{
	 				if (trim(menOnBase)==""){
					var menOnBase = topOfInning1.substring(res3.index + 2,res3.index + 7); 
					}
					menOnBase = trim(menOnBase);
				
					flag=false;
		

				}

			}
			

}//if (trim(res4)!=""){
			}

		//	}
flagCount = 0;
	}
	else if ((result1.search(/\SUBSTITUTE/) != -1) || (result1.search(/\Injured/) != -1))
	{
	menOnBase = topOfInning1.substring(topOfInning1.indexOf(result1)+result1.length+2,topOfInning1.indexOf(result1)+result1.length+7);
	menOnBase = trim(menOnBase);
	
	}
}
//.........................................................................................


	rolls =  topOfInning1.substring(20,24);

		if (rolls == "h&am"){

			rolls = "h&r";

		}

				if (rolls.search(/\n/) != -1){
						
					rolls = "&nbsp;";

				}
				
			if (result1.search(/\SUBSTITUTE/) != -1){

				rolls = "&nbsp;";	
			}					

	xChances = topOfInning1.substring(72,81);


	

	//This is for instances when length of xChances is less than 8 (examples: bpHR 1, gb(P)x)
		if (xChances.indexOf("\n") != -1){

			if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

				xChances = xChances.substring(0,xChances.indexOf("\n"));
				xChances = trim(xChances);

			}
			else
			{

				xChances = xChances.replace(/\n/," ");

			}
						
		}




		if (xChances.length < 8){

			//xChances = topOfInning1.substring(cr + 72,cr + 79);
			xChances = topOfInning1.substring(cr + 79,cr + 86);
		
			xChances = trim(xChances);

		}


		xChances = trim(xChances);


	if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

		xChances_lg = xChances.length;
			
	}
	else
	{
		xChances_lg = 0;
		xChances = "&nbsp;";		
	}



	var rollsLeft = rolls.substring(0,1);	


		//Keep track of BPHR count
		if (xChances.match("bpHR") != null){

			if (parseFloat(rollsLeft) > 3){

				if (result1.match("Home Run") != null){

					BPHRHome = BPHRHome + trim(homePitcher[0]) + ", ";


				}
				else
				{

					BPOutHome = BPOutHome + trim(homePitcher[0]) + ", ";

				}				


			}
			else if (parseFloat(rollsLeft) < 4)
			{

				if(result1.match("Home Run") != null){

					BPHRVisitor = BPHRVisitor + trim(atBat1) + ", ";
		
				}
				else
				{

					BPOutVisitor = BPOutVisitor + trim(atBat1) + ", ";
					

				}				




			}



		}


	

	if (parseFloat(rollsLeft) > 3){
		result1Pitcher = result1;
		result1Batter = "&nbsp;";
		rollsPitcher = rolls;
		rollsBatter =  "&nbsp;";
		xchancesPitcher = xChances;
		xchancesBatter =  "&nbsp;";
		rollsHome = rollsHome + 1;
		rollsHomePitcher = rollsHomePitcher + 1;
		rollsHomePitcherPCT = rollsHomePitcher/rollsHome;
		rollsHomePitcherPCT = Math.round(rollsHomePitcherPCT*100);


	}
	else if (parseFloat(rollsLeft) < 4)
	{
	
		result1Batter = result1;
		result1Pitcher = "&nbsp;";
		rollsBatter = rolls;
		rollsPitcher = "&nbsp;";
		xchancesBatter = xChances;
		xchancesPitcher = "&nbsp;";
		rollsHome = rollsHome + 1;
		rollsHomePitcherPCT = rollsHomePitcher/rollsHome;
		rollsHomePitcherPCT = Math.round(rollsHomePitcherPCT*100);

	}
	else if ((rollsLeft == " ")||(isNaN(rollsLeft) == true))
	{
		rollsBatter =  "&nbsp;";
		rollsPitcher = "&nbsp;";

	}

	if ((rollsLeft == "h")||((rollsLeft) == "s")||((rollsLeft) == "b"))
	{
		rollsBatter = rolls;

	}


	myOut = topOfInning1.substring(cr + 1,cr + 2);

		if(isBullpenV2==true){

			pitcherCondition = "(" + topOfInning1.substring(cr + 89,cr + 91) + ")";//For Bullpen v2

		}
		else
		{	

			pitcherCondition="";	

		}
		

		if(pitcherCondition.search(/\F/)==-1){

			pitcherCondition = "";

		}	


//.......................
	if ((trim(myOut) == "") || (isNaN(myOut) == true)){
	
		if(isBullpenV2==true){

			nextResult = topOfInning1.substring(91 + xChances_lg ,146 + xChances_lg);//For Bullpen v2

		}
		else
		{

			nextResult = topOfInning1.substring(80 + xChances_lg ,135 + xChances_lg);

		}
		
		
		

		nextResult = nextResult.replace(/\n/," ");


	}



if ((trim(myOut) == "") || (isNaN(myOut) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

			var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
			var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);			 
			if (trim(res4)!=""){


			if (res4.search(/\SUBSTITUTE/) != -1){

				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);  	
				}
				res4 = trim(res4);  
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			}

			if (flag == true){
				
				flagCount = flagCount + 1;

			}

			if (flagCount == 0){
				flag=true;
				flagCount = flagCount + 1;
			}
	
		
     		 	  if ((flag==true) && (flagCount > 1)){
				
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){


				}	
				else
				{
	 				if (trim(myOut)==""){
					var myOut = topOfInning1.substring(res3.index + 1,res3.index + 2); 
					}
			
				
					flag=false;
		

				}

			}
				
			}			//if (trim(res4)!=""){
			}
			flagCount=0;

	}
	else if ((result1.search(/\SUBSTITUTE/) != -1) || (result1.search(/\Injured/) != -1))
		myOut = topOfInning1.substring(topOfInning1.indexOf(result1)+result1.length+1,topOfInning1.indexOf(result1)+result1.length+2);
	
	{
	

	
	}
}
//.......................

					if (menOnBase == "1"){
						bases = first;
									
						basesFiller = "FirsT";
					}
					else if(menOnBase == "2")
					{		
						bases = second;
						basesFiller = "SeconD";
					}
					else if(menOnBase == "3")
					{		
						bases = third;
						basesFiller = "ThirD";
					}
					else if(menOnBase == "12")
					{		
						bases = first_second;
						basesFiller = "First_seconD";
					}
					else if(menOnBase == "1 3")
					{		
						bases = first_third;
						basesFiller = "First_thirD";
					}
					else if(menOnBase == "23")
					{		
						bases = second_third;
						basesFiller = "Second_thirD";
					}
					else if(menOnBase == "123")
					{		
						bases = first_second_third;
						basesFiller = "First_second_thirD";
					}
					else if(menOnBase != "1")
					{
						bases = empty;
						
						basesFiller = "EmptY";
					}

var pixelsVisitor = width * (rollsVisitorPitcherPCT/100); 
var myBarVisitor = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsVisitor + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + visitor + '&nbsp;' + rollsVisitorPitcherPCT + '%</div></div>';


var pixelsHome = width * (rollsHomePitcherPCT/100); 
		
var myBarHome = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsHome + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + home + '&nbsp;' + rollsHomePitcherPCT + '%</div></div>';

if (i == 1){

top1 = visitorScore;
//This starts in the top of the first on the first play.

result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + patternString4 + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300" ><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat1 +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + homePitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + result1 + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr></tbody></table><br>' + 
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=1 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' + 
"\n";



}
else
{


//This starts in the top of the second on first play.
result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + patternString4 + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat1 + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + homePitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + result1 + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'</tbody></table><br>' + 
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=2 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' +
"\n";

}

////visitor results???????????????????






	while((result2 = pattern2.exec(topOfInning1)) != null){

	
		var cr = result2.index;
	
		var batter = topOfInning1.substring(result2.index,topOfInning1.indexOf(/\n/,result2.index));


		var atBat2 = topOfInning1.substring(result2.index + 6,result2.index + 20);

		if (trim(atBat2) == ""){

			atBat2 = "&nbsp;";

		}

		var result2Check = topOfInning1.substring(result2.index + 31,result2.index + 62);
	
		

		
		if ((result2Check.search(/\SUBSTITUTE/) != -1)||result2Check.search(/\Injured/) != -1){
	
			var result2 = topOfInning1.substring(result2.index + 31,result2.index + 92);
			var result2 = result2.substring(1,result2.indexOf('\n'));
		
	
		}
		else
		{
			var result2 = result2Check;

			
		
			
		}


		if (result2.search(/\Injured/) != -1){

		
			var result2 =  topOfInning1.substring(topOfInning1.indexOf(result2),topOfInning1.indexOf("game")+5);
			result2 = trim(result2);
		}


		result2 = result2.replace(/&amp;/,"&");

					if (result2.match("Single") != null){
	
						visitorHits = visitorHits + 1;

					}

					if (result2.match(/Double \(/) != null){

						visitorHits = visitorHits + 1;

					}	

					if (result2.match(/Triple \(/) != null){

						visitorHits = visitorHits + 1;

					}

					if (result2.match("Home Run") != null){

						visitorHits = visitorHits + 1;

					}

					if (result2.match("Error") != null){

						homeErrors = homeErrors + 1;

					}
					

		if (result2.match("SUBSTITUTE P ")){
			homePitcher[0] = result2.substring(result2.indexOf("-") + 1);
			homePitcher[0] = trim(homePitcher[0])
		}

		advance = topOfInning1.substring(cr + 62,cr + 79);
		
		advance = trim(advance);

		var advance2 = advance.split(" ");
		var advance2_lg = advance2.length;
		
		//results for visiting team
		for(var a=0;a<advance2_lg;a++) {
				
	
			if  (advance2[a].match("-H") != null){

				visitorScore = visitorScore + 1;

			if (i == "1"){

				top1 = parseFloat(top1) + 1;		

			}
			if (i == "2"){

				top2 = parseFloat(top2) + 1;		

			}
			if (i == "3"){

				top3 = parseFloat(top3) + 1;		

			}
			if (i == "4"){

				top4 = parseFloat(top4) + 1;		

			}
			if (i == "5"){

				top5 = parseFloat(top5) + 1;		

			}
			if (i == "6"){

				top6 = parseFloat(top6) + 1;		

			}
			if (i == "7"){

				top7 = parseFloat(top7) + 1;		

			}
			if (i == "8"){

				top8 = parseFloat(top8) + 1;		

			}
			if (i == "9"){

				top9 = parseFloat(top9) + 1;		

			}
			
			}
			

		}
nonBreakingSpace = "&nbsp;";	
		

		for(var a=0;a<advance2_lg;a++) {

			if (advance2[a] == "b-1"){

				firstBase=atBat2;
				firstBaseLn = firstBase.length;
				
				for(var b=1;b<firstBaseLn;b++){

					nonBreakingSpace = nonBreakingSpace + "&nbsp;";

				}
				

			}

			if (advance2[a] == "b-2"){

				secondBase=atBat2;
				secondBaseLn = secondBase.length;
				
				for(var b=1;b<secondBaseLn;b++){

					nonBreakingSpace = nonBreakingSpace + "&nbsp;";

				}

			}

			if (advance2[a] == "b-3"){

				thirdBase=atBat2;

			}

			if (advance2[a] == "1-2"){

				secondBase=firstBase;
				firstBase=nonBreakingSpace;
				
				

			}
			if (advance2[a] == "1-3"){

				thirdBase=firstBase;
				firstBase=nonBreakingSpace;

			}

			if (advance2[a] == "2-3"){

				thirdBase=secondBase;
				
				secondBase=nonBreakingSpace;

			}

			if (advance2[a] == "1-o"){

				firstBase="&nbsp;";

			}

			if (advance2[a] == "3-H"){

				thirdBase=nonBreakingSpace;

			}

			if (advance2[a] == "1-H"){

				thirdBase=nonBreakingSpace;

			}
			

		}

		

		rolls =  topOfInning1.substring(cr + 27,cr + 31);
		
	
		if (rolls == "h&am"){

			rolls = "h&r";

		}

		if (result2.search(/\SUBSTITUTE/) != -1){

			rolls = "&nbsp;";	
		}

		if(result2 != ""){

			lastResult = result2;

		}

		
		xChances = topOfInning1.substring(cr + 79,cr + 88);
		
		
		xChances = trim(xChances);
	

		//This is for instances when length of xChances is less than 8 (examples: bpHR 1, gb(P)x)
		//Does not apply in  Bullpen v2?
		/*
		if (xChances.indexOf("\n") != -1){

			if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

				xChances = xChances.substring(0,xChances.indexOf("\n"));
				
				xChances = trim(xChances);

			}
			else
			{

				xChances = xChances.replace(/\n/," ");

			}
						
		}
		*/



		if (xChances.length < 8){

			xChances = topOfInning1.substring(cr + 79,cr + 86);
			
			xChances = trim(xChances);

		}


		xChances = trim(xChances);


			
		if ((xChances.match("x") != null) || (xChances.match("bp") != null)){

		

			xChances_lg = xChances.length;
			
			
		}
		else
		{
			xChances_lg = 0;
			xChances = "&nbsp;";		
		}


	var rollsLeft = rolls.substring(0,1);	

		//Keep track of BPHR count
		if (xChances.match("bpHR") != null){

			if (parseFloat(rollsLeft) > 3){

				if (result2.match("Home Run") != null){

					BPHRHome = BPHRHome + trim(homePitcher[0]) + ", ";
				}
				else
				{

					BPOutHome = BPOutHome + trim(homePitcher[0]) + ", ";

				}				


			}
			else if (parseFloat(rollsLeft) < 4)
			{

				if(result2.match("Home Run") != null){

					BPHRVisitor = BPHRVisitor + trim(atBat2) + ", ";
				}
				else
				{

					BPOutVisitor = BPOutVisitor + trim(atBat2) + ", ";
					

				}				




			}

			
		}	


	if (parseFloat(rollsLeft) > 3){
		result2Pitcher = result2;
		result2Batter = "&nbsp;";
		rollsPitcher = rolls;
		rollsBatter =  "&nbsp;";
		xchancesPitcher = xChances;
		xchancesBatter =  "&nbsp;";
		rollsHome = rollsHome + 1;
		rollsHomePitcher = rollsHomePitcher + 1;
		rollsHomePitcherPCT = rollsHomePitcher/rollsHome;
		rollsHomePitcherPCT = Math.round(rollsHomePitcherPCT*100);
	}
	else if (parseFloat(rollsLeft) < 4)
	{
	
		result2Batter = result2;
		result2Pitcher = "&nbsp;";
		rollsBatter = rolls;
		rollsPitcher = "&nbsp;";
		xchancesBatter = xChances;
		xchancesPitcher = "&nbsp;";
		rollsHome = rollsHome + 1;
		rollsHomePitcherPCT = rollsHomePitcher/rollsHome;
		rollsHomePitcherPCT = Math.round(rollsHomePitcherPCT*100);

	}
	else if ((rollsLeft == " ")||(isNaN(rollsLeft) == true))
	{
		rollsBatter =  "&nbsp;";
		rollsPitcher = "&nbsp;";
	

	}
	
	if ((rollsLeft == "h")||((rollsLeft) == "s")||((rollsLeft) == "b"))
	{
		rollsBatter = rolls;

	}


if(isBullpenV2==true){

		if (xChances_lg > 0){
			
			myOut = topOfInning1.substring(cr + 92 ,cr + 93 );//For Bullpen v2
		}
		else
		{
			
			myOut = topOfInning1.substring(cr + 92 + xChances_lg ,cr + 93 + xChances_lg); //For Bullpen v2
		

		}

		pitcherCondition = "(" + topOfInning1.substring(cr + 89,cr + 91) + ")";//For Bullpen v2

		if(pitcherCondition.search(/\F/) == -1){

			pitcherCondition = "";

		}
}
else
{

		if (xChances_lg > 0){
			myOut = topOfInning1.substring(cr + 81 + xChances_lg,cr + 82 + xChances_lg);
			
		}
		else
		{
			myOut = topOfInning1.substring(cr + 80 + xChances_lg ,cr + 81 + xChances_lg);
		
		

		}

		pitcherCondition = "";

		if(pitcherCondition.search(/\F/) == -1){

			pitcherCondition = "";

		}	


}
		

//.......................
	if ((trim(myOut) == "") || (isNaN(myOut) == true)){
	
		if(isBullpenV2==true){

			nextResult = topOfInning1.substring(cr + 91 + xChances_lg ,cr + 146 + xChances_lg);//For Bullpen v2

		}
		else
		{

			nextResult = topOfInning1.substring(cr + 80 + xChances_lg ,cr + 135 + xChances_lg);

		}
		
		
		
		nextResult = nextResult.replace(/\n/," ");


	}



if ((trim(myOut) == "") || (isNaN(myOut) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

			var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
			var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);

			if (trim(res4)!=""){

			if (res4.search(/\SUBSTITUTE/) != -1){

				if (res4.indexOf('\n') != -1){
					
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);

				}
				res4 = trim(res4);
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
				
			}

		
			if (flag == true){
				
				flagCount = flagCount + 1;

			}

			 
			if((result2.substring(0,res4.length) == res4)&&(flagCount == 0)){

				if (trim(atBat2)!="&nbsp;"){

					if (trim(atBat2)==trim(res4AtBat)){

						flag=true;
						flagCount = flagCount + 1;

					}

				}
				else
				{
						flag=true;
						flagCount = flagCount + 1;
				}

			}

			if ((flag==true) && (flagCount > 1)){
			
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){
 		
			
				}	
				else
				{
	 				if (trim(myOut)==""){
					var myOut = topOfInning1.substring(res3.index + 1,res3.index + 2); 

					}
					
			
				
					flag=false;
					flagCount = 0;		

				}

			}
				
			}			//if (trim(res4)!=""){
			}
			flagCount=0;

	}
	else if ((result2.search(/\SUBSTITUTE/) != -1) || (result2.search(/\Injured/) != -1))
		myOut = topOfInning1.substring(topOfInning1.indexOf(result2)+result2.length+1,topOfInning1.indexOf(result2)+result2.length+2);
		

	{
	

	
	}
}


//.......................
	if ((trim(myOut) == "") || (isNaN(myOut) == true)){

		myOut = "3";

	}
	
	if (myOut=="3"){

		firstBase="&nbsp;";
		secondBase="&nbsp;";
		thirdBase="&nbsp;";

	}

		menOnBase = topOfInning1.substring(cr + 2,cr + 7);
	
		menOnBase = trim(menOnBase);


if(isBullpenV2==true){

		if (xChances_lg > 0){

			
			menOnBase2 = topOfInning1.substring(cr + 93 ,cr + 98 );//For Bullpen v2
			
			menOnBase2 = trim(menOnBase2);
			menOnBase = String(menOnBase2);
			menOnBase = trim(menOnBase);
		}
		else
		{
						
			
			var menOnBase2Test = topOfInning1.substring(cr + 93 ,cr + 98);
			

				if (menOnBase2Test.substring(menOnBase2Test.length-1,menOnBase2Test.length)=="-"){

					menOnBase2 = "";

				}
				else
				{
					
					menOnBase2 = topOfInning1.substring(cr + 93 ,cr + 97);//For Bullpen v2
				}
			
			menOnBase2 = trim(menOnBase2);
			menOnBase = String(menOnBase2);

			menOnBase = trim(menOnBase);

		}

}
else
{

		if (xChances_lg > 0){

			menOnBase2 = topOfInning1.substring(cr + 82 + xChances_lg,cr + 87 + xChances_lg);
			
			
			menOnBase2 = trim(menOnBase2);
			menOnBase = String(menOnBase2);
			menOnBase = trim(menOnBase);
		}
		else
		{
						
			var menOnBase2Test = topOfInning1.substring(cr + 81 ,cr + 86);
			
			

				if (menOnBase2Test.substring(menOnBase2Test.length-1,menOnBase2Test.length)=="-"){

					menOnBase2 = "";

				}
				else
				{
					menOnBase2 = topOfInning1.substring(cr + 81 ,cr + 85);
					
				}
			
			menOnBase2 = trim(menOnBase2);
			menOnBase = String(menOnBase2);

			menOnBase = trim(menOnBase);

		}	


}



					if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){
						if(isBullpenV2==true){

							nextResult = topOfInning1.substring(cr + 91 + xChances_lg ,cr + 146 + xChances_lg);//For Bullpen v2

						}
						else
						{

							nextResult = topOfInning1.substring(cr + 82 + xChances_lg ,cr + 135 + xChances_lg);

						}
						
						
						
						nextResult = nextResult.replace(/\n/," ");	

					}

if ((trim(menOnBase) == "") || (isNaN(menOnBase) == true)){

	if ((nextResult.search(/\SUBSTITUTE/) != -1) || (nextResult.search(/\Injured/) != -1)){

		var patt1 = new RegExp("SUBSTITUTE","g");
		var patt2 = new RegExp("Injured","g");
		var patt3 = /\n/g;

		var res1;	
		var res2;
		var res3;

			while((res3 = patt3.exec(topOfInning1)) != null){

				var res4 =  topOfInning1.substring(res3.index + 31,res3.index + 62);
				var res4AtBat =  topOfInning1.substring(res3.index + 6,res3.index + 26);
			

if (trim(res4)!=""){
			if (res4.search(/\SUBSTITUTE/) != -1){
				if (res4.indexOf('\n') != -1){
					var res4 = res4.substring(1,res4.indexOf('\n'));
					res4 = trim(res4);  
						
				}
				res4 = trim(res4);  
			}

			if (res4.search(/\Injured/) != -1){

				var res4 =  topOfInning1.substring(topOfInning1.indexOf(res4),topOfInning1.indexOf("game")+5);
				res4 = trim(res4);
			}

			if (flag == true){
				
				flagCount = flagCount + 1;

			}

	


			if((result2.substring(0,res4.length) == res4)&&(flagCount == 0)){

				if (trim(atBat2)!="&nbsp;"){

					if (trim(atBat2)==trim(res4AtBat)){

						flag=true;
						flagCount = flagCount + 1;

					}

				}
				else
				{
						flag=true;
						flagCount = flagCount + 1;
				}

			}


	
			  if ((flag==true) && (flagCount > 1)){
			
				if ((res4.search(/\SUBSTITUTE/) != -1) || (res4.search(/\Injured/) != -1)){

			

				}	
				else
				{
	 				if (trim(menOnBase)==""){
					
					var menOnBase = topOfInning1.substring(res3.index + 2,res3.index + 7); 
					menOnBase = trim(menOnBase);
					
					}
				
					flag=false;
					flagCount = 0;

				}

			}
			

}//if (trim(res4)!=""){
			}

		//	}
flagCount=0;
	}
	else if ((result2.search(/\SUBSTITUTE/) != -1) || (result2.search(/\Injured/) != -1))
	{
	 
	menOnBase = topOfInning1.substring(topOfInning1.indexOf(result2)+result2.length+2,topOfInning1.indexOf(result2)+result2.length+7);
	menOnBase = trim(menOnBase);
	
	}
}






					if (menOnBase == "1"){
						bases = first;
								
						basesFiller = "FirsT";
					}
					else if(menOnBase == "2")
					{		
						bases = second;
						basesFiller = "SeconD";
					}
					else if(menOnBase == "3")
					{		
						bases = third;
						basesFiller = "ThirD";
					}
					else if(menOnBase == "12")
					{		
						bases = first_second;
						basesFiller = "First_seconD";
					}
					else if(menOnBase == "23")
					{		
						bases = second_third;
						basesFiller = "Second_thirD";
					}
					else if(menOnBase == "1 3")
					{		
						bases = first_third;
						basesFiller = "First_thirD";
					}
					else if(menOnBase == "123")
					{		
						bases = first_second_third;
						basesFiller = "First_second_thirD";
					}
					else if(menOnBase != "1")
					{
						bases = empty;
						
						basesFiller = "EmptY";
					}




var pixelsVisitor = width * (rollsVisitorPitcherPCT/100); 
pixelsVisitor = Math.round(pixelsVisitor);

var myBarVisitor = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsVisitor + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + visitor + '&nbsp;' + rollsVisitorPitcherPCT + '%</div></div>';


var pixelsHome = width * (rollsHomePitcherPCT/100); 
pixelsHome = Math.round(pixelsHome);
		
var myBarHome = '<div style=\"position: relative; line-height: 1em; border: 1px solid black; width: ' + width + 'px\">' +
   '<div style=\"height: 1.5em; width: ' + pixelsHome + 'px; background-color: ' + color + ';\"></div>' + '<div style=\"position: absolute; text-align: center; padding-top: .25em; width: ' + width + 'px; top: 0; left: 0\">' + home + '&nbsp;' + rollsHomePitcherPCT + '%</div></div>';

//begins after first play in top of first inning.

		if(result2 != ""){
				
result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + patternString4 + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat2 + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + homePitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + result2 + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'</tbody></table><br>' +  
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=2 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' +
"\n";
//VISiTOR RESULTS?????????????????????

	


		}//if
	}//while

}//while

	   	}//?
	}//?




}//for ( var i = 0; i < 10; i++) 
//end of game
var lastInning = boxscore.lastIndexOf("***");
var lastInningString = boxscore.substring(lastInning-21,lastInning)


	if (lastInningString.match("BOT") != null){

//remove extra comma at end
BPHRVisitor = BPHRVisitor.substring(0,BPHRVisitor.length - 2);
BPOutVisitor = BPOutVisitor.substring(0,BPOutVisitor.length - 2);
BPHRHome = BPHRHome.substring(0,BPHRHome.length - 2);
BPOutHome = BPOutHome.substring(0,BPOutHome.length - 2);

result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + "BOT" + " OF " + (howManyInnings - 2)  + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + visitorPitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat2 + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + lastResult + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><small>' + visitor + '</small></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPHR- '+ BPHRVisitor +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPOuts- '+ BPOutVisitor +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><small>' + home + '</small></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPHR- '+ BPHRHome +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPOuts- '+ BPOutHome +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'</tbody></table><br>' + 
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=1 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' +"\n";		




	}
else{
//remove extra comma at end
BPHRVisitor = BPHRVisitor.substring(0,BPHRVisitor.length - 2);
BPOutVisitor = BPOutVisitor.substring(0,BPOutVisitor.length - 2);
BPHRHome = BPHRHome.substring(0,BPHRHome.length - 2);
BPOutHome = BPOutHome.substring(0,BPOutHome.length - 2);

result3 = result3 + '<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td class="' + myClass + '" colspan="17"></td></tr><tr class="' + myClass + '" align="left">' + 
	'<td align="left" nowrap="nowrap">' + "TOP" + " OF " + (howManyInnings - 1)  + '</td><td align="left"></td><td></td><td>1</td><td>2</td><td>3</td><td></td><td>4</td><td>5</td><td>6</td><td></td><td>7</td><td>8</td><td>9</td>' +
	'<td></td><td>R</td><td>H</td><td>E</td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + visitor + '</td><td align="left"></td><td></td><td>' + top1 + '</td><td>' + top2 + '</td><td>' + top3 + '</td><td>' +
'</td><td>' + top4 + '</td><td>' + top5 + '</td><td>' + top6 + '</td><td>' + '</td><td>' + top7 + '</td><td>' + top8 + '</td><td>' + top9 + '</td><td></td><td>' + 
visitorScore + '</td><td>' + visitorHits + '</td><td>' + visitorErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="left"><td align="left" nowrap="nowrap">' + home    + '</td><td align="left"></td><td></td><td>' + bot1 + '</td><td>' + bot2 + '</td><td>' + bot3 + '</td><td>' +
'</td><td>' + bot4 + '</td><td>' + bot5 + '</td><td>' + bot6 + '</td><td>' + '</td><td>' + bot7 + '</td><td>' + bot8 + '</td><td>' + bot9 + '</td><td></td><td>' +
homeScore + '</td><td>' + homeHits + '</td><td>' + homeErrors + '</td><td></tr>' + 
'<tr class="' + myClass + '" align="right"><td align="left" nowrap="nowrap">' + basesFiller + '</td><td align="right"></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>' + 
'<table align="center" border="0" cellpadding="1" cellspacing="0" width="300"><tbody><tr><td align="left" class="' + myClass + '">Outs: ' + myOut + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + homePitcher[0]  +' ' + pitcherCondition + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsPitcher + '&nbsp;' + xchancesPitcher + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade">' + atBat2 + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<td align="left" class="' + myClass + '">' + rollsBatter + '&nbsp;' + xchancesBatter + '</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' + 
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><font color="yellow">' + lastResult + '</font></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>' +
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><small>' + visitor + '</small></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPHR- '+ BPHRVisitor +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPOuts- '+ BPOutVisitor +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '"><hr size="1" width="300" color="#e0e0e0" noshade="noshade"><small>' + home + '</small></td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPHR- '+ BPHRHome +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'<tr><td align="left" class="' + myClass + '">BPOuts- '+ BPOutHome +'</td><td align="left" class="' + myClass + '"></td><td class="' + myClass + '"></td><td class="' + myClass + '"></td></tr>'+
'</tbody></table><br>' + 
'<table class="datatab_nowidth tright" width="300" border="0" cellpadding=1 cellspacing=1 border=0 align="center">' +
'<tr class="odd"><td class="tleft" colspan="2"><b>Pitcher Card Rolls<b></td></tr>' +
'<TR class="odd"><td class="tleft">' + myBarVisitor + '</td></TR>'+
'<TR class="odd"><td class="tleft">' +myBarHome+'</td></TR></table>'+
'<tr><td class="text10"><a href="' + thisURL + '">View Boxscore</a> | <a style="cursor: pointer">'+newString+'</a></td></tr>' +"\n";



}




//enf of game
result3 = result3.replace(/EmptY/g,empty);
result3 = result3.replace(/FirsT/g,first); 
result3 = result3.replace(/SeconD/g,second); 
result3 = result3.replace(/ThirD/g,third); 
result3 = result3.replace(/First_seconD/g,first_second); 
result3 = result3.replace(/Second_thirD/g,second_third); 
result3 = result3.replace(/First_thirD/g,first_third);
result3 = result3.replace(/First_second_thirD/g,first_second_third);




msg = result3;


var container=document.createElement('div');

var msgs=msg.split("\n");
var msgs_lg=msgs.length;

for(var h=0;h<msgs_lg;h++) {
      var spanelem=document.createElement('span');
      spanelem.style.display='none';
      spanelem.textContent=msgs[h];
      var brelem=document.createElement('br');
      spanelem.appendChild(brelem);
      container.appendChild(spanelem);


    }

container.innerHTML = '<div id="txt"></div>';
thisElement.parentNode.replaceChild(container,thisElement);


	onload:startTime();


var msgs=msg.split("\n");
var msgs_lg=msgs.length;
var h=0;






}//if (myGameChannel == true){
}


function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function startTime()
{


if (h < msgs_lg - 2)
{
h++;
}


if (msgs[h] != undefined){




document.getElementById('txt').innerHTML="<td class='" + myClass + "'>" + msgs[h] + "</td>";

}

	t=setTimeout(startTime,speed);

}

function stopCount()
{
clearTimeout(t);
}

function changeLink()
{

if(myPause == false){
	newString = "Pause";

}
else
{
	newString = "Play";
}
//document.getElementById('myAnchor').innerHTML="Visit W3Schools";
}

 






