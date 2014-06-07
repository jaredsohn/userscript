// ==UserScript==
// @name           DS - Speicherstände
// @namespace      Die Stämme
// @description	   Version 1.1.5 | Zeigt im Browsergame "Die Stämme" in der Dörferübersicht die Speicherstände der einzelnen Dörfer prozentual und farbig an
// @author         Roman S. (Zombie74)
// @include        http://*.die-staemme.de/*
// ==/UserScript==


/* StorageHandler geborgt von Hypix (DS Famrmanager2)
 * hinzugefügt von Buccaneer
 */
if( typeof(StorageHandler) == "undefined" )
{
  var StorageHandler = function(prefix,forceGM)
  {
    var gm = typeof(unsafeWindow) != "undefined";
    var win = gm ? unsafeWindow : window;
    var ls = false;
    try {ls = typeof(win.localStorage) != "undefined";} catch(e) {new Debug().log(e.description);}
    if( forceGM && gm || !ls)
    {
      if( gm )
      {
        prefix = prefix + "_" + document.location.host.split('.')[0];
        this.setValue = function(key,value) 
        {
          GM_setValue(prefix+"_"+key,value);
        };
        this.getValue = function(key,defaultValue)
        {
          return GM_getValue(prefix+"_" + key, defaultValue);
        }
        this.deleteValue = function(key)
        {
          GM_deleteValue(prefix+"_"+key);
        }
        this.listValues = function()
        {
          var allkeys = GM_listValues();
          var serverKeys = [];
          var re = new RegExp("^"+prefix+"_(.*)");
          for( var i = 0; i < allkeys.length; i++ )
          {
            var res = allkeys[i].match(re);
            if( res )
              serverKeys.push(res[1]);
          }
          return serverKeys;
        }
      }
      else
      {
        alert( "Keine geeignete Speichermöglichkeit gefunden!");
        end;
      }
    }
    else if( ls )
    {
      this.setValue = function(key,value) 
      {
        localStorage.setItem(prefix+"_"+key, value );
      };    
      this.getValue = function(key,defaultValue)
      {
        var value = localStorage.getItem(prefix+"_"+key);
        if( value )
          return value;
        else
          return defaultValue;
      };
      this.deleteValue = function(key)
      {
        localStorage.removeItem("hpxdsfm_"+key);
      }
      this.listValues = function()
      {
        var keys = [];
        for( var i = 0; i < win.localStorage.length; i++ )
        {
          var res = localStorage.key(i).match("^hpxdsfm_(.*)");
          if( res )
            keys.push(res[1]);
        }
        return keys;
      }
    }
    else
    {
      alert( "Keine geeignete Speichermöglichkeit gefunden!");
      end;
    }
    this.clear = function()
    {
      var keys = this.listValues();
      for( var i = 0; i < keys.length; i++ )
        this.deleteValue(keys[i]);
    }
  }
}

var storage = new StorageHandler("hpxdsfm",true);

// Aktuell installierte Version:
var vers_ist = "DS - Speicherstände 1.1.5";



// Aktueller Dateipfad:
var url = document.location.href;


// Welt:
var welt = url.split(".")[0].replace("http://de", "");


// Dorf-ID:
var dorf_ID = url.split("village=")[1].split("&")[0];





