// ==UserScript==
// @name           AAO Schoschi
// @namespace      http://userscripts.org/users/142002/scripts
// @description    AAO Daten zum Importieren
// @version        2012-06-11
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
# B = Bahnhof
# DB = Rettungszug (RTZ)




===Einsatzklassen

Ammoniakaustritt in Eishalle		F2|ELW,GW-A,RW,GW-M,GW-G
Auffahrunfall				VU|RW,GW-Öl
Ausgedehnter Waldbrand			F4|ELW,GW-L2
Auslaufende Betriebsstoffe		TH 4|GW-Öl
Baum auf Auto				TH 2|GW-Öl,RW
Baum auf Dach				TH 2|RW,DLK,LF/HLF
Baum auf Straße				TH 2|RW
Brand im Baumarkt			F3+ELW|RW,GW-G,GW-M,GW-A,LF,LF/HLF
Brand im Casino				F5+ELW,DLK|GW-A,TLF,GW-L2,LF,LF,LF,LF,LF,LF/HLF
Brand im Sägewerk			F2|ELW,GW-A,GW-L2,LF,LF/HLF
Brand im Supermarkt			F2|DLK,ELW,GW-A,Kran,LF,LF/HLF
Brand in Autohaus			F2+ELW|TLF,DLK,GW-A,GW-M,LF,LF/HLF
Brand in Brauerei			Kl 3|GW-A,ELW,GW-L2,DLK
Brand in Briefkasten			Kl 1
Brand in Druckerei			F2|RW,GW-A,GW-L2,DLK,ELW,LF,LF,LF/HLF
Brand in Eishalle			F3|RW,GW-L2,DLK,ELW,TLF
Brand in Gärtnerei			Kl 3|ELW,GW-G,GW-M,DLK,LF/HLF
Brand in Gemeindehaus			Kl 2
Brand in Großwäscherei			Kl 3|GW-A,DLK,GW-M,ELW
Brand in KFZ-Werkstatt			F2+TLF|ELW,DLK,GW-A,GW-L2,Kran,LF/HLF
Brand in Kletterhalle			Kl 3|DLK,ELW,GW-L2,LF,LF,LF
Brand in Kühlhaus			F3|ELW,DLK,GW-L2,GW-M,GW-G,LF,LF,LF,LF/HLF
Brand in Lackfabrik			F4|TLF,ELW,DLK,GW-A,GW-G,GW-M,LF,LF,LF/HLF
Brand in Metzgerei			F3|GW-L2,ELW,DLK
Brand in Reifenlager			F3+ELW|TLF,GW-L2,GW-G,GW-M,LF,LF,LF/HLF
Brand in Schloss			F3+ELW,DLK|LF,LF/HLF
Brand in Schule				F2|ELW,DLK,GW-A,LF/HLF,LF/HLF
Brand in Spedition			F3|GW-TS,ELW,DLK,TLF,RW,GW-L2,GW-M,GW-G,LF,LF/HLF
Brand in Sporthalle			F3|ELW,GW-A,GW-L2,LF,LF/HLF
Brand in Zugdepot			F3+ELW|DLK,RW,GW-L2,GW-S,LF,LF,LF/HLF
Brennende Bäume				Kl 2
Brennende S-Bahn			Kl 3|GW-S|GW-S,LF/HLF
Brennende Telefonzelle			Kl 1
Brennender LKW				Kl 1
Brennender Müllwagen			Kl 1
Brennender PKW				Kl 1|GW-Öl
Brennender Sicherungskasten		Kl 2
Brennendes Bus-Häuschen			Kl 2
Brennendes Gebüsch			Kl 2
Brennendes Gras				Kl 1
Chemieunfall (an Schule)		GSG Alarm 2|GW-M,GW-G,LF,LF/HLF
Chlorgas Alarm (Schwimmbad)		GSG Alarm|GW-M,GW-G,LF,LF/HLF
Container Brand				Kl 1
Dachstuhlbrand				F2|DLK
Fahrstuhl - Türöffnung			TH 1
Feldbrand				FLH 1|GW-L2
Fettbrand in Pommesbude			F2+TLF
Feuer im Altenheim			F3|ELW,DLK,GW-A,LF,LF/HLF
Feuer im Krankenhaus			F8+DLK|ELW,RW,GW-A,GW-L2,GW-G,GW-M,LF/HLF
Feuer im Laubhaufen			Kl 1
Garagenbrand				Kl 3
Gartenlaubenbrand			Kl 1
Gastronomiebrand			F2|ELW,LF,LF
Gefahrstoff-Austritt in Firma		Kl 4|GW-G,GW-M,ELW,GW-L2,GW-A,GW-TS,LF/HLF,LF/HLF
Gewerbebrand				F3|ELW,DLK,GW-A,RW,LF,LF/HLF
Kaminbrand				Kl 3|DLK
Keller unter Wasser			TH 3
Kellerbrand				Kl 3
Kinobrand				F3|ELW,DLK,GW-A,GW-L2,TLF,LF/HLF
Kioskbrand				Kl 2
Kleiner Waldbrand			Kl 1
Kleintier in Not			TH 4
Küchenbrand				Kl 2
LKW in Brückengeländer			TH 4|ELW,Kran,RW,DLK,LF/HLF
Mähdrescherbrand			Kl 2|TLF
Maschinenbrand				Kl 3|GW-L2,ELW,LF/HLF
Motorrad-Brand				Kl 1
Mülleimer Brand				FLH 1
Ölspur					TH 2+GW-Öl
Person im Fluss				Wasserrettung|TS/LF-8/LF/HLF
Person in Schacht			TH 4
PKW in Fluss				Wasserrettung+RW|TS/LF-8/LF/HLF,Kran
Scheunenbrand				F2|ELW,GW-L2,LF,LF,LF/HLF
Schornsteinbrand			F2+DLK
Schuppenbrand				Kl 3|GW-M,GW-G
Silobrand				F1+TLF|LF/HLF
Sperrmüllbrand				Kl 1
Strohballen Brand			Kl 1|GW-L2
Traktorbrand				Kl 1
Trocknerbrand				Kl 2
Türöffnung				TH 4
Unfall mit Gefahrgut-Transport		Kl 3|Kran,GW-G,RW,ELW,GW-A,GW-TS,GW-M
Verkehrsunfall				VU 2|GW-Öl
VU mit Straßenbahn			TH 5|GW-S,Kran,ELW,RW,LF/HLF
Waldbrand				Kl 4|DLK,ELW,GW-L2,LF/HLF
Wohnblockbrand				F3+ELW,DLK|GW-A,LF,LF,LF/HLF
Wohnungsbrand				Kl 3
Wohnwagenbrand				Kl 1


