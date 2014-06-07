// ==UserScript==
// @name           Veselata Ferma
// @namespace     http://userscripts.org/scripts/show/113912
// @description    Veselata Ferma
// @date           25-09-2011
// @include        http://s*.myfreefarm.*/main.php*
// @include        http://s*.wolnifarmerzy.pl/main.php*
// @include        http://s*.enkicsitanyam.hu/main.php*
// @include        http://s*.tr.myfreefarm.com/main.php*
// @include        http://s*.veselaferma.com/main.php*
// @include        http://s*.veselaferma.com/main.php*
// @include        http://s*.myfreefarm.*/hilfe.php*
// @include        http://s*.wolnifarmerzy.pl/hilfe.php*
// @include        http://s*.enkicsitanyam.hu/hilfe.php*
// @include        http://s*.tr.myfreefarm.com/hilfe.php*
// @include        http://s*.veselaferma.com/hilfe.php*
// @include        http://s*.myfreefarm.*/dbfehler.php*
// @include        http://s*.wolnifarmerzy.pl/dbfehler.php*
// @include        http://s*.enkicsitanyam.hu/dbfehler.php*
// @include        http://s*.tr.myfreefarm.com/dbfehler.php*
// @include        http://s*.veselaferma.com/dbfehler.php*
// @include        http://s*.myfreefarm.*/wartung.php*
// @include        http://s*.wolnifarmerzy.pl/wartung.php*
// @include        http://s*.enkicsitanyam.hu/wartung.php*
// @include        http://s*.tr.myfreefarm.com/wartung.php*
// @include        http://s*.veselaferma.com/wartung.php*
// ==/UserScript==

