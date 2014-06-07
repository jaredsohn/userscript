var headers = parseHeaders(<><![CDATA[
// ==UserScript==
// @name	Menelgame menu v.1.3.1
// @namespace	none
// @description	Drop-Down Menu 1.3.1
// @include	http://pennergame.de/*
// @include	http://*.pennergame.de/*
// @include	http://menelgame.pl/*
// @include	http://*.menelgame.pl/*
// @include	http://dossergame.co.uk/*
// @include	http://*.dossergame.co.uk/*
// ==/UserScript==
]]></>.toXMLString().split(/[\r\n]+/).filter(/\/\/ @/));

// 1.3.2	Dodanie link�w do forum
// 1.3.1   	T�umaczenie na polski (sztywno z gr�) oraz drobna zmiana w walkach
// 1.3   	Implement ?version
//    	Add URLPrefix only for change. and highscore.
//    	Add Verbrechen to Aktionen
//		Add more Menu entries
//		Disable Profile and Gang profile links
// 1.2	Fix for page update on 5. Mar 2009
//		Fix links to htt://www.pennergame.de/
// 1.1.1 	Get gid value
// 1.1   	New layout, submenues
//       	Add gang submenu
// 1.0.2 	use pdmenu classname instead of tooltip - display issuses with plunder                                                                          
// 1.0.1 	fix bottlechart link

// Implement ?version switch, header parser taken from:
// http://groups.google.com/group/greasemonkey-users/browse_thread/thread/2003daba08cc14b6
function parseHeaders(all) {
  var headers = {}, name, value;
  for each (var line in all) {
    [line, name, value] = line.match(/\/\/ @(\S+)\s*(.*)/);
    headers[name] = value; }
  return headers; }
if (window.location.href.match (/\?version$/)) {
  alert (headers["description"]); }
// ========================================

var URLPrefix = "";
if (window.location.href.match (/http:\/\/(change|highscore)\./)) {
  URLPrefix = "http://www.menelgame.pl";
}

