// ==UserScript==
// @name           Nachrichten warner fuer alle phpBB Boards by Boggler
// @namespace      http://pennerhack.de.tc http://pennerhack.foren-city.de
// @description    Wenn du eine neue Nachricht hast kommt ein Alert, in dem Infos stehen wie Betreff und Absender. Man kann im Script alles anpassen was man haben will!
// @author         Boggler
// @version        2.3.1
// @include        *pennerhack*
// @include        *forumieren*
// @include        *foren-city*
// @include        *forum*
// @include        *foren*
// @include        *okbb*
// @include        *iphpBB*
// @exclude	   *?mode=newpm*
// ==/UserScript==

//Eigene Einstellungen zur Optimierung des Scripts
	var erinnerung = "true"; 	//[false|true|fragen]Soll er dich erneut erinnern? (fragen -> jedes mal fragen ob er soll)
	var oeffnen = "tab"; 	//[tab|popup|fenster] Nachricht in neuem Tab , Popup oder im gleichen fenster öffnen wenn man auf ok klickt?
	var zeit1 = true; 	//[true|false] Soll angezeigt werden wann die Nachricht gekommen?
	var vonwem1 = true; 	//[true|false] Soll angezeigt werden von wem die Nachricht ist?
	var betreff1 = true; 	//[true|false] Soll der Betreff angezeigt werden?
	var reload1 = 600;	//[Zahl>60] Alle wieviel SEKUNDEN soll reloadet, also nach neuen Nachrichten geguckt werden? 600Sek zBsp entsprechen 10 Minuten


//------------------------------------AB HIER NIX MEHR ÄNDERN SONST KANN SCRIPT KAPUTT GEHEN----------------------------------------------



//Seite definieren
var seite1 = window.location.hostname;
var seite = "http://"+seite1+"";

//phpBB Version rausfinden
GM_xmlhttpRequest(
  {
  	method: 'GET',
   	url: ''+seite+'',
        onload: function(responseDetails) 
		{
		var content = responseDetails.responseText;
var suche = content.indexOf("phpBB3");
if (suche > 0 ){
var phpbb = 3;
}else{
var phpbb = 2;
}

if(phpbb == 3){
var inbox = "/ucp.php?i=pm&folder=inbox";
}else{
var inbox = "/privmsg.php?folder=inbox";
}


//Daten sammeln
GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: ''+seite+''+inbox+'',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
		if(phpbb == 3){
			var text1 = content.split('/imageset/topic_unread')[1];
			var text2 = text1.split('.gif" width="')[0];
			var link1 = content.split('/ucp.php?i=pm&amp;mode=view&amp;f=0&amp;p=')[1];
			var link2 = link1.split('">')[0];
			var link3 = ""+seite+"/ucp.php?i=pm&mode=view&f=0&p="+link2+"";
			var text3 = content.split('ucp.php?i=pm&amp;mode=view&amp;f=0&amp;p='+link2+'">')[1];
			var text4 = text3.split('</a>')[0];
			var text5 = content.split('class="username-coloured">')[1];
			var text6 = text5.split('</a></p></td>')[0];	
			var text7 = content.split('class="topicdetails">')[1];
			var stunde = text7.split('</p></td>')[0];}
		else{
			var text1 = content.split('/images/folder_new')[1];
			var text2 = text1.split('.gif" hspace="2"')[0];
			var text3 = content.split('class="topictitle">')[2];
			var text4 = text3.split('</a></span></td>')[0];
			var text5 = content.split('class="name">')[2];
			var text6 = text5.split('</a></span></td>')[0];	
			var text7 = content.split('<span class="postdetails">')[1];
			var stunde = text7.split('</')[0];
			var link1 = content.split('p=')[9];
			var link2 = link1.split('" class=')[0];
			var link3 = ""+seite+"/privmsg.php?folder=inbox&mode=read&p="+link2+"";

		}

//Eigene Einstellungen (von oben) anwenden (Infos)
	if(zeit1 == true){
	var zeit = "am "+stunde+" ";
	}
	else {
	var zeit = "";
	}
	if(vonwem1 == true){
	var vonwem = "von \n"+text6+" ";
	}
	else {
	var vonwem = "";
	}
	if(betreff1 == true){
	var betreff = "mit dem Betreff "+text4+" ";
	}
	else {
	var betreff = "";
	}

			//Alert mit den Infos
			var lesen = confirm("Du hast "+zeit+"eine Nachricht "+vonwem+" "+betreff+"\ngekriegt.\nWillst du sie jetzt Lesen?");

//Eigene Einstellungen (von oben) anwenden (Weiterleitungsart, Erinnerung)
if(lesen == true)
{
	if(oeffnen == "tab")
		{
		oeffnen=window.open(link3);
		}
	if(oeffnen == "fenster")
		{
		window.location = link3 ; 
		}
	if(oeffnen == "popup")
		{
		window.open(link3, "fenster1", "width=900,height=700,status=yes,scrollbars=yes,resizable=yes");
		}
}
else 
if(erinnerung == "false")
{
GM_xmlhttpRequest(
   {
  	method: 'GET',
 	url: ''+link3+'',
        onload: function(responseDetails) 
		{}
	})
}
if(lesen == false){
if(erinnerung == "fragen")
{
		var fragen = confirm("Willst du wieder erinnert werden?");
}
if(fragen == false)
{
GM_xmlhttpRequest(
  {
  	method: 'GET',
   	url: ''+link3+'',
        onload: function(responseDetails)
		{}
	})
if(erinnerung == false)
{
GM_xmlhttpRequest(
  {
  	method: 'GET',
   	url: ''+link3+'',
        onload: function(responseDetails) 
		{}
	})
}
}}}});
		}
	})

//Reloaden (Neu laden)
var reload = ""+reload1+"000";
window.setTimeout("location.reload()",reload);


// Nachrichtenwarner für alle phpBB Boards und Foren
// Copyright by Boggler
// Auf Grundlage des Scripts von basti1012