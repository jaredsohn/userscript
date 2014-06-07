// ==UserScript==
// @name           Travianer-Plus
// @namespace      http://
// @author         Leonardo I
// @version        4.0
// @description    Un sistema a schermata di plus per travianer/i e molto altro...
// @copyright      2009-2010 Leonardo I All Rights Reserved
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://*traviani.it/game.php*
// @include        http://*travianer.*/game.php*
// @include        http://*travians.*/game.php*
// @exclude        *game.php?action=merchant&mode=weapon
// @exclude        *game.php?action=merchant&mode=armor
// ==/UserScript==

/*
Questo script possiede un copyright
e perciò la modifica è riservata alle persone delegate.
Se avete idee o lamentele utilizzare l'apposita
funzione nella barra stessa.
Ridistribuire questo script modificando
solamente i dati di distribuzione è vietato!!!
*/

// Inserire comandi per userscript
GM_registerMenuCommand("Reset Travianer Plus", resetTP);
GM_registerMenuCommand("Change Username Travianer Plus", changeusernamepront);

// sistemazioni e "abbellimenti"
document.getElementById('gameWrapper').style.height = '500px';
document.getElementById('gameWrapper').style.width = '1270px';


// variabili sui dati
datiscript = new Array();
datiscript["nome"]="Travianer-Plus";
datiscript["versione"]="4.0";
datiscript["autore"]="Leonardo I";

// Controllo variabili essenziali
var travianer_domain = location.hostname;

var user=GM_getValue("user");
var menut=GM_getValue("menut");
var menul=GM_getValue("menul");
var notet=GM_getValue("notet");
var notel=GM_getValue("notel");
var displaylogo=GM_getValue("displaylogo");
var goldimg=GM_getValue("goldimg");
var setling=GM_getValue("setling");
var visualizza_note=GM_getValue("visualizza_note");
var attavvisi=GM_getValue("attavvisi");
if (goldimg==null) { goldimg = 's'; GM_setValue("goldimg", goldimg); }
if (menut==null) { menut = '270'; GM_setValue("menut", menut); }
if (menul==null) { menul = '853'; GM_setValue("menul", menul); }
if (notet==null) { notet = '18px'; GM_setValue("notet", notet); }
if (notel==null) { notel = '0px'; GM_setValue("notel", notel); }
if (displaylogo==null) { displaylogo = ''; GM_setValue("displaylogo", displaylogo); }
if (setling == null) { setling = "it"; GM_setValue("setling", setling); alert("Lingua di defaul: italiano\nDefaul languages: italian\n\nYou can change from the control panel"); }
if (visualizza_note == null) { visualizza_note = 'true'; GM_setValue("visualizza_note", visualizza_note); }
if (attavvisi == null) { attavvisi = 'n'; GM_setValue("attavvisi", attavvisi); }

if (user==null) setvariabili();

function setvariabili(mess)
{
	if (mess) alert("Nome non valido!!! Ripetere l'operazione");
    user=prompt("Inserisci il tuo nome utente, oppure un nickname a tua scelta, aiuterai il traviner-plus; I tuoi dati non saranno visualizzati da nessun altro al di fuori del sottoscritto",GM_getValue("user"));
	if (user == 'undefined' || user == '' || user == null || user ==  'a' || user == '.' || user == 'z') {
	setvariabili(true);
	}else{
    GM_setValue("user", user);
    adduser();
	}
}

// Figure gold
if (goldimg == 's') {
document.getElementById('interfaceDiv1').innerHTML = document.getElementById('interfaceDiv1').innerHTML.replace("img/interface_top.gif","img/gold/interface_top.gif");
$id('interfaceDiv4').src = 'img/gold/interface_bottom1.gif';
$id('interfaceDiv5').src = 'img/gold/interface_bottom2.gif';
document.getElementById('resourceTabBackground').src = "img/gold/interface_right_top_res.gif";
document.getElementById('minimapTab').innerHTML = document.getElementById('minimapTab').innerHTML.replace('img/interface_right_top_map.gif','img/gold/interface_right_top_map.gif');
}

/**************Lingue**************/
var ling=new Array();

///////// it /////////
ling["it"]=new Array();
ling["it"]["title"] = "Traviani • Travianer-Plus";
//start
ling["it"]["vers1"] = "Aggiornamento script";
ling["it"]["vers2"] = "La tua versione &egrave;: ";
ling["it"]["vers3"] = "Ultima versione disponibile: ";
ling["it"]["tt"] = "Traviantrucchi.org &egrave; il miglior sito che si occupa dei giochi della TravianGames in italia ed &egrave; pronto ad accogliere ogni vostro bisogno.";
ling["it"]["support"] = "(Tutto ci&ograve; di cui avete bisogno)";
ling["it"]["newsbar1"] = "Benvenuto "+user+"!!!";
ling["it"]["newsbar2"] = "Clicca per aprire le news";
ling["it"]["off"] = "Spegni lo script";
ling["it"]["contr"] = "Pann. di Controllo";
ling["it"]["about"] = "About Travianer-Plus";
// Barra principale
ling["it"]["dpoz"] = "Pozioni a distanza";
ling["it"]["dtas"] = "Pagare le Tasse";
ling["it"]["dpes"] = "Cucinare pesci a distanza";
ling["it"]["dfun"] = "Cucinare Funghi a distanza";
ling["it"]["dcar"] = "Comprare carta pregiata a distanza";
ling["it"]["dcor"] = "Comprare corone onore";
ling["it"]["sitt"] = "Immettere il Sitter";
ling["it"]["ddon"] = "Donare alla Gilda";
ling["it"]["amic"] = "Lista degli Amici";
ling["it"]["game"] = "Sommario giochi";
ling["it"]["datt"] = "Comprare Attrezzi";
ling["it"]["mess"] = "Seleziona tutti i mess per cancellarli | Devi aver aperata la casella di posta e non funziona la deselezione";
ling["it"]["on/f"] = "F&agrave; apparire o sparire la barra dei men&ugrave;";
ling["it"]["velc1"] = "Avvia la super velocit&agrave; in gioco";
ling["it"]["velc2"] = "(Per disattivare premere F5)";
ling["it"]["chat"] = "Travianer-Plus chat";
ling["it"]["user"] = "Gli utenti di Travianer Plus";
// Barra dei menu
ling["it"]["dest"] = "Destinazioni";
ling["it"]["NPG"] = "NPG";
ling["it"]["taverne"] = "Taverne";
ling["it"]["mergioc"] = "Mercato Giocatori";
ling["it"]["linku"] = "Link utili";
ling["it"]["bingo"] = "Il bingo";
ling["it"]["estrrisorse"] = "Punti di estrazione delle risorse";
ling["it"]["automatizzazione"] = "Automatizzazione delle risorse";
// Contatore
ling["it"]["cont"] = "Contatore";
// Minichat
ling["it"]["tpchat"] = "Travianer-Plus chat";
// Pann. di controllo
ling["it"]["pctitle"] = "Pannello di controllo";
ling["it"]["chiudipc"] = "Chiudi Pannello di controllo";
ling["it"]["pch1"] = "Benvenuti nel Pannello di controllo utente";
ling["it"]["pcusername"] = "Nome Utente:";
ling["it"]["pcdonon"] = "Abilita la funzione \"Avviso donazione\"";
ling["it"]["pcdoninfo"] = "Questa funzione sperimentale ma del tutto sicura ti avvisa che in un determinato giorno devi donare alla tua gilda un tot di stelline e un tot si risorse, in questo modo non te lo dimenticherai";
ling["it"]["pccor1"] = "Se sei coraggioso clicca ";
ling["it"]["pccor2"] = "qui";
ling["it"]["pccor3"] = " per modificare il testo";
ling["it"]["pcabi"] = "Abilita";
ling["it"]["pcdis"] = "Disabilita";
ling["it"]["pcavv"] = "Avvisa sempre di";
ling["it"]["pcdayimpo"] = "Impostato di:";
ling["it"]["pcris"] = "Risorse:";
ling["it"]["pclogo"] = "Visualizzare il logo di Travianer-Plus?";
ling["it"]["pcvis"] = "Visualizza";
ling["it"]["pcnvis"] = "Non visualizzare";
ling["it"]["pcmenu1"] = "Modifica la posizione";
ling["it"]["pcmenu2"] = "del menu di destra";
ling["it"]["pcmenu3"] = "(Valori in px)";
ling["it"]["pcmessch"] = "Modifica il messaggio di visualizzazione:";
ling["it"]["pcmesstitle"] = "Modifica il testo";
ling["it"]["pcimg"] = "Cambiare le immagini per farle assomigliare al club gold?";
ling["it"]["pcimgon"] = "Abilita";
ling["it"]["pcimgoff"] = "Disabilita";
ling["it"]["pclingtitle"] = "Selezione lingua";
ling["it"]["pchelpling"] = "Aiutaci a tradurre";
ling["it"]["save"] = "Salvato...";
ling["it"]["pcnote"] = "Visualizzare il block note?";
// Destinazioni (solo nomi comuni es casa propria o gilda)
ling["it"]["desttitle"] = "Destinazioni";
ling["it"]["desthelp"] = "&Egrave; sconsigliato andare nelle zone non ancora esplorate del gioco potreste rimanervi inastarti e verrete bannati.";
ling["it"]["destvel"] = "Super Velocit&agrave;";
ling["it"]["desthome"] = "Propria Casa";
ling["it"]["destarena"] = "Arena";
ling["it"]["destmerc"] = "Mercato";
ling["it"]["desterbe"] = "Raccolta Erbe";
ling["it"]["destfung"] = "Raccolta Funghi";
ling["it"]["destimp"] = "Ufficio delle imposte";
ling["it"]["destprec"] = "Fabro di precisione";
ling["it"]["desttes"] = "Ricerca Tesori";
ling["it"]["destgilda"] = "Propria Gilda";
ling["it"]["destteut"] = "Confine zona teutonica";
ling["it"]["destrom"] = "Confine mare romano";
ling["it"]["destgal"] = "Confine zona gallica";
ling["it"]["destproi"] = "Zona proibita";
ling["it"]["destlab"] = "Labirinto";
// NPG
ling["it"]["npgtitle"] = "NPG";
ling["it"]["npgsubitle"] = "&Egrave; sconsigliato andare dagli NPG non ancora esplorati del gioco potreste rimanervi inastarti e verrete bannati. ";
ling["it"]["npgblog"] = "Blog sugli NPG";
ling["it"]["npgauto1"] = "Combatti con il prossimo NPC";
ling["it"]["npgauto2"] = "Avvi direttamente il combattimento con il tuo NPG disponibile";
ling["it"]["npgauto3"] = "Non preoccuparti se graficamente &egrave; lo stesso, in realtÃ  &egrave; come se combattessi sempre con uno nuovo ;)";
ling["it"]["npg1"] = "Cartello Gilde";
ling["it"]["npg2"] = "Cartello Case";
ling["it"]["npg3"] = "Vicino a Matrica";
ling["it"]["npg4"] = "Al ponte per la Teutonia";
ling["it"]["npg5"] = "Alla Palude";
ling["it"]["npg6"] = "A dx di Karamix";
ling["it"]["npg7"] = "Al 2 punto di estrazione del Ferro";
ling["it"]["npg8"] = "Vicino ad Aurora";
ling["it"]["npg9"] = "Vicino al Tempio";
ling["it"]["npg0"] = "Al 2 punto di estrazione dei Mattoni";
// Taverne
ling["it"]["tavtitile"] = "Taverne";
ling["it"]["tavhelp"] = "&Egrave; sconsigliato andare nelle taverne non ancora esplorate del gioco potreste rimanervi inastarti e verrete bannati. ";
ling["it"]["tav1"] = "Taverna di Stan: MARTEDI caff�,il GIOVEDI oggetti";
ling["it"]["tav2"] = "Taverna di Senkel";
ling["it"]["tav3"] = "Taverna alla frontiera teutonica";
ling["it"]["tav4"] = "Taverna Vicino a karamix";
ling["it"]["tav5"] = "Taverna Vicino alla zona gallica";
ling["it"]["tav6"] = "Taverna Vicino alle rovine di torre";
ling["it"]["tav7"] = "Taverna Romana Sconsigliata";
// Mercato
ling["it"]["merctitle"] = "Mercato giocatori avanzato";
ling["it"]["mercric"] = "Ricevente:";
ling["it"]["mercquant"] = "Quantità:";
ling["it"]["mercris"] = "Risorsa:";
ling["it"]["mercper"] = "Moltiplicare per:";
ling["it"]["mercprez"] = "Prezzo:";
ling["it"]["mercinfo"] = "Per negoziare con uno specifico giocatore inserite il nome del ricevente e compilate di conseguenza, altrimenti premete vai al mercato, attendete che il traviano si fermi nel posto giusto e compilate lasciando bianco il ricevitore. Nel campo &quot;moltiplicate per:&quot; dovente inserire la X, ovvero se avete 54 di grano compilate quantit&agrave; 1 e molt. per 54 e vedrete nel mercato 1 (X54), ovvero li avete offerti tutti.";
//ling["it"]["mercatt1"] = "Attenzione!!!";
//ling["it"]["mercatt2"] = "Non preoccupatevi se il form (i campi da compilare) rimangono scritti, controllate solo che le risorse siano state scalate dal vostro magazzino.";
ling["it"]["mercvis"] = "Visualizza Offerte del Mercato";
ling["it"]["mercprop"] = "Proprie Offerte";
ling["it"]["gomerc"] = "Vai al Mercato";
ling["it"]["setResourcesMaga"] = "Seleziona la risorsa e clicca qui per mettere in vendita tutte quell epresenti nel magazzino";
// Link utili
ling["it"]["linktitle"] = "Link Utili";
ling["it"]["linkI"] = "Quest I Generazione";
ling["it"]["linkII"] = "Quest II Generazione";
ling["it"]["linkIII"] = "Quest III Generazione";
ling["it"]["linkpoz"] = "Istruzioni sulle pozioni";
ling["it"]["linkgraf"] = "Grafiche";
ling["it"]["linklet"] = "Categoria Letti";
ling["it"]["linkdiario"] = "Diario delle Quest";
ling["it"]["linkmappa"] = "Mappa Completa";
ling["it"]["linkamici"] = "Lista degli Amici";
ling["it"]["linktasse"] = "Pagare le Tasse";
ling["it"]["linkpes"] = "Cucinare pesci a distanza";
ling["it"]["linkfung"] = "Cucinare Funghi a distanza";
ling["it"]["linkcarta"] = "Comprare carta pregiata a distanza";
ling["it"]["linkonore"] = "Comprare corone onore";
ling["it"]["linksitt"] = "Immettere il Sitter";
ling["it"]["linkgild"] = "Donare alla Gilda";
ling["it"]["linkgiochi"] = "Sommario giochi";
ling["it"]["linkattrezzi"] = "Comprare Attrezzi";
// Bingo
ling["it"]["bingotitle"] = "Il bingo";
ling["it"]["bingoinfo"] = "Eccovi il gioco del bingo cliccate su Avere una scheda del bingo per averne una verificate nell inventario ogni giorno fate una partita a sudokiss e alla scelta delle dame e controllate se viene cancellata una casella se e cosi e uno dei vostri giorni fortunati quando tutte le caselle saranno cancellate cliccate su BINGO e avrete un premio";
ling["it"]["bingoscheda"] = "Avere una scheda del bingo";
ling["it"]["bingobingo"] = "In caso di bingo";
ling["it"]["bingosud"] = "Giocare a sudokiss";
ling["it"]["bingodame"] = "Giocare alla scelta delle dame";
ling["it"]["bingoring1"] = "Ringraziamo grandemente XxcoralloxX per il suo sistema di bingo a distanza, Grazie mille Corallo!!!";
ling["it"]["bingoring2"] = "se avete lamentele quindi fatele a lui ;) xD";
// Estrazione
ling["it"]["estrtitle"] = "Punti di estrazione";
ling["it"]["estr1"] = "1&deg; punti di estrazione delle risorse (villaggio)";
ling["it"]["estr2"] = "2&deg; punti di estrazione delle risorse";
// Autoestrazione
ling["it"]["autotitle"] = "Automatizzazione";
ling["it"]["autoavv"] = "&Egrave; vivamente sconsigliato programmare azioni che non potete fare.";
ling["it"]["autowork"] = "Stiamo estrando";
ling["it"]["autoestr"] = "Estrai automaticamente";
ling["it"]["autotes"] = "Rastrella la mappa dei tesori, sono necessari 47 min e 5 sec";
ling["it"]["autores"] = "Estrazione automatica risorse";
ling["it"]["autoaltre"] = "Altre estrazioni automatiche";
ling["it"]["autotesstart"] = "Per i tesori, cominciare dalla casella n°";
ling["it"]["autodo"] = "Stiamo eseguendo...";
ling["it"]["autoinfo"] = "Prima di cliccare una risorsa inserisci il valore di ripetizione!!!!";
ling["it"]["autoimpo"] = "Impostazioni";
ling["it"]["autonum"] = "Quante volte devo eseguire?";
ling["it"]["autopref"] = "Preferenze (settare prima di avviare)";
ling["it"]["checkmp"] = "Controllare se possiedi AP/MP";
ling["it"]["checkmaga"] = "Controllare il magazzino";
ling["it"]["checkeat"] = "Controllare la fame";
ling["it"]["checkbath"] = "Controllare la pulizia";
ling["it"]["checkfun"] = "Controllare il divertimento";
ling["it"]["checksleepy"] = "Controllare il sonno";
// Copyright
ling["it"]["copyby"] = "Travianer Plus creato da";
ling["it"]["copywith"] = "con il supporto di";
ling["it"]["copygood"] = "Buon utilizzo di Traviani e di Travianer Plus!!!!!";
// News
ling["it"]["loadinnews"] = "Carimento news...";
ling["it"]["newstp"] = "Travianer Plus news";
ling["it"]["newsgame"] = "News sul gioco";
ling["it"]["newsextra"] = "News extra";
// Days
var day=new Array();
day["it"] = new Array();
day["it"][0]="Domenica";
day["it"][1]="Lunedì";
day["it"][2]="Martedì";
day["it"][3]="Mercoledì";
day["it"][4]="Giovedì";
day["it"][5]="Venerdì";
day["it"][6]="Sabato";
// Risorse e monete
ling["it"]["legno"] = "Legno";
ling["it"]["argilla"] = "Argilla";
ling["it"]["minerale"] = "Minerale";
ling["it"]["grano"] = "Grano";
ling["it"]["farina"] = "Farina";
ling["it"]["carbone"] = "Carbone";
ling["it"]["assi"] = "Assi di legno";
ling["it"]["mattoni"] = "Mattoni";
ling["it"]["ferro"] = "Ferro";
ling["it"]["pane"] = "Pane";
ling["it"]["erbe"] = "Erbe";
ling["it"]["funghi"] = "Funghi";
ling["it"]["tesori"] = "Tesori";
ling["it"]["prim"] = "Risorse Primarie";
ling["it"]["second"] = "Risorse Secondarie";
ling["it"]["bronzo"] = "Monete di bronzo";
ling["it"]["argento"] = "Monete d'argento";
ling["it"]["oro"] = "Monete d'oro";




