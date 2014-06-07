// ==UserScript==
// @name              Bastis Funscript losebot  fuer berlin version 2.0 pennergame
// @namespace         basti1012 www.pennergame-basti1012.foren-city.de
// @description       pennergame Kauft die anzahl der ausgewelten lose fun bild fun site fun text berlin.2.0
// @include           http://*berlin.pennergame*/city/games/*
// @exclude           *www.pennnergame.de*
// ==/UserScript==

GM_xmlhttpRequest(
   {
  	method: 'GET',
   	url: 'http://www.berlin.pennergame.de/city/games/',
        onload: function(responseDetails) 
		{
        	var content = responseDetails.responseText;
			var text1 = content.split('Du kannst heute noch ')[1];
			var NochLose = text1.split(' Lose kaufen')[0];	
			GM_setValue("NochLoseKaufen",NochLose);
		}
	});
//-------------------------------------------------

var LoseBotStart = GM_getValue("LoseBotStart");
if (LoseBotStart == null){GM_deleteValue("LoseBotStart");};

// Wenn LoseBot gestartet
if (LoseBotStart == "true")
{
  var ul = document.getElementsByTagName("ul")[2];
  var li = ul.getElementsByTagName('li')[0];
  li.innerHTML = "<li><a name=\"LoseBotStop\" href=\"http://www.berlin.pennergame.de/city/games/\"><b>[Lose-Bot stoppen]</b></a></li>";

  document.getElementsByName('LoseBotStop')[0].addEventListener('click', function sammelngehen () {
    GM_deleteValue("LoseBotStart");
    alert('LoseBot gestopt!');
  },false);

  if(window.location.href == "http://www.berlin.pennergame.de/city/games/buy/")
  {
	setInterval("window.location.href = \"http://www.berlin.pennergame.de/city/games/\";", 2500);
	GM_setValue("LoseBotStart","true");
  };
 
  if(window.location.href == "http://www.berlin.pennergame.de/city/games/"){
    // X Lose Kaufen
    var LoseBy = GM_getValue("KaufeXLose");
	if (LoseBy == 1)
    {
      GM_deleteValue("LoseBotStart");
	  document.getElementById("menge1").value = "1";
	  document.getElementById("submitForm1").click();
    };
    if (LoseBy > 1)
    {
  	  GM_setValue("KaufeXLose",LoseBy-10);
	  GM_setValue("LoseBotStart","true");
	  document.getElementById("menge1").value = "1";
      document.getElementById("submitForm1").click();  
    };
    if (LoseBy < 1)
    {
      GM_deleteValue("LoseBotStart");
	  document.getElementById("menge1").value = LoseBy;
	  document.getElementById("submitForm1").click();
    };
  };
}
else
{
GM_setValue("LoseBotStart","false");
};




var NochLoseKaufenValue = GM_getValue("NochLoseKaufen");
if (NochLoseKaufenValue == 0)
{
  var ul = document.getElementsByTagName("ul")[2];
  var li = ul.getElementsByTagName('li')[0];
  li.innerHTML = "<li><a name=\"LoseBotoff\"><b><font color=\"#999999\">[Lose-Bot starten]</font></b></a><div align=\"center\">Menge:<input name=\"KaufeXLose\" type=\"text\" id=\"KaufeXLose\" value=\""+NochLoseKaufenValue+"\" size=\"5\" maxlength=\"3\" disabled=\"disabled\"></div></li>";	
}
else
{
  var ul = document.getElementsByTagName("ul")[2];
  var li = ul.getElementsByTagName('li')[0];
  li.innerHTML = "<li><a name=\"LoseBot\"><b>[Lose-Bot starten]</b></a><div align=\"center\">Menge:<input name=\"KaufeXLose\" type=\"text\" id=\"KaufeXLose\" value=\""+NochLoseKaufenValue+"\" size=\"5\" maxlength=\"3\"></div></li>";
};


