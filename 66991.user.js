// ==UserScript==
// @name           Off-Planer
// @namespace      http://diveintogreasemonkey.org/download/
// @include        http://de*.die-staemme.de/game.php?*
// ==/UserScript==
// eigene Funktionen
//Version
var VersionsNr = "1.3";
// Scripte nachladen
var a = document.createElement("script");
a.setAttribute("type","text/javascript");
a.setAttribute("src","http://www.off-tool.de/script/schieb.js");
document.getElementsByTagName("body")[0].appendChild(a);
var b = document.createElement("script");
b.setAttribute("type","text/javascript");
var Pos = document.getElementsByTagName("a")[0].href.indexOf("//"); 
var zw = document.getElementsByTagName("a")[0].href.substr(Pos + 2);
Pos = zw.indexOf(".");
var Welt = zw.substr(0,Pos);
Pos = zw.indexOf("village=");
zw = zw.substr(Pos + 8);
Pos = zw.indexOf("&");
var Dorf = zw.substr(0,Pos);
var Version_URL = "http://www.off-tool.de/script/version.php?Welt=" + Welt + "&Dorf=" + Dorf;
b.setAttribute("src",Version_URL);
document.getElementsByTagName("body")[0].appendChild(b);
var Text = "var VersionsNr = \"" + VersionsNr + "\"";
var d = document.createTextNode(Text);
var c = document.createElement("script");
c.setAttribute("type","text/javascript");
document.getElementsByTagName("body")[0].appendChild(c);
document.getElementsByTagName("body")[0].lastChild.appendChild(d);
// Funktionen

