// ==UserScript==
// @name           Pennergame schaltzetrale by basti1012
// @namespace      copiright by basti1012 zu finden auf http://pennerhack.foren-city.de
// @description    zeigt alle wichtigen Buttons auf einen Blick und man hat es immer in sicht von überall aus bedinbar das script läuft in berlin hamburg dossergame und menelgame
// @include        *pennergame.de*
// @include        *menelgame.pl*
// @include        *dossergame.co.uk*
// ==/UserScript==`

//var aaa = '<li class="submit"><input class="formbutton" type="submit" value="Dieses ist ein Logout button und  dadurch wird man ausgeloggt normal nee" /><input class="formbutton" type="submit" value="Logout" /><input class="formbutton" type="submit" value="Logout" /><br><input class="formbutton" type="submit" value="Logout" /><br>Hallo<input class="formbutton" type="submit" value="Logout" />';


if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var gew = 'imgberlin.pennergame.de/cache/bl_DE/';
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var gew = 'img.pennergame.de/cache/de_DE/';
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var gew = 'img.menelgame.pl/cache/pl_PL/';
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var gew = 'img.dossergame.co.uk/cache/en_EN/';
var pgurl = 'http://dossergame.co.uk/';
};
//var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("<img style="border-color:#000000"border="1"src="http://'+gew+'/signaturen/");
//var userid2 = userid1[2].split('.jpg"/>');
//var userid = userid2[0];


GM_xmlhttpRequest(
   {
  method: 'GET',
  url: ''+pgurl+'overview/',
  onload: function(responseDetails) 
	{
       	var content = responseDetails.responseText;
		var text11 = content.split('src="http://'+gew+'signaturen/')[1];
		var userid2 = text11.split('.jpg"/>')[0];


var aaa = '<a><a href="/city/weapon_store/"><img src="http://www.fotos-hochladen.net/waffenkammersmqt3wop.jpg">'         // waffenkammer
+'<a href = "/city/supermarket/"><img src="http://www.fotos-hochladen.net/suppermarktulg0zqpk.jpg">'    // supermarkt
+'<a href = "/messages/"><img src="http://www.fotos-hochladen.net/nachrichtenfgqomy2x.jpg"></a>'              // nachrichten


+'<br><a href = "/stock/plunder/"><img src="http://www.fotos-hochladen.net/plunderln16pexv.jpg">'        // plunder
+'<a href = "/stock/bottle/"><img src="http://www.fotos-hochladen.net/pfqadflascheniflozw84.jpg">'   //flaschen verkaufen
+'<a href = "/friendlist/"><img src="http://www.fotos-hochladen.net/freunde6irxe80o.jpg"></a>'                // freunde

+'<br><a href = "/fight/overview/"><img src="http://www.fotos-hochladen.net/pennerkmpgfef98nlgtm.jpg">'          // peer figghts
+'<a href = "/city/washhouse/"><img src="http://www.fotos-hochladen.net/waschenk7j6emxn.jpg">'
+'<a href = "/city/games/"><img src="http://www.fotos-hochladen.net/glcksspielkem01xbve5.jpg"></a>'                 // glücksspiele


+'<br><a href = "/city/home/"><img src="http://www.fotos-hochladen.net/eigenheime2t3ahlbe.jpg">' 
+'<a href = "/gang/"><img src="http://www.fotos-hochladen.net/deinebanded0o56j37.jpg">'                   // deine bande
+'<a href = "/profil/id:'+userid2+'/"><img src="http://www.fotos-hochladen.net/deinprofilcvm1dith.jpg"></a>';     // dein profil




var zbig = "20";             // groesse der uhr ( zb 1-1000)
var hinterfarbe ="green";       // Hintergrundsfarbe wenn keine erwunscht einfach leer lassen
var zahlfarbe ="red";        // Farbe der Zahlen ( black,blue,red usw)  oder hex codes
var bordera ="16";            // border breite (1,2,3,4,5,6,7,8,9,usw )
var borrad ="10";            // oval bis eckig ( 0-100 )
var borderf = 'black';        // border farbe (green,black,red usw)
var VonOben ="65";           // abstand von oben  ( 0 -??)
var vonseite ="230";          // abstand von der seite ( von rechts oder links was gerade ausgewehlt wurde)
var fest = "absolute";        // festehende uhr oder mit laufende  (absolute oder fixed )
var rightleft = "left";      // Rechts oder Links die uhr ( right oder left) 
var sichtbar = "1.0";         // transparent von 0.4 - 2.0 niee unter 0.4 gehen sonst uhr weg
//####################################################################################################
//################# STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP STOP #####################
//################### hier fengt copyright by basti1012 an #######################################
//#################AB HIER NIX MEHR ENDERN #########################################################
//####################################################################################################
var time_box1 = document.createElement("div");
time_box1.setAttribute('style', 'position:'+fest+';top:'+VonOben+'px;'+rightleft+':'+vonseite+'px; background:'+hinterfarbe+'; -moz-border-radius:'+borrad+'px;-moz-opacity:'+sichtbar+';opacity:'+sichtbar+';border:'+bordera+'px solid '+borderf+';  font:'+zbig+'px arial; z-index:99999;');
//time_box1.setAttribute('style', 'position:'+fest+';top:'+VonOben+'px;'+rightleft+':'+vonseite+'px;');
document.body.insertBefore(time_box1, document.body.firstChild);
var navigation = document.getElementById("header");
navigation.appendChild(time_box1);
time_box1.innerHTML='<span style=\"color:'+zahlfarbe+'; '+aaa+'</span>';

}});
//copiright by basti1012   zu finden unter www.penerhack.foren-city.de
