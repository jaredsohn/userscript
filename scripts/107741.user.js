// ==UserScript==
// @name		DSHotkeys And Functions
// @namespace	DSLife             
// @description	Version 1.0 | Das Skript fuegt Hotkeys auf dem Versammlungsplatz hinzu, beinhaltet Letztes Dorf fuer den VP, verkuerzt Links auf der Karte und generiert BB Codes auf der Karte
// @include		http://de*.die-staemme.de/*
// ==/UserScript==

(function() {
var lib = new Knish3rDSLib("DS Hotkeys And Functions");
var version = "Hotkeys und Funktionen 1.0";
var gui = {
    de: {
        		targetForum: "Forum",
        		mouseoverTitle: ["Ins Forum zum Thema ", " wechseln"],
        		deleteData: "Daten löschen",
        		deleteConfirm: "Sollen wirklich alle Daten dieser Welt gelöscht werden?",
        		deleted: "Alle Daten auf dieser Welt gelöscht!",
			target_support: "Unterstützen [U]",
			target_attack:  "OK [&crarr;]",
			lastVillage: "&raquo; Letztes [Z]",
			lastVillageLink: "Letztes Dorf im VP",
			bbcode: "BB Code",
			clickVillage: "Klick auf Dorf",
			coordinates: "Koordinaten",
			headSettingsMap: "Hotkeys \"Klick auf Dorf\":",
			mapRedirTargetsCheckbox: "Verk&uuml;rzungen auf Karte",
			hotkeysPlace: "Hotkeys im VP",
			reportSwitchHotkeys: "Hotkeys zum Berichte wechseln",
			mapRedirTargets: {
				villageInfo: "Dorfinfos [D]",
				sendUnits: "Truppen schicken [T]",
				getUnits: "Truppen holen [S]",
				sendResources: "Rohstoffe schicken [R]",
				getResources: "Rohstoffe holen [H]",
				centerMap: "Karte zentrieren [Z]",
				groupLinks: "Gruppenlinks bearbeiten [G]",
				selectVillage: "Dorf auswählen [A]",
				coordList: "Koordinatenliste [L]",
			},  
        }
}
var defaultCheckbox = { lastVillageLink: true, mapRedirTargets: true, reportSwitchHotkeys: true,hotkeysPlace:true,globalHotkeys:true,};

/* global checkboxes */ 
var newCheckboxes = function() {
	return lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox);}
var checkboxes = new newCheckboxes();
	
	/* Link, um zum Versammlungsplatz mittels 'P' zu gelangen */
	lib.hotkeys.keys.push( { key: 80, href: lib.game_data.link_base.replace("screen=","screen=place") } );
	
	/* Link, um auf die Karte mittels 'K' zu gelangen */
	lib.hotkeys.keys.push( { key: 75, href: lib.game_data.link_base.replace("screen=","screen=map") } );
	
	/* Link, um auf die Berichteseite mittels ',' zu gelangen */  
	lib.hotkeys.keys.push( { key: 188, href: lib.game_data.link_base.replace("screen=","screen=report") } );

	/* Link, um auf die Hauptgebäudeseite mittels 'H' zu gelangen */
	lib.hotkeys.keys.push( { key: 72, href: lib.game_data.link_base.replace("screen=","screen=main") } ); 
	
	/* Versammlungsplatz --> target_attack = Angriffsbutton, target_support = Unterstützungsbutton */
	if( document.getElementById("target_attack") ) {
		var a = document.getElementById("target_attack").parentNode.parentNode.getElementsByTagName("a");

		if( checkboxes.hotkeysPlace ) {
			document.getElementById("target_support").value = lib.createTextNode(gui[lib.lang].target_support).textContent;
			lib.hotkeys.keys.push( { key: 85, event: { id: "target_support", event: "click" } } );
			document.getElementById("target_attack").value =  lib.createTextNode(gui[lib.lang].target_attack).textContent;
			lib.hotkeys.keys.push( { key: 13, event: { id: "target_attack", event: "click" } } );

			/* Alle Truppen auswählen */
			document.getElementById("selectAllUnits").textContent += " [A]";
			lib.hotkeys.keys.push( { key: 65, href: "javascript:selectAllUnits(true)" } );
              
			if( lib.game_data.player.premium ) {
				/* Favoriten, Eigene, Verlauf auswählen */
				a[0].textContent += " [F]";
				a[0].id = "favourite";
				lib.hotkeys.keys.push( { key: 70, event: { id: "favourite", event: "click" } } );
				a[1].textContent += " [E]";
				a[1].id = "ownVillages";
				lib.hotkeys.keys.push( { key: 69, event: { id: "ownVillages", event: "click" } } );
				a[2].textContent += " [V]";		
				a[2].id = "course";
				lib.hotkeys.keys.push( { key: 86, event: { id: "course", event: "click" } } );

				/* Popup wieder schließen */
				lib.hotkeys.keys.push( { key: 27, href: "javascript:inlinePopupClose()" } ); 
			}
		}
		
		/* Letztes Dorf Link */
		if( checkboxes.lastVillageLink )  {
			var defaultValues = {x: "0", y: "0",spear: "0", sword: "0",axe: "0",archer:"0",spy:"0",light:"0",marcher:"0",heavy:"0",ram:"0",catapult:"0",knight:"0",snob:"0",};
			var names = ["spear","sword","axe","archer","spy","light","marcher","heavy","ram","catapult","knight","snob"];
			var last = (lib.game_data.player.premium ? a[a.length-1].parentNode.appendChild( document.createElement("a") ) : 
				document.getElementById("selectAllUnits").parentNode.parentNode.appendChild( document.createElement("a") ) );
			last.href = "javascript:;";
			last.innerHTML = gui[lib.lang].lastVillage;
			last.id = "lastVillage";
			last.addEventListener("click",function() {
				var values = lib.storage.getValue("LastVillage"+lib.game_data.player.id,defaultValues);
				if(  values.x != document.getElementById("inputx").value &&  values.y != document.getElementById("inputy").value) {
					document.getElementById("inputx").value=values.x;document.getElementById("inputy").value=values.y;
				} else {
					for( var i=0 ; i<names.length ; i++ ) {
						if( values[names[i]] == "" ) values[names[i]]=0;
						if ( (typeof document.getElementById("unit_input_"+names[i])!='undefined') && values[names[i]] != "0") {
							if( parseInt(document.getElementById("unit_input_"+names[i]).nextSibling.nextSibling.textContent.replace(/[()]/g,""))>=parseInt(values[names[i]]) )
								document.getElementById("unit_input_"+names[i]).value = values[names[i]];
							else  {document.getElementById("unit_input_"+names[i]).value = 
								document.getElementById("unit_input_"+names[i]).nextSibling.nextSibling.textContent.replace(/[()]/g,"");}
						}
					}					
				}
			},false);
			lib.hotkeys.keys.push( { key: 90, event: { id: "lastVillage", event: "click" } } );

			/* Werte abspeichern */
			function saveValues() {
				var values =  defaultValues;
				if( parseInt(document.getElementById("inputx").value) != 0 && document.getElementById("inputx").value != "" ) 
					values.x = document.getElementById("inputx").value; else return;
				if( parseInt(document.getElementById("inputy").value) != 0  && document.getElementById("inputy").value != "" )  
					values.y = document.getElementById("inputy").value; else return;
				for( var i=0 ; i<names.length ; i++ ) {
					if ( typeof document.getElementById("unit_input_"+names[i])!='undefined' )
						values[names[i]]=document.getElementById("unit_input_"+names[i]).value;
				}
				lib.storage.setValue("LastVillage"+lib.game_data.player.id,values);
			}
			document.getElementById("target_attack").addEventListener("click", saveValues, false);
			document.getElementById("target_support").addEventListener("click", saveValues, false);
		}
	}
	
	/* Angriffsbestätigungsseite Versammlungsplatz Bestätigungsbutton */ 
	if( document.getElementById("troop_confirm_go") && checkboxes.hotkeysPlace ) {
		document.getElementById("troop_confirm_go").value = lib.createTextNode(gui[lib.lang].target_attack).textContent;
		lib.hotkeys.keys.push( { key: 13, event: { id: "troop_confirm_go", event: "click" } } )
	}
       
/* Berichte weiterschalten */
if( location.href.match(/screen=report&mode=all/) && location.href.match(/view=/) && checkboxes.reportSwitchHotkeys) {
      var tables = document.getElementsByClassName("vis");   
      var table;
      var tableTop = tables[2];
      var tableBottom = lib.getByTagName(tables[2], "table", "nextSibling",2);
      var a = [ tableTop.getElementsByTagName("a"), tableBottom.getElementsByTagName("a") ];
      tableTop.style.whiteSpace="nowrap";
      tableBottom.style.whiteSpace="nowrap";  
	  var reports = {
			forward: ["[W]",87],
			move: ["[V]",86],  
			del: ["[L]",76],
			next: ["[&larr;]",37], 
			prev: ["[&rarr;]",39],
	  };
	
      for( var i = 0; i < a[0].length; i++ ) {
        var hk;
        if( /mode=forward/.test(a[0][i].href) )
          hk = "forward";
        else if( /mode=move/.test(a[0][i].href) )
          hk = "move";
        else if( /action=del_one/.test(a[0][i].href) )
          hk = "del";
        else if( a[0][i].innerHTML == "&lt;&lt;" )
          hk = "next";
        else if( a[0][i].innerHTML == "&gt;&gt;" )
          hk = "prev";

        if( hk ) { 
			var txt = lib.createTextNode(" "+reports[hk][0]).textContent;   
			lib.hotkeys.keys.push( { key: reports[hk][1], href: a[0][i].href } );   
          a[0][i].innerHTML += txt;
          a[1][i].innerHTML += txt;
        }
      }
}

/* Klick auf Dorf Einstellungen auf der Karte */
if( location.href.match(/screen=map/) && checkboxes.mapRedirTargets && lib.firefox) {
	var Map = {
		redirTargets : ["villageInfo","sendUnits","getUnits","sendResources","getResources","centerMap","groupLinks","selectVillage","coordList"],
		redirTarget : "villageInfo",
		twmap: null,
		lnk: null,
		redirHref: "",
		bbcode: false,
		coordlist: "",
		doIt : function() {
			if( location.href.match(/screen=map/) ) {
				Map.redirTarget = lib.storage.getValue("redirTarget"+lib.game_data.player.id, "villageInfo");
				Map.coordlist = lib.storage.getValue("coordlist"+lib.game_data.player.id, "");
				Map.bbcode = lib.storage.getValue("bbcode"+lib.game_data.player.id,false);
				Map.init();
			}
		},
		init : function() {
			Map.twmap = lib.win.TWMap;
			Map.twmap.popup.fmHandleMouseMove = Map.twmap.popup.handleMouseMove;
			Map.twmap.popup.handleMouseMove = Map.handleMouseMove;
			Map.twmap.mapHandler.fmSpawnSector = Map.twmap.mapHandler.spawnSector;
			Map.twmap.mapHandler.spawnSector = Map.spawnSector;

			Map.lnk = document.getElementById("map");
			Map.lnk.addEventListener("click", Map.redirectLink, false);
		},
		redirectLink : function(e) {
			var pos = Map.twmap.map.coordByEvent(e);
			var x = pos[0];
			var y = pos[1];
			var v = Map.twmap.villages[x*1000+y];
			if( v ) {
				switch( Map.redirTarget ) {
					case "coordList":
						var coords = x+"|"+y;
						if( Map.bbcode ) coords = "[coord]"+coords+"[/coord]";
						if( document.getElementById("coordlist").value.indexOf(coords) == -1  ) {
							document.getElementById("coordlist").value += coords + "\n";
							document.getElementById("hotkeys_overlay_"+x+"_"+y).style.backgroundColor = "rgba(127,255,255,0.4)";
          					} else {
							document.getElementById("coordlist").value = document.getElementById("coordlist").value.replace(coords+"\n","");
							document.getElementById("hotkeys_overlay_"+x+"_"+y).style.backgroundColor = "";
						}
						document.getElementById("coordlist").style.height = (document.getElementById("coordlist").value.split("\n").length*12)+"px";
						Map.coordlist = document.getElementById("coordlist").value.replace(/\n/g,";");
						lib.storage.setValue("coordlist"+lib.game_data.player.id,Map.coordlist);
						break;
	      			}
			}		
			return false;
		},
		spawnSector : function(data, sector) {
			Map.twmap.mapHandler.fmSpawnSector(data,sector);
			var beginX = sector.x - data.x;
			var endX = beginX + Map.twmap.mapSubSectorSize;
    
			var beginY = sector.y - data.y;
			var endY = beginY + Map.twmap.mapSubSectorSize;

			for(var x in data.tiles) {
				x = parseInt(x);
				if( x < beginX || x >= endX ) continue;
				for(var y in data.tiles[x]) {
					y = parseInt(y);
					if( y < beginY || y >= endY ) continue;
					var xx = data.x+x;
					var yy = data.y+y;
					var v = Map.twmap.villages[(xx)*1000+yy];
					if( v ) {
						var el = document.createElement('div');
						el.style.position = 'absolute';
						el.style.zIndex = '5';
						el.id = "hotkeys_overlay_"+xx+"_"+yy;
						el.style.width = Map.twmap.map.scale[0]+"px";
						el.style.height = Map.twmap.map.scale[1]+"px";
						if( Map.coordlist.indexOf(xx+"|"+yy) > -1 )
							el.style.backgroundColor = "rgba(127,255,255,0.4)";
						sector.appendElement(el, x-beginX, y-beginY);
					} 
				}
			}
		},
		handleMouseMove : function(e) {
			var pos = Map.twmap.map.coordByEvent(e);
			var x = pos[0];
			var y = pos[1];
			Map.twmap.popup.fmHandleMouseMove(e);
			Map.lnk.href = Map.redirHref;
			if( x != Map.mocX || y != Map.mocY ) {
				var coordidx = x*1000+y;
				var village = Map.twmap.villages[coordidx];
				if( village ) {
					switch( Map.redirTarget ) {
						case "villageInfo":
							Map.lnk.href = lib.game_data.link_base.replace("screen=","screen=info_village&id="+village.id);
							break;
						case "sendUnits":
							Map.lnk.href = lib.game_data.link_base.replace("screen=","screen=place&target="+village.id);
							break;
						case "getUnits":
							Map.lnk.href = lib.game_data.link_base.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=place&target="+lib.game_data.village.id);
							break;
						case "sendResources":
							Map.lnk.href = lib.game_data.link_base.replace("screen=","screen=market&target="+village.id);
							break;
						case "getResources":
							Map.lnk.href = lib.game_data.link_base.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=market&target="+lib.game_data.village.id);
							break;
						case "centerMap":
							Map.lnk.href = lib.game_data.link_base.replace("screen=","screen=map&x="+x+"&y="+y);
							break;
						case "groupLinks":
							Map.lnk.href="javascript:popup_scroll(\'groups.php?&mode=village&village_id="+village.id+"\', 300, 400);";
							break;
						case "selectVillage":
							Map.lnk.href = lib.game_data.link_base.replace(/village=\d+/,"village="+village.id).replace("screen=","screen=map");
							break;
						case "coordList":
							Map.lnk.href = "javascript:;"
							break;
					}
					Map.redirHref = Map.lnk.href;
					if( Map.bbcode ) document.getElementById("coords").value = "[coord]"+x+"|"+y+"[/coord]";
					else document.getElementById("coords").value = x+"|"+y; 
					document.getElementById("coords").select();
				} else {
					document.getElementById("coords").value = "";
					Map.lnk.href = "#";
					document.getElementById("coords").blur();
				}
			}
			return false;
		},
	}
	Map.doIt();

	var map_topo = document.getElementById("map_config");
	var table = map_topo.appendChild( document.createElement("table") );
	table.width = "100%";
	table.id = "hotkeysMap";
	table.className = "vis";
	var row, cell;
	var thead = table.appendChild(document.createElement("thead"));
	row = thead.insertRow(0);
	cell = row.appendChild(document.createElement("th"));
	cell.colSpan = 2;
	cell.innerHTML = gui[lib.lang].headSettingsMap;
	row = thead.insertRow(-1);
	cell = row.insertCell(0);
	cell.innerHTML = gui[lib.lang].coordinates;
	cell = row.insertCell(1);
	cell.noWrap = "true";

	var input = cell.appendChild(document.createElement("input"));
	input.id = "coords";
	input.readOnly = true;
	input.style.border = 0;
	input.style.backgroundColor = "inherit";
	input.style.width = "140px";

	var openDiv = function() {	
		var div = document.getElementById("coords").parentNode.appendChild(document.createElement("div"));
		div.id = "coordlist_div";
		div.style.width = "200px";
		div.style.border = "1px solid #804000";
		var input = div.appendChild(document.createElement("textarea"));
		input.value = Map.coordlist.replace(/;/g,"\n");
		input.id = "coordlist";
		input.setAttribute("onfocus","this.select();");
		input.readOnly = true;
		input.style.width = "180px";
		input.style.fontSize = "xx-small";
		input.style.border = "0";
		input.style.backgroundColor = "inherit";
		input.style.height = (input.value.split("\n").length*12)+"px";
		var a = div.appendChild(document.createElement("a"));
		a.href = "javascript:;";
		a.style.fontWeight = "bold";
		a.style.color = "red";
		a.style.verticalAlign = "top";
		a.innerHTML = "X";
		a.addEventListener("click",function() {
			document.getElementById("coords").style.display="";
			document.getElementById("coordlist_div").parentNode.removeChild(document.getElementById("coordlist_div") );
			lib.storage.deleteValue("coordlist"+lib.game_data.player.id);
			Map.coordlist = Map.coordlist.split(";");
			for( var i=0 ; i<Map.coordlist.length-1 ; i++ ) { 
				Map.coordlist[i]=Map.coordlist[i].replace("[coord]","").replace("[/coord]","");
				document.getElementById("hotkeys_overlay_"+Map.coordlist[i].split("|")[0]+"_"+Map.coordlist[i].split("|")[1]).style.backgroundColor = "";
			}
			Map.coordlist = "";
			Map.redirTarget = "villageInfo";
			document.getElementById("villageInfo").selected = "true";
			lib.storage.setValue("redirTarget"+lib.game_data.player.id, Map.redirTarget);
		}, false);
		document.getElementById("coords").parentNode.appendChild( document.getElementById("bbcode") );
		document.getElementById("coords").parentNode.appendChild( document.getElementById("bbcode_txt") );
		document.getElementById("coords").style.display = "none";
	}

	input = cell.appendChild( document.createElement("input") );
	input.type = "checkbox";
	input.id = "bbcode";
	input.checked = Map.bbcode;
	input.addEventListener("click",function() {
		Map.bbcode = (this.checked ? true : false);
		lib.storage.setValue("bbcode"+lib.game_data.player.id, Map.bbcode ); 
		if( Map.bbcode ) {  
			if( document.getElementById("coordlist") != undefined && document.getElementById("coordlist").value != "" ) {
			 	var value = document.getElementById("coordlist").value.split(/\n/g);
				for( var i=0 ; i<value.length ; i++ ) { 
				   if( value[i] != "" )
				   	value[i] = "[coord]"+value[i]+"[/coord]";
				} value=value.join("\n");
				document.getElementById("coordlist").value = value;
				lib.storage.setValue("coordlist"+lib.game_data.player.id,value.replace(/\n/g,";") );
			}
			if( document.getElementById("coords").value != "" ) {
				document.getElementById("coords").value = "[coord]"+document.getElementById("coords").value+"[/coord]"; 
				document.getElementById("coords").select();  
			}
		} else {     
			if( document.getElementById("coordlist") != undefined && document.getElementById("coordlist").value != "" ) {
				var value = document.getElementById("coordlist").value.split(/\n/g);
				for( var i=0 ; i<value.length ; i++ ) { 
				   if( value[i] != "" )
						value[i] = value[i].replace("[coord]","").replace("[/coord]","");
				} value=value.join("\n");
				document.getElementById("coordlist").value = value;
				lib.storage.setValue("coordlist"+lib.game_data.player.id,value.replace(/\n/g,";") );  
			} document.getElementById("coords").value = document.getElementById("coords").value.replace("[coord]","").replace("[/coord]",""); 
		}
	}, false);
	var txt = cell.appendChild( lib.createTextNode(gui[lib.lang].bbcode) );
	txt.id = "bbcode_txt";
	if( Map.redirTarget == "coordList" ) openDiv();

	var tbody = table.appendChild(document.createElement("tbody"));
	row = tbody.insertRow(-1);
	cell = row.insertCell(0);
	cell.innerHTML = gui[lib.lang].clickVillage;
	cell = row.insertCell(1);
	var redirTarget = lib.storage.getValue("redirTarget"+lib.game_data.player.id, "villageInfo");
	var select = cell.appendChild(document.createElement("select")), i=0;
	var hotkeys = [["villageInfo",68],["sendUnits",84],["getUnits",83],["sendResources",82],["getResources",72],["centerMap",90],["groupLinks",71],["selectVillage",65],["coordList",76]];
	for( var key in gui[lib.lang].mapRedirTargets ) { 
		if( !lib.game_data.player.premium ) {if( key == "groupLinks" ) continue;}
		select.options[i] = new Option(gui[lib.lang].mapRedirTargets[key],false,false);
		select.options[i].id = key;
		if( redirTarget == key ) select.selectedIndex = i;
		lib.hotkeys.keys.push( { key: hotkeys[i][1], event: { id: hotkeys[i][0], event: "click" } } );
		select.options[i].addEventListener("click",function() {
			this.selected = true;
			lib.storage.setValue("redirTarget"+lib.game_data.player.id, this.id);
			Map.redirTarget = this.id;
			if( this.id != "coordList" ) {
				document.getElementById("coords").style.display="";
				if( document.getElementById("coordlist_div") != undefined ) {
					document.getElementById("coords").style.display="";
					document.getElementById("coordlist_div").parentNode.removeChild(document.getElementById("coordlist_div") );
				}
			} else {if( !document.getElementById("coordlist_div") ) openDiv();}
		},false);
		i++;
	}		
	table.appendChild( document.createElement("br") );
}

/* settings */
if( location.href.match(/screen=settings&mode=settings/) ) {
	var tr = document.createElement("tr");
	var tr2 = document.createElement("tr");
	var th = document.createElement("th");
	var td = document.createElement("td");	

	th.setAttribute("colspan", "2");
	th.innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=143251' target='"+gui[lib.lang].targetForum+"' title='"+gui[lib.lang].mouseoverTitle[0]+"\"" + version + "\""
                +gui[lib.lang].mouseoverTitle[1]+"'>"+version+"</a>";
	tr.appendChild(th);
	tr2.appendChild(td);
	td.setAttribute("colspan", "2");

	var input = th.appendChild(document.createElement("a"));
	input.innerHTML = gui[lib.lang].deleteData;
	input.id = "dsHotkeysDelete";
	input.setAttribute("style", "margin-left:2em;");
	input.href = "javascript:;";
	input.addEventListener("click", function() {
    		if( confirm( gui[lib.lang].deleteConfirm ) ) {
         		var vals = lib.storage.listValues();
            		for(var i = 0; i < vals.length; i++ )
                		lib.storage.deleteValue(vals[i]);
            		alert( gui[lib.lang].deleted );
       		}
    	}, false);
	var checkbox = td.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.id = "lastVillageLink";
	checkbox.checked = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox).lastVillageLink;
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("lastVillageLink").checked ) value.lastVillageLink = true; else value.lastVillageLink = false;
		lib.storage.setValue("checkboxes_"+lib.game_data.player.id,value);
   	}, false);
	td.appendChild(document.createTextNode(gui[lib.lang].lastVillageLink));
	 
	var checkbox = td.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.setAttribute("style", "margin-left:3em;");
	checkbox.id = "mapRedirTargets";
	checkbox.checked = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox).mapRedirTargets;
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("mapRedirTargets").checked ) value.mapRedirTargets = true; else value.mapRedirTargets = false;
		lib.storage.setValue("checkboxes_"+lib.game_data.player.id,value);
   	}, false);                             
	td.appendChild(document.createTextNode(lib.createTextNode(gui[lib.lang].mapRedirTargetsCheckbox).textContent));

	var checkbox = td.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.setAttribute("style", "margin-left:3em;");
	checkbox.id = "hotkeysPlace";
	checkbox.checked = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox).hotkeysPlace;
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("hotkeysPlace").checked ) value.hotkeysPlace = true; else value.hotkeysPlace = false;
		lib.storage.setValue("checkboxes_"+lib.game_data.player.id,value);
   	}, false);   
	td.appendChild(document.createTextNode(lib.createTextNode(gui[lib.lang].hotkeysPlace).textContent));

	var checkbox = td.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.setAttribute("style", "margin-left:3em;");
	checkbox.id = "reportSwitchHotkeys";
	checkbox.checked = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox).reportSwitchHotkeys;
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkboxes_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("reportSwitchHotkeys").checked ) value.reportSwitchHotkeys = true; else value.reportSwitchHotkeys = false;
		lib.storage.setValue("checkboxes_"+lib.game_data.player.id,value);
   	}, false);   
	td.appendChild(document.createTextNode(lib.createTextNode(gui[lib.lang].reportSwitchHotkeys).textContent));

	document.getElementsByClassName("vis settings")[0].appendChild(tr);
	document.getElementsByClassName("vis settings")[0].appendChild(tr2);
}

