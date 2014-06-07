// ==UserScript==
// @name           Unwetter AAO Schoschi
// @namespace      http://userscripts.org/users/142002/scripts
// @description    AAO Daten zum Importieren
// @version        2011-07-16
// ==/UserScript==


# Bezeichnung bei Einsatzklasse:
# Kl = Klein bis Normaler Einsatz
# F = Mittel bis Großer Einsatz (zahl bedeutet,  wie viel LF)
# TH = Technische Hilfe
# VU = Verkehrsunfall
# GSG = Gefahrengutzug
# FH = Flughafen Einsatz
# VB = GSL Verband Einsatz (20 LF)
# H = Hafen Einsatz
# RF = Raffinerie Einsatz
# Unwetter = Unwetter Einsätze



===Einsatzklassen

Auffahrunfall			Unwetter|RW,GW-Öl
Baum auf Auto			Unwetter|GW-Öl,RW
Baum auf Dach			Unwetter|RW,DLK
Baum auf Straße			Unwetter|RW
Brand im Baumarkt		F3+ELW|RW,GW-G,GW-M,GW-A,LF,LF/HLF
Brand im Casino			F5+ELW,DLK|GW-A,TLF,GW-L2,LF,LF,LF,LF,LF,LF/HLF
Brand im Sägewerk		F2|ELW,GW-A,GW-L2,LF,LF/HLF
Brand im Supermarkt		F2|DLK,ELW,GW-A,Kran,LF,LF/HLF
Brand in Autohaus		F2+ELW|TLF,DLK,GW-A,GW-M,LF,LF/HLF
Brand in Briefkasten		Kl 1
Brand in Druckerei		F2|RW,GW-A,GW-L2,DLK,ELW,LF,LF,LF/HLF
Brand in Eishalle		F3|RW,GW-L2,DLK,ELW,TLF
Brand in Gärtnerei		Kl 3|ELW,GW-G,GW-M,DLK
Brand in Gemeindehaus		Kl 2
Brand in KFZ-Werkstatt		F2+TLF|ELW,DLK,GW-A,GW-L2,Kran,LF/HLF
Brand in Kletterhalle		Kl 3|DLK,ELW,GW-L2,LF,LF,LF
Brand in Kühlhaus		F3|ELW,DLK,GW-L2,GW-M,GW-G,LF,LF,LF,LF/HLF
Brand in Lackfabrik		F4|TLF,ELW,DLK,GW-A,GW-G,GW-M,LF,LF,LF/HLF
Brand in Metzgerei		F3|GW-L2,ELW,DLK
Brand in Reifenlager		F3+ELW|TLF,GW-L2,GW-G,GW-M,LF,LF,LF/HLF
Brand in Schloss		F3+ELW,DLK|LF,LF/HLF
Brand in Schule			F3|ELW,DLK,GW-A,LF/HLF
Brand in Spedition		F3|GW-TS,ELW,DLK,TLF,RW,GW-L2,GW-M,GW-G,LF,LF/HLF
Brand in Sporthalle		F3|ELW,GW-A,GW-L2,LF,LF/HLF
Brand in Zugdepot		F3+ELW|DLK,RW,GW-L2,GW-S,LF,LF,LF/HLF
Brennende Bäume			Kl 2
Brennende S-Bahn		Kl 3|GW-S|GW-S,LF/HLF
Brennende Telefonzelle		Kl 1
Brennender LKW			Kl 1
Brennender Müllwagen		Kl 1
Brennender PKW			Kl 1|GW-Öl
Brennender Sicherungskasten	Kl 2
Brennendes Gebüsch		Kl 2
Brennendes Gras			Kl 1
Chemieunfall (an Schule)	GSG Alarm 2|GW-M,GW-G,LF,LF/HLF
Chlorgas Alarm (Schwimmbad)	GSG Alarm|GW-M,GW-G,LF,LF/HLF
Container Brand			Kl 1
Dachstuhlbrand			F2+DLK
Fahrstuhl - Türöffnung		TH 1
Feldbrand			FLH 1|GW-L2
Fettbrand in Pommesbude		F2+TLF
Feuer im Altenheim		F3|ELW,DLK,GW-A,LF,LF/HLF
Feuer im Krankenhaus		F8+DLK|ELW,RW,GW-A,GW-L2,GW-G,GW-M,LF/HLF
Feuer im Laubhaufen		Kl 1
Garagenbrand			Kl 3
Gartenlaubenbrand		Kl 1
Gastronomiebrand		F2|ELW,LF,LF
Gefahrstoff-Austritt in Firma	Kl 4|GW-G,GW-M,ELW,GW-L2,GW-A,GW-TS,LF/HLF
Gewerbebrand			F3|ELW,DLK,GW-A,RW,LF,LF/HLF
Kaminbrand			Kl 3+DLK
Keller unter Wasser		Unwetter 2
Kellerbrand			Kl 3
Kinobrand			F3|ELW,DLK,GW-A,GW-L2,TLF,LF/HLF
Kioskbrand			Kl 2
Kleiner Waldbrand		Kl 1
Küchenbrand			Kl 2
Mähdrescherbrand		Kl 2|TLF
Maschinenbrand			Kl 3|GW-L2,ELW,LF/HLF
Motorrad-Brand			Kl 1
Mülleimer Brand			FLH 1
Ölspur				TH 2+GW-Öl
Person im Fluss			Wasserrettung|TS/LF-8/LF/HLF
PKW in Fluss			Wasserrettung+RW|TS/LF-8/LF/HLF,Kran
Scheunenbrand			F2|ELW,GW-L2,LF,LF,LF/HLF
Schornsteinbrand		F2+DLK
Schuppenbrand			Kl 3|GW-M,GW-G
Silobrand			F1+TLF|LF/HLF
Sperrmüllbrand			Kl 1
Strohballen Brand		Kl 1|GW-L2
Traktorbrand			Kl 1
Trocknerbrand			Kl 2
Türöffnung			Kl 2
Unfall mit Gefahrgut-Transport	Kl 3|Kran,GW-G,RW,ELW,GW-A,Gw-TS,GW-M
Verkehrsunfall			Unwetter+RW|GW-Öl
VU mit Straßenbahn		Kl 3|GW-S,Kran,ELW,RW
Waldbrand			Kl 4|DLK,ELW,GW-L2
Wohnblockbrand			F4+ELW,DLK|GW-A,LF,LF/HLF
Wohnungsbrand			Kl 3
Wohnwagenbrand			Unwetter




