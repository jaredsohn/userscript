// ==UserScript==
// @name           d13zusatz
// @namespace      gilde
// @description    alles was wir noch brauchen
// @include        http://www.dragosien.de/*
// @include        http://www.dragosien.com/*
// @include        http://dragosien.de/*
// ==/UserScript==


// Namen der Funktionen = Ids der Checkboxen = gespeicherte GMValues
var wert = ["update", "marktnumm", "bbcode", "karte", "schatz", "link", "gchat", "nlink", 
"menge", "menue", "garena", "sitter", "warn_zustand", "z_sort", "table", "dr_ei", "lager", 
"orakel", "bauherr", "g_stadt","m_list","b_fort","wette","ga_sort","paarungen","turnierplan",
"drcolor"];
// Bezeichungen in der Konfiguration
var bez = ["Pr&uuml;fe auf Updates", "Markt&shy;nummerierung", "BB-Codes", "Karten&shy;navigation", 
"Schatzkarten-Teleport","Gildenchat Links klickbar machen", "Gildenchat gr&ouml;&szlig;eres Eingabe&shy;feld", 
"Nachrichten&shy;links klickbar machen", "Eingabe Tausender-Mengen", "Markt im Haupt&shy;men&uuml;", 
"Arenatab in der Gilden&shy;halle", "Sitter merken", "Warnung bei schlechtem Zustand", 
"Zustandsliste sortieren", "Tabellen&shy;darstellung", "Dracheneier ausblenden", 
"Lager als Geb&auml;ude sichtbar", "Orakelvorhersage zu Spielen", "Baukosten ohne Bauherr-Ersparnis anzeigen", 
"Gildenstadt","Einkaufs&shy;liste","Baufortschritts&shy;anzeige","Wetteinsatz merken","Gildenarena-Tabelle sortieren",
"Paarungen nach Mannschaften sortieren","Turnierplan-Ansicht verbessern","Drachenfarbe anzeigen"];
var version = "2.6.3";
// Überschriftzeile
var line = document.getElementById("drag_line");
//Rechter Seitenrand
var rand = document.getElementById("mainRight");
//Serverzeit
if (document.getElementById("footer")) {
  var serverzeit = /Serverzeit: (\d+\.\d+\.\d+ \d+:\d+:\d+) Uhr/.exec(document.getElementById("footer").innerHTML)[1].replace(/\.|\s|:/g, ";"); }
if(document.getElementById("userinfo")) {
  var user=/Name:.* (.*)<br>/.exec(document.getElementById("userinfo").innerHTML)[1]; }



