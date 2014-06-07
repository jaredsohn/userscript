// ==UserScript==
// @name           Player Build Summary (Skill Point Version)
// @namespace      pbr
// @description    Show total skill points in attributes and special abilities as well as the total value of the player build. Created by pabst, modified by PackMan97, then by Deathblade.
// @include        http://goallineblitz.com/game/player.pl?player_id=*
// @include        http://test.goallineblitz.com/game/player.pl?player_id=*
// @version        08.08.13
// ==/UserScript==

var attributes = 0;
var attributes = [0, 0];
var skillpoints = [0, 0];
var abilities = [0, 0];
var tables = [];
var totalpoints = 0;

function findNamePlayer(test) {
    if (test.innerHTML.indexOf('Player Attributes | ', 0)>=0) return 1;
  return 0;
}

function findNameSA(test) {
    if (test.innerHTML.indexOf('Veteran Abilities', 0)>=0) return 1;
  return 0;
}

function getElementsByClassName(classname, par)
{
	var a=[];   
	var re = new RegExp('\\b' + classname + '\\b');
	var els = par.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++) 
	{       
		if(re.test(els[i].className)) 
		{	
			a.push(els[i]);
		}
	}
	return a;
};

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
	cost = cost + min + (Math.round((i-1)/2.0));
    }
    return cost;
}

function getSkillsCost(score) {
    var cost = 0;
    for (var i=score; i>0; i--) {
	if ( i < 1 ) {
		cost = cost + i;
	} else { 
		cost = cost + parseInt(Math.exp(.0003 * Math.pow(i - 1, 2)));
	}
    }
    return cost;
}

tables = getElementsByClassName("player_stats_table", document);
if (tables.length == 0) return;

var att = getElementsByClassName("stat_head_tall", tables[0]);

var skill_box = document.getElementById('player_skill_trees', document)
var abi = getElementsByClassName("skill_button", skill_box);

for (var i=0; i<att.length; i++) {
    skillpoints[0] = skillpoints[0] + getSkillsCost(parseFloat(att[i].nextSibling.innerHTML));
    attributes[0] = attributes[0] + parseFloat(att[i].nextSibling.innerHTML);
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

var attributesHeading = getElementsByClassName("medium_head", document);

for (var i = 0; i < attributesHeading.length; i++) {
    if (findNamePlayer(attributesHeading[i])){
	attributesHeading[i].innerHTML = 'Player Attributes'
	attributesHeading[i].innerHTML =  attributesHeading[i].innerHTML + " (" +floatString(attributes[0],1)+")"
	attributesHeading[i].innerHTML = attributesHeading[i].innerHTML + "<br>Skill Points ("+floatString(skillpoints[0],1)+")";
	attributesHeading[i].innerHTML = attributesHeading[i].innerHTML + "<br>Total Points ("+floatString(totalpoints,1)+")";
    }
}

for (var i = 0; i < attributesHeading.length; i++) {
    if (findNameSA(attributesHeading[i])){
	attributesHeading[i].innerHTML = attributesHeading[i].innerHTML + " ("+abilities[0]+"/" +abilities[1]+")";
    }
}