var metadata=<> 
// ==UserScript==
// @name           SpyCalc
// @namespace      http://userscripts.org/scripts/show/95712
// @include        http://s*.ikariam.com/*
// @exclude        http://support*.ikariam.*/*
// @author         Karandaras (http://userscripts.org/users/265255)
// @require        http://userscripts.org/scripts/source/94511.user.js
// @version        1.0u
// @updater:script http://userscripts.org/scripts/source/95712.user.js
// @updater:meta   http://userscripts.org/scripts/source/95712.meta.js
// @updater:delay  86400000
// ==/UserScript==
</>.toString();

var href = document.location.href;
var lang = getLanguage(href);
var server = getServer(href);
var store = server+"_"+lang;

var languages = {
	de: {
		"optimaldist": "Optimale Verteilung",
		"lowrisk": "Niedriges Entdeckungsrisiko",
		"highchance": "Hohe Erfolgschance",
		"spy": "Agenten",
		"decoy": "Lockvögel",
		"risk": "Entdeckungsrisiko",
		"chance": "Erfolgschance",
		"drisk": "Lockvogel Entdeckungsrisiko",
		"cost": "Kosten",
		"dcost": "Lockvogel Kosten",
		"use": "Auswählen",
		"titel": "SpyCalc Abwehr",
		"spies": "Spione",
		"basicRisk": "Grundrisiko: ",
		"send": "Spion senden",
		"warehouse": "Lagerstand inspizieren",
		"army": "Garnison ausspähen",
		"online": "Online-Status",
		"settings_header": "SpyCalc Einstellungen",
		"settings_show1": "Box in Seitenleiste anzeigen:",
		"settings_position": "Position der Box:",
		"settings_pos0": "Oben",
		"settings_pos1": "Unten",
		"settings_autoOpen": "1. Bericht immer aufklappen",
		"save": "Speichern!",
		"saved": "Einstellungen gespeichert.",
	},
	en: {
		"optimaldist": "Optimal distribution",
		"lowrisk": "Low risk of discovery",
		"highchance": "High success chance",
		"spy": "Agents",
		"decoy": "Decoys",
		"risk": "Risk of discovery",
		"chance": "Success chance",
		"drisk": "Decoy risk of discovery",
		"cost": "Cost",
		"dcost": "Decoy cost",
		"use": "Select",
		"titel": "SpyCalc Defense",
		"spies": "Spies",
		"basicRisk": "Basic risk: ",
		"send": "Infiltrate Town ",
		"warehouse": "Inspect Warehouse",
		"army": "Spy out garrison",
		"online": "Online status",
		"settings_header": "SpyCalc Settings",
		"settings_show1": "Show box in sidebar:",
		"settings_position": "Box position:",
		"settings_pos0": "Top",
		"settings_pos1": "Bottom",
		"settings_autoOpen": "Auto-expand 1. report",
		"save": "Save!",
		"saved": "Settings saved.",
	},
	es: {
		"optimaldist": "Distribución óptima",
		"lowrisk": "Riesgo bajo de ser descubierto",
		"highchance": "Probabilidad alta de éxito",
		"spy": "Espías",
		"decoy": "Cebos",
		"risk": "Riesgo %",
		"chance": "Ëxito %",
		"drisk": "Cebos %",
		"cost": "Costes - Espías",
		"dcost": "Costes - Cebos",
		"use": "Seleccione",
		"titel": "SpyCalc Defensa",
		"spies": "Espías",
		"basicRisk": "Riesgo Básico:",
		"send": "Infiltrarse en la Ciudad",
		"warehouse": "Inspeccionar depósito",
		"army": "Espíar guarnición",
		"online": "Estado de conexión",
		"settings_header": "SpyCalc Opciones",
		"settings_show1": "Mostrar cuadro en la barra lateral:",
		"settings_position": "Posición de la caja:",
		"settings_pos0": "Parte superior",
		"settings_pos1": "Parte inferior",
		"settings_autoOpen": "Auto-expandir 1. informe",
		"save": "Guardar!",
		"saved": "Configuración guardada.",
	},
	pl: {
		"optimaldist": "Optymalne szpiegowanie",
		"lowrisk": "Niskie ryzyko wykrycia",
		"highchance": "Duże szanse powodzenia",
		"spy": "Agenci",
		"decoy": "Przynęty",
		"risk": "Ryzyko wykrycia",
		"chance": "Szanse powodzenia",
		"drisk": "Ryzyko wykrycia przynęty",
		"cost": "Koszty",
		"dcost": "Koszt przynęty",
		"use": "Wybierz",
		"titel": "SpyCalc (Obrona)",
		"spies": "Szpiedzy",
		"basicRisk": "Podstawowe ryzyko: ",
		"send": "Infiltruj miasto ",
		"warehouse": "Szpieguj magazyn",
		"army": "Szpieguj garnizon",
		"online": "Status online",
		"settings_header": "Ustawienia SpyCalc",
		"settings_show1": "Pokaż okno w bocznym panelu:",
		"settings_position": "Pozycja okna:",
		"settings_pos0": "Góra",
		"settings_pos1": "Dół",
		"settings_autoOpen": "Auto-otwarcie 1. raportu",
		"save": "Zapisz!",
		"saved": "Ustawienia zapisano.",
	},
};
// Update-Check
var update = new Updater(metadata,lang);
update.update();


var language = languages[lang];
if(language == null)
	language = languages['en'];

