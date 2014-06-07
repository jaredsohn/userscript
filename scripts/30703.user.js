// ==UserScript==
// @name           Travian: Battle Analyse
// @version        5.1.2
// @author         MeXaon
// @email          svgmail@mail.ru
// @namespace      Travian
// @description    Battle Analyse 5.1.2
// @include        http://*.travian*/berichte.php?*
// @include        http://*.travian*/warsim.php*
// @include        http://*.travian*/a2b.php*
// @include        http://*.travian*/karte.php?*
// @exclude        http://forum.travian*
// @exclude        http://www.travian*
// ==/UserScript==

var ScriptName='Travian: Battle Analyse';
var ScriptAutor='MeXaon';
var ScriptVersion='5.1.2';
var ScriptLink='http://userscripts.org/scripts/show/10835';


var lang=window.location.href.match(/travian\d*(\.[a-zA-Z\.]+)/).pop();
var langfile=new Array();

switch(lang){
	case ".co.il":
		langfile=["עוצמת ההתקפה","המשאבים שהופסדו","עוצמת הרגלים",
							"עןצמת הפרשים","סטטיסטיקה כללית","הפרש ההפסדים","צרכים",
							"ניסיון לגיבור","כמות המשאבים","הפסד של יבול","כמות היבול שהצבא השתמש בו",
							"לא היה גיבור","גיבור","המשאבים שנגנבו","מקסימום המשאבים שהצבא יכל לשאת",
							"התקפה","הגנה","?????","יעילות"];
		break;
	case ".gr":
		langfile=["Συνολικό μέγεθος επίθεσης","Ισοδυναμεί σε απώλειες","Συνολική αμυντική δύναμη ενάντια σε πεζικό",
							"Συνολική αμυντική δύναμη ενάντια σε ιππικό","Γενικά στατιστικά","Διαφορές απωλειών","Κατανάλωση",
							"Εμπειρία Ηρώων","Χωρητικότητα","Ισοδύναμο απώλειας σε σιτάρι","Κατανάλωση σιταριού από το στρατό",
							"Ο Ήρωας απουσίαζε","Ήρωας","Ποσότητα υλικών που εκλάπησαν","Μέγιστη δυνατότητα μεταφοράς από τους επιζώντες",
							"Επιτιθέμενος","Αμυνόμενος","Κέρδος","Αποδοτικότητα"];
		break;
	case ".ae":
		langfile=["المجموع الكلي للهجمات","معدل الاصبات","المجموع الكلي للقوة الدفاعية للجنود",
							"المجموع الكلي للقوة المعادية من الفرسان","الاحصائيات العامة",
							"الاصيابات في المدافعين","النقص",
							"عدد الخيول","الامكانية","الكمية المستهلكة من القمح",
							"الكمية التقريبية المستهلكة من قبل الجيش من القمح",
							"البطل غير متاح","البطل","الكمية التي يمكن حملها من المواد الخام",
							"العدد الاقصاء للناجين",
							"المهاجم","المدافع","الفائده","الفعاليه"];
		break;
	case ".fr":
 		langfile=["Taille totale de l'attaque","Equivalent des pertes","Taille totale de la dйfense contre l'infanterie",
							"Taille totale de la dйfense contre la cavalerie","Statistiques gйnйrales","Diffйrence des pretes","Consommation",
							"Expйrience du hйro","Capacitйe","Equivalent perdu en cйrйales","Consommation de cйrйales par l'armйe",
							"Le hйro n'йtait pas prйsent","Hero","Quantity of the carried away raw material","The maximal capacity survived",
							"Attaquant","Defenseur","Rentabilité","Efficacité"];
		break;
	case ".lt":  
		langfile=["Puolimo jėga","Prarasta","Gynyba prieš pėstininkus",
							"Gynyba prieš raitininkus","Statistika","Prarasta","Grūdų sunaudojimas",
							"Herojaus patirtis","Talpa","Prarasta (grūdais)","Grūdų sunaudojimas",
							"Herojus nedalyvavo","Herojus","Išneštų resursų kiekis","Maksimalus galimas grobis",
							"Puolantis","Besiginantis","Pelnas","Efektyvumas"];
		break;
	case ".sk":
		langfile=["Celková útočná sila","Ekvivalent strát","Celková ochrana proti pechote",
							"Celková ochrana proti jazde","Celková štatistika","Rozdiel strát","Spotreba obilia",
							"Skúsenosti hrdinu","Kapacita","Straty vyjadrené v obilí","Spotreba obilia armádou",
							"bez hrdinu","Hrdina","Množstvo odnesených surovín","Celková kapacita prežitia",
							"Útok","Obrana","Zisk","Efektívnosť"];
		break;
	case ".hk":
	case ".tw":
		langfile=["總攻擊力","平均戰損","對步兵防御力",
							"對騎兵防御力","統計","資源損失","糧食消耗",
							"英雄經驗","掠奪容量","資源得失","占用人口",
							"没有英雄","英雄","掠奪資源量","剩餘容量",
							"進攻方","防守方","\獲\益","\效\率"];
		break;
	case ".bg":
		langfile=["Общ размер на атаката", "Равностойност на загубите", "Общ размер на защитата срещу пехота",
							"Общ размер на защитата срещу кавалерия", "Общи статистики", "Разлика от загуби", "Консумация",
							"Опит на героя", "Капацитет", "Равностоиност на загубите в зърно", "Нормална консумация на зърно от армията",
							"Нямаше герой", "Герой", "Количетво изхвълен суров материал", "Максимален капацитет на оцелелите",
							"Атакуващ", "Защитник","Печалба","Ефективност"]; 
		break;
	 case ".fi":
		langfile=["Hyökkäyksen koko","Tappioiden yhteenveto","Puolustus jalkaväkeä vastaan",
							"Puolustus ratsuväkeä vastaan","Yleiset tilastot","Tappioiden erotus","Kulutus",
							"Sankarin EXP","Kapasiteetti","Tappiot viljassa","Armeijan nimellinen viljan kulutus",
							"Sankari ei","Sankari","Vietyjen resunssien määrä","Maksimi selviytynyt kapasiteetti",
							"Hyökkääjä","Puolustaja","Saalis","Teho"];
		break;
	case ".cn":
		langfile=["总攻击力","平均战损","总步兵防御力",
							"总骑兵防御力","统计","损失资源","粮食消耗",
							"英雄经验","仓库容量","平均粮食损耗","占用人口数",
							"没有英雄","英雄","被掠夺的资源总量","剩余的资源总量",
							"进攻方","防守方","战斗利润","战斗效率"];
		break;
	case ".com.ua":
		langfile=["Загальна величина атаки","Еквівалент втрат","загальна величина захисту від піхоти",
							"загальна величина захисту від кавалерії","Загальна статистика","Різниця втрат","Вжиток",
							"Досвід героїв","Місткість","еквівалент втрат у зерні","номінальний вжиток зерна армією",
							"героя не було","герой","кількість награбованної сировини","максимальная місткість виживших",
							"Нападник","Захисник","Прибуток","Ефективність"];
		break;
	case ".it":
		langfile=["Attacco","Perdite","Difesa contro fanteria",
							"Difesa contro cavalleria","Statistiche","Differenza perdite","Consumo",
							"Esp Eroe","Capacità","Perdite in grano","Consumo grano delle truppe",
							"Senza Eroe","Eroe","Risorse Rubate","Capacità di Carico",
							"Attccante","Defensore","Guadagno","Efficienza"];
		break; 
	case ".com.tr":
		langfile=["Toplam saldırı gücü","Eşdeğer kayıp","Yaya askere karşı savunma gücü",
							"Süvariye karşı savunma gücü","Genel istatistik","Kayıplar farkı","Tüketim",
							"Kh etkisi","Kapasite","Eşdeğer Hammadde Kaybı","Ordunun tahıl tüketimi",
							"Kahraman Yok","Kahraman","Götürülen Hammadde miktarı","Alınabilecek en yüksek hammdde kapasite",
							"Saldıran","Savunan","Kazanc","Verimlilik"]; 
		break;
	case ".net":
	case ".com.ar":
	case ".cl":
	case ".com.mx":
		langfile=["Ataque","Perdidas","Defensa contra infantaria",
							"Defensa contra caballería","Estadísticas","Diferencia de perdidas","Consumo",
							"Exp de los héroes","Capacidad","Perdidas en cereal","Consumo de cereal de las tropas",
							"No estaba el héroe","Héroe","Recursos Robados","Capacidad de Carga",
							"Atacante","Defensor","Rentabilidad","Eficiencia"];
		break;
	case ".cz":
		langfile=["Celková útočná síla","Ekvivalent ztrát","Celková ochrana proti pěchotě",
							"Celková ochrana proti jízdním jednotkám","Souhrnná statistika","Rozdíl ztrát","Spotřeba obilí",
							"Zkušenosti hrdiny","Kapacita","Ztráty vyjádřené  v obilí","Jmenovitá spotřeba obilí armádou",
							"bez hrdiny","Hrdina","Množství odnesených surovin","Celková kapacita přežití",
							"Útok","Obrana","Výnos","Úspěšnost"];
		break;
	case ".no":
		langfile=["Total angrepsstyrke","Totale tap","Total forsvarsstyrke mot infantery",
							"Total forsvarsstyrke mot kavalri","Generell statestikk","Taps forskjell","Forbrukning",
							"Heltens erfaring","Kapasitet","Totalt korntap","Hærens totale kornforbruk",
							"Helten fantes ikke","Helt","Antall stjålne ressurser","Maximalt kapasitet overlevende",
							"Angrep","Forsvarer","Fortjeneste","Effektivitet"];
		break;
	case ".pt":
	case ".com.br":
		langfile=["Ataque","Perdas","Defesa contra infantaria",
							"Defesa contra cavalaria","Estatisticas","Diferencas das perdas","Consumo",
							"Exp do herois","Capacidade","Perdas em cereal","Consumo de cereal das tropas",
							"Sem Heroi","Heroi","Recursos Roubados","Capacidade de Carga",
							"Atacante","Defensor","Lucro","Eficiência"];
		break;
	case ".interia.pl":
		langfile=["Rozmiar Ataku","Poniesione straty","Rozmiar obrony przed piechota",
							"Rozmiar obrony przed kawaleria","Ogolne statystyki","Roznica Strat","Wyzywienie",
							"Doswiadczenia bohatera","Ladownosc","Rozmiar stat zboza","Liczba zboza przeznaczona na wyzywienie wojska",
							"Brak bohatera","Bohater","Ilosc zabranego surowca","Maksymalna ladownosc ocalalych",
							"Atakujacy","Obronca","Zysk","Efektywność"];
		break;
	case ".se":
		langfile=["Total anfallsstyrka","Totala förluster","Total försvarsstyrka mot infanteri",
							"Total försvarsstyrka mot kavalleri","Generell statistik","Skillnad i förluster","Förbrukning",
							"Hjältens erfarenhet","Kapacitet","Total veteförlust","Armens totala veteförbrukning",
							"Det fanns ingen hjälte","Hjälte","Antal stulna råvaror","Maximal kapacitet överlevande",
							"Attackerande","Försvarande","Vinst","Effektivitet"];
		break;
	case ".nl":
		langfile=["Aanvalswaarde","Verlies","Weerstand tegen infanterie",
							"Weerstand tegen cavalerie","Algemene statistieken","Werkelijk resultaat","Graanconsumtie",
							"Ervaringspunten","Draagcapaciteit","Som/Verschil van de grondstoffen","Graanverbruik van het bovenstaand leger",
							"Held krijgt geen Ervaring","Held","Totaal meegenomen grondstoffen","Draagcapaciteit van het bovenstaand leger",
							"Aanvaller","Verdediger","Winst","Efficiëntie"];
		break;
	case ".hu":
		langfile=["Össz támadóérték","Nyersanyag veszteség","Védelem gyalogság ellen",
							"Védelem lovasság ellen","Általános statisztika","Össz nyersanyag","Élelemfelhasználás",
							"Hős tapasztalat","Teherbírás","Búzaveszteség","Hadsereg búzafogyasztása",
							"Nincs hős","Hős","Össz zsákmány","Maximálisan elhozható zsákmány",
							"Támadó","Védő","Haszon","Hatékonyság"];
		break;
	case ".ro":
		langfile=["Marimea atacului","Pierderi totale","Valoarea protectiei impotriva infanteriei",
							"Valoarea protectiei impotriva cavaleriei","Statistica generala","Evaluare pierderi","Consum",
							"Exp Erou","Capacitate","Pierderile echivalente in grane","Consum de grane al armatei din acest atac",
							"Eroul nu a participat la atac","Erou","Cantitatea de resurse capturata","Capacitatea maxima disponibila",
							"Atacator","Aparator","Profit","Eficienta"];
		break;
	case ".dk":
		langfile=["Totale angrebsstyrke","Tab af troppeomkostninger","Totale forsvarsstyrke mod infanteri",
							"Totale forsvarsstyrke mod kavalleri","Generel statistik","Totale tab","Forbrug",
							"Helte erfaring","kapacitet","Totalt antal råstoffer tabt","Hærens totale kornforbrug",
							"Der var ikke nogen helt","Helt","Antal stjålne råstoffer","Maksimal kapacitet",
							"Angriber","Forsvarer","Profit","Effektivitet"];
		break;
	case ".de":
		langfile=["Gesamte Angriffsstärke","Verluste durch Truppenkosten","Gesamte Verteidigungsstärke gegen Infanterie",
							"Gesamte Verteidigungsstärke gegen Kavalerie","Die Gesamtstatistik","Differenz der Verluste","Nahrungsverbrauch",
							"Erf. für den Helden","Capacity","Equivalent lost in grain","Nominal consumption of grain by army",
							"kein Held","Held","Quantity of the carried away raw material","The maximal capacity survived",
							"Angriff","Verteidigung","Rentabilität","Effektivität"];
		break;
	case ".ru":
		langfile=["Cуммарная величина атаки","Эквивалент потерь","Суммарная величина защиты от пехоты",
							"Суммарная величина защиты от кавалерии","Общая статистика","Разница потерь","Потребление",
							"Опыт героев","Вместимость","Эквивалент потерянного в зерне","номинальное потребление зерна армией",
							"Героя не было","Герой","Количество унесенного сырья","Максимальная вместимость выживших",
							"Нападающие","Обороняющиеся","Доход","Эффективность"];
		break;
	default:
		langfile=["Total size of attack","Equivalent of losses","Total size of protection against infantry",
							"Total size of protection against a cavalry","The general statistics","Difference of losses","Consumption",
							"Exp of heroes","Capacity","Equivalent lost in grain","Nominal consumption of grain by army",
							"The hero was not","Hero","Quantity of the carried away raw material","The maximal capacity survived",
							"Attacking","Defending","Profit","Efficiency"];
		break;
}

