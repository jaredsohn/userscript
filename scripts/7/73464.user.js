// ==UserScript==
// @name           AAO Thomas21030
// @namespace      http://userscripts.org/users/90337
// @description    AAO Daten zum importieren
// @include        http://nowhere.at.all/
// @version        12. Juli 2011
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
# Versin Schoschi 2011-06-28
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
Gefahrstoff-Austritt in Firma		TH3_Gefahrgut_Firma
Gewerbebrand				F4_Industrie
Grasnarbenbrand				F1_Fläche
Kaminbrand				F2_Kamin
Keller unter Wasser			TH1_Wasserschaden	
Kellerbrand				***F2_Keller
Kinobrand				F4_Kino
Kioskbrand				Kleinbrand_B
Kleiner Waldbrand			Kleinbrand_B
Küchenbrand				F2_Küche
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
Türöffnung				TH1_Türöffnung
Unfall mit Gefahrgut-Transport		TH3_Gefahrut_Transport
Verkehrsunfall				TH1_Verkehr
VU mit Straßenbahn			TH2_Straßenbahn
Waldbrand				F3_Wald
Wohnblockbrand				F4_Wohnblock
Wohnungsbrand				***F2_Wohnung
Wohnwagenbrand				Kleinbrand_B



# Einsätze in der Neustadt
Brennendes Flugzeug			ALARM1_Flughafen
Feuer auf Boot (Klein)			F1_Hafen_Boot_K
Feuer auf Boot (Mittel)			F2_Hafen_Boot_M
Gabelstapler im Hafenbecken		ALARM1_Hafen
Brand in Betankungsanlage		ALARM4_Raffinerie
Brand in Raffinerie			ALARM1_Raffinerie 
Brennt Tanklager			ALARM2_Raffinerie
Tankbrand				ALARM3_Raffinerie
Verletztentransport			ALARM4_Hafen

#Sonder-Einsätze

Brand in Industriepark			GSL_Verband	
Brand in Steinbruch			GSL_Verband

#Saisonale-Einsätze

Brand auf Weihnachtsmarkt		F2_Weihnachtsmarkt
Brand-Weihnachtsbaum in Kirche		F2_Baum_Kirche



===Fahrzeugzuordnung



