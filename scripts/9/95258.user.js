// ==UserScript==
// @name           	Ikariam - City Distances
// @namespace     	http://ikariam.feanturi.com/
// @description    	Gives an overview of distances between selected island and your towns
// @include        	http://s*.ikariam.*/*
// @exclude        	http://board.ikariam.*/*
// ==/UserScript==

/*****************************************\
|**************   Notes   ****************|
\*****************************************

Ikariam - City Distances v 0.2.1

Description:
Ikariam uses a so called "breadcrumb" area. This is shown as a sort of title in the main view of the game ("You a here").
My script adds an hourglass icon to that area. When you hover over it, it shows a list of your towns and the time it takes for a cargo boat to get there.
You can also hover over a city and it shows a detailed list of all the units and their time to get to the island/town your viewing.

Works on:
	> World view - Select an island, and the data will refresh
	> Island view - When viewing an island, it shows the time from your cities to that island
	> Town view - When viewing a town, it shows the time between that city and your cities. (for example for viewing the distances between your own towns)
	> All other views containing the 'breadcrumbs area' with coords in it.

Requirements:
	>You need to show either 'trade goods' or coords in the town selection list

\*******************************************/
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
GM_wait();
/************************/
var prefix = "ikariam_cd_";
var now = (new Date()).getTime();
var scriptUrl = 'http://www.feanturi.nl/ikariam/scripts/ikariam_-_city_distances1.user.js';

var imageHost = "http://ikariam.feanturi.nl/scripts/images/";
var units = {	"Tradeship":[60, imageHost+"ship_transport_r_40x40.gif"],
				"Spy":[240, imageHost+"spy_40x33.gif"],
				"Ram ship":[30, imageHost+"ship_ram_r_40x40.gif"],
				"Ballista ship":[30, imageHost+"ship_ballista_r_40x40.gif"],
				"Flamethrower":[45, imageHost+"ship_flamethrower_r_40x40.gif"],
				"Catapult ship":[30, imageHost+"ship_catapult_r_40x40.gif"],
				"Paddlewheelram":[30, imageHost+"ship_steamboat_r_40x40.gif"],
				"Mortar":[20, imageHost+"ship_mortar_r_40x40.gif"],
				"Submarine":[45, imageHost+"ship_submarine_r_40x40.gif"] };
var tradegoods = [
				imageHost+"icon_wine.gif",
				imageHost+"icon_marble.gif",
				imageHost+"icon_glass.gif",
				imageHost+"icon_sulfur.gif"
]
/************************\
|*** GLOBAL FUNCTIONS ***|
\************************/
function processScriptFile(responseDetails) {
    var regexp = /Last-Modified:\s*([^\r\n]+)/;
    var match = regexp.exec(responseDetails.responseHeaders);
    var previousModified = GM_getValue(prefix+'modified');
    var serverModified = '';
    
    if(match != null) {
        GM_log(match[0]);
        serverModified = match[1];
        GM_setValue(prefix+'modified',serverModified);        
    }
    else
        GM_setValue(prefix+'modified','error');
    
    GM_setValue(prefix+'checked',"" + now);

    if(previousModified != null && previousModified != serverModified) {
        if (confirm('Ikariam City Distances:\n\nA new version has been detected. Do you want to download it?'))
         {
            document.location = scriptUrl;
         }    
    }
}

function checkForUpdates() {
    var lastCheck = GM_getValue(prefix+'checked');
    var period = 1000;//2 * 60 * 60 * 24 * 1000; // 2 days

    var doCheck = (lastCheck == null) || (now - lastCheck >= period);

    if(doCheck) {
    	GM_xmlhttpRequest(
    	{
            method:'GET',
            url:scriptUrl,
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'Content-type': 'application/x-www-form-urlencoded',
                'Accept': 'application/atom+xml,application/xml,text/xml',
                'Cookie': document.cookie
    				},
            onload:processScriptFile
        });
    }
}

/**
 *	this function returns the tradegood:
		Trade good: Wine / tradegood1
		Trade good: Marble / tradegood2
		Trade good: Crystal Glass / tradegood3
		Trade good: Sulphur / tradegood4
 */
function getTradeGoodImg(tradegood) {
	
	switch (tradegood) {
		case "Trade good: Wine" : ;
		case "tradegood1": return tradegoods[0];break;
		case "Trade good: Marble" : ;
		case "tradegood2": return tradegoods[1];break;
		case "Trade good: Crystal Glass" : ;
		case "tradegood3": return tradegoods[2];break;
		case "Trade good: Sulphur" : ;
		case "tradegood4": return tradegoods[3];break;
	}
}