//0-attack 1-lostunits 2-load 3-maxload 4-food 5-statushero 6-lostfood 7-trap 8-i 9-c
var ats=new Array(0,0,0,0,0,0,0,0,0,0); 
//0-def1 1-def2 2-lostunits 3-food 4-statushero 5-lostfood
var dts=new Array(0,0,0,0,0,0); 
var tab;
var warsim=0;
var grafpack='';
var worksave = 1;
var saveBeta = '';

//0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-crop 7-food 8-speed 9-load
romans=new Array();
romans[0] = new Array(40,35,50,120,100,180,40,1,6,40);					// Legionnaire
romans[1] = new Array(30,65,35,100,130,160,70,1,5,20);					// Praetorian
romans[2] = new Array(70,40,25,150,160,210,80,1,7,50);					// Imperian
romans[3] = new Array(0,20,10,140,160,20,40,2,16,0);						// Equites Legati
romans[4] = new Array(120,65,50,550,440,320,100,3,14,100);			// Equites Imperatoris
romans[5] = new Array(180,80,105,550,640,800,180,4,10,70);			// Equites Caesaris
romans[6] = new Array(60,30,75,900,360,500,70,3,4,0);						// Battering Ram
romans[7] = new Array(75,60,10,950,1350,600,90,6,3,0);					// Fire catapult
romans[8] = new Array(50,40,30,30750,27200,45000,37500,4,4,0);	// Senator
romans[9] = new Array(0,80,80,5800,5300,7200,5500,1,5,1600);		// Settler
romans[10] = new Array(0,0,0,0,0,0,0,6,0,0);										// Hero
romans[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
romans[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
teutons=new Array();
teutons[0] = new Array(40,20,5,95,75,40,40,1,7,60);							// Clubswinger
teutons[1] = new Array(10,35,60,145,70,85,40,1,7,40);						// Spearfighter
teutons[2] = new Array(60,30,30,130,120,170,70,1,6,50);					// Axefighter
teutons[3] = new Array(0,10,5,160,100,50,50,1,9,0);							// Scout
teutons[4] = new Array(55,100,40,370,270,290,75,2,10,110);			// Paladin
teutons[5] = new Array(150,50,75,450,515,480,80,3,9,80);				// Teuton Knight
teutons[6] = new Array(65,30,80,1000,300,350,70,3,4,0);					// Ram
teutons[7] = new Array(50,60,10,900,1200,600,60,6,3,0);					// Catapult
teutons[8] = new Array(40,60,40,35500,26600,25000,27200,4,4,0);	// Chief
teutons[9] = new Array(10,80,80,7200,5500,5800,6500,1,5,1600);	// Settler
teutons[10] = new Array(0,0,0,0,0,0,0,6,0,0);										// Hero
teutons[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
teutons[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
gauls = new Array(10);
gauls[0] = new Array(15,40,50,100,130,55,30,1,7,30);						// Phalanx
gauls[1] = new Array(65,35,20,140,150,185,60,1,6,45);						// Swordfighter
gauls[2] = new Array(0,20,10,170,150,20,40,2,17,0);							// Pathfinder
gauls[3] = new Array(90,25,40,350,450,230,60,2,19,75);					// Theutates Thunder
gauls[4] = new Array(45,115,55,360,330,280,120,2,16,35);				// Druidrider
gauls[5] = new Array(140,50,165,500,620,675,170,3,13,65);				// Haeduan
gauls[6] = new Array(50,30,105,950,555,330,75,3,4,0);						// Ram
gauls[7] = new Array(70,45,10,960,1450,630,90,6,3,0);						// Trebuchet
gauls[8] = new Array(40,50,50,30750,45400,31000,37500,4,5,0);		// Chieftain
gauls[9] = new Array(0,80,80,5500,7000,5300,4900,1,5,1600);			// Settler
gauls[10] = new Array(0,0,0,0,0,0,0,6,0,0);										// Hero
gauls[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
gauls[12] = new Array(0,0,1,1,1,1,0,0,0,0,0)
nature = new Array(10)
nature[0] = new Array(10,25,10,0,0,0,0,1,20,0);									// Rat
nature[1] = new Array(20,35,40,0,0,0,0,1,20,0);									// Spider
nature[2] = new Array(60,40,60,0,0,0,0,1,20,0);									// Serpent
nature[3] = new Array(80,66,50,0,0,0,0,1,20,0);									// Bat
nature[4] = new Array(50,70,33,0,0,0,0,2,20,0);									// Wild boar
nature[5] = new Array(100,80,70,0,0,0,0,2,20,0);								// Wolf
nature[6] = new Array(250,140,200,0,0,0,0,3,20,0);							// Bear
nature[7] = new Array(450,380,240,0,0,0,0,3,20,0);							// Crocodile
nature[8] = new Array(200,170,250,0,0,0,0,3,20,0);							// Tiger
nature[9] = new Array(600,440,520,0,0,0,0,5,20,0);							// Elephant


var imgpack="data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP////z6/Pz+/Pz+9Pz65Pz67Pz21PTu1Pz23OzGROTSlPzqrPzuvOzivPzyzOzCROS6RNy2TNSyVPzafNS6dOTKhPzilPzinPzmpNzKlOzapPzqtPTmvPzuxPTqzPzy1PTu3Pz25PS+POS2POy+ROS2RNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOTOlOzWnPzmrPzqvOzevPzuzOy2PPS+ROSyRPzGTOy6TPTCVNyyVNSuVPTKbOS+bNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSqNPzCTOy2TNyuVNSqVPTOhOTCfOzKhPTSjPzalNzCjPzirOzatOSqPMyaPNSmVNyyZNy2dOzGhNy6fPTOjOzKjPzanOzWrOzexMyOLMSKLNyeNMySNMyWPOSuVNSmXOS2bNy6hOzavPzqzPz27MyONNSiVOzChOTKpNSiXPzy5MyORMySTOSydNSWVP///wAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHgALAAAAAAQABAAAAfqgHiCggMhFk8gA4OLggYbKTIWPgttjHgEDkAxIiJGMys+YAKDHywsCAQENEwuVEVZEx14MBIbSDUaUxVBUkJfVFBYXBMFbDAtQD1mHwc0LypUQ2UpBSBHTkJCZ1QcGCo4JC5mKSIgIDRDP0tDQzo3JTtEZj0iBw82HFI8SiMKJSY5vLhBUe5BAw4zKChQEIGEFStbxJwokMADBwZULvjLkYRMGjhjVnDpkKBBBgwvIHA8s8VOnTd4qjR5YuMBgwsRcnSBc6dOnEFt4lx58sBDFCJyxqiZYwkEFzFEtNDJgsTSojBo5KxRtCgQADs=";
var imgpackgo="data:image/gif;base64,R0lGODlhEAAQAOYAAAAAAP///xx6BESSLEyWNFyiRJTChDSGFJzGjCx+BFyePESOHGSiRDyKDESSFDyGDIS2ZJzChKTKjEySHFSaJHSqTIy6bKTGjKzOlFyaLGSeNHyuVKzKlISyXGSeLGyiNHSmPLTOlPz+9Pz65Pz21PTu1Pz23PTmtPzuvPzyzNy2TNSyVNy+ZPzehNS6dOTKhPzinPzmpNzKlOzapPzqtPTmvPzuxPzy1Pz25PS+POy+TNSqRNSuTNy2VPzWdNy+dOTGfOzOhPTWjPzelOzSlOzWnPzqvOzevPzuzOSyROy6TPTCVNyyVNSuVPTKbOS+bPzWfNy6bPTOfPzajOzOjPTWlPTerPzmtPTq1OSyTNyuVNSqVPTOhOTCfOzKhPzalNzCjOTKlPzirMyaPNSmVNyyZNy2dOzGhNy6fPzanOzWrOzexMyOLMSKLMySNMyWPNSmXOzavPzqzNSiXMyORP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAHUALAAAAAAQABAAAAffgHWCg3UvXTeEiYJFPUUvTUSKgyxEODhWJz8raolAQCUiIkhaUGJVZWWCRCozWEcyYC5RVVJpYl5kaCsjckRBT0xuSCZGQz4xLW49IzdXXFJSWWI0MD45SUJvPTg3N0ZTTllTUyAaOkpUbkw4JClIRl9LSzkfGxlZXm483CkoNCAfPnjYgKGCgzNsdowwYcNIjA8hMHDgYEECgwNtfqCpwTCGBgwWLEDoACGCggSCtnRBkiKDBAkXEEAwwGABoTBjulCY4KCBApoDJKFhQ8UMnQcFCEgStAbOnDgHBBAKBAA7";
var imgcopy="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAHMAaQBai4lpJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9ALFw00KOKzIOYAAAF8SURBVHiclZGxjtNAFEWP40UpE4oUKf0HLtLRsGMKFJbGNPGHQLTaBimSRZfPmPQIZavkF7ZyRZEGLU2Q0IR1PGNnKCI7BDsWjDTS09y5590340wmE8uFtVgsnLK21r5sunMFEMdxTZjP5wgh7Gq1cmri3wAAz/POBNd1uf/ymddv3rZCOm30D7d3AAghLo551XSoU8Wnj+/5/mPP1+SBVzfviKJoXepSyuuLCXSqsFqRZ088f/YTu38EIAxD4jhmMBgQBMG6EfCnudCKQ7bD0QqA4XCI53m4rstyuawgnTZzoVOcPKuNOJ1OAQiCYF29QZO50AoO+pRQa2azGdvtliRJGI/HpwRN5iJL6dhjAmMMWmu01nS7XZRSp1943CR8M0/Y/Bc2SyHfccj3kO2w+TFBnucVoNwV4IW4afrNavm+f5bAGENRFEeAlPJaSlkzRVG0DsOQfr+PMaZKUIIqQFvn0WhEr9c761zW/wTYbDY1838lEEK0yfi+z29BFRgySKHeAQAAAABJRU5ErkJggg==";
var imgpaste="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAHMAaQBai4lpJQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9ALFw00HbQA5MUAAAHMSURBVHichZM9aFNRFMd/j/e6FyoFJ0mqiy7ZTQikAUGlgzgp3US6ZBE6KA6ObumcwS0OLhFBgkQcSkimQsmHWQRFYjEggqZ5ybsf7zg076WxaXrgcOHe8//d83GvwwLbSKzK1u0kl9c0h602r9/iLIoD8ADS6bSc3tzZXuHh40+0D/ZIJNvAK/n+Kz0nrNfrDoCXyWSkXC6jlALgTWmTe9sfaR/sMRj8IAi+cuPqJaDOzpN9rLVYaykUCtLr9RxPRFBK0Wg0sNYC8OjBNQD+jK5P71sH1qnVamitMcbEsV6UUkRe23jGzSuGSqVypt5mswlAMpkkDMMZIAgCjDGEYYi1Nj4slUpnIMVikW63y2QymQGUUjEggkSWSCTmAK7r8uH9O27d2aLf788AWmtEJIYss92nzwHI5XLiiUhcwkUANR7y8sUug99jvnw+ZPPufeIpXARQ4yGihthgxOrKMUyOTnoQAbTWAAsBp8VGHSNqiBMMZ008XULky8Q2GOOImmUAnAtYJA7VXxwzHaPv+1SrVTzv5E39D1gkDgMfogxarZbT6XTmPpPrumSzWX5+63KkfcSMQE1X7SN6BEadO2YA8vm8AEs9lUrJP7/afV7h9kN4AAAAAElFTkSuQmCC";
var imgatti="data:image/gif;base64,R0lGODlhEAAQAOYAAJoxM5EqLocoK8BKTre6vsnKy6mqq/T58nu0X1qNQOTv3srivFN8OU1zNVuGPnGiUFqAQXqnXJG9c4yyc4Kla+rz5FqEPVF3N0xuNGqYSoKtZIWvaIClZoivbZnAfpq9gcfcuNnozsXatevv4vH06vj49KGhoJ2dnNjUwevj1uamSNKeUuKrW7+RT7SKTeizZLOMVKOCUamPaa2VcsashtnBnamXfMSxlsOJN7KEQ+fWv9HLw7Kro/Ls5qmop7KNeqRuX71vZrJVTqlSTbtMTOrq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1tDQ0M7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTk////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAGQALAAAAAAQABAAAAengFlWWmSFhlJXXIZkYFFFUYtNSklii2RdVUdPhV1JS16WhSZTSFBPVEhjoYZfS0xYRlsFq4ZhTU4ntIsEBig/QENBJZY1MDcpPkICAgBEI6EzLywxQQECAQM9ljw5LTo2CwkNCQgVizIrODuFFRkYDhoKiy4qNIsRDRYRILqFGvkZJIgwR2sDAwYWHnjoMEFeqA8NIFi4kGHDBA2rQnCgQILMgQOFAgEAOw==";
var imgattc="data:image/gif;base64,R0lGODlhEAAQAPcAAAEBAxEYIyktMxIXHictNMnKy1x4kig8TVd4k0JYajFRaUlrhhklLVZnc0ZleElpfGB+j4eXoExTV0VldV15hxsjJ1R4iEdhbU1pdnCLmHCDjCs7Qp+ts0hfZ05ueU1nb0lhaVRud5Oip0pqc5qxuG58gE5VV2tydExnbmJ9hBEVFm+Ch7jEx7C4ulVkZ3+Tl3uFh7m+v77O0Wdtbougo5yqrIqcnrPDxYiQkY6YmbC7vK+6uyswMMvY2MDMzL/Ly3B3d2BmZj9DQz5CQi0wMM7a2s3Z2cPPz73IyLvGxrG8vJukpFNYWMTPz5CYmI6Wlo2VlX6FhX2EhGhublleXs7Z2Tw/Pzs+PikrK52kpJGXlx0eHr/Fxc7a2aawr6avrnN6eW1ycYKHhl9nZTw/PlxhXVNYU4mNiaGhoOamSNKeUr+RT7SKTeizZLOMVKmPaa2VcsashtnBncSxlsOJN7KEQ9HLw7KrowMCAerq6unp6eXl5ePj4+Li4t3d3dra2tjY2NbW1s7OzsrKysnJycjIyMbGxsXFxcPDw729vbu7u7m5ubi4uLa2trW1tbOzs66urqurq6mpqaWlpaOjo6KiopOTkwAAAP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAJgALAAAAAAQABAAAAjfABklaoSpoMFCih4ZxDSJUB5CCwP56VNpISZIiPYIKgipz59IFguiMcRnkKBDfCyFNCjpD6BFehwVKBhBRkhKMVqcMFNmTIASJkJymSEAwIADChoQSGBQjps5O0JsYLDAAAISLDgshNPmUgUMDoqIOfPCSxaDd+qswWNhgoYuVHT8IAPmCKY3aujYUfGAQpMvQYoUyQEDCSY2aeJg8jDiRhEfVnAUyQAhjMUPKXpUgSJkiAQQF7TYNYiCRhEjW6Jg4uFiBZMlCzuIEGyloBMiWIBIWWijhuArBpNMeaIkIAA7";

var cssString = ".TBA_help{" +
								"position:absolute;" +
							"padding: 4px;" +
							"z-index: 400;" +
							"border: solid 1px #00C000;" +
							"background-color: #FEFFE3;" +
							"}";

var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList=XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
function find(xpath,xpres){
  var ret=document.evaluate(xpath,document,null,xpres,null);
  return  xpres==XPFirst ? ret.singleNodeValue : ret;
}
function elem(tag,class,content){
	var ret=document.createElement(tag);
	ret.innerHTML=content;
	if(class!="")ret.className=class;
	return ret;
}

function imgp(src){
	if(grafpack!=''){
		return grafpack+src;
	}else return src;
}


function showHelp(ev) {
	var imgNode = ev.target;
	var imgTitle = imgNode.title;
	var imgNumber = imgNode.getAttribute("src").match(/(\d+)\.gif/).pop();
	var race = parseInt((imgNumber-1)/10);
	var unit = imgNumber - race * 10 - 1;
	switch (race) {
		case 0:tm=romans;break;
		case 1:tm=teutons;break;
		case 2:tm=gauls;break;
		case 3:tm=nature;break;
		default:tm=null;break;
	}
	$("TBA_help").innerHTML = "";
	$("TBA_help").appendChild(elem("div", "f10 b", imgTitle));
	if (tm != null) {
		var str =   "<div><img src=" + imgp("img/un/a/att_all.gif") + "><span>*" + tm[unit][0] + "</span></div>"
		str = str + "<div><img src=" + imgp("img/un/a/def_i.gif") + "><span>*" + tm[unit][1] + "</span></div>"
		str = str + "<div><img src=" + imgp("img/un/a/def_c.gif") + "><span>*" + tm[unit][2] + "</span></div>"
		str = str + "<div><img src=" + imgp("img/un/u/14.gif") + "><span>*" + tm[unit][8] + "</span></div>"
		str = str + "<div><img src=" + imgpack + "><span>*" + tm[unit][9] + "</span></div>"
		$("TBA_help").appendChild(elem("div", "f10 b", str));
	}
	$("TBA_help").style.display = "";
}

function showHelp_move(ev){
	var x=ev.pageX;
	var y=ev.pageY;
	$("TBA_help").style.top=y + 24 + 'px';
	$("TBA_help").style.left=x + 10 + 'px';
}

function main(){
	var access=0;
	if (window.location.href.match(/a2b.php/)) access=1;
	if (window.location.href.match(/berichte.php\?/)) access=1;
	if (window.location.href.match(/warsim.php/)) access=1;
	if (window.location.href.match(/karte.php\?/)) access=1;
	if (access==0) return;
	
	GM_addStyle(cssString);
	
	var imgList = find("//img[starts-with(@src, 'img/un/u')]", XPList);
	
	var div = document.createElement("div");
	div.id = "TBA_help";
	div.setAttribute("style", "position:absolute; padding: 4px; z-index: 400; border: solid 1px #00C000; background-color: #FEFFE3; display: none;");
	document.body.appendChild(div);

	document.addEventListener('mousemove', showHelp_move, false);

	for( var i = 0; i < imgList.snapshotLength; i++) {
		imgList.snapshotItem(i).addEventListener("mouseover", showHelp, false);
		imgList.snapshotItem(i).addEventListener("mouseout", function() { $("TBA_help").style.display = "none";}, false);
	}
	
	
	if(GM_getValue('oazis')==undefined)GM_setValue('oazis','');
	// grafpack
	var gp=find('//link[@rel="stylesheet"]',XPList);
	for(var i=0;i<gp.snapshotLength;i++){
		var csspos=gp.snapshotItem(i).href.indexOf('unx.css');
		if (csspos!=-1){
			grafpack=gp.snapshotItem(i).href.substring(0,csspos);
		}
	};
	// End grafpack
	// a2b
	if (window.location.href.match(/a2b.php/)){
		genreporta2b();
		document.addEventListener('keyup',a2b,false);
		document.addEventListener('click',a2b,false);
		return;
	}
	// End a2b
	// Karte oazis
	if (window.location.href.match(/karte.php\?/)){
		nn=document.getElementById('pr')
		if(nn==null)return;
		imgc=document.createElement('img');
		imgc.src=imgcopy;
		imgc.id='tba_imgcopy';
		imgc.setAttribute('style', 'cursor:pointer');
		imgc.addEventListener('click',kartec,false);
		nn.childNodes[1].appendChild(imgc);
		oazicinfo()
		return;
	}	
	// End Karte oazis

	tab=find("//table[@class='tbg']/tbody",XPList);
	if (window.location.href.match(/warsim.php/)){
		if(find('//table[@class="f10"]',XPList).snapshotLength>0){
			nn=find('//table[@class="f10"]/tbody/tr/td[2]/div',XPList);
			if(nn.snapshotLength==0)return;
			imgpa=document.createElement('img');
			imgpa.id='ba_imgp';
			imgpa.src=imgpaste;
			imgpa.setAttribute('style', 'cursor:pointer');
			imgpa.addEventListener('click',kartep,false);
			nn.snapshotItem(0).childNodes[0].appendChild(imgpa);
			var mass=GM_getValue('oazis').split(',');
			if(document.getElementsByName('a2_'+mass[0]).length==0){
				imgpa.style.display='none';
			};
		};
		if(tab.snapshotLength<3)return;
	// Warsim
		warsim=1;
	// End Warsim
	}else{
		if(tab.snapshotItem(1)==undefined)return;
		if(tab.snapshotItem(1).parentNode.id=='MeXaon_ver_table')return;
		if(tab.snapshotItem(1).parentNode.getElementsByTagName("td").length < 24)return;
		if(tab.snapshotItem(1).getElementsByTagName("td")[0].textContent.charCodeAt(0)==160) return;
		// fix anchors
			var fa = tab.snapshotItem(0).getElementsByTagName('a');
			for( var i = 0; i < fa.length; i++) {
				fa[i].href = fa[i].href;
			}
		//
		saveBeta ='<table><tbody>' + tab.snapshotItem(0).innerHTML + '</tbody></table>';
	}

	table=tab.snapshotItem(1-warsim).getElementsByTagName("td");
	attacktable();
	for(var i=(2-warsim);i<tab.snapshotLength;i++){
		if(tab.snapshotItem(i).parentNode.id!='MeXaon_ver_table'){
			table=tab.snapshotItem(i).getElementsByTagName("td");
			deftable();
		};
	}
	generatereport();
}

function attacktable(){
	var statushero=0;
	var statustrap=0;
	var troops=0; //1-romans 2-teutons 3-gauls
	var lostres=new Array(0,0,0,0);
	var atstemp=new Array(0,0,0,0,0,0,0,0,0,0);
	if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
	if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
	if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		default:tm=null;break;
	}
	var rescell=find("//tr[@class='cbg1']/td[@class='s7']",XPFirst);
	if(tm!=null){
		if(table[13-warsim*2].innerHTML.indexOf("img")>0) {statushero=1;ats[5]=1;}
		var tda=14+statushero-warsim*2;
		var tdl=25+statushero*2-warsim*2;
		var tdt=0;
		if(!warsim&&(table.rows>4)){
			if(table[36+statushero*3].getAttribute('colspan')==null)tdt=36+statushero*3;
		}
		for(var i=0;i<=(9+statushero);i++){
			atstemp[0]=atstemp[0]+table[tda+i].textContent*tm[i][0];
			lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
			lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
			lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
			lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
			atstemp[4]=atstemp[4]+table[tda+i].textContent*tm[i][7];
			atstemp[6]=atstemp[6]+table[tdl+i].textContent*tm[i][7];
			atstemp[8]=atstemp[8]+table[tda+i].textContent*tm[11][i]*tm[i][0];
			atstemp[9]=atstemp[9]+table[tda+i].textContent*tm[12][i]*tm[i][0];
			if(tdt!=0){
				atstemp[7]=atstemp[7]+table[tdt+i].textContent*tm[i][7];
				atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent-table[tdt+i].textContent)*tm[i][9];
			}else{
				atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent)*tm[i][9];
			}
		}
		atstemp[1]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
		if (rescell!=null){
			res=rescell.textContent.split(" ");
			atstemp[2]=parseInt(res[0])+parseInt(res[1])+parseInt(res[2])+parseInt(res[3]);
			rescell.appendChild(elem('span','f8','<i><b> ('+atstemp[2]+')</b></i>'));
		}
		attHTML = '<img src="'+imgatti+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[8]+'</i></font><br>';
		attHTML += '<img src="'+imgattc+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[9]+'</i></font><br>';
		attHTML += '<img title="'+langfile[0]+'" src="'+imgp('img/un/a/att_all.gif')+'" align="left" height="15" width="15" style="padding-left: 3px">&nbsp;<font class="f8"><i>'+atstemp[0]+'</i></font>';
		table[2-warsim*2].innerHTML=attHTML;
		rowi=document.createElement("tr");
		cell1=document.createElement("td");
		cell1.innerHTML='<font class="f8"><i>'+langfile[1]+'</i></font>';
		cell2=document.createElement("td");
		cell2.setAttribute("align","left");
		cell2.setAttribute("colspan",10+statushero);
		cell2.innerHTML='<font class="f8"><i><img src="'+imgp('img/un/r/1.gif')+'">'+lostres[0]+'&nbsp;<img src="'+imgp('img/un/r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+imgp('img/un/r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+imgp('img/un/r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+atstemp[1]+')</b></i></font>';
		rowi.appendChild(cell1);
		rowi.appendChild(cell2);

		table[0].parentNode.parentNode.appendChild(rowi);

		if (warsim != 1) {
			rowProfit = document.createElement("tr");
			cell1 = document.createElement("td");
			cell1.innerHTML = langfile[17];
			cell2 = document.createElement("td");
			cell2.setAttribute("colspan", 10 + statushero);
			cell2.setAttribute("align","left");
			var profit = Math.round( (atstemp[2]- atstemp[1]) * 100 / atstemp[2] )
			if (atstemp[2] == 0) { atstemp[1] == 0 ? profit = 0 : profit = -100 }
			cell2.innerHTML = profit + "%"; 
			rowProfit.appendChild(cell1);
			rowProfit.appendChild(cell2);
			
			rowEfficiency = document.createElement("tr");
			cell1 = document.createElement("td");
			cell1.innerHTML = langfile[18];
			cell2 = document.createElement("td");
			cell2.setAttribute("colspan", 10 + statushero);
			cell2.setAttribute("align","left");
			var efficiency = Math.round(atstemp[2] / atstemp[3] * 100);
			if (atstemp[3] == 0) efficiency = 0;
			cell2.innerHTML = efficiency + "%";
			rowEfficiency.appendChild(cell1);
			rowEfficiency.appendChild(cell2);

		table[0].parentNode.parentNode.appendChild(rowProfit);
		table[0].parentNode.parentNode.appendChild(rowEfficiency);
		}
	};
	for(var i=0;i<ats.length;i++){
		ats[i]=ats[i]+atstemp[i];
	};
};

function deftable(){
	var statushero=0;
	var troops=0; //1-romans 2-teutons 3-gauls 4-nature
	var lostres=new Array(0,0,0,0);
	var dtstemp=new Array(0,0,0,0,0,0);
	var lostEnable = 1
	if(table[3-warsim*2].innerHTML.indexOf("u/1.gif")>0) troops=1;
	if(table[3-warsim*2].innerHTML.indexOf("u/11.gif")>0) troops=2;
	if(table[3-warsim*2].innerHTML.indexOf("u/21.gif")>0) troops=3;
	if(table[3-warsim*2].innerHTML.indexOf("u/31.gif")>0) troops=4;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		case 4:tm=nature;break;
		default:tm=null;break;
	}
	if(tm!=null){
		if(table[13].innerHTML.indexOf("img")>0) {statushero=1;dts[4]=1;}
		var tda=14+statushero-warsim*2;
		var tdl=25+statushero*2-warsim*2;
		if (!table[tdl]) {
			lostEnable = 0;
		}
		for(var i=0;i<=(9+statushero);i++){
			dtstemp[0]=dtstemp[0]+table[tda+i].textContent*tm[i][1];	// def1
			dtstemp[1]=dtstemp[1]+table[tda+i].textContent*tm[i][2];	// def2
			dtstemp[3]=dtstemp[3]+table[tda+i].textContent*tm[i][7];
			if (lostEnable){
				lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];
				lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];
				lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];
				lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];
				dtstemp[5]=dtstemp[5]+table[tdl+i].textContent*tm[i][7];
			}
		}
		dtstemp[2]=lostres[0]+lostres[1]+lostres[2]+lostres[3];
		table[2-warsim*2].innerHTML='<img title="'+langfile[2]+'" src="'+imgp('img/un/a/def_i.gif')+'" align="absmiddle" height="15" width="15">&nbsp;<font class="f8"><i>'+dtstemp[0]+'</i></font><br><img title="'+langfile[3]+'" src="'+imgp('img/un/a/def_c.gif')+'" align="absmiddle" height="15" width="15">&nbsp;<font class="f8"><i>'+dtstemp[1]+'</i></font>';
	rowi=document.createElement("tr");
	cell1=document.createElement("td");
	cell1.innerHTML='<font class="f8"><i>'+langfile[1]+'</i></font>';
	cell2=document.createElement("td");
	cell2.setAttribute("align","left");
	cell2.setAttribute("colspan",10+statushero);
	cell2.innerHTML='<font class="f8"><i><img src="'+imgp('img/un/r/1.gif')+'">'+lostres[0]+'&nbsp;<img src="'+imgp('img/un/r/2.gif')+'">'+lostres[1]+'&nbsp;<img src="'+imgp('img/un/r/3.gif')+'">'+lostres[2]+'&nbsp;<img src="'+imgp('img/un/r/4.gif')+'">'+lostres[3]+'&nbsp; <b>(-'+dtstemp[2]+')</b></i></font>';
	rowi.appendChild(cell1);
	rowi.appendChild(cell2);
	table[0].parentNode.parentNode.appendChild(rowi);
	};
	for(var i=0;i<dts.length;i++){
		dts[i]=dts[i]+dtstemp[i];
	}
}

