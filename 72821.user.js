?// ==UserScript==
// @name           AAO MoSako
// @namespace      http://userscripts.org/users/141997
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-05-08
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
# Version MoSako 2010-05-08

===Einsatzklassen

Auffahrunfall					THK
Baum auf Auto					TH
Baum auf Dach					DRZF+DLK
Baum auf Straße					DRZF
Brand in Autohaus				FEU2Y
Brand in Briefkasten			FEUK
Brand in Druckerei				FEU4Y
Brand in KFZ-Werkstatt			FEUE
Brand in Lackfabrik				FEU2Y|GW-G,GW-M
Brand in Schule					FEU2R
Brand in Spedition				THX
Brand in Sporthalle				FEU3
Brand in Zugdepot				FEU2ZUG
Brand im Baumarkt				FEU4Y
Brand im Sägewerk				FEU3
Brand im Supermarkt				FEUBMA
Brennende Bäume					FEUK
Brennende S-Bahn				FEUZUG
Brennende Telefonzelle			FEUK
Brennender LKW					FEUK
Brennender Müllwagen			FEUK
Brennender PKW					FEUK
Brennender Sicherungskasten		FEUK
Brennendes Gras					FEUK
Chemieunfall (an Schule)		THX
Chlorgas Alarm (Schwimmbad)		THX
Container Brand					FEUK
Dachstuhlbrand					FEU
Fahrstuhl - Türöffnung			PSCHL
Feldbrand						FEUM
Fettbrand in Pommesbude			FEU2
Feuer im Altenheim				FEU2R
Feuer im Laubhaufen				FEUK
Gartenlaubenbrand				FEUK
Gastronomiebrand				FEU
Gewerbebrand					FEU2M
Kellerbrand						FEUK
Keller unter Wasser				WASSER
Kinobrand						FEU2R
Kleiner Waldbrand				FEUM
Motorrad-Brand					FEUK
Mülleimer Brand					FEUK
Ölspur							AUST
Person im Fluss					THWAY
Scheunenbrand					FEU2M
Schornsteinbrand				FEU
Schuppenbrand					FEUK|GW-G,GW-M
Silobrand						FEUM
Sperrmüllbrand					FEUK
Strohballen Brand				FEUM
Traktorbrand					FEUK
Verkehrsunfall					TH
Wohnblockbrand					FEU2R
Wohnungsbrand					FEU
Wohnwagenbrand					FEUK
Brand auf Weihnachtsmarkt		FEU
Brand-Weihnachtsbaum in Kirche	FEUY
# 29.03.2010
Trocknerbrand					FEUK
Brand in Reifenlager			FEU3M
Brand im Casino					FEU4
# 08.05.2010
PKW in Fluss					THWAY
Kioskbrand						FEUK

===Fahrzeugzuordnung

NEU-FEU				LF,LF,ELW,DLK
NEU-TH				LF,RW
undef				LF
NIL					
FEUK				LF
FEUM				LF,LF,GW-L2
FEU					ELW,LF,LF,DLK
FEUBMA				LF,LF,DLK
FEUZUG				LF,LF,ELW,GW-S
FEUE				ELW,LF,LF,DLK,TLF/LF
FEUY				ELW,LF,LF/TLF,DLK,GW-A
FEUX				ELW,LF,LF,LF/TLF,DLK,GW-L2,RW
FEU2				ELW,LF,LF,TLF/LF,DLK
FEU2Y				ELW,LF,LF,LF,DLK,GW-A
FEU2R				ELW,LF,LF,LF/TLF,DLK,GW-A
FEU2M				ELW,LF,LF,LF,DLK,GW-A,RW
FEU2ZUG				ELW,LF,LF,LF,DLK,RW,GW-L2,GW-S
FEU3				ELW,LF,LF,LF,GW-L2,GW-A
FEU3M				ELW,LF,LF,LF/TLF,DLK,GW-L2
FEU4				ELW,LF,LF,LF,TLF,DLK
FEU4Y				ELW,LF,LF,LF/TLF,DLK,RW,GW-L2,GW-A
FEU5				ELW,LF,LF,LF/TLF,DLK
THZUG				LF,LF,GW-S,RW
THK					LF
TH					LF,RW,GW-Öl
THX					ELW,LF,LF,LF/TLF,DLK,GW-G,GW-M,RW
THY					ELW,LF,DLK,GW-A,RW
THE					ELW,LF,LF,DLK,RW
THWAY				LF,LF,GW-T
TH2					
TH2Y				
TH3					
TH4					
PSCHL				LF,RW
WASSER				TS/LF
AUST				LF,GW-Öl
THFLUG3R			
DRZF				RW,LF


===Fahrzeugklassen

RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	KLF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DLK
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