/**
 *	This function returns the travel time from 1 coord to another in minutes
 */
function getTravelTime(x1,y1,x2,y2) {
	var dx = x2-x1; var dy = y2-y1;
	var time = (1200 / 60) * Math.sqrt(dx*dx+dy*dy);
	return (time==0? 10 : time);
}

/**
 * this function returns a time in minutes formatted to "1h 20m 5s"
 */
function formatTime(time) {  
	var h = Math.floor(time / 60);
	var m = Math.floor(time - 60*h);
	var s = Math.floor((time - 60*h-m) * 60);
	
	return (h > 0? h+"h ":"")+m+"m"+(s > 0? " "+s+"s":"");
} 

/**
 *	This functions sorts 2 city rows according to their distance
 */
function sortCities(cityA, cityB) {
	if (cityA[3].search("tradegood") == -1)
		{if (cityA[3] > cityB[3]) {
			return true;
		}
		else if (cityA[3] < cityB[3]) {
			return false;
		}
		else {
			return cityA[1] > cityB[1];
		}
	}
	else {
		return cityA[1] > cityB[1];
	}
}
/************************/

/**
 *	This function calculates the detailed distances when the user hovers over a city
 *
 *	caller - the div of the city that is hover over
 */
function calculateDistancesDetail(caller)
{
	$("#cityDistancesDetail").css('display','block');
	var time = $(caller).attr("rel");
	$(caller).css('background-color','#fdf7dd');
	$(caller).css('color','#000000');
	html = "";
	for (unit in units) {
		html += "<div "+((html == "")?"":"style='border-top: 1px dotted #de964c;'")+"><span style='width:40px;height:40px;padding: 2px 0px;'><img height='40px' src='"+units[unit][1]+"' title='"+unit+"' /></span><span style='padding: 10px 0px 0px 20px;'>"+formatTime(Math.max(5,60*time/(units[unit][0])))+"</span></div><br clear='all' />";
	}
	$("#cityDistancesDetail").html(html);
}

/**
 *	This function calculates the distances for each of the towns and fills the given div with that info
 */
function calculateDistances(div)
{
	// Retrieve coords of current island
	var xCor, yCor;
	$("#breadcrumbs").each(function(i) {
		var regexp = /\[(\d+):(\d+)\]/;
		var m = regexp.exec(this.innerHTML);
		if (m) {
			xCor = m[1];
			yCor = m[2];
		}
		else
			return;
	});
	
	var townsType = GM_getValue(prefix+"townsType");
	var townsClass = "";
	switch (townsType) {
		case '2': townsClass = 'coords'; break;
		case '3': townsClass = 'occupiedCities coords'; break;
		case '4': townsClass = 'deployedCities coords'; break;
		default: townsClass = '';
	}
	
	// Retrieve and do something with coords of every other island
	var cityDistances = new Array();
	var i = 0;
	$("#citySelect option").each( function (i) {
		
		if (townsClass == '' || this.className == 'coords' || this.className.search(townsClass) == 0) {
			i++;
			cityDistances[i] = new Array();
			
			var regexp = /\[(\d+):(\d+)\]/;
			var m = regexp.exec(this.title);
			if (m) { // Trade goods in city selection list
				xx = m[1];
				yy = m[2];
				cityDistances[i][2] = getTradeGoodImg(this.className);
			} else {
				var m = regexp.exec(this.innerHTML);
				if (m) { // Coords in city selection list
					xx = m[1];
					yy = m[2];
					cityDistances[i][2] = getTradeGoodImg(this.title);
				}
				else {
					cityDistances.pop();//[i] = undefined;
					return;
				}	
			}

			cityDistances[i][0] = this.innerHTML;
			cityDistances[i][1] = getTravelTime(xCor, yCor, xx, yy);
			cityDistances[i][3] = this.className.split(" ")[0];
			cityDistances[i][4] = this.selected;
		}
	});
	
	// Sort on distance
	cityDistances.sort(sortCities);
	div.innerHTML = "";
	var first = true;
	for (i in cityDistances){
		cityDistance=cityDistances[i];
		div.innerHTML += "<div class='cityDistance' id='"+(cityDistance[4]?"cd_activeTown":"")+"' style='padding:5px 0px; "+(cityDistance[4]?"background-color: #38B140;":"")+((first)?"":"border-top: 1px dotted #de964c;")+"' rel='"+cityDistance[1]+"'><img src='"+cityDistance[2]+"' style='float:left;'/><label style='float: left; display: block;width: 145px'>&nbsp;"+cityDistance[0]+":</label>"+formatTime(cityDistance[1])+"</div>\n";
		first = false;
	}
	$(".cityDistance").mouseover(function () {calculateDistancesDetail(this)});
	$(".cityDistance").mouseout(function () {
		$("#cityDistancesDetail").css('display','none')
		//alert(this.id);
		if (this.id == 'cd_activeTown') 
			$(this).css('background-color','#38B140');
		else
			$(this).css('background-color','#7e0d0b');
		$(this).css('color','inherit');
	});
}

