// ==UserScript==
// @name           Diamond Dynasty One Page Stats
// @namespace      baseballsimulator.com
// @include        https://theshownation.com/diamond_dynasty*
// ==/UserScript==

var meterText;
var meterValue;
var meterValue2;

var usernameArray = new Array();
var statsArray = new Array();

var username;
var usernames = document.evaluate("//td[@class='username alignLeft1']/a/text()",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



var box = document.createElement('div');
	box.id = 'center_div';
	//old border color
	//box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/4+'px; left:'+window.innerWidth/6+'px; border:2px solid #0083C1; background:#D7F2FF; color:#000; padding:20px; -moz-border-radius:4px; -moz-appearance:none;');	
	box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/4+'px; left:'+window.innerWidth/4+'px; border:2px solid #000; background:#D7F2FF; color:#000; padding:20px; -moz-border-radius:4px; -moz-appearance:none;');	

	

// Center it right after it's added
alignCenter('center_div');

// Center it when page resizes
window.addEventListener('resize', function(e){alignCenter('center_div')}, false);

var row0;

	for (var i=0;i < 25;i++)
	{
		username = usernames.snapshotItem(i);
		usernameArray[i] = username.nodeValue;
		
	}


var stat;
var stats = document.evaluate("//td[@class='username alignLeft1']/following-sibling::td",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i=0;i < stats.snapshotLength;i++)
	{

		stat = stats.snapshotItem(i);


		statsArray[i] = trim(stat.textContent);


	}

var image;

