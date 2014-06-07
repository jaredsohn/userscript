// ==UserScript==
// @name           AAO Hopeman
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-06-07
// ==/UserScript==


# AAO-Datei
#   zur Nutzung im AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
#
# Erstellt auf Basis der Version Sawos 2010-03-10
#
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#
#
# Zusätzliche Einheiten zu den Alarmklassen:
# A= Atemschutz
# B= Bahn
# D= Drehleiter
# E= Einsatzleitung (noch nicht verwendet)
# G= Gefahrgut
# H= Höhenrettung (noch nicht verwendet)
# K= Kranwagen
# L= Logistik Wasserversorgung
# Ö= Ölschaden
# P= Pumpeneinsatz Wasserschaden
# R= Rüstwagen
# S= Schaum / Großtanklöschfahrzeug
# V= Verstärkung um ein Löschfahrzeug (noch nicht verwendet)
# W= Wasserrettung
# Y= Menschen in Gefahr
#
#
# 61 erfasste Notfallmeldungen
#
#


===Einsatzklassen

Auffahrunfall				TH2
Baum auf Auto				TH2-Ö
Baum auf Dach				TH2-D
Baum auf Straße				TH1
Brand in Autohaus			F4-GY
Brand in Briefkasten			FK
Brand in Druckerei			F4-LRY
Brand in KFZ-Werkstatt			F3-K
Brand in Kühlhaus			F3-GLY
Brand in Spedition			F4-RS
Brand in Schloss			F3
Brand in Schule				F4-Y
Brand in Spedition			F4-GLRS
Brand in Sporthalle			F4-LY
Brand in Zugdepot			F4-BLRY
Brand im Baumarkt			F4-GRY
Brand im Sägewerk			F4-LY
Brand im Supermarkt			F4-K
Brennende Bäume				F1-D
Brennende S-Bahn			F2-BY
Brennende Telefonzelle			FK
Brennender LKW				F1-Ö
Brennender Müllwagen			F1
Brennender PKW				F1
Brennender Sicherungskasten		F1
Brennendes Gebüsch			F1
Brennendes Gras				F1
Chemieunfall (an Schule)		GSG4
Chlorgas Alarm (Schwimmbad)		GSG2
Container Brand				FK
Dachstuhlbrand				F2-D
Fahrstuhl - Türöffnung			TH2
Feldbrand				FK-L
Fettbrand in Pommesbude			F3-S
Feuer im Altenheim			F4
Feuer im Krankenhaus			F5-GRY
Feuer im Laubhaufen			FK
Garagenbrand				F2
Gartenlaubenbrand			FK
Gastronomiebrand			F2-V
Gewerbebrand				F4-RY
Kaminbrand				F1-D
Kellerbrand				F2-A
Keller unter Wasser			TH1-P
Kinobrand				F4-S
Kioskbrand				F1
Kleiner Waldbrand			F1
Mähdrescherbrand			F1-S
Motorrad-Brand				FK
Mülleimer Brand				FK
Ölspur					ÖL2
Person im Fluss				WA1-Y
PKW in Fluss				WA2-KY
Scheunenbrand				F3-L
Schornsteinbrand			F2-D
Schuppenbrand				F2-G
Silobrand				F3
Sperrmüllbrand				FK
Strohballen Brand			F1-L
Traktorbrand				F1
Verkehrsunfall				TH2-ÖY
Wohnblockbrand				F5-Y
Wohnungsbrand				F2
Wohnwagenbrand				F1
Brand auf Weihnachtsmarkt		F2
Brand-Weihnachtsbaum in Kirche		F3
# 29.03.2010
Trocknerbrand				F1
Brand in Reifenlager			F2-GLVVY
Brand im Casino				F8-DELSY
# 17.04.2010
Brand in Lackfabrik			F4-GY


===Fahrzeugzuordnung

FK		LF/TLF/STLF|LF/TLF/STLF
FK-L		LF/TLF/STLF,GW-L2|LF/TLF/STLF,GW-L2

F1		LF/TLF|LF,TLF,STLF
F1-D		LF/TLF,DLK|LF,TLF,DLK,STLF
F1-Ö		LF/TLF,GW-Öl|LF,TLF,GW-Öl,STLF
F1-L		LF/TLF,GW-L2|LF,TLF,GW-L2,STLF
F1-S		LF/TLF,STLF|LF,TLF,STLF

