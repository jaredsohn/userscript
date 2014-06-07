// ==UserScript==
// @name           AAO Thomas21030
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        11. Version - 2011
// ==/UserScript==

# AAO-Datei
#   zur Nutzung im Orginal AAO-Script von Sawos
#   s. http://userscripts.org/scripts/show/50002
#
# Version Sawos 2010-03-10
#
# ODER
#
# In der AKTUALLISIERTEN Version von Schoschi
# s. http://userscripts.org/show/83189
#
# Versin Schoschi 2011-03-29
#
# leere Zeilen und Zeilen, die mit # beginnen, werden nicht berücksichtigt,
# Zeilen, die mit === beginnen, leiten einen neuen Abschnitt ein
# innerhalb der Abschnitte gilt immer "Key<TAB>Value" , wobei beliebig viele 
# Tabs erlaubt sind - aber NUR Tabs, keine Leerzeichen!
#



===Einsatzklassen


Auffahrunfall				TH1_Auffahrunfall
Baum auf Auto				***TH1_Verkehr
Baum auf Dach				***TH2_Baum_Dach
Baum auf Straße				TH1_Baum_Straße		
Brand im Baumarkt			F4_Baumarkt	
Brand im Casino				F5_Casino
Brand im Sägewerk			F4_Sägewerk	
Brand im Supermarkt			F3_Supermarkt	
Brand in Autohaus			F4_Autohaus	
Brand in Briefkasten			Kleinbrand_A	
Brand in Druckerei			F3_Druckerei	
Brand in Eishalle			F3_Eishalle
Brand in Gemeindehaus			F2_Gemeindehaus
Brand in Gärtnerei			F3_Gärtnerrei	
Brand in KFZ-Werkstatt			F3_Werkstatt	
Brand in Kletterhalle			F4_Kletterhalle	
Brand in Kühlhaus			F4_Kühlhaus	
Brand in Lackfabrik			F4_Lackfabrik	
Brand in Metzgerei			F3_Metzgerei	
Brand in Reifenlager			F3_Reifenlager
Brand in Schloss			F3_Schloss
Brand in Schule				F3_Schule
Brand in Spedition			F3_Spedition	
Brand in Sporthalle			F4_Sporthalle	
Brand in Zugdepot			F3_Zugdepot
Brennende Bäume				***Kleinbrand_B
Brennende S-Bahn			F2_S-Bahn	
Brennende Telefonzelle			Kleinbrand_A	
Brennender LKW				***Kleinbrand_B
Brennender Müllwagen			Kleinbrand_B	
Brennender PKW				Kleinbrand_A
Brennender Sicherungskasten		Kleinbrand_B		
Brennendes Gebüsch			Kleinbrand_B	
Brennendes Gras				***Kleinbrand_A
Chemieunfall (an Schule)		TH3_Chemie		
Chlorgas Alarm (Schwimmbad)		TH3_Chlorgas		
Container Brand				***Kleinbrand_A
Dachstuhlbrand				***F3_Dachstuhl
Fahrstuhl - Türöffnung			TH1_Fahrstuhl	
Feldbrand				F1_Feld
Fettbrand in Pommesbude			F2_Restaurant	
Feuer im Altenheim			F3_Altenheim	
Feuer im Krankenhaus			F5_Krankenhaus	
Feuer im Laubhaufen			Kleinbrand_A	
Garagenbrand				F2_Garage
Gartenlaubenbrand			Kleinbrand_A	
Gastronomiebrand			F2_Gastronomie	
Gewerbebrand				F4_Industrie
Kaminbrand				F2_Kamin
Keller unter Wasser			TH1_Wasserschaden	
Kellerbrand				***F2_Keller
Kinobrand				F4_Kino
Kioskbrand				Kleinbrand_B
Kleiner Waldbrand			Kleinbrand_B
Maschinenbrand				F2_Maschinenbrand
Mähdrescherbrand			F1_Mähdrescher
Motorrad-Brand				Kleinbrand_A
Mülleimer Brand				***Kleinbrand_A
Ölspur					TH1_Ölspur
Person im Fluss				TH1_PIN_Wasser
PKW in Fluss				TH2_PKW_Wasser
Scheunenbrand				F3_Scheune
Schornsteinbrand			F2_Schornstein
Schuppenbrand				F2_Schuppen
Silobrand				***F2_Silo
Sperrmüllbrand				***Kleinbrand_A
Strohballen Brand			***F1_Stroh	
Traktorbrand				Kleinbrand_B
Trocknerbrand				Kleinbrand_B
Verkehrsunfall				TH1_Verkehr
Wohnblockbrand				F4_Wohnblock
Wohnungsbrand				***F2_Wohnung
Wohnwagenbrand				Kleinbrand_B



# Einsätze am Flughafen

Auffahrunfall - FH			TH1_Flughafen
Brennendes Flugzeug - FH		VOLLALARM_Flughafen
Dachstuhlbrand - FH			F3_Flughafen
Feldbrand - FH				F1_Flughafen
Gewerbebrand - FH			F4_Flughafen
Grasnarbenbrand - FH			F2_Flughafen
Mülleimer Brand - FH			F0_Flughafen



# Einsätze am Hafen