function generatereport(){
	if(ats[3]==0)ats[2]=0;
	var lostA=ats[2]-ats[1];
	var lostB=dts[2]+ats[2];

	trep=document.createElement("table");
	row1=document.createElement("tr");
	row2=document.createElement("tr");
	row3=document.createElement("tr");
	row4=document.createElement("tr");
	row5=document.createElement("tr");
	
	cell=document.createElement("td");
	cell.appendChild(elem("b","c1 b",langfile[4]));
	cell.setAttribute("colspan","5");
	row1.className="cbg1";
	row1.appendChild(cell);
	
	cell1=document.createElement("td");
	cell1.innerHTML="&nbsp;";
	cell2=document.createElement("td");
	cell2.appendChild(elem("font","f8","<i>"+langfile[5]+"</i>"));
	cell3=document.createElement("td");
	cell3.appendChild(elem("font","f8","<i>"+langfile[6]+"</i>"));
	cell4=document.createElement("td");
	cell4.appendChild(elem("font","f8","<i>"+langfile[7]+"</i>"));
	cell5=document.createElement("td");
	cell5.appendChild(elem("font","f8","<i>"+langfile[8]+"</i>"));
	row2.appendChild(cell1);
	row2.appendChild(cell2);
	row2.appendChild(cell3);
	row2.appendChild(cell4);
	row2.appendChild(cell5);

	cell1=document.createElement("td");
	cell1.className="c2 b";
	cell1.innerHTML=langfile[15];
	cell2=document.createElement("td");
	cell2.setAttribute("align","right");
	cell2.innerHTML=lostA+'*<img src="'+imgp('img/un/r/4.gif')+'" title="'+langfile[9]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML=ats[4]+'*<img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	if(ats[5]==0){
			cell4.innerHTML='0*<img src="'+imgp('img/un/a/del.gif')+'" title="'+langfile[11]+'">';
	}else cell4.innerHTML=dts[5]+'*<img src="'+imgp('img/un/u/hero.gif')+'" title="'+langfile[12]+'">';
	cell5=document.createElement("td");
	cell5.setAttribute("align","right");
	cell5.setAttribute("rowspan","2");
	cell5.innerHTML=ats[2]+'*<img src="'+imgpackgo+'" title="'+langfile[13]+'"><br>'+ats[3]+'*<img src="'+imgpack+'" title="'+langfile[14]+'">';
	row3.appendChild(cell1);
	row3.appendChild(cell2);
	row3.appendChild(cell3);
	row3.appendChild(cell4);
	row3.appendChild(cell5);
	
	cell1=document.createElement("td");
	cell1.className="c1 b";
	cell1.innerHTML=langfile[16];
	cell2=document.createElement("td");
	cell2.setAttribute("align","right");
	cell2.innerHTML=(-lostB)+'*<img src="'+imgp('img/un/r/4.gif')+'" title="'+langfile[9]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML=dts[3]+'*<img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	if(dts[4]==0){
			cell4.innerHTML='0*<img src="'+imgp('img/un/a/del.gif')+'" title="'+langfile[11]+'">';
	}else cell4.innerHTML=ats[6]+'*<img src="'+imgp('img/un/u/hero.gif')+'" title="'+langfile[12]+'">';
	row4.appendChild(cell1);
	row4.appendChild(cell2);
	row4.appendChild(cell3);
	row4.appendChild(cell4);
	
	if (warsim != 1 && worksave == 1) {
		var travilogForm = document.createElement("form");
		travilogForm.setAttribute('action', 'http://travilog.org.ua');
		travilogForm.setAttribute('method', 'post');
		travilogForm.setAttribute('target', 'tba_travilogIFrame');
		travilogForm.setAttribute('id', 'tba_travilogForm');
		travilogForm.setAttribute('onsubmit', 'tba_saveBattlePress();');
		
		var data1 = document.createElement("input");
		data1.setAttribute("type", "hidden");
		data1.setAttribute("name", "new_old");
		data1.setAttribute("value", "new");

		var data2 = document.createElement("input");
		data2.setAttribute("type", "hidden");
		data2.setAttribute("name", "act");
		data2.setAttribute("value", "inputlog");

		var data3 = document.createElement("input");
		data3.setAttribute("type", "hidden");
		data3.setAttribute("name", "server");
		data3.setAttribute("value", "");

		var data4 = document.createElement("input");
		data4.setAttribute("type", "hidden");
		data4.setAttribute("name", "lng");
		data4.setAttribute("value", "en");

		var data5 = document.createElement("input");
		data5.setAttribute("type", "hidden");
		data5.setAttribute("name", "tools");
		data5.setAttribute("value", "tba");

		var data6 = document.createElement("input");
		data6.setAttribute("type", "hidden");
		data6.setAttribute("name", "GMT");
		var cd = new Date()
		data6.setAttribute("value", cd.getTimezoneOffset());

		var data7 = document.createElement("input");
		data7.setAttribute("type", "hidden");
		data7.setAttribute("name", "text");
		data7.value = saveBeta;

		var button1 = document.createElement("input");
		button1.setAttribute("type", "submit");
		button1.setAttribute("value", "save report");
		button1.setAttribute("onclick", "document.getElementById('tba_travilogForm').submit()");

		var button2 = document.createElement("input");
		button2.setAttribute("type", "checkbox");
		button2.setAttribute("name", "anonymous");
		button2.setAttribute("value", "1");

		travilogForm.appendChild(data1);
		travilogForm.appendChild(data2);
		travilogForm.appendChild(data3);
		travilogForm.appendChild(data4);
		travilogForm.appendChild(data5);
		travilogForm.appendChild(data6);
		travilogForm.appendChild(data7);
		travilogForm.appendChild(button1);
		travilogForm.appendChild(button2);
		travilogForm.appendChild(elem("span", "", "anonymize"));
		
		var travilogIFrame = document.createElement("iframe");
		travilogIFrame.setAttribute('name', 'tba_travilogIFrame');
		travilogIFrame.setAttribute('id', 'tba_travilogIFrameId');
		travilogIFrame.setAttribute('onload', 'tba_saveBattleLoaded();');
		travilogIFrame.setAttribute('style', 'border: 0px; width: 100%; height: 7.5em');
		travilogIFrame.innerHTML = "Loading";
		
		var divLoading = document.createElement('div');
		divLoading.id = 'tba_travilogIframeRowDiv'; 
		divLoading.innerHTML = "<b>--= Loading =--</b>";

		cell1 = document.createElement("td");
		cell1.setAttribute('colspan', '5');
		cell1.setAttribute('align', 'left');
		cell1.appendChild(travilogForm);

		row6=document.createElement("tr");
		row6.appendChild(cell1);
		
		cell1 = document.createElement("td");
		cell1.setAttribute('colspan', '5');
//		cell1.setAttribute('align', 'left');
		cell1.appendChild(divLoading);
		cell1.appendChild(travilogIFrame)

		row7=document.createElement("tr");
		row7.id = 'tba_travilogIframeRow';
		row7.style.display = 'none';
		row7.appendChild(cell1);
	}


	trep.setAttribute("cellpadding","2");
	trep.setAttribute("cellspacing","1");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row2);
	trep.appendChild(row3);
	trep.appendChild(row4);
	if (warsim != 1 && worksave == 1) {
		trep.appendChild(row5);
		trep.appendChild(row6);
		trep.appendChild(row7);
	}

	tab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(elem("p","",""));
	if(warsim==0){
		tab.snapshotItem(0).getElementsByTagName("td")[5].appendChild(trep);
	}else{
		tab.snapshotItem(1).parentNode.parentNode.insertBefore(trep,tab.snapshotItem(1).parentNode.nextSibling);
		tab.snapshotItem(1).parentNode.parentNode.insertBefore(elem('p','',''),tab.snapshotItem(1).parentNode.nextSibling);
	};
}