# Einsätze am Flughafen

Auffahrunfall				Unwetter|GW-Öl
Brennendes Flugzeug			FH Flughafen Alarm|RW,GW-G,GW-Öl,ELW,GW-M,FLF,LF,LF,LF
Dachstuhlbrand				F2+DLK
Feldbrand				FLH 1
Gewerbebrand				F3|DLK,RW,ELW,GW-A,LF/HLF
Grasnarbenbrand				FLH 1
Mülleimer Brand				FLH 1


# Einsätze am Hafen

Mülleimer Brand				FLH 1
Grasnarbenbrand				FLH 1
Feuer auf Boot (Klein)			H Boot Einsatz
Feldbrand				FLH 1
Dachstuhlbrand				F2+DLK
Gewerbebrand				F3|GW-A,DLK,RW,ELW,LF/HLF
Auffahrunfall				Unwetter|GW-Öl
Feuer auf Boot (Mittel)			H Boot Einsatz
Gabelstapler im Hafenbecken		Wasserrettung 2|RW,Kran,LF/HLF
Verletztentransport			RTW Einsatz


# Einsätze an Raffinerie

Tankbrand				RF 4|GW-TS,RW,ELW,GW-Öl,GW-M,ULF,LF/HLF/FLF
Brennt Tanklager			RF 4|GW-TS,GW-M,ELW,GW-Öl,RW,GW-L2,ULF,LF/HLF/FLF
Brand in Raffinerie			RF 5|GW-TS,GW-G,GW-M,GW-L2,ELW,Kran,DLK,RW,TLF,GW-Öl,LF/HLF/FLF,LF/HLF/FLF
Brand in Betankungsanlage		RF 4|GW-G,GW-M,GW-A,GW-TS,ULF,RW


