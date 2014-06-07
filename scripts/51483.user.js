// ==UserScript==
// @name Pennergame  Fernsteuerung fuer pennergame alles bedinen von einer Seite aus alle games 1.1.8 Version
// @namespace        basti1012  http://pennergame-basti1012.foren-city.de
// @description      Fuegt ein menue im game ein womit man nahrung kaufen kann zu sich einnehmen lkann und andere dinge allees von einer seite aus ohne seiten wechseln man bleibt da wo man ist
// @include          *pennergame.de*
// @include          *menelgame.pl*
// @include          *dossergame.co.uk*
// @include          *berlin.pennergame.de*
// @exclude          http://*newboard.pennergame.de*
// ==/UserScript==
//###########mennue inhalt buttons mit funktionen zusammen bauen##########################################################
//############# Einlogdaten #######################################
var pass = 'passwort';
var name = 'basti1012held';
//#############einloggen hamburg######################################
var pass1 = 'passwort';
var name1 = 'pennerhackbasti1012';
//####################einloggen menelgame##############################
var pass2 = 'passwort';
var name2 = 'pennerhackbasti1012';
//##########################einloggen dossergame#########################
var pass3 = 'passwort';
var name3 = 'pennerhackbasti1012';
//####################### einzahlungs komentarr der bandenkase  ###################################
var kommi = 'Eingezahlt durch bastis Fehrnsteuerungsscript';
//############################ menue farbe und possitsionen  ########################################


var Lire = 'left';     // Rechts link von den menue
var obenj = '80';      // abstand von oben
var liks = '10';       // abstand von der seite
var traz = '0.8';      // transparens bitte zwischen 0.4 und 2.0 bleiben untenr o.4 sieht man es fast nicht mehr
var farbe = '#2D2D2D'; // Farbe des menues
var bod = '10';        // Border breite
var bodf = '#6C6D54';  // Border farbe
var rad = '1';         // Runde kanten
var aa = 'green';      // Farbe der schrift DDeaktiviert 
//###################################################################################################
//###################################################################################################
//AB HIERT NIX MEHR ENDERN NUR WENN MAN SICH DAMIT AUSKENNEN TUT#####################################
//##############Ab hier ist Copiryght By Basti1012###################################################
//###################################################################################################

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var town = 'berlin.pennergame.de';
var bott = ' Pfandflaschen';
var test = 'username='+name+'&password='+pass+'&login_city=http%3A%2F%2Fberlin.pennergame.de%2Flogin%2Fcheck%2F&submitForm=Login';
var pgurl = 'http://berlin.pennergame.de/';
var ali = 'Du hast dich gerade mit den \nNamen  '+name+' und deinen \n Passwort '+pass+' \n in der Stadt '+pgurl+' eingeloggt \n Mfg basti1012';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var town = 'pennergame.de';
var bott = ' Pfandflaschen';
var test = 'username='+name1+'&password='+pass1+'&login_city=http%3A%2F%2Fpennergame.de%2Flogin%2Fcheck%2F&submitForm=Login';
var pgurl = 'http://www.pennergame.de/';
var ali = 'Du hast dich gerade mit den \nNamen  '+name1+' und deinen \n Passwort '+pass1+' \n in der Stadt '+pgurl+' eingeloggt \n Mfg basti1012';
}

else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var town = 'menelgame.pl';
var bott = ' Fanty';
//var test = 'username='+name2+'&password='+pass2+'&login_city=http%3A%2F%2Fmenelgame.pl%2Flogin%2Fcheck%2F&submitForm=Login';
var test = 'username='+name2+'&password='+pass2+'';

var pgurl = 'http://menelgame.pl/';
var ali = 'Du hast dich gerade mit den \nNamen  '+name2+' und deinen \n Passwort '+pass2+' \n in der Stadt '+pgurl+' eingeloggt \n Mfg basti1012';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var town = 'dossergame.co.uk';
var bott = ' Junk';
var test = 'username='+name3+'&password='+pass3+'&login_city=http%3A%2F%2Fdossergame.co.uk%2Flogin%2Fcheck%2F&submitForm=Login';
var pgurl = 'http://dossergame.co.uk/';
var ali = 'Du hast dich gerade mit den \nNamen  '+name3+' und deinen \n Passwort '+pass3+' \n in der Stadt '+pgurl+' eingeloggt \n Mfg basti1012';
};

