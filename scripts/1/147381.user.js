// ==UserScript==
// @name           RRtesta
// @namespace      http://www.lesroyaumes.com/
// @description    Mets une horloge (utile) a la place du nombre de connectes (inutile)
// @include        http://www.lesroyaumes.com/*
// @author         LJD Mclegrand
// ==/UserScript==

//setTimeout( function(){alert(document.getElementById("zoneEvenement"));},10000);

//document.getElementById("mainContent").watch("innerHTML",function(){alert("hi");});
//alert(unsafeWindow.textePage);
/*setTimeout(function(){
var a=(unsafeWindow.textePage[3]["Texte"]);
a= a.replace(/2013/g,"1461");
a= a.replace(/2012/g,"1460");
a= a.replace(/2011/g,"1459");
a= a.replace(/2010/g,"1458");
a= a.replace(/2009/g,"1457");
a= a.replace(/2008/g,"1456");
a= a.replace(/2007/g,"1455");
a= a.replace(/2006/g,"1454");
a= a.replace(/2005/g,"1453");
unsafeWindow.textePage[3]["Texte"]=a;
},1000);*/

setInterval(function(){
var text = '';
 var date = new Date();
/* var jour_actuel = date.getDay();
var chaine_jour = Array('Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi');
  var jour_semaine = chaine_jour[jour_actuel];
if ( date.getDate() <= 9 ) {  var jour = '0'+date.getDate(); }else {  var jour = date.getDate(); }
var mois_actuel = date.getMonth(); var chaine_mois = Array('janvier', 'f&eacute;vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'ao&ucirc;t', 'septembre', 'octobre', 'novembre', 'd&eacute;cembre');
  var mois = chaine_mois[mois_actuel];
*/
if ( date.getHours() <= 9 ) {  var heure = '0'+date.getHours(); }else {  var heure = date.getHours(); }
if ( date.getMinutes() <= 9 ) {  var minutes = '0'+date.getMinutes(); }else {  var minutes = date.getMinutes(); }
if ( date.getSeconds() <= 9 ) {  var secondes = '0'+date.getSeconds(); }else {  var secondes = date.getSeconds(); }
/*text +=  jour_semaine+' '+jour+' '+mois+' '+(date.getFullYear()-552);
text += '\n';
*/
text +=  heure+':'+minutes+':'+secondes;

var message=text;

var i = document.getElementsByClassName('zone_nbre_joueurs')[0];
//alert(i);
var x ='<div class="element elementLeft"></div><div class="element elementRepeat"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td>'+message+'</td></tr></tbody></table></div><div class="element elementRight"></div>';
if(i){i.innerHTML=x;}
},1000);