# Verband Einsatz

Brand in Industriepark			VB GSL Alarm|ELW,DLK,TLF,RW,GW-A,GW-L2,GW-G,GW-M,LF-8,TS
Brand in Steinbruch			VB GSL Alarm|ELW,DLK,RW,GW-A,GW-L2,GW-G,GW-M,LF-8,TS


# Saison Einsätze

# Weihnachts Einsätze

Brand auf Weihnachtsmarkt	Kl 1
Brand-Weihnachtsbaum in Kirche	F3+ELW,TLF


# Sonstiges


Feuer auf Boot (Klein)		H Boot Einsatz
Feuer auf Boot (Mittel)		H Boot Einsatz

Verletztentransport		RTW Einsatz am Hafen 		
			






===Fahrzeugzuordnung

NEUNEU				LF
undef				LF/HLF
Kl 1				KLF/LF/TLF/HLF
Kl 2				KLF/LF/HLF
Kl 3				LF,LF/KLF/HLF
Kl 4				LF,LF,LF/KLF/HLF
F1				LF
F2				LF,LF
F3				LF,LF,LF
F4				LF,LF,LF,LF
F5				LF,LF,LF,LF,LF
F6				LF,LF,LF,LF,LF,LF
F7				LF,LF,LF,LF,LF,LF,LF
F8				LF,LF,LF,LF,LF,LF,LF,LF
TH 1				RW
TH 2				TS/LF-8/HLF
TH 3				TS/LF-8/RW/HLF
Wasserrettung			TS/LF-8/HLF,GW-T
Wasserrettung 2			TS/LF-8/HLF/LF,GW-T
VU				TS/LF-8/HLF
VU 2				TS/LF-8/HLF,RW
GSG Alarm			ELW,GW-M,GW-G,RW
GSG Alarm 2			LF,LF,ELW,GW-M,GW-G
FH 1				FLF/KLF/LF/TLF
FH Flughafen Alarm		FLF,FLF,FLF,FLF,FLF,FLF,RTT
VB GSL Alarm			LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF
RTW Einsatz			|
FLH 1				FLF/KLF/LF/TLF/HLF
H 2				KLF/LF/TLF/HLF
H Boot Einsatz			FLB
H Wasserrettung			TS/LF-8/HLF,GW-T
RF 5				LF,LF,LF,LF,LF
RF 4				LF,LF,LF,LF
Unwetter			LF/HLF
Unwetter 2			TS/LF-8/KLF/TLF/TLF 2/RW


===Fahrzeugklassen

RTW				RTW
LF 10/6				LF
LF 20/16			LF
LF 8				LF-8
Kleinlöschfahrzeug		KLF
TLF 20/40 - SL			TLF
DLA (K) 23/12			DLK
ELW 1				ELW
LF 16-TS			TS
RW				RW
GW-A				GW-A
GW-L2 - Wasser			GW-L2
GW-Öl				GW-Öl
GW-Schiene			GW-S
GW-Taucher			GW-T
GW-Gefahrgut			GW-G
GW-Messtechnik			GW-M
Kran				Kran
Flugfeldlöschfahrzeug		FLF
Rettungstreppe			RTT
Feuerlöschboot			FLB
Rettungsboot			RTB
HLF 10/6			HLF
HLF 20/16			HLF
GW-TUIS				GW-TS
ULF mit Löscharm		ULF
TLF 16/25			TLF 2

===Ende
#