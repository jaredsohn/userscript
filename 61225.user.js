// ==UserScript==
// @name		Mega drop Down Leiste fuer pennergame 4.0 hamburg berlin version 3 mit angriff post und wi wu 
// @namespace		basti1012 @ http://penerhack.foren-city.de
// @description		Erzeugt eine mega leitse mit allen links und allen infos und co  game hamburg berlin 4.0
// @version		versionj (1) fuer hamburg berlinn betA
// @include		*pennergame.de/*
// @include		*berlin.pennergame.de/*
// ==/UserScript==
//-----------------------------------------------------------------------------------------------------

var url = document.location.href;

if (url.indexOf("http://berlin.pennergame")>=0) {
var gamelink = "http://berlin.pennergame.de"
var medialink = 'bl_DE';
}

if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
var medialink = 'de_DE';
}

http://media.pennergame.de/cache/bottlechart/06_11_2009_bl_DE.png
// ----------------------------------------------------------------------------------------------
// einstellung der uhrzeit in farbe und groesse 
// uhr zeit kommt von deinen pc und enn du internet hast wie jetzt sonst wuerde es  ja nicht gehen fragt
// dein pc die uhrzeit ium internet ab und somit hast du eigentlich immer die genauste uhrzeit die
// es gibt und somit genauer als pennergaqme also die zeit ist genau abe3r bitte ran denken die zeit
// bei pennergame kann abweichen und so mi hat dieses uhr keine genaue zeit was bei pennergame los ist .
//es kann sein das der server die gleiche zeit hat oder nicht das konnte ich noch nicht gednau feststdellen .


//var uhrgrosse = '150';
//var Uhrfarbe = 'green':


//-----------------------------------------------------------------------------------------------------
//style positsion und co fuer das menue
// -------------------------------------------------------------------------------------
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// -------------------------------------------------------------------------------------
// links die der user selber uordnen kann wie er moechte
// -------------------------------------------------------------------------------------
// hier koent ihr die links in links endern einfach zwischen den ' und den ' den link endern und ihr habt eure wunsch link da drinne


var link1 = 'http://pennerhack.foren-city.de';
var link2 = 'http://www.pennergame.de';
var link3 = 'http://www.ic-design.de.tt/';
var link4 = 'http://ego-shooters.net/forum/index.php';
var link5 = 'http://pennerhack.prm-hosting.de/index.php';
var link6 = 'http://thx.spacequadrat.de/index.php';
var link7 = 'http://freedombananas.kilu.de/forum/portal.php';
var link8 = 'http://pennergame-tools.de/';
var link9 = 'http://www.pennergame-fake.de.tl/';

// -------------------------------------------------------------------------------------
// hier nur was endern wen ihr ahnung habt ansonsten an besten die finger weg lassen danke
// --------------------------------------------------------------------------------------
var bigzahl = '100';
var bunte = 'withe';
var oben ='0';
var links ='0';

// -------------------------------------------------------------------------------------
// farbe der schrieften endern einmal was ist esw was wird es sein also was ist es und antwort 2 farben
// -------------------------------------------------------------------------------------
// hier koent ihr die farben des unter menues und des ober menues einstellen einfach neue englische farbe eingeben 
var SchriftBG ='black';
var SBG ='red';


// -------------------------------------------------------------------------------------
// hie wird produktierst das menue fuer das mnenue
// -------------------------- einsttelungen zum erscheinen des menues hier werden alle sachen eingestelt wie es angezeigt wird------------------------------
addGlobalStyle('div#Rahmen1 {position:absolute;top:'+oben+'px;left:'+links+'px;width: 105.0em;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.6;opacity:1.6;border:px solid white;background: url(http://www.fotos-hochladen.net/hintergrundbastime3f5s682b.jpg) }');
addGlobalStyle('div#Rahmen1 div {margin: 0 auto;display: block;clear: left;}ul#Navigation1 {margin: 0; padding: 0;}')
addGlobalStyle('ul#Navigation1 li {list-style: none;float: left;width: 7.0em;position: relative;margin: 0.0em; padding: 0;}')
addGlobalStyle('ul#Navigation1 li ul {margin: 0 auto; padding: 0;position: absolute;top: 0.1em; left: -0.0em;}')
addGlobalStyle('ul#Navigation1 li ul li {float: none;display: block;margin-bottom: 0.2em;}')
addGlobalStyle('ul#Navigation1 a {border: 0px solid white;display: block;padding: 0.2em -0.5em;text-decoration: none; font-weight: bold;color: white; background: url(http://www.fotos-hochladen.net/hintergrundbastime3f5s682b.jpg)}')
addGlobalStyle('ul#Navigation1 a:hover {border: 1px solid white; }')
addGlobalStyle('ul#Navigation1 li>ul {display: none; top: 6.0em;}ul#Navigation1 li:hover>ul, ul#Navigation1 li>a#ul {display: block;}')
addGlobalStyle('#TopMenueDiv{z-index:9000;position:absolute;display:block;}')


