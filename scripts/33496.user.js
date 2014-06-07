// ==UserScript==
// @name           pbp_filter
// @namespace      pbr
// @description    Filter Plays On Play-By-Play by Content
// @include        http://goallineblitz.com/game/home.pl
// @include        http://goallineblitz.com/game/game.pl?game_id=*&mode=pbp
// @version        09.10.18
// @require        http://userscripts.org/scripts/source/31566.user.js
// @require        http://userscripts.org/scripts/source/31567.user.js
// @require        http://userscripts.org/scripts/source/31573.user.js
// ==/UserScript==

/*
 * pabst was here 09/10/08+
 */

window.setTimeout( 
	function() {
		if (window.location.toString().indexOf("home.pl") != -1) {
			pbr_replay_highlight_main();
		}
		else {
			runFilter();
		}
	}, 
	1000
);

var plays = [];

function runFilter() {
	createFilterTable();
	createApplyButton();
	loadPBP();
}

function getTable() {
	var t = document.createElement("table");
	if (t == null) alert("why is t null?");
	t.setAttribute("border","0");
	t.setAttribute("cellspacing","0");
	t.setAttribute("style","width: 100%; visibility: visible;");
	t.setAttribute('id','filtertable');

	var tr = document.createElement("tr");
	tr.setAttribute('class','nonalternating_color pbp_pbr_title');

	var td = document.createElement("td");
	td.setAttribute('colspan',10);
	td.setAttribute('align','center');
	td.appendChild(document.createTextNode("Play-By-Play Filter"));
	
	tr.appendChild(td);
	t.appendChild(tr);
	return t;
}

function createCheckBoxRow(name,value) {
	var tr = document.createElement("tr");
	
	var td = document.createElement("td");
	var s = document.createElement("span");
	if (name.length > 0) {
		s.innerHTML = name+":";
	}
	else {
		s.innerHTML = "&nbsp;";
	}
	td.appendChild(s);
	tr.appendChild(td);
	
	for (var i=0; i<value.length; i++) {
		td = document.createElement("td"); 
		var cbox = document.createElement("input");
		cbox.setAttribute("class","pbpfilterbox");
		cbox.setAttribute("type","checkbox");
		cbox.setAttribute("name",value[i]);
		cbox.setAttribute("value",value[i]);
		td.appendChild(cbox);
		
		s = document.createElement("span");
		s.innerHTML = value[i]+"&nbsp;&nbsp;";
		td.appendChild(s);
		
		tr.appendChild(td);
	}
	
	while (tr.childNodes.length < 7) {
		td = document.createElement("td");
		td.innerHTML = "&nbsp;";
		tr.appendChild(td);
	}
	
	td = document.createElement("td");
	td.appendChild(createAllButton());
	tr.appendChild(td);

	td = document.createElement("td");
	td.appendChild(createClearButton());
	tr.appendChild(td);
	return tr;
}

function createAllButton() {
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","All");
	btn.addEventListener("click",
			function() {
				var parent = this.parentNode.previousSibling;
				while (parent != null) {
					for (var i=0; i<parent.childNodes.length; i++) {
						var btn = parent.childNodes[i];
						if (btn.checked != null) {
							btn.checked = true;
						}
					}
					parent = parent.previousSibling;
				}
			}
		,false);
	return btn;
}

function createClearButton() {
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Clear");
	btn.addEventListener("click",
			function() {
				var parent = this.parentNode.previousSibling;
				while (parent != null) {
					for (var i=0; i<parent.childNodes.length; i++) {
						var btn = parent.childNodes[i];
						if (btn.checked != null) {
							btn.checked = false;
						}
					}
					parent = parent.previousSibling;
				}
			}
		,false);
	return btn;
}

function createToGoRow() {
	var tr = createCheckBoxRow("To Go",["Min","Max"]);
	var btn = tr.cells[1].childNodes[0];
	btn.id = "mintogobutton";
	
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 4;
	txt.size = 5;
	txt.id = "togomin";
	tr.cells[1].appendChild(txt);
	
	var btn = tr.cells[2].childNodes[0];
	btn.id = "maxtogobutton";
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 4;
	txt.size = 5;
	txt.id = "togomax";
	tr.cells[2].appendChild(txt);

	tr.cells[1].setAttribute("colspan","3");
	tr.cells[2].setAttribute("colspan","3");
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	return tr;
}

