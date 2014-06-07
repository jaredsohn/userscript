// ==UserScript==
// @name           Bandenkassen Notizen by basti1012
// @author         Greensky edit by bazie edit by bast1012
// @namespace      noname
// @description    Zeigt in der Bandenkasse unter "alle Anzeigen" weitere Statistiken (pro User/Pro Tag).Fuegt hinter jeden user und tag eine notizfunktion hinzu
// @include        *pennergame.de/gang/credit/*
// @include        *dossergame.co.uk/gang/credit/*
// @include        *menelgame.pl/gang/credit/*
// @include        *clodogame.fr/gang/credit/*
// @include        *mendigogame.es/gang/credit/*
// @include        *pennergame.de/gang/gang/?note*
// @include        *dossergame.co.uk/gang/?note*
// @include        *menelgame.pl/gang/?note*
// @include        *clodogame.fr/gang/?note*
// @include        *mendigogame.es/gang/?note*
// @exclude   	   */gang/memberlist/

// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var version = 'berlin';
  var link = 'http://berlin.pennergame.de/';
 }
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var version = 'dossergame';
  var link = 'http://www.dossergame.co.uk/';
 }
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var version = 'hamburg';
  var link = 'http://www.pennergame.de/';
 }
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var version = 'menelgame';
  var link = 'http://www.menelgame.pl/';
  }
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var version = 'clodogame';
  var link = 'http://www.clodogame.fr/';
 }
else if(document.location.href.indexOf('mendigogame.es/')>=0) {
  var version = 'mendigogame';
  var link = 'http://www.mendigogame.es/';
 };


var content = document.getElementById('content');
var membertable = content.getElementsByTagName('table')[0];
var tr = membertable.getElementsByTagName('tr');
var membertabletrs = tr.length;
var memberanzahl = membertabletrs-6;
var url = document.location.href;
var urlname2 = url.split('/gang/?note=');
var urlname = urlname2[1];

if (url.indexOf('/?note=')>=0){
  document.getElementsByTagName('html')[0].innerHTML = '<head><title>Bandennotizen</title><link rel="stylesheet" type="text/css" href="http://media.pennergame.de/de/styles/base32_dev.css" /><link rel="stylesheet" type="text/css" href="http://media.pennergame.de/de/styles/v3_dev.css" /><!--[if IE 7]><link rel="stylesheet" type="text/css" href="http://media.pennergame.de/de/styles/base_ie32_dev.css" /><![endif]--></head>';
    var body = document.createElement('body');
    body.innerHTML = '<a href="'+link+'gang/credit/?showall=1"><- zur Bandenkasse</a><br/ ><center><h2 style="color: white;">Notizen f&uuml;r <u>'+urlname+'</u>.</h2></center><br /><center><textarea name="user_eingabe" cols="100" rows="20">'+GM_getValue("bandennote" + urlname + version)+'</textarea></center><br /><center><input type="button" value="Notizen speichern" /></center>';
    document.getElementsByTagName('html')[0].appendChild(body);

      if (body.getElementsByTagName('textarea')[0].value == "undefined") {
        GM_setValue("bandennote" + urlname + version, "Noch keine Notizen!");
        body.getElementsByTagName('textarea')[0].value = "Noch keine Notizen!";
 };

body.getElementsByTagName('input')[0].addEventListener('click', function save() {
  var inhalt = body.getElementsByTagName('textarea')[0].value;
  GM_setValue("bandennote" + urlname + version, inhalt);
  alert("Notizen gespeichert!");
  }, false);
 };