// Einstellungen:
if(url.match(/screen=settings&mode=settings/)) {
	var vers = vers_ist.split(" ");
	var version = "";
	for(v=0; v<vers.length; v++) {
		if(v < vers.length-1) {
			version += vers[v] + " ";
		}
		else {
			version += "<span class='grey'>" + vers[v] + "</span>";
		}
	}
	
	// Einstellungen (Speicherstände):
	if(url.match(/einstellung=speicher/)) {
		// Kompakte Darstellung:
		if(confirm("Kompakt:\n\nSoll die kompakte Anzeige verwendet werden?")) {
			storage.setValue("Speicher-Zip-" + welt, "an");		
		}
		else {
			storage.setValue("Speicher-Zip-" + welt, "aus");		
		}
		// Kopfzeile an/aus als GM-Value speichern:
		if(confirm("Kopfzeile:\n\nSollen in der Kopfzeile die Prozentwerte für Rohstoffe und Bauernhof angezeigt werden?")) {
			storage.setValue("Speicher-Top-" + welt, "an");		
		}
		else {
			storage.setValue("Speicher-Top-" + welt, "aus");		
		}
		// Aktuelles Dorf an/aus als GM-Value speichern:
		if(confirm("Aktuelles Dorf:\n\nSoll in der Dörferübersicht (bei PA Produktionsübersicht) das aktuelle Dorf farblich hevorgehoben werden?")) {
			storage.setValue("Speicher-Akt-" + welt, "an");		
		}
		else {
			storage.setValue("Speicher-Akt-" + welt, "aus");		
		}
		// Zustimmung an/aus als GM-Value speichern:
		if(confirm("Zustimmung:\n\nSoll in der Dörferübersicht (bei PA Produktionsübersicht) die Zustimmung der einzelnen Dörfer angezeigt werden?")) {
			storage.setValue("Speicher-Zus-" + welt, "an");		
		}
		else {
			storage.setValue("Speicher-Zus-" + welt, "aus");		
		}
		// Goldmünzen & AG an/aus GM-Value speichern:
		if(confirm("Gold / AG:\n\nSoll die Anzahl der möglichen Goldmünzen / AG angezeigt werden?")) {
			storage.setValue("Speicher-GAG-" + welt, "an");		
		}
		else {
			storage.setValue("Speicher-GAG-" + welt, "aus");		
		}
		// Bauernhof %:
		if(confirm("Bauernhof %:\n\nSollen die Auslastungen der Bauernhöfe prozentual und farbig angezeigt werden?")) {
			storage.setValue("Speicher-Bau-" + welt, "an");		
		}
		else {
			storage.setValue("Speicher-Bau-" + welt, "aus");		
		}
		// Andere Farben für Farbenblinde:
		if(confirm("Farben normal:\n\nSollen die farbigen Abstufungen von Grün (0%) nach Rot (100%) angezeigt werden?\n\nWenn Du Farbenblind bist und eine Rot-Grün-Fehlsichtigkeit hast, solltest Du auf Abbrechen klicken.\nDann werden die farbigen Abstufungen von Gelb (0%) nach Blau (100%) angezeigt.")) {
			storage.setValue("Speicher-Blind-RG-" + welt, "aus");		
		}
		else {
			storage.setValue("Speicher-Blind-RG-" + welt, "an");		
		}
	}
	
	var tr = new Array();
	tr[0] = document.createElement("tr");
	tr[1] = document.createElement("tr");
	var th = new Array();
	th[0] = document.createElement("th");
	th[1] = document.createElement("th");
	var td = new Array();
	td[0] = document.createElement("td");
	td[1] = document.createElement("td");
	
	th[0].setAttribute("colspan", "2");
	th[0].innerHTML = "<a href='http://forum.die-staemme.de/showthread.php?t=101777' target='Forum' title='Ins Forum zum Thema \"" + version.split(" <span")[0] + "\" wechseln'>" + version + "</a>";
	td[0].setAttribute("style", "vertical-align:top;");
	
	if((storage.getValue("Speicher-Zip-" + welt) == undefined) && 
		(storage.getValue("Speicher-Top-" + welt) == undefined) && 
		(storage.getValue("Speicher-Akt-" + welt) == undefined) && 
		(storage.getValue("Speicher-Zus-" + welt) == undefined) && 
		(storage.getValue("Speicher-GAG-" + welt) == undefined) && 
		(storage.getValue("Speicher-Bau-" + welt) == undefined) && 
		(storage.getValue("Speicher-Blind-RG-" + welt) == undefined)) {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_ID + "&screen=settings&mode=settings&einstellung=speicher''>Einstellungen speichern</a>";
		td[1].innerHTML = "<span class='grey'>Bisher wurden noch keine Einstellungen gespeichert</span>";
	}
	else {
		td[0].innerHTML = "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_ID + "&screen=settings&mode=settings&einstellung=speicher''>Einstellungen ändern</a>";
		var speicher_zip = storage.getValue("Speicher-Zip-" + welt);
		var speicher_top = storage.getValue("Speicher-Top-" + welt);
		var speicher_akt = storage.getValue("Speicher-Akt-" + welt);
		var speicher_zus = storage.getValue("Speicher-Zus-" + welt);
		var speicher_gag = storage.getValue("Speicher-GAG-" + welt);
		var speicher_bau = storage.getValue("Speicher-Bau-" + welt);
		var speicher_rgb = storage.getValue("Speicher-Blind-RG-" + welt);
		
		td[1].innerHTML += "<b style='padding-right:41px;'>Kompakt:</b>" + speicher_zip.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:19px;'>Kopfzeile %:</b>" + speicher_top.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:5px;'>Hervorhebung:</b>" + speicher_akt.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:19px;'>Zustimmung:</b>" + speicher_zus.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:32px;'>Gold & AG:</b>" + speicher_gag.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + " <span class='grey>ab Welt 3</span><br>";
		td[1].innerHTML += "<b style='padding-right:12px;'>Bauernhof %:</b>" + speicher_bau.replace("an", "<span style='color:#090'>an</span>").replace("aus", "<span style='color:#C00'>aus</span>") + "<br>";
		td[1].innerHTML += "<b style='padding-right:21px;'>Farbenblind:</b>" + speicher_rgb.replace("an", "<span style='color:#090'>an</span> <span class='grey>Gelb (0%) &raquo; Blau (100%)</span>").replace("aus", "<span style='color:#C00'>aus</span> <span class='grey>Grün (0%) &raquo; Rot (100%)</span>");
	}
	
	tr[0].appendChild(th[0]);
	tr[1].appendChild(td[0]);
	tr[1].appendChild(td[1]);
	
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[0]);
	document.getElementsByClassName("main")[0].getElementsByTagName("table")[2].appendChild(tr[1]);
}
else {
	if((url.match(/screen=/)) && 
		((storage.getValue("Speicher-Zip-" + welt) == undefined) || 
		(storage.getValue("Speicher-Top-" + welt) == undefined) || 
		(storage.getValue("Speicher-Akt-" + welt) == undefined) || 
		(storage.getValue("Speicher-Zus-" + welt) == undefined) || 
		(storage.getValue("Speicher-GAG-" + welt) == undefined) || 
		(storage.getValue("Speicher-Bau-" + welt) == undefined) || 
		(storage.getValue("Speicher-Blind-RG-" + welt) == undefined))) {
		if(confirm(vers_ist + " ist jetzt installiert\n\nKlicke auf OK um die Einstellungen für die Anzeige der Speicherstände vorzunehmen")) {
			document.location.href = "http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_ID + "&screen=settings&mode=settings&einstellung=speicher";
		}
		else {
			// Standardwerte als GM-Value speichern
			storage.setValue("Speicher-Zip-" + welt, "aus");
			storage.setValue("Speicher-Top-" + welt, "an");
			storage.setValue("Speicher-Akt-" + welt, "an");
			storage.setValue("Speicher-Zus-" + welt, "an");
			storage.setValue("Speicher-GAG-" + welt, "an");
			storage.setValue("Speicher-Bau-" + welt, "an");
			storage.setValue("Speicher-Blind-RG-" + welt, "aus");
		}
	}
}











// Nur in der Dorfübersicht anwenden:
if((url.match(/screen=overview$/)) || (url.match(/screen=overview&$/))) {
	var vis = document.getElementsByClassName("vis").length-1;
	var Stunde = new Date().getHours();
	var test = "";
	var zustimmung = 100;
	for(v=0; v<vis; v++) {
		test = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[0].innerHTML;
		if(test.match(/Zustimmung/)) {
			zustimmung = document.getElementsByClassName("vis")[v].getElementsByTagName("th")[1].innerHTML;
		}		
	}
	
	// Werte als GTM-Value speichern:
	storage.setValue("Stunde-" + dorf_ID, Stunde);
	storage.setValue("Zustimmung-" + dorf_ID, zustimmung);
}


