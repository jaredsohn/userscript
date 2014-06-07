// ==UserScript==
// @name           Pennerhilfe.de erweitertes Menü
// @namespace      pennerhilfe.de
// @description    Alle Seiten direkt über die Menüleiste erreichen
// @include        http://*.pennergame.de/*
// @include        http://pennergame.de/*
// ==/UserScript==

//Funktion zum Setzen eines Styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//Styles Setzen
addGlobalStyle('#navigation ul li{	position: relative;}#navigation ul li:hover div{	display: block;	z-index: 5;}#navigation ul li div{	display: none;	position: absolute;	top: 16px;	left: -1px;}#navigation ul li div ul li, #navigation ul li div ul li a, #navigation ul li div ul li a:visited{	border-color:#5D5D5D;	border-style:solid;	border-width: 0;	color:#C3C3C3;	background-color: #262626;	display:block;	font-family:Verdana,Helvetica,Arial,sans-serif;	font-size:11px;	margin: 0;	padding-bottom:0;	padding-top:0;	text-align:center;	text-decoration:none;	top:0;	left: -10px;	width: 141px;}#navigation ul li div ul li{	border-width: 0 1px 1px;}#navigation ul li div ul li ul{	display: none;	width: 120px;	position:absolute; top:-1px; left: 140px; z-index: 9;}#navigation ul li div ul li ul li{	border-width: 0;	height: 16px;	width: 120px;}#navigation ul li div ul li:hover ul{	display: block;}#navigation ul li div ul li ul li a, #navigation ul li div ul li ul li a:visited{	font-size: 9px;	width: 139px;	height:16px;	position: relative;	left:-2px;	padding-top: 0px;	}#navigation ul li div ul li a,#navigation ul li div ul li a:visited{	height: 20px;	padding-top: 2px;}#navigation ul li div ul li a:hover{	background-color:#3B3B3B;	background-image: none;	color:white;}#navigation ul li div ul li ul li a,#navigation ul li div ul li ul li a:visited{border-width: 1px}');