// -------------------------------------------------------------------------------------
// abrfrage flaschen  geld und kurs
// -------------------------------------------------------------------------------------
GM_xmlhttpRequest({
      method: 'GET',
            url: ''+gamelink+'/stock/bottle/',
            onload: function(responseDetails) {
            var content = responseDetails.responseText;

                       var text1 = document.getElementsByClassName('icon money')[0];
                       var text11 = text1.innerHTML.split(unescape("%u20AC"))[1];
                       var cash = text11.split("</a>")[0];
                       cash = cash.replace(/\./g, "");
                       cash = cash.replace(/,/, ".");
                       var cash = cash*100;


	var text1 = content.split('name="chkval" value="')[1];
	var kurs = text1.split('"')[0];
	var text11 = content.split('item_list')[1];
	var text22 = text11.split('</span>')[0];
	var text1 = text22.split('<span>')[1];
	var flascheninventar = text1.split('Pfandflaschen')[0];// flaschen inventar
	var restflaschen= Math.round(59000000 - flascheninventar);   // letze flaschren bis zum schloss
	var flaschenergebniss= Math.round(flascheninventar*kurs)/100;
	var rest_geld = Math.round(590000 - flaschenergebniss);// rest geld was zum schloss fehlen tut


// ----------------------------------------------------------------------------------------------------------
// abfrage alles was auf der ovewiev seite zu finden ist 
// -------------------------------------------------------------------------------------------------------

GM_xmlhttpRequest({
            method: 'GET',
            url: ''+gamelink+'/overview/',
                onload: function( response ) {
                var content = response.responseText;
                var skill = content.split('att">')[2].split('</span>')[0];
                var skill1 = content.split('def">')[2].split('</span>')[0];
                var skill2 = content.split('mitleid">')[1].split('</span>')[0];
                var userid = content.match(/\/profil\/id\:([0-9]+)/)[1];
                var clean = content.match(/Sauberkeit:\s([0-9]+)/)[1];
                var att11 = content.split('att">')[1].split('</span>')[0];

                var def11 = content.split('def">')[1].split('</span>')[0];
                var platz = content.split('<span class="v">')[1].split('</span>')[0];
                var geld = content.split('<span class="v">')[2].split('</span>')[0];
                var prom2 = content.match(/\u003E([0-9]\.[0-9]+)\u0026permil\u003B\u003C/)[1];
                var spendenbisherpur = content.match(/Du hast heute ([0-9]+) Spenden erhalten/)[ 1 ];
                var Name = content.split('<img class="nickimg" src="http://www.pennergame.de/headline/')[1].split('/" />')[0];
                var Alk = prom2
                var Benoetigtprozent = 299 - Alk;
                var Benoetigtbier = Math.floor(Benoetigtprozent/35);
                var Benoetigtbrot = Math.ceil(Alk/35);


// -----------------------------------------------------------------------------------------------------
// api abfrage des penners
// -----------------------------------------------------------------------------------------------------
GM_xmlhttpRequest({
            method: 'GET',
            url: ''+gamelink+'/dev/api/user.'+userid+'.xml',
            onload: function(responseDetails) {

         	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
          	var nam = dom.getElementsByTagName('name')[0].textContent;
          	var id = dom.getElementsByTagName('id')[0].textContent;
          	var platz = dom.getElementsByTagName('position')[0].textContent;
          	var points = dom.getElementsByTagName('points')[0].textContent;
          	var position = dom.getElementsByTagName('position')[0].textContent;
          	var rankingpoints = dom.getElementsByTagName('rankingpoints')[0].textContent;
         	var city = dom.getElementsByTagName('city')[0].textContent;
                var hs2 = dom.getElementsByTagName('points')[0].textContent;

             		 var reg = dom.getElementsByTagName('reg_since')[0].textContent;
             		 var regm = reg.split('.')[1];
             		 var regmm = regm.split('.')[0];
             		 var regj = reg.split('.')[2];
             		 var tage = reg.split('.')[0];
             		 var suchergebnis = regj+regmm+tage;

             		 try{
             		       var cash = dom.getElementsByTagName('cash')[0].textContent/100;
             		 }catch(e){
             		       var cash='Deaktiviert';
             		 }
              			 try{
              			      var bandenname = dom.getElementsByTagName('name')[1].textContent;
              			      var bandenid = dom.getElementsByTagName('id')[1].textContent;
            			      var status = dom.getElementsByTagName('status')[0].textContent;
            			      var joined = dom.getElementsByTagName('joined')[0].textContent;
            			      }catch(e){
           			      cash='Deaktiviert';
            			      }

// --------------------------------------------------------------------------------------------------
// hier wird die igh uebersicht seite abgefragt 
// ----------------------------------------------------------------------------------------------------
GM_xmlhttpRequest({
          method: 'GET',
          url: ''+gamelink+'/fight/overview/',
          	onload: function( response ) {
          		var content = response.responseText;
          		var attmin = content.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 1 ];
          		var attmax = content.match(/Dein Ziel muss ([0-9]+) bis ([0-9]+) Punkte haben/)[ 2 ];
          		var hslink = 'http://pennergame.de/highscore/range/?max_points='+attmax+'&min_points='+attmin+'&serverload=low'
          		var maxspenden = "<span style=\"color:"+SchriftBG+"\"><big><b>50</b></big></span>" 
          			if (spendenbisherpur>9) {
          	 			var spendenbisher = "<span style=\"color:red\"><big><b>"+spendenbisherpur+"</b></big></span>";
          	 		}else {
          	 			var spendenbisher = spendenbisherpur;
          	 		} 
          			        var maxflaschen = "1"

// -------------------------------------------- Plunder abfrage werte und co und ws an ist -----------------
// wiwu und wut warner abfrage 
// -------------------------------------------------------------------------------------------------------
   GM_xmlhttpRequest({
      method: 'GET',
      url: ''+gamelink+'/gang/',
      onload: function(responseDetails) {
         var content = responseDetails.responseText;
	try{
        var ges = content.split('<tr align="left" valign="top">')[2];
        var ges2 = ges.split('<tr align="left" valign="top">')[0];
        var ges3 = ges2.split('<div align="center">')[1];
        var ges4 = ges3.split('</div>')[0];
	}catch(e){
	var ges4 = '<br>Wi-wu-wut-warner aktiv';
	}

// -----------------------------------------------------------------------------------------------------------
// hier werden alle plunder sachen abgefragt wie bild werte und co 
//--------------------------------------------------------------------------------------------------


GM_xmlhttpRequest({
  	method: 'GET',
   	url: ""+gamelink+"/stock/plunder/",
        onload: function(responseDetails) {


        		var acontent = responseDetails.responseText;
			var table1 = acontent.split('<h3>Angelegt</h3>')[1];			
			var table12 = table1.split('class="submenu">')[0];								
			var table13 = table12.split('src="')[1];					
			var table14 = table13.split('"')[0];
			var info = table12.split('<ul class="zclear">')[1];					
			var info1 = info.split('</ul>')[0];
			var was11 = table12.split('>')[2];					
			var was2 = was11.split('<')[0];

//--------------------------------------
var suche = info1.search("ATT:");
if (suche != -1) {
	var att1 = info1.split('ATT:')[1];
	var att = att1.split('</li>')[0];
	}else{
	var att ='-';}
//---------------------------------------
var suche1 = info1.search("DEF:");
if (suche1 != -1) {
	var def1 = info1.split('DEF:')[1];
	var def = def1.split('</li>')[0];
	}else{
	var def ='-';}
//------------------------------------------
var suche1 = info1.search("Geschick:");
if (suche1 != -1) {
	var ges1 = info1.split('Geschick:')[1];
	var ges = ges1.split('</li>')[0];
	}else{
	var ges ='-';}
//-----------------------------------------------------------------------------------------------------
// menue zusammen bau  penner
//-----------------------------------------------------------------------------------------------------

var meinpenner ='<li><a href="/overview/"><img src="http://www.fotos-hochladen.net/meinpennerpqo6mak9.jpg"></a><ul>'
+'<li><a href="/profil/id:'+userid+'/"><span style=\"color:'+SBG+'">Profil Anzeigen</span></a></li>'
+'<li><a href="/awards/"><span style=\"color:'+SBG+'">Auszeichnungen</span></a></li>'
+'<li><a href="/financial/"><span style=\"color:'+SBG+'">Bilanzen</span></a></li>'
+'<li><a href="/change_please/statistics/"><span style=\"color:'+SBG+'">Spenden</span></a></li>'
+'<li><a href="/settings/"><span style=\"color:'+SBG+'">Einstellungen</span></a></li></ul></li>'

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau        kuminikation
//-----------------------------------------------------------------------------------------------------

var kuminikation =''
+'<li><a href="/messages/"><img src="http://www.fotos-hochladen.net/kominikationtmzev826.jpg"></a><ul>'
+'<li><a href="/news/"><span style=\"color:'+SBG+'">News</span></a></li>'
+'<li><a href="http://newboard.pennergame.de/" target="_blank"><span style=\"color:'+SBG+'">Forum (alt)</span></a></li>'
+'<li><a href="http://board.pennergame.de/" target="_blank"><span style=\"color:'+SBG+'">Forum (neu)</span></a></li>'
+'<li><a href="" title="IRC-Chat" target="_blank" onclick="showchat(); return false;"><span style=\"color:'+SBG+'">IRC-Chat</span></a></li>'
+'<li><a href="/support/"><span style=\"color:'+SBG+'">Support</span></a></li>'
+'<li><a href="/messages/"><span style=\"color:'+SBG+'">Mail Eingang</span></a></li>'
+'<li><a href="/messages/out/"><span style=\"color:'+SBG+'">Mail Ausgang</span></a></li>'
+'<li><a href="/friendlist/"><span style=\"color:'+SBG+'">Freundesliste</span></a></li>'
+'<li><a href="/messages/write/"><span style=\"color:'+SBG+'">Mail Verfassen</span></a></li>'
+'<li><a href="http://userscripts.org/users/99502/scripts\" target=\"_blank\"><span style=\"color:'+SBG+'">Userscripts.org(Basti Scripte)</span></a></li></ul></li>';

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau    bande
//-----------------------------------------------------------------------------------------------------

var bande =''
+'<li><a href="/gang/"><img src="http://www.fotos-hochladen.net/bande8eyp5rkm.jpg"></a><ul>'
+'<li><a href="'+gamelink+'/profil/bande:'+bandenid+'/"><span style=\"color:'+SBG+'">Banden Profil</span></a></li>'
+'<li><a href="/gang/memberlist/"><span style=\"color:'+SBG+'">Mitglieder</span></a></li>'
+'<li><a href="/gang/credit/"><span style=\"color:'+SBG+'">Kasse</span></a></li>'
+'<li><a href="/gang/forum/"><span style=\"color:'+SBG+'">Forum</span></a></li>'
+'<li><a href="/gang/pact/"><span style=\"color:'+SBG+'">BND</span></a></li>'
+'<li><a href="/gang/fight/"><span style=\"color:'+SBG+'">K&auml;mpfe</span></a></li>'
+'<li><a href="/gang/fight/fightlog/"><span style=\"color:'+SBG+'">Kampflog</span></a></li>'
+'<li><a href="/gang/upgrades/"><span style=\"color:'+SBG+'">Eigentum</span></a></li>'
+'<li><a href="/gang/stuff/"><span style=\"color:'+SBG+'">Plunderbank</span></a></li>'
+'<li><a href="/gang/stuff/upgrades/"><span style=\"color:'+SBG+'">Upgrades</span></a></li>'
+'<li><a href="/gang/admin/"><span style=\"color:'+SBG+'">(Co-)Admin</span></a></li>'
+'<li><a href="/gang/admin/log/"><span style=\"color:'+SBG+'">Adminlog</span></a></li></ul></li>'

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau   stadt
//-----------------------------------------------------------------------------------------------------
var stadt =''
+'<li><a href = "/city/"><img src="http://www.fotos-hochladen.net/stadt94zvisxt.jpg"></a><ul>'
+'<li><a href="/city/map/"><span style="color:'+SBG+'">Stadtkarte</span></a></li>'
+'<li><a href="/city/district/"><span style="color:'+SBG+'">Stadtteile</span></a></li>'
+'<li><a href="/city/medicine/"><span style="color:'+SBG+'">Apotheke / Medizin</span></a></li>'
+'<li><a href="/city/washhouse/"><span style="color:'+SBG+'">Waschhaus</span></a></li>'
+'<li><a href="/city/home/"><span style="color:'+SBG+'">Eigenheime</span></a></li>'
+'<li><a href="/city/music_store/"><span style="color:'+SBG+'">Musikladen</span></a></li>'
+'<li><a href="/city/games/"><span style="color:'+SBG+'">Gl&uuml;cksspiel</span></a></li>'
+'<li><a href="/city/supermarket/"><span style="color:'+SBG+'">Getr&auml;nke</span></a></li>'
+'<li><a href="/city/supermarket/food/"><span style="color:'+SBG+'">Nahrungsmittel</span></a></li>'
+'<li><a href="/city/weapon_store/"><span style="color:'+SBG+'">Waffen ATT</span></a></li>'
+'<li><a href="/city/weapon_store/def/"><span style="color:'+SBG+'">Waffen DEF</span></a></li>'
+'<li><a href="/city/pet_store/"><span style="color:'+SBG+'">Tierhandlung</span></a></li>'
+'<li><a href="/city/stuff/"><span style="color:'+SBG+'">Zubeh&ouml;r</span></a></li></ul></li>'

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau    inventar
//-----------------------------------------------------------------------------------------------------
var inventar =''
+'<li><a href ="/stock/"><span style="color:'+SchriftBG+'"><b><br>Inventar<br>Plunder<br>Flaschen<br>und co</b></span></a><ul>'
+'<li><a href="/stock/bottle/"><span style="color:'+SBG+'">Pfandflaschen</span></a></li>'
+'<li><a href="/stock/foodstuffs/"><span style="color:'+SBG+'">Getr&auml;nke</span></a></li>'
+'<li><a href="/stock/foodstuffs/food/"><span style="color:'+SBG+'">Nahrungsmittel</span></a></li>'
+'<li><a href="/stock/plunder/"><span style=\"color:'+SBG+'">Plunder</span></a></li>'
+'<li><a href="/stock/plunder/craft/"><span style="color:'+SBG+'">Plunder Basteln</span></a></li>'
+'<li><a href="/stock/ug_plunder/1/"><span style="color:'+SBG+'">Spieler Plunder</span></a></li>'
+'<li><a href="/stock/instruments/"><span style="color:'+SBG+'">Musikinstrument</span></a></li>'
+'<li><a href="/stock/armoury/"><span style="color:'+SBG+'">Waffenkammer</span></a></li></ul></li>'

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau    aktion
//-----------------------------------------------------------------------------------------------------
var aktionen =''
+'<li><a href = "/skills/"><span style=\"color:'+SchriftBG+'\"><br><b>Aktionen<br>Fight<br>sammeln<br>und co</b></span></a><ul>'
+'<li><a href="/fight/overview/"><span style="color:'+SBG+'">K&auml;mpfen</span></a></li>'
+'<li><a href="/fight/list/"><span style="color:'+SBG+'">Kampflog</span></a></li>'
+'<li><a href="/skills/"><span style="color:'+SBG+'">Weiterbilden</span></a></li>'
+'<li><a href="/stock/ug_plunder/create/"><span style="color:'+SBG+'">Plunder erstellen</span></a></li>'
+'<li><a href="/skills/pet/"><span style="color:'+SBG+'">Weiterbilden</span></a></li>'
+'<li><a href="/fight/pet/"><span style="color:'+SBG+'">K&auml;mpfe</span></a></li></ul></li>'

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau  links die man ganz oben selber zu ordnen kann was man haben will
//-----------------------------------------------------------------------------------------------------
var links =''
+'<li><a href ="http://pennerhack.foren-city.de"><img src="http://www.kleingartenverein.at/images/linkphoto_200.jpg" border="0" height="56" width="70"></a><ul>'
+'<li><a href="'+link1+'"><span style="color:'+SBG+'">'+link1+'</span></a></li>'
+'<li><a href="'+link2+'"><span style="color:'+SBG+'">'+link2+'</span></a></li>'
+'<li><a href="'+link3+'"><span style="color:'+SBG+'">'+link3+'</span></a></li>'
+'<li><a href="'+link4+'"><span style="color:'+SBG+'">'+link4+'</span></a></li>'
+'<li><a href="'+link5+'"><span style="color:'+SBG+'">'+link5+'</span></a></li>'
+'<li><a href="'+link6+'"><span style="color:'+SBG+'">'+link6+'</span></a></li>'
+'<li><a href="'+link7+'"><span style="color:'+SBG+'">'+link7+'</span></a></li>'
+'<li><a href="'+link8+'"><span style="color:'+SBG+'">'+link8+'</span></a></li>'
+'<li><a href="'+link9+'"><span style="color:'+SBG+'">'+link9+'</span></a></li>'
+'<li><a href="/friendlist/"><span style="color:'+SBG+'">Freundesliste</span></a></li></ul></li>'

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau   Scripte links mit banne von basti fest gelegt kann man hier aber endern wer es kann und weis wie es geht 
//-----------------------------------------------------------------------------------------------------
var script1 =''
+'<li><a href ="http://pennerhack.foren-city.de"><img src="http://t3.gstatic.com/images?q=tbn:7JgzM5Y-b-gnfM:http://www.javascript4all.de/pics/logo2.jpg" border="0" height="56" width="116"></a><ul>'
+'<li><a  href="http://pennerhack.foren-city.de"><img src=" http://www.fotos-hochladen.net/pennerhack1i8w6onbg.jpg"</a></li>'
+'<li><a  href="http://pennerhack.prm-hosting.de/index.php"><img src=" http://www.fotos-hochladen.net/pennerghack2q917832f.jpg"</a></li>'
+'<li><a  href="http://ego-shooters.net/forum/index.php"><img src="http://i27.tinypic.com/9fmn1y.jpg"</a></li>'
+'<li><a  href="http://thx.spacequadrat.de/index.php"><img src=" http://i29.tinypic.com/ogxu21.jpg"</a></li>'
+'<li><a  href="http://freedombananas.kilu.de/forum/portal.php"><img src=" http://i25.tinypic.com/24q1jqp.jpg"</a></li>'
+'<li><a  href="http://pennergame-tools.de/"><img src="http://i25.tinypic.com/1z2zitd.jpg"</a></li>'
+'<li><a  href="http://www.ic-design.de.tt/"><img src=" http://image-upload.de/image/TeJJ5P/9763686926.png"</a></li>'
+'<li><a  href="http://www.pennergame-fake.de.tl/"><img src=" http://i34.tinypic.com/rm8yrk.jpg"</a></li></ul></li>';

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau fuer alle penner daten abfragen wie geld spenden und lles andere wird hier in einen sogesagten unter menue eingebaut
//-----------------------------------------------------------------------------------------------------
          var ZBerlin = "<li><a href=\"http://www.berlin.pennergame.de\" title=\"nach Berlin\"<span style=\"color:"+SchriftBG+"\"><b>Berlin</b></span></a></li>";
          var ZHamburg = "<li><a href=\"http://www.pennergame.de\" title=\"nach Hamburg\"<span style=\"color:"+SchriftBG+"\"><b>Hamburg</b></span></a></li>";
          var ZBasti = "<li><a target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" title=\"basti homepage\"><span style=\"color:blue\"><b>Basti1012</span></a></li>";
          var ZSpendenstatistik = "<li><a href=\"/change_please/statistics/\"  title=\"Spenden-Statistik\"><span style=\"color:"+SchriftBG+"\"><b>Spenden: </span><span style=\"color:"+SBG+"\"<middle>"+spendenbisher+"</b></middle></span> / "+maxspenden+"</a></li>";
          var ZSauber = "<li><a target=\"_blank\" href=\"/city/washhouse/\" title=\"Spenden-Statistik\"><span style=\"color:"+SchriftBG+"\"><b>Sauber: </span><span style=\"color:"+SBG+"\"<middle>"+clean+"%</b></middle></span></a></li>";
          var ZPromille = '<li><a target=\"_blank\" href="/city/supermarket/" title=\"bier kaufen\"><span style="color:'+SchriftBG+'"><b>Promille: </span><span style="color:'+SBG+'"<middle>'+prom2+'</b></middle></span></a></li>';
          var ZApi = '<li><a target="_blank" href="/profil/id:'+userid+'/" title="penner api"><span style="color:'+SchriftBG+'"><b>Pennerid: </span><span style="color:'+SBG+'"<middle>'+userid+'</b></middle></span></a></li>';
          var ZName = '<li><a href="'+gamelink+'/overview/" ><span style="color:'+SchriftBG+'"><b></span><span style="color:'+SBG+'"<middle>'+Name+'</b></middle></span></a></li>';
          var ZAtt = '<li><a target=\"_blank\" href="'+gamelink+'/fight/overview/" ><span style=\"color:'+SchriftBG+'\"><b>ATT:</span><span style=\"color:'+SBG+'\"<middle>'+att11+'</b></middle></span></a></li>';
          var ZDef = '<li><a target=\"_blank\" href="'+gamelink+'/fight/overview/" ><span style=\"color:'+SchriftBG+'\"><b>DEF:</span><span style=\"color:'+SBG+'\"<middle>'+def11+'</middle></span></a></li>'; 
          var ZBande =  '<li><a target=\"_blank\" href="'+gamelink+'/gang/" ><span style=\"color:'+SchriftBG+'\"><b></span><span style=\"color:'+SBG+'\"<middle>'+bandenname+'</b></middle></span></a></li>';
          var ZPunkte = '<li><a target=\"_blank\" href="'+gamelink+'/overview/" ><span style=\"color:'+SchriftBG+'\"><b>Punkte: </span><span style=\"color:'+SBG+'\"<middle>'+hs2+'</b></middle></span></a></li>';
          var ZAtmin = '<li><a target=\"_blank\" href="'+gamelink+'/fight/overview/" ><span style=\"color:'+SchriftBG+'\"><b>ATT MIN: </span><span style=\"color:'+SBG+'\"<middle>'+attmin+'</b></middle></span></a></li>';
          var ZAtmax = '<li><a target=\"_blank\" href="'+gamelink+'/fight/overview/" ><span style=\"color:'+SchriftBG+'\"><b>ATT MAX: </span><span style=\"color:'+SBG+'\"<middle>'+attmax+'</b></middle></span></a></li>'; 
          var ZPlatz = '<li><a target=\"_blank\" href="'+gamelink+'/fight/overview/" ><span style=\"color:'+SchriftBG+'\"><b>Platz: </span><span style=\"color:'+SBG+'\"<middle>'+platz+'</b></middle></span></a></li>'; 
          var ZGeld = '<li><a target=\"_blank\" href="'+gamelink+'/fight/overview/" ><span style=\"color:'+SchriftBG+'\">GELD:</span><span style=\"color:'+SBG+'\"<middle>'+geld+'</middle></span></a></li>';
          var ZSkill = '<li><a target=\"_blank\" href="'+gamelink+'/fight/pet/" ><span style=\"color:'+SchriftBG+'\"><b>ATT tier: </span><span style=\"color:'+SBG+'\"<middle>'+skill+'</b></middle></span></a></li>';
          var ZSkill1 = '<li><a target=\"_blank\" href="'+gamelink+'/fight/pet/" ><span style=\"color:'+SchriftBG+'\"><b>DEF tier: </span><span style=\"color:'+SBG+'\"<middle>'+skill1+'</b></middle></span></a></li>';
          var ZSkill2 = '<li><a target=\"_blank\" href="'+gamelink+'/fight/pet/" ><span style=\"color:'+SchriftBG+'\"><b>MIT tier: </span><span style=\"color:'+SBG+'\"<middle>'+skill2+'</b></middle></span></a></li>';
          if (kurs <= 1) {
           var ZFlaschen = '<a href="/stock/bottle/" alt="Pfandflaschen" title=\"Pfandflaschen\">Pfandflaschen <small><b>('+kurs+'ct)</b></small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\"'+kurs+'\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value='+maxflaschen+' /><input type=\"submit\" value=\"Verkaufen\"/></form></li>';
          }else {
           var ZFlaschen = '<a href="/stock/bottle/" alt="Pfandflaschen" title=\"Pfandflaschen\"><span style=\"color:'+SchriftBG+'\"><b>Pfandflaschen <small>(<big><span style=\"color:'+SBG+'\"><b>'+kurs+'ct</b></span></big>)</small></a><li><form method=\"post\" action=\"/stock/bottle/sell/\"><input id=\"chkval\" type=\"hidden\" name=\"chkval\" value=\"'+kurs+'\" /><img src=\"http://media.pennergame.de/img/inventar/Pfandflasche.png\" alt=\"Pfandflaschen\" title=\"Pfandflaschen\" /><input id=\"menge_verkauf\" type=\"text\" size=\"1\" name=\"sum\" value='+maxflaschen+' /><input type=\"submit\" value=\"Verkaufen\"/></form></li>';
          } 

//-----------------------------------------------------------------------------------------------------
// menue zusammen bau des oberigen menue in das obemenue also gehoert zu den bereich hier ein rueber
//-----------------------------------------------------------------------------------------------------
var pennerinfo = ''
+'<li><span style=\"color:'+SchriftBG+'\"><br><b>Aktuelle<br>Daten<br>Bande<br>Penner</b></span><ul>'
+'<li><a href="/messages/write/">'+ZBerlin+'</a></li>'
+'<li><a href="/messages/write/">'+ZHamburg+'</a></li>'
+'<li><a href="/messages/write/">'+ZBasti+'</a></li>'
+'<li><a href="/messages/write/">'+ZSpendenstatistik+'</a></li>'
+'<li><a href="/messages/write/">'+ZSauber+'</a></li>'
+'<li><a href="/messages/write/">'+ZPromille+'</a></li>'
+'<li><a href="/messages/write/">'+ZApi+'</a></li>'
+'<li><a href="/messages/write/">'+ZAtt+'</a></li>'
+'<li><a href="/messages/write/">'+ZDef+'</a></li>'
+'<li><a href="/messages/write/">'+ZBande+'</a></li>'
+'<li><a href="/messages/write/">'+ZPunkte+'</a></li>'
+'<li><a href="/messages/write/">'+ZAtmin+'</a></li>'
+'<li><a href="/messages/write/">'+ZAtmax+'</a></li>'
+'<li><a href="/messages/write/">'+ZPlatz+'</a></li>'
+'<li><a href="/messages/write/">'+ZGeld+'</a></li>'
+'<li><a href="/messages/write/">'+ZSkill+'</a></li>'
+'<li><a href="/messages/write/">'+ZSkill1+'</a></li>'
+'<li><a href="/messages/write/">'+ZSkill2+'</a></li></ul></li>';

//-----------------------------------------------------------------------------
// hier wird die aktuelle zeit und datum ermitelt
//-----------------------------------------------------------------------------------------------------

var jetzta = new Date();
var Stundea = jetzta.getHours();
var StundeAa = ((Stundea < 10) ? "0" + Stundea : Stundea);
var Minutena = jetzta.getMinutes();
var MinutenAa = ((Minutena < 10) ? "0" + Minutena : Minutena);
var Seka = jetzta.getSeconds();
var SekAa = ((Seka < 10) ? "0" + Seka : Seka);
var uhr = '<font style=\"color:green; font-size:100%;\">'+ges4+'</font><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font style=\"color:black; font-size:150%;\">'+StundeAa+':'+MinutenAa+':'+SekAa+'';

var jetzt = new Date();
var Jahr = jetzt.getFullYear();
var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);
var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);

//---------------------------------------------------------------------------------------------------
// hier wird das menue plunder und co usammen gebaut 
//-----------------------------------------------------------------------------------------------------
var plunderinfo = ''
+'<li><a href="/stock/"><span style="color:'+SchriftBG+'"><b><br>Plunder<br> TIER <br>UND<br> CO INDOS<br></b></span> </a><ul>'
+'<li><a href="/messages/write/"><span style="color:'+SchriftBG+'"><b>Geld :					</span><span style=\"color:'+SBG+'\"<middle> '+cash+'	&euro;		</span></a></li>'
+'<li><a href="/stock/bottlechart/"><span style="color:'+SchriftBG+'"><b>Kurs : 				</span><span style=\"color:'+SBG+'\"<middle>'+kurs+'	Cent		</span></a></li>'
+'<li><a href="/stock/bottle/"><span style="color:'+SchriftBG+'"><b>Flaschen :				</span><span style=\"color:'+SBG+'\"<middle> '+flascheninventar+'	</span></a></li>'
+'<li><a href="/stock/bottle/"><span style="color:'+SchriftBG+'"><b>Flaschen zum schloss : 			</span><span style=\"color:'+SBG+'\"<middle>'+restflaschen+'		</span></a></li>'
+'<li><a href="/stock/bottle/"><span style="color:'+SchriftBG+'"><b>Flaschen geld aus inventar :		</span><span style=\"color:'+SBG+'\"<middle> '+flaschenergebniss+'	</span></a></li>'
+'<li><a href="/stock/bottle/"><span style="color:'+SchriftBG+'"><b>Rest geld zum schloss : 			</span><span style=\"color:'+SBG+'\"<middle>'+rest_geld+' &euro;	</span></a></li>'
+'<li><a href="/stock/plunder/"><span style="color:'+SchriftBG+'"><b>Angelegter Plunder : 			</span><span style=\"color:'+SBG+'\"<middle>'+was2+'			</span></a></li>'
+'<li><a href="/stock/plunder/"><span style="color:'+SchriftBG+'"><b>Bild Plunder : 				</span><span style=\"color:'+SBG+'\"<middle><img src="'+table14+'" border="0" height="33" width="33"></span></a></li>'
+'<li><a href="/stock/plunder/"><span style="color:'+SchriftBG+'"><b>Att Plunder : 				</span><span style=\"color:'+SBG+'\"<middle>'+att+'			</span></a></li>'
+'<li><a href="/stock/plunder/"><span style="color:'+SchriftBG+'"><b>Def Plunder : 				</span><span style=\"color:'+SBG+'\"<middle>'+def+'			</span></a></li>'
+'<li><a href="/stock/plunder/"><span style="color:'+SchriftBG+'"><b>Ges Plunder : 				</span><span style=\"color:'+SBG+'\"<middle>'+ges+'			</span></a></li>'

+'<li><a href ="http://pennerhack.foren-city.de"><img src="http://www.kleingartenverein.at/images/linkphoto_200.jpg" border="0" height="56" width="70"></a></li>'
+'<li><a href="/stock/bottlechart/"><img src="http://media.pennergame.de/cache/bottlechart/'+TagA+'_'+MonatA+'_'+Jahr+'_'+medialink+'.png" border="0" height="356" width="556"></a></li>'
+'</ul></li>';

// ------------------------- post warner mit anzahl popst -------------------------------

GM_xmlhttpRequest({
            method: 'GET',
            url: ''+gamelink+'/overview/',
                onload: function( response ) {
                var content = response.responseText;
		try{
			var text1 = content.split('Dein Penner')[1];
			var userid = text1.split('Sauberkeit:')[0];
			var userp = userid.split('[')[1];
			var posta = userp.split(']')[0];

			var	soundSrc, playerSrc;
				soundSrc = "http://chargraph.com/josh/timer/notify.mp3";
				playerSrc = "http://www.infowars.com/mediaplayer.swf";

   			 var player = document.createElement('embed');
  			 player.src = playerSrc;
  			 player.setAttribute("style", "visibility:hidden;");
  			 player.setAttribute('id', 'timer_sound');
  			 player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
  			 document.body.appendChild(player);

var post1 ='<li><a href="'+gamelink+'/messages/"><img src="http://media.pennergame.de/img/overview/new_msg.gif" border="0" height="56" width="56"></a><ul>'
+'<li><a  href="/messages/write/"><span style="color:'+SchriftBG+'"><b>Du hast '+posta+'<br>Neue Nachrichten</b></span></a></li></ul></li>';

}catch(e){
var post1 = 'Post warner aktiv';
}
GM_setValue("post1", post1);
}});

//-----------------------------------------------------------------------------------------------------

// --------    angriffswarner fuer berlin und hamburg --------------------
// ------------------------------------------------------------
GM_xmlhttpRequest({
        method: 'GET',
        url: ''+gamelink+'/fight/overview/',
		onload: function(responseDetails) {
		var content = responseDetails.responseText;

			if(content.match(/warning/)){
           		 	var part = content.split("warning")[1].split("<td>")[1];
           		 	var TimeOfImpact = part.split("</td>")[0];

				
  						var allincoming = incoming1.split('</table>')[0];
 					 	var anzahl = allincoming.split('<tr').length-1;	
 					 	var id1 = allincoming.split('<a href="/profil/id:')[1]							
 						var id2 = id1.split('/')[0];

var fighter ='<li><br><a href="'+gamelink+'/messages/">Vorsicht Angriff</a><ul>'
+'<li><a  href="/messages/write/"><span style="color:'+SchriftBG+'">'
+'<b>Du hast '+anzahl+' eingeenden Fights</b><br>'
+'<b>Von Penner id : '+id2+'</b><br>'
+'<b>Der Fight ende um '+TimeOfImpact+'<br>'
+'</span></a></li></ul></li>';

		GM_setValue("fighter", fighter);

}
		var fighter ='<br><font style=\"color:blue; font-size:80%;\">Angrifs warner aktiv</font> ';
		GM_setValue("fighter", fighter);

	}
});

//-----------------------------------------------------------------------------------------------------
// --- gespeicherte daten von angriff und post wieder abrufen -----------------------------------------
// ----------------------------------------------------------------------------------------------------
var post = GM_getValue("post1");
var fighter = GM_getValue("fighter");

// ----------------------------------------------------------------------------------------------------


var TopMenueDiv = document.createElement('div');
document.body.appendChild(TopMenueDiv);
TopMenueDiv.innerHTML = '<div id=\"TopMenueDiv\"><span name=\"TopMenue\">'
+'<div id=\"Rahmen1\"><ul id=\"Navigation1\">'
+''+meinpenner+kuminikation+bande+stadt+inventar+aktionen+pennerinfo+plunderinfo+links+script1+post+uhr+fighter+''
+'</div></ul></span></div>';

}});
}});
}});
}});
}});
}});


//function reloderanzeige(uhr){
//}
//function immer_aktuelle_zeit(){
//reloderanzeige(uhr);
//}
//window.setInterval(immer_aktuelle_zeit, 10000);
//window.setInterval(uhr, 1000);
// bei wiwu verlinken zu flaschen ve3rkauf
// angriffsdwarner



