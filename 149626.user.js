// ==UserScript==
// @name        MUT Show Collection Memberships 
// @namespace   maddenultimate.com
// @include     http://www.easports.com/madden-nfl/ultimate-team/my-cards*
// @version     1
// ==/UserScript==


Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

var cardName;
var theLink;

var thisURL = document.URL;

if(thisURL.indexOf('cState=reserve') != -1){

	var cState = 'reserve';	

}
else
{

	var cState = 'active';

}



var nameArray = new Array();

var cardNames =  document.evaluate("//div[@class='front-card face front']/div[@class='player-info']/div[@class='left-info']/h5[@class='playerName']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var j = 0;

for (var i = 0; i < cardNames.snapshotLength; i++) {

	cardName = cardNames.snapshotItem(i);

	cardName = cardName.textContent;

	cardName = trim(cardName);

	var cardNameArray = cardName.split(' ');


	theLink = 'http://maddenultimate.com/cards/search.php?txtlastname=' + cardNameArray[1];


	j = 1+i;

	nameArray[j] = cardName;


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
var playerName;
var maddenUltimateArray = new Array();
var tempString = '';


function callback_function(parameter1, parameter2, responseDetails)
{

	data = responseDetails.responseText;

	 var regex = new RegExp(nameArray[parameter1+1]+'\\|','g');
	

	var pattern = regex;
	var result;



	if(data.indexOf(nameArray[parameter1+1]) != -1){
		
		data = data.substring(data.indexOf(nameArray[parameter1+1]),data.indexOf('id="tableEnd"'));
			
		
	}



	while((result = pattern.exec(data)) != null){
	
		playerName = data.substring(result.index,data.indexOf('"',result.index));
		tempString = tempString + playerName + ';';
	
	
	}
	
	maddenUltimateArray[parameter1] = tempString;

	tempString = '';

	

	setTimeout( delay, 50); 

function delay(){

	document.addEventListener('click', function(event) {


		if(event.target.parentNode.getAttribute('class')=='myCardsFiltersCheckboxName'){

			
			var theHTML = event.target.parentNode.innerHTML;


			if(theHTML.indexOf('value="reserve"') != -1){

				cState='reserve';


				if(document.URL == 'http://www.easports.com/madden-nfl/ultimate-team/my-cards'){

					var theURL = 'http://www.easports.com/madden-nfl/ultimate-team/my-cards?cState=reserve&cType=qb';			

				}
				else
				{

					var theURL = document.URL;

				}
				theURL = theURL.replace('cState=active','cState=reserve');
				window.location = theURL;
			}
			else if(theHTML.indexOf('value="active"') != -1){

				cState='active';

				var theURL = document.URL;
				theURL = theURL.replace('cState=reserve','cState=active');
				window.location = theURL;				

			}

	
		}

		var buttonClicked = event.target.parentNode.innerHTML;
		buttonClicked = trim(buttonClicked);

		/*
		if(buttonClicked == '<p>Stadiums</p>'){

			var header =  document.evaluate("//div/ul[@class='stats secondary']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			header = header.snapshotItem(0);

			var myTest = document.createElement('li');

			myTest.innerHTML= '<a class="statRow" id="bunting" style="cursor: pointer;">Refresh</a>';

			if(parameter1 == 0){
				header.parentNode.insertBefore(myTest,header);
			}

		}
		*/


		if(event.target.parentNode.getAttribute('class')=='myCardsFiltersName'){


			if(cState == 'reserve'){

				var data_filter_key = event.target.parentNode.parentNode.getAttribute('data-filter-key');

				window.location='http://www.easports.com/madden-nfl/ultimate-team/my-cards?cState=reserve&cType=' + data_filter_key;
			

			}			
		

		}


	}, true);

	var cardName;
	var ovrNumber;
	var tier;

	var cardName2;
	var cardName2Back;

	var myTest;

	var myTests =  document.evaluate("//div[@class='user-card card']/div[@class='front-card face front']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var cardNames =  document.evaluate("//div[@class='front-card face front']/div[@class='player-info']/div[@class='left-info']/h5[@class='playerName']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

	var cardNamesBack =  document.evaluate("//div[@class='back-card face back']/div[@class='player-info']/div[@class='left-info']/h5[@class='playerName']",document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	

	for (var i = 0; i < myTests.snapshotLength; i++) {

		myTest = myTests.snapshotItem(i);


		myTest = myTest.innerHTML;
		cardName = myTest.substring(myTest.indexOf('<h5 class="playerName">') + 23,myTest.indexOf('</h5>'));
		cardName = trim(cardName);
		
		ovrNumber = myTest.substring(myTest.indexOf('<span class="ovr-number">') + 25,myTest.indexOf('<span class="ovr-number">') + 27);

		//old tier = myTest.substring(myTest.indexOf('class="palyer-boxframe ') + 23,myTest.indexOf('class="palyer-boxframe ') + 28);


			cardName2 = cardNames.snapshotItem(i);	
			cardName2Back = cardNamesBack.snapshotItem(i);	


	var box = document.createElement('div');
	box.id = 'center_div';
	//old border color
	//box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/4+'px; left:'+window.innerWidth/6+'px; border:2px solid #0083C1; background:#D7	F2FF; color:#000; padding:20px; -moz-border-radius:4px; -moz-appearance:none;');	
	box.setAttribute('style',  'width:183px; opacity:0.6;  ');		
		//colElement = document.createElement("div");
		box.setAttribute('class','playerTeam');

		var myString;


		for (var j = 0; j < maddenUltimateArray.length; j++) {

			if(maddenUltimateArray[j] != undefined){

				if(cardName2 != null){

				if(maddenUltimateArray[j].indexOf(trim(cardName2.textContent)) != -1 ){
				
					
					maddenUltimateArray2 = maddenUltimateArray[j].split(';'); 
					
					for (var k = 0; k < maddenUltimateArray2.length; k++) {
					
						maddenUltimateArray3 = maddenUltimateArray2[k].split('|');
						
						myString = '<span style="color:white">' +maddenUltimateArray3[0] + '</span> - <span style="color:#FFE658">' + maddenUltimateArray3[3] + '</span>';
						
						
						
						if(maddenUltimateArray3[2] == ovrNumber){
						if(maddenUltimateArray3[3] != ''){

							box.innerHTML = myString;
							
							
							cardName2.parentNode.replaceChild(box,cardName2);
				
						}

						}
	
					}
					
				}

				}

			}//if(maddenUltimateArray[j] != undefined){	
		}


	}	


	
}//function delay

}


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