# Neue Einsätze 05.6.12
Brennt Anhänger				Kl 2		<<<<---------- Neu
Brennende Windmühle			Kl 3|ELW,DLK
Baukran auf Auto			TH 4


# Einsätze am Flughafen

Auffahrunfall				VU|GW-Öl
Brennendes Flugzeug			FH Flughafen Alarm|RW,GW-G,GW-Öl,ELW,GW-M,FLF,LF,LF,LF
Dachstuhlbrand				F2|DLK
Feldbrand				FLH 1|GW-L2
Gewerbebrand				F3|DLK,RW,ELW,GW-A,LF/HLF
Grasnarbenbrand				FLH 1
Mülleimer Brand				FLH 1


# Einsätze am Hafen

Auffahrunfall				VU|GW-Öl
Dachstuhlbrand				F2+DLK
Feldbrand				FLH 1
Feuer auf Boot (Klein)			H Boot Einsatz
Feuer auf Boot (Mittel)			H Boot Einsatz
Gabelstapler im Hafenbecken		Wasserrettung 2|RW,Kran,LF/HLF
Gewerbebrand				F3|GW-A,DLK,RW,ELW,LF/HLF
Grasnarbenbrand				FLH 1
Mülleimer Brand				FLH 1
Verletztentransport			RTW Einsatz


# Einsätze an Raffinerie

Brand in Raffinerie			RF 5|GW-TS,GW-G,GW-M,GW-L2,ELW,Kran,DLK,RW,TLF,GW-Öl,ULF,LF/HLF/HLF-S,LF/HLF/TLF-B/HLF-S
Brennt Tanklager			RF 4|GW-TS,GW-M,ELW,GW-Öl,RW,GW-L2,ULF,LF/HLF
Tankbrand				RF 4|GW-TS,RW,ELW,GW-Öl,GW-M,ULF,LF/HLF/FLF
Brand in Betankungsanlage		RF 4|GW-G,GW-M,GW-A,GW-TS,ULF,RW,LF/HLF,LF/HLF


