// ==UserScript==
// @name	Bastis Geilstes Dropdown Menue das es jemals gab Endversion 3 
// @namespace	basti1012
// @description	Drop-Down Menues 3.3 Fuegt zu der normalen leiste von pennergame noch ein paar links dazu .Dann gibt es per maous over noch mehr links .Mann kann die leisten Farben und man kann die dropdown leiste die farben ?ndern und die groesse auch .das geht alles ueber die leiste und nicht mehr durch den script.Losebot autiaktualiesieren und bandenkassen einzahlungen durch das menue
// @include	http://pennergame.de/*
// @include	http://*.pennergame.de/*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var id3 = document.body.innerHTML.split('http://imgberlin.pennergame.de/cache/bl_DE/avatare/')[1];
var id4 = id3.split('_')[0];
var pgurl = 'http://berlin.pennergame.de';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var id3 = document.body.innerHTML.split('http://img.pennergame.de/cache/de_DE/avatare/')[1];
var id4 = id3.split('_')[0];
var pgurl = 'http://www.pennergame.de';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var id3 = document.body.innerHTML.split('http://img.menelgame.pl/cache/pl_PL/avatare/')[1];
var id4 = id3.split('_')[0];
var pgurl = 'http://menelgame.pl';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var id3 = document.body.innerHTML.split('http://img.dossergame.co.uk/cache/en_EN/avatare/')[1];
var id4 = id3.split('_')[0];
var pgurl = 'http://dossergame.co.uk';
};
//############################ Speicherumng der farben   ######################################
var bigzahl = GM_getValue("groses");
var farbebig = GM_getValue("bunte");
var leiste = GM_getValue("leiste");


var bunte = GM_getValue("bunte");
if (bunte == null){
bunte = 'green';
GM_setValue("bunte" , bunte);
};
var groses = GM_getValue("groses");
if (groses == null){
groses = '100';
GM_setValue("groses" , groses);
};
var leiste = GM_getValue("leiste");
if (leiste == null){
leiste = 'yellow';
GM_setValue("leiste" , leiste);
};
var zztime = GM_getValue("zztime");
if (zztime == null){
zztime = '30000';
GM_setValue("zztime" , zztime);
};
var kommi = GM_getValue("kommi");
if (kommi == null){
kommi = 'Eingezahl durch Bastis Dropdownleistenmenue';
GM_setValue("kommi" , kommi);
};



var test = '<span id="Uhrzeit"</span>';

// ########################### eigene id erm,itteln ###########################################

GM_xmlhttpRequest({
  method: 'GET',
   url: ''+pgurl+'/overview/',
     onload: function( response ) {
      var content = response.responseText;
   var id2 = content.match(/\/profil\/id\:([0-9]+)/)[1];
 GM_setValue("id2" , id2);

}});


var navi_div = document.getElementById('navigation');
 var navi_ul = navi_div.getElementsByTagName('ul');
  var navi_li = navi_ul[0].getElementsByTagName('li');
   if (navi_li.length == 9){
    y = 8;}else {y = 7;}
     for(x=0; x <=y; x++){
    try{
   navi_li[x].getElementsByTagName('a')[0].style.width = "65.6px";
  navi_li[x].style.width = "65.6px";
 } catch (err){break;}
}


