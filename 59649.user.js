// ==UserScript==
// @name           OGame: check War-Riders
// @namespace      http://userscripts.org/scripts/show/59649
// @description    Fügt ein War-Riders Icon in die Galaxieansicht hinzu (bei Mouseover) werden alle Planeten des Spielers angezeigt
// @include        http://uni*.ogame.de/game/index.php?page=galaxy*
// @creator        Gilly
// @date           2009-10-15
// @version        0.03
// ==/UserScript==

// TODO: feature planung (0.04)
//	der verlauf des spielers aus war-riders per icon mit einbaun (zweck ist inaktive spieler auf
//	einen blick zu erkennen)
//
// 0.03 FIXED:
// 	spieler mit bestimmten zeichen im namen werden nie gespeichert, sondern immer neu geladen.
// 	bzw mit diesen spielern gits allgemein probleme, der name muss warscheinlich noch umgewandelt 
//	werden bevor man war-riders abfragt

// die sonnensystem tabelle
var sonnensystem = document.evaluate("//div[@id='content']/center/center/table", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);

// spieler namen die später bei WarRiders gecheckt werden sollen
var checkSpieler = new Array();
var checkUni = window.location.host.split(".")[0].match(/[^0-9]*(.*)/)[1];
//var checkUni;

var expression = /doit\(6, \d*, \d*, \d*, 1, (\d*)\)/;
	expression.exec(document.body.innerHTML);
var shipcount = RegExp.$1;

