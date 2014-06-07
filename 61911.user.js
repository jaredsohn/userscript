// ==UserScript==
// @name           Alle getraenke alle nahrung keine jugendschutz sperre  pennergame 4.0 berlin hamburg
// @namespace  By basti1012 pennerhack.foren-city.de
// @description   test alles was gibt zum saufen   gluehwein gruselschnaps suessigkeiten stollen den ganzen tag bier und wodka keine jugendschutzsperre 
// @include       http://*pennergame.de/city/supermarket/*
// @include       http://*pennergame.de/stock/foodstuffs/*
// @include       http://*pennergame.de/stock/*



// ==/UserScript==










if(window.location.href == "http://www.pennergame.de/city/supermarket/" || window.location.href == "http://berlin.pennergame.de/city/supermarket/" || window.location.href == "http://www.pennergame.de/city/supermarket/buy/" || window.location.href == "http://berlin.pennergame.de/city/supermarket/buy/" || window.location.href == "http://www.pennergame.de/city/supermarket/drinks/" || window.location.href == "http://www.pennergame.de/city/supermarket/drinks"  ||  window.location.href == "http://berlin.pennergame.de/city/supermarket/drinks/" || window.location.href == "http://berlin.pennergame.de/city/supermarket/drinks" || window.location.href == "http://pennergame.de/city/supermarket/drinks/" || window.location.href == "http://pennergame.de/city/supermarket/drinks/"  || window.location.href == "http://www.pennergame.de/city/supermarket/buy/" || window.location.href == "http://pennergame.de/city/supermarket/buy/" )
{ 
var content = document.getElementById('content');
content.innerHTML ='<style type=\"text/css\">.items img{margin-top: 5px;}</style><div class=\"listshop\">'
+'<form method=\"post\" action=\"/city/supermarket/buy/\"><table class=\"tieritemA\" >'
+'<tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\">'
+'<img src=\"http://media.pennergame.de/img/supermarkt/bier.jpg\" alt=\"Bier - 0.5l\" title=\"Bier - 0.5l\"></td>'
+'<td height=\"15\" align=\"left\" valign=\"top\">'
+'<span class=\"tiername\">Bier - 0.5l</span></td></tr>'
+'<tr align=\"left\" valign=\"top\">'
+'<td>Penner Export ist das Standardbier; Ger&uuml;chten zu Folge macht es blind, aber daf&uuml;r ist der Fusel billig. Dein Promillespiegel steigt um <b>0,35 Promille pro Bier.</b></td></tr>'
+'<tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\">'
+'<td height=\"20\">Menge: <input type=\"text\" name=\"menge\" id=\"menge0\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(0);\"/><br />'
+'<input type=\"hidden\" name=\"id\" value=\"1\" /><input type=\"hidden\" name=\"cat\" value=\"1\" />'
+'<input type=\"hidden\" name=\"preis\" id=\"preis0\" value=\"0.85\"/>'
+'<input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent0\" value=\"85\"/><input type=\"hidden\" name=\"inventar_name\" value=\"bier\"/>'
+'<input id=\"submitForm0\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;0,85 kaufen\"></form></td></tr></table>'
+'<form method=\"post\" action=\"/city/supermarket/buy/\"><table class=\"tieritemB\" ><tr>'
+'<td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://media.pennergame.de/img/supermarkt/wodka.jpg\" alt=\"Wodka - 0.5l\" title=\"Wodka - 0.5l\"></td>'
+'<td height=\"15\" align=\"left\" valign=\"top\"><span class=\"tiername\">Wodka - 0.5l</span></td></tr><tr align=\"left\" valign=\"top\">'
+'<td>Der gute alte Wodka aus dem Hause \"Trunkspecht\" ist ein Allheilmittel. Er belebt Geist, Seele und K&ouml;rper mit <b>2,5 Promille pro Flasche</b>.<br> Achtung! Kann zu Gehirnbrand f&uuml;hren.</td></tr>'
+'<tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: '
+'<input type=\"text\" name=\"menge\" id=\"menge1\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(1);\"/><br /><input type=\"hidden\" name=\"id\" value=\"7\" /><input type=\"hidden\" name=\"cat\" value=\"1\" />'
+'<input type=\"hidden\" name=\"preis\" id=\"preis1\" value=\"10.00\"/>'
+'<input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent1\" value=\"1000\"/>'
+'<input type=\"hidden\" name=\"inventar_name\" value=\"wodka\"/>'
+'<input id=\"submitForm1\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;10,00 kaufen\"></form></td></tr></table>'
+'<form method=\"post\" action=\"/city/supermarket/buy/\"><table class=\"tieritemA\" >'
+'<tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\">'
+'<img src=\"http://tbn2.google.com/images?q=tbn:AjKm5TQfzUxchM:http://www.barmenia-mediline.de/bilder/wissenmedia/Gluehwein.jpg \"></td>'
+'<td height=\"15\" align=\"left\" valign=\"top\"><span class=\"tiername\">Gl&uuml;hwein - 1Becher</span></td></tr>'
+'<tr align=\"left\" valign=\"top\"><td><b>Dein Promillespiegel steigt um 0,80 Promille pro Tasse.</b><br>'
+'In der kalten Jahreszeit frierst du sehr und bist damit nicht allein, Dein Bahnhofkumpel Alfred l&auml;sst bekannt machen, dass der Weihnachtsmarkt er&ouml;ffnet ist und es wieder Gl&uuml;hweiner zu kaufen gibt!</td></tr>'
+'<tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: <input type=\"text\" name=\"menge\" id=\"menge2\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(2);\"/><br />'
+'<input type=\"hidden\" name=\"id\" value=\"10\" /><input type=\"hidden\" name=\"cat\" value=\"1\" /><input type=\"hidden\" name=\"preis\" id=\"preis2\" value=\"10.00\"/>'
+'<input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent2\" value=\"200\"/><input type=\"hidden\" name=\"inventar_name\" value=\"gleuhwein\"/>'
+'<input id=\"submitForm2\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;2,00 kaufen\"></form></td></tr></table><form method=\"post\" action=\"/city/supermarket/buy/\"><table class=\"tieritemA\" >'
+'<tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://tbn2.google.com/images?q=tbn:daveVEERWiOxzM:http://www.baumann-tirol.at/site/fileadmin/baumann_bilder/Fotos_Downloads/Marillen_Schnaps.jpg \"></td>'
+'<td height=\"20\" align=\"left\" valign=\"top\"><span class=\"tiername\">Grusel - Schnaps</span></td></tr>'
+'<tr align=\"left\" valign=\"top\"><td>Passend zur Halloweenstimmung besorgt dir Hafen - Kalle Grusel-Schnaps.Eigentlich ist es normaler Schnaps, nur ist er an Halloween billiger<b>Dein Promillespiegel steigt um 1,10 Promille pro Flasche. </b><br></td></tr>'
+'<tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: '
+'<input type=\"text\" name=\"menge\" id=\"menge3\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(3);\"/><br /><input type=\"hidden\" name=\"id\" value=\"8\" />'
+'<input type=\"hidden\" name=\"cat\" value=\"1\" /><input type=\"hidden\" name=\"preis\" id=\"preis3\" value=\"2.20\"/>'
+'<input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent3\" value=\"220\"/><input type=\"hidden\" name=\"inventar_name\" value=\"Grusel-Schnaps\"/>'
+'<input id=\"submitForm3\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;2,20 kaufen\"></form></td></tr></table>'
+'<form method=\"post\" action=\"/city/supermarket/food/\"><div class=\"menubarright\"><div class=\"submenu_shop\"><div class=\"submenu_shop\"><div class=\"top\"></div><div class=\"content\"><ul><a href=\"http://pennerhack.foren-city.de/\" target=\"_blank\" alt=\"3.1 Videos!\" title=\"3.1 Videos!\"><b>Basti1012</b></a><a href=\"/city/map/\" alt=\"Stadtkarte\" title=\"Stadtkarte\">Stadtkarte</a><a href=\"/city/district/\" alt=\"Stadtteile\" title=\"Stadtteile\">Stadtteile</a><a href=\"/city/home/\" alt=\"Eigenheim\" title=\"Eigenheim\">Eigenheim</a><a href=\"/city/scrounge/\" alt=\"Schnorrplatz\" title=\"Schnorrplatz\">Schnorrplatz</a><a href=\"/city/games/\" alt=\"Gl&uuml;cksspiele\" title=\"Gl&uuml;cksspiele\">Gl&uuml;cksspiele</a><a href=\"/city/weapon_store/\" alt=\"Waffenladen\" title=\"Waffenladen\">Waffenladen</a><a href=\"/city/pet_store/\" alt=\"Tierhandlung\" title=\"Tierhandlung\">Tierhandlung</a><a href=\"/city/supermarket/\" alt=\"Supermarkt\" title=\"Supermarkt\">Supermarkt</a><ul><a href=\"/city/supermarket/drinks/\" alt=\"Getr&auml;nke\" title=\"Getr&auml;nke\">&#155; Getr&auml;nke</a><a href=\"/city/supermarket/food/\" alt=\"Nahrung\" title=\"Nahrung\">&#155; Nahrung</a></ul><a href=\"/city/music_store/\" alt=\"Musikladen\" title=\"Musikladen\">Musikladen</a><a href=\"/city/stuff/\" alt=\"Zubeh&ouml;r\" title=\"Zubeh&ouml;r\">Zubeh&ouml;r</a><a href=\"/city/medicine/\" alt=\"Medizin\" title=\"Medizin\">Medizin</a><a href=\"/city/washhouse/\" alt=\"Waschhaus\" title=\"Waschhaus\">Waschhaus</a></ul></div><div class=\"buttom\"></div></div></div></div>';

};





