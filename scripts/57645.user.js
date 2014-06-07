// ==UserScript==
// @name           Alles Anzeige User profil by basti1012 alle games fuer Pennergame Berlin Hamburg Menelgame Dossergame und Clodogame Premium oder nicht Premium Profile
// Version         xxa 1.142.a
// @namespace      by basti1012 (visit http://pennerhack.foren-city.de)
// @description    sobald man ein profil betretten tut wird alles angezeigt was angezeigt werden kann ueber den penner.
// @include        http://*pennergame.de/profil/id:*
// @include        http://*dossergame.co.uk/profil/id:*
// @include        http://*menelgame.pl/profil/id:*
// @include        http://*clodogame.fr/profil/id:*
// ==/UserScript==
// Dieses Script ist Copyright by basti1012 wem es nicht gefallen tut der muss es ja nicht benutzen
var chee = document.body.innerHTML.split('/messages/write/?to=');
var chee1 = chee[1].split('" style');
var id = chee1[0];


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var apiurl = 'http://berlin.pennergame.de/dev/api/';
  var pgurl = 'http://berlin.pennergame.de/';
var Stadtteil = 'Stadtteil';
var Online = 'Ist gerade Online';
  var sigurl = 'http://imgberlin.pennergame.de/cache/bl_DE/signaturen/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var apiurl = 'http://dossergame.co.uk/dev/api/';
  var pgurl = 'http://dossergame.co.uk/';
var Stadtteil = 'District';
var Online = 'is online';
  var sigurl = 'http://img.dossergame.co.uk/cache/en_EN/signaturen/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var apiurl = 'http://pennergame.de/dev/api/';
  var pgurl = 'http://www.pennergame.de/';
var Stadtteil = 'Stadtteil';
var Online = 'Ist gerade Online';
  var sigurl = 'http://img.pennergame.de/cache/de_DE/signaturen/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var apiurl = 'http://menelgame.pl/dev/api/';
  var pgurl = 'http://menelgame.pl/';
var Stadtteil = 'Dzielnica';
var Online = 'nie online';
  var sigurl = 'http://img.menelgame.pl/cache/pl_PL/signaturen/';
}
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var apiurl = 'http://clodogame.fr/dev/api/';
  var pgurl = 'http://clodogame.fr/';
var Stadtteil = 'Quartier';
var Online = 'Est actuellement en ligne';
  var sigurl = 'http://img.clodogame.fr/cache/fr_FR/signaturen/';
};

var schrieftfarbel = 'blue';
var schrieftgroesel = '140';

var VonOben1 = '150'; //px
var VonRechts1 = '10'; //px
var borderfarbe1 = 'yellow';
var hintergrundfarbe1 = 'black';
var schrieftfarbe1 = 'red';
var schrieftfarbe2 = 'green';
var schrieftgroese1 = '120';
var borderbreite1 = '1';

var VonOben12 = '0'; //px
var VonRechts12 = '10'; //px
var borderfarbe12 = 'red';
var hintergrundfarbe12 = 'black';
var schrieftfarbe12 = 'red';
var schrieftfarbe22 = 'green';
var schrieftgroese12 = '120';
var borderbreite12 = '1';

var VonOben122 = '370'; //px
var VonRechts122 = '10'; //px
var borderfarbe122 = 'blue';
var hintergrundfarbe122 = 'black';
var schrieftfarbe122 = 'red';
var schrieftfarbe122 = 'green';
var schrieftgroese122 = '120';
var borderbreite122 = '1';

