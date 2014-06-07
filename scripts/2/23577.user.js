// ==UserScript==
// @name          Travian: Text Attack Builder M*Fversion
// @description   Build attacks in textArea
// @include       *travian*dorf1.php*
// @version 1.0
// ==/UserScript==

//start variabler 
timerIntervalId = 0;
var DID = getActiveDid();
var timedAttacktimer = false;
firstRun = true;
numberattacks = 0;
var totalattacks = 0;
var troops = new Array();
var cord;
var Race = getRaceDorf1();
//var Race = 1;
var fillOut = new Array();
var fillOutTemp = new Array();
var code = new Array();
nwave = 0;
var katjes1 =0;
var katjes2 =0;
var aLangTroops = [];  //Needs to be translated in almost every language..

var attackurl =  document.location.href.split('?')[0].replace('dorf1','a2b');

//Set language manualy or let the script detect it for you
var sLang = "";

detectLanguage();

switch(sLang) {
	case "sk":
		aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímske baranidlo", "Ohnivý katapult", "Senátor", "Osadník", "Hrdina"];  //Romans
		aLangTroops[1] = ["Pálkar", "Oštepár", "Bojovník so sekerou", "Špeh", "Rytier", "Teuton jazdec", "Germánske baranidlo", "Katapult", "Kmeňový vodca", "Osadník", "Hrdina"];  //Teutons
		aLangTroops[2] = ["Falanx", "Šermiar", "Sliedič", "Theutates Blesk", "Druid jazdec", "Haeduan", "Drevené baranidlo", "Trebušé", "Náčelník", "Osadník", "Hrdina"];  //Gauls
		break;

	case "ba":  //by bhcrow
		aLangTroops[0] = ["Legionar", "Preatorijanac", "Imperijanac", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ratni ovan", "Vatreni katapult", "Senator", "Naseljenik", "Hero"];  //Romans
		aLangTroops[1] = ["Batinar", "Kopljanik", "Borac sa sikirom", "Izviđač", "Paladin", "Teutonski vitez", "Ovan", "Katapult", "Poglavica", "Naseljenik", "Hero"];  //Teutons
		aLangTroops[2] = ["Palanks", "Mačevalac", "Izviđač", "Theutateov Grom", "druidni jahač", "Haeduan", "Ovan", "Katapult", "Starješina", "Naseljenik", "Hero"];  //Gauls
		break;		
		
	case "cz":
		aLangTroops[0] = ["Legionář", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Římanské beranidlo", "Ohnivý katapult", "Senátor", "Osadník"]; //Romans
		aLangTroops[1] = ["Pálkař", "Oštěpař", "Sekerník", "Zvěd", "Rytíř", "Teuton jezdec", "Germánské beranidlo", "Katapult", "Kmenový vůdce", "Osadník"]; //Teutons
		aLangTroops[2] = ["Falanx", "Šermíř", "Slídič", "Theutates Blesk", "Druid jezdec", "Haeduan", "Dřevěné beranidlo", "Válečný katapult", "Náčelník", "Osadník"]; //Gauls
		break;	
		
	case "de":  //by Metador
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "dk":  //by Ronster Madsen
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Kølle", "Spyd", "Økse", "Spy", "Pala", "Teuton", "Ram", "Katas", "StammeF", "Bosæt", "Helt"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "net":  //Spanish - by Carlos R.
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Explorador", "Paladín", "Caballero Teutón", "Ariete", "Catapulta", "Jefe", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Rastreador", "Trueno Theutates", "Jinete Druida", "Haeduano", "Ariete", "Fundíbulo", "Cacique", "Colono", "Héroe"];  //Galos
		break;
		
	case "fi":  //by Zypper
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "hk":  //by Angus
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "hu": //by [TAJM]Kobra,
		aLangTroops[0] = ["Légiós", "Testőr", "Birodalmi", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Faltörő kos", "Tűzkatapult", "Szenátor", "Telepes"];  //Római
		aLangTroops[1] = ["Buzogányos", "Lándzsás", "Csatabárdos", "Felderítő", "Paladin", "Teuton lovag", "Faltörő kos", "Katapult", "Törzsi vezető", "Telepes"];  //Germán
		aLangTroops[2] = ["Phalanx", "Kardos", "Felderítő", "Theutat villám", "Druida lovas", "Haeduan", "Falromboló", "Harci-katapult", "Főnök", "Telepes"];  //Gall		
		break;
  
	case "it":  //by Tazzicus
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Hero"];
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Hero"];
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribu'", "Decurione", "Hero"];		
		break;
	
    case "lt":  //by NotStyle
        	aLangTroops[0] = ["Legionierius", "Pretorionas", "Imperionas", "Raitas legatas", "Imperatoriaus raitelis", "Cezario raitelis", "Mūradaužys", "Ugninė katapulta", "Senatorius", "Romėnų kolonistas", "Herojus"];  //Romėnai
        	aLangTroops[1] = ["Pėstininkas su kuoka", "Ietininkas", "Pėstininkas su kirviu", "Žvalgas", "Paladinas", "Germanų raitelis", "Taranas", "Katapulta", "Germanų vadas", "Germanų kolonistas", "Herojus"];  //Germanai
        	aLangTroops[2] = ["Falanga", "Pėstininkas su kardu", "Pėdsekys", "Raitas perkūnas", "Raitas druidas", "Raitas hedujas", "Taranas", "Trebušetas", "Galų kunigaikštis", "Galų kolonistas", "Herojus"];  //Galai
        	break;	
		
	case "nl":  //by Kris Fripont
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "no":  //by Lordlarm @ S3 [*LORDS* 4 EVER]
        	aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	
	case "br":
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	case "pt":  
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador"];  //Romans
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espiăo", "Paladino", "Cavaleiro Teutăo", "Aríete", "Catapulta", "Chefe", "Colonizador"];  //Teutons
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovăo Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clă", "Colonizador"];  //Gauls
		break;
		
	case "pl":  //by Oskar
        	aLangTroops[0] = ["Legionista", "Pretorianin", "Centurion", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Taran", "Ognista katapulta", "Konsul", "Osadnik", "Bohater"];  //Romans
		aLangTroops[1] = ["Pałkarz", "Oszczepnik", "Topornik", "Zwiadowca", "Paladyn", "Germański Rycerz", "Taran", "Katapulta", "Wódz", "Osadnik", "Bohater"];  //Teutons
		aLangTroops[2] = ["Falanga", "Miecznik", "Tropiciel", "Grom Teutatesa", "Jeździec Druidzki", "Haeduan", "Taran", "trebeusz", "Herszt", "Osadnik", "Bohater"];  //Gauls		
		break;
	
	case "ro":  //Dark EingeL
	   	aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
	    	break;
	case "ru": //by Алексей Головлев
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	
	case "tr":
		aLangTroops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbaşi", "Ateş Mancinigi", "Senator", "Göçmen", "Hero"];  //Romalilar
		aLangTroops[1] = ["Tokmak Sallayan", "Mizrakçi", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbaşi", "Mancinik", "Reis", "Göçmen", "Hero"];  //Cermenler
		aLangTroops[2] = ["Phalanx", "Kiliçli", "Casus", "Toytagin Şimşegi", "Druyid", "Haeduan", "Koçbaşi", "Mancinik", "Kabile Reisi", "Göçmen", "Hero"];  //Galyalilar
		break;
	
	case "si":  //by SpEkTr
		aLangTroops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist"];  //Romans
		aLangTroops[1] = ["Gorjačar", "Suličar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist"];  //Teutons
		aLangTroops[2] = ["Falanga", "Mečevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist"];  //Gauls
		break;
		
	case "us":  //by m4rtini
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	case "se":
		aLangTroops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Spårare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"];  //Romans
        	aLangTroops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"];  //Teutons
        	aLangTroops[2] = ["Falanx", "Svärdskämpe", "Spårare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"];  //Gauls
        	break;
	case "ro":
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	case "en":
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	case "com":
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	case "uk":
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	default: // default is english
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
}


function detectLanguage() {
	if(sLang != "") {return;}
	var re = null; re = new RegExp("^http://[^/]*\.([a-zA-Z]{2,3})\/.*$", "i");
	var lang = window.location.href.match(re);
	if(!lang) {
		return;
	} else {
		sLang = lang.pop();
	}
}





  
function getNumber(tekst)
{
	var terug;
	//alert(tekst.indexOf("'")+1+"      "+tekst.lastIndexOf("'"));
	if((tekst.indexOf("=")+1 ) == 0 &&  tekst.lastIndexOf(";") == -1)
	{
		return 0;
	}else
	{
		return tekst.substring(tekst.indexOf("=")+1, tekst.indexOf(";"));
	}
}

function Random(minimum, maximum)
{	
	if(minimum == null && maximum == null )
	{
		minimum = 1000;
		maximum = 10000;
	}
	return Math.random()*(maximum-minimum+1);
		
};


/////////////////////////////////////////////////
/////////////////Angrep//////////////////////////
/////////////////////////////////////////////////

function attack(Nwave){
  saveList();
  
 
  if (firstRun){
  cord = myFarmArea.innerHTML.split("\n");
  c = document.getElementById('typeAttack').value;
  check=false;
  
  spy = false;
      if (c>4)
      {
      spy = c-4;
      c=3;
      }
      
  troops = getTotalUnitDorf1();
  code = troops.split("|");
  		var type1 = parseInt(code[0]);
		var type2 = parseInt(code[1]);
		var type3 = parseInt(code[2]);
		var type4 = parseInt(code[3]);
		var type5 = parseInt(code[4]);
		var type6 = parseInt(code[5]);
		var type7 = parseInt(code[6]);
		var type8 = parseInt(code[7]);
		var type9 = parseInt(code[8]);
		var type10 = parseInt(code[9]);
  		
		//alert(type1+type2+type3+type4+type5);
		fillOut = myFarmArea.innerHTML.split("\n");
  		
  		var type = new Array(10);
  		type[0]=type1;
  		type[1]=type2;
  		type[2]=type3;
  		type[3]=type4;
  		type[4]=type5;
  		type[5]=type6;
  		type[6]=type7;
  		type[7]=type8;
  		type[8]=type9;
  		type[9]=type10;
  		
  		//alert("før " + totalTroops);
		for(i=0;i<cord.length;i++){
			fillOut[i] = fillOut[i].split("|");
			fillOut[i][0] = fillOut[i][0].split(",");
			fillOut[i][1] = fillOut[i][1].split(",");
			//errorMsg("før" + totalTroops + ":" + parseInt(fillOutTemp[i][1][1]));
			//troopsWave = -1;
			//errorMsg("før" + totalTroops + ":" + parseInt(fillOutTemp[i][1][0])+fillOutTemp[i][1][1]+fillOutTemp[i][1][2]+fillOutTemp[i][1][3]+fillOutTemp[i][1][4]));
			//parseInt(fillOutTemp[i][1][0]+fillOutTemp[i][1][1]+fillOutTemp[i][1][2]+fillOutTemp[i][1][3]+fillOutTemp[i][1][4]);
			//errorMsg("før" + totalTroops + ":" + parseInt(fillOutTemp[i][1][0]+fillOutTemp[i][1][1]+fillOutTemp[i][1][2]+fillOutTemp[i][1][3]+fillOutTemp[i][1][4]));
			if(parseInt(fillOut[i][1][0])>0)
			{
				type[0] = type[0] - parseInt(fillOut[i][1][0]);
			}
			if(parseInt(fillOut[i][1][1])>0){
				type[1] = type[1] - parseInt(fillOut[i][1][1]);
			}
			if(parseInt(fillOut[i][1][2])>0){
				type[2] = type[2] - parseInt(fillOut[i][1][2]);
			}
			if(parseInt(fillOut[i][1][3])>0){
				type[3] = type[3] - parseInt(fillOut[i][1][3]);
			}
			if(parseInt(fillOut[i][1][4])>0){
				type[4] = type[4] - parseInt(fillOut[i][1][4]);
			}
			if(parseInt(fillOut[i][1][5])>0){
				type[5] = type[5] - parseInt(fillOut[i][1][5]);
			}
			if(parseInt(fillOut[i][1][6])>0){
				type[6] = type[6] - parseInt(fillOut[i][1][6]);
			}
			if(parseInt(fillOut[i][1][7])>0){
				type[7] = type[7] - parseInt(fillOut[i][1][7]);
			}
			if(parseInt(fillOut[i][1][8])>0){
				type[8] = type[8] - parseInt(fillOut[i][1][8]);
			}
			if(parseInt(fillOut[i][1][9])>0){
				type[9] = type[9] - parseInt(fillOut[i][1][9]);
			}
			if(parseInt(fillOutTemp[i][1][10])>0){
				type[10] = type[10] - parseInt(fillOutTemp[i][1][10]);
			}
			
			//totalTroops = totalTroops-(parseInt(fillOutTemp[i][1][0])+parseInt(fillOutTemp[i][1][1])+parseInt(fillOutTemp[i][1][2])+parseInt(fillOutTemp[i][1][3])+parseInt(fillOutTemp[i][1][4]));
		}
  //alert("efter " + totalTroops);
  var check=true;
  for(var j=0;j<10;j++){
  if (parseInt(type[j])<0)
  {
  errorMsg("Not Enough: " + aLangTroops[Race][j]);
  check=false;
  }
  	
  }
  if(!check){
  	abort();
  	return;
  }


totalattacks = cord.length;
firstRun = false;
addCount("<b>Starting</b>");
	var xcord;
	var ycord;
	var postvar;
	Nwave=0;
}


nwave=Nwave;
if(nwave<=totalattacks){
        //alert("før fejl");
	//xcord = fillOut[nwave][0][0];
	//ycord = fillOut[nwave][0][1];
	katjes1 = fillOut[nwave][1][11]
 	katjes2 = fillOut[nwave][1][12]
 	
 	
	var url = attackurl + '?' + DID;
	postvar = 'b=1&t1='+ fillOut[nwave][1][0] +'&t2='+ fillOut[nwave][1][1] +'&t3='+ fillOut[nwave][1][2] +'&t4='+ fillOut[nwave][1][3] +'&t5='+ fillOut[nwave][1][4] +'&t5='+ fillOut[nwave][1][4] +'&t6='+ fillOut[nwave][1][5] +'&t7='+ fillOut[nwave][1][6] +'&t8='+ fillOut[nwave][1][7] +'&t9='+ fillOut[nwave][1][8] +'&t10='+ fillOut[nwave][1][9] +'&t11='+ fillOut[nwave][1][10]+'&c='+ c +'&dname=&x='+fillOut[nwave][0][0]+'&y='+fillOut[nwave][0][1]+'&s1=ok';
	//alert(nwave+":"+totalattacks+":"+postvar);
	//alert(postvar);
	post(url, postvar, fillOut[nwave][0][0], fillOut[nwave][0][1], katjes1, katjes1,spy);
	nwave++;
	
	//if(fillOut[nwave][2][0]=="Clean" || fillOut[nwave][2][0]=="Pult1" || fillOut[nwave][2][0]=="Pult2"){
	//setTimeout(function(){attack(nwave)},100); 
	//}else if(fillOut[nwave][2][0]=="Clean2" || fillOut[nwave][2][0]=="Pult21" || fillOut[nwave][2][0]=="Pult22" ){
	//setTimeout(function(){attack(nwave)},100); 
	//}else{
	setTimeout(function(){attack(nwave)},document.getElementById('lag').value);
	//}




	
}else{
alert("stopped");
return;
}

}




////////////////////////////////////////////////////




function post(url, data, xcord, ycord,kat, kat2,spy) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
      {
	pulled = document.createElement('div');
  	pulled.innerHTML = responseDetails.responseText; 
	
	idValue = getValue(pulled, 'id');
	aValue = getValue(pulled, 'a');
	cValue = getValue(pulled, 'c');
	kidValue = getValue(pulled, 'kid');
	t1Value = getValue(pulled, 't1');
	t2Value = getValue(pulled, 't2');
	t3Value = getValue(pulled, 't3');
	t4Value = getValue(pulled, 't4');
	t5Value = getValue(pulled, 't5');
	t6Value = getValue(pulled, 't6');
	t7Value = getValue(pulled, 't7');
	t8Value = getValue(pulled, 't8');
	t9Value = getValue(pulled, 't9');
	t10Value = getValue(pulled, 't10');
	t11Value = getValue(pulled, 't11');
	
if (!idValue && !aValue && !cValue && !kidValue)
{
//alert('id:'+idValue + 'a:'+ aValue + 'c'+ cValue + 'kid'+ kidValue);
errorMsg("(" + xcord +',' + ycord + ") Probably bad cords."  );
return;
}


var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1='+t1Value+'&t2='+t2Value+'&t3='+t3Value+'&t4='+t4Value+'&t5='+t5Value+'&t6='+t6Value+'&t7='+t7Value+'&t8='+t8Value+'&t9='+t9Value+'&t10='+t10Value+'&t11='+t11Value;
if (kat != 0){postData = postData + '&kata='+kat;}
if (kat2 != 0){postData = postData + '&kata2='+kat2; } 
postData = postData + '&s1=ok&attacks=&cords=';


if (spy)
{
    if (Race == 2 && t3Value > 0)
	{
    var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1=0&t2=0&t3=' +t3Value +'&t4=0&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0&s1=ok&attacks=&cords=&spy=' + spy;
  }
  else if (Race != 2 && t4Value >0)
  {
  var postData = 'id='+idValue+'&a='+aValue+'&c='+cValue+'&kid='+kidValue+'&t1=0&t2=0&t3=0&t4='+t4Value+'&t5=0&t6=0&t7=0&t8=0&t9=0&t10=0&t11=0&s1=ok&attacks=&cords=&spy=' + spy;
  }else{
  errorMsg(text[7]);
  return;
  }
}
  
post2(url, postData);
    }
  });
}

function post2(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
	
	numberattacks++;
	
	//alert();
	if (numberattacks < totalattacks)
	{
 		addCount(".");
	}else{


        urlFinished = "http://" + document.domain + "/build.php?id=39";
    	addCount(". <a href=" + urlFinished + ">Done</a>");  //legg inn delay her 
      //resetting the start values
      //pausecomp(Random(500,1500));
      abort();
      //setTimeout(window.location.reload(),1000); 
	 
  
   //alert(numberattacks);
   }    
  
  }
  });
}



