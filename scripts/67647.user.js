// ==UserScript==
// @name Informacje w przeglądzie (Premiumuebersicht fuer pennergame 4.0)
// @description Dodaje więcej przydatnych informacji w przeglądzie.
// @author kingfr3sh & das_bazie & mikskape
// @version 1.9
// @include http://*menelgame.pl/overview/*
// ==/UserScript==
// orginalny skrypt: http://userscripts.org/scripts/show/62968


var s_wersja = '1.9';
var s_info = 'http://userscripts.org/scripts/show/67647';
var s_url = 'http://userscripts.org/scripts/source/67647.user.js';

GM_xmlhttpRequest(
{
	method: 'GET',
	url: s_info,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		var wersja = content.split('##[')[1].split(']##')[0];
		if (wersja != s_wersja) {
		alert('Za chwilę zostanie pobrana nowa wersja skryptu "Informacje w przeglądzie (Premiumuebersicht fuer pennergame 4.0)". \nProszę potwierdzić instalację.')
		window.location.href=s_url;
		}
	}
	});



var link = "http://www.menelgame.pl"

var table1 = document.getElementsByClassName('clearcontext')[0];
var table = table1.getElementsByTagName('ul')[0];
var kurs1 = document.getElementById('tabnav');
var kurs11 = kurs1.innerHTML.split('"/profil/id:')[1];
var id = kurs11.split('/"')[0];



info(id);


function info(id) {
 GM_xmlhttpRequest({
 method: 'GET',
 url: ''+link+'/dev/api/user.' + id + '.xml',
 onload: function(response) {
 var parser = new DOMParser();
 var dom = parser.parseFromString(response.responseText, "application/xml");
 var gangid = dom.getElementsByTagName('id')[1].textContent;
 


 GM_xmlhttpRequest({
 method: 'GET',
 url: ''+link+'/activities/',
 onload: function(response) {
 var contenta = response.responseText;
 var content = contenta.split('<td height="2" colspan="2"><strong>Przegl')[1];
 var ges = content.split('Zręczność: ')[1].split('<a class="tooltip"')[0];
 var ges4 = content.split('Twoja zręczność:: ')[1].split('trening')[0].match(/([0-9]+)/g);
 
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


	var text5 = contenta.split('<strong>Atak</strong>')[1];
	var text6 = text5.split('Obrona')[0];
	var text7 = text6.split('>')[6];
	var att1 = text7.split('<')[0];
	var text8 = contenta.split('<strong>Obrona</strong>')[1];
	var text9 = text8.split('Zręczność')[0];
	var text11 = text9.split('>')[6];
	var def4 = text11.split('<')[0];
	var def3 = def4.replace(/\D/g, "");
	var text12 = contenta.split('<strong>Zręczność</strong>')[1];
	var text13 = text12.split('Mowa')[0];
	var text14 = text13.split('>')[6];
	var ges1 = text14.split('<')[0];
	var attli = table.getElementsByTagName('li')[3].getElementsByTagName('span')[1];
	var defli = table.getElementsByTagName('li')[4].getElementsByTagName('span')[1];


		attli.innerHTML += '('+att1+')';
		defli.innerHTML += '('+def3+')</span>';
		table.innerHTML+='<li><span class="k">Współczucie:</span><span class="v"><span class="mitleid">'+Mitleid+'</span></span></ul></li>'
		table.innerHTML+='<li><span class="k">Zręczność:</span><span class="v">'+ges+'('+ges4+')</span></ul></li><ul class="status"></ul>'

GM_xmlhttpRequest(
{method: 'GET',
url: ''+link+'/stock/bottle/',
onload: function(responseDetails) {
var content = responseDetails.responseText;
var text11 = content.split('item_list')[1];
var text22 = text11.split('</span>')[0];
var text1 = text22.split('<span>')[1];
var text2 = text1.split('Puszki')[0];
table.innerHTML+='<li><span class="k">Puszek:</span><span class="v">'+text2+'</span></ul></li>';


 try
 {
 auslesen(gangid);
 }
 catch(err)
 {
 table.innerHTML+='<li><span class="k">Banda:</span><span class="v">-</span></li>'
 table.innerHTML+='<li><span class="k">Członków:</span><span class="v">-</span></li>'
 table.innerHTML+='<li><span class="k">Pozycja:</span><span class="v">-</span></li>'
 table.innerHTML+='<li><span class="k">Punkty:</span><span class="v">-</span></li>'
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
 table.innerHTML+='<li><span class="k">Banda:</span><span class="v"><a href="'+link+'/profil/bande:'+id+'/">'+name+'</a></span></li>'
 table.innerHTML+='<li><span class="k">Członków:</span><span class="v">'+member+'</span></li>'
 table.innerHTML+='<li><span class="k">Pozycja:</span><span class="v">'+position+'</span></li>'
 table.innerHTML+='<li><span class="k">Punkty:</span><span class="v">'+punkte+'</span></li>'
}});
}
