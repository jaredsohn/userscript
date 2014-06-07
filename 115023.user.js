// ==UserScript==
// @name           View Opponent Record
// @namespace      maddenonline.blogspot.com
// @include        http://www.easports.com/player-hub/*
// ==/UserScript==


//http://www.easports.com/player-hub/360/ESTABAN+85 Chad Ochocinco

Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

GM_setValue('onlineScores', '');

var game;
var thisURL = document.URL;
game = thisURL.substring(thisURL.indexOf('player-hub/')+11,thisURL.indexOf('player-hub/')+14);


var data;
var dataArray;

var myResult;
var handleArray = new Array();


//var myButtonLocation = document.evaluate("//h1[@class='uppercase colored-text']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); old
var myButtonLocation = document.evaluate("//h1[contains(string(),'Player Hub')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
myButtonLocation = myButtonLocation.snapshotItem(0);

var myDiv = document.createElement("div");
myDiv.innerHTML = '';

var myLabel = document.createElement("text");
myLabel.innerHTML = 'Gamertag Record Search:';

var myText = document.createElement("input");
myText.id='textId';


var myButton = document.createElement("input");
myButton.type = 'button';
myButton.value = 'Submit';
myButton.name = 'gamertag';
myButton.id='buttonId';





document.addEventListener('click', function(event) {

	

	if (event.target.getAttribute('name') == "gamertag"){	

	

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.easports.com/services/rankedleaderboard/getdata?platformTag=gridiron-madden-12-'+game+'&mode=online&period=overall&rowsNumber=10&handle='+myText.value+'&platform='+game+'&view=widget',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var data = new String(details.responseText);
	   data = data.toLowerCase();

	   myText.value = myText.value.toLowerCase();

	if(data.indexOf('"gamertag":"'+myText.value) == -1 || myText.value == ''){

		data = 'No results found';

	}
	else
     	{	

	data = data.substring(data.indexOf('"gamertag":"'+myText.value),data.indexOf(',"header"'));

	dataArray = data.split(',');

	dataArray[0] = dataArray[0].substring(dataArray[0].indexOf(':"')+2,dataArray[0].lastIndexOf('"')) + ": ";
	dataArray[1] = "<b>PTS: </b>" + dataArray[1].substring(dataArray[1].indexOf(':"')+2,dataArray[1].lastIndexOf('"'));
	dataArray[2] = " <b>LVL: </b>" + dataArray[2].substring(dataArray[2].indexOf(':"')+2,dataArray[2].lastIndexOf('"'));
	dataArray[3] = " <b>Wins: </b>" + dataArray[3].substring(dataArray[3].indexOf(':"')+2,dataArray[3].lastIndexOf('"'));
	dataArray[4] = " <b>Losses: </b>" + dataArray[4].substring(dataArray[4].indexOf(':"')+2,dataArray[4].lastIndexOf('"'));
	dataArray[5] = " <b>PF: </b>" + dataArray[5].substring(dataArray[5].indexOf(':"')+2,dataArray[5].lastIndexOf('"'));
	dataArray[6] = " <b>PA: </b>" + dataArray[6].substring(dataArray[6].indexOf(':"')+2,dataArray[6].lastIndexOf('"'));
	dataArray[7] = " <b>STK: </b>" + dataArray[7].substring(dataArray[7].indexOf(':"')+2,dataArray[7].lastIndexOf('"'));

	data = '<font color="Brown">' + dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3] + dataArray[4] + dataArray[5] + dataArray[6] + dataArray[7] + '</font>';
	}

	   myDiv.innerHTML = data;
           myText.value = '';

    }
});

		
		
	}


}, true);	



myButtonLocation.parentNode.insertBefore(myDiv,myButtonLocation.nextSibling);
myButtonLocation.parentNode.insertBefore(myButton,myButtonLocation.nextSibling);
myButtonLocation.parentNode.insertBefore(myText,myButtonLocation.nextSibling);
myButtonLocation.parentNode.insertBefore(myLabel,myButtonLocation.nextSibling);


