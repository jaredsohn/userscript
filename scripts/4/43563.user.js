// ==UserScript==
// @name           Tageseinnahmen
// @author         Greensky
// @namespace      noname
// @description    Zeigt in der Bandenkasse unter "alle Anzeigen" weitere Statistiken (pro User/Pro Tag)
// @include        http://www.pennergame.de/gang/credit/?showall=1
// ==/UserScript==

	GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.pennergame.de/gang/memberlist/",
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


dheute = new Object();
dgestern = new Object();
dvorgestern = new Object();

    dheute["Spende"] = 1-1
    dheute["Auszahlung"]=1-1
    dgestern["Spende"] = 1-1
    dgestern["Auszahlung"]=1-1
    dvorgestern["Spende"] = 1-1
    dvorgestern["Auszahlung"]=1-1







    
    
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
    }

document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
Zeile.innerHTML='<br><hr size="1"><br><table width="80%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="160"><col width="80"><col width="80*"></colgroup><tr><td><span style="float:left">Tag</td><td><span style="float:right">Spenden</span></td><td><span  style="float:right">Auszahlungen</span></td></tr></table>'

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="80%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="160"><col width="80"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>Heute: </b></td><td><span class="positive" style="float:right">+'+dheute["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dheute["Auszahlung"]+' &euro;</span></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="80%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="160"><col width="80"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>Gestern: </b></td><td><span class="positive" style="float:right">+'+dgestern["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dgestern["Auszahlung"]+' &euro;</span></td></tr></table> '

 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="80%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="160"><col width="80"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left"><b>Vorgestern: </b></td><td><span class="positive" style="float:right">+'+dvorgestern["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+dvorgestern["Auszahlung"]+' &euro;</span></td></tr></table> '

document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
Zeile.innerHTML='<br><hr size="1"><br><table width="80%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="160"><col width="80"><col width="80*"></colgroup><tr><td><span style="float:left">Name</td><td><span style="float:right">Spenden</span></td><td><span  style="float:right">Auszahlungen</span></td></tr></table>'

for(var p=1;p<responseDetails.responseText.split('tieritemA')[2].split(/\/profil\/id:/).length;p++){
 document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].appendChild(document.createElement('div'))
 var Zeile = document.getElementsByClassName('tieritemA')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr')[5].getElementsByTagName('td')[0].lastChild
 Zeile.innerHTML='<table width="80%"  border="0" cellspacing="0" cellpadding="0" style="background-color:#373737; margin:1px;"><colgroup><col width="160"><col width="80"><col width="80*"></colgroup><tr><td><span class="fade" style="float:left">'+Person[p]["Name"]+'</td><td><span class="positive" style="float:right">+'+Person[p]["Spende"]+' &euro;</span></td><td><span class="negative" style="float:right">-'+Person[p]["Auszahlung"]+' &euro;</span></td></tr></table>'
 }

}
	});
	


	