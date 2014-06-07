// ==UserScript==
// @name           AAO Hopeman (Minimal)
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        2010-06-15
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
# In dieser Version des Scripts ist die Erstalarmierung auf eine Minimalanzahl von 
# Fahrzeugen beschränkt. Sämtliche darüber hinaus benötigten Sonderfahrzeuge werden zwar 
# als optionale Fahrzeuge vorgeschlagen, müssen aber von Hand alarmiert werden.
#
# Zusätzliche Einheiten zu den Alarmklassen:
# A= Atemschutz
# B= Bahn-Notfallmanager
# D= Drehleiter
# E= Einsatzleitung (noch nicht verwendet)
# G= Gefahrgut
# H= Höhenrettung (noch nicht verwendet)
# K= Kranwagen
# L= Logistik Wasserversorgung = Schlauchwagen
# Ö= Ölbinder
# P= Pumpeneinsatz Wasserschaden
# R= Rüstwagen
# S= Schaummittel
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
Brand in Eishalle			F3-LRS
Brand in Gärtnerei			F3-GY
Brand in KFZ-Werkstatt			F3-K
Brand in Kletterhalle			F4-LSY
Brand in Kühlhaus			F3-GLY
Brand in Lackfabrik			F4-GY
Brand in Metzgerei			F3-LY
Brand in Reifenlager			F4-GLY
Brand in Spedition			F4-RS
Brand in Schloss			F3
Brand in Schule				F4-Y
Brand in Spedition			F4-GLRS
Brand in Sporthalle			F4-LY
Brand in Zugdepot			F4-BLRY
Brand im Baumarkt			F4-GRY
Brand im Casino				F8-DELSY
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
Dachstuhlbrand				F3
Fahrstuhl - Türöffnung			TH2
Feldbrand				FK-L
Fettbrand in Pommesbude			F3-S
Feuer im Altenheim			F4
Feuer im Krankenhaus			F5-GRY
Feuer im Laubhaufen			FK
Garagenbrand				F2
Gartenlaubenbrand			FK
Gastronomiebrand			F3
Gewerbebrand				F4-RY
Grasnarbenbrand				FK
Kaminbrand				FK-D
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
Trocknerbrand				F1
Verkehrsunfall				TH2-ÖY
Wohnblockbrand				F5-Y
Wohnungsbrand				F2
Wohnwagenbrand				F1-Y
Brand auf Weihnachtsmarkt		F2
Brand-Weihnachtsbaum in Kirche		F3


===Fahrzeugzuordnung

FK		LF/StLF
FK-D		LF/StLF|Drehleiter
FK-L		LF/StLF|Schlauchwagen

F1		LF/StLF
F1-D		LF/StLF|Drehleiter
F1-Ö		LF/StLF|Ölbinder
F1-L		LF/StLF|Schlauchwagen
F1-S		LF/StLF|Schaummittel
F1-Y		LF/StLF|RTW

F2		LF/StLF,LF,Einsatzleitung
F2-A		LF/StLF,LF,Einsatzleitung|Atemschutz
F2-BY		LF/StLF,LF,Einsatzleitung|DB-Notfallmanager,RTW
F2-D		LF/StLF,LF,Einsatzleitung,Drehleiter
F2-G		LF/StLF,LF,Einsatzleitung|GW-Mess,GW-GSG
F2-GL		LF/StLF,LF,Einsatzleitung|GW-Mess,GW-GSG,Schlauchwagen
F2-L		LF/StLF,LF,Einsatzleitung|Schlauchwagen

F3		Einsatzleitung,LF/StLF,LF|Drehleiter,Atemschutz,LF
F3-BLRY		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen,Rüstwagen,DB-Notfallmanager,RTW
F3-G		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,GW-Mess,GW-GSG
F3-GL		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,GW-Mess,GW-GSG,Schlauchwagen
F3-GLY		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,GW-Mess,GW-GSG,Schlauchwagen,RTW
F3-GY		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,GW-Mess,GW-GSG,RTW
F3-K		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,FwK
F3-L		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen
F3-LRS		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Rüstwagen, Schaummittel,Schlauchwagen
F3-LS		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schaummittel,Schlauchwagen
F3-LSY		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schaummittel,Schlauchwagen,RTW
F3-LY		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen,RTW
F3-ÖS		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schaummittel,Ölbinder
F3-S		Einsatzleitung,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schaummittel

