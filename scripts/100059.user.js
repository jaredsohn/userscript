// ==UserScript==
// @name           Drink/Eat/Wash - Trinken/Essen/Waschen Buttons von NewMan gefixt by Bengy
// @description    Fuegt Buttons hinzu (rechts neben Logout), mit dem man den Alkoholpegel mit einem klick auf Null senken/moeglich nahe an 3% ran bringen kann!
// @include        http://*pennergame.de*
// @version        1.4 Updatefunktionsproblem behoben und optimiert von niceguy0815 
// ==/UserScript==

var ScriptID = '100059';
var THISSCRIPTINSTALL_URLQ = 'http://userscripts.org/scripts/show/'+ScriptID+'';
var THISSCRIPTSOURCE_URLQ = 'http://userscripts.org/scripts/source/'+ScriptID+'.user.js';
var version = '1.4';
update()


//==========================================================//
//
// @version        1.0 Grundversion von NewMan
// @version        1.2 Updatefunktion geprüft
// @version        1.3 Mausfinger hinzugefügt
//
//==========================================================//


Pos = document.getElementsByClassName("icon beer")[0].innerHTML.indexOf(".");
Alk = document.getElementsByClassName("icon beer")[0].innerHTML.substr(Pos - 1, 4).replace(".", "");
Benoetigtprozent = 299 - Alk;
Benoetigtbier = Math.floor(Benoetigtprozent/35);
Benoetigtbrot = Math.ceil(Alk/35);
host = 'http://'+window.location.hostname;

var cart_link = 'http://'+document.URL.split('/')[2];
var div_top = GM_getValue(cart_link+'div_top', '200px');
var div_left = GM_getValue(cart_link+'div_left', '850px');
document.getElementById('topmenu').innerHTML += '<div id=\"cart_div\" style=\"position:absolute; top:'+div_top+'; left:'+div_left+'; '
	+ '<input text="blubb"><input type="button" value="V"><input type="button" value="Drink('+Benoetigtbier+')" id="bier" style="cursor:pointer"/><input id="brot" type="button" value="Eat(' + Benoetigtbrot + ')" style="cursor:pointer"/><input type="button" id="wasch" value="Wash" style="cursor:pointer"/></div>';

document.getElementById('bier').addEventListener('click', function bier_trinken(){
	document.getElementById('bier').disabled = "disabled";
	GM_xmlhttpRequest({
		method: 'POST',
		url: host+'/stock/foodstuffs/use/',
		headers: {'Content-type': 'application/x-www-form-urlencoded'},
		data: encodeURI('item=Bier&promille=35&id=1&menge='+Benoetigtbier),
		onload: function(responseDetails)
     	{
			alert("Promillepegel überprüfen! Falls sich nichts geändert hat, musst du Getränke nachkaufen!");
		location.href = host+'/skills/';
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
				alert("Promillepegel überprüfen! Falls sich nichts geändert hat, musst du Essen kaufen!")
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
				alert("Du bist nun Sauber!");
			location.href = host+'/overview/';
		}
 	 });					
},false); 

document.getElementById('cart_div').addEventListener('dblclick', function(mouseEvent){		//alles verschieben mit dblclick
	var objDrag = document.getElementById('cart_div');
	var oldX = mouseEvent.pageX;
	var oldY = mouseEvent.pageY;
	var objX = objDrag.offsetLeft;
	var objY = objDrag.offsetTop;
	var newX = 0;
	var newY = 0;
	var move = function (mouseEvent){
		newX = mouseEvent.pageX;
		newY = mouseEvent.pageY;
		objDrag.style.left = (objX + newX - oldX) + 'px';
		objDrag.style.top = (objY + newY - oldY) + 'px';
	}
	document.body.addEventListener('mousemove', move, true);
	objDrag.addEventListener('click', function (){		//aktuelle position speichern
		document.body.removeEventListener('mousemove', move, true);
		objDrag.style.cursor = 'auto';
		if (newX != 0 || newY != 0){
			GM_setValue(cart_link+'div_left',(objX + newX - oldX)+'px');
			GM_setValue(cart_link+'div_top',(objY + newY - oldY)+'px');
		}
	},false);
	objDrag.style.cursor = 'move';
}, false);


//updatefunktion 
function update(){		
	var now = (new Date().getTime()/86400000).toString().split('\.')[0];
	var last_update = GM_getValue('last_update','0');
	if (now-last_update >= 1){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+ScriptID+'.meta.js',
			onload: function(content) {
				var scriptname = (/@name\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversionhistory = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1];
				var newversion = (/@version\s*(.*?)\s*$/m.exec(content.responseText))[1].substr(0, 3);
				if (newversion != version){
					if (confirm('Es gibt eine neue Version des Skriptes '+scriptname+':\n\nVersion: \n'+newversionhistory+'\n\nDie neue Version kann Fehlerbehebungen und/oder neue Funktionen beinhalten.\nHier gibt es weitere Infos &uuml;ber die neue Version:\n\n '+THISSCRIPTINSTALL_URLQ+'\n\nEine Aktualisierung ist empfehlenswert und kann direkt anschliessend durchgeführt werden.\n\nHinweis: Die Überprüfung auf neue Versionen wird nur einmal pro Tag durchgeführt.')){
						window.location.href = ''+THISSCRIPTSOURCE_URLQ+'';
					}
				}
			}
		}, false);
		GM_setValue('last_update', now);
	}
}