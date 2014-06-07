// ==UserScript==
// @name           Boire / manger/ propre
// @description  menu fast pour Boire / manger / propre
// @include        *clodogame*
// @exclude        *highscore*
// @exclude        *login/*
// @exclude        *logout*
// @exclude *change_please*
// ==/UserScript==

/* Update proc */
var SCRIPT={SCRIPTED:"Boire / manger/ propre",VERSION:"1.3",SCRIPT_URL:"http://userscripts.org/scripts/source/74274.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */

LienBabiole = 'http://static.pennergame.de/img/pv4/plunder/';
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
document.getElementsByTagName("form")[1].getElementsByTagName('div')[0].innerHTML +=
// Station de lavage
'<input type="button" id="wasch" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;25&euro;"style="background-image:url('+LienBabiole+'seife.png);background-repeat: no-repeat; background-position : 1px; padding:0px;" style="padding:0px;"/>' +
// Brique de vin.  Effet: 0.35‰
'<input type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;('+BoireVin+')" id="wirkung_Bier" style="background-image:url('+LienNouriture+'Bier.png); background-repeat: no-repeat; padding:0px;"/>' +
// Jambon-beurre.  Effet: -2.00‰
'<input id="wirkung_Hamburger" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerJB+')" style="background-image:url('+LienNouriture+'Hamburger.png); background-repeat: no-repeat; padding:0px;"/>' +
// Crêpes.  Effet: -1.00‰
'<input id="wirkung_Currywurst" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerCrepe+')" style="background-image:url('+LienNouriture+'Currywurst.png);background-repeat: no-repeat; background-position : 1px; padding:0px;" style="padding:0px;"/>' +
// Baguettes.  Effet: -0.35‰
'<input id="wirkung_Brot" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;('+MangerBaguettes+')" style="background-image:url('+LienNouriture+'Brot.png); background-repeat: no-repeat; padding:0px;"/>' +
// Vidange d'estomac
'<input id="vidage_now" type="button" value="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" style="background-image:url('+LienIcone+'mitleid.png); background-repeat: no-repeat; padding:0px;"/>';


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