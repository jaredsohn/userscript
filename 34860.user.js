/**

Copyright 2007 Richard Laffers
Major Modification @Rasatavohary v2.3
-->Updated @ALFik
-->Modified by hombre

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @author      hombre (original script by Risi / Contributor Rasatavohary)
// @namespace	http://userscripts.org/
// @name	    Travian: Farmers Friend ALPHA
// @summary     This is a highly experimental script, based on "travian: task queue with more feature 2.3". 
// @description	i am giving it away since i am quitting travian, maybe someone wants to take on development. we have a seperate asp/mssql server for the town data, if you want that code, feel free to contact me. i dont know if the script is working without the sever, but you can disable all hooks to the server in the code (village population requests, battle report uploads).
//<br>a lot of improvements have gone into the sheduling part: 
// <li> better checking of successful task completion (attack tasks mostly)
// <li> infinite repeat of tasks: no more cluttering of task list. pause/unpause repeat tasks.
// <li> more options: enter time of arrival eg.
//<br>main new features:
//  <li> automatic battle report parsing / clearing and saving to local database and (optional) a server, same for ally battle reports.
//  <li> overview of your farms, resources gained minus losses, attacks history, and production estimation.
//  <li> monitoring of villages rally points: incoming troops, outgoing attacks and attack history at a glance.
// <br>TODOS & limitations:
// <li> make it usable by others
// <li> make it usable by non german players
// <li> test romans and gauls
// @include     http://s*.travian.*/*
// @include     http://s*.travian3.*/*
// @include     http://welt*.travian.*/*
// @exclude     http://forum.travian.*
// @exclude     http://www.travian.*
// @exclude     http://*.travian.*/manual.php*
// @exclude     http://*.travian.*/warsim.php
// @exclude     http://*.travian.*/karte2.php*
// @version     0.9
// ==/UserScript==

/*****************
 * * * Settings * * * *
 ******************/
var LOG_LEVEL = 2; // 0 - quiet, 1 - nearly quiet, 2 - verbose, 3 - detailed
var iCheckEvery = 10000;  // How often do we check for tasks to trigger in miliseconds.
// Low value  = high accuracy in triggering tasks. To make your browser
// unresponsive, set this to some ridiculously small number. Default is 10000
var sLang = "";  // Set this to override the automatic language detection. Available translations: see below.
var iPreloadTime = 20;  // How many seconds ahead is the code for building and upgrading prefetched.
// If the code is not available by the time the construction should start, the
// construction will be cancelled. This value must be greater than iCheckEvery
// in seconds (i.e. iCheckEvery/1000). Default is 20.
var bDisplayVillageNames = true;  //Display village names instead of numbers. May hit the performance.
var iTaskRandomCoeff = 100;       // entre 0 et 100 SEc, the default for random time unit
var iDefaultRepeatInterval = 20;  // minutes
var iDefaultRetryInterval = 10;   // minutes
var DEF_SERVER_BASE = "http://url.ofyour.server"; // http://url.ofyour.server without trailing slash
/**********************
**** End of Settings ****
***********************/



/** GLOBALS - do not tamper! */
var sCurrentVersion = "0.9";  //Version number with which we need to run the update fu
var bUseServerTime;             //IMPORTANT!!! If true, you must be using 24-hour format on your server, otherwise there WILL be errors.
// Your local computer time MUST  still be correct (both time and date!).
var bLocked = false;            // for locking the TTQ_TASKS
var bLockedCode = false;        // for locking the TTQ_CODE_0 and TTQ_CODE_0 
var bLockedHistory = false;
var oIntervalReference = null;
var iSessionRefreshRate = 35;  //Amount of minutes after which the session is refreshed by reloading the dorf1 page in the background. If set to 0, refreshing is disabled. Default: 60
var iMaxPlaceNamesCookieLength = 500;  //maximum number of names stored
var aLangBuildings = [];  //multilang support
var aLangTasks = [];  //multilang support
var aLangStrings = [];  //multilang support
var aLangTroops = [];

// globals set by options
var iScoutUnit;
var iMyRace;        // 0- Romans, 1- Teutons, 2- Gauls. Set via dialogue.
var iHistoryLength; // -1 = infinite
var iDelay;         // global delay on error, deprecated for individual retry intervals

// Images
var sCloseBtn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAIAAAAmdTLBAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH1gYKECMhBqiEGQAAADJ0RVh0Q29tbWVudABFcnN0ZWxsdCB2b24gRmxvcmlhbiBTY2hyZWllciBtaXQgVGhlIEdJTVCOHcWrAAADLUlEQVR42pWUPYhdRRiG32/OuTdZXTcas0n2ZiVVYBttLFLFQuNPZTQgiIIphGBAtNTC0lZBRRQVEYWoBAyk8ActRFCRLa3SpNH9icm699695+6Z+X5ei7Obtc1UH+/MM+/M9w4jJD0wnNi9czVuZ3iwSlKbQ5ohP3rzn+FGTBvmlqbUgpRgBQDdAbC0AOAepbV2ezI3v/Txd+nuQ0Jy4+3XqsMDqeqYjHxryJJRCiPgRneAMKU7rbBktlNrtoaj0WrvrpMXlxMAH29Kf5/0+6hqqXtS16h7SImpkqqSVCHVkipIQqq6NanuTdZXDs7VNQA2WzEZS12znTJvM2eWQi1UpSnDqQUgtcCVpnRHSqmqACQA1BKToY83oxnPPvz0/BvvR9OwaaKZeDOO8TC2NmP077FPfjzw/CvM23STlKTu3eKV04bbE+a8/8FTAI6+dTG00Aq00DK1LF78HcDs6bNwAwPcSaHjc5TCXKh6/fVz3cTggytwQzjc7vt6uRP/OrOEcGEAAXKHB8DcRm5pCvf1V5/pxGOf/kT64pd/7MBPnoArXEEXUrDLRztFyVCFOSMoXH35TMcsfvFrV6ycXUqJIiFwoUmYROz6mzK30LJ7Nwq5+tITt57a6rP3S6IIk0TqeBrC9/oXVhjOcGGIAAmDD7+/xQ+++jMl7PmHwlXC9vrHkqkFYWSQXHjvSkeun3+oK458tizdFjAJEytpz98KNdMK3Ri+8M43O/CFRwBef/EkALlj7sila4IQBlzFC013+bLjT9WFdy938NqFx0CCBHjj3AOdePjyqoSmDv7f+Qtzy9JS8/SXbwGsnT8NN3b5hzP8xnMnALQ/fI5wmkELzQAIyWun5qsD98jMbNq3X6oaAjAEAYRQJYpYFi+wgtKyFMtlPPWrW3zqatQAVEu020kqiZCqliQIh6CLOoXCi1iBFahRzdTVQh0A6pujaA4OuHkDyqqfUdWAgCFCYQi9gsNVwukqZjQ35UghC8cByDSTG3///MKjo7WVfq+mSEhCRJVEAKFXdAlPDPdAeMUozjh6/PFLv/UPDYRkVuzr3dbfh5sjv3OmmunjP4EhhHJu9NM9AAAAAElFTkSuQmCC";
var sDeleteBtn = "data:image/gif;base64,R0lGODlhDAAMANU2AN4ZCtAgFNAgHdsgA9waCs4cDMwkHPNfHcspJ9oYCsoYDc8pINAYCvg0AORNOeFFPtA7O+c+QNRTU8BMSb4gHN5lTNooGsc1N+g+PuEkJOhOKLlVWOwxD9MlGtUiFMwjFcI7LtcfDPY9ANs5L+JMSOxhJLRDO+YfDdYEAPdvHORZRMkZC9EcDcwXE8ssLtonG9gbG+M8EOEZGdkZDNwVCb0pKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAADYALAAAAAAMAAwAQAZJQNNgYisajzZVDHRMBJC2TEvxOY40HNfRsEJGYBKS51gS1aA2gCXVQEApDONDBikuCmgMioV2vC5FMx1GFQchG0g0BDYnAmhFQQA7";

//Styles
var cssStyle = "";
cssStyle += "#ttq_tasklist, #ttq_history {position:absolute; background-color:#90DD43; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:99; -moz-border-radius:5px;}";
cssStyle += "#ttq_stats {position:absolute; background-color:#FFFFFF; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#ttq_monitor {position:absolute; background-color:#FFFFFF; border:1px solid #000000; color:#000000; padding:5px 10px; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#ttq_history {background-color:#D4D4EC}";
cssStyle += ".ttq_history_row {padding:1px 5px;}";
cssStyle += ".ttq_village_name {font-weight:bold;}";
cssStyle += ".ttq_draghandle {font-size: 120%; font-weight:bold;}";
cssStyle += ".ttq_time_village_wrapper {font-style:italic; font-size:80%; display:block;}";
cssStyle += ".ttq_close_btn {float:right; padding:2px 4px; color:white; margin:-5px -15px 0 0;}";
cssStyle +=	"#timerForm {padding:10px 20px; }";
cssStyle += "#timerform_wrapper {position:absolute; max-width:900px !important; margin:0; background-color:#FBEC87; color:black; border:1px #000000 solid; z-index:100; -moz-border-radius:5px;}";
cssStyle += "#timerform_wrapper p {}";
cssStyle +=	"#ttq_message {position:absolute; z-index:100; border:1px solid black; padding:10px 20px; color:black; width:335px}";
cssStyle += ".handle {cursor: move;}";
cssStyle += "a.ttq_sortlink, a#ttq_flush_history {color:#000000;} a.ttq_sortlink:hover, a#ttq_flush_history:hover {color:#F64809} a.ttq_sortlink_active {color:#FDFF3F}";
cssStyle += ".ttq_sort_header {border-bottom:1px dashed #000000}";
cssStyle += ".ttq_research_later {display:block;}";
cssStyle += "table.sortable th { font-weight: bold; cursor: default; }";


GM_addStyle(cssStyle);

detectLanguage();

/** ----------------------- Translations -------------------------------
 * IMPORTANT!
 * If there is no translation available for your language, the script will not work!
 * - aLangBuildings must list all names EXACTLY as they are printed on your Travian web site. Names are case-sensitive.
 * - aLangStrings[7] (= "level" in English) must read exactly what it is on your website next to building names of higher level.
 * - aLangStrings[11] (= "Current production:" in English)  must read exactly what it is on your website on the resource site pages.
 * >>> Please submit all translations to rlaffers@gmail.com <<<
 * -------------------------------------------------------------------------
 */

switch(sLang) {
    case "gr": //original by askgdb (fixed by tsekouri_gr)
        aLangBuildings = ["", "Ξυλοκόπος", "Ορυχείο πηλού", "Ορυχείο σιδήρου", "Αγρόκτημα σιταριού", "Πριονιστήριο", "Φούρνος πηλού", "Χυτήριο σιδήρου", "Μύλος σιταριού", "Φούρνος", "Αποθήκη πρώτων υλών", "Σιταποθήκη", "Οπλοποιείο", "Πανοπλοποιείο", "Χώρος αθλημάτων", "Κεντρικό κτήριο", "Πλατεία συγκεντρώσεως", "Αγορά", "Πρεσβεία", "Στρατόπεδο", "Στάβλος", "Εργαστήριο", "Ακαδημία", "Κρυψώνα", "Δημαρχείο", "Μἐγαρο", "Παλάτι", "Θησαυροφυλάκιο", "Εμπορικό γραφείο", "Μεγάλο στρατόπεδο", "Μεγάλος στάβλος", "Τείχος", "Χωματένιο τείχος", "Τείχος με πάσαλους", "Λιθοδόμος", "Ζυθοποιίο", "Άτομο που στήνει παγίδες", "Περιοχή ηρώων", "Μεγάλη αποθήκη", "Μεγάλη σιταποθήκη", "Παγκόσμιο θαύμα"];
        aLangTasks = ["Κατασκευή", "Αναβάθμιση", "Επίθεση", "Έρευνα", "Εκπαίδευση","Αποστολή Πρώτων Υλών"];
        aLangStrings = ["Κατασκευή Αργότερα", "Αναβάθμιση Αργότερα", "Επίθεση Αργότερα", "Έρευνα Αργότερα", "Πραγραμματισμός Εργασίας Για Αργότερα.", "Ξεκίνησε Κατασκευή", " Επιχειρηθείς Με Άγνωστο Αποτέλεσμα.", "Επίπεδο", " Δεν Μπορεί Να Κατασκευαστεί.", " Δεν Μπορεί Να Αναβαθμιστεί.", "Η Εργασία Πραγραμματίστηκε .", "Παραγωγή:", "Δεν Μπορεί Να Πραγραμματισθεί Αυτή Η Εργασία Τώρα.", "Ο Πραγραμματισμός Εργασίας Δεν Είναι Διαθέσιμος!", "Πραγραμματισμένες Εργασίες", "Διαγραφή", "Αποστολή Αργότερα", "Η Επίθεση Δεν Μπορεί Να Προγραμματισθεί Επειδή Δεν Επιλέχθηκαν Στρατιώτες.", "Οι Στρατιώτες Στάλθηκαν", "Οι Στρατιώτες Δεν Μπόρεσαν Να Σταλούν", "Ενίσχυσεις", "Επίθεση", "Εισβολή Αρπαγής", "Οι Καταπέλτες Θα Στοχέυσουν Σε", "Τυχαία", "Σε", "ή Μετά", "Δευτερόλεπτα", "Λεπτά", "Ώρες", "Μέρες", "Ανίχνευση Πρώτων Υλών Και Στρατευμάτων", "Ανίχνευση Οχύρωσης Και Στρατευμάτων", "Μακριά", "Η Επίθεση Δεν Μπορεί Να Προγραμματισθεί Επειδή Δεν Ορίστικαν Συντεταγμένες ή Όνομα Χωριού.", "Σε Θέση.", "Ταξινόμηση Κατά:", "Τύπο ", "Χρόνο ", "Στόχο ", "Επιλογές ", "Χωριό ","Ιστορικό Εργασιών", "Καθαρισμός Ιστορικού", "Ξεκίνησε η έρευνα ", " δεν μπορεί να ερευνηθεί.", "Βελτίωσε αργότερα", "Ανίχνευσε", "Εκπαίδευσε αργότερα", "μονάδες.", "Εκπαίδευσε", "Ξεκίνησε η εκπαίδευση ", " δεν μπορούν να εκπαιδευτούν.", "ή επανέλαβε", "φορές ", "διαφέροντας κατά ", "Καθαρισμός λίστας εργασιών ", "Έχουν αποσταλεί", "Πρόσθεσε αυτήν την εργασία στη λίστα"];
        aLangTroops[0] = ["Λεγεωνάριος", "Πραιτωριανός", "Ιμπεριανός", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Πολιορκητικός Κριός", "Καταπέλτης Φωτιάς", "Γερουσιαστής", "Άποικος", "Ήρωας"]; //Ρωμαίοι
        aLangTroops[1] = ["Μαχητής Με Ρόπαλο", "Μαχητής Με Ακόντιο", "Μαχητής Με Τσεκούρι", "Ανιχνευτής", "Παλατινός", "Τεύτονας Ιππότης", "Πολιορκητικός Κριός", "Καταπέλτης", "Φύλαρχος", "Άποικος", "Ήρωας"]; //Τεύτονες
        aLangTroops[2] = ["Φάλανξ", "Μαχητής Με Ξίφος", "Ανιχνευτής", "Αστραπή Του Τουτατή", "Δρουίδης", "Ιδουανός", "Πολιορκητικός Κριός", "Πολεμικός Καταπέλτης", "Αρχηγός", "Άποικος", "Ήρωας"]; //Γαλάτες
    break;

    case "ua": //by ALFik
        aLangBuildings = ["", "Лісоповал", "Глиняний кар'єр", "Залізна копальня", "Ферма", "Деревообробний завод", "Цегельний завод", "Чавуноливарний завод", "Млин", "Пекарня", "Склад", "Зернова комора", "Кузня зброї", "Кузня обладунків", "Арена", "Головна будівля", "Пункт збору", "Ринок", "Посольство", "Казарма", "Стайня", "Майстерня", "Академія", "Схованка", "Ратуша", "Резиденція", "Палац", "Скарбниця", "Торгівельна палата", "Велика казарма", "Велика стайня", "Міська стіна", "Земляний вал", "Палісад", "Каменетес", "Пивоварня", "Капканник", "Таверна", "Великий склад", "Велика зернова комора", "Диво світу"];
        aLangTasks = ["Побудувати", "Розвинути", "Атакувати", "Дослідити", "Тренувати","Послати ресурси"];
        aLangStrings = ["Побудувати пізніше", "Розвинути пізніше", "Атакувати пізніше", "Дослідити пізніше", "Запланувати завдання.", "Ми почали будівництво ", " ми спробували, але результат не визначено.", "рівень", " не може бути побудовано.", " не може бути розвинуто.", "Завдання заплановано.", "Поточне виробництво:", "Мы не можемо планувати цього зараз.", "Запланованого завдання не існує!", "Заплановані завдання", "Видалити", "Відправити пізніше", "Війська не вибрані.", "Ваші війська були відправлені в", "Ваші війська не можуть бути відправлені в", "Підтримка", "Атака", "Набіг", "Какапульти націлені на", "Випадково", "в", "або після закінчення", "секунд", "хвилин", "годин", "днів", "Розвідка ресурсів і військ", "Розвідка військ і оборонних споруд", "Відсутня", "Атака не може бути запланована, оскільки не вказана мета.", "на сайті №.", "Сортувати по:", "тип ", "година ", "мета ", "опції ", "Поселення ", "История завдань","Очистити історію","Мы почали дослідження" , " не может бути досліджено.", "Дослідити пізніше", "Шпигун", "Тренувати пізніше", "війска.", "Тренувати", "Мы почали тренування ", "Не може бути треновано", "або повтор ","раз ","разділенні по ", "Очистити чергу", "Було видалено"];
        aLangTroops[0] = ["Легіонер", "Преторіанець", "Імперіанець", "Кінний розвідник", "Кіннота імператора", "Кіннота Цезаря", "Таран", "Вогняна катапульта", "Сенатор", "Поселенець", "Герой"]; //Romans
        aLangTroops[1] = ["Дубинник", "Списник", "Сокирщик", "Скаут", "Паладин", "Тевтонський вершник", "Стінобитне знаряддя", "Катапульта", "Ватажок", "Поселенець", "Герой"]; //Teutons
        aLangTroops[2] = ["Фаланга", "Мечник", "Слідопит", "Тевтацький грім", "Друїд-вершник", "Едуйська кіннота", "Таран", "Катапульта", "Лідер", "Поселенець", "Герой"]; //Gauls
    break;

    case "tw":  //Shao-Pin
        aLangBuildings = ["", "???", "??", "???", "??", "???", "??", "?????", "???", "???", "??", "??", "??", "???", "???", "????", "???", "??", "???", "??", "??", "??", "???", "??", "???", "??", "??", "???", "???", "???", "???", "??", "??", "??", "???", "???", "??", "???", "???", "???", "????"];
        aLangTasks = ["??", "??", "??", "??", "??", "??", "??"];
        aLangStrings = ["????", "????", "????", "????","??????????.", "????? ", " ????????.","??", " ????.", " ????.", "??????????.","????:", "????????????.", "????????!", "??????????","??", "????", "??????.","???????", "????????", "??", "??", "??", "??????","??","???", " ?  ??","?", "?", "?", "?","???????", "?????????","??","????????,?????????.", "?????.","???:", "?? ", "?? ", "?? ", "??", "?? ","????????", "????????","????? ", " ????.","????", "??", "????", "??", "??", "????? ", " ????.","??? ","?,","??","?????? ","???","Queue this task"];
        aLangTroops[0] = ["?????", "???", "???", "????", "????", "????", "???", "?????", "???", "???", "??"];    //Romans
        aLangTroops[1] = ["???", "??", "???", "???", "??", "????", "???", "???", "???", "???", "??"];            //Teutons"
        aLangTroops[2] = ["???", "??", "???", "???", "?????", "????", "???", "???", "??", "???", "??", "??"];    //Gauls
    break;


	case "sk":
		aLangBuildings = ["", "Drevorubac", "Hlinená bana", "Železná bana", "Obilné pole", "Píla", "Tehelna", "Zlievaren", "Mlyn", "Pekáren", "Sklad surovín", "Sýpka", "Kovácska dielna", "Zbrojnica", "Aréna", "Hlavná budova", "Bod stretnutia", "Trh", "Ambasáda", "Kasárne", "Stajne", "Dielna", "Akadémia", "Úkryt", "Radnica", "Rezidencia", "Palác", "Pokladna", "Obchodný kancelár", "Velké kasárne", "Velké stajne", "Mestské hradby", "Zemná hrádza", "Palisáda", "Kamenár", "Pivovar", "Pasce", "Hrdinský dvor", "Velký sklad", "Velká sýpka", "Div sveta"];
		aLangTasks = ["Postavit", "Rozšírit", "Zaútocit na", "Vynájst", "Trénovat","Send Resource"];
		aLangStrings = ["Postavit neskôr", "Rozšírit neskôr", "Zaútocit neskôr", "Vynájst neskôr", "Naplánujte túto akciu na neskôr.", "Zacali sme stavat ", " - úspech neznámy.", "stupen", " sa nedá postavit.", " sa nedá rozšírit.", "Úloha je naplánovaná.", "Aktuálna produkcia:", "Túto úlohu momentálne nie je možné naplánovat.", "Momentálne nie je možné plánovat úlohy!", "Naplánované úlohy", "Zmazat", "Vyslat neskôr", "Neboli vybraté žiadne jednotky.", "Jednotky mašírujú do", "Nepodarilo sa vyslat jednotky do", "Podporit", "Zaútocit na", "Olúpit", "Katapulty zacielit na", "náhodne", "o", "alebo za", "sekúnd", "minút", "hodín", "dní", "Preskúmat jednotky a suroviny", "Preskúmat jednotky a obranné objekty", "prec", "Útok nemožno naplánovat, pretože nie je známy ciel.", "na mieste c.", "Zoradit podla:", "typu ", "casu ", "ciela ", "iné ", "dediny ", "História akcií", "zmazat históriu", "Zacali sme vyvíjat ", " sa nedá vynájst.", "Vylepšit neskôr", "Vyšpehovat", "Trénovat neskôr", "jednotky.", "Vytrénovat", "Zacali sme trénovat ", " sa nedá vytrénovat." ];
		aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímske baranidlo", "Ohnivý katapult", "Senátor", "Osadník", "Hrdina","Queue this task"];  //Romans
		aLangTroops[1] = ["Pálkar", "Oštepár", "Bojovník so sekerou", "Špeh", "Rytier", "Teuton jazdec", "Germánske baranidlo", "Katapult", "Kmenový vodca", "Osadník", "Hrdina"];  //Teutons
		aLangTroops[2] = ["Falanx", "Šermiar", "Sliedic", "Theutates Blesk", "Druid jazdec", "Haeduan", "Drevené baranidlo", "Trebušé", "Nácelník", "Osadník", "Hrdina"];  //Gauls
		break;

	case "ba":  //by bhcrow
		aLangBuildings = ["", "Drvosjeca", "Rudnik gline", "Rudnik željeza", "Poljoprivredno imanje", "Pilana", "Ciglana", "Ljevaonica željeza", "Mlin", "Pekara", "Skladište", "Silos", "Kovacnica oružja", "Kovacnica oklopa", "Mejdan", "Glavna zgrada", "Mjesto okupljanja", "Pijaca", "Ambasada", "Kasarna", "Štala", "Radionica", "Akademija", "Sklonište", "Opština", "Rezidencija", "Dvorac", "Treasury", "Trgovacki centar", "Velika kasarna", "Velika štala", "Gradski bedem", "Zid od zemlje", "Taraba", "Klesar", "Brewery", "Postavljac zamki", "Herojska vila", "Veliko skladište", "Veliki silos", "Svjetsko cudo"]; 
		aLangTasks = ["Izgradi", "Unaprijedi", "Napad", "Istraži", "Obuci","Send Resource"];
		aLangStrings = ["Gradi poslije", "Unaprijedi poslije", "Napadni poslije", "Istraži poslije", "Isplaniraj ovaj zadatak za poslije.", "Pocela je gradnja ", " pokušano je s nepoznatim rezultatom.", "stepen", " ne može biti izgradeno.", " ne može se unaprijediti.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne može se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriši", "Pošalji poslije", "Trupe nisu odabrane.", "Vaša vojska je poslana na", "Vaša vojska ne može biti poslana na", "Podrška", "Napad", "Pljacka", "Katapulti ce rušiti", "slucajno", "u", "ili nakon", "sekundi", "minuta", "sahati", "dana", "Špijuniraj resourse i trupe", "Špijuniraj trupe i odbranu", "away", "Napad ne može biti isplaniran jer destinacija nije odredena.", "na stranici br.", "Sort by:", "type ", "time ", "target ", "options ", "village ","Queue this task"];
		aLangTroops[0] = ["Legionar", "Preatorijanac", "Imperijanac", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ratni ovan", "Vatreni katapult", "Senator", "Naseljenik", "Hero"];  //Romans
		aLangTroops[1] = ["Batinar", "Kopljanik", "Borac sa sikirom", "Izvidac", "Paladin", "Teutonski vitez", "Ovan", "Katapult", "Poglavica", "Naseljenik", "Hero"];  //Teutons
		aLangTroops[2] = ["Palanks", "Macevalac", "Izvidac", "Theutateov Grom", "druidni jahac", "Haeduan", "Ovan", "Katapult", "Starješina", "Naseljenik", "Hero"];  //Gauls
		break;	
		
	case "bg": //by NUT
        aLangBuildings = ["", "Сечище", "Глинена кариера", "Рудник", "Житно поле", "Дъскорезница", "Тухларна", "Леярна", "Мелница", "Пекарна", "Склад", "Хамбар", "Ковачница за брони", "Ковачница за оръжия", "Арена", "Главна сграда", "Сборен пункт", "Пазар", "Посолство", "Казарма", "Конюшня", "Работилница", "Академия", "Скривалище", "Кмество", "Резиденция", "Дворец", "Съкровищница", "Търговска Палата", "Голяма казарма", "Голяма конюшня", "Градска стена", "Земен насип", "Палисада", "Зидарска гилдия", "Пивоварна", "Трапер", "Таверна", "Голям склад", "Голям хамбар", "Чудо"];
        aLangTasks = ["Построяване на", "Надстройка на", "Атака към", "Откриване на", "Трениране на", "Транспорт до"];
        aLangStrings = ["Постройте по-късно", "Надстройте по-късно", "Атакувайте по-късно", "Открийте по-късно", "Запишете тази задача за по-късно.", "Започна строеж ", " Започна с неясен резултат.", "ниво", " не може да бъде построено.", " не може да бъде надстроено.", "Задачата е планирана.", "Текуща продукция:", "Не е възможно тази задача да бъде планирана сега.", "Планираната задача не е достъпна!", "Планирани задачи", "Изтриване", "Изпрати по-късно", "Атаката не може да бъде планирана, защото не са избрани войници.", "Вашите войници са изпратени към", "Вашите войници не могат да бъдат изпратени към", "Подкрепление към", "Атака към", "Набег към", "Катапултите се целят в", "случайно", "в", "или след", "секунди", "минути", "часа", "дена", "Шпиониране за ресурси и войска", "Шпиониране за войска и защита", "липсва", "Атаката не може да бъде планирана тъй като не е избрана цел.", "на поле номер:", "Сортиране по:", "тип ", "време ", "цел ", "опции ", "град ", "История на задачите", "изчистване на историята","Започна проучване", "Неможе да започне проучване.","Подобри по-късно", "Шпионаж", "Тренирай по-късно", "войски.", "Тренирай", "Започна трениране", "неможе да започне трениране.","или повтаряй","пъти ","през интервал ","Изчистване на история на задачите ","Беше изпратено"];
        aLangTroops[0] = ["Легионер", "Преторианец", "Империан", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Стенобойно Оръдие", "Огнен катапулт", "Сенатор", "Заселник", "Герой"]; //Romans
        aLangTroops[1] = ["Боец с боздуган", "Копиеносец", "Боец с брадва", "Съгледвач", "Паладин", "Тевтонски рицар", "Таран", "Катапулт", "Предводител", "Заселник", "Герой"]; //Teutons
        aLangTroops[2] = ["Фаланга", "Мечоносец", "Следотърсач", "Theutates Thunder", "Друид конник", "Хедуан", "Таран", "Требучет", "Вожд", "Заселник", "Герой"]; //Gauls
	break;
	case "cn": //ver:1.0
        aLangBuildings = ["", "伐木场", "粘土矿", "铁矿场", "农场", "木材厂", "砖块厂", "铸造厂", "磨坊", "面包房", "仓库", "粮仓", "铁匠铺", "军械库", "竞技场", "村中心大楼", "集结点", "市场", "大使馆", "兵营", "马厩", "兵工厂", "研发所", "山洞", "市政厅", "行宫", "皇宫", "国库", "交易所", "大兵营", "大马厩", "城墙", "土墙", "栅栏", "石匠铺", "酿造厂", "陷阱机", "英雄园", "大仓库", "大粮仓", "世界奇迹"];
        aLangTasks = ["建造", "升级", "攻击", "研究", "训练","运送资源"];
        aLangStrings = ["预定建造", "预定升级", "预定攻击", "预定研究", "将这个任务预定稍后执行.", "开始建造 ", " 开始建造但结果不明.", "等级", " 不能建造.", " 不能升级.", "任务延迟.", "当前建造:", "现在不能预定这个任务.", "计划不允许!", "已经预定的计划", "删除", "稍后发送", "没有选择军队.", "你的军队以出发", "你的军队没有出发.", "增援", "攻击", "抢夺", "投石车将瞄准", "随机", "计划于", "或 等待", "秒", "分", "时", "日", "侦察敌方现有资源和军队", "侦察敌方防守部署和军队", "不在", "攻击不能计划，因为没有指定目的地.", "在位置编号.", "分类按照:", "类型 ", "时间 ", "目标 ", "选项 ", "村庄 ", "任务历史记录", "清楚历史记录", "开始研发 ", " 不能研发.","稍后升级", "侦察", "稍后训练", "军队.", "训练", "开始训练 ", " 不能训练.","且重复 ","次 ","间隔 ","清空任务 ","已经派遣","任务排队"];
        aLangTroops[0] = ["古罗马步兵", "禁卫兵", "帝国兵", "使节骑士", "帝国骑士", "将军骑士", "冲撞车", "火焰投石器", "参议员", "拓荒者", "英雄"]; //Romans
        aLangTroops[1] = ["棍棒兵", "矛兵", "斧头兵", "侦察兵", "圣骑士", "日尔曼骑兵", "冲撞车", "投石器", "执政官", "拓荒者", "英雄"]; //Teutons
        aLangTroops[2] = ["方阵兵", "剑士", "探路者", "雷法师", "德鲁伊骑兵", "海顿圣骑士", "冲撞车", "投石器", "首领", "拓荒者", "英雄"]; //Gauls
    break;
		
	case "cz":
		aLangBuildings = ["", "Drevorubec", "Hlinený dul", "Železný dul", "Obilné pole", "Pila", "Cihelna", "Slévárna", "Mlýn", "Pekárna", "Sklad surovin", "Sýpka", "Kovárna", "Zbrojnice", "Turnajové hrište", "Hlavní budova", "Shromaždište", "Tržište", "Ambasáda", "Kasárny", "Stáje", "Dílna", "Akademie", "Úkryt", "Radnice", "Rezidence", "Palác", "Pokladnice", "Obchodní kancelár", "Velké kasárny", "Velká stáj", "Mestská zed", "Zemní hráz", "Palisáda", "Kameník", "Pivovar", "Pasti", "Hrdinský dvur", "Velký sklad", "Velká sýpka", "Div sveta"];
		aLangTasks = ["Postavit", "Rozšírit", "Zaútocit na", "Vyzkoumat", "Trénovat","Send Resource"];
		aLangStrings = ["Postavit pozdeji", "Rozšírit pozdeji", "Zaútocit pozdeji", "Vyzkoumat pozdeji", "Naplánujte tuto akci na pozdeji.", "Zacali jsme stavet ", " - výsledek je neznámý.", "úroven", " se nedá postavit.", " se nedá rozšírit.", "Úloha byla naplánována.", "Aktuální produkce:", "Tuto akci momentálne není možné naplánovat.", "Momentálne není možné plánovat žádné akce!", "Naplánované akce", "Smazat", "Vyslat pozdeji", "Útok není možné naplánovat, protože nebyly vybrány žádné jednotky.", "Jednotky jsou na ceste do", "Nepodarilo se vyslat jednotky do", "Podporit", "Zaútocit na", "Oloupit", "Katapulty zamírit na", "náhodne", "o", "anebo za", "sekund", "minut", "hodin", "dní", "Prozkoumat jednotky a suroviny", "Prozkoumat jednotky a obranné objekty", "pryc", "Útok není možné naplánovat, protože chybí cíl.", "na míste c.", "Trídit podle:", "druhu ", "casu ", "cíle ", "možnosti ", "vesnice ", "Historie", "smazat historii" ,"Queue this task"];
		aLangTroops[0] = ["Legionár", "Pretorián", "Imperián", "Equites Legáti", "Equites Imperatoris", "Equites Caesaris", "Rímanské beranidlo", "Ohnivý katapult", "Senátor", "Osadník"]; //Romans
		aLangTroops[1] = ["Pálkar", "Oštepar", "Sekerník", "Zved", "Rytír", "Teuton jezdec", "Germánské beranidlo", "Katapult", "Kmenový vudce", "Osadník"]; //Teutons
		aLangTroops[2] = ["Falanx", "Šermír", "Slídic", "Theutates Blesk", "Druid jezdec", "Haeduan", "Drevené beranidlo", "Válecný katapult", "Nácelník", "Osadník"]; //Gauls
		break; 	
		
	case "dk":  //by Ronster Madsen
		aLangBuildings = ["", "Skovhugger", "Lergrav", "Jernmine", "Kornavler", "Savvark", "Lerbranderi", "Jernstoberi", "Kornmolle", "Bageri", "Rastoflager", "Kornlager", "Rustningssmedje", "Vabensmedje", "Turneringsplads", "Hovedbygning", "Forsamlingsplads", "Markedsplads", "Ambassade", "Kaserne", "Stald", "Varksted", "Akademi", "Gemmested", "Radhus", "Residens", "Palads", "Skatkammer", "Handelskontor", "Stor Kaserne", "Stor Stald", "Bymur", "Jordvold", "Palisade", "Stenhugger", "Bryggeri", "Faldebygger", "Heltebygning", "Stort Rastoflager", "Stort Kornkammer", "Verdensunder"];
		aLangTasks = ["Byg", "Viderebyg", "Angrib", "Udforsk", "Uddan","Send Resource"];
		aLangStrings = ["Byg senere", "Viderebyg senere", "Angrib senere", "Udforsk senere", "Planlag denne opgave til  senere.", "Vi har startet byggeriet", " Blev forsogt med ukendt resultat.", "Trin", " kan ikke bygges.", " kan ikke viderebygges.", "Opgaven blev planlagt til senere.", "Nuvarende produktion:", "Vi kan ikke planlagge denne opgave lige nu.", "Opgaveplanlagning er ikke tilgangelig!", "Planlagte opgaver", "Slet", "Send senere", "Der ikke er tropper tilgangelig.",	"Dine tropper blev sendt til", "Dine tropper kunne ikke sendes til", "Opbakning", "Angrib", "Plyndringstogt", "Katapulterne skyder mod", "tilfaldigt", "mod", "eller mod", "sekunder", "minutter", "timer", "dage", "Efterforsk rastoffer og tropper", "Efterforsk forsvarsanlag og tropper", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ","or repeat ","times "," espaced by ","Queue this task"];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "net":  //Spanish - by Carlos R.
		aLangBuildings = ["", "Carpintería", "Cantera de arcilla", "Mina de Hierro", "Granja", "Aserradero", "Ladrillar", "Acería", "Molino", "Panadería", "Almacén", "Granero", "Herrería", "Armería", "Plaza de torneos", "Edificio Principal", "Plaza de Reuniones", "Mercado", "Embajada", "Cuartel", "Establo", "Taller", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Palacio", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplén", "Empalizada", "Cantero", "Cervecería", "Trampero", "Mansión del Héroe", "Almacén Grande", "Granero Grande", "Maravilla"];
		aLangTasks = ["Construir", "Mejorar", "Atacar", "Investigar", "Entrenar","Send Resource"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde",	"Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "?La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "No se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ",  "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained.","or repeat ","times ","espaced by ","Flush Task List ","Queue this task"];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ariete Romano", "Catapulta de Fuego", "Senador", "Colono", "Héroe"];  //Romanos
		aLangTroops[1] = ["Luchador de Porra", "Lancero", "Luchador de Hacha", "Explorador", "Paladín", "Caballero Teutón", "Ariete", "Catapulta", "Jefe", "Colono", "Héroe"];  //Germanos
		aLangTroops[2] = ["Falange", "Luchador de Espada", "Rastreador", "Trueno Theutates", "Jinete Druida", "Haeduano", "Ariete", "Fundíbulo", "Cacique", "Colono", "Héroe"];  //Galos
		break;
		
	case "fi":  //by Zypper
		aLangBuildings = ["", "Puunhakkaaja", "Savimonttu", "Rautakaivos", "Viljapelto", "Sahaamo", "Kivenhakkaaja", "Rautavalimo", "Viljamylly", "Leipomo", "Varasto", "Viljasiilo", "Aseseppä", "Haarniskapaja", "Turnausareena", "Päärakennus", "Kokoontumispiste", "Marketti", "Lähetystö", "Kasarmi", "Hevostalli", "Työpaja", "Akatemia", "Kätkö", "Kaupungin talo", "Virka-asunto", "Palatsi", "Aarrekammio", "Kauppamaja", "Suuri Kasarmi", "Suuri Hevostalli", "Kaupungin muuri", "Maamuuri", "Paaluaita", "Kivenhakkaaja", "Olut panimo", "Ansoittaja", "Sankarin kartano", "Suuri varasto", "Suuri viljasiilo", "Maailmanihme"];
		aLangTasks = ["Rakenna", "Päivitä", "Hyökkää", "Tiedustele", "Kouluta","Send Resource"];
		aLangStrings = ["Rakenna myöhemmin", "Päivitä myöhemmin", "Hyökkää myöhemmin", "Tiedustele myöhemmin", "Lisää rakennusjonoon", "Rakenna ", " ei tuloksia.", "taso", " ei voida rakentaa.", " ei voida päivittää.", "Tehtävä lisätty rakennusjonoon.", "Nykyinen tuotanto:", "Ei voida lisätä rakennusjonoon juuri nyt.", "Lisäys ei ole saatavilla!", "Tehtävät rakennusjonossa", "Poista", "Lähetä myöhemmin", "Hyökkäystä ei voitu lisätä jonoon, koska yhtään joukkoja ei ole valittu.", "Joukkosi on lähetetty ", "Joukkojasi ei voida lähettää ", "Ylläpito", "Hyökkäys: Normaali", "Hyökkäys: Ryöstö", "Katapulttien kohde", "satunnainen", "nyt", "tai myöhemmin", "sekuntit", "minuutit", "tunnit", "päivät", "Tiedustele resursseja ja joukkoja", "Tiedustele joukkoja ja puollustuksia","poissa", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ","or repeat ","times ","espaced by ","Queue this task"];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
		
	case "hk":  //by Angus
		aLangBuildings = ["", "伐木場", "泥坑", "鐵礦場", "農場", "鋸木廠", "磚廠", "鋼鐵鑄造廠", "麵粉廠", "麵包店" , "倉庫", "穀倉", "鐵匠", "盔甲廠", "競技場", "村莊大樓", "集結點", "市場", "大使館", "兵營", "馬棚", "工場", "研究院", "山洞", "城鎮廳", "行宮", "皇宮", "寶物庫", "交易所", "大兵營", "大馬棚", "城牆", "土牆", "柵欄", "石匠鋪", "釀造廠", "陷阱機", "英雄宅", "大倉庫", "大穀倉", "世界奇蹟"];
        aLangTasks = ["建造", "升級", "攻擊", "研發", "訓練", "運送資源"];
        aLangStrings = ["預定建造", "預定升級", "預定攻擊", "預定研究", "將這個任務預定稍後執行.", "開始建造", "開始建造但結果不明.", "等級", "不能建造.", "不能升級.", "任務延遲.", "當前建造:", "現在不能預定這個任務.", "計劃不允許!", "已經預定的計劃", "刪除", "稍後發送", "沒有選擇軍隊.", "你的軍隊以出發", "你的軍隊沒有出發.", "增援", "攻擊", "搶奪", "投石車將瞄準", "隨機", "計劃於", "或等待", "秒", "分", "時", "日", "偵察敵方現有資源和軍隊", "偵察敵方防守部署和軍隊", "不在", "攻擊不能計劃，因為沒有指定目的地.", "在位置編號.", "分類按照:", "類型", "時間", "目標", "選項", "村莊", "任務歷史記錄", "清楚歷史記錄", "開始研發", "不能研發.","稍後升級", "偵察", "稍後訓練", "軍隊.", "訓練", "開始訓練", "不能訓練.","且重複","次","間隔","清空任務","已經派遣","任務排隊"];
        aLangTroops[0] = ["古羅馬步兵", "禁衛兵", "帝國兵", "使者騎士", "帝國騎士", "將軍騎士", "衝撞車", "火焰投石機" , "參議員", "開拓者", "英雄"]; //Romans
        aLangTroops[1] = ["棍棒兵", "矛兵", "斧頭兵", "偵察兵", "俠客", "條頓騎士", "衝撞車", "投石機", "司令官", "開拓者", "英雄"]; //Teutons
        aLangTroops[2] = ["方陣兵", "劍士", "探路者", "雷法師", "德魯伊騎兵", "海頓聖騎", "衝撞車", "投石機", "族長", "開拓者", "英雄"]; //Gauls
    break; // :-D
		
	case "hr":  //by Damir B.
		aLangBuildings = ["", "Drvosjeca", "Glinokop", "Rudnik željeza", "Farma", "Pilana", "Ciglana", "Ljevaonica željeza", "Žitni mlin", "Pekara", "Skladište", "Žitnica", "Kovacnica", "Oružarnica", "Arena", "Glavna zgrada", "Okupljalište", "Tržnica", "Veleposlanstvo", "Vojarna", "Konjušnica", "Radionica", "Akademija", "Skrovište resursa", "Gradska vijecnica", "Rezidencija", "Dvorac", "Treasury", "Ured za trgovinu", "Velika vojarna", "Velika konjušnica", "Zidine grada", "Zemljani zid", "Drveni zid", "Klesar", "Brewery", "Zamka", "Dvorac Heroja", "Veliko skladište", "Velika žitnica", "Svjetsko cudo"];
		aLangTasks = ["Izgradi", "Nadogradi", "Napad", "Istraži", "Treniraj","Send Resource"];
		aLangStrings = ["Gradi poslije", "Nadogradi poslije", "Napadni poslije", "Istraži poslije", "Isplaniraj ovaj zadatak za poslije.", "Pocela je gradnja ", " pokušano je s nepoznatim rezultatom.", "razina", " ne može biti izgradeno.", " ne može se nadograditi.", "Isplaniran je zadatak.", "Aktualna produkcija:", "Ne može se isplanirati ovaj zadatak sada.", "Planirani zadatak nije dostupan!", "Planirani zadaci", "izbriši", "Pošalji poslije", "Trupe nisu odabrane.", "Vaša vojska je poslana na", "Vaša vojska ne može biti poslana na", "Podrška", "Napad", "Pljacka", "Katapulti ce rušiti", "slucajno", "u", "ili nakon", "sekundi", "minuta", "sati", "dana", "Špijuniraj resourse i trupe", "Špijuniraj trupe i odbranu", "odsutan", "Napad ne može biti isplaniran jer destinacija nije odredena.", "na stranici br.", "Sortiraj po:", "tip ", "vrijeme ", "meta ", "opcije ", "selo ","Queue this task"];
		aLangTroops[0] = ["Legionar", "Preatorijan", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Ovan za probijanje", "Vatreni katapult", "Senator", "Naseljenik", "Heroj"]; //Romans
		aLangTroops[1] = ["Gorštak", "Kopljanik", "Borac sa sjekirom", "Izvidnik", "Paladin", "Teutonski vitez", "Ovan za probijanje", "Katapult", "Poglavica", "Naseljenik", "Heroj"]; //Teutons
		aLangTroops[2] = ["Falanga", "Macevalac", "Tragac", "Theutatesov grom", "Druid jahac", "Haeduan", "Ovan za probijanje", "Trebuše", "Starješina", "Naseljenik", "Heroj"]; //Gauls 
		break;
		
	case "hu": //by [TAJM]Kobra,
		aLangBuildings = ["", "Favágó", "Agyagbánya", "Vasércbánya", "Búzafarm", "Fafeldolgozó", "Agyagégeto", "Vasöntöde", "Malom", "Pékség", "Raktár", "Magtár", "Fegyverkovács", "Páncélkovács", "Gyakorlótér", "Foépület", "Gyülekezotér", "Piac", "Követség", "Kaszárnya", "Istálló", "Muhely", "Akadémia", "Rejtekhely", "Tanácsháza", "Rezidencia", "Palota", "Kincstár", "Kereskedelmi központ", "Nagy Kaszárnya", "Nagy Istálló", "Kofal", "Földfal", "Cölöpfal", "Kofaragó", " Sörfozde", "Csapdakészíto", "Hosök háza", "Nagy Raktár", "Nagy Magtár", "Világcsoda"];
		aLangTasks = ["Építés", "Szintemelés", "Támadás", "Fejlesztés", "Kiképzés","Send Resource"];
		aLangStrings = ["Építés késobb", "Szintemelés késobb", "Támadás késobb", " Fejlesztés késobb", "A muvelet idozítve késobbre.", "Az építés elkezdodött ", " Megpróbáltam ismeretlen eredménnyel.", "szint", "nem épülhet meg.", " nem lehet szintetemelni.", "Idozítésre került feladat:", " Jelenlegi termelés:", "Jelenleg nem idozítheto", "A feladat idozítés nem elérheto!", "Idozített feladatok:", "Törlés", "Küldés késobb", "A támadás nem idozítheto! Nem lettek egységek kiválasztva.", "Az egységeid elküldve", "Az egységek elküldése nem sikerült, ide:", "Támogatás", "Normál támadás", "Rablótámadás", "A katapult(ok) célpontja", "véletlenszeru", "Ekkor:", "vagy késleltetve", "másodperccel", "perccel", "órával", "nappal", "Nyersanyagok és egységek kikémlelése", "Egységek és épületek kikémlelése", "távol", "A támadás nem idozítheto! Nem lett végcél kiválasztva.", "a következo azonisítóval rendelkezo helyen:", "Rendezés:", "típus ", "ido ", "célpont ", "beállítások ", "falu ", "History", "elozmények törlése","Queue this task"];
		aLangTroops[0] = ["Légiós", "Testor", "Birodalmi", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Faltöro kos", "Tuzkatapult", "Szenátor", "Telepes"];  //Római
		aLangTroops[1] = ["Buzogányos", "Lándzsás", "Csatabárdos", "Felderíto", "Paladin", "Teuton lovag", "Faltöro kos", "Katapult", "Törzsi vezeto", "Telepes"];  //Germán
		aLangTroops[2] = ["Phalanx", "Kardos", "Felderíto", "Theutat villám", "Druida lovas", "Haeduan", "Falromboló", "Harci-katapult", "Fonök", "Telepes"];  //Gall		
		break;
  
	case "it":  //by Tazzicus
		aLangBuildings = ["", "Segheria", "Pozzo d'argilla", "Miniera di ferro", "Campo di grano", "Falegnameria", "Fabbrica di mattoni", "Fonderia", "Mulino", "Forno", "Magazzino", "Granaio", "Fabbro", "Armeria", "Arena", "Centro del villaggio", "Caserma", "Mercato", "Ambasciata", "Campo d'addestramento", "Scuderia", "Officina", "Accademia", "Deposito Segreto", "Municipio", "Residence", "Castello", "Stanza del tesoro", "Ufficio commerciale", "Grande caserma", "Grande scuderia", "Mura cittadine", "Murata in terra", "Palizzata", "Genio civile", "Birreria", "Esperto di trappole", "Circolo degli eroi", "Grande Magazzino", "Grande Granaio", "Meraviglia"];
		aLangTasks = ["Costruisci", "Amplia", "Attacca", "Ricerca", "Addestra","Send Resource"];
		aLangStrings = ["Costruisci piu' tardi", "Amplia piu' tardi", "Attacca piu' tardi", "Ricerca piu' tardi", "Programma questa attivita'.", "E' iniziata la costruzione di ", " e' stata tentata con risultato sconosciuto.", "livello", " non puo' essere costruito.", " non puo' essere ampliato.", "L'attivita' e' stata programmata.", "Produzione:", "Non e' possibile programmare questa attivita' adesso.", "Programmazione attivita' non disponibile!", "Attivita' Programmate", "Cancella", "Invia piu' tardi", "L'attacco non puo' essere programmato in quanto non sono state selezionate truppe.", "Truppe sono state inviate a", "Non e' stato possibile inviare le truppe a", "Rinforzo", "Attacco", "Raid", "Obiettivo catapulte:", "a caso", "all'orario", "oppure dopo", "secondi", "minuti", "ore", "giorni", "Spiare truppe e risorse", "Spiare difese e truppe", "assente", "L'attacco non puo' essere programmato in quanto non e' stato specificato l'obbiettivo.", "alla posizione n.", "Ordina per:", "tipo ", "orario ", "obbiettivo ", "opzioni ", "villaggio", "Archivio Attivita'", "svuota archivio","Queue this task"];
		aLangTroops[0] = ["Legionario", "Pretoriano", "Imperiano", "Legionario a cavallo", "Imperiano a cavallo", "Cavalleria romana", "Ariete da sfondamento", "Catapulta", "Senatore", "Decurione", "Eroe"];
		aLangTroops[1] = ["Combattente", "Lanciere", "Combattente con ascia", "Esploratore", "Paladino", "Cavalleria teutonica", "Ariete", "Catapulta", "Comandante", "Decurione", "Eroe"];
		aLangTroops[2] = ["Lanciere", "Combattente con spada", "Esploratore", "Cavalleria gallica", "Cavalleria di difesa", "Cavalleria avanzata", "Ariete", "Catapulta", "Capo tribu'", "Decurione", "Eroe"];		
		break;
	
	case "lt": //by NotStyle & ( GodZero, negadink daugiau skripto)
        aLangBuildings = ["", "Medžių kirtavietė", "Molio karjeras", "Geležies kasykla", "Grūdų ferma", "Lentpjūvė", "Plytinė", "Liejykla", "Malūnas", "Kepykla", "Sandėlis", "Klėtis", "Ginklų kalvė", "Šarvų kalvė", "Arena", "Gyvenamasis pastatas", "Susibūrimo vieta", "Turgavietė", "Ambasada", "Kareivinės", "Arklidė", "Dirbtuvės", "Akademija", "Slėptuvė", "Rotušė", "Rezidencija", "Valdovo rūmai", "Iždinė", "Prekybos rūmai", "Didžiosios kareivinės", "Didžioji arklidė", "Mūrinė siena", "Gynybinis pylimas", "Statinė tvora", "Mūrinė", "Alaus darykla", "Spastinė", "Karžygio namai", "Didysis sandėlys", "Didžioji klėtis", "Pasaulio stebuklas"];
        aLangTasks = ["Statyti", "Patobulinti", "Siųsti karius", "Tyrinėti", "Treniruoti","Siųsti resursus"];
        aLangStrings = ["Statyti vėliau", "Patobulinti vėliau", "Siųsti karius vėliau", "Tyrinėti vėliau", "Užplanuoti užduoti.", "Mes pradėjome statyti ", " Pabandyta, bet rezultatas nežynomas.", "lygis", " neįmanoma pastatyti.", " neįmanoma patobulinti.", "Užduotis užplanuota.", "Einama gamyba:", "Mes negalime užplanuoti dabar šitą užduotį.", "Užduoties užplanavimas negalimas!", "Užplanuotos užduotys", "Ištrinti", "Siųsti vėliau", "Ataka negali būti užplanuota nes kariai nepasirinkti.", "Jūsų kariai nusiųsti į", "Jūsų kariai negali būti nusiųsti į", "Parama", "Ataka", "Reidas", "Katapultos bus nutaikytos į", "atsitiktinis", "į", "arba vėliau", "sekundės", "minutės", "valandos", "dienos", "Resursų bei pajėgu žvalgyba", "Gynybinių fortifikacijų bei pajėgų žvalgyba", "nėra", "Negalima užplanuoti atakos, nes taikinys nerastas.", "puslapyje Nr.", "Rušiuoti pagal:", "[tipą] ", "[laiką] ", "[taikinį] ", "pasirinktys ", "[gyvenvietė] ", "Užduočių Praeitis","Trinti praeitį"];
        aLangTroops[0] = ["Legionierius", "Pretorionas", "Imperionas", "Raitas legatas", "Imperatoriaus raitelis", "Cezario raitelis", "Muradaužys", "Ugnine katapulta", "Senatorius", "Romėnų kolonistas", "Herojus"]; //Romenai
        aLangTroops[1] = ["Pėstininkas su kuoka", "Ietininkas", "Pėstininkas su kirviu", "Žvalgas", "Paladinas", "Germanų raitelis", "Taranas", "Katapulta", "Germanų vadas", "Germanų kolonistas", "Herojus"]; //Germanai
        aLangTroops[2] = ["Falanga", "Pėstininkas su kardu", "Pedsekys", "Raitas perkūnas", "Raitas druidas", "Raitas hedujas", "Taranas", "Trebušetas", "Galų kunigaikštis", "Galų kolonistas", "Herojus"]; //Galai
    break;

	
	case  "mx":  //by Charlie Wolfgang [Mexican Spanish]
		aLangBuildings = ["", "Bosque", "Lodazal", "Mina de Hierro", "Cultivos", "Aserradero", "Ladrillar", "Fundidora", "Molino de Grano", "Panadería", "Almacen", "Granero", "Herrería", "Armería", "Plaza de torneos", "Centro Urbano", "Explanada", "Mercado", "Embajada", "Cuartel", "Establo", "Taller de Maquinaria", "Academia", "Escondite", "Ayuntamiento", "Residencia", "Castillo", "Tesoro", "Oficina de Comercio", "Cuartel Grande", "Establo Grande", "Muralla", "Terraplen", "Empalizada", "Cantero", "Cervecería", "Trampero", "Casa del Héroe", "Almacen Grande", "Granero Grande", "Maravilla" ];
		aLangTasks = [ "Construir", "Mejorar", "Atacar", "Investigar", "Entrenar","Send Resource"];
		aLangStrings = ["Construir más tarde", "Mejorar más tarde", "Atacar más tarde",    "Investigar más tarde", "Programar esta tarea para más tarde", "Hemos empezado a construir el edificio ", " fue intentado con resultado desconocido.", "nivel", " no puede ser construido.", " no puede ser mejorado.", "La tarea ha quedado programada.", "Producción actual:", "No se puede programar esa tarea ahora.", "!La programación de tareas no está disponible!", "Tareas programadas", "Eliminar", "Enviar más tarde", "El ataque no ha sido programado porque no se selecionaron tropas.", "Tus tropas se enviaron a", "Tus tropas NO han podido ser enviadas", "Refuerzo", "Atacar", "Saquear", "Catapultas atacarán...", "aleatorio", "a", "o después", "segundos", "minutos", "horas", "días", "Espiar recursos y tropas ", "Espiar defensas y tropas", "fuera(away)", "El ataque no se ha programado porque no se fijo el objetivo.", "al cuadrante ns", "Sort by:", "type ", "time ", "target ", "options ", "village ","or repeat ","times ","espaced by " ,"Queue this task"];
		aLangTroops[ 0] = ["Legionario", "Pretoriano", "Imperano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Carnero", "Catapulta de Fuego", "Senador", "Conquistador", "Héroe" ];  //Romanos
		aLangTroops[1] = ["Lanzador de porras", "Luchador de lanza", "Luchador de hacha", "Emisarío", "Paladin", "Caballero Teuton", "Ariete", "Catapulta", "Cabecilla", "Conquistador", "Héroe" ];  //Teutones
		aLangTroops[2] = ["Falange", "Luchador de espada", "Batidor", "Rayo de Theutates", "Caballista druida", "Haeduano", "Carnero de madera", "Trebunchet", "Cacique", "Conquistador", "Héroe" ];  //Galos
		break;
		
	case "nl": //by Roshaoar & Kris Fripont, fixed by Bolemeus
	    aLangBuildings = ["", "Houthakker", "Klei-afgraving", "IJzermijn", "Graanakker", "Zaagmolen", "Steenbakkerij", "IJzersmederij", "Korenmolen", "Bakker", "Pakhuis", "Graansilo", "Wapensmid", "Uitrustingssmederij", "Toernooiveld", "Hoofdgebouw", "Verzamelplaats", "Marktplaats", "Ambassade", "Barakken", "Stal", "Werkplaats", "Academie", "Schuilplaats", "Raadhuis", "Residentie", "Paleis", "Schatkamer", "Handelskantoor", "Grote Barakken", "Grote Stal", "Stadsmuur", "Muur van aarde", "Palissade", "Steenbakkerij", "Brouwerij", "Vallenzetter", "Heldenhof", "Groot Pakhuis", "Grote Graansilo", "Wereldwonder"];
	    aLangTasks = ["Gebouw Bouwen", "Verbeter", "Val Aan", "Ontwikkel", "Train", "Stuur handelaren"];
	    aLangStrings = ["Bouw later", "Verbeter later", "Val later aan", "Ontwikkel later", "Plan deze taak voor later.", "Bouw is begonnen ", " geprobeerd maar resultaat onbekend.", "Niveau", " kan niet worden gebouwd.", " kan niet worden verbeterd.", "deze taak was gepland.", "Productie:", "We kunnen deze taak nu niet plannen.", "Deze taak plannen is niet beschikbaar!", "Geplande taken", "Verwijder", "Stuur later", "De aanval kan niet worden gepland omdat er geen troepen zijn geselecteerd.", "Jou troepen zijn gestuurd naar", "Jou troepen konden niet worden gestuurd naar", "Versterk", "Val aan", "Roof", "De katapulten zullen mikken op", "willekeurig", "op", "of na", "seconden", "minuten", "uren", "dagen", "spioneer naar voorraden en troepen", "spioneer naar troepen en verdediging", "weg", "Het aanval kan niet worden gepland omdat geen bestemming gezet was.", "op bouwplaats nummer ", "Sorteer via:", "soort ", "tijd ", "doel ", "keuzen ", "dorp ","Queue this task"];
	    aLangTroops[0] = ["Legionair", "Praetoriaan", "Imperiaan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Vuurkatapult", "Senator", "Kolonist", "Held"]; //Romeinen
	    aLangTroops[1] = ["Knuppelvechter", "Speervechter", "Bijlvechter", "Verkenner", "Paladijn", "Germaanse Ridder", "Ram", "Katapult", "Leider", "Kolonist", "Held"]; //Germanen
	    aLangTroops[2] = ["Phalanx", "Zwaardvechter", "Padvinder", "Toetatis Donder", "Druideruiter", "Haeduaan", "Ram", "Trebuchet", "Onderleider", "Kolonist", "Held"]; //Galliërs
	break;
	
	case "no":  //by Lordlarm @ S3 [*LORDS* 4 EVER]
        aLangBuildings = ["", "Tommer", "Leire", "Jern", "Korn", "Sagbruk", "Murer", "Jern-smelteverk", "Molle", "Bakeri", "Varehus", "Silo", "Rustningssmed", "Vabensmed", "Turneringsplass", "Hovedbygning", "Moteplass", "Markedsplass", "Ambassade", "Kaserne", "Stall", "Varksted", "Akademi", "Hemmelig jordkjeller", "Radhus", "Residens", "Palass", "Skattekammer", "Handelskontor", "Stor Kaserne", "Stor Stall", "Bymur", "Jordmur", "Palisade", "Stenhugger", "Bryggeri", "Fallemaker", "Heltenes villa", "Stort varehus", "Stor silo", "Verdensunderverk"];
        aLangTasks = ["Bygg", "Viderebygg", "Angrip", "Utforsk", "Tren","Send Resource"];
        aLangStrings = ["Bygg senere", "Viderebygg senere", "Angrip senere", "Utforsk senere", "Planlegg denne oppgaven til senere.", "Vi har startet byggingen", " Ble forsokt med ukjent resultat.", "Niva", " Kan ikke bygges.", " Kan ikke viderebygges.", "Opgaven ble planlagt til senere.", "Navarende produksjon:", "Vi kan ikke planlegge denne oppgave akkurat na.", "Oppgaveplanlegging er ikke tilgjengelig!", "Planlagte oppgaver", "Slett", "Send senere", "Det ikke er tropper tilgjengelig.", "Dine tropper ble sendt til", "Dine tropper kunne ikke sendes til", "Support", "Angrip", "Plyndringstokt", "Katapultene skyter mot", "tilfeldig", "mot", "eller mot", "sekunder", "minutter", "timer", "dager", "Spioner pa rastoffer og tropper", "Spioner pa forsvarsverk og tropper", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ","or repeat ","times ","espaced by ","Queue this task"];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	
	case "br":
	case "pt":  //by Guinness
		aLangBuildings = ["", "Bosque", "Poço de Barro", "Mina de Ferro", "Campo de Cereais", "Serração", "Alvenaria", "Fundição", "Moinho", "Padaria", "Armazém", "Celeiro", "Ferreiro", "Fábrica de Armaduras", "Praça de Torneios", "Edifício Principal", "Ponto de Reunião Militar", "Mercado", "Embaixada", "Quartel", "Cavalariça", "Oficina", "Academia", "Esconderijo", "Casa do Povo", "Residência", "Palácio", "Câmara do Tesouro", "Companhia do Comércio", "Grande Quartel", "Grande Cavalariça", "Muralha", "Muro de Terra", "Paliçada", "Pedreiro", "Cervejaria", "Fábrica de Armadilhas", "Mansão do Herói", "Grande Armazém", "Grande Celeiro", "Maravilha do Mundo"];
		aLangTasks = ["Construir", "Melhorar", "Atacar", "Desenvolver", "Treinar","Send Resource"];
		aLangStrings = ["Construir Mais Tarde", "Melhorar Mais Tarde", "Atacar Mais Tarde", "Desenvolver Mais Tarde", "Programar esta tarefa para mais tarde.", "Começamos a construir ", " foi tentada a tarefa mas com resultado desconhecido.", "nível", " não pode ser construído.", " não pode ser melhorado.", "A tarefa foi programada.", "Em construção:", "Não conseguimos programar esta tarefa agora.", "Programação de tarefas não está disponível!", "Tarefas Programadas", "Apagar", "Enviar Mais Tarde", "Não foram seleccionadas tropas.", "As tuas tropas foram enviadas para", "Não foi possível enviar as tuas tropas para", "Reforços", "Ataque:normal", "Ataque:assalto", "O alvo das Catapultas será", "Aleatório", "rs", "ou depois","segundos", "minutos", "horas", "dias","Espiar recursos e tropas", "Espiar defesas e tropas", "Ausente", "O ataque não pode ser programado pois nenhum destino foi escolhido.", "na localização ns.", "Sort by:", "type ", "time ", "target ", "options ", "village ","or repeat ","times ","espaced by ","Queue this task"];
		aLangTroops[0] = ["Legionário", "Pretoriano", "Imperiano", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Aríete", "Catapulta de Fogo", "Senador", "Colonizador"]; //Romans
		aLangTroops[1] = ["Salteador", "Lanceiro", "Bárbaro", "Espião", "Paladino", "Cavaleiro Teutão", "Aríete", "Catapulta", "Chefe", "Colonizador"]; //Teutons
		aLangTroops[2] = ["Falange", "Espadachim", "Batedor", "Trovão Theutate", "Cavaleiro Druida", "Haeduano", "Aríete", "Trabuquete", "Chefe de Clã", "Colonizador"]; //Gauls
		break; 
		
	case "pl":  //by Oskar
        aLangBuildings = ["", "Las", "Kopalnia gliny", "Kopalnia zelaza", "Pole zboza", "Tartak", "Cegielnia", "Huta stali", "Mlyn", "Piekarnia", "Magazyn surowców", "Spichlerz","Zbrojownia", "Kuznia", "Plac turniejowy", "Glówny budynek", "Miejsce zbiórki", "Rynek", "Ambasada", "Koszary", "Stajnia", "Warsztat", "Akademia", "Kryjówka", "Ratusz", "Rezydencja", "Palac","Skarbiec", "Targ", "Duze koszary", "Duza stajnia", "Mury obronne", "Waly", "Palisada", "Kamieniarz", "Browar", "Traper", "Dwór bohaterów", "Duzy magazyn", "Duzy spichlerz", "Cud"];
        aLangTasks = ["Buduj", "Rozbuduj", "Atak", "Zbadac", "Szkolic","Send Resource"];
        aLangStrings = ["Buduj pózniej", "Rozbuduj pózniej", "Atakuj pózniej", "Zbadaj pózniej", "Zaplanuj zadanie na pózniej.", "Rozpoczeto budowe ", " zostala podjeta z nieznanym skutkiem.", "poziom", " nie moze byc zbudowany.", " nie moze byc rozbudowany.", "Zadanie zostalo zaplanowane.", "Aktualna produkcja:", "Nie mozna teraz zaplanowac tego zadania.", "Planowanie nie dostepne!", "Zaplanowane zadania", "Usun", "Wyslij pózniej", "Nie wybrano zadnych jednostek.", "Twoje jednoski zostaly wyslane", "Twoje jednostki nie moga zostac wyslane", "Pomoc", "Atak", "Grabiez", "Katapulty celuja w", "losowy", "o", "lub za", "sekundy", "minuty", "godziny", "dni", "Obserwuj surowce i jednostki", "Obserwuj fortyfikacje i jednostki", "nieobecny", "Atak nie moze zostac zaplanowany, poniewaz nie wybrano celu.", "Na pozycji nr.", "Sortowanie:", "typ ", "czas ", "cel ", "opcje ", "osada ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Szkolic pózniej", "troops.", "Train", "We started training ", " cannot be trained.","Queue this task"];
		aLangTroops[0] = ["Legionista", "Pretorianin", "Centurion", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Taran", "Ognista katapulta", "Konsul", "Osadnik", "Bohater"];  //Romans
		aLangTroops[1] = ["Palkarz", "Oszczepnik", "Topornik", "Zwiadowca", "Paladyn", "Germanski Rycerz", "Taran", "Katapulta", "Wódz", "Osadnik", "Bohater"];  //Teutons
		aLangTroops[2] = ["Falanga", "Miecznik", "Tropiciel", "Grom Teutatesa", "Jezdziec Druidzki", "Haeduan", "Taran", "trebeusz", "Herszt", "Osadnik", "Bohater"];  //Gauls		
		break;
	
	case "ro":  //Dark EingeL
	   aLangBuildings = ["", "Cherestea", "Puţ de lut", "Mina de fier", "Lan de grâu", "Fabrica de cherestea", "Fabrica de caramidă", "Topitorie", "Moara", "Brutărie", "Hambar", "Grânar", "Fierărie", "Armurier", "Arena", "Primărie", "Adunare", "Târg", "Ambasada", "Cazarma", "Grajd", "Atelier", "Academie", "Beci", "Casa de cultură", "Vila", "Palat", "Trezorerie", "Oficiu de comerţ", "Cazarma extinsa", "Grajd extins", "Zid", "Metereze", "Palisada", "Arhitect", "Berarie", "Temniţa", "Reşedinţa eroului", "Hambar extins", "Granar extins", "Minunea Lumii"];
	    aLangTasks = ["Cladire", "Imbunatateste", "Ataca", "Cerceteaza", "Instruieste","Send Resource"];
	    aLangStrings = ["Construieste mai tarziu", "Imbunatateste mai tarziu", "Ataca mai tarziu","Cerceteaza ulterior", "Programeaza acesta actiune pentru mai tarziu", "Am inceput sa construim", "A fost incercata cu rezultate necunoscute", "Nivel", "Nu poate fi construita","Nu poate fi upgradata", "Actiunea a fost programata", "Productia curenta:","Nu putem programa acesta actiune acum", "Programarea actiuni nu este disponibila!", "Actiuni Programate", "Sterge", "Trimite mai tarziu", "No troops were selected.","Trupele tale au fost trimise la", "Trupele tale nu au putut fi trimise la", "Suport","Atac", "Raid", "Catapulteaza pe la","Aleator", "la", "sau dupa","secunde", "minute", "ore","zile", "Spioneaza resurse si unitati", "Spioneaza fortificatii si trupe", "plecate", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ","or repeat ","times ","espaced by ","Queue this task"];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
	    break;
	
	case "ru": //by melhior
        aLangBuildings = ["", "Лесопильный завод", "Глиняный карьер", "Железный рудник", "Ферма", "Деревообрабатывающий завод", "Кирпичный завод", "Чугунолитейный завод", "Мукомольная мельница", "Пекарня", "Склад", "Амбар", "Кузница оружия", "Кузница доспехов", "Арена", "Главное здание", "Пункт сбора", "Рынок", "Посольство", "Казарма", "Конюшня", "Мастерская", "Академия", "Тайник", "Ратуша", "Резиденция", "Дворец", "Сокровищница", "Торговая палата", "Большая казарма", "Большая конюшня", "Городская стена", "Земляной вал", "Изгородь", "Каменотес", "Пивоварня", "Капканщик", "Таверна", "Большой склад", "Большой амбар", "Чудо Света"];
        aLangTasks = ["Построить", "Развить", "Отправка войск", "Изучить", "Обучить","Транспортировка сырья"];
        aLangStrings = ["Построить позже", "Развить позже", "Атаковать позже", "Изучить позже", "Заплпнировать задачу", "Начато строительство ", " was attempted with unknown result", "уровень", " невозможно построить", " невозможно развить", "Задача запланирована", "Производительность:", "Невозможно запланировать задачу сейчас", "Планирование задачи недоступно!", "Запланированные задачи", "Удалить", "Отправить позже", "Войска не выбраны", "Войска были отправлены в", "Невозможно отправить войска в", "Подкрепление", "Нападение", "Набег", "Цели катапульт", "случайно", "в", "или через", "секунд", "минут", "часов", "дней", "Разведка ресурсов и войск", "Разведка войск и оборонительных сооружений", "away", "Атака не может быть запланирована, потому что не указано место назначения", "на месте №", "Сортировать по:", "типу ", "времени ", "цели ", "опциям ", "деревне ", "История задач", "очистить историю", "Начато изучение ", " не может быть изучено", "Улучшить позже", "Разведка", "Обучить позже", "войска", "Обучить", "Начато обучение ", " невозможно обучить","или повторить ","раз ","с промежутком ","Отменить все задачи ","Have been dispatched"];
        aLangTroops[0] = ["Легионер", "Преторианец", "Империанец", "Конный разведчик", "Конница императора", "Конница цезаря", "Таран", "Огненная катапульта", "Сенатор", "Поселенец", "Герой"]; //Romans
        aLangTroops[1] = ["Дубинщик", "Копейщик", "Топорщик", "Скаут", "Паладин", "Тевтонская конница", "Стенобитное орудие", "Катапульта", "Вождь", "Поселенец", "Герой"]; //Teutons
        aLangTroops[2] = ["Фаланга", "Мечник", "Следопыт", "Тевтатский гром", "Друид-всадник", "Эдуйская конница", "Таран", "Требучет", "Предводитель", "Поселенец", "Герой"]; //Gauls
    break;
	case "tr": //by drascom
		aLangBuildings = ["", "Oduncu", "Tugla Ocagi", "Demir Madeni", "Tarla", "Kereste Fabrikasi", "Tugla Firini", "Demir Dökümhanesi", "Degirmen", "Ekmek Firini", "Hammadde deposu", "Tahil Ambari", "Silah Dökümhanesi", "Zirh Dökümhanesi", "Turnuva Alani", "Merkez Binasi", "Askeri Üs", "Pazar Yeri", "Elçilik", "Kisla", "Ahir", "Tamirhane", "Akademi", "Siginak", "Belediye", "Kösk", "Saray", "Hazine", "Ticari Merkez", "Büyük Kisla", "Büyük Ahir", "Sur", "Toprak Siper", "Çit", "Tasci", "Bira Fabrikasi", "Tuzakçi", "Kahraman Kislasi", "Büyük Hammadde Deposu", "Büyük Tahil Ambari", "Dünya Harikasi"];
		aLangTasks = ["Kurulacak bina", "Gelistirilecek Bina", "Asker gönder", "gelistir", "Yetistir","Send Resource"];
		aLangStrings = ["Daha sonra KUR", "Daha Sonra GELISTIR", "Sonra Saldir", "Sonra arastir", "Bu islemi sonra planla.", "Yapim basladi. ", "Islem tanimlamadi.", "Seviye", " Insa edilemedi.", " Yükseltilemedi.", "Islem siraya alindi.", "Saatlik üretim", "Islemi su an planlayamiyoruz.", "Islem siralama mümkün degildir!", "Siradaki Islemler", "Sil", "Daha sonra yolla", "Önce asker seçmelisiniz..", "Askerlerin gönderildigi yer ", "Askerler yollanamadi", "Destek olarak", "Normal Saldiri olarak", "Yagmala olarak", "Mancinik hedefi", "Rastgele", "Su an", "Yada bu zaman sonra", "saniye sonra", "dakika sonra", "saat sonra", "gün sonra", "Hammadde ve askerleri izle", "Asker ve defansi izle", "uzakta","Saldiri plani için adres girmediniz.","adres", "Siralama Kriteri:", ".Tip.", " .Süre.", ".Hedef. ", "Ayarlar", ".Köy. ","Tamamlanan islemler", "Geçmisi sil", "Arastiriliyor.", " Arastitilamadi.", "Sonra Gelistir.", "Casus", "Sonra yetistir", "Askerler.", "Yetistir", "Yetistirme Basladi ", " Yetistirme Baslamadi.","Queue this task"];
		aLangTroops[0] = ["Lejyoner", "Pretoryan", "Emperyan", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Koçbasi", "Ates Mancinigi", "Senator", "Göçmen", "Hero"]; //Romalilar
		aLangTroops[1] = ["Tokmak Sallayan", "Mizrakçi", "Balta Sallayan", "Casus", "Paladin", "Toyton", "Koçbasi", "Mancinik", "Reis", "Göçmen", "Kahraman"]; //Cermenler
		aLangTroops[2] = ["Phalanx", "Kiliçli", "Casus", "Toytagin Simsegi", "Druyid", "Haeduan", "Koçbasi", "Mancinik", "Kabile Reisi", "Göçmen", "Kahraman"]; //Galyalilar
		break;
		
	case "se":
		aLangBuildings = ["", "Skogshuggare", "Lergrop", "Järngruva", "Vetefält", "Sagverk", "Murbruk", "Järngjuteri", "Vetekvarn", "Bageri", "Magasin", "Silo", "Smedja", "Vapenkammare", "Tornerplats", "Huvudbyggnad", "Samlingsplats", "Marknadsplats", "Ambassad", "Baracker", "Stall", "Verkstad", "Akademi", "Grotta", "Stadshus", "Residens", "Palats", "Skattkammare", "Handelskontor", "Stor barack", "Stot stall", "Stadsmur", "Jordvall", "Palissad", "Stenhuggare", "Bryggeri", "Fälla", "Hjältens egendom", "Stort magasin", "Stor silo", "Världsunder"];
		aLangTasks = ["Konstruera", "Uppgradera", "Attack", "Förbättra", "Träna","Send Resource"];
		aLangStrings = ["Konstruera senare", "Uppgradera senare", "Attackera senare", "Förbättra senare", "Schemalägg uppgiften tills senare.", "Byggnationen pabörjad ", " utfördes med okänt resultat.", "niva", " kan inte byggas.", " kan inte uppgraderas.", "Uppgiften är schemalagd.", "Nuvarande produktion:", "Det gar inte att schemalägga denna uppgift just nu.", "Schemaläggningen är inte tillgänglig!", "Schemalägg uppgift", "Ta bort", "Skicka senare", "Attacken kunde inte bli schemalagd da inga trupper valdes.", "Dina trupper skickades till", "Dina trupper kunde inte skickas till", "Support", "Attack", "Plundring", "Katapulterna ska sikta pa", "random", "vid", "eller efter", "sekunder", "minuter", "timmar", "dagar", "Spionera pa trupper och resurser", "Spionera pa trupper och försvar", "borta", "Attacken misslyckades, var vänlig och välj en destination.", "ingen destination.", "Sortera efter:", "typ ", "tid ", "mal ", "alternativ ", "by ", "tidigare","Queue this task"];
		aLangTroops[0] = ["Legionär", "Praetorian", "Imperiesoldat", "Sparare", "Imperieriddare", "Ceasarriddare", "Murbräcka", "Eld Katapult", "Senator", "Nybyggare", "Hjälte"];  //Romans
		aLangTroops[1] = ["Klubbman", "Spjutman", "Yxman", "Scout", "Paladin", "Germansk Knekt", "Murbräcka", "Katapult", "Stamledare", "Nybyggare", "Hjälte"];  //Teutons
		aLangTroops[2] = ["Falanx", "Svärdskämpe", "Sparare", "Theutates Blixt", "Druidryttare", "Haeduan", "Murbräcka", "Krigskatapult", "Hövding", "Nybyggare", "Hjälte"];  //Gauls
		break;
	
	case "si":  //by SpEkTr
		aLangBuildings = ["", "Gozdar", "Glinokop", "Rudnik železa", "Žitno polje", "Žaga", "Opekarna", "Talilnica železa", "Mlin", "Pekarna", "Skladišce", "Žitnica", "Izdelovalec orožja", "Izdelovalec oklepov", "Vadbišce", "Gradbeni ceh", "Zbirališce", "Tržnica", "Ambasada", "Barake", "Konjušnica", "Izdelovalec oblegovalnih naprav", "Akademija", "Špranja", "Mestna hiša", "Rezidenca", "Palaca", "Zakladnica", "Trgovski center", "Velike barake", "Velika konjušnica", "Mestno obzidje", "Zemljen zid", "Palisada", "Kamnosek", "Brewery", "Postavljalec pasti", "Herojeva rezidenca", "Veliko skladišce", "Velika žitnica", "Wonder"];
		aLangTasks = ["Postavi nov objekt", "Nadgradi", "Napad na ", "Razišci", "Izuri","Send Resource"];
		aLangStrings = ["Postavi nov objekt kasneje", "Nadgradi kasneje", "Napadi kasneje", "Izuri kasneje", "Nastavi to nalogo za kasneje", "Z gradnjo zacnem ", " rezultat ni znan.", "stopnja", " ne morem zgraditi.", " ne morem nadgraditi.", "Naloga je nastavljena.", "Trenutna proizvodnja:", "Te naloge trenutno ni možno nastaviti.", "Nastavljanje nalog ni možno!", "Nastavljene naloge:", "Zbriši", "Pošlji kasneje", "Nisi oznacil nobenih enot.", "Tvoje enote so bile poslane,", "Tvoje enote ne morejo biti poslane,", "Okrepitev", "Napad", "Roparski pohod", "Cilj katapultov je", "nakljucno", "ob", "ali kasneje", "sekund", "minut", "ur", "dni", "Poizvej o trenutnih surovinah in enotah", "Poizvej o obrambnih zmogljivostih in enotah", "proc", "Napad ne more biti nastavljen, ker ni bila izbrana nobena destinacija.", "na strani št.","Razvrsti po:","tip ","cas ","tarca ","možnosti ","vas ","Zgodovina nalog","Zbriši zgodovino","Zacenjam z raziskavo","Ne morem raziskati","Nadgradi kasneje","Skavt","Izuri kasneje","enote","Izuri","Zacenjam izurjati"," nemorem izuriti","ali ponovi ","krat ","z zamikom ","Zbriši naloge","So bili odposlani","Queue this task"];
		aLangTroops[0] = ["Legionar", "Praetorijan", "Imperijan", "Izvidnik", "Equites Imperatoris", "Equites Caesaris", "Oblegovalni oven", "Ognjeni katapult", "Senator", "Kolonist"];  //Romans
		aLangTroops[1] = ["Gorjacar", "Sulicar", "Metalec sekir", "Skavt", "Paladin", "Tevtonski vitez", "Oblegovalni oven", "Mangonel", "Vodja", "Kolonist"];  //Teutons
		aLangTroops[2] = ["Falanga", "Mecevalec", "Stezosledec", "Theutatesova Strela", "Druid", "Haeduan", "Oblegovalni oven", "Trebušet", "Poglavar", "Kolonist"];  //Gauls
		break;
	
	case "uk":
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "Sawmill", "Brickyard", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "City Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train","Send Resource"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ","Queue this task"];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"]; //Romans
		aLangTroops[1] = ["Maceman", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"]; //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"]; //Gauls
		break;
		
	case "us":  //by m4rtini
		aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Wheat Field", "Sawmill", "Brickyard", "Iron Foundry", "Flour Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally Point", "Marketplace", "Embassy", "Barracks", "Stable", "Siege Workshop", "Academy", "Cranny", "City Hall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"]; 
		aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train","Send Resource"];
		aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ","Queue this task"];
		aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
		aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
		aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
		break;
	
	case "fr":  //by arn0
		aLangBuildings = ["", "Bûcherons", "Carrière de terre", "Mine de fer", "Ferme", "Scierie", "Usine de poteries", "Fonderie", "Moulin", "Boulangerie", "Dépôt de ressources", "Silo de céréales", "Armurerie", "Usine d'armures", "Place du tournoi", "Bâtiment principal", "Place de rassemblement", "Place du Marché", "Ambassade", "Caserne", "Ecurie", "Atelier", "Académie", "Cachette", "Hôtel de ville", "Résidence", "Palais", "Chambre du trésor", "Comptoir de commerce", "Grande caserne", "Grande écurie", "Mur d'enceinte", "Mur de terre", "Palissade", "Tailleur de pierre", "Brasserie", "Fabricant de pièges", "Manoir du héros", "Grand dépôt", "Grand silo", "Merveille du monde"]; 
		aLangTasks = ["Construire le bâtiment", "Augmenter au", "Attack", "Recherche", "Train","Envoyer des ressources"];
		aLangStrings = ["Construire plus tard", "Améliorer plus tard", "Attaquer plus tard", "Rechercher plus tard", "Programmer cette tâche pour plus tard.", "Construction commencée ", " a été tenté sans résultats.", "niveau", " ne peut être construit.", " ne peut être amélioré.", "La tâche a été programmée.", "Production courante:", "Cette tâche ne peut être programmée actuellement.", "La programmation de tâches n'est pas disponible!", "Tâches programmées", "Supprimer", "Envoyer plus tard", "L'attaque ne peut pas être programmée car aucune troupe n'a été sélectionnée.", "Vos troupes ont été envoyées à", "Vos troupes n'ont pas pu être envoyées à", "Assistance", "Attaque: Normal", "Attaque: pillage", "Les catapultes ont pour cible", "aléatoire", "sur", "ou après", "secondes", "minutes", "heures", "jours", "Espionner troupes et ressources", "Espionner troupes et défenses", "ailleurs", "L'attaque ne peut être programmée car aucune destination n'a été spécifiée.", "au site no.", "Trier par:", "type ", "durée ", "cible ", "options ", "village ",  "Historique des tâches ","vider l'historique ", "La recherche a été démarré ", " impossible de rechercher.", "Améliorer plus tard", "Espionner", "Entraîner plus tard", "troupes", "Entraîner", "L'entraînement a commencé", " ne peut pas être entraîner","ou repétez ","fois ","par période de ","Purger la liste des tâches","Ont été distribués","Ajouter à la fin des Tâches."];
		aLangTroops[0] = ["Légionnaire", "Prétorien", "Impérian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Bélier", "Catapule de feut", "Sénateur", "Colon", "Heros"];  //Romans
		aLangTroops[1] = ["Combattant au gourdin", "Combattant à la lance", "Combattant à la hache", "Eclaireur", "Paladin", "Cavalier teuton", "Bélier", "Catapulte", "Chef de tribu", "Colon", "Heros"];  //Teutons
		aLangTroops[2] = ["Phalange", "Combattant à l'épée", "Eclaireur", "Eclair de Toutatis", "Cavalier druide", "Hédouin", "Bélier", "Catapulte de guerre", "Chef", "Colon", "Heros"];  //Gauls
		break;	
	
    case "de":  //by Metador & hombre
        aLangBuildings = ["", "Holzfäller", "Lehmgrube", "Eisenmine", "Getreidefarm", "Sägewerk", "Lehmbrennerei", "Eisengießerei", "Getreidemühle", "Bäckerei", "Rohstofflager", "Kornspeicher", "Waffenschmiede", "Rüstungsschmiede", "Turnierplatz", "Hauptgebäude", "Versammlungsplatz", "Marktplatz", "Botschaft", "Kaserne", "Stall", "Werkstatt", "Akademie", "Versteck", "Rathaus", "Residenz", "Palast", "Schatzkammer", "Handelskontor", "Große Kaserne", "Großer Stall", "Stadtmauer", "Erdwall", "Palisade", "Steinmetz", "Brauerei", "Fallensteller", "Heldenhof", "Großes Rohstofflager", "Großer Kornspeicher", "Weltwunder"];
        aLangTasks = ["Gebäude bauen", "Ausbau von", "Angriff", "Erforschen von", "Ausbilden von","Ressourcen Senden"];
        aLangStrings = ["Später bauen", "Später ausbauen", "Später angreifen", "Später erforschen", "Führe den Auftrag später aus.", "Gebäudebau gestartet: ", " wurde versucht mit unbekanntem Ergebnis.", "Stufe", " kann nicht gebaut werden.", " kann nicht ausgebaut werden.", "Der Auftrag wurde hinzugefügt.", "Produktion:", "Dieser Auftrag kann jetzt nicht Aufgegeben werden.", "Auftrag nicht verfügbar!", "Aufträge:", "Löschen", "Später senden", "Keine Truppen ausgewählt wurden.", "Deine Truppen wurden geschickt, und zwar nach", "Truppen konnten nicht geschickt werden, und zwar nach ", "Unterstützung von", "Angriff auf", "Raubzug gegen", "Die Katapulte zielen auf", "Zufall", "um", "oder nach", "Sekunden", "Minuten", "Stunden", "Tage", "Rohstoffe und Truppen ausspähen", "Verteidigungsanlagen und Truppen ausspähen", "weg", "The attack cannot be scheduled because no destination was specified.", "Bauplatz #", "Sortieren nach:", "Art ", "Zeit ", "Ziel ", "Optionen ", "Dorf ", "Taskverlauf", "Verlauf löschen", "Erforschung gestartet: ", " kann nicht erforscht werden.", "Später erforschen", "Spionieren", "Später ausbilden", " Truppen.", "Ausbilden", "Ausbildung gestartet: ", " kann nicht ausgebildet werden.", "Wiederhole ", "mal ","im Abstand von ", "Alle Aufträge löschen ", "Wurden abgeschickt","Task in Queue einfügen (als erstes)","Morgen"];
        aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
        aLangTroops[1] = ["Keulenschwinger", "Speerkämpfer", "Axtkämpfer", "Kundschafter", "Paladin", "Teutonen Reiter", "Ramme", "Katapult", "Stammesführer", "Siedler", "Held"];  //Teutons
        aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
        break;

    case "en":
    case "com":
    default: // default is english
        aLangBuildings = ["", "Woodcutter", "Clay Pit", "Iron Mine", "Cropland", "Sawmill", "Brickyard", "Iron Foundry", "Grain Mill", "Bakery", "Warehouse", "Granary", "Blacksmith", "Armoury", "Tournament Square", "Main Building", "Rally point", "Marketplace", "Embassy", "Barracks", "Stable", "Workshop", "Academy", "Cranny", "Townhall", "Residence", "Palace", "Treasury", "Trade Office", "Great Barracks", "Great Stable", "City Wall", "Earth Wall", "Palisade", "Stonemason", "Brewery", "Trapper", "Hero's Mansion", "Great Warehouse", "Great Granary", "Wonder"];
        aLangTasks = ["Build", "Upgrade", "Attack", "Research", "Train","Send Resource"];
        aLangStrings = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.","Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained.","or repeat ","times ","espaced by ","Flush Task List ","Have been dispatched","Queue this task","Tomorrow"];
        aLangTroops[0] = ["Legionnaire", "Praetorian", "Imperian", "Equites Legati", "Equites Imperatoris", "Equites Caesaris", "Battering Ram", "Fire Catapult", "Senator", "Settler", "Hero"];  //Romans
        aLangTroops[1] = ["Clubswinger", "Spearman", "Axeman", "Scout", "Paladin", "Teutonic Knight", "Ram", "Catapult", "Chief", "Settler", "Hero"];  //Teutons
        aLangTroops[2] = ["Phalanx", "Swordsman", "Pathfinder", "Theutates Thunder", "Druidrider", "Haeduan", "Ram", "Trebuchet", "Chieftain", "Settler", "Hero"];  //Gauls
        break;

}


// Do not change the array below!
var aLangStringsMaster = ["Build later", "Upgrade later", "Attack later", "Research later", "Schedule this task for later.", "We started builing ", " was attempted with unknown result.", "level", " cannot be built.", " cannot be upgraded.", "The task was scheduled.", "Current production:", "We can't schedule this task right now.", "Task scheduling is not available!", "Scheduled Tasks", "Delete", "Send later", "No troops were selected.", "Your troops were sent to", "Your troops could not be sent to", "Support", "Attack", "Raid", "Catapults will aim at", "random", "at", "or after", "seconds", "minutes", "hours", "days", "Spy for resources and troops", "Spy for troops and defenses", "away", "The attack cannot be scheduled because no destination was specified.", "at site no.", "Sort by:", "type ", "time ", "target ", "options ", "village ", "Task History", "flush history", "We started researching ", " cannot be researched.", "Enhance later", "Spy", "Train later", "troops.", "Train", "We started training ", " cannot be trained.","or repeat ","times ","espaced by ","Flush Task List ","Have been dispatched","Queue this task","Tomorrow"];



//*****************************************************************
// TROOP DATA, from battle analyser
//*****************************************************************

var DEF_TROOPDATA_ATT = 0;
var DEF_TROOPDATA_DEFINF = 1;
var DEF_TROOPDATA_DEFKAV = 2;
var DEF_TROOPDATA_LUMBER = 3;
var DEF_TROOPDATA_CLAY = 4;
var DEF_TROOPDATA_IRON = 5;
var DEF_TROOPDATA_GRAIN = 6;
var DEF_TROOPDATA_FOOD = 7;
var DEF_TROOPDATA_SPEED = 8;
var DEF_TROOPDATA_CARRY = 9;

//0-att 1-def1 2-def2 3-lumber 4-clay 5-iron 6-grain 7-food 8-speed 9-load
romans=new Array();
romans[0] = new Array(40,35,50,120,100,180,40,1,6,40);					// Legionnaire
romans[1] = new Array(30,65,35,100,130,160,70,1,5,20);					// Praetorian
romans[2] = new Array(70,40,25,150,160,210,80,1,7,50);					// Imperian
romans[3] = new Array(0,20,10,140,160,20,40,2,16,0);					// Equites Legati
romans[4] = new Array(120,65,50,550,440,320,100,3,14,100);                              // Equites Imperatoris
romans[5] = new Array(180,80,105,550,640,800,180,4,10,70);                              // Equites Caesaris
romans[6] = new Array(60,30,75,900,360,500,70,3,4,0);					// Battering Ram
romans[7] = new Array(75,60,10,950,1350,600,90,6,3,0);					// Fire catapult
romans[8] = new Array(50,40,30,30750,27200,45000,37500,4,4,0);                          // Senator
romans[9] = new Array(0,80,80,5800,5300,7200,5500,1,5,1600);                            // Settler
romans[10] = new Array(0,0,0,0,0,0,0,6,0,0);						// Hero
romans[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
romans[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
teutons=new Array();
teutons[0] = new Array(40,20,5,95,75,40,40,1,7,60);					// Clubswinger
teutons[1] = new Array(10,35,60,145,70,85,40,1,7,40);					// Spearfighter
teutons[2] = new Array(60,30,30,130,120,170,70,1,6,50);					// Axefighter
teutons[3] = new Array(0,10,5,160,100,50,50,1,9,0);					// Scout
teutons[4] = new Array(55,100,40,370,270,290,75,2,10,110);                              // Paladin
teutons[5] = new Array(150,50,75,450,515,480,80,3,9,80);				// Teuton Knight
teutons[6] = new Array(65,30,80,1000,300,350,70,3,4,0);					// Ram
teutons[7] = new Array(50,60,10,900,1200,600,60,6,3,0);					// Catapult
teutons[8] = new Array(40,60,40,35500,26600,25000,27200,4,4,0);                         // Chief
teutons[9] = new Array(10,80,80,7200,5500,5800,6500,1,5,1600);                          // Settler
teutons[10] = new Array(0,0,0,0,0,0,0,6,0,0);						// Hero
teutons[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
teutons[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)
gauls = new Array(10);
gauls[0] = new Array(15,40,50,100,130,55,30,1,7,30);					// Phalanx
gauls[1] = new Array(65,35,20,140,150,185,60,1,6,45);					// Swordfighter
gauls[2] = new Array(0,20,10,170,150,20,40,2,17,0);					// Pathfinder
gauls[3] = new Array(90,25,40,350,450,230,60,2,19,75);					// Theutates Thunder
gauls[4] = new Array(45,115,55,360,330,280,120,2,16,35);				// Druidrider
gauls[5] = new Array(140,50,165,500,620,675,170,3,13,65);				// Haeduan
gauls[6] = new Array(50,30,105,950,555,330,75,3,4,0);					// Ram
gauls[7] = new Array(70,45,10,960,1450,630,90,6,3,0);					// Trebuchet
gauls[8] = new Array(40,50,50,30750,45400,31000,37500,4,5,0);                           // Chieftain
gauls[9] = new Array(0,80,80,5500,7000,5300,4900,1,5,1600);                             // Settler
gauls[10] = new Array(0,0,0,0,0,0,0,6,0,0);						// Hero
gauls[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)
gauls[12] = new Array(0,0,1,1,1,1,0,0,0,0,0)
nature = new Array(10)
nature[0] = new Array(10,25,10,0,0,0,0,1,20,0);						// Rat
nature[1] = new Array(20,35,40,0,0,0,0,1,20,0);						// Spider
nature[2] = new Array(60,40,60,0,0,0,0,1,20,0);						// Serpent
nature[3] = new Array(80,66,50,0,0,0,0,1,20,0);						// Bat
nature[4] = new Array(50,70,33,0,0,0,0,2,20,0);						// Wild boar
nature[5] = new Array(100,80,70,0,0,0,0,2,20,0);					// Wolf
nature[6] = new Array(250,140,200,0,0,0,0,3,20,0);					// Bear
nature[7] = new Array(450,380,240,0,0,0,0,3,20,0);					// Crocodile
nature[8] = new Array(200,170,250,0,0,0,0,3,20,0);					// Tiger
nature[9] = new Array(600,440,520,0,0,0,0,5,20,0);					// Elephant

var aTroopData;  // this will hold one of the above arrays


//*****************************************************************
// ATASK TASK ARRAY DEFINITION
//*****************************************************************
var DEF_ATASK_TYPE = 0;             // 0-build, 1-upgrade, 2-attack, 3-research, 4-?, 5-send resource
var DEF_ATASK_TIME = 1;             // time in absolute secs utc
var DEF_ATASK_TARGET = 2;           // building id or village id
var DEF_ATASK_OPTIONS = 3;          // depends on type
var DEF_ATASK_VILLAGEID = 4;        // source village id
var DEF_ATASK_DURATION = 5;         // task duration in secs
// retry
var DEF_ATASK_RETRY = 6;            // number of retries
var DEF_ATASK_RETRYINTERVAL = 7;    // time between retries in secs
// repeat
var DEF_ATASK_REPEAT_NUM = 8;       // number of repeats OR
var DEF_ATASK_REPEAT_LASTEXEC = 9;  // repeat until last execution before
var DEF_ATASK_REPEAT_INTERVAL = 10; // 
var DEF_ATASK_REPEAT_RANDADD = 11;  // 
// other
var DEF_ATASK_ISDUMMY = 12;         
var DEF_ATASK_ISPAUSED = 13;

// atask types
var DEF_ATASK_TYPE_BUILD = "0"; // or ints?
var DEF_ATASK_TYPE_UPGRADE = "1";
var DEF_ATASK_TYPE_ATTACK = "2";
var DEF_ATASK_TYPE_RESEARCH = "3";
var DEF_ATASK_TYPE_TRAIN = "4";
var DEF_ATASK_TYPE_SEND = "5";

//*****************************************************************
// OTHER GLOBAL DEFS
//*****************************************************************

// GM_value identifiers
var DEF_TTQ_CODE0 = "TTQ_CODE_0";
var DEF_TTQ_CODE1 = "TTQ_CODE_1";
var DEF_TTQ_HISTORY = "TTQ_HISTORY";
var DEF_TTQ_PLACE_NAMES = "TTQ_PLACE_NAMES";
var DEF_TTQ_TASKS = "TTQ_TASKS";

var DEF_OPTION_LAST_REFRESH = 'LAST_REFRESH';
var DEF_OPTION_TASKLIST_SORT = "TASKLIST_SORT";
var DEF_OPTION_TASKLIST_SHOW = "TASKLIST_SHOW";
var DEF_OPTION_REPORTS_CLEAR = "REPORTS_CLEAR";
var DEF_OPTION_RACE = "RACE";
var DEF_OPTION_SCOUT_UNIT = "SCOUT_UNIT";
var DEF_OPTION_DELAY = "DELAY";
var DEF_OPTION_HISTORY_LENGTH = "HISTORY_LENGTH";
var DEF_OPTION_USE_SERVER_TIME = "USE_SERVER_TIME";
var DEF_OPTION_SERVER_TIME_OFFSET = "SERVER_TIME_OFFSET";
var DEF_OPTION_SHOW_POPUP_ON_SUCCESS = "SHOW_POPUP";
var DEF_OPTION_UPLOADOWN = "UPLOAD_OWN_REPORTS";
var DEF_OPTION_HISTORY_ONLY_ERROR = "HISTORY_ONLY_ERROR";
var DEF_OPTION_UPLOADALLYREPORTS = "ALLY_REPORTS";

var DEF_APP_NAME = "Farmers Friend";

//*****************************************************************
// EVENT MANAGER OBJECT
//*****************************************************************
/*
 * EventManager.js
 * by Keith Gaughan
 *
 * This allows event handlers to be registered unobtrusively, and cleans
 * them up on unload to prevent memory leaks.
 *
 * Copyright (c) Keith Gaughan, 2005.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Common Public License v1.0
 * (CPL) which accompanies this distribution, and is available at
 * http://www.opensource.org/licenses/cpl.php
 *
 * This software is covered by a modified version of the Common Public License
 * (CPL), where Keith Gaughan is the Agreement Steward, and the licensing
 * agreement is covered by the laws of the Republic of Ireland.
 */

// For implementations that don't include the push() methods for arrays.
if (!Array.prototype.push)
{
    Array.prototype.push = function(elem)
    {
        this[this.length] = elem;
    }
}

var EventManager =
{
    _registry: null,

    Initialise: function()
    {
        if (this._registry == null)
        {
            this._registry = [];

            // Register the cleanup handler on page unload.
            EventManager.Add(window, "unload", this.CleanUp);
        }
    },

    /**
     * Registers an event and handler with the manager.
     *
     * @param  obj         Object handler will be attached to.
     * @param  type        Name of event handler responds to.
     * @param  fn          Handler function.
     * @param  useCapture  Use event capture. False by default.
     *                     If you don't understand this, ignore it.
     *
     * @return True if handler registered, else false.
     */
    Add: function(obj, type, fn, useCapture)
    {
        this.Initialise();

        // If a string was passed in, it's an id.
        if (typeof obj == "string")
            obj = document.getElementById(obj);
        if (obj == null || fn == null)
            return false;

        // Mozilla/W3C listeners?
        if (obj.addEventListener)
        {
            obj.addEventListener(type, fn, useCapture);
            this._registry.push({obj: obj, type: type, fn: fn, useCapture: useCapture});
            _log(3,'added event to manager');
            return true;
        }

        // IE-style listeners?
        if (obj.attachEvent && obj.attachEvent("on" + type, fn))
        {
            this._registry.push({obj: obj, type: type, fn: fn, useCapture: false});
            return true;
        }
        _log(2,'Event adding didnt work.');
        return false;
    },

    /**
     * Cleans up all the registered event handlers.
     */
    CleanUp: function()
    {
        for (var i = 0; i < EventManager._registry.length; i++)
        {
            with (EventManager._registry[i])
            {
                // Mozilla/W3C listeners?
                if (obj.removeEventListener)
                    obj.removeEventListener(type, fn, useCapture);
                // IE-style listeners?
                else if (obj.detachEvent)
                    obj.detachEvent("on" + type, fn);
            }
        }

        // Kill off the registry itself to get rid of the last remaining
        // references.
        EventManager._registry = null;
        
        _log(2,'Removed all events.');
    }
};

/*
  SortTable
  version 2
  7th April 2007
  Stuart Langridge, http://www.kryogenix.org/code/browser/sorttable/
  
  Instructions:
  Download this file
  Add <script src="sorttable.js"></script> to your HTML
  Add class="sortable" to any table you'd like to make sortable
  Click on the headers to sort
  
  Thanks to many, many people for contributions and suggestions.
  Licenced as X11: http://www.kryogenix.org/code/browser/licence.html
  This basically means: do what you want with it.
*/

function sortMe(obj) {

    if (obj.className.search(/\bsorttable_sorted\b/) != -1) {
        // if we're already sorted by this column, just 
        // reverse the table, which is quicker
        sorttable.reverse(obj.sorttable_tbody);
        obj.className = obj.className.replace('sorttable_sorted',
                                                'sorttable_sorted_reverse');
        obj.removeChild(document.getElementById('sorttable_sortfwdind'));
        sortrevind = document.createElement('span');
        sortrevind.id = "sorttable_sortrevind";
        sortrevind.innerHTML = '&nbsp;&#x25B4;';
        obj.appendChild(sortrevind);
        return;
    }
    if (obj.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
        // if we're already sorted by this column in reverse, just 
        // re-reverse the table, which is quicker
        sorttable.reverse(obj.sorttable_tbody);
        obj.className = obj.className.replace('sorttable_sorted_reverse',
                                                'sorttable_sorted');
        obj.removeChild(document.getElementById('sorttable_sortrevind'));
        sortfwdind = document.createElement('span');
        sortfwdind.id = "sorttable_sortfwdind";
        sortfwdind.innerHTML = '&nbsp;&#x25BE;';
        obj.appendChild(sortfwdind);
        return;
    }
    
    // remove sorttable_sorted classes
    theadrow = obj.parentNode;
    forEach(theadrow.childNodes, function(cell) {
        if (cell.nodeType == 1) { // an element
          cell.className = cell.className.replace('sorttable_sorted_reverse','');
          cell.className = cell.className.replace('sorttable_sorted','');
        }
    });
    
    sortfwdind = document.getElementById('sorttable_sortfwdind');
    if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
    sortrevind = document.getElementById('sorttable_sortrevind');
    if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }
    
    obj.className += ' sorttable_sorted';
    sortfwdind = document.createElement('span');
    sortfwdind.id = "sorttable_sortfwdind";
    sortfwdind.innerHTML = '&nbsp;&#x25BE;';
    obj.appendChild(sortfwdind);
    
    // build an array to sort. This is a Schwartzian transform thing,
    // i.e., we "decorate" each row with the actual sort key,
    // sort based on the sort keys, and then put the rows back in order
    // which is a lot faster because you only do getInnerText once per row
    row_array = [];
    col = obj.sorttable_columnindex;
    rows = obj.sorttable_tbody.rows;
    for (var j=0; j<rows.length; j++) {
        row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
    }
    /* If you want a stable sort, uncomment the following line */
    sorttable.shaker_sort(row_array, obj.sorttable_sortfunction);
    /* and comment out this one */
    //row_array.sort(obj.sorttable_sortfunction);
    row_array.reverse();
    
    tb = obj.sorttable_tbody;
    for (var j=0; j<row_array.length; j++) {
        tb.appendChild(row_array[j][1]);
    }
    
    delete row_array;
}

sorttable = {
  init: function() {
    // quit if this function has already been called
    //if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    
    if (!document.createElement || !document.getElementsByTagName) return;
    
    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    
    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
    });
    
  },
  
  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      // table doesn't have a tHead. Since it should have, create one and
      // put the first table row in it.
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    
    if (table.tHead.rows.length != 1) return; // can't cope with two header rows
    
    // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
    // "total" rows, for example). This is B&R, since what you're supposed
    // to do is put them in a tfoot. So, if there are sortbottom rows,
    // for backwards compatibility, move them to tfoot (creating it if needed).
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }
    if (sortbottomrows) {
      if (table.tFoot == null) {
        // table doesn't have a tfoot. Create one.
        tfo = document.createElement('tfoot');
        table.appendChild(tfo);
      }
      for (var i=0; i<sortbottomrows.length; i++) {
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }
    
    // work through each column and calculate its type
    headrow = table.tHead.rows[0].cells;
    for (var i=0; i<headrow.length; i++) {
      
      // get out of wrapping
      var headrowi = headrow[i].wrappedJSObject;
      
      //alert(headrowi);
      
      // manually override the type with a sorttable_type attribute
      if (!headrowi.className.match(/\bsorttable_nosort\b/)) { // skip this col
        mtch = headrowi.className.match(/\bsorttable_([a-z0-9]+)\b/);
        if (mtch) { override = mtch[1]; }
	      if (mtch && typeof sorttable["sort_"+override] == 'function') {
	        headrowi.sorttable_sortfunction = sorttable["sort_"+override];
	      } else {
	        headrowi.sorttable_sortfunction = sorttable.guessType(table,i);
	      }

	      // make it clickable to sort
	      headrowi.sorttable_columnindex = i;
	      headrowi.sorttable_tbody = table.tBodies[0];
	      
	      dean_addEvent(headrowi,"click", function(e) { sortMe(this);});
	    }
    }
  },
  
  guessType: function(table, column) {
    // guess the type of a column based on its first non-blank row
    sortfn = sorttable.sort_alpha;
    for (var i=0; i<table.tBodies[0].rows.length; i++) {
      text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if (text != '') {
        if (text.match(/^-?[£$¤]?[\d,.]+%?$/)) {
          return sorttable.sort_numeric;
        }
        // check for a date: dd/mm/yyyy or dd/mm/yy 
        // can have / or . or - as separator
        // can be mm/dd as well
        possdate = text.match(sorttable.DATE_RE)
        if (possdate) {
          // looks like a date
          first = parseInt(possdate[1]);
          second = parseInt(possdate[2]);
          if (first > 12) {
            // definitely dd/mm
            return sorttable.sort_ddmm;
          } else if (second > 12) {
            return sorttable.sort_mmdd;
          } else {
            // looks like a date, but we can't tell which, so assume
            // that it's dd/mm (English imperialism!) and keep looking
            sortfn = sorttable.sort_ddmm;
          }
        }
      }
    }
    return sortfn;
  },
  
  getInnerText: function(node) {
    // gets the text we want to use for sorting for a cell.
    // strips leading and trailing whitespace.
    // this is *not* a generic getInnerText function; it's special to sorttable.
    // for example, you can override the cell text with a customkey attribute.
    // it also gets .value for <input> fields.
    
    hasInputs = (typeof node.getElementsByTagName == 'function') &&
                 node.getElementsByTagName('input').length;
    
    if (node.getAttribute("sorttable_customkey") != null) {
      return node.getAttribute("sorttable_customkey");
    }
    else if (typeof node.textContent != 'undefined' && !hasInputs) {
      return node.textContent.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.innerText != 'undefined' && !hasInputs) {
      return node.innerText.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.text != 'undefined' && !hasInputs) {
      return node.text.replace(/^\s+|\s+$/g, '');
    }
    else {
      switch (node.nodeType) {
        case 3:
          if (node.nodeName.toLowerCase() == 'input') {
            return node.value.replace(/^\s+|\s+$/g, '');
          }
        case 4:
          return node.nodeValue.replace(/^\s+|\s+$/g, '');
          break;
        case 1:
        case 11:
          var innerText = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            innerText += sorttable.getInnerText(node.childNodes[i]);
          }
          return innerText.replace(/^\s+|\s+$/g, '');
          break;
        default:
          return '';
      }
    }
  },
  
  reverse: function(tbody) {
    // reverse the rows in a tbody
    newrows = [];
    for (var i=0; i<tbody.rows.length; i++) {
      newrows[newrows.length] = tbody.rows[i];
    }
    for (var i=newrows.length-1; i>=0; i--) {
       tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },
  
  /* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
  },
  sort_alpha: function(a,b) {
    if (a[0].toLowerCase()==b[0].toLowerCase()) return 0;
    if (a[0].toLowerCase()<b[0].toLowerCase()) return -1;
    return 1;
  },
  sort_ddmm: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  sort_mmdd: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  
  shaker_sort: function(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    // thanks to Joseph Nahmias
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }  
}

/* ******************************************************************
   Supporting functions: bundled here to avoid depending on a library
   ****************************************************************** */

// Dean Edwards/Matthias Miller/John Resig

/* for Mozilla/Opera9 */
//if (document.addEventListener) {
//    document.addEventListener("onload", sorttable.init, false);
//}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            sorttable.init(); // call the onload handler
        }
    };
/*@end @*/

/* for Safari */
//if (/WebKit/i.test(navigator.userAgent)) { // sniff
//    var _timer = setInterval(function() {
//        if (/loaded|complete/.test(document.readyState)) {
//            sorttable.init(); // call the onload handler
//        }
//    }, 10);
//}

/* for other browsers */
//window.onload = sorttable.init;

// written by Dean Edwards, 2005
// with input from Tino Zijdel, Matthias Miller, Diego Perini

// http://dean.edwards.name/weblog/2005/10/add-event/

function dean_addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = dean_addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
dean_addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// Dean's forEach: http://dean.edwards.name/base/forEach.js
/*
	forEach, version 1.0
	Copyright 2006, Dean Edwards
	License: http://www.opensource.org/licenses/mit-license.php
*/

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
	Array.forEach = function(array, block, context) {
		for (var i = 0; i < array.length; i++) {
			block.call(context, array[i], i, array);
		}
	};
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
	for (var key in object) {
		if (typeof this.prototype[key] == "undefined") {
			block.call(context, object[key], key, object);
		}
	}
};

// character enumeration
String.forEach = function(string, block, context) {
	Array.forEach(string.split(""), function(chr, index) {
		block.call(context, chr, index, string);
	});
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
	if (object) {
		var resolve = Object; // default
		if (object instanceof Function) {
			// functions have a "length" property
			resolve = Function;
		} else if (object.forEach instanceof Function) {
			// the object implements a custom forEach method so use that
			object.forEach(block, context);
			return;
		} else if (typeof object == "string") {
			// the object is a string
			resolve = String;
		} else if (typeof object.length == "number") {
			// the object is array-like
			resolve = Array;
		}
		resolve.forEach(object, block, context);
	}
};

// ****************************************
// *** DOMUTILS
// ****************************************
function DOMUtils(doc, ctxt, html) {
	this.cn = function(tag, html) {
		var elem = this.document.createElement(tag);
		if (html) elem.innerHTML = html;
		return elem;
	}

	this.ct = function(text) {
		return this.document.createTextNode(text);
	}

	this.id = function(id) {
		return this.document.getElementById(id);
	}

	this.tag = function(tag) {
		return this.document.getElementsByTagName(tag);
	}

	this.xs = function(xpath) {
		var res = this.document.evaluate(xpath, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}

	this.xa = function(xpath) {
		var arr = [];
		var xpr = this.document.evaluate(xpath, this.context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0? null: arr;
	}

	this.xo = function(xpath) {
		var ret = this.document.evaluate(xpath, this.context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		return ret; //no snapshot
	}

	if (!doc) doc = document;
	if (!ctxt) ctxt = doc;
	if (html) {
		this.document = doc.implementation.createDocument('', '', null);
		this.context = doc.createElement('div');
		this.context.innerHTML = html;
	        ansDoc.appendChild(this.context);
	}
	else {
		this.document = doc;
		this.context = ctxt;
	}
}

// ************************************************************************************************************
// *********  LINK CREATION ***********************************************************************************
// ************************************************************************************************************

//*****************************************************************
// LINK CREATION: NEW BUILDING
//*****************************************************************

function createBuildLinks() {
    _log(3, "-> createBuildLinks()");
    var iSiteId = getBuildingId();
    if(iSiteId == false) {        
        return false;
    }

    var iTask = 0;  //the default action is build

    // Get the building name(s)
    var sXpathExpr = "//h1/b";
    var xpathRes = xpath(sXpathExpr);
    var xpathBuildingNames, re, re2, aMatches, sBuildingName, sBuildingId;
    if(xpathRes.snapshotLength > 0) {  //standing building
        _log(3, "This is an existing building.");
        iTask = 1;
        xpathBuildingNames = xpathRes;
        re = new RegExp("(.*)\\s" + translate("level") + "\\s[0-9]{1,3}$", "i");  // Will be used later for matching buildings and resource sites
        re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"
        _log(3, "Regular expressions (existing site):\n" + re + "\n" + re2);
    } else {  //empty building site or error
        _log(3, "This is an empty building site.");
        xpathBuildingNames = xpath("//h2");
        re = new RegExp("^([^0-9].*)", "i");  // Will be used later. For matching all except "X. Cranny"
        re2 = new RegExp("[0-9]{1,3}\\.\\s(.*)$", "i");  // Will be used later. For matching "X. Cranny"
        _log(3, "Regular expressions (new site):\n" + re + "\n" + re2);
    }

    for (var i = 0; i < xpathBuildingNames.snapshotLength; ++i) {
        //search for building id
        _log(3, "Searching for building ID...");

        sBuildingName = xpathBuildingNames.snapshotItem(i).innerHTML;  // this can contain level X string
        aMatches = sBuildingName.match(re);
        if(aMatches) {  //Regular building
            sBuildingName = aMatches[1];
            sBuildingName = rtrim(sBuildingName);  //trim trailing spaces
            sBuildingId = aLangBuildings.indexOf(sBuildingName);
            _log(3, "Building or resource site name found: \"" + sBuildingName +"\" \n"+ sBuildingId);
        } else if((aMatches = sBuildingName.match(re2))) {  // Cranny has different format (e.g. "3. Cranny")
            sBuildingName = aMatches[1];
            sBuildingId = aLangBuildings.indexOf(sBuildingName);
            _log(3, "Cranny name found: " + sBuildingName +" \n"+ sBuildingId);
        }
        if(sBuildingId > 0) {
            // Nous rÃƒÆ’Ã‚Â©cupÃƒÆ’Ã‚Â©rons la durÃƒÆ’Ã‚Â©e de construction du building
            var resultXpath;
            if(iTask==0){
                // Construction d'un batiment
                resultXpath = xpath("/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/h2["+(i+1)+"]/../table[1]/tbody/tr/td[1]");
            }else if (iTask==1){
                // AmÃƒÆ’Ã‚Â©lioration d'un batiment
                resultXpath = xpath("/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/div/table/tbody/tr/td");
            }
            if(resultXpath.snapshotLength>0){
                // On rÃƒÆ’Ã‚Â©cupÃƒÆ’Ã‚Â¨re l'heure
                var strTime = resultXpath.snapshotItem(0).textContent;
                var myRegExp = new RegExp("([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})");
                var myMatch = myRegExp.exec(strTime);
                //alert(strTime + " /" +myMatch);

                var duration = (parseInt(myMatch[1])*3600 + parseInt(myMatch[2])*60 + parseInt(myMatch[3]));// The default unit is Seconds
            //alert(duration);
            }

            // building found in the list
            var oLink = document.createElement("a");
            oLink.id = "buildLater" + i;
            oLink.innerHTML = "<br>" + aLangStrings[iTask];
            oLink.title = translate("Schedule this task for later.");
            oLink.href = "#";
            oLink.setAttribute("itask", iTask);
            oLink.setAttribute("starget", iSiteId);
            oLink.setAttribute("soptions", sBuildingId);
            // Specify the potential duration of the task
            if(duration){
                oLink.setAttribute("iduration",duration);
            }

            EventManager.Add(oLink,'click',displayTimerForm,false);

            if(iTask == 0) {
                xpathBuildingNames.snapshotItem(i).nextSibling.nextSibling.appendChild(oLink);
            }
            else if(iTask == 1) {
                xpathBuildingNames.snapshotItem(i).parentNode.nextSibling.nextSibling.appendChild(oLink);
            }
        } else {
            _log(2, "Building name found, but it was not identified in the building list.\n");
        }
    }

    return true;
    _log(3, "<- createBuildLinks()");
}

//*****************************************************************
// LINK CREATION: SEND RESOURCES
//*****************************************************************

function createSendResourceLinks(){
    _log(3, "-> createSendResourceLinks()");
    var xpathResult1 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[1]/td[3]/input[@id='r1']");
    var xpathResult2 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[2]/td[3]/input[@id='r2']");
    var xpathResult3 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[3]/td[3]/input[@id='r3']");
    var xpathResult4 = xpath("//html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/form/table/tbody/tr/td[1]/table/tbody/tr[4]/td[3]/input[@id='r4']");
    if(xpathResult1.snapshotLength>0 && xpathResult2.snapshotLength>0 && xpathResult3.snapshotLength>0 && xpathResult4.snapshotLength>0){
        // create the submit button

        var oBtn = document.createElement("input");
        oBtn.type = "button";
        oBtn.value = translate("Send later");
        oBtn.style.margin = "3px 6px";
        EventManager.Add(oBtn,'click',scheduleSendResource,false);

        var oOkBtn = document.getElementsByName('s1');
        oOkBtn[0].parentNode.appendChild(oBtn);
    }
    _log(3, "-> createSendResourceLinks()");
}

//*****************************************************************
// LINK CREATION: ATTACK
//*****************************************************************

function createAttackLinks() {
    _log(3, "-> createAttackLinks()");

    var xpathResult = xpath("id('lmid2')//input[@type='text']");
    if(xpathResult.snapshotLength < 1) {
        //alert('no send');
        _log(3, "We are not creating the 'Send later' button here.");
        return false;
    }

    // create the submit button
    var oBtn = document.createElement("input");
    oBtn.type = "button";
    oBtn.value = translate("Send later");
    oBtn.style.margin = "3px 6px";
    oBtn.id = 'sendLaterBtn';
    EventManager.Add(oBtn,'click',scheduleAttack,false);

    var oOkBtn = document.getElementsByName('s1'); // ok button
    oOkBtn[0].parentNode.appendChild(oBtn);

    createHeroBoxIfNotThere();

    return true;
    _log(3, "<- createAttackLinks()");
}

function createHeroBoxIfNotThere() {
    // create textbox for hero if it's not present
    xpathResult = xpath("id('lmid2')/form//img[contains(@src,'hero.gif')]");
    if(xpathResult.snapshotLength < 1) {  //no hero textbox - make one
        //alert('no hero box');
        xpathResult = xpath("//div[contains(@id,'lmid2')]/form/table/tbody/tr/td/table/tbody/tr[3]");
        if(xpathResult.snapshotLength > 0) {
            xpathResult.snapshotItem(0).lastChild.setAttribute("colspan", "3");

            var oTd1 = document.createElement('td');
            var oTd2 = document.createElement('td');
            var oTd3 = document.createElement('td');
            oTd1.innerHTML = '<img class="unit" src="img/un/u/hero.gif" title="" border="0" >';
            oTd2.innerHTML = '<input class="fm" type="Text" name="t11" value="" size="2" maxlength="6">';
            oTd3.innerHTML = '<b>(' +translate("away")+ ')</b>';
            oTd3.className = 'f8 c b';
            xpathResult.snapshotItem(0).appendChild(oTd1);
            xpathResult.snapshotItem(0).appendChild(oTd2);
            xpathResult.snapshotItem(0).appendChild(oTd3);

        }
    } else {
        //alert('hero box is there.');
    }
}

//*****************************************************************
// LINK CREATION: RESEARCH
//*****************************************************************

function createResearchLinks() {
    _log(3, "-> createResearchLinks()");
    var re = /.*build\.php\?id=([0-9]{1,2})/i;
    var sLocation = window.location.href;
    var iSiteId = getBuildingId();
    if(iSiteId == false) {
        return false;
    }

    //is this Academy, Smithy or armory?
    var buildingName = xpath("//h1/b");
    if(buildingName.snapshotLength < 1) {
        _log(2, "Building name not found.")
        return;
    }
    var re = new RegExp("(.*)\\s" + translate("level") + "\\s[0-9]{1,3}$", "i");
    buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
    switch(buildingName[1]) {
        case aLangBuildings[22]: //academy
            var linkTxt = translate("Research later");
            break;
        case aLangBuildings[12]:  //smithy
        case aLangBuildings[13]:  //armory
            var linkTxt = translate("Enhance later");
            break;
        default:
            _log(2, "No research links needed.");
            return;
    }

    //build links

    _log(2, "Adding research later links...");
    var Imgs = xpath("id('lmid2')/form/table[1]/tbody/tr/td[1]/table/tbody/tr[1]/td[1]/img");
    var Cells = xpath("//form/table[1]/tbody/tr/td[2]/div | //form/table[1]/tbody/tr/td[2]/a");
    for(var i = 0; (i < Imgs.snapshotLength) && (i < Cells.snapshotLength); i++) {
        var thisImg = Imgs.snapshotItem(i);
        var thisCell = Cells.snapshotItem(i);
        var iTroopId = thisImg.src.match(/([0-9]{1,2})\.gif/i);
        if(!iTroopId) {
            break;
        }
        iTroopId = iTroopId[1];

        if(iTroopId > 20) {
            iTroopId = iTroopId - 20;
        } else if(iTroopId > 10) {
            iTroopId = iTroopId - 10;
        }

        var oLink = document.createElement("a");
        oLink.id = "ttq_research_later" + i;
        oLink.className = "ttq_research_later";
        oLink.innerHTML = " " + linkTxt;
        oLink.title = linkTxt;
        oLink.href = "#";
        oLink.setAttribute("itask", 3);
        oLink.setAttribute("starget", iSiteId);
        oLink.setAttribute("soptions", iTroopId);
        //oLink.addEventListener('click',	, false);
        EventManager.Add(oLink,'click',displayTimerForm,false);
        thisCell.parentNode.appendChild(oLink);
    }

    _log(3, "<- createResearchLinks()");
}

//*****************************************************************
// LINK CREATION: TRAIN
//*****************************************************************

function createTrainLinks() {
    _log(3, "-> createTrainLinks()");

    var re = /.*build\.php\?id=([0-9]{1,2})/i;
    var iSiteId = getBuildingId();
    if(iSiteId == false) {
        return false;
    }

    //is this Barracks, Stables, Workshop, Residence or Palace?
    var buildingName = xpath("//h1/b");
    if(buildingName.snapshotLength < 1) {
        _log(2, "Building name not found.")
        return;
    }
    var re = new RegExp("(.*)\\s" + translate("level") + "\\s[0-9]{1,3}$", "i");
    buildingName = buildingName.snapshotItem(0).innerHTML.match(re);
    var bIsResidence = false;
    switch(buildingName[1]) {
        case aLangBuildings[19]: //barracks
        case aLangBuildings[20]: //stables
        case aLangBuildings[21]: //workshop
            var linkTxt = translate("Train later");
            break;
        case aLangBuildings[25]: //residence
        case aLangBuildings[26]: //palace
            re = /s=[0-9]+/i;
            if(re.test(location.href) ) {  //not on the first page of palace/residence
                return;
            }
            bIsResidence = true;
            var linkTxt = translate("Train later");
            break;
        default:
            _log(2, "No train links needed.");
            return;
    }

    if(bIsResidence) {
        _log(2, "Adding train later links for residence/palace...");
        var trainBtn = xpath("//p[2]/input[@type='image']");
        if(trainBtn.snapshotLength > 0) {  //we need to build only the button
            _log(2, "Adding train later links for residence/palace...");
            var oBtn = document.createElement("input");
            oBtn.type = "button";
            oBtn.value = linkTxt;
            oBtn.style.margin = "3px 6px";
            //oBtn.addEventListener("click", , false);
            EventManager.Add(oBtn,'click',scheduleTraining,false);
            trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);
        } else {  //we need to build the textbox
            //get the code. No code - no training
            var iCode = xpath("id('lmid2')/form//input[@name='z']");
            if(iCode.snapshotLength < 1) {
                _log(3, "No code available. No train later link available.");
                return false;
            }

            var oDiv = document.createElement("table");
            oDiv.innerHTML = '<tr><td><img class="unit" src="img/un/u/20.gif"></td><td>' +aLangTroops[iMyRace][9]+ '</td><td><input type="text" value="0" size="2" maxlength="4" name="t10"/></td></td><input type="button" value="' +linkTxt+ '" id="ttq_settler_submit_btn" style="margin:3px 6px;" /></td></tr>';
            var oParent = xpath("id('lmid2')/p[2]");
            if(oParent.snapshotLength < 1) {
                _log(3, "Don't know where to attach the button. Exiting function...");
                return;
            }
            _log(2, "Appending textbox and button...");
            oParent.snapshotItem(0).appendChild(oDiv);
            EventManager.Add($("ttq_settler_submit_btn"),'click',scheduleTraining,false);
        }

    } else {
        _log(2, "Adding train later links for barracks/stables/workshop...");
        var trainBtn = xpath("id('lmid2')/form/p/input[@type='image']");
        if(trainBtn.snapshotLength < 1) {  //button not found
            _log(2, "The Train button not found. Exiting function...");
            return false;
        }
        var oBtn = document.createElement("input");
        oBtn.type = "button";
        oBtn.value = linkTxt;
        oBtn.style.margin = "3px 6px";
        //.addEventListener("click", scheduleTraining, false);
        EventManager.Add(oBtn,'click',scheduleTraining,false);
        trainBtn.snapshotItem(0).parentNode.appendChild(oBtn);
    }

    _log(3, "<- createTrainLinks()");
}


// ************************************************************************************************************
// *********  LINK CALLBACKS: TIMER FORM DISPLAYS *************************************************************
// ************************************************************************************************************

//*****************************************************************
// LINK CALLBACK: SEND RESSOURCES
//*****************************************************************

function scheduleSendResource(e){
    _log(3,"-> scheduleSendResource()");
    // Get the current village of the User
    var hiddenId = getValueOfInput("id");

    var iVillageFromId = getActiveVillageId();
    _log(3,"Current Village =>" + iVillageFromId);
    // Get the targeted Village of Ressouces
    var villageTargetName =getValueOfInput("dname");
    // We get The Id of the Targeted village  with the Coordinate
    var iX = getValueOfInput("x");
    var iY = getValueOfInput("y");
    if(iX != '' && iY != '') {
        var iVillageTargetId = coordsXYToZ(iX, iY);
        _log(3,"Send Resource delayed to Village[Did] : " + iVillageTargetId);
    }else{
        if( villageTargetName==''){
            _log(3,"No target specified.");
            printMsg(translate("The sending ressource cannot be delayed, beaucause no target specified."), true);
            return false;
        }
    }
    _log(3,"Send Resource delayed to Village[Name] : " + villageTargetName);

    // Get the number of ressource and check if there is Ressources to be SENT
    var ir1 = getValueOfInput("r1");// Bois
    var ir2 = getValueOfInput("r2");// Terre
    var ir3 = getValueOfInput("r3");// Fer
    var ir4 = getValueOfInput("r4");//CÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©ale
    _log(3,"=> Bois : " + ir1);
    _log(3,"=> Terre : " + ir2);
    _log(3,"=> Fer : " + ir3);
    _log(3,"=> CÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©ale : " + ir4);
    if( ir1 =='' && ir2 == '' && ir3=='' && ir4===''){
        _log(3,"No quantity specified.");
        printMsg(translate("You must specify quantity of resource to send."),true);
        return false;
    }else{
        _log(3,"=> Bois : " + ir1);
        _log(3,"=> Terre : " + ir2);
        _log(3,"=> Fer : " + ir3);
        _log(3,"=> CÃƒÆ’Ã‚Â©rÃƒÆ’Ã‚Â©ale : " + ir4);
    }
    _log(3,"==> Ressource Sent " +"&"+iVillageFromId+"&dname="+villageTargetName+ "&r1="+ir1+"&r2="+ir2+"&r3="+ir3+"&r4="+ir4+"&dname="+villageTargetName+"&x="+iX+"&y="+iY + "&="+hiddenId);

    // Display the form to specifiy the delay of sending resources
    // Value 5 is the new SendResource Task5
    displayTimerForm(5, iVillageFromId,ir1+"_#"+ir2+"_#"+ir3+"_#"+ir4+"_#"+villageTargetName+"_#"+iX+"_#"+iY+"_#"+hiddenId);
    _log(3, "<- scheduleSendResource");
}


//*****************************************************************
// LINK CALLBACK: ATTACK
//*****************************************************************

function scheduleAttack(e) {
    _log(2, "-> scheduleAttack()");

    var iVillageId = window.location.href.match(/.*a2b\.php\?(newdid=[0-9]*&)?z=([0-9]*)/);  // target village
    if(iVillageId != null) {
        iVillageId = iVillageId[2];
    } else { //try to get the coordinates
        var sX = document.getElementsByName('x');
        var sY = document.getElementsByName('y');
        if (sX& sY) {
        _log(2,'Looking for village Link on a2b page + ' + sX[0] + sY[0]);
            iX = sX[0].value;
            iY = sY[0].value;
            
            if(iX != '' && iY != '') {
                iVillageId = coordsXYToZ(iX, iY);
            }
        } else { //TODO: send back page
            _log(2,'Looking for village Link on a2b page');
            var villink = xpath("//div[@id='lmid2']//a[contains(@href,'karte.php')]");
            if (villink.snapshotLength > 0) {
                _log(2,'found: ' + villink.snapshotItem(0).href);
                iVillageId = villink.snapshotItem(0).href.match(/karte\.php\?(d=[0-9]*&)?c=([a-z0-9]*)/);
                iVillageId = iVillageId[1].substr(2,6);
                _log(2,'found: ' + iVillageId);
            }
            //http://w*.travian.de/karte.php?d=397628&c=b6
        } 
    }

    if(iVillageId == null) {
        alert('Target village ID not found.');
        _log(2, "Target village ID not found.");
        printMsg(translate("The attack cannot be scheduled because no destination was specified."), true);
        return false;
    }

    var aTroops = new Array();
    var iAttackType = null;
    var sXpathExpr = "//div[@class='f10']/input[@type='radio']";
    var xpathRes = xpath(sXpathExpr);
    if(xpathRes.snapshotLength > 0) {
        //TODO: send back page. whats the attacktype? a, d are hidden inputs, id ==39. s1 is the button, s1.x and s1.y = seem to be clicking ccodrs on the button. d is important, and seems to stay constant i.e. can be saved and reused
        /* post of 1 keuli
        a	3
        d	1936325
        id	39
        s1	ok
        s1.x	28
        s1.y	6
        t[1]	1
        
        post of one settler
        a	3
        d	1911352
        id	39
        s1	ok
        s1.x	4
        s1.y	1
        t[10]	1
        */
        for (var i = 0; i < xpathRes.snapshotLength; i++) {
            if(xpathRes.snapshotItem(i).checked) 
                iAttackType = i+2;
        }
    } else {
        alert('The type of attack was not determined. Unable to schedule the attack.');
        _log(2, "The type of attack was not determined. Unable to schedule the attack.");
        return false;
    }

    if(iAttackType != null)
        aTroops[0] = iAttackType;
    else {
        alert('The type of attack was not determined. Unable to schedule the attack.');
        _log(2, "The type of attack was not determined. Unable to schedule the attack.");
        return false;
    }

    sXpathExpr = "//table[@class='p1']//table//td/input[@type='text']";
    //sXpathExpr = "//div[contains(@id,'lmid2')]/form//input[@type='text']";
    xpathRes = xpath(sXpathExpr);

    var bNoTroops = true;
    if(xpathRes.snapshotLength > 0) {
        for (var i = 0; i < xpathRes.snapshotLength; i++) {
            var aThisInput = xpathRes.snapshotItem(i);
            var iTroopId = aThisInput.name.substring(1);
            aTroops[iTroopId] = (aThisInput.value != '') ? aThisInput.value : 0;
            if(aThisInput.value) {
                bNoTroops = false;
            }  //at least 1 troop has to be sent
        }
    } else {
        alert("No info about troops found. Unable to schedule the attack.");
        _log(2, "No info about troops found. Unable to schedule the attack.");
        return false;
    }

    _log(3, "Troops:\n" + aTroops);

    if(bNoTroops) {
        _log(2, "No troops were selected. Unable to schedule the attack.");
        printMsg(translate("The attack cannot be scheduled because no troops were selected.") , true);
        return false;
    }
    
    var traveltime = a2bGetTravelTime();
    if (traveltime > 0) {
        displayTimerForm(2, iVillageId, aTroops, 0, traveltime*2);
    } else {
        displayTimerForm(2, iVillageId, aTroops);
    }


    _log(3, "<- scheduleAttack()");
}

//*****************************************************************
// LINK CALLBACK: TRAINING
//*****************************************************************

function scheduleTraining(e) {
    var Inputs = xpath("id('lmid2')//table//input[@type='text']");
    if(Inputs.snapshotLength < 1 ) {
        _log(3, "No textboxes with troop numbers found.");
        return false;
    }
    var buildingId = getBuildingId();
    var aTroops = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  //the first member  is the code
    var bNoTroops = true;
    for(var i = 0; i < Inputs.snapshotLength; i++) {
        var thisTroopType = parseInt(Inputs.snapshotItem(i).name.substring(1));
        aTroops[thisTroopType] = (Inputs.snapshotItem(i).value != '') ? Inputs.snapshotItem(i).value : 0;
        if(Inputs.snapshotItem(i).value && Inputs.snapshotItem(i).value != 0) {
            bNoTroops = false;
        }
    }

    if(bNoTroops) {
        _log(2, "No troops were selected. Unable to schedule the attack.");
        printMsg(translate("No troops were selected.") , true);
        return false;
    }

    //get the code
    var iCode = xpath("id('lmid2')/form//input[@name='z']");
    if(iCode.snapshotLength > 0) {
        aTroops[0] = iCode.snapshotItem(0).value;
    } else {
        _log(3, "No code available. Exiting.");
        return false;
    }

    //currently, only 1 kind of troop can be trained at once - null all elements except for the 0th one (code) and the first non-zero value
    var somethingFound = false;
    aTroops.forEach(function(element, index) {
        if(index > 0 && element > 0) {
            if(somethingFound) aTroops[index] = 0;
            somethingFound = true;
        }
    })

    // Good, we have 1 troop. Display the form
    displayTimerForm(4, buildingId, aTroops);

    return true;
}


/**
  * gets number of different training jobs currently programmed in a village
  */
function getNumberOfCurrentTraining(){
    var xpathString = "id('lmid2')/form/table[2]/tbody/tr/td/img";
    var object = xpath(xpathString);
    if(object !=null){
        return object.snapshotLength;
    }else{
        return 0;
    }

}

// *************************************************************************************************************************
// **********************   TIMER FORM *************************************************************************************
// *************************************************************************************************************************

/**
 * @param iTask: 0 - build, 1 - upgrade, 2 - attack,raid,support
 * @param target: sitedId for iTask = 0 or 1; iVillageId for siteId = 2
 * @param options: buildingId for iTask = 0; troops for attacks.
 * @param timestamp: if it is passed, suggest the time calculated from this (Caution! It is in seconds). -1 means no time given.
 *
 * This function functions both as a Listener for Build later and Upgrade later links,
 * and as regular function when arguments are supplied (in case of scheduling attacks and editing existing tasks).
 */
function displayTimerForm(iTask, target, options, timestamp, taskDuration, retry, retryinterval, repeat, lastexec, interval, rand, isDummy,villagedid) {
    _log(3, "-> displayTimerForm()");

    if (!villagedid)
        villagedid = getActiveVillageId();

    if ($('timerform_wrapper') != null)
        document.removeChild($('timerform_wrapper'));
    
    // For build and upgrade, we need to extract arguments from the event object
    if(iTask != 2 && iTask != 4  && target == null) {  //if params are supplied, we do not extract them from the event object target (link)
        var el = iTask.target;  // iTask really is the Event object!
        var iTask = parseInt(el.getAttribute("itask"));
        var target = el.getAttribute("starget");
        var options = el.getAttribute("soptions");
        var taskDuration = el.getAttribute("iduration");// Task Duration in sec
        //alert(taskDuration);
        if(iTask == undefined || target == undefined || options == undefined) {
            _log(2, "Missing arguments:\niTask="+iTask+"\ntarget="+target+"\noptions="+options);
            return false;
        }
    }

    var sTask = '';
    var sWhat = '';
    var sMoreInfo = ''
    if(iMyRace != 0 && iMyRace != 1 && iMyRace != 2)
        iMyRace = getOption("RACE", 0, "integer");

    switch(iTask) {
        case 0:  //build
        case 1:  //upgrade
            sWhat = aLangBuildings[options];
            sTask = aLangTasks[iTask];
            sMoreInfo = translate("at site no.") + " " +target;
            break;
        case 2:  //Attack, Raid, Support
            sWhat = '<span id="ttq_placename_' +target+ '">' +getPlaceName(target)+ '</span>';
            var iAttackType = parseInt(options[0]) + 18;
            sTask = aLangStrings[iAttackType];
            var bCatapultPresent = (options[8] > 0) ? true : false;
            var bOnlySpies = onlySpies(options);
            if(options[11] == undefined) options[11] = 0;  //if no heros are specified, set them to zero
            sMoreInfo = getTroopsInfo(options);
            options = options.join("_");
            break;
        case 3:  //Research
            sWhat = aLangTroops[iMyRace][options-1];
            sTask = aLangTasks[3];
            break;
        case 4:  //Training
            sWhat = translate("troops.");
            sTask = aLangTasks[4];

            sMoreInfo = getTroopsInfo(options);
            options = options.join("_");

            var numberOfTraining = getNumberOfCurrentTraining();
            setOption('currentNumberOfTraining',numberOfTraining);
            break;
        case 5: // Sending Resource Delayed Time
            sTask = aLangTasks[5];
            var infos = options.split("_");
            _log(3," options.split =>" + infos);
            _log(3,"Task Send Ressource => " + sTask);
            sWhat = translate(" ÃƒÆ’Ã‚Â  :") + "[" + infos[4].substring(1,infos[4].length);// Then 5  value of the options is the name of the destination village
            sWhat = sWhat + " " + infos[5].substring(1,infos[5].length) + " |" + infos[6].substring(1,infos[6].length) + "]";// Then 5  value of the options is the name of the destination village
            smoreInfo = translate("Delayed sending resource");
            break;
    }

    var oTimerForm = document.createElement("form");

    //Suggest the current time. Can be local or server time.
    var sTime, sTimeType;
    if(bUseServerTime && (!timestamp || timestamp == -1)) {  //suggest the server time
        sTimeType = "This is the server time.";
        sTime = getServerTime();
        sTime = (!sTime) ? "" : sTime;  //clear sTime if it is false
    } else if(bUseServerTime) {  //suggest the timestamp displayed as server time
        var iServerTimeOffset = getServerTimeOffset();
        timestamp = (parseInt(timestamp) + (iServerTimeOffset * 3600)) * 1000;
        var oServerDate = new Date(timestamp);
        sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());
    } else {  //suggest the local time
        sTimeType = "This is your local time.";

        var date;
        if(timestamp) {
            date = new Date(timestamp * 1000);
        } else {
            date = new Date();
        }
        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        //Convert small numbers to conventional format
        sTime = formatDate(yyyy, mm, dd, hh, min, sec);

    }

    // Allow target selection for catapults if this is not support and at least 1 cata is sent
    var sCataTargets = '';
    if(iTask == 2 && iAttackType > 20 && bCatapultPresent) {
        var sCataOptions = "";
        for(var j=1; j < aLangBuildings.length; j++) {
            sCataOptions += '<option value="' +j+ '">' +aLangBuildings[j]+ '</option>';
        }
        sCataTargets = '<select name="kata" size="" class="f8"><option value="99">' +translate("random")+ '</option>' + sCataOptions + '</select>';
        sCataTargets += '<select name="kata2" size="" class="f8"><option value="99">' +translate("random")+ '</option>' + sCataOptions + '</select>';
    }

    //Allow specifying the spying mode (only if there is nothing but spies being sent and if this is not a support)
    var sSpyMode = '';
    if(iTask == 2 && iAttackType > 20 && bOnlySpies) {
        sSpyMode = '<input type="radio" name="spy" value="1" checked>' +translate("Spy for resources and troops")+ ' <input type="radio" name="spy" value="2">' +translate("Spy for troops and defenses");
    }

    var sTaskDurationOption = '';
    if (taskDuration) {
        sTaskDurationOption = '<option value="' + taskDuration + '">Taskdauern ('+formatTimeSpan(taskDuration)+')</option>'
    }
    
    //__________________________________________________
    // GET INITAL EDIT AND SELECTS VALUES from input variables
    
    var focusRepeat = 0;
    var initialRepeat = 0;
    var initialLastexec = 0;
    var focusLastexec = 0;

    lastexec = lastexec?lastexec:0;
    retry = retry?retry:0;
    
    var date;
    if(lastexec>0) {
        date = new Date(lastexec * 1000);

        var dd = date.getDate();
        var mm = date.getMonth() + 1;
        var yyyy = date.getFullYear();
        var hh = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        initialLastexec = formatDate(yyyy, mm, dd, hh, min, sec);
        focusLastexec = initialLastexec;
        initialRepeat = '';
        focusRepeat = 0;
    } else {
        initialLastexec = '';
        focusLastexec = sTime;
        initialRepeat = repeat?repeat:0;
        focusRepeat = initialRepeat;
    }
    
    interval = interval?interval:0;
    var repeatIntervalSelected = ['','','',''];
    if (interval>0) {
        if (interval%86400 == 0) {
            repeatIntervalSelected[3] = 'selected="selected"';
            iDefaultRepeatInterval = interval/86400;
        } else { 
            if (interval%3600 == 0) {
                repeatIntervalSelected[2] = 'selected="selected"';
                iDefaultRepeatInterval = interval/3600;
            } else {
                if (interval%60 == 0) {
                    repeatIntervalSelected[1] = 'selected="selected"';
                    iDefaultRepeatInterval = interval/60;
                } else { 
                    repeatIntervalSelected[0] = 'selected="selected"';
                    iDefaultRepeatInterval = interval;
                }
            }
        }
    } else {
        repeatIntervalSelected[1] = 'selected="selected"';
    }
    
    retryinterval = retryinterval?retryinterval:0;
    var retryIntervalSelected = ['','','',''];
    if (retryinterval>0) {
        if (retryinterval%86400 == 0) {
            retryIntervalSelected[3] = 'selected="selected"';
            iDefaultRetryInterval = retryinterval/86400;
        } else { 
            if (retryinterval%3600 == 0) {
                retryIntervalSelected[2] = 'selected="selected"';
                iDefaultRetryInterval = retryinterval/3600;
            } else {
                if (retryinterval%60 == 0) {
                    retryIntervalSelected[1] = 'selected="selected"';
                    iDefaultRetryInterval = retryinterval/60;
                } else { 
                    retryIntervalSelected[0] = 'selected="selected"';
                    iDefaultRetryInterval = retryinterval;
                }
            }
        }
    } else {
        retryIntervalSelected[1] = 'selected="selected"';
    }
    
    rand = rand?rand:0;
    var randIntervalSelected = ['','','',''];
    if (rand>0) {
        if (rand%86400 == 0) {
            randIntervalSelected[3] = 'selected="selected"';
            iTaskRandomCoeff = rand/86400;
        } else { 
            if (rand%3600 == 0) {
                randIntervalSelected[2] = 'selected="selected"';
                iTaskRandomCoeff = rand/3600;
            } else {
                if (rand%60 == 0) {
                    randIntervalSelected[1] = 'selected="selected"';
                    iTaskRandomCoeff = rand/60;
                } else { 
                    randIntervalSelected[0] = 'selected="selected"';
                    iTaskRandomCoeff = rand;
                }
            }
        }
    } else {
        randIntervalSelected[0] = 'selected="selected"';
    }

    // ------------------------------
    // MAIN THINGS
    oTimerForm.id = "timerForm";
    oTimerForm.setAttribute("class", "handle");
    var sLinkClose = "<a href='#' onclick='document.body.removeChild(document.getElementById(\"timerform_wrapper\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

    oTimerForm.innerHTML = sLinkClose
    + '<input type="hidden" name="timerTask" value="' +iTask+ '" />'
    + '<input type="hidden" name="timerTarget" value="' +target+ '"/>'
    + '<input type="hidden" name="timerOptions" value="' +options+ '"/>'
    + '<input type="hidden" name="taskDuration" value="' +taskDuration +'"/>'
    + '<input type="hidden" name="villagedid" value="' +villagedid +'"/>'
    + '<p>'
    + '<span class="ttq_village_name">' + getVillageName(villagedid) + ":</span> "
    + sTask + ' ' + sWhat + ' (' + formatTimeSpan(taskDuration) + ')'
    + '<br><span style="font-size:75%; cursor:default;">' +sMoreInfo+ '</span>'
    + '</p>'
    + '<p>'
    + '<select name="startOrFinish">'
    + '<option value="start" selected="selected">start</option>'
    + (iTask==2 && taskDuration?'<option value="arrive">eintreffen</option>':'')
    + (taskDuration?'<option value="finish">beendet</option>':'')
    + '</select>'
    + '&nbsp;' + translate("at")
    + ' <input name="at" type="text" id="at" value="' +sTime+ '" onfocus="document.getElementById(\'after\').value = \'\'; this.value=\'' + sTime + '\';this.select();" title="' +sTimeType+ '" />'
    + '&nbsp;' + translate("or after")
    + '&nbsp;<input size ="4" name="after" type="text" id="after" onfocus="document.getElementById(\'at\').value = \'\';this.value=\'1\';this.select()" />' + '&nbsp;'
    +'<select name="timeUnit">'
    +'<option value="1">' + translate("seconds") +'</option>'
    +'<option value="60" selected="selected">' + translate("minutes") + '</option>'
    +'<option value="3600">' + translate("hours") + '</option>'
    +'<option value="86400">' + translate("days") + '</option>' + sTaskDurationOption
    +'</select></p>';

    // ------------------------------
    // REPEAT THINGS
    oTimerForm.innerHTML += '<p>' + translate("or repeat ")
    + ' <input size ="4" name="nbOfRepeat" type="text" id="nbOfRepeat" value = "' + initialRepeat 
    + '" onfocus="document.getElementById(\'lastExec\').value = \'\';document.getElementById(\'infiniteRepeat\').checked = false;this.value=\'' + focusRepeat + '\';this.select();"/> '+translate("times ")
    + " oder "
    + '<select name="lastExecShift" id="lastExecShift">'
    +'<option value="0" selected="selected">letzter Taskstart</option>'
    + (taskDuration?'<option value="' + taskDuration + '">letzte Taskbeendung</option>':'')
    + '</select>'
    + ' vor <input name="lastExec"  type="text" id="lastExec" value ="' + initialLastexec 
    + '" onfocus="document.getElementById(\'nbOfRepeat\').value = \'\'; document.getElementById(\'infiniteRepeat\').checked = false;this.value=\'' + focusLastexec + '\';this.select();"/>'
    + ' oder <input name="infiniteRepeat" id="infiniteRepeat" type="checkbox"'
    + ' onchange="document.getElementById(\'nbOfRepeat\').value = \'\'; document.getElementById(\'lastExec\').value = \'\';"'
    +'/> unendlich oft.'
    + '<br>'
    + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + translate("espaced by ")
    + '<input name="espacedTime"  type="text" id="espacedTime" value ="' + iDefaultRepeatInterval + '";" size ="4"/>'
    + '&nbsp;<select name="timeUnitRepeat" id ="timeUnitRepeat">'
    +'<option value="1" '+ repeatIntervalSelected[0] + '>' + translate("seconds") +'</option>'
    +'<option value="60" '+ repeatIntervalSelected[1] + '>' + translate("minutes") + '</option>'
    +'<option value="3600" '+ repeatIntervalSelected[2] + '>' + translate("hours") + '</option>'
    +'<option value="86400" '+ repeatIntervalSelected[3] + '>' + translate("days") + '</option>'
    + sTaskDurationOption
    + '</select>'
    + ' + zufällige' +  '<input name="randCoeff"  type="text" id="randCoeff" value ="' + iTaskRandomCoeff + '" size ="4" onfocus="this.select()"/>'
    + '&nbsp;<select name="randCoeffUnit" id = "randCoeffUnit">'
    +'<option value="1" '+ randIntervalSelected[0] + '>' + translate("seconds") +'</option>'
    +'<option value="60" '+ randIntervalSelected[1] + '>' + translate("minutes") + '</option>'
    +'<option value="3600" '+ randIntervalSelected[2] + '>' + translate("hours") + '</option>'
    +'<option value="86400" '+ randIntervalSelected[3] + '>' + translate("days") + '</option>'
    +sTaskDurationOption
    + '</select></p>';

    // RETRY THINGS
    oTimerForm.innerHTML += '<p>' + 'Bei Fehler versuche bis zu '
    + '<input name="retry"  type="text" id="retry" value ="' + retry + '" size ="4" onfocus="this.select()"/>'
    + ' mal neu, im Abstand von '
    + '<input name="retryInterval"  type="text" id="retryInterval" value ="' + iDefaultRetryInterval + '" size ="4" onfocus="this.select()"/>'
    + '&nbsp;<select name="retryIntervalUnit">'
    +'<option value="1" '+ retryIntervalSelected[0] + '>' + translate("seconds") +'</option>'
    +'<option value="60" '+ retryIntervalSelected[1] + '>' + translate("minutes") + '</option>'
    +'<option value="3600" '+ retryIntervalSelected[2] + '>' + translate("hours") + '</option>'
    +'<option value="86400" '+ retryIntervalSelected[3] + '>' + translate("days") + '</option>'
    +sTaskDurationOption
    +'<option value="-1">Nach letztem Task dieser Art</option>'
    + '</p>';

    oTimerForm.innerHTML += '<hr>'

    if(sCataTargets != '') {
        oTimerForm.innerHTML += '<p>' + translate("Catapults will aim at") + ': ' +sCataTargets+ ' </p>';
    }

    if(sSpyMode != '') {
        oTimerForm.innerHTML += '<p>' +sSpyMode+ '</p>';
    }

    // TIME OCCUPANcY
    if (iTask == 2) {
        oTimerForm.innerHTML += '<span id="occspan" style="cursor:help;" title="If repeated infinitely, this gives the number of times the sent troops have to be available in order to execute without shortcomings.">Occupancy: ' + '<span id="occ">1</span></span><br>' ;
        oTimerForm.innerHTML += '<span id="occabsspan" style="display:none;">Absolute: ' + '<span id="occabs"></span></span><br>' ;
        oTimerForm.innerHTML += '<span id="pipespan">Pipe width: ' + '<span id="pipe">' + getTroopsCarry(options.split('_'),1) + '</span></span><br>' ;
    }

    var oSubmitBtn = document.createElement("input");
    oSubmitBtn.name = "submitBtn";
    oSubmitBtn.value = "OK";
    oSubmitBtn.type = "button";
    EventManager.Add(oSubmitBtn,'click',function() { handleTimerForm(this.form,false) },true);
    //.addEventListener('click', , true);
    oTimerForm.appendChild(oSubmitBtn);
    
    var oSubmitBtn = document.createElement("input");
    oSubmitBtn.name = "dummyBtn";
    oSubmitBtn.value = "Dummy";
    oSubmitBtn.type = "button";
    EventManager.Add(oSubmitBtn,'click',function() { handleTimerForm(this.form,true)},true);
    oTimerForm.appendChild(oSubmitBtn);

    var oWrapper = document.createElement("div");
    oWrapper.id = "timerform_wrapper";
    oWrapper.appendChild(oTimerForm);

    //position
    var formCoords = getOption("FORM_POSITION", "215px_215px");
    formCoords = formCoords.split("_");
    // reset if invalid
    if (formCoords[0].replace(/px/,'') < 0 || formCoords[1].replace(/px/,'')<0) {
        formCoords[0] = formCoords[1] = "215px";
        setOption("FORM_POSITION", formCoords.join('_'));
    }
    oWrapper.style.top = formCoords[0];
    oWrapper.style.left = formCoords[1];

    document.body.appendChild(oWrapper);
    makeDraggable($("timerForm"));    

    if (iTask == 2) {
        EventManager.Add('nbOfRepeat','keyup',changedOccupancy,true);
        EventManager.Add('nbOfRepeat','select',changedOccupancy,true);
        EventManager.Add('lastExecShift','change',changedOccupancy,true);
        EventManager.Add('lastExec','keyup',changedOccupancy,true);
        EventManager.Add('lastExec','select',changedOccupancy,true);
        EventManager.Add('espacedTime','keyup',changedOccupancy,true);
        EventManager.Add('timeUnitRepeat','change',changedOccupancy,true);
        EventManager.Add('randCoeff','keyup',changedOccupancy,true);
        EventManager.Add('randCoeffUnit','change',changedOccupancy,true);
        EventManager.Add('infiniteRepeat','change',changedOccupancy,true);
        
        // initialize
        changedOccupancy(null,$('timerForm').wrappedJSObject);
    }

    _log(3, "<- displayTimerForm()");

    return false;
}

//************************
// OCCUPANCY
//************************

function getOccupancy(duration,intervalSecs,randSecs) {
    return duration/(parseInt(intervalSecs) + parseInt(randSecs)/2);
}

function changedOccupancy(evt,oForm) {
    if (!oForm)
        oForm = this.form;
    
    var occ = $('occ');

    var duration = oForm.taskDuration.value;
    var nrepeat = oForm.nbOfRepeat.value;
    var interval = oForm.espacedTime.value;
    var intervalunit = oForm.timeUnitRepeat.value;
    var lastexec = oForm.lastExec.value;
    var shift = oForm.lastExecShift.value;
    var randcoeff = oForm.randCoeff.value;
    var randunit = oForm.randCoeffUnit.value;
    var retry = oForm.retry.value;
    var retryInterval = oForm.retryInterval.value;
    var retryIntervalUnit = oForm.retryIntervalUnit.value;
    var infiniteRepeat = oForm.infiniteRepeat.checked;

    var options = oForm.timerOptions.value;
    options = options.split('_');

    //alert(options);

    if ( lastexec != '' || nrepeat != 0 || infiniteRepeat ){
        
        var occup = getOccupancy(duration, interval*intervalunit,  randcoeff*randunit);

        occ.textContent = Math.round(occup*100)/100;

        var pipew = getTroopsCarry(options,occup);
        var pipewrel = Math.round(100*pipew/(duration/3600))/100;
        var pipewrelavg = Math.round(pipewrel/4*100)/100;

        $('occabs').textContent = getTroopsInfo(options,occup);
        $('occabsspan').setAttribute('style','display:true;');
        $('pipe').textContent = pipew + ' [' + pipewrel + '/h | ' + pipewrelavg +'/h/crop]';
    }
    else {
        occ.textContent = '1';
        $('occabsspan').setAttribute('style','display:none;');
    }

}

//*****************************************************************
// CALLBACK: TIMER FORM
//*****************************************************************

function handleTimerForm(oForm,addAsDummy) {
    _log(3, "-> handleTimerForm()");
    // At a specified Time
    var at = oForm.at.value;

    // task start options
    var startOrFinish = oForm.startOrFinish.value; // start, arrive, finish. arrive only if attack, arrive and finish only if duration
    var duration = oForm.taskDuration.value;
    var shiftBack = 0;
    var iTaskTime;
    if (duration != '') {
        if (startOrFinish == 'arrive')
            shiftBack = duration/2;
        else if (startOrFinish == 'finish')
            shiftBack = duration;
    }

    // calculate first execution time
    if(at == '') {
        var after = oForm.after.value;
        var timeUnit = oForm.timeUnit.value;
        after = after*timeUnit;  // convert to seconds
        var oDate = new Date();  // current GMT date. TODO: server time
        iTaskTime = parseInt(oDate.getTime()/1000 + after);
    } else {
        var oTaskDate = getDateFromString(at);

        // Time zone conversions
        if(bUseServerTime) {  //server time

            var iServerTimeOffset = getServerTimeOffset();
            if(iServerTimeOffset == false) {  //problem. do nothing.
                _log(2, "We could not schedule this task, because we were unable to determine server's timezone.");
                printMsg("We could not schedule this task, because we were unable to determine server's timezone.", true);
                return false;
            }

            var newtimestamp = oTaskDate.getTime() - (oTaskDate.getTimezoneOffset() * 60000);  //server time in server's timezone
            newtimestamp = newtimestamp - (iServerTimeOffset * 3600000);  //get the UTC server time for this task
            iTaskTime = parseInt( newtimestamp/1000 );  //convert to seconds

        } else {  //local time

            iTaskTime = parseInt(oTaskDate.getTime()/1000);

        }
    }

    // adjust for task start options
    iTaskTime -= shiftBack;

    var timeDiff = iTaskTime - (new Date().getTime()/1000);
    if (timeDiff < -30) // 30 seconds in the past
        alert('Task should have started ' + (formatTimeSpan(-timeDiff)) + ' ago');

    document.body.removeChild($('timerform_wrapper'));
    _log(2, "Task will be scheduled for " + iTaskTime);  // The stored time is the absolute Unix GMT time.

    if(oForm.kata) { //store catapults targets
        oForm.timerOptions.value += "_" +oForm.kata.value;
    }

    if(oForm.kata2) { //store catapults targets
        oForm.timerOptions.value += "_" +oForm.kata2.value;
    }

    if(oForm.spy) {  //spying mission
        for(var i = 0; i < oForm.spy.length; i++) {
            if(oForm.spy[i].checked) {
                oForm.timerOptions.value += "_" + oForm.spy[i].value;
            }
        }
    }

    //  select.lastExecShift .. subtract this amount from last start time
    //  input.lastExec .. time in some format after which no exec anymore
    //  input.randCoeff .. randomize by adding random amount of select.randCoeffUnit

    var villagedid = oForm.villagedid.value;

    var dorepeat = false;
    var nrepeat = oForm.nbOfRepeat.value;
    var interval = oForm.espacedTime.value;
    var intervalunit = oForm.timeUnitRepeat.value;
    var lastexec = oForm.lastExec.value;
    var shift = oForm.lastExecShift.value;
    var randcoeff = oForm.randCoeff.value;
    var randunit = oForm.randCoeffUnit.value;
    var retry = oForm.retry.value;
    var retryInterval = oForm.retryInterval.value;
    var retryIntervalUnit = oForm.retryIntervalUnit.value;
    var infiniteRepeat = oForm.infiniteRepeat.checked;
    if (infiniteRepeat)
        nrepeat = -1;

    // secure them edits
    interval = interval == ''?0:interval;
    randcoeff = randcoeff == ''?0:randcoeff;
    nrepeat = nrepeat==''?0:nrepeat;
    retry = retry==''?0:retry;
    retryInterval = retryInterval==''?0:retryInterval;

    if (retryIntervalUnit == -1) // push to end
        retryInterval = -1;
    else
        retryInterval *= retryIntervalUnit; // convert to seconds

    var s = "nrepeat=" + nrepeat + ",interval=" + interval + ",shift=" + shift + ", lastexec = " + lastexec + ", randcoeff = " + randcoeff + ", randunit = " + randunit + ", retry = " + retry + ", retryinterval = " + retryInterval + ", retryIntervalUnit = " + retryIntervalUnit;
    //alert(s);

    dorepeat = (nrepeat != 0 || lastexec != '') && interval > 0;

    var explanation = '';
    var nbScheduled = 0;
    if (dorepeat){
        _log(3,"=> Repeat Task " + s);
        
        var iLastExec = 0;
        var timeRepeatInterval = interval*intervalunit;  // convert to seconds
        var randInterval = randcoeff*randunit;
        
        if (lastexec != '') {

            iLastExec = getDateFromString(lastexec).getTime()/1000 - shift;
            sLastExec = formatDateTimeRelative(iLastExec);
            
            explanation = 'Last start before: ' + sLastExec
                    + '<br>Interval                     : ' +formatTimeSpan(timeRepeatInterval)
                    + '<br>Random                       : + ' + formatTimeSpan(randInterval);

        } else {
            explanation = 'Task will be repeated: ' + nrepeat + ' times'
                    + '<br>Interval                     : ' +formatTimeSpan(timeRepeatInterval)
                    + '<br>Random                       : +' + formatTimeSpan(randInterval);
        }
 
        nbScheduled = setTask(oForm.timerTask.value, iTaskTime, oForm.timerTarget.value, oForm.timerOptions.value, villagedid, duration, retry, retryInterval, false, false,nrepeat,iLastExec,timeRepeatInterval,randInterval,addAsDummy);
         
        refreshTaskList();

        printMsg('Scheduled ' + (nbScheduled?1:0) + ' tasks.<br>First run: ' + formatDateTimeRelative(iTaskTime)+ '<br>' + explanation);

    } else{
        if (setTask(oForm.timerTask.value, iTaskTime, oForm.timerTarget.value, oForm.timerOptions.value, villagedid ,duration, retry, retryInterval,true,true,false,false,false,false,addAsDummy))
            nbScheduled++;
    }

    _log(3, "<- handleTimerForm()");
    return true;
}


// ************************************************************************************************************
// *********  TASK MANAGEMENT: ADD, DELETE, DISPLAY..  **************************************************************************
// ************************************************************************************************************

// *******************************************
// *********  aTask utilities  
// *******************************************
function aTaskIsRepeat(aTask) {
    return aTask[DEF_ATASK_REPEAT_NUM] != 0 || aTask[DEF_ATASK_REPEAT_LASTEXEC] != '';
}

function aTaskIsInfRepeat(aTask) {
    return aTask[DEF_ATASK_REPEAT_NUM] == -1;
}

function aTaskIsDummy(aTask) {
    return aTask[DEF_ATASK_ISDUMMY] == 'true';
}

function taskArray2String(aTask) {
    return aTask.join(',');
}

function aTask2String(aTask) {
    return task2String(aTask[DEF_ATASK_TYPE],aTask[DEF_ATASK_TIME],aTask[DEF_ATASK_TARGET],aTask[DEF_ATASK_OPTIONS],aTask[DEF_ATASK_VILLAGEID],aTask[DEF_ATASK_DURATION],aTask[DEF_ATASK_RETRY],aTask[DEF_ATASK_RETRYINTERVAL],aTask[DEF_ATASK_REPEAT_NUM],aTask[DEF_ATASK_REPEAT_LASTEXEC],aTask[DEF_ATASK_REPEAT_INTERVAL],aTask[DEF_ATASK_REPEAT_RANDADD],aTask[DEF_ATASK_ISDUMMY]);
}

function task2String(iTask,iWhen,iTarget,saOptions,did,duration,retry,retryinterval,repeatNum, repeatLastExec, repeatInterval, repeatRand, isDummy) {
    var s = "\niTask: " + iTask +
            "\niWhen: " + formatDateTimeRelative(iWhen) + 
            "\niTarget:" + iTarget + 
            '\nsaOptions:' + saOptions + 
            '\ndid:' + did + 
            '\nduration:' + formatTimeSpan(duration) + 
            '\nretry:' + retry + 
            '\nretryInterval:' + formatTimeSpan(retryinterval) + 
            '\nrepeatNum:' + repeatNum + 
            "\nrepeatLastExec:" + formatDateTimeRelative(repeatLastExec) +
            "\nrepeatInterval:" + formatTimeSpan(repeatInterval) + 
            "\nrepeatRand:" + formatTimeSpan(repeatRand) + 
            "\nisDummy:" + isDummy;
            
            return s;
}

function string2TaskArray(taskString) {
    return taskString.split(',');
}


function getMoreTaskInfo(aTask) {

    var retryinfo = '';
    if (aTask[DEF_ATASK_RETRY]>0) {
        if (aTask[DEF_ATASK_RETRYINTERVAL] == -1)
            retryinfo = ", retry " + aTask[DEF_ATASK_RETRY] + " times after last task of this type.";
        else
            retryinfo = ", retry " + aTask[DEF_ATASK_RETRY] + " [" + formatTimeSpan(aTask[DEF_ATASK_RETRYINTERVAL]) + "]";
    }

    return "takes " + formatTimeSpan(aTask[DEF_ATASK_DURATION]) + retryinfo;

}

// *******************************************
// *********  Task setting  
// *******************************************
function setATask(aTask, bPrint, bRefresh) {
    return setTask(aTask[DEF_ATASK_TYPE], aTask[DEF_ATASK_TIME], aTask[DEF_ATASK_TARGET], aTask[DEF_ATASK_OPTIONS], aTask[DEF_ATASK_VILLAGEID], aTask[DEF_ATASK_DURATION], aTask[DEF_ATASK_RETRY], aTask[DEF_ATASK_RETRYINTERVAL], bPrint, bRefresh, aTask[DEF_ATASK_REPEAT_NUM], aTask[DEF_ATASK_REPEAT_LASTEXEC], aTask[DEF_ATASK_REPEAT_INTERVAL],aTask[DEF_ATASK_REPEAT_RANDADD],aTask[DEF_ATASK_ISDUMMY],aTask[DEF_ATASK_ISPAUSED]);
}



// setTask(iTask, iWhen, target, options, taskDuration, retry, retryInterval, print)
/**
  * Schedules the specified task. Inserted in time sorted manner
  * @param iTask: name of the task (0-build, 1-upgrade, 2-attack, 3-research), 5 send resource
  * @param iWhen: date when the task is to be triggered
  * @param target: iBuildingId, or iVillageId
  * @param options: what to build, what units to send attacking (first member specifies the type of attack: 0-support, 1-normal attack, 2-raid).
  * @param taskDuration : Duration of The Task (optional == 0)
  * @param retry  : number of retries (optional == 0)
  * @param retryInterval : number of seconds between retries (optional == 0)
  * @param print : display confirmation. true if null (optional == true)
  * @param refresh : refresh task list in the process? (optional == true)
  */
function setTask(iTask, iWhen, iTarget, saOptions, iVillageId, taskDuration, retry, retryInterval, bPrint, bRefresh, repeatNum, repeatLastExec, repeatInterval, repeatRand, bIsDummy, bIsPaused) {

    _log(3, "-> setTask(): " + task2String(iTask, iWhen, iTarget, saOptions, iVillageId, taskDuration, retry, retryInterval,repeatNum, repeatLastExec, repeatInterval, repeatRand,bIsDummy) + "\nbPrint=" + bPrint + ", bRefresh = " + bRefresh);

    if(bLocked) {
        _log(2, "TTQ_TASKS is locked. We are not able to write it.");
        return false;
    }

    bLocked = true;

    //TODO: write it to array not string
   //var aNewTask = new Array(11);

    //aNewTask[DEF_ATASK_TYPE] = iTask;
    
    // generate new task string
    var saNewTask =  iTask + ',' + iWhen + ',' + iTarget + ',' + saOptions;

    if(iVillageId) {
        saNewTask += ',' + iVillageId;
    } else {
        saNewTask += ',null';
    }

    if(taskDuration && taskDuration>0){
        saNewTask+=',' + taskDuration;
    } else {
        saNewTask+=',';
    }

    if(retry && retry > 0){
        saNewTask+=',' + retry + ',' + retryInterval;
    } else {
        saNewTask+=',,';
    }
    // repeatNum, repeatLastExec, repeatInterval, repeatRand
    if (repeatNum && repeatNum != 0) {
        saNewTask += ',' + repeatNum;
    } else {
        saNewTask += ',';
    }
    
    if (repeatLastExec && repeatLastExec > 0) {
        if (repeatLastExec <= iWhen)
            return false;
        saNewTask += ',' + repeatLastExec;
    } else {
        saNewTask += ',';
    }
    
    if(repeatInterval && repeatInterval > 0){
        saNewTask+=',' + repeatInterval + ',' + repeatRand;
    } else {
        saNewTask+=',,';
    }
   
    if (bIsDummy != undefined)
        saNewTask += ',' + bIsDummy;
    else
        saNewTask += ',';
    
    if (bIsPaused != undefined)    
        saNewTask += ',' + bIsPaused; // paused
    else
        saNewTask += ',' + 'false'; // paused
        
        
    _log(3,'after conversion:' + aTask2String(saNewTask.split(',')));
  
    var data = readData(DEF_TTQ_TASKS);
    var oldValue = (data == null || data.length <= 1) ? '' : data + "|";

    var newValue = oldValue + saNewTask;

   // sort them once by start time --------------------------------
   var aTasks = newValue.split('|');
   var s = "";
   for (var i=0; i<aTasks.length;i++){
       s+="|" + aTasks[i];
   }
   //GM_log("aTasks = " + s);

   var aTasksSorted = [];
   for(var i = 0; i < aTasks.length; i++) {
        var aTaski = aTasks[i];
        aTaski = aTaski.split(',');
        var time = aTaski[DEF_ATASK_TIME];
        //GM_log(i + "@" + time+ ":" + aTaski);
        aTasksSorted.push([aTaski[DEF_ATASK_TIME], aTaski]);
   }

   aTasksSorted.sort(sortArray);

   //get tasks out
   var s = "";
   var aTasksSortedFinal = [];
   for (var i=0; i<aTasksSorted.length;i++){
        var aTaski = aTasksSorted[i][1];
        var time = aTaski[DEF_ATASK_TIME];
        //GM_log(i + "@" + time+ ":" + aTaski);
        aTasksSortedFinal.push(aTaski.join(','));
   }
   aTasksSortedFinal = aTasksSortedFinal.join('|');

   //GM_log(aTasksSortedFinal);

   newValue = aTasksSortedFinal;
//
//    var aTasks = oldValue.split('|');
//    var insertAt = 0;
//    var aTasksi;
//
//    for(var i=0; i<aTasks.length;i++) {
//        aTasksi = aTasks[i].split(',');
//        if (iWhen <= aTasksi[DEF_ATASK_TIME]) {
//            insertAt = i;
//            alert("insertat="+i);
//            break;
//        }
//    }
//
//    var before = aTasks.slice(0,insertAt);
//    var after = aTasks.slice(insertAt);
//
//    var aTaskNew = before.concat(aTask,after);
//
//    var s = "";
//    newValue = aTaskNew.join('|');
//    if (newValue.lastIndexOf('|') == newValue.length - 1)
//        newValue = newValue.substr(0, newValue.length -1);
//
//    alert(newValue);

    _log(4, "Writing data: "+newValue);
    if(!writeData(DEF_TTQ_TASKS, newValue)) {        
        if (!bPrint || bPrint)
            printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(iVillageId)+ "</span>" +translate("We can't schedule this task right now."), true);
        bLocked = false;
        return false;
    }
    _log(3," Village for the task " + getVillageName(iVillageId));
    bLocked = false;

    var aTasks = newValue.split("|");

    if (bRefresh==undefined || bRefresh)
        refreshTaskList(aTasks);

    if (bPrint==undefined || bPrint) {
        // *************************************
        // Generate The Confirmation Message
        var sTaskSubject = "";
        var sTask = "";
        switch(iTask) {
            case "0":  //build
            case "1":  //upgrade
                sTaskSubject = aLangBuildings[saOptions];
                sTask = aLangTasks[iTask];
                break;
            case "2":  //attack
                sTaskSubject = '<span id="ttq_placename_' +iTarget+ '">' +getPlaceName(iTarget)+ '</span>';
                var aTroops = saOptions.split("_");
                if(onlySpies(aTroops)) {
                    sTask = translate("Spy");
                } else {
                    var iIndex = parseInt(aTroops[0]) + 18;
                    if(iIndex == 20) sTask = translate('Support');
                    if(iIndex == 21) sTask = translate('Attack');
                    if(iIndex == 22) sTask = translate('Raid');
                }
                break;
            case "3":  //research
                sTaskSubject = aLangTroops[iMyRace][saOptions-1];
                sTask = aLangTasks[3];
                break;
            case "4":  //training
                sTaskSubject = getTroopsInfo(saOptions.split("_"));
                sTask = translate('Train');
                break;
            case "5": //send Ressource
                sTask = aLangTasks[5];
                //var listOfParams= options.split("_#");
                sTaskSubject = "";
                sTaskMoreInfo = "sTaskMoreInfo in Comment";
                break;
            default:
                break;
        }
        printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(iVillageId)+ '</span>'
            + translate("The task was scheduled.") + '<br/><span style="font: italic 80%;">' +sTask+ ' ' +sTaskSubject+ '</span>');

    }
    
    if(!oIntervalReference) {
        oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);  //start checking if there is any task to trigger
        _log(2, "Started checking for the set tasks...");
    }

    _log(3, "<- setTask()");
    return true;
}

function deleteTask(e) {
    _log(2, "-> deleteTask(): " + e);

    var iTaskIndex;
    if (isInt(e))
        iTaskIndex  = e;
    else
        iTaskIndex = parseInt(e.target.parentNode.id.split('_')[1]); // delete_x

    _log(2, "Deleting task "+iTaskIndex);

    if(bLocked) {
        _log(2, "The TTQ_TASKS data is locked. We are not able to write it.");
        return false;
    }

    bLocked = true;
    var data = readData(DEF_TTQ_TASKS);
    if(data == '') {
        _log(2, "No tasks are set. ");
        bLocked = false;
        return false;  // no tasks are set
    }

    // delete from data store
    var aTasks = data.split("|");
    aTasks.splice(iTaskIndex, 1);  //delete this task
    data = aTasks.join("|");
    writeData(DEF_TTQ_TASKS, data);
    
    // remove from task list and update list
    var taskRows = xpath("id('ttq_tasklist')/div[contains(@id,'ttq_task_row_')]");
    //GM_log(taskRows.snapshotLength);
    if (taskRows.snapshotLength>0) {
        var taskRowDiv;
        _log(3,'length=' +taskRows.snapshotLength);
        for (var i=iTaskIndex;i<taskRows.snapshotLength;i++) {
            taskRowDiv = $('ttq_task_row_' + i);
            if (i==iTaskIndex && taskRowDiv) {
                $('ttq_tasklist').removeChild(taskRowDiv);
            } else if (i>iTaskIndex && taskRowDiv) {
                taskRowDiv.id = 'ttq_task_row_' + (i-1);
                $('ttq_tasktime_' + i).id = 'ttq_tasktime_' + (i - 1);
                $('delete_' + i).id = 'delete_' + (i - 1);
            }
        }
    }

   
    //if (taskRows.snapshotLength == 1) {        
        // remove condition, refresh to update occupancies
        refreshTaskList(null);
    //}

    bLocked = false;

    _log(2, "<- deleteTask()");
    return false;  // we return false to override default action on the link
}

function deleteAllTask(e) {
    _log(3, "-> deleteAllTask()");
    
    if (!confirm('Really delete all tasks?'))
        return;
    
    _log(2, "Deleting All task ");

    if(bLocked) {
        _log(3, "The TTQ_TASKS cookie is locked. We are not able to write it.");
        return false;
    }

    bLocked = true;
    var data = readData(DEF_TTQ_TASKS);
    if(data == '') {
        _log(2, "No tasks are set. ");
        bLocked = false;
        return false;  // no tasks are set
    }

    // Delete the  cookie
    writeData(DEF_TTQ_TASKS, '');

    bLocked = false;

    refreshTaskList(null);

    return false;  // we return false to override default action on the link

    _log(3, "<- deleteTask()");
}


// ************************************************************************************************************
// *********  TASK LIST DISPLAY     **************************************************************************
// ************************************************************************************************************


/**
  refreshTaskList(aTasks) displays aTasks
  refreshTaskList(null)  removes tasklist
  refreshTaskList()      loads tasklist with current tasks
 **/
function refreshTaskList(aTasks) {
    if (!getOption(DEF_OPTION_TASKLIST_SHOW,true))
        return;

    

    _log(3, "-> refreshTaskList(): " + aTasks);

    if (aTasks == undefined)
        _log(3, "Reading tasks from data.");
        var data = readData(DEF_TTQ_TASKS);
        if(data != '') {
            aTasks = data.split("|");
    }

    // Remove old task list
    var oOldTaskList = $("ttq_tasklist");
    if(oOldTaskList) {
        document.body.removeChild(oOldTaskList)
    }

    //if there are no tasks set, return
    if(!aTasks || aTasks.length < 1) {
        return;
    }
    var sTime = "";
    var oDate;

    //Create new tasklist
    var oTaskList = document.createElement('div');

    oTaskList.id = "ttq_tasklist";
    oTaskList.innerHTML = "<div id='ttq_draghandle' class='handle ttq_draghandle' >"+translate("Scheduled Tasks")+"</div>";

    //position the list
    var listCoords = getOption("LIST_POSITION", "0px_687px");
    listCoords = listCoords.split("_");
    oTaskList.style.top = listCoords[0];
    oTaskList.style.left = listCoords[1];
    // Append the OTaskList  to the Document
    document.body.appendChild(oTaskList);
    makeDraggable($('ttq_draghandle'));

     // real minimitzed
    var realminimize = getOption('TASKS_REALMINIMIZED',false);
    var realminimizespan = document.createElement('span');
    if (!realminimize)
        realminimizespan.innerHTML = '&nbsp;&nbsp;-';
    else
        realminimizespan.innerHTML = '&nbsp;&nbsp;+';
        
    realminimizespan.setAttribute('style','cursor:pointer;');      
    EventManager.Add(realminimizespan,'click',function(e) { setOption('TASKS_REALMINIMIZED',!getOption('TASKS_REALMINIMIZED',false)); refreshTaskList(); }, false);        
    $('ttq_draghandle').appendChild(realminimizespan);
    
    if (realminimize)
        return;

    //Sort links
    var currentSort = getOption(DEF_OPTION_TASKLIST_SORT, 1, "integer");
    var sortLinkWrapper = document.createElement("div");
    sortLinkWrapper.innerHTML += "<span class='ttq_sort_header'>&raquo; " +translate("Sort by:")+ "</span> ";
    var sortKeys = [1,4,0,2];  //order is important
    var sortLabels = ["type ", "time ", "target ", "option ", "village "]
    sortKeys.forEach(function(el) {
        var sortLink = document.createElement("a");
        sortLink.innerHTML = translate(sortLabels[el]);
        sortLink.className = (currentSort == el) ? "ttq_sortlink_active" : "ttq_sortlink";
        sortLink.href = "#";
        EventManager.Add(sortLink,'click',function(ev) {
            orderList(el, "ttq_task_row");
            setOption(DEF_OPTION_TASKLIST_SORT, el);
            var siblings = ev.target.parentNode.childNodes;
            for(var j = 0; j < siblings.length; j++) {
                if(siblings[j].nodeName == "A") {
                    siblings[j].className = "ttq_sortlink";
                }
            }
            ev.target.className = "ttq_sortlink_active";
        }, false);
        sortLinkWrapper.appendChild(sortLink);
        oTaskList.appendChild(sortLinkWrapper);
        sortLink = null;
    }
    );

    //get the server time offset once
    if(bUseServerTime) {
        var iServerTimeOffset = getServerTimeOffset();
    }

    var aTroopsOccup;
    var aTotalTroopsOccup = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
    var aVillageIds = new Array();
    var aVillageTroopsOccup = new Array();
    var bIsRepeatTask = false;
    for(var i = 0; i < aTasks.length; i++) {
        var aThisTask = aTasks[i].split(",");
        _log(3, "RefreshTaskList=>" + aThisTask);

        bIsRepeatTask = aTaskIsRepeat(aThisTask);

        //format the task time properly
        if(bUseServerTime) {
            //create timestamp for the tasktime offset to server time
            var iTaskServerTimestamp = ( parseInt(aThisTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
            //create Date obj with this timestamp
            oDate = new Date(iTaskServerTimestamp);
            //display the date without any further offsets
            //TODO: custom localized date format: Wednesday, November 14, 2007 20:49:09
            sTime = oDate.toGMTString();
            sTime = sTime.substring(0, sTime.length - 4);
            sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_tasktime_" +i+ "' title='This is the server time.'>" + sTime + "</span>";
        } else {  //local time

            oDate = new Date( parseInt(aThisTask[1]) * 1000 );
            var oNow = new Date();

            //var s = oDate.toLocaleString();
            var s = padInt(oDate.getHours()) + ":" + padInt(oDate.getMinutes()) + ":" + padInt(oDate.getSeconds());
            if (oDate.getDate() != oNow.getDate()) {
                if (oDate.getDate() - 1 == oNow.getDate()) // TODO: doesnt work on month changes
                    s = translate("Tomorrow")+ ", " + s;
                else
                    s = oDate.toLocaleString();
            }

            sTime = "<span style='color:black; cursor:pointer;' id='ttq_tasktime_" +i+ "' title='This is your local time.'>" + s + "</span>";
        }

        var oDeleteLink = document.createElement('a');
        oDeleteLink.innerHTML = "<img src='" +sDeleteBtn+ "' alt='X'/>";
        oDeleteLink.id = 'delete_' + i;
        oDeleteLink.href = "#";
        oDeleteLink.title = translate("Delete");        
        EventManager.Add(oDeleteLink,'click',deleteTask, false);
        
        var oPauseLink = document.createElement('a');        
        oPauseLink.setAttribute('tid',i);
        oPauseLink.href = "#";        
        if (aThisTask[DEF_ATASK_ISPAUSED] == 'true') {
            oPauseLink.innerHTML = "<img src='img/un/a/b3.gif'/>";
            oPauseLink.title = translate("Continue");        
            EventManager.Add(oPauseLink,'click',unpauseTask, false);
        } else {
            oPauseLink.innerHTML = "<img src='img/un/a/b2.gif'/>";
            oPauseLink.title = translate("Pause");        
            EventManager.Add(oPauseLink,'click',pauseTask, false);
        }

        var oTaskRow = document.createElement("div");
        oTaskRow.id = "ttq_task_row_" +i;
        oTaskRow.setAttribute("tasktype", aThisTask[DEF_ATASK_TYPE]);
        oTaskRow.setAttribute("timestamp", aThisTask[DEF_ATASK_TIME]);
        oTaskRow.setAttribute("tasktarget", aThisTask[DEF_ATASK_TARGET]);
        oTaskRow.setAttribute("taskoptions", aThisTask[DEF_ATASK_OPTIONS]);
        oTaskRow.setAttribute("villagedid", aThisTask[DEF_ATASK_VILLAGEID]);
        oTaskRow.setAttribute("duration", aThisTask[DEF_ATASK_DURATION]);
        oTaskRow.setAttribute("retry", aThisTask[DEF_ATASK_RETRY]);
        oTaskRow.setAttribute("retryinterval", aThisTask[DEF_ATASK_RETRYINTERVAL]);
        oTaskRow.setAttribute("repeat", aThisTask[DEF_ATASK_REPEAT_NUM]);
        oTaskRow.setAttribute("lastexec", aThisTask[DEF_ATASK_REPEAT_LASTEXEC]);
        oTaskRow.setAttribute("interval", aThisTask[DEF_ATASK_REPEAT_INTERVAL]);
        oTaskRow.setAttribute("rand", aThisTask[DEF_ATASK_REPEAT_RANDADD]);
        oTaskRow.setAttribute("isdummy", aThisTask[DEF_ATASK_ISDUMMY]);
        
        var sTaskSubject = "";
        var sTask = "";
        var sTaskMoreInfo = "";
               var aTroops;
        var sTimeInfo = "";
 
        if (bIsRepeatTask) {
            oTaskRow.setAttribute('style','background-color:#FFEC87;');
            sTimeInfo += (aThisTask[DEF_ATASK_REPEAT_NUM]!=0?"Repeat: " + (aThisTask[DEF_ATASK_REPEAT_NUM]==-1?'Infinite':aThisTask[DEF_ATASK_REPEAT_NUM]): 
                "LastStartBefore: " + formatDateTimeRelative(aThisTask[DEF_ATASK_REPEAT_LASTEXEC]))
                + " * (" + formatTimeSpan(aThisTask[DEF_ATASK_REPEAT_INTERVAL]) + " + rnd*" + formatTimeSpan(aThisTask[DEF_ATASK_REPEAT_RANDADD]) + "))";
        }
        
        switch(aThisTask[0]) {
            case "0":  //build
            case "1":  //upgrade
                sTaskSubject = aLangBuildings[aThisTask[3]];
                sTask = aLangTasks[aThisTask[0]];
                sTaskMoreInfo += translate("at site no.") + " " +aThisTask[2];
                break;
            case "2":  //attack
                //sTaskSubject = aThisTask[2];
                sTaskSubject = '<span id="ttq_placename_' +aThisTask[2]+ '">' + getPlaceName(aThisTask[DEF_ATASK_TARGET]) + '</span>';
                if(sTaskSubject == '') {
                    sTaskSubject = aThisTask[2]
                }
                aTroops = aThisTask[3].split("_");
                if(onlySpies(aTroops)) {
                    sTask = translate("Spy");
                } else {
                    var iIndex = parseInt(aTroops[0]) + 18;
                    if(iIndex == 20) sTask = translate('Support');
                    if(iIndex == 21) sTask = translate('Attack');
                    if(iIndex == 22) sTask = translate('Raid');
                }
                sTask = getTroopsInfoImg(aThisTask[DEF_ATASK_OPTIONS].split('_')) + sTask;
                
                sTaskMoreInfo += getTroopsInfo(aTroops);
                if (bIsRepeatTask) {
                    occup = getOccupancy(aThisTask[DEF_ATASK_DURATION],aThisTask[DEF_ATASK_REPEAT_INTERVAL],aThisTask[DEF_ATASK_REPEAT_RANDADD]);
                
                    aTroopsOccup = getTroopsFactoredCount(aTroops,occup);
                    sTaskMoreInfo += " [occupancy: " + getTroopsInfo(aTroopsOccup) + "]";
                }
                
                break;
            case "3":  //research
                sTaskSubject = aLangTroops[iMyRace][aThisTask[3]-1];
                sTask = aLangTasks[3];
                break;
            case "4":  //train
                aTroops = aThisTask[3].split("_");
                sTaskSubject = getTroopsInfo(aTroops);
                sTask = aLangTasks[4];
                break;
            case "5": //send Ressource in a delayed time
                sTask = aLangTasks[5];
                var listOfParams= aThisTask[3].split("_#");
                //5, iVillageFromId,ir1+"_"+ir2+"_"+ir3+"_"+ir4+"_"+villageTargetName+"_"+iX+"_"+iY
                sTaskSubject = "<table cellspacing=\"1\" cellpadding=\"2\" border=1 width=\"150px\">"
                + "<tr class=\"rbg\"><td colspan=4>" + translate("Destinataire:") + listOfParams[4] + " "  + listOfParams[5] +  "|" + listOfParams[6] +"</td></tr>"
                + "<tr class=\"nbr\">"
                +"<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/1.gif\">"+(listOfParams[0]==''?0:listOfParams[0]) + "</td>"
                +"<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/2.gif\">"+(listOfParams[1]==''?0:listOfParams[1]) + "</td>"
                +"<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/3.gif\">"+(listOfParams[2]==''?0:listOfParams[2]) + "</td>"
                +"<td style=\"background-color:white\"><img class=\"res\" src=\"img/un/r/4.gif\">"+(listOfParams[3]==''?0:listOfParams[3]) + "</td>"
                +"</tr>	"
                +"</table>";
                sTaskMoreInfo += "sTaskMoreInfo in Comment";

                break;
            default:
                break;
        }
        // Get the village on which the Task is applied
        var sVillageName = '';
        if(aThisTask[4] != 'null' && aThisTask[4] != '') {
            sVillageName = " &mdash; " +getVillageName(aThisTask[4]);
        }
        
        // Append each line of the future Task
        oTaskRow.innerHTML = "&nbsp;&nbsp;&nbsp;<span class='ttq_time_village_wrapper' style='display:inline !important;'>"
            + sTime + (aTaskIsDummy(aThisTask)?'*':'') + "<span class='ttq_village_name'>" + sVillageName+ "</span>" + ":</span>"
            +" <span title='" + sTaskMoreInfo + " - " + getMoreTaskInfo(aThisTask) + "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";
        oTaskRow.insertBefore(oPauseLink,oTaskRow.firstChild);
        oTaskRow.insertBefore(oDeleteLink,oTaskRow.firstChild);
        oTaskList.appendChild(oTaskRow);
        
        //add listener for editing times in the task list
        var oTaskTimeSpan = $("ttq_tasktime_"+i);
        EventManager.Add(oTaskTimeSpan,'click', editTime, false);
        oTaskTimeSpan.title = sTimeInfo;
        
        
        oDeleteLink = null;
        oTaskRow = null;
        oDate = null;
        /*
        var aTroopsOccup;
        var aTotalTroopsOccup = new Array(0,0,0,0,0,0,0,0,0,0,0,0);
        var aVillageIds = new Array();
        var aVillageTroopsOccup = new Array();*/
        if (aThisTask[0] == "2" && bIsRepeatTask && aThisTask[DEF_ATASK_ISPAUSED] != 'true') {
           var vid = aVillageIds.indexOf(aThisTask[DEF_ATASK_VILLAGEID]);
           if (vid==-1) {
                _log(3,'Adding attacked village ' + aThisTask[DEF_ATASK_VILLAGEID]);
                aVillageIds.push(aThisTask[DEF_ATASK_VILLAGEID]);
                aVillageTroopsOccup.push(new Array(0,0,0,0,0,0,0,0,0,0,0,0));
                vid = aVillageIds.length - 1;
           }
           
           aTotalTroopsOccup = aVillageTroopsOccup[vid];
           
           for (var k=0;k<aTroopsOccup.length;k++) {
                aTotalTroopsOccup[k]+=aTroopsOccup[k]*1;
           }
           
           aVillageTroopsOccup[vid] = aTotalTroopsOccup;
        }
    } //for aTasks


    // Append a link to flush all the list of Task
    var oDeleteAllTask = document.createElement('a');
    oDeleteAllTask.innerHTML = "<img src='" +sDeleteBtn+ "' alt='X'/>" + '<font color=black>'+ translate("Flush Task List ")+'</font>';
    oDeleteAllTask.href = "#";
    oDeleteAllTask.id = 'ttq_delete_all_tasks';
    oDeleteAllTask.setAttribute("taskNumber",aTasks.length);
    oDeleteAllTask.title = translate("Flush Task List ");
    EventManager.Add(oDeleteAllTask,'click',deleteAllTask, false);
    oTaskList.appendChild(oDeleteAllTask);
    
    for (var j = 0; j<aVillageIds.length;j++) {
        
        var oOccupInfo = document.createElement('span');
        _log(3,'aVillageTroopsOccup[j]=' + aVillageTroopsOccup[j]);
        
        oOccupInfo.innerHTML = "<span class='ttq_village_name'>" + getVillageName(aVillageIds[j]) + "</span>:" + getTroopsInfoImg(aVillageTroopsOccup[j]);
        oOccupInfo.id = 'ttq_occup_info_' + j;
        oTaskList.insertBefore(oOccupInfo,sortLinkWrapper);
        oTaskList.insertBefore(document.createElement('br'),oOccupInfo.nextSibling);
    }

    if (currentSort!=1) // time
        orderList(currentSort, "ttq_task_row");

    _log(3, "<- refreshTaskList()");
}

function pauseTask(e) {
    //alert(this.getAttribute('tid'));
    var id = this.getAttribute('tid');
    setTaskField(id,DEF_ATASK_ISPAUSED,true);    
    refreshTaskList();
}

function unpauseTask(e) {
    //alert(this.getAttribute('tid'));
    var id = this.getAttribute('tid');
    setTaskField(id,DEF_ATASK_ISPAUSED,false);    
    refreshTaskList();
}

function setTaskField(tid,fid,val) {
    var tasks = readData(DEF_TTQ_TASKS).split('|');
    var thistask = tasks[tid].split(',');
    thistask[fid] = val;
    
    tasks[tid] = thistask.join(',');
    
    writeData(DEF_TTQ_TASKS,tasks.join('|'));   
}

function editTime(ev) {

    var oTaskRow = ev.target.parentNode.parentNode;

    var task_id = oTaskRow.id.split('_')[3]; // ttq_task_row_x
    //alert(task_id);

    var type = parseInt(oTaskRow.getAttribute("tasktype"));
    var timestamp = oTaskRow.getAttribute("timestamp");
    var target = oTaskRow.getAttribute("tasktarget");
    var options = oTaskRow.getAttribute("taskoptions").split("_");
    var villagedid = oTaskRow.getAttribute("villagedid");
    var duration = oTaskRow.getAttribute("duration");

    var retry = oTaskRow.getAttribute("retry");
    var retryinterval = oTaskRow.getAttribute("retryinterval");
    
    var repeat = oTaskRow.getAttribute("repeat");  
    var lastexec = oTaskRow.getAttribute("lastexec");
    var interval = oTaskRow.getAttribute("interval");
    var rand = oTaskRow.getAttribute("rand");  
    var isdummy = oTaskRow.getAttribute("isdummy");  
    
    displayTimerForm(type, target, options, timestamp, duration, retry, retryinterval, repeat, lastexec, interval, rand, isdummy, villagedid);
}


//***************************************
// LIST SORTING
//***************************************
/**
* @param iOrderBy: 0 - tasktype, 1 - timestamp, 2 - target, 3 - options, 4 - villagedid
*/
function orderList(iOrderBy, sRowId) {
    var rows = xpath('//div[contains(@id, "' +sRowId+ '")]');
    if(rows.snapshotLength > 0) {
        var sortKey;
        switch(iOrderBy) {
            case 0:
                sortKey = "tasktype";
                break;
            case 2:
                sortKey = "tasktarget";
                break;
            case 3:
                sortKey = "options";
                break;
            case 4:
                sortKey = "villagedid";
                break;
            case 1:
            default:
                sortKey = "timestamp";
                break;
        }
        var keyValue = "";
        var aRows = [];
        for(var i = 0; i < rows.snapshotLength; i++) {

            keyValue = rows.snapshotItem(i).getAttribute(sortKey);

            aRows.push([keyValue, rows.snapshotItem(i)]);
        }

        //alert(aRows);

        aRows.sort(sortArray);

        switch(sRowId) {
            case "ttq_history_row":
                aRows.forEach(processSortedHistory);
                break;
            case "ttq_task_row":
            default:
                aRows.forEach(processSortedTaskList);
                break;
        }

    }

    return false;
}

function sortArray(arr1,arr2) {
    return arr1[0] - arr2[0];
}

function processSortedTaskList(element) {
    $("ttq_tasklist").insertBefore(element[1],$('ttq_delete_all_tasks'));
}
function processSortedHistory(element) {
    $("ttq_history").insertBefore(element[1],$('ttq_flush_history'));
}



function twoElementArrayCompare(arr1,arr2) {
    var key1 = arr1[0];
    var key2 = arr2[0];
    if (isInt(key1))
        return key1 - key2;
    else {
        if (key1 == key2)
            return 0;

        words = new Array(key1,key2);
        word = words.sort().split(',');
        if (word[0] == key1)
            return -1;
        else
            return 1;

    }
}

// ************************************************************************************************************
// *********  TASK TRIGGER CHECK     **************************************************************************
// ************************************************************************************************************
// this function is called every checkinterval seconds by

var aTasksToSchedule = new Array();

function checkSetTasks() {
    _log(3, "Checking set tasks...");
    _log(3, "oIntervalReference " + oIntervalReference);

    checkIfLoggedIn();

    if(bLocked) {
        _log(2, "Tasks are locked. Exiting.");
        return false;
    }

    bLocked = true;
    
    // Each Task is separated by a |
    // and Each parameter of a Task is separated by a comma
    var sOldTasks = readData(DEF_TTQ_TASKS);

    if(sOldTasks == '') {  // no tasks are set
        _log(2, "No tasks are set. ");
        // stop checking, it would be pointless. Checking will be restarted when new tasks are set.
        if(oIntervalReference) {
            _log(3, "clearInterval()");
            window.clearInterval(oIntervalReference);
            oIntervalReference = null;
        }
        bLocked = false;
        return false;
    }

    // Times: Server or Local?
    var oStartDate;
    if(bUseServerTime) {
        var iServerTimestamp = getServerTime(true);
        if(iServerTimestamp == false) {  //error
            _log(2, "Unable to determine server's time. We can't trigger any tasks without this. Consider switching to using local time.");
            return false;
        }
        oStartDate = new Date(iServerTimestamp);
    } else {  //local
        oStartDate = new Date();
    }

    var aTasks = sOldTasks.split("|");
    var repeatedTask;
    var aRepeatedTasks = new Array();
    var bTasksTriggered = false;
    var bSomeScheduled = false;
    for(var i = 0; i < aTasks.length; i++) {
        var aThisTask = aTasks[i].split(",");        

        // The stored time (Unix GMT time) should be compared against the GMT time, not local!
        if(aThisTask[DEF_ATASK_TIME] <= oStartDate.getTime()/1000) {

            if (!aThisTask[DEF_ATASK_ISPAUSED] || aThisTask[DEF_ATASK_ISPAUSED] == 'false')            
                triggerTask(aThisTask);
            
            aTasks.splice(i, 1);  //delete this task
            
            repeatedTask = getRepeatedTask(aThisTask);// check if repeat scheduled and get task if so
            if (repeatedTask)
                aRepeatedTasks.push(repeatedTask);
            
            // TODO: wait some time, to avoid flooding in case of a stau. maybe blocking request?
            bTasksTriggered = true;

        } else if( (aThisTask[DEF_ATASK_TYPE] < 2) && (aThisTask[DEF_ATASK_TIME] <= ((oStartDate.getTime()/1000) + iPreloadTime)) ) {
            //prefetch the code if the task is to be triggered in less than iPreloadTime

            _log(2, "Some building/upgrading task is set, but it is not the time yet. It is time to preload the code though.");
            getCode(aThisTask[DEF_ATASK_TARGET], aThisTask[DEF_ATASK_VILLAGEID]);

        } else {            
            bSomeScheduled = true;
            break; //since all tasks are sorted by start time, no need to look any further. TODO: think about this: not sure about combination of attack and building code though..
        }
    }

    if (bSomeScheduled && !bTasksTriggered) {
        _log(3, "Some task is set, but it is not the time yet.");
        //refresh the session if needed

        var iLastRefreshed = getOption(DEF_OPTION_LAST_REFRESH, 0, "integer");
        var iRandomSeconds = 60 * Math.round(10 * (Math.random()-0.5));  //for randomizing the refresh times (the scatter will be +/- 5 minutes)

        if(iLastRefreshed != 0 && (iSessionRefreshRate > 0) && (iLastRefreshed + iSessionRefreshRate*60 + iRandomSeconds )  < Math.round(oStartDate.getTime()/1000) ) {
            _log(2, "Refreshing the session...");
            get("dorf1.php", null, null)
            setOption(DEF_OPTION_LAST_REFRESH, Math.round(oStartDate.getTime()/1000) );
        }
    }

    // rewrite stored tasks if any task was deleted
    if(bTasksTriggered) {            
        _log(3, "Storing tasks: " + aTasks.join("|"));
        
        writeData(DEF_TTQ_TASKS, aTasks.join("|"));
        
        if (aRepeatedTasks.length == 0)
            refreshTaskList();
    }
    
    bLocked = false;
    
    // add rescheduled tasks //TODO: not safe in case of reload, better use persistent storage 
    aRepeatedTasks = aRepeatedTasks.concat(aTasksToSchedule);
    
    // schedule repeated tasks
    if(aRepeatedTasks.length > 0) {
        _log(3,'Number of Tasks to repeat/reschedule: ' + aRepeatedTasks.length);
        for (var i=0;i<aRepeatedTasks.length; i++)
            setATask(aRepeatedTasks[i],false,false);
            
        refreshTaskList();
        
        aTasksToSchedule = new Array();
    }
    
    return false;
}


// ************************************************************************************************************
// *********  TASK TRIGGERING        **************************************************************************
// ************************************************************************************************************

/**
 * Performs the supplied task. Prints the report.
 * @param aTask: [task, when, target, options,...]
 */
function triggerTask(aTask) {
    _log(3, "-> triggerTask(): " + aTask2String(aTask));
 
    switch(aTask[DEF_ATASK_TYPE]) {
        case DEF_ATASK_TYPE_BUILD:
            build(aTask);
            break;
        case DEF_ATASK_TYPE_UPGRADE:
            upgrade(aTask);
            break;
        case DEF_ATASK_TYPE_ATTACK:
            attack(aTask);
            break;
        case DEF_ATASK_TYPE_RESEARCH:
            research(aTask);
            break;
        case DEF_ATASK_TYPE_TRAIN:
            train(aTask);
            break;
        case DEF_ATASK_TYPE_SEND:
            sendResource(aTask);
            break;
        default:
            _log(3, "Can't trigger an unknown task.");
            break;
    }
    _log(3, "<- triggerTask()");
}

// *****************************************************************
// BUILD NEW BUILDING
// aTask format : 1,1214553491,6,2,141598   [Type / Time / SiteId / BuildingId / VillageId
// *****************************************************************
function build(aTask) {
    _log(3, "-> build()");
    // we will assume that there is a correct up-to-date code in the cookie
    var sCode = '';

    var sCookie = readData(DEF_TTQ_CODE0);
    if(sCookie != '') {
        _log(3, "Cookie found.");
        var aCookie = sCookie.split(",");
        var iIndexOfVillageId = aCookie.indexOf(aTask[DEF_ATASK_VILLAGEID]);
        if(iIndexOfVillageId > -1) {  //the village id found
            sCode = aCookie[iIndexOfVillageId + 1];
        }
    } else {
        _log(3, "No code cookie available.");
    }

    //TODO: if the code is not there, or is there but incorrect, try to get a new one, register event listener, and start building when the code is updated (implement timeouts to this)

    if(false && sCode == '') {  // no code - no building possible
        _log(1, "No code found. Building this building is not possible.");
        printMsg("<span class='ttq_village_name' style='display:block;'>" +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ "</span>" + aLangBuildings[aTask[DEF_ATASK_OPTIONS]] + translate(" cannot be built."), true);
        return false;
    }

    var sNewDid;
    if(aTask[DEF_ATASK_VILLAGEID] != 'null' && aTask[DEF_ATASK_VILLAGEID] != '' ) {
        sNewDid = "&newdid=" +aTask[DEF_ATASK_VILLAGEID];
    } else {
        sNewDid = "";
    }

    var currentActiveVillage = getActiveVillageId();

    var sUrl = "dorf2.php?";
    sUrl += "a=" +aTask[DEF_ATASK_OPTIONS]+ "&id=" +aTask[DEF_ATASK_TARGET]+ "&c=" +sCode + sNewDid;
    var myOptions = [aTask, currentActiveVillage];
    get(sUrl, handleRequestBuild, myOptions)
    _log(3, "<- build()");
}


// *****************************************************************
// UPGRADE A BUILDING
// aTask format : 1,1214553491,6,2,141598   [task id / Time / site id / building id / VillageId
// *****************************************************************
function upgrade(aTask) {
    _log(3, "-> upgrade()");

    // try to load the code
    var sCode = '';

    var sCookie = readData(DEF_TTQ_CODE1);
    if(sCookie != '') {
        _log(3, "Cookie found.");
        var aCookie = sCookie.split(",");
        var iIndexOfVillageId = aCookie.indexOf(aTask[DEF_ATASK_VILLAGEID]);
        if(iIndexOfVillageId > -1) {  //the village id found
            sCode = aCookie[iIndexOfVillageId + 1];
        }
    } else {
        _log(3, "No cookie found.");
    }

    if(sCode == '') {  // no code - no building possible
        _log(1, "No code found. Upgrading this building is not possible.");
        printMsg("<span class='ttq_village_name' style='display:block'>" +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ "</span>" + aLangBuildings[aTask[DEF_ATASK_OPTIONS]] + translate(" cannot be upgraded."), true);
        addToHistory(aTask,false);
        return false;
    }

    var sNewDid, sUrl;
    if(aTask[DEF_ATASK_VILLAGEID] != 'null') {
        sNewDid = "&newdid=" +aTask[DEF_ATASK_VILLAGEID];
    } else {
        sNewDid = "";
    }

    if(aTask[DEF_ATASK_OPTIONS] < 19) {  //it's resource site
        sUrl = "dorf1.php?";
    } else {
        sUrl = "dorf2.php?";
    }

    var currentActiveVillage = getActiveVillageId();
    sUrl += "a=" +aTask[2]+ "&c=" +sCode + sNewDid;
    _log(3, sUrl);
    var myOptions = [aTask, currentActiveVillage];

    get(sUrl, handleRequestBuild, myOptions)
    _log(3, "<- upgrade()");
}

// *****************************************************************
// ATTACK
// *****************************************************************
function attack(aTask) {
    _log(3, "-> attack()");

    
    // a2b confirm -> end

    var aTroops = aTask[DEF_ATASK_OPTIONS].split("_");
    var iAttackType = aTroops[0];

    var sParams = "id=39";
    sParams += "&c=" +iAttackType
    sParams += "&kid=" +aTask[2]
    //sParams += "&a=12345";  //TODO: "a" parameter may need to be specified
    for(var i = 1; i <= 11; i++) {
        sParams += "&t" +i+ "=" +aTroops[i];
    }

    //Target for catapults
    if(aTroops[8] > 0) {
        if(aTroops[12]) {
            sParams += "&kata=" +aTroops[12];
        }
        if(aTroops[13]) {
            sParams += "&kata2=" +aTroops[13];
        }
    }
    
    if(aTroops[iScoutUnit] > 0 && onlySpies(aTroops) && iAttackType > 2) {
        _log(3, "We are sendings scouts.");
        var iScoutMode;
        if(aTroops[12]) {
            iScoutMode = aTroops[12];
        } else {
            iScoutMode = 1;  //"Spy troops  and resources" by default
        }
        sParams += "&spy=" +iScoutMode;
    }

    _log(3, "sParams\n"+sParams);
    
    // DUMMY
    if (aTaskIsDummy(aTask)) {
        //alert('Troops would have been sent.');
        _log(2,'Troops would have been sent.');
        var myOptions = [aTask, false];
        handleRequestAttack(null,myOptions);
        return true;
    }
    
    if(aTask[DEF_ATASK_VILLAGEID] != 'null' && aTask[DEF_ATASK_VILLAGEID] != '') {
        //we need to switch village

        _log(3, "Requesting switch to village: " + getVillageName(aTask[DEF_ATASK_VILLAGEID]));
        var currentActiveVillage = getActiveVillageId();
        var myOptions = [aTask, currentActiveVillage];
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", "a2b.php?newdid=" + aTask[DEF_ATASK_VILLAGEID], true);
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status == 200) { // ok
                    _log(3, "Village switched to " + getVillageName(aTask[DEF_ATASK_VILLAGEID]));
                    //post("a2b.php", sParams, handleRequestAttack, myOptions);
                    attackGetAParam(aTask,sParams,handleRequestAttack,myOptions);
                    _log(3, "The attack was requested.");
                    httpRequest.onreadystatechange = null; //avoid memory leaks
                }

            }
        };
        httpRequest.send(null);
    } else {  //only 1 village. Perform attack immediately
        var myOptions = [aTask, false];
        post("a2b.php", sParams, handleRequestAttack, myOptions);
        _log(3, "The attack was requested.");
    }

    _log(3, "<- attack()");
}

function attackGetAParam(aTask,sParamsOrig,handleRequestAttack,myOptions) {
     _log(3, "Getting 'a' param." + aTask2String(aTask));
     // a2b input-> confirm:
    // b	1
    //t1	2
    //t4	
    //t7	
    //t9	
    //t2	
    //t5	
    //t8	
    //t10	
    //t3	
    //t6	
    //t11	
    //c	4
    //dname	
    //x	-66
    //y	-94
    //s1.x	24 [1..50]
    //s1.y	9  [1..20]
    //s1	ok 
    var aTroops = aTask[DEF_ATASK_OPTIONS].split("_");
    
    var sParams = "b=1";
    for(var i = 1; i <= 11; i++) {
        sParams += "&t" +i+ "=" + (aTroops[i]>0?aTroops[i]:'');
    }
    sParams += "&c=" + aTroops[0]
    sParams += "&x=" + coordZToX(aTask[DEF_ATASK_TARGET]);
    sParams += "&y=" + coordZToY(aTask[DEF_ATASK_TARGET]);
    sParams += "&s1.x=" + Math.ceil(Math.random()*50);
    sParams += "&s1.y=" + Math.ceil(Math.random()*20);
    sParams += "&s1=ok";
    
    _log(3,sParams);
    
    var myOptionsGetA = [myOptions, sParamsOrig, handleRequestAttack];
    
    // get "a" code
    post("a2b.php", sParams, handleAttackGetAParam, myOptionsGetA);
    
}

function handleAttackGetAParam(httpRequest, myOptions) {
    // confirm page:
    //<input type="hidden" value="39" name="id"/>
    //<input type="hidden" value="11084" name="a"/>
    //<input type="hidden" value="4" name="c"/>
    //<input type="hidden" value="396029" name="kid"/>
    //<input type="hidden" value="2" name="t1"/>
    //<input type="hidden" value="0" name="t2"/>
    //<input type="hidden" value="0" name="t3"/>
    //<input type="hidden" value="0" name="t4"/>
    //<input type="hidden" value="0" name="t5"/>
    //<input type="hidden" value="0" name="t6"/>
    //<input type="hidden" value="0" name="t7"/>
    //<input type="hidden" value="0" name="t8"/>
    //<input type="hidden" value="0" name="t9"/>
    //<input type="hidden" value="0" name="t10"/>
    //<input type="hidden" value="0" name="t11"/>
    
    if (httpRequest.readyState == 4) {
        var aMyOrigOptions = myOptions[0];
        var sParamsOrig = myOptions[1];
        var fHandleRequestAttackOrig = myOptions[2];
        
        _log(3, "-> handleAttackGetAParam(): \nopt:" + aMyOrigOptions + "\nparams:"+ sParamsOrig );
     
        if (httpRequest.status == 200) {

            var sResponse = httpRequest.responseText;
            _log(3, sResponse);
            
            if(!sResponse) {  // error retrieving the response
                _log(2, "We didn't get any response. No Attack code available.");
                return;
            }

            var re = new RegExp('<input type=\"hidden\" name=\"a\" value=\"[0-9]*\">', 'i');
            
            //var s='<input type="hidden" name="a" value="48637">';
            //alert(s.match(/\"[0-9]*\"/));
            //var dummyDiv = makeDummyDiv(sResponse);
            //var a = xpath("//input[@name='a']",dummyDiv).snapshotItem(0).getAttribute('value');
            //document.body.removeChild($('dummydiv'));
            var s = sResponse.match(re);
            if (s) {
                s = s[0];
                _log(3,"first match:" + s);
                s= s.match(/\"[0-9]*\"/)[0];
                a=s.substr(1,s.length-2);
                
               _log(3,'found a: ' +a);
               
               sParamsOrig += "&a=" + a;
               
               post("a2b.php", sParamsOrig , fHandleRequestAttackOrig, aMyOrigOptions);
            } else {
                var re2 = /Auf diesen Koordinaten gibt es kein Dorf/;
                var re3 = /Der Spieler .* ist wegen eines Regelverstoßes gesperrt/;
                var re4 = /<h1>Truppen schicken<\/h1>/;

                if (re2.test(sResponse)) {
                    _log(2, "It seems the village was deleted.");
                    addToHistory(aMyOrigOptions[0], false, DEF_ERROR_VILLAGEDELETED);
                } else {
                    if (re3.test(sResponse)) {
                        addToHistory(aMyOrigOptions[0], false, DEF_ERROR_PLAYERBANNED);                    
                        _log(2, "It seems that the player was temporarily banned.");
                    } else { 
                        if (re4.test(sResponse)) { 
                            addToHistory(aMyOrigOptions[0], false, DEF_ERROR_NOTENOUGHTROOPS);  
                            _log(2, "It seems that not enough troops were available.");
                        } else {
                            addToHistory(aMyOrigOptions[0], false, DEF_ERROR_UNKNOWN);                    
                        //TODO: login page, not enough troops                        
                        //alert('unknown error on send troops, see error log for html.');
                        //TODO:  parse page for troops, ans see if there are enough. or just assume there arent enough if we see this page
                        //not enough troops page == a2b page: 
                            _log(0,sResponse);
                        }
                    }
                }
                
            }
           
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
            
            addToHistory(aMyOrigOptions[0], false);
        }
        
        _log(3, "<- handleAttackGetAParam()");
        return;
    }
   
}

// *****************************************************************
// SEND
// *****************************************************************
function sendResource(aTask){
    _log(3, "-> send Ressource ()");
    var infos= new Array();  //extract troops numbers and attack type
    infos= aTask[DEF_ATASK_OPTIONS].split("_");
    var currentActiveVillage = getActiveVillageId();
    var sParams =
    "&r1="+(infos[0]!='#'?infos[0]:'')
    +"&r2="+(infos[1]!='#'?infos[1].substring(1,infos[1].length):'')
    +"&r3="+(infos[2]!='#'?infos[2].substring(1,infos[2].length):'')
    +"&r4="+(infos[3]!='#'?infos[3].substring(1,infos[3].length):'')
    +"&dname="+(infos[4]!='#'?infos[4].substring(1,infos[4].length):'')
    +"&x="+(infos[5]!='#'?infos[5].substring(1,infos[5].length):'')
    +"&y="+(infos[6]!='#'?infos[6].substring(1,infos[6].length):'')
    +"&id="+(infos[7]!='#'?infos[7].substring(1,infos[7].length):'');
    _log(3,sParams);

    if(aTask[DEF_ATASK_VILLAGEID] != 'null' && aTask[DEF_ATASK_VILLAGEID] != '') {  //multiple villages
        _log(2, "Moresone vilage.");
        //we need to switch village
        _log(2, "Switching to village:" +aTask[DEF_ATASK_VILLAGEID]);
        var currentActiveVillage = getActiveVillageId();
        var myOptions = [aTask, currentActiveVillage,sParams];
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", "build.php?newdid=" + aTask[DEF_ATASK_VILLAGEID], true);
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status == 200) { // ok
                    _log(2, "Village switched to " +aTask[DEF_ATASK_VILLAGEID]);
                    post("build.php", sParams, handleRequestSendResource, myOptions);
                    _log(2, "The Send Resourced was requested.");
                    httpRequest.onreadystatechange = null; //avoid memory leaks
                }
            }
        };
        httpRequest.send(null);
    } else {  //only 1 village. Perform send immediately
        _log(2, "Only one vilage.");
        var currentActiveVillage = getActiveVillageId();
        var myOptions = [aTask, currentActiveVillage,];
        post("build.php", sParams, handleRequestSendResource, myOptions);
        _log(2, "The resource was send .");
    }
}

// *****************************************************************
// RESEARCH
// *****************************************************************
function research(aTask) {
    _log(3, "-> research()");

    var sNewDid;
    if(aTask[DEF_ATASK_VILLAGEID] != 'null' && aTask[DEF_ATASK_VILLAGEID] != '') {
        sNewDid = "&newdid=" +aTask[DEF_ATASK_VILLAGEID];
    } else {
        sNewDid = "";
    }
    var currentActiveVillage = getActiveVillageId();
    var sUrl = "build.php?id=" + aTask[DEF_ATASK_TARGET] + "&a=" + aTask[DEF_ATASK_OPTIONS] +  sNewDid;
    var myOptions = [aTask, currentActiveVillage];
    get(sUrl, handleRequestResearch, myOptions);

    _log(3, "<- research()");
}

// *****************************************************************
// TRAIN
// *****************************************************************
function train(aTask) {
    _log(2, "-> train()");

    var sNewDid;
    if(aTask[DEF_ATASK_VILLAGEID] != 'null' && aTask[DEF_ATASK_VILLAGEID] != '') {
        sNewDid = "&newdid=" +aTask[DEF_ATASK_VILLAGEID];
    } else {
        sNewDid = "";
    }
    var currentActiveVillage = getActiveVillageId();

    var sParams = "id=" +aTask[DEF_ATASK_TARGET]+ "&a=2";

    var aTroops = aTask[DEF_ATASK_OPTIONS].split("_");
    if(aTroops.length > 1) {
        sParams += "&z=" + aTroops[0];
        for(var i = 1; i < 11; i++) {
            if(aTroops[i] > 0) {
                sParams += "&t" + i + "=" + aTroops[i];
            }
        }
    } else {
        _log(3, "No troops specified. Exiting function.");
        return;
    }
    _log(3, sParams);

    var myOptions = [aTask, currentActiveVillage];


    if(aTask[DEF_ATASK_VILLAGEID] != 'null' && aTask[DEF_ATASK_VILLAGEID] != '' && aTask[DEF_ATASK_VILLAGEID] != currentActiveVillage) {  //multiple villages
        //we need to switch village
        _log(2, "Switching to village:" +aTask[DEF_ATASK_VILLAGEID]);
        var currentActiveVillage = getActiveVillageId();
        var httpRequest = new XMLHttpRequest();
        httpRequest.open("GET", "dorf1.php?newdid=" + aTask[DEF_ATASK_VILLAGEID], true);
        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == 4) {
                if (httpRequest.status == 200) { // ok
                    _log(2, "Village switched to " +aTask[DEF_ATASK_VILLAGEID]);
                    post("build.php", sParams, handleRequestTrain, myOptions);
                    _log(2, "The training was requested.");
                    httpRequest.onreadystatechange = null; //avoid memory leaks
                }
            }
        };
        httpRequest.send(null);
    } else {  //only 1 village
        post("build.php", sParams, handleRequestTrain, myOptions);
        _log(2, "The training was requested.\n" + sParams);
    }

    _log(2, "<- train()");
}

//*****************************************************************
// BUILD CALLBACK
// *****************************************************************
function handleRequestBuild(httpRequest, options) {
    _log(3, "-> handleRequestBuild()");
    var aTask = options[0];
    var activateVillageDid = options[1];
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { // ok
            var sResponse = httpRequest.responseText;
            _log(3, sResponse);
            if(!sResponse) {  // error retrieving the response
                printMsg( aLangTasks[aTask[DEF_ATASK_TYPE]] + " " + aLangBuildings[aTask[DEF_ATASK_OPTIONS]] + translate(" was attempted with unknown result."), true );
                return;
            }
            var re = new RegExp('<div id="lbau.">.*' + aLangBuildings[aTask[DEF_ATASK_OPTIONS]] + '.*</div>', 'i');
            if(sResponse.match(re)) {
                printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ '</span>' + translate("We started builing ") + aLangBuildings[aTask[DEF_ATASK_OPTIONS]]);  //Your building is being built.
                addToHistory(aTask, true);
            } else {
                printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ '</span>' + aLangBuildings[aTask[DEF_ATASK_OPTIONS]] + translate(" cannot be built."), true); // Your building can't be built.
                
                addToHistory(aTask, false);
            }
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
        if(isInt(activateVillageDid) && activateVillageDid != getActiveVillageId()) 
            switchActiveVillage(activateVillageDid);
    }
    _log(3, "<- handleRequestBuild()");
}

//*****************************************************************
// ATTACK CALLBACK
// *****************************************************************
function handleRequestAttack(httpRequest, options) {
    _log(3, "-> handleRequestAttack()");
    var aTask = options[0];
    var activateVillageDid = options[1];
    
    if (httpRequest == null) { //dummy
        addToHistory(aTask,true);
        return true;
    }
    
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {

            var sResponse = httpRequest.responseText;
            _log(4, sResponse);
            if(!sResponse) {  // error retrieving the response
                _log(1, "We didn't get any response. Impossible to determine whether the attack was sent.");
                //TODO: async load rally point
                return;
            }
            var sPlaceName = '<span id="ttq_placename_' + aTask[DEF_ATASK_TARGET] + '">' + getPlaceName(aTask[DEF_ATASK_TARGET]) + '</span>';

            var re = new RegExp('karte\\.php\\?d=' + aTask[DEF_ATASK_TARGET], 'i');//argh this is not enough. what if already an attack is running there..?
            
            //TODO: additionally check for delete link, and even time if possible. calculated times should be correct..
            if(re.test(sResponse)) {
                _log(3, "It seems your attack was successfully sent.");
                
                printMsg(translate("Your troops were sent to") + " " + sPlaceName);

                addToHistory(aTask, true);

            } else {

                _log(1, "Your attack could not be sent.");
                
                printMsg(translate("Your troops could not be sent to") + " " +sPlaceName, true);
                
                addToHistory(aTask, false);

            }
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);

        }
        
        if(isInt(activateVillageDid) && activateVillageDid != getActiveVillageId())
            switchActiveVillage(activateVillageDid);
            
        return;
    }
    _log(3, "<- handleRequestAttack()");
}

//*****************************************************************
// SEND CALLBACK
// *****************************************************************
function handleRequestSendResource2(httpRequest,options){
    var aTask = options[0];
    var activateVillageDid = options[1];
    var sParams = options[2];
    _log(3, "<- handleRequestSendResource2()");
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { // ok
            var sResponse = httpRequest.responseText;
            _log(3, sResponse);
            if(!sResponse) {  // error retrieving the response
                _log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
                return;
            }
            var villageName = '<span id="ttq_placename_' + aTask[2] + '">' + getVillageName(aTask[2]) + '</span>';
            var merchants_number = countString(sResponse,'<span class="c0">');
            if(parseInt(merchants_number) > parseInt(options[3])){
                _log(1, "It seems your merchant were successfully sent.");
                printMsg(translate("Your merchant were probably sent to") + " " + villageName);
                addToHistory(aTask, true);
            } else {
                _log(1, "Your merchant could not be sent.");
                printMsg(translate("Your merchant could not be sent to") + " " +villageName, true);
                addToHistory(aTask, false);
            }
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
            printMsg(translate("Your merchant could not be sent to") + " " +villageName, true);
            addToHistory(aTask, false);
        }
        if(isInt(activateVillageDid) && activateVillageDid != getActiveVillageId()) 
            switchActiveVillage(activateVillageDid);
        return;
    }
    _log(3, "<- handleRequestSendResource2()");
}

function countString(htmlResponse,stringToFind){
    return htmlResponse.split(stringToFind).length-1;
}

//*****************************************************************
// SEND CALLBACK (old version?)
// *****************************************************************
function handleRequestSendResource(httpRequest, options){
    _log(3, "-> handleRequestSendResource()");
    var aTask = options[0];
    var activateVillageDid = options[1];
    var sParams = options[2];
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { // ok
            var sResponse = httpRequest.responseText;
            _log(3, sResponse);
            if(!sResponse) {  // error retrieving the response
                _log(2, "We didn't get any response. Impossible to determine whether the attack was sent.");
                return;
            }
            // On rÃƒÆ’Ã‚Â©cupÃƒÆ’Ã‚Â¨r les paramÃƒÆ’Ã‚Â¨tres
            var val_id  = sResponse.match(/<input type=['"]hidden['"] name=['"]id["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];
            var val_a   = sResponse.match(/<input type=['"]hidden['"] name=['"]a["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];
            var val_sz  = sResponse.match(/<input type=['"]hidden['"] name=['"]sz["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];
            var val_kid = sResponse.match(/<input type=['"]hidden['"] name=['"]kid["'] value=['"]([0-9a-zA-Z]+)['"]>/)[1];

            var val_number_of_merchants = countString(sResponse,'<span class="c0">');
            sParams = sParams +"&sz="+val_sz + "&kid="+val_kid + "&a=" + val_a;
            var newOptions=[options[0],options[1],sParams,val_number_of_merchants];//
            //alert('next Params' + sParams);
            _log(3,sParams);
            post("build.php", sParams, handleRequestSendResource2,newOptions);
        }
    }
    _log(3, "<- handleRequestSendResource()");
}

//*****************************************************************
// RESEARCH CALLBACK
//*****************************************************************
function handleRequestResearch(httpRequest, options) {
    _log(3, "-> handleRequestResearch()");
    var aTask = options[0];
    var activateVillageDid = options[1];
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            var sResponse = httpRequest.responseText;
            if(!sResponse) { // error retrieving the response
                printMsg( aLangTasks[aTask[DEF_ATASK_TYPE]] + " " + aTask[DEF_ATASK_OPTIONS] + translate(" was attempted with unknown result."), true );
                return;
            }
            xpath("//form/table[2]//td[1]/img[@class='unit']");
            //var re = new RegExp('<div id="lbau.">.*' + aTask[DEF_ATASK_OPTIONS] + '.*</div>', 'i');
            var iUnit = (iMyRace == 0) ? aTask[DEF_ATASK_OPTIONS] : iMyRace + aTask[DEF_ATASK_OPTIONS];
            var re = new RegExp('<td width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0"></td>', 'i');
            if(sResponse.match(re)) {
                printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ '</span>' + translate("We started researching ") + aLangTroops[iMyRace][aTask[DEF_ATASK_OPTIONS]-1]);
                addToHistory(aTask, true);
            } else {
                printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ '</span>' + aLangTroops[iMyRace][aTask[DEF_ATASK_OPTIONS]-1] + translate(" cannot be researched."), true);
                addToHistory(aTask, false);
            }
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
        if(isInt(activateVillageDid) && activateVillageDid != getActiveVillageId()) 
            switchActiveVillage(activateVillageDid);
    }
    _log(3, "<- handleRequestResearch()");
}

//*****************************************************************
// TRAIN CALLBACK
//*****************************************************************
function handleRequestTrain(httpRequest, options) {
    _log(3, "-> handleRequestTrain()");
    var aTask = options[0];
    var activateVillageDid = options[1];

    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) {
            var sResponse = httpRequest.responseText;
            _log(3, sResponse);
            if(!sResponse) { // error retrieving the response
                printMsg( aLangTasks[aTask[DEF_ATASK_TYPE]] + " " + aTask[DEF_ATASK_OPTIONS] + translate(" was attempted with unknown result."), true );
                return;
            }
            var iUnit = (iMyRace == 0) ? aTask[DEF_ATASK_OPTIONS] : iMyRace + aTask[DEF_ATASK_OPTIONS];
            var troopsInfo = getTroopsInfo(aTask[DEF_ATASK_OPTIONS].split("_"));
            var re = new RegExp('width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0">', 'i');
            //TODO: doesnt work if units are already in training. will be difficult to make his work if units are already in training..
            // currentnumberoftraining should be extendended to include finishing times, and be used correctly
            // getnumberofcurrenttraining() could be used on response text and compared
            
            if(sResponse.match(re) || getOption('currentNumberOfTraining',0)>0) {
                printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ '</span>' + translate("We started training ") + troopsInfo);
                addToHistory(aTask, true);
            } else {
                printMsg('<span class="ttq_village_name" style="display:block;">' +getVillageName(aTask[DEF_ATASK_VILLAGEID])+ '</span>' + troopsInfo + translate(" cannot be trained."), true);
                addToHistory(aTask, false);
            }
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }

        if(isInt(activateVillageDid) && activateVillageDid != getActiveVillageId())
            switchActiveVillage(activateVillageDid);
    }



    _log(3, "<- handleRequestTrain()");
}

// ************************************************************************************************************
// *********  HISTORY STUFF **************************************************************************
// ************************************************************************************************************

var DEF_ERROR_UNKNOWN = 0;
var DEF_ERROR_NOTENOUGHTROOPS = 1;
var DEF_ERROR_VILLAGEDELETED = 2;
var DEF_ERROR_PLAYERBANNED = 3;

var DEF_ATASKHISTORY_TYPE = 0;             // 0-build, 1-upgrade, 2-attack, 3-research, 4-?, 5-send resource
var DEF_ATASKHISTORY_TIME = 1;             // time in absolute secs utc
var DEF_ATASKHISTORY_TARGET = 2;           // building id or village id
var DEF_ATASKHISTORY_OPTIONS = 3;          // depends on type
var DEF_ATASKHISTORY_VILLAGEID = 4;        // source village id
var DEF_ATASKHISTORY_SUCCESS = 5;         // task duration in secs
var DEF_ATASKHISTORY_ERROR = 6;            // number of retries


function addToHistory(aTask, bSuccess, iReason) {

    _log(3, "Adding to history...: " + bSuccess + "@" + formatDateTimeRelative(aTask[DEF_ATASK_TIME]) + "/" + aTask);

    if (!bSuccess)
        tryRescheduleTask(aTask);

    if (aTask[DEF_ATASK_TYPE] == DEF_ATASK_TYPE_ATTACK && bSuccess)
        getMonitoredRallyPoints([aTask[DEF_ATASK_TARGET]]);           

    if (bSuccess && getOption(DEF_OPTION_HISTORY_ONLY_ERROR,false))
        return;

    if(iHistoryLength == 0) {
        return;
    }

    bLockedHistory = true;
    var data = readData(DEF_TTQ_HISTORY);

    var oldValue;
    if(data != '' && data.length > 0) {
        oldValue = trimHistory(data, iHistoryLength-1) + "|";
    } else {
        oldValue = '';
    }

    var newValue = oldValue + aTask[DEF_ATASK_TYPE] + ',' + aTask[DEF_ATASK_TIME] + ',' + aTask[DEF_ATASK_TARGET] + ',' + aTask[DEF_ATASK_OPTIONS];
    
    if(aTask[DEF_ATASK_VILLAGEID]) {
        newValue += ',' + aTask[DEF_ATASK_VILLAGEID];
    } else {
        newValue += ',' + 'null';
    }
    
    if (!iReason)
        iReason = 0;
        
    newValue += ',' + bSuccess + "," + iReason;
    
    _log(3, "Writing data TTQ_HISTORY: "+newValue);
    if(!writeData(DEF_TTQ_HISTORY, newValue)) {
        _log(2, "Failed logging to history.")
    }
    
    bLockedHistory = false;
    aTasks = newValue.split("|");
    refreshHistory(aTasks);
    _log(3, "<-addToHistory()");
    return;
}

/**
* This only trims the value read from cookie. Cookie itself is trimmed when new event is entered into history.
* It trimms the value down to maxlength.
*/
function trimHistory(data, maxlength) {
    if (maxlength < 0)
        return data;

    if(data != '' && data.length > 0) {
        //trim history as needed
        data = data.split("|");
        var excessTasks = data.length - maxlength;
        if(excessTasks >  0) {
            data.splice(0, excessTasks);
        }
        return data.join("|");
    }
    return data;
}

function flushHistory() {
    writeData(DEF_TTQ_HISTORY, "");
    refreshHistory();
}

function refreshHistory(aTasks) {
    _log(3, "Refreshing history...");
    // Remove old history
    var oOldHistory = $("ttq_history");
    if(oOldHistory) {
        document.body.removeChild(oOldHistory)
    }

    //if there are no tasks in the history, return
    if(!aTasks || aTasks.length < 1) {
        return;
    }

    //Create new tasklist
    var oHistory = document.createElement('div');
    oHistory.id = "ttq_history";
    oHistory.innerHTML = "<div id='ttq_history_draghandle' class='handle ttq_draghandle'>"
        +translate("Task History")+"</div>";

    //position the list
    var listCoords = getOption("HISTORY_POSITION", "200px_687px");
    listCoords = listCoords.split("_");
    oHistory.style.top = listCoords[0];
    oHistory.style.left = listCoords[1];

    document.body.appendChild(oHistory);

    makeDraggable($('ttq_history_draghandle'));

    //get the server time offset once
    var iServerTimeOffset;
    if(bUseServerTime) {
        iServerTimeOffset = getServerTimeOffset();
    } else {
        iServerTimeOffset = false;
    }

    for(var i = 0; i < aTasks.length; i++) {
        var aThisTask = aTasks[i].split(",");
        oHistory.appendChild( makeHistoryRow(aThisTask, i, iServerTimeOffset) );
    // var oTaskTimeSpan = $("ttq_history_tasktime_" +i);
    //if(oTaskTimeSpan)
    //   { EventManager.Add(oTaskTimeSpan,"click", editTime, false); }
    }

    orderList(1, "ttq_history_row");

    //flush link
    var oFlushLink = document.createElement('a');
    oFlushLink.id = 'ttq_flush_history';
    oFlushLink.innerHTML = translate('flush history');
    oFlushLink.href = '#';
    oHistory.appendChild(oFlushLink);
    EventManager.Add(oFlushLink,'click', flushHistory, false);
}

function makeHistoryRow(aHistoryTask, index, iServerTimeOffset) {
    _log(3, "-> makeHistoryRow()");
    var oDate;
    var sTime;
    
    if(bUseServerTime && iServerTimeOffset != false) {
        //create timestamp for the tasktime offset to server time
        var iTaskServerTimestamp = ( parseInt(aHistoryTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
        oDate = new Date(iTaskServerTimestamp);
        sTime = oDate.toGMTString();
        sTime = sTime.substring(0, sTime.length - 4);
        sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_history_tasktime_" 
                + index + "' title='This is the server time.'>" + sTime + "</span>";
    } else {  //local time
        oDate = new Date( parseInt(aHistoryTask[DEF_ATASK_TIME]) * 1000 );
        sTime = "<span style='color:black; cursor:pointer;' id='ttq_history_tasktime_" +index+ "' title='This is your local time.'>"   
                 + formatDateTimeRelative(parseInt(aHistoryTask[DEF_ATASK_TIME])) + "</span>";
    }

    var oHistoryRow = document.createElement("div");
    oHistoryRow.id = "ttq_history_row_" +index;
    oHistoryRow.className = "ttq_history_row";
    oHistoryRow.setAttribute("tasktype", aHistoryTask[DEF_ATASKHISTORY_TYPE]);
    oHistoryRow.setAttribute("timestamp", aHistoryTask[DEF_ATASKHISTORY_TIME]);
    oHistoryRow.setAttribute("tasktarget", aHistoryTask[DEF_ATASKHISTORY_TARGET]);
    oHistoryRow.setAttribute("taskoptions", aHistoryTask[DEF_ATASKHISTORY_OPTIONS]);
    oHistoryRow.setAttribute("villagedid", aHistoryTask[DEF_ATASKHISTORY_VILLAGEID]);
    oHistoryRow.setAttribute("success", aHistoryTask[DEF_ATASKHISTORY_SUCCESS]);
    oHistoryRow.setAttribute("error", aHistoryTask[DEF_ATASKHISTORY_ERROR]);

    var sTaskSubject = "";
    var sTask = "";
    var sTaskMoreInfo = "";
    switch(aHistoryTask[DEF_ATASKHISTORY_TYPE]) {
        case "0":  //build
        case "1":  //upgrade
            sTaskSubject = aLangBuildings[aHistoryTask[DEF_ATASKHISTORY_OPTIONS]];
            sTask = aLangTasks[aHistoryTask[DEF_ATASKHISTORY_TYPE]];
            sTaskMoreInfo = translate("at site no.") + " " +aHistoryTask[2];
            break;
        case "2":  //attack
            sTaskSubject = '<span id="ttq_placename_history_' +aHistoryTask[2]+ '">' + getPlaceName(aHistoryTask[2]) + '</span>';
            if(sTaskSubject == '') {
                sTaskSubject = aHistoryTask[2]
            }
            var aTroops = aHistoryTask[DEF_ATASKHISTORY_OPTIONS].split("_");
            if(onlySpies(aTroops)) {
                sTask = translate("Spy");
            } else {
                var iIndex = parseInt(aTroops[0]) + 18;
                if(iIndex == 20) sTask = translate('Support');
                if(iIndex == 21) sTask = translate('Attack');
                if(iIndex == 22) sTask = translate('Raid');
            }
            sTaskMoreInfo = getTroopsInfo(aTroops);
            break;
        case "3":  //research
            sTaskSubject = aLangTroops[iMyRace][aHistoryTask[DEF_ATASKHISTORY_OPTIONS]-1];
            sTask = aLangTasks[aHistoryTask[DEF_ATASKHISTORY_TYPE]];
            break;
        case "4":
            sTaskSubject = getTroopsInfo(aHistoryTask[DEF_ATASKHISTORY_OPTIONS].split("_"));
            sTask = aLangTasks[4];
        default:
            break;
    }
    
    var bSuccess = aHistoryTask[DEF_ATASKHISTORY_SUCCESS] == "true";
    
    // give some error explanation
    var sReason = '';
    if (!bSuccess) {
        var iError = parseInt(aHistoryTask[DEF_ATASKHISTORY_ERROR]);
        switch(iError) {
            case DEF_ERROR_NOTENOUGHTROOPS:
                sReason = "It seems that no troops were available.";
            break
            case DEF_ERROR_VILLAGEDELETED:
                sReason = "It seems that the village was deleted.";
            break;
            case DEF_ERROR_PLAYERBANNED:
                sReason = "It seems that the player was temporarily banned.";
            break;
            default:
                sReason = "Unknown Error #" + iError;
            break;
        }
    }
    
    var sBgColor = (bSuccess) ? "#90FF8F" : "#FFB89F";
    oHistoryRow.style.backgroundColor = sBgColor;

    var sVillageName = '';
    if(aHistoryTask[DEF_ATASKHISTORY_VILLAGEID] != 'null') {
        sVillageName = " &mdash; " +getVillageName(aHistoryTask[DEF_ATASKHISTORY_VILLAGEID]);
    }

    oHistoryRow.innerHTML = "<span class='ttq_time_village_wrapper' style='display:inline !important;' title='"+sReason+"'>" +sTime + "<span class='ttq_village_name'>" +sVillageName+ "</span>" + ":</span> <span title='" +sTaskMoreInfo+ "' style='cursor:help;' >" +sTask+ " " +sTaskSubject+ " </span></span>";

    oDate = null;

    return oHistoryRow;
}


// ************************************************************************************************************
// *********  RETRY/REPEAT           **************************************************************************
// ************************************************************************************************************

// adds task to reschedule array, decreases retry counter, and erases repeat information for this one retry (otherwise repeats would be doubled) 
function tryRescheduleTask(aTask) {

    _log(3,'-> tryRescheduleTask()\n' + aTask2String(aTask));
    
    // copy
    aTask = aTask.join(',').split(','); 
    
    var iTaskTime;
    var retry = parseInt(aTask[DEF_ATASK_RETRY]);
    var retryInterval = parseInt(aTask[DEF_ATASK_RETRYINTERVAL]);

    if (!isInt(retry) || retry <= 0 || isNaN(retry)) {
        _log(2,'No retries left for task.');
        return false;
    }
    
    if (retryInterval == -1) {// push to end
        iTaskTime = getEndOfTheLastScheduledTask(aTask[DEF_ATASK_TYPE]);        
    } else {
        var oDate = new Date();  // current GMT date. TODO: server time
        iTaskTime = parseInt(oDate.getTime()/1000 + retryInterval);
    }
    
    _log(3,'Rescheduling at ' + formatDateTimeRelative(iTaskTime));

    aTask[DEF_ATASK_RETRY]--;
    aTask[DEF_ATASK_TIME] = iTaskTime;
    aTask[DEF_ATASK_REPEAT_NUM] = 0;
    aTask[DEF_ATASK_REPEAT_LASTEXEC] = '';
    
    //var succ = setTask(aTask,true,true); locked problems
    aTasksToSchedule.push(aTask);
    
    return true;
}


function getRepeatedTask(aTask) {
    _log(3,'-> getRepeatedTask()' + aTask2String(aTask));
    
    //copy aTask;
    aTask = aTask.join(',').split(',');
    
    var bRepeatByNum = aTask.length >= DEF_ATASK_REPEAT_NUM + 1 && aTask[DEF_ATASK_REPEAT_NUM] != 0;
    var bRepeatByLastExec = aTask.length >= DEF_ATASK_REPEAT_LASTEXEC + 1 && aTask[DEF_ATASK_REPEAT_LASTEXEC] != '';
    
    if (!(bRepeatByNum || bRepeatByLastExec)) {
        _log(3,'No repeating set for this task.');
        return false;
    }
    
    var iTaskTime = parseInt(aTask[DEF_ATASK_TIME]);
    var randval = Math.ceil(aTask[DEF_ATASK_REPEAT_RANDADD] * Math.random());
    var interval = parseInt(aTask[DEF_ATASK_REPEAT_INTERVAL]);
    
    // check for lags
    var iNow = new Date();
    iNow = Math.floor(iNow.getTime()/1000);
    var iLagSecs = iNow - iTaskTime;
    if (iLagSecs > 10) {
        _log(3,'Task lagging by ' + iLagSecs + ' seconds, using current time as task time for repeat base.');
        iTaskTime = iNow;
    } else
        _log(3,'Task lagging by ' + iLagSecs + ' seconds, using task time for repeat base.');
        
    // calculate new task time
    iTaskTime = iTaskTime + interval + randval;
    iTaskTimeNoRand = iTaskTime + interval;
    
    if (bRepeatByNum) {
        if (aTask[DEF_ATASK_REPEAT_NUM] > 0)
            aTask[DEF_ATASK_REPEAT_NUM]--;
        // else infinite
        _log(3,'Repeat by number. Repeats left after this:' + aTask[DEF_ATASK_REPEAT_NUM]);
    } else {
        if (iTaskTimeNoRand > aTask[DEF_ATASK_REPEAT_LASTEXEC]) {
            _log(3,'Repeat by last exec. No scheduling possible, even without random.');
            return false;
        } else { 
            if (iTaskTime > aTask[DEF_ATASK_REPEAT_LASTEXEC]) {
                _log(3,'Repeat by last exec. Scheduling possible but skipping random.');
                iTaskTime = iTaskTimeNoRand;
            } else {
               _log(3,'Repeat by last exec OK.'); 
            }
        }
    }
    
    aTask[DEF_ATASK_TIME] = iTaskTime;
    
    _log(3,'Repeating at ' + formatDateTimeRelative(iTaskTime));
    
    return aTask;
}

/**
 * @iTask Type of The Task, this will retrieve the Estimated Time of the Last Scheduled Task
 */
function getEndOfTheLastScheduledTask(iTask,villagedid){
    var data = readData(DEF_TTQ_TASKS);
    var Tasks = data.split("|");
    var endOfLastScheduledTask = (new Date()).getTime()/1000+30;// Delay between the instance you programmed it and the execution of the task
    //alert('Cityt Id' + villagedid);
    for (var i =0;i<Tasks.length;i++){
        // ParamÃƒÆ’Ã‚Â¨tres
        var params = Tasks[i].split(",");
        // On rÃƒÆ’Ã‚Â©cupÃƒÆ’Ã‚Â¨re le type de la tache
        var iTaskType = parseInt(params[0]);
        var iTaskTime = parseInt(params[1]);
        var iCityId = parseInt(params[4]); // Id of the village so that it is on the same village which it is calculated
        var iDuration = parseInt(params[5]);// Duration in Msec
        // C'est le mÃƒÆ’Ã‚Âªme type de tÃƒÆ’Ã‚Â¢che
        // et que nous avons un village Identique alors on prend la derniÃƒÆ’Ã‚Â¨re heure sinon on prend l'heure courante
        //case "0":  //build
        //case "1":  //upgrade
        //case "2":  //attack
        //case "3":  //research
        //case "4":  //training
        //case "5": //send Ressource in a delayed time
        if((iTaskType==iTask || iTaskType==0 && iTask==1 || iTaskType==1 && iTask==0) && (iCityId==villagedid || villagedid==false)){
            if (endOfLastScheduledTask < iTaskTime + iDuration + 30){
                endOfLastScheduledTask = iTaskTime + iDuration + 30;
            }
        }
    }
    return endOfLastScheduledTask;
}

// ************************************************************************************************************
// *********  Berichte Clear Feature **************************************************************************
// ************************************************************************************************************
    
// this is main check function
function berichteMain() {


    // get cached reports
    getReportsToGet();
    
    // look for new reports
    if (isHaveNewBericht())
        readAllBerichte();

    // show stats    
    refreshStatsDiv();
    
    // show recon
    refreshReconDiv();
            
}

function isHaveNewBericht() {
    //<img usemap="#nb" src="img/un/l/m3.gif" id="n5"/>
    
    var im = xpath("//img[@id='n5']");
    if (im.snapshotLength==1) {
        im = im.snapshotItem(0).getAttribute('src');
        reboth = /m1\.gif/;
        reonlyberichte = /m3\.gif/;
        return reboth.test(im) || reonlyberichte.test(im);
    }
    return false;
}

//TODO: read only berichte that have targets that are in the queue (problem: how to determine then if new reports are available?)
function readAllBerichte() {
    
    if (!getOption(DEF_OPTION_REPORTS_CLEAR,false))
        return
        
    // get http://w*.travian.de/berichte.php
    // find all http://w*.travian.de/berichte.php?id=4570546
    _log(2,'Looking for reports to clear.');
    
    // look for new reports    
    get('http://' + getServerName() + "/berichte.php", handleGetBerichtepage, 0);       
}

// gets first berichte page, reads all berichte to handlegetreport(), and loads firther berichte pages if still not all read
function handleGetBerichtepage(httpRequest,options) {
    //<td class="s7"><a href="berichte.php?id=4571653">.01. godspeed greift Eishöhle an</a> (neu)</td>
    if (httpRequest.readyState == 4) {
        _log(3, "-> handleGetBerichtepage()");
        if (httpRequest.status == 200) {

            var sResponse = httpRequest.responseText;

            if (false) { //testing
                var re = /<td class=\"s7\"><a href=\"berichte\.php\?id=[0-9]*\">.*<\/a>\s*<\/td>/ig;
                var matchtest = sResponse.match(re);
                
                if (matchtest && matchtest.length > 0) {
                    var id = matchtest[1].match(/id=[0-9]*/)[0].replace(/id=/,'');
                    _log(3,matchtest[1] + "->" + id);
                    _log(2,'Getting Bericht ' + id);
                    get('http://' + getServerName() + '/berichte.php?id=' + id,handleGetReport,id);
                }   
            }
            //var 
            //while(true) {                                
                //new RegExp('/berichte\.php\?id=[0-9]*/','i');
                //var re = new RegExp('width="\.%"><img class="unit" src="\[^"\]*img/un/u/' +iUnit+ '.gif" border="0">', 'i');
             //   break;
            //}
            //var s='<input type="hidden" name="a" value="48637">';
            //alert(s.match(/\"[0-9]*\"/));
            //var dummyDiv = makeDummyDiv(sResponse);
            //var a = xpath("//a[contains(@href,'berichte.php?id=')]/..",dummyDiv);
           // var re = new RegExp('/berichte\.php\?id=[0-9]*/','i');
            var berichtetds = sResponse.match(/<td class=\"s7\"><a href=\"berichte\.php\?id=[0-9]*\">.*<\/a>\s\(neu\)<\/td>/ig);                        
            if (berichtetds && berichtetds.length > 0) {
                _log(2,'Found ' + berichtetds.length + ' new reports on page ' + options/10);
                var id;
                for (i=0;i<berichtetds.length;i++) {
                    
                    id = berichtetds[i].match(/id=[0-9]*/)[0].replace(/id=/,'');
                    
                    if (isReportToGet(id))
                        continue;
                    
                    _log(2,berichtetds[i] + "->" + id);                    
                                        
                    if (/>.* greift .* an</.test(berichtetds[i])) {
                                            
                        registerReportToGet(id);
                        _log(2,'Clearing bericht ' + id + " and adding.");                    
                        get('http://' + getServerName() + '/berichte.php?id=' + id, handleGetReport, id);
                        
                    } else { 
                        if (/>.* beliefert .*</.test(berichtetds[i]))                    
                            _log(2,'Clearing bericht ' + id + ', but not adding since its a trade report.');                        
                        else
                            _log(2,'Clearing bericht ' + id + ', but not adding since its some unknown report type.');
                        
                        get('http://' + getServerName() + '/berichte.php?id=' + id, null, null);
                    
                    }
                }
                if (berichtetds.length == 10) {

                    var wait = 3000 + Math.random()*2000;
                    _log(2,'Page was full, going to page ' + (options+10) + ' in ' + round(wait/1000,1) + ' seconds');

                    window.setTimeout( function() {
                        get('http://' + getServerName() + "/berichte.php?s="+ (options+10), handleGetBerichtepage, options+10);                       
                        }, wait);

                }else {
                    _log(2,'Done getting Berichte');
                    renone = /m4\.gif/;
                    reonlymsg = /m2\.gif/;
                    reboth = /m1\.gif/;
                    reonlyberichte = /m3\.gif/;
                    var im = xpath("//img[@id='n5']");
                    if (im.snapshotLength==1) {
                        im = im.snapshotItem(0);
                        src = im.getAttribute('src');
                        if (reboth.test(src))
                            im.setAttribute('src',src.replace(reboth,'m2.gif'));
                        if (reonlyberichte.test(src))
                            im.setAttribute('src',src.replace(reonlyberichte,'m4.gif'));
                    }
                        
                }
            } else {
                _log(2,'Nothing to clear on page, going to: ' + (options+10));
                //TODO: check image in html page if still new berichte there to prevent flooding
                
                get('http://' + getServerName() + "/berichte.php?s="+ (options+10), handleGetBerichtepage, options+10);
            }
           
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
        
        _log(3, "<- handleGetBerichtepage()");
        return;
    }
}

// remember which records still need to be inserted
function registerReportToGet(id) {
    _log(2,'Register of still-to-get Report ' + id + ' requested.'); 
    var reportsToGet = readData(DEF_DATA_REPORTSTOGET);

    // make proper array
    if (reportsToGet == '')
        reportsToGet = new Array();
    else
        reportsToGet = reportsToGet.split(',');
    
    // search for id, and if not found, add, save
    if (reportsToGet.indexOf(id) == -1) {
        reportsToGet.push(id);
        writeData(DEF_DATA_REPORTSTOGET,reportsToGet.join(','));   
        _log(2,'Register of still-to-get Report ' + id + ' successful.'); 
    } else
        _log(2,'Register of still-to-get Report ' + id + ' not possible since it is already registered.'); 
}

// remove report from list
function unregisterReportToGet(id) {
    _log(2,'Unregister of still-to-get Report ' + id + ' requested.'); 
    var reportsToGet = readData(DEF_DATA_REPORTSTOGET);

    // nothing to do
    if (reportsToGet == '') {
        _log(2,'Unregister of still-to-get Report ' + id + ' not possible since list is empty.'); 
        return;
    }
    // arrayify
    reportsToGet = reportsToGet.split(',');
    
    // search, and if found, remove, save
    var i = reportsToGet.indexOf(id);
    if (i != -1) {
        reportsToGet.splice(i,1);
        writeData(DEF_DATA_REPORTSTOGET,reportsToGet.join(','));   
        _log(2,'Unregister of still-to-get Report ' + id + ' successful.');         
    } else
        _log(2,'Unregister of still-to-get Report ' + id + ' not possible since it was not found in list.'); 
}

// get those reports
function getReportsToGet() {
    var reportsToGet = readData(DEF_DATA_REPORTSTOGET);

    if (reportsToGet == '')
        return;

    reportsToGet = reportsToGet.split(',');

    _log(2,'Getting ' + reportsToGet.length + ' still-to-get Reports.');         
    for (i=0;i<reportsToGet.length;i++) {       
        _log(2,'Getting still-to-get Report ' + reportsToGet[i]);                 
        get('http://' + getServerName() + '/berichte.php?id=' + reportsToGet[i], handleGetReport, reportsToGet[i]);    
    }
    
}

function isReportToGet(id) {
    _log(2,'Checking if is still-to-get Report ' + id + '.'); 
    var reportsToGet = readData(DEF_DATA_REPORTSTOGET);

    // make proper array
    if (reportsToGet == '')
        reportsToGet = new Array();
    else
        reportsToGet = reportsToGet.split(',');
    
    // search for id, and if not found, add, save
    return reportsToGet.indexOf(id) != -1;
        
}

function handleGetReport(httpRequest,id) {
    //_log(2,"handleGetReport: state/status = " + httpRequest.readyState + "/" + httpRequest.status);
    if (httpRequest.readyState == 4) {
     
        if (httpRequest.status == 200) {

            var sResponse = httpRequest.responseText;
            
            var aReport = parseReport(sResponse,id);
            
            addAReportLocal(aReport);            

            if (getOption(DEF_OPTION_UPLOADOWN,false))
                addAReportServer(aReport);
        
            //TODO: prevent partially commited reports. record each getting step and undo on unsuccessful commit
            unregisterReportToGet(id);
                        
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
        
        return;
    }
}

var displayReportPageDetails = false;
var uploadReportPage = false;

function checkForReportsPage() {
//        get('http://' + getServerName() + '/berichte.php?id=5144422',handleViewGet,5144422)

    if (!(/berichte\.php/.test(document.location)))
        return false;
        
    var loc = document.location + "";
    var id = loc.match(/id\=(\d*)/);
    if (!id)
        return;

    get('http://' + getServerName() + '/berichte.php?id='+id[1],handleViewGet,[id[1],displayReportPageDetails])

}

function handleViewGet(httpRequest,options) {  
    if (httpRequest.readyState == 4) {
     
        if (httpRequest.status == 200) {

            _log(3,"handleViewGet: " + options);

            // options
            var id = options[0];
            var display = options[1];
            if (options.length > 2)
                var forceUpload = options[2];
            else
                var forceUpload = false;    

            // get response
            var sResponse = httpRequest.responseText;
            
            var aReport = parseReport(sResponse,id);

            if (display) {              
                var div = document.createElement('div');
                //div.setAttribute('style',"position:absolute;left:100px;top:100px;");
                div.innerHTML = aReport2HRString(aReport).replace(/\n/g,"<br>");
                document.getElementById('lmid2').appendChild(div);  
            }

            if (uploadReportPage || forceUpload) {
                addAReportServer(aReport,display?div:null);                    
            }
            
            addAReportLocal(aReport);
                
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
        
        return;
    }
}

function addAReportServer(aReport, div) {
    
    _log(3,'Sending to server:');
    _log(3,aReport2String(aReport));
    
    getServer(DEF_SERVER_BASE + '/reports/upload/plain?kb=' + aReport2String(aReport), handleAddAReportToServer, div);
        
    
}

var Successful = 0;
var AllreadyExisted = 1;
var FailedSystem = 2;
var FailedIncorrectFormat = 3;
var FailedNotEnoughData = 4;

function handleAddAReportToServer(sResponse, div) {  
                   
    _log(2,sResponse);
    re = /(\d)\s*- .*/;    
    
    if (!div)
        return;
    
    var span = document.createElement('span');
    span.innerHTML = "---------- Server Response ----------<br>" + sResponse;    
    
    var lmid = $('lmid2');
    if (lmid)
        lmid.insertBefore(span,lmid.firstChild);
    else {
        div.parentNode.insertBefore(span,div.nextSibling);
    }

    return;
} 

// ****************************************************
// PARSING FUNCTIONS
// ****************************************************

//*=fully implemented
var DEF_AREPORT_ID = 0;          // *int
var DEF_AREPORT_TIME = 1;        // *int, seconds since 1.1.1970 00:00:00 GMT, javascript Date().getTime()/1000

var DEF_AREPORT_ATT_UID = 2;     // *int, 
var DEF_AREPORT_ATT_DID = 3;     // *int, 
var DEF_AREPORT_ATT_UNITS = 4;   // *array(11), _
var DEF_AREPORT_ATT_LOST = 5;    // *array(11), _
var DEF_AREPORT_ATT_RES = 6;     // *array(4), _

var DEF_AREPORT_DEF_UID = 7;     // *int
var DEF_AREPORT_DEF_DID = 8;     // *int
var DEF_AREPORT_DEF_UNITS = 9;   // *array(11), _, wenn undefined dann is es nicht sichtbar (selber der angreifer)
var DEF_AREPORT_DEF_LOST = 10;   // *array(11), _, -.-

var DEF_AREPORT_VIEWER = 11;     // *int

var DEF_AREPORT_ATT_TRIBE = 12;     // *int, 
var DEF_AREPORT_DEF_TRIBE = 13;     // *int
    var DEF_AREPORT_TRIBE_ROMANS = 0;
    var DEF_AREPORT_TRIBE_TEUTONS = 1;
    var DEF_AREPORT_TRIBE_GAULS = 2;
    var DEF_AREPORT_TRIBE_NATURE = 3;
    var DEF_AREPORT_TRIBE_NATAR = 4;
    var DEF_AREPORT_TRIBE_UNKNOWN = -1;

var DEF_AREPORT_ATT_TYPE = 14;      // *int
    var DEF_AREPORT_ATT_TYPE_SUPPORT = 0;   // 
    var DEF_AREPORT_ATT_TYPE_ATTACK = 1;    // unterscheidung attack/raid scheint sinnlos da auch bei attacks beute mitgenommen wird. selbst versucht..
    var DEF_AREPORT_ATT_TYPE_RAID = 2;      // attack is es nur dann (ziemlich) sicher wenn von einer seite alle tot sind
    var DEF_AREPORT_ATT_TYPE_SPY_RES = 3;   //
    var DEF_AREPORT_ATT_TYPE_SPY_DEF = 4;   //
    var DEF_AREPORT_ATT_TYPE_FREE = 5;      //
    var DEF_AREPORT_ATT_TYPE_SUPPORT_ATTACKED = 6; // here, ATT_UID is supporter in city ATT_DID. units ATT_UNITS, lost ATT_LOST
    var DEF_AREPORT_ATT_TYPE_SEND = 7;      // just for completeness, is not parsed or sent..
    var DEF_AREPORT_ATT_TYPE_UNKNOWN = -1;  // 

var DEF_AREPORT_ATT_CAPTURED = 15;       // *array(11), number of captured

// empty if not only spies attacked (i.e. DEF_AREPORT_ATT_TYPE == {3,4}) or all spies died
var DEF_AREPORT_SPY_INFO_RES = 16;      // *array(4), _
var DEF_AREPORT_SPY_INFO_DEF = 17;      // array(number of buildings that can be reported[residenz, palast, stadtmauer,..?])

// empty if no chief/cata attacked (if they all died there are still numbers there, but before=after)
var DEF_AREPORT_CATA_INFO = 18;         // array(array(3),array(3)),_  array(3)=[target_building_id,level_before,level_after]
var DEF_AREPORT_CHIEFTAIN_INFO = 19;    // array(2),_ = [zustimmung before,after]

var DEF_AREPORT_DEF_UNITS_ROMANS = 20;    // *array(11),_
var DEF_AREPORT_DEF_LOST_ROMANS = 21;     // *array(11),_
var DEF_AREPORT_DEF_UNITS_TEUTONS = 22;   // *array(11),_
var DEF_AREPORT_DEF_LOST_TEUTONS = 23;   // *array(11),_
var DEF_AREPORT_DEF_UNITS_GAULS = 24;     // *array(11),_
var DEF_AREPORT_DEF_LOST_GAULS = 25;     // *array(11),_

//internal
var DEF_AREPORT_NDEFS = 26;

function createDummyDiv(html) {
    var div = document.createElement("div");
    div.innerHTML = html;
    
    var toRemove = ['title','link','meta','script','map'];

    toRemove.forEach(function (tag) {
        _log(4,tag);
        var coll = div.getElementsByTagName(tag);
        _log(4,coll);
        coll = coll.wrappedJSObject;
        _log(4,coll);
        if (!coll)
            return;
        _log(4,coll.length);
        var l = coll.length;
        for(var i=0; i<l; i++) {
            _log(4,coll[0]);
            coll[0].parentNode.removeChild(coll[0]); 
        }
     });

    return div;
}


function aReport2HRString(aReport) {
    var s = "\n";
    s += "---------- REPORT ----------------\n";
    s += "id:      " + aReport[DEF_AREPORT_ID] + "\n";
    s += "link:    " + 'http://' + getServerName() + "/berichte.php?id=" + aReport[DEF_AREPORT_ID] + "\n";
    s += "time:    " + formatDateTimeRelative(aReport[DEF_AREPORT_TIME]) + "\n";
    s += "viewer:  " + aReport[DEF_AREPORT_VIEWER] + "\n";
    s += "atttype: " + getAttackType(aReport[DEF_AREPORT_ATT_TYPE]) + "\n";
    s += "---------- ATTACKER --------------\n";
    s += "auid:    " + aReport[DEF_AREPORT_ATT_UID] + "\n";
    s += "adorf:   " + getPlaceName(aReport[DEF_AREPORT_ATT_DID]) + "\n";
    s += "atribe:  " + getTribe(aReport[DEF_AREPORT_ATT_TRIBE]) + "\n";
    s += "aunits:  " + getTroopsInfo(aReport[DEF_AREPORT_ATT_UNITS],1,true,aReport[DEF_AREPORT_ATT_TRIBE]) + "\n";
    s += "alost:   " + getTroopsInfo(aReport[DEF_AREPORT_ATT_LOST],1,true,aReport[DEF_AREPORT_ATT_TRIBE]) + "\n";
    s += "captured:" + getTroopsInfo(aReport[DEF_AREPORT_ATT_CAPTURED],1,true,aReport[DEF_AREPORT_ATT_TRIBE]) + "\n";
    s += "bounty:  " + getResInfo(aReport[DEF_AREPORT_ATT_RES]) +"\n";
    s += "resinfo: " + getResInfo(aReport[DEF_AREPORT_SPY_INFO_RES]) + "\n";    
    s += "---------- DEFENDER --------------\n";
    s += "duid:    " + aReport[DEF_AREPORT_DEF_UID] + "\n";
    s += "ddorf:   " + getPlaceName(aReport[DEF_AREPORT_DEF_DID]) + "\n";
    s += "dtribe:  " + getTribe(aReport[DEF_AREPORT_DEF_TRIBE]) + "\n";
    s += "dunits:  " + getTroopsInfo(aReport[DEF_AREPORT_DEF_UNITS],1,true,aReport[DEF_AREPORT_DEF_TRIBE]) + "\n";
    s += "dlost:   " + getTroopsInfo(aReport[DEF_AREPORT_DEF_LOST],1,true,aReport[DEF_AREPORT_DEF_TRIBE]) + "\n";
    s += "---------- SUPPORT --------------\n";
    s += "units ro:" + getTroopsInfo(aReport[DEF_AREPORT_DEF_UNITS_ROMANS],1,true,0) + "\n";
    s += "lost ro: " + getTroopsInfo(aReport[DEF_AREPORT_DEF_LOST_ROMANS],1,true,0) + "\n";
    s += "units te:" + getTroopsInfo(aReport[DEF_AREPORT_DEF_UNITS_TEUTONS],1,true,1) + "\n";
    s += "lost te: " + getTroopsInfo(aReport[DEF_AREPORT_DEF_LOST_TEUTONS],1,true,1) + "\n";
    s += "units ga:" + getTroopsInfo(aReport[DEF_AREPORT_DEF_UNITS_GAULS],1,true,2) + "\n";
    s += "lost ga: " + getTroopsInfo(aReport[DEF_AREPORT_DEF_LOST_GAULS],1,true,2) + "\n";
    s += "---------- Stringified --------------\n";
    s += aReport2String(aReport) + "\n";
    s += "---------- Stringified(14) --------------\n";
    s += aReport2String(aReport,true) + "\n";
    s += "---------- Roundtrip --------------\n";
    var round = aReport2String(string2AReport(aReport2String(aReport)));
    s += (round==aReport2String(aReport)?"same":round) + "\n";
    s += "length of aReport: " + aReport.length + "\n";
    s += "length of aReport2String(aReport).split(','): " + aReport2String(aReport).split(',').length + "\n";

    return s;
}

function getTribe(t) {
    switch (t) {
        case DEF_AREPORT_TRIBE_ROMANS: return "Romans";
        case DEF_AREPORT_TRIBE_TEUTONS: return "Teutons";
        case DEF_AREPORT_TRIBE_GAULS: return "Gauls";
        case DEF_AREPORT_TRIBE_NATURE: return "Nature";
        case DEF_AREPORT_TRIBE_NATAR: return "Natar";        
        case DEF_AREPORT_TRIBE_UNKNOWN: 
        default: return "Unknown";
    }
}

function getAttackType(t) {
    switch (t) {
        case DEF_AREPORT_ATT_TYPE_SUPPORT: return "Support";
        case DEF_AREPORT_ATT_TYPE_ATTACK: return "Attack";
        case DEF_AREPORT_ATT_TYPE_SPY_RES: return "Spy Res";
        case DEF_AREPORT_ATT_TYPE_SPY_DEF: return "Spy def";
        case DEF_AREPORT_ATT_TYPE_FREE: return "Freeing";        
        case DEF_AREPORT_ATT_TYPE_SEND: return "Trade"; 
        case DEF_AREPORT_ATT_TYPE_SUPPORT_ATTACKED: return "Support Attacked"; 
        case DEF_AREPORT_ATT_TYPE_UNKNOWN: 
        default: return "Unknown";
    }
}

// parses a report html page and returns an array
function parseReport(html,id) {
    _log(2,"Parsing " + id);

    var logLevel = 3;   

    var ddiv = createDummyDiv(html);
    
    var aReport = new Array();  

    aReport[DEF_AREPORT_ID] = id; 

    var betreff = xpath("//td[contains(text(),'Betreff')]/../td[2]",ddiv).snapshotItem(0).textContent;
    
    reBet = new Array();    
    reBet[DEF_AREPORT_ATT_TYPE_SUPPORT] = /^(.*) unterstützt (.*)$/;
    reBet[DEF_AREPORT_ATT_TYPE_ATTACK] = /^(.*) greift (.*) an$/;  // auch raid, später unterscheiden
    reBet[DEF_AREPORT_ATT_TYPE_SPY_RES] = /^(.*) späht (.*) aus$/; // auch spy_def, später
    reBet[DEF_AREPORT_ATT_TYPE_SEND] = /^(.*) beliefert (.*)$/
    reBet[DEF_AREPORT_ATT_TYPE_SUPPORT_ATTACKED] = /^Unterst(\.|ützung) in (.*) wurde angegriffen$/;
                                                  
    var subjectName;
    var objectName;    
    for (var i=0; i<reBet.length; i++) {
        var m = betreff.match(reBet[i]);
        if (m && m.length > 0) {
            aReport[DEF_AREPORT_ATT_TYPE] = i;
            subjectName = m[1];
            objectName = m[2];
            break;
        }
    }    
    _log(logLevel,'type=' + aReport[DEF_AREPORT_ATT_TYPE] + ": " + subjectName + "->" + objectName);
    
    //var gesendet = xpath("//td[contains(text(),'Gesendet')]/../td[2]",ddiv).snapshotItem(0).textContent;    
    aReport[DEF_AREPORT_TIME] = getDateTime(html); 
    
    // get viewer
    var viewer = xpath("id('navi_table')//a[contains(@href,'spieler.php')]",ddiv).snapshotItem(0);
    aReport[DEF_AREPORT_VIEWER] = getParamFromUrl(viewer.getAttribute('href'),'uid');    

    // get troop tables
    var tables = xpath("//div[@id='lmid1']//table//table", ddiv, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var nparties = tables.snapshotLength;
    _log(logLevel,"parties: " + nparties);
   
    aReport[DEF_AREPORT_ATT_UID] = getParamFromUrl(xpath("id('lmid1')//a[contains(@href,'spieler.php')]",ddiv).snapshotItem(0).getAttribute('href'),'uid');
    var attDorfUrl = xpath("id('lmid1')//a[contains(@href,'karte.php')]",ddiv).snapshotItem(0).getAttribute('href');
    aReport[DEF_AREPORT_ATT_DID] = getParamFromUrl(attDorfUrl,'d');
    
    setKarteCode(aReport[DEF_AREPORT_ATT_DID],getParamFromUrl(attDorfUrl,'c'));

    if (nparties > 1 && xpath("id('lmid1')//a[contains(@href,'spieler.php')]", ddiv).snapshotLength > 1) {
        //TODO: 5669667 deleted player: Fehler: xpath("id('lmid1')//a[contains(@href,'spieler.php')]", ddiv).snapshotItem(1) is null
        aReport[DEF_AREPORT_DEF_UID] = getParamFromUrl(xpath("id('lmid1')//a[contains(@href,'spieler.php')]",ddiv).snapshotItem(1).getAttribute('href'),'uid');
        var defDorfUrl = xpath("id('lmid1')//a[contains(@href,'karte.php')]",ddiv).snapshotItem(1).getAttribute('href');
        aReport[DEF_AREPORT_DEF_DID] = getParamFromUrl(defDorfUrl,'d');     
        setKarteCode(aReport[DEF_AREPORT_DEF_DID],getParamFromUrl(defDorfUrl,'c'));           
    } else {
        aReport[DEF_AREPORT_DEF_DID] = '';
        aReport[DEF_AREPORT_DEF_UID] = '';
    } 

    if (aReport[DEF_AREPORT_ATT_TYPE] == DEF_AREPORT_ATT_TYPE_SEND) {
        _log(logLevel-1,aReport2HRString(aReport));
        return null;
    }
    

    // get rows
    var einheiten = xpath("id('lmid1')//td[contains(text(),'Einheiten')]/..",ddiv);
    _log(logLevel,'Have ' + einheiten.snapshotLength + ' einheiten rows');
    var verluste = xpath("id('lmid1')//td[contains(text(),'Verluste')]/..",ddiv);
    _log(logLevel,'Have ' + verluste.snapshotLength + ' verluste rows');
    var gefangene = xpath("id('lmid1')//td[contains(text(),'Gefangene')]/..",ddiv);
    _log(logLevel,'Have ' + gefangene.snapshotLength + ' gefangene rows');

    var angreifertr = xpath("id('lmid1')//td[contains(text(),'Angreifer')]/..",ddiv);
    _log(logLevel,'Have ' + angreifertr.snapshotLength + ' angreifer rows');
    var verteidigertr = xpath("id('lmid1')//td[contains(text(),'Verteidiger')]/..",ddiv);
    if (verteidigertr.snapshotLength == 0)
        verteidigertr = xpath("id('lmid1')//span[contains(text(),'Verteidiger')]/../..",ddiv);
    _log(logLevel,'Have ' + verteidigertr.snapshotLength + ' verteidiger rows');

    var tribes = xpath("id('lmid1')//tr[contains(@class,'unit')]",ddiv);
    _log(logLevel,'Have ' + tribes.snapshotLength + ' troops rows');

    var tabletribes = new Array();   
    aReport[DEF_AREPORT_ATT_TRIBE] = getTribeFromImg(tribes.snapshotItem(0).innerHTML);
    _log(logLevel,'ATT_TRIBE: ' + aReport[DEF_AREPORT_ATT_TRIBE]);

    tabletribes[0] = aReport[DEF_AREPORT_ATT_TRIBE];
    for (var i=1;i<nparties;i++)
        tabletribes[i] = getTribeFromImg(tribes.snapshotItem(i).innerHTML);
    
    _logArray(logLevel,tabletribes,'tabletribes');

    var infoxp = xpath("//td[text()='Info']/../td[2]",ddiv);    
    var info = new Array();
    var noneReturned = false;
    for (var i=0;i<infoxp.snapshotLength;i++) {
        info.push(infoxp.snapshotItem(i).textContent);
        _log(logLevel,"Info: " + info[i]);
        
        if (/Keiner deiner .* ist zurückgekehrt/.test(info[i])) // .* == späher/soldaten
            noneReturned = true;

        if (/Du hast \d* eigene Einheiten befreit/.test(info)) {
            aReport[DEF_AREPORT_ATT_TYPE] = DEF_AREPORT_ATT_TYPE_FREE;
            
        }
    }

    _log(logLevel,'nonereturned = ' + noneReturned);
    

    var beutexp = xpath("//td[text()='Beute']/../td[2]",ddiv);            
    if (beutexp.snapshotLength > 0) {
        var m = beutexp.snapshotItem(0).textContent.split(' ');
        aReport[DEF_AREPORT_ATT_RES] = m;
        _log(logLevel,"Beute: " + m.join('|'));
    }
    
    var rohstoffexp = xpath("//td[text()='Rohstoffe']/../td[2]",ddiv);
    if (rohstoffexp.snapshotLength > 0) {
        var m = rohstoffexp.snapshotItem(0).textContent.split(' ');
        aReport[DEF_AREPORT_SPY_INFO_RES] = m;
        aReport[DEF_AREPORT_ATT_TYPE] = DEF_AREPORT_ATT_TYPE_SPY_RES;

        _log(logLevel,"Rohstoffe: " + m.join('|'));
    }

    var haveAttackerLost = false;  // can happen that all got captured, then no lost tr for attacker, have to shift
    var isSpyReport = (aReport[DEF_AREPORT_ATT_TYPE] == DEF_AREPORT_ATT_TYPE_SPY_RES) || (aReport[DEF_AREPORT_ATT_TYPE] == DEF_AREPORT_ATT_TYPE_SPY_DEF);
    _log(logLevel,'isSpyReport = ' + isSpyReport);

    //5699587, all captured then no attacker verluste, have to shift index for defenders
    // spy reports dont have verluste for defenders anyways..
    var shiftVerluste = !isSpyReport && verluste.snapshotLength != nparties;
    _log(logLevel,"shiftVerluste = " + shiftVerluste);    

    for (var i=0; i<nparties; i++) {
        _log(logLevel,'Parsing table ' + i + " ------------------- ");
        if (i==0) {     
            aReport[DEF_AREPORT_ATT_UNITS] = getTrContents(einheiten.snapshotItem(0),1);
            _log(logLevel,'ATT_UNITS: ' + aReport[DEF_AREPORT_ATT_UNITS].join('|'));
                  
            if (gefangene.snapshotLength > 0) {   
                aReport[DEF_AREPORT_ATT_CAPTURED] = getTrContents(gefangene.snapshotItem(0),1);
                _log(logLevel,'CAPTURED_UNITS: ' + aReport[DEF_AREPORT_ATT_CAPTURED].join('|'));
            } else
                _log(logLevel,'No Captured units.');        

            if (verluste.snapshotLength > 0 && !shiftVerluste) { 
                aReport[DEF_AREPORT_ATT_LOST] = getTrContents(verluste.snapshotItem(0),1);
                _log(logLevel,'ATT_LOST: ' + aReport[DEF_AREPORT_ATT_LOST].join('|'));
                haveAttackerLost = true;
                _log(logLevel,'haveAttackerLost = ' + haveAttackerLost);
            } else {
                _log(logLevel,'Attacker no Lost units.');       
            }
                                                 
        } else {            
            var isDefenderTable = /spieler\.php\?uid=/.test(verteidigertr.snapshotItem(i-1).innerHTML);    // verteidigertr is one behind
            
            var thistribe = tabletribes[i];
            var verlusteIndex = i + (shiftVerluste?-1:0);

            if (isDefenderTable) {
                _log(logLevel,'Defender Table Found.');
                aReport[DEF_AREPORT_DEF_UNITS] = getTrContents(einheiten.snapshotItem(i),1);
                if (aReport[DEF_AREPORT_DEF_UNITS])
                    _log(logLevel,'DEF_UNITS: ' + aReport[DEF_AREPORT_DEF_UNITS].join('|'));
                aReport[DEF_AREPORT_DEF_TRIBE] = thistribe;
                _log(logLevel,'DEF_TRIBE: ' + aReport[DEF_AREPORT_DEF_TRIBE]);
                
                if (!isSpyReport) {// spy reports have no lost trs                      
                    aReport[DEF_AREPORT_DEF_LOST] = getTrContents(verluste.snapshotItem(verlusteIndex),1);
                    if (aReport[DEF_AREPORT_DEF_LOST])
                        _log(logLevel,'DEF_LOST: ' + aReport[DEF_AREPORT_DEF_LOST].join('|'));
                }                
            }

            if (nparties > 2) {
                aReport[DEF_AREPORT_DEF_UNITS_ROMANS + 2*thistribe] = getTrContents(einheiten.snapshotItem(i),1);
                if (aReport[DEF_AREPORT_DEF_UNITS_ROMANS + 2*thistribe])               
                     _log(logLevel,'DEF_TRIBE'+thistribe+'_UNITS : ' + aReport[DEF_AREPORT_DEF_UNITS_ROMANS + 2*thistribe].join('|'));
                
                if (!isSpyReport) {// spy reports have no lost trs
                    aReport[DEF_AREPORT_DEF_LOST_ROMANS + 2*thistribe] = getTrContents(verluste.snapshotItem(verlusteIndex),1);
                    if (aReport[DEF_AREPORT_DEF_LOST_ROMANS + 2*thistribe])
                        _log(logLevel,'DEF_TRIBE'+thistribe+'_LOST: ' + aReport[DEF_AREPORT_DEF_LOST_ROMANS + 2*thistribe].join('|'));
                }                                        
            }
            
        }   

    }

    if (logLevel <= LOG_LEVEL) // dont want to cache all those ally place names
        _log(logLevel,aReport2HRString(aReport));
    return aReport;         
}

//
function getTrContents(tr, start) {
    var a = new Array();
    var allQuestionMarks = true;
    for (var i=start; i<tr.childNodes.length; i++) {
        var c = tr.childNodes[i].textContent;
        _log(99,tr.c);
        a.push(c); 
        if (c != '?')       
            allQuestionMarks = false;
    }

    if (allQuestionMarks)
        return undefined;
    else
        return a;
}

function _logArray(l,arraytolog,name) {

    if (!name)
        name = "unnamed array";    

    if (!arraytolog) {
        _log(l,name + ":" + 'undefined array.');
        return;
    }
    
    for (var i=0; i<arraytolog.length;i++)
        _log(l,name + "[" + i + "] = " + arraytolog[i]);
}

function getTribeFromImg(img) {
    var reTribe = new Array();
    reTribe[0] = /img\/un\/u\/\d.gif/;
    reTribe[1] = /img\/un\/u\/1\d.gif/;
    reTribe[2] = /img\/un\/u\/2\d.gif/;
    reTribe[3] = /img\/un\/u\/3\d.gif/;
    reTribe[4] = /img\/un\/u\/4\d.gif/;        
    
    for (var i=0; i<reTribe.length; i++)
        if (reTribe[i].test(img))
            return i;
            
    return -1;
}

// returns number of seconds since 1.1.1970 0:0:0 GMT
function getDateTime(html) {
    var dbLvl = 3;
    
    //am 05.08.08 um 17:16:19
    var d = html.match(/am (\d\d)\.(\d\d)\.(\d\d) um (\d\d)\:(\d\d)\:(\d\d)/);
    _log(dbLvl,d.join('|'));    
    
    var oDate = new Date(d[3]*1+2000,d[2]-1,d[1],d[4],d[5],d[6]);
    
    _log(dbLvl,oDate.toLocaleString());
    
    return oDate.getTime()/1000;
}

// returns array(10) [or array(11)]
// todo: return proper things. all zeros or undefined
/*function (unitstr) {
    if (!unitstr) {
        alert('asd');
        return;

    }
    //<td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td>2</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td></tr>
    if (/<td(\sclass=\"c\")?>\?<\/td>/ig.test(tr)) //?	?	?	?	?	?	?	?	?	?
        
    var einhtd = tr.match(/<td(\sclass=\"c\")?>\d+<\/td>/ig);
    _log(3,unitstr);
    _log(3,einhtd.length);
    for (var i=0;i<einhtd.length;i++) {
        einhtd[i] = einhtd[i].match(/[0-9]+/)[0];
    }
    
    return einhtd;    
}   */

// returns array(4)
/*function getRobbedRessis(html) {
    var reressis = /<td>Beute<\/td>\n.*<\/tr>/ig;
    var ressis = html.match(reressis);                    
    var reressis2 = /<img class=\"res\" src=\"img\/un\/r\/[1-4]\.gif\">[0-9]+/ig;
    var bounty = ressis[0].match(reressis2);
    for (var i=0;i<bounty.length;i++) {
        bounty[i] = bounty[i].substring(bounty[i].indexOf(">")+1)
    }            
    return bounty;
}   */

// ****************************************************
// DB INTERFACE
// ****************************************************

// STRING FORMAT
// format: rep_id,time (s), att_uid,att_did, att_units        ,  att_lost         , res      ,def_uid,def_did, def_units,        def_lost        ,observer_uid
//         5342130,1218018052,13697,397628,0_0_0_0_2_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,29_33_25_16,11741,399240,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697
function aReport2String(aReport,only14) {
    
    _log(3,aReport.join('|'));
    
    var outReport = aReport.clone();  
    if (only14 != undefined || only14)
        outReport.splice(14);

    for(var i=0; i<DEF_AREPORT_NDEFS; i++) {
        if (outReport[i] instanceof Array)
            outReport[i] = outReport[i].join('_');  
        if (outReport[i] == undefined)
            outReport[i] = '';
    }
    
    _log(3,aReport.join('|'));
    
    return outReport.join(',');        
}

function string2AReport(string) {
    
    var aReport = string.split(',');
    
    for (var i=0; i<aReport.length;i++) {
        if (/\d*(_\d*)+/.test(aReport[i]))
            aReport[i] = aReport[i].split('_');
        if (aReport[i] == '')
            aReport[i] = undefined;
    }        
        
    return aReport;
}


// karte codes
var DEF_KARTE_CODES = 'KARTE_CODES';
// format: did1,code1,did2,code2,...

function setKarteCode(did,code) {  
    
    var codes = readData(DEF_KARTE_CODES).split(',');    
    var i = codes.indexOf(did);
    
    if (i==-1) {
        codes.push(did);
        codes.push(code);
    } else {
        codes[i+1] = code;
    }

    writeData(DEF_KARTE_CODES,codes.join(','));

}

function getKarteCode(did) {
    var codes = readData(DEF_KARTE_CODES).split(',');    
    var i = codes.indexOf(did);
    
    if ( i > -1 )
        return codes[i+1];
    
    return null;
}

// deep object clone method
Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
  for (i in this) {
    if (i == 'clone') continue;
    if (this[i] && typeof this[i] == "object") {
      newObj[i] = this[i].clone();
    } else newObj[i] = this[i]
  } return newObj;
};

// target: ..reports_did_data
// target: ..reports_did_meta // numbner of, last report
var DEF_PREFIX_REPORTS = "reports";
var DEF_PREFIX_REPORTS_DATA = "data";
var DEF_PREFIX_REPORTS_META = "meta";
var DEF_PREFIX_REPORTS_POP = "pop";
var DEF_DATA_REPORTDIDS = "reports";
var DEF_DATA_REPORTSTOGET = "reports_toget"; // needed because script can be interrupted by page reload, losing the report (only "(new)" are added)

var DEF_AMETA_NUM = 0;
var DEF_AMETA_RES = 1;
var DEF_AMETA_RES_TOT = 2;
var DEF_AMETA_LOST = 3;
var DEF_AMETA_LASTTIME = 4;
var DEF_AMETA_MAXATTP_LOSTU = 5;
var DEF_AMETA_MINATTP_OK = 6;

var DEF_PREFIX_REPORTS_OVERVIEW = DEF_PREFIX_REPORTS + "_OVERVIEW";
var DEF_OPTION_OVERVIEW_LENGTH = 'OVERVIEW_LENGTH';

// call this to add to local db, not any of those below
function addAReportLocal(aReport) {

    //alert(getUserId());
    if (getUserId() != aReport[DEF_AREPORT_ATT_UID]) {
        //alert('not your report');
        return false;
    }
    if (aReport[DEF_AREPORT_ATT_TYPE] == DEF_AREPORT_ATT_TYPE_ATTACK || aReport[DEF_AREPORT_ATT_TYPE] == DEF_AREPORT_ATT_TYPE_RAID ||  aReport[DEF_AREPORT_ATT_TYPE] == DEF_AREPORT_ATT_TYPE_FREE) {

        if (!addAReport(aReport))
            return false;
        // <-- problem if interrupted here           
        addAReportTotals(aReport);        
        // <-- problem if interrupted here
        
        addAReportOverview(aReport);
        try {
            updateStatsSingleVillage(aReport[DEF_AREPORT_ID]);
        } catch(e) {
        }
    } else return false;
    
    return true;
}

function addAReportOverview(aReport) {
    var ao = readData(DEF_PREFIX_REPORTS_OVERVIEW).split('|');       
    
    _log(2,'Overview has ' + ao.length + ' elements.');
       
    ao.push(aReport2String(aReport));
        
    if (!ao[0]) // if first is empty element, shift out
        ao.shift();
        
    ao.sort(reportSortTime);
    
    if(ao.length > getOption(DEF_OPTION_OVERVIEW_LENGTH,15))
        ao.shift();
        
    //|9940715,1220027126,13697,397628,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,168,168,151,96,15277,402422,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,13697,1,0,1
    writeData(DEF_PREFIX_REPORTS_OVERVIEW,ao.join('|'));
}

function reportSortTime(el1,el2) {
    el1 = el1.split(',');
    el2 = el2.split(',');
    el1 = el1[DEF_AREPORT_ID];
    el2 = el2[DEF_AREPORT_ID];
    return el1 - el2;    
}

// records reports for individual villages
// function expects deep array version of aReport
// returns false if have already
function addAReport(aReport) {
    
    // for every village two keys.. 
    var prefix = DEF_PREFIX_REPORTS + "_" + aReport[DEF_AREPORT_DEF_DID];
    
    // one with the reports, separated by |
    oldData = readData(prefix + "_" + DEF_PREFIX_REPORTS_DATA);    

                
    // get meta
    var aMeta = getReportDidMeta(aReport[DEF_AREPORT_DEF_DID]);
    
    // initialize data
    var aData;
    if (oldData != '') {
        // no need to split deeper, as new one is just appended as string
        aData = oldData.split('|');
    } else
        aData = new Array();
     
    // see if its already in there
    for (var i=0; i< aData.length; i++) {
        var rep = aData[i].split(',');
        if (aReport[DEF_AREPORT_ID] == rep[DEF_AREPORT_ID]) {
            //alert('already have');
            return false;
        }               
    }   
    // append new report 
    aData.push(aReport2String(aReport));

    // appen did
    // see if village was already recorded. if not, add. save.
    var aDid = getReportDids();
    if (aDid.indexOf(aReport[DEF_AREPORT_DEF_DID]) == -1)
        aDid.push(aReport[DEF_AREPORT_DEF_DID]);
    
    // increase meta count
    aMeta[DEF_AMETA_NUM] = parseInt(aMeta[DEF_AMETA_NUM])+1;
    // update meta time
    if (!aMeta[DEF_AMETA_LASTTIME] || parseInt(aMeta[DEF_AMETA_LASTTIME]) < parseInt(aReport[DEF_AREPORT_TIME]))
        aMeta[DEF_AMETA_LASTTIME] = aReport[DEF_AREPORT_TIME];
        
    // add meta ressis
    if (aReport[DEF_AREPORT_ATT_RES])
        for (var i=0; i<4; i++)
            aMeta[DEF_AMETA_RES][i] = parseInt(aMeta[DEF_AMETA_RES][i]) + parseInt(aReport[DEF_AREPORT_ATT_RES][i]);
        
    // add meta lost units
    if (aReport[DEF_AREPORT_ATT_LOST])
        for (var i=0; i<aReport[DEF_AREPORT_ATT_LOST].length; i++)
            aMeta[DEF_AMETA_LOST][i]= parseInt(aMeta[DEF_AMETA_LOST][i]) + parseInt(aReport[DEF_AREPORT_ATT_LOST][i]);
      
    //update meta attp
    if (!aReport[DEF_AREPORT_DEF_UNITS] || arraySum(aReport[DEF_AREPORT_DEF_UNITS]) == 0) { // only interested if no def units
        var lostu = aReport[DEF_AREPORT_ATT_LOST]?arraySum(aReport[DEF_AREPORT_ATT_LOST]):0;
        var attp = getTroopsSumByIndex(aReport[DEF_AREPORT_ATT_UNITS],0,1,-1);        
                
        if (lostu == 0) {
            var min = aMeta[DEF_AMETA_MINATTP_OK]?aMeta[DEF_AMETA_MINATTP_OK]:Infinity;
            aMeta[DEF_AMETA_MINATTP_OK] = Math.min(min,attp); 
        } else {
            var max = aMeta[DEF_AMETA_MAXATTP_LOSTU]?aMeta[DEF_AMETA_MAXATTP_LOSTU]:0;     
            aMeta[DEF_AMETA_MAXATTP_LOSTU] = Math.max(max,attp);
                        
            if (aMeta[DEF_AMETA_MAXATTP_LOSTU]>= aMeta[DEF_AMETA_MINATTP_OK]) // if village has grown eg., reset minok
                aMeta[DEF_AMETA_MINATTP_OK] = undefined;
        }
        
    }
        
    // stringify meta arrays
    aMeta[DEF_AMETA_RES] = aMeta[DEF_AMETA_RES].join(',');
    aMeta[DEF_AMETA_LOST] = aMeta[DEF_AMETA_LOST].join(',');
    
    // write to GM_vals
    // <--- no problem if interrupted here
    writeData(DEF_DATA_REPORTDIDS,aDid.join(','));
    // <--- no problem if interrupted here
    writeData(prefix + "_" + DEF_PREFIX_REPORTS_DATA, aData.join('|'));
    // <---problem if interrupted here
    writeData(prefix + "_" + DEF_PREFIX_REPORTS_META, aMeta.join('|'));    
    
    _log(3,"meta: " + aMeta.join('|'));
    
    return true;
    
}

// records all reports: number of reports, resses, troops lost
// function expects deep array version of aReport
function addAReportTotals(aReport) {
    
    var lostunits = aReport[DEF_AREPORT_ATT_LOST];        
    var ressis = aReport[DEF_AREPORT_ATT_RES];
    
    _log(3,'New data: ' + lostunits + ' lost | ' + ressis + ' ressis');
    
    // read res, N, lost
    var oldStats = readData("reports_TOTAL_RES");
    var oldLost = readData("reports_TOTAL_LOST");
    var oldN = readData("reports_TOTAL_N");
    _log(3,'Statistics old: ' + oldN + ' raids, ' + oldStats + ' ressis, ' + oldLost + " lost");
    
    var aOldStats;
    if (oldStats != '')
        aOldStats = oldStats.split(",");
    else
        aOldStats = new Array(0,0,0,0);
        
    var aOldLost;
    if (oldLost != '')
        aOldLost = oldLost.split(",");
    else
        aOldLost = new Array(0,0,0,0,0,0,0,0,0,0,0);
        
    if (oldN == '')
        oldN = 0;
        
    // add
    oldN = parseInt(oldN) + 1;
    if (ressis)
        for (var i=0; i<4; i++)
            aOldStats[i]= parseInt(aOldStats[i]) + parseInt(ressis[i]);
       
    if (lostunits) 
        for (var i=0; i<lostunits.length; i++)
            aOldLost[i]= parseInt(aOldLost[i]) + parseInt(lostunits[i]);
    
    // save
    _log(3,'Statistics new: ' + oldN + ' raids, ' + aOldStats.join(',') + ' ressis, ' + aOldLost.join(',') + " lost");
    writeData("reports_TOTAL_RES", aOldStats.join(','));
    writeData("reports_TOTAL_LOST", aOldLost.join(','));    
    writeData("reports_TOTAL_N", oldN);
}

function clearReportsAll() {
    var dids = readData(DEF_DATA_REPORTDIDS);
    if (dids == '')
        return;
    
    if (!confirm('Clear all Stats?'))
        return;
    
    // clear the village data
    dids = dids.split(',');
    for (var i=0; i<dids.length; i++)
    // <---problem if interrupted here
        clearReportsByDid(dids[i]);
        
    // clear totals and helpers
    writeData("reports_TOTAL_RES", '');
    // <---problem if interrupted here
    writeData("reports_TOTAL_LOST", '');    
    // <---problem if interrupted here
    writeData("reports_TOTAL_N", '');
    // <---problem if interrupted here
    writeData(DEF_DATA_REPORTDIDS, '');
    // <---problem if interrupted here
    writeData(DEF_DATA_REPORTSTOGET,'');
    
    writeData(DEF_PREFIX_REPORTS_OVERVIEW,'');

    refreshStatsDiv();
}

//TODO: update totals
function clearReportsByDid(did) {
    writeData(DEF_PREFIX_REPORTS + "_" + did + '_' + DEF_PREFIX_REPORTS_DATA,'');
    // <---problem if interrupted here
    writeData(DEF_PREFIX_REPORTS + "_" + did + '_' + DEF_PREFIX_REPORTS_META,'');
    
    var dids = readData(DEF_DATA_REPORTDIDS).split(',');
    var i = dids.indexOf(did);
    
    if (i>-1)
        dids.splice(i,1);           
        
   writeData(DEF_DATA_REPORTDIDS,dids.join(','));
}

// returns array with dids of recorded villages
function getReportDids() {
    var dids = readData(DEF_DATA_REPORTDIDS);
    if (dids == '')
        dids = new Array();
    else {
                
        dids = dids.split(',');       
        var empt = dids.indexOf('');
        var changed = false;
        while (empt > -1) { 
            changed = true;           
            dids.splice(empt,1);
            empt = dids.indexOf('');
        }
        
        if (changed)
            writeData(DEF_DATA_REPORTDIDS,dids.join(','));
    }
    
    return dids;
}

// returns deep array meta for did
function getReportDidMeta(did) {
    var sMeta = readData(DEF_PREFIX_REPORTS + "_" + did + '_' + DEF_PREFIX_REPORTS_META);
    var aMeta;
    if (sMeta != '') {
        // ameta = numreports|res1,res2,res3,res4|res1234|lost1,..,lost11
        aMeta = sMeta.split('|');
        aMeta[DEF_AMETA_RES] = aMeta[DEF_AMETA_RES].split(',');
        aMeta[DEF_AMETA_LOST] = aMeta[DEF_AMETA_LOST].split(',');
    } else {
        aMeta = new Array(5);
        aMeta[DEF_AMETA_NUM] = 0;
        aMeta[DEF_AMETA_RES] = new Array(0,0,0,0);
        aMeta[DEF_AMETA_RES_TOT] = 0;
        aMeta[DEF_AMETA_LOST] = new Array(0,0,0,0,0,0,0,0,0,0,0);
        aMeta[DEF_AMETA_LASTTIME] = 0;
    }
    _log(3,'Returning aMeta: ' + aMeta.join('|'));
    return aMeta;
}

// ****************************
// STATS DISPLAY
// ****************************
var DEF_STATS_DIV = "ttq_stats";
var DEF_STATS_DRAGHANDLE = DEF_STATS_DIV + '_draghandle';
var DEF_STATS_TRID = "ttq_stats_tr_id";
var DEF_OPTION_KEY_STATS_POSITION = "STATS_POSITION";
var DEF_OPTION_STATS_SHOW = "STATS_SHOW";

var res1img = '<img src="img/un/r/1.gif" class="res"/>';
var res2img = '<img src="img/un/r/2.gif" class="res"/>';
var res3img = '<img src="img/un/r/3.gif" class="res"/>';
var res4img = '<img src="img/un/r/4.gif" class="res"/>';
var res5img = '<img src="img/un/r/5.gif" class="res"/>';
var resallimg = res1img+res2img+res3img+res4img;

var autoVills = new Array();

function refreshStatsDiv() {

    _log(2, "Refreshing stats...");
    // Remove old stats
    var oOldStats = $(DEF_STATS_DIV);
    if(oOldStats) {
        document.body.removeChild(oOldStats)
    }

    if (!getOption(DEF_OPTION_STATS_SHOW,true))
        return;     
        
    //Create new tasklist
    var oStats = document.createElement('div');
    oStats.id = DEF_STATS_DIV;
    oStats.setAttribute('style','-moz-opacity:.80;cursor:default;');
    //oStats.setAttribute('onmouseover',"document.getElementById('" + DEF_STATS_DIV + "').setAttribute('style','-moz-opacity:0.9;')");        
    oStats.innerHTML = "<div id='" + DEF_STATS_DRAGHANDLE +"' class='handle ttq_draghandle'>"
        +translate("Statistics")+"</div>";
    
    // real minimitzed
    var realminimize = getOption('STATS_REALMINIMIZED',false);
    var realminimizespan = document.createElement('span');
    if (!realminimize)
        realminimizespan.innerHTML = '&nbsp;&nbsp;<-';
    else
        realminimizespan.innerHTML = '&nbsp;&nbsp;->';
        
    realminimizespan.setAttribute('style','cursor:pointer;');      
    EventManager.Add(realminimizespan,'click',function(e) { setOption('STATS_REALMINIMIZED',!getOption('STATS_REALMINIMIZED',false)); refreshStatsDiv(); }, false);        

    //position the list
    var listCoords = getOption(DEF_OPTION_KEY_STATS_POSITION, "600px_125px");
    listCoords = listCoords.split("_");
    oStats.style.top = listCoords[0];
    oStats.style.left = listCoords[1];
    oStats.style.position = "absolute";
        
    document.body.appendChild(oStats);
    $(DEF_STATS_DRAGHANDLE).appendChild(realminimizespan);
    makeDraggable($(DEF_STATS_DRAGHANDLE));       
    
    if (realminimize)
        return;       
    
    autoVills = new Array();
    var tasks = readData(DEF_TTQ_TASKS);
    if (tasks != '') {
        tasks = tasks.split('|');
        for (var i=0; i<tasks.length; i++) {
            var aTask = tasks[i].split(',');
            if (aTask[DEF_ATASK_TYPE] == DEF_ATASK_TYPE_ATTACK)
                autoVills.push(aTask[DEF_ATASK_TARGET]);
        }
    }
   
        // details/overview toggle
    //var minimizer = document.createElement('span');
    //if (getOption('STATS_MINIMIZED',false))
    //    minimizer.innerHTML = 'details';
    //else
    //    minimizer.innerHTML = 'overview<hr>';
        
    //minimizer.setAttribute('style','cursor:pointer;');    
    //EventManager.Add(minimizer,'click',function(e) { setOption('STATS_MINIMIZED',!getOption('STATS_MINIMIZED',false)); refreshStatsDiv(); }, false);
    
    //oStats.appendChild(minimizer);     
    
    /*if (getOption('STATS_MINIMIZED',false)) {
        // show overview, then return
        
        // overview details toggle
        var details = getOption('STATS_DETAILS_DETAILS',true);
        var showdetails = document.createElement('span');
        if (details)
            showdetails.innerHTML = '&nbsp;&nbsp;-';
        else
            showdetails.innerHTML = '&nbsp;&nbsp;+';
        showdetails.setAttribute('style','cursor:pointer;');      
        EventManager.Add(showdetails,'click',function(e) { setOption('STATS_DETAILS_DETAILS',!getOption('STATS_DETAILS_DETAILS',true)); refreshStatsDiv(); }, false);    
        minimizer.parentNode.appendChild(showdetails);
        
        // get data
        var ao = readData(DEF_PREFIX_REPORTS_OVERVIEW).split('|');
        if (ao=='')
            return;
       
        ao.reverse();
                    
        var s = '<hr><table class="sortable">';
        if (details)
            s += '<thead style="text-align:center;"><tr><th>vor..</th><th>dorf</th><th>gain</th><th>lost</th><th>netto</th><th>carry</th><th>eff</th><th>attp</th><th>minok</th><th>maxnotok</th></tr></thead>';
        else
            s += '<thead style="text-align:center;"><tr><th>dorf</th><th>res</th><th>eff</th></tr></thead>';
        
        s+= '<tbody style="text-align:right;">';        
        var restot;
        var now = new Date();
        now = now.getTime()/1000;
        var fsize = !details?11:13;
        
        for (var i=0;i<ao.length;i++) {                    
            var rd = string2AReport(ao[i]);
            var placename = getPlaceName(rd[DEF_AREPORT_DEF_DID]);            
            if (!details && placename.length > 10)
                placename = placename.substring(0,8) + '..';
            
            var losttot = (rd[DEF_AREPORT_ATT_LOST]?getTroopsCost(rd[DEF_AREPORT_ATT_LOST]):0);
            
            s+= '<tr>';
                        
            if (!rd[DEF_AREPORT_DEF_DID]) {
                _log(2,"not displaying: " + aReport2HRString(rd));
                if (!details)
                    s+='<td style="text-align:center;"><a style="font-size:' + fsize + 'px;" href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">Unknown Village</a></td>'+ 
                        '<td style="color:#C00000;font-size:' + fsize + 'px;">' + (-losttot) + '</td><td class="c">0</td></tr>';
                else {
                    s+='<td>'+ formatTimeSpan(now - rd[DEF_AREPORT_TIME]) + '</td>';
                    s+='<td style="text-align:center;"><a style="font-size:' + fsize + 'px;" href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">Unknown Village</a></td>'+ 
                        '<td/><td/><td style="color:#C00000;font-size:' + fsize + 'px;">' + (-losttot) + '</td><td/><td class="c">0%</td></tr>';
                }
                continue;
            }
            
            
            restot = 0;
            
            for(var j=0; j<rd[DEF_AREPORT_ATT_RES].length;j++)
                restot += parseInt(rd[DEF_AREPORT_ATT_RES][j]);  
            
            var losttot = (rd[DEF_AREPORT_ATT_LOST]?getTroopsCost(rd[DEF_AREPORT_ATT_LOST]):0);            
            var troopsreturn = rd[DEF_AREPORT_ATT_UNITS];            
            if (rd[DEF_AREPORT_ATT_LOST])
                troopsreturn = arraySubtract(troopsreturn,rd[DEF_AREPORT_ATT_LOST]);
            if (rd[DEF_AREPORT_ATT_CAPTURED])
                troopsreturn = arraySubtract(troopsreturn,rd[DEF_AREPORT_ATT_CAPTURED]);
            
            var carrymax = getTroopsCarry(troopsreturn, 1, -1);

            if (details)            
                s+= '<td>'+ formatTimeSpan(now - rd[DEF_AREPORT_TIME]) + '</td>';
            
            var c = getKarteCode(rd[DEF_AREPORT_DEF_DID]);
            var namea = '';    
            if (c != null) {
                namea = '<a style="font-size:' + fsize + 'px;" href="karte.php?d=' + rd[DEF_AREPORT_DEF_DID] + '&c=' + c + '">' + placename + '</a>';                
            } else
                namea = placename;         
            
            // overwrite, want reports linked
            if (!details) {
                namea += '&nbsp;<a style="font-size:' + fsize + 'px;color:#c0c0c0;" href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">r</a>';
                namea += '&nbsp;<a style="font-size:' + fsize + 'px;color:#c0c0c0;" href="a2b.php?z=' + rd[DEF_AREPORT_DEF_DID] + '">a</a>';
            }            
            s+= '<td style="text-align:center;">' + namea + '</td>';
            
            if (details) {
                s+= '<td class="c">+' + restot + '</td>';
            
                s+= '<td class="c">' + (losttot>0?(-losttot):'') + '</td>';
            }
            var restitle = '+' + restot + ' | ' + (-losttot); 
            
            var gain = restot - losttot;                     
            var colstr = '#C0C0C0';            
            if (gain > 0)
                colstr = '#00C000';                               
                                                   
            if (gain < 0 || (!details && losttot>0))
                colstr = '#C00000';       
                
            if (losttot > 0 && gain >= 0)
                colstr = 'darkorange';                                  
                 
            s+= '<td style="color:' + colstr + ';font-size:' + fsize + 'px;" title="' + restitle +  '">' + gain + '</td>';
            
            // carry max
            if (details)
                s+= '<td class="c" style="text-align:right;">' + carrymax + '</td>';
            
            // efficiency
            var percent = round(restot/carrymax*100,0);
            var percentcolor = "color:#C0C0C0;";            
            percentcolor = percent > 90?'color:#808080;':percentcolor;
            percentcolor = percent >= 99?'color:#303030;':percentcolor;
            s+= '<td style="text-align:right;' + percentcolor + '">' + percent + '%</td>';
            
            if (details) {
                var atttotal = getTroopsSumByIndex(rd[DEF_AREPORT_ATT_UNITS],0,1,-1);
                var meta = getReportDidMeta(rd[DEF_AREPORT_DEF_DID]);
                var minok = meta[DEF_AMETA_MINATTP_OK];
                var maxnotok = meta[DEF_AMETA_MAXATTP_LOSTU];
                s+= '<td style="color:#A0A0A0;">' + atttotal + '</td>';
                s+= '<td class="c">' + (minok?minok:'') + '</td>';
                s+= '<td class="c">' + (maxnotok?maxnotok:'') + '</td>';
                s+= '<td><a style="color:#c0c0c0;" href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">r</a></td>';
                s+= '<td><a style="color:#c0c0c0;" href="a2b.php?z=' + rd[DEF_AREPORT_DEF_DID] + '">a</a></td>';                //<img src="/img/un/a/att_all.gif" style="width:80%;"/>
            }
            
            s+= '</tr>';
        }
        //9945383,1220028920,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,16_14_16_3,25628,400046,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,1,1,,,,,,,,,,,|
        //9946214,1220029275,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,17_21_15_4,12756,397632,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,2,1,,,,,,,,,,,|
        //9946877,1220029563,13697,397628,0_0_15_0_0_0_0_0_0_0,0_0_1_0_0_0_0_0_0_0,181_166_166_97,21682,400027,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,0,1,,,,,,,,,,,|
        //9946872,1220029562,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,0_0_21_10,15882,405632,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,0,1,,,,,,,,,,,|
        //9947211,1220029692,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,15_17_17_3,28103,399235,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,0,1,,,,,,,,,,,
        s += '</tbody></table>';

        var oSpan = document.createElement('span');
        oSpan.innerHTML = s;
        oStats.appendChild(oSpan);
        
        sorttable.init();
                
    } else { // overview stats
          */  
        var currentVillage = getActiveVillageZ();
    
        var links = document.createElement('div');
        links.innerHTML = getVillageName(getActiveVillageId());
        links.innerHTML+=': <a href="' + DEF_SERVER_BASE + '/Inactive/Search/' + coordZToX(currentVillage) + '.' + coordZToY(currentVillage) + '?dist=40" title="no change yesterday, but change the day before yesterday">inactives 1 day</a>';
        links.innerHTML+=' - <a href="' + DEF_SERVER_BASE + '/Inactive/Search/' + coordZToX(currentVillage) + '.' + coordZToY(currentVillage) + '?filter=all&dist=40" title="no change yesterday">inactives 1+ days</a><hr>';    
        oStats.appendChild(links);
    
        //get the server time offset once
        var iServerTimeOffset;
        if(bUseServerTime) {
            iServerTimeOffset = getServerTimeOffset();
        } else {
            iServerTimeOffset = false;
        }
        
        var oVillageStatsTable = document.createElement('table');
        oVillageStatsTable.className = "sortable";
        oVillageStatsTable.id = "ttq_stats_table";
        
        // make head
        var oVillageStatsTableHead = document.createElement('thead'); 
        oVillageStatsTableHead.id = "ttq_stats_table_head";  
        var oVillageStatsTableHeadTr = document.createElement('tr');               
        var headStrings = ['#', 'name', 'res', resallimg, res5img, 'lost', 'last', res1img, res2img, res3img, res4img, resallimg + "<br>netto", '/n', 'att', 'del', 'attp<br>ok', 'attp<br>notok', 'dist','/n/dist','/dist'];
        var headOrder = [1,13,0,/*15,16,*/17,/*3,12,*/11,12,19,18,7,8,9,10,4,6,14]; //nur netto
        var th;
        for (var i=0; i<headOrder.length;i++) {
            th = document.createElement('td');
            th.innerHTML = headStrings[headOrder[i]];
            th.setAttribute('style',"text-align:center;");
            EventManager.Add(th,'click', function(e) { 
                if (this.className == "sorttable_nosort")
                    return;
                    
                setOption('STATS_SORT',this.sorttable_columnindex); 
                setOption('STATS_SORT_REVERSE',this.className == "sorttable_sorted_reverse");
                });
            oVillageStatsTableHeadTr.appendChild(th);        
        }
        oVillageStatsTableHeadTr.childNodes[1].className = "sorttable_nosort"; // attack link
        oVillageStatsTableHeadTr.childNodes[14].className = "sorttable_nosort"; // del link
        oVillageStatsTableHead.appendChild(oVillageStatsTableHeadTr);            
        
        // make body   
        
        var mdid = getOption(DEF_KEY_MONITOR_DID).split(',');    
        var inc = new Array();
        var out = new Array();

        for (var i= 0; i<mdid.length; i++) {
            var devents = readData(DEF_KEY_EVENT + '_' + mdid[i]).split(';');
            
            if (devents[0] && devents[0] != '')        
                inc = inc.concat(devents[0].split('|'));
            if (devents[2] && devents[2] != '')
                out = out.concat(devents[2].split('|'));
                        
        }
        
        for (var i = 0; i< out.length;i ++)
            out[i] = out[i].split(',');        
             
        var oVillageStatsTableBody = document.createElement('tbody');

        var dids = getReportDids();   
        _log(3,'Having dids: ' + dids);
        for(var i = 0; i < dids.length; i++) {
            oVillageStatsTableBody.appendChild( makeStatsTr( getReportDidMeta(dids[i]), dids[i], iServerTimeOffset, out) );
        }
        
        // make foot
        var oVillageStatsTableFoot = document.createElement('tfoot');    
        var oVillageStatsTableFootTr = document.createElement('tr'); 
        for (var i = 0; i< headOrder.length; i++) {
            var td = document.createElement('td');
            oVillageStatsTableFootTr.appendChild(td);
        }
        var n = "&nbsp;";
        var nn = n+n;
        oVillageStatsTableFootTr.childNodes[0].innerHTML = "<b>Totals</b>";
        oVillageStatsTableFootTr.childNodes[2].innerHTML = readData("reports_TOTAL_N") + nn;
        oVillageStatsTableFootTr.childNodes[6].innerHTML = arraySum(readData("reports_TOTAL_RES").split(',')) + nn;
        oVillageStatsTableFootTr.childNodes[7].innerHTML = Math.round(arraySum(readData("reports_TOTAL_RES").split(','))/readData('reports_TOTAL_N')) + nn;
        oVillageStatsTableFootTr.childNodes[7].title = 'Average ressis over all attacks';
        oVillageStatsTableFootTr.childNodes[10].innerHTML = readData("reports_TOTAL_RES").split(',')[0] + nn;
        oVillageStatsTableFootTr.childNodes[11].innerHTML = readData("reports_TOTAL_RES").split(',')[1] + nn;
        oVillageStatsTableFootTr.childNodes[12].innerHTML = readData("reports_TOTAL_RES").split(',')[2] + nn;
        oVillageStatsTableFootTr.childNodes[13].innerHTML = readData("reports_TOTAL_RES").split(',')[3] + nn;
        oVillageStatsTableFootTr.childNodes[14].innerHTML = getTroopsCost(readData("reports_TOTAL_LOST").split(',')) + nn;
        oVillageStatsTableFootTr.childNodes[14].title = getTroopsInfo(readData("reports_TOTAL_LOST").split(','),1,-1);

        oVillageStatsTableFoot.appendChild(oVillageStatsTableFootTr);
                
        // append head, body, foot
        oVillageStatsTable.appendChild(oVillageStatsTableHead);
        oVillageStatsTable.appendChild(oVillageStatsTableBody);
        oVillageStatsTable.appendChild(document.createElement('hr'));
        oVillageStatsTable.appendChild(oVillageStatsTableFoot);

        // append table
        oStats.appendChild(oVillageStatsTable);
        
        document.body.appendChild(oStats);
            
        try{ 
            sorttable.init();
        } catch(e) {}
        
        
        var statsSort = getOption('STATS_SORT',4);
        sortMe(oVillageStatsTableHeadTr.childNodes[Math.abs(statsSort)].wrappedJSObject);
        if (!getOption('STATS_SORT_REVERSE',false))
            sortMe(oVillageStatsTableHeadTr.childNodes[Math.abs(statsSort)].wrappedJSObject);
            

        //flush link
        var oFlushLink = document.createElement('a');
        oFlushLink.id = 'ttq_flush_stats';
        oFlushLink.innerHTML = '<img src="img/un/a/del.gif" alt="Clear all">';
        oFlushLink.href = '#';
        //oStats.appendChild(oFlushLink);
        oVillageStatsTableFootTr.lastChild.appendChild(oFlushLink);
        EventManager.Add(oFlushLink,'click', clearReportsAll, false);
    //}         
}

// caution! if !b then result is reference to a, else result is a new array
function arraySubtract(array,arrayToSubtract) {
    if (!arrayToSubtract)
        return array;
        
    var c = new Array(array.length);
    for (var i=0;i<array.length;i++) {
        c[i] = array[i] - arrayToSubtract[i];
    }
    
    return c;

}

function arraySum(arrayToSum) {
    var s=0;
    for (var i=0; i<arrayToSum.length;i++)
        s+= arrayToSum[i]*1;
    return s;
}

// wont happen often, since check is triggered only after page reload
function updateStatsSingleVillage(did) {
    var tr = $(DEF_STATS_TRID + '_' + did);
    if (tr == null) {
        refreshStatsDiv();
        return;
    }
    
    $("ttq_stats_table_body").insertBefore(makeStatsTr( getReportDidMeta(did), did, null),tr);
    $("ttq_stats_table_body").removeChild(tr);
    
    try{ 
        sorttable.init();
    } catch(e) {}      
}

function makeNonBreaking(s) {
    return s.replace(' ','&nbsp;');
}

function makeStatsTr(aMeta, did, iServerTimeOffset, inc) {
    _log(3, "-> makeStatsTr() for did " + did + ": " + aMeta.join('|'));
    var oDate;
    var sTime;
    
    if(bUseServerTime && iServerTimeOffset != false) { // nyi
        //create timestamp for the tasktime offset to server time
        var iTaskServerTimestamp = ( parseInt(aHistoryTask[1]) + (iServerTimeOffset * 3600) ) * 1000;
        oDate = new Date(iTaskServerTimestamp);
        sTime = oDate.toGMTString();
        sTime = sTime.substring(0, sTime.length - 4);
        sTime = "<span style='color:#973C05; cursor:pointer;' id='ttq_history_tasktime_" 
                + index + "' title='This is the server time.'>" + sTime + "</span>";
    } else {  //local time
        //oDate = new Date( parseInt(aReportMeta[DEF_AMETA_LASTTIME]) * 1000 );
        sTime = formatDateTimeRelative(parseInt(aMeta[DEF_AMETA_LASTTIME]));
    }

    var oStatsRow = document.createElement("tr");
    oStatsRow.id = DEF_STATS_TRID + "_" + did;

    /*aMeta[DEF_AMETA_NUM] = 0;
    aMeta[DEF_AMETA_RES] = new Array(0,0,0,0);
    aMeta[DEF_AMETA_RES_TOT] = 0;
    aMeta[DEF_AMETA_LOST] = new Array(0,0,0,0,0,0,0,0,0,0,0);
    aMeta[DEF_AMETA_LASTTIME] = 0;*/

    var losttot = 0;
    //3-lumber 4-clay 5-iron 6-grain
    for(var i=0; i<aMeta[DEF_AMETA_LOST].length;i++)
        losttot += parseInt(aMeta[DEF_AMETA_LOST][i])*(aTroopData[i][3] + aTroopData[i][4] + aTroopData[i][5] +aTroopData[i][6]);    

    var restot = 0;
    for(var i=0; i<aMeta[DEF_AMETA_RES].length;i++)
        restot += parseInt(aMeta[DEF_AMETA_RES][i]);   
    
    // make columns -------------------------------
    // name
    var oTdVillageName = document.createElement('td');   
    var c = getKarteCode(did);
    
    if (c != null) {
        oTdVillageName.innerHTML = '<a href="karte.php?d=' + did + '&c=' + c + '">' + makeNonBreaking(getPlaceName(did)) + '</a>';
    } else
        oTdVillageName.innerHTML =  makeNonBreaking(getPlaceName(did));           
    
    oTdVillageName.innerHTML += '<a style="color:#c0c0c0;" href="a2b.php?z=' + did + '">&nbsp;a</a>'    
    oStatsRow.appendChild(oTdVillageName);
   
 
    
    // attack
    var oTdAttack = document.createElement('td');
    
           
    var taskIndex = autoVills.indexOf(did);
    if (taskIndex > -1) {        
        oTdAttack.innerHTML+='<img src="img/un/a/clock.gif" style="width:13px;" title="in queue"/>'; 
    } else 
        oTdAttack.innerHTML+='<img src="img/un/a/w.gif" style="width:13px;" title=""/>'; 
        
    var count = 0;
    var spycount = 0;
    var nextatt = -1;
    var nextspy = -1;
    var now = new Date();
    now = now.getTime()/1000;
    for (var i=0;i<inc.length;i++) {
        if (inc[i][DEF_AEVENT_DEF_DID] == did && inc[i][DEF_AEVENT_ATT_UNITS]) {            
            if (onlySpies(inc[i][DEF_AEVENT_ATT_UNITS].split('_'),-1)) {
                spycount++;
                if (nextspy == -1)
                    nextspy = i;
                oTdAttack.innerHTML += '<img src="img/un/u/' + (iMyRace>0?iMyRace:'') + iScoutUnit + '.gif" style="width:15px;" title="in ' + formatTimeSpan(inc[i][DEF_AEVENT_TIME]-now) + '"/>';
            } else {
                count++;
                if (nextatt == -1)
                    nextatt = i;
                oTdAttack.innerHTML += '<img src="img/un/a/att2.gif" style="width:13px;" title="in ' + formatTimeSpan(inc[i][DEF_AEVENT_TIME]-now) + '"/>';                        
            }
        }
    }

    // old version
    /*
    if (count>0)
        //oTdAttack.innerHTML = '<a href="a2b.php?z=' + did + '"><img src="/img/un/a/att_all.gif" style="width:75%;"/></a>';
        oTdAttack.innerHTML = '<img src="img/un/a/att2.gif" style="width:15px;" title="next in ' + formatTimeSpan(inc[nextatt][DEF_AEVENT_TIME]-now) + '"/>' + (count>1?'*'+count:'');
    if (spycount>0)
        //oTdAttack.innerHTML = '<a href="a2b.php?z=' + did + '"><img src="/img/un/a/att_all.gif" style="width:75%;"/></a>';
        oTdAttack.innerHTML += '<img src="img/un/u/' + (iMyRace>0?iMyRace:'') + iScoutUnit + '.gif" style="width:15px;" title="next in ' + formatTimeSpan(inc[nextspy][DEF_AEVENT_TIME]-now) + '"/>' + (spycount>1?'*'+spycount:'');
      */  
    oTdAttack.setAttribute('nowrap','');
    oStatsRow.appendChild(oTdAttack);        

        
    // number of
    var oTdN = document.createElement('td');    
    oTdN.textContent = aMeta[DEF_AMETA_NUM];                           
    oStatsRow.appendChild(oTdN);

    var minok = aMeta[DEF_AMETA_MINATTP_OK];
    var maxnotok = aMeta[DEF_AMETA_MAXATTP_LOSTU];
    // att ok
    var oTdMinOk = document.createElement('td');    
    oTdMinOk.textContent = minok?minok:''
    oTdMinOk.setAttribute('style','color:green');               
    //oStatsRow.appendChild(oTdMinOk);
        
    // att not ok
    var oTdMaxNotOk = document.createElement('td');    
    oTdMaxNotOk.textContent = maxnotok?maxnotok:'';                           
    oTdMaxNotOk.setAttribute('style','color:red');
    //oStatsRow.appendChild(oTdMaxNotOk);
   
    
    // total res
    /*var oTdResTot = document.createElement('td');        
    oTdResTot.textContent = restot;                 
    oStatsRow.appendChild(oTdResTot);   */
    
    // total res per
    /*var oTdResTot = document.createElement('td');        
    oTdResTot.textContent = round(restot/aMeta[DEF_AMETA_NUM],1);                 
    oStatsRow.appendChild(oTdResTot);*/
    
    var oTdDist = document.createElement('td');
    var x = coordZToX(getActiveVillageZ());
    var y = coordZToY(getActiveVillageZ());
    var xt = coordZToX(did);
    var yt = coordZToY(did);
    var dist = Math.sqrt(Math.pow(x-xt,2) + Math.pow(y-yt,2));
    oTdDist.textContent = round(dist,1);                 
    oStatsRow.appendChild(oTdDist); 
    
    var resnetto = restot-losttot;
    // total res netto
    var oTdResTot = document.createElement('td');        
    oTdResTot.textContent = restot-losttot;                 
    oStatsRow.appendChild(oTdResTot); 
    
    var restotnettoper = resnetto/aMeta[DEF_AMETA_NUM];
      // total res netto
    var oTdResTot = document.createElement('td')    
    oTdResTot.textContent = round(restotnettoper,0);                 
    oStatsRow.appendChild(oTdResTot); 
    
    var oTdResTot = document.createElement('td')    
    oTdResTot.textContent = round(resnetto/dist,0);                 
    oStatsRow.appendChild(oTdResTot); 
        
    var oTdResTotPer = document.createElement('td');        
    oTdResTotPer.textContent = round(restotnettoper/dist,0);                 
    oStatsRow.appendChild(oTdResTotPer);    
    
    // single resses
    for (var i=0; i<4; i++) {
        var oTdRes = document.createElement('td');   
        var percent = Math.round(aMeta[DEF_AMETA_RES][i]/restot*100);     
        oTdRes.textContent = restot>0?percentUnicoded(percent):'';
        oTdRes.title = restot>0?aMeta[DEF_AMETA_RES][i] + ' (' + percent + '%)':'';
        oStatsRow.appendChild(oTdRes);
    }
   
    // detail troops lost
    //var oTdLost = document.createElement('td');        
    //oTdLost.innerHTML = getTroopsInfoImg(aMeta[DEF_AMETA_LOST],1,true);
    //oStatsRow.appendChild(oTdLost); 
      
     // total res lost
    var oTdLostTot = document.createElement('td');    
    oTdLostTot.textContent = losttot>0?losttot:'';  
    oTdLostTot.title = getTroopsInfo(aMeta[DEF_AMETA_LOST],1,true);              
    oStatsRow.appendChild(oTdLostTot);
            
    // last access
    var oTdLast = document.createElement('td');    
    oTdLast.innerHTML = makeNonBreaking(formatDateTimeRelative(aMeta[DEF_AMETA_LASTTIME]));                           
    oStatsRow.appendChild(oTdLast);
    
    // del
    var oTdAttack = document.createElement('td');    
    oTdAttack.innerHTML = '<img src="img/un/a/del.gif"/>';
    oTdAttack.setAttribute('did',did);          
    oStatsRow.appendChild(oTdAttack);
    EventManager.Add(oTdAttack,'click',handleStatsDelete,false);
    
    return oStatsRow;
}

function percentUnicoded(p) {
    var c = Math.floor(p/4);
    /*switch(c) {
        case 0: return ' ';
        case 1: return '|';
        case 2: return '||';
        case 3: return '|||';
        case 4: return '||||';
        case 5: return '|||||';
        case 6: return '||||||';
        case 7: return '|||||||';
        case 8: return '||||||||';
        case 9: return '|||||||||';
        default: return p;
    }*/
    var s = '';
    for (var i=0;i<c;i++)
        s += '|';
        
    return s;

}

function handleStatsDelete(e) {
    var did = this.getAttribute('did');
    if (!did)
        return;
        
    if (confirm('Delete stats for ' + getPlaceName(did) + '?' )) {
        clearReportsByDid(did);
        refreshStatsDiv();
    }
    
}

function round(numberToRound,numberOfDecimalPlaces) {
    return Math.round(numberToRound*Math.pow(10,numberOfDecimalPlaces))/Math.pow(10,numberOfDecimalPlaces);
}

var DEF_KEY_LAST_ALLYREPORT_GOTTEN = "LAST_ALLYREPORT_GOTTEN";
var DEF_KEY_LAST_ALLYREPORT_GOTTEN_INTERVAL = "LAST_ALLYREPORT_GOTTEN_INTERVAL";
//get attacks list from allianz.php?s=3 page
function getAllyReports()
{
    if (!getOption(DEF_OPTION_UPLOADALLYREPORTS,false))
        return;

    var lastberichtid = readData(DEF_KEY_LAST_ALLYREPORT_GOTTEN);
    if (lastberichtid == '')
        lastberichtid = 0;   
        
    _log(2,'Last report gotten: ' + lastberichtid);

	var url = document.URL;
	url = url.substring(0, url.lastIndexOf('/')+1);
	url = url+'allianz.php?s=3';
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onload: function(responseDetails) {

                	if (responseDetails.readyState != 4) return;
                	if (responseDetails.status != 200) return;                	
                	
                	var response = responseDetails.responseText;
                    var div = document.createElement('div');
                    div.innerHTML = response;
                
                	var ansDoc = document.implementation.createDocument('', '', null);
                	ansDoc.onload = ansDoc.appendChild(div);
                	//get data
                	var lmid2Div = ansDoc.getElementById('lmid2');
                	var eventsTable = lmid2Div.getElementsByTagName('table')[0];
                	if (eventsTable) eventsTable.deleteRow(0);
                	else eventsTable = lmid2Div.getElementsByTagName('p')[0];
                	//append data					
                	//$('lmid1').appendChild(eventsTable);
                
                    var as = eventsTable.getElementsByTagName('a');
                    // go from bottom up
                    var offset = 0; // where the new ones start..
                    var basetimeout = getOption(DEF_KEY_LAST_ALLYREPORT_GOTTEN_INTERVAL,3)*1000;
                    _log(3,'Got ' + as.length + ' ally reports. ');
                    for(var i = as.length-1; i>=0; i--) {
                        var berichtid = as[i].getAttribute('href').match(/berichte\.php\?id=(\d*)/i);
                        var timeout = basetimeout*(as.length-i-offset);
                                                
                        if (!berichtid)
                            continue;
                        else
                            berichtid = berichtid[1];
                                                                        
                        if (lastberichtid*1 >= berichtid*1) { // skip the ones older than last
                            _log(3,'Skipping ' + berichtid);
                            offset++;
                            continue;
                        } else {                            
                            var elem = as[i];                                                            
                            _log(2, 'Getting ' + berichtid + ': ' + (as.length-i) + "-th report from bottom. setting timeout of " + timeout/1000 + "s for " + elem.textContent );
                            window.setTimeout(getAndInformLastGottenAllyReport, timeout, berichtid, elem);
                        }
                    }                                                                                      
                
                }
	});
}

function getAndInformLastGottenAllyReport(id,elem) {
    _log(2,"Getting ally report " + id + ": " + elem.textContent);
    get('http://' + getServerName() + '/berichte.php?id='+id,handleViewGet,[id,false,true]);
    //TODO: get callback to the end of the chain handleViewGet()->addAReportServer()->getServer()->handleAddAReportToServer()
    // to see if all went good, and THEN set DEF_KEY_LAST_ALLYREPORT_GOTTEN
    // or get() all synchronically
    writeData(DEF_KEY_LAST_ALLYREPORT_GOTTEN,id);
}



// ************************************************************************************************************
// *********  Recon - NYI!  ***********************************************************************************
// ************************************************************************************************************

var DEF_RECON_DIV = 'ttq_recon_div';
var DEF_RECON_DRAGHANDLE = DEF_RECON_DIV + '_draghandle';
var DEF_OPTION_KEY_RECON_POSITION = 'OPTION_KEY_RECON_POSITION';

function refreshReconDiv() {    
    
    return;
    
    _log(2, "Refreshing recon...");
    // Remove old stats
    var oOldStats = $(DEF_RECON_DIV);
    if(oOldStats) {
        document.body.removeChild(oOldStats)
    }

    //if (!getOption(DEF_OPTION_STATS_SHOW,true))
    //    return;     
        
    //Create new tasklist
    var oStats = document.createElement('div');
    oStats.id = DEF_RECON_DIV;
    oStats.innerHTML = "<div id='" + DEF_RECON_DRAGHANDLE +"' class='handle ttq_draghandle'>"
        +translate("Recon")+"</div>";
    
    // real minimitzed
    var realminimize = getOption('RECON_REALMINIMIZED',false);
    var realminimizespan = document.createElement('span');
    if (!realminimize)
        realminimizespan.innerHTML = '&nbsp;&nbsp;-';
    else
        realminimizespan.innerHTML = '&nbsp;&nbsp;+';
        
    realminimizespan.setAttribute('style','cursor:pointer;');      
    EventManager.Add(realminimizespan,'click',function(e) { setOption('RECON_REALMINIMIZED',!getOption('RECON_REALMINIMIZED',false)); refreshReconDiv(); }, false);        

    //position the list
    var listCoords = getOption(DEF_OPTION_KEY_RECON_POSITION, "600px_125px");
    listCoords = listCoords.split("_");
    oStats.style.top = listCoords[0];
    oStats.style.left = listCoords[1];
    oStats.style.position = "absolute";
        
    document.body.appendChild(oStats);
    $(DEF_RECON_DRAGHANDLE).appendChild(realminimizespan);
    makeDraggable($(DEF_RECON_DRAGHANDLE));       
    
    if (realminimize)
        return;              
        
    return
        // show overview, then return
        
    // overview details toggle
    var details = getOption('STATS_DETAILS_DETAILS',true);
    var showdetails = document.createElement('span');
    if (details)
        showdetails.innerHTML = '&nbsp;&nbsp;-';
    else
        showdetails.innerHTML = '&nbsp;&nbsp;+';
    showdetails.setAttribute('style','cursor:pointer;');      
    EventManager.Add(showdetails,'click',function(e) { setOption('STATS_DETAILS_DETAILS',!getOption('STATS_DETAILS_DETAILS',true)); refreshStatsDiv(); }, false);    
    minimizer.parentNode.appendChild(showdetails);
    
    // get data
    var ao = readData(DEF_PREFIX_REPORTS_OVERVIEW).split('|');
    if (ao=='')
        return;
   
    ao.reverse();
                
    var s = '<hr><table><tbody>';
    var restot;
    var now = new Date();
    now = now.getTime()/1000;
    var fsize = !details?11:13;
    
    for (var i=0;i<ao.length;i++) {                    
        var rd = string2AReport(ao[i]);
        var placename = getPlaceName(rd[DEF_AREPORT_DEF_DID]);            
        if (!details && placename.length > 10)
            placename = placename.substring(0,8) + '..';
        
        restot = 0;
        for(var j=0; j<rd[DEF_AREPORT_ATT_RES].length;j++)
            restot += parseInt(rd[DEF_AREPORT_ATT_RES][j]);  
        
        var losttot = (rd[DEF_AREPORT_ATT_LOST]?getTroopsCost(rd[DEF_AREPORT_ATT_LOST]):0);            
        
        s+= '<tr>';
        
        if (details)            
            s+= '<td>'+ formatTimeSpan(now - rd[DEF_AREPORT_TIME]) + '</td>';
        
        var c = getKarteCode(rd[DEF_AREPORT_DEF_DID]);
        var namea = '';    
        if (c != null) {
            namea = '<a style="font-size:' + fsize + 'px;" href="karte.php?d=' + rd[DEF_AREPORT_DEF_DID] + '&c=' + c + '">' + placename + '</a>';
        } else
            namea = placename;         
        s+= '<td>' + namea + '</td>';
        
        if (details) {
            s+= '<td class="c">+' + restot + '</td>';
        
            s+= '<td class="c">-' + losttot + '</td>';
        }
        var gain = restot - losttot;                     
        var colstr = '#C0C0C0';            
        if (gain > 0)
            colstr = '#00C000';                            
        if (gain < 0 || (!details && losttot>0))
            colstr = '#C00000';            
        s+= '<td style="color:' + colstr + ';font-size:' + fsize + 'px;">' + (losttot>0 && !details?'*':'') + gain + '</td>';
        
        if (details) {
            s+= '<td><a href="a2b.php?z=' + rd[DEF_AREPORT_DEF_DID] + '"><img src="/img/un/a/att_all.gif" style="width:80%;"/></a></td>';
            s+= '<td><a href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">-></a></td>';
        }
        
        s+= '</tr>';
    }
    /*9945383,1220028920,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,16_14_16_3,25628,400046,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,1,1,,,,,,,,,,,|
    9946214,1220029275,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,17_21_15_4,12756,397632,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,2,1,,,,,,,,,,,|
    9946877,1220029563,13697,397628,0_0_15_0_0_0_0_0_0_0,0_0_1_0_0_0_0_0_0_0,181_166_166_97,21682,400027,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,0,1,,,,,,,,,,,|
    9946872,1220029562,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,0_0_21_10,15882,405632,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,0,1,,,,,,,,,,,|
    9947211,1220029692,13697,397628,2_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,15_17_17_3,28103,399235,0_0_0_0_0_0_0_0_0_0,0_0_0_0_0_0_0_0_0_0,13697,1,0,1,,,,,,,,,,,*/
    s += '</tbody></table>';

    var oSpan = document.createElement('span');
    oSpan.innerHTML = s;
    oStats.appendChild(oSpan);
    
    /*document.body.appendChild(oStats);

    makeDraggable($(DEF_STATS_DRAGHANDLE));
        
    //get the server time offset once
    var iServerTimeOffset;
    if(bUseServerTime) {
        iServerTimeOffset = getServerTimeOffset();
    } else {
        iServerTimeOffset = false;
    }
    
    var oVillageStatsTable = document.createElement('table');
    oVillageStatsTable.className = "sortable";
    oVillageStatsTable.id = "ttq_stats_table";
    
    // make head
    var oVillageStatsTableHead = document.createElement('thead'); 
    oVillageStatsTableHead.id = "ttq_stats_table_head";  
    var oVillageStatsTableHeadTr = document.createElement('tr');               
    var headStrings = ['#','name','res',resallimg,res5img,'lost','last',res1img,res2img,res3img,res4img,resallimg + "<br>netto",'/n','att','del'];
    var headOrder = [1,13,0,11,12,7,8,9,10,5,4,6,14]; //nur netto
    var th;
    for (var i=0; i<headOrder.length;i++) {
        th = document.createElement('th');
        th.innerHTML = headStrings[headOrder[i]];
        //th.className = "";
        EventManager.Add(th,'click', function(e) { 
            if (this.className == "sorttable_nosort")
                return;
                
            setOption('STATS_SORT',this.sorttable_columnindex); 
            setOption('STATS_SORT_REVERSE',this.className == "sorttable_sorted_reverse");
            });
        oVillageStatsTableHeadTr.appendChild(th);        
    }
    oVillageStatsTableHeadTr.childNodes[1].className = "sorttable_nosort"; // attack link
    oVillageStatsTableHeadTr.childNodes[12].className = "sorttable_nosort"; // del link
    oVillageStatsTableHead.appendChild(oVillageStatsTableHeadTr);            
    
    // make body        
    var oVillageStatsTableBody = document.createElement('tbody');

    var dids = getReportDids();   
    _log(3,'Having dids: ' + dids);
    for(var i = 0; i < dids.length; i++) {
        oVillageStatsTableBody.appendChild( makeStatsTr( getReportDidMeta(dids[i]), dids[i], iServerTimeOffset) );
    }
    
    // make foot
    var oVillageStatsTableFoot = document.createElement('tfoot');    
    var oVillageStatsTableFootTr = document.createElement('tr'); 
    for (var i = 0; i< headOrder.length; i++) {
        var td = document.createElement('td');
        oVillageStatsTableFootTr.appendChild(td);
    }
    var n = "&nbsp;";
    var nn = n+n;
    oVillageStatsTableFootTr.childNodes[0].innerHTML = "<b>Totals</b>";
    oVillageStatsTableFootTr.childNodes[2].innerHTML = readData("reports_TOTAL_N") + nn;
    oVillageStatsTableFootTr.childNodes[3].innerHTML = sum(readData("reports_TOTAL_RES").split(',')) + nn;
    oVillageStatsTableFootTr.childNodes[5].innerHTML = readData("reports_TOTAL_RES").split(',')[0] + nn;
    oVillageStatsTableFootTr.childNodes[6].innerHTML = readData("reports_TOTAL_RES").split(',')[1] + nn;
    oVillageStatsTableFootTr.childNodes[7].innerHTML = readData("reports_TOTAL_RES").split(',')[2] + nn;
    oVillageStatsTableFootTr.childNodes[8].innerHTML = readData("reports_TOTAL_RES").split(',')[3] + nn;
    oVillageStatsTableFootTr.childNodes[9].innerHTML = getTroopsInfoImg(readData("reports_TOTAL_LOST").split(','),1,true) + nn;

    oVillageStatsTableFoot.appendChild(oVillageStatsTableFootTr);
            
    // append head, body, foot
    oVillageStatsTable.appendChild(oVillageStatsTableHead);
    oVillageStatsTable.appendChild(oVillageStatsTableBody);
    oVillageStatsTable.appendChild(document.createElement('hr'));
    oVillageStatsTable.appendChild(oVillageStatsTableFoot);

    // append table
    oStats.appendChild(oVillageStatsTable);
    
    document.body.appendChild(oStats);
        
    try{ 
        sorttable.init();
    } catch(e) {}
    
    
    var statsSort = getOption('STATS_SORT',4);
    sortMe(oVillageStatsTableHeadTr.childNodes[Math.abs(statsSort)].wrappedJSObject);
    if (!getOption('STATS_SORT_REVERSE',false))
        sortMe(oVillageStatsTableHeadTr.childNodes[Math.abs(statsSort)].wrappedJSObject);
        

    //flush link
    var oFlushLink = document.createElement('a');
    oFlushLink.id = 'ttq_flush_stats';
    oFlushLink.innerHTML = 'Clear';
    oFlushLink.href = '#';
    //oStats.appendChild(oFlushLink);
    oVillageStatsTableFootTr.lastChild.appendChild(oFlushLink);
    EventManager.Add(oFlushLink,'click', clearReportsAll, false);*/
        
}

// ************************************************************************************************************
// *********  RALLY POINT MONITORING  *************************************************************************
// ************************************************************************************************************

var DEF_KEY_MONITOR_DID = "OPTION_RALLY_MONITORED_DIDS";

function monitorMain() {
    
    checkForSendButton();
    
    var getmon = getOption('GETMONITORED','false');
    if (getmon != 'false') {
        if (getmon == 'true') // get all
            getMonitoredRallyPoints();
        else
            getMonitoredRallyPoints([parseInt(getmon)]);
    } else
        refreshMonitorDiv();
}

function checkForSendButton() {
    //<input height="20" border="0" width="50" type="image" onmouseout="btm0()" onmouseup="btm0()" onmouseover="btm1('s1','','img/de/b/ok3.gif',1)" onmousedown="btm1('s1','','img/de/b/ok2.gif',1)" src="img/de/b/ok1.gif" name="s1" value="ok"/>
    if (/a2b.php/.test(location.href) && !getParamFromUrl(location.href,'z')) {
        var ok = xpath("//div[@id='lmid2']/form");
        //var did = xpath("//input[@name='kid']");
        
        if (ok.snapshotLength > 0) {                    
            //if (did.snapshotLength == 0)
            //    EventManager.Add(ok.snapshotItem(0),'submit',function() {setOption('GETMONITORED','true');},false)
            //else 
                EventManager.Add(ok.snapshotItem(0),'submit',function() {setOption('GETMONITORED',getActiveVillageId());},false)
        }        
    }        
      
}

function getMonitoredRallyPoints(monitordids) {    

    if (!monitordids || !monitordids[0]) { // monitordids[0] to check for mouse event
        monitordids = getOption(DEF_KEY_MONITOR_DID).split(',');    
        if (monitordids == '')
            return;  
    }
    
    // remember to be able to switch back
    var olddid = getActiveVillageId();    
        
	var url = document.URL;
	url = url.substring(0, url.lastIndexOf('/')+1);
		
    var options;    	
	options = [monitordids, 0, olddid];
	_log(2, 'Getting monitored dids: ' + monitordids);
	get(url + 'build.php?id=39&k&newdid=' + monitordids[0], handleGetRallypoint, options);
            
}

//<input height="20" border="0" width="50" type="image" onmouseout="btm0()" onmouseup="btm0()" onmouseover="btm1('s1','','img/de/b/ok3.gif',1)" onmousedown="btm1('s1','','img/de/b/ok2.gif',1)" src="img/de/b/ok1.gif" name="s1" value="ok"/>

function handleGetRallypoint(response,options) {
    if (response.readyState != 4) return;
	if (response.status != 200) return;   		             	
	
	var monitordids = options[0];		
	var didindex = options[1];
	var olddid = options[2];
	
	var did = monitordids[didindex];
	
	_log(2,'Getting Rallypoint of village ' + getVillageName(did));
	
	var response = response.responseText;
    var div = document.createElement('div');
    div.innerHTML = response;

	var ansDoc = document.implementation.createDocument('', '', null);
	ansDoc.onload = ansDoc.appendChild(div);
	//get data
	var lmid2Div = ansDoc.getElementById('lmid2');
	var nds = lmid2Div.childNodes;
	
	//alert(nds[2].tagName == 'P');
	                	
	var arr = -1; // index of first arriving
	var vil = -1; // index of village table
	var out = -1; // index of first outgoing
	var supp = -1;
	
	for (var i=0; i<nds.length;i++) {
	    var nd = nds[i].wrappedJSObject;
	    if(nd.tagName == 'P') {
	        var t = nd.textContent;
	        if (/Ankommende Truppen/.test(t))
	            arr = i+2;
	        if (/Truppen im Dorf/.test(t) && vil == -1) // vil == -1 because oases have same title
	            vil = i+2;
            if (/Truppen unterwegs/.test(t))
	            out = i+2;          
	        if (/Truppen in anderen Dörfern/.test(t))
	            supp = i + 2;                          	            
        }                	                  	                                                                          
    }
    // alert(arr + '|' + vil + '|' + out + '|' + supp);
    //arr
    var aEvents = new Array(4);
    aEvents[DEF_EVENTS_INCOMING] = parseEventTables(nds,arr).join('|');
    aEvents[DEF_EVENTS_VILLAGE] = parseEventTables(nds,vil).join('|');
    aEvents[DEF_EVENTS_OUTGOING] = parseEventTables(nds,out).join('|');
    aEvents[DEF_EVENTS_SUPPORT] = parseEventTables(nds,supp).join('|');
    
    writeData(DEF_KEY_EVENT + '_' + did, aEvents.join(';'));
    var now = new Date();
    writeData(DEF_KEY_EVENT + '_LASTREFRESH',Math.round(now.getTime()/1000));
    
    // see if we need to get more villages
    if (didindex == monitordids.length - 1) {
        // ..if not, refresh displaysefreshmonit
        
        refreshMonitorDiv();                
        refreshStatsDiv();
        
        setOption('GETMONITORED','false');
        
        // end reset active did
        if (olddid != did)
            get('dorf1.php?newdid='+olddid, function (response){ if (response.readyState == 4 && response.status == 200) _log(2,'did was reset.');});
        else
            _log(2,'No did reset necessary.');
            
    } else {
        // .. if so, get next in line (didindex + 1)
    	var url = document.URL;
	    url = url.substring(0, url.lastIndexOf('/')+1);
	    
        var options = [monitordids, didindex + 1, olddid];
	    get(url + 'build.php?id=39&k&newdid=' + monitordids[didindex + 1], handleGetRallypoint, options);    
	    
    }
}

var DEF_EVENTS_INCOMING = 0;
var DEF_EVENTS_VILLAGE = 1;
var DEF_EVENTS_OUTGOING = 2;
var DEF_EVENTS_SUPPORT = 3;

var DEF_KEY_EVENT = 'EVENTS';
//1221262266,397628,1,5_0_0_0_0_0_0_0_0_0,399235|1221262348,397628,1,4_0_0_0_0_0_0_0_0_0,397632|1221263501,397628,1,15_0_7_0_0_0_0_0_0_0,396807|1221263627,397628,1,5_0_0_0_0_0_0_0_0_0,407235|1221264021,397628,1,10_0_0_0_0_0_0_0_0_0,408038|1221267715,397628,1,49_0_59_0_10_6_0_0_0_0,408832|1221268405,397628,1,0_0_0_0_27_30_0_0_0_0,378409|1221271532,397628,1,10_0_5_0_0_0_0_0_0_0,396807|1221275274,397628,1,0_0_0_0_80_40_0_0_0_0,372771;
//,397628,1,84_240_138_50_79_132_10_10_0_0,;
//1221260642,397628,1,5_0_0_0_0_0_0_0_0_0,407235,1221261679,397628,1,5_0_0_0_0_0_0_0_0_0,399235,1221262172,397628,1,4_0_0_0_0_0_0_0_0_0,397632,1221262582,397628,1,10_0_0_0_0_0_0_0_0_0,408038,1221262999,397628,1,15_0_15_0_0_0_0_0_0_0,400027,1221264262,397628,1,5_0_0_0_0_0_0_0_0_0,407235;
//,397628,1,0_0_0_67_0_0_0_0_0_0,396022

function parseEventTables(nds,starti) {
    
    var res = new Array();
    if (starti > -1)        
        for (var i = starti; i<nds.length;i+=2) {
            var nd = nds[i];
                if (nd.tagName == 'TABLE') {
                    res.push(parseEventTable(nd.wrappedJSObject));
                } else
                    break;
        }
    return res;           
}

var DEF_AEVENT_TIME = 0;
var DEF_AEVENT_ATT_DID = 1;
var DEF_AEVENT_ATT_TRIBE = 2;
var DEF_AEVENT_ATT_UNITS = 3;
var DEF_AEVENT_DEF_DID = 4;
var DEF_AEVENT_TYPE = 5;
var DEF_AEVENT_TYPE_RETURN = 0;
var DEF_AEVENT_TYPE_RAID = 1;
var DEF_AEVENT_TYPE_SUPPORT = 2;
var DEF_AEVENT_TYPE_SPY = 3;
var DEF_AEVENT_TYPE_ATTACK = 4;

/**<table cellspacing="1" cellpadding="2" class="tbg">
	<tbody>
	    <tr class="cbg1">
	        <td width="21%">
	            <a href="karte.php?d=397628&amp;c=b6">
	                <span class="c0">.01. godspeed</span>
	            </a>
	        </td>
	        <td class="b" colspan="10">
	            <a href="karte.php?d=402422&amp;c=65">
	                <span class="c0">Rückkehr von Saphire Prime</span>
	            </a>
	        </td>
	     </tr>
	     <tr class="unit">
	        <td> </td>
	        <td><img title="Keulenschwinger" src="img/un/u/11.gif"/></td><td><img title="Speerkämpfer" src="img/un/u/12.gif"/></td><td><img title="Axtkämpfer" src="img/un/u/13.gif"/></td><td><img title="Kundschafter" src="img/un/u/14.gif"/></td><td><img title="Paladin" src="img/un/u/15.gif"/></td><td><img title="Teutonen Reiter" src="img/un/u/16.gif"/></td><td><img title="Ramme" src="img/un/u/17.gif"/></td><td><img title="Katapult" src="img/un/u/18.gif"/></td><td><img title="Stammesführer" src="img/un/u/19.gif"/></td><td><img title="Siedler" src="img/un/u/20.gif"/></td>	            
	     </tr>
	     <tr>
	        <td>Einheiten</td><td>10</td><td class="c">0</td><td>21</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td><td class="c">0</td>
	     </tr>
	     <tr class="cbg1">
	        <td>Ankunft</td>
	        <td colspan="10" class="s7">
	            <table cellspacing="0" cellpadding="0" width="100%" class="f10">
					<tbody>
					    <tr align="center">
					        <td width="50%">  in <span id="timer1">0:07:50</span> Std.</td>
					        <td width="50%">um 23:24:41<span> Uhr</span></td>
					    </tr>
					</tbody>
			    </table>
			</td>
	     </tr>
	</tbody>
</table> **/
function parseEventTable(tbl) {
    var aEvent = new Array(6);        
    
    var ddiv = createDummyDiv('<table>' + tbl.innerHTML + '</table>');
    
    var links = xpath('//a',ddiv);
    
    aEvent[DEF_AEVENT_ATT_DID] = getParamFromUrl(links.snapshotItem(0).href,'d');
    var attname = links.snapshotItem(0).textContent;
    cachePlaceName(aEvent[DEF_AEVENT_ATT_DID],attname);
    setKarteCode(aEvent[DEF_AEVENT_ATT_DID],getParamFromUrl(links.snapshotItem(0).href,'c'));
    
    aEvent[DEF_AEVENT_DEF_DID] = getParamFromUrl(links.snapshotItem(1).href,'d');
    
    
    var time = xpath("//span[contains(@id,'timer')]",ddiv);
    
    if (time.snapshotLength > 0) { // support and athome dont have time
        aEvent[DEF_AEVENT_TIME] = getTimeFromTravianTimeString(time.snapshotItem(0).textContent);
        var defname = links.snapshotItem(1).textContent.replace("Rückkehr von ",'').replace("Raubzug gegen ",'').replace("Angriff auf ",'').replace("Spähangriff gegen ",'').replace("Unterstützung von ",'').replace('Unterstützung für ','');
        
        if (/^Raubzug gegen /.test(links.snapshotItem(1).textContent)) {
            aEvent[DEF_AEVENT_TYPE] = DEF_AEVENT_TYPE_RAID;            
        } 
        if (/^Rückkehr von  /.test(links.snapshotItem(1).textContent)) {
            aEvent[DEF_AEVENT_TYPE] = DEF_AEVENT_TYPE_RETURN;            
        } 
        if (/^Angriff auf /.test(links.snapshotItem(1).textContent)) {
            aEvent[DEF_AEVENT_TYPE] = DEF_AEVENT_TYPE_ATTACK;            
        } 
        if (/^Spähangriff gegen /.test(links.snapshotItem(1).textContent)) {
            aEvent[DEF_AEVENT_TYPE] = DEF_AEVENT_TYPE_SPY;            
        } 
        if (/^Unterstützung /.test(links.snapshotItem(1).textContent)) {
            aEvent[DEF_AEVENT_TYPE] = DEF_AEVENT_TYPE_SUPPORT;            
        } 
                
        cachePlaceName(aEvent[DEF_AEVENT_DEF_DID],defname);
        setKarteCode(aEvent[DEF_AEVENT_DEF_DID],getParamFromUrl(links.snapshotItem(1).href,'c'));        
    }
    var trimg = xpath("//tr[@class='unit']/td/img[1]",ddiv);
    
    aEvent[DEF_AEVENT_ATT_TRIBE] = getTribeFromImg(trimg.snapshotItem(0).getAttribute('src'));
    
    var troopstr = xpath("//tr/td[text()='Einheiten']/..",ddiv).snapshotItem(0);
    
    var troops = getTrContents(troopstr,1);         
    
    if (troops)
        aEvent[DEF_AEVENT_ATT_UNITS] = troops.join('_');   
    
    return aEvent;        
    
}

function getTimeFromTravianTimeString(str) {    
    var dbLvl = 2;
    // 
    
    // TODO: get absolute time in order to get correct times
    
    var d = str.match(/(\d?\d)\:(\d\d)\:(\d\d)/);
    _log(dbLvl,d.join('|'));
    
    var shift = 1000 * (1*d[3] + 60*d[2] + 3600*d[1]);
    
    var oDate = new Date();
    oDate.setTime(oDate.getTime() + shift);
    oDate.setMilliseconds(1000); // round up
    
    _log(dbLvl,oDate.toLocaleString());
    
    return oDate.getTime()/1000;
}

function getTimeSpanFromTravianTimeSpanString(str) {    
    var dbLvl = 2;
    // um 17:16:19
    
    var timeSpanMatches = str.match(/(\d\d)?\:?(\d\d)\:(\d\d)/);
    _log(dbLvl,timeSpanMatches.join('|'));
    
    var hrs = timeSpanMatches[1];   
    if (!hrs)
        hrs = 0;
    var shift = (1*timeSpanMatches[3] + 60*timeSpanMatches[2] + 3600*hrs);    
    
    return shift;
}

var DEF_MONITOR_DIV = 'ttq_monitor';
var DEF_MONITOR_DRAGHANDLE = DEF_MONITOR_DIV + '_draghandle';
var DEF_OPTION_KEY_MONITOR_POSITION = 'MONITOR_POSITION';

function refreshMonitorDiv() {
    
    _log(2, "Refreshing monitor...");
    // Remove old stats
    var oOldStats = $(DEF_MONITOR_DIV);
    if(oOldStats) {
        document.body.removeChild(oOldStats)
    }

    //if (!getOption(DEF_OPTION_STATS_SHOW,true))
    //    return;     
        
    //Create new tasklist
    var oStats = document.createElement('div');
    oStats.id = DEF_MONITOR_DIV;
    oStats.innerHTML = "<div id='" + DEF_MONITOR_DRAGHANDLE +"' class='handle ttq_draghandle'>"
        + translate("Monitor") +"</div>";
    
    // real minimitzed
    var realminimize = getOption('MONITOR_REALMINIMIZED',false);
    var realminimizespan = document.createElement('span');
    if (!realminimize)
        realminimizespan.innerHTML = '&nbsp;&nbsp;<-';
    else
        realminimizespan.innerHTML = '&nbsp;&nbsp;->';
        
    realminimizespan.setAttribute('style','cursor:pointer;');      
    EventManager.Add(realminimizespan,'click',function(e) { setOption('MONITOR_REALMINIMIZED',!getOption('MONITOR_REALMINIMIZED',false)); refreshMonitorDiv(); }, false);        

    //position the list
    var listCoords = getOption(DEF_OPTION_KEY_MONITOR_POSITION, "600px_125px");
    listCoords = listCoords.split("_");
    oStats.style.top = listCoords[0];
    oStats.style.left = listCoords[1];
    oStats.style.position = "absolute";
        
    document.body.appendChild(oStats);
    $(DEF_MONITOR_DRAGHANDLE).appendChild(realminimizespan);     
    
    makeDraggable($(DEF_MONITOR_DRAGHANDLE));
    
    // return if minimized
    if (getOption('MONITOR_REALMINIMIZED',false))
        return;

    var now = new Date();
    now = now.getTime()/1000;
                
    // make refresh link
    var last = readData(DEF_KEY_EVENT + '_LASTREFRESH');
    var lasts = '';
    if (last != '') {                                    
        var tpspans = xpath("//span[contains(@id,'tp')]");                
        lasts = '&nbsp;&nbsp;<span id="monitorrefresh" class="c">(<span id="tp' + (tpspans.snapshotLength +1) + '">' + formatTimeSpan(Math.max(now - last,0),true) + '</span> ago)</span>';                    
    } else
        lasts = '';
    
    var s = '';
    

    
    if (isInt(last)) {
       
        s+='<span id="refreshspan" style="cursor:pointer;">reload rally points' + lasts + '</span><br>';       
             
        // get villages info and make home overview
        var mdid = getOption(DEF_KEY_MONITOR_DID).split(',');    
        var inc = new Array();
        var out = new Array();
        s  += '<hr><table class="tbas" style="text-align:center;width:100%;"><tr nowrap class="unit"><td colspan="2" style="text-align:left"><h2>at home</h2></td>'
        for (var i=1;i<10;i++)
            s+='<td style="padding:4px;"><img src="img/un/u/' + (iMyRace>0?iMyRace:'') + i + '.gif"></td>';
        s+='<td style="padding:4px;"><img src="img/un/u/hero.gif"></td></tr>';
        
        // VILLAGE OVERVIEW --------
        ///
        ///
        for (var i= 0; i<mdid.length; i++) {
                
            var devents = readData(DEF_KEY_EVENT + '_' + mdid[i]).split(';');
            
            if (devents[DEF_EVENTS_INCOMING] && devents[DEF_EVENTS_INCOMING] != '')        
                inc = inc.concat(devents[DEF_EVENTS_INCOMING].split('|'));
            if (devents[DEF_EVENTS_OUTGOING] && devents[DEF_EVENTS_OUTGOING] != '')
                out = out.concat(devents[DEF_EVENTS_OUTGOING].split('|'));
            
            var newdid = document.location;
            if (/\?/.test(newdid))
                newdid += '&newdid=' + mdid[i];
            else
                newdid += '?newdid=' + mdid[i];
            
            // home overview
            if (devents[DEF_EVENTS_VILLAGE]) {
                s+='<tr>';
                s+= '<td>[' + (i+1) + ']</td><td nowrap style="padding:4px;text-align:left;"><a href="' + newdid + '">' + getVillageName(mdid[i]) + '</a></td>';
                var homeunits = devents[DEF_EVENTS_VILLAGE].split(',')[DEF_AEVENT_ATT_UNITS].split('_');
                try {
                    if (homeunits.length == 11) { //hero, skip seddler
                        homeunits[9] = homeunits[10];                        
                    }
                } catch (e)
                {alert('fix line 7020!');}
                for (var j=0;j<10;j++)
                    s+= '<td style="padding:4px;"' + (homeunits[j]>0?'':'class="c"') +'>' + homeunits[j] + "</td>";
                s+='</tr>';                  
            } else {
                s+='<tr>';
                s+= '<td>[' + (i+1) + ']</td><td nowrap style="padding:4px;text-align:left;"><a href="' + newdid + '">' + getVillageName(mdid[i]) + '</a></td><td colspan="10">[no rally point]</td></tr>';
            }            
            
        }
        s+='</table>';
        
        // sort by time
        inc = inc.sort(eventSort);
        out = out.sort(eventSort);
        
        var nextevent = Infinity;
        var nextDid;
        
        var dueEventDids = new Array();
        
        var ownvillagesz = getAllOwnVillageZ();
        var ownvillagedid = getAllOwnVillageDid();
        
        _logArray(2,ownvillagedid,'own villages dids');
        _logArray(2,ownvillagesz,'own villages zs');
        
        // INCOMING --------
        ///
        ///
        s += '<h2>arriving</h2>';
        s += '<table style="font-size:default;width:100%;">'
        // get own villages z
        
        //alert(ownvillagesz);
        var arrive = getOption('MONITOR_ARRIVE',true);       
          
        for (var i=0; i<inc.length;i++) {
            
        
            var aEvent = inc[i].split(',');
                       
            // check if it is attack or returning troops             
            var incatt = false;
            for (var j=0;j<ownvillagesz.length;j++) {
                _log(3,'defdid=' + aEvent[DEF_AEVENT_DEF_DID] + '/ownvillagesz[j]=' + ownvillagesz[j]);
                if (aEvent[DEF_AEVENT_DEF_DID] == ownvillagesz[j]) {
                    incatt = true;      
                    _log(2,'Attack detected.');
                    break;
                }
            }
            
            if (aEvent[DEF_AEVENT_TIME]-now <= 0) {
                var didtorefresh;
                if (incatt)
                    didtorefresh = getOwnVillageDidForZ(aEvent[DEF_AEVENT_DEF_DID],ownvillagesz,ownvillagedid);
                else
                    didtorefresh = getOwnVillageDidForZ(aEvent[DEF_AEVENT_ATT_DID],ownvillagesz,ownvillagedid);
                
                _log(2,'breaking incoming loop to refresh ' + didtorefresh);    
                //getMonitoredRallyPoints([didtorefresh]);
                if (dueEventDids.indexOf(parseInt(didtorefresh)) == -1)
                    dueEventDids.push(parseInt(didtorefresh));
                //return;
            }
                        
            if (nextevent > aEvent[DEF_AEVENT_TIME]) {           

                nextevent = aEvent[DEF_AEVENT_TIME];
                
                if (incatt)
                    nextDid = getOwnVillageDidForZ(aEvent[DEF_AEVENT_DEF_DID],ownvillagesz,ownvillagedid);
                else
                    nextDid = getOwnVillageDidForZ(aEvent[DEF_AEVENT_ATT_DID],ownvillagesz,ownvillagedid);
                    _log(2,'nextevent in ' + (nextevent - now) + 's. at did ' + nextDid);
            }
            
            if (!incatt) {                 
                var dindex = ownvillagesz.indexOf(parseInt(aEvent[DEF_AEVENT_ATT_DID]));                
            } else
                var dindex = ownvillagesz.indexOf(parseInt(aEvent[DEF_AEVENT_DEF_DID]));             
           
            dindex = mdid.indexOf(ownvillagedid[dindex]);                 
                    
            s += '<tr>';             
            s += '<td title="at ' + formatDateTimeRelative(aEvent[DEF_AEVENT_TIME]) + '" name="ttqtimer">' + formatTimeSpan(aEvent[DEF_AEVENT_TIME]-now,true) + '</td>';   
            
            var color = "#000000";
            if (incatt)
                color = "#C00000";
            if (aEvent[DEF_AEVENT_TYPE] == DEF_AEVENT_TYPE_SUPPORT)
                color = "#00C000";
            
            if (!incatt) { 
                s += '<td nowrap style="color:' + color + ';">' + getPlaceName(aEvent[DEF_AEVENT_DEF_DID]) + '</td>';                
            } else {
                s += '<td nowrap style="color:' + color + ';" title="attacking ' + getPlaceName(aEvent[DEF_AEVENT_DEF_DID]) + '">' + getPlaceName(aEvent[DEF_AEVENT_ATT_DID]) + '</td>';
            }                
            
            if (aEvent[DEF_AEVENT_ATT_UNITS]) {
                s += '<td nowrap>' + getTroopsInfoImg(aEvent[DEF_AEVENT_ATT_UNITS].split('_'),1,-1) + '</td>';
                s += '<td nowrap>' + getTroopsCarry(aEvent[DEF_AEVENT_ATT_UNITS].split('_'),1,-1) + '</td>';
            } else 
                s+= '<td>?</td><td/>';
            s += '<td style="text-align:right;">[' + (dindex+1) + ']</td>';                                  
            s += '</tr>';
            
            
             
            if ((!arrive || i==inc.length-1) && i >= 4) {
                var minimizer = '<span style="cursor:pointer;color:#c0c0c0;" id="arriveminimizer">';
                if (arrive)
                    minimizer+= 'show only next 5';
                else
                    minimizer+= 'show all (' + inc.length +')';
                minimizer += '</span>';
                    
                s += '<tr><td colspan="9" style="text-align:center;">' + minimizer + '</td></tr>';
            
                break;
            }
            if ((i==inc.length-1) && i < 4)
                s += '<tr><td colspan="9" style="text-align:center;" class="c">(showing all ' + (i + 1) + ' incoming)</td></tr>';
        }
        
        s+='</table>';
        
        
        
        // OUTGONIG --------
        ///
        
        s+='<h2>attacks</h2><table style="width:100%;">'
        
        for (var i=0; i<out.length;i++) {
            var aEvent = out[i].split(',');
            
            if (aEvent[DEF_AEVENT_TIME]-now <= 0) {
                var didtorefresh = getOwnVillageDidForZ(aEvent[DEF_AEVENT_ATT_DID],ownvillagesz,ownvillagedid);
                
                _log(2,'breaking incoming loop to refresh ' + didtorefresh);    
                if (dueEventDids.indexOf(parseInt(didtorefresh)) == -1)
                    dueEventDids.push(parseInt(didtorefresh));
                //getMonitoredRallyPoints([didtorefresh]);
                //return;
            }
            
            if (nextevent > aEvent[DEF_AEVENT_TIME]) {                
                nextevent = aEvent[DEF_AEVENT_TIME];
                nextDid = getOwnVillageDidForZ(aEvent[DEF_AEVENT_ATT_DID],ownvillagesz,ownvillagedid);
                _log(2,'nextevent in ' + (nextevent - now) + 's. at did ' + nextDid);
            }
            
            // check for attacks on own village
            var color = "#000000";
            if (ownvillagesz.indexOf(parseInt(aEvent[DEF_AEVENT_DEF_DID])) > -1)
                color = "#C00000";
            if (aEvent[DEF_AEVENT_TYPE] == DEF_AEVENT_TYPE_SUPPORT)
                color = "#00C000";
            
            s += '<tr>';
            
            s += '<td title="at ' + formatDateTimeRelative(aEvent[DEF_AEVENT_TIME]) + '" name="ttqtimer">' + formatTimeSpan(aEvent[DEF_AEVENT_TIME]-now,true) + '</td>';
            s += '<td nowrap style="color:' + color + ';" title="' + aEvent[DEF_AEVENT_TYPE] + '">' + getPlaceName(aEvent[DEF_AEVENT_DEF_DID]) + '</td>';
            if (aEvent[DEF_AEVENT_ATT_UNITS]){
                s += '<td nowrap>' + getTroopsInfoImg(aEvent[DEF_AEVENT_ATT_UNITS].split('_'),1,-1) + '</td>';
                s += '<td nowrap>' + getTroopsCarry(aEvent[DEF_AEVENT_ATT_UNITS].split('_'),1,-1) + '</td>';
            }
            var dindex = ownvillagesz.indexOf(parseInt(aEvent[DEF_AEVENT_ATT_DID]));     
            dindex = mdid.indexOf(ownvillagedid[dindex]);                 
                           
            s += '<td style="text-align:right;">[' + (dindex+1) + ']</td>';   
            s += '</tr>';
            
            var arrive = getOption('MONITOR_OUT',true);        
            if ((!arrive || i==out.length-1) && i >= 4) {
                var minimizer = '<span style="cursor:pointer;color:#c0c0c0;" id="outminimizer">';
                if (arrive)
                    minimizer+= 'show only next 5';
                else
                    minimizer+= 'show all (' + out.length +')';
                minimizer += '</span>';
                    
                s += '<tr><td colspan="9" style="text-align:center;">' + minimizer + '</td></tr>';
            
                break;
            }
            if ((i==out.length-1) && i < 4)
                s += '<tr><td colspan="9" style="text-align:center;" class="c">(showing all ' + (i + 1) + ' attacks)</td></tr>';
        }
        
        s+='</table>';
    } else {
        s+='No monitored villages. Click <a href="#" id="setmonitored">here</a> to set them.<br> You can later add or delete villages via the GreaseMonkey->Script commands menu.';        
    }
    
    // append history
    var ao = readData(DEF_PREFIX_REPORTS_OVERVIEW).split('|');
    if (ao=='')
        return;
   
    ao.reverse();
                
    s += '<h2>history</h2><table style="width:100%;">';
    
    for (var i=0;i<ao.length;i++) {                    
        var rd = string2AReport(ao[i]);
        var placename = getPlaceName(rd[DEF_AREPORT_DEF_DID]);            
        s += '<tr>';
                
        var losttot = (rd[DEF_AREPORT_ATT_LOST]?getTroopsCost(rd[DEF_AREPORT_ATT_LOST]):0);

        if (!rd[DEF_AREPORT_DEF_DID]) {
            _log(2,"not displaying: " + aReport2HRString(rd));
            s+='<td>'+ formatTimeSpan(now - rd[DEF_AREPORT_TIME]) + '</td>';
            s+='<td style="text-align:left;"><a style="color:red" href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">Unknown Village</a></td>'+ 
                    '<td style="color:#C00000;text-align:right">' + (-losttot) + '</td><td class="c" style="text-align:right">0%</td></tr>';            
            continue;
        }
        
        restot = 0;
        
        for(var j=0; j<rd[DEF_AREPORT_ATT_RES].length;j++)
            restot += parseInt(rd[DEF_AREPORT_ATT_RES][j]);  
        
        var losttot = (rd[DEF_AREPORT_ATT_LOST]?getTroopsCost(rd[DEF_AREPORT_ATT_LOST]):0);            
        var troopsreturn = rd[DEF_AREPORT_ATT_UNITS];            
        if (rd[DEF_AREPORT_ATT_LOST])
            troopsreturn = arraySubtract(troopsreturn,rd[DEF_AREPORT_ATT_LOST]);
        if (rd[DEF_AREPORT_ATT_CAPTURED])
            troopsreturn = arraySubtract(troopsreturn,rd[DEF_AREPORT_ATT_CAPTURED]);
        
        var carrymax = getTroopsCarry(troopsreturn, 1, -1);

            
        s+= '<td>'+ formatTimeSpan(now - rd[DEF_AREPORT_TIME]) + '</td>';
        
        var c = getKarteCode(rd[DEF_AREPORT_DEF_DID]);
        var namea = '';    
        if (c != null) {
            namea = '<a style="" href="karte.php?d=' + rd[DEF_AREPORT_DEF_DID] + '&c=' + c + '">' + placename + '</a>';                
        } else
            namea = placename;         
        
        // overwrite, want reports linked
        
        namea += '&nbsp;<a style="color:#c0c0c0;" href="berichte.php?id=' + rd[DEF_AREPORT_ID] + '">r</a>';
        namea += '&nbsp;<a style="color:#c0c0c0;" href="a2b.php?z=' + rd[DEF_AREPORT_DEF_DID] + '">a</a>';
                    
        s+= '<td style="text-align:left;">' + namea + '</td>';
        
        var restitle = '+' + restot + ' | ' + (-losttot); 
        
        var gain = restot - losttot;                     
        var colstr = '#C0C0C0';            
        if (gain > 0)
            colstr = '#00C000';                               
                                               
        if (gain < 0 || losttot>0)
            colstr = '#C00000';       
            
        if (losttot > 0 && gain >= 0)
            colstr = 'darkorange';                                  
             
        s+= '<td style="text-align:right;color:' + colstr + ';" title="' + restitle +  '">' + gain + '</td>';
                
        // efficiency
        var percent = round(restot/carrymax*100,0);
        var percentcolor = "color:#C0C0C0;";            
        percentcolor = percent > 90?'color:#808080;':percentcolor;
        percentcolor = percent >= 99?'color:#303030;':percentcolor;
        s+= '<td style="text-align:right;' + percentcolor + '">' + percent + '%</td>';
                    
        var dindex = ownvillagesz.indexOf(parseInt(rd[DEF_AREPORT_ATT_DID]));                    
        
        s += '<td style="text-align:right;">[' + (dindex+1) + ']</td>';   
                                
        s += '</tr>';
        
        var arrive = getOption('MONITOR_HIST',true);        
        if ((!arrive || i==ao.length-1) && i >= 9) {
            var minimizer = '<span style="cursor:pointer;color:#c0c0c0;" id="histminimizer">';
            if (arrive)
                minimizer+= 'show only last 10';
            else
                minimizer+= 'show all (' + ao.length +')';
            minimizer += '</span>';
                
            s += '<tr><td colspan="9" style="text-align:center;">' + minimizer + '</td></tr>';
        
            break;
        }
        if ((i==ao.length-1) && i < 9)
                s += '<tr><td colspan="9" style="text-align:center;" class="c">(showing all ' + (i + 1) + ')</td></tr>';
    }
    s += '</table>';
        
    var oSpan = document.createElement('span');
    oSpan.innerHTML = s;
    oStats.appendChild(oSpan);
    
    EventManager.Add($('arriveminimizer'),'click',function(e) { setOption('MONITOR_ARRIVE',!getOption('MONITOR_ARRIVE',true)); refreshMonitorDiv(); }, false);           
    EventManager.Add($('outminimizer'),'click',function(e) { setOption('MONITOR_OUT',!getOption('MONITOR_OUT',true)); refreshMonitorDiv(); }, false);           
    EventManager.Add($('histminimizer'),'click',function(e) { setOption('MONITOR_HIST',!getOption('MONITOR_HIST',true)); refreshMonitorDiv(); }, false);           
    EventManager.Add($('refreshspan'),'click',getMonitoredRallyPoints,false);
    
    if($('setmonitored'))
        EventManager.Add($('setmonitored'),'click',promptMonitorDids,false);              
    
    if (nextevent < Infinity) {// if we have an event
        window.setTimeout(function() {getMonitoredRallyPoints([nextDid]);}, (nextevent-now+1)*1000);
    }
    
    if (dueEventDids.length > 0)
        getMonitoredRallyPoints(dueEventDids);
    
    loadTime = getCurrentTimeInSeconds();
    initCounter();    
    
    //for (var i in unsafeWindow)
    //    _log(2,unsafeWindow[i]);
}

function getSeconds(element) {
    p = element.innerHTML.split(":");
    qb = p[0] * 3600 + p[1] * 60 + p[2] * 1;
    return qb;
}

function getCurrentTimeInSeconds() {
    return Math.round((new Date).getTime() / 1000);
}

function formatSeconds(s) {
    var sb, tb, ub;
    if (s > -1) {
        sb = Math.floor(s / 3600);
        tb = Math.floor(s / 60) % 60;
        ub = s % 60;
        t = sb + ":";
        if (tb < 10) {
            t += "0";
        }
        t += tb + ":";
        if (ub < 10) {
            t += "0";
        }
        t += ub;
    } else {
        t = s + ' s. ago';
    }
    return t;
}

var loadTime = getCurrentTimeInSeconds();
var ab = new Array();

function initCounter() {
    var counters = document.getElementsByName('ttqtimer');
    for (var i = 0; i < counters.length; i++) {
        pb = counters[i].wrappedJSObject;
        if (pb != null) {
            ab[i] = new Object;
            ab[i].node = pb;
            ab[i].counter_time = getSeconds(pb);
        } else {
            break;
        }                
    }    
    _log(2,'timers init ok, ' + ab.length + ' timers.');
    executeCounter();
}

function executeCounter() {    
    for (var i = 0;i<ab.length;i++) {
        var vb = getCurrentTimeInSeconds() - loadTime; 
        var restTime = ab[i].counter_time - vb;
        ab[i].node.innerHTML = formatSeconds(restTime);
    }
    if (ab.length>0)   
        window.setTimeout(executeCounter,1000);
}

function eventSort(e1,e2) {    
    return e1.split(',')[DEF_AEVENT_TIME] - e2.split(',')[DEF_AEVENT_TIME];
}

function getNextTimer() {
    for(var i=1;;i++)
        if(!document.getElementById('timer'+i))
            break;
            
    return i;            
}

function SlidingAverage(max) {
    this.maxcount = max;
    this.sum = 0;
    this.count = 0;
    this.maximum = -Infinity;
    this.minimum = Infinity;
}

SlidingAverage.prototype.add = function(val) {    
    if (this.count < this.maxcount) {
        this.count++;
        this.sum += val;
        this.maximum = Math.max(this.maximum,val);
        this.minimum = Math.min(this.minimum,val);
    }
}

SlidingAverage.prototype.average = function() {
    return this.sum/this.count;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////  VILLAGE INFO     ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function infoDisplayMain() {
    
    var did 
    if (/karte\.php/g.test(location.href))
        did = getParamFromUrl(location.href,'d');
    
    var isa2b = false;
    if (/a2b\.php/g.test(location.href)) {
        did = getParamFromUrl(location.href,'z');
        isa2b = true;
        
        var a = document.createElement('input');
        a.id = 'traveltime';
        a.type = 'hidden';    
        a.value = -1;        
        document.body.appendChild(a);
        
   }
                
    if (!did)
        return;
    
    $('lmid2').parentNode.innerHTML +='<br>';
    if (isa2b)
        if (getKarteCode(did))
            $('lmid2').parentNode.innerHTML += '<h2><center><a href="karte.php?d=' + did + '&c=' + getKarteCode(did) + '">' + getPlaceName(did) + '</a></center></h2>';
        else
            $('lmid2').parentNode.innerHTML += '<h2><center><a href="karte.php?z=' + did + '">' + getPlaceName(did) + '</a></center></h2>';
    
    // distance
    var ownz = getAllOwnVillageZ();    
    for (var i = 0; i<ownz.length;i++)
        ownz[i] = {dist: coordZtoZDistance(ownz[i],did), did:ownz[i]};
            
    ownz.sort(function (o1,o2) { return o1.dist-o2.dist; } );    
    
    if (!isa2b) { // takes too much space
        var s = '<h3>Distances</h2><table style="font-size:10px;">';
        for (var i=0;i<ownz.length;i++)
            s+='<tr><td>' + round(ownz[i].dist,1) + '</td><td style="color:' + (i==0?'#00C000':'c0c0c0') + '">' + getPlaceName(ownz[i].did) + '</td></tr>';
         
        $('lmid2').parentNode.innerHTML += s;
    } else {
        var adid = getActiveVillageZ();        
        $('lmid2').parentNode.innerHTML += round(coordZtoZDistance(adid,did),1) + ' from active village ' + getPlaceName(adid) + '<br>';
        if (adid != ownz[0].did)
            $('lmid2').parentNode.innerHTML += round(ownz[0].dist,1) + ' from nearest village ' + getPlaceName(ownz[0].did);        
    }
    
    // population
    appendPopulationGraph(did,'lmid2');       
    
    // rest        
    var firstrun = false;
    if ($('infodiv'))
        firstrun = true;
    
    var aDids = getReportDids();
    var i = aDids.indexOf(did);
    
    if (isa2b)
        var s = "<p>";       
    else
        var s = '';
    
    if (i>=0) {
        
        var aMeta = getReportDidMeta(did);
           
        var prefix = DEF_PREFIX_REPORTS + "_" + did;        
        aData = readData(prefix + "_" + DEF_PREFIX_REPORTS_DATA);
        aData = aData.split('|');        
        
        aData.sort(reportArraySort); // todo: sort on update
        aData.reverse();
        
        var now = new Date();
        now = now.getTime()/1000;
        
        //s += i + "<br>";
        //s += aMeta + '<br>';
        //s += aData;
        
        var n = aMeta[DEF_AMETA_NUM];
        if (isa2b) {
            var mx = aMeta[DEF_AMETA_MAXATTP_LOSTU];
            var mi =  aMeta[DEF_AMETA_MINATTP_OK];
            s+= '<span style="color:red">' + (mx?mx:'?') + '</span>&nbsp;&lt;&nbsp;attp&nbsp;&lt;&nbsp;' + '<span style="color:green">' + (mi?mi:'?') + '</span>';            
        }
        
        var simple = '<p><h3>Simple Stats</h3><p>' + n + ' reports in local database.<p>';
        if (n>1) {
            var first = aData[aData.length-1].split(',');            
            var last = aData[0].split(',');
            var firsttime = first[DEF_AREPORT_TIME];
            var lasttime = last[DEF_AREPORT_TIME];
            
            simple += '<table>'            
            simple+='<tr><td style="text-align:right;">First:</td><td>' + formatDateTimeRelative(firsttime) + '</td><td>(' + formatTimeSpan(now-firsttime) +' ago)</td></tr>'
            simple+='<tr><td style="text-align:right;">Last:</td><td>' + formatDateTimeRelative(lasttime) + '</td><td>(' + formatTimeSpan(now-lasttime) +' ago)</td></tr>';
            simple+='<tr><td style="text-align:right;">Time in between:</td><td>' + formatTimeSpan(lasttime - firsttime) + '</td></tr>';
            simple+='<tr><td style="text-align:right;">Average time between attacks:</td><td>' + formatTimeSpan((lasttime - firsttime)/(n-1)) + '</td></tr>';                        
            simple+='</table><p>';
        }
        
        s+='<div id="calcdiv"></div>'
        
        s += '<p><h3>Details</h3><p><table style="width:100%;">';
        s += '<thead><tr style="text-align:center"><td>time</td>';
        for (var k=1;k<9;k++)
            s+='<td style="text-align:center"><img src="img/un/u/' + (iMyRace>0?iMyRace:0) + k +'.gif"/></td>'
              
       s += '<td>ap</td><td>dinf</td><td>dkav</td><td>netto</td><td>eff</td><td>delta</td>'
        s += '</thead><tbody>'

       
       var deltamax = 0;
       var deltamaxt = 0;
       
       var robbed10 = new SlidingAverage(10);              
       var robbedAll = new SlidingAverage(Infinity);
       var delta10 = new SlidingAverage(10);              
       var deltaAll =  new SlidingAverage(Infinity);
       var oAp = new SlidingAverage(Infinity);
       var oLost = new SlidingAverage(Infinity);
       var oNetto = new SlidingAverage(Infinity);
       var oEff = new SlidingAverage(Infinity);       
       
       var aRobbed = new Array(aData.length);
       var aCarryReturn = new Array(aData.length);
       var aEff = new Array(aData.length);
       var aTime = new Array(aData.length);
       
       
       // gather data
       for (var j=0;j<aData.length;j++) {
            var aReport = string2AReport(aData[j]);    
                    
            aData[j] = new Object();
            aData[j].report = aReport;
            
            aData[j].time = aReport[DEF_AREPORT_TIME];            
            aTime[j] = aReport[DEF_AREPORT_TIME];
            
            aData[j].robbed = arraySum(aReport[DEF_AREPORT_ATT_RES]);   
            
            aRobbed[j] = aData[j].robbed;                                           
            robbed10.add(aData[j].robbed);
            robbedAll.add(aData[j].robbed);
            
            var lostu = aReport[DEF_AREPORT_ATT_LOST];
            var lost = (lostu?getTroopsCost(lostu):0);
            
            aData[j].lost = lost;
            
            aData[j].netto = aData[j].robbed - lost;
            oNetto.add(aData[j].robbed - aData[j].lost);
            
            aData[j].carryReturn = getCarryReturn(aReport);
            aCarryReturn[j] = aData[j].carryReturn;
            
            aData[j].ap = getTroopsSumByIndex(aReport[DEF_AREPORT_ATT_UNITS],0,1,-1);
            oAp.add(aData[j].ap);
            
            var percent = aData[j].robbed/aData[j].carryReturn;
            oEff.add(isNaN(percent)?0:percent);
            aEff[j] = isNaN(percent)?0:percent;
       }
       
       for (var j=0;j<aData.length;j++) {
                        
            var aReport = aData[j].report;
            
            s += '<tr style="text-align:center">';
            
            // time of day column
            var exacttime = 'Attack was at ' + formatDateTimeRelative(aReport[DEF_AREPORT_TIME]) + ' (' + formatTimeSpan(now - aReport[DEF_AREPORT_TIME]) + ' ago)';            
            var timeofday = new Date(aReport[DEF_AREPORT_TIME]*1000);                                    
            var timecol;
            if (timeofday.getHours() <= 5)
                timecol = 'darkblue';
            else if (timeofday.getHours() <= 11)
                timecol = 'darkturquoise';
            else if (timeofday.getHours() <= 17)
                timecol = 'darkorange';
            else
                timecol = 'crimson';                                
            s+='<td title="' +exacttime +'" style="color:' + timecol +  ';">' + padInt(timeofday.getHours())+':'+padInt(timeofday.getMinutes()) + 'h</td>';
                        
            // TPOOPS
            var aTroops = aReport[DEF_AREPORT_ATT_UNITS];
            for(var k=0;k<8;k++)
                s+='<td class="' + (aTroops[k]>0?'':'c') + '" style="text-align:center">' + aTroops[k]+ '</td>';
            
            // AP column
            s += '<td class="c">' + aData[j].ap + '</td>';
            // DP culumns
            if (aReport[DEF_AREPORT_DEF_UNITS]) {
                var definf = getTroopsSumByIndex(aReport[DEF_AREPORT_DEF_UNITS],DEF_TROOPDATA_DEFINF,1,-1,aReport[DEF_AREPORT_DEF_TRIBE]);
                var defkav = getTroopsSumByIndex(aReport[DEF_AREPORT_DEF_UNITS],DEF_TROOPDATA_DEFKAV,1,-1,aReport[DEF_AREPORT_DEF_TRIBE]);
            } else {
                var definf = 0;
                var defkav = 0;
            }
            s+='<td class="' + (definf==0?'c':'') + '">' + definf + '</td>';
            s+='<td class="' + (defkav==0?'c':'') + '">' + defkav + '</td>';
            
            var def = definf + defkav;  
            // NETTO column
            var robbed = aData[j].robbed;                           
            var lost = aData[j].lost;
            var carryReturn = aData[j].carryReturn;            
            var netto = aData[j].netto;
          
            var restitle = '+' + robbed + ' | ' + (-lost) + ', ' + (def>0?definf + '/' + defkav:'no') + ' defense.';             
            
            var colstr = '#C0C0C0';            
            if (netto > 0)
                colstr = '#00C000';                               
                                                   
            if (netto < 0 || lost > 0)
                colstr = '#C00000';       
                
            if (lost > 0 && netto >= 0)
                colstr = 'darkorange';                                  
                 
            s+= '<td style="color:' + colstr + ';" title="' + restitle +  '">' + netto + '</td>';
                                    
            // EFF column
            var percent = round(robbed/carryReturn*100,0);
            var percentcolor = "color:#C0C0C0;";            
            percentcolor = percent > 90?'color:#808080;':percentcolor;
            percentcolor = percent >= 99?'color:#303030;':percentcolor;
            
            if (isNaN(percent)) {
                percent = '';
            }
            s+= '<td style="' + percentcolor + '">' + (percent!=''?percent+'%':'') + '</td>';            
            
            // do calculations
            var delta;
            //var deltastrper = '';            
            var greyout = robbed==0;
            if (j<aData.length-1) {
                // index of last attack that didnt get 100% back and wasnt no returned troops
                var lastIndex = -1; 
                var sumrobbedsince = 0;
                for (var k=j+1; k<aData.length;k++) {
                    
                    if (lastIndex == -1 && aData[k].carryReturn > 0 && aData[k].robbed < aData[k].carryReturn) 
                        lastIndex = k;
                        
                    if (lastIndex == -1)             
                        sumrobbedsince += aData[k].robbed;          
                }

                if (lastIndex == -1) {
                    lastIndex = j+1;
                    sumrobbedsince = 0;
                }   
                var lasttime = aData[lastIndex].time;  
                aData[j].lasttime = lasttime;                     
                var lastRob = aData[lastIndex].robbed;
                var lastCarryReturn = aData[lastIndex].carryReturn;
                
                if (robbed==0)
                    sumrobbedsince = 0;
                                
                aData[j].sumrobbedsince = sumrobbedsince;                 
                                                                                
                var deltaT = aReport[DEF_AREPORT_TIME] - lasttime;                                
                delta = round((robbed + sumrobbedsince)*3600/deltaT,0);                
                
                if (lastRob < lastCarryReturn) {
                    if (delta > deltamax) {
                        deltamax = delta;                                                             
                        deltamaxt = deltaT; // save time between attacks                    
                    }
                    
                    delta10.add(delta);
                    deltaAll.add(delta);
                }
                
                //deltastrper = round(deltastr/4,0);
                
                if (carryReturn == robbed)
                    delta += '+';                        
                if (lastRob == lastCarryReturn) {
                    delta +='-';
                    greyout = true;
                }
                var deltatitle = 'Last not full was ' + (lastIndex-j) + ' attacks/' + formatTimeSpan(deltaT) + ' ago, ' + sumrobbedsince + ' robbed since.';
            
                s+='<td title="' + deltatitle + '" class="' + (greyout?'c':'') + '">' + delta + '</td>';     
            } else
                s+='<td></td>';
                   
            s+='<td><a href="berichte.php?id='+aReport[DEF_AREPORT_ID]+'">-></a></td>';
            
            s += '</tr>';
        }
        
        s += '<tr><td colspan="12">&nbsp;</td></tr>';
        
        // sum        
        s += '<tr style="text-align:center;"><td style="text-align:left;" colspan="11">Sum</td><td/>';
        var nettototal = oNetto.sum;        
        s += '<td style="color:' + (nettototal>=0?'#00C000':'#C00000') + ';">' + nettototal + '</td></tr>';
        
        // average
        s += '<tr style="text-align:center;"><td style="text-align:left;" colspan="9">Average</td>';
        s += '<td>' + round(oAp.average(),0) + '</td>';
        s += '<td colspan="2"/><td>' + round(oNetto.average(),0) + '</td>';
        s += '<td>' + round(oEff.average()*100,0) + '%</td>';
        s += '<td>' + round(deltaAll.average(),0) + '</td></tr>';        
        
        // maximum
        s += '<tr style="text-align:center;"><td style="text-align:left;" colspan="9">Maximum</td>';
        s += '<td>' + oAp.maximum + '</td>';
        s += '<td colspan="2"/><td>' + oNetto.maximum + '</td><td/><td>' + deltaAll.maximum + '</td>';
        
        s += '</tbody></table><p><span class="c" style="font:9px;">-:<i> overestimate. denotes last attack did not get all ressources. This can yield higher estimates and is not included in maximum/average estimates.<br>+: underestimate. denotes that all carrying capacity was used (eff=100%) which means that delta is an underestimate.</i></span>';                
    } else {
        s += 'No reports for Village ' + did;            
    }     
    
    var div = document.createElement('div');
    div.innerHTML = s;
    div.id = 'infodiv';
    $('lmid2').parentNode.appendChild(div);
    
    if (i==-1 || aData.length < 2) {
        if (isa2b)        
            EventManager.Add($('sendLaterBtn'),'click',scheduleAttack,false);
        return;
    }   
    s = '<p><h3>Calulations</h3>';             
    s += 'Robbed on average in last ' + robbed10.count + ' attacks: <b>' + round(robbed10.average(),0) + '</b>.<br>';    
    s += 'Robbed on average in all ' + robbedAll.count + ' attacks: <b>' + round(robbedAll.average(),0) + '</b>.<p>';
    s += '<b>Hourly production between attacks (excluding overestimates)</b><br>';
    s += 'Average in last ' + delta10.count + ' attacks was <b>' + round(delta10.average(),0) + '</b>.<br>';  
    s += 'Average in all ' + deltaAll.count + ' attacks was <b>' + round(deltaAll.average(),0) + '</b>.<br>';  
    s += 'Maximum over last ' + delta10.count + ' attacks was <b>' + delta10.maximum +'</b>.<br>';  
    s += 'Maximum over all ' + deltaAll.count + 'attacks was <b>' + deltaAll.maximum +'</b> (' + formatTimeSpan(deltamaxt) + ' in between).<br>';  
     
    var lastIndex = -1; 
    if (isa2b || true) {
           
        sumrobbedsince = 0;    
        for (var k=0; k<aData.length;k++) {
            
            if (lastIndex == -1 && aData[k].carryReturn > 0 && aData[k].robbed < aData[k].carryReturn) 
                lastIndex = k;
                
            if (lastIndex == -1)             
                sumrobbedsince += aData[k].robbed;          
        }

        if (lastIndex > -1) {
            var lasttime = aData[lastIndex].time
            var deltatitle = 'Last not full was ' + (lastIndex-j) + ' attacks/' + formatTimeSpan(deltaT) + ' ago, ' + sumrobbedsince + ' robbed since.';
                            
            s += '<p><b>Ress estimations</b><br>';
            var ago = now-lasttime;            
            var agocolor = "black";
            if (ago > 24*3600)
                agocolor = "#c00000";
            s += 'The last attack returning not fully loaded was <span style="color:' + agocolor + '">' + formatTimeSpan(now-lasttime) + '</span> ago.<br>'
            s += 'Travel time is <span id="traveltimespan"><i>currently unknown</i> and not taken into account</span>.<p>'
            s += 'The estimated <i>average (last 10)</i> amount of ressis is <b><span id="estimateavg10"></span></b>.<br>';
            s += 'The estimated <i>average (all)</i> amount of ressis is <b><span id="estimateavg"></span></b>.<br>';
            s += 'The estimated <i>maximum (last 10)</i> amount of ressis is <b><span id="estimatemax10"></span></b>.<br>';
            s += 'The estimated <i>maximum (all)</i> amount of ressis is <b><span id="estimatemax"></span></b>.<br>';
            
            //if (firstrun) { // attack event listeners
            //var inputs = xpath("//input[@type='text']");
            //for (var i=0;i<inputs.snapshotLength;i++) {
                EventManager.Add(document,'keyup',function(e) {updateCalced(delta10,deltaAll,lasttime,sumrobbedsince);},false);
                EventManager.Add(document,'click',function(e) {updateCalced(delta10,deltaAll,lasttime,sumrobbedsince);},false);
            //}
        }                
    }
    
    
    //s += 'based on this, the estimated amount of ressis is <b>' + round(slidavg/slidingavgcount*(now-lasttime)/3600,0) + '</b><br>'; // this is wrong
    
    $('calcdiv').innerHTML = s;    
    
    if ((isa2b || true) && lastIndex >=0)
        updateCalced(delta10,deltaAll,lasttime,sumrobbedsince);
                           
    
    var width = $('lmid2').clientWidth;    
    
    var canvas = document.createElement('div');    
    canvas.id=('canvas1');
    var ueber = document.createElement('h3');
    ueber.textContent = 'Robbed';
    $('infodiv').parentNode.appendChild(ueber);
    $('infodiv').parentNode.appendChild(canvas);    
    
    var canvas = document.createElement('div');    
    canvas.id=('canvas2');
    var ueber = document.createElement('h3');
    ueber.textContent = 'Efficiency';
    $('infodiv').parentNode.appendChild(ueber);
    $('infodiv').parentNode.appendChild(canvas);        
    
    aEff.reverse();
    aTime.reverse();
    aRobbed.reverse();         
         
    plotData('canvas1',width,aRobbed,aTime);                    
    plotData('canvas2',width,aEff,aTime);
    
    $('infodiv').innerHTML += simple;
    
    if (isa2b)        
        EventManager.Add($('sendLaterBtn'),'click',scheduleAttack,false);
    
}
// NYI
function indexOfLastNonFullAttack(aData,startindex) {
    var res = new Object();
    var lastIndex = -1; // index of last attack that didnt get 100% back and wasnt no returned troops
    var sumrobbedsince =0;
    for (var i=0; i<aData.length;i++) {
        var aReport = string2AReport(aData[i]);
        
        if (lastIndex == -1 && aCarryReturn[i] > 0 && aRobbed[i] < aCarryReturn[i]) 
            lastIndex = i;
            
        if (lastIndex == -1)             
            sumrobbedsince += aRobbed[i];          
    }

    if (lastIndex > -1) {
        var lasttime = aData[lastIndex].split(',')[DEF_AREPORT_TIME];
    }        
}

function appendPopulationGraph(did,element) {  

    var canvas = document.createElement('div');    
    canvas.id=('popcanvas');
    canvas.setAttribute('style','margin-top:8px;');
    
    var ueber = document.createElement('h3');
    ueber.innerHTML = 'Population (<span id="popspan"></span>)';
    ueber.setAttribute('style','margin-top:20px;align:center');
    
    $(element).parentNode.appendChild(ueber);
    $(element).parentNode.appendChild(canvas);   
        
    var pop = getPopFromCache(did);
    if (!pop)            
        getServer(DEF_SERVER_BASE + '/Inactive/Activity/' + coordZToServer(did),handlePopulationRequest,[did]);
    else
        addPopPlot(pop,' [c]');
    
    
}

function addPopToCache(pop,did) {
    var key = DEF_PREFIX_REPORTS + '_' + did + '_' + DEF_PREFIX_REPORTS_POP;
    var now = new Date();
    now.setHours(8,0,0,0); // 8 o' clock updates
    writeData(key,now.getTime()/1000 + '|' + pop.join(','));
}

function getPopFromCache(did) {
    _log(2,'trying to get pop for ' + did + ' (' + getPlaceName(did) + ')');
    
    var key = DEF_PREFIX_REPORTS + '_' + did + '_' + DEF_PREFIX_REPORTS_POP;
    var pop = readData(key);
    
    if (pop == '') {
        _log(2,'no cached pop found.');
        return false;
    }
    //alert(pop);
    pop = pop.split('|');
    var now = new Date();        
    var then = new Date(pop[0]*1000);
    
    var diff = now.getTime() - then.getTime();
    
    if (diff < 24*60*60*1000) {        
        _log(2,'cached pop found (' + then.toLocaleString() + ').');
        pop = pop[1].split(',');
        //for (var i=0;i<pop.length;i++)
        //    pop[i] = parseInt(pop[i]);
        return pop;
    } else {
        _log(2,'cached pop found but too old (' + then.toLocaleString() + ').');   
        return false;        
    }
}

function handlePopulationRequest(responseText,options) {
    _log(3,responseText);
     
    var pop = responseText.split(':');
    pop.shift();    
    pop.reverse();
    
    addPopToCache(pop, options[0]);    
    addPopPlot(pop,' [s]');
}

function addPopPlot(pop, desc) {
    _log(2,'plotting pop: ' + pop);
    
    $('popspan').textContent = pop.length + ' days, from ' + pop[0] + ' to ' + pop[pop.length-1] + ' ' + desc;
    
    // spread over y    
    var min = arrayMin(pop);
    for (var i=0;i<pop.length;i++)
        pop[i]-=min;
        
    plotData('popcanvas',$('lmid2').clientWidth,pop);
}

function coordZToServer(z) {
    return coordZToX(z) + '.' + coordZToY(z);
}

function wantRaphael() {
    var did = false;
    if (/karte\.php/g.test(location.href))
        did = getParamFromUrl(location.href,'d');
        
    if (/a2b\.php/g.test(location.href))
        did = getParamFromUrl(location.href,'z');               

    return did && isInt(parseInt(did));
}

if (wantRaphael()) {
    // get raphael to work
    var script = document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src','https://labs.atlassian.com/source/browse/~raw,r=577/RPHL/trunk/raphael-uncompressed.js');
    var head = xpath('//head[1]');
    if (head.snapshotLength == 0)
        return;  
    var head = head.snapshotItem(0);
    head.appendChild(script);
}

function plotData(elem,width,ydata,xdata) {  

    var height = 110;
    
    Raphael = unsafeWindow.Raphael;
    var graph = Raphael(elem, width, 130);
    // container
    graph.rect(0, 0, width, height, 5).attr("fill", "#fff");

    // hlines
    for(var x = 10; x < height; x += 10) {
      var c = (x > 10) ? "#ccc" : "#f00";
      graph.path({stroke: c}).moveTo(0, x).lineTo(width,x);
    }
  
    // scale data    
    var maxy = arrayMax(ydata);  
    for (var i=0;i<ydata.length;i++)
        ydata[i]/=maxy;
        
    if (xdata) {
        var minx = arrayMin(xdata);
        var maxx = arrayMax(xdata);
        var xscale = width/(maxx-minx);        
    } else
        var step = width/(ydata.length-1);
    
    var path = graph.path({
        stroke: "#0c0",
        "stroke-width": 2, 
        "fill-opacity": 1
    }).moveTo(0, height-ydata[0]*100);
  
    var x;
    for (var i=1;i<ydata.length;i++) {  
         
        if (xscale)
            x = xscale * (xdata[i]-minx);
        else
            x = i*step;
        
        if (xdata)
            _log(3,xdata[i] + '->' + x);
            
        path.lineTo(x, height-ydata[i]*100);
    }    
    //path.andClose();
}

function arrayMax(a) {
    var m=-Infinity;
    for(var i =0;i<a.length;i++)
        m=Math.max(m,a[i]);        
    return m;
}

function arrayMin(a) {
    var m=Infinity;
    for(var i =0;i<a.length;i++)
        m=Math.min(m,a[i]);        
    return m;
}

function a2bGetTravelTime() {
    ats=[0,0,0,0,0,0,0,0];
	
	var list=xpath('//table[@class="p1"]/tbody/tr/td/table[@class="f10"]/tbody/tr/td/input');	
	if(list.snapshotLength==0){alert('Error:Find Table,a2b');return;}
			
	minspeed = 100; 
	var addStarForHero = '';
	for(var i=0;i<list.snapshotLength;i++){
		unit=parseInt(list.snapshotItem(i).getAttribute('name').match(/(\d+)/).pop())-1;
		val=parseInt(list.snapshotItem(i).value);
		if(isNaN(val))val=0;
		ats[0]=ats[0]+val*aTroopData[unit][0];	// attack
		ats[1]=ats[1]+val*aTroopData[unit][1];	// def1
		ats[2]=ats[2]+val*aTroopData[unit][2];	// def2
		ats[3]=ats[3]+val*aTroopData[unit][9];	// load
		ats[4]=ats[4]+val*aTroopData[unit][7];	// food
		
		if (val > 0 && unit < 10) // 10+ is hero
		   minspeed = Math.min(minspeed,aTroopData[unit][8]);
		   
        if (val > 0 && unit >= 10)
           addStarForHero = '* (hero)';
           
	}
	
    var cords = getCords();
    var x = cords.split(',')[0];
    var y = cords.split(',')[1];
    
    var z = getActiveVillageZ();    
    //var timeinfo = "         (" + x + "|" + y + ")";
    var dx = 1*x - coordZToX(z);
    var dy = 1*y - coordZToY(z); 
    var d = Math.sqrt(dx*dx + dy*dy);
    if (minspeed == 100)
        return -1;
    else
        return Math.round(d/minspeed*3600);
}

function updateCalced(delta10,deltaAll,lasttime,sumrobbedsince) {
    
    var now = new Date();
    now = now.getTime()/1000;
    
    // save to hidden ipnut, not needed anymore but left here
    if (/a2b.php/.test(location.href)) {
        var traveltime = a2bGetTravelTime();    
        $('traveltime').value = traveltime;
    } else traveltime = -1;
        
    var timetoarrival = (now-lasttime+(traveltime > -1?traveltime:0))/3600;
        
    $('estimatemax').wrappedJSObject.textContent = round(deltaAll.maximum*timetoarrival - sumrobbedsince,0) + (traveltime>-1?' (at arrival)':' (now)');
    $('estimateavg10').wrappedJSObject.textContent = round(delta10.average()*timetoarrival - sumrobbedsince,0) + (traveltime>-1?' (at arrival)':' (now)');
    $('estimateavg').wrappedJSObject.textContent = round(deltaAll.average()*timetoarrival - sumrobbedsince,0) + (traveltime>-1?' (at arrival)':' (now)');
    $('estimatemax10').wrappedJSObject.textContent = round(delta10.maximum*timetoarrival - sumrobbedsince,0) + (traveltime>-1?' (at arrival)':' (now)');
    
    
    if (traveltime>0) {
        $('traveltimespan').wrappedJSObject.innerHTML = '<b>' + formatTimeSpan(traveltime) + '</b>';
    } else 
        $('traveltimespan').wrappedJSObject.innerHTML = '<i>currently unknown (no troops are sent)</i>';
}

function getCarryReturn(aReport) {

    var troopsreturn = aReport[DEF_AREPORT_ATT_UNITS];            
    if (aReport[DEF_AREPORT_ATT_LOST])
        troopsreturn = arraySubtract(troopsreturn,aReport[DEF_AREPORT_ATT_LOST]);
    if (aReport[DEF_AREPORT_ATT_CAPTURED])
        troopsreturn = arraySubtract(troopsreturn,aReport[DEF_AREPORT_ATT_CAPTURED]);
    
    return getTroopsCarry(troopsreturn,1,-1);
}

function reportArraySort(a1,a2) {
    a1 = a1.split(',')[DEF_AREPORT_TIME];
    a2 = a2.split(',')[DEF_AREPORT_TIME];
    return a1-a2;
}

function getCords()
{
 var tempX = document.getElementsByName('x');
 var tempY = document.getElementsByName('y');
 if (tempX.length)
 {
    if (tempX[0].value.length && tempY[0].value.length)
    {
       return tempX[0].value + "," + tempY[0].value;
    } else {
       return '';
    }
 }
 return;
}

// ************************************************************************************************************
// *********  Message popup ***********************************************************************************
// ************************************************************************************************************

function printMsg(sMsg,bError) {

    if (!getOption(DEF_OPTION_SHOW_POPUP_ON_SUCCESS) && !bError)
        return;

    var oDate = new Date();
    var sWhen = oDate.toLocaleString() + "\n";

    // delete old message
    var oOldMessage = $("ttq_message");
    if(oOldMessage) {
        _log(3, "Removing the old message." +oOldMessage);
        oOldMessage.parentNode.removeChild(oOldMessage);
    }

    // here we generate a link which closes the message
    var sLinkClose = "<a href='#' onclick='document.getElementById(\"ttq_message\").parentNode.removeChild(document.getElementById(\"ttq_message\"));' class='ttq_close_btn'><img src='" +sCloseBtn+ "' alt='X' /></a>";

    var sBgColor = (bError) ? "#FFB89F" : "#90FF8F";
    var oMsgBox = document.createElement("div");
    //oMsgBox.innerHTML = sLinkClose + "<div id='ttq_draghandle_msg' class='handle ttq_draghandle' style='background-color:white; -moz-opacity:0.2; border:1px dashed white;' >&nbsp;</div>" + sMsg;
    oMsgBox.innerHTML = "<div id='ttq_draghandle_msg' class='handle'>" + sLinkClose + sMsg + "</div>";
    oMsgBox.style.backgroundColor = sBgColor;
    var msgCoords = getOption("MSG_POSITION", "215px_215px");
    msgCoords = msgCoords.split("_");
    oMsgBox.style.top = msgCoords[0];
    oMsgBox.style.left = msgCoords[1];
    oMsgBox.id = "ttq_message";
    document.body.appendChild(oMsgBox);
    makeDraggable($('ttq_draghandle_msg'));
    _log(3, "<- printMsg()");

    window.setTimeout(hideMsg,10000);
}

/** Experimental: Send messages in the game
 * TODO: The sC parameter needs to be loaded and saved once.
 */
function sendMsg(sTo, sSubject, sMsg, sC) {
    _log(3, "-> sendMsg()");
    if(sTo == '' || sMsg == '' || sC == '') {
        return false;
    }
    var sParams = 'c=' +sC+ '&an=' +sTo+ '&be=' +sSubject+ '&message=' +sMsg+ '&t=2&s1=';
    sParams = encodeURI(sParams);
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", 'nachrichten.php', true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.setRequestHeader("Content-length", sParams.length);
    httpRequest.setRequestHeader("Connection", "close");
    httpRequest.send(sParams);
    _log(3, "<- sendMsg()");
    return true;
}

function hideMsg() {
    _log(3, "-> hideMsg()");
    var oMsgBox = $("ttq_message");
    document.body.removeChild(oMsgBox);
    _log(3, "<- hideMsg()");
}

// ************************************************************************************************************
// *********  Code getting ************************************************************************************
// ************************************************************************************************************

function getCode(iSiteId, iNewdid) {
    _log(3, "-> getCode()");

    var sNewdid;
    if(iNewdid != 'null' && iNewdid != '') {
        sNewdid = "&newdid=" +iNewdid;
    } else {
        sNewdid = "";
    }

    get("build.php?id=" + iSiteId + sNewdid, handleRequestFindCode, iNewdid);
    _log(3, "<- getCode()");

    return true;
}

function handleRequestFindCode(httpRequest, sNewdid) {
    _log(3, "-> handleRequestFindCode()");
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { // ok
            var sResponse = httpRequest.responseText;
            _log(3, sResponse);
            if(!sResponse) {
                _log(2, "We didn't get any response. Impossible to determine the code.");
            } else
                return findCode(sResponse, sNewdid);
        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
    }
    _log(3, "<- handleRequestFindCode()");

    return false;
}

function findCode(sPage, iNewdid) {
    _log(3, "-> findCode()");
    var iMode = 0;  // mode is 0 for building new stuff, 1 for upgrading
    var sCode = '';
    if(!iNewdid) {
        iNewdid = 'null';
    }

    var re0 = /dorf2\.php\?a=[0-9]{1,2}&id=[0-9]{1,2}&c=(.{3})/i;  // new building
    var re1 = /dorf[1-2]\.php\?a=.*&c=(.{3})/i;  //upgrade
    var aMatch0 = sPage.match(re0);
    var aMatch1 = sPage.match(re1);
    if(aMatch0) {
        _log(3, "Code for building new stuff found.");
        sCode = aMatch0[1];
        iMode = 0;
    } else if(aMatch1) {
        _log(3, "Code for upgrading found.");
        sCode = aMatch1[1];
        iMode = 1;
    } else {
        _log(3, "Code not found");
        return false;
    }


    //save the found code in the proper cookie
    if(bLockedCode) {
        _log(3, "The TTQ_CODE_" + iMode + " cookie is locked. We were not able to write it.");
        return false;
    }
    if(sCode != '') {
        bLockedCode = true;  // TODO check if the cookie is locked. Lock it separately from tasks
        var sCookie = readData("TTQ_CODE_" +iMode);
        var aCookie = new Array();
        if(sCookie != '') {  //there is a cookie
            aCookie = sCookie.split(",");
            var iIndexOfVillageId = aCookie.indexOf(iNewdid);
            if(iIndexOfVillageId > -1) {  // existing old code - remove
                aCookie.splice(iIndexOfVillageId, 2);
            }
        }
        aCookie.push(iNewdid);
        aCookie.push(sCode);
        sCookie = aCookie.join(",");
        _log(3, "Writing data: " + sCookie);
        writeData('TTQ_CODE_'+iMode, sCookie);
        bLockedCode = false;
    } else {
        _log(2, "We didn't find any code. Either there is not enough resources for this task, or another building is being built/upgraded.");
        return false;
    }

    _log(3, "<- findCode()");
    return true;
}


// ************************************************************************************************************
// *********  Village name getting ****************************************************************************
// ************************************************************************************************************

/** @return coordZ if the name is not found in the cache. */
function getPlaceName(iPlaceId) {
    _log(3, "-> getPlaceName() for " + iPlaceId);

    if(!bDisplayVillageNames) {
        return iPlaceId;
    }
    
    if (!iPlaceId)
        return 'undefined iPlaceId!';
        
    //first try to load the name from the cache
    var sCookie = readData(DEF_TTQ_PLACE_NAMES);    // format: "123456,VillageName,233564,VillageName,"
    _log(3, "-> getPlaceName() cookie:" + sCookie);

    if(sCookie != '') {
        var aPlaces = sCookie.split(",");
        //alert(aPlaces);
        var iPlacesLength = aPlaces.length;
        if(iPlacesLength > 0) {
            for(var i = 0; i < iPlacesLength; i++) {
                if(aPlaces[i].indexOf(iPlaceId) > -1) {
                    _log(3, "-> getPlaceName() found in cache:" + aPlaces[i+1]);
                    return deleteUmlaute(aPlaces[i+1]);
                }
                i++;
            }
        }
    }

    _log(3, "-> getPlaceName() not found in cache.");
    //alert('getting' + iPlaceId);

    var httpRequest = new XMLHttpRequest();
    httpRequest.overrideMimeType("application/xml");
    httpRequest.onreadystatechange = function() {
        handleGetPlaceName(httpRequest, iPlaceId);
    };
    httpRequest.open("GET", "karte.php?z=" +iPlaceId, true);
    httpRequest.send(null);


    return iPlaceId;
    _log(3, "<- getPlaceName()");
}

function handleGetPlaceName(httpRequest, iPlaceId) {
    _log(2, "-> handleGetPlaceName()");
    if (httpRequest.readyState == 4) {
        if (httpRequest.status == 200) { // ok
            var sResponse = httpRequest.responseText;  // it would be much easier to find what we want in responseXML, but it doesn't work, since it is not well-formed

            _log(3, "HTTP response retrieved.");

            if(sResponse) {

                var iCoordX = coordZToX(iPlaceId);
                var iCoordY = coordZToY(iPlaceId);
                _log(2, "Coordinates for " +iPlaceId+ ": " +iCoordX+ "|" +iCoordY);
                //var re = new RegExp("onmouseover=\"map\\('([^']*)','([^']*)','[^']*','[^']*','" +iCoordX+ "','" +iCoordY+ "'\\)\"", "i");
                //var aMatch = sResponse.match(re);

                //find "x":"-81","y":"-103"
                // {"x":"-81","y":"-103","src":"\/img\/un\/m\/d04.gif","ew":"24","name":"Vercingetorix","dname":"Gergovia","ally":"","href":"karte.php?d=403223&c=5c"}
                var sC = '"x":"' + iCoordX + '","y":"' + iCoordY + '"';
                _log(2, sC);
                var name = null;

                var i = sResponse.indexOf(sC);                   // |"x":"-81","y":"-103"
                var j;
                var istart;
                var iend;

                try {
                    _log(2, "i="+i);
                    j = sResponse.indexOf('"dname"',i);          // |"dname":"Gergovia",
                    _log(2, "j="+j);
                    istart = sResponse.indexOf(':"',j) + 2;      // "dname":"|Gergovia",
                    _log(2, "istart="+istart);
                    iend = sResponse.indexOf('",',istart);       // "dname":"Gergovia|",
                    _log(2, "iend="+iend);
                    name = sResponse.substring(istart,iend);
                    _log(2, "name="+name);
                } catch (e) {
                }
                    
                name = deleteUmlaute(name);                

                var oasis = "Besetztes Tal";

                if( name == '<span class=\\"t\\"><i>' + oasis + '<\\/i><\\/span>') {
                    name = 'Oasis ' + iCoordX + '|' + iCoordY;
                }
                if(name && name.substring(0,9) != 'karte.php') {
                    _log(2, "The village name found:"+name);
                    cachePlaceName(iPlaceId, name);
                    injectPlaceName(name, iPlaceId);
                } else {
                    _log(2, "The village name not found.");
                    cachePlaceName(iPlaceId, iCoordX + "|" + iCoordY);
                    injectPlaceName(iCoordX + "|" + iCoordY, iPlaceId);
                }
            }

        } else { // failed
            _log(2, "HTTP request status: " + httpRequest.status);
        }
        httpRequest.onreadystatechange = null;
    }

    _log(2, "<- handleGetPlaceName()");
}

/** Store found names in a cookie. */
function cachePlaceName(iPlaceId, sPlaceName) {
    _log(3, "-> cachePlaceId()");

    var aPlaces = new Array();
    var sCookie = readData(DEF_TTQ_PLACE_NAMES);
    if(sCookie) {
        aPlaces = sCookie.split(",");
    }

    if(aPlaces.length > (2 * iMaxPlaceNamesCookieLength) ) {
        aPlaces.shift(); // remove the first
        aPlaces.shift();
    }

    if(aPlaces.length > 1) {
        var iIndexId = aPlaces.indexOf(iPlaceId);
        if(iIndexId > -1) {  //this place is stored - remove
            aPlaces.splice(iIndexId, 2);
        }
    }

    aPlaces.push(iPlaceId);
    aPlaces.push(sPlaceName);

    var sNewCookie = aPlaces.join(",");
    writeData(DEF_TTQ_PLACE_NAMES, sNewCookie);

    _log(3, "<- cachePlaceId()");
}

function injectPlaceName(sPlaceName, iPlaceId) {
    var q = xpath("//span[contains(@id,'ttq_placename_" + iPlaceId + "')]");

    for (var i = 0; i<q.snapshotLength; i++)
        q.snapshotItem(i).innerHTML = sPlaceName;

    return;
}

// ************************************************************************************************************
// *********  Drag & Drop *************************************************************************************
// ************************************************************************************************************

var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev){
    return {
        x:ev.pageX,
        y:ev.pageY
    };
}

function makeClickable(object){
    object.onmousedown = function(){
        dragObject = this;
    }
}

function getMouseOffset(target, ev){
    var docPos    = getPosition(target);
    var mousePos  = mouseCoords(ev);
    return {
        x:mousePos.x - docPos.x,
        y:mousePos.y - docPos.y
    };
}

function getPosition(e){
    var left = 0;
    var top  = 0;
    while (e.offsetParent){
        left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
        top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
        e     = e.offsetParent;
    }
    left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
    top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
    return {
        x:left,
        y:top
    };
}

function mouseMove(ev){
    var target   = ev.target;
    var mousePos = mouseCoords(ev);

    if(dragObject){
        dragObject.style.position = 'absolute';
        dragObject.style.top      = (mousePos.y - mouseOffset.y) +"px";
        dragObject.style.left     = (mousePos.x - mouseOffset.x) +"px";
    }
    lMouseState = iMouseDown;
    return false;
}

function mouseUp(ev){
    if(dragObject) {
        var key;
        switch(dragObject.id) {
            case "ttq_message":
                key = "MSG_POSITION";
                break;
            case "timerform_wrapper":
                key = "FORM_POSITION";
                break;
            case "ttq_history":
                key = "HISTORY_POSITION";
                break;
            case DEF_STATS_DIV:
                key = DEF_OPTION_KEY_STATS_POSITION;
                break;                            
            case DEF_MONITOR_DIV:
                key = DEF_OPTION_KEY_MONITOR_POSITION;
                break;           
            case "ttq_tasklist": 
            default:
                key = "LIST_POSITION";
                break;
        }
        setOption(key, dragObject.style.top +"_"+ dragObject.style.left);
    }
    dragObject = null;
    iMouseDown = false;
}

function mouseDown(ev){
    //var mousePos = mouseCoords(ev);
    var target = ev.target;
    iMouseDown = true;
    if(target.getAttribute('DragObj')){
        return false;
    }
}

function makeDraggable(item){
    if(!item) return;
    EventManager.Add(item,"mousedown",function(ev){
        dragObject  = this.parentNode;
        mouseOffset = getMouseOffset(this.parentNode, ev);
        return false;
    }, false);
}

EventManager.Add(document,"mousemove", mouseMove, false);
EventManager.Add(document,"mousedown", mouseDown, false);
EventManager.Add(document,"mouseup", mouseUp, false);


// ************************************************************************************************************
// ********* server time  *************************************************************************************
// ************************************************************************************************************

/**
* @return The server timezone offset from GMT or false if it is not available.
*/
function getServerTimeOffset() {
    _log(3, "-> getServerTimeOffset()");
    var iServerTimeOffset = getOption("SERVER_TIME_OFFSET", false);
    if(iServerTimeOffset != false) {  //no automatic detection
        _log(3, "Returning the predefined iServerTimeZoneOffset.");
        return parseInt(iServerTimeOffset);
    } else {  //automatic detection
        var iOffset = xpath("id('ltime')/span[2]");
        if(iOffset.snapshotLength < 1) {  //not found. Unknown offset.
            return false;
        } else {
            iOffset = iOffset.snapshotItem(0).innerHTML;
            var aMatch = iOffset.match( /([A-Z]{3})([-+]{1}[0-9]{1,2})/i );
            if(!aMatch) {
                _log(3, "No server time zone recognized, although it seems to be displayed.");
                return false;
            }

            iOffset = parseInt(aMatch[2]);
            switch(aMatch[1]) {
                case "AST":
                    return (iOffset - 4);
                    break;
                case "EST":
                    return (iOffset - 5);
                    break;
                case "CST":
                    return (iOffset - 6);
                    break;
                case "MEZ":
                    return (iOffset + 1);
                    break;
                case "UTC":
                case "GMT":
                default:
                    return iOffset;
                    break;
            }

        }
    }

    return false;
    _log(3, "<- getServerTimeOffset()");
}

/**
* @return Current server time as formatted string or timestamp or false if the server time cannot be determined.
*/
function getServerTime(bReturnTimestamp) {
    _log(3, "-> getServerTime()");

    // get server time zone offset
    var iTimeOffset = getServerTimeOffset();

    var sTime = xpath("id('tp1')");
    if(sTime.snapshotLength < 1) {
        _log(3, "No server time found.");
        return false;
    }
    sTime = sTime.snapshotItem(0).innerHTML;

    // now we need to determine server date - tricky.
    var aMatch = sTime.match( /^([0-9]{1,2}):([0-9]{2}):([0-9]{2})$/i );
    if(!aMatch) {
        _log(3, "No server time found. Server date could not be determined.");
        return false;
    }

    // get UTC time of the server
    var UTCHoursServer =  parseInt(aMatch[1]) - iTimeOffset;
    if(UTCHoursServer > 23) {
        UTCHoursServer = UTCHoursServer - 24;
    }
    if(UTCHoursServer < 0) {
        UTCHoursServer = UTCHoursServer + 24;
    }

    // for now, we assume that the local UTC time = server UTC time.
    //TODO: solve the situation when it's not
    var oLocalTime = new Date();
    var yy = oLocalTime.getUTCFullYear();
    var mm = oLocalTime.getUTCMonth();
    var dd = oLocalTime.getUTCDate();
    var hh = oLocalTime.getUTCHours();

    //Now the logic:
    if(hh == UTCHoursServer) {  //the local UTC time is similar to server's UTC time. Good!
    // we can therefore use local date as server's date
    } else if(hh == 23 && UTCHoursServer == 0) {  //the server is ahead of us
        dd = dd + 1;
    } else if(hh == 0 && UTCHoursServer == 23) {  //the server is falling behind
        dd = dd - 1;
    } else {  //we do not tolerate bigger differences!
        _log(2, "Warning! The local time (as UTC) differs from the server time (as UTC) by more than 1 hour. Your local time is incorrect or you specified wrong timezone for your server. We can't calculate server's date.");
        return false;
    }

    //now we can construct the Date object for the server time and return formatted string
    //var sTime = yy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
    var oServerDate = new Date(yy, mm, dd, UTCHoursServer, aMatch[2], aMatch[3]);
    //the created object has wrong timestamp - it was offset by local timezone offset. Bring it back
    var newtimestamp = oServerDate.getTime() - (oLocalTime.getTimezoneOffset() * 60000);  //this is server time as UTC

    if(bReturnTimestamp) {  //we don't need formatted string
        return newtimestamp;
    }

    newtimestamp = newtimestamp + (iTimeOffset * 3600000);  //server time in the server's timezone
    oServerDate = new Date(newtimestamp);  //this is the server's time (not UTC!)

    sTime = formatDate(oServerDate.getUTCFullYear(), (oServerDate.getUTCMonth() + 1), oServerDate.getUTCDate(), oServerDate.getUTCHours(), oServerDate.getUTCMinutes(), oServerDate.getUTCSeconds());
    return sTime;



    _log(3, "<- getServerTime()");
}


// ************************************************************************************************************
// ********* time formatting/conversion  **********************************************************************
// ************************************************************************************************************

// convert formatted date as in yyyy/mm/dd hh:mm:ss to milliseconds
function getDateFromString(s) {
    
    var re = new RegExp("^(2[0-9]{3})/([0-9]{1,2})/([0-9]{1,2}) ([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})$", "i");
    var aMatch = s.match(re);
    if(!aMatch) {
        alert('Illegal date format: "'+s + '"');
        _log(1, "You entered invalid format of date!");
        return null;
    }
    for(var i = 2; i < aMatch.length; i++) {
        // convert strings to integers
        if(aMatch[i].match(/0[0-9]{1}/i)) {
            aMatch[i] = aMatch[i].substring(1);
        }
        aMatch[i] = parseInt(aMatch[i]);
    }
    return new Date(aMatch[1],aMatch[2]-1,aMatch[3],aMatch[4],aMatch[5],aMatch[6]);
}

// inverse of getDateFromString();
function formatDate(yyyy, mm, dd, hh, min, sec) {
    if(dd < 10) {
        dd = "0" + dd;
    }
    if(mm < 10) {
        mm = "0" + mm;
    }
    if(min < 10) {
        min = "0" + min;
    }
    if(sec < 10) {
        sec = "0" + sec;
    }
    return yyyy+"/"+mm+"/"+dd+" "+hh+":"+min+":"+sec;
}

/*function formatTimeSpan(secs, travianCompatible) {
    var oDate = new Date(secs*1000);
    var s = padInt(oDate.getMinutes()) + ":" + padInt(oDate.getSeconds());

    var hours = oDate.getHours() - 1; // wegen utc
    var days = oDate.getDate() - 1;

    if (hours > 0 || days > 0) {
        if (days>0) // fixes an error
            hours++;
        s = padInt(hours) + ":" + s;
    } else if (travianCompatible)
        s = padInt(hours) + ":" + s;
    

    if (days>0){
        s = days + " d, " + s;
    }

    return s;
}*/

function formatTimeSpan(s, travianCompatible) {
    var sb, tb, ub;
    s = Math.floor(s);
    if (s > -2) {
        sb = Math.floor(s / 3600);
        tb = Math.floor(s / 60) % 60;
        ub = s % 60;
        t = sb + ":";
        if (tb < 10) {
            t += "0";
        }
        t += tb + ":";
        if (ub < 10) {
            t += "0";
        }
        t += ub;
    } else {
        t = "<a href=\"#\" onClick=\"return Popup(2,5);\"><span class=\"c0 t\">0:00:0</span>?</a>";
    }
    return t;
}

function formatDateTimeRelative(dateSecs) {

    var oDate = new Date( dateSecs * 1000 );
    var oNow = new Date();

    var s = padInt(oDate.getHours()) + ":" + padInt(oDate.getMinutes()) + ":" + padInt(oDate.getSeconds());

    if (oDate.getDate() != oNow.getDate()) {
        if (oDate.getDate() - 1 == oNow.getDate()) // TODO: doesnt work on month changes
            s = translate("Tomorrow")+ ", " + s;
        else if (oDate.getDate() + 1 == oNow.getDate())
            s = 'Yesterday, ' + s;
        else s = oDate.getDate() + '.' + (oDate.getMonth()+1) + '.' + ', ' + padInt(oDate.getHours()) + ':' + padInt(oDate.getMinutes());
    }

    return s;
}
// ************************************************************************************************************
// ********* aTroops functions  *******************************************************************************
// ************************************************************************************************************

function getTroopsInfo(aTroops, factor, shift, itribe) {
    var sTroopsInfo = "";

    if (!aTroops)
        return "undefined troops";

    if (shift)
        shift = -1;
    else
        shift = 0;

    if (!factor)
        factor = 1;

    if (!itribe) {
        itribe = iMyRace;
    }

    for(var i = 1; i < 12; i++) {
        if(aTroops[i + shift] > 0) {
            sTroopsInfo += aLangTroops[itribe][i-1] + ": " + (Math.round(factor*aTroops[i + shift]*100)/100) + ", ";
        }
    }
    //trim last two characters
    sTroopsInfo = sTroopsInfo.substring(0, sTroopsInfo.length - 2);

    if (sTroopsInfo == '')
        sTroopsInfo = 'no troops.';

    return sTroopsInfo;
}

function getResInfo(aTroops) {
    var sTroopsInfo = "";

    if (!aTroops)
        return "undefined resses.";
    else
        return aTroops.join('|');
}

function getTroopsInfoImg(aTroops, factor, shift) {
    var sTroopsInfo = "";
    var baseIm = "img/un/u/" + (iMyRace == 0?'':iMyRace);
    var im = "";
    
    if (shift)
        shift = -1;
    else
        shift = 0;
    
    if (!factor)
        factor = 1;

    for(var i = 1; i < 11; i++) {
        if(aTroops[i + shift] > 0) {
            im = baseIm + (i%10) + ".gif";     // settler is x0.gif
            sTroopsInfo += '<img border="0" src="' + im + '" class="unit"/>' + (Math.round(factor*aTroops[i+ shift]*10)/10) + "&nbsp;&nbsp;&nbsp;";            
        }
    }
    if (aTroops.length >= 11 && aTroops[11 + shift] > 0) {
        sTroopsInfo += '<img border="0" src="img/un/u/hero.gif" class="unit"/>' + (Math.round(factor*aTroops[11 + shift]*10)/10);
    }
    return sTroopsInfo;
}

function getTroopsCarry(aTroops, factor, shift) {
    var sTroopsInfo = 0;

    if (!factor)
        factor = 1;

    if (!shift)
        shift = 0;

    for(var i = 1; i <= 6; i++) {
        if(aTroops[i + shift] > 0) {
            sTroopsInfo += (Math.round(aTroopData[i-1][9]*factor*aTroops[i + shift]*100)/100);
        }
    }
    return sTroopsInfo;
}

function getTribeData(tribe) {
    switch (parseInt(tribe)) {
        case 0: return romans;
        case 1: return teutons;
        case 2: return gauls;
    } 
}

function getTroopsSumByIndex(aTroops, index, factor, shift, tribe) {
    var sTroopsInfo = 0;

    if (isInt(parseInt(tribe))) {        
        var troopdata = getTribeData(tribe);    
    } else 
        var troopdata = aTroopData;
        
    if (!factor)
        factor = 1;

    if (!shift)
        shift = 0;

    for(var i = 1; i <= 6; i++) {
        if(aTroops[i + shift] > 0) {
            sTroopsInfo += (Math.round(troopdata[i-1][index]*factor*aTroops[i + shift]*100)/100);
        }
    }
    return sTroopsInfo;
}

function getTroopsFactoredCount(aTroops, factor) {

    if (!factor)
        factor = 1;

    for(var i = 1; i < 12; i++) {
        if(aTroops[i] > 0) {
            aTroops[i] = (Math.round(factor*aTroops[i]*100)/100);
        }
    }
    return aTroops;
}

function getTroopsCost(aTroops) {
    var losttot = 0;
    //3-lumber 4-clay 5-iron 6-grain
    for(var i=0; i<aTroops.length;i++)
        losttot += parseInt(aTroops[i])*(aTroopData[i][3] + aTroopData[i][4] + aTroopData[i][5] +aTroopData[i][6]);
        
    return losttot;
}

/** @return true if there are only spies, false if there is anything else or no spies. */
function onlySpies(aTroops,shift) {
    _log(3, "-> onlySpies(): " + aTroops);

    if (!shift)
        shift = 0;

    if(aTroops[iScoutUnit + shift] < 1) { //no spies
        _log(3, "No spies.");
        return false;
    }
    for(var i=1; i <= 11; i++) {
        if(i != iScoutUnit && parseInt(aTroops[i + shift]) > 0) { //at least one other troop
            _log(3, "Troops other than spies are present.");
            return false;
        }
    }
    _log(3, "This is a spying mission.");
    return true;
}

// ************************************************************************************************************
// ********* Travian utility functions  ****************************************************************************
// ************************************************************************************************************
function getFullServerName() {
    return location.href.match(/([\w]+:\/\/[\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}


// Gets the current player
function getUserId() {
    var userID = xpath('//a[contains(@href, "spieler.php?uid=")]');
    if (userID && userID.snapshotLength > 0) {
        return getParamFromUrl(userID.snapshotItem(0).href, "uid");
    } else {
        return '';
    }
}

// Gets current server
function getServerName() {
    return location.href.match(/([\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}

function detectLanguage() {
    if(sLang != "") {
        return;
    }
    var re = null; re = new RegExp("^http://[^/]*\.([a-zA-Z]{2,3})\/.*$", "i");
    var lang = window.location.href.match(re);
    if(!lang) {
        return;
    } else {
        sLang = lang.pop();
    }
}

function tryGetRaceFromPage() {
    _log(3, "-> tryGetRaceFromPage()");

    var xpathResult = xpath("//img[@class='unit']");
    if (xpathResult.snapshotLength > 0) {
        var src = xpathResult.snapshotItem(0).src;
        var iTroopType = src.match(/([0-9]{1,2})\.gif/i);
        if(!iTroopType || !iTroopType[1]) {
            _log(2, "Image not found. Could not determine the race.");
            return false;
        }
        iTroopType = parseInt(iTroopType[1]);
        if(iTroopType > 20) {
            return 2; //gaul
        } else if(iTroopType > 10) {
            return 1; //teutons
        } else {
            return 0; //Romans
        }
    } else {
        _log(2, "Image not found. Could not determine the race.");
        return false;
    }
    _log(3, "<- tryGetRaceFromPage()");
}

function getBuildingId() {
    var re = /.*build\.php\?([a-z=0-9&]*&)?id=([0-9]{1,2})/i;
    var iSiteId = window.location.href.match(re);
    if(iSiteId != null) {
        return parseInt(iSiteId[2]);
    } else {
        _log(2, "Building site ID not found");
        return false;
    }
}

/** @return newdid of the currently selected village */
function getActiveVillageId() {
    _log(3, "-> getActiveVillageId()");
    var oActiveLink = xpath("//a[@class='active_vl']");
    if(oActiveLink.snapshotLength > 0) {
        _log(3, "Active village link found.");
        var sHref = oActiveLink.snapshotItem(0).href;
        var aMatch = sHref.match(/newdid=([0-9]*)/i);
        if(!aMatch) {
            _log(2, "Active village id could not be found.");
            return false;
        } else {
            _log(3, "Active village id was found: " +aMatch[1]);
            return aMatch[1];
        }
    } else {
        // Try another way to get the active village
        var buildLink = xpath("/html/body/div[@id='lmidall']/div[@id='lmidlc']/div[@id='lmid1']/div[@id='lmid2']/div/a");
        if(buildLink.snapshotLength>0){
            var sUrl = buildLink.snapshotItem(0).href;
            var aMatch2 = sUrl.match(/&a=([0-9]*)/i);
            if(!aMatch) {
                _log(2, "Active village id could not be found.");
                return false;
            } else {
                _log(3, "Active village id was found: " +aMatch[1]);
                return aMatch[0];
            }
        }else{
            _log(2, "Active village could not be found.");
            return false;
        }
    }
    _log(3, "<- getActiveVillageId()");
}

function getActiveVillageZ()
{

    var ex = "//a[contains(@class,'active_vl')]/../../td[2]";
	tag = document.evaluate(ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (tag.snapshotLength)
    {    
       temp = tag.snapshotItem(0).textContent;             
       var x = temp.match(/\((-)?\d+/);
       var y = temp.match(/(-)?\d+\)/);
       
       x = x[0].replace('(','');
       y = y[0].replace(')','');
       return coordsXYToZ(x,y);
    }else{   
       return 'unknown didx';
    }
}

function getOwnVillageDidForZ(z,villagesz,villagesd) {
    return villagesd[villagesz.indexOf(parseInt(z))];
}

function getAllOwnVillageZ()
{

    var ex = "//div[@id='lright1']//table[@class='dtbl']";
	tag = document.evaluate(ex, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    var coords = new Array();
    
    for (var i=0;i<tag.snapshotLength;i++)
    {    
       temp = tag.snapshotItem(i).textContent;             
       var x = temp.match(/\((-)?\d+/);
       var y = temp.match(/(-)?\d+\)/);
       
       x = x[0].replace('(','');
       y = y[0].replace(')','');
       coords.push(coordsXYToZ(x,y));
    }
    
    return coords;
}

function getAllOwnVillageDid()
{

    var ex = "//div[@id='lright1']/table/tbody/tr/td/a";
	tag = document.evaluate(ex, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    var dids = new Array();
    
    for (var i=0;i<tag.snapshotLength;i++)
    {           
       dids.push(getParamFromUrl(tag.snapshotItem(i).href,'newdid'));
    }    
    return dids;
}

/** @return name of one of your one villages. */
function getVillageName(iVillageDid) {
    _log(3, "-> getVillageName()");
    if(iVillageDid == '' || iVillageDid == 'null') {  //no village id
        return '';
    }
    //var sVillageName = '';
    //var xp = "id('lright1')/table/tbody/tr/td/a[contains(@href, '" +iVillageDid+ "')]";
    var xp = "//div[contains(@id,'lright1')]/table/tbody/tr/td/a[contains(@href, '" +iVillageDid+ "')]";
    var xpathResult = xpath(xp);
    if(xpathResult.snapshotLength > 0) {
        return xpathResult.snapshotItem(0).innerHTML;
    } else {
        return 'unknown';
    }
    _log(3, "<- getVillageName()");
}

function switchActiveVillage(did) {
    _log(3, "Switching your village to " + getVillageName(did));

    if(!isInt(did))
        return;

    get("dorf1.php?newdid="+did, null, null);

    return;
}

/** Kudos to QP for writing this function. */
function coordsXYToZ(x, y) {
    x = parseInt(x);
    y = parseInt(y);
    var coordZ = (x + 401) + ((400 - y) * 801);
    return coordZ;
}

/** Kudos to QP for writing this function. */
function coordZToX(z) {
    z = parseInt(z);
    var x = ((z - 1) % 801) - 400;
    return x;
}

/** Kudos to QP for writing this function. */
function coordZToY(z) {
    z = parseInt(z);
    var y = 400 - (parseInt(((z - 1) / 801)));
    return y;
}

function coordZtoZDistance(z1,z2) {
    return Math.sqrt(Math.pow(coordZToX(z1)-coordZToX(z2),2) + Math.pow(coordZToY(z1)-coordZToY(z2),2));
}


// ****************************************************************************************************************************
// *********  DOM related helpers *********************************************************************************************
// ****************************************************************************************************************************

function getValueOfInput(name){
    var object =document.getElementsByName(name)[0];
    if(object!=undefined){
        var result = object.value;
        return result;
    }else{
        object = document.getElementsById(name)[0];
        if (object!=undefined){
            var result = object.value;
            return result;
        }
    }
    return object;
}

function getValueOfInputFromAttribute(attributeName,attributeValue){
    var result ='undefined';
    var object = getElementsByAttribute(document, "input", attributeName, attributeValue);
    if (object!='undefined' && object.length>0){
        // On rÃƒÆ’Ã‚Â©cupÃƒÆ’Ã‚Â¨re uniquement un objet, si plusieurs tant pis
        result = object[0].value;
    }
    _log(3,result);
    return result;
}

function getElementsByAttribute(oElm, strTagName, strAttributeName, strAttributeValue){
    var arrElements = (strTagName == "*" && document.all)? document.all : oElm.getElementsByTagName(strTagName);
    var arrReturnElements = new Array();
    var oAttributeValue = (typeof strAttributeValue != "undefined")? new RegExp("(^|\\s)" + strAttributeValue + "(\\s|$)") : null;
    var oCurrent;
    var oAttribute;
    for(var i=0; i<arrElements.length; i++){
        oCurrent = arrElements[i];
        oAttribute = oCurrent.getAttribute(strAttributeName);
        if(typeof oAttribute == "string" && oAttribute.length > 0){
            if(typeof strAttributeValue == "undefined" || (oAttributeValue && oAttributeValue.test(oAttribute))){
                arrReturnElements.push(oCurrent);
            }
        }
    }
    return arrReturnElements;
}

function makeDummyDiv(src) {
    if ($('dummydiv') != null)
        document.body.removeChild($('dummydiv'));

    dummyDiv = document.createElement('iframe');
    dummyDiv.id = 'dummydiv';
    dummyDiv.innerHTML = src;
    
    dummyDiv.setAttribute('style',"visibility:hidden;");
    document.body.insertBefore(dummyDiv, document.body.firstChild);
    
    return dummyDiv;
}


function $(id) {
    return document.getElementById(id);
}

function xpath(query, object, xtype) {
    if(!object)
        object = document;
    if (!xtype)
        xtype = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

    return document.evaluate(query, object, null, xtype, null);
}

// ************************************************************************************************************
// *********  Misc utility function ****************************************************************************
// ************************************************************************************************************

function _log(level, msg) {
    if (level <= LOG_LEVEL)
        GM_log(msg);
}

function wait(c,f){
   if (c()) f()
   else window.setTimeout(function (){wait(c,f)},300,false);
 }


function isInt(x) {
    var y = parseInt(x);
    if (isNaN(y)) {
        return false;
    }
    return x==y && x.toString()==y.toString();
}

function trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g,"");
}

function ltrim(stringToTrim) {

    return stringToTrim.replace(/^\s+/,"");
}

function rtrim(stringToTrim) {
    return stringToTrim.replace(/\s+$/,"");
}

function padInt(i) {
    if (i<10)
        return "0" + i;
    else
        return "" + i;
}


/**
* arrayToXML
* @param {Array of primitive types} arr
*/
function arrayToXML(arr) {
	var res = "<array>";
	if (arr) {
		for(var i=0; i<arr.length; i++) {
			res += "<arrayNode>" + arr[i] + "</arrayNode>";
		}
	}
	res += "</array>";

	return res;
}

/**
* xmlToArray - converts the XML string to an array of values
* @param {xml string} xmlString A string of XML nodes with a depth of 2 (1 container + 1 repeatable list of nodes)
*								like this: <globalContainer><node></node>...<node></node></globalContainer>
*/
function xmlToArray(xmlString) {

	if (xmlString) {
		if (window.ActiveXObject) { // code for IE

			var doc = new ActiveXObject("Microsoft.XMLDOM");
			doc.async = "false";
			doc.loadXML(xmlString);

		} else { // code for Mozilla, Firefox, Opera, etc.

			var parser = new DOMParser();
			var doc = parser.parseFromString(xmlString,"text/xml");
		}
		var x = doc.documentElement;

		var res = new Array();
		for(var i=0; i<x.childNodes.length; i++) {
			if (x.childNodes[i].childNodes.length == 0) {
				res.push("");
			} else {
				for(var j=0; j<x.childNodes[i].childNodes.length; j++) {
//					debug(DBG_LOWEST, "[xmlToArray] i["+i+"] j["+j+"] " + x.childNodes[i].childNodes[j].nodeValue);
					res.push(x.childNodes[i].childNodes[j].nodeValue);
				}
			}
		}
		return res;
	} else {
		return null;
	}
}


/**
* stringEndsWith - true if the other string is the final part of the original string (or if both don't exist)
*/
function stringEndsWith(original, other) {
	if (!original && ! other) { // none exists = true
		return true;
	}

	if (original && other) { // both exist check...
		var pos = original.indexOf(other);
		if ((pos + other.length) == original.length) { // pos of other string + it's size == original's string = true
			return true;
		} else { // "other" may or may not exist in "original", but not at the end
			return false;
		}
	} else { // only one exists = false
		return false;
	}
}
/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
		 	res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}

// *****************************************************************
// Asynchronous GET
// @param options: [aTask, iCurrentActiveVillage] (optional)  OR sNewdid in case of finding the code for construction.
// *****************************************************************
function get(url, callback, options) {
    _log(3,"get: " + url);

    var httpRequest = new XMLHttpRequest();
    if(callback) {
        httpRequest.onreadystatechange = function() {
            callback(httpRequest, options);
            if (httpRequest.readyState == 4) {
                httpRequest.onreadystatechange = null;
            }
        };
    }
    httpRequest.open("GET", url, true);
    httpRequest.send(null);
}

function getServer(url, cb, options) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText, options); }
  });
}


//*****************************************************************
// Asynchronous POST
// *****************************************************************
function post(url, data, callback, options) {
    _log(3,"post: " + url + " with data:" + data);
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        callback(httpRequest, options);
        if (httpRequest.readyState == 4) {
            httpRequest.onreadystatechange = null;
        }
    };
    data = encodeURI(data);
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    httpRequest.setRequestHeader("Content-length", data.length);
    httpRequest.setRequestHeader("Connection", "close");
    //httpRequest.overrideMimeType('text/html');
    httpRequest.overrideMimeType("application/xhtml+xml");
    httpRequest.send(data);
}

// ************************************************************************************************************
// *********  Internationalization ****************************************************************************
// ************************************************************************************************************
function translate(str) {
    var index = aLangStringsMaster.indexOf(str);
    var sTranslatedStr =  aLangStrings[index];
    if(sTranslatedStr) {
        return sTranslatedStr;
    } else {
        _log(3,'=> '+index+']' + str);
        return str;
    }
}

function deleteUmlaute(curText) {
    if (!curText) return "";
    var result = curText;
    //TODO: richtige zeichen einsetzen, überall
    result=result.replace(/\\u00fc/g, "ü");//ue
    result=result.replace(/\\u00f6/g, "ö");//oe
    result=result.replace(/\\u00e4/g, "ä");//ae
    result=result.replace(/\\u00dc/g, "u00dc");
    result=result.replace(/\\u00d6/g, "u00d6");
    result=result.replace(/\\u00c4/g, "u00c4");
    result=result.replace(/\\u00df/g, "ß");//ss
    return result;
}

// ************************************************************************************************************
// *********  Persistance          ****************************************************************************
// ************************************************************************************************************
var DEF_PARTKEY_PREFIX = getServerName() + '_' + getUserId() + '_';
var options_prefix = DEF_PARTKEY_PREFIX + 'OPTION_';
var data_prefix = DEF_PARTKEY_PREFIX + 'DATA_';

function readDataGeneric(prefix,name,defaultval) {
    _log(3, "-> readDataGeneric(): " + name);

    /*
    var val = GM_getValue("missingProperty");
    var msg = "val: " + val + "\n"
     + "typeof(val): " + typeof(val) + "\n"
     + "val==undefined: " + (val==undefined) + "\n"
     + "val===undefined: " + (val===undefined) + "\n"
     + "val==null: " + (val==null) + "\n"
     + "val===null: " + (val===null) + "\n";
     alert(msg)
     */
    if (defaultval == undefined)
        var s = GM_getValue(prefix + name);
    else
        var s = GM_getValue(prefix + name, defaultval);

    if (s==undefined) {
        _log(2,"Tried to read undefined data, returning \'\': " + prefix + "/" + name)
        writeDataGeneric(prefix,name,'');
        s = '';
    }

    _log(3, "<- readDataGeneric()");

    return s;
}

function readData(name) {
    return readDataGeneric(data_prefix,name);
}

function getOption(key, defaultValue, type) {
    return readDataGeneric(options_prefix,key, defaultValue);
}

function writeDataGeneric(prefix, name, value) {
    _log(3, "-> writeDataGeneric(): " + name);

    try {
        GM_setValue(prefix + name,value);
        s = GM_getValue(prefix + name);

        if (s==value)
            _log(3,'written data OK ' + name + "=" + value);
        else {
            _log(2,'written data NOT OK ' + name + "=" + value);
            alert('written data NOT OK ' + name + "!=" + value);
            return false;
        }

    } catch (e) {
        alert('writing data problem: ' + name + '=' + value);
        _log(2,'writing data problem: ' + name + '=' + value);
        return false;
    }

    _log(3, "<- writeDataGeneric()");

    return true;
}

function writeData(name, value) {
    return writeDataGeneric(data_prefix, name, value)
}

function setOption(key, value) {
    return writeDataGeneric(options_prefix, key, value)
}

// ************************************************************************************************************
// *********  Options Prompts *********************************************************************************
// ************************************************************************************************************

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
    window[key] = getOption(key, defaultValue, "boolean");
    GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
        setOption(key, !window[key]);

        if(key == DEF_OPTION_USE_SERVER_TIME && !window[key]) {
            var iServerTimeOffset = getServerTimeOffset();
            var promptMsg = (iServerTimeOffset == false) ? "Travian Task Queue:\nPlease enter your server's timezone offset from GMT in hours.\n(examples: for GMT enter 0, for MEZ enter 1, for EST enter -5)" : "Travian Task Queue:\nYour server's timezone offset was detected as " +iServerTimeOffset+ " hours from GMT.\n If this is not right, please enter the correct value. Otherwise leave the box empty.";

            var userResponse = prompt(promptMsg);
            while( (userResponse != '' && !isInt(userResponse)) || (userResponse == '' && iServerTimeOffset == false) ) {
                userResponse = prompt(promptMsg);
            }
            var value = (userResponse != '') ? userResponse:iServerTimeOffset;
            setOption(DEF_OPTION_SERVER_TIME_OFFSET, value);
        }

        location.reload();
    });
}

function useLocalTime() {
    GM_setValue(DEF_OPTION_USE_SERVER_TIME, false);
    bUseServerTime = false;
    GM_setValue(DEF_OPTION_SERVER_TIME_OFFSET, false);
    alert("Now you are using your local time for planning tasks.");
    location.reload();
}

function useServerTime() {
    var iServerTimeOffset = getServerTimeOffset();
    if(iServerTimeOffset == false) {
        iServerTimeOffset = prompt("To use the server time, please enter the timezone offset (in hours) of your server from the GMT.\nExamples:\nFor EST enter \"-5\", for MEZ enter \"1\", etc.");
        if(isInt(iServerTimeOffset)) {
            GM_setValue(DEF_OPTION_SERVER_TIME_OFFSET, iServerTimeOffset);
            GM_setValue(DEF_OPTION_USE_SERVER_TIME, true);
            bUseServerTime = true;
        } else {
            alert("Invalid value. You need to specify an integer.");
        }
    } else {
        GM_setValue(DEF_OPTION_USE_SERVER_TIME, true);
        bUseServerTime = true;
    }
    alert("Now you are using your local time for planning tasks.");
    location.reload();
}

function promptRace() {
    var iMyRace = getOption(DEF_OPTION_RACE, false, "integer");
    var newRace = false;
    while(!isInt(newRace)) {
        newRace = prompt(DEF_APP_NAME + ": \nWhat is your tribe on this server?\n(Type 0 for Romans, 1 for Teutons, 2 for Gauls.) \nCurrently: " +iMyRace);
        if(isInt(newRace)) {
            newRace = parseInt(newRace);            
            if(newRace > -1 && newRace < 3) {
                setOption(DEF_OPTION_RACE, newRace);
                _log(2,'Race was input:' + newRace + ". reloading page");
                location.reload();                
                break;
            } else {
                newRace = false;
            }
        }
    }
}

function promptHistory() {
    var newHistoryLength = false;
    while(!isInt(newHistoryLength)) {
        newHistoryLength = prompt(DEF_APP_NAME + ": \nHow many past tasks do we keep in history?\n(Type 0 to disable task history, -1 for no limitation) \nCurrently: " +iHistoryLength);
        if(isInt(newHistoryLength)) {
            newHistoryLength = parseInt(newHistoryLength);
            if(newHistoryLength > -2) {
                setOption(DEF_OPTION_HISTORY_LENGTH, newHistoryLength);
                location.reload();
                break;
            } else {
                newHistoryLength = false;
            }
        }
    }
}

function promptDelay() {
    var newDelay = false;
    while(!isInt(newDelay)) {
        newDelay = prompt(DEF_APP_NAME + ": \nHow many minutes add to task if error?\n(Type 0 to not add.) \nCurrently: " +iDelay);
        if(isInt(newDelay)) {
            newDelay = parseInt(newDelay);
            if(newDelay > -1) {
                setOption(DEF_OPTION_DELAY, newDelay);
                location.reload();
                break;
            } else {
                newDelay = false;
            }
        }
    }
}

function promptMonitorDids() {
    var curdids = getOption(DEF_KEY_MONITOR_DID,'');
    var names = '[no villages monitored.]';
    if (curdids != '')       {
        var acurdids = curdids.split(',');
        var names = new Array();
        for(var i = 0; i<acurdids.length;i++)
            names.push(getVillageName(acurdids[i]));
    }
    var dids = prompt("Currently monitored:\n\n" + names + "\n\nVillage dids to monitor, comma separated:",curdids);
    
    if (dids)
        try {
            var adids = dids.split(',');
            for (var i=0; i<adids.length;i++)
                if (!isInt(parseInt(adids[i])))
                    throw new Exception();
                else
                    _log(2,'Monitor village ' + adids[i]);
                    
            setOption(DEF_KEY_MONITOR_DID,dids);
            alert('Input was ok. ' + adids.length + ' Villages will be monitored.');
            getMonitoredRallyPoints();
        } catch (e) {        
            alert('error, not saved.\nInput was:' + dids);
        }
}

function promptInt(key,text) {
    var newDelay = false;
    while(!isInt(newDelay)) {
        newDelay = prompt(DEF_APP_NAME + ": \n" + text + "\nCurrently: " + getOption(key));
        if(isInt(newDelay)) {
            newDelay = parseInt(newDelay);
            if(newDelay > -1) {
                setOption(key, newDelay);
                location.reload();
                break;
            } else {
                newDelay = false;
            }
        }
    }
}


/**
 * This function is called once, after user installed a new version of this script
 */
function performUpgrade() {
    _log(3, "-> performUpgrade()");

    writeData(DEF_TTQ_CODE0, "");
    writeData(DEF_TTQ_CODE1, "");
    writeData(DEF_TTQ_PLACE_NAMES, "");



    setOption("TTQ_VERSION", sCurrentVersion);
    alert("Your Travian Task Queue script has been updated.");
    _log(3, "<- performUpgrade()");
}


function checkIfLoggedIn() {
    var xpathExpr = "//form[contains(@name,'snd')]";
    var login = document.evaluate("//img[contains(@src,'l1.gif')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    var login2 = document.evaluate("//input[contains(@value,'login')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
    if (login2.snapshotLength > 0 || login.snapshotLength > 0 || window.location.href.match(/logout.php/) || window.location.href.match(/login.php/) ) {
        var frm = xpath(xpathExpr);
        if (frm.snapshotLength > 0)
            frm.snapshotItem(0).submit();
    }

}

// ****************************************************************************************************************************
// *********  Main start function *********************************************************************************************
// ****************************************************************************************************************************
function onLoad() {
    _log(2, "-> onLoad()");
    _log(3, "oIntervalReference " + oIntervalReference);

    
    if(getOption("TTQ_VERSION", 0) != sCurrentVersion) {
        performUpgrade();
    }
    
    makeMenuToggle(DEF_OPTION_TASKLIST_SHOW, true, "Show Task List", "Dont show Task List", DEF_APP_NAME);  
    makeMenuToggle(DEF_OPTION_STATS_SHOW, false, "Show Stats", "Dont show Stats", DEF_APP_NAME);
    makeMenuToggle(DEF_OPTION_REPORTS_CLEAR, false, "Autoclear own reports", "Dont autoclear own reports", DEF_APP_NAME);    
    if (getOption(DEF_OPTION_REPORTS_CLEAR,false))
        makeMenuToggle(DEF_OPTION_UPLOADOWN, false, "Upload autocleared reports", "Dont upload autocleared reports", DEF_APP_NAME);
    makeMenuToggle(DEF_OPTION_UPLOADALLYREPORTS, false, "Upload ally reports", "Dont upload ally reports", DEF_APP_NAME);
    //if (getOption(DEF_OPTION_UPLOADALLYREPORTS,false))
        GM_registerMenuCommand(DEF_APP_NAME + ": Task History Length", function() {promptInt(DEF_KEY_LAST_ALLYREPORT_GOTTEN_INTERVAL,'Set ally reports interval (minutes)')});
    
    makeMenuToggle(DEF_OPTION_SHOW_POPUP_ON_SUCCESS, true, "Show popup on task success", "Dont show popup on task success", DEF_APP_NAME);    
    GM_registerMenuCommand(DEF_APP_NAME + ": Task History Length", promptHistory);
    makeMenuToggle(DEF_OPTION_HISTORY_ONLY_ERROR, false, "Only log errors to history", "Log errors and successes to history", DEF_APP_NAME);    
    //makeMenuToggle(DEF_OPTION_USE_SERVER_TIME, false, "Use server time", "Use local time", DEF_APP_NAME);    
    GM_registerMenuCommand(DEF_APP_NAME + ": Set Tribe", promptRace);
    GM_registerMenuCommand(DEF_APP_NAME + ": Rally point Monitor Villages", promptMonitorDids);
    GM_registerMenuCommand(DEF_APP_NAME + ": Attacks History Length", function() {promptInt(DEF_OPTION_OVERVIEW_LENGTH,'Set attacks history length')});

    //GM_registerMenuCommand(DEF_APP_NAME + ": Global delay on Error", promptDelay);

    var oDate = new Date();

    setOption(DEF_OPTION_LAST_REFRESH, Math.round(oDate.getTime()/1000));

    if(!oIntervalReference) {
        _log(3, "setInterval()");
        oIntervalReference = window.setInterval(checkSetTasks, iCheckEvery);
    }

    var re = /.*build\.php.*/i;
    if (re.test(window.location.href)) {
        createBuildLinks();
        createResearchLinks();
        createTrainLinks();
        createSendResourceLinks();
    }

    //var re = /.*a2b\.php\?(newdid=[0-9]*&)?z=.*/i;
    re = /.*a2b\.php/i
    if (re.test(window.location.href)) {
        createAttackLinks();
    }

    //var iRace = tryGetRaceFromPage();
    // _log(2,'Got Race from page:' + iRace);
    iMyRace = getOption(DEF_OPTION_RACE, false, 'integer')
    if (!isInt(iMyRace)) {
        promptRace();
        return; // to allow reloading page    
    }
     
    _log(3,'Got Race from options:' + iMyRace);    
    if( iMyRace != false && ( iMyRace != getOption(DEF_OPTION_RACE, false, "integer") || !getOption(DEF_OPTION_SCOUT_UNIT, false, "integer"))) {
        _log(2,'Setting iScoutUnit and iMyRace = ' + iMyRace); 
        switch(parseInt(iMyRace)) {
            case 0: //Romans
                setOption(DEF_OPTION_SCOUT_UNIT, 4);
                setOption(DEF_OPTION_RACE, 0);                
                break;
            case 1: //Teutons
                setOption(DEF_OPTION_SCOUT_UNIT, 4);
                setOption(DEF_OPTION_RACE, 1);
                break;
            case 2: //Gauls
                setOption(DEF_OPTION_SCOUT_UNIT, 3);
                setOption(DEF_OPTION_RACE, 2);
                break;
        }
    }

    iScoutUnit = getOption(DEF_OPTION_SCOUT_UNIT, false, "integer");
    if(iScoutUnit != 3 && iScoutUnit != 4) {  //3 or 4 are the only valid values
        alert("Unknown iScoutUnit (iScoutUnit="+iScoutUnit+")");
    }
    iDelay = getOption(DEF_OPTION_DELAY, 10, "integer");
    iHistoryLength = getOption(DEF_OPTION_HISTORY_LENGTH, 7, "integer");
    bUseServerTime = getOption(DEF_OPTION_USE_SERVER_TIME, false, "boolean")

    switch(iMyRace) {
        case 0: aTroopData = romans; break;
        case 1: aTroopData = teutons; break;
        case 2: aTroopData = gauls; break;
    }
    
    refreshTaskList();    

    data = readData(DEF_TTQ_HISTORY);
    if(iHistoryLength != 0 && data != '') {
        refreshHistory(trimHistory(data, iHistoryLength).split("|"));
    }
        
    berichteMain();
    
    checkForReportsPage();
    
    getAllyReports();
    
    //getMonitoredRallyPoints(); done by refresh button on div
    monitorMain();
            
    infoDisplayMain();

    _log(3, "<- onLoad()");
}

function onError() {
    //alert(document.innerHTML);
}

// --- Main Code Block ---
_log(0, DEF_APP_NAME + " started.");

EventManager.Add(window,'load', onLoad, false);
EventManager.Add(window,'error', onError, false);
EventManager.Add(window,'abort', onError, false);