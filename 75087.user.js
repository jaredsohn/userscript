// ==UserScript==
// @name		[W]Pokazywanie treści wiadomości
// @description		Skrypt pokazuje treść wiadomości w wiadomościach wysłanych i odebranych.
// @date		2009-12-20
// @version		1.0
// @namespace		http://userscripts.org/scripts/show/64604
// @author		mikskape
// @include 		*menelgame.pl/messages/*
// @exclude		*menelgame.pl/messages/write/*
// @exclude		*menelgame.pl/messages/read/*
// @license		http://creativecommons.org/licenses/by/3.0/de/	
// ==/UserScript==

var skrypt_nazwa = 'tresc_wiad';
var skrypt_msg = 'tresc_wiad_msg';
var skrypt_wersja = '1.0';
var skrypt_url = 'http://userscripts.org/scripts/source/64604.user.js'

GM_xmlhttpRequest(
{
	method: 'GET', url: 'http://mikskape.x10hosting.com/skrypty/version.xml', onload: function (source)
	{
		if (source.status == 200) {
		var parser = new DOMParser();
		var dom = parser.parseFromString(source.responseText, 'application/xml');
		
		var wersja = dom.getElementsByTagName(skrypt_nazwa)[0].textContent;
		var msg = dom.getElementsByTagName(skrypt_msg)[0].textContent;
		if (wersja != skrypt_wersja) {
		alert(msg);
		window.location.href=skrypt_url;
		}
	}}
});

var er1 = 'The server encountered an internal...';
var wiad = "http://menelgame.pl";

var tr = document.getElementsByTagName('table')[0].getElementsByTagName('tr');
var newth = document.createElement('td');
newth.setAttribute("style", "vertical-align:middle;");
newth.setAttribute("bgcolor", "#272727");
newth.setAttribute("width", "200");
newth.innerHTML = "<strong>Treść</strong>";
tr[0].insertBefore(newth, tr[0].getElementsByTagName('td')[2]);
var laenge = tr.length;
for (var x = 1; x<=laenge; x++)
{
var td = tr[x].getElementsByTagName('td');
var id1 = td[1].innerHTML.split('&nbsp;<a href="');
var id = id1[1].split('"><strong>');
info_wiadomosc(id[0],x);
}



function info_wiadomosc(id,x) {
GM_xmlhttpRequest({
    method: 'GET',
   url: wiad + id +'?',

       onload: function(responseDetails) {
 
var odczyt = document.createElement('html');
			odczyt.innerHTML = responseDetails.responseText;
			
 var xml = responseDetails.responseText;

 var dom = document.createElement('html');
 dom.innerHTML = responseDetails.responseText;
 
 var t = document.createElement('td');
 t.innerHTML = 'Ładowanie';
 t.setAttribute("width", "200");

 
// alert(t.innerHTML);
//var aa = dom.getElementsByTagName('table')[1].getElementsByTagName('tr')[1].getElementsByTagName('td')[0];
 

	t.innerHTML='Ukryty';
	t.setAttribute("style", "border-bottom: 1px solid #272727;");

var xz = dom.getElementsByTagName('p')[0].innerHTML;

var str = xz

    if(xz.length>35){
    var words=xz.split(" ")
    var s = words[0]
    var length = s.length
    
    for (i = 1; i <= words.length && ((35 - length) - words[i].length > -3);  i++)
    {
        s = s+" "+words[i];
          length = s.length
    
    }
	xz=s+'...'
    
    }
    else{
    
t.innerHTML=xz;
}
if (xz==er1)
{
xz='<color="red"><b>Błąd</b></color>'
}
t.innerHTML=xz;
 

 tr[x].insertBefore(t, tr[x].getElementsByTagName('td')[2]);
}
});
}