
// ==UserScript==
// @name           automatisch waschen Version.2 mit timer 
// @namespace      by basti1012  (http://pennerhack.foren-city.de).
// @description    Geht automatisch waschen sobald man eine besztimmte prozent zahl an sauberkeit erreicht hat.Zeigt in der uebersuicht die aktuelle sauberkeit an ab einer bestimmten zeit geeht er automaztisch waschen jetzt mit timer stunden an aus
// @include        http://*pennergame.de*
// @include        http://*berlin.pennergame.de*
// @include        http://*menelgame.pl*
// @include        http://*dossergame.co.uk*
// ==/UserScript==

var Blinktext = 'hallo Kathrin komm her Nimm ihn in den Mund Der dicke bauch darf zukucken';
var blinkTimeout = 500;
var blinkIdx = 0;
function blink () {
if ( document.all && document.all.blink ) {
blinkIdx = (blinkIdx+=1) % 2 ;
var color = blinkColTbl [ blinkIdx ];
if ( document.all.blink.length ) {
for(i=0;i<document.all.blink.length;i++)
document.all.blink[i].style.color=color;
} else
document.all.blink.style.color=color;
setTimeout( "blink();" , blinkTimeout);
}}

var waschfarbe = 'yellow';

//document.getElementById("provocation_area").style.backgroundImage = 'none';
//document.getElementById("provocation_area").style.backgroundColor = 'red';
/*
document.getElementById("provocation_area").innerHTML = '<li class="submit"><input class="formbutton" type="submit" value="Logout" /><select name="Sauber" id="Sauber" size="1">'
+'<option value="10">10</option>'
+'<option value="20">20</option>'
+'<option value="30">30</option>'
+'<option value="40">40</option>'
+'<option value="50">50</option>'
+'<option value="60">60</option>'
+'<option value="70">70</option>'
+'<option value="80">80</option>'
+'</select>'
+'<input type ="button" id="Sauberklick" value = "Speichern">'
+'Ab:<input type ="text" id="waschenwann" size="1" value="'+GM_getValue("waschenwann")+'" >'
+'Bis:<input type ="text" id="waschenende" size="1" value="'+GM_getValue("waschenende")+'">'
+'Sauberkeit:'+GM_getValue("waschenende")+'%>';	
+<li class="submit"><input class="formbutton" type="submit" value="Logout" /><select name="Sauber" id="Sauber" size="1">'
+'<option value="10">10</option>'
+'<option value="20">20</option>'
+'<option value="30">30</option>'
+'<option value="40">40</option>'
+'<option value="50">50</option>'
+'<option value="60">60</option>'
+'<option value="70">70</option>'
+'<option value="80">80</option>'
+'</select><td>';
+'<input type ="button" id="Sauberklick" value = "Speichern">Ab:<input type ="text" id="waschenwann" size="1" value="'+GM_getValue("waschenwann")+'" >Bis:<input type ="text" id="waschenende" size="1" value="'+GM_getValue("waschenende")+'">;Sauberkeit: '+text2+'%</li>'	
*/



//document.getElementById("provocation_area").innerHTML = '<span style=\"color:blue; font-size:150%;\"><b><blink><span id="blink">'+Blinktext+'</span></blink></b></span>';
// geht document.getElementById("provocation_area").innerHTML = '<b><blink><span id="blink">'+Blinktext+'</span></blink></b>';
//document.getElementById("provocation_area").innerHTML = "<span style=\"color:red; font-size:750%;\"><blink><span id="blink"><b>"+Blinktext+"</b></span></blink></span>";

//<b><blink><span id="blink">'+Blinktext+'</span></blink></b>


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
var waschenwann = GM_getValue("waschenwann");
if (waschenwann == null){
waschenwann = '0';
GM_setValue("waschenwann" , waschenwann);
};
var waschenende = GM_getValue("waschenende");
if (waschenende == null){
waschenende = '23';
GM_setValue("waschenende" , waschenende);
};


var jetzt = new Date();
var Std = jetzt.getHours();
var Min = jetzt.getMinutes();
var StdAusgabe = ((Std < 10) ? "0" + Std : Std);
var MinAusgabe = ((Min < 10) ? "0" + Min : Min);
//alert("Bei Ihnen ist es jetzt " + StdAusgabe + "." + MinAusgabe + " Uhr");// aktuelle time


GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: ''+pgurl+'/overview/',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
			var text1 = content.split('Sauberkeit:')[1];
			var text2 = text1.split('%')[0];
document.getElementById("provocation_area").innerHTML = '<span style=\"color:'+waschfarbe+'; font-size:100%;\"><b>Waschbot ab wie viel Prozent waschhen?</b></span><select name="Sauber" id="Sauber" size="1"'
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
+'<span style=\"color:'+waschfarbe+'; font-size:100%;\"><b>Ab:<b/></span><input type ="text" id="waschenwann" size="1" value="'+GM_getValue("waschenwann")+'" ><span style=\"color:'+waschfarbe+'; font-size:100%;\"><b>Bis:</b></span><input type ="text" id="waschenende" size="1" value="'+GM_getValue("waschenende")+'"><span style=\"color:'+waschfarbe+'; font-size:100%;\"><b>Uhr</b></span><input type ="button" id="Sauberklick" value = "Speichern"><span style=\"color:'+waschfarbe+'; font-size:100%;\"><b>Aktuelle Sauberkeit: '+text2+'%</b></span></li>'	

waschenwann =GM_getValue("waschenwann");
waschenende =GM_getValue("waschenende");

function suchen(){

if (Std >= waschenwann && Std < waschenende) {

 //alert("waschen an ");

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
		 window.location.reload();//alert("deine sauberkeit wahr unter "+clean+" Prozent habe mich gewaschen");
      }
  });
}
}});

}
//else alert("ende");
}
//alert("ss"+Sauber+" ss "+GM_getValue("Sauber")+"ss");

document.getElementById('Sauberklick').addEventListener('click', function startw() {

var Sauber = document.getElementById('Sauber').value;
Sauber = GM_setValue("Sauber" , Sauber);

var waschenwann = document.getElementById('waschenwann').value;
waschenwann = GM_setValue("waschenwann" , waschenwann);

var waschenende = document.getElementById('waschenende').value;
waschenende = GM_setValue("waschenende" , waschenende);

alert("Du hast automatisches Waschen ab  "+GM_getValue("Sauber")+"  Prozent ausgesucht Dabei beginnt es erst um "+GM_getValue("waschenwann")+" und endet um "+GM_getValue("waschenende")+"");
location.reload();

}, false);

var abcd = '30000';
window.setInterval(suchen, abcd);
		}
	});

// Copyright by basti1012


