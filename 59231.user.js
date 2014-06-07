// ==UserScript==
// @name           angriffswarner hamburg berlin  basti1012 fuer pennergame 4.0 
// @namespace      by basti1012 (visit pennerhack.foren-city.de.de)
// @description    Zeigt an ob man angegriffen wird und vieles mehr  
// @include        *pennergame.de*
// ==/UserScript==



var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://berlin.pennergame.de"
var fightUrl = 'http://berlin.pennergame.de/fight/overview/';

}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var fightUrl = 'http://www.pennergame.de/fight/overview/';

}
var ausweich = 'Ausweichen';

GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/warning/)){
            var part = content.split("warning")[1].split("<td>")[1];
            var TimeOfImpact = part.split("</td>")[0];				
try{
   var incoming1 = content.split(''+ausweich+'</strong></td>')[1];
}catch(e){
}				
  var allincoming = incoming1.split('</table>')[0];
  var anzahl = allincoming.split('<tr').length-1;	
  var id1 = allincoming.split('<a href="/profil/id:')[1]							
  var id2 = id1.split('/')[0];

gegnersuuchen(id2,anzahl,TimeOfImpact);

   }
}});



function gegnersuuchen(id2,anzahl,TimeOfImpact){

GM_xmlhttpRequest({
  method: 'GET',
   url: ''+link+'/dev/api/user.' + id2 + '.xml',
    onload: function(responseDetails,id2) {
      var parser = new DOMParser();
      var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      var name = dom.getElementsByTagName('name')[0].textContent;
      var id2 = dom.getElementsByTagName('id')[0].textContent;
      try {
      var name1 = dom.getElementsByTagName('name')[1].textContent;
      var id21 = dom.getElementsByTagName('id')[1].textContent;
      }catch (e) {
      var name1 =  '-';
      var id21 = '-';
      }

      try {
      var cash = dom.getElementsByTagName('cash')[0].textContent;
      }catch (e) {
      var cash = '0';
      }

      if (cash >= 1000) {
        var color = "yellow";
      }
     
      if (cash >= 15000){
        var color = "orange";

      }
      if (cash >= 20000){
        var color = "green";

      }
      if (cash >= 25000){
        var color = "red";

      }
      if (cash >= 30000){
        var color = "blue";

      }
      if (cash >= 40000){
        var color = "black";
      }



geld(cash);
GM_setValue('cash',cash);


function geld(cash){
var cash1 = GM_getValue('cash');
if(cash == Number(cash1)){
}else{
var cash3 = cash/100;
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML += '<div style="top: 100px;" id="notifyme" class="zabsolute zleft"><div class="icon ok zleft" id="nicon">&nbsp;</div><div class="zleft right" id="ntext"><h2>Achtung</h2><p>Dein Ziel hat soeben Geld ausgegeben oder dazuverdient bitte checke ob der angriff sich noch lohnt aktuelles Geld von Gegner<font style=\"color:'+color+'; font-size:100%;\"><b> '+cash3+'</b></font>.</div></div>';
}
}



GM_xmlhttpRequest({             
method: 'GET',
url: ''+link+'/profil/id:'+id2+'/',
onload: function(responseDetails){
var content = responseDetails.responseText;
var suche = content.search("Ist gerade Online");
try{
if (suche != -1) {
var online = "<img src='http://media.pennergame.de/img/on.gif' width='16' height='16'>";
var on = '1';
}
else {
var on = '2';
var online = "<img src='http://media.pennergame.de/img/off.gif' width='16' height='16'>";
};
}catch(e){
var on = '3';
var online = '<font style=\"color:black; font-size:100%;\"><b>geloescht</b></font>';
}
GM_setValue('on',on);
gegneron(on);
var cash3 = cash/100;
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML = '<div style="top: 100px;" id="notifyme" class="zabsolute zleft"><div class="icon fight zleft" id="nicon">&nbsp;</div><div class="zleft right" id="ntext">'
+'<h2>Eingehende K&auml;mpfe  '+anzahl+' </h2>'
+'<p><b>Name: </b><a href="/profil/id:'+id2+'/"><font style=\"color:green; font-size:100%;\"><b>'+name+'</b></font></a>'
+'<br><b>Bande :</b> <a href="/profil/bande:'+id21+'/"><font style=\"color:green; font-size:100%;\"><b>'+name1+'</b></font></a>'
+'<br><b> Geld : </b><font style=\"color:green; font-size:100%;\"><b> '+cash3+'  &euro;  </b> </font>'+online+''
+'<br><b>Ende Kampf:</b><font style=\"color:green; font-size:100%;\"><b><b>'+TimeOfImpact+'</b></font></p></div></div>';



function gegneron(on){
var online1 = GM_getValue('on');
if(on == Number(online1)){
}else
if(on == 1){
var wasistlos = ' Deiner gegner ist onliene';
}else 
if(on == 2){
var wasistlos = ' Deiner gegner ist offline';
}else
if(on == 3){
var wasistlos = ' Deiner gegner wurde von Pennergame geloescht bitte breche den KAMPF SOFORT AB UM kEINE NACHTEILE DURCH DEN sYSTEMFEHLER ZU ERHALTEN';
}
var tbody = document.getElementsByClassName('zabsolute zleft')[0];
tbody.innerHTML += '<div style="top: 100px;" id="notifyme" class="zabsolute zleft"><div class="icon ok zleft" id="nicon">&nbsp;</div><div class="zleft right" id="ntext"><h2>Achtung</h2><p>Dein Ziel hat sich gerade ein oder ausgelogt aktueller status deines gegners  '+wasistlos+'.</div></div>';
}
}});
}});
}
// copyright by basti1012 




