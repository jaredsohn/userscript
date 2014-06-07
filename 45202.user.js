// ==UserScript==
// @name           Ikariam All In O.E.T
// @namespace      MMXForge
// @description    Gives information about status of allyance member and how member is online
// @author         Luca Saba - N-I-K-O - Toranaga - Worrior
// @version		   0.99c
// @include		   http://s*.ikariam.*/*
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==
/*
 * This script comes from an idea of N-I-K-O.
 * It merge in a unique script 2 other scripts
 * IkariamMemberLastOnline (http://userscripts.org/scripts/show/34793) from Ektdeheba
 * Ikariam Ally's Memebers Info (http://userscripts.org/scripts/show/34852) from Luca Saba... wich is me :D
*/
/* Changes in v. 0.99c
 * - Add how members is online
 * - 
 * Changes in v. 0.99a
 * - Fiddled with the scores display. Useless padding removed.
 *
 * Changes in v. 0.99
 * - Replaced remote images with game images from the server
 *   Sorry for the helmet, but was the only one close to required size.
 *   I initially created a broken red bulb (http://imgboot.com/images/sn00ker/bulbbroken.gif), but didn't want to stick off-site pictures.
 *
 * - Moved options and reset button to the Ikariam options page
 *
 * - Added option to display last online as number of days (the date is still available as a tooltip).
 */
/*
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter.... not needed anymore
 */

var DISPLAY_DATE = 'DisplayDate';
var INFO_DISPLAY_TEXT = 'DisplayInfoAsText';

var host = top.location.host.split(".");
var domain = host[host.length -1];
var server = host[0];

var X = 'x';
var Y = 'y';

/*
 * Words dictionary
 */
var lang={
  en: {'newAlert': 'New Members', 'newTotal': 'Total new members', 'aband': 'Abandon', 'totAban': 'Total abandon', 'confirm': 'Are you sure you want to reset recorded points ?'},
  it: {'newAlert': 'Nuovi membri', 'newTotal': 'Totale nuovi membri', 'aband': 'Abbandoni', 'totAban': 'Totale abbandoni', 'confirm': 'Sei sicuro di cancellare i punteggi salvati ?'},
  co: {'newAlert': '????? ?????', 'newTotal': '?? ??? ????? ?????', 'aband': '????', 'totAban': '?? ??? ????', 'confirm': '??? ??? ???? ???????? ?????'}, //Thanks to MindTwister
  il: {'newAlert': '????? ?????', 'newTotal': '?? ??? ????? ?????', 'aband': '????', 'totAban': '?? ??? ????', 'confirm': '??? ??? ???? ???????? ?????'}, //Thanks to MindTwister
}

var local = 'en'; //For i18n
//If domain id in the dictionary, use domain's dictionary
if(domain in lang) local = domain;

var page = document.getElementsByTagName("body")[0].id;
if (page == "options") {
	options();
	return;
}

if(document.getElementById('embassy') == null && document.getElementById('alliance') == null) return;

GM_addStyle(
	"#container #mainview table.table01 td { padding: 4px;} " +
	"#container #mainview table.table01 td.nopad { padding: 0;} " +
	"#mainview .cityInfo ul li ul li { padding: 4px; width: 240px; } " +
	"#mainview .aioeDistance { float: right; clear: none; } ");

var membersTab = document.getElementById('memberList');
if(membersTab == null) return;
var update_record = false;

var points_cell_idx = 4;
var towns_cell_idx = 2;

//Order by points... not needed anymore
//sortAlly();

//Last Recorded values... this method.. I've seen it in an ecmanaut script ;-)
var members = eval(GM_getValue(domain + "." + server + ".members.2.8", {}) || {});
var recorded_points = eval(GM_getValue(domain + "." + server + ".points.2.8", {}) || {});

var actualValues = getActualData();
//Let's check for new entries
var msg = lang[local]['newAlert'] + "\n";
var sum = 0;

for(var readed_name in actualValues)
{
  //If an actual member name is not in the members list...
  if(typeof(members[readed_name]) == 'undefined')
  {
    sum++;
    msg += readed_name + "\n";
  }
}
if(sum > 0) alert(msg + lang[local]['newTotal'] + ": " + sum);
//And now, let's check for those who left the ally!
var msg = lang[local]['aband'] + "\n";
sum = 0;
for(var member_name in members)
{
  //If a member name is not in the actual member list...
  if(typeof(actualValues[member_name]) == 'undefined')
  {
    sum++;
    msg += member_name + "\n";
    var trOut = document.createElement("TR");
    trOut.style.backgroundColor = "#F00";
    var tdOut = document.createElement("TD");
    tdOut.setAttribute('colspan','7');
    tdOut.style.color = "#FFF";
    tdOut.innerHTML = "<b>" + member_name + "</b> Points: <b>" + members[member_name] + "</b>";
    trOut.appendChild(tdOut);
    membersTab.appendChild(trOut);
  }
}
if(sum > 0) alert(msg + lang[local]['totAban'] + ": " + sum);
saveArray("members", actualValues);

