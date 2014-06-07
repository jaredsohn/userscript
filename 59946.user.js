scr_meta=<><![CDATA[ 
// ==UserScript==
// @author			Sirhc [BaseBog]
// @namespace		BaseBogScript
// @name 			BaseBogScript 4
// @version			4.3.2
// @description		BaseBog Tool for DarkPirates with advanced menu, galaxy map, browser title timer, sounds, autoupdater, multilanguage (Italiano,English,Español,...)
// @include			http://s*.darkpirates.*/*
// @include       	http://s*.*.darkpirates.*/*
// ==/UserScript==
]]></>.toString();
/*
 --------------------------------------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install you need: FireFox and GreaseMonkey
	FireFox: http://www.firefox.com/
	Greasemonkey: http://greasemonkey.mozdev.org/
 Install the GreasMonkey plug-in and then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts, select this script,
 and click Uninstall.

 --------------------------------------------------------------------------------------------------
 
 *******COPYRIGHT NOTICE*******

 DarkPirates BaseBog script Tool - the convenient tool for the game Darkpirates(C)
 Copyright 2009-2010 Sirhc - e-mail: sirhc73@yahoo.com

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be usefull,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program. If not, see http://www.gnu.org/licenses/gpl.html
 
 *******END COPYRIGHT NOTICE*******

 --------------------------------------------------------------------------------------------------

IMPORTANT:
 Use this program at your own risk.
 Use of this script, at the moment, is officially permitted only in the Italian servers.
 Please check the permission in your server with your Game Operator

 --------------------------------------------------------------------------------------------------
*/

/* ******* Minor changelog:
v.4.3.0 - 4.3.1 - 4.3.2
-combat report converter integrated
-sound default state to off
-combat report layout correction

v.4.2.0
-small text corrections and data reorganizations (unpublished)

v.4.1.2
-update of special minerals prices 

v.4.1.1
-added "Mark/Unmark all" checkbox on messages page

v.4.0.1
-added corrections to DP text
-enabled sound and shortcut Meg++ during warp phase on second click on galaxy link
-some minor changes in dictionaries 
******* */

/* ******* Changelog:
v.4.0.0
-multilanguage
-new options menu to personalize visualization and save script parameters, activation with key B "SHIFT+b" (default value) 
-taked out show/hide function from DP menu (left side), and added parameters to the new options menu
-sounds added to default, menu open, login, logout, warp and sector arrival events
-autoupdater

// ******* Old log in Italian (it wasn't suitable for other servers, just Italian)******* //
v.3.0.2
-aggiunto menu' alleanza
-aggiunto menu' info
-possibilita' di personalizzare la visualizzazione del menu', nuova funzione nascondi/mostra
-tolti collegamenti su voci "Menu' Plus" e "Minerali Speciali"
-correzione prezzi minerali speciali
-aggiunte correzioni traduzioni
-fissato tipo carattere in mappa galassia e ritoccato layout
v.2.0
-correzione prezzi minerali speciali
-minimo e massimo su minerali normali
-nuovi link(scorciatoie) nel menuplus
-gestione dinamica del menuplus in base ai settori
-gestione dinamica del menu' minerali speciali in base ai settori
-aggiunta colori in scritte menu' permanenti
-aggiunto contatore alla rovescia su barra titolo
v.1.0
-corretti nomi, aggiustamento colori mappa galassia
-corretto posizionamento scritte prezzi minerali in mappa galassia
-aggiunto link diretto per munizioni
-aggiunto link diretto per mercato nero
-inseriti prezzi per confronti in mercato nero
0.9beta
-Menu' aggiuntivo plus con scorciatoie di comodo alle varie funzioni del gioco
-Menu' aggiuntivo per link immediato per la fusione dei materiali ++
-Suggerimento prezzi del mercato
-Mappa galassia migliorata
-Correzione traduzioni
0.8beta
-MenuPlus
-MappaGalassia
*/