navi_li[0].getElementsByTagName("a")[0].style.color = ""+leiste+"";
 navi_li[2].getElementsByTagName('a')[0].innerHTML = 'Skills';
  navi_li[2].getElementsByTagName('a')[0].setAttribute("title" , "Weiterbildung");
   navi_li[1].getElementsByTagName("a")[0].style.color = ""+leiste+"";
    navi_li[2].getElementsByTagName("a")[0].style.color = ""+leiste+"";
     navi_li[3].getElementsByTagName("a")[0].style.color = ""+leiste+"";
      navi_li[4].getElementsByTagName("a")[0].style.color = ""+leiste+"";
       navi_li[5].getElementsByTagName("a")[0].style.color = ""+leiste+"";
        navi_li[6].getElementsByTagName('a')[0].innerHTML = 'Fights';
         navi_li[6].getElementsByTagName("a")[0].style.color = ""+leiste+"";
          navi_li[6].getElementsByTagName('a')[0].setAttribute("title" , "K&auml;mpfe");
         navi_li[7].getElementsByTagName('a')[0].innerHTML = 'Bande';
        navi_li[7].getElementsByTagName("a")[0].style.color = ""+leiste+"";
       navi_li[7].getElementsByTagName('a')[0].setAttribute("href" , "/gang/");
      navi_li[7].getElementsByTagName('a')[0].setAttribute("title" , "Waffenladen");
     navi_li[7].getElementsByTagName('a')[0].setAttribute("target" , "_parent");
    if (y == 8){
   navi_li[8].getElementsByTagName('a')[0].innerHTML = 'Games';
  navi_li[8].getElementsByTagName("a")[0].style.color = ""+leiste+"";
 navi_li[8].getElementsByTagName('a')[0].setAttribute("href" , "/city/games/");
navi_li[8].getElementsByTagName('a')[0].setAttribute("title" , "Gl\u00fccksspiele");
}
else {
 var newli__8 = document.createElement('li');
  newli__8.style.width = "65.6px";
 newli__8.innerHTML = '<a href="/city/games/" title="Gl\u00fccksspiele" style="width: 65.6px;">Games & Losebot</a>';
navi_ul[0].insertBefore(newli__8, navi_ul[0].getElementsByTagName('li')[8]);
}
var newli = document.createElement('li');
 newli.style.width = "65.6px";
  newli.innerHTML = '<a href="/city/weapon_store/" title="Waffenladen" style="width: 65.6px;">Auto-relod</a>';
 navi_ul[0].insertBefore(newli, navi_ul[0].getElementsByTagName('li')[9]);
navi_li[9].getElementsByTagName("a")[0].style.color = ""+leiste+"";

var newli_2 = document.createElement('li');
 newli_2.style.width = "65.6px";
  newli_2.innerHTML = '<a href="/" title="Nachricht" style="width: 65.6px;">Links</a>';
 navi_ul[0].insertBefore(newli_2, navi_ul[0].getElementsByTagName('li')[10]);
navi_li[10].getElementsByTagName("a")[0].style.color = ""+leiste+"";

var newli_3 = document.createElement('li');
 newli_3.style.width = "65.6px";
  newli_3.innerHTML = '<a href="/" title="Plunder" style="width: 65.6px;">Optionen</a>';
 navi_ul[0].insertBefore(newli_3, navi_ul[0].getElementsByTagName('li')[11]);
navi_li[11].getElementsByTagName("a")[0].style.color = ""+leiste+"";
//<a style="width: 100px;" href="' + pgurl + '/skills/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;">


