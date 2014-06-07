// ==UserScript==
// @name           AAO Tfm94
// @namespace      http://userscripts.org/users/119603
// @description    AAO Daten zum importieren
// @version        2010-09-15 11:42
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Tfm94
#   s. http://userscripts.org/scripts/show/63127
#
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#

===Einsatzklassen
Auffahrunfall					F2
Baum auf Auto					TH1
Baum auf Dach					TH1+DL
Baum auf Straße					TH1
Brand in KFZ-Werkstatt				F2+TLF,FwK
Brand in Schule					F4
Brand in Spedition				GSG+DL
Brand in Sporthalle				F4+GW-A
Brand im Sägewerk				F4
Brand im Supermarkt				F4
Brennende Bäume					F2
Brennende Telefonzelle				F2
Brennender LKW					F2
Brennender PKW					F2
Brennendes Gras					F2
Chemieunfall (an Schule)			GSG
Chlorgas Alarm (Schwimmbad)			GSG
Container Brand					F2
Dachstuhlbrand					F2+DL
Fahrstuhl - Türöffnung				TH1
Fettbrand in Pommesbude				F3+TLF
Feuer im Altenheim				F4
Feuer im Laubhaufen				F2
Gartenlaubenbrand				F2
Gastronomiebrand				F4+GW-A
Kellerbrand					F2+GW-A
Keller unter Wasser				LF
Kinobrand					F4
Motorrad-Brand					F2
Mülleimer Brand					F2
Scheunenbrand					F3+GW-L2
Schornsteinbrand				F2+DL
Silobrand					F3
Sperrmüllbrand					F2
Strohballen Brand				F2|GW-L2
Traktorbrand					F2+Öl
Verkehrsunfall					F2|Öl,FwK
Wohnblockbrand					F4
Wohnungsbrand					F4
Brand-Weihnachtsbaum in Kirche			F4+GW-A
Brand auf Weihnachtsmarkt			LZ
Feldbrand					F2
Gewerbebrand					F4+RW
Brand im Baumarkt				GSG+DL
Brennende S-Bahn				F2+GW-S|FwK
Schuppenbrand					F2|GW-G,GW-M
Brennender Sicherungskasten			F2
Wohnwagenbrand					F2
Brand in Briefkasten				F2
Kleiner Waldbrand				F2
Brennender Müllwagen				F2|Fwk
Ölspur						LF,Öl
Brand in Zugdepot				F4+GW-S,RW|FwK
Brand in Autohaus				GSG+DL
Brand in Druckerei				F4
Brand in Lackfabrik				GSG+DL
Person im Fluss					GW-T,LF
Trocknerbrand					F2
Brand in Reifenlager				GSG+GW-L2
Brand im Casino					F5+TLF,LF,GW-L2
Brennendes Gebüsch				F2
Kioskbrand					F2
Garagenbrand					F2
Mähdrescherbrand				F2+TLF
Kaminbrand					F3+DL
PKW in Fluss					LF,RW,GW-T|Fwk
Brand in Schloss				F5
Brand in Kühlhaus				GSG
Feuer im Krankenhaus				GSG+LF
Brand in Kletterhalle				F4
Grasnarbenbrand					FL
Brennendes Flugzeug				FLG
Brand in Industriepark				GSL

===Fahrzeugzuordnung
NEUNEU		LF
undef		LF
F2		LF,LF/TLF
F3		LF,LF,LF/TLF,ELW
F4		LF,LF,LF,LF/TLF,DL,ELW
F5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
TH1		RW
TH2		RW,LF
GSG		LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G
LZ		LF,LF,ELW,DL
RZ		LF,LF,ELW,FwK,RW
FL		FlF,FlF,ELW,DL,LF
FLG		FlF,FlF,FlF,FlF,FlF,ELW,DL,LF,LF,Rtr,GW-M,GW-G,RW
GSL		LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF/TLF,DL,ELW
===Fahrzeugklassen
RTW				RTW
LF 10/6				LF
LF 20/16			LF
LF 8				LF
Kleinlöschfahrzeug		LF
TLF 20/40 - SL			TLF
DLA (K) 23/12			DL
ELW 1				ELW
LF 16-TS			LF
RW				RW
GW-A				GW-A
GW-L2 - Wasser			GW-L2
GW-Öl				Öl
GW-Schiene			GW-S
GW-Taucher			GW-T
GW-Gefahrgut			GW-G
GW-Messtechnik			GW-M
Kran				FwK
Rettungstreppe			Rtr
Flugfeldlöschfahrzeug		FlF
===Ende
#