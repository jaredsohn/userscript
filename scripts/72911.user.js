// ==UserScript==
// @name           AAO Sawos
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-03-15
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
# Version Sawos 2010-03-10
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#

===Einsatzklassen

Auffahrunfall				F1|RTW
Baum auf Auto				TH1+GW-Öl|RTW
Baum auf Dach				TH2+DL|RTW
Baum auf Straße				TH1|RTW
Brand in Autohaus			F3+DL,GW-G,GW-M|RTW
Brand in Briefkasten			F1|RTW
Brand in Druckerei			F4+RW|RTW
Brand in KFZ-Werkstatt			F3+TLF|RTW
Brand in Kühlhaus			F4+GW-M,GW-G|RTW
Brand in Lackfabrik			F5+GW-G,GW-M|RTW
Brand in Schule				F4|RTW
Brand in Schloss			F4|RTW
Brand in Spedition			F4+RW,TLF,GW-G,GW-M|RTW
Brand in Sporthalle			F4+GW-L2|RTW
Brand in Zugdepot			F5|RTW
Brand im Baumarkt			F4+RW,GW-G,GW-M|RTW
Brand im Sägewerk			F4+GW-L2|RTW
Brand im Supermarkt			F4|RTW
Brennende Bäume				F1|RTW
Brennende S-Bahn			F2+GW-S|RTW
Brennende Telefonzelle			F1|RTW
Brennender LKW				F1|RTW
Brennender Müllwagen			F1|RTW
Brennender PKW				F1|RTW
Brennender Sicherungskasten		F1|RTW
Brennendes Gras				F1|RTW
Brennendes Gebüsch			F1|RTW
Chemieunfall (an Schule)		GSG|RTW
Chlorgas Alarm (Schwimmbad)		GSG|RTW
Container Brand				F1|RTW
Dachstuhlbrand				F2+DL|RTW
Fahrstuhl - Türöffnung			TH1|RTW
Feldbrand				F1+GW-L2|RTW
Fettbrand in Pommesbude			F3+TLF|RTW
Feuer im Altenheim			F4|RTW
Feuer im Laubhaufen			F1|RTW
Gartenlaubenbrand			F1|RTW
Garagenbrand			F1|RTW
Gastronomiebrand			F4|RTW
Gewerbebrand				F4+RW|RTW
Kaminbrand				F3+DL|RTW
Kellerbrand				F2+GW-A|RTW
Keller unter Wasser			LF|RTW
Kinobrand				F4+TLF|RTW
Kioskbrand				F1|RTW
Kleiner Waldbrand			F1|RTW
Motorrad-Brand				F1|RTW
Mähdrescherbrand				F1|RTW
Mülleimer Brand				F1|RTW
Ölspur					F1+GW-Öl|RTW
Person im Fluss				LF,GW-T,RW|RTW
PKW in Fluss				LF,GW-T|RTW
Scheunenbrand				F3+GW-L2|RTW
Schornsteinbrand			F2+DL|RTW
Schuppenbrand				F2+GW-G,GW-M|RTW
Silobrand				F3|RTW
Sperrmüllbrand				F1|RTW
Strohballen Brand			F2+GW-L2|RTW
Traktorbrand				F2+GW-Öl|RTW
Verkehrsunfall				TH2+GW-Öl|RTW
Wohnblockbrand				F4|RTW
Wohnungsbrand				F4|RTW
Wohnwagenbrand				F1|RTW
Brand auf Weihnachtsmarkt		F2|RTW
Brand-Weihnachtsbaum in Kirche	F3|RTW
# 29.03.2010
Trocknerbrand				F1|RTW
Brand in Reifenlager			F4+GW-L2,GW-M,GW-G|RTW
Brand im Casino				F5+TLF|RTW


===Fahrzeugzuordnung

NEUNEU		LF
undef		LF
F1		LF
F2		LF,LF
F3		LF,LF,LF/TLF,ELW
F4		LF,LF,LF,LF/TLF,DL,ELW,GW-A
F5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
TH1		RW/LF
TH2		RW,LF
GSG		LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G

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