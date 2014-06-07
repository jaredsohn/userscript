// ==UserScript==
// @name           Skill Checker
// @namespace      http://caigawalker.plus.com/
// @description    Version 3.5.1 - Replaces your skill list with a pretty table.
// @include        *127.0.0.1:*/main.php
// @include        *127.0.0.1:*/charsheet.php
// @include        *127.0.0.1:*/showplayer.php*
// @include        *127.0.0.1:*/account.php
// @include        *kingdomofloathing.com/main.php
// @include        *kingdomofloathing.com/charsheet.php
// @include        *kingdomofloathing.com/showplayer.php*
// @include        *kingdomofloathing.com/account.php
// ==/UserScript==

// The latest version should be available from http://mobius-bandits.dnsalias.org/~jik/scripts/skill_checker.user.js

// Change history
// 1.0 - Original release
// 1.1 - Should now work with Lupychica's Skill Coolerator
// 1.2 - Works on other player's profiles.
// 1.2.1 - Quick fix to work with new charsheet skill presentation.
// 1.3 - Added the Slime Tube skills. More robust handling of charsheets.
// 1.4 - Added permalink for Slime Tube skills, Donho's, and Salacious.
//
// 2.0 - Show unavailable permed skills which have been bought in-run with permanence-specific border and yellow background.
// 2.1 - Added Summon Sugar Sheets.
// 2.2 - Added combat trivials to list of permable skills.
// 2.3 - Should now work in Chrome.
// 2.4 - Added permalink for combat trivials and updated to point to new host.
// 2.5 - Added the Crimbo skills.
//
// 3.0 - Automagical updates for newly released skills and semi-automatic updates for the script itself.
// 3.0.1 - Should work in earlier versions of Firefox now.
// 3.0.2 - Fixed counts for broken profiles that show the same skill as (P) and again as (HP).
// 3.1 - Added a key to the bottom of the chart.
// 3.2 - Added account menu options.
// 3.3 - The key is now optional.
// 3.4 - The key now shows only things that can appear on the chart.
// 3.5 - Added compact mode, wiki links mode, suppressed descriptions for skills that don't have any.
// 3.5.1 - Add mouseover text for compact mode

var data_url_list = ["http://mobius-bandits.dnsalias.org/~jik/scripts/skill_checker_data.json"];
var script_version = "3.5.1";

var have_skills = [];
var skills;
var softcore_sums = [];
var softcore_total = 0;
var hardcore_sums = [];
var hardcore_total = 0;
var total_sums = [];
var total_total = 0;

var unknowns = [];
var str;
var hardcore;
var magical_skills;    

function version_compare(a, b) {
    a_split = a.split(".");
    b_split = b.split(".");
    var comp_max = a_split.length > b_split.length ? b_split.length : a_split.length;
    for(var i = 0; i < comp_max; i++) {
        var lhs = parseInt(a_split[i]);
        var rhs = parseInt(b_split[i]);
        if(lhs > rhs) {
            return 1;
        } else if(lhs < rhs) {
            return -1;
        }
    }
    if(a_split.length > comp_max) {
        return 1;
    } else if(b_split.length > comp_max) {
        return -1;
    } else {
        return 0;
    }
}

function show_message(color, message) {
    var warning_table = document.createElement("center");
    warning_table.innerHTML = "<table width=95% cellspacing=0 cellpadding=0><tr><td style='color: white;' align=center bgcolor=" + color + "><b><a class='nounder' href='showplayer.php?who=1044239' style='color: white'>JiK4eva</a>'s Skill Checker</b></td></tr><tr><td style='padding: 5px; border: 1px solid " + color + ";'>" + message + "</td></tr><tr><td height=4></td></tr></table>";
    var page_body = document.getElementsByTagName("body")[0];
    page_body.insertBefore(warning_table, page_body.firstChild);
}

