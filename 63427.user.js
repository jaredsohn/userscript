// ==UserScript==
// @name           Mofamotor-Skript fuer Pennergame v4.0 HH+B
// @author         _thetiger_
// @description    Wechselt vorm Sammeln zum alten Mofamotor und danach wieder zurueck.
// @include        http://*pennergame.de/activities/bottle/*
// @include	   http://*pennergame.de/activities/*
// @exclude	   http://*pennergame.de/activities/crime/*
// ==/UserScript==

//****************************************************************************************************************************
// Wie man sehen kann, ist dieses Skript sehr verschachtelt, das liegt einfach daran, dass alle Eventualitäten wie das
// Danebenklicken beim Captcha, das auftreten eines Serverfehlers, das Nichtvorhandensein des Mofamotors usw. abgedeckt
// sein sollen. Die GM_setValue bzw. GM_getValue - Funktion braucht man nur zum Übergeben des alten Plunders an die Seite,
// wenn das Sammeln gestartet wurde, schließlich muss das Skript die Action-Nummern des alten Plunders frisch herauslesen.
//****************************************************************************************************************************

//Basislinks
var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")!=-1) {var basisurl = "http://berlin.pennergame.de"};
if (url.indexOf("http://www.berlin.pennergame")!=-1) {var basisurl = "http://www.berlin.pennergame.de"};
if (url.indexOf("http://pennergame")!=-1) {var basisurl = "http://pennergame.de"};
if (url.indexOf("http://www.pennergame")!=-1) {var basisurl = "http://www.pennergame.de"};

//Ladeanzeiger erstellen, aber zunächst ausgeblendet lassen
ladeanzelement = document.createElement("div");
ladeanzelement.setAttribute("style", "position:absolute;top:130px;left:200px;z-index:100;display:none;background-color:black;font-size:20pt;padding:8px;-moz-border-radius:12px;");
ladeanzelement.setAttribute("align", "left");
ladeanzelement.setAttribute("id", "ladeanzeiger");
ladeanzelement.innerHTML = '<p><span id="teil1" style="color:white;">&nbsp;</span><span id="teil2" style="color:white;">...<br></span><span id="teil3" style="color:red;"><img src="http://file1.npage.de/001730/84/bilder/ajax-loader.gif" alt=""><br>Bitte nicht unterbrechen!</span></p>';
document.getElementsByTagName("body")[0].appendChild(ladeanzelement);

var ladeanzeiger = document.getElementById("ladeanzeiger"); //Ladeanzeiger-Element als Variable für späteres Aus- und Einblenden

var skriptversion = "1.3";

var mofamotorvorhanden;
var mofamotorangelegt;
var plunderbody;

var sammelbutton = document.getElementsByClassName("button_skill")[0];

// Aktuelles Tagesdatum erzeugen und formatieren
	var heute = new Date();
        var datumsarray = [heute.getDate(),heute.getMonth() + 1,heute.getFullYear()];
        var datum = datumsarray.join(".");
	// Wenn heute noch nicht nach einem Skript-Update gesucht wurde
	if (GM_getValue("letztesUpdate","") != datum) {
		// Abrufen der Skriptseite von userscripts.org
		GM_xmlhttpRequest({
			method: 'GET',
			url: "http://userscripts.org/scripts/show/63427",
			onload: function(responseDetails) {
				var body = responseDetails.responseText;
                                var updateteil = body.split('Aktuelle Version: ')[1];
				var update = updateteil.split(' (wird laufend weiterentwickelt)')[0];
				if (update != skriptversion) {
                                        alert("Es ist eine neuere Version des Mofamotor-Skriptes vorhanden!\n\nNach dem Installieren unbedingt das alte Skript über Extras - Greasemonkey - Benutzerskripte verwalten deinstallieren!");
					window.location.href = 'http://userscripts.org/scripts/source/63427.user.js';
				}
			}
		});

		// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgeführt)
		GM_setValue("letztesUpdate", datum)
	}

	var fehlermofamotor = "Ein Fehler ist beim Anlegen des Mofamotors passiert, soll das Skript erneut versuchen, ihn anzulegen?\nWenn Sie auf Abbrechen klicken, werden Sie auf die Plunderseite weitergeleitet um den Plunder manuell zu wechseln."
        var fehleralterplunder = "Ein Fehler ist beim Zurueckwechseln zum alten Plunder passiert, soll das Skript erneut versuchen, den Plunder zurueckzuwechseln?\nWenn Sie auf Abbrechen klicken, werden Sie auf die Plunderseite weitergeleitet, um den alten Plunder manuell wiederanzulegen."
	function fehleranzeige(ort,text,funktion) {
                var nochmal = confirm(text);
                if (nochmal) {    //Wenn es manuell probiert werden soll
                   	funktion();
                } else {
                	location.href=basisurl+ort;
                }
        }


    	var abfrage = "Frage Daten ab";
        var mofamotorabfrage = "<nobr>Lege alten Mofamotor</nobr><br>an"
        var plunderabfrage = "<nobr>Lege alten Plunder wie-</nobr><br>der an, bitte warten";
        var teil1 = document.getElementById("teil1");

        function anzeige(eins) {                 //Eine Funktion, die die passende Ladeanzeige einblendet
                teil1.innerHTML = eins;
                ladeanzeiger.style.display="block";
        }

        function anzeigebeend() {          //hierdurch wird die Funktion wieder beendet, die Ladeanzeige ausgeblendet
                ladeanzeiger.style.display="none";
        }

