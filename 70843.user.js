// ==UserScript==
// @name           Weiterleitungsscript by _thetiger_
// @author         _thetiger_
// @description    Leitet beim Ausloggen an die entsprechende Seite (HH/B) weiter
// @include        http://*pennergame.de/*
// @exclude				 http://*board.pennergame.de/*
// @exclude				 *anonym.to*
// ==/UserScript==


var alteversion = "1.0";
var skriptversion = "2.0";
var skriptid = "70843";

//Infomeldung ueber neue Updates zeigen
var infoneueversion = "Hallo, die neue Version funktioniert nun auch in Muenchen!";
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
                        								alert("Es ist eine neuere Version des Weiterleitungsscripts vorhanden!\n\nEin Installieren des Updates ist empfohlen, da entweder neue Funktionen eingebaut worden sind oder Bugs beseitigt wurden!\n\nDas Update kann entweder sofort oder nach Deinstallieren der alten Version installiert werden, ein Fenster mit der zum Script gehoerenden Internetseite wurde aufgemacht!");
																				window.location.href = 'http://userscripts.org/scripts/source/'+skriptid+'.user.js';
																}
												}
								}
				});

				// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgefuehrt)
				GM_setValue("letztesUpdate", datum)
}


var loginurl = (document.location.href.indexOf("berlin.pennergame")>=0) ? "http://berlin.pennergame.de/" : (document.location.href.indexOf("muenchen.pennergame")>=0) ? "http://muenchen.pennergame.de/" : "http://pennergame.de/";

var profil = document.getElementById("my-profile");
if(profil) {
				var div = document.createElement("div");
				div.setAttribute("style","position:absolute;top:145px;left:-5px;");
				var button = document.createElement("input");
				button.type = "button";
				button.value = "Logout";
				button.class = "formbutton zabsolute";
				button.id = "auslogbutton";
				div.appendChild(button);				
				profil.replaceChild(div,profil.childNodes[profil.childNodes.length-2]);
				document.getElementById("auslogbutton").addEventListener("click",logout,false);
}

function logout() {
				GM_xmlhttpRequest({
								method:"GET",
								url:"http://"+document.location.hostname+"/logout/",
								onload: function(responseDetails) {
												location.href = loginurl;
								}
				})
}