if(window.location.href == "http://www.pennergame.de/city/supermarket/buy/" || window.location.href == "http://berlin.pennergame.de/city/supermarket/buy/" || window.location.href == "http://www.pennergame.de/city/supermarket/food/" || window.location.href == "http://pennergame.de/city/supermarket/" || window.location.href == "berlin.pennergame.de/city/supermarket/food/" || window.location.href == "http://berlin.pennergame.de/city/supermarket/food/"  || window.location.href == "http://www.pennergame.de/city/supermarket/food/" || window.location.href == "http://pennergame.de/city/supermarket/food/" )
{
var content = document.getElementById('content');
 content.innerHTML ='<style type=\"text/css\">.items img{margin-top: 5px;}</style>'
+'<div class=\"listshop\"><form method=\"post\" action=\"/city/supermarket/food/\">'
+'<table class=\"tieritemB\" ><tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\">'
+'<img src=\"http://media.pennergame.de/img/supermarkt/Brot.jpg\" alt=\"Brot\" title=\"Brot\"></td>'
+'<td height=\"15\" align=\"left\" valign=\"top\"><span class=\"tiername\">Brot</span></td></tr>'
+'<tr align=\"left\" valign=\"top\">'
+'<td>Brot f&uuml;r die Welt.Also kauf dir dein Brot jetzt , um deinen, in harter Arbeit angetrunkenen Alkoholpegel zu senken.</td></tr><tr align=\"left\" valign=\"top\"><td></td></tr>'
+'<tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: <input type=\"text\" name=\"menge\" id=\"menge0\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(0);\"/><br>'
+'<input type=\"hidden\" name=\"id\" value=\"2\" /><input type=\"hidden\" name=\"cat\" value=\"2\" />'
+'<input type=\"hidden\" name=\"preis\" id=\"preis0\" value=\"1.70\"/><input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent0\" value=\"170\"/><input type=\"hidden\" name=\"inventar_name\" value=\"Brot\"/><input id=\"submitForm0\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;1,70 kaufen\">      </form></td></tr></table><form method=\"post\" action=\"/city/supermarket/buy/\"><table class=\"tieritemA\" ><tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://media.pennergame.de/img/supermarkt/currywurst.jpg \"alt=\"Currywurst + Pommes\" title=\"Currywurst + Pommes\"></td><td height=\"15\" align=\"left\" valign=\"top\"><span class=\"tiername\">Currywurst + Pommes</span></td></tr><tr align=\"left\" valign=\"top\"><td>Du hast genug vom Brot und willst nicht vom Fleisch fallen?Dann ist die Currywurst mit Pommes genau das Richtige f&uuml;r dich . Wenn du Gl&uuml;ck hast, gibts noch Majo dazu</td></tr><tr align=\"left\" valign=\"top\"><td>'
+'</td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: '
+'<input type=\"text\" name=\"menge\" id=\"menge1\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(1);\"/>'
+'<br /><input type=\"hidden\" name=\"id\" value=\"3\" /><input type=\"hidden\" name=\"cat\" value=\"2\" />'
+'<input type=\"hidden\" name=\"preis\" id=\"preis1\" value=\"3.50\"/>'
+'<input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent1\" value=\"350\"/><input type=\"hidden\" name=\"inventar_name\" value=\"currywurst\"/><input id=\"submitForm1\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;3,50 kaufen\">       </form></td></tr></table><form method=\"post\" action=\"/city/supermarket/buy/\"><table class=\"tieritemA\" ><tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://media.pennergame.de/img/supermarkt/hamburger.jpg \"alt=\"Hamburger\" title=\"Hamburger\"></td><td height=\"20\" align=\"left\" valign=\"top\"><span class=\"tiername\">Hamburger</span></td></tr><tr align=\"left\" valign=\"top\">'
+'<td>Die High-Society-Nahrung unter den Obdachlosen. Wenn du mit einem Burger in der Hand auf der Stra&szlig;e gesehen wirst, ist dir der Respekt und der Neid der anderen sicher.</td></tr><tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\">'
+'<td height=\"20\">Menge: <input type=\"text\" name=\"menge\" id=\"menge2\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(2);\"/><br />'
+'<input type=\"hidden\" name=\"id\" value=\"4\" /><input type=\"hidden\" name=\"cat\" value=\"2\" /><input type=\"hidden\" name=\"preis\" id=\"preis2\" value=\"5.00\"/><input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent2\" value=\"500\"/><input type=\"hidden\" name=\"inventar_name\" value=\"Hamburger\"/><input id=\"submitForm2\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;5,00 kaufen\">       </form></td></tr></table></form></td></tr></table>'
+'<form method=\"post\" action=\"/city/supermarket/food/\"><table class=\"tieritemA\" >'
+'<tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\"><img src=\"http://media.pennergame.de/img/supermarkt/stollen.jpg \"alt=\"Stollen\" title=\"Stollen\"></td>'
+'<td height=\"20\" align=\"left\" valign=\"top\"><span class=\"tiername\">Stollen</span></td></tr><tr align=\"left\" valign=\"top\"><td>Zur Weihnachtsgans hats dir dieses Jahr leider mal wieder <br>nicht gelangt,jedoch kannst du dir ein paar Stollen abgreifen!.<b>Dein Promillespiegel sinkt um 1,50 Promille pro Geb&auml;ck</b></td></tr>'
+'<tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: <input type=\"text\" name=\"menge\" id=\"menge3\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(3);\"/><br /><input type=\"hidden\" name=\"id\" value=\"11\" /><input type=\"hidden\" name=\"cat\" value=\"2\" /><input type=\"hidden\" name=\"preis\" id=\"preis3\" value=\"4.00\"/><input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent3\" value=\"400\"/><input type=\"hidden\" name=\"inventar_name\" value=\"Stollen\"/><input id=\"submitForm3\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;4,00 kaufen\"></form></td></tr></table>'
+'<form method=\"post\" action=\"/city/supermarket/buy/\">'
+'<table class=\"tieritemA\" ><tr><td width=\"105\" rowspan=\"4\" align=\"left\" valign=\"top\">'
+'<img src="http://jellybaby88.files.wordpress.com/2009/05/produkte_suessigkeiten.jpg" border="0" height="80" width="80"></td><td height=\"20\" align=\"left\" valign=\"top\"><span class=\"tiername\">Halloween - S??igkeiten</span></td></tr><tr align=\"left\" valign=\"top\"><td>Du hast gesehen, dass Kinder an Halloween massenhaft S??igkeiten ergattern und findest damit einen neuen Weg um deinen Alkoholspiegel zu senken <b>Dein Promillespiegel sinkt um 0,15 Promille pro Packung</b>.</td></tr><tr align=\"left\" valign=\"top\"><td></td></tr><tr align=\"left\" valign=\"top\"><td height=\"20\">Menge: <input type=\"text\" name=\"menge\" id=\"menge4\" size=\"3\" value=\"1\" onKeyUp=\"generatePreis(4);\"/><br /><input type=\"hidden\" name=\"id\" value=\"9\" /><input type=\"hidden\" name=\"cat\" value=\"2\" /><input type=\"hidden\" name=\"preis\" id=\"preis4\" value=\"0.40\"/>'
+'<input type=\"hidden\" name=\"preis_cent\" id=\"preis_cent4\" value=\"040\"/><input type=\"hidden\" name=\"inventar_name\" value=\"Halloween - S??igkeiten\"/>'
+'<input id=\"submitForm4\" class=\"formbutton\" type=\"submit\" name=\"submitForm\" value=\"F&uuml;r &euro;0,40 kaufen\"></form></td></tr></table>'
+'<form method=\"post\" action=\"/city/supermarket/food/\"><div class=\"menubarright\"><div class=\"submenu_shop\"><div class=\"submenu_shop\"><div class=\"top\"></div><div class=\"content\"><ul><a href=\"http://pennerhack.foren-city.de/\" target=\"_blank\" alt=\"3.1 Videos!\" title=\"3.1 Videos!\"><b>Basti1012</b></a><a href=\"/city/map/\" alt=\"Stadtkarte\" title=\"Stadtkarte\">Stadtkarte</a><a href=\"/city/district/\" alt=\"Stadtteile\" title=\"Stadtteile\">Stadtteile</a><a href=\"/city/home/\" alt=\"Eigenheim\" title=\"Eigenheim\">Eigenheim</a><a href=\"/city/scrounge/\" alt=\"Schnorrplatz\" title=\"Schnorrplatz\">Schnorrplatz</a><a href=\"/city/games/\" alt=\"Gl&uuml;cksspiele\" title=\"Gl&uuml;cksspiele\">Gl&uuml;cksspiele</a><a href=\"/city/weapon_store/\" alt=\"Waffenladen\" title=\"Waffenladen\">Waffenladen</a><a href=\"/city/pet_store/\" alt=\"Tierhandlung\" title=\"Tierhandlung\">Tierhandlung</a><a href=\"/city/supermarket/\" alt=\"Supermarkt\" title=\"Supermarkt\">Supermarkt</a><ul><a href=\"/city/supermarket/drinks/\" alt=\"Getr&auml;nke\" title=\"Getr&auml;nke\">&#155; Getr&auml;nke</a><a href=\"/city/supermarket/food/\" alt=\"Nahrung\" title=\"Nahrung\">&#155; Nahrung</a></ul><a href=\"/city/music_store/\" alt=\"Musikladen\" title=\"Musikladen\">Musikladen</a><a href=\"/city/stuff/\" alt=\"Zubeh&ouml;r\" title=\"Zubeh&ouml;r\">Zubeh&ouml;r</a><a href=\"/city/medicine/\" alt=\"Medizin\" title=\"Medizin\">Medizin</a><a href=\"/city/washhouse/\" alt=\"Waschhaus\" title=\"Waschhaus\">Waschhaus</a></ul></div><div class=\"buttom\"></div></div></div></div>';

};