F2		ELW,LF/TLF,LF|ELW,LF,TLF
F2-A		ELW,LF/TLF,LF,GW-A|ELW,LF,TLF,GW-A
F2-BY		ELW,LF/TLF,LF,GW-Bahn,RTW|ELW,LF,TLF,GW-Bahn,RTW
F2-D		ELW,LF/TLF,LF,DLK|ELW,LF,TLF,DLK
F2-G		ELW,LF/TLF,LF,GW-Mess,GW-GSG|ELW,LF,TLF,GW-Mess,GW-GSG
F2-GL		ELW,LF/TLF,LF,GW-Mess,GW-GSG,GW-L2|ELW,LF,TLF,GW-Mess,GW-GSG,GW-L2
F2-GLVVY	ELW,LF/TLF,LF/TLF,LF,LF,GW-Mess,GW-GSG,GW-L2,RTW|ELW,LF,TLF,LF,GW-Mess,GW-GSG,GW-L2,RTW
F2-L		ELW,LF/TLF,LF,GW-L2|ELW,LFH/LF/TSF-W,GW-L2
F2-V		ELW,LF/TLF,LF,LF|ELW,LFH/LF/TSF-W

F3		ELW,DLK,GW-A,LF/TLF,LF,LF|ELW,DLK,GW-A,LF,TLF,RTW,RTW
F3-BLRY		ELW,DLK,GW-A,LF/TLF,LF,LF,GW-Bahn,GW-L2,RW,RTW|ELW,DLK,GW-A,LF,TLF,GW-Bahn,GW-L2,RW,RTW
F3-G		ELW,DLK,GW-A,LF/TLF,LF,LF,GW-Mess,GW-GSG|ELW,DLK,GW-A,LF,TLF,GW-Mess,GW-GSG
F3-GL		ELW,DLK,GW-A,LF/TLF,LF,LF,GW-Mess,GW-GSG,GW-L2|ELW,DLK,GW-A,LF,TLF,GW-Mess,GW-GSG,GW-L2
F3-GLY		ELW,DLK,GW-A,LF/TLF,LF,LF,GW-Mess,GW-GSG,GW-L2,RTW|ELW,DLK,GW-A,LF,TLF,GW-Mess,GW-GSG,GW-L2,RTW
F3-K		ELW,DLK,GW-A,FwK,LF/TLF,LF,LF|ELW,DLK,GW-A,FwK,LF,TLF,RTW,RTW
F3-L		ELW,DLK,GW-A,LF/TLF,LF,LF,GW-L2|ELW,DLK,GW-A,LF,TLF,GW-L2
F3-LS		ELW,DLK,GW-A,LF/TLF,LF,LF,STLF,GW-L2|ELW,DLK,GW-A,LF,TLF,STLF,GW-L2
F3-ÖS		ELW,DLK,GW-A,LF/TLF,LF,LF,STLF,GW-Öl|ELW,DLK,GW-A,LF,TLF,STLF,GW-Öl
F3-S		ELW,DLK,GW-A,LF/TLF,LF,LF,STLF|ELW,DLK,GW-A,LF,TLF,STLF

F4		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF|ELW,DLK,GW-A,TLF,LF,LF
F4-BLRY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-Bahn,GW-L2,RW,RTW|ELW,DLK,GW-A,TLF,LF,LF,GW-Bahn,GW-L2,RW,RTW
F4-G		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-Mess,GW-GSG|ELW,DLK,GW-A,TLF,LF,LF,GW-Mess,GW-GSG
F4-GLRS		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-Mess,GW-GSG,RW,STLF,GW-L2|ELW,DLK,GW-A,TLF,LF,LF,GW-Mess,GW-GSG,RW,STLF,GW-L2
F4-GRY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-Mess,GW-GSG,RW,RTW|ELW,DLK,GW-A,TLF,LF,LF,GW-Mess,GW-GSG,RW,RTW
F4-GY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-Mess,GW-GSG,RTW|ELW,DLK,GW-A,TLF,LF,LF,GW-Mess,GW-GSG,RTW
F4-K		ELW,DLK,GW-A,FwK,LF/TLF,LF/TLF,LF,LF|ELW,DLK,GW-A,FwK,TLF,LF,LF
F4-L		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-L2|ELW,DLK,GW-A,TLF,LF,LF,GW-L2
F4-LRY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-L2,RW,RTW|ELW,DLK,GW-A,TLF,LF,LF,GW-L2,RW,RTW
F4-LY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,GW-L2,RTW|ELW,DLK,GW-A,TLF,LF,LF,GW-L2,RTW
F4-R		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,RW|ELW,DLK,GW-A,TLF,LF,LF,RW
F4-RS		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,RW,STLF|ELW,DLK,GW-A,TLF,LF,LF,RW,STLF
F4-RY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,RW,RTW|ELW,DLK,GW-A,TLF,LF,LF,RW,RTW
F4-S		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,STLF|ELW,DLK,GW-A,TLF,LF,LF,STLF
F4-Y		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,RTW|ELW,DLK,GW-A,TLF,LF,LF,RTW

