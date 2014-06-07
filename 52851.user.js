// ==UserScript==
// @name           Verbrechen Information im Info bereich Hamburg,Berlin,dossergame.menelgame,pennergame version 2
// @namespace      By Basti1012 [Pennerhack] www.pennerhack.foren-city.de
// @description    Zeigt im Infobereich ein Kleines Bild ob Verbrechen noch Lauft und wennn man mit Maus drauf Geht wird angezeigt wie viele Minuten das noch laufen tut
// @include        http://*menelgame.pl/*
// @include        http://*berlin.pennergame.de/*
// @include        http://*dossergame.co.uk/*
// @include        http://*pennergame.de/*
// ==/UserScript==
// ################ Hier konnt ihr die Positsion des Bildes andern ##############################

var VonOben = '70'; 
var vonseite = '240'; 
var rightleft = 'right'; 

//##################################### Ab hier nix mehr andern ################################
// ########################### Ab hier fangt der Cpyright by basti1012 an #######################

var jetzt = new Date();
var Std = jetzt.getHours();
var Min = jetzt.getMinutes();
var StdAusgabe = ((Std < 10) ? "0" + Std : Std);
var MinAusgabe = ((Min < 10) ? "0" + Min : Min);

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var crinebaby = "Du bist noch unterwegs:";
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var crinebaby = "Du bist noch unterwegs:";
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var crinebaby = "w drodze:";
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var crinebaby = 'So you better chose your crime wisely. Know your limits';
var pgurl = 'http://dossergame.co.uk/';
};


GM_xmlhttpRequest({
   method:"GET",
   url: ''+pgurl+'/activities/',
   onload:function(responseDetails) {
   content = responseDetails.responseText;
   plunder = content.split(''+crinebaby+'')[1];
   plunder1 = plunder.split('</form>')[0];
   plunder2 = content.split("language='javascript'>counter(")[3];
   plunder3 = plunder2.split(')</script></strong></div></div>')[0];
   plu3 = Math.round((plunder3/60)*100)/100    // Um noch Minuten zu Kriegen


Mine = Math.round(Std*60)
Min1= Math.round(Min*1)
zus = Math.round(Mine+Min1+plu3)
ende = Math.round((zus*100)/60)/10
			
   var blad = document.createElement("a");
   blad.setAttribute('id', 'crime');
   blad.setAttribute('name', 'crime');
   blad.setAttribute('href', '/activities/crime/logs/');
   blad.setAttribute('align', 'left');
   blad.setAttribute('style', 'position:absolute;top:'+VonOben+'px;'+rightleft+':'+vonseite+'px;');
   var navigation = document.getElementById("navigation");
   navigation.appendChild(blad);
   document.getElementById("crime").innerHTML += '<a class="tooltip"><font color=""></span><img src="http://www.fotos-hochladen.net/crimje0835n1dx.jpg" </font><span><small><b>Dein Verbrechen geht noch '+plu3+' Minuten</small></span>';
}});
// Copyright by basti1012 ( Pennerhack.http://pennerhachk.foren-city.de) alle pennergames