function setupMenue (uid, gid) {
var menueNews = '<ul>' +
'<li><span style=\"color:'+farbebig+'; font-size:800%;\"><b>'+test+'</b></span></li>' +
'</ul>';

var menueUebersicht = '<ul>' +
'<li><a href="' + pgurl + '/financial/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bilanzen</b></div></a></li>' +
'<li><div class="pdsubmenu">' +
'<a href="' + pgurl + '/messages/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;\"><b>Nachrichten</b></div></a>' +
'<span style="top: 28px;"><ul>' +
'<li><a href="' + pgurl + '/messages/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;\"><b>Eingang</b></div></a></li>' +
'<li><a href="' + pgurl + '/messages/out/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;\"><b>Ausgang</b></div></a></li>' +
'<li><a href="' + pgurl + '/messages/write/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;\"><b>Verfassen</b></div></a></li>' +
'</ul></span></div></li>' +
'<li><a href="' + pgurl + '/friendlist/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Freunde und Blockierte</b></div></a></li>' +
'<li><a href="' + pgurl + '/awards/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Auszeichnungen</b></div></a></li>' +
'<li><a href="' + pgurl + '/profil/id:' +GM_getValue("id2")+ '/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Dein Profil</b></div></a></li>' +
'<li><a href="' + pgurl + '/change_please/statistics/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Spenden Statistik</b></div></a></li>' +
'<li><a href="' + pgurl + '/premium/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Ehrenmitgliedschaft</b></div></a></li>' +
'<li><a href="' + pgurl + '/faq/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>FAQ</b></div></a></li>' +
'<li><a href="' + pgurl + '/manual/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Anleitung</b></div></a></li>' +
'<li><a href="' + pgurl + '/help/3_1/"><b><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>3.1 Einf&uuml;hrung</b></div></b></a></li>' +
'<li><a href="' + pgurl + '/settings/"><b><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Einstellungen/Profil bearbeiten</b></div></b></a></li>' +

'</ul>';



var menueWeiterbildung = '<ul>' +
'<a><input type ="button" id="def" ></a>' +
'<a><input type ="button" id="att" ></a>' +
'<a><input type ="button" id="ges" ></a>' +
'<a><input type ="button" id="tieratt" ></a>' +
'<a><input type ="button" id="tierdef" ></a>' +
'<a><input type ="button" id="tierges" ></a>' +
'</ul>';



var menueaktion = '<ul>' +
'<a><b><input type ="button" id="sammeln" ></li></a>' +
'<li><a><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;">Komentar f&uuml;r Bandenkasse:</div></a></li><br>'+
'<a><input name="kommi" type="text" id="kommi" value ="'+GM_getValue("kommi")+'"size="18">'+
'<li><a><input type="button" name="speichern4" id="speichern4" value="Komentar  Speichern"></li><br>'+
'<li><a><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;">Wie viel woolt ihr Einzahlen:</div></a></li>'+
'<li><a><input name="ExtraMenueKasseMoney" type="text" id="ExtraMenueKasseMoney" size="9"></li><br>'+
'<li><a><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;">Klicken um einzahlung zu betetigen:</div></a></li><br>'+
'<li><a><input type="button" name="ExtraMenueKasseeinzahlen" value="&nbsp;&nbsp;Kasse&nbsp;&nbsp;"></li><br>'+
'<li><a><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>'+GM_getValue("kommi")+'</b></div></a></li><br>' +
'<li><a href="' + pgurl + '/activities/crime/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Verrechen Begehen</b></div></a></li>' +
'<li><a href="' + pgurl + '/activities/crime/logs/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Beendete Verbrechen</b></div></a></li>' +
'</ul>';




var menueStadt = '<ul>' +
'<li><a href="' + pgurl + '/city/map/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Stadtkarte</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/district/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Stadtteile</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/home/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Eigenheim</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/scrounge/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Schnorrplatz</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/games/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Gl&uuml;cksspiele</b></div></a></li> ' +
'<li><div class="pdsubmenu">' +
'<a href="' + pgurl + '/city/weapon_store/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Waffenladen...</b></div></a>' +
'<span style="top: 112px;"><ul>' +
'<li><a href="' + pgurl + '/city/weapon_store/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Angriff</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/weapon_store/def/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Verteidigung</b></div></a></li>' +
'</ul></span></div></li>' +
'<li><a href="' + pgurl + '/city/pet_store/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Tierhandlung</b></div></a></li>' +
'<li><div class="pdsubmenu">' +
'<a href="' + pgurl + '/city/supermarket/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Supermarkt...</b></div></a>' +
'<span style="top: 154px;"><ul>' +
'<li><a href="' + pgurl + '/city/supermarket/drinks/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Getr&auml;nke</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/supermarket/food/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Nahrung</b></div></a></li>' +
'</ul></span></div></li>' +
'<li><a href="' + pgurl + '/city/music_store/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Musikladen</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/stuff/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Zubehoer</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/medicine/"<div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Medizin</b></div></a></li>' +
'<li><a href="' + pgurl + '/city/washhouse/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Waschhaus</b></div></a></li>' +
'</ul>';






var menueInventar = '<ul>' +
'<li><div class="pdsubmenu">' +
'<a href="' + pgurl + '/stock/foodstuffs/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Lebensmittel...</b></div></a>' +
'<span style="top: 7px;"><ul>' +
'<li><a href="' + pgurl + '/stock/foodstuffs/food/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Essen</b></div></a></li>' +
'<li><a href="' + pgurl + '/stock/foodstuffs/drinks/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Trinken</b></div></a></li>' +
'</ul></span></div></li>' +
'<li><div class="pdsubmenu">' +
'<a href="' + pgurl + '/stock/plunder/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Plunder</b></div></a>' +
'<span style="top: 28px;"><ul>' +
'<li><a href="' + pgurl + '/stock/plunder/craft/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Basteln</b></div></a></li>' +
'</ul></span></div></li>' +
'<li><div class="pdsubmenu">' +
'<a href="' + pgurl + '/stock/bottle/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pfandflaschen...</b></div></a>' +
'<span style="top: 49px;"><ul>' +
'<li><a href="' + pgurl + '/stock/bottlechart/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Flaschenkurs</b></div></a></li>' +
'</ul></span></div></li>' +
'<li><a href="' + pgurl + '/stock/instruments/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Instrumente</b></div></a></li>' +
'<li><a href="' + pgurl + '/stock/armoury/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Waffenkammer</b></div></a></li>' +
'</ul>';


var menueFight = '<ul>' +
'<li><a href="' + pgurl + '/fight/overview/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Kampf</b></div></a></li>' +
'<li><a href="' + pgurl + '/fight/pet/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Haustierkaempfe</b></div></a>' +
'<li><a href="' + pgurl + '/help/Kampficons/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Help to Kampficons</b></div></a>' +
'</ul>';


var menuegang = '<ul>' +
'<li><a href="' + pgurl + '/gang/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Deine Bande</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bande</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/credit/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bandenkasse</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/upgrades/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bandeneigentum</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/memberlist/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Mitglieder</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/forum/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bandenforum</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/pact/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>B&uuml;ndnisse</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/fight/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bandenkampf</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/fight/fightlog/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Kampflog</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/admin/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Adminbereich</b></div></a></li>' +
'<li><a href="' + pgurl + '/gang/admin/log/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Adminlog</b></div></a></li>' +
'</ul>';

var NochLose = '<span id="NochLose"</span>';

var menuegames = '<ul>' +
'<input type="text" name="menge" id="menge1" size="3" value="1" onKeyUp="generatePreis(1,10);"/>'+
'<input type="hidden" name="id" value="1" />'+
'<input type="hidden" name="preis" id="preis1" value="1.00"/>'+
'<input type="hidden" name="preis_cent" id="preis_cent1" value="100"/>'+
'<input id="submitForm1" class="formbutton" type="button" name="submitForm" value="F&uuml;r &euro;1.00 kaufen."><br>'+
'<li><b>'+NochLose+'</b></li>' +
'<li><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Einfach die Anzahl an Lose eingeben die ihr kaufen wollt ,es wird dann unter den Button angezeigt wie viele Lose er noch kaufen muss .Einfach testen ,500 Lose werden in ca 30 Sekunden gekauft.Zur Zeit geht es nur wenn ihr auf der Games Seite seid Wird in deer n&auml;sten Version gefixt.</b></div></span></li>';



var autoaktualiesierenbybasti = '<ul>'
+'<a><select id="auswahl" size="1"'
+'onchange="auswahl"'
+'<option value="999999999999999999">Nicht aktualiesieren </option>'
+'<option value="5000">In 5 Sekunde</option>'
+'<option value="10000">In 10 Sekunde</option>'
+'<option value="20000">In 20 Sekunde</option>'
+'<option value="30000">In 30 Sekunde</option>'
+'<option value="60000">In 1 Minuten</option>'
+'<option value="120000">In 2 Minuten</option>'
+'<option value="180000">In 3 Minuten</option>'
+'<option value="240000">In 4 Minuten</option>'
+'<option value="300000">In 5 Minuten</option>'
+'<option value="360000">In 6 Minuten</option>'
+'<option value="420000">In 7 Minuten</option>'
+'<option value="480000">In 8 Minuten</option>'
+'<option value="540000">In 9 Minuten</option>'
+'<option value="600000">In 10 Minuten</option>'
+'<option value="660000">In 11 Minuten</option>'
+'<option value="720000">In 12 Minuten</option>'
+'<option value="900000">In 15 Minuten</option>'
+'<option value="1200000">In 20 Minuten</option>'
+'<option value="1800000">In 30 Minuten</option>'
+'<option value="2700000">In 45 Minuten</option>'
+'<option value="3600000">In 60 Minuten</option>'
+'<option value="7200000">In 120 Minuten</option>'
+'</select><td class="submit">'
+'<input type ="button" id="speichern1" value = "Speichern"></td>'
+'<span><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Hier m&uuml;ssst ihr einfach eine Zeit aussuchen wann die Seite aktualiesiert werden soll .Z.B.Alle 5 Minuten aussuchen dann Speichern klicken  und danch wird die Seite alle 5 minuten relodet so verpasst ihr keinen Angriff mehr oder so . </b></div></span>'
+'</ul>';

var menuelinks = '<ul>' +
'<a href="http://berlin.pennergame.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Berlin</b></div></a><' +
'<a href="http://pennergame.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Hamburg</b></div></a>' +
'<a href="http://dossergame.co.uk/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Dossergame</b></div></a>' +
'<a href="http://menelgame.pl/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Menelgame</b></div></a>' +
'<a href="http://pennerhack.foren-city.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bastis Page</b></div></a>' +
'<a href="http://ego-shooters.net/forum/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Newmans Page</b></div></a>' +
'<a href="http://thx.spacequadrat.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Page von Flying</b></div></a>' +
'<a href="http://newboard.pennergame.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg Forum</b></div></a>' +
'</ul>'; //style="width: 120px;" 



var menueoption = '<ul>' 
+'<tr><select name="farbe" id ="farbe" size="1"'
+'onchange="farbe"'
+'<option value=\"black\"> Drop   Schwarz  </option>'
+'<option value=\"white\"> Drop  Weiss </option>'
+'<option value=\"red\"> Drop  Rot </option>'
+'<option value=\"green\"> Drop Gr&uuml;n </option>'
+'<option value=\"yellow\"> Drop  Gelb </option>'
+'<option value=\"orange\"> Drop  Orange </option>'
+'<option value=\"gray\"> Drop Grau </option>'
+'<option value=\"blue\"> Drop  Blau </option>'
+'<option value=\"cyan\"> Drop  T&uuml;rkis </option>'
+'<option value=\"magenta\"> Drop  Pink </option>'
+'</select></tr>'
+'<td><select name="grosse" id ="grosse" size="1"'
+'onchange="grosse"'
+'<option value=\"40\">Schrift gr&ouml;&szlig;e 40 % </option>'
+'<option value=\"50\">Schrift gr&ouml;&szlig;e 50 % </option>'
+'<option value=\"65\">Schrift gr&ouml;&szlig;e 65 % </option>'
+'<option value=\"80\">Schrift gr&ouml;&szlig;e 80 % </option>'
+'<option value=\"95\">Schrift gr&ouml;&szlig;e 95 % </option>'
+'<option value=\"110\">Schrift gr&ouml;&szlig;e 110 % </option>'
+'<option value=\"125\">Schrift gr&ouml;&szlig;e 125 % </option>'
+'<option value=\"140\">Schrift gr&ouml;&szlig;e 140 % </option>'
+'<option value=\"155\">Schrift gr&ouml;&szlig;e 155 % </option>'
+'<option value=\"170\">Schrift gr&ouml;&szlig;e 170 % </option>'
+'<option value=\"185\">Schrift gr&ouml;&szlig;e 185 % </option>'
+'<option value=\"200\">Schrift gr&ouml;&szlig;e 200 % </option>'
+'</select></td>'
+'<td><select name="leiste" id ="leiste" size="1"'
+'onchange="leiste"'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste T&uuml;rkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><br>'
+'<input type ="button" id = "speichern" value = "Speichern"></td>'
+'<div style=\"color:'+farbebig+'; font-size:100"><b>Oben ist auswahl der farbe des Drop Down Menues,darunter dist die groesen angabe (100 ist normale groesse),und darunter ist die Farbe der Leiste dioe man immer sehen tut ohne Ausklappmenue.Dann Speichern klicken und fertig ist die sache</b></span><br>'
+'</ul>';






  var style =
    'div.pdmenu {' +
    '  position: relative;}' +
    'div.pdmenu span {' +
    '  display: none;}' +
    'div.pdmenu:hover span {' +
    '  display: block;' +
    '  position: absolute;' +
    '  top: 31px;' +
    '  left: 0;' +
    '  z-index: 1000;' +
    '  border-width: 0 1px 1px;' +
    '  border-style: solid;' +
    '  border-color: #777777 #777777 #777777 #777777;' +
    '  opacity: .95;' +
    '  background: #262626;}' +
    '#navigation .pdmenu span a {' +
    '  border-color: #5d5d5d;' +                               // farbe ueber den links border overtop
    '  border-style: solid;' +
    '  border-width: 2px 0 0;' +
    '  color: #c3c3c3:' +
    '  font-size: 11px;' +
    '  height: 25px;' +
    '  width: 250px;' +
    '  padding-top: 5px;' +
    '  font-size: 11px;}' +
    '#navigation .pdmenu ul {' +
    '  margin-left: 0;}' +
    '.pdmenu div.pdsubmenu span {' +
    '  display: none;}' +
    '.pdmenu div.pdsubmenu:hover span {' +
    '  display: block;' +
    '  position: absolute;' +
    '  left: 120px;' +
    '  z-index: 1001;}' +
    '#navigation .pdmenu .pdsubmenu span a {' +
    '  width: 100px;}';

  addGlobalStyle (style);


  addPulldownMenu (11, menueoption);
  addPulldownMenu (10, menuelinks);
  addPulldownMenu (9, autoaktualiesierenbybasti);
  addPulldownMenu (8, menuegames);
  addPulldownMenu (7, menuegang);
  addPulldownMenu (6, menueFight);
  addPulldownMenu (5, menueInventar);
  addPulldownMenu (4, menueStadt);
  addPulldownMenu (3, menueaktion);
  addPulldownMenu (2, menueWeiterbildung);
  addPulldownMenu (1, menueUebersicht);
  addPulldownMenu (0, menueNews);
}