function a2b(){
	ats=[0,0,0,0,0,0,0,0];
	var list=find('//table[@class="p1"]/tbody/tr/td/table[@class="f10"]/tbody/tr/td/input',XPList);
	if(list.snapshotLength==0){alert('Error:Find Table,a2b');return;}
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/1.gif")>0) troops=1;
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/11.gif")>0) troops=2;
	if(list.snapshotItem(0).parentNode.parentNode.childNodes[1].innerHTML.indexOf("u/21.gif")>0) troops=3;
	switch (troops){
		case 1:tm=romans;break;
		case 2:tm=teutons;break;
		case 3:tm=gauls;break;
		default:tm=null;break;
	}
	if(tm==null){alert('Error:Bad troops,a2b');return;}
	for(var i=0;i<list.snapshotLength;i++){
		unit=parseInt(list.snapshotItem(i).getAttribute('name').match(/(\d+)/).pop())-1;
		val=parseInt(list.snapshotItem(i).value);
		if(isNaN(val))val=0;
		ats[0]=ats[0]+val*tm[unit][0];	// attack
		ats[1]=ats[1]+val*tm[unit][1];	// def1
		ats[2]=ats[2]+val*tm[unit][2];	// def2
		ats[3]=ats[3]+val*tm[unit][9];	// load
		ats[4]=ats[4]+val*tm[unit][7];	// food
	}
	eats0=document.getElementById('ats0');
	eats1=document.getElementById('ats1');
	eats2=document.getElementById('ats2');
	eats3=document.getElementById('ats3');
	eats4=document.getElementById('ats4');
	eats0.textContent=ats[0];
	eats1.textContent=ats[1];
	eats2.textContent=ats[2];
	eats3.textContent=ats[3];
	eats4.textContent=ats[4];
};