for( var i=0 ; i<sonnensystem.getElementsByTagName("tr").length ; i++){
	var spalten = sonnensystem.getElementsByTagName("tr")[i].getElementsByTagName("th");
	if( spalten[4] && spalten[4].innerHTML.replace(/\s+/gm,"").length>0 ){	// in der 4. spalte steht der spieler name
		var planiNameAktion = spalten[4].innerHTML;
		// u-mode und noob nicht bearbeiten (gesperrte sind bisher immer auch u-mode)
		if( !planiNameAktion.match(/class="vacation"/) && !planiNameAktion.match(/class="noob"/) ){
			var sName = planiNameAktion.match(/\">([^<]*)<\/span><\/a>/m);
			if( sName ){ 
				uid = spalten[0].innerHTML.match(/.*>([0-9]{1,2})<.*/)[1]+"#"+sName[1];
				checkSpieler[uid] = sName[1];
				var wrImg = "<img src=\"http://www.war-riders.de/img/favicon.ico\" width=\"15\" height=\"14\" alt=\"look at War-Riders.de\">";
				//var	wrUrlD= "<a href=>"+checkSpieler[uid]+"</a>";
				var asyncLoad = "<a id=\""+uid+"\" style=\"cursor:pointer\" onmouseover=\"return overlib('<table width"+
								"=100% ><tr><td class=c><a href=http://www.war-riders.de/index.cgi?uni="+
								checkUni+"&lang=de&page=details&type=player&name="+encodeURIComponent(checkSpieler[uid])+" target=_blank>"+
								checkSpieler[uid]+"</a>"+
								" <font color="+uid+"></font></td></tr><th>"+
								"loading..."+
								"<img src=http://www.gillwaldt.de/pics/ogame/loadicon.gif>"+
								"</th></table>', STICKY,"+
								//checkSpieler[uid]+"</a> <font color=c"+uid+">zwg"+uid+"</font></td></tr><th>loading...</th></table>', STICKY,"+
								//checkSpieler[uid]+"</a></td></tr><th>loading...</th></table>', STICKY,"+
								//" MOUSEOFF, DELAY, 750, CENTER, OFFSETY, -40, WIDTH, 120 );\" onmouseout=\"return nd();\">"+wrImg+"</a>";
								" MOUSEOFF, DELAY, 750, CENTER, OFFSETY, -40, WIDTH, 160 );\" onmouseout=\"return nd();\">"+wrImg+"</a>";
				spalten[6].innerHTML += asyncLoad;
			}
		}
	}
}

for (var i in checkSpieler) ladeVonWarRiders(i);

function ladeVonWarRiders(uid){
	if( !uid ) return;
	wrUrl = "http://www.war-riders.de/index.cgi?uni="+checkUni+"&lang=de&page=details&type=player&name="+encodeURIComponent(uid.split("#")[1]);
	var gespDaten = GM_getValue(checkUni+uid.split("#")[1]);
	if( gespDaten && false ){ // lade immer
	//if( gespDaten && ((new Date()).getTime()-parseInt(gespDaten.split(",")[0])<(24*60*60*1000) ) ){ // 24*60*60*1000 = 24h
		//GM_log("use saved:: "+uid.split("#")[1]+" (ts ist "+(((new Date()).getTime()-parseInt(gespDaten.split(",")[0]))/(60*60*1000))+"h alt)");
		// daten sind vorhanden, also die gespeicherten nutzen
		inTable = '<table width=100%>';
		for( var i=3 ; i<gespDaten.split(",").length ; i++){
			inTable += '<tr><th>';
			inTable += '<a href=\"javascript:showGalaxy('+gespDaten.split(",")[i].split(":")[0]+','+gespDaten.split(",")[i].split(":")[1]+','+gespDaten.split(",")[i].split(":")[2].replace(/[^0-9]/g,"")+')\">'+gespDaten.split(",")[i]+'</a>';
			// function doit(order, galaxy, system, planet, planettype, shipcount){
			inTable += '</th><th><a href=\"javascript:doit(6,'+gespDaten.split(",")[i].split(":")[0]+','+gespDaten.split(",")[i].split(":")[1]+','+gespDaten.split(",")[i].split(":")[2].replace(/[^0-9]/g,"")+',1,'+shipcount+')\">';
			inTable += '<img border="0" title="Spionieren" alt="Spionieren" src="http://uni60.ogame.de/evolution/img/e.gif"/>';
			inTable += '</a>';
			inTable += '</th></tr>';
		}
		inTable += '</table>';
		var newContent = document.getElementById(uid).getAttribute("onmouseover").replace("loading\.\.\.",inTable);
		// gespDaten.split(",")[1] ==> 2tageVerlauf
		// gespDaten.split(",")[2] ==> gesammtVerlauf
		var zColor, gColor;
		if( gespDaten.split(",")[1]<0 ) zColor="red"; else zColor="green";
		if( gespDaten.split(",")[2]<0 ) gColor="red"; else gColor="green";
		// hier noch besser unterteilen +, - oder 0 und IMG statt wert
		// var wrImg = "<img src=\"http://www.gillwaldt.de/pics/ogame/up.png\" width=\"15\" height=\"14\" alt=\"look at War-Riders.de\">";
		var verlauf = "<font color="+gColor+">"+gespDaten.split(",")[2]+"%</font> <font color="+zColor+">"+gespDaten.split(",")[1]+"</font>";
		newContent = newContent.replace("<font color="+uid+"></font>",verlauf);
		document.getElementById(uid).setAttribute("onmouseover",newContent);
	}else{
		//GM_log("load: "+uid.split("#")[1]+" - url: "+wrUrl);
		GM_xmlhttpRequest({
			method: 'GET', url: wrUrl,
			headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/ xml'},
			onload: function(responseDetails) { // responseDetails.responseText
				var planiRaw = responseDetails.responseText.match(/<tr><td class=sysbody><a href=[^>]*>[0-9]{1}:[0-9]{1,3}:[0-9]{1,2}<\/a>.*/g);
				var zuwachsInsgesamt = responseDetails.responseText.match(/<td class=s2><font class=([a-z]*)>[^\(]*\(([^<]*) %\)<\/font><\/td>/m);
				if( planiRaw ){
					inTable = '<table width=100%>';
					// datensatz ts,zuwachsGesammt in %, zuwachs 2 Tage absolut,plani, plani ....
					var planeten = new Array();
					planeten.push( (new Date()).getTime() );
					planeten.push( zuwachsInsgesamt[2] );
					for( var i=0 ; i<planiRaw.length ; i++){
						var plani = planiRaw[i].match(/<tr><td class=sysbody><a href=[^>]*>(([0-9]{1}):([0-9]{1,3}):([0-9]{1,2}))<\/a>[^ ]*([^<]*).*/);
						inTable += '<tr><th>';
						inTable += '<a href=\"javascript:showGalaxy('+plani[2]+','+plani[3]+','+plani[4]+')\">'+plani[1]+plani[5]+'</a>';
						inTable += '</th><th><a href=\"javascript:doit(6,'+plani[2]+','+plani[3]+','+plani[4]+',1,'+shipcount+')\">';
						inTable += '<img border="0" title="Spionieren" alt="Spionieren" src="http://uni60.ogame.de/evolution/img/e.gif"/>';
						inTable += '</a>';
						inTable += '</th></tr>';
						planeten.push( plani[1]+plani[5] );
					}
					inTable += '</table>';
					GM_setValue(checkUni+uid.split("#")[1],planeten.join());
					var oldContent = document.getElementById(uid);
					if( oldContent ){
						var newContent = oldContent.getAttribute("onmouseover").replace("loading\.\.\.",inTable);
						newContent = newContent.replace("<img src=http://www.gillwaldt.de/pics/ogame/loadicon.gif>","");
						// ich brauch 3 faelle , stillstand ,plus oder minus
						var zwg = "<font color="+zuwachsInsgesamt[1]+">"+zuwachsInsgesamt[2]+"%</font>";
						// je nach fall richtige IMG einbaun
						newContent = newContent.replace("<font color="+uid+"></font>",zwg+"<font color="+uid+"></font>");
						document.getElementById(uid).setAttribute("onmouseover",newContent);
						// NEU - Verlauf der letzten beiden Tage
						var nachLaden = responseDetails.responseText.match(/<param name="movie" value="\/open-flash-chart.swf\?width=650 &height=325 &data=([^"]*)"/m);
						zuwachsDerLetztenZweiTage(checkUni+uid.split("#")[1], nachLaden[1],uid,"<font color="+uid+"></font>");
						// NEU ENDE - Verlauf der letzten beiden Tage
					}
				}
			}
		});
	}
}

// ...( Name der GM_set Var, Teil der URL die geladen werden soll, ID des HTML elements in dem Replace'd wird, Teil der Replaced werden soll)
function zuwachsDerLetztenZweiTage(gmbez, xwrurl,idrep,replacement){
	//GM_log("zuwachsDerLetztenZweiTage aufruf mit xuid:"+xuid+" xwrurl: "+xwrurl);
	wrUrl = "http://www.war-riders.de"+xwrurl;
	GM_xmlhttpRequest({
		method: 'GET', url: wrUrl,
		headers: { 'User-agent': navigator.userAgent, 'Accept': 'text/ xml'},
		onload: function(responseDetails) { // responseDetails.responseText
			var werteLetzenZweiTage = responseDetails.responseText.match(/,([0-9]*),([0-9]*)&values_2/);
			if(werteLetzenZweiTage){
				// zuwachsLetzenZweiTage kann 0, + oder - sein
				var zuwachsLetzenZweiTage = parseInt(werteLetzenZweiTage[2]) - parseInt(werteLetzenZweiTage[1]);
				var oldContent = document.getElementById(idrep).getAttribute("onmouseover");
				// je nach zuwachsLetzenZweiTage muss hier das richtige icon rein
				var zColor;
				if( zuwachsLetzenZweiTage<0 ) zColor="red"; else zColor="green";
				var inhalt = " <font color="+zColor+">"+zuwachsLetzenZweiTage+"</font>";
				var newContent = oldContent.replace(replacement,inhalt);
				document.getElementById(idrep).setAttribute("onmouseover",newContent);
				// noch die GM var ergaenzen
				var ist = GM_getValue(gmbez);
				if(ist) GM_setValue(gmbez,ist.replace(/,/,","+zuwachsLetzenZweiTage+","));
			}
		}
	});
}