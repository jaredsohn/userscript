// ==UserScript==
// @name Survivor_list_avg_value
// @namespace goallineblitz.com
// @include http://goallineblitz.com/game/leagues.pl
// ==/UserScript==

window.setTimeout(function()
{
var button = document.createElement("input");
button.setAttribute("value","S29_Ranks");
button.setAttribute("type","button");
button.setAttribute("id","S29button");
button.addEventListener("click",s29ranks,false);
var content = document.getElementById("content");
content.insertBefore(button, document.getElementById("america_map"));

var button = document.createElement("input");
button.setAttribute("value","Stop S29");
button.setAttribute("type","button");
button.setAttribute("id","stopS29button");
button.addEventListener("click",stopS29,false);
var content = document.getElementById("content");
content.insertBefore(button, document.getElementById("america_map"));


}, 1000);

var links = [];
var lsrvstr = "http://goallineblitz.com/game/league_survivor.pl?league_id=";
var lgstr = "http://goallineblitz.com/game/league.pl?league_id=";

// rankings globals
var stopsign = false;
var g_ranks = true;
var g_nextdelay = 7000;



function s29ranks() {
g_ranks = true;
main("glbsurvivorbear");

}


function stopS29() {
stopsign = true;
}


function main(survivorstring) {
document.getElementById("S29button").disabled = true;

if (GM_getValue(survivorstring) != null) {
console.log("saved leagues exist --> "+GM_getValue(survivorstring));
links = GM_getValue(survivorstring).split(",");
console.log(links.length+") "+links);
}
if ((GM_getValue(survivorstring) == null) || (isNaN(parseInt(links[0])) == true)) {
console.log("no saved leagues. reloading.");
for each (var l in document.links) {
var lgid = parseInt(l.toString().split("league_id=")[1]);
if (isNaN(lgid) == true) continue;

if (links.indexOf(lgid) == -1) {
links.push(lgid);
}
}
}

// links=[33,36,35,50,151,152,48];

var table = document.createElement("table");
table.setAttribute("id","survivorTable");

var content = document.getElementById("content");
content.insertBefore(table, document.getElementById("america_map"));

getInetPage(lsrvstr+links[0], links[0], getLeagues, links.slice(1));
}

