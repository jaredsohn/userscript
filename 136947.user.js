// ==UserScript==
// @name           mgkgkg
// @description    Versieht das Spiel an etlichen stellen mit Shortcuts, welche einem beim Farmen helfen!
// @description    Außerdem faerbt es Berichte mit Truppen, die voll zurueck gekehrt sind, farbig ein!
// @description    Desweitren ist es moeglich mithilfe der Tasten "Y, X und C" truppen im versammlungsplatz 
// ==/UserScript==

function fnExecuteScript(){
try{
	var strVersion="v7.1";
	
	var unitDesc = {
		"spear":"Lancier",
		"sword":"Porteurs d'\351p\351e",
		"axe":"Guerrier \340 la hache",
		"archer":"Archer",
		"spy":"\311claireur",
		"light":"Cavalerie l\351g\351re",
		"marcher":"Archer mont\351",
		"heavy":"Cavalerie lourde",
		"ram":"B\351lier",
		"catapult":"Catapulte",
		"knight":"Paladin",
		"snob":"Noble",
		"militia":"Milice",
		"offense":"Offensives",
		"defense":"D\351fensives"
	};
	
	function fnTranslate(id){
		var translation={
			"en":[
				"Train de nobles avec off",
				"Train de nobles avec def",
				"Autres Nobles",
				"Off pleine",
				"3/4 d'Off",
				"1/2 Off",
				"1/4 d'Off",
				"Off avec catapultes",
				"Def pleine",
				"3/4 de Def",
				"1/2 Def",
				"1/4 de Def",
				"Vilقرية ",
				"Village 3/قرية",
				"Village 1/قرية",
				"Village 1/قرية",
				"التالي",
				"Sommaire des troupes",
				"Arm\351es avec Noble",
				"Arm\351es offensives",
				"Arm\351es d\351fensives",
				"Arm\351es d'\351claireurs",
				"Autres arm\351es",
				"Unit\351s offensives",
				"Unit\351s d\351fensives",
				"Autres unit\351s",
				"Unit\351s totales",
				"Coordonn\351es des villages"
			]
		};
		
		/* Default to English "en". */
		var lang=typeof(translation[win.game_data.market]=="undefined")?"en":win.game_data.market;
		if(typeof(translation[lang][id])=="undefined"){
			return "";
		}
		
		return translation[lang][id];
	}

	function fnDebugLog(msg){win.$("body").append("<span>"+msg+"</span><br/>");}
	
	/* sendMethod = "GET" || "POST", params = json, type = xml,json,text */
	function fnAjaxRequest(url,sendMethod,params,type){
		var error=null,payload=null;
		
		win.$.ajax({
			"async":false,
			"url":url,
			"data":params,
			"dataType":type,
			"type":String(sendMethod||"GET").toUpperCase(),
			"error":function(req,status,err){error="ajax: " + status;},
			"success":function(data,status,req){payload=data;}
		});
	
		if(error){
			throw(error);
		}
		
		return payload;
	}

	function fnCreateConfig(name){return win.$(fnAjaxRequest("/interface.php","GET",{"func":name},"xml")).find("config");}
	function fnCreateWorldConfig(){return fnCreateConfig("get_config");}
	function fnCreateBuildingConfig(){return fnCreateConfig("get_building_info");}
	function fnCreateUnitConfig(){return fnCreateConfig("get_unit_info");}

	function fnHasArchers(){return (parseInt(win.game_data.worldConfig.find("game archer").text()||"0",10)>0);}
	function fnHasChurch(){return (parseInt(win.game_data.worldConfig.find("game church").text()||"0",10)>0);}
	function fnHasNotebook(){return (win.$('[src*="note.png"],[class*="note-icon"]').length>0);}
	function fnHasPaladin(){return (parseInt(win.game_data.worldConfig.find("game knight").text()||"0",10)>0);}
	function fnHasMilitia(){return (win.game_data.unitConfig.find("militia").length>0);}

	function fnGetTroopCount(){				
		/* returns an array of: {"x":"xxx","y":"yyy","coords":"xxx|yyy","troops":[0,0,0,0,0,0,0,0,0,0,0,0,0]} */

		/* Number of Columns - VillageColumn - ActionColumn */
		var gameVersion = parseFloat(win.game_data.version.match(/[\d|\.]+/g)[1]);
		var colCount = win.$('#units_table '+((gameVersion>=7.1)?'thead':'tbody:eq(0)')+' th').length - 2;
		var villageTroopInfo=[];
				
		win.$('#units_table tbody'+((gameVersion<7.1)?':gt(0)':'')).each(function(row,eleRow){
			/* Reset for next Village */
			var villageData={"troops":[0,0,0,0,0,0,0,0,0,0,0,0,0]};

			/* Village */
			coords=win.$(eleRow).find("td:eq(0)").text().match(/\d+\|\d+/g);
			coords=(coords?coords[coords.length-1].match(/(\d+)\|(\d+)/):null);
			villageData.x = parseInt(coords[1],10);
			villageData.y = parseInt(coords[2],10);
			villageData.coords = coords[0];

			/* Skip the Village Cell */
			win.$(eleRow).find("td:gt(0):not(:has(>a))").each(function(cell,eleCell){
				/* Skip the RowType Cell */
				if(cell%colCount){
					/* Ignore In the village (your own + foreign) */
					if(Math.floor(cell/colCount) != 1){
						villageData.troops[cell%colCount-1] += parseInt(win.$(eleCell).text()||"0",10);
					}
				}
			});

			/* Cache the Data */
			villageTroopInfo.push(villageData);
		});
			
		return villageTroopInfo;
	}

	function fnLogVersionInfo(){
		fnDebugLog("=========================");
		fnDebugLog("Sommaire des troupes : " + strVersion);
		fnDebugLog("=========================");
		fnDebugLog("Premium: "+(win.game_data.isPremium?"Oui":"Non"));
		fnDebugLog("\311glise : "+(fnHasChurch()?"Oui":"Non"));
		fnDebugLog("Statue : "+(fnHasPaladin()?"Oui":"Non"));
		fnDebugLog("Archers : "+(fnHasArchers()?"Oui":"Non"));
		fnDebugLog("Milice: "+(fnHasMilitia()?"Oui":"Non"));
		fnDebugLog("Sitteur : "+(win.location.href.match(/t\=\d+/i)?"Oui":"Non"));
		fnDebugLog("=========================");
		fnDebugLog("Version: "+win.game_data.version);
		fnDebugLog("Monde : "+win.game_data.world);
		fnDebugLog("Visite : "+win.game_data.screen);
		fnDebugLog("Mode   : "+win.game_data.mode);
		fnDebugLog("LIEN    : "+win.location.href);
		fnDebugLog("Nivagateur : "+navigator.userAgent);
		fnDebugLog("=========================");
	
		return true;
	}

	function fnCriteriaToStr(criteria){
		var valueStr = "";

		if(criteria && (criteria.length > 0)){
			for(var ii=0; ii < criteria.length; ii++){
				if(typeof(criteria[ii].minpop) != "undefined"){
					valueStr += (valueStr?" and ":"") + "(" + unitDesc[criteria[ii].unit] + "[pop] >= " + criteria[ii].minpop + ")";
				}
				if(typeof(criteria[ii].maxpop) != "undefined"){
					valueStr += (valueStr?" and ":"") + "(" + unitDesc[criteria[ii].unit] + "[pop] < " + criteria[ii].maxpop + ")";
				}
			}
		}
	
		return valueStr;
	}

	function fnCalculateTroopCount(){
		var maxGroups=17;
		var outputSummary = {
			"Full Train Nuke":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":400},{"unit":"offense","minpop":19600}],
				"descID":0
			},
			"Full Defense Train":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":400},{"unit":"defense","minpop":19600}],
				"descID":1
			},
			"Other Nobles":{
				"group":"Nobles",
				"criteria":[{"unit":"snob","minpop":100},{"unit":"defense","maxpop":19600},{"unit":"offense","maxpop":19600}],
				"descID":2
			},
			"Full Nuke":{
				"group":"Offensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":20000}],
				"descID":3
			},
			"Semi Nuke":{
				"group":"Offensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":15000,"maxpop":20000}],
				"descID":4
			},
			"Half Nuke":{
				"group":"Offensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":10000,"maxpop":15000}],
				"descID":5
			},
			"Quarter Nuke":{
				"group":"Offensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"offense","minpop":5000,"maxpop":10000}],
				"descID":6
			},
			"Cat Nuke":{
				"group":"Offensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"catapult","minpop":800},{"unit":"offense","minpop":20000}],
				"descID":7
			},
			"Full Defense":{
				"group":"Defensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":20000}],
				"descID":8
			},
			"Semi Defense":{
				"group":"Defensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":15000,"maxpop":20000}],
				"descID":9
			},
			"Half Defense":{
				"group":"Defensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":10000,"maxpop":15000}],
				"descID":10
			},
			"Quarter Defense":{
				"group":"Defensive",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"defense","minpop":5000,"maxpop":10000}],
				"descID":11
			},
			"Full Scout":{
				"group":"Scouts",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":20000}],
				"descID":12
			},
			"Semi Scout":{
				"group":"Scouts",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":15000,"maxpop":20000}],
				"descID":13
			},
			"Half Scout":{
				"group":"Scouts",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":10000,"maxpop":15000}],
				"descID":14
			},
			"Quarter Scout":{
				"group":"Scouts",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","minpop":5000,"maxpop":10000}],
				"descID":15
			},
			"Other":{
				"group":"Other",
				"criteria":[{"unit":"snob","maxpop":100},{"unit":"spy","maxpop":5000},{"unit":"defense","maxpop":5000},{"unit":"offense","maxpop":5000}],
				"descID":16
			}
		};	
	
		var ii,jj,village,total,index,count,unit,item,key,criteria,condition,isValid;
		var defense = ["spear","sword","heavy","catapult"];
		var offense = ["axe","light","ram","catapult"];
		
		if(fnHasMilitia()){
			defense.push("militia");
		}
		
		if(fnHasArchers()){
			defense.push("archer");
			offense.push("marcher");
		}
