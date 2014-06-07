// ==UserScript==
// @name           Bier/Brot/Wasch Buttons V4 von NewMan fuer hamburg und berlin
// @namespace      http://forum.ego-shooters.net
// @description    Fuegt Buttons hinzu, mit dem man den Alkoholpegel mit einem klick auf Null senken/moeglich nahe an 3% ran bringen kann wurde von NewMan um den Waschbutten der Waschanlage erweitert.
// @include        http://*pennergame.de*
// ==/UserScript==

Pos = document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
Alk = document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtbrot = Math.ceil(Alk/35);
host = 'http://'+window.location.hostname;
document.getElementsByTagName("form")[1].getElementsByTagName('div')[0].innerHTML += '<input type="button" id="wasch" value="&euro;25" style="padding:0px;"/><input type="button" value="Bier('+Benoetigtbier+')" id="bier" style="padding:0px;"/><input id="brot" type="button" value="Brot(' + Benoetigtbrot + ')" style="padding:0px;"/>';


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

//Copyright by NewMan im Pennergame unter NewMan01 zu finden