var Ctampon = '<li target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" title=\"basti homepage\"><span style=\"font-size:18px;color:red\"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Essen/Trinken</br></span>";';

var CBier = '<li href="/stock/">&nbsp;&nbsp;<img src="http://www.fotos-hochladen.net/animatedfavicon1gi6brz0i1l.gif" alt="Bier" title="Bier kaufen gehen menge eingeben und klick und fertig" />&nbsp;&nbsp;<input id="ExtraMenueBierMenge" type="text" size="1" name="ExtraMenueBierMenge" value="1" /><input id="ExtraMenueBierTrinken" type="button" name="ExtraMenueBierTrinken" value="&nbsp;&nbsp;&nbsp;&nbsp;Bier&nbsp;&nbsp;"/></li>';
var CWein = '<li href="/stock/">&nbsp;&nbsp;<img src="http://tbn3.google.com/images?q=tbn:lThLPUP0jucSFM:http://www.dth-live.de/pix/logo_ml.jpg" alt="xm_drink" title="gluehwein kaufen gehen  aqchtuung der kauf von gluewein ist nur zur weinachtszeit legeal" />&nbsp;&nbsp;<input id="ExtraMenueWeinMenge" type="text" size="1" name="ExtraMenueWeinMenge" value="1"/><input id="ExtraMenueWeinTrinken" type="button" name="ExtraMenueWeinTrinken" value="G-Wein"/></li>';
var CWodka = '<li href="/stock/">&nbsp;&nbsp;<img src="http://www.online-marketing-forum.at/files/animated_favicon.gif" alt="Wodka" title="einfach die menge eingeben wie viel der Penner trinken soll ich empfehele nie mehr als ein weil sonst kriegst du eine alkohol vergiftung" />&nbsp;&nbsp;<input id="ExtraMenueWodkaMenge" type="text" size="1" name="ExtraMenueWodkaMenge" value="1" /><input id="ExtraMenueWodkaTrinken" type="button" name="ExtraMenueWodkaTrinken" value="&nbsp;wodka "/></li>';
var CBrot = '<li href="/stock/foodstuffs/food/">&nbsp;&nbsp;<img src="http://tbn0.google.com/images?q=tbn:J8rIfhtKm_huBM:http://www.goldensun-zone.de/goldensun/bilder/Brot.gif" alt="Brot" title="Einfach die Menge eingeben wie viel Brot der Penner essen soll" />&nbsp;&nbsp;<input id="ExtraMenueBrotMenge" type="text" size="1" name="ExtraMenueBrotMenge" value="1" /><input id="ExtraMenueBrotEssen" name="ExtraMenueBrotEssen" type="button" value="brot eat" /></li>';
var CCurrywurst = '<li href="/stock/foodstuffs/food/">&nbsp;&nbsp;<img src="http://media.pennergame.de/img/inventar/Currywurst.png" alt="Currywurst" title="einfach die zahl eingeben wie viel Currywurst der penner essen soll" />&nbsp;&nbsp;<input id="ExtraMenueCurrywurstMenge" type="text" size="1" name="ExtraMenueCurrywurstMenge" value="1"/><input id="ExtraMenueCurrywurstEssen" name="ExtraMenueCurrywurstEssen" type="button" value="C-Wurst"/></li>';
var CHamburger = '<li href="/stock/foodstuffs/food/">&nbsp;&nbsp;<img src="http://tbn0.google.com/images?q=tbn:_-44Wo0B1LyfCM:http://www.dealuna.ch/wp-content/plugins/smilies-themer/adiumicons/hamburger.png" alt="Currywurst" title="einfach die Zahl eingeben wie viel Hamburger der penner essen soll" />&nbsp;&nbsp;<input id="ExtraMenueHamburgerMenge" type="text" size="1" name="ExtraMenueHamburgerMenge" value="1"/><input id="ExtraMenueHamburgerEssen" name="ExtraMenueHamburgerEssen" type="button" value="hambur"/></li>';

var Btampon1 = '<li target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" title=\"basti homepage\"><span style=\"font-size:18px;color:red\"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Einkaufen</br></span>";';