document.getElementById("textId").addEventListener("keydown", function(e) {
  if(e.keyCode==13)
  {
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.easports.com/services/rankedleaderboard/getdata?platformTag=gridiron-madden-12-'+game+'&mode=online&period=overall&rowsNumber=10&handle='+myText.value+'&platform='+game+'&view=widget',
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var data = new String(details.responseText);
	   data = data.toLowerCase();

	   myText.value = myText.value.toLowerCase();

	if(data.indexOf('"gamertag":"'+myText.value) == -1 || myText.value == ''){

		data = 'No results found';

	}
	else
     	{	

	data = data.substring(data.indexOf('"gamertag":"'+myText.value),data.indexOf(',"header"'));

	dataArray = data.split(',');

	dataArray[0] = dataArray[0].substring(dataArray[0].indexOf(':"')+2,dataArray[0].lastIndexOf('"')) + ": ";
	dataArray[1] = "<b>PTS: </b>" + dataArray[1].substring(dataArray[1].indexOf(':"')+2,dataArray[1].lastIndexOf('"'));
	dataArray[2] = " <b>LVL: </b>" + dataArray[2].substring(dataArray[2].indexOf(':"')+2,dataArray[2].lastIndexOf('"'));
	dataArray[3] = " <b>Wins: </b>" + dataArray[3].substring(dataArray[3].indexOf(':"')+2,dataArray[3].lastIndexOf('"'));
	dataArray[4] = " <b>Losses: </b>" + dataArray[4].substring(dataArray[4].indexOf(':"')+2,dataArray[4].lastIndexOf('"'));
	dataArray[5] = " <b>PF: </b>" + dataArray[5].substring(dataArray[5].indexOf(':"')+2,dataArray[5].lastIndexOf('"'));
	dataArray[6] = " <b>PA: </b>" + dataArray[6].substring(dataArray[6].indexOf(':"')+2,dataArray[6].lastIndexOf('"'));
	dataArray[7] = " <b>STK: </b>" + dataArray[7].substring(dataArray[7].indexOf(':"')+2,dataArray[7].lastIndexOf('"'));

	data = '<font color="Brown">' + dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3] + dataArray[4] + dataArray[5] + dataArray[6] + dataArray[7] + '</font>';
	}

	   myDiv.innerHTML = data;
           myText.value = '';

    }
});
  }
}, false);

var myResults =  document.evaluate("//div[@class='info']",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var j = 0;

for (var i = 0; i < myResults.snapshotLength; i++) {

	myResult = myResults.snapshotItem(i);
	myResult = myResult.textContent;
	myResult = myResult.substring(myResult.indexOf('against')+8);
	myResult = myResult.substring(0,myResult.indexOf(' '));

	j = 1+i;

	handleArray[i] = myResult;

  GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.easports.com/services/rankedleaderboard/getdata?platformTag=gridiron-madden-12-'+game+'&mode=online&period=overall&rowsNumber=10&handle='+myResult+'&platform='+game+'&view=widget',
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function.bind( {}, i, j )
  }); 	


}


function callback_function(parameter1, parameter2, responseDetails)
{



	data = responseDetails.responseText;

	data = data.substring(data.indexOf('"gamertag":"'+handleArray[parameter1]),data.indexOf(',"header"'));
	dataArray = data.split(',');

	dataArray[0] = dataArray[0].substring(dataArray[0].indexOf(':"')+2,dataArray[0].lastIndexOf('"')) + ": ";
	dataArray[1] = "<b>PTS: </b>" + dataArray[1].substring(dataArray[1].indexOf(':"')+2,dataArray[1].lastIndexOf('"'));
	dataArray[2] = " <b>LVL: </b>" + dataArray[2].substring(dataArray[2].indexOf(':"')+2,dataArray[2].lastIndexOf('"'));
	dataArray[3] = " <b>Wins: </b>" + dataArray[3].substring(dataArray[3].indexOf(':"')+2,dataArray[3].lastIndexOf('"'));
	dataArray[4] = " <b>Losses: </b>" + dataArray[4].substring(dataArray[4].indexOf(':"')+2,dataArray[4].lastIndexOf('"'));
	dataArray[5] = " <b>PF: </b>" + dataArray[5].substring(dataArray[5].indexOf(':"')+2,dataArray[5].lastIndexOf('"'));
	dataArray[6] = " <b>PA: </b>" + dataArray[6].substring(dataArray[6].indexOf(':"')+2,dataArray[6].lastIndexOf('"'));
	dataArray[7] = " <b>STK: </b>" + dataArray[7].substring(dataArray[7].indexOf(':"')+2,dataArray[7].lastIndexOf('"'));

	data = '<font color="Brown">' + dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3] + dataArray[4] + dataArray[5] + dataArray[6] + dataArray[7] + '</font>';


		var myElement;	
		var myResultText;
		var date;
		var lastHandle;
		var count = 0;
		var myString;
		var myString2;


		var myResults =  document.evaluate("//div[@class='info']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var dates = document.evaluate("//div[@class='medium secondary']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	


		for (var k = 0; k < myResults.snapshotLength; k++) {

			myResult = myResults.snapshotItem(k);
			date = dates.snapshotItem(k);

			myResultText = myResult.textContent;


			if(myResultText.indexOf('against') == -1 || myResultText.indexOf('MADDEN 12:') == -1){

				myResultText = '';		
			}
			else
			{

				myResultText = myResultText.substring(myResultText.indexOf('against')+8);
				myResultText = myResultText.substring(0,myResultText.indexOf(' '));

			}

	



			if(myResultText == handleArray[parameter1] && myResultText !=''){

				myElement = document.createElement("div");
				myElement.innerHTML = data;

				
				myString = GM_getValue('onlineScores','');
				myString2 = myString.split(',');

			

					for (var l = 0; l < myString2.length; l++) {

						if(k==myString2[l] && myString2[l] != ''){

							count = 1;	
						}
					}

					if(count == 0){
	
						date.parentNode.insertBefore(myElement,date);
						myString = myString + k + ',';
						GM_setValue('onlineScores', myString);
					}
					
			}

		}
}