function getLeagues(address, lgID, page, data) {
var div = document.createElement("div");
div.innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");
var elimin = false;


try {
var a = address.split(".com/")[1].replace("_survivor","")+'">';
var leagueName = div.innerHTML.split(a)[1].split("<")[0];


var table = document.getElementById("survivorTable"); // the table with each of the survivor rows... no need for ID.
table.setAttribute("class","nonalternating_color");
var tbody = document.createElement("tbody");
table.appendChild(tbody);

var tr = document.createElement("tr");
tr.setAttribute("class","alternating_color"+((table.rows.length%2)+1));


var select = div.getElementsByTagName("select");

if(select.length == 0)
{
console.log("empty select"+lgID);
elimin = true;
}
else if (select[0].name == "my_pick")
{
var idx = select[0].selectedIndex;
var str = leagueName+") "+select[0].options[idx].text+" ("+select[0].options[idx].value+")";

// week is in the td before my_pick.
var currentweek = div.innerHTML.split("<td><select name=\"my_pick\">")[0].split("<td>").pop().replace("</td>","");



var td = document.createElement("td");
// td.innerHTML = "<a style='color:black' href='"+address.replace("_survivor","")+"'>"+leagueName+"</a>";
td.innerHTML = "<a style='color:black' href='"+address+"&week="+currentweek+"'>"+leagueName+"</a>";

tr.appendChild(td);

// add the week #
var td = document.createElement("td");

td.innerHTML = "<div style='color:black'>" + currentweek +"</div>";
tr.appendChild(td);

// get the rankings


var td = document.createElement("td"); // td for rankings stuff

//build a div to put in the location
var div = document.createElement('div');
div.setAttribute('id', 'rankings'+lgID); // add the leagueid

//place the div
td.appendChild(div);




//build a div to store the input
div = document.createElement('div');
div.setAttribute('id', 'rankingInput'+lgID);
div.setAttribute("style","color:black");
td.appendChild(div);

//build a div to store the data temporarily
div = document.createElement('div');
div.setAttribute('id', 'rankingData'+lgID);
div.setAttribute("style","visibility: hidden; display:none;");
td.appendChild(div);

//build a div to store pages temporarily
div = document.createElement('div');
div.setAttribute('id', 'rankingTemp'+lgID);
div.setAttribute("style","visibility: hidden; display:none;");
td.appendChild(div);


//build a second div to store other pages temporarily
div = document.createElement('div');
div.setAttribute('id', 'newDocumentTemp'+lgID);
div.setAttribute("style","visibility: hidden; display:none;");
td.appendChild(div);


tr.appendChild(td);

// add the select

var td = document.createElement("td");
td.innerHTML = select[0].parentNode.innerHTML;
tr.appendChild(td);

table.appendChild(tr);
}
else
{
console.log("Odd eliminated in"+lgID);
elimin = true;
}
}
catch (e) {
console.log(e);
}
if (stopsign)
{
return;
}
else if (data.length > 0) {
document.getElementById("S29button").value = data.length+" remaining";

// call off the rankings stuff with the appropriate league id data[0].
// ignore the other user picks for now
// just get the rankings

if(elimin==false && g_ranks == true)
{
// collect the current lgID.
getInetPage(lgstr+lgID, lgID, gatherData, data.slice(1));
}
else
{
console.log("eliminated in lgID="+lgID);
}

// recurse to the next lgID (Data[0])
window.setTimeout(getInetPage, g_nextdelay, lsrvstr+data[0], data[0], getLeagues, data.slice(1) );
//getInetPage(lsrvstr+data[0], data[0], getLeagues, data.slice(1)); // recursion, yeah!
}
else {

// have to finish off the last guy
if(elimin==false && g_ranks == true)
{
// collect the current lgID.
getInetPage(lgstr+lgID, lgID, gatherData, data.slice(1));
}
else
{
console.log("eliminated in lgID="+lgID);
}

// alphabetize();
addListeners();
document.getElementById("plbutton").value = "done";
}
}


function addListeners() {
var inputs = document.getElementsByTagName("input");
for each (var btn in inputs) {
if (btn.type == "submit") {
btn.addEventListener("click",submit,false);
}
}
}

function submit(event) {
var btn = event.target;
var lgid = parseInt(btn.parentNode.parentNode.cells[0].firstChild.href.toString().split("=")[1]);
var idx = parseInt(btn.parentNode.firstChild.selectedIndex);
var selected = btn.parentNode.firstChild.options[idx].value;

var data = "league_id="+lgid+"&my_pick="+selected+"&action=Submit+Pick";

var req = new XMLHttpRequest();
req.open( "POST", "http://goallineblitz.com/game/league_survivor.pl", true );
req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
req.setRequestHeader("Content-length", data.length);
req.setRequestHeader("Connection", "close");
req.onreadystatechange = function() {
if(req.readyState == 4 && req.status == 200) {
event.target.value = "Submitted";
}
else {
event.target.value = req.status;
}
};
req.send(data);
return req;
}


function getInetPage(address, myid, func, data) {
console.log("getInetPage : "+address);
var req = new XMLHttpRequest();
req.open( 'GET', address, true );
req.onload = function() {
if (this.status != 200) {
alert("pbr gm script: Error "+this.status+" loading "+address);
}
else {
console.log("loaded: "+address)
func(address, myid, this, data);
}
};

req.send(null);
return req;
}
















// NOW WITH RANKINGS!!!


