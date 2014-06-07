// ==UserScript==
// @name          Cantr Enhanced
// @namespace     http://www.cantr-mmorpg.pl/scripts
// @description   Some useful enhancements: labeling of objects, [take all] button when you pick up resources, events filter, input resources amount calculator, grouping of ships and land vehicles, note preview
// @include       http://www.cantr.net/*
// @include       http://cantr.net/*
// @include       https://cantr.net/*
// @include       https://www.cantr.net/*
// @include       cantr.net/*
// @include       *cantr.loc/*
// @include       http://test.cantr.net/*
// @grant         none
// @exclude       http://cantr.net/*?page=login*
// @include       www.cantr.net/*
// @version       2.4.0
// ==/UserScript==

var VER = '2.4.0';

/*

version 2.4.0
 - CE options available again on player page

version 2.3.0
 - compatibility with new events page changes

version 2.2.0
 - removed [all] button for objects&inventory pages

version 2.1.0
 - support for Finnish characters
 - buildings&vehicles bookmarks works again
 - removed grouping of vehicles by type (it's already done by the game)

version 2.0.0
 - ajax based object taking/dropping
 - fixed operations on many notes for taking notes from envelope

version 1.8.5
 - most of modules now work for Spanish and German characters, but interface is not translated

version 1.8.3
 - whisper receivers list is remembered between page loads
 - name on receivers list is updated when changing character name using ajax char renaming

version 1.8.2
 - fixed bug with renaming chars on events page

version 1.8.1
 - fixed bugs from 1.8.0
   - it's possible to submit text on events page using [ENTER]
   - on chrome works significantly faster
   - removing character from whisper list no longer causes issues

version 1.8.0 UNSTABLE
 - events page performance fix
 - added ajax whisper on events page
 - added rename character on events page
 - added line which shows unread events (when browser was not focused)
 - it's easier to select English language in CE options
 - removed summer time, because server will always use UTC
 - removed unused features (note preview, repair time autofill, object labels)

version 1.5.1
 - added https support

version 1.5.0
 - added import/export of private settings to text in CE options

version 1.4.1
 - events grouping a bit faster
 - change in Portuguese translation

version 1.4.0
 - fixed "select language" box on the player page

version 1.3.01
 - fix for turn time left

version 1.3.0
 - works with new cantr appearance
 - "talk to" popup works again

version 1.05.0
 - fixed notes checker, because I need it

version 1.00.5
 - fixed buildings and vehicles bookmarks

version 1.00.0
 - object and inventory pages things adjusted to new inventory and objects page

version 0.99.7
 - fixed "last 4 digits of char id" function, now character related data is saved properly

version 0.99.5
 - repair time autofill revived

version 0.99.0
 - script is revived

version 0.98.0
 - script is dead, managed to revive events page options

version 0.97.0
 - some events-related things works, events filtering will be provided by the game. Autorefreshed events are not coloured etc.


version 0.92.0
 - notes checker bugfix

version 0.90.0
 - options are on the main page, not in shop (which will be deleted soon)

version 0.79.0+1
 - take and drop all ultimate (+0.0.1 max amount to take bugfix)

version 0.76.0
 - names colors (+0.01 bugfix) (+0.02 names shortening + lesser opacity of names)

version 0.75.0
 - popup talk button on the events page (language independent)
 - new (autorefreshed) events are filtered by the script

version 0.70.32
 - roll die PL and tiny bugfix (destructive objects pulling)
 - bum bum, calculator bugfix (after some changes suggested by ProgD)
 - moar pretty [max] buttons when taking/giving resources

version 0.70.1
 - grouping events misc bugfix

version 0.70.0
 - grouping events SHOULD work for English (but I can't guarantee that)
 - summer time option in the Shop (disable it to have proper ticks information if something's wrong)

version 0.69.1
 - grouping events bugfix

version 0.69.0 
 - grouping events (works only for PL for now, very professional translation needed) i.e. (x drops y.", "x drops z." => "x drops y, z."

version 0.66.1
 - more quotations for Events Filter in English

version 0.66.0
 - language selection when you use that script first time
 - improved RegExp (most of them should work also on Opera)

version 0.60.0
 - objects list on the OBJECTS page
 - grouping objects (machines) on the OBJECTS page

version 0.59.0
 - (almost) works for German version
 - English version should work fine (except of events filter)

version 0.55.0
 - nothing (I just need better version number)

version 0.52.3
 - dynamic calculator is more dynamic now

version 0.52.1
 - display bugfix (description in options panel)

version 0.52.0
 - labels are now only for containers

version 0.51.4
 - some bugfixes
 - characters count when editing notes (unfortunately doesn't count regional characters as 2)

version 0.51.3
 - more minor bugfixes

version 0.51.2
 - some minor bugfixes

version 0.51.1
 - notes autochecking (all, none, duplicates, opposite)
 - name highlight in event filter bugfix (now script is searching for only first word of name)

version 0.50.1
 - clock bugfix (visible on every page)

version 0.50.0
 - clock improvement (instead of "remains 108:8 ..." there is "remains 1:48:08...")
 - replacement of "exits" panel on the "location" page
 - English translation (but not everything works fine - I don't have any English character to check some quotations)
 
version 0.49.0
 - dynamic clock with turn alert (but needs extra connection with Cantr Server, so it is visible that you are using it) - needs improve
 - bookmark favourites buildings and vehicles

version 0.48.1
 - critical bugfix - syntax error

version 0.48.0
 - dynamic clock (turn alert will be added soon)
 - some improvements
 - nice "enhanced" title next to "Cantr II" on the top

version 0.46.0
 - language selection in option "shop" page (but still works only pl - en needs translation)

version 0.45.0
 - possibility of adding new languages (though currently there is no option of changing language)

version 0.42.0
 - max button on "give resources" page

version 0.41.0 and 0.41.1 and 0.41.2
 - events filtering enhancement (more and more)

version 0.40.0
 - events filtering (wow!) (only PL, need fixes)
 - grouping bugfix (now titleBars are being shown only when there is at least 1 vehicle or ship)

version 0.36.1
 - when you set empty ("") string as a label of an object, the label is entirely removed

version 0.36.0
 - land vehicles and ships grouping on "Buildings and Vehicles" page (oonly PL)

version 0.35.0
 - dynamic amount of resources for projects needed (only PL)

version 0.3
 - options on "shop" page - you can enable or disable some functions (only PL)
 - labels on "put into container" page (only PL)

version 0.29
 - note preview on "edit note" page (only PL)

version 0.20 and older
 - labels for objects (PL and EN)
 - 'taking as much as you can' button om "pick up resources" page (only PL)

*/

	// stałe
	var MAXCAP = 15000; // udźwig maksymalny w gramach
	var NOTE_MAXLENGTH = 65535;
	var GROUPEVENTS_MAX_MIN_DIFF = 2; // amount of minutes between first and last grouped event possible
	

	var ln = getLanguage(); // language - will be en as default but not yet
	var lang = new Array();
	
	
	
	
	/*#############################
				LANGUAGES
	  #############################*/
	  
	var activeText = new Array();
	var pageObjects = new Array();
	var pageInventory = new Array();
	var pageBuildingsAndVehicles = new Array();
	var pageBuildingsAndVehiclesInside = new Array();
	var pageEvents = new Array();
	var pageTakingInfo = new Array();
	var pageWriteNote = new Array();
	var pageShop = new Array();
	var pageStorageResources = new Array();
	var pageSelAmountToProject = new Array();
	var pageGiveResources = new Array();
	var pageRepair = new Array();
	var pageLocation = new Array();
	var pageEmptyEnvelope = new Array();
	var pageMainPage = new Array();
	var pageRetrieveFromContainer = new Array();
	
	
	
	
	
	/*
	POLISH
	*/
	lang['pl'] = new Array();
	
	// labels
	lang['pl']['setLabel'] = "[set]";
	lang['pl']['setPromptInfo'] = 'Podaj identyfikator dla tego obiektu';
	// max button - pick up resources
	lang['pl']['maxButton'] = 'max';
	// note preview
	lang['pl']['previewButton'] = '<b>[podgląd]</b>';
	lang['pl']['previewCharLeft'] = 'Pozostało znaków:';
	lang['pl']['previewExceedsLimit'] = 'UWAGA! LICZBA ZNAKÓW W NOTATCE PRZEKROCZONA!!!';
	// project size
	lang['pl']['timeInDays'] = 'Dokładny czas w dniach (w nawiasie realny): ';
	// ships and land vehicles grouping
	lang['pl']['groupingCheckBoxDesc'] = ' grupowanie pojazdów lądowych i morskich';
	lang['pl']['landVehicles'] = 'Pojazdy lądowe:';
	lang['pl']['ships'] = 'Statki:';
	// events filter
	lang['pl']['filters'] = '<b>Filtry:</b>';
	lang['pl']['sayFilter'] = 'rozmowy';
	lang['pl']['wichtigFilter'] = 'ważne';
	lang['pl']['whisperFilter'] = 'antyVlo'; // enabling and disabling whispers
	lang['pl']['radioFilter'] = 'radio';
	lang['pl']['travelFilter'] = 'podróż';
	lang['pl']['resourcesFilter'] = 'surowce';
	lang['pl']['tap_danceFilter'] = 'tuptanie'; // moving inside buildings, vehicles etc.
	lang['pl']['miscFilter'] = 'inne'; // everything else: hunting, eating...
	// ajax whisper
	lang['pl']['ajaxEventsToEveryone'] = 'Do wszystkich';
	lang['pl']['ajaxEventsWhisperButton'] = 'Szepcz';
	lang['pl']['ajaxEventsYouTalkingTo'] = 'Wybierz do kogo mówić:';
	// rename character on events page
	lang['pl']['eventsRenameChar'] = 'Podaj nowe imię dla postaci';
	// clock
	lang['pl']['clockTimeLeft'] = 'pozostało';
	lang['pl']['clockUntil'] = 'do';
	lang['pl']['clockTicksailing'] = 'przeliczenia podróży morskich';
	lang['pl']['clockTicktravel'] = 'przeliczenia podróży lądowych';
	lang['pl']['clockTickproject'] = 'przeliczenia projektów';
	// bookmark
	lang['pl']['bmVehTitle'] = 'WYRÓŻNIONE POJAZDY'; 
	lang['pl']['bmBuildTitle'] = 'WYRÓŻNIONE BUDYNKI'; 
	lang['pl']['bottomPanelCharacterMenu'] = 'MENU POSTACI'; 
	// "location" page's panels replacement
	lang['pl']['replaceLocationExits'] = 'WYJŚCIA';
	lang['pl']['replaceCheckBoxDesc'] = 'zamiana paneli';
	// notes checker
	lang['pl']['notesChbTitle'] = 'Autozaznaczanie notatek';
	lang['pl']['notesChbAll'] = 'wszystkie';
	lang['pl']['notesChbNo'] = 'żadne';
	lang['pl']['notesChbDupl'] = 'duplikaty';
	lang['pl']['notesChbOpp'] = 'odwrotność';
	// list objects
	lang['pl']['listObjectsTitle'] = 'LISTA';
	lang['pl']['listObjectsNotesCB'] = 'notatki';
	lang['pl']['listObjectsResourcesCB'] = 'surowce';
	lang['pl']['listObjectsOthersCB'] = 'inne';
	// group objects
	lang['pl']['groupObjectsUsedFirst'] = '<i>(używane ';
	lang['pl']['groupObjectsUsedOf'] = ' z ';
	lang['pl']['groupObjectsUsedEnd'] = ')</i>';
	// language selection
	lang['pl']['langSelectionTextBefore'] = 'Wybierz język. Wystarczy wybrać go z listy i odświeżyć stronę, a zostanie on zapisany na stałe.';
	lang['pl']['langSelectionTextAfter'] = 'Jeśli zechcesz zmienić później język skryptu lub wyłączyć niektóre moduły skryptu to znajdziesz tę możliwość na stronie "SKLEP"';
	
	
	// other
	lang['pl']['shipNames'] = new Array('łódka', 'darter', 'dłubanka', 'prom', 'trzcinowa łódź', 'łódź wiosłowa', 'galeon', 'szabrownik', 'slup', 'tratwa', 'długa łódź', 'szkuner', 'kajak', 'soarer'); // MUST BE LOWERCASE
	lang['pl']['itemNote'] = 'notatka';
	lang['pl']['itemEnvelope'] = 'Koperta';
	lang['pl']['grams'] = 'gram';
	lang['pl']['pieces'] = ' sztuk ';
	lang['pl']['optionsButton'] = 'opcje Cantr Enhanced';
	lang['pl']['groupObjectsInUse'] = ' <i>(w użyciu)</i>';

  // since 2.1
  lang['pl']['vehCategoryLandVehicles'] = 'POJAZDY LĄDOWE';
	lang['pl']['vehCategoryShips'] = 'STATKI';
	lang['pl']['vehCategoryConstructions'] = 'KONSTRUKCJE';
	lang['pl']['categoryBuildingsOutside'] = 'BUDYNKI';
	lang['pl']['categoryBuildingsInside'] = 'POMIESZCZENIA';
		
	// events grouping - be careful, it's quite hard to translate
	 lang['pl']['groupEventsSbUse'] = />(?:.*)>(.*) używa(?: trochę)* (.*)( na )(.*)/;
	lang['pl']['groupEventsSbHunt'] = />(?:.*)>(.*) zwierzę znane jako (.*)(, używając )(.*)/;
	lang['pl']['groupEventsSbPoke'] = />(?:.*)>(.*) szturcha (.*)\./;
	lang['pl']['groupEventsSbTake'] = />(?:.*)>(.*) bierze (?:trochę )*(.*)\./;
	lang['pl']['groupEventsSbDrop'] = />(?:.*)>(.*)(?: upuszcza | odkłada )(?:trochę )*(.*)\./;
	lang['pl']['groupEventsSbGive'] = />(?:.*)>(.* podaje do .*)> (?:trochę |coś wyglądającego jak )*(.*)\./;
	lang['pl']['groupEventsSbDragRes'] = /(Widzisz,* że ktoś przeciągnął )(?:trochę )*(.*)()( z centralnego obszaru .* do .*| z <.* do .*| do .* z .*)/;
	lang['pl']['groupEventsSbThrowDie'] = /(Widzisz, że .* rzuca czymś wyglądającym jak .*\.)( Wypada )(.*)\./;
  lang['pl']['groupPreEventsYouSay'] = 'Mówisz';
  lang['pl']['groupPreEventsSbSay'] = ' mówi:';
  lang['pl']['groupPreEventsSbWhisper'] = ' mówi do ';
  lang['pl']['groupPreEventsSbUse'] = ' używa ';
	lang['pl']['groupPreEventsSbHunt'] = 'zwierzę znane jako';
	lang['pl']['groupPreEventsSbPoke'] = ' szturcha ';
	lang['pl']['groupPreEventsSbTake'] = ' bierze ';
	lang['pl']['groupPreEventsSbDrop'] = '';
	lang['pl']['groupPreEventsSbGive'] = ' podaje do ';
	lang['pl']['groupPreEventsSbDragRes'] = ' że ktoś przeciągnął ';
	lang['pl']['groupPreEventsSbThrowDie'] = ' rzuca czymś wyglądającym jak ';
	
	
	// options on "shop" page (enabling and disabling options, language change etc.)
	lang['pl']['optionsTitle'] = "<i>Cantr Enhanced v. " + VER + " - PANEL KONFIGURACYJNY </i> <br><br>";
	lang['pl']['optionsLabel'] = "etykiety dla obiektów w zakładkach OBIEKTY oraz INWENTARZ";
	lang['pl']['optionsNotePre'] = "podgląd edytowanej notatki";
	lang['pl']['optionsAllButt'] = "przycisk podnoszenia i podawania\"ile się da\"";
	lang['pl']['optionsIntoContainer'] = "etykiety dla pojemników na stronie WŁÓŻ SUROWIEC DO POJEMNIKA";
	lang['pl']['optionsProjectSize'] = "dane co do ilości potrzebnych surowców generowane (mądre słowo) w czasie rzeczywistym (jeszcze mądrzejsze)";
	lang['pl']['optionsGroupBuildingVehicles'] = "grupowanie pojazdów lądowych i morskich na stronie BUDYNKI I POJAZDY";
	lang['pl']['optionsEventsFilter'] = "filtrowanie zdarzeń";
	lang['pl']['optionsGroupEvents'] = "grupowanie zdarzeń (wymaga włączonego filtrowania)";
	lang['pl']['optionsColorNames'] = "kolorowanie imion (wymaga włączonego wyskakującego okienka rozmawiaj (tm))";
	lang['pl']['optionsShortNames'] = "skracanie nieznanych imion (np. dwudziestoletni mężczyzna -> dwudziestolatek)";
	lang['pl']['optionsClock'] = 'ruchomy zegarek i powiadamianie o turach';
	lang['pl']['optionsSummerTime'] = 'czas letni (dostosuj do cantryjskiej rzeczywistości)';
	lang['pl']['optionsPopupButtons'] = 'Wyskakujące okienko rozmawiaj<s>/przeciągaj/atakuj</s> na stronie zdarzeń (wymaga włączonego filtrowania)';
	lang['pl']['optionsClickInsteadOfHover'] = 'Klikanie na imię postaci zamiast najechania na nie (uniemożliwia korzystanie z linka w imieniu)';
	lang['pl']['optionsAjaxWhisper'] = 'Szeptanie na stronie zdarzeń jak "Mów do wszystkich" (AJAX). Wyskakujące okienko "Rozmawiaj" musi być włączone';
	lang['pl']['optionsBookmarkBuildingsVehicles'] = 'wyróżnione budynki i pojazdy';
	lang['pl']['optionsLocationPanelsReplacement'] = 'zamiana kolejności paneli w stronie Miejsce';
	lang['pl']['optionsNotesCheckBox'] = 'autozaznaczanie notatek na stronach OPERACJE NA WIELU NOTATKACH i OPRÓŻNIJ KOPERTĘ';
	lang['pl']['optionsListObjects'] = 'wysuwalne menu na dole strony OBIEKTY, wyświetlające listę obiektów do skopiowania';
	lang['pl']['optionsGroupObjects'] = 'grupowanie maszyn tego samego typu w zakładce OBIEKTY';
	lang['pl']['optionsTakeAllUltimate'] = 'przycisk podnoszenia wszystkiego na stronie obiektów';
	lang['pl']['optionsLineEventsNotFocused'] = 'linia pokazująca zdarzenia wyświetlone gdy przeglądarka była nieaktywna';
	lang['pl']['optionsCharMenuToolbar'] = 'Przyciski menu postaci (buduj itp) po prawej stronie głównych okien';
	
	// QUOTATIONS
	/*
	!!!CAUTION!!! Remember that you shouldn't translate this text, but check how it is named in your language - no mistakes allowed or script will not load
	*/
	
	// most important quotation
	activeText['pl'] = 'graczy było aktywnych w ciągu ostatnich 15 minut.';
	
	pageObjects.push('OBIEKTY'); // opened objects panel titlebar
	pageInventory.push('INWENTARZ'); // opened inventory panel titlebar
	pageBuildingsAndVehicles.push(lang['pl']['vehCategoryLandVehicles']);// opened vehicles panel titlebar
	pageBuildingsAndVehicles.push(lang['pl']['vehCategoryShips']);
	pageBuildingsAndVehicles.push(lang['pl']['vehCategoryConstructions']);
	pageBuildingsAndVehicles.push(lang['pl']['categoryBuildingsOutside']);
	pageBuildingsAndVehiclesInside.push(lang['pl']['categoryBuildingsInside']);
	pageEvents.push('ZDARZENIA'); // opened events panel titlebar
	pageTakingInfo.push('INFORMACJA O ZABIERANIU'); // page where you type how much resources do you want to pick up
	pageWriteNote.push('NAPISZ NOTATKĘ'); // write note page
	pageShop.push('EKSTRA CZAS ZA KREDYTKI'); // shop page (credits etc)
	pageStorageResources.push('PRZECHOWYWANIE SUROWCÓW'); // how much resources do you want to put into container
	pageSelAmountToProject.push('WYBIERZ ILOŚĆ DO TEGO PROJEKTU'); // when you create project and you type how much do you want to get (in projects like refining iron ore)
	pageGiveResources.push('INFORMACJA O DAWANIU'); //  how much resources do you want to give to sb
	pageRepair.push('Naprawa - '); /*  de on pageGiveResources - because there are two pages with similar name */
	pageLocation.push(': OPIS'); // how to recognise LOCATION page? :D
	pageEmptyEnvelope.push('OPRÓŻNIANIE KOPERTY');
	pageMainPage.push('PROFIL GRACZA');
	pageRetrieveFromContainer.push('POZYSKAJ ZE SKŁADU');
	
	/*
	ENGLISH
	*/
	
	lang['en'] = new Array();
	
	// labels
	lang['en']['setLabel'] = "[set]";
	lang['en']['setPromptInfo'] = 'Insert identifier of this object';
	// max button - pick up resources
	lang['en']['maxButton'] = 'max';
	// note preview
	lang['en']['previewButton'] = '<b>[preview]</b>';
	lang['en']['previewCharLeft'] = 'Characters left:';
	lang['en']['previewExceedsLimit'] = 'WARNING! NOTE CAPACITY REACHED!!!';
	// project size
	lang['en']['timeInDays'] = 'Strict time in days (real in brackets): ';
	// ships and land vehicles grouping
	lang['en']['groupingCheckBoxDesc'] = ' grouping of land vehicles and ships';
	lang['en']['landVehicles'] = 'Land vehicles:';
	lang['en']['ships'] = 'Ships:';
	// events filter
	lang['en']['filters'] = '<b>Filters:</b>';
	lang['en']['sayFilter'] = 'talking';
	lang['en']['wichtigFilter'] = 'important';
	lang['en']['whisperFilter'] = 'whispers'; // enabling and disabling whispers
	lang['en']['radioFilter'] = 'radio';
	lang['en']['travelFilter'] = 'movement';
	lang['en']['resourcesFilter'] = 'resources';
	lang['en']['tap_danceFilter'] = 'in/out'; // moving inside buildings, vehicles etc.
	lang['en']['miscFilter'] = 'misc'; // everything else: hunting, eating...
	// ajax whisper
	lang['en']['ajaxEventsToEveryone'] = 'To everyone';
	lang['en']['ajaxEventsWhisperButton'] = 'Whisper';
	lang['en']['ajaxEventsYouTalkingTo'] = 'Who are you talking to:';
	// rename character on events page
	lang['en']['eventsRenameChar'] = 'Enter new name for a character';
	// clock
	lang['en']['clockTimeLeft'] = '';
	lang['en']['clockUntil'] = 'until';
	lang['en']['clockTicksailing'] = 'sailing tick';
	lang['en']['clockTicktravel'] = 'travelling tick';
	lang['en']['clockTickproject'] = 'projects tick';
	// bookmark
	lang['en']['bmVehTitle'] = 'BOOKMARKED VEHICLES'; 
	lang['en']['bmBuildTitle'] = 'BOOKMARKED BUILDINGS';
	lang['en']['bottomPanelCharacterMenu'] = 'CHARACTER MENU'; // bottom menu with buttons like create note, manufacture etc - must be exactly like panel in the game
	// "location" page's panels replacement
	lang['en']['replaceLocationExits'] = 'EXITS';
	lang['en']['replaceCheckBoxDesc'] = 'panels replacement';
	// notes checker
	lang['en']['notesChbTitle'] = 'Autochecker:';
	lang['en']['notesChbAll'] = 'all';
	lang['en']['notesChbNo'] = 'no';
	lang['en']['notesChbDupl'] = 'duplicates';
	lang['en']['notesChbOpp'] = 'opposite';
	// list objects
	lang['en']['listObjectsTitle'] = 'LIST';
	lang['en']['listObjectsNotesCB'] = 'notes';
	lang['en']['listObjectsResourcesCB'] = 'resources';
	lang['en']['listObjectsOthersCB'] = 'others';
	// group objects
	lang['en']['groupObjectsUsedFirst'] = '<i>(';
	lang['en']['groupObjectsUsedOf'] = ' out of ';
	lang['en']['groupObjectsUsedEnd'] = ' in use)</i>';
	// language selection
	lang['en']['langSelectionTextBefore'] = 'Select language. It is enough to select it from the list, refresh page and it will be saved.';
	lang['en']['langSelectionTextAfter'] = 'If you would like to change language in the future or disable some modules you can click on the text [Cantr Enhanced options] below.';
	// other
	lang['en']['itemNote'] = 'Note';
	lang['en']['itemEnvelope'] = 'Envelope';
	lang['en']['grams'] = 'grams';
	lang['en']['pieces'] = ' pieces of ';
	lang['en']['optionsButton'] = 'Cantr Enhanced options';
	lang['en']['groupObjectsInUse'] = ' <i>(in use)</i>';

  // since 2.1
  lang['en']['vehCategoryLandVehicles'] = 'LAND VEHICLES';
	lang['en']['vehCategoryShips'] = 'SHIPS';
	lang['en']['vehCategoryConstructions'] = 'CONSTRUCTIONS';
	lang['en']['categoryBuildingsOutside'] = 'BUILDINGS';
	lang['en']['categoryBuildingsInside'] = 'OTHER ROOMS';
	
	lang['en']['shipNames'] = new Array('raft', 'kayak', 'dugout canoe', 'reed boat', 'dinghy', 'rowing boat', 'sloop', 'darter', 'longboat', 'soarer', 'ferry', 'raker', 'skimmer', 'galleon'); // MUST BE LOWERCASE

	// events grouping - be careful, it's quite hard to translate
	lang['en']['groupEventsSbUse'] = />(?:.*)>(.*) use(?: some)* (.*)( on )(.*)/;
	lang['en']['groupEventsSbHunt'] = />(?:.*)>(.*) hurt (.*)( using )(.*)/;
	lang['en']['groupEventsSbPoke'] = />(?:.*)>(.*) poke (.*)\./;
	lang['en']['groupEventsSbTake'] = />(?:.*)>(.*) take (?:some )*(.*)\./;
	lang['en']['groupEventsSbDrop'] = />(?:.*)>(.*) drop (?:some )*(.*)\./;
	lang['en']['groupEventsSbGive'] = />(?:.*)>(.*) give (?:some )*(.*)( to )(.*)\./;
	lang['en']['groupEventsSbDragRes'] = /(You see )(?:some )*(.*)()( being pulled from .* to .*| being pulled to .*, coming from .*)/;
	lang['en']['groupEventsSbThrowDie'] = /doesn work/;
  lang['en']['groupPreEventsYouSay'] = 'You say';
  lang['en']['groupPreEventsSbSay'] = ' says:';
  lang['en']['groupPreEventsSbWhisper'] = ' talking to ';
  lang['en']['groupPreEventsSbUse'] = ' use ';
	lang['en']['groupPreEventsSbHunt'] = ' hurt ';
	lang['en']['groupPreEventsSbPoke'] = ' poke ';
	lang['en']['groupPreEventsSbTake'] = ' take ';
	lang['en']['groupPreEventsSbDrop'] = ' drop ';
	lang['en']['groupPreEventsSbGive'] = ' give ';
	lang['en']['groupPreEventsSbDragRes'] = ' being pulled from ';
	lang['en']['groupPreEventsSbThrowDie'] = ' roll a ';

		
	// options on "shop" page (enabling and disabling options, language change etc.)
	lang['en']['optionsTitle'] = "<i>Cantr Enhanced v. " + VER + " - Config panel </i> <br><br>";
	lang['en']['optionsLabel'] = "labels for objects on OBJECTS, INVENTORY pages";
	lang['en']['optionsNotePre'] = "preview of edited note";
	lang['en']['optionsAllButt'] = "\'take as much as you can\' button when picking up and giving resources";
	lang['en']['optionsIntoContainer'] = "labels on \'put resource into\' page";
	lang['en']['optionsProjectSize'] = "resources needed for a project calculator";
	lang['en']['optionsGroupBuildingVehicles'] = "grouping of land vehicles and ships on OBJECTS AND VEHICLES page";
	lang['en']['optionsEventsFilter'] = "events filtering (not 100% working)";
	lang['en']['optionsGroupEvents'] = "grouping events (events filtering must be enabled)";
	lang['en']['optionsColorNames'] = "name colors (popup talk window must be enabled)";
	lang['en']['optionsShortNames'] = "shortening names (i.e. a man in his twenties -> 20 year-old-man)";
	lang['en']['optionsClock'] = 'dynamic clock and turns notifier';
	lang['en']['optionsSummerTime'] = 'summer time';
	lang['en']['optionsPopupButtons'] = 'Popup talk window on the events page (events filtering must be enabled)';
	lang['en']['optionsClickInsteadOfHover'] = 'Click on character name instead of hovering (makes entering name link impossible)';
	lang['en']['optionsAjaxWhisper'] = 'Whisper form on events page like "talk to all" (AJAX). popup buttons must be enabled';
	lang['en']['optionsBookmarkBuildingsVehicles'] = 'bookmark buildings and vehicles';
	lang['en']['optionsLocationPanelsReplacement'] = 'replacement of panels on LOCATION page';
	lang['en']['optionsNotesCheckBox'] = 'autochecking notes on the "empty envelope" and "many notes operations"';
	lang['en']['optionsListObjects'] = 'menu on OBJECTS page which shows list of objects easy to copy/paste';
	lang['en']['optionsGroupObjects'] = 'grouping of machines of the same type on OBJECTS page';
	lang['en']['optionsTakeAllUltimate'] = 'take all button on the OBJECTS page';
	lang['en']['optionsLineEventsNotFocused'] = 'Line which shows events which took place when browser was not focued';
	lang['en']['optionsCharMenuToolbar'] = 'Charmenu buttons on right side of the screen on main game pages';
	
	
	// QUOTATIONS
	/*
	!!!CAUTION!!! Remember that you shouldn't write translated text, but check how it is named in your language - no mistakes allowed or script will not load
	*/

	// most important quotation
	activeText['en'] = ' users were active in the last 15 minutes.';
	pageObjects.push('OBJECTS'); // opened objects panel titlebar
	pageInventory.push('INVENTORY'); // opened inventory panel titlebar
	pageBuildingsAndVehicles.push(lang['en']['vehCategoryLandVehicles']);// opened vehicles panel titlebar
	pageBuildingsAndVehicles.push(lang['en']['vehCategoryShips']);
	pageBuildingsAndVehicles.push(lang['en']['vehCategoryConstructions']);
	pageBuildingsAndVehicles.push(lang['en']['categoryBuildingsOutside']);
	pageBuildingsAndVehiclesInside.push(lang['en']['categoryBuildingsInside']);
	pageEvents.push('EVENTS'); // opened events panel titlebar
	pageTakingInfo.push('TAKE INFO'); // page where you type how much resources do you want to pick up
	pageWriteNote.push('WRITE A NOTE'); // write note page
	pageShop.push('SHOPPING WITH CREDITS'); // shop page (credits etc)
	pageStorageResources.push('STORE RAW MATERIAL'); // how much resources do you want to put into container
	pageSelAmountToProject.push('SELECT AMOUNT FOR THIS PROJECT'); // when you create project and you type how much do you want to get (in projects like refining iron ore)
	pageGiveResources.push('<B>GIVE INFO</B>'); //  how much resources do you want to give to sb
	pageRepair.push('Repairing'); /*  de on pageGiveResources - because there are two pages with similar name */
	pageLocation.push(': DESCRIPTION'); // how to recognise LOCATION page? :D
	pageEmptyEnvelope.push('EMPTY ENVELOPE'); // when taking notes out of envelope - titlebar
	pageMainPage.push('PLAYER INFO');
	
	
	/*
	DEUTSCH
	*/

	// QUOTATIONS
