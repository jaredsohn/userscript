// ==UserScript==
// @name           Zarenkriege Powermod
// @namespace      zarenkriege_powermod
// @include        http://spiel.zarenkriege.de/*
// ==/UserScript==

/* Ideen:
- direkt von der karte aus spio senden können
- favoritenliste für koordinaten
- karte springt nicht mehr zur burg -> maxresred, helpLinks
- storagelimit in nur 1 string speichern. "coord|limit" und dann in array oder so. bei übersicht schauen, ob noch alle burgen da sind, ansonsten ausm string löschen
- zarenbuch auch nach oben
- lager aktualisieren durch gm menü, für jede burg nen iframe
- farbige markierungen auch für maximiertes rohstoffmenü
*/

// Version 0.41 (2008-10-25)

// Konfiguration

var c_noteSizeH = "100"; //Notizfeld Breite
var c_noteSizeV = "26"; //Notizfeld Höhe
var c_noteButton = 1; //Button über dem Notizfeld

var c_resShrink = 1; //Ressourcenleiste immer minimieren
var c_resStorageLimit = 1; //Volles Lager farblich hervorheben
var c_resStorageLimitNew = 0; //Volles Lager farblich hervorheben (Neue Variante mit nur 1 Speicher
var c_resYellow = 0.9; //Grenzwert für gelbe Schrift fürs Lager
var c_resYellowPub = 0.95; //Grenzwert für gelbe Schrift für die Bevölkerung

var c_troupCastle = 1; //Dropdown-Feld für Koordinaten von eigenen Burgen um Burgennamen ergänzen
var c_marchColor = 1; // utnerschiedliche Feldzüge farblich hervorheben
var c_castleCoord = 1; //Bei Feldzügen eigene Koordinaten durch Burgennamen ersetzen
var c_botTop = 1; //Den Botcheck oben anzeigen
var c_showCastle = 0; //Namen der ausgewählten Burg oben anzeigen
var c_forumButtons = 1; //Zurück-Buttons im Forum hinzufügen
var c_castleMenu = 0; //Erweitertes Burgenmenü, um direkt zu Gebäuden in anderen Burgen zu springen
var c_zarenbuch = 1; //Link zum Zarenbuch wird im Info Menü angezeigt

var c_buendnisColor = 1; //inaktive User in der Bündnisübersicht hervorheben (nur für Admins)
var c_buendnisColorYellow = 3; // gelb hervorheben ab X Tage
var c_buendnisColorRed = 5; //rot hervorheben ab X Tage
var c_buendnisColorOffset = 5; // Zeit in Minuten, die bei der Rechnerzeit zur Korrektur hinzugerechnet wird

var c_enlargeContent = 1; //Rechtes Menü ausblenden und Inhalt verbreitern

var c_hideNick = 1; //Nickname über dem Inhalt ausblenden
var c_hideScroll = 1; //Ticker ausblenden
var c_hideVote = 1; //Vote Feld im rechten Menü ausblenden
var c_hideAdvisor = 1; //Berater ausblenden
var c_hideBanner = 1; //Werbebanner im rechten Menü ausblenden
var c_hideTopAds = 0; //Obere Werbung ausblenden
var c_hideVip = 0; //Alle VIP Menüs ausblenden
var c_hideFooter = 1; //Fußzeile/Copyright ausblenden
var c_hideBotcheck = 1; //Botcheck im rechten Menü aublenden

// Funktionen

function getElementsByClassName(class_name)
{
  var all_obj,ret_obj=new Array(),j=0,teststr;
  if(document.all)all_obj=document.all;
  else if(document.getElementsByTagName && !document.all)
    all_obj=document.getElementsByTagName("*");
  for(i=0;i<all_obj.length;i++)
  {
    if(all_obj[i].className.indexOf(class_name)!=-1)
    {
      teststr=","+all_obj[i].className.split(" ").join(",")+",";
      if(teststr.indexOf(","+class_name+",")!=-1)
      {
        ret_obj[j]=all_obj[i];
        j++;
      }
    }
  }
  return ret_obj;
}