function update_data(url_list, callback) {
    var data_url = url_list[0];
    var data_modified_date = GM_getValue("data_modified_date", "");
    var request_headers = { "User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "application/json" };
    if(data_modified_date) {
        request_headers["If-Modified-Since"] = data_modified_date;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: data_url,
        headers: request_headers,
        onload: function(resp) {
            if(resp.status == 200) {
                var match = /^Last-Modified:\s+(.*)/im.exec(resp.responseHeaders);
                if(match) {
                    GM_setValue("data_modified_date", match[1]);
                } else {
                    GM_log("The remote server returned no Last-Modified so our caching mechanism is broken, but the script should still work.");
                }
                GM_setValue("json_data", resp.responseText);
            } else if(resp.status == 304) {
                // Our cached data is still fresh. Yay!
            } else {
                GM_log(data_url + " failed, trying next URL");
                // Failover to the next data URL.
                url_list.shift();
                if(url_list.length > 0) {
                    update_data(url_list, callback);
                    return;
                } else {
                    show_message("red", "The script was unable to update the layout data needed to create a skill table, so it is possible that new skills will not appear in a sensible place. The script attempts to get this data when you load main.php, so reloading this page may fix it. This is probably caused by a remote server failure.");
                }
            }
            var json_data = GM_getValue("json_data", "");
            if(json_data == "") {
                show_message("red", "The script was unable to obtain the layout data needed to create a skill table, so it will not work. The script attempts to get this data when you load main.php, so reloading this page may fix it. This is probably caused by a remote server failure.");
                return;
            } else {
                var parsed_data;
                if(typeof(JSON) != "undefined" && typeof(JSON.parse) != "undefined") {
                    parsed_data = JSON.parse(json_data);
                } else {
                    // Oh noes! We're going to have to use eval()...
                    parsed_data = eval("(" + json_data + ")");
                }
                var available_version = parsed_data.version;
                if(version_compare(script_version, available_version) == -1) {
                    show_message("orange", "A new version of Skill Checker is available. Click <a target='_blank' href='" + parsed_data.url + "'>here</a> to download it.");
                }
		if(callback) {
		    callback();
		}
            }
        }
    });
}

function skill_cell(skillid) {
    if(skillid == 0) {
	return "<td></td>";
    }
    var index;
    if(GM_getValue("compact", "false") == "true") {
	index = 2;
    } else {
	index = 0;
    }
    var extra = "";
    if(index == 2) {
        extra = ' title="' + skills[skillid][0] + '"';
    }
    if(GM_getValue("wiki_links", "false") == "true") {
	// If the user has requested wiki links, which always exist, then use that.
	return "<td" + extra + " valign=middle style=" + choose_style([skillid]) + "><a class='nounder' target='_blank' href='http://kol.coldfront.net/thekolwiki/index.php/" + skills[skillid][3] + "'><font size=1>" + skills[skillid][index] + "</font></a></td>";
    } else if(skillid < 7000) {
	// Otherwise, we use the game's skill descriptions, but only for real skills (i.e. not skill books, which have pseudoids over 7000).
	if(window.location.pathname == "/charsheet.php") {
	    return "<td" + extra + " valign=middle style=" + choose_style([skillid]) + "><a onClick='javascript:poop(\"desc_skill.php?whichskill=" + skillid + "&self=true\", \"skill\", 350, 300)'><font size=1>" + skills[skillid][index] + "</font></a></td>";
	} else {
	    return "<td" + extra + " valign=middle style=" + choose_style([skillid]) + "><a onClick=\"javascript:skill(" + skillid + ")\"><font size=1>" + skills[skillid][index] + "</font></a></td>";
	}
    } else {
	return "<td" + extra + " valign=middle style=" + choose_style([skillid]) + "><font size=1>" + skills[skillid][index] + "</font></td>";
    }
}