/*************************************************/
// Tabellencode in richtige Tabelle umwandeln
function table_insert(elm,nr) {
  var ort=line.parentNode.getElementsByTagName(elm)[nr];
if (elm=="h3") { ort=ort.nextSibling.nextSibling.nextSibling.nextSibling; }
  var inhalt;
  if (ort.getElementsByTagName("textarea")[0]) {
    inhalt=ort.getElementsByTagName("textarea")[0].innerHTML.toString();
  }
  var tabelle=ort.innerHTML.toString();
  var breite;
  tabelle=tabelle.replace(/\|(\s*<\/)|\|( *\n<br>\n[^\|\^])|\|(\s*<p)/g, "<\/td><\/tr><\/tbody><\/table>$1$2$3");
  tabelle=tabelle.replace(/\^(\s*<\/)|\^( *\n<br>\n[^\|\^])|\^(\s*<p)/g, "<\/th><\/tr><\/tbody><\/table>$1$2$3");
  for(i=10;i>0;i=i-1) {
    if (i!=1) { breite=" colspan=\""+i+"\""; }
    else { breite=""; }
    e=new RegExp("([^\\^\\\|]\\n<br>\\n)\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(e, "$1<table class=\"table\"><tbody><tr><th"+breite+">$2");
    f=new RegExp("(h3|td|en\\;\\\")(>\\s*)\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(f, "$1$2<table class=\"table\"><tbody><tr><th"+breite+">$3");
    h=new RegExp("([^\\^\\\|]\\n<br>\\n)\\\|\{"+i+"\}([\^\\\|])","g");
    tabelle=tabelle.replace(h, "$1<table class=\"table\"><tbody><tr><td"+breite+">$2");
    k=new RegExp("(h3|td|en\\;\\\")(>\\s*)\\\|\{"+i+"\}([\^\\\|])","g");
    tabelle=tabelle.replace(k, "$1$2<table class=\"table\"><tbody><tr><td"+breite+">$3");
    g=new RegExp("(<div style=\\\"text-align: center\\;\\\">\\s*)\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(g, "<div><table class=\"table\" align=\"center\" style=\"margin-left:auto;margin-right:auto;\"><tbody><tr><th"+breite+">$2");
    l=new RegExp("(<div style=\\\"text-align: center\\;\\\">\\s*)\\\|\{"+i+"\}([\^\\\|])","g");
    tabelle=tabelle.replace(l, "<div><table class=\"table\" align=\"center\" style=\"margin-left:auto;margin-right:auto;\"><tbody><tr><td"+breite+">$2");
    a=new RegExp("\\n\\^\{"+i+"\}([\^\\^])","g");
    tabelle=tabelle.replace(a, "<tr><th"+breite+">$1");
    c=new RegExp("\\n\\\|\{"+i+"\}([^\\^])","g");
    tabelle=tabelle.replace(c, "<tr><td"+breite+">$1");
  }
  tabelle=tabelle.replace(/\^ *\n/g, "<\/th><\/tr>\n");
  tabelle=tabelle.replace(/\| *\n/g, "<\/td><\/tr>\n");
  for(i=10;i>0;i=i-1) {
    if (i!=1) { breite=" colspan=\""+i+"\""; }
    else { breite=""; }
    b=new RegExp("\\^\{"+i+"\}([^\\^\\n])","g");
    tabelle=tabelle.replace(b, "<\/th><th"+breite+">$1");
    d=new RegExp("\\\|\{"+i+"\}([^\\^\\n])","g");
    tabelle=tabelle.replace(d, "<\/td><td"+breite+">$1");
  }
  if (tabelle.search(/<table/g)==-1) {
    tabelle=tabelle.replace(/^\s*<\/t(d|h)>/g, "<table class=\"table\"><tbody><tr>");
  }
  tabelle=tabelle.replace(/<t(d|h)>\s*$/g, "<\/tbody><\/table>");
  ort.innerHTML=tabelle;

  var z=ort.getElementsByTagName("table");
  for(k=0;k<z.length;k++) {
    z[k].innerHTML=z[k].innerHTML.replace(/<br>/g, "");
  }
  if (ort.getElementsByTagName("textarea")[0]) {
    ort.getElementsByTagName("textarea")[0].innerHTML=inhalt;
  }
}
// Spalten abfragen
function t_tr() {
  var spalten=prompt("Gebe die Anzahl der Spalten ein, die die Tabelle haben soll.", "");
  spalten=parseInt(spalten.toString().replace(/\D/g, ""));
  if (isNaN(spalten)) {
    spalten=prompt("Ung\u00fcltiger Wert.\nBitte gib die Anzahl der Spalten, die die Tabelle haben soll, als eine Zahl ein.");
    spalten=parseInt(spalten.toString().replace(/\D/g, ""));
    if (isNaN(spalten)) { 
      spalten=prompt("Also gut, nochmal gaaanz langsam:\nDu willst eine Tabelle erstellen. Dazu musst du wissen"
      +" wie viele Spalten - das sind die senkrechten Dinger nebeneinander - sie haben soll.\n"
      +"Und diese Zahl sollst du jetzt hier eingeben. Und zwar als Zahl - das sind die Dinger aus dem Mathematikunterricht.\n"
      +"Das hier ist z.B. eine Zahl: 6\nWenn du es jetzt verstanden hast, dann gib diese Zahl bitte hier ein:");
      spalten=parseInt(spalten.toString().replace(/\D/g, ""));
      if (isNaN(spalten)) { alert("Ich geb's auf!"); return false; }
    }
  }
  if (spalten>20) {
    alert(spalten+" sind aber zu viele Spalten. Die Anzahl wurde auf 20 begrenzt.");
    spalten=20;  
  }
  if (spalten==0) {
    alert("Eine Tabelle muss mindestens eine Spalte haben.");
    return t_tr();
  }
  return t_th(spalten);
}
//Kopfzeilen abfragen
function t_th(spalten) {
  var kopf=prompt("Gebe die Anzahl der Kopfzeilen ein, die die Tabelle haben soll.\n"
  +"Kopfzeilen sind für die Überschriften der Spalten. Standard ist\n eine Kopfzeile. Du kannst aber auch mehr,\n"
  +"oder aber keine haben.","1");
  kopf=parseInt(kopf.toString().replace(/\D/g, ""));
  if (isNaN(kopf)) {
    kopf=prompt("Ung\u00fcltiger Wert.\nBitte gib die Anzahl der Kopfzeilen, die die Tabelle haben soll, als eine Zahl ein.", "1");
    kopf=parseInt(kopf.toString().replace(/\D/g, ""));
    if (isNaN(kopf)) { 
      kopf=prompt("Noch ein Versuch:\nGibt die Anzahl der Kopfzeilen f\u00fcr deine Tabelle ein.\n"
     +"Oder lass doch einfach die \"1\" stehen.", "1");
       kopf=parseInt(kopf.toString().replace(/\D/g, ""));
       if (isNaN(kopf)) { alert("Dann eben nicht!"); return false; }
    }
  }
  if (kopf>5) {
    confirm(kopf+" sind zu viele Kopfzeilen. Die Anzahl wurde auf 5 begrenzt.");
    kopf=5;
  }
  return t_td(spalten,kopf);
}
// Tabellenzeilen abfragen
function t_td(spalten,kopf) {
  var reihen=prompt("Gebe die Anzahl der K\u00f6rperzeilen ein, die die Tabelle haben soll.\n"
  +"Das sind alle Zeilen unterhalb der Kopfzeile.", "");
  reihen=parseInt(reihen.toString().replace(/\D/g, ""));
  if (isNaN(reihen)) {
    reihen=prompt("Ung\u00fcltiger Wert.\nBitte gib die Anzahl der Zeilen, die die Tabelle haben soll, als eine Zahl ein.", "");
    reihen=parseInt(reihen.toString().replace(/\D/g, ""));
    if (isNaN(reihen)) { 
      reihen=prompt("Das kann doch nicht so schwer sein:\nWie viele Zeilen soll deine Tabelle untereinander"
      +" haben?\nGib diese Zahl hier ein.");
      reihen=parseInt(reihen.toString().replace(/\D/g, ""));
      if (isNaN(reihen)) { alert("Du bist ein hoffnungsloser Fall!"); return false; }
    }
  }
  if (reihen==0) {
    alert("Eine Tabelle muss mindestens eine Zeile haben.");
    return t_td();
  } 
  if (reihen>80) {
    alert(reihen+" sind zu viele Tabellenzeilen. Die Anzahl wurde auf 80 begrenzt.");
    reihen=80;
  }
  return t_erstellen(spalten,kopf,reihen);
}
// Tabellencode erstellen
function t_erstellen(spalten,kopf,reihen) {
  var table_new="";
  for(i=0;i<kopf;i++) {
    for(k=0;k<spalten;k++) {
      table_new+="\^ ";
    }
    table_new+="\^\n";
  }
  for(i=0;i<reihen;i++) {
    for(k=0;k<spalten;k++) {
      table_new+="\| ";
    }
    table_new+="\|\n";
  }
  t_einfuegen(table_new);
}
// Tabellencode in Textfeld einfügen
function t_einfuegen(table_new) {
  var input = document.getElementsByTagName("textarea")[0];
  var scrollpos = input.scrollTop;
  input.focus();
  var end = input.selectionEnd;
  input.value = input.value.substr(0, end) + table_new + input.value.substr(end);
  pos = end + table_new.length;
  input.selectionStart = pos;
  input.selectionEnd = pos;
  input.scrollTop = scrollpos;
}
// Button zum Tabelle Erstellen
function generator_button(x) {
  if (document.getElementsByTagName("textarea")[0]) {
    var hierhin;
    if (x==1) { hierhin=line.parentNode.getElementsByTagName("table")[0].getElementsByTagName("input")[3]; }
    else { hierhin=document.getElementsByTagName("textarea")[0].parentNode.getElementsByTagName("input")[3]; }
    var generator=document.createElement("input");
    generator.type="button";
    generator.id="table_button";
    generator.value="Tabelle erstellen";
    generator.style.marginRight="0.5em";
    hierhin.parentNode.insertBefore(generator, hierhin);
    generator.addEventListener("click",t_tr,false);
  }
}

// Passende Seiten finden
function table() {
  if (line) {
    if (line.innerHTML.search(/Gildenhalle/)!=-1&&line.parentNode.getElementsByTagName("ul")[0]) {
      if (line.parentNode.getElementsByTagName("h3")[0]) {
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.search(/Punkte/)!=-1) {
          table_insert("div",3);
        }
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.search(/News/)!=-1) {
          table_insert("div",3);
          generator_button();
        }
        if (line.parentNode.getElementsByTagName("h3")[0].innerHTML.search(/Gildenprofil/)!=-1) {
          table_insert("h3",0);
          generator_button(1);
        }
      }
    }
    if (line.innerHTML.search(/Profil von/)!=-1) {
      table_insert("div",4);
    }
    if (line.innerHTML.search(/Profil der Gilde/)!=-1) {
      table_insert("div",3);
    }
    if (line.innerHTML.search(/Drachenzucht/)!=-1) {
      if (line.parentNode.getElementsByTagName("ul")[0]&&line.parentNode.getElementsByTagName("ul")[0].getElementsByTagName("a")[2].className=="active") {
        table_insert("table",0);
        generator_button();
      }
    }
  }
}

table();
