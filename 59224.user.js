// ==UserScript==
// @name Pennergame ExtraMenue Version2 fuer pennergame 4.0
// @namespace fuer pennergame 4.0 by basti1012
// @description  Fuegt ein kleines Menue am Seitenrand ein
// @include http://*pennergame.de*
// @exclude http://*newboard.pennergame.de*
// ==/UserScript==

// Hintergrundfarbe des Men?s (#313131)
var MenueBG = GM_getValue("MenueBGColorIn");
if (MenueBG == null){MenueBG = "#313131";};

// Border Farbe (#000000)
var BorderColor = GM_getValue("MenueBorderColorIn");
if (BorderColor == null){BorderColor = "#000000";};

// Men?position von Oben (in Pixel) (10)
var MenueTop = GM_getValue("MenueTopIn");
if (MenueTop == null){MenueTop = "10";};

// Men?position von links (in Pixel) (4)
var MenueLeft = GM_getValue("MenueLeftIn");
if (MenueLeft == null){MenueLeft = "4";};

// Borderbreite (in Pixel)
var BorderSize = GM_getValue("MenueBorderSizeIn");
if (BorderSize == null){BorderSize = "1";};

// ----------------- Button -----------------

// Button Nachrichten anzeigen (true = Anzeigen | false = nicht anzeigen)
var Nachichten = GM_getValue("MenueNachichtenIn");
if (Nachichten == null){Nachichten = "true";};

// Button Waschen 6 ? anzeigen (true = Anzeigen | false = nicht anzeigen)
var Waschen6 = GM_getValue("MenueWaschen6In");
if (Waschen6 == null){Waschen6 = "true";};

// Button Waschen 25 ? anzeigen (true = Anzeigen | false = nicht anzeigen)
var Waschen25 = GM_getValue("MenueWaschen25In");
if (Waschen25 == null){Waschen25 = "true";};

// Button Spieler Suchen anzeigen (true = Anzeigen | false = nicht anzeigen)
var Suchen = GM_getValue("MenueSuchenIn");
if (Suchen == null){Suchen = "true";};

// Button Bier anzeigen (true = Anzeigen | false = nicht anzeigen)
var Bier = GM_getValue("MenueBierIn");
if (Bier == null){Bier = "true";};

// Button Wein anzeigen (true = Anzeigen | false = nicht anzeigen)
var Wein = GM_getValue("MenueWeinIn");
if (Wein == null){Wein = "false";};

// Button Wodka anzeigen (true = Anzeigen | false = nicht anzeigen)
var Wodka = GM_getValue("MenueWodkaIn");
if (Wodka == null){Wodka = "false";};

// Button Brot anzeigen (true = Anzeigen | false = nicht anzeigen)
var Brot = GM_getValue("MenueBrotIn");
if (Brot == null){Brot = "true";};

// Button Currywurst anzeigen (true = Anzeigen | false = nicht anzeigen)
var Currywurst = GM_getValue("MenueCurrywurstIn");
if (Currywurst == null){Currywurst = "false";};

// Button Hamburger anzeigen (true = Anzeigen | false = nicht anzeigen)
var Hamburger = GM_getValue("MenueHamburgerIn");
if (Hamburger == null){Hamburger = "false";};
// -----------------------------------------------------------------------------------------------------------------------------

if (Nachichten == "true")
{var CNachrichten = "<li><a href=\"/messages/\"><img src=\"http://media.pennergame.de/img/overview/new_msg.gif\">&nbsp;Nachrichten</a></li>";}
else{var CNachrichten = "";};

var CAktionen = "<li><a href=\"/activities/\"><img src=\"http://media.pennergame.de/de/img/crap.png\" width=\"14\" height=\"14\">&nbsp;Flaschen sammeln</a></li>";

