// ==UserScript==
// @name           AAO Bluebird
// @namespace      http://userscripts.org/scripts/show/73206
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-04-10
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

Auffahrunfall				LF
Baum auf Auto				TH2+GW-Öl
Baum auf Dach				TH2+DL
Baum auf Straße				LF/RW
Brand in Autohaus			F3+DL,GW-A,ELW|GW-M
Brand in Briefkasten			LF/TLF
Brand in Druckerei			F3+DL,RW,GW-L2,GW-A
Brand in KFZ-Werkstatt			F2+DL
Brand in Lackfabrik			F4+DL,GW-A,ELW|GW-M,GW-G
Brand in Reifenlager			F4+DL,GW-L2|GW-M
Brand in Schule				F2+DL,GW-A,ELW
Brand in Spedition			F2+DL,TLF,RW,GW-L2,ELW|GW-M,GW-G
Brand in Sporthalle			F3+DL,TLF,GW-L2,GW-A,ELW
Brand in Zugdepot			F4+DL,RW,GW-L2,GW-S,ELW
Brand im Baumarkt			F3+DL,RW,GW-A,ELW|GW-M,GW-G
Brand im Casino				F8+DL,GW-L2,GW-A,ELW
Brand im Sägewerk			F3+DL,TLF,GW-L2,GW-A,ELW
Brand im Supermarkt			F2+DL
Brennende Bäume				LF
Brennende S-Bahn			F2+GW-S
Brennende Telefonzelle			LF/TLF
Brennender LKW				LF/TLF
Brennender Müllwagen			LF/TLF
Brennender PKW				LF/TLF
Brennender Sicherungskasten		LF/TLF
Brennendes Gras				LF/TLF
Chemieunfall (an Schule)		GSG1
Chlorgas Alarm (Schwimmbad)		GSG2
Container Brand				LF/TLF
Dachstuhlbrand				F2+DL
Fahrstuhl - Türöffnung			TH1
Feldbrand				LF/TLF,GW-L2
Fettbrand in Pommesbude			F2+TLF
Feuer im Altenheim			F3+DL,GW-A,ELW
Feuer im Laubhaufen			LF/TLF
Gartenlaubenbrand			LF/TLF
Gastronomiebrand			F2+DL
Gewerbebrand				F3+DL,RW,GW-A,ELW
Kellerbrand				F2
Keller unter Wasser			LF/TLF/RW
Kinobrand				F2+DL,TLF,GW-A,ELW
Kleiner Waldbrand			LF/TLF
Motorrad-Brand				LF/TLF
Mülleimer Brand				LF/TLF
Ölspur					LF,GW-Öl
Person im Fluss				LF,GW-T
Scheunenbrand				F2+DL,GW-L2
Schornsteinbrand			F2+DL
Schuppenbrand				LF/TLF|GW-M,GW-G
Silobrand				F2+DL
Sperrmüllbrand				LF/TLF
Strohballen Brand			LF/TLF,GW-L2
Traktorbrand				LF/TLF
Trocknerbrand				LF
Verkehrsunfall				TH2+GW-Öl
Wohnblockbrand				F4+DL,GW-A,ELW
Wohnungsbrand				LF,DL
Wohnwagenbrand				LF/TLF
Brand auf Weihnachtsmarkt		LF/TLF
Brand-Weihnachtsbaum in Kirche		F3+DL,ELW

===Fahrzeugzuordnung

NEUNEU		LF
undef		LF

F2		LF,LF
F3		LF,LF,LF
F4		LF,LF,LF,LF
F8		LF,LF,LF,LF,LF,LF,LF,LF

TH1		RW
TH2		RW,LF

GSG1		LF,ELW,GW-M,GW-G
GSG2		LF,RW,ELW,GW-M,GW-G

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