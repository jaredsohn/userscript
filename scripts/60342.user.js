// ==UserScript==
// @name           Game Log Fantasy Points
// @namespace      KHMI - Greasemonkey
// @include        http://sports.yahoo.com/nfl/players/*/gamelog*
// @include        http://football.fantasysports.yahoo.com/*/*/settings
// ==/UserScript==

var leagueID;
var settingsRe = new RegExp;
var gamelogRe = new RegExp;
settingsRe = /^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/settings/i;
gamelogRe = /^http\:\/\/sports\.yahoo\.com\/nfl\/players\/\d{1,7}\/gamelog(;_\w{3}=\w{23}\.\w{4})?/i;

// get league ID
if (location.href.match("/f1/"))
	var leagueID = location.href.split("/f1/")[1].split("/")[0];
else if (location.href.match("/f2/"))
	var leagueID = location.href.split("/f2/")[1].split("/")[0];

// remember which league you are currently viewing
if(leagueID)
	GM_setValue("leagueID", leagueID);

// league settings page, save the league name, ID, and settings
if(location.href.match(settingsRe) && leagueID) {
	var settingNames = [];
	var settingValues = [];
	
	settingNames = createSettingArray();
	
	// find league ID and name
	var table = document.getElementById("settings-table");
	
	var leagueName = table.rows[2].cells[1].innerHTML;
	leagueName = leagueName.replace("<b>", "");
	leagueName = leagueName.replace("</b>", "");
	
	// save league name and ID
	settingValues.push(leagueID);
	settingValues.push(leagueName);
	
	// find and save the league settings
	table = document.getElementById("settings-stat-mod-table");
	
	for(var j=1;j<table.childNodes.length;j=j+4) {
		var thead = table.childNodes[j];
		var tbody = table.childNodes[j+2];
		var section = thead.rows[0].cells[0].innerHTML
		
		switch(thead.rows[0].cells[0].innerHTML) {
			case "Offense":
			case "Kickers":
			case "Defensive Players":
				for(var i=0;i<tbody.rows.length;i++) {
					var leagueValue = tbody.rows[i].cells[1].innerHTML;
					leagueValue = leagueValue.replace("<b>", "");
					leagueValue = leagueValue.replace("</b>", "");
					
					if(leagueValue.length > 6) {
						// bonus offense points - ie 40 yards per point; 10 points at 300 yards; 15 points at 350 yards; 20 points at 400 yards
						var splits = leagueValue.split(";");
						var temp = splits[0].split(" ")[0];
						for(var a=1;a<splits.length;a++) {
							temp = temp + "/" + splits[a].split(" ")[1] + "-" + splits[a].split(" ")[4];
						}
						leagueValue = temp;						
					}					
					settingValues[settingNames.indexOf(tbody.rows[i].cells[0].innerHTML)] = leagueValue;
				}
			break;
		}
	}
	
	GM_setValue(leagueID + "settings", settingValues.join());
}

// player gamelog
if(location.href.match(gamelogRe) && document.body.innerHTML.indexOf("No stats available") < 0) {
	// get the saved leagueID
	leagueID = GM_getValue("leagueID", false);
	
	// find player position
	var pos = getElements("li", "class", "position");
	var position = pos[0].innerHTML.toLowerCase();
	
	// get settings
	var savedValues = GM_getValue(leagueID + "settings", false);	
	
	if(savedValues) {
		var settingValues = savedValues.split(",");
		var settingNames = createSettingArray();
		var tableNumber = 2;
		
		createPopup(settingNames, settingValues)
		
		if(document.body.innerHTML.indexOf("Playoff Stats") >= 0){
			tableNumber = 3;
		}
		
		var tables, table;   
		tables = document.getElementsByTagName('table');
		
		// add the league name to help user know which stats are being used
		table = tables[tableNumber];
		table.rows[0].deleteCell(0);
		var newcell = table.rows[0].insertCell(0);
		newcell.align = "right";		
		//newcell.innerHTML = "fantasy points generated using settings from <b>" + settingValues[1] +"</b>";		
		
		var settingsSpan = document.createElement('span');
		settingsSpan.style.cursor = "pointer";
		settingsSpan.innerHTML =  "fantasy points generated using settings from <b>" + settingValues[1] +"</b>";
		
		// add mouseover and mouseout even to display/hide the current league settings
		settingsSpan.addEventListener('mouseover',function (e) {
		  toggle();
		},false);
		
		settingsSpan.addEventListener('mouseout',function (e) {
		  toggle();
		},false);
		
		newcell.appendChild(settingsSpan);

		table = tables[tableNumber+1];
		
		switch(position) {
			case "quarterback":
				// 3, 4
				addHeading(table, 9, 25);
				calcQBPoints(table, settingValues)				
			break;
			case "running back":
				// 3, 4
				addHeading(table, 7, 19);
				calcRBPoints(table, settingValues)
			break;
			case "wide receiver":
				// 2, 3
				addHeading(table, 9, 25);
				calcWRPoints(table, settingValues)
			break;
			case "tight end":
				addHeading(table, 7, 19);
				calcTEPoints(table, settingValues)
			break;
			case "kicker":
				addHeading(table, 7, 20);
				calcKPoints(table, settingValues)
			break;
			default: // LB, DE, DT, S, CB
				addHeading(table, 9, 18);
				calcDPoints(table, settingValues)
		}		
	}	
}