# Einsätze am Bahnhof

Brennender Güterzug (Bahnhof)		F3|GW-M,GW-G,ELW,TLF,GW-TS,LF/HLF-S
Feuer im Personenzug (Bahnhof)		F3|ELW,GW-L2,LF/HLF-S
Güterzug entgleist (Bahnhof)		F3|GW-G,ELW,Kran,RW,GW-TS,GW-S,GW-M,LF/HLF-S,LF/HLF-S
Unfall an Bahnübergang			B2
Brand in Fahrkartenautomat		B1
Brennende Lokomotive			B1|LF/HLF-S
Rangierunfall				B2|GW-Öl,GW-S,RW,ELW
Feuer in Bahnhofshalle			F3|ELW,GW-L2,DLK,GW-A,LF/HLF-S,LF/HLF-S


# Einsätze an Bahnstrecke

Brennender Güterzug			F3|GW-L2,ELW,GW-M,GW-G,GW-TS
Feuer im Personenzug			F3|TLF,GW-L2,ELW,LF/HLF-S
Güterzug entgleist			F4|ELW,DLK,RW,GW-S,GW-G,GW-TS,GW-M,LF/HLF-S,LF/HLF-S
Brand am Bahndamm			B2
Baum auf Schiene			B1


# Einsätze am Tunnel

Feuer im Personenzug (Tunnel)		F4|ELW,GW-L2,LF/HLF-S,LF/HLF-S
Güterzug entgleist (Tunnel)		F3|GW-M,GW-G,ELW,GW-S,GW-A,RW,GW-TS,LF/HLF-S
Brennender Güterzug (Tunnel)		F3|GW-M,GW-L2,GW-G,GW-TS,ELW
RTZ Einsatz				DB

				
# Verband Einsatz

Brand in Industriepark			VB GSL Alarm|ELW,DLK,TLF,RW,GW-A,GW-L2,GW-G,GW-M,LF-8,TS
Brand in Steinbruch			VB GSL Alarm|ELW,DLK,RW,GW-A,GW-L2,GW-G,GW-M,LF-8,TS


# Saison Einsätze

# Weihnachts Einsätze

Brand auf Weihnachtsmarkt		Kl 1
Brand-Weihnachtsbaum in Kirche		F3|ELW,TLF


# Sonstiges

Feuer auf Boot (Klein)			H Boot Einsatz
Feuer auf Boot (Mittel)			H Boot Einsatz

Verletztentransport			RTW Einsatz am Hafen






===Fahrzeugzuordnung

NEUNEU				LF
undef				LF/HLF
Kl 1				KLF/LF/TLF/HLF/TLF-B
Kl 2				KLF/LF/HLF/TLF-B
Kl 3				LF,LF/KLF/HLF/TLF-B
Kl 4				LF,LF,LF/KLF/HLF/TLF-B
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
TH 4				TS/LF-8/KLF/HLF/TLF-B
TH 5				TS/LF-8/KLF/HLF/TLF-B,TS/LF-8/HLF
Wasserrettung			TS/LF-8/HLF,GW-T
Wasserrettung 2			TS/LF-8/HLF/LF,GW-T
VU				TS/LF-8/HLF
VU 2				TS/LF-8/HLF,RW
GSG Alarm			ELW,GW-M,GW-G,RW
GSG Alarm 2			ELW,GW-M,GW-G
FH 1				FLF/KLF/LF/TLF/TLF-B
FH Flughafen Alarm		FLF,FLF,FLF,FLF,FLF,FLF,RTT
VB GSL Alarm			LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF
RTW Einsatz			|
FLH 1				FLF/KLF/LF/TLF/HLF/TLF-B
H 2				KLF/LF/TLF/HLF
H Boot Einsatz			FLB
H Wasserrettung			TS/LF-8/HLF,GW-T
RF 5				LF,LF,LF,LF,LF
RF 4				LF,LF,LF,LF
B1				LF/HLF-S
B2				LF,LF/HLF-S
DB				HLF-S,HLF-S,HLF-S,HLF-S


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
TLF 16/25			TLF-B
HLF 24/14-S			HLF-S
Notarzteinsatzfahrzeug		NEF
Rettungszug			RTZ


===Ende
#