// ==UserScript==
// @name		DSLoyalty
// @namespace	DsLife
// @description	Version 1.1 | Zeigt im Browsergame "Die Stämme" in der Gebäudeübersicht und im Hauptgebäude die Zustimmungen der einzelnen Dörfer an
// @author		knish3r
// @include		http://*.die-staemme.de/*
// @exclude		http://forum.die-staemme.de/*
// ==/UserScript==

(function(){

/* global variables */
var lib = new Knish3rDSLib("DSLoyalty");
if( !lib.game_data ) return;
var version = "DSLoyalty  1.1";
var imgURL = "http://www.die-staemme.de/graphic/ally_rights/lead.png";
var gui = {
    de: {
        targetForum: "Forum",
        mouseoverTitle: ["Ins Forum zum Thema ", " wechseln"],
        deleteData: "Daten löschen",
        deleteConfirm: "Sollen wirklich alle Daten dieser Welt gelöscht werden?",
        deleted: "Alle Daten auf dieser Welt gelöscht!",
        loyalty: "Zustimmung",
        noLoyaltySaved: "Noch keine Zustimmung gespeichert.",
	sort: "nach Zustimmung sortieren",
	combined: "Kombiniert",
	production: "Produktion",
	buildings: "Gebäude",
        }
}
var regExp = {
    de: {
        groupsFromCurrentVillage: /Gruppenzugehörigkeit/,
        loyalty: /Zustimmung/,
		attackerWon: /Der Angreifer hat gewonnen/,
        }
}
var defaultCheckbox = {combined: false, production: false, buildings: true};

/* settings */
if( location.href.match(/screen=settings&mode=settings/) ) {
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	var td = document.createElement("td");	
	version = version.split(" ");

	th.setAttribute("colspan", "2");
	th.innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=143251' target='"+gui[lib.lang].targetForum+"' title='"+gui[lib.lang].mouseoverTitle[0]+"'" + version[0] + "\""
                +gui[lib.lang].mouseoverTitle[0]+"'>"+version[0] + "<span class='grey'> " + version[version.length-1] + "</span></a>";
	tr.appendChild(th);

	var input = th.appendChild(document.createElement("a"));
	input.innerHTML = gui[lib.lang].deleteData;
	input.id = "dsLoyaltyDelete";
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
	var checkbox = th.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.setAttribute("style", "margin-left:3em;");
	checkbox.checked = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox).combined;
	checkbox.id = "dsloyalty_combined_table";
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("dsloyalty_combined_table").checked ) value.combined = true; else value.combined = false;
		lib.storage.setValue("checkbox_"+lib.game_data.player.id,value);
   	}, false);
	th.appendChild(document.createTextNode(gui[lib.lang].combined));
	checkbox = th.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.setAttribute("style", "margin-left:3em;");
	checkbox.id = "dsloyalty_production_table";
	checkbox.checked = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox).production;
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("dsloyalty_production_table").checked ) value.production = true; else value.production = false;
		lib.storage.setValue("checkbox_"+lib.game_data.player.id,value);
   	}, false);
	th.appendChild(document.createTextNode(gui[lib.lang].production));
	checkbox = th.appendChild(document.createElement("input"));
	checkbox.type = "checkbox";
	checkbox.setAttribute("style", "margin-left:3em;");
	checkbox.id = "dsloyalty_buildings_table";
	checkbox.checked = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox).buildings;
	checkbox.addEventListener("click", function() {
		var value = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox);
		if( document.getElementById("dsloyalty_buildings_table").checked ) value.buildings = true; else value.buildings = false;
		lib.storage.setValue("checkbox_"+lib.game_data.player.id,value);
   	}, false);
	th.appendChild(document.createTextNode(gui[lib.lang].buildings));
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr);
}

/* read-out loyalty from screen=overview */
if( location.href.match(/screen=overview/) && !location.href.match(/screen=overview_villages/)) {
	var loyalty = 100;
	var date = new Date();
	var serverDate = document.getElementById("serverDate").textContent.split("/");
	var serverTime = document.getElementById("serverTime").textContent.split(":");
	date.setFullYear(serverDate[2]); date.setMonth(serverDate[1]-1);
	date.setDate(serverDate[0]); date.setHours(serverTime[0]); 
	date.setMinutes(serverTime[1]); date.setSeconds(serverTime[2]);
	var time = date.getTime()/1000;
	var vis = document.getElementsByClassName("vis").length-2;
	for(v=0; v<vis; v++) {
		var test = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[0].innerHTML;
		if(test.match( regExp[lib.lang].groupsFromCurrentVillage )) 
			break;	
        if(test.match(regExp[lib.lang].loyalty))
			loyalty = parseInt(document.getElementsByClassName("vis")[v].getElementsByTagName("th")[1].innerHTML);
	}
	
	var loyaltyValues = new Array(2);
	loyaltyValues[0] = time;
	loyaltyValues[1] = loyalty;
	lib.storage.setValue("Loyalty_"+lib.game_data.village.id, loyaltyValues);
}