function GangID () {

}

function addGlobalStyle (css) {
    var head, style;
    head = document.getElementsByTagName ('head')[0];
    if (!head) { return; }
    style = document.createElement ('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addPulldownMenu(pos, menu) {
  var item = document.getElementById ("navigation").getElementsByTagName ("li")[pos];
  item.innerHTML = '<div class="pdmenu">' + item.innerHTML + '<span>' + menu + '</span></div>';
}




var uid = GM_getValue ("uid", -1);
var gid = GangID ();
if (uid == -1) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: ''+pgurl+'/pennerbar.xml',
    onload: function (responseDetails) {
      var parser = new DOMParser ();
      var dom = parser.parseFromString (responseDetails.responseText, "application/xml");
      var uid = dom.getElementsByTagName ("uid")[0].getAttribute("value");
      GM_setValue ("uid", uid);
      
      setupMenue (uid, gid);
    }
  });
  return;
}
setupMenue (uid, gid);

// ########################### Speicher buttons dropauswahl zuorden speichern #######################
document.getElementById('speichern').addEventListener('click', function starten() {
	var bunte = document.getElementById('farbe').value;	
	GM_setValue("bunte" , bunte);
	var groses = document.getElementById('grosse').value;	
	GM_setValue("groses" , groses);
	var leiste = document.getElementById('leiste').value;	
	GM_setValue("leiste" , leiste);
		

alert("Du hast das Aufklapp Ding die Farbe \n"+bunte+" zugewiesen\nDu hast dann noch die Sichbare Leiste die Farbe \n "+leiste+" Gegeben\nDas Aufklapp Ding hat eine Groesse von "+groses+" gekriegt \nMFG Basti");

	location.reload();
}, false);