/*
	!!!CAUTION!!! Remember that you shouldn't write translated text, but check how it is named in your language - no mistakes allowed or script will not load
	*/
	
	lang['de'] = new Array();
	
	// other
	lang['de']['itemNote'] = 'Zettel';
	lang['de']['itemEnvelope'] = 'Briefumschlag';
	lang['de']['grams'] = 'Gramm';
	lang['de']['pieces'] = 'Stück';
	lang['de']['shipNames'] = new Array('floß', 'fellboot', 'einbaumkanu', 'schilfboot', 'jolle', 'ruderboot', 'slup', 'darter', 'langboot', 'soarer', 'fähre', 'raker', 'skimmer', 'galleone'); // MUST BE LOWERCASE
	lang['de']['groupObjectsInUse'] = ' <i>(wird benutzt)</i>';

  // since 2.1
  lang['de']['vehCategoryLandVehicles'] = 'LAND VEHICLES';
	lang['de']['vehCategoryShips'] = 'SHIPS';
	lang['de']['vehCategoryConstructions'] = 'CONSTRUCTIONS';
	lang['de']['categoryBuildingsOutside'] = 'BUILDINGS';
	lang['de']['categoryBuildingsInside'] = 'ANDERE RÄUME';
	
	// events grouping - be careful, it's quite hard to translate
	lang['de']['groupEventsSbUse'] = />(?:.*)>(.*) (?:ein\/einen|etwas) (.*)( für )(?:das Projekt )*(.*) (?:benutzen|verwenden)\./;
	lang['de']['groupEventsSbHunt'] = />(?:.*)>(.*) (?:ein|eine|einen) (.*)( mit )(.*) verwunden\./;
	lang['de']['groupEventsSbPoke'] = />(?:.*)>(.*) ein\/einen (.*) stoßen\./;
	lang['de']['groupEventsSbTake'] = />(?:.*)>(.*) (?:etwas )?(.*) nehmen\./;
	lang['de']['groupEventsSbDrop'] = />(?:.*)>(.*) etwas (.*) fallen lässt\./;
	lang['de']['groupEventsSbGive'] = />doesnt workI@UDAWSd/;
	lang['de']['groupEventsSbDragRes'] = /(Du siehst wie )(?:etwas )*(.*)()( aus .* ins .* geschleppt wird\.)/;
	lang['de']['groupEventsSbThrowDie'] = /doesnt!#@$ work/;
	lang['de']['groupPreEventsYouSay'] = 'Du sagst:';
	lang['de']['groupPreEventsSbSay'] = ' sagt:';
	lang['de']['groupPreEventsSbWhisper'] = ' reden.';
	lang['de']['groupPreEventsSbUse'] = ' ';
	lang['de']['groupPreEventsSbHunt'] = ' verwunden.';
	lang['de']['groupPreEventsSbPoke'] = ' stoßen.';
	lang['de']['groupPreEventsSbTake'] = ' nehmen.';
	lang['de']['groupPreEventsSbDrop'] = ' fallen l';
	lang['de']['groupPreEventsSbGive'] = ' doesnt work1234';
	lang['de']['groupPreEventsSbDragRes'] = ' geschleppt wird.';
	lang['de']['groupPreEventsSbThrowDie'] = ' doesnt work1234s';
	
	// most important quotation
	activeText['de'] = 'Spieler waren in den letzten 15 Minuten aktiv.';
	
	pageObjects.push('OBJEKTE'); // opened objects panel titlebar
	pageInventory.push('INVENTAR'); // opened inventory panel titlebar
	pageBuildingsAndVehicles.push(lang['de']['vehCategoryLandVehicles']);// opened vehicles panel titlebar
	pageBuildingsAndVehicles.push(lang['de']['vehCategoryShips']);
	pageBuildingsAndVehicles.push(lang['de']['vehCategoryConstructions']);
	pageBuildingsAndVehicles.push(lang['de']['categoryBuildingsOutside']);
	pageBuildingsAndVehiclesInside.push(lang['de']['categoryBuildingsInside']);
	pageEvents.push('EREIGNISSE'); // opened events panel titlebar
	pageTakingInfo.push('INFO NEHMEN'); // page where you type how much resources do you want to pick up
	pageWriteNote.push('EINE NOTIZ SCHREIBEN'); // write note page
	pageShop.push('EINKAUFEN MIT CREDITS'); // shop page (credits etc)
	pageStorageResources.push('ROHMATERIAL LAGERN'); // how much resources do you want to put into container
	pageSelAmountToProject.push('WÄHLE MENGE FÜR DIESES PROJEKT'); // when you create project and you type how much do you want to get (in projects like refining iron ore)
	pageGiveResources.push('INFO GEBEN</B>'); //  how much resources do you want to give to sb
	pageRepair.push('repariert '); /*  de on pageGiveResources - because there are two pages with similar name */
	pageLocation.push(': BESCHREIBUNG'); // how to recognise LOCATION page? :D
	pageEmptyEnvelope.push('LEERER BRIEFUMSCHLAG');
	
	/*
	Português
	*/
	
	lang['pt'] = new Array();
	
	// other
	lang['pt']['itemNote'] = 'nota';
	lang['pt']['itemEnvelope'] = 'envelope';
	lang['pt']['grams'] = 'gramas';
	lang['pt']['pieces'] = 'doesnt exist leixi9I(@!UI(JF';
	lang['pt']['shipNames'] = new Array('jangada', 'caiaque', 'canoa de tora', 'barco de junco', 'bote', 'barco a remos', 'eslópe', 'patacho', 'bote longo', 'catamarão', 'balsa', 'brigue', 'escuna', 'galeão'); // MUST BE LOWERCASE
	lang['pt']['groupObjectsInUse'] = ' <i>(em uso)</i>';
	
  // since 2.1
  lang['pt']['vehCategoryLandVehicles'] = 'LAND VEHICLES';
	lang['pt']['vehCategoryShips'] = 'SHIPS';
	lang['pt']['vehCategoryConstructions'] = 'CONSTRUCTIONS';
	lang['pt']['categoryBuildingsOutside'] = 'CONSTRUÇÕES';
	lang['pt']['categoryBuildingsInside'] = 'OTHER ROOMS';
	
	// QUOTATIONS
	/*
	!!!CAUTION!!! Remember that you shouldn't write translated text, but check how it is named in your language - no mistakes allowed or script will not load
	*/
	activeText['pt'] = 'usuários estiveram ativos durante os últimos 15 minutos.';
	
	pageObjects.push('OBJETOS'); // opened objects panel titlebar
	pageInventory.push('INVENTÁRIO'); // opened inventory panel titlebar
	pageBuildingsAndVehicles.push(lang['pt']['vehCategoryLandVehicles']);// opened vehicles panel titlebar
	pageBuildingsAndVehicles.push(lang['pt']['vehCategoryShips']);
	pageBuildingsAndVehicles.push(lang['pt']['vehCategoryConstructions']);
	pageBuildingsAndVehicles.push(lang['pt']['categoryBuildingsOutside']);
	pageBuildingsAndVehiclesInside.push(lang['pt']['categoryBuildingsInside']);
	pageEvents.push('ACONTECIMENTOS'); // opened events panel titlebar
	pageTakingInfo.push('PEGUE INFORMAÇÃO'); // page where you type how much resources do you want to pick up
	pageWriteNote.push('ESCREVER UMA NOTA'); // write note page
	pageShop.push('COMPRAS COM OS CRÉDITOS'); // shop page (credits etc)
	pageStorageResources.push('ARMAZENAR MATERIAL EM ESTADO BRUTO'); // how much resources do you want to put into container
	pageSelAmountToProject.push('SELECIONA A QUANTIDADE PARA ESTE PROJETO'); // when you create project and you type how much do you want to get (in projects like refining iron ore)
	pageGiveResources.push('<B>DAR INFORMAÇÃO</B>'); //  how much resources do you want to give to sb
	pageRepair.push('Reparando'); /*  de on pageGiveResources - because there are two pages with similar name */
	pageLocation.push(': DESCRIÇÃO'); // how to recognise LOCATION page? :D
	pageEmptyEnvelope.push('ESVAZIAR ENVELOPE'); // when taking notes out of envelope - titlebar
	
	/*
	SPANISH
	*/

	// QUOTATIONS
	/*
	!!!CAUTION!!! Remember that you shouldn't write translated text, but check how it is named in your language - no mistakes allowed or script will not load
	*/
	
	lang['es'] = new Array();
	
	// other
	lang['es']['itemNote'] = 'nota';
	lang['es']['itemEnvelope'] = 'Sobre';
	lang['es']['grams'] = 'gramos de';
	lang['es']['pieces'] = 'peça(s) de';
	lang['es']['shipNames'] = new Array('balsa', 'kayak', 'canoa', 'bote de cañas', 'esquife', 'bote de remos', 'balandra', 'patache', 'chalupa', 'catamarán', 'transbordador', 'bergantín', 'nao', 'galeón'); // MUST BE LOWERCASE
	lang['es']['groupObjectsInUse'] = ' <i>(en uso)</i>';

  // since 2.1
  lang['es']['vehCategoryLandVehicles'] = 'LAND VEHICLES';
	lang['es']['vehCategoryShips'] = 'SHIPS';
	lang['es']['vehCategoryConstructions'] = 'CONSTRUCTIONS';
	lang['es']['categoryBuildingsOutside'] = 'BUILDINGS';
	lang['es']['categoryBuildingsInside'] = 'OTRAS HABITACIONES';

	// most important quotation
	activeText['es'] = 'usuarios activos en los últimos 15 minutos.';
	
	pageObjects.push('OBJETOS'); // opened objects panel titlebar
	pageInventory.push('INVENTARIO'); // opened inventory panel titlebar
	pageBuildingsAndVehicles.push(lang['es']['vehCategoryLandVehicles']);// opened vehicles panel titlebar
	pageBuildingsAndVehicles.push(lang['es']['vehCategoryShips']);
	pageBuildingsAndVehicles.push(lang['es']['vehCategoryConstructions']);
	pageBuildingsAndVehicles.push(lang['es']['categoryBuildingsOutside']);
	pageBuildingsAndVehiclesInside.push(lang['es']['categoryBuildingsInside']);
	pageEvents.push('ACONTECIMIENTOS'); // opened events panel titlebar
	pageTakingInfo.push('INFORMACIÓN SOBRE LO QUE COJE'); // page where you type how much resources do you want to pick up
	pageWriteNote.push('ESCRIBE UNA NOTA'); // write note page
	pageShop.push('NO LONGER EXIST dkoawjid'); // shop page (credits etc)
	pageStorageResources.push('ALMACENAR MATERIAS PRIMAS '); // how much resources do you want to put into container
	pageSelAmountToProject.push('SELECCIONAR CANTIDAD PARA ESTE PROYECTO'); // when you create project and you type how much do you want to get (in projects like refining iron ore)
	pageGiveResources.push('INFORMACIÓN SOBRE LO QUE VA A ENTREGAR'); //  how much resources do you want to give to sb
	pageRepair.push('reparando '); /*  de on pageGiveResources - because there are two pages with similar name */
	pageLocation.push(': DESCRIPCIÓN'); // how to recognise LOCATION page? :D
	pageEmptyEnvelope.push('SOBRE1234 DOESNT WORK');


	/*
	 * FINNISH
	 */

	lang['fi'] = new Array();

  // since 2.1
  lang['fi']['vehCategoryLandVehicles'] = 'LAND VEHICLES';
	lang['fi']['vehCategoryShips'] = 'SHIPS';
	lang['fi']['vehCategoryConstructions'] = 'CONSTRUCTIONS';
	lang['fi']['categoryBuildingsOutside'] = 'RAKENNUKSET';
	lang['fi']['categoryBuildingsInside'] = 'MUUT HUONEET';

	
  // other
	lang['fi']['itemNote'] = 'Viestilappu';
	lang['fi']['itemEnvelope'] = 'Kirjekuori';
	lang['fi']['grams'] = 'grammaa';
	lang['fi']['pieces'] = ' kappaletta ';
	lang['fi']['optionsButton'] = 'Cantr Enhanced vaihtoehdot';
	lang['fi']['groupObjectsInUse'] = ' <i>(käytössä)</i>';

	// most important quotation
	activeText['fi'] = 'käyttäjää on ollut aktivisena viimeisen 15 minuutin sisään.';
	pageObjects.push('ESINEET'); // opened objects panel titlebar
	pageInventory.push('OMAT TAVARAT'); // opened inventory panel titlebar
	pageBuildingsAndVehicles.push(lang['fi']['vehCategoryLandVehicles']);// opened vehicles panel titlebar
	pageBuildingsAndVehicles.push(lang['fi']['vehCategoryShips']);
	pageBuildingsAndVehicles.push(lang['fi']['vehCategoryConstructions']);
	pageBuildingsAndVehicles.push(lang['fi']['categoryBuildingsOutside']);
	pageBuildingsAndVehiclesInside.push(lang['fi']['categoryBuildingsInside']);
	pageEvents.push('TAPAHTUMAT'); // opened events panel titlebar
	pageTakingInfo.push('OTTO - TIEDOT'); // page where you type how much resources do you want to pick up
	pageWriteNote.push('KIRJOITA VIESTI'); // write note page
	pageShop.push('OSTOKSET KREDIITEILLÄ'); // shop page (credits etc)
	pageStorageResources.push('LAITA VARASTOON'); // how much resources do you want to put into container
	pageSelAmountToProject.push('VALITSE MÄÄRÄ PROJEKTILLE'); // when you create project and you type how much do you want to get (in projects like refining iron ore)
	pageGiveResources.push('<B>ANNA</B>'); //  how much resources do you want to give to sb
	pageRepair.push('Korjataan'); /*  de on pageGiveResources - because there are two pages with similar name */
	pageLocation.push(': KUVAUS'); // how to recognise LOCATION page? :D
	pageEmptyEnvelope.push('TYHJENNÄ KIRJEKUORI'); // when taking notes out of envelope - titlebar
	pageMainPage.push('PELAAJAINFO');
	
	// ustawianie języka postaci
	var chLn = getCharacterLanguage();
	
	
	
	
	
	/*#############################
			  LANGUAGES END
	  #############################*/
	
	//////
	////// POCZĄTEK LISTA OBIEKTÓW
	////// 
	
	function listObjects(){
		var node = document.body;
		var centerNode = node.getElementsByTagName('center')[2];
		var TRs = centerNode.getElementsByTagName('tr');
		var list = new Array();
		var dummySpan = document.createElement('span');
		for (var ind=0;ind<TRs.length;ind++){
			if(TRs[ind].getElementsByTagName('table').length > 0){ // because there is outer TR and inner TR (in table), we want only outer TRs
				var tabNode = TRs[ind].getElementsByTagName('table')[0];
				var TDs = tabNode.getElementsByTagName('td');
				var lastTD = TDs[TDs.length-1];
				dummySpan.innerHTML = lastTD.innerHTML.replace(">", "> ");
				list.push(trim(dummySpan.textContent));
			}
		}
		var listOuterDiv = document.createElement('div');
		centerNode.getElementsByTagName('table')[0].appendChild(listOuterDiv);
		var headerDiv = createHeaderTitle(lang[ln]['listObjectsTitle'], 12);
		headerDiv.style.marginBottom = '10px';
		var listDiv = document.createElement('div');
		// na początku lista jest ukryta
		var listVisible = false;
		listDiv.style.display = 'none';
		// ukrywanie i odkrywanie listy po wciśnięciu nagłówka
		headerDiv.addEventListener('click', function(){
			listVisible = !listVisible;
			if (listVisible)
				listDiv.style.display = 'block';
			else 
				listDiv.style.display = 'none';
		}, true);
		
		

		var chBoxes = document.createElement('div');
		var chNotes = addListCheckBox(lang[ln]['listObjectsNotesCB']);
		var chRes = addListCheckBox(lang[ln]['listObjectsResourcesCB']);
		var chOther = addListCheckBox(lang[ln]['listObjectsOthersCB']);
		
		listDiv.appendChild(chBoxes);
		
		var listTArea = document.createElement('textarea');
		listTArea.cols = 83;
		listTArea.rows = 5;
		listDiv.appendChild(listTArea);
		
		rebuildList();
		
		var noteCB = document.createElement('input');
		
		listOuterDiv.appendChild(headerDiv);
		listOuterDiv.appendChild(listDiv);
		
		function rebuildList(){
		console.log('rebuilding');
		listTArea.innerHTML = '';
			for (var index=0;index<list.length;index++){
				if (list[index].indexOf(lang[chLn]['itemNote']) >= 0 || list[index].indexOf(lang[chLn]['itemEnvelope']) >= 0){
					if (chNotes.checked)
						listTArea.innerHTML += list[index] + '\n';
				}
				else if (list[index].indexOf(lang[chLn]['grams']) >= 0 ){
					if (chRes.checked)
						listTArea.innerHTML += list[index] + '\n';
				}
				else if (chOther.checked){
					listTArea.innerHTML += list[index] + '\n';
				}
			}
		}
		
		
		function addListCheckBox(spanName){
			var chBox = document.createElement('input');
			chBox.type = 'checkbox';
			chBox.checked = true;
			chBoxes.appendChild(chBox);
			var capSpan = document.createElement('span');
			capSpan.innerHTML = spanName;
			chBox.addEventListener('click', function(){ rebuildList();}, true);
			chBoxes.appendChild(capSpan);
			return chBox;
		}
    
    function trim (str){
      return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
	}
	
	
	//////
	////// KONIEC LISTA OBIEKTÓW
	////// POCZĄTEK GRUPOWANIE OBIEKTÓW
	//////
	
	function groupObjects(){
		var node = document.body;
		var centerNode = node.getElementsByTagName('center')[2];
		var TRs = centerNode.getElementsByTagName('tr');
		var list = new Array();
		for (var ind=0;ind<TRs.length;ind++){
			if(TRs[ind].getElementsByTagName('table').length > 0){ // because there is outer TR and inner TR (in table), we want only outer TRs
				var tabNode = TRs[ind].getElementsByTagName('table')[0];
				var TDs = tabNode.getElementsByTagName('td');
				
				for (var tdind=0;tdind<TDs.length;tdind++){
					if (TDs[tdind].innerHTML.indexOf('button_small_use.gif') >= 0){ // sprawdza czy jest to maszyna
						var nameTD = TDs[TDs.length-1];
						var projectTD = TDs[tdind];
						var allTR = TRs[ind];
						var infoSpan = document.createElement('span');
						var used = false;
						if (nameTD.innerHTML.indexOf(lang[chLn]['groupObjectsInUse']) >= 0){
							used = true;
						}
						nameTD.innerHTML = nameTD.innerHTML.replace(lang[chLn]['groupObjectsInUse'], '');
						var hash = nameTD.innerHTML.hashCode();
						if (list[hash] == null || list[hash] == undefined){ // gdy znalazło po raz pierwszy
							list[hash] = new Array();
							nameTD.appendChild(infoSpan);
							list[hash]['name'] = nameTD;
							list[hash]['project'] = projectTD;
							list[hash]['info'] = infoSpan;
							list[hash]['num'] = 1;
							list[hash]['used'] = 0;
							if (used){
								list[hash]['used'] = 1;
								list[hash]['info'].innerHTML = lang[chLn]['groupObjectsInUse'];
								}
						}
						else { // po raz kolejny wystąpiło
							list[hash]['num']++;
							if (used){
								list[hash]['used']++;
							}
							else {
								list[hash]['project'].innerHTML = projectTD.innerHTML;
							}
							list[hash]['info'].innerHTML = ' ' + lang[ln]['groupObjectsUsedFirst'] + list[hash]['used'] + lang[ln]['groupObjectsUsedOf'] +  list[hash]['num'] + lang[ln]['groupObjectsUsedEnd'];
							TRs[ind].innerHTML = '';
							// TRs[ind].parentNode.removeChild(TRs[ind]);
						}
						
					}
				}
				
				
			}
		}
		
	}
	
	//////
	////// KONIEC GRUPOWANIE OBIEKTÓW
	////// POCZĄTEK AUTOZAZNACZANIE NOTATEK
	//////
	
	function notesCheckBoxInventory(){
		var node = document.body;
		var inputs = node.getElementsByTagName('input');
		
		// storage of informations about TR checkbox and TR in which is located
		var noteName = new Array();
		var noteCB = new Array();
		
		for (var i=0;i<inputs.length;i++){
		var currInput = inputs[i];
			if (currInput.type == 'checkbox' && currInput.name == 'notes[]'){
				var label = currInput.parentNode;
        var rx1 = new RegExp('('+lang[chLn]['itemNote']+')(.*)', "m");

			var parts = rx1.exec(label.innerHTML);
			var text = "";
			if (parts){
				text = parts[0];
			}
				if (text.indexOf(lang[chLn]['itemNote']) >= 0){
					noteName.push(text);
					noteCB.push(currInput);
				}
			}
		}
		if (noteCB.length > 0){
      console.log('number of notes: ' + noteCB.length);
			var optionsCenter = node.getElementsByTagName('center')[2];
      var forPanel = document.createElement('div');
      optionsCenter.insertBefore(forPanel, optionsCenter.firstChild);
			notesCheckBoxIn(noteCB, noteName, forPanel);
		}
	}
	
	
	function notesCheckBoxEnvelopes() {
		var node = document.body.getElementsByTagName('center')[0];
		var inputs = node.getElementsByTagName('input');
		
		var noteName = new Array();
		var noteCB = new Array();
		for (var i=0;i<inputs.length;i++) {
			var currInput = inputs[i];
			if (currInput.type == 'checkbox' && currInput.name.indexOf('note') == 0){
				noteCB.push(currInput);
				// i tu się zaczyna głupia sprawa z nazwą, bo jej potrzebuję
				var noteNameNode = currInput.parentNode.nextSibling.nextSibling;
				var currCode = noteNameNode.innerHTML;
				var currName = currCode.split('<br>', 1)[0];
				noteName.push(currName);
			}
		}
		
		if (noteCB.length > 0){
      console.log('number of notes: ' + noteCB.length);
			var optionsCenter = document.body.getElementsByTagName('center')[0];
			var forDiv = document.createElement('div');
      optionsCenter.insertBefore(forDiv, optionsCenter.firstChild);
			notesCheckBoxIn(noteCB, noteName, forDiv);
		}
		
	}
	
	
	function notesCheckBoxIn(notesArr, nameArr, options){
		var infoSpan = document.createElement('span');
		infoSpan.innerHTML = lang[ln]['notesChbTitle'] + ': ';
		
		var allNotes = document.createElement('span');
		allNotes.innerHTML = ' [' + lang[ln]['notesChbAll'] + '] ';
		allNotes.addEventListener('click', function(){
			for (var i=0;i<notesArr.length;i++)
				notesArr[i].checked = true;
		}, true);
		
		var noNotes = document.createElement('span');
		noNotes.innerHTML = ' [' + lang[ln]['notesChbNo'] + '] ';
		noNotes.addEventListener('click', function(){
			for (var i=0;i<notesArr.length;i++)
				notesArr[i].checked = false;
		}, true);
		
		var duplNotes = document.createElement('span');
		duplNotes.innerHTML = ' [' + lang[ln]['notesChbDupl'] + '] ';
		duplNotes.addEventListener('click', function(){
			var hashTab = new Array();
			for (var i=0;i<notesArr.length;i++){
				var currHash = nameArr[i].hashCode();
				if (hashTab[currHash] != 1){ // jeśli nie istnieje taki element
					hashTab[currHash] = 1;
					notesArr[i].checked = false;
				}
				else { // jeśli już wcześniej taki znaleziono
					notesArr[i].checked = true;
				}
			}
		}, true);
		
		var oppositeNotes = document.createElement('span');
		oppositeNotes.innerHTML = ' [' + lang[ln]['notesChbOpp'] + '] ';
		oppositeNotes.addEventListener('click', function(){
			for (var i=0;i<notesArr.length;i++)
				notesArr[i].checked = !notesArr[i].checked;
		}, true);
		
		
		options.appendChild(infoSpan);
		options.appendChild(allNotes);
		options.appendChild(noNotes);
		options.appendChild(duplNotes);
		options.appendChild(oppositeNotes);
	}
	
	
	//////
	////// KONIEC AUTOZAZNACZANIE NOTATEK
	////// POCZĄTEK WYRÓŻNIONE BUDYNKI/POJAZDY
	//////
	
	function bookmarkBuildingsVehicles(){
		var char4digits = get4digits();
		
		var hlDiv = document.createElement('div');
    hlDiv.style.width = '700px';
    hlDiv.style.margin = 'auto';
    hlDiv.style.marginTop = "10px";
    hlDiv.style.background = 'rgba(0, 58, 0, 0.86)';
    hlDiv.style.boxShadow = '3px 3px 10px #004000, -3px -3px 10px #003A00, 3px -3px 10px #003000';

		var titleBars = document.getElementsByClassName('titlebar txt-title');
		
		var isVehBar = false;
		var isBuildBar = false;
		var sumVeh = 0; // sum of bookmarked vehicles
		var sumBuild = 0; // sum of bookmarked buildings
		
		for (var i=0; i < titleBars.length; i++) {
			var currBar = titleBars[i];
			if (
				(currBar.textContent.indexOf(lang[chLn]['vehCategoryLandVehicles']) >= 0) ||
				(currBar.textContent.indexOf(lang[chLn]['vehCategoryShips']) >= 0) ||
				(currBar.textContent.indexOf(lang[chLn]['vehCategoryConstructions']) >= 0)
			) { // add to veh
				if (!isVehBar) {
					isVehBar = true;
					var vehTitle = createHeaderTitle(lang[ln]['bmVehTitle'], 8);
					hlDiv.appendChild(vehTitle);
				}
				var ourCenter = skipIfNotCenter(currBar.nextSibling);
				sumVeh += addToHighlightList(ourCenter);
			} else if (
				(currBar.textContent.indexOf(lang[chLn]['categoryBuildingsOutside']) >= 0) ||
				(currBar.textContent.indexOf(lang[chLn]['categoryBuildingsInside']) >= 0)
			) { // add to buildings
				if (!isBuildBar) {
					isBuildBar = true;
					var buildTitle = createHeaderTitle(lang[ln]['bmBuildTitle'], 8);
					hlDiv.appendChild(buildTitle);
				}
				var ourCenter = skipIfNotCenter(currBar.nextSibling);
				
				sumBuild += addToHighlightList(ourCenter);
			}
		}

		if (isVehBar || isBuildBar) {
			if ((sumVeh == 0) && (vehTitle != null)) {
				vehTitle.parentNode.removeChild(vehTitle);
			}
			if ((sumBuild == 0) && (buildTitle != null)) {
				buildTitle.parentNode.removeChild(buildTitle);
			}
			titleBars[1].parentNode.insertBefore(hlDiv, titleBars[1]);
		}

		function skipIfNotCenter(node) {
			if (node.tagName != "CENTER") {
				return node.nextSibling;
			}
			return node;
		}
		
		function addToHighlightList(selObjects){
		var count = 0;
		var objList = selObjects.getElementsByTagName('tr');
			for (var obID=0;obID<objList.length;obID++){
				var objID = '';
				var currObj = objList[obID];
				var currObjTDs = currObj.getElementsByTagName('td'); // TR zawierający informacje o pojeździe. Należy uważać, żeby nic nie popsuć
				
				var lineDiv = document.createElement('div');
				var lastElement;
				for (var tdi = 0; tdi<currObjTDs.length; tdi++){
					var currTD = currObjTDs[tdi];
					var inputNode = currTD.getElementsByTagName('input')[0];
					if (inputNode != null && objID == '')
						objID = inputNode.value;
					var currDiv = document.createElement('div');
					currDiv.innerHTML = currObjTDs[tdi].innerHTML;
					currDiv.style.display = 'inline';
					currDiv.style.verticalAlign = 'top';
					
					// usuwanie stylu dla dodatkowych znaków
					var pe = currDiv.getElementsByTagName('p');
					for (var idx = 0;idx<pe.length;idx++)
						pe[idx].style.display = 'none';
							
					lineDiv.appendChild(currDiv);
					lastElement = currDiv;
				}
				if (itemExists(char4digits, objID)){   // todo
					count++;

					hlDiv.appendChild(lineDiv);
				}
				var selectionTD = document.createElement('td');
				if (!itemExists(char4digits, objID))
					setEnable(selectionTD);
				else setDisable(selectionTD);
				
				setChangeListener(selectionTD, char4digits, objID);
				
				currObj.insertBefore(selectionTD, currObjTDs[currObjTDs.length-1]); // dodajemy gwiazdkę tuż przed ostatnim elementem - tekstem
			}
			return count;
		}
	}
	
	

	
	function setChangeListener(master, digits, idek){
		master.addEventListener('click', function(){
			if (!itemExists(digits, idek)){ // gdy taki wpis nie istniał
				itemSet(digits, idek);
				// todo set localStorage że to ma być wyróżnione
				setDisable(master);
			}
			else {
				itemRemove(digits, idek);
				setEnable(master);
			}
		}, true);
	}
	
	function itemExists(dgt, obi){
		return localStorage.getItem('CE_hl_' + dgt + '_' + obi);
	}
	
	function itemSet(dgt, obi){
		localStorage.setItem('CE_hl_' + dgt + '_' + obi, 'yes');
	}
	
	function itemRemove(dgt, obi){
		localStorage.removeItem('CE_hl_' + dgt + '_' + obi);
	}
	
	function setEnable(tnode){
		tnode.innerHTML = '(+)';
	}
	function setDisable(tnode){
		tnode.innerHTML = '[-]';
	}
	
	
	//////
	////// KONIEC WYRÓŻNIONE BUDYNKI/POJAZDY
	////// POCZĄTEK OPERACJE NA STRONIE ZDARZEŃ
	//////
	
	function eventsFilter(){
		var ID4digits = get4digits();
		
		// łączenie komunikatów tego samego typu - pod warunkiem zaznaczenia pewnej opcji w wiadomo czym
		if (enabledInStorage('GroupEvents') && lang[chLn]){

		    var types = [
				{
					'id': 1,
          'pretext': lang[chLn]['groupPreEventsSbUse'],
					'regexp': lang[chLn]['groupEventsSbUse'],
					'f1':function(fst,snd, p, arg0, perf){
						if (p[1] == perf && p[4] == arg0){
							fst.innerHTML = fst.innerHTML.substr(0, fst.innerHTML.indexOf(p[3])) + ', '  + p[2] + fst.innerHTML.substr(fst.innerHTML.indexOf(p[3]));
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 2,
          'pretext': lang[chLn]['groupPreEventsSbHunt'],
					'regexp': lang[chLn]['groupEventsSbHunt'],
					'f1':function(fst,snd, p, arg0, perf){
						if (p[1] == perf && p[4] == arg0){
							fst.innerHTML = fst.innerHTML.substr(0, fst.innerHTML.indexOf(p[3])) + ', '  + p[2] + fst.innerHTML.substr(fst.innerHTML.indexOf(p[3]));
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 3,
          'pretext': lang[chLn]['groupPreEventsSbPoke'],
					'regexp': lang[chLn]['groupEventsSbPoke'],
					'f1':function(fst,snd, p, arg0, perf){
						if (p[1] == perf){
							fst.innerHTML = fst.innerHTML.substr(0, fst.innerHTML.lastIndexOf('.')) + ', '  + p[2] + fst.innerHTML.substr(fst.innerHTML.lastIndexOf('.'));
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 4,
          'pretext': lang[chLn]['groupPreEventsSbTake'],
					'regexp': lang[chLn]['groupEventsSbTake'],
					'f1':function(fst,snd, p, arg0, perf){
						if (p[1] == perf){
							fst.innerHTML = fst.innerHTML.substr(0, fst.innerHTML.lastIndexOf('.')) + ', '  + p[2] + fst.innerHTML.substr(fst.innerHTML.lastIndexOf('.'));
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 5,
          'pretext': lang[chLn]['groupPreEventsSbDrop'],
					'regexp': lang[chLn]['groupEventsSbDrop'],
					'f1':function(fst,snd, p, arg0, perf){
						if (p[1] == perf){
							fst.innerHTML = fst.innerHTML.substr(0, fst.innerHTML.lastIndexOf('.')) + ', '  + p[2] + fst.innerHTML.substr(fst.innerHTML.lastIndexOf('.'));
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 6,
          'pretext': lang[chLn]['groupPreEventsSbGive'],
					'regexp': lang[chLn]['groupEventsSbGive'],
					'f1':function(fst,snd, p, arg0, perf){
						if (p[1] == perf){
							fst.innerHTML = fst.innerHTML.substr(0, fst.innerHTML.lastIndexOf('.')) + ', '  + p[2] + fst.innerHTML.substr(fst.innerHTML.lastIndexOf('.'));
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 7,
          'pretext': lang[chLn]['groupPreEventsSbDragRes'],
					'regexp': lang[chLn]['groupEventsSbDragRes'],
					'f1':function(fst,snd, p, arg0, perf){
						if (arg0 == p[4]){
							var firstP = fst.innerHTML.substr(0, fst.innerHTML.indexOf(p[4]));
							var secP = fst.innerHTML.substr(fst.innerHTML.indexOf(p[4]));
							fst.innerHTML =  firstP + ', '  + p[2] + secP;
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				},
				{
					'id': 8,
          'pretext': lang[chLn]['groupPreEventsSbThrowDie'],
					'regexp': lang[chLn]['groupEventsSbThrowDie'],
					'f1':function(fst,snd, p, arg0, perf){
						if (arg0 == p[1]) {
							var firstP = fst.innerHTML.substr(0, fst.innerHTML.lastIndexOf('.'));
							var secP = fst.innerHTML.substr(fst.innerHTML.lastIndexOf('.'));
							fst.innerHTML =  firstP + ', '  + p[3] + secP;
							snd.innerHTML = '';
							return true;
						}
						return false;
					}
				}
			];
			
      var node = document.body;
      node = node.getElementsByTagName('center')[3];
      node = node.getElementsByTagName('table')[1];
      var eventNode = node.getElementsByTagName('td')[0];

      
			var divs = eventNode.getElementsByTagName('div');
			var timexp = /(\d+)-(\d+)\.<small>(\d+)<\/small>/; // time regexp
			var startTime = new Date().getTime();

			var arrtime = [];
			var lastType = 0;
			var first = 0;
			var sub = '';
			var perf = '';
			
			for (var i=0;i<divs.length;i++) {
				var tdiv = divs[i];
					
				if ((tdiv.innerHTML.indexOf(lang[chLn]['groupPreEventsYouSay']) == -1) &&
					(tdiv.innerHTML.indexOf(lang[chLn]['groupPreEventsSbSay']) == -1) &&
					(tdiv.innerHTML.indexOf(lang[chLn]['groupPreEventsSbWhisper']) == -1)
				) {
					
					var ctime = timexp.exec(tdiv.innerHTML); // zakładam, że zawsze będzie pasować
					var matched = false;
					for (var u=0;u<types.length && !matched;u++) {
						var type = types[u];
						if (tdiv.innerHTML.indexOf(type.pretext) == -1) {
							continue;
						}
						var rexp = type.regexp;
						
						var parts = rexp.exec(tdiv.innerHTML);
						if (parts) {
							matched = true;
							
							if ((lastType != type.id) || !isnear(ctime, arrtime) ||
								!type.f1(first, tdiv, parts, sub, perf)
							) { // mimo tego samego typu nie udalo sie skleic, bo roznia sie szczegoly; zaczynamy od poczatku
								first = tdiv;
								lastType = type.id;
								sub = parts[4];
								perf = parts[1];
								arrtime = ctime;
							}
            }
					}
					if (!matched) {
						lastType = 0;
					}
				} else {
					lastType = 0;
				}
			}
		}
		console.log("Event grouping time: " + (new Date().getTime() - startTime));
		// funkcja sprawdzająca odległość czasową
		
		function isnear(tab1, tab2){ // sprawdza czy pierwsza komórka jest taka sama a druga +- 1 min taka sama
			var t1 = tab1[1]*8*36+tab1[2]*36+tab1[3];
			var t2 = tab2[1]*8*36+tab2[2]*36+tab2[3];
			
			return Math.abs(t2-t1) <= GROUPEVENTS_MAX_MIN_DIFF;
		}
		
		var divp = document.createElement('div');
		
		/*
			pobieranie numeru postaci
		*/
		
		var charID = getCharId();
		
		/*
		 Popup do szeptów
		 */


		// it's to disable old CE whispering code when new one will be available
		var allowCeJsPopup = enabledInStorage('PopupButtons');
		if (typeof initialWhisperingBookmarks !== 'undefined' && localStorage.getItem('CE_FirstVisitAfterChange') != 'aaaa') {
			localStorage.setItem('CE_FirstVisitAfterChange', "aaaa");
			localStorage.setItem('CE_enablePopupButtons', false);
			allowCeJsPopup = false; // can't be done by enabledInStorage("popupbuttons"), because the function is cached
		}
		

		if (allowCeJsPopup) {
			var placeForButton = document.body.getElementsByTagName('center')[3].getElementsByTagName('form')[0];
			placeForButton = placeForButton.getElementsByTagName('td')[1];
			talkToAllButton = placeForButton.getElementsByTagName('input')[0];
			talkToAllButton.id = "talkToAllButton";
			
			var receiverList = document.createElement('div');
			receiverList.id = "receiverList";
			receiverList.style.backgroundColor = "#131";
			receiverList.style.padding = "7px";
			receiverList.style.width = "700px";
			receiverList.style.textAlign = "left";
			
			var whisperTarget = document.createElement('input');
			whisperTarget.id = "whisperTarget";
			whisperTarget.value = 0;
			whisperTarget.style.display = "none";
			document.body.appendChild(whisperTarget);

			var whisperButton = document.createElement('input');
			whisperButton.type = "button";
			whisperButton.value = lang[ln]['ajaxEventsWhisperButton'];
			whisperButton.style.verticalAlign = "top";
			whisperButton.className = "button_charmenu";
			whisperButton.style.width = "150px";
			
			whisperButton.addEventListener("click", function () {
				var wTarget = document.getElementById('whisperTarget').value;
				var wText = document.getElementById('messageField').value;
				if (wTarget >= 0 && wText.length > 0) {
					var xmlHttp = new XMLHttpRequest();
					xmlHttp.open("POST", "liteindex.php?page=talk&character=" +
					charID + "&to=" + wTarget, true);
					xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
					xmlHttp.onreadystatechange = function() {
						if (xmlHttp.readyState == 4) {
							var ret = {};
							try {
								ret = JSON.parse(xmlHttp.responseText);
							} catch (e) {}
							if ("e" in ret) {
								errorReport.add(ret["e"]);
							} else {
								document.getElementById('messageField').value = "";
								unsafeWindow.skipTimeout = true;
							}
						}
					}
					xmlHttp.send("message=" + wText);
				}
			});


			var chooseText = document.createElement('p');
			chooseText.innerHTML = lang[ln]['ajaxEventsYouTalkingTo'];
			chooseText.style.margin = "0px 0px 7px 5px";
			receiverList.appendChild(chooseText);		

			placeForButton.insertBefore(whisperButton, talkToAllButton);

			var mess = document.getElementById('messageField');
			
			if (mess.nodeName == "INPUT") {
				if (mess.offsetWidth > 550) {
					mess.size = 65;
				}
				mess.addEventListener("keypress", function(evt) {
					if (evt.keyCode == 13 && whisperTarget.value > 0) {
						whisperButton.click();
						evt.preventDefault();
					}
				}, true);
			}
			
			
			/*
				Funkcja wyświetlająca popup
			*/

			// możliwe przyciski
			var charDescIMG = document.createElement('a');
			var img = document.createElement('img');
			img.src = "graphics/cantr/pictures/button_small_char_happy.gif";
			charDescIMG.appendChild(img);
			
			var talkIMG = document.createElement('a');
			var img = document.createElement('img');
			img.src = "graphics/cantr/pictures/button_small_talk.gif";
			talkIMG.appendChild(img);
			
			var renameIMG = document.createElement('a');
			var img = document.createElement('img');
			img.src = "graphics/cantr/pictures/button_small_keytag.gif";
			renameIMG.appendChild(img);
			
			if (enabledInStorage('PopupButtons')) {
				divp.appendChild(charDescIMG);
				divp.appendChild(talkIMG);
				divp.appendChild(renameIMG);
			}
			// trzeba wpisac recznie ;)
			var popupWidth = 96;
			
			var hashTimeout = 0;
			var hovered = false;
			divp.addEventListener('mouseover', function(){hovered = true; }, false);
			divp.addEventListener('mouseout', function() {
				hovered = false; setTimeout(
					function() {
						if (!hovered) {
							divp.style.display = 'none';
						}
					}, enabledInStorage('ClickInsteadOfHover') ? 1000 : 250);
			}, false);

			var toList = [];
			toListLoadFromStorage();
			toListAdd(lang[ln]["ajaxEventsToEveryone"], 0);
			toListSelect(0);
			if (toList.length <= 1) {
				receiverList.style.display = "none";
			}

			var bigCenter = document.body.getElementsByTagName("center")[3];
			bigCenter.insertBefore(receiverList, bigCenter.firstChild);
		}

		function toListAdd(name, id) {
			for (var i=0;i<toList.length;i++) {
				if (toList[i].id == id) {
					return;
				}
			}
			var el = document.createElement('div');
			el.innerHTML = name;
			el.style.display = "inline";
			el.className = "button_charmenu";
			el.style.padding = "3px";
			el.style.margin = "2px";
			el.addEventListener('click', function() {
				toListSelect(id);
			});

			if (id != 0) {
				var del = document.createElement('input');
				del.type = "button";
				del.value = "x"
				del.addEventListener("click", function(evt) {
					evt.stopPropagation();
					toListRemove(id);
					toListSaveInStorage();
				}, true);
				el.appendChild(del);
			}
			receiverList.appendChild(el);
			toList.push({ name: name, id: id, tag: el });
		}

		function toListRemove(id) {
			for (var i=0;i<toList.length;i++) {
				if (toList[i].id == id) {
					receiverList.removeChild(toList[i].tag);
					toList.splice(i, 1);
				}
				if (document.getElementById('whisperTarget').value == id) {
					toListSelect(0);
				}
			}
		}

		function toListRename(name, id) {
			for (var i=0;i<toList.length;i++) {
				if (toList[i].id == id) {
					toList[i].name = name;
					toList[i].tag.firstChild.textContent = name;
				}
			}
		}

		function toListSelect(id) {
			for (var i=0;i<toList.length;i++) {
				if (toList[i].id == id) {
					toList[i].tag.className = "button_charmenuactive";
				} else {
					toList[i].tag.className = "button_charmenu";
				}
			}
			whisperButton.style.display = (id == 0) ? "none" : "block";
			talkToAllButton.style.display = (id == 0) ? "block" : "none";
			
			document.getElementById('whisperTarget').value = id;
		}

		function toListSaveInStorage() {
			if (toList.length == 1) { // just "to everyone" -> remove from localStorage
				localStorage.removeItem("CE_whisperToList_" + charID);
			} else {
				toSave = [];
				for (var i=0;i<toList.length;i++) {
					toSave[i] = {id: toList[i].id, name: toList[i].name};
				}
				var jsonReceivers = JSON.stringify(toSave);
				localStorage.setItem("CE_whisperToList_" + charID, jsonReceivers);
			}
		}

		function toListLoadFromStorage() {
			var jsonReceivers = localStorage.getItem("CE_whisperToList_" + charID);
			if (jsonReceivers) {
				var decoded = JSON.parse(jsonReceivers);
				for (var i=0;i<decoded.length;i++) {
					toListAdd(decoded[i].name, decoded[i].id);
				}
			}
		}

		function fadein(opt){
			for (var g=0;g<=3;g++)
				setTimeout(setOpacity(g), 15*g);
			function setOpacity(k){
				return function(){
					opt.style.opacity = k/3;
				}
			}
		}
		
		var isPromptOpened = false;		
		
		function popup(nn, targetID){
			return function (){
				var px = Math.round(posX(nn)+nn.offsetWidth/2 - popupWidth/2);
				var py = Math.round(posY(nn)+nn.offsetHeight/2 + 8);
				setTimeout(inside(), 100);
				hashTimeout = px*137+py;
				
				function inside(){
					return function() {
						if (hashTimeout == px*137+py){
							if (!enabledInStorage('AjaxWhisper')) {
								talkIMG.href = 'index.php?page=talk&character=' + charID + '&to=' + targetID;
							} else {
								talkIMG.addEventListener('click', function() {
									document.getElementById('receiverList').style.display = "block";
									toListAdd(nn.textContent, targetID);
									toListSelect(targetID);
									toListSaveInStorage();
								});
							}
							charDescIMG.href = nn.href;

							var renameChar = function (charID, targetID) {
								return function() {
									if (isPromptOpened) return; // disallow multiple prompts
									isPromptOpened = true;
									var nodes = document.getElementsByClassName('char_' + targetID);
									var newName = prompt(lang[ln]['eventsRenameChar'], nodes[0].textContent);
									if (!newName) {
										setTimeout(function() {isPromptOpened = false;}, 50); // bo sie pojawialo wielokrotnie :(
										return;
									}
									
									var xmlHttp = new XMLHttpRequest();
									xmlHttp.open("POST", "index.php?page=name&character=" +
									charID + "&type=1&target_id=" + targetID, true);
									xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
									xmlHttp.send("name=" + newName);

									for (var i=0;i<nodes.length;i++) {
										var myNode = nodes[i];
										if (myNode.firstChild != null) {
											myNode = myNode.firstChild;
										}
										myNode.textContent = newName;
									}
									toListRename(newName, targetID);
									toListSaveInStorage();
									setTimeout(function() {isPromptOpened = false;}, 50); // bo sie pojawialo wielokrotnie :(
								};
							};

							renameIMG.onclick = renameChar(charID, targetID);
							
							divp.style.display = 'block';
							fadein(divp);
							divp.style.top = py + 'px';
							divp.style.left = px + 'px';
						}
					};
				}
			};
		}

		function popdown(nn){
			return function (){
				setTimeout(destroy(), 500);
				function destroy(){
					return function (){
						if (!hovered)
							divp.style.display = 'none';
					}
				}
			};
		}
		
		function popupstart(nnd){
			var characterID = /char_(\d+)/.exec(nnd.className)[1];
			if (allowCeJsPopup) {
				if (enabledInStorage('ClickInsteadOfHover')) {
					nnd.addEventListener('click', popup(nnd, characterID));
					nnd.addEventListener('click', function (evt) { evt.preventDefault(); });
				} else {
					nnd.addEventListener('mouseover', popup(nnd, characterID), false);
				}
				nnd.addEventListener('mouseout', popdown(nnd), false);
			}

			
			if (enabledInStorage('ShortNames') && chLn == 'pl') {
				switch (nnd.innerHTML){
					case 'dwudziestoletni mężczyzna': nnd.innerHTML = 'dwudziestolatek'; break;
					case 'trzydziestoletni mężczyzna': nnd.innerHTML = 'trzydziestolatek'; break;
					case 'czterdziestoletni mężczyzna': nnd.innerHTML = 'czterdziestolatek'; break;
					case 'pięćdziesięcioletni mężczyzna': nnd.innerHTML = 'pięćdziesięciolatek'; break;
					case 'sześćdziesięcioletni mężczyzna': nnd.innerHTML = 'sześćdziesięciolatek'; break;
					case 'siedemdziesięcioletni mężczyzna': nnd.innerHTML = 'siedemdziesięciolatek'; break;
					case 'osiemdziesięcioletni mężczyzna': nnd.innerHTML = 'osiemdziesięciolatek'; break;
					
					case 'dwudziestoletnia kobieta': nnd.innerHTML = 'dwudziestolatka'; break;
					case 'trzydziestoletnia kobieta': nnd.innerHTML = 'trzydziestolatka'; break;
					case 'czterdziestoletnia kobieta': nnd.innerHTML = 'czterdziestolatka'; break;
					case 'pięćdziesięcioletnia kobieta': nnd.innerHTML = 'pięćdziesięciolatka'; break;
					case 'sześćdziesięcioletnia kobieta': nnd.innerHTML = 'sześćdziesięciolatka'; break;
					case 'siedemdziesięcioletnia kobieta': nnd.innerHTML = 'siedemdziesięciolatka'; break;
					case 'osiemdziesięcioletnia kobieta': nnd.innerHTML = 'osiemdziesięciolatka'; break;
				}
			}
			
			if (enabledInStorage('ColorNames')){
				var colors = ['#eeeeee', '#3dc5cc', '#fefefe', '#ffec77', '#e8ff8b', '#000080', '#333333', '#330033', '#4b2500', '#004000'];
				
				var name = nnd.innerHTML;
				var k = Math.abs(name.hashCode());
				var e = k%5;
				k = Math.floor(k/10);
				var o = k%5;
				if (e < 5)
					o = o+5;

				var spanNode = document.createElement('span');
				spanNode.style.backgroundColor = colors[o];
				spanNode.style.color = colors[e];
				spanNode.style.opacity = "0.6";
				spanNode.innerHTML = name;
				nnd.innerHTML = "";
				nnd.appendChild(spanNode);
			}
		}
	
		if (allowCeJsPopup) {
			divp.style.zIndex = 5;
			divp.style.position = 'absolute';
			divp.style.display = 'none';
			divp.style.padding = '2px';
			divp.style.background = '#008800';
			document.body.appendChild(divp);
		}

			var startTime = new Date().getTime();
			var divs = eventNode.children;
			for (var i=0;i<divs.length;i++){
				var aNodes = divs[i].getElementsByClassName('character');
				for (var k=0;k<aNodes.length;k++){
					popupstart(aNodes[k]);
				}
			}
			console.log("Character name matching time: " + (new Date().getTime() - startTime));
		
		/*
			NEW EVENTS
		*/

		var eventsNumber = divs.length;
		
		function refreshEvents() {
			return function() {
				var newEvents = divs.length - eventsNumber;
				for (var i = 0; i < newEvents; i++) {
					var aNodes = divs[i].getElementsByClassName('character');
					for (var k=0;k<aNodes.length;k++) {
						var nnode = aNodes[k];
						popupstart(nnode);
					}
				}
				eventsNumber = divs.length;
			};
		}

		setInterval(refreshEvents(), 1000);

		/*
		* KRESKA POKAZUJACA DOKAD SIE DOCZYTALO ZDARZENIA
		*/

		if (enabledInStorage('LineEventsNotFocused')) {
			var eventsFocus = divs.length;
			var lastUnderlinedNode = null;
			
			function onFocus() {
				var diff = divs.length - eventsFocus;
				if (diff > 0) {
					if (lastUnderlinedNode != null) {
						lastUnderlinedNode.style.borderBottom = "none";
					}
					lastUnderlinedNode = divs[diff-1];
					lastUnderlinedNode.style.borderBottom = "1px dashed #820";
				}
			}

			function onBlur() {
				eventsFocus = divs.length;
			}
			
			window.onfocus = onFocus;
			window.onblur = onBlur;
		}
	}
	
	//////
	////// KONIEC OPERACJE NA STRONIE ZDARZEŃ
	////// POCZĄTEK ZEGAREK
	//////
	
	
	function cantrClock(){
		var client = new XMLHttpRequest();
		var result = 0;
		client.open("OPTIONS", "*", true);
		client.send();
		client.onreadystatechange = function() {
			if(this.readyState == 2) {
				var regEx =  new RegExp(/^(.*?), (\d+) (.*?) (\d+) (\d+:\d+:\d+)(.*?)$/); // RegExp gets hour min and sec section from string like: "Thu, 11 Aug 2011 23:53:13 GMT"
				var dateParts = regEx.exec(client.getResponseHeader("Date"));
				//console.log('time: ' + dateParts[0]);
					var dens = dateParts[5].split(':');
					result = dens[0]*3600;
					result += dens[1]*60;
					result += dens[2]*1; // idiotyzm -,-
					cantrClockWithTime(result);
			}
		}
	}
	
	function cantrClockWithTime(serverTime){
		var node = document.body;
		var datespan = node.getElementsByTagName('td')[0].getElementsByTagName('span')[2];

		console.log('serverTime = ' + serverTime);
    
    var startDate = document.getElementById('datetime').innerHTML;
    
		// wyłuszczanie dnia i godziny z tego tekstu
		var rx1 = /^(.*)(\d+)(.*?)(\d+:\d+:\d+)(.*)$/; // regexp który wycina z treści w stylu "Day 3338 Time: 0:35:27"
		var parts = rx1.exec(startDate);
		// [1] "day:", [2] dayCount (i.e. '3333'), [3] "time", [4] timeCount(i.e. '3:06:05')
		var day = parts[2];
		var time = parts[4];
		var timeSplit = time.split(':');
		var hour = timeSplit[0];
		var min = timeSplit[1];
		var sec = timeSplit[2];
		
		var ticks = [];

		ticks[0] = addTick('sailing', 0, 44, 0);
		ticks[1] = addTick('travel', 1, 10, 0);
		ticks[2] = addTick('project', 1, 40, 0);
		 
    var x = 0;
		var systemTime = Math.floor(new Date().getTime()/1000);
		setInterval(function (){clockTick();}, 500);
		
		function clockTick(){
		var newTime = Math.floor(new Date().getTime()/1000);
		if (newTime == systemTime) {
			return;
		}
		systemTime = newTime;
		
			var to0 = (((ticks[0]['min']*1+36)-min)*60+ticks[0]['sec']*1-sec)%(36*60); // 10:20    -> 14:00
			var to1 = (((ticks[1]['min']*1+36)-min)*60+ticks[1]['sec']*1-sec)%(36*60);
			var to2 = (((ticks[2]['min']*1+36)-min)*60+ticks[2]['sec']*1-sec)%(36*60);
			var used = 0;
			if (to0 < to1){
				if(to2 < to0)
					used = 2;
			}
			else {
				if (to1 < to2)
					used = 1;
				else used = 2;
			}
			toTick = ((ticks[used]['min']*60+ticks[used]['sec']+36*60-min*60-sec)*5-x)%(3600*3);
			// migający alarm gdy tura się zbliża
			if (toTick*1 < 10*60){
				datespan.style.background = '#' + (Math.round(toTick)%2 ? 'AA':'FF') + '0000'; // miganie komunikatu
			} else {
				datespan.style.background = 'none';
			}
			
			var hoursLeft = '';
			var minsLeft = Math.floor(toTick/60);
			var secsLeft = Math.round(toTick%60);
			if (minsLeft >=60){
				hoursLeft =  Math.floor((minsLeft/60)) + ':';
				minsLeft %= 60;
			}
			if (minsLeft < 10 && hoursLeft != '')
				minsLeft = '0' + minsLeft;
			if (secsLeft < 10)
				secsLeft = '0' + secsLeft;
			
			var timeLeft = hoursLeft + minsLeft + ':' + secsLeft;
			datespan.innerHTML = lang[ln]['clockTimeLeft']+ ' <b>' + timeLeft + '</b> ' + lang[ln]['clockUntil'] + ' ' + lang[ln]['clockTick' + ticks[used]['name']];
      
    
			// refresh every second, but second in cantr is 5 times longer
			x++;
			if (x < 5)
				return;
			x = 0;
			
			sec++;
			if (sec >= 60){
				sec = 0;
				min++;
					if (min >= 36){
						min = 0;
						hour++;
						if (hour >= 8){
							day++;
						}
					}
				}
			// setTime();
      
		}
		
		

		
		
		function addTick(tickName, tickHour, tickMin, tickSec){
			//console.log(tickHour + ' ' + tickMin + ' ' + tickSec);
			var s_tickTime = tickHour*3600;
			s_tickTime += tickMin*60;
			s_tickTime = s_tickTime + tickSec*1;
			// tymczasowo
			//console.log('tickName: ' + tickName);
			//console.log('serverTime: ' + serverTime + ' s_tickTime: ' + s_tickTime);
			var rlSecondsToNextTick = ((s_tickTime+24*60*60 - serverTime)%(3600*3)); // czas do najbliższego ticku w sekundach
			var cantrSecsToNextTick = rlSecondsToNextTick/5;
			//console.log('cantrSecsToNextTick ' + cantrSecsToNextTick);
			var cantrMinsToNextTick = Math.floor(cantrSecsToNextTick/60);
			cMin = (min*1+cantrMinsToNextTick*1)%36;
			cSec = Math.round(sec*1+cantrSecsToNextTick*1%60);
			if (cSec >= 60){ // if na wypadek gdyby sec+reszta z dzielenia SecsToNextTick dawała razem pełną minutę
				cSec -= 60;
				cMin++;
			}
			
			var resArr = new Array();
			//console.log('cantrTime ' + cMin + ' ' + cSec);
			resArr['min'] = cMin;
			resArr['sec'] = cSec;
			resArr['name'] = tickName;
			return resArr;
		}
		
		
	}
	
	//////
	////// KONIEC ZEGAREK
	////// POCZĄTEK PASEK NARZĘDZI POSTACI
	//////

	function charMenuToolbar() {
		var toolbar = document.createElement('div');
		toolbar.style.display = "block";
		toolbar.style.width = "60px";
		toolbar.style.backgroundColor = "#040";
		toolbar.style.padding = "3px";
		toolbar.style.position = "fixed";
    var width = window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
    var pos = width/2 + 350 + 20;
		toolbar.style.top = "20px";
		toolbar.style.left = pos + "px";

		var oldCharMenu = document.getElementById('character_menu');
		var els = oldCharMenu.getElementsByTagName('a');
		for (var i=0; i < els.length; i++) {
			var newEl = els[i].cloneNode(true);
			toolbar.appendChild(newEl);
		}
		var backToPlayer = document.getElementById('player_menu').getElementsByTagName('a')[0];
		toolbar.appendChild(backToPlayer.cloneNode(true));
		
		document.body.appendChild(toolbar);
	}

	//////
	////// KONIEC PASEK NARZĘDZI POSTACI
	////// POCZĄTEK WYBORU JĘZYKA ZA PIERWSZYM RAZEM
	//////
	
	function langSelection() {
		var cent = document.body.getElementsByTagName('center')[0];
		var tabla = cent.getElementsByTagName('table')[0];
    var trForBox = document.createElement('tr');
		var langSpanBefore = document.createElement('p');
		var langSpanAfter = document.createElement('p');
    langSpanBefore.style.margin = '3px';
    langSpanAfter.style.margin = '3px';
		var langDiv = document.createElement('td');
    langDiv.colSpan = 2;
		langDiv.style.backgroundColor = '#008800';
		langDiv.style.padding = '2px';
		langSpanBefore.innerHTML = lang[ln]['langSelectionTextBefore'];
		langSpanAfter.innerHTML = lang[ln]['langSelectionTextAfter'];
    trForBox.appendChild(langDiv);
		tabla.insertBefore(trForBox, tabla.firstChild);
    
		langDiv.appendChild(langSpanBefore);
		langDiv.appendChild(languageNode());
		langDiv.appendChild(langSpanAfter);
	}
	
	//////
	////// KONIEC WYBORU JĘZYKA ZA PIERWSZYM RAZEM
	////// POCZĄTEK OPCJE
	//////
	
	function optionPanel(){
		var node = document.body;
		node = node.getElementsByTagName('center')[0]; // node - wszystkie elementy z <center>
		tabn = node.getElementsByTagName('table')[0];
		allTD = document.createElement('td');
		allTD.colSpan = 2;
		
		var allTR = document.createElement('tr');
		var optionTD = document.createElement('div');
		var showOptions = document.createElement('p');
		showOptions.innerHTML = '[' + lang[ln]['optionsButton'] + ']';
		allTD.appendChild(showOptions);
		allTD.appendChild(optionTD);
		
		allTR.appendChild(allTD);
		tabn.appendChild(allTR);
		
		showOptions.style.textAlign = 'right';
		
		showOptions.addEventListener("click", function(){
				if (optionTD.style.display == 'none')
					optionTD.style.display = 'block';
				else optionTD.style.display = 'none';
			}, true);
		
		
		var CE_Desc = document.createElement('span');
		CE_Desc.style.fontSize = "21px";
		CE_Desc.innerHTML = lang[ln]['optionsTitle'];
		
		
		optionTD.appendChild(CE_Desc);
		
		var oForm = document.createElement('form');
		optionTD.appendChild(oForm);
		optionTD.style.display = 'none';
		optionTD.style.textAlign = 'left';
		optionTD.style.background = "#006600";
		
		
		addCheckbox(oForm, "EventsFilter", lang[ln]['optionsEventsFilter']);
		addCheckbox(oForm, "GroupEvents", lang[ln]['optionsGroupEvents']);
		addCheckbox(oForm, "PopupButtons", lang[ln]['optionsPopupButtons']);
		addCheckbox(oForm, "ClickInsteadOfHover", lang[ln]['optionsClickInsteadOfHover']);
		addCheckbox(oForm, "AjaxWhisper", lang[ln]['optionsAjaxWhisper']);
		addCheckbox(oForm, "ColorNames", lang[ln]['optionsColorNames']);
		addCheckbox(oForm, "ShortNames", lang[ln]['optionsShortNames']);
		addCheckbox(oForm, "Clock", lang[ln]['optionsClock']);
		addCheckbox(oForm, "HighlightedBuildingsVehicles", lang[ln]['optionsBookmarkBuildingsVehicles']);
		addCheckbox(oForm, "GroupBuildingVehicles", lang[ln]['optionsGroupBuildingVehicles']);
		addCheckbox(oForm, "NotesCheckBox", lang[ln]['optionsNotesCheckBox']);
		addCheckbox(oForm, "List", lang[ln]['optionsListObjects']);
		addCheckbox(oForm, "GroupObjects", lang[ln]['optionsGroupObjects']);
		addCheckbox(oForm, "LineEventsNotFocused", lang[ln]['optionsLineEventsNotFocused']);
		addCheckbox(oForm, "CharMenuToolbar", lang[ln]['optionsCharMenuToolbar']);
		
		optionTD.appendChild(languageNode());
		
		optionTD.appendChild(createImportExportArea());
				
		function addCheckbox(upForm, optionName, descText){
			var enableOption = document.createElement('input');
			enableOption.type = 'checkbox';
			enableOption.name = "CE_enable" + optionName;
			var optionDesc = document.createElement('span');
			optionDesc.innerHTML = descText + "<br>";
			enableOption.checked = true;
			if (localStorage.getItem('CE_enable' + optionName) != null && localStorage.getItem('CE_enable' + optionName) == 'false')
				enableOption.checked = false;
				
			enableOption.addEventListener("click", function(){
				localStorage.setItem('CE_enable' + optionName, enableOption.checked);
			}, true);
			
			upForm.appendChild(enableOption);
			upForm.appendChild(optionDesc);
		}
		
		function createImportExportArea() {
			var importExportDiv = document.createElement('div');
			var ietextArea = document.createElement('textarea');
			ietextArea.cols = 83;
			ietextArea.rows = 5;
			
			var importButt = document.createElement('input');
			importButt.type = 'button';
			importButt.value = "import";
			var exportButt = document.createElement('input');
			exportButt.type = 'button';
			exportButt.value = "export";
			
			exportButt.addEventListener("click", function() {
				var values = {};
				for (var i=0;i<localStorage.length;i++) {
					var valueName = localStorage.key(i);
					values[valueName] = localStorage.getItem(valueName);
				}
				ietextArea.value = JSON.stringify(values);
			}, true);
			
			importButt.addEventListener("click", function() {
				try {
					var values = JSON.parse(ietextArea.value);
				} catch (e) { // input is invalid
					return;
				}
				for (idx in values) {
					if (localStorage.getItem(idx) === null) { // item doesn't exist so import
						localStorage.setItem(idx, values[idx]);
					}
				}
			}, true);
			
			importExportDiv.appendChild(ietextArea);
			importExportDiv.appendChild(importButt);
			importExportDiv.appendChild(exportButt);
			return importExportDiv;
		}
		
		
	}
	
	function languageNode(){
		var selectNode = document.createElement('select');
		var noOp = addLangOption("--");
		var enOp = addLangOption('en');
		var plOp = addLangOption('pl');
		// var deOp = addOption('de');
		
		selectNode.addEventListener("change", function(){
				ln = selectNode.options[selectNode.selectedIndex].value;
				setLanguage(ln);
			}, true);
		
		function addLangOption(language){
			var optionNode = document.createElement('option');
			optionNode.name = language;
			optionNode.innerHTML = language;
			optionNode.value = language;
			if (language == getLanguage())
				optionNode.selected = true;
			selectNode.appendChild(optionNode);
			return optionNode;
		}
		return selectNode;
	}
	
	//////
	////// KONIEC OPCJE
	//////
	
		/*
			posX posY functions - to get global absolute position of the tag
		*/
		function posX(obj){
		var curleft = 0;
		if(obj.offsetParent)
			while(1){
			  curleft += obj.offsetLeft;
			  if(!obj.offsetParent)
				break;
			  obj = obj.offsetParent;
			}
		else if(obj.x)
			curleft += obj.x;
		return curleft;
		}

		function posY(obj){
		var curtop = 0;
		if(obj.offsetParent)
			while(1){
			  curtop += obj.offsetTop;
			  if(!obj.offsetParent)
				break;
			  obj = obj.offsetParent;
			}
		else if(obj.y)
			curtop += obj.y;
		return curtop;
		}

	
	
	function get4digits(){
		var node = document.body;
		node = node.getElementsByTagName('center')[0]; // center nr 1 - tu jest belka postaci
		var nameTRNode = node.getElementsByTagName('tr')[0];
		var nameTDNode = nameTRNode.getElementsByTagName('td')[1]; // td w którym zapisane jest imię
		return (nameTDNode.getElementsByTagName('input')[0].value)%10000; // only last 4 digits for safety reasons, ya know
	}
	
	function createHeaderTitle(title, pts){
		var titleDiv = document.createElement('div');
		titleDiv.innerHTML = '<b>' + title + '</b>';
		titleDiv.style.background = '#008800';
		titleDiv.style.fontSize = pts + 'pt';
		titleDiv.style.textAlign = 'center';
		return titleDiv;
	}
	
	String.prototype.hashCode = function(){
		var hash = 0;
		if (this.length == 0) return hash;
		for (i = 0; i < this.length; i++) {
			char = this.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}
		return hash;
	}
	
	
	/*
	*	SPRAWDZANIE NA KTÓREJ STRONIE SIĘ ZNAJDUJESZ
	*/
	
	function isWrit(tresc, arr){
		var isW = false;
		for (idx=0; idx < arr.length;idx++){
				if (tresc.indexOf(arr[idx]) >= 0)
					isW = true;
		}
		return isW;
	}
	
	function cInput(itype, iname, ivalue){
		var ci = document.createElement('input');
		ci.type = itype;
		ci.name = iname;
		ci.value = ivalue;
		return ci;
	}

	
	
	function checkStrona(){
	var node = document.body;
	node = node.getElementsByTagName('div'); // node - wszystkie elementy z <div>
	if (node.length > 0){ // czy istnieje pierwszy div
		for (var i = 0; i < node.length; i++) {
			if (isWrit(node[i].innerHTML, pageMainPage)) {
				return ('main_page');
			}
		}
	}
	
	if(node.length > 1){ // czy w ogóle istnieje czwart center
	var code = node[1].innerHTML; // kod <center> nr 4 czyli tego z belką w której jest nazwana podstrona	
	
	if(isWrit(code, pageObjects))
		return ('objects');
	if(isWrit(code, pageLocation))
		return ('location');
	if(isWrit(code, pageInventory))
		return ('inventory');
	if(isWrit(code, pageBuildingsAndVehicles))
		return ('building_vehicles');
	if(isWrit(code, pageBuildingsAndVehiclesInside))
		return ('inside_building');
	if(isWrit(code, pageEvents))
		return ('events_page');
	}
	
	var header = node[0];
	if (header != null){
	var code = header.innerHTML;
		// gdy coś podnosisz
		if (isWrit(code, pageTakingInfo)){
			return ('take_resources');
		}
		if (isWrit(code, pageEmptyEnvelope)){
			return ('empty_envelope');
		}
		if (isWrit(code, pageWriteNote)){
			return ('write_note');
		}
		if (isWrit(code, pageRetrieveFromContainer)){
			return ('retrieve_from_container');
		}
		if (isWrit(code, pageShop)){
			return ('shop');
		}
		if (isWrit(code, pageStorageResources)){
			return ('into_container');
		}
		if (isWrit(code, pageSelAmountToProject)){
			return ('project_size');
		}
		if (isWrit(code, pageGiveResources)){
			return ('give_resources');
		}
		if (isWrit(code, pageRepair)){
			return ('repair');
		}
	// jeśli żadnej nas interesującej nie znajdzie
	}
	
	return ('no');
}

function changeName(){
	var cantrTitle = document.body.getElementsByTagName('p')[0];
	cantrTitle.innerHTML = 'Cantr II<span style="font-size:10px;text-shadow: -1px 0 #444444, 0 1px #444444, 1px 0 #444444, 0 -1px #444444;"> enhanced</span>';
}

function getCap(){
	var cnode = document.body.getElementsByTagName('center')[0];
	var capTD = cnode.getElementsByTagName('tr')[4].getElementsByTagName('td')[1];
	var capRexp = /\d+/;
	var capText = capRexp.exec(capTD.innerHTML);
	if (capText)
		return capText[0];
	else return 0;
}

function enabledInStorage(itemName) {
	if (enabledInStorage.items === undefined) {
		enabledInStorage.items = [];
	}
	
	if (enabledInStorage.items[itemName] !== undefined) {
		return enabledInStorage.items[itemName];
	} else {
		var value = localStorage.getItem('CE_enable' + itemName);
		var result = (value == null || value == 'true');
		enabledInStorage.items[itemName] = result;
		return result;
	}
}

function getLanguage(){
	var langResult = localStorage.getItem('CE_language');
	if (langResult != null)
		return langResult;
	return 'en';
}

function setLanguage(setLan) {
	if (lang[setLan] === undefined) {
		setLan = "en";
	}
	localStorage.setItem('CE_language', setLan);
}


// pobieranie języka POSTACI

function getCharacterLanguage(){
	var tab = document.body.getElementsByTagName('table')[0];
	var activeReceivedText = tab.getElementsByTagName('td')[1].getElementsByTagName('span')[0]
	// tekst ile osób było aktywnych w ciągu ostatnich x minut
	
	for (var index in activeText){
		if (activeReceivedText.innerHTML.indexOf(activeText[index]) >= 0){
			return index;
		}
	}
	return 'en'; // default
}

function getCharId() {
	return document.body.getElementsByTagName('center')[0].getElementsByTagName('input')[0].value;
}


// tu zaczyna działać tak naprawdę po raz pierwszy

var scriptStartTime = new Date().getTime();

var strona = checkStrona(); // sprawdzamy czy znajdujemy się na której ze stron "znaczących" - takich na których skrypt ma coś robić


changeName();


if (strona == 'objects' && enabledInStorage('ListObjects')){
	listObjects();
}

if (strona == 'objects' && enabledInStorage('GroupObjects')){
	groupObjects();
}

if (strona == 'inventory' && enabledInStorage('NotesCheckBox')){
	notesCheckBoxInventory();
}

if (strona == 'empty_envelope' && enabledInStorage('NotesCheckBox')){
	notesCheckBoxEnvelopes();
}

if (strona == 'write_note' && enabledInStorage('NotePre')){
	notePreview();
}

if (strona == 'main_page' && localStorage.getItem('CE_language') == null)
	langSelection();

if (strona == 'main_page'){
	optionPanel();
}

if ((strona == 'building_vehicles' || strona == 'inside_building') && enabledInStorage('BookmarkBuildingsVehicles')){
	bookmarkBuildingsVehicles();
}

if (strona == 'events_page' && enabledInStorage('EventsFilter')){
	eventsFilter();
}

if (enabledInStorage('Clock')){
	cantrClock();
}

if (['objects', 'location', 'inventory', 'building_vehicles', 'inside_building',
	'events_page'].indexOf(strona) != -1 && enabledInStorage('CharMenuToolbar')) {
	charMenuToolbar();
}

console.log("Cantr Enhanced execution time: " + (new Date().getTime() - scriptStartTime));
