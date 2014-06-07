// ==UserScript==
// @name           Swiss Orienteering Rangliste
// @namespace      aufdermauer.info
// @include        http://www.o-l.ch/cgi-bin/results?type=rang*kat*zwizt=1*
// @exclude        http://www.o-l.ch/cgi-bin/results?type=rang*kat*&s*zwizt=1*
// @description    Rangliste mit Zwischenzeiten in Tabelle darstellen
// @version        1.3
// ==/UserScript==

var script_version = "1.3";

/* Changelog ---------------------------------

1.3 (11.03.2012)
   -Zeit-Differenz zu schnellster Postenzeit wird ebenfalls angezeigt
   -Code-Vereinfachung

1.2 (10.11.2011)
   -Neu auch für Team-OL

1.1 (19.10.2011)
   -Update-Checker eingefügt
   -Änderung Farb-Priorisierung
   -Code-Vereinfachung

1.0.1 (02.10.2011)
   -Versionsnummer anzeigen
   -Code-Lesbarkeit

1.0   (30.09.2011)
   -Erste Version

---------------------------------------------- */

// Text der Rangliste einlesen
var Rangliste = document.getElementsByTagName("pre")[0];
var Text = Rangliste.innerHTML;

// Finden der Anzahl Posten
var Suche = /(\s\d|\d\d)\.\s+\d/gi;
var NumPosten = 0;
var Ergebnis;
while ( Ergebnis = Suche.exec(Text) ) {
    if ( NumPosten < parseInt(Ergebnis[1]) ) {
        NumPosten = parseInt(Ergebnis[1]);
    }
}

// Finden der Anzahl Teilnehmer
var NumTeiln = 0;
var NumPof = 0;
Suche = /\s(\s\d|\d\d)\.\s[A-ZØÄÖÜ]/gi;
while ( Ergebnis = Suche.exec(Text) ) {
    if ( NumTeiln < parseInt(Ergebnis[1]) ) {
        NumTeiln = parseInt(Ergebnis[1]);
    }
}
// Finden der Anzahl Po.f.
Suche = /Po\.f\./gi;
while ( Ergebnis = Suche.exec(Text) ) {
        NumPof++;
        NumTeiln++;
}
// Anzahl korrekte Läufe
var NumKorr = NumTeiln-NumPof;

// Titel neue Tabelle
var NewTitle = document.createElement('pre');
NewTitle.setAttribute('id','NewTitle');
NewTitle.innerHTML = "Rangliste in Tabellen-Form:\n";
NewTitle.style.fontSize = "18";
NewTitle.style.fontFamily = "Arial,Helvetica";
Rangliste.parentNode.insertBefore(NewTitle, Rangliste);

// Text unterhalb Titel
var BelowTitle = document.createElement('pre');
BelowTitle.setAttribute('id','BelowTitle');
BelowTitle.innerHTML = "(powered by userscript: Swiss Orienteering Rangliste v"+script_version+")\n\n";
BelowTitle.style.fontSize = "10";
BelowTitle.style.fontFamily = "Arial,Helvetica";
NewTitle.appendChild(BelowTitle);

// Funktionen
function CellColor(rang) {
    color = "";
    if ( rang == Math.floor(NumKorr/2)-1 ) {
        color = "#FFFFCC"; // lighter yellow
    }
    if ( rang == Math.floor(NumKorr/2)+1 ) {
        color = "#FFFFCC"; // lighter yellow
    }
    if ( rang == Math.floor(NumKorr/2) ) {
        color = "#FFFF00"; // yellow
    }
    if ( rang == (NumKorr-1) ) {
        color = "#FFD4D4"; // lighter red
    }
    if ( rang == 2 ) {
        color = "#D1FFD1"; // lighter green
    }
    if ( rang >= NumKorr ) {
        color = "#FF9494"; // light red
    }
    if ( rang == 1 ) {
        color = "#66FF66"; // light green
    }
    return color;
}

// Einfügen neue Tabelle
var row = new Array();
var cell = new Array();

var kr = NumPosten;
var ranglines = '[\\S ]+\\n[\\S ]+\\n[\\S ]+\\n[\\S ]+\\n';
while ( kr > 4 ) {
    ranglines = ranglines + '[\\S ]+\\n[\\S ]+\\n[\\S ]+\\n';
    kr = kr-5;
}
ranglines = ranglines + '\<*b*\>*';
var nameregexp = '[A-ZØÄÖÜ]+[^\\t\\r\\n\\v\\f\:\\d]+\\d*\\s*[^\\t\\r\\n\\v\\f\:\\d]+';

