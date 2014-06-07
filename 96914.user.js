// ==UserScript==
// @name DS Dorfliste in Dorfnotiz
// @description Version 7.2.0 | Fuegt die Doerfer aus Gruppen als sortierte Liste in Dorfnotiz ein
// @author Samrat, Fragmente uebernommen von: Hypix & cleverguide
// @namespace none
// @include http://de*.die-staemme.de/game.php*groups*
// @include http://de*.die-staemme.de/game.php*info_village*
// ==/UserScript==

//Versionhistory:
//7.0.1 Fehlerbehebung
//7.2.0 Anpassung an DS 7.2 und Erweiterung minimale Entfernung
//7.4.0 Anpassung an DS 7.4

/*Nur fuer "Die Staemme" (DS 7.2) mit Premium Account. Getestet mit Firefox/Greasemonkey
 * 
UEBERSICHT > GRUPPEN
Nur wenn die Gruppe "alle" ausgewählt ist, erscheint im Spaltenkopf "Gruppen" ein Link "» aktualisieren (DS Dorf in Dorfnotiz)"

DORFINFO
Bei Notizen kann im Bearbeitungsmodus eine Gruppe ausgewählt werden. Mit dem Button "Add" werden die nächstgelegenen x Dörfer eingefügt.
Nach Speichern stehen für die nächsten Dörfer Links zum Versammlungsplatz bereit. Das Ziel ist bereits eingetragen.

Viel Spaß beim Deff, Offen und Adeln! :-)
*/


