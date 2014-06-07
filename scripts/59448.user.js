// JavaScript Document
// ==UserScript==
// @name           Premiumuebersicht fuer pennergame 4.0 by basti1012
// @namespace      basti1012
// @version        1.5a
// @description    Erweiterte Premiumuebersicht.auf der uebersichtsseite siehst du nun das was deer premium accound auch kann
// @include        *www.pennergame.de/overview/*
// ==/UserScript==


var table1 = document.getElementsByClassName('clearcontext')[0];


var table = table1.getElementsByTagName('ul')[0];




var kurs1 = document.getElementById('tabnav');
var kurs11 = kurs1.innerHTML.split('/profil/id:')[1];
var id = kurs11.split('/"')[0];




info(id);


function info(id) {
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/dev/api/user.' + id + '.xml',
      onload: function(responseDetails) {
         var parser = new DOMParser();
         var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
         var gangid = dom.getElementsByTagName('id')[1].textContent;
         
         catchattdef();

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
}
});
}



function auslesen(id) {
   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/dev/api/gang.' + id + '.xml',
      onload: function(responseDetails) {
         var parser = new DOMParser();
         var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
         var name = dom.getElementsByTagName('name')[0].textContent;
         var punkte = dom.getElementsByTagName('points')[0].textContent;
         var position = dom.getElementsByTagName('position')[0].textContent;
         var member = dom.getElementsByTagName('member_count')[0].textContent;

            table.innerHTML+='<ul class="status"><br>'
            table.innerHTML+='<li><span class="k">Bande:</span><span class="v">'+name+'</span></li>'
            table.innerHTML+='<li><span class="k">Mitglieder:</span><span class="v">'+member+'</span></li>'
            table.innerHTML+='<li><span class="k">Position:</span><span class="v"><strong>'+position+'.</strong></span></li>'
            table.innerHTML+='<li><span class="k">Punkte:</span><span class="v">'+punkte+'</span></li>'
}});
}

















function catchattdef() {

GM_xmlhttpRequest(
{method: 'GET',
url: 'http://'+window.location.hostname+'/stock/bottle/',
onload: function(responseDetails) {
var content = responseDetails.responseText;
var text11 = content.split('item_list')[1];
var text22 = text11.split('</span>')[0];
var text1 = text22.split('<span>')[1];
var text2 = text1.split('Pfandflaschen')[0];
table.innerHTML+='<li><span class="k">Flaschen:</span><span class="v">'+text2+'</span></ul></li>';



   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/activities/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
         var ges = content.split('Gesch.: ')[1];
         var ges2 = ges.split('<a class="tooltip"')[0];
         var ges3 = content.split('Bandentraining: ')[1];
         var ges4 = ges3.split('%')[0];


   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/skills/',
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
	 table.innerHTML+='<ul class="status"><br>'
       table.innerHTML+='<li><span class="k">Geschick:</span><span class="v">'+ges1+'('+ges2+')</span></ul></li>'
        table.innerHTML+='<li><span class="k">Bandentrai:</span><span class="v">'+ges4+' %</span></ul></li>';






}});

}});
}});
}
   



   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/fight/overview/',
      onload: function(responseDetails){
         var content = responseDetails.responseText;
         
         // Gewonnen
         var text1 = content.split('Gewonnen:')[1];
         var text2 = text1.split('</tr>')[0];
         var text3 = text2.split('<td>')[1];
         var text4 = text3.split('</td>')[0];
         
         // Verloren         
         var text5 = content.split('Verloren:')[1];
         var text6 = text5.split('</tr>')[0];
         var text7 = text6.split('<td>')[1];
         var text8 = text7.split('</td>')[0];
         
            table.innerHTML+='<ul class="status"><br>'
            table.innerHTML+='<li><span class="k">K&auml;mpfe:</span><span class="v">Penner</span><br></li>'
            table.innerHTML+='<li><span class="k">Gewonnen:</span><span class="v">'+text4+'</span><br></li>'
            table.innerHTML+='<li><span class="k">Verloren:</span><span class="v">'+text8+'</span></ul></li>'




   GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://www.pennergame.de/fight/pet/',
        onload: function(responseDetails){
         var content = responseDetails.responseText;

         // Gewonnen
         var anfang = content.split('Verteidigung:')[1];
         var anfang2 = anfang.split('Einsatz:')[0];



         

         var win1 = anfang.split('<td>')[5];
         var win3 = win1.split('</td>')[0];


         var win4 = anfang.split('<td>')[3];
         var win5 = win4.split('</td>')[0];

            table.innerHTML+='<ul class="status"><br>'
            table.innerHTML+='<li><span class="k">K&auml;mpfe:</span><span class="v">Haustier</span><br></li>'
            table.innerHTML+='<li><span class="k">Gewonnen:</span><span class="v">'+win5+'</span><br></li>'
            table.innerHTML+='<li><span class="k">Verloren:</span><span class="v">'+win3+'</span></ul></li>'         
}});
}});