/* Bibliothek, welche die Funktionen bereitstellt */ 
function Knish3rDSLib(prefix) {
    var self = this;
    this.hotkeys = {
	keys: [],
        doIt: function() {
            window.addEventListener("keyup", this.keyUpHandler, false );},
        keyUpHandler : function(e) {
            if( e.target.nodeName.toUpperCase() == "INPUT" && e.target.type == "text")
                return;
            if( e.target.nodeName.toUpperCase() != "TEXTAREA" ) {
                for( var i = 0; i < self.hotkeys.keys.length; i++ ) {
                    if( self.hotkeys.keys[i].key == e.keyCode ) {
                        if( self.hotkeys.keys[i].href ) {
                            location.href = self.hotkeys.keys[i].href; 
				if( self.hotkeys.keys[i].href == "javascript:selectAllUnits(true)" ) 
					self.hotkeys.keys[i].href = "javascript:selectAllUnits(false)";
				break;}
                        if( self.hotkeys.keys[i].event ) {
                            self.fireEvent( document.getElementById(self.hotkeys.keys[i].event.id), self.hotkeys.keys[i].event.event );break;}
                    }
                }
            }
        },
    }
    this.StorageHandler = function(prefix,forceGM){
        var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
        var win = gm ? unsafeWindow : window;
        var ls = false;
        var intGetValue;
        var intSetValue;
        var prefix = prefix;
        try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
        if( !ls && !gm )
            throw("Keine geeignete Speicherm&ouml;glichkeit gefunden");
            if( forceGM && gm || !ls) {
                if( gm ) {
                    prefix = prefix + "_" + document.location.host.split('.')[0];
                    intSetValue = function(key,value) {
                        GM_setValue(prefix+"_"+key,value);
                    };
                    intGetValue = function(key,defaultValue) {
                        return GM_getValue(prefix+"_" + key, defaultValue);
                    }     
                    this.deleteValue = function(key) {
                        GM_deleteValue(prefix+"_"+key);
                    }
                    this.listValues = function(re) {
                    var allkeys = GM_listValues();
                    var serverKeys = [];
                    var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                    if( typeof(re) != "undefined" )
                    var reKey = new RegExp(re);
                    for( var i = 0; i < allkeys.length; i++ ) {
                        var res = allkeys[i].match(rePrefix);
                        if( res ) {
                            if( reKey ) {
                                res = res[1].match(reKey);
                                if( res ) serverKeys.push(res);
                            } else serverKeys.push(res[1]);
                        }
                    } return serverKeys;
                }
            }
        } else if( ls ) {
            intSetValue = function(key,value) {
                localStorage.setItem(prefix+"_"+key, value );};    
            intGetValue = function(key,defaultValue) {
                var value = localStorage.getItem(prefix+"_"+key);
                if( value ) return value;
                else return defaultValue;
            };
            this.deleteValue = function(key) {
                localStorage.removeItem(prefix+"_"+key);}
            this.listValues = function() {
                var keys = []; var key;
	        try{
         		 for(var i = 0 ; ; i++) {
           			 key = window.localStorage.key(i);
            			if(!key){ break; }
               			if( typeof(re) != "undefined") {
                    			var reKey = new RegExp(re);
					if( key.match(prefix) && key.match(reKey) )
            					keys.push(key);
				} else if( key.match(prefix) ) {
					key=key.replace(prefix+"_","");
            				keys.push(key);}}
        	} catch(e) {}
		return keys;
            }
        }
        this.clear = function(re) {
            var keys = this.listValues(re);
            for( var i = 0; i < keys.length; i++ )
                this.deleteValue(keys[i]);
        }
        this.setValue = function(key,value) {
            switch( typeof(value) ) {
                case "object":
                case "function": intSetValue(key,"j"+JSON.stringify(value)); break;
                case "number": intSetValue(key,"n"+value); break;
                case "boolean": intSetValue(key,"b" + (value ? 1 : 0)); break;
                case "string": intSetValue(key,"s" + value ); break;
                case "undefined": intSetValue(key,"u"); break;
            }
        }  
        this.getValue = function(key,defaultValue){
            var str = intGetValue(key);
            if( typeof(str) != "undefined" ) {
                switch( str[0] ) {
                    case "j": return JSON.parse(str.substring(1));
                    case "n": return parseFloat(str.substring(1));
                    case "b": return str[1] == "1";
                    case "s": return str.substring(1);
                    default: this.deleteValue(key);
                }
            } return defaultValue;
        }
        this.getString = function(key) {
            return intGetValue(key);}
        this.setString = function(key,value){
            intSetValue(key,value);}
    }
    this.getGameData = function() {
        var game_data;
        if(typeof(unsafeWindow) != 'undefined' && navigator.userAgent.indexOf("Firefox")>-1)
            game_data = unsafeWindow.game_data;
        if(!game_data) {
            var script = document.createElement("script");
            script.type = "application/javascript";
            script.textContent = 	"var input=document.createElement('input');" +
                                    "input.type='hidden';" +
                                    "input.value=JSON.stringify(game_data);"  +
                                    "input.id='game_data';" +
                                    "document.body.appendChild(input);";
            document.body.appendChild(script);
            var input = document.getElementById("game_data");
            if( input ) eval("game_data=" + input.value + ";");
            document.body.removeChild(script);
        }
        if( game_data ) game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
        return game_data;
    }
    this.createTextNode = function(key) {
       var textNode = document.createElement('span');
   		textNode.innerHTML = key;
    	return textNode;
    }  
	this.getByTagName = function(node,nodeName,what,count) {
	  if( typeof count == "undefined" )
	    count = 1;
	  nodeName = nodeName.toUpperCase();
	  node = node[what];
	  if( what == "firstChild" )
	    what = "nextSibling";
	  else if( what == "lastChild" )
	    what = "previousSibling";
	  while( node && node.nodeName.toUpperCase() != nodeName )
	    node = node[what];
	  if( count == 1 )
	    return node;
	  else
	    return this.getByTagName(node,nodeName,what,count-1);
	}
    this.fireEvent = function(node,evt) {
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "CHECKBOX" )
            node.checked = !node.checked;
        if( node.nodeName.toUpperCase() == "INPUT" && node.type.toUpperCase() == "SUBMIT" ) {
            node.focus(); node.click();}
        else{ var evObj = document.createEvent('HTMLEvents');
        evObj.initEvent( evt, true, true );
        node.dispatchEvent(evObj);}
    }
    this.hotkeys.doIt();
    this.firefox = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
    this.win = this.firefox ? unsafeWindow : window;
    this.storage = new this.StorageHandler(prefix,true);
    this.game_data = this.getGameData();
    if( !this.game_data ) return;
    this.lang = this.game_data.world.replace(/[0-9]/g,"");
    if( this.lang == "des" || this.lang == "dec" || (this.lang == "ch" && this.game_data.world.replace(/[^0-9]/) < 4) || this.lang == "chs" )
	this.lang = "de";
}
})();