/*	
		if(fnHasPaladin()){
			offense.push("knight");
		}
*/	

		/* Initialize */
		var summary = {
			unitTotal:{"tally":0,"population":0},
			defense:{"tally":0,"count":0,"population":0,"coords":[]},
			offense:{"tally":0,"count":0,"population":0,"coords":[]}
		};
		
		win.$(win.game_data.unitConfig).children().each(function(i,e){
			summary[e.nodeName]={"tally":0,"count":0,"population":0,"coords":[]};
		});

		for(item in outputSummary){
			if(outputSummary.hasOwnProperty(item)){
				summary[item]={"tally":0,"count":0,"population":0,"coords":[]};
			}
		}
					
		var villageTroops = fnGetTroopCount();
		for(ii=0;ii<villageTroops.length;ii++){
			village = villageTroops[ii];
			total = {
				defense:{"tally":0,"count":0,"population":0,"coords":[]},
				offense:{"tally":0,"count":0,"population":0,"coords":[]}
			};

			win.$(win.game_data.unitConfig).children().each(function(i,e){
				total[e.nodeName]={"tally":0,"count":0,"population":0,"coords":[]};
			});
			
			/* Calculate total count & population for each unit type */
			index=0;
			win.$(win.game_data.unitConfig).children().each(function(i,e){
				var unit=e.nodeName;
				total[unit].count += village.troops[index];
				total[unit].population += village.troops[index]*parseInt(win.$(e).find("pop").text(),10);

				/* Defense */
				if (new RegExp('^(' + defense.join('|') + ')$').test(unit)){
					total.defense.count += total[unit].count;
					total.defense.population += total[unit].population;
				}
	
				/* Offense */
				if (new RegExp('^(' + offense.join('|') + ')$').test(unit)){
					total.offense.count += total[unit].count;
					total.offense.population += total[unit].population;
				}
			
				/* Units */
				summary[unit].count += total[unit].count;
				summary[unit].population += total[unit].population;
					
				/* All Units */
				summary.unitTotal.tally += total[unit].count;
				summary.unitTotal.population += total[unit].population;
			
				index++;
			});
		
			summary.defense.count += total.defense.count;
			summary.defense.population += total.defense.population;
		
			summary.offense.count += total.offense.count;
			summary.offense.population += total.offense.population;
				
			/* Calculate other summaries */
			for(item in outputSummary){
				if(outputSummary.hasOwnProperty(item)){
					isValid=true;
					
					for(jj=0;jj<outputSummary[item].criteria.length;jj++){
						criteria=outputSummary[item].criteria[jj];
						
						if(!((typeof(criteria.minpop)=="undefined")||!criteria.minpop||(total[criteria.unit].population>=criteria.minpop))){
							isValid=false;
						}
									
						if(!((typeof(criteria.maxpop)=="undefined")||!criteria.maxpop||(total[criteria.unit].population<criteria.maxpop))){
							isValid=false;
						}
					}
				
					if(isValid){
						summary[item].coords.push(village.coords);
						summary[item].tally++;
					}
				}
			}
		}
		
		var groupSummary={};
		for(item in outputSummary){
			if(outputSummary.hasOwnProperty(item)){
				if(typeof(groupSummary[outputSummary[item].group])=="undefined"){
					groupSummary[outputSummary[item].group]=[];
				}
				
				groupSummary[outputSummary[item].group].push(item);
			}
		}
		
		var curGroup=maxGroups;
		
		var docSource = "";
		docSource += "<!DOCTYPE HTML PUBLIC \"-//W3C//DTD HTML 4.01//EN\" \"http://www.w3.org/TR/html4/strict.dtd\">\n";
		docSource += "<html>\n";
		docSource += "\t<head>\n";
		docSource += "\t\t<title>Sommaire des troupes</title>\n";
		docSource += "\t\t<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\"/>\n";				