function genreporta2b(){
	trep=document.createElement("table");
	row1=document.createElement("tr");
	row2=document.createElement("tr");
	row3=document.createElement("tr");
	
	cell=document.createElement("td");
	cell.appendChild(elem("b","c1 b",langfile[4]));
	cell.setAttribute("colspan","5");
	row1.className="cbg1";
	row1.appendChild(cell);

	cell1=document.createElement("td");
	cell1.style.width='60%';
	cell1.setAttribute('colspan','3');
	cell1.appendChild(elem("font","f8","<i>"+langfile[15]+"</i>"));
	cell3=document.createElement("td");
	cell3.style.width='20%';
	cell3.appendChild(elem("font","f8","<i>"+langfile[6]+"</i>"));
	cell5=document.createElement("td");
	cell5.style.width='20%';
	cell5.appendChild(elem("font","f8","<i>"+langfile[8]+"</i>"));
	row2.appendChild(cell1);
	row2.appendChild(cell3);
	row2.appendChild(cell5);
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML='<span id="ats0">'+ats[0]+'</span>*<img src="'+imgp('img/un/a/att_all.gif')+'" title="'+langfile[0]+'">';
	cell2=document.createElement("td");
	cell2.setAttribute("align","right");
	cell2.innerHTML='<span id="ats1">'+ats[1]+'</span>*<img src="'+imgp('img/un/a/def_i.gif')+'" title="'+langfile[2]+'">';
	cell3=document.createElement("td");
	cell3.setAttribute("align","right");
	cell3.innerHTML='<span id="ats2">'+ats[2]+'</span>*<img src="'+imgp('img/un/a/def_c.gif')+'" title="'+langfile[3]+'">';
	cell4=document.createElement("td");
	cell4.setAttribute("align","right");
	cell4.innerHTML='<span id="ats4">'+ats[4]+'</span>*<img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	cell5=document.createElement("td");
	cell5.setAttribute("align","right");
	cell5.setAttribute("rowspan","2");
	cell5.innerHTML='<span id="ats3">'+ats[3]+'</span>*<img src="'+imgpack+'" title="'+langfile[14]+'">';
	row3.appendChild(cell1);
	row3.appendChild(cell2);
	row3.appendChild(cell3);
	row3.appendChild(cell4);
	row3.appendChild(cell5);
		
	trep.setAttribute("cellpadding","2");
	trep.setAttribute("cellspacing","1");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row2);
	trep.appendChild(row3);
	
	var t=find('//div[@id="lmid2"]/form/table[@class="f10"]',XPList);
	t.snapshotItem(0).parentNode.insertBefore(trep,t.snapshotItem(0));
	t.snapshotItem(0).parentNode.insertBefore(elem('p','',''),t.snapshotItem(0));
}