// Kopfzeile:
if(storage.getValue("Speicher-Top-" + welt) == "an") {
	// Prozentanzeige in Kopfzeile für das aktuelle Dorf:
	var akt_holz = document.getElementById("wood").innerHTML;
	var akt_lehm = document.getElementById("stone").innerHTML;
	var akt_eisen = document.getElementById("iron").innerHTML;
	var akt_speicher = document.getElementById("storage").innerHTML;
	
	var pro_holz = Math.round((100/akt_speicher)*akt_holz);
	var pro_lehm = Math.round((100/akt_speicher)*akt_lehm);
	var pro_eisen = Math.round((100/akt_speicher)*akt_eisen);
	
	document.getElementById("wood").innerHTML += "<span class='grey' style='margin-left:5px;'>(" + pro_holz + "%)</span>";
	document.getElementById("stone").innerHTML += "<span class='grey' style='margin-left:5px;'>(" + pro_lehm + "%)</span>";
	document.getElementById("iron").innerHTML += "<span class='grey' style='margin-left:5px;'>(" + pro_eisen + "%)</span>";
	
	
	var box   = document.getElementsByClassName("box").length-1;
	var box_l = document.getElementsByClassName("box")[box].innerHTML;
	var box_v = document.getElementsByClassName("box")[box-1].innerHTML;

	if(box_l.match(/att.png/)) {
		if(box_v.match(/unit_knight.png/)) {
			box = box-2;
		}
		else {
			box = box-1;
		}		
	}
	else {
		if(box_l.match(/unit_knight.png/)) {
			box = box-1;
		}		
	}
	
	volk_ist = document.getElementById("pop_current").innerHTML;
	volk_max = document.getElementById("pop_max").innerHTML;
	
	var pro_volk = Math.round((100/volk_max)*volk_ist);
	
	
	// Erst ab Welt 3 bei aktivierter GAG-Anzeige:
	if((welt >= 3) && (storage.getValue("Speicher-GAG-" + welt) == "an")) {
		var gold_holz = akt_holz - (akt_holz%28000);
		var gold_lehm = akt_lehm - (akt_lehm%30000);
		var gold_eisen = akt_eisen - (akt_eisen%25000);
	
		var snob_holz = akt_holz - (akt_holz%40000);
		var snob_lehm = akt_lehm - (akt_lehm%50000);
		var snob_eisen = akt_eisen - (akt_eisen%50000);
		
		if((welt == 3) || (welt == 9)) {
			var gold_preis_holz = 20000;
			var gold_preis_lehm = 30000;
			var gold_preis_eisen = 25000;
			var snob_preis_holz = 20000;
			var snob_preis_lehm = 30000;
			var snob_preis_eisen = 25000;
		}
		else if((welt >= 4) && (welt <= 8)) {
			var gold_preis_holz = 28000;
			var gold_preis_lehm = 30000;
			var gold_preis_eisen = 25000;
			var snob_preis_holz = 28000;
			var snob_preis_lehm = 30000;
			var snob_preis_eisen = 25000;
		}
		else if(welt >= 10) {
			var gold_preis_holz = 28000;
			var gold_preis_lehm = 30000;
			var gold_preis_eisen = 25000;
			var snob_preis_holz = 40000;
			var snob_preis_lehm = 50000;
			var snob_preis_eisen = 50000;
		}
	
		var gold = Math.floor(Math.min(Math.min(gold_holz/gold_preis_holz,gold_lehm/gold_preis_lehm),gold_eisen/gold_preis_eisen));
		var snob = Math.floor(Math.min(Math.min(snob_holz/snob_preis_holz,snob_lehm/snob_preis_lehm),snob_eisen/snob_preis_eisen));
	
		document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += "<span class='grey' style='margin-left:5px;'>(" + pro_volk + "%)</span>";
		
		if(welt >= 10) {
			document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += " <img src='http://de" + welt + ".die-staemme.de/graphic/gold.png' style='height:14px; cursor:help;' title='Du kannst in diesem Dorf " + gold + " Goldmünzen prägen'> " + gold;
		}
		else {
			document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += " <img src='http://de" + welt + ".die-staemme.de/graphic/res.png' style='height:14px; cursor:help;' title='Du kannst in diesem Dorf " + gold + " x Ressourcen einlagern.'> " + gold;
		}
	
		if(snob > 0) {
			var volk_rest = (volk_max - volk_ist);
			var volk_soll = (snob * 200);
			
			var max_snob = Math.round(volk_rest/200);
	
			var plus_snob = "";
			if(max_snob > 1) {
				plus_snob = "er";
			}
	
			if(max_snob >= 1) {
				snob_gesamt_2 += snob;
				if(max_snob < snob){
					document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += " <img src='http://de" + welt + ".die-staemme.de/graphic/unit/unit_snob.png' style='height:14px; cursor:help;' title='Du kannst in diesem Dorf " + max_snob + " von " + snob + " Adelsgeschlechtern produzieren'> <a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_ID + "&screen=snob'>" + max_snob + "</a><span class='grey'> /" + snob + "</span>&nbsp;";
				}
				else {
					document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += " <a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_ID + "&screen=snob'> <img src='http://de" + welt + ".die-staemme.de/graphic/unit/unit_snob.png' style='height:14px; cursor:help;' title='Du kannst in diesem Dorf " + snob + " Adelsgeschlecht" + plus_snob + " produzieren'> " + snob + "</a><span class='grey'>/" + snob + "</span>&nbsp;";
				}
			}
			else {
				document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += " <span class='grey' title='Der Bauernhof in diesem Dorf kann keine weiteren Einheiten versorgen'><img src='http://de" + welt + ".die-staemme.de/graphic/unit/unit_snob.png' style='height:14px; cursor:help;'> 0/" + snob + "</span>&nbsp;";
			}
		}
		else {
			document.getElementsByClassName("box")[box].getElementsByTagName("td")[1].innerHTML += " <span class='grey' title='In diesem Dorf können keine weiteren Adelsgeschlechter produziert werden'> <img src='http://de" + welt + ".die-staemme.de/graphic/unit/unit_snob.png' style='height:14px; cursor:help;'> " + snob + "</span>&nbsp;";
		}
	}
}