if (id >= 1) {

GM_xmlhttpRequest({
method: 'GET',
url: ''+apiurl+'user.' + id + '.xml',
onload: function(responseDetails) {

        var parser = new DOMParser();
        var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
try{
        var namew = dom.getElementsByTagName('name')[0].textContent;
        var id = dom.getElementsByTagName('id')[0].textContent;
        var punkte = dom.getElementsByTagName('points')[0].textContent;
        var platz = dom.getElementsByTagName('position')[0].textContent;
        var datum = dom.getElementsByTagName('reg_since')[0].textContent;
        var name = "<a style='float:left; font-size:small' href='"+pgurl+"profil/id:" + id + "/'>" + namew + "</a>";
}catch(e){}


        try {
	var geld = dom.getElementsByTagName('cash')[0].textContent / 100;
	var promille = "<div style='overflow: hidden; width: 40px; height: 15px;'><img style='position: relative; top: -40px; left: -120px;' src='"+sigurl+"" + id + ".jpg'></div>";
	  }
catch (e) {
	var geld = "DEAKTIVIERT";
	var promille = "DEAKTIVIERT";
	var sigi = "Deaktiviert";
}

function bande(){

   try{
	var bande = dom.getElementsByTagName('name')[1].textContent;
	var id2 = dom.getElementsByTagName('id')[1].textContent;
	var bandeq = "<a style='float:left; font-size:small' href='"+pgurl+"profil/bande:" + id2 + "/'>" + bande + "</a>";

         GM_xmlhttpRequest({
		method: 'GET',
  		url: ''+apiurl+'/gang.'+id2+'.xml',
	  	onload: function(responseDetails) {
		      var parser = new DOMParser();
		      var dom2 = parser.parseFromString(responseDetails.responseText, "application/xml");
	              var mitglieder = dom2.getElementsByTagName('member_count')[0].textContent;
		      var bandenpunkte = dom2.getElementsByTagName('points')[0].textContent;
             	      var bandenplatz = dom2.getElementsByTagName('position')[0].textContent;
	  	      var status = dom.getElementsByTagName('status')[0].textContent;


        if (status==3) {
var status = "<img src='http://media.pennergame.de/img/bande/admin.gif' /> Admin</span>";
        }
        else if (status==2) {
var status = "<img src='http://media.pennergame.de/img/bande/coadmin.gif' /> Co-Admin</span>";
        }
        else if (status==1) {
var status = "<img src='http://media.pennergame.de/img/bande/member.gif' /> Mitglied</span>";
        }
        else if (status==0) {
var status = "KEINE BANDE";

};

 var newspana122 = document.createElement("tr");
  newspana122.setAttribute('id', 'news_blaa122');
   newspana122.setAttribute('name', 'news__blaa122');
    newspana122.setAttribute('style', 'position:absolute;top:'+VonOben122+'px;right:'+VonRechts122+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite122+'px solid '+borderfarbe122+'; background-color:'+hintergrundfarbe122+'');
     var navigation = document.getElementById("header");
      navigation.appendChild(newspana122);
       document.getElementById("news_blaa122").innerHTML = '<br>'

+'<span style=\"color:'+schrieftfarbel+'; font-size:'+schrieftgroesel+'%;\">Banden-<br>informationen:</span><br>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+bandeq+'</span><br><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Mitglieder:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+mitglieder+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">D-Punkte:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+bandenpunkte+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Platz:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+bandenplatz+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Status:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+status+'</span><br><br>'
+'<br>';


 				 }});
}catch(e){}


}



function signaturjanein (){
try{
var sigi = "<img  src='"+sigurl+"" + id + ".jpg'></div>";

 var newspana12 = document.createElement("tr");
  newspana12.setAttribute('id', 'news_blaa12');
   newspana12.setAttribute('name', 'news__blaa12');
    newspana12.setAttribute('style', 'position:absolute;top:'+VonOben12+'px;right:'+VonRechts12+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite12+'px solid '+borderfarbe12+'; background-color:'+hintergrundfarbe12+'');
     var navigation = document.getElementById("header");
      navigation.appendChild(newspana12);
       document.getElementById("news_blaa12").innerHTML = '<br>'

+'<span style=\"color:'+schrieftfarbel+'; font-size:'+schrieftgroesel+'%;\">Signatur des Penners:</span><br>'
+'<br><br>'+sigi+''
+'';
}catch(e){}	

}









 GM_xmlhttpRequest({
  	method: 'GET',
	url: ''+pgurl+'/profil/id:'+id+'/',
	onload: function(responseDetails) {
         var profil = responseDetails.responseText;
			try{
			      var stadtteil3 = profil.split(''+Stadtteil+'')[1];
			      var stadtteil2 = stadtteil3.split('">')[1];
		              var stadtteil = stadtteil2.split('<')[0];
		}catch(e){}
  			    var suche = profil.search(""+Online+"");
try{
	  		    if (suche != -1) {
var online = "<img src='http://media.pennergame.de/img/on.gif'></img>";
			      }
			      else {
var online = "<img src='http://media.pennergame.de/img/off.gif'></img>";
			      };

}catch(e){}



 var newspana = document.createElement("tr");
  newspana.setAttribute('id', 'news_blaa');
   newspana.setAttribute('name', 'news__blaa');
    newspana.setAttribute('style', 'position:absolute;top:'+VonOben1+'px;right:'+VonRechts1+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite1+'px solid '+borderfarbe1+'; background-color:'+hintergrundfarbe1+'');
     var navigation = document.getElementById("header");
      navigation.appendChild(newspana);
       document.getElementById("news_blaa").innerHTML = '<br>'
+'<span style=\"color:'+schrieftfarbel+'; font-size:'+schrieftgroesel+'%;\">Penner-<br>informationen:</span><br>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+name+'</span><br><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Punkte:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+punkte+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Platz:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+platz+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Regdatum:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+datum+'</span><br>'

+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Geld:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+geld+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Promille:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+promille+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Stadtteil:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+stadtteil+'</span><br>'
+'<span style=\"color:'+schrieftfarbe1+'; font-size:'+schrieftgroese1+'%;\">Online:</span>'
+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">'+online+'</span><br>'
+'<br>';


try{
 var newspana12 = document.createElement("tr");
  newspana12.setAttribute('id', 'news_blaa12');
   newspana12.setAttribute('name', 'news__blaa12');
    newspana12.setAttribute('style', 'position:absolute;top:'+VonOben12+'px;right:'+VonRechts12+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite12+'px solid '+borderfarbe12+'; background-color:'+hintergrundfarbe12+'');
     var navigation = document.getElementById("header");
      navigation.appendChild(newspana12);
       document.getElementById("news_blaa12").innerHTML = '<br>'

+'<span style=\"color:'+schrieftfarbe2+'; font-size:'+schrieftgroese1+'%;\">Signatur des Penners wo du gerade bist:</span><br>'
+'<br><br>'+sigi+''
+'';
}catch(e){}	
signaturjanein ();
bande();		       

  		}});            
	}});
}

// copyright by basti1012