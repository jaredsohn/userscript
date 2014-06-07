// ==UserScript==
// @name          GLB Roster Summary
// @description   Summarizes the information found on the roster page
// @namespace     http://www.goallinebliz.com
// @include       http://goallineblitz.com/game/roster.pl?team_id=*
// @version       10.12.18
// ==/UserScript==

/*
 *
 * pabst did this 07/18/08+
 *
 */

window.setTimeout( function() {
	main();
}, 300);

var currentOff = "pro";
var currentDef = "4-3";

var offFormations = ["pro","big","heavy","ace","doubles","wide","spread","trips"];
//qb hb fb c g t te wr k p
var starters = new Array();
starters["pro"]      = [1,1,1,1,2,2,1,2];
starters["big"]      = [1,1,1,1,2,2,2,1];
starters["heavy"]    = [1,1,1,1,2,2,3,0];
starters["ace"]      = [1,1,0,1,2,2,2,2];
starters["doubles"]  = [1,1,0,1,2,2,1,3];
starters["wide"]     = [1,1,1,1,2,2,0,3];
starters["spread"]   = [1,1,0,1,2,2,0,4];
starters["trips"]    = [1,0,0,1,2,2,0,5];

var defFormations = ["4-3","3-4","nickel","dime","quarter","goalline"];
//dt de lb cb ss fs
starters["4-3"]      = [2,2,3,2,1,1];
starters["3-4"]      = [1,2,4,2,1,1];
starters["nickel"]   = [2,2,2,3,1,1];
starters["dime"]     = [2,2,1,4,1,1];
starters["quarter"]  = [1,2,1,5,1,1];
starters["goalline"] = [2,4,2,2,1,0];

var players = new Array();
var positions = new Array();

function Player() {
    this.name = "name";
	this.id = "0";
    this.position = "   ";
    this.level = null;
    this.contract = "";
    this.salary = "$0";

    this.toString = function() {
		var out = this.id+":"+this.position+") ";
		out += this.name;
		out += " ("+this.level+"/"+this.age+")";
		out += "'"+this.archetype+"'";
		out += " ["+this.height+","+this.weight+"]";
		out += " - "+this.salary;
		out += " : "+this.contract;
		return out;
    }
}

var tableData = [[],[],[]];
var tableRows = [];

function main() {
	getPlayers();
	//positions.push("Total");

	tableRows[0] = ["QB","HB","FB","C","G","OT","TE","WR","Total"];
	tableRows[1] = ["DT","DE","LB","CB","SS","FS","Total"];
	tableRows[2] = ["K","P","Total"];
	
	for (var i=0; i<3; i++) {
	    for (var j=0; j<tableRows[i].length-1; j++) {
	        var a = buildPosition(tableRows[i][j]);
		tableData[i].push(a);
		//console.log(tableRows[i][j]+") "+a);
	    }
	}
	
	var el = document.getElementsByClassName("medium_head")[0];
	var obar = getOffenseBar();
	var dbar = getDefenseBar();
	var rosterTableO = getRosterTable("Offense Summary",0,tableRows[0],"ros");//positions);
	var rosterTableD = getRosterTable("Defense Summary",0,tableRows[1],"rds");//positions);
	var rosterTableK = getRosterTable("Kicking Summary",0,tableRows[2],"rks");//positions);
	
	(el.parentNode).insertBefore(obar,el);
	(el.parentNode).insertBefore(rosterTableO,obar.nextSibling);
	var span = document.createElement("span");
	span.innerHTML = "&nbsp;";
	(el.parentNode).insertBefore(span,rosterTableO.nextSibling);
	var span2 = document.createElement("span");
	span2.innerHTML = "&nbsp;";
	(el.parentNode).insertBefore(dbar,span.nextSibling);
	(el.parentNode).insertBefore(rosterTableD,dbar.nextSibling);
	(el.parentNode).insertBefore(span2,rosterTableD.nextSibling);
	var span3 = document.createElement("span");
	span3.innerHTML = "&nbsp;";
	(el.parentNode).insertBefore(rosterTableK,span2.nextSibling);
	(el.parentNode).insertBefore(span3,rosterTableK.nextSibling);
	
	fillTables(starters["pro"],starters["4-3"],[1,1]);
	
	barEvent("pro");
	barEvent("4-3");
}

function descendingSort(left,right) {
    return parseInt(left) < parseInt(right);
}

