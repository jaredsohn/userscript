// ==UserScript==
// @name Pennergame 10 minuten sammel button und abrechen ohne seiten wechseln fuer alle games mit clodogame
// @namespace By Basti1012
// @description Mit diesem Script kann man von jeder seite aus zum 10 minuten sammeln gehen ein klick es kommt der cfapacha klickenm fertig abrechen geht von ueberall ohne das die seiten gewechselt wird alle games 1.8.2009 clodogame huinzugefuegt
// @include *pennergame.de*
// @include *menelgame.pl*
// @include *dossergame.co.uk*
// @include *clodogame.fr*
// ==/UserScript==


var table = document.getElementsByTagName('form')[0];
var li = table.getElementsByTagName('li')[6];
li.innerHTML += '<input type="button" name ="sammeln" value="abrechen">'

function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}     
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = '10 min';
fbutton.addEventListener('click',fclick,false);
li.appendChild(fbutton);
var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName("Submit2")[0];
finputButton.click();
}

{
document.getElementsByName('sammeln')[0].addEventListener('click', function sammelnn () 
{
document.getElementsByName('sammeln')[0].disabled= "disabled";

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/activities/bottle/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('time=10&type=1&cancel=1&Submit2=Abbrechen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();

GM_deleteValue("fsave");

      }
  });

},false);};


// copiright by basti1012