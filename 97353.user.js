// ==UserScript==
// @name DS AGCounter
// @description Version 1.2 Zählt zerstörte AGs
// @include http://de*.die-staemme.de/game.php*screen=*
// ==/UserScript==

(function() {

var lib = new Knish3rDSLib("DSAGCounter");

var gui = {
	de: {
		version: "DSAGCounter 1.2",
		nobleMen: "AGs",
		kills: ["Du hast bereits","AGs deiner Feinde geschrottet."],
		deleteData: "Daten löschen",
		deleteConfirm: "Soll wirklich der AGCounter für diesen Account zurückgesetzt werden?",
		deleted: "Der AGCounter wurde zurückgesetzt!",
	}
}
var regExp = {
	de: {
		attackerLost: /Der Verteidiger hat gewonnen/,
		attackerWon: /Der Angreifer hat gewonnen/,
	}
}

var nobleMenKills = lib.storage.getValue("killsNoblemen_"+lib.game_data.player.id,[0,0]);

var table1 = document.createElement("table");
table1.className="header-border menu_block_right";
var tbody = table1.appendChild(document.createElement("tbody"));
var tr = tbody.appendChild(document.createElement("tr"));
var td = tr.appendChild(document.createElement("td"));
var table = document.createElement("table");
table.className="box smallBadding";
table.style.emptyCells = "show";
table.cellSpacing = "0";
td.appendChild( table );
table = table.appendChild(document.createElement("tbody"));
var row = table.appendChild(document.createElement("tr") );
var row2 =  tbody.appendChild(document.createElement("tr") ); 
row2.className = "newStyleOnly";
var cell = row2.appendChild(document.createElement("td"));
cell.className = "shadow";
var div = cell.appendChild(document.createElement("div")).className = "leftshadow";
div = cell.appendChild(document.createElement("div")).className = "rightshadow";
cell = row.appendChild(document.createElement("td") );
cell.className = "icon-box firstcell";
cell.innerHTML = gui[lib.lang].nobleMen+": <b>"+nobleMenKills[0]+"/"+nobleMenKills[1]+"</b>";
cell.title = gui[lib.lang].kills[0]+" "+nobleMenKills[0]+"/"+nobleMenKills[1]+" "+gui[lib.lang].kills[1];
var td = document.createElement("td");
td.appendChild(table1);
td.setAttribute("align","center");
var a = document.getElementById("header_info").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[0].getElementsByTagName("td");

for( var i=0 ; i<a.length ; i++ ) {
	if( a[i].textContent == " " ) {
		a[i].parentNode.replaceChild(td,a[i]);
		break;
	}
}

if( location.href.match(/screen=settings&mode=settings/) ) {
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	var td = document.createElement("td");	

	th.setAttribute("colspan", "2");
	th.innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=144495' target='Forum' title='Ins Forum zum Thema \"DSAGCounter\" wechseln'>"+gui[lib.lang].version+"</a>";
	tr.appendChild(th);

	var input = th.appendChild(document.createElement("a"));
	input.innerHTML = gui[lib.lang].deleteData;
	input.id = "dsAGCounterdelete";
	input.setAttribute("style", "margin-left:4.3em;");
	input.href = "javascript:;";
	input.addEventListener("click", function() {
    		if( confirm( gui[lib.lang].deleteConfirm ) ) {
         		lib.storage.deleteValue("killsNoblemen_"+lib.game_data.player.id);
            		alert( gui[lib.lang].deleted );
       		}
    	}, false);
	document.getElementsByClassName("vis settings")[0].appendChild(tr);
}

if( location.href.match(/screen=report/) && location.href.match(/view=/) ) {
	var vis = document.getElementsByClassName("vis")[3].textContent;
	if( vis.match(regExp[lib.lang].attackerLost) || vis.match(regExp[lib.lang].attackerWon) ) {
		if( document.getElementById("attack_info_def").getElementsByTagName("a").length > 1) {
			if( document.getElementById("attack_info_def").getElementsByTagName("a")[0].textContent == lib.game_data.player.name ) {
				if( document.getElementById("attack_info_att").getElementsByTagName("a")[0].textContent != lib.game_data.player.name ) {
					var id = location.href.split("view=")[1].split("&")[0].replace(/[^0-9]/);		
					var attack = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[1].getElementsByTagName("td");
					var kills = 0, atts=0; if( attack[attack.length-1].textContent != 0 ) {
						atts=parseInt( attack[attack.length-1].textContent,10 );
						attack = document.getElementById("attack_info_att_units").getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2].getElementsByTagName("td");
						kills=parseInt( attack[attack.length-1].textContent,10 );
						var savedIDs = lib.storage.getValue("savedIDs_"+lib.game_data.player.id,"").split(";"); var match = false;
						for( var i=0 ; i<savedIDs.length ; i++) {if( savedIDs[i] == id) match=true;}
						if( !match ) {
							savedIDs[savedIDs.length] = id;
							if( savedIDs.length > 500 ) savedIDs.shift(); var value="";
							for( var i=0; i<savedIDs.length-1 ; i++ ) {
								value += savedIDs[i]+";";
							} value += savedIDs[savedIDs.length-1];
							lib.storage.setValue("savedIDs_"+lib.game_data.player.id,value);
							nobleMenKills[0] += kills;
							nobleMenKills[1] += atts;
							lib.storage.setValue("killsNoblemen_"+lib.game_data.player.id,nobleMenKills);
						}
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
    if( this.lang == "des" || this.lang == "dec" || (this.lang == "ch" && this.game_data.world.replace(/[^0-9]/) < 4) || this.lang == "chs" )
	this.lang = "de";
}

})();