///////// en /////////
ling["en"]=new Array();
ling["en"]["title"] = "Travians • Travianer-Plus";
//start
ling["en"]["vers1"] = "Updating script";
ling["en"]["vers2"] = "Your version is: ";
ling["en"]["vers3"] = "Latest version available: ";
ling["en"]["tt"] = "Traviantrucchi.org; the best site that deals with games TravianGames in Italy and is ready to accommodate your every need.";
ling["en"]["support"] = "(everithing you need)";
ling["en"]["newsbar1"] = "Welcome "+user+"!!!";
ling["en"]["newsbar2"] = "Click for open the news";
ling["en"]["off"] = "Turn off the script";
ling["en"]["contr"] = "Control panel";
ling["en"]["about"] = "About Travianer-Plus";
// Barra principale
ling["en"]["dpoz"] = "Potions at distance";
ling["en"]["dtas"] = "Pay tax";
ling["en"]["dpes"] = "Cooking fish at distance";
ling["en"]["dfun"] = "Cooking mushrooms at distance";
ling["en"]["dcar"] = "Buy valuable paper at distance";
ling["en"]["dcor"] = "Buy honour coronals";
ling["en"]["sitt"] = "send in sitter";
ling["en"]["ddon"] = "Donate to guild";
ling["en"]["amic"] = "friend list";
ling["en"]["game"] = "Games";
ling["en"]["datt"] = "Buy tools";
ling["en"]["mess"] = "Select all message to delete | You must have open the messages, deselections does not work";
ling["en"]["on/f"] = "On/Off men&ugrave";
ling["en"]["velc1"] = "Start overspeed";
ling["en"]["velc2"] = "(To deactivate push F5)";
ling["en"]["chat"] = "Travianer-Plus chat";
ling["en"]["user"] = " Travianer Plus users";
// Barra dei menu
ling["en"]["dest"] = "Destinations";
ling["en"]["NPG"] = "NPG";
ling["en"]["taverne"] = "Taverns";
ling["en"]["mergioc"] = "Player market";
ling["en"]["linku"] = "Useful link";
ling["en"]["bingo"] = "Bingo";
ling["en"]["estrrisorse"] = "Points of resource extraction";
ling["en"]["automatizzazione"] = "Automation resources";
// Contatore
ling["en"]["cont"] = "Counter";
// Minichat
ling["en"]["tpchat"] = "Travianer-Plus chat";
// Control panel
ling["en"]["pctitle"] = "Control panel";
ling["en"]["chiudipc"] = "Close control panel";
ling["en"]["pch1"] = "Welcome to user control panel";
ling["en"]["pcusername"] = "Username:";
ling["en"]["pcdonon"] = "Enable the function \"View donations\"";
ling["en"]["pcdoninfo"] = "This experimental feature, but en safely will remind you that on any given day you have to give your guild a certain number of stars and a bunch are resources, so do not you forget";
ling["en"]["pccor1"] = "If you're corageous click";
ling["en"]["pccor2"] = "here";
ling["en"]["pccor3"] = " to change the text";
ling["en"]["pcabi"] = "Enable";
ling["en"]["pcdis"] = "Disabl";
ling["en"]["pcavv"] = "Always ask for";
ling["en"]["pcdayimpo"] = "Set of:";
ling["en"]["pcris"] = "Resources:";
ling["en"]["pclogo"] = "Visualize travianer-plus logo?";
ling["en"]["pcvis"] = "Visualize";
ling["en"]["pcnvis"] = "Don't visualize";
ling["en"]["pcmenu1"] = "Change posenions";
ling["en"]["pcmenu2"] = "of right men&ugrave";
ling["en"]["pcmenu3"] = "(Values in px)";
ling["en"]["pcmessch"] = "Eden the display message:";
ling["en"]["pcmesstitle"] = "Change text";
ling["en"]["pcimg"] = "Change pictures like them the gold club?";
ling["en"]["pcimgon"] = "Enable";
ling["en"]["pcimgoff"] = "Disable";
ling["en"]["pclingtitle"] = "Select a languages";
ling["en"]["pchelpling"] = "Help us to translate";
ling["en"]["save"] = "Save...";
ling["en"]["pcnote"] = "Visualize block note?";
// Destinations (only common name)
ling["en"]["desttitle"] = "Destinations";
ling["en"]["desthelp"] = "Is not recommended to go into not yet explored areas.";
ling["en"]["destvel"] = "Overspeed;";
ling["en"]["desthome"] = "Home";
ling["en"]["destarena"] = "Arena";
ling["en"]["destmerc"] = "Market";
ling["en"]["desterbe"] = "Collecting Herbs";
ling["en"]["destfung"] = "Gathering Mushrooms";
ling["en"]["destimp"] = "Taxes office";
ling["en"]["destprec"] = "Brightsmith";
ling["en"]["desttes"] = "Research treasure ";
ling["en"]["destgilda"] = "Own guild";
ling["en"]["destteut"] = "Border Teutonic zone";
ling["en"]["destrom"] = "Roman sea border";
ling["en"]["destgal"] = "Gallic border area";
ling["en"]["destproi"] = "Forbidden zone";
ling["en"]["destlab"] = "Labirint";
// NPG
ling["en"]["npgtitle"] = "NPG";
ling["en"]["npgsubitle"] = "Is not recommended to go by NPG not yet explored the game";
ling["en"]["npgblog"] = "Blogs about NPG";
ling["en"]["npgauto1"] = "Fight with the next NPG";
ling["en"]["npgauto2"] = "Start the fight directly with your available NPG";
ling["en"]["npgauto3"] = "Do not worry if graphics are not the same, in fact always fight with another PNG";
ling["en"]["npg1"] = "Guilds cartel";
ling["en"]["npg2"] = "Houses cartel";
ling["en"]["npg3"] = "behind Matricia";
ling["en"]["npg4"] = "At the brige for the teutonic zone";
ling["en"]["npg5"] = "At swamp";
ling["en"]["npg6"] = "At right of Karamix";
ling["en"]["npg7"] = "At the second extraction point of Iron";
ling["en"]["npg8"] = "Behind Aurora";
ling["en"]["npg9"] = "Behind the temple";
ling["en"]["npg0"] = "At the second extraction point of Bricks";
// Taverns
ling["en"]["tavtitile"] = "Taverns";
ling["en"]["tavhelp"] = "Is not advisable to go in taverns unexplored ";
ling["en"]["tav1"] = "Tavern of Stan: Tuesday coffee, Thursday objects";
ling["en"]["tav2"] = "Tavern of Senkel";
ling["en"]["tav3"] = "Tavern at the teutonic zone";
ling["en"]["tav4"] = "Tavern behind Karamix";
ling["en"]["tav5"] = "Tavern behind gallic zone";
ling["en"]["tav6"] = "tavern behind the tower";
ling["en"]["tav7"] = "Romans tavern";
// Market
ling["en"]["merctitle"] = "Players market";
ling["en"]["mercric"] = "Receiving:";
ling["en"]["mercquant"] = "Quantity:";
ling["en"]["mercris"] = "Resources";
ling["en"]["mercper"] = "Multiply for:";
ling["en"]["mercprez"] = "Prize:";
ling["en"]["mercinfo"] = "To negotiate with a specific player and insert the name of the recipient and be completed accordingly, otherwise go to hit the market, expect that the beam is still in place and fill in the blank leaving the receiver. In the multiplied dovente enter the X, or if you have 54 grain fill quantenà one and many. and see the market for 54 1 (X54), or have offered them all.";
//ling["en"]["mercatt1"] = "Caution!!!";
//ling["en"]["mercatt2"] = "Do not worry if the form (fields to be filled) are written, check only that the money has been climbing from your warehouse.";
ling["en"]["mercvis"] = "See offerts";
ling["en"]["mercprop"] = "own offerts";
ling["en"]["gomerc"] = "Go to market";
ling["en"]["setResourcesMaga"] = "Select the resource and click here for send all that you have";
// Useful link
ling["en"]["linktitle"] = "Useful links";
ling["en"]["linkI"] = "Quest 1th generation";
ling["en"]["linkII"] = "Quest 2nd Generation";
ling["en"]["linkIII"] = "Quest 3rd Generation";
ling["en"]["linkpoz"] = "Instructions of potions";
ling["en"]["linkgraf"] = "Graphic";
ling["en"]["linklet"] = "Beds category";
ling["en"]["linkdiario"] = "Diary";
ling["en"]["linkmappa"] = "Complete map";
ling["en"]["linkamici"] = "Frinds list";
ling["en"]["linktasse"] = "Pay tax";
ling["en"]["linkpes"] = "Cook fish at distance";
ling["en"]["linkfung"] = "Cook mushrooms at distance";
ling["en"]["linkcarta"] = "Buy valuable paper at distance";
ling["en"]["linkonore"] = "Buy honour coronals";
ling["en"]["linksitt"] = "Insert the sitter";
ling["en"]["linkgild"] = "Done to guild";
ling["en"]["linkgiochi"] = "Games";
ling["en"]["linkattrezzi"] = "Buy tools";
// Bingo
ling["en"]["bingotitle"] = "Bingo";
ling["en"]["bingoinfo"] = "Here click on the bingo card bingo Have to get a check in inventory every day you playing sudokiss and choice of ladies and see if a box is cleared if so is one of your lucky days when all the boxes BINGO will be deleted and you click on an award";
ling["en"]["bingoscheda"] = "Have a card";
ling["en"]["bingobingo"] = "In bingo case";
ling["en"]["bingosud"] = "Play sudokiss";
ling["en"]["bingodame"] = "Play ladies choice ";
ling["en"]["bingoring1"] = "Thank to XxcoralloxX for the sistem of Bingo at distance!!!";
ling["en"]["bingoring2"] = "if you have complaints you must say allright to him;) xD";
// Estraction
ling["en"]["estrtitle"] = "Estraction points";
ling["en"]["estr1"] = "1st estraction points (village)";
ling["en"]["estr2"] = "2nd estraction points";
// Automatic mining
ling["en"]["autotitle"] = "Automatication";
ling["en"]["autoavv"] = "Don't do action if you can't do it .";
ling["en"]["autowork"] = "We are mining";
ling["en"]["autoestr"] = "Automatic mining";
ling["en"]["autoaltre"] = "Others automatic mining";
ling["en"]["autotes"] = "Rake the map of treasures, are needed 47 minutes and 5 seconds";
ling["en"]["autores"] = "Automatic mining resources";
ling["en"]["autotesstart"] = "For the treasures, start by box number:";
ling["en"]["autodo"] = "We are doing.......";
ling["en"]["autoinfo"] = "Before extracting a resource, enter repetition value";
ling["en"]["autoimpo"] = "Settings";
ling["en"]["autonum"] = "How often should I do?";
ling["en"]["autopref"] = "Preference (set before start mining)";
ling["en"]["checkmp"] = "Check if you have AP/OP";
ling["en"]["checkmaga"] = "Check Warehouse";
ling["en"]["checkeat"] = "Check hungry";
ling["en"]["checkbath"] = "Check preference";
ling["en"]["checkfun"] = "Check funny";
ling["en"]["checksleepy"] = "Check sleepy";
// Copyright
ling["en"]["copyby"] = "Travianer Plus created by:";
ling["en"]["copywith"] = "with the support of:";
ling["en"]["copygood"] = "Good use of Travian Plus and Travianer !!!!!";
// News
ling["en"]["loadinnews"] = "Charge news...";
ling["en"]["newstp"] = "Travianer Plus news";
ling["en"]["newsgame"] = "News of game";
ling["en"]["newsextra"] = "News extra";
// Days
day["en"] = new Array();
day["en"][0]="Sunday";
day["en"][1]="Monday";
day["en"][2]="Tuesday";
day["en"][3]="Wednesdays";
day["en"][4]="Thursday";
day["en"][5]="Friday";
day["en"][6]="Saturday";
// Resources and cash
ling["en"]["legno"] = "Wood";
ling["en"]["argilla"] = "Clay";
ling["en"]["minerale"] = "Ore";
ling["en"]["grano"] = "Grain";
ling["en"]["farina"] = "Flour";
ling["en"]["carbone"] = "Coal";
ling["en"]["assi"] = "Wooden boards";
ling["en"]["mattoni"] = "Bricks";
ling["en"]["ferro"] = "Iron";
ling["en"]["pane"] = "Bread";
ling["en"]["erbe"] = "Herb";
ling["en"]["funghi"] = "mushrooms";
ling["en"]["tesori"] = "Treasures";
ling["en"]["prim"] = "Primary resources";
ling["en"]["second"] = "Secondary resources";
ling["en"]["bronzo"] = "Bronze coins";
ling["en"]["argento"] = "Silver coins";
ling["en"]["oro"] = "Gold coins";

