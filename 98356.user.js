// ==UserScript==
// @name           Player Ballpark Factors
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/about/research.html*
// @include	   http://fantasygames.sportingnews.com/stratomatic/trade/release_pickup_option.html*
// @include	   http://fantasygames.sportingnews.com/stratomatic/about/popup_research_h_categories.html
// ==/UserScript==

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

var theLink;
var theLinkText;
var leftArray = new Array();
var rightArray = new Array();

var thisURL = document.URL;

var theLinks = document.evaluate("//a[contains(@href,'player.html')]",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var j = 0;

for (var i = 0; i < theLinks.snapshotLength; i++) {

	theLink = theLinks.snapshotItem(i);
	
	theLink = theLink.href;
	theLink = theLink.substring(theLink.indexOf('/'),theLink.indexOf(',%')-1);
	theLink = 'http://fantasygames.sportingnews.com' + theLink;
	
	if(theLink.indexOf('pool_id=90') == -1 && theLink.indexOf('year=1690') == -1){

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
}

var data;
var playerName;

function callback_function(parameter1, parameter2, responseDetails)
{



	var leftBP = 0;
	var rightBP = 0;

	data = responseDetails.responseText;

	playerName = data.substring(data.indexOf('<span style="font: bold 16px Arial">')+36,data.indexOf('</span> &nbsp;'));

	//left side

	var left = data.substring(data.indexOf('class="text9" bgcolor="#DDEEFF"'),data.indexOf('class="text9" bgcolor="#FFEEEE"'));
	

	var pattern = /#2/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 1;
	}

	var pattern = /#3/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 2;
	}	

	var pattern = /#4/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 3;
	}

	var pattern = /#5/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 4;
	}

	var pattern = /#6/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 5;
	}

	var pattern = /#7/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 6;
	}	

	var pattern = /#8/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 5;
	}	

	var pattern = /#9/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 4;
	}

	var pattern = /#10/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 3;
	}

	var pattern = /#11/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 2;
	}

	var pattern = /#12/g;
	var result

	while((result = pattern.exec(left)) != null){
	
		leftBP = leftBP + 1;
	}	

	
	leftArray[parameter1] = leftBP;

	//Right side

var right = data.substring(data.indexOf('class="text9" bgcolor="#FFEEEE"'),data.indexOf('<a href="#" onClick="window.close();" class="text10">close window</a>'));

var pattern = /#2/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 1;
	}

	var pattern = /#3/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 2;
	}	

	var pattern = /#4/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 3;
	}

	var pattern = /#5/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 4;
	}

	var pattern = /#6/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 5;
	}

	var pattern = /#7/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 6;
	}	

	var pattern = /#8/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 5;
	}	

	var pattern = /#9/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 4;
	}

	var pattern = /#10/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 3;
	}

	var pattern = /#11/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 2;
	}

	var pattern = /#12/g;
	var result

	while((result = pattern.exec(right)) != null){
	
		rightBP = rightBP + 1;
	}	

	
	rightArray[parameter1] = rightBP;

setTimeout( delay, 500); 

function delay(){	
	
var mylastColumn;
var lastColumn;
var priceColumn;
var colElement;
var colElement2;
var colElement3;
//td[contains(text(),'M')]
var lastColumns = document.evaluate("//tr[@class='odd' or @class='even']/td[contains(text(),'M')]|//td[contains(a/@href,'release_year')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//left column

for (var j = 0; j < lastColumns.snapshotLength; j++) {

	lastColumn = lastColumns.snapshotItem(j);

	colElement = document.createElement("td");
	colElement.innerHTML = leftArray[j];

	if (parameter1 + 1 == lastColumns.snapshotLength){

		if(colElement.innerHTML == 'undefined'){
			colElement.innerHTML = '?';
		}

		lastColumn.parentNode.insertBefore(colElement,lastColumn);
	}
}

//right column

for (var j = 0; j < lastColumns.snapshotLength; j++) {

	lastColumn = lastColumns.snapshotItem(j);

	colElement = document.createElement("td");
	colElement.innerHTML = rightArray[j];




	if (parameter1 + 1 == lastColumns.snapshotLength){

		if(colElement.innerHTML == 'undefined'){
			colElement.innerHTML = '?';
		}

		lastColumn.parentNode.insertBefore(colElement,lastColumn);
					
	}
}



var priceColumns = document.evaluate("//td[contains(a,'Price')]|//td[contains(a,'Buy For:')]|//td[contains(a,'Waivers:')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

priceColumn = priceColumns.snapshotItem(0);

colElement2 = document.createElement("td");
colElement2.innerHTML = 'L#';

colElement3 = document.createElement("td");
colElement3.innerHTML = 'R#';

for (var j = 0; j < lastColumns.snapshotLength; j++) {

	if (parameter1 + 1 == lastColumns.snapshotLength){
		priceColumn.parentNode.insertBefore(colElement2,priceColumn);
		priceColumn.parentNode.insertBefore(colElement3,priceColumn);
	}
}

}//function delay



}


if(thisURL == 'http://fantasygames.sportingnews.com/stratomatic/about/popup_research_h_categories.html'){

	var category;
	var bElement;

	var categories = document.evaluate("//b[contains(text(),'Buy For')]",
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	category = categories.snapshotItem(0);

	bElement = document.createElement("text");
	bElement.innerHTML = '<b>L#, R#</b> - Player\'s left/Right ballpark diamonds (Generated by Greasemonkey script)<br>';

	category.parentNode.insertBefore(bElement,category.previousSibling);

}