var NewTable = document.createElement('table');
NewTable.setAttribute('id','NewTable');
var TableBody = document.createElement('tbody');
for ( c = 0; c < (NumTeiln+1); c++ ) {

    var d = c-1;

    var Loops = c - NumKorr - 1;
    var loopranglines = ranglines;
    while ( Loops > 0 ) {
        loopranglines = loopranglines + ranglines;
        Loops--;
    }

    row[c] = document.createElement('tr');

    for ( k = 0; k < (NumPosten+2); k++ ) {

        var kn = k;
        var kntest = k % 5;
        if ( kntest == 0 ) {
            kntest = 5;
        }
        var lines = '[\\S ]+\\n';
        while ( kn > kntest ) {
            lines = lines + '[\\S ]+\\n[\\S ]+\\n[\\S ]+\\n';
            kn = kn-5;
        }

        cell[k] = document.createElement('td');

        var pos_rang = '\\d+\\.\\s+\\d+\\.\\d+\\s*\\(\\d+\\)\\s+';
        var pos_rang_pof = '\\d+\\.\\s+\\d*\\.*\\d*\\-*\\-*\\s*\\(\\d*\\)\\s+';
        var pos_post = '\\d+\\s+\\d+\\.\\d+\\s*\\(\\d+\\)\\s+';
        var pos_post_pof = '\\d+\\s+\\d*\\.*\\d*\\-*\\-*\\s*\\(\\d*\\)\\s+';
        var pos_diff = '\\d+\\.\\d+\\s+';
        var pos_diff_pof = '\\d*\\.*\\d*\\s*';

        if ( c == 0 && k == 0 ) { // Erste Zelle, erste Zeile
            cell[k].innerHTML = "Rang / Name";

            // Formatierung
            cell[k].style.fontWeight = "bold";

        } // Erste Zelle, erste Zeile
        else if ( c == 0 && k > 0 && k < (NumPosten+1) ) { // Posten-Nummern, erste Zeile

            // Posten-Nummern finden
            var zw_posten = ''; // if ( k % 5 == 1 )
            if ( k % 5 == 2 ) {
                zw_posten = pos_post;
            }
            else if ( k % 5 == 3 ) {
                zw_posten = pos_post+pos_post;
            }
            else if ( k % 5 == 4 ) {
                zw_posten = pos_post+pos_post+pos_post;
            }
            else if ( k % 5 == 0 ) {
                zw_posten = pos_post+pos_post+pos_post+pos_post;
            }
            Suche = new RegExp('\\s'+k+'\\.\\s+\\d.+\\n\\s+'+zw_posten+'(\\d\\d\\d|\\d\\d)','gi');

            // Posten-Nummer in Zelle einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = k + ".<br>" + Ergebnis[1];
            } else {
                cell[k].innerHTML = k + ".<br>nf";
            }

            // Formatierung
            cell[k].align = "right";
            cell[k].style.fontWeight = "bold";

        } // Posten-Nummern, erste Zeile
        else if ( c == 0 && k == (NumPosten+1) ) { // Letzte Zelle, erste Zeile
            cell[k].innerHTML = "Ziel";

            // Formatierung
            cell[k].align = "right";
            cell[k].style.fontWeight = "bold";

        } // Letzte Zelle, erste Zeile
        else if ( c > 0 && c <= NumKorr && k == 0 ) { // Rang, Name, erste Spalte

            Suche = new RegExp('\\s+'+c+'\\.\\s('+nameregexp+')','i');

            // Rang, Name in Zelle einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = c + ". " + Ergebnis[1];
            }
            else { // Exakt die gleiche Schlusszeit
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s('+nameregexp+')','i');
                Ergebnis = Suche.test(Text);
                if ( Ergebnis == true ) {
                    Ergebnis = Suche.exec(Text);
                    cell[k].innerHTML = "&nbsp;&nbsp;&nbsp;" + Ergebnis[1];
                }
                else {
                    cell[k].innerHTML = "&nbsp;&nbsp;&nbsp;" + "nf";
                }
            } 

            // Formatierung
            cell[k].style.fontWeight = "bold";
            cell[k].style.width = "200px";

        } // Rang, Name, erste Spalte
        else if ( c > 0 && c <= NumKorr && k > 0 && k < (NumPosten+1) ) { // Haupteinträge, Kumulierte Zeit, Posten-Zeit, Zeit-Diff zu schnellster Zeit

            // Zeile hinzu falls Team-OL
            Suche = new RegExp('\\s+1\\.\\s[A-ZØÄÖÜ]+[\\S ]+\\n\\s+1\\.\\s+','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                lines = lines + '[\\S ]+\\n';
            }

            // Kumulierte Zeit inkl. Rang finden
            var krang = k % 5;
            if ( krang == 0 ) {
                krang = 5;
            }
            var set_pos_rang = '';
            while ( krang > 1 ) {
                set_pos_rang = set_pos_rang + pos_rang;
                krang = krang-1;
            }
            Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang+k+'\\.\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang+k+'\\.\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');
            }
            
            // Kumulierte Zeit inkl. Rang einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = Ergebnis[1];
            } else {
                cell[k].innerHTML = "nf";
            }

            // Posten-Zeit inkl. Rang finden
            var kpos = k % 5;
            if ( kpos == 0 ) {
                kpos = 5;
            }
            var set_pos_rang = '';
            var set_pos_post = '';
            while ( kpos > 1 ) {
                set_pos_rang = set_pos_rang + pos_rang;
                set_pos_post = set_pos_post + pos_post;
                kpos = kpos-1;
            }
            Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang+k+'\\.[\\S ]+\\n\\s+'+set_pos_post+'\\d+\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang+k+'\\.[\\S ]+\\n\\s+'+set_pos_post+'\\d+\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');
            }

            // Posten-Zeit inkl. Rang einfügen, zusätzlich Farben einfügen
            var Halter = cell[k].innerHTML;
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                Suche = /\((\d+)\)/gi;
                var Ergebnis2 = Suche.exec(Ergebnis[1]);
                if ( Ergebnis2[1] < c ) {
                    cell[k].innerHTML = Halter + "<br>" + "<font color=\"green\">" + Ergebnis[1] + "</font>";
                }
                else if ( Ergebnis2[1] > c ) {
                    cell[k].innerHTML = Halter + "<br>" + "<font color=\"red\">" + Ergebnis[1] + "</font>";
                }
                else {
                    cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
                }
                cell[k].bgColor = CellColor( Ergebnis2[1] );
            } else {
                cell[k].innerHTML = Halter + "<br>" + "nf";
            }

            // Zeit-Diff zu schnellster Zeit finden
            var kdiff = k % 5;
            if ( kdiff == 0 ) {
                kdiff = 5;
            }
            var set_pos_rang = '';
            var set_pos_diff = '';
            while ( kdiff > 1 ) {
                set_pos_rang = set_pos_rang + pos_rang;
                set_pos_diff = set_pos_diff + pos_diff;
                kdiff = kdiff-1;
            }
            Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang+k+'\\.[\\S ]+\\n[\\S ]+\\n\\s+'+set_pos_diff+'(\\d+\\.\\d+)','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang+k+'\\.[\\S ]+\\n[\\S ]+\\n\\s+'+set_pos_diff+'(\\d+\\.\\d+)','i');
            }

            // Zeit-Diff zu schnellster Zeit einfügen
            var Halter = cell[k].innerHTML;
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                if ( Ergebnis[1] >= 2 ) {
                    cell[k].innerHTML = Halter + "<br>" + "<font color=\"red\">" + "<b>" + Ergebnis[1] + "</b>" + "</font>";
                }
                else if ( Ergebnis[1] >= 1 ) {
                    cell[k].innerHTML = Halter + "<br>" + "<b>" + Ergebnis[1] + "</b>";
                }
                else {
                    cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
                }
            } else {
                cell[k].innerHTML = Halter + "<br>" + "nf";
            }

            // Formatierung
            cell[k].align = "right";

        } // Haupteinträge, Kumulierte Zeit, Posten-Zeit, Zeit-Diff zu schnellster Zeit
        else if ( c > 0 && c <= NumKorr && k == (NumPosten+1) ) { // Ziel, Kumulierte Zeit, Posten-Zeit, Zeit-Diff zu schnellster Zeit, letzte Spalte

            // Zeile hinzu falls Team-OL
            Suche = new RegExp('\\s+1\\.\\s[A-ZØÄÖÜ]+[\\S ]+\\n\\s+1\\.\\s+','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                lines = lines + '[\\S ]+\\n';
            }

            // Kumulierte Zeit inkl. Rang finden
            Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+[\\S ]+(\\d\:\\d\\d\:\\d\\d)','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+[\\S ]+(\\d\\d\:\\d\\d)','i');
                Ergebnis = Suche.test(Text);
                if ( Ergebnis == false ) {
                    Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+[\\S ]+(\\d\:\\d\\d\:\\d\\d)','i');
                    Ergebnis = Suche.test(Text);
                    if ( Ergebnis == false ) {
                        Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+[\\S ]+(\\d\\d\:\\d\\d)','i');
                    }
                }
            }

            // Kumulierte Zeit inkl. Rang einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = Ergebnis[1] + "&nbsp;(" + c + ")";
            } else {
                cell[k].innerHTML = "nf";
            }

            // Posten-Zeit inkl. Rang finden
            lines = lines + '[\\S ]+\\n';
            Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');
            }

            // Posten-Zeit inkl. Rang einfügen, zusätzlich Farben einfügen
            Halter = cell[k].innerHTML;
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                Suche = /\((\d+)\)/gi;
                Ergebnis2 = Suche.exec(Ergebnis[1]);
                if ( Ergebnis2[1] < c ) {
                    cell[k].innerHTML = Halter + "<br>" + "<font color=\"green\">" + Ergebnis[1] + "</font>";
                }
                else if ( Ergebnis2[1] > c ) {
                    cell[k].innerHTML = Halter + "<br>" + "<font color=\"red\">" + Ergebnis[1] + "</font>";
                }
                else {
                    cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
                }
                cell[k].bgColor = CellColor( Ergebnis2[1] );
            } else {
                cell[k].innerHTML = Halter + "<br>" + "nf";
            }

            // Zeit-Diff zu schnellster Zeit finden
            Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+[\\S ]+\\n\\s+'+set_pos_diff+pos_diff+'(\\d+\\.\\d+)','i');
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+[\\S ]+\\n\\s+'+set_pos_diff+pos_diff+'(\\d+\\.\\d+)','i');
            }
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+c+'\\.\\s[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+[\\S ]+\\n\\s+(\\d+\\.\\d+)','i');
            }
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == false ) {
                Suche = new RegExp('\\s+'+d+'\\.\\s'+ranglines+'\\s+'+d+'\\.\\s[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+[\\S ]+\\n\\s+(\\d+\\.\\d+)','i');
            }

            // Zeit-Diff zu schnellster Zeit einfügen, zusätzlich Farben einfügen
            var Halter = cell[k].innerHTML;
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
            } else {
                cell[k].innerHTML = Halter + "<br>" + "nf";
            }

            // Formatierung
            cell[k].align = "right";

        } // Ziel, Kumulierte Zeit, Posten-Zeit, Zeit-Diff zu schnellster Zeit, letzte Spalte
        else if ( c > NumKorr && c <= NumTeiln && k == 0 ) { // Rang, Name, erste Spalte (bei Po.f.)

            Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+('+nameregexp+')','i');

            // Rang, Name in Zelle einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                Suche = /(.*)Po\.f\./gi;
                Ergebnis2 = Suche.exec(Ergebnis[1]);
                cell[k].innerHTML = "&nbsp;&nbsp;&nbsp;" + Ergebnis2[1];
            }
            else {
                cell[k].innerHTML = "&nbsp;&nbsp;&nbsp;" + "nf";
            }

            // Formatierung
            cell[k].style.fontWeight = "bold";

        } // Rang, Name, erste Spalte (bei Po.f.)
        else if ( c > NumKorr && c <= NumTeiln && k > 0 && k < (NumPosten+1) ) { // Haupteinträge, Kumulierte Zeit, Posten-Zeit (bei Po.f.)

            // Kumulierte Zeit inkl. Rang finden
            var krang = k % 5;
            if ( krang == 0 ) {
                krang = 5;
            }
            var set_pos_rang_pof = '';
            while ( krang > 1 ) {
                set_pos_rang_pof = set_pos_rang_pof + pos_rang_pof;
                krang = krang-1;
            }
            Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang_pof+k+'\\.\\s+((\\d+\\.\\d+|\\-\\-)\\s*\\(\\d*\\))','i');

            // Kumulierte Zeit inkl. Rang einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = Ergebnis[1];
            } else {
                cell[k].innerHTML = "nf";
            }

            // Posten-Zeit inkl. Rang finden
            var kpos = k % 5;
            if ( kpos == 0 ) {
                kpos = 5;
            }
            var set_pos_rang_pof = '';
            var set_pos_post_pof = '';
            while ( kpos > 1 ) {
                set_pos_rang_pof = set_pos_rang_pof + pos_rang_pof;
                set_pos_post_pof = set_pos_post_pof + pos_post_pof;
                kpos = kpos-1;
            }
            Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang_pof+k+'\\.[\\S ]+\\n\\s+'+set_pos_post_pof+'\\d+\\s+((\\d+\\.\\d+|\\-\\-)\\s*\\(\\d*\\))','i');

            // Posten-Zeit inkl. Rang einfügen, zusätzlich Farben einfügen
            Halter = cell[k].innerHTML;
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                Suche = /\(\)/gi;
                Ergebnis2 = Suche.test(Ergebnis[1]);
                
                if ( Ergebnis2 == true ) {
                    cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
                }
                else {
                    Suche = /\((\d+)\)/gi;
                    var Ergebnis3 = Suche.exec(Ergebnis[1]);
                    if ( Ergebnis3[1] < c ) {
                        cell[k].innerHTML = Halter + "<br>" + "<font color=\"green\">" + Ergebnis[1] + "</font>";
                    }
                    else if ( Ergebnis3[1] > c ) {
                        cell[k].innerHTML = Halter + "<br>" + "<font color=\"red\">" + Ergebnis[1] + "</font>";
                    }
                    else {
                        cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
                    }
                    cell[k].bgColor = CellColor( Ergebnis3[1] );
                }
            }
            else {
                cell[k].innerHTML = Halter + "<br>" + "nf";
            }

            // Zeit-Diff zu schnellster Zeit finden