var BBier1 = '<li href="/stock/">&nbsp;<img src="http://media.pennergame.de/img/inventar/Bier.png" alt="Bier" title="Bier kaufen gehen menge eingeben und klick und fertig" />&nbsp;&nbsp;<input id="ExtraMenueBierMengea" type="text" size="1" name="ExtraMenueBierMengea" value="1" /><input id="ExtraMenueBierTrinkena" type="button" name="ExtraMenueBierTrinkena" value="&nbsp;&nbsp;Bier&nbsp;&nbsp;&nbsp;"/></li>';
var BWein1 = '<li href="/stock/">&nbsp;<img src="http://media.pennergame.de/img/inventar/Wodka.png" alt="xm_drink" title="gluehwein kaufen gehen  aqchtuung der kauf von gluewein ist nur zur weinachtszeit legeal" />&nbsp;&nbsp;<input id="ExtraMenueWeinMengea" type="text" size="1" name="ExtraMenueWeinMengea" value="1"/><input id="ExtraMenueWeinTrinkena" type="button" name="ExtraMenueWeinTrinkena" value="G-Wein"/></li>';
var BWodka1 = '<li href="/stock/">&nbsp;<img src="http://media.pennergame.de/img/inventar/Wodka.png" alt="Wodka" title="einfach die menge eingeben wie viel der Penner kaufenn soll " />&nbsp;&nbsp;<input id="ExtraMenueWodkaMengea" type="text" size="1" name="ExtraMenueWodkaMengea" value="1" /><input id="ExtraMenueWodkaTrinkena" type="button" name="ExtraMenueWodkaTrinkena" value="&nbsp;wodka "/></li>';
var BBrot1 = '<li href="/stock/foodstuffs/food/">&nbsp;&nbsp;<img src="http://media.pennergame.de/img/inventar/Brot.png" alt="Brot" title="Einfach die Menge eingeben wie viel Brot der Pennerkaufen soll" />&nbsp;&nbsp;<input id="ExtraMenueBrotMengea" type="text" size="1" name="ExtraMenueBrotMengea" value="1" /><input id="ExtraMenueBrotEssena" name="ExtraMenueBrotEssena" type="button" value="&nbsp;&nbsp;&nbsp;brot&nbsp;" /></li>';
var BCurrywurst1 = '<li href="/stock/foodstuffs/food/">&nbsp;&nbsp;<img src="http://media.pennergame.de/img/inventar/Currywurst.png" alt="Currywurst" title="einfach die zahl eingeben wie viel Currywurst der penner kaufen soll" />&nbsp;&nbsp;<input id="ExtraMenueCurrywurstMengea" type="text" size="1" name="ExtraMenueCurrywurstMengea" value="1"/><input id="ExtraMenueCurrywurstEssena" name="ExtraMenueCurrywurstEssena" type="button" value="C-Wurst"/></li>';
var BHamburger1 = '<li href="/stock/foodstuffs/food/">&nbsp;&nbsp;<img src="http://media.pennergame.de/img/inventar/Currywurst.png" alt="Currywurst" title="einfach die Zahl eingeben wie viel Hamburger der penner kaufen soll" />&nbsp;&nbsp;<input id="ExtraMenueHamburgerMengea" type="text" size="1" name="ExtraMenueHamburgerMengea" value="1"/><input id="ExtraMenueHamburgerEssena" name="ExtraMenueHamburgerEssena" type="button" value="&nbsp;Burger"/></li>';

var Ctampon = '<li target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" title=\"basti homepage \">&nbsp;&nbsp;<span style=\"font-size:18px;color:red\"><b>&nbsp;&nbsp;&nbsp;&nbsp;Sonstiges</br></span>";';