/////////////////////////////////////////////////
/////////////////interface///////////////////////
/////////////////////////////////////////////////

  var lright1DIV = document.createElement('div');
  var lmidlcDIV = document.getElementById('lplz1');
  
  lright1DIV.setAttribute('id','lright1');
 // rightSidebar = lmidlcDIV.parentNode.appendChild(lmidlcDIV);

  rightSidebar = lmidlcDIV.parentNode.appendChild(lright1DIV);


//attack interface 

if(Race!=4){

var  attackInterface = document.createElement("div");
attackInterface.innerHTML = '<fieldset><legend>Attack setup:</legend><table><tr><td><div id=start>' +
 '<table>'+
  '<tr><td>'+
  'Status:</td><td>' +
  '<div id=\"count\"></div>' +
  '<div id=\"err\"></div>' +
  '</td></tr><td>'+
  '<button id=\"myFarmabutton\" >swEEt jesus =)</button>' +
  '</td><td>' +
  '<div id=\"arrivalTimeDiv\"></div><div id=\"TravelTimeDiv\"></div>'+
  '</td></tr><tr><td>' +
  '<button id=\"arrivalTime\">getArrivalTime</button>'+
  '</td><td>' +
  'Lag i milli sekunder<input id=\"lag\" value=\"500">' + 
  '</td></tr>' +
  '<tr><td colspan=\"2\">' +
  '<select name=\"typeAttack\" id=\"typeAttack\">' +
  '<option value=\"3\">Attack</option>' +
  '<option value=\"2\">Raid</option>' +
  '<option value=\"4\">BackUp</option>' +
  '<option value=\"5\">Spy-Resources</option>' +
  '<option value=\"6\">Spy-ResidencePalace</option>' +
  '</select>' +
  '</td></tr>' +
  '<tr><td  colspan=\"2\">' +
  '<textarea id=\"Coordlist\" style=\"top:0px;left:850px;width:400px;height:475px;\">' +
  'paste towns in form xx,yy|'+ aLangTroops[Race][0] +','+ aLangTroops[Race][1] +','+ aLangTroops[Race][2] +','+ aLangTroops[Race][3] +','+ aLangTroops[Race][4] +','+ aLangTroops[Race][5] +','+ aLangTroops[Race][6] +','+ aLangTroops[Race][7] +','+ aLangTroops[Race][8] +','+ aLangTroops[Race][9] +','+ aLangTroops[Race][10] +',[KataTarget1],[KataTarget2]|[Somename]' +
  '</textarea>' +
  '</tr>' +
  '</table>' +
  '</td>' +
  '</tr>' +
  '</table>' 
   
  

rightSidebar.appendChild(attackInterface);


/////////////////////////////////////////////////
/////////////////Events//////////////////////////
/////////////////////////////////////////////////



var myFarmArea = document.getElementById('Coordlist');

var myimbabutton = document.getElementById('myFarmabutton');
myimbabutton.addEventListener("click", attack, true);

//var SaveButton = document.getElementById('SaveB');
//SaveButton.addEventListener("click", saveList, true);

var arrivalButton = document.getElementById('arrivalTime');
arrivalButton.addEventListener("click", getArrivalTime, true);

//var timedArrivalButton = document.getElementById('setTimeButton');
//timedArrivalButton.addEventListener("click", setArrivalTimer, true);


//document.addEventListener("keydown", function(){hotKeys(event)},true);
//document.addEventListener("keydown",hotKeys,true); 

}

