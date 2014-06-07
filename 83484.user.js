// ==UserScript==
// @name           Slowboat Remover
// @description    Script that will remove the "Red General" when you're only getting slowboated... 
// @include        http://s*.ikariam.*/*
// @include        http://s*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @version        0.4

// @history        0.4 added in version check, tidied up logging
// @history        0.3 minor bugfixes, added version checking
// @history        0.2 fixed time handling, so hopefully this works now
// @history        0.1 Initial Version
// ==/UserScript==

try { ScriptUpdater.check(83484, "0.4"); } catch(e) {}

var VERSION = "0.4";

GM_log('Start Slowboat Remover v' + VERSION + '');
var StartTime = new Date().getTime();

/******************************\
|*	Add JQuery to the script  *|
\******************************/
var GM_jQuery = document.createElement('script');
GM_jQuery.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_jQuery.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_jQuery);

// Wait until jQuery has loaded
function GM_wait() {
    if( typeof unsafeWindow.jQuery == 'undefined' ) {
        window.setTimeout(GM_wait,100);
    } else {
        $ = unsafeWindow.jQuery;
        GM_ready();
    }
}
var militaryAlert = document.evaluate(
    "//div[@id='advisors']//li[@id='advMilitary']//a[@class='normalalert']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//GM_log("length [" + militaryAlert.snapshotLength + "]");

if (militaryAlert.snapshotLength == 1) {
	GM_wait();
} else {
	GM_log("No military alerts found!");
	GM_log("Ending Slowboat Remover");
}
/************************/

/**
 * Makes a xmlhttpRequest to a given site with given postdata
 *
 * onload:		Function that is called once the request is finished. function should ahev one paramater which will be the responsedetails
 * siteURL:		The url to the site you want to load with the request
 * postData:	post data given to the site your loading (should be of format: name1=value1&name2=value2 etc)
 *
 */
function getPage(onload, siteURL, postData)
{
	var gameServer = top.location.host;

	GM_xmlhttpRequest(
	{
        method:'POST',
        url:siteURL,
        data:postData,
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/atom+xml,application/xml,text/xml',
            'Referer': 'http://' + gameServer + '/index.php', 
            'Cookie': document.cookie
				},
        onload:onload
    });
}

function processAttacks(responseDetails) {
	var cities = document.evaluate(
    "//option[@class='coords']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
  
  //GM_log('Found [' + cities.snapshotLength + '] cities');
  
  var cityIDs = '';
  
  for (var i = 0; i < cities.snapshotLength; i++) {
    thisCity = cities.snapshotItem(i);
    
    //GM_log('CityName [' + thisCity.textContent + ']');
    //GM_log('CityValue [' + thisCity.value + ']');
    if (cityIDs == '') {
    	cityIDs += thisCity.value;
    } else {
    	cityIDs += ',' + thisCity.value;
    }
  }
  
  //GM_log('CityIDs [' + cityIDs + ']');

  var table = document.createElement("table");
	table.innerHTML = responseDetails.responseText.split("fleetMovements")[1].split("<!-- repeat... -->")[1].split("</table>")[0];
	var threats = 0; var attacks = 0;
	//GM_log('inner [' + table.innerHTML + ']');
	//GM_log('found [' + table.rows.length + '] rows');
	for (var i=0; i < table.rows.length; i++) {
		var row = table.rows[i];
		if (row.className.search("hostile") != -1) { // Hostile action
			//GM_log('incoming hostiles');
		  var timeH; // = row.cells[1].innerHTML.split("h")[0];
			if (row.cells[1].innerHTML.search('D') == -1) {
				if (row.cells[1].innerHTML.search('h') == -1) {
					timeH = 0;
				}
				else {
					timeH = row.cells[1].innerHTML.split("h")[0];
				}
			} else {
				timeH = 24;
			}
			var shipAmount = row.cells[2].innerHTML.split(" ")[0];
			var troopsAmount = row.cells[2].innerHTML.split(" ")[3];
			
			var targetID = row.cells[7].innerHTML.split("Id=")[1].split("\"")[0];
			//GM_log('targetID ['+targetID+']');
			//GM_log('timeH ['+timeH+']');
			//GM_log('shipAmount ['+shipAmount+']');
			//GM_log('troopsAmount ['+troopsAmount+']');
			if (cityIDs.search(targetID) != -1) {  //own city
				//GM_log('own city');
	      if (shipAmount > 1 || timeH < 2 || troopsAmount == parseInt(troopsAmount)) {
					threats++;
				}
			}
			else {
				//GM_log('other city');
				if (shipAmount > 3 || timeH < 1 || troopsAmount == parseInt(troopsAmount)) {
				  threats++;
				}
			}
			attacks++;
		}
		//GM_log('found [' + attacks + '] attacks');
	}
	
	if (threats > 0) {
		$("li#advMilitary a:first").attr("class","normalalert");
	}
	$("li#advMilitary .textLabel").html($("li#advMilitary .textLabel").html()+"("+attacks+")");
	
	var EndTime = new Date().getTime();
  GM_log('Ended Slowboat Remover after '+((EndTime - StartTime)/1000)+'s');
}

function GM_ready() 
{
	$("li#advMilitary a.normalalert").attr("class","normal");
	var pageURL = 'http://' + top.location.host + '/index.php?view=militaryAdvisorMilitaryMovements';
	getPage(processAttacks, pageURL, '');
}



