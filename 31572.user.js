// ==UserScript==
// @name           pbr Game Scout uilib
// @namespace      pbr
// @copyright      2008, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        09.11.04
// ==/UserScript==

function getEmptyTables() {
	var tableParent = document.createElement('span');
	var bar = document.createElement('span');
	bar.setAttribute("id","gsbar");

	var t1 = document.createElement('div');
	//t1.appendChild(document.createTextNode("Game Scout: "));
	//t1.setAttribute("class","medium_head");

	var b1 = document.createElement('a');
	b1.appendChild(document.createTextNode("Total"));
	b1.setAttribute("class","medium_head");//subhead_link_bar");
	b1.setAttribute("id","gsbar0");
	b1.addEventListener('click', function() { changeVisibility(0,2); }, true);

	var b2 = document.createElement('span');
	b2.appendChild(document.createTextNode(" | "));

	var b3 = document.createElement('a');
	b3.appendChild(document.createTextNode("Rushing"));
	//b3.setAttribute("class","subhead_link_bar");
	b3.setAttribute("id","gsbar3");
	b3.addEventListener('click', function() { changeVisibility(3,5); }, true);

	var b4 = document.createElement('span');
	b4.appendChild(document.createTextNode(" | "));

	var b5 = document.createElement('a');
	b5.appendChild(document.createTextNode("Passing"));
	//b5.setAttribute("class","subhead_link_bar");
	b5.setAttribute("id","gsbar6");
	b5.addEventListener('click', function() { changeVisibility(6,10); }, true);

	var b6 = document.createElement('span');
	b6.appendChild(document.createTextNode(" | "));

	var b7 = document.createElement('a');
	b7.appendChild(document.createTextNode("Special Teams"));
	//b7.setAttribute("class","subhead_link_bar");
	b7.setAttribute("id","gsbar11");
	b7.addEventListener('click', function() { changeVisibility(11,15); }, true);

	var b8 = document.createElement('span');
	b8.appendChild(document.createTextNode(" | "));


	var b9 = document.createElement('a');
	b9.appendChild(document.createTextNode("Defense"));
	//b9.setAttribute("class","subhead_link_bar");
	b9.setAttribute("id","gsbar16");
	b9.addEventListener('click', function() { changeVisibility(16,17); }, true);

	var b10 = document.createElement('span');
	b10.appendChild(document.createTextNode(" | "));


	var b11 = document.createElement('a');
	b11.appendChild(document.createTextNode("Everything"));
	//b11.setAttribute("class","subhead_link_bar");
	b11.setAttribute("id","gsbar-1");
	b11.addEventListener('click', function() { changeVisibility(-1); }, true);

	bar.appendChild(t1);

	bar.appendChild(b1);
	bar.appendChild(b2);
	bar.appendChild(b3);
	bar.appendChild(b4);
	bar.appendChild(b5);
	bar.appendChild(b6);
	bar.appendChild(b7);
	bar.appendChild(b8);
	bar.appendChild(b9);
	bar.appendChild(b10);
	bar.appendChild(b11);
	tableParent.appendChild(bar);

	var arr = new Array();
	arr.push(getQuarterTable(0,5));
	arr.push(getQuarterTable(1,5));
	arr.push(getPenaltyTable(0,[]));
	arr.push(getPenaltyTable(1,[]));
	arr.push(getDriveTable(0,[]));
	arr.push(getDriveTable(1,[]));
	arr.push(getRushingTable(0));
	arr.push(getRushingTable(1));
	arr.push(getRushingByDownTable(0));
	arr.push(getRushingByDownTable(1));
	arr.push(getRushingTargetTable(0,[]));
	arr.push(getRushingTargetTable(1,[]));
	arr.push(getPassingTable(0));
	arr.push(getPassingTable(1));
	arr.push(getPassingDistanceTable(0));
	arr.push(getPassingDistanceTable(1));
	arr.push(getPassingByDownTable(0));
	arr.push(getPassingByDownTable(1));
	arr.push(getQuarterbacksTable(0,[]));
	arr.push(getQuarterbacksTable(1,[]));
	arr.push(getPassingTargetTable(0,[]));
	arr.push(getPassingTargetTable(1,[]));
	arr.push(getKickingTable(0,[]));
	arr.push(getKickingTable(1,[]));
	arr.push(getKickReturnTable(0,[]));
	arr.push(getKickReturnTable(1,[]));
	arr.push(getPuntingTable(0,[]));
	arr.push(getPuntingTable(1,[]));
	arr.push(getPuntReturnTable(0,[]));
	arr.push(getPuntReturnTable(1,[]));
	arr.push(getSTDefenseTable(0,[]));
	arr.push(getSTDefenseTable(1,[]));
	arr.push(getRushDefenseTable(0,[]));
	arr.push(getRushDefenseTable(1,[]));
	arr.push(getPassDefenseTable(0,[]));
	arr.push(getPassDefenseTable(1,[]));

	var tables = document.createElement("table");
	tables.setAttribute("id","gamescout");
	tables.setAttribute("style","visibility: hidden; display: none;");
	for (var i=0; i<arr.length/2; i++) {
		var qrow = document.createElement("tr");
		qrow.setAttribute('id','row'+i);
		qrow.setAttribute('valign','top');
		var qd1 = document.createElement("td");
		var qd2 = document.createElement("td");
		qd1.appendChild(arr[i*2]);
		qd2.appendChild(arr[i*2+1]);
		qrow.appendChild(qd1);
		qrow.appendChild(qd2);
		tables.appendChild(qrow);
	}
	tableParent.appendChild(tables);
	return tableParent;
}