function createGainRow() {
	var tr = createCheckBoxRow("Gain",["Minimum","Maximum"]);
	var btn = tr.cells[1].childNodes[0];
	btn.id = "mingainbutton";
	
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 4;
	txt.size = 5;
	txt.id = "gainmin";
	tr.cells[1].appendChild(txt);
	
	var btn = tr.cells[2].childNodes[0];
	btn.id = "maxgainbutton";
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 4;
	txt.size = 5;
	txt.id = "gainmax";
	tr.cells[2].appendChild(txt);

	tr.cells[1].setAttribute("colspan","3");
	tr.cells[2].setAttribute("colspan","3");
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	return tr;
}

function createTimeRow() {
	var tr = createCheckBoxRow("Time",["Start","End"]);
	var btn = tr.cells[1].childNodes[0];
	btn.id = "mintimebutton";
	
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 5;
	txt.size = 6;
	txt.id = "timemin";
	tr.cells[1].appendChild(txt);
	
	var btn = tr.cells[2].childNodes[0];
	btn.id = "maxtimebutton";
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 5;
	txt.size = 6;
	txt.id = "timemax";
	tr.cells[2].appendChild(txt);
	
	tr.cells[1].setAttribute("colspan","3");
	tr.cells[2].setAttribute("colspan","3");
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	return tr;
}

function createStringRow() {
	var tr = createCheckBoxRow("Strings",["Player","Generic"]);
	var btn = tr.cells[1].childNodes[0];
	btn.id = "playerbutton";
	
	var txt = document.createElement("select");
	txt.id = "playerstring";
	var data = getCookie("glb-greasemonkey: player list");
    console.log("player list is: "+data);
	var data = data.split("\t");
	for (var i=2; i<data.length; i=i+2) {
		var opt = document.createElement('option');
		opt.text = data[i];
		txt.add(opt,null);
	}
	tr.cells[1].appendChild(txt);
	tr.cells[1].setAttribute("colspan","3");
	
	var btn2 = tr.cells[2].childNodes[0];
	btn2.id = "genericbutton";
	
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.size = 24;
	txt.id = "genericstring";
	tr.cells[2].appendChild(txt);
	tr.cells[2].setAttribute("colspan","2");

	tr.removeChild(tr.cells[4]);
	tr.removeChild(tr.cells[4]);
	tr.removeChild(tr.cells[4]);
	
	return tr;
}

function createPositionRow() {
	var tr = createCheckBoxRow("Position",["From","To"]);
	var btn = tr.cells[1].childNodes[0];
	btn.id = "minyardbutton";
	
	var startOptions = document.createElement("select");
	var opt = document.createElement("option");
	opt.text = "OWN";
	startOptions.add(opt,null);
	var opt = document.createElement("option");
	opt.text = "OPP";
	startOptions.add(opt,null);
	tr.cells[1].appendChild(startOptions);
	
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 5;
	txt.size = 6;
	txt.id = "yardmin";
	tr.cells[1].appendChild(txt);
	
	var startOptions = document.createElement("select");
	var opt = document.createElement("option");
	opt.text = "OWN";
	startOptions.add(opt,null);
	var opt = document.createElement("option");
	opt.text = "OPP";
	startOptions.add(opt,null);
	tr.cells[2].appendChild(startOptions);
	
	var btn = tr.cells[2].childNodes[0];
	btn.id = "maxyardbutton";
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 5;
	txt.size = 6;
	txt.id = "yardmax";
	tr.cells[2].appendChild(txt);

	tr.cells[1].setAttribute("colspan","3");
	tr.cells[2].setAttribute("colspan","3");
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	tr.removeChild(tr.cells[3]);
	return tr;
}