F4		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF|LF
F4-BLRY		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF|DB-Notfallmanager,Schlauchwagen,Rüstwagen,LF,RTW
F4-G		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,GW-Mess,GW-GSG
F4-GLRS		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,GW-Mess,GW-GSG,Rüstwagen,Schaummittel,Schlauchwagen
F4-GLY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,GW-Mess,GW-GSG,Drehleiter,Atemschutz,Schlauchwagen,RTW
F4-GRY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,GW-Mess,GW-GSG,Drehleiter,Atemschutz,Rüstwagen,RTW
F4-GY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,GW-Mess,Drehleiter,Atemschutz,GW-GSG,RTW
F4-K		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Kran
F4-L		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen
F4-LRY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen,Rüstwagen,RTW
F4-LSY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen,Schaummittel,RTW
F4-LY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schlauchwagen,RTW
F4-R		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Rüstwagen
F4-RS		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Rüstwagen,Schaummittel
F4-RY		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Rüstwagen,RTW
F4-S		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,Schaummittel
F4-Y		Einsatzleitung,LF/StLF,LF/StLF,LF|LF,Drehleiter,Atemschutz,RTW

F5		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF,LF|LF
F5-G		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF,LF|LF,GW-Mess,GW-GSG
F5-GRY		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF,LF|LF,GW-Mess,GW-GSG,Rüstwagen,RTW
F5-RY		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF,LF|LF,Rüstwagen,RTW
F5-Y		Einsatzleitung,Drehleiter,Atemschutz,LF/StLF,LF/StLF,LF,LF|LF,RTW

F6		Einsatzleitung,Drehleiter,Atemschutz,LF/TLF,LF/TLF,LF/TLF,LF|LF,LF
F6-G		Einsatzleitung,Drehleiter,Atemschutz,LF/TLF,LF/TLF,LF/TLF,LF|LF,LF,GW-Mess,GW-GSG
F6-LSY		Einsatzleitung,Drehleiter,Atemschutz,LF/TLF,LF/TLF,LF/TLF,LF|LF,LF,Schlauchwagen,Schaummittel,RTW
F6-LRSY		Einsatzleitung,Drehleiter,Atemschutz,LF/TLF,LF/TLF,LF/TLF,LF|LF,LF,Rüstwagen,Schlauchwagen,Schaummittel,RTW

F7-DELSY	Einsatzleitung,Drehleiter,Atemschutz,LF/TLF,LF/TLF,LF/TLF,LF,LF|LF,LF,Schlauchwagen,Schaummittel,RTW

F8-DELSY	Einsatzleitung,Drehleiter,Atemschutz,LF/TLF,LF/TLF,LF/TLF,LF/TLF,LF,LF|LF,LF,Schlauchwagen,Schaummittel,RTW

ÖL1		Rüstwagen/LF/StLF,Ölbinder
ÖL2		LF/StLF,Ölbinder

TH1		Rüstwagen/LF/StLF
TH1-Ö		Rüstwagen/LF/StLF,Ölbinder
TH1-P		Rüstwagen/LF/StLF/Schaummittel

TH2		LF/StLF,Rüstwagen
TH2-D		LF/StLF,Rüstwagen,Drehleiter
TH2-Ö		LF/StLF,Rüstwagen,Ölbinder
TH2-ÖY		LF/StLF,Rüstwagen,Ölbinder|RTW

WA1-Y		LF/StLF,Taucher|RTW
WA2-KY		LF/StLF,Rüstwagen,Taucher|Kran,RTW

GSG2		Einsatzleitung,Rüstwagen,LF/StLF,LF,GW-Mess,GW-GSG
GSG4		Einsatzleitung,Rüstwagen,LF/StLF,LF,GW-Mess,GW-GSG|LF/StLF,LF


===Fahrzeugklassen

RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	StLF
TLF 20/40 - SL		Schaummittel
DLA (K) 23/12		Drehleiter
ELW 1			Einsatzleitung
LF 16-TS		LF
RW			Rüstwagen
GW-A			Atemschutz
GW-L2 - Wasser		Schlauchwagen
GW-L2 Wasser		Schlauchwagen
GW-Öl			Ölbinder
GW-Schiene		DB-Notfallmanager
GW-Taucher		Taucher
GW-Gefahrgut		GW-GSG
GW-Messtechnik		GW-Mess
Kran			Kran

===Ende
#