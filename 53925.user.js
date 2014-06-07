// ==UserScript==
// @name           Spenden
// @namespace      Mr_XYZ2
// @include        http://*berlin.pennergame.de/change_please*/
// ==/UserScript==
Pos = document.getElementsByTagName("li")[2].innerHTML.indexOf(".");
document.getElementsByTagName("li")[6].innerHTML += /*'<input type="button" id="melden" value="voll, nächster!"/>*/'<input type="button" id="overview" value="Übersicht"/><input type="button" id="next" value="nächster!"/>';
//document.getElementsById('melden').addEventListener('click', function weiterleiten(){
//	 document.location.href ="http://manchu.l4rge.com/action2.php?name="+document.URL+"&mode="+document.URL;				
//},false); 
document.getElementById('next').addEventListener('click', function nochweiterleiten(){
	 document.location.href ="http://manchu.l4rge.com/action2.php?mode="+document.URL;				
},false); 
document.getElementById('overview').addEventListener('click', function vielweiterleiten(){
	 document.location.href ="http://manchu.l4rge.com/";				
},false); 
var eC = document.getElementById('content');
if(eC.innerHTML.indexOf("genug Spenden erhalten.") > -1 || eC.innerHTML.indexOf("zum Rand") > -1)
  {document.location.href ="http://manchu.l4rge.com/action2.php?name="+document.URL+"&mode="+document.URL;}
if(eC.innerHTML.indexOf("Becher geworfen!") > -1 || eC.innerHTML.indexOf("zum Ransfsfssgsg") > -1)
  {document.location.href ="http://manchu.l4rge.com/action2.php?mode="+document.URL;}
  