function gatherData(address, lgID, page, data) {


console.log("gatherData:" + 'newDocumentTemp'+lgID);

document.getElementById('newDocumentTemp'+lgID).innerHTML = page.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");


//clear the rankingInput and give the user progress feedback
document.getElementById('rankingInput'+lgID).innerHTML = '<span id="progress'+lgID+'">Getting Rankings: 0%</span><span id="working'+lgID+'">.</span>';

//build a table in rankingData
location = document.getElementById('rankingData'+lgID);

var table = document.createElement('table');

// !!! THiS will be a problem for mass tabling.

table.setAttribute('id', 'rankingDataTable'+lgID);
location.appendChild(table);

location = document.getElementById('rankingDataTable'+lgID);

for(var i=0; i<32; i++){
tr = document.createElement('tr');
tr.style.borderStyle="solid";
location.appendChild(tr);
tr = location.getElementsByTagName('tr');
for(var j=0; j<78; j++){
var td = document.createElement('td');
td.innerHTML = '';
tr.appendChild(td);
}
}

location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[0];

// Get the teams here

//----------fill the table with data
var teamId = new Array();
var j=0;
//fill in the team name column and set the row id to the team id
for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


var teamPage = location.getElementsByTagName('tr').childNodes[3].firstChild.href.split('=', 2);

if (teamPage[0] == "http://goallineblitz.com/game/league.pl?league_id") { // WORLD LEAGUE
teamPage = location.getElementsByTagName('tr').childNodes[5].firstChild.href.split('=', 2);
var teamName = location.getElementsByTagName('tr').childNodes[5].firstChild.innerHTML;
} else {
var teamName = location.getElementsByTagName('tr').childNodes[3].firstChild.innerHTML;
}
teamId[j] = teamPage[1];

document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

j++;

updateProgress(lgID);
}



// go to the second conference list
location = document.getElementById('newDocumentTemp'+lgID).getElementsByClassName('conference')[1];


for (var i=1; i<17; i++){

// !!! Need to modify to make global
// Pull this from the league page...
// Make sure document is the league page and we're golden.


var teamPage = location.getElementsByTagName('tr').childNodes[3].firstChild.href.split('=', 2);

if (teamPage[0] == "http://goallineblitz.com/game/league.pl?league_id") { // WORLD LEAGUE
teamPage = location.getElementsByTagName('tr').childNodes[5].firstChild.href.split('=', 2);
var teamName = location.getElementsByTagName('tr').childNodes[5].firstChild.innerHTML;
} else {
var teamName = location.getElementsByTagName('tr').childNodes[3].firstChild.innerHTML;
}
teamId[j] = teamPage[1];

document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr')[j].id = teamId[j];
document.getElementById(teamId[j]).getElementsByTagName('td')[0].innerHTML = teamName;
document.getElementById(teamId[j]).getElementsByTagName('td')[0].setAttribute('class', 'completed'+lgID);

j++;

updateProgress(lgID);
}



for(var i=0; i<32; i++)
{
document.getElementById(teamId).getElementsByTagName('td')[1].innerHTML = '';
document.getElementById(teamId).getElementsByTagName('td')[1].setAttribute('class', 'completed'+lgID);
updateProgress(lgID);
document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML = '';
document.getElementById(teamId).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);
document.getElementById(teamId).getElementsByTagName('td')[3].innerHTML = '';
document.getElementById(teamId).getElementsByTagName('td')[3].setAttribute('class', 'completed'+lgID);
updateProgress(lgID);

}

//figure out how many regular season games we need to look at


for(var i=0; i<32; i++){
getTeamPage(teamId, lgID);
getTeamEffLVLPage(teamId, lgID);
}

// remove the newDocumentTemp to save memory space
document.getElementById('newDocumentTemp'+lgID).innerHTML = "";

}