function createFilterTable() {
	var el = document.getElementById("pbp");
	
	var t = getTable();
	el.parentNode.insertBefore(t,el);

	var span = createCheckBoxRow("Scoring",["Touchdowns","Field Goals","Safeties"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	span = createCheckBoxRow("Quarter",["1Q","2Q","3Q","4Q","OT"]);
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	span = createTimeRow();
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	span = createPositionRow();
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	span = createCheckBoxRow("Down",["1st","2nd","3rd","4th"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	span = createToGoRow();
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	span = createGainRow();
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	span = createCheckBoxRow("Play Type",["Rush","Pass","Kickoff","Punt","Field Goal","Penalty"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	span = createCheckBoxRow("Turnovers",["Interception","Fumble","Downs"]);
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	span = createCheckBoxRow("Direction",["Pitch Left","Left","Middle","Right","Pitch Right"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	span = createStringRow();
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);

	span = createCheckBoxRow("Offense",["Pro Set","Strong I","Weak I","I Form","Singleback","Singleback Big"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	t.appendChild(span);
	span = createCheckBoxRow("Offense",["Shotgun","Shotgun 4WR","Shotgun 5WR","Goal Line"]);
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	t.appendChild(span);

	span = createCheckBoxRow("Defense",["3-4","3-3-5","3-2-6","3-1-7","Goal Line"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
	span = createCheckBoxRow("Defense",["4-3","4-2-5","4-1-6"]);
	span.setAttribute("class","alternating_color2");
	t.appendChild(span);
	span = createCheckBoxRow("Cover",["Cover 0","Cover 1","Cover 2"]);
	span.setAttribute("class","alternating_color1");
	t.appendChild(span);
}

function createApplyButton() {
	var tbl = document.getElementById("filtertable");
	var tr = document.createElement("tr");
	tr.setAttribute('class','nonalternating_color pbp_pbr_title');
	var td = document.createElement("td");
	td.setAttribute('colspan',10);
	td.setAttribute('align','center');
	td.innerHTML = "&nbsp;";
	tr.appendChild(td);
	tbl.appendChild(tr);

	var tr = document.createElement("tr");
	while (tr.childNodes.length < 6) {
		td = document.createElement("td");
		td.innerHTML = "&nbsp;";
		tr.appendChild(td);
	}

	var td = document.createElement("td");
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Reload");
	btn.addEventListener("click",
			function() {
                plays = new Array();
                loadPBP();
			}
		,false);
	td.appendChild(btn);
	tr.appendChild(td);

	var td = document.createElement("td");
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Apply");
	btn.addEventListener("click",input,false);
	td.appendChild(btn);
	tr.appendChild(td);
	
	var td = document.createElement("td");
	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Clear");
	btn.addEventListener("click",
			function() {
				var row = this.parentNode.parentNode;
				while (row != null) {
					for (var i=0; i<row.cells.length; i++) {
						for (var j=0; j<row.cells[i].childNodes.length; j++) {
							var btn = row.cells[i].childNodes[j];
							if (btn.checked != null) {
								btn.checked = false;
							}
						}
					}
					row = row.previousSibling;
				}
			}
		,false);
	td.appendChild(btn);
	tr.appendChild(td);
	tbl.appendChild(tr);	
}

function input() {
	var functions = new Array(12);
	for (var i=0; i<functions.length; i++) {
		functions[i] = [];
	}
	var boxes = document.getElementsByClassName("pbpfilterbox");
	for (var i=0; i<boxes.length; i++) {
		if (boxes[i].checked == true) {
			//console.log(boxes[i].name);
			switch (boxes[i].name) {
			case "All Scores" : functions[0].push(scoreFilter); break;
			case "Touchdowns" : functions[0].push(touchdownFilter); break;
			case "Field Goals" : functions[0].push(madeFGFilter); break;
			case "Safeties" : functions[0].push(safetyFilter); break;
			
			case "1Q" : functions[1].push(quarter1Filter); break;
			case "2Q" : functions[1].push(quarter2Filter); break;
			case "3Q" : functions[1].push(quarter3Filter); break;
			case "4Q" : functions[1].push(quarter4Filter); break;
			case "OT" : functions[1].push(quarter5Filter); break;

			case "Start" : functions[2].push(timeFilter); break;
			case "End" : functions[2].push(timeFilter); break;
			
			case "From" : functions[3].push(positionFilter); break;
			case "To" : functions[3].push(positionFilter); break;

			case "1st" : functions[4].push(down1Filter); break;
			case "2nd" : functions[4].push(down2Filter); break;
			case "3rd" : functions[4].push(down3Filter); break;
			case "4th" : functions[4].push(down4Filter); break;

			case "Min" : functions[5].push(togoFilter); break;
			case "Max" : functions[5].push(togoFilter); break;

			case "Minimum" : functions[5].push(gainFilter); break;
			case "Maximum" : functions[5].push(gainFilter); break;

			case "Rush" : functions[6].push(rushFilter); break;
			case "Pass" : functions[6].push(passFilter); break;
			case "Field Goal" : functions[6].push(fgFilter); break;
			case "Kickoff" : functions[6].push(kickoffFilter); break;
			case "Punt" : functions[6].push(puntFilter); break;
			case "Penalty" : functions[6].push(penaltyFilter); break;
			
			case "All Turnovers" : functions[7].push(turnoverFilter); break;
			case "Interception" : functions[7].push(interceptionFilter); break;
			case "Fumble" : functions[7].push(fumbleFilter); break;
			case "Downs" : functions[7].push(downsFilter); break;

			case "Pitch Left" : functions[8].push(farleftFilter); break;
			case "Left" : functions[8].push(leftFilter); break;
			case "Middle" : functions[8].push(middleFilter); break;
			case "Right" : functions[8].push(rightFilter); break;
			case "Pitch Right" : functions[8].push(farrightFilter); break;
			
			case "Generic" : functions[9].push(stringFilter); break;
			case "Player"  : functions[9].push(stringFilter); break;
            }

            switch (boxes[i].parentNode.parentNode.firstChild.textContent) {
            case "Offense:" : functions[10].push([offFilter, boxes[i].name]); break;
            case "Defense:" : functions[10].push([defFilter, boxes[i].name]); break;
            case "Cover:" :  functions[11].push([defFilter, boxes[i].name]); break;
			}
console.log(boxes[i].parentNode.parentNode.firstChild.textContent+" : "+boxes[i].name+" : functions == "+functions);
		}
	}
	//need to delete storage
	var div = document.getElementById("storage:"+window.location.toString());
	if (div != null) {
		div.parentNode.removeChild(div);
	}
	applyFilters(functions);
	var div = document.createElement('div');
	div.setAttribute("id","storage:"+window.location);
	div.setAttribute("class","GSstorage");
	div.setAttribute("style","visibility:hidden; display:none;");
	div.innerHTML = document.getElementsByTagName("body")[0].innerHTML; 
	
	var footer = document.getElementById("footer");
	footer.appendChild(div);
}

function applyFilters(functions) {
	for (var i=0; i<plays.length; i++) {
		var last = true;
		for (var f=0; f<functions.length; f++) {
            var isVisible;
            if (functions[f].length == 0) {
                isVisible = true;
            }
            else {
                isVisible = false;
                for (var g=0; g<functions[f].length; g++) {
                    if (functions[f][g][0]) {
                        isVisible = isVisible || functions[f][g][0](plays[i], functions[f][g][1]);
                    }
                    else {
                        isVisible = isVisible || functions[f][g](plays[i]);
                    }
                }
            }
            isVisible = isVisible && last;
            if (isVisible == false) break;
            last = isVisible;
		}
		setVisibility(plays[i],isVisible);
        //if (isVisible == true) console.log(plays[i]);
        if (plays[i+1].playType[0] == "monsterkill") {
    		setVisibility(plays[i+1],isVisible);
    		setVisibility(plays[i+2],isVisible);
            i = i+2;
        }
	}
}

function playTypeFilter(p, str) {
	if (p.playType.indexOf(str) != -1) {
		return true;
	}
	return false;
}

function passFilter(p) { return playTypeFilter(p,"pass"); }
function completeFilter(p) { return playTypeFilter(p,"complete"); }
function incompleteFilter(p) { return playTypeFilter(p,"incomplete"); }

function rushFilter(p) { return playTypeFilter(p,"rush"); }
function pitchFilter(p) { return playTypeFilter(p,"pitch"); }
function handoffFilter(p) { return playTypeFilter(p,"handoff"); }
function leftFilter(p) { return playTypeFilter(p,"left"); }
function middleFilter(p) { return playTypeFilter(p,"middle"); }
function rightFilter(p) { return playTypeFilter(p,"right"); }

function fgFilter(p) { return playTypeFilter(p,"field goal"); }
function kickoffFilter(p) { return playTypeFilter(p,"kickoff"); }
function puntFilter(p) { return playTypeFilter(p,"punt"); }

function penaltyFilter(p) { return playTypeFilter(p,"penalty"); }

function turnoverFilter(p) { return playTypeFilter(p,"turnover"); }
function interceptionFilter(p) { return playTypeFilter(p,"interception"); }
function fumbleFilter(p) { return playTypeFilter(p,"fumble"); }
function downsFilter(p) { return playTypeFilter(p,"downs"); }

function quarter1Filter(p) { return p.quarter == 1; }
function quarter2Filter(p) { return p.quarter == 2; }
function quarter3Filter(p) { return p.quarter == 3; }
function quarter4Filter(p) { return p.quarter == 4; }
function quarter5Filter(p) { return p.quarter == 5; }

function down1Filter(p) { return p.down == 1; }
function down2Filter(p) { return p.down == 2; }
function down3Filter(p) { return p.down == 3; }
function down4Filter(p) { return p.down == 4; }

function farleftFilter(p) { return playTypeFilter(p,"pitch") && playTypeFilter(p,"left"); }
function leftFilter(p) { return playTypeFilter(p,"left"); }
function middleFilter(p) { return playTypeFilter(p,"middle"); }
function rightFilter(p) { return playTypeFilter(p,"right"); }
function farrightFilter(p) { return playTypeFilter(p,"pitch") && playTypeFilter(p,"right"); }

function scoreFilter(p) { return p.score != 0; }
function touchdownFilter(p) { return p.score >= 6; }
function madeFGFilter(p) { return p.score == 3; }
function safetyFilter(p) { return p.score == 2; }

function offFilter(p,f) {
    if (p.offForm == null) return true;
    return p.offForm.indexOf(f) != -1;
}
function defFilter(p,f) {
    if (p.defForm == null) return true;
    return p.defForm.indexOf(f) != -1;
}

function stringFilter(p) { 	
	var result = true;
	var strbtn = document.getElementById("genericbutton");
	if (strbtn.checked == true) {
		var str = document.getElementById("genericstring");
		if (str != null) {
			result = result && (p.play.toLowerCase().indexOf(str.value.toLowerCase()) != -1);
		}
	}
	if (result == false) return false;
	
	var strbtn = document.getElementById("playerbutton");
	if (strbtn.checked == true) {
		var str = document.getElementById("playerstring");
		if (str != null) {
			//result = result && (p.play.toLowerCase().indexOf(str.value.toLowerCase()) != -1);
			result = result && (p.play.replace("  "," ").indexOf(str.value.replace("  "," ")) != -1);
			console.log(p.play.toLowerCase() + " == " + str.value.toLowerCase());
		}
	}
	return result;
}

function togoFilter(p) { 
	var tg = p.togo;
	if (tg == "G") {
		tg = parseFloat(p.marker.slice(4));
	}
	else if (tg == "inches") {
		tg = 0.5;
	}
	var minbtn = document.getElementById("mintogobutton");
	if (minbtn.checked == true) {
		var min = document.getElementById("togomin");
		var val = parseFloat(min.value); 
		if ((tg < val) || (isNaN(val))) {
			return false;
		}
	}
	var maxbtn = document.getElementById("maxtogobutton");
	if (maxbtn.checked == true) {
		var max = document.getElementById("togomax");
		var val = parseFloat(max.value); 
		if ((tg > val) || (isNaN(val))) {
			return false;
		}
	}
	return true; 
}

function gainFilter(p) { 
	var g = p.yards;
	if (isNaN(g) == true) return false;
	
	var minbtn = document.getElementById("mingainbutton");
	if (minbtn.checked == true) {
		var min = document.getElementById("gainmin");
		var val = parseFloat(min.value); 
		if ((g < val) || (isNaN(val))) {
			return false;
		}
	}
	var maxbtn = document.getElementById("maxgainbutton");
	if (maxbtn.checked == true) {
		var max = document.getElementById("gainmax");
		var val = parseFloat(max.value); 
		if ((g > val) || (isNaN(val))) {
			return false;
		}
	}
	//console.log(p.yards+" -- "+p.text);
	return true; 
}

function getYard(y) {
	if (y == null) { //kickoff
		return 65;
	}
	var line = 0;
	if (y.slice(0,3) == "OWN") {
		line = parseFloat(y.slice(3));
	}
	else {
		line = 100 - parseFloat(y.slice(3));
	}
	return line;
}

function positionFilter(p) {  
	var tg = getYard(p.marker);
	var minbtn = document.getElementById("minyardbutton");
	if (minbtn.checked == true) {
		var min = document.getElementById("yardmin");
		var val = getYard(min.previousSibling.value+" "+min.value);
		if ((tg < val) || (isNaN(val))) {
			return false;
		}
	}
	var maxbtn = document.getElementById("maxyardbutton");
	if (maxbtn.checked == true) {
		var max = document.getElementById("yardmax");
		var val = getYard(max.previousSibling.value+" "+max.value);
		if ((tg > val) || (isNaN(val))) {
			return false;
		}
	}
	return true; 
}

function getTime(t) {
	var minr = 0;
	var secr = 0;
	if (t.split(":").length > 1) {
		minr = t.split(":")[0];
		secr = t.split(":")[1];
	}
	else {
		secr = t.toString();
	}
	var time = 0;
	if (minr.length > 0) {
		var m = parseFloat(minr);
		if (isNaN(m) == false) {
			time += (m*60);
		}
	}
	if (secr.length > 0) {
		var s = parseFloat(secr);
		if (isNaN(s) == false) {
			time += s;
		}
	}
	return time;
}

function timeFilter(p) { 
	var tg = getTime(p.timeRemaining);
	var minbtn = document.getElementById("mintimebutton");
	if (minbtn.checked == true) {
		var min = document.getElementById("timemin");
		var val = getTime(min.value);
		if ((tg > val) || (isNaN(val))) {
			return false;
		}
	}
	var maxbtn = document.getElementById("maxtimebutton");
	if (maxbtn.checked == true) {
		var max = document.getElementById("timemax");
		var val = getTime(max.value); 
		if ((tg < val) || (isNaN(val))) {
			return false;
		}
	}
	return true; 
}

function setVisibility(p, isVisible) {
	//console.log(p.element);
	var style = p.element.getAttribute("style");
	if (style == null) {
		style = "";
	}
	else {
		var vidx = style.indexOf("visibility");
		if (vidx != -1) {
			var vidx2 = style.slice(vidx).indexOf(";");
			style = style.slice(0,vidx) + style.slice(vidx+vidx2+1);
		}
		var didx = style.indexOf("display");
		if (didx != -1) {
			var didx2 = style.slice(didx).indexOf(";");
			style = style.slice(0,didx) + style.slice(didx+didx2+1);
		}
	}	
	
	var c = p.element.getAttribute("class");
	if (c == null) c = "";
	if (isVisible == true) {
		while (c.indexOf("pbrfiltered") != -1) {
			c = c.replace("pbrfiltered"," ");
		}
	}
	else {
		c += " pbrfiltered ";
	}
	p.element.setAttribute("class",c);
	
	if (isVisible == true) {
	}
	else {
		style += "visibility: hidden; display: none;";
	}
	p.element.setAttribute("style",style);
}

function playHandler(p) {
	var playText = p.play;
	//playText = trim(playText);
	var quarter = parseFloat(p.quarter);
	var down = parseFloat(p.down);
	var togo = -1;
	var minGain = -1;
	//if (p.team == stats.team_name[0]) current_team = 0;
	//else current_team = 1;

	try {
		try {
			if (p.togo ==  null) {
				p.togo = -1;
			}
			else if (p.togo == "G") {
				togo = parseFloat(p.marker.slice(4));
			}
			else if (p.togo.indexOf("inches") != -1) {
				togo = 0.5;
			}
			else {
				togo = parseFloat(p.togo);
			}
		}
		catch (err) {
			//console.log(err);
			togo = 0.5;
		}
		var sp = -1;
		var ep = -1;
		var y = NaN;
		var yt;

		var line = playText;
		do {
			//unfortunately, some people have parentheses in their names
			sp = line.indexOf('(')+1;
			ep = line.indexOf(')');
			if ((sp == -1) || (ep == -1)) {
				//no parentheses left in this line
				y = NaN;
				break;
			}
			else {
				//one complete set of parentheses found
				yt = line.slice(sp,ep);
				if (yt.indexOf("incomplete") != -1) {
					y = 0;
				}
				else if (yt.indexOf("no gain") != -1) {
					y = 0;
				}
				else {
					y = parseFloat(yt);
				}
				line = line.slice(ep+1);

				if(yt.indexOf(" yd gain") != -1) {
					//y = y;
				}
				else if(yt.indexOf(" yd loss") != -1) {
					y = -y;
				}
			}
		} while (isNaN(y) == true);
	}
	catch (error) {
		console.log(error);
	}
	p.yards = y;

	if ((playText.match(" rush") != null) || (playText.match(" pitch to ") != null)) {
		var r2 = -1;
		if ( (r2 = playText.indexOf(" to the left")) != -1) {
			p.playType = ["left"];
		}
		else if( (r2 = playText.indexOf(" up the middle")) != -1) {
			p.playType = ["middle"];
		}
		else if ( (r2 = playText.indexOf(" to the right")) != -1) {
			p.playType = ["right"];
		}
		p.playType.push("rush");

		if (playText.match(" pitch to ") != null) {
			p.playType.push("pitch");
		}
		else {
			p.playType.push("handoff");
		}
		
		if (playText.indexOf(", fumbled") != -1) {
			p.playType.push("turnover");
			p.playType.push("fumble");
		}
	}
	else if (playText.indexOf(" pass to ") != -1) {		
		if (playText.indexOf(" up the left side") != -1) {
			p.playType = ["pass","left"];
		}
		else if(playText.indexOf(" over the middle") != -1) {
			p.playType = ["pass","middle"];
		}
		else if (playText.indexOf(" up the right side") != -1) {
			p.playType = ["pass","right"];
		}
		
		if (playText.indexOf(", fumbled") != -1) {
			p.playType.push("turnover");
			p.playType.push("fumble");
		}
		if (playText.indexOf(" intercepted by ") != -1) {
			p.playType.push("turnover");
			p.playType.push("interception");
		}
	}
	else if (playText.indexOf("Kickoff by ") == 0) {
		p.playType = ["kickoff"];
		if (playText.indexOf(", fumbled") != -1) {
			p.playType.push("turnover");
		}
	}
	else if (playText.indexOf("Punt by ") == 0) {
		p.playType = ["punt"];
		if (playText.indexOf(", fumbled") != -1) {
			p.playType.push("turnover");
		}
	}
	else if (playText.indexOf("yd field goal attempted by") != -1) {
		p.playType = ["field goal"];
	}
	else if (playText.indexOf("[forced fumble:") == 0) {
		p.playType = ["pass","sack","turnover"];
	}
	else if ((playText.match(" sacked by ") != null) ||
			(playText.indexOf("[tackle:") == 0) || 
			(playText.indexOf("[diving tackle:") == 0))  {		
		p.playType = ["pass","sack"];
	}
	else if (playText.indexOf("penalty committed by") != -1) {
		p.playType = ["penalty"];
	}
	else if (playText.indexOf(" calls timeout") != -1) {
        p.playType = ["timeout"];
    }
	else if (playText.indexOf("Offense:") == 0) {
        p.playType = ["monsterkill"];
        p.element.className = "monsterkill";
        var formations = p.element.lastChild.innerHTML.split(">");
        var off = formations[1].split("<")[0];
        plays[plays.length-1].offForm = off;
    }
    else if (playText.indexOf("Defense:") == 0) {
        p.playType = ["monsterkill"];
        p.element.className = "monsterkill";
        var formations = p.element.lastChild.innerHTML.split(">");
        var def = formations[1].split("<")[0];
        plays[plays.length-2].defForm = def;
    }
	else {
		//something really wierd
		console.log("You shouldn't see me, so I'm probably a bug: '"+playText+"'");
	}

	if (playText.indexOf("turnover on downs") != -1) {
		p.playType.push("downs");
	}
}

function loadPBP() {
	var quarter = 0;
	var p = null;
	var team;

	var pbpTable = document.getElementById("play_by_play_table");
	if (pbpTable == null) {
		console.log("pbpTable is null. exiting.");
		return;
	}

	for (var hidx=0; hidx<pbpTable.rows.length; hidx++) {
		var htmlTableRowElement = pbpTable.rows[hidx];
		var className = htmlTableRowElement.className;
		if (className == null) {
			continue;
		}
		if (className.match("pbp_quarter") != null) {
			quarter++;
		}
		else if (className.match("pbp_team") != null) {
			var coll = htmlTableRowElement.cells;
			var node = coll.item(0);
			var idx = 0;
			do {
				var s = node.innerHTML.slice(idx,node.innerHTML.length);
				var i = s.indexOf(" ");
				if (i != -1) idx += i + 1;
			} 
			while (i != -1);
			team = node.innerHTML.slice(0,idx-1);
		}
		else if (className.match("pbp_play_row") != null) {
			p = new Play();
			p.playType = [];
			p.element = htmlTableRowElement;
			p.quarter = quarter;
			p.team = team;

			var coll = htmlTableRowElement.cells;
			//for each (node in coll) {
			for (var nidx=0; nidx<coll.length; nidx++) {
				var node = coll[nidx];
				var cName = node.className;
				if (cName.match("pbp_time_remaining") != null) {
					p.timeRemaining = node.innerHTML;
				}
				else if (cName.match("pbp_marker") != null) {
					p.marker = node.innerHTML;
				}
				else if (cName.match("pbp_down") != null) {
					p.down = node.innerHTML.slice(0,1);
					p.togo = node.innerHTML.slice(node.innerHTML.indexOf("amp; ")+5);
				}
				else if (cName.match("pbp_replay") != null) {
					p.replay = node.firstChild;
				}
				else if (cName.match("pbp_play") != null) {
					if (node.firstChild != null) {
						p.play = node.firstChild.data;

						var playText = p.play;
						if (playText.indexOf("made [FG]") != -1) p.score = 3;
						else if (playText.indexOf("[TD]") != -1) p.score = 6;
						else if (playText.indexOf("[SAFETY]") != -1) p.score = 2;
						else p.score = 0;
						if (playText.indexOf(", PAT made by ") != -1) p.score += 1;
					}
				}
			}
			playHandler(p);
			plays.push(p);
		}
	}	
}

function Play() {
	this.element;
	this.quarter;
	this.team;
	this.timeRemaining;
	this.marker;
	this.down;
	this.togo;
	this.play;
	this.replay;
	this.yards;
	this.playType;
    this.offForm;
    this.defForm;
    this.shell;
    
	this.toString = function() {
//		return this.element+;" | "+
        return this.quarter+" : "+this.team+" - "+this.timeRemaining+" - "+
		this.marker+" - "+this.down+"&"+this.togo+"("+this.offForm+","+this.defForm+")";
	}
}