var targetFreeSpies = -1;
var targetCityLevel = -1;
var targetSafehouseLevel = -1;
var isTargetInactive = -1;
var remainingRisk = -1;
var missionDataString = "";
var goldIconTag = '<img alt="Gold" src="skin/resources/icon_gold_small.gif"> ';
var wineIconTag = '<img alt="Gold" src="skin/resources/icon_wine_small.gif"> ';
var sulfurIconTag = '<img alt="Gold" src="skin/resources/icon_sulfur_small.gif"> ';
var spyimg = '<img align="middle" style="display:inline" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAYCAYAAAAs7gcTAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCBwkiChuMuSQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADTUlEQVQ4y12UTUxcZRSGn++7P3MHhxmYwdIRCvJjY1olgErVSiMNYBFiGqOJsWpiujFujHGjicvqwqQrXdmwURcmNbExGpq4MqGQLtqm4KJ1AEMrQmeGmTvDnbk/c39cEBA9ydmcPIs3ec/7Cv43p89e0KSielWzSHdH7JfL33w20/HYGTZyV5EHwZHTH1yUqub5no0UISurW9PZvsmVjdxVgF146OR5AGJG87mGW2fH3MKqbOI6VdKtyb7jwxMpABXg1rVZBk68XRJCpjynTL1WRAhBEDSQUqduG9E+DKDq8dLN+Uut2RYdP96DEApS0UCJMHSxK2NPwurylb6HFIc24VDKr+PYFcKggd9wGB9/4QqAvHVtlidPvBU1GkGkCIHQ42ixGHbdpLZTwHUtlpaXxgDkK298+Np2PkdbQhFtrUlW7RYAdD2OlApCCJZv/w6AEPojZ450HJ4bfzRg2w5Y/EvBMBIIKXZ1SwWhNNHRmXhOvvTyzJzvWWQzCdwADDVEUXWkVJFSRQhJFNjcvnmnU3QdHYnU6hpRFNHec5y+9lYW7lYIAp8oCg969ro0i1tIIRDpHlQ9xvT4KZ7ob0dKDc+18JzdrZpFS4a+G90vOQRBhO96mLU656aeRdM1mpOHUbUYQgh6envnZNCwhevuCCNmrHohHHv8GE3JVj5+9zQ7VhUhVXzf5f69dRTfd78fnXrnByHEcJMSsvFgi818gdzanxTyWzRCBd93qVsVlKPD086Rzq6vIySFcol81afh2Wy7Gp5VoFLzSTXHGRvsRk6OjVpls4jr1LCtGo5d5e+yS3G7jGjOEgbBH++9OWXO9EqUjVLtSxn6v5lm4UVNjycNw0CLGaiKSjKVxrPLGTO3aJT8OHLj7mJp4uRTC6lEokOPaTQlWmjLZHGcOqpuEEr1zsDIqR9n5+aFBLhXqEZ+ECKEoOHaeA0PiPA9h1RLRvvi0rev7ifl8ndfVZfW7P5DqoWGw45VgSgCIUMplfSehfsZ/OgZ53rGy4es35jvz0Q/NwsX26oUbsz/lH569Oy/plsLF5L1659H58cHo73bJxOD0fuTQxcPPocKkHj+02p3+uHJ9VLh197sIdY28wwNdJFbefCfmvgH+h1zEVRcQuwAAAAASUVORK5CYII%3D" title="'+language['spy']+'">';
var decoyimg = '<img align="middle" style="display:inline" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAYCAYAAADDLGwtAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sCBwkhKgvPyi8AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADIUlEQVQoz3WSTWyTdQDGf+/b9v1o6cc+C+uW2VAoWyPGuiFDNAWCB1ASIRiBgyN6MCae0HiAKEcWE+Hi4ifEGCEGJIyPfbBOEDJdmMkcW1LnNsxS6TrW0dqytW+//h7mjB74nZ7DL89zeQBof9YNwFnf2jP9zc1iIBAQ320OiqG9L4eKyTEZQOIf2resHtbHCy1em0atrlIWgpICV8tJrWsyZZhXRCUXL6TcFgL7kgirSjpZILW4iW2rquj6+BfMAJ92HFO7Os+0mYVB9x0P5YzO9ufdDIRvY5gE/05XIKl1iFzrxnoO722lLARFIZMvCUrFnLano2d5OonI52Big+L0x9IZBvsnkIA5zUxN49rlxneOf7HbbHMrfvuDi92dHxK5ex+PZKLssqCa9PSp8yerAtvai/LAuc+vGkXp4q0ZDXvTDlQgIUpUJQ1OXLnsaA69bgKQd+3ZzczMNEUjS+36TXzSc4VDHxxjrqaS4ManxMjtGzkA+YWgj2x2idl4lNGff+IJj4fNrS18PRCmrGjSfHIRcb/bJa/xNPCkNUY+l+NW+Cyuymr869ZjQaYkYHhsnHSpKWS2qRa2trVw4dT3VALTkxFmZheoqXKS/ushi3kL18PXMJUW7h2fTOk0+bxEhn5g1h1Ck4voNicXfhznYXyaHUbfN6aGne+PXjp/+rV3n85QMpJEfpsgofnpGxxBWFfTd72XAwf3HTIdeeOVyOhUHI8Uo7Gulq6og+jkrzxKzfP72BCHX2rDW7yHeXRqlqyR56sxhbqlKSRlHYpuRbfa0e0ucedmjyR8jSPmyB9xFuai6PYKjAdZaJABGauukEgkpIjh0gYv9Rvyn7F5VjlcyCYThsWGJMoY2TRCUnC6qrGoVgBkv7d6JJ1ZEkYui9mioup2JFmmWMhjMcu0PhNcFi9/2xmc7u2QVs4uSRLZRxkMI0u1tcBn7724/OzY3V4AtthMIuiuFV+ePPGq14I4sMEpDgadR/kvR/ZvV3euqRBbaxwCwFfvOx2oUKLn3nxOhI/u0v4nh+odw40geAzyStj/1ttE4aPgY8S/Aa2fQnmc9BGvAAAAAElFTkSuQmCC" title="'+language['decoy']+'">';
var closeimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY7wJJwSCwahwvRsRS4HCkAAMFYmXQ8RYNEoHBgiByFRRAoIB8bknrUKGkKEQYCwQgRIAcDKDEYJD4ZB0EAOw%3D%3D";
var openimg = "data:image/gif;base64,R0lGODlhCgALANUlABMTExQUFB4eHlZWVmpqakFBQVlZWZ2dnTw8PFRUVBsbGz09PTs7O4eHhxYWFg8PD5iYmDc3NxISEhkZGU5OTh8fHx0dHTAwMI+Pj3d3d5qamhgYGCIiIhUVFTMzM01NTVNTUzIyMmJiYhERERcXFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAAAKAAsAAAY9wEPmkxgMEiDDAUIIMRAIRqSgKTVGpOzmsSh5CwGBRcHxejEOhUBiMHs9nUnF7SUAABS69xLQe0VdfoKCQQA7";
var hidden = GM_getValue(store+'-hide',false);
var position = GM_getValue(store+"-position",1);
var missionData = loadArray(GM_getValue(store+"-missionData",'({11:{gold:150, crystal:80, completionTime:900, completionTimePercent:5}, 1:{gold:30, riskBefore:30, riskAfter:5, riskPerSpy:3, successChance:60, 301:{1:60}, name:"Spion senden", image:"spy/mission_invasion.jpg", decoyImage:"spy/decoy_wine.jpg"}, 20:{gold:0, riskBefore:0, riskAfter:0}, 6:{gold:120, riskBefore:70, riskAfter:20, riskPerSpy:6, successChance:55, 301:{1:70}, name:"Garnison aussp\xE4hen", description:"Wenn wir uns w\xE4hrend des Morgenappells an der richtigen Stelle verstecken, k\xF6nnen wir feststellen, wie viele Soldaten in dieser Garnison stationiert sind. Damit lie\xDFe sich ein Angriff genauer planen!", decoyDescription:"Eine schwere R\xFCstung, ein st\xE4hlerner Helm und dr\xFCckende Sonne. Da kommt vielen Wachen ein k\xFChler Krug Wein sehr gelegen. Ebenso gelegen wird unseren Agenten die verminderte Aufmerksamkeit der tief schlafenden Wachen kommen.", image:"spy/mission_garrison.jpg", decoyImage:"spy/decoy_wine.jpg"}, 4:{gold:45, riskBefore:24, riskAfter:12, name:"Schatzkammer aussp\xE4hen", description:"Es wird nicht leicht sein, einen Blick in die Schatzkammer der Stadt zu erhaschen. Daf\xFCr wissen wir danach aber, wie viel Gold dort lagert."}, 5:{gold:150, riskBefore:60, riskAfter:15, riskPerSpy:6, successChance:30, 301:{5:100}, name:"Lagerstand inspizieren", description:"Im Lager der Stadt k\xF6nnen wir herausfinden, welche Rohstoffe dort aufbewahrt werden. Danach werden wir wissen, ob sich vielleicht ein Angriff lohnt.", decoyDescription:"Die Beamten deiner Gegner leben gerne ein wenig im Luxus. Eine angemessene Menge Gold an der richtigen Stelle kann daf\xFCr sorgen, dass auch ein sonst wachsames Auge mal etwas \xFCbersieht. Dies wird deinen Agenten die Arbeit erheblich erleichtern.", image:"spy/mission_storage.jpg", decoyImage:"spy/decoy_gold.jpg"}, 3:{gold:75, riskBefore:35, riskAfter:10, riskPerSpy:4, successChance:50, 301:{5:200}, name:"Forschungsstand aussp\xE4hen", description:"Unser Spion ist klug genug, um auch als Forscher arbeiten zu k\xF6nnen. Auf diese Weise kann er in Erfahrung bringen, wie weit die Wissenschaft in der Stadt ist.", decoyDescription:"Die Beamten deiner Gegner leben gerne ein wenig im Luxus. Eine angemessene Menge Gold an der richtigen Stelle kann daf\xFCr sorgen, dass auch ein sonst wachsames Auge mal etwas \xFCbersieht. Dies wird deinen Agenten die Arbeit erheblich erleichtern.", image:"spy/mission_research.jpg", decoyImage:"spy/decoy_gold.jpg"}, 10:{gold:90, riskBefore:90, riskAfter:26, riskPerSpy:5, successChance:40, 301:{5:100}, name:"Nachrichtenverkehr \xFCberwachen", description:"Wenn sich unser Spion als Bote anstellen l\xE4sst, kann er uns berichten, mit wem Nachrichten ausgetauscht und Vertr\xE4ge geschlossen werden!", decoyDescription:"Die Beamten deiner Gegner leben gerne ein wenig im Luxus. Eine angemessene Menge Gold an der richtigen Stelle kann daf\xFCr sorgen, dass auch ein sonst wachsames Auge mal etwas \xFCbersieht. Dies wird deinen Agenten die Arbeit erheblich erleichtern.", image:"spy/mission_messages.jpg", decoyImage:"spy/decoy_gold.jpg"}, 7:{gold:50, riskBefore:50, riskAfter:22, riskPerSpy:2, successChance:20, 301:{4:100}, name:"Flotten- und Truppenbewegungen \xFCberwachen", description:"Wenn wir ein Auge auf das Stadttor und das andere auf den Hafen werfen, k\xF6nnen wir herausfinden, was die Bewohner dort so treiben - zum Beispiel mit wem sie Krieg f\xFChren und mit wem sie handeln.", decoyDescription:"Ein wenig L\xE4rm sollte ausreichend viele Wachen abziehen, um die Gefahr f\xFCr unsere Agenten zu reduzieren. Wie bei allen chemischen Reaktionen gilt auch hier: Viel hilft viel!", image:"spy/mission_military_movements.jpg", decoyImage:"spy/decoy_sulfur.jpg"}, 12:{gold:500, riskBefore:120, riskAfter:60, name:"Allianz\xE4mter ausspionieren"}, 21:{gold:100, riskBefore:40, riskAfter:25, riskPerSpy:7, successChance:50, 301:{4:80}, name:"Online-Status", description:"Mit etwas Geschick k\xF6nnen wir heraus finden, ob der Herrscher zurzeit ein Auge auf sein Volk hat.", decoyDescription:"Ein wenig L\xE4rm sollte ausreichend viele Wachen abziehen, um die Gefahr f\xFCr unsere Agenten zu reduzieren. Wie bei allen chemischen Reaktionen gilt auch hier: Viel hilft viel!", image:"spy/mission_onlinestatus.jpg", decoyImage:"spy/decoy_sulfur.jpg"}, 8:{gold:0, riskBefore:5, riskAfter:0, riskPerSpy:1, successChance:65, 301:{4:40}, name:"Spion zur\xFCckziehen", description:"Wir k\xF6nnen den Spion jederzeit zur\xFCckrufen. Seine Heimkehr sollte kaum f\xFCr Aufregung in der Stadt sorgen.", decoyDescription:"Ein wenig L\xE4rm sollte ausreichend viele Wachen abziehen, um die Gefahr f\xFCr unsere Agenten zu reduzieren. Wie bei allen chemischen Reaktionen gilt auch hier: Viel hilft viel!", image:"spy/mission_retreat.jpg", decoyImage:"spy/decoy_sulfur.jpg"}})'));
var spies = loadArray(GM_getValue(store+"-spies",''));
var towns = loadArray(GM_getValue(store+"-towns",''));
var show = GM_getValue(store+'-show',true);
var autoOpen = GM_getValue(store+'-autoOpen',false);
var cityids = new Array();
var cities = document.getElementById('citySelect').getElementsByTagName('option');
for(var i=0; i<cities.length; i++)
	if(cities[i].getAttribute("class") == "coords")
		cityids.push(cities[i].value);