Auffahrunfall - H			TH1_Hafen
Dachstuhlbrand - H			F3_Hafen
Feuer auf Boot (Klein) - H		F3_Hafen
Feuer auf Boot (Mittel) - H		F3_Hafen
Feldbrand - H				F1_Hafen
Gabelstapler im Hafenbecken - H		TH2_Hafen
Gewerbebrand - H			F4_Hafen
Grasnarbenbrand - H			F1_Hafen
Mülleimer Brand - H			F1_Hafen
Verletztentransport - H			RTW_Notfall



# Einsätze am Güterbahnhof


# Einsätze am Raffinerie





#Sonder-Einsätze

Brand in Industriepark			GSL_Verband	
Brand in Steinbruch			GSL_Verband



#Saisonale-Einsätze

Brand auf Weihnachtsmarkt		F2_Weihnachtsmarkt
Brand-Weihnachtsbaum in Kirche		F2_Baum_Kirche



===Fahrzeugzuordnung


*###F4_Wohnblock###*_o_DLK

undef					LF|LF,LF
Kleinbrand_A				TLF
***Kleinbrand_A				TLF
Kleinbrand_B				LF
***Kleinbrand_B				LF
TH1_Auffahrunfall			LF
***TH1_Verkehr				LF,RW,GW-Öl
***TH2_Baum_Dach			LF,RW,DLK
TH1_Baum_Straße				LF	
F4_Baumarkt				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,RW,GW-A,SW,TLF,GW-G,GW-Meß
F5_Casino				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,DLK,GW-A,SW,TLF
F4_Sägewerk				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,SW,GW-A
F3_Supermarkt				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,DLK,FwK
F4_Autohaus				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,GW-A,GW-Meß,GW-G
F3_Druckerei				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,DLK,RW,GW-A,SW
F3_Eishalle				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,TLF,SW,RW
F2_Gemeindehaus				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF
F3_Gärtnerrei				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,GW-Meß,GW-G
F3_Werkstatt				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,FwK
F4_Kletterhalle				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,SW,GW-A,TLF
F4_Kühlhaus				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,SW,GW-G,GW-Meß	
F4_Lackfabrik				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,GW-A,GW-G,GW-Meß
F3_Metzgerei				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,SW
F3_Reifenlager				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,SW,GW-G,GW-Meß
F3_Schloss				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK
F3_Schule				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,GW-A
F3_Spedition				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,TLF,SW,RW,GW-G,GW-Meß
F4_Sporthalle				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,TLF,GW-A,SW
F3_Zugdepot				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,RW,SW,GW-S
F2_S-Bahn				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,GW-S	
TH3_Chemie				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|ELW,GW-G,GW-Meß,LF,LF
TH3_Chlorgas				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|ELW,GW-G,GW-Meß,RW,LF,LF
***F3_Dachstuhl				LF,LF,LF,DLK
TH1_Fahrstuhl				LF,RW
F1_Feld					LF,SW
F2_Restaurant				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,TLF
F3_Altenheim				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,ELW,DLK,GW-A
F5_Krankenhaus				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,SW,GW-A,RW,GW-G,GW-Meß
F2_Garage				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF
F2_Gastronomie				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF
F4_Industrie				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,RW,GW-A
F2_Kamin				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,DLK
***F2_Keller				LF,LF	
TH1_Wasserschaden			LF
F4_Kino					LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,DLK,GW-A,TLF
F2_Maschinenbrand			LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,SW,ELW
F1_Mähdrescher				LF,TLF
TH1_Ölspur				LF,GW-Öl
TH1_PIN_Wasser				LF,GW-T
F3_Scheune				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,SW
F2_Schornstein				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,DLK
F2_Schuppen				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,GW-Meß,GW-G
***F2_Silo				LF,LF
***F1_Stroh				LF,SW
F4_Wohnblock				LF/ELW/DLK/TLF/GW-A/RW/GW-Öl/SW/RTW/GW-G/GW-Meß/GW-T/GW-S/FwK/FLF/RT/LB/RTB|LF,LF,LF,LF,ELW,GW-A
***F2_Wohnung				LF,LF
TH1_Verkehr				LF,RW,GW-Öl
TH2_PKW_Wasser				LF,RW,FwK,GW-T



#Sonder- und Saisonale-Einsätze

GSL_Verband				LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,ELW,TLF,TLF,RTW,RTW

F2_Weihnachtsmarkt			LF,LF
F2_Baum_Kirche				LF,LF



# Einsätze am Hafen


TH2_Hafen				|RW,FwK,GW-T



===Fahrzeugklassen

ELW 1				ELW
DLA (K) 23/12			DLK
LF 20/16			LF
LF 10/6				LF
HLF 20/16			LF
TLF 20/40 - SL			TLF
GW-A				GW-A
RW				RW
GW-Öl				GW-Öl
GW-L2 - Wasser			SW
RTW				RTW
GW-Gefahrgut			GW-G
GW-Messtechnik			GW-Meß
GW-Taucher			GW-T
GW-Schiene			GW-S
Kran				FwK
Flugfeldlöschfahrzeug		FLF
Rettungstreppe			RT
Feuerlöschboot			LB
Rettungsboot			RB





===Ende
#