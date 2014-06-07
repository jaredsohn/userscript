// ==UserScript==
// @name           Player Value On Skill Point Page
// @namespace      pbr/pvsp
// @include        http://goallineblitz.com/game/skill_points.pl?player_id=*
// @include        http://glb.warriorgeneral.com/game/skill_points.pl?player_id=*
// @copyright      2011, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        14.02.25
// ==/UserScript==

window.setTimeout( 
    function() {
	var att = document.getElementById("attribute_list");
	    att.getElementsByClassName("medium_head")[0].addEventListener("click",main,true);

        main();
    }
, 100);

function getAbilitiesCost(level,min) {
    var cost = 0;
    for (var i=0; i<level; i++) {
    	cost += min + (Math.round((i-1)/2.0));
    }
	//console.log(level+" : "+min+" = "+cost);
    return cost;
}

function getSkillsCost(score) {
	var caps = [0,48.06,60.51,67.97,73.24,77.28,80.53,83.25,85.58,87.60,89.40,
				91.01,92.46,93.79,95.00,96.13,97.18,98.15,99.06,99.92,100.73,
				101.50,102.23,102.92,103.58,104.21,104.81,105.39,105.94,106.47,106.98];

	var cost = 0;
	var cap = 1;
	for (var cap=1; cap<caps.length; cap++) {
		if (score < caps[cap]) {
			cost += (score - caps[cap-1]) * cap;
//console.log(score+"-----> "+cost);
			break;
		}
		else {
			cost += (caps[cap] - caps[cap-1]) * cap;
//console.log(score+"=====> "+cost);
		}
	}

	var cost2 = 0;
	var cap = 1;
	for (var s=0; s<score; s++) {
//	console.log(score+": bycaps="+cost+" ? bypoints="+cost2);
		if (s > caps[cap]) cap++;
		if ((score - s) >= 1) {
			cost2 += cap;
		}
		else {
			cost2 += (score-s)*cap;
			break;
		}
	}
	console.log(score+": bycaps="+cost+" ? bypoints="+cost2);
    return cost2;
}

function main() {
	var costA = 0;
	var stats = document.getElementsByClassName("attribute_value");
	for (var i=0; i<stats.length; i++) {
		costA +=getSkillsCost(stats[i].innerHTML);
	}

	var costS = 0;
	var skills = document.getElementsByClassName("skill_level");
	for (var i=0; i<skills.length; i++) {
		var v = 1;
		if ((i+1)%5 == 0) v++;
		costS += getAbilitiesCost(skills[i].innerHTML, v);
	}

	var costSP = parseFloat(document.getElementById("skill_points").innerHTML);

	var att = document.getElementById("attribute_list");
	var cost = costA.toFixed(2) + " + " + costS.toFixed(2) + " + " + costSP.toFixed(2) + " = " + (costA+costS+costSP).toFixed(2);
	att.getElementsByClassName("medium_head")[0].innerHTML = "Attributes : "+cost;
	console.log(cost);
}