// ######################## Hier ist das script zuende  #########################################
// Dieses Script ist einzigartig und so wie es ist gibt es das noch nie deswegen ################
// ist diese art des scriptes copyright by basti1012.Und newman auch weil ich habe mir ##########
// ein teil von seiner navileiste ausgeliehen damit dieses Script auch schoen und gut ###########
// lauft das geht nur mit den script ohne Navileiste von newman geht das irgendwie nicht#########
// ############# relod ####### time #einstellen ##############################################


document.getElementById('speichern1').addEventListener('click', function starten() {
var zztime = document.getElementById('auswahl').value;
GM_setValue("zztime" , zztime);		
location.reload();
alert("Du hast Automatisch aktualiesiern \n Alle "+zztime+" Sekunden ausgewählt  \nMFG Basti");

}, false);
setTimeout("document.getElementById('speichern1').click();",zztime);
// ################# speichern der button false und true #####################################

function def_click(ev) {
GM_setValue("def_save","true")
top.location.href= '/skills/';
}
function att_click(ev) {
GM_setValue("att_save", "true") 
top.location.href= '/skills/'
}
function geschickt_click(ev) {
GM_setValue("geschickt_save","true")
top.location.href= '/skills/';
}
function flaschen_click(ev) {
GM_setValue("flaschen_save","true")
top.location.href= '/activities/';
}
function atta_click(ev) {
GM_setValue("atta_save", "true") 
top.location.href= '/skills/pet/'
}
function defa_click(ev) {
GM_setValue("defa_save","true")
top.location.href= '/skills/pet/';
}
function geschickta_click(ev) {
GM_setValue("geschickta_save","true")
top.location.href= '/skills/pet/';
}
my_def_button = document.getElementById('def');
my_def_button.type = 'button';
my_def_button.value = 'Def Weiterbilden';
my_def_button.addEventListener('click',def_click,false);
my_att_button = document.getElementById('att');
my_att_button.type = 'button';
my_att_button.value = 'Att Weiterbilden';
my_att_button.addEventListener('click',att_click,false);
my_geschickt_button = document.getElementById('ges');
my_geschickt_button.type = 'button';
my_geschickt_button.value = 'Geschick Weiterbilden';
my_geschickt_button.addEventListener('click',geschickt_click,false);
my_flaschen_button = document.getElementById('sammeln');
my_flaschen_button.type = 'button';
my_flaschen_button.value = '10 Minuten Sammeln';
my_flaschen_button.addEventListener('click',flaschen_click,false);
my_geschickta_button = document.getElementById('tierges');
my_geschickta_button.type = 'button';
my_geschickta_button.value = 'Tier Geschick Weiterbilden';
my_geschickta_button.addEventListener('click',geschickta_click,false); 
my_defa_button = document.getElementById('tierdef');
my_defa_button.type = 'button';
my_defa_button.value = 'Tier Def Weiterbilden';
my_defa_button.addEventListener('click',defa_click,false);
my_atta_button = document.getElementById('tieratt');
my_atta_button.type = 'button';
my_atta_button.value = 'Tier Att Weiterbilden';
my_atta_button.addEventListener('click',atta_click,false);

