// ==UserScript==
// @name           Dragosien BBCodes
// @namespace      Uranos
// @description    fügt BBCodes mit einfachem Klick in den Profilseiten auf Dragosien ein
// @include        http://www.dragosien.de/*
// @include        http://www.dragosien.com/*
// @include        http://test.dragosien.de/*
// @include        http://speed.dragosien.de/*
// @include        http://dragosien.de/*
// @include        http://neu.dragosien.de/*n
// @exclude        http://dragosien.de/forum*
// @author         Uranos
// ==/UserScript==


function anzeigen() {
var einblenden = document.createElement("script");
var inhalt = document.createTextNode("function insert(aTag, eTag) {\n    var input = document.getElementsByTagName(\"textarea\")[0]; \nvar scrollpos = input.scrollTop;\n  input.focus();\n  var start = input.selectionStart;\n  var end = input.selectionEnd;\n  var insText = input.value.substring(start, end);\n  input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);\n  var pos;\n  if (insText.length == 0) {\n    pos = start + aTag.length;\n  } else {\n    pos = start + aTag.length + insText.length + eTag.length;\n  }\n  input.selectionStart = pos;\n  input.selectionEnd = pos;\ninput.scrollTop = scrollpos;\nif (document.getElementById(\"farben\").style.display = \"block;\") {\nwegdamit();\n}\n}\n\nfunction zeigen() {\ndocument.getElementById(\"farben\").style.display = \"block\"; }\nfunction wegdamit() {\ndocument.getElementById(\"farben\").style.display = \"none\"; }\n");
einblenden.appendChild(inhalt);
var kopf = document.getElementsByTagName("head")[0];
kopf.appendChild(einblenden);
var styling = document.createElement("style");
var styleinhalt = document.createTextNode("#farben {\ndisplay:none;\nposition:absolute;\nbackground-color:#DBD1C8;\npadding:0px;\nborder:2px solid #3C1E00;\n}\n#farbwahl td {\nwidth:20px;\nheight:20px;\ncursor:crosshair;\nborder:1px solid black;\n}\n#farbwahl th {\ntext-align:center;\nvertical-align:middle;\nborder-style:none;\n}\n#ftkopf {\ncolor:#3C1E00;\nfont-size:0.8em\n}\n#ftaus {\ncursor:pointer;\ncolor:#ffffff;\nfont-weight:normal;\nbackground-color:#3D342B;}");
styling.appendChild(styleinhalt);
kopf.appendChild(styling);
}

function farbbox() {
var einblenden = document.createElement("div");
var attr = document.createAttribute("id");
attr.nodeValue = "farben"
einblenden.setAttributeNode(attr);
var inhalt = document.createTextNode("Hier sollte eigentlich eine Farbtabelle stehen.")
einblenden.appendChild(inhalt);
var colortag = document.getElementsByTagName("h4")[0].parentNode;
colortag.style.position = "relative;"
colortag.insertBefore(einblenden, document.getElementsByTagName("h4")[0].nextSibling);
var r = "<\/tr><tr>"
var s = "<td style=\"background-color:#"
var t = ";\" onclick=\"insert('\[color="
var u = "\]', '\[\/color\]')\"><\/td>"
var farbtabelle = "<table id=\"farbwahl\" cellspacing=\"0\" cellpadding=\"0\"><tr><th id=\"ftkopf\" colspan=\"6\">Bitte Farbe w&auml;hlen<\/th><th id=\"ftaus\" onClick=\"wegdamit()\">X<\/th>"+r+s+"000"+t+"000000"+u+s+"333"+t+"333333"+u+s+"666"+t+"666666"+u+s+"999"+t+"999999"+u+s+"CCC"+t+"CCCCCC"+u+s+"FFF"+t+"FFFFFF"+u+s+"DBD1C8"+t+"DBD1C8"+u+r+s+"006"+t+"000066"+u+s+"066"+t+"006666"+u+s+"060"+t+"006600"+u+s+"660"+t+"666600"+u+s+"630"+t+"663300"+u+s+"600"+t+"660000"+u+s+"606"+t+"660066"+u+r+s+"009"+t+"000099"+u+s+"099"+t+"009999"+u+s+"090"+t+"009900"+u+s+"990"+t+"999900"+u+s+"930"+t+"993300"+u+s+"900"+t+"990000"+u+s+"909"+t+"990099"+u+r+s+"00F"+t+"0000FF"+u+s+"0FF"+t+"00FFFF"+u+s+"0F0"+t+"00FF00"+u+s+"FF0"+t+"FFFF00"+u+s+"F60"+t+"FF6600"+u+s+"F00"+t+"FF0000"+u+s+"F0F"+t+"FF00FF"+u+r+s+"99F"+t+"9999FF"+u+s+"9FF"+t+"99FFFF"+u+s+"9F9"+t+"99FF99"+u+s+"FF9"+t+"FFFF99"+u+s+"FC9"+t+"FFCC99"+u+s+"F99"+t+"FF9999"+u+s+"F9F"+t+"FF99FF"+u+"<\/tr><\/table>"
document.getElementById("farben").innerHTML = farbtabelle;
}

function code() {
  var bereich = document.getElementsByTagName("h4")[0].parentNode;
  var bbcodes = new Array(1);
  bbcodes[0] = new Array("\[b\]Fett\[\/b\]", "\[i\]Kursiv\[\/i\]", "\[c\]Zentriert\[\/c\]", "\[user\]Spieler\[\/user\]", "\[dragon\]Drache\[\/dragon\]", "\[guild\]Gildenkürzel\[\/guild\]", "\[url=http:\/\/abc.de\]link\[\/url\]", "\[img\]Bild-Link\[\/img\]");
  bbcodes[1] = new Array("b", "i", "c", "user", "dragon", "guild", "url", "img");
  for (i = 0; i <= 7; i++) {
    bereich.innerHTML = bereich.innerHTML.replace(bbcodes[0][i], "<span style='cursor:pointer;' onClick='insert(\"\["+bbcodes[1][i]+"\]\", \"\[\/"+bbcodes[1][i]+"\]\")'>"+bbcodes[0][i]+"<\/span>");
  }
}

function farblink() {
  var bereich = document.getElementsByTagName("h4")[0].parentNode;
  bereich.innerHTML = bereich.innerHTML.replace("\[color=ff0000\]Farbe\[\/color\]", "<span style='cursor:pointer;' onClick='zeigen()'>[color=ff0000\]Farbe\[\/color\]<\/span>");
}

if (document.getElementsByTagName("h4")[0]) {
  if (document.getElementsByTagName("h4")[0].innerHTML.search(/BB-Codes:/g) != -1) {
    anzeigen();
    code();
    farbbox();
    farblink();
  }
}