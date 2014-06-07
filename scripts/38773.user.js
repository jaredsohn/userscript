// ==UserScript==
// @name           Exile Dates
// @namespace      Mundows,Simexile
// @description    Ajoute les dates de fin des constructions/trajets
// @include        http://*.exile.fr/game/overview.asp
// @include       http://*.exile.fr/game/map.asp*
// ==/UserScript==

/*============================================================
Version 0.3
Ajout de la date dans la carte du secteur.

Version 0.2
Ajout de la couleur

Version 0.1
Premiï¿½re version.
============================================================*/

var couleur = "ffff00"; // Choisisez la couleur que vous voulez en hexadÃ©cimal, pour vous aider utilisez ce site : http://www.imi21.com/conversion-couleur.html

/* dÃ©tecter sur quelle page on se trouve pour adapter l'affichage*/
var href = window.location.href;
if (href.match(/.*map*/)) {var page = "map";}
else { var page= "overview";}
	
//prend un dÃ©compte et retourne l'heure/date de fin du dÃ©compte 
function HeureFin(decompte)
{
var bientot = false;

var expression = new RegExp('^<span.*','gi');
if(decompte.match(expression)) {
var expression = new RegExp('[0-9]{2}:[0-9]{2}:[0-9]{2}');
var decompte = expression.exec(decompte);
var bientot = true;
}

var now = new Date;
var heurelocale = now.getTime();

//on rÃ©cupÃ©re les jours
var expression = new RegExp('[0-9]{1}j ','gi');
var jours = expression.exec(decompte);
if (jours) { 
	decompte = RegExp.rightContext;
	var formatdefaut = new RegExp('[0-9]{1}','gi');
	var jours = formatdefaut.exec(jours);
	var heurelocale = heurelocale + parseInt(jours)*24*3600*1000;
}

//on rÃ©cupÃ©re les heures
var expression = new RegExp('^[0-9]{2}:','gi');
var heures = expression.exec(decompte);
decompte = RegExp.rightContext;
var formatdefaut = new RegExp('[0-9]{2}','gi');
var heures = formatdefaut.exec(heures);
var heurelocale = heurelocale + parseInt(heures,10)*3600*1000;

//on rÃ©cupÃ©re les minutes
var expression = new RegExp('^[0-9]{2}:','gi');
var minutes = expression.exec(decompte);
decompte = RegExp.rightContext;
var formatdefaut = new RegExp('[0-9]{2}','gi');
var minutes = formatdefaut.exec(minutes);
var heurelocale = heurelocale + parseInt(minutes,10)*60*1000;

//on rÃ©cupÃ©re les secondes
var expression = new RegExp('^[0-9]{2}$','gi');
var secondes = expression.exec(decompte);
decompte = RegExp.rightContext;
var formatdefaut = new RegExp('[0-9]{2}','gi');
var secondes = formatdefaut.exec(secondes);
var heurelocale = heurelocale + parseInt(secondes)*1000;

var date = new Date(heurelocale);
var Heure = date.getHours();
var Minutes = date.getMinutes();
var Jour = date.getDate();
var Mois = date.getMonth()+1;

var retour = "<span style=\"color:#"+couleur+";\">" +Heure+"h"+Minutes+" "+Jour+"/"+Mois+"</span>";
if (bientot) {
var retour = "";
}

return retour;
}

//boucle sur les countdown contenus dans la page et insertion de l'heure de fin
for (var n=0; n<999 ; n++)
{
var compteur = "cntdwn"+n;
if (!document.getElementById(compteur)) {break;}

var countdown = document.getElementById(compteur);
var suitecntdwn = countdown.parentNode.insertBefore(document.createElement('txt'),countdown.nextSibling);

var test = countdown.innerHTML;

if (page=="overview") {
suitecntdwn.innerHTML =  ") ("+HeureFin(test);}
else { suitecntdwn.innerHTML =  " ["+HeureFin(test)+"]";}


}