/////////////////////////////////////////////////
/////////////////misc////////////////////////////
/////////////////////////////////////////////////

function saveList(){
myFarmArea.innerHTML = myFarmArea.value; 
}

function getRaceDorf1()
{
var ex = "//img[@class='unit']";
	result = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
  if (result.snapshotLength)
  {
  for(var i=1;i<result.snapshotLength;i++){
  	 src = result.snapshotItem(i).src.split("/");
  //alert(parseInt(src[6].replace(".gif","")));
  if (parseInt(src[6].replace(".gif",""))>20){
  return 2; //gaul 
  }else if(parseInt(src[6].replace(".gif",""))<21 && parseInt(src[6].replace(".gif",""))>10){
    return 1; //teutons 
      }else if(parseInt(src[6].replace(".gif",""))<11){
        return 0; //Romans
          }
  }
  }else{
return 4; 
} 
}


function getTotalUnitDorf1()
{
		var troopArray=new Array(10);
    	      troopArray[0]=0;
    	      troopArray[1]=0;
    	      troopArray[2]=0;
    	      troopArray[3]=0;
    	      troopArray[4]=0;
    	      troopArray[5]=0;
    	      troopArray[6]=0;
    	      troopArray[7]=0;
    	      troopArray[8]=0;
    	      troopArray[9]=0;
    	      troopArray[10]=0;
       var troopString;
		var ex = "id('ltrm')/table/tbody/tr[*]";
	result = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (result.snapshotLength)
{
for(var i=0;i<result.snapshotLength;i++){
	var columns = result.snapshotItem(i).getElementsByTagName("TD");
	//var troopType = columns[0].innerHTML.match(/.gif/)[1];
	var troopType = parseInt(columns[0].innerHTML.match(/(\d*).gif/)[1]);
	if(troopType)
	{
	//alert(troopType);
	var troopsNumber = parseInt(columns[1].innerHTML.match(/\d+/)[0]);
	troopArray[troopType-(Race*10)-1] = troopsNumber;
	//alert(troopArray[troopType-(Race*10)-1]);
	}
	else{
	troopArray[10]=1
	}

	//alert(troopType + ":" + troopsNumber);
}
troopString = troopArray[0]+'|'+troopArray[1]+'|'+troopArray[2]+'|'+troopArray[3]+'|'+troopArray[4]+'|'+troopArray[5]+'|'+troopArray[6]+'|'+troopArray[7]+'|'+troopArray[8]+'|'+troopArray[9]+'|'+troopArray[10];
//alert(troopString);
return troopString
}else{
      return 0;
	}
}

