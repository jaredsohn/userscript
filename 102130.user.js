// ==UserScript==
// @name         Clodogame - Propre / boire / manger  / vidange d'estomac
// @description  Menu rapide pour Propre / boire / manger  / vidange d'estomac
// @maj          Remise en page sur les 3 villes françaises + Ajout permissions "grant"
// @version      1.6
// @include      *clodogame*
// @exclude      *board.*
// @exclude      *login/*
// @exclude      *logout*
// @exclude      *change_please*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// ==/UserScript==

var url = document.location.href;

if (url.indexOf("www.clodogame.fr")>=0 || url.indexOf("marseille.clodogame.fr")>=0) {
	LienBabiole = 'http://static.pennergame.de/img/pv4/plunder/';
}
else if (url.indexOf("reloaded.clodogame.fr")>=0) {
	LienBabiole = 'http://static.pennergame.de/img/pv4/plunder_new/';
}

LienNouriture = 'http://static.pennergame.de/img/pv4/shop/fr_FR/inventar/';
LienIcone = 'http://static.pennergame.de/img/pv4/icons/';

Pos = document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
Alk = document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
BoireVin = 8;
MangerJB = 1;
MangerCrepe = 1;
MangerBaguettes = 8;
host = 'http://'+window.location.hostname;

if (url.indexOf("www.clodogame.fr")>=0) {
	if (document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML.split('<sup>er</sup>')[0] == "1") {
		document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML = document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML.split('<sup>er</sup>')[0] + "er";
	} else {
		document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML = document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML.split('<sup>e</sup>')[0] + "ème";
	}
	document.getElementsByClassName('zleft profile-data')[0].setAttribute("style","margin:-9px 0 0 0");
	set_pos = "40";
}
if (url.indexOf("marseille.clodogame.fr")>=0) {
	document.getElementsByClassName('zleft profile-data')[0].setAttribute("style","margin:-9px 0 0 0");
	set_pos = "40";
}
else if (url.indexOf("reloaded.clodogame.fr")>=0) {
	if (document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML.split('<sup>er</sup>')[0] == "1") {
		document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML = document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML.split('<sup>er</sup>')[0] + "er";
	} else {
		document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML = document.getElementById('my-profile').getElementsByClassName("el2")[1].innerHTML.split('<sup>e</sup>')[0] + "ème";
	}
	set_pos = "43";
}
document.getElementById('my-profile').innerHTML = document.getElementById('my-profile').innerHTML.replace('<br>','');
document.getElementsByTagName("form")[1].getElementsByTagName('div')[0].innerHTML +=
// Station de lavage
'<input type="button" title="Station de lavage" style="position: absolute; bottom: '+set_pos+'px; background-image: url('+LienBabiole+'seife.png); background-repeat: no-repeat; background-position: 0px 50%; color: rgb(0, 0, 0); width: 53px; left: 17px;" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;25&euro;" id="wasch">'+
// Brique de vin.  Effet: 0.35‰
'<input type="button" title="Brique de vin" style="position: absolute; bottom: '+set_pos+'px; background-image: url('+LienNouriture+'Bier.png); background-repeat: no-repeat; left: 70px; color: rgb(0, 0, 0); width: 35px;" id="wirkung_Bier" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+BoireVin+')">'+
// Jambon-beurre.  Effet: -2.00‰
'<input type="button" title="Jambon-beurre" style="position: absolute; bottom: '+set_pos+'px; background-image: url('+LienNouriture+'Hamburger.png); background-repeat: no-repeat; padding: 0px; color: rgb(0, 0, 0); width: 35px; left: 110px;" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerJB+')" id="wirkung_Hamburger">'+
// Crêpes.  Effet: -1.00‰
'<input type="button" title="Crêpe" style="position: absolute; bottom: '+set_pos+'px; background-image: url('+LienNouriture+'Currywurst.png); background-repeat: no-repeat; background-position: 1px 50%; padding: 0px; color: rgb(0, 0, 0); left: 150px; width: 35px;" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerCrepe+')" id="wirkung_Currywurst">'+
// Baguettes.  Effet: -0.35‰
'<input type="button" title="Baguettes" style="position: absolute; bottom: '+set_pos+'px; background-image: url('+LienNouriture+'Brot.png); background-repeat: no-repeat; padding: 0px; color: rgb(0, 0, 0); left: 190px; width: 35px;" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerBaguettes+')" id="wirkung_Brot">'+
// Vidange d'estomac
'<input type="button" title="Vidange d\'estomac" style="position: absolute; bottom: '+set_pos+'px; background-image: url('+LienIcone+'mitleid.png); background-repeat: no-repeat; padding: 0px; left: 230px; background-position: 0pt 50%; color: rgb(0, 0, 0); width: 22px;" value="" id="vidage_now">';


// VIN
document.getElementById('wirkung_Bier').addEventListener('click', function boire_VIN(){
	document.getElementById('wirkung_Bier').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Bier&promille=35&id=1&menge='+BoireVin),
		onload: function(responseDetails)
     	{
			location.reload();
      	}
  	});
},false);

//JAMBON BEURRE
document.getElementById('wirkung_Hamburger').addEventListener('click', function manger_JB(){
	document.getElementById('wirkung_Hamburger').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Hamburger&promille=-200&id=4&menge='+MangerJB),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });
},false);

// CREPES
document.getElementById('wirkung_Currywurst').addEventListener('click', function manger_CREPE(){
	document.getElementById('wirkung_Currywurst').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Currywurst&promille=-100&id=3&menge='+MangerCrepe),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });
},false);

// BAGUETTE
// Pas rentable....
document.getElementById('wirkung_Brot').addEventListener('click', function manger_BAGUETTE(){
	document.getElementById('wirkung_Brot').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=wirkung_Brot&promille=-35&id=2&menge='+MangerBaguettes),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });
},false);

// NETTOYAGE
document.getElementById('wasch').addEventListener('click', function NETT(){
	document.getElementById('wasch').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/city/washhouse/buy/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=2'),
		onload: function(responseDetails)
		{
			location.reload();
		}
 	 });
},false);

// VIDAGE D ESTOMAC
document.getElementById('vidage_now').addEventListener('click', function VIDAGE(){
	document.getElementById('vidage_now').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/city/medicine/help/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('id=submitForm1'),
		onload: function(responseDetails)
		{
			location.reload();
		}
 	 });
},false);

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Propre / boire / manger  / vidange d\'estomac', // Script Name
 version: '1.6', // Version
 id: '102130', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' (V'+this.xversion+') est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();
// Fin script de mise à jour