if (window.location.hostname + window.location.pathname == "www.pennergame.de/activities/")
{
var CSammeln = "<li><br><div align=\"center\"><form name=\"xycoords\" action=\"http://www.pennergame.de/activities/bottle/\" method=\"post\">Zeit:&nbsp;<select name=\"time\" class=\"dropdown\" onChange=\"FlaschenRechner(this.value)\"><option value=\"10\" selected>10 Minuten</option><option value=\"30\">30 Minuten</option><option value=\"60\">1 Stunde</option><option value=\"180\">3 Stunden</option><option value=\"360\">6 Stunden</option><option value=\"540\">9 Stunden</option><option value=\"720\">12 Stunden</option></select><input type=\"hidden\" name=\"type\" value=\"1\"><br /><input type=\"button\" class=\"button_skill\"  name=\"Submit2\"  onclick=\"javascript:setupForm('http://www.pennergame.de//activities/bottle/')\" value=\"Sammeln gehen\" id\"sammeln\"></form></div></li>";
}
else
{
var CSammeln = "<li><br><div align=\"center\"><form name=\"xycoords\" action=\"http://www.pennergame.de/activities/bottle/\" method=\"post\">Zeit:&nbsp;<select name=\"time\" class=\"dropdown\" onChange=\"FlaschenRechner(this.value)\"><option value=\"10\" selected>10 Minuten</option><option value=\"30\">30 Minuten</option><option value=\"60\">1 Stunde</option><option value=\"180\">3 Stunden</option><option value=\"360\">6 Stunden</option><option value=\"540\">9 Stunden</option><option value=\"720\">12 Stunden</option></select><input type=\"hidden\" name=\"type\" value=\"1\"><br /><input type=\"button\" class=\"button_skill\"  name=\"Submit2\"  onclick=\"javascript:setupForm('http://www.pennergame.de//activities/bottle/')\" disabled=\"disabled\" value=\"Sammeln gehen\" id\"sammeln\"></form></div></li>";	
}

var CKasse = '<li><a href="/gang/credit/">Bandenkasse:</a><li>&nbsp;<img src="http://media.pennergame.de/de/img/cash.png">&nbsp;<input name="ExtraMenueKasseMoney" type="text" id="ExtraMenueKasseMoney" size="2"><input type="button" name="ExtraMenueKasseeinzahlen" value="Einzahlen"></li>';

if (Suchen == "true")
{var CSuchen = "<li><a>Spieler suchen:</a><li><form method=\"GET\" action=\"/highscore/search/\">&nbsp;<img src=\"http://media.pennergame.de/img/buddy/buddy_on.png\" alt=\"user\" title=\"user\">&nbsp;<input name=\"name\" type=\"text\" size=\"2\"><input class=\"formbutton\" type=\"submit\" value=\"Suchen\"></form></li>";}
else{var CSuchen = "";};

if (Bier == "true")
{var CBier = '<li><a href="/stock/">Bier trinken:</a><li>&nbsp;<img src="http://media.pennergame.de/img/inventar/Bier.png" alt="Bier" title="Bier" />&nbsp;<input id="ExtraMenueBierMenge" type="text" size="1" name="ExtraMenueBierMenge" value="1" /><input id="ExtraMenueBierTrinken" type="button" name="ExtraMenueBierTrinken" value="Trinken"/></li>';}
else{var CBier = "";};

if (Wein == "true")
{var CWein = '<li><a href="/stock/">Gl&uuml;hwein trinken:</a><li>&nbsp;<img src="http://media.pennergame.de/img/inventar/Wodka.png" alt="xm_drink" title="xm_drink" />&nbsp;<input id="ExtraMenueWeinMenge" type="text" size="2" name="ExtraMenueWeinMenge" value="1"/> <input id="ExtraMenueWeinTrinken" type="button" name="ExtraMenueWeinTrinken" value="Trinken"/></li>';}
else{var CWein = "";};

if (Wodka == "true")
{var CWodka = '<li><a href="/stock/">Wodka trinken:</a>&nbsp;<img src="http://media.pennergame.de/img/inventar/Wodka.png" />&nbsp;<input id="ExtraMenueWodkaMenge" type="text" size="2" name="ExtraMenueWodkaMenge" value="1" /> <input id="ExtraMenueWodkaTrinken" type="button" name="ExtraMenueWodkaTrinken" value="Trinken"/></li>';}
else{var CWodka = "";};
 
