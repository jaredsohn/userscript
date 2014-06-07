// ==UserScript==
// @name ikaTempoCaricoMerci
// @namespace scriptIkariam
// @description mostra il tempo di caricamento merci oltre al tempo di trasporto
// @include http://s*.ikariam.*/*
// @exclude http://board.ikariam.*/*
// ==/UserScript==

var SERVER_SPEED = 1;

Array.prototype.last = function()
{
return this[this.length - 1]
}

/**
* Returns the name of the city
*/
function getCityName()
{
var city_raw = document.getElementById('citySelect')[document.getElementById('citySelect').selectedIndex].innerHTML;
// Is the player showing cords?
if (city_raw.indexOf(":") != -1)
{
// Showing cords
var cordsEnd = city_raw.indexOf("]") + 2;
return city_raw.substring(cordsEnd, city_raw.length);
}
else
{
// Not showing cords
return city_raw;
}
}
/**
* Returns wether the argument is an integer or not
*/
window.isInteger = function(s){
return (s.toString().search(/^-?[0-9]+$/) == 0);
}

/**
* Gets the resource number for the given field. If it's null return 0 (happens when the field is empty)
*/
function getResource(field)
{
if ((document.getElementById(field)) == null)
{
return 0;
}
else
{
return parseInt(document.getElementById(field).value);
}
}

/**
* Adjusts the loadingtime each time the number of resources is changed
*/
window.adjustLoadingTime = function(port_lvl)
{
try
{
var total_res;
var marble_res = getResource('textfield_marble');
var crystal_res = getResource('textfield_glass');
// some server it's sulfur, some its sulphur. just add the together. can't happend twice and if the other doens't exists it returns 0
var sulphur_res = getResource('textfield_sulphur') + getResource('textfield_sulfur');
var wine_res = getResource('textfield_wine');
var wood_res = getResource('textfield_wood');

// Get total ammount of resources that will be sent
total_res = wood_res + wine_res + sulphur_res + marble_res + crystal_res;
if (!isInteger(total_res))
total_res = 0;

// Get the transport time
var divTime, time, restTime, travelHour, travelMin, travelSec, loadHour, loadMin, loadSec, loadSpeed, hour, min, sec, travelTime;
divTime = document.getElementById('missionSummary').childNodes[1].childNodes[3].innerHTML;
restTime = divTime.split(" = ")[0].split(" + ");

// Parse time, depending on how big it is
timeAr = restTime[1].split(' ');
travelHour = 0;
travelMin = 0;
travelSec = 0;
if (timeAr.length == 3)
{
travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
travelMin = parseInt(timeAr[1].substring(0,timeAr[1].length-1));
travelSec = parseInt(timeAr[2].substring(0,timeAr[2].length-1));
}
else if (timeAr.length == 2)
{
if (timeAr[0].search('h') != -1)
travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[1].search('h') != -1)
travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[0].search('m') != -1)
travelMin = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[1].search('m') != -1)
travelMin = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[0].search('s') != -1)
travelSec = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[1].search('s') != -1)
travelSec = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
}
else if (timeAr.length == 1)
{
if (timeAr[0].search('h') != -1)
travelHour = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[0].search('m') != -1)
travelMin = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
if (timeAr[0].search('s') != -1)
travelSec = parseInt(timeAr[0].substring(0,timeAr[0].length-1));
}
travelTime = travelSec + (travelMin * 60) + (travelHour * 60 * 60);

// Calculate loading times
loadingSpeeds = new Array(3, // 0
30,
60,
93,
129,
169, //5
213,
261,
315,
373,
437, //10
508,
586,
672,
766,
869, //15
983,
1108,
1246,
1398,
1565, // 20
1748,
1950,
2172,
2416);
loadingSpeed = (loadingSpeeds[port_lvl]) * SERVER_SPEED;
loadSec = Math.round(60*total_res / loadingSpeed);
loadHour = Math.floor(loadSec / 60 / 60);
loadSec -= loadHour * 60 * 60;
loadMin = Math.floor(loadSec / 60);
loadSec -= loadMin * 60;

// Calculate total
sec = Math.round((60*total_res / loadingSpeed)+travelTime);
hour = Math.floor(sec / 60 / 60);
sec -= hour * 60 * 60;
min = Math.floor(sec / 60);
sec -= min * 60;
citytmp = getCityName();

document.getElementById('missionSummary').childNodes[1].childNodes[3].innerHTML =
"<span class='textLabel'>Duration of journey: </span>"+ loadHour + "h " + loadMin + "m " + loadSec + "s + " +
travelHour+"h "+travelMin+"m "+travelSec + "s = " + "<strong>" + hour + "h " + min + "m " + sec + "s" +
"</strong>" ;
}
catch(er) {alert(er);}
}

window.addEventListener('load', function()
{
try
{
// Check if you are at the transport page
if (document.getElementById('transport') != null)
{
var sliders = unsafeWindow.sliders;
var city = getCityName();
var port_lvl = GM_getValue(city+'_port_lvl',0);
// Make sure the adjust functions is called when the ammount of resources changes
if (unsafeWindow.swood) { unsafeWindow.swood.subscribe( "change", function() {adjustLoadingTime(port_lvl);}); }
if (unsafeWindow.smarble) { unsafeWindow.smarble.subscribe( "change", function() {adjustLoadingTime(port_lvl);}); }
if (unsafeWindow.swine) { unsafeWindow.swine.subscribe( "change", function() {adjustLoadingTime(port_lvl);}); }
if (unsafeWindow.ssulfur) { unsafeWindow.ssulfur.subscribe( "change", function() {adjustLoadingTime(port_lvl);}); }
if (unsafeWindow.sglass) { unsafeWindow.sglass.subscribe("change", function() {adjustLoadingTime(port_lvl);}); }

// Add loading time to duration time
var html = document.getElementById('missionSummary').childNodes[1].childNodes[3].innerHTML.split("</span>");
document.getElementById('missionSummary').childNodes[1].childNodes[3].innerHTML = html[0] + "</span> 0h 0m 0s + " + html[1] + " = <strong>" + html[1] + "</strong>";
}

// Check if the city page is loaded, and if so, update the portsize
if (document.getElementById('city') != null)
{
var city = getCityName(); // This is the line that was changed to fix the zero port level error.

var positions = document.getElementById('locations');
for (var i = 0; i < positions.childNodes.length; i++)
{
if (positions.childNodes[i].className == "port")
{
var aPortLevel = (positions.childNodes[i].childNodes[3].title.split(" "));
GM_setValue(city+'_port_lvl', parseInt(aPortLevel.last()));
}
}
}
}
catch(er){
//alert("ikaTempoCaricoMerci has encountered an error\nPlease post a message on userscripts.org quoting the error below and which page it was received on\n" + er);
}
},
true);