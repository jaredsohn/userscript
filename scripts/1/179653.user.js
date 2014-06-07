// ==UserScript==
// @name        SOM Logo Generator
// @namespace   baseballsimulator.com
// @include     http://onlinegames.strat-o-matic.com/league/stats/managers/*
// @include     http://onlinegames.strat-o-matic.com/team/*
// @version     1
// ==/UserScript==

function appendToDocument2(html) {
        var div = document.getElementById(HIDDEN_DIV_ID2);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID2;
            div.style.display = 'none';
        }
        div.innerHTML = html;

        return document;
}

function alignCenter(e) {
var node = (typeof e=='string') ? document.getElementById(e) : ((typeof e=='object') ? e : false);
if(!window || !node || !node.style) {return;}
var style = node.style, beforeDisplay = style.display, beforeOpacity = style.opacity;
if(style.display=='none') style.opacity='0';
if(style.display!='') style.display = '';
style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
style.display = beforeDisplay;
style.opacity = beforeOpacity;
}

// Center it right after it's added
alignCenter('center_div');

// Center it when page resizes
window.addEventListener('resize', function(e){alignCenter('center_div')}, false);

var thisURL = document.URL;
var URLID = thisURL.substring(thisURL.lastIndexOf('/')+1);

var masterString='';

var theResults = '';

var myTitle;


var HIDDEN_DIV_ID2 = 'baseballsimulatorDiv';

