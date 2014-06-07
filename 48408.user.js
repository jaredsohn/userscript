// ==UserScript==
// @name        Pennergame spenden statistik und schloss durch spenden finanzieren fuer pennergame hamburg und berlin by basti1012
// @namespace   copiright by basti1012  http://pennergame-basti1012.foren-city.de
// @description Zeigt die auf der uebersichtsseite eine umfangreiche Auflistung der spenden durchschitte und wie viel fehlt zum schloss
// @include     *pennergame.de/overview*
// ==/UserScript==
ul = document.getElementsByClassName('first')[2];
li = ul.getElementsByTagName('li');
var kurs = document.getElementById('pfandflaschen_kurs_ajax').innerHTML; 				// Pfandkurs abfragen
anzahl = li[1].innerHTML.split('<strong>')[1].split('</strong>')[0];					// anzahl der spenden abfragen
geld = li[2].innerHTML.split(unescape("%u20AC"))[1].split('</strong>')[0].replace(/\./, '').replace(/,/, '.'); // abfrage des geldes durch spenden erhalten
durchschnitt = Math.round((geld/anzahl)*100)/100							// Durchschnittswert errechnen
geld3 = Math.round((590000-geld)*100)/100								// noch geld zum schloss
durchschnitt1 = Math.round((geld3/geld)/10)*10								// Spenden errechnen ca wie viel spenden werden noch benoetigt
anzahl1 = Math.round((geld/kurs)*1000)/10								// wie viel flaschen habe ich gespart durch spendenh
kurs11 = Math.round((geld3/11)*100)/1									//
kurs12 = Math.round((geld3/12)*100)/1									//
kurs13 = Math.round((geld3/13)*100)/1									//
kurs14 = Math.round((geld3/14)*100)/1									//
kurs15 = Math.round((geld3/15)*100)/1									//
kurs16 = Math.round((geld3/16)*100)/1									//
kurs17 = Math.round((geld3/17)*100)/1									//
kurs18 = Math.round((geld3/18)*100)/1									//
kurs20 = Math.round((geld3/20)*100)/1									//
var newText = '<br><br><br><b><b><u><span style=\"color:yellow;\">Durchschnittspenden Statistik.</span></u></b><br>Du hast schon <span style=\"color:#FF0000;\">&nbsp;'+anzahl+'</span> &nbsp;<span style=\"color:blue;\"> Spenden </span>bekommen<br>Im Durchschnitt hast du &nbsp;<strong><span style=\"color:#FF0000;\">'+ durchschnitt +'</span>&nbsp;Euro</strong> &nbsp;<span style=\"color:blue;\">pro Spende</span> &nbsp; bekommen.<br>Insgesamt hast du <span style=\"color:#FF0000;\">&nbsp;'+geld+'</span>&nbsp;Euro &nbsp;Durch Spenden geschnorrt<br> W&uuml;rdest du das Kanzleramt durch Spenden finazieren,<br> brauchst du noch<span style=\"color:#FF0000;\"> &nbsp;'+geld3+'&nbsp;</span> <span style=\"color:blue;\">&nbsp;Euro </span> &nbsp;<br>Bei deinen jetzigen Durchschnittswert,<br>brauchst du noch <span style=\"color:#FF0000;\">&nbsp;'+durchschnitt1+'</span>&nbsp;<span style=\"color:blue;\">&nbsp;Spenden </span> &nbsp;<br> Durch deine erhaltene  spenden brauchst du jetzt,<br><span style=\"color:#FF0000;\"> &nbsp;'+anzahl1+'</span>&nbsp;<span style=\"color:blue;\">&nbsp;Flaschen </span> &nbsp;wenniger sammeln,<br>bei den jetzigen Kurs von &nbsp;<span style=\"color:#FF0000;\">&nbsp;'+kurs+' </span><span style=\"color:blue;\">Cent </span> &nbsp;</span>'
+'<br><br>F&uuml;r das Kanzleramt brauchst du also noch,<span style=\"color:#FF0000;\">'+geld3+'&nbsp;</span> <span style=\"color:blue;\">&nbsp;Euro</span>'
+'<br>Wenn der Pfandkurs Bei,'
+'<br><span style=\"color:#FF0000;\">11</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs11+'</span> &nbsp; <span style=\"color:blue;\">Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">12</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs12+'</span> &nbsp; <span style=\"color:blue;\">Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">13</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs13+'</span> &nbsp; <span style=\"color:blue;\">Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">14</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs14+'</span> &nbsp; <span style=\"color:blue;\"> Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">15</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs15+'</span> &nbsp; <span style=\"color:blue;\"> Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">16</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs16+'</span> &nbsp; <span style=\"color:blue;\"> Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">17</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs17+'</span> &nbsp; <span style=\"color:blue;\"> Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">18</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs18+'</span> &nbsp; <span style=\"color:blue;\"> Flaschen</span> &nbsp;'
+'<br><span style=\"color:#FF0000;\">20</span> &nbsp; <span style=\"color:blue;\">cent </span> &nbsp;ist brauchst du noch <span style=\"color:#FF0000;\">'+kurs20+'</span> &nbsp; <span style=\"color:blue;\"> Flaschen</span> &nbsp;'
var table = document.getElementsByClassName('clearcontext')[0];
table.innerHTML = table.innerHTML + newText;
// copiright by basti1012