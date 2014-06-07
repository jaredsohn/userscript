// ==UserScript==
// @name	 Updatescript
// @description	 Update the Close PopUp Advertising script
// @include      *
// ==/UserScript==


var alteversion = "1.0";
var skriptversion = "2.0";
var skriptid = "61108";

//Infomeldung ueber neue Updates zeigen
var infoneueversion = "Hallo, Ich habe wieder ein paar Bugs gefixt und neue Seiten hinzugefügt!
Hello, I've fixed some bugs and add new sites!";
if(!GM_getValue("infogezeigt"+skriptversion,false)) {GM_setValue("infogezeigt"+skriptversion,true);GM_deleteValue("infogezeigt"+alteversion);alert(infoneueversion);}

var heute = new Date();
var datumsarray = [heute.getDate(),heute.getMonth() + 1,heute.getFullYear()];
var datum = datumsarray.join(".");

// Wenn heute noch nicht nach einem Skript-Update gesucht wurde
if (GM_getValue("letztesUpdate","") != datum) {
				// Abrufen der Skriptseite von userscripts.org
				GM_xmlhttpRequest({
								method: 'GET',
								url: "http://userscripts.org/scripts/show/"+skriptid,
								onload: function(responseDetails) {
												if(responseDetails.status == 200) {
																var body = responseDetails.responseText;
                        				var updateteil = body.split('Aktuelle Version: ')[1];
																var update = updateteil.split(' (')[0];
																if (update != skriptversion) {
																				window.open("http://userscripts.org/scripts/show/"+skriptid, '_blank');
                        								alert("Es ist eine neuere Version des Close PopUp Advertising Scripts vorhanden!\n\There is a new version of the Close PopUp Advertising script!");
																				window.location.href = 'http://userscripts.org/scripts/source/'+skriptid+'.user.js';
																}
												}
								}
				});

				// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgefuehrt)
				GM_setValue("letztesUpdate", datum)
}

// Copyright by flo1994