window.addEventListener("load",function(){

	function $(ID){return document.getElementById(ID);}
	function getRandom( min, max ){
		if ( min > max ){return( -1 );	}
		if ( min == max ){return( min );}
	        return( min + parseInt( Math.random() * ( max-min+1 ),10 ) );
	}

	// Umlaute
	var ae = "\u00E4";	var oe = "\u00F6";	var ue = "\u00FC";
	var Ae = "\u00C4";	var Oe = "\u00D6";	var Ue = "\u00DC";
	var sz = "\u00DF";

	//Multilingual
	var texte = new Object();
	texte["hilfe"] = new Object();
	if (document.location.href.search("veselaferma.com")!=-1){
		var lng = "bu";
		var gamepage = ".veselaferma.com";
		var reg = /http:\/\/s(.*?)\.veselaferma\.com\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)veselaferma\.com\/(.*)/i;
		var delimThou = ".";
		var regDelimThou = /\./g;
		var delimDeci = ",";
	} else if (document.location.href.search("myfreefarm.co.uk")!=-1){
		var lng = "uk";
		var gamepage = ".myfreefarm.co.uk";
		var reg = /http:\/\/s(.*?)\.myfreefarm\.co\.uk\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)myfreefarm\.co\.uk\/(.*)/i;
		var delimThou = ",";
		var regDelimThou = /,/g;
		var delimDeci = ".";
		// Umstellung seit 01.06.
		var help = GM_listValues();
		for (var v=0;v<help.length;v++){
			if (help[v].search("co.uk")==0) {
				GM_setValue(help[v].replace("co.",""),GM_getValue(help[v]));
				GM_deleteValue(help[v]);
			}
		} 
	} else if (document.location.href.search("myfreefarm.de")!=-1){
		var lng = "de";
		var gamepage = ".myfreefarm.de";
		var reg = /http:\/\/s(.*?)\.myfreefarm\.de\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)myfreefarm\.de\/(.*)/i;
		var delimThou = ".";
		var regDelimThou = /\./g;
		var delimDeci = ",";
	} else if (document.location.href.search("enkicsitanyam.hu")!=-1){
		var lng = "hu";
		var gamepage = ".enkicsitanyam.hu";
		var reg = /http:\/\/s(.*?)\.enkicsitanyam\.hu\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)enkicsitanyam\.hu\/(.*)/i;
		var delimThou = ".";
		var regDelimThou = /\./g;
		var delimDeci = ",";
	} else if (document.location.href.search("myfreefarm.nl")!=-1){
		var lng = "nl";
		var gamepage = ".myfreefarm.nl";
		var reg = /http:\/\/s(.*?)\.myfreefarm\.nl\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)myfreefarm\.nl\/(.*)/i;
		var delimThou = ".";
		var regDelimThou = /\./g;
		var delimDeci = ",";
	} else if (document.location.href.search("wolnifarmerzy.pl")!=-1){
		var lng = "pl";
		var gamepage = ".wolnifarmerzy.pl";
		var reg = /http:\/\/s(.*?)\.wolnifarmerzy\.pl\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)wolnifarmerzy\.pl\/(.*)/i;
		var delimThou = ".";
		var regDelimThou = /\./g;
		var delimDeci = ",";
	} else if (document.location.href.search("tr.myfreefarm.com")!=-1){
		var lng = "tr";
		var gamepage = ".tr.myfreefarm.com";
		var reg = /http:\/\/s(.*?)\.tr\.myfreefarm\.com\/(.*?)\.php(.*)/i;
		var reg2 = /http:\/\/(.*)\.tr\.myfreefarm\.com\/(.*)/i;
		var delimThou = ".";
		var regDelimThou = /\./g;
		var delimDeci = ",";
	}

	function loadLanguage(lang){
		switch (lang){
			case "bu": {
			texte["automat"] = "Automaton";
			texte["pflanze"] = "Planting...";
			texte["warte"] = "Waiting...";
			texte["giesse"] = "Watering...";
			texte["fuettere"] = "Feeding...";
			texte["pflanzautomat"] = "Seedingmachine";
			texte["futterautomat"] = "Feedingmachine...";
			texte["fabrikautomat"] = "Factorymachine...";
			texte["fertig"] = "FINISHED";
			texte["botStart"] = "Start Bot";
			texte["botStop"] = "Stop Bot";
			texte["doWork"] = "Zone is done by bot";
			texte["dontWork"] = "Zone is ignored by bot";
			texte["automatOptionen"] = "Automat-Options";
			texte["msgUpdate"] = "There is a new script version of the automaton. Install?";
			texte["set1"] = "Shall the planting machine be displayed?";
			texte["set2"] = "Shall the feeding machine be displayed?";
			texte["set3"] = "Minimal clicking delay of the automaton";
			texte["set4"] = "Maximal clicking delay of the automaton";
			texte["set5"] = "Minimal waiting delay of the automaton";
			texte["set6"] = "Maximal waiting delay of the automaton";
			texte["set7"] = "How shall your chickens be fed?";
			texte["set8"] = "How shall your cows be fed?";
			texte["set9"] = "How shall your sheep be fed?";
			texte["set10"] = "How shall your bees be fed?";
			texte["set11b"] = "Use queue for the fields.";
			texte["set11c"] = "Use one general planting button for all fields.";
			texte["set12a"] = "Delete \n all queue\n data";
			texte["set12b"] = "Delete Completed.";
			texte["set13"] = "Allow dragging the queue box";
			texte["set14a"] = "Delete \n all position \ninformation";
			texte["set14b"] = "Delete Completed.";
			texte["set15"] = "Show calculated product ready time in the queue.";
			texte["satt"] = "full";
			texte["futter1a"] = "Grain";
			texte["futter1b"] = "Corn";
			texte["futter2a"] = "Clover";
			texte["futter2b"] = "Rape";
			texte["futter3a"] = "Fodder beet";
			texte["futter3b"] = "Herbs";
			texte["futter4a"] = "Sunflowers";
			texte["futter4b"] = "Cornflowers";
			texte["Quelist"] = "Planting queue"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "Add product"; //Add product
			texte["QueAddText"] = "Click to add a product to the list."; //Add product
			texte["QueAddAboveText"] = "Click to add a product to the list above this product";
			texte["QueDeleteText"] = "Delete this product from the list.";
			texte["QueClose"] = "Close this menu";
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["QueUpButton"] = "Move Up";
			texte["QueDownButton"] = "Move Down";			
			texte["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
			texte["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
			texte["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
			texte["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
			texte["rotate"] = "Rotate: place first entry after the last entry";
			texte["stop"] = "STOP";
			texte["heute"] = "Today";
			texte["day1"] = "Tomorrow";
			texte["day2"] = "";
			texte["uhr"] = "hour";
			texte["autoPflanzeOn"] = "Used farm fields:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
			//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
			//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
			texte["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
			texte["QueStop0"] = "The automatic culturing process will be stopped";
			texte["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
			texte["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
			texte["QueRepeat"] = "The queue is repeated after all product are cultured.";
			texte["QueShuffle"] = "The queue is radomly cultured .";
			texte["QueRepeatShuffle"] = "The queue is randomly cultured after completion the queue is repeated.";
			texte["QueFieldInRow1"] = "This field with %PRODNAME% is %FLDFROM% in row.";
			texte["QueFieldInRowX"] = "This field with %PRODNAME% is %FLDFROM% to %FLDTO% in row.";
			texte["QueFieldInRowInf"] = "This field with %PRODNAME% is %FLDFROM% in row and will be cultured infinitely";
			texte["QueFieldMake1"] = "In total there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldMakeX"] = "In total there will be %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldToGo1"] = "there is %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueFieldToGoX"] = "there are %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
			texte["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
			texte["QueRoundMake1"] = "Each turn there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMakeX"] = "Each turn there are %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMade1"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundMadeX"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundToGo1"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueRoundToGoX"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueTime1"] = "The %PRODNAME% field needs %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% this %PRODNAME% is ready.";
			texte["QueTimeX"] = "The %PRODNAME% fields need %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% these %PRODTOGO% %PRODNAME% are ready.";
			texte["hilfe"]["First"] = "1111<br>aaaa<br>bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb";
			texte["hilfe"]["Second"] = "2222";
			break;}
			case "uk": {
			texte["automat"] = "Automaton";
			texte["pflanze"] = "Planting...";
			texte["warte"] = "Waiting...";
			texte["giesse"] = "Watering...";
			texte["fuettere"] = "Feeding...";
			texte["pflanzautomat"] = "Seedingmachine";
			texte["futterautomat"] = "Feedingmachine...";
			texte["fabrikautomat"] = "Factorymachine...";
			texte["fertig"] = "FINISHED";
			texte["botStart"] = "Start Bot";
			texte["botStop"] = "Stop Bot";
			texte["doWork"] = "Zone is done by bot";
			texte["dontWork"] = "Zone is ignored by bot";
			texte["automatOptionen"] = "Automaton-Options";
			texte["msgUpdate"] = "There is a new script version of the automaton. Install?";
			texte["set1"] = "Shall the planting machine be displayed?";
			texte["set2"] = "Shall the feeding machine be displayed?";
			texte["set3"] = "Minimal clicking delay of the automaton";
			texte["set4"] = "Maximal clicking delay of the automaton";
			texte["set5"] = "Minimal waiting delay of the automaton";
			texte["set6"] = "Maximal waiting delay of the automaton";
			texte["set7"] = "How shall your chickens be fed?";
			texte["set8"] = "How shall your cows be fed?";
			texte["set9"] = "How shall your sheep be fed?";
			texte["set10"] = "How shall your bees be fed?";
			texte["set11b"] = "Use queue for the fields.";
			texte["set11c"] = "Use one general planting button for all fields.";
			texte["set12a"] = "Delete \n all queue\n data";
			texte["set12b"] = "Delete Completed.";
			texte["set13"] = "Allow dragging the queue box";
			texte["set14a"] = "Delete \n all position \ninformation";
			texte["set14b"] = "Delete Completed.";
			texte["set15"] = "Show calculated product ready time in the queue.";
			texte["satt"] = "full";
			texte["futter1a"] = "Grain";
			texte["futter1b"] = "Corn";
			texte["futter2a"] = "Clover";
			texte["futter2b"] = "Rape";
			texte["futter3a"] = "Fodder beet";
			texte["futter3b"] = "Herbs";
			texte["futter4a"] = "Sunflowers";
			texte["futter4b"] = "Cornflowers";
			texte["Quelist"] = "Planting queue"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "Add product"; //Add product
			texte["QueAddText"] = "Click to add a product to the list."; //Add product
			texte["QueAddAboveText"] = "Click to add a product to the list above this product";
			texte["QueDeleteText"] = "Delete this product from the list.";
			texte["QueClose"] = "Close this menu";
			texte["QueCLoseAll"] = "Close all open Queue windows.";
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["QueUpButton"] = "Move Up";
			texte["QueDownButton"] = "Move Down";			
			texte["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
			texte["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
			texte["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
			texte["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
			texte["rotate"] = "Rotate: place first entry after the last entry";
			texte["stop"] = "STOP";
			texte["heute"] = "Today";
			texte["day1"] = "Tomorrow";
			texte["day2"] = "";
			texte["uhr"] = "hour";
			texte["autoPflanzeOn"] = "Used farm fields:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
			//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
			//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
			texte["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
			texte["QueStop0"] = "The automatic culturing process will be stopped";
			texte["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
			texte["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
			texte["QueRepeat"] = "The queue is repeated after all product are cultured.";
			texte["QueShuffle"] = "The queue is radomly cultured .";
			texte["QueRepeatShuffle"] = "The queue is randomly cultured after completion the queue is repeated.";
			texte["QueFieldInRow1"] = "This field with %PRODNAME% is %FLDFROM% in row.";
			texte["QueFieldInRowX"] = "This field with %PRODNAME% is %FLDFROM% to %FLDTO% in row.";
			texte["QueFieldInRowInf"] = "This field with %PRODNAME% is %FLDFROM% in row and will be cultured infinitely";
			texte["QueFieldMake1"] = "In total there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldMakeX"] = "In total there will be %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldToGo1"] = "there is %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueFieldToGoX"] = "there are %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
			texte["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
			texte["QueRoundMake1"] = "Each turn there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMakeX"] = "Each turn there are %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMade1"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundMadeX"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundToGo1"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueRoundToGoX"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueTime1"] = "The %PRODNAME% field needs %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% this %PRODNAME% is ready.";
			texte["QueTimeX"] = "The %PRODNAME% fields need %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% these %PRODTOGO% %PRODNAME% are ready.";
			texte["hilfe"][0] = "This script can be used to add automation to the cultivation process.";
			texte["hilfe"]["How does it work!"] ="If at the bottom of the screen next to the Automaton-Options button the checkbox is checked the automation process will be started.";
			texte["hilfe"]["Field"] = "At the bottom of every garden an icon is displayed. If the icon shows this sleeping farmer <div class=\"v66\" style=\"display:inline-block;\">&nbsp;</div> then the automation process is stopped or will be stopped at the next culture moment. There will not be any culturing for this garden until you select an other product. When a product icon is displayed this product is cultured next in the garden.";
			texte["hilfe"]["General List"] = "If in the option menu the general checkbox is checked a product icon will apear above the farm. This will serve all gardens on the your farms. If the queue option is enabled it wil apply to this icon too.";
			texte["hilfe"]["Queue"] = "If in the option menu the queue check box is checked, clicking the product culturing icon in a garden will display a queue where multiple products can be queued.";
			texte["hilfe"]["Repeat"] = " Enabling the \"Repeat\" check box will enable the \"loop\" feature of the queue.";
			texte["hilfe"]["Shuffle"] = " Enabling the \"Shuffle\" check box will random culture a product from the list";
			texte["hilfe"]["Dragging"] = "By checking the check box \"Allow dragging\" the queue boxes can be dragged bij clicking the title and moving the mouse.";
			texte["hilfe"]["Stables and factories"] = "At the bottom of every stable or factory an icon is display. If the icon shows this sleeping farmer <div class=\"v66\" style=\"display:inline-block;\">&nbsp;</div> then the automation process is stopped or will be stopped at the next culture moment. When a product is displayed this will be the produced product for this stable of factory.";
			break;}
			case "de": {
			texte["automat"] = "Automat";
			texte["pflanze"] = "Pflanze...";
			texte["warte"] = "Warte...";
			texte["giesse"] = "Gie"+sz+"e...";
			texte["fuettere"] = "F"+ue+"ttere...";
			texte["pflanzautomat"] = "Pflanzautomat";
			texte["futterautomat"] = "Futterautomat...";
			texte["fabrikautomat"] = "Fabrikautomat...";
			texte["fertig"] = "FERTIG";
			texte["botStart"] = "Bot starten";
			texte["botStop"] = "Bot stoppen";
			texte["doWork"] = "Zone wird vom Bot bearbeitet";
			texte["dontWork"] = "Zone wird vom Bot ignoriert";
			texte["automatOptionen"] = "Automat-Optionen";
			texte["msgUpdate"] = "Es liegt eine neue Script-Version des Automaten vor. Diese installieren?";
			texte["set1"] = "Soll der Pflanz-Automat angezeigt werden?";
			texte["set2"] = "Soll der Futter-Automat angezeigt werden?";
			texte["set3"] = "Minimale Klickzeit der Automaten";
			texte["set4"] = "Maximale Klickzeit der Automaten";
			texte["set5"] = "Minimale Wartezeiten der Automaten";
			texte["set6"] = "Maximale Wartezeiten der Automaten";
			texte["set7"] = "Wie sollen deine H"+ue+"hner gef"+ue+"ttert werden?";
			texte["set8"] = "Wie sollen deine K"+ue+"he gef"+ue+"ttert werden?";
			texte["set9"] = "Wie sollen deine Schafe gef"+ue+"ttert werden?";
			texte["set10"] = "Wie sollen deine Bienen gef"+ue+"ttert werden?";
			texte["set11b"] = "Benutze Queue-Listen f"+ue+"r die "+Ae+"cker";
			texte["set11c"] = "Benutze einen einzigen Knopf f"+ue+"r alle "+Ae+"cker";
			texte["set11c"] = "Benutze einen einzigen Knopf f"+ue+"r alle "+Ae+"cker";
			texte["set12a"] = "L"+oe+"sche \n alle Queue\n Daten";
			texte["set12b"] = "Gel"+oe+"scht.";
			texte["set13"] = "Bewegen der Queue-List erlauben";
			texte["set14a"] = "L"+oe+"sche \n alle Positions- \n informationen";
			texte["set14b"] = "Gel"+oe+"scht.";
			texte["set15"] = "Zeige berechnete Zeiten in der Queue-Liste.";
			texte["satt"] = "satt";
			texte["futter1a"] = "Getreide";
			texte["futter1b"] = "Mais";
			texte["futter2a"] = "Klee";
			texte["futter2b"] = "Raps";
			texte["futter3a"] = "Futterr"+ue+"ben";
			texte["futter3b"] = "Kr"+ae+"uter";
			texte["futter4a"] = "Sonnenblumen";
			texte["futter4b"] = "Kornblumen";
			texte["Quelist"] = "Pflanz-Liste %GARDENNR%"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "+ Pflanze"; //Add product
			texte["QueAddText"] = "Eine weitere Pflanze an die Liste anh"+ae+"ngen"; //Add product
			texte["QueAddAboveText"] = "Eine weitere Pflanze in die Liste schieben";
			texte["QueDeleteText"] = "Diese Pflanze l"+oe+"schen";
			texte["QueClose"] = "Men"+ue+" schlie"+sz+"en";
			texte["QueCLoseAll"] = "Alle ge"+oe+"ffneten Queue-Fenster schlie"+sz+"en";
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["QueUpButton"] = "Move Up";
			texte["QueDownButton"] = "Move Down";			
			texte["repeat_on"] = "Wiederholung AN";
			texte["repeat_off"] = "Wiederholung AUS";
			texte["shuffle_on"] = "Zufall AN";
			texte["shuffle_off"] = "Zufall AUS";
			texte["rotate"] = "Rotieren";
			texte["stop"] = "STOPP";
			texte["heute"] = "Heute";
			texte["day1"] = "Morgen";
			texte["day2"] = Ue+"bermorgen";
			texte["uhr"] = "Uhr";
			texte["autoPflanzeOn"] = "Benutzte Felder:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
			//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
			//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
			texte["QueueStoped"] = "Diese %PRODNAME% werden nicht gepflanzt, da vorher gestoppt wird.";
			texte["QueStop0"] = "Das automatische Pflanzen wird gestoppt.";
			texte["QueStop1"] = "Nach Pflanzen von %FLDFROM% Feld wird gestoppt.";
			texte["QueStopX"] = "Nach Pflanzen von %FLDFROM% Feldern wird gestoppt.";
			texte["QueRepeat"] = "Die Liste wird wiederholt, wenn alle Produkte gepflanzt wurden.";
			texte["QueShuffle"] = "Die Liste wird zuf"+ae+"llig abgearbeitet.";
			texte["QueRepeatShuffle"] = "Die Liste wird zuf"+ae+"llig abgearbeitet und dann wiederholt.";
			texte["QueFieldInRow1"] = "%PRODNAME% ist an %FLDFROM%. Stelle.";
			texte["QueFieldInRowX"] = "%PRODNAME% ist an %FLDFROM%. bis %FLDTO%. Stelle.";
			texte["QueFieldInRowInf"] = "%PRODNAME% ist an %FLDFROM%. Stelle und wird unbegrenzt gepflanzt.";
			texte["QueFieldMake1"] = "Total wird %PRODMAKE% %PRODNAME% (%SCOREMAKE% punkte) erzeugt.";
			texte["QueFieldMakeX"] = "Total werden %PRODMAKE% %PRODNAME% (%SCOREMAKE% punkte) erzeugt.";
			texte["QueFieldToGo1"] = "Noch %PRODTOGO% %PRODNAME% (%SCORETOGO% punkte).";
			texte["QueFieldToGoX"] = "Noch %PRODTOGO% %PRODNAME% (%SCORETOGO% punkte).";
			texte["QueRoundDone1"] = "%PRODNAME% ist diese Runde bereits gepflanzt <br/>und wird erneut geplanzt.";
			texte["QueRoundDoneX"] = "%PRODNAME% sind diese Runde bereits gepflanzt <br/>und werden erneut geplanzt.";
			texte["QueRoundMake1"] = "Jede Runde wird %PRODMAKE% %PRODNAME% (%SCOREMAKE% punkte) erzeugt.";
			texte["QueRoundMakeX"] = "Jede Runde werden %PRODMAKE% %PRODNAME% (%SCOREMAKE% punkte) erzeugt.";
			texte["QueRoundMade1"] = "Erledigt: %PRODMADE% %PRODNAME% (%SCOREMADE% punkte).";
			texte["QueRoundMadeX"] = "Erledigt: %PRODMADE% %PRODNAME% (%SCOREMADE% punkte).";
			texte["QueRoundToGo1"] = "Noch: %PRODTOGO% %PRODNAME% (%SCORETOGO% punkte).";
			texte["QueRoundToGoX"] = "Noch: %PRODTOGO% %PRODNAME% (%SCORETOGO% punkte).";
			texte["QueTime1"] = "Ein Feld %PRODNAME% braucht %TIMETHIS%, <br/>%DATEREADY% um %TIMEREADY% ist %PRODNAME% fertig.";
			texte["QueTimeX"] = "Die %PRODNAME%-Felder brauchen %TIMETHIS%, <br/>%DATEREADY% um %TIMEREADY% sind %PRODTOGO% %PRODNAME% erzeugt.";
			texte["hilfe"]["First"] = "1111<br>aaaa<br>bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb";
			texte["hilfe"]["Second"] = "2222";
			break;}
			case "hu": {
			var hu_A = "\u00C1";
			var hu_a = "\u00E1";
			var hu_E = "\u00C9";
			var hu_e = "\u00E9";
			var hu_i = "\u00ED";
			var hu_O_dots = "\u00D6";
			var hu_o = "\u00F3";
			var hu_o_double = "\u0151";
			var hu_o_dots = "\u00F6";
			var hu_U = "\u00DA";
			var hu_U_dots = "\u00DC";
			var hu_u = "\u00FA";
			var hu_u_double = "\u0171";
			var hu_u_dots = "\u00FC";
			texte["automat"] = "Automata";
			texte["pflanze"] = hu_u_dots+"ltet"+hu_e+"s...";
			texte["warte"] = "V"+hu_a+"rakoz"+hu_a+"s...";
			texte["giesse"] = hu_O_dots+"nt"+hu_o_dots+"z"+hu_e+"s...";
			texte["fuettere"] = "Etet"+hu_e+"s...";
			texte["pflanzautomat"] = "Seedingmachine";
			texte["futterautomat"] = "Etetomasina...";
			texte["fabrikautomat"] = "Gy"+hu_a+"rt"+hu_o+"masina...";
			texte["fertig"] = "BEFEJEZVE";
			texte["botStart"] = "Start Bot";
			texte["botStop"] = "Stop Bot";
			texte["doWork"] = "Zone is done by bot";
			texte["dontWork"] = "Zone is ignored by bot";
			texte["automatOptionen"] = "Automata be"+hu_a+"ll"+hu_i+"t"+hu_a+"sok";
			texte["msgUpdate"] = hu_U+"j verzi"+hu_o+" "+hu_e+"rheto el a MFF Automat"+hu_a+"b"+hu_o+"l. Telep"+hu_i+"ted?";
			texte["set1"] = "Szeretn"+hu_e+"d megjelen"+hu_i+"teni az "+hu_u_dots+"ltetomasin"+hu_a+"t?";
			texte["set2"] = "Szeretn"+hu_e+"d megjelen"+hu_i+"teni az etetomasin"+hu_a+"t?";
			texte["set3"] = "Minim"+hu_a+"lis klikkel"+hu_e+"sek k"+hu_o_dots+"z"+hu_o_dots+"tti ido";
			texte["set4"] = "Maxim"+hu_a+"lis klikkel"+hu_e+"sek k"+hu_o_dots+"z"+hu_o_dots+"tti ido";
			texte["set5"] = "Minim"+hu_a+"lis v"+hu_a+"rakoz"+hu_a+"si ido az eszk"+hu_o_dots+"z v"+hu_a+"lt"+hu_a+"sok k"+hu_o_dots+"z"+hu_o_dots+"tt";
			texte["set6"] = "Maxim"+hu_a+"lis v"+hu_a+"rakoz"+hu_a+"si ido az eszk"+hu_o_dots+"z v"+hu_a+"lt"+hu_a+"sok k"+hu_o_dots+"z"+hu_o_dots+"tt";
			texte["set7"] = "Hogyan etess"+hu_u_dots+"k a ty"+hu_u+"kokat?";
			texte["set8"] = "Hogyan etess"+hu_u_dots+"k a teheneket?";
			texte["set9"] = "Hogyan etess"+hu_u_dots+"k a birk"+hu_a+"kat?";
			texte["set10"] = "Hogyan etess"+hu_u_dots+"k a m"+hu_e+"heket?";
			texte["set11b"] = "Use queue for the fields.";
			texte["set11c"] = "Use one general planting button for all fields.";
			texte["set12a"] = "Delete \n all queue\n data";
			texte["set12b"] = "Delete Completed.";
			texte["set13"] = "Allow dragging the queue box";
			texte["set14a"] = "Delete \n all position \ninformation";
			texte["set14b"] = "Delete Completed.";
			texte["set15"] = "Show calculated product ready time in the queue.";
			texte["satt"] = "tele";
			texte["futter1a"] = "B"+hu_u+"za";
			texte["futter1b"] = "Kukorica";
			texte["futter2a"] = "Lucerna";
			texte["futter2b"] = "Repce";
			texte["futter3a"] = "Takarm"+hu_a+"nyr"+hu_e+"pa";
			texte["futter3b"] = "Fu";
			texte["futter4a"] = "Napraforg"+hu_o;
			texte["futter4b"] = "B"+hu_u+"zavir"+hu_a+"g";
			texte["Quelist"] = "Planting queue"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "Add product"; //Add product
			texte["QueAddText"] = "Click to add a product to the list."; //Add product
			texte["QueAddAboveText"] = "Click to add a product to the list above this product";
			texte["QueDeleteText"] = "Delete this product from the list.";
			texte["QueClose"] = "Close this menu";
			texte["QueCLoseAll"] = "Close all open Queue windows.";
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["QueUpButton"] = "Move Up";
			texte["QueDownButton"] = "Move Down";			
			texte["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
			texte["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
			texte["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
			texte["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
			texte["rotate"] = "Rotate: place first entry after the last entry";
			texte["stop"] = "STOP";
			texte["heute"] = "Today";
			texte["day1"] = "Tomorrow";
			texte["day2"] = "";
			texte["uhr"] = "hour";
			texte["autoPflanzeOn"] = "Used farm fields:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
			//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
			//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
			texte["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
			texte["QueStop0"] = "The automatic culturing process will be stopped";
			texte["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
			texte["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
			texte["QueRepeat"] = "The queue is repeated after all product are cultured.";
			texte["QueShuffle"] = "The queue is radomly cultured .";
			texte["QueRepeatShuffle"] = "The queue is randomly cultured after completion the queue is repeated.";
			texte["QueFieldInRow1"] = "This field with %PRODNAME% is %FLDFROM% in row.";
			texte["QueFieldInRowX"] = "This field with %PRODNAME% is %FLDFROM% to %FLDTO% in row.";
			texte["QueFieldInRowInf"] = "This field with %PRODNAME% is %FLDFROM% in row and will be cultured infinitely";
			texte["QueFieldMake1"] = "In total there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldMakeX"] = "In total there will be %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldToGo1"] = "there is %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueFieldToGoX"] = "there are %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
			texte["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
			texte["QueRoundMake1"] = "Each turn there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMakeX"] = "Each turn there are %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMade1"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundMadeX"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundToGo1"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueRoundToGoX"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueTime1"] = "The %PRODNAME% field needs %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% this %PRODNAME% is ready.";
			texte["QueTimeX"] = "The %PRODNAME% fields need %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% these %PRODTOGO% %PRODNAME% are ready.";
			texte["hilfe"]["First"] = "1111<br>aaaa<br>bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb";
			texte["hilfe"]["Second"] = "2222";
			break;}
			case "nl": { // translation thanks to terrorsource and DrBOB101 and Jan-Hans
			texte["automat"] = "Automaat";
			texte["pflanze"] = "Planten...";
			texte["warte"] = "Wachten...";
			texte["giesse"] = "Water geven...";
			texte["fuettere"] = "Voeren...";
			texte["pflanzautomat"] = "Plant machine";
			texte["futterautomat"] = "Voeder machine...";
			texte["fabrikautomat"] = "Fabriek machine...";
			texte["fertig"] = "KLAAR";
			texte["botStart"] = "Start de Bot";
			texte["botStop"] = "Stop de Bot";
			texte["doWork"] = "Veld wordt automatisch onderhouden";
			texte["dontWork"] = "Veld wordt overgeslagen. Handmatig onderhoud is nodig";
			texte["automatOptionen"] = "Automaat-Opties";
			texte["msgUpdate"] = "Er is een nieuwe versie van de Automaat beschikbaar. Deze nu installeren?";
			texte["set1"] = "Moet de plantmachine getoond worden?";
			texte["set2"] = "Moet de voedermachine getoond worden?";
			texte["set3"] = "Minimale klik vertraging van de automaat";
			texte["set4"] = "Maximale klik vertraging van de automaat";
			texte["set5"] = "Minimale wachttijd van de automaat";
			texte["set6"] = "Maximale wachttijd van de automaat";
			texte["set7"] = "Hoe moeten de kippen gevoed worden?";
			texte["set8"] = "Hoe moeten de koeien gevoed worden?";
			texte["set9"] = "Hoe moeten de schapen gevoed worden?";
			texte["set10"] = "Hoe moeten de bijen gevoed worden?";
			texte["set11b"] = "Gebruik een wachtrij voor alle velden.";
			texte["set11c"] = "Gebruik een algemene knop voor alle velden";
			texte["set12a"] = "Verwijder \n alle wachtrij \n gegevens";
			texte["set12b"] = "Verwijderen Voltooid.";
			texte["set13"] = "Sta het slepen van het wachtrij venster toe.";
			texte["set14a"] = "Verwijder \n alle positie \ngegevens";
			texte["set14b"] = "Verwijderen Voltooid.";
			texte["set15"] = "Laat berekende oogst tijden in de wachtrij zien.";
			texte["satt"] = "Volledig";
			texte["futter1a"] = "Graan";
			texte["futter1b"] = "Mais";
			texte["futter2a"] = "Klaver";
			texte["futter2b"] = "Koolzaad";
			texte["futter3a"] = "Knollen";
			texte["futter3b"] = "Kruiden";
			texte["futter4a"] = "Zonnebloemen";
			texte["futter4b"] = "Korenbloemen";
			texte["Quelist"] = "Wachtrij %GARDENNR%"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "Toevoegen"; //Add product
			texte["QueAddText"] = "Klik hier om een product toe te voegen aan de lijst."; //Add product
			texte["QueAddAboveText"] = "Klik hier om een product boven dit product toe te voegen aan de lijst.";
			texte["QueDeleteText"] = "Verwijder dit product van de lijst.";
			texte["QueClose"] = "Sluit deze lijst";
			texte["QueCLoseAll"] = "Sluit alle open wachtrij vensters.";
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["QueUpButton"] = "Verplaats omhoog";
			texte["QueDownButton"] = "Verplaats omlaag";
			texte["repeat_on"] = "Herhaal lijst is AAN, klik om uit te zetten.";
			texte["repeat_off"] = "Herhaal lijst is UIT, klik om aan te zetten.";
			texte["shuffle_on"] = "Shuffle lijst is AAN, klik om uit te zetten.";
			texte["shuffle_off"] = "Shuffle lijst is UIT, klik om aan te zetten.";
			texte["rotate"] = "Draaien: plaats bovenste item onderaan lijst.";
			texte["stop"] = "STOP";
			texte["heute"] = "Vandaag";
			texte["day1"] = "Morgen";
			texte["day2"] = "Overmorgen";
			texte["uhr"] = "uur";
			texte["autoPflanzeOn"] = "Gebruikte velden:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
			//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
			//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
			texte["QueueStoped"] = "Er is een kweek stop toegvoegd deze %PRODNAME% worden niet gekweekt";
			texte["QueStop0"] = "Het automatishe produceren wordt gestopt.";
			texte["QueStop1"] = "Na %FLDFROM% veld wordt het automatishe kweken gestopt.";
			texte["QueStopX"] = "Na %FLDFROM% velden wordt het automatishe kweken gestopt.";
			texte["QueRepeat"] = "De wachtrij wordt herhaald als alle product in de rij zijn gekweekt.";
			texte["QueShuffle"] = "De wachtrij wordt in willekeurige volgorde geweekt.";
			texte["QueRepeatShuffle"] = "De wachtrij wordt in willekeurige volgorde geweekt en <br>herhaald als alle product in de wachtrij zijn gekweekt.";
			texte["QueFieldInRow1"] = "Dit veld met %PRODNAME% is %FLDFROM% in rij.";
			texte["QueFieldInRowX"] = "Dit veld met %PRODNAME% is %FLDFROM% t/m %FLDTO% in rij.";
			texte["QueFieldInRowInf"] = "Dit veld %PRODNAME% is %FLDFROM% in rij en zal blijvend worden verbouwd.";
			texte["QueFieldMake1"] = "In totaal wordt er %PRODMAKE% %PRODNAME% (%SCOREMAKE% punten) gekweekt ";
			texte["QueFieldMakeX"] = "In totaal worden er %PRODMAKE% %PRODNAME% (%SCOREMAKE% punten) gekweekt ";
			texte["QueFieldToGo1"] = "er is nog %PRODTOGO% %PRODNAME% (%SCORETOGO% punten) te gaan.";
			texte["QueFieldToGoX"] = "zijn nog %PRODTOGO% %PRODNAME% (%SCORETOGO% punten) te gaan.";
			texte["QueRoundDone1"] = "Dit veld %PRODNAME% is al gekweekt en wordt pas de volgende rond weer gekweekt.";
			texte["QueRoundDoneX"] = "De velden %PRODNAME% zijn al gekweekt en wordt pas de volgende rond weer gekweekt.";
			texte["QueRoundMake1"] = "Elke ronde zal er %PRODMAKE% %PRODNAME% (%SCOREMAKE% punten) worden gekweekt. ";
			texte["QueRoundMakeX"] = "Elke ronde zullen er %PRODMAKE% %PRODNAME% (%SCOREMAKE% punten) worden gekweekt. ";
			texte["QueRoundMade1"] = "Gedaan: %PRODMADE% %PRODNAME% (%SCOREMADE% punten).";
			texte["QueRoundMadeX"] = "Gedaan: %PRODMADE% %PRODNAME% (%SCOREMADE% punten).";
			texte["QueRoundToGo1"] = "Nog te gaan: %PRODTOGO% %PRODNAME% (%SCORETOGO% punten).";
			texte["QueRoundToGoX"] = "Nog te gaan: %PRODTOGO% %PRODNAME% (%SCORETOGO% punten).";
			texte["QueTime1"] = "Het duurt %TIMETHIS% om dit veld te kweken, <br>%DATEREADY% om %TIMEREADY% zijn deze %PRODTOGO% %PRODNAME% klaar.";
			texte["QueTimeX"] = "Het duurt %TIMETHIS% om deze velden te kweken, <br>%DATEREADY% om %TIMEREADY% zijn deze %PRODTOGO% %PRODNAME% klaar.";
			texte["hilfe"][0] = "Dit script kan worden gebruikt automatisering toe te voegen aan het cultivering proces.";
			texte["hilfe"]["Hoe werkt het!"] ="Als aan de onderkant van het scherm naast de Automaat-Opties knop the selectievakje wordt aangevinkt zal het automatiseringsproces worden gestart.";
			texte["hilfe"]["Tuin"] = "Bij elke tuin wordt rechts onder een icoon afgebeeld. Als het icoon er als uitziet als een slapende boer <div class=\"v66\" style=\"display:inline-block;\">&nbsp;</div> dan is het automatiseringsproces gestopt of wordt gestopt bij het volgende zaai moment. Er zullen daarna geen producten worden verbouwd totdat een ander product wordt geselecteerd. Als er een product icoon wordt afgebeeld zal deze als volgende worden geproduceerd in deze tuin.";
			texte["hilfe"]["Algemene kweek"] = "Bij het aanvinken van optie algemene icoon voor alle velden zal er boven de boerderij een icoon worden getoond. Hier kan het product voor alle velden worden ingesteld. De wachrij functie werkt ook op dit icoon.";
			texte["hilfe"]["Wachrij"] = "Als in het Automaat-Opties menu de optie zone wachtrij is aangevinkt zal er bij het aanklikken van een product icoon, bij een tuin, een wachtrij lijst worden getoond.";
			texte["hilfe"]["Repeat"] = "Als de \"Repeat\"-functie wordt aangevinkt zal de lijst steeds weer worden herhaalt.";
			texte["hilfe"]["Shuffle"] = "Bij het aanvinken van de \"Shuffle\"-functie zal de lijst willekeurig worden doorlopen.";
			texte["hilfe"]["Slepen"] = "Als in het Automaat-Opties menu de optie \"sta slepen wachrij venster toe\" is aangevinkt is het mogelijk om het wachtrij venster te verplaatsen. Dit kan door op de titel te klikken en de muis te verschuiven.";
			texte["hilfe"]["Stallen en fabrieken"] ="Bij elke stal of fabriek wordt rechtsonder een icoon afgebeeld. Als het icoon er als uitziet als een slapende boer <div class=\"v66\" style=\"display:inline-block;\">&nbsp;</div> dan is het automatiseringsproces gestopt of wordt gestopt bij het volgende zaai moment. Als er een product wordt afgebeeld zal dit product worden geproduceerd in deze stal of fabriek.";
			break;}
			case "pl": { // translation thanks to bonizaur
			var pl_a = "\u0105";
			var pl_c = "\u0107";
			var pl_e = "\u0119";
			var pl_l = "\u0142";
			var pl_n = "\u0144";
			var pl_o = "\u00F3";
			var pl_s = "\u015B";
			var pl_S = "\u015A";
			var pl_z = "\u017C";
			texte["automat"] = "Automat";
			texte["pflanze"] = "Wysiewanie...";
			texte["warte"] = "Oczekiwanie...";
			texte["giesse"] = "Podlewanie...";
			texte["fuettere"] = "Karmienie...";
			texte["pflanzautomat"] = "AutoZasiewy...";
			texte["futterautomat"] = "AutoKarmienie...";
			texte["fabrikautomat"] = "AutoProdukcja...";
			texte["fertig"] = "GOTOWE";
			texte["botStart"] = "Startuj Bota";
			texte["botStop"] = "Zatrzymaj Bota";
			texte["doWork"] = "Pole obs"+pl_l+"ugiwane przez bota";
			texte["dontWork"] = "Pole ignorowane przez bota";
			texte["automatOptionen"] = "Opcje Automatu";
			texte["msgUpdate"] = "Jest nowa wersja skryptu automatyzacji. Zainstalowa"+pl_c+"?";
			texte["set1"] = "Czy wy"+pl_s+"wietla"+pl_c+" ikony automatyzacji siewu?";
			texte["set2"] = "Czy wy"+pl_s+"wietla"+pl_c+" ikony automatyzacji karmienia?";
			texte["set3"] = "Minimalna zw"+pl_l+"oka dla automatyzacji siewu";
			texte["set4"] = "Maksymalna zw"+pl_l+"oka dla automatyzacji siewu";
			texte["set5"] = "Minimalny czas oczekiwania mi"+pl_e+"dzy operacjami";
			texte["set6"] = "Maksymalny czas oczekiwania mi"+pl_e+"dzy operacjami";
			texte["set7"] = "Jak maj"+pl_a+" by"+pl_c+" karmione kury?";
			texte["set8"] = "Jak maj"+pl_a+" by"+pl_c+" karmione krowy?";
			texte["set9"] = "Jak maj"+pl_a+" by"+pl_c+" karmione owce?";
			texte["set10"] = "Jak maj"+pl_a+" by"+pl_c+" karmione pszczo"+pl_l+"y?";
			texte["set11b"] = "U"+pl_z+"yj listy zasiew"+pl_o+"w dla p"+pl_o+"l.";
			texte["set11c"] = "U"+pl_z+"yj jednego planu zasiew"+pl_o+"w dla wszystkich p"+pl_o+"l.";
			texte["set12a"] = "Usu"+pl_n+" listy zasiew"+pl_o+"w";
			texte["set12b"] = "Usuwanie zako"+pl_n+"czone.";
			texte["set13"] = "Pozw"+pl_o+"l na przemieszczanie listy zasiew"+pl_o+"w";
			texte["set14a"] = "Ustaw listy zasiew"+pl_o+"w na miejscach";
			texte["set14b"] = "Ustawianie zako"+pl_n+"czone.";
			texte["set15"] = "Poka"+pl_z+" skalkuowany czas zbior"+pl_o+"w na li"+pl_s+"cie.";
			texte["satt"] = "Ca"+pl_l+"kowicie";
			texte["futter1a"] = "Zbo"+pl_z+"e";
			texte["futter1b"] = "Kukurydza";
			texte["futter2a"] = "Koniczyna";
			texte["futter2b"] = "Rzepak";
			texte["futter3a"] = "Burak pastewny";
			texte["futter3b"] = "Zio"+pl_l+"a";
			texte["futter4a"] = "S"+pl_l+"onecznik";
			texte["futter4b"] = "B"+pl_l+"awatki";
			texte["Quelist"] = "Lista zasiew"+pl_o+"w"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "Dodaj produkt"; //Add product
			texte["QueAddText"] = "Kliknij aby doda"+pl_c+" produkt do listy."; //Add product
			texte["QueAddAboveText"] = "Kliknij aby doda"+pl_c+" produkt do listy przed t"+pl_a+" pozycj"+pl_a+".";
			texte["QueDeleteText"] = "Usu"+pl_n+" ten produkt z listy.";
			texte["QueClose"] = "Zamknij to menu";
			texte["QueCLoseAll"] = "Zamknij wszystkie otwarte listy zasiew"+pl_o+"w."
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["repeat_on"] = "Zap"+pl_e+"tlenie listy: TAK, kliknij aby wy"+pl_l+pl_a+"czy"+pl_c+".";
			texte["repeat_off"] = "Zap"+pl_e+"tlenie listy: NIE, kliknij aby w"+pl_l+pl_a+"czy"+pl_c+".";
			texte["shuffle_on"] = "Losowe zasiewy: TAK, kliknij aby wy"+pl_l+pl_a+"czy"+pl_c+".";
			texte["shuffle_off"] = "Losowe zasiewy: NIE, kliknij aby w"+pl_l+pl_a+"czy"+pl_c+".";
			texte["rotate"] = "Rotacja: przesu"+pl_n+" towary o jedn"+pl_a+" pozycj"+pl_e+" (pierwszy na koniec)"
			texte["stop"] = "STOP";
			texte["heute"] = "Dzisiaj";
			texte["day1"] = "Jutro";
			texte["day2"] = "Pojutrze";
			texte["uhr"] = "godz.";
			texte["autoPflanzeOn"] = "U"+pl_z+"yte miejsca na polu:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
			//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
			//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
			texte["QueueStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie b"+pl_e+"dzie dalej siany.";
			texte["QueStop0"] = "Proces automatycznych zasiew"+pl_o+"w zostanie zatrzymany.";
			texte["QueStop1"] = "Po obsianiu %FLDFROM%  pola proces automatycznych zasiew"+pl_o+"w zostanie zatrzymany.";
			texte["QueStopX"] = "Po obsianiu %FLDFROM% p"+pl_o+"l proces automatycznych zasiew"+pl_o+"w zostanie zatrzymany.";
			texte["QueRepeat"] = "Lista zostanie powt"+pl_o+"rzona po zebraniu wszystkich ro"+pl_s+"lin.";
			texte["QueShuffle"] = "Ro"+pl_s+"liny siane jest losowo.";
			texte["QueRepeatShuffle"] = "Ro"+pl_s+"sliny b"+pl_e+"d"+pl_a+" losowo wysiewane po zako"+pl_n+"czeniu bie"+pl_z+pl_a+"cej listy";
			texte["QueFieldInRow1"] = "Na tym polu %PRODNAME% jest na %FLDFROM% pozycji.<br/>";
			texte["QueFieldInRowX"] = "Na tym polu %PRODNAME% zajmuje pozycje %FLDFROM% do %FLDTO%.<br/>";
			texte["QueFieldInRowInf"] = "Na tym polu %PRODNAME% jest na %FLDFROM% pozycji i b"+pl_e+"dzie siany w niesko"+pl_n+"czono"+pl_s+pl_c;
			texte["QueFieldMake1"] = "Og"+pl_o+pl_l+"em zebrane zostanie %PRODMAKE% szt. %PRODNAME% ";
			texte["QueFieldMakeX"] = "Og"+pl_o+pl_l+"em zebrane zostanie %PRODMAKE% szt. %PRODNAME% ";
			texte["QueFieldToGo1"] = "Pozostaje %PRODTOGO% %PRODNAME% do zebrania.";
			texte["QueFieldToGoX"] = "Pozostalo %PRODTOGO% %PRODNAME% do zebrania.";
			texte["QueRoundDone1"] = "Na tym polu %PRODNAME% zosta"+pl_l+" wysiany w tej turze, <br/>w kolejnej turze b"+pl_e+"dzie wysiany ponownie.";
			texte["QueRoundDoneX"] = "Na tych polach %PRODNAME% zosta"+pl_l+"y wysiane w tej turze, <br/>w kolejnej turze b"+pl_e+"d"+pl_a+" wysiane ponownie.";
			texte["QueRoundMake1"] = "W jednej turze zebrane zostanie %PRODMAKE% %PRODNAME%. ";
			texte["QueRoundMakeX"] = "W ka"+pl_z+"dej turze zebrane zostanie %PRODMAKE% %PRODNAME%. ";
			texte["QueRoundMade1"] = "Zebrano %PRODMADE% %PRODNAME%.";
			texte["QueRoundMadeX"] = "Zebrano %PRODMADE% %PRODNAME%.";
			texte["QueRoundToGo1"] = "Do zebrania: %PRODTOGO% %PRODNAME% .";
			texte["QueRoundToGoX"] = "Do zebrania: %PRODTOGO% %PRODNAME% .";
			texte["QueTime1"] = "Na zebranie %PRODNAME% z pola potrzeba %TIMETHIS% <br/> Proces zako"+pl_n+"czy si"+pl_e+" %DATEREADY% o %TIMEREADY%.";
			texte["QueTimeX"] = "Na zebranie %PRODNAME% z p"+pl_o+"l potrzeba %TIMETHIS%<br/>Proces zako"+pl_n+"czy si"+pl_e+" %DATEREADY% o %TIMEREADY%.";
			texte["hilfe"]["First"] = "1111<br>aaaa<br>bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb";
			texte["hilfe"]["Second"] = "2222";
			break;}
			case "tr": { // translation thanks to Cilek Kocak
			var tr_g = "\u011F";
			var tr_G = "\u011E";
			var tr_s = "\u015F";
			var tr_S = "\u015E";
			var tr_c = "\u00E7";
			var tr_C = "\u00C7";
			var tr_dotless_i = "\u0131";
			var tr_dotted_I = "\u0130";
			texte["automat"] = "Otomat";
			texte["pflanze"] = "Dikiliyor...";
			texte["warte"] = "Bekleyin...";
			texte["giesse"] = "Sulan"+tr_dotless_i+"yor...";
			texte["fuettere"] = "Besleniyor...";
			texte["pflanzautomat"] = "Tohummakinesi";
			texte["futterautomat"] = "Beslememakinesi...";
			texte["fabrikautomat"] = "Fabrikamakinesi...";
			texte["fertig"] = "HAZIR";
			texte["botStart"] = "Bot'u Ba"+tr_s+"lat";
			texte["botStop"] = "Bot'u Durdur";
			texte["doWork"] = "Zone is done by bot";
			texte["dontWork"] = "Zone is ignored by bot";
			texte["automatOptionen"] = "Otomat-se"+tr_c+"enekleri";
			texte["msgUpdate"] = "Otomat beti"+tr_g+"inin yeni versiyonu bulundu. Kurulsun mu?";
			texte["set1"] = "Hasat makinesi g"+oe+"sterilsin mi?";
			texte["set2"] = "Besleme makinesi g"+oe+"sterilsin mi?";
			texte["set3"] = "Otomat"+tr_dotless_i+"n minimum t"+tr_dotless_i+"k gecikme zaman"+tr_dotless_i;
			texte["set4"] = "Otomat"+tr_dotless_i+"n maksimum t"+tr_dotless_i+"k gecikme zaman"+tr_dotless_i;
			texte["set5"] = "Otomat"+tr_dotless_i+"n minimum bekleme zaman"+tr_dotless_i;
			texte["set6"] = "Otomat"+tr_dotless_i+"n maksimum bekleme zaman"+tr_dotless_i;
			texte["set7"] = "Tavuklar"+tr_dotless_i+"n nas"+tr_dotless_i+"l beslensin?";
			texte["set8"] = tr_dotted_I+"neklerin nas"+tr_dotless_i+"l beslensin?";
			texte["set9"] = "Koyunlar"+tr_dotless_i+"n nas"+tr_dotless_i+"l beslensin?";
			texte["set10"] = "Ar"+tr_dotless_i+"lar"+tr_dotless_i+"n nas"+tr_dotless_i+"l beslensin?";
			texte["set11b"] = "Use queue for the fields.";
			texte["set11c"] = "Use one general planting button for all fields.";
			texte["set12a"] = "Delete \n all queue\n data";
			texte["set12b"] = "Delete Completed.";
			texte["set13"] = "Allow dragging the queue box";
			texte["set14a"] = "Delete \n all position \ninformation";
			texte["set14b"] = "Delete Completed.";
			texte["set15"] = "Show calculated product ready time in the queue.";
			texte["satt"] = "tam";
			texte["futter1a"] = "Bu"+tr_g+"day";
			texte["futter1b"] = "M"+tr_dotless_i+"s"+tr_dotless_i+"r";
			texte["futter2a"] = "Yonca";
			texte["futter2b"] = "Kolza";
			texte["futter3a"] = "Yemlik Pancar";
			texte["futter3b"] = "Ye"+tr_s+"illik";
			texte["futter4a"] = "Ay"+tr_c+"i"+tr_c+"e"+tr_g+"i";
			texte["futter4b"] = "Peygamber "+tr_C+"i"+tr_c+"e"+tr_g+"i";
			texte["Quelist"] = "Planting queue"; //Que list //%GARDENNR% = gives gardenNr
			texte["QueAdd"] = "Add product"; //Add product
			texte["QueAddText"] = "Click to add a product to the list."; //Add product
			texte["QueAddAboveText"] = "Click to add a product to the list above this product";
			texte["QueDeleteText"] = "Delete this product from the list.";
			texte["QueClose"] = "Close this menu";
			texte["QueCLoseAll"] = "Close all open Queue windows.";
			texte["QueMin"] = "";
			texte["QuePlus"] = "";
			texte["QueUpButton"] = "Move Up";
			texte["QueDownButton"] = "Move Down";
			texte["repeat_on"] = "Repeat list is ON, press to turn off repeat.";
			texte["repeat_off"] = "Repeat list is OFF, press to turn on repeat.";
			texte["shuffle_on"] = "Shuffle list is ON, press to turn off shuffle.";
			texte["shuffle_off"] = "Shuffle list is OFF, press to turn on shuffle.";
			texte["rotate"] = "Rotate: place first entry after the last entry";
			texte["stop"] = "STOP";
			texte["heute"] = "Today";
			texte["day1"] = "Tomorrow";
			texte["day2"] = "";
			texte["uhr"] = "hour";
			texte["autoPflanzeOn"] = "Used farm fields:";
			//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until, %PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products
			texte["QueueStoped"] = "A culture stop is detected these %PRODNAME% will not be cultured.";
			texte["QueStop0"] = "The automatic culturing process will be stopped";
			texte["QueStop1"] = "After cultering %FLDFROM% field the automatic process will be stopped.";
			texte["QueStopX"] = "After cultering %FLDFROM% fields the automatic process will be stopped.";
			texte["QueRepeat"] = "The queue is repeated after all product are cultured.";
			texte["QueShuffle"] = "The queue is radomly cultured .";
			texte["QueRepeatShuffle"] = "The queue is randomly cultured after completion the queue is repeated.";
			texte["QueFieldInRow1"] = "This field with %PRODNAME% is %FLDFROM% in row.";
			texte["QueFieldInRowX"] = "This field with %PRODNAME% is %FLDFROM% to %FLDTO% in row.";
			texte["QueFieldInRowInf"] = "This field with %PRODNAME% is %FLDFROM% in row and will be cultured infinitely";
			texte["QueFieldMake1"] = "In total there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldMakeX"] = "In total there will be %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured ";
			texte["QueFieldToGo1"] = "there is %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueFieldToGoX"] = "there are %PRODTOGO% %PRODNAME% (%SCORETOGO% points) to go.";
			texte["QueRoundDone1"] = "This field %PRODNAME% s already cultured in this turn, <br/>next turn it will be cultured again.";
			texte["QueRoundDoneX"] = "These fields %PRODNAME% are already cultured in this turn, <br/>next turn they will be cultured again.";
			texte["QueRoundMake1"] = "Each turn there is %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMakeX"] = "Each turn there are %PRODMAKE% %PRODNAME% (%SCOREMAKE% points) cultured. ";
			texte["QueRoundMade1"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundMadeX"] = "Made %PRODMADE% %PRODNAME% (%SCOREMADE% points).";
			texte["QueRoundToGo1"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueRoundToGoX"] = "To do: %PRODTOGO% %PRODNAME% (%SCORETOGO% points).";
			texte["QueTime1"] = "The %PRODNAME% field needs %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% this %PRODNAME% is ready.";
			texte["QueTimeX"] = "The %PRODNAME% fields need %TIMETHIS% to culture, <br/>%DATEREADY% at %TIMEREADY% these %PRODTOGO% %PRODNAME% are ready.";
			texte["hilfe"]["First"] = "1111<br>aaaa<br>bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb bbbbb";
			texte["hilfe"]["Second"] = "2222";
			break;}
		}
	}
	loadLanguage(lng);

	//Icon images
	strImages = new Array();
	strImages["repeat_off"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAABoUlEQVR4nK2TQW7aQBRAfZ54wKEhEaA48djYhDiqMQdooKRpthjqdgHYSjcp66B0GYsDhB273IJUjdQcoVd4XUApVqqWViye%2Fnz90dOfmT8KoGyCjUj%2BS1T363x7evr%2BR9F0OmU0Gq1wPY%2FX8%2FzzzQ2WaWIcGiRJwjPRl4cHfK%2FGoX6AKeUSS0osaWIucKwybvWY46Mq0pD0%2B72lTHl8%2FIpjO1jSpFKpcHF%2BQdAO6LTbBCkCukGHE9flxHXxfT%2Fd0eXHS0xDYts269xRxbZ5%2B%2BYcQJlM7u6T24TZbGYoZ60zTEMSR9Faok9XV8t9Yfcde%2FldBv0BSqv1mgNd50P4fi3RKmEYUioUaTQaKNEgolQo0gmCpajb7awl7QQBpUKR01enz4vVoypCFX8VjcdjXuRy7OV36fV66WJ%2BZwctm0XTNOr1OjXPo%2Ba9xPO8JTXPw7EdhKqS286h7%2B%2BTGshms4nYUtnWNLSshhAqQl2wNUf9masCLZOlXC7%2FmqPVjobDIdmMICMEcRwTx9EirqyjOZPJXeqb%2FPb8uq7%2F8wtu7Pf%2FAH%2Fz8ulFilh2AAAAAElFTkSuQmCC';
	strImages["repeat_on"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAABqklEQVR4nK2T30uTURyHP%2Fe7ty533au79vJdEYEU0sA3V4ZdRNCFYb5jkMwNG7MmEnolJd4JzqSgCLop6jaC%2FoIEZ7%2FYVCbm6%2Bbcu6eLN96pw83Ii%2BfinO85D%2Bd8vucI0GlwKpJ%2FFr3%2FUjPPhj8y%2F7pES9HD%2BSIDqTw3kg2uj%2BXpT%2BSxRtewRtdQzwrq%2Fszd7HeaRM9e%2FeZMz1dkrqKLP1oT2fa48I1Lww2ZFt%2FtELi8jqwaikJwCAwbOmN1umJ1OmN1DBsfRT0Ct%2BDtp33TF10dL6GbLhqE8aV6092bshiE4AgAyiw42LNbLH8omQrFHXQHwtn2EkC9M66%2FLjy2jawSkcwmCqUqaAjMicqJRAcxJ7y9oYSDIrO7KA7hqbIvupLdOJHUnKqgOHRlyt6EvbxH%2BqUnCtoFdH%2BnrSi16KARByWg92n5cDFw7ydKVlEaziWLPkayiJEqYPwdBx8U0PAGSkPgkRe8Lzn%2F5Bd67KJJPNKV48lU0SR0zDQadOhEt1%2FsoWnQNPTlXPpyLlauxrWlffoPEH1eJfFmt%2FllH6Vjzm2bUcu%2F9j%2F8AfkMLDj%2BSRDIAAAAAElFTkSuQmCC';
	strImages["shuffle_off"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAAB4UlEQVR4nK2RzW4SARhF53U6%2F1YhKWVgBmYoA%2BpAcWmT2lJtrAuHtiSApRNWpcvKBNyV1I21ryArNnZDAnvfAF%2FhuDCpIQSssYu7%2BZLv5OZcARAeIg8C%2BS%2FQZnGTyXjMHSjsdAjDkDAM6XRClj2PRiP6l5f0ul3SqRRW0qTf7wMIQsJIkLZSpKwUlmlhxOP4vj8D%2FHhxgWM7JOIGpmni2A75XA43m8UyLU5OPiDs7pap%2BD4V3%2BfwfYUNO4OZNNkrlwGEer1GIpHAsW02nAyHvs%2Fb%2FX2e5vI8y%2BcpFIpMf07n63%2Fq9Uin0gyHw0Gv28OIG9hpm3qtNtMy42R4s%2Fea6XTKQtm3t98H48nkR8Z2sJIm7w4O5ty1z85mbgvFviiViMfWcbPu0gGWgqrVKtFIhNhajJuvN1x%2FuZ6DHR8dLW%2FUaDTQNZ3okwjV42MG3wZEo1G2Xm5xdfX57lmWJFz3T1vBcRw8z8PznlMsFFAkmUe6TqlYBBAa9QaaqqKpKpIoUvA83GwWTdPQVJXHq6u%2FZYsrK8iihCxKKJKMqiqUd3ZmardaLdbXYqiKgizLKIqMrmnomoYkimy%2F2kZoNpsEwSnBaUAQBH8Ve95uEwQBiiKjygrt9vni%2Be8TwzDuN%2F%2B%2F5hdpvvKVfR9GiQAAAABJRU5ErkJggg%3D%3D';
	strImages["shuffle_on"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAACXBIWXMAAAsSAAALEgHS3X78AAAB4UlEQVR4nK2Sy2sTURSHz35ci8vYhYumiBtfiDAhuKmKKMSSiiYWrGCxNH1ErJoxpPURISRgu1EEVzEmdVNBEAS7FP8DpRJMojWk1o6NSSad%2BVxMbQxNS8QuPrj3cs6Py3eOALIdbEvIfwXtcr3lyeySuh50%2Bc4n%2BiJZ%2FOEsvnCW1Juf6mbND2d0tW%2BiwNnxz0j3PHLoPQPRPICIHCvQxJGPHL6UIzNXVQF59a6u9t4uorg%2BIEfnEXfOrjuj27hzHB%2FOI3sCFvuuWewds%2BgatRAvyOkKzouLZOZM1TX0HTmhIz0m4gXnCDiuYtd5YYcfWjrqSViID4JP6%2Fgf6IinjPjgQMginLJYd%2BKDjpG%2F7q1chNMW07MGyoVlpB%2BctxoNfziVMJveNp2K40oJGTBRhtkQ0vb4u%2B8uIQEDCcJYahUt%2BWtD2Mn7pa1%2F5En8QAIryE1Qpy2mXtZQBhfZr5XQkuWGk8AKu0cXGveO8QJd2lec2gKdoSIS1JEIOGK2F8%2FUMhI2kRsVZKhEZ6iI4%2Fo3JAISMlAGv6zt0aSBRKoNonDwcbNIb7KOEgOJYtdMGvY5CnLPxB3LI%2F6ZMuczFc6la%2FQ%2Br20pNv66gj%2B9iueZicRB4tD%2Fotp6j9pl56M2x%2F%2Bv%2FAYjnimH96%2FpaAAAAABJRU5ErkJggg%3D%3D';
	strImages["rotate"] = 'data:image/gif;base64,R0lGODlhEAAPAKEAAICAgAAAAP%2F%2F%2F%2F%2F%2F%2FyH5BAEKAAIALAAAAAAQAA8AAAIrlI%2BpAOGgTnM0xAmlTS9yF21CRSGlQZrVcaKkKKqxNylBZmDhiy8U4wkiCgA7';
	strImages["minus"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK%2FINwWK6QAAAClJREFUKFNj%2FA8EDKQAkAZSAAMpisGuGcQagAEFCi28eLD7gdjgJTkeAMUo9xhLWaTjAAAAAElFTkSuQmCC';
	strImages["plus"] = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK%2FINwWK6QAAAChJREFUKFNj%2FA8EDKQAkAZSAAMuxUBLsUoNZg0gNxPC4BAdTp4mNrYBvNHfMGxUbs8AAAAASUVORK5CYII%3D';
	strImages["singleArrowUp"] ='data:image/gif;base64,R0lGODlhCQAFAJEAAP%2F%2F%2FzMzMwAAAAAAACH5BAEAAAAALAAAAAAJAAUAAAILhBGnwYrZTHx0hQIAOw%3D%3D';
	strImages["singleArrowDown"] ='data:image/gif;base64,R0lGODlhCQAFAJEAAP%2F%2F%2FzMzMwAAAAAAACH5BAEAAAAALAAAAAAJAAUAAAIMTIBosHrOXjIyMVsAADs%3D';
	
	// **************************************************
	// Umstellung seit 12.06.2010
	if (!(GM_getValue("changedata")>0)){
		var help = GM_listValues();
		for (var v=0;v<help.length;v++){
			if (help[v].search("myFreeFarmAutomat_")!=-1) {
				GM_setValue(help[v].replace("myFreeFarmAutomat_","").replace("valUseQueList","valUseQueueList"),GM_getValue(help[v]));
				GM_deleteValue(help[v]);
			}
		}
		GM_setValue("changedata",1);
	}
	// **************************************************

	function removeElement(node){node.parentNode.removeChild(node);}

	function createElement(type, attributes, append, inner){
		var node = document.createElement(type);
		for (var attr in attributes){
			if (attr=="checked") node.checked=attributes[attr];
			else if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
		}
		if (append) append.appendChild(node);
		if (inner) node.innerHTML = inner;
		return node;
	}

	function click(A){
		var B = document.createEvent("MouseEvents");
		B.initEvent("click", true, true);
		A.dispatchEvent(B);
	}

	function keyup(A){
		var B = document.createEvent("MouseEvents");
		B.initEvent("keyup", true, true);
		A.dispatchEvent(B);
	}
	
	function change(A){
		var B = document.createEvent("MouseEvents");
		B.initEvent("change", true, true);
		A.dispatchEvent(B);
	}

function getElementLeft(Elem) {
	var elem;
	if(document.getElementById) {
		var elem = document.getElementById(Elem);
	} else if (document.all){
		var elem = document.all[Elem];
	}
	xPos = elem.offsetLeft;
	tempEl = elem.offsetParent;
		while (tempEl != null) {
			xPos += tempEl.offsetLeft;
  		tempEl = tempEl.offsetParent;
		}
	return xPos;
}

function getElementTop(Elem) {
	if(document.getElementById) {
		var elem = document.getElementById(Elem);
	} else if (document.all) {
		var elem = document.all[Elem];
	}
	yPos = elem.offsetTop;
	tempEl = elem.offsetParent;
	while (tempEl != null) {
			yPos += tempEl.offsetTop;
  		tempEl = tempEl.offsetParent;
		}
	return yPos;
}

	function getFarmZoneBonus(farmZone,product){
		var bonus =1;
		try{
			zoneBonus = unsafeWindow.GMzoneBonus.slice();
			zoneBonusSpecialProduct = unsafeWindow.GMzoneBonusSpecialProduct.slice();
			zoneBonusSpecialAmount  = unsafeWindow.GMzoneBonusSpecialAmount.slice();
			if (zoneSpecialBonusProduct[farmZone]==product){
				bonus = 1 - parseInt(zoneSpecialBonusAmount[farmZone],10)/100;
			}else if (zoneBonus[farmZone]){
				bonus = 1 - parseInt(zoneBonus[farmZone],10)/100;
			}
		}catch(err){
			if (Math.floor(((farmZone-1)/6)+1) == parseInt(unsafeWindow.farm,10)){
				if (unsafeWindow.userfarminfos[Math.floor(((farmZone-1)/6)+1)][(((farmZone-1)%6)+1)]["specialwaterbonus"][0]==product){
					bonus = 1 - parseInt(unsafeWindow.userfarminfos[Math.floor(((farmZone-1)/6)+1)][(((farmZone-1)%6)+1)]["specialwaterbonus"][1],10)/100;
				}else if (unsafeWindow.userfarminfos[Math.floor(((farmZone-1)/6)+1)][(((farmZone-1)%6)+1)]["waterbonus"]){
					bonus = 1 - parseInt(unsafeWindow.userfarminfos[Math.floor(((farmZone-1)/6)+1)][(((farmZone-1)%6)+1)]["waterbonus"],10)/100;
				}
			}
		}
		return bonus;
	}

	function calcDauer(dauer,bonus){ //dauer in sek, bonus zB 0.85
		var gesamtdauer=0;
		while(dauer>0){
			dauer *= bonus;
			help = Math.min(dauer,86400);
			dauer -= help;
			gesamtdauer += help;
		}
		return gesamtdauer;
	}
	function time2str(time,mode){
		str="";
		if (!mode) {
			if (time%60>=10) str+=":"+Math.floor(time%60);
			else str+=":0"+Math.floor(time%60);
		}
		time=time/60;
		if (time>=1){
			if (time%60>=10) str=":"+Math.floor(time%60)+str;
			else str=":0"+Math.floor(time%60)+str;
		}
		else str=":00"+str;
		time=time/60;
		if (time>=1) str=Math.floor(time%24)+str;
		else str="0"+str;
		time=time/24;
		if (time>=1) str=Math.floor(time)+"d "+str;
		return str;
	}
	function uhrzeit(time,mode,padd){
		var help = new Date(time*1000);
		if (!padd && help.getHours()<10) { var str = "0"+help.getHours(); }
		else { var str = help.getHours(); }
		if (help.getMinutes()<10) { str += ":0"+help.getMinutes(); }
		else { str += ":"+help.getMinutes(); }
		if (!mode) {
			if (help.getSeconds()<10) { str += ":0"+help.getSeconds(); }
			else { str += ":"+help.getSeconds(); }
		}
		return str;
	}
	function datum(time,year){
		var time2 = new Date(time*1000);
		str="";
		if (time2.getDate()<10) { str += "0"; }
		str += time2.getDate() +".";
		if (time2.getMonth()<9) { str += "0"; }
		str += (1+time2.getMonth());
		if (!year) str += "." + (1900+time2.getFullYear());
		return str;
	}

	function datumDay(time,year){ //--- function written by Jan-Hans
		var time2 = Math.floor(time);
		var today = new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate(),0,0,0)/1000; //begin of this day.
//		GM_log ("timer :" + time2 + " : " + today);
		if (time2 >= today && time2 < (today +(1*24*60*60))){
			return texte["heute"];
		} else if ((time2 + (1*24*60*60) ) >= today && time2 < (today +(2*24*60*60))){
			return texte["day1"];
		} else if (texte["day2"]!="" && (time2 + (2*24*60*60)) >= today && time2 < (today +(3*24*60*60))){
			return texte["day2"];
		} else {
			return datum(time,year);
		}
	}
	function str2time(str){
		var keytime = /(\d+)\.(\d+)\.(\d+), (\d+):(\d+)/;
		help = keytime.exec(str);
		time = new Date(parseInt(help[3],10)+2000,parseInt(help[2],10)-1,help[1],help[4],help[5],0);
		return (time.getTime()/1000);
	}
	function str2seconds(str){ //--- function written by Jan-Hans
		var keytime = /(\d+):(\d+):(\d+)/;
		help = keytime.exec(str);
		return (parseInt(help[1]*60*60,10)+parseInt(help[2]*60,10)+parseInt(help[3],10));
	}

	function getFarmZone(gardenNr){ //written by jan-hans
		if (gardenNr == 0) return 0;
		var zoneTyp = unsafeWindow.userfarminfos[unsafeWindow.farm][gardenNr]["buildingid"];
		//GM_log("Begin getFarmZone :" + gardenNr + " zoneType" + zoneTyp);
		if (zoneTyp=="1" && valUseGeneral){
			return 0;
		} else {
			return gardenNr + 6*(parseInt(unsafeWindow.farm,10)-1);
		}
	}

	function getLowestZoneTimer(timeTable){
		var lowestId = 1;
		for(var i=1;i<=6*parseInt(unsafeWindow.farmamount,10);i++){
			//GM_log("zoneTyp :" + unsafeWindow.GMzoneTyp[i] + ":" + i);
			if (unsafeWindow.GMzoneTyp[i] == "1" && timeTable[i] < timeTable[lowestId]){
				lowestId = i;
			}
		}
		return lowestId;
	}

	String.prototype.count = function(match) {//--- function written by Jan-Hans
		var res = this.match(new RegExp(match,"g"));
		if (res==null) { return 0; }
		return res.length;
	};

	Array.prototype.shuffle = function (){//--- function written by Jan-Hans
	    var i = this.length, j, temp;
	    if ( i == 0 ) return;
	    while ( --i ) {
	        j = Math.floor( Math.random() * ( i + 1 ) );
	        temp = this[i];
	        this[i] = this[j];
	        this[j] = temp;
	    }
	    temp=null;
	};
	Array.prototype.swap = function (from, to){//--- function written by Jan-Hans
	    var temp;
	    if (this.length == 0) return;
      temp = this[from];
      this[from] = this[to];
      this[to] = temp;
	    temp=null;
	};
	
	function explode(str){
		//GM_log("Begin explode "+ str);
		if (str == "") throw("Explode error Argument empty");
		if (str=="undefined") throw ("Explode error Argument is undefined");
		if (typeof str != "string") throw ("Explode error Argument not a String");
		
		try{
			return eval('(' + str + ')');
		} catch(err){
			GM_log("Explode error : " + err);
			throw ("Explode error : " + err);
		}
	}

	function implode(arr){//--- function written by Jan-Hans
	  try{
	    var line = new String();    
	    var InternalCounter = -1;
	    var NoKey = new Boolean(false);
	    if (typeof arr != "object") throw("Argument not a Object or Array" + typeof arr +"<br>");
	    var type = (arr instanceof Array); //true->array | false->object
	    
	    line = (type)?"[":"{";
	    for(i in arr ){
	    	if (typeof arr[i] == "function") continue;
	    	InternalCounter++;
				if (type){
					while (i>InternalCounter){
						line += ",";
						InternalCounter++;
					}
				}else{ //arr == object
	        line += "\"" + i + "\"";
	        line += ":";
	      }
	      if (typeof arr[i] == "number" || typeof arr[i] == "boolean"){
	        line +=  arr[i];
	      } else if (typeof arr[i] == "string"){
	        line +=  "\"" + arr[i] + "\"";
	      } else if(typeof arr[i] == "undefined"){
	        line += '';
	      } else {
	        line += implode(arr[i]);
	      }
	      line += ",";
	    }
	    return line.substring(0,line.length-1) + ((type)?"]":"}");
	  } catch (err){
	    document.write("Implode error : " + err);
	    throw ("Implode error : " + err);
	  }
	}
	
	function print_r(arr,line){//--- function written by Jan-Hans
	  var str = new String();
	  if (!line) line="";
	  try{
	  for (i in arr ){
	  	var type = (arr instanceof Array);
	    //GM_log("i:" + i + " : " + typeof arr[i] + " | " + arr + "\n");
	    if (typeof arr[i] == "string" || typeof arr[i] == "number" || typeof arr[i] == "boolean") {
	      str += line + (type?"[":"{")  + i + (type?"]":"}") + " = " + arr[i] + "<br/>";
	    } else if(typeof arr[i] == "undefined"){
	      str += line + (type?"[":"{")  + i + (type?"]":"}") + " = " +  "<br/>";
	    } else {
	      str += print_r(arr[i],line +(type?"[":"{") + i + (type?"]":"}"));
	    }
	  }
	  return str;
	  } catch (err){
	    document.write("Print_r error : " + err);
	    throw ("Print_r error : " + err);
	  }
	}

	function print_r_time(arr,line){//--- function written by Jan-Hans
		var str = new String();
//		for (var i = 0; i < arr.length; i++){
		try{
			for (i in arr){
				//GM_log("i:" + i + " : " + typeof arr[i] + " | " + arr + "\n");
				if (typeof arr[i] == "string" || typeof arr[i] == "number" || typeof arr[i] == "boolean") {
					str += line + "[" + i + "] = " + uhrzeit(arr[i]) + "<br/>";
				} else if(typeof arr[i] == "undefined"){
					str += line + "[" + i + "] = " +  "<br/>";
				} else {
					str += print_r_time(arr[i],line +"[" + i + "]");
				}
			}
			return str;
	  } catch (err){
	    GM_log("Print_r_time error : " + err);
	    throw ("Print_r_time error : " + err);
	  }
	}

	function init_script(){
		if (top.document.getElementById("divSettings")){start_script();}
		else window.setTimeout(function(){init_script();},100);
	}

	function start_script(){
		var feldtyp = [0,1,2,2,2,2,0,3,3,3,3,0];

		function setNextAutoPflanze(gardenNr){//--- function written by Jan-Hans
			var farmZone = getFarmZone(gardenNr);
			//GM_log("Begin setNextAutoPflanze :" + farmZone);

			if (valUseQueueList && autoPflanze[farmZone][0][0] != "66"){
				var Counter = 0;
				if (!valQueBoxInfo[farmZone][3]){ // normal structure / loop disabled
					//GM_log("Begin setNextPflanze Normal :" + farmZone);

					if (isNaN(autoPflanze[farmZone][0][1])) autoPflanze[farmZone][0][1] = 1;
					autoPflanze[farmZone][0][1]--;

					//zolang kleiner/gelijk 0 en array.length > 1 -> delete item in array
					Counter = 0;
					do {
						if (autoPflanze[farmZone][0][1] <= 0 && autoPflanze[farmZone].length <= 1 && !valQueBoxInfo[farmZone][4]){
							autoPflanze[farmZone][0][1] = 1; // reset to 1 only for displaying in loop modus needed.
						} else if (autoPflanze[farmZone][0][1] <= 0 && autoPflanze[farmZone].length <= 1 && valQueBoxInfo[farmZone][4]){
							autoPflanze[farmZone][0] = [66,1,0]; // stop if no items to go.
						} else if(autoPflanze[farmZone][0][1] <= 0){
							autoPflanze[farmZone].splice(0,1);
						}
						if (valQueBoxInfo[farmZone][4]){
							var auto = autoPflanze.splice(farmZone,1)[0];
							auto.shuffle();
							autoPflanze.splice(farmZone,0,auto);
						}
						Counter++;
					}while (autoPflanze[farmZone][0][1] <= 0 && Counter <= autoPflanze[farmZone].length  );

				} else { //loop structure enabled.
					//GM_log("Begin setNextPflanze Loop :" + farmZone);
					if (isNaN(autoPflanze[farmZone][0][2])) autoPflanze[farmZone][0][2] = 0;
					autoPflanze[farmZone][0][2]++;
					//find if howmany products have reached max value
					for (i=0;i<autoPflanze[farmZone].length;i++){if (autoPflanze[farmZone][i][1] <= autoPflanze[farmZone][i][2]){Counter++;}}

					//if all max value then empty all loop values
					if (Counter == autoPflanze[farmZone].length){for (i=0;i<autoPflanze[farmZone].length;i++){autoPflanze[farmZone][i][2] = 0;}}

					Counter = 0;
					//GM_log("Begin setNextPflanze Loop :" + farmZone);
					do {
						if (valQueBoxInfo[farmZone][4]){ // random
							var auto = autoPflanze.splice(farmZone,1)[0];
							auto.shuffle();
							autoPflanze.splice(farmZone,0,auto);
						}else if (autoPflanze[farmZone][0][1] <= autoPflanze[farmZone][0][2]){ //loop
							autoPflanze[farmZone].push(autoPflanze[farmZone].splice(0,1)[0]);
						}
						Counter++; //error saver. so the loop doesn't do more more times then the array.length.
					} while (autoPflanze[farmZone][0][1] <= autoPflanze[farmZone][0][2] && Counter <= autoPflanze[farmZone].length );
				}
			}
			updatePflanzeBox(((farmZone-1)%6)+1);
			//GM_log("End setNextAutoPflanze :" + farmZone);
			return autoPflanze[farmZone][0][0];
		}

		function drawChooseBox(gardenNr, queueNum){//--- function written by Jan-Hans
			//GM_log("Begin drawChooseBox :" + gardenNr);

			if (!queueNum) queueNum = 0;

			$("divChooseAutoPflanze").style.display = "block";
			$("divChooseAutoPflanze").innerHTML = "";
			newdiv = createElement("div",{"class":"link v66",id:"divChooseItem"+gardenNr+"Q"+queueNum + "I66",title:texte["dontWork"],style:"float:left;margin:5px;border:1px solid grey;-moz-border-radius:10px;"},$("divChooseAutoPflanze"));
			newdiv.addEventListener("mouseover",function(){this.style.border="1px solid red";},false);
			newdiv.addEventListener("mouseout",function(){this.style.border="1px solid grey";},false);
			newdiv.addEventListener("click",function(){
					var gardenNr = parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divChooseItem",""),10);
					var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1,this.id.lastIndexOf("I")),10);
					var farmZone = getFarmZone(gardenNr);
					autoPflanze[farmZone][queueNum][0] = 66;
					if (autoPflanze[farmZone][queueNum][0] != 66) autoPflanze[farmZone][queueNum][2] = 0;
					$("divChooseAutoPflanze").style.display = "none";
					$("divChooseAutoPflanze").innerHTML = "";
					updateQueueList(gardenNr);
					gardenNr=null;queueNum=null;farmZone=null;
			},false);
			var level = parseInt($("levelnum").innerHTML,10);
			for (var j=0;j<unsafeWindow.produkt_name.length;j++) {
				if ((unsafeWindow.produkt_category[j]=="v")&&(unsafeWindow.produkt_level[j]<=level)){
					newdiv = createElement("div",{"class":"link v"+j,id:"divChooseItem"+gardenNr+"Q"+queueNum+"I"+j,title:unsafeWindow.produkt_name[j],style:"float:left;margin:5px;border:1px solid grey;-moz-border-radius:10px;"},$("divChooseAutoPflanze"));
					newdiv.addEventListener("mouseover",function(){this.style.border="1px solid red";},false);
					newdiv.addEventListener("mouseout",function(){this.style.border="1px solid grey";},false);
					newdiv.addEventListener("click",function(){
						var gardenNr = parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divChooseItem",""),10);
						var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1,this.id.lastIndexOf("I")),10);
						var farmZone = getFarmZone(gardenNr);
						if (autoPflanze[farmZone][queueNum][0] != this.getAttribute("class").replace("link v","")) autoPflanze[farmZone][queueNum][2] = 0;
						autoPflanze[farmZone][queueNum][0] = this.getAttribute("class").replace("link v","");
						$("divChooseAutoPflanze").innerHTML = "";
						$("divChooseAutoPflanze").style.display = "none";
						updateQueueList(gardenNr);
						gardenNr=null;queueNum=null;farmZone=null;
					},false);
				}
			}
			gardenNr=null;queueNum=null;newdiv=null;
			//GM_log("End drawChooseBox :" + gardenNr);
		}

		function drawPflanzeBox(gardenNr){//--- function written by Jan-Hans
			//GM_log("Begin drawPflanzeBox :" + gardenNr);
			if (!gardenNr && gardenNr!=0) return ;
			var farmZone = getFarmZone(gardenNr);
			//GM_log("gardenNr: " + gardenNr + " farmZone: " + farmZone);
			valQueBoxInfo[farmZone][2] = true; // setting visible = true

			var newlayer = createElement("div",{id:"divAutoPflanzeBox"+gardenNr,"class":"queueBox"},$("zone"+gardenNr));

			var newdiv = createElement("div",{id:"divAutoPflanzeBoxTitle"+gardenNr,"class":"queueBoxTitle"},$("divAutoPflanzeBox"+gardenNr));
			newdiv.innerHTML = texte["Quelist"].replace("%GARDENNR%",gardenNr);
			if (valUseDragging){
				newdiv.style.cursor = "move";
				newdiv.addEventListener("mousemove", function(event){
					if (valMouseXY[0]==this.id){
						var reg = new RegExp("([-0-9]*)px", "i");
						this.parentNode.style.left =parseInt(reg.exec(this.parentNode.style.left)[1],10) + (event.pageX - valMouseXY[1]) +'px';
						this.parentNode.style.top = parseInt(reg.exec(this.parentNode.style.top)[1],10) + (event.pageY - valMouseXY[2]) +'px';
						valMouseXY = [valMouseXY[0],event.pageX,event.pageY];
						//$("divDefBoxInfo").innerHTML = event.pageX + "px;"+event.pageY + "px;";
						reg=null;
					}
				},false);
				newdiv.addEventListener("mouseup", function(event){
					var farmZone = getFarmZone(parseInt(this.id.replace("divAutoPflanzeBoxTitle",""),10));
					if (valMouseXY[0] == this.id){
						var reg = new RegExp("([-0-9]*)px", "i");
						valQueBoxInfo[farmZone] = [reg.exec(this.parentNode.style.left)[1],reg.exec(this.parentNode.style.top)[1],valQueBoxInfo[farmZone][2],valQueBoxInfo[farmZone][3],valQueBoxInfo[farmZone][4],valQueBoxInfo[farmZone][5]];
					}
					valMouseXY = ["",0,0,0,0];
					updateQueueList(((farmZone-1)%6)+1);
					//$("divDefBoxInfo").innerHTML = print_r(valMouseXY,"");
					farmZone=null;
				},false);
				newdiv.addEventListener("mousedown", function(event){
					valMouseXY = [this.id,event.pageX,event.pageY];
					//$("divDefBoxInfo").innerHTML = this.parentNode.id + ":" + event.pageX + "px;"+event.pageY + "px;";
				},false);
			}

			//close button
			var newimg = createElement("img",{id:"divAutoPflanzeBoxClose"+gardenNr,"class":"link queueBoxClose",title:texte["QueClose"],style:"",src:"http://dqt9wzym747n.cloudfront.net/pics/close.jpg"},$("divAutoPflanzeBox"+gardenNr));
			newimg.addEventListener("click", function(){
				var farmZone = getFarmZone(parseInt(this.id.replace("divAutoPflanzeBoxClose",""),10));
				valQueBoxInfo[farmZone][2] = false;
				removeElement(this.parentNode);
				updateQueueList(((farmZone-1)%6)+1);
				farmZone=null;
			},false);

			createElement("div",{id:"divAutoPflanzeQueBox"+gardenNr,"class":((farmZone==0)?"queueBoxerGeneral":"queueBoxerZone")},$("divAutoPflanzeBox"+gardenNr));
			for (i=0; i< autoPflanze[farmZone].length; i++){
				drawAddQBox(farmZone,i);
			}

			createElement("div",{id:"divAutoPflanzeBoxCK1"+gardenNr, "class":"queueBoxSpacer"},$("divAutoPflanzeBox"+gardenNr));
			//Repeat button
			newimg = createElement("div",{id:"divAutoPflanzeRepeat"+gardenNr,"class":"link queueBoxRepeatButton",style:""},$("divAutoPflanzeBoxCK1"+gardenNr));
			newimg.title = (valQueBoxInfo[farmZone][3])?texte["repeat_on"]:texte["repeat_off"];
			newimg.style.backgroundImage = (valQueBoxInfo[farmZone][3])?"url("+strImages["repeat_on"]+")":"url("+strImages["repeat_off"]+")";
			newimg.addEventListener("click", function(){
				var farmZone = getFarmZone(parseInt(this.id.replace("divAutoPflanzeRepeat",""),10));
				valQueBoxInfo[farmZone][3] = !valQueBoxInfo[farmZone][3];
				this.style.backgroundImage = (valQueBoxInfo[farmZone][3])?"url("+strImages["repeat_on"]+")":"url("+strImages["repeat_off"]+")";
				this.title = (valQueBoxInfo[farmZone][3])?texte["repeat_on"]:texte["repeat_off"];
				if (!valQueBoxInfo[farmZone][3]){ for(var i=0;i<autoPflanze[farmZone].length;i++) autoPflanze[farmZone][i][2]= 0;} //reset when disabling
				updateQueueList(((farmZone-1)%6)+1);
				farmZone=null;i=0;
			},false);
			//Shuffle button
			newimg = createElement("div",{id:"divAutoPflanzeShuffel"+gardenNr,"class":"link queueBoxShuffleButton",style:""},$("divAutoPflanzeBoxCK1"+gardenNr));
			newimg.title = (valQueBoxInfo[farmZone][4])?texte["shuffle_on"]:texte["shuffle_off"];
			newimg.style.backgroundImage = (valQueBoxInfo[farmZone][4])?"url("+strImages["shuffle_on"]+")":"url("+strImages["shuffle_off"]+")";
			newimg.addEventListener("click",function(){
				var farmZone = getFarmZone(parseInt(this.id.replace("divAutoPflanzeShuffel",""),10));
				valQueBoxInfo[farmZone][4] = !valQueBoxInfo[farmZone][4];
				this.title = (valQueBoxInfo[farmZone][4])?texte["shuffle_on"]:texte["shuffle_off"];
				this.style.backgroundImage = (valQueBoxInfo[farmZone][4])?"url("+strImages["shuffle_on"]+")":"url("+strImages["shuffle_off"]+")";
				updateQueueList(((farmZone-1)%6)+1);
				farmZone=null;
			},false);
			//Rotate button
			newimg = createElement("div",{id:"divAutoPflanzeBoxRotate"+gardenNr,"class":"link queueBoxRotateButton",title:texte["rotate"],style:""},$("divAutoPflanzeBoxCK1"+gardenNr));
			newimg.style.backgroundImage = "url("+strImages["rotate"]+")";
			newimg.addEventListener("click",function(){
				var farmZone = getFarmZone(parseInt(this.id.replace("divAutoPflanzeBoxRotate",""),10));
				autoPflanze[farmZone].push(autoPflanze[farmZone].splice(0,1)[0]);
				updatePflanzeBox(((farmZone-1)%6)+1);
				farmZone=null;
			},false);
			//add button.
			newimg = createElement("div",{id:"divAutoPflanzeBoxA"+gardenNr,"class":"link queueBoxAddButton",title:texte["QueAddText"],style:""},$("divAutoPflanzeBoxCK1"+gardenNr));
			newimg.style.backgroundImage = "url("+strImages["plus"]+")";
			newimg.addEventListener("click",function(){
				var farmZone = getFarmZone(parseInt(this.id.replace("divAutoPflanzeBoxA",""),10));
//				var product = $("divAutoPflanzeBox"+(((farmZone-1)%6)+1)+"Q"+(autoPflanze[farmZone].length-1)).getAttribute("class").replace("link v","");
				var product = autoPflanze[farmZone][autoPflanze[farmZone].length-1][0];
				var newQueNum = parseInt(autoPflanze[farmZone].push([product,1,0]),10) -1;
				$("divAutoPflanzeItemBox"+(((farmZone-1)%6)+1)+"Q"+(newQueNum-1)).style.borderBottom = "1px solid black";
				drawAddQBox(farmZone, newQueNum);
				updateQueueList(((farmZone-1)%6)+1);
				farmZone=null;product=null;newQueNum=null;
			},false);

			//time
			createElement("div",{id:"divAutoPflanzeEndTime"+gardenNr,"class":"queueTime"},$("divAutoPflanzeBox"+gardenNr));

			//GM_log("End drawPflanzeBox :" + gardenNr);
			farmZone=null;gardenNr=null;newlayer=null;newdiv=null;newimg=null;newinp=null;
		}

		function drawAddQBox(farmZone, newQueNum){//--- function written by Jan-Hans
			//GM_log("Begin drawAddBox :" + farmZone + " : " + newQueNum);
			var gardenNr = (((farmZone-1)%6)+1);

			//begin adding new box
			newlayer = createElement("div",{id:"divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum),"class":"queueItemBox"},$("divAutoPflanzeQueBox"+gardenNr));
			if (newQueNum==(autoPflanze[farmZone].length-1)) newlayer.style.borderBottom = "0px";


			//UP Button
			newimg = createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"Up",alt:"up","class":"link queueItemUpButton",title:texte["QueUpButton"],style:""},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newimg.addEventListener("click", function(){
				//GM_log("id " + this.id.substring(0,this.id.length-1));
				var farmZone = getFarmZone(parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divAutoPflanzeBox",""),10));
				var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1,this.id.lastIndexOf("Up")),10);				
				var auto = autoPflanze.splice(farmZone,1)[0];
				GM_log("swap" + queueNum + " : " + queueNum-1);
				auto.swap(queueNum, queueNum-1);
				autoPflanze.splice(farmZone,0,auto);
				updatePflanzeBox(((farmZone-1)%6)+1);
				auto=null;farmZone=null;queueNum=null;
			},false);

			//Down Button
			newimg = createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"Down",alt:"down","class":"link queueItemDownButton",title:texte["QueDownButton"],style:""},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newimg.addEventListener("click", function(){
				var farmZone = getFarmZone(parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divAutoPflanzeBox",""),10));
				var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1,this.id.lastIndexOf("Down")),10);
				var auto = autoPflanze.splice(farmZone,1)[0];
				GM_log("swap" + queueNum + " : " + queueNum+1);
				auto.swap(queueNum, queueNum+1);
				autoPflanze.splice(farmZone,0,auto);
				updatePflanzeBox(((farmZone-1)%6)+1);
				auto=null;farmZone=null;queueNum=null;
			},false);

			//Item
			newdiv = createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum),"class":"link queueItemProduct"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newdiv.addEventListener("click", function(){
				drawChooseBox(parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divAutoPflanzeBox",""),10), parseInt(this.id.substring(this.id.lastIndexOf("Q")+1),10));
			},false);
			newdiv.addEventListener("mousemove", function(evt){
				$("divAutomatInfoBox").style.left= (evt.pageX-($("divAutomatInfoBox").offsetWidth/3))+ "px";
				$("divAutomatInfoBox").style.top = (evt.pageY+25)+ "px";
			},false);
			newdiv.addEventListener("mouseover", function(evt){
				$("divAutomatInfoBox").innerHTML = this.title;
				this.title=null;
				$("divAutomatInfoBox").style.display = "block";
				$("divAutomatInfoBox").style.left= (evt.pageX-($("divAutomatInfoBox").offsetWidth/3))+ "px";
				$("divAutomatInfoBox").style.top = (evt.pageY+25)+ "px";
			},false);
			newdiv.addEventListener("mouseout", function(){
				this.title = $("divAutomatInfoBox").innerHTML;
				$("divAutomatInfoBox").style.display = "none";
			},false);

			//Minus Button
			newimg = createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"M",alt:"-","class":"link queueItemMinButton",title:texte["QueMin"],style:""},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newimg.addEventListener("click", function(){
				//GM_log("id " + this.id.substring(0,this.id.length-1));
				if ($(this.id.substring(0,this.id.length-1)+"I").value > 0) {
					$(this.id.substring(0,this.id.length-1)+"I").value-- ;
					change($(this.id.substring(0,this.id.length-1)+"I"));
				}
			},false);

			//Plus Button
			newimg = createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"P",alt:"+","class":"link queueItemPlusButton",title:texte["QuePlus"],style:""},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newimg.addEventListener("click", function(){
				if ($(this.id.substring(0,this.id.length-1)+"I").value < 999) {
					$(this.id.substring(0,this.id.length-1)+"I").value++ ;
					change($(this.id.substring(0,this.id.length-1)+"I"));
				}
			},false);

			//Input Field
			newinp = createElement("input",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"I2",disabled:true,value:0,maxlength:"3",size:"3","class":"queueItemInputDisable"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newinp = createElement("input",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"I",value:0,maxlength:"3",size:"3","class":"queueItemInputEnable"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newinp.value = autoPflanze[farmZone][newQueNum][1];
			newinp.addEventListener("change", function(){
				if (/^-?(0|[1-9]\d*)$/.test(this.value)){
					if (this.value < 1) this.value = 1;
					if (this.value > 999) this.value = 999;
					var farmZone = getFarmZone(parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divAutoPflanzeBox",""),10));
					var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1,this.id.lastIndexOf("I")),10);
					autoPflanze[farmZone][queueNum][1] = this.value;
					updateQueueList(((farmZone-1)%6)+1);
				}else {
					this.value = (isNaN(parseInt(this.value,"")))?1:parseInt(this.value,"");
				}
				farmZone=null;queueNum=null;
			},false);

			//infinity sign
			createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"T","class":"queueItemTextInf"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));

			//add button.
			newimg = createElement("img",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"A","class":"link queueItemAddButton",title:texte["QueAddAboveText"],style:"",src:"http://dqt9wzym747n.cloudfront.net/pics/buildingupdatebutton_off.png"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newimg.addEventListener("click",function(){
				var farmZone = getFarmZone(parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divAutoPflanzeBox",""),10));
				var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1),10);
//				var product = $("divAutoPflanzeBox"+(((farmZone-1)%6)+1)+"Q"+(queueNum)).getAttribute("class").replace("link v","");
				var product = autoPflanze[farmZone][queueNum][0];
				autoPflanze[farmZone].splice(queueNum,0,[product,1,0]);
				updatePflanzeBox(((farmZone-1)%6)+1);
				farmZone= null;product=null;queueNum=null;
			},false);

			//Delete Button
			newimg = createElement("img",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"D","class":"link queueItemDeleteButton",title:texte["QueDeleteText"],style:"",src:"http://dqt9wzym747n.cloudfront.net/pics/button_cancel_off.png"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			newimg.addEventListener("click", function(){
				var farmZone = getFarmZone(parseInt(this.id.substring(0,this.id.lastIndexOf("Q")).replace("divAutoPflanzeBox",""),10));
				var queueNum = parseInt(this.id.substring(this.id.lastIndexOf("Q")+1,this.id.lastIndexOf("D")),10);
				autoPflanze[farmZone].splice(queueNum,1);
				if (valQueBoxInfo[farmZone][2]){
					var foundActive = false;
					for (var i=0; i<autoPflanze[farmZone].length;i++){
						if (autoPflanze[farmZone][i][1] > autoPflanze[farmZone][i][2]){foundActive=true;}
					}
					if (!foundActive){
						for (var i=0; i<autoPflanze[farmZone].length;i++){autoPflanze[farmZone][i][2]=0;}
					}
				}
				if (queueNum < (autoPflanze[farmZone].length)){
					updatePflanzeBox(gardenNr);
				} else {
					removeElement($("divAutoPflanzeItemBox"+(((farmZone-1)%6)+1)+"Q"+queueNum));
					updateQueueList(((farmZone-1)%6)+1);
					$("divAutoPflanzeItemBox"+(((farmZone-1)%6)+1)+"Q"+(queueNum-1)).style.borderBottom = "0px solid black";
				}
				farmZone= null;queueNum=null;foundActive=null;
			},false);

			//End Time
			newdiv = createElement("div",{id:"divAutoPflanzeBox"+gardenNr+"Q"+(newQueNum)+"ET","class":"queueTime"},$("divAutoPflanzeItemBox"+gardenNr+"Q"+(newQueNum)));
			if (valUseGeneral){
				newdiv.addEventListener("mousemove", function(evt){
					$("divAutomatInfoBox").style.left= (evt.pageX-($("divAutomatInfoBox").offsetWidth/4))+ "px";
					$("divAutomatInfoBox").style.top = (evt.pageY+25)+ "px";
				},false);
				newdiv.addEventListener("mouseover", function(evt){
					$("divAutomatInfoBox").innerHTML = this.title;
					this.title=null;
					$("divAutomatInfoBox").style.display = "block";
					$("divAutomatInfoBox").style.left= (evt.pageX-($("divAutomatInfoBox").offsetWidth/4))+ "px";
					$("divAutomatInfoBox").style.top = (evt.pageY+25)+ "px";
				},false);
				newdiv.addEventListener("mouseout", function(){
					this.title = $("divAutomatInfoBox").innerHTML;
					$("divAutomatInfoBox").style.display = "none";
				},false);
			}
			gardenNr=null;farmZone=null;newQueNum=null;newlayer=null;newdiv=null;newimg=null;newinp=null;
			//GM_log("End drawAddBox :" + farmZone + " : " + newQueNum);
		}

		function updateQueueList(gardenNrFrom, gardenNrTo){//--- function written by Jan-Hans
			if (!gardenNrFrom && gardenNrFrom!=0 && !gardenNrTo){ gardenNrFrom=0; gardenNrTo=6;}
			if (!gardenNrFrom) gardenNrFrom=0;
			if (!gardenNrTo) gardenNrTo = gardenNrFrom;

			//GM_log("Start updateQueueList " + gardenNrFrom + "/" + gardenNrTo);

			for (var gardenNr = gardenNrFrom; gardenNr <= gardenNrTo; gardenNr++){
				var farmZone = getFarmZone(gardenNr);
				//GM_log("Begin updateQueueList " + gardenNr + "/" + farmZone);

				if ($("divAutoPflanze"+gardenNr) && !$("divAutoPflanzeBox"+gardenNr)){
					//GM_log("updateQueueList Icon :" + (gardenNr+6*(unsafeWindow.farm-1)));
					$("divAutoPflanze"+gardenNr).setAttribute("class","link queueItemProduct v"+autoPflanze[farmZone][0][0]);
					if (autoPflanze[farmZone][0][0]=="66"){
						$("divAutoPflanze"+gardenNr).title = texte["dontWork"];
					} else {
						$("divAutoPflanze"+gardenNr).title = texte["doWork"];
					}
					$("divAutoPflanze"+gardenNr).style.display = "block";
				} else if ($("divAutoPflanzeBox"+gardenNr)){
					//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone);
					var noTime = false;
					if (valShowQueueTime){
						try{
							var zoneTimes=unsafeWindow.GMnextTime.slice();
							for (var i=0;i<zoneTimes.length;i++){zoneTimes[i] = parseFloat(zoneTimes[i]);}
						}catch(err){
							noTime=true;
							var zoneTimes=new Array();
							for (var i=0;i<19;i++){zoneTimes[i] = Math.floor((new Date()).getTime()/1000);}
						}
						if (gardenNr>=1){
							var totalTime = zoneTimes[farmZone];
						} else {
							var totalTime = 0;
						}
					}
					var totalInQue = 0;
					var found66 = false;
					var timeShift = parseInt(unsafeWindow.Zeit.Verschiebung,10);
					for (i=0;i<autoPflanze[farmZone].length;i++){
						//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone + ":"+i + " | " + autoPflanze[farmZone].length);
						var totalproduct = ((120/(unsafeWindow.produkt_x[autoPflanze[farmZone][i][0]] * unsafeWindow.produkt_y[autoPflanze[farmZone][i][0]])) * (unsafeWindow.produkt_ernte[autoPflanze[farmZone][i][0]]-1));
						$("divAutoPflanzeItemBox"+gardenNr+"Q"+i).style.opacity = (found66)? 0.125:1; //if previous item is product 66 then blending

						//item title info creation
						var thisTitle = "";
						var br = "<br/>";
						if (autoPflanze[farmZone][i][0] == 66){
							found66 = true;
							thisTitle += (totalInQue==0)?texte["QueStop0"]:(totalInQue==1)? texte["QueStop1"]:texte["QueStopX"];
						}else if (!found66){
							if (valQueBoxInfo[farmZone][3] && valQueBoxInfo[farmZone][4]){
								thisTitle += ((thisTitle!="")?br:"")+ texte["QueRepeatShuffle"];
							} else if (valQueBoxInfo[farmZone][4]){
								thisTitle += ((thisTitle!="")?br:"")+ texte["QueShuffle"];
							} else if (valQueBoxInfo[farmZone][3]){
								thisTitle += ((thisTitle!="")?br:"")+ texte["QueRepeat"];
							}
							if (valQueBoxInfo[farmZone][3] || valQueBoxInfo[farmZone][4]){//repeat or shuffle
								thisTitle += ((thisTitle!="")?br:"");
								if (autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2]) {
									thisTitle += br + ((autoPflanze[farmZone][i][2]<=1)? texte["QueRoundDone1"]:texte["QueRoundDoneX"]);
								}
								thisTitle += ((thisTitle!="")?br:"");
								thisTitle += ((totalproduct==1)?texte["QueRoundMake1"]:texte["QueRoundMakeX"]);
								if(autoPflanze[farmZone][i][1]<= 1) {
									thisTitle += ((autoPflanze[farmZone][i][2]!=0)?br+texte["QueRoundMade1"]:"");
									thisTitle += ((autoPflanze[farmZone][i][1]>autoPflanze[farmZone][i][2])?br+texte["QueRoundToGo1"]:"");
									thisTitle += ((valShowQueueTime && autoPflanze[farmZone][i][1]>autoPflanze[farmZone][i][2])?br+br+texte["QueTime1"]:"");
								} else {
									thisTitle += ((autoPflanze[farmZone][i][2]!=0)?br+texte["QueRoundMadeX"]:"");
									thisTitle += ((autoPflanze[farmZone][i][1]>autoPflanze[farmZone][i][2])?br+texte["QueRoundToGoX"]:"");
									thisTitle += ((valShowQueueTime && autoPflanze[farmZone][i][1]>autoPflanze[farmZone][i][2])?(((autoPflanze[farmZone][i][1]-autoPflanze[farmZone][i][2])<=1)?br+br+texte["QueTime1"]:br+br+texte["QueTimeX"]):"");
								}								
							}else {//normal
								thisTitle += ((thisTitle!="")?br:"");				
								if ((autoPflanze[farmZone].length-1) == i) {
									thisTitle += ((thisTitle!="")?br:"")+ texte["QueFieldInRowInf"];
									thisTitle += br+br + ((totalproduct==1)?texte["QueRoundMake1"]:texte["QueRoundMakeX"]);
									thisTitle += br + texte["QueFieldToGo1"] + br+br + ((valShowQueueTime)?texte["QueTime1"]:"");									
								} else if(autoPflanze[farmZone][i][1]<= 1) {
									thisTitle += ((thisTitle!="")?br:"")+ texte["QueFieldInRow1"];
									thisTitle += br+br + ((totalproduct==1)?texte["QueFieldMake1"]:texte["QueFieldMakeX"]);
									thisTitle += br + texte["QueFieldToGo1"] + br+br + ((valShowQueueTime)?texte["QueTime1"]:"");
								} else {
									thisTitle += ((thisTitle!="")?br:"")+ texte["QueFieldInRowX"];
									thisTitle += br+br + ((totalproduct==1)?texte["QueFieldMake1"]:texte["QueFieldMakeX"]);
									thisTitle += br + texte["QueFieldToGoX"] + br+br + ((valShowQueueTime)?texte["QueTimeX"]:"");
								}
							}
						}else{
							thisTitle += ((thisTitle!="")?br:"")+ texte["QueueStoped"];
						}
						//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone + ":"+i + " | 2");
						var score=0;
						if (!found66) score=productInfo[autoPflanze[farmZone][i][0]]["score"];

						if (gardenNr>=1 && !found66 && valShowQueueTime){ //zoneProduct
							var bonus = getFarmZoneBonus(farmZone,autoPflanze[farmZone][i][0]);
							var time = calcDauer((productInfo[autoPflanze[farmZone][i][0]]["time"]*60) * Math.max((autoPflanze[farmZone][i][1]-autoPflanze[farmZone][i][2]),0),bonus);
							rowTime = totalTime += time;
						} else if (gardenNr==0 && !found66 && valShowQueueTime){ //generalProduct
							var rowTime = 0;
							var fieldArray = new Array();//howmany times a farmZone is used to plant things on.
							var timeTitle = "";
							var time = zoneTimes[getLowestZoneTimer(zoneTimes)];
							for (var k=0;k<(autoPflanze[farmZone][i][1]-autoPflanze[farmZone][i][2]);k++){
								var fz = getLowestZoneTimer(zoneTimes);
								var bonus = getFarmZoneBonus(fz,autoPflanze[farmZone][i][0]);
								fieldArray[fz] = (isNaN(fieldArray[fz]))?1:fieldArray[fz]+1;
								var timed = calcDauer(productInfo[autoPflanze[farmZone][i][0]]["time"]*60,bonus);
								zoneTimes[fz] +=  timed;
								//GM_log("zoneTimes :" + uhrzeit(zoneTimes[fz]) + " fz: " + fz + " timed: " + timed + ":"+ time2str(timed) + " bonus: " + bonus);
								if (rowTime < zoneTimes[fz]) rowTime = zoneTimes[fz];
							}
							for(var xval in fieldArray) {
								if (parseInt(xval,10)!=xval) continue;
								timeTitle += "<div style=\"display:table-row\"><div style=\"display:table-cell;text-align:right;\">" + fieldArray[xval] + "</div><div style=\"display:table-cell;\">&nbsp;\u00D7&nbsp;" + Math.floor(((xval-1)/6)+1)+"."+(((xval-1)%6)+1) + "</div></div>";
							}
							timeTitle = "<div style=\"border-bottom:1px solid;\">"+texte["autoPflanzeOn"] +"</div>" + timeTitle;
							time = zoneTimes[fz] - time;
							if (totalTime < rowTime) totalTime = rowTime;
							fieldArray=null;fz=null;xval=null;k=null;bonus=null;
						}
						//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone + ":"+i + " | 3");

						//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO%= field nr until,
						//%PRODMAKE% = number of products to be made , %PRODMADE% = if in loop number of cultured products, %PRODTOGO% = %PRODMAKE%-%PRODMADE%
						//%TIMETHIS% = total time of this product, %DATEREADY% date ready at, %TIMEREADY% time ready at
						//%SCOREMAKE% = number points to get , %SCOREMADE% = if in loop number points already made, %SCORETOGO% = %SCOREMADE%-%SCOREMADE%
						thisTitle = thisTitle.replace(/%PRODNAME%/gi, unsafeWindow.produkt_name[autoPflanze[farmZone][i][0]]);
						thisTitle = thisTitle.replace(/%FLDFROM%/gi, totalInQue + parseInt((autoPflanze[farmZone][i][0] == "66")?0:1,10));
						thisTitle = thisTitle.replace(/%FLDTO%/gi, totalInQue + parseInt(autoPflanze[farmZone][i][1],10));
						thisTitle = thisTitle.replace(/%PRODMAKE%/gi, totalproduct * parseInt(autoPflanze[farmZone][i][1],10));
						thisTitle = thisTitle.replace(/%PRODMADE%/gi, totalproduct * parseInt(autoPflanze[farmZone][i][2],10));
						thisTitle = thisTitle.replace(/%PRODTOGO%/gi, totalproduct * (parseInt(autoPflanze[farmZone][i][1],10)- parseInt(autoPflanze[farmZone][i][2],10)));
						if (valShowQueueTime) thisTitle = thisTitle.replace(/%TIMETHIS%/gi, time2str(time,true,true) + " " + texte["uhr"]);
						if (valShowQueueTime) thisTitle = thisTitle.replace(/%DATEREADY%/gi, datumDay(rowTime,true).toLowerCase());
						if (valShowQueueTime) thisTitle = thisTitle.replace(/%TIMEREADY%/gi, uhrzeit(rowTime,true));
						thisTitle = thisTitle.replace(/%SCOREMAKE%/gi, score * totalproduct * parseInt(autoPflanze[farmZone][i][1],10));
						thisTitle = thisTitle.replace(/%SCOREMADE%/gi, score * totalproduct * parseInt(autoPflanze[farmZone][i][2],10));
						thisTitle = thisTitle.replace(/%SCORETOGO%/gi, score * totalproduct * (parseInt(autoPflanze[farmZone][i][1],10)- parseInt(autoPflanze[farmZone][i][2],10)));

						//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone + ":"+i + " | 4");

						totalInQue += (autoPflanze[farmZone][i][1]== undefined)?1:parseInt(autoPflanze[farmZone][i][1],10);
						if (autoPflanze[farmZone][i][1]> autoPflanze[farmZone][i][2]) lastViewedTime = $("divAutoPflanzeBox"+gardenNr+"Q"+(i)+"ET");

						$("divAutoPflanzeBox"+gardenNr+"Q"+i).style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? 0.4:1;
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? 0.4:1;
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I2").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? 0.4:1;
						//$("divAutoPflanzeBox"+gardenNr+"Q"+i+"Up").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? (1/4):1;
						//$("divAutoPflanzeBox"+gardenNr+"Q"+i+"Down").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? (1/4):1;
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"M").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])?  0.4:1;
						//$("divAutoPflanzeBox"+gardenNr+"Q"+i+"P").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? (3/4):1;
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"ET").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? 0.4:1;
						//$("divAutoPflanzeBox"+gardenNr+"Q"+i+"D").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? (3/4):1;
						//$("divAutoPflanzeBox"+gardenNr+"Q"+i+"A").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? (3/4):1;
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"T").style.opacity = (valQueBoxInfo[farmZone][2] && autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2])? 0.4:1;

						$("divAutoPflanzeBox"+gardenNr+"Q"+i).setAttribute("class","link queueItemProduct v"+autoPflanze[farmZone][i][0]);
						$("divAutoPflanzeBox"+gardenNr+"Q"+i).setAttribute("title",thisTitle);
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I").setAttribute("class",((valQueBoxInfo[farmZone][3] && autoPflanze[farmZone][i][0] != "66")?"queueItemInputEnableHigh":"queueItemInputEnableNorm"));
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"T").setAttribute("class",((autoPflanze[farmZone][i][0] != "66")?"queueItemTextInf":"queueItemTextStop"));
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"ET").setAttribute("title",((!timeTitle)?null:timeTitle));

						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"ET").innerHTML = (valShowQueueTime)?(datumDay(rowTime,true) + "&nbsp;" + uhrzeit(rowTime,true)):null;
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"T").innerHTML = (autoPflanze[farmZone][i][0] != "66")?"\u221E":texte["stop"];
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"ET").style.color = (noTime)? "#DD0000":"black";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I").value = (autoPflanze[farmZone][i][1]== undefined)?1:autoPflanze[farmZone][i][1];
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I2").value = (autoPflanze[farmZone][i][2]== undefined)?0:autoPflanze[farmZone][i][2];					

						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"Up").style.display = ((i==0) || (autoPflanze[farmZone].length <=2) || ((autoPflanze[farmZone].length-1) && !valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || (autoPflanze[farmZone][i][0] == "66")) ?"none":"block";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"Down").style.display = (((autoPflanze[farmZone].length-1) == i ) || (autoPflanze[farmZone].length <=2) || ((autoPflanze[farmZone].length-1) == i && !valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || (autoPflanze[farmZone][i][0] == "66")) ?"none":"block";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"M").style.display = (((autoPflanze[farmZone].length-1) == i && !valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || (autoPflanze[farmZone][i][0] == "66")) ?"none":"block";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"P").style.display = (((autoPflanze[farmZone].length-1) == i && !valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || (autoPflanze[farmZone][i][0] == "66")) ?"none":"block";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I").style.display = (((autoPflanze[farmZone].length-1) == i && !valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || (autoPflanze[farmZone][i][0] == "66")) ?"none":"block";						
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"T").style.display = (((autoPflanze[farmZone].length-1) == i && !valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || (autoPflanze[farmZone][i][0] == "66")) ?"block":"none";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"I2").style.display = (valQueBoxInfo[farmZone][3] && autoPflanze[farmZone][i][0] != "66")?"block":"none";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"D").style.display = (autoPflanze[farmZone].length > 1) ?"block":"none";
						$("divAutoPflanzeBox"+gardenNr+"Q"+i+"ET").style.display = (autoPflanze[farmZone][i][1]<=autoPflanze[farmZone][i][2] || autoPflanze[farmZone][i][0]==66 || !valShowQueueTime )?"none":"block";
												
												
						//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone + ":"+i + " END");
					}
					
					//GM_log("updateQueueList Box :" + gardenNr + "/" + farmZone + ":"+i + " AFTER");
					$("divAutoPflanze"+gardenNr).style.display = "none";
					$("divAutoPflanzeBox"+gardenNr).style.left = (valQueBoxInfo[farmZone][0]== 0 || !valUseDragging)? ((((gardenNr-1)%6)+1)==3 || (((gardenNr-1)%6)+1)==6)? "65px":"85px": valQueBoxInfo[farmZone][0] + "px";
					$("divAutoPflanzeBox"+gardenNr).style.top  = (valQueBoxInfo[farmZone][1]== 0 || !valUseDragging)? "75px": valQueBoxInfo[farmZone][1] + "px";
					$("divAutoPflanzeBox"+gardenNr).style.display = "block";					
										
					if (valShowQueueTime){
						$("divAutoPflanzeEndTime"+gardenNr).innerHTML =  datumDay(totalTime,true) + "&nbsp;"+ uhrzeit(totalTime,true);
						$("divAutoPflanzeEndTime"+gardenNr).setAttribute("title",((!timeTitle)?null:timeTitle));
						if (valQueBoxInfo[farmZone][3]) $("divAutoPflanzeEndTime"+gardenNr).style.color = (noTime)?"#DD0000":"#0000DD";
						if ((!valQueBoxInfo[farmZone][3] && !valQueBoxInfo[farmZone][4]) || found66){
							$("divAutoPflanzeBox"+gardenNr+"Q"+(i-1)+"ET").style.display = "none";
							$("divAutoPflanzeEndTime"+gardenNr).innerHTML = "---";
						}else{
							if (gardenNr>=1) lastViewedTime.style.display = "none";
						}
					}
					$("divAutoPflanzeQueBox"+gardenNr).setAttribute("class",((farmZone==0)?"queueBoxerGeneral":"queueBoxerZone"));
					$("divAutoPflanzeBox"+gardenNr).style.width = ($("divAutoPflanzeQueBox"+gardenNr).clientHeight < $("divAutoPflanzeQueBox"+gardenNr).scrollHeight )? "136px":"121px";
				}
		  //GM_log("End updateQueueList :" + farmZone);
			}
			GM_setValue(lng+"_"+server+"_"+username+"_valQueBoxInfo",implode(valQueBoxInfo));
			GM_setValue(lng+"_"+server+"_"+username+"_autoPflanze", implode(autoPflanze));

			if ($("divDefBoxInfo")) $("divDefBoxInfo").innerHTML = "General<br/>" + print_r(valQueBoxInfo.slice(0,1),"") + "<br/>Zone's<br/>" + print_r(valQueBoxInfo.slice(1+(6*(parseInt(unsafeWindow.farm,10)-1)), 1+(6*parseInt(unsafeWindow.farm,10))),"");
			if ($("divDefBoxPflanze")) $("divDefBoxPflanze").innerHTML = "General<br/>" + print_r(autoPflanze.slice(0,1),"") + "<br/>Zone's<br/>" + print_r(autoPflanze.slice(1+(6*(parseInt(unsafeWindow.farm,10)-1)), 1+(6*parseInt(unsafeWindow.farm,10))),"");
			//if ($("divDefBoxInfo")) $("divDefBoxInfo").innerHTML = print_r(valQueBoxInfo,"");
			//if ($("divDefBoxPflanze")) $("divDefBoxPflanze").innerHTML = print_r(autoPflanze,"");

			gardenNr=null;gardenNrFrom=null;gardenNrTo=null;farmZone=null;thisTitle=null;
			totalproduct=null;totalInQue=null;
			lastViewedTime=null;BeginTime=null;zoneTimes=null;rowTime=null;i=null;
		}

		function updatePflanzeBox(gardenNrFrom, gardenNrTo){//--- function written by Jan-Hans
			//GM_log("Begin updatePflanzeBox :" + gardenNrFrom + " : " + gardenNrTo);
			if (!gardenNrFrom && gardenNrFrom!=0 && !gardenNrTo){ gardenNrFrom=0; gardenNrTo=6;}
			if (!gardenNrFrom) gardenNrFrom=0;
			if (!gardenNrTo) gardenNrTo = gardenNrFrom;

			for (var gardenNr = gardenNrFrom; gardenNr <= gardenNrTo; gardenNr++){
				//GM_log("Do updatePflanzeBox :" + gardenNr + " farmZone : " + farmZone);
				var farmZone = getFarmZone(gardenNr);
				if ($("divAutoPflanzeBox"+gardenNr)){removeElement($("divAutoPflanzeBox"+gardenNr));}
				if (valQueBoxInfo[farmZone][2] && valUseQueueList && $("divAutoPflanze"+gardenNr)){drawPflanzeBox(gardenNr);}
			}
			//GM_log("End updatePflanzeBox :" + gardenNrFrom + " : " + gardenNrTo );
			updateQueueList(gardenNrFrom, gardenNrTo);
			gardenNr=null;gardenNrFrom=null;gardenNrTo=null;farmZone=null;
		}

		function drawPflanzeIcon(gardenNrFrom, gardenNrTo){
			//GM_log("Begin drawPflanzeIcon :" + gardenNrFrom + " : " + gardenNrTo);
			if (!gardenNrFrom && gardenNrFrom!=0 && !gardenNrTo){ gardenNrFrom=0; gardenNrTo=6;}
			if (!gardenNrFrom) gardenNrFrom=0;
			if (!gardenNrTo) gardenNrTo = gardenNrFrom;

			for (var gardenNr = gardenNrFrom; gardenNr <= gardenNrTo; gardenNr++){
				newdiv = createElement("div",{id:"divAutoPflanze"+gardenNr,style:"position:absolute;top:100px;left:90px;border:2px solid red;-moz-border-radius:10px;"},$("zone"+gardenNr));
				newdiv.addEventListener("click", function(){
					var gardenNr = parseInt(this.id.replace("divAutoPflanze",""),10);
					if (valUseQueueList) {
						drawPflanzeBox(gardenNr);
						updateQueueList(gardenNr);
					} else {
						drawChooseBox(gardenNr);
					}
				},false);
			}
			gardenNr=null;gardenNrFrom=null;gardenNrTo=null;newdiv=null;
			//GM_log("End drawPflanzeIcon" );
		}

		function drawCloseAllQueue(){
			if (!$("imgCloseQueueLists") && valUseQueueList){
				newimg = createElement("img",{id:"imgCloseQueueLists","class":"link",src:"http://dqt9wzym747n.cloudfront.net/pics/buildingdestructbutton_off.png"},$("divBeraterButtons"));
				newimg.addEventListener("mouseover",function(){
					this.src = "http://dqt9wzym747n.cloudfront.net/pics/buildingdestructbutton_on.png";
					$("divBeraterButtonsInfo").innerHTML=texte["QueCLoseAll"];
					$("divBeraterButtonsInfo").style.display="block";
				},false);
				newimg.addEventListener("mouseout",function(){
					this.src = "http://dqt9wzym747n.cloudfront.net/pics/buildingdestructbutton_off.png";
					$("divBeraterButtonsInfo").style.display="none";
				},false);
				newimg.addEventListener("click",function(){
					for (v=0;v<19;v++){ valQueBoxInfo[v][2] = false;}
					updatePflanzeBox();
				},false);
				newimg=null;
			}
		}


		function countVisGlasses(){
			canddiv = $("rackItems").getElementsByClassName("glass");
			var c=0;
			for (var v=0;v<canddiv.length;v++){ if (canddiv[v].style.display!="none"){ c++;}}
			return c;
		}

		function initauto(glassNr){
			//GM_log("Begin initauto :"+glassNr + " : " + typeof glassNr);
			if (unsafeWindow.selected==glassNr){
				if ($("autoplantbutton"+gartenNr)){ autoprem(); }
				else { auto(1); }
			} else {
				if ($("glass"+glassNr)){
					if (countVisGlasses()>0){
						if ($("glass"+glassNr).style.display!="none"){
							if ($("t"+glassNr).innerHTML=="0"){
								window.setTimeout(function(){initauto(1);},tmin2); //Glass leer!Nimm Getreide
							} else {
								click($("glass"+glassNr)); //Glass gefunden
								window.setTimeout(function(){initauto(glassNr);},tmin2);
							}
						} else {
							unsafeWindow.updateRack((1+parseInt(unsafeWindow._currRack,10))%unsafeWindow.userracks); //Regal wechseln
							window.setTimeout(function(){initauto(glassNr);},tmin2);
						}
					} else {
						window.setTimeout(function(){initauto(glassNr);},tmin2); //Regal nicht geladen
					}
				} else {
					if (parseInt(unsafeWindow.userracks,10) != 1+parseInt(unsafeWindow._currRack,10)){
						unsafeWindow.updateRack((1+parseInt(unsafeWindow._currRack,10))%unsafeWindow.userracks); //weiteres Regal laden
						window.setTimeout(function(){initauto(glassNr);},tmin2);
					} else {
						window.setTimeout(function(){initauto(1);},tmin2); //Pflanze fehlt!Nimm Getreide
					}
				}
			}
			//GM_log("End initauto :"+glassNr + " : " + typeof glassNr);
		}

		function auto(v){
			//GM_log("Begin auto :"+v);
			busy=true;
			if (unsafeWindow.mode!="0") click($("anpflanzen"));
			if ($("busydiv")){
				if (v<121){
					$("busydiv").innerHTML = texte["pflanze"];
					if (v%12==1){ linecount = 0; }
					var frei = true;
					if (unsafeWindow.garten_kategorie[v] && ((unsafeWindow.garten_kategorie[v]!="v") || (unsafeWindow.garten_zeit[v]!="0"))){ frei = false; }
					else {
						if (unsafeWindow.global_x == "2"){
							if (v%12==0){ frei = false; }
							else {
								w = v+1;
								if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ frei = false; }
								else {
									if (unsafeWindow.global_y == "2"){
										if (v>108){ frei = false; }
										else {
											w = v+12;
											if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ frei = false; }
											else {
												w = v+13;
												if (unsafeWindow.garten_kategorie[w] && ((unsafeWindow.garten_kategorie[w]!="v") || (unsafeWindow.garten_zeit[w]!="0"))){ frei = false; }
											}
										}
									}
								}
							}
						}
					}

					if (frei){
						window.setTimeout(function(){
							click($("f"+v));
							v+=parseInt(unsafeWindow.global_x,10);
							linecount += parseInt(unsafeWindow.global_x,10);
							if (linecount>11){ v += 12*(parseInt(unsafeWindow.global_y,10)-1); }
							auto(v);
						},getRandom(tmin,tmax));
					} else auto(v+1);
				} else {
					if (ernte()){
						window.setTimeout(function(){
							auto(1);
						},getRandom(tmin2,tmax2));
					} else {
						$("busydiv").innerHTML = texte["warte"];
							if (valUseGeneral){
								setNextAutoPflanze(0);
								updateQueueList(0);
							} else {
								setNextAutoPflanze(gartenNr);
								updateQueueList(gartenNr);
							}
							window.setTimeout(function(){
							if ($("tooltipwaterall")){
								click($("waterall").firstChild);
								removeElement($("busydiv"));
								if (valBot){
									window.setTimeout(function(){
										click($("gardencancel").firstChild);//Garten schliessen
										busy=false;
										$("logoutbutton").innerHTML = "Busy:"+busy;
										try {clearInterval(restartBot);} catch(err){}
									},getRandom(tmin2,tmax2));
								}
							} else { autogiess(1); }
						},getRandom(tmin2,tmax2));
					}
				}
			} else {
				busy=false;
				try {clearInterval(restartBot);} catch(err){}
				valBot = false;
				$("inputvalBot").checked = false;
			}
			//GM_log("Begin auto :"+ v);
		}

		function autogiess(v){
			//GM_log("Begin autogiess :"+v);
			busy=true;
			if (unsafeWindow.mode!="2") click($("giessen"));
			if ($("busydiv")){
				$("busydiv").innerHTML = texte["giesse"];
				if (v<121){
					if ((unsafeWindow.garten_kategorie[v]=="v") && (unsafeWindow.garten_zeit[v]!="0") && ((unsafeWindow.garten_wasser[v]=="0")||(unsafeWindow.garten_wasser[v]=="")))  {
						window.setTimeout(function(){
							click($("f"+v));
							autogiess(v+parseInt(unsafeWindow.garten_max_x[v],10));
						},getRandom(tmin,tmax));
					} else autogiess(v+1);
				} else {
					if (ernte()){
						window.setTimeout(function(){
							auto(1);
						},getRandom(tmin2,tmax2));
					} else {
						click($("anpflanzen"));
						removeElement($("busydiv"));
						if (valBot){
							window.setTimeout(function(){
								click($("gardencancel").firstChild);//Garten schliessen
								busy=false;
								$("logoutbutton").innerHTML = "Busy:"+busy;
								try {clearInterval(restartBot);} catch(err){}
							},getRandom(tmin2,tmax2));
						}
					}
				}
			} else {
				click($("anpflanzen"));
				busy=false;
				try {clearInterval(restartBot);} catch(err){}
				valBot = false;
				$("inputvalBot").checked = false;
			}
			//GM_log("End autogiess :"+v);
		}

		function autofutter(sorte){
			//GM_log("Begin autofutter :"+sorte);
			busy=true;
			if ($("errorboxinner").style.display=="block"){
				removeElement($("busydiv"));
				click($("errorboxfooterinner").firstChild.firstChild);
			}
			if ($("busydiv")){
				$("busydiv").innerHTML = texte["fuettere"];
				unsafeWindow.feedAnimals(sorte);
				if (valBot && (!valTiereSatt[unsafeWindow.locationinfo[6]])){ removeElement($("busydiv")); }
				window.setTimeout(function(){
					autofutter(sorte);
				},3*getRandom(tmin,tmax));
			} else {
				if (valBot){
					window.setTimeout(function(){
						click($("cancelscreen").firstChild);//Stall schliessen
						busy=false;
						$("logoutbutton").innerHTML = "Busy:"+busy;
						try {clearInterval(restartBot);} catch(err){}
					},getRandom(tmin2,tmax2));
				}
			}
			//GM_log("End autofutter :"+sorte);
		}

		function autoprem(){
			//GM_log("Begin autoprem");
			busy=true;
			$("busydiv").innerHTML = "Premium "+texte["pflanze"];
			var leereFelder=0;
			for(var v=1;v<=120;v++){
				if(unsafeWindow.garten_kategorie[v]=="v"){
					if (!unsafeWindow.garten_prod[v]){ leereFelder++; }
				} else {
					if ((unsafeWindow.garten_kategorie[v]!="z") && (unsafeWindow.garten_kategorie[v]!="u")) leereFelder++;
				}
			}
		//GM_log(leereFelder);
			if (leereFelder>0){
				click($("gardencancel").firstChild);
				window.setTimeout(function(){
					click($("autoplantbutton"+gartenNr).parentNode);
					window.setTimeout(function(){
						click($("commitboxfooter").firstChild);
						window.setTimeout(function(){
							if (valUseGeneral){
								setNextAutoPflanze(0);
								updateQueueList(0);
							} else {
								setNextAutoPflanze(gartenNr);
								updateQueueList(gartenNr);
							}
							click($("waterall").firstChild);
							window.setTimeout(function(){
								removeElement($("busydiv"));
								click($("gardencancel").firstChild);
								busy=false;
								$("logoutbutton").innerHTML = "Busy:"+busy;
								try {clearInterval(restartBot);} catch(err){}
							},getRandom(tmin2,tmax2));
						},getRandom(tmin2,tmax2));
					},getRandom(tmin2,tmax2));
				},getRandom(tmin2,tmax2));
			} else {
				click($("waterall").firstChild);
				window.setTimeout(function(){
					removeElement($("busydiv"));
					click($("gardencancel").firstChild);
					busy=false;
					$("logoutbutton").innerHTML = "Busy:"+busy;
					try {clearInterval(restartBot);} catch(err){}
				},getRandom(tmin2,tmax2));
			}
			//GM_log("End autoprem");
		}

		function autofutterprem(sorte){
			//GM_log("Begin autofutterprem :"+sorte);
			busy=true;
			$("busydiv").innerHTML = texte["futterautomat"];
			window.setTimeout(function(){
				unsafeWindow.commitSubmitFillFood(gartenNr,sorte);
				window.setTimeout(function(){
					if (valTiereSatt[unsafeWindow.locationinfo[6]]) $("feedamount").value="216";
					keyup($("feedamount"));
					window.setTimeout(function(){
						click($("commitboxfooterinner").firstChild);
						window.setTimeout(function(){
							removeElement($("busydiv"));
							click($("cancelscreen").firstChild);
							busy=false;
							$("logoutbutton").innerHTML = "Busy:"+busy;
							try {clearInterval(restartBot);} catch(err){}
						},getRandom(tmin2,tmax2));
					},getRandom(tmin2,tmax2));
				},getRandom(tmin2,tmax2));
			},getRandom(tmin2,tmax2));
			//GM_log("End autofutterprem :"+sorte);
		}

		function autofabrik(){
			//GM_log("Begin autofabrik");
			busy=true;
			$("busydiv").innerHTML = texte["fabrikautomat"];
			window.setTimeout(function(){
				click($("advancedproductionbutton"+unsafeWindow.locationinfo[6]).firstChild);
				window.setTimeout(function(){
					click($("commitboxfooterinner").firstChild);
					window.setTimeout(function(){
						removeElement($("busydiv"));
						click($("cancelscreen").firstChild);
						busy=false;
						$("logoutbutton").innerHTML = "Busy:"+busy;
						try {clearInterval(restartBot);} catch(err){}
					},getRandom(tmin2,tmax2));
				},getRandom(tmin2,tmax2));
			},getRandom(tmin2,tmax2));
			//GM_log("Begin autofabrik");
		}

		function ernte(){
			//GM_log("Begin ernte");
			try{
			if ($("gardenmaincontainer").style.display=="block"){ zoneTyp = 1; }
			if ($("innermaincontainer").style.display=="block"){ zoneTyp = feldtyp[unsafeWindow.locationinfo[6]]; }
		//GM_log("zoneTyp"+zoneTyp);
			switch (zoneTyp){
				case 1: {
					var ernten = false;
					var NowServer = parseInt(unsafeWindow.Zeit.Server,10);
					for(var v=1;v<=120;v++){
		//GM_log(v);
						if ((unsafeWindow.garten_kategorie[v]=="v") && (parseInt(unsafeWindow.garten_zeit[v],10)<NowServer)){ernten=true;break;}
					}
					if (ernten){click($("cropall").firstChild); return true;}
					else {return false;}
					break; }
				case 2: {
					if ($("commitboxcrop").style.display=="block"){click($("commitboxfootercrop").firstChild); return true;}
					else {return false;}
					break;}
				case 3: {
					if ($("commitboxcrop").style.display=="block"){click($("commitboxfootercrop").firstChild); return true;}
					else {return false;}
					break;}
				default: return false;
			}
			} catch(err){return false;}
			//GM_log("End ernte do nothing");
		}

		function start_bot(){
			try {window.clearInterval(restartBot);} catch (err){}
			try {window.clearInterval(intBot);} catch (err){}
			if (valBot){
				click($("GMdontcrop"));
				restartBot = window.setInterval(function (){
					busy = false;
					$("logoutbutton").innerHTML = "Busy:"+busy;
					if ($("busydiv")){ removeElement($("busydiv")); }
				},240*tmax2);
				intBot = window.setInterval(function (){
					if (!busy){ run_bot(); }
				},getRandom(tmin2,tmax2));
			} else {
				click($("GMdocrop"));
			}
		}

		function run_bot(){
			//GM_log("Begin run_bot");
			busy=true;
			try{
			$("logoutbutton").innerHTML = "Busy:"+busy;
			// ungegossenes Feld oeffnen
			for (var v=1;v<7;v++){
				if ($("imgNeedWater"+v)){
					$("zonetime"+v).innerHTML=texte["fertig"]+"!";
					document.title = texte["fertig"];
				}
			}
			// Fertige Zone oeffnen
			if (document.title.search(texte["fertig"])!=-1){
				var found = false;
				for (var v=1;v<7;v++){
					if ($("zonetime"+v) && (($("zonetime"+v).innerHTML==texte["fertig"]+"!") || ($("zonetime"+v).innerHTML=="---"))){
						found = true;
						break;
					}
				}
				// Farmwechsel
				if (!found){
					if (unsafeWindow.farm == "1"){ farmDirection="r"; }
					if (unsafeWindow.farm == unsafeWindow.farmamount){ farmDirection="l"; }
					click($("farmpassage_"+farmDirection+unsafeWindow.farm).firstChild);
					window.setTimeout(function(){ run_bot(); },getRandom(tmin2,tmax2));
				} else {
					gartenNr = v;
					farmZone = getFarmZone(gartenNr);
					if (autoPflanze[farmZone][0][0]=="66"){
						if (!unsafeWindow.run[gartenNr]) unsafeWindow.run[v]="1";
						unsafeWindow.time[gartenNr] = 86399; //== 23:59:59
						busy=false;
						$("logoutbutton").innerHTML = "Busy:"+busy;
						try {clearInterval(restartBot);} catch(err){}
					} else {
						unsafeWindow.jsTimeStamp = unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
						click($("zone"+gartenNr).firstChild.firstChild);
						window.setTimeout(function(){
							ernte();
							window.setTimeout(function(){
								if ($("gardenmaincontainer").style.display=="block"){ //garden
									newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
									newdiv.addEventListener("click",function(){removeElement(this);},false);
									initauto(autoPflanze[farmZone][0][0]);
								} else if ($("innermaincontainer").style.display=="block"){ //farm
									newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
									newdiv.addEventListener("click",function(){removeElement(this);},false);
									var currFeld = unsafeWindow.locationinfo[6];
									if (feldtyp[currFeld] == 2){
										var v = 2*currFeld-3;
										if (!valTiereFutter[currFeld]){ v++; }
										if (unsafeWindow.premium || (parseInt($("levelnum").innerHTML,10)<10)){ autofutterprem(v); }
										else { autofutter(v); }
									}
									if (feldtyp[currFeld] == 3){ autofabrik(); }
								} else {
									busy=false;
									$("logoutbutton").innerHTML = "Busy:"+busy;
									try {clearInterval(restartBot);} catch(err){}
								}
							},getRandom(tmin2,tmax2));
						},getRandom(tmin2,tmax2));
					}
				}
			} else {
				if ($("gardenmaincontainer").style.display=="block"){ click($("gardencancel").firstChild);	}
				if ($("innermaincontainer").style.display=="block"){ click($("cancelscreen").firstChild); }
				busy=false;
				$("logoutbutton").innerHTML = "Busy:"+busy;
				try {clearInterval(restartBot);} catch(err){}

				//umloggen
				if (($("sprcontent").firstChild.firstChild.href) && ($("sprcontent").firstChild.firstChild.href.search("dologin")!=-1)){ document.location.href = $("sprcontent").firstChild.firstChild.href; }
			}
			} catch(err){GM_log("boterror "+err);busy=false;}
			//GM_log("End run_bot");
		}

		function buildInfoPanel(){
			function closeInfoPanel(){
				$("infoPanel").setAttribute("name","");
				$("infoPanel").style.display = "none";
				if ((top.document.getElementById("innermaincontainer").style.display!="block") &&
					(top.document.getElementById("gardenmaincontainer").style.display!="block") &&
					(top.document.getElementById("multiframe").style.display!="block") &&
					(top.document.getElementById("cart").style.display!="block")) top.document.getElementById("transp").style.display="none";
			}
			if("automatOptions"==$("infoPanel").getAttribute("name")){ closeInfoPanel(); return;}

			$("infoPanel").setAttribute("name","automatOptions");
			$("infoPanel").innerHTML = "";
			$("infoPanel").style.display = "block";
			$("transp").style.display = "block";
			divInfo = createElement("div",{"class":"tnormal",style:"width:560px;height:560px;margin:10px;overflow:auto;"},$("infoPanel"));
			newimg = createElement("img",{"class":"link",src:"http://dqt9wzym747n.cloudfront.net/pics/close.jpg",style:"position:absolute;top:10px;right:10px;width: 20px; height: 20px;"},$("infoPanel"));
			newimg.addEventListener("click",closeInfoPanel,false);

			newtable = createElement("table",{style:"width:100%",border:"1"},divInfo);
			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center",width:"120px"},newtr);
			inp = createElement("input",{id:"inputvalAutoPflanz","class":"link",type:"checkbox",checked:valAutoPflanz},newtd);
			inp.addEventListener("click",function(){valAutoPflanz=$("inputvalAutoPflanz").checked;GM_setValue(lng+"_"+server+"_"+username+"_valAutoPflanz", valAutoPflanz);},false);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set1"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputvalAutoFutter","class":"link",type:"checkbox",checked:valAutoFutter},newtd);
			inp.addEventListener("click",function(){valAutoFutter=$("inputvalAutoFutter").checked;GM_setValue(lng+"_"+server+"_"+username+"_valAutoFutter", valAutoFutter);},false);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set2"];

			//*****
			newtr = createElement("tr",{style:"line-height:5px;"},newtable);
			newtd = createElement("td",{colspan:"3"},newtr);

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center",width:"40"},newtr);
			inp = createElement("input",{id:"inputvalUseQueList","class":"link",type:"checkbox",checked:valUseQueueList},newtd);
			inp.addEventListener("click",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_valUseQueueList", (valUseQueueList=this.checked));
				drawCloseAllQueue();
				updatePflanzeBox();
			},false);
			newtd = createElement("td","",newtr);
			newtd.innerHTML = texte["set11b"];
			newtd = createElement("td",{rowspan:"2"},newtr);

			inp = createElement("button",{id:"inputDeleteAllQueueData","class":"link",style:"width:100px;margin:8px;padding:3px;"},newtd,texte["set12a"]);
			inp.addEventListener("click",function(){
				this.disabled = true;
				for (var v=0;v<19;v++) autoPflanze[v] = [[66, 1, 0]];
				GM_setValue(lng+"_"+server+"_"+username+"_autoPflanze",implode(autoPflanze));
				for (var v=0;v<19;v++) valQueBoxInfo[v] = [0, 0, false, false, false, 0];
				GM_setValue(lng+"_"+server+"_"+username+"_valQueBoxInfo",implode(valQueBoxInfo));
				updateQueueList();
				alert(texte["set12b"]);
				this.disabled = false;
			},false);
			inp.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
			inp.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputvalUseGeneral","class":"link",type:"checkbox",checked:valUseGeneral},newtd);
			inp.addEventListener("click",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_valUseGeneral", (valUseGeneral=this.checked));
				updatePflanzeBox();
			},false);
			newtd = createElement("td","",newtr);
			newtd.innerHTML = texte["set11c"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputvalUseDragging","class":"link",type:"checkbox",checked:valUseDragging},newtd);
			inp.addEventListener("click",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_valUseDragging", (valUseDragging=this.checked));
				updatePflanzeBox();
			},false);
			newtd = createElement("td","",newtr);
			newtd.innerHTML = texte["set13"];
			newtd = createElement("td","",newtr);

			inp = createElement("button",{id:"inputDeleteAllPositionData","class":"link",style:"width:100px;margin:8px;padding:3px;"},newtd,texte["set14a"]);
			inp.addEventListener("click",function(){
				this.disabled = true;
				for (var v=0;v<19;v++) valQueBoxInfo[v] = [0, 0, false, valQueBoxInfo[v][3], valQueBoxInfo[v][4], valQueBoxInfo[v][5]];
				GM_setValue(lng+"_"+server+"_"+username+"_valQueBoxInfo",implode(valQueBoxInfo));
				updatePflanzeBox();
				alert(texte["set14b"]);
				this.disabled = false;
			},false);
			inp.addEventListener("mouseover",function(){this.style.backgroundColor="#cc9";},false);
			inp.addEventListener("mouseout",function(){this.style.backgroundColor="";},false);

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputvalShowQueueTime","class":"link",type:"checkbox",checked:valShowQueueTime},newtd);
			inp.addEventListener("click",function(){
				GM_setValue(lng+"_"+server+"_"+username+"_valShowQueueTime", (valShowQueueTime=this.checked));
				updatePflanzeBox();
			},false);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set15"];

			//*****
			newtr = createElement("tr",{style:"line-height:5px;"},newtable);
			newtd = createElement("td",{colspan:"3"},newtr);

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputtmin",value:tmin,size:"5px",style:"background-color:transparent;color:white;"},newtd);
			inp.addEventListener("change",function(){
				if (/^(0|[1-9]\d*)$/.test(this.value) && this.value < tmax){tmin=this.value;
				}else {this.value=tmin;}
				GM_setValue("tmin", tmin);
			},false);
			newspan = createElement("span","",newtd);
			newspan.innerHTML = "ms";
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set3"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputtmax",value:tmax,size:"5px",style:"background-color:transparent;color:white;"},newtd);
			inp.addEventListener("change",function(){
				if (/^(0|[1-9]\d*)$/.test(this.value) && this.value > tmin){tmax=this.value;
				}else {this.value=tmax;}
				GM_setValue("tmax", tmax);
			},false);
			newspan = createElement("span","",newtd);
			newspan.innerHTML = "ms";
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set4"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputtmin2",value:tmin2,size:"5px",style:"background-color:transparent;color:white;"},newtd);
			inp.addEventListener("change",function(){
				if (/^(0|[1-9]\d*)$/.test(this.value) & this.value < tmax2){tmin2=this.value;
				}else {this.value=tmin2;}
				GM_setValue("tmin2", tmin2);
			},false);
			newspan = createElement("span","",newtd,"ms");
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set5"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			inp = createElement("input",{id:"inputtmax2",value:tmax2,size:"5px",style:"background-color:transparent;color:white;"},newtd);
			inp.addEventListener("change",function(){
				if (/^(0|[1-9]\d*)$/.test(this.value) && this.value > tmin2){tmax2=this.value;
				}else {this.value=tmax2;}
				GM_setValue("tmax2", tmax2);
			},false);
			newspan = createElement("span","",newtd,"ms");
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set6"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{id:"inputvalTiereSatt2","class":"link",type:"checkbox",checked:valTiereSatt[2]},newdiv);
			inp.addEventListener("click",function(){valTiereSatt[2]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereSatt", valTiereSatt.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["satt"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter2",checked:valTiereFutter[2]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[2]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter1a"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter2",checked:!valTiereFutter[2]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[2]=!this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter1b"]);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set7"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{checked:valTiereSatt[3],id:"inputvalTiereSatt3","class":"link",type:"checkbox"},newdiv);
			inp.addEventListener("click",function(){valTiereSatt[3]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereSatt", valTiereSatt.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["satt"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter3",checked:valTiereFutter[3]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[3]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter2a"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter3",checked:!valTiereFutter[3]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[3]=!this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter2b"]);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set8"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{id:"inputvalTiereSatt4","class":"link",type:"checkbox",checked:valTiereSatt[4]},newdiv);
			inp.addEventListener("click",function(){valTiereSatt[4]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereSatt", valTiereSatt.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["satt"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter4",checked:valTiereFutter[4]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[4]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter3a"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter4",checked:!valTiereFutter[4]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[4]=!this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter3b"]);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set9"];

			newtr = createElement("tr",{style:"line-height:18px;"},newtable);
			newtd = createElement("td",{align:"center"},newtr);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{id:"inputvalTiereSatt5","class":"link",type:"checkbox",checked:valTiereSatt[5]},newdiv);
			inp.addEventListener("click",function(){valTiereSatt[5]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereSatt", valTiereSatt.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["satt"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter5",checked:valTiereFutter[5]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[5]=this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter4a"]);
			newdiv = createElement("div","",newtd);
			inp = createElement("input",{"class":"link",type:"radio",name:"futter5",checked:!valTiereFutter[5]},newdiv);
			inp.addEventListener("click",function(){valTiereFutter[5]=!this.checked;GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));},false);
			newspan = createElement("span","",newdiv,texte["futter4b"]);
			newtd = createElement("td",{colspan:"2"},newtr);
			newtd.innerHTML = texte["set10"];

			divInfo=null;newimg=null;newtable=null;newtr=null;newtd=null;inp=null;newspan=null;
		}

		// ***************************************************************************************************

		try{
			username = top.document.getElementById("GMusername").value;
			all  = document.getElementsByTagName("body")[0];
			candtable  = document.getElementsByTagName("table");
			var busy=false;
			var linecount = 0;
			var gartenNr = 1;
			var keygarten = /parent.cache_me\((.*?),/;
			var farmDirection = "r";
			var zoneProdukt = ["","1","9","10","11","12","","25","27","28","30"];
			autoPflanze=new Array(); //[farmZone][QueNr][0]=product number, [1]=number to grow, [2]=number grown in loop modus
			try{
				autoPflanze = explode(GM_getValue(lng+"_"+server+"_"+username+"_autoPflanze",""));
			}catch(err){
				try{
					autoPflanze = explode("[[[" + GM_getValue(lng+"_"+server+"_"+username+"_autoPflanze","").replace(/~/g,",").replace(/:/g,"],[").replace(/\|/g,"]],[[") + "]]]");
					for (i=0;i<19;i++){for (k=0;k<autoPflanze[i].length;k++){if (!autoPflanze[i][k][2]){ autoPflanze[i][k][2] = 0;}}}
				} catch (err){
					autoPflanze=[[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]],[[66,1,0]]];
				}
				if (!autoPflanze[0] || autoPflanze[0] == "") autoPflanze[0] = [[66,1,0]];
				GM_setValue(lng+"_"+server+"_"+username+"_autoPflanze",implode(autoPflanze));
			}
			for (i=0;i<19;i++){for (k=0;k<autoPflanze[i].length;k++){for (l=0;l<autoPflanze[i][k].length;l++){autoPflanze[i][k][l] = parseInt(autoPflanze[i][k][l],10);}}}
			GM_log("Autopflanze" + autoPflanze);
			
			valAutoPflanz = !!GM_getValue(lng+"_"+server+"_"+username+"_valAutoPflanz",true);
			valAutoFutter = !!GM_getValue(lng+"_"+server+"_"+username+"_valAutoFutter",true);
			valUseQueueList = !!GM_getValue(lng+"_"+server+"_"+username+"_valUseQueueList",false);
			valUseGeneral = !!GM_getValue(lng+"_"+server+"_"+username+"_valUseGeneral",false);
			valUseDragging = !!GM_getValue(lng+"_"+server+"_"+username+"_valUseDragging",false);
			valShowQueueTime = !!GM_getValue(lng+"_"+server+"_"+username+"_valShowQueueTime",true);

			if ((unsafeWindow.top.premium=="1") || (parseInt(top.document.getElementById("levelnum").innerHTML,10)<10)) valAutoFutter = false;
			tmin = parseInt(GM_getValue("tmin",300),10);
			if (isNaN(tmin)){tmin=300;GM_setValue("tmin", tmin);}
			tmax = parseInt(GM_getValue("tmax",700),10);
			if (isNaN(tmax)){tmax=700;GM_setValue("tmax", tmax);}
			tmin2 = parseInt(GM_getValue("tmin2",2000),10);
			if (isNaN(tmin2)){tmin2=2000;GM_setValue("tmin2", tmin2);}
			tmax2 = parseInt(GM_getValue("tmax2",4000),10);
			if (isNaN(tmax2)){tmax2=4000;GM_setValue("tmax2", tmax2);}
			valTiereSatt = new Array();
			try {
				arr = GM_getValue(lng+"_"+server+"_"+username+"_valTiereSatt","").split("|");
				for (var v=2;v<6;v++) valTiereSatt[v]=(arr[v]=="true" || arr[v]==true);
			} catch(err){
				for (var v=2;v<6;v++) valTiereSatt[v]=true;
				GM_setValue(lng+"_"+server+"_"+username+"_valTiereSatt", valTiereSatt.join("|"));
			}
			valTiereFutter = new Array();
			try {
				arr = GM_getValue(lng+"_"+server+"_"+username+"_valTiereFutter","").split("|");
				for (var v=2;v<6;v++) valTiereFutter[v]=(arr[v]=="true" || arr[v]==true);
			} catch(err){
				for (var v=2;v<6;v++) valTiereFutter[v]=true;
				GM_setValue(lng+"_"+server+"_"+username+"_valTiereFutter", valTiereFutter.join("|"));
			}
			valMouseXY = new Array();
			valMouseXY = ["",0,0,0,0];
			valQueBoxInfo = new Array();
		//valQueBoxInfo[farmZone][0]=X Coordinate, [1]=Y-Coordinate, [2]=visible, [3]=Repeat, [4]=Shuffle, [5]=Loop times (todo)
			try	{
				valQueBoxInfo = explode(GM_getValue(lng+"_"+server+"_"+username+"_valQueBoxInfo",""));
				for (var v=0;v<19;v++){valQueBoxInfo[v] = [parseInt(valQueBoxInfo[v][0],10), parseInt(valQueBoxInfo[v][1],10),(valQueBoxInfo[v][2]=="true" || valQueBoxInfo[v][2]==true),(valQueBoxInfo[v][3]=="true" || valQueBoxInfo[v][3]==true),(valQueBoxInfo[v][4]=="true" || valQueBoxInfo[v][4]==true),parseInt(valQueBoxInfo[v][5],10)];}
			} catch(err) {
				for (var v=0;v<19;v++) {valQueBoxInfo[v] = [0, 0, false, false, false, 0];}
				GM_setValue(lng+"_"+server+"_"+username+"_valQueBoxInfo",implode(valQueBoxInfo));
			}
			
			var productInfo = new Array(new Object());
			productInfo[1]={"name":"Graan","time":20,"score":3};
			productInfo[2]={"name":"Mais","time":45,"score":17};
			productInfo[3]={"name":"Klaver","time":45,"score":10};
			productInfo[4]={"name":"Koolzaad","time":90,"score":44};
			productInfo[5]={"name":"Knollen","time":120,"score":64};
			productInfo[6]={"name":"Kruiden","time":240,"score":128};
			productInfo[7]={"name":"Zonnebloem","time":480,"score":300};
			productInfo[8]={"name":"Korenbloem","time":960,"score":600};
			productInfo[9]={"name":"Eieren","time":240,"score":750};
			productInfo[10]={"name":"Melk","time":720,"score":950};
			productInfo[11]={"name":"Wol","time":1440,"score":1540};
			productInfo[12]={"name":"Honing","time":2880,"score":2350};
			productInfo[17]={"name":"Wortel","time":15,"score":1};
			productInfo[18]={"name":"Komkommer","time":90,"score":7};
			productInfo[19]={"name":"Radijs","time":240,"score":24};
			productInfo[20]={"name":"Aardbei","time":480,"score":42};
			productInfo[21]={"name":"Tomaten","time":600,"score":63};
			productInfo[22]={"name":"Ui","time":500,"score":52};
			productInfo[23]={"name":"Spinazie","time":800,"score":88};
			productInfo[24]={"name":"Bloemkool","time":720,"score":92};
			productInfo[25]={"name":"Mayonaise","time":1000,"score":3100};
			productInfo[26]={"name":"Aardappel","time":780,"score":108};
			productInfo[27]={"name":"Kaas","time":2000,"score":4500};
			productInfo[28]={"name":"BolWol","time":3000,"score":5000};
			productInfo[29]={"name":"Asperge","time":950,"score":319};
			productInfo[30]={"name":"Bonbons","time":4000,"score":5400};
			productInfo[31]={"name":"Courgette","time":1000,"score":179};
			productInfo[32]={"name":"Bosbes","time":720,"score":133};
			productInfo[33]={"name":"Framboos","time":1200,"score":229};
			productInfo[34]={"name":"RodeAalbes","time":800,"score":157};
			productInfo[35]={"name":"Braam","time":2000,"score":405};
			productInfo[36]={"name":"Mirabellen","time":880,"score":733};
			productInfo[37]={"name":"Appel","time":3000,"score":2569};
			productInfo[38]={"name":"Pompoen","time":960,"score":211};
			productInfo[39]={"name":"Peer","time":4000,"score":3611};
			productInfo[40]={"name":"Kers","time":4800,"score":4444};
			productInfo[41]={"name":"Pruim","time":5500,"score":5220};
			productInfo[42]={"name":"Walnoot","time":6200,"score":6028};
			productInfo[43]={"name":"Olijf","time":6800,"score":6769};
			productInfo[44]={"name":"RodeKool","time":7200,"score":1833};
			

			newdiv = createElement("div",{id:"divChooseAutoPflanze",style:"position:absolute;top:100px;left:100px;width:380px;background-color:#b8a789;border:2px solid black;-moz-border-radius: 10px;z-index:10;display:none;"},$("garten_komplett"));
			newdiv.addEventListener("click",function(){this.style.display="none";},false);
			var chooseAutoPflanzePos=0;

			if (document.location.href.indexOf("developer")!= -1 ){
				var valDeveloper = true;
				newdiv = createElement("div",{id:"divDefBoxPflanze",style:"padding:4px;color:white;background-color:black;top:10px;float:right;border:1px solid red;"});
				all.insertBefore(newdiv,$("upsimtoolbar"));
				newdiv = createElement("div",{id:"divDefBoxInfo",style:"padding:4px;color:white;background-color:black;top:10px;float:left;border:1px solid red;"});
				all.insertBefore(newdiv,$("upsimtoolbar"));
				newdiv = createElement("div",{id:"divPrintArray",style:"padding:4px;color:white;background-color:black;top:10px;float:left;border:1px solid red;"});
				all.insertBefore(newdiv,$("upsimtoolbar"));
				//$("divPrintArray").innerHTML = print_r(productInfo);
			}
			

			newdiv = createElement("div",{id:"zone0",style:"position:absolute;top:45px;left:-80px;width:135px;height:135px;z-index:3;"});
			$("buildingmain").insertBefore(newdiv,$("zone1"));

			GM_addStyle("#buildinginfo0, #buildinginfo1, #buildinginfo2, #buildinginfo3, #buildinginfo4, #buildinginfo5, #buildinginfo6 {top:52px; !important;}");
			GM_addStyle(".queueBox {z-Index:5;position:absolute;text-align:center;display:none;background-color: #b8a789;padding: 3px 0px 3px 0px;position:absolute;border:2px solid black;-moz-border-radius:10px;}");
			GM_addStyle(".queueBoxerGeneral, .queueBoxerZone {width:100%;overflow:hidden;overflow-y:auto;border-top:1px solid black;border-bottom:1px solid black}");
			GM_addStyle(".queueBoxerGeneral {max-height:280px;}");
			GM_addStyle(".queueBoxerZone {max-height:175px;}");
			GM_addStyle(".queueBoxSpacer {border-top:0px solid black;width:100%;padding:2px 0px 2px 0px;}");
			GM_addStyle(".queueItemBox  {width:100%;border-bottom:1px solid black;position:relative;display:block;border:1x solid black;padding:1px 0px 1px 0px;}");
			GM_addStyle(".queueTime {display:block;text-align:center;white-space:nowrap;overflow:visible;border-top:1px solid black;}");			
			GM_addStyle(".queueItemBox  .queueTime {margin-top:1px;}");
			GM_addStyle(".queueBoxTitle  {float:left;position:absolute;height:15px;width:100%;text-align:left;font-weight:bold;overflow:hidden;z-index:-1;padding-left:3px; padding-right:25px;}");
			GM_addStyle(".queueBoxClose  {float:right;top:3px;width:15px;height:15px;margin-right:1px;padding:0px 2px 2px 2px;}");
			
			GM_addStyle(".queueBoxRepeatButton,.queueBoxShuffleButton, .queueBoxRotateButton, .queueBoxAddButton {display:inline-block;width:22px;height:16px;border:1px solid #6C441E;-moz-border-radius:5px;margin:0px 1px 0px 1px;}");
			GM_addStyle(".queueBoxRepeatButton {background: #FFFFFF no-repeat 2px 0px;}");
			GM_addStyle(".queueBoxShuffleButton {background: #FFFFFF no-repeat 2px 0px;}");
			GM_addStyle(".queueBoxRotateButton {background: #FFFFFF no-repeat 3px 0px;}");
			GM_addStyle(".queueBoxAddButton  {background: #FFFFFF no-repeat 4px 1px;}");
	
			GM_addStyle(".queueItemProduct {left:0px;position:relative;border:1px solid #6C441E;-moz-border-radius:10px;margin-left:2px;}");
			GM_addStyle(".queueItemUpButton, .queueItemDownButton {left:103px;position:absolute;width:13px;height:13px;border:1px solid #6C441E;}");
			GM_addStyle(".queueItemMinButton, .queueItemPlusButton {left:35px;border:1px solid #6C441E;position:absolute;width:13px;height:13px;}"); //left:40px;
			GM_addStyle(".queueItemInputEnableNorm, .queueItemInputEnableHigh, .queueItemInputDisable {left:51px;position:absolute;height:12px;background-color:transparent;color:black;}");
			GM_addStyle(".queueItemTextInf, .queueItemTextStop  {text-align:center;vertical-align:middle;position:absolute;width:53px;color:black;}");
			GM_addStyle(".queueItemAddButton, .queueItemDeleteButton {left:85px;display:block;position:absolute;width:15px;height:15px;}");		
			GM_addStyle(".queueItemUpButton, .queueItemPlusButton , .queueItemAddButton {top:1px;}");
			GM_addStyle(".queueItemDownButton, .queueItemMinButton , .queueItemDeleteButton {top:18px;}");
			
			GM_addStyle(".queueItemUpButton {background:url("+strImages["singleArrowUp"]+") no-repeat 2px 3px #FFFFFF;}");
			GM_addStyle(".queueItemDownButton {background:url("+strImages["singleArrowDown"]+") no-repeat 2px 5px #FFFFFF;}");
			GM_addStyle(".queueItemPlusButton {background:url("+strImages["plus"]+") no-repeat #FFFFFF;}");
			GM_addStyle(".queueItemMinButton  {background:url("+strImages["minus"]+") no-repeat #FFFFFF;}");
			GM_addStyle(".queueItemInputEnableNorm {top:9px;}");
			GM_addStyle(".queueItemInputEnableHigh {top:1px;}");
			GM_addStyle(".queueItemInputDisable {top:18px;border:0px;}");
			GM_addStyle(".queueItemTextInf {left:37px;top:2px;height:20px;font-size:20px;font-weight:normal;}");
			GM_addStyle(".queueItemTextStop {left:37px;top:10px;height:20px;font-size:12px;font-weight:bold;}");

			drawCloseAllQueue();
			createElement("div",{id:"divAutomatInfoBox",style:"z-index:100;position:absolute;overflow:visible;display:none;", "class":"blackbox"},all);

//			function drawActiveComponents(){
			window.setInterval(function (){
				//GM_log("Begin check existans");
				if (unsafeWindow.userfarminfos[unsafeWindow.farm]){
					cand = keygarten.exec($("gardenarea").innerHTML);
					if (valAutoPflanz && cand && $("gardenmaincontainer").style.display=="block"){ //autoplantz button
						gartenNr = parseInt(cand[1],10);
						if ($("gardencancel").childNodes.length==1){
							newimg = createElement("img",{id:"autoplantbutton",title:texte["pflanzautomat"],"class":"link",style:"width: 25px; height: 25px;",src:"http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},$("gardencancel"));
							newimg.addEventListener("mouseover",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_on.png";},false);
							newimg.addEventListener("mouseout",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png";},false);
							newimg.addEventListener("click",function(){
								newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:10px; left: 480px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("gardenmaincontainer"));
								newdiv.addEventListener("click",function(){removeElement(this);},false);
								unsafeWindow.jsTimeStamp = unsafeWindow.Zeit.Client - unsafeWindow.Zeit.Verschiebung;
								if (unsafeWindow.mode=="2") autogiess(1);
								else auto(1);
							},false);
							newimg=null;
						}
						for (var v=1;v<121;v++) $("f"+v).setAttribute("title",v+"|kat"+unsafeWindow.garten_kategorie[v]+"|zt"+unsafeWindow.garten_zeit[v]+"|wa"+unsafeWindow.garten_wasser[v]+"|pr"+unsafeWindow.garten_prod[v]); //only for viewing
					}

					if (valAutoFutter && $("innermaincontainer").style.display=="block"){ //autofutter button
						for (var v=1;v<10;v++) {
							if ($("articleimg"+v)){
								if (!$("autoFutter"+v)){
									newimg = createElement("img",{id:"autoFutter"+v,"class":"link",style:"position:absolute;top:50px;width: 25px; height: 25px;",src:"http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png"},$("articleimg"+v).parentNode.parentNode);
									newimg.addEventListener("mouseover",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_on.png";},false);
									newimg.addEventListener("mouseout",function(){this.src="http://dqt9wzym747n.cloudfront.net/pics/autoplant_off.png";},false);
									newimg.addEventListener("click",function(){
										newdiv = createElement("div",{id:"busydiv",style:"position:absolute; top:2px; left: 503px; width:130px; height:40px; border:3px inset black; background-color:yellow; z-index:50; display:block; padding:10px; font-weight:bold"},$("innermaincontainer"));
										newdiv.addEventListener("click",function(){removeElement(this);},false);
										this.style.display="none";
										autofutter(this.id.replace("autoFutter",""));
										newdiv=null;
									},false);
									newimg=null;
								}
							}
						}
					}

					for(var v=1;v<7;v++){
						var zoneTyp = unsafeWindow.userfarminfos[unsafeWindow.farm][v]["buildingid"];
						//GM_log("loop v:" + v + " zoneType" + zoneTyp);

						if (zoneTyp=="6"){zoneTyp="0";}
						if (valUseGeneral && (!$("divAutoPflanze0"))){
							drawPflanzeIcon(0);
							updatePflanzeBox(0);
						}
						if (zoneTyp=="0"){
							if ($("divAutoPflanze"+v)){ removeElement($("divAutoPflanze"+v)); }
							if ($("divAutoPflanzeBox"+v)){ removeElement($("divAutoPflanzeBox"+v)); }
						} else if (zoneTyp=="1" && valUseGeneral){
							if ($("divAutoPflanze"+v)){ removeElement($("divAutoPflanze"+v)); }
							if ($("divAutoPflanzeBox"+v)){ removeElement($("divAutoPflanzeBox"+v));}
						} else if (zoneTyp=="1" && !valUseGeneral){
							if ($("divAutoPflanze0")){ removeElement($("divAutoPflanze0"));}
							if ($("divAutoPflanzeBox0")){ removeElement($("divAutoPflanzeBox0"));}
							if (!$("divAutoPflanze"+v)){
								drawPflanzeIcon(v);
								updatePflanzeBox(v);
							}
						} else if (!$("divAutoPflanze"+v)){
							newdiv = createElement("div",{id:"divAutoPflanze"+v,style:"position:absolute;top:100px;left:90px;border:2px solid red;-moz-border-radius:10px;"},$("zone"+v));
							newdiv.addEventListener("click",function(){
								var gardenNr = parseInt(this.id.replace("divAutoPflanze",""),10);
								var farmZone = getFarmZone(gardenNr);
								//GM_log("auto v:" + autoPflanze[farmZone][0][0]);
								autoPflanze[farmZone][0][0]= (autoPflanze[farmZone][0][0]!=66)?66:zoneProdukt[unsafeWindow.userfarminfos[unsafeWindow.farm][gardenNr]["buildingid"]];
								updateQueueList(gardenNr);
							},false);
							newimg=null;
							updateQueueList(v);
						}
					}
				}
				//GM_log("End check existans");
			},500);
//			}

			valBot = GM_getValue(lng+"_"+server+"_valBot",false);
			if (valBot==undefined){valBot=false;GM_setValue(lng+"_"+server+"_valBot", valBot);}
			inp = createElement("input",{id:"inputvalBot",type:"checkbox","class":"link",checked:valBot,title:texte["botStart"],style:"margin-left:3px;"},$("divSettings"));
			inp.addEventListener("click",function(){
				valBot=$("inputvalBot").checked;
				busy = false;
				if ($("busydiv")) removeElement($("busydiv"));
				GM_setValue(lng+"_"+server+"_valBot", valBot);
				if (valBot) this.title = texte["botStop"];
				else this.title = texte["botStart"];
				start_bot();
			},false);
			if (valBot){
				inp.title = texte["botStop"];
				start_bot();
			}

			link = createElement("button",{type:"button","class":"link2",style:"margin-left:3px;"},$("divSettings"));
			link.innerHTML = texte["automatOptionen"];
			link.addEventListener("click",function(){buildInfoPanel();},false);

	/*
			newdiv = createElement("input",{type:"button", value:"next 5 item", "class":"link2",style:"margin:2px;"},$("divSettings"));
			newdiv.addEventListener("click", function(){
				GM_log("Begin Click");
				setNextAutoPflanze(6);
				GM_log("Mid Click");
				updateQueueList(6);
				GM_log("End  Click");
			},false);

			newdiv = createElement("input",{type:"button", value:"update areas", "class":"link2",style:"margin:2px;"},$("divSettings"));
			newdiv.addEventListener("click", function(){
				updatePflanzeBox();
			},false);
	*/

			// Updatecheck
			if (!valBot){
				valLastUpdate = GM_getValue("valLastUpdate","");
				if (valLastUpdate){
					GM_xmlhttpRequest({
						method: "GET",
						url: "http://userscripts.org/scripts/source/70238.meta.js",
						onload: function(response){
							keyusoversion = /uso:version\s+(\d+)/;
							serverversion = keyusoversion.exec(response.responseText)[1];
							if (valLastUpdate!=serverversion){
								updateNode = createElement("a",{"class":"link",href:"http://userscripts.org/scripts/source/70238.user.js",style:"font-weight:bold;"});
								updateNode.innerHTML = texte["msgUpdate"];
								updateNode.addEventListener("click",function(){
									GM_setValue("valLastUpdate",serverversion);
									window.clearInterval(updateInterval);
									updateNode = null;
								},false);
								updateInterval = window.setInterval(function(){
									if(!$("sprcontent").firstChild.firstChild.href){
										$("sprcontent").firstChild.innerHTML = "";
										$("sprcontent").firstChild.appendChild(updateNode);
									}
								},1000);
							}
						}
					});
				} else {
					GM_xmlhttpRequest({
						method: "GET",
						url: "http://userscripts.org/scripts/source/70238.meta.js",
						onload: function(response){
							keyusoversion = /uso:version\s+(\d+)/;
							serverversion = keyusoversion.exec(response.responseText)[1];
							GM_setValue("valLastUpdate",serverversion);
						}
					});
				}
			}
		} catch(err){}
	}

	function do_hilfe(){
		if($("helpbody")){
			var newdiv = createElement("div",{style:"margin-top:5px;"},$("helpmenu"));
			var newa = createElement("a",{"class":"list_header"},newdiv,texte["automat"]);
			newa.addEventListener("click",function(){
				var cell = $("helpbody");
				cell.innerHTML = "";
				createElement("div",{"class":"tnormal"},cell,"<b>"+texte["automat"]+"</b><br>");
				for (var w in texte["hilfe"]){
					if (Number(w) != w) createElement("div",{"class":"tmenu"},cell,"<b>"+w+"</b>");
					createElement("p",{"class":"tmenu"},cell,texte["hilfe"][w]);
				}
			},false);
			newdiv=null;newa=null;
		} else {
			window.setTimeout(do_hilfe(),50);
		}
	}

	loc = reg.exec(document.location.href);
	var server = loc[1];
	var page = loc[2];
	var pageZusatz = loc[3];


	switch (page) {
		case "dbfehler":window.setTimeout(function(){document.location.href="http://www"+gamepage;},60000);break;
		case "wartung":	window.setTimeout(function(){document.location.href="http://www"+gamepage;},60000);break;
		case "main": init_script();break;
		case "hilfe": do_hilfe();break;
	}

},false);
