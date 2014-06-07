// ==UserScript==
// @name           JeuxDeMots Help Script (Diko)
// @namespace      Plop
// @description    Un peu d'aide pour les contributeurs du Diko 
// @include        *diko.php*
// @version        1.7
// @author         Arnaud BEY
// ==/UserScript==


if (document.getElementById('v_toggle_title_fame')) {
	
	var mot = document.title;
	var length_total = mot.length;
	var length = length_total - 10;
	mot = mot.substr(10, length);
	var reg=new RegExp(">[0-9]+","g");
	mot = mot.replace(reg,"");

	document.getElementById('name').innerHTML += '<span style="z-index: 999;position:fixed;top:80px;right:160px;width:170px;"><a href="#" onClick="window.open(\'diko_makewish.php?TB_iframe=true&height=220&width=500\',\'mywindow\',\'width=400,height=200\')"><img src="http://www.arnaud-bey.fr/bordel/icone_jdm/plus.png" title="Invoquer un mot"/></a>&nbsp;&nbsp;&nbsp;&nbsp; <a target="_blank" href="http://fr.wikipedia.org/wiki/'+mot+'"><img style="border:1px solid grey" src="http://www.arnaud-bey.fr/bordel/icone_jdm/wikipedia.gif" style="border:1px solid grey" title="wikipedia"/></a>&nbsp;<a target="_blank" href="http://www.cnrtl.fr/definition/'+mot+'"><img style="border:1px solid grey" src="http://www.arnaud-bey.fr/bordel/icone_jdm/cnrtl.png"/></a>&nbsp;<a target="_blank" href="http://www.larousse.fr/dictionnaires/francais/'+mot+'/locution"><img style="border:1px solid grey" src="http://www.arnaud-bey.fr/bordel/icone_jdm/larousse.gif" title="Larousse"/></a>&nbsp;<a target="_blank" href="http://fr.wiktionary.org/wiki/'+mot+'"><img src="http://www.arnaud-bey.fr/bordel/icone_jdm/wiktionnary.png" style="border:1px solid grey" title="wiktionnary"/></a></span>';



       document.getElementById('v_toggle_about').innerHTML = '';
       document.getElementById('v_toggle_title_about').innerHTML = '';

}