/*
This function helps convert the Ikariam internal date format (day.month.year)
to the javascript Date Object format (year,month,day).
Original Author: Ektdeheba
For version: 0.1.1
Last changed: 0.1.2
*/
function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

function scoresFormat(cell, value) {
	var score = cell.innerHTML;
	if (value == undefined) {
		value = "<img src='/skin/resources/icon_citizen.gif'/>";
	}
	cell.innerHTML = "<table class='nopad' border='0' cellspacing='0' cellpadding='0'><tbody>" +
		"<tr><td width='60%' align='right' class='nopad'>" + score + "</td><td align='right' class='nopad'>(" + value + ")</td></tr></tbody></table>";
}
	
//Returns an Associative Array of the members's points
//While doing that, it sets the online/inactive/offline status
function getActualData()
{
  var res = new Array();
  var pName = '';
  var pPoints = 0;
  var myLoc = getCurrentLocation();
  for(i=1; i < membersTab.rows.length; i++)
  {
    setOnlineStatus(membersTab.rows[i]);
    pName = membersTab.rows[i].cells[1].innerHTML;
	pPoints = membersTab.rows[i].cells[points_cell_idx].innerHTML.replace(/,/g, "") * 1; //Force variable type
	addDistance(myLoc, membersTab.rows[i].cells[towns_cell_idx]);
	  res[pName] = pPoints;
    //If this is the first insert for this member
    if(typeof(recorded_points[pName]) === 'undefined')
	  {
	    scoresFormat(membersTab.rows[i].cells[points_cell_idx], undefined);
	    recorded_points[pName] = pPoints;
	    update_record = true;
    }
	  else
	  {
	    var prev = recorded_points[pName];
	    var act = res[pName];
	    scoresFormat(membersTab.rows[i].cells[points_cell_idx], act - prev);
    }
  }
  if(update_record) saveArray("points", recorded_points);
  return res;
}

//Saves an array to GM string
function saveArray(variable, values_array)
{
  var str = '({';
  for(var k in values_array) str += "'" + k + "':" + values_array[k] + ", ";
  str += '})';
  GM_setValue(domain + '.' + server + '.' + variable + ".2.8", str);
}

function setOnlineStatus(tRow)
{
  if(tRow.cells[0].getAttribute('class') == 'online')
  {
    template('online', tRow, null);
  }
  else if(tRow.cells[0].getAttribute('class') == 'offline')
  {
    var nowDateStr = document.getElementById('servertime').innerHTML.split(" ")[0].replace(/^\s+|\s+$/g, '');
    var nowDate = convertIkariamDate( nowDateStr );
    var inactiveDate = new Date();
    inactiveDate.setDate( nowDate.getDate() - 7 );  // accounts generally go inactive after seven days
    
    var lastOnline = tRow.cells[0].title.split(":")[1].replace(/^\s+|\s+$/g, '');
    var lastDate = convertIkariamDate( lastOnline );
	
	if (!GM_getValue(DISPLAY_DATE, true)) {
		var days = Math.ceil((nowDate - lastDate)/86400000);
		lastOnline = (days == 0) ? "today" : (days == 1) ? "yesterday" : days + " days";
	}

    if( lastDate < inactiveDate )
      template('inactive', tRow, lastOnline);
    else
      template('offline', tRow, lastOnline);
  }
}

function makeCell(tpl, status, image, lastOnline, message, fontColour) {

	return (tpl > 0) ?
			"<div style='width: 8em'>" +
			(status =='online' ? "" : "<span style='float: left'>"+lastOnline + "</span>") +
			"<span style='float: right'><img src='" + image + "' width='14' height='21'></span></div>"
			:
			(status =='online' ? "" : "<span style='float: left'>("+lastOnline + ")</span>") +
			"<b><font color='" + fontColour + "'><span style='float: right'>" + message + "</span></font></b>";
}

function template(status, rowElement, lastOnline)
{
  var tpl = GM_getValue(INFO_DISPLAY_TEXT, true) ? 0:1;
  var images = {
	'online': '/skin/layout/bulb-on.gif',
	'offline': '/skin/layout/bulb-off.gif',
	'inactive': '/skin/unitdesc/unit_helmet.gif'};
  var fontColours = { 'online': '#008800', 'offline': '#F00000', 'inactive': '#708090' };

  rowElement.cells[0].innerHTML = makeCell(tpl, status, images[status], lastOnline, status.toUpperCase(), fontColours[status]);
  rowElement.cells[0].style.backgroundImage = "none";
}

function makeLocation(xCoord, yCoord) {
	var result = {};
	result[X] = xCoord;
	result[Y] = yCoord;
	return result;
}

function extractLocation(html) {
	var rgx = /.*\[(\d+):(\d+)\].*/;
	var x = html.replace(rgx, "$1");
	var y = html.replace(rgx, "$2");
	return makeLocation(x, y);
}
	
function getCurrentLocation() {
	var li = document.getElementById("changeCityForm").getElementsByTagName("UL")[0].getElementsByTagName("LI")[0];
	var key = '<span class="cityresource"></span>';
	var start = li.innerHTML.indexOf(key) + key.length;
	var end = li.innerHTML.indexOf("</div>");
	var city = li.innerHTML.slice(start, end);
	return extractLocation(city);
}