function addCommas(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
    	x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function barEvent(evt) {
    if (offFormations.indexOf(evt) != -1) {
		var e = document.getElementById(currentOff);
		e.setAttribute("class","");//subhead_link_bar");
		currentOff = evt;
		var e = document.getElementById(currentOff);
		e.setAttribute("class","medium_head");
    }
    else if (defFormations.indexOf(evt) != -1) {
		var e = document.getElementById(currentDef);
		e.setAttribute("class","");//subhead_link_bar");
		currentDef = evt;
		var e = document.getElementById(currentDef);
		e.setAttribute("class","medium_head");
    }
    else {
    	return;
    }
    fillTables(starters[currentOff],starters[currentDef],[1,1]);
}

function mouseEvent(evt) {
    barEvent(evt.target.id);
}

function getDefenseBar() {
    return getBar(defFormations);
}

function getOffenseBar() {
    return getBar(offFormations);
}

function getBar(formations) {
    var bar = document.createElement('div');

    var t = document.createElement('span');
    t.setAttribute("class","medium_head");// subhead_head");
    t.appendChild(document.createTextNode("Formations: "));

    var row = document.createElement('span');
    row.setAttribute("class","");//subhead_link_bar");
    for each (var f in formations) {
        var b = document.createElement('a');
		b.appendChild(document.createTextNode(f));
		b.setAttribute("class","");//subhead_link_bar");
		b.setAttribute("id",f);
		b.addEventListener('click', mouseEvent, true);
		
		var s = document.createElement('span');
		s.appendChild(document.createTextNode(" | "));
		
		row.appendChild(b);
        row.appendChild(s);
    }
    row.removeChild(row.lastChild);
    bar.appendChild(t);
    bar.appendChild(row);

    return bar;
}

function getRosterTable(title, index, rows, prefix) {
    var columns = ["Players","Total Salary","Avg Salary","Top Level",
		   "Starting Level","Backup Level","Next Contract"];
    
    var r = rows;
    if (rows == null) r = [];
    else if (rows.length == 0) r = []; 
    return getTable(title,r,columns,index,prefix);
}

function getTable(title,rows, columns, index, prefix) {
    var t = document.createElement("table");
    t.setAttribute("border","1");
    t.setAttribute("cellspacing","0");
    t.setAttribute('style','width: 800px');
    t.setAttribute('id','scout-'+prefix+""+index+'-table');
    
    var tr = document.createElement("tr");
    tr.setAttribute('class','nonalternating_color rsum_pbr_title');
    
    var td = document.createElement("td");
    td.setAttribute('id','team'+index+""+prefix);
    td.setAttribute('colspan','9');
    td.setAttribute('align','center');
    td.appendChild(document.createTextNode(title));
    tr.appendChild(td);
    t.appendChild(tr);
    
    var tr2 = document.createElement("tr");
    tr2.setAttribute('class','nonalternating_color2 rsum_pbr_title');
    tr2.appendChild(document.createElement("td"));
    for (var x=0; x<columns.length; x++) {
		var colname = document.createElement("td");
		colname.setAttribute('align','center');
		colname.appendChild(document.createTextNode(columns[x]));
		tr2.appendChild(colname);
    }
    t.appendChild(tr2);
    
    for (var y=0; y<rows.length; y++) {
		var tr3 = document.createElement("tr");
		tr3.setAttribute('class','alternating_color'+(y%2+1)+' rsum_pbr_title_row');
		var rowname = document.createElement("td");
		rowname.appendChild(document.createTextNode(rows[y]));
		tr3.appendChild(rowname);
		for (var x=0; x<columns.length; x++) {
		    var stat = document.createElement("td");
		    stat.setAttribute('id',prefix+'-'+x+'-'+y+'-'+index);
		    stat.setAttribute('align','center');
		    stat.appendChild(document.createTextNode('('+x+','+y+')'));
		    tr3.appendChild(stat);
		}
		t.appendChild(tr3);
    }
    return t;
}

function avg(arr) {
    var c = 0;
    var avg = 0;
    for (var i=0; i<arr.length; i++) {
	if (arr[i] == null) return 0;
		c += parseFloat(arr[i]);
		avg = c / arr.length;
    }    
    return avg;
}

function getPlayers() {
	var roster = new Array();

    var p = document.getElementsByClassName("player_position");
    for each (var el in p) {
        var parent = el.parentNode;
//console.log(parent.innerHTML);

		var player = new Player();
		var a = parent.getElementsByClassName("player_name")[0].getElementsByTagName("a")[0];
		var pname = a.innerHTML;
		var id = a.href.split("=")[1];

		if (roster[id.toString()] != null) {
			player = roster[id.toString()];
		}
		else {
			player.name = pname;
			player.id = id;
		}

		for (var i=0; i<parent.childNodes.length; i++) {
			var node = parent.childNodes[i];
			var c = parent.childNodes[i].className;
			if (c == "player_level") {
				// td class name bug
				if (player.level == null) {
					player.level = parseInt(node.innerHTML);
				}
				else {
					player.age = parseInt(node.innerHTML);
				}
			}
			else if (c == "player_trade") {
			}
			else if (c == "player_position") {
				player.position = node.firstChild.innerHTML;
			}
			else if (c == "player_archetype") {
				player.archetype = node.firstChild.src;
			}
			else if (c == "player_weight") {
				player.weight = parseInt(node.innerHTML);
			}
			else if (c == "player_height") {
				player.height = node.innerHTML;
			}
			else if (c == "player_num") {
				player.num = node.innerHTML;
			}
			else if (c == "player_contract") {
				player.contract = node.innerHTML;
			}
			else if (c == "player_salary") {
				player.salary = node.innerHTML;
				player.salary = player.salary.replace(/ /g,"");
				player.salary = player.salary.replace("$","");
				player.salary = player.salary.replace(/,/g,"");
				player.salary = parseFloat(player.salary);
			}
		}
//		console.log("out-->"+player);
		roster[player.id.toString()] = player;
	}

	for each (var player in roster) {
		if (players[player.position] == null) {
			players[player.position] = new Array();
		}

		players[player.position].push(player);

		if (positions.indexOf(player.position) == -1) {
			positions.push(player.position);
		}
	}
}

function buildPosition(idx) {
    var data = [0,0,[],null]; //num,salary,lvls,contract
    for each (var p in players[idx]) {
		data[0]++;
		data[1] += parseFloat(p.salary);
		data[2].push(p.level);
		var currentMin = data[3];
		if (currentMin == null) {
		    data[3] = p.contract;
		}
		else if (parseInt(currentMin) > parseInt(p.contract)) {
		    data[3] = p.contract;
		}
		else if (parseInt(currentMin) == parseInt(p.contract)) {
		    var mindays = parseInt(currentMin.slice(currentMin.indexOf(" day ")+5));
		    var testdays = parseInt(p.contract.slice(p.contract.indexOf(" day ")+5));
		    if (testdays < mindays) {
			data[3] = p.contract;
		    }
		}
    }    
    return data;
}

function fillTables(off,def,k) {
    var start = [];
    start[0] = off;
    start[1] = def;
    start[2] = [1,1];
    var totalPlayers = [0,0,0];
    var totalSalary = [0,0,0];
    var totalLevel = [0,0,0];
    var totalStart = [0,0,0];
    var totalSPlayers = [0,0,0];
    var totalBack = [0,0,0];
    var totalBPlayers = [0,0,0];
    
    var titles = ["ros","rds","rks"];
    for (var type=0; type<titles.length; type++) {
		for (i=0; i<tableRows[type].length-1; i++) {
		    var num;
		    
		    document.getElementById(titles[type]+"-0-"+i+"-0").innerHTML = tableData[type][i][0];
		    
		    if (tableData[type][i][1] == 0) num = "-";
		    else num = "$ " + addCommas(tableData[type][i][1]);
		    document.getElementById(titles[type]+"-1-"+i+"-0").innerHTML = num;
		    
		    if (tableData[type][i][1] == 0) num = "-";
		    else num = "$ " + addCommas((tableData[type][i][1]/tableData[type][i][0]).toFixed(0));
		    document.getElementById(titles[type]+"-2-"+i+"-0").innerHTML = num;
		    
		    tableData[type][i][2] = tableData[type][i][2].sort(descendingSort);
		    
		    var maxLevel = tableData[type][i][2][0];
		    if (maxLevel == null) {
		    	maxLevel = 0; 
		    }
		    document.getElementById(titles[type]+"-3-"+i+"-0").innerHTML = maxLevel;
	
		    var splayers = tableData[type][i][2].slice(0,start[type][i]);
		    var slvl = avg(tableData[type][i][2].slice(0,start[type][i]));
		    if (slvl != 0) document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML = slvl.toFixed(1);
		    else document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML = "-";
		    if (splayers.length < start[type][i]) {
		    	document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML +="*";
		    }
		    
		    var blvl = avg(tableData[type][i][2].slice(start[type][i]));
		    if (blvl != 0) document.getElementById(titles[type]+"-5-"+i+"-0").innerHTML = blvl.toFixed(1);
		    else document.getElementById(titles[type]+"-5-"+i+"-0").innerHTML = "-";
		    
		    document.getElementById(titles[type]+"-6-"+i+"-0").innerHTML = tableData[type][i][3];
		    
		    totalPlayers[type] += tableData[type][i][0];
		    totalSalary[type] += tableData[type][i][1];
		    if (totalLevel[type] < maxLevel) totalLevel[type] = maxLevel;
		    totalStart[type] += slvl;
		    if (slvl > 0) totalSPlayers[type]++;
		    totalBack[type] += blvl;
		    if (blvl > 0) totalBPlayers[type]++;
		}
		
		// fill totals row
		document.getElementById(titles[type]+"-0-"+i+"-0").innerHTML = totalPlayers[type];
		document.getElementById(titles[type]+"-1-"+i+"-0").innerHTML = "$ " + addCommas(totalSalary[type]);
		document.getElementById(titles[type]+"-2-"+i+"-0").innerHTML = "$ " + addCommas((totalSalary[type]/totalPlayers[type]).toFixed(0));
		document.getElementById(titles[type]+"-3-"+i+"-0").innerHTML = totalLevel[type];
		var num = (totalStart[type]/totalSPlayers[type]).toFixed(1);
		if (isNaN(num) == true) num = "-";
		document.getElementById(titles[type]+"-4-"+i+"-0").innerHTML = num;
		num = (totalBack[type]/totalBPlayers[type]).toFixed(1);
		if (isNaN(num) == true) num = "-";
		document.getElementById(titles[type]+"-5-"+i+"-0").innerHTML = num;
		document.getElementById(titles[type]+"-6-"+i+"-0").innerHTML = "-";
    }
    
}


