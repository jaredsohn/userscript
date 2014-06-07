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
Baum auf Auto				UMGEBAUM+GW-Öl,RW
Baum auf Dach				UMGEBAUM+DL,RW
Baum auf Straße				UMGEBAUM
Brand in Autohaus			BR4
Brand im Baumarkt			BR4+RW
Brand in Briefkasten			BR1
Brand im Casino				BR5+TLF,GW-L2
Brand im Sägewerk			BR4+GW-L2
Brand im Supermarkt			BR4+Kran
Brand in Zugdepot			BR5+GW-L2,RW,GW-S
Brand in Druckerei			BR4+RW,GW-L2
Brand in Lackfabrik			BR4+RW
Brand in KFZ-Werkstatt			BR3+Kran
Brand in Kletterhalle			BR3
Brand in Kühlhaus			BR4
Brand in Reifenlager			BR4+GW-L2
Brand in Schloss			BR4
Brand in Schule				BR4
Brand in Spedition			BR4+RW,TLF,GW-L2
Brand in Sporthalle			BR4+GW-L2
Brennende Bäume				BR1
Brennende S-Bahn			BR2+GW-S
Brennende Telefonzelle			BR1
Brennender LKW				BR2
Brennender Müllwagen			BR2
Brennender PKW				BR1
Brennender Sicherungskasten		BR1
Brennendes Gebüsch			BRWIESE
Brennendes Gras				BR1
Chemieunfall (an Schule)		CHEMUNF1
Chlorgas Alarm (Schwimmbad)		CHEMUNF2
Container Brand				BRKLEIN
Dachstuhlbrand				BR2+DL
Fahrstuhl - Türöffnung			PINAUFZ
Feldbrand				BRWIESE+GW-L2
Fettbrand in Pommesbude			BR3+TLF
Feuer im Altenheim			BR4
Feuer im Krankenhaus			BR5+GW-L2,RW
Feuer im Laubhaufen			BRKLEIN
Garagenbrand				BR2
Gartenlaubenbrand			BR2
Gastronomiebrand			BR3
Gewerbebrand				BR4+RW
Kaminbrand				BR2+DL
Keller unter Wasser			WIK
Kellerbrand				BR2
Kinobrand				BR4+TLF
Kioskbrand				BR2
Kleiner Waldbrand			BRWALDKL
Mähdrescherbrand			BR2+TLF
Motorrad-Brand				BRKLEIN
Mülleimer Brand				BRMÜLL
Ölspur					AUSLÖL
Person im Fluss				PINWAS
PKW in Fluss				PINWAS+RW,Kran
Scheunenbrand				BR3+GW-L2
Schornsteinbrand			BRKAMIN
Schuppenbrand				BR2
Silobrand				BR3
Sperrmüllbrand				BRMÜLL
Strohballen Brand			BR1+GW-L2
Traktorbrand				BR1
Trocknerbrand				BR1
Verkehrsunfall				VU2
Wohnblockbrand				BR4
Wohnungsbrand				BRWOHN
Wohnwagenbrand				BR1

===Fahrzeugzuordnung

UNDEF		LF
BRKLEIN		LF
BR1		LF
BR2		LF,LF
BR3		LF,LF,LF,ELW
BR4		LF,LF,LF,LF,DL,ELW,GW-A
BR5		LF,LF,LF,LF,LF,DL,ELW,GW-A
BRWOHN		LF,LF
BRKELLER	LF,LF,LF
BRKAMIN		LF,LF,DL
BRMÜLL		LF
BRWIESE		LF
BRWALDKL	LF
BRWALD1		LF,LF,GW-L2/TS
BRWALD2		LF,LF,LF,GW-L2
VU1		LF
VU2		LF,GW-Öl,RW
CHEMUNF1	LF,LF,ELW
CHEMUNF2	LF,LF,LF,LF,RW,ELW
UMGEBAUM	LF
PINAUFZ		RW
PINWAS		LF
WIK		LF
AUSLÖL		LF,GW-Öl

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
Kran			Kran

===Ende