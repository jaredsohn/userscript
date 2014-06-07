// ==UserScript==
// @name        MyFreeFarm Polish
// @namespace   http://userscripts.org/scripts/show/XXXXXX
// @description Polski pakiet jezykowy do Berater/Automater
// @date        05.04.2014
// @version     1.0.12
// @include     http://wolnifarmerzy.pl/*
// @include     http://s*.wolnifarmerzy.pl/*
// @include     http://www.wolnifarmerzy.pl/*
// @grant       GM_log
// ==/UserScript==
// Translation by Bonizaur & irass

// Edit above the @include. This controls on which pages the script is called.
window.addEventListener("load",function(){
try{
    // Do not edit
    var texte = new Object();
    const PRODSTOP = -1;
    const GFX = "http://mff.wavecdn.de/mff/"; // The path to the in-game images
    // Important constants
	const COUNTRY="PL"; // The country ISO-code (2 digits)
	const LANGUAGE="pl"; // The language ISO-code (2 digits)
    const delimThou = "."; // The separator for thousands (e.g. in 1,000).
    const regDelimThou = "\\."; // = delimThou. "." has to be masked to "\\."!
	const regDelimThouShift="([\\d\\.])(\\d)\\.(\\d{1,2}\\D)"; // = "([\\d"+delimThou+"])(\\d)"+delimThou+"(\\d{1,2}\\D)"
	const regDelimThouDelete="(\\d)\\.(\\.*)(\\d{1,2}\\D)"; // = "(\\d)"+delimThou+"("+delimThou+"*)(\\d{1,2}\\D)"
    const delimDeci = ","; // The separator for decimals (e.g. in 1.99).
    const regDelimDeci = ","; // = delimDeci. "." has to be masked to "\\."!
    const dateFormatDM = "day.month."; // The style a short date is displayed. You can use the tags "day" and "month".
    const dateFormatDMY = "day.month.year"; // The style a date is displayed. You can use the tags "day", "month" and "year".
    const timeFormatHM = "hour:min"; // The style a time is displayed. You can use the tags "hour" and "min".
    const timeFormatHMS = "hour:min:sec"; // The style a precise time is displayed. You can use the tags "hour", "min" and "sec".
    const a_ogonek = "\u0105";
    const c_ac = "\u0107";
    const E_ogonek = "\u00C9";
    const e_ogonek = "\u0119";
    const L_stroke = "\u0141";
    const l_stroke = "\u0142";
    const n_ac = "\u0144";
    const O_ac = "\u00D3";
    const o_ac = "\u00F3";
    const S_ac = "\u015A";
    const s_ac = "\u015B";
    const z_ac = "\u017A";
    const z_dot = "\u017C";
    // Take the following from the game
    // For the following you have to take a message sent if you sell something on the market place
    texte["msgMarketsaleContent"] = "(.*) zakupi" + l_stroke + " od Ciebie na targu\\s*(\\d+)x (.*?) za kwot" + e_ogonek + "\\s*<br>\\s*(.*?) ft\\."; // The text where the information is stated. The information has to be replaced by "(.*?)".
    // For the following you have to take a message sent if you sell something via contract
    texte["msgContractsaleContent"] = "(.*) podpisa" + l_stroke + " wys" + l_stroke + "an" + a_ogonek + " mu przez Ciebie umow" + e_ogonek + "!<br>\\s*<br>\\s*Sprzeda" + l_stroke + "e" + s_ac + " nast" + e_ogonek + "puj" + a_ogonek + "ce produkty:\\s*<br>([\\S\\s]*)\\s*<br>\\s*Nale" + z_dot + "no" + s_ac + c_ac + " za produkty w wysoko" + s_ac + "ci (.*?) ft zosta" + l_stroke + "a przelana na Twoje konto\\."; // The text where the general information is stated. The information has to be replaced by "(.*?)".
    texte["msgContractsaleList"] = "\\s*(\\d+)x (.*?)<br>"; // The line-pattern for the detailed selling list
    // For the following you have to take a message sent if somebody wants to add you as friend
    texte["msgFriend"] = "(.+) chce zosta"+c_ac+" twoim przyjacielem"; // The subject. The person has to be replaced by "(.+)"
    // And all the other texts you can enter what you want ...
    texte["above"] = "Suma prod. powy"+z_dot+"ej";
    texte["absolute"] = "Potrzebne";
    texte["accountActive"]="Konto aktywne";
    texte["accounts"] = "Konta";
    texte["activation"] = "Aktywuje";
    texte["additionalFarmi"] = "%1% dodatkowy klient dziennie"; 
    texte["additionalForestFarmiSlot"] = "%1% dodatkowe miejsce w kolejce klient"+o_ac+"w le"+s_ac+"nych";
    texte["additionalLogCapacity"] = "Zwi"+e_ogonek+"ksza pojemno"+s_ac+c_ac+" drewutni o %1%";
    texte["advertisingEnds"] = "Kampania reklamowa ko" + n_ac + "czy si" + e_ogonek + " dzi" + s_ac;
    texte["adviser"] = "Doradca";
    texte["afterFee"] = "Po op" + l_stroke + "acie";
    texte["alertSetPriceNone"] = "Czy na pewno chcesz ustawi" + c_ac + " cen" + e_ogonek + " %PRODUCT% na zero?";
    texte["alertSetPriceOverNPC"] = "Czy na pewno chcesz ustawi" + c_ac + " cen" + e_ogonek + " %PRICE% dla %PRODUCT%?<br>To wi" + e_ogonek + "cej ni" + z_dot + " daj" + a_ogonek + " NPC - %NPC%.";
    texte["alertSetPriceOverObs"] = "Czy na pewno chcesz ustawi" + c_ac + " cen" + e_ogonek + " %PRICE% dla %PRODUCT%?<br>To znacznie wi" + e_ogonek + "cej ni" + z_dot + " " + s_ac + "rednia (%OBS%).";
    texte["alertSetPriceUnderObs"] = "Czy na pewno chcesz ustawi" + c_ac + " cen" + e_ogonek + " %PRICE% dla %PRODUCT%?<br>To znacznie mniej ni" + z_dot + " " + s_ac + "rednia (%OBS%).";
    texte["alertWillLowRack"] = "UWAGA! Na regale zostanie ci mniej ni" + z_dot + " ustalone minimum!";
    texte["all"] = "Wszystko";
    texte["autologinAllOk"] = "Wszystkie konta zalogowane.";
    texte["autologinChecking"] = "Sprawdzenie aktywnych sesji. Prosz" + e_ogonek + " odczeka" + c_ac + " %1% sekund<br>...";
    texte["boughtTickets"] = "Kupione losy";
    texte["buy"] = "Kupuj";
    texte["buyers"] = "Kupcy";
    texte["calcTo"] = "Wyliczone do"; 
    texte["carpentry"] = "Stolarnia";
    texte["city"] = "Miasto";
    texte["clearFilter"]="Wyczy"+s_ac+c_ac+" filtr";
    texte["click"] = "Klik";
    texte["clickAlt"] = "Alt+Klik";
    texte["clickCtrl"] = "Ctrl+Klik";
    texte["clickDouble"] = "Dwuklik";
    texte["clickToChange"] = "Kliknij aby zmieni" + c_ac;
    texte["coins"]=unsafeWindow.t_coins;
	texte["commission"] = "Prowizja";
    texte["confirmUseObservedPrices"] = "Czy przyj" + a_ogonek + c_ac + " " + s_ac + "redni" + a_ogonek + " rynkow" + a_ogonek + " jako ceny na targu?";
    texte["contract"] = "Umowa";
    texte["contractsReceived"] = "Umowy otrzymane";
    texte["contractsSent"] = "Umowy wys" + l_stroke + "ane";
    texte["couldNotGetRank"]="Nie mo"+z_dot+"na okre"+s_ac+"li"+c_ac+" twojego miejsca w rankingu."; 
    texte["couldNotGetUpdateInfoOfX"]="Nie znaleziono aktualizacji skryptu %1%"
    texte["cropped"] = "Wysiewanie";
    texte["currentOffers"] = "Aktualne oferty";
    texte["dailyRuns"] = "Dzienna produkcja ";
    texte["dailyTicket"] = "Dzienne losy";
    texte["dailyYield"] = "Dzienny plon";
    texte["day"] = "Dzie" + n_ac;
    texte["day0"] = "Dzi" + s_ac;
    texte["day1"] = "Jutro";
    texte["day2"] = "Pojutrze"; //comment it if not used in the language
    texte["default"] = "Domy" + s_ac + "lnie";
    texte["delete"] = "Usu" + n_ac;
    texte["demand"] = "Potrzebne";
    texte["detail"]="Detal";
	texte["duration"] = "Czas prod.";
    texte["editPrice"] = "Edytuj cen" + e_ogonek;
    texte["emptyField"] = "Puste pole!";
    texte["exchangedLots"] = "Wymienione losy";
    texte["farm"] = "Farma";
    texte["farmersmarket"]=unsafeWindow.t_farmers_market;
    texte["farmi"] = "Klient";
    texte["farmis"] = "Klienci";
    texte["farmpedia"] = "Do Niemieckiej FarmPedii";
    texte["farmpediaUrl"] = "http://farmpedia.myfreefarm.de/";
    texte["farmX"] = "%1%. farm"+e_ogonek; 
    texte["farmzone"] = "%1% miejsce pod zabudow"+e_ogonek+" na %2% farmie";  
    texte["feed"] = "Karmienie";
    texte["filter"] = "Filtr";
    texte["filterForX"] = "Filtrowanie po %1%";
    texte["finished"] = "Gotowe";
    texte["foodworld"] = unsafeWindow.foodworld_title; 
    texte["forest"] = "Las";
    texte["forestry"] = "Le" + s_ac + "nictwo";
    texte["formatNumbers"] = "Format liczb";
    texte["formulaType"] = ["Prod", "+val", "+pts"];
    texte["fl1"]="Rabatka";
    texte["fl2"]="Pracownia kwiatowa";
    texte["fw1"] = "Stoisko z napojami";
    texte["fw2"] = "Bistro";
    texte["fw3"] = "Piekarnia";
    texte["gain"] = "Daje";
    texte["gamecurrency"]=unsafeWindow.gamecurrency;
	texte["general"] = "Og" + o_ac + "lne";
    texte["given"] = "Oddano";
    texte["goods"] = "Towary";
    texte["goToLottery"] = "Przejd" + z_ac + " do loterii";
    texte["goToMarket"] = "Id" + z_ac + " na targ";
    texte["goToMarketOfX"] = "Id" + z_ac + " na targ po %1%";
    texte["goToMarketstall"] = "Id" + z_ac + " do Twojego Straganu";
    texte["goToPage"] = "Przejd" + z_ac + " do strony";
    texte["goToRank"] = "Przejd" + z_ac + " do pozycji";
    texte["goToZoneX"]="Przejd"+z_ac+" do pola %1%";
    texte["hide"]="ukryj";
    texte["highlightProducts"] = "Pod" + s_ac + "wietl produkty na targu";
    texte["highlightUser"] = "Pod" + s_ac + "wietl farmera na targu";
    texte["hotkeys"] = "Hotkeys";
    texte["idle"] = "Bezczynne!!";
    texte["informationIsMissing"]="Brak danych."
    texte["ingredients"] = "Sk" + l_stroke + "adniki";
    texte["inStock"] = "w regale";
    texte["invalidServer"] = "B" + l_stroke + e_ogonek + "dny serwer";
    texte["inventory"] = "Zapasy";
    texte["keptLots"] = "Zatrzymane losy";
    texte["level"] = "Poziom";
    texte["levelTooLow"] = "Tw" + o_ac + "j poziom jest za niski";
    texte["levelXneeded"] = "Wymagany&nbsp;%1%&nbsp;poziom";
    texte["load"] = L_stroke + "aduj";
    texte["loading"] = L_stroke + "adowanie";
    texte["localTime"] = "Czas lokalny";
    texte["lodge"] = "Le" + s_ac + "nicz" + o_ac + "wka";
    texte["login"] = "Login";
    texte["lotteryLog"] = "Historia loterii";
    texte["lvl"] = "Lvl";
    texte["manageVariables"] = "Zarz" + a_ogonek + "dzaj zmiennymi";
    texte["market"] = "Targ";
    texte["marketplace"] = "Rynek";
    texte["marketPrice"] = "Na&nbsp;targu&nbsp;po";
    texte["marketstall"] = "Tw" + o_ac + "j stragan";
    texte["messages"] = "Wiadomo" + s_ac + "ci";
    texte["minRack"] = "Min&nbsp;ilo" + s_ac + c_ac;
    texte["minRackamount"] = "Minimalna ilo" + s_ac + c_ac + " w regale";
    texte["missing"] = "Brakuje";
    texte["money"] = "Oferuje";
    texte["msgUpdate"] = "Jest nowa wersja skryptu 'Doradca Farmera'. Czy chcesz j" + a_ogonek + " zainstalowa" + c_ac + "?";
    texte["msgUpdateX"]="Dost"+e_ogonek+"pna jest nowa wersja skryptu %1% . Czy chcesz go zainstalowa"+c_ac+"?";
    texte["name"] = "Login";
    texte["newLevelReached"] = "Gratulacje!<br>Osi" + a_ogonek + "gn" + a_ogonek + l_stroke + "e" + s_ac + " kolejny poziom!";
    texte["nextMessage"] = "Nast" + e_ogonek + "pna wiadomo" + s_ac + c_ac;
    texte["no"] = "Nie";
    texte["NPC"] = "w sklepie";
    texte["NPCprice"] = "Cena sklepowa";
    texte["nr"] = "Nr";
    texte["observed"] = S_ac + "rednia rynkowa";
    texte["ok"] = "OK";
    texte["oldOnes"] = "Poprzednie";
    texte["options"] = "Opcje";
    texte["overNPCprice"] = "wi" + e_ogonek + "cej ni" + z_dot + "w sklepie";
    texte["overview"] = "Przegl" + a_ogonek + "d";
    texte["overX"] = "wi" + e_ogonek + "cej %1%";
    texte["password"] = "Has" + l_stroke + "o";
    texte["pleaseOpenX"]="Otw"+o_ac+"rz %1%.";
    texte["points"] = "Punkt" + o_ac + "w";
    texte["portalLogin"]="Portal-Login";
    texte["powerups"] = "Power-Upy";
    texte["previousMessage"] = "Poprzednia wiadomo" + s_ac + c_ac;
    texte["price"] = "Cena";
    texte["prices"] = "Ceny";
    texte["product"] = "Produkt";
    texte["production"] = "Produkcja";
    texte["productOverview"] = "Przegl" + a_ogonek + "d produkt" + o_ac + "w";
    texte["products"] = "Produkty";
    texte["productTimeSaving"] = "%1% minut oszcz"+e_ogonek+"dno"+s_ac+"ci dla %2%";  
    texte["profit"] = "Zysk";
    texte["profitTable"] = "Kalkulacja zysk" + o_ac + "w dziennych";
    texte["quantity"] = "Ilo" + s_ac + c_ac;
    texte["quest_foodworld"] = "Quest Piknikowy";
	texte["quest_forestry"]="Quest Le" + s_ac + "ny";
	texte["quest_main"]="Quest farmy";
    texte["questfoodworld1"]="Questy piknikowe";     
    texte["questforestry1"]="Questy I (le"+s_ac+"ne)";
    texte["questforestry2"]="Questy II (le"+s_ac+"ne)";
    texte["questmain1"]="Questy I (farma)";
    texte["questmain2"]="Questy II (farma)";
    texte["quests"] = "Questy";
    texte["rackX"] = "%1%. rega" + l_stroke;
    texte["rank"] = "Pozycja";
    texte["readAll"] = "Wszystkie przeczytane";
    texte["readyAtX"] = "Gotowe o %1%"; //%1%=2:15+texte["shortOClock"]
    texte["readyAtX_day1"] = "Gotowe jutro o %1%";
    texte["readyAtX_day2"] = "Gotowe pojutrze o %1%"; //comment it if not used in the language
    texte["readySinceX"] = "Gotowe za %1%";
    texte["recipes"] = "Przepisy";
    texte["recursive"] = "Rekurencyjnie potrzebne"
    texte["relative"] = "Brakuje";
    texte["relogin"] = "Zbli" + z_dot + "a si" + e_ogonek + " koniec sesji.<br>Nowe logowanie za %1% sek.";
    texte["requestingUpdateInfoOfX"]="Sprawdzam dost"+e_ogonek+"pne aktualizacje %1% ..."
    texte["requestingUserStatistic"]="Sprawdzam statystyki u"+z_dot+"ytkownika ...";
    texte["requirement"] = "Potrzeba";
    texte["requirementPerProduction"] = "Wymagane do produkcji";
    texte["reward"] = "Nagroda";
    texte["salesLog"]="Log sprzeda"+z_dot+"y";
    texte["save"] = "Zapis";
    texte["saveAsTemplate"] = "Zapisz jako szablon";
    texte["sawmill"] = "Tartak";
    texte["scriptHomepage"] = "Strona skryptu";
    texte["searchPlayer"] = "Szukaj gracza";
    texte["sendContract"] = "Wys" + l_stroke + "a" + c_ac + " umow" + e_ogonek;
    texte["sendContractAgain"] = "Wy" + s_ac + "lij umow" + e_ogonek + " ponownie";
  	texte["sendingXObservedPricesToServer"]="Wysy"+l_stroke+"anie %1% obserwowanych cen na serwer ...";
    texte["sentContractNrX"]="Wy"+s_ac+"lij umow"+e_ogonek+" nr %1%."
    texte["server"] = "Serwer";
    texte["serverTime"] = "Czas serwera";
    texte["sessionEnd"] = "Koniec sesji o %1% - Kliknij by zalogowa" + c_ac + " ponownie";
    texte["SGH"] = "Sklep"; // Short for the seller of plants
    texte["shortHours"] = "h";
    texte["shortOClock"] = "h";
    texte["shouldReload"] = "Powiniene" + s_ac + " od" + s_ac + "wie" + z_dot + "y" + c_ac + " stron" + e_ogonek + ".";
    texte["showAll"] = "Poka" + z_dot + " wszystko";
    texte["showLog"] = "Poka" + z_dot + " log";
    texte["showMissingProducts"]="Poka"+z_dot+" braki produktowe";//?
    texte["showPasswords"] = "Poka" + z_dot + " has" + l_stroke + "o";
    texte["sinceX"] = "od %1%";
    texte["single"] = "Pojedy" + n_ac + "czo";
    texte["start"] = "Start";
    texte["stat_days1"] = "1 dzie" + n_ac;
    texte["stat_days3"] = "3 dni";
    texte["stat_days5"] = "5 dni";
    texte["stat_days7"] = "7 dni";
    texte["stat_gamefield"] = "Poka" + z_dot + " gr" + e_ogonek;
    texte["stat_stats"] = "Poka" + z_dot + " statystyki";
    texte["statistics"] = "Statystyki";
    texte["stock"] = "Ilo" + s_ac + c_ac;
    texte["stockValue"] = "Warto" + s_ac + c_ac + " towaru";
    texte["stockXlow"] = "Ma" + l_stroke + "o produktu: %1%";
    texte["stockXmissing"] = "Brakuje produktu: %1%!!!";
    texte["storeXinContract"] = "Przenie" + s_ac + " %1% do umowy";
    texte["summarize"] = "Analiza obrot" + o_ac + "w";
    texte["takeObservedPrices"] = "Przyjmij " + s_ac + "redni" + a_ogonek + " rynkow" + a_ogonek;
    texte["time"] = "Czsa";
    texte["title"] = "Nazwa";
    texte["toMessage"] = "do wiadomo" + s_ac + "ci";
    texte["toSGH"] = "Id" + z_ac + " do sklepu";
    texte["total"] = "Og" + o_ac + l_stroke + "em";
    texte["turnover"] = "Obr" + o_ac + "t";
    texte["unitPrice"] = "Cena jedn.";
    texte["updateOfXAvailable"]="Dost"+e_ogonek+"pna jest nowa wersja skryptu %1%, ale postanowi"+l_stroke+"e"+s_ac+" jej nie instalowa"+c_ac+"."
    texte["upgradeForX"] = "Rozbudowa&nbsp;za&nbsp;%1%";
    texte["upgradeLevel"] = "Podnie" + s_ac + " poziom";
    texte["upjersAdvertising"] = "Upjers-Advertising";
    texte["useQuestProducts"] = "U" + z_dot + "yj towar" + o_ac + "w z bie" + z_dot + a_ogonek + "cego Questa";
    texte["useWildcard"]= "U"+z_dot+"yj * aby oznaczy"+c_ac+" jedn"+a_ogonek+" lub wi"+e_ogonek+"cej liter.";
    texte["value"] = "Warto" + s_ac + c_ac;
    texte["waterBonus"] = "%1%% bonus podlewania";
    texte["wateringFeature"] = "Maszyna nawadniaj"+e_ogonek+"aca";
    texte["waterNeeded"] = "Wymaga podlania";
    texte["waterNeededAtX"] = "Trzeba podla" + c_ac + " o %1%";
    texte["waterNeededAtX_day1"] = "Trzeba podla" + c_ac + " jutro o %1%";
    texte["windmill"] = "M" + l_stroke + "yn";
    texte["writeMessage"] = "Wy" + s_ac + "lij wiadomo" + s_ac + c_ac;
    texte["XIsUpToDate"]="%1% jest aktualny."
    texte["yes"] = "Tak";
    texte["yield"] = "Plon";
    texte["yieldPerProduction"] = "Efekt produkcji";
    texte["youAreOnRankX"]="Jeste"+s_ac+" na miejscu %1%.";
    // category
	texte["category_c"]=texte["coins"];
	texte["category_v"]="Ro" + s_ac + "liny";
	texte["category_e"]="Produkty zwierz" + e_ogonek + "ce";
	texte["category_z"]=unsafeWindow.rack_deco;
	texte["category_o"]=unsafeWindow.rack_oil;
	texte["category_f1"]="Sadzonki";
	texte["category_f2"]="Pnie";
	texte["category_f3"]="Produkty tartaku";
	texte["category_f4"]="Produkty stolarni";
	texte["category_f5"]="Produkty drewniane";
	texte["category_fw"]=unsafeWindow.rack_foodworld;
	texte["category_fw1"]="Napoje";
	texte["category_fw2"]="Przek"+a_ogonek+"ski";
	texte["category_fw3"]="Ciasta";
	texte["category_fw4"]="jeszcze niedost" + e_ogonek + "pne";
  texte["category_r0"]="Przepisy - produkty";
  texte["category_r1"]="Przepisy - zwi"+e_ogonek+"kszaj"+a_ogonek+"ce wydajno"+s_ac+c_ac;
  texte["category_r2"]="Przepisy - daj"+a_ogonek+"ce punkty";
  texte["category_p0"]="Power-Ups - produkty";
  texte["category_p1"]="Power-Ups - zwi"+e_ogonek+"kszaj"+a_ogonek+"ce wydajno"+s_ac+c_ac;
  texte["category_p2"]="Power-Ups - daj"+a_ogonek+"ce punkty"; 	
    // settings
	texte["settings_valAutoWater"]=["Automatyczne podlewanie", "Ro" + s_ac + "liny b" + e_ogonek + "d" + a_ogonek + " automatycznie podlewane (je" + s_ac + "li masz konto Premium)."];
	texte["settings_valAssumeWater"]=["Kontynuuj podlewanie", "Jest to wa" + z_dot + "ne dla ro" + s_ac + "lin rosn" + a_ogonek + "cych d" + l_stroke + "u" + z_dot + "ej ni" + z_dot + " 24h. Na podstawie przewidywanego czasu zbioru je" + s_ac + "li podlewanie jest mo" + z_dot + "liwe, to jest kontynuowane."];
	texte["settings_valAutoCrop"]=["Automatyczne zbiory", "Po wej" + s_ac + "ciu na pole wszystkie plony zostan" + a_ogonek + " automatycznie zebrane."];
	texte["settings_valWaterNeeded"]=["Info o podlewaniu","Czy ma by"+c_ac+" wy"+s_ac+"wietlana ikona informuj"+a_ogonek+"ca o niepodlanym polu?"];        
	texte["settings_valCropMsg"]=["Autozamykanie zbior" + o_ac + "w", "Zaznacz je" + s_ac + "li denerwuje ci" + e_ogonek + " wyskakuj" + a_ogonek + "ca plansza z ilo" + s_ac + "ci" + a_ogonek + " zebranych plon" + o_ac + "w."];
	texte["settings_valLimitEmptyFields"]=["Puste miejsca", "Je" + s_ac + "li ilo" + s_ac + c_ac + " pustych miejsc przekroczy t" + a_ogonek + " warto" + s_ac + c_ac + ", to pole b" + e_ogonek + "dzie oznaczone jako puste."];
	texte["settings_valLimitEmptyFields_forest"]=["Puste miejsca w lesie", "Je" + s_ac + "li ilo" + s_ac + c_ac + " pustych miejsc przekroczy t" + a_ogonek + " warto" + s_ac + c_ac + ", to pole b" + e_ogonek + "dzie oznaczone jako puste."];
	texte["settings_valMoveAnimals"]=["Ruchome zwierzaki", ""];
	texte["settings_valContractLogAmount"]=["Ilo" + s_ac + c_ac + " zachowanych um" + o_ac + "w", "Twoje ostatnio wys" + l_stroke + "anie i otrzymane umowy b" + e_ogonek + "d" + a_ogonek + " zachowane i b" + e_ogonek + "dzie mo" + z_dot + "na przejrze" + c_ac + " ich histori" + e_ogonek + "."];
	texte["settings_valFarmiLimits"]=["Limit Klient" + o_ac + "w", "Klienci s" + a_ogonek + " oznaczani trzema kolorami zale" + z_dot + "nie od op" + l_stroke + "acalno" + s_ac + "ci ich oferty."];
	texte["settings_valFarmiMiniInfo"]=["Mini Info Klienta", "Wy" + s_ac + "wietla ma" + l_stroke + "e k" + o_ac + l_stroke + "ko pod klientem zale" + z_dot + "nie od op" + l_stroke + "acalno" + s_ac + "ci jego oferty."];
	texte["settings_valMinRackMan"]=["Minimalne ilo" + s_ac + "ci", "Mo" + z_dot + "esz ustali" + c_ac + " dok" + l_stroke + "adn" + a_ogonek + " ilo" + s_ac + c_ac + " *tutaj*"];
	texte["settings_valMinRack"]=[, " Produkt jest oznaczany, je" + s_ac + "li jego ilo" + s_ac + c_ac + " w regale spadnie poni" + z_dot + "ej tego poziomu. Mo" + z_dot + "esz ustali" + c_ac + " r" + o_ac + z_dot + "ne warto" + s_ac + "ci zale" + z_dot + "nie od kategorii."];
	texte["settings_valMinRackPlantsize"]=["Uwzgl" + e_ogonek + "dnij rozmiar sadzonki", "Przyk" + l_stroke + "adowo zbo" + z_dot + "e potrzebuje tylko po" + l_stroke + "ow" + e_ogonek + " powy" + z_dot + "szej warto" + s_ac + "ci."];
	texte["settings_valMinRackGrowing"]=["Produkcja w toku", "Uwzgl" + e_ogonek + "dnia ilo" + s_ac + c_ac + " produkt" + o_ac + "w b" + e_ogonek + "d" + a_ogonek + "cych w trakcie produkcji/wzrostu i gotowych przez bonusy."];
	texte["settings_valMinRackQuest"]=["Produkty do Quest"+o_ac+"w","Uwzgl"+e_ogonek+"dnia ilo"+s_ac+c_ac+" potrzebn"+a_ogonek+" do wykonania Questa."];   
	texte["settings_valMinRackRecursive"]=["Produkty rekurencyjnie", "Dodaj produkty wymagane do produkcji brakuj" + a_ogonek + "cych towar" + o_ac + "w i przelicz ponownie dla takiego stanu (u" + z_dot + "yteczne przy produkcji le" + s_ac + "nej)"];
	texte["settings_valMinRackFarmis"]=["Produkty klient" + o_ac + "w", "Dodaje ilo" + s_ac + c_ac + " produkt" + o_ac + "w potrzebnych dla klient" + o_ac + "w, kt" + o_ac + "rzy p" + l_stroke + "ac" + a_ogonek + " wi" + e_ogonek + "cej ni" + z_dot + " ustalone minimum."]
	texte["settings_valMinRackForestryFarmis"]=["Produkty klient" + o_ac + "w Lasu", "Dodaje ilo" + s_ac + c_ac + " produkt" + o_ac + "w potrzebnych dla klient" + o_ac + "w Lasu."];
	texte["settings_protectMinRack"]=["Ochrona sprzeda" + z_dot + "y", "Sprzedaj" + a_ogonek + "c na targu zostawi w regale ustalone minimum towaru"];
	texte["settings_valBuyingLimitDown"]=["Pod" + s_ac + "wietlenie ceny poni" + z_dot + "ej minimum", ""];
	texte["settings_valBuyingLimit"]=["G" + o_ac + "rny limit zakupu", "Zaznaczasz do jakiej granicy chcesz kupowa" + c_ac + " na targu. To chroni przed zakupem zbyt drogich produkt" + o_ac + "w na targu."];
	texte["settings_valBuyingLimitNPC"]=["Blokada zakup"+o_ac+"w", "Pozw" + o_ac + "l na zakupy tylko do ceny sklepowej"];
	texte["settings_valSellingLimit"]=["Limity sprzeda" + z_dot + "y", "Zakres w jakim twoja sprzeda" + z_dot + " b" + e_ogonek + "dzie chroniona, aby" + s_ac + " nie sprzeda" + l_stroke + " swoich plon" + o_ac + "w zbyt tanio lub za drogo.."];
	texte["settings_valJoinPrices"]=["Upro" + s_ac + c_ac + " sprzeda" + z_dot, "Po" + l_stroke + a_ogonek + "czy w jedno pola ceny na twoim straganie (u" + l_stroke + "atwia wprowadzanie cen)."];
	texte["settings_valQuicklinks"]=["Szybki przegl" + a_ogonek + "d rynku (ikony)", "Pokazuje wysuwany pasek z ikonami dost" + e_ogonek + "pnych towar" + o_ac + "w (z prawej)"];
	texte["settings_valUseObservedPrices"]=["U" + z_dot + "yj " + s_ac + "rednich cen", "Podczas przegl" + a_ogonek + "dania cen na targu s" + a_ogonek + " one notowane i u" + s_ac + "redniona cena jest wykazywana w tabeli cen. Czy automatycznie ma ona by" + c_ac + " przyjmowana jako rynkowa?"];
	texte["settings_valSendStatistics"]=["Wy" + s_ac + "lij statystyki", "Wspomaga <a href='http://mff.metrax.eu/' target='_blank'>Statistik-Server</a>.  Dane prywatne nie s" + a_ogonek + " wysy" + l_stroke + a_ogonek + "ne!"];
	texte["settings_valPrivateMessages"]=["Ilo" + s_ac + c_ac + " zachowanych prywatnych wiadomo" + s_ac + "ci", "Liczba prywatnych wiadomo" + s_ac + "ci, kt" + o_ac + "re zostan" + a_ogonek + " zachowane, aby umo" + z_dot + "liwi" + c_ac + " przegl" + a_ogonek + "d historii danej umowy"];
	texte["settings_valMarketMessages"]=["Ilo" + s_ac + c_ac + " zachowanych rynkowych wiadomo" + s_ac + "ci", "Zaznacz ile wiadomo" + s_ac + "ci ma by" + c_ac + " przechowywanych, nawet je" + s_ac + "li s" + a_ogonek + " starsze ni" + z_dot + " maksymalnie 7 dni."];
	texte["settings_valMessageRe"]=["Skr" + o_ac + "t tematu", "Zamienia \"Re:Re:\" na \"Re:\" w temacie wiadomo" + s_ac + "ci, gdy na ni" + a_ogonek + " odpowiadasz."];
  texte["settings_valMessagesSystemMarkRead"]=["Auto odczyt wiadomo"+s_ac+"ci","Automatycznie odczytywanie wiadomo"+s_ac+"ci systemowych."];
  texte["settings_valFoodworldFarmiPlacing"]=["Obs"+l_stroke+"uga klient"+o_ac+"w strefy pikniku","Klienci stefy pikniku b"+e_ogonek+"d"+a_ogonek+" automatycznie umieszczani na wolnych miejscach."]; 
	texte["settings_valAutoLogin"]=["Automatyczne logowanie", "Po wprowadzeniu nazwy u" + z_dot + "ytkownika i has" + l_stroke + "a nast" + e_ogonek + "puje automatyczne logowanie. Pozwala to zachowa" + c_ac + " ci" + a_ogonek + "g" + l_stroke + "o" + s_ac + c_ac + " grania. Przy wielu kontach musi by" + c_ac + " dozwolone wyskakiwanie okienek."];
	texte["settings_valUpdate"]=["Aktualizacja", "Automatycznie sprawdza czy jest nowsza wersja tego skryptu."];
	texte["settings_valServerTimeOffset"]=["Czas serwera", ""];
	texte["settings_valGamecursor"]=["Kursor gry", "U" + z_dot + "yj kursora gry zamiast systemowego."];
	texte["settings_valDrag"]=["Przesuwanie", "Pozwala na przesuwanie okien po klikni" + e_ogonek + "ciu na lewy g" + o_ac + "rny r" + o_ac + "g."];
	texte["settings_valClickErrorbox"]=["Ukryj okno b" + l_stroke + e_ogonek + "du", "Niekt" + o_ac + "rzy u" + z_dot + "ytkownicy maj" + a_ogonek + " problemy z oknem b" + l_stroke + e_ogonek + "du. Pami" + e_ogonek + "taj jednak, " + z_dot + "e zasadniczo jest ono przydatne!"];
	texte["settings_valHotkeys"]=["Hotkeys", "U" + z_dot + "ywanie klawiszy pozwala na szybsze poruszanie si" + e_ogonek + " po grze."];
	texte["settings_hotkeymap"]={"prevPage": "poprzednia wiadomo" + s_ac + c_ac + ", pole, ...","nextPage": "nast" + e_ogonek + "pna wiadomo" + s_ac + c_ac + ", pole, ...",      "farm1": "1-sza farma","farm2": "2-ga farma","farm3": "3-cia farma","guild": "Klub","city1": "Pierwsze miasto","city2": "Drugie miasto","farmilog": "Farmi-Log","help": "Pomoc","market": "Targ","marketstand": "Market stand","messages": "Wiadomo" + s_ac + "ci","options": "Opcje","profit": "Kalkulator zysk" + o_ac + "w","sgh": "Sklep z nasionami","overview": "Przegl" + a_ogonek + "d","contract": "Umowy","systemmessage": "wiadomo" + s_ac + "ci systemowe"    };
	texte["settings_valzoneAddToGlobalTime"]=["Zintegruj", "Czy czas produkcji ma by" + c_ac + " wliczony do czasu og" + o_ac + "lnego?"];
	texte["settings_valGlobaltimeShowCroppedZone"]=["Zintegruj zebrane pola", "Czy doliczy" + c_ac + " do og" + o_ac + "lnego czasu pola ju" + z_dot + " zebrane?"];
	texte["settings_cacheReset"]=["Cache reset", "Usuwanie wszystkich danych zapisanych przez ten skrypt..."];
    //help
    texte["help_0"]=[,"Oto skr"+o_ac+"cona instrukcja funkcji dost"+e_ogonek+"pnych w Doradcy Farmera. Nie s"+a_ogonek+" tu opisane wszystkie, gdy"+z_dot+" skrypt stale si"+e_ogonek+" rozwija. Aby odkry"+c_ac+" niekt"+o_ac+"re wystarczy najecha"+c_ac+" na nie myszk"+a_ogonek+". <br>Na dole strony wida"+c_ac+" przycisk opcji, mo"+z_dot+"esz tam dopasowa"+c_ac+" skrypt do swoich wymaga"+n_ac+".<br> Generalnie skrypt wie tylko tyle ile zobaczy i ustalisz, wi"+e_ogonek+"c w razie jakich"+s_ac+" problem"+o_ac+"w radz"+e_ogonek+" tam zajrze"+c_ac];
	texte["help_1"]=["Pola","Po wej" + s_ac + "ciu na pole skrypt zapisuje co jest produkowane, czas produkcji oraz czy ro" + s_ac + "liny s" + a_ogonek + " podlane. Informacje s" + a_ogonek + " p" + o_ac + z_ac + "niej wy" + s_ac + "wietlane w widoku farmy. Ka" + z_dot + "de pole ma w" + l_stroke + "asny licznik czasu, odliczaj" + a_ogonek + "cy czas do zbioru.<br> Je" + s_ac + "li masz w" + l_stroke + a_ogonek + "czon" + a_ogonek + " pomoc w sianiu to jest ona dost" + e_ogonek + "pna pod ikonk" + a_ogonek + " kwiatka. Na g" + o_ac + "rze pola s" + a_ogonek + " umieszczone strza" + l_stroke + "ki pozwalaj" + a_ogonek + "ce na przemieszczanie si" + e_ogonek + " mi" + e_ogonek + "dzy polami"];
	texte["help_2"]=["Przegl" + a_ogonek + "d","Klikni" + e_ogonek + "cie na " + s_ac + "wink" + e_ogonek + " na g" + o_ac + "rze ekranu wy" + s_ac + "wietla przegl" + a_ogonek + "d informacji o ca" + l_stroke + "ej farmie. Opisane jest tu ka" + z_dot + "de pole, jego obecny stan (produkcja, punkty oraz czas zako" + n_ac + "czenia). Podawana jest te" + z_dot + " suma wszystkich zbior" + o_ac + "w.<br> Poni" + z_dot + "ej wy" + s_ac + "wietlany jest spis brakuj" + a_ogonek + "cych produkt" + o_ac + "w " + z_dot + a_ogonek + "danych przez klient" + o_ac + "w. Za" + s_ac + " ni" + z_dot + "ej szczeg" + o_ac + l_stroke + "owe zestawienie zam" + o_ac + "wie" + n_ac + ", w kt" + o_ac + "rym wyliczone s" + a_ogonek + " " + z_dot + a_ogonek + "dane produkty (braki oznaczone na czerwono), sugerowana cena, warto" + s_ac + c_ac + " rynkowa i nasz zysk.<br> Klikaj" + a_ogonek + "c na dany produkt (w zestawieniu brak" + o_ac + "w lub indywidualnym) przeniesiesz si" + e_ogonek + " prosto na targ, aby" + s_ac + " m" + o_ac + "g" + l_stroke + " go kupi" + c_ac + ".<br> Mo" + z_dot + "esz te" + z_dot + " przej" + s_ac + c_ac + " do wybranego pola lub klienta po klikaj" + a_ogonek + "c na nie."];
	texte["help_3"]=["Niebieski pasek","Zdobywane punkty s" + a_ogonek + " codziennie zliczane, a ich ilo" + s_ac + c_ac + " pokazywana na niebieskim pasku u do" + l_stroke + "u ekranu. Czarna kreska oddziela poziom poprzedni i bie" + z_dot + a_ogonek + "cy, kreski bia" + l_stroke + "e oddzielaj" + a_ogonek + " dni, za" + s_ac + " czerwona oznacza niedziel" + e_ogonek + ".<br> Klikni" + e_ogonek + "cie na ten pasek wy" + s_ac + "wietli tabel" + e_ogonek + " zdobywanych punkt" + o_ac + "w oraz braki w produktach"];
	texte["help_4"]=["Rega" + l_stroke,"Przedstawione tu informacje zosta" + l_stroke + "y rozszerzone o ceny oraz warto" + s_ac + c_ac + " towaru. Kolorem zaznaczone s" + a_ogonek + " towary, kt" + o_ac + "rych jest za ma" + l_stroke + "o do zrealizowania zam" + o_ac + "wienia klient" + o_ac + "w."];
	texte["help_5"]=["Kalkulator zysk" + o_ac + "w","U do" + l_stroke + "u planszy jest znaczek <img src=\"" + GFX + "buildingupdatebutton_off.png\" style=\"width: 15px; height: 15px;\">. Klikni" + e_ogonek + "cie na niego otwiera tabel" + e_ogonek + " zawieraj" + a_ogonek + "c" + a_ogonek + " wyliczony czas zbior" + o_ac + "w, ilo" + s_ac + c_ac + " zdobywanych punkt" + o_ac + "w oraz przewidywane zyski. Klikni" + e_ogonek + "cie na gwiazdki zwi" + e_ogonek + "ksza poziom dla danego towaru, za" + s_ac + " na nag" + l_stroke + o_ac + "wki kolum - sortuje dane wzgl" + e_ogonek + "dem danej kolumny"];
	texte["help_6"]=["Klienci","Dymki nad klientami zosta" + l_stroke + "y rozszerzone o kalkulacj" + e_ogonek + " czy zam" + o_ac + "wienie jest op" + l_stroke + "acalne. Towary, kt" + o_ac + "rych jest za ma" + l_stroke + "o s" + a_ogonek + " oznaczone czerwon" + a_ogonek + " ramk" + a_ogonek + ".<br> Na niebieskim pasku z prawej mo" + z_dot + "esz ustali" + c_ac + " poziom op" + l_stroke + "acalno" + s_ac + c_ac + "i poni" + z_dot + "ej kt" + o_ac + "rego klienci s" + a_ogonek + " odsy" + l_stroke + "ani. <br>Tabela pozwala si" + e_ogonek + " zorientowa" + c_ac + " jakie zyski osi" + a_ogonek + "gni" + e_ogonek + "to z handlu z klientami"];
	texte["help_7"]=["Hotkeys","Mo" + z_dot + "esz szybko przenosi" + c_ac + " si" + e_ogonek + " przy u" + z_dot + "yciu klawisza <i>Alt</i>+... zobacz w Opcjach!"];
	texte["help_8"]=["Targowisko","Na targu jeste" + s_ac + " \"chroniony\", co znaczy, " + z_dot + "e nie mo" + z_dot + "esz kupi" + c_ac + " towaru dro" + z_dot + "ej ni" + z_dot + " w sklepie lub poza ustalonym w opcjach przedzia" + l_stroke + "em. Je" + s_ac + "li w" + l_stroke + a_ogonek + "czony jest 'szybki przegl" + a_ogonek + "d rynku', to mo" + z_dot + "esz przej" + s_ac + c_ac + " do wybranego towaru przez wysuwane boczne okno.<br> Z lewej u g" + o_ac + "ry s" + a_ogonek + " strza" + l_stroke + "ki pozwalaj" + a_ogonek + "ce zmienia" + c_ac + " towar oraz wy" + s_ac + "wietlana jest ilo" + s_ac + c_ac + " danego towaru.<br> Na dole za" + s_ac + " jest bardzo wa" + z_dot + "ny przycisk: CENY.<br> Zawiera on zestawienie ilo" + s_ac + "ci towar" + o_ac + "w oraz Arednich cen po jakich jest on wystawiany oraz ustalanej przez ciebie. Ceny te s" + a_ogonek + " wykorzystywane w wielu miejscach, wi" + e_ogonek + "c dbaj by by" + l_stroke + "y aktualne.\" " + S_ac + "rednia rynkowa\" jest ustalana, gdy odwiedzasz stron" + e_ogonek + " danego towaru. Na twoim straganie wy" + s_ac + "wietlane jest kilka przydatnych informacji, zapami" + e_ogonek + "tywana jest te" + z_dot + " twoja ostatnia oferta."];
	texte["help_9"]=["Wiadomo" + s_ac + "ci","Twoja sprzeda" + z_dot + " jest monitorowana i wy" + s_ac + "wietlana od razu, wi" + e_ogonek + "c nie trzeba klika" + c_ac + " dwa razy.<br> Przydatny na pewno b" + e_ogonek + "dzie przycisk \"Wszystkie przeczytane\" pozwalaj" + a_ogonek + "cy za jednym klikni" + e_ogonek + "ciem oznaczy" + c_ac + " wszystkie wiadomo" + s_ac + "ci. <br> Za" + s_ac + " przycisk \"Log\" zawiera zestawienie zapami" + e_ogonek + "tanych wiadomo" + s_ac + "ci oraz analizy sprzeda" + z_dot + "y towar" + o_ac + "w na targu. <br>Twoje wiadomo" + s_ac + "ci prywatne s" + a_ogonek + " r" + o_ac + "wnie" + z_dot + " zapami" + e_ogonek + "tywane, wi" + e_ogonek + "c znacznie " + l_stroke + "atiwej obs" + l_stroke + "uguje si" + e_ogonek + " umowy."];
	texte["help_10"]=["Umowy","S" + a_ogonek + " r" + o_ac + "wnie" + z_dot + " zapami" + e_ogonek + "tywane. Podczas tworzenia umowy w bocznym oknie wy" + s_ac + "wietlana jest wiadomo" + s_ac + c_ac + " " + z_ac + "r" + o_ac + "d" + l_stroke + "owa, aby " + l_stroke + "atwiej by" + l_stroke + "o skompletowa" + c_ac + " towar. Na bie" + z_dot + a_ogonek + "co pokazywana jest warto" + s_ac + c_ac + " wysy" + l_stroke + "anego towaru. Mo" + z_dot + "na wysy" + l_stroke + "a" + c_ac + " wiele razy t" + a_ogonek + " sam" + a_ogonek + " umow" + e_ogonek + "."];
	texte["help_11"]=["Obs" + l_stroke + "uga kont","Mo" + z_dot + "esz zapisa" + c_ac + " wszystkie swoje konta w opcjach. Pozwala to na " + l_stroke + "atwe logowanie przy pomocy przycisk" + o_ac + "w wy" + s_ac + "wietlanych na stronie startowej. Dzi" + e_ogonek + "ki temu mo" + z_dot + "esz prze" + l_stroke + a_ogonek + "cza" + c_ac + " si" + e_ogonek + " mi" + e_ogonek + "dzy kontami na tym samym serwerze."];
	// AUTOMAT
	texte["automat"] = "Automat";
	texte["automat_planting"] = "Wysiewanie...";
	texte["automat_waiting"] = "Oczekiwanie...";
	texte["automat_watering"] = "Podlewanie...";
	texte["automat_feeding"] = "Karmienie...";
	texte["automat_automatPlanting"] = "AutoZasiewy...";
	texte["automat_automatFeeding"] = "AutoKarmienie...";
	texte["automat_automatFactory"] = "AutoProdukcja...";
	texte["automat_automatWindmill"] = "AutoM" + l_stroke + "yn...";
	texte["automat_botStart"] = "Startuj Auto-Bota";
	texte["automat_botStop"] = "Zatrzymaj Auto-Bota";
	texte["automat_zonePairing"] =  L_stroke + a_ogonek + "czenie p" + o_ac + "l";
	texte["automat_debugInfo"] = "Debug Info";
	texte["automat_recoverInfo"] = "Recover Info";
	texte["automat_windmill"] ="M" + l_stroke + "yn";
	texte["automat_timing"] = "Czas";
	texte["automat_general"] =  "Og" + o_ac + "lne";
	texte["automat_development"] = "Development";
	texte["automat_msgUpdate"] = "Jest nowa wersja skryptu automatyzacji. Zainstalowa" + c_ac + "?";
	texte["automat_shouldUpdateAdviser"] = "Powiniene" + s_ac + " zaktualizowa" + c_ac + " skrypt Doradcy!<br> Inaczej Automat nie b" + e_ogonek + "dzie dzia" + l_stroke + "a" + l_stroke + " prawid" + l_stroke + "owo.";
	texte["automat_valUpdate"] = ["Aktualizacja", "Sprawdza" + c_ac + " czy jest nowsza wersja tego skryptu?"];
	texte["automat_setvalUseBot_plant"] = "Czy wy" + s_ac + "wietla" + c_ac + " ikony automatyzacji siewu?";
	texte["automat_setvalUseBot_water"] = "Czy pola maj" + a_ogonek + " by" + c_ac + " podlewane?";
	texte["automat_setvalUseBot_feed"] = "Czy wy" + s_ac + "wietla" + c_ac + " ikony automatyzacji karmienia?";
	texte["automat_setvaluseBot_foodworld"] = "U" + z_dot + "yj bota w Strefie Pikniku"; // Harry;
	texte["automat_setvaluseBot_farmi"] = "U" + z_dot + "yj bota do obs" + l_stroke + "ugi Klient" + o_ac + "w";
	texte["automat_setvaluseBot_lottery"] = "U" + z_dot + "yj bota do obs" + l_stroke + "ugi Loterii";
	texte["automat_setvaluseBot_windmill"] = "U" + z_dot + "yj bota do obs" + l_stroke + "ugi M" + l_stroke + "yna";
	texte["automat_setvalDisableCropFields"]="Blokuj zbiory na u"+s_ac+"pionych polach";
	texte["automat_settMin"] = "Minimalna zw" + l_stroke + "oka dla automatyzacji siewu";
	texte["automat_settMax"] = "Maksymalna zw" + l_stroke + "oka dla automatyzacji siewu";
	texte["automat_settMin2"] = "Minimalny czas oczekiwania mi" + e_ogonek + "dzy operacjami";
	texte["automat_settMax2"] = "Maksymalny czas oczekiwania mi" + e_ogonek + "dzy operacjami";
	texte["automat_setToDefault"] = "Przywr" + o_ac + c_ac + " domy" + s_ac + "lne";
	texte["automat_setvalSeedWaitForCrop"] ="Czekaj z zasiewem, je" + s_ac + "li do kolejnego zbioru to mniej ni" + z_dot;
	texte["automat_emergencyPlants"] = "Ro" + s_ac + "liny rezerwowe. S" + a_ogonek + " u" + z_dot + "ywane je" + s_ac + "li wymagane ro" + s_ac + "liny nie s" + a_ogonek + " dost" + e_ogonek + "pne lub si" + e_ogonek + " sko" + n_ac + "cz" + a_ogonek + ".";
	texte["automat_setvalUseQueueList"] = "U" + z_dot + "yj listy zasiew" + o_ac + "w dla p" + o_ac + "l.";
	texte["automat_set12a"] = "Usu" + n_ac + " \n listy zasiew" + o_ac + "w\n dla wszystkich p" + o_ac + "l";
	texte["automat_set12b"] = "Usuwanie zako" + n_ac + "czone.";
	texte["automat_setvalShowQueueTime"] = "Poka" + z_dot + " skalkulowany czas zbior" + o_ac + "w na li" + s_ac + "cie.";
	texte["automat_set18a"] ="Usu" + n_ac + " wszystkie listy prac dla m" + l_stroke + "yna";
	texte["automat_set18b"] = "Usuwanie zako" + n_ac + "czone";
	texte["automat_setvalPowerUpActivate"] = "Aktywuj powerupy dla produkt" + o_ac + "w";
	texte["automat_setvalLotteryActivate"] = "Automatycznie aktywuj dzienn" + a_ogonek + " loteri" + e_ogonek;
	texte["automat_setvalLotteryDailyLot"] = "Zaznacz, aby automatycznie odebra" + c_ac + " nagrod" + e_ogonek;
	texte["automat_setvalQuestActivate"] = "Aktywuj Quest automatycznie do questa:";
	texte["automat_setvalQuestSolving"] =  "Wykonaj Quest automatycznie do questa:";
	texte["automat_setvalFarmiReject"] =  "Odrzucaj klient" + o_ac + "w poni" + z_dot + "ej :";
	texte["automat_setvalFarmiAccept"] = "Akceptuj klient" + o_ac + "w powy" + z_dot + "ej:";
	texte["automat_setvalFarmiAcceptBelowMinValue"] = "Akceptuj klient" + o_ac + "w, kt" + o_ac + "rych obs" + l_stroke + "uga spowoduje spadek towaru w Regale poni" + z_dot + "ej minimum.";
	texte["automat_setvalFarmiRemoveMissing"] = "Usuwaj klient" + o_ac + "w dla kt" + o_ac + "rych brakuje towaru i z najni" + z_dot + "sz" + a_ogonek + " wydajno" + s_ac + "ci" + a_ogonek + ". Pr" + o_ac + "g:";  
	texte["automat_fields"] = "Pola";
	texte["automat_titleGeneral"] = "Lista g" + l_stroke + o_ac + "wna";;
	texte["automat_titleQueue"] = "Lista";
	texte["automat_QueCopyTextHeader"] = "Kopiuj list" + e_ogonek;
	texte["automat_QueCopyTextHeaderFrom"] = "Kopuj z:";
	texte["automat_QueCopyTextHeaderTo"] = "Kopuj do:";
	texte["automat_QueAddText"] = "Kliknij aby doda" + c_ac + " produkt do listy."; //Add product
	texte["automat_QueAddAboveText"] = "Kliknij aby doda" + c_ac + " produkt do listy przed t" + a_ogonek + " pozycj" + a_ogonek + ".";
	texte["automat_QueDeleteText"] = "Usu" + n_ac + " ten produkt z listy.";
	texte["automat_QueClose"] = "Zamknij to menu";
	texte["automat_QueCloseAll"] = "Zamknij wszystkie otwarte listy zasiew" + o_ac + "w.";
	texte["automat_QueMin"] = "Zmniejsz warto" + s_ac + c_ac;
	texte["automat_QuePlus"] = "Zwi" + e_ogonek + "ksz warto" + s_ac + c_ac;
	texte["automat_QueBehaviourF"] = "Kliknij aby przej" + s_ac + c_ac + " do trybu Rega" + l_stroke + "u";
	texte["automat_QueBehaviourR"] = "Kliknij aby przej" + s_ac + c_ac + " do trubu P" + o_ac + "l";
	texte["automat_QueUpButton"] = "W g" + o_ac + "r" + e_ogonek;
	texte["automat_QueDownButton"] = "W d" + o_ac + l_stroke;
	texte["automat_buttonTimeLine"] = "Poka" + z_dot + " linie czasowe prac";
	texte["automat_buttonOverview"] = "Poka" + z_dot + " przegl"+a_ogonek+"d automatyzacji";
	texte["automat_repeat_on"] = "Zap" + e_ogonek + "tlenie listy: TAK, kliknij aby wy" + l_stroke + a_ogonek + "czy" + c_ac + ".";
	texte["automat_repeat_off"] = "Zap" + e_ogonek + "tlenie listy: NIE, kliknij aby w" + l_stroke + a_ogonek + "czy" + c_ac + ".";
	texte["automat_shuffle_on"] = "Losowe zasiewy: TAK, kliknij aby wy" + l_stroke + a_ogonek + "czy" + c_ac + ".";
	texte["automat_shuffle_off"] = "Losowe zasiewy: NIE, kliknij aby w" + l_stroke + a_ogonek + "czy" + c_ac + ".";
	texte["automat_rotate"] = "Rotacja: przesu" + n_ac + " towary o jedn" + a_ogonek + " pozycj" + e_ogonek + " (pierwszy na koniec)";
	texte["automat_stop"] = "STOP";
	texte["automat_week"] = "tydzie" + n_ac;
	texte["automat_inftext"] = "w niesko" + n_ac + "czono" + s_ac + c_ac;
	texte["automat_removeAllWeed"] = "Usu" + n_ac + " wszystkie %AMOUNT% %PROD%<br>za szt. = %COST%<br>razem = %TCOST%";
	texte["automat_usedFarmFieldsReadyAt"] = "U"+z_dot+"yte pola gootowe o:";
	texte["automat_CloseWindowTimer"] = "Zamkni" + e_ogonek + "cie ekranu za :%1%";
	texte["automat_CloseWindowTimerClick"] = "Kliknij aby zresetowa" + c_ac + " timer!";
	//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
	texte["automat_QueDoWork"] = "Pole obs" + l_stroke + "ugiwane przez bota";
	texte["automat_QueDontWork"] = "Pole ignorowane przez bota";
	texte["automat_QueueStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie b" + e_ogonek + "dzie dalej siany.";
	texte["automat_QueStop0"] = "Proces automatycznych zasiew" + o_ac + "w zostanie zatrzymany.";
	texte["automat_QueStop1"] = "Po obsianiu %FLDFROM% pola proces automatycznych zasiew" + o_ac + "w zostanie zatrzymany.";
	texte["automat_QueStopX"] =  "Po obsianiu %FLDFROM% p" + o_ac + "l proces automatycznych zasiew" + o_ac + "w zostanie zatrzymany.";
	texte["automat_QueRepeat"] = "(Tryb powtarzania)";
	texte["automat_QueShuffle"] = "(Tryb losowy)";
	texte["automat_QueRepeatShuffle"] = "(Tryb losowy powtarzalny)";
	texte["automat_QueFieldInRow1"] = "(Nr. %FLDFROM%)";
	texte["automat_QueFieldInRowX"] = "(Nr. %FLDFROM% to %FLDTO%)";
	texte["automat_QueRoundDoneR"] = "Te pola %PRODNAME% s" + a_ogonek + " ju" + z_dot + " zagospodarowane i zostan" + a_ogonek + " pomini" + e_ogonek + "te";
	texte["automat_QueRoundDone1"] = "Na tym polu %PRODNAME% zosta" + l_stroke + " wysiany w tej turze, <br/>w kolejnej turze b" + e_ogonek + "dzie wysiany ponownie.";
	texte["automat_QueRoundDoneX"] = "Na tych polach %PRODNAME% zosta" + l_stroke + "y wysiane w tej turze, <br/>w kolejnej turze b" + e_ogonek + "d" + a_ogonek + " wysiane ponownie.";
	texte["automat_QueFieldMake"] =  "Og" + o_ac + l_stroke + "em:";
	texte["automat_QueFieldToGo"] = "Pozosta" + l_stroke + "o:";
	texte["automat_QueRoundMake"] = "W ka" + z_dot + "dej turze: ";
	texte["automat_QueRoundMade"] = "Wyprodukowano:";
	texte["automat_QueRoundToGo"] = "Pozosta" + l_stroke + "o:";
	texte["automat_QueUses"] = "U" + z_dot + "yto:";
	texte["automat_QueGives"] = "Plon:";
	texte["automat_QueFutter"] = "Zysk czasowy:";
	texte["automat_QueTimeThis"] =  "Czas produkcji:";
	texte["automat_QueTimeToGo"] =  "Pozosta" + l_stroke + "y czas wzrostu:";
	texte["automat_QueTimeReady"] = "Gotowe o:";
	texte["automat_QueTimeFirstReady"] = "Pierwsze gotowe o:"
	texte["automat_QueTimeNextReady"] = "Nast" + e_ogonek + "pne gotowe o:";
	texte["automat_QueTimeRound"] =  S_ac + "rednio na tur" + e_ogonek + ":";
	texte["automat_QueRackMode"]="(Tryb rega" + l_stroke + "u)"
 	texte["automat_recovertext"]="Paste here the code of the debug info then press the recode-button. A screen opens and select import or cancel.";
	texte["automat_queueshow"]="Kliknij aby edytowa"+ c_ac +" kolejk" + e_ogonek;
	//For the Mill
	//%PRODNAME% = product name, %FLDFROM% = field nr from, %FLDTO% = field nr until,
	texte["automat_MillQueue"] =  "Lista M" + l_stroke + "yna";
	texte["automat_MillDoWork"] ="M" + l_stroke + "yn jest obs" + l_stroke + "ugiwany automatycznie.";
	texte["automat_MillDontWork"] = "M" + l_stroke + "yn jest pomijany. Wymagana obs" + l_stroke + "uga r" + e_ogonek + "czna";
	texte["automat_MillClearAddAll"] ="Wyczy"+s_ac+c_ac+" list"+e_ogonek+" m"+l_stroke+"yna i dodaj ponownie wszystkie przepisy";     
	texte["automat_MillShuffle"] = "(Tryb losowy)";
	texte["automat_MillInRow1"] = "(Nr. %FLDFROM%)";
	texte["automat_MillInRowX"] = "(Nr. %FLDFROM% do %FLDTO%)";
	texte["automat_MillTimeTotal"] = "Ca" + l_stroke + "kowity czas tworzenia:";
	texte["automat_MillTimeReady"] = "Gotowe:";
	texte["automat_MillStoped"] = "Wykryto wstrzymanie produkcji. %PRODNAME% nie b" + e_ogonek + "dzie dalej tworzony.";
	texte["automat_MillStop0"] = "Proces automatycznych wypiek" + o_ac + "w zostanie zatrzymany.";
	texte["automat_MillStop1"] =  "Po wykonaniu %FLDFROM% przepisu proces automatycznych wypiek" + o_ac + "w zostanie zatrzymany.";
	texte["automat_MillStopX"] = "Po wykonaniu %FLDFROM% przepis" + o_ac + "w proces automatycznych wypiek" + o_ac + "w zostanie zatrzymany.";
	try{
		texte["automat_MillTimeThis"] = top.window.wrappedJSObject.windmill_bakeingtime;
		texte["automat_MillPowerUpText_0"] = top.window.wrappedJSObject.powerup_bonustext1;
		texte["automat_MillPowerUpText_1"] = top.window.wrappedJSObject.powerup_bonustext2;
		texte["automat_MillPowerUpText_2"] = top.window.wrappedJSObject.powerup_bonustext3;
		texte["automat_MillIngredients"] = top.window.wrappedJSObject.windmill_zutaten;
	}catch(err){GM_log("Mill from game missing \n"+err);}
	texte["automat_number"] ="Numer";
	texte["automat_lack"] = "Brak";
	texte["automat_MillRecipesBought"] = "Ilo" + s_ac + c_ac + " wypiek" + o_ac + "w og" + o_ac + l_stroke + "em: ";
	texte["automat_MillRecipesUsed"] = "U" + z_dot + "yto og" + o_ac + l_stroke + "em przepis" + o_ac + "w: ";
	texte["automat_MillRecipesBake"] ="Max przepis" + o_ac + "w do zrobienia: ";
	//title
	texte["automat_title_on_general"] = "Poka" + z_dot + " tylko List" + e_ogonek + " G" + l_stroke + o_ac + "wn" + a_ogonek + "<br>+Ctrl: Poka" + z_dot + " Liste G" + l_stroke + o_ac + "wn" + a_ogonek;
	texte["automat_title_off_general"] = "Poka" + z_dot + " tylko List" + e_ogonek + " G" + l_stroke + o_ac + "wn" + a_ogonek + "<br>+Ctrl: Schowaj Liste G" + l_stroke + o_ac + "wn" + a_ogonek;
	texte["automat_title_on_farm1"] = "Poka" + z_dot + " tylko pierwsz" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Poka" + z_dot + " pierwsz" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_off_farm1"] = "Poka" + z_dot + " tylko pierwsz" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Schowaj pierwsz" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_on_farm2"] = "Poka" + z_dot + " tylko drug" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Poka" + z_dot + " drug" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_off_farm2"] = "Poka" + z_dot + " tylko drug" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Schowaj drug" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_on_farm3"] = "Poka" + z_dot + " tylko trzeci" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Poka" + z_dot + " trzeci" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_off_farm3"] = "Poka" + z_dot + " tylko trzeci" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Schowaj trzeci" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_on_farm4"] = "Poka" + z_dot + " tylko czwart" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Poka" + z_dot + " czwart" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_off_farm4"] = "Poka" + z_dot + " tylko czwart" + a_ogonek + " farm" + e_ogonek + "<br>+Ctrl: Schowaj czwart" + a_ogonek + " farm" + e_ogonek;
	texte["automat_title_on_windmill"] = "Poka" + z_dot + " tylko m" + l_stroke + "yn<br>+Ctrl: Poka" + z_dot + " m" + l_stroke + "yn";
	texte["automat_title_off_windmill"] = "Poka" + z_dot + " tylko m" + l_stroke + "yn<br>+Ctrl: Schowaj m" + l_stroke + "yn";
	texte["automat_title_on_forestry"] = "Poka" + z_dot + " tylko las<br>+Ctrl: Poka" + z_dot + " las";
	texte["automat_title_off_forestry"] = "Poka" + z_dot + " tylko las<br>+Ctrl: Schowaj las";
	texte["automat_title_on_foodworld"] = "Poka" + z_dot + " tylko piknik<br>+Ctrl: Poka" + z_dot + " piknik";
	texte["automat_title_off_foodworld"] = "Poka" + z_dot + " tylko piknik<br>+Ctrl: Schowaj piknik";
	texte["automat_title_on_type1"] ="Poka" + z_dot + " tylko pola<br>+Ctrl: Poka" + z_dot + " pola";  
	texte["automat_title_off_type1"] = "Poka" + z_dot + " tylko pola<br>+Ctrl: Schowaj pola";  
	texte["automat_title_on_type2"] = "Poka" + z_dot + " tylko zagrody<br>+Ctrl: Poka" + z_dot + " zagrody";  
	texte["automat_title_off_type2"] = "Poka" + z_dot + " tylko zagrody<br>+Ctrl: Schowaj zagrody";  
	texte["automat_title_on_type3"] = "Poka"+z_dot+" tylko wytw"+o_ac+"rnie<br>+Ctrl: Poka"+z_dot+" wytw"+o_ac+"rnie";   
	texte["automat_title_off_type3"] = "Poka"+z_dot+" tylko wytw"+o_ac+"rnie<br>+Ctrl: Schowaj wytw"+o_ac+"rnie";
	texte["automat_title_on_all"] ="Poka" + z_dot + " listy dla wszystkich farm";
	texte["automat_title_off_all"] =  "Ukryj listy dla wszystkich farm";
	//help
	texte["automat_help_0"] = [, "Ten skrypt s" + l_stroke + "u" + z_dot + "y do automatyzacji produkcji na farmie."];
	texte["automat_help_1"] = ["Jak to dzia" + l_stroke + "a?", "Je" + s_ac + "li klikniesz na dole przycisk '" + texte["automat"]["botStart"] + "' rozpocznie si" + e_ogonek + " proces automatyzacji.<br>Mo" + z_dot + "esz kontynuowa" + c_ac + " gr" + e_ogonek + " samemu dop" + o_ac + "ki nic nie b" + e_ogonek + "dzie gotowe. W" + o_ac + "wczas bot rozpocznie symulacj" + e_ogonek + " klini" + e_ogonek + c_ac + " za u" + z_dot + "ytkownika. Podczas tego procesu nie powiniene" + s_ac + " przeszkadza" + c_ac + " automatowi."];
	texte["automat_help_2"] = ["Pole", "U do" + l_stroke + "u ka" + z_dot + "dego pola wy" + s_ac + "wietlana jest ikona. Je" + s_ac + "li ikona pokazuje <div class = \"kp" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub b" + e_ogonek + "dzie zatrzymany po zako" + n_ac + "czeniu bie" + z_dot + a_ogonek + "cych operacji. Na tym polu nie b" + e_ogonek + "dzie nic siane ani produkowane do momentu wybrania innej opcji. Je" + s_ac + "li wybrana jest ikona produktu to b" + e_ogonek + "dzie on wysiewany/produkowany w nast" + e_ogonek + "pnej kolejno" + s_ac + "ci."];
	texte["automat_help_3"] = ["Plan zasiew" + o_ac + "w", "Je" + s_ac + "li w opcjach zaznaczona jest lista zasiew" + o_ac + "w, klikni" + e_ogonek + "cie na ikon" + e_ogonek + " ro" + s_ac + "liny na wybranym polu wy" + s_ac + "wietla list" + e_ogonek + " produkt" + o_ac + "w, kt" + o_ac + "re mog" + a_ogonek + " by" + c_ac + " uprawiane. Je" + s_ac + "li t" + l_stroke + "o danej pozycji na li" + s_ac + "cie jest czerwone, to znaczy, " + z_dot + "e do listy zosta" + l_stroke + "a dodana ikona zatrzymania produkcji gdzie" + s_ac + " przed t" + a_ogonek + " pozycj" + a_ogonek + "."];
	texte["automat_help_4"] = ["Zap" + e_ogonek + "tlenie", "Ikona \"Zap" + e_ogonek + "tlenie listy\" oznacza, " + z_dot + "e po w" + l_stroke + a_ogonek + "czeniu zasiewy b" + e_ogonek + "d" + a_ogonek + " realizowane \"w p" + e_ogonek + "tli\" tj. po ostatnim zostanie wysiany pierwszy i tak w k" + o_ac + l_stroke + "ko."];
	texte["automat_help_5"] = ["Losowe zasiewy", "W" + l_stroke + a_ogonek + "czenie opcji \"Losowe zasiewy\" spowoduje, " + z_dot + "e do uprawy b" + e_ogonek + "d" + a_ogonek + " wybierane losowo pozycje z listy."];
	texte["automat_help_6"] = ["Zagrody", "Na dole ka" + z_dot + "dej zagrody wy" + s_ac + "wietlana jest ikona. Je" + s_ac + "li pokazuje </div>" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub b" + e_ogonek + "dzie zatrzymany po zako" + n_ac + "czeniu bie" + z_dot + a_ogonek + "cych operacji. Je" + s_ac + "li wy" + s_ac + "wietlany jest produkt, to b" + e_ogonek + "dzie on u" + z_dot + "ywany w zagrodzie. Po klikni" + e_ogonek + "ciu na ikon" + e_ogonek + " mo" + z_dot + "na zmieni" + c_ac + " produkt oraz ilo" + s_ac + c_ac + " jaka b" + e_ogonek + "dzie u" + z_dot + "yta do karmienia. Klikni" + e_ogonek + "cie na ikon" + e_ogonek + " pozwala ustawi" + c_ac + " ilo" + s_ac + c_ac + " karmy za pomoc" + a_ogonek + " suwaka lub zmieni" + c_ac + " rodzaj karmy."];
	texte["automat_help_7"] = ["Przetw" + o_ac + "rnie", "Na dole ka" + z_dot + "dej przetw" + o_ac + "rni r" + o_ac + "wnie" + z_dot + " jest ikona i podobnie jak w przypadku p" + o_ac + "l czy zagr" + o_ac + "d wy" + s_ac + "wietlenie <div class = \"kp" + PRODSTOP + "\" style = \"display:inline-block;\">&nbsp;</div> to proces automatyzacji jest zatrzymany lub b" + e_ogonek + "dzie zatrzymany po zako" + n_ac + "czeniu bie" + z_dot + a_ogonek + "cych operacji. Wy" + s_ac + "wietlana inna ikona informuje co jest produkowane obecnie."];
	texte["automat_help_8"] = [texte["automat_zonePairing"],"W opcji \"" + texte["automat"]["zonePairing"] + "\" znaczniki pozwalaj" + a_ogonek + " ustali" + c_ac + ", kt" + o_ac + "re pola wchodz" + a_ogonek + " w sk" + l_stroke + "ad danej listy zasiew" + o_ac + "w, co wed" + l_stroke + "ug niej b" + e_ogonek + "dzie wysiewane oraz doda" + c_ac + " dodatkowe listy zasiew" + o_ac + "w."];
	texte["automat_help_9"] = ["M" + l_stroke + "yn", "Lista prodkucji dla m" + l_stroke + "yna dzia" + l_stroke + "a podobnie jak lista zasiew" + o_ac + "w tylko, " + z_dot + "e tu wyrabiane s" + a_ogonek + " przepisy.<br> Lista produkcji dla m" + l_stroke + "yna posiada dodatkowy przycisk <div class = \"queueButtonAddAll\">&nbsp;</div>, kt" + o_ac + "ry mo" + z_dot + "e by" + c_ac + " wykorzystany do wyczyszczenia bie" + z_dot + "cej listy i utworzenia nowej na podstawie zakupionych przepis" + o_ac + "w oraz ilo" + s_ac + "ci produkt" + o_ac + "w w regale. Je" + s_ac + "li lista pod" + s_ac + "wietlona jest na " + z_dot + o_ac + l_stroke + "to to znaczy, " + z_dot + "e jest za ma" + l_stroke + "o surowc" + o_ac + "w do produkcji wszystkich przepis" + o_ac + "w.<br><br><b>Uwaga: </b>Przed pierwszym u" + z_dot + "yciem, je" + s_ac + "li ju" + z_dot + " zakupili" + s_ac + "my, przepisy konieczna jest wizyta u handlarki lub m" + l_stroke + "ynarza, aby automat wczyta" + l_stroke + " zakupione przepisy."];
	
	// Do not edit
	if(!top.window.wrappedJSObject.greaseMonkeyData){ top.window.wrappedJSObject.greaseMonkeyData=new Object(); }
	top.unsafeData = top.window.wrappedJSObject.greaseMonkeyData;
/*
function compareObjectsExistance(obj1,obj2,pre){
	try{
		if(typeof(pre)=="undefined") pre="";
		for(i in obj1){
			if(!obj1.hasOwnProperty(i)){ continue; }
			if(typeof obj2[i] == "undefined"){
				GM_log("miss in 2: "+pre+i);
			}else{
				if(typeof obj1[i] == "object"){
					compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
				}
			}
		}
		for(i in obj2){
			if(!obj2.hasOwnProperty(i)){ continue; }
			if(typeof obj1[i] == "undefined"){
				GM_log("miss in 1: "+pre+i);
			}else{
				if(typeof obj2[i] == "object"){
					compareObjectsExistance(obj1[i],obj2[i],pre+i+" : ");
				}
			}
		}
	}catch(err){ GM_log("ERROR compareObjectsExistance\n"+err); }
}
window.setTimeout(function(){
	GM_log("START COMPARING");
	compareObjectsExistance(texte,top.unsafeData.texte);
	GM_log("END COMPARING");
},1000);
*/	
	top.unsafeData.texte=new Object();
	top.unsafeData.texte[LANGUAGE]=texte;
	top.unsafeData.LANGUAGE=LANGUAGE;
	top.unsafeData.COUNTRY=COUNTRY;
	top.unsafeData.delimThou=delimThou;
	top.unsafeData.regDelimThou=regDelimThou;
	top.unsafeData.regDelimThouShift=regDelimThouShift;
	top.unsafeData.regDelimThouDelete=regDelimThouDelete;
	top.unsafeData.delimDeci=delimDeci;
	top.unsafeData.regDelimDeci=regDelimDeci;
	top.unsafeData.dateFormatDM=dateFormatDM;
	top.unsafeData.dateFormatDMY=dateFormatDMY;
}catch(err){ GM_log("ERROR\npage="+location.href+"\n"+err); }
},false);