(function(){
	var GruppenSpalte = 4;
	var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
	var version = "7.4.0";
	var params = parseParams(location.href);

	switch( params.screen )
	{
	case "overview_villages":
		var name = document.getElementsByTagName("strong")[1];  // 1, da 0 neuerdings von API-Meldung
		if (params.mode == "groups" && (name.innerHTML.search(/\>alle\<|&gt;alle&lt;/) >= 0 )) {
			var groupTable = document.getElementById("group_assign_table");
			var updateLink = groupTable.rows[0].cells[GruppenSpalte].appendChild(document.createElement("a"));
			updateLink.innerHTML = " &raquo;  aktualisieren (DS Dorf in Dorfnotiz)";
			updateLink.href = "javascript:;";
			updateLink.addEventListener("click", function() {updateGroups();}, false );
		}
		break;
	case "info_village":
		updateVillageNote(params.id);
		break;
	default:
		break;
	}

	function updateGroups() {
		var groups = new Storage("groups",true);
		groups.clear();
		var villageList = document.getElementsByClassName("group_village");
		for (var i = 0; i < villageList.length-1; i++ ) {
			var vID = villageList[i].value;
			var villageName = document.getElementById("label_text_"+vID).innerHTML;
			var coords = villageName.match("\\((\\d{1,3})\\|(\\d{1,3})\\) K(\\d+)$");
			var villageCoords = coords[1] + "_" + coords[2];
			var villageGroups = document.getElementById("assigned_groups_"+vID+"_names").innerHTML.split("; ");
			if (villageGroups[0].search(/nicht zugeordnet/) == -1) {
				for (var j = 0; j < villageGroups.length; j++) {
					groups.setString("groupName_"+villageGroups[j], villageGroups[j]);
					groups.setString(villageGroups[j] + "_vID_" + vID, villageCoords);
				}
			}
		}
		alert("D\u00F6rfer und Gruppen aktualisiert");
	}
	
	function updateVillageNote()
	{
		var groups = new Storage("groups",true);
		var message = document.getElementById("message");
		var bbBar = document.getElementById("bb_bar");
		var groupList = groups.listValues(/groupName_.+/);
		groupList.sort();
		var group = groups.getString(groupList[0]);
		
		bbBar.appendChild(document.createElement("br"));
		var groupSelect = bbBar.appendChild(document.createElement("select"));
		groupSelect.style.backgroundColor = "rgb(255,248,230)";
        for (var j=0; j < groupList.length; j++) {
        	groupSelect.options[j] = new Option(groups.getString(groupList[j]), groups.getString(groupList[j]),false,false);
        }
        
		bbBar.appendChild(document.createTextNode(" Anzahl D\u00F6rfer:"));	
		var numberNext = bbBar.appendChild(document.createElement("input"));
		numberNext.type = "text";
		numberNext.size = 2
		numberNext.value = "5";

		bbBar.appendChild(document.createTextNode(" Mindestentfernung:"));	
		var minDistInput = bbBar.appendChild(document.createElement("input"));
		minDistInput.type = "text";
		minDistInput.size = 2
		minDistInput.value = "1";

		
		var addVillages = bbBar.appendChild(document.createElement("input"));
		addVillages.type = "button";
		addVillages.value = "Add";
		addVillages.addEventListener("click", function() {fillMessage(message, groupSelect.value, numberNext.value, minDistInput.value)}, false);
	}
	
	function fillMessage(message, group, number, minDist) {
		
	    var tab = document.getElementById("content_value").getElementsByTagName("table")[1];
	    var dest = tab.rows[1].cells[1].innerHTML.split("|");
	    var destX = dest[0];
	    var destY = dest[1];
	    // Distanz berechnungn aus DS Market Balanver von cleverguide
		var vdist = [];
	    
		var groups = new Storage("groups",true);
		var villageList = groups.listValues(group+"_vID_.+");
		var content = "Gruppe: [b]" + group + "[/b]\n";
		for (var i = 0; i < villageList.length; i++) {
			var vID = (""+villageList[i]).split("_vID_")[1];
			var coords = groups.getString(villageList[i]).split("_");
			var dist = Math.sqrt(Math.pow(destX - coords[0], 2) + Math.pow(destY - coords[1], 2));
			vdist[i] = [ dist.toFixed(2).toString(), vID, coords[0], coords[1] ]
		}
		vdist.sort(sortNumeric);
		
		var added = 0;
		minDist = minDist.replace(/,/,'.').replace(/[^0-9.-]/g,'');
		minDist = parseFloat(minDist);
		for ( i = 0; i < villageList.length; i++){
			if (parseFloat(vdist[i][0].replace(/[^0-9.-]/g,'')) >= minDist) {
				var url = location.href.split("?")[0] + "?village=" + vdist[i][1] + "&screen=place&target=" + params.id;
				content = content + "[url=" + url + "]Befehle <Entf. " + vdist[i][0]  + "> [/url] " + "[size=7] aus [coord]"+vdist[i][2]+"|"+vdist[i][3]+"[/coord][/size]\n";
				added += 1;	
			}
			if (added >= number) i = villageList.length;
		}	
		message.value = content + "[u].......... .......... .......... .......... .......... .......... .......... .......... [/u]\n\n" 
		                + message.value;
	}
	
	function sortNumeric(a,b) {
		aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
		if (isNaN(aa)) aa = 0;
		bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
		if (isNaN(bb)) bb = 0;
		return aa-bb;
	}
	
	

	//	Autor: Hypix
	function parseParams(url)
	{
		url = url.substring(url.indexOf("?")+1);
		url = url.replace( /&amp;/g, "&" );
		url = url.split("&");
		var params = { get: function(name,def) { if(typeof(this[name]) == "undefined") return def; else return this[name]; }, };
		for( var i = 0; i < url.length; i++ )
		{
			var param = url[i].split("=");
			params[param[0]] = param[1];
		}
		return params;
	}

//	Autor: Hypix
	function getGameData()
	{
		var game_data;
		if(gm) 
		{
			game_data = unsafeWindow.game_data;
		}
		else 
		{
			var script = document.createElement("script");
			script.type = "application/javascript";
			script.textContent = 	"var input=document.createElement('input');" + 
			"input.type='hidden';" + 
			"input.value=JSON.stringify(game_data);"  + 
			"input.id='game_data';" + 
			"document.body.appendChild(input);";
			document.body.appendChild(script);
			document.body.removeChild(script);

			eval("game_data=" + document.getElementById("game_data").value + ";");
		}
		game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
		return game_data;
	}

})();


//Storage-Klasse
//Autor: Hypix
//Zur freien Verwendung
function Storage(prefix,forceGM)
{
	var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
	var win = gm ? unsafeWindow : window;
	var ls = false;
	var intGetValue;
	var intSetValue;
	var prefix = prefix;
	try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
	if( !ls && !gm )
		throw("Keine geeignete SpeichermÃ¯Â¿Â½glichgkeit gefunden");
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
			}
			this.deleteValue = function(key)
			{
				GM_deleteValue(prefix+"_"+key);
			}
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
			}
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
		}
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
		}
	}
	this.clear = function(re)
	{
		var keys = this.listValues(re);
		for( var i = 0; i < keys.length; i++ )
			this.deleteValue(keys[i]);
	}
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
	}  
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
	}
	this.getString = function(key)
	{
		return intGetValue(key);
	}
	this.setString = function(key,value)
	{
		intSetValue(key,value);
	}
}