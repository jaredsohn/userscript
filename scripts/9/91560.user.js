// ==UserScript==
// @name           meniny fb
// @namespace      Level 3
// @include        http://www.facebook.com/*
// ==/UserScript==    
// Kalendar vytvoreny radkom ;)         


Names = new Array();

Names[0] = new Array("Nový rok","Alexandra/Karina","Daniela","Drahoslav","Andrea","Antónia","Bohuslava/Róbert","Severín","Alexej","Dáša","Malvína",
						 "Ernest","Rastislav","Radovan","Dobroslav","Kristína",
						 "Nataša","Bohdana","Drahomíra","Dalibor","Vincent","Zora",
						 "Miloš","Timotej","Gejza","Tamara","Bohuš","Alfonz",
						 "Gašpar","Ema","Emil");
					 
Names[1] = new Array("Tatiana","Erika/Erik","Blažej","Veronika","Agáta","Dorota",
						 "Vanda","Zoja","Zdenko","Gabriela","Dezider","Perla",
						 "Arpád","Valentín","Pravoslav","Ida","Miloslava","Jaromír",
						 "Vlasta","Lívia","Eleonóra","Etela","Roman/Romana",
						 "Matej","Frederik/Frederika","Viktor","Alexander",
						 "Zlatica","Radomír");
						 
Names[2] = new Array("Albín","Anežka","Bohumil/Bohumila","Kazimír","Fridrich",
						 "Radoslav/Radoslava","Tomáš/Róbert","Alan/Alana","Františka",
						 "Branislav/Bruno","Angela/Angelika","Gregor","Vlastimil",
						 "Matilda","Svetlana","Boleslav","Ľubica","Eduard","Jozef",
						 "Víťazoslav","Blahoslav","Beňadik","Adrián","Gabriel",
						 "Marián","Emanuel","Alena","Soňa","Miroslav","Vieroslava",
						 "Benjamín");
						 
Names[3] = new Array("Hugo","Zita","Richard","Izidor","Miroslava","Irena",
						 "Zoltán/Róbert","Albert","Milena","Igor","Július","Estera",
						 "Aleš","Justína","Fedor","Dana/Danica","Rudolf","Valér",
						 "Jela","Marcel","Ervín","Slavomír","Vojtech","Juraj",
						 "Marek","Jaroslava","Jaroslav","Jarmila","Lea",
						 "Anastázia");
							 
Names[4] = new Array("Sviatok práce","Žigmund","Galina","Florián","Lesana/Lesia","Hermína",
						 "Monika/Róbert","Ingrida","Roland","Viktória","Blažena",
						 "Pankrác","Servác","Bonifác","Žofia","Svetozár","Gizela",
						 "Viola","Gertrúda","Bernard","Zina","Júlia/Juliana",
						 "Želmíra","Ela","Urban","Dušan","Iveta","Viliam","Vilma",
						 "Ferdinand","Petronela/Petrana");
					 
Names[5] = new Array("Žaneta","Xénia","Karolína","Lenka","Laura","Norbert",
						 "Róbert","Medard","Stanislava","Margaréta","Dobroslava",
						 "Zlatko","Anton","Vasil","Vít","Blanka","Adolf","Vratislav",
						 "Alfréd","Valéria","Alojz","Paulína","Sidónia","Ján",
						 "Tadeáš","Adriana","Ladislav/Ladislava","Beata",
						 "Peter/Pavol/Petra","Melánia");
						 
Names[6] = new Array("Diana","Berta","Miloslav","Prokop","","Patrik/Patrícia",
						 "Oliver","Ivan","Lujza","Amália","Milota","Nina","Margita",
						 "Kamil","Henrich","Drahomír","Bohuslav","Kamila","Dušana",
						 "Iľja/Eliáš","Daniel","Magdaléna","Oľga","Vladimír",
						 "Jakub","Anna/Hana","Božena","Krištof","Marta","Libuša",
						 "Ignác");
						 
Names[7] = new Array("Božidara","Gustáv","Jerguš","Dominik/Dominika","Hortenzia",
						 "Jozefína","Štefánia","Oskar","Ľubomíra","Vavrinec",
						 "Zuzana","Darina","Ľubomír","Mojmír","Marcela","Leonard",
						 "Milica","Elena/Helena","Lýdia","Anabela","Jana","Tichomír",
						 "Filip","Bartolomej","Ľudovít","Samuel","Silvia","Augustín",
						 "Nikola/Nikolaj","Ružena","Nora");
							 
Names[8] = new Array("Drahoslava","Linda","Belo","Rozália","Regína","Alica",
						 "Marianna","Miriama","Martina","Oleg","Bystrík",						 
             "Mária","Ctibor","Ľudomil","Jolana","Ľudmila","Olympia",
						 "Eugénia","Konštantín","Ľuboslav/Ľuboslava","Matúš","Móric",
						 "Zdenka","Ľuboš/Ľubor","Vladislav","Edita","Cyprián",
						 "Václav","Michal/Michaela","Jarolím");
						 
Names[9] = new Array("Arnold","Levoslav","Stela","František","Viera","Natália",
						 "Eliška","Brigita","Dionýz","Slavomíra","Valentína",
						 "Maximilián","Koloman","Boris","Terézia","Vladimíra",
						 "Hedviga","Lukáš","Kristián","Vendelín","Uršuľa","Sergej",
						 "Alojzia","Kvetoslava","Aurel","Demeter","Sabína","Dobromila",
						 "Klára","Šimon/Simona","Aurélia");
						 
Names[10] = new Array("Denis/Denisa","","Hubert","Karol","Imrich","Renáta",
						 "René","Bohumír","Teodor","Tibor","Martin/Maroš","Svätopluk",
						 "Stanislav","Irma","Leopold","Agnesa","Klaudia","Eugen",
						 "Alžbeta","Félix","Elvíra","Cecília","Klement","Emília",
						 "Katarína","Kornel","Milan","Henrieta","Vratko",
						 "Ondrej/Andrej");
					 
Names[11] = new Array("Edmund","Bibiána","Oldrich","Barbora","Oto","Mikuláš",
						 "Ambróz","Marína","Izabela","Radúz","Hilda","Otília",
						 "Lucia","Branislava/Bronislava","Ivica","Albína","Kornélia",
						 "Sláva/Slávka","Judita","Dagmara","Bohdan","Adela","Nadežda",
						 "Adam/Eva","Vianoce","Štefan","Filoména","Ivana/Ivona","Milada",
						 "Dávid","Silvester");

function setName(){
  var aktualdate = new Date();
  aktualmonth = aktualdate.getMonth();
  aktualmonth = parseInt(aktualmonth);
  aktualday = aktualdate.getDate();
  aktualday = parseInt(aktualday-1); 
  meno="Meniny má "+Names[aktualmonth][aktualday];
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate()+1);
  zajtra = Names[parseInt(tomorrow.getMonth())][parseInt(tomorrow.getDate()-1)];
}

function initialize(){
  setName();
  
}
initialize();
          

a=document.getElementById("pageNav").innerHTML;     
document.getElementById("pageNav").innerHTML="<li><a title='Zajtra má meniny "+zajtra+"' id='meniny' class='topNavLink' style='text-align:center;' onmouseover='this.style.cursor=\"default\";' href='#'>"+meno+"</a></li>"+a;
document.getElementById("meniny").style.width="130px";