function calcDPoints(table, settingValues) {
	var weekTotal;
	var grandTotal = 0;
	var cell;
	var stat;
	
	for(var j=2;j<19;j++) {
		weekTotal = 0;
		for(var i=4;i<18;i++){			
			cell = table.rows[j].cells[i];
			stat = parseFloat(cell.innerHTML);

			switch(i) {
				case 4: // Solo Tackles
					if(settingValues[32].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[32]));
				break;
				case 5: // Tackle Assists
					if(settingValues[33].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[33]));
				break;
				case 8: // Sacks
					if(settingValues[34].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[34]));
				break;
				case 11: // Interceptions
					if(settingValues[35].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[35]));
				break;
				case 13: // Defensive Touchdown
					if(settingValues[38].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[38]));
				break;
				case 15: // Forced Fumbles
					if(settingValues[36].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[36]));
				break;
				case 16: // Pass Defences
					if(settingValues[40].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[40]));
				break;
			}		
		}
		cell = table.rows[j].insertCell(18);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = weekTotal.toFixed(2);
		
		cell = table.rows[j].insertCell(19);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = "&nbsp;";
		
		grandTotal = grandTotal + weekTotal;
	}
	
	cell = table.rows[19].insertCell(15);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = grandTotal.toFixed(2);
	
	cell = table.rows[19].insertCell(16);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";
}

function calcKPoints(table, settingValues) {
	var weekTotal;
	var grandTotal = 0;
	var cell;
	var stat;
	
	for(var j=2;j<19;j++) {
		weekTotal = 0;
		for(var i=4;i<19;i++){			
			cell = table.rows[j].cells[i];
			stat = cell.innerHTML.split("-");

			switch(i) {
				case 4: // 0-19
					if(settingValues[20].length > 0 && stat.length > 1){
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[20]));
						if(settingValues[25] != "")
							weekTotal = parseFloat(weekTotal) + (parseFloat(stat[1])-parseFloat(stat[0])) * parseFloat(settingValues[25]);
					}
				break;
				case 5: // 20-29					
					if(settingValues[21].length > 0 && stat.length > 1){
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[21]));
						if(settingValues[26] != "")
							weekTotal = parseFloat(weekTotal) + (parseFloat(stat[1])-parseFloat(stat[0])) * parseFloat(settingValues[26]);
					}
				break;
				case 6: // 30-39					
					if(settingValues[22].length > 0 && stat.length > 1){
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[22]));
						if(settingValues[27] != "")
							weekTotal = parseFloat(weekTotal) + (parseFloat(stat[1])-parseFloat(stat[0])) * parseFloat(settingValues[27]);
					}
				break;
				case 7: // 40-49
					if(settingValues[23].length > 0 && stat.length > 1){
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[23]));
						if(settingValues[28] != "")
							weekTotal = parseFloat(weekTotal) + (parseFloat(stat[1])-parseFloat(stat[0])) * parseFloat(settingValues[28]);
					}
				break;
				case 8: // 50+
					if(settingValues[24].length > 0 && stat.length > 1){
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[24]));
						if(settingValues[29] != "")
							weekTotal = parseFloat(weekTotal) + (parseFloat(stat[1])-parseFloat(stat[0])) * parseFloat(settingValues[29]);
					}
				break;
				case 14: // extra point made
					if(settingValues[30].length > 0 && stat.length > 0 && stat[0] != "&nbsp;")
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[30]));
				break;
				case 15: // extra point missed
					if(settingValues[31].length > 0 && stat.length > 0 && stat[0] != "&nbsp;")
						weekTotal = parseFloat(weekTotal) + (parseFloat(stat[0]) * parseFloat(settingValues[31]));
				break;
			}		
		}
		cell = table.rows[j].insertCell(20);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = weekTotal.toFixed(2);
		
		cell = table.rows[j].insertCell(21);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = "&nbsp;";
		
		grandTotal = grandTotal + weekTotal;
	}
	
	cell = table.rows[19].insertCell(17);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = grandTotal.toFixed(2);
	
	cell = table.rows[19].insertCell(18);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";
}