///////// de /////////
ling["de"]=new Array();
ling["de"]["title"] = "Travianer • Travianer-Plus";
//start
ling["de"]["vers1"] = "Aktualisiere Skript";
ling["de"]["vers2"] = "Deine Version ist: ";
ling["de"]["vers3"] = "Aktuellste verfügbare Version: ";
ling["de"]["tt"] = "Traviantrucchi.org; Die beste Seite, wenn es um Travianerskripte geht. Alles was du brauchst in einem Skript. Los hol es dir!";
ling["de"]["support"] = "(Alles was du brauchst)";
ling["de"]["newsbar1"] = "Willkommen "+user+"!!!";
ling["de"]["newsbar2"] = "Klicke um die News zu öffnen";
ling["de"]["off"] = "Skript ausschalten";
ling["de"]["contr"] = "Einstellungen";
ling["de"]["about"] = "Über Travianer-Plus";
// Barra principale
ling["de"]["dpoz"] = "Aus der Ferne Tränke brauen.";
ling["de"]["dtas"] = "Steuern bezahlen";
ling["de"]["dpes"] = "Aus der Ferne Fische kochen.";
ling["de"]["dfun"] = "Aus der Ferne Pilze kochen.";
ling["de"]["dcar"] = "Aus der Ferne hochwertiges Papier kaufen.";
ling["de"]["dcor"] = "Kaufe Ehrenkränze";
ling["de"]["sitt"] = "Sitter eintragen";
ling["de"]["ddon"] = "Für die Gilde spenden";
ling["de"]["amic"] = "Freundesliste";
ling["de"]["game"] = "Minigames";
ling["de"]["datt"] = "Werkzeug kaufen";
ling["de"]["mess"] = "Wähle alle Nachrichten aus, um sie zu löschen.| Du must das Nachrichtenfenster offen haben.";
ling["de"]["on/f"] = "Menü Ein/Aus";
ling["de"]["velc1"] = "Starte Übergeschwindigkeit";
ling["de"]["velc2"] = "(Zur Deaktivierung F5 drücken)";
ling["de"]["chat"] = "Travianer-Plus chat";
ling["de"]["user"] = " Travianer-Plus Benutzer";
// Barra dei menu
ling["de"]["dest"] = "Reiseziele";
ling["de"]["NPG"] = "NPC'S";
ling["de"]["taverne"] = "Tavernen";
ling["de"]["mergioc"] = "Spieler-Markt";
ling["de"]["linku"] = "Nützliche Links";
ling["de"]["bingo"] = "Bingo";
ling["de"]["estrrisorse"] = "Rohstoffabbau-Gebiete";
ling["de"]["automatizzazione"] = "Automatischer Rohstoffabbau";
// Contatore
ling["de"]["cont"] = "Zähler";
// Minichat
ling["de"]["tpchat"] = "Travianer-Plus chat";
// Control panel
ling["de"]["pctitle"] = "Benutzereinstellungen";
ling["de"]["chiudipc"] = "Schliesse Fenster";
ling["de"]["pch1"] = "Willkomen zur Benutzereinstellung";
ling["de"]["pcusername"] = "Benutzername:";
ling["de"]["pcdonon"] = "Schalte die Funktion ein \"zeige Spenden\"";
ling["de"]["pcdoninfo"] = "Dies ist eine experimentelle Funktion. Du wirst am eingestellten Tag daran erinnert, die eingestellte Menge Sozialpunkte oder Rohstoffe, für die Gilde zu spenden";
ling["de"]["pccor1"] = "Wenn du dir sicher bist, klicke";
ling["de"]["pccor2"] = "hier,";
ling["de"]["pccor3"] = " um den Nachrichtentext zu ändern";
ling["de"]["pcabi"] = "aktiviere";
ling["de"]["pcdis"] = "deaktiviere";
ling["de"]["pcavv"] = "Tag der Erinnerung";
ling["de"]["pcdayimpo"] = "Menge von:";
ling["de"]["pcris"] = "Rohstoffe:";
ling["de"]["pclogo"] = "Travianer-Plus Logo anzeigen?";
ling["de"]["pcvis"] = "anzeigen";
ling["de"]["pcnvis"] = "nicht anzeigen";
ling["de"]["pcmenu1"] = "Postion";
ling["de"]["pcmenu2"] = "des rechten Menüs ändern";
ling["de"]["pcmenu3"] = "(Angabe in Pixel)";
ling["de"]["pcmessch"] = "Ändert die angezeigte Nachricht:";
ling["de"]["pcmesstitle"] = "ändere Text";
ling["de"]["pcimg"] = "Ändert die Bilder als wärst du im Gold-Club";
ling["de"]["pcimgon"] = "anschalten";
ling["de"]["pcimgoff"] = "abschalten";
ling["de"]["pclingtitle"] = "Wähle eine Sprache";
ling["de"]["pchelpling"] = "Hilf uns zu übersetzen";
ling["de"]["save"] = "Speichern...";
ling["de"]["pcnote"] = "block note anzeigen?";
// Destinations (only common name)
ling["de"]["desttitle"] = "Ziele";
ling["de"]["desthelp"] = "Es ist nicht ratsam, in noch nicht erkundete Gebiete zu gehen.";
ling["de"]["destvel"] = "Übergeschwindigkeit;";
ling["de"]["desthome"] = "Nach Hause";
ling["de"]["destarena"] = "Arena";
ling["de"]["destmerc"] = "Markt";
ling["de"]["desterbe"] = "Kräuterfeld";
ling["de"]["destfung"] = "Pilz-Gebiet";
ling["de"]["destimp"] = "Steuerbüro";
ling["de"]["destprec"] = "Feinschmied";
ling["de"]["desttes"] = "Schatzsuche";
ling["de"]["destgilda"] = "Eigene Gilde";
ling["de"]["destteut"] = "Germanische Grenze";
ling["de"]["destrom"] = "Römische Grenze";
ling["de"]["destgal"] = "Gallische Grenze";
ling["de"]["destproi"] = "Verbotene Zone";
ling["de"]["destlab"] = "Labyrinth";
// NPG
ling["de"]["npgtitle"] = "NPC";
ling["de"]["npgsubitle"] = "Es ist nicht ratsam, zu NPC's in noch nicht erkundeten Gebieten zu gehen.";
ling["de"]["npgblog"] = "Blogs über NPC's";
ling["de"]["npgauto1"] = "kämpfe mit dem nächsten NPC";
ling["de"]["npgauto2"] = "Startet den Kampf mit dem zur Verfügung stehenden NPC.";
ling["de"]["npgauto3"] = "Stör dich nicht daran das das Bild nicht das selbe ist, wie das des NPC den du bekämpfst.";
ling["de"]["npg1"] = "Gilden Schild";
ling["de"]["npg2"] = "Häuser Schild";
ling["de"]["npg3"] = "Hinter Matricia";
ling["de"]["npg4"] = "An der Brücke zur Germanischen Zone";
ling["de"]["npg5"] = "Am Sumpf";
ling["de"]["npg6"] = "Zur rechten von Karamix";
ling["de"]["npg7"] = "Am zweiten Eisen-Abbaupunkt";
ling["de"]["npg8"] = "Hinter Aurora";
ling["de"]["npg9"] = "Behind the temple";
ling["de"]["npg0"] = "Am Zweiten Ziegel-Abbaupunkt";
// Taverns
ling["de"]["tavtitile"] = "Tavernen";
ling["de"]["tavhelp"] = "Es ist nicht ratsam, zu Tavernen in noch nicht erkundeten Gebieten zu gehen.";
ling["de"]["tav1"] = "Taverne von Stan: Dienstag Gratiskaffee, Donnerstag Zeugs";
ling["de"]["tav2"] = "Taverne von Senkel";
ling["de"]["tav3"] = "Taverne in der Germanischen Zone";
ling["de"]["tav4"] = "Taverne hinter Karamix";
ling["de"]["tav5"] = "Taverne hinter der Gallischen Zone";
ling["de"]["tav6"] = "Taverne hinter dem Turm";
ling["de"]["tav7"] = "Römische Taverne";
// Market
ling["de"]["merctitle"] = "Spieler-markt";
ling["de"]["mercric"] = "Empfänger:";
ling["de"]["mercquant"] = "Anzahl:";
ling["de"]["mercris"] = "Rohstoff";
ling["de"]["mercper"] = "Multiplikator:";
ling["de"]["mercprez"] = "Preis:";
ling["de"]["mercinfo"] = "Um mit einem bestimmten Spieler zu handeln, musst du seinen exakten Namen in das Empfänger-Feld eintragen. Wenn du das Feld frei lässt platzierst du deine waren auf dem Freien Markt.Im Multiplikator-Feld trägst du die ein, wie oft du eine bestimmte Menge an Rohstoffen einstellen willst. z.B. Du willst zehn mal hunderter Pakete Mehl einstellen. Heisst, Menge=100 und Multiplikator=10.";
//ling["de"]["mercatt1"] = "Achtung!!!";
//ling["de"]["mercatt2"] = "Du bekommst keine Transaktions-Bestätigung. Sieh zu wie dein Gold mehr wird :) oder klicke auf Eigene Angebote um dich zu vergewissern";
ling["de"]["mercvis"] = "Zeige Angebote";
ling["de"]["mercprop"] = "Eigene Angebote";
ling["de"]["gomerc"] = "Zum Markt gehen";
ling["de"]["setResourcesMaga"] = "Wähle den Rohstoff und klicke hier um alles zu senden was du hast";
// Useful link
ling["de"]["linktitle"] = "Nützliche Links";
ling["de"]["linkI"] = "Quest's Generation 1";
ling["de"]["linkII"] = "Quest's Generation 2";
ling["de"]["linkIII"] = "Quest's Generation 3";
ling["de"]["linkpoz"] = "Trank Rezepte";
ling["de"]["linkgraf"] = "Grafik";
ling["de"]["linklet"] = "Betten Kategorien";
ling["de"]["linkdiario"] = "Tagebuch";
ling["de"]["linkmappa"] = "Komplette Karte";
ling["de"]["linkamici"] = "Freundesliste";
ling["de"]["linktasse"] = "Steuern zahlen";
ling["de"]["linkpes"] = "Aus der Ferne Fische kochen.";
ling["de"]["linkfung"] = "Aus der Ferne Pilze kochen.";
ling["de"]["linkcarta"] = "Aus der Ferne hochwertiges Papier kaufen.";
ling["de"]["linkonore"] = "Kaufe Ehrenkränze";
ling["de"]["linksitt"] = "Sitter eintragen";
ling["de"]["linkgild"] = "Für die Gilde spenden.";
ling["de"]["linkgiochi"] = "Minigames";
ling["de"]["linkattrezzi"] = "Werkzeug kaufen";
// Bingo
ling["de"]["bingotitle"] = "Bingo";
ling["de"]["bingoinfo"] = "Here click on the bingo card bingo Have to get a check in inventory every day you playing sudokiss and choice of ladies and see if a box is cleared if so is one of your lucky days when all the boxes BINGO will be deleted and you click on an award";
ling["de"]["bingoscheda"] = "Ich habe eine Karte";
ling["de"]["bingobingo"] = "falls du ein Bingo hast";
ling["de"]["bingosud"] = "spiele sudokiss";
ling["de"]["bingodame"] = "spiele Damenwahl";
ling["de"]["bingoring1"] = "Danke an XxcoralloxX für das System Bingo aus der Ferne!!!";
ling["de"]["bingoring2"] = "Falls es Probleme gibt, wisst ihr jetzt auch wo ihr euch beschweren müsst :)";
// Estraction
ling["de"]["estrtitle"] = "Rohstoffabbau-Punkte";
ling["de"]["estr1"] = "1ste Rohstoffabbau-Punkte (Dorf)";
ling["de"]["estr2"] = "2te Rohstoffabbau-Punkte";
// Automatic mining
ling["de"]["autotitle"] = "Automatisierung";
ling["de"]["autoavv"] = "Mache nichts, was du nicht auch machen kannst.";
ling["de"]["autowork"] = "Du baust gerade ab:";
ling["de"]["autoestr"] = "Automatisch Rohstoff abbauen";
ling["de"]["autoaltre"] = "Andere Automatische Tätigkeiten";
ling["de"]["autotes"] = "Suche die Karte nach Schätzen ab. Du wirst dafür ca.47 min brauchen";
ling["de"]["autores"] = "Automatisch Rohstoff abbauen";
ling["de"]["autotesstart"] = "Für den Schatz starte bei box Nr.:";
ling["de"]["autodo"] = "Du Arbeitest...";
ling["de"]["autoinfo"] = "Vor dem abbauen, eintragen wie oft du den Vorgang wiederholen willst.";
ling["de"]["autoimpo"] = "Einstellungen";
ling["de"]["autonum"] = "Wie oft soll ich Arbeiten?";
ling["de"]["autopref"] = "Präferenzen (festgelegt werden, bevor)";
ling["de"]["checkmp"] = "Scheck, ob Sie BP/Ap haben";
ling["de"]["checkmaga"] = "Scheck Lagerhaus";
ling["de"]["checkeat"] = "Scheck die Hunger";
ling["de"]["checkbath"] = "Scheck der Hygene";
ling["de"]["checkfun"] = "Scheck der Spaß";
ling["de"]["checksleepy"] = "Scheck die schlafe";
// Copyright
ling["de"]["copyby"] = "Travianer Plus kreiert von:";
ling["de"]["copywith"] = "mit der Unterstützung von:";
ling["de"]["copygood"] = "Viel Spass beim Benutzen von Travianer-Plus und beim Spielen von Travianer!!!!!";
// News
ling["de"]["loadinnews"] = "Lade News...";
ling["de"]["newstp"] = "Travianer-Plus News";
ling["de"]["newsgame"] = "News über das Spiel";
ling["de"]["newsextra"] = "Extra-News";
// Days
day["de"] = new Array();
day["de"][0]="Sonntag";
day["de"][1]="Montag";
day["de"][2]="Dienstag";
day["de"][3]="Mittwoch";
day["de"][4]="Donnerstag";
day["de"][5]="Freitag";
day["de"][6]="Samstag";
// Resources and cash
ling["de"]["legno"] = "Holz";
ling["de"]["argilla"] = "Lehm";
ling["de"]["minerale"] = "Erz";
ling["de"]["grano"] = "Getreide";
ling["de"]["farina"] = "mehl";
ling["de"]["carbone"] = "Kohle";
ling["de"]["assi"] = "Bretter";
ling["de"]["mattoni"] = "Ziegel";
ling["de"]["ferro"] = "Eisen";
ling["de"]["pane"] = "Brot";
ling["de"]["erbe"] = "Kräuter";
ling["de"]["funghi"] = "Pilze";
ling["de"]["tesori"] = "Schatz";
ling["de"]["prim"] = "Primärer Rohstoff";
ling["de"]["second"] = "Sekundärer Rohstoff";
ling["de"]["bronzo"] = "Bronzemünzen";
ling["de"]["argento"] = "Silbermünzen";
ling["de"]["oro"] = "Goldmünzen";

/**************Lingue**************/


// Controllo logo
if (displaylogo=='') {
	bartop='110';
	}else{
	bartop='60';
	}

// Controllo donazioni
var controlloavv = GM_getValue("attavvisi");
if (controlloavv == "s") {
var dayavvisi = GM_getValue("day");
var d=new Date();
if (d.getDay() == dayavvisi) {
		var testo = GM_getValue("testo");
		var avvisiextra = '<div id="MovSessionAVV"; style="z-index: 40; position: absolute; top: 170px; left: 300px; width: 200px; text-align: center;"><div id="chatGroupDiv500" style="z-index: 40; display: block; text-align: centre; solid aqua;"><div style="z-index: 40; position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);"><table class="popupTable" cellspacing="1" celpadding="1" style="z-index: 40; "><thead><tr><td colspan="1" style="cursor: move;" ondragstart="return false;" onmousedown="toForeground(\'avv\');dragObjName=\'MovSessionAVV\'; functionMouseDown(event);">Donare alla gilda!!!</td></tr></thead></table><img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(500);" />'+testo+'</div></div></div>';
		bElem = document.createElement("div");
		bElem.innerHTML = avvisiextra;
		$id('gameDiv').appendChild(bElem);
	}
}

// Funzioni
function toggleAddOn() {
	if ($id('interfaceDivAddOn').style.display == 'none') {
		$id('interfaceDivAddOn').style.display = 'block';
	} else {
		$id('interfaceDivAddOn').style.display = 'none';
	}
}

function addElem(elem, html, attributes, style, parent){
	var aElem = document.createElement(elem);
	if (html) aElem.innerHTML = html;
	if (attributes)	for (a in attributes) aElem.setAttribute(a, attributes[a]);
	if (style) for (a in style) aElem.style[a] = style[a];
	if (!parent) parent = $tags('body')[0];
		else parent = (typeof(parent) == 'string') ? $(parent) : parent;
	if (!parent) return false;
	parent.appendChild(aElem);
	return aElem;
}

function $tags(tag){
	return document.getElementsByTagName(tag);
}

