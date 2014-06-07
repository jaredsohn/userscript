// ==UserScript==
// @name           Batter Prefs
// @namespace      baseballsimulator.com
// @include        http://fantasygames.sportingnews.com/stratomatic/team/team.html
// @include        http://fantasygames.sportingnews.com/stratomatic/league/player.html?player_id=*
// ==/UserScript==


var playerLinksArray = new Array();
var data;
var responseTextArray = new Array();

var avoid_lhp = new Array();
var avoid_rhp = new Array();
var bunt_more = new Array();
var dont_bunt = new Array();
var hit_and_run_more = new Array();
var dont_hit_and_run = new Array();
var steal_more = new Array();
var dont_steal = new Array();
var dont_ph_lhp = new Array();
var dont_ph_rhp = new Array();
var avoid_ph_blowout = new Array();
var def_sub_with_lead = new Array();
var slow_hook = new Array();

var batter_prefs = new Array();
var batter_prefs2 = new Array();

var completeArray = new Array();
var completeArray2 = new Array();
var completeArray3 = new Array();

var testArray = new Array();
var testArray2 = new Array();

var myInnerHTML;

var stealing;


document.addEventListener('click', function(event) {

if (event.target.getAttribute('type') == "checkbox" && document.location == "http://fantasygames.sportingnews.com/stratomatic/team/team.html"){

	event.preventDefault();

}
		
if (event.target.getAttribute('type') == "submit"){

	GM_setValue("batter_prefs_toggle", '1');

}

if (event.target.text == "YES"){

	GM_setValue("batter_prefs_toggle", '1');

}


}, true);

function refreshOnce(){
	GM_setValue("batter_prefs_toggle", '0');
	location.href = "http://fantasygames.sportingnews.com/stratomatic/team/team.html";
}


Function.prototype.bind = function( thisObject ) {
  var method = this;
  var oldargs = [].slice.call( arguments, 1 );
  return function () {
    var newargs = [].slice.call( arguments );
    return method.apply( thisObject, oldargs.concat( newargs ));
  };
}

function callback_function(parameter1, parameter2, responseDetails)
{

	String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
	}

	data = responseDetails.responseText;
	responseTextArray[parameter1] = data.substring(data.indexOf('avoid_lhp'),data.indexOf('type="submit"')) + 13;


	avoid_lhp[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('avoid_lhp') + 10,responseTextArray[parameter1].indexOf('>'));
	avoid_lhp[parameter1] = avoid_lhp[parameter1].trim();

	avoid_rhp[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('avoid_rhp') + 10,responseTextArray[parameter1].indexOf('> Avoid right-handed pitchers'));
	avoid_rhp[parameter1] = avoid_rhp[parameter1].trim();	

	bunt_more[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('bunt_more') + 10,responseTextArray[parameter1].indexOf('> Sac bunt more'));
	bunt_more[parameter1] = bunt_more[parameter1].trim();	

	dont_bunt[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('dont_bunt') + 10,responseTextArray[parameter1].indexOf('> Don\'t sac bunt'));
	dont_bunt[parameter1] = dont_bunt[parameter1].trim();	

	hit_and_run_more[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('hit_and_run_more') + 17,responseTextArray[parameter1].indexOf('> Hit and run more'));
	hit_and_run_more[parameter1] = hit_and_run_more[parameter1].trim();	

	dont_hit_and_run[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('dont_hit_and_run') + 17,responseTextArray[parameter1].indexOf('> Don\'t hit and run'));
	dont_hit_and_run[parameter1] = dont_hit_and_run[parameter1].trim();	

	steal_more[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('steal_more') + 11,responseTextArray[parameter1].indexOf('> Steal more'));
	steal_more[parameter1] = steal_more[parameter1].trim();	

	dont_steal[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('dont_steal') + 11,responseTextArray[parameter1].indexOf('> Don\'t steal'));
	dont_steal[parameter1] = dont_steal[parameter1].trim();	

	dont_ph_lhp[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('dont_ph_lhp') + 12,responseTextArray[parameter1].indexOf('> Don\'t PH for vs. lefties'));
	dont_ph_lhp[parameter1] = dont_ph_lhp[parameter1].trim();

	dont_ph_rhp[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('dont_ph_rhp') + 12,responseTextArray[parameter1].indexOf('> Don\'t PH for vs. righties'));
	dont_ph_rhp[parameter1] = dont_ph_rhp[parameter1].trim();	

	avoid_ph_blowout[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('avoid_ph_blowout') + 17,responseTextArray[parameter1].indexOf('> Avoid using as PH in blowouts'));
	avoid_ph_blowout[parameter1] = avoid_ph_blowout[parameter1].trim();	

	def_sub_with_lead[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('def_sub_with_lead') + 18,responseTextArray[parameter1].indexOf('> Remove for defensive sub with lead'));
	def_sub_with_lead[parameter1] = def_sub_with_lead[parameter1].trim();	

	slow_hook[parameter1] = responseTextArray[parameter1].substring(responseTextArray[parameter1].indexOf('slow_hook') + 10,responseTextArray[parameter1].indexOf('> Don\'t PR for'));
	slow_hook[parameter1] = slow_hook[parameter1].trim();	


	stealing = data.substring(data.indexOf('&nbsp;&nbsp;')+12,data.indexOf('&nbsp;&nbsp;')+40);
	stealing = stealing.substring(stealing.indexOf('/')+1,stealing.indexOf('(')-1);


	if (isNaN(parseFloat(stealing)) == false){

	batter_prefs[parameter1] = avoid_lhp[parameter1] + "," + avoid_rhp[parameter1] + "," + bunt_more[parameter1] + "," + dont_bunt[parameter1] + "," + hit_and_run_more[parameter1] + "," + dont_hit_and_run[parameter1] + "," + steal_more[parameter1] + "," + dont_steal[parameter1] + "*," + dont_ph_lhp[parameter1] + "," + dont_ph_rhp[parameter1] + "," + avoid_ph_blowout[parameter1] + "," + def_sub_with_lead[parameter1] + "," + slow_hook[parameter1];

	}
	else
	{
	
	batter_prefs[parameter1] = avoid_lhp[parameter1] + "," + avoid_rhp[parameter1] + "," + bunt_more[parameter1] + "," + dont_bunt[parameter1] + "," + hit_and_run_more[parameter1] + "," + dont_hit_and_run[parameter1] + "," + steal_more[parameter1] + "," + dont_steal[parameter1] + "," + dont_ph_lhp[parameter1] + "," + dont_ph_rhp[parameter1] + "," + avoid_ph_blowout[parameter1] + "," + def_sub_with_lead[parameter1] + "," + slow_hook[parameter1];		
	
	
	}