//Inhalte für die Menüs
navi_inhalt = new Array(
			'<li><a href="http://pennergame.sevenload.de/video/" target="_blank" alt="3.1 Videos!" title="3.1 Videos!"><b>3.1 Videos</b></a></li>',
			'<li><a href="/financial/" alt="Bilanzen" title="Bilanzen">Bilanzen</a></li><li><a href="/messages/" alt="Nachrichten" title="Nachrichten">Nachrichten</a><ul><li><a href="/messages/" alt="Nachrichtenliste" title="Nachrichtenliste">&gt;Nachrichten Eingang</a></li><li><a href="/messages/out/" alt="Nachrichtenliste" title="Nachrichtenliste">&gt;Nachrichten Ausgang</a></li><li><a href="/messages/write/" alt="Nachricht verfassen" title="Nachricht verfassen">&gt;Verfassen</a></li></ul></li><li><a href="/friendlist/" alt="Freunde und Blockierte" title="Freunde und Blockierte">Freunde und Blockierte</a></li><li><a href="/gang/" alt="Deine Bande" title="Deine Bande">Deine Bande</a><ul><li><a href="/gang/credit/" alt="Bandenkasse" title="Bandenkasse">&gt;Bandenkasse</a></li><li><a href="/gang/upgrades/" alt="Bandeneigentum" title="Bandeneigentum">&gt;Bandeneigentum</a></li><li><a href="/gang/memberlist/" alt="Mitglieder" title="Mitglieder">&gt;Mitglieder</a></li><li><a href="/gang/forum/" alt="Bandenforum" title="Bandenforum">&gt;Bandenforum</a></li><li><a href="/gang/pact/" alt="B&uuml;ndnisse" title="B&uuml;ndnisse">&gt;B&uuml;ndnisse</a></li><li><a href="/gang/fight/" alt="Kampf" title="Kampf">&gt;Bandenkampf</a></li></ul></li><li><a href="/awards/" alt="Auszeichungen" title="Auszeichungen">Auszeichnungen</a></li><li><a href="/change_please/statistics/" alt="Spenden Statistik" title="Spenden Statistik">Spenden Statistik</a></li><li><a href="/faq/" alt="FAQ" title="FAQ">FAQ</a></li><li><a href="/manual/" alt="Anleitung" title="Anleitung">Anleitung</a></li><li><a href="/help/3_1/" alt="3.1" title="3.1"><b>3.1 Einf&uuml;hrung</b></a></li>',
			'<li><a href="/skills/" alt="Weiterbilden" title="Dich weiterbilden">Penner</a></li><li><a href="/skills/pet/" alt="Haustier" title="Dein Haustier weiterbilden">Haustier</a></li>',
			'',
			'<li><a href="/city/map/" alt="Stadtkarte" title="Stadtkarte">Stadtkarte</a></li><li><a href="/city/district/" alt="Stadtteile" title="Stadtteile">Stadtteile</a></li><li><a href="/city/home/" alt="Eigenheim" title="Eigenheim">Eigenheim</a></li><li><a href="/city/scrounge/" alt="Schnorrplatz" title="Schnorrplatz">Schnorrplatz</a></li><li><a href="/city/games/" alt="Gl&uuml;cksspiele" title="Gl&uuml;cksspiele">Gl&uuml;cksspiele</a></li><li><a href="/city/weapon_store/" alt="Waffenladen" title="Waffenladen">Waffenladen</a><ul><li><a href="/city/weapon_store/" alt="Angriff" title="Verteidigung">&gt;Angriff</a></li><li><a href="/city/weapon_store/def/" alt="Verteidigung" title="Verteidigung">&gt;Verteidigung</a></li></ul></li><li><a href="/city/pet_store/" alt="Tierhandlung" title="Tierhandlung">Tierhandlung</a></li><li><a href="/city/supermarket/" alt="Supermarkt" title="Supermarkt">Supermarkt</a><ul><li><a href="/city/supermarket/drinks/" alt="Getr&auml;nke" title="Getr&auml;nke">&gt;Getr&auml;nke</a></li><li><a href="/city/supermarket/food/" alt="Nahrung" title="Nahrung">&gt;Nahrung</a></li></ul></li><li><a href="/city/music_store/" alt="Musikladen" title="Musikladen">Musikladen</a></li><li><a href="/city/stuff/" alt="Zubeh&ouml;r" title="Zubeh&ouml;r">Zubeh&ouml;r</a></li><li><a href="/city/medicine/" alt="Medizin" title="Medizin">Medizin</a></li><li><a href="/city/washhouse/" alt="Waschhaus" title="Waschhaus">Waschhaus</a></li>',
			'<li><a href="/stock/foodstuffs/" alt="Lebensmittel" title="Lebensmittel">Lebensmittel</a><ul><li><a href="/stock/foodstuffs/food/" alt="Essen" title="Essen">&gt;Essen</a></small></li><li><a href="/stock/foodstuffs/drinks/" alt="Trinken" title="Trinken">&gt;Trinken</a></li></ul></li><li><a href="/stock/plunder/" alt="Plunder" title="Plunder">Plunder</a><ul><li><a href="/stock/plunder/craft/" alt="Mit Plunder basteln" title="Mit Plunder basteln">&gt;Basteln</a></li></ul></li><li><a href="/stock/bottle/" alt="Pfandflaschen" title="Pfandflaschen">Pfandflaschen</a><ul><li><a href="/stock/bottlechart/" alt="Pfandflaschenkurs" title="Pfandflaschenkurs">&gt; Pfandflaschenkurs</a></li></ul></li><li><a href="/stock/instruments/" alt="Instrumente" title="Instrumente">Instrumente</a></li><li><a href="/stock/armoury/" alt="Waffenkammer" title="Waffenkammer">Waffenkammer</a></li>',
			'<li><a href="/fight/overview/" alt="Kampf" title="Kampf">Kampf</a></li><li><a href="/fight/pet/" alt="Haustierk&auml;mpfe" title="Haustierk&auml;mpfe">Haustierk&auml;mpfe</a></li>'
);

//Navigationspunkte auslesen
var navi = document.getElementById('navigation').getElementsByTagName('li');
if( navi[1].innerHTML.search(/(.*)bersicht(.*)/) != -1 ){//Testen, ob normale Menüleiste angezeigt wird
	for(var j = 0;j < navi_inhalt.length;j++){//die Menüpunkte durchnummerieren
		navi[j].id = 'navi_'+j;
	}	
	for(var i = 0;i < navi_inhalt.length;i++){//die Inhalte des Menüs durchgehen
		if(navi_inhalt[i] != ''){
			document.getElementById('navi_'+i).innerHTML += '<div class="submenu_shop"><div class="content"><ul>' + navi_inhalt[i] +'<li style="height: 14px;"><a style="font-size: 9px;height:14px;" href="http://pennerhilfe.de/" title="Pennerhilfe.de - Spendensystem" target="_blank" alt="Pennerhilfe.de - Spendensystem">Pennerhilfe.de</a></li><li style="height: 3px;"><img style="position:relative;left:-3px;" src="http://media.pennergame.de/img/menu_buttom.png" alt=""/></li></ul></div></div>';
		}
	}
}