function addRowToTable(t,data) {
	var tr = document.createElement("tr");
	tr.setAttribute("class","alternating_color"+((t.rows.length%2)+1)+" pbp_pbr_title_row");
	for (var i=0; i<data.length; i++) {
		var td = document.createElement("td");
		if (i != 0) td.setAttribute("align","center");
		td.innerHTML = data[i]+"";
		tr.appendChild(td);
	}
	t.appendChild(tr);
}

function getQuarterTable(index, length) {
	var title = "Quarter";
	var columns = ["","Total","1st","2nd","3rd","4th","OT"];
	var rows = ["Time of Poss.", "Plays", "Yards", "Yards / Play", "Penalties",
	            " ", 
	            "Rush Att","Rush Yards","Yards / Att","Success Rate",
	            " ",
	            "Pass Comp","Pass Att", "Comp. Pct","Pass Yards", "Hurries"];

	var c;
	if (length == 1) c = new Array(length+1);
	else c = new Array(length+2);

	for (var i=0; i<c.length; i++) {
		c[i] = columns[i];
	}
	return getTable(title,rows,c,index,"q");	
}

function getRushingTable(index) {
	var title = "Team Rushing";
	var columns = ["","Far Left","Left","Middle","Right","Far Right"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate","Line Yards"];

	return getTable(title,rows,columns,index,"r");	
}

function getPassingTable(index) {
	var title = "Team Passing";
	var columns = ["","Left","Middle","Right"];
	var rows = ["Completions","Attempts","Comp. Pct","Yards"];

	return getTable(title,rows, columns,index,"p");	
}

function getRushingByDownTable(index) {
	var title = "Rushing By Down";
	var columns = ["","First","Second","Third","Fourth"];
	var rows = ["Attempts","Yards","Yards / Att","Success Rate","Line Yards","First Downs"];

	return getTable(title,rows,columns,index,"rbd");	
}

function getPassingByDownTable(index) {
	var title = "Passing By Down";
	var columns = ["","First","Second","Third","Fourth"];
	var rows = ["Completions","Attempts","Comp. Pct","Yards","First Downs", "Hurries"];

	return getTable(title,rows,columns,index,"pbd");	
}

function getPassingDistanceTable(index) {
	var title = "Passing Distance";
	var columns = ["","Left","Middle","Right","Total"];
	var rows = ["Long","Medium","Short","Backfield","Total"];

	return getTable(title,rows,columns,index,"pd");	
}

function getQuarterbacksTable(index, rows) {
	var title = "Quarterbacks";
	var columns = ["Name","Att","Cmp","Yards","TD","Int","Drop","PD","Bad","Hur"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tq",true);	
}

function getPassingTargetTable(index, rows) {
	var title = "Receivers";
	var columns = ["Name","Att","Cmp","Drop","PD","KL","Pct.","Yards","Lng","FD","BrTk"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tp",true);	
}

function getRushingTargetTable(index, rows) {
	var title = "Runners";
	var columns = ["Name","Att","Yards","YPC","Lng","Succ","FD","BrTk"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"tr",true);	
}

function getRushDefenseTable(index, rows) {
	var columns = ["Name","Tkl","Miss","YPT","Stop","Dft"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable("Run Defenders",r,columns,index,"defr",true);	
}
function getPassDefenseTable(index, rows) {
//	var columns = ["Name","Tkl","Miss","YPT","Stop","Defeat","PD"];
	var columns = ["Name","Tkl","Miss","YPT","Stop","Dft","Int","PD","KL"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable("Pass Defenders",r,columns,index,"defp",true);	
}
function getSTDefenseTable(index, rows) {
	var title = " Defenders";
	var columns = ["Name","Tackles","Missed","YPT"];
	
	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = []; 
	return getTable(title,r,columns,index,"defst",true);	
}

function getKickingTable(index, rows) {
	var title = "Kicking";
	var columns = ["Name","Kickoffs","Yards","Avg","Net","Lng","TB","In 20"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"k",true);	
}

function getPuntingTable(index, rows) {
	var title = "Punting";
	var columns = ["Name","Punts","Yards","Avg","Net","Lng","TB","In 20"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"pu",true);	
}

function getPuntReturnTable(index, rows) {
	var title = "Punt Returns";
	var columns = ["Name","Returns","Yards","Avg","Yrd%","Lng","TD","BrTk"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"pr",true);	
}

function getKickReturnTable(index, rows) {
	var title = "Kick Returns";
	var columns = ["Name","Returns","Yards","Avg","Yrd%","Lng","TD","BrTk"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"kr",true);	
}

function getPenaltyTable(index, rows) {
	var title = "Penalties";
	var columns = ["Name","Total", "False Start","Encroachment"];

	var r = rows;
	if (rows == null) r = [];
	else if (rows.length == 0) r = [];
	return getTable(title,r,columns,index,"pn",true);	
}

function getDriveTable(idx,arr) {
	var columns = ["Start Time","Time Poss","Drive Began",
	               "# of Plays","Net Yards","Result"];
	var rows = [];
	for each(var d in arr) {
		rows.push(d.quarter);
	}
	return getTable("Drives",rows,columns,idx,"dr");
}

function getTable(title, rows, columns, index, prefix, sortable) {
	var t = document.createElement("table");
	t.setAttribute("border","1");
	t.setAttribute("cellspacing","0");
	t.setAttribute("style","width: 485px;visibility: visible;");
	t.setAttribute('id','scout-'+prefix+""+index+'-table');

	var tr = document.createElement("tr");
	tr.setAttribute('class','nonalternating_color pbp_pbr_title');

	var td = document.createElement("td");
	td.setAttribute('id','team'+index+""+prefix);
	td.setAttribute('colspan',columns.length+1);
	td.setAttribute('align','center');
	td.appendChild(document.createTextNode(title));
	tr.appendChild(td);
	t.appendChild(tr);

	var tr2 = document.createElement("tr");
	tr2.setAttribute('class','nonalternating_color2 pbp_pbr_title');
	var first = document.createElement("td");
	first.setAttribute("align","left");
	first.appendChild(document.createTextNode(columns[0]));
	tr2.appendChild(first);
	if (sortable == true) {
		tr2.addEventListener("click",sortEvent,true);
	}
	for (var x=1; x<columns.length; x++) {
		var colname = document.createElement("td");
		var colname = document.createElement("td");
		colname.setAttribute('align','center');
		var tn = document.createTextNode(columns[x]);
		colname.appendChild(tn);
		tr2.appendChild(colname);
	}
	t.appendChild(tr2);

	for (var y=0; y<rows.length; y++) {
		var tr3 = document.createElement("tr");
		tr3.setAttribute('class','alternating_color'+(y%2+1)+' pbp_pbr_title_row');
		var rowname = document.createElement("td");
		rowname.appendChild(document.createTextNode(rows[y]));
		tr3.appendChild(rowname);
		for (var x=1; x<columns.length; x++) {
			var stat = document.createElement("td");
			stat.setAttribute('id',prefix+'-'+(x-1)+'-'+y+'-'+index);
			stat.setAttribute('align','center');
			stat.appendChild(document.createTextNode('('+(x-1)+','+y+')'));
			tr3.appendChild(stat);
		}
		t.appendChild(tr3);
	}
	return t;
}

function sortEvent(evt) {
	sortTable(evt.target.parentNode.parentNode,evt.target.cellIndex);
	return true;
}

function sortTable(table, column) {
	var rows = table.rows;
	var viz = table.getAttribute("style");
	table.setAttribute("style","visibility: hidden;");
	for (var i=2; i<rows.length-1; i++) {
		var idx = i;
		for (var j=i; j<rows.length-1; j++) {
			var lrow = rows.item(idx);
			var lcell = lrow.cells.item(column);
			var rrow = rows.item(j+1);
			var rcell = rrow.cells.item(column);
			var left = parseFloat(lcell.innerHTML);
			var right = parseFloat(rcell.innerHTML);
			if (isNaN(left) || isNaN(right)) {
				left = lcell.innerHTML.toLowerCase();
				right = rcell.innerHTML.toLowerCase();
				if (left > right) {
					idx = j+1;
				}
			}
			else {
				if (left < right) {
					idx = j+1;
				}
			}
		}
		if (idx != -1) {
			var r = table.rows.item(idx);
			table.deleteRow(idx);
			var newRow = table.insertRow(i);
			newRow.setAttribute("class","alternating_color"+(i%2+1)+" pbp_pbr_title_row");
			for (var x=0; x<r.cells.length; x++) {
				var cell = newRow.insertCell(x);		
				cell.setAttribute("align",r.cells.item(x).getAttribute("align"));
				cell.setAttribute("id",r.cells.item(x).getAttribute("id"));
				cell.innerHTML = r.cells.item(x).innerHTML;
			}
		}
	}
	if (rows.length != 2) {
		var lastRow = table.rows.item(rows.length-1);
		lastRow.setAttribute("class","alternating_color"+((rows.length-1)%2+1)+" pbp_pbr_title_row");
	}
	table.setAttribute("style",viz);
}

function changeVisibility(start,end) {
	var gs=document.getElementById("gamescout");
	gs.setAttribute("style","visibility: visible;");
	for (var i=-1; i<17; i++) {
		var t=document.getElementById("gsbar"+i);
		if (t != null) {
			t.setAttribute("style","visibility: visible;");
			t.setAttribute("class","");//"subhead_link_bar");
		}
	}
	var t=document.getElementById("gsbar"+start);
	t.setAttribute("class","medium_head");

	if (start == "-1") {
		start = 0;
		end = 17;
	}
	
	var idx=0;
	var t=document.getElementById("row"+idx);
	while (t != null) {
		t.setAttribute("style","visibility: collapse;");
		idx++;
		t=document.getElementById("row"+idx);
	}
	for (var idx=start; idx<=end; idx++) {
		var t = document.getElementById("row"+idx);
		t.setAttribute("style","visibility: visible;");
	}

	/*
	for (var idx=0; true; idx++) {
		var t = document.getElementById("row"+idx);
		if (t == null) break;
		else t.setAttribute("style","visibility: visible;");
	}
	*/
}

function fillTables(stats) {

	for (var i=0; i<2; i++) {

		//quarter table assignment
		document.getElementById('team'+i+'q').innerHTML = stats.team_name[i] +" Totals By Quarter";

		var q=quarter;
		if (quarter != 1) {
			q++;
		}
		q=6; //fix me
		for (var x=0; x<q; x++) {
			var idx = i*6;
			var secs = "" + (stats.team_possession[x+idx] % 60);
			while (secs.length < 2) secs = "0" + secs;
			document.getElementById("q-"+x+"-0-"+i).innerHTML = Math.floor(stats.team_possession[x+idx] / 60) + ":" + secs;
			document.getElementById("q-"+x+"-4-"+i).innerHTML = stats.team_penalty[x+idx];
        }
		for (var x=0; x<q; x++) {
			var idx = i*7;
			var p = stats.team_quarter_totals[x][0+idx] + stats.team_quarter_totals[x][4+idx];
            document.getElementById("q-"+x+"-1-"+i).innerHTML = p;
			var y = stats.team_quarter_totals[x][1+idx] + stats.team_quarter_totals[x][5+idx];
			document.getElementById("q-"+x+"-2-"+i).innerHTML = y.toFixed(0);
			var num = (y/p).toFixed(2);
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("q-"+x+"-3-"+i).innerHTML = num;

			document.getElementById("q-"+x+"-5-"+i).innerHTML = "";

			document.getElementById("q-"+x+"-6-"+i).innerHTML = stats.team_quarter_totals[x][0+idx];
			document.getElementById("q-"+x+"-7-"+i).innerHTML = stats.team_quarter_totals[x][1+idx].toFixed(0);
			var num = (stats.team_quarter_totals[x][1+idx] / stats.team_quarter_totals[x][0+idx]).toFixed(2);
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("q-"+x+"-8-"+i).innerHTML = num;
			num = (100*stats.team_quarter_totals[x][2+idx] / stats.team_quarter_totals[x][0+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("q-"+x+"-9-"+i).innerHTML = num + "%";

			document.getElementById("q-"+x+"-10-"+i).innerHTML = "";

			document.getElementById("q-"+x+"-11-"+i).innerHTML = stats.team_quarter_totals[x][3+idx];
			document.getElementById("q-"+x+"-12-"+i).innerHTML = stats.team_quarter_totals[x][4+idx];
			num = (100*stats.team_quarter_totals[x][3+idx] / stats.team_quarter_totals[x][4+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("q-"+x+"-13-"+i).innerHTML = num + "%";
			document.getElementById("q-"+x+"-14-"+i).innerHTML = stats.team_quarter_totals[x][5+idx].toFixed(0);
			num = (100*stats.team_quarter_totals[x][6+idx] / stats.team_quarter_totals[x][4+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("q-"+x+"-15-"+i).innerHTML = num + "%";
		}
		//end quarter table assignment

		//rushing table assignment	
		document.getElementById('team'+i+'r').innerHTML = stats.team_name[i] +" Rushing Direction";
		for (x=0; x<5; x++) {
			var idx = i*5;
			document.getElementById("r-"+x+"-0-"+i).innerHTML = stats.team_att[x+idx];
			document.getElementById("r-"+x+"-1-"+i).innerHTML = stats.team_yards[x+idx].toFixed(0);
			num = (stats.team_yards[x+idx] / stats.team_att[x+idx]).toFixed(2);   
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("r-"+x+"-2-"+i).innerHTML = num;
			num = (100*stats.team_success[x+idx] / stats.team_att[x+idx]).toFixed(0);   
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("r-"+x+"-3-"+i).innerHTML = num + "%";
			num = (stats.team_lyards[x+idx] / stats.team_att[x+idx]).toFixed(2);   
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("r-"+x+"-4-"+i).innerHTML = num;
			//document.getElementById("r-"+x+"-4-"+i).innerHTML = stats.team_firsts[x+idx];;
		}
		//end rushing table assignment

		//rushing by down table assignment	
		document.getElementById('team'+i+'rbd').innerHTML = stats.team_name[i] +" Rushing By Down";
		for (x=0; x<4; x++) {
			var idx = i*4;
			document.getElementById("rbd-"+x+"-0-"+i).innerHTML = stats.team_att_down[x+idx];
			document.getElementById("rbd-"+x+"-1-"+i).innerHTML = stats.team_yards_down[x+idx].toFixed(0);
			num = (stats.team_yards_down[x+idx] / stats.team_att_down[x+idx]).toFixed(2);   
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("rbd-"+x+"-2-"+i).innerHTML = num;
			num = (100*stats.team_success_down[x+idx] / stats.team_att_down[x+idx]).toFixed(0);   
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("rbd-"+x+"-3-"+i).innerHTML = num + "%";
			num = (stats.team_lyards_down[x+idx] / stats.team_att_down[x+idx]).toFixed(2);   
			if (isNaN(num) == true) {
				num = 0.00;
			}
			document.getElementById("rbd-"+x+"-4-"+i).innerHTML = num;
			document.getElementById("rbd-"+x+"-5-"+i).innerHTML = stats.team_firsts_down[x+idx];
		}
		//end rushing by down table assignment

		//passing table assignment	
		document.getElementById('team'+i+'p').innerHTML = stats.team_name[i] +" Passing Direction";
		for (x=0; x<3; x++) {
			var idx = i*3;
			document.getElementById("p-"+x+"-0-"+i).innerHTML = stats.team_pass_comp[x+idx];
			document.getElementById("p-"+x+"-1-"+i).innerHTML = stats.team_pass_att[x+idx];
			num = (100*stats.team_pass_comp[x+idx] / stats.team_pass_att[x+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("p-"+x+"-2-"+i).innerHTML = num + "%";
			document.getElementById("p-"+x+"-3-"+i).innerHTML = stats.team_pass_yards[x+idx].toFixed(0);
		}
		//end passing table assignment


		//passing by down table assignment	
		document.getElementById('team'+i+'pbd').innerHTML = stats.team_name[i] +" Passing By Down";
		for (x=0; x<4; x++) {
			var idx = i*4;
			document.getElementById("pbd-"+x+"-0-"+i).innerHTML = stats.team_pass_comp_down[x+idx];
			document.getElementById("pbd-"+x+"-1-"+i).innerHTML = stats.team_pass_att_down[x+idx];
			num = (100*stats.team_pass_comp_down[x+idx] / stats.team_pass_att_down[x+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("pbd-"+x+"-2-"+i).innerHTML = num + "%";
			document.getElementById("pbd-"+x+"-3-"+i).innerHTML = stats.team_pass_yards_down[x+idx].toFixed(0);
			document.getElementById("pbd-"+x+"-4-"+i).innerHTML = stats.team_pass_firsts_down[x+idx];
			num = (100*stats.team_pass_pressure_down[x+idx] / stats.team_pass_att_down[x+idx]).toFixed(0);
			if (isNaN(num) == true) {
				num = 0;
			}
			document.getElementById("pbd-"+x+"-5-"+i).innerHTML = num + "%";
		}
		//end passing by down table assignment

		//distance table assignment
		document.getElementById("team"+i+"pd").innerHTML = stats.team_name[i] +" Passing Distance";
		for (x=0; x<3; x++) {
			var idx = x*3 + i*9;
			document.getElementById("pd-"+x+"-0-"+i).innerHTML = stats.distanceStats[0][idx]+" for "+stats.distanceStats[0][idx+2].toFixed(0);
			document.getElementById("pd-"+x+"-1-"+i).innerHTML = stats.distanceStats[1][idx]+" for "+stats.distanceStats[1][idx+2].toFixed(0);
			document.getElementById("pd-"+x+"-2-"+i).innerHTML = stats.distanceStats[2][idx]+" for "+stats.distanceStats[2][idx+2].toFixed(0);
			document.getElementById("pd-"+x+"-3-"+i).innerHTML = stats.distanceStats[3][idx]+" for "+stats.distanceStats[3][idx+2].toFixed(0);
		}

		for (var x=0; x<4; x++) {
			var idx = i*9;
			var n = (stats.distanceStats[x][idx] + stats.distanceStats[x][idx+3]   +stats.distanceStats[x][idx+6]) 
			+ " for " +
			(stats.distanceStats[x][idx+2]+stats.distanceStats[x][idx+5]+stats.distanceStats[x][idx+8]).toFixed(0);

			document.getElementById("pd-3-"+x+"-"+i).innerHTML = n;
		}

		for (var x=0; x<3; x++) {
			var idx = i*9;
			var n = (stats.distanceStats[0][x*3+idx] + stats.distanceStats[1][x*3+idx] +
					stats.distanceStats[2][x*3+idx] + stats.distanceStats[3][x*3+idx]) +
					" for " +
					(stats.distanceStats[0][x*3+idx+2] + stats.distanceStats[1][x*3+idx+2] +
							stats.distanceStats[2][x*3+idx+2] + stats.distanceStats[3][x*3+idx+2]).toFixed(0);
			document.getElementById("pd-"+x+"-4-"+i).innerHTML = n;
		}
		document.getElementById("pd-3-4-"+i).innerHTML = "";
		//distance table assignment

		document.getElementById("team"+i+"tq").innerHTML = stats.team_name[i] +" Passers";
		if (stats.playerPassingName[i] != null) {
			var t = document.getElementById("scout-tq"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPassingName[i].length; x++) {
				var data = [];
				data.push(stats.playerPassingName[i][x]);
				data.push(stats.playerPassingStats[i][x][1]);
				data.push(stats.playerPassingStats[i][x][0]);
				data.push(stats.playerPassingStats[i][x][2].toFixed(0));
				data.push(stats.playerPassingStats[i][x][3]);
				data.push(stats.playerPassingStats[i][x][4]);
				data.push(stats.playerPassingStats[i][x][5]);
				data.push(stats.playerPassingStats[i][x][6]);
				data.push(stats.playerPassingStats[i][x][7]);
				data.push(stats.playerPassingStats[i][x][8]);
				addRowToTable(t,data);
			}
			sortTable(t,3);
		}

		document.getElementById("team"+i+"tr").innerHTML = stats.team_name[i] +" Runners";
		if (stats.playerRushingName[i] != null) {
			var t = document.getElementById("scout-tr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerRushingName[i].length; x++) {
				var data = [];
				data.push(stats.playerRushingName[i][x]);
				data.push(stats.playerRushingStats[i][x][0]);
				data.push(stats.playerRushingStats[i][x][1].toFixed(0));

				num = (stats.playerRushingStats[i][x][1] / stats.playerRushingStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) {
					num = 0.00;
				}
				data.push(num);
				data.push(stats.playerRushingStats[i][x][2].toFixed(0));

				num = (100*stats.playerRushingStats[i][x][3] / stats.playerRushingStats[i][x][0]).toFixed(0);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num + "%");

				data.push(stats.playerRushingStats[i][x][4]);
				data.push(stats.playerRushingStats[i][x][5]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"tp").innerHTML = stats.team_name[i] +" Receivers";
		if (stats.playerReceivingName[i] != null) {
			var t = document.getElementById("scout-tp"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerReceivingName[i].length; x++) {
				var data = [];
				data.push(stats.playerReceivingName[i][x]);
				data.push(stats.playerReceivingStats[i][x][1]);
				data.push(stats.playerReceivingStats[i][x][0]);
				data.push(stats.playerReceivingStats[i][x][2].toFixed(0));
				data.push(stats.playerReceivingStats[i][x][6]);
				data.push(stats.playerReceivingStats[i][x][9]);

				num = (100*stats.playerReceivingStats[i][x][0] / stats.playerReceivingStats[i][x][1]).toFixed(0);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num + "%");

				data.push(stats.playerReceivingStats[i][x][3].toFixed(0));
				data.push(stats.playerReceivingStats[i][x][4].toFixed(0));
				data.push(stats.playerReceivingStats[i][x][7]);
				data.push(stats.playerReceivingStats[i][x][8]);
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"k").innerHTML = stats.team_name[i] +" Kickers";
		if (stats.playerKickingName[i] != null) {
			var t = document.getElementById("scout-k"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerKickingName[i].length; x++) {
				var data = [];
				data.push(stats.playerKickingName[i][x]);
				data.push(stats.playerKickingStats[i][x][0]);
				data.push(stats.playerKickingStats[i][x][1].toFixed(0));
				num = (stats.playerKickingStats[i][x][1] / stats.playerKickingStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				num = (stats.playerKickingStats[i][x][5] / stats.playerKickingStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerKickingStats[i][x][2].toFixed(0));
				data.push(stats.playerKickingStats[i][x][3]);
				data.push(stats.playerKickingStats[i][x][4]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"pu").innerHTML = stats.team_name[i] +" Punters";
		if (stats.playerPuntingName[i] != null) {
			var t = document.getElementById("scout-pu"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPuntingName[i].length; x++) {
				var data = [];
				data.push(stats.playerPuntingName[i][x]);
				data.push(stats.playerPuntingStats[i][x][0]);
				data.push(stats.playerPuntingStats[i][x][1].toFixed(0));
				num = (stats.playerPuntingStats[i][x][1] / stats.playerPuntingStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				num = (stats.playerPuntingStats[i][x][5] / stats.playerPuntingStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerPuntingStats[i][x][2].toFixed(0));
				data.push(stats.playerPuntingStats[i][x][3]);
				data.push(stats.playerPuntingStats[i][x][4]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"kr").innerHTML = stats.team_name[i] +" Kick Returns";
		if (stats.playerKickReturnName[i] != null) {
			var t = document.getElementById("scout-kr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerKickReturnName[i].length; x++) {
				var data = [];
				data.push(stats.playerKickReturnName[i][x]);
				data.push(stats.playerKickReturnStats[i][x][0]);
				data.push(stats.playerKickReturnStats[i][x][1].toFixed(0));
				num = (stats.playerKickReturnStats[i][x][1] / stats.playerKickReturnStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				num = (100*stats.playerKickReturnStats[i][x][5] / stats.playerKickReturnStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerKickReturnStats[i][x][2].toFixed(0));
				data.push(stats.playerKickReturnStats[i][x][3]);
				data.push(stats.playerKickReturnStats[i][x][4]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"pr").innerHTML = stats.team_name[i] +" Punt Returns";
		if (stats.playerPuntReturnName[i] != null) {
			var t = document.getElementById("scout-pr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPuntReturnName[i].length; x++) {
				var data = [];
				data.push(stats.playerPuntReturnName[i][x]);
				data.push(stats.playerPuntReturnStats[i][x][0]);
				data.push(stats.playerPuntReturnStats[i][x][1].toFixed(0));
				num = (stats.playerPuntReturnStats[i][x][1] / stats.playerPuntReturnStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				num = (100*stats.playerPuntReturnStats[i][x][5] / stats.playerPuntReturnStats[i][x][0]).toFixed(1);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);
				data.push(stats.playerPuntReturnStats[i][x][2].toFixed(0));
				data.push(stats.playerPuntReturnStats[i][x][3]);
				data.push(stats.playerPuntReturnStats[i][x][4]);

				addRowToTable(t,data);
			}
			sortTable(t,1);
		}

		document.getElementById("team"+i+"pn").innerHTML = stats.team_name[i] +" Penalties";
		if (stats.playerPuntReturnName[i] != null) {
			var t = document.getElementById("scout-pn"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerPenaltyName[i].length; x++) {
				var data = [];
				data.push(stats.playerPenaltyName[i][x]);

				num = arraySum(stats.playerPenaltyStats[i][x],0);
				if (isNaN(num) == true) {
					num = 0;
				}
				data.push(num);

				data.push(stats.playerPenaltyStats[i][x][0]);
				//data.push(stats.playerPenaltyStats[i][x][1]);
				data.push(stats.playerPenaltyStats[i][x][2]);
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		document.getElementById("team"+i+"defr").innerHTML = stats.team_name[i] +" Run Defenders";
		if (stats.playerDefensiveRushName[i] != null) {
			var t = document.getElementById("scout-defr"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerDefensiveRushName[i].length; x++) {
				var data = [];
				data.push(stats.playerDefensiveRushName[i][x]);
				data.push(stats.playerDefensiveRushStats[i][x][0]);
				data.push(stats.playerDefensiveRushStats[i][x][1]);

				var num = (stats.playerDefensiveRushStats[i][x][2] / 
						stats.playerDefensiveRushStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) num = 0.00;
				data.push(num);

				data.push(stats.playerDefensiveRushStats[i][x][3]);
				data.push(stats.playerDefensiveRushStats[i][x][4]);
				//data.push(stats.playerDefensiveRushStats[i][x][5]);//FF
				if (arraySum(data,1) == 0) continue;
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		document.getElementById("team"+i+"defp").innerHTML = stats.team_name[i] +" Pass Defenders";
		if (stats.playerDefensivePassName[i] != null) {
			var t = document.getElementById("scout-defp"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerDefensivePassName[i].length; x++) {
				var data = [];
				data.push(stats.playerDefensivePassName[i][x]);
				data.push(stats.playerDefensivePassStats[i][x][0]);
				data.push(stats.playerDefensivePassStats[i][x][1]);

				var num = (stats.playerDefensivePassStats[i][x][2] / 
						stats.playerDefensivePassStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) num = 0.00;
				data.push(num);
				
				data.push(stats.playerDefensivePassStats[i][x][3]);
				data.push(stats.playerDefensivePassStats[i][x][4]);
				//data.push(stats.playerDefensivePassStats[i][x][5]); //FF
				data.push(stats.playerDefensivePassStats[i][x][6]); //INT
				data.push(stats.playerDefensivePassStats[i][x][7]);
				data.push(stats.playerDefensivePassStats[i][x][8]);
				if (arraySum(data,1) == 0) continue;
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		document.getElementById("team"+i+"defst").innerHTML = stats.team_name[i] +" Defenders";
		if (stats.playerDefensiveSTName[i] != null) {
			var t = document.getElementById("scout-defst"+i+"-table");
			while (t.rows.length > 2) {
				t.deleteRow(2);
			}
			for (x=0; x<stats.playerDefensiveSTName[i].length; x++) {
				var data = [];
				data.push(stats.playerDefensiveSTName[i][x]);
				data.push(stats.playerDefensiveSTStats[i][x][0]);
				data.push(stats.playerDefensiveSTStats[i][x][1]);

				var num = (stats.playerDefensiveSTStats[i][x][2] / 
						stats.playerDefensiveSTStats[i][x][0]).toFixed(2);
				if (isNaN(num) == true) num = 0.00;
				data.push(num);

				//data.push(stats.playerDefensiveSTStats[i][x][3]);
				if (arraySum(data,1) == 0) continue;
				addRowToTable(t,data);
			}
			sortTable(t,1);
		}
		
		if ((window.location+"").match("&mode=pbp") != null) {
			//drive table start
			document.getElementById('team'+i+"dr").innerHTML = stats.team_name[i] +" Drive Chart (not 100% correct)";
			if (stats.driveList[i] != null) {
				var t = document.getElementById("scout-dr"+i+"-table");
				while (t.rows.length > 2) {
					t.deleteRow(2);
				}
				for (x=0; x<stats.driveList[i].length; x++) {
					var drive = stats.driveList[i][x];
					var data = [];
					
					data.push(drive.startTime);
					var start = convertTime(drive.startTime);
					var end = convertTime(drive.endTime);
					if (start < end) start += 900;
					var time = start - end;
					var timestr = time%60 + "";
					while (timestr.length < 2) timestr = "0"+timestr;
					timestr = parseInt(time/60)+":"+timestr;
					data.push(timestr);
					
					data.push(drive.driveBegan);
					data.push(drive.numOfPlays);
					data.push(yardDiff(drive.driveBegan,drive.driveEnded));
					data.push(drive.result);
					addRowToTable(t,data);
				}
			}
			//drive table end
		}
		else {
			var t = document.getElementById("scout-dr"+i+"-table");
			t.setAttribute("style","visibility: hidden; display: none;");
		}
	}
}
