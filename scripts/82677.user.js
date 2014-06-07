// ==UserScript==
// @name           AAO Sawos
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-05-06
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#
# 31.07.2010 an Einsatzstichworte Feuerwehr Duisburg angepasst
#

===Einsatzklassen

Auffahrunfall				VU1
Baum auf Auto				UMGEBAUM+GW-Öl
Baum auf Dach				UMGEBAUM+DL
Baum auf Straße				UMGEBAUM
Brand in Autohaus			BR4
Brand in Briefkasten			BR1
Brand in Druckerei			BR4+RW
Brand in KFZ-Werkstatt			BR3+TLF
Brand in Spedition			BR4+RW,TLF
Brand in Schule				BR4
Brand in Spedition			BR4+RW,TLF
Brand in Sporthalle			BR4+GW-L2
Brand in Zugdepot			BR5
Brand im Baumarkt			BR4+RW
Brand im Sägewerk			BR4+GW-L2
Brand im Supermarkt			BR4
Brennende Bäume				BR1
Brennende S-Bahn			BR2+GW-S
Brennende Telefonzelle			BR1
Brennender LKW				BR1
Brennender Müllwagen			BR1
Brennender PKW				BR1
Brennender Sicherungskasten		BR1
Brennendes Gras				BR1
Chemieunfall (an Schule)		CHEMUNF1
Chlorgas Alarm (Schwimmbad)		CHEMUNF2
Container Brand				BRKLEIN
Dachstuhlbrand				BR2+DL
Fahrstuhl - Türöffnung			PINAUFZ
Feldbrand				BRWIESE
Fettbrand in Pommesbude			BR3+TLF
Feuer im Altenheim			BR4
Feuer im Laubhaufen			BRKLEIN
Gartenlaubenbrand			BR1
Gastronomiebrand			BR4
Gewerbebrand				BR4+RW
Kellerbrand				BR2+GW-A
Keller unter Wasser			WIK
Kinobrand				BR4+TLF
Kleiner Waldbrand			BRWALDKL
Motorrad-Brand				BRKLEIN
Mülleimer Brand				BRMÜLL
Ölspur					AUSLÖL
Person im Fluss				PINWAS
PKW-Brand				BR1
Scheunenbrand				BR3+GW-L2/TS
Schornsteinbrand			BRKAMIN
Schuppenbrand				BR2
Silobrand				BR3
Sperrmüllbrand				BRMÜLL
Strohballen Brand			BR1
Traktorbrand				BR1
Verkehrsunfall				VU2
Wohnblockbrand				BR4
Wohnungsbrand				BRWOHN
Wohnwagenbrand				BR1
Brand auf Weihnachtsmarkt		BR2
Brand-Weihnachtsbaum in Kirche		BR3
# 29.03.2010
Trocknerbrand				BR1
Brand in Reifenlager			BR4+GW-L2,GW-M,GW-G
Brand im Casino				BR5+TLF
# 17.04.2010
Brand in Lackfabrik			BR4+RW
# 23.04.2010
Brennendes Gebüsch			BRWIESE
Kioskbrand				BR2
Garagenbrand				BR2
Mähdrescherbrand			BR1+TLF
Kaminbrand				BR2+DL
PKW in Fluss				PINWAS+GW-T
Brand in Schloss			BR4
Brand in Kühlhaus			BR4
Feuer im Krankenhaus			BR5
Brand in Kletterhalle			BR3

===Fahrzeugzuordnung

UNDEF		LF/TLF
BRKLEIN		LF/TLF
BR1		LF
BR2		LF,LF
BR3		LF,LF,LF/TLF,ELW
BR4		LF,LF,LF,LF/TLF,DL,ELW,GW-A
BR5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
BRWOHN		LF,LF
BRKELLER	LF,LF,LF/TLF
BRKAMIN		LF,LF/TLF,DL
BRMÜLL		LF/TLF
BRWIESE		LF
BRWALDKL	LF
BRWALD1		LF,LF/TLF,GW-L2/TS
BRWALD2		LF,LF,LF/TLF,TS,GW-L2
VU1		LF
VU2		RW,LF,GW-Öl
CHEMUNF1	LF,LF/TLF,RW,ELW,GW-M,GW-G
CHEMUNF2	LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G
UMGEBAUM	LF
PINAUFZ		LF,ELW,RTW
PINWAS		LF,ELW,GW-T
WIK		LF/TS
AUSLÖL		LF,GW-ÖL

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