function calculateResults(lgID){


try
{
//clear the rankingInput and give the user progress feedback
document.getElementById('rankingInput'+lgID).innerHTML = "<p>Calculating Rankings<span id='working"+lgID+"'>.</span></p>";

var results = new Array();
for(i=0; i<32; i++)
{
results = new Array();
location = document.getElementById('rankingDataTable'+lgID).getElementsByTagName('tr');
results[0] = parseInt(location.id); //Team Id
location = location.getElementsByTagName('td');
results[1] = location[0].innerHTML; //Team Name
results[2] = location[1].innerHTML; //blank
results[3] = location[2].innerHTML; //Player Count (non CPU)
results[4] = location[3].innerHTML; //AVG Value (for those players)
results[5] = location[4].innerHTML; //Effective Lvl (for the team)
results[6] = location[5].innerHTML; //chemistry
results[7] = location[6].innerHTML; //cpu players

}


document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done Calculating<span id='working"+lgID+"'>.</span></p>";

}
catch (e) {
console.log(e);
}


var otherspicks = new Array();

var weekID = parseInt(document.getElementById('rankings'+lgID).parentNode.previousSibling.firstChild.innerHTML);

getOthersPicksThenUpdateSelects(results, otherspicks, lgID, weekID);
// UpdateTheDropDowns(results, lgID);



}


function getOthersPicksThenUpdateSelects(results, otherspicks, lgID, weekID) {
GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/league_survivor.pl?league_id=' + lgID + '&week='+weekID,
headers: {
'User-agent': navigator.userAgent,
'Accept': 'text/xml'
},
onload: function(response)
{

document.getElementById('rankingInput'+lgID).innerHTML = "<p>Tabulating Others' Picks <span id='working"+lgID+"'>.</span></p>";


var div = document.createElement("div");
div.innerHTML = response.responseText.replace(/<img/g,"<div").replace(/\/img/g,"/div>");

// use div to get the otherspicks

var unsorted = new Array();
var sorted = new Array();
var picks = new Array();
var table = div.getElementsByTagName("table")[1];
var rows = table.getElementsByTagName("tr");
for (var i=1; i<rows.length; i++)
{
var h = rows.children[1].innerHTML;
var team1 = h.match( /team_id=(\d+).*team_id=(\d+)/ )[1]; // team1 number

if(picks[team1] == null)
{
//first occurance of team1 winning
picks[team1] = [team1, 0];
}
// set picks to the team1 and picks # +1
picks[team1] = [team1, picks[team1][1]+1];
}

var y = 0;
for each (var p in picks)
{

if (p[1]>100)
otherspicks[y] = [p[0],"_"+p[1]];
else if (p[1]>10)
otherspicks[y] = [p[0],"__"+p[1]];
else
otherspicks[y] = [p[0],"___"+p[1]];
y++;
}


UpdateTheDropDowns(results, otherspicks, lgID);

}
});
}



//////////////////////////////
//
// UpdateTheDropDowns
//
//////////////////////////////


