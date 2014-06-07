// ==UserScript==
// @name           MD link v2.0
// @namespace      http://userscripts.org/users/110369
// @description    Adds a link to MD after the link to Full Inventory.
// @include        *twilightheroes.com/header.php*
// ==/UserScript==
 
function foo(){
	var a,a2,b,s2;
	var t=document.getElementsByTagName('br');
	var spacer = document.createTextNode(' - ');
	var addLinks = document.createElement('a');
	addLinks.setAttribute("id","MDBtn");
	addLinks.style.color = "#00ABBA";
	addLinks.target = "main";
	addLinks.innerHTML = "MD";
	a=t[1];
	a.parentNode.insertBefore(spacer, a);
	a.parentNode.insertBefore(addLinks, a);
	b=document.getElementsByTagName('td')[2].lastChild;
	s2 = document.createTextNode(' - ');
	a2 = document.createElement('a');
	a2.innerHTML = '<a href="computer-lab.php" id="comp" target="main">CL</a>'
	b.parentNode.insertBefore(s2, b);
	b.parentNode.insertBefore(a2, b);
	GM_xmlhttpRequest({
  method: "GET",
  url: 	"http://www.twilightheroes.com/character.php",
  headers: {
	"User-Agent": navigator.userAgent },
  onload: function(response) {
	if (!response.responseXML)
       		response.responseXML = new
           DOMParser().parseFromString(response.responseText, "text/xml");
	var rsp = response.responseText;
	var pat = /showchar\.php\?(charid.\d+)/;   
	var cid = pat(rsp);
	var nl = "memento-show.php?" +cid[1];
	document.getElementById("MDBtn").href = nl;}});}

window.addEventListener('load',foo,true);