GM_xmlhttpRequest({
  method:"GET",
  url:""+link+"/gang/memberlist/",
  onload: function(responseDetails) {

var Spendendatum='00.00.'
var Spendensumme=0
var Spender='nobody'
var Vorzeichen ='='
var Spende =new Array();
var Person =new Array();
var Tag = new Array();
var vorhanden
var Personnr
var heute = new Date();
var gestern = new Date(heute.getTime()-24*60*60*1000);
var vorgestern = new Date(heute.getTime()-2*24*60*60*1000);
var tag4 = new Date(heute.getTime()-3*24*60*60*1000);
var tag5 = new Date(heute.getTime()-4*24*60*60*1000);
var tag6 = new Date(heute.getTime()-5*24*60*60*1000);
var tag7 = new Date(heute.getTime()-6*24*60*60*1000);
var sevendays = new Date(heute.getTime()-7*24*60*60*1000);


dheute = new Object();
dgestern = new Object();
dvorgestern = new Object();
dtag4 = new Object();
dtag5 = new Object();
dtag6 = new Object();
dtag7 = new Object();
dsevendays = new Object();


    dheute["Spende"] = 1-1
    dheute["Auszahlung"]=1-1
    dgestern["Spende"] = 1-1
    dgestern["Auszahlung"]=1-1
    dvorgestern["Spende"] = 1-1
    dvorgestern["Auszahlung"]=1-1
	dtag4["Spende"] = 1-1
    dtag4["Auszahlung"]=1-1
	dtag5["Spende"] = 1-1
    dtag5["Auszahlung"]=1-1
	dtag6["Spende"] = 1-1
    dtag6["Auszahlung"]=1-1
	dtag7["Spende"] = 1-1
    dtag7["Auszahlung"]=1-1
	dsevendays["Spende"] = 1-1
    dsevendays["Auszahlung"]=1-1


    for (var i=1;i<responseDetails.responseText.split('tieritemA')[2].split(/\/profil\/id:/).length;i++) {  
      Person[i] = new Object();
      Person[i]["Spende"] = 1-1;
      Person[i]["Auszahlung"]=1-1;
      Person[i]["Name"]=responseDetails.responseText.split('tieritemA')[2].split(/\/profil\/id:/)[i].split('>')[1].split('<')[0]

    }
		
for (var i=0;i<=document.getElementsByClassName('fade').length-1;i++) {  
    Spende[i]= new Object();
    Spende[i]["Spender"] = document.getElementsByClassName('fade')[i].textContent.split(' ')[0].slice(1)
    Spende[i]["Datum"] = document.getElementsByClassName('fade')[i].textContent.split(' am ')[1].slice(0,2)
    Spende[i]["Uhrzeit"] = document.getElementsByClassName('fade')[i].textContent.split(' am ')[1].slice(7,12)
    Spende[i]["Vorzeichen"] = document.getElementsByClassName('fade')[i].parentNode.parentNode.innerHTML.split('"float: right;">')[1].slice(1,2)    
    Spende[i]["Summe"] = document.getElementsByClassName('fade')[i].parentNode.parentNode.childNodes[2].textContent.split(' ')[1].slice(1)
    for(var p=1;p<responseDetails.responseText.split('tieritemA')[2].split(/\/profil\/id:/).length;p++){
      if (Person[p]["Name"]==Spende[i]["Spender"]){
        if (Spende[i]["Vorzeichen"]=='+') { Person[p]["Spende"]=Person[p]["Spende"]*1+Spende[i]["Summe"]*1 }
          else { Person[p]["Auszahlung"]=Person[p]["Auszahlung"]*1+Spende[i]["Summe"]*1 }
        }
    }    
    if(Spende[i]["Datum"]==heute.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dheute["Spende"]=dheute["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dheute["Auszahlung"]=dheute["Auszahlung"]*1+Spende[i]["Summe"]*1 }
       }      
    if(Spende[i]["Datum"]==gestern.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dgestern["Spende"]=dgestern["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dgestern["Auszahlung"]=dgestern["Auszahlung"]*1+Spende[i]["Summe"]*1 }
       }
    if(Spende[i]["Datum"]==vorgestern.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dvorgestern["Spende"]=dvorgestern["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dvorgestern["Auszahlung"]=dvorgestern["Auszahlung"]*1+Spende[i]["Summe"]*1 }
           }  
		if(Spende[i]["Datum"]==tag4.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dtag4["Spende"]=dtag4["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dtag4["Auszahlung"]=dtag4["Auszahlung"]*1+Spende[i]["Summe"]*1 }
           }		   
	if(Spende[i]["Datum"]==tag5.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dtag5["Spende"]=dtag5["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dtag5["Auszahlung"]=dtag5["Auszahlung"]*1+Spende[i]["Summe"]*1 }
           }
	if(Spende[i]["Datum"]==tag6.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dtag6["Spende"]=dtag6["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dtag6["Auszahlung"]=dtag6["Auszahlung"]*1+Spende[i]["Summe"]*1 }
           }
	if(Spende[i]["Datum"]==tag7.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dtag7["Spende"]=dtag7["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dtag7["Auszahlung"]=dtag7["Auszahlung"]*1+Spende[i]["Summe"]*1 }
           }
	if(Spende[i]["Datum"]==sevendays.getDate()){
          if (Spende[i]["Vorzeichen"]=='+') { dsevendays["Spende"]=dsevendays["Spende"]*1+Spende[i]["Summe"]*1 }
            else { dsevendays["Auszahlung"]=dsevendays["Auszahlung"]*1+Spende[i]["Summe"]*1 }
           }	   
    }

document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
Zeile.innerHTML='<br><hr size="1"><br><table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span style="float:left">Kontobewegungen (Tage)</td><td><span style="float:right">Einzahlung</span></td><td><span  style="float:right">Auszahlungen</span></td><td><span  style="float:right">Tages Notizen</span></td></tr></table>'

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>Heute: </b></td><td><span class="positive" style="float:right">+'+dheute["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dheute["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Heute" target="_blank">[Notizen]</a></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>Gestern: </b></td><td><span class="positive" style="float:right">+'+dgestern["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dgestern["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Getsern" target="_blank">[Notizen]</a></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>Vorgestern: </b></td><td><span class="positive" style="float:right">+'+dvorgestern["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dvorgestern["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Vorgestern" target="_blank">[Notizen]</a></td></tr></table> '
 
 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>4 Tage: </b></td><td><span class="positive" style="float:right">+'+dtag4["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dtag4["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Tag4" target="_blank">[Notizen]</a></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>5 Tage: </b></td><td><span class="positive" style="float:right">+'+dtag5["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dtag5["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Tag5" target="_blank">[Notizen]</a></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>6 Tage: </b></td><td><span class="positive" style="float:right">+'+dtag6["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dtag6["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Tag6" target="_blank">[Notizen]</a></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>7 Tage: </b></td><td><span class="positive" style="float:right">+'+dtag7["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dtag7["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Tag7" target="_blank">[Notizen]</a></td></tr></table> '
 
 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>1 Woche: </b></td><td><span class="positive" style="float:right">+'+dsevendays["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dsevendays["Auszahlung"]+' &euro;</span></td><span class="fade" style="float:right"><a href="/gang/?note=Woche1" target="_blank">[Notizen]</a></td></tr></table> '







document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
Zeile.innerHTML='<br><hr size="1"><br><table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span style="float:left">Kontobewegungen (ca. 2 Wochen)</td><td><span style="float:right">Einzahlung</span></td><td><span  style="float:right">Auszahlungen</span></td><td><span  style="float:right">Notizen</span></td></tr></table>'

for(var p=1;p<responseDetails.responseText.split('tieritemA')[2].split(/\/profil\/id:/).length;p++){
 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild












 Zeile.innerHTML='<table width="100%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="240"><col width="80"><col width="80*"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left">'+Person[p]["Name"]+'</td><td><span class="positive" style="float:right">+'+Person[p]["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+Person[p]["Auszahlung"]+' &euro;</span></td><td><span class="fade" style="float:right"><a href="/gang/?note='+Person[p]["Name"]+'" target="_blank">[Notizen]</a></td></tr></table>'
 }

}
	});
	


	