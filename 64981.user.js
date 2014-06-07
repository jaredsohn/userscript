// ==UserScript==
// @name Pennergame LoseBot fuer hamburg und berlin 4.0
// @namespace http://pennerhack.foren-city.de
// @description    Kauft die angegebene Anzahl Lose automatisch.(alle lose in ca 20 sekunden)
// @include        http://*pennergame*/city/games/
// ==/UserScript==

function Losekaufen(menge)
{
  if (Number(menge) < 11)
  {
    document.getElementById('NochLose').innerHTML = 'Es werden noch '+String(menge)+' Lose gekauft!';
    GM_xmlhttpRequest(
    {
      method: 'POST',
      url: 'http://'+window.location.hostname+'/city/games/buy/',
      headers: 
      {'Content-type': 'application/x-www-form-urlencoded'},
      data: encodeURI('menge='+String(menge)+'&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC'+String(menge)+'.00+kaufen'),
      onload: function()
      { 
	    document.getElementById('NochLose').innerHTML = 'Es werden noch 0 Lose gekauft!';
   	    document.getElementsByName('submitForm')[0].disabled = false;
        document.getElementById('content').innerHTML 
	    ='<div class="goodmsg">Der Losekauf ist beendet!</div>'+
	    document.getElementById('content').innerHTML;
	    ende();
      }
    });	
  }
  else{
	document.getElementById('NochLose').innerHTML = 'Es werden noch '+String(menge)+' Lose gekauft!';
	var menge = Number(menge) - 10;
    GM_xmlhttpRequest(
    {
      method: 'POST',
      url: 'http://'+window.location.hostname+'/city/games/buy/',
      headers: 
      {'Content-type': 'application/x-www-form-urlencoded'},
      data: encodeURI('menge=10&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC10.00+kaufen'),
      onload: function()
      { Losekaufen(menge);}
    });};};
function ende(){
document.getElementById('NochLose').innerHTML = 'Seiten reload in 5 Sekunden!';
setInterval("window.location.reload();", 5000);};
var mybody = document.getElementsByTagName('body')[0].innerHTML;
var text1 = mybody.split('Du kannst heute noch ')[1];
var NochLose = text1.split(' Lose kaufen')[0];
if (NochLose == 0 ){
document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td')[4].innerHTML = 
'Menge: <input type="text" name="menge" id="menge1" size="3" value="0" onKeyUp="generatePreis(1,10);"/>'+
'<input type="button" value="max." id="max" name="max"/><br>'+
'<input type="hidden" name="id" value="1" />'+
'<input type="hidden" name="preis" id="preis1" value="1.00"/>'+
'<input type="hidden" name="preis_cent" id="preis_cent1" value="100"/>'+
'<div id="startbutton">'+
'<input id="submitForm1" class="formbutton" type="button" name="submitForm" value="F&uuml;r &euro;1.00 kaufen." disabled="disabled">'+
'</div>';
}else{
document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td')[3].innerHTML =
'<div id="NochLose" name="NochLose"></div>';
document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td')[4].innerHTML = 
'Menge: <input type="text" name="menge" id="menge1" size="3" value="1" onKeyUp="generatePreis(1,10);"/>'+
'<input type="button" value="max." id="max" name="max"/><br>'+
'<input type="hidden" name="id" value="1" />'+
'<input type="hidden" name="preis" id="preis1" value="1.00"/>'+
'<input type="hidden" name="preis_cent" id="preis_cent1" value="100"/>'+
'<div id="startbutton">'+
'<input id="submitForm1" class="formbutton" type="button" name="submitForm" value="F&uuml;r &euro;1.00 kaufen.">'+
'</div>';
};
document.getElementsByName('menge')[0].addEventListener('keyup', function onkeyup() {
  var testmenge = document.getElementsByName('menge')[0].value;
  var mybody = document.getElementsByTagName('body')[0].innerHTML;
  var text1 = mybody.split('Du kannst heute noch ')[1];
  var NochLose = text1.split(' Lose kaufen')[0];
  if (Number(testmenge) > Number(NochLose))
  {document.getElementById('menge1').value = String(NochLose);	};
},true);
document.getElementsByName('max')[0].addEventListener('click', function start() {																
  var mybody = document.getElementsByTagName('body')[0].innerHTML;
  var text1 = mybody.split('Du kannst heute noch ')[1];
  var NochLose = text1.split(' Lose kaufen')[0];
  document.getElementById('menge1').value = NochLose;
  document.getElementById('startbutton').innerHTML =
  '<input id="submitForm1" class="formbutton" type="button" name="submitForm" value="F&uuml;r &euro;'+String(NochLose)+'.00 kaufen.">';
    document.getElementsByName('submitForm')[0].addEventListener('click', function start() {
  var menge = document.getElementById('menge1').value;
  document.getElementsByName('submitForm')[0].disabled = true;
  Losekaufen(menge);
  },false);
},false);
document.getElementById('submitForm1').addEventListener('click', function start() {																
  var menge = document.getElementById('menge1').value;
  document.getElementsByName('submitForm')[0].disabled = true;
  Losekaufen(menge);
},false);