function $id(id){
	return document.getElementById(id);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalScript(js) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

function addScriptUrl(url) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

// Aggiunta degli style/script nella head

addScriptUrl('http://leonardosite.altervista.org/travianer/file/travianer-plus/dropdown.js');

style = '.settingmenu'+
'{'+
'	-moz-background-clip:border;'+
'	-moz-background-inline-policy:continuous;'+
'	-moz-background-origin:padding;'+
'	background:#FFF3DB none repeat scroll 0 0;'+
'	border:1px solid #000000;'+
'	color:#885305;'+
'	display:block;'+
'	font-family:Verdana,Sans-Serif;'+
'	font-size:12px;'+
'	font-weight:900;'+
'	padding:1px 15px 2px;'+
'	text-decoration:none;'+
'	width:auto;'+
'}'+
'.settingmenu:hover {'+
'	background-color: #FFE4B5;'+
'	text-decoration: none;'+
'}'+
'.setting_child'+
'{'+
'	-moz-background-clip:border;'+
'	-moz-background-inline-policy:continuous;'+
'	-moz-background-origin:padding;'+
'	background:white none repeat scroll 0 0;'+
'	border:1px solid #885305;'+
'	padding:1px 1px 0;'+
'}'+
'.tpbutton {'+
'-moz-border-radius-bottomleft:3px;'+
'-moz-border-radius-bottomright:3px;'+
'-moz-border-radius-topleft:3px;'+
'-moz-border-radius-topright:3px;'+
'-moz-box-shadow:1px 1px 2px #91AE6F;'+
'background-color:#ADCF84;'+
'border:1px solid #7E9760;'+
'color:#50603D;'+
'cursor:pointer;'+
'padding:1px 10px;'+
'vertical-align:middle;'+
'}'+
'.tpbutton:hover {'+
'background-color:#B7DB8B;'+
'}'+
'.tpbutton:active:hover {'+
'-moz-box-shadow:0 0 2px #91AE6F;'+
'margin:1px 0 -1px;'+
'}';

addGlobalStyle(style);

var img_split_menu = 'data:image/gif;base64,R0lGODlhpgDIAMQAAPjJhv%2FMmeq6hv%2FYqIdUDhteG06TGt22g9ercvvpzceVVqaAP6fLV5nMmfLnVeSzePXNjP3FjMyZZvLDhcKvk%2F7dnYzCHva9iv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABgALAAAAACmAMgAAAX%2FICaOZGmeaKqubOu%2BGAPPdG3feJ42stjrOcEgQSwaj8ikcslsOp%2FQooBBrQ6G0eVAMHJQVN6RIHAtm8%2FotHrNbrvfcHPAYqDXGfF2gItxeBMofhSAGGN5h4iJiogBChZ2BgxjAWRtEBAHaXsifgQJXyUCDhUECFwHE5SUF6oBrKqXrbIVlBB7r7StFZgTvbK6rRe0rwEQvawCAL%2BrrbG1z7AXyaoXCAuPBtkMEgfd06oDqkJ0CtCqBxQUDgkLBUTp8AejBAvp3gL4%2Bfr7%2FP3%2B%2FwADChxI0JqBAtkSZkNg6t4%2BawyyLXB4wBQCAgQ6FdjIcaOCTgsIFFDAsKTJkyhT%2F6pcybKly5cwSy7Ihk2hgQUKJKxsp3CBz583FWB0oKAjEY4fHdATqaCp06dQo0qdSrWq1atYszqdqbAAxps%2Bqx6EdDAbxwUI0hHd%2BA7DOwR%2BCtSjIOGn3bt48%2Brdy7ev37%2BA837diLHwUr0I6ZBNSE8Cp6KfTMh7UIBCAAwSDGvezLmz58%2BgQ4seLbrOZq4GNJelebBjYVAQEEQ%2BUUE2qMykc%2Bvezbv35mybEdgxXGej4o1mDYMqtPwEuhEUfEufTp166sIfH3ktbLZrwu0Ym8NAcFWCBK3op55Pz75905%2BFuUKi57Mja8b069kgL9V8TvMIrHeeef455d%2BBBg5I4P%2BCDCq4Xk4GQtXghP1RReBTD8IXiQURARfWTwUwUBNhdiFgwwFNTchgSSq2qFOAAL7IkIswKlijgwHOGOOC%2F6XIY4IA1tjjVj45wCEdiYEVUgGP2EFiWCbWcMCCOb6kk4wy1mhSljpyOSNKQXYJk4o3vmjmjhc%2BJVxECCHXVYcc5dfUASfq9IBJd8a0Up4P3JknAn2e9CdD3RAKY6A6GtrNoIDmeeaWgFq54ER12HQQfZV6%2BFOKdErZaEV%2Bhhpon6LiGemnhS5aEqn4kBppn60%2BIACfqhIqKqiDVmQoN4gu2qufOxlZU0J6peYTRjgBeiKg%2Bsgq66zOLpoPq7DCCu3%2FtaRaiw8mFHGLzwTXgjtttOP%2BCq2t%2BTCbra%2BsPuTHkTaFlaICPLXD0U2d0uCQuPwcA%2B4qrKTSSjLIGANwPv7Wcgm4ysgiwAX%2B8ovKs9%2BK6ye0tE5D8Kz9sHpMMg4w8G68CxxonlkdbZTvDN0IDMsyzry8zDOXGCyLLdH8YswEF9TMcy3gFnyMLfwC0Cqh0thizLdMI8zzMXtMIKLIdPgk0X85cpXyRuK90I0tucz8yxVkVHLzzBWELcsrODNTTMMvfwNwNBW3is%2FaxBDNs9LFCHzBIyLi1dSW323dtQvT5AFOOGmrHYE5Ojv%2BuM59w0xJOMW0Eo40cC9NjCvNvKwM%2F9nNWEDv6f%2FZuSgkW1d2oiqNV4B54%2BFgjobmzcS8TNozPy7NHmLjDkzcvpy9cACT1wzM0gwluGo3C3SIcsoNnCj3LjJnvrjZwdvctthgJw%2BO8OPDrjYs4D7g%2BytyU%2FJ44zPPeuDzAhgUkQUItYZy9VI%2BcHb2ZSMd%2BD4XPLFdgBhqKwPkNIe5YEQNbtoLAAQVuIxZ0a9pPOFQ%2Fgrnuv5BQ3eUUNv3jie2Bm7vcjeTxucYlzYTmvByDRTgw4I3OQViboQckxvOLtAODjHATSjTjwcDWIkB0OJ7%2F0Nh2cYnuwDIDn4vzBzmJme%2BJoYOdrtzXy1q9wsqyu52ASMGF2ExE%2F8R6a8jPjlcC%2BqXCiguMXi0K6IbnCi5ACqQig40ofiS6AyBnS%2BCAiSd0bAYQVVMgF42OUsaT%2FSsJTaueGLjnSRzEbuy5QKPEEhGHF14M8YZkRIQjKAyerYwBPLOgK94RQQoSblVWGMmaPxJlPTVyBDSYn0u%2B18Dj4jHAt7ClnSkhSd%2FIcw3ugKCRHOgANr4x2X00pfgCtB78ievWbJsY7%2BEBQRCOTZgElBhDYNg4m4Xu2aaEInB%2BKYvAbhOasCIXgjBCYSsCYN7zKKZyKMGIbXIwCleUXtykGMkIbDHAEzAZ69oYNseh7NnysKhhRRHRQgQL%2FOsrJ6NjMXt8klHjl7%2FoaC20EMgYagHJzYUkgtsZwF3gUcRzgwBrUOIGlnQsipykZUKHKEqqEi2OQ7vi2cIpgANCspWrNIcEE0pMckGwm7CNKYN4B%2FL%2FGdTGJqNbN9kmyOFejul4eyJIeQq74IqsLZptJUchaMrHBqBZxqxhQE4QGtaJ9V6EsxycZyFURfX06Aa85sbpSQLnRhFdPITfDpFKzFDWLtwwJKuUrpr27hZQI321a8NhNskcAaBgL61iVwc6joBIDDKykKhhmUgGeAXAAR8pyt19ZrcSGkzXz4utJeN4i9%2B1k85rCGsoIRkGNmZvdHpNoReJSktJBkAnmzwILFF3LZCOVk4wjW0%2F7ALafBUSceeCjWAgs2eM6pbW6XylWYKc1lj%2BWmN%2FLWpANFdo%2F9qRl%2BVcu%2BWuy3gBUKJ2d86UbGGfSbOBsA3xv6xl971Xf3qcql6xJemkwDfaVHIWvMWUp3FLOIpn3jd853yn6ZdRhS%2FOD6HctYWFgSREPVVYCzGsIgwPu5eiwEBrY5NgWETLFA3OrNtFhCieGzjf9OKRHTqqi7wZSQCCUs2HX92jJE0agSEW9UXgrajRDTmhXss4ZSS2JnFyCklKmKeFbMMAcVjZVj9ys7vsZahd6WwgTe5Wg1%2FN5KY2%2B8%2F3djPD5IuqatY3wMkkI2ZrsAbpu3Zf2n3yZ0msXyLRf9eLPJK1DtX4sNrqwUAlPcyOViRyQG12RErZ%2BJi4KO9hlYBogfJtk0jEMqXUCdwd8pQ5OXSfMib3OeWm%2BV%2F8nabNUbmMJdKae4abHIPS4WiZQHPVKdgXzR8HzUiXEIDShsao45Fee9JXH26rZe2gOinc13UVihb0z6mRMnQouSk9bhnqQA35fDpRGRMoGFkK%2FW534bEbHt1vLX4naztezO%2BuVsW1iDARb0mq2xiWZ9O66Yok4gMiA0MAOq08cz428VRG3LeaiVuBKYLttY2dyI2uJsrakxtZSB0W%2F%2BUmdJS0eK%2BzfBh3yr5kCMIMZfNHBgKFTAKOZnP1D76itY4gE%2F%2FFu6CA0zigDjHmTLi%2FD9WHDeTlO25NOq2a%2Fy6TQA4Ky0lbs3ZSt9YsZXVqyzqhfLIqoK0v9BHR8V1633%2BrosMRfGxW4nps%2B17bTX%2BZob3%2BlW1qXl3BHWn1eTibBSgInibDpr7%2FKZChAXX3QlbOejQt4dlpnbc307hMseQc128kIqWNeZnjWmLTTtxAteYXlQbXwKnd66Ul0Tx1jX7Lcz7y3MVdDrYSTsBql57nzsVco9Rwc2w6dHFV9iwQNsKjQaipiwbieo1f%2F5fnQ8D550vXrIpkWxsUhb4rgD%2F8tx62Ig6%2BuEqLabKZ7ZkSjx1evDVvmxXYXT3EcPeGEd%2BsVIx%2F%2BWWUqZ1ThLXPZ3WRdkTbxH1L8vgMjlWG%2FiXf7T0TY9TUHNDYPGWQ%2FtgDqIlQcVgdYbVQH%2FnS%2BhUWLU1cgFYQcvkMhkoNqjRJvo3VfznS7QQYeAiMRRDgKfVdwVkQnUHTWnlS5gjN73kg8CVhHPFEbQnGe3jfuiUSSpUMwhzd7ZUeHCFfJ30Rv0ngpnjevoUDhDVfyjmeUqEX4kXV03INdYzPAv0fyo0MDp0N4yDXA9HQPfmbYcXQU31UD2nMwe0T3soC%2F4yCR%2F2QnJ1LwjxYBBmdFz3DMr2DTEzc1E4YDsXbnFViEsVc%2FETgEsTVujniYIIPFZ2Q7BnExxiPVE4dv9jMDSZU37%2F8kLJhIXeRlh70DCWd0VfaEz8kgp2uDYFtQsA1wqkNQaUNm3ykRA1iFEOJ4nfsjbU9ofT9oLl9j04Zzfz9zlUBHdwiFAiSG2Zs0IqlUm71UvXVwfNyHA%2Bk0Kcwwo7M3%2FHZFg7lI0vOEOGVD%2F0kzv06Az5lgof84IQg04M1Us%2Bt0SDyFsGxU0CwBOV4oiHhmatBmygkw8Y1w%2FiAkxW9Ap0l4u%2FAwAj13mnggCIZl5GB3cRk1VzIwveCGYHtIJGpXRJApGqxizppEWV1y4fuEKbk43IUDnLVICuIChDKEVa5j4hCXYOqDBjxzPR2GW0pnHLIJPZtywNd3D%2FrVY%2FD9AyV5iSMvMvPzMGO%2FRNYMeVbHQB60NfCvlfm1NjzbCU0viU3fcLxNAwkORQFQFL69h0SCNZvfAxDaGEUlYLD7N3q1B%2B%2BACSxTBy1ihBu%2BiXxdNZfzV2xdUMNaU9wRZWnAMLIZaPzWMAe7lGNskxAPMvnrOLYwR1EKMPvZAPqOCa7SOPFWkwYPc5tyZAEEhSeZRJDXeXawOLtlB%2F53QJ9WNm9QQovsB1rKmNQRlXsDB6%2BCB893gB65JDhmQ0nQOZB5k5vRQBTmdJk7RDOHOZbJk7andp53lqCvCEoYCct%2FB0lfcP%2FAdvOMeR5Gdx4Qcu5OmYUzdtbpNLZecw%2F0FZBsvlT3sQeISEPdkzO58VNupkDTT5bO6pi7v4ntRgcbVpY4d4cPk0ZaSZShuTmFsXM1CHiJkTC78XPOemQkU5iATGix%2BkZ%2FgoAJHwAxjlg%2FVDdQS0dckZcaZGSqBTW8lQU3JzNB4TNxXqNt8JZgEnDvNXVm6Dlt2TbnF1N0YCmuwpAojGkaTJRZDEchZ3miOKTCTEe9ZCodoCKw6DCgAYN3CYfqspDip6kfjpfuagaPLwCKF5aLX0o%2F9HepnkeQHZlZPGpFwaLqPImuaGhqEjMAe1Zgejh0UJOgIHDYClCuShGNkQoc5BenV6mNPJmneHK%2F%2B3c%2B%2BGmBQjfgEYjP9u83a%2FEGKG6Qp6KJROWpBbVD6ENjWbGlnBeWHHGJ0WuXU414NamGFWlHhQBwCgIqLT0iybB3ZI9KjIlVgkpEVHKJV0KatgJzYSYCRmFFVUUE9QunmUKaz32C8806dN9GHDEAHIYEElIZ3NspNuQ4vrZ2wfl2k0Ror%2F8z2k9Tds0hpRxamFII4OyDalR35f9UaDqFTfMwFT5pTRKZ0TAG0zE4JK1JTGKIK7lEVrCDrcxInnMAGZkhAMQLCFgFJy6gpf44Vg82fNQI7Z2nnNYrFXSFwLpTmxeqK4%2BEIQG2bmKUGTqgrZMSygaVcR6KGwIq1huFpqowydQz5CC0G94Cz%2FN3uYBzqI3EWEIKeAZhcBxbgKdmlQ8uCtZIGyKVt9b2c3KmtV9npFzgd8YcOmyzp8TlmRcglQMJavYnOCJyizBTmjE4E8fvAuA7unjpcKtqNNt%2BBzt0mLLWaryZe3xDkttlepy3SRXUigvENQQBqCPymCO7Sv5xNrD1QNdcAQU2Mk%2FHOySLtdSrlTe3dTBjU5Hgc0T5ON0mpCF6ArvrJdjqZb5ghMGVu8jAt4%2BAk3rkUTgGMBxuk1Yno8sbCtz9mcTXZKmHSfPjeRZ6MqizKfx0NF8FaETrpN%2FvZdjQaVbUVtFaupdfATWSoGPfgsrbmjIMiv%2FzV%2BTVptyBMryBmi%2F1L3NE%2BTdigUMwI0ZWZHfwjMbMMCv%2B0mMb8mhmP3TEBodwsMafHjKr1ZfIn5QcZLlyUYNq0HhsWLesFgDcPCAIs0RFvXcHlrXdh7WlPUKmpLl2PQu06HNIPqsMvwqcTbjuamdpQlAAqwGvESv1r6dCQXMUEYRYt7hBQ6BuzXv6WJLu%2B5LUbHiS%2B6QKRll3DTUiAsDvKxGDeBxIUwX8C5crXVbztXwenXMMFJvWcHpsDIJ%2FtQlOkripDITowWNi6HcIlkNStMS1fZw5R1hy42MO%2F6AFv7P7d1n9EoDVtJseS3TybEXN2GRcmYZSBUDScTT3ZhxjnqdLhUYIpmddHndf8VlEpziDdml2FJOZbqZ3TYBVaSCw5tk8o8i7O9emrXYDqhfCKvCY7k%2BkfnQ0F%2FzD6cpkQmHFTUl6FXO2sXHFa5kLOWVrxQ2wwPQ1suIw0GYQD04sBDJHamF2XaFTr1aKoyxmsrh5%2FmCjxDpjZi1GOGoMu3aED7GXanViDz9IYvk0t%2FJGM0hqJFBWXBs7iy%2Bn9surOWE7RpqMoe666B%2BqVLCa8MwnRrtGuBtU6GRUDPJ8fnVTZhN3VpvGyp1VaJiEVSuk6qKY62Ca%2FP8zrg0LkxpzsIxo%2FUeHkKyWsPS0UlbVbHdbtcKDb4EAFGQ4mVM21%2FMi0ybVUWhnxetHMERNP%2F1ACWs2Zf31OGs%2FOxuEa%2BhpS7DC0OpMKVsuLPGNs7agdapbvMXaSEZtWUWgcNQ%2Bh8eXxPJYdOpbqQDtQ20kC3IWrWi2Z6IoxtW%2FhioHTDULOAFuuCxRO1CUxIAh28G8uiI0hUtpm7qVRjNVbWkRUws0C72WtJxNS5Eh2FFNQ0o5dmEwyMn7NsTCpi7ZSTTNPDuxeB3cBImxegsRPZ91RH1Bh2VYsPGudycbqW9FdU37PFdgo0UfOuvpl%2B7CQuSpbTnwSzV616ukSuDmRQo%2FfY7iOQUMPWWXR63Yaf%2BmtQwIhNrohSRz3d60RvuMbbVCqUlEdzZZeiE%2BeJYxSgRSZB%2F3zdyuxzN3J83ofpz%2BWT3HylW6QzO5T0PQ2b30ILMbQldUH81LZUum38aQ7qocN3VwJwfGyjXtJg4Ix1lMSLy3J2dA9l39uGwBTu3TRUPoPF4GoNf7%2BaDCGZmxuHQvhgPZJJOueLwc0H3ypOeEa9V0x7WF%2B4YXVtRGoAMFzZNhLIT3804lJy4ZhzgNxjUNtWTDmtgOHEpLl8dcDAzgft1DcofjAnM6L1MAZuQlHIYctl1bRGcMHgliRsVNWKRTqXUr1Ibs7QM8u2gzot433X41KS1Qyl2naGtR8X2nku2LSgkHh95vBn59pt2U%2BnT3EsqOX8ZIiuL%2BjzwkN9z7BT1%2F9XhMh1%2FuUTZlKqJX0ybEiJx8RKtXUaKNrkh9E0daHq16pZxOlwOEoPBDn0lsutbqol3k2R7daG5FDb6ju%2FLgC6fmhI%2FefJTTrVWmsai%2BzULIoRwOCDKTpdjTZofUAH1bbalEoqXouMpFMLM7QfrK%2BMO1b8VIK8TW6QJ7L7yus9tzfjuFAAWX%2B3Lg7TzdfNTZntd1XZY7sTjMGZU5TwXV0atznbHkrPHom3BmcHV2F5SA3THQ6xekD2qUWDR2IiHDaTOpES%2FEc%2Fe1D0OGTuipMMyAocma4eDrYG0zZ81rlAbmqMNI3LXIuR7lkB5aq9yEr9rd2j9DhMC3qliLB7Z3n%2F%2BEgNL4vm8cMHtFR0R%2F4Mjp1%2BITVGKS2EF2s2dbR5AiNa3nfdvZM8tSXov9ZO%2Bu6N4PLAuVSQ2byx8FegGuZ83BZeMWd4ImxYg4eUksiNNPfPLN1lKuTe%2BLqS8ddkn%2BRGoNVXH1xM2v52Ijs7yK47S7%2Fd%2Bw6jutTRt%2B12mG6EOLZedJ1AmdjnLTlkCFjqKOhL0KqAUn4OWH9NDOjQsi61HDY%2BRa%2FgFPRCNva2asfGHI3wh0lfR8RUwHBUBnUBJN6ZEe4yoVRMArTJIhZ9gY1PpdbQCQrbJq5o4r3WNzP3pF9u50N2Y0%2Fu%2BoV8Cwtma5hcYSdvm%2FevueRJQ%2FXWmWN4%2F68PAsEQCJh5oml6CMEUwLEMTxEww5Bc8TwuQ2yuCO336xlhFdhldtE1c61XS7kbJbNY40Hl9T6m2THsFlvCxOjA5SUcAtlvo2%2B23tUD5qKwlpMbRZHhYLV9HZ48wIkE1G1lAQjGuO3BRDRNRfkFQOjESI5heXo21qG9ZYIOxpAaPZI8ICKGHeWRbUKkqpJcZMbc4LoEzMm8nFl62saIxgj0ujQJ7q42YolOPMTKfiH4%2FnGuCojDjScjDfe2gN5EXH%2FTtA4wV8grneqMDJwTbVZR%2F4tDsI2bGFY4zLxiIk7AAxbjLhDBsZDMCH%2BhtpzjRGxYox%2BSNnr8ByPbQC%2FdJv9YHKVymgtxDcuNwsEvYpY2wyr1wOgDizF2n1T%2BhLKQyJ0ZIGPQLKNQYMkVQ2XMpNECKKqFLxf9KpZ0hj9jHV0dBNfrGbg%2FNaS1HGdF5keDcZg8YNo0UcGOUC5B%2FbHQpUNxRDyx5OhkB6fASomY8RVFmrMpESdCbFu2laWgzeLORXGy0mAmSVAy5FulJ1lLiXct%2FjTDK46YEGMqhYCy7CSrLDwD1Io5swlapIXpkT0ZNhsSewVQmbNJJlvjnNS%2B83w0CV6kXC%2BcrHtUXzPKJORmvq1HxpPZpFgbbU3jEiW3nQSdJzLRfSdjuHRsMmZTj805QViBBggbrJGCxhIQqCL%2FQBe8YaBWJaBZVM83nUCwh4TkdZKETaN8BJNwlvE3wYc3FbNIhhDucoMgIhIChHbGMdjgQ0k9oYN3gm2CxIVFvVUZUpyp2F4OEUTEoUV2FDEkNgcIeQdlEZpmnADVudBQjGEIMCJtniT031o6riWSepMA95kwNsCGBT%2FCnAWdPK%2FcuEWbatQW42ZffbkaEBHR82aYN9goUgTe9RSmnsGd4SclmDhDQis8ejnDDQ899UgJDHbz1Y210HPMD5HOEE9CZrKTEW4%2BGrgFcZ9UscQ%2BxeBXHHLOLaMESjEyaQWHc2RZyhIXZlGkofbwaARnMEgYgYc%2BMbJKDcfew4lX%2FCAn%2Fw56SC3IW0qt0IQenzigp0NRwDb7w6j9AdDKM5J5EgmLXhk4CBVlupvLVciOsEQvMUL5KZ7%2F0PTrjs0Wq2uJkeSFyQvLLSzlX%2BWG%2BpZK%2BNwxVr8j7Mtgrv%2F6Sp57OUw7gz6OPHLHAMlEzAmC6xmR1H8BThDFm%2BR6usoSZ%2FmBhp8k8HvxD0ldKxg1N0Y0KhDMZjFbzMWJ68g74tJGkY8tttRz1IGgt1y8kFDzCEJ%2FoIxRMetW6sMaRfmwKZ48AOuqRJdqW4UknHnH5U6hEoiD21O3ZiojM5M7AQBDlTaImmAp4ecpi68hDr9jFCxyPUY3u58Vv0KeReRltJHcZEfk9f%2BVH286bVcOGSoKd2bQEYIF23Tgm68IlHc0Mw6CEFHPgcOWgiwrwMx6n96gv2F05BeqPhfro9KcV9OaK2O7sUlgzrGuNk1p1pHWe9qpSD7ErCC%2FXoEqshHe%2BeO9zqWDOaRgnoy%2B8xgV6jHVqWTKsMUTY7xgxhrkXiAMj2NFBLzCItA1yzvS0xF3MCI%2FDInKX4UhigwINyKa7M9TMgPXtyR3uDQkrykbA9nwXOcIZeBBYCjknXVURhhB7UF4%2BkHPAEDyocLdIW2iy1Z44NUSGlKNe7UqRUJGhUE3UA8qbbnAM44iLJXdqCcra1mZxtM7BFBggLNLkhVd5zu8bU9odjD%2Fm5gu1zjgXKJaxfHUychXwJptpRcHuN9xPuGVAxigAT2D2piqx7GnBKqJCMTTKy7kwBxgjAr%2BsJgwmLiMfBzKCkJAy14ogSAF%2FcJyCMijHrWFHv%2BtEGJKkZbDMhgH7y2DfXl44LrKsr%2FXCKcufmxkE85yw0WZyDWDasUmLdAACjAgmA1gwEAKspUhwuFkTFgiExVkzF8hYZaiDGVttIQ3EkQHMI7EjS5iKCwtgfIAmzSABchZzmCWxEOw%2B0HDpqBGYzzxhfv4H2GKFYEDsAQw9ENMLqGhmklEJGtsiAIUcNDLAhggoRZYKDHTaUx7FMZRbikOo2p5zAEhiUf0nBzW%2F5J0rD8QdI2cYeYFBhcdJSaTBwtYADkNgNCEJrShxbRkdEwaA3yywoLo88sxRsVHsRHmMWWiUYY81jCq0CBdC7PWss43AwIYAAEIkABLYWoAmW6DIZJwg2FuiZXbjbGMIZmVFe8Cq0Dkj0zzkuNEKEQikO4yACvtBlWtGkyszkIRSrHJclaDH%2FvNzyAXUIZ3Sio0wDBHcBz56EVTebsO1QUIsSyCAhagAKlKIKYMoEAWRahXF02lE5XoDx0KVjePecaSoNgZlYbwoA4mMVQjgkLQAmABBjjAAZedQGYXwJCpLgCd2qJFiCYgJBkwC3Nuw8JD2Zk0%2BcT2jXi5luDUhv9U4CBMNrOyQRSAsVAL5NYBsnEAAywQgAM8QAIK6GzckNvKMXGJheOAJ2FK9UE%2B%2BC9lQ5iOs6w4HuKUoy43uKsDFmrOcnZDnOu9UhjXsil80KwXD8hgFPZWXeROqDUkTdfwkkAKUC2BSJPIUGSwggDckpehwQSvA8QpAfau7gUTK5fJrCFElNT2i6FyWe9EOb1e9biF1iRWmHTgkxhyDgHfLWdLD7wACYBnLrkSAlDFkhSTVYZs9yOymcaIBvjwkRdkoAxNpPdWuBZVIwioakJf2uQnR7kp4hiFKSR1tUd49XId7tI1fTy9I8dhyP%2Fx064mlGaNCCCzVn0pQp8MZX7%2FfRaZPxJJEy46KOrVOQ1AWINZ73Bh8iDRMyPiNFrE7DtgsdmlBlgAVFeq3jinM9I1gyQnbgCo1lHjmOs7A0yO4R0eAToObdggbXC8Rk44cGQVwOOiLbBSy6r3sj0zRg%2BUi8JA%2FctVzTPKHh4VrwaTIik0QSx5oqDOlKHs1LGTq1VhulIFKEACr552gWplQkbYmmALZA6oQQGfZB1rU4I8X0DPHIRLu7CDpCPymlfa6Ce7eqqwLmZTg7jlq62mSLEaToXeGzHWLCHfc6Ipaht1v1CXyL%2BtURBwV83mBUyVh1K%2BU2A%2BTItVsdNaNwlpBReysIByFRxpBk02soHNpQml%2Fw1M3XB9IHOJikpFAFPt7QIQWs54TzyrE25BOZBo0pgxcXBxcYh2G7bNRbhkIkgHB5YUeRzCnbc22UBA0dH79jDUnau64PpesOSSqvq26JhlqcMLYHiEwljK6M17cvj%2BdqnS%2Fe0ukZLfGVL3uhPO8nG5PObT7vi40B3ym6c75%2B8u%2BIYUPQyRzwZLDZ9QyE%2B96gidfZt%2FqbG6S9XueF986hcveq06U%2Bp453zoYd%2F7bFieqrlffe8hL07fgx720kcA73kffd8Xf%2FOgD%2B45GTB1eS%2FgtrdVqDmvqrHpk5700S%2F%2B8kWvfvSyH%2F3yz%2F3cEwpzyEN5%2Fu2Xfv71L%2F%2F1w17%2Bsf%2BU%2BCkUtNVV%2BbVbHgmXnEkc%2Fvlf%2F%2Fkf%2F0EgZkmcvGGWBU6Vu6mXq1lg%2FsnbB%2FYfCIpgB4agCKLfBhpgVa2YBlaWQhnYdykgA4SQLEgdCcbbB36fCU7dDkLgBI7gD37gDdaVBRTASmngCMabEIKgEiahEsqbE44gq7lUARBAvLXZ4SVgArpeQnWStoggvIEhvC3hE34hEP5gGIJhEEYbvBlhSxkYORngGqLhHILhs9FhGsphHV7hw83eFqqa%2FaXaFCZU4jUFAojhHYphHt7hGp4hIt5hm8EUDNqhI87hSkGVSxGAJVoWJSoAAfSh62EhJk7h4WWi7LnZ7BFiSSTAKrL%2FYiu64ivCYizK4iyyYpO1mwUgQC68SQLQXQIMACwOAJuFotUdgDzEojzA1OGd4jIqY1St2R%2F%2BIXsdQCqegAOw1wJhYzZq4zZy45uI0y2imG8NwCYhQDZWXTJu4UvNVTUAzjcqo%2Bu1Xjq%2BYxFC3rNFowlIFQUkwBfklj6aQDcCZEAKZBqk2nehmA6kWMnAgAS8VDlhoZtVHcypRT0o2h4iVLzJHjo2Yw%2BeYwF0Vm4RQAJw1go4QAUQQDdgwA%2BFEQVVA77kj9FQxhQ1A5gxwQGo4Erd1QsaWIJlAgK4mUYyWkJBmfLZnQAogDwa3rtV1kO%2BYxVypEttFgWUpOyJJGdx%2F9YBlGQmXqXkcWVXeuVXgiVDfKPLsVRulddtrVhuLR5DuNQbjuIowuOzGaE4ZSJQymXhzWMROhr%2BURVCEQABgGReFoACgCSrFUAEImZiKub0gd9dLhn5lR%2B0CaIbwiXtsdpfemKjuZxd3qUpKmMpOiEbXqZuKeMqHh5hOkAmeiInsmZruuYddma7uRmTGcBfDmOb2eZnluKzYaZqzuNfdmbr9eZuVuIC6KNUHmUBrGIWLScC5JZHchZVBed0Umd1Wud13uVwyiYk1mZuDmdvNuVw8mZuhidwjud3mmdwSoAJkKZIqgBWPoBHmoAEoGd92ud94md%2B4ueidad%2Baqfh%2BWlngAroX65nSiKAe3qBAxxoZ9HngDrog%2BanbFoAhGYmhVpobxZog1AjPrKXVXroh4IoiGIndaZhiJqoVTZAu%2F3SibJoi7roi8LohsbIjNLoXHhoA9hejerojvJoj%2FroIVBAF%2F7okMZICAAAOw%3D%3D';


//////////////////////////////////////////////////////// VARIBILI DEL FILE ////////////////////////////////////////////////////////////

var start = '<div id="topnews"></div><div id="newnews"></div><div id="lamp"></div>'+
'<script type="text/javascript">var setling = "'+setling+'";</script>'+
'<script src="http://leonardosite.altervista.org/travianer/file/travianer-plus/var-travianer-plus.php" type="text/javascript"></script>'+
'<div style="display: block; position: absolute; vertical-align: middle; padding: 2px; top: 0px; left: -5px; width: 0px; height: auto; z-index: 1; background: url(img/chatbg.jpg); text-size: 11px; color: rgb(114, 57, 0); text-align: left;" id="interfaceDivAddOn">'+
'<img src="img/gold/interface_top2.gif" style="position: absolute; top: 0px; left:245px";>'+
// dimensioni originali della mappa di destra width="119" border="0" height="34"
'<img src="img/interface_right_top_map.gif" style="position: absolute; top: 0px; left:740px" width="135" border="0" height="34">'+
'<a href="http://userscripts.org/scripts/show/77244" target="_blank"><img style="position: absolute; top: 5px; left: 264px;" src="img/icons/supporticon_house.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Script homepage\');"></a>'+
'<a href="http://leonardosite.altervista.org/travianer/file/travianer-plus.user.js" target="_blank"><img style="position: absolute; top: 5px; left: 295px;" src="img/icons/levelup.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<h3>'+ling[setling]["vers1"]+'</h3>'+ling[setling]["vers2"]+'<b>'+datiscript["versione"]+'</b><br>'+ling[setling]["vers3"]+'<b>\'+lastversion+\'</b><br>\');"></a>'+
'<a href="http://www.traviantrucchi.org/it/viewforum.php?f=55" target="_blank"><img style="position: absolute; top: 5px; left: 326px;" src="http://redevilserver10.altervista.org/script/TT_traviani.png" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<b>Script info</b><br>'+ling[setling]["tt"]+'\');"></a>'+
'<a href="http://leonardosite.altervista.org/contattami.php" target="_blank"><img style="position: absolute; top: 5px; left: 750px;" src="img/icons/supporticon_guide.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Script support <br> '+ling[setling]["support"]+'</small>\');"></a>'+
'<img style="position: absolute; top: 5px; left: 781px;" src="img/icons/supporticon_team.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(team_tp);">'+
'<img style="cursor: pointer; position: absolute; top: 5px; left: 812px;" src="img/icons/questlog.gif" width="25" border="0" height="25" id="newstp" onclick="collapseChatGroup(600);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<center><b>'+ling[setling]["newsbar1"]+'</b></center><br>\'+news+\'<br><br><small>'+ling[setling]["newsbar2"]+'</small>\');">'+
'<img src="http://leonardosite.altervista.org/travianer/file/plus-title.gif" id="tplogo" style="'+displaylogo+' position: absolute; top: 60px; left: 370px" width="384" border="0" height="50";>'+
'<div id="X" style="'+displaylogo+'"><img src="img/x.gif" style="cursor: pointer; position: absolute; top: 72px; left: 727px; z-index: 40;" width="15" height="15"  onmouseout="hideToolTip();" onclick="lampon(); hideToolTip();" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["off"]+'\');" /></div>'+
'<div id="setting"><img src="http://leonardosite.altervista.org/travianer/file/ingr.png" id="setting_parent" style="position: absolute; top: 4px; left: 843px; width: 25px; height: 25px; cursor: pointer;" onclick="collapseChatGroup(100);" ></div>'+ //onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Impostazioni Traviner-Plus\');"/
'<div id="setting_child" class="setting_child" style="visibility: hidden; width: 180px;">'+
'<a class="settingmenu" onclick="collapseChatGroup(100);" >'+ling[setling]["contr"]+'</a>'+
'<a class="settingmenu" style="position: relative; top: 2px;" onclick="collapseChatGroup(170);">'+ling[setling]["about"]+'</a>'+
//'<a class="settingmenu" style="position: relative; top: 4px;" href="javascript:alert(\'Item 3\');">Item 3</a><br>'+
'</div>'+
'<script type="text/javascript">'+
'at_attach("setting_parent", "setting_child", "hover", "y", "pointer");'+
'</script>'+
'<div id="avvisiextra1"></div>';




var principalbar = '<div id="TitleName" class="chatHeader" style="position: absolute; top: '+bartop+'px; left: 390px; width: 330px; height: 20px; border: 2px solid green; background: url(img/window_middle.gif); text-size: 11px; color: rgb(114, 57, 0); text-align: right;" id="interfaceDivAddOn">'+
'<div id="chatGroupDiv7" style="display: block;">'+
'<a onclick="xajax_scriptCall(\'showDialog\',108,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/weapons/potionB2.gif" id="matricia_pozioni" style=" position: absolute; top: -3px; left: 1px" width="24" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["dpoz"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',55,\'1#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/icons/Icon_trade.gif"  style=" position: absolute; top: 1px; left: 26px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["dtas"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',226,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/items/inventory_cookedfish.gif" style=" position: absolute; top: -3px; left: 45px" width="26"  height="26" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["dpes"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',178,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/items/inventory_mushroomragout1.gif" style=" position: absolute; top: -3px; left: 70px"  width="26" onmouseout="hideToolTip();" height="26" onmouseover="showToolTipText(\''+ling[setling]["dfun"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',478,\'8#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/forum.gif" style=" position: absolute; top: 0px; left: 98px"  width="18" border="0" height="22" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["dcar"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',479,\'9#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="http://www.iagi.info/ARALDICA/gentilizia/reali/prussia.gif" style=" position: absolute; top: -3px; left: 121px" width="22" border="0" height="22" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["dcor"]+'\');"'+
'<a onclick="xajax_showModule(\'settings\',\'account\',\'\'); return false;" <img src="img/icons/Icon_settings.gif" style=" position: absolute; top: 1px; left: 146px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["sitt"]+'\');"'+
'<a onclick="xajax_showModule(\'guild\',\'transfer\',0); return false;" <img src="img/icons/Icon_guild.gif" style=" position: absolute; top: 1px; left: 168px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["ddon"]+'\');"'+
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="img/icons/Icon_friendtree.gif" style="cursor: pointer;  position: absolute; top: 1px; left: 190px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["amic"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><a onclick="xajax_showModule(\'miniGame\',\'list\',\'-5\')" return false;"><img src="img/icons/Icon_minigame.gif" style="cursor: pointer; position: absolute; top: 1px; left: 212px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["game"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'tooltrader\',\'\',\'\'); return false;" <img src="img/icons/Icon_tools.gif" style=" position: absolute; top: 1px; left: 234px" width="20" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["datt"]+'\');"</a>'+
'<input id="s10" type="button" value="" onclick="selectAll(\'mailform\');" name="s10" style="background-image: url(img/icons/Icon_mail.gif); filter: alpha(opacity=100); border: 0px solid; cursor: pointer; position: absolute; top: 1px; left: 256px; background-color: transparent;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mess"]+'\');"</a>'+ 
'<img src="img/icons/Icon_inventory.gif" style="float: right; position: absolute; top: 1px; left: 278px;"onclick="collapseChatGroup(16);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["on/f"]+'\');"/>'+
'<a onclick="javascript:void(movementInterval=1); return false;"><img id="SuperVel" src="img/ani/catblack_walk_right.gif" style="position: absolute; top: -17px; left: 295px; width="32" height="36.57"" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["velc1"]+'<br>'+ling[setling]["velc2"]+'\');"/></a>'+
'</div>'+
'</div>'+
'<img src="img/icons/chat.gif" id="chatplusbotton" style="cursor: pointer; float: right; position: absolute; top: 550px; left: 1090px;" onclick="openchat();" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["chat"]+'\');"/>'+
'<img src="img/icons/ranking/players.gif" style="cursor: pointer; float: right; position: absolute; top: 570px; left: 370px; width: 25px; height: 25px;" onclick="collapseChatGroup(400);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["user"]+'\');"/>';



/*var split_menu = '<img style="position: absolute; top: 36px; left: 580px;" src="img/down.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Apri menu comandi rapidi\');" id="toggle_split_menu"/>'+
'<div style="display: none; position: absolute; padding: 16px; top: 55px; left: 575px; width: 132px; height: 166px; z-index: 97; background: url('+img_split_menu+'); text-align: left;" id="content_split_menu">'+
'<b style="color: black">Speed menu:</b><br/>'+
''+
'</div>';*/



var contatore = '<div id="MovSessionCONT"; style="position: absolute; top: 100px; left: 400px";>'+
'<div id="chatGroupDiv400" style="display: none; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif); height: 90px; width: 135px;">'+
'<div style="cursor: move; background-color:#C29246; border:1px solid #885305; color:#FFF3DB; font-weight:bold; height:20px; line-height:20px; margin-bottom:-1px; padding:0 2px; text-align:center;" onmousedown="toForeground(\'cont\');dragObjName=\'MovSessionCONT\'; functionMouseDown(event);" ondragstart="return false;"><b>'+ling[setling]["cont"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(400);"/>'+
'<IFRAME SRC="http://redevilserver10.altervista.org/script/contatoretp.php" width="135px" height="65px" style="overflow:auto; border: 0px;" ></IFRAME>'+
'</div>'+
'</div>'+
'</div>';
// http://redevilserver10.altervista.org/script/contatoretp.php




var barmenu = '<div id="chatGroupDiv16" style="display: block;">'+
'<div id="tp_menu_bar" class="chatHeader" style="position: absolute; top: '+menut+'px; left: '+menul+'px; width: 20px; height: 175px; border: 2px solid orange; background: url(img/window_middle.gif); text-size: 11px; color: rgb(114, 57, 0); text-align: right;" id="interfaceDivAddOn">'+
'<img src="img/forum/pin.gif" style="cursor: pointer; float: right; position: relative; top: 6px; left: -1px;" onclick="collapseChatGroup(15);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["dest"]+'\');"/>'+
'<img src="img/fight/att1.gif" style="cursor: pointer; float: right; position: relative; top: 10px; left: -1px;" onclick="collapseChatGroup(30);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["NPG"]+'\');"/>'+
'<img src="img/icons/Icon_social2.gif" style="cursor: pointer; float: right; position: relative; top: 14px; left: -1px;" onclick="collapseChatGroup(13);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["taverne"]+'\');"/><br>'+
'<img src="img/res/big_gold.gif" style="cursor: pointer; float: right; position: relative; top: 15px; left: -1px; width: 18px; height: 18px;" onclick="collapseChatGroup(12);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mergioc"]+'\');"/><br>'+
'<img src="img/icons/Icon_questlog.gif" style="cursor: pointer; float: right; position: relative; top: 19px; left: -1px;" onclick="collapseChatGroup(11);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linku"]+'\');"/><br>'+
'<img src="img/icons/interface_left_top_1.gif" style="cursor: pointer; float: right; position: relative; top: 23px; left: -1px; width: 18px; height: 18px;" onclick="collapseChatGroup(10);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bingo"]+'\');"/><br>'+
'<img src="img/res/big_corn.gif" style="cursor: pointer; float: right; position: relative; top: 27px; left: -1px; width: 18px; height: 18px;" onclick="collapseChatGroup(20);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["estrrisorse"]+'\');"/><br>'+
'<img src="img/icons/expired.gif" style="cursor: pointer; float: right; position: relative; top: 31px; left: -1px; width: 18px; height: 18px;" onclick="collapseChatGroup(21);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["automatizzazione"]+'\');"/><br>'+
'</div>'+
'</div>';




var minichat = '<div id="MovSessionMINI"; style="position: absolute; top: 247px; left: 880px";>'+
'<div id="chatGroupDiv71" style="display: none; solid aqua;">'+
//'<img src="img/icons/icon_tutorial.gif" style="cursor: pointer; float: right; position: relative; top: -20px; left: -183px;"  onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Info\');" onclick="popUp(\'http://leonardosite.altervista.org/travianer/travianer-plus-chat/legend.php\');" />'+
//'<img src="img/icons/Icon_query.gif" style="cursor: pointer; float: right; position: relative; top: -20px; left: -190px; width: 18px; height: 18px;" onclick="collapseChatGroup(70);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Apri chat avanzata\');"/>'+
//'<img src="img/icons/Icon_profile.gif" style="cursor: pointer; float: right; position: relative; top: -20px; left: 20px; width: 18px; height: 18px;" onclick="popUp(\'http://leonardosite.altervista.org/travianer/travianer-plus-chat/admin/\');" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Amministrazione chat (protetta)\');"/>'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif); height: 337px; width: 241px;">'+
'<div style="background-color:#C29246; border:1px solid #885305; color:#FFF3DB; font-weight:bold; height:20px; line-height:20px; margin-bottom:-1px; padding:0 2px; text-align:center;"><b>'+ling[setling]["tpchat"]+'</b><img src="img/del.gif" style="cursor: pointer; float: right; position: relative; top: 2px; left: -50;" onclick="closechat();" /></div>'+
'<div id="minichatplus">Chat</div>'+
//'<IFRAME SRC="http://leonardosite.altervista.org/travianer/travianer-plus-chat/minilogin.php?name='+user+'" width="241px" height="307px" style="overflow:auto; border: 0px;" ></IFRAME>'+
'</div>'+
'</div>'+
'</div>';




var control = '<div id="MovSessionCONTR"; style="position: absolute; top: 100px; left: 300px";>'+
'<div id="chatGroupDiv100" style="display: none;" class="functionDivDefault"><div style="background-image: url(&quot;img/gold/window_top.gif&quot;);" onmousedown="toForeground(\'contr\');dragObjName=\'MovSessionCONTR\'; functionMouseDown(event);" ondragstart="return false;" class="functionBar"><img src="img/gold/icons/window_settings.gif"><div class="moduleNameDefault" style="top: 22px;" id="moduleNamemail">&nbsp;'+ling[setling]["pctitle"]+' </div><div onclick="collapseChatGroup(100);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["chiudipc"]+'\');" class="functionDivClose"></div></div>'+
'<div style="overflow: auto; background-image: url(&quot;img/gold/window_middle.gif&quot;);" class="functionDivContent" id="IDContentDivchat"><div class="optionsMenu"></div>'+
'<h1 style="text-align: center;">'+ling[setling]["pch1"]+'</h1><br><br>'+
'<br><br>'+
'<table>'+
'<tr>'+
'<td><h3>'+ling[setling]["pclingtitle"]+'</h3>'+
//'<br>'+
//'<input type="button" class="tpbutton" value="'+ling[setling]["pchelpling"]+'" style="position: relative; top: -50px; left: 400px;" onclick="">'+
'</td>'+
'<td><select style="width: 200px; background-color:#FFF3DB; border-color:#A56505 #FCCC82 #FCCC82 #A56505; border-style:solid; border-width:1px; font-family:Verdana,Arial,Helvetica,sans-serif; font-size:11px; margin:0; padding:1px 3px;" id="lingua" name="lingua"><option value="0">------ Change languages ------</option><option value="it">Italiano</option><option value="en">English</option><option value="de">Deutsche</option></select></td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="changeling" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="changeling"></button></td>'+
'</tr>'+
'<tr>'+
'<td>'+ling[setling]["pcusername"]+'</td>'+
'<td><input style="font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;" id="nomeutentetp" type="text" name="nameuser" value="'+dati("user")+'" /></td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="registra1" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="changename"></button></td>'+
'</tr>'+
'<tr>'+
'<td>'+ling[setling]["pcdonon"]+'<img src="img/icon_question.gif" style="cursor: help; position: relative; top: 0px; left: 0px; width="15" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["pcdoninfo"]+'\');"><br><br><br><small>'+ling[setling]["pccor1"]+'<a onclick="collapseChatGroup(150);">'+ling[setling]["pccor2"]+'</a>'+ling[setling]["pccor3"]+'</small>'+
'</td>'+
'<td style="line-height: 20px;"><input type="radio" name="abilitaavv" value="s" '+check_value('attavvisi', 'checked="checked"', 's')+'/> '+ling[setling]["pcabi"]+' <input type="radio" name="abilitaavv" value="n" '+check_value('attavvisi', 'checked="checked"', 'n')+'/> '+ling[setling]["pcdis"]+'<br>'+
ling[setling]["pcavv"]+': <select style="background-color:#FFF3DB; border-color:#A56505 #FCCC82 #FCCC82 #A56505; border-style:solid; border-width:1px; font-family:Verdana,Arial,Helvetica,sans-serif; font-size:11px; margin:0; padding:1px 3px;" id="giornoavv" name="giornoavv"><option value="1" label="Lunedì" '+check_value('day', 'selected="selected"', '1')+'>'+day[setling][1]+'</option><option value="2" label="Martedì" '+check_value('day', 'selected="selected"', '2')+'>'+day[setling][2]+'</option><option value="3" label="Mercoledì" '+check_value('day', 'selected="selected"', '3')+'>'+day[setling][3]+'</option><option value="4" label="Giovedì" '+check_value('day', 'selected="selected"', '4')+'>'+day[setling][4]+'</option><option value="5" label="Venerdì" '+check_value('day', 'selected="selected"', '5')+'>'+day[setling][5]+'</option><option value="6" label="Sabato" '+check_value('day', 'selected="selected"', '6')+'>'+day[setling][6]+'</option><option value="0" label="Domenica"  '+check_value('day', 'selected="selected"', '0')+'>'+day[setling][0]+'</option></select> <br>'+
'SP: <input style="font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;" type="text" name="stelleavv" value="'+dati("stelleavv")+'" id="stelleavv" /><br>'+
ling[setling]["pcris"]+' <input style="font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;" type="text" name="risorseavv" value="'+dati("risorseavv")+'" id="risorseavv" />'+
'</td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="impostaavvisi" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="impostaavvisi"></button></td>'+
'</tr>'+
'<tr>'+
'<td>'+ling[setling]["pclogo"]+'</td>'+
'<td><input type="radio" name="logotpvis" value="" '+check_value('displaylogo', 'checked="checked"', '')+' /> '+ling[setling]["pcvis"]+' <input type="radio" name="logotpvis" value="display: none;" '+check_value('displaylogo', 'checked="checked"', 'display: none;')+'/> '+ling[setling]["pcnvis"]+'</td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="displaylogo" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="displaylogochange"></button></td>'+
'</tr>'+
'<tr>'+
'<td>'+ling[setling]["pcnote"]+'</td>'+
'<td><input type="radio" name="notetpvis" value="true" '+check_value('visualizza_note', 'checked="checked"', 'true')+' /> '+ling[setling]["pcvis"]+' <input type="radio" name="notetpvis" value="false" '+check_value('visualizza_note', 'checked="checked"', 'false')+'/> '+ling[setling]["pcnvis"]+'</td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="displaynote" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="displaynotechange"></button></td>'+
'</tr>'+
'<tr>'+
'<td>'+ling[setling]["pcimg"]+'</td>'+
'<td><input type="radio" name="abilitaimg" value="s" '+check_value('goldimg', 'checked="checked"', 's')+'/> '+ling[setling]["pcimgon"]+' <input type="radio" name="abilitaimg" value="n" '+check_value('goldimg', 'checked="checked"', 'n')+'/> '+ling[setling]["pcimgoff"]+'</td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="impostaimg" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="impostaimg"></button></td>'+
'</tr>'+
/*
'<tr>'+
'<td></td>'+
'<td></td>'+
'<td style="text-align: center; vertical-align: middle;"></td>'+
'</tr>'+
*/
'<tr>'+
'<td>'+ling[setling]["pcmenu1"]+'<br>'+ling[setling]["pcmenu2"]+'<br>'+ling[setling]["pcmenu3"]+'</td>'+
'<td>top: <input style="font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;" id="menutnew" type="text" name="menutnew" value="'+dati("menut")+'" /> default: 270<br>left: <input style="font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;" id="menulnew" type="text" name="menulnew" value="'+dati("menul")+'" /> default: 853</td>'+
'<td style="text-align: center; vertical-align: middle;"><button name="registra2" value="" type="button" style="background-image:url(img/lang/it/ok.gif);width: 50px; height: 20px; border: 0px solid transparent; background-color: transparent; cursor: pointer;" id="changemenupx"></button></td>'+
'</tr>'+
'</table>'+
'</div><div style="background-image: url(&quot;img/gold/window_bottom2.gif&quot;);" onmousedown="toForeground(\'contr\');dragObjName=\'MovSessionCONTR\'; functionMouseDown(event);" ondragstart="return false;" class="moduleFooter"></div></div>'+
'</div>'+
'<div id="testopersonale" style="display: block; position: relative; top: 0px; left: 0px;">'+
'<div id="MovSessionMTP"; style="z-index: 40; position: absolute; top: 170px; left: 300px; width: 300px; text-align: center;"><div id="chatGroupDiv150" style="z-index: 40; display: none; text-align: centre; solid aqua;"><div style="z-index: 40; position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);"><table class="popupTable" cellspacing="1" celpadding="1" style="z-index: 40; "><thead><tr><td colspan="1" style="cursor: move;" ondragstart="return false;" onmousedown="toForeground(\'mtp\');dragObjName=\'MovSessionMTP\'; functionMouseDown(event);">'+ling[setling]["pcmesstitle"]+'</td></tr></thead></table><img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(150);" />'+
ling[setling]["pcmessch"]+'<br><textarea id="testopers" name="testopers" cols="30" rows="5"><b><center>Attento!!!</center></b><br>Oggi devi donare alla tua gilda <1> <img src=\"img/res/social.gif\" onmouseout=\"hideToolTip();\" onmouseover=\"showToolTipText(\'SP\');\"> e <2> Risorse!!!!</textarea><br>Indice: <1> = stelline impostate, <2> = risorse impostate;'+
'</div></div></div>'+
'</div>';



var dest = '<div id="MovSessionDest"; style="position: absolute; top: 80px; left: 400px";>'+
'<div id="chatGroupDiv15" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'dest\');dragObjName=\'MovSessionDest\'; functionMouseDown(event);"><b>'+ling[setling]["desttitle"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(15);"/>'+
'<img src="img/icon_question.gif" style="cursor: help; position: relative; top: -16.5px; left: 15px; width="15" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["desthelp"]+'\');">'+
'<form style="color: white; font-size: 12px; border: 2px solid red; width: 200px;">'+
//SUPER VELOCITA
'<a onclick="javascript:void(movementInterval=1); return false;"><img src="img/ani/germane_dogmask_right.gif" style=" width="29" border="0" height="29" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destvel"]+'\');"'+
//CASA
'<a onclick="xajax_changeLocation(BGlocation, BGlocationRoom, BGlocationOwner, -1, 0, -1, 0); return false;"><img src="/img/achievements/Icon_hausundhof2b.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["desthome"]+'\');"'+
//ARENA
'<a onclick="xajax_click(7590, 5223, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/achievements/Icon_kampf2b.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destarena"]+'\');"'+
//MERCATO
'<a onclick="xajax_click(6886, 5311, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/icons/chaticon_ress1.gif" style=" width="62" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destmerc"]+'\');"'+
//CERCARE ERBE
'<a onclick="xajax_click(6090, 5120, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/ani/gallier_flower_a.gif" style=" width="38" border="0" height="50" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["desterbe"]+'\');" '+
//CERCARE FUNGHI
'<a onclick="xajax_click(7507, 4600, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/ani/germane_mushroom_a.gif" style=" width="38" border="0" height="41" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destfung"]+'\');"'+
//MATRICIA
'<a onclick="xajax_click(8196, 4751, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/matricia/Matricia_l_stand.gif" style=" width="30" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Matricia\');"'+
//KARAMIX
'<a onclick="xajax_click(7615, 5705, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/karamix/Karamix_r_stand2.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Karamix\');" '+
//TOMBO AL PONTE PER LA GALLIA
'<a onclick="xajax_click(5560, 6124, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);;"><img src="img/bg/objects/people/Tombo_stand.gif" style=" width="34" border="0" height="51" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Tombo\');"'+
//ISOLDE
'<img src="img/bg/objects/people/Isolde/Isolde_l_stand.gif" style=" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Isolde\');"'+
//PIUL (FUNGHI)
'<a onclick="xajax_click(4686, 6947, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/pilou/Pilou_l_stand.gif" style="width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Piul\');"'+
//JOLAISUS
'<a onclick="xajax_click(7950, 6980, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Jolaisus/Jolaisus_r_stand.gif" style=" width="25" border="0" height="38" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Jolaisus\');"'+
//BRUGHIERA-ROSA
'<a onclick="xajax_click(6312, 5592, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Heiderose/Heiderose_r_stand.gif" style=" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Brughiera-Rosa\');"'+
//LORENA
'<a onclick="xajax_click(9260, 6471, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Lorena/Lorena_r_stand.gif" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Lorena\');"'+
//AURORA
'<a onclick="xajax_click(7200, 6720, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/sieglinde/Sieglinde_l_stand.gif" style=" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Aurora\');"'+
//PENEPALUS
'<a onclick="xajax_click(8038, 5344, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Penpalus/Penpalus_l_stand.gif" style=" width="38" border="0" height="51" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Penepalus\');"'+
//UFFICIO DELLE IMPOSTE
'<a onclick="xajax_click(7178, 4790, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/magistrate/Magistrate2_l_stand.gif" style=" width="34" border="0" height="46" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destimp"]+'\');"'+
//FABRO DI PRECISIONE
'<a onclick="xajax_click(7575, 5376, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="http://img442.imageshack.us/img442/2632/smithrstand.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destprec"]+'\');"'+
//Eilix
'<a onclick="xajax_click(209, 274, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Eilix/eilix_r_look.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eilix\');"'+
//TIZIO BLAK JAK
'<a onclick="xajax_click(7932, 5202, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Blackjack_l_cards.gif" style=" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Blak Jak\');"'+
//PALUDE (TESORI)
'<a onclick="xajax_click(8575, 5506, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_gold.gif" style=" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["desttes"]+'\');"'+
//BANCA
'<a onclick="xajax_click(4328, 7003, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/sell.gif" width="40" border="0" height="40" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Banca\');"'+
//PROPRIA GILDA
'<a onclick="xajax_click(5631, 5444, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/misc/11,10_palace.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destgilda"]+'\');"'+
//ZONO TEUTONICA (CONFINE)
'<a onclick="xajax_click(9421, 4417, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/ani/germane_stand.gif" style=" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destteut"]+'\');"'+
//MARE ROMANO (CONFINE)
'<a onclick="xajax_click(10413, 6880, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/ani/roemer_stand.gif" style=" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destrom"]+'\');"'+
//ZONA GALLICA (CONFINE)
'<a onclick="xajax_click(5560, 6124, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/ani/gallier_stand.gif" style=" width="34" border="0" height="34" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destgal"]+'\');"'+
//ZONA PROIBITA
'<a onclick="xajax_click(4391, 4774, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="http://img163.imageshack.us/img163/9472/cellarportal2a.gif" style=" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destproi"]+'\');"'+
//GAJA
'<a onclick="xajax_click(8185, 7430, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Vendor_r_stand.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Gaja\');"</a>'+
//ENIGMA
'<a onclick="xajax_click(8881, 7494, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/riddles/Enigma_l_stand.gif" width="30" border="0" height="35" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Enigma\');"</a>'+
//FELIDA
'<a onclick="xajax_click(6434, 5652, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/catwoman/Catwoman_l_stand.gif" width="23" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Felida\');"</a>'+
//TROJA
'<a onclick="xajax_click(5070, 7003, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/riddles/Troja_l_stand.gif" width="25" border="0" height="32" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Troja\');"</a>'+
//EULALIE
'<a onclick="xajax_click(10413, 6880, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/Eulalie/Eulalie_l_stand.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Eulalie\');"</a>'+
//LABIRINTO
'<a onclick="xajax_click(5564, 4438, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/buildings/9,10_house.gif" width="30" border="0" height="30" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["destlab"]+'\');"</a>'+
//Edelweiï¿½
'<a onclick="xajax_click( 7561, 4955, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/edelweiss/Babydruid_r_meditation.gif" style=" width="15"  height="33" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Edelweiï¿½\');"</a>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var npg = '<div id="MovSessionNPG"; style="position: absolute; top: 80px; left: 500px";>'+
'<div id="chatGroupDiv30" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'NPG\');dragObjName=\'MovSessionNPG\'; functionMouseDown(event);"><b>'+ling[setling]["npgtitle"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(30);" />'+
'<img src="img/icon_question.gif" style="cursor: help; position: relative; top: -16.5px; left: 10px; width="15" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npgsubitle"]+'\');">'+
'<form style="color: white; font-size: 12px; border: 2px solid blue; width: 150px; text-align: center;">'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-60\'); return false;"><img src="/img/icons/complaint.gif"onmouseout=" hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npgblog"]+'\');"</a>'+ 
'<br/><br>'+
'<a onclick="xajax_click(7606, 5332, 7610, 5334, \'fight<go<-39#-39#-39#-39\', 0, 0, 0, 0, -1, 0, 0); return false; "><img src="http://img704.imageshack.us/img704/2917/combattentig.gif" style=" position: relative; left: -10px; top: -0" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npgauto1"]+'<br>'+ling[setling]["npgauto2"]+'<br><br>'+ling[setling]["npgauto3"]+'\');"</a>'+
'<br>'+
'<a onclick="xajax_click(6271, 5260, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter4/Fighter4_stand_l.gif" width="29" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg1"]+'\');"'+
'<a onclick="xajax_click(7005, 4521, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter3/Fighter3_stand_l.gif" width="26" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg2"]+'\');"'+
'<a onclick="xajax_click(7716, 4366, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter2/Fighter2_stand_r.gif" width="38" border="0" height="46" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg3"]+'\');" '+
'<a onclick="xajax_click(8648, 4975, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter1/Fighter1_stand_l.gif" width="26" border="0" height="39" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg4"]+'\');"'+
'<a onclick="xajax_click(8826, 5595, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter11/Fighter11_stand_l.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg5"]+'\');" '+
'<a onclick="xajax_click(8033, 5563, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter5/Fighter5_stand_l.gif"  width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg6"]+'\');" '+
'<a onclick="xajax_click(7731, 6151, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter9/Fighter9_stand_l.gif"  width="26" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg7"]+'\');"'+
'<a onclick="xajax_click(7040, 6533, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter8/Fighter8_stand_l.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg8"]+'\');" '+
'<a onclick="xajax_click(6321, 7308, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter10/Fighter10_stand_l.gif" width="26" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg9"]+'\');" '+
'<a onclick="xajax_click(6295, 6483, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="/img/bg/objects/people/fighter/fighter7/Fighter7_stand_l.gif" width="42" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["npg0"]+'\');"></a>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var tav = '<div id="MovSessionTAV"; style="position: absolute; top: 100px; left: 125px";>'+
'<div id="chatGroupDiv13" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'tav\');dragObjName=\'MovSessionTAV\'; functionMouseDown(event);"><b>'+ling[setling]["tavtitile"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(13);" />'+
'<img src="img/icon_question.gif" style="cursor: help; position: relative; top: -17px; left: 10px; width="15" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tavhelp"]+'\');">'+
'<form style="color: white; font-size: 12px; border: 2px solid silver; text-align: center; width: 150px;">'+
//TAVERNA di STAN
'<a onclick="xajax_click(5058, 6550, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Stan_l_stand.gif" style=" position: relative; top: -1px;" width="26" border="0" height="39" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav1"]+'\');"'+
//TAVERNA SENKEL
'<a onclick="xajax_click(7022, 4905, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/senkel/Senkel_l_clean_b.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav2"]+'\');"'+
//TAVERNA ALA FRONTIERA TEUTONICA
'<a onclick="xajax_click(8724, 5195, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper3_l_clean_c.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav3"]+'\');"'+
//TAVERNA VICINO A KARAMIX
'<a onclick="xajax_click(7615, 5705, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper2_l_clean_b.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav4"]+'\');"'+
'<br/>'+
//TAVERNA ALLA FRONTIERA GALLICA
'<a onclick="xajax_click(6165, 6018, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper4_r_stand.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav5"]+'\');"'+
//TAVERNA VICINO ALLE ROVINE DI TORRE
'<a onclick="xajax_click(6893, 7105, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Innkeeper1_r_stand.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav6"]+'\');"'+
//TAVERNA ROMANA
'<a onclick="xajax_click(9978, 7262, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/bg/objects/people/Innkeeper/Hula_l_stand.gif" style=" position: relative; top: -1px;" width="34" border="0" height="42" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["tav7"]+'\');"></a>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var merc = '<div id="MovSessionMER"; style="position: absolute; top: 150px; left: 450px";>'+
'<div id="chatGroupDiv12" style="display: none; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'mer\');dragObjName=\'MovSessionMER\'; functionMouseDown(event);"><b>'+ling[setling]["merctitle"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(12);" />'+
'<form id="offerform" style="line-height: 20px; width: 250px;" name="offerform" onsubmit="javascript:xajax_formSubmit(\'trade\',xajax.getFormValues(\'offerform\'));" action="javascript:void(null);" method="post">'+
'<input type="hidden" value="offer" name="action">'+
'<br>'+
ling[setling]["mercric"]+' <input type="text" value="" class="text" name="dest" onkeyup="autocomp.key(this, arguments[0]);" autocomplete="off" id="playerSearchField">'+
'<br>'+
ling[setling]["mercquant"]+' <input type="text" class="text" onkeyup="this.value=this.value.replace(/^0*/, \'\');calculateTax(document.getElementById(\'offerAmountSelector\').value*document.getElementById(\'offerMultipleSelector\').value);" id="offerAmountSelector" name="amount">'+
'<br>'+
ling[setling]["mercris"]+' <select id="res_type_selector" name="restype" class="dropdown"><optgroup label="'+ling[setling]["prim"]+'"><option id="default_res" value="1">'+ling[setling]["legno"]+'</option><option value="2">'+ling[setling]["argilla"]+'</option><option value="3">'+ling[setling]["minerale"]+'</option><option value="4">'+ling[setling]["grano"]+'</option><option value="5">'+ling[setling]["farina"]+'</option></optgroup><optgroup label="'+ling[setling]["second"]+'"><option value="6">'+ling[setling]["carbone"]+'</option><option value="7">'+ling[setling]["assi"]+'</option><option value="8">'+ling[setling]["mattoni"]+'</option><option value="9">'+ling[setling]["ferro"]+'</option><option value="10">'+ling[setling]["pane"]+'</option></optgroup></select>'+
'<br>'+
ling[setling]["mercper"]+' <input type="text" style="width: 30px; font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;" onchange="calculateTax(document.getElementById(\'offerAmountSelector\').value*document.getElementById(\'offerMultipleSelector\').value);" id="offerMultipleSelector" name="multiple" class="dropdown">&nbsp;&nbsp;'+
'<img id="setResourcesMaga" src="img/icons/reload.gif" width="18px" height="18px" alt="All" style="cursor: pointer;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["setResourcesMaga"]+'\');">'+
'<br>'+
ling[setling]["mercprez"]+' <input type="text" class="text" style="width: 50px; text-align: right;" onchange="this.value=this.value.replace(/^0*/, \'\');" name="price" id="priceField"> <img src="img/res/copper.gif" alt="'+ling[setling]["bronzo"]+'" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bronzo"]+'\');">'+
'<br>'+
'<div id="marketOkDiv" style="position: relative; left: -10px; top: -10px;"><input type="image" src="img/lang/it/ok.gif"></div>'+
'<img src="img/icons/icon_tutorial.gif" width="18" height="18" style="cursor: help; position: relative; left: 200px; top: -40px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mercinfo"]+'\');"</a>'+
//'<img src="img/icons/complaint.gif" width="18" height="18" style="cursor: help; position: relative; left: 160/185px; top: -35/-45px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<b>'+ling[setling]["mercatt1"]+'</b><br>'+ling[setling]["mercatt2"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'\'); return false;"><img src="img/icons/chaticon_ress2.gif" style="position: relative; left: 0px; top: 0px" width="52" border="0" height="12" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mercvis"]+'\');"></a>'+
'<a onclick="xajax_showModule(\'trade\',\'offersedit\',\'20<0<0\'); return false;"><img src="img/icons/interface_left_top_3.gif" style="position: relative; left: 80px; top: -10px; width: 20px; height: 20px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mercprop"]+'\');"></a>'+
'<a onclick="xajax_click(6900, 5211, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/icons/chaticon_ress1.gif" style="position: relative; left: 0px; top: 0px" width="52" border="0" height="12" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["gomerc"]+'\');"> </a>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var linkutili = '<div id="MovSessionLINK"; style="position: absolute; top: 100px; left: 500px";>'+
'<div id="chatGroupDiv11" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'link\');dragObjName=\'MovSessionLINK\'; functionMouseDown(event);"><b>'+ling[setling]["linktitle"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(11);" />'+
'<form style="color: white; font-size: 12px; border: 2px solid #990000; text-align: center; width: 150px;">'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-59\'); return false;"><img src="img/icons/generation_1.gif" width="36" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkI"]+'\');"></a>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713281-205\'); return false;"><img src="img/icons/generation_2.gif" width="36" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkII"]+'\');"></a>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'727761-721\'); return false;"><img src="img/icons/generation_3.gif" width="36" border="0" height="18" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkIII"]+'\');"></a>'+
'<br>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-80\'); return false;"><img src="img/icons/Icon_mail.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linktitle"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'726996-199\'); return false;"><img src="img/weapons/potionB2.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkpoz"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'718571-388\'); return false;"><img src="http:/img6.imageshack.usimg6/7895/paginegialle.gif" width="27" border="0" height="27" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkgraf"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'713258-3\'); return false;"><img src="http:/img524.imageshack.usimg524/7911/rattansingolo.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linklet"]+' \');"</a>'+
'<a onclick="xajax_showModule(\'questlog\',\'\',\'\'); return false;" <img src="img/icons/Icon_questlog.gif" "width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkdiario"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'blogs\',\'comments\',\'731687-60\'); return false;"><img src="http:img/bg/12,12.jpg" width="31.5" border="0" height="31.5" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkmappa"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'friendtree\',\'buddylist\',\'0\'); return false;"><img src="img/icons/Icon_friendtree.gif" width="24" border="0" height="24" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkamici"]+'\');"</a>'+
'<a onclick="xajax_scriptCall(\'showDialog\',55,\'1#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="..img/icons/Icon_trade.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linktasse"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',226,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/items/inventory_cookedfish.gif" width="26"  height="26" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkpes"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',178,\'2#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/items/inventory_mushroomragout1.gif" width="26" onmouseout="hideToolTip();" height="26" onmouseover="showToolTipText(\''+ling[setling]["linkfung"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',478,\'8#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="img/forum.gif" width="18" border="0" height="22" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkcarta"]+'\');"'+
'<a onclick="xajax_scriptCall(\'showDialog\',479,\'9#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "<img src="http://www.iagi.info/ARALDICA/gentilizia/reali/prussia.gif" width="22" border="0" height="22" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkonore"]+'\');"'+
'<a onclick="xajax_showModule(\'settings\',\'account\',\'\'); return false;" <img src="img/icons/Icon_settings.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linksitt"]+'\');"'+
'<a onclick="xajax_showModule(\'guild\',\'transfer\',0); return false;" <img src="img/icons/Icon_guild.gif"  onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkgild"]+'\');"'+
'<a onclick="xajax_showModule(\'miniGame\',\'list\',\'-5\')" return false;"><img src="img/icons/Icon_minigame.gif" style="cursor: pointer;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkgiochi"]+'\');"</a>'+
'<a onclick="xajax_showModule(\'tooltrader\',\'\',3); return false;" <img src="img/icons/Icon_tools.gif" width="20" height="20" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["linkattrezzi"]+'\');"</a>'+
'<br><br>'+
'<a onclick="xajax_scriptCall(\'showDialog\',\'484\',\'2#0\',\'\'); return false;" href="">Apprendista di matricia</a>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var bingo = '<div id="MovSessionBINGO"; style="position: absolute; top: 150px; left: 500px";>'+
'<div id="chatGroupDiv10" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'bingo\');dragObjName=\'MovSessionBINGO\'; functionMouseDown(event);"><b>'+ling[setling]["bingotitle"]+'</b></div>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(10);" />'+
'<form style="color: black; font-size: 12px; border: 2px solid White; width: 250px; text-align: center;">'+
//INFORMAZIONI
'<img src="/img/icons/icon_tutorial.gif" width="25" height="25" style="cursor: help; position: relatie; left: 180px; top: 100px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bingoinfo"]+'\');"</a>'+
'<br>'+
//AVERE SCHEDA BINGO
'<a onclick="xajax_scriptCall(\'showDialog\',472,\'3#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false; "><img src="http://img691.imageshack.us/img691/7962/inventorybingo.gif" style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bingoscheda"]+'\');"'+
//in caso di bingo
'<a onclick="xajax_scriptCall(\'showDialog\',472,\'7#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"><img src="http://img72.imageshack.us/img72/9580/minitrofeo.png" style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bingobingo"]+'\');"'+
//SUDOKISS
'<a onclick="xajax_scriptCall(\'showDialog\',473,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"><img src="img/bg/objects/people/riddles/Knobeline_r_stand.gif" width="29" border="0" height="42"  style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bingosud"]+'\');"'+ 
//LA SCELTA DELLE DAME
'<a onclick="xajax_scriptCall(\'showDialog\',475,\'6#0\',\'\'); document.getElementById(\'speechBalloon\').style.display=\'none\'; return false;"> <img src="img/bg/objects/people/riddles/Knifflik_l_stand.gif" width="34" border="0" height="46"  style=" position: relative; top: -1px;" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["bingodame"]+'\');"></a>'+ 
'<br><br><br>'+
// Ringraziamenti a corallo
'<b>'+ling[setling]["bingoring1"]+'</b><br><b>P.s.:</b>'+ling[setling]["bingoring2"]+''+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var estr = '<div id="MovSessionEST"; style="position: absolute; top: 150px; left: 700px";>'+
'<div id="chatGroupDiv20" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1" style="cursor: move;" ondragstart="return false;" onmousedown="toForeground(\'est\');dragObjName=\'MovSessionEST\'; functionMouseDown(event);">'+ling[setling]["estrtitle"]+'</td></tr></thead></table>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(20);" />'+
'<form style="color: black; font-size: 12px; border: 2px solid White; width: 250px; text-align: center;">'+
// 1° punti di estrazione
'<div style="border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;"><b>'+ling[setling]["estr1"]+'</b></div>'+
//LEGNO
'<a onclick="xajax_click(6451, 4552, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["legno"]+'\');"</a>'+
//ARGILLA
'<a onclick="xajax_click(6505, 4299, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["argilla"]+'\');"</a>'+
//MINERALE
'<a onclick="xajax_click(6079, 4578, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["minerale"]+'\');"</a>'+
//GRANO
'<a onclick="xajax_click(6137, 4381, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["grano"]+'\');"</a>'+
//FARINA
'<a onclick="xajax_click(6882, 4679, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["farina"]+'\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="xajax_click(6690, 4924, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["carbone"]+'\');"</a>'+
//ASSI
'<a onclick="xajax_click(7026, 4726, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["assi"]+'\');"</a>'+
//MATTONI
'<a onclick="xajax_click(6827, 4862, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mattoni"]+'\');"</a>'+
//FERRO
'<a onclick="xajax_click(7091, 5031, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["ferro"]+'\');"</a>'+
//PANE
'<a onclick="xajax_click(6959, 4972, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["pane"]+'\');"</a>'+
'<br><hr>'+
//2 PUNTI DI ESTRAZIONE
'<div style="border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;"><b>'+ling[setling]["estr2"]+'</b></div>'+
//LEGNO
'<a onclick="xajax_click(8446, 6354, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["legno"]+'\');"</a>'+
//ARGILLA
'<a onclick="xajax_click(9600, 5460, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["argilla"]+'\');"</a>'+
//MINERALE
'<a onclick="xajax_click(6906, 7252, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["minerale"]+'\');"</a>'+
//GRANO
'<a onclick="xajax_click(7348, 6394, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["grano"]+'\');"</a>'+
//FARINA
'<a onclick="xajax_click(6735, 5973, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["farina"]+'\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="xajax_click(9380, 6126, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["carbone"]+'\');"</a>'+
//ASSI
'<a onclick="xajax_click(6239, 6981, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["assi"]+'\');"</a>'+
//MATTONI
'<a onclick="xajax_click(6317, 6595, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["mattoni"]+'\');"</a>'+
//FERRO
'<a onclick="xajax_click(7579, 6071, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["ferro"]+'\');"</a>'+
//PANE
'<a onclick="xajax_click(6239, 6981, curX[0], curY[0], 0, BGlocation, BGlocationOwner, BGlocationRoom, 0, sequenceNr, currentlySitting);"><img src="img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["pane"]+'\');"</a>'+
'</form>'+
'</div>'+
'</div>'+
'</div>';




var autowork = '<div id="MovSessionWORK"; style="position: absolute; top: 100px; left: 400px";>'+
'<div id="chatGroupDiv21" style="display: none; text-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<table class="popupTable" cellspacing="1" celpadding="1"><thead><tr><td colspan="1" style="cursor: move;" ondragstart="return false;" onmousedown="toForeground(\'work\');dragObjName=\'MovSessionWORK\'; functionMouseDown(event);"><img src="img/icon_question.gif" style="cursor: help; position: relative; top: 3px; left: -15px; width="15" border="0" height="15" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoavv"]+' \');">'+ling[setling]["autotitle"]+'</td></tr></thead></table>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(21);" />'+

'<form style="color: black; font-size: 12px; border: 2px solid red; width: 250px; text-align: center;">'+
'<div style="border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;"><b>'+ling[setling]["autoimpo"]+'</b></div>'+
//Impostazioni
ling[setling]["autonum"]+' <input type="text" id="nrvolte" value="0" class="text"><br><b>'+ling[setling]["autoinfo"]+'</b><br><br>'+
'<p style="text-align: left;">'+
'<b>'+ling[setling]["autopref"]+'</b><br>'+
'<input type="checkbox" id="checkmp" checked="checked" style="margin-left: 20px;"> '+ling[setling]["checkmp"]+'<br>'+
'<input type="checkbox" id="checkmaga" checked="checked" style="margin-left: 20px;"> '+ling[setling]["checkmaga"]+'<br>'+
'<input type="checkbox" id="checkeat" checked="checked" style="margin-left: 20px;"> '+ling[setling]["checkeat"]+'<br>'+
'<input type="checkbox" id="checkbath" style="margin-left: 20px;"> '+ling[setling]["checkbath"]+'<br>'+
'<input type="checkbox" id="checkfun" style="margin-left: 20px;"> '+ling[setling]["checkfun"]+'<br>'+
'<input type="checkbox" id="checksleepy" style="margin-left: 20px;"> '+ling[setling]["checksleepy"]+'<br>'+
'</p>'+
'<br><br>'+
//Orologio
'<div id="estrclock" style="text-align: center;"></div>'+
'<div id="castesori" style="text-align: center;"></div>'+
'<script type="text/javascript">'+
'function clockon(risorsa) { '+
'testoestr = \''+ling[setling]["autowork"]+' \'+risorsa+\'...\';'+
'document.getElementById("estrclock").innerHTML = \'<img src="img/clock.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(testoestr);"><br><b>'+ling[setling]["autodo"]+'</b><br><br>\';'+
'}'+
'</script>'+
'</form>'+
'<br>'+

//Risorse
'<form style="color: black; font-size: 12px; border: 2px solid green; width: 250px; text-align: center;">'+
'<div style="border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;"><b>'+ling[setling]["autores"]+'</b></div>'+
//LEGNO
'<a onclick="clockon(\''+ling[setling]["legno"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'1\', \'0\');"><img src="img/res/big_wood.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["legno"]+'\');"</a>'+
//ARGILLA
'<a onclick="clockon(\''+ling[setling]["argilla"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'2\', \'0\');"><img src="img/res/big_clay.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["argilla"]+'\');"</a>'+
//MINERALE
'<a onclick="clockon(\''+ling[setling]["minerale"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'3\', \'0\');"><img src="img/res/big_ore.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["minerale"]+'\');"</a>'+
//GRANO
'<a onclick="clockon(\''+ling[setling]["grano"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'4\', \'0\');"><img src="img/res/big_corn.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["grano"]+'\');"</a>'+
//FARINA
'<a onclick="clockon(\''+ling[setling]["farina"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'5\', \'0\');"><img src="img/res/big_flour.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["farina"]+'\');"</a>'+
'<br>'+
//CARBONE
'<a onclick="clockon(\''+ling[setling]["carbone"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'6\', \'0\');"><img src="img/res/big_coal.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["carbone"]+'\');"</a>'+
//ASSI
'<a onclick="clockon(\''+ling[setling]["assi"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'7\', \'0\');"><img src="img/res/big_board.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["assi"]+'\');"</a>'+
//MATTONI
'<a onclick="clockon(\''+ling[setling]["mattoni"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'8\', \'0\');"><img src="img/res/big_brick.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["mattoni"]+'\');"</a>'+
//FERRO
'<a onclick="clockon(\''+ling[setling]["ferro"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'9\', \'0\');"><img src="img/res/big_iron.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["ferro"]+'\');"</a>'+
//PANE
'<a onclick="clockon(\''+ling[setling]["pane"]+'\'); estrazione(document.getElementById(\'nrvolte\').value, \'10\', \'0\');"><img src="img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["pane"]+'\');"</a>'+
'</form>'+
'<br>'+

//altre estrazioni
'<form style="color: black; font-size: 12px; border: 2px solid silver; width: 250px; text-align: center;">'+
'<div style="border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;"><b>'+ling[setling]["autoaltre"]+'</b></div>'+
'<small>'+ling[setling]["autotesstart"]+'</small><input type="text" class="text" id="starttes" value="1" style="width: 20px;">'+
//Erba
'<a onclick="clockon(\''+ling[setling]["erbe"]+'\'); estrerbe(document.getElementById(\'nrvolte\').value, \'0\');"><img src="http://leonardosite.altervista.org/travianer/file/travianer-plus/bellerba.png" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["erbe"]+'\');"</a>'+
//Funghi
'<a onclick="clockon(\''+ling[setling]["funghi"]+'\'); estrfung(document.getElementById(\'nrvolte\').value, \'0\');"><img src="http://leonardosite.altervista.org/travianer/file/travianer-plus/fungo.png" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autoestr"]+' '+ling[setling]["funghi"]+'\');"</a>'+
//Tesori
'<a onclick="clockon(\''+ling[setling]["tesori"]+'\'); autotesori(document.getElementById(\'starttes\').value);"><img src="img/res/big_gold.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["autotes"]+'\');"</a>'+
'</form>'+
/* Eliminate per errori di funzionamento
//azioni collettive
'<br><form style="color: black; font-size: 12px; border: 2px solid brown; width: 250px; text-align: center;">'+
'<div style="border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;"><b>Azioni collettive</b></div>'+
//Impostazioni
'Quando devo mangiare?<br> <input type="text" id="oracoll" value="00" style="width: 20px; font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;">:<input type="text" id="mincoll" value="00" style="width: 20px; font-size:11px;font-family: Verdana,Arial,Helvetica,sans-serif;background-color:#FFF3DB;border-top:1px solid #A56505;border-left:1px solid #A56505;border-right:1px solid #FCCC82;border-bottom:1px solid #FCCC82;padding:1px 3px;margin:0px;"><br>'+
'<img src="img/icons/complaint.gif" width="18" height="18" style="cursor: help; position: relative; left: -80px; top: -12px" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'<b>Attenzione!!!</b><br>Una volta che lo script riveler&agrave; che &egrave; il momento impostato inizier&agrave; a mangiare/lavarsi<br>P.s.: il traviano deve essere seduto/immerso con il panino/spugna sopra la testa altrimenti non sappiamo cosa possa succedere\');"'+
//<b>Attenzione!!!</b><br>Una volta che lo script riveler&agrave; che &egrave; l&apos;orario impostato inizier&agrave; a mangiare/lavarsi<br>P.s.: il traviano deve essere seduto/immerso con il panino/spugna sopra la testa altrimenti non sappiamo cosa possa succedere
//Orologio
'<div id="collclock" style="text-align: center;"></div>'+
'<script type="text/javascript">'+
'function clockcoll(ora, min) { '+
'testocoll = \'&Egrave; programmato alle \'+ora+\':\'+min+\'...\';'+
'document.getElementById("collclock").innerHTML = \'<img src="img/clock.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(testocoll);"><br><b>&Egrave; programmato il pasto/bagno</b><br>Per fermare clicca F5<br><br>\';'+
'}'+
'</script>'+
//cibo
'<a onclick="clockcoll(document.getElementById(\'oracoll\').value, document.getElementById(\'mincoll\').value); autoeat(document.getElementById(\'oracoll\').value, document.getElementById(\'mincoll\').value);"><img src="img/res/big_bread.gif" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Imposta per mangiare\');"</a>'+
'<a onclick="clockcoll(document.getElementById(\'oracoll\').value, document.getElementById(\'mincoll\').value); autolav(document.getElementById(\'oracoll\').value, document.getElementById(\'mincoll\').value);"><img src="http://leonardosite.altervista.org/travianer/file/travianer-plus/spugna.png" width="25" border="0" height="25" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Imposta per lavarsi\');"</a>'+
'</form>'+
*/
'</div>'+
'</div>'+
'</div>';



var copy = '<div id="MovSessionCOPY"; style="position: absolute; top: 80px; left: 150px;">'+
'<div id="chatGroupDiv170" style="display: none; width: 710px;" class="functionDivDefault">'+
'<div style="z-index: 40; position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<table class="popupTable" cellspacing="1" celpadding="1" style="z-index: 40; "><thead><tr><td colspan="1" style="cursor: move;" ondragstart="return false;" onmousedown="toForeground(\'copy\');dragObjName=\'MovSessionCOPY\'; functionMouseDown(event);">About Travianer-Plus</td></tr></thead></table>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(170);" />'+
'<center><img src="http://leonardosite.altervista.org/travianer/file/travianer-plus/copytp.gif"></center><br><br>'+
'<h1 style="text-align: center;">Copyright by Leonardo I</h1>'+
'<br>'+
'<div style="color: black;">'+
ling[setling]["copyby"]+' Leonardo I, '+ling[setling]["copywith"]+':'+
'<ul>'+
'<li>Dark Simon</li>'+
'<li>XxcoralloxX</li>'+
'<li>Shawn</li>'+
'<li>Gigio</li>'+
'<li>Matt93</li>'+
'</ul>'+
'</div>'+
'<br><h2 style="text-align: center;">'+ling[setling]["copygood"]+'</h2>'+
'</div>'+
'</div>'+
'</div>';




var news = '<div id="MovSessionNEWS"; style="position: absolute; top: 80px; left: 150px;">'+
'<div id="chatGroupDiv600" style="display: block; width: 205px;" class="functionDivDefault">'+
'<div style="z-index: 40; position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<table class="popupTable" cellspacing="1" celpadding="1" style="z-index: 40; "><thead><tr><td colspan="1" style="cursor: move;" ondragstart="return false;" onmousedown="toForeground(\'news\');dragObjName=\'MovSessionNEWS\'; functionMouseDown(event);">New News!!!</td></tr></thead></table>'+
'<img src="img/close.gif" style="cursor: pointer; float: right; position: relative; top: -14px; left: -5px;" onclick="collapseChatGroup(600);" />'+
'<div id="lastnewsspan" style="border: 1px solid #885305; margin: 2px 2px 2px 2px;"><div style="text-align: center;"><img src="img/ajax-loader.gif" onmouseout="hideToolTip();" onmouseover="showToolTipText(\''+ling[setling]["loadinnews"]+'\');"><br>'+ling[setling]["loadinnews"]+'</div></div>'+
'<style>'+
'.tpnewsmenu {'+
//'	background-color: #FFE4B5;'+
'	background-color: #FFF;'+
'	font-size: 9px;'+
'	line-height: 10px;'+
'	padding: 0;'+
'	text-align: center;'+
'	width: 22px;'+
'	color: #885305;'+
'	font-weight: bold;'+
'	border: 1px solid #885305;'+
'}'+
'.tpnewsmenu a {'+
'	font-size: 9px;'+
'	color: #885305;'+
'	font-weight: bold;'+
'}'+
'</style>'+
'<br><span class="tpnewsmenu" style="position: relative; top: 0px; left: 5px; padding: 2px 2px 2px 2px;"><a onclick="newschange(\'1\');">'+ling[setling]["newstp"]+'</a></span> <span class="tpnewsmenu" style="position: relative; top: 0px; left: 10px; padding: 2px 2px 2px 2px;"><a onclick="newschange(\'2\');">'+ling[setling]["newsgame"]+'</a></span> <span class="tpnewsmenu" style="position: relative; top: 8px; left: 70px; padding: 2px 2px 2px 2px;"><a onclick="newschange(\'3\');">'+ling[setling]["newsextra"]+'</a></span>'+
'<br><br>'+
'<script type="text/javascript">'+
'function caricanews() {document.getElementById("lastnewsspan").innerHTML = news;}'+
'setTimeout(\'caricanews()\', 3000);'+
'</script>'+
'</div>'+
'</div>'+
'</div>';

if (visualizza_note == 'true') {
var note = '<div id="MovSessionNOTE"; style="position: absolute; top: '+notet+'; left: '+notel+'";>'+
'<div id="chatGroupDiv57" style="ext-align: centre; solid aqua;">'+
'<div style="position: relative; top: -18px; left: 0px; border: 1px solid black; background: url(img/chatbg.gif);">'+
'<div id="move_session_note_button" style="cursor: move; border: 1px solid black; background: url(img/hihaholz.gif); text-align: center;" ondragstart="return false;" onmousedown="toForeground(\'note\');dragObjName=\'MovSessionNOTE\'; functionMouseDown(event);"><b>Note block</b><img src="img/close.gif" id="close_img_note" style="cursor: pointer; float: right; margin-top: 3px; margin-right: 3px;" onclick="collapseChatGroup(57);" /></div>'+
'<table id="noteblock" style="width: 140px; text-align: center;">'+
'	<tr>'+
'		<td style="background-image: url(/img/gold/window_middle_wide.gif);">'+
'			<textarea cols="14" id="noteblockcontent" style="background-image: url(http://leonardosite.altervista.org/travianer/file/travianer-plus/bg_note.gif); line-height: 16px;" rows="10">'+dati("note_text")+'</textarea>'+
'		</td>'+
'	</tr>'+
'	<tr>'+
'		<td style="text-align: center; background-image: url(/img/gold/window_middle_wide.gif);">'+
'			<input id="blocknote_save" type="image" src="http://leonardosite.altervista.org/travianer/file/travianer-plus/save.png" title="salva" alt="salva">'+
'		</td>'+
'	</tr>'+
'</table>'+
'</div>'+
'</div>'+
'</div>';
}else{
var note = '';
}

/*var translate = '<div id="MovSessionTRANS"; style="position: absolute; top: 100px; left: 300px";>'+
//style="display: none;"
'<div id="chatGroupDiv132" class="functionDivDefault"><div style="background-image: url(&quot;img/gold/window_top.gif&quot;);" onmousedown="toForeground(\'contr\');dragObjName=\'MovSessionTRANS\'; functionMouseDown(event);" ondragstart="return false;" class="functionBar"><img src="img/gold/icons/window_settings.gif"><div class="moduleNameDefault" style="top: 22px;" id="moduleNamemail">&nbsp;Help us to translate </div><div onclick="collapseChatGroup(132);" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Close\');" class="functionDivClose"></div></div>'+
'<div style="overflow: auto; background-image: url(&quot;img/gold/window_middle.gif&quot;);" class="functionDivContent" id="IDContentDivchat"><div class="optionsMenu"></div>'+
'<h1 style="text-align: center;">Help us to translate the travianer plus in other languages</h1><br><br>'+

'</div><div style="background-image: url(&quot;img/gold/window_bottom2.gif&quot;);" onmousedown="toForeground(\'contr\');dragObjName=\'MovSessionTRANS\'; functionMouseDown(event);" ondragstart="return false;" class="moduleFooter"></div></div>'+
'</div>';*/


var menuinner = start+principalbar+barmenu+minichat/*+split_menu*/+note+copy+control+dest+npg+tav+merc+linkutili+bingo+estr+autowork+news+contatore+'</div></div>';


// Inserimento variabile centrale

var menu = addElem('div', menuinner);

//// Aggiunta eventi ////
$id('changename').addEventListener('click', changeusername, true);
$id('impostaavvisi').addEventListener('click', setavvdon, true);
$id('changemenupx').addEventListener('click', changemenupx, true);
$id('displaylogochange').addEventListener('click', displaylogonone, true);
$id('displaynotechange').addEventListener('click', displaynotenone, true);
$id('chatResizer').addEventListener('click', positionmenu, true);
$id('matricia_pozioni').addEventListener('click', matricia, true);
$id('impostaimg').addEventListener('click', setimg, true);
$id('changeling').addEventListener('click', changeling, true);
$id('marketOkDiv').addEventListener('click', resetMercantForm, true);
$id('setResourcesMaga').addEventListener('click', setResourcesMaga, true);
$id('blocknote_save').addEventListener('click', noteblock, true);
$id('move_session_note_button').addEventListener('click', save_position_note, true);
$id('toggle_split_menu').addEventListener('click', function () {
	$("#content_split_menu").slideToggle("slow");
	if ($id("toggle_split_menu").src == 'http://'+travianer_domain+'/img/down.gif') {
		$id("toggle_split_menu").src = 'img/up.gif';
	}else{
		$id("toggle_split_menu").src = 'img/down.gif';
	}
}, true);

var elem = $id('gameDiv');

if (elem) {
        elem.parentNode.insertBefore(menu, elem.nextSibling);
        $id('addOnMinimizer').addEventListener('click', toggleAddOn, true);

}


//////////////// MATRICIA ////////////////////
function matricia() {
matr=setTimeout(function () {
var inner = '<h2 style="margin-left: 20px;">Guida rapida alle pozioni</h2>'+
'<b><img src="/img/items/inventory_herbs1.gif" alt="Dragofelce" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Dragofelce\');"> + <img src="/img/items/inventory_herbs1.gif" alt="Dragofelce" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Dragofelce\');"> = <img src="/img/weapons/potionA2.gif" alt="Pozione della vita" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozione della vita\');"></b>'+
'<span style="margin-left: 80px;"><b><img src="/img/items/inventory_herbs1.gif" alt="Dragofelce" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Dragofelce\');"> + <img src="/img/items/inventory_herbs2.gif" alt="Piedecervo" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Piedecervo\');"> = <img src="/img/weapons/potionB2.gif" alt="Pozione della forza" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozione della forza\');"></b></span><br>'+
'<b><img src="/img/items/inventory_herbs2.gif" alt="Piedecervo" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Piedecervo\');"> + <img src="/img/items/inventory_herbs1.gif" alt="Dragofelce" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Dragofelce\');"> = <img src="/img/weapons/potionC2.gif" alt="Pozione dell\'agilità" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozione della agilit&agrave;\');"></b>'+
'<span style="margin-left: 80px;"><b><img src="/img/items/inventory_herbs2.gif" alt="Piedecervo" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Piedecervo\');"> + <img src="/img/items/inventory_herbs2.gif" alt="Piedecervo" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Piedecervo\');"> = <img src="/img/weapons/potionD2.gif" alt="Pozione della resistenza" onmouseout="hideToolTip();" onmouseover="showToolTipText(\'Pozione della resistenza\');"></b></span><br>'+
'<br><a onclick="xajax_showModule(\'blogs\',\'comments\',\'726996-199\'); return false;">Blog sulle pozioni</a>';
var istr = document.createElement('span');
istr.innerHTML = inner;
istr.style.width = '200px';
istr.style.position = 'relative';
istr.style.left = '200px';
istr.style.top = '-400px';
document.getElementById('IDContentDivpotions').appendChild(istr);
document.getElementById('IDContentDivpotions').style.overflow = 'hidden';
document.getElementById('IDContentDivpotions').style.height = '420px';
} , 2500);
}
//////////////// FUNZIONI ////////////////////

function save_position_note() {
	notel = document.getElementById('MovSessionNOTE').style.left;
	notet = document.getElementById('MovSessionNOTE').style.top;
	GM_setValue("notet", notet);
	GM_setValue("notel", notel);
	//alert(notel+' '+notet);
}

function noteblock() {
	//noteblockcontent blocknote_save
	note_text = document.getElementById('noteblockcontent').value;
	GM_setValue("note_text", note_text);
	alert(ling[setling]["save"]);
}

function setResourcesMaga() {
	quantita = document.getElementById("offerAmountSelector").value;
	if (quantita == '') {
		quantita = 1;
		document.getElementById("offerAmountSelector").value = quantita;
	}
	all_res = getResources(document.getElementById("res_type_selector").value);
	multiple = Math.floor(all_res/quantita);
	document.getElementById("offerMultipleSelector").value = multiple;
}

function getResources(res_type) {
	if (res_type > 0 && res_type < 11) {
		switch (res_type)
		{
			case "1" : rismaga = document.getElementById('woodCount').innerHTML; break;
			case "2" : rismaga = document.getElementById('clayCount').innerHTML; break;
			case "3" : rismaga = document.getElementById('oreCount').innerHTML; break;
			case "4" : rismaga = document.getElementById('cornCount').innerHTML; break;
			case "5" : rismaga = document.getElementById('flourCount').innerHTML; break;
			case "6" : rismaga = document.getElementById('coalCount').innerHTML; break;
			case "7" : rismaga = document.getElementById('boardCount').innerHTML; break;
			case "8" : rismaga = document.getElementById('brickCount').innerHTML; break;
			case "9" : rismaga = document.getElementById('ironCount').innerHTML; break;
			case "10" : rismaga = document.getElementById('breadCount').innerHTML; break;
			default : rismaga = '0';
		}
	}else{
		rismaga = '0';
	}
	return rismaga;
}

function resetMercantForm() {
	del_merc=setTimeout(function () {
		document.getElementById('playerSearchField').value = "";
		document.getElementById('offerAmountSelector').value = "";
		document.getElementById('offerMultipleSelector').value = "";
		document.getElementById('priceField').value = "";
		document.getElementById('default_res').selected = true;
	} , 2000);
}

function changeling() {
	setling = document.getElementById("lingua").value;
	if (setling != "0") {
		GM_setValue("setling", setling);
		alert("New language: "+setling);
	}else{
		alert("Not change languages...");
	}
	location.href = location.href;
}

function positionmenu() {
	if (document.getElementById('interfaceDiv3').style.left == '627px') {
		document.getElementById('tp_menu_bar').style.left = '753px';
	}else{
		document.getElementById('tp_menu_bar').style.left = '853px';
	}
}

function dati(nome)
{
	risultato = GM_getValue(nome);
	if (risultato == null) {
		risultato = '';
	}
	return risultato;
}

function changevar(val,nome)
{
	GM_setValue(nome, val);
}

function adduser()
{
    GM_xmlhttpRequest ({
			method: "GET",
			url: "http://leonardosite.altervista.org/travianer/file/travianer-plus/adduser.php?user="+user,
			headers: {"User-agent": "Mozilla/5.0", "Accept": "text/html"}
		});
}

function setavvdon() {
	var attivo = radio("abilitaavv");
	var giorno = $id("giornoavv").value;
	var stelle = $id("stelleavv").value;
	var risorse = $id("risorseavv").value;
	var testo = $id("testopers").value;
	var testosemifin = testo.replace(/<1>/,stelle);
	var testofin = testosemifin.replace(/<2>/,risorse);
	//alert(testo+"                "+attivo+"    "+giorno); //Controllo output dei dati
	GM_setValue("stelleavv", stelle);
	GM_setValue("risorseavv", risorse);
	GM_setValue("attavvisi", attivo);
	GM_setValue("day", giorno);
	GM_setValue("testo", testofin);
	alert(ling[setling]["save"]);
	location.href = location.href;
}

function changeusername() {
	 user = $id("nomeutentetp").value;
    GM_setValue("user", user);
    $id("chatGroupDiv100").style.display = "none";
    alert("Nome modificato, sara' necessario aggiornare la pagina per verificare...")
}

function changemenupx() {
	 menut = $id("menutnew").value;
	 menul = $id("menulnew").value;
    GM_setValue("menul", menul);
    GM_setValue("menut", menut);
    $id("chatGroupDiv100").style.display = "none";
    alert(ling[setling]["save"]);
	location.href = location.href;
}

function changeusernamepront() {
	 user=prompt("Username:",GM_getValue("user"));
    GM_setValue("user", user);
    location.href = location.href;
}

function displaylogonone() {
	var displaylogo = radio("logotpvis");
	GM_setValue("displaylogo", displaylogo);
	alert(ling[setling]["save"]);
    location.href = location.href;
}

function displaynotenone() {
	var displaynote = radio("notetpvis");
	GM_setValue("visualizza_note", displaynote);
	alert(ling[setling]["save"]);
    location.href = location.href;
}

function setimg() {
	var scelta = radio("abilitaimg");
	GM_setValue("goldimg", scelta);
	alert(ling[setling]["save"]);
    location.href = location.href;
}

function radio(nome) {
var bottone = document.getElementsByName(nome);
	for(var i=0; i<bottone.length; i++) { // uso bottone.length per sapere quanti radio button ci sono
	   if(bottone[i].checked) { // scorre tutti i vari radio button
 	   controllo = true;  // confermo una scelta
 	   return bottone[i].value; // valore button scelto
 	   break; // esco dal cliclo
 	 }
	}
	if(!controllo) { // se non c'è una scelta avviso
		alert("Deve essere selezionato un bottone...");
	}
}

function resetTP() {
	conferma_eliminazione = confirm("Are you sure?");
	if (conferma_eliminazione) {
		GM_deleteValue("user");
		GM_deleteValue("setling");
		GM_deleteValue("goldimg");
		GM_deleteValue("displaylogo");
		GM_deleteValue("menul");
		GM_deleteValue("menut");
		GM_deleteValue("notel");
		GM_deleteValue("notet");
		GM_deleteValue("stelleavv");
		GM_deleteValue("risorseavv");
		GM_deleteValue("attavvisi");
		GM_deleteValue("day");
		GM_deleteValue("testo");
		GM_deleteValue("note_text");
		GM_deleteValue("visualizza_note");
		alert("Delete do...");
		location.href = location.href;
	}
}

function check_value(nome, returned, key) {
	if (returned == null) { returned = GM_getValue(nome); }
	if (key == null) { key = true; }
	if (GM_getValue(nome) == key) {
		return returned;
	}else{
		return '';
	}
}

//////////////////////////////////////////////