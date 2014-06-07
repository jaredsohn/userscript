// ==UserScript==
// @name           AAO Deufel
// @namespace      http://userscripts.org/users/72932
// @description    AAO Daten zum importieren
// @include        http://deufel.cspsx.de/feuerwache/aao.txt
// @version        2010-04-29
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
# Version Deufel 2010-04-29
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#


===Einsatzklassen

Auffahrunfall				F1
Baum auf Auto				TH
Baum auf Dach				F1+DL,RW
Baum auf Straße				TH
Brand auf Weihnachtsmarkt		F2
Brand in Autohaus			F3
Brand in Briefkasten			F1
Brand in Druckerei			F4+RW
Brand in KFZ-Werkstatt			F2+TLF
Brand in Kletterhalle			F4
Brand in Kühlhaus			F4
Brand in Lackfabrik			F4
Brand in Reifenlager			F3
Brand in Schloss			F3
Brand in Schule				F3
Brand in Spedition			F2+LF,RW,TLF
Brand in Sporthalle			F3
Brand in Zugdepot			F6+RW,GW-L2
Brand im Baumarkt			F4+RW
Brand im Casino				F5
Brand im Sägewerk			F3+GW-L2
Brand im Supermarkt			F2
Brand-Weihnachtsbaum in Kirche		F2
Brennende Bäume				F1
Brennende S-Bahn			F6
Brennende Telefonzelle			F1
Brennender LKW				F1
Brennender Müllwagen			F1
Brennender PKW				F1
Brennender Sicherungskasten		F1
Brennendes Gebüsch			F1
Brennendes Gras				F1
Chemieunfall (an Schule)		GSG
Chlorgas Alarm (Schwimmbad)		GSG+RW
Container Brand				F1
Dachstuhlbrand				F2
Fahrstuhl - Türöffnung			TH
Feldbrand				F8
Fettbrand in Pommesbude			F1+TLF
Feuer im Altenheim			F3
Feuer im Krankenhaus			F5
Feuer im Laubhaufen			F1
Garagenbrand				F1
Gartenlaubenbrand			F1
Gastronomiebrand			F2
Gewerbebrand				F3+RW
Kaminbrand				F2
Kellerbrand				F1+LF
Keller unter Wasser			F1
Kinobrand				F3
Kioskbrand				F1
Kleiner Waldbrand			F1
Mähdrescherbrand			F1
Motorrad-Brand				F1
Mülleimer Brand				F1
Ölspur					F1+GW-Öl
Person im Fluss				F7
PKW in Fluss				F7+RW
Scheunenbrand				F8
Schornsteinbrand			F2
Schuppenbrand				F1
Silobrand				F8
Sperrmüllbrand				F1
Strohballen Brand			F8
Traktorbrand				F1
Trocknerbrand				F1
Verkehrsunfall				VU
Wohnblockbrand				F4
Wohnungsbrand				F2
Wohnwagenbrand				F1

===Fahrzeugzuordnung

undef		LF
F1		LF
F2		LF,LF,ELW,DL
F3		LF,LF,LF,ELW,DL,GW-A
F4		LF,LF,LF,LF,ELW,DL,GW-A
F5		LF,LF,LF,LF,LF,LF,ELW,DL,GW-A
F6		LF,LF,LF,ELW,DL,GW-S
F7		LF,GW-T
F8		LF,LF,GW-L2
TH		RW
VU		RW,GW-Öl,LF
GSG		LF,ELW,GW-M,GW-G


===Fahrzeugklassen

RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	LF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DL
ELW 1			ELW
LF 16-TS		TS
RW			RW
GW-A			GW-A
GW-L2 - Wasser		GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M

===Ende
#