// controllo versione compatibile di GreaseMonkey - check GreaseMonkey version compatibility 
if (!GM_xmlhttpRequest){
    alert('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// ******* Versione - Version *******
var Versione = '4.3.2';

// ******* dichiarazione variabili  - variable dclaration *******
//var replacements;
var regex, key, textnodes, node, s;

// ******* Ricerca  - Search *******
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;			// Constant that gives back the first element by XPath
var XPList  = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;		// Constant that gives back a list of elements by XPath
var XPIter  = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;		// Constant that it gives back a iterator of elements by XPath

// ******* Indirizzo - Address *******
var url = window.location.href;

// ******* Conto alla rovescia su titolo - Countdown on title bar *******
var titolo='#';
var contatore='---';
var app='';
var elemento='';

// ******* Dizionario - Dictionary *******
var cl = '_en'; //default language used for parameters


//Italiano

var dict_FormTitle = 'Opzioni \"BaseBog Script\"';

var dict_KeyShortcut = 'Tasto per mostrare e nascondere Menu\' opzioni';
var dict_DaysUpdate = 'Frequenza di aggiornamento dello script (giorni)';
var dict_MnuPlusShow = 'Mostra Menu\' Plus';
var dict_MnuAllyShow = 'Mostra Menu\' Ally';
var dict_MnuMineralsShow = 'Mostra Menu\' Minerali';

var dict_SoundEnable = 'Abilita suoni';
var dict_Volume = 'Volume';

var dict_DefaultSound = 'Suono predefinito';
var dict_OptionsSound = 'Suono menu opzioni';
var dict_LoginSound = 'Suono in ingresso a DP';
var dict_ExitSound = 'Suono in uscita da DP';
var dict_WarpSound = 'Suono durante il viaggio(warp)';
var dict_ArriveSound = 'Suono in arrivo al settore';

var dict_Note01 = 'hanno effetto al prossimo refresh di pagina';

var dict_Ok = 'OK';
var dict_Cancel = 'Annulla';

var dict_FindEnemy_tt = 'Ricerca avversari uguali (10 crediti)';
var dict_FindEnemy = 'Ric.Nemico';

var dict_Amno_tt = 'Munizioni';
var dict_Amno = 'Munizioni';

var dict_Trade_tt = 'Mercato';
var dict_Trade = 'Mercato';

var dict_BlackMarket_tt = 'Mercato Nero';
var dict_BlackMarket = 'Mercato Nero';

var dict_Train_tt = 'Allenamento';
var dict_Train = 'Allenamento';

var dict_Recruit_tt = 'Ufficio reclutamento(Burocrate)';
var dict_Recruit = 'Burocrate';

var dict_Work_tt = 'Lavoro';
var dict_Work = 'Lavoro';

var dict_Storage_tt = 'Magazzino';
var dict_Storage = 'Magazzino';

var dict_Auction_tt = 'Asta';
var dict_Auction = 'Asta';

var dict_Lab_tt = 'Laboratorio';
var dict_Lab = 'Laboratorio';

var dict_AllyMsg_tt = 'Messaggio Circolare Alleanza';
var dict_AllyMsg = 'Msg. Circolare';

var dict_AllyMembers_tt = 'Membri Alleanza';
var dict_AllyMembers = 'Membri';

var dict_AllyBattles_tt = 'Battaglie d`Alleanza';
var dict_AllyBattles = 'Battaglie';	

var dict_AllyUpgrade_tt = 'Amplia il covo dell`Alleanza';
var dict_AllyUpgrade = 'Ampliamento';

var dict_SearchUpdates = 'clicca per cercare gli aggiornamenti';
var dict_Version = 'Versione';	

var dict_HotkeyHelp = ['Informazioni sullo strumento, premere ', ' per aprire menù opzioni'];

var dict_AlertMsg = ['Inserire Hotkey', 'Inserire frequenza di aggiornamento'];
// ******* Tasto attivazione menu' opzioni (default B) - this is the default hotkey value *******
var BB_hotkey = BB_get('BB_HotKey','B');
// ******* Frequenza di aggiornamento dello script - Frequency of updating the script *******
var BB_FreqUpdate = GM_getValue('BB_FreqUpdate','2'); //language indipendent

// ******* Suoni - Sounds initialization *******
var BB_AbilitaSuoni = BB_get('BB_AbilitaSuoni', false);
var BB_volume 		= BB_get('BB_volume', '2');
var BB_snd_default  = BB_get('BB_snd_default', 'http://www.desktopstarships.com/Sounds/C802.wav');
var BB_snd_optmenu  = BB_get('BB_snd_optmenu', 'http://www.desktopstarships.com/Sounds/C801.wav');
var BB_snd_login    = BB_get('BB_snd_login',   'http://www.ilovewavs.com/Movies/AE/Back%20to%20the%20Future%20-%20Movie%20Theme.wav');
var BB_snd_logout   = BB_get('BB_snd_logout',  'http://datacore.sciflicks.com/battlestar_galactica/sounds/battlestar_galactica_request.wav');
var BB_snd_warp     = BB_get('BB_snd_warp',    'http://www.sounddogs.com/sound-effects/2186/mp3/172071_SOUNDDOGS_SC.mp3');
var BB_snd_arrived  = BB_get('BB_snd_arrived', 'http://www.desktopstarships.com/Sounds/C113.wav');

//******* dizionario autoaggiornamento - autoupdate dictionary *******
dict_AutoUpdate = new Array(
'Una nuova versione del ',
' script utente è disponibile. Vuoi aggiornare?', 
'Vuoi spegnere l`aggiornamento automatico di questo script?',
'L`aggiornamento automatico può essere riattivato per questo script da Comandi Script Utente del sottomenu.',
'Non ci sono aggiornamenti disponibili per il '
);

/*
 *******************************************
 ************** Data structures *************
 *******************************************
*/

// ******* dizionario minerali -  resources dictionary *******
dict_ArrMinerals = new Array(
'Ferro', 
'Duran', 
'Polenium',  
'Quadrinium',  
'Helenium', 
'Phosarit',
'Melanit',
'Megatan',
'Querell',
'Florisar',
'Wario',
'Crysolit', 
'Niciltar',
'Ipolio', 
'Einsteinio'
);

// ******* dizionario abbreviazione minerali -  abbreviation resources dictionary *******
dict_ArrAbbrMin = new Array(
'Meg++',
'Que++', 
'Flo++', 
'War++',  
'Cry++', 
'Nic++', 
'Ipo++', 
'Ein++'
);

// ******* dizionario munizioni -  amno dictionary *******
dict_ArrAmno = new Array(
'Munizioni standard',
'Munizioni PAP', 
'ASR 5', 
'FDR 13', 
'Ares II', 
'Ares I',
'Calltroop',
'Smecker',
'Starclasher', 
'WarpNuker'
);

// ******* dizionario armi -  weapon dictionary *******
dict_ArrWeapon = new Array(
'Azojal',
'Jajawil',
'Biqaj'
);

// ******* dizionario moduli -  modules dictionary *******
dict_ArrModule = new Array(
'Marat',
'Senofle', 
'Undassa', 
'Nenofith',
'Chamim',
'Calenan',
'CTX 11',
'Fenesyn',  
'Sondast',
'Estenin',  
'Lassathe',
'Nensor',
'Iladar'
);

// ******* dizionario extra -  extras dictionary *******
dict_ArrExtras= new Array(
'Repair-Bot',
'Nano-kit'
);

// ******* sostituzione numeri romani - romans numbers for substitution *******
subst_ArrRomanNumb = new Array(
'IV',	'lV', 
'III', 	'lll',
'II', 	'll',
'I',	'l'
);

// ******* menu titles *******
dict_TitleMenu = new Array(
'Menù Plus',
'Menù Ally',
'Minerali Speciali',
'Info'
);

// ******* legend dictionary *******
dict_Legend = new Array(
'Legenda',
'Normale',
'Laboratorio',
'Mercato',
'Quartier Generale',
'Minerali mancanti',
'Minerali Spec.'
);

// ******* Dictionary for Combat Report
dict_CR = new Array(
'Abilità di pilota ',
'Copertura ',
'Supervisione ',
'Tecnologia Scudi ',
'Reazione ',
'Tecnologia Sensori ',
'Navigazione ',
'Dati della nave ',
'Punti struttura ',
'Punti scudo ',
'Laser ',
'Spazi per moduli ',
'Extra ',
'Velocità ',
'Danni (max) ',
'Danno inflitto: ',
'Punti struttura rimasti: ',
'Generato con ',
' script Combat Report Converter'
);

// ******* Dictionary for Converter Box 
dict_CRbox = new Array(
'Converti Rapporto',
'Rapporto Convertito',
'Chiudi'
);

// ******* Dictionary for Left Position of some elements of Legend
d_lpl = new Array(
'37px',
'42px',
'39px',
'48px',

'33px',
'36px',
'37px',
'18px'
);

// ******* abbreviations dictionary *******
//(p)urchase,(s)ell,(a)verage
var sPurchase	=	'a';
var sSell		=	'v';
var sAverage	=	'm';

// ******* selection messages dictionary *******
var dict_ChkSel = 'Seleziona/Deseleziona tutto';

// fine italiano

function English(){
dict_FormTitle = '\"BaseBog Script\" Options';

dict_KeyShortcut = 'Key Shorcut to show/hide Options Menu';
dict_DaysUpdate = 'Frequency of updating the script (days)';
dict_MnuPlusShow = 'Show Menu\' Plus';
dict_MnuAllyShow = 'Show Menu\' Ally';
dict_MnuMineralsShow = 'Show Menu\' Minerali';

dict_SoundEnable = 'Sounds enable';
dict_Volume = 'Volume';

dict_DefaultSound = 'Default sound';
dict_OptionsSound = 'Menu options sound';
dict_LoginSound = 'DP login sound';
dict_ExitSound = 'DP exit sound';
dict_WarpSound = 'Sound during the trip(warp)';
dict_ArriveSound = 'Sound arriving at the sector';

dict_Note01 = 'have effect at the next page refresh';

dict_Ok = 'OK';
dict_Cancel = 'Cancel';

dict_FindEnemy_tt = 'Scan equal opponents (10 credits)';
dict_FindEnemy = 'Scan enemy';

dict_Amno_tt = 'Ammunition';
dict_Amno = 'Ammunition';

dict_Trade_tt = 'Trade market';
dict_Trade = 'Trade market';

dict_BlackMarket_tt = 'Black market';
dict_BlackMarket = 'Black market';

dict_Train_tt = 'Training';
dict_Train = 'Training';

dict_Recruit_tt = 'Recruitment Office';
dict_Recruit = 'Recruiting';

dict_Work_tt = 'Work';
dict_Work = 'Work';

dict_Storage_tt = 'Post storage';
dict_Storage = 'Storage';

dict_Auction_tt = 'Auction house';
dict_Auction = 'Auction';

dict_Lab_tt = 'Laboratory';
dict_Lab =  'Laboratory';

dict_AllyMsg_tt = 'Alliance General Message';
dict_AllyMsg = 'Alliance msg';	

dict_AllyMembers_tt = 'Ally members';
dict_AllyMembers = 'Members';

dict_AllyBattles_tt = 'Ally battles';
dict_AllyBattles = 'Battles';	

dict_AllyUpgrade_tt = 'Upgrade ally';
dict_AllyUpgrade = 'Upgrade';

dict_SearchUpdates = 'Click to search for updates';
dict_Version = 'Version';	

dict_HotkeyHelp = ['Tool information, press ',' to open options menù'];

dict_AlertMsg = [
'Insert Hotkey', 
'Insert frequency of updating '
];

//******* dizionario autoaggiornamento - autoupdate dictionary *******
dict_AutoUpdate = [
'A new version of the ',
' user script is available. Do you want to update?',
'Do you want to turn off auto updating for this script?',
'Automatic updates can be re-enabled for this script from the User Script Commands submenu.',
'No updates available for '
];

/*
 *******************************************
 ************** Data structures *************
 *******************************************
*/

// ******* dizionario minerali -  resources dictionary *******
dict_ArrMinerals = [
'Iron',
'Duran', 
'Polenium',
'Quadrinium', 
'Helenium', 
'Phosarit', 
'Melanit',
'Megatan', 
'Querell',
'Florisar',
'Warium',
'Crysolit',
'Niciltar',
'Hypolium',
'Einsteinium'
];

// ******* dizionario abbreviazione minerali -  abbreviation resources dictionary *******
dict_ArrAbbrMin = [
'Meg++',
'Que++',
'Flo++',
'War++',
'Cry++',
'Nic++',
'Hyp++',
'Ein++'
];

// ******* dizionario munizioni -  amno dictionary *******
dict_ArrAmno = [
'Standard Ammunition',
'APS Ammunition',
'ASR 5', 
'FDR 13', 
'Ares II', 
'Ares I', 
'Calltroop', 
'Smecker Mine',
'Starclasher Mine', 
'WarpNuker Mine'
];

// ******* dizionario armi -  weapon dictionary *******
dict_ArrWeapon = [
'Azojal',
'Jajawil',
'Biqaj'
];

// ******* dizionario moduli -  modules dictionary *******
dict_ArrModule = [
'Marate', 
'Senofle Warp Drive',
'Undassa',
'Nenofith',
'Chamim',
'Kelenens',
'CTX 11',
'Fenesyn',
'Sondast',
'Estenin',
'Lassathe',
'Nenzon',
'Iladar'
];

// ******* dizionario extra -  extras dictionary *******
dict_ArrExtras= [
'Repair-Bot',
'Nano-kit'
];



// ******* menu titles *******
dict_TitleMenu = [
'Plus Menù',
'Alliance Menù',
'Special Minerals',
'Info'
];

// ******* legend dictionary *******
dict_Legend = [
'Legend',
'Common',
'Laboratory',
'Market',
'Headquarter',
'Minerals missing',
'Spec.Minerals'
];

// ******* Dictionary for Combat Report
dict_CR = [
'Piloting Skills ',
'Camouflage Technology ',
'Supervision ',
'Shield Technology ',
'Reaction ',
'Sensor Technology ',
'Navigation Research ',
'Ship Data ',
'Structure Points ',
'Shield Points ',
'Laser ',
'Module Nodes ',
'Additions ',
'Speed ',
'Damage: (Max.) ',
'Damage Dealt: ',
'Structure Points Left: ',
'Generated with ',
' script Combat Report Converter'
];

// ******* Dictionary for Converter Box 
dict_CRbox = [
'Convert Report',
'Report Converted',
'Close'
];

// ******* Dictionary for Left Position of some elements of Legend
d_lpl = [
'37px',
'42px',
'39px',
'40px',

'33px',
'36px',
'20px',
'10px'
];

// ******* abbreviations dictionary *******
//(p)urchase,(s)ell,(a)verage
sPurchase	=	'p';
sSell		=	's';
sAverage	=	'a';

// ******* selection messages dictionary *******
dict_ChkSel = 'Mark/Unmark all';
}

function Español(){
dict_FormTitle = 'Opciones \"BaseBog Script\"';

dict_KeyShortcut = 'Tecla para monstrar/esconder el Menu\' opciones';
dict_DaysUpdate = 'Frecuencia de actualización del script (dìas)';
dict_MnuPlusShow = 'Muestra Menu\' Plus';
dict_MnuAllyShow = 'Muestra Menu\' Ally';
dict_MnuMineralsShow = 'Muestra Menu\' Minerali';

dict_SoundEnable = 'Abilitar sonoro';
dict_Volume = 'Volume';

dict_DefaultSound = 'Sonido por defecto';
dict_OptionsSound = 'Sonido de menu opciones';
dict_LoginSound = 'Sonido de entrada';
dict_ExitSound = 'Sonido de salida';
dict_WarpSound = 'Sonido durante el viaje(Distorsión)';
dict_ArriveSound = 'Sonido de llegar al sector';

dict_Note01 = 'tiene efecto en el próximo refresco de la página';

dict_Ok = 'OK';
dict_Cancel = 'Cancelar';

dict_FindEnemy_tt = 'Búsqueda de oponentes iguales (10 creditos)';
dict_FindEnemy = 'Busca enemigo';

dict_Amno_tt = 'Municiones';
dict_Amno = 'Municiones';

dict_Trade_tt = 'Mercado';
dict_Trade = 'Mercado';

dict_BlackMarket_tt = 'Mercado negro';
dict_BlackMarket = 'Mercado negro';

dict_Train_tt = 'Entrenamiento';
dict_Train = 'Entrenam.';

dict_Recruit_tt = 'Oficina de Reclutamiento';
dict_Recruit = 'Burocrata';

dict_Work_tt = 'Trabajo';
dict_Work = 'Trabajo';

dict_Storage_tt = 'Almacen';
dict_Storage = 'Almacen';

dict_Auction_tt = 'Casa de subastas';
dict_Auction = 'Subasta';

dict_Lab_tt = 'Laboratorio';
dict_Lab = 'Laboratorio';

dict_AllyMsg_tt = 'Mensaje general de alianza';
dict_AllyMsg = 'Mensaje general';	

dict_AllyMembers_tt = 'Miembros alianza';
dict_AllyMembers = 'Miembros';

dict_AllyBattles_tt = 'Batallas de alianza';
dict_AllyBattles = 'Batallas';	

dict_AllyUpgrade_tt = 'Ampliar alianza';
dict_AllyUpgrade = 'Ampliamento';

dict_SearchUpdates = 'clic aquí para buscar actualizaciones';
dict_Version = 'Versión';	

dict_HotkeyHelp = ['Informaciones sobre la herramienta, pulse ',' para abrir el menú de opciones'];

dict_AlertMsg = ['Introduzca tecla de acceso directo', 'Introduzca frecuencia de actualización'];

//******* dizionario autoaggiornamento - autoupdate dictionary *******
dict_AutoUpdate = ['Una nueva versión del ',
' script de usuario está disponible. ¿Quieres actualizar?',
'¿Desea desactivar la actualización automática de este script?',
'Las actualizaciones automáticas pueden ser re-habilitadas por esto script en el submenú de Comandos de Script de Usuario.',
'No hay actualizaciones disponibles por '
];

/*
 *******************************************
 ************** Data structures *************
 *******************************************
*/

// ******* dizionario minerali -  resources dictionary *******
dict_ArrMinerals = [
'Hierro',
'Duran', 
'Polenio', 
'Quadrinio', 
'Helenio', 
'Fosarita', 
'Melanite', 
'Megatan', 
'Querell', 
'Florisar', 
'Warium', 
'Crisolita', 
'Niciltar', 
'Hipolio', 
'Einsteinio'
];

// ******* dizionario abbreviazione minerali -  abbreviation resources dictionary *******
dict_ArrAbbrMin = [
'Meg++', 
'Que++', 
'Flo++', 
'War++', 
'Cri++', 
'Nic++', 
'Hip++', 
'Ein++'
];

// ******* dizionario munizioni -  amno dictionary *******
dict_ArrAmno = [
'Munición estándar',
'Munición APS',
'ASR 5', 
'FDR 13', 
'Ares II', 
'Ares I', 
'Llamatropa', 
'Smecker', 
'Choque Estrella', 
'Armazón bomba'
];

// ******* dizionario armi -  weapon dictionary *******
dict_ArrWeapon = [
'Azojal', 
'Yawawil', 
'Biqaj'
];

// ******* dizionario moduli -  modules dictionary *******
dict_ArrModule = [
'Marat', 
'Senofle', 
'Undassa',
'Nenofith', 
'Chamim', 
'Calenan', 
'CTX 11', 
'Fenesyn',  
'Sondast',  
'Estenin',  
'Lassathe', 
'Nensor', 
'Iladar'
];

// ******* dizionario extra -  extras dictionary *******
dict_ArrExtras= [
'Robot de Reparación', 
'Nano-kit'
];

// ******* menu titles *******
dict_TitleMenu = [
'Menú Plus',
'Menú Alianza',
'Minerales especiales',
'Info'
];

// ******* legend dictionary *******
dict_Legend = [
'Leyenda',
'Normal',
'Laboratorio',
'Mercado',
'Cuartel general',
'Minerales que faltan',
'Minerales Esp.'
];

// ******* Dictionary for Combat Report
dict_CR = [
'Habilidades de pilotaje',
'Camuflaje',
'Supervisión',
'Tecnología de Escudos',
'Reacción',
'Tec. de Sensores',
'Navegación',
'Datos de la nave',
'Puntos de estructura',
'Puntos de escudo',
'Láser',
'Espacio de módulos',
'Añadidos',
'Velocidad',
'Daño (máx)',
'Puntos daños causados:',
'Puntos estructura que quedan:',
'Generado con ',
'script Combat Report Converter'
];

// ******* Dictionary for Converter Box 
dict_CRbox = [
'Convertir Reporte',
'Reporte Convertido',
'Cerrar'
];

// ******* Dictionary for Left Position of some elements of Legend
d_lpl = [
'37px',
'42px',
'39px',
'40px',

'30px',
'36px',
'30px',
'18px'
];

// ******* abbreviations dictionary *******
//(p)urchase,(s)ell,(a)verage
sPurchase	=	'a';
sSell		=	'v';
sAverage	=	'm';

// ******* selection messages dictionary *******
dict_ChkSel = 'Selecionar/Deselecionar todo';

}


/* if you want to translate another language, please contact me, to include a new one. */

if(url.match('darkpirates.it')){
	//Italiano();
	cl = '_it';
}
if(url.match('darkpirates.com')){
	English();
	cl = '_en';
}
if(url.match('darkpirates.es')){
	Español();
	cl = '_es';
}


// ******* Impostazione per Minerali Speciali - Special resources *******
//	abbreviazione	link					ricetta						quando
minerali = new Array(	
dict_ArrAbbrMin[0], 'index.php?mod=labor&lab=1&reiter=1&rez=3',  dict_ArrMinerals[1]+':40 +  '+dict_ArrMinerals[5]+':75 +  '+dict_ArrMinerals[4]+':1',						 'X',
dict_ArrAbbrMin[1], 'index.php?mod=labor&lab=1&reiter=1&rez=6',  dict_ArrMinerals[2]+':100 + '+dict_ArrMinerals[5]+':50 +  '+dict_ArrMinerals[6]+':50 + '+dict_Lab[0],    'L',
dict_ArrAbbrMin[2], 'index.php?mod=labor&lab=1&reiter=1&rez=9',  dict_ArrMinerals[0]+':500 + '+dict_ArrMinerals[2]+':400 + '+dict_ArrMinerals[4]+':30 + '+dict_Lab[0],	 'L',
dict_ArrAbbrMin[3], 'index.php?mod=labor&lab=1&reiter=1&rez=12', dict_ArrMinerals[1]+':400 + '+dict_ArrMinerals[3]+':80 +  '+dict_ArrMinerals[6]+':4 +  '+dict_Lab[0],	 'L',
dict_ArrAbbrMin[4], 'index.php?mod=labor&lab=1&reiter=1&rez=15', dict_ArrMinerals[1]+':32 +  '+dict_ArrMinerals[5]+':25 +  '+dict_ArrMinerals[7]+':7 +  '+dict_Lab[0],	 'L',
dict_ArrAbbrMin[5], 'index.php?mod=labor&lab=1&reiter=1&rez=18', dict_ArrMinerals[3]+':60 +  '+dict_ArrMinerals[7]+':26 +  '+dict_ArrMinerals[10]+':7 + '+dict_Lab[0],	 'L',
dict_ArrAbbrMin[6], 'index.php?mod=labor&lab=1&reiter=1&rez=21', dict_ArrMinerals[9]+':4 +   '+dict_ArrMinerals[12]+':12 + '+dict_Lab[0],									 'L',
dict_ArrAbbrMin[7], 'index.php?mod=labor&lab=1&reiter=1&rez=24', dict_ArrMinerals[11]+':3 +  '+dict_ArrMinerals[12]+':2 +  '+dict_ArrMinerals[13]+':6 + '+dict_Lab[0],	 'L'
);

// ******* Impostazione collegamenti veloci - General shortcuts assignment *******
//quando	URL								titolo					classe		testo			stile
m_p = new Array(
'X',	'javascript:findenemy();',			dict_FindEnemy_tt,		'mplus_m',	dict_FindEnemy, 	'',
'X',	'index.php?mod=hangar&reiter=2',	dict_Amno_tt,			'mplus_m',	dict_Amno,	 	'',
'S',	'index.php?mod=shop',				dict_Trade_tt,			'mplus_z',	dict_Trade, 		'',
'B',	'index.php?mod=market',				dict_BlackMarket_tt,	'mplus_m',	dict_BlackMarket,	'',
'T',	'index.php?mod=training',			dict_Train_tt,			'mplus_m',	dict_Train,		'',
'O',	'index.php?mod=office',				dict_Recruit_tt,		'mplus_m',	dict_Recruit,		'',
'J',	'index.php?mod=job',				dict_Work_tt,			'mplus_m',	dict_Work,		'',
'P',	'index.php?mod=packages',			dict_Storage_tt,		'mplus_m',	dict_Storage,		'',
'A',	'index.php?mod=auction',			dict_Auction_tt,		'mplus_m',	dict_Auction,		'',
'L',	'index.php?mod=laborshop',			dict_Lab_tt,			'mplus_m',	dict_Lab,			''
);

// ******* Impostazione collegamenti ally - Ally shortcuts *******
m_a = new Array(
'W',	'index.php?mod=ally&submod=allyrecht',		dict_AllyMsg_tt,		'mplus_m',	dict_AllyMsg, 	'',
'W',	'index.php?mod=ally&submod=allymembers',	dict_AllyMembers_tt,	'mplus_m',	dict_AllyMembers, '',
'W',	'index.php?mod=ally&submod=allyfights',		dict_AllyBattles_tt,	'mplus_m',	dict_AllyBattles,	'',
'W',	'index.php?mod=ally&submod=allycastle',		dict_AllyUpgrade_tt,	'mplus_m',	dict_AllyUpgrade,	''
);
// ******* Impostazione collegamenti Info - Info shortcuts *******
m_i = new Array(
'W',	'http://userscripts.org/scripts/show/59946', dict_SearchUpdates, 'mplus_m',	dict_Version +' '+Versione, 	'color:#884444'
);

// ******* Anagrafica settori - Sector data *******
//	nome settore			warp		cosa
sektor_anag = new Array(
	'Green Hell',			'24',		'',
	'Rubine Nebula',		'23',		'',
	'Tol. Asteroid Field',	'22',		'L',
	'Azure Star Cluster',	'21',		'',
	'Ancient Battlefield',	'20',		'',
	'Dwarf Sun',			'19',		'',
	'Hades System',			'18',		'T',
	'Avalon Sector',		'17',		'SJ',
	'Limes Ater',			'16',		'S',
	'Lotus Flairs',			'15',		'L',
	'Giant Crystals',		'14',		'J',
	'Sandstorm Nebula',		'13',		'S',
	'Crystalin Planet',		'12',		'L',
	'Space Singularity',	'11',		'',
	'Cobalt Rings',			'10',		'',
	'Ancient Alien Rem.',	'9',		'',
	'Mammoth Nebula',		'8',		'',
	'Viking Anomaly',		'7',		'L',
	'Gar. Asteroid Field',	'6',		'',
	'Heero Ma Tahh',		'5',		'T',
	'HQ Teril Tkarr',		'4',		'SBTOJPA',
	'HQ Carminians',		'3',		'SBTOJPA',
	'HQ Djem Al Dhir',		'2',		'SBTOJPA',
	'HQ Atlanticans',		'1',		'SBTOJPA'
);
/*
cosa:
S=Mercato (S)hop
B=Mercato Nero (B)lack Market
T=Allenamento (T)raining
O=Ufficio Reclutameto o Burocrate (O)ffice
J=Lavoro (J)ob
P=Magazzino (P)ackages
A=Asta (A)uction
L=Mercato Laboratorio (L)aborShop
*/
	
str_s_m_prx  = new Array(
'4.995',
'6.300',
'8.167',
'3.132',
'19.883',
'55.782',
'240.723',
'612.873'
);
		
// ******* Preparazione nomi e prezzi: Minerali, Minerali Speciali, Munizioni, Armi, Scudi, Propulsori, Extra - Replacements definitions *******
var str_to_eval = "";
str_to_eval += " var replacements = { ";
	str_to_eval += "'"+dict_ArrMinerals[0]+"': '"+dict_ArrMinerals[0]+" ("+sPurchase+"3 "+sSell+"5 "+sAverage+"4)', ";
	str_to_eval += "'"+dict_ArrMinerals[1]+"': '"+dict_ArrMinerals[1]+" ("+sPurchase+"11 "+sSell+"22 "+sAverage+"18)', ";
	str_to_eval += "'"+dict_ArrMinerals[2]+"': '"+dict_ArrMinerals[2]+" ("+sPurchase+"19 "+sSell+"35 "+sAverage+"28)', ";
	str_to_eval += "'"+dict_ArrMinerals[3]+"': '"+dict_ArrMinerals[3]+" ("+sPurchase+"6 "+sSell+"9 "+sAverage+"7)',";
	str_to_eval += "'"+dict_ArrMinerals[4]+"': '"+dict_ArrMinerals[4]+" ("+sPurchase+"148 "+sSell+"292 "+sAverage+"232)',";
	str_to_eval += "'"+dict_ArrMinerals[5]+"': '"+dict_ArrMinerals[5]+" ("+sPurchase+"60 "+sSell+"107 "+sAverage+"90)',";
	str_to_eval += "'"+dict_ArrMinerals[6]+"': '"+dict_ArrMinerals[6]+" ("+sPurchase+"95 "+sSell+"163 "+sAverage+"133)',";
		str_to_eval += "'"+dict_ArrMinerals[7]+"': '"+dict_ArrMinerals[7]+" (max "+str_s_m_prx[0]+")',";
		str_to_eval += "'"+dict_ArrMinerals[8]+"': '"+dict_ArrMinerals[8]+" (max "+str_s_m_prx[1]+")',";
		str_to_eval += "'"+dict_ArrMinerals[9]+"': '"+dict_ArrMinerals[9]+" (max "+str_s_m_prx[2]+")',";
		str_to_eval += "'"+dict_ArrMinerals[10]+"': '"+dict_ArrMinerals[10]+" (max "+str_s_m_prx[3]+")',";
		str_to_eval += "'"+dict_ArrMinerals[11]+"': '"+dict_ArrMinerals[11]+" (max "+str_s_m_prx[4]+")',";
		str_to_eval += "'"+dict_ArrMinerals[12]+"': '"+dict_ArrMinerals[12]+" (max "+str_s_m_prx[5]+")',";
		str_to_eval += "'"+dict_ArrMinerals[13]+"': '"+dict_ArrMinerals[13]+" (max "+str_s_m_prx[6]+")',";
		str_to_eval += "'"+dict_ArrMinerals[14]+"': '"+dict_ArrMinerals[14]+" (max "+str_s_m_prx[7]+")',";

str_to_eval += "'"+dict_ArrAmno[0]+"': '"+dict_ArrAmno[0]+" P:0',";
str_to_eval += "'"+dict_ArrAmno[1]+"': '"+dict_ArrAmno[1]+" P:1neut',";
str_to_eval += "'"+dict_ArrAmno[2]+"': '"+dict_ArrAmno[2]+" P:100cr',";
str_to_eval += "'"+dict_ArrAmno[3]+"': '"+dict_ArrAmno[3]+" P:300cr',";
str_to_eval += "'"+dict_ArrAmno[4]+"': '"+dict_ArrAmno[4]+" P:20neut',";
str_to_eval += "'"+dict_ArrAmno[5]+"': '"+dict_ArrAmno[5]+" P:10neut',";
str_to_eval += "'"+dict_ArrAmno[6]+"': '"+dict_ArrAmno[6]+" P:150cr',";
str_to_eval += "'"+dict_ArrAmno[7]+"': '"+dict_ArrAmno[7]+" P:600cr',";
str_to_eval += "'"+dict_ArrAmno[8]+"': '"+dict_ArrAmno[8]+" P:3neut',";
str_to_eval += "'"+dict_ArrAmno[9]+"': '"+dict_ArrAmno[9]+" P:15neut',";

	str_to_eval += "'"+dict_ArrWeapon[0]+"': '"+dict_ArrWeapon[0]+" P:5.000cr',";
	str_to_eval += "'"+dict_ArrWeapon[1]+"': '"+dict_ArrWeapon[1]+" P:40.000cr',";
	str_to_eval += "'"+dict_ArrWeapon[2]+"': '"+dict_ArrWeapon[2]+" P:5.000neut',";
	
str_to_eval += "'"+dict_ArrModule[0]+"': '"+dict_ArrModule[0]+" P:5.000cr',";
str_to_eval += "'"+dict_ArrModule[1]+"': '"+dict_ArrModule[1]+" P:5.000cr',";
str_to_eval += "'"+dict_ArrModule[2]+"': '"+dict_ArrModule[2]+" P:10.000cr',";
str_to_eval += "'"+dict_ArrModule[3]+"': '"+dict_ArrModule[3]+" P:15.000cr',";
str_to_eval += "'"+dict_ArrModule[4]+"': '"+dict_ArrModule[4]+" P:5.000neut',";
str_to_eval += "'"+dict_ArrModule[5]+"': '"+dict_ArrModule[5]+" P:10.000neut',";
str_to_eval += "'"+dict_ArrModule[6]+"': '"+dict_ArrModule[6]+" P:20.000cr',";
str_to_eval += "'"+dict_ArrModule[7]+"': '"+dict_ArrModule[7]+" P:35.000cr',";
str_to_eval += "'"+dict_ArrModule[8]+"': '"+dict_ArrModule[8]+" P:10.000neut',";
str_to_eval += "'"+dict_ArrModule[9]+"': '"+dict_ArrModule[9]+" P:50.000cr',";
str_to_eval += "'"+dict_ArrModule[10]+"': '"+dict_ArrModule[10]+" P:50.000cr',";
str_to_eval += "'"+dict_ArrModule[11]+"': '"+dict_ArrModule[11]+" P:20.000neut',";
str_to_eval += "'"+dict_ArrModule[12]+"': '"+dict_ArrModule[12]+" P:25.000neut',";

	str_to_eval += "'"+dict_ArrExtras[0]+' '+subst_ArrRomanNumb[0]+"': '"+dict_ArrExtras[0]+" "+subst_ArrRomanNumb[1]+" P:20.000neut',";
	str_to_eval += "'"+dict_ArrExtras[0]+' '+subst_ArrRomanNumb[2]+"': '"+dict_ArrExtras[0]+" "+subst_ArrRomanNumb[3]+" P:5.000neut',";
	str_to_eval += "'"+dict_ArrExtras[0]+' '+subst_ArrRomanNumb[4]+"': '"+dict_ArrExtras[0]+" "+subst_ArrRomanNumb[5]+" P:40.000cr',";
	str_to_eval += "'"+dict_ArrExtras[0]+' '+subst_ArrRomanNumb[6]+"': '"+dict_ArrExtras[0]+" "+subst_ArrRomanNumb[7]+" P:10.000cr',";
	str_to_eval += "'"+dict_ArrExtras[1]+"': '"+dict_ArrExtras[1]+" P:5.000neut'";
	
str_to_eval += "};";
eval(str_to_eval);


// ******* Correzioni parole DarkPirates - Just to correct translation/description errors, if you have others please contact me *******
var correzioni = {
	'(Personaggi)': 'Caratteri',
	' acceso ': ' in ',
	'Hai trovato ancora': 'Devi ancora trovare',
	'Razziato ancora': 'Devi ancora razziare',
	' tuo dovere tenerti informato':' mio dovere tenerti informato',
	'pochi Nave da trasporto':'poche Navi da trasporto',
	'degli ultimi 7 giorni':'delle ultime 12 ore',
	'negli ultimi 7 giorni':'nelle ultime 12 ore',
	'allanza':'alleanza',
	'Informazione salvata.!':'Informazione salvata!',
	'imposta Hompage':'imposta Homepage',
	'Statistiche dello scontro':'Statistiche degli scontri',
	'bannato dal server.;':'bannato dal server.',
	'rifoernimenti':'rifornimenti',
	'Punti danno inflitti':'Danni ricevuti',
	'Punti danno ricevuti':'Danni inflitti',
		'::':':',
		'banned from the server.;':'banned from the server.',
		'raw materials to to create':'raw materials to create',
		'Damage Points Dealt':'Damage Received',
		'Damage Points Received':'Damage Dealt',
	'Daño causado:':'Puntos daños recibidos:',
	'Daño recibido:':'Puntos daños causados:'
};


var stato_menuplus = BB_get("BB_MenuPlus", true);
var stato_menually = BB_get("BB_MenuAlly", true);
var stato_menuminerali = BB_get("BB_MenuMinerali", true);

var flag_menuplus = stato_menuplus ? 'checked="checked"' : '';
var flag_menually = stato_menually ? 'checked="checked"' : '';
var flag_menuminerali = stato_menuminerali ? 'checked="checked"' : '';
var flag_abilitasuoni = BB_AbilitaSuoni ? 'checked="checked"' : '';
var spaziatura = '';
for (var i = 0; i < 10; i++) spaziatura += '&nbsp;';
var px_left_box = Math.round(screen.width/10).toString();
var px_largh_box = Math.round(screen.width/1.25).toString();
var style_txtarea = 'style="width:'+Math.round(screen.width/2).toString()+'px;"';
var style_txtarea = 'style="width:100%;"';

// Box Opzioni - Options Box 
var option_box = creEl('div');
var appBox ='';
// Creazione form - Form creation 
appBox +='<div id="BB_option_box" style="text-align:left; position:fixed; bottom:30px; left:' + px_left_box + 'px; width:'+px_largh_box+'px; visibility:hidden; margin:1px; margin:auto; padding:4px; color:#BA9700; border:1px solid #808080; background:#000000; -moz-opacity:0.85; opacity: 0.85; font:12px arial; z-index:99999;">';
appBox +='<form action="" enctype="multipart/form-data">';
// Tabella - Table
appBox +='<table id="BB_table" cellpadding="0"cellspacing="0" width="100%" style="border:none;color:#808080;font-weight: bold; font-size:8pt;">';
// Titolo - Title
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell" colspan="2" align="center"><span id="BB_span" style="color:#BA9700;font-size:16px;font-weight:bold;">';
appBox +=dict_FormTitle + '</span><br /></td>';
appBox +='</tr>';
// Tasto di scelta rapida - Hotkey
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+ dict_KeyShortcut + spaziatura + '</td>';
appBox +='<td id="BB_cell"><input type="text" size="01" value="' + BB_hotkey + '" id="BB_hotkey"  maxlength="1" class="betreff"> </td>';
appBox +='</tr>';
// Frequenza di aggiornamento - Frequency update
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+ dict_DaysUpdate + spaziatura + '</td>';
appBox +='<td id="BB_cell"><input type="text" size="01" value="' + BB_FreqUpdate + '" id="BB_FreqUpdate"  maxlength="1" class="betreff"> </td>';
appBox +='</tr>';
//*** Serie di spunte per mostrare/nascondere menù (valore predefinito é True) - checkboxes to show/hide menus (default value is True)
//Menù principale - Main menu
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_MnuPlusShow +'</td>';
appBox +='<td id="BB_cell"><input type="checkbox" ' + flag_menuplus + 'id="BB_MenuPlus" >* </td>';
appBox +='</tr>';
//Menù ally - Ally Menu
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_MnuAllyShow +'</td>';
appBox +='<td id="BB_cell"><input type="checkbox" ' + flag_menually + 'id="BB_MenuAlly" >* </td>';
appBox +='</tr>';
//Menù minerali speciali - Special minerals menu
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_MnuMineralsShow +'</td>';
appBox +='<td id="BB_cell"><input type="checkbox" ' + flag_menuminerali + 'id="BB_MenuMinerali" >* </td>';
appBox +='</tr>';
// ******* Sezione dedicata ai suoni - sound section
//Abilitazione suoni - sound enabling
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_SoundEnable+'</td>';
appBox +='<td id="BB_cell"><input type="checkbox" ' + flag_abilitasuoni + 'id="BB_AbilitaSuoni" >* </td>';
appBox +='</tr>';
//Composizione controllo lista per volume - listbox to control the volume
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_Volume +'</td>';
appBox +='<td id="BB_cell">';
appBox +='<select id="BB_volume" class="auswahl">';
appBox +='<option id="BB_vol01" value="1">1</option>';
appBox +='<option id="BB_vol02" value="2">2</option>';
appBox +='<option id="BB_vol03" value="3">3</option>';
appBox +='<option id="BB_vol04" value="4">4</option>';
appBox +='<option id="BB_vol05" value="5">5</option>';
appBox +='<option id="BB_vol06" value="6">6</option>';
appBox +='<option id="BB_vol07" value="7">7</option>';
appBox +='<option id="BB_vol08" value="8">8</option>';
appBox +='<option id="BB_vol09" value="9">9</option>';
appBox +='<option id="BB_vol10" value="10">10</option>';
appBox +='</select>';
appBox +='</td>';
appBox +='</tr>';
//Suono predefinito - default sound
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_DefaultSound +'</td>';
appBox +='<td id="BB_cell"><input type="textarea" id="BB_snd_default" '+style_txtarea+' wrap="soft" value="' + BB_snd_default + '" class="betreff"> </td>';
appBox +='</tr>';
//Suono menù opzioni - Option menu sound
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_OptionsSound +'</td>';
appBox +='<td id="BB_cell"><input type="textarea" id="BB_snd_optmenu" '+style_txtarea+' wrap="soft" value="' + BB_snd_optmenu + '" class="betreff"> </td>';
appBox +='</tr>';
//Suono in accesso - login sound
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_LoginSound +'</td>';
appBox +='<td id="BB_cell"><input type="textarea" id="BB_snd_login" '+style_txtarea+' wrap="soft" value="' + BB_snd_login + '" class="betreff"> </td>';
appBox +='</tr>';
//Suono in uscita - logout sound
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_ExitSound +'</td>';
appBox +='<td id="BB_cell"><input type="textarea" id="BB_snd_logout" '+style_txtarea+' wrap="soft" value="' + BB_snd_logout + '" class="betreff"> </td>';
appBox +='</tr>';
//Suono in fase warp - warp sound
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_WarpSound +'</td>';
appBox +='<td id="BB_cell"><input type="textarea" id="BB_snd_warp" '+style_txtarea+' wrap="soft" value="' + BB_snd_warp + '" class="betreff"> </td>';
appBox +='</tr>';
//Suono di arrivo al settore - landing sound
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell">'+dict_ArriveSound +'</td>';
appBox +='<td id="BB_cell"><input type="textarea" id="BB_snd_arrived" '+style_txtarea+' wrap="soft" value="' + BB_snd_arrived + '" class="betreff"> </td>';
appBox +='</tr>';
// ******* Sezione dedicata alle note - notes section
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell" colspan="2" style="font-size:9px;"><br />(*) '+dict_Note01 +'</td>';
appBox +='</tr>';
// ******* Bottoni di selezione - selection buttons
appBox +='<tr id="BB_row">';
appBox +='<td id="BB_cell" colspan="2" align="center"><br /><input type="button" class="button1" value="'+dict_Ok +'" id="BB_ok">&nbsp;';
appBox +='<input  type="reset" class="button1" value="'+dict_Cancel +'" id="BB_cancel"  onclick="document.getElementById(\'BB_option_box\').style.visibility=\'hidden\';">';
appBox +='</td>';
appBox +='</tr>';
//Chiusura form - form close
appBox +='</table>';
appBox +='<br />';
appBox +='</form></div>';
//Inserimento nel documento - document injection
option_box.innerHTML = appBox;
document.body.appendChild(option_box);


if (url.match('mod=report') ){

	var UL_Append = creEl('div');
	var elementUL = document.getElementsByClassName('TabbedPanelsTabGroup')[0];
	var UL_content = '<div><br /><br /></div>';
	UL_Append.innerHTML = UL_content;
	elementUL.appendChild(UL_Append);

	var CR_button = creEl('div');
	var BBCR_content ='';
	//var target_BBCR = find("//div[@id='mitte']", XPFirst);
	//var target_BBCR = document.getElementById('textcontent-bg-unten');
	var target_BBCR = document.getElementById('mitte');

	//CR_button.setAttributeNode(att.cloneNode(true));

	BBCR_content += '<div style="align: center">';
	BBCR_content += '<form name="formCombatReport" action="">';
	
	BBCR_content +='<table id="BB_table" cellpadding="0"cellspacing="0" width="780px" style="border:none;color:#808080;font-weight: bold; font-size:8pt;">';

	BBCR_content +='<tr id="BB_row">';
	BBCR_content +='<td id="BB_cell" colspan="1" background="img/sub-middle.gif" align="center"><span id="BB_span" style="color:#BA9700;font-size:16px;font-weight:bold;">';
	BBCR_content +='<input type="button" value="'+dict_CRbox[0]+'" class="button3" style="align: center" id="BBCR_Convert"></span><br /></td>';
	BBCR_content +='</tr>';
	BBCR_content += '</form>';
	BBCR_content += '</div>';

	CR_button.innerHTML = BBCR_content;

	target_BBCR.appendChild(CR_button);
	
	var BBCR_box = creEl('div');
	var BBCRBox ='';
	BBCRBox +='<div id="BBCR_box" style="text-align:left; position:fixed; bottom:30px; left:' + px_left_box + 'px; width:'+px_largh_box+'px; visibility:hidden; margin:1px; margin:auto; padding:4px; color:#BA9700; border:1px solid #808080; background:#000000; -moz-opacity:0.85; opacity: 0.85; font:12px arial; z-index:99999;">';
	BBCRBox +='<form name="formReport" action="" enctype="multipart/form-data">';
	BBCRBox +='<table id="BBCR_table" cellpadding="0"cellspacing="0" width="100%" style="border:none;color:#808080;font-weight: bold; font-size:8pt;">';
	BBCRBox +='<tr id="BBCR_row">';
	BBCRBox +='<td id="BBCR_cell" colspan="1" align="center"><span id="BBCR_span" style="color:#BA9700;font-size:16px;font-weight:bold;">';
	BBCRBox +=dict_CRbox[1]+'</span><br /></td>';
	BBCRBox +='</tr>';
	BBCRBox +='<tr id="BBCR_row">';
	BBCRBox +='<td id="BBCR_cell"><textarea name="ReportText" id="BBCR_ReportText" rows=30 cols='+ px_largh_box/8.25 +'></textarea></td>';
	BBCRBox +='</tr>';
	BBCRBox +='<tr id="BBCR_row">';
	BBCRBox +='<input  type="reset" class="button1" value="'+dict_CRbox[2]+'" id="BBCR_cancel"  onclick="document.getElementById(\'BBCR_box\').style.visibility=\'hidden\';">';
	BBCRBox +='</td>';
	BBCRBox +='</tr>';
	BBCRBox +='</table>';
	BBCRBox +='<br />';
	BBCRBox +='</form></div>';

	BBCR_box.innerHTML = BBCRBox;
	document.body.appendChild(BBCR_box);


	document.addEventListener('click', function(event){

		if(event.target.id=='BBCR_Convert'){
			
			convert();
		
		}

	}, false);
	
}


// ******* Mostra e nascondi opzioni - show/hide options
document.addEventListener('keypress', function(event){
	// ******* Ignora input da campo testo - ignore textbox input
	if (event.target.type && event.target.type.match(/text/) ){
		return;
	}
	
	// ******* mostra e nasconde il menu' quando il tasto corretto e' stato premuto - hide/show menu when correct hotkey is pressed
	if (event.charCode == getEl('BB_hotkey').value.charCodeAt(0)){
		var obox = getEl('BB_option_box');
		if(obox.style.visibility=='visible'){
			playSound(BB_AbilitaSuoni,BB_snd_default,BB_volume*10,false);
			obox.style.visibility='hidden';
		} else {
			obox.style.visibility='visible';
			playSound(BB_AbilitaSuoni,BB_snd_optmenu,BB_volume*10,false);
			selectSelected('BB_volume', BB_volume);
		}
	}
}, false);

// ******* Aggiunge eventi e intercetta i click per controllare se i bottoni dei menu' sono stati premuti - add events to detect click and to control if menu buttons are pressed
document.addEventListener('click', function(event){

	var obox = getEl('BB_option_box');
	var hide = true;

	//******* OK-button del menu' cliccato - ok button menu pressed 
	if(event.target.id=='BB_ok'){
		
		if(getEl('BB_hotkey').value.length==1){
			BB_set('BB_hotkey', getEl('BB_hotkey').value);
		} else {
			alert(dict_AlertMsg[0]);
			hide=false;
		}
		if(getEl('BB_FreqUpdate').value.length==1){
			GM_setValue('BB_FreqUpdate', getEl('BB_FreqUpdate').value); //language indipendent value
		} else {
			alert(dict_AlertMsg[1]);
			hide=false;
		}
		
		BB_set('BB_MenuPlus', getEl('BB_MenuPlus').checked);
		BB_set('BB_MenuAlly', getEl('BB_MenuAlly').checked);
		BB_set('BB_MenuMinerali', getEl('BB_MenuMinerali').checked);
		BB_set('BB_AbilitaSuoni', getEl('BB_AbilitaSuoni').checked);
		BB_set('BB_volume', getEl('BB_volume').value);
		BB_set('BB_snd_default', getEl('BB_snd_default').value);
		BB_set('BB_snd_optmenu', getEl('BB_snd_optmenu').value);
		BB_set('BB_snd_login', getEl('BB_snd_login').value);
		BB_set('BB_snd_logout', getEl('BB_snd_logout').value);
		BB_set('BB_snd_warp', getEl('BB_snd_warp').value);
		BB_set('BB_snd_arrived', getEl('BB_snd_arrived').value);
		BB_volume = BB_get("BB_volume", '1');

		if (hide){
			obox.style.visibility='hidden';
		}
	}
	
	// ******* Chiude il box opzioni se viene eseguito un click fuori da esso - close the option box if there is an outside click
	if (event.target.id.substr(0,3)!='BB_'){
		obox.style.visibility='hidden';
	}
}, true);


function selectSelected(listName, selectedValue){
	var listBox = getEl(listName);
	for(i=0; i<listBox.length; i++){
		if (listBox.options[i].text==selectedValue){
			listBox.options[i].selected=true;
			break;
		}
	}
}



function selectAll(theField) {
	//var tempval=eval("document."+theField);
	var tempval = document.getElementById(theField);
	tempval.focus();
	tempval.select();
}

function convert(){

	var Mitte = document.getElementById('mitte');
	
	var ClassElements=Mitte.getElementsByClassName('name');
	//for (var i=0;i<ClassElements.length;i++)

	var Attacker=ClassElements[0].innerHTML;
	var Defender=ClassElements[1].innerHTML;
	
	
	var Images = Mitte.getElementsByTagName('img');
	
	var AttackerImg = Images[0].src;
	var DefenderImg = Images[1].src;

	
	ClassElements=document.getElementsByClassName('wertrechts');

	
	var Winner=Mitte.getElementsByClassName('proname')[0].innerHTML;

	var Report=Mitte.getElementsByClassName('sp-balken')[0].innerHTML;

	var PanelContents=Mitte.getElementsByClassName('TabbedPanelsContent')[0];
	
	var TdElements = PanelContents.getElementsByTagName('td');

	var TdResult='';

	var oBBCRbox = getEl('BBCR_box');
	oBBCRbox.style.visibility='visible';

	var TextReport = document.getElementById('BBCR_ReportText');
	var testoReport ='';
	testoReport+='[SIZE=14][B][COLOR=#FFFF00]'+Attacker+'[/COLOR][COLOR=orange][SIZE=10] _VS_ [/SIZE][/COLOR][COLOR=#00C000]'+Defender+'[/COLOR][/B][/SIZE]\n\n\n';
	testoReport+='[align=center][SIZE=14][B][COLOR=orange]';
	testoReport+=Report;
	testoReport+='[/COLOR][/B][/SIZE]\n';
	testoReport+='[IMG]'+ AttackerImg + '[/IMG][COLOR=#15282E]_[/COLOR][COLOR=orange][SIZE=20][B]VS[/B][/SIZE][/COLOR] [COLOR=#15282E]_[/COLOR]';
	testoReport+='[IMG]'+ DefenderImg + '[/IMG]\n\n\n';
	
	testoReport+='[B][COLOR=orange][U]'+ dict_CR[0] +'[/U][/COLOR][/B]\n';

	testoReport+='[COLOR=#FFFF00]'+ dict_CR[1] +ClassElements[0].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[1] +ClassElements[13].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[2] +ClassElements[1].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[2] +ClassElements[14].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[3] +ClassElements[2].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[3] +ClassElements[15].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[4] +ClassElements[3].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[4] +ClassElements[16].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[5] +ClassElements[4].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[5] +ClassElements[17].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[6] +ClassElements[5].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[6] +ClassElements[18].innerHTML+'[/COLOR]\n';


	testoReport+='[B][COLOR=orange][U]'+ dict_CR[7] +'[/U][/COLOR][/B]\n';
	
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[8] +ClassElements[6].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[8] +ClassElements[19].innerHTML+'[/COLOR][COLOR=#15282E]_[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[9] +ClassElements[7].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[9] +ClassElements[20].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[10] +ClassElements[8].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[10] +ClassElements[21].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[11] +ClassElements[9].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[11] +ClassElements[22].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[12] +ClassElements[10].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[12] +ClassElements[23].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[13] +ClassElements[11].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[13] +ClassElements[24].innerHTML+'[/COLOR]\n';
	testoReport+='[COLOR=#FFFF00]'+ dict_CR[14] +ClassElements[12].innerHTML+'[/COLOR][COLOR=#15282E]__________[/COLOR][COLOR=#00C000]'+ dict_CR[14] +ClassElements[25].innerHTML+'[/COLOR][COLOR=#15282E]_[/COLOR]\n\n\n';

	testoReport+='[COLOR=orange][SIZE=24][B]'+Winner+'[/B][/SIZE][/COLOR]\n\n\n';
	
	testoReport+='[COLOR=#FFFF00][B]'+TdElements[3].innerHTML+'[/B]\n';
	
	testoReport+=dict_CR[15] +'[U]'+TdElements[4].innerHTML+'[/U]\n';
	testoReport+=dict_CR[16] +TdElements[5].innerHTML+'[/COLOR]\n\n';
	
	testoReport+='[COLOR=#00C000][B]'+ TdElements[6].innerHTML +'[/B]\n';
	
	testoReport+=dict_CR[15] +'[U]'+TdElements[7].innerHTML+'[/U]\n';
	testoReport+=dict_CR[16] +TdElements[8].innerHTML+'[/COLOR]\n\n\n';
	
	TdResult=TdElements[9].innerHTML;
	var Bottino=TdResult.split('<',1);
	
	testoReport+='[COLOR=orange]'+Bottino+'\n';
	testoReport+=TdElements[10].innerHTML+'\n';
	testoReport+=TdElements[11].innerHTML +'[/COLOR]\n\n\n';
	testoReport+='[color=#00ffff][SIZE=10][B]'+dict_CR[17] +'[url=\''+m_i[1]+'\']BaseBogTool[/url]'+dict_CR[18] +'[/B][/SIZE][/COLOR]\n';
	testoReport+='[/align]\n';
	


	TextReport.innerHTML=testoReport;
	//selectAll('formReport.ReportText');
	selectAll('BBCR_ReportText');
}

// ************************
// ******* Funzioni *******
// ************************

//riduciamo un po' il codice - compact code
function getEl(elemId){
	return document.getElementById(elemId);
}
function creEl(elemId){
	return document.createElement(elemId);
}

function BB_get(elemId,defaultValue){
	return GM_getValue(elemId+cl,defaultValue);
}

function BB_set(elemId,value2set){
	GM_setValue(elemId+cl,value2set);
}

function playSound(Enable,TheSound,TheVolume,RepeatSound){
	if (Enable){
		var mpegdiv = creEl("div");
		var mpegobject = creEl("object");
		mpegobject.type = "audio/mpeg";
		mpegobject.data = TheSound;
		//mpegobject.width = 200;
		//mpegobject.height = 20;
		mpegdiv.appendChild(mpegobject);
		
		var mpegsrcparam = creEl("param");
		mpegsrcparam.name = "src";
		mpegsrcparam.value = TheSound;
		mpegobject.appendChild(mpegsrcparam);
		
		var mpegautoparam = creEl("param");
		mpegautoparam.name = "autostart";
		mpegautoparam.value = "true";
		mpegobject.appendChild(mpegautoparam);
		
		var mpegloopparam = creEl("param");
		mpegloopparam.name = "loop";
		mpegloopparam.value = RepeatSound ? "true" : "false";
		mpegobject.appendChild(mpegloopparam);
		
		var mpeghideparam = creEl("param");
		mpeghideparam.name = "hidden";
		mpeghideparam.value = "true";
		mpegobject.appendChild(mpeghideparam);
		
		var mpegvolparam = creEl("param");
		mpegvolparam.name = "volume";
		mpegvolparam.value = TheVolume;
		mpegobject.appendChild(mpegvolparam);
		
		document.body.appendChild(mpegdiv);
		
	}
}


// ******* funzione conto alla rovescia per inserimento su barra titolo - time counter to insert in titlebar*******
function ContoRovescia(){

	try	{
		if (titolo=='#'){
			titolo=document.title;
			elemento = getEl('bx0');
			if (elemento){
				contatore = elemento.innerHTML;
				document.title=contatore+" - "+titolo;
				app = window.setTimeout(ContoRovescia,100);
			}
			
		} else {
			elemento = getEl('bx0');
			if (elemento){
				contatore = elemento.innerHTML;
				document.title=contatore+" - "+titolo;
				app = window.setTimeout(ContoRovescia,111);
			}
		}
	}
	catch(err){
		clearTimeout(app);
		//alert(err.description);
	}

}


// ******* Ricerca - find *******
function find(xpath, xpres){
	var ret = document.evaluate(xpath, document, null, xpres, null);
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

// ******* Ricerca modificata per restituzione nome settore - find sector *******
function RicercaSettore(){

	var n_settore ="N.D.";
	try {
		var ret = document.evaluate("//a[@href='index.php?mod=sektormap']", document, null, XPFirst, null);
		var hnd_settore = ret.singleNodeValue;
		n_settore = hnd_settore.text;	
	}
	catch (e){
		n_settore="N.D.";
	}
	finally{ 
		return n_settore;
	}

}


// ******* Corpo dello script - script body *******

// ******* login/signup section *******
if(url.match('mod=login')||url.match('mod=signup')){
	playSound(BB_AbilitaSuoni,BB_snd_login,BB_volume*10,false);
}

// ******* logout section *******
if(url.match('mod=logout')){
	playSound(BB_AbilitaSuoni,BB_snd_logout,BB_volume*10,false);
}

// ******* warp section *******
if(url.match('mod=map&warp=')){
	try {
		var ret = find("//div[@id='warp']", XPFirst);
		var nodo = ret.singleNodeValue;
		playSound(BB_AbilitaSuoni,BB_snd_warp,BB_volume*10,true);
	}
	catch (e){
		playSound(BB_AbilitaSuoni,BB_snd_arrived,BB_volume*10,false);
	}

}


// ******* general section *******
if ( url.match('mod=') ){
// ******* Preparazione elementi Comuni *******
	var target = find("//div[@id='logo']", XPFirst);
	var target_menu = find("//div[@id='navi-rand']", XPFirst);
	
	// ******* Recupero nome settore *******
	var nome_settore=RicercaSettore();

	var map_caption = creEl("div");
	var map_legend = creEl("div");
	var map_minerals = creEl("div");
	var map_nominerals = creEl("div");
	
	var map_style = creEl("style");
	var map_menuplus = creEl("div");
	
	att = document.createAttribute('style');
	att.value = 'position: relative;';
	
	map_caption.setAttributeNode(att.cloneNode(true));
	map_legend.setAttributeNode(att.cloneNode(true));
	map_minerals.setAttributeNode(att.cloneNode(true));
	map_nominerals.setAttributeNode(att.cloneNode(true));
	
	map_menuplus.setAttributeNode(att.cloneNode(true));
	
	zlivello = ' z-index: 3;';
	pr = 'position: relative; ';
	pa = 'position: absolute; ';
	
	fnormale = ' color: #8CA4AE;';
	flab = ' color: #1B99DF;';
	fminerali = ' color: #1B99DF;';
	fmercato = ' color: #1BDF23;';
	fquartgen = ' color: #9E1BDF; font-weight: bold;';
	fnominerali = ' color: #AE0808;';
	flegenda = ' color: #F6FF00;';
	ft = ' font-family: arial; font-size: 7pt;';
	fb = ' font-weight: bold;';
	
	//bgc = 'background-color: gray; ';
	bgc = 'background-color: transparent; ';
	
	imga = ' width="16" heigth="16" border="0" align="top"';

	// ******* Correzione Traduzioni ******* 
	recor = {};
	for (key in correzioni){
		recor[key] = new RegExp(key, 'g');
	}
	
	textcorrnodes = document.evaluate(
		"//text()",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < textcorrnodes.snapshotLength; i++){
		nodec = textcorrnodes.snapshotItem(i);
		s = nodec.data;
		for (key in correzioni){
			s = s.replace(recor[key], correzioni[key]);
		}
		nodec.data = s;
	}
}

function checkAll(pState){
    var inputs = document.getElementsByTagName('input');
    var checkboxes = [];
    for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].type == 'checkbox') {
			inputs[i].checked = pState;
		}
	}
}