/* update and return loyalty from village: */
var updateLoyalty = function(id) {
	if(lib.storage.getValue("Loyalty_" + id, undefined) != undefined) {
        var date = new Date();
		var serverDate = document.getElementById("serverDate").textContent.split("/");
		var serverTime = document.getElementById("serverTime").textContent.split(":");
		date.setFullYear(serverDate[2]); date.setMonth(serverDate[1]-1);
		date.setDate(serverDate[0]); date.setHours(serverTime[0]); 
		date.setMinutes(serverTime[1]); date.setSeconds(serverTime[2]);
        var values = lib.storage.getValue("Loyalty_" + id,"");
		var newTime = date.getTime()/1000;
		var difference = Math.round((newTime*1-values[0]*1)/3600);
        var loyalty = parseInt(values[1],10)+parseInt(difference);
		
		if(loyalty >= 100) loyalty = 100;	
		if(loyalty < 100) loyalty = "<b style='color:#C00;'>" + loyalty + "</b>";	
	}
	else loyalty = "<span class='grey' style='cursor:help;' title='"+gui[lib.lang].noLoyaltySaved+"'>???<span>";	
	return loyalty;
};

/* show loyalty on screen=main: */
if(location.href.match(/screen=main/)) {
	var loyalty = updateLoyalty(lib.game_data.village.id);
	document.getElementsByTagName("h2")[0].innerHTML += "<br/><img src='" + imgURL + "' title='"+gui[lib.lang].loyalty+"'> <small>"+gui[lib.lang].loyalty+": " + loyalty + "</small>"; 
}

/* show loyalties on buildings_table-overview/ sort loyalties: */
var checkboxes = lib.storage.getValue("checkbox_"+lib.game_data.player.id,defaultCheckbox);
if( (document.getElementById("buildings_table") && checkboxes.buildings) || (document.getElementById("combined_table") && checkboxes.combined) || 
	(document.getElementById("production_table") && checkboxes.production) ) {
	var table = document.getElementsByClassName("vis")[3];
	var trLength = table.getElementsByTagName("tr").length;
	table.getElementsByTagName("tr")[0].appendChild(document.createElement("th"));
	
	for(i=1; i<trLength; i++) {
		if( document.getElementById("buildings_table") )
			var id = table.getElementsByTagName("tr")[i].getElementsByTagName("a")[1].href.split("village=")[1].split("screen=main")[0].replace(/[^0-9]/g,"");
		else var id = table.getElementsByTagName("tr")[i].getElementsByTagName("a")[0].href.split("village=")[1].split("screen=main")[0].replace(/[^0-9]/g,"");
		var loyalty = updateLoyalty(id);
		table.getElementsByTagName("tr")[i].innerHTML += "<td style='text-align:right;'>" + loyalty + "</td>";
	}

	var sorted = 0;		
	var th = table.getElementsByTagName("tr")[0].getElementsByTagName("th");
	th[th.length-1].style.whiteSpace = "nowrap";
	th[th.length-1].style.textAlign = "center";
	th[th.length-1].style.cursor = "pointer";
	th[th.length-1].innerHTML = sorted == 1 ? String.fromCharCode(9650) : String.fromCharCode(9660);
	th[th.length-1].style.color = sorted == 0 ? "grey" : "black";
	var img = th[th.length-1].appendChild(document.createElement("img"));
	img.src = imgURL;
	img.title = gui[lib.lang].sort;
	
    th[th.length-1].addEventListener("click",function() {
		if( sorted != 1 ) sorted = 1; else sorted = -1;
		th[th.length-1].style.color = sorted == 0 ? "grey" : "black";
		if( sorted != 0 ) th[th.length-1].innerHTML = sorted == 1 ? String.fromCharCode(9650) : String.fromCharCode(9660);
		th[th.length-1].appendChild(img);
	
		var loyalties = [];
		for( var i=1 ; i< trLength ; i++ ) {
			var tr = table.getElementsByTagName("tr")[i];
			var td = tr.getElementsByTagName("td");
			var value = td[td.length-1].textContent;
			if( value.match(/\?\?\?/) ) value = sorted != 1 ? 0 : 101;
			loyalties.push( [value , tr ] );
		}
		
		if( sorted != 1 ) {		
			loyalties.sort(function(a,b) {return b[0]-a[0]});} 
		else {loyalties.sort(function(a,b) {return a[0]-b[0]});}

		for( var i=0 ; i< trLength-1 ; i++ )
			table.appendChild(loyalties[i][1]);
	},false);
}

