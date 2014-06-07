// ==UserScript==
// @name           AAO stephanb70
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        29.01.2011
// ==/UserScript==


# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#

===Einsatzklassen


Auffahrunfall			F2	
Baum auf Auto			TH2+GW-Öl	
Baum auf Dach			TH2+DL	
Baum auf Straße			F1	
Feuer auf Boot (Klein)		LB
Brand im Baumarkt		GSG+RW,GW-A		
Brand im Casino			F5+LF,LF,LF,LF,LF,TLF,GW-L2,DL	
Brand im Sägewerk		F5+GW-L2		
Brand im Supermarkt		F4+DL,FwK		
Brand in Autohaus		F4+GW-M,ELW,GW-A,DL		
Brand in Briefkasten		F1		
Brand in Druckerei		F4+DL,GW-A,RW,GW-L2
Brand in Eishalle		F4+LF,TLF,GW-L2,DL,RW,ELW
Brand in Gärtnerei		GSG+DL	
Brand in Gemeindehaus		F2
Brand in Metzgerei		F4+ELW,DL,GW-L2	
Brand in KFZ-Werkstatt		F4+FwK		
Brand in Kletterhalle		F4+LF		
Brand in Kühlhaus		GSG+GW-L2,DL,LF,LF		
Brand in Lackfabrik		F5+GW-M,GW-G,DL,LF,LF		
Brand in Reifenlager		GSG+GW-L2,LF		
Brand in Schloss		F4+ELW,DL,LF		
Brand in Schule			F5+DL	
Brand in Spedition		GSG+RW,TLF,GW-L2,DL		
Brand in Sporthalle		F5+GW-L2		
Brand in Zugdepot		F4+LF,LF,DL,RW,GW-L2,ELW,GW-S		
Brennende Bäume			F2	
Brennende S-Bahn		F3+GW-S		
Brennende Telefonzelle		F1		
Brennender LKW			F1	
Brennender Müllwagen		F1		
Brennender PKW			F1	
Brennender Sicherungskasten	F1			
Brennendes Gebüsch		F1		
Brennendes Gras			F1
Brennendes Flugzeug		ICAO
Chemieunfall (an Schule)	GSG			
Chlorgas Alarm (Schwimmbad)	GSG+RW			
Container Brand			F1	
Dachstuhlbrand			F4+DL	
Fahrstuhl - Türöffnung		TH1+LF		
Feldbrand			LF/FLF,GW-L2/FLF	
Fettbrand in Pommesbude		F4+TLF	
Feuer auf Boot (Klein)		LB
Feuer auf Boot (Mittel)		LB,LB	
Feuer im Altenheim		F5+DL		
Feuer im Krankenhaus		GSG+LF,LF,LF,LF,LF,LF,GW-L2,RW,GW-A		
Feuer im Laubhaufen		F1
Gabelstapler im Hafenbecken	F3+GW-T,FwK,RW		
Garagenbrand			F2	
Gartenlaubenbrand		F1		
Gastronomiebrand		F4		
Gewerbebrand			F5+RW,DL
Grasnarbenbrand			LF/FLF,LF/FLF	
Kaminbrand			F2+DL	
Keller unter Wasser		F1		
Kellerbrand			F3	
Kinobrand			F5+TLF,DL	
Kioskbrand			F1	
Kleiner Waldbrand		F1		
Mähdrescherbrand		F1+TLF
Maschinenbrand			F3+GW-L2,ELW		
Motorrad-Brand			F1	
Mülleimer Brand			LF/FLF	
Ölspur				F1+GW-Öl
Person im Fluss			F1+GW-T	
PKW in Fluss			F3+GW-T,RW,FwK	
Scheunenbrand			F4+GW-L2	
Schornsteinbrand		F3+DL		
Schuppenbrand			F2+GW-M,GW-G	
Silobrand			F4	
Sperrmüllbrand			F1	
Strohballen Brand		F1+GW-L2		
Traktorbrand			F1	
Trocknerbrand			F1	
Verkehrsunfall			TH2+GW-Öl
Verletztentransport		leer
Wohnblockbrand			F5+LF	
Wohnungsbrand			F4	
Wohnwagenbrand			F1	

Brand in Industriepark		20LF
Brand in Steinbruch		20LF

Brand-Weihnachtsbaum in Kirche	F4+LF	
Brand auf Weihnachtsmarkt	F2


  
===Fahrzeugzuordnung


undef	LF,LF,LF
F1	LF
F2	LF,LF
F3	LF,LF,LF
F4	LF,LF,LF,LF
F5	LF,LF,LF,LF,LF,ELW,GW-A
TH1	RW
TH2	RW,LF,LF
GSG	ELW,GW-M,GW-G,LF,LF,LF,LF
ICAO	FLF,FLF,FLF,FLF,FLF,FLF,FLF,FLF,FLF,FLF,RTF,ELW,GW-M,GW-G,GW-Öl,RW
20LF	LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF



===Fahrzeugklassen


RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	LF
LF 16-TS		LF
HLF 20/16		LF
HLF 10/6		LF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DL
ELW 1			ELW
RW			RW
GW-A			GW-A
GW-L2 - Wasser		GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M
Kran			FwK
Flugfeldlöschfahrzeug	FLF
Rettungstreppe		RTF
Feuerlöschboot		LB
Rettungsboot		RTB

===Ende
#