//Request ob Mofamotor vorhanden
var alterplunder = GM_getValue("alterplunder");
if (alterplunder!=null) { //Wenn man sammeln grade gestartet hat
        if (sammelbutton.value=="Abbrechen") { //Wenn alles geklappt hat
                anzeige(plunderabfrage);
                GM_deleteValue("alterplunder");
	        var alterplunderid;
	        var idzumsenden;
                //Funktion, um Actionnummer des alten Plunders herauszulesen
                GM_xmlhttpRequest({
	                method: 'GET',
	                url: basisurl+'/stock/plunder/',
	                onload: function(responseDetails)
	                        {
	                        var reg = /\d{5,10}/m;
	                        var plunderbody = responseDetails.responseText;
	                        alterplunderid = reg.exec(plunderbody.substring(plunderbody.indexOf(">"+alterplunder+"<")-20,plunderbody.indexOf(">"+alterplunder+"<")));
	                        idzumsenden = alterplunderid[0].toString();
                                anzeigebeend();
                                wechsel2();
	                        }
	        });
                //Funktion, die den alten Plunder wieder anlegt
                function wechsel2() {
                        anzeige(plunderabfrage);
                        GM_xmlhttpRequest({
	                        method: 'POST',
	                        url: basisurl+'/stock/plunder/change/',
	                        headers: {'Content-type': 'application/x-www-form-urlencoded'},
	                        data: encodeURI('f_plunder='+idzumsenden+''),
	                        onload: function(responseDetails)
                                        {
                                        anzeigebeend();
                                        if(responseDetails.responseText.indexOf('alt=" " /> '+alterplunder+'</h4>')==-1) {
                                        	fehleranzeige("/stock/plunder/",fehleralterplunder,wechsel2);
                                        }
	                                },
                                onerror: function(response)
                                	{
                                        anzeigebeend();
                                        fehleranzeige("/stock/plunder/",fehleralterplunder,wechsel2);
                                        }
	                });
	        }
        } else {  //Wenn ein Fehler aufgetreten ist, z.B. im Captcha danebengeklickt wurde
                alert("Wenn beim Sammeln etwas nicht geklappt hat, bitte einfach erneut starten, der Mofamotor ist bereits angelegt!");
        }
} else { //Wenn das Sammeln nicht gestartet wurde
        if (sammelbutton.value!="Abbrechen") {  //Wenn man noch nicht sammelt
	     var plunderbody;
             anzeige(abfrage);
	     GM_xmlhttpRequest({
	     method: 'GET',
	     url: basisurl+'/stock/plunder/',
	     onload: function(responseDetails)
	             {
	             plunderbody = responseDetails.responseText;
	             mofamotorvorhanden = plunderbody.indexOf("Alter Mofamotor");
	             mofamotorangelegt = plunderbody.indexOf('alt=" " /> Alter Mofamotor</h4>');
                     anzeigebeend();
                     haupt();
	             }
	     });
	     function haupt() {
	             if (mofamotorvorhanden!=-1) { //Wenn Mofamotor vorhanden ist
	                     if (mofamotorangelegt==-1) {  //Wenn er nicht angelegt ist

                                     //ursprünglichen Sammelbutton ausblenden
                                     sammelbutton.style.display="none";
                                     //Neuen Button erstellen
                                     sammelbutton.parentNode.innerHTML += "<input id='sammelbuttonneu' type='button' value='Sammeln gehen'>"

                                     //PlunderID sowie alten Plunder in Erfahrung bringen
                                     var reg2 = /\d{5,10}/m;
                                     var mofaid = reg2.exec(plunderbody.substring(plunderbody.indexOf("Alter Mofamotor")-20,plunderbody.indexOf("Alter Mofamotor")));
                                     var mofaidzumsenden = mofaid[0].toString();
                                     var alterplunder = plunderbody.substring(plunderbody.indexOf('alt=" " /> ')+11,plunderbody.indexOf("</h4>"));

                                     //Funktion, die den Mofamotor anlegt
                                     function plunderwechsel() {
                                             anzeige(mofamotorabfrage);
                                             GM_xmlhttpRequest({
                                                     method: 'POST',
                                                     url: basisurl+'/stock/plunder/change/',
                                                     headers: {'Content-type': 'application/x-www-form-urlencoded'},
                                                     data: encodeURI('f_plunder='+mofaidzumsenden+''),
                                                     onload: function(responseDetails)
                                                             {
                                                             anzeigebeend();
                                                             if(responseDetails.responseText.indexOf('alt=" " /> Alter Mofamotor</h4>')>=0) {
                                                                     GM_setValue("alterplunder",alterplunder);
                                                                     document.getElementsByClassName("button_skill")[0].click();
                                                             } else {
                                                                     fehleranzeige("/stock/plunder/",fehlermofamotor,plunderwechsel);
                                                             }
                                                             },
                                                     onerror: function(response) {
                                                             anzeigebeend();
                                                             fehleranzeige("/stock/plunder/",fehlermofamotor,plunderwechsel);
                                                     }
                                             });
                                     }

                                     //Bei Klick auf Sammeln gehen soll die Plunderwechselfunktion starten
                                     var button = document.getElementById("sammelbuttonneu");
                                     button.addEventListener('click',plunderwechsel,false);


	                     } else {//Wenn der Mofamotor bereits angelegt ist
                             	     //Meldung, dass er bereits angelegt ist
                                     sammelbutton.parentNode.innerHTML += '<p style="color:white;font-size:13pt;font-weight:bold;">Du hast den alten Mofamotor bereits angelegt!</p>'
                             }

	             } else {      //Wenn Mofamotor nicht vorhanden ist
                     	    //Meldung, dass der Mofamotor nicht vorhanden ist
	                    sammelbutton.parentNode.innerHTML += '<p style="color:white;font-size:13pt;font-weight:bold;">Du besitzt leider den alten Mofamotor nicht, deswegen funktioniert das Skript hier nicht!</p>'
	             }
	     }
        }
}