// ==UserScript==
// @name           TheWest Informatii Arme
// @namespace      localhost
// @include        http://*.the-west.*/game.php
// @include        http://*.the-west.*/game.php#
// ==/UserScript==

window.addEventListener('load', function()
{
var xor=new Array("conquistador", "sabre", "axe", "machete", "tomahawk");
var almost=new Array("foil", "whips", "spanner", "Screwdriver"); 
var button=document.createElement('input');
button.type='button';
button.value='Check';
$('right_menu').appendChild(button);
button.addEventListener('click', function()
{
if ($('windows').childNodes.length==0) return;
var lastElement=$('windows').childNodes[$('windows').childNodes.length-1]
if(lastElement.id.indexOf('saloon')>-1 || lastElement.id.indexOf('window_ranking')>-1){
var id=lastElement.id;
var xpath=document.evaluate('//td/a[contains(@href, "char_id")]', $(id), null, 6, null);
for (var i=0;i<xpath.snapshotLength;i++){
var pId= /\d+/.exec(xpath.snapshotItem(i).href);
getProfile(pId, xor, almost, xpath.snapshotItem(i));
}

}

},false);

},false);

function $(id){
return document.getElementById(id);
}

function getProfile(id, searchArrayA, searchArrayB, element){
var max=searchArrayA.length>searchArrayB.length?searchArrayA.length:searchArrayB.length;
var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "http://" + document.location.hostname + "/game.php?window=profile&char_id=" + id,true);
xmlhttp.onreadystatechange=function() {
  if (xmlhttp.readyState==4) {
    var match=xmlhttp.responseText.match(/right_arm\\\\\\\/[\w ]*(?=\.)/);
    match=String(String(match).match(/[\w ]+$/)).toLowerCase();
    for(var i=0;i<max;i++){
		if (i<searchArrayA.length){
			if (match.indexOf(searchArrayA[i].toLowerCase())>-1){
				element.style.color='rgb(232, 16, 0)';
				return;
			}
		}
		if (i<searchArrayB.length){
			if (match.indexOf(searchArrayB[i].toLowerCase())>-1){
				element.style.color='rgb(169, 66, 32)';
				return;
			}
		}
    }
  element.innerHTML += "  (ArmaFoc)";  
  element.style.color='rgb(8, 0, 169)';
  }
 }
xmlhttp.send(null);
}