// PA-Info:
var info = 0;


// Nur in der Dörferübersicht anwenden:
if(url.match(/screen=overview_villages/)) {

	var test1 = "";
	var test2 = "";
	var mini =  storage.getValue("Speicher-Zip-" + welt);
	//var mini = 1;

	test1 = document.getElementById("overview");


	// Ohne PA:   
	if(test1 == null) {
		info = 1;
	}
	// Mit PA:   
	else {
		test2 = document.getElementsByClassName("main")[0].getElementsByClassName("vis")[0].getElementsByClassName("selected")[0].getElementsByTagName("a")[0].innerHTML;
		if(test2 == "Produktion") {
			info = 2;
		}
	}


   	if(info >= 1) {
		// Anzahl der Tabellen ermitteln:
		var main = document.getElementsByClassName("main").length-1;
		var vis = document.getElementsByClassName("main")[main].getElementsByTagName("table").length;
		var kopf = "";


		// Tabelle auswählen:
		if(info == 1) {
			if(vis > 1) {
				vis = vis -2;
			}
			else {
				vis = 0;
			}
		}


		if(info == 2) {
			vis = 3;
		}


		// Anzahl der Spalten ermitteln:
		var spalten = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].getElementsByTagName("th").length;

		// Anzahl der Zeilen ermitteln:
		var zeilen = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr").length;
		// Kopf:
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;' title='Dorfname'>Dörfer Welt-" + welt + "</th>";
		
		// Punkte:
		if(mini != "an") {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default;' title='Punkte'>Punkte</th>";
		}
		else {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default;' title='Punkte'>Pkt.</th>";
		}
		
		// Zustimmung:
		if(storage.getValue("Speicher-Zus-" + welt) == "an") {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topright:10px;'><img src='http://de33.die-staemme.de/graphic/ally_rights/lead.png' title='Zustimmung'></th>";
		}
		
		// Holz:
		kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/holz.png' title='Holz' alt='' /></th>";
		if(mini != "an") {
			kopf += "<th style='text-align:center; cursor:default; -moz-border-radius-topright:10px;'>Holz</th>";
		}
		
		// Lehm:
		if(mini != "an") {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/lehm.png' title='Lehm' alt='' /></th>";
			kopf += "<th style='text-align:center; cursor:default; -moz-border-radius-topright:10px;'>Lehm</th>";
		}
		else {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default;'><img src='/graphic/lehm.png' title='Lehm' alt='' /></th>";
		}
		
		// Eisen:
		if(mini != "an") {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/eisen.png' title='Eisen' alt='' /></th>";
			kopf += "<th style='text-align:center; cursor:default; -moz-border-radius-topright:10px;'>Eisen</th>";
		}
		else {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topright:10px;'><img src='/graphic/eisen.png' title='Eisen' alt='' /></th>";
		}
		
		// Speicher:
		if(mini != "an") {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/res.png' title='Speicher' alt='' /></th>";
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topright:10px;'>Max.</th>";
		}
		else {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='/graphic/res.png' title='Speicher' alt='' /></th>";
		}
		
		// Händler:
		if(info == 2) {
			if(mini != "an") {
				kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'>Händler</th>";
			}
			else {
				kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='/graphic/buildings/market.png' title='Händler' alt='' /></th>";
			}	
		}
		
		// Bauernhof:
		if(mini != "an") {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/face.png' title='Bauernhof' alt='' /></th>";
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topright:10px;'>Bauernhof</th>";
		}
		else {
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px; -moz-border-radius-topright:10px;'><img src='/graphic/face.png' title='Bauernhof' alt='' /></th>";
		}
		
		// Goldmünzen / AG:
		if((welt >= 3) && (storage.getValue("Speicher-GAG-" + welt) == "an")) {
			if(welt >= 10) {
				kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/gold.png' title='Goldmünzen' alt='' /></th>";
			}
			else {
				kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topleft:10px;'><img src='/graphic/res.png' title='Einlagerungen' alt='' /></th>";
			}
			kopf += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-topright:10px;'><img src='/graphic/unit/unit_snob.png' title='Adelsgeschlechter' alt='' /></th>";
		}
		if(info == 2) {
			if(mini != "an") {
				kopf += "<th style='text-align:center; padding:2px; cursor:default; -moz-border-radius-topleft:10px;'>Bauauftrag</th>";
				kopf += "<th style='text-align:center; padding:2px; cursor:default;'>Forschung</th>";
				kopf += "<th style='text-align:center; padding:2px; -moz-border-radius-topright:10px; cursor:default;'>Rekrutierung</th>";
			}
			else {
				kopf += "<th style='text-align:center; padding:2px; cursor:default; -moz-border-radius-topleft:10px;'>Bau.</th>";
				kopf += "<th style='text-align:center; padding:2px; cursor:default;'>For.</th>";
				kopf += "<th style='text-align:center; padding:2px; -moz-border-radius-topright:10px; cursor:default;'>Rek.</th>";
			}
		}
		// kopf aktualisieren:
		document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[0].innerHTML = kopf;   

		var holz_gesamt = 0;
		var lehm_gesamt = 0;
		var eisen_gesamt = 0;
		var speicher_gesamt = 0;
		var volk_gesamt_1 = 0;
		var volk_gesamt_2 = 0;
		var gold_gesamt = 0;
		var snob_gesamt_1 = 0;	
		var snob_gesamt_2 = 0;	

		// Zeilen:
		for(i=1; i<zeilen; i++) {
			// Neue Zeile:
			var zeile = "";   
			// Werte aus Zeile auslesen:
			var dorf = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
			var dorf_link = dorf.split("village=");
			var dorf_id = dorf_link[1].split("&");
			
			var punkte = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[1].innerHTML;
			if(storage.getValue("Zustimmung-" + dorf_id[0]) != undefined) {
				var zustimm = storage.getValue("Zustimmung-" + dorf_id[0]);
				if(zustimm != 100) {
					var std_1 = storage.getValue("Stunde-" + dorf_id[0]);
					var std_2 = new Date().getHours();
					var stunden = std_2 - std_1;
					zustimm = (storage.getValue("Zustimmung-" + dorf_id[0])*1)+(stunden*1);
				}
				if(zustimm <= 100) {
					var zustimmung = zustimm;
				}
				else {
					var zustimmung = 100;
				}
			}
			else {
				var zustimmung = "<span style='color:silver; cursor:help;' title='Der Wert für die Zustimmung wurde noch nicht gespeichert'>100</span>";
			}
			var rohstoffe = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML;
			var rohstoff = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[2].innerHTML.split("<img");
			var speicher = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML;
			
			if(info == 2) {
				var haendler = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML;
				var bauernhof = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[5].innerHTML.split("/");
			}
			else {
				var bauernhof = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[4].innerHTML.split("/");
			}
			
			// PA-extras einfügen:
			if(info == 2) {
				for(z=5; z<=7; z++) {
					var bilder = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[z].getElementsByTagName("img").length;
					for(b=0; b<bilder; b++) {
						document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[z].getElementsByTagName("img")[b].setAttribute("style", "height:14px; margin-left:2px;");	
					}
				}
				
				var ba = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[6].innerHTML.split("<br>")[1];
				if(ba != undefined) {
					var bauauftrag = "<small> " + ba + "</small>";
				}
				else {
					var bauauftrag = "";
				}
				var forschung = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[7].innerHTML;
				var rekrutierung = document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].getElementsByTagName("td")[8].innerHTML;
			}

   
			// Werte extrahieren:
			var holz = rohstoff[1].split("\"\">");
			var lehm = rohstoff[2].split("\"\">");
			var eisen = rohstoff[3].split("\"\">");

   
			// Werte umwandeln:
			var wert_h = holz[1];
			var wert_l = lehm[1];
			var wert_e = eisen[1];
   
			// Code by -- Tera
			wert_h = wert_h.replace(/SPAN/gi,"span");
			wert_l = wert_l.replace(/SPAN/gi,"span");
			wert_e = wert_e.replace(/SPAN/gi,"span");
			
			
			var w_h = wert_h.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"warn\">", "").replace("</span>", "");
			var w_l = wert_l.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"warn\">", "").replace("</span>", "");
			var w_e = wert_e.replace("<span class=\"grey\">.</span>", "").replace("<span class=\"warn\">", "").replace("</span>", "");

	   
			// Werte umwandeln:
			holz_gesamt += parseFloat(w_h);
			lehm_gesamt += parseFloat(w_l);
			eisen_gesamt += parseFloat(w_e);
			speicher_gesamt += parseFloat(speicher);
			volk_gesamt_1 += parseFloat(bauernhof[0]);
			volk_gesamt_2 += parseFloat(bauernhof[1]);
   
			// Farben:


			// Farbabstufungen:
			var stufen = 100;
			var teile = 100/stufen;
			var schritt = Math.round(255/stufen)-1;
			var hgFarbe = new Array();
			
			// Farben für Farbenblinde | Gelb (0%) - Blau (100%)
			if(storage.getValue("Speicher-Blind-RG-" + welt) == "an") {
				var colorR = 255;
				var colorG = 255;
				var colorB = 0;
				
				for(c=0; c<=stufen; c++) {
					var farbeR = (colorR - schritt * c).toString(16);
					var farbeG = (colorG - schritt * c).toString(16);
					var farbeB = (colorB + schritt * c).toString(16);
	   
					if(farbeR.length == 1) {
						farbeR = "0" + farbeR;
					}
					if(farbeG.length == 1) {
						farbeG = "0" + farbeG;
					}
					if(farbeB.length == 1) {
						farbeB = "0" + farbeB;
					}
	
					hgFarbe[c] = "#" + farbeR + farbeG + farbeB;
				}
			}
			// Normale Farben | Grün (0%) - Rot (100%)
			else {
				var colorR = 0;
				var colorG = 255;
				var colorB = 255;
				
				for(c=0; c<=stufen; c++) {
					var farbeR = (colorR + schritt * c).toString(16);
					var farbeG = (colorG - schritt * c).toString(16);
					var farbeB = "00"
					var farbeB = "00"
	   
					if(farbeR.length == 1) {
						farbeR = "0" + farbeR;
					}
					if(farbeG.length == 1) {
						farbeG = "0" + farbeG;
					}
	
					hgFarbe[c] = "#" + farbeR + farbeG + farbeB;
				}
			}


			// Restwerte ermitteln:
			var rest_h = Math.round(speicher-w_h);
			var rest_l = Math.round(speicher-w_l);
			var rest_e = Math.round(speicher-w_e);
			var rest_b = Math.round(bauernhof[1]-bauernhof[0]);
			
			if(rest_h >= 1000) {
				rest_h = (rest_h/1000).toFixed(3);
			}
			if(rest_l >= 1000) {
				rest_l = (rest_l/1000).toFixed(3);
			}
			if(rest_e >= 1000) {
				rest_e = (rest_e/1000).toFixed(3);
			}
			if(rest_b >= 1000) {
				rest_b = (rest_b/1000).toFixed(3);
			}
			
	   
			// Prozentuale Werte ermitteln:
			var proz_h = Math.round((100/speicher)*w_h);
			var proz_l = Math.round((100/speicher)*w_l);
			var proz_e = Math.round((100/speicher)*w_e);
			var proz_v = Math.round((100/bauernhof[1])*bauernhof[0]);
			var proz_b = Math.round((100/24000)*bauernhof[0]);
	   
			var pro_h = Math.round(proz_h/teile);
			var pro_l = Math.round(proz_l/teile);
			var pro_e = Math.round(proz_e/teile);
			var pro_v = Math.round(proz_v/teile);

			var gold_holz = w_h - (w_h%28000);
			var gold_lehm = w_l - (w_l%30000);
			var gold_eisen = w_e - (w_e%25000);

			var snob_holz = w_h - (w_h%40000);
			var snob_lehm = w_l - (w_l%50000);
			var snob_eisen = w_e - (w_e%50000);

			if((welt == 3) || (welt == 9)) {
				var gold_preis_holz = 20000;
				var gold_preis_lehm = 30000;
				var gold_preis_eisen = 25000;
				var snob_preis_holz = 20000;
				var snob_preis_lehm = 30000;
				var snob_preis_eisen = 25000;
			}
			else if((welt >= 4) && (welt <= 8)) {
				var gold_preis_holz = 28000;
				var gold_preis_lehm = 30000;
				var gold_preis_eisen = 25000;
				var snob_preis_holz = 28000;
				var snob_preis_lehm = 30000;
				var snob_preis_eisen = 25000;
			}
			else if(welt >= 10) {
				var gold_preis_holz = 28000;
				var gold_preis_lehm = 30000;
				var gold_preis_eisen = 25000;
				var snob_preis_holz = 40000;
				var snob_preis_lehm = 50000;
				var snob_preis_eisen = 50000;
			}
		
			var gold = Math.floor(Math.min(Math.min(gold_holz/gold_preis_holz,gold_lehm/gold_preis_lehm),gold_eisen/gold_preis_eisen));
			var snob = Math.floor(Math.min(Math.min(snob_holz/snob_preis_holz,snob_lehm/snob_preis_lehm),snob_eisen/snob_preis_eisen));

			// Zeile neu zusammen setzen:
			zeile += "<td style='padding-left:5px; padding-right:5px;'>" + dorf + "</td>";
			zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:default;'>" + punkte + "</td>";
			if(storage.getValue("Speicher-Zus-" + welt) == "an") {
				zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:default;'><small>" + zustimmung + "</small></td>";
			}
			
			// Holz:
			if(mini != "an") {
				zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_h] + "' title='Holz: " + proz_h + "% | Frei: " + rest_h + "'><small>" + proz_h + "%</small></td>";
				zeile += "<td style='text-align:right; padding-right:5px; cursor:default;' title='Holz: " + proz_h + "% | Frei: " + rest_h + "'>" + wert_h + "</td>";
			}
			else {
				zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; font-weight:900; background-color:" + hgFarbe[pro_h] + "' title='Holz: " + proz_h + "% | Frei: " + rest_h + "'>" + wert_h.replace("<span class=\"grey\">.</span>", ".") + "</td>";
			}
			
			// Lehm:
			if(mini != "an") {
				zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_l] + "' title='Lehm: " + proz_l + "% | Frei: " + rest_l + "'><small>" + proz_l + "%</small></td>";
				zeile += "<td style='text-align:right; padding-right:5px; cursor:default;' title='Lehm: " + proz_l + "% | Frei: " + rest_l + "'>" + wert_l + "</td>";
			}
			else {
				zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; font-weight:900; background-color:" + hgFarbe[pro_l] + "' title='Lehm: " + proz_l + "% | Frei: " + rest_l + "'>" + wert_l.replace("<span class=\"grey\">.</span>", ".") + "</td>";
			}
			
			// Eisen:
			if(mini != "an") {
				zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_e] + "' title='Eisen: " + proz_e + "% | Frei: " + rest_e + "'><small>" + proz_e + "%</small></td>";
				zeile += "<td style='text-align:right; padding-right:5px; cursor:default;' title='Eisen: " + proz_e + "% | Frei: " + rest_e + "'>" + wert_e + "</td>";
			}
			else {
				zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; font-weight:900; background-color:" + hgFarbe[pro_e] + "' title='Eisen: " + proz_e + "% | Frei: " + rest_e + "'>" + wert_e.replace("<span class=\"grey\">.</span>", ".") + "</td>";
			}

			if(mini != "an") {
				var colspan = 2;
			}
			else {
				var colspan = 1;
			}
			
			
			// Speicher:
			zeile += "<td colspan='" + colspan + "' style='text-align:right; padding-left:5px; padding-right:5px; cursor:default;'>" + (speicher/1000).toFixed(3) + "</td>";
			
			// Händler:
			if(info == 2) {
				zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:default;'>" + haendler + "</td>";
			}
			
			// Bauernhof:
			if(mini != "an") {
				if(storage.getValue("Speicher-Bau-" + welt) == "an") {
					zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; background-color:" + hgFarbe[pro_v] + "' title='Bauernhof: " + proz_v + "% (aktuell) | " + proz_b + "% (gesamt) | Frei: " + rest_b + "'><small>" + proz_b + "%</small></td>";
					colspan = 1;
				}
				zeile += "<td colspan='" + colspan + "' style='text-align:right; padding-left:5px; padding-right:5px; cursor:default;' title='Bauernhof: " + proz_v + "% (aktuell) | " + proz_b + "% (gesamt) | Frei: " + rest_b + "'>" + (bauernhof[0]/1000).toFixed(3) + " <span class=\"grey\">/</span> " + (bauernhof[1]/1000).toFixed(3) + "</td>";
			}
			else {
				if(storage.getValue("Speicher-Bau-" + welt) == "an") {
					zeile += "<td style='cursor:help; text-align:right; padding-left:5px; color:#fff; font-weight:900; background-color:" + hgFarbe[pro_v] + "' title='Bauernhof: " + proz_v + "% (aktuell) | " + proz_b + "% (gesamt) | Frei: " + rest_b + "'>" + (bauernhof[0]/1000).toFixed(3) + "</td>";
					colspan = 1;
				}
				else {
					zeile += "<td colspan='" + colspan + "' style='text-align:right; padding-left:5px; padding-right:5px; cursor:default;' title='Bauernhof: " + proz_v + "% (aktuell) | " + proz_b + "% (gesamt) | Frei: " + rest_b + "'>" + (bauernhof[0]/1000).toFixed(3) + " <span class=\"grey\">/</span> " + (bauernhof[1]/1000).toFixed(3) + "</td>";
				}
			}

			if((welt >= 3) && (storage.getValue("Speicher-GAG-" + welt) == "an")) {
				var plus_gold = "";
				var plus_snob = "";
	
				if(gold > 1) {
					plus_gold = "n";
				}
	
				if(welt >= 10) {
					if(gold > 0) {
						gold_gesamt += gold;
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Du kannst " + gold + " Goldmünze" + plus_gold + " prägen'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + gold + "</a></td>";
					}
					else {
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Du kannst momentan keine Goldmünze prägen'><span class='grey'>" + gold + "</span></td>";
					}
				}
				else {
					if(gold > 0) {
						gold_gesamt += gold;
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Du kannst " + gold + " x Rohstoffe einlagern'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + gold + "</a></td>";
					}
					else {
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Du kannst momentan keine Rohstoffe einlagern'><span class='grey'>" + gold + "</span></td>";
					}
				}
				
				if(snob > 0) {
					snob_gesamt_1 += snob;
					var volk_rest = (bauernhof[1] - bauernhof[0]);
					var volk_soll = (snob * 200);
					
					var max_snob = Math.round(volk_rest/200);
	
					if(max_snob > 1) {
						plus_snob = "er";
					}
		
					if(max_snob >= 1) {
						snob_gesamt_2 += snob;
						if(max_snob < snob){
							zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Du kannst " + max_snob + " von " + snob + " Adelsgeschlechtern produzieren'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + max_snob + "</a><span class='grey'>/" + snob + "</span></td>";
						}
						else {
							zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Du kannst " + snob + " Adelsgeschlecht" + plus_snob + " produzieren'><a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_id[0] + "&screen=snob'>" + snob + "</a><span class='grey'>/" + snob + "</span></td>";
						}
					}
					else {
						zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Der Bauernhof kann keine weiteren Einheiten versorgen'><span class='grey'>0/" + snob + "</span></td>";
					}
				}
				else {
					zeile += "<td style='text-align:right; padding-left:5px; padding-right:5px; cursor:help;' title='Es können keine weiteren Adelsgeschlechter produziert werden'><span class='grey'>" + snob + "</span></td>";
				}
			}

			if(info == 2) {
				zeile += "<td style='text-align:left; padding:2px; cursor:default;'>" + bauauftrag + "</td>";
				zeile += "<td style='text-align:left; padding:2px; cursor:default;'>" + forschung + "</td>";
				zeile += "<td style='text-align:left; padding:2px; cursor:default;'>" + rekrutierung + "</td>";
			}


			if(mini != "an") {
				colspan = 2;
			}
			else {
				colspan = 1;
			}
			
			
			
			// Inhalt der Fusszeile aktualisieren:
			document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].getElementsByTagName("tr")[i].innerHTML = zeile;
			if(i == zeilen-1) {
				if(snob_gesamt_2 != 1) {
					plus_snob = "er";
				}
	
				if(snob_gesamt_2 > 1) {
					plus_snob = "ern";
				}
	
				var inhalt = "";
				inhalt += "<tr>";
				if(storage.getValue("Speicher-Zus-" + welt) == "an") {
					inhalt += "<th colspan='3' style='text-align:center; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;' title='Allgemeine Infos'>";
				}
				else {
					inhalt += "<th colspan='2' style='text-align:center; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;' title='Allgemeine Infos'>";
				}
				inhalt += "Allgemeine Infos ";
				inhalt += "<a href='http://de" + welt + ".die-staemme.de/game.php?village=" + dorf_ID + "&screen=settings&mode=settings&einstellung=speicher' title='Einstellungen | " + vers_ist + "'><img src='http://www.die-staemme.de/graphic/buildings/garage.png' height='12px' /></a></th>";
				
				// Gesamt-Ressourcen:
				// Holz			
				if(holz_gesamt >= 1000000) {
					holz_gesamt = (holz_gesamt/1000000).toFixed(2) + " <small class='grey'>Mio.</small>";
				}
				else if((holz_gesamt < 1000000) && (holz_gesamt >= 1000)) {
					holz_gesamt = (holz_gesamt/1000).toFixed(3);
				}
				
				// Holz:
				if(mini != "an") {
					inhalt += "<th style='text-align:center; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px;'><img src='/graphic/holz.png' title='Holz' alt='' /></th>";
					inhalt += "<th style='text-align:right; padding:2px; cursor:help; -moz-border-radius-bottomright:10px;' title='Gesamt (Holz)'>" + holz_gesamt + "</th>";
				}
				else {
					inhalt += "<th style='text-align:right; padding:2px; cursor:help; -moz-border-radius-bottomleft:10px;' title='Gesamt (Holz)'>" + holz_gesamt + "</th>";
				}

				// Lehm
				if(lehm_gesamt >= 1000000) {
					lehm_gesamt = (lehm_gesamt/1000000).toFixed(2) + " <small class='grey'>Mio.</small>";
				}
				else if((lehm_gesamt < 1000000) && (lehm_gesamt >= 1000)) {
					lehm_gesamt = (lehm_gesamt/1000).toFixed(3);
				}
				if(mini != "an") {
					inhalt += "<th style='text-align:center; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px;'><img src='/graphic/lehm.png' title='Lehm' alt='' /></th>";
					inhalt += "<th style='text-align:right; padding:2px; cursor:help; -moz-border-radius-bottomright:10px;' title='Gesamt (Lehm)'>" + lehm_gesamt + "</th>";
				}
				else {
					inhalt += "<th style='text-align:right; padding:2px; cursor:help;' title='Gesamt (Lehm)'>" + lehm_gesamt + "</th>";
				}

				// Eisen:
				if(mini != "an") {
					inhalt += "<th style='text-align:center; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px;'><img src='/graphic/eisen.png' title='Eisen' alt='' /></th>";
				}
				if(eisen_gesamt >= 1000000) {
					eisen_gesamt = (eisen_gesamt/1000000).toFixed(2) + " <small class='grey'>Mio.</small>";
				}
				else if((eisen_gesamt < 1000000) && (eisen_gesamt >= 1000)) {
					eisen_gesamt = (eisen_gesamt/1000).toFixed(3);
				}
				inhalt += "<th style='text-align:right; padding:2px; cursor:help; -moz-border-radius-bottomright:10px;' title='Gesamt (Eisen)'>" + eisen_gesamt + "</th>";


				// Speicher:
				if(speicher_gesamt >= 1000000) {
					speicher_gesamt = (speicher_gesamt/1000000).toFixed(2) + " <small class='grey'>Mio.</small>";
				}
				else if((speicher_gesamt < 1000000) && (speicher_gesamt >= 1000)) {
					speicher_gesamt = (speicher_gesamt/1000).toFixed(3);
				}
				inhalt += "<th colspan='" + colspan + "' style='text-align:right; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:help;' title='Gesamt (Speicher)'>" + speicher_gesamt + "</th>";


				// Händler:
				if(info == 2) {
					if(mini != "an") {
						inhalt += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>Händler</th>";
					}
					else {
						inhalt += "<th style='text-align:center; padding-left:5px; padding-right:5px; cursor:default; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'><img src='/graphic/buildings/market.png' title='Händler' alt='' /></th>";
					}
				}			
				
				// Bauernhof
				if(volk_gesamt_1 >= 1000000) {
					volk_gesamt_1 = (volk_gesamt_1/1000000).toFixed(2);
					extra_1 = " Mio. ";
				}
				else if((volk_gesamt_1 < 1000000) && (volk_gesamt_1 >= 1000)) {
					volk_gesamt_1 = (volk_gesamt_1/1000).toFixed(3);
					extra_1 = "";
				}
				if(volk_gesamt_2 >= 1000000) {
					volk_gesamt_2 = (volk_gesamt_2/1000000).toFixed(2)
					extra_2 = " Mio. ";
				}
				else if((volk_gesamt_2 < 1000000) && (volk_gesamt_2 >= 1000)) {
					volk_gesamt_2 = (volk_gesamt_2/1000).toFixed(3);
					extra_2 = "";
				}
				
				if(mini != "an") {
					inhalt += "<th colspan='" + colspan + "' style='text-align:right; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:help;' title='" + volk_gesamt_1 + extra_1 + " / " + volk_gesamt_2 + extra_2 + " BH-Plätzen belegt'>" + volk_gesamt_1 + "<small class='grey'>" + extra_1 + "</small> / " + volk_gesamt_2 + "<small class='grey'>" + extra_2 + "</small></th>";
				}
				else {
					inhalt += "<th colspan='" + colspan + "' style='text-align:right; padding:2px; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px; cursor:help;' title='" + volk_gesamt_1 + extra_1 + " / " + volk_gesamt_2 + extra_2 + " BH-Plätzen belegt'>" + volk_gesamt_1 + "<small class='grey'>" + extra_1 + "</small></th>";
				}
				
				
				if((welt >= 3) && (storage.getValue("Speicher-GAG-" + welt) == "an")) {
					if(welt >= 10) {
						inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomleft:10px; cursor:help;' title='Du kannst insgesamt " + gold_gesamt + " Goldmünze" + plus_gold + " prägen'>" + gold_gesamt + "</th>";
					}
					else {
						inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomleft:10px; cursor:help;' title='Du kannst insgesamt " + gold_gesamt + " x Rohstoffe einlagern'>" + gold_gesamt + "</th>";
					}
					
					if(snob_gesamt_1 != snob_gesamt_2) {
						inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomright:10px; cursor:help;' title='Du kannst maximal " + snob_gesamt_2 + " von " + snob_gesamt_1 + " Adelsgeschlecht" + plus_snob + " produzieren'>" + snob_gesamt_2 + "<span class='grey'>/" + snob_gesamt_1 + "</span></th>";
					}
					else {
						inhalt += "<th style='text-align:right; padding-left:5px; padding-right:5px; -moz-border-radius-bottomright:10px; cursor:help;' title='Du kannst maximal " + snob_gesamt_2 + " Adelsgeschlecht" + plus_snob + " produzieren'>" + snob_gesamt_2 + "</th>";
					}
				}
				if(info == 2) {
					inhalt += "<th colspan='3' style='text-align:center; padding:2px; cursor:default; -moz-border-radius-bottomleft:10px; -moz-border-radius-bottomright:10px;'>Aufträge</th>";
				}

				inhalt += "</tr>";
				document.getElementsByClassName("main")[main].getElementsByClassName("vis")[vis].innerHTML += inhalt;

				// Das aktuelle Dorf hervorheben:
				var tabelle = document.getElementsByClassName("vis")[vis];
				var dorf_ist = document.getElementById("menu_row2").getElementsByTagName("a")[2].innerHTML;
				var zellen = tabelle.getElementsByTagName("tr")[1].getElementsByTagName("td").length;
				for(x=1; x<zeilen; x++) {
					var dorf_list = tabelle.getElementsByTagName("tr")[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML.split(" (")[0];
					if((storage.getValue("Speicher-Akt-" + welt) == "an") && (dorf_list == dorf_ist)) {
						tabelle.getElementsByTagName("tr")[x].getElementsByTagName("td")[0].getElementsByTagName("a")[0].setAttribute("style", "color:#C00;");
					}
				}
			}
		}
	}
}