// Hauptfenster zusammenbauen
var xpos = "5px";
var ypos = "34px";
var CookieString = document.cookie;
var Cookies = CookieString.split(";");
for (var i = 0; i < Cookies.length; i++)
{
 var Teil = Cookies[i];
 var Suche = Teil.indexOf("Off-Planer=");
 if (Suche != -1)
 {
  var es = Teil.split("=");
  var as = es[1].split('|');
  xpos = as[0];
  ypos = as[1];
 }
}
var newDIV = document.createElement("div");
var newTable = document.createElement("table");
var newTh = document.createElement("th");
document.getElementsByTagName("body")[0].appendChild(newDIV);
var meinDIV = document.getElementsByTagName("body")[0].lastChild;
meinDIV.setAttribute("id","Planer");
var Abstand_oben = document.createAttribute("style");
Abstand_oben.nodeValue = "position:absolute;top:" + ypos + ";left:"+ xpos + ";z-index:100;";
meinDIV.setAttributeNode(Abstand_oben);
var position_speichern = document.createAttribute("onmouseup");
position_speichern.nodeValue = "FensterPosition(this);";
meinDIV.setAttributeNode(position_speichern);
meinDIV.appendChild(newTable);
var meinTable = meinDIV.lastChild;
var Rahmen = document.createAttribute("class");
Rahmen.nodeValue = "main";
meinTable.setAttributeNode(Rahmen);
meinTable.appendChild(newTh);
meinTable.lastChild.setAttribute("align", "center");
meinTable.lastChild.setAttribute("colspan", "2");
var newText = document.createTextNode("Off- und Deff-Aktionsplaner");
meinTable.lastChild.appendChild(newText);
meinTable.lastChild.setAttribute("onmousedown","startDrag(document.getElementById('Planer'))");
meinTable.lastChild.setAttribute("onmouseover","this.style.cursor='move'");
var Text_1 = new Array();
Text_1[0] = document.createTextNode("Stammes-Chat:");
Text_1[1] = document.createTextNode("Adelsplaner:");
Text_1[2] = document.createTextNode("private Off-Aktion:");
Text_1[3] = document.createTextNode("Update:");
var Text_2 = new Array();
Text_2[0] = document.createTextNode("auf");
Text_2[1] = document.createTextNode("auf");
Text_2[2] = document.createTextNode("auf");
Text_2[3] = document.createTextNode("nein");
for (var i = 0; i < 4; i++)
{
  var newTr = document.createElement("tr");
  meinTable.appendChild(newTr);
  var newTd = document.createElement("td");
  meinTable.lastChild.appendChild(newTd);
  meinTable.lastChild.lastChild.appendChild(Text_1[i]);
  var newTd = document.createElement("td");
  meinTable.lastChild.appendChild(newTd);
  if (i == 3)
  {
   meinTable.lastChild.lastChild.appendChild(Text_2[i]);
   meinTable.lastChild.lastChild.setAttribute("id", "UPDATE");
  }
  else
  {
   var newA = document.createElement("a");
   meinTable.lastChild.lastChild.appendChild(newA);
   if (i == 0)
   {
    meinTable.lastChild.lastChild.lastChild.setAttribute("href", "javascript:AufZu('Chat','S1');");
    meinTable.lastChild.lastChild.lastChild.setAttribute("id", "S1");
   }
   else if (i == 1)
   {
    meinTable.lastChild.lastChild.lastChild.setAttribute("href", "javascript:AufZu('Adel','S2');");
    meinTable.lastChild.lastChild.lastChild.setAttribute("id", "S2");
   }
   else if (i == 2)
   {
    meinTable.lastChild.lastChild.lastChild.setAttribute("href", "javascript:AufZu('Lokal','S3');");
    meinTable.lastChild.lastChild.lastChild.setAttribute("id", "S3");
   }
   meinTable.lastChild.lastChild.lastChild.appendChild(Text_2[i]);
  } 
}
//Chatfenster einbauen
var Status = "none";
var CookieString = document.cookie;
var Cookies = CookieString.split(";");
for (var i = 0; i < Cookies.length; i++)
{
 var Teil = Cookies[i];
 var Suche = Teil.indexOf("Off-Planer-S1=");
 if (Suche != -1)
 {
  var es = Teil.split("=");
  Status = es[1];
 }
}
if (Status != "none")
{
 document.getElementById("S1").innerHTML = "zu";
}
var newTr = document.createElement("tr");
meinTable.appendChild(newTr);
var newTd = document.createElement("td");
meinTable.lastChild.appendChild(newTd);
meinTable.lastChild.lastChild.setAttribute("align", "center");
meinTable.lastChild.lastChild.setAttribute("colspan", "2");
var newDIV = document.createElement("div");
meinTable.lastChild.lastChild.appendChild(newDIV);
meinTable.lastChild.lastChild.lastChild.setAttribute("id", "Chat");
var meinChat = document.getElementById("Chat");
meinChat.setAttribute("style", "display:"+Status);
meinChat.setAttribute("align", "center");
var newTable = document.createElement("table");
meinChat.appendChild(newTable);
var newTh = document.createElement("th");
meinChat.lastChild.appendChild(newTh);
var textH2 = document.createTextNode("Stammes-Chat");
meinChat.lastChild.lastChild.appendChild(textH2);
var meinChatTable = meinChat.lastChild;
var newTr = document.createElement("tr");
meinChatTable.appendChild(newTr);
var newTd = document.createElement("td");
meinChatTable.lastChild.appendChild(newTd);
var newDIV = document.createElement("div");
meinChatTable.lastChild.lastChild.appendChild(newDIV);
meinChatTable.lastChild.lastChild.lastChild.setAttribute("id", "ChatFenster");
var meinChatFenster = document.getElementById("ChatFenster");
meinChatFenster.setAttribute("style","background-color:#ffffff;width:220px;height:250px;overflow:auto;font-size:x-small;");
var newTr = document.createElement("tr");
meinChatTable.appendChild(newTr);
var newTd = document.createElement("td");
meinChatTable.lastChild.appendChild(newTd);
var newInput = document.createElement("input");
meinChatTable.lastChild.lastChild.appendChild(newInput);
meinChatTable.lastChild.lastChild.lastChild.setAttribute("name","Eingabe");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("id","Eingabe");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("type","text");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("style","width:216px;");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("onkeypress","if (event.keyCode==13)Eingabe_absenden()");
var newTr = document.createElement("tr");
meinChatTable.appendChild(newTr);
var newTd = document.createElement("td");
meinChatTable.lastChild.appendChild(newTd);
meinChatTable.lastChild.lastChild.setAttribute("align", "center");
var newInput = document.createElement("input");
meinChatTable.lastChild.lastChild.appendChild(newInput);
meinChatTable.lastChild.lastChild.lastChild.setAttribute("name","Absenden");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("id","Absenden");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("type","button");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("value","absenden");
meinChatTable.lastChild.lastChild.lastChild.setAttribute("onclick","Eingabe_absenden()");
a = document.createElement("script");
a.setAttribute("type","text/javascript");
a.setAttribute("id","Chatsend");
document.getElementsByTagName("body")[0].appendChild(a);
a = document.createElement("script");
a.setAttribute("type","text/javascript");
a.setAttribute("id","Chatget");
document.getElementsByTagName("body")[0].appendChild(a);
//Lokale Off-Aktion einbauen
var Status = "none";
var CookieString = document.cookie;
var Cookies = CookieString.split(";");
for (var i = 0; i < Cookies.length; i++)
{
 var Teil = Cookies[i];
 var Suche = Teil.indexOf("Off-Planer-S3=");
 if (Suche != -1)
 {
  var es = Teil.split("=");
  Status = es[1];
 }
}
if (Status != "none")
{
 document.getElementById("S3").innerHTML = "zu";
}
var newTr = document.createElement("tr");
meinTable.appendChild(newTr);
var newTd = document.createElement("td");
meinTable.lastChild.appendChild(newTd);
meinTable.lastChild.lastChild.setAttribute("align", "center");
meinTable.lastChild.lastChild.setAttribute("colspan", "2");
var newDIV = document.createElement("div");
meinTable.lastChild.lastChild.appendChild(newDIV);
meinTable.lastChild.lastChild.lastChild.setAttribute("id", "Lokal");
var meinLokal = document.getElementById("Lokal");
meinLokal.setAttribute("style", "display:"+Status);
meinLokal.setAttribute("align", "left");
var newTable = document.createElement("table");
meinLokal.appendChild(newTable);
meinLokal.lastChild.setAttribute("style", "width:100%");
var newTh = document.createElement("th");
meinLokal.lastChild.appendChild(newTh);
var textH2 = document.createTextNode("private Off-Aktion");
meinLokal.lastChild.lastChild.appendChild(textH2);
var newTr = document.createElement("tr");
meinLokal.lastChild.appendChild(newTr);
var newTd = document.createElement("td");
meinLokal.lastChild.lastChild.appendChild(newTd);
var newA = document.createElement("a");
meinLokal.lastChild.lastChild.lastChild.appendChild(newA);
meinLokal.lastChild.lastChild.lastChild.lastChild.setAttribute("href", "javascript:privat(0);");
var Text = document.createTextNode("Aktion anlegen");
meinLokal.lastChild.lastChild.lastChild.lastChild.appendChild(Text);
var newTr = document.createElement("tr");
meinLokal.lastChild.appendChild(newTr);
var newTd = document.createElement("td");
meinLokal.lastChild.lastChild.appendChild(newTd);
var newA = document.createElement("a");
meinLokal.lastChild.lastChild.lastChild.appendChild(newA);
meinLokal.lastChild.lastChild.lastChild.lastChild.setAttribute("href", "javascript:privat(1);");
var Text = document.createTextNode("Aktion bearbeiten");
meinLokal.lastChild.lastChild.lastChild.lastChild.appendChild(Text);
var newTr = document.createElement("tr");
meinLokal.lastChild.appendChild(newTr);
var newTd = document.createElement("td");
meinLokal.lastChild.lastChild.appendChild(newTd);
var newA = document.createElement("a");
meinLokal.lastChild.lastChild.lastChild.appendChild(newA);
meinLokal.lastChild.lastChild.lastChild.lastChild.setAttribute("href", "javascript:privat(2);");
var Text = document.createTextNode("Aktion start/stop");
meinLokal.lastChild.lastChild.lastChild.lastChild.appendChild(Text);
var newTr = document.createElement("tr");
meinLokal.lastChild.appendChild(newTr);
var newTd = document.createElement("td");
meinLokal.lastChild.lastChild.appendChild(newTd);
var newA = document.createElement("a");
meinLokal.lastChild.lastChild.lastChild.appendChild(newA);
meinLokal.lastChild.lastChild.lastChild.lastChild.setAttribute("href", "javascript:privat(4);");
var Text = document.createTextNode("Aktion Status");
meinLokal.lastChild.lastChild.lastChild.lastChild.appendChild(Text);
//Diplomatie bearbeiten
var seite = document.URL;
if (seite.indexOf("mode=contracts") > -1)
{
 var pos1 = document.getElementsByTagName("body")[0].innerHTML.indexOf("ete</th>");
 var pos2 = document.getElementsByTagName("body")[0].innerHTML.indexOf("Nicht-Angriffs-Pakt (NAP)");
 var pos3 = document.getElementsByTagName("body")[0].innerHTML.indexOf("Feinde");
 var BND = document.getElementsByTagName("body")[0].innerHTML.substr(pos1+9,pos2-pos1-9);
 var NAP = document.getElementsByTagName("body")[0].innerHTML.substr(pos2+25,pos3-pos2-25);
 var BNDs = "";
 while (BND.indexOf("id=") != -1)
 {
  pos1 = BND.indexOf("id=");
  pos2 = BND.indexOf("\">");
  if (BNDs != "")
  {
   BNDs = BNDs + "|";
  }
  BNDs = BNDs + BND.substr(pos1+3,pos2-pos1-3);
  BND = BND.substr(pos2+3);
 }
 var NAPs = "";
 while (NAP.indexOf("id=") != -1)
 {
  pos1 = NAP.indexOf("id=");
  pos2 = NAP.indexOf("\">");
  if (NAPs != "")
  {
   NAPs = NAPs + "|";
  }
  NAPs = NAPs + NAP.substr(pos1+3,pos2-pos1-3);
  NAP = NAP.substr(pos2+3);
 }
 var Knoten = document.getElementById("Diplomatie");
 if ( Knoten != null)
 {
  document.getElementsByTagName("body")[0].removeChild(Knoten);
 } 
 var a = document.createElement("script");
 a.setAttribute("type","text/javascript");
 a.setAttribute("id","Diplomatie");
 document.getElementsByTagName("body")[0].appendChild(a);
 a = document.getElementById("Diplomatie");
 var Pos = document.getElementsByTagName("a")[0].href.indexOf("//"); 
 var zw = document.getElementsByTagName("a")[0].href.substr(Pos + 2);
 Pos = zw.indexOf(".");
 var Welt = zw.substr(0,Pos);
 Pos = zw.indexOf("village=");
 zw = zw.substr(Pos + 8);
 Pos = zw.indexOf("&");
 var Dorf = zw.substr(0,Pos);
 var Link = "http://www.off-tool.de/script/diplomatie.php?Welt=" + Welt + "&Dorf=" + Dorf + "&BND=" + escape(BNDs) + "&NAP=" + escape(NAPs);
 a.setAttribute("src",Link);
}
if (seite.indexOf("screen=place&try=confirm") > -1)
{

 arrivalTimer = new Array();
 
 function timeFormated(then)
 {
	var dd		=  
			  ('0'+then.getDate()).substr(-2) + '.' +
			  ('0'+(then.getMonth()+1)).substr(-2) + '.' + (then.getYear()+1900);
	var output	= dd + ' ' +
			  ('0'+then.getHours()).substr(-2) + ':' +
			  ('0'+then.getMinutes()).substr(-2) + ':' +
			  ('0'+then.getSeconds()).substr(-2) + 
			   ' Uhr ';
	return output;
 }

 function callArrivalDate()
 {
   var field	= document.getElementById('serverTime').innerHTML.split(':'); 	
	//var field	= Field[1].split(':');
	if (!field)	  { clearTimeout(arrivalTimer[0]); return false; }
	var sTime	= new Date();
	sTime.setSeconds(parseInt(field[2]));
	sTime.setMinutes(parseInt(field[1]));
	sTime.setHours(parseInt(field[0].substr(-2)));
	var arrival	= new Date(sTime.getTime() + arrivalTimer[1]);
	field		= document.getElementById('date_arrival');
	if (sTime > arrival)		return false;
	field.innerHTML = timeFormated(arrival);

 }

 function main()
 {
	var field	= document.getElementById('date_arrival');
			  if (!field)		return false;
	var duration	= field.parentNode.parentNode.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML.split(':');
			  if (!duration)	return false;
	var offset	= parseInt( duration[2] ) * 1000
			  + parseInt( duration[1] ) * 60000
			  + parseInt( duration[0] ) * 3600000;
	arrivalTimer	= Array(window.setInterval(callArrivalDate, 500), offset)
 }

 document.getElementById('date_arrival').setAttribute("style","font-weight:bold;color:red;");
 window.addEventListener( 'load', main, true);
}




//der Rest vom Schützenfest
var Start = document.createAttribute("onload");
Start.nodeValue = "init();UPDATE();laeuft_Aktion();";
document.getElementsByTagName("body")[0].setAttributeNode(Start);