function oazicinfo(){
	var m=[0,0,0,0];
	var tdl=find('//div[@id="pr"]/table/tbody/tr/td',XPList);
	if(tdl.snapshotItem(0).firstChild.src.match(/u\/(\d+)/)==undefined){
		$('tba_imgcopy').style.display='none';
		return;
	};
	var race=parseInt(tdl.snapshotItem(0).firstChild.src.match(/u\/(\d+)/).pop()/10)*10;
	for(var i=0;i<tdl.snapshotLength;i+=3){
		ut=parseInt(tdl.snapshotItem(i).firstChild.src.match(/u\/(\d+)/).pop())-race-1;
		uc=parseInt(tdl.snapshotItem(i+1).innerHTML.match(/(\d+)/).pop());
		m[0]=m[0]+uc*nature[ut][0];	//att
		m[1]=m[1]+uc*nature[ut][1];	//def1
		m[2]=m[2]+uc*nature[ut][2]; //def2
		m[3]=m[3]+uc*nature[ut][7]; //food
	}
	trep=document.createElement("table");
	row1=document.createElement("tr");
	row2=document.createElement("tr");
	row3=document.createElement("tr");
	row4=document.createElement("tr");
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML=+m[0]+'*<img src="'+imgp('img/un/a/att_all.gif')+'" title="'+langfile[0]+'">';
	row1.appendChild(cell1);
	
	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML='<span id="ats1">'+m[1]+'</span>*<img src="'+imgp('img/un/a/def_i.gif')+'" title="'+langfile[2]+'">';
	row2.appendChild(cell1);

	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML='<span id="ats2">'+m[2]+'</span>*<img src="'+imgp('img/un/a/def_c.gif')+'" title="'+langfile[3]+'">';
	row3.appendChild(cell1);

	cell1=document.createElement("td");
	cell1.setAttribute("align","right");
	cell1.innerHTML='<span id="ats4">'+m[3]+'</span>*<img src="'+imgp('img/un/r/5.gif')+'" title="'+langfile[10]+'">';
	row4.appendChild(cell1);
	
	trep.setAttribute("style","width: 80%");
	trep.className="tbg";
	trep.appendChild(row1);
	trep.appendChild(row2);
	trep.appendChild(row3);	
	trep.appendChild(row4);
	
	document.getElementById('pr').appendChild(trep);
}