var images = document.evaluate("//td[@class='username alignLeft1'][contains(a/@href,'/players/')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i=0;i < images.snapshotLength;i++)
	{

		image = images.snapshotItem(i);

		var myLink = document.createElement('td');
		myLink.innerHTML = '<a class="statRow" id="bunting" style="cursor: pointer;">Stats</a>';

	}


setTimeout( delay, 1000); 

function delay(){


var HIDDEN_DIV_ID = 'search_results';

var thisURL = document.URL;

if(thisURL.indexOf('type=') == -1){

	var type = 'Season';

}
else
{

	var type = thisURL.substring(thisURL.indexOf('type=') + 5);

}

if(thisURL.indexOf('tier=') == -1){

	var tier = 'ALL';

}
else
{

	var tier = thisURL.substring(thisURL.indexOf('tier=') + 5);

}




var login = document.evaluate("//span[@id='loginUsername']/strong",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
login = login.snapshotItem(0);



if(login == null){

	var retrievedLogin = GM_getValue("login",'');
	

}
else
{
	login = login.textContent;

	login = login.substring(login.indexOf('Welcome ') + 8, login.length -1);

	GM_setValue("login", login);

	retrievedLogin = login;

}

if(retrievedLogin != ''){

	login = retrievedLogin;

GM_xmlhttpRequest({
    method: 'GET',
    url: 'https://theshownation.com/diamond_dynasty/search?username=' + login + '&tier=' + tier + '&type=' + type,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s = new String(details.responseText);

   var document = appendToDocument(s);
    }
});

function appendToDocument(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;

	var searchResults = document.evaluate("//div[@id='search_results']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	searchResults = searchResults.snapshotItem(0);	

	searchResults.parentNode.insertBefore(div,searchResults);	

        return document;
}	

}





var meterTexts = document.evaluate("//div[@class='meter-text']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var meterValues = document.evaluate("//div[@class='meter-value']/@style",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var i=0;i < meterValues.snapshotLength;i++)
	{

		meterValue = meterValues.snapshotItem(i);
		meterValue2 = meterValue.textContent;
	

		meterValue2 = meterValue2.substring(meterValue2.indexOf('width: ') + 7,meterValue2.length - 1);
		
		meterText = meterTexts.snapshotItem(i);
		meterText.innerHTML = meterValue2;

	}
}



document.addEventListener('click', function(event) {

	var theUser = '';
	var theUserArray = new Array();	
	var userInfo;
	var newUserInfo;

	var myDiv;

	var thisURL = document.URL;

	var theTab;

	if(thisURL.indexOf('leaders') != -1){


		theTab = 'leaders';

	}
	else
	{

		theTab = 'standings';

	}


		var theID = event.target.getAttribute('id');
		

		if(theID == 'center_div'){

			document.body.removeChild(box);
		}
			

	if(event.target.parentNode.getAttribute('class').indexOf('statRow') != -1){



			userInfo = event.target.parentNode.innerHTML;

			//newUserInfo = userInfo.substring(0,userInfo.indexOf('height="12">') + 12);
			newUserInfo = userInfo.substring(0,userInfo.lastIndexOf('></td>') + 6);

		


	for (var i=0;i < statsArray.length;i++){

			if(statsArray[i] == event.target.parentNode.getAttribute('data-username')){

				

				theUser += statsArray[i+1]+","+statsArray[i+2]+","+statsArray[i+3]+","+statsArray[i+4]+","+statsArray[i+5]+","+statsArray[i+6]+","+statsArray[i+7]+","+statsArray[i+8]+","+statsArray[i+9]+",";


			}

	}

	theUserArray = theUser.split(',');

	theUserArray.length = 78;


	var tempString = '';


	newUserInfo = trim(newUserInfo);



	var team = newUserInfo.substring(newUserInfo.indexOf('<td class="username alignLeft1">') + 32,newUserInfo.lastIndexOf('\n') - 5 );
	
		
	team = trim(team);

	

	var name = newUserInfo.substring(newUserInfo.indexOf('&nbsp;') + 6,newUserInfo.length - 5);


	name = trim(name);
	name = name.replace('<img ','<img id="center_div"');




	
	var meterTexts = document.evaluate("//div[@class='meter-text']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var logo = event.target.parentNode.getAttribute('data-team-id');

	var position = event.target.parentNode.getAttribute('data-position');
	var playerID = event.target.parentNode.getAttribute('data-arena-player-id');


	logo = 'https://mlb12-production.s3.amazonaws.com/arena_teams/'+logo+'/logo0.png';
	
	//Not working because script doesn't wait for image to load  :(
	var aHeight;
	var aImg = new Image();
    	aImg.src = logo;
    	aHeight = aImg.height;
    	//
	
	/*
    	if(aHeight == 128){
		
		
		myDiv = '<div style="width: 128px; height: 128px; overflow: hidden"><img align="middle" width="128" height="128" src="'+ logo +'"/></div>';
	}
	else
	{
		myDiv = '<div style="width: 64px; height: 64px; overflow: hidden"><img align="middle" width="128" height="256" src="'+ logo +'"/></div>';


	}
	*/

	myDiv = '<div style=" width: 128px; height: 128px; overflow: hidden"><img align="middle" width="128" height="128" src="'+ logo +'"/></div>';	


	//For logos
	
if(theTab == 'leaders'){

		tempString += '<table cellpadding="1" cellspacing="2"><tr class="statRowOdd"><td>' + myDiv + '</td><td id="center_div" colspan="11"><b id="center_div">Player: </b>'+ team +'<br><b id="center_div">Rating: </b>'+theUserArray[0]+'<br><b id="center_div">Position: </b>'+position+'<br></td></tr>';

}
else
{

	tempString += '<table cellpadding="1" cellspacing="2"><tr class="statRowOdd"><td>' + myDiv + '</td><td id="center_div" colspan="11"><b id="center_div">Team: </b>'+ team +'<br><b id="center_div">Username: </b>'+ name +'<br><b id="center_div">Rating: </b>'+theUserArray[0]+'<br><b id="center_div">Record: </b>'+theUserArray[2]+'-'+theUserArray[3]+'<br></td></tr>';

}

	//tempString += '<table cellpadding="1" cellspacing="2"><tr class="statRowOdd"><td id="center_div" colspan="12"><b id="center_div">Team: </b>'+ team +'<br><b id="center_div">Username: </b>'+ name +'<br><b id="center_div">Rating: </b>'+theUserArray[0]+'<br><b id="center_div">Record: </b>'+theUserArray[2]+'-'+theUserArray[3]+'<br></td></tr>';	



	tempString +='<tr class="statRowEven"><td id="center_div" style="width:10%"><font color="#B31111"><b id="center_div">Batting</b></font></td><td id="center_div"><b id="center_div">TPA</b></b></td><td id="center_div"><b id="center_div">AB</b></td><td id="center_div"><b id="center_div">H</b></td><td id="center_div"><b id="center_div">2B</b></td><td id="center_div"><b id="center_div">3B</b></td><td id="center_div"><b id="center_div">HR</b></td><td id="center_div"><b id="center_div">RBI</b></td><td id="center_div"><b id="center_div">BB</b></td><td id="center_div"><b id="center_div">SO</b></td><td id="center_div"><b id="center_div">SB</b></td><td id="center_div"><b id="center_div">CS</b></td></tr>';

if(theTab == 'leaders'){

	tempString +='<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[35]+'</td><td id="center_div">'+theUserArray[2]+'</td><td id="center_div">'+theUserArray[6]+'</td><td id="center_div">'+theUserArray[10]+'</td><td id="center_div">'+theUserArray[11]+'</td><td id="center_div"">'+theUserArray[12]+'</td><td id="center_div">'+theUserArray[17]+'</td><td id="center_div">'+theUserArray[23]+'</td><td id="center_div">'+theUserArray[20]+'</td><td id="center_div">'+theUserArray[36]+'</td><td id="center_div">'+theUserArray[37]+'</td></tr>';


}
else
{

	tempString +='<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[44]+'</td><td id="center_div">'+theUserArray[13]+'</td><td id="center_div">'+theUserArray[17]+'</td><td id="center_div">'+theUserArray[21]+'</td><td id="center_div">'+theUserArray[22]+'</td><td id="center_div"">'+theUserArray[23]+'</td><td id="center_div">'+theUserArray[27]+'</td><td id="center_div">'+theUserArray[33]+'</td><td id="center_div">'+theUserArray[30]+'</td><td id="center_div">'+theUserArray[45]+'</td><td id="center_div">'+theUserArray[46]+'</td></tr>';

}

	tempString += '<tr class="statRowEven"><td id="center_div"></td><td id="center_div"><b id="center_div">SB %</b></td><td id="center_div"><b id="center_div">TB</b></td><td id="center_div"><b id="center_div">XBH</b></td><td id="center_div"><b id="center_div">GIDP</b></td><td id="center_div"><b id="center_div">HBP</b></td><td id="center_div"><b id="center_div">Sac H</b></td><td id="center_div"><b id="center_div">Sac F</b></td><td id="center_div"><b id="center_div">AVG</b></td><td id="center_div"><b id="center_div">OBP</b></td><td id="center_div"><b id="center_div">SLG</b></td><td id="center_div"><b id="center_div">OPS</b></td></tr>';
	
if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[48]+'</td><td id="center_div">'+theUserArray[33]+'</td><td id="center_div">'+theUserArray[34]+'</td><td id="center_div">'+theUserArray[27]+'</td><td id="center_div">'+theUserArray[24]+'</td><td id="center_div">'+theUserArray[26]+'</td><td id="center_div">'+theUserArray[25]+'</td><td id="center_div">'+theUserArray[38]+'</td><td id="center_div">'+theUserArray[45]+'</td><td id="center_div">'+theUserArray[44]+'</td><td id="center_div">'+theUserArray[46]+'</td></tr>';

}
else
{
	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[53]+'</td><td id="center_div">'+theUserArray[42]+'</td><td id="center_div">'+theUserArray[43]+'</td><td id="center_div">'+theUserArray[37]+'</td><td id="center_div">'+theUserArray[34]+'</td><td id="center_div">'+theUserArray[36]+'</td><td id="center_div">'+theUserArray[35]+'</td><td id="center_div">'+theUserArray[7]+'</td><td id="center_div">'+theUserArray[8]+'</td><td id="center_div">'+theUserArray[9]+'</td><td id="center_div">'+theUserArray[10]+'</td></tr>';

}

	tempString += '<tr class="statRowEven"><td id="center_div"><b id="center_div">vs. L</b></td><td id="center_div"><b id="center_div">AB LHP</b></td><td id="center_div"><b id="center_div">HIT LHP</b></td><td id="center_div"><b id="center_div">HR LHP</b></td><td id="center_div"><b id="center_div">RBI LHP</b></td><td id="center_div"><b id="center_div">SO LHP</b></td><td id="center_div"><b id="center_div">AVG</b></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[4]+'</td><td id="center_div">'+theUserArray[8]+'</td><td id="center_div">'+theUserArray[14]+'</td><td id="center_div">'+theUserArray[19]+'</td><td id="center_div">'+theUserArray[22]+'</td><td id="center_div">'+theUserArray[40]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

}
else
{

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[15]+'</td><td id="center_div">'+theUserArray[19]+'</td><td id="center_div">'+theUserArray[25]+'</td><td id="center_div">'+theUserArray[29]+'</td><td id="center_div">'+theUserArray[32]+'</td><td id="center_div">'+theUserArray[48]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

}
	tempString += '<tr class="statRowEven"><td id="center_div"><b id="center_div">vs. R</b></td><td id="center_div"><b id="center_div">AB RHP</b></td><td id="center_div"><b id="center_div">HIT RHP</b></td><td id="center_div"><b id="center_div">HR RHP</b></td><td id="center_div"><b id="center_div">RBI RHP</b></td><td id="center_div"><b id="center_div">SO RHP</b></td><td id="center_div"><b id="center_div">AVG</b></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[3]+'</td><td id="center_div">'+theUserArray[7]+'</td><td id="center_div">'+theUserArray[13]+'</td><td id="center_div">'+theUserArray[18]+'</td><td id="center_div">'+theUserArray[21]+'</td><td id="center_div">'+theUserArray[39]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

}
else
{

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[14]+'</td><td id="center_div">'+theUserArray[18]+'</td><td id="center_div">'+theUserArray[24]+'</td><td id="center_div">'+theUserArray[28]+'</td><td id="center_div">'+theUserArray[31]+'</td><td id="center_div">'+theUserArray[47]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';	

}

	tempString += '<tr class="statRowEven"><td id="center_div"></td><td id="center_div"><b id="center_div">AB/RISP</b></td><td id="center_div"><b id="center_div">HIT/RISP</b></td><td id="center_div"><b id="center_div">HR/RISP</b></td><td id="center_div"><b id="center_div">AVG/RISP</b></td><td id="center_div"><b id="center_div">Home</b></td><td id="center_div"><b id="center_div">Away</b></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[5]+'</td><td id="center_div">'+theUserArray[9]+'</td><td id="center_div">'+theUserArray[15]+'</td><td id="center_div">'+theUserArray[41]+'</td><td id="center_div">'+theUserArray[42]+'</td><td id="center_div">'+theUserArray[43]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

}
else
{

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[16]+'</td><td id="center_div">'+theUserArray[20]+'</td><td id="center_div">'+theUserArray[26]+'</td><td id="center_div">'+theUserArray[49]+'</td><td id="center_div">'+theUserArray[50]+'</td><td id="center_div">'+theUserArray[51]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';	

}

	tempString += '<tr class="statRowEven"><td id="center_div"><font color="#B31111"><b id="center_div">Pitching</b></font></td><td id="center_div"><b id="center_div">W</b></td><td id="center_div"><b id="center_div">L</b></td><td id="center_div"><b id="center_div">ERA</b></td><td id="center_div"><b id="center_div">GP</b></td><td id="center_div"><b id="center_div">GS</b></td><td id="center_div"><b id="center_div">CG</b></td><td id="center_div"><b id="center_div">SHO</b></td><td id="center_div"><b id="center_div">SV</b></td><td id="center_div"><b id="center_div">BSV</b></td><td id="center_div"><b id="center_div">HLD</b></td><td id="center_div"></td></tr>';

if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[54]+'</td><td id="center_div">'+theUserArray[56]+'</td><td id="center_div">'+theUserArray[76]+'</td><td id="center_div">'+theUserArray[49]+'</td><td id="center_div">'+theUserArray[50]+'</td><td id="center_div">'+theUserArray[51]+'</td><td id="center_div">'+theUserArray[52]+'</td><td id="center_div">'+theUserArray[58]+'</td><td id="center_div">'+theUserArray[60]+'</td><td id="center_div">'+theUserArray[61]+'</td><td id="center_div"></td></tr>';

}
else
{

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[2]+'</td><td id="center_div">'+theUserArray[3]+'</td><td id="center_div">'+theUserArray[11]+'</td><td id="center_div">'+theUserArray[54]+'</td><td id="center_div">'+theUserArray[55]+'</td><td id="center_div">'+theUserArray[56]+'</td><td id="center_div">'+theUserArray[57]+'</td><td id="center_div">'+theUserArray[61]+'</td><td id="center_div">'+theUserArray[63]+'</td><td id="center_div">'+theUserArray[64]+'</td><td id="center_div"></td></tr>';

}

	tempString += '<tr class="statRowEven"><td id="center_div"></td><td id="center_div"><b id="center_div">IP</b></td><td id="center_div"><b id="center_div">H</b></td><td id="center_div"><b id="center_div">ER</b></td><td id="center_div"><b id="center_div">HR</b></td><td id="center_div"><b id="center_div">BB</b></td><td id="center_div"><b id="center_div">SO</b></td><td id="center_div"><b id="center_div">WP</b></td><td id="center_div"><b id="center_div">TBF</b></td><td id="center_div"><b id="center_div">WHIP</b></td><td id="center_div"></td><td id="center_div"></td></tr>';

	//Fix WHIP  ..
	var walksHits = parseFloat(theUserArray[70]) + parseFloat(theUserArray[65]);
	theUserArray[12] = parseFloat(walksHits)/parseFloat(theUserArray[73]);

	theUserArray[12] = theUserArray[12].toFixed(3);

	//Fix Bases on balls
	theUserArray[70] = parseInt(theUserArray[70]);

	if(isNaN(theUserArray[70]) == true){

		theUserArray[70] = 0;

	}

if(theTab == 'leaders'){

	//Fix WHIP  ..
	var walksHits = parseFloat(theUserArray[68]) + parseFloat(theUserArray[62]);
	theUserArray[12] = parseFloat(walksHits)/parseFloat(theUserArray[71]);

	theUserArray[12] = theUserArray[12].toFixed(3);

	//Fix Bases on balls
	theUserArray[68] = parseInt(theUserArray[68]);

	if(isNaN(theUserArray[68]) == true){

		theUserArray[68] = 0;

	}

	tempString += 	'<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[71]+'</td><td id="center_div">'+theUserArray[62]+'</td><td id="center_div">'+theUserArray[66]+'</td><td id="center_div">'+theUserArray[67]+'</td><td id="center_div">'+theUserArray[68]+'</td><td id="center_div">'+theUserArray[69]+'</td><td id="center_div">'+theUserArray[72]+'</td><td id="center_div">'+theUserArray[70]+'</td><td id="center_div">'+theUserArray[77]+'</td><td id="center_div"></td><td id="center_div"></td></tr>';

}
else
{
	
	//Fix WHIP  ..
	var walksHits = parseFloat(theUserArray[70]) + parseFloat(theUserArray[65]);
	theUserArray[12] = parseFloat(walksHits)/parseFloat(theUserArray[73]);

	theUserArray[12] = theUserArray[12].toFixed(3);

	//Fix Bases on balls
	theUserArray[70] = parseInt(theUserArray[70]);

	if(isNaN(theUserArray[70]) == true){

		theUserArray[70] = 0;

	}

	tempString += 	'<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[73]+'</td><td id="center_div">'+theUserArray[65]+'</td><td id="center_div">'+theUserArray[68]+'</td><td id="center_div">'+theUserArray[69]+'</td><td id="center_div">'+theUserArray[70]+'</td><td id="center_div">'+theUserArray[71]+'</td><td id="center_div">'+theUserArray[74]+'</td><td id="center_div">'+theUserArray[72]+'</td><td id="center_div">'+theUserArray[12]+'</td><td id="center_div"></td><td id="center_div"></td></tr>';

}

	tempString += '<tr class="statRowEven"><td id="center_div"></td><td id="center_div"><b id="center_div">W Strk</b></td><td id="center_div"><b id="center_div">L Strk</b></td><td id="center_div"><b id="center_div">SV Strk</b></td><td id="center_div"><b id="center_div">H vs LH</b></td><td id="center_div" style="white-space: nowrap"><b id="center_div">H vs RH</b></td><td id="center_div"><b id="center_div">P AVG</b></td><td id="center_div" style="white-space: nowrap"><b id="center_div">vs. LH</b></td><td id="center_div" style="white-space: nowrap"><b id="center_div">vs. RH</b></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>'; 


if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[55]+'</td><td id="center_div">'+theUserArray[57]+'</td><td id="center_div">'+theUserArray[59]+'</td><td id="center_div">'+theUserArray[64]+'</td><td id="center_div">'+theUserArray[63]+'</td><td id="center_div">'+theUserArray[73]+'</td><td id="center_div">'+theUserArray[75]+'</td><td id="center_div">'+theUserArray[74]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

}
else
{

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[59]+'</td><td id="center_div">'+theUserArray[60]+'</td><td id="center_div">'+theUserArray[62]+'</td><td id="center_div">'+theUserArray[67]+'</td><td id="center_div">'+theUserArray[66]+'</td><td id="center_div">'+theUserArray[75]+'</td><td id="center_div">'+theUserArray[77]+'</td><td id="center_div">'+theUserArray[76]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';


}

	tempString += '<tr class="statRowEven"><td id="center_div"><font color="#B31111"><b id="center_div">Fielding<b id="center_div"></font></b></td><td id="center_div"><b id="center_div">INN</b></td><td id="center_div"><b id="center_div">A</b></td><td id="center_div"><b id="center_div">PO</b></td><td id="center_div"><b id="center_div">E</b></td><td id="center_div"><b id="center_div">PB</b></td><td id="center_div" style="white-space: nowrap"><b id="center_div">FLD %</b></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr>';

if(theTab == 'leaders'){

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[31]+'</td><td id="center_div">'+theUserArray[28]+'</td><td id="center_div">'+theUserArray[29]+'</td><td id="center_div">'+theUserArray[30]+'</td><td id="center_div">'+theUserArray[32]+'</td><td id="center_div">'+theUserArray[47]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr></table>';

}
else
{

	tempString += '<tr class="statRowOdd"><td id="center_div"></td><td id="center_div">'+theUserArray[4]+'</td><td id="center_div">'+theUserArray[38]+'</td><td id="center_div">'+theUserArray[39]+'</td><td id="center_div">'+theUserArray[40]+'</td><td id="center_div">'+theUserArray[41]+'</td><td id="center_div">'+theUserArray[52]+'</td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td><td id="center_div"></td></tr></table>';

}

	row0 = userInfo;


	box.innerHTML = tempString;

	 
	document.body.appendChild(box);


		var theID = event.target.getAttribute('id');

		if(theID == 'center_div'){

			document.body.removeChild(box);
		}
		else
		{

			if(theTab == 'leaders'){


				var meterTexts = document.evaluate("//div[@class='meter-text']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

				var meterValues = document.evaluate("//div[@class='meter-value']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);



				//meterValues.snapshotItem(0).style.width = '50%';
				
				
				
				
	if(event.target.parentNode.getAttribute('data-stat-1').indexOf('STA') != -1){

				meterTexts.snapshotItem(0).innerHTML = event.target.parentNode.getAttribute('data-stat-1').substring(event.target.parentNode.getAttribute('data-stat-1').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-1').indexOf(']')) + '%';

				meterTexts.snapshotItem(1).innerHTML = event.target.parentNode.getAttribute('data-stat-2').substring(event.target.parentNode.getAttribute('data-stat-2').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-2').indexOf(']')) + '%';

	}
	else
	{
				//The webmaster has the CON vs R & CON vs L meters switched.  This displays the correct text percentage.
				meterTexts.snapshotItem(0).innerHTML = event.target.parentNode.getAttribute('data-stat-2').substring(event.target.parentNode.getAttribute('data-stat-2').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-2').indexOf(']')) + '%';

				meterTexts.snapshotItem(1).innerHTML = event.target.parentNode.getAttribute('data-stat-1').substring(event.target.parentNode.getAttribute('data-stat-1').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-1').indexOf(']')) + '%';


	}



				meterTexts.snapshotItem(2).innerHTML = event.target.parentNode.getAttribute('data-stat-3').substring(event.target.parentNode.getAttribute('data-stat-3').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-3').indexOf(']')) + '%';

				meterTexts.snapshotItem(3).innerHTML = event.target.parentNode.getAttribute('data-stat-4').substring(event.target.parentNode.getAttribute('data-stat-4').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-4').indexOf(']')) + '%';								

				meterTexts.snapshotItem(4).innerHTML = event.target.parentNode.getAttribute('data-stat-5').substring(event.target.parentNode.getAttribute('data-stat-5').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-5').indexOf(']')) + '%';		


				meterTexts.snapshotItem(5).innerHTML = event.target.parentNode.getAttribute('data-stat-6').substring(event.target.parentNode.getAttribute('data-stat-6').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-6').indexOf(']')) + '%';


				meterTexts.snapshotItem(6).innerHTML = event.target.parentNode.getAttribute('data-stat-7').substring(event.target.parentNode.getAttribute('data-stat-7').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-7').indexOf(']')) + '%';

				meterTexts.snapshotItem(7).innerHTML = event.target.parentNode.getAttribute('data-stat-8').substring(event.target.parentNode.getAttribute('data-stat-8').indexOf(',')+1,event.target.parentNode.getAttribute('data-stat-8').indexOf(']')) + '%';				


			}
			else
			{


				var meterTexts = document.evaluate("//div[@class='meter-text']",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		
				meterTexts.snapshotItem(0).innerHTML = event.target.parentNode.getAttribute('data-con') + '%';
				meterTexts.snapshotItem(1).innerHTML = event.target.parentNode.getAttribute('data-pwr') + '%';
				meterTexts.snapshotItem(2).innerHTML = event.target.parentNode.getAttribute('data-spd') + '%';
				meterTexts.snapshotItem(3).innerHTML = event.target.parentNode.getAttribute('data-def') + '%';
				meterTexts.snapshotItem(4).innerHTML = event.target.parentNode.getAttribute('data-pit') + '%';
				meterTexts.snapshotItem(5).innerHTML = event.target.parentNode.getAttribute('data-ovr') + '%';


			}

		}	



	}//if(event.target.parentNode.getAttribute('class').indexOf('statRow') != -1){

	
	
}, true);	


function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
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
