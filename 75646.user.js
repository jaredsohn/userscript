// ==UserScript==
// @name           AAO Essen (basierend auf AAO von sawos)
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-05-01
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Essen
#   s. http://userscripts.org/scripts/show/50002
#
# Version Sawos 2010-05-01
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#

===Einsatzklassen

Auffahrunfall				TH0
Baum auf Auto				TH1+GW-Öl
Baum auf Dach				TH2+DL
Baum auf Straße				TH1
Brand in Autohaus			B3
Brand in Briefkasten			B0
Brand in Druckerei			B3+RW
Brand in KFZ-Werkstatt			B3+TLF
Brand in Spedition			B3+RW,TLF
Brand in Schule				B3
Brand in Spedition			B3+RW,TLF
Brand in Sporthalle			B3+GW-L2
Brand in Zugdepot			B3
Brand im Baumarkt			B3+RW
Brand im Sägewerk			B3+GW-L2
Brand im Supermarkt			B3
Brennende Bäume				B1
Brennende S-Bahn			B2+GW-S
Brennende Telefonzelle			B1
Brennender LKW				KFZ2
Brennender Müllwagen			KFZ2
Brennender PKW				KFZ1
Brennender Sicherungskasten		B1
Brennendes Gras				FLAECHE
Chemieunfall (an Schule)		GSG
Chlorgas Alarm (Schwimmbad)		GSG
Container Brand				CONTAIN
Dachstuhlbrand				DACH
Fahrstuhl - Türöffnung			TH1
Feldbrand				FLAECHE+GW-L2
Fettbrand in Pommesbude			B3+TLF
Feuer im Altenheim			B3
Feuer im Laubhaufen			B1
Gartenlaubenbrand			B1
Gastronomiebrand			B3
Gewerbebrand				B3+RW
Kellerbrand				KELLER+GW-A
Keller unter Wasser			WIG
Kinobrand				B3+TLF
Kleiner Waldbrand			B1
Motorrad-Brand				KFZ1
Mülleimer Brand				B0
Ölspur					TH0+GW-Öl
Person im Fluss				WIG,GW-T
Scheunenbrand				B3+GW-L2
Schornsteinbrand			KAMIN+DL
Schuppenbrand				B2
Silobrand				B3
Sperrmüllbrand				B1
Strohballen Brand			B2+GW-L2
Traktorbrand				KFZ2+GW-Öl
Verkehrsunfall				TH2+GW-Öl
Wohnblockbrand				B3
Wohnungsbrand				B3
Wohnwagenbrand				KFZ1
Brand auf Weihnachtsmarkt		B2
Brand-Weihnachtsbaum in Kirche	B3
# 29.03.2010
Trocknerbrand				B1
Brand in Reifenlager			B3+GW-L2|GW-M,GW-G
Brand im Casino				B3+TLF
# 23.04.2010
Brennendes Gebüsch			B1
Kioskbrand				B1
Garagenbrand				B2
Mähdrescherbrand			KFZ1+TLF
Kaminbrand				KAMIN
PKW in Fluss				TH1+GW-T
Brand in Schloss			B3
Brand in Kühlhaus			B3
Feuer im Krankenhaus			B3
Brand in Kletterhalle			B3

===Fahrzeugzuordnung

B0		LF,LF/TLF,DL
B1		LF,LF,LF/TLF,DL
B2		LF,LF,LF,LF/TLF,DL,DL,ELW,GW-A
B3		LF,LF,LF,LF,LF/TLF,DL,DL,LF/TLF,ELW,GW-A
WOHN		LF,LF,LF,LF/TLF,DL,DL,ELW,GW-A
DACH		LF,LF,LF,LF/TLF,DL,DL,ELW,GW-A
KELLER          LF,LF,LF/TLF,DL
KAMIN           LF,LF,LF/TLF,DL
KFZ1            LF,LF/TLF
KFZ2            LF,LF,LF/TLF
FLAECHE         LF,LF,LF/TLF,DL
CONTAIN         LF,LF/TLF,DL
WIG             LF
TH0		LF
TH1             RW,LF
TH2		RW,LF,ELW
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