//             var kdiff = k % 5;
//             if ( kdiff == 0 ) {
//                 kdiff = 5;
//             }
//             var set_pos_rang_pof = '';
//             var set_pos_diff_pof = '';
//             while ( kdiff > 1 ) {
//                 set_pos_rang_pof = set_pos_rang_pof + pos_rang_pof;
//                 set_pos_diff_pof = set_pos_diff_pof + pos_diff_pof;
//                 kdiff = kdiff-1;
//             }
//             Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+set_pos_rang_pof+k+'\\.[\\S ]+\\n[\\S ]+\\n\\s+'+set_pos_diff_pof+'(\\d+\\.\\d+)','i');

            // Zeit-Diff zu schnellster Zeit einfügen
//             var Halter = cell[k].innerHTML;
//             Ergebnis = Suche.test(Text);
//             if ( Ergebnis == true ) {
//                 Ergebnis = Suche.exec(Text);
//                 if ( Ergebnis[1] >= 2 ) {
//                     cell[k].innerHTML = Halter + "<br>" + "<font color=\"red\">" + "<b>" + Ergebnis[1] + "</b>" + "</font>";
//                 }
//                 else if ( Ergebnis[1] >= 1 ) {
//                     cell[k].innerHTML = Halter + "<br>" + "<b>" + Ergebnis[1] + "</b>";
//                 }
//                 else {
//                     cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
//                 }
//             } else {
//                 cell[k].innerHTML = Halter + "<br>" + "nf";
//             }

            // Formatierung
            cell[k].align = "right";

        } // Haupteinträge, Kumulierte Zeit, Posten-Zeit (bei Po.f.)
        else if ( c > NumKorr && c <= NumTeiln && k == (NumPosten+1) ) { // Ziel, Kumulierte Zeit, Posten-Zeit, letzte Spalte (bei Po.f.)

            // Kumulierte Zeit inkl. Rang finden
            if ( k % 5 == 1 ) {
                Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+((\\d+\\.\\d+|\\-\\-)\\s*)','i');
            }
            else if ( k % 5 == 2 ) {
                Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+pos_rang_pof+'\\s+((\\d+\\.\\d+|\\-\\-)\\s*)','i');
            }
            else if ( k % 5 == 3 ) {
                Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+pos_rang_pof+pos_rang_pof+'\\s+((\\d+\\.\\d+|\\-\\-)\\s*)','i');
            }
            else if ( k % 5 == 4 ) {
                Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+pos_rang_pof+pos_rang_pof+pos_rang_pof+'\\s+((\\d+\\.\\d+|\\-\\-)\\s*)','i');
            }
            else if ( k % 5 == 0 ) {
                Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'\\s+'+pos_rang_pof+pos_rang_pof+pos_rang_pof+pos_rang_pof+'\\s+((\\d+\\.\\d+|\\-\\-)\\s*)','i');
            }

            // Kumulierte Zeit inkl. Rang einfügen
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                cell[k].innerHTML = Ergebnis[1] + " (Po.f.)";
            } else {
                cell[k].innerHTML = "nf";
            }

            // Posten-Zeit inkl. Rang finden
            lines = lines + '[\\S ]+\\n';
            Suche = new RegExp('\\s+'+NumKorr+'\\.\\s'+loopranglines+'\\s+[A-ZØÄÖÜ]+'+lines+'[\\S ]+Zi\\s+(\\d+\\.\\d+\\s*\\(\\d+\\))','i');

            // Posten-Zeit inkl. Rang einfügen, zusätzlich Farben einfügen
            Halter = cell[k].innerHTML;
            Ergebnis = Suche.test(Text);
            if ( Ergebnis == true ) {
                Ergebnis = Suche.exec(Text);
                Suche = /\((\d+)\)/gi;
                Ergebnis2 = Suche.exec(Ergebnis[1]);
                if ( Ergebnis2[1] < c ) {
                    cell[k].innerHTML = "<font color=\"green\">" + Halter + "<br>" + Ergebnis[1] + "</font>";
                }
                else if ( Ergebnis2[1] > c ) {
                    cell[k].innerHTML = "<font color=\"red\">" + Halter + "<br>" + Ergebnis[1] + "</font>";
                }
                else {
                    cell[k].innerHTML = Halter + "<br>" + Ergebnis[1];
                }
                cell[k].bgColor = CellColor( Ergebnis2[1] );
            } else {
                cell[k].innerHTML = Halter + "<br>" + "nf";
            }

            // Formatierung
            cell[k].align = "right";

        } // Ziel, Kumulierte Zeit, Posten-Zeit, letzte Spalte (bei Po.f.)
        else { // Sollte nicht aufgerufen werden
            cell[k].innerHTML = "cell";
        } // Sollte nicht aufgerufen werden
        row[c].appendChild(cell[k]);
    }
    TableBody.appendChild(row[c]);
}
NewTable.appendChild(TableBody);
BelowTitle.appendChild(NewTable);