function kartec(ev){
	var str='';
	var tdl=find('//div[@id="pr"]/table/tbody/tr/td',XPList);
	var race=parseInt(tdl.snapshotItem(0).firstChild.src.match(/u\/(\d+)/).pop()/10);
	for(var i=0;i<tdl.snapshotLength;i+=3){
		ut=parseInt(tdl.snapshotItem(i).firstChild.src.match(/u\/(\d+)/).pop());
		uc=parseInt(tdl.snapshotItem(i+1).innerHTML.match(/(\d+)/).pop());
		str=str+ut+','+uc+',';
	}
	GM_setValue('oazis',str);
}

function kartep(ev){
	var mass=GM_getValue('oazis').split(',');
	if(document.getElementsByName('a2_'+mass[0]).length==0)return;
	for(var i=1;i<11;i++){
		document.getElementsByName('a2_'+parseInt(30+i))[0].value=0;
	};
	for(var i=0;i<mass.length-1;i+=2){
		document.getElementsByName('a2_'+mass[i])[0].value=mass[i+1];
	};
}

main()

function $(id){
	return document.getElementById(id);
};

unsafeWindow.tba_saveBattlePress = function() {
	document.getElementById("tba_travilogIframeRow").style.display = "";
	document.getElementById("tba_travilogIframeRowDiv").style.display = "";
	document.getElementById("tba_travilogIFrameId").style.display = "none";
}

unsafeWindow.tba_saveBattleLoaded = function() {
	document.getElementById("tba_travilogIFrameId").style.display = "";
	document.getElementById("tba_travilogIframeRowDiv").style.display = "none";
}

GM_registerMenuCommand(ScriptName +' v' + ScriptVersion + " > Check new version", function(){ GM_openInTab(ScriptLink)});