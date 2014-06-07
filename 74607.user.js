// ==UserScript==
// @name           Angriffsalarm
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php*
// @include        http://david97.kilu.de/leer.html*
// ==/UserScript==

if(typeof GM_getValue("alarmsound") == "undefined")
{
 GM_setValue("alarmsound", "http://david97.kilu.de/alert.mp3");
}
if(typeof GM_getValue("neuladen") == "undefined")
{
 GM_setValue("neuladen", "30");
}
if(typeof GM_getValue("email") == "undefined")
{
 GM_setValue("email", true);
}
if(typeof GM_getValue("empfaenger") == "undefined")
{
 GM_setValue("empfaenger", "meine@email.de");
}
if(typeof GM_getValue("betreff") == "undefined")
{
 GM_setValue("betreff", "Angriff auf ZIELDORF von ANGREIFER - ANKUNFT!");
}


if(document.URL.search(/settings/) != -1)
{
 var ueberschrift = document.createElement("tr");
 var ueberschrift2 = document.createElement("th");
 ueberschrift2.innerHTML = "<a href='http://userscripts.org/scripts/show/74607' target='_blank'>Angriffsalarm</a>";
 ueberschrift2.setAttribute("colspan","2");
 ueberschrift.appendChild(ueberschrift2);
 document.getElementsByClassName("vis settings")[0].appendChild(ueberschrift);



 var sound = document.createElement("tr");
 var sound2 = document.createElement("td");
 var sound21 = document.createElement("td");
 sound2.innerHTML = "Alarmsound: "+GM_getValue("alarmsound")+"";
 sound21.innerHTML = "<a href='"+document.URL+"&aendern=alarmsound'>Ändern</a>";
 sound.appendChild(sound2);
 sound.appendChild(sound21);
 document.getElementsByClassName("vis settings")[0].appendChild(sound);




 var neuladen = document.createElement("tr");
 var neuladen2 = document.createElement("td");
 var neuladen21 = document.createElement("td");
 neuladen2.innerHTML = "Neulade-Intervall <span class='grey'>(in Sekunden)</span>: "+GM_getValue("neuladen")+"";
 neuladen21.innerHTML = "<a href='"+document.URL+"&aendern=neuladen'>Ändern</a>";
 neuladen.appendChild(neuladen2);
 neuladen.appendChild(neuladen21);
 document.getElementsByClassName("vis settings")[0].appendChild(neuladen);



 var email = document.createElement("tr");
 var email2 = document.createElement("td");
 var email21 = document.createElement("td");
 email2.innerHTML = "E-Mail senden oder nicht? <span class='grey'>(true = ja; false = nein)</span>: "+GM_getValue("email")+"";
 email21.innerHTML = "<a href='"+document.URL+"&aendern=email'>Ändern</a>";
 email.appendChild(email2);
 email.appendChild(email21);
 document.getElementsByClassName("vis settings")[0].appendChild(email);



 var empfaenger = document.createElement("tr");
 var empfaenger2 = document.createElement("td");
 var empfaenger21 = document.createElement("td");
 empfaenger2.innerHTML = "Deine E-Mail-Adresse: "+GM_getValue("empfaenger")+"";
 empfaenger21.innerHTML = "<a href='"+document.URL+"&aendern=empfaenger'>Ändern</a>";
 empfaenger.appendChild(empfaenger2);
 empfaenger.appendChild(empfaenger21);
 document.getElementsByClassName("vis settings")[0].appendChild(empfaenger);



 var betreff = document.createElement("tr");
 var betreff2 = document.createElement("td");
 var betreff21 = document.createElement("td");
 betreff2.innerHTML = "Betreff der E-Mail <span class='grey'>(„ZIELDORF“, „ANGREIFER“ und „ANKUNFT“ werden automatisch jeweils passend ersetzt)</span>: "+GM_getValue("betreff")+"";
 betreff21.innerHTML = "<a href='"+document.URL+"&aendern=betreff'>Ändern</a>";
 betreff.appendChild(betreff2);
 betreff.appendChild(betreff21);
 document.getElementsByClassName("vis settings")[0].appendChild(betreff);
}

