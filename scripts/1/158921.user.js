// ==UserScript==
// @name        Beschwerdensystem
// @namespace   PaveLow45
// @include     *cp.rpg-city.de/*
// @version     1
// ==/UserScript==

/* Timeban Zeiten */
// 30		- 30 Minuten
// 60		- 1 Stunde
// 120		- 2 Stunden
// 360		- 6 Stunden
// 720		- 12 Stunden
// 1440 	- 1 Tag
// 2880 	- 2 Tage
// 4320 	- 3 Tage
// 10080 	- 1 Woche
// 20160 	- 2 Wochen
// 30240 	- 3 Wochen
// 40320 	- 4 Wochen
// Beispiel: Timeban:10080 
/* --------------------- */

document.getElementsByTagName("a")[2].href.search(/ticket=(.*)/);
var ticket = RegExp.$1;
var checkInterval;

var SankBinder = 1;

if(document.URL.search(/funktion=_beschwerden_admin_ansicht/) != -1)
{
	var info = document.getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[1].innerHTML.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "");
	info.search(/, ([^ ]+) gegen ([^ ]+\n)/);
	var p2 = RegExp.$1;
	var p1 = RegExp.$2;
	p2 = p2.replace(/\s*/g, "");
	p1 = p1.replace(/\s*/g, "");
	document.getElementsByTagName("b")[1].innerHTML.search(/Fall (.*) vom (.*).(.*).(.*) (.*):(.*),/);
	Fall = RegExp.$1;
		
	var Beschwerden = [
		["Sanktionen", "", ""],
		["_________________________", "", ""],
		["", "", ""],
		["Mangelnde Beweise", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Die Beweise reichen nicht aus. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Abgeschlossen", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Es wurde eine außergerichtliche Einigung getroffen. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Spieler bereits gesperrt", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Der Spieler wurde bereits permanent gesperrt. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Kein Regelverstoß", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Der Angeklagte hat sich nicht strafbar gemacht. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Gegenseitigkeit", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Bei diesem Fall handelt es sich um Gegenseitigkeit. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Sanktion bereits erteilt", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert.\nNach dem Grundgesetz kann eine Person nicht für die selbe Tat mehrfach bestraft werden.\n Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Beschwerden gegen Beamten", "", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert.\n Dienstaufsichtsbeschwerden gegen Beamte werden im Forum erstattet.\nIm Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" Wird in allen Anklagepunkten freigesprochen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"], 
		["_________________________", "", ""],
		["", "", ""], 
		["Sinnlos DM", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Sinnlos DM mit Level 1", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["DM in No DM Zone", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["DM auf No DM Fraktion", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["DM auf/als Dienstleistene", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Spawnkill", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Carsurfing DM", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Knast DM", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["GF - Angriff (Unbeteiligt)", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Absichtliches Anfahren/Totparken", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Jobstörung (Dienstleistene)", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Interior Flucht", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["_________________________", "", ""],
		["", "", ""],
		["Spam", "Mute:60", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- einen Chatverbot von 60 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Umgangston", "Mute:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- einen Chatverbot von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Werbechat Abuse", "Mute:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- einen Chatverbot von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Leichte Beleidigung", "Mute:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- einen Chatverbot von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Mittlere Beleidigung", "Timeban:1440 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- einen Chatverbot von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Schwere Beleidigung", "Timeban:10080 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine temporäre Accountsperre von 7 Tagen. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Schwere Beleidigung unter Level 3", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Beleidigung ggü. Administration", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["_________________________", "", ""],
		["", "", ""],
		["Buguse", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["C Bug", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["G Bug", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["F8 Bug", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Detektiv Bug", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Slide Bug", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Drive By auf Motorrad (Ohne Fahrer)", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Animationsabbruch", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["_________________________", "", ""],
		["", "", ""],
		["Cargodmode", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Godmode", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Healhack", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Teleporthack", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Speedhack", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Airbreak", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Flyhack", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Waffenhack", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],		
		["Aimbot", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["_________________________", "", ""],
		["", "", ""],
		["Vertragsbruch", "Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["KFZ-Betrug", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Betrug", "Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Accountverwarnung.\n- Schaden wird erstattet. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Erpressung", "Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Ausnutzung der Fraktionsrechte", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["_________________________", "", ""],
		["", "", ""],
		["Falschaussage", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Unrealistisches Verhalten", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Geldwäsche", "Ban", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine permanente Accountsperre. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Rufmord", "Timeban:1440", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine temporäre Accountsperre von 24 Stunden. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Rotorkill", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Herausreden", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Carschieben", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Eventstörung", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Offline Flucht", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["ESC/Desktop Flucht", "Prison:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Service Ausnutzung", "Mute:120", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- einen Chatverbot von 120 Minuten. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
		["Aufdecken von Hitmen/SWAT", "Prison:120 Warn", "Sehr geehrte Damen und Herren, \ndas hohe Gericht hat sich dato versammelt um den Fall "+Fall+" zu verhandeln. \n\nNach einhergehender Beweisaufnahme wurde für heute die Urteilsverkündung terminiert. Im Namen des Volkes ergeht folgendes Urteil: Der Angeklagte "+p1+" erhält somit nach gültigem Gestzbuch: \n\n- eine Freiheitsstrafe von 120 Minuten und eine Accountverwarnung. \n \nGegen dieses Urteil kann innerhalb von 7 Tagen das Rechtsmittel der Revision eingelegt werden. \nFür heute ist die Verhandlung geschlossen. \n \nMit freundlichen Grüßen, \nPaveLow45"],
	];
	var select;
	
	select = document.createElement("select");
	var option;
	for(var i=0;i<Beschwerden.length;i++)
	{
	  option = document.createElement("option");
	  option.innerHTML = Beschwerden[i][0];
	  option.value = Beschwerden[i][2];
	  select.appendChild(option);
	}
	select.setAttribute("onchange", "document.getElementsByName('beschreibung')[0].value = this.getElementsByTagName('option')[this.selectedIndex].value;");
	document.getElementsByName("cld")[0].insertBefore(select, document.getElementsByName("cld")[0].getElementsByTagName("input")[0]);
	var btn = document.createElement("input");
	btn.type = "button";
	btn.setAttribute("class", "button");
	btn.setAttribute("style", "margin-left:10px;margin-right:10px;font-size:9px;");
	btn.addEventListener("click", sanktionieren);
	btn.value = "Sanktionieren";
	document.getElementsByName("cld")[0].insertBefore(btn, document.getElementsByName("cld")[0].getElementsByTagName("input")[0]);
	toggle("Answer");
	if(localStorage.getItem("started") != null)
	{
		checkInterval = setInterval(function(){if(localStorage.getItem("started") == null) {clearInterval(checkInterval);location.href = location.href;}}, 100);
	}
}

if(document.URL.search(/_admin_beschwerden/) != -1)
{
	var count = 0;
	var acount = 0;
	for(var i=0;i<document.getElementsByTagName("div").length;i++)
	{
		if(document.getElementsByTagName("div")[i].innerHTML.replace(/<[^>]*>/g, "") == "Wartet auf Admin")
		{
			count++;
		}
		else if(document.getElementsByTagName("div")[i].innerHTML.replace(/<[^>]*>/g, "") == "Wartet auf Head Admin")
		{
			acount++;
		}
	}
	if(acount == "0")
	{
		if(count == "0")
		{
			document.getElementsByTagName("h1")[0].innerHTML = "Es sind zur Zeit keine Beschwerden vorhanden.";
		}
		else
		{
			document.getElementsByTagName("h1")[0].innerHTML = "Aktuell sind "+count+" Admin Beschwerden offen und "+acount+" Head Admin Beschwerden.";
		}
	}
	else
	{
		document.getElementsByTagName("h1")[0].innerHTML = "Aktuell sind "+count+" Admin Beschwerden offen und "+acount+" Head Admin Beschwerden.";
	}
}

function sanktionieren(e)
{
	if(document.getElementsByClassName("infobar")[1].parentNode.getElementsByTagName("img")[4].title == "Online")
	{
		document.getElementsByTagName("b")[1].innerHTML.search(/Fall (.*) vom (.*).(.*).(.*) (.*):(.*),/);
		Fall = RegExp.$1;
		if(Beschwerden[select.selectedIndex][1] == "Warn")
		{
			befehl = "/warn "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
		}
		if(Beschwerden[select.selectedIndex][1] == "Prison:120")
		{
			befehl = "/prison "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 120 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
		}
		if(Beschwerden[select.selectedIndex][1] == "Prison:120 Warn")
		{
			befehl = "/prison "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 120 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			befehl2 = "/warn "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
			alert(befehl2)
		}
		if(Beschwerden[select.selectedIndex][1] == "Mute:60")
		{
			befehl = "/mute "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 120 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
		}
		if(Beschwerden[select.selectedIndex][1] == "Mute:120")
		{
			befehl = "/mute "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 120 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)	
		}
		if(Beschwerden[select.selectedIndex][1] == "Ban")
		{
			befehl = "/ban "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
		}
		if(Beschwerden[select.selectedIndex][1] == "Timeban:1440")
		{
			befehl = "/tban "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 24 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
		}
		if(Beschwerden[select.selectedIndex][1] == "Timeban:1440 Warn")
		{
			befehl = "/tban "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 24 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			befehl = "/warn "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
			alert(befehl2)
		}
		if(Beschwerden[select.selectedIndex][1] == "Timeban:10080 Warn")
		{
			befehl = "/tban "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" 168 "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			befehl = "/warn "+document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML+" "+Beschwerden[select.selectedIndex][0]+" - Fall "+Fall+"";
			alert(befehl)
			alert(befehl2)
		}
		
		document.getElementsByTagName("form")[0].submit();
		return;
	}
	if(document.getElementsByClassName("infobar")[1].parentNode.getElementsByTagName("img")[5].title.search(", permanent") != -1)
	{
		alert("Der Spieler ist bereits gesperrt");
		return;
	}
	var sanktionen = Beschwerden[select.selectedIndex][1].split(" ");
	localStorage.setItem("sanktionen", JSON.stringify(sanktionen));
	localStorage.setItem("url", location.href);
	localStorage.setItem("reason", Beschwerden[select.selectedIndex][0]);
	document.URL.search(/id=(\d+)/);
	localStorage.setItem("id", RegExp.$1);
	
	localStorage.setItem("user", document.getElementsByClassName("infobar")[1].getElementsByTagName("b")[0].innerHTML);
	
	localStorage.setItem("started", "");
	
	window.open("http://cp.rpg-city.de/?startSanktionen", "-", "width=1,height=1");
	
	document.getElementsByTagName("form")[0].submit();
}

function nextSanktion()
{
	var sanktionen = JSON.parse(localStorage.getItem("sanktionen"));
	if(sanktionen.length == 0)
	{
		localStorage.removeItem("started");
		self.close();
	}
	
	var sanktion = sanktionen.shift();
	localStorage.setItem("sanktionen", JSON.stringify(sanktionen));
	
	
	if(sanktion == "Ban")
	{
		localStorage.setItem("time",  "0");
		location.href = "http://cp.rpg-city.de/?ticket="+ticket+"&funktion=_sperreusers&username="+localStorage.getItem("user")+"&ban";
	}
	else if(sanktion == "Warn")
	{
		location.href = "http://cp.rpg-city.de/?ticket="+ticket+"&funktion=_sanktion_erteilen&username="+localStorage.getItem("user")+"&warn";
	}
	else
	{
		sanktion = sanktion.split(":");
		localStorage.setItem("time", sanktion[1]);
		if(sanktion[0] == "Prison")
		{
			location.href = "http://cp.rpg-city.de/?ticket="+ticket+"&funktion=_sanktion_erteilen&username="+localStorage.getItem("user")+"&prison";
		}
		else if(sanktion[0] == "Timeban")
		{
			location.href = "http://cp.rpg-city.de/?ticket="+ticket+"&funktion=_sperreusers&username="+localStorage.getItem("user")+"&ban";
		}
		else if(sanktion[0] == "Mute")
		{
			location.href = "http://cp.rpg-city.de/?ticket="+ticket+"&funktion=_sanktion_erteilen&username="+localStorage.getItem("user")+"&mute";
		}
		else if(sanktion[0] == "Waffenschein")
		{
			location.href = "http://cp.rpg-city.de/?ticket="+ticket+"&funktion=_sanktion_erteilen&username="+localStorage.getItem("user")+"&waffenschein";
		}
	}
}

if(document.URL.search(/cp.rpg-city.de.*startSanktionen$/) != -1)
{
	nextSanktion();
}

if(document.URL.search(/funktion=_sanktion_erteilen.*&prison$/) != -1)
{
	if(localStorage.getItem("done") == null)
	{
		document.getElementById("Prison").checked = true;
		var option = document.createElement("option");
		option.value = localStorage.getItem("time");
		option.selected = true;
		document.getElementById("dauer").appendChild(option);
		document.getElementsByName("reason")[0].value = localStorage.getItem("reason")+" - Fall "+localStorage.getItem("id");
		localStorage.setItem("done", "");
		document.getElementsByName("sanktion")[0].submit();
	}
	else
	{
		localStorage.removeItem("done");
		nextSanktion();
	}
}
if(document.URL.search(/funktion=_sanktion_erteilen.*&waffenschein$/) != -1)
{
	if(localStorage.getItem("done") == null)
	{
		document.getElementById("Waffenschein").checked = true;
		var option = document.createElement("option");
		option.value = localStorage.getItem("time");
		option.selected = true;
		document.getElementById("dauer").appendChild(option);
		document.getElementsByName("reason")[0].value = localStorage.getItem("reason")+" - Fall "+localStorage.getItem("id");
		localStorage.setItem("done", "");
		document.getElementsByName("sanktion")[0].submit();
	}
	else
	{
		localStorage.removeItem("done");
		nextSanktion();
	}
}
if(document.URL.search(/funktion=_sanktion_erteilen.*&mute$/) != -1)
{
	if(localStorage.getItem("done") == null)
	{
		document.getElementById("Mute").checked = true;
		var option = document.createElement("option");
		option.value = localStorage.getItem("time");
		option.selected = true;
		document.getElementById("dauer").appendChild(option);
		document.getElementsByName("reason")[0].value = localStorage.getItem("reason")+" - Fall "+localStorage.getItem("id");
		localStorage.setItem("done", "");
		document.getElementsByName("sanktion")[0].submit();
	}
	else
	{
		localStorage.removeItem("done");
		nextSanktion();
	}
}
if(document.URL.search(/funktion=_sanktion_erteilen.*&warn$/) != -1)
{
	if(localStorage.getItem("done") == null)
	{
		document.getElementById("Verwarnung").checked = true;
		document.getElementsByName("reason")[0].value = localStorage.getItem("reason")+" - Fall "+localStorage.getItem("id");
		localStorage.setItem("done", "");
		document.getElementsByName("sanktion")[0].submit();
	}
	else
	{
		localStorage.removeItem("done");
		nextSanktion();
	}
}
if(document.URL.search(/funktion=_sperreusers.*&ban$/) != -1)
{
	if(localStorage.getItem("done") == null)
	{
		document.getElementsByName("grund")[0].value = localStorage.getItem("reason")+" - Fall "+localStorage.getItem("id");
		var option = document.createElement("option");
		option.value = localStorage.getItem("time");
		option.selected = true;
		document.getElementById("dauer").appendChild(option);
		localStorage.setItem("done", "");
		document.getElementsByTagName("form")[0].submit();
	}
	else
	{
		localStorage.removeItem("done");
		nextSanktion();
	}
}
if(document.URL.search(/funktion=_user_akte/) != -1)
{
	var u = 0; 
	for(var i=0;i<document.getElementsByTagName("p").length;i++)
	{
		document.getElementsByTagName("p")[i].getElementsByTagName("a")[0].setAttribute("onclick", "return false;");
		document.getElementsByTagName("p")[i].getElementsByTagName("a")[0].addEventListener("click", removeEntry, false);
		
		document.getElementsByTagName("p")[i].innerHTML.search(/\[(.*)\]/);
		var prison = RegExp.$1;
		
		var jetzt = new Date();
		var monat = jetzt.getMonth()+1;

		if(prison == "Prison")
		{
			document.getElementsByTagName("p")[i].innerHTML.search("(.*).2013");
			var datum = RegExp.$1;
			
			datum.search(/.*.(.+)/);
			var d1 = RegExp.$1;
			if(d1 == monat)
			{
				u++;
			}
		}
	}
	if(u > 2)
	{
		alert("Es sind in diesem Monat mehr als 3 Prison Einträge verzeichnet.");
	}
}

function removeEntry(e)
{
	var url = e.target.parentNode.href;
	
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);
}