if(document.getElementById('espionageReports') && autoOpen) {
	window.addEventListener('load',function() {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent( 'click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null );
		document.getElementById('espionageReports').getElementsByTagName('td')[1].dispatchEvent(evt);
	},true);
}

if(document.getElementById('totalAgents'))
	window.addEventListener('load',addBox,true);

if(document.getElementById('value_wood') && document.body.id == "safehouse" && document.getElementById('reportInboxLeft')) {
	spies[getCurrentId()] = parseInt(document.getElementById('reportInboxLeft').getElementsByTagName('li')[1].innerHTML.replace(/(\d+).*/,"$1"));
	GM_setValue(store+"-spies", storeArray(spies));
}

if(document.getElementById('value_wood') && document.body.id == "city") {
	if(document.getElementById('information').innerHTML.search(/<li class="owner">/)==-1) {
		towns[getCurrentId()] = parseInt(document.getElementById('position0').getElementsByTagName('span')[0].innerHTML.replace(/\D*(\d+)/,"$1"));
		GM_setValue(store+"-towns", storeArray(towns));
		if(show)
			addDefBox();
	}
}

if(document.body.id == "options") {
	mySettings();
}

function addDefBox() {
	var defbox = document.createElement('div');
	defbox.setAttribute('id','def');
	defbox.setAttribute('class','dynamic');
	var basic = calcDef(1, 0, 0, missionData, spies[getCurrentId()], towns[getCurrentId()])[0];
	defbox.innerHTML = "<h3 class=\"header\" id=showHideDef><img style='display:inline' id=\""+(hidden?"showDef":"hideDef")+"\" src=\""+(hidden?openimg:closeimg)+"\"> "+language["titel"]+" ("+basic+"%)</h3>";

	var defboxContent = document.createElement('div');
	defboxContent.setAttribute('class','content');
	defboxContent.setAttribute('id','defContent');
	if(hidden)
		defboxContent.style.display = "none";
	var send = [[0,0,100,0,0],[0,0,100,0,0]];
	var warehouse = [[0,0,100,0,0],[0,0,100,0,0]];
	var army = [[0,0,100,0,0],[0,0,100,0,0]];
	var online = [[0,0,100,0,0],[0,0,100,0,0]];
	
	for(var i=1; i<32; i++) {
		var csend = [0,0,100,0,0];
		var cwarehouse = [0,0,100,0,0];
		var carmy = [0,0,100,0,0];
		var conline = [0,0,100,0,0];
		for(var j=0; i+j<32; j++) {
			csend = calcDef(1, i, j, missionData, spies[getCurrentId()], towns[getCurrentId()]);
			cwarehouse = calcDef(5, i, j, missionData, spies[getCurrentId()], towns[getCurrentId()]);
			carmy = calcDef(6, i, j, missionData, spies[getCurrentId()], towns[getCurrentId()]);
			conline = calcDef(21, i, j, missionData, spies[getCurrentId()], towns[getCurrentId()]);
			
			if(csend[1] > send[1][1] || (csend[2] < send[1][2] && csend[1] >= send[1][1])) {
				send[1]=csend;
			}
			
			if(csend[2] < send[0][2] || (csend[2] <= send[0][2] && csend[1]> send[0][1])) {
				send[0]=csend;
			}
			
			
			if(cwarehouse[1] > warehouse[1][1] || (cwarehouse[2] < warehouse[1][2] && cwarehouse[1] >= warehouse[1][1])) {
				warehouse[1]=cwarehouse;
			}
			
			if(cwarehouse[2] < warehouse[0][2] || (cwarehouse[2] <= warehouse[0][2] && cwarehouse[1]> warehouse[0][1])) {
				warehouse[0]=cwarehouse;
			}
			
			
			if(carmy[1] > army[1][1] || (carmy[2] < army[1][2] && carmy[1] >= army[1][1])) {
				army[1]=carmy;
			}
			
			if(carmy[2] < army[0][2] || (carmy[2] <= army[0][2] && carmy[1]> army[0][1])) {
				army[0]=carmy;
			}
			
			
			if(conline[1] > online[1][1] || (conline[2] < online[1][2] && conline[1] >= online[1][1])) {
				online[1]=conline;
			}
			
			if(conline[2] < online[0][2] || (conline[2] <= online[0][2] && conline[1]> online[0][1])) {
				online[0]=conline;
			}
		}
	}
	
	defboxContent.innerHTML = "<p style='text-align:left; line-height: 18px; margin: auto 5px'><ul>"
				+ "<li style='line-height: 22px; margin: auto 7px'>"+language['basicRisk']+"<span style='float:right'>"+basic+"%</span></li>"
				+ "<li style='line-height: 22px; margin: auto 7px'><table border=0 width=100%><tr><td width=50%></td><td width=25% align=right>min</td><td width=25% align=right>max</td></tr></table></li>"
				+ "<li style='line-height: 22px; margin: auto 7px'><b>"+language['send']+"</b><br><table border=0 width=100%><tr><td width=50%>"+language['chance']+": </td><td width=25% align=right>"+send[0][1]+"% </td><td width=25% align=right> "+send[1][1]+"%</td></tr><tr><td>"+language['risk']+": </td><td align=right>"+send[0][2]+"% </td><td align=right> "+send[1][2]+"%</td></tr><tr><td>"+language['spies']+": </td><td align=right>"+send[0][3]+spyimg+" "+send[0][4]+decoyimg+" </td><td align=right> "+send[1][3]+spyimg+" "+send[1][4]+decoyimg+"</td></tr></table></li>"
				+ "<li style='line-height: 22px; margin: auto 7px'><b>"+language['warehouse']+"</b><br><table border=0 width=100%><tr><td width=50%>"+language['chance']+": </td><td width=25% align=right>"+warehouse[0][1]+"% </td><td width=25% align=right> "+warehouse[1][1]+"%</td></tr><tr><td>"+language['risk']+": </td><td align=right>"+warehouse[0][2]+"% </td><td align=right> "+warehouse[1][2]+"%</td></tr><tr><td>"+language['spies']+": </td><td align=right>"+warehouse[0][3]+spyimg+" "+warehouse[0][4]+decoyimg+" </td><td align=right> "+warehouse[1][3]+spyimg+" "+warehouse[1][4]+decoyimg+"</td></tr></table></li>"
				+ "<li style='line-height: 22px; margin: auto 7px'><b>"+language['army']+"</b><br><table border=0 width=100%><tr><td width=50%>"+language['chance']+": </td><td width=25% align=right>"+army[0][1]+"% </td><td width=25% align=right> "+army[1][1]+"%</td></tr><tr><td>"+language['risk']+": </td><td align=right>"+army[0][2]+"% </td><td align=right> "+army[1][2]+"%</td></tr><tr><td>"+language['spies']+": </td><td align=right>"+army[0][3]+spyimg+" "+army[0][4]+decoyimg+" </td><td align=right> "+army[1][3]+spyimg+" "+army[1][4]+decoyimg+"</td></tr></table></li>"
				+ "<li style='line-height: 22px; margin: auto 7px'><b>"+language['online']+"</b><br><table border=0 width=100%><tr><td width=50%>"+language['chance']+": </td><td width=25% align=right>"+online[0][1]+"% </td><td width=25% align=right> "+online[1][1]+"%</td></tr><tr><td>"+language['risk']+": </td><td align=right>"+online[0][2]+"% </td><td align=right> "+online[1][2]+"%</td></tr><tr><td>"+language['spies']+": </td><td align=right>"+online[0][3]+spyimg+" "+online[0][4]+decoyimg+" </td><td align=right> "+online[1][3]+spyimg+" "+online[1][4]+decoyimg+"</td></tr></table></li>"
				+ "</ul></p>";

	defbox.appendChild(defboxContent);

	defbox.innerHTML += "<div class=\"footer\"></div>";
	var bread = document.getElementById('breadcrumbs');
	
	if(position == 0)
		bread.parentNode.insertBefore(defbox, bread.nextSibling);
	else
		bread.parentNode.insertBefore(defbox, document.getElementById("mainview"));

	document.getElementById('showHideDef').addEventListener('click',showHide,true);
}

function showHide() {
	var showDef = document.getElementById('showDef');
	var hideDef = document.getElementById('hideDef');
	if(showDef) {
		document.getElementById('defContent').style.display = "block";
		showDef.src = closeimg;
		showDef.id = "hideDef";
		GM_setValue(store+"-hide",false);
	}
	else if(hideDef){
		document.getElementById('defContent').style.display = "none";
		hideDef.src = openimg;
		hideDef.id = "showDef";
		GM_setValue(store+"-hide",true);
	}
}

function addBox() {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.innerHTML =  "<h3 class=\"header\">"+language['optimaldist']+"</h3>"
			+"<div class=\"content\">"
                        +"	<div class=\"missionWrapper\">"
			+"		<div class=\"decoyMission contentBox06\">"
	                +"			<h3 class=\"header\">"+language['highchance']+"</h3>"
	                +"			<ul class=\"infoList\">"
	                +"				<li>"
			+"					<label>"+language['spy']+"</label>"
			+"					<div id=spies1>0</div>"
			+"				</li>"
	                +"				<li style='border-bottom:1px dotted #8F7647'>"
			+"					<label>"+language['decoy']+"</label>"
			+"					<div id=decoys1>0</div>"
			+"				</li>"
	                +"				<li style='font-weight:700;height:22px'>"
			+"					<label>"+language['chance']+"</label>"
			+"					<div id=chance1>0%</div>"
			+"					<div class=\"progbarWrapper\"><div style=\"width: 0%;\" id=\"chance1_progbar\" class=\"progbar\"></div>"
			+"				</li>"
	                +"				<li style='font-weight:700;height:22px'>"
			+"					<label>"+language['risk']+"</label>"
			+"					<div id=risk1>0%</div>"
			+"					<div class=\"progbarWrapper\"><div style=\"width: 0%;\" id=\"risk1_progbar\" class=\"progbar progbar_right\"></div>"
			+"				</li>"
	                +"				<li style='font-weight:700;border-bottom:1px dotted #8F7647;height:22px'>"
			+"					<label>"+language['drisk']+"</label>"
			+"					<div id=drisk1>0%</div>"
			+"					<div class=\"progbarWrapper\"><div style=\"width: 0%;\" id=\"drisk1_progbar\" class=\"progbar progbar_right\"></div>"
			+"				</li>"
	                +"				<li>"
			+"					<label>"+language['cost']+"</label>"
			+"					<div id=cost1>"+document.getElementById('info_costs_text').innerHTML+"</div>"
			+"				</li>"
	                +"				<li>"
			+"					<label>"+language['dcost']+"</label>"
			+"					<div id=dcost1>"+document.getElementById('info_decoycost_text').innerHTML+"</div>"
			+"				</li>"
	                +"			</ul>"
			+"					<div class=centerButton style='margin-top:-15px; height:40px;'><input value="+language['use']+" id=use1 class=button type=submit></div>"
			+"			<div class=\"footer\"></div>"
	                +"		</div>"
			+"		<div class=\"realMission contentBox06\">"
	                +"			<h3 class=\"header\">"+language['lowrisk']+"</h3>"
	                +"			<ul class=\"infoList\">"
	                +"				<li>"
			+"					<label>"+language['spy']+"</label>"
			+"					<div id=spies0>0</div>"
			+"				</li>"
	                +"				<li style='border-bottom:1px dotted #8F7647'>"
			+"					<label>"+language['decoy']+"</label>"
			+"					<div id=decoys0>0</div>"
			+"				</li>"
	                +"				<li style='font-weight:700;height:22px'>"
			+"					<label>"+language['chance']+"</label>"
			+"					<div id=chance0>0%</div>"
			+"					<div class=\"progbarWrapper\"><div style=\"width: 0%;\" id=\"chance0_progbar\" class=\"progbar\"></div>"
			+"				</li>"
	                +"				<li style='font-weight:700;height:22px'>"
			+"					<label>"+language['risk']+"</label>"
			+"					<div id=risk0>0%</div>"
			+"					<div class=\"progbarWrapper\"><div style=\"width: 0%;\" id=\"risk0_progbar\" class=\"progbar progbar_right\"></div>"
			+"				</li>"
	                +"				<li style='font-weight:700;border-bottom:1px dotted #8F7647;height:22px'>"
			+"					<label>"+language['drisk']+"</label>"
			+"					<div id=drisk0>0%</div>"
			+"					<div class=\"progbarWrapper\"><div style=\"width: 0%;\" id=\"drisk0_progbar\" class=\"progbar progbar_right\"></div>"
			+"				</li>"
	                +"				<li>"
			+"					<label>"+language['cost']+"</label>"
			+"					<div id=cost0>"+document.getElementById('info_costs_text').innerHTML+"</div>"
			+"				</li>"
	                +"				<li>"
			+"					<label>"+language['dcost']+"</label>"
			+"					<div id=dcost0>"+document.getElementById('info_decoycost_text').innerHTML+"</div>"
			+"				</li>"
	                +"			</ul>"
			+"					<div class=centerButton style='margin-top:-15px; height:40px;'><input value="+language['use']+" id=use0 class=button type=submit></div>"
			+"			<div class=\"footer\"></div>"
	                +"		</div>"
                        +"		<br class=\"clearfloat\" />"
                        +"	</div>"
                        +"</div>"
			+"<div class=\"footer\"></div>"
			+"</div>";

	document.getElementById('missionSummary').parentNode.parentNode.parentNode.parentNode.appendChild(div);
	if(document.getElementById('missionSelect'))
		document.getElementById('missionSelect').addEventListener('change',calc,true);
	document.getElementById('use0').addEventListener('click',setSpys,true);
	document.getElementById('use1').addEventListener('click',setSpys,true);
	

	var scripts = document.getElementsByTagName('script');
	var i=0;
	while(scripts[i].innerHTML.indexOf("Entdeckungsrisiko")<0 && i<scripts.length)
		i++;

	if(i<scripts.length) {
		var lines = scripts[i].innerHTML.split("\n");

		targetFreeSpies = -1;
		targetCityLevel = -1;
		targetSafehouseLevel = -1;
		isTargetInactive = -1;
		missionDataString = "";

		for(var j = 0; j<lines.length; j++) {
			if(lines[j].indexOf("var targetFreeSpies")>=0)
				targetFreeSpies = parseInt(lines[j].split("=")[1]);
			else if(lines[j].indexOf("var targetCityLevel")>=0)
				targetCityLevel = parseInt(lines[j].split("=")[1]);
			else if(lines[j].indexOf("var targetSafehouseLevel")>=0)
				targetSafehouseLevel = parseInt(lines[j].split("=")[1]);
			else if(lines[j].indexOf("var isTargetInactive")>=0)
				isTargetInactive = parseInt(lines[j].split("=")[1]);
			else if(lines[j].indexOf("var remainingRisk")>=0)
				remainingRisk = parseInt(lines[j].split("=")[1]);
			else if(lines[j].indexOf("that.missionData = JSON.parse('")>=0)
				missionDataString = lines[j].substring(lines[j].indexOf("{"),lines[j].lastIndexOf("}")+1).replace(/\\/g,"");

			if(targetFreeSpies != -1 && targetCityLevel != -1 && targetSafehouseLevel != -1 && isTargetInactive != -1 && missionDataString != "" && remainingRisk != -1)
				break;
		}

		missionData = eval("("+missionDataString+")");
		GM_setValue(store+"-missionData", storeArray(missionData));
	}
	
	calc();
}

// Optimale Verteilung berechnen und ausgeben
function calc() {
	var mspies = 0;
	for(var i=0; i<cityids.length; i++) {
		if(document.getElementById('spyCount_'+cityids[i])!=null) {
			document.getElementById('agents'+cityids[i]).value = 0;
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			document.getElementById('agents'+cityids[i]).dispatchEvent(evt);
			document.getElementById('decoys'+cityids[i]).value = 0;
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			document.getElementById('decoys'+cityids[i]).dispatchEvent(evt);
			mspies += parseInt(document.getElementById('spyCount_'+cityids[i]).innerHTML);
		}
	}
	
	var spies = [0,0];
	var decoys = [0,0];
	var risks = [100,100];
	var chances = [0,0];
	var drisks = [0,0];
	var costs1 = ["",""];
	var costs2 = ["",""];
	var missionId = 1;

	if(document.getElementById('missionSelect'))
		missionId = document.getElementById('missionSelect').value;

	for(var spy=1; spy<=mspies; spy++) {
		var lastchance = 0;
		var lastrisk = 100;
		var cchance = 0;
		var crisk = 100;
		var drisk = 0;
		var cost1 = "";
		var cost2 = "";
		var minrisk = 0;
		for(var decoy=0; decoy+spy<=mspies; decoy++) {
			lastchance = cchance;
			lastrisk = crisk;

			[cchance, crisk, drisk, cost1, cost2, minrisk] = calcVals(missionId,spy,decoy);
			
			if(crisk == minrisk && (cchance <= lastchance || cchance == 100))
				break;

			if(cchance > chances[1] || (crisk < risks[1] && cchance >= chances[1])) {
				spies[1]=spy;
				decoys[1]=decoy;
				risks[1]=crisk;
				chances[1]=cchance;
				drisks[1]=drisk;
				costs1[1]=cost1;
				costs2[1]=cost2;
			}
			
			if(crisk < risks[0] || (crisk <= risks[0] && cchance > chances[0])) {
				spies[0]=spy;
				decoys[0]=decoy;
				risks[0]=crisk;
				chances[0]=cchance;
				drisks[0]=drisk;
				costs1[0]=cost1;
				costs2[0]=cost2;
			}
		}
	}
	
	document.getElementById('spies0').innerHTML = spies[0];
	document.getElementById('spies1').innerHTML = spies[1];
	document.getElementById('decoys0').innerHTML = decoys[0];
	document.getElementById('decoys1').innerHTML = decoys[1];
	document.getElementById('risk0').innerHTML = risks[0]+"%";
	document.getElementById('risk0_progbar').setAttribute('style','width: '+risks[0]+'%');
	document.getElementById('risk1').innerHTML = risks[1]+"%";
	document.getElementById('risk1_progbar').setAttribute('style','width: '+risks[1]+'%');
	document.getElementById('chance0').innerHTML = chances[0]+"%";
	document.getElementById('chance0_progbar').setAttribute('style','width: '+chances[0]+'%');
	document.getElementById('chance1').innerHTML = chances[1]+"%";
	document.getElementById('chance1_progbar').setAttribute('style','width: '+chances[1]+'%');
	document.getElementById('drisk0').innerHTML = drisks[0]+"%";
	document.getElementById('drisk0_progbar').setAttribute('style','width: '+drisks[0]+'%');
	document.getElementById('drisk1').innerHTML = drisks[1]+"%";
	document.getElementById('drisk1_progbar').setAttribute('style','width: '+drisks[1]+'%');
	document.getElementById('cost0').innerHTML = costs1[0];
	document.getElementById('cost1').innerHTML = costs1[1];
	document.getElementById('dcost0').innerHTML = costs2[0];
	document.getElementById('dcost1').innerHTML = costs2[1];
}

//Hilfsfunktionen
function setSpys(event) {
	var id = event.target.id.substr(event.target.id.length-1)
	var spy = parseInt(document.getElementById('spies'+id).innerHTML);
	var decoy = parseInt(document.getElementById('decoys'+id).innerHTML);
	
	var spies = new Array();
	var mspies = 0;
	for(var i=0; i<cityids.length; i++) {
		if(document.getElementById('spyCount_'+cityids[i])!=null) {
			document.getElementById('agents'+cityids[i]).value = 0;
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			document.getElementById('agents'+cityids[i]).dispatchEvent(evt);
			document.getElementById('decoys'+cityids[i]).value = 0;
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			document.getElementById('decoys'+cityids[i]).dispatchEvent(evt);
			spies[i] = parseInt(document.getElementById('spyCount_'+cityids[i]).innerHTML);
			mspies += spies[i];
		}
		else
			spies[i] = 0;
	}

	if(mspies < spy+decoy)
		return 0;

	for(var i=0; i<spies.length; i++) {
		if(spies[i] > 0 && spy>0) {
			document.getElementById('agents'+cityids[i]).value = Math.min(spy,spies[i]);
			var temp=Math.min(spy,spies[i]);
			spies[i]-=temp;
			spy-=temp;
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			document.getElementById('agents'+cityids[i]).dispatchEvent(evt);
		}
		
		if(spies[i] > 0 && decoy>0) {
			document.getElementById('decoys'+cityids[i]).value = Math.min(decoy,spies[i]);
			var temp=Math.min(decoy,spies[i]);
			spies[i]-=temp;
			decoy-=temp;
			var evt = document.createEvent("KeyEvents");
			evt.initKeyEvent('keyup', true, true, window, false, false, false, false, 13, 0);
			document.getElementById('decoys'+cityids[i]).dispatchEvent(evt);
		}
	}
	
	event.target.blur();
}

function calcVals(missionId, agents,decoys) {
      //Goldkosten
      var agentCost = goldIconTag + missionData[missionId]['gold'] * agents;
      //Entdeckungsrisiko
      var basicRisk = targetFreeSpies*5 - targetCityLevel*2 ;
      // Missionsrisiko
      var missionRisk = basicRisk + missionData[missionId]['riskBefore'] + remainingRisk;
      //Mindestrisiko
      var minimumRisk = Math.max(5, agents*missionData[missionId]['riskPerSpy']);
      
      if (isTargetInactive) {
          missionRisk = missionRisk / 10;
          minimumRisk = minimumRisk / 10;
      } else if (targetSafehouseLevel == 0) {
          missionRisk = missionRisk / 2;
          minimumRisk = minimumRisk / 2;
      }
      
      //Das endgültige Risiko eingrenzen:
      var agentRisk = Math.min(95, Math.max(minimumRisk, missionRisk-(decoys*10)));

      //Erfolgschance
      var chance = Math.min(Math.round((1.0-Math.pow((1.0-(missionData[missionId]['successChance']/100.0)),agents))*100),99);
      var newChance = Math.round(((100-agentRisk)*chance)/100);


      var decoyCost;
      //Lockvogel-Kosten
      if(1 in missionData[missionId][301]) {
          decoyCost = wineIconTag + decoys * missionData[missionId][301][1];
      } else if (4 in missionData[missionId][301]) {
          decoyCost = sulfurIconTag + decoys * missionData[missionId][301][4];
      } else if (5 in missionData[missionId][301]) {
          decoyCost = goldIconTag + decoys * missionData[missionId][301][5];
      }

      //infoDecoyCostText.innerHTML = '';
      var decoyRisk = Math.round(Math.min(95, Math.max((decoys * 2), (missionRisk/4 - 50 + decoys * 5))));
      
      return [newChance, Math.round(agentRisk*10)/10, decoyRisk, agentCost, decoyCost, minimumRisk];
}

function calcDef(missionId, agents, decoys, missionData, thisFreeSpies, thisCityLevel) {
      var thisSafehouseLevel = 1;
      if(typeof thisFreeSpies=='undefined') {
      	thisFreeSpies = 0;
      	thisSafehouseLevel = 0;
      }

      //Entdeckungsrisiko
      var basicRisk = thisFreeSpies*5 - thisCityLevel*2 ;
      // Missionsrisiko
      var missionRisk = basicRisk + missionData[missionId]['riskBefore'];
      //Mindestrisiko
      var minimumRisk = Math.max(5, agents*missionData[missionId]['riskPerSpy']);
      
      if (thisSafehouseLevel == 0) {
          missionRisk = missionRisk / 2;
          minimumRisk = minimumRisk / 2;
      }
      
      //Das endgültige Risiko eingrenzen:
      var agentRisk = Math.min(95, Math.max(minimumRisk, missionRisk-(decoys*10)));

      //Erfolgschance
      var chance = Math.min(Math.round((1.0-Math.pow((1.0-(missionData[missionId]['successChance']/100.0)),agents))*100),99);
      var newChance = Math.round(((100-agentRisk)*chance)/100);


      //infoDecoyCostText.innerHTML = '';
      var decoyRisk = Math.round(Math.min(95, Math.max((decoys * 2), (missionRisk/4 - 50 + decoys * 5))));
      
      basicRisk = Math.max(5,basicRisk);
      if (thisSafehouseLevel == 0) {
      	basicRisk/2;
      }
      
      return [basicRisk, newChance, Math.round(agentRisk*10)/10, agents, decoys];
}

function getLanguage(href) {
	var language = href.replace(/........\d+.(\w+).*/,"$1");
	return language ;
}

function getServer(href) {
	var server = href.replace(/........(\d+).*/,"$1");
	return server;
}

function storeArray(array) {
	return array.toSource();
}

function loadArray(string) {
	if(string=="")
		return new Object();
	else
		return eval(string);
}

function getCurrentId() {
	return document.getElementById('citySelect').value;
}

function mySettings() {
	var div = document.createElement('div');
	div.setAttribute('class', 'contentBox01h');
	div.setAttribute('id', 'SpyCalcOptions');
	
	var check = "";
	if(show)
		check = " checked";
	var check2 = "";
	if(autoOpen)
		check2 = " checked";

	div.innerHTML  = "<h3 class=header><span class=textLabel>"+language['settings_header']+"</span></h3>";
	div.innerHTML += "<div class=content>";
	div.innerHTML += "<table><tr><th>"+language['settings_show1']+"</th><td><input id=SpyCalcShow type=checkbox"+check+"></td></tr>"
			       +"<tr><th>"+language['settings_position']+"</th><td><select id=SpyCalcPosition>"
			       +"<option value=0"+(position==0?" selected":"")+">"+language['settings_pos0']+"</option>"
			       +"<option value=1"+(position==1?" selected":"")+">"+language['settings_pos1']+"</option>"
			       +"<tr><th>"+language['settings_autoOpen']+"</th><td><input id=SpyCalcAutoOpen type=checkbox"+check2+"></td></tr>"
			       +"</select></td></tr></table><div class=centerButton><input value='"+language["save"]+"' id=SpyCalcbutton class=button type=submit></div><div style='text-align: center;' id=SpyCalcreturnbox></div></div><div class=footer></div>";
	document.getElementById('mainview').appendChild(div);
	
	document.getElementById('SpyCalcbutton').addEventListener('click', saveSpyCalc, true);
}

function saveSpyCalc() {
	show = document.getElementById('SpyCalcShow').checked;
	position = document.getElementById('SpyCalcPosition').value;
	autoOpen = document.getElementById('SpyCalcAutoOpen').checked;

	document.getElementById('SpyCalcreturnbox').innerHTML = language['saved'];
	document.getElementById('SpyCalcbutton').blur();

	GM_setValue(store+'-show',show);
	GM_setValue(store+'-autoOpen',autoOpen);
	GM_setValue(store+'-position',position);
}