if(document.URL.search(/settings/) != -1 && document.URL.search(/aendern/) != -1)
{
 if(document.URL.split("&")[document.URL.split("&").length-1].search(/alarmsound/) != -1)
 {
  alt = GM_getValue("alarmsound");
  var neu = prompt("Alarmsound:",alt);
  GM_setValue("alarmsound", neu);
 }



 if(document.URL.split("&")[document.URL.split("&").length-1].search(/neuladen/) != -1)
 {
  alt = GM_getValue("neuladen");
  var neu = prompt("Neulade-Intervall:",alt);
  GM_setValue("neuladen", neu);
 }



 if(document.URL.split("&")[document.URL.split("&").length-1].search(/email/) != -1)
 {
  alt = GM_getValue("email");
  var neu = prompt("E-Mail senden oder nicht? (true = ja; false = nein):",alt);
  GM_setValue("email", neu);
 }



 if(document.URL.split("&")[document.URL.split("&").length-1].search(/empfaenger/) != -1)
 {
  alt = GM_getValue("empfaenger");
  var neu = prompt("Deine E-Mail-Adresse:",alt);
  GM_setValue("empfaenger", neu);
 }



 if(document.URL.split("&")[document.URL.split("&").length-1].search(/betreff/) != -1)
 {
  alt = GM_getValue("betreff");
  var neu = prompt("Betreff der E-Mail („ZIELDORF“, „ANGREIFER“ und „ANKUNFT“ werden automatisch jeweils passend ersetzt):",alt);
  GM_setValue("betreff", neu);
 }



 window.location.href = window.location.href.replace(/&aendern=.*/,"");
}






var alarm_sound = GM_getValue("alarmsound");
var neuladen_zeit = GM_getValue("neuladen");
var email_versenden = GM_getValue("email");
var empfaenger = GM_getValue("empfaenger");
var betreff = GM_getValue("betreff");


if(document.URL.search(/de.*\.die-staemme\.de.*/) != -1 && document.URL.search(/overview_villages/) != -1 && document.URL.search(/ueberwachung/) == -1)
{
 var gruppe = document.URL.search(/(&group=\d+)/);
 if(gruppe != -1)
 {
  gruppe = RegExp.$1;
  GM_setValue("gruppe",gruppe);
 }
 var mode = document.getElementsByClassName("selected")[0].getElementsByTagName("a")[0].href.search(/(&mode=\w+)/);
 mode = RegExp.$1;
 GM_setValue("mode",mode);
}
if(typeof GM_getValue("gruppe") != "undefined")
{
 document.getElementById("menu_row2").getElementsByTagName("a")[0].href += GM_getValue("mode")+GM_getValue("gruppe");
 for(var i=0;i<document.getElementsByClassName("menu_column")[6].getElementsByTagName("a").length;i++)
 {
  document.getElementsByClassName("menu_column")[6].getElementsByTagName("a")[i].href += GM_getValue("gruppe");
 }
}
if(document.URL.search(/de.*\.die-staemme\.de.*/) != -1 && document.URL.search(/overview_villages/) != -1 && document.getElementsByClassName("selected")[0].innerHTML.search(/Kombiniert/) != -1)
{
 link = document.createElement("tr");
 linki = document.createElement("td");
 linkii = document.createElement("a");
 linkii.href = "#";
 var seite = document.URL.replace(/combined/,"incomings");
 if(document.URL.search(/combined/) == -1)
 {
  seite += "&mode=incomings";
 }
 seite += "&type=all&subtype=attacks&group=0#ueberwachung";
 linkii.setAttribute("onclick","javascript:fenster = window.open('"+seite+"','','height=1,width=1');fenster.blur();");
 linkii.innerHTML = "<center>Überwachung starten</center>";
 linki.appendChild(linkii);
 link.appendChild(linki);
 document.getElementById("combined_table").appendChild(link);

 
 link = document.createElement("tr");
 linki = document.createElement("td");
 linkii = document.createElement("a");
 linkii.href = "#";
 linkii.setAttribute("onclick","javascript:fenster = window.open('http://david97.kilu.de/leer.html?zeige_angriffe','','height=500,width=1000,scrollbars=yes');");
 linkii.innerHTML = "<center>Angriffe anzeigen</center>";
 linki.appendChild(linkii);
 link.appendChild(linki);
 document.getElementById("combined_table").appendChild(link);
}

