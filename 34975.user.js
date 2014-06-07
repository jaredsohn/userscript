// ==UserScript==
// @name           Marketplace Filter
// @namespace      pbr
// @include        http://goallineblitz.com/game/market_free_agents.pl
// @include        http://glb.warriorgeneral.com/game/market_free_agents.pl
// @copyright      2010, pabst
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        13.12.29
// ==/UserScript==

window.setTimeout( 
	function() {
		loadPlayers();
		runFilter();
	}, 
	1000
);

var players = [];

function runFilter() {
	createFilterTable();
	createApplyButton();
}

function getTable() {
	var t = document.createElement("table");
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

function createRow(id) {
	var tr = createCheckBoxRow(id,["Min","Max"]);
	var btn = tr.cells[1].childNodes[0];
	btn.id = id+"minbutton";
	
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 7;
	txt.size = 7;
	txt.id = id+"min";
	tr.cells[1].appendChild(txt);
	
	var btn = tr.cells[2].childNodes[0];
	btn.id = id+"maxbutton";
	var txt = document.createElement("input");
	txt.setAttribute("type","text");
	txt.maxLength = 4;
	txt.size = 5;
	txt.id = id+"max";
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
	var el = document.getElementsByTagName("table");
	
	var t = getTable();
	el[0].parentNode.insertBefore(t,el[0]);

	var attr = ["Age","Strength","Speed","Agility","Jumping","Stamina","Vision","Confidence",
	            "Blocking","Tackling","Throwing","Catching","Carrying","Kicking","Punting"];
	for (var i=0; i<attr.length; i++) {
		var span = createRow(attr[i]);
		span.setAttribute("class","alternating_color"+((i%2)+1));
		t.appendChild(span);
	}
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
	while (tr.childNodes.length < 7) {
		td = document.createElement("td");
		td.innerHTML = "&nbsp;";
		tr.appendChild(td);
	}

	var btn = document.createElement("input");
	btn.setAttribute("type","button");
	btn.setAttribute("value","Apply");
	btn.addEventListener("click",input,false);
	var td = document.createElement("td");
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

function statFilter(val) {
	var result = true;
//	console.log("hey!"+val);
	var btn = document.getElementById(val+"minbutton");
	if (btn.checked == true) {
		var min = document.getElementById(val+"min");
		var m = parseFloat(min.value);
		if (isNaN(m) == false) {
			for (var i=1; i<players.length; i++) {
				//console.log(i+") "+players[i].arr[val]+"<"+m+" = "+(players[i].arr[val] < m));
				if (players[i].arr[val] < m) {
					setVisibility(players[i].ad,false);
				}
			}
		}
	}
	
	var btn = document.getElementById(val+"maxbutton");
	if (btn.checked == true) {
		var max = document.getElementById(val+"max");
		var m = parseFloat(max.value);
		if (isNaN(m) == false) {
			for (var i=1; i<players.length; i++) {
				//console.log(i+") "+players[i].arr[val]+">"+m+" = "+(players[i].arr[val] > m));
				if (players[i].arr[val] > m) {
					setVisibility(players[i].ad,false);
				}
			}
		}
	}
}

function input() {
	for (var i=1; i<players.length; i++) {
		setVisibility(players[i].ad,true);
	}
	var boxes = document.getElementsByClassName("pbpfilterbox");
	for (var i=0; i<boxes.length; i++) {
		if (boxes[i].checked == true) {
			var val = boxes[i].parentNode.parentNode.innerHTML;
			if (val.indexOf("Age") != -1) {
				statFilter("Age");
			}
			else if (val.indexOf("Strength") != -1) {
				statFilter("Strength");
			}
			else if (val.indexOf("Agility") != -1) {
				 statFilter("Agility");
			}
			else if (val.indexOf("Speed") != -1) {
				 statFilter("Speed");
			}
			else if (val.indexOf("Jumping") != -1) {
				 statFilter("Jumping");
			}
			else if (val.indexOf("Stamina") != -1) {
				 statFilter("Stamina");
			}
			else if (val.indexOf("Vision") != -1) {
				 statFilter("Vision");
			}
			else if (val.indexOf("Confidence") != -1) {
				 statFilter("Confidence");
			}
			else if (val.indexOf("Blocking") != -1) {
				 statFilter("Blocking");
			}
			else if (val.indexOf("Tackling") != -1) {
				 statFilter("Tackling");
			}
			else if (val.indexOf("Throwing") != -1) {
				 statFilter("Throwing");
			}
			else if (val.indexOf("Catching") != -1) {
				 statFilter("Catching");
			}
			else if (val.indexOf("Carrying") != -1) {
				 statFilter("Carrying");
			}
			else if (val.indexOf("Kicking") != -1) {
				 statFilter("Kicking");
			}
			else if (val.indexOf("Punting") != -1) {
				 statFilter("Punting");
			}
		}
	}
}

function setVisibility(p, isVisible) {
	//console.log(p.element);
	var style = p.getAttribute("style");
	if (style == null) {
		style = "";
	}
	else {
		while (style.indexOf("visibility: hidden;") != -1) {
			style = style.replace("visibility: hidden;"," ");
		}
		while (style.indexOf("display: none;") != -1) {
			style = style.replace("display: none;"," ");
		}
	}	
	
	if (isVisible == true) {
	}
	else {
		style += "visibility: hidden; display: none;";
	}
	p.setAttribute("style",style);
}

function cut(val, str) {
	var i = str.indexOf(val)+val.length;
	var j = str.slice(i).indexOf("<");
	if (j > 10) {
		j = str.slice(i).indexOf("'");
	}
	j += i;
	//console.log(i+"-"+j+":"+str.slice(i,j)+" -- "+str);
	var num = parseFloat(str.slice(i,j));
	if (isNaN(num) == true) return 0;
	else return num;
}

function loadPlayers() {
	var rows = document.getElementsByTagName("tr");
//	console.log(rows.length);
	for (var i=0; i<rows.length; i++) {
		var p = new Player();
		p.ad = rows[i];
		p.level = parseFloat(rows[i].cells[4].innerHTML);
		p.arr["Age"] = parseFloat(rows[i].cells[5].innerHTML);
		p.salary = parseFloat(rows[i].cells[6].innerHTML);
		p.bonus = parseFloat(rows[i].cells[7].innerHTML);
		//backup - 7
		//b-c - 8
		
		//share - 9
		p.arr["Strength"] = cut("Str: ",rows[i].cells[9].innerHTML);
		p.arr["Speed"] = cut("Spd: ",rows[i].cells[9].innerHTML);
		p.arr["Agility"] = cut("Agi: ",rows[i].cells[9].innerHTML);
		p.arr["Jumping"] = cut("Jmp: ",rows[i].cells[9].innerHTML);
		p.arr["Stamina"] = cut("Sta: ",rows[i].cells[9].innerHTML);
		p.arr["Vision"] = cut("Vis: ",rows[i].cells[9].innerHTML);
		p.arr["Confidence"] = cut("Conf: ",rows[i].cells[9].innerHTML);
		p.arr["Blocking"] = cut("Blk: ",rows[i].cells[9].innerHTML);
		p.arr["Tackling"] = cut("Tck: ",rows[i].cells[9].innerHTML);
		p.arr["Throwing"] = cut("Thw: ",rows[i].cells[9].innerHTML);
		p.arr["Catching"] = cut("Ctch: ",rows[i].cells[9].innerHTML);
		p.arr["Carrying"] = cut("Crry: ",rows[i].cells[9].innerHTML);
		p.arr["Kicking"] = cut("Kck: ",rows[i].cells[9].innerHTML);
		p.arr["Punting"] = cut("Pnt: ",rows[i].cells[9].innerHTML);
		players.push(p);
	}
}

function Player() {
	this.ad;
	this.level;
	this.salary;
	this.bonus;
	this.arr = new Array();
}

