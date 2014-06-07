// ==UserScript==
// @name           OGame Redesign: Fleet Empty Space
// @description    Adds information about the available empty cargo space in the tooltip of every fleet on the fleet movement page.
// @namespace      Vesselin
// @version        1.01
// @date           2012-05-18
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=movement*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((document.location.href.indexOf ("/game/index.php?page=movement") < 0))
		return;
	function addDots (n)
	{
		n += '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test (n))
			n = n.replace (rgx, '$1' + '.' + '$2');
		return n;
	}
	var servers = [
		["AR.OGAME.ORG", "Espacio libre",        ["Nave pequeña de carga", "Nave grande de carga", "Cazador ligero",      "Cazador pesado",        "Crucero",      "Nave de batalla",      "Colonizador",              "Reciclador",     "Bombardero",         "Destructor",   "Estrella de la muerte", "Acorazado"]],
		["BA.OGAME.ORG", "Slobodan prostor",     ["Mali transporter",      "Veliki transporter",   "Mali lovac",          "Veliki lovac",          "Krstarice",    "Borbeni brodovi",      "Kolonijalni brodovi",      "Recikler",       "Bombarder",          "Razaraci",     "Zvijezda smrti",        "Oklopna krstarica"]],
		["OGAME.COM.BR", "Espaço livre",         ["Cargueiro Pequeno",     "Cargueiro Grande",     "Caça Ligeiro",        "Caça Pesado",           "Cruzador",     "Nave de Batalha",      "Nave de Colonização",      "Reciclador",     "Bombardeiro",        "Destruidor",   "Estrela da Morte",      "Interceptor"]],
		["OGAME.CZ",     "Volné místo",          ["Malý transportér",      "Velký transportér",    "Lehký stíhač",        "Těžký stíhač",          "Křižník",      "Bitevní loď",          "Kolonizační loď",          "Recyklátor",     "Bombardér",          "Destroyer",    "Hvězda smrti",          "Bitevní křižník"]],
		["OGAME.DE",     "Freier Speicherplatz", ["Kleiner Transporter",   "Großer Transporter",   "Leichter Jäger",      "Schwerer Jäger",        "Kreuzer",      "Schlachtschiff",       "Kolonieschiff",            "Recycler",       "Bomber",             "Zerstörer",    "Todesstern",            "Schlachtkreuzer"]],
		["OGAME.DK",     "Ledig plads",          ["Lille Transporter",     "Stor Transporter",     "Lille Jæger",         "Stor Jæger",            "Krydser",      "Slagskib",             "Koloniskib",               "Recycler",       "Bomber",             "Destroyer",    "Dødsstjerne",           "Interceptor"]],
		["OGAME.COM.ES", "Espacio libre",        ["Nave pequeña de carga", "Nave grande de carga", "Cazador ligero",      "Cazador pesado",        "Crucero",      "Nave de batalla",      "Colonizador",              "Reciclador",     "Bombardero",         "Destructor",   "Estrella de la muerte", "Acorazado"]],
		["FI.OGAME.ORG", "Vapaa tila",           ["Pieni rahtialus",       "Suuri rahtialus",      "Kevyt Hävittäjä",     "Raskas Hävittäjä",      "Risteilijä",   "Taistelualus",         "Siirtokunta-alus",         "Kierrättäjä",    "Pommittaja",         "Tuhoaja",      "Kuolemantähti",         "Taisteluristeilijä"]],
		["OGAME.FR",     "Espace libre",         ["Petit transporteur",    "Grand transporteur",   "Chasseur léger",      "Chasseur lourd",        "Croiseur",     "Vaisseau de bataille", "Vaisseau de colonisation", "Recycleur",      "Bombardier",         "Destructeur",  "Étoile de la mort",     "Traqueur"]],
		["OGAME.GR",     "Ελεύθερος χώρος",      ["Μικρό Μεταγωγικό",      "Μεγάλο Μεταγωγικό",    "Ελαφρύ Μαχητικό",     "Βαρύ Μαχητικό",         "Καταδιωκτικό", "Καταδρομικό",          "Σκάφος Αποικιοποίησης",    "Ανακυκλωτες",    "Βομβαρδιστικό",      "Destroyer",    "Deathstar",             "Θωρηκτό Αναχαίτισης"]],
		["OGAME.HU",     "Szabad hely",          ["Kis szállító",          "Nagy Szállító",        "Könnyű Harcos",       "Nehéz Harcos",          "Cirkáló",      "Csatahajó",            "Kolónia hajó",             "Szemetesek",     "Bombázó",            "Romboló",      "Halálcsillag",          "Csatacirkáló"]],
		["OGAME.IT",     "Spazio libero",        ["Cargo Leggero",         "Cargo Pesante",        "Caccia Leggero",      "Caccia Pesante",        "Incrociatore", "Nave da battaglia",    "Colonizzatrice",           "Riciclatrice",   "Bombardiere",        "Corazzata",    "Morte Nera",            "Incrociatore da Battaglia"]],
		["MX.OGAME.ORG", "Espacio libre",        ["Nave pequeña de carga", "Nave grande de carga", "Cazador ligero",      "Cazador pesado",        "Crucero",      "Nave de batalla",      "Colonizador",              "Reciclador",     "Bombardero",         "Destructor",   "Estrella de la muerte", "Acorazado"]],
		["OGAME.NL",     "Vrije ruimte",         ["Klein vrachtschip",     "Groot vrachtschip",    "Licht gevechtsschip", "Zwaar gevechtsschip",   "Kruiser",      "Slagschip",            "Kolonisatieschip",         "Recycler",       "Bommenwerper",       "Vernietiger",  "Ster des Doods",        "Interceptor"]],
		["OGAME.NO",     "Ledig plass",          ["Lite Lasteskip",        "Stort Lasteskip",      "Lett Jeger",          "Tung Jeger",            "Krysser",      "Slagskip",             "Koloni Skip",              "Resirkulerer",   "Bomber",             "Destroyer",    "Døds Stjerne",          "Slagkrysser"]],
		["OGAME.PL",     "Wolne miejsce",        ["Mały transporter",      "Duży transporter",     "Lekki myśliwiec",     "Ciężki myśliwiec",      "Krążownik",    "Okręt wojenny",        "Kolonizator",              "Recykler",       "Bombowiec",          "Niszczyciel",  "Gwiazda śmierci",       "Pancernik"]],
		["OGAME.COM.PT", "Espaço livre",         ["Cargueiro Pequeno",     "Cargueiro Grande",     "Caça Ligeiro",        "Caça Pesado",           "Cruzador",     "Nave de Batalha",      "Nave de Colonização",      "Reciclador",     "Bombardeiro",        "Destruidor",   "Estrela da Morte",      "Interceptor"]],
		["OGAME.RO",     "Spaţiu liber",         ["Transportor mic",       "Transportor mare",     "Vanator usor",        "Vanator greu",          "Crucisator",   "Nava de razboi",       "Nava de colonizare",       "Reciclator",     "Bombardier",         "Distrugator",  "RIP",                   "Interceptor"]],
		["OGAME.RU",     "Свободно",             ["Малый транспорт",       "Большой транспорт",    "Лёгкий истребитель",  "Тяжёлый истребитель",   "Крейсер",      "Линкор",               "Колонизатор",              "Переработчик",   "Бомбардировщик",     "Уничтожитель", "Звезда смерти",         "Линейный крейсер"]],
		["OGAME.SE",     "Fritt utrymme",        ["Litet transportskepp",  "Stort transportskepp", "Litet jaktskepp",     "Stort jaktskepp",       "Kryssare",     "Slagskepp",            "Koloniskepp",              "Återvinnare",    "Bombare",            "Flaggskepp",   "Dödsstjärna",           "Jagare"]],
		["OGAME.SI",     "Empty",                ["Majhna tovorna ladja",  "Velika tovorna ladja", "Lahek lovec",         "Težki lovec",           "Križarka",     "Bojna ladja",          "Kolonizacijska ladja",     "Recikler",       "Bombnik",            "Unièevalec",   "Zvezda smrti",          "Bojna križarka"]],
		["OGAME.SK",     "Voľné miesto",         ["Malý transportér",      "Veľký transportér",    "Ľahký stíhač",        "Ťažký stíhač",          "Krížnik",      "Bojová loď",           "Kolonizačná loď",          "Recyklátor",     "Bombardér",          "Devastátor",   "Hviezda smrti",         "Bojový krížnik"]],
		["TR.OGAME.ORG", "Boş alan",             ["Küçük Nakliye",         "Büyük Nakliye",        "Hafif Avcı",          "Ağır Avcı",             "Kruvazör",     "Komuta Gemisi",        "Koloni Gemisi",            "Geri Dönüşümcü", "Bombardıman Gemisi", "Muhrip",       "Ölüm Yıldızı",          "Firkateyn"]],
		["OGAME.US",     "Available space",      ["Small Cargo",           "Large Cargo",          "Light Fighter",       "Heavy Fighter",         "Cruiser",      "Battleship",           "Colony Ship",              "Recycler",       "Bomber",             "Destroyer",    "Deathstar",             "Battlecruiser"]],
		["OGAME.ORG",    "Available space",      ["Small Cargo",           "Large Cargo",          "Light Fighter",       "Heavy Fighter",         "Cruiser",      "Battleship",           "Colony Ship",              "Recycler",       "Bomber",             "Destroyer",    "Deathstar",             "Battlecruiser"]]
	];
	// SC, LC, LF, HF, CR, BS, CS, RC, BM, DR, DS, BC
	var shipCargoes = [5000, 25000, 50, 100, 800, 1500, 7500, 20000, 500, 2000, 1000000, 750];
	var shipNames = new Array ();
	var locaFreeSpace;
	var found = false;
	var server = document.location.href.split (/\//) [2];
	var universe = server.split (/\./) [0];
	server = server.replace (universe + ".", "").toUpperCase ();
	for (var i = 0; i < servers.length; i++)
		if (server.indexOf (servers [i] [0]) >= 0)
		{
			locaFreeSpace = servers [i] [1];
			shipNames     = servers [i] [2];
			found = true;
			break;
		}
	if (! found)
		return;	// Unsupported server language
	var fleets = document.querySelectorAll ("table.fleetinfo");
	if ((fleets == null) || (fleets.length <= 0))
		return;
	var fleet, i, shipsInfo, shipName, shipNumber, cargoUsed, cargoTotal, emptySpace, myTds, myTr, myTd;
	for (var fleet = 0; fleet < fleets.length; fleet++)
	{
		shipsInfo = fleets [fleet].getElementsByTagName ("tr");
		if (shipsInfo == null)
			continue;
		if (shipsInfo.length < 7)
			continue;
		cargoUsed = 0;
		for (i = shipsInfo.length - 3; i < shipsInfo.length; i++)
		{
			myTds = shipsInfo [i].getElementsByTagName ("td");
			if ((myTds != null) && (myTds.length >= 2) && (myTds [1].className == "value"))
				cargoUsed += parseInt (myTds [1].textContent.replace (/\D+/g, ""));
		}
		cargoTotal = 0;
		for (var i = 1; i < shipsInfo.length - 5; i++)
		{
			myTds = shipsInfo [i].getElementsByTagName ("td");
			if ((myTds == null) && (myTds.length < 2) && (myTds [1].className != "value"))
				continue;
			var shipName   = myTds [0].textContent.replace (/:$/, "");
			var shipNumber = parseInt (myTds [1].textContent.replace (/\D+/g, ""));
			found = false;
			for (j = 0; j < shipNames.length; j++)
				if (shipName == shipNames [j])
				{
					found = true;
					break;
				}
			if (! found)
				continue;	// Unrecognized ship name or a ship that doesn't have cargo space
			cargoTotal += shipCargoes [j] * shipNumber;
		}
		emptySpace = cargoTotal - cargoUsed;
		myTr = document.createElement ("tr");
		myTd = document.createElement ("td");
		myTd.appendChild (document.createTextNode (locaFreeSpace + ":"));
		myTr.appendChild (myTd);
		myTd = document.createElement ("td");
		myTd.className = "value";
		myTd.style.color = "lime"
		myTd.appendChild (document.createTextNode (addDots (emptySpace)));
		myTr.appendChild (myTd);
		myTr.id = "freeSpace";
		fleets [fleet].getElementsByTagName ("tbody") [0].appendChild (myTr);
	}
}
) ();