var def_now = GM_getValue("def_save", "false");
if (def_now  == "true")
{
var def_now = "false";
GM_setValue("def_save", "false");
var def_inputButton = document.getElementById("form_def")[0];
def_inputButton.click();
}
var att_now = GM_getValue("att_save", "false");
if (att_now  == "true")
{
var att_now = "false";
GM_setValue("att_save", "false");	
var att_inputButton = document.getElementsByName("Submit")[0];
att_inputButton.click();
}
var geschickt_now = GM_getValue("geschickt_save", "false");
if (geschickt_now  == "true")
{
var geschickt_now = "false";
GM_setValue("geschickt_save", "false");
var geschickt_inputButton = document.getElementById("form_agi")[0];
geschickt_inputButton.click();
}
var flaschen_now = GM_getValue("flaschen_save", "false");
if (flaschen_now  == "true")
{
var flaschen_now = "false";
GM_setValue("flaschen_save", "false");	
var flaschen_inputButton = document.getElementsByName("Submit")[0];
att_inputButton.click();
}
var atta_now = GM_getValue("atta_save", "false");
if (atta_now  == "true")
{
var atta_now = "false";
GM_setValue("atta_save", "false");
var atta_inputButton = document.getElementsByName("Submit")[0];
atta_inputButton.click();
}
var geschickta_now = GM_getValue("geschickta_save", "false");
if (geschickta_now  == "true")
{
var geschickta_now = "false";
GM_setValue("geschickta_save", "false");
var geschickta_inputButton = document.getElementById("Submit")[0];
geschickta_inputButton.click();
}
var defa_now = GM_getValue("defa_save", "false");
if (defa_now  == "true")
{
var defa_now = "false";
GM_setValue("defa_save", "false");
var defa_inputButton = document.getElementById("form_def")[0];
defa_inputButton.click();
}

