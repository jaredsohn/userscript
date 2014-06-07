// ==UserScript==
// @name           Yesterdays splits
// @namespace      baseballsimulator.com
// @description    Show splits from yesterday
// @include        http://fantasygames.sportingnews.com/baseball/stratomatic/*/team/team.html
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/*/team/team.html?stats=splits_saved
// @include	   http://fantasygames.sportingnews.com/baseball/stratomatic/*/team/team.html?stats=splits_load
// ==/UserScript==

var user_idArray = new Array();
var HIDDEN_DIV_ID = 'baseballsimulatorDiv';
var HIDDEN_DIV_ID2 = 'baseballsimulatorDiv2';
var j;
var myPitchtest;
var s3 = " ";

//Get current URL
var thisURL = document.URL;
thisURL = thisURL.substring(0,thisURL.lastIndexOf('/'));
thisURL = thisURL.replace('trade','team');

var year = thisURL.substr(thisURL.indexOf('stratomatic/') + 12,4);
year = year.replace('/','');


//Get location of Team Schedules link
var reallifeStats = document.evaluate("//a[contains(@href,'team_schedule.html?')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
reallifeStats = reallifeStats.snapshotItem(0);

var myLink = document.createElement("baseballsimulator");

myLink.innerHTML = '<br><br><a href="/baseball/stratomatic/' + year + '/team/team.html?stats=splits_saved">Save Splits</a> | <a href="/baseball/stratomatic/' + year + '/team/team.html?stats=splits_load">Load Splits</a>';


reallifeStats.parentNode.appendChild(myLink,reallifeStats);

//Get user ids
var user_ids = document.evaluate("//tr/td/form/select/option/@value",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < user_ids.snapshotLength; i++){

	var user_id =  user_ids.snapshotItem(i);
	user_id = user_id.nodeValue;
	user_id = user_id.substr(24,user_id.lastIndexOf('&') - 24);
	user_idArray[i] = user_id;
}


//load splits
var myHTML = document.createElement("baseballsimulator");
myHTML.innerHTML = '<br><br>' + GM_getValue('splits' + year);

if(document.location == "http://fantasygames.sportingnews.com/baseball/stratomatic/" + year + "/team/team.html?stats=splits_load"){

	if(year == "80s"){
		var myTables = document.evaluate("//table[@width='100%']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 1; i < 4; i++){
				var myTables2 = myTables.snapshotItem(i);
				myTables2.parentNode.replaceChild(myHTML,myTables2);
		
			}	
	}
	else
	{
		var myTables = document.evaluate("//td[@class='text12']|//td[@class='text11help']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i < 4; i++){
				var myTables2 = myTables.snapshotItem(i);
				myTables2.parentNode.replaceChild(myHTML,myTables2);
		
			}
	}


}

//Get my team data
if(document.location == "http://fantasygames.sportingnews.com/baseball/stratomatic/" + year + "/team/team.html?stats=splits_saved"){


//Add saved message confirmation
var reallifeStats2 = document.evaluate("//td/a[contains(@href,'?stats=actual')]",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
reallifeStats2 = reallifeStats2.snapshotItem(0);



var myLink2 = document.createElement("baseballsimulator2");


myLink2.innerHTML = '<br><br><tr><center><br><font color="darkred"><b>League splits were saved.</b></font><br></td></tr>';

reallifeStats2.parentNode.appendChild(myLink2,reallifeStats2);


for (var j = 0; j < 12; j++) {

GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://fantasygames.sportingnews.com/baseball/stratomatic/' + year + '/team/team_other.html?user_id=' + user_idArray[j] + '&stats=splits' ,
    headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload:function(details) {
           var s2 = new String(details.responseText);
	   var document = appendToDocument2(s2);
	   s2 = s2.replace(/\r\n/g,'');

	   if(year == "80s"){
	   s2 = s2.substring(s2.indexOf('<TABLE WIDTH='),s2.indexOf('<span class="text10">'));
	   }
	   else
	   {
	   s2 = s2.substring(s2.indexOf('<TABLE class='),s2.indexOf('<span class="text10">'));
	   }
	   s3 = s3 + s2
	   GM_setValue('splits' + year, s3);
    }
});

function appendToDocument2(html) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }
        div.innerHTML = html;

        return document;
}
}//for (var j = 0; j < 12; j++) {
}//if(document.location == "http://fantasygames.sportingnews.com/baseball/stratomatic/2007/team/team.html?stats=last10")