/* update loyalty from village from reports if it was attacked */
if( location.href.match(/screen=report/) && location.href.match(/mode=all&view=/) ) {
	if( document.getElementsByClassName("vis")[2].textContent.match(regExp[lib.lang].attackerWon) ) {
		if( document.getElementById("attack_info_def").getElementsByTagName("a").length > 1) {
			if( document.getElementById("attack_info_def").getElementsByTagName("a")[0].textContent == lib.game_data.player.name ) {
				if( document.getElementById("attack_results").textContent.match(regExp[lib.lang].loyalty) ) {
					var a = document.getElementById("attack_info_def").getElementsByTagName("a");
					var villageId = a[a.length-1].href.split("id=")[1].replace(/[^0-9]/g,"");
					var b = document.getElementById("attack_results").getElementsByTagName("b");
					var loyalty = b[b.length-1].textContent;
					var time = document.getElementsByClassName("vis")[2].getElementsByTagName("td")[1].textContent.split(" ");
					var date = new Date();
					date.setFullYear("20"+time[0].split(".")[2]); date.setMonth(time[0].split(".")[1]-1);
					date.setDate(time[0].split(".")[0]); date.setHours(time[1].split(":")[0]); 
					date.setMinutes(time[1].split(":")[1]); date.setSeconds(time[1].split(":")[2]);
					time = date.getTime()/1000;
					var values = new Array(2);
					values[0] = time; values[1] = loyalty;			
					if( parseInt(loyalty,10) < 0 ) {
						lib.storage.deleteValue("Loyalty_"+villageId);
						return;
					}
						
					var value = lib.storage.getValue("Loyalty_"+villageId,"");
					if( value != "" ) {
						if( value[0] < time )
							lib.storage.setValue("Loyalty_"+villageId,values);
					} else lib.storage.setValue("Loyalty_"+villageId,values);
				}
			}
		}
		if( document.getElementById("attack_info_att").getElementsByTagName("a").length > 1) {
			if( document.getElementById("attack_info_att").getElementsByTagName("a")[0].textContent == lib.game_data.player.name ) {
				if( document.getElementById("attack_results").textContent.match(regExp[lib.lang].loyalty) ) {
					var b = document.getElementById("attack_results").getElementsByTagName("b");
					if( parseInt( b[b.length-1].textContent,10) < 0 ) {
						var a = document.getElementById("attack_info_def").getElementsByTagName("a");
						var villageId = a[a.length-1].href.split("id=")[1].replace(/[^0-9]/g,"");
						var time = document.getElementsByClassName("vis")[2].getElementsByTagName("td")[1].textContent.split(" ");
						var date = new Date();
						date.setFullYear("20"+time[0].split(".")[2]); date.setMonth(time[0].split(".")[1]-1);
						date.setDate(time[0].split(".")[0]); date.setHours(time[1].split(":")[0]); 
						date.setMinutes(time[1].split(":")[1]); date.setSeconds(time[1].split(":")[2]);
						time = date.getTime()/1000;
						var values = new Array(2);
						values[0] = time; values[1] = 25;
						var value = lib.storage.getValue("Loyalty_"+villageId,"");
						if( value != "" ) {
							if( value[0] < time ) lib.storage.setValue("Loyalty_"+villageId,values);
						} else lib.storage.setValue("Loyalty_"+villageId,values);
					}
				}
			}
		}
	}
}

function Knish3rDSLib(prefix) {
    //Hypix's storage-class; thanks for providing!
    this.StorageHandler = function(prefix,forceGM){
        var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1;
        var win = gm ? unsafeWindow : window;
        var ls = false;
        var intGetValue;
        var intSetValue;
        var prefix = prefix;
        try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
        if( !ls && !gm )
            throw("Keine geeignete Speichermöglichgkeit gefunden");
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
            this.listValues = function(re) {
                var keys = [];
                var rePrefix = new RegExp("^"+prefix+"_(.*)$");
                if( typeof(re) != "undefined")
                    var reKey = new RegExp(re);
                for( var i = 0; i < win.localStorage.length; i++ ) {
                    var res = localStorage.key(i).match(rePrefix);
                    if( res ) {
                        if( reKey ) {
                            res = res[1].match(reKey);
                            if( res ) keys.push(res);
                        } else keys.push(res[1]);
                    }
                } return keys;
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
		if( typeof(game_data) == "undefined" ) game_data = false;
        return game_data;
    }
    this.game_data = this.getGameData();
    this.storage = new this.StorageHandler(prefix,true);
    if( !this.game_data ) return;
    this.lang = this.game_data.world.replace(/[0-9]/g,"");
}

})();