GM_setValue("batter_prefs", batter_prefs.join("|"));

	

}//function

if(document.location == "http://fantasygames.sportingnews.com/stratomatic/team/team.html"){



var d = GM_getValue("batter_prefs_toggle",'1');

	if(d == '0'){

	
	}
	else if (d == '1'){

		setTimeout(refreshOnce,1000);
	}
		





var count  = document.evaluate("//td[@class='title']/text()",
document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var pitcher = count.snapshotItem(0);
var pitcherString = pitcher.data;
var pitcherIndex = pitcherString.lastIndexOf('(');
var pitcherString = pitcherString.substring(pitcherIndex + 1, pitcherIndex + 3);//determine number of pitchers.

var playerNames = document.evaluate("//td/a[contains(@href,'player.html?player_id=')]/text()",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=pitcherString;i < playerNames.snapshotLength;i++)
{

	playerName = playerNames.snapshotItem(i);
	playerName = playerName.nodeValue;

}




var playerLinks = document.evaluate("//td/a[contains(@href,'player.html?player_id=')]/@href",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var j = 0;
for (var i=pitcherString;i < playerLinks.snapshotLength;i++)
{

	    	playerLink = playerLinks.snapshotItem(i);
		playerLink = playerLink.nodeValue;

		playerLinkURL = playerLink.substring(25,playerLink.indexOf('&')) + "&year=2009";
		playerLinkURL = "http://fantasygames.sportingnews.com" + playerLinkURL;
		playerLinksArray[i] = playerLinkURL;
		

j = pitcherString+i;
  GM_xmlhttpRequest({
      method: 'GET',
      url: playerLinksArray[i],
      headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload:callback_function.bind( {}, i, j )
  });
}




var d = GM_getValue("batter_prefs",'||||||||||,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,,|,,,,,,,,,,,');

d = d.replace('||||||||||','')


if (d != null) batter_prefs2 = d.split("|");




//var lastTables = document.evaluate("//td[@class='odd tright text11']/text()[4]",
//document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var lastTables = document.evaluate("//span[@class='text10']",
document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var lastTable = lastTables.snapshotItem(0);

var newCell = document.createElement('td');

myInnerHTML = '<table class="datatab_nowidth" width="100%" border="0" cellpadding=0 cellspacing=1 border=0 align="center"></tr><TR class="tcenter odd"><td></td><td colspan="2">Avoid</td><td colspan="2">Bunt</td><td colspan="2">H&R</td><td colspan="2">Steal</td><td colspan="2">Don\'t PH</td><td>Avoid PH</td><td>Def.</td><td>Don\'t</td></tr><TR class="tcenter"><td class="tleft">Name</td><td>LHP</td><td>RHP</td><td>more</td><td>don\'t</td><td>more</td><td>don\'t</td><td>more</td><td>don\'t</td><td>LHP</td><td>RHP</td><td>Blwout</td><td>sub</td><td>PR</td></tr>';


var myCount = 0;
var myCount2 = 0;

for(i=0; i<batter_prefs2.length; i++) {

	if(myCount == 0){

		if(myCount2%2)
		{

		myInnerHTML += '<tr class="even tcenter"><td class="tleft"><a href="' + playerLinks.snapshotItem(parseFloat(pitcherString) + myCount2).nodeValue + '">'+playerNames.snapshotItem(parseFloat(pitcherString) + myCount2).nodeValue+'</a></td>'
		myCount2++;	

		}
		else
		{

		myInnerHTML += '<tr class="odd tcenter"><td class="tleft"><a href="' + playerLinks.snapshotItem(parseFloat(pitcherString) + myCount2).nodeValue + '">'+playerNames.snapshotItem(parseFloat(pitcherString) + myCount2).nodeValue+'</a></td>'
		myCount2++;			

		}
	}	
	
	completeArray = batter_prefs2[i].split(",");

	for(j=0; j<completeArray.length; j++) {

	
		if(completeArray[j] == "checked" || completeArray[j] == "checked*"){

			
			completeArray[j] = '<td><input type="checkbox" checked disabled>&nbsp;</td>';
			myInnerHTML += completeArray[j];
			
		}
		else
		{
			
			if(completeArray[j] == "*"){

				completeArray[j] = '<td><input type="checkbox"><b><font color="red">x</font></b></td>';
				myInnerHTML += completeArray[j];

			}
			else
			{
				completeArray[j] = '<td><input type="checkbox">&nbsp;</td>';
				myInnerHTML += completeArray[j];

			}

		}	

		myCount++;		

	}
	myCount=0;
		
}

	

myInnerHTML+= '</tr></table><br>';

newCell.innerHTML = myInnerHTML;


lastTable.parentNode.insertBefore(newCell, lastTable);


}//if(document.location == "http://fantasygames.sportingnews.com/stratomatic/team/team.html"){


