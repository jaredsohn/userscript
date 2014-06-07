// ==UserScript==
// @name        Holy War
// @namespace   http://userscripts.org/users/219959
// @description Skips those with attributes that are too high/low and automatically attacks those with skills that aren't, auto plunders, and auto works.
// @include     http://holy-war.net/*
// @version     1
// @grant       none
// @source      none
// ==/UserScript==
//-------------

var types=[
level_min=12,      //to determine experience gained
haul_min=10,       //do they ever play? if not, probably no gold.
strength_max=30,   //are they too strong?
attack_max=27,
agility_max=30,
stamina_max=27,
defence_max=30,
ratio_min=0.5      //if they lose constantly, they probably have no gold.
];
use_totals=false;  //if this is in effect the other stats are disregarded - adds all stats
my_total=141;	   //total of all your basic stats, not including horse stats, equipment, or house.
auto_attack=false; //automatically attacks if opponent fits stat standards.
auto_plunder=false;//plunder automatically for 60 minutes
auto_work=true;   //work after plunder time=0. good at night.
/*
NOTE: Beware of contradictions. If you have auto attack on, the script is designed to ignore
auto work and vice versa (you can't attack/work at the same time).
*/

//-------------

additive='</td><td style="width:40%; text-align:left;">';
var strings = [
level_str='Level',
haul_str='Gold haul',
strength_str='Strength',
attack_str='Attack',
agility_str='Agility',
stamina_str='Stamina',
defence_str='Defence',
ratio_str='Victories/defeats'
];

function check(string,type,limit) {
	string+=additive;
	if (document.body.innerHTML.indexOf(string) != -1) {
		var opp_stat=document.body.innerHTML.substring(document.body.innerHTML.indexOf(string)+string.length-2,document.body.innerHTML.indexOf(string)+string.length+8)
		opp_stat=Number(opp_stat.replace(/[^0-9.]/g,""))
		if (limit == "max") {
			if (opp_stat > type) {
				return true;
			}
		}
		else {
			if (opp_stat < type) {
				return true;
			}
			else {
			return false;
			}
		}
	}
}

var opp_total = 0; //opponents summed stats
for (var j=2; j<=6; j++) { //2-6 only b/c these are the stats
	opp_total+=types[j];
}

for (var i=0; i<strings.length; i++) { //0,1,7 are all the mins (level, ratio, haul)
	defeatable = true; //if check returns true then you can't defeat opponent or opponent is too weak
if (use_totals != true) {	
	if (i == 0 || i == 1 || i == 7) {
		if (check(strings[i],types[i],"min") == true) {
			defeatable = false;
		}
	}
	else {
		if (check(strings[i],types[i],"max") == true) {
			defeatable = false;
		}
	}
}
else {
	if (opp_total > my_total) {
		defeatable = false
	}
}
//
if (defeatable == true && auto_attack == true) {
	getElementsByName("Attack")[0].click(); //attack if defeatable
}
else {
	if (defeatable != true) {
		document.getElementsByTagName("button")[0].click(); //new opponent
	}
}
//
}

var time_left = document.getElementsByName("ravageTime")[0];

if (document.body.innerHTML.indexOf("Gold plundered: ") != -1 || document.body.innerHTML.indexOf("Summarised fight report") != -1) {
	window.location.href = "http://holy-war.net/assault/1on1/?w=4IN"; //reset and plunder again if finished
}
if (time_left && auto_plunder == true && document.getElementsByName("PLUNDER_ACTION")[0] && time_left.options[0].value == "10") {
	document.getElementsByName("PLUNDER_ACTION")[0].click(); //click plunder if time is greater than 0
}
if (time_left && time_left.options[0].value != "10" && auto_work == true && auto_attack == false) {
	window.location.href = "http://holy-war.net/town/farm/?w=4IN"; 
}
if (window.location.href.indexOf("town/farm") != -1 && document.body.getElementsByTagName("select")[0] && auto_work == true) {
	document.body.getElementsByTagName("select")[0].value = "8" //8 hours for auto work after plunder
	document.body.getElementsByTagName("button")[0].click();
}