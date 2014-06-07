// ==UserScript==
// @name           AAO Prof.Zwerg
// @namespace      http://userscripts.org/users/172140
// @description    AAO Daten zum importieren
// @include        
// @version        31/05/10
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
Baum auf Auto				TH1
Baum auf Dach				TH1+DLK
Baum auf Straße				TH1
Brand in Autohaus			F4
Brand in Briefkasten			F1
Brand in Druckerei			F4
Brand in KFZ-Werkstatt			F3
Brand in Spedition			F4
Brand in Schule				F4
Brand in Spedition			F4
Brand in Sporthalle			F4
Brand in Zugdepot			F5
Brand im Baumarkt			F4
Brand im Sägewerk			F4
Brand im Supermarkt			F4
Brennende Bäume				F1
Brennende S-Bahn			F2
Brennende Telefonzelle			F1
Brennender LKW				F1
Brennender Müllwagen			F1
Brennender PKW				F1
Brennender Sicherungskasten		F1
Brennendes Gras				F1
Chemieunfall (an Schule)		GSG
Chlorgas Alarm (Schwimmbad)		GSG
Container Brand				F1
Dachstuhlbrand				F2
Fahrstuhl - Türöffnung			TH1
Feldbrand				F1
Fettbrand in Pommesbude			F3
Feuer im Altenheim			F4
Feuer im Laubhaufen			F1
Gartenlaubenbrand			F1
Gastronomiebrand			F4
Gewerbebrand				F4
Kellerbrand				F2
Keller unter Wasser			LF
Kinobrand				F4
Kleiner Waldbrand			F1
Motorrad-Brand				F1
Mülleimer Brand				F1
Ölspur					ÖL
Person im Fluss				LF,GW-T
Scheunenbrand				F3
Schornsteinbrand			F2
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
Trocknerbrand				F1
Brand in Reifenlager			F4
Brand im Casino				F5
Brand in Lackfabrik			F4
Brennendes Gebüsch			F1
Kioskbrand				F1
Garagenbrand				F2
Mähdrescherbrand			F1
Kaminbrand				F2
PKW in Fluss				TH1
Brand in Schloss			F4
Brand in Kühlhaus			F4
Feuer im Krankenhaus			F5
Brand in Kletterhalle			F3

===Fahrzeugzuordnung

undef		LF
F1		KLF
F2		LF,LF
F3		LF,LF,DLK,ELW
F4		LF,LF,LF,LF/TLF,DLK,ELW 1,GW-A
F5		LF,LF,LF,LF,LF/TLF,DLK,ELW,GW-A
TH1		RW
TH2		RW,LF
GSG		LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G
ÖL              ULF

===Fahrzeugklassen

RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	KLF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DLK
ELW 1			ELW 1
LF 16-TS		TS
RW			RW
GW-A			GW-A
GW-L2 - Wasser		SW-2000
GW-Öl			ULF
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M
Kran			FWK

===Ende
#