function errorMsg (msg)
{
errDiv = document.getElementById('err');
errDiv.innerHTML = errDiv.innerHTML +  "<br><b>ERROR:</b>" + msg;
}

function errorMsgReset()
{
errDiv = document.getElementById('err');
errDiv.innerHTML = "";
}


function getActiveDid()
{

var ex = "//a[contains(@href,'newdid')][@class='active_vl']";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

if (tag.snapshotLength)
{
		temp = tag.snapshotItem(0).href.split("?")[1].split('&');
	return temp[0];
	}else{
	errorMsg("Unable to get active village.");
  return "";
    }
}

function getValue(doc, name)
{
var ex = ".//input[@type='hidden'][@name='" + name + "']";
tag = document.evaluate( 
  	ex,
    	doc,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength)
  {
	aTag = tag.snapshotItem(0);
	return(aTag.value);
	}else{
  return 0;
  }

}

function addCount(msg)
{
countDiv = document.getElementById('count');
countDiv.innerHTML = countDiv.innerHTML + msg;
}

function setArrivalTimer()
{
getArrivalTime();
timedAttacktimer = document.getElementById('timedArrivalInput').value;
addCount("Timed arrival set at:" + timedAttacktimer); 
}

function abort()
{
setTimeout(function(){realAbort()},500);
}