var CWaschen6 = '<li href="/city/washhouse/">&nbsp;&nbsp;<img src="http://img3.abload.de/img/schwamve0k.png" title="Beim klick des 6 euro Wasch buttons geht wird der penner f?r 10 prozent gewaschen"width="16" height="16">&nbsp;&nbsp;<input type="button" Name="ExtraMenue6Waschen" value="&nbsp;&nbsp;&nbsp;F&uuml;r&nbsp;&nbsp;&nbsp;6,00&nbsp;&euro;&nbsp;&nbsp;&nbsp;&nbsp;"/></li>';
var CWaschen25 = '<li href="/city/washhouse/">&nbsp;&nbsp;<img src="http://img3.abload.de/img/schwamve0k.png" title="Beim klick des 25 euro Wasch buttons geht wird der penner f?r 100 prozent gewaschen" width="16" height="16">&nbsp;&nbsp;<input class="formbutton" type="button" name="ExtraMenue25Waschen" value="&nbsp;&nbsp;F&uuml;r&nbsp;&nbsp;&nbsp;25,00&nbsp;&euro;&nbsp;&nbsp;&nbsp;"></li>';
var CKasse = '<li href="/gang/credit/">&nbsp;&nbsp;<img src="http://media.pennergame.de/de/img/cash.png" title="Hier einfach deen Betarg eingeben den du in der Bandenkasse einzahlen m?chtest" >&nbsp;<input name="ExtraMenueKasseMoney" type="text" id="ExtraMenueKasseMoney" size="2"><input type="button" name="ExtraMenueKasseeinzahlen" value="&nbsp;&nbsp;Kasse&nbsp;&nbsp;"></li>';
var CSuchen = '<li><form method=\"GET\" action=\"/highscore/search/\">&nbsp;<img src=\"http://tbn3.google.com/images?q=tbn:KYzXRezQGZsKgM:http://www.paul-chen-swords.com/images/icons/search.gif\" titel=\"Gib hier in den Feld den Spieler Namen an den du suchen m?chtest du wirst dann zur suche weiter geleitet mit den gefundenen Spieler\" alt=\"user\">&nbsp;&nbsp;&nbsp;<input name=\"name\" type=\"text\" size=\"2\"><input class=\"formbutton\" type=\"submit\" value=\"&nbsp;Suchen\"></form></li>';
var CLogout = '<li href="/logout/">&nbsp;&nbsp;<img src="http://tbn1.google.com/images?q=tbn:aPM5ouDOuR4JgM:http://www.projekt-deutsch.de/templates/cback/images/logout.png" title="Einfach klicken und ausloggen egal wo man gerade ist "width="16" height="16">&nbsp;&nbsp;<input type="button" name="Logoutin" value="Logout"><input type="button" name="Loginin" value="Login"></li>';
var CFlaschen = '<li href="/stock/bottle/">&nbsp;&nbsp;<img src="http://media.pennergame.de/img/inventar/Pfandflasche.png" title="Hier einfach die menge der zu verkaufene flaschen eingeben" >&nbsp;<input name="ExtraMenueflaschenin" type="text"id="ExtraMenueflaschenin" size="1"><input type="button" name="ExtraMenueflaschen" value="Flaschen"></li>';
var CLose = '<li href="/stock/bottle/">&nbsp;&nbsp;<img src="http://tbn1.google.com/images?q=tbn:4_ilVNS1lIoHkM:http://www.oktoberfest.de/images/content/02/glueck_icon.gif" title="Hier eine zahl zwischeen 1 und 10 eingeben und er kauft automatisch die lose" >&nbsp;&nbsp;<input name="ExtraMenueLoseina" type="text" id="ExtraMenueLoseina" size="1"><input type="button" name="ExtraMenueLosea" value="&nbsp;&nbsp;&nbsp;Lose&nbsp;&nbsp;&nbsp;"></li>';

var einstellungen = '<li target=\"_blank\" href=\"http://pennerhack.foren-city.de/\" title=\"basti homepage \">&nbsp;&nbsp;<span style=\"font-size:12px;color:"+aa+"\"><b>&nbsp;&nbsp;&nbsp;&nbsp;einstellungen</br></span>";';
var Linkkette =  Ctampon + CBier + CWein + CWodka + CBrot + CCurrywurst + CHamburger +  Btampon1 + BBier1 + BWein1 + BWodka1 + BBrot1 + BCurrywurst1 + BHamburger1 + Ctampon + CKasse + CSuchen + CWaschen25 + CWaschen6  + CFlaschen + CLose  + einstellungen + CLogout ;
// Men? eingef?gt
//document.getElementById("footer").innerHTML += "<span name=\"Menue\" style=\"width: 200px; position:absolute;top:80px;left:10px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:2px solid red; background-color:blue\"><div class=\"content\" style=\"padding-top:0px\"><ul>"+Linkkette+"</ul></div></span>";
document.getElementById("footer").innerHTML += "<span name=\"Menue\" style=\"width: 200px; position:absolute;top:"+obenj+"px;"+Lire+":"+liks+"px;font-size:x-small;-moz-border-radius:"+rad+"px;-moz-opacity:"+traz+";opacity:"+traz+";border:"+bod+"px solid "+bodf+"; background-color:"+farbe+"\"><div class=\"content\" style=\"padding-top:0px\"><ul>"+Linkkette+"</ul></div></span>";

