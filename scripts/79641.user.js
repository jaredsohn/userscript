// ==UserScript==
// @name           AAO euronotruf112
// @namespace      http://userscripts.org/users/79641
// @based on       Script by Sawos
// @description    AAO Daten zum importieren
// @version        2010-06-20
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
#
# Diese Datei basiert auf dem Script von Sawos!!

===Einsatzklassen
Auffahrunfall				TH1
Baum auf Auto				TH2+GW-Öl
Baum auf Dach				TH2+DL
Baum auf Straße				TH1
Brand im Casino				B6+GW-A,RTW
Brand im Sägewerk			B6+GW-A,RTW
Brand im Supermarkt			B4+Kran
Brand in Zugdepot			B6+RW,GW-S,RTW
Brand in Autohaus			B5+GW-A,RTW
Brand in Briefkasten			B0
Brand in Druckerei			B7
Brand in KFZ-Werkstatt			B3+Kran
Brand in Kühlhaus			BF3
Brand in Kletterhalle			B3
Brand in Lackfabrik			BF2a+RTW
Brand in Schloss			B5
Brand in Schule				B5+GW-A,RTW
Brand in Spedition			B6+RW
Brand in Sporthalle			B6+GW-A,RTW
Brand in Reifenlager			BF2+RTW
Brand im Baumarkt			BF1+RTW
Brennende Bäume				B1
Brennende Telefonzelle			B1
Brennende S-Bahn			B1+GW-S
Brennender LKW				B1
Brennender Müllwagen			B1
Brennender PKW				B1
Brennender Sicherungskasten		B0
Brennendes Gebüsch			B0
Brennendes Gras				B0
Container Brand				B0
Chemieunfall(an Schule)		BF1
Chlorgas Alarm(Schwimmbad)		GSG2
Dachstuhlbrand				B4
Fahrstuhl-Türöffnung			TH1
Feldbrand				B0
Fettbrand in Pommesbude		B3+TLF
Feuer im Altenheim			B5+GW-A
Feuer im Laubhaufen			B0
Feuer im Krankenhaus			BF4
Garagenbrand				B1
Gartenlaubenbrand			B0
Gastronomiebrand			B3
Gewerbebrand				B5+RW,GW-A
Kaminbrand				B4
Keller unter Wasser			TH1
Kellerbrand				B2
Kinobrand				B5+TLF,GW-A
Kioskbrand				B1
Kleiner Waldbrand			B1+GW-L2
Mähdrescherbrand			B2
Motorrad-Brand				B0
Mülleimerbrand				B0 
Ölspur					TH3
PKW in Fluss				WAS/PKW
Person im Fluss				WAS/Person
Scheunenbrand				B2+GW-L2
Schornsteinbrand			B4
Schuppenbrand				B2
Silobrand				B2
Sperrmüllbrand				B0
Strohballen Brand			B2+GW-L2
Traktorbrand				B1
Trocknerbrand				B1
Verkehrsunfall				TH2+GW-Öl 				
Wohnblockbrand				B5
Wohnungsbrand				B2
Wohnwagenbrand				B1


===Fahrzeugzuordnung
ohne		LF
B0		KLF/LF
B1		LF
B2		LF,LF/TLF
B3		LF,TLF,ELW
B4		LF,LF/TLF,DL
B5		LF,LF,LF/TLF,ELW,DL
B6		LF,LF,LF/TLF,ELW,DL,GW-L2
B7		LF,LF,LF/TLF,ELW,DL,GW-L2,RW,GW-A
BF1		LF,LF,LF/TLF,ELW,GW-A,RW,GW-G,GW-M
BF2		LF,LF,LF/TLF,ELW,GW-G,GW-M,GW-L2
BF2a		LF,LF,LF/TLF,ELW,GW-G,GW-M,GW-A,DL
BF3		LF,LF,LF/TLF,ELW,GW-G,GW-M,GW-L2,DL
BF4		LF,LF,LF/TLF,ELW,GW-A,RW,GW-G,GW-M,GW-L2
TH1		LF
TH2		RW,LF
TH3		GW-Öl,LF
WAS/PKW		LF,RW,ELW,Kran,GW-T		
WAS/Person	KLF/LF,GW-T
GSG1		LF/TLF,ELW,RW,GW-M,GW-A

===Fahrzeugklassen
RTW			RTW
LF 10/6			LF
LF 20/16		LF
LF 8			LF
Kleinlöschfahrzeug	KLF
TLF 20/40 - SL		TLF
DLA (K) 23/12		DL
ELW 1			ELW
LF 16-TS		LF
RW			RW
GW-A			GW-A
GW-L2 - Wasser		GW-L2
GW-Öl			GW-Öl
GW-Schiene		GW-S
GW-Taucher		GW-T
GW-Gefahrgut		GW-G
GW-Messtechnik		GW-M
Kran			Kran
===Ende
#