function realAbort ()
{
firstRun = true;
nwave = 0;
numberattacks = 0;
totalattacks = 0;
myimbabutton.innerHTML = "Whoop some ass =)"
}

function getCheckTroops()
{
  saveList()
  check=false;
  cord = myFarmArea.innerHTML.split("\n");
 
  troops = getTotalUnitDorf1();
  code = troops.split("|");
  		var type1 = parseInt(code[0]);
		var type2 = parseInt(code[1]);
		var type3 = parseInt(code[2]);
		var type4 = parseInt(code[3]);
		var type5 = parseInt(code[4]);
		var type6 = parseInt(code[5]);
		var type7 = parseInt(code[6]);
		var type8 = parseInt(code[7]);
		var type9 = parseInt(code[8]);
		var type10 = parseInt(code[9]);
		var type11 = parseInt(code[10]);
  		
		//alert(type1+type2+type3+type4+type5);
		fillOutTemp = myFarmArea.innerHTML.split("\n");
  		
  		//alert(fillOutTemp);
  		var type = new Array(10);
  		type[0]=type1;
  		type[1]=type2;
  		type[2]=type3;
  		type[3]=type4;
  		type[4]=type5;
  		type[5]=type6;
  		type[6]=type7;
  		type[7]=type8;
  		type[8]=type9;
  		type[9]=type10;
  		
  		//alert("før " + totalTroops);
		for(i=0;i<cord.length;i++){
			fillOutTemp[i] = fillOutTemp[i].split("|");
			fillOutTemp[i][0] = fillOutTemp[i][0].split(",");
			fillOutTemp[i][1] = fillOutTemp[i][1].split(",");
			//errorMsg("før" + totalTroops + ":" + parseInt(fillOutTemp[i][1][1]));
			//troopsWave = -1;
			//errorMsg("før" + totalTroops + ":" + parseInt(fillOutTemp[i][1][0])+fillOutTemp[i][1][1]+fillOutTemp[i][1][2]+fillOutTemp[i][1][3]+fillOutTemp[i][1][4]));
			//parseInt(fillOutTemp[i][1][0]+fillOutTemp[i][1][1]+fillOutTemp[i][1][2]+fillOutTemp[i][1][3]+fillOutTemp[i][1][4]);
			//errorMsg("før" + totalTroops + ":" + parseInt(fillOutTemp[i][1][0]+fillOutTemp[i][1][1]+fillOutTemp[i][1][2]+fillOutTemp[i][1][3]+fillOutTemp[i][1][4]));
			if(parseInt(fillOutTemp[i][1][0])>0)
			{
				type[0] = type[0] - parseInt(fillOutTemp[i][1][0]);
			}
			if(parseInt(fillOutTemp[i][1][1])>0){
				type[1] = type[1] - parseInt(fillOutTemp[i][1][1]);
			}
			if(parseInt(fillOutTemp[i][1][2])>0){
				type[2] = type[2] - parseInt(fillOutTemp[i][1][2]);
			}
			if(parseInt(fillOutTemp[i][1][3])>0){
				type[3] = type[3] - parseInt(fillOutTemp[i][1][3]);
			}
			if(parseInt(fillOutTemp[i][1][4])>0){
				type[4] = type[4] - parseInt(fillOutTemp[i][1][4]);
			}
			if(parseInt(fillOutTemp[i][1][5])>0){
				type[5] = type[5] - parseInt(fillOutTemp[i][1][5]);
			}
			if(parseInt(fillOutTemp[i][1][6])>0){
				type[6] = type[6] - parseInt(fillOutTemp[i][1][6]);
			}
			if(parseInt(fillOutTemp[i][1][7])>0){
				type[7] = type[7] - parseInt(fillOutTemp[i][1][7]);
			}
			if(parseInt(fillOutTemp[i][1][8])>0){
				type[8] = type[8] - parseInt(fillOutTemp[i][1][8]);
			}
			if(parseInt(fillOutTemp[i][1][9])>0){
				type[9] = type[9] - parseInt(fillOutTemp[i][1][9]);
			}
			if(parseInt(fillOutTemp[i][1][10])>0){
				type[10] = type[10] - parseInt(fillOutTemp[i][1][10]);
			}
			
			//totalTroops = totalTroops-(parseInt(fillOutTemp[i][1][0])+parseInt(fillOutTemp[i][1][1])+parseInt(fillOutTemp[i][1][2])+parseInt(fillOutTemp[i][1][3])+parseInt(fillOutTemp[i][1][4]));
		}
  //alert("efter " + totalTroops);
  var check=true;
  for(var j=0;j<10;j++){
  if (parseInt(type[j])<0)
  {
  errorMsg("Not Enough: " + aLangTroops[Race][j]);
  check=false;
  }
  	
  }
  if(!check){
  	abort();
  	return;
  }else{
	errorMsgReset()
	}

}


