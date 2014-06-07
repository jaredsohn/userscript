// ==UserScript==
// @name           AAO dome92
// @namespace      http://userscripts.org/users/153345
// @description    AAO Daten für das Original-Script von Sawos(http://userscripts.org/scripts/show/50002) zum importieren
// @version        2011-03-26
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

===Einsatzklassen

Auffahrunfall				F1
Baum auf Auto				TH1+GW-Öl
Baum auf Dach				TH2+DL
Baum auf Straße				TH1
Brand in Autohaus				F4
Brand in Briefkasten			F1
Brand in Druckerei			F4+RW
Brand in KFZ-Werkstatt			F3+TLF
Brand in Spedition			F4+RW,TLF
Brand in Schule				F4
Brand in Spedition			F4+RW,TLF
Brand in Sporthalle			F4+GW-L2
Brand in Zugdepot				F5
Brand im Baumarkt				F4+RW
Brand im Sägewerk				F4+GW-L2
Brand im Supermarkt			F4
Brennende Bäume				F1
Brennende S-Bahn				F2+GW-S
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
Feldbrand					F1+GW-L2
Fettbrand in Pommesbude			F3+TLF
Feuer im Altenheim			F4
Feuer im Laubhaufen			F1
Gartenlaubenbrand				F1
Gastronomiebrand				F4
Gewerbebrand				F4+RW
Kellerbrand					F2+GW-A
Keller unter Wasser			LF
Kinobrand					F4+TLF
Kleiner Waldbrand				F1
Motorrad-Brand				F1
Mülleimer Brand				F1
Ölspur					F1+GW-Öl
Person im Fluss				LF,GW-T
Scheunenbrand				F3+GW-L2
Schornsteinbrand				F2+DL
Schuppenbrand				F2
Silobrand					F3
Sperrmüllbrand				F1
Strohballen Brand				F2+GW-L2
Traktorbrand				F2+GW-Öl
Verkehrsunfall				TH2+GW-Öl
Wohnblockbrand				F4
Wohnungsbrand				F4
Wohnwagenbrand				F1
Brand auf Weihnachtsmarkt		F2
Brand-Weihnachtsbaum in Kirche	F3
# 29.03.2010
Trocknerbrand				F1
Brand in Reifenlager			F4+GW-L2|GW-M,GW-G
Brand im Casino				F5+TLF
# 17.04.2010
Brand in Lackfabrik			F4+RW
# 23.04.2010
Brennendes Gebüsch			F1
Kioskbrand					F1
Garagenbrand				F2
Mähdrescherbrand				F1+TLF
Kaminbrand					F2+DL
PKW in Fluss				TH1+GW-T
Brand in Schloss				F4
Brand in Kühlhaus				F4
Feuer im Krankenhaus			F5
Brand in Kletterhalle			F3
# 06.02.2011 by dome92
Brand in Gärtnerei			F3+DL
# 26.03.2011 by dome92
Brand in Eishalle				F3+DL
Gabelstapler in Hafenbecken		H


===Fahrzeugzuordnung

undef		LF
F1		LF
F2		LF,LF
F3		LF,LF,LF/TLF,ELW
F4		LF,LF,LF,LF/TLF,DL,ELW,GW-A
F5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
TH1		RW,LF
TH2		RW,LF,LF
GSG		LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G
H		LF,RW,Kran,RTW

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
HLF 20/16			LF
HLF 10/6			LF
Kran				Kran

===Ende
#