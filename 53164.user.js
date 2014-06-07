// ==UserScript==
// @name	Bastis Geilstes Dropdown Menue das es jemals gab
// @namespace	basti1012
// @description	Drop-Down Menues 3.3 Fuegt zu der normalen leiste von pennergame noch ein paar links dazu .Dann gibt es per maous over noch mehr links .Mann kann die leisten Farben und man kann die dropdown leiste die farben ändern und die groesse auch .das geht alles ueber die leiste und nicht mehr durch den script.
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
 newli__8.innerHTML = '<a href="/city/games/" title="Gl\u00fccksspiele" style="width: 65.6px;">Games</a>';
navi_ul[0].insertBefore(newli__8, navi_ul[0].getElementsByTagName('li')[8]);
}
var newli = document.createElement('li');
 newli.style.width = "65.6px";
  newli.innerHTML = '<a href="/city/weapon_store/" title="Waffenladen" style="width: 65.6px;">Att store</a>';
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


function setupMenue (uid, gid) {
var menueNews = '<ul>' +
'<li><a style="width: 100px;" href="' + pgurl + '/skills/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>noch was bauen</b></div></a></li>' +
'<li><a style="width: 100px;" href="' + pgurl + '/skills/pet/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>noch was baeun</b></div></a></li>' +
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
'</ul>';
var menueWeiterbildung = '<ul>' +
'<li><a style="width: 100px;" href="' + pgurl + '/activities/crime/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Verbrechen</b></div></a></li>' +
'<li><a style="width: 100px;" href="' + pgurl + '/skills/pet/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Haustier</b></div></a></li>' +
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
var menuegames = '<ul>' +
'<li><a style="width: 100px;" href="' + pgurl + '/city/games/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Hier entsteht</b></div></a></li>' +
'<li><a style="width: 100px;" href="' + pgurl + '/city/games/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Der lose Bot</b></div></a></li>' +
'</ul>';
var menuelinks = '<ul>' +
'<li><a style="width: 120px;" href="http://berlin.pennergame.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Berlin</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://pennergame.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Hamburg</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://dossergame.co.uk/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Dossergame</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://menelgame.pl/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg-Menelgame</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://pennerhack.foren-city.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Bastis Page</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://ego-shooters.net/forum/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Newmans Page</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://thx.spacequadrat.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Page von Flying</b></div></a></li>' +
'<li><a style="width: 120px;" href="http://newboard.pennergame.de/"><div style=\"color:'+farbebig+'; font-size:'+bigzahl+'%;"><b>Pg Forum</b></div></a></li>' +
'</ul>'; 
var menueoption = '<ul>' 
+'<tr><select name="farbe" id ="farbe" size="10"'
+'onchange="farbe"'
+'<option value=\"black\"> Drop   Schwarz  </option>'
+'<option value=\"white\"> Drop  Weiss </option>'
+'<option value=\"red\"> Drop  Rot </option>'
+'<option value=\"green\"> Drop Gr&uuml;n </option>'
+'<option value=\"yellow\"> Drop  Gelb </option>'
+'<option value=\"orange\"> Drop  Orange </option>'
+'<option value=\"gray\"> Drop Grau </option>'
+'<option value=\"blue\"> Drop  Blau </option>'
+'<option value=\"cyan\"> Drop  Türkis </option>'
+'<option value=\"magenta\"> Drop  Pink </option>'
+'</select></tr>'
+'<td><select name="grosse" id ="grosse" size="10"'
+'onchange="grosse"'
+'<option value=\"60\">Droü Gross 40 % </option>'
+'<option value=\"70\">Droü Gross  50 % </option>'
+'<option value=\"80\">Droü Gross  65 % </option>'
+'<option value=\"90\">Droü Gross  80 % </option>'
+'<option value=\"100\">Droü Gross  95 % </option>'
+'<option value=\"110\">Droü Gross  110 % </option>'
+'<option value=\"120\">Droü Gross  125 % </option>'
+'<option value=\"130\">Droü Gross  140 % </option>'
+'<option value=\"140\">Droü Gross  155 % </option>'
+'<option value=\"150\">Droü Gross  170 % </option>'
+'<option value=\"160\">Droü Gross  185 % </option>'
+'<option value=\"170\">Droü Gross  200 % </option>'
+'</select></td>'
+'<td><select name="leiste" id ="leiste" size="10"'
+'onchange="leiste"'
+'<option value=\"black\"> Leiste Schwarz  </option>'
+'<option value=\"white\"> Leiste Weiss </option>'
+'<option value=\"red\"> Leiste Rot </option>'
+'<option value=\"green\"> Leiste Gr&uuml;n </option>'
+'<option value=\"yellow\"> Leiste Gelb </option>'
+'<option value=\"orange\"> Leiste Orange </option>'
+'<option value=\"gray\"> Leiste Grau </option>'
+'<option value=\"blue\"> Leiste Blau </option>'
+'<option value=\"cyan\"> Leiste Türkis </option>'
+'<option value=\"magenta\">Leiste Pink </option>'
+'</select><td><br>'
+'<input type ="button" id = "speichern" value = "Speichern"></td>'
+'<div style=\"color:green; font-size:100"><b>Oben ist auswahl der farbe des Drop Down Menues,darunter dist die groesen angabe (100 ist normale groesse),und darunter ist die Farbe der Leiste dioe man immer sehen tut ohne Ausklappmenue.Dann Speichern klicken und fertig ist die sache</b></span><br>'
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
    '  border-color: #5d5d5d;' +
    '  border-style: solid;' +
    '  border-width: 2px 0 0;' +
    '  color: #c3c3c3:' +
    '  font-size: 11px;' +
    '  height: 25px;' +
    '  width: 150px;' +
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
  addPulldownMenu (8, menuegames);
  addPulldownMenu (7, menuegang);
  addPulldownMenu (6, menueFight);
  addPulldownMenu (5, menueInventar);
  addPulldownMenu (4, menueStadt);
  addPulldownMenu (3, menueNews);
  addPulldownMenu (2, menueWeiterbildung);
  addPulldownMenu (1, menueUebersicht);

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
// ##############################################################################################




