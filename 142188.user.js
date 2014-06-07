// ==UserScript==
// @name           Bessere Gebäudeübersicht
// @namespace      http://dl.dropbox.com/u/18247325/dsscripte/
// @version		   0.6
// @author 		   Squiffy-Squirrel
// @description    Verbessert die Gebäudeübersicht
// @include        http://ae*.tribalwars.ae/game.php?*screen=overview_villages*mode=buildings*
// ==/UserScript==

//MIT-Lizenz:
//Copyright (c) 2011 Squiffy-Squirrel
//Hiermit wird unentgeltlich, jeder Person, die eine Kopie der Software und 
//der zugehörigen Dokumentationen (die "Software") erhält, die Erlaubnis erteilt, 
//uneingeschränkt zu benutzen, inklusive und ohne Ausnahme, dem Recht, sie zu verwenden, 
//kopieren, ändern, fusionieren, verlegen, verbreiten, unterlizenzieren und/oder zu 
//verkaufen, und Personen, die diese Software erhalten, diese Rechte zu geben, 
//unter den folgenden Bedingungen:
//
//Der obige Urheberrechtsvermerk und dieser Erlaubnisvermerk sind in allen 
//Kopien oder Teilkopien der Software beizulegen.
//
//DIE SOFTWARE WIRD OHNE JEDE AUSDRÜCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, 
//EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG FÜR DEN VORGESEHENEN ODER EINEM BESTIMMTEN 
//ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT DARAUF BESCHRÄNKT. IN KEINEM FALL 
//SIND DIE AUTOREN ODER COPYRIGHTINHABER FÜR JEGLICHEN SCHADEN ODER SONSTIGE ANSPRÜCHE 
//HAFTBAR ZU MACHEN, OB INFOLGE DER ERFÜLLUNG EINES VERTRAGES, EINES DELIKTES ODER 
//ANDERS IM ZUSAMMENHANG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.

