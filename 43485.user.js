// ==UserScript==
// @name          bs_players_skillsums
// @namespace      nick: arunger, lafa
// @description    This script adds numeric denominations next to player's skills and skill sums for each position, plus total skill sum.
// @include        http://www.basketsim.com/*
// ==/UserScript==

/*
none = "none(0)";
pathetic="pathetic(1)";
terrible="terrible(2)";
poor="poor(3)";
below_average="below average(4)";
average="average(5)";
above_average="above average(6)";
good="good(7)";
very_good="very good(8)";
great="great(9)";
extremely_great="extremely great(10)"; 
fantastic="fantastic(11)";
amazing="amazing(12)";
extra_ordinary="extra-ordinary(13)";
magical="magical(14)";
perfect="perfect(15)"; 
*/
var skills = [
"none",
"pathetic",
"terrible",
"poor",
"below average",
"average",
"above average",
"good",
"very good",
"great",
"extremely great",
"fantastic",
"amazing",
"extra-ordinary",
"magical",
"perfect"
];

var elem = new Array();

init();


function init(){

if(isPlayersPage()){
	writeSkillNumber();
}

}

function isPlayersPage()
{
	var players_url_mask = "player.php?playerid";

	var href_ = location.href;
	if (href_.indexOf(players_url_mask) > -1) {
		return true;
	}
	return false;
}

function writeSkillNumber(){

elem=getElementByClass("greenhilite");
createTable();

for (i=0; i<elem.length; i++) { 
	for (x=0; x<skills.length; x++) { 
		if(elem[i].innerHTML==skills[x]){
			elem[i].innerHTML=elem[i].innerHTML+" ("+x+")";
			break;
		}
	} 
 }


}

function getElementByClass(clazz) { 
 
 var allPageTags=document.getElementsByTagName("a"); 
 var elem_ = new Array();
 var x=0;
 
 
 for (i=0; i<allPageTags.length; i++) { 
 
 if (allPageTags[i].className==clazz) { 
 elem_[x]=allPageTags[i];
 x++;
 } 
 }
 
	return elem_;
 
}

function getIndex(skl){
for (i=0; i<skills.length; i++) {
 
if(skl==skills[i]){
	return i;
}
}
return -1;

}

function createTable(){

var pg = parseInt(getIndex(elem[1].innerHTML))+parseInt(getIndex(elem[3].innerHTML))+parseInt(getIndex(elem[9].innerHTML))+parseInt(getIndex(elem[2].innerHTML));
var sg = parseInt(getIndex(elem[7].innerHTML))+parseInt(getIndex(elem[4].innerHTML))+parseInt(getIndex(elem[9].innerHTML))+parseInt(getIndex(elem[2].innerHTML));
var sf = parseInt(getIndex(elem[7].innerHTML))+parseInt(getIndex(elem[5].innerHTML))+parseInt(getIndex(elem[3].innerHTML))+parseInt(getIndex(elem[9].innerHTML));
var pf = parseInt(getIndex(elem[5].innerHTML))+parseInt(getIndex(elem[6].innerHTML))+parseInt(getIndex(elem[3].innerHTML))+parseInt(getIndex(elem[9].innerHTML));
var c = parseInt(getIndex(elem[6].innerHTML))+parseInt(getIndex(elem[5].innerHTML))+parseInt(getIndex(elem[2].innerHTML))+parseInt(getIndex(elem[9].innerHTML));
var tot = parseInt(getIndex(elem[1].innerHTML))+parseInt(getIndex(elem[2].innerHTML))+parseInt(getIndex(elem[3].innerHTML))+parseInt(getIndex(elem[4].innerHTML))+parseInt(getIndex(elem[5].innerHTML))+parseInt(getIndex(elem[6].innerHTML))+parseInt(getIndex(elem[7].innerHTML))+parseInt(getIndex(elem[8].innerHTML))+parseInt(getIndex(elem[9].innerHTML));

var possitions = "PG: "+pg+"; SG: "+sg+"; SF: "+sf+"; PF: "+pf+"; C: "+c+"; \u03A3: "+tot;


var table = document.getElementsByTagName("table")[5];

var row = document.createElement("TR");
var td1 = document.createElement("TD");
td1.style.paddingTop = "1em";

td1.setAttribute('colspan', '2');

var bold1 = document.createElement("B");
bold1.appendChild(document.createTextNode('PG: '));
var bold2 = document.createElement("B");
bold2.appendChild(document.createTextNode(' SG: '));
var bold3 = document.createElement("B");
bold3.appendChild(document.createTextNode(' SF: '));
var bold4 = document.createElement("B");
bold4.appendChild(document.createTextNode(' PF: '));
var bold5 = document.createElement("B");
bold5.appendChild(document.createTextNode(' C: '));
var bold6 = document.createElement("B");
bold6.appendChild(document.createTextNode(' \u03A3: '));

td1.appendChild(bold1);
td1.appendChild(document.createTextNode(pg));
td1.appendChild(bold2);
td1.appendChild(document.createTextNode(sg));
td1.appendChild(bold3);
td1.appendChild(document.createTextNode(sf));
td1.appendChild(bold4);
td1.appendChild(document.createTextNode(pf));
td1.appendChild(bold5);
td1.appendChild(document.createTextNode(c));
td1.appendChild(bold6);
td1.appendChild(document.createTextNode(tot));

row.appendChild(td1);
row.style.color = 'FireBrick';
row.style.fontSize = '14px';
row.style.backgroundColor = 'White';
table.appendChild(row);

}
 