function text_cell(text, style) {
    if(typeof(style) == "undefined") {
	style = "";
    } else {
	style = " style=" + style;
    }
    return "<td valign=middle" + style + "><font size=1>" + text + "</font></td";
}

function wiki_cell(text, wiki_page, style) {
    if(typeof(style) == "undefined") {
	style = "";
    } else {
	style = " style=" + style;
    }
    return "<td valign=middle" + style + "><a href=\"http://kol.coldfront.net/thekolwiki/index.php/" + wiki_page + "\" target=\"_blank\"><font size=1>" + text + "</font></a></td>";
}

function row_break() {
    return "</tr><tr>";
}

function lookup_style(permanence) {
    var background_color;
    var border_color;
    if(hardcore) {
	background_color = ["", "#FFFF99", "", "#FFFF99", "", "#FF9999"][permanence];
    } else {
	background_color = ["", "#FFFF99", "", "#99FF99", "", "#FF9999"][permanence];
    }
    if(background_color != "") {
	background_color = "background-color: " + background_color + "; ";
    }
    border_color = ["#FFFFFF", "#FFFF99", "#99FF99", "#99FF99", "#FF9999", "#FF9999"][permanence];
    return "\"" + background_color + "border: 3px solid " + border_color + ";\"";
}

function choose_style(skillset, maximum, threshold) {
    if(typeof(skillset) == "number") {
	skillset = [skillset];
    }
    var permanence;
    if(typeof(maximum) == "undefined") {
	permanence = 4;
    } else {
	permanence = maximum;
    }
    for(var i=0; i<skillset.length; i++) {
	var this_perm = have_skills[skillset[i]];
	if(typeof(this_perm) == "undefined") {
	    permanence = -1;
	    break;
	} else if(this_perm < permanence) {
	    permanence = this_perm;
	}
    }
    if(typeof(threshold) != "undefined" && permanence < threshold) {
	permanence = -1;
    }
    permanence = parseInt(permanence);
    permanence += 1;
    return lookup_style(permanence);
}

function hardcores(skillset) {
    var permed = 0;
    for(var i=0; i<skillset.length; i++) {
	var this_perm = have_skills[skillset[i]];
	if(typeof(this_perm) != "undefined" && this_perm >= 3) {
	    permed++;
	}
    }
    return permed;
}

function softcores(skillset) {
    var permed = 0;
    for(var i=0; i<skillset.length; i++) {
	var this_perm = have_skills[skillset[i]];
	if(typeof(this_perm) != "undefined" && this_perm >= 1) {
	    permed++;
	}
    }
    return permed;
}

var base64 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"];
function encodeSkills() {
    var map = [1, 2, 2, 3, 3];
    var permanences = [];
    for(var i=0; i<3; i++) {
	if(typeof(have_skills[arguments[i]]) == "undefined") {
	    permanences[i] = 0;
	} else {
	    permanences[i] = map[have_skills[arguments[i]]];
	}
    }
    return base64[16*permanences[0] + 4*permanences[1] + permanences[2]];
}