function calcTEPoints(table, settingValues) {
	var weekTotal;
	var grandTotal = 0;
	var cell;
	var stat;
	
	for(var j=2;j<19;j++) {
		weekTotal = 0;
		for(var i=4;i<19;i++){			
			cell = table.rows[j].cells[i];
			stat = parseFloat(cell.innerHTML);

			switch(i) {
				case 4: // Receptions
					if(settingValues[12].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[12]));
				break;
				case 5: // Receiving Yards
					if(settingValues[13].length > 0 && stat > 0){
						var splits = settingValues[13].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 8: // Receiving Touchdowns
					if(settingValues[14].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[14]));
				break;
				case 10: // Rushing Attempts
					if(settingValues[9].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[9]));
				break;
				case 11: // Rushing Yards
					if(settingValues[10].length > 0 && stat > 0){
						var splits = settingValues[10].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 14: // Rushing Touchdowns
					if(settingValues[11].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[11]));
				break;
				case 16: // Fumbles
					if(settingValues[18].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[18]));
				break;
				case 17: // Fumbles Lost
					if(settingValues[19].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[19]));
				break;
			}
		}
		cell = table.rows[j].insertCell(19);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = weekTotal.toFixed(2);
		
		cell = table.rows[j].insertCell(20);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = "&nbsp;";
		
		grandTotal = grandTotal + weekTotal;
	}
	
	cell = table.rows[19].insertCell(16);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = grandTotal.toFixed(2);
	
	cell = table.rows[19].insertCell(17);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";
}

function calcWRPoints(table, settingValues) {
	var weekTotal;
	var grandTotal = 0;
	var cell;
	var stat;
	
	for(var j=2;j<19;j++) {
		weekTotal = 0;
		for(var i=4;i<19;i++){			
			cell = table.rows[j].cells[i];
			stat = parseFloat(cell.innerHTML);

			switch(i) {
				case 4: // Receptions
					if(settingValues[12].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[12]));
				break;
				case 5: // Receiving Yards
					if(settingValues[13].length > 0 && stat > 0){
						var splits = settingValues[13].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 8: // Receiving Touchdowns
					if(settingValues[14].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[14]));
				break;
				case 11: // Return Yards(kickoff)
					if(settingValues[15].length > 0 && stat > 0){
						var splits = settingValues[15].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 14: // Return Touchdowns(kickoff)
					if(settingValues[16].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[16]));
				break;
				case 17: // Return Yards(punt)
					if(settingValues[15].length > 0 && stat > 0){
						var splits = settingValues[15].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 20: // Return Touchdowns(punt)
					if(settingValues[16].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[16]));
				break;
				case 22: // Fumbles
					if(settingValues[18].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[18]));
				break;
				case 23: // Fumbles Lost
					if(settingValues[19].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[19]));
				break;
			}
		}
		cell = table.rows[j].insertCell(25);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = weekTotal.toFixed(2);
		
		cell = table.rows[j].insertCell(26);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = "&nbsp;";
		
		grandTotal = grandTotal + weekTotal;
	}
	
	cell = table.rows[19].insertCell(22);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = grandTotal.toFixed(2);
	
	cell = table.rows[19].insertCell(23);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";
}