//##################################################################################
//#####################menue bildung##############################################
//---------------- Wenn Logout geklickt wurde---------------------
//POST /login/check/ username=basti1012held&password=331100&login_city=http%3A%2F%2Fberlin.pennergame.de%2Flogin%2Fcheck%2F&submitForm=Login
//username='+name+'&password='+pass+'&login_city=http%3A%2F%2F'+town+'%2Flogin%2Fcheck%2F&submitForm=Login
//POST //login/check/ username=pennerhackbasti1012d&password=331100&login_city=http%253A%252F%252Fpennergame.de%252Flogin%252Fcheck%252F&submitForm=Login

{
document.getElementsByName('Logoutin')[0].addEventListener('click', function auslogge () 
{
document.getElementsByName('Logoutin')[0].disabled= "disabled";
 
GM_xmlhttpRequest(
{
method: 'GET',
url: ''+pgurl+'/logout/',
onload: function(responseDetails) 
{
var content = responseDetails.responseText;

	  { 
		 window.location.reload();alert ("Du hast dich gerade ausgeloggt\n Mfg basti1012");
      }}
  });

},false);};

//#################Wenn login geklickt wurde #################################################
{
document.getElementsByName('Loginin')[0].addEventListener('click', function einloggen () 
{
document.getElementsByName('Loginin')[0].disabled= "disabled";
 
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/login/check/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI(""+test+""),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert (""+ali+"");
      }
  });

},false);};


//POST //login/check/ username=pennerhachbasti1012&password=331100&login_city=http%253A%252F%252Fmenelgame.pl%252Flogin%252Fcheck%252F&submitForm=Login







//###########################Wenn bier trinken geklickt wurde #######################################
{
document.getElementsByName('ExtraMenueBierTrinken')[0].addEventListener('click', function biertrinken () 
{
document.getElementsByName('ExtraMenueBierTrinken')[0].disabled= "disabled";

var BierMenge = document.getElementById('ExtraMenueBierMenge').value;
bie = Math.round((BierMenge*0.80)*100)/100  
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Bier&promille=35&id=1&menge='+BierMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert ("Du hast gerade durch Bier saufen "+bie+" Promille zu dir genommen\nGuten durst dabei mfg basti1012");
      }
  });

},false);};
//#######################Wenn Wein trinken geklickt wurde############################################
{
document.getElementsByName('ExtraMenueWeinTrinken')[0].addEventListener('click', function weintrinken () 
{
document.getElementsByName('ExtraMenueWeinTrinken')[0].disabled= "disabled";

var WeinMenge = document.getElementById('ExtraMenueWeinMenge').value;
wei = Math.round((WeinMenge*2.00)*100)/100
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=xm_drink&promille=80&id=10&menge='+WeinMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();;alert ("du hast gerade durch Wein saufen "+wei+" Promille zu dir genommen\nGuten durst dabei mfg basti1012");
      }
  });

},false);};
//#########################Wenn Wodka trinken geklickt wurde##########################################
{
document.getElementsByName('ExtraMenueWodkaTrinken')[0].addEventListener('click', function wodkatrinken () 
{
document.getElementsByName('ExtraMenueWodkaTrinken')[0].disabled= "disabled";

var WodkaMenge = document.getElementById('ExtraMenueWodkaMenge').value;
wod = Math.round((WodkaMenge*2.50)*100)/100
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Wodka&promille=250&id=7&menge='+WodkaMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();;alert ("Du hast gerade durch Wodka saufen "+wod+" Promille zu dir genommen\nGuten durst dabei mfg basti1012");
      }
  });

},false);};
//####################Wenn Brot essen geklickt wurde#################################################
{
document.getElementsByName('ExtraMenueBrotEssen')[0].addEventListener('click', function brotessen () 
{
document.getElementsByName('ExtraMenueBrotEssen')[0].disabled= "disabled";

var BrotMenge = document.getElementById('ExtraMenueBrotMenge').value;
bro = Math.round((BrotMenge*0.35)*100)/100
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Brot&promille=-35&id=2&menge='+BrotMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();;alert ("Du hast gerade durch Brot essen  "+bro+" Promille abgebaut\nGuten hunger dabei mfg basti1012");
      }
  });

},false);};
//######################Wenn Currywurst essen geklickt wurde#######################################
{
document.getElementsByName('ExtraMenueCurrywurstEssen')[0].addEventListener('click', function currywursessen () 
{
document.getElementsByName('ExtraMenueCurrywurstEssen')[0].disabled= "disabled";

var CurrywurstMenge = document.getElementById('ExtraMenueCurrywurstMenge').value;
cur = Math.round((CurrywurstMenge*1.00)*100)/100
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Currywurst&promille=-100&id=3&menge='+CurrywurstMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();;alert ("Du hast gerade durch Currywurst essen "+cur+" Promille abgebaut\nGuten hunger dabei mfg basti1012");
      }
  });

},false);};
//##########################Wenn Hamburger essen geklickt wurde#####################################
{
document.getElementsByName('ExtraMenueHamburgerEssen')[0].addEventListener('click', function hamburgeressen () 
{
document.getElementsByName('ExtraMenueHamburgerEssen')[0].disabled= "disabled";

var HamburgerMenge = document.getElementById('ExtraMenueHamburgerMenge').value;
ham = Math.round((HamburgerMenge*2.00)*100)/100
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Hamburger&promille=-200&id=4&menge='+HamburgerMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();;alert ("Du hast gerade durch Hamburger essen "+ham+" Promille abgebaut\nGuten hunger dabei\n mfg basti1012");
      }
  });

},false);};
//###########################################################################essen und trinken zu ende#############################################################################################################
//-------------- Wenn bier kaufen geklickt wurde----------name=andname value and name ------------------
//POST /city/supermarket/buy/ menge=100&id=1&cat=1&preis=0.85&preis_cent=85&inventar_name=bier&submitForm=F%C3%BCr+%E2%82%AC85.00+kaufen
//POST /city/supermarket/buy/ menge=%22+BierMengea+%22&id=1&cat=1&preis=0.85&preis_cent=85&inventar_name=bier&submitForm=F%25C3%25BCr+%25E2%2582%25AC%22+biereg+%22+kaufen

