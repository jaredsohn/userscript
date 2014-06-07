// ==UserScript==
// @name           AAO Madzze
// @namespace      http://userscripts.org/users/119648
// @description    AAO für feuerwache.net
// @include        http://nowhere.at.all/
// @version        2010-03-29
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
# Version Madzze 2010-03-29
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#

===Einsatzklassen

Auffahrunfall				F1
Baum auf Auto				TH1
Baum auf Dach				TH1+DL
Baum auf Straße				TH1
Brand in Autohaus			F4
Brand in Briefkasten			F1
Brand in Druckerei			F4
Brand in KFZ-Werkstatt			F3+TLF
Brand in Lackfabrik			F5
Brand in Schule				F4
Brand in Spedition			F4+TLF
Brand in Sporthalle			F4
Brand in Zugdepot			F4
Brand im Baumarkt			F4
Brand im Sägewerk			F4
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
Fahrstuhl - Türöffnung			RW
Feldbrand				F1
Fettbrand in Pommesbude			F3+TLF
Feuer im Altenheim			F4
Feuer im Laubhaufen			F1
Gartenlaubenbrand			F1
Gastronomiebrand			F4
Gewerbebrand				F4
Kellerbrand				F2
Keller unter Wasser			F1
Kinobrand				F4
Kleiner Waldbrand			F1
Motorrad-Brand				F1
Mülleimer Brand				F1
Ölspur					F1+GW-Öl
Person im Fluss				LF,GW-T
Scheunenbrand				F3
Schornsteinbrand			F2+DL
Schuppenbrand				F2
Silobrand				F3
Sperrmüllbrand				F1
Strohballen Brand			F2
Traktorbrand				F2
Verkehrsunfall				TH2
Wohnblockbrand				F4
Wohnungsbrand				F4
Wohnwagenbrand				F1
Brand auf Weihnachtsmarkt		F2
Brand-Weihnachtsbaum in Kirche		F3
# 29.03.2010
Trocknerbrand				F1
Brand in Reifenlager			F4+GW-L2
Brand im Casino				F4+TLF


===Fahrzeugzuordnung

NEUNEU		LF
undef		LF
F1		LF
F2		LF,LF
F3		LF,LF,LF/TLF
F4		LF,LF,LF,LF/TLF,ELW
F5		LF,LF,LF,LF,LF/TLF,ELW
TH1		LF
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
LF 16-TS		LF
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