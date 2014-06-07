// ==UserScript==
// @name           JeuxDeMots Help Script :)
// @namespace      Plop
// @description    Un peu d'aide pour les joueurs de JDM
// @include        http://www.lirmm.fr/jeuxdemots/generateGames.php*
// @version        1.0
// @author         Arnaud BEY
// ==/UserScript==
var mot = document.getElementById('jdm-gameentry-block-text').innerHTML;
var length_total = mot.length;
var length = length_total - 12;
mot = mot.substr(6, length);

var reg=new RegExp(">[0-9]+","g");
mot = mot.replace(reg,"");



document.body.innerHTML += '<div style="z-index: 2147483647;position:fixed;right:180px;top:150px;opacity:0.8;background-color:white;padding:4px;border:1px solid #069"><a target="_blank" href="http://fr.wikipedia.org/wiki/'+mot+'"><img style="border:1px solid grey" src="http://www.arnaud-bey.fr/bordel/icone_jdm/wikipedia.gif" style="border:1px solid grey" title="wikipedia"/></a>&nbsp;<a target="_blank" href="http://www.cnrtl.fr/definition/'+mot+'"><img style="border:1px solid grey" src="http://www.arnaud-bey.fr/bordel/icone_jdm/cnrtl.png"/></a>&nbsp;<a target="_blank" href="http://www.larousse.fr/dictionnaires/francais/'+mot+'/locution"><img style="border:1px solid grey" src="http://www.arnaud-bey.fr/bordel/icone_jdm/larousse.gif" title="Larousse"/></a>&nbsp;<a target="_blank" href="http://fr.wiktionary.org/wiki/'+mot+'"><img src="http://www.arnaud-bey.fr/bordel/icone_jdm/wiktionnary.png" style="border:1px solid grey" title="wiktionnary"/></a></div>';