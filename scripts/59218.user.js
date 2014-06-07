// ==UserScript==
// @name           extra Buttons und sauberkeit by basti1012 fuer pennergame 4.0
// @namespace      www.pennerhack.foren-city.de
// @description    Fuegt Buttons hinzu, mit dem man den Alkoholpegel mit einem klick auf Null senken/moeglich nahe an 3% ran bringen kann .Aktuelle sauberkeit immer in blick essen und trinken von jeder seite aus moeglich
// @include        http://*pennergame.de*
// @exclude        http://highscore.pennergame.de/highscore/*
// ==/UserScript==




GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Sauberkeit:')[1];
			var Sauber = text1.split('%')[0];

			if (Sauber<30) {
				var farbe = "red"
			} else {
				var farbe = "green"
			}
			









Posa = document.getElementById("options");
Pos = Posa.getElementsByTagName("li")[1].innerHTML.indexOf(".");
Alk = Posa.getElementsByTagName("li")[1].innerHTML.substr(Pos - 1, 4).replace(".", "");





Benoetigtprozent = 350 - Alk;
Benoetigtprozent2 = 299 - Alk;
Benoetigtwodka = Math.floor(Benoetigtprozent/250);
Benoetigtwurst = Math.ceil(Alk/100);
Benoetigtbier = Math.floor(Benoetigtprozent2/35);
Benoetigtbrot = Math.ceil(Alk/35);
host = 'http://'+window.location.hostname;
document.getElementById("logo").innerHTML += '<input type="button" id="wasch" value="&euro;25"/><input type="button" value="Bier('+Benoetigtbier+')" id="bier" /><input id="brot" type="button" value="Brot(' + Benoetigtbrot + ')"/><input type="button" value="Wodka('+Benoetigtwodka+')" id="wodka" /><input id="wurst" type="button" value="Wurst(' + Benoetigtwurst + ')"/><font style=\"color:'+farbe+'; font-size:120%;\"><b> du bist '+Sauber+' % Sauber</b></font>';





document.getElementById('bier').addEventListener('click', function bier_trinken(){
	document.getElementById('bier').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Bier&promille=35&id=1&menge='+Benoetigtbier),
		onload: function(responseDetails)
     	{
			location.reload();
      	}
  	});					
},false); 
document.getElementById('brot').addEventListener('click', function brot_essen(){
	document.getElementById('brot').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Brot&promille=-35&id=2&menge='+Benoetigtbrot),
		onload: function(responseDetails)
     	{
			location.reload();
     	 }
 	 });					
},false);
document.getElementById('wasch').addEventListener('click', function waschen(){
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
document.getElementById('wodka').addEventListener('click', function wodka_trinken(){
	document.getElementById('wodka').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Wodka&promille=250&id=7&menge='+Benoetigtwodka),
		onload: function(responseDetails)
		{
			location.reload();
		}
	});					
},false); 
document.getElementById('wurst').addEventListener('click', function brot_essen(){
	document.getElementById('wurst').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Currywurst&promille=-100&id=3&menge='+Benoetigtwurst),
		onload: function(responseDetails)
		{
			location.reload();
		}
	});					
},false);
}});



/*

GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://www.pennergame.de/stock/bottle/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('name="chkval" value="')[1];
			var text2 = text1.split('"')[0];

*/



