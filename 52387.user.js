// ==UserScript==
// @name Automatisch aktualiesieren mit auswahl buttons by basti1012
// @namespace By Basti1012 http://pennerhack.foren-city.de
// @description Oben im status wird ein auswahl menue erstellt und ein speicher button mach den klicken des buttons wird die ausgewaehlte zeit automatisch aktualiesieret.
// @include http://*pennergame.de/*
// @include http://*berlin.pennergame.de/*
// @include http://*dossergame.co.uk/*
// @include http://*menelgame.pl/*
// ==/UserScript==

var zztime = GM_getValue("zztime");
if (zztime == null){zztime = "65000";};

var table = document.getElementsByTagName('form')[0];
var td = table.getElementsByTagName('li')[6];

td.innerHTML = ''

+'<select name="auswahl" id="auswahl" size="1"'
+'onchange="auswahl"'
+'<option value="">No Reload</option>'
+'<option value="5000">In 5 Sekunde</option>'
+'<option value="10000">In 10 Sekunde</option>'
+'<option value="20000">In 20 Sekunde</option>'
+'<option value="30000">In 30 Sekunde</option>'
+'<option value="60000">In 1 Minuten</option>'
+'<option value="120000">In 2 Minuten</option>'
+'<option value="180000">In 3 Minuten</option>'
+'<option value="240000">In 4 Minuten</option>'
+'<option value="300000">In 5 Minuten</option>'
+'<option value="360000">In 6 Minuten</option>'
+'<option value="420000">In 7 Minuten</option>'
+'<option value="480000">In 8 Minuten</option>'
+'<option value="540000">In 9 Minuten</option>'
+'<option value="600000">In 10 Minuten</option>'
+'<option value="660000">In 11 Minuten</option>'
+'<option value="720000">In 12 Minuten</option>'
+'<option value="900000">In 15 Minuten</option>'
+'<option value="1200000">In 20 Minuten</option>'
+'<option value="1800000">In 30 Minuten</option>'
+'<option value="2700000">In 45 Minuten</option>'
+'<option value="3600000">In 60 Minuten</option>'
+'<option value="7200000">In 120 Minuten</option>'
+'</select></p><td class="submit"><input type ="button" name="suche" id = "suche" value = "Speichern" </form></td>';




GM_getValue("zztime");

document.getElementsByName('suche')[0].addEventListener('click', function start() {
var fert = GM_setValue("zztime", document.getElementsByName('auswahl')[0].value);
document.getElementsByName('suche')[0].disabled = "disabled";

{ 
window.location.reload();//alert("Du hast gerade "+zztime+" Lose gekauft viel Glueck beim gewinnen \mfg basti1012");
}
},false);

setTimeout("document.getElementsByName('suche')[0].click();",zztime);
//alert("Habe gerade nach"+fert+"Minuten aktualiesiert");
// Copyright by basti1012