GM_xmlhttpRequest({
	method: 'GET',
	url: fightUrl,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		if(content.match(/bereits auf/)){
			try{
				var idausgang = content.split('bereits auf')[1].split("Angriff abbrechen")[0];
				var idaus = idausgang.split('<a href="/profil/id:')[1].split("/")[0];

					GM_xmlhttpRequest({
  						method: 'GET',
   						url: ''+link+'/dev/api/user.'+idaus+'.xml',
   							 onload: function(responseDetails,id2) {
      								var parser = new DOMParser();
      								var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
      								var name = dom.getElementsByTagName('name')[0].textContent;
      								var id2 = dom.getElementsByTagName('id')[0].textContent;
      									try {
      										var name1 = dom.getElementsByTagName('name')[1].textContent;
      										var id21 = dom.getElementsByTagName('id')[1].textContent;
      									}catch (e) {
      										var name1 =  '-';
      										var id21 = '-';
      									}
      									try {
      										var cash = dom.getElementsByTagName('cash')[0].textContent;
      									}catch (e) {
      										var cash = '0';
      									}

     				if (cash >= 1000) {
      			 	var color = "yellow";}
     				if (cash >= 15000){
      				var color = "orange";}
      				if (cash >= 20000){
      				var color = "green";}
      				if (cash >= 25000){
        			var color = "red";}
        			if (cash >= 30000){
        			var color = "blue";}
        			if (cash >= 40000){
        			var color = "black";}



					var penner = 'Pennername : <a href="/profil/id:'+id2+'/"><font style=\"color:green; font-size:100%;\"><b>'+name+'</b></font></a>'
					var bande = 'Bandenname : <a href="/profil/bande:'+id21+'/"><font style=\"color:green; font-size:100%;\"><b>'+name1+'</b></font></a>'
					var cash6 = cash/100;
					var tbody = document.getElementsByClassName('zabsolute zleft')[0];
					tbody.innerHTML += '<div style="top: 100px;" id="notifyme" class="zabsolute zleft"><div class="icon ok zleft" id="nicon">&nbsp;</div><div class="zleft right" id="ntext"><h2>Achtung</h2><p>'+penner+'<br>'+bande+'<br>Hat zur Zeit  <font style=\"color:'+color+'; font-size:100%;\">  <b>   '+cash6+'   &euro;   </b>    </font>    auf den Konto.</div></div>';
				}});
			}catch(e){}			
		}
	}
});














