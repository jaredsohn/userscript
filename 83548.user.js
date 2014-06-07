// ==UserScript==
// @name           AAO Besserwieschumi
// @namespace      http://userscripts.org/users/83550
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2011-01-06
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Besserwieschumi
#   s. http://userscripts.org/scripts/show/83550
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
Brand auf Weihnachtsmarkt		F2
Brand in Autohaus			F4
Brand in Briefkasten			F1
Brand im Casino				F5+TLF
Brand in Druckerei			F4+RW
Brand in Eishalle			F6
Brand in Gärtnerei			GSG
Brand in Gemeindehaus			GSG
Brand in Kletterhalle			F4+GW-L2
Brand in Kühlhaus			F4+GW-L2
Brand in KFZ-Werkstatt			F3+TLF
Brand in Lackfabrik			F4+RW
Brand in Metzgerei			F6			
Brand in Spedition			F4+RW,TLF
Brand in Schloss			F4
Brand in Schule				F4
Brand in Spedition			F4+RW,TLF
Brand in Sporthalle			F4+GW-L2
Brand in Reifenlager			F4+GW-L2+GW-M,GW-G
Brand in Zugdepot			F5+GW-S
Brand im Baumarkt			F4+RW
Brand im Sägewerk			F4+GW-L2
Brand im Supermarkt			F4
Brand-Weihnachtsbaum in Kirche		F3
Brennende Bäume				F1
Brennendes Flugzeug			FH3
Brennendes Gebüsch			F1
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
Fahrstuhl - Türöffnung			TH1
Feldbrand				F1+GW-L2
Fettbrand in Pommesbude			F3+TLF
Feuer auf Boot (Klein)			FLB
Feuer auf Boot (Mittel)			FLB,FLB
Feuer im Altenheim			F4
Feuer im Krankenhaus			GSG+GW-L2
Feuer im Laubhaufen			F1
Gabelstapler im Hafenbecken		F3+GW-T+Kran+RW
Gartenlaubenbrand			F1
Garagenbrand				F1
Gastronomiebrand			F4
Gewerbebrand				F4+RW
Grasnarbenbrand				FH1
Kaminbrand				F1+DL
Kellerbrand				F2+GW-A
Keller unter Wasser			F1
Kinobrand				F4+TLF
Kioskbrand				F1
Kleiner Waldbrand			F1
Maschinenbrand				F2
Motorrad-Brand				F1
Mülleimer Brand				F1
Mähdrescherbrand			F2+TLF
Ölspur					F1+GW-Öl
Person im Fluss				LF,GW-T
PKW in Fluss				LF,GW-T
Scheunenbrand				F3+GW-L2
Schornsteinbrand			F2+DL
Schuppenbrand				F2
Silobrand				F3
Sperrmüllbrand				F1
Strohballen Brand			F2+GW-L2
Traktorbrand				F2+GW-Öl
Trocknerbrand				F1
Verkehrsunfall				TH2+GW-Öl
Wohnblockbrand				F4
Wohnungsbrand				F4
Wohnwagenbrand				F1


Brand in Industriepark			GSL
Brand in Steinbruch			GSL


===Fahrzeugzuordnung

undef		LF
F1		LF
F2		LF,LF
F3		LF,LF,LF/TLF,ELW
F4		LF,LF,LF,LF/TLF,DL,ELW,GW-A
F5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A
F6		LF,LF,LF,LF,LF,TLF,DL,GW-L2,RW
TH1		RW,LF
TH2		RW,LF,LF
GSG		LF,LF,LF,LF/TLF,RW,ELW,GW-M,GW-G,GW-A
FH1		FLF,LF
FH2		FLF,FLF,RTF,LF,LF
FH3		FLF,FLF,RTF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,GW-M,GW-G,ELW,GW-Öl,RW
GSL		LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,GW-M,GW-G,ELW,GW-Öl,RW

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
GW - L2 - Wasser	GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M
Kran			Kran
Flugfeldlöschfahrzeug	FLF
Rettungstreppe		RTF
Feuerlöschboot		FLB


===Ende
#
