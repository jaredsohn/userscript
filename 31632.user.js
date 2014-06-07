// ==UserScript==
// @name           Player Build Summary (Skill Point Version)
// @namespace      pbr
// @description    Show total skill points in attributes and special abilities as well as the total value of the player build. Created by pabst, modified by PackMan97
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @version        08.08.13
// ==/UserScript==

var attributes = 0;
var attributes = [0,0];
var skillpoints = [0,0];
var abilities = [0,0];
var tables = [];
var totalpoints = 0;

function floatString(f,dec) {
    var r = f + "";
    if (r.indexOf(".") != -1) {
	r = r.slice(0,r.indexOf(".")+1+dec);
    }
    else {
	r += ".0";
    }
    return r;
}

function getAbilitiesCost(level,min) {
    var cost = 0;
    if (level == 0) return cost;
    for (var i=0; i<level; i++) {
	cost += min + (Math.round((i-1)/2.0));
    }
    return cost;
}

function getSkillsCost(score) {
    var cost = 0;
    for (var i=score; i>0; i--) {
	if ( i < 1 ) {
		cost += i;
	} else { 
		cost += parseInt(Math.exp(.0003 * Math.pow(i - 1, 2)));
	}
    }
    return cost;
}

tables = document.getElementsByClassName("player_stats_table");
if (tables.length == 0) return;

var att = tables[0].getElementsByClassName("stat_head");

var abi = document.getElementsByClassName("skill_button");

for (var s=0; s<att.length; s+=2) {
    skillpoints[0] += getSkillsCost(parseFloat(att[s].nextSibling.nextSibling.innerHTML));
    skillpoints[1] += getSkillsCost(parseFloat(att[s+1].nextSibling.nextSibling.innerHTML));
    attributes[0] += parseFloat(att[s].nextSibling.nextSibling.innerHTML);
    attributes[1] += parseFloat(att[s+1].nextSibling.nextSibling.innerHTML);
}
for (var s=0; s<abi.length; s++) {
    abilities[0] += parseFloat(abi[s].firstChild.innerHTML);
    if ((s+1)%5 != 0) {
	abilities[1] += getAbilitiesCost(parseFloat(abi[s].firstChild.innerHTML),1);
    }
    else {
	abilities[1] += getAbilitiesCost(parseFloat(abi[s].firstChild.innerHTML),2);
    }
}

totalpoints = skillpoints[0] + skillpoints[1] + abilities[1];

var attributesHeading = document.getElementsByClassName("medium_head");

for each (var h in attributesHeading) {
    if (h.innerHTML == "Player Attributes") {
	h.innerHTML += " ("+floatString(attributes[0],1)+
               	       "/" +floatString(attributes[1],1)+")"
	h.innerHTML += "<br>Skill Points ("+floatString(skillpoints[0],1)+
               	       "/" +floatString(skillpoints[1],1)+")";
	h.innerHTML += "<br>Total Points ("+floatString(totalpoints,1)+")";
	break;
    }
}

for each (var h in attributesHeading) {
    if (h.innerHTML == "Special Abilities") {
	h.innerHTML += " ("+abilities[0]+"/" +abilities[1]+")";
	break;
    }
}