(function() {

	var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
	api.register( 'Bessere Gebäudeübersicht', [8.4,8.6], 'Squiffy-Squirrel', 'none' );

	var clickcount = 0;	
	var eventCount = 1;
	var ignoreEvents = false;
	var buildButton = document.getElementById("get_all_possible_build");
	var colsLen = buildButton.parentNode.parentNode.getElementsByTagName("th").length;
		//20
	var table = buildButton.parentNode.parentNode.parentNode.parentNode;
	var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

	var buildingDiff = new Array();
	
	for(var i = 0; i != rows.length; ++i) {
		buildingDiff[i] = getBuildingArr(0);
	}
		
	var settings = loadSettings();
	
	var lastEvent = "";
	var build = true;
	
	buildButton.addEventListener("click", enableBuild, false);	//Buildbutton
	
	document.getElementById("get_all_possible_destroy").addEventListener("click", enableDestroy, false); //Destroybutton
	
	table.addEventListener("DOMAttrModified", activateAction, false);
	table.addEventListener("DOMNodeInserted", queueAction, false);
	table.addEventListener("DOMNodeRemoved", queueRemoveAction, false);
	/*for(var k = 0; k != rows.length; ++k) {
		
		var tds = rows[k].getElementsByTagName("td");
		//rows[k].addEventListener("DOMAttrModified", activateAction, false);
		//tds[tds.length - 1].addEventListener("DOMNodeInserted", DOMaction, false);
	}*/
	
	createBuilForm();
	
	action();
	
	
	// Storage-Klasse
	// Autor: Hypix
	// Zur freien Verwendung
	function Storage(prefix,forceGM){
		  var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
		  var win = gm ? unsafeWindow : window;
		  var ls = false;
		  var intGetValue;
		  var intSetValue;
		  var prefix = prefix;
		  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
		  if( !ls && !gm )
		    throw("Keine geeignete Speichermöglichgkeit gefunden");
		  if( forceGM && gm || !ls)
		  {
		    if( gm )
		    {
		      prefix = prefix + "_" + document.location.host.split('.')[0];
		      intSetValue = function(key,value) 
		      {
		        GM_setValue(prefix+"_"+key,value);
		      };
		      intGetValue = function(key,defaultValue)
		      {
		        return GM_getValue(prefix+"_" + key, defaultValue);
		      };
		      this.deleteValue = function(key)
		      {
		        GM_deleteValue(prefix+"_"+key);
		      };
		      this.listValues = function(re)
		      {
		        var allkeys = GM_listValues();
		        var serverKeys = [];
		        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
		        if( typeof(re) != "undefined" )
		          var reKey = new RegExp(re);
		        for( var i = 0; i < allkeys.length; i++ )
		        {
		          var res = allkeys[i].match(rePrefix);
		          if( res )
		          {
		            if( reKey ) 
		            {
		              res = res[1].match(reKey);
		              if( res )
		                serverKeys.push(res);
		            }
		            else
		              serverKeys.push(res[1]);
		          }
		        }
		        return serverKeys;
		      };
		    }
		  }
		  else if( ls )
		  {
		    intSetValue = function(key,value) 
		    {
		      localStorage.setItem(prefix+"_"+key, value );
		    };    
		    intGetValue = function(key,defaultValue)
		    {
		      var value = localStorage.getItem(prefix+"_"+key);
		      if( value )
		        return value;
		      else
		        return defaultValue;
		    };
		    this.deleteValue = function(key)
		    {
		      localStorage.removeItem(prefix+"_"+key);
		    };
		    this.listValues = function(re)
		    {
		      var keys = [];
		      var rePrefix = new RegExp("^"+prefix+"_(.*)$");
		      if( typeof(re) != "undefined")
		        var reKey = new RegExp(re);
		      for( var i = 0; i < win.localStorage.length; i++ )
		      {
		        var res = localStorage.key(i).match(rePrefix);
		        if( res )
		        {
		          if( reKey ) 
		          {
		            res = res[1].match(reKey);
		            if( res )
		              keys.push(res);
		          }
		          else
		            keys.push(res[1]);
		        }
		      }
		      return keys;
		    };
		  }
		  this.clear = function(re)
		  {
		    var keys = this.listValues(re);
		    for( var i = 0; i < keys.length; i++ )
		      this.deleteValue(keys[i]);
		  };
		  this.setValue = function(key,value)
		  {
		    switch( typeof(value) )
		    {
		      case "object":
		      case "function":
		        intSetValue(key,"j"+JSON.stringify(value));
		        break;
		      case "number":
		        intSetValue(key,"n"+value);
		        break;
		      case "boolean":
		        intSetValue(key,"b" + (value ? 1 : 0));
		        break;
		      case "string":
		        intSetValue(key,"s" + value );
		        break;
		      case "undefined":
		        intSetValue(key,"u");
		        break;
		    }
		  };  
		  this.getValue = function(key,defaultValue)
		  {
		    var str = intGetValue(key);
		    if( typeof(str) != "undefined" )
		    {
		      switch( str[0] )
		      {
		        case "j":
		          return JSON.parse(str.substring(1));
		        case "n":
		          return parseFloat(str.substring(1));
		        case "b":
		          return str[1] == "1";
		        case "s":
		          return str.substring(1);
		        default:
		          this.deleteValue(key);
		      }
		    }
		    return defaultValue;
		  };
		  this.getString = function(key)
		  {
		    return intGetValue(key);
		  };
		  this.setString = function(key,value)
		  {
		    intSetValue(key,value);
		  };
		}
	
	
	//Save/Load
	
	function loadSettings() {
		var store = new Storage("bess_geb", false);
		var ret = new Array();
		
		for(var buf in buildingDiff[0]) {
			
			ret[buf] = store.getValue(buf, 0);
		}
		return ret;
	}
	
	function saveSettings() {
		var store = new Storage("bess_geb", false);
		
		for(var buf in buildingDiff[0]) {
			store.setValue(buf, 1*document.getElementById("bess_geb_" + buf).value);
		}
		
	}
	
	function deleteSettings() {
		var store = new Storage("custom_deff_requester", false);
				
		store.clear();
	}
	
	//GUI
	
	function createBuilForm() {
	
		var div = document.createElement("div");
		
		div.appendChild(document.createTextNode("Gewünschter Ausbau:"));
		div.appendChild(br());
		
		for(var buf in buildingDiff[0]) {
			div.appendChild(createImg("/graphic/buildings/" + buf + ".png?1"));
			div.appendChild(createTextField(buf, settings[buf]));
			div.appendChild(document.createTextNode(" "));
		}
		
		div.appendChild(br());
		
		submit = document.createElement('a');
		submit.href = 'javascript:location.reload()';
		submit.addEventListener("click", saveSettings, false);
									
		submit.appendChild(document.createTextNode('\273 Einstellungen speichern'));
			
		clear = document.createElement('a');
		clear.href = 'javascript:location.reload();';
		clear.addEventListener("click", deleteSettings, false);
		clear.appendChild(document.createTextNode('\273 Einstellungen löschen'));
		
		div.appendChild(submit);
		div.appendChild(clear);
		
		table.parentNode.insertBefore(div, table);
	}
	
	function br() {
		return document.createElement("br");
	}
	
	function createImg(url) {
	
		var img = document.createElement("img");
		img.src = url;
		
		return img;
	}
	
	function createTextField(id, value) {
		
		var input = document.createElement("input");
		input.type = "text";
		input.size = "2";
		input.id = "bess_geb_" + id;
		input.value = value;
		return input;
	}
	
	function createLink(text) {
		var a = document.createElement('a');
		a.href = 'javascript:void(0)';
		a.appendChild(document.createTextNode(text));
		
		return a;	
	}
	
	
	//DIVS
	
	function enableDestroy() {
		build = false;
	}
	
	function enableBuild() {
		build = true;		
	}
	
	function activateAction(event) {
		var child = event.target.childNodes[1];
		if(child && child.nodeType != 3 && (child.className == "hammer-icon" || child.className == "destroy-icon" )) {
			var affectedRow = event.target.parentNode;
			//alert(event.target.innerHTML);
			if(build)
				markBuildable(affectedRow);
			else
				markDestroyable(affectedRow);
		}
	}
	
	
	//DEBUG!
	function test(event) {
		alert(event.target.innerHTML);
	}
	
	function getRowCount(row) {
		for(var i = 0; i != rows.length; ++i) {
			if(rows[i].id == row.id)
				return i;
		}
	}
	
	function queueRemoveAction(event) {	
		if(event.target.tagName == "LI") {		
		
		
			var buildingName = event.target.getElementsByClassName("queue_icon")[0].firstChild.src.match(/.*graphic\/buildings\/(.+).png\?1/)[1];
			var row = event.target.parentNode.parentNode.parentNode;
			var rowCount = getRowCount(row);
			var statusLight = event.target.getElementsByClassName("build-status-light")[0];
		
			if(statusLight.style.backgroundColor == "green" || statusLight.style.backgroundColor == "#008000") {
				incrementBuildingLvl(buildingName, row, rowCount, -1);	
			}
			else if(statusLight.style.backgroundColor == "red" || statusLight.style.backgroundColor == "#ff0000") {
				incrementBuildingLvl(buildingName, row, rowCount, 1);	
			}		
		}	
	}
	
	function queueAction(event) {
		if(event.target.tagName == "LI") {		
			action();		
		}		
	}
	
	function action() {
		//alert("action");
		for(var i = 0; i != rows.length; ++i) {
			var readJSON = readAllBuildingLvls(rows[i]);
			refreshBuildingLvls(readJSON, rows[i], i);
			markExtraCosts(rows[i]);
			if(build)
				markBuildable(rows[i]);
			else
				markDestroyable(rows[i]);
		}	
	}
	
	function refreshBuildingLvls(readJSON, row, rowcount) {
		for(var buf in readJSON) {
			if(buildingDiff[rowcount][buf] != readJSON[buf]) {
				//GM_log(buildingDiff[rowcount][buf] + "!=" + readJSON[buf]);
				incrementBuildingLvl(buf, row, rowcount, readJSON[buf] - buildingDiff[rowcount][buf]);
			}
		}
	}
		
	function incrementBuildingLvl(buildingName, row, rowcount, number) {
		var building = row.getElementsByClassName("upgrade_building b_" + buildingName);
		//alert(building[0].innerHTML);
		if(building.length == 1 && building[0].firstChild.nodeType == 3) {
			building[0].firstChild.nodeValue = building[0].firstChild.nodeValue*1 + number;
			buildingDiff[rowcount][buildingName] += number;
			return true;
		}	
		else if (building.length == 1 && building[0].firstChild.tagName == "A") {
			var buf = building[0].firstChild.firstChild;
			buf.nodeValue = buf.nodeValue*1 + number;
			buildingDiff[rowcount][buildingName] += number;
			return true;
		}
		else {
			return false;
		}
	}
	
	function markExtraCosts(row) {
	
		var tds = row.getElementsByTagName("td");
		var queue = tds[tds.length - 1].getElementsByClassName("queue_icon");
		
		if(queue.length >= 5) {
			tds[tds.length - 1].style.backgroundColor = "#ff6347";
		}
		else {
			tds[tds.length - 1].removeAttribute("style", false);
		}
	}
	
	function markBuildable(row) {
		var tds = row.getElementsByTagName("td");
		
		for(var i = 4; i < tds.length - 1; ++i) {
			var td = tds[i].firstChild;
			if(td.nodeType != 3 && td.tagName == "A") {
				var nodeV = td.firstChild.nodeValue;			
				var buildName = tds[i].className.match(/upgrade_building b_(.+)/)[1];
				//GM_log(nodeV + ", " + buildName);
				
				if(nodeV < settings[buildName])
					tds[i].style.backgroundColor = "#00ff00";
				else
					tds[i].removeAttribute("style", false);
			}
			else {
				tds[i].removeAttribute("style", false);
			}
		}
	}
	
	function markDestroyable(row) {
		var tds = row.getElementsByTagName("td");
		
		for(var i = 4; i < tds.length - 1; ++i) {
			var td = tds[i].firstChild;
			if(td.nodeType != 3 && td.tagName == "A") {
				var nodeV = td.firstChild.nodeValue;
				var buildName = tds[i].className.match(/upgrade_building b_(.+)/)[1];
				//GM_log(nodeV + ", " + buildName);
				
				if(nodeV > settings[buildName])
					tds[i].style.backgroundColor = "#ff0000";
				else
					tds[i].removeAttribute("style", false);
			}
			else {
				tds[i].removeAttribute("style", false);
			}
		}
	}
	
	function getBuildingArr(stdVal) {
		var cols = buildButton.parentNode.parentNode.getElementsByTagName("th");	
		var arr = new Array();
		
		for(var i = 0; i != cols.length; ++i) {
			
			if(cols[i].firstChild && cols[i].firstChild.tagName == "A" && cols[i].firstChild.firstChild && cols[i].firstChild.firstChild.tagName == "IMG") {
			
				var img = cols[i].firstChild.firstChild;			
				var buildName = img.src.match(/.*graphic.+buildings\/(.+).png\?/);
				arr[buildName[1]] = stdVal;
			}	
		}
		return arr;
	}
	
	function readAllBuildingLvls(row) {
	
		var readBD = getBuildingArr(0);
	
		var tds = row.getElementsByTagName("td");
		var queue = tds[tds.length - 1].getElementsByClassName("queue_icon");
		var statusLights = tds[tds.length - 1].getElementsByClassName("build-status-light");
		
		for(var j = 0; j != queue.length; ++j) {
			
			var buildingLink = queue[j].firstChild.src;
			var buildingName = buildingLink.match(/.*graphic.+buildings\/(.+).png\?/);
			
			if(statusLights[j].style.backgroundColor == "green" || statusLights[j].style.backgroundColor == "#008000") {
				readBD[buildingName[1]] += 1;
			}
			else if(statusLights[j].style.backgroundColor == "red" || statusLights[j].style.backgroundColor == "#ff0000") {
				readBD[buildingName[1]] -= 1;
			}
				
			
			//GM_log("Read " + buildingName[1] + " build " + readBD[buildingName[1]] + " level.");
		}
		
		return readBD;
	}

})();