function getArrivalTime()
{
getCheckTroops()
c = document.getElementById('typeAttack').value;
var tempUrl = attackurl + '?' +DID;
var tempPostvar = 'b=1&t1='+ fillOutTemp[nwave][1][0] +'&t2='+ fillOutTemp[nwave][1][1] +'&t3='+ fillOutTemp[nwave][1][2] +'&t4='+ fillOutTemp[nwave][1][3] +'&t5='+ fillOutTemp[nwave][1][4] +'&t5='+ fillOutTemp[nwave][1][4] +'&t6='+ fillOutTemp[nwave][1][5] +'&t7='+ fillOutTemp[nwave][1][6] +'&t8='+ fillOutTemp[nwave][1][7] +'&t9='+ fillOutTemp[nwave][1][8] +'&t10='+ fillOutTemp[nwave][1][9] +'&t11='+ fillOutTemp[nwave][1][10]+'&c='+ c +'&dname=&x='+fillOutTemp[nwave][0][0]+'&y='+fillOutTemp[nwave][0][1]+'&s1=ok';


  GM_xmlhttpRequest({
    method: "POST",
    url: tempUrl,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(tempPostvar),
    onload: function(responseDetails) 
      {
	pulled = document.createElement('div');
  pulled.innerHTML = responseDetails.responseText;

  var ex = ".//span[@id='tp2']";
  var ex2 = ".//td[@width='50%']";


  
tag = document.evaluate( 
  	ex,
    	pulled,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
tag2 = document.evaluate( 
  	ex2,
    	pulled,
    	null,
    	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    	null);
if (tag.snapshotLength || tag2.snapshotLength)
  {
	document.getElementById('TravelTimeDiv').innerHTML = "Travael time " + tag2.snapshotItem(0).innerHTML;
	document.getElementById('arrivalTimeDiv').innerHTML = 'Arrive at:' + tag.snapshotItem(0).innerHTML;
	//document.getElementById('TravelTimeDiv').innerHTML = 'Travel time:' + tag2.snapshotItem(0).innerHTML;
	referenceTime = new Date().getTime();
	clearInterval(timerIntervalId);
	timerIntervalId = setInterval(function(){arrivalCounter()},1000);
    	arrivalCounter();
	errorMsgReset()
  }else{
  	errorMsg("Bad Coordinates or/and missing troops");
  }
	}
  });
}

function arrivalCounter()
{
diffTime = Math.round((new Date().getTime() - referenceTime)/1000);
if (diffTime >= 1)
{
 count2 = document.getElementById('arrivalTimeDiv').innerHTML;
 count = count2.split(':');
 hours = count[1];
 minutes = count[2];
 seconds = count[3];
seconds = parseInt(seconds,10) + parseInt(diffTime,10);
 if (seconds >= 60)
 {
 minutes++;
 seconds = seconds - 60;
 }
 if (minutes >= 60)
 {
 hours++
 minutes = minutes - 60;
 }
 if (hours >= 24)
 {
 hours = 0;
 }

 seconds = seconds.toString(); 
 minutes = minutes.toString(); 
 hours = hours.toString(); 
 seconds = seconds.replace(/\b(\d)\b/g, '0$1');
 minutes = minutes.replace(/\b(\d)\b/g, '0$1');
 hours = hours.replace(/\b(\d)\b/g, '0$1');
  
if (timedAttacktimer)
{

  tTimer = timedAttacktimer.split(':');
  if (tTimer.length == 3)
    {
    tSeconds = tTimer[2]
    tMinutes = tTimer[1]
    tHours = tTimer[0]

    //errorMsg(tSeconds + ":" + tMinutes + ':' + tHours);

    if (tHours == hours && tMinutes == minutes && tSeconds == seconds || tSeconds == seconds + 1 )
      {
      myimbabutton.click();
      timedAttacktimer = false;
    }
  }
}
document.getElementById('arrivalTimeDiv').innerHTML = 'Arrival time:' + hours + ":" + minutes + ":" + seconds;  
referenceTime = new Date().getTime();
}
}

function hotKeys (event) {

if((event.altKey==1)&&((event.shiftKey==1)&&(event.ctrlKey==0)))  //If Shift & Alt keys are pressed but Ctrl isn't
        {
            if(event.keyCode==74)                   //If j key was pressed
            {
                alert("test");
            }
        }
    
//keynum = event.which
//keychar = String.fromCharCode(keynum)
//alert(keychar);
}




   