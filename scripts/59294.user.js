// ==UserScript==
// @name           OGame: Commander
// @namespace      Gilly
// @description    Nachbau des OGameCommander (Aufruf über Offizierskasino)
// @include        http://*.ogame.*/game/index.php?page=micropayment*
// ==/UserScript==

// den Link Offizierskasino umbenennen ;)
var menuLink = document.evaluate( "//div[@id='menu']// a[@accesskey='o']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
menuLink.snapshotItem(0).innerHTML = "<b>myCommander</b>";

// einstiegspunkt festlegen
var inhaltAussen = document.getElementById('content');
// vorhandenen inhalt entfernen
var inhaltZumEntfernen = inhaltAussen.getElementsByTagName('center')[1];
if( inhaltZumEntfernen ) inhaltZumEntfernen.parentNode.removeChild(inhaltZumEntfernen);

// neuen inhalt (zum austauschen) basteln
var inhaltZumAustauschen = document.createElement("table");
	inhaltZumAustauschen.setAttribute("id","myCommander");
	inhaltZumAustauschen.setAttribute("width","100%");

// inhalt austauschen
inhaltAussen.getElementsByTagName('center')[0].parentNode.replaceChild(inhaltZumAustauschen,inhaltAussen.getElementsByTagName('center')[0] );
  
// gebäude und die reg exp dazu
var gebäude = new Array(" ",
	"Energie","Metall","Kristall","Deuterium",
	"Metallmine","Kristallmine","Deuteriumsynthetisierer", "Solarkraftwerk","Roboterfabrik","Nanitenfabrik", "Raumschiffwerft",
	"Metallspeicher","Kristallspeicher","Deuteriumtank","Forschungslabor","Raketensilo","Mondbasis","Sensorphalanx","Sprungtor",
	"Kleiner Transporter","Großer Transporter","Leichter Jäger","Kreuzer","Schlachtschiff","Recycler","Spionagesonde","Bomber","Solarsatellit",
	"Zerstörer","Schlachtkreuzer","Todesstern",
	"Raketenwerfer", "Leichtes Lasergeschütz", "Schweres Lasergeschütz", "Gaußkanone", "Ionengeschütz", "Plasmawerfer", "Kleine Schildkuppel",
	"Große Schildkuppel", "Abfangrakete", "Interplanetarrakete");
var stringToRegExp = new Array();
	stringToRegExp["Metall"]=/>Energie<\/font><\/b><\/i><\/td>\s+<\/tr>\s+<tr.*>\s+<td.*>(<font .*<\/font>)<\/td>\s+<td.*><font .*<\/font><\/td>\s+<td.*><font .*<\/font><\/td>/m;
	stringToRegExp["Kristall"]=/>Energie<\/font><\/b><\/i><\/td>\s+<\/tr>\s+<tr.*>\s+<td.*><font .*<\/font><\/td>\s+<td.*>(<font .*<\/font>)<\/td>\s+<td.*><font .*<\/font><\/td>/m;
	stringToRegExp["Deuterium"]=/>Energie<\/font><\/b><\/i><\/td>\s+<\/tr>\s+<tr.*>\s+<td.*><font .*<\/font><\/td>\s+<td.*><font .*<\/font><\/td>\s+<td.*>(<font .*<\/font>)<\/td>/m;
	stringToRegExp["Energie"]=/>Energie<\/font><\/b><\/i><\/td>\s+<\/tr>\s+<tr.*>\s+<td.*><font .*<\/font><\/td>\s+<td.*><font .*<\/font><\/td>\s+<td.*><font .*<\/font><\/td>\s+<td.*\/td>\s+<td.*>(<f.*)<\/td>/m;
	stringToRegExp["Metallmine"]=/Metallmine<\/a><\/a> \(Stufe ([0-9]+)\)(.*)/;
	stringToRegExp["Kristallmine"]=/Kristallmine<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Deuteriumsynthetisierer"]=/Deuteriumsynthetisierer<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Solarkraftwerk"]=/Solarkraftwerk<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Roboterfabrik"]=/Roboterfabrik<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Nanitenfabrik"]=/Nanitenfabrik<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Raumschiffwerft"]=/Raumschiffwerft<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Metallspeicher"]=/Metallspeicher<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Kristallspeicher"]=/Kristallspeicher<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Deuteriumtank"]=/Deuteriumtank<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Forschungslabor"]=/Forschungslabor<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Raketensilo"]=/Raketensilo<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Mondbasis"]=/Mondbasis<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Sensorphalanx"]=/Sensorphalanx<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Sprungtor"]=/Sprungtor<\/a><\/a> \(Stufe ([0-9]{1,2})\)(.*)/;
	stringToRegExp["Kleiner Transporter"]=/alt="Kleiner Transporter ([0-9]{1,})"/;
	stringToRegExp["Großer Transporter"]=/alt="Großer Transporter ([0-9]{1,})"/;
	stringToRegExp["Leichter Jäger"]=/alt="Leichter Jäger ([0-9]{1,})"/;
	stringToRegExp["Kreuzer"]=/alt="Kreuzer ([0-9]{1,})"/;
	stringToRegExp["Schlachtschiff"]=/alt="Schlachtschiff ([0-9]{1,})"/;
	stringToRegExp["Recycler"]=/alt="Recycler ([0-9]{1,})"/;
	stringToRegExp["Spionagesonde"]=/alt="Spionagesonde ([0-9]{1,})"/;
	stringToRegExp["Bomber"]=/alt="Bomber ([0-9]{1,})"/;
	stringToRegExp["Solarsatellit"]=/Solarsatellit<\/a><\/th>\s+<th>([0-9]{1,})</m;
	stringToRegExp["Zerstörer"]=/alt="Zerstörer ([0-9]{1,})"/;
	stringToRegExp["Schlachtkreuzer"]=/alt="Schlachtkreuzer ([0-9]{1,})"/;
	stringToRegExp["Todesstern"]=/alt="Todesstern ([0-9]{1,})"/;
	stringToRegExp["Raketenwerfer"]=/Raketenwerfer<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Leichtes Lasergeschütz"]=/Leichtes Lasergeschütz<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Schweres Lasergeschütz"]=/Schweres Lasergeschütz<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Gaußkanone"]=/Gaußkanone<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Ionengeschütz"]=/Ionengeschütz<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Plasmawerfer"]=/Plasmawerfer<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Kleine Schildkuppel"]=/Kleine Schildkuppel<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Große Schildkuppel"]=/Große Schildkuppel<\/a><\/a> \(([^ ]*)/;
	stringToRegExp["Abfangrakete"]=/Abfangrakete<\/a> \(([^ ]*)/;
	stringToRegExp["Interplanetarrakete"]=/Interplanetarrakete<\/a> \(([^ ]*)/;

	
	
// planeten
var comboBoxRaw = document.getElementById('header_top').getElementsByTagName('select')[0].getElementsByTagName('option');
var comboBox = new Array();
// monde rausschmeissen
for( var i=0 ; i<comboBoxRaw.length ; i++ )
	//if( comboBoxRaw[i].innerHTML.replace(/\s+/g,"").indexOf("Mond[")<0 )	// hier werden die monde rausgefiltert
		comboBox.push(comboBoxRaw[i]);

//summen extra spalte einfuegen
var summenSpalte = document.createElement("div");
	summenSpalte.innerHTML = 'Summe';
	summenSpalte.setAttribute("value","none");
comboBox.push(summenSpalte);

var designZeile = new Array();
	designZeile[0]="Planeten";
	designZeile[2]="Rohstoffe";
	designZeile[5]="Gebäude";
	//designZeile[17]="Mond";
	designZeile[20]="Flotte";
	designZeile[32]="Verteidigung";

for( var zeile=0 ; zeile<gebäude.length ; zeile++ ){
	if( designZeile[zeile] ){ // sonder zeilen (design)
		var workZeile = inhaltZumAustauschen.insertRow(-1);
		var workZelle = workZeile.insertCell(-1);
		workZelle.setAttribute("colspan",comboBox.length+1);
		//workZelle.setAttribute("style","font-size:45%;");
		workZelle.innerHTML = designZeile[zeile];
	}
	var workZeile = inhaltZumAustauschen.insertRow(-1);
	for( var zelle=0 ; zelle<comboBox.length+1 ; zelle++ ){
		var workZelle = workZeile.insertCell (-1);
		workZelle.setAttribute("align","center");
		//workZelle.setAttribute("style","font-size:45%;");
		if( zelle==0 ){
			// sonderfall 1. spalte (hier kommen gebäude bezeichnungen rein)
			workZelle.innerHTML = gebäude[zeile];
		}else{
			var tmpPlanet = comboBox[zelle-1].innerHTML.replace(/\s+/g,"");
			if( zeile==0 ){
				// sonderfall erste zeile (hier kommen planinamen rein)
				workZelle.setAttribute("id","planetenName");
				workZelle.setAttribute("value","http://"+window.location.host+comboBox[zelle-1].getAttribute('value').replace("micropayment","overview"));
				workZelle.innerHTML = "<a href='"+"http://"+window.location.host+comboBox[zelle-1].getAttribute('value').replace("micropayment","overview")
+"'>"+tmpPlanet.split("[")[0]+"<br>"+tmpPlanet.replace(tmpPlanet.split("[")[0],"")+"</a>";
			}else{
				workZelle.innerHTML = "-";
				workZelle.setAttribute("id",tmpPlanet+gebäude[zeile]);
			}
		}
	}
}

// alle zu bearbeiten planies
var planetenLinks = document.evaluate("//td[@id='planetenName']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

// gebäude page (async) laden, parsen und werte in tab eintragen
for( var i=0 ; i<planetenLinks.snapshotLength-1 ; i++ ){ // snapshotLength-1 wegen der summenspalte
//for( var i=0 ; i<1 ; i++ ){ 
	var tempGebParseUrl = planetenLinks.snapshotItem(i).getAttribute("value").replace("overview","b_building");
	GM_xmlhttpRequest({
		method: 'GET', url: tempGebParseUrl,
		headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/ xml'},
		onload: function(responseDetails) { // responseDetails.responseText
			var tempNamenTeile = responseDetails.responseText.match(/selected>(.*)<a.*(\[[0-9]:[0-9]{1,3}:[0-9]{1,3}\])<\/a><\/option>/);
			var tempPlanetenName = tempNamenTeile[1].replace(/\s+/g,"")+tempNamenTeile[2];
			// res parsen und einfuegen
			for(var j=1 ; j<gebäude.length ; j++ ){
			//for(var j=5 ; j<6 ; j++ ){
				var res = responseDetails.responseText.match(stringToRegExp[gebäude[j]]);
				//if( res ) document.getElementById(tempPlanetenName+gebäude[j]).innerHTML = res[1];
				if( res ){
					// default ist nur der wert
					document.getElementById(tempPlanetenName+gebäude[j]).innerHTML = res[1];
					if( res[2] ){	// spezielle zusatz infos
						var fontpos = res[2].indexOf("<font");	// font tag ist nicht vorhanden wenn geb. im bau
						var fonttag = "<font color=#"+res[2].substr( fontpos+13,6 )+">"+res[1]+"</font>";
						/* wenn die farbe gruen ist, link einbaun (klappt so nicht, da der link nur im richtigen kontext -geb seite de plani- funktioniert)
						if( res[2].substr(fontpos+13,6)=="00FF00"){
							var bauLink=res[2].substring(res[2].indexOf("<a href="),res[2].indexOf("<font color=#00FF00>"));
							fonttag = bauLink+"<font color=#"+res[2].substr(fontpos+13,6)+">"+res[1]+"</font></a>";
						} */
						if( fontpos<0 ){	// wenn kein font vorhanden, dann wird was im bau sein
							fonttag = "<font color=#FFFFFF>"+res[1]+"</font>";	// mach die zahl weiss
							if( res[2].indexOf("<SCRIPT language=JavaScript>")>0 && res[2].indexOf("</tr>")<0 )
								// wenn DAS gebäude ist das im Bau ist, dann mach die stufe die grad gebaut wird lila
								fonttag = "<font color=#FFFFFF>"+res[1]+"</font> <font color=#FF00FF>"+(parseInt(res[1])+1)+"</font>";
						}
						document.getElementById(tempPlanetenName+gebäude[j]).innerHTML = fonttag;
					}
				}
				// summieren, wenns was zum summieren gibt (zB rohstoffe)
				if( gebäude[j]=="Metall" || gebäude[j]=="Kristall" || gebäude[j]=="Deuterium" ){
					var toAdd = responseDetails.responseText.match(stringToRegExp[gebäude[j]]);
					if(toAdd){
						val = parseInt( toAdd[1].match(/<font .*>(.*)<\/font>/)[1].replace(/\./g,"") );
						sum = parseInt( document.getElementById("Summe"+gebäude[j]).innerHTML.replace(/\./g,"") );
						if(!isNaN(sum)) val=val+sum;
						document.getElementById("Summe"+gebäude[j]).innerHTML = punkte(val);
					}
				}
			}
		}
	});
}

// schiffwerft page (async) laden, parsen und werte in tab eintragen
for( var i=0 ; i<comboBox.length-1 ; i++ ){	// -1 wegen der extra spalte fuer die summen
//for( var i=0 ; i<3 ; i++ ){
	var shipPage = "http://"+window.location.host+comboBox[i].getAttribute("value").replace("micropayment","flotten1").replace("mode=","mode=Flotte");
	GM_xmlhttpRequest({
		method: 'GET', url: shipPage,
		headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/ xml'},
		onload: function(responseDetails) { // responseDetails.responseText
			var tempNamenTeile = responseDetails.responseText.match(/selected>(.*)<a.*(\[[0-9]:[0-9]{1,3}:[0-9]{1,3}\])<\/a><\/option>/);
			var tempPlanetenName = tempNamenTeile[1].replace(/\s+/g,"")+tempNamenTeile[2];
			//alert( responseDetails.responseText.match(/Solarsatellit<\/a><\/th>\s+<th>([0-9]{1,})</m) );	
			for(var j=1 ; j<gebäude.length ; j++ ){
				var res = responseDetails.responseText.match(stringToRegExp[gebäude[j]]);
				if( res ) document.getElementById(tempPlanetenName+gebäude[j]).innerHTML = res[1];
				// summieren, wenns was zum summieren gibt (zB rohstoffe)
				if( gebäude[j]=="Solarsatellit" || gebäude[j]=="Kleiner Transporter" || gebäude[j]=="Großer Transporter" || gebäude[j]=="Leichter Jäger"
					|| gebäude[j]=="Kreuzer" || gebäude[j]=="Schlachtschiff" || gebäude[j]=="Recycler" || gebäude[j]=="Spionagesonde"
					|| gebäude[j]=="Bomber" || gebäude[j]=="Zerstörer" || gebäude[j]=="Schlachtkreuzer" || gebäude[j]=="Todesstern" ){
					var toAdd = responseDetails.responseText.match(stringToRegExp[gebäude[j]]);
					if(toAdd){
						val = parseInt( toAdd[1] );
						sum = parseInt( document.getElementById("Summe"+gebäude[j]).innerHTML );
						if(!isNaN(sum)) val=val+sum;
						document.getElementById("Summe"+gebäude[j]).innerHTML = val;
					}
				}
			}
		}
	});
}

// schiffwerft page (async) laden, parsen und werte in tab eintragen
for( var i=0 ; i<comboBox.length-1 ; i++ ){	// -1 wegen der extra spalte fuer die summen
//for( var i=0 ; i<1 ; i++ ){
	// http://uni60.ogame.de/game/index.php?page=buildings&session=ee479c49dcba&mode=Verteidigung
	var defPage = "http://"+window.location.host+comboBox[i].getAttribute("value").replace("micropayment","buildings").replace("mode=","mode=Verteidigung");
	//alert( defPage );
	GM_xmlhttpRequest({
		method: 'GET', url: defPage,
		headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/ xml'},
		onload: function(responseDetails) { // responseDetails.responseText
			//alert( responseDetails.responseText );
			var tempNamenTeile = responseDetails.responseText.match(/selected>(.*)<a.*(\[[0-9]:[0-9]{1,3}:[0-9]{1,3}\])<\/a><\/option>/);
			var tempPlanetenName = tempNamenTeile[1].replace(/\s+/g,"")+tempNamenTeile[2];
			//alert( tempPlanetenName );
			//alert( responseDetails.responseText.match(/Raketenwerfer<\/a><\/a> \(([^ ]*)/m) );
			for(var j=1 ; j<gebäude.length ; j++ ){
				var res = responseDetails.responseText.match(stringToRegExp[gebäude[j]]);
				if( res ) document.getElementById(tempPlanetenName+gebäude[j]).innerHTML = res[1];
				if( gebäude[j]=="Raketenwerfer" ){
					var toAdd = responseDetails.responseText.match(stringToRegExp[gebäude[j]]);
					if(toAdd){
						val = parseInt( toAdd[1].replace(/\./g,"") );
						sum = parseInt( document.getElementById("Summe"+gebäude[j]).innerHTML );
						if(!isNaN(sum)) val=val+sum;
						document.getElementById("Summe"+gebäude[j]).innerHTML = val;
					}
				}
			}
		}
	});
}

function punkte(wert){
	wert += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(wert) )
		wert = wert.replace (rgx, '$1' + '.' + '$2');
	return wert;
}