//******* select/deselect all messages *******
if (url.match('mod=messages') ){
	var target_table = find("//form[@method='POST']", XPFirst);
	var sel_all = '';
	var chkSel = creEl("table");
	sel_all+='<table cellpadding="0" cellspacing="3" border="0" width="340" id="mtable"><tr class="alt">';
	sel_all+='<td id="BB_cell"><input type="checkbox" value="y" id="BB_selectall"></td>';
	sel_all+='<td class="betreff" width="100%"  valign="top"><strong>'+ dict_ChkSel +'</strong></td></tr></table>';
	chkSel.innerHTML = sel_all;
	target_table.appendChild(chkSel);
	
	document.addEventListener('click', function(event){
		if(event.target.id=='BB_selectall'){
			checkAll(getEl('BB_selectall').checked);
		}
	}, false);
	
}

// ******* menu plus will be not activate in this sections: login, stuff, signup, logout *******
if( !( url.match('mod=login') || url.match('mod=stuff') || url.match('mod=signup') || url.match('mod=logout') ) ){

	var stileMenuAttivo = ' color: #90c1bd;';
	var stileMenuDisattivo = ' color: #555e5d;';

	var stile_menuplus = stato_menuplus ? stileMenuAttivo : stileMenuDisattivo;
	var stile_menually = stato_menually ? stileMenuAttivo : stileMenuDisattivo;
	var stile_menuminerali = stato_menuminerali ? stileMenuAttivo : stileMenuDisattivo;


	var swarp="";
	var caratteristiche = "";

	// ******* Gestione Menu' Plus *******
	style = 'a.mplus_z{color: #8CA4AE;} a:hover.mplus_z{color: #1BDF23;}';
	style += 'a.mplus_m{color: #8CA4AE;} a:hover.mplus_m{color: #1B99DF;}';
	
	map_style.innerHTML = style;

	menuplus = ''

	//******* se nome settore e' definito bisogna seguire un comportamento *******
	if (nome_settore!="N.D."){

		menuplus = '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" id="menuplus" style="'+stile_menuplus+'">'+dict_TitleMenu[0]+'</a></li></ul></div>';

		if (stato_menuplus){
			menuplus += '<div id="heimatwelten"><ul>';
			menuplus += '<form name="formfindenemy" action="index.php?mod=adventure" method="POST"><input type="hidden" name="mission[3]" value="1"></form>';
			menuplus += '<script>function findenemy() { self.document.forms.formfindenemy.submit() }</script>';
		
		
			for(i=0;i<m_p.length;i=i+6){
				//******* Inserimento elementi permanenti *******
				if(m_p[i+1] != "" && (m_p[i] == "X" || m_p[i] == "W")){ //||m_p[i] == "W" aventuali elementi permanenti in fase warp
					menuplus += '<li><a href="';
					menuplus += m_p[i+1];
					menuplus += '" title="';
					menuplus += m_p[i+2];
					menuplus += '" class="';
					menuplus += m_p[i+3];
					if(m_p[i+5]!=""){
						menuplus += '" style="';
						menuplus += m_p[i+5];
					}
					menuplus += '">';
					menuplus += m_p[i+4];
					menuplus += '</a></li>';
				}
			}
			//******* ricerca caratteristiche *******
			for (j=0;j<sektor_anag.length;j=j+3){
				if(sektor_anag[j]==nome_settore){
					caratteristiche=sektor_anag[j+2];
					j=sektor_anag.length;
				}
			}
		
			//******* Selezione elementi variabili *******
			//******* Scorro la stringa e confronto con vettore link *******
			for(k=0;k<caratteristiche.length;k++){
				cosa=caratteristiche.substr(k,1);
				for(i=0;i<m_p.length;i=i+6){
					//******* Inserimento elementi variabili *******
					if(m_p[i+1] != "" && m_p[i] == cosa){
						menuplus += '<li><a href="';
						menuplus += m_p[i+1];
						menuplus += '" title="';
						menuplus += m_p[i+2];
						menuplus += '" class="';
						menuplus += m_p[i+3];
						if(m_p[i+5]!=""){
							menuplus += '" style="';
							menuplus += m_p[i+5];
						}
						menuplus += '">';
						menuplus += m_p[i+4];
						menuplus += '</a></li>';
					}
				}
			}
			menuplus += '</ul></div>';	

		}


	// ******* Gestione Menu' Ally *******
	menuplus += '<div id="klammer-rechts"><ul><li style="position:relative;z-index:100"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" id="menually" style="'+stile_menually+'">'+dict_TitleMenu[1]+'</a></li></ul></div>';

	if (stato_menually){
		menuplus += '<div id="navcontainer"><ul>';
		
		for(i=0;i<m_a.length;i=i+6){
			//******* Inserimento elementi permanenti *******
			if(m_a[i+1] != "" && m_a[i] == "W"){ //W = permanente anche in fase Warp
				menuplus += '<li><a href="';
				menuplus += m_a[i+1];
				menuplus += '" title="';
				menuplus += m_a[i+2];
				menuplus += '" class="';
				menuplus += m_a[i+3];
				if(m_a[i+5]!=""){
					menuplus += '" style="';
					menuplus += m_a[i+5];
				}
				menuplus += '">';
				menuplus += m_a[i+4];
				menuplus += '</a></li>';
			}
		}
		menuplus += '</ul></div>';	
	}


	// ******* Gestione Menu' Minerali con settore conosciuto *******
	menuplus += '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" id="menuminerali" style="'+stile_menuminerali+'">'+dict_TitleMenu[2]+'</a></li></ul></div>';


	if(stato_menuminerali){//attiva/disattiva menu' minerali
		menuplus += '<div id="heimatwelten"><ul>';
		for(i=0;i<minerali.length;i=i+4){
			if(minerali[i+1] != "" && minerali[i] != ""){
				if(minerali[i+3]=="X" || caratteristiche.search(minerali[i+3])>-1){
					menuplus += '<li><a href="';
					menuplus += minerali[i+1];
					menuplus += '" title="';
					menuplus += minerali[i+2];
					menuplus += '" class="mplus_z">';
					menuplus += minerali[i];
					menuplus += '</a></li>';
				}
			}
		}
		menuplus += '</ul></div>';
	}


	// ******* Gestione Menu' Info *******
	menuplus += '<div id="klammer-rechts"><ul><li style="position:relative"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" title="'+dict_HotkeyHelp[0]+BB_hotkey+dict_HotkeyHelp[1]+'" id="menuinfo" style="'+stileMenuAttivo+'">'+dict_TitleMenu[3]+'</a></li></ul></div>';
	
	menuplus += '<div id="navcontainer2"><ul>';

	for(i=0;i<m_i.length;i=i+6){
		//******* Inserimento elementi permanenti *******
		if(m_i[i+1] != "" && (m_i[i] == "X" || m_i[i] == "W")){ //||m_i[i] == "W" eventuali elementi permanenti in fase warp
			menuplus += '<li><a href="';
			menuplus += m_i[i+1];
			menuplus += '" title="';
			menuplus += m_i[i+2];
			menuplus += '" class="';
			menuplus += m_i[i+3];
			if(m_i[i+5]!=""){
				menuplus += '" style="';
				menuplus += m_i[i+5];
			}
			menuplus += '" target="_blank">';
			menuplus += m_i[i+4];
			menuplus += '</a></li>';
		}
	}


	menuplus += '</ul></div>';
	
	if (BB_get('BB_WarpND', false)){
		if(!(url.match('mod=map&warp='))){
			playSound(BB_AbilitaSuoni,BB_snd_arrived,BB_volume*10,false);
		}
		BB_set('BB_WarpND', false);
	}
	
	
} else { //if (nome_settore!="N.D."){
		//******* Nome Settore non definito Gestione Fase Warp *******
		menuplus = '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" id="menuplus" style="'+stile_menuplus+'">'+dict_TitleMenu[0]+'</a></li></ul></div>';

		/* //non vi sono elementi permanenti, ma nel caso ci fossero e' gia' implementato
			if (stato_menuplus)
			{
				menuplus += '<div id="heimatwelten"><ul>';
				for(i=0;i<m_p.length;i=i+6){
					//******* Inserimento elementi permanenti *******
					if(m_p[i+1] != "" && m_p[i] == "W") {
						menuplus += '<li><a href="';
						menuplus += m_p[i+1];
						menuplus += '" title="';
						menuplus += m_p[i+2];
						menuplus += '" class="';
						menuplus += m_p[i+3];
						if(m_p[i+5]!=""){
							menuplus += '" style="';
							menuplus += m_p[i+5];
						}
						menuplus += '">';
						menuplus += m_p[i+4];
						menuplus += '</a></li>';
					}
				}
				menuplus += '</ul></div>';	
			}	

		*/

		// ******* Gestione Menu' Ally *******
		menuplus += '<div id="klammer-rechts"><ul><li style="position:relative;z-index:100"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" id="menually" style="'+stile_menually+'">'+dict_TitleMenu[1]+'</a></li></ul></div>';
		
		if (stato_menually){
			menuplus += '<div id="navcontainer"><ul>';
			for(i=0;i<m_a.length;i=i+6){
				//******* Inserimento elementi permanenti *******
				if(m_a[i+1] != "" && m_a[i] == "W"){
					menuplus += '<li><a href="';
					menuplus += m_a[i+1];
					menuplus += '" title="';
					menuplus += m_a[i+2];
					menuplus += '" class="';
					menuplus += m_a[i+3];
					if(m_a[i+5]!=""){
						menuplus += '" style="';
						menuplus += m_a[i+5];
					}
					menuplus += '">';
					menuplus += m_a[i+4];
					menuplus += '</a></li>';
				}
			}
			menuplus += '</ul></div>';	
		}	
		
		// ******* Gestione Menu' Minerali con nome settore N.D. *******
		menuplus += '<div id="klammer-links"><ul><li style="position:relative"><img class="k-links" alt="" src="img/mk-links-klammer.jpg" /><a href="#" id="menuminerali" style="'+stile_menuminerali+'">'+dict_TitleMenu[2]+'</a></li></ul></div>';
		
		if(stato_menuminerali){ // attiva/disattiva menu' minerali

			menuplus += '<div id="heimatwelten"><ul>';
			var sectorFound = false;
			for(k=0;k<sektor_anag.length;k=k+3){
				swarp='warp='+sektor_anag[k+1];
				if (url.match( swarp ) ){
					caratteristiche=sektor_anag[k+2];
					sectorFound = true;
					for(i=0;i<minerali.length;i=i+4){
						if(minerali[i+1] != "" && minerali[i] != ""){
							if(minerali[i+3]=="X" || caratteristiche.search(minerali[i+3])>-1){
								menuplus += '<li><a href="';
								menuplus += minerali[i+1];
								menuplus += '" title="';
								menuplus += minerali[i+2];
								menuplus += '" class="mplus_z">';
								menuplus += minerali[i];
								menuplus += '</a></li>';
							}
						}
					}
						
					k=sektor_anag.length;
				}
			}
			if(!sectorFound){
				menuplus += '<li><a href="';
				menuplus += minerali[1];
				menuplus += '" title="';
				menuplus += minerali[2];
				menuplus += '" class="mplus_z">';
				menuplus += minerali[0];
				menuplus += '</a></li>';
			}
			menuplus += '</ul></div>';
		} //	if(stato_menuminerali)
		
		// ******* Gestione Menu' Info *******
		menuplus += '<div id="klammer-rechts"><ul><li style="position:relative"><img class="k-rechts" alt="" src="img/mk-rechts-klammer.jpg" /><a href="#" title="'+dict_HotkeyHelp[0]+BB_hotkey+dict_HotkeyHelp[1]+'" id="menuinfo" style="'+stileMenuAttivo+'">'+dict_TitleMenu[3]+'</a></li></ul></div>';
		
		menuplus += '<div id="navcontainer2"><ul>';
		//	quando	URL						titolo				classe		testo
		for(i=0;i<m_i.length;i=i+6){
			//******* Inserimento elementi permanenti *******
			if(m_i[i+1] != "" && m_i[i] == "W"){ //||"W"= fase warp
				menuplus += '<li><a href="';
				menuplus += m_i[i+1];
				menuplus += '" title="';
				menuplus += m_i[i+2];
				menuplus += '" class="';
				menuplus += m_i[i+3];
				if(m_i[i+5]!=""){
					menuplus += '" style="';
					menuplus += m_i[i+5];
				}
				menuplus += '" target="_blank">';
				menuplus += m_i[i+4];
				menuplus += '</a></li>';
			}
		}
		menuplus += '</ul></div>';

	}

	map_menuplus.innerHTML = menuplus;

	target_menu.appendChild(map_style);
	target_menu.appendChild(map_menuplus);
	
	if(!(url.match('mod=map&warp='))){
		try {
			var ret = find("//div[@id='warp']", XPFirst);
			var nodo = ret.singleNodeValue;
			playSound(BB_AbilitaSuoni,BB_snd_warp,BB_volume*10,true);	
			BB_set('BB_WarpND', true);		
		}
		catch (e){
			//playSound(BB_AbilitaSuoni,BB_snd_arrived,BB_volume*10,false);
			
		}
		

	}

}//if( !( url.match('mod=login' .....


