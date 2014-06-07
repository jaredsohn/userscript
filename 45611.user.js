// ==UserScript==
// @name           GLB Advanced EQ Submission
// @namespace      pbr
// @description    Submit Advanced EQ to google spreadsheet
// @include        http://goallineblitz.com/game/adv_equipment.pl?player_id=*
// @copyright      2008, pabst
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        09.04.08
// ==/UserScript==

/*
Submission Page:
http://spreadsheets.google.com/viewform?formkey=cEpwWmZOelZEOXY5YWxEdVdkVmxIUHc6MA..
                          /formResponse?formkey=cEpwWmZOelZEOXY5YWxEdVdkVmxIUHc6MA..

Results Page:
http://spreadsheets.google.com/ccc?key=pJpZfNzVD9v9alDuWdVlHPw&hl=en
 */

window.setTimeout( function() {
    var val = GM_getValue("eqsubmission","-1");
    if (val == "-1") {
        console.log("first run: setting variable");
        GM_setValue("eqsubmission","0");
    }
    
    try {
        var inputs = document.getElementsByTagName("input");
        inputs[1].style.display = "none";
        inputs[1].parentNode.removeChild(inputs[1]);

        inputs = document.getElementsByTagName("input");
        var input = document.createElement("input");
        input.type = "submit";
        input.value = "Refresh";
        input.name = "action";
        input.addEventListener("click",verifyRefresh,false);
        inputs[0].parentNode.appendChild(input);

    }
    catch (e) {
    }
    loadHomePage();
}, 100);

function verifyRefresh() {
    GM_setValue("eqsubmission","1");
    return true;
}

function getPlayer() {
    var eq = document.getElementsByClassName("equipment");
    if (eq.length == 0) return;

    var profile = document.getElementById("tab_player_profile");
    var link = profile.firstChild.href;
    console.log(link);

    loadPlayerPage(link.toString());
}

var currentDay = null;
var userName = null;

function Equipment() {
    this.name;
    this.desc;
    this.price;

    this.toString = function() {
        var out = this.name+" - "+this.price;
        for (var i=0; i<this.desc.length; i++) {
            out += " : "+this.desc[i].toString();
        }
        return out;
    }
}

function getEquipment(lvl, pos) {
    var list = new Array();
    var eq = document.getElementsByClassName("equipment_content");
    if (eq.length == 0) return;

    for (var i=0; i<eq.length; i++) {
        var e = new Equipment();
        e.name = eq[i].getElementsByClassName("equipment_name")[0].textContent;
        e.price = eq[i].getElementsByClassName("equipment_price")[0].textContent;
        var d = eq[i].getElementsByClassName("equipment_description")[0];
        var bonuses = [];
        for (var j=0; j<d.childNodes.length; j++) {
            //console.log(j+") "+d.childNodes[j].textContent);
            if (d.childNodes[j].textContent == " SA") {
                var b = d.childNodes[j-2].textContent + d.childNodes[j-1].textContent+d.childNodes[j].textContent;
                bonuses.pop();
                bonuses.pop();
                bonuses.push(b);
            }
            else if (d.childNodes[j].textContent.length > 0) {
                bonuses.push(d.childNodes[j].textContent);
            }
        }
        e.desc = bonuses;
        console.log(e);
        list.push(e);
    }
//    console.log(list);

	var url = "http://spreadsheets.google.com/viewform?formkey=cEpwWmZOelZEOXY5YWxEdVdkVmxIUHc6MA..";
    var iframe = document.createElement("frame");
    iframe.setAttribute("src",url);
    document.getElementById("footer").appendChild(iframe);

    var data = buildData(lvl, pos, list);
    loadSubmissionPage(lvl, pos, list, data);
}

function positionFix(p) {
    switch (p) {
        case "QB" : return "Quarterback";
        case "HB" : return "Runningback";
        case "FB" : return "Fullback";
        case "TE" : return "Tight End";
        case "WR" : return "Wide Receiver";
        case "C" : return "Center";
        case "G" : return "Guard";
        case "OT" : return "Offensive Tackle";
        case "K" : return "Kicker";
        case "P" : return "Punter";
        case "DE" : return "Defensive End";
        case "DT" : return "Defensive Tackle";
        case "LB" : return "Linebacker";
        case "CB" : return "Cornerback";
        case "SS" : return "Strong Safety";
        case "FS" : return "Free Safety";
    }
    return p;
}