{
document.getElementsByName('ExtraMenueBierTrinkena')[0].addEventListener('click', function bierkaufen () 
{
document.getElementsByName('ExtraMenueBierTrinkena')[0].disabled= "disabled";

var BierMengea = document.getElementById('ExtraMenueBierMengea').value;
biereg = Math.round((BierMengea*0.85)*100)/100      //Bier gesamt breiss ausrechen

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+BierMengea+'&id=1&cat=1&preis=0.85&preis_cent=85&inventar_name=bier&submitForm=F%C3%BCr+%E2%82%AC'+biereg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du hast gerade insgesamt  "+biereg+"  Euro Für Bier ausgegeben\nViel spass beim saufen mfg basti1012");
      }
  });

},false);};
//################################wein kaufen gehen###############################################################

{
document.getElementsByName('ExtraMenueWeinTrinkena')[0].addEventListener('click', function weinkaufen () 
{
document.getElementsByName('ExtraMenueWeinTrinkena')[0].disabled= "disabled";

var WeinMengea = document.getElementById('ExtraMenueWeinMengea').value;
weineg = Math.round((WeinMengea*2.00)*100)/100    //Wein menge geld insgesamt
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+WeinMengea+'&id=10&cat=1&preis=2.00&preis_cent=200&inventar_name=gleuhwein&submitForm=F%C3%BCr+%E2%82%AC'+weineg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du hast gerade insgesamt "+weineg+" euro Für Wein ausgegeben\n Bitte ran denken Wein darf man nur zu Weihnachten hin kaufen,sonst ist nur der verzehr erlaubt mfg basti1012");
      }
  });

},false);};
// #####################################wodka kaufen gehen ###########################################################
//POST /city/supermarket/buy/ menge=11&id=7&cat=1&preis=10.00&preis_cent=1000&inventar_name=wodka&submitForm=F%C3%BCr+%E2%82%AC110.00+kaufen