function UpdateTheDropDowns(results, otherspicks, lgID)
{

document.getElementById('rankingInput'+lgID).innerHTML = "<p>Generating Scores <span id='working"+lgID+"'>.</span></p>";

var location = document.getElementById('newDocumentTemp'+lgID).parentNode.nextSibling;

var select = location.getElementsByTagName("select");

try
{

for (var s=0; s<select.length; s++)
{
// found our select-really there should only be one
if (select[s].getAttribute("name") == "my_pick")
{
var sel = select[s];
var selected = sel.value;

for (var i=1; i<sel.options.length; i++)
{

// HACK, asssuming nobody have ' over ' in their team name.

// team1 is [0] team2 is [1].
var teams = sel.options.innerHTML.split(' over ');

var team1 = '';
var team2 = '';


//each team
// get the array index for the two teams
for(var f=0; f<32; f++)
{


if (results[f][1] == teams[0])
team1 = f;
if (results[f][1] == teams[1])
team2 = f;
}


// Now use magic

var expected1 = parseInt(results[team1][4]);
var expected2 = parseInt(results[team2][4]);

expdiff = expected1 - expected2;

// console.log(expdiff, expected1, expected2, results[team1], results[team2]);


var jasonvalue1;
var jasonvalue2;

if(results[team1][3] <48)
{
// then we need to discount the value
jasonvalue1 = parseInt(results[team1][4]) ;
jasonvalue1 = 0;

//* results[team1][3];
}
// value for real players
var team1_value = parseInt(results[team1][4]) * results[team1][3];
// team1_value =

/*
17 SP per level
1331
17 per level
14 for CPU


40 start

547
507
*/


/* for reference

results[1] = location[0].innerHTML; //Team Name
results[2] = location[1].innerHTML; //blank
results[3] = location[2].innerHTML; //Player Count (non CPU)
results[4] = location[3].innerHTML; //AVG Value (for those players)
results[5] = location[4].innerHTML; //Effective Lvl (for the team)
results[6] = location[5].innerHTML; //chemistry
results[7] = location[6].innerHTML; //cpu players


*/

// Old method (PF vs PA (but we're not doing this))

/*

var expected1 = results[team1][10] / results[team1][7]; // T1 avg PF
expected1 *= results[team2][11] / results[team2][7]; // T2 avg PA
expected1 /= Math.sqrt(results[team1][12] * results[team2][13]); // geometric mean of T1 OppAvgPA and T2 OppAvgPF
var expected2 = results[team2][10] / results[team2][7]; // T2 avg PF
expected2 *= results[team1][11] / results[team1][7]; // T1 avg PA
expected2 /= Math.sqrt(results[team2][12] * results[team1][13]); // geometric mean of T2 OppAvgPA and T1 OppAvgPF

if (expected1 > 255)
expected1 = 255;
if (expected2 > 255)
expected2 = 255;

*/

// pick a winner and loser
var outcometext = 'z_LOSS ';
if (expdiff > 0)
outcometext = 'WIN ';

//find team in other picks list
// this could be optimized.

document.getElementById('rankingInput'+lgID).innerHTML = "<p>Updating Select <span id='working"+lgID+"'>.</span></p>";


for(var q=0; q<otherspicks.length; q++)
{
// if others have picked the current team
if(otherspicks[q][0] == results[team1][0])
outcometext = otherspicks[q][1] + " " + outcometext;
}
// now change the select item
sel.options.innerHTML = outcometext + expdiff + " " + teams[0] + "("+results[team1][5]+") " + "("+results[team1][3]+"*"+ results[team1][6] +"%) " +expected1 +" - " + expected2 + "("+results[team2][5]+") " + "("+results[team2][3]+"*"+ results[team2][6] +"%) "+ teams[1];


}

// alphabetize it

for (var i=1; i<sel.options.length-1; i++) {
for (var j=i+1; j<sel.options.length; j++) {
var isSelected1 = (sel.options.innerHTML).indexOf("_") == 0;
var isSelected2 = (sel.options[j].innerHTML).indexOf("_") == 0;
if (isSelected1 && isSelected2)
{
var firstval = (sel.options.innerHTML).match(/_+(\d+).*/)[1];
var secondval = (sel.options[j].innerHTML).match(/_+(\d+).*/)[1];



if(parseInt(firstval) < parseInt(secondval))
{
var temp = sel.options.innerHTML;
sel.options.innerHTML = sel.options[j].innerHTML;
sel.options[j].innerHTML = temp;

var temp = sel.options.value;
sel.options.value = sel.options[j].value;
sel.options[j].value = temp;



}
}
else if(((sel.options.innerHTML).substring(0,3) == "WIN") && ((sel.options[j].innerHTML).substring(0,3) == "WIN"))
{
// Both wins, so sort
var firstval = (sel.options.innerHTML).match(/WIN (\d+).*/)[1];
var secondval = (sel.options[j].innerHTML).match(/WIN (\d+).*/)[1];



if(parseInt(firstval) < parseInt(secondval))
{
var temp = sel.options.innerHTML;
sel.options.innerHTML = sel.options[j].innerHTML;
sel.options[j].innerHTML = temp;

var temp = sel.options.value;
sel.options.value = sel.options[j].value;
sel.options[j].value = temp;



}



}
else if ((sel.options.innerHTML).toLowerCase() > (sel.options[j].innerHTML).toLowerCase())
{

// else alphabetical

var temp = sel.options.innerHTML;
sel.options.innerHTML = sel.options[j].innerHTML;
sel.options[j].innerHTML = temp;

var temp = sel.options.value;
sel.options.value = sel.options[j].value;
sel.options[j].value = temp;
}

if (sel.options.value == selected) {
sel.selectedIndex = i;
}
}
}



}
}

document.getElementById('rankingInput'+lgID).innerHTML = "<p>Done<span id='working"+lgID+"'>.</span></p>";

}
catch (e) {
console.log(e);
}

}



