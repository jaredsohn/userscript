// ==UserScript==
// @name           Player Build Summary
// @namespace      pbr
// @description    Show total points in attributes and special abilities.
// @include        http://test.goallineblitz.com/game/player.pl?player_id=*
// @version        09.01.31
// ==/UserScript==

/*
 * 
 * pabst did this 08.07.10+
 * attribute cost contributed by PackMan97
 * 
 */

var attributes = [0,0];
var abilities = [0,0];
var skillpoints = [0,0];
var tables = [];

function getAbilitiesCost(level,min) {
    var cost = 0;
    for (var i=0; i<level; i++) {
    	cost += min + (Math.round((i-1)/2.0));
    }
    return cost;
}

function getSkillsCost(score) {
    var cost = 0;
    for (var i=score; i>0; i--) {
		if (i < 1) {
			cost += i;
		} 
		else { 
			cost += parseInt(Math.exp(.0003 * Math.pow(i - 1, 2)));
		}
    }
    return cost;
}

tables = document.getElementsByClassName("player_stats_table");
if (tables.length != 0) {
    var att = tables[0].getElementsByClassName("stat_container");
    var abi = document.getElementsByClassName("skill_button");

    for (var s=0; s<att.length; s+=2) {
        var children = att[s].childNodes.length;
        var ps = parseFloat(att[s].childNodes[children-1].innerHTML);
        var fs = parseFloat(att[s+1].childNodes[children-1].innerHTML);

        attributes[0] += ps;
        attributes[1] += fs;
        skillpoints[0] += getSkillsCost(ps);
        skillpoints[1] += getSkillsCost(fs);
    }

    for (var s=0; s<abi.length; s++) {
        if (abi[s].parentNode.id != "skill_trees_content") continue;
        abilities[0] += parseFloat(abi[s].firstChild.innerHTML);
        if ((s+1)%5 != 0) {
            abilities[1] += getAbilitiesCost(parseFloat(abi[s].firstChild.innerHTML),1);
        }
        else {
            abilities[1] += getAbilitiesCost(parseFloat(abi[s].firstChild.innerHTML),2);
        }
    }

    var attributesHeading = document.getElementsByClassName("medium_head");
    for each (var mh in attributesHeading) {
        if (mh.innerHTML.indexOf("Player Attributes") != -1) {
            var h = document.createElement("div");
            h.setAttribute("class","medium_head");
            h.innerHTML = "Physical Attributes";
            h.innerHTML += " ("+attributes[0].toFixed(1);
            if (attributes[0].toFixed(1) != skillpoints[0].toFixed(1)) {
                h.innerHTML += "/"+skillpoints[0].toFixed(1);
            }
            h.innerHTML += ")";

            h.innerHTML += "<br>Football Skills";
            h.innerHTML += " ("+attributes[1].toFixed(1);
            if (attributes[1].toFixed(1) != skillpoints[1].toFixed(1)) {
                h.innerHTML += "/"+skillpoints[1].toFixed(1);
            }
            h.innerHTML += ")";

            h.innerHTML += "<br>Total";
            h.innerHTML += " ("+(attributes[0]+attributes[1]).toFixed(1);
            if ((attributes[0]+attributes[1]).toFixed(1) != (skillpoints[0]+skillpoints[1]).toFixed(1)) {
                h.innerHTML += "/"+(skillpoints[0]+skillpoints[1]).toFixed(1);
            }
            h.innerHTML += ")";
            mh.parentNode.insertBefore(h,mh.nextSibling);
            break;
        }
    }

    var vetArr = document.getElementsByClassName("skill_level");
    var vetSkills = 0;
    for (var i=0; i<vetArr.length; i++) {
        if (vetArr[i].parentNode.parentNode.id == "vet_skills_content") {
            vetSkills += parseInt(vetArr[i].innerHTML);
        }
    }

    for each (var h in attributesHeading) {
        var idx = h.innerHTML.indexOf("Special Abilities");
        if (idx != -1) {
            var s = h.innerHTML.slice(0,idx) + "Special Abilities";
            s += " ("+abilities[0]+"/" +abilities[1]+")";
            s += h.innerHTML.slice(idx+"Special Abilities".length);
            h.innerHTML = s;
        }

        idx = h.innerHTML.indexOf("Veteran Abilities");
        if (idx != -1) {
            var s = h.innerHTML.slice(0,idx) + "Veteran Abilities";
            s += " ("+vetSkills+")";
            s += h.innerHTML.slice(idx+"Veteran Abilities".length);
            h.innerHTML = s;
        }
    }
}