if(thisURL.indexOf("http://onlinegames.strat-o-matic.com/team") != -1){


	var teamImageLocation = document.evaluate("//img",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	teamImageLocation = teamImageLocation.snapshotItem(1);


	var myImage = document.createElement('span');

	var retrievedRepo = GM_getValue("repository",'');

	retrievedRepo2 = retrievedRepo.split('|');

	for (var i=0;i < retrievedRepo2.length-1;i++){

		var retrievedRepo2String = retrievedRepo2[i].toString();
		retrievedRepo2StringArray = retrievedRepo2String.split(',');


		if(retrievedRepo2StringArray[1].indexOf(URLID) != -1){


			switch(teamImageLocation.src)
			{
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb60s-sm.gif':
					myTitle = 'Superstar Sixties';
					break;

				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb90s-sm.gif':
					myTitle = 'Back to the \'90s';
					break;
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2012-sm.gif':
					myTitle = 'Strato 2012';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bbatg7-sm.gif':
					myTitle = 'All-Time Greats VII';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb80-sm.gif':
					myTitle = 'Back to the 80s';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb70-sm.gif':
					myTitle = 'The \'70s Game';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb1999-sm.gif':
					myTitle = 'Strato 1999';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb1986-sm.gif':
					myTitle = 'Strato 1986';
					break;	
				case 'http://onlinegames.strat-o-matic.com/img/icons_player_sets/strato-bb2011-sm.gif':
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
				default:
					myTitle = '';
			}

			myImage.innerHTML = '<img Title="'+myTitle+'" width="90" height="90" src="'+retrievedRepo2StringArray[2]+'"><br>'

			teamImageLocation.parentNode.replaceChild(myImage,teamImageLocation);	
			

		}


	}
	

}



if(thisURL.indexOf("http://onlinegames.strat-o-matic.com/league/stats/managers/") != -1){


	var retrievedRepo = GM_getValue("repository",'');

	retrievedRepo2 = retrievedRepo.split('|');


	var flag = true;
	var teamName;
	var teamName2;
	var teamNames = document.evaluate("//td/a",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var teamImages = document.evaluate("//div/img[@title='View Images']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var teamImage;

	var teamImageLocation = document.evaluate("//img",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	teamImageLocation = teamImageLocation.snapshotItem(1);	

	var defaultSRC = teamImageLocation.src;
	var newSRC;


	

	for (var i=0;i < teamNames.snapshotLength;i++)
	{

		
			teamName = teamNames.snapshotItem(i);
			teamNameLNK = teamName.href
			teamName2 = teamName.textContent;		

			logoLink = document.createElement("div");
			logoLink.setAttribute('class', 'tleft'); 


			var teamNameID = teamNameLNK.substring(teamNameLNK.lastIndexOf('/')+1);


		for (var j=0;j < retrievedRepo2.length-1;j++){

			var retrievedRepo2String = retrievedRepo2[j].toString();
			retrievedRepo2StringArray = retrievedRepo2String.split(',');


			if(teamName == retrievedRepo2StringArray[1]){

			
				newSRC = retrievedRepo2StringArray[2];


			}


		}


		if(retrievedRepo.indexOf(teamNameID) == -1){


			newSRC = defaultSRC;

		}


		

			logoLink.innerHTML = '<a href="'+teamName.href+'">'+ teamName2 + '</a>' + ' <img id="'+teamName+'" width="16" height="16" src="'+newSRC+'" style="cursor: pointer;" alt="[Image Missing!]" title="View Images" value="' + teamName2 + '" border="0">';	
			
				
			
			teamName.parentNode.replaceChild(logoLink,teamName);		

	}


}//if(thisURL.indexOf("http://fantasygames.sportingnews.com/stratomatic/team/") != -1){	


document.addEventListener('click', function(event) {

	if(event.target.getAttribute('title')=='View Images'){

	

		var team = event.target.getAttribute('value');
		var teamArray = team.split(' ');
	
		switch(teamArray.length)
		{
		case 2:
  			team = teamArray[1];
	  		break;
		case 3:
  			team = teamArray[1] + " " + teamArray[2];
	  		break;
		case 4:
  			team = teamArray[2] + " " + teamArray[3];
	  		break;	
		case 5:
  			team = teamArray[3] + " " + teamArray[4];
	  		break;			
		default:
			team = teamArray[teamArray.length-1];		

		}
		

				GM_xmlhttpRequest({
				    method: 'GET',
				    url: 'http://www.bing.com/images/search?q='+team+'+baseball&qft=+filterui:imagesize-small+filterui:color2-color+filterui:photo-clipart+filterui:aspect-square' ,
				    
				    headers: {
				        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				        'Accept': 'application/atom+xml,application/xml,text/xml',
				    },
				    onload:function(details) {
				           var s2 = new String(details.responseText);
					   var document = appendToDocument2(s2);
					   s2 = s2.replace(/\r\n/g,'');	

					   var pattern = /imgurl:&quot;/g;	
					   var result;	
					   var scoreData2;

					   var myCount=-1;

					while((result = pattern.exec(s2)) != null){

						scoreData2 = s2.substring(result.index + 13,s2.indexOf('&quot;',result.index+13));


						myCount = myCount + 1;


						if(myCount < 25){
						
		var searchGamerLoc;
		var searchGamerLocs = document.evaluate("//div[@class='tleft']/img/@value",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			for (var i=0;i < searchGamerLocs.snapshotLength;i++)
			{

				searchGamerLoc = searchGamerLocs.snapshotItem(i);
				searchGamerLoc = searchGamerLoc.nodeValue;
				var searchGamerLocArray = searchGamerLoc.split(' ');

				switch(searchGamerLocArray.length)
				{
				case 2:
  					searchGamerLoc = searchGamerLocArray[1];
	  				break;
				case 3:
  					searchGamerLoc = searchGamerLocArray[1] + " " + searchGamerLocArray[2];
	  				break;
				case 4:
  					searchGamerLoc = searchGamerLocArray[2] + " " + searchGamerLocArray[3];
	  				break;	
				case 5:
  					searchGamerLoc = searchGamerLocArray[3] + " " + searchGamerLocArray[4];
	  				break;					
				default:
					team = searchGamerLocArray[searchGamerLocArray.length-1];		

				}				

				

				if(searchGamerLoc == team){

				
					theResults = theResults +  '<img id="The Image" width="90" height="90" Title="'+team+'" style="cursor: pointer;" src="'+scoreData2+ '">';

				
				}

			}
						}
	
					}

		var searchGamerLoc;
		var searchGamerLocs = document.evaluate("//div[@class='tleft']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var searchLink;
		var searchLinks = document.evaluate("//div[@class='tleft']/a/@href",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		var imageValue;
		var imageValues = document.evaluate("//div[@class='tleft']/img/@value",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);


			for (var i=0;i < searchGamerLocs.snapshotLength;i++)
			{

			searchGamerLoc = searchGamerLocs.snapshotItem(i+1);
			imageValue = imageValues.snapshotItem(i);
			searchLink = searchLinks.snapshotItem(i);

			var theImageValue = imageValue.nodeValue;

			var theImageValueArray = theImageValue.split(' ');

			switch(theImageValueArray.length)
			{
			case 2:
  				theImageValue = theImageValueArray[1];
	  			break;
			case 3:
  				theImageValue = theImageValueArray[1] + " " + theImageValueArray[2];
	  			break;
			case 4:
  				theImageValue = theImageValueArray[2] + " " + theImageValueArray[3];
	  			break;	
			case 5:
  				theImageValue = theImageValueArray[3] + " " + theImageValueArray[4];
	  			break;				
			default:
				theImageValue = theImageValueArray[theImageValueArray.length-1];		
			}

						

			if(theImageValue == team){


				masterString = team + ',' + searchLink.nodeValue + ',';


							var myTest = document.createElement('div');
							myTest.id = 'center_div';

							var leftPos = 50;
							var innerWidth = 50;
							myTest.setAttribute('style',  'position:fixed; top:'+leftPos+'px; left:'+innerWidth+'px; border:2px solid #000; background:#D7F2FF; color:#000; padding:20px; -moz-border-radius:4px; -moz-appearance:none;z-index:1;');




							theResults = theResults + '<br><br>Upload Image from a URL: <input type="text" id="textSubmit" name="Text Submit"><input type="submit" id="The Submit" value="Submit">';

							myTest.innerHTML=theResults;
							
							document.body.appendChild(myTest);
				

			}			


			}			

    					}

				});		

	}

if (event.target.getAttribute('id') == "The Image"){

var user_id = masterString.substring(masterString.indexOf('user_id=') + 8,masterString.length-1);

masterString = masterString + event.target.getAttribute('src') + '|';


var retrievedRepo = GM_getValue("repository",'');

if(retrievedRepo.indexOf(user_id) == -1){

	GM_setValue("repository", retrievedRepo + masterString);
	window.location=thisURL;

}
else
{

	if (retrievedRepo != null) retrievedRepo2 = retrievedRepo.split("|");

	for (var i=0;i < retrievedRepo2.length;i++){

		if(retrievedRepo2[i].indexOf(user_id) != -1){

			
			var masterString2 = masterString.substring(0,masterString.length - 1);
			retrievedRepo = retrievedRepo.replace(retrievedRepo2[i],masterString2);
			GM_setValue("repository", retrievedRepo);
			window.location=thisURL;


		}


	}


}



}

if (event.target.getAttribute('id') == "The Submit"){

	var user_id = masterString.substring(masterString.indexOf('user_id=') + 8,masterString.length-1);

	var myText = document.getElementById('textSubmit').value; 

	masterString = masterString + myText + '|';	

	var retrievedRepo = GM_getValue("repository",'');

	if(retrievedRepo.indexOf(user_id) == -1){

		if(myText !=''){
			GM_setValue("repository", retrievedRepo + masterString);
		}
		window.location=thisURL;

	}
	else
	{

		if (retrievedRepo != null) retrievedRepo2 = retrievedRepo.split("|");

		for (var i=0;i < retrievedRepo2.length;i++){

			if(retrievedRepo2[i].indexOf(user_id) != -1){

			
				var masterString2 = masterString.substring(0,masterString.length - 1);
				retrievedRepo = retrievedRepo.replace(retrievedRepo2[i],masterString2);
				if(myText != ''){
					GM_setValue("repository", retrievedRepo);
				}
				window.location=thisURL;


			}


		}


	}
	

}



}, true);	