if(window.location.href == "http://www.berlin.pennergame.de/city/games/" || window.location.href == "http://www.berlin.pennergame.de/city/games/" || window.location.href == "http://berlin.pennergame.de/city/games/" || window.location.href == "http://berlin.pennergame.de/city/games/"  || window.location.href == "http://www.berlin.pennergame.de/city/games/buy/" || window.location.href == "http://berlin.pennergame.de/city/games/buy/" )
{
var content = document.getElementById('content');
   content.innerHTML =

"<style type=\"text/css\">.items img{margin-top: 5px;}</style><div class=\"listshop\">	<form method=\"post\" action=\"/city/games/buy/\"><table class=\"tieritemA\" ><tr>    <td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://www.sagen.at/texte/gegenwart/images/rubbellos.jpg\" alt=\"Rubbellose\" title=\"Rubbellos\"></td><td height=\"15\" align=\"left\" valign=\"top\"><span style=\"color: yellow; font-size: 120%;\">Das Geile Penner Rubbel Spiel Gewinnchance bei ca 50 Prozent.Rubbel dir ein und kaufe dir dann wieder Drogen und Alk.<br>Du kanst noch</span><br><span style=\"color: red; font-size: 420%;\">"+NochLoseKaufenValue+" Lose</span><br><span style=\"color: yellow; font-size: 120%;\">kaufen.Viel Spass</span></td></tr><span style=\"color: green; font-size: 120%;\">Menge&nbsp;</span><input type=\"text\" name=\"menge\" id=\"menge1\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(1,1);\"/><input type=\"hidden\" name=\"id\" value=\"1\" /><input type=\"hidden\" name=\"preis\" value=\"1\" /><input type=\"hidden\" name=\"preis1\" id=\"preis1\" value=\"1.00\"/><input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent1\" value=\"100\"/><input type=\"hidden\" name=\"inventar_name\" value=\"Rubbelose\"/><input id=\"submitForm1\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\" &euro;1.00 \"></form></td></tr></table><form method=\"post\" action=\"/city/games/lotto/\"><table class=\"tieritemB\" ><tr>    <td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"<img src=\"http://chu.bplaced.de/templates/spiele/ks_gamemenu/images_games/lotto.jpg\"  alt=\"Lotto\" title=\"Pennerlotto\"></td><td height=\"15\" align=\"left\" valign=\"top\"><span style=\"color: blue; font-size: 220%;\">Pennerlotto spielen</span></td></tr><span style=\"color: yellow; font-size: 150%;\">Ab und an musst du Lotto spielen um deine Alkohol und Drogen zu finanzieren.Man macht 4 Kreuze und dann viel gl&uuml;ck</span><tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\"><input id=\"submitForm1\" type=\"submit\" value=\"Lottoschein ausf&uuml;llen\"></form></td></tr></table><form method=\"post\" action=\"/city/games/\"><table class=\"tieritemA\" ><tr>    <td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://www.fotos-hochladen.net/losebot22zshk0ry.jpg \"></td><td height=\"15\" align=\"left\" valign=\"top\"><span style=\"color: red; font-size: 220%;\">Basti1012 Losebot</span></td></tr><span style=\"color: yellow; font-size: 120%;\">Einfach die Zahl eintippen den rest mache ich</span><br></td></tr><br><li><a name=\"LoseBot\"><br>[Bastis Lose-Bot starten]</b><li><a name=\"LoseBotStop\" href=\"http://www.berlin.pennergame.de/city/games/\"><b>[Lose-Bot stoppen]</b></a></li></a><span style=\"color: blue; font-size: 220%;\">Menge eingeben&nbsp;&nbsp;</span><input name=\"KaufeXLose\" type=\"text\" id=\"KaufeXLose\" value=\""+NochLoseKaufenValue+"\" size=\"5\" maxlength=\"3\"></div></li><li><a name=\"LoseBotoff\"><span style=\"color: blue; font-size: 150%;\">Du kannst noch</span><span style=\"color: red; font-size: 420%;\">"+NochLoseKaufenValue+"</span><span style=\"color: blue; font-size: 150%;\">lose kaufen</span></div></li></form></td></tr></table></div><div class=\"menubarright\"><div class=\"submenu_shop\"><div class=\"submenu_shop\"><div class=\"top\"></div><div class=\"content\"><ul><li><a href=\"http://pennergame-basti1012,foren-city.de/\" target=\"_blank\" alt=\"3.1 Videos!\" title=\"3.1 Videos!\"><b>Basti1012</b></a><li><a href=\"/city/map/\" alt=\"Stadtkarte\" title=\"Stadtkarte\">Stadtkarte</a></li><li><a href=\"/city/district/\" alt=\"Stadtteile\" title=\"Stadtteile\">Stadtteile</a></li><li><a href=\"/city/home/\" alt=\"Eigenheim\" title=\"Eigenheim\">Eigenheim</a></li><li><a href=\"/city/scrounge/\" alt=\"Schnorrplatz\" title=\"Schnorrplatz\">Schnorrplatz</a></li><li><a href=\"/city/games/\" alt=\"Gl&uuml;cksspiele\" title=\"Gl&uuml;cksspiele\">Gl&uuml;cksspiele</a></li> <li><a href=\"/city/weapon_store/\" alt=\"Waffenladen\" title=\"Waffenladen\">Waffenladen</a></li><li><a href=\"/city/pet_store/\" alt=\"Tierhandlung\" title=\"Tierhandlung\">Tierhandlung</a></li><li><a href=\"/city/supermarket/\" alt=\"Supermarkt\" title=\"Supermarkt\">Supermarkt</a><ul><li><a href=\"/city/supermarket/drinks/\" alt=\"Getr&auml;nke\" title=\"Getr&auml;nke\">&#155; Getr&auml;nke</a></li><li><a href=\"/city/supermarket/food/\" alt=\"Nahrung\" title=\"Nahrung\">&#155; Nahrung</a></li></ul></li><li><a href=\"/city/music_store/\" alt=\"Musikladen\" title=\"Musikladen\">Musikladen</a></li><li><a href=\"/city/stuff/\" alt=\"Zubeh&ouml;r\" title=\"Zubeh&ouml;r\">Zubeh&ouml;r</a></li><li><a href=\"/city/medicine/\" alt=\"Medizin\" title=\"Medizin\">Medizin</a></li><li><a href=\"/city/washhouse/\" alt=\"Waschhaus\" title=\"Waschhaus\">Waschhaus</a></li></ul></div><div class=\"buttom\"></div></div></div></div>";
};


// Wenn [Lose-Bot starten] geklickt wird
document.getElementsByName('LoseBot')[0].addEventListener('click', function sammelngehen () {
																						  
  var KaufeXLose = document.getElementsByName('KaufeXLose')[0].value;
  GM_setValue("KaufeXLose",KaufeXLose);
  GM_setValue("LoseBotStart","true");
  window.location.reload();

},false);
if (LoseBotStart == "true")
document.getElementsByName('LoseBotStop')[0].addEventListener('click', function sammelngehen () {

  GM_deleteValue("LoseBotStart");
  alert('LoseBot gestopt!');

},false);

// Copyright by basti1012 kopieren und verschenken ist erlaubt wer dieses script weiter geben will darf es gerne tun auch ist das anbiten auf der webpage erlaubt solange der text nicht verandert angeboten wird mfg basti1012