function buildData(lvl, pos, eqlist) {
    function getList(e, idx) {
        var a = "entry."+idx[0]+".single=";
        var c = ["entry."+idx[1]+".single=", "entry."+idx[2]+".single="];
        var b = "entry."+idx[3]+".single=";

        var name = a+e.name+"&";
        var eq = "";
        for (var i=0; i<e.desc.length; i++) {
            eq += c[i]+e.desc[i]+"&";
        }
        var price = b+e.price;
        return name+eq+price;
    }

    var name = "entry.9.single="+userName+" (gm)";
    var level = "entry.0.single="+lvl;
    var p = "entry.1.single="+positionFix(pos);

    var date = new Date();
    var ms = date.getTime() + (date.getTimezoneOffset() * 60000) + (-6) * 3600000;
    date = new Date(ms);

    var hours = date.getHours().toString();
    if (hours.length < 2) hours = "0"+hours;
    hours += ":00";
    var h = parseInt(hours);
    if (h > 11) hours += " ("+(h-12)+":00 PM)";
    else if (h == 0) hours += " (12:00 AM)";
    else hours += " ("+h+":00 AM)";
    
    var time = "entry.8.single="+hours;
    var day;
    if (currentDay < 1) day = "Preseason (Day -4 to 0)";
    else if (currentDay > 40) day = "Offseason (Day 41+)";
    else day = currentDay;
    day = "entry.2.single="+day;
    day = day.replace("+","%2B");
    day = day.replace("+","%2D");

    var eq = [];
    var indexes = [ [7,6,5,4] , [10,14,12,13] , [16, 11, 15, 17] ];
    for (var i=0; i<eqlist.length; i++) {
        eq[i] = getList(eqlist[i], indexes[i]);
        eq[i] = eq[i].replace("%","%25");
        eq[i] = eq[i].replace("$","%24");
        eq[i] = eq[i].replace("+","%2B");
//        console.log(eq[i]);
    }

    var output = name+"&"+level+"&"+p+"&"+time+"&"+day;
    for (var i=0; i<eq.length; i++) {
        output += "&"+eq[i];
    }
//    console.log(output);
    return output;
}

function loadSubmissionPage(lvl, pos, eqlist, data) {
    var frame = document.getElementById("footer").getElementsByTagName("frame")[0];

    try {
        var inputs = frame.contentDocument.getElementsByTagName("input");
        if (inputs.length == 0) {
            setTimeout(function() {
                loadSubmissionPage(lvl, pos, eqlist, data);
            }, 1000);
        }
        else {
            console.log("found");
        }
    }
    catch (e) {
        var value = GM_getValue("eqsubmission","-1");
        if (value == "1") {
            GM_setValue("eqsubmission","0");
            console.log("submitting eq data");
            sendSubmissionPage(data);
        }
        else if (value == "-1") {
            console.log("first run: not submitting");
            GM_setValue("eqsubmission","0");
        }
        else {
            console.log("not submitting");
        }
    }
}

function loadHomePage() {
	return GM_xmlhttpRequest({
		method: 'GET',
		url: "http://goallineblitz.com/game/home.pl",
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/xml'
	    },
	    onreadystatechange: function(page) {
	    	if (page.readyState == 4) {
				if (page.status != 200) {
					alert("pbr gm script: Error "+page.status+" loading "+address);
				}
				else {
                    var season = page.responseText.split('<div id="season">')[1];
                    season = season.split("</div>")[0];
                    var day = season.split(",")[1];
                    season = season.split(",")[0];
                    currentDay = parseInt(day.split(" ")[2]);

                    var name = page.responseText.split('<td class="account_value">')[1];
                    name = name.split("</td>")[0];
                    userName = name;
                    getPlayer();
				}
	    	}
		}
	});
}

function loadPlayerPage(address) {
	return GM_xmlhttpRequest({
		method: 'GET',
		url: address,
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/xml'
	    },
	    onreadystatechange: function(page) {
	    	if (page.readyState == 4) {
				if (page.status != 200) {
					alert("pbr gm script: Error "+page.status+" loading "+address);
				}
				else {
                    var pos = page.responseText.split('class="position ')[1];
                    pos = pos.substring(0,pos.indexOf('"'));
                    var lvl = parseInt(page.responseText.split('"current_stats_value">')[1]);
                    getEquipment(lvl, pos);
				}
	    	}
		}
	});
}

function sendSubmissionPage(d) {
    var address = "http://spreadsheets.google.com/formResponse?formkey=cEpwWmZOelZEOXY5YWxEdVdkVmxIUHc6MA..";
	return GM_xmlhttpRequest({
		method: 'POST',
		url: address,
        data: d,
		headers: {
		    'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9) Gecko/2008052912 Firefox/3.0 Greasemonkey',
		    'Accept': 'text/xml',
            'Host': 'spreadsheets.google.com',
            'Referer': 'http://spreadsheets.google.com/viewform?formkey=cEpwWmZOelZEOXY5YWxEdVdkVmxIUHc6MA',
            'Content-type': 'application/x-www-form-urlencoded'
	    }
    });
}