if (Brot == "true")
{var CBrot = '<li><a href="/stock/foodstuffs/food/">Brot essen:</a><li>&nbsp;<img src="http://media.pennergame.de/img/inventar/Brot.png" alt="Brot" title="Brot" />&nbsp;<input id="ExtraMenueBrotMenge" type="text" size="1" name="ExtraMenueBrotMenge" value="1" /><input id="ExtraMenueBrotEssen" name="ExtraMenueBrotEssen" type="button" value="Essen" /></li>';}
else{var CBrot = "";};

if (Currywurst == "true")
{var CCurrywurst = '<li><a href="/stock/foodstuffs/food/">Currywurst essen:</a><li>&nbsp;<img src="http://media.pennergame.de/img/inventar/Currywurst.png" alt="Currywurst" title="Currywurst" />&nbsp;<input id="ExtraMenueCurrywurstMenge" type="text" size="2" name="ExtraMenueCurrywurstMenge" value="1"/> <input id="ExtraMenueCurrywurstEssen" name="ExtraMenueCurrywurstEssen" type="button" value="Essen"/></li>';}
else{var CCurrywurst = "";};

if (Hamburger == "true")
{var CHamburger = '<li><a href="/stock/foodstuffs/food/">Hamburger essen:</a><li>&nbsp;<img src="http://media.pennergame.de/img/inventar/Currywurst.png" alt="Currywurst" title="Currywurst" />&nbsp;<input id="ExtraMenueHamburgerMenge" type="text" size="2" name="ExtraMenueHamburgerMenge" value="1"/> <input id="ExtraMenueHamburgerEssen" name="ExtraMenueHamburgerEssen" type="button" value="Essen"/></li>';}
else{var CHamburger = "";};

if (Waschen6 == "true")
{var CWaschen6 = '<a href="/city/washhouse/">Waschen f&uuml;r 6&euro;:</a><li><div align="center"><img src="http://img3.abload.de/img/schwamve0k.png" width="16" height="16">&nbsp;<input class="formbutton" type="button" name="ExtraMenue6Waschen" value="F&uuml;r&nbsp;6,00&nbsp;&euro;&nbsp;"></div></li>';}
else{var CWaschen6 = "";};

if (Waschen25 == "true")
{var CWaschen25 = '<a href="/city/washhouse/">Waschen f&uuml;r 25&euro;:</a><li><div align="center"><img src="http://img3.abload.de/img/schwamve0k.png" width="16" height="16">&nbsp;<input class="formbutton" type="button" name="ExtraMenue25Waschen" value="F&uuml;r&nbsp;25,00&nbsp;&euro;&nbsp;"></div></li>';}
else{var CWaschen25 = "";};

var CEinstellungen = "<li><a name=\"EinstellungenExtraMenue\">[<span style=\"color:#FF0000;\">Einstellungen</span>]</a></li>";

var CSpeichern = "<li><div align=\"center\">_______________________<br><input type=\"submit\" class=\"formbutton\"  name=\"SpeichernExtraMenue\" value=\"Speichern\" />";
var CSchliessen = "<input type=\"submit\" class=\"formbutton\" name=\"SchliessenExtraMenue\" value=\"Schlie&szlig;en\" /><br>&nbsp;</li></div>";

// Alles zusammen f?gen (Menue)
var Linkkette =  CNachrichten + CAktionen + CSammeln + CWaschen6 + CWaschen25 + CKasse + CSuchen + CBier + CWein + CWodka + CBrot + CCurrywurst + CHamburger;

// Men? eingef?gt
//document.getElementById("header").innerHTML += "<span name=\"Menue\" style=\"position:fixed;top:"+MenueTop+"px;left:"+MenueLeft+"px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:0.8;opacity:0.8;border:"+BorderSize+"px solid "+BorderColor+"; background-color:"+MenueBG+"\"><div class=\"content\" style=\"padding-top:20px\"><ul>"+Linkkette+CEinstellungen+"</ul></div></span>";

