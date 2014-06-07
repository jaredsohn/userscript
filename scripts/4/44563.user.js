// ==UserScript==
// @name	DosserMenü2.0
// @namespace	http://bbc--schlampe.pennergame.de/
// @description	Drop-Down Menüs 1.2
// @include	http://dossergame.co.uk/*
// @include http://*.dossergame.co.uk/*
// ==/UserScript==

// 1.2   Fix for page update on 5. Mar 2009
//       Fix links to http://www.dossergame.co.uk/
// 1.1.1 Get gid value
// 1.1   New layout, submenues
//       Add gang submenu
// 1.0.2 use pdmenu classname instead of tooltip - display issuses with plunder
// 1.0.1 fix bottlechart link

var URLPrefix = "http://www.dossergame.co.uk";

function setupMenue (uid, gid) {
  var menueUebersicht = '<ul>' +
    '  <li><a href="' + URLPrefix + '/financial/">Bilanzen</a></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/messages/">Nachrichten...</a>' +
    '    <span style="top: 28px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/messages/">Eingang</a></li>' +
    '      <li><a href="' + URLPrefix + '/messages/out/">Ausgang</a></li>' +
    '      <li><a href="' + URLPrefix + '/messages/write/">Verfassen</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/friendlist/">Freunde und Blockierte</a></li>' +
    ((gid == 0) ?
      '  <li><a href="' + URLPrefix + '/gang/">Deine Bande</a></li>' :
     ('  <li><div class="pdsubmenu">' +
      '    <a href="' + URLPrefix + '/gang/">Deine Bande...</a>' +
      '    <span style="top: 70px;"><ul>' +
      '      <li><a href="' + URLPrefix + '/gang/">Bande</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/credit/">Bandenkasse</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/upgrades/">Bandeneigentum</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/memberlist/">Mitglieder</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/forum/">Bandenforum</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/pact/">Bündnisse</a></li>' +
      '      <li><a href="' + URLPrefix + '/profil/bande:' + gid + '/">Profil</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/fight/">Bandenkampf</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/fight/fightlog/">Kampflog</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/admin/">Adminbereich</a></li>' +
      '      <li><a href="' + URLPrefix + '/gang/admin/log/">Adminlog</a></li>' +
      '  </ul></span></div></li>')) +
    '  <li><a href="' + URLPrefix + '/awards/">Auszeichnungen</a></li>' +
    '  <li><a href="' + URLPrefix + '/profil/id:' + uid + '/">Dein Profil</a></li>' +
    '  <li><a href="' + URLPrefix + '/change_please/statistics/">Spenden Statistik</a></li>' +
    '  <li><a href="' + URLPrefix + '/premium/">Ehrenmitgliedschaft</a></li>' +
    '  <li><a href="' + URLPrefix + '/faq/">FAQ</a></li>' +
    '  <li><a href="' + URLPrefix + '/manual/">Anleitung</a></li>' +
    '  <li><a href="' + URLPrefix + '/help/3_1/"><b>3.1 Einführung</b></a></li>' +
    '</ul>';
  var menueWeiterbildung = '<ul>' +
    '  <li><a style="width: 100px;" href="' + URLPrefix + '/skills/">Penner</a></li>' +
    '  <li><a style="width: 100px;" href="' + URLPrefix + '/skills/pet/">Haustier</a></li>' +
    '</ul>';
  var menueStadt = '<ul>' +
    '  <li><a href="' + URLPrefix + '/city/map/">Stadtkarte</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/district/">Stadtteile</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/home/">Eigenheim</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/scrounge/">Schnorrplatz</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/games/">Glücksspiele</a></li> ' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/city/weapon_store/">Waffenladen...</a>' +
    '    <span style="top: 112px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/city/weapon_store/">Angriff</a></li>' +
    '      <li><a href="' + URLPrefix + '/city/weapon_store/def/">Verteidigung</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/city/pet_store/">Tierhandlung</a></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/city/supermarket/">Supermarkt...</a>' +
    '    <span style="top: 154px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/city/supermarket/drinks/">Getränke</a></li>' +
    '      <li><a href="' + URLPrefix + '/city/supermarket/food/">Nahrung</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/city/music_store/">Musikladen</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/stuff/">Zubehör</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/medicine/">Medizin</a></li>' +
    '  <li><a href="' + URLPrefix + '/city/washhouse/">Waschhaus</a></li>' +
    '</ul>';
  var menueInventar = '<ul>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/stock/foodstuffs/">Lebensmittel...</a>' +
    '    <span style="top: 7px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/stock/foodstuffs/food/">Essen</a></li>' +
    '      <li><a href="' + URLPrefix + '/stock/foodstuffs/drinks/">Trinken</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/stock/plunder/">Plunder...</a>' +
    '    <span style="top: 28px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/stock/plunder/craft/">Basteln</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><div class="pdsubmenu">' +
    '    <a href="' + URLPrefix + '/stock/bottle/">Pfandflaschen...</a>' +
    '    <span style="top: 49px;"><ul>' +
    '      <li><a href="' + URLPrefix + '/stock/bottlechart/">Flaschenkurs</a></li>' +
    '  </ul></span></div></li>' +
    '  <li><a href="' + URLPrefix + '/stock/instruments/">Instrumente</a></li>' +
    '  <li><a href="' + URLPrefix + '/stock/armoury/">Waffenkammer</a></li>' +
    '</ul>';
  var menueFight = '<ul>' +
    '  <li><a href="' + URLPrefix + '/fight/overview/">Kampf</a></li>' +
    '  <li><a href="' + URLPrefix + '/fight/pet/">Haustierkämpfe</a>' +
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
    '  height: 17px;' +
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
  addPulldownMenu (2, menueWeiterbildung);
  addPulldownMenu (1, menueUebersicht);
}

function GangID () {
  var gid = 0;
  if (window.location.href.match (/^http:\/\/([a-z0-9.]+\.)?dossergame\.co.uk\/gang\/$/)) {
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
    url: 'http://www.dossergame.co.uk/pennerbar.xml',
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
