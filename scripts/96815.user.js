// ==UserScript==
// @name           WoD - Spieler Statistik
// @namespace      Statistik
// @include        http://*.world-of-dungeons.de/wod/spiel//dungeon/report.php*
// ==/UserScript==
/*global document, unsafeWindow*/
var script = {
	contentTable 	: null,
	rows			: null,
	currentHero		: null,
	stat			: null,
	indexHero		: -1,
	develop 		: false,
	log				: function (log) {
		if (typeof(unsafeWindow) !== "undefined" && this.develop === true && unsafeWindow.console) {
			unsafeWindow.console.log(log);
		}
	},
	dir				: function (log) {
		if (typeof(unsafeWindow) !== "undefined" && this.develop === true) {
			unsafeWindow.console.dir(log);
		}
	},
	getElByClsName	: function (classname, node) {  
		var a, re, els, i, j;
		if (!node) {
			node = document.getElementsByTagName("body")[0];
		}
		a = [];     
		re = new RegExp('\\b' + classname + '\\b');
		els = node.getElementsByTagName("*");     
		for (i = 0, j = els.length; i < j; i = i + 1)  {    
			if (re.test(els[i].className)) {
				a.push(els[i]);  	
			}
		}
		return a;    
	},
	getMyHero		: function () {
		var el, hero;
		el = script.getElByClsName("font_Hero_Name"); 
		
		hero = el[0].alt;
		//hero = el.getElementsByTagName("alt");
		
		this.log("CurrentHero: ");
		this.log(hero);
		
		return hero;
	},
	getContentTable	: function () {
		var tables, i, result = null; 
		
		tables = script.getElByClsName("content_table");
		for (i = 0; i < tables.length; i = i + 1)
		{
			if (tables[i].nodeName === "TD") {
				result = tables[i];
				break;
			}
			
		}
		
		this.log("ContentTable: ");
		this.log(result);
		return result;
	},
	getRows			: function (contentTable) {
		var rows;
		
		rows = contentTable.getElementsByTagName("tr");
		
		this.log("Rows:");
		this.log(rows);
		
		return rows;
	},
	getCurrentIndex	: function (rows) {
		var nodes, index, i, j;
		
		for (i = 0; i < rows.length; i = i + 1)
		{
			nodes = rows[i].childNodes;
			index = -1;
			for (j = 0; j < nodes.length; j = j + 1)
			{
				if (nodes[j].textContent === script.hero) {
					index = j;
					break;
				}
			}
			if (index !== -1) {
				break;
			}
		}
		
		this.log("Index:");
		this.log(index);
		
		return index;
	},
	getStatProp		: function (nodes, i, stat) {
		
		switch (i) {
		case 1:
			stat.Erfahrung = nodes.firstChild.firstChild.textContent; 
			break;
		case 2:
			stat.Gold = nodes.firstChild.textContent;
			break;
		case 3:
			stat.Ruhm = nodes.firstChild.textContent;
			break;
		case 4:
			stat.Level = nodes.firstChild.textContent;
			break;
		case 5:
			stat.Raume = nodes.firstChild.textContent;
			break;
		case 6:
			stat.Geschafft = nodes.firstChild.textContent;
			break;
		case 7:
			stat.Kampfkonfig = nodes.firstChild.textContent;						
			break;
		case 11:
			stat.Angriff_Nahkampf = nodes.firstChild.textContent;
			break;
		case 12:
			stat.Angriff_Fernkampf = nodes.firstChild.textContent;
			break;
		case 13:
			stat.Angriff_Magisch = nodes.firstChild.textContent;
			break;
		case 16:
			stat.Trefferquote_Nahkampf = nodes.firstChild.textContent;
			break;
		case 17:
			stat.Trefferquote_Fernkampf = nodes.firstChild.textContent;
			break;
		case 18:
			stat.Trefferquote_Magisch = nodes.firstChild.textContent;
			break;
		case 21:
			if (nodes.childNodes.length > 1) {
				stat.Schaden_Nahkampf = nodes.childNodes[0].textContent + nodes.childNodes[1].textContent + nodes.childNodes[2].textContent;
			} else {
				stat.Schaden_Nahkampf = "-";
			}
			break;
		case 22:
			if (nodes.childNodes.length > 1) {
				stat.Schaden_Fernkampf = nodes.childNodes[0].textContent + nodes.childNodes[1].textContent + nodes.childNodes[2].textContent;
			} else {
				stat.Schaden_Fernkampf = "-";
			}
			break;
		case 23:
			if (nodes.childNodes.length > 0) {
				stat.Schaden_Magisch = nodes.childNodes[0].textContent + nodes.childNodes[1].textContent + nodes.childNodes[2].textContent;
			} else {
				stat.Schaden_Magisch = "-";
			}
			break;
		}
		return stat;
	},
	getStat			: function (index, rows) {
		var i, nodes, stat = {};

		for (i = 0; i < rows.length; i = i + 1)
		{
			nodes = rows[i].childNodes[index];
			stat = this.getStatProp(nodes, i, stat);
		}
		
		this.log("Statistik:");
		this.dir(stat);
		
		return stat;
	},
	createBar		: function (wert) {
		var bar, wertAsInteger;
		if (isNaN(parseInt(wert, 10)) === false) {
			bar = '<div style="width: 100px; border: 1px solid gray; height: 13px;"><div style="font-size: 9px; position: absolute; text-align: center; width: 100px;">' + wert + ' / 100%</div><div style="width: ' + parseInt(wert, 10) + 'px; height: 13px; background-color: CadetBlue;"></div></div>';
		} else {
			bar = '-';
		}
		return bar;
	},
	paintTable		: function () {
		var el, html, oldText, item, newHTML;
		
		el = this.getElByClsName("gadget_body");
		oldText =  el[2].innerHTML;	
		
		newHTML = '<h2>Eigene Statistik</h2><table border="0" style="font-family: Georgia;"><tr>' +
				'<td id="statCol1" style="width:250px;"></td>' +
				'<td style="width:50px"></td>' +
				'<td id="statCol2" style="width:250px; vertical-align:top;"></td>' +
				'<td id="statCol3"></td>' +
				'</tr></table>';
		el[2].innerHTML =  newHTML  +  el[2].innerHTML;
	},
	paintInTable	: function (stat) {
		var item, label, headerAngriff = false, headerTreff = false, headerDmg = false, 
			col1 = '<table width="100%;">',
			col2 = '<table width="100%;">';
		
		for (item in stat) {
			if (stat.hasOwnProperty(item)) {
				if (item === "Kampfkonfig" || item === "Erfahrung" || item === "Gold" ||
					item === "Ruhm" || item === "Level" || item === "Raume" || item === "Geschafft")
				{
					col1 += '<tr><th style="text-align:left;">' + item + '</th><td style="text-align:right;">' + stat[item]  + '</td></tr>';
				}
				else if (item === "Angriff_Nahkampf" || item === "Angriff_Fernkampf"  || item === "Angriff_Magisch") {
					
					if (headerAngriff === false) {
						col2 += '<tr><td colspan="2"><b><u>Angriffe</b></td><td></td></tr><tr>';
						headerAngriff = true;
					}
					if (stat[item] !== "-") {
						label = item.replace(/Angriff_/g, "");
						col2 += '<tr><th style="text-align:left;">' + label + '</th><td style="text-align:right;">' + stat[item]  + '</td></tr>';
					}
				}
				else if (item === "Trefferquote_Nahkampf" || item === "Trefferquote_Fernkampf"  || item === "Trefferquote_Magisch") {
					if (headerTreff === false) {
						col2 += '<tr><td colspan="2" style="padding-top:5px;"><u><b>Trefferquote</b></td><td></td></tr><tr>';
						headerTreff = true;
					}
				else if (stat[item] !== "-") {
						label = item.replace(/Trefferquote_/g, "");
						stat[item] = this.createBar(stat[item]);
						col2 += '<tr><th style="text-align:left;">' + label + '</th><td style="text-align:right;float:right;">' + stat[item]  + '</td></tr>';
					}
				}
				else if (item === "Schaden_Nahkampf" || item === "Schaden_Fernkampf"  || item === "Schaden_Magisch") {
					
					if (headerDmg === false) {
						col2 += '<tr><td colspan="2" style="padding-top:5px"><b><u>Schaden</b></td><td></td></tr><tr>';
						headerDmg = true;
					}
					if (stat[item] !== "-") {
						label = item.replace(/Schaden_/g, "");
						col2 += '<tr><th style="text-align:left;">' + label + '</th><td style="text-align:right;">' + stat[item]  + '</td</tr>';
					}
				}
			}
		}
		col1 += '</table>';
		col2 += '</table>';
		document.getElementById("statCol1").innerHTML = col1;
		document.getElementById("statCol2").innerHTML = col2;
	},	
	paintInBody		: function (stat) {
		var el, html, oldText, item;
		
		
		el = this.getElByClsName("gadget_body"); 
 
		html = '<h2>Eigene Statistik</h2><table style="height: 200px; width: 240px;">';
		for (item in stat) {
			if (stat.hasOwnProperty(item)) {
				if (item === "Angriff_Nahkampf")
				{
					
					html += '</table><table style="top: 50px; height: 200px; position: absolute; left: 270px;">';
				}
				if (item === "Trefferquote_Magisch" || item === "Trefferquote_Fernkampf"  || item === "Trefferquote_Nahkampf") {
					stat[item] = this.createBar(stat[item]);
				}
				html += '<tr><th style="text-align:left;">' + item + '</th><td>' + stat[item]  + '</td</tr>';
			}
		}
		
		html += "</table>";
		
		
		
		oldText =  el[2].innerHTML;


		el[2].innerHTML =  html  +  el[2].innerHTML;
		
		

	},
	isStatistik		: function () {
		var hs, i, isStatistikValue = false;
		hs = document.getElementsByTagName("h1");
		for (i = 0; i < hs.length; i = i + 1) {
			if (hs[i].firstChild.textContent === "Kampfstatistik: ") {
				isStatistikValue = true;
				break;
			}
		}
		return isStatistikValue;
	},
	init			: function () {
		if	(this.isStatistik() === true) {
			this.hero = this.getMyHero();
			this.contentTable = this.getContentTable();
			this.rows = this.getRows(this.contentTable);
			this.indexHero = this.getCurrentIndex(this.rows);
			this.stat = this.getStat(this.indexHero, this.rows);
			this.paintTable();
			this.paintInTable(this.stat);
		}
	}
};
script.init();

