// ==UserScript==
// @name           Pennermenue by _thetiger_
// @author         _thetiger_
// @description    Bietet ein schickes Pennermenue, das einen hohen Funktionsumfang bietet.
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*menelgame.pl*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*bumrise.com*
// @exclude				 http://*/logout*
// @exclude				 http://*board.pennergame.de/*
// @exclude				 *anonym.to*
// @version				 1.1.1
// @version				 1.1
// @version				 1.0
// ==/UserScript==

var skriptversion = "1.1.1";
var skriptid = "69846";

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
																var update = updateteil.split(' (wird laufend weiterentwickelt)')[0];
																if (update != skriptversion) {
																				window.open("http://userscripts.org/scripts/show/"+skriptid, '_blank');
                        								alert("Es ist eine neuere Version des Pennermenues vorhanden!\n\nEin Installieren des Updates ist empfohlen, da entweder neue Funktionen eingebaut worden sind oder Bugs beseitigt wurden!\n\nDas Update kann entweder sofort oder nach Deinstallieren der alten Version installiert werden, ein Fenster mit der zum Script gehoerenden Internetseite wurde aufgemacht!");
																				window.location.href = 'http://userscripts.org/scripts/source/'+skriptid+'.user.js';
																}
												}
								}
				});

				// Setze den Parameter auf das aktuelle Datum (Updatesuche wurde ausgefuehrt)
				GM_setValue("letztesUpdate", datum)
}

var id;
var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/de_DE/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "hh";
}
if (url.indexOf("berlin")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/bl_DE/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "b";
}
if (url.indexOf("menelgame")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/pl_PL/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "mg";
}
if (url.indexOf("clodogame")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/fr_FR/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "cg";
}
if (url.indexOf("mendigogame")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/es_ES/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "mdg";
}
if (url.indexOf("serserionline")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/tr_TR/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "so";
}
if (url.indexOf("bumrise")>=0) {
id = document.getElementsByTagName("body")[0].innerHTML.split('<div class="zleft"><img class="avatar" alt="Avatar" title="1" src="http://inodes.pennergame.de/us_EN/avatare/')[1].split('_small')[0];
var stadtbuchstabe = "bu";
}

if(id!=null) {
				hauptfunktion();
}


