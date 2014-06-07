// JavaScript Document
// ==UserScript==
// @name Premiumuebersicht fuer pennergame 4.0 hh & b & m & hw edit by kingfr3sh & das_bazie ++
// @namespace kingfr3sh & das_bazie ++
// @version 1.7
// @description Erweiterte Premiumuebersicht.auf der uebersichtsseite siehst du nun das was deer premium account auch kann
// @include http://*pennergame.de/overview/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
if (url.indexOf("http://muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}
if (url.indexOf("http://halloween.pennergame")>=0) {var link = "http://halloween.pennergame.de"}



var table1 = document.getElementsByClassName('clearcontext')[0];
var table = table1.getElementsByTagName('ul')[0];
var kurs1 = document.getElementById('tabnav');
var kurs11 = kurs1.innerHTML.split('/profil/id:')[1];
var id = kurs11.split('/"')[0];




info(id);


function info(id) {
 GM_xmlhttpRequest({
 method: 'GET',
 url: ''+link+'/dev/api/user.' + id + '.xml',
 onload: function(responseDetails) {
 var parser = new DOMParser();
 var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
 var gangid = dom.getElementsByTagName('id')[1].textContent;
 
 



 GM_xmlhttpRequest({
 method: 'GET',
 url: ''+link+'/activities/',
 onload: function(responseDetails) {
 var content = responseDetails.responseText;
 var ges = content.split('Gesch.: ')[1];
 var ges2 = ges.split('<a class="tooltip"')[0];
 var ges3 = content.split('Bandentraining: ')[1];
 var ges4 = ges3.split('%')[0];


 
 
 GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/overview/',
	onload: function(responseDetails) {
	var contentm = responseDetails.responseText;
		var Mitleid = contentm.split('<span class="mitleid">+')[1].split('</span>')[0];
		
 
 GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/skills/',
	onload: function(responseDetails) {
	var contenta = responseDetails.responseText;


	var text5 = contenta.split('<strong>Angriff</strong>')[1];
	var text6 = text5.split('Verteidigung')[0];
	var text7 = text6.split('>')[6];
	var att1 = text7.split('<')[0];
	var text8 = contenta.split('<strong>Verteidigung</strong>')[1];
	var text9 = text8.split('Geschicklichkeit')[0];
	var text11 = text9.split('>')[6];
	var def3 = text11.split('<')[0];
	var text12 = contenta.split('<strong>Geschicklichkeit</strong>')[1];
	var text13 = text12.split('Sprechen')[0];
	var text14 = text13.split('>')[6];
	var ges1 = text14.split('<')[0];
	var attli = table.getElementsByTagName('li')[3].getElementsByTagName('span')[1];
	var defli = table.getElementsByTagName('li')[4].getElementsByTagName('span')[1];


		attli.innerHTML += '('+att1+')';
		defli.innerHTML += '('+def3+')</span>';
		table.innerHTML+='<li><span class="k">Mitleid:</span><span class="v"><span class="mitleid">'+Mitleid+'</span></span></ul></li>'
		table.innerHTML+='<li><span class="k">Geschick:</span><span class="v">'+ges1+'('+ges2+'</span></ul></li><br/>'

GM_xmlhttpRequest(
{method: 'GET',
url: ''+link+'/stock/bottle/',
onload: function(responseDetails) {
var content = responseDetails.responseText;
var text11 = content.split('item_list')[1];
var text22 = text11.split('</span>')[0];
var text1 = text22.split('<span>')[1];
var text2 = text1.split('Pfandflaschen')[0];
table.innerHTML+='<li><span class="k">Flaschen:</span><span class="v">'+text2+'</span></ul></li>';


 try
 {
 auslesen(gangid);
 }
 catch(err)
 {
 table.innerHTML+='<li><span class="k">Bande:</span><span class="v">-</span></li>'
 table.innerHTML+='<li><span class="k">Mitglieder:</span><span class="v">-</span></li>'
 table.innerHTML+='<li><span class="k">Position:</span><span class="v">-</span></li>'
 table.innerHTML+='<li><span class="k">Punkte:</span><span class="v">-</span></li>'
 }
}});
}});
}});
}});


}
});
}


function auslesen(id) {
 GM_xmlhttpRequest({
 method: 'GET',
 url: ''+link+'/dev/api/gang.' + id + '.xml',
 onload: function(responseDetails) {
 var parser = new DOMParser();
 var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
 var name = dom.getElementsByTagName('name')[0].textContent;
 var punkte = dom.getElementsByTagName('points')[0].textContent;
 var position = dom.getElementsByTagName('position')[0].textContent;
 var member = dom.getElementsByTagName('member_count')[0].textContent;

 table.innerHTML+='<ul class="status">'
 table.innerHTML+='<li><span class="k">Bande:</span><span class="v">'+name+'</span></li>'
 table.innerHTML+='<li><span class="k">Mitglieder:</span><span class="v">'+member+'</span></li>'
 table.innerHTML+='<li><span class="k">Position:</span><span class="v"><strong>'+position+'.</strong></span></li>'
 table.innerHTML+='<li><span class="k">Punkte:</span><span class="v">'+punkte+'</span></li>'
}});
}