function setupMenue (uid, gid) {
  var menueUebersicht = '<ul>' +
    '  <li><a href="' + URLPrefix + '/financial/">Bilans</a></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/messages/">Wiadomosci...</a>' +
    '    <span style="top: 28px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/messages/">Otrzymane</a></li>' +
    '      <li><a href="' + URLPrefix + '/messages/out/">Wyslane</a></li>' +
    '      <li><a href="' + URLPrefix + '/messages/write/">Napisz</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/friendlist/">Przyjaciele &amp; blokowani</a></li>' +
    ((gid == 0) ?
      '  <li><a href="' + URLPrefix + '/gang/">Twoja banda</a></li>' :
     ('  <li><div class="pdsubmenu">' +
      '    <a href="' + URLPrefix + '/gang/">Twoja banda...</a>' +
      '    <span style="top: 70px;"><ul>' +
      '      <li><a href="' + URLPrefix + '/gang/">Banda</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/credit/">Kasa bandy</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/upgrades/">Majatek bandy</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/memberlist/">Czlonkowie</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/forum/">Forum bandy</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/pact/">Sojusze</a></li>' +
      '      <li><a href="' + URLPrefix + '/profil/bande:' + gid + '/">Profil</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/fight/">Walki bandy</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/fight/fightlog/">Lista bojownikow</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/admin/">Strefa administratora</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/admin/log/">Adminlog</a></li>' +
      '  </ul></span></div></li>')) +
    '  <li><a href="' + URLPrefix + '/awards/">Wyroznienia</a></li>' +
    '  <li><a href="' + URLPrefix + '/profil/id:' + uid + '/">Twoj profil</a></li>' +
    '  <li><a href="' + URLPrefix + '/change_please/statistics/">Statystyka datkow</a></li>' +
    '  <li><a href="' + URLPrefix + '/settings/">Ustawienia</a></li>' +
    '  <li><a href="' + URLPrefix + '/faq/">FAQ</a></li>' +
    '  <li><a href="' + URLPrefix + '/manual/">Instrukcje v3 (angielski)</a></li>' +
    '  <li><a href="' + URLPrefix + '/help/3_1/"><b>Helpdesk v3.1 (niemiecki)</b></a></li>' +
    '</ul>';
  var menueWeiterbildung = '<ul>' +
    '  <li><a style="width: 100px;" href="' + URLPrefix + '/skills/">Menel</a></li>' +
    '  <li><a style="width: 100px;" href="' + URLPrefix + '/skills/pet/">Zwierzak</a></li>' +
    '</ul>';
  var menueAktionen = '<ul>' +
    '  <li><a href="' + URLPrefix + '/activities/">Akcje</a></li>' +
    '  <li><a href="' + URLPrefix + '/activities/crime/">Przestepstwa</a></li>' +
    '  <li><a href="' + URLPrefix + '/activities/crime/logs/">Przeprowadzone przestepstwa</a></li>' +
    '</ul>';
  var menueStadt = '<ul>' +
    '  <li><a href="' + URLPrefix + '/city/map/">Mapa miasta</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/district/">Dzielnice</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/home/">Mieszkanie</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/scrounge/">Wyzebrac</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/games/">Gry hazardowe</a></li> ' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/city/weapon_store/">Sklep z bronia...</a>' +
    '    <span style="top: 112px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/city/weapon_store/">Atak</a></li>' +
    '      <li><a href="' + URLPrefix + '/city/weapon_store/def/">Obrona</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/city/pet_store/">Sklep zoologiczny</a></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/city/supermarket/">Supermarket...</a>' +
    '    <span style="top: 154px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/city/supermarket/drinks/">Napoje</a></li>' +
    '      <li><a href="' + URLPrefix + '/city/supermarket/food/">Pozywienie</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/city/music_store/">Sklep muzyczny</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/stuff/">Osprzet</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/medicine/">Lekarstwa</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/washhouse/">Pralnia</a></li>' +
    '</ul>';
  var menueInventar = '<ul>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/stock/foodstuffs/">Artykuly spozywcze...</a>' +
    '    <span style="top: 7px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/stock/foodstuffs/food/">Jedzenie</a></li>' +
    '      <li><a href="' + URLPrefix + '/stock/foodstuffs/drinks/">Picie</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/stock/plunder/">Rupiecie...</a>' +
    '    <span style="top: 28px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/stock/plunder/craft/">Majsterkowac</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/stock/bottle/">Puszki...</a>' +
    '    <span style="top: 49px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/stock/bottlechart/">Kurs puszek</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/stock/instruments/">Instrumenty</a></li>' +
    '  <li><a href="' + URLPrefix + '/stock/armoury/">Magazyn broni</a></li>' +
    '</ul>';
  var menueFight = '<ul>' +
    '  <li><a href="' + URLPrefix + '/fight/overview/">Walcz</a></li>' +
    '  <li><a href="' + URLPrefix + '/fight/fightlog/">Przeglad walk</a></li>' +
    '  <li><a href="' + URLPrefix + '/fight/pet/">Walki zwierzakow</a>' +
    '</ul>';

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
    '  border-width: 1px 0 0;' +
    '  color: #c3c3c3:' +
    '  font-size: 11px;' +
    '  height: 14;' +
    '  width: 140px;' +
    '  padding-top: 3px;' +
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

  addPulldownMenu (6, menueFight);
  addPulldownMenu (5, menueInventar);
  addPulldownMenu (4, menueStadt);
  addPulldownMenu (3, menueAktionen);
  addPulldownMenu (2, menueWeiterbildung);
  addPulldownMenu (1, menueUebersicht);
}

function GangID () {
  var gid = 0;
  if (window.location.href.match (/^http:\/\/([a-z0-9.]+\.)?menelgame\.pl\/gang\/$/)) {
    var result = document.evaluate ("//a[@title='Profil']",
      document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    try {
      gid = result.snapshotItem(0).href.match(/\d+/)[0];
      GM_setValue ("gid", gid);
    } catch (err) {
      // Bande verlassen oder anderer Fehler?
      // if (GM_getValue ("gid", 0) != 0) {
      //   alert ("err = " + err + ", Bande verlassen?"); }
      // GM_setValue ("gid", 0);
      gid = GM_getValue ("gid", 0);
    }
  } else {
    gid = GM_getValue ("gid", 0);
  }
  return gid;
}

function addGlobalStyle (css) {
  try {
    GM_addStyle (css);
  } catch (err) {
    var head, style;
    head = document.getElementsByTagName ('head')[0];
    if (!head) { return; }
    style = document.createElement ('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
  }
}

var pulldownMenuLeiste = document.getElementById ("navigation").getElementsByTagName ("li");
function addPulldownMenu(pos, menu) {
  var item = pulldownMenuLeiste[pos];
  item.innerHTML = '<div class="pdmenu">' + item.innerHTML + '<span>' + menu + '</span></div>';
}

setupMenue (1, 1);

/*
var uid = GM_getValue ("uid", -1);
var gid = GangID ();
if (uid == -1) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.menelgame.pl/pennerbar.xml',
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
*/