if(document.URL.search(/de.*\.die-staemme\.de/) != -1 && document.URL.search(/ueberwachung/) != -1) //Prüfen, ob Überwachung läuft
{
 if(typeof document.getElementsByClassName("middle")[0] != "undefined") //Prüfen, ob Angriffe laufen
 {
  var ausdruck = /\((\d+)\)/; //Anzahl der Incomings herausfinden
  var incomings = ausdruck.exec(document.getElementsByClassName("middle")[0].parentNode.innerHTML)[1]; //Anzahl der Incomings
  var zieldorf;
  var angreifer;
  var ankunftszeit;
  var zeit_bis_ankunft;
  var link;
  var angriff;
  var id_suche = /id=(\d+)/;
  var alarmfenster;
  for(var i=1;i<=incomings;i++) //Daten notieren
  {
   zieldorf = document.getElementById("incomings_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[1].getElementsByTagName("a")[0].innerHTML; //Zieldorf
   angreifer = document.getElementById("incomings_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].getElementsByTagName("a")[0].innerHTML; //Angreifer
   ankunftszeit = document.getElementById("incomings_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[3].innerHTML; //Ankunftszeit
   zeit_bis_ankunft = document.getElementById("incomings_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[4].getElementsByTagName("span")[0].innerHTML; //Zeit bis Ankunft
   link = document.getElementById("incomings_table").getElementsByTagName("tr")[i].getElementsByTagName("td")[0].getElementsByTagName("a")[0].href; //Link zum Angriff
   angriff = id_suche.exec(link)[1]; //ID des Angriffs
   alarmtext = angreifer+" <a href='"+link+"'>greift</a> "+zieldorf+" <a href='"+link+"'>an</a>! Ankunft: "+ankunftszeit+". Es dauert noch <b>"+zeit_bis_ankunft+"</b>! Es ist jetzt "+document.getElementById("serverTime").innerHTML+" Uhr";
   alarmtext_email = angreifer+" <a href='"+link+"'>greift</a> "+zieldorf+" <a href='"+link+"'>an</a>!NZAnkunft: "+ankunftszeit+".NZEs dauert noch <b>"+zeit_bis_ankunft+"</b>!NZEs ist jetzt "+document.getElementById("serverTime").innerHTML+" Uhr";
   if(typeof GM_getValue(angriff) == "undefined")
   {
    GM_setValue(angriff,alarmtext);
    alarmfenster = window.open("","","height=1,width=800");
    alarmfenster.document.body.innerHTML = '<embed src="'+unescape(alarm_sound)+'" autostart=true loop=true hidden=true>'+alarmtext+'<br>Um Alarmsound zu beenden, dieses Fenster <a href="#" onclick="javascript:self.close();">schließen</a>';
    if(email_versenden)
    {
     betreff = betreff.replace(/ZIELDORF/,zieldorf).replace(/ANGREIFER/,angreifer).replace(/ANKUNFT/,ankunftszeit);
     email = window.open("http://david97.bplaced.net/ds_mail.php?an="+empfaenger+"&betreff="+escape(betreff)+"&nachricht="+escape(alarmtext_email),"","height=1,width=1");
    }
   }
  }
 }
 window.setTimeout("window.location.reload();",neuladen_zeit*1000);
}
if(document.URL.search(/zeige_angriffe/) != -1)
{
 var alarmtext_fertig = "";
 for(var i=0;i<GM_listValues().length;i++)
 {
  if(isNaN(GM_listValues()[i]) == false)
  {
   alarmtext_fertig += GM_getValue(GM_listValues()[i])+" - <i><a href='http://david97.kilu.de/leer.html?loesche"+GM_listValues()[i]+"'>Löschen</a></i><br>";
  }
 }
 alarmtext_fertig += "<br><i><a href='http://david97.kilu.de/leer.html?alles_loeschen'>Alles löschen</a></i>";
 document.body.innerHTML = alarmtext_fertig;
}
if(document.URL.search(/loesche\d+/) != -1)
{
 var id = document.URL.search(/loesche(\d+)/);
 id = RegExp.$1;
 GM_deleteValue(id);
 window.location.href = "http://david97.kilu.de/leer.html?zeige_angriffe";
}
if(document.URL.search(/alles_loeschen/) != -1)
{
 var keys = GM_listValues();
 for (var i=0, key=null; key=keys[i]; i++) {
   if(isNaN(parseInt(key)) == false)
   {
    GM_deleteValue(key);
   }
 }
 window.location.href = "http://david97.kilu.de/leer.html?zeige_angriffe";
}