function options() {
	if (document.getElementById('options'))
	{
		var townsType = GM_getValue(prefix+"townsType");
		$( "div#mainview div.content div#options_changePass" ).after(
			"<div>"+
				"<h3>Ikariam City Distances v0.2.1 options</h3>"+
				"<table cellpadding='0' cellspacing='0' style='text-align: center'>"+
					"<tr>"+ 
						"<th style='text-align: center' colspan='2'>Type of cities</th>"+
					"</tr>"+	
					"<tr>"+
						"<td style='text-align: left'>"+
							"<input type='radio' class='radio cd_townstype' name='townsType' value='1' "+(townsType == 1 || townsType == undefined?"checked = 'checked'":"")+" /> All cities<br />"+
							"<input type='radio' class='radio cd_townstype' name='townsType' value='2' "+(townsType == 2?"checked = 'checked'":"")+" /> Only own cities"+
						"</td>"+
						"<td style='text-align: left'>"+
							"<input type='radio' class='radio cd_townstype' name='townsType' value='3' "+(townsType == 3?"checked = 'checked'":"")+" /> Own cities and occupied cities<br />"+
							"<input type='radio' class='radio cd_townstype' name='townsType' value='4' "+(townsType == 4?"checked = 'checked'":"")+" /> Own cities and deployed cities"+
						"</td>"+
					"</tr>"+
					"<tr>"+
						"<td colspan='1'></td>"+
						"<td><input type='button' class='button' id='cd_btSave' value='Save settings' /></td>"+
					"</tr>"+
				"</table>"+
			"</div>");

			$("#cd_btSave").click( function () {
			var townsType = "";
			$(".cd_townstype").each( function() {
				if ($(this).attr("checked")) {
					townsType = this.value;
				}
			});
			window.setTimeout(GM_setValue, 0, prefix+"townsType", townsType);
						
			alert("Settings saved");
		});
	}
}

function GM_ready() 
{
	checkForUpdates();
	options();
	var regexp = /\[(\d+):(\d+)\]/;
	var m = regexp.exec($("#breadcrumbs").html());
	if ($("#island") && m)
	{
		var span = document.createElement("span");
		span.id = "cityDistancesTime";
		span.innerHTML = "<img src='"+imageHost+"icon_time.gif' style='padding-left: 10px;' />";
		$("#breadcrumbs").append(span);
		
		var div = document.createElement("div");
		div.id = "cityDistances";
		div.style.cssText = "position: absolute;width: 250px;margin-top: 0px; padding: 5px;background-color: #7e0d0b;display: none; border: 2px solid #de964c;";
		div.innerHTML = "";
		$("#cityDistancesTime").append(div);
		
		var div2 = document.createElement("div");
		div2.id = "cityDistancesDetail";
		div2.style.cssText = "position: absolute;width: 150px;margin-top: 0px; margin-left:262px; padding: 5px;background-color: #fdf7dd;display: none; border: 2px solid #de964c;color: #000000;";
		div2.innerHTML = "";
		$("#cityDistancesTime").append(div2);
		
		$("#cityDistancesTime").mouseover(function () {$("#cityDistances").css('display','block')});
		$("#cityDistancesTime").mouseout(function () {$("#cityDistances").css('display','none')});
		$("#cityDistances").mouseover(function () {$("#cityDistances").css('display','block')});
		$("#cityDistances").mouseout(function () {$("#cityDistances").css('display','none')});
		
		calculateDistances(div);
		
		if (unsafeWindow.map) { // world view
			clickIslandDefault=unsafeWindow.map.clickIsland;
			unsafeWindow.map.clickIsland = function (objId) {
				clickIslandDefault(objId);
				window.setTimeout(calculateDistances,1,div);
			}
		}
		if (document.forms[0].name == "navInputForm") {
			oldFunc = document.forms[0].action;
			//alert(document.forms[0].action);
			document.forms[0].action = "javascript:calculateDistances(div)";
		}
	}
}