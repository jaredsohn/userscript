// ==UserScript==
// @name           Stratomatic Magic Number
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/league/standings.html*
// ==/UserScript==


var myColSpan, mydash,myYellowDash , mywins, mylosses,eValue, myValueInsert,myValueInsertYellow, myfiller, myDefinitionInsert, myTest, myFirstPlaceLosses, colElement;


//Get number of wins of each first place team.
var wins = document.evaluate("//tr/td[6][text()='-']/preceding-sibling::td[3]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
for (var i = 0; i < wins.snapshotLength; i++) {
mywins = wins.snapshotItem(i);
	
}

//Get number of losses of each first place team.
var firstPlaceLosses = document.evaluate("//tr/td[6][text()='-']/preceding-sibling::td[2]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
for (var i = 0; i < wins.snapshotLength; i++) {
myFirstPlaceLosses = firstPlaceLosses.snapshotItem(2);
var gameTotal = parseInt(mywins.nodeValue) + parseInt(myFirstPlaceLosses.nodeValue);
}

//Uncomment line below if you want the script only active after game 126 has played.  Last line in script would also need to be uncommented.
//if (gameTotal > 126){



//Add a column to table.
var colSpans = document.getElementsByTagName('TD');
for (var i = 0; i < colSpans.length; i++) {
  var colSpan = colSpans[i];
	if (colSpan.getAttribute('COLSPAN')) {
      	var match16 =     colSpan.getAttribute('COLSPAN').match('16');
      		if (match16)
         		colSpan.setAttribute('COLSPAN', '17');

      	var match12 =     colSpan.getAttribute('COLSPAN').match('12');
      		if (match12)
         		colSpan.setAttribute('COLSPAN', '13');	
    	

      	var match14 =     colSpan.getAttribute('COLSPAN').match('14');
      		if (match14)
         		colSpan.setAttribute('COLSPAN', '15');	
    	}	
}

//Get number of losses of each trailing team.
//var losses = document.evaluate("//tr/td[contains(text(),'.0')]/preceding-sibling::td[2]/text()",
//document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var losses = document.evaluate("//tr[not(@class='databox_header black')]/td[6][not(contains(text(),'-'))][not(contains(text(),'L'))][not(contains(text(),'|'))]/preceding-sibling::td[2]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var gamesBehind = document.evaluate("//tr[not(@class='databox_header black')]/td[6][not(contains(text(),'L'))][not(contains(text(),'|'))]/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//Insert non-yellow magic number.
var valueInsert = document.evaluate("//tr[not(@class='databox_header black')][not(@class='horizontalMenuHead')]/td[6][not(contains(text(),'-'))][not(contains(text(),'NHL'))]/following-sibling::td[1]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

eValue=0;
k=0;
w=0;
for (var j = 0; j < gamesBehind.snapshotLength; j++) {

if (j ==0){
	w=0;
}
else if(j==4){
	w=1;
}
else if(j==8){
	w=2;
}

	myGamesBehind = gamesBehind.snapshotItem(j);
	if (myGamesBehind.nodeValue != "-"){
		

		myValueInsert = valueInsert.snapshotItem(k+2);
		mylosses = losses.snapshotItem(k);
		k++;
		colElement = document.createElement("td");


		eValue = 163 - (parseInt(wins.snapshotItem(w).nodeValue) + parseInt(mylosses.nodeValue));
	
		if (eValue <= 0 ){
			eValue = "E"
		}

		colElement.innerHTML = eValue;		
		myValueInsert.parentNode.insertBefore(colElement,myValueInsert);


	
	}


}	





//add elimination number title: E#
//11/16/2007:  Changed XPath expression from //tr/td[text()='L10' to following below 
//because a value of L10 appears in the Strk column when a team loses 10 in a row!
var eNumber = document.evaluate("//tr/td[text()='Strk']/preceding-sibling::td[1]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < eNumber.snapshotLength; i++) {
	
myeNumber = eNumber.snapshotItem(i);
colElement = document.createElement("td");
colElement.innerHTML = '<td>E#</td>';
myeNumber.parentNode.insertBefore(colElement,myeNumber);
}

//Add dash for all first place teams.
var dash = document.evaluate("//tr/td[text()='-'][not(@class)]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < dash.snapshotLength; i++) {
mydash = dash.snapshotItem(i);
colElement = document.createElement("td");
colElement.innerHTML = '-';
mydash.parentNode.insertBefore(colElement,mydash);
}

//Add yellow dash for first place team.
var yellowDash = document.evaluate("//tr[@class='odd yellow bold']/td[text()='-']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < yellowDash.snapshotLength; i++) {
myYellowDash = yellowDash.snapshotItem(i);
colElement = document.createElement("td");
colElement.setAttribute('class', 'even yellow bold');
colElement.innerHTML = '-';
//myYellowDash.parentNode.insertBefore(colElement,myYellowDash);
}

//Highlight entire row in yellow.
var valueInsertYellow = document.evaluate("//tr[@class='even yellow bold']/td[6][not(contains(text(),'-'))][1]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var k = 0; k < valueInsertYellow.snapshotLength; k++) {
myValueInsertYellow = valueInsertYellow.snapshotItem(k);	
myValueInsertYellow.parentNode.setAttribute('class', 'even yellow bold');
}

//Remove two line breaks
var test = document.evaluate("//td/br",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 6; i < 8; i++) {
myTest = test.snapshotItem(i);
myTest.parentNode.removeChild(myTest);
}

var definitionInsert = document.evaluate("//br[@style]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


for (var i = 0; i < definitionInsert.snapshotLength; i++) {
myDefinitionInsert = definitionInsert.snapshotItem(i);
colElement = document.createElement("div");
colElement.setAttribute('align', 'justify');
colElement.setAttribute('style', 'width:750px;');
colElement.setAttribute('style', 'margin:15px;');
colElement.innerHTML = 'E# - Elimination Number, the combined number of wins (by the first place team) and losses (by the trailing team) that will eliminate the trailing team from winning the division. The Elimination Number for any team is determined by adding their number of losses to the number of wins for the team leading the division, and subtracting that total from 163. The Elimination Number for the second place team is the "Magic Number" for the first place team. "E" indicates that the team has been eliminated from winning the division.';
myDefinitionInsert.parentNode.insertBefore(colElement,myDefinitionInsert);
}

//Uncomment line below if you want the script only active after game 126 has played.
//} //if (gameTotal > 126)...