function calcRBPoints(table, settingValues) {
	var weekTotal;
	var grandTotal = 0;
	var cell;
	var stat;
	
	for(var j=2;j<19;j++) {
		weekTotal = 0;
		for(var i=4;i<19;i++){			
			cell = table.rows[j].cells[i];
			stat = parseFloat(cell.innerHTML);

			switch(i) {
				case 4: // Rushing Attempts
					if(settingValues[9].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[9]));
				break;
				case 5: // Rushing Yards
					if(settingValues[10].length > 0 && stat > 0){
						var splits = settingValues[10].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 8: // Rushing Touchdowns
					if(settingValues[11].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[11]));
				break;
				case 10: // Receptions
					if(settingValues[12].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[12]));
				break;
				case 11: // Receiving Yards
					if(settingValues[13].length > 0 && stat > 0){
						var splits = settingValues[13].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 14: // Receiving Touchdowns
					if(settingValues[14].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[14]));
				break;
				case 16: // Fumbles
					if(settingValues[18].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[18]));
				break;
				case 17: // Fumbles Lost
					if(settingValues[19].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[19]));
				break;
			}
		}
		cell = table.rows[j].insertCell(19);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = weekTotal.toFixed(2);
		
		cell = table.rows[j].insertCell(20);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = "&nbsp;";
		
		grandTotal = grandTotal + weekTotal;
	}
	
	cell = table.rows[19].insertCell(16);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = grandTotal.toFixed(2);
	
	cell = table.rows[19].insertCell(17);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";
}

function calcQBPoints(table, settingValues) {
	var weekTotal;
	var grandTotal = 0;
	var cell;
	var stat;
	
	for(var j=2;j<19;j++) {
		weekTotal = 0;
		for(var i=5;i<25;i++){
			cell = table.rows[j].cells[i];
			stat = parseFloat(cell.innerHTML);			

			switch(i) {
				case 5: // Completions
					if(settingValues[2].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[2]));
				break;
				case 6: // Passing Attempts
					if(settingValues[4].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[4]));
				break;
				case 7: // Passing Yards
					if(settingValues[3].length > 0 && stat > 0){
						var splits = settingValues[3].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 10: // Interceptions
					if(settingValues[7].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[7]));
				break;
				case 11: // Passing Touchdowns
					if(settingValues[6].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[6]));
				break;
				case 13: // Rushing Attempts
					if(settingValues[9].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[9]));
				break;
				case 14: // Rushing Yards					
					if(settingValues[10].length > 0 && stat > 0){
						var splits = settingValues[10].split("/");
						weekTotal = parseFloat(weekTotal) + (stat/parseFloat(splits[0]));						
						for(var b=1;b<splits.length;b++) {
							var bonus = splits[b].split("-");
							if(stat >= parseInt(bonus[1]))
								weekTotal = weekTotal + parseFloat(bonus[0]);
						}
					}
				break;
				case 17: // Rushing Touchdowns
					if(settingValues[11].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[11]));
				break;
				case 19: // Sacked
					if(settingValues[8].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[8]));
				break;
				case 22: // Fumbles
					if(settingValues[18].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[18]));
				break;
				case 23: // Fumbles Lost
					if(settingValues[19].length > 0 && stat > 0)
						weekTotal = parseFloat(weekTotal) + (stat * parseFloat(settingValues[19]));
				break;
			}		
		}
		cell = table.rows[j].insertCell(25);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = weekTotal.toFixed(2);
		
		cell = table.rows[j].insertCell(26);
		cell.className = "yspscores";
		cell.height = "16";
		cell.innerHTML = "&nbsp;";
		
		grandTotal = grandTotal + weekTotal;
	}
	
	cell = table.rows[19].insertCell(22);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = grandTotal.toFixed(2);
	
	cell = table.rows[19].insertCell(23);
	cell.className = "yspscores";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";
}

