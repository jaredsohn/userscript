// ==UserScript==
// @name           Mafiosi Quick Reply
// @namespace      Mafiosi Quick Reply
// @include        http://mafiosi.nl/forum*
// @include        http://mafiosi.nl/forum_*
// @include        http://www.mafiosi.nl/forum*
// @include        http://www.mafiosi.nl/forum_*
// ==/UserScript==

var domein = "http://" + document.domain;

if(window.location.pathname == '/forum.php'){
	var aantal = document.getElementsByTagName('a').length;
for(teller = 0; teller < aantal; teller++){
	var getlink = document.getElementsByTagName('a')[teller].textContent;
if(getlink == 'Plaats bericht'){
	var getnumber = document.getElementsByTagName('a')[teller].href;
	var getnumber = getnumber.match(/\d+$/);
	var goeielink = teller;

document.getElementsByTagName('a')[teller].textContent = 'Klik hier voor de uitgebreide editor.';
}
}

var div = document.createElement("div");
	div.id = 'blabla';
	div.innerHTML = "<center><iframe src='" + domein + "/forum_plaatsb.php?topic=" + getnumber + "&&quickedit=yes' width='100%' scrolling='no' height='150' border='0' frameborder='0'></iframe></center>";
var voor = document.getElementsByTagName('a')[goeielink];
	voor.parentNode.insertBefore(div,voor);
}

if(window.location.pathname == '/forum_plaatsb.php'){

	var pagina = window.location.href;
	var zoek = pagina.indexOf('quickedit');
if(zoek>=0){


function changehtml(){

	var forumid = document.getElementsByName('forumid')[0].value;
	var topic = document.getElementsByName('topic')[0].value;
	var quote = document.getElementsByName('quote')[0].value;

GM_xmlhttpRequest({
  method: "POST",
  url: domein + "/forum_plaatsb.php",
  data: "forumid=" + forumid + "&topic=" + topic + "&quote=" + quote + "&titel=...&face=Times New Roman&size=3&color=black&submit=Plaats bericht",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(changepage) {
   document.body.innerHTML = "<center>Bericht geplaatst!</center>";
  }
});
}

	var forumid = document.getElementsByName('forumid')[0].value;
	var topic = document.getElementsByName('topic')[0].value;
	var quote = document.getElementsByName('quote')[0].value;

var newbron = "<center>"
	+"<input type='hidden' value='" + forumid + "' name='forumid'>"
	+"<input type='hidden' value='" + topic + "' name='topic'>"
	+"<textarea name='quote' wrap='virtual' rows='5' cols='50' id='quote'></textarea><br />"
	+"<input type='submit' value='Plaats bericht' name='submit'>"
	+"</center>";

document.body.innerHTML = newbron;

var klik = document.getElementsByName('submit')[0];
	klik.addEventListener('click', changehtml, false);
}
}