{
document.getElementsByName('ExtraMenueWodkaTrinkena')[0].addEventListener('click', function wodkakaufen () 
{
document.getElementsByName('ExtraMenueWodkaTrinkena')[0].disabled= "disabled";

var WodkaMengea = document.getElementById('ExtraMenueWodkaMengea').value;
wodkaeg = Math.round((WodkaMengea*10.00)*100)/100    //Wodka menge geld insgesamt
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+WodkaMengea+'&id=7&cat=1&preis=10.00&preis_cent=1000&inventar_name=wodka&submitForm=F%C3%BCr+%E2%82%AC'+wodkaeg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du hast gerade insgesamt "+wodkaeg+" euro Für Wodka ausgegeben\nDenk dran nicht zu vieel saufen sonst musst du Magen auspunpen gehen Mfg Basti1012");
      }
  });

},false);};
//##################################brot esse gehen ###################################################
//POST /city/supermarket/buy/ menge=111&id=2&cat=2&preis=1.70&preis_cent=170&inventar_name=brot&submitForm=F%C3%BCr+%E2%82%AC188.70+kaufen
//
{
document.getElementsByName('ExtraMenueBrotEssena')[0].addEventListener('click', function brotkaufen () 
{
document.getElementsByName('ExtraMenueBrotEssena')[0].disabled= "disabled";

var BrotMengea = document.getElementById('ExtraMenueBrotMengea').value;
biereg = Math.round((BrotMengea*1.70)*100)/100    //Wodka menge geld insgesamt
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+BrotMengea+'&id=2&cat=2&preis=1.70&preis_cent=170&inventar_name=brot&submitForm=F%C3%BCr+%E2%82%AC'+biereg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du haast gerade für "+biereg+" Euro Brot gekauft viel spass beim fressen\nGuten Hunger chau Basti1012");
      }
  });

},false);};

//#############################curywurst einkaufen gehen ############################################
//POST /city/supermarket/buy/ menge=111&id=3&cat=2&preis=3.50&preis_cent=350&inventar_name=currywurst&submitForm=F%C3%BCr+%E2%82%AC388.50+kaufen

{
document.getElementsByName('ExtraMenueCurrywurstEssena')[0].addEventListener('click', function currywurstkaufen () 
{
document.getElementsByName('ExtraMenueCurrywurstEssena')[0].disabled= "disabled";

var CurrywurstMengea = document.getElementById('ExtraMenueCurrywurstMengea').value;
curryeg = Math.round((CurrywurstMengea*3.50)*100)/100    //Currywurst menge geld insgesamt
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+CurrywurstMengea+'&id=3&cat=2&preis=3.50&preis_cent=350&inventar_name=currywurst&submitForm=F%C3%BCr+%E2%82%AC'+curryeg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du hast gerade für "+curryeg+" Euro Currywurst gekauft \nIch gehe lieber bei MC donals essen als so ne currywurst \nGuten Hunger chau Basti1012");
      }
  });

},false);};

//###########################hamburger einkaufenn gehen ####################################################
//POST /city/supermarket/buy/ menge=111&id=4&cat=2&preis=5.00&preis_cent=500&inventar_name=hamburger&submitForm=F%C3%BCr+%E2%82%AC555.00+kaufen

{
document.getElementsByName('ExtraMenueHamburgerEssena')[0].addEventListener('click', function hamburgerkaufen () 
{
document.getElementsByName('ExtraMenueHamburgerEssena')[0].disabled= "disabled";

var HamburgerMengea = document.getElementById('ExtraMenueHamburgerMengea').value;
hameg = Math.round((HamburgerMengea*5.00)*100)/100    //Hamburger menge geld insgesamt
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/supermarket/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+HamburgerMengea+'&id=4&cat=2&preis=5.00&preis_cent=500&inventar_name=hamburger&submitForm=F%C3%BCr+%E2%82%AC'+hameg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du hast gerade für "+hameg+" Euro Hamburger gekauft \nIch finde das gut jetz noch ein Bier dazu und der Tag macht Spass \nGuten Hunger chau Basti1012");
      }
  });

},false);};

//############################25 euro wascheen gehen ##################################
//POST /city/washhouse/buy/ id=2&submitForm=F%C3%BCr+%E2%82%AC25%2C00+kaufen

{
document.getElementsByName('ExtraMenue25Waschen')[0].addEventListener('click', function vielwaschen () 
{
document.getElementsByName('ExtraMenue25Waschen')[0].disabled= "disabled";

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/washhouse/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('id=2&submitForm=F%C3%BCr+%E2%82%AC25%2C00+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("wurde auch Zeit das du 25 euro fürs Waschen ausgeben tust weild du warst schon echt dreeckig man\nAlles gute beim Spenden sammeln mfg basti1012");
      }
  });

},false);};