/*
		docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + win.location.hostname + "/style.php?type=game&amp;stamm_new_menu&amp;stamm&amp;overview&amp;1273236925\"/>\n";
*/
		docSource += "\t\t<link rel=\"stylesheet\" type=\"text/css\" href=\"http://" + win.location.hostname + "/merged/game.css\"/>\n";

		docSource += "\t\t<script type=\"text/javascript\">\n";
		docSource += "\t\t\t<!--\n";
		docSource += "\t\t\tfunction fnShowCoords(id,description){\n";
		docSource += "\t\t\t\tvar coords={};\n";
		for(item in outputSummary){
			if(outputSummary.hasOwnProperty(item)){
				if(summary[item].coords.length){
					docSource += "\t\t\t\tcoords[\"" + item + "\"] = \"" + summary[item].coords.join(" ") + "\";\n";
				}
			}
		}
		docSource += "\t\t\t\tdocument.getElementById(\"coords_group\").innerHTML = description;\n";
		docSource += "\n";
		docSource += "\t\t\t\tvar eleCoords = document.getElementById(\"coords_container\");\n";
		docSource += "\t\t\t\teleCoords.value = coords[id]?coords[id]:\"\";\n";
		docSource += "\t\t\t\teleCoords.focus();\n";
		docSource += "\t\t\t\teleCoords.select();\n";
		docSource += "\t\t\t}\n";		
		docSource += "\t\t\t-->\n";
		docSource += "\t\t</script>\n";
		docSource += "\t</head>\n";
		docSource += "\n";
		docSource += "\t<body>\n";
		docSource += "\t\t<table align=\"center\"><tr><td>\n";
		docSource += "\t\t\t<table class=\"content-border\"><tr><td>\n";
		docSource += "\t\t\t\t<table class=\"main\" width=\"100%\" align=\"center\">\n";
		docSource += "\t\t\t\t\t<tr>\n";
		docSource += "\t\t\t\t\t\t<td id=\"content_value\">\n";
		docSource += "\t\t\t\t\t\t\t<h2>" + fnTranslate(curGroup++) + "<sup><span style=\"font-size:small;\">" + strVersion + "</span></sup><sub><span style=\"font-weight:100;font-style:italic;text-decoration:none;font-size:x-small;\"><a href=\"http://www.crosstrigger.com\" target=\"_blank\"> Cr\351dit : dalesmckay</a></span></sub></h2>\n";
		docSource += "\t\t\t\t\t\t\t<hr>\n";

		docSource += "\t\t\t\t\t\t\t<table>\n";
		docSource += "\t\t\t\t\t\t\t\t<tr><td width=\"450\" valign=\"top\"><table class=\"vis\" width=\"100%\">\n";
		for(item in groupSummary){
			if(groupSummary.hasOwnProperty(item)){
				count=0;
				docSource += "<tr><th colspan=\"2\">" + fnTranslate(curGroup++) + "</th></tr>\n";
				for(jj=0;jj<groupSummary[item].length;jj++){
					docSource += "\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\">\n";
					docSource += "\t\t\t\t\t\t\t\t\t<td width=\"240\" style=\"white-space:nowrap;\"><a href=\"#\" onclick=\"fnShowCoords('" + groupSummary[item][jj] + "','" + fnTranslate(outputSummary[groupSummary[item][jj]].descID) + "');\" title=\"" + fnCriteriaToStr(outputSummary[groupSummary[item][jj]].criteria) + "\">&raquo;&nbsp; " + fnTranslate(outputSummary[groupSummary[item][jj]].descID) + "</a></td>\n";
					docSource += "\t\t\t\t\t\t\t\t\t<td width=\"240\"" + ((summary[groupSummary[item][jj]].tally>0)?"":" class=\"hidden\"") + " style=\"text-align:right;\"><span>" + summary[groupSummary[item][jj]].tally + "</span></td>\n";
					docSource += "\t\t\t\t\t\t\t\t</tr>\n";								
				}
			}
		}
		docSource += "\t\t\t\t\t\t\t</table>\n";
		docSource += "\t\t\t\t\t\t\t<td valign=\"top\">\n";
		
		/* Offensive Units */						
		docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
		docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
		count = 0;		
		for(key in offense){
			if(offense.hasOwnProperty(key)){
				docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"http://" + win.location.hostname + "/graphic/unit/unit_" + offense[key] + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[offense[key]].count + " " + unitDesc[offense[key]] + "</span></td></tr>\n";
			}
		}
		docSource += "\t\t\t\t\t\t\t\t</table>\n";
		
		/* Defensive Units */
		docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
		docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
		count = 0;		
		for(key in defense){
			if(defense.hasOwnProperty(key)){
				docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"http://" + win.location.hostname + "/graphic/unit/unit_" + defense[key] + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[defense[key]].count + " " + unitDesc[defense[key]] + "</span></td></tr>\n";
			}
		}
		docSource += "\t\t\t\t\t\t\t\t</table>\n";

		/* Other Units */
		docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
		docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
		count = 0;
		win.$(win.game_data.unitConfig).children().each(function(i,e){
			var unit=e.nodeName;
			if(!new RegExp('^(' + defense.join('|') + '|' + offense.join('|') + ')$').test(unit)){
				docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + ((count++%2)?"row_b":"row_a") + "\"><td><img src=\"http://" + win.location.hostname + "/graphic/unit/unit_" + unit + ".png?1\" alt=\"\"/></td><td style=\"white-space:nowrap;\"><span> " + summary[unit].count + " " + unitDesc[unit] + "</span></td></tr>\n";
			}
		});
		docSource += "\t\t\t\t\t\t\t\t</table>\n";
		
		/* Total Units */
		docSource += "\t\t\t\t\t\t\t\t<table class=\"vis\" width=\"100%\">\n";
		docSource += "\t\t\t\t\t\t\t\t\t<tr><th colspan=\"2\" style=\"white-space:nowrap;\">" + fnTranslate(curGroup++) + "</th></tr>\n";
		docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + "row_a" + "\"><td><span>Total:</span></td><td style=\"white-space:nowrap;\"><span> " + summary.unitTotal.tally + "</span></td></tr>\n";
		docSource += "\t\t\t\t\t\t\t\t\t<tr class=\"" + "row_b" + "\"><td><span>Population:</span></td><td style=\"white-space:nowrap;\"><span> " + summary.unitTotal.population + "</span></td></tr>\n";
		docSource += "\t\t\t\t\t\t\t\t</table>\n";

		docSource += "\t\t\t\t\t\t\t</td>\n";
		docSource += "\t\t\t\t\t\t</td>\n";
		docSource += "\t\t\t\t\t</tr>\n";
		docSource += "\t\t\t\t</table>\n";
		docSource += "\t\t\t\t<hr>\n";
		docSource += "\t\t\t\t<table id=\"coordinate_table\" class=\"vis\" style=\"width:100%;\">\n";
		docSource += "\t\t\t\t\t<tr><th>" + fnTranslate(curGroup++) + ": <span id=\"coords_group\" style=\"font-weight:100;\"></span>\n";
		docSource += "\t\t\t\t\t<tr><td style=\"padding:1em;\"><textarea id=\"coords_container\" style=\"width:100%;\"></textarea></td></tr>\n";
		docSource += "\t\t\t\t</table>\n";
		docSource += "\t\t\t</table>\n";
		docSource += "\t\t</table>\n";					
		docSource += "\t</body>\n";
		docSource += "</html>\n";

		var popup=win.open('about:blank','dalesmckay_tw_troopsummary','width=460,height=730,scrollbars=yes');
		popup.document.open('text/html','replace');
		popup.document.write(docSource);
		popup.document.close();
	}



	var win=(window.frames.length>0)?window.main:window;

	/* HACK: fix null mode */
	if(!win.game_data.mode){
		var vmode=win.$("#overview_menu td[class=selected] a").attr("href").match(/mode\=(\w*)/i);
		if(vmode){
			win.game_data.mode=vmode[1];
		}
	}
		
	win.game_data.isPremium=(win.$("#quickbar_outer").length>0);
	
	if(typeof(win.game_data.worldConfig)=="undefined"){
		win.game_data.worldConfig=fnCreateWorldConfig();
	}

	if(typeof(win.game_data.unitConfig)=="undefined"){
		win.game_data.unitConfig=fnCreateUnitConfig();
	}
	
	/* Todo: Handle different scripts by name */
	if(typeof(win.game_data.versionDumped)=="undefined"){
		win.game_data.versionDumped=fnLogVersionInfo();
	}
	
	if(win.game_data.mode != "units"){
		throw("Ce script doit \352tre lanc\351\ndepuis la page Aper\347u->Troupes");
	}

	fnCalculateTroopCount();

	void(0);
}
catch(objError){
	var errMsg=String(objError.message||objError||"");
	if(errMsg){
		fnDebugLog("Error: " + errMsg);
		alert("Error: " + errMsg);
	}
}}

fnExecuteScript();