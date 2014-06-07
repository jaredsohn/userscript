// ==UserScript==
// @name           VillageRenamer
// @namespace      @DaHaiz
// @description    (v 1.3.4) Setzt alle umbenennen-Inputs auf sichtbar und gibt die Benennung nach dem unter Einstellungen->Einstellungen bestimmten Muster vor.
// @include        http://de*.die-staemme.de/game.php?*village=*&screen=overview_villages*mode=combined*
// @include        http://de*.die-staemme.de/game.php?*village=*&screen=settings&mode=settings*
// @include		   http://de*.die-staemme.de/*screen=main*
// ==/UserScript==

// Modifikation oder Weiterverbreitung ausserhalb des ############
// Die Staemme-Forums (http://forum.die-staemme.de/) beduerfen der 
// Einwilligung des Skriptautors (DaHaiz im DS-Forum) ############

eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3(!e.p){e.p={}}(5(){5 f(n){7 n<10?\'0\'+n:n}3(6 1a.z.q!==\'5\'){1a.z.q=5(l){7 1b(e.19())?e.1D()+\'-\'+f(e.1T()+1)+\'-\'+f(e.1V())+\'T\'+f(e.1G())+\':\'+f(e.1I())+\':\'+f(e.1Q())+\'Z\':B};X.z.q=1M.z.q=1E.z.q=5(l){7 e.19()}}y L=/[\\1W\\15\\1q-\\1l\\1m\\1n\\1j\\1s-\\1t\\1r-\\1k\\1g-\\1h\\13\\14-\\18]/g,M=/[\\\\\\"\\1C-\\1A\\1x-\\1z\\15\\1q-\\1l\\1m\\1n\\1j\\1s-\\1t\\1r-\\1k\\1g-\\1h\\13\\14-\\18]/g,8,H,1e={\'\\b\':\'\\\\b\',\'\\t\':\'\\\\t\',\'\\n\':\'\\\\n\',\'\\f\':\'\\\\f\',\'\\r\':\'\\\\r\',\'"\':\'\\\\"\',\'\\\\\':\'\\\\\\\\\'},m;5 N(o){M.1i=0;7 M.11(o)?\'"\'+o.D(M,5(a){y c=1e[a];7 6 c===\'o\'?c:\'\\\\u\'+(\'1o\'+a.1v(0).12(16)).17(-4)})+\'"\':\'"\'+o+\'"\'}5 E(l,w){y i,k,v,h,K=8,9,2=w[l];3(2&&6 2===\'x\'&&6 2.q===\'5\'){2=2.q(l)}3(6 m===\'5\'){2=m.P(w,l,2)}1w(6 2){J\'o\':7 N(2);J\'S\':7 1b(2)?X(2):\'B\';J\'1y\':J\'B\':7 X(2);J\'x\':3(!2){7\'B\'}8+=H;9=[];3(Q.z.12.1S(2)===\'[x 1R]\'){h=2.h;G(i=0;i<h;i+=1){9[i]=E(i,2)||\'B\'}v=9.h===0?\'[]\':8?\'[\\n\'+8+9.O(\',\\n\'+8)+\'\\n\'+K+\']\':\'[\'+9.O(\',\')+\']\';8=K;7 v}3(m&&6 m===\'x\'){h=m.h;G(i=0;i<h;i+=1){k=m[i];3(6 k===\'o\'){v=E(k,2);3(v){9.1f(N(k)+(8?\': \':\':\')+v)}}}}R{G(k 1u 2){3(Q.1p.P(2,k)){v=E(k,2);3(v){9.1f(N(k)+(8?\': \':\':\')+v)}}}}v=9.h===0?\'{}\':8?\'{\\n\'+8+9.O(\',\\n\'+8)+\'\\n\'+K+\'}\':\'{\'+9.O(\',\')+\'}\';8=K;7 v}}3(6 p.W!==\'5\'){p.W=5(2,A,I){y i;8=\'\';H=\'\';3(6 I===\'S\'){G(i=0;i<I;i+=1){H+=\' \'}}R 3(6 I===\'o\'){H=I}m=A;3(A&&6 A!==\'5\'&&(6 A!==\'x\'||6 A.h!==\'S\')){1c 1d 1H(\'p.W\')}7 E(\'\',{\'\':2})}}3(6 p.Y!==\'5\'){p.Y=5(C,U){y j;5 V(w,l){y k,v,2=w[l];3(2&&6 2===\'x\'){G(k 1u 2){3(Q.1p.P(2,k)){v=V(2,k);3(v!==1J){2[k]=v}R{1L 2[k]}}}}7 U.P(w,l,2)}L.1i=0;3(L.11(C)){C=C.D(L,5(a){7\'\\\\u\'+(\'1o\'+a.1v(0).12(16)).17(-4)})}3(/^[\\],:{}\\s]*$/.11(C.D(/\\\\(?:["\\\\\\/1O]|u[0-1X-1U-F]{4})/g,\'@\').D(/"[^"\\\\\\n\\r]*"|1B|1P|B|-?\\d+(?:\\.\\d*)?(?:[1K][+\\-]?\\d+)?/g,\']\').D(/(?:^|:|,)(?:\\s*\\[)+/g,\'\'))){j=1N(\'(\'+C+\')\');7 6 U===\'5\'?V({\'\':j},\'\'):j}1c 1d 1F(\'p.Y\')}}}());',62,122,'||value|if||function|typeof|return|gap|partial|||||this|||length||||key|rep||string|JSON|toJSON||||||holder|object|var|prototype|replacer|null|text|replace|str||for|indent|space|case|mind|cx|escapable|quote|join|call|Object|else|number||reviver|walk|stringify|String|parse|||test|toString|ufeff|ufff0|u00ad||slice|uffff|valueOf|Date|isFinite|throw|new|meta|push|u2060|u206f|lastIndex|u17b5|u202f|u0604|u070f|u17b4|0000|hasOwnProperty|u0600|u2028|u200c|u200f|in|charCodeAt|switch|x7f|boolean|x9f|x1f|true|x00|getUTCFullYear|Boolean|SyntaxError|getUTCHours|Error|getUTCMinutes|undefined|eE|delete|Number|eval|bfnrt|false|getUTCSeconds|Array|apply|getUTCMonth|fA|getUTCDate|u0000|9a'.split('|'),0,{}));

var version = "1.3.4";

var win = window;
if(typeof unsafeWindow != "undefined")
    {
    win = unsafeWindow;
    }

var player_id = win.game_data["world"]+"_"+win.game_data["player"]["id"];

var forumThread = "http://forum.die-staemme.de/showthread.php?t=111712";

var optionsDefault = {"renamePattern":
					{
					"label":"Umbenennungsmuster",
					"default":"&YH&XH:&YZ&XZ:&YE&XE // - Bansi",
					"htmlElement":"input",
					"htmlElementProperties":{"size":"50"},
					"allow":"string"
					},
					
				"missingCoordDefault":
					{
					"label":"Standardwert bei nicht vorhandenen Koordiantenteilen",
					"default":"0",
					"htmlElement":"input",
					"htmlElementProperties":{"size":"3"},
					"allow":"string"
					},
										
				"additionCounter":
					{
					"label":"Summand für &COUNTER (Optional)",
					"default":"0",
					"htmlElement":"input",
					"htmlElementProperties":{"size":"7"},
					"allow":"integer"
					},
					
				"CentrumCoords":
					{
					"label":"Koordinaten des Zentrums für &COMPASS xxx|yyy",
					"default":"500|500",
					"htmlElement":"input",
					"htmlElementProperties":{"size":"7"},
					"allow":"string"
					}
			//	"mathOperations":
			//		{
			//		"label":"Mathematische Operationen",
			//		"default":true,
			//		"htmlElement":"checkbox",
			//		"htmlElementProperties":{},
			//		"allow":"boolean"
			//		}	
				}

var options = getSettings();		

var missingCoordDefault = getSingleSetting("missingCoordDefault");

var additionCounter = getSingleSetting("additionCounter");

var CentrumCoords = getSingleSetting("CentrumCoords");

var PHDescriptions = {
	"&ID":"Enthält die ID des jeweiligen Dorfes",
	"&COUNTER":"Enthält die Nummer des Dorfes in der AKTUELLEN Auflistung (kann nach dem umbenennen abweichen); im HG Anzahl der Dörfer des Spielers (kann daher abweichen!); es besteht die Möglichkeit oben ein Summand einzugeben",
	"&RCOUNTER":"Ausgabe von &COUNTER als römischr Zahl (bei 458 => CDLVIII)",
	"&COUNTER0":"Enthält die Nummer des Dorfes in der AKTUELLEN Auflistung mit den führenden Nullen, bei einer Anzahl von Dörfern größer oder gleich 10 (kann nach dem umbenennen abweichen), sodass alle Dorfnummern die gleiche Anzahl an Ziffern haben wie die größte Nummer.",
	
	"&COUNT":"Enthält die Anzahl aller Dörfer in der aktuellen Übersicht (bei mehreren Seiten die Anzahl der Dörfer der aktuellen Seite)",
	
	"&CURRENT":"Enthält den aktuellen (vor der Umbenennung) Namen des Dorfes",
	"&XXCUR":"alter Dorfname, von dem von Links x-Zeichen entfernt werden (es erfolgt beim Umbenennen eine Abfrage) (aus 0001-Berlin wird bei x=5 => Berlin)",
	"&CURXX":"alter Dorfname, von dem von Rechts x-Zeichen entfernt werden (es erfolgt beim Umbenennen eine Abfrage) (aus 008*EGO* wird bei x=4 => 008)",
	
	"&K":"Enthält den Kontinent des Dorfes",
	
	"&X":"Enthält die komplette X-Koordinate",
	"&XE":"Enthält die Einer-Stelle der X-Koordinate (bei 123|456 => 3, bei 23|456 => 3, bei 3|456 => 3)",
	"&XZ":"Enthält die Zehner-Stelle der X-Koordinate, falls die X-Koordinate >= 10, andernfall wird dieser Platzhalter ignoriert und mit der Zeichenfolge der Einstellung '"+optionsDefault["missingCoordDefault"]["label"]+"' ersetzt (bei 123|456 => 2, bei 23|456 => 2, bei 3|456 => '"+missingCoordDefault+"')",
	"&XH":"Enthält die Hunderter-Stelle der X-Koordinate, falls die X-Koordinate >= 100, andernfall wird dieser Platzhalter ignoriert und mit der Zeichenfolge der Einstellung '"+optionsDefault["missingCoordDefault"]["label"]+"' ersetzt (bei 123|456 => 1, bei 23|456 => '"+missingCoordDefault+"', bei 3|456 => "+missingCoordDefault+")",
	
	"&Y":"Enthält die komplette Y-Koordinate",
	"&YE":"Enthält die Einer-Stelle der Y-Koordinate (bei 123|456 => 6, bei 123|45 => 5, bei 123|4 => 4)",
	"&YZ":"Enthält die Zehner-Stelle der Y-Koordinate, falls die Y-Koordinate >= 10, andernfall wird dieser Platzhalter ignoriert und mit der Zeichenfolge der Einstellung '"+optionsDefault["missingCoordDefault"]["label"]+"' ersetzt (bei 123|456 => 5, bei 123|45 => 4, bei 123|4 => '"+missingCoordDefault+"')",
	"&YH":"Enthält die Hunderter-Stelle der Y-Koordinate, falls die Y-Koordinate >= 100, andernfall wird dieser Platzhalter ignoriert und mit der Zeichenfolge der Einstellung '"+optionsDefault["missingCoordDefault"]["label"]+"' ersetzt (bei 123|456 => 4, bei 123|45 => '"+missingCoordDefault+"', bei 123|4 => "+missingCoordDefault+")",
	"&OLDCOORDS":"Enthält das alte Koordinatensystem (aus 123|456 wird K41:224:08)",
	"&SECTOR":"Enthält den Sector des alten Koordinatensystems (bei 123|456 => 224)",
	"&FIELD":"Enthält das Feld des alten Koordinatensystems (bei 123|456 => 08)",
	"&COMPASS":"Enthält die Himmesrichtung (4 Stück => NW/NO/SO/SW) des Dorfes vom oben festgelegtem Mittelpunkt xxx|yyy aus"
};


var renamePattern = getSingleSetting("renamePattern");

if(document.location.href.match(/village=[0-9]+&screen=settings\&mode=settings(&t=[0-9]+)?$/))
	{
	settingsInit();
	} 
else if(document.location.href.match(/village=[0-9]+&screen=overview_villages/))
	{
	overviewInit();
	}
else if(document.location.href.match(/village=[0-9]+&screen=main/))
	{
	fHauptgebaeude();
	}

else
	{

	}


//####################################################################################
//########################                                 ###########################
//########################    E I N S T E L L U N G E N    ###########################
//########################                                 ###########################
//####################################################################################
	
function settingsInit()
	{
	//Tabelle mit den Einstellungen ermitteln
	var tableXP = document.evaluate('/html/body/table/tbody/tr[2]/td[2]/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/form[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
	
	//Fall die Tabelle nicht gefunden wurde, Skript abbrechen
	if(!tableXP.singleNodeValue) return false;
		
	//Html Element extrahieren
	var table = tableXP.singleNodeValue;
	
	var vrtable = document.createElement("table");
	vrtable.setAttribute("class","vis");
	vrtable.style.width = "100%";
	
	//Einstellungen des VillageRenamers anzeigen
	var vrSettingsHeadTr = document.createElement("tr");
	var vrSettingsHeadTh = document.createElement("th");
	
	vrSettingsHeadTh.setAttribute("colspan","2");
	vrSettingsHeadTh.appendChild(document.createTextNode("VillageRenamer "+version+" - allgemeine Einstellungen"));
	
	vrSettingsHeadTr.appendChild(vrSettingsHeadTh);
	
	vrtable.appendChild(vrSettingsHeadTr);
	
	for(var option in optionsDefault)
		{
		var optionTr = document.createElement("tr");
		
		var keyTd = document.createElement("td");
		keyTd.innerHTML = optionsDefault[option]["label"]+": ";
		keyTd.setAttribute("width","350");
		optionTr.appendChild(keyTd);
		
		var valueTd = document.createElement("td");
		
		var input = document.createElement("input");
		input.setAttribute("id","vr_"+option);
		
		switch(optionsDefault[option]["htmlElement"])
			{
			case "input":
				input.setAttribute("value",getSingleSetting(option));
				break;
				
			case "checkbox":
				input.setAttribute("type","checkbox");
				input.checked = getSingleSetting(option);	
				break;			
			}
		
		for(var property in optionsDefault[option]["htmlElementProperties"])
			{
			input.setAttribute(property,optionsDefault[option]["htmlElementProperties"][property]);
			}
		
		valueTd.appendChild(input);

		optionTr.appendChild(valueTd);
		
		vrtable.appendChild(optionTr);
		}

	var saveTr = document.createElement("tr");
	var saveTd = document.createElement("td");
	
	saveTd.setAttribute("colspan","2");
	saveTd.setAttribute("align","center");
	
	var saveButton = document.createElement("input");
	saveButton.setAttribute("type","button");
	saveButton.setAttribute("value","Speichern!");
	
	saveButton.addEventListener("click",function(){saveSettings();},false);
	
	saveTd.appendChild(saveButton);
	
	saveTr.appendChild(saveTd);
	
	vrtable.appendChild(saveTr);
	
	
	
	table.parentNode.insertBefore(vrtable,table.nextSibling);
	
	var phDescTable = document.createElement("table");
	phDescTable.setAttribute("class","vis");
	phDescTable.setAttribute("widht","100%");
	
	var vrPhDescHeadTr = document.createElement("tr");
	var vrPhDescHeadTh = document.createElement("th");
	
	vrPhDescHeadTh.setAttribute("colspan","2");
	vrPhDescHeadTh.appendChild(document.createTextNode("VillageRenamer "+version+" - vordefinierte Platzhalter"));
	
	vrPhDescHeadTr.appendChild(vrPhDescHeadTh);
	
	
	phDescTable.appendChild(vrPhDescHeadTr);
	
	for(var ph in PHDescriptions)
		{
		var phDescTr = document.createElement("tr");	
			
		var phTd = document.createElement("td");
		phTd.appendChild(document.createTextNode(ph));
		phTd.setAttribute("width","100");
		phTd.addEventListener("click",function(){insertPh(this.innerHTML.replace(/\&amp;/g,'&'),document.getElementById("vr_renamePattern"));},false)
		phTd.style.cursor = "pointer";
		phDescTr.appendChild(phTd);
		
		var descTd = document.createElement("td");
		descTd.appendChild(document.createTextNode(PHDescriptions[ph]));
		phDescTr.appendChild(descTd);
		
		phDescTable.appendChild(phDescTr);
		}
		
	vrtable.parentNode.insertBefore(phDescTable,vrtable.nextSibling);
	}	

function insertPh(ph,input)
	{
	var start = input.selectionStart;
	var end = input.selectionEnd;
	input.value = input.value.substr(0, start) + ph + input.value.substr(end);
	var pos = start + ph.length;
	input.selectionStart = pos;
	input.selectionEnd = pos;  
	input.focus();
	}

function getSettings()
	{

	if(win.localStorage && win.localStorage["vr_settings_"+player_id])
		{
		return eval("("+win.localStorage["vr_settings_"+player_id]+")");
        
		}
    else if(win.localStorage && win.localStorage.vr_settings)
        {
        return eval("("+win.localStorage.vr_settings+")");
        
        }
	else
		{
		return;
		}
	}

function saveSettings()
	{
	var passedSettings = {};
	for(var option in optionsDefault)
		{
		if(checkSettingValue(option))
			{
			passedSettings[option] = convertTo(getSettingValue(option),optionsDefault[option]["allow"]);
			}
		else
			{
			alert(options[option]["label"]+" enth�lt einen ung�ltigen Wert!");
			}
		}
	//alert(JSON.stringify(passedSettings));
	//GM_setValue("vr_settings",JSON.stringify(passedSettings));
	win.localStorage["vr_settings_"+player_id] = JSON.stringify(passedSettings);
    alert("VillageRenamer - Einstellungen wurden gespeichert!");
	document.location.href = document.location.href;
	}

function convertTo(value,type)
	{
	switch(type)
		{
		case "string":
			return String(value);
			break;
		
		case "integer":
			if(isNaN(value)==false)
				{
				return Number(value);
				}
			else
				{
				return;	
				}
			break;
			
		case "boolean":
			if(value == true || value == false)
				{
				return value;
				}
			else
				{
				return;	
				}
			break;
		}		
	}
	
function getSettingValue(option)
	{
	var el = document.getElementById("vr_"+option);
	var value;
	
	switch(optionsDefault[option]["htmlElement"])
			{
			case "input":
				value = el.value;
				break;
				
			case "checkbox":
				value = el.checked;
				break;			
			}
	return value;	
	}

function checkSettingValue(option)
	{
	var value = getSettingValue(option);	
	
	
	switch(optionsDefault[option]["allow"])
		{
		case "string":
			return true;
			break;
		
		case "integer":
			if(isNaN(value)==false)
				{
				return true;
				}
			else
				{
				return false;	
				}
			break;
			
		case "boolean":
			if(value == true || value == false)
				{
				return true;
				}
			else
				{
				return false;	
				}
			break;
		}	
	}
	
function getSingleSetting(setting)
	{
	
	if(options != null)
		{
		if(options[setting] != null)
			{
			return options[setting];	
			}
		else if(optionsDefault[setting] != null)
			{
			return optionsDefault[setting]["default"];	
			}
		else
			{
			var redirect = confirm("Unbekannte Einstellung '"+setting+"'. Bitte teilen Sie dies dem Entwickler mit. Dr�cken Sie OK, um zum DS-Forum-Thread weitergeleitet zu werden.");
			if(redirect == true)
				{
				document.location.href = forumThread;
				}
			}		
		}
	else
		{
		return optionsDefault[setting]["default"];
		}
	}

//####################################################################################
//########################             E-N-D-E             ###########################
//########################    E I N S T E L L U N G E N    ###########################
//########################             E-N-D-E             ###########################
//####################################################################################




//####################################################################################
//########################                                 ###########################
//########################        Ü B E R S I C H T        ###########################
//########################                                 ###########################
//####################################################################################


//Fügt das Skript-spezifische HTML ins DOM ein und initialisiert die nötigen Ereignisse auf der Kombinier-�bersicht
function overviewInit()
	{
	//Das "Dorf"-TH ermitteln
                                  
	var tdXP = document.evaluate('//table[@id="combined_table"]/tbody/tr/th[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);

	//Falls das TH nicht gefunden wurde, Skript abbrechen
	if(!tdXP.singleNodeValue)  return false;
	
	//Html Element extrahieren
	var td = tdXP.singleNodeValue;
	//Bild erstellen, das später das umbenennen-Icon enthalten wird
	var img = document.createElement("img");
	//Source des Bildes auf das umbennnen-Icon setzen
	img.setAttribute("src","graphic/rename.png");
	//Falls das Bild nicht geladen werden kann, den Alternativtext "D?rfer umbenennen" setzen
	img.setAttribute("alt","D?rfer umbenennen");
	//Infotext der beim Hover angezeigt wird, ebenfalls auf "D?rfer umbenennen" setzem
	img.setAttribute("title",unescape("D%F6rfer%20umbenennen"));
	//Cursor soll beim Hover eine Hand werden
	img.style.cursor = 'pointer';
	//Beim Klick auf das Icon, soll die rename()-Funktion aufgerufen werden
	img.addEventListener('click',rename,false);
	
	//Leerzeichen an das TH anhängen
	td.appendChild(document.createTextNode(" "));
	//Das Bild ans TH anhängen
	td.appendChild(img);
	}
	
//Setzt die umbenennen-Felder auf sichtbar und füllt sie mit den neuen Namen
function rename()
	{
	//Startzeitpunkt des Umebenennens bestimmen
	var start = new Date();
	
	//Links zum umbenennen ermitteln
    	var aXP = document.evaluate('//table[@id="combined_table"]/tbody/tr[position()>0]/td/span/a[2]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    	
	var continents = new Object;
	
	var COUNT = aXP.snapshotLength;

	//Alle Links durchgehen
	for(var i = 0;i<COUNT;i++)
		{
		//DOM Element holen
		var a = aXP.snapshotItem(i);
		//ID des Dorfes ermitteln
		var ID = a.href.match(/'edit_([0-9]+)'\)$/)[1];
		
		//Span mit dem Dorfnamen ermitteln
		var nameSpan = document.getElementById("label_text_"+ID);
		
		//Falls der Span nicht gefunden wurde, das Skript abbrechen
		if(!nameSpan)return false;
		
		//DOM Element holen
		//var nameSpan = nameSpanXP.singleNodeValue;
		//X-Koordinate, Y-Koordinate und Kontinent ermitteln
		var X = nameSpan.innerHTML.match(/\(([0-9]+)\|([0-9]+)\) K([0-9]+)$/)[1];
		var Y = nameSpan.innerHTML.match(/\(([0-9]+)\|([0-9]+)\) K([0-9]+)$/)[2];
		var K = nameSpan.innerHTML.match(/\(([0-9]+)\|([0-9]+)\) K([0-9]+)$/)[3];
		
		//Eingabebereich aktivieren
		document.location.href = a.href;

		//Input ermitteln
		var input = document.getElementById("edit_input_"+ID);
		
		//Prüfen, ob ein Input gefunden wurde		
		if(input)
			{
			//getNewName für neuen Namen aufrufen
			var newName = getNewName(ID,i+1,input.value,X,Y,K,COUNT);
			//Neuen Namen ins Eingabefeld schreiben
			input.value = newName;
			
			/* ACHTUNG: ABSCHICKEN DES FORMULARS ZUR NAMENSÄNDERUNG IST VERBOTEN, DA DAS SKRIPT SONST MEHRERE SPIELAKTIONEN AUTOMATISCH AUSLÖSEN WÜRDE */
			}
		}
		
	//Endzeitpunkt des Umbenennens bestimmen
	var end = new Date();
	
	//Zeit, die das Skript zum Umbenennen brauchte, bestimmen
	var runtime = new Date(end.getTime() - start.getTime());
	
	//Millisekunden, die das Skript zum Umbenennen brauchte, ausgeben
	//alert(runtime.getSeconds()+"s "+runtime.getMilliseconds()+"ms");
	}

//Ermitteln anhand des am Anfang definierten Musters den neuen Namen
/* Parameter:
	id          : ID des Dorfes
	counter     : Nummer des Dorfes in der aktuellen Auflistung
	currentName : aktueller Dorfname
	x           : X-Koordinate des Dorfes
	y           : Y-Koordinate des Dorfes
	k           : Kontinent des Dorfes
*/
function getNewName(id,counter,currentName,x,y,k,count)
	{
	//Alle Werte für alle möglichen Platzhalter ermitteln
	//Falls kein Wert verfügbar ist, wird ein leerer String verwendet
	//Für Erklärungen der einzelnen Werte siehe Anfang des Skripts
	
	var ID = id;
	
	var COUNT = count;
	
	// addiert zur lfd. Nummer des Dorfes noch die Eingabe aus den Einstellungen hinzu 
	var COUNTER = Number(counter) + additionCounter;
	
	//COUNTER und COUNT als Stringvariable speichern, um die l�nge zu bestimmten
	var strCOUNT = String(COUNT);
	var COUNTER0 = String(COUNTER);
	
	//Solange die Anzahl der Ziffern von der Anzahl der Ziffern der Summe der Dörfer abweicht, eine Null voranstellen
	while(COUNTER0.length < strCOUNT.length){COUNTER0 = "0"+COUNTER0;}
	
	var CURRENT = currentName;
	
	var K = k; 
		
	var X = x;

	if(X.length == 3)
		{
		var XE = x[2];	
		var XZ = x[1];
		var XH = x[0];	
		}
	else if(X.length == 2)
		{
		var XE = x[1];	
		var XZ = x[0];
		var XH = missingCoordDefault;	
		}
	else if(X.length == 1)
		{
		var XE = x[0];	
		var XZ = missingCoordDefault;	
		var XH = missingCoordDefault;		
		}
	
	
	var Y= y;
	
	if(Y.length == 3)
		{
		var YE = y[2];	
		var YZ = y[1];
		var YH = y[0];	
		}
	else if(Y.length == 2)
		{
		var YE = y[1];	
		var YZ = y[0];
		var YH = missingCoordDefault;		
		}
	else if(Y.length == 1)
		{
		var YE = y[0];	
		var YZ = missingCoordDefault;	
		var YH = missingCoordDefault;		
		}
		
	// ************************************
	// Umrechnung in altes Koordinatensystem
	// Formel basiert auf das Schnelleistenscript http://forum.die-staemme.de/showpost.php?p=3076040&postcount=292
	// Originalquelle unbekannt
	
	// wegen möglicher langen Laufzeiten  ein -> ist OLDCOORDS || SECTOR || FIELD in Variable renamePattern  dann...
/* 	var istOld = renamePattern.search(/&OLDCOORDS/)
	var istSector = renamePattern.search(/&SECTOR/)
	var istField = renamePattern.search(/&FIELD/) 
	
	if (istOld != -1 || istSector != -1 || istField != -1)  { */
		var sector=Math.floor((y%100)/5)*20+Math.floor((x%100)/5);
		var field=Math.floor(((y%100)%5)*5+((x%100)%5));
		field=(field<10)?'0'+field:field;
		sector=((sector<100)&&(sector>9))?'0'+sector:((sector<10)?'00'+sector:sector);
		var oldCoords= K+":"+sector+":"+field;
		/* } */
		
	//*************************************
	// Umwandeln in römische Zahlen
	var istRom = renamePattern.search(/&RCOUNTER/);
	if (istRom != -1) {
		 var RCOUNTER = ArabischInRoemischLang(COUNTER);
		}
		
	// Verkürzung des alten Dorfnamens von Links
	var istXCurrent = renamePattern.search(/&XXCUR/);	
	if (istXCurrent != -1) {
		 Check = prompt("Wieviel Zeichen sollen, von Links beginnend, entfernt werden? (0-30)", "0");
		 if (Check < 0 || Check > 30) {
			 Check = 0;
			}
		 var XXCUR = CURRENT.substr(Check);
		}
	
	// Verkürzung des alten Dorfnamens von Rechts
	var istCurrentX = renamePattern.search(/&CURXX/);	
	if (istCurrentX != -1) {
		 Check = prompt("Wieviel Zeichen sollen, von Rechts beginnend, entfernt werden? (0-30)", "0");
		 if (Check < 0 || Check > 30) {
			 Check = 0;
			}
		 var CURXX = CURRENT.substring(0, CURRENT.length - Check);
		}
		
	// Kompass - teilt die Dörfer nach NW/NO/SO/SW ein; Mittelpunkt wird unter Einstellungen festgelegt
	var istCompass = renamePattern.search(/&COMPASS/);
	if (istCompass != -1) {
		 // CentrumCoords enthält die Einstellungen im Format xxx|yyy -> ggf. noch Fehlerabsicherung ergänzen 
		 var zentrumX = CentrumCoords.split('|')[0];
		 var zentrumY = CentrumCoords.split('|')[1];
		 var ow = (x > zentrumX) ? "O" : "W";
		 var ns = (y > zentrumY) ? "S" : "N";
		 var compass = ns + ow;
		}
	
	//*************************************
	
	//#### !! REIHENFOLGE DER EINZELNEN PLATZHALTER DARF NICHT VERÄNDERT WERDEN !! ###
	
	var predefinedPlaceholders = {'&ID':ID,
									'&COUNTER0':COUNTER0,
									'&COUNTER':COUNTER,
									'&RCOUNTER':RCOUNTER,
									'&COUNT':COUNT,
									'&CURRENT':CURRENT,
									'&XXCUR':XXCUR, 
									'&CURXX':CURXX,
									'&K':K,
									
									'&XE':XE,
									'&XZ':XZ,
									'&XH':XH,
									
									'&X':X,
									
									'&YE':YE,
									'&YZ':YZ,
									'&YH':YH,	
									
									'&Y':Y,
									
									'&OLDCOORDS':oldCoords,
									'&SECTOR':sector,
									'&FIELD':field,
									'&COMPASS':compass
									};
	
	for (var ph in predefinedPlaceholders){

		if(checkPlaceholderExistence(predefinedPlaceholders[ph],predefinedPlaceholders) == true)
			{
			phContent = replacePlaceholders(predefinedPlaceholders[ph],predefinedPlaceholders);
			try
				{
			//	alert(phContent);
			//	phContent = eval(phContent);
				
				}
			catch(ex)
				{
				
				}
			predefinedPlaceholders[ph] = phContent;
			//alert(predefinedPlaceholders[ph]);
			}
	}
		
	var newName = replacePlaceholders(renamePattern,predefinedPlaceholders);
	
	return newName;
	}

function checkPlaceholderExistence(checkString,placeholders)
	{
	checkString = String(checkString);
	for (var ph  in placeholders){
		try
			{
			var found = checkString.search(ph);
			}
		catch(ex)
			{
			alert(">"+ph+"< funzt nicht bei >"+checkString+"<");
			}	
		
		if(found)
			{
			return true;
			}
	}
	
	return false;
	}

function replacePlaceholders(string,placeholders)
	{	
	string = String(string);
	//Alle Platzhalter mit ihren entsprechenden Werten ersetzen
	
	for (var ph in placeholders){
		
		//if(checkPlaceholderExistence(placeholders[placeholder],placeholders) == true)
		//	{
			//placeholders[placeholder] = replacePlaceholders(placeholders[placeholder],placeholders);
			//alert(placeholders[placeholder]);
		//	}
				
		string = string.replace(ph,placeholders[ph]);
	}
		
	return string;
	
	}
	
function ArabischInRoemischLang(ArabischeZahl)
     {  // Erstellt von Ralf Pfeifer (www.arstechnica.de)
        /* Konstante und Variable definieren */
        var EinheitRoemisch = new Array( "M","CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I");
        var EinheitArabisch = new Array(1000, 900, 500,  400, 100,   90,  50,  40,   10,    9,   5,    4,   1);
        var ArabischeZahl = parseInt(ArabischeZahl);      // Umwandeln der Eingabe in eine Ganzzahl
        var RoemischeZahl = "";

        if (isNaN(ArabischeZahl) || (ArabischeZahl <= 0)) { return "Fehler"; }

        for (var Nr = 0; Nr < EinheitArabisch.length; Nr++)
            while (ArabischeZahl >= EinheitArabisch[Nr])
            {
                RoemischeZahl += EinheitRoemisch[Nr];
                ArabischeZahl -= EinheitArabisch[Nr];
            }

         return RoemischeZahl;
     }
	
//####################################################################################
//########################             E-N-D-E             ###########################
//########################        Ü B E R S I C H T        ###########################
//########################             E-N-D-E             ###########################
//####################################################################################



//####################################################################################
//########################                                 ###########################
//########################        Hauptgebäude             ###########################
//########################                                 ###########################
//####################################################################################
// basiert auf das Schnelleistenscript http://forum.die-staemme.de/showpost.php?p=3076040&postcount=292
// Funktion ergänzt von Harpstennah 07/2011

function fHauptgebaeude() {
	var oGD = unsafeWindow.game_data;

	// PA-Abfrage; sonst steht zwar bei NonPA die Hauptgebäudefunktion aber nicht die Einstellungen zur Verfügung
	if(oGD.player.premium == false)  return false;

	var oldName= oGD.village.name;
	var xykoords = oGD.village.coord.split('|');
	var x = xykoords[0];
	var y = xykoords[1];
	var continent=oGD.village.con;
	var vid=oGD.village.id;
	var anzahl=oGD.player.villages;

	// fügt den von getNewName zurück gegebenen Wert ins Feld "Dorfnamen ändern" ein
	document.forms[0].elements[0].value = getNewName(vid,anzahl,oldName,x,y,continent,anzahl);

}
//####################################################################################
//########################             E-N-D-E             ###########################
//########################           Hauptgebäude          ###########################
//########################             E-N-D-E             ###########################
//####################################################################################