//#####################Wenn 6 euro waschen   geklickt wurde####################################
//id=2&submitForm=F%C3%BCr+%E2%82%AC6%2C00+kaufen
{
document.getElementsByName('ExtraMenue6Waschen')[0].addEventListener('click', function wennigwashen () 
{
document.getElementsByName('ExtraMenue6Waschen')[0].disabled= "disabled";

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/washhouse/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('id=2&submitForm=F%C3%BCr+%E2%82%AC6%2C00+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Nur 6 Euro fürs waschen ausgeben du bis ja geizig\ngib mal lieber 25 Euro aus weil für \n6 euro musst du 10 mal Waschen gehen um die \n gleiche wirkunkung rauszukriegen als wie für 25 Euro\nalso erst denken dan waschen \mfg basti1012");
      }
  });

},false);};


//#####################Wenn Lose kaufen  geklickt wurde####################################
//id=2&submitForm=F%C3%BCr+%E2%82%AC6%2C00+kaufen
//POST /city/games/buy/ menge=1&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC1.00+kaufen
//POST /city/games/buy/ menge=2&id=1&preis=1.00&preis_cent=100&submitForm=F%25C3%25BCr+%25E2%2582%25AC2+kaufen

{
document.getElementsByName('ExtraMenueLosea')[0].addEventListener('click', function losekaufen () 
{
document.getElementsByName('ExtraMenueLosea')[0].disabled= "disabled";

var Loseina = document.getElementById('ExtraMenueLoseina').value;

loseeg = Math.round((Loseina*1.00)*100)/100    //Lose menge geld insgesamt
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/games/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge='+Loseina+'&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC'+loseeg+'+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert("Du hast gerade "+Loseina+" Lose gekauft viel Glück beim gewinnen \mfg basti1012");
      }
  });

},false);};

//##############################flaschen menge abfragen###########################################
	
GM_xmlhttpRequest(
{
method: 'GET',
url: ''+pgurl+'/stock/bottle/',
onload: function(responseDetails) 
{
var content = responseDetails.responseText;
var text1 = content.split('<td align="left" width="250"><span>')[1];
var text2 = text1.split(''+bott+'')[0];

var kurs1 = content.split('<a href="/stock/bottle/"><span id="pfandflaschen_kurs_ajax">')[1];
var kurs = kurs1.split('</span>')[0];
//###############################flaschen verkaufen########################################################
//POST /stock/bottle/sell/ chkval=12&max=2542&sum=13 cent und max fehlen noch fuere flascvhen verkauf s post
//POST /stock/bottle/sell/ chkval=12&max=2542&sum=%22+flaschensell
//POST /stock/bottle/sell/ chkval=12&max=2542&sum=18

{
document.getElementsByName('ExtraMenueflaschen')[0].addEventListener('click', function flaschen () 
{
document.getElementsByName('ExtraMenueflaschen')[0].disabled= "disabled";

var flaschensell = document.getElementById('ExtraMenueflaschenin').value;
win = Math.round((flaschensell*kurs)*10)/1000    //Flaschen Preis ausrechnen
GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/stock/bottle/sell/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('chkval='+kurs+'&max='+text2+'&sum='+flaschensell+''),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();alert ("du hast gerade "+flaschensell+" Flaschen verkauf \nund hast dudurch "+win+" Euro \ndran verdient\nViel spass bei neue suchen Mfg basti1012");
      }
  });

},false);};
}});





//#####################Wenn Kasse einzahlen geklickt wurde##################################################################
//POST /gang/cash/add/ f_money=1&f_comment=hallo+arschloch&Submit=Einzahlen


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
          data: encodeURI('f_money='+Money+'&f_comment='+kommi+'&Submit=Einzahlen'),
      onload: function(responseDetails)
	  { 
		window.location.reload();alert ("du hast gerade "+Money+" Euro  in der Kasse eingezahlt\n mit den Kommentar:\n "+kommi+" \nWünsche euch noch viel Glück im Spiel mfg basti1012");
      }
  });

},false);};

//############ ende des fernsteuerungs menue ########################################################
//#################Copyright by basti1012 ###########################################################
//#################version 2.0.0 kommt die tage raus mit allen nahrungsmittel########################
//###########bei probleme bitte melden by basti1012 www.pennerhack.foren-city.de####################