function displaySkillTable() {
    var json_data = GM_getValue("json_data", "");
    if(json_data == "") {
	show_message("red", "The script was unable to obtain the layout data needed to create a skill table, so it will not work. The script attempts to get this data when you load main.php, so reloading this page may fix it. This is probably caused by a remote server failure.");
	return;
    }
    var parsed_data;
    if(typeof(JSON) != "undefined" && typeof(JSON.parse) != "undefined") {
	parsed_data = JSON.parse(json_data);
    } else {
	parsed_data = eval("(" + json_data +")");
    }
    skills = parsed_data.skills;
    var tables = document.getElementsByTagName("table");
    var skilltable;
    for(var i in tables){
	str = new String(tables[i].innerHTML);
	if(!str.match(/images\.kingdomofloathing\.com/) && 
	   (window.location.pathname == "/charsheet.php" && str.match(/<a onclick=.javascript:poop.*whichskill/i) ||
	    window.location.pathname != "/charsheet.php" && str.match(/<a onclick=.javascript:skill/i))) {
	    skilltable = tables[i];
	    break;
	}
    }
    
    if(typeof(skilltable) == "undefined") {
	return;
    }
    
    if(window.location.pathname == "/charsheet.php" && document.getElementsByTagName("body")[0].innerHTML.indexOf("You are in Hardcore mode, and may not receive items or buffs from other players.") != -1) {
	hardcore = true;
	if(document.getElementById("permskills")) {
	    magical_skills = document.getElementById("permskills").innerHTML;
	} else {
	    magical_skills = "";
	}
    } else {
	hardcore = false;
    }
    
    str = new String(skilltable.innerHTML);
    
    var skills_list = str.match(/<a onclick=.javascript.(skill|poop)\([^>]*>([^<]|<(?!\/a>))*<\/a>( \(<b>HP<\/b>\)| \(P\))?/gi);
    
    for(var i in skills_list) {
	var is_magical = false;
	if(hardcore && magical_skills.indexOf(skills_list[i]) != -1) {
	    is_magical = true;
	}
	str = new String(skills_list[i]);
	var skillid;
	skillid = str.replace(/.*javascript:poop\(.*whichskill=(\d+).*/, "$1");
	skillid = skillid.replace(/.*javascript:skill\((\d+)\).*/, "$1");
	
	var permanence = 0;
	if(str.match(/\((P|<b>P<\/b>)\)/)) {
	    permanence = 2;
	} else if(str.match(/\(<b>HP<\/b>\)/)) {
	    permanence = 4;
	}
	if(typeof(skills[skillid]) == "undefined") {
	    var skillname = str.replace(/.*javascript:skill\(\d+\)[^>]*>(.*)<\/a>.*/, "$1");
	    skills[skillid] = [skillname, ""];
	    unknowns.push(skillid);
	}
	if(skills[skillid][1]) {
	    if(typeof(have_skills[skillid]) != "undefined") {
		if(have_skills[skillid] == 4) {
		    hardcore_sums[skills[skillid][1]]--;
		    hardcore_total--;
		}
		if(have_skills[skillid] >= 2) {
		    softcore_sums[skills[skillid][1]]--;
		    softcore_total--;
		}
	    }
	    if(permanence == 4) {
		if(hardcore_sums[skills[skillid][1]]) {
		    hardcore_sums[skills[skillid][1]]++;
		} else {
		    hardcore_sums[skills[skillid][1]] = 1;
		}
		hardcore_total++;
	    }
	    if(permanence >= 2) {
		if(softcore_sums[skills[skillid][1]]) {
		    softcore_sums[skills[skillid][1]]++;
		} else {
		    softcore_sums[skills[skillid][1]] = 1;
		}
		softcore_total++;
	    }
	}
	if(is_magical) {
	    have_skills[skillid] = permanence - 1;
	} else {
	    have_skills[skillid] = permanence;
	}
    }
    
    for(var i in parsed_data.books) {
	var regex = new RegExp(parsed_data.books[i].name);
	if(regex.test(skilltable.innerHTML)) {
	    have_skills[parsed_data.books[i].pseudoid] = 4;
	}
    }
    
    if(have_skills.length == 0) {
	return;
    }
    
    var skill_chart;
    if(window.location.pathname == "/charsheet.php") {
	skill_chart = "<tr><td height=1 bgcolor=black></td></tr><tr><td><table cellspacing=\"5px\" style=\"margin:1em auto; text-align:center;\" cellpadding=\"3\"><tr>";
    } else {
	skill_chart = "<table cellspacing=\"5px\" style=\"margin:1em auto; text-align:center;\" cellpadding=\"3\"><tr>";
    }
    
    var bm = false;
    var tds = document.getElementsByTagName("td");
    for(var i in tds) {
	if(tds[i].innerHTML == "Sign:") {
	    i *= 1;
	    if(tds[i + 1].innerHTML == "<b>Bad Moon</b>") {
		bm = true;
	    }
	    break;
	}
    }
    
    var coloring_classes = [];
    for(var i in skills) {
	if(skills[i][1]) {
	    if(total_sums[skills[i][1]]) {
		total_sums[skills[i][1]]++;
		coloring_classes[skills[i][1]].push(i);
	    } else {
		total_sums[skills[i][1]] = 1;
		coloring_classes[skills[i][1]] = [i];
	    }
	    total_total++;
	}
    }
    
    var hardcore_skills = hardcore_total > 0;
    var softcore_skills = softcore_total > 0 && softcore_total > hardcore_total;
    var suppress_first_column = GM_getValue("suppress_first_column", "false") == "true";
    var show_key = GM_getValue("show_key", "true") == "true";
    
    var instructions = parsed_data.table;
    row: for(var rowindex in instructions) {
	var broken = false;
	var first_column = true;
	var row_style = "";
	var row = instructions[rowindex];
	cell: for(var colindex in row) {
	    var cell = row[colindex];
	    if(typeof(cell.display) != "undefined") {
		var conditions = cell.display.split(" ");
		for(var conditionindex in conditions) {
		    switch(conditions[conditionindex]) {
		    case "softcore-only":
			if(!softcore_skills) {
			    continue cell;
			}
			if(hardcore_skills) {
			    continue cell;
			}
			break;
		    case "hardcore-only":
			if(softcore_skills) {
			    continue cell;
			}
			if(!hardcore_skills) {
			    continue cell;
			}
			break;
		    case "both":
			if(!softcore_skills) {
			    continue cell;
			}
			if(!hardcore_skills) {
			    continue cell;
			}
			break;
		    case "softcore":
			if(!softcore_skills) {
			    continue cell;
			}
			break;
		    case "hardcore":
			if(!hardcore_skills) {
			    continue cell;
			}
			break;
		    case "profile":
			if(window.location.pathname == "/charsheet.php") {
			    continue cell;
			}
			break;
		    case "charsheet":
			if(window.location.pathname != "/charsheet.php") {
			    continue cell;
			}
			break;
		    case "badmoon":
			if(window.location.pathname != "/charsheet.php") {
			    continue cell;
			}
			if(!bm) {
			    continue cell;
			}
			break;
		    case "insoftcore":
			if(window.location.pathname != "/charsheet.php") {
			    continue cell;
			}
			if(hardcore) {
			    continue cell;
			}
			break;
		    case "inhardcore":
			if(window.location.pathname != "/charsheet.php") {
			    continue cell;
			}
			if(!hardcore) {
			    continue cell;
			}
			if(bm) {
			    continue cell;
			}
			break;
		    case "key":
			if(!show_key) {
			    continue cell;
			}
			break;
		    }
		}
	    }
	    if(first_column && suppress_first_column) {
		first_column = false;
		continue;
	    }
	    first_column = false;
	    if(!broken) {
		broken = true;
		skill_chart += row_break();
	    }
	    var cell_style = "";
	    if(cell.color == "row") {
		if(!row_style) {
		    var row_skills = [];
		    for(var anothercolindex in row) {
			if(row[anothercolindex].type == "skill") {
			    row_skills.push(row[anothercolindex].skill);
			}
		    }
		    row_style = choose_style(row_skills, cell.colorbound, cell.threshold);
		}
		cell_style = row_style;
	    } else if(typeof(cell.color) != "undefined" && cell.color) {
		var relevant_classes = cell.color.split(" ");
		var coloring_list = [];
		for(var classindex in relevant_classes) {
		    var this_class = relevant_classes[classindex];
		    coloring_list = coloring_list.concat(coloring_classes[this_class]);
		}
		cell_style = choose_style(coloring_list, cell.colorbound, cell.threshold);
	    }
	    if(typeof(cell.forcepermanence) != "undefined") {
		cell_style = lookup_style(parseInt(cell.forcepermanence));
	    }
	    switch(cell.type) {
	    case "wiki":
		skill_chart += wiki_cell(cell.content, cell.href, cell_style);
		break;
	    case "text":
		skill_chart += text_cell(cell.content, cell_style);
		break;
	    case "skill":
		skill_chart += skill_cell(cell.skill);
		break;
	    case "sum":
		var x = 0;
		var y = 0;
		var sums;
		if(typeof(cell.flavor) != "undefined" && cell.flavor == "hardcore") {
		    sums = hardcore_sums;
		} else {
		    sums = softcore_sums;
		}
		var relevant_classes = cell.class.split(" ");
		var coloring_list = [];
		for(var classindex in relevant_classes) {
		    var this_class = relevant_classes[classindex];
		    if(typeof(total_sums[this_class]) != "undefined") {
			if(typeof(sums[this_class]) != "undefined") {
			    x += sums[this_class];
			}
			y += total_sums[this_class];
			coloring_list = coloring_list.concat(coloring_classes[this_class]);
		    }
		}
		cell_label = cell.label ? cell.label : "";
		skill_chart += text_cell(x + "/" + y + cell_label, choose_style(coloring_list, cell.colorbound, cell.threshold));
		break;
	    }
	}
    }
    
    if(unknowns.length > 0) {
	skill_chart += row_break() + text_cell("") + text_cell("") + text_cell("") + text_cell("") + text_cell("") + text_cell("");
	for(var i=0; i<unknowns.length; i++) {
	    if(i%6 == 0) {
		skill_chart += row_break();
		if(i == 0) {
		    skill_chart += text_cell("Unknown");
		} else {
		    skill_chart += text_cell("");
		}
	    }
	    var this_unknown = unknowns[i];
	    skill_chart += skill_cell(unknowns[i]);
	}
    }
    
    if(window.location.pathname == "/charsheet.php") {
	skill_chart += "</tr></table></td></tr><tr><td height=1 bgcolor=black></td></tr>";
    } else {
	skill_chart += "</tr></table>";
    }
    
    var permalink = "";
    for(var linkindex in parsed_data.permalink) {
	var triplet = parsed_data.permalink[linkindex];
	permalink += encodeSkills(triplet[0], triplet[1], triplet[2]);
    }
    
    str = new String(permalink);
    permalink = str.replace(/A*$/, "");
    var final_block = permalink.replace(/(.{4})*(.*)/, "$2");
    
    // Pad out the final block of the Base64 with zeroes. We don't try to use '='
    // to terminate the block because this requires care to avoid ending up with
    // '__==' or similar, which is invalid Base64. The remote site will trim any
    // trailing zeroes anyway.
    if(final_block.length == 1) {
	permalink += "AAA";
    } else if(final_block.length == 2) {
	permalink += "AA";
    } else if(final_block.length == 3) {
	permalink += "A";
    }
    
    if(window.location.pathname == "/charsheet.php") {
	// charsheet
	for(var i in document.getElementsByTagName("p")) {
	    str = new String(document.getElementsByTagName("p")[i].innerHTML);
	    if(str.match(/Skills:/)) {
		str = str.replace(/(<table>.*<\/table>)/, "<div id='skill_list' style='display:none;'>$1</div><div id='skill_chart' style='display:block;'><table>") + skill_chart + "</table></div>";
		document.getElementsByTagName("p")[i].innerHTML = str.replace(/<b>Skills:<\/b>/, "<a onclick='javascript:function invert(el){if(el.style.display==\"block\") { el.style.display=\"none\"; } else { el.style.display=\"block\";}}invert(document.getElementById(\"skill_list\"));invert(document.getElementById(\"skill_chart\"));return false'><b>Skills:</b></a> <a href=\"http://www.overlordindustries.net/cgi-bin/skillChecker.cgi?hash=" + permalink + "\" target=\"_blank\"><font color=\"blue\">[link]</font></a>");
	    }
	}
    } else {
	// showplayer
	str = new String(document.getElementById("pskills"));
	if(document.getElementById("pskills") == null) {
	    // This is an error case, we should have given up much sooner if we couldn't find a skill list.
	    GM_log("Couldn't find pskills list, so couldn't inject a chart.");
	} else {
	    var old_chart = document.getElementById("pskills").innerHTML.replace(/\n/g, " ").replace(/\s+/g, " ").replace(/^.*>View Permanent Skills<\/a><\/td><\/tr> (.*)<tr><td bgcolor=\"black\" height=\"1\"><\/td><\/tr><\/tbody><\/table>/, "$1").replace(/ class=\"pskill\"/g, "");
	    document.getElementById("pskills").innerHTML = "<table><tbody><tr><td height=1 bgcolor=black></td></tr><tr><td align=\"center\"><a onclick='javascript:function invert(el){if(el.style.display==\"block\") { el.style.display=\"none\"; } else { el.style.display=\"block\";}}invert(document.getElementById(\"skill_chart\"));return false' href=\"#\" class=\"nounder\" style=\"font-weight: bold;\">View&nbsp;Permanent&nbsp;Skills</a>&nbsp;<a href=\"http://www.overlordindustries.net/cgi-bin/skillChecker.cgi?hash=" + permalink + "\" target=\"_blank\"><font color=\"blue\">[link]</font></a></td></tr><tr><td>" + "<div id='skill_chart' style='display:none;'><table><tr><td align=\"center\">" + skill_chart + "</td></tr><tr><td align=\"center\"><table>" + old_chart + "</table></td></tr></table></td></tr><tr><td height=1 bgcolor=black></div>" + "</td></tr></tbody></table>";
	}
    }
}

function create_checkbox_div(name, text, def) {
    var div = document.createElement("div");
    var input = document.createElement("input");
    var label = document.createElement("label");
    input.type = "checkbox";
    input.value = "0";
    input.checked = GM_getValue(name, def) == "true";
    input.name = "skill_checker_" + name;
    input.id = "skill_checker_" + name;
    label.for = "skill_checker_" + name;
    label.appendChild(document.createTextNode(text));
    var callback = function() {
        GM_setValue(name, input.checked ? "true" : "false");
    }
    input.addEventListener("change", callback, true);
    div.appendChild(input);
    div.appendChild(label);
    return div;
}

function add_account_menu_options() {
    var options = document.createElement("table");
    options.width = "95%";
    options.cellSpacing = "0";
    options.cellPadding = "0";
    options.innerHTML = "<tr><td bgcolor='blue' align='center' style='color: white;'><b>Skill Checker Options</b></td></tr><tr><td style='border: 1px solid blue; padding: 5px;'><center><table><tr><td><form id='skill_checker_options_form'></form></td></tr></table></center></td></tr><tr><td height='4'></td></tr>";
    var hook = document.getElementById("ro");
    hook.parentNode.insertBefore(options, hook);

    var form = document.getElementById("skill_checker_options_form");
    form.appendChild(create_checkbox_div("suppress_first_column", "Suppress First Column", "false"));
    form.appendChild(create_checkbox_div("show_key", "Show Key", "true"));
    form.appendChild(create_checkbox_div("compact", "Use abbreviations instead of skill names", "false"));
    form.appendChild(create_checkbox_div("wiki_links", "Skills link to wiki instead of in-game description", "false"));
}

if(window.location.pathname == "/main.php") {
    update_data(data_url_list, null);
    return;
} else if(window.location.pathname == "/account.php") {
    add_account_menu_options();
    return;
} else {
    if(GM_getValue("json_data", "") == "") {
	update_data(data_url_list, displaySkillTable);
    } else{
	displaySkillTable();
    }
}
    
