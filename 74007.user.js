// ==UserScript==
// @name           AAO
// ==/UserScript==


===Einsatzklassen

#VU- / TH-Einsätze
Baum auf Straße				TH1
Keller unter Wasser			TH1
Baum auf Auto				TH2
Baum auf Dach				TH2+DL
Fahrstuhl - Türöffnung			THY
Ölspur					THÖL
Auffahrunfall				VU1
Verkehrsunfall				VU2
PKW in Fluss				VU3


#F1-Einsätze
Brand in Briefkasten			F1
Brennende Bäume				F1
Brennende Telefonzelle			F1
Brennender LKW				F1
Brennender Müllwagen			F1
Brennender PKW				F1
Brennender Sicherungskasten		F1
Brennendes Gebüsch			F1
Brennendes Gras				F1
Container Brand				F1
Feldbrand				F1+GW-L2
Feuer im Laubhaufen			F1
Gartenlaubenbrand			F1
Kaminbrand				F1+DL
Kioskbrand				F1
Kleiner Waldbrand			F1
Mähdrescherbrand			F1+TLF
Motorrad-Brand				F1
Mülleimer Brand				F1
Schuppenbrand				F1
Sperrmüllbrand				F1
Strohballen Brand			F1+GW-L2
Trocknerbrand				F1
Wohnwagenbrand				F1


#F2-Einsätze
Brand auf Weihnachtsmarkt		F2
Brand-Weihnachtsbaum in Kirche		F2
Brennende S-Bahn			F2Bahn
Dachstuhlbrand				F2+DL
Fettbrand in Pommesbude			F2+TLF
Garagenbrand				F2
Kellerbrand				F2
Schornsteinbrand			F2+DL
Traktorbrand				F2
Wohnungsbrand				F2


#F3-Einsätze
Brand in KFZ-Werkstatt			F3.10
Brand im Supermarkt			F3.12
Gastronomiebrand			F3.10
Gewerbebrand				F3.14+RW
Scheunenbrand				F3.10+GW-L2
Silobrand				F3.10


#F4-Einsätze
Feuer im Altenheim			F4.16
Brand in Schloss			F4.13
Brand in Schule				F4.16
Brand in Spedition			F4.20
Kinobrand				F4.26


#F5-Einsätze


#BF-Einsätze
Brand im Baumarkt			BF(F4+RW)
Brand in Lackfabrik			BF(F3)
Brand in Kletterhalle			BF(F5)
Chemieunfall (an Schule)		BF(GSG)
Chlorgas Alarm (Schwimmbad)		BF(GSG)
Feuer im Krankenhaus			BF(F5)
Person im Fluss				BF(LF,GW-T)


#in Bearbeitung
Brand in Autohaus			F4.10
Brand in Druckerei			F4.10
Brand in Reifenlager			F4.10+GW-L2
Brand in Zugdepot			F4.10Bahn
Brand in Kühlhaus			F4.10
Brand im Sägewerk			F3.10+GW-L2
Brand in Sporthalle			F4.10+GW-L2

Brand im Casino				F4.20
Wohnblockbrand				F2


===Fahrzeugzuordnung

#Brandeinsätze

NEUNEU		LF,LF
undef		LF,LF

F1		LF
F2		LF,LF
F2Bahn		LF,LF,GW-S

F3.10		LF,LF,LF/TLF
F3.12		LF,LF,LF/TLF,DL
F3.14		LF,LF,LF/TLF,ELW,GW-A

F4.10		LF,LF,LF,LF
F4.11		LF,LF,LF,LF,ELW
F4.12		LF,LF,LF,LF,DL
F4.13		LF,LF,LF,LF,ELW,DL
F4.14		LF,LF,LF,LF,ELW,GW-A
F4.15		LF,LF,LF,LF,DL,GW-A
F4.16		LF,LF,LF,LF,ELW,DL,GW-A
F4.10Bahn	LF,LF,LF,LF,GW-S,GW-L2

F4.20		LF,LF,LF,TLF
F4.21		LF,LF,LF,TLF,ELW
F4.23		LF,LF,LF,TLF,ELW,DL
F4.26		LF,LF,LF,TLF,ELW,DL,GW-A

F5		LF,LF,LF,LF,LF/TLF,DL,ELW,GW-A


#VU- / TH-Einsätze

THÖL		LF,GW-Öl
THY		RW
TH1		RW/LF
TH2		RW,LF

VU1		LF
VU2		RW,LF,GW-Öl
VU3		LF,LF,RW

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