function addHeading(table, x, y) {
	var cell = table.rows[0].insertCell(x);
	cell.className = "yspwhitebg"
	cell.width = "1"
	cell.rowSpan = "20"
	cell.innerHTML = "<spacer width=\"1\" height=\"1\" type=\"block\"/>";

	cell = table.rows[0].insertCell(x+1);
	cell.className = "ysptblhdr";
	cell.colSpan = "2";
	cell.innerHTML = "FPts";

	cell = table.rows[1].insertCell(y);
	cell.className = "yspdetailttl";
	cell.height = "16";
	cell.innerHTML = "&nbsp;";

	cell = table.rows[1].insertCell(y+1);
	cell.height = "16";
	cell.innerHTML = "&nbsp;";	
}

function getElements(element, classname, value){      
   var elements = [];   
   var xpathExp = "//" + element;   
   
   if(classname != undefined)
      if(value != undefined)
         xpathExp = xpathExp + "[@" + classname + "='" + value + "']";
      else
         xpathExp = xpathExp + "[@" + classname + "]";  
         
   var allElements = document.evaluate(xpathExp, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
   for (var i = 0; i < allElements.snapshotLength; i++)
      elements.push(allElements.snapshotItem(i))
      
   return elements;
}

function createSettingArray() {
	var settingNames = [];	
	settingNames.push("LeagueID");
	settingNames.push("LeagueName");
	settingNames.push("Completions");
	settingNames.push("Passing Yards");
	settingNames.push("Passing Attempts");
	settingNames.push("Incomplete Passes");
	settingNames.push("Passing Touchdowns");
	settingNames.push("Interceptions");
	settingNames.push("Sacks");
	settingNames.push("Rushing Attempts");
	settingNames.push("Rushing Yards");
	settingNames.push("Rushing Touchdowns");
	settingNames.push("Receptions");
	settingNames.push("Reception Yards");
	settingNames.push("Reception Touchdowns");
	settingNames.push("Return Yards");
	settingNames.push("Return Touchdowns");
	settingNames.push("2-Point Conversions");
	settingNames.push("Fumbles");
	settingNames.push("Fumbles Lost");
	settingNames.push("Field Goals 0-19 Yards");
	settingNames.push("Field Goals 20-29 Yards");
	settingNames.push("Field Goals 30-39 Yards");
	settingNames.push("Field Goals 40-49 Yards");
	settingNames.push("Field Goals 50+ Yards");
	settingNames.push("Field Goals Missed 0-19 Yards");
	settingNames.push("Field Goals Missed 20-29 Yards");
	settingNames.push("Field Goals Missed 30-39 Yards");
	settingNames.push("Field Goals Missed 40-49 Yards");
	settingNames.push("Field Goals Missed 50+ Yards");
	settingNames.push("Point After Attempt Made");
	settingNames.push("Point After Attempt Missed");
	settingNames.push("Tackle Solo");
	settingNames.push("Tackle Assist");
	settingNames.push("Sack");
	settingNames.push("Interception");
	settingNames.push("Fumble Force");
	settingNames.push("Fumble Recovery");
	settingNames.push("Defensive Touchdown");
	settingNames.push("Safety");
	settingNames.push("Pass Defended");
	settingNames.push("Block Kick");
	
	return settingNames;	
}

function createPopup(settingNames, settingValues) {
	var wint = (screen.height-300)/2;
	var winl = (screen.width-300)/2 - 300;
	
	var style = 'display:none;padding:5px;border:1px solid #A0A0A0;position:absolute;top:200px;left:'+ winl +'px;;background-color:#FBFBF8;width:300px; height:675px;z-index: 9002;}'
	
	var html = "";	
	for(var i=0;i<settingNames.length;i++){
		var value = settingValues[i];
		if(value == "")
			value = "0";
		html = html + settingNames[i] + " = " + value + "<br>";
	}
	
	// create and insert the popup
	var popUp = document.createElement('div');
	popUp.setAttribute("id","popUp");
	popUp.setAttribute("style",style);
	popUp.innerHTML = html;

	document.body.insertBefore(popUp, document.body.firstChild);
}

function toggle() {   
	var popUp = document.getElementById("popUp");
	if ( popUp.style.display == 'none' ){
      popUp.style.display = 'block';
   }else{
      popUp.style.display = 'none';
   }
}