function hauptfunktion() {

//Basislinks
var basisurl = "http://"+document.location.hostname;

var plunderbody="";

var ladebalken_url = "http://file1.npage.de/001730/84/bilder/ajax-loader2.gif";
var biericon_url = "http://file1.npage.de/001730/84/bilder/bier.png";
var hamburgericon_url = "http://file1.npage.de/001730/84/bilder/brot.png";
var buerstenicon_url = "http://file1.npage.de/001730/84/bilder/buerste.png";
var weiterbildungsicon_url = "http://file1.npage.de/001730/84/bilder/weiterbildung.png";
var geldicon_url = "http://file1.npage.de/001730/84/bilder/geld.png";
var suchenicon_url = "http://file1.npage.de/001730/84/bilder/suchen.png";
var lockfuttericon_url = "http://file1.npage.de/001730/84/bilder/lockfutter.png";
var schreibenicon_url = "http://file1.npage.de/001730/84/bilder/schreiben.png";
var wutaktivicon_url = "http://file1.npage.de/001730/84/bilder/wutaktiv.png";
var wutinaktivicon_url = "http://file1.npage.de/001730/84/bilder/wutinaktiv.png";
var einbkaktivicon_url = "http://file1.npage.de/001730/84/bilder/bandenkampf.png";
var bkaktivicon_url = "http://file1.npage.de/001730/84/bilder/bandenkaempfe.png";
var bkinaktivicon_url = "http://file1.npage.de/001730/84/bilder/keinebandenkaempfe.png";
var transparenz_url = "http://file1.npage.de/001730/84/bilder/transparenz.gif";
var abgedunkelt_url = "http://file1.npage.de/001730/84/bilder/abgedunkelt3.png";
var abgedunkelt = new Image();
abgedunkelt.src = abgedunkelt_url;
var reload_url = "http://file1.npage.de/001730/84/bilder/reload.png";
var reloadbild = new Image();
reloadbild.src = reload_url;
var reloaddrehen_url = "http://file1.npage.de/001730/84/bilder/reload2.gif";
var reloaddrehen = new Image();
reloaddrehen.src = reloaddrehen_url;

var fkt_suche_beschriftung = "Zu suchender Pennername";
var fkt_weiterbildung_beschriftung = "Die Weiterbildungsprozedur wird durchgef&uuml;hrt, bitte warten!";

var abstand = GM_getValue("abstand", false)
if (isNaN(parseInt(abstand))) {
				GM_setValue("abstand", "500")
				abstand = "500";
}

var wutwarner = GM_getValue("wutwarner"+id+stadtbuchstabe, true);
var bandenkampfwarner = GM_getValue("bandenkampfwarner"+id+stadtbuchstabe, true);

var angplurl;
var angpltitel;
var maxanzplunder = 8;
var maxanzbuttons = 8;

//Fight-Variablen
var FIGHT_eintreffend = false;
var FIGHT_anzahl;
var kampftext = "Lade Angriffswarner...";
//Abfrage-Variablen
var PL_abfrage_OK = false;
var FIGHT_abfrage_OK = false;

//Diese Variablen werden fuer die Kommunikation zwischen der Weiterbildungsk-Funktion und der Trinken-Funktion benoetigt
var wbplunder = GM_getValue("wbplunder"+id+stadtbuchstabe,false);
var promille_OK;
var wbplunder_OK;

var promillegrenze = formatzahl(GM_getValue("promillegrenze"+id+stadtbuchstabe,false));
if(isNaN(promillegrenze)) {
				promillegrenze = 3.15
}

//Variablen fuer Linkbeschriftungen + Adressen erstellen
var link1adresse = GM_getValue("link1adresse"+id+stadtbuchstabe, basisurl + "/stock/plunder/");
var link1beschr = GM_getValue("link1beschr"+id+stadtbuchstabe, "Zur Plunderseite");
var link2adresse = GM_getValue("link2adresse"+id+stadtbuchstabe, basisurl + "/city/weapon_store/");
var link2beschr = GM_getValue("link2beschr"+id+stadtbuchstabe, "Zum Waffenladen");
var link3adresse = GM_getValue("link3adresse"+id+stadtbuchstabe, basisurl + "/gang/credit/");
var link3beschr = GM_getValue("link3beschr"+id+stadtbuchstabe, "Zur Bandenkasse");

//In diesem Array werden die Infos zu jedem verfuegbaren Button gespeichert
var button = new Array();
button[0] = new buttonserst("waschen","Waschen","<td><img src='"+buerstenicon_url+"' style='cursor:pointer' title='Waschen - Sauberkeit auf 100% erh&ouml;hen' id='waschen'></td>", false);
button[1] = new buttonserst("einzahlen", "Einzahlen", "<td><img src='"+geldicon_url+"' style='cursor:pointer' title='Eine Einzahlung in die Bandenkasse machen' id='einzahlen'></td>", false);
button[2] = new buttonserst("weiterbilden","Weiterbilden","<td><img src='"+weiterbildungsicon_url+"' style='cursor:pointer' title='Eine Weiterbildung starten' id='weiterbilden'></td>", false);
button[3] = new buttonserst("essen", "Ern&uuml;chtern", "<td><img src='"+hamburgericon_url+"' style='cursor:pointer' title='Essen gehen - Promille fallen auf unter 0,75' id='essen'></td>", false);
button[4] = new buttonserst("suchen", "Spieler suchen", "<td><img src='"+suchenicon_url+"' style='cursor:pointer' title='Spieler suchen' id='suchen'></td>", false);
button[5] = new buttonserst("lockfutter", "Lockfutter kaufen", "<td><img src='"+lockfuttericon_url+"' style='cursor:pointer' title='Lockfutter als Geldvorrat kaufen' id='lockfutter'></td>", false);
button[6] = new buttonserst("trinken", "Besaufen", "<td><img src='"+biericon_url+"' style='cursor:pointer' title='Trinken gehen - Promille steigen' id='trinken'></td>", false);
button[7] = new buttonserst("schreiben", "Direkt-Shoutbox-Poster", "<td><img src='"+schreibenicon_url+"' style='cursor:pointer' title='Eine Nachricht in die Shoutbox posten' id='schreiben'></td>", false);

//Sind die Einstellungen schon einmal gesetzt worden?
var einstgesetzt = GM_getValue("einstgesetzt"+id+stadtbuchstabe, false);

//Neues Array erstellen, in dem der HTML-Code jedes angezeigten Plunders gespeicher ist
var anzpltext = new Array();
for(var i=0; i<=(maxanzplunder-1); i++) {
        anzpltext[i] = "";
}

//In diesem Array wird der HTML-Code jedes angezeigten Buttons gespeichert
var speicherbuttonstext = new Array();
for(var i=0;i<=maxanzbuttons-1;i++) {
				speicherbuttonstext[i] = "";
}

//Wenn die Einstellungen bereits mindestens ein Mal gespeichert wurden
if(einstgesetzt) {
        //Neues Array, in dem die IDs der angezeigten Plunder gespeichert werden
				var anzplid = new Array();
				for(var i=0; i<=(maxanzplunder-1); i++) {
				        anzplid[i] = GM_getValue("plunder"+(i+1)+id+stadtbuchstabe, false);
				}

        //In diesem Array werden die IDs der angezeigten Buttons gespeichert
				var speicherbuttons = new Array();
				for(var i=0;i<=maxanzbuttons-1;i++) {
								speicherbuttons[i] = GM_getValue("button"+i+id+stadtbuchstabe,false);
				}

				speicherbuttons.forEach(speicherbuttonsdef);
//Wenn die Einstellungen noch nie gespeichert wurden
} else {
				var anzplid = new Array();
				for(var i=0; i<=(maxanzplunder-1); i++) {
				        anzplid[i] = "";
				}

				alert("Da Sie das Skript das erste Mal benutzen, stellen Sie bitte in den Einstellungen die anzuzeigenden Plunder und Buttons ein, die Sie dann per Klick anlegen/ausfuehren koennen!");
				anzpltext[0] = "<td>&nbsp;</td>";
				speicherbuttonstext[0] = "<td>&nbsp;</td>";
}

//***********************************************************************************************************************************************
//***********************Plunder-Einstellungen definieren****************************************************************************************
//***********************************************************************************************************************************************

//Plunder-Array erstellen
var plunder = new Array();

//Mit diesem regulaeren Ausdruck kann man die Actionnummern eines Plunders herausfinden
var reg = /\d{5,10}/m;

//Mit dieser Funktion werden die Plunder-Objekte erstellt
function plunderst(titel,id,nr,bildurl,ausgewaehlt,anzulegen,benutzen,anzahl) {
				this.titel = titel;
				this.id = id;
				this.nr = nr;
				this.bildurl = bildurl;
				this.ausgewaehlt = ausgewaehlt;
				this.anzulegen = anzulegen;
				this.benutzen = benutzen;
				this.anzahl = anzahl;
				this.wechsel = wechsel;

				function wechsel() {
								//Wenn der angeklickte Plunder bereits angelegt ist
								if(angplurl == bildurl) {
												//Wenn die Anzahl der verfuegbaren Plunder groesser 1 ist, und man den Plunder benutzen kann
												if((anzahl>1)&&benutzen) {
																if(confirm("Soll der Plunder wirklich benutzt werden?")) {
																				location.href = basisurl + "/stock/plunder/use/"+nr+"/";
																}
												//Der Plunder ist nicht zu benutzen oder es gibt nur noch einen (Dieser ist dann bereits angelegt)
												} else {
																alert("Dieser Plunder ist bereits angelegt!");
							          }
								} else {
												//Wenn man den Plunder entweder anlegen oder benutzen kann
												if (benutzen && anzulegen) {
																if(confirm("Bei Klick auf OK wird der Plunder angelegt, bei Abbrechen benutzt!")) {
																				planlegen();
																} else {
																				if(anzahl>1) {
																								location.href = basisurl + "/stock/plunder/use/"+nr+"/";
																				//Wenn nur noch ein Plunder vorhanden ist, soll eine spezielle Sicherheitsabfrage gestartet werden
																				} else {
																								if(confirm("Dies ist dein letzter Plunder dieses Typs, soll er dennoch benutzt werden?")) {
																												location.href = basisurl + "/stock/plunder/use/"+nr+"/";
																								}
																				}
																}
												}
												//Wenn er nur anzulegen ist
												if(anzulegen && !benutzen) {
																planlegen();
												}
												//Wenn er nur zu benutzen ist
												if(!anzulegen && benutzen) {
																if(anzahl>1) {
																				if(confirm("Soll der Plunder wirklich benutzt werden?")) {
																								location.href = basisurl + "/stock/plunder/use/"+nr+"/";
																				}
																//Wenn nur noch ein Plunder vorhanden ist, soll eine spezielle Sicherheitsabfrage gestartet werden
																} else {
																				if(confirm("Dies ist dein letzter Plunder dieses Typs, soll er dennoch benutzt werden?")) {
																								location.href = basisurl + "/stock/plunder/use/"+nr+"/";
																				}
																}
												}
	      				}

								//Diese Funktion legt einen angeklickten Plunder an
								function planlegen() {
												ladeanzeiger("Der gew&auml;hlte Plunder wird angelegt, bitte warten");
                	      GM_xmlhttpRequest({
	                              method: 'POST',
	                              url: basisurl+'/stock/plunder/change/',
	                              headers: {'Content-type': 'application/x-www-form-urlencoded'},
	                              data: encodeURI('f_plunder='+nr+''),
	                              onload: function(responseDetails) {
                                        if(responseDetails.responseText.indexOf("<h3>Angelegt</h3>")>=0) {
	                                              if(responseDetails.responseText.indexOf('alt=" " /> '+titel+'</h4>')>=0) {
	                                                      location.href = location.href;
	                                              } else {
	                                                      fehlerabfrage();
	                                              }
	                                      } else {
	                                              fehlerabfrage();
	                                      }
	                              },
	                              onerror: function(responseDetails) {
	                              				fehlerabfrage();
	                              }
	                      });

												function fehlerabfrage() {
	                      				if(confirm("Beim Anlegen des neuen Plunders ist anscheinend etwas schiefgegangen, soll es erneut versucht werden?")) {
	                                      ladeanzeiger();
	                                    	planlegen();
	                              } else {
	                                    	location.href = location.href;
	                              }
	                      }
	      				}
				}
}

function versuch(string) {
				var angelegter = string.substring(string.indexOf('" alt=" " /> ')+13,string.indexOf("</h4>"));
				var teilstrings = string.split(/<tr class="even ztip trhover">|<tr class="odd ztip trhover">/g);
				for(var i=1;i<=teilstrings.length-1;i++) {
								var plundername = teilstrings[i].split(/'\)">/)[1].split("</a>")[0];
								var nr = teilstrings[i].split("change_stuff('")[1].split("')")[0];
								var bildurl = teilstrings[i].split('img src="')[1].split('" class')[0];
								var id = plundername.replace(/\W/g,"");
								var benutzen = /icon_use\.png/m.test(teilstrings[i]);
								var anlegen = /icon_equip\.png/m.test(teilstrings[i]);
								var anzahl = parseInt(teilstrings[i].split('<td class="col3">')[1].split(" S")[0]);
								if(angelegter == plundername) {
												anzahl += 1;
								}
								plunder[i-1] = new plunderst (plundername,id,nr,bildurl,anzplid.some(istgewaehlt),anlegen,benutzen,anzahl);
				}

				if(string.indexOf(">"+angelegter+"<")<0) {
								var bildurl = string.substring(string.indexOf('" alt=" " /> ')-100,string.indexOf('" alt=" " /> ')).split('src="')[1];
								var plundername = string.substring(string.indexOf('" alt=" " /> ')+13,string.indexOf("</h4>"));
								var id = plundername.replace(/\W/g,"");
								var anlegen = false;
								var benutzen = false;
								var anzahl = 1;
								plunder.push(new plunderst (plundername,id,"",bildurl,anzplid.some(istgewaehlt),anlegen,benutzen,anzahl));
				}

				function istgewaehlt(element,index,array) {
								if(element==id) {
												if((anlegen && benutzen) || (!anlegen && !benutzen)) {
																anzpltext[index]="<img style='cursor:pointer;' src='"+bildurl+"' title='"+plundername+" anlegen oder benutzen (Verf&uuml;gbare Menge: "+anzahl+")' id='"+id+"'>";
												} else {
																if (anlegen) {
																				anzpltext[index]="<img style='cursor:pointer;' src='"+bildurl+"' title='"+plundername+" anlegen (Verf&uuml;gbare Menge: "+anzahl+")' id='"+id+"'>";
																} else {
																				if(benutzen) {
																								anzpltext[index]="<img style='cursor:pointer;' src='"+bildurl+"' title='"+plundername+" benutzen (Verf&uuml;gbare Menge: "+anzahl+")' id='"+id+"'>";
																				}
																}
												}

												return true;
								}
				}
}
//#################################################################################################################################################
//#################################################################################################################################################

//****************************************************************************************************************************************************
//*********************************Button-Einstellungen definieren************************************************************************************
//****************************************************************************************************************************************************
var aktuellerbutton;
var aktuellerbuttonnr = 0;

function speicherbuttonsdef(element,index,array) {
				if(element) {
								aktuellerbutton = element;
								aktuellerbuttonnr = index;
								button.forEach(speicherbuttonsdefzwei);
				}
}

//Diese Funktion speichert fuer jeden ausgewaehlten Button den HTML-Code
function speicherbuttonsdefzwei(element,index,array) {
				if (aktuellerbutton == element.id) {
								element.ausgewaehlt = true;
								speicherbuttonstext[aktuellerbuttonnr] = element.code;
				}
}


//Button-Konstruktor
function buttonserst(id,titel,code,ausgewaehlt)  {
				this.id = id;
				this.titel = titel;
				this.code = code;
				this.ausgewaehlt = ausgewaehlt;
}

function buttonaktion(evt) {
				eval(this.id+"fkt("+evt.pageX+","+evt.pageY+")");
}

//#################################################################################################################################################
//#################################################################################################################################################

plunderseitenabfrage();
kampfseitenabfrage();

//**************************************************************************************************************************************************
//***********************Die Funktionen, die Beim Druck auf die verschiedenen Buttons ausgefuehrt werden********************************************
//**************************************************************************************************************************************************
function einzahlenfkt(posx,posy) {
				var kassenlayer = document.getElementById("kassenlayer");
				if(!kassenlayer) {
								var div = document.createElement("div");
								div.innerHTML="<table width='100%' height='100%' id='kassentabelle' cellspacing='0' border='0' cellpadding='0'><tr><td width='30%'>Betrag</td><td>Kommentar</td></tr><tr><td><input style='margin-top: 3px;padding: 1px 2px 1px 3px;text-align: left;font: 12px Arial, Helvetica, Verdana, sans-serif;border: 1px solid #000;color: #e5e5e5;background: #54514d;overflow: visible; width: auto;' type='text' size='5' id='betrag_kasse'>&euro;</td><td><input style='margin-top: 3px;padding: 1px 2px 1px 3px;text-align: left;font: 12px Arial, Helvetica, Verdana, sans-serif;border: 1px solid #000;color: #e5e5e5;background: #54514d;overflow: visible; width: auto;' type='text' size='20' id='kommentar_kasse'></td></tr></form><tr><td align='center' colspan='2'><form method='post' style='display:none' action='/gang/cash/add/'><input name='f_money' type='hidden' id='f_money' size='10'><input name='f_comment' id='f_comment' type='hidden' value=''><input type='submit' name='Submit' value='Einzahlen' id='echtereinzahlbutton'></form><input type='button' value='Einzahlen' id='einzahlbutton'></td></tr></table>";
								div.setAttribute("style","display:block;position:absolute;top:"+(posy-5)+"px;left:"+(posx-5)+"px;background-color:red;color:black;font-size:10pt;height:65px;width:230px;border:solid 2px black;z-index:200;padding:0px;");
								div.setAttribute("id","kassenlayer");
								document.getElementsByTagName("body")[0].appendChild(div);

								kassenlayer = document.getElementById("kassenlayer");

								document.getElementById("einzahlbutton").addEventListener("click", function() {
												document.getElementById("f_money").value = document.getElementById("betrag_kasse").value;
												document.getElementById("f_comment").value = document.getElementById("kommentar_kasse").value;
												document.getElementById("echtereinzahlbutton").click();
								},false);

								document.getElementById("kassentabelle").addEventListener("mouseover",einfacheinblenden,false);
								kassenlayer.addEventListener("mouseout",ausblenden,false);
				} else {
								einblenden();
				}

				function einfacheinblenden() {
								kassenlayer.style.display="block";
				}
				function einblenden() {
								kassenlayer.style.top = (posy-5)+"px";
								kassenlayer.style.left = (posx-5)+"px";
								kassenlayer.style.display="block";
				}
				function ausblenden() {
								kassenlayer.style.display="none";
				}
}

function waschenfkt() {
				ladeanzeiger("Du bist gerade dabei, dich zu waschen!");
				window.setTimeout(function() {
				GM_xmlhttpRequest({
								method: 'POST',
								url: basisurl + "/city/washhouse/buy/",
								headers: {'Content-type': 'application/x-www-form-urlencoded'},
								data: encodeURI('id=2'),
								onload: function(responseDetails) {
												(responseDetails.status == 200) ? alert("Deine Sauberkeit ist nun auf 100% gestiegen") : alert("Leider ist beim Waschen etwas schiefgegangen, bitte erneut versuchen!");
												location.href = location.href;
								},
								onerror: function(responseDetails) {
												if(confirm("Leider ist beim Waschen etwas schiefgegangen, soll es noch einmal versucht werden?")) {
																ladeanzeiger();
																waschenfkt();
												} else {
																location.href = location.href;
												}
								}
				});
				},0)
}

//Mit dieser Funktion, an die die Plunder-Actionnummer uebergeben wird, wird ein Plunder per Klick gewechselt

function weiterbildenfkt(posx,posy,trinkenfertig) {
				if(!trinkenfertig) ladeanzeiger(fkt_weiterbildung_beschriftung);
				window.setTimeout(function() {
				function wbplanlegen() {
								if (plunderbody.indexOf("> "+wbplunder+"<")>=0) {
												location.href = basisurl + "/skills/";
								} else {
                	      GM_xmlhttpRequest({
	                                method: 'POST',
	                                url: basisurl+'/stock/plunder/change/',
	                                headers: {'Content-type': 'application/x-www-form-urlencoded'},
	                                data: encodeURI('f_plunder='+reg.exec(plunderbody.substring(plunderbody.indexOf(">"+wbplunder+"<")-20,plunderbody.indexOf(">"+wbplunder+"<")))),
	                                onload: function(responseDetails) {
	                                        if(responseDetails.responseText.indexOf("> "+wbplunder+"<")>=0) {
	                                        				alert("Dein Weiterbildungsplunder wurde angelegt, beim Klick auf OK wird zur Weiterbildungsseite gewechselt!");
	                                                location.href = basisurl + "/skills/";
	                                        } else {
	                                                alert("Es ist etwas schiefgegangen beim Anlegen des Weiterbildungsplunders!");
	                                                location.href = location.href;
	                                        }
	                                },
	                                onerror: function(responseDetails) {
	                                				alert("Es ist etwas schiefgegangen beim Anlegen des Weiterbildungsplunders!");
	                                        location.href = location.href;
	                                }
	                      });
	      				}
	      } ;

				//Wenn das Trinken per Lebensmittel fertiggestellt wurde
				if(trinkenfertig) {
								if(wbplunder) {wbplanlegen()} else {location.href = basisurl + "/skills";}
				//Wenn noch nichts getrunken wurde
				} else {
								if(getpromille(document.getElementsByTagName("body")[0].innerHTML)>=2.5) {
												if(wbplunder) {wbplanlegen()} else {location.href = basisurl + "/skills";}
								} else {
                	      //Wenn der Nikolaus-Plunder zum Trinken vorhanden ist
	                      if(plunderbody.indexOf(">Nikolaus-Plunder<")>=0) {
	                              GM_xmlhttpRequest({
	                                      method: 'POST',
	                                      url: basisurl+'/stock/plunder/change/',
	                                      headers: {'Content-type': 'application/x-www-form-urlencoded'},
	                                      data: encodeURI('f_plunder='+reg.exec(plunderbody.substring(plunderbody.indexOf(">Nikolaus-Plunder<")-20,plunderbody.indexOf(">Nikolaus-Plunder<")))+''),
	                                      onload: function(responseDetails) {
	                                              if(getpromille(responseDetails.responseText)>=2.5) {
	                                                      if(wbplunder) {
	                                                              alert('Deine Promille sind nun gestiegen, beim Klick auf OK wird der Weiterbildungsplunder "'+wbplunder+'" angelegt!');
	                                                              wbplanlegen();
	                                                      } else {
	                                                              alert("Deine Promille sind nun gestiegen, beim Klick auf OK wird zur Weiterbildungsseite gewechselt!")
	                                                              location.href = location.href = basisurl + "/skills/";
	                                                      }
	                                              } else {
	                                                      alert("Es ist ein Fehler beim Erhoehen deiner Promille aufgetreten, bitte erneut versuchen!");
	                                                      location.href = location.href;
	                                              }
	                                      },
	                                      onerror: function(responseDetails) {
	                                              alert("Es ist ein Fehler beim Erhoehen deiner Promille aufgetreten, bitte erneut versuchen!");
	                                              location.href = location.href;
	                                      }
	                              });
	                      //Wenn mit Lebensmittel getrunken werden muss
	                      } else {
	                              trinkenfkt(0,0,true)
	                      }
	      				}
	      }
	      },0);
}

function suchenfkt(posx,posy) {
				var suchenlayer = document.getElementById("suchenlayer");
				if(!suchenlayer) {
								var suchendiv = document.createElement("div");
								suchendiv.innerHTML="<table width='100%' height='100%' id='spielersuchentabelle' cellspacing='0' border='0' cellpadding='0'><tr><td><input style='margin-top: 3px;padding: 1px 2px 1px 3px;text-align: left;font: 12px Arial, Helvetica, Verdana, sans-serif;border: 1px solid #000;color: #e5e5e5;background: #54514d;overflow: visible; width: auto;' type='text' size='30' value='"+fkt_suche_beschriftung+"' id='spielername'></td></tr><tr><td align='center'><input type='button' value='Suchen' id='spielersuchen'></td></tr><table>"/*+"<div style='position:absolute;top:0px;left:0px;width=100%;'><img src='http://i50.tinypic.com/f4iskp.png' height='100%' width='100%'></div>"*/;
								suchendiv.setAttribute("style","display:block;position:absolute;top:"+(posy-5)+"px;left:"+(posx-5)+"px;background-color:red;color:black;font-size:10pt;height:50px;width:200px;border:solid 2px black;z-index:200;padding:0px;");
								suchendiv.setAttribute("id","suchenlayer");
								document.getElementsByTagName("body")[0].appendChild(suchendiv);

								suchenlayer = document.getElementById("suchenlayer");

								document.getElementById("spielername").addEventListener("click",function() {
												if(this.value==fkt_suche_beschriftung) {
																this.value='';
																this.focus();
												} else {
																this.focus();
												}
								}, false);

								document.getElementById("spielersuchen").addEventListener("click", function () {
												location.href = basisurl + "/highscore/user/?name="+formatstring(document.getElementById("spielername").value)+"&gang=&district=0&min=&max=";
								}, false);

								document.getElementById("spielersuchentabelle").addEventListener("mouseover",einfacheinblenden,false);
								suchenlayer.addEventListener("mouseout",ausblenden,false);
				} else {
								einblenden();
				}

				function einfacheinblenden() {
								suchenlayer.style.display="block";
				}
				function einblenden() {
								suchenlayer.style.top = (posy-5)+"px";
								suchenlayer.style.left = (posx-5)+"px";
								suchenlayer.style.display="block";
				}
				function ausblenden() {
								suchenlayer.style.display="none";
				}
}

function trinkenfkt(posx,posy,wbfkt) {
				//Wenn der Parameter wbfkt uebergeben wurde, heisst das, dass die Funktion aus der Weiterbildungsfunktion heraus gestartet wurde
				var pegel = (wbfkt) ? 2.5 : promillegrenze;

				if(getpromille(document.getElementsByTagName("body")[0].innerHTML)>=pegel) {
								if (wbfkt) {
								        if(!wbplunder) alert("Dein Alkoholpegel ist bereits hoch genug, beim Klick auf OK wird zur Weiterbildungsseite gewechselt!")
												else alert("Dein Alkoholpegel ist bereits hoch genug, beim Klick auf OK wird dein Weiterbildungsplunder angelegt!");
								        weiterbildenfkt(0,0,true);
								} else {
								 				alert("Dein Alkoholpegel ist bereits hoch genug!");
								}
				} else {
				//Die Ladeanzeige wird nur benoetigt, wenn das Trinken als eigenstaendige Funktion aufgerufen wurde
				if (!wbfkt) {
								ladeanzeiger("Dein Alkoholpegel wird gerade auf "+ kaufm(pegel) + " Promille erh&ouml;ht!");
				}

				window.setTimeout(function() {
				var biermenge = 0;
				var bierbenoetigt = 0;
				var bierbenutzen = false;

				var gluehweinmenge = 0;
				var gluehweinbenoetigt = 0;
				var gluehweinbenutzen = false;
				GM_xmlhttpRequest({
								method: 'GET',
								url: basisurl + "/stock/foodstuffs/",
								onload: function(responseDetails) {
												if(responseDetails.responseText.indexOf("errungenen Ausbeuten betrachten und ggf. benutzen oder verkaufen")>=0) {
                        	      bierbenoetigt = Math.ceil((pegel - getpromille(responseDetails.responseText)) /0.35);
	                              biermenge = (responseDetails.responseText.indexOf('<input type="hidden" id="lager_Bier" value="')>=0) ? parseInt(responseDetails.responseText.split('<input type="hidden" id="lager_Bier" value="')[1].split('"')[0]) : 0;
	                              bierbenutzen = (bierbenoetigt<=biermenge) ? true : false;
	                              //Wenn kein Bier vorhanden ist nach Gluehwein suchen
	                              if (!bierbenutzen) {
	                                      gluehweinbenoetigt =  Math.ceil((pegel - getpromille(responseDetails.responseText)) /0.8);
	                                      gluehweinmenge = (responseDetails.responseText.indexOf('<input type="hidden" id="lager_xm_drink" value="')>=0) ? parseInt(responseDetails.responseText.split('<input type="hidden" id="lager_xm_drink" value="')[1].split('"')[0]) : 0;
	                                      gluehweinbenutzen = (gluehweinbenoetigt<= gluehweinmenge) ? true : false;
	                                      if(gluehweinbenutzen) {
	                                              trinken(10,gluehweinbenoetigt)
	                                      //Wenn auch kein Gluehwein vorhanden ist, Meldung anzeigen und zum Supermarkt wechseln
	                                      } else {
	                                              alert("Anscheinend besitzt du nicht mehr genug zu trinken, bitte im Supermarkt neue Getraenke kaufen!");
	                                              location.href = basisurl + "/city/supermarket/";
	                                      }
	                              } else {
	                                      trinken(1,bierbenoetigt)
	                              }
								        } else {
								        				if(confirm("Es gab einen Fehler beim Abrufen deiner vorhandenen Getraenke! Soll es erneut versucht werden?")) {
								        								if(wbfkt) {
								        												trinkenfkt(0,0,true)
								        								} else {
								        												trinkenfkt();
								        								}
								        				} else {
								        								location.href = location.href;
								        				}
								        }
								},
								onerror: function(responseDetails) {
												alert("Es gab einen Fehler beim Abrufen deiner vorhandenen Getraenke, bitte erneut versuchen!");
												location.href = location.href;
								}
				});

				function trinken(id,menge) {
								GM_xmlhttpRequest({
												method: 'POST',
												url: basisurl + "/stock/foodstuffs/use/",
												data: encodeURI("item=&promille=&id=" + id + "&menge=" + menge),
												onload: function(responseDetails) {
																//Wenn die Seite korrekt geladen wurde, sodass die Promille ausgelesen werden koennen
																if(!isNaN(getpromille(responseDetails.responseText))) {
																				//Wenn sich der Promillepegel nicht auf das gewuenschte Niveau abgesenkt hat
																				if(getpromille(responseDetails.responseText)<pegel) {
																								alert("Leider ist beim Trinken etwas schiefgegangen, bitte erneut versuchen!");
																								location.href = location.href;
																				//Wenn es geklappt hat
																				} else {
																				        if (wbfkt) {
																				        				if(!wbplunder) alert("Dein Alkoholpegel ist auf "+kaufm(getpromille(responseDetails.responseText))+" Promille gestiegen, beim Klick auf OK wird zur Weiterbildungsseite gewechselt!")
																												else alert("Dein Alkoholpegel ist auf "+kaufm(getpromille(responseDetails.responseText))+" Promille gestiegen, beim Klick auf OK wird dein Weiterbildungsplunder angelegt!");
																				                weiterbildenfkt(0,0,true);
																								} else {
																				        				alert("Dein Alkoholpegel ist auf "+kaufm(getpromille(responseDetails.responseText))+" Promille gestiegen!");
																				                location.href = location.href;
																								}
																				}
																//Wenn die Promille gar nicht erst ausgelesen werden konnten
																} else {
																				alert("Leider ist beim Trinken etwas schiefgegangen, bitte erneut versuchen!");
																				location.href = location.href;
																}
												},
												//Wenn das POST gar nicht erst erfolgreich endete
												onerror: function(responseDetails) {
																if(confirm("Beim Trinken ist leider etwas schiefgegangen, soll es erneut versucht werden?")) {
																				trinken(id,menge)
																} else {
																				location.href = location.href;
																}
												}
								})
				}

				},0)
				}
}

function essenfkt() {
				if(getpromille(document.getElementsByTagName("body")[0].innerHTML)<=0.75) {
								alert("Dein Alkoholpegel muss nicht gesenkt werden!")
				} else {
								ladeanzeiger("Deine Alkoholpegel wird gerade auf ein kampftaugliches Niveau gesenkt!");
        	      window.setTimeout(function() {
	              var brotmenge = 0;
	              var brotbenoetigt = 0;
	              var brotbenutzen = false;

	              var wurstmenge = 0;
	              var wurstbenoetigt = 0;
	              var wurstbenutzen = false;

	              var stollenmenge = 0;
	              var stollenbenoetigt = 0;
	              var stollenbenutzen = false;

	              var burgermenge = 0;
	              var burgerbenoetigt = 0;
	              var burgerbenutzen = false;

	              GM_xmlhttpRequest({
	                      method: 'GET',
	                      url: basisurl + "/stock/foodstuffs/food/",
	                      onload: function(responseDetails) {
	                              if(responseDetails.responseText.indexOf("errungenen Ausbeuten betrachten und ggf. benutzen oder verkaufen")>=0) {
                                	      brotbenoetigt = Math.ceil((getpromille(responseDetails.responseText)-0.75) /0.35);
	                                      brotmenge = (responseDetails.responseText.indexOf('<input type="hidden" id="lager_Brot" value="')>=0) ? parseInt(responseDetails.responseText.split('<input type="hidden" id="lager_Brot" value="')[1].split('"')[0]) : 0;
	                                      brotbenutzen = (brotbenoetigt<=brotmenge) ? true : false;
	                                      //Wenn kein Brot vorhanden ist nach Currywuersten suchen
	                                      if (!brotbenutzen) {
	                                              wurstbenoetigt =  Math.ceil((getpromille(responseDetails.responseText)-0.75));
	                                              wurstmenge = (responseDetails.responseText.indexOf('<input type="hidden" id="lager_Currywurst" value="')>=0) ? parseInt(responseDetails.responseText.split('<input type="hidden" id="lager_Currywurst" value="')[1].split('"')[0]) : 0;
	                                              wurstbenutzen = (wurstbenoetigt <= wurstmenge) ? true : false;
	                                              //Wenn keine Currywuerste vorhanden sind nach Stollen suchen
	                                              if(!wurstbenutzen) {
	                                                      stollenbenoetigt = Math.ceil((getpromille(responseDetails.responseText)-0.75)/1.5);
	                                                      stollenmenge = (responseDetails.responseText.indexOf('<input type="hidden" id="lager_xm_food" value="')>=0) ? parseInt(responseDetails.responseText.split('<input type="hidden" id="lager_xm_food" value="')[1].split('"')[0]) : 0;
	                                                      stollenbenutzen = (stollenbenoetigt <= stollenmenge) ? true : false;
	                                                      //Wenn keine Stollen vorhanden sind nach Hamburgern suchen
	                                                      if(!stollenbenutzen) {
	                                                              burgerbenoetigt = Math.ceil((getpromille(responseDetails.responseText)-0.75)/2);
	                                                              burgermenge = (responseDetails.responseText.indexOf('<input type="hidden" id="lager_Hamburger" value="')>=0) ? parseInt(responseDetails.responseText.split('<input type="hidden" id="lager_Hamburger" value="')[1].split('"')[0]) : 0;
	                                                              burgerbenutzen = (burgerbenoetigt <= burgermenge) ? true : false;
	                                                              //Wenn keine Burger vorhanden sind, Meldung anzeigen, dass Essen nachgekauft werden muss
	                                                              if(!burgerbenutzen) {
	                                                                      alert("Anscheinend besitzt du nicht mehr genug zu essen, bitte im Supermarkt neue Nahrungsmittel kaufen!");
	                                                                      location.href = basisurl + "/city/supermarket/food/";
	                                                              } else {
	                                                                      essen(4,burgerbenoetigt)
	                                                              }
	                                                      } else {
	                                                              essen(11,stollenbenoetigt)
	                                                      }
	                                              } else {
	                                                      essen(3,wurstbenoetigt)
	                                              }
	                                      } else {
	                                              essen(2,brotbenoetigt)
	                                      }
	                              } else {
	                              				if(confirm("Es gab einen Fehler beim Abrufen deiner vorhandenen Lebensmittel! Soll es erneut versucht werden?")) {
								        												ladeanzeiger();
								        												essenfkt();
								        								} else {
								        												location.href = location.href;
								        								}
	                              }
	                      }
	              });

	              function essen(id,menge) {
	                      GM_xmlhttpRequest({
	                              method: 'POST',
	                              url: basisurl + "/stock/foodstuffs/use/",
	                              data: encodeURI("item=&promille=&id=" + id + "&menge=" + menge),
	                              onload: function(responseDetails) {
																				if(isNaN(getpromille(responseDetails.responseText))) {
																								alert("Leider ist beim Essen etwas schiefgegangen, bitte erneut versuchen!");
	                                      } else {
	                                      				if(getpromille(responseDetails.responseText)>0.75) {
	                                              				alert("Leider ist beim Essen etwas schiefgegangen, bitte erneut versuchen!");
	                                      				} else {
	                                              				alert("Dein Alkoholpegel ist auf "+kaufm(getpromille(responseDetails.responseText))+" Promille gesunken!");
	                                      				}
	                                      }
																				location.href = location.href;
	                              },
	                              onerror: function(responseDetails) {
	                              				if(confirm("Beim Essen ist leider etwas schiefgegangen, soll es erneut versucht werden?")) {
																								essen(id,menge)
																				} else {
																								location.href = location.href;
																				}
																}
	                      })
	              }

	              },0)
	      }
}

//Bastelt ein Lockfutter fuer 5000 Euro, welches spaeter fuer Weiterbildungskosten benutzt werden kann
function lockfutterfkt() {
				var geldaktuell = getmoney(document.getElementsByTagName("body")[0].innerHTML)
				if(geldaktuell>=5000) {
								ladeanzeiger("Das Lockfutter wird gerade gekauft...");
								window.setTimeout(function() {
												GM_xmlhttpRequest({
																method: 'POST',
																url: basisurl + "/stock/plunder/craft/do/",
																headers: {'Content-type': 'application/x-www-form-urlencoded'},
																data: encodeURI('c_id=12'),
																onload: function(responseDetails) {
																				if(responseDetails.responseText.indexOf('<li class="icon beer">')>=0) {
																								alert("Das Lockfutter wurde erfolgreich gekauft");
																				} else {
																								alert("Anscheinend ist ein Fehler beim Kaufen des Lockfutters aufgetreten, bitte erneut versuchen!");
																				}
																				location.href = location.href;
																},
																onerror: function(responseDetails) {
																				if(confirm("Anscheinend ist ein Fehler beim Kaufen des Lockfutters aufgetreten, soll es erneut versucht werden?")) {
																								ladeanzeiger();
																								lockfutterfkt();
																				} else {
																								location.href = location.href
																				}
																}
												});
								},0)
				} else {
								alert("Du hast leider nicht genug Geld!");
				}
}

function schreibenfkt() {
				var schreibenlayer = document.getElementById("schreibenlayer");
				if(!schreibenlayer) {
								var schreibendiv = document.createElement("div");
								schreibendiv.setAttribute("style","display:block;width:500px;position:absolute;top:"+(((screen.height-200)/2)-100)+"px;left:"+(screen.width-500)/2+"px;background-color:black;color:white;font-size:10pt;border:solid 2px black;z-index:200;padding:10px;");
								schreibendiv.innerHTML='<div><form name="form1" id="schreibenform" method="post" action="/gang/chat/add/"></form></div>';
								schreibendiv.setAttribute("id","schreibenlayer");
								schreibendiv.setAttribute("align","center");
								document.getElementsByTagName("body")[0].appendChild(schreibendiv);
								document.getElementById("schreibenform").innerHTML+='<textarea id="f_text" name="f_text" rows="5" style="background-color:#54514d;border:0;width:100%"</textarea><br /><br><input type="submit" value="Abschicken">'+
								'&nbsp;<input type="button" id="versteckeschreiben" value="Abbrechen">';
								schreibenlayer = document.getElementById("schreibenlayer");
								
								document.getElementById("versteckeschreiben").addEventListener("click",ausblenden,false);
				} else {
								einblenden();
				}

				function einblenden() {
								schreibenlayer.style.display="block";
				}
				function ausblenden() {
								schreibenlayer.style.display="none";
				}				
}
//###################################################################################################################################################
//###################################################################################################################################################

//**************************************************************************************************************************************************
//*********************************************Wut-Warner und Bandenkampfwarner*********************************************************************
//**************************************************************************************************************************************************
if(wutwarner || bandenkampfwarner) {
				var warnerdiv = document.createElement("div");
				warnerdiv.setAttribute("style","position:absolute;top:235px;left:"+abstand+"px;width:257px;height:30px;");
				warnerdiv.innerHTML = "<table style='font-size:9pt;' border='0' cellspacing='3'><tr id='warnerzeile'></tr></table>";
				warnerdiv.align= "center";
				document.getElementsByTagName("body")[0].appendChild(warnerdiv);

				var warnerzeile = document.getElementById("warnerzeile");
				warnerzeile.innerHTML+= (wutwarner) ? "<td id='wutwarner' width='69' style='padding:0px;margin:0px;'><img src='"+ladebalken_url+"' title='Der aktuelle WUT-Status wird abgerufen!'></td>" : "";
				warnerzeile.innerHTML+= (bandenkampfwarner) ? "<td id='bandenkampfwarner' width='69' style='cursor:pointer;padding:0px;margin:0px;'><img src='"+ladebalken_url+"' title='Aktuelle Bandenk&auml;mpfe werden abgerufen!'></td>" : "";
}

if(bandenkampfwarner) bandenkampfwarnerfkt();

if(wutwarner) wutwarnerfkt();

function bandenkampfwarnerfkt() {
				document.getElementById("bandenkampfwarner").addEventListener("click",function() {
								location.href=basisurl+"/gang/fight/";
				},false);
				GM_xmlhttpRequest({
								method:"GET",
								url:basisurl+"/gang/fight/",
								onload:function(responseDetails) {
												var inhalt = responseDetails.responseText;
												if(inhalt.indexOf('<span class="tiername"><strong>Bandenk&auml;mpfe</strong>')>=0) {
																kaempfe = inhalt.split('href="/gang/fight/view/').length - 1;
																if(kaempfe>0) {
																				if(kaempfe==1) {
																								document.getElementById("bandenkampfwarner").innerHTML = '<img src="'+einbkaktivicon_url+'" title="Ein laufender Bandenkampf!">';
																        } else {
																        				if(kaempfe>9) {
																        								document.getElementById("bandenkampfwarner").innerHTML = '<div style="margin:0px;padding:0px;position:relative"><div style="position:absolute;top:0px;left:5px;font: bold 18pt Arial">x</div><img src="'+bkaktivicon_url+'" title="'+kaempfe+' laufende Bandenk&auml;mpfe!"></div>';
																        				} else {
																        								document.getElementById("bandenkampfwarner").innerHTML = '<div style="margin:0px;padding:0px;position:relative"><div style="position:absolute;top:0px;left:5px;font: bold 18pt Arial">'+kaempfe+'</div><img src="'+bkaktivicon_url+'" title="'+kaempfe+' laufende Bandenk&auml;mpfe!"></div>';
																        				}
																				}
																} else {
																        document.getElementById("bandenkampfwarner").innerHTML = '<img src="'+bkinaktivicon_url+'" title="Keine laufenden K&auml;mpfe!">';
																}	
												} else {
																if(confirm("Beim Abrufen der Bandenkampfsseite ist etwas schiefgelaufen, soll es erneut versucht werden?")) {
																				bandenkampfwarnerfkt();
																} else {
																				document.getElementById("bandenkampfwarner").innerHTML = "Fehler";
																}
												}
								},
								onerror: function(responseDetails) {
												if(confirm("Beim Abrufen der Bandenkampfseite ist etwas schiefgelaufen, soll es erneut versucht werden?")) {
																bandenkampfwarnerfkt();
												} else {
																document.getElementById("bandenkampfwarner").innerHTML = "Fehler";
												}
								}
				})																		
}

function wutwarnerfkt() {
	      GM_xmlhttpRequest({
	              method: 'GET',
	              url: basisurl + '/gang/credit/?showall=1',
	              onload: function(responseDetails) {
	                      if(responseDetails.status == 404) {
	                      				document.getElementById("wutwarner").innerHTML = "<img src='"+wutinaktivicon_url+"' title='Wutentfachung ist nicht aktiv!'>";
	                      } else {
                        	      var content = responseDetails.responseText;
	                              if(content.indexOf("Wutentfachung gestartet.")>=0) {
	                                      var datereg = /(\d{2}\.){2} \d{2}:\d{2}/gm
	                                      var teil1 = content.split("Wutentfachung gestartet.")[0];
	                                      var teil2 = teil1.substring(teil1.lastIndexOf("startete"),teil1.length);
	                                      var datumsstring = datereg.exec(teil2)[0];
	                                      var monat = parseInt(datumsstring.substr(3,2));
	                                      var tag = parseInt(datumsstring.substr(0,2));
	                                      var minuten = parseInt(datumsstring.substr(10,2));
	                                      var stunden = parseInt(datumsstring.substr(7,2));
	                                      var jetzt = new Date();
																			  var datumlastwut = new Date(jetzt.getFullYear(),monat-1,tag,stunden,minuten,30);
	                                      if(datumlastwut>jetzt) {datumlastwut.setFullYear(jetzt.getFullYear-1)};
	                                      var naechstewut = new Date();
	                                      //Das Datum der naechsten Wut ergibt sich, wenn man 3 Tage zum letzten Startdatum hinzuzaehlt
	                                      naechstewut.setTime(datumlastwut.getTime()+(3*24*60*60*1000));
	                                      var wuticonbeschr = false;
	                                      var wuticonurl = false;
	                                      //Zeit, die seit dem letzten Start von Wutentfachung vergangen ist
	                                      var zeitvergangen = heute.getTime()-datumlastwut.getTime();
	                                      //Wenn die Wutentfachung noch laeuft (Ich benutze hier etwas weniger als 24 Stunden, da ich nicht
	                                      //weiss, inwieweit PG-Uhr und PC-Uhr uebereinstimmen, es wird im Zweifelsfall die Bandenseite abgerufen,
	                                      //auf der dann eindeutig festzustellen ist, ob die Wut aktiv ist oder nicht)
	                                      if(zeitvergangen<(23.9975*60*60*1000)) {
																								wuticonurl = wutaktivicon_url;
	                                              wuticonbeschr = "Wutentfachung ist aktiv und l&auml;uft noch "+formatstunden(24-(heute.getTime()/(1000*60*60)-datumlastwut.getTime()/(1000*60*60)))+" Stunden! Sie kann das n&auml;chste Mal am "+formatdatum(naechstewut)+" gestartet werden!";
																				//Wenn sie nicht mehr laeuft
	                                      } else {
	                                              //Wenn die Bandenuebersicht zur genauen Feststellung, ob die Wut noch laeuft, abgerufen werden muss
	                                              if(zeitvergangen<(24.0025*60*60*1000)) {
	                                                      function bandenuebersicht()  {
                                                        	      GM_xmlhttpRequest({
	                                                                      method: "GET",
	                                                                      url: basisurl+"/gang/",
	                                                                      onload: function(responseDetails) {
	                                                                              wuticonurl = (responseDetails.responseText.indexOf('<div align="center">Wutentfachung ist aktiv!')>=0) ? wutaktivicon_url : wutinaktivicon_url;
	                                                                              wuticonbeschr = (responseDetails.responseText.indexOf('<div align="center">Wutentfachung ist aktiv!')>=0) ? "Wutentfachung ist aktiv und l&auml;uft noch "+formatstunden(24-(heute.getTime()/(1000*60*60)-datumlastwut.getTime()/(1000*60*60)))+" Stunden! Sie kann das n&auml;chste Mal am "+formatdatum(naechstewut)+" gestartet werden!": "Wutentfachung ist nicht aktiv! Das n&auml;chste Mal kann sie am "+formatdatum(naechstewut)+" gestartet werden!";
	                                                                              document.getElementById("wutwarner").innerHTML = "<img src='"+wuticonurl+"' title='"+wuticonbeschr+"'>";
	                                                                      },
	                                                                      onerror: function(responseDetails) {
	                                                                              if(confirm("Das Abrufen der Bandenseite zum Herausfinden des Wutentfachung-Status schlug leider fehl, soll es erneut versucht werden?")) {
	                                                                                      bandenuebersicht();
	                                                                              } else {
	                                                                                      document.getElementById("wutwarner").innerHTML = "Fehler";
	                                                                              }
	                                                                      }
	                                                              })
	                                                      }
	                                              				bandenuebersicht();
	                                              } else {
	                                              				wuticonurl = wutinaktivicon_url;
	                                              				wuticonbeschr = (naechstewut>jetzt) ? "Wutentfachung ist nicht aktiv! Das n&auml;chste Mal kann sie am "+formatdatum(naechstewut)+" gestartet werden!" : "Wutentfachung ist nicht aktiv! Sie kann nun wieder gestartet werden!";
	                                              }
	                                      }
	                                      if(wuticonbeschr && wuticonurl) document.getElementById("wutwarner").innerHTML = "<img src='"+wuticonurl+"' title='"+wuticonbeschr+"'>";
	                              } else {
	                                      document.getElementById("wutwarner").innerHTML = "<img src='"+wutinaktivicon_url+"' title='Wutentfachung ist nicht aktiv!'>";
	                              }
	                      }
	              }
	      })
}

//###################################################################################################################################################
//###################################################################################################################################################

//**************************************************************************************************************************************************
//******************************************Hilfsfunktionen*****************************************************************************************
//**************************************************************************************************************************************************
function zeitdifferenz(danach,davor) {
				var differenz = (danach.getTime()-davor.getTime())/(1000*60*60);
				return differenz;
}

function formatstunden(zeit) {
        var ganzstunden = Math.floor(zeit);
        var rest = zeit-ganzstunden;
				var reststring = Math.floor(rest*60).toString();
				var reststring = (reststring.length==2) ? reststring : "0"+reststring;
				return ganzstunden.toString()+":"+reststring;
}

function formatdatum(datum) {
				var monate = ["Januar", "Februar", "M&auml;rz", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
				var wochentage = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
				var minuten = (datum.getMinutes().toString().length==2)?datum.getMinutes():"0"+datum.getMinutes().toString();
				return wochentage[datum.getDay()]+", den "+datum.getDate()+". "+monate[datum.getMonth()]+" "+datum.getFullYear()+" um "+datum.getHours()+":"+minuten+" Uhr";
}


//Liefert die aktuellen Promille des Penners zurueck
function getpromille(string) {
				var promillereg = /\d{1,3}\.\d{2}/m;
				if(string.indexOf('Klicke hier, um etwas zu trinken">')>=0) {
								var teil1 = string.split('Klicke hier, um etwas zu trinken">');
								var teil2 = teil1[1].split('<li class="icon book">');
								return parseFloat(promillereg.exec(teil2[0]));
				} else {
								return false;
				}
}

//Liefert das aktuelle Vermoegen des Penners zurueck
function getmoney(string) {
       	//Geld auslesen
       	var geldreg = /\d{0,1}\.{0,1}\d{0,3}\.{0,1}\d{1,3},\d\d/m;
       	if(string.indexOf('bersicht zu kommen">')>=0) {
								var teil1 = string.split('bersicht zu kommen">');
								var teil2 = teil1[1].split('<li class="icon beer">');
								var komma = geldreg.exec(teil2[0]).toString().split(/,/);
        				if (komma[0].indexOf(".")!=-1) {
												var ganzzahl = komma[0].replace(/\./g, "");
         								return parseFloat(ganzzahl+komma[1])/100;
								} else {
         								return parseFloat(komma[0]+komma[1])/100;
      					}
      	} else {
      					return false;
      	}
}

//Rundet eine uebergebene Zahl auf zwei Stellen nach dem Komma und ersetzt den Punkt mit einem Komma
function kaufm(x) {
  			return x.toFixed(2).toString().replace(".",",");
}

function formatzahl(x) {
				var zahltext = x.toString();
				if(/,/.test(zahltext)) {
								var schritt2 = zahltext.replace(",",".");
								return parseFloat(schritt2);
				} else {
								return parseFloat(x);
				}
}
//Diese Funktion blendet den Ladeanzeiger bei bedarf ein/aus, es kann ein Titel uebergeben werden, der dann als Tooltip ueber dem Bild erscheint
function ladeanzeiger(bildtitel) {
				var anzeigecontainer = document.getElementById("ladebalken");
				var anzeigebild = anzeigecontainer.childNodes[0];
				if (anzeigecontainer.style.display=="none") {
								anzeigecontainer.style.display="block";
								anzeigebild.title = bildtitel;
				} else {
								anzeigecontainer.style.display="none";
								anzeigebild.title = "Ladeanzeiger";
				}
}
//Diese Funktion ersetzt in einem String alle Leerzeichen mit je einem "+"
function formatstring(string) {
				return string.replace(" ", "+");
}

//#################################################################################################################################################
//#################################################################################################################################################
function plunderseitenabfrage() {
	      GM_xmlhttpRequest({
	              method: 'GET',
	              url: basisurl+'/stock/plunder/',
	              onload: function(responseDetails) {
	                      if(responseDetails.status == 200) {
                        	      plunderbody = responseDetails.responseText;
	                              if(plunderbody.indexOf("<li>Du hast keinen Plunder angelegt.</li>")>=0) {
	                                      angplurl = transparenz_url;
	                                      angpltitel = "Du hast keinen Plunder angelegt!";
	                              } else {
	                                      var angplstring = plunderbody.split("<h4><img")[1].split("</h4>")[0];
	                                      angplurl = angplstring.split(' src="')[1].split('" ')[0];
	                                      angpltitel = 'Der Plunder '+angplstring.split('alt=" " /> ')[1].split('</h4>')[0]+' ist angelegt';
	                              }
	                              versuch(plunderbody);
	                              container();
	                      } else {
	                              if(confirm("Beim Abfragen der Plunderseite ist etwas schiefgelaufen, soll es erneut versucht werden?"))
	                      								plunderseitenabfrage();
	                      }
	              },
	              onerror: function(responseDetails) {
	                      if(confirm("Beim Abfragen der Plunderseite ist etwas schiefgelaufen, soll es erneut versucht werden?"))
	                      				plunderseitenabfrage();
	              }
	      });
}

function kampfseitenabfrage() {
				GM_xmlhttpRequest({
	                method: 'GET',
	                url: basisurl+'/fight/',
	                onload: function(responseDetails) {
	                				if(responseDetails.status == 200) {
                          	      var reg = /\d{5,10}/m;
	                                var fightbody = responseDetails.responseText;
	                                if (fightbody.split("warning.gif").length-1>0) {
	                                        FIGHT_eintreffend = true;
	                                        FIGHT_anzahl = fightbody.split("warning.gif").length-1;
	                                }
	                                if (FIGHT_eintreffend) {
	                                        if (FIGHT_anzahl==1){
	                                                kampftext = "<a href='"+basisurl+"/fight/' style='text-decoration:none;color:red'>1 eintreffender Kampf!</a>";
	                                        } else {
	                                                kampftext = "<a href='"+basisurl+"/fight/' style='text-decoration:none;color:red'>"+FIGHT_anzahl+" eintreffende K&auml;mpfe!</a>";
	                                        }
	                                } else {
	                                        kampftext = "<a href='"+basisurl+"/fight/' style='text-decoration:none;color:black'>Keine eintreffenden K&auml;mpfe!";
	                                }

	                                if(document.getElementById("kampfzelle")) {
	                                        document.getElementById("kampfzelle").innerHTML = kampftext;
	                                }
													} else {
																	if(confirm("Beim Abfragen der Kampfseite ist etwas schiefgelaufen, soll es erneut versucht werden?")) {
	                              					kampfseitenabfrage();
	                              	}
	                        }
									},
	              	onerror: function(responseDetails) {
	                	      if(confirm("Beim Abfragen der Kampfseite ist etwas schiefgelaufen, soll es erneut versucht werden?"))
	                  	    				kampfseitenabfrage();
	              	}
				});
}

function container() {
				container = document.createElement("div");
				container.id="menuecontainer";
				container.align ="center";
				container.setAttribute("style", "font-size:8pt;z-index:1;background:url(http://static.pennergame.de/img/pv4/bg_my-profile.png) no-repeat;height:130px;width:257px;position:absolute;left:"+abstand+"px;top:50px;padding:52px 0 0 0px;");
				container.innerHTML="<div id='ladebalken' style='display:none;position:absolute;top:148px;left:30px;'>"+
				"<img src='"+ladebalken_url+"'></div><div style='padding:0px 0 0 0px;display:block;' id='hauptteil'><table width='240' border='0'><tr><td align='center'><table cellpadding='0' border='0' cellspacing='0'><tr>"+anzpltext.join("")+
				"<td style='border:dotted 2px black'><img src='"+angplurl+"' title='"+angpltitel+"'></td></tr></table></tr><tr><td align='center' style='font-size:10pt;font-family: Arial,Times New Roman;font-weight:bold' id='kampfzelle'>"+kampftext+"</td></tr>"+
				"<tr><td align='center'><table><tr>"+speicherbuttonstext.join("")+"</tr></table>"+
				"</td></tr><tr><td><table cellpadding='0' border='0' cellspacing='0'><tr><td valign='top' width='105'><div style='cursor:pointer;font-size:8pt;float:left' id='einstellungen'>Einstellungen</div><div id='mehrfunktionen' style='font-size:8pt;cursor:pointer;float:right'>mehr&nbsp;&nbsp;&nbsp;</div></td><td colspan='3' style='font-size:9pt;font-weight:bold'>"+
				"<a href='"+link1adresse+"' style='color:black;text-decoration:none'>"+link1beschr+"</a><br><a href='"+link2adresse+"' style='text-decoration:none;color:black'>"+link2beschr+"</a>"+
				"<br><a href='"+link3adresse+"' style='color:black;text-decoration:none'>"+link3beschr+"</a>"
				"</td></tr></table></td></tr></table></div>";
				document.getElementsByTagName("body")[0].appendChild(container);

				function anzbuttonevents (element,index,array) {
								if (element.ausgewaehlt) {
	              				document.getElementById(element.id).addEventListener("click",buttonaktion,false);
	              }
	      }
	      button.forEach(anzbuttonevents);

	      function anzplunderevents (element,index,array) {
	      				if(element.ausgewaehlt) {
	              				document.getElementById(element.id).addEventListener("click",element.wechsel,false);
	              }
	      }
	      plunder.forEach(anzplunderevents);


				document.getElementById("einstellungen").addEventListener("click",einstzeigen, false);
				document.getElementById("mehrfunktionen").addEventListener("click",mehrfunktionen, false);
}

function einstzeigen() {
				//Wenn die Einstellungen schon einmal initialisiert wurden
				if(document.getElementById("settings")) {
								//Wenn die Einstellungen gerade ausgeblendet sind, einblenden
								if (document.getElementById("settings").style.display=="none") {
												document.getElementById("settings").style.display="block";
								//Wenn sie eingeblendet sind, ausblenden
								} else {
												document.getElementById("settings").style.display="none";
								}
				//Wenn die Einstellungen das erste Mal aufgerufen werden muss der gesamte HTML-Code und die dazugehoerigen Funktionen erst einmal erstellt werden
				} else {
        	      var speicherbuttons = new Array();
	              var speicherplunder = new Array();
	              var wuteinst = (wutwarner) ? "<input type='checkbox' id='wutwarnercheck' checked='checked'>" : "<input type='checkbox' id='wutwarnercheck'>";
	              var bandenkampfeinst = (bandenkampfwarner) ? "<input type='checkbox' id='bandenkampfwarnercheck' checked='checked'>" : "<input type='checkbox' id='bandenkampfwarnercheck'>";
	              function speichern() {
	                      //Ausgewaehlte Plunder speichern
	                      GM_setValue("einstgesetzt"+id+stadtbuchstabe,true);
	                      for (var i=1;i<=maxanzplunder;i++) {
	                              GM_deleteValue("plunder"+i+id+stadtbuchstabe)
	                      }
	                      speicherplunder.forEach(plunderspeichern);

	                      for(var i=0;i<=maxanzbuttons-1;i++) {
	                              GM_deleteValue("button"+i+id+stadtbuchstabe)
	                      }
	                      speicherbuttons.forEach(buttonsspeichern);

	                      GM_setValue("link1adresse"+id+stadtbuchstabe, document.getElementById("link1adresse").value);
	                      GM_setValue("link1beschr"+id+stadtbuchstabe, document.getElementById("link1beschr").value);
	                      GM_setValue("link2adresse"+id+stadtbuchstabe, document.getElementById("link2adresse").value);
	                      GM_setValue("link2beschr"+id+stadtbuchstabe, document.getElementById("link2beschr").value);
	                      GM_setValue("link3adresse"+id+stadtbuchstabe, document.getElementById("link3adresse").value);
	                      GM_setValue("link3beschr"+id+stadtbuchstabe, document.getElementById("link3beschr").value);
	                      GM_setValue("abstand", document.getElementById("abstandmenue").value);
	                      GM_setValue("promillegrenze"+id+stadtbuchstabe, document.getElementById("promillespeichern").value);
	                      GM_setValue("wutwarner"+id+stadtbuchstabe, document.getElementById("wutwarnercheck").checked);
	                      GM_setValue("bandenkampfwarner"+id+stadtbuchstabe, document.getElementById("bandenkampfwarnercheck").checked);
                        if(document.getElementById("wbplunderauswahl")[document.getElementById("wbplunderauswahl").selectedIndex]){
																GM_setValue("wbplunder"+id+stadtbuchstabe, document.getElementById("wbplunderauswahl")[document.getElementById("wbplunderauswahl").selectedIndex].value);
	                      } else {
	                      				GM_setValue("wbplunder"+id+stadtbuchstabe, false);
	                      }
												alert("fertig");
	                      location.reload();

	                      function plunderspeichern(element,index,array) {
	                              GM_setValue("plunder"+(index+1)+""+id+stadtbuchstabe,element);
	                      }



	                      function buttonsspeichern(element,index,array) {
	                                      GM_setValue("button"+index+id+stadtbuchstabe, element);
	                      }

	              }

	              function zuruecksetzen() {
	              				if(confirm("Diese Funktion loescht alle Spielerspezifischen Einstellungen wie Plunder oder anzuzeigende Buttons, soll sie wirklich ausgefuehrt werden?")) {
	              								for(var i=1;i<=maxanzplunder;i++) {
																				GM_deleteValue("plunder"+i+id+stadtbuchstabe);
																}
																for(var i=0;i<=maxanzbuttons-1;i++) {
																				GM_deleteValue("button"+i+id+stadtbuchstabe);
																}
																for(var i=1;i<=3;i++) {
																				GM_deleteValue("link"+i+"beschr"+id+stadtbuchstabe);
																				GM_deleteValue("link"+i+"adresse"+id+stadtbuchstabe);
																}
																GM_deleteValue("abstand");
																GM_deleteValue("einstgesetzt"+id+stadtbuchstabe);
																GM_deleteValue("promillegrenze"+id+stadtbuchstabe);
																GM_deleteValue("wutwarner"+id+stadtbuchstabe);
																GM_deleteValue("bandenkampfwarner"+id+stadtbuchstabe);
																GM_deleteValue("wbplunder"+id+stadtbuchstabe);
																alert("fertig");
																location.href = location.href;
												}
	              }

	              //Plunderlisten erstellen
	              var plunderliste ="";
	              var wbplunderauswahl = "";
	              function plunderlisten(element,index,array) {
	                      if (element.ausgewaehlt) {
	                              plunderliste += "<tr><td width='50%'><img src='"+element.bildurl+"' title='Anzahl: "+element.anzahl+"'></td><td>"+element.titel+"</td><td><input type='checkbox' id='"+element.id+"check' checked='checked'></td></tr>";
	                      } else {
	                              plunderliste += "<tr><td width='50%'><img src='"+element.bildurl+"' title='Anzahl: "+element.anzahl+"'></td><td>"+element.titel+"</td><td><input type='checkbox' id='"+element.id+"check'></td></tr>";
	                      }
	                      if(element.titel == "Kaputte Brille") wbplunderauswahl += '<option value="'+element.titel+'" selected="selected">Kaputte Brille (-6% auf alle WB)</option>';
	                      if(element.titel == "Lexikon") wbplunderauswahl += '<option value="'+element.titel+'">Lexikon (-10% auf DEX)</option>';
	                      if(element.titel == "Verdreckter Zauberstab") wbplunderauswahl +=  '<option value="'+element.titel+'">Verdreckter Zauberstab (-4% auf alle WB)</option>';
	              }
	              plunder.forEach(plunderlisten);

	              //Diese Funktion macht einen angeklickten Plunder zum Speichern bereit
	              function plunderzuordnen(evt) {
	                      var id = this.id;
	                      if(this.checked) {
	                              if(speicherplunder.length==maxanzplunder) {
	                                      alert("Sie koennen nicht mehr als "+maxanzplunder+" Plunder gleichzeitig anzeigen!");
	                                      this.checked=false;
	                              } else {
	                                      speicherplunder.push(this.id.substr(0,this.id.indexOf("check")));
	                              }
	                      } else {
	                              speicherplunder.forEach(deleteplunder);
	                      }
	                      function deleteplunder(element,index,array) {
	                              if(element==id.substr(0,id.indexOf("check"))) {
	                                      speicherplunder.splice(index,1)
	                              }
	                      }
	              }

	              //Buttonlisten erstellen
	              var buttonliste ="";
	              function buttonlisten(element,index,array) {
	                      if(element.ausgewaehlt) {
	                              buttonliste += "<tr><td>"+element.titel+"</td><td><input type='checkbox' id='"+element.id+"check' checked='checked'></td></tr>";
	                      } else {
	                              buttonliste += "<tr><td>"+element.titel+"</td><td><input type='checkbox' id='"+element.id+"check'></td></tr>";
	                      }
	              }
	              button.forEach(buttonlisten);

	              //Diese Funktion macht einen angeklickten Button zum Speichern bereit
	              function buttonzuordnen(evt) {
	                      var id = this.id;
	                      if(this.checked) {
	                              if(speicherbuttons.length==maxanzbuttons) {
	                                      alert("Sie koennen nicht mehr als "+maxanzbuttons+" Buttons gleichzeitig anzeigen!");
	                                      this.checked=false;
	                              } else {
	                                      speicherbuttons.push(this.id.substr(0,this.id.indexOf("check")));
	                              }
	                      } else {
	                              speicherbuttons.forEach(deletebutton);
	                      }
	                      function deletebutton(element,index,array) {
	                              if(element == id.substr(0,id.indexOf("check"))) {
	                                      speicherbuttons.splice(index,1)
	                              }
	                      }
	              }


	              var einstcontainer = document.createElement("div");
	              einstcontainer.setAttribute("style", "display:block;z-index:1000;position:absolute;top:20%;left:"+(((screen.width-760)/2)-15)+"px;width:760px;background-color:black;size:12pt;color:grey;padding:8px;-moz-border-radius:12px;");
	              einstcontainer.id = "settings";
	              einstcontainer.align = "left";
	              einstcontainer.innerHTML = "<table border='0' cellspacing='5' cellpadding='0'><tr align='center'><td>anzuzeigende Plunder ausw&auml;hlen:</td><td align='center'>Verschiedene Einstellungen</td><td align='center'>Buttons</td></tr><tr><td width='120'><table border='0' cellpadding='0' cellspacing='1' width='100%' style='font-size:9pt;'>"+plunderliste+"</table></td><td valign='top'><span style='font-weight:bold'>Benutzerdefinierte Links:</span><br><table><tr><td></td><td>URL</td><td>Beschriftung</td></tr><tr><td>Link 1</td><td><input type='text' size='20' id='link1adresse' value='"+link1adresse+"'></td><td><input type='text' size='20' id='link1beschr' value='"+link1beschr+"'></td></tr><tr><td>Link 2</td><td><input type='text' size='20' id='link2adresse' value='"+link2adresse+"'></td><td><input type='text' size='20' id='link2beschr' value='"+link2beschr+"'></td></tr><tr><td>Link 3</td><td><input type='text' size='20' id='link3adresse' value='"+link3adresse+"'></td><td><input type='text' size='20' id='link3beschr' value='"+link3beschr+"'></td></tr></table><br>Abstand des Men&uuml;s vom linken Bildschirmrand: <input type='text' size='3' value='"+abstand+"' id='abstandmenue'>px<br><br><span style='font-weight:bold'>Beim Benutzen der Trinken-Funktion soll der Alkoholpegel auf <input type='text' size='3' id='promillespeichern' value='"+kaufm(promillegrenze)+"'> Promille steigen.</span><br>(Wird der Weiterbildungsbutton benutzt, werden die Promille nat&uuml;rlich automatisch auf mindestens 2,50 Promille gebracht, die Trinkenfunktion kann z.B. benutzt werden, wenn man im Downfight ist und somit den Promillespiegel m&ouml;glichst hoch halten will)<br><br><span style='font-weight:bold'>Warnicons anzeigen f&uuml;r:</span><table><tr><td>Wutentfachung</td><td>"+wuteinst+"</td></tr><tr><td>Bandenk&auml;mpfe</td><td>"+bandenkampfeinst+"</td></tr></table><br><span style='font-weight:bold'>Welcher Plunder soll zum Weiterbilden benutzt werden? (Wenn der Weiterbildungs-Button benutzt wird)</span><br>(Lexikon wenn vorhanden nur f&uuml;r DEX-WB &uuml;ber 91 benutzen, Kaputte Brille f&uuml;r alle Weiterbildungen au&szlig;er DEX &uuml;ber 91, Zauberstab nur verwenden, wenn die Brille nicht vorhanden ist)<br><select id='wbplunderauswahl'>"+wbplunderauswahl+"</select><br><br><span style='font-weight:bold'>Hilfe zu den einzelnen Funktionen:</span><br><p style='font-size:9pt'><span style='font-weight:bold'>Weiterbilden</span><br>Zuerst werden die Promille des Penners auf mindestens 2,5&permil; gebracht (wenn m&ouml;glich mit dem Nikolaus-Plunder), danach wird wenn vorhanden der ebenfalls einstellbare Weiterbildungsplunder angelegt (Wenn keiner vorhanden ist, wird auch keiner angelegt) und schlie&szlig;lich wird auf die Weiterbildungsseite gewechselt.<br><span style='font-weight:bold'>Ern&uuml;chtern</span><br>Die Promille des Penners werden mit den vorhandenen Lebensmitteln unter das kritische Niveau von 0,75&permil; gebracht.<br><span style='font-weight:bold'>Spieler suchen</span><br>Man kann einen Spielernamen eingeben, der dann in den Highscores gesucht wird.<br><span style='font-weight:bold'>Lockfutter kaufen</span><br>Mit dieser Funktion kann man sich ein weiteres Lockfutter kaufen, welches als Geldvorrat f&uuml;r sp&auml;tere Weiterbildungen dienen kann (Geschmackssache ;-)<br><span style='font-weight:bold'>Besaufen</span><br>Der Alkoholpegel des Penners wird auf die eingestellte Promillezahl gebracht, nicht weniger und nicht mehr<br><span style='font-weight:bold'>Allgemeine Info:</span><br>Man kann bei diesem Skript aus allen vorhandenen Plundern diejenigen ausw&auml;hlen, die man angezeigt haben m&ouml;chte. Diese werden dann im Men&uuml; geladen, per Klick kann man sie dann anlegen/benutzen, beim Benutzen wird eine Sicherheitsabfrage gestartet. Der aktuell angelegte Plunder wird ganz oben rechts im Men&uuml; angezeigt. Zus&auml;tzlich besitzt das Men&uuml; einen eingebauten Angriffswarner, der in der zweiten Zeile des Men&uuml;s zu finden ist. In der dritten Zeile kann man die benutzerdefinierten Buttons einstellen, die die einzelnen Funktionen des Men&uuml;s repr&auml;sentieren, beim Klick z.B. auf die Lupe wird die Spieler-Suchen-Funktion aufgerufen, beim Klick auf das Lexikon die Weiterbildungsfunktion. Auch einen Wutentfachungs-Warner kann man einschalten, der unter dem Men&uuml; zus&auml;tzlich ein Icon anzeigt, welches informiert, ob die Wutentfachung in der Bande aktiv ist, wenn ja wie lange sie noch l&auml;uft und wann das n&auml;chste Mal Wutentfachung gestartet werden kann.</p></td><td valign='top'><table>"+buttonliste+"</table></td></tr></table><div style='position:absolute;bottom:8px;right:8px'><input type='button' id='reset' value='Reset'><input type='button' id='abbrechen' value='abbrechen'><input type='button' id='speichern' value='speichern'></div>";
	              document.body.appendChild(einstcontainer);

	              //************************************Alle moeglichen EventListener**************************************************************************
	              //Diese Funktion fuegt der Checkbox hinter jedem angezeigten Button einen EventListener hinzu, der die Funktion Buttonzuordnen beim Klick aufruft
	              function beventlistener(element,index,array) {
	                      document.getElementById(element.id+"check").addEventListener("click", buttonzuordnen,false);
	                      if (document.getElementById(element.id+"check").checked) {
	                              speicherbuttons.push(element.id);
	                      }
	              }
	              button.forEach(beventlistener);

	              //Diese Funktion fuegt der Checkbox hinter jedem Plunder einen Eventlistener hinzu, der die Funktion Plunderzuordnen beim Klick ausfuehrt
	              function peventlistener(element,index,array) {
	                      document.getElementById(element.id+"check").addEventListener("click",plunderzuordnen,false);
	                      if(document.getElementById(element.id+"check").checked) {
	                              speicherplunder.push(element.id);
	                      }
	              }
	              plunder.forEach(peventlistener);

	              //Event-Listener fuer die Einstellungen-Anzeigen-Ausblenden-Speicern-Buttons
	              document.getElementById("speichern").addEventListener("click", speichern, false);
	              document.getElementById("abbrechen").addEventListener("click", einstzeigen, false);
	          		document.getElementById("reset").addEventListener("click", zuruecksetzen, false);
				}
}
//Diese Funktionen kommen erst spaeter rein
function mehrfunktionen() {
				var inhalt = document.getElementById("mehrfktinhalt");
				var hauptteil = document.getElementById("hauptteil");
				if(inhalt) {
								if(inhalt.style.display=="none") {
												hauptteil.style.display = "none";
												inhalt.style.display = "block";
								} else {
												inhalt.style.display = "none";
												hauptteil.style.display = "block";
								}
				} else {
								hauptteil.style.display= "none";
								var mehrfktcontainer = document.createElement("div");
								mehrfktcontainer.setAttribute("style", "display:block;padding:0px 0 0 10px;");
								mehrfktcontainer.setAttribute("id", "mehrfktinhalt");
								mehrfktcontainer.setAttribute("align", "left");
								mehrfktcontainer.innerHTML = '<div style="cursor:pointer;position:absolute;top:152px;left:36px;" id="mehrfktzurueck">zur&uuml;ck</div>';
								var tabelle = document.createElement("table");
								tabelle.cellpadding = "0";
								tabelle.cellspacing = "0";
								tabelle.border = "0";
								var abfragen = ["Spendenzahl","anzspenden","Kampfwerte","kampfwerte", "Sauberkeit", "sauberkeit", "Bandenkasse", "bandenkasse"];
								var zeilen = new Array();
								for(var i=1; i<=(abfragen.length/4);i++) {
												zeilen[i-1] = document.createElement("tr");
												zeilen[i-1].setAttribute("style","font-size:9pt");
												tabelle.appendChild(zeilen[i-1]);
								}
								for(var i=0; i<=abfragen.length-1; i+=2) {
												var zelle = document.createElement("td");
												zelle.setAttribute("style", "background:url("+abgedunkelt_url+");background-repeat:no-repeat");
												zelle.setAttribute("width", "102");
												zelle.setAttribute("height", "40");
												zelle.setAttribute("align", "center");
												zelle.setAttribute("valign", "middle");
												zelle.innerHTML = "<span style='font-weight:bold'>"+abfragen[i]+"</span><br><table><tr><td><span id='"+abfragen[i+1]+"'>laden</span></td><td id='"+abfragen[i+1]+"bild' style='cursor:pointer;'><img src='"+reload_url+"'></td></tr></table>";
												zeilen[Math.floor((i+1)/4)].appendChild(zelle);
								}
								mehrfktcontainer.appendChild(tabelle);
								//mehrfktcontainer.innerHTML = "<table border='0' cellpadding='0' cellspacing='0'><tr style='font-size:9pt;'><td height='42' width='92' align='center' valign='middle' style='background:url("+abgedunkelt_url+")'>Spendenzahl<br>nicht geladen</td><td height='42' width='92' align='center' valign='middle' style='background:url("+abgedunkelt_url+")'>Let's-Fight<br>nicht geladen</td></tr></table>";
								document.getElementById("menuecontainer").appendChild(mehrfktcontainer);
								document.getElementById("mehrfktzurueck").addEventListener("click",mehrfunktionen,false);
								
								document.getElementById("anzspendenbild").addEventListener("click", function() {
												document.getElementById("anzspendenbild").innerHTML = "<img src='"+reloaddrehen_url+"'>";
												GM_xmlhttpRequest({
																method: "GET",
																url: basisurl+"/overview/",
																onload: function(responseDetails) {
																				if(responseDetails.status==200) {
                                                var spendenzahl = responseDetails.responseText.split("Du hast heute ")[1].split(" Spenden erhalten")[0];
																				        var maxspenden = (stadtbuchstabe=="b")?"/10":"/50";
																								document.getElementById("anzspenden").innerHTML = spendenzahl+maxspenden;
																				        document.getElementById("anzspendenbild").innerHTML = "<img src='"+reload_url+"'>";
																        } else {
																                document.getElementById("anzspenden").innerHTML = "Fehler!";
																				        document.getElementById("anzspendenbild").innerHTML = "<img src='"+reload_url+"'>";
																        }
                                },
																onerror: function(responseDetails) {
																				document.getElementById("anzspenden").innerHTML = "Fehler!";
																				document.getElementById("anzspendenbild").innerHTML = "<img src='"+reload_url+"'>";
																}
												});
								}, false);
								document.getElementById("kampfwertebild").addEventListener("click", function() {
												document.getElementById("kampfwertebild").innerHTML = "<img src='"+reloaddrehen_url+"'>";
												GM_xmlhttpRequest({
																method: "GET",
																url: basisurl+"/fight/",
																onload: function(responseDetails) {
																				if(responseDetails.status==200) {
                                                var att = responseDetails.responseText.split('<td width="80">ATT:</td>')[1].split('<td width="419">')[1].split("<a")[0];
																				        var def = responseDetails.responseText.split('<td>DEF:</td>')[1].split('<td>')[1].split("<a")[0];
																				        document.getElementById("kampfwerte").innerHTML = "A:"+att+"/D:"+def;
																				        document.getElementById("kampfwertebild").innerHTML = "<img src='"+reload_url+"'>";
																        } else {
																                document.getElementById("kampfwerte").innerHTML = "Fehler!";
																				        document.getElementById("kampfwerte").innerHTML = "<img src='"+reload_url+"'>";
																        }
                                },
																onerror: function(responseDetails) {
																				document.getElementById("kampfwerte").innerHTML = "Fehler!";
																				document.getElementById("kampfwertebild").innerHTML = "<img src='"+reload_url+"'>";
																}
												});
								}, false);
								document.getElementById("sauberkeitbild").addEventListener("click", function() {
												document.getElementById("sauberkeitbild").innerHTML = "<img src='"+reloaddrehen_url+"'>";
												GM_xmlhttpRequest({
																method: "GET",
																url: basisurl+"/overview/",
																onload: function(responseDetails) {
																				if(responseDetails.status==200) {
                                                var reg = /\d{1,3}/mg;
																				        var sauberkeit = reg.exec(responseDetails.responseText.split('<div class="processbar_clean"')[1].split('<ul class="status">')[0]);
																				        document.getElementById("sauberkeit").innerHTML = sauberkeit+"%";
																				        document.getElementById("sauberkeitbild").innerHTML = "<img src='"+reload_url+"'>";
																        } else {
																                document.getElementById("sauberkeit").innerHTML = "Fehler!";
																				        document.getElementById("sauberkeitbild").innerHTML = "<img src='"+reload_url+"'>";
																        }
                                },
																onerror: function(responseDetails) {
																				document.getElementById("sauberkeit").innerHTML = "Fehler!";
																				document.getElementById("sauberkeitbild").innerHTML = "<img src='"+reload_url+"'>";
																}
												});
								}, false);	
								document.getElementById("bandenkassebild").addEventListener("click", function() {
												document.getElementById("bandenkassebild").innerHTML = "<img src='"+reloaddrehen_url+"'>";
												GM_xmlhttpRequest({
																method: "GET",
																url: basisurl+"/gang/",
																onload: function(responseDetails) {
																				if(responseDetails.status==200) {
																								var geld = responseDetails.responseText.split("<td>Kasse: ")[1].split(",00")[0];
																				        document.getElementById("bandenkasse").innerHTML = geld;
																				        document.getElementById("bandenkassebild").innerHTML = "<img src='"+reload_url+"'>";
																        } else {
																                document.getElementById("bandenkasse").innerHTML = "Fehler!";
																				        document.getElementById("bandenkassebild").innerHTML = "<img src='"+reload_url+"'>";
																        }
                                },
																onerror: function(responseDetails) {
																				document.getElementById("bandenkasse").innerHTML = "Fehler!";
																				document.getElementById("bandenkassebild").innerHTML = "<img src='"+reload_url+"'>";
																}
												});
								}, false);
								/*
								document.getElementById("").addEventListener("click", function() {
												document.getElementById("resturlaubbild").innerHTML = "<img src='"+reloaddrehen_url+"'>";
												GM_xmlhttpRequest({
																method: "GET",
																url: basisurl+"/settings/",
																onload: function(responseDetails) {
																				if(responseDetails.status==200) {
                                                var freietage = responseDetails.responseText.split('Noch freie Tage: <b>')[1].split('</b>')[0];
																				        document.getElementById("resturlaub").innerHTML = freietage+" Tage";
																				        document.getElementById("resturlaubbild").innerHTML = "<img src='"+reload_url+"'>";
																        } else {
																                document.getElementById("resturlaub").innerHTML = "Fehler!";
																				        document.getElementById("resturlaubbild").innerHTML = "<img src='"+reload_url+"'>";
																        }
                                },
																onerror: function(responseDetails) {
																				document.getElementById("resturlaub").innerHTML = "Fehler!";
																				document.getElementById("resturlaubbild").innerHTML = "<img src='"+reload_url+"'>";
																}
												});
								}, false);*/								
				}
}
//Wenn die aktuelle Seite die Bandenkampfuebersichtsseite ist
if(/\/gang\/fight\/$/.test(document.location.href)) {
				for(i in document.getElementsByTagName("tr")) {
								var tr = document.getElementsByTagName("tr")[i];
								if(/\d{3,7}/.test(tr.id)) {
												if(tr.innerHTML.indexOf("/gang/fight/view/"+tr.id+"/")>=0) {
																var bandenname=tr.childNodes[1].innerHTML.substring(6);
																ersetzebande(tr,bandenname);
												}
								}
				}
}

function ersetzebande(tr,bandenname) {
				GM_xmlhttpRequest({
								method:"GET",
								url: basisurl+'/highscore/gang/?gang='+formatstring(bandenname)+'&min=&max=',
								onload: function(responseDetails) {
												var inhalt = responseDetails.responseText;
												if(inhalt.indexOf("Klicke hier, um zur Kampfseite zu gelangen">=0)) {
																if(inhalt.indexOf('/">'+bandenname+'</a>')>=0) {
																				var teil1 = inhalt.split('/">'+bandenname+'</a>')[0];
																				var teil2 = teil1.split("bande:");
																				var id = teil2[teil2.length-1];
																				tr.childNodes[1].innerHTML = '&nbsp<a href="'+basisurl+'/profil/bande:'+id+'/" target="_self">'+bandenname+'</a>';
																} else {
																				alert("Die Bande "+bandenname+" konnte nicht gefunden werden!");
																}
												} else {
																if(confirm("Beim Zuordnen des Links zum Bandennamen ist ein Fehler aufgetreten, soll es erneut versucht werden?")) {
																				ersetzebande(tr,bandenname);
																}
												}
								},
								onerror: function(responseDetails) {
												if(confirm("Beim Zuordnen des Links zum Bandennamen ist ein Fehler aufgetreten, soll es erneut versucht werden?")) {
																ersetzebande(tr,bandenname);
												}
								}
			  });
}

}