function getTitleElement(title) {
	var all_titles,ret_titles = new Array(),j=0;
	all_titles = document.getElementsByClassName("title");
	for (i=0;i<all_titles.length;i++) {
		if (all_titles[i].innerHTML==title) {
			ret_titles[j] = all_titles[i];
			j++;
		}
	}
return ret_titles;
}

function xpath(query) {
    return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function botcountdown() {
if (document.getElementById("submenu")) {
var botcheckRegExp = new RegExp("([0-9]+):([0-9]+)");
var botcheckTime = botcheckRegExp.exec(document.getElementsByClassName("botcheck")[0].innerHTML);
var min = parseInt(botcheckTime[1]);
var sec = parseInt(botcheckTime[2]);
GM_setValue("botMin",min);
GM_setValue("botSec",sec);
} else {
var min = GM_getValue("botMin",59);
var sec = GM_getValue("botSec",59);
}
var now = new Date();
now = now.getTime();
endTime = now + (1000 * 60 * min) + (1000 * sec);
botcountdown2(endTime);
}

function botcountdown2(endTime) {
var now = new Date();
now = now.getTime();
var delta = new Date(endTime - now);
var theMin = delta.getMinutes();
var theSec = delta.getSeconds();
var theTime = theMin;
theTime += ((theSec < 10) ? ":0" : ":") + theSec;
if (theTime=="0:00") {
document.getElementById("botcountdown").innerHTML = theTime;
document.getElementById("botcountdown").style.color = "#FF0000";
} else {
if (theMin<5) {
document.getElementById("botcountdown").style.color = "#FFFF00";
}
document.getElementById("botcountdown").innerHTML = theTime;
setTimeout(function () {botcountdown2(endTime)}, 1000);
}
}

function forumNewRead() {
GM_setValue("forumCat","0,");
GM_setValue("forumTopic","0,");
}

/* window.addEventListener(
    'load', 
    function() {  */

// Informationen bekommen

var castle, tmpObj;
tmpObj = xpath("//ul[@id='castles']/li/a");
castle = new Array();
for (var i=0; i<tmpObj.snapshotLength ;i++) {
	castle[i] = new Object();
	castle[i]['name'] = tmpObj.snapshotItem(i).innerHTML.replace(/^([^\(]*)[(\[]([0-9]+):([0-9]+)[)\]]/,'$1');
	castle[i]['x'] = tmpObj.snapshotItem(i).innerHTML.replace(/^([^\(]*)[(\[]([0-9]+):([0-9]+)[)\]]/,'$2');
	castle[i]['y'] = tmpObj.snapshotItem(i).innerHTML.replace(/^([^\(]*)[(\[]([0-9]+):([0-9]+)[)\]]/,'$3');
};

tmpObj = xpath("//ul[@id='castles']/li/strong/a");  //liefert nur ausgewählte burg
selectedCastle = new Array();
for (var i=0; i<tmpObj.snapshotLength ;i++) {
	selectedCastle[i] = new Object();
	selectedCastle[i]['name'] = tmpObj.snapshotItem(i).innerHTML.replace(/^([^\(]*)[(\[]([0-9]+):([0-9]+)[)\]]/,'$1');
	selectedCastle[i]['x'] = tmpObj.snapshotItem(i).innerHTML.replace(/^([^\(]*)[(\[]([0-9]+):([0-9]+)[)\]]/,'$2');
	selectedCastle[i]['y'] = tmpObj.snapshotItem(i).innerHTML.replace(/^([^\(]*)[(\[]([0-9]+):([0-9]+)[)\]]/,'$3');
};

allCastles = selectedCastle.concat(castle);

// Modifikationen

if (c_castleCoord && document.location.href.match("pohod.php") && document.getElementById("units_to_send")) {
tmpObj2 = xpath("//div[@id='content']/div/table/tbody/tr/td");
for (var i=2; i<tmpObj2.snapshotLength; i=i+7) {
for (var j=0; allCastles.length; j++) {
coords = allCastles[j]['x']+":"+allCastles[j]['y'];
if (tmpObj2.snapshotItem(i).innerHTML.match(coords)) {
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace(coords,allCastles[j]['name']);
break;
}
if (j==allCastles.length-1) {
break;
}
}
}
for (var i=3; i<tmpObj2.snapshotLength; i=i+7) {
for (var j=0; allCastles.length; j++) {
coords = allCastles[j]['x']+":"+allCastles[j]['y'];
if (tmpObj2.snapshotItem(i).innerHTML.match("preview.php")) {
break;
} else if (tmpObj2.snapshotItem(i).innerHTML.match(coords)) {
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace(coords,allCastles[j]['name']);
break;
}
}
}
}

if (c_marchColor && document.location.href.match("pohod.php") && document.getElementById("units_to_send")) {
tmpObj2 = xpath("//div[@id='content']/div/table/tbody/tr/td");
for (var i=5; i<tmpObj2.snapshotLength; i=i+7) {
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Angriff",'<font color="#FF0000">Angriff</font>');
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Durchsuchung",'<font color="#00FF00">Durchsuchung</font>');
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Transport",'<font color="#0000FF">Transport</font>');
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Transfer",'<font color="#FFFF00">Transfer</font>');
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Spionage",'<font color="#FFFFFF">Spionage</font>');
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Patrouille",'<font color="#000000">Patrouille</font>');
tmpObj2.snapshotItem(i).innerHTML = tmpObj2.snapshotItem(i).innerHTML.replace("Verstärkung",'<font color="#CCCCCC">Verstärkung</font>');
}
}

if (c_troupCastle && document.location.href.match("pohod.php") && document.getElementById("ppp")) {
var tcdropdown = "<option>Eigene Burgen...</option>";
for (var j=0; j<castle.length; j++) {
tcdropdown += "<option value='" + castle[j]['x'] + ":" + castle[j]['y'] + "'>" + castle[j]['name'] + " (" + castle[j]['x'] + ":" + castle[j]['y'] + ")</option>"; 
}

tmpObj3 = xpath("//select[@Name='fastNav']");
tmpObj3.snapshotItem(0).innerHTML = tcdropdown;
}

if (c_buendnisColor && document.location.href.match("editclan.php")) {

var now = new Date();
now = now.getTime();
now += 1000*60*c_buendnisColorOffset;
var nowRed = 1000*60*60*24*c_buendnisColorRed;
var nowYellow = 1000*60*60*24*c_buendnisColorYellow;

tmpObj = xpath("//div[@id='content']/div/p");
for (var i=0; i<tmpObj.snapshotLength; i++) {

var spielerZeit = tmpObj.snapshotItem(i).innerHTML.slice(tmpObj.snapshotItem(i).innerHTML.length-21, tmpObj.snapshotItem(i).innerHTML.length); //geht das nicht einfacher?
var spielerDate = new Date(spielerZeit.slice(1, 5), spielerZeit.slice(6, 8)-1, spielerZeit.slice(9, 11), spielerZeit.slice(12, 14), spielerZeit.slice(15, 17), spielerZeit.slice(18, 20));
spielerDate = spielerDate.getTime();

tmpObj.snapshotItem(i).innerHTML = tmpObj.snapshotItem(i).innerHTML.slice(0, tmpObj.snapshotItem(i).innerHTML.length-21);

var spielerDiff = now-spielerDate;

if (spielerDiff>(1000*60*60*24*26)) {
var spielerOffZeit = "über 25";
} else {
var spielerOffZeit = new Date(spielerDiff);
spielerOffZeit = spielerOffZeit.getDate()-1;
}

if (spielerDate<=nowRed) {
tmpObj.snapshotItem(i).innerHTML += " <font color='red'>"+spielerZeit+" Tage: <b>"+spielerOffZeit+"</b></font>";
} else if(spielerDate<=nowYellow && spielerDate>nowRed) {
tmpObj.snapshotItem(i).innerHTML += " <font color='yellow'>"+spielerZeit+" Tage: <b>"+spielerOffZeit+"</b></font>";
} else {
tmpObj.snapshotItem(i).innerHTML += " <font color='green'>"+spielerZeit+" Tage: <b>"+spielerOffZeit+"</b></font>";
}

}
}

if (c_castleMenu) {
tmpObj = xpath("//ul[@id='castles']/li");
for (var i=0; i<tmpObj.snapshotLength; i++) {
var castleLink = tmpObj.snapshotItem(i).innerHTML;
castleLink = castleLink.replace("<strong>","");
var castleId = castleLink.slice(23, 28);
castleId = castleId.replace("&","");
castleLink = "<br><a href='main.php?tpid="+castleId+"&location=/overview.php'>Übe</a> ";
castleLink += "<a href='main.php?tpid="+castleId+"&location=/pohod.php'>Fel</a> ";
castleLink += "<a href='main.php?tpid="+castleId+"&location=/buildings.php'>Geb</a> ";
castleLink += "<a href='main.php?tpid="+castleId+"&location=/barracks.php'>Kas</a> ";
castleLink += "<a href='main.php?tpid="+castleId+"&location=/market.php'>Mar</a> ";
tmpObj.snapshotItem(i).innerHTML += castleLink;
}
}

if (c_resShrink) {
var a = new Date();
a = new Date(a.getTime() +1000*60*60);
document.cookie = 'menu_display=shrinked; expires='+a.toGMTString()+';'; 
}

if (c_zarenbuch) {
tmpObj = xpath("//ul[@id='info']");
var addLink = '<li><a href="lightbox1" rel="globalNewsWrapper" class="lbOn" target="_top">Buch der Zaren</a></li>';
tmpObj.snapshotItem(0).innerHTML = addLink + tmpObj.snapshotItem(0).innerHTML;
}


if (c_forumButtons && document.location.href.match("forum.php") && document.location.href.match("_id")) {
if (document.location.href.match("topic_id")) {
newForumNav = '<a href="#post_form" onclick="show_post_box();" class="reply"><span title="Antworten">Antworten</span></a><a href="javascript:history.back();" class="back"><span>Zur Kategorie</span></a><a href="forum.php" class="back"><span>Zum Forum</span></a>'
} else 
if (document.location.href.match("cat_id")) {
newForumNav = '<a href="#post_form" onclick="show_topic_box();return false;" class="new"><span title="Neues Thema">Neues Thema</span></a><a href="forum.php" class="back"><span>Zum Forum</span></a>';
}
document.getElementsByClassName("forumNav")[0].innerHTML = newForumNav;
document.getElementsByClassName("forumNav")[1].innerHTML = newForumNav;
}

if (c_resStorageLimit && !document.location.href.match("map.php")) {
var storageName = selectedCastle[0]['x']+":"+selectedCastle[0]['y']+"_Storage";
var storageLimit = GM_getValue(storageName, 1000000);
if (document.location.href.match("overview.php")) {
storageLimit = parseInt(document.getElementsByClassName("storageLimit")[0].innerHTML);
GM_setValue(storageName, storageLimit);
}

tmpObj = xpath("//div[@id='maximize']/p/strong");
for (var i=0; i<4 ;i++) {
if (tmpObj.snapshotItem(i).innerHTML==storageLimit) {
tmpObj.snapshotItem(i).innerHTML = "<font color='#FF0000'>"+tmpObj.snapshotItem(i).innerHTML+"</font>";
} else if ((tmpObj.snapshotItem(i).innerHTML/storageLimit)>c_resYellow) {
tmpObj.snapshotItem(i).innerHTML = "<font color='#FFFF00'>"+tmpObj.snapshotItem(i).innerHTML+"</font>";
}
}
var pub = tmpObj.snapshotItem(4).innerHTML.split("/");
var pubact = parseInt(pub[0]);
var pubmax = parseInt(pub[1]);

if (pubact>=pubmax) {
tmpObj.snapshotItem(4).innerHTML = "<font color='#FF0000'>"+tmpObj.snapshotItem(4).innerHTML+"</font>";
} else if ((pubact/pubmax)>c_resYellowPub) {
tmpObj.snapshotItem(4).innerHTML = "<font color='#FFFF00'>"+tmpObj.snapshotItem(4).innerHTML+"</font>";
}
}

if (c_resStorageLimitNew && !document.location.href.match("map.php")) {
var storageCoord = selectedCastle[0]['x']+":"+selectedCastle[0]['y'];

var storageLimit = GM_getValue(storageCoord, 1000000);
if (document.location.href.match("overview.php")) {
storageLimit = parseInt(document.getElementsByClassName("storageLimit")[0].innerHTML);
//GM_setValue(storageCoord, storageLimit);
}

tmpObj = xpath("//div[@id='maximize']/p/strong");
for (var i=0; i<4 ;i++) {
if (tmpObj.snapshotItem(i).innerHTML==storageLimit) {
tmpObj.snapshotItem(i).innerHTML = "<font color='#FF0000'>"+tmpObj.snapshotItem(i).innerHTML+"</font>";
} else if ((tmpObj.snapshotItem(i).innerHTML/storageLimit)>c_resYellow) {
tmpObj.snapshotItem(i).innerHTML = "<font color='#FFFF00'>"+tmpObj.snapshotItem(i).innerHTML+"</font>";
}
}
var pub = tmpObj.snapshotItem(4).innerHTML.split("/");
var pubact = parseInt(pub[0]);
var pubmax = parseInt(pub[1]);

if (pubact>=pubmax) {
tmpObj.snapshotItem(4).innerHTML = "<font color='#FF0000'>"+tmpObj.snapshotItem(4).innerHTML+"</font>";
} else if ((pubact/pubmax)>c_resYellowPub) {
tmpObj.snapshotItem(4).innerHTML = "<font color='#FFFF00'>"+tmpObj.snapshotItem(4).innerHTML+"</font>";
}
}

if (c_hideTopAds) {
document.getElementById("topads").innerHTML = "";
}

if (c_hideScroll) {
document.getElementById("scroll").style.display = "none";
}

if (c_hideVip) {
document.getElementById("vip").style.display = "none";
document.getElementById("sms").style.display = "none";
getTitleElement("VIP")[0].style.display = "none";
}

if (c_hideNick) {
document.getElementsByTagName("h5")[0].style.display = "none";
}

if (c_hideFooter) {
document.getElementById("footer").style.display = "none";
}


if (document.location.href.match("notes.php")) {
document.getElementById("newnote").cols = c_noteSizeH;
document.getElementById("newnote").rows = c_noteSizeV;
}

if (document.location.href.match("notes.php") && c_noteButton) {
var formbox_center = document.getElementsByClassName("formbox center")[0];
formbox_center.innerHTML = '<div class="buttonrow"><input type="submit" name="submit" value="Notizen aktualisieren" class="success" /></div>' + formbox_center.innerHTML;
}

if (c_enlargeContent && document.getElementById("submenu")) {
document.getElementById("submenu").style.display = "none";
document.getElementById("content").style.width = "77%";
}

// if (c_botTop) {
// document.getElementById("topads").innerHTML = "<div id='toplinks'><p align='right'><a href='botcaptcha.php'><font color='#ffffff' size=2><strong>Botschutz in <span id='botcountdown'>--:--</span> Min.</strong></font></a></p></div>";
// botcountdown();
// }

if (c_botTop) {
document.getElementById("toplinks").innerHTML = "<p align='right'><a href='botcaptcha.php'><font color='#ffffff' size=2><strong>Botschutz in <span id='botcountdown'>--:--</span> Min.</strong></font></a></p>";
botcountdown();
}

if (c_showCastle) {
document.getElementById("topads").innerHTML += "<br><p align='right'><font color='#ffffff' size=5><strong>"+selectedCastle[0]['name']+" ["+selectedCastle[0]['x']+":"+selectedCastle[0]['y']+"]</strong></font></p>";
}

if (c_hideVote && document.getElementById("submenu")) {
document.getElementById("voteforres").style.display = "none";
}

if (c_hideBotcheck && document.getElementById("submenu")) {
document.getElementsByClassName("botcheck")[0].style.display = "none";
}

if (c_hideAdvisor && document.getElementById("submenu")) {
document.getElementById("advisor-activate").style.display = "none";
}

if (c_hideBanner && document.getElementById("submenu")) {
getTitleElement("Anzeige")[0].style.display = "none";
document.getElementsByClassName("banner")[0].style.display = "none";
}

/*  },
    true); */