// #######################   weiterbildungs button fertig erswtellt #######################

// ##########################   banden kasse einzahlen ######################################

{
document.getElementsByName('speichern4')[0].addEventListener('click', function kassse () 
{
document.getElementsByName('speichern4')[0].disabled= "disabled";
var kommi = document.getElementById('kommi').value;

GM_setValue("kommi" , kommi);
//window.location.reload();

},false);};

{
document.getElementsByName('ExtraMenueKasseeinzahlen')[0].addEventListener('click', function kassse () 
{
document.getElementsByName('ExtraMenueKasseeinzahlen')[0].disabled= "disabled";

var Money = document.getElementById('ExtraMenueKasseMoney').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/gang/cash/add/',
   headers:
   {'Content-type': 'application/x-www-form-urlencoded'},
          data: encodeURI('f_money='+Money+'&f_comment='+GM_getValue("kommi")+'&Submit=Einzahlen'),
      onload: function(responseDetails)
	  { 
window.location.reload();
}
});
},false);};

// ############################  banden kasse einzahlen enden ###################################

// ###################### LOSE ######### BOT  ######################################################

function Losekaufen(menge)
{
  if (Number(menge) < 11)
  {
    document.getElementById('NochLose').innerHTML = 'Es werden noch '+String(menge)+' Lose gekauft!';
    GM_xmlhttpRequest(
    {
      method: 'POST',
      url: 'http://'+window.location.hostname+'/city/games/buy/',
      headers: 
      {'Content-type': 'application/x-www-form-urlencoded'},
      data: encodeURI('menge='+String(menge)+'&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC'+String(menge)+'.00+kaufen'),
      onload: function()
      { 
document.getElementById('NochLose').innerHTML = 'Es werden noch 0 Lose gekauft!';
   document.getElementsByName('submitForm')[0].disabled = false;
        document.getElementById('content').innerHTML 
	 ='<div class="goodmsg">Der Losekauf ist beendet!</div>'+
	  document.getElementById('content').innerHTML;
	ende();
      }
    });	
  }
  else
  {
document.getElementById('NochLose').innerHTML = 'Es werden noch '+String(menge)+' Lose gekauft!';
var menge = Number(menge) - 10;
    GM_xmlhttpRequest(
    {
      method: 'POST',
      url: 'http://'+window.location.hostname+'/city/games/buy/',
      headers: 
      {'Content-type': 'application/x-www-form-urlencoded'},
      data: encodeURI('menge=10&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC10.00+kaufen'),
      onload: function()
      { 
Losekaufen(menge);
      }
    });	  
  };
};
var mybody = document.getElementsByTagName('body')[0].innerHTML;
var text1 = mybody.split('Du kannst heute noch ')[1];
var NochLose = text1.split(' Lose kaufen')[0];
if (NochLose == 0 )
{
document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td')[4].innerHTML = 
'Menge: <input type="text" name="menge" id="menge1" size="3" value="0" onKeyUp="generatePreis(1,10);"/>'+
'<input type="button" value="max." id="max" name="max"/><br>'+
'<input type="hidden" name="id" value="1" />'+
'<input type="hidden" name="preis" id="preis1" value="1.00"/>'+
'<input type="hidden" name="preis_cent" id="preis_cent1" value="100"/>'+
'<div id="startbutton">'+
'<input id="submitForm1" class="formbutton" type="button" name="submitForm" value="F&uuml;r &euro;1.00 kaufen." disabled="disabled">'+
'</div>';
}
else
{
document.getElementById('content').getElementsByClassName('listshop')[0].getElementsByTagName('td')[3].innerHTML =
'<div id="NochLose" name="NochLose"></div>';
};
document.getElementsByName('submitForm')[0].addEventListener('click', function start() {																
  var menge = document.getElementById('menge1').value;
  document.getElementsByName('submitForm')[0].disabled = true;
  Losekaufen(menge);
},false);

// #########################    lose bot ende #################################################
