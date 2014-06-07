// ==UserScript==
// @name           AAO ILS Bayern
// @namespace      http://userscripts.org/scripts/review/74299
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-06-24
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

Auffahrunfall			VU1
Baum auf Auto			VU1
Baum auf Dach			THL1
Baum auf Straße			THL1
Brand auf Weihnachtsmarkt	B1
Brand in Autohaus		B3
Brand in Briefkasten		B1
Brand in Druckerei		B4
Brand in KFZ-Werkstatt		B3
Brand in Lackfabrik		B Chemie
Brand in Reifenlager		B4
Brand in Spedition		B4
Brand in Schule			B5
Brand in Sporthalle		B3
Brand in Zugdepot		B Zug
Brand im Casino			B3
Brand im Baumarkt		B4
Brand im Sägewerk		B4
Brand im Supermarkt		B4
Brennende Bäume			B1
Brennende S-Bahn		B Zug
Brennende Telefonzelle		B1
Brennender LKW			B2
Brennender Müllwagen		B2
Brennender PKW			B2
Brennender Sicherungskasten	B1
Brennendes Gras			B1
Brand-Weihnachtsbaum in Kirche	B2
Chemieunfall (an Schule)	THL Chemie
Chlorgas Alarm (Schwimmbad)	THL Chemie
Container Brand			B2
Dachstuhlbrand			B3
Fahrstuhl - Türöffnung		P Aufzug
Feldbrand			B1
Fettbrand in Pommesbude		B2
Feuer im Altenheim		B5
Feuer im Laubhaufen		B1
Gartenlaubenbrand		B2
Gastronomiebrand		B3
Gewerbebrand			B5
Kellerbrand			B3
Keller unter Wasser		THL1
Kinobrand			B5
Kleiner Waldbrand		B Wald
Motorrad-Brand			B2
Mülleimer Brand			B1
Ölspur				THL1
Person im Fluss			Wassernot1
Scheunenbrand			B3
Schornsteinbrand		B2
Schuppenbrand			B2
Silobrand			B3
Sperrmüllbrand			B1
Strohballen Brand		B1
Traktorbrand			B2
Trocknerbrand			B3
Verkehrsunfall			P eingeklemmt
Wohnblockbrand			B5
Wohnungsbrand			B3
Wohnwagenbrand			B2

# 23.04.2010
Brennendes Gebüsch		B1
Kioskbrand			B2
Garagenbrand			B3
Mähdrescherbrand		B2
Kaminbrand			B2
PKW in Fluss			P eingeklemmt+GW-T,Kran
Brand in Schloss		B4
Brand in Kühlhaus		B4
Feuer im Krankenhaus		B5
Brand in Kletterhalle		B3


===Fahrzeugzuordnung

NEUNEU			LF10/LF20/LF16/LF8
undef			LF10/LF20/LF16/LF8
B1			LF10/LF20/LF16/LF8
B2			LF10/LF20/LF16/LF8,LF20
B3			LF10/LF20/LF16/LF8,LF20,ELW,DLK
B4			LF10/LF20/LF16/LF8,LF20,ELW,DLK,LF10,GW-A,LF16,GW-L2,TLF,RTW
B5			LF10/LF20/LF16/LF8,LF20,ELW,DLK,LF20,LF20,ELW,DLK,LF10,GW-A,RW,LF16,GW-L2,TLF,RTW
B Chemie		LF10/LF20/LF16/LF8,LF20,ELW,DLK,GW-G,GW-M,LF10,GW-A,RW,RTW
B Wald			LF10/LF20/LF16/LF8,LF20,ELW,DLK,LF16,GW-L2,TLF,RTW
B Zug			LF10/LF20/LF16/LF8,LF20,ELW,DLK,GW-S,LF10,RW,GWA,RTW
P Aufzug		LF10/LF20/LF16/LF8/RW
P eingeklemmt		LF10/LF20/LF16/LF8,LF20,ELW,LF10,RW
THL1			LF10/LF20/LF16/LF8
THL Chemie		LF10/LF20/LF16/LF8,LF20,ELW,GW-G,GW-M,LF10,GW-A,RW,RTW
VU1			LF10/LF20/LF16/LF8
Wassernot1		LF10/LF20/LF16/LF8,GW-T


===Fahrzeugklassen

RTW			RTW
LF 10/6			LF10
LF 20/16		LF20
LF 16-TS		LF16
LF 8			LF8
Kleinlöschfahrzeug	KLF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DLK
ELW 1			ELW
RW			RW
Kran			Kran
GW-A			GW-A
GW-L2 - Wasser		GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M

===Ende
#
