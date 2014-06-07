// ==UserScript==
// @name Punkte und Stadtsuche fuer berlin
// @namespace Basti1012 Stadt und Punkte suche fuer Berlin
// @description neue suche berlin gibt die Punktesuche und Stadtsuche frei fuer berlin
// @include *berlin.pennergame.de/highscore/*
// @include *http://highscre.berlin.pennergame.de/highscore*
// @include *http://highscre.berlin*
// ==/UserScript==
var newtext = '<h1>Bastis Berliner Stadtsuche Highscore</h1>'
+'<div class="settingpoint"><form method="GET" action="/highscore/search/">'
+'<div class="pagination"><ul>'
+'<tr><td height="15" colspan="3" align="left" valign="top"><span class="tiername">Spieler suchen&nbsp;&nbsp;</span></td>'
+'<td width="200"><input name="name" maxlength="28" type="text" style="width: 50%;"></td>'
+'<td width="30">&nbsp;</td><td width="100"><input class="formbutton" type="submit" value="Suche starten"  style="width: 20%;"></td>'
+'</tr><tr height="8"><td colspan="6"><hr size="1"></td><tr>' 


+'<br>'
+'<div class="pagination"><ul>'
+'<tr><td height="1" colspan="3" align="left" valign="top"><span class="tiername">Stadtteil filtern</span>'
+'<hr size="1"></td></tr><tr><td width="120"><select name="city_filter"><option value="0">Alle Stadtteile</option>'
+'<option value="54" >Adlershof</option><option value="72" >Alt-Hohenschönhausen</option><option value="48" >Alt-Treptow</option>'
+'<option value="53" >Altglienicke</option><option value="50" >Baumschulenweg</option><option value="63" >Biesdorf</option><option value="5"  >Blankenburg</option>'
+'<option value="9"  >Blankenfelde</option><option value="55" >Bohnsdorf</option><option value="44" >Britz</option>'
+'<option value="10" >Buch</option><option value="45" >Buckow</option><option value="14" >Charlottenburg</option>'
+'<option value="19" >Charlottenburg-Nord</option><option value="34" >Dahlem</option><option value="90" >Falkenberg</option>'
+'<option value="28" >Falkenhagener Feld</option><option value="73" >Fennpfuhl</option><option value="11" >Französisch Buchholz</option>'
+'<option value="38" >Friedenau</option><option value="67" >Friedrichsfelde</option>'
+'<option value="58" >Friedrichshagen</option><option value="1"  >Friedrichshain</option>'
+'<option value="25" >Gatow</option><option value="89" >Gesundbrunnen</option><option value="47" >Gropiusstadt</option><option value="60" >Grünau</option>'
+'<option value="17" >Grunewald</option><option value="27" >Hakenfelde</option><option value="20" >Halensee</option>'
+'<option value="86" >Hansaviertel</option><option value="22" >Haselhorst</option><option value="77" >Heiligensee</option>'
+'<option value="6"  >Heinersdorf</option><option value="66" >Hellersdorf</option><option value="79" >Hermsdorf</option>'
+'<option value="51" >Johannisthal</option><option value="68" >Karlshorst</option><option value="7"  >Karow</option>'
+'<option value="64" >Kaulsdorf</option><option value="26" >Kladow</option><option value="94" >Konradshöhe</option>'
+'<option value="57" >Köpenick</option><option value="2"  >Kreuzberg</option><option value="32" >Lankwitz</option>'
+'<option value="69" >Lichtenberg</option><option value="42" >Lichtenrade</option><option value="31" >Lichterfelde</option><option value="81" >Lübars</option>'
+'<option value="65" >Mahlsdorf</option><option value="92" >Malchow</option><option value="40" >Mariendorf</option><option value="41" >Marienfelde</option>'
+'<option value="83" >Märkisches Viertel</option><option value="62" >Marzahn</option><option value="84" >Mitte</option><option value="85" >Moabit</option>'
+'<option value="61" >Müggelheim</option><option value="71" >Neu-Hohenschönhausen</option><option value="43" >Neukölln</option>'
+'<option value="52" >Niederschöneweide</option><option value="12" >Niederschönhausen</option><option value="35" >Nikolassee</option>'
+'<option value="56" >Oberschöneweide</option><option value="8"  >Pankow</option><option value="49" >Plänterwald</option>'
+'<option value="3"  >Prenzlauer Berg</option><option value="59" >Rahnsdorf</option><option value="75" >Reinickendorf</option>'
+'<option value="13" >Rosenthal</option><option value="46" >Rudow</option><option value="74" >Rummelsberg</option>'
+'<option value="16" >Schmargendorf</option><option value="93" >Schmöckwitz</option><option value="37" >Schöneberg</option>'
+'<option value="23" >Siemensstadt</option><option value="21" >Spandau</option><option value="24" >Staaken</option><option value="30" >Steglitz</option>'
+'<option value="76" >Tegel</option><option value="39" >Tempelhof</option><option value="87" >Tiergarten</option><option value="80" >Waidmannslust</option>'
+'<option value="36" >Wannsee</option><option value="91" >Wartenberg</option><option value="88" >Wedding</option>'
+'<option value="4"  >Weißensee</option<option value="18" >Westend</option><option value="29" >Wilhelmstadt</option>'
+'<option value="15" >Wilmersdorf</option><option value="82" >Wittenau</option><option value="33" >Zehlendorf</option>'
+'</select></td>'
+'<td><input class="formbutton" type="submit" value="Anzeigen"></form></td><td></td></tr>'
	
+'<tr><td height="15" colspan="3" align="left" valign="top">     <span class="tiername">Nach Punkten ausw&auml;hlen</span>'
+'<hr size="1"><form method="GET" action="/highscore/range/"><table border="0" cellspacing="0" cellpadding="0">'
+'<td width="173" height="20"><tr>'
+'<tr><td width="173"><div align="right">Mindestens</div></td><td width="255"><input name="min_points" maxlength="10" size="10" type="text" /> Punkte</td>'
+'</tr><tr><td><div align="right">Maximal</div></td><td width="255"><input name="max_points" maxlength="10" size="10" type="text" /> '
+'Punkte</td></tr><tr><td>&nbsp;</td><td><div align="right"><input class="formbutton" type="submit" value="Suchen" /></div></td>'
+'</tr></table></td></tr>';

document.getElementById('content').innerHTML +=''+newtext+'';

//Copyright by basti1012