function updateProgress(lgID){
// updateIcon();
working = document.getElementById('working'+lgID);
switch(working.innerHTML){
case '.': working.innerHTML = '..'; break;
case '..': working.innerHTML = '...'; break;
case '...': working.innerHTML = '....'; break;
case '....': working.innerHTML = '.....'; break;
case '.....': working.innerHTML = '......'; break;
case '......': working.innerHTML = '.......'; break;
case '.......': working.innerHTML = '........'; break;
case '........': working.innerHTML = '.........'; break;
default : working.innerHTML = '.'; break;
}

var progress = document.getElementsByClassName('completed'+lgID);

var denom = 224;
// 32 for every field
document.getElementById('progress'+lgID).innerHTML = 'Getting Rankings: ' + parseInt((progress.length/denom)*100) + '%';
if(progress.length == denom){

calculateResults(lgID); // call when done pulling the data.
}
}



function getTeamPage(teamId, lgID){
GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/team.pl?team_id=' + teamId,
headers: {
'User-agent': navigator.userAgent,
'Accept': 'text/xml'
},
onload: function(response)
{


var chemistry = response.responseText.split("Team Chemistry")[1];
chemistry = parseInt(chemistry.split("rating_bar_fill rating_bar_fill")[1].split("<\/div")[0].split("\">")[1]);


//write the gameCount to the table
document.getElementById(teamId).getElementsByTagName('td')[5].innerHTML = chemistry;
document.getElementById(teamId).getElementsByTagName('td')[5].setAttribute('class', 'completed'+lgID);
updateProgress(lgID);
}
});
}




function getTeamEffLVLPage(teamId, lgID){
GM_xmlhttpRequest({
method: 'GET',
url: 'http://goallineblitz.com/game/roster.pl?team_id=' + teamId,
headers: {
'User-agent': navigator.userAgent,
'Accept': 'text/xml'
},
onload: function(response)
{

var tempdiv = document.createElement("div");
tempdiv.innerHTML = response.responseText.split('<div id="content_contracts')[0].replace(/<img/g,"<div").replace(/\/img/g,"/div>");

var numPlayers = tempdiv.getElementsByClassName("player_name").length;
var cpuPlayers = tempdiv.getElementsByClassName("cpu").length;
numPlayers -= cpuPlayers;

tempdiv.innerHTML = "";

var efflvl = response.responseText.split("Avg Player Value")[1];
var avgval = parseInt(efflvl.split("(Effective Lv")[0].split("\">")[1]);

efflvl = parseInt(efflvl.split("(Effective Lv ")[1].split(")<")[0]);

var playercount = response.responseText.split("Total Player Count")[1];
playercount = parseInt(playercount.split("(Avg Lv")[0].split("\">")[1]);

// document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML = playercount;
// document.getElementById(teamId).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);


document.getElementById(teamId).getElementsByTagName('td')[3].innerHTML = avgval;
document.getElementById(teamId).getElementsByTagName('td')[3].setAttribute('class', 'completed'+lgID);

document.getElementById(teamId).getElementsByTagName('td')[4].innerHTML = efflvl;
document.getElementById(teamId).getElementsByTagName('td')[4].setAttribute('class', 'completed'+lgID);

document.getElementById(teamId).getElementsByTagName('td')[2].innerHTML = numPlayers;
document.getElementById(teamId).getElementsByTagName('td')[2].setAttribute('class', 'completed'+lgID);

document.getElementById(teamId).getElementsByTagName('td')[6].innerHTML = cpuPlayers;
document.getElementById(teamId).getElementsByTagName('td')[6].setAttribute('class', 'completed'+lgID);


updateProgress(lgID);
}
});
}