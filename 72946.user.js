// ==UserScript==
// @name           AAO emergencyfan 
// @namespace      http://userscripts.org/users/142349
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-05-22
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

Auffahrunfall				VURAEUM
Baum auf Auto				TH1+GW-Öl
Baum auf Dach				TH2+DL
Baum auf Straße				VHIND
Brand in Autohaus			B4+GW-M
Brand in Briefkasten			B1
Brand in Druckerei			B4+RW,GW-L2
Brand in KFZ-Werkstatt			B3+TLF
Brand in Lackfabrik			Vollalarm+GW-G,GW-M
Brand in Schule				B4
Brand in Spedition			B4
Brand in Sporthalle			B4+GW-L2
Brand in Zugdepot			Vollalarm+GW-S
Brand im Baumarkt			B4+RW,TLF,GW-G,GW-M
Brand im Sägewerk			Vollalarm
Brand im Supermarkt			B4
Brennende Bäume				B1
Brennende S-Bahn			B2+GW-S
Brennende Telefonzelle			B1
Brennender LKW				PKW
Brennender Müllwagen			PKW
Brennender PKW				PKW
Brennender Sicherungskasten		B1
Brennendes Gras				B1
Chemieunfall (an Schule)		GSG
Chlorgas Alarm (Schwimmbad)		GSG
Container Brand				B1
Dachstuhlbrand				B2+DL
Fahrstuhl - Türöffnung			TH1
Feldbrand				B1+GW-L2
Fettbrand in Pommesbude			B3+TLF
Feuer im Altenheim			B4
Feuer im Laubhaufen			B1
Gartenlaubenbrand			B1
Gastronomiebrand			B4
Gewerbebrand				B4+RW
Kellerbrand				B2+GW-A
Keller unter Wasser			LF
Kinobrand				B4+TLF
Kleiner Waldbrand			WALD
Motorrad-Brand				PKW
Mülleimer Brand				B1
Ölspur					B1+GW-Öl
Person im Fluss				WAS/EIS
Scheunenbrand				B3+GW-L2
Schornsteinbrand			KAMIN
Schuppenbrand				B2
Silobrand				B3
Sperrmüllbrand				B1
Strohballen Brand			B2+GW-L2
Traktorbrand				B2
Verkehrsunfall				TH2+GW-Öl
Wohnblockbrand				Vollalarm
Wohnungsbrand				B4
Wohnwagenbrand				PKW
Brand auf Weihnachtsmarkt		B2
Brand-Weihnachtsbaum in Kirche		B3
# 29.03.2010
Trocknerbrand				B1
Brand in Reifenlager			Vollalarm|GW-M,GW-G
Brand im Casino				Vollalarm
#23.04.2010
Brennendes Gebüsch			B1
Kioskbrand				B2
Garagenbrand				B2
Mähdrescherbrand			B2
Kaminbrand				KAMIN
PKW in Fluss				WAS/EIS
Brand in Schloss			B4
Brand in Kühlhaus			B4+GW-M,GW-G,GW-L2
Feuer im Krankenhaus			Vollalarm+GW-M,GW-G
Brand in Kletterhalle			B4

===Fahrzeugzuordnung

NEUNEU		LF
undef		LF
B1		LF
B2		LF,LF
B3		LF,LF,LF/TLF,ELW
B4		LF,LF,LF,LF/TLF,DL,ELW,GW-A
B5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
TH1		RW
TH2		RW,LF
GSG		LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G
PKW		LF
WALD		LF
KAMIN		LF,LF,DL
Vollalarm	LF,LF,LF,LF,LF/TLF,TLF,DL,ELW,GW-A,GW-L2,RW
VURAEUM		LF
VHIND		LF/RW
WAS/EIS		LF,GW-T

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