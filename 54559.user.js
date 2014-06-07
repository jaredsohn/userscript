// JavaScript Document
// ==UserScript==
// @name           Premiumuebersicht Extra V1.5
// @namespace      http://thx.spacequadrat.de/ by Weeds/DerMitDenZahlenTanzt edit by bazie fuer Hamburg und Berlin.
// @version        1.5a
// @description    Erweiterte Premiumuebersicht.
// @include        *pennergame.de/overview/*
// ==/UserScript==

var url = document.location.href;
// richtige linkadresse ermitteln
if (url.indexOf('http://berlin')>=0) {
var link = 'http://berlin.pennergame.de'
}
if (url.indexOf('http://www')>=0) {
var link = 'http://www.pennergame.de'
}
if (url.indexOf('http://pennergame')>=0) {
var link = 'http://pennergame.de'
}


var content = document.getElementsByTagName('html')[0].innerHTML;
if (content.indexOf("<li onmouseout='document.getElementById") >=0) {
var table = document.getElementsByTagName('ul')[9];

} else {
var table = document.getElementsByTagName('ul')[2];
}


var id1 = document.getElementsByTagName('body')[0].innerHTML.split("/profil/id:");
var id = id1[1].split('/" alt');
info(id[0]);


function info(id) {
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/dev/api/user.' + id + '.xml',
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
      url: ''+link+'/dev/api/gang.' + id + '.xml',
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
}
});
}

function catchattdef() {
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/skills/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
         var att1 = content.split('<strong>Angriff</strong>')[1].split('</tr>')[0].split("<td width='108'>")[1].split('<')[0];
         var def1 = content.split('<strong>Verteidigung</strong>')[1].split('</tr>')[0].split("<td width='108'>")[1].split('<')[0];
         
         String.prototype.removeWhiteSpaces = function () {
         return (this.replace(/\s+/g,""));
         };
         
         var def3 = def1.removeWhiteSpaces();
         var att1 = att1.removeWhiteSpaces();
         var attli = table.getElementsByTagName('li')[3].getElementsByTagName('span')[1];
         var defli = table.getElementsByTagName('li')[4].getElementsByTagName('span')[1];
         attli.innerHTML += '('+att1+')';
         defli.innerHTML += '('+def3+')';
}
});
}
   

   // Penner Fights
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/fight/overview/',
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



   // Haustier Fights
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+link+'/fight/pet/',
        onload: function(responseDetails){
         var content = responseDetails.responseText;

         // Gewonnen
         var text1_2 = content.split('Gewonnene')[1];
         var text2_2 = text1_2.split('</tr>')[0];
         var text3_2 = text2_2.split('<td>')[1];
         var text4_2 = text3_2.split('</td>')[0];
         
         // Verloren         
         var text5_2 = content.split('Verlorene')[1];
         var text6_2 = text5_2.split('</tr>')[0];
         var text7_2 = text6_2.split('<td>')[1];
         var text8_2 = text7_2.split('</td>')[0];
         
         // Level         
         var text9_2 = content.split('Level')[1];
         var text10_2 = text9_2.split('</tr>')[0];
         var text11_2 = text10_2.split('<td>')[1];
         var text12_2 = text11_2.split('</td>')[0];

            table.innerHTML+='<ul class="status"><br>'
            table.innerHTML+='<li><span class="k">K&auml;mpfe:</span><span class="v">Haustier</span><br></li>'
            table.innerHTML+='<li><span class="k">Level:</span><span class="v">'+text12_2+'</span><br></li>'
            table.innerHTML+='<li><span class="k">Gewonnen:</span><span class="v">'+text4_2+'</span><br></li>'
            table.innerHTML+='<li><span class="k">Verloren:</span><span class="v">'+text8_2+'</span></ul></li>'         
}
});
}
});