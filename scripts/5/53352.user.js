
// ==UserScript==
// @name           automatisch waschen Version.Test.1
// @namespace      by basti1012  (http://pennerhack.foren-city.de).
// @description    Geht automatisch waschen sobald man eine besztimmte prozent zahl an sauberkeit erreicht hat.Zeigt in der uebersuicht die aktuelle sauberkeit an ab einer bestimmten zeit geeht er automaztisch waschen
// @include        http://*pennergame.de*
// @include        http://*berlin.pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk*
// ==/UserScript==

// Dieses Script geht fuer euch sich Automatisch Waschen bis die eingestellte Zahl erreicht ist 
// Dieses Script ist automatisiert und ist laut Pg nicht legal ,deshalb wwer das Script benutz
// solte nix sagen und seine fragen und probleme zu den Script nur Privat mit Basti1012 geklert 
// werden danmit es keine falschen Leute mit kriegen das du dieses Script benutzen tust

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var siglink = 'http://imgberlin.pennergame.de/cache/bl_DE/signaturen/';
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var siglink = 'http://img.pennergame.de/cache/de_DE/signaturen/';
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var siglink = 'http://img.menelgame/cache/pl_PL/signaturen/';
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var siglink = 'http://img.dossergame.co.uk/cache/en_EN/signaturen/';
var pgurl = 'http://dossergame.co.uk/';
};
var Sauber = GM_getValue("Sauber");
if (Sauber == null){
Sauber = '50';
GM_setValue("Sauber" , Sauber);
};


GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: ''+pgurl+'/overview/',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
			var text1 = content.split('Sauberkeit:')[1];
			var text2 = text1.split('%')[0];
			var table = document.getElementsByTagName('form')[0];
			var td = table.getElementsByTagName('li')[6];
			td.innerHTML = '<li class="submit"><input class="formbutton" type="submit" value="Logout" /><select name="Sauber" id="Sauber" size="1"'
+'onchange="Sauber"'
+'<option value="10">10</option>'
+'<option value="20">20</option>'
+'<option value="30">30</option>'
+'<option value="40">40</option>'
+'<option value="50">50</option>'
+'<option value="60">60</option>'
+'<option value="70">70</option>'
+'<option value="80">80</option>'
+'</select><td>'
+'<input type ="button" id="Sauberklick" value = "Speichern">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sauberkeit: '+text2+'%</li>'	


function suchen(){


GM_xmlhttpRequest({
  method: 'GET',
  url: ''+pgurl+'overview/',
      onload: function( response ) {
      var content = response.responseText;
      var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
      var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
Sauber =GM_getValue("Sauber");
if(clean < Number(Sauber)){

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'city/washhouse/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('id=2&submitForm=F%C3%BCr+%E2%82%AC6%2C00+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("deine sauberkeit wahr unter "+clean+" Prozent habe mich gewaschen");
      }
  });
}
}});

}
//alert("ss"+Sauber+" ss "+GM_getValue("Sauber")+"ss");

document.getElementById('Sauberklick').addEventListener('click', function startw() {
var Sauber = document.getElementById('Sauber').value;
Sauber = GM_setValue("Sauber" , Sauber);
alert("Du hast automatisches Waschen ab  "+GM_getValue("Sauber")+"  Prozent ausgesucht");
location.reload();

}, false);

var abcd = '3000';
window.setInterval(suchen, abcd);
		}
	});

// Copyright by basti1012