undef					LF|LF,LF
Kleinbrand_A				TLF
***Kleinbrand_A				TLF
Kleinbrand_B				LF
***Kleinbrand_B				LF
TH1_Auffahrunfall			LF
***TH1_Verkehr				LF,RW,GW-Öl
***TH2_Baum_Dach			LF,RW,DLK
TH1_Baum_Straße				LF	
F4_Baumarkt				LF,LF,LF,LF,ELW,DLK,RW,GW-A,SW,TLF|GW-G,GW-Meß
F5_Casino				LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,DLK,GW-A,SW,TLF
F4_Sägewerk				LF,LF,LF,LF,ELW,SW,GW-A
F3_Supermarkt				LF,LF,LF,DLK,FwK
F4_Autohaus				LF,LF,LF,LF,ELW,DLK,GW-A|GW-Meß,GW-G
F3_Druckerei				LF,LF,LF,DLK,RW,GW-A,SW
F3_Eishalle				LF,LF,LF,ELW,DLK,TLF,SW,RW
F2_Gemeindehaus				LF,LF
F3_Gärtnerrei				LF,LF,LF,ELW,DLK|GW-Meß,GW-G
F3_Werkstatt				LF,LF,LF,FwK
F4_Kletterhalle				LF,LF,LF,LF,ELW1,DLK,SW,GW-A,TLF
F4_Kühlhaus				LF,LF,LF,LF,ELW,DLK,SW|GW-G,GW-Meß	
F4_Lackfabrik				LF,LF,LF,LF,ELW,DLK,GW-A|GW-G,GW-Meß
F3_Metzgerei				LF,LF,LF,ELW,DLK,SW
F3_Reifenlager				LF,LF,LF,ELW,SW|GW-G,GW-Meß
F3_Schloss				LF,LF,LF,ELW,DLK
F3_Schule				LF,LF,LF,ELW,DLK,GW-A
F3_Spedition				LF,LF,LF,ELW,DLK,TLF,SW,RW|GW-G,GW-Meß
F4_Sporthalle				LF,LF,LF,LF,ELW,TLF,GW-A,SW
F3_Zugdepot				LF,LF,LF,ELW,DLK,RW,SW,GW-S
F2_S-Bahn				LF,LF,GW-S	
TH3_Chemie				ELW,GW-G,GW-Meß|LF,LF
TH3_Chlorgas				ELW,GW-G,GW-Meß,RW|LF,LF
***F3_Dachstuhl				LF,LF,LF,DLK
TH1_Fahrstuhl				LF,RW
F1_Feld					LF,SW
F2_Restaurant				LF,LF,TLF
F3_Altenheim				LF,LF,LF,ELW,DLK,GW-A
F5_Krankenhaus				LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,SW,GW-A,RW|GW-G,GW-Meß
F2_Garage				LF,LF
F2_Gastronomie				LF,LF
TH3_Gefahrgut_Firma			LF,LF,LF,ELW,SW,GW-A|GW-G,GW-Meß
F4_Industrie				LF,LF,LF,LF,ELW,DLK,RW,GW-A
F1_Fläche				LF/
F2_Kamin				LF,LF,DLK
***F2_Keller				LF,LF	
TH1_Wasserschaden			LF
F4_Kino					LF,LF,LF,LF,ELW,DLK,GW-A,TLF
F2_Küche				LF,LF
F2_Maschinenbrand			LF,LF,SW,ELW
F1_Mähdrescher				LF,TLF
TH1_Ölspur				LF,GW-Öl
TH1_PIN_Wasser				LF,GW-T
F3_Scheune				LF,LF,LF,SW
F2_Schornstein				LF,LF,DLK
F2_Schuppen				LF,LF|GW-Meß,GW-G
***F2_Silo				LF,LF
***F1_Stroh				LF,SW
TH1_Türöffnung				LF,RW
TH3_Gefahrut_Transport			LF,LF,ELW,FwK,GW-A,RW|GW-G,GW-Meß
F3_Wald					LF,LF,LF,ELW,DLK,SW
F4_Wohnblock				LF,LF,LF,LF,ELW,GW-A
***F2_Wohnung				LF,LF
TH1_Verkehr				LF,RW,GW-Öl
TH2_Straßenbahn				LF,LF,ELW,FwK,GW-S,RW
TH2_PKW_Wasser				LF,RW,FwK,GW-T


#Sonder- und Saisonale-Einsätze

GSL_Verband				LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,ELW,ELW,TLF,TLF,RTW,RTW

F2_Weihnachtsmarkt			LF,LF
F2_Baum_Kirche				LF,LF



# Einsätze in der Neustadt


ALARM1_Flughafen			FLF,FLF,FLF,FLF,FLF,FLF,FLF,RT
ALARM1_Hafen				|LF,RW,FwK,GW-T
ALARM2_Hafen				LB,RB
ALARM3_Hafen				LB,RB
ALARM4_Hafen				|RTW
ALARM4_Raffinerie
ALARM1_Raffinerie			LF,LF,LF,LF,LF,LF,LF,LF,LF,LF,DLK,ELW,TLF,RW,SW,GW-G,GW-Meß,FwK,GW-Tu
ALARM2_Raffinerie			LF,LF,LF,LF,LF,LF,LF,LF,ELW,TLF,RW,SW,GW-Öl,GW-Meß,GW-G,GW-Tu
ALARM3_Raffinerie			LF,LF,LF,LF,LF,LF,LF,LF,GW-Öl,RW,ELW,GW-Tu


===Fahrzeugklassen

ELW 1				ELW
DLA (K) 23/12			DLK
LF 20/16			LF
LF 10/6				LF
HLF 20/16			LF
TLF 20/40 - SL			TLF
TLF 16/25			LF
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
GW-TUIS				GW-Tu
ULF mit Löscharm		ULF




===Ende
#