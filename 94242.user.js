// ==UserScript==
// @name           AAO KatSchutz Verband
// @namespace      http://userscripts.org/users/110105
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2011-02-01
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

Auffahrunfall				F1+GW-Öl
Baum auf Auto				TH2
Baum auf Dach				TH1+DL
Baum auf Straße				TH1
Brand in Autohaus			F4+GW-A
Brand in Briefkasten			F0
Brand in Druckerei			F5+RW,TLF
Brand in KFZ-Werkstatt			F2+TLF,KW
Brand in Spedition			F4+RW,TLF
Brand in Schule				F4+GW-A|TLF
Brand in Spedition			F4+RW,TLF,GW-L2|GW-M,GW-G
Brand in Sporthalle			F5
Brand in Zugdepot			F5+GW-S|RW
Brand im Baumarkt			F5+RW,TLF|GW-M,GW-G
Brand im Sägewerk			F5
Brand im Supermarkt			F3|KW
Brennende Bäume				F1
Brennende S-Bahn			F2+GW-S,RW,ELW
Brennende Telefonzelle			F0
Brennender LKW				F2
Brennender Müllwagen			F2
Brennender PKW				F1
Brennender Sicherungskasten		F1
Brennendes Gras				F1
Chemieunfall (an Schule)		GSG
Chlorgas Alarm (Schwimmbad)		GSG
Container Brand				F1
Dachstuhlbrand				F3
Fahrstuhl - Türöffnung			TH1
Feldbrand				F2+GW-L2
Fettbrand in Pommesbude			F2+TLF
Feuer im Altenheim			F4+GW-A
Feuer im Laubhaufen			F1
Gartenlaubenbrand			F1
Gastronomiebrand			F3+LF
Gewerbebrand				F4+RW,GW-A,TLF
Kellerbrand				F2
Keller unter Wasser			LF/RW
Kinobrand				F4+GW-A|TLF
Kleiner Waldbrand			F2+LF,GW-L2
Motorrad-Brand				F1
Mülleimer Brand				F0
Ölspur					F1+GW-Öl
Person im Fluss				TH3
Scheunenbrand				F3+GW-L2,LF
Schornsteinbrand			F3
Schuppenbrand				F2|GW-M,GW-G
Silobrand				F3
Sperrmüllbrand				F0
Strohballen Brand			F2+GW-L2
Traktorbrand				F1
Verkehrsunfall				TH2
Wohnblockbrand				F4+GW-A
Wohnungsbrand				F2
Wohnwagenbrand				F1
Brand auf Weihnachtsmarkt		F2+TLF
Brand-Weihnachtsbaum in Kirche		F4
# 29.03.2010
Trocknerbrand				F1
Brand in Reifenlager			F5+TLF|GW-M,GW-G
Brand im Casino				F5+TLF,RW,LF,LF,TLF
# 17.04.2010
Brand in Lackfabrik			F5+RW,TLF|GW-M,GW-G
# 23.04.2010
Brennendes Gebüsch			F1
Kioskbrand				F1
Garagenbrand				F2
Mähdrescherbrand			F2+TLF
Kaminbrand				F3
PKW in Fluss				TH4
Brand in Schloss			F5
Brand in Kühlhaus			F5+TLF|GW-M,GW-G
Feuer im Krankenhaus			F5
Brand in Kletterhalle			F4
# 05.01.2011
Brand in Gemeindehaus			F3
Maschinenbrand			F2+ELW,GW-L2
Brand in Gärtnerei			F5|GW-M,GW-G
Brand in Eishalle			F5+TLF
Brand in Metzgerei			F4|GW-L2

===Fahrzeugzuordnung

undef		LF
F0		LF/KLF
F1		LF
F2		LF,LF
F3		LF,LF,DL
F4		LF,LF,LF,LF,DL,ELW
F5		LF,LF,LF,LF,DL,ELW,GW-A,GW-L2
TH1		RW,LF
TH2		RW,LF,GW-Öl
TH3		LF,GW-T
TH4		RW,LF,GW-T,KW
GSG		LF,LF,RW,ELW,GW-M,GW-G

===Fahrzeugklassen

RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	KLF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DL
ELW 1			ELW
LF 16-TS		LF
RW			RW
Kran			KW
GW-A			GW-A
GW-L2 - Wasser		GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M

===Ende
#