document.getElementById('content').innerHTML += "<span name=\"Menue\" style=\"position:fixed;top:"+MenueTop+"px;left:"+MenueLeft+"px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:0.8;opacity:0.8;border:"+BorderSize+"px solid "+BorderColor+"; background-color:"+MenueBG+"\"><div class=\"content\" style=\"padding-top:20px\"><ul>"+Linkkette+CEinstellungen+"</ul></div></span>";








// pr?fen ob ein Button geklickt wurde -----------------------------------------------------------------------------------------

// Wenn Kasse einzahlen geklickt wurde
document.getElementsByName('ExtraMenueKasseeinzahlen')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueKasseeinzahlen')[0].disabled= "disabled";

var KasseMoney = document.getElementById('ExtraMenueKasseMoney').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/gang/cash/add/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('f_money='+KasseMoney+'&f_comment=&Submit=Einzahlen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);
//---------------------------------

// Wenn Bier trinken geklickt wurde
if (Bier == "true"){
document.getElementsByName('ExtraMenueBierTrinken')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueBierTrinken')[0].disabled= "disabled";

var BierMenge = document.getElementById('ExtraMenueBierMenge').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Bier&promille=35&id=1&menge='+BierMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn Wein trinken geklickt wurde
if (Wein == "true"){
document.getElementsByName('ExtraMenueWeinTrinken')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueWeinTrinken')[0].disabled= "disabled";

var WeinMenge = document.getElementById('ExtraMenueWeinMenge').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=xm_drink&promille=80&id=10&menge='+WeinMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn Wodka trinken geklickt wurde
if (Wodka == "true"){
document.getElementsByName('ExtraMenueWodkaTrinken')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueWodkaTrinken')[0].disabled= "disabled";

var WodkaMenge = document.getElementById('ExtraMenueWodkaMenge').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Wodka&promille=250&id=7&menge='+WodkaMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn Brot essen geklickt wurde
if (Brot == "true"){
document.getElementsByName('ExtraMenueBrotEssen')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueBrotEssen')[0].disabled= "disabled";

var BrotMenge = document.getElementById('ExtraMenueBrotMenge').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Brot&promille=-35&id=2&menge='+BrotMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn Currywurst essen geklickt wurde
if (Currywurst == "true"){
document.getElementsByName('ExtraMenueCurrywurstEssen')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueCurrywurstEssen')[0].disabled= "disabled";

var CurrywurstMenge = document.getElementById('ExtraMenueCurrywurstMenge').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Currywurst&promille=-100&id=3&menge='+CurrywurstMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn Hamburger essen geklickt wurde
if (Hamburger == "true"){
document.getElementsByName('ExtraMenueHamburgerEssen')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenueHamburgerEssen')[0].disabled= "disabled";

var HamburgerMenge = document.getElementById('ExtraMenueHamburgerMenge').value;

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/stock/foodstuffs/use/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('item=Hamburger&promille=-200&id=4&menge='+HamburgerMenge),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn 6Waschen geklickt wurde
if (Waschen6 == "true"){
document.getElementsByName('ExtraMenue6Waschen')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenue6Waschen')[0].disabled= "disabled";

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/city/washhouse/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('id=2&submitForm=F%C3%BCr+%E2%82%AC6%2C00+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------

// Wenn 25Waschen geklickt wurde
if (Waschen25 == "true"){
document.getElementsByName('ExtraMenue25Waschen')[0].addEventListener('click', function change_plunder () 
{
document.getElementsByName('ExtraMenue25Waschen')[0].disabled= "disabled";

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: 'http://'+window.location.hostname+'/city/washhouse/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('id=2&submitForm=F%C3%BCr+%E2%82%AC25%2C00+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();
      }
  });

},false);};
//---------------------------------




//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------

var OMenueBGColor = "<div align=\"center\"><a>Men&uuml; Hintergrund Farbe</a><input name=\"MenueBGColorIn\" type=\"text\" size=\"10\" value=\""+MenueBG+"\" /></div>";

var OMenueBorderColor = "<div align=\"center\"><a>Men&uuml; Border Farbe</a><input name=\"MenueBorderColorIn\" type=\"text\" maxlength=\"7\" size=\"10\" value=\""+BorderColor+"\" /></div>";

var OMenueTop = "<div align=\"center\"><a>Abstand von Oben</a><input name=\"MenueTopIn\" size=\"10\" type=\"text\" value=\""+MenueTop+"\" />&nbsp<span style=\"color:#CCCCCC;\">(Pixel)</span></div>";

var OMenueLeft = "<div align=\"center\"><a>Abstand von Links</a><input name=\"MenueLeftIn\" type=\"text\" size=\"10\" value=\""+MenueLeft+"\" />&nbsp<span style=\"color:#CCCCCC;\">(Pixel)</span></div>";

var OBorderSize = "<div align=\"center\"><a>Men&uuml; Borderbreite</a><input name=\"MenueBorderSizeIn\" type=\"text\" size=\"10\" value=\""+BorderSize+"\" />&nbsp<span style=\"color:#CCCCCC;\">(Pixel)</span></div>";

var HauptLinkkete = "<a><span style=\"color:#FFFFFF;\"><b>>Men&uuml;-Optionen<</b></span></a>"+OMenueBGColor + OMenueBorderColor + OMenueTop + OMenueLeft + OBorderSize; 

//-------------

if (Nachichten == "true")
{var ONachichten = "<div align=\"left\"><input name=\"MenueNachichtenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Nachrichten</span></div>";}
else
{var ONachichten = "<div align=\"left\"><input name=\"MenueNachichtenIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Nachrichten</span></div>";};

if (Waschen6 == "true")
{var OWaschen6 = "<div align=\"left\"><input name=\"MenueWaschen6In\" type=\"checkbox\" checked=\"checked\" /><span style=\"color:#CCCCCC;\">waschen 6 &euro;</span></div>";}
else
{var OWaschen6 = "<div align=\"left\"><input name=\"MenueWaschen6In\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">waschen 6 &euro;</span></div>";};

if (Waschen25 == "true")
{var OWaschen25 = "<div align=\"left\"><input name=\"MenueWaschen25In\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">waschen 25 &euro;</span></div>";}
else
{var OWaschen25 = "<div align=\"left\"><input name=\"MenueWaschen25In\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">waschen 25 &euro;</span></div>";};

if (Suchen == "true")
{var OSuchen = "<div align=\"left\"><input name=\"MenueSuchenIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Spieler suchen</span></div>";}
else
{var OSuchen = "<div align=\"left\"><input name=\"MenueSuchenIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Spieler suchen</span></div>";};

if (Bier == "true")
{var OBier = "<div align=\"left\"><input name=\"MenueBierIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Bier</span></div>";}
else
{var OBier = "<div align=\"left\"><input name=\"MenueBierIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Bier</span></div>";};

if (Wein == "true")
{var OWein = "<div align=\"left\"><input name=\"MenueWeinIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Gl&uuml;hwein</span></div>";}
else
{var OWein = "<div align=\"left\"><input name=\"MenueWeinIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Gl&uuml;hwein</span></div>";};

if (Wodka == "true")
{var OWodka = "<div align=\"left\"><input name=\"MenueWodkaIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Wodka</span></div>";}
else
{var OWodka = "<div align=\"left\"><input name=\"MenueWodkaIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Wodka</span></div>";};

if (Brot == "true")
{var OBrot = "<div align=\"left\"><input name=\"MenueBrotIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Brot</span></div>";}
else
{var OBrot = "<div align=\"left\"><input name=\"MenueBrotIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Brot</span></div>";};

if (Currywurst == "true")
{var OCurrywurst = "<div align=\"left\"><input name=\"MenueCurrywurstIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Currywurst</span></div>";}
else
{var OCurrywurst = "<div align=\"left\"><input name=\"MenueCurrywurstIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Currywurst</span></div>";};

if (Hamburger == "true")
{var OHamburger = "<div align=\"left\"><input name=\"MenueHamburgerIn\" type=\"checkbox\"  checked=\"checked\" /><span style=\"color:#CCCCCC;\">Hamburger</span></div>";}
else
{var OHamburger = "<div align=\"left\"><input name=\"MenueHamburgerIn\" type=\"checkbox\" /><span style=\"color:#CCCCCC;\">Hamburger</span></div>";};

var ButtonLinkkette = "<br><a><span style=\"color:#FFFFFF;\"><b>>Button-Optionen<</b></a></span>"+ONachichten+OWaschen6+OWaschen25+OSuchen+OBier+OWein+OWodka+OBrot+OCurrywurst+OHamburger;

//--------------------------------------------------------------------------------------------------

// Wurde Einstellungen geklickt dann............................................................
document.getElementsByName('EinstellungenExtraMenue')[0].addEventListener('click', function EinstellungenExtraMenue () {

// Einstellungs Men? einf?gen
document.getElementsByName('Menue')[0].innerHTML = "<span name=\"Menue\" style=\"position:fixed;top:"+MenueTop+"px;left:"+MenueLeft+"px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:0.8;opacity:0.8;border:"+BorderSize+"px solid "+BorderColor+"; background-color:"+MenueBG+"\"><div class=\"content\" style=\"padding-top:20px\"><ul><li><div align=\"center\"><span style=\"color:#0099FF; font-size:14px;\"><b>Einstellungen</b></span></div></li>"+HauptLinkkete+ButtonLinkkette+CSpeichern+CSchliessen+"</ul></div></span>";

// Wurde Speichern geklickt dann...
document.getElementsByName('SpeichernExtraMenue')[0].addEventListener('click', function Schliessen () {

// Speichern ----------
GM_setValue("MenueBGColorIn", document.getElementsByName('MenueBGColorIn')[0].value);
GM_setValue("MenueBorderColorIn", document.getElementsByName('MenueBorderColorIn')[0].value);
GM_setValue("MenueTopIn", document.getElementsByName('MenueTopIn')[0].value);
GM_setValue("MenueLeftIn", document.getElementsByName('MenueLeftIn')[0].value);
GM_setValue("MenueBorderSizeIn", document.getElementsByName('MenueBorderSizeIn')[0].value);
if (document.getElementsByName('MenueNachichtenIn')[0].checked == true)
{GM_setValue("MenueNachichtenIn", "true");}else{GM_setValue("MenueNachichtenIn", "false");}


if (document.getElementsByName('MenueWaschen6In')[0].checked == true)
{GM_setValue("MenueWaschen6In", "true");}else{GM_setValue("MenueWaschen6In", "false");}
if (document.getElementsByName('MenueWaschen25In')[0].checked == true)
{GM_setValue("MenueWaschen25In", "true");}else{GM_setValue("MenueWaschen25In", "false");}

if (document.getElementsByName('MenueSuchenIn')[0].checked == true)
{GM_setValue("MenueSuchenIn", "true");}else{GM_setValue("MenueSuchenIn", "false");}

if (document.getElementsByName('MenueBierIn')[0].checked == true)
{GM_setValue("MenueBierIn", "true");}else{GM_setValue("MenueBierIn", "false");}
if (document.getElementsByName('MenueWeinIn')[0].checked == true)
{GM_setValue("MenueWeinIn", "true");}else{GM_setValue("MenueWeinIn", "false");}
if (document.getElementsByName('MenueWodkaIn')[0].checked == true)
{GM_setValue("MenueWodkaIn", "true");}else{GM_setValue("MenueWodkaIn", "false");}

if (document.getElementsByName('MenueBrotIn')[0].checked == true)
{GM_setValue("MenueBrotIn", "true");}else{GM_setValue("MenueBrotIn", "false");}
if (document.getElementsByName('MenueCurrywurstIn')[0].checked == true)
{GM_setValue("MenueCurrywurstIn", "true");}else{GM_setValue("MenueCurrywurstIn", "false");}
if (document.getElementsByName('MenueHamburgerIn')[0].checked == true)
{GM_setValue("MenueHamburgerIn", "true");}else{GM_setValue("MenueHamburgerIn", "false");}

// Seite neu laden ----------
window.location.reload();

},false);
//.................................

// Wurde Schlie?en geklickt dann...
document.getElementsByName('SchliessenExtraMenue')[0].addEventListener('click', function Schliessen () {
// Seite neu laden
window.location.reload();

},false);
//.................................


},false);
//................................................................................................