function makeDiv(content) {
	var div = document.createElement("div");
	div.setAttribute("class", "aioeDistance");
	div.innerHTML = content;
	return div;
}

function addDistance(myLocation, cell) {
	var li = cell.getElementsByTagName('LI');
	for (var j = 0; j < li.length; j++) {
		if (li[j].parentNode.parentNode != cell) {
			var destination = extractLocation(li[j].innerHTML);
			li[j].insertBefore(makeDiv(getDistance(myLocation, destination)), li[j].childNodes[0]);
		}
	}
}

function fmt(n, unit) {
	return (n>0 ? n + unit : "");
}

function getDistance(p1, p2) {
	// compute duration to ship goods from p1 to p2
	if (p1[X] == p2[X] && p1[Y] == p2[Y]) {
		return "10m";
	}
	
	var distance = Math.ceil(1200*Math.sqrt(Math.pow(Math.abs(p1[X]-p2[X]), 2) + Math.pow(Math.abs(p1[Y]-p2[Y]), 2)));
	var days = Math.floor(distance/86400); distance = distance - days*86400;
	var hours = Math.floor(distance/3600); distance = distance - hours*3600;
	var minutes = Math.floor(distance/60);
	var seconds = distance - minutes*60;
	return fmt(days, 'D') + fmt(hours, 'h') + fmt(minutes, 'm') + fmt(seconds, 's');
}

function options() {
	var allElements = document.getElementsByTagName('form');
	for(var i = 0; i < allElements.length; i++) {
	    var thisElement = allElements[i];
		if (thisElement.elements[0].value == 'Options') {
			var div = document.createElement('div');
			div.setAttribute("id", "AIOEmbassyOptions");
			div.innerHTML = <>
				<div>
					<h3>All-in-One Embassy Options</h3>
					<table cellpadding="0" cellspacing="0">
						<tr><td align="center">
							How should I display the information?<br />
							<input id="aioeInfoDisplayText" type="radio" name="aioeInfoDisplayMode" value="Text" />Text <input id="aioeInfoDisplayImages" type="radio" name="aioeInfoDisplayMode" value="Images" />Images<br />
						</td></tr>
						<tr><td align="center">
							How should I display the dates?<br />
							<input id="aioeDisplayDate" type="radio" name="aioeDisplayMode" value="Dates" />Dates <input id="aioeDisplayDurations" type="radio" name="aioeDisplayMode" value="Durations" />Durations<br />
						</td></tr>
						<tr><td align="center">
							<div class="centerButton"><input id="aioeReset" class="button" value="Reset!" type="button" /></div>
						</td></tr>
					</table>
				</div>
			</>;
			
			thisElement.insertBefore(div, document.getElementById('options_debug'));
			
			if (GM_getValue(INFO_DISPLAY_TEXT, true)) {
				document.getElementById("aioeInfoDisplayText").checked = true;
			} else {
				document.getElementById("aioeInfoDisplayImages").checked = true;
			}
			
			document.getElementById("aioeInfoDisplayText").addEventListener('change',
				function() {
					GM_setValue(INFO_DISPLAY_TEXT, true);
				}, true);
			document.getElementById("aioeInfoDisplayImages").addEventListener('change',
				function() {
					GM_setValue(INFO_DISPLAY_TEXT, false);
				}, true);

			if (GM_getValue(DISPLAY_DATE, true)) {
				document.getElementById("aioeDisplayDate").checked = true;
			} else {
				document.getElementById("aioeDisplayDurations").checked = true;
			}
			
			document.getElementById("aioeDisplayDate").addEventListener('change',
				function() {
					GM_setValue(DISPLAY_DATE, true);
				}, true);
			document.getElementById("aioeDisplayDurations").addEventListener('change',
				function() {
					GM_setValue(DISPLAY_DATE, false);
				}, true);
				
			document.getElementById("aioeReset").addEventListener('click',
		    		function() {
						if (confirm(lang[local]['confirm'])) {
							saveArray("points", {});
						}
		    		}, true);			
			return;
		}
	}
}
// My addons
var sum = 0 ;
var leg = document.getElementById('memberList').rows.length ;
for(var i = 1 ; i < leg ; i++) 
{
  var g = document.getElementById('memberList').rows[i].cells;
  var v = g[0].innerHTML;
   if( v == '<b><font color="#008800"><span style="float: right;">ONLINE</span></font></b>') {
        sum ++;
        var  oTD = document.getElementById('memberList').rows[i].innerHTML;
        document.getElementById('memberList').deleteRow(i);
        var  oTR = document.getElementById('memberList').insertRow(sum);
        oTR.innerHTML = oTD ;
        oTR = document.getElementById('memberList').rows[sum].cells;
        oTR[0].innerHTML =  "<center><b>ONLINE</b></center>" ;
      }
}

var row = document.getElementById('allyinfo').insertRow(2);
var y = row.insertCell(0);
var z = row.insertCell(1);
y.innerHTML="Online Members:";
z.innerHTML = sum;
