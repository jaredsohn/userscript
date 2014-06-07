// ==UserScript==
// @name           AAO patri
// @namespace      http://userscripts.org/users/142458
// @description    AAO Daten zum Importieren
// @version        2010-04-23
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#

===Einsatzklassen

Auffahrunfall				F1
Baum auf Auto				TH1+GW-Öl
Baum auf Dach				TH2+DL
Baum auf Straße				TH2
Brand in Autohaus			F4
Brand in Briefkasten			F1
Brand in Druckerei			F4+RW
Brand in KFZ-Werkstatt			F3+TLF
Brand in Lackfabrik			F5+GW-G,GW-M
Brand in Schule				F4
Brand in Spedition			F4+RW,TLF
Brand in Sporthalle			F4+GW-L2
Brand in Zugdepot			F5+GW-S
Brand im Baumarkt			F4+RW
Brand im Sägewerk			F4+GW-L2
Brand im Supermarkt			F4
Brennende Bäume				F1
Brennende S-Bahn			F2+GW-S
Brennende Telefonzelle			F1
Brennender LKW				F1
Brennender Müllwagen			F1
Brennender PKW				F1
Brennender Sicherungskasten		F1
Brennendes Gras				F1
Chemieunfall (an Schule)		GSG
Chlorgas Alarm (Schwimmbad)		GSG
Container Brand				F1
Dachstuhlbrand				F2+DL
Fahrstuhl - Türöffnung			TH1
Feldbrand				F1+GW-L2
Fettbrand in Pommesbude			F3+TLF
Feuer im Altenheim			F4
Feuer im Laubhaufen			F1
Gartenlaubenbrand			F1
Gastronomiebrand			F4
Gewerbebrand				F4+RW
Kellerbrand				F2+GW-A
Keller unter Wasser			F1
Kinobrand				F4+TLF
Kleiner Waldbrand			F1
Motorrad-Brand				F1
Mülleimer Brand				F1
Ölspur					F1+GW-Öl
Person im Fluss				F1+GW-T
Scheunenbrand				F3+GW-L2
Schornsteinbrand			F2+DL
Schuppenbrand				F2
Silobrand				F3
Sperrmüllbrand				F1
Strohballen Brand			F2+GW-L2
Traktorbrand				F2+GW-Öl
Verkehrsunfall				TH2+GW-Öl
Wohnblockbrand				F4
Wohnungsbrand				F4
Wohnwagenbrand				F1
Brand auf Weihnachtsmarkt		F2
Brand-Weihnachtsbaum in Kirche		F3
Trocknerbrand				F1
Brand in Reifenlager			F4+GW-L2
Brand im Casino				F5+TLF
Brand in Schloss			F4
Brennendes Gebüsch			F1
Kioskbrand				F1
Garagenbrand				F1
Mähdrescherbrand			F2
Kaminbrand				F2+DL
PKW in Fluss				TH3+GW-T
Brand in Kühlhaus			GSG
Brand in Kletterhalle			F4
Brand im Kletterhalle			F4
Feuer im Krankenhaus			GSL


===Fahrzeugzuordnung

NEUNEU		LF
undef		LF
F1		LF
F2		LF,LF
F3		LF,LF,LF/TLF,ELW
F4		LF,LF,LF,LF/TLF,DL,ELW,GW-A
F5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
GSL		LF,LF,LF,LF,LF,LF,LF/TLF,DL,ELW,RW,GW-A,GW-G,GW-M
TH1		RW
TH2		RW,LF
TH3		RW,LF,LF
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