// ******* Mappa - map section *******
if(url.match('mod=map')){

	caption  = '<p style="'+ft+bgc+pa+'width: 70px; left: 167px; top: 290px;' +zlivello+fquartgen+'">Atlanticans</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 80px; left: 557px; top: 290px;' +zlivello+fquartgen+'">Djem Al Dhir</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 167px; top: 637px;' +zlivello+fquartgen+'">Carminians</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 557px; top: 637px;' +zlivello+fquartgen+'">Teril Tkarr</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 237px; top: 216px;' +zlivello+fnormale+ '">Heero Ma Tahh</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 140px; left: 465px; top: 216px;'+zlivello+fnormale+ '">Gargantus Asteroid Field</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 270px; top: 326px;' +zlivello+flab+     '">Viking Anomaly</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 100px; left: 440px; top: 326px;'+zlivello+fnormale+ '">Mammoth Nebula</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 140px; left: 63px; top: 364px;' +zlivello+fnormale+ '">Ancient Alien Remmants</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 80px; left: 625px; top: 364px;' +zlivello+fnormale+ '">Cobalt Rings</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 100px; left: 200px; top: 400px;'+zlivello+fnormale+ '">Space Singularity</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 100px; left: 515px; top: 400px;'+zlivello+flab+     '">Crystalin Planet</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 110px; left: 295px; top: 428px;'+zlivello+fmercato+ '">SandStorm Nebula</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 125px; left: 395px; top: 428px;'+zlivello+fnormale+ '">Giant Crystals of Djefhar</p>';


	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 305px; top: 497px;' +zlivello+flab+     '">Lotus Flairs</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 419px; top: 497px;' +zlivello+fmercato+ '">Limes Ater</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 80px; left: 200px; top: 525px;' +zlivello+fmercato+ '">Avalon Sector</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 515px; top: 525px;' +zlivello+fnormale+ '">Hades System</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 60px; left: 90px; top: 562px;' +zlivello+fnormale+ '">Dwarf Sun</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 110px; left: 625px; top: 562px;'+zlivello+fnormale+ '">Ancient Battlefield</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 110px; left: 270px; top: 599px;'+zlivello+fnormale+ '">Azure Star Cluster</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 130px; left: 440px; top: 599px;'+zlivello+flab+     '">Tolgay Asteroid Field</p>';

	caption += '<p style="'+ft+bgc+pa+'width: 90px; left: 237px; top: 710px;' +zlivello+fnormale+ '">Rubine Nebula</p>';
	caption += '<p style="'+ft+bgc+pa+'width: 70px; left: 475px; top: 710px;' +zlivello+fnormale+ '">Green Hell</p>';
	
	
	legend =  '<p style="'+ft+bgc+pa+'width: 110px; left: 355px; top: 700px;'+zlivello+flegenda+   '">'+dict_Legend[0]+':</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 715px;'+zlivello+fnormale+   '">'+dict_Legend[1]+'</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 730px;'+zlivello+flab+       '">'+dict_Legend[2]+'</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 745px;'+zlivello+fmercato+   '">'+dict_Legend[3]+'</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 760px;'+zlivello+fquartgen+  '">'+dict_Legend[4]+'</p>';
	legend += '<p style="'+ft+bgc+pa+'width: 110px; left: 360px; top: 775px;'+zlivello+fnominerali+'">'+dict_Legend[5]+'</p>';	


	minerals =  '<span style="'+ft+bgc+pa+'width: 140px; left: 35px; top: 460px;' +zlivello+flegenda+'">'+dict_Legend[6]+'</span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 475px;' +zlivello+'"><img src="img/item/6_8k.gif"' +imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[7]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[0]+';">'+str_s_m_prx[0]+'</span></span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 490px;' +zlivello+'"><img src="img/item/6_9k.gif"' +imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[8]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[1]+';">'+str_s_m_prx[1]+'</span></span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 505px;' +zlivello+'"><img src="img/item/6_10k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[9]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[2]+';">'+str_s_m_prx[2]+'</span></span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 40px; top: 520px;' +zlivello+'"><img src="img/item/6_11k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[10]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[3]+';">'+str_s_m_prx[3]+'</span></span>';


	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 605px; top: 460px;'+zlivello+flegenda+'">'+dict_Legend[6]+'</span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 475px;'+zlivello+'"><img src="img/item/6_12k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[11]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[4]+';">'+str_s_m_prx[4]+'</span></span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 490px;'+zlivello+'"><img src="img/item/6_13k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[12]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[5]+';">'+str_s_m_prx[5]+'</span></span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 505px;'+zlivello+'"><img src="img/item/6_14k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[13]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[6]+';">'+str_s_m_prx[6]+'</span></span>';
	minerals += '<span style="'+ft+bgc+pa+'width: 140px; left: 610px; top: 520px;'+zlivello+'"><img src="img/item/6_15k.gif"'+imga+'><span style="'+pr+fminerali+fb+'">'+dict_ArrMinerals[14]+'</span> <span style="'+pr+fnormale+' left: '+d_lpl[7]+';">'+str_s_m_prx[7]+'</span></span>';


	nominerals =  '<span style="'+ft+bgc+pa+'width: 70px; left: 170px; top: 700px;'+zlivello+'"><img src="img/item/6_1k.gif"'+imga+'><span style="'+pr+fnominerali+'">'+dict_ArrMinerals[0]+'</span></span>';
	nominerals += '<span style="'+ft+bgc+pa+'width: 70px; left: 560px; top: 700px;'+zlivello+'"><img src="img/item/6_7k.gif"'+imga+'><span style="'+pr+fnominerali+'">'+dict_ArrMinerals[6]+'</span></span>';
	nominerals += '<span style="'+ft+bgc+pa+'width: 70px; left: 170px; top: 353px;'+zlivello+'"><img src="img/item/6_6k.gif"'+imga+'><span style="'+pr+fnominerali+'">'+dict_ArrMinerals[5]+'</span></span>';
	nominerals += '<span style="'+ft+bgc+pa+'width: 70px; left: 560px; top: 353px;'+zlivello+'"><img src="img/item/6_5k.gif"'+imga+'><span style="'+pr+fnominerali+'">'+dict_ArrMinerals[4]+'</span></span>';

	
	map_caption.innerHTML = caption;
	map_legend.innerHTML = legend;
	map_minerals.innerHTML = minerals;
	map_nominerals.innerHTML = nominerals;
	
	target.appendChild(map_caption);
	target.appendChild(map_legend);
	target.appendChild(map_minerals);
	target.appendChild(map_nominerals);


}


// ******* Mercato - black market and shop place ******* 
if(url.match('mod=shop') || url.match('mod=market') ){

	regex = {};
	for (key in replacements){
	    regex[key] = new RegExp(key, 'g');
	}

	textnodes = document.evaluate(
	    "//text()",
	    document,
	    null,
	    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	    null);
	for (var i = 0; i < textnodes.snapshotLength; i++){
	    node = textnodes.snapshotItem(i);
	    s = node.data;
	    for (key in replacements){
			s = s.replace(regex[key], replacements[key]);
	    }
	    node.data = s;
	}

}


// ******* autoupdater, thanks to sizzlemctwizzle http://userscripts.org/scripts/show/38017
var BBAutoUpdater = {

	id: '59946', 
	days: BB_FreqUpdate, 
	name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
	version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
	time: new Date().getTime(),
	call: function(response){
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://userscripts.org/scripts/source/'+this.id+'.meta.js',
			onload: function(xpr) {BBAutoUpdater.compare(xpr,response);}
		});
	},
	compare: function(xpr,response){
		this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
		this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
		if ( (this.xversion) && (this.xname[1] == this.name) ){
			this.xversion = this.xversion[1].replace(/\./g, '');
			this.xname = this.xname[1];
		} else {
			if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
				GM_setValue('updated_'+this.id, 'off');
			return false;
		}
		if ( (+this.xversion > +this.version) && (confirm(dict_AutoUpdate[0]+this.xname+dict_AutoUpdate[1])) ){
			GM_setValue('updated_'+this.id, this.time+'');
			top.location.href = 'https://userscripts.org/scripts/source/'+this.id+'.user.js';
		} else if ( (this.xversion) && (+this.xversion > +this.version) ){
			if(confirm(dict_AutoUpdate[2])){
				GM_setValue('updated_'+this.id, 'off');
				GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated_'+this.id, new Date().getTime()+''); BBAutoUpdater.call(true);});
				alert(dict_AutoUpdate[3]);
			} else {
				GM_setValue('updated_'+this.id, this.time+'');
			}
		} else {
			if(response) alert(dict_AutoUpdate[4]+this.name);
			GM_setValue('updated_'+this.id, this.time+'');
		}
	},
	check: function() {
		if (GM_getValue('updated_'+this.id, 0) == "off")
			GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');BBAutoUpdater.call(true)});
		else {
			if (this.time > (+GM_getValue('updated_'+this.id, 0) + 1000*60*60*24*this.days)){
				GM_setValue('updated_'+this.id, this.time+'');
				this.call();
			}
		    GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated_'+this.id, new Date().getTime()+'');BBAutoUpdater.call(true)});
		}
	}
};

if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') BBAutoUpdater.check();

// ******* Lancio Timer per conto alla rovescia su barra titolo - startup countdown timer on the title bar *******
ContoRovescia();