// Titel alte Tabelle
var OldTitle = document.createElement('pre');
OldTitle.setAttribute('id','OldTitle');
OldTitle.innerHTML = "\nStandard-Form:\n\n";
OldTitle.style.fontSize = "18";
OldTitle.style.fontFamily = "Arial,Helvetica";
Rangliste.parentNode.insertBefore(OldTitle, Rangliste);

// Code below from: http://userscripts.org/scripts/show/20145
// Name: Script Update Checker
// Namespace: http://www.crappytools.net
// Description: Code to add to any Greasemonkey script to let it check for updates.

// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to userscripts.org. The update checks will -not- increase the install count for the script there.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this.

var SUC_script_num = 114282;

try {
    function updateCheck(forced) {
        if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) { // Checks once a day (24 h * 60 m * 60 s * 1000 ms) = 86400000 ms
            try {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
                    headers: {'Cache-Control': 'no-cache'},
                    onload: function(resp) {
                        var local_version, remote_version, rt, script_name;
                        
                        rt=resp.responseText;
                        GM_setValue('SUC_last_update', new Date().getTime()+'');
                        remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
                        local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
                        if(local_version!=-1) {
                            script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
                            GM_setValue('SUC_target_script_name', script_name);
                            if (remote_version > local_version) {
                                if(confirm('There is an update available for the Greasemonkey script "'+script_name+'".\nWould you like to go to the install page now?')) {
                                    GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
                                    GM_setValue('SUC_current_version', remote_version);
                                }
                            }
                            else if (forced) alert('No update is available for "'+script_name+'."');
                        }
                        else GM_setValue('SUC_current_version', remote_version+'');
                    }
                });
            }
            catch (err) {
                if (forced)
                    alert('An error occurred while checking for updates:\n'+err);
            }
        }
    }
    GM_registerMenuCommand( GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function() { updateCheck(true); } );
    updateCheck(false);
}
catch (err) {}
