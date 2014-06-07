// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Stop The Presses!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          CentSports1
// @description   This will change attribute about Team Betting and Team Winning
// @include       http://www.centsports.com/profile*
// ==/UserScript==

function aFunction() {

var allLi, ThisLi, a;
allLi = document.evaluate(
    "//li[@class='ml sel'] | //li[@class='spr sel']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);  
for (var i = 0; i < allLi.snapshotLength ; i++) {
    ThisLi = allLi.snapshotItem(i);
	a = ThisLi.parentNode;
	
	if(dates(i))
	a.childNodes[1].style.color='red';
	//else a.childNodes[1].style.color='blue';
	
	a.childNodes[1].style.setProperty('font-weight','bold',null);
	}
}

//find winning team and make it bold
function findWinning(){

var allBet, ThisBet;
allBet = document.evaluate(
    "//div[@class='bet_lines']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);  
    
    for(var i = 0; i < allBet.snapshotLength; i++) {
    	ThisBet = allBet.snapshotItem(i);
   
		var ltemp = ThisBet.childNodes[1];
		var tempBet = ltemp.childNodes[3].innerHTML;
		
		var lcurr = ThisBet.childNodes[3];
		var currBet = lcurr.childNodes[3].innerHTML;
		
		if (parseInt(tempBet) < parseInt(currBet)) lcurr.childNodes[3].style.setProperty('font-weight','bold',null);
		else ltemp.childNodes[3].style.setProperty('font-weight','bold',null);
		
		
//childNode[3] is the magic number	
  }
}

function listofWinners() {
	var allLi, ThisLi, a, newElement, graph, graphTemp;
	var winningTeams = new Array();
	
allLi = document.evaluate(
    "//li[@class='ml sel'] | //li[@class='spr sel']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);  
    
for (var i = 0; i < allLi.snapshotLength ; i++) {
    ThisLi = allLi.snapshotItem(i);
	a = ThisLi.parentNode;
	winningTeams[i] = a.childNodes[1].innerHTML;
}
	graphTemp = document.evaluate(
    "//div[@class='graph']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null); 
    
	graph = graphTemp.snapshotItem(0);
	newElement = document.createElement('p');
	//for(var j = 0; j < winningTeams.lenght; j++) {
	newElement.innerHTML = winningTeams;
	//}
	graph.parentNode.insertBefore(newElement, graph.nextSibling);

}

function dates(bet) {
var allDate, thisDate;
var date, today;
allDate = document.evaluate(
    "//span[@class='date']",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
//     < allUl.snapshotLength
today = new Date();
today = today.toDateString();
today = today.split(" ");
today = today[1] + " " + today[2];

    thisDate = allDate.snapshotItem(bet);
	date = thisDate.innerHTML.substr(0, thisDate.innerHTML.indexOf("@")-1);
	if(today == date) return true;
	else return false;
}

aFunction();
findWinning();
//listofWinners();