F5		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,LF/LFKatS|ELW,DLK,GW-A,TLF,LF,LF,LFKatS
F5-G		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,LF/LFKatS,GW-Mess,GW-GSG|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,GW-Mess,GW-GSG
F5-GRY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,LF/LFKatS,GW-Mess,GW-GSG,RW,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,GW-Mess,GW-GSG,RW,RTW
F5-RY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,LF/LFKatS,RW,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,RW,RTW
F5-Y		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF,LF,LF/LFKatS,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,RTW

F6		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF/TLF,LF,LF/LFKatS,LF/LFKatS|ELW,DLK,GW-A,TLF,LF,LF,LFKatS
F6-G		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF/TLF,LF,LF/LFKatS,LF/LFKatS,GW-Mess,GW-GSG|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,GW-Mess,GW-GSG
F6-LSY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF/TLF,LF,LF/LFKatS,LF/LFKatS,GW-L2,STLF,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,GW-L2,STLF,RTW
F6-LRSY		ELW,DLK,GW-A,LF/TLF,LF/TLF,LF/TLF,LF,LF/LFKatS,LF/LFKatS,RW,GW-L2,STLF,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,RW,GW-L2,STLF,RTW

F7-DELSY	ELW,ELW,DLK,DLK,GW-A,LF/TLF,LF/TLF,LF/TLF,LF,LF,LF/LFKatS,LF/LFKatS,GW-L2,STLF,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,GW-L2,STLF,RTW

F8-DELSY	ELW,ELW,DLK,DLK,GW-A,LF/TLF,LF/TLF,LF/TLF,LF/TLF,LF,LF,LF/LFKatS,LF/LFKatS,GW-L2,STLF,RTW|ELW,DLK,GW-A,TLF,LF,LF,LFKatS,GW-L2,STLF,RTW

ÖL1		RW/LF/TLF,GW-Öl|RW/LFH/LF/TSF-W,GW-Öl
ÖL2		LF/TLF,GW-Öl|LFH/LF/TSF-W,GW-Öl

TH1		RW/LF/TLF|RW/LFH/LF/TSF-W
TH1-Ö		RW/LF/TLF,GW-Öl|RW/LFH/LF/TSF-W,GW-Öl
TH1-P		RW/LF/TLF/STLF|RW/LFH/LF/TSF-W/STLF

TH2		RW,LF/TLF|RW,LF/TLF
TH2-D		RW,LF/TLF,DLK|RW,LF/TLF,DLK
TH2-Ö		RW,LF/TLF,GW-Öl|RW,LF/TLF,GW-Öl
TH2-ÖY		RW,LF/TLF,GW-Öl,RTW|RW,LF/TLF,GW-Öl,RTW

WA1-Y		LF/TLF,GW-Taucher,RTW|RW/LF/TLF,GW-Taucher,RTW
WA2-KY		RW,LF/TLF,GW-Taucher,FwK,RTW|RW,LF/TLF,GW-Taucher,FwK,RTW

GSG2		ELW,RW,LF/TLF,LF,GW-Mess,GW-GSG|ELW,RW,LF/TLF,GW-Mess,GW-GSG
GSG4		ELW,RW,LF/TLF,LF/TLF,LF,LF,GW-Mess,GW-GSG|ELW,RW,LF/TLF,GW-Mess,GW-GSG


===Fahrzeugklassen

RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	TLF
TLF 20/40 - SL		STLF
DLA (K) 23/12		DLK
ELW 1			ELW
LF 16-TS		LFKatS
RW			RW
GW-A			GW-A
GW-L2 - Wasser		GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-Bahn
GW-Taucher		GW-Taucher
GW-Gefahrgut		GW-GSG
GW-Messtechnik		GW-Mess
Kran			FwK

===Ende
#