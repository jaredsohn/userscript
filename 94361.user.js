// ==UserScript==
// @name The West PRO (Romanian version)
// @description   Acest script o sa va arate cele mai bune iteme pt. munca si munciile cele mai profitabile pt. dumneavoastra.
// @include http://*.the-west.*/game.php*
// @version        1.004k
// ==/UserScript==


var twpro_version = "1.004k";

var url = window.location.href;
if (url.indexOf(".the-west.") != -1) {

if (url.indexOf("game.php") != -1) {
  var insertBeforeElement = document.getElementById('left_top');
  var newScriptElement = document.createElement('script');
  newScriptElement.setAttribute('type', 'text/javascript');
  var myScript = "var twpro_version = '"+twpro_version+"';";
  newScriptElement.innerHTML = myScript;
  insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);
}

(function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){

window.addEvent('domready', check_TW_version);
function check_TW_version() {
var url = window.location.href;
if (url.indexOf(".the-west.") != -1 && url.indexOf("game.php") != -1) {
	if (TheWestApi.version >= 1.30){

//Sprites für Sortierbuttons
var sortButtonImg = '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'
var searchButtonImg = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAHNJREFUOMvNkbENwCAMBM/p6BiNcRiTEVKwh9O4QAEiQ1LkJUvokc/yG/6mAGRAgWrvsNJ8AgVIVsU8FyRbQ2y8aF72AKpNvSvZ31DHlwHOVlDvCqMQtantMz5CxAnWWY8sZDSEyGLQHUQ2rqWbG0wh73QBwKsfIwV17B4AAAAASUVORK5CYII%3D'

var twpro_lang = {
	info: ['Zyphir Randrott', 'mailto:zyphir.randrott@gmail.com', 4145, ''],
	AUTHOR: 'Author',
	TRANSLATOR: 'Translator',
	TWPRO_DISABLED: 'script disabled',
	SORTBYNAME: 'Order by <b>name</b>',
	SORTBYXP: 'Order by <b>experience</b>',
	SORTBYWAGES: 'Order by <b>wages</b>',
	SORTBYLUCK: 'Order by <b>luck</b>',
	SORTBYCOMB: 'Order by <b>job ranking</b>',
	SORTBYDANGER: 'Order by <b>danger</b>',
	SORTBYLABORP: 'Order by <b>labor points</b>',
	FILTERJOBS: 'Hide jobs I can\'t do',
	FILTERCLOTHING: 'Just display the best clothing available for the selected job',
	CHOOSEJOB: 'Choose job...',
	CALCJOB: 'Calculating values, please wait...',
	INVENTSTATS: 'Inventory statistics',
	SELLVALUE: 'Sales value',
	OBJECTS: 'Objects',
	PRODUCTS: 'Products',
	TOTAL: 'Total',
	QUANTITIES: 'Quantities',
	LABORP: 'LP',
	CONSTRUCTION: 'Construction',
	HPTOTAL: 'Total health points',
	STARTCALC: 'Calculate data...',
	CONVERT: 'Convert',
	MULTISEL: 'Sell multiple items...',
	SELL: 'Sell selection',
	CONFIRMSELL: 'Do you really want to sell %1 stacks of items?',
	SELLING: 'Selling...',
	SALEDONE: 'The selected items have been sold.',
	NONESELECTED: 'You have to select at least one item!',
	JOBRANKSETTINGS: 'Job ranking settings',
	SEARCHINVENTORY: 'Search inventory',
	NOSEARCHRESULT: 'Your search for %1 returned no results.%2Display all items%3',
	SEARCHHELP: 'Search the inventory. You can use wildcards (* for zero or more characters, ? for one character)',
	APPLY: 'Apply',
	HEALTH: 'Maximum Life points',
	DUELSHOOTINGATT: 'Range dueler (attacker)',
	DUELSHOOTINGDEF: 'Range dueler (defender)',
	DUELVIGOR: 'Melee dueler',
	FORTATTACK: 'Fortbattle (attacker)',
	FORTDEFEND: 'Fortbattle (defender)',
	SKILLRIDE: 'Riding',
	WINS: 'wins',
	LOSSES: 'losses',
	WINLOSSDIFF: 'diff',
	FORTMESSAGE: 'Message to participants',
	FORTMESSAGERCP: 'Number of recipients',
};
var twpro_langs = {};
twpro_langs.de = {
	AUTHOR: 'Autor',
	TRANSLATOR: '\xFCbersetzer',
	TWPRO_DISABLED: 'global deaktiviert',
	SORTBYNAME: 'Nach <b>Namen</b> sortieren',
	SORTBYXP: 'Nach <b>Erfahrung</b> sortieren',
	SORTBYWAGES: 'Nach <b>Lohn</b> sortieren',
	SORTBYLUCK: 'Nach <b>Gl\xFCck</b> sortieren',
	SORTBYCOMB: 'Nach <b>Filter</b> sortieren',
	SORTBYDANGER: 'Nach <b>Gefahr</b> sortieren',
	SORTBYLABORP: 'Nach <b>Arbeitspunkte</b> sortieren',
	FILTERJOBS: 'Blende die Arbeiten, die du nicht machen kannst, aus',
	FILTERCLOTHING: 'Nur die besten Gegenstände für diese Arbeit anzeigen',
	CHOOSEJOB: 'Arbeit ausw\xE4hlen...',
	CALCJOB: 'Bitte warten, berechne Werte...',
	INVENTSTATS: 'Inventar-Statistik',
	SELLVALUE: 'Verkaufswerte',
	OBJECTS: 'Gegenst\xE4nde',
	PRODUCTS: 'Produkte',
	TOTAL: 'Gesamtwert',
	QUANTITIES: 'St\xFCckzahlen',
	LABORP: 'AP',
	CONSTRUCTION: 'Stadtausbau',
	HPTOTAL: 'Trefferpunkte gesamt',
	STARTCALC: 'Daten berechnen...',
	CONVERT: 'Konvertieren',
	MULTISEL: 'Mehrere Sachen verkaufen',
	SELL: 'Ausgew\xE4hlte verkaufen',
	CONFIRMSELL: 'Sollen wirklich die %1 ausgewählten Sachen verkauft werden?',
	SELLING: 'Verkauft...',
	SALEDONE: 'Ausgew\xE4hlte Gegenst\xE4nde sind verkauft worden.',
	NONESELECTED: 'Es muss mindestens ein Gegenstand ausgewählt werden!',
	JOBRANKSETTINGS: 'Filtereinstellungen',
	SEARCHINVENTORY: 'Suche Inventar',
	NOSEARCHRESULT: 'Suche nach %1 war erfolglos.%2Alle Gegenstände anzeigen%3',
	SEARCHHELP: 'Inventar durchsuchen. Es können Wildcards verwendet werden (* für 0 oder mehrere Zeichen, ? für ein beliebiges Zeichen)',
	APPLY: 'OK',
	HEALTH: 'Maximum Lebenspunkte',
	DUELSHOOTINGATT: 'Schie\xdfduellant (Angreifer)',
	DUELSHOOTINGDEF: 'Schie\xdfduellant (Verteidiger)',
	DUELVIGOR: 'Schlagkraftduellant',
	FORTATTACK: 'Fortkampf (Angreifer)',
	FORTDEFEND: 'Fortkampf (Verteidiger)',
	SKILLRIDE: 'Skillpunkte Reiten',
	WINS: 'Gew.',
	LOSSES: 'Verl.',
	WINLOSSDIFF: 'Diff',
	FORTMESSAGE: 'Nachricht an Teilnehmer',
	FORTMESSAGERCP: 'Number of recipients',
};
twpro_langs.es = {
	info: ['Sandevil', 'mailto:sandevil@gmail.com', 1273227, '.10.'],
	AUTHOR: 'Autor',
	TRANSLATOR: 'Traduccion',
	TWPRO_DISABLED: 'script deshabilitado',
	SORTBYNAME: 'Ordenar por<b>nombre</b>',
	SORTBYXP: 'Ordenar por <b>experiencia</b>',
	SORTBYWAGES: 'Ordenar por <b>salario</b>',
	SORTBYLUCK: 'Ordenar por <b>suerte</b>',
	SORTBYCOMB: 'Ordenar por <b>rango de trabajo</b>',
	SORTBYDANGER: 'Ordenar por <b>peligro</b>',
	SORTBYLABORP: 'Ordenar por <b>puntos de trabajo</b>',
	FILTERJOBS: 'Esconder trabajos que no puedo hacer',
	FILTERCLOTHING: 'Solo mostrar la mejor ropa para el trabajo seleccionado',
	CHOOSEJOB: 'Elegir trabajo',
	CALCJOB: 'Calculando valores, por favor espere',
	INVENTSTATS: 'Estadisticas de Inventario',
	SELLVALUE: 'Valor de ventas',
	OBJECTS: 'Objetos',
	PRODUCTS: 'Productos',
	TOTAL: 'Total',
	QUANTITIES: 'Cantidades',
	LABORP: 'PT',
	CONSTRUCTION: 'Construccion',
	HPTOTAL: 'Puntos totales de salud',
	STARTCALC: 'Calcular datos',
	CONVERT: 'Convertir',
	MULTISEL: 'Vender varios objetos..',
	SELL: 'Seleccion de venta',
	CONFIRMSELL: 'Realmente quieres vender %1 que has seleccionado?',
	SELLING: 'Vendiendo...',
	SALEDONE: 'Los objetos seleccionados han sido vendidos',
	NONESELECTED: 'Tienes que seleccionar al menos un objeto',
	JOBRANKSETTINGS: 'Configuracion del rango de trabajo',
	SEARCHINVENTORY: 'Buscar en el inventario',
	NOSEARCHRESULT: 'Tu busqueda de %1 no ha tenido ningun resultado.%2Mostrar todos los items%3',
	SEARCHHELP: 'Busqueda en el inventario. Puedes usar comodines (* 0 o mas caracteres, ? para un caracter)',
	APPLY: 'Aplicar',
	HEALTH: 'Puntos de vida maximos',
	DUELSHOOTINGATT: 'Duelista de fuego(atacante)',
	DUELSHOOTINGDEF: 'Duelista de fuego (defensor)',
	DUELVIGOR: 'Duelista contundente',
	FORTATTACK: 'Batalla de fuerte (atacante)',
	FORTDEFEND: 'Batalla de fuerte (defensor)',
	SKILLRIDE: 'Montar a caballo(Velocidad)',
	WINS: 'Gana',
	LOSSES: 'Pierde',
	WINLOSSDIFF: 'Dif',
	FORTMESSAGE: 'Mensaje a participantes',
	FORTMESSAGERCP: 'Number of recipients',
};
twpro_langs.nl = {
	info: ['Lekensteyn', 'mailto:lekensteyn@gmail.com', 44179, '.1.2.'],
	AUTHOR: 'Auteur',
	TRANSLATOR: 'Vertaler',
	TWPRO_DISABLED: 'script uitgeschakeld',
	SORTBYNAME: 'Op <b>naam</b> sorteren',
	SORTBYXP: 'Op <b>ervaring</b> sorteren',
	SORTBYWAGES: 'Op <b>loon</b> sorteren',
	SORTBYLUCK: 'Op <b>geluk</b> sorteren',
	SORTBYCOMB: 'Op <b>voorkeur</b> sorteren',
	SORTBYDANGER: 'Op <b>gevaar</b> sorteren',
	SORTBYLABORP: 'Op <b>arbeidspunten</b> sorteren',
	FILTERJOBS: 'Verberg werkzaamheden die ik niet kan doen',
	FILTERCLOTHING: 'Weergeef enkel de beste kleding voor de geselecteerde arbeid',
	CHOOSEJOB: 'Arbeid kiezen...',
	CALCJOB: 'Even geduld, waarden berekenen...',
	INVENTSTATS: 'Inventaris statistieken',
	SELLVALUE: 'Verkoopwaarde',
	OBJECTS: 'Voorwerpen',
	PRODUCTS: 'Producten',
	TOTAL: 'Totaal',
	QUANTITIES: 'Hoeveelheden',
	LABORP: 'AP',
	CONSTRUCTION: 'Stadsuitbouw',
	HPTOTAL: 'Levenspunten totaal',
	STARTCALC: 'Gegevens berekenen...',
	CONVERT: 'Converteer',
	MULTISEL: 'Verkoop meerdere voorwerpen...',
	SELL: 'Verkoop selectie',
	CONFIRMSELL: 'Wil je echt %1 stapels voorwerpen verkopen?',
	SELLING: 'Verkoopt...',
	SALEDONE: 'De geselecteerde voorwerpen zijn verkocht.',
	NONESELECTED: 'Je moet minstens \xe9\xe9n voorwerp selecteren.',
	JOBRANKSETTINGS: 'Instellingen voorkeurswerken',
	SEARCHINVENTORY: 'Doorzoek inventaris',
	NOSEARCHRESULT: 'De zoekterm %1 heeft geen resultaten opgeleverd.%2Weergeef alle voorwerpen%3',
	SEARCHHELP: 'Doorzoek de inventaris. Je kunt wildcards gebruiken (* voor nul of meer tekens, ? voor \xe9\xe9n teken)',
	APPLY: 'Toepassen',
	HEALTH: 'Maximale levenspunten',
	DUELSHOOTINGATT: 'Schietduellant (aanvaller)',
	DUELSHOOTINGDEF: 'Schietduellant (verdediger)',
	DUELVIGOR: 'Slagkrachtduellant',
	FORTATTACK: 'Fortgevecht (aanvaller)',
	FORTDEFEND: 'Fortgevecht (verdediger)',
	SKILLRIDE: 'Paardrijden',
	WINS: 'Wins',
	LOSSES: 'Losses',
	WINLOSSDIFF: 'Dif',
	FORTMESSAGE: 'Message to participants',
	FORTMESSAGERCP: 'Number of recipients',
};
twpro_langs.fr = {
	info: ['Zyphir Randrott', 'mailto:zyphir.randrott@gmail.com', 4145, '.1.'],
	AUTHOR: 'Auteur',
	TRANSLATOR: 'Traducteur',
	TWPRO_DISABLED: 'script désactivé',
	SORTBYNAME: 'Trier par <b>Nom</b>',
	SORTBYXP: 'Trier par <b>Expérience</b>',
	SORTBYWAGES: 'Trier par <b>Salaire</b>',
	SORTBYLUCK: 'Trier par <b>Chance</b>',
	SORTBYCOMB: 'Trier par <b>Importance</b>',
	SORTBYDANGER: 'Trier par <b>Danger</b>',
	SORTBYLABORP: 'Trier par <b>Points de Travail</b>',
	FILTERJOBS: 'Cacher les travaux que je ne peux pas faire',
	FILTERCLOTHING: 'Afficher uniquement le meilleur équipement disponible pour le travail sélectionné',
	CHOOSEJOB: 'Choisir un Travail...',
	CALCJOB: 'Calcul en cours, veuillez patienter...',
	INVENTSTATS: 'Statistiques Inventaire',
	SELLVALUE: 'Valeurs de vente',
	OBJECTS: 'Objets',
	PRODUCTS: 'Produits',
	TOTAL: 'Total',
	QUANTITIES: 'Quantités',
	LABORP: 'PT',
	CONSTRUCTION: '- Construire Ville/Fort',
	HPTOTAL: 'Total des coups réussis',
	STARTCALC: 'Lancer le calcul...',
	CONVERT: 'Convertir',
	MULTISEL: 'Vendre plusieurs articles...',
	SELL: 'Vendre la sélection',
	CONFIRMSELL: 'Souhaitez-vous vraiment vendre ces %1 types d\'articles?',
	SELLING: 'Vente en cours...',
	SALEDONE: 'Les articles sélectionnés ont été vendus.',
	NONESELECTED: 'Vous devez sélectionner au moins un article!',
	JOBRANKSETTINGS: 'Niveaux d\'Importance',
	SEARCHINVENTORY: 'Chercher dans l\'inventaire',
	NOSEARCHRESULT: 'Votre recherche pour %1 n\'a pas donné de résultat.%2Afficher tous les articles%3',
	SEARCHHELP: 'Recherche dans l\'inventaire. Vous pouvez utiliser des caractères joker (* pour plusieurs caractères, ? pour un seul caractère)',
	APPLY: 'Appliquer',
	HEALTH: '- Points de vie maximum',
	DUELSHOOTINGATT: '- Duel / Arme à feu (attaquant)',
	DUELSHOOTINGDEF: '- Duel / Arme à feu (défenseur)',
	DUELVIGOR: '- Duel / Arme de contact',
	FORTATTACK: '- Bataille de fort (attaquant)',
	FORTDEFEND: '- Bataille de fort (défenseur)',
	SKILLRIDE: '- Monter à cheval',
	WINS: 'Gagnés',
	LOSSES: 'Perdus',
	WINLOSSDIFF: 'Diff',
	FORTMESSAGE: 'Message aux participants',
	FORTMESSAGERCP: 'Nombre de destinataires',
};
twpro_langs.hu = {
	info: ['laccy', 'mailto:b.laccyka@gmail.com', 152186, '.3.4.9.'],
	AUTHOR: 'Szerző',
	TRANSLATOR: 'Fordító',
	TWPRO_DISABLED: 'TWPRO Kikapcsolva',
	SORTBYNAME: 'Rendezés <b>Név</b> alapján',
	SORTBYXP: 'Rendezés <b>Tapasztalat</b> alapján',
	SORTBYWAGES: 'Rendezés <b>Fizetés</b> alapján',
	SORTBYLUCK: 'Rendezés <b>Szerencse</b> alapján',
	SORTBYCOMB: 'Rendezés <b>Nehézség</b> alapján',
	SORTBYDANGER: 'Rendezés <b>Veszély</b> alapján',
	SORTBYLABORP: 'Rendezés <b>Munkapont</b> alapján',
	FILTERJOBS: 'Rejtse el a még nem végezhető munkákat',
	FILTERCLOTHING: 'Csak a legjobb ruhákat mutassa a választott munkához',
	CHOOSEJOB: 'Válaszd ki a munkát',
	CALCJOB: 'Értékek számolása, kérlek várj...',
	INVENTSTATS: 'Felszerelés statisztika',
	SELLVALUE: 'Eladási érték',
	OBJECTS: 'Tárgyak',
	PRODUCTS: 'Termékek',
	TOTAL: 'Teljes összeg',
	QUANTITIES: 'Mennyiségek',
	LABORP: 'MP',
	CONSTRUCTION: 'Építés',
	HPTOTAL: 'Teljes életerő pontok',
	STARTCALC: 'Adatok számítása...',
	CONVERT: 'Átalakítás',
	MULTISEL: 'Több áru eladása egyszerre...',
	SELL: 'Kiválasztottak eladása',
	CONFIRMSELL: 'Valóban el szeretnél adni %1 darab árucikket?',
	SELLING: 'Eladás...',
	SALEDONE: 'A kiválasztott áruk eladva.',
	NONESELECTED: 'Legalább egy dolgot ki kell választanod!',
	JOBRANKSETTINGS: 'Munkasor beállításai',
	SEARCHINVENTORY: 'Felszerelés kereső',
	NOSEARCHRESULT: 'A(z) %1 keresése nem hozott eredményt.%2Összes felszerelés mutatása%3',
	SEARCHHELP: 'Keresés a felszerelések között. A behelyettesített karakterek használata megengedett (* zéró vagy több karaktert helyettesít, ? egy karaktert helyettesít be)',
	APPLY: 'Elfogad',
	HEALTH: 'Maximális Életerő',
	DUELSHOOTINGATT: 'Távolsági/Lövős párbajos(támadó)',
	DUELSHOOTINGDEF: 'Távolsági/Lövős párbajos(védekező)',
	DUELVIGOR: 'Közelharci/Ütős párbajos',
	FORTATTACK: 'Erődharcos (támadó)',
	FORTDEFEND: 'Erődharcos (védő)',
	SKILLRIDE: 'Lovaglás',
	WINS: 'nyert',
	LOSSES: 'vesztett',
	WINLOSSDIFF: 'kül.',
	FORTMESSAGE: 'Üzenet a résztvevőknek',
	FORTMESSAGERCP: 'Címzettek száma',
};
twpro_langs.it = {
	AUTHOR: 'Autore',
	TRANSLATOR: 'Traduttore',
	TWPRO_DISABLED: 'script disabilitato',
	SORTBYNAME: 'Ordina per <b>nome</b>',
	SORTBYXP: 'Ordina per <b>esperienza</b>',
	SORTBYWAGES: 'Ordina per <b>salario</b>',
	SORTBYLUCK: 'Ordina per <b>fortuna</b>',
	SORTBYCOMB: 'Ordina per <b>job ranking</b>',
	SORTBYDANGER: 'Ordina per <b>pericolo</b>',
	SORTBYLABORP: 'Ordina per <b>punti lavoro</b>',
	FILTERJOBS: 'Nascondi lavori che non puoi fare',
	FILTERCLOTHING: 'Mostra solo gli abiti migliori disponibili per il lavoro selezionato',
	CHOOSEJOB: 'Scegli lavoro...',
	CALCJOB: 'Calcolo in corso, attendi...',
	INVENTSTATS: 'Statistiche inventario',
	SELLVALUE: 'Valori di vendita',
	OBJECTS: 'Oggetti',
	PRODUCTS: 'Prodotti',
	TOTAL: 'Totale',
	QUANTITIES: 'Quantità',
	LABORP: 'PL',
	CONSTRUCTION: 'Costruzione',
	HPTOTAL: 'Punti vita totali',
	STARTCALC: 'Calcolo dati...',
	CONVERT: 'Converti',
	MULTISEL: 'Vendi più oggetti...',
	SELL: 'Vendi selezionati',
	CONFIRMSELL: 'Vuoi veramente vendere %1 oggetti?',
	SELLING: 'Vendita...',
	SALEDONE: 'Gli oggetti selezionati sono stati venduti.',
	NONESELECTED: 'Devi scegliere almeno un oggetto!',
	JOBRANKSETTINGS: 'Job ranking settings',
	SEARCHINVENTORY: 'Cerca nell\'inventario',
	NOSEARCHRESULT: 'La tua ricerca per %1 non ha prodotto risultati.%2Mostra tutti gli oggetti%3',
	SEARCHHELP: 'Cerca nell\'inventario. Puoi usare i jolly (* per zero o più caratteri, ? per un carattere)',
	APPLY: 'Applica',
	HEALTH: 'Massimi punti vita',
	DUELSHOOTINGATT: 'Duellante con armi da fuoco (attaccante)',
	DUELSHOOTINGDEF: 'Duellante con armi da fuoco (difensore)',
	DUELVIGOR: 'Duellante con armi da contusione',
	FORTATTACK: 'Battaglia per il forte (arraccante)',
	FORTDEFEND: 'Battaglia per il forte (difensore)',
	SKILLRIDE: 'Cavalcata',
	WINS: 'vinti',
	LOSSES: 'persi',
	WINLOSSDIFF: 'diff',
	FORTMESSAGE: 'Messaggio ai partecipanti',
	FORTMESSAGERCP: 'Numero di destinatari',
};
	twpro_langs.ro = {
	info: ['PWG', 'mailto:pwg_tw@yahoo.com', 7, '.1.9.11.'],
	AUTHOR: 'Autor',
	TRANSLATOR: 'Traducator',
	TWPRO_DISABLED: 'script dezactivat',
	SORTBYNAME: 'Sorteaza dupa <b>nume</b>',
	SORTBYXP: 'Sorteaza dupa <b>experienta</b>',
	SORTBYWAGES: 'Sorteaza dupa <b>salariu</b>',
	SORTBYLUCK: 'Sorteaza dupa <b>noroc</b>',
	SORTBYCOMB: 'Sorteaza dupa <b>clasamentul munciilor</b>',
	SORTBYDANGER: 'Sorteaza dupa <b>pericol</b>',
	SORTBYLABORP: 'Sorteaza dupa <b>punctele de munca</b>',
	FILTERJOBS: 'Ascunde munciile care nu pot sa le fac',
	FILTERCLOTHING: 'Doar arata cele mai bune obiecte pentru munca selectata',
	CHOOSEJOB: 'Alege munca...',
	CALCJOB: 'Calculez valoriile, te rog asteapta...',
	INVENTSTATS: 'Statisticile inventarului',
	SELLVALUE: 'Valoarea de vanzare',
	OBJECTS: 'Obiecte',
	PRODUCTS: 'Produse',
	TOTAL: 'Total',
	QUANTITIES: 'Cantitati',
	LABORP: 'LP',
	CONSTRUCTION: 'Construire',
	HPTOTAL: 'Total puncte de viata',
	STARTCALC: 'Calculez data...',
	CONVERT: 'Convertesc',
	MULTISEL: 'Vinde mai multe obiecte...',
	SELL: 'Selectia vanzarii',
	CONFIRMSELL: 'Chiar vrei sa vinzi %1 obiect(e) stivuibile?',
	SELLING: 'Vand...',
	SALEDONE: 'Obiectele selectate au fost vandute.',
	NONESELECTED: 'Trebuie sa selectezi macar 1 obiect!',
	JOBRANKSETTINGS: 'Setari pentru clasamentul munciilor',
	SEARCHINVENTORY: 'Cauta in inventar',
	NOSEARCHRESULT: 'Cautarea ta pentru %1 nu a avut rezultat.%2Arata toate obiectele%3',
	SEARCHHELP: 'Cauta in inventar. Poti folosi wildcards (* pentru 0 sau mai multe caractere, ? pentru un caracter)',
	APPLY: 'Applica',
	HEALTH: 'Puncte de viata maxime',
	DUELSHOOTINGATT: 'Duelist cu arma de foc (atacator)',
	DUELSHOOTINGDEF: 'Duelist cu arma de foc (aparator)',
	DUELVIGOR: 'Duelist cu arma alba',
	FORTATTACK: 'Batalie de fort (atacator)',
	FORTDEFEND: 'Batalie de fort (aparator)',
	SKILLRIDE: 'Calarie',
	WINS: 'castig.',
	LOSSES: 'pierd.',
	WINLOSSDIFF: 'diff.',
	FORTMESSAGE: 'Mesaj tuturor participantilor',
	FORTMESSAGERCP: 'Numarul participantilor',
};

var twpro_langname = location.host.match(/(\D+)\d+\./);
if(twpro_langname && twpro_langs[twpro_langname[1]]) twpro_lang = twpro_langs[twpro_langname[1]];
//twpro_lang = twpro_langs['ro'];

{ // Duelconverter and Fort Message
	
function makefortmessage(twpro_fort_elementin){
var twpro_fort_elementid=twpro_fort_elementin.id;
var twpro_fort_instructions=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_instructions";
var tmparray3=document.getElementById(twpro_fort_instructions).getElementsByTagName('a');
var tmparray3=tmparray3[0].parentNode;
var twpro_fort_divplayerid=twpro_fort_elementid.replace('window_fort_battlepage','fortbattle_placement_map')+"_playerlistdiv";
n = new Element('a', {'href': "javascript:makefortlist('"+twpro_fort_divplayerid+"');end();", 'style':'cursor: pointer;'});
n.innerHTML="<br/><br/>"+TWPro.lang.FORTMESSAGE;
tmparray3.appendChild(n);
}

function makefortlist(twpro_fort_divplayerid){
var tmparray2=document.getElementById(twpro_fort_divplayerid).childNodes;
alert(TWPro.lang.FORTMESSAGERCP+':\n'+tmparray2.length);
var fortplayerlist=tmparray2[0].innerHTML;
for (var j = 1 ; j < tmparray2.length ; j++){
	if (tmparray2[j].innerHTML == Character.name){
} else {
	fortplayerlist +=";"+tmparray2[j].innerHTML;
}
}
AjaxWindow.show('messages',{addressee:fortplayerlist});
}


function makeadvicemessage(twpro_advice_elementin, data){
var twpro_advice_elementid=twpro_advice_elementin.id;
data = data.replace(/Saloon<\/h2>/, '$&<a onclick="makeadvicelist(\''+twpro_advice_elementid+'\');" href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">Mensaje</span><span class="button_right"></span><span style="clear:both"></span></a><br>');
return data;
}

function makeadvicelist(twpro_advice_elementid){
 var tbl=document.getElementById(twpro_advice_elementid).getElementsByTagName('table');
 tbl = tbl[2].getElementsByTagName('a');
 var adviceplayerlist = tbl[0].innerHTML; 
 for (var i=1;i<tbl.length;i++){
 if (tbl[i].href.search(/profile/) != -1) {
 adviceplayerlist += ';'+tbl[i].innerHTML;
 }
}
AjaxWindow.show('messages',{addressee:adviceplayerlist});
}


	function convertduelreport(winname, data){
		if(data && data.indexOf("Reports.switchDuel") > 0){
			data = data.replace(/"Reports\.view_delete_report.+?\n\s+<\/th>/, '$&<th><a onclick="convertduelreportfunc(\''+winname+'\');" href="#" class="button_wrap button"><span class="button_left"></span><span class="button_middle">'+TWPro.lang.CONVERT+'</span><span class="button_right"></span><span style="clear:both"></span></a></th>');
		}
		return data;
	}
	function convertduelreportfunc(dc) {
		var dce = document.getElementById(dc);
		if(document.getElementById(dc+'_cnv')) return;
		if (dce.innerHTML.indexOf('images/report/attacker.png') != -1) {
			var duel = duellers = avatars = place = '';
			var tbl = dce.getElementsByTagName('table');
			var k = 0;
			var si = tbl[2].rows[0].cells;
			var s1 = si[0].getElementsByTagName('strong');
			var s2 = si[4].getElementsByTagName('strong');
			var ex = '[player]'+s1[0].firstChild.innerHTML+'[/player]';
			if(s1.length > 1) ex += ' ('+s1[1].innerHTML+')';
			ex += '[img]'+si[1].getElementsByTagName('img')[0].src+'[/img]';
			ex += '[img]/images/jobs/duell.png[/img]';
			ex += '[img]'+si[3].getElementsByTagName('img')[0].src+'[/img]';
			if(s2[0].firstChild){
				ex += '[player]'+s2[0].firstChild.innerHTML+'[/player]';
			}
			else{
				ex += '[b]'+s2[0].innerHTML+'[/b]';
			}
			if(s2.length > 1) ex += ' ('+s2[1].innerHTML+')';
			ex += '\n__________________________________________________\n';
			var dh = tbl[3].rows;
			var bpa = {
				'0px 0px': 'http://img43.imageshack.us/img43/3745/nohitatt.png',
				'0px -78px': 'http://img196.imageshack.us/img196/6343/haedatt.png',
				'0px -156px': 'http://img269.imageshack.us/img269/382/rightscatt.png',
				'0px -234px': 'http://img195.imageshack.us/img195/8398/leftscatt.png',
				'0px -312px': 'http://img39.imageshack.us/img39/1285/righthaatt.png',
				'0px -390px': 'http://img35.imageshack.us/img35/3261/lefthaatt.png',
				'0px -468px': 'http://img32.imageshack.us/img32/1503/winatt.png',
				'0px -546px': 'http://img193.imageshack.us/img193/1825/loseatt.png',
				'0px -624px': 'http://img9.imageshack.us/img9/5177/leftdie.png'
			};
			var bpd = {
				'0px 0px': 'http://img196.imageshack.us/img196/5995/nohitdeff.png',
				'0px -78px': 'http://img39.imageshack.us/img39/6522/haeddeff.png',
				'0px -156px': 'http://img195.imageshack.us/img195/8905/rightscdeff.png',
				'0px -234px': 'http://img32.imageshack.us/img32/9089/leftscdeff.png',
				'0px -312px': 'http://img35.imageshack.us/img35/3111/righthadeff.png',
				'0px -390px': 'http://img269.imageshack.us/img269/7476/lefthadeff.png',
				'0px -468px': 'http://img193.imageshack.us/img193/7641/windeff.png',
				'0px -546px': 'http://img194.imageshack.us/img194/8311/losedeff.png',
				'0px -624px': 'http://img30.imageshack.us/img30/8627/rightdie.png'
			};
			for(var i=0; i<dh.length; i++){
				if(i == dh.length-1){
					ex += '[b]_______________'+TWPro.lang.HPTOTAL+':_______________[/b]\n';
				}
				var d1 = dh[i].cells[0].getElementsByTagName('span');
				if(d1.length > 1){
					d1 = d1[1].innerHTML;
					if(d1.length < 9){
						d1 = '[color=#D3C6AF]'+(new Array(10-d1.length)).join('0')+'[/color][color=red]'+d1;
					}
					else{
						d1 = '[color=red]'+d1;
					}
					ex += '[b][size=17]'+d1+' [/color][/size][/b]';
				}
				else{
					ex += '[size=17][color=#D3C6AF]0000000[/color]0 [/size]';
				}
				var dud = dh[i].cells[1].getElementsByTagName('div');
				ex += '[img]'+bpa[dud[1].style.backgroundPosition]+'[/img][img]'+bpd[dud[2].style.backgroundPosition]+'[/img]';
				var d2 = dh[i].cells[2].getElementsByTagName('span');
				if(d2.length > 1){
					ex += '[b][size=17][color=blue]'+d2[1].innerHTML+'[/color][/size][/b]';
				}
				else{
					ex += '[size=17][color=#D3C6AF]0000[/color]0 [/size]';
				}
				ex += '\n';
			}
			ex += '[b][size=16]'+dce.getElementsByTagName('h4')[1].innerHTML+'[/size][/b]';
			var dd = document.createElement('div');
			dd.style.cssText = 'overflow: auto; position: relative; height: 340px; padding: 5px;';
			dd.id = dc+'_cnv';
			dd.innerHTML = '<img src="/img.php?type=button&subtype=normal&value=back" alt="Back" style="float:right;cursor:pointer" onclick="this.parentNode.previousSibling.style.display=\'\';this.parentNode.parentNode.removeChild(this.parentNode);" />BB Code: <br /><textarea rows="10" cols="40"  style="width:85%;height:80%;background-image: url(images/muster.jpg);margin-left:auto;margin-right:auto;" onfocus="this.select();" readonly="readonly">' + ex + "</textarea>";
			var bf = tbl[2].parentNode.nextSibling;
			bf.previousSibling.style.display = 'none';
			bf.parentNode.insertBefore(dd, bf);
		}

	}
}
if ((window.location.href.indexOf('.the-west.') != -1 || window.location.href.indexOf('tw.innogames.net') != -1) && window.location.href.indexOf('game') != -1) {
	/*
Diese Script wird von http://www.tw-pro.de/ bereitgestellt.
Es gelten die im Impressum http://www.tw-pro.de/?site=impressum hinterlegten rechtlichen Hinweise.
Insbesondere bedarf eine Veraenderung, Weitergabe oder eine eigene Veroeffentlichung dieses Scripts
oder Teilen davon einer schriftlichen Genehmigung des Autors. Das Copyright liegt beim Autor.
*/
	
	// manipuliert interne Funktionen und fuegt eigene Aufrufe ein
	function twpro_injectScript() {
		var style = document.createElement('style'),
			css = '.twpro_search_hide{display:none}';
		style.setAttribute('type', 'text/css');
		if(style.styleSheet){ // IE
			style.styleSheet.cssText = css;
		}
		else{
			style.appendChild(document.createTextNode(css));
		}
		document.getElementsByTagName('head')[0].appendChild(style);
		TWPro.enablebbcodes = true;
		TWPro.twpro_calculated = false;
		TWPro.twpro_failure = false;
		TWPro.twpro_failureInject = false;
		TWPro.twpro_failureRollback = [];
		TWPro.twpro_active = true;
		TWPro.twpro_sorts = ['name', 'erfahrung', 'lohn', 'glueck', 'comb', 'gefahr', 'laborp'];
		function getPCookie(n){var c='; '+document.cookie+';',s='; twpro_'+encodeURIComponent(n)+'=',b=c.indexOf(s),e;if(b==-1)return'';b=b+s.length;e=c.indexOf(';',b);return decodeURIComponent(c.substring(b,e))}
		TWPro.prefs = {
			'Hide_unjobs': 1,
			'dispJobClothingOnly': 2,
			'multipliers': getPCookie('multipliers'),
			'reportaccess': getPCookie('reportaccess')
		};
		TWPro.prefNumber = parseInt(getPCookie('prefs'), 10) || 0;
		TWPro.multipliers = {xp:1, wages:1, luck:1, danger:1};
		var multiplier,
			savedMultipliers = TWPro.twpro_preference('multipliers').split(':'),
			j=0;
		for(var i in TWPro.multipliers){
			multiplier = parseInt(savedMultipliers[j++], 10);
			if(!isNaN(multiplier)){
				TWPro.multipliers[i] = multiplier;
			}
		}
		TWPro.searchInventory = {timer:null};
		TWPro.twpro_jobs = [];
		// Jobs
		{
			TWPro.twpro_jobValues = {};
			TWPro.twpro_jobValues.swine = {};
			TWPro.twpro_jobValues.swine.erfahrung = 1;
			TWPro.twpro_jobValues.swine.lohn = 3;
			TWPro.twpro_jobValues.swine.glueck = 0;
			TWPro.twpro_jobValues.swine.gefahr = 1;
			TWPro.twpro_jobValues.scarecrow = {};
			TWPro.twpro_jobValues.scarecrow.erfahrung = 3;
			TWPro.twpro_jobValues.scarecrow.lohn = 1;
			TWPro.twpro_jobValues.scarecrow.glueck = 2;
			TWPro.twpro_jobValues.scarecrow.gefahr = 20;
			TWPro.twpro_jobValues.wanted = {};
			TWPro.twpro_jobValues.wanted.erfahrung = 3;
			TWPro.twpro_jobValues.wanted.lohn = 2;
			TWPro.twpro_jobValues.wanted.glueck = 0;
			TWPro.twpro_jobValues.wanted.gefahr = 10;
			TWPro.twpro_jobValues.tabacco = {};
			TWPro.twpro_jobValues.tabacco.erfahrung = 1;
			TWPro.twpro_jobValues.tabacco.lohn = 6;
			TWPro.twpro_jobValues.tabacco.glueck = 2;
			TWPro.twpro_jobValues.tabacco.gefahr = 2;
			TWPro.twpro_jobValues.cotton = {};
			TWPro.twpro_jobValues.cotton.erfahrung = 4;
			TWPro.twpro_jobValues.cotton.lohn = 1;
			TWPro.twpro_jobValues.cotton.glueck = 0;
			TWPro.twpro_jobValues.cotton.gefahr = 3;
			TWPro.twpro_jobValues.sugar = {};
			TWPro.twpro_jobValues.sugar.erfahrung = 2;
			TWPro.twpro_jobValues.sugar.lohn = 5;
			TWPro.twpro_jobValues.sugar.glueck = 4;
			TWPro.twpro_jobValues.sugar.gefahr = 1;
			TWPro.twpro_jobValues.angle = {};
			TWPro.twpro_jobValues.angle.erfahrung = 0;
			TWPro.twpro_jobValues.angle.lohn = 1;
			TWPro.twpro_jobValues.angle.glueck = 6;
			TWPro.twpro_jobValues.angle.gefahr = 2;
			TWPro.twpro_jobValues.cereal = {};
			TWPro.twpro_jobValues.cereal.erfahrung = 6;
			TWPro.twpro_jobValues.cereal.lohn = 2;
			TWPro.twpro_jobValues.cereal.glueck = 2;
			TWPro.twpro_jobValues.cereal.gefahr = 4;
			TWPro.twpro_jobValues.berry = {};
			TWPro.twpro_jobValues.berry.erfahrung = 6;
			TWPro.twpro_jobValues.berry.lohn = 2;
			TWPro.twpro_jobValues.berry.glueck = 5;
			TWPro.twpro_jobValues.berry.gefahr = 6;
			TWPro.twpro_jobValues.sheeps = {};
			TWPro.twpro_jobValues.sheeps.erfahrung = 5;
			TWPro.twpro_jobValues.sheeps.lohn = 3;
			TWPro.twpro_jobValues.sheeps.glueck = 0;
			TWPro.twpro_jobValues.sheeps.gefahr = 2;
			TWPro.twpro_jobValues.newspaper = {};
			TWPro.twpro_jobValues.newspaper.erfahrung = 1;
			TWPro.twpro_jobValues.newspaper.lohn = 6;
			TWPro.twpro_jobValues.newspaper.glueck = 2;
			TWPro.twpro_jobValues.newspaper.gefahr = 1;
			TWPro.twpro_jobValues.cut = {};
			TWPro.twpro_jobValues.cut.erfahrung = 7;
			TWPro.twpro_jobValues.cut.lohn = 5;
			TWPro.twpro_jobValues.cut.glueck = 3;
			TWPro.twpro_jobValues.cut.gefahr = 3;
			TWPro.twpro_jobValues.grinding = {};
			TWPro.twpro_jobValues.grinding.erfahrung = 7;
			TWPro.twpro_jobValues.grinding.lohn = 11;
			TWPro.twpro_jobValues.grinding.glueck = 0;
			TWPro.twpro_jobValues.grinding.gefahr = 5;
			TWPro.twpro_jobValues.corn = {};
			TWPro.twpro_jobValues.corn.erfahrung = 7;
			TWPro.twpro_jobValues.corn.lohn = 4;
			TWPro.twpro_jobValues.corn.glueck = 8;
			TWPro.twpro_jobValues.corn.gefahr = 5;
			TWPro.twpro_jobValues.beans = {};
			TWPro.twpro_jobValues.beans.erfahrung = 7;
			TWPro.twpro_jobValues.beans.lohn = 9;
			TWPro.twpro_jobValues.beans.glueck = 4;
			TWPro.twpro_jobValues.beans.gefahr = 5;
			TWPro.twpro_jobValues.fort_guard = {};
			TWPro.twpro_jobValues.fort_guard.erfahrung = 9;
			TWPro.twpro_jobValues.fort_guard.lohn = 3;
			TWPro.twpro_jobValues.fort_guard.glueck = 2;
			TWPro.twpro_jobValues.fort_guard.gefahr = 7;
			TWPro.twpro_jobValues.tanning = {};
			TWPro.twpro_jobValues.tanning.erfahrung = 15;
			TWPro.twpro_jobValues.tanning.lohn = 12;
			TWPro.twpro_jobValues.tanning.glueck = 5;
			TWPro.twpro_jobValues.tanning.gefahr = 18;
			TWPro.twpro_jobValues.digging = {};
			TWPro.twpro_jobValues.digging.erfahrung = 3;
			TWPro.twpro_jobValues.digging.lohn = 11;
			TWPro.twpro_jobValues.digging.glueck = 5;
			TWPro.twpro_jobValues.digging.gefahr = 7;
			TWPro.twpro_jobValues.grave = {};
			TWPro.twpro_jobValues.grave.erfahrung = 12;
			TWPro.twpro_jobValues.grave.lohn = 16;
			TWPro.twpro_jobValues.grave.glueck = 22;
			TWPro.twpro_jobValues.grave.gefahr = 9;
			TWPro.twpro_jobValues.turkey = {};
			TWPro.twpro_jobValues.turkey.erfahrung = 14;
			TWPro.twpro_jobValues.turkey.lohn = 3;
			TWPro.twpro_jobValues.turkey.glueck = 7;
			TWPro.twpro_jobValues.turkey.gefahr = 21;
			TWPro.twpro_jobValues.rail = {};
			TWPro.twpro_jobValues.rail.erfahrung = 18;
			TWPro.twpro_jobValues.rail.lohn = 10;
			TWPro.twpro_jobValues.rail.glueck = 5;
			TWPro.twpro_jobValues.rail.gefahr = 10;
			TWPro.twpro_jobValues.cow = {};
			TWPro.twpro_jobValues.cow.erfahrung = 17;
			TWPro.twpro_jobValues.cow.lohn = 5;
			TWPro.twpro_jobValues.cow.glueck = 0;
			TWPro.twpro_jobValues.cow.gefahr = 11;
			TWPro.twpro_jobValues.fence = {};
			TWPro.twpro_jobValues.fence.erfahrung = 11;
			TWPro.twpro_jobValues.fence.lohn = 7;
			TWPro.twpro_jobValues.fence.glueck = 5;
			TWPro.twpro_jobValues.fence.gefahr = 6;
			TWPro.twpro_jobValues.saw = {};
			TWPro.twpro_jobValues.saw.erfahrung = 12;
			TWPro.twpro_jobValues.saw.lohn = 23;
			TWPro.twpro_jobValues.saw.glueck = 6;
			TWPro.twpro_jobValues.saw.gefahr = 32;
			TWPro.twpro_jobValues.stone = {};
			TWPro.twpro_jobValues.stone.erfahrung = 8;
			TWPro.twpro_jobValues.stone.lohn = 17;
			TWPro.twpro_jobValues.stone.glueck = 9;
			TWPro.twpro_jobValues.stone.gefahr = 33;
			TWPro.twpro_jobValues.straighten = {};
			TWPro.twpro_jobValues.straighten.erfahrung = 22;
			TWPro.twpro_jobValues.straighten.lohn = 8;
			TWPro.twpro_jobValues.straighten.glueck = 15;
			TWPro.twpro_jobValues.straighten.gefahr = 12;
			TWPro.twpro_jobValues.wood = {};
			TWPro.twpro_jobValues.wood.erfahrung = 5;
			TWPro.twpro_jobValues.wood.lohn = 18;
			TWPro.twpro_jobValues.wood.glueck = 2;
			TWPro.twpro_jobValues.wood.gefahr = 21;
			TWPro.twpro_jobValues.irrigation = {};
			TWPro.twpro_jobValues.irrigation.erfahrung = 13;
			TWPro.twpro_jobValues.irrigation.lohn = 7;
			TWPro.twpro_jobValues.irrigation.glueck = 15;
			TWPro.twpro_jobValues.irrigation.gefahr = 6;
			TWPro.twpro_jobValues.brand = {};
			TWPro.twpro_jobValues.brand.erfahrung = 25;
			TWPro.twpro_jobValues.brand.lohn = 8;
			TWPro.twpro_jobValues.brand.glueck = 0;
			TWPro.twpro_jobValues.brand.gefahr = 35;
			TWPro.twpro_jobValues.wire = {};
			TWPro.twpro_jobValues.wire.erfahrung = 13;
			TWPro.twpro_jobValues.wire.lohn = 17;
			TWPro.twpro_jobValues.wire.glueck = 6;
			TWPro.twpro_jobValues.wire.gefahr = 0;
			TWPro.twpro_jobValues.dam = {};
			TWPro.twpro_jobValues.dam.erfahrung = 18;
			TWPro.twpro_jobValues.dam.lohn = 4;
			TWPro.twpro_jobValues.dam.glueck = 9;
			TWPro.twpro_jobValues.dam.gefahr = 41;
			TWPro.twpro_jobValues.gems = {};
			TWPro.twpro_jobValues.gems.erfahrung = 7;
			TWPro.twpro_jobValues.gems.lohn = 25;
			TWPro.twpro_jobValues.gems.glueck = 8;
			TWPro.twpro_jobValues.gems.gefahr = 4;
			TWPro.twpro_jobValues.claim = {};
			TWPro.twpro_jobValues.claim.erfahrung = 4;
			TWPro.twpro_jobValues.claim.lohn = 31;
			TWPro.twpro_jobValues.claim.glueck = 4;
			TWPro.twpro_jobValues.claim.gefahr = 29;
			TWPro.twpro_jobValues.chuck_wagon = {};
			TWPro.twpro_jobValues.chuck_wagon.erfahrung = 23;
			TWPro.twpro_jobValues.chuck_wagon.lohn = 5;
			TWPro.twpro_jobValues.chuck_wagon.glueck = 42;
			TWPro.twpro_jobValues.chuck_wagon.gefahr = 11;
			TWPro.twpro_jobValues.break_in = {};
			TWPro.twpro_jobValues.break_in.erfahrung = 32;
			TWPro.twpro_jobValues.break_in.lohn = 13;
			TWPro.twpro_jobValues.break_in.glueck = 10;
			TWPro.twpro_jobValues.break_in.gefahr = 52;
			TWPro.twpro_jobValues.trade = {};
			TWPro.twpro_jobValues.trade.erfahrung = 3;
			TWPro.twpro_jobValues.trade.lohn = 15;
			TWPro.twpro_jobValues.trade.glueck = 25;
			TWPro.twpro_jobValues.trade.gefahr = 12;
			TWPro.twpro_jobValues.mast = {};
			TWPro.twpro_jobValues.mast.erfahrung = 25;
			TWPro.twpro_jobValues.mast.lohn = 21;
			TWPro.twpro_jobValues.mast.glueck = 3;
			TWPro.twpro_jobValues.mast.gefahr = 14;
			TWPro.twpro_jobValues.spring = {};
			TWPro.twpro_jobValues.spring.erfahrung = 33;
			TWPro.twpro_jobValues.spring.lohn = 9;
			TWPro.twpro_jobValues.spring.glueck = 23;
			TWPro.twpro_jobValues.spring.gefahr = 19;
			TWPro.twpro_jobValues.beaver = {};
			TWPro.twpro_jobValues.beaver.erfahrung = 17;
			TWPro.twpro_jobValues.beaver.lohn = 32;
			TWPro.twpro_jobValues.beaver.glueck = 6;
			TWPro.twpro_jobValues.beaver.gefahr = 21;
			TWPro.twpro_jobValues.coal = {};
			TWPro.twpro_jobValues.coal.erfahrung = 14;
			TWPro.twpro_jobValues.coal.lohn = 30;
			TWPro.twpro_jobValues.coal.glueck = 0;
			TWPro.twpro_jobValues.coal.gefahr = 13;
			TWPro.twpro_jobValues.print = {};
			TWPro.twpro_jobValues.print.erfahrung = 20;
			TWPro.twpro_jobValues.print.lohn = 30;
			TWPro.twpro_jobValues.print.glueck = 5;
			TWPro.twpro_jobValues.print.gefahr = 7;
			TWPro.twpro_jobValues.fishing = {};
			TWPro.twpro_jobValues.fishing.erfahrung = 23;
			TWPro.twpro_jobValues.fishing.lohn = 6;
			TWPro.twpro_jobValues.fishing.glueck = 23;
			TWPro.twpro_jobValues.fishing.gefahr = 38;
			TWPro.twpro_jobValues.trainstation = {};
			TWPro.twpro_jobValues.trainstation.erfahrung = 47;
			TWPro.twpro_jobValues.trainstation.lohn = 12;
			TWPro.twpro_jobValues.trainstation.glueck = 7;
			TWPro.twpro_jobValues.trainstation.gefahr = 15;
			TWPro.twpro_jobValues.windmeel = {};
			TWPro.twpro_jobValues.windmeel.erfahrung = 43;
			TWPro.twpro_jobValues.windmeel.lohn = 42;
			TWPro.twpro_jobValues.windmeel.glueck = 6;
			TWPro.twpro_jobValues.windmeel.gefahr = 18;
			TWPro.twpro_jobValues.explore = {};
			TWPro.twpro_jobValues.explore.erfahrung = 45;
			TWPro.twpro_jobValues.explore.lohn = 1;
			TWPro.twpro_jobValues.explore.glueck = 22;
			TWPro.twpro_jobValues.explore.gefahr = 37;
			TWPro.twpro_jobValues.float = {};
			TWPro.twpro_jobValues.float.erfahrung = 45;
			TWPro.twpro_jobValues.float.lohn = 23;
			TWPro.twpro_jobValues.float.glueck = 0;
			TWPro.twpro_jobValues.float.gefahr = 52;
			TWPro.twpro_jobValues.bridge = {};
			TWPro.twpro_jobValues.bridge.erfahrung = 33;
			TWPro.twpro_jobValues.bridge.lohn = 17;
			TWPro.twpro_jobValues.bridge.glueck = 18;
			TWPro.twpro_jobValues.bridge.gefahr = 53;
			TWPro.twpro_jobValues.springe = {};
			TWPro.twpro_jobValues.springe.erfahrung = 45;
			TWPro.twpro_jobValues.springe.lohn = 29;
			TWPro.twpro_jobValues.springe.glueck = 0;
			TWPro.twpro_jobValues.springe.gefahr = 42;
			TWPro.twpro_jobValues.coffin = {};
			TWPro.twpro_jobValues.coffin.erfahrung = 8;
			TWPro.twpro_jobValues.coffin.lohn = 42;
			TWPro.twpro_jobValues.coffin.glueck = 15;
			TWPro.twpro_jobValues.coffin.gefahr = 20;
			TWPro.twpro_jobValues.dynamite = {};
			TWPro.twpro_jobValues.dynamite.erfahrung = 12;
			TWPro.twpro_jobValues.dynamite.lohn = 23;
			TWPro.twpro_jobValues.dynamite.glueck = 64;
			TWPro.twpro_jobValues.dynamite.gefahr = 93;
			TWPro.twpro_jobValues.coyote = {};
			TWPro.twpro_jobValues.coyote.erfahrung = 43;
			TWPro.twpro_jobValues.coyote.lohn = 15;
			TWPro.twpro_jobValues.coyote.glueck = 26;
			TWPro.twpro_jobValues.coyote.gefahr = 45;
			TWPro.twpro_jobValues.buffalo = {};
			TWPro.twpro_jobValues.buffalo.erfahrung = 62;
			TWPro.twpro_jobValues.buffalo.lohn = 24;
			TWPro.twpro_jobValues.buffalo.glueck = 0;
			TWPro.twpro_jobValues.buffalo.gefahr = 72;
			TWPro.twpro_jobValues.fort = {};
			TWPro.twpro_jobValues.fort.erfahrung = 71;
			TWPro.twpro_jobValues.fort.lohn = 33;
			TWPro.twpro_jobValues.fort.glueck = 17;
			TWPro.twpro_jobValues.fort.gefahr = 35;
			TWPro.twpro_jobValues.indians = {};
			TWPro.twpro_jobValues.indians.erfahrung = 14;
			TWPro.twpro_jobValues.indians.lohn = 11;
			TWPro.twpro_jobValues.indians.glueck = 63;
			TWPro.twpro_jobValues.indians.gefahr = 34;
			TWPro.twpro_jobValues.clearing = {};
			TWPro.twpro_jobValues.clearing.erfahrung = 8;
			TWPro.twpro_jobValues.clearing.lohn = 62;
			TWPro.twpro_jobValues.clearing.glueck = 9;
			TWPro.twpro_jobValues.clearing.gefahr = 16;
			TWPro.twpro_jobValues.silver = {};
			TWPro.twpro_jobValues.silver.erfahrung = 8;
			TWPro.twpro_jobValues.silver.lohn = 76;
			TWPro.twpro_jobValues.silver.glueck = 0;
			TWPro.twpro_jobValues.silver.gefahr = 32;
			TWPro.twpro_jobValues.diligence_guard = {};
			TWPro.twpro_jobValues.diligence_guard.erfahrung = 77;
			TWPro.twpro_jobValues.diligence_guard.lohn = 34;
			TWPro.twpro_jobValues.diligence_guard.glueck = 45;
			TWPro.twpro_jobValues.diligence_guard.gefahr = 43;
			TWPro.twpro_jobValues.wolf = {};
			TWPro.twpro_jobValues.wolf.erfahrung = 63;
			TWPro.twpro_jobValues.wolf.lohn = 21;
			TWPro.twpro_jobValues.wolf.glueck = 15;
			TWPro.twpro_jobValues.wolf.gefahr = 67;
			TWPro.twpro_jobValues.track = {};
			TWPro.twpro_jobValues.track.erfahrung = 60;
			TWPro.twpro_jobValues.track.lohn = 10;
			TWPro.twpro_jobValues.track.glueck = 30;
			TWPro.twpro_jobValues.track.gefahr = 33;
			TWPro.twpro_jobValues.ox = {};
			TWPro.twpro_jobValues.ox.erfahrung = 34;
			TWPro.twpro_jobValues.ox.lohn = 64;
			TWPro.twpro_jobValues.ox.glueck = 18;
			TWPro.twpro_jobValues.ox.gefahr = 43;
			TWPro.twpro_jobValues.guard = {};
			TWPro.twpro_jobValues.guard.erfahrung = 35;
			TWPro.twpro_jobValues.guard.lohn = 25;
			TWPro.twpro_jobValues.guard.glueck = 38;
			TWPro.twpro_jobValues.guard.gefahr = 4;
			TWPro.twpro_jobValues.bible = {};
			TWPro.twpro_jobValues.bible.erfahrung = 61;
			TWPro.twpro_jobValues.bible.lohn = 5;
			TWPro.twpro_jobValues.bible.glueck = 52;
			TWPro.twpro_jobValues.bible.gefahr = 77;
			TWPro.twpro_jobValues.ponyexpress = {};
			TWPro.twpro_jobValues.ponyexpress.erfahrung = 48;
			TWPro.twpro_jobValues.ponyexpress.lohn = 15;
			TWPro.twpro_jobValues.ponyexpress.glueck = 51;
			TWPro.twpro_jobValues.ponyexpress.gefahr = 44;
			TWPro.twpro_jobValues.weapons = {};
			TWPro.twpro_jobValues.weapons.erfahrung = 35;
			TWPro.twpro_jobValues.weapons.lohn = 15;
			TWPro.twpro_jobValues.weapons.glueck = 72;
			TWPro.twpro_jobValues.weapons.gefahr = 82;
			TWPro.twpro_jobValues.dead = {};
			TWPro.twpro_jobValues.dead.erfahrung = 14;
			TWPro.twpro_jobValues.dead.lohn = 14;
			TWPro.twpro_jobValues.dead.glueck = 90;
			TWPro.twpro_jobValues.dead.gefahr = 34;
			TWPro.twpro_jobValues.grizzly = {};
			TWPro.twpro_jobValues.grizzly.erfahrung = 78;
			TWPro.twpro_jobValues.grizzly.lohn = 25;
			TWPro.twpro_jobValues.grizzly.glueck = 35;
			TWPro.twpro_jobValues.grizzly.gefahr = 71;
			TWPro.twpro_jobValues.oil = {};
			TWPro.twpro_jobValues.oil.erfahrung = 25;
			TWPro.twpro_jobValues.oil.lohn = 83;
			TWPro.twpro_jobValues.oil.glueck = 20;
			TWPro.twpro_jobValues.oil.gefahr = 7;
			TWPro.twpro_jobValues.treasure_hunting = {};
			TWPro.twpro_jobValues.treasure_hunting.erfahrung = 20;
			TWPro.twpro_jobValues.treasure_hunting.lohn = 20;
			TWPro.twpro_jobValues.treasure_hunting.glueck = 83;
			TWPro.twpro_jobValues.treasure_hunting.gefahr = 24;
			TWPro.twpro_jobValues.army = {};
			TWPro.twpro_jobValues.army.erfahrung = 76;
			TWPro.twpro_jobValues.army.lohn = 55;
			TWPro.twpro_jobValues.army.glueck = 17;
			TWPro.twpro_jobValues.army.gefahr = 35;
			TWPro.twpro_jobValues.steal = {};
			TWPro.twpro_jobValues.steal.erfahrung = 50;
			TWPro.twpro_jobValues.steal.lohn = 48;
			TWPro.twpro_jobValues.steal.glueck = 74;
			TWPro.twpro_jobValues.steal.gefahr = 66;
			TWPro.twpro_jobValues.mercenary = {};
			TWPro.twpro_jobValues.mercenary.erfahrung = 52;
			TWPro.twpro_jobValues.mercenary.lohn = 92;
			TWPro.twpro_jobValues.mercenary.glueck = 23;
			TWPro.twpro_jobValues.mercenary.gefahr = 65;
			TWPro.twpro_jobValues.bandits = {};
			TWPro.twpro_jobValues.bandits.erfahrung = 75;
			TWPro.twpro_jobValues.bandits.lohn = 28;
			TWPro.twpro_jobValues.bandits.glueck = 85;
			TWPro.twpro_jobValues.bandits.gefahr = 83;
			TWPro.twpro_jobValues.aggression = {};
			TWPro.twpro_jobValues.aggression.erfahrung = 27;
			TWPro.twpro_jobValues.aggression.lohn = 78;
			TWPro.twpro_jobValues.aggression.glueck = 78;
			TWPro.twpro_jobValues.aggression.gefahr = 86;
			TWPro.twpro_jobValues.diligence_aggression = {};
			TWPro.twpro_jobValues.diligence_aggression.erfahrung = 73;
			TWPro.twpro_jobValues.diligence_aggression.lohn = 43;
			TWPro.twpro_jobValues.diligence_aggression.glueck = 95;
			TWPro.twpro_jobValues.diligence_aggression.gefahr = 67;
			TWPro.twpro_jobValues.bounty = {};
			TWPro.twpro_jobValues.bounty.erfahrung = 32;
			TWPro.twpro_jobValues.bounty.lohn = 92;
			TWPro.twpro_jobValues.bounty.glueck = 79;
			TWPro.twpro_jobValues.bounty.gefahr = 72;
			TWPro.twpro_jobValues.captured = {};
			TWPro.twpro_jobValues.captured.erfahrung = 69;
			TWPro.twpro_jobValues.captured.lohn = 23;
			TWPro.twpro_jobValues.captured.glueck = 85;
			TWPro.twpro_jobValues.captured.gefahr = 44;
			TWPro.twpro_jobValues.train = {};
			TWPro.twpro_jobValues.train.erfahrung = 87;
			TWPro.twpro_jobValues.train.lohn = 67;
			TWPro.twpro_jobValues.train.glueck = 92;
			TWPro.twpro_jobValues.train.gefahr = 96;
			TWPro.twpro_jobValues.burglary = {};
			TWPro.twpro_jobValues.burglary.erfahrung = 34;
			TWPro.twpro_jobValues.burglary.lohn = 80;
			TWPro.twpro_jobValues.burglary.glueck = 81;
			TWPro.twpro_jobValues.burglary.gefahr = 26;
			TWPro.twpro_jobValues.quackery = {};
			TWPro.twpro_jobValues.quackery.erfahrung = 50;
			TWPro.twpro_jobValues.quackery.lohn = 65;
			TWPro.twpro_jobValues.quackery.glueck = 52;
			TWPro.twpro_jobValues.quackery.gefahr = 67;
			TWPro.twpro_jobValues.peace = {};
			TWPro.twpro_jobValues.peace.erfahrung = 68;
			TWPro.twpro_jobValues.peace.lohn = 33;
			TWPro.twpro_jobValues.peace.glueck = 76;
			TWPro.twpro_jobValues.peace.gefahr = 44;
			TWPro.twpro_jobValues.ship = {};
			TWPro.twpro_jobValues.ship.erfahrung = 35;
			TWPro.twpro_jobValues.ship.lohn = 82;
			TWPro.twpro_jobValues.ship.glueck = 15;
			TWPro.twpro_jobValues.ship.gefahr = 14;
			TWPro.twpro_jobValues.smuggle = {};
			TWPro.twpro_jobValues.smuggle.erfahrung = 45;
			TWPro.twpro_jobValues.smuggle.lohn = 62;
			TWPro.twpro_jobValues.smuggle.glueck = 83;
			TWPro.twpro_jobValues.smuggle.gefahr = 56;
			TWPro.twpro_jobValues.ranch = {};
			TWPro.twpro_jobValues.ranch.erfahrung = 61;
			TWPro.twpro_jobValues.ranch.lohn = 28;
			TWPro.twpro_jobValues.ranch.glueck = 17;
			TWPro.twpro_jobValues.ranch.gefahr = 24;
			TWPro.twpro_jobValues.iron = {};
			TWPro.twpro_jobValues.iron.erfahrung = 32;
			TWPro.twpro_jobValues.iron.lohn = 52;
			TWPro.twpro_jobValues.iron.glueck = 15;
			TWPro.twpro_jobValues.iron.gefahr = 29;
			TWPro.twpro_jobValues.agave = {};
			TWPro.twpro_jobValues.agave.erfahrung = 42;
			TWPro.twpro_jobValues.agave.lohn = 25;
			TWPro.twpro_jobValues.agave.glueck = 12;
			TWPro.twpro_jobValues.agave.gefahr = 27;
			TWPro.twpro_jobValues.tomato = {};
			TWPro.twpro_jobValues.tomato.erfahrung = 12;
			TWPro.twpro_jobValues.tomato.lohn = 13;
			TWPro.twpro_jobValues.tomato.glueck = 7;
			TWPro.twpro_jobValues.tomato.gefahr = 11;
			TWPro.twpro_jobValues.horseshoe = {};
			TWPro.twpro_jobValues.horseshoe.erfahrung = 28;
			TWPro.twpro_jobValues.horseshoe.lohn = 14;
			TWPro.twpro_jobValues.horseshoe.glueck = 9;
			TWPro.twpro_jobValues.horseshoe.gefahr = 23;
			TWPro.twpro_jobValues.fire = {};
			TWPro.twpro_jobValues.fire.erfahrung = 41;
			TWPro.twpro_jobValues.fire.lohn = 15;
			TWPro.twpro_jobValues.fire.glueck = 65;
			TWPro.twpro_jobValues.fire.gefahr = 45;
			TWPro.twpro_jobValues.orange = {};
			TWPro.twpro_jobValues.orange.erfahrung = 25;
			TWPro.twpro_jobValues.orange.lohn = 14;
			TWPro.twpro_jobValues.orange.glueck = 10;
			TWPro.twpro_jobValues.orange.gefahr = 21;
			TWPro.twpro_jobValues.muck_out = {};
			TWPro.twpro_jobValues.muck_out.erfahrung = 5;
			TWPro.twpro_jobValues.muck_out.lohn = 4;
			TWPro.twpro_jobValues.muck_out.glueck = 2;
			TWPro.twpro_jobValues.muck_out.gefahr = 6;
			TWPro.twpro_jobValues.shoes = {};
			TWPro.twpro_jobValues.shoes.erfahrung = 2;
			TWPro.twpro_jobValues.shoes.lohn = 3;
			TWPro.twpro_jobValues.shoes.glueck = 3;
			TWPro.twpro_jobValues.shoes.gefahr = 2;
			TWPro.twpro_jobValues.socks_darn = {};
			TWPro.twpro_jobValues.socks_darn.erfahrung = 4;
			TWPro.twpro_jobValues.socks_darn.lohn = 1;
			TWPro.twpro_jobValues.socks_darn.glueck = 0;
			TWPro.twpro_jobValues.socks_darn.gefahr = 0;
			TWPro.twpro_jobValues.potatoe = {};
			TWPro.twpro_jobValues.potatoe.erfahrung = 53;
			TWPro.twpro_jobValues.potatoe.lohn = 8;
			TWPro.twpro_jobValues.potatoe.glueck = 5;
			TWPro.twpro_jobValues.potatoe.gefahr = 5;
			TWPro.twpro_jobValues.feed_animal = {};
			TWPro.twpro_jobValues.feed_animal.erfahrung = 60;
			TWPro.twpro_jobValues.feed_animal.lohn = 17;
			TWPro.twpro_jobValues.feed_animal.glueck = 10;
			TWPro.twpro_jobValues.feed_animal.gefahr = 20;
			TWPro.twpro_jobValues.pumpkin = {};
			TWPro.twpro_jobValues.pumpkin.erfahrung = 45;
			TWPro.twpro_jobValues.pumpkin.lohn = 45;
			TWPro.twpro_jobValues.pumpkin.glueck = 10;
			TWPro.twpro_jobValues.pumpkin.gefahr = 10;
			TWPro.twpro_jobValues.blueberries = {};
			TWPro.twpro_jobValues.blueberries.erfahrung = 35;
			TWPro.twpro_jobValues.blueberries.lohn = 52;
			TWPro.twpro_jobValues.blueberries.glueck = 35;
			TWPro.twpro_jobValues.blueberries.gefahr = 15;
			TWPro.twpro_jobValues.plant_trees = {};
			TWPro.twpro_jobValues.plant_trees.erfahrung = 25;
			TWPro.twpro_jobValues.plant_trees.lohn = 34;
			TWPro.twpro_jobValues.plant_trees.glueck = 54;
			TWPro.twpro_jobValues.plant_trees.gefahr = 25;
			TWPro.twpro_jobValues.gather_feathers = {};
			TWPro.twpro_jobValues.gather_feathers.erfahrung = 23;
			TWPro.twpro_jobValues.gather_feathers.lohn = 47;
			TWPro.twpro_jobValues.gather_feathers.glueck = 60;
			TWPro.twpro_jobValues.gather_feathers.gefahr = 15;
			TWPro.twpro_jobValues.lotus_gathering = {};
			TWPro.twpro_jobValues.lotus_gathering.erfahrung = 45;
			TWPro.twpro_jobValues.lotus_gathering.lohn = 54;
			TWPro.twpro_jobValues.lotus_gathering.glueck = 35;
			TWPro.twpro_jobValues.lotus_gathering.gefahr = 20;
			TWPro.twpro_jobValues.crab_hunting = {};
			TWPro.twpro_jobValues.crab_hunting.erfahrung = 56;
			TWPro.twpro_jobValues.crab_hunting.lohn = 67;
			TWPro.twpro_jobValues.crab_hunting.glueck = 35;
			TWPro.twpro_jobValues.crab_hunting.gefahr = 12;
			TWPro.twpro_jobValues.teaching = {};
			TWPro.twpro_jobValues.teaching.erfahrung = 79;
			TWPro.twpro_jobValues.teaching.lohn = 54;
			TWPro.twpro_jobValues.teaching.glueck = 5;
			TWPro.twpro_jobValues.teaching.gefahr = 23;
			TWPro.twpro_jobValues.sheriff_work = {};
			TWPro.twpro_jobValues.sheriff_work.erfahrung = 76;
			TWPro.twpro_jobValues.sheriff_work.lohn = 67;
			TWPro.twpro_jobValues.sheriff_work.glueck = 56;
			TWPro.twpro_jobValues.sheriff_work.gefahr = 45;
			TWPro.twpro_jobValues.sulfur_gathering = {};
			TWPro.twpro_jobValues.sulfur_gathering.erfahrung = 34;
			TWPro.twpro_jobValues.sulfur_gathering.lohn = 76;
			TWPro.twpro_jobValues.sulfur_gathering.glueck = 78;
			TWPro.twpro_jobValues.sulfur_gathering.gefahr = 32;
			TWPro.twpro_jobValues.wildwater = {};
			TWPro.twpro_jobValues.wildwater.erfahrung = 74;
			TWPro.twpro_jobValues.wildwater.lohn = 84;
			TWPro.twpro_jobValues.wildwater.glueck = 30;
			TWPro.twpro_jobValues.wildwater.gefahr = 57;
			TWPro.twpro_jobValues.gambler = {};
			TWPro.twpro_jobValues.gambler.erfahrung = 57;
			TWPro.twpro_jobValues.gambler.lohn = 67;
			TWPro.twpro_jobValues.gambler.glueck = 69;
			TWPro.twpro_jobValues.gambler.gefahr = 63;
			TWPro.twpro_jobValues.rattlesnake = {};
			TWPro.twpro_jobValues.rattlesnake.erfahrung = 46;
			TWPro.twpro_jobValues.rattlesnake.lohn = 72;
			TWPro.twpro_jobValues.rattlesnake.glueck = 71;
			TWPro.twpro_jobValues.rattlesnake.gefahr = 73;
			TWPro.twpro_jobValues.salpeter_gathering = {};
			TWPro.twpro_jobValues.salpeter_gathering.erfahrung = 53;
			TWPro.twpro_jobValues.salpeter_gathering.lohn = 62;
			TWPro.twpro_jobValues.salpeter_gathering.glueck = 58;
			TWPro.twpro_jobValues.salpeter_gathering.gefahr = 27;
			TWPro.twpro_jobValues.horse_transport = {};
			TWPro.twpro_jobValues.horse_transport.erfahrung = 82;
			TWPro.twpro_jobValues.horse_transport.lohn = 66;
			TWPro.twpro_jobValues.horse_transport.glueck = 69;
			TWPro.twpro_jobValues.horse_transport.gefahr = 48;
			TWPro.twpro_jobValues.rodeo = {};
			TWPro.twpro_jobValues.rodeo.erfahrung = 56;
			TWPro.twpro_jobValues.rodeo.lohn = 76;
			TWPro.twpro_jobValues.rodeo.glueck = 69;
			TWPro.twpro_jobValues.rodeo.gefahr = 78;
			TWPro.twpro_jobValues.travelling_salesman = {};
			TWPro.twpro_jobValues.travelling_salesman.erfahrung = 46;
			TWPro.twpro_jobValues.travelling_salesman.lohn = 59;
			TWPro.twpro_jobValues.travelling_salesman.glueck = 97;
			TWPro.twpro_jobValues.travelling_salesman.gefahr = 67;
			TWPro.twpro_jobValues.con_artist = {};
			TWPro.twpro_jobValues.con_artist.erfahrung = 89;
			TWPro.twpro_jobValues.con_artist.lohn = 78;
			TWPro.twpro_jobValues.con_artist.glueck = 35;
			TWPro.twpro_jobValues.con_artist.gefahr = 83;
			TWPro.twpro_jobValues.cougar = {};
			TWPro.twpro_jobValues.cougar.erfahrung = 89;
			TWPro.twpro_jobValues.cougar.lohn = 46;
			TWPro.twpro_jobValues.cougar.glueck = 39;
			TWPro.twpro_jobValues.cougar.gefahr = 93;
			TWPro.twpro_jobValues.alcohol = {};
			TWPro.twpro_jobValues.alcohol.erfahrung = 91;
			TWPro.twpro_jobValues.alcohol.lohn = 74;
			TWPro.twpro_jobValues.alcohol.glueck = 34;
			TWPro.twpro_jobValues.alcohol.gefahr = 56;
			TWPro.twpro_jobValues.lead_gathering = {};
			TWPro.twpro_jobValues.lead_gathering.erfahrung = 72;
			TWPro.twpro_jobValues.lead_gathering.lohn = 89;
			TWPro.twpro_jobValues.lead_gathering.glueck = 22;
			TWPro.twpro_jobValues.lead_gathering.gefahr = 72;
			TWPro.twpro_jobValues.gem_gathering = {};
			TWPro.twpro_jobValues.gem_gathering.erfahrung = 78;
			TWPro.twpro_jobValues.gem_gathering.lohn = 91;
			TWPro.twpro_jobValues.gem_gathering.glueck = 23;
			TWPro.twpro_jobValues.gem_gathering.gefahr = 77;
			TWPro.twpro_jobValues.mission = {};
			TWPro.twpro_jobValues.mission.erfahrung = 82;
			TWPro.twpro_jobValues.mission.lohn = 92;
			TWPro.twpro_jobValues.mission.glueck = 54;
			TWPro.twpro_jobValues.mission.gefahr = 38;
			TWPro.twpro_jobValues.casino = {};
			TWPro.twpro_jobValues.casino.erfahrung = 92;
			TWPro.twpro_jobValues.casino.lohn = 78;
			TWPro.twpro_jobValues.casino.glueck = 23;
			TWPro.twpro_jobValues.casino.gefahr = 47;
			TWPro.twpro_jobValues.marshall = {};
			TWPro.twpro_jobValues.marshall.erfahrung = 90;
			TWPro.twpro_jobValues.marshall.lohn = 87;
			TWPro.twpro_jobValues.marshall.glueck = 60;
			TWPro.twpro_jobValues.marshall.gefahr = 94;
			TWPro.twpro_jobValues.shatter_gang = {};
			TWPro.twpro_jobValues.shatter_gang.erfahrung = 70;
			TWPro.twpro_jobValues.shatter_gang.lohn = 84;
			TWPro.twpro_jobValues.shatter_gang.glueck = 89;
			TWPro.twpro_jobValues.shatter_gang.gefahr = 99;
			TWPro.twpro_jobValues.bankrobbery = {};
			TWPro.twpro_jobValues.bankrobbery.erfahrung = 84;
			TWPro.twpro_jobValues.bankrobbery.lohn = 93;
			TWPro.twpro_jobValues.bankrobbery.glueck = 30;
			TWPro.twpro_jobValues.bankrobbery.gefahr = 89;
			TWPro.twpro_jobValues.free_slaves = {};
			TWPro.twpro_jobValues.free_slaves.erfahrung = 93;
			TWPro.twpro_jobValues.free_slaves.lohn = 84;
			TWPro.twpro_jobValues.free_slaves.glueck = 28;
			TWPro.twpro_jobValues.free_slaves.gefahr = 92;
			TWPro.twpro_jobValues.buffelo_bill = {};
			TWPro.twpro_jobValues.buffelo_bill.erfahrung = 94;
			TWPro.twpro_jobValues.buffelo_bill.lohn = 92;
			TWPro.twpro_jobValues.buffelo_bill.glueck = 65;
			TWPro.twpro_jobValues.buffelo_bill.gefahr = 70;
			
			var extra_jobs = ['construct', 'lifepoints', 'ride', 'duelshootingatt', 'duelshootingdef', 'duelvigor', 'fortatt', 'fortdef'];
			for(var i=0; i<extra_jobs.length; i++){
				TWPro.twpro_jobValues[extra_jobs[i]] = {'erfahrung':0, 'lohn':0, 'glueck':0, 'gefahr':0};
			}
		}
		TWPro.twpro_setBonusParsed = false;
		// Setitems
		{
			TWPro.twpro_setBonus = {};
			TWPro.twpro_setBonus.set_sleeper = [];
			TWPro.twpro_setBonus.set_sleeper[1] = {image:"images/items/head/mini/sleep_cap.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_sleeper[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set = [];
			TWPro.twpro_setBonus.season_set[1] = {image:"images/items/yield/mini/dfgrocket1a.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[2] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[3] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[4] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[5] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[6] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.season_set[7] = {bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_indian = [];
			TWPro.twpro_setBonus.set_indian[1] = {image:"images/items/head/mini/indian_hat.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_indian[2] = {};
			TWPro.twpro_setBonus.set_indian[2].bonus = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_indian[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[2].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[2].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[2].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[2].speedBonus = 15;
			TWPro.twpro_setBonus.set_indian[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[3] = {};
			TWPro.twpro_setBonus.set_indian[3].bonus = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.attributes.flexibility = 5;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[3].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[3].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[3].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[3].speedBonus = 30;
			TWPro.twpro_setBonus.set_indian[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[4] = {};
			TWPro.twpro_setBonus.set_indian[4].bonus = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.attributes.flexibility = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[4].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[4].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[4].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[4].speedBonus = 44;
			TWPro.twpro_setBonus.set_indian[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_indian[5] = {};
			TWPro.twpro_setBonus.set_indian[5].bonus = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.attributes.flexibility = 12;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.hide = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.swim = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.pitfall = 8;
			TWPro.twpro_setBonus.set_indian[5].bonus.skills.animal = 8;
			TWPro.twpro_setBonus.set_indian[5].jobBonus = {};
			TWPro.twpro_setBonus.set_indian[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.coyote = 30;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.buffalo = 40;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.wolf = 50;
			TWPro.twpro_setBonus.set_indian[5].jobBonus.grizzly = 60;
			TWPro.twpro_setBonus.set_indian[5].speedBonus = 60;
			TWPro.twpro_setBonus.set_indian[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman = [];
			TWPro.twpro_setBonus.set_gentleman[1] = {image:"images/items/yield/mini/cane.png",gender:"male",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_gentleman[2] = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[2].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_gentleman[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3] = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.attributes.charisma = 3;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[3].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_gentleman[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4] = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.attributes.charisma = 6;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[4].bonus.skills.appearance = 8;
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_gentleman[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5] = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.attributes.charisma = 10;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.leadership = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.trade = 8;
			TWPro.twpro_setBonus.set_gentleman[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus = {};
			TWPro.twpro_setBonus.set_gentleman[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_gentleman[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_gentleman[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer = [];
			TWPro.twpro_setBonus.set_dancer[1] = {image:"images/items/yield/mini/umbrella.png",gender:"female",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_dancer[2] = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[2].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[2].jobBonus.all = 5;
			TWPro.twpro_setBonus.set_dancer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[3] = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.attributes.charisma = 5;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[3].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[3].jobBonus.all = 15;
			TWPro.twpro_setBonus.set_dancer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[4] = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.attributes.charisma = 9;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[4].bonus.skills.appearance = 10;
			TWPro.twpro_setBonus.set_dancer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[4].jobBonus.all = 30;
			TWPro.twpro_setBonus.set_dancer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_dancer[5] = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.attributes.charisma = 11;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.finger_dexterity = 12;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.endurance = 6;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.animal = 10;
			TWPro.twpro_setBonus.set_dancer[5].bonus.skills.appearance = 16;
			TWPro.twpro_setBonus.set_dancer[5].jobBonus = {};
			TWPro.twpro_setBonus.set_dancer[5].jobBonus.all = 50;
			TWPro.twpro_setBonus.set_dancer[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_dancer[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery = [];
			TWPro.twpro_setBonus.set_quackery[1] = {image:"images/items/yield/mini/potion.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_quackery[2] = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.endurance = 5;
			TWPro.twpro_setBonus.set_quackery[2].bonus.skills.trade = 5;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[2].jobBonus.quackery = 30;
			TWPro.twpro_setBonus.set_quackery[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[3] = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.endurance = 10;
			TWPro.twpro_setBonus.set_quackery[3].bonus.skills.trade = 10;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[3].jobBonus.quackery = 60;
			TWPro.twpro_setBonus.set_quackery[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[4] = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.attributes.dexterity = 4;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.endurance = 15;
			TWPro.twpro_setBonus.set_quackery[4].bonus.skills.trade = 15;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[4].jobBonus.quackery = 90;
			TWPro.twpro_setBonus.set_quackery[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[5] = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.attributes.dexterity = 6;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[5].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[5].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_quackery[6] = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.attributes.dexterity = 9;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.tough = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.endurance = 20;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.reflex = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.aim = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.shot = 18;
			TWPro.twpro_setBonus.set_quackery[6].bonus.skills.trade = 20;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus = {};
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_quackery[6].jobBonus.quackery = 120;
			TWPro.twpro_setBonus.set_quackery[6].speedBonus = 0;
			TWPro.twpro_setBonus.set_quackery[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican = [];
			TWPro.twpro_setBonus.set_mexican[1] = {image:"images/items/head/mini/mexican_sombrero.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_mexican[2] = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_mexican[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[2].speedBonus = 12;
			TWPro.twpro_setBonus.set_mexican[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[3] = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[3].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_mexican[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[3].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[3].speedBonus = 24;
			TWPro.twpro_setBonus.set_mexican[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[4] = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[4].bonus.attributes.strength = 4;
			TWPro.twpro_setBonus.set_mexican[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[4].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[4].speedBonus = 36;
			TWPro.twpro_setBonus.set_mexican[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[5] = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[5].bonus.attributes.strength = 6;
			TWPro.twpro_setBonus.set_mexican[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[5].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[5].speedBonus = 48;
			TWPro.twpro_setBonus.set_mexican[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_mexican[6] = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes = {};
			TWPro.twpro_setBonus.set_mexican[6].bonus.attributes.strength = 9;
			TWPro.twpro_setBonus.set_mexican[6].bonus.skills = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus = {};
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.dynamite = 90;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.oil = 70;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.smuggle = 80;
			TWPro.twpro_setBonus.set_mexican[6].jobBonus.agave = 60;
			TWPro.twpro_setBonus.set_mexican[6].speedBonus = 60;
			TWPro.twpro_setBonus.set_mexican[6].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male = [];
			TWPro.twpro_setBonus.set_pilgrim_male[1] = {image:"images/items/head/mini/pilger_hat.png",gender:"male",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_pilgrim_male[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_male[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_male[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_male[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_male[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_male[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_male[5].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female = [];
			TWPro.twpro_setBonus.set_pilgrim_female[1] = {image:"images/items/head/mini/pilger_cap.png",gender:"female",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_pilgrim_female[2] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].jobBonus.construct = 5;
			TWPro.twpro_setBonus.set_pilgrim_female[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].jobBonus.construct = 15;
			TWPro.twpro_setBonus.set_pilgrim_female[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].jobBonus.construct = 30;
			TWPro.twpro_setBonus.set_pilgrim_female[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[4].parsedBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5] = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.attributes = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].bonus.skills = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus = {};
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.bible = 150;
			TWPro.twpro_setBonus.set_pilgrim_female[5].jobBonus.construct = 50;
			TWPro.twpro_setBonus.set_pilgrim_female[5].speedBonus = 0;
			TWPro.twpro_setBonus.set_pilgrim_female[5].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set = [];
			TWPro.twpro_setBonus.greenhorn_set[1] = {image:"images/items/neck/mini/greenhorn_neck.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.greenhorn_set[2] = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[2].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[2].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[2].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[2].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3] = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[3].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[3].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[3].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[3].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4] = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[4].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[4].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[4].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[4].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5] = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[5].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[5].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[5].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[5].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6] = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[6].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.all = 0;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[6].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[6].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[6].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7] = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[7].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.all = 5;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[7].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[7].speedBonus = 0;
			TWPro.twpro_setBonus.greenhorn_set[7].parsedBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8] = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes = {};
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.greenhorn_set[8].bonus.skills = {};
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus = {};
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.all = 15;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.cow = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.turkey = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.tanning = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.wood = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].jobBonus.sugar = 10;
			TWPro.twpro_setBonus.greenhorn_set[8].speedBonus = 20;
			TWPro.twpro_setBonus.greenhorn_set[8].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer = [];
			TWPro.twpro_setBonus.set_farmer[1] = {image:"images/items/yield/mini/pitchfork.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.set_farmer[2] = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[2].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[2].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[2].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[2].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[3] = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.strength = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.flexibility = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.dexterity = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.attributes.charisma = 1;
			TWPro.twpro_setBonus.set_farmer[3].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[3].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[3].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[3].parsedBonus = {};
			TWPro.twpro_setBonus.set_farmer[4] = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes = {};
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.strength = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.flexibility = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.dexterity = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.attributes.charisma = 2;
			TWPro.twpro_setBonus.set_farmer[4].bonus.skills = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus = {};
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.all = 0;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cereal = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cut = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.grinding = 10;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.cow = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.wire = 20;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.windmeel = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.springe = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.ranch = 40;
			TWPro.twpro_setBonus.set_farmer[4].jobBonus.horseshoe = 20;
			TWPro.twpro_setBonus.set_farmer[4].speedBonus = 0;
			TWPro.twpro_setBonus.set_farmer[4].parsedBonus = {};
			TWPro.twpro_setBonus.gold_set = [];
			TWPro.twpro_setBonus.gold_set[1] = {image:"images/items/left_arm/mini/golden_rifle.png",gender:"mixed",bonus:{attributes:{},skills:{}},jobBonus:{all:0},speedBonus:0,parsedBonus:{}};
			TWPro.twpro_setBonus.gold_set[2] = {};
			TWPro.twpro_setBonus.gold_set[2].bonus = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.attributes = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.skills = {};
			TWPro.twpro_setBonus.gold_set[2].bonus.skills.health = 10;
			TWPro.twpro_setBonus.gold_set[2].jobBonus = {};
			TWPro.twpro_setBonus.gold_set[2].jobBonus.all = 25;
			TWPro.twpro_setBonus.gold_set[2].speedBonus = 20;
			TWPro.twpro_setBonus.gold_set[2].parsedBonus = {};
			TWPro.twpro_setBonus.fireworker_set = [];
			TWPro.twpro_setBonus.fireworker_set[1] = {};
			TWPro.twpro_setBonus.fireworker_set[1].image = "images/items/yield/mini/bucket_fire.png";
			TWPro.twpro_setBonus.fireworker_set[1].gender = "mixed";
			TWPro.twpro_setBonus.fireworker_set[1].bonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.attributes = {};
			TWPro.twpro_setBonus.fireworker_set[1].bonus.skills = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus = {};
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.all = 0;
			TWPro.twpro_setBonus.fireworker_set[1].jobBonus.fire = 15;
			TWPro.twpro_setBonus.fireworker_set[1].speedBonus = 0;
			TWPro.twpro_setBonus.fireworker_set[1].parsedBonus = {};

		}
		TWPro.twpro_invHash = '';
		TWPro.twpro_itemStorage = {};
		while (TWPro.twpro_active) {
			//alert('// Original AjaxWindow.show:\n'+AjaxWindow.show.toString());
			//alert('// Original Bag.getInstance().add:\n'+Bag.getInstance().add.toString());
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// Original ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			var twpro_matchtest;
			if (AjaxWindow.show.toString().search(/evalJS/) == -1) {
				if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/eval\(data\.js\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
				eval('AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/eval\(data\.js\);/, 'TWPro.twpro_injectionSwitch(extendeName,\'js\',data,\'js\');eval(data.js);TWPro.twpro_injectionSwitch(extendeName,\'after\',data,null);'));
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
			}
			else { if ((AjaxWindow.show.toString().search(/if *\(data\.page *!= *undefined\) *{/) == -1) || (AjaxWindow.show.toString().search(/this\.evalJS\(\);/) == -1)) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('AjaxWindow.show = ' + AjaxWindow.show.toString());
				eval('AjaxWindow.show = ' + AjaxWindow.show.toString().replace(/if *\(data\.page *!= *undefined\) *{/, 'if(data.page!=undefined){TWPro.twpro_injectionSwitch(extendeName,\'page\',data,null);').replace(/this\.evalJS\(\);/, 'this.twpro_extendeName=extendeName;this.evalJS();'));
				//alert('// TW Pro AjaxWindow.show:\n'+AjaxWindow.show.toString());
				//alert('// Original Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
				if (Ajax.prototype.evalJS.toString().search(/eval\(this\.jsContent\);/) == -1) {
					TWPro.twpro_failureInject = true;
					break;
				}
				TWPro.twpro_failureRollback.unshift('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString());
				eval('Ajax.prototype.evalJS = ' + Ajax.prototype.evalJS.toString().replace(/eval\(this\.jsContent\);/, 'TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'js\',this,\'jsContent\');eval(this.jsContent);TWPro.twpro_injectionSwitch(this.twpro_extendeName,\'after\',this,null);'));
				//alert('// TW Pro Ajax.prototype.evalJS:\n'+Ajax.prototype.evalJS.toString());
			}
			WEvent.register('inventory_add', {
				exec: function(data){data=typeof data=='string'?Json.evaluate(data[0]):data[0];setTimeout(TWPro.twpro_changeItem, 0, {inv_id:data.inv_id})}
			});
			WEvent.register('inventory_remove', {
				exec: function(inv_id){setTimeout(TWPro.twpro_changeItem, 0, {inv_id:inv_id,deleted:1})}
			});
			// Wear.add() removed, Wear.uncarry() -> WEvent handles it now
			// Wear.uncarry() removed, WEvent handles it now
			if (Bag.getInstance().add.toString().search(/}, *('*)over/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			twpro_matchtest = Bag.getInstance().add.toString().match(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g);
			if (twpro_matchtest == null || twpro_matchtest.length != 3) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('Bag.getInstance().add = ' + Bag.getInstance().add.toString());
			// removed TWPro.changeItem() from Bag.getInstance().add() because WEvent handles it now
			eval('Bag.getInstance().add = ' + Bag.getInstance().add.toString().replace(/(["'])wear_["'] *\+ *item\.get_type\(\) *\+ *["']_highlight["']/g, '(TWPro.twpro_activeJob())?($1$1):($1wear_$1+item.get_type()+$1_highlight$1)'));
			// Bag.getInstance().carry removed, WEvent handles it now
			if (ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/) == -1) {
				TWPro.twpro_failureInject = true;
				break;
			}
			TWPro.twpro_failureRollback.unshift('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString());
			eval('ItemPopup.prototype.getXHTML = ' + ItemPopup.prototype.getXHTML.toString().replace(/xhtml *\+= *(['"])<span class=(\\*)"item_popup_trader_price/, 'xhtml+=TWPro.twpro_popup(item);xhtml+=$1<span class=$2"item_popup_trader_price'));
			//for(var twpro_i = 0; twpro_i < ItemPopup.prototype.getXHTML.toString().length; twpro_i += 2000)
			//{
			//  alert(((twpro_i == 0)?('// TW Pro ItemPopup.prototype.getXHTML:\n'):(''))+ItemPopup.prototype.getXHTML.toString().substr(twpro_i,2000));
			//}
			break;
		}
		TWPro.twpro_world = location.hostname.match(/^[^.]+/)[0];
		var twpro_support = document.createElement('div');
		twpro_support.id = 'twpro_support';
		twpro_support.style.cssText = 'position:absolute; color:#656565; font-size:10px; margin-left:2px; z-index:2';
		var twpro_supportLink = document.createElement('a');
		twpro_supportLink.id = 'twpro_supportLink';
		twpro_supportLink.href = 'http://userscripts.org/scripts/show/92414';
		twpro_supportLink.target = '_blank';
		twpro_supportLink.appendChild(document.createTextNode('v'+twpro_version));
		var twpro_supportAuthor = document.createElement('a');
		twpro_supportAuthor.id = 'twpro_supportAuthor';
		twpro_supportAuthor.style.cursor = 'help';
		twpro_supportAuthor.appendChild(document.createTextNode("[+++]"));
		twpro_support.appendChild(document.createTextNode("TW Pro+: "));
		twpro_support.appendChild(twpro_supportLink);
		twpro_support.appendChild(document.createTextNode(' '+TWPro.lang.AUTHOR+': '));
		twpro_support.appendChild(twpro_supportAuthor);
		var translator = TWPro.lang.info;
		if(translator && translator.length){
			var twpro_translatorLink = document.createElement('a');
			twpro_translatorLink.appendChild(document.createTextNode(translator[0]));
			if(translator.length > 1){
				if(translator.length > 3 && translator[3].indexOf('.'+location.host.match(/\d+\./)) != -1){
					twpro_translatorLink.href = 'javascript:AjaxWindow.show("profile",{char_id:'+translator[2]+'},"'+translator[2]+'");';
				}
				else{
					twpro_translatorLink.href = translator[1];
					twpro_translatorLink.target = '_blank';
				}
			}
			twpro_support.appendChild(document.createTextNode(" "+TWPro.lang.TRANSLATOR+": "));
			twpro_support.appendChild(twpro_translatorLink);
		}
		if (!TWPro.twpro_active) {
			twpro_support.appendChild(document.createTextNode(" ("+TWPro.lang.TWPRO_DISABLED+")"));
		}
		var flags = 'data:image/gif;base64,R0lGODlhPgAKAMQaAAAAAK4cKMYLHv7LAO0pOeJnD5MAAOSzt//EAP3DAtaVDN0AAP///+KxD6NODrWKWc2KLYhAIKl5cehFALXB2M6sLLl8Fb5rG//OACFGi////wAAAAAAAAAAAAAAAAAAACH5BAHoAxoALAAAAAA+AAoAAAWXICCOZCkGaKquQuu+cDnMM2HbZk6uvAr/LxltcMPpdL1kYclsOoW0IsFArVqv1IN2y+0ivgmFIvEtl6G14mLNbrvXjLh8Ti83HI+G2Ywmqt+AbHSDc2UQERIQe2ckQ343E5GSk5SRFJeYmZplFRYXFYtffVIYpaanqKUZq6ytrk6wTaNFqbWnrritQLuzN7a/ucG7QL02IQA7'
		var ib = document.getElementById('main_footnotes');
		ib.insertBefore(twpro_support, ib.firstChild);
		$(twpro_supportAuthor.id).addMousePopup(new MousePopup('<table cellspacing="0" cellpadding="0"><tr><td>Author:</td><td>Nexton<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')0px;width:17px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td>Lekensteyn<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-17px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td>Sandevil<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-32px;width:15px;height: 10px;"></div></td></tr><tr><td>Contributor:</td><td>Pedro Ramirez<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')0px;width:17px;height: 10px;"></div></td></tr><tr><td>This release:&nbsp;</td><td>Zyphir Randrott<div style="float:right;margin-left:3px;margin-top:3px;background:url('+flags+')-47px;width:15px;height: 10px;"></div></td></tr></table>'));
		if (TWPro.twpro_failureInject) {
			TWPro.twpro_throwFailure();
		}
	}


	function twpro_preference(pref, enabledValue){
		if(!(pref in TWPro.prefs)) return false;
		var prefVal = TWPro.prefs[pref];
		if(typeof enabledValue == 'undefined'){
			if(typeof prefVal != 'number') return prefVal;
			return TWPro.prefNumber & prefVal;
		}
		if(typeof prefVal != 'number'){
			document.cookie = 'twpro_'+pref+'='+enabledValue+'; max-age=5184000';
			return enabledValue;
		}
		if(enabledValue) TWPro.prefNumber |= prefVal;
		else TWPro.prefNumber = (TWPro.prefNumber | prefVal) - prefVal;
		document.cookie = 'twpro_prefs='+TWPro.prefNumber+'; max-age=5184000';
		return enabledValue;
	}

	function twpro_throwFailure() {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_failure = true;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_failureRollback.length; twpro_i++) {
			eval(TWPro.twpro_failureRollback[twpro_i]);
		}
	}

	function twpro_injectionSwitch(twpro_extendeName, twpro_injectionType, twpro_data, twpro_jsversion) {
		if (TWPro.twpro_failure) return;
		if (!twpro_extendeName) {
			//alert('Mist');
			return;
		} else
		//alert(twpro_extendeName+"\n\n"+twpro_injectionType+"\n\n"+twpro_data[twpro_jsversion]);
		//twpro_extendeName
		switch (twpro_injectionType) {
		case 'page':
			{
				if (twpro_extendeName == 'inventory') {
					TWPro.twpro_insertList(twpro_data);
				}
				else if(twpro_extendeName.substr(0, 4) == 'job_' || twpro_extendeName.substr(0, 15) == 'cityhall_build_'){
						var workSpeed = (twpro_data.js ? twpro_data.js.match(/JobCalculation\.workSpeed\s*=\s*([^;]+);/) : JobCalculation.workSpeed)||[,1];
						var hours = workSpeed[1] * 2,
							seconds = hours * 3600;
						twpro_data.page = twpro_data.page.replace(new RegExp('(value="'+seconds+'")( label="'+hours+' .+?")?>'+hours+' '), '$1$2 selected="selected">'+hours+' ');
					}
				else if(twpro_extendeName.substr(0, 13) == 'reports_show_'){
					twpro_data.page = convertduelreport('window_'+twpro_extendeName, twpro_data.page);
				} else if(twpro_extendeName.substr(0,15) == 'building_saloon' ){
	 			 var twpro_advice_elementid="window_"+twpro_extendeName;
				  var twpro_advice_elementin=$(twpro_advice_elementid);
					if (Character.name == 'William Manney' || Character.name == 'Sandevil' || Character.name == 'Belgo' || Character.name == 'Manolkin' || Character.name == 'Coprofagia'  || Character.name == 'cliff hamett' || Character.name == 'walkerutebo' || Character.name == 'igmu' || Character.name == 'henryque' || Character.name == 'Ambrosio II') {
	 				 twpro_data.page = makeadvicemessage(twpro_advice_elementin, twpro_data.page);
					}
    			       }
				break;
			}
		case 'js':
			{
				if ((twpro_extendeName == 'inventory') || (twpro_extendeName.substr(0, 15) == 'building_tailor') || (twpro_extendeName.substr(0, 17) == 'building_gunsmith') || (twpro_extendeName.substr(0, 16) == 'building_general')) {
					TWPro.twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion);
				}
				if(twpro_extendeName.substr(0, 7) == 'profile'){
					try{
						var who = twpro_data.response.text.match(/messages', {addressee:'([^']+)'}/);
						if(who) who = unescape(who[1].replace(/\\/g,"%"));
						else{
							who = $('window_'+twpro_extendeName).getElement('.char_name').innerHTML.replace(/^\s+/, '').replace(/ \([^)]+\)$/, '');
						}

						if(who) (new Ajax('/game.php?window=ranking&mode=ajax_duels',
						{
							data: {
								type: 'duels',
								page: 0,
								skill: 0,
								search: who,
								rank: 0,
								action: 'search'
							},
							method: 'post',
							onComplete: function(resp){
								if(resp){
									var re=new RegExp("'"+twpro_extendeName.substr(8)+"'\\);\\\\\">[^<]+<\\\\\\/a><\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>\\d+<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(\\d+)<\\\\\\/div><\\\\\\/td>\\\\n\\\\t\\\\t<td class=\\\\\"center\\\\\"><div class='anti_wrap'>(-?\\d+)<"), d = resp.match(re);
									if(d){
											var tr = document.createElement('tr'),
												td = document.createElement('td'),
												div = document.createElement('div');
											td.colSpan = '2';
											div.innerHTML = '<span class="small">'+TWPro.lang.WINS + ': ' + d[1] + ' | ' + TWPro.lang.LOSSES + ': ' + d[2] + ' | ' + TWPro.lang.WINLOSSDIFF + ': ' + d[3]+'<span>';
											td.appendChild(div);
											tr.appendChild(td);
											var rp = $('window_'+twpro_extendeName).getElement('.rank').parentNode;
											rp.nextSibling.nextSibling.cells[0].style.padding = '0';
											rp.parentNode.insertBefore(tr, rp.nextSibling);
											rp.parentNode.parentNode.style.borderCollapse = 'collapse';
									}
								}
							}
						})).request();
					}
					catch(e){}
				}
				break;
			}
		case 'after':
			{

				if (twpro_extendeName == 'inventory') {
					TWPro.twpro_showList();
				} else if(twpro_extendeName.substr(0,15) == 'fort_battlepage' ){
	 			 var twpro_fort_elementid="window_"+twpro_extendeName;
				  var twpro_fort_elementin=$(twpro_fort_elementid);
	 				 makefortmessage(twpro_fort_elementin);
    			 } 	else if (twpro_extendeName == 'messages') {
					document.getElementById('tab_write').firstChild.style.width = '610px';
					var messagebox = document.getElementById('write_table');
					messagebox.parentNode.style.cssText = 'overflow: auto; height: 397px; width: 595px;';
					messagebox.style.width = '575px';
					messagebox = messagebox.getElementById('text');
					insertbbcodesfunc(messagebox, false);
				}
				else if(twpro_extendeName.substr(0, 15) == 'building_tailor' || twpro_extendeName.substr(0, 17) == 'building_gunsmith' || twpro_extendeName.substr(0, 16) == 'building_general'){
					try{
						var ins = $('window_'+twpro_extendeName+'_content').getElement('#own_inv_div h2'),
							stu = $('window_'+twpro_extendeName+'_content').getElements('.own_inv .bag_item'),
							but = document.createElement('button'),
							bas = document.createElement('input');
						but.style.cssText = 'font-size:small;float:right';
						bas.style.cssText = 'bottom:25px;float:right;font-size:small;font-weight:bold;right:3px;opacity:.7;overflow:hidden;position:relative;z-index:2;text-align:center;width:18px;height:16px;';
						bas.type = 'text';
						bas.className = 'lkn_shopsell';
						but.innerHTML = TWPro.lang.MULTISEL;
						but.onclick = function(){
							but.disabled = true;
							for(var i=0, wat, count; i<stu.length; i++){
								wat = bas.cloneNode(false);
								if(!stu[i].getElementsByTagName('p').length){
									wat.readonly = 'readonly';
									wat.onclick = function(){
										this.value = this.value == 1 ? '' : 1;
									};
								}
								else{
									wat.onclick = function(){
										var all = this.parentNode.getElementsByTagName('p')[0].innerHTML;
										this.value = this.value == all ? '' : all;
										this.select();
									};
									wat.maxLength = 2;
									wat.onblur = function(){
										var n = Math.max(parseInt(this.value, 10) || 0, 0);
										n = Math.min(n, this.parentNode.getElementsByTagName('p')[0].innerHTML);
										this.value = n == '0' ? '' : n;
									};
								}
								stu[i].appendChild(wat);
							}
							but.innerHTML = TWPro.lang.SELL;
							but.onclick = function(){
								but.disabled = true;
								var sellList = [], building = twpro_extendeName.match(/building_[^_]+/)+'',
								baseUrl='game.php?window='+building+'&action=sell&h='+h, town_id=twpro_extendeName.match(/\d+/);
								for(var i=0, n; i<stu.length; i++){
									if((n=1*stu[i].getElement('.lkn_shopsell').value)){
										sellList.push([stu[i].id.substr(5), n]);
									}
								}
								if(!sellList.length){
									alert(TWPro.lang.NONESELECTED);
									but.disabled = false;
								}
								else if(confirm(TWPro.lang.CONFIRMSELL.replace(/%1/g, sellList.length))){
									var that = this;
									this.innerHTML = TWPro.lang.SELLING + ' (0/'+sellList.length+')';
									var sold = 0, errors = [];
									function sellStuff(inv_id, count){
										(new Ajax(baseUrl, {
											method: 'post',
											data: {
												inv_id: inv_id,
												town_id: town_id,
												count: count
											},
											onComplete: function(data){
												sold++;
												that.innerHTML = TWPro.lang.SELLING + ' ('+sold+'/'+sellList.length+')';
												data = Json.evaluate(data);
												if(data.error[0]){
													errors.push(data.error[1]);
												}
												else{
													Character.set_money(data.money);
													WEvent.trigger('inventory_remove', [inv_id]);
												}
												if(sold == sellList.length){
													that.innerHTML = TWPro.lang.SELL;
													that.disabled = false;
													new HumanMessage(TWPro.lang.SALEDONE, {type:'success'});
													if(errors.length){
														alert('Sale errors:\n'+errors.join('\n'));
													}
													AjaxWindow.show(building, {town_id:town_id}, town_id);
												}
											}.bind(this)
										})).request();
									}
									for(var i=0; i<sellList.length; i++){
										sellStuff(sellList[i][0], sellList[i][1]);
									}
								}
								else{
									but.disabled = false;
								}
							};
							but.disabled = false;
						};
						ins.parentNode.insertBefore(but, ins);
					}
					catch(e){}
				}
				break;
			}
		}
	}

	function twpro_reportAccess(exportIt){
		var rep = document.getElementById('report_table').rows, i, inp,
			level = TWPro.twpro_preference('reportaccess'),
			accessImage = ReportPublish.publishData[level].imagePath,
			edit = [];
		for(i=1; i<rep.length-1; i++){
			if((inp=rep[i].getElementsByTagName('input')[0]) && inp.name == 'reports' && inp.checked){
				edit.push(inp.value);
			}
		}//ReportPublish.publishData
		for(i=0; i<edit.length; i++){
			if(document.getElementById('reportList_publishMode_'+edit[i]).getElementsByTagName('img')[0].src != accessImage){
				
			}
		}
	}

	function twpro_getAuthor() {
		//if(TWPro.twpro_failure) return false;
		switch (TWPro.twpro_world) {
		case 'de1':
		case 'de2':
		case 'de3':
		case 'de4':
		case 'de5':
		case 'de6':
			return true;
		}
		return false;
	}

	function twpro_activeJob() {
		if (TWPro.twpro_failure) return false;
		return TWPro.twpro_calculated && document.getElementById("twpro_jobList") && document.getElementById("twpro_jobList").selectedIndex != 0;
	}

	function twpro_getPlace(twpro_data, twpro_extendeName, twpro_jsversion) {
		//alert('2: '+twpro_extendeName);
		if (TWPro.twpro_failure) return;
		if (twpro_extendeName == 'inventory') {
			if (twpro_data[twpro_jsversion].search(/wear_content\[i\]\);(\s*)\}/) == -1) {
				//alert('1');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/bag_content\[i\]\);(\s*)\}/) == -1) {
				//alert('2');
				TWPro.twpro_throwFailure();
				return;
			}

			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace(/wear_content\[i\]\);(\s*)\}/, 'wear_content[i]);$1};TWPro.twpro_initializeItems(\'wear\',null);').replace(/bag_content\[i\]\);(\s*)\}/, 'bag_content[i]);$1};TWPro.twpro_initializeItems(\'bag\',null);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
		else { if (twpro_data[twpro_jsversion].search(/var trader_inv/) == -1) {
				//alert('3');
				TWPro.twpro_throwFailure();
				return;
			}
			if (twpro_data[twpro_jsversion].search(/trader_inv\[i\]\);(\s*)\}/) == -1 && twpro_data[twpro_jsversion].search(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/) == -1) {
				//alert('4');
				TWPro.twpro_throwFailure();
				return;
			}
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
			twpro_data[twpro_jsversion] = twpro_data[twpro_jsversion].replace('var trader_inv', 'TWPro.twpro_initializeItems(\'own\',playerInventory);var trader_inv').replace(/trader_inv\[i\]\);(\s*)\}/, 'trader_inv[i]);$1};TWPro.twpro_initializeItems(\'trader\',traderInventory);').replace(/trader_inv\[i\], *(['"])(\w*)['"]\);(\s*)\}/, 'trader_inv[i],$1$2$1);$3};TWPro.twpro_initializeItems(\'trader\',traderInventory);');
			//for(var twpro_i = 0; twpro_i < twpro_data[twpro_jsversion].length; twpro_i += 2000)
			//{
			//  alert(twpro_data[twpro_jsversion].substr(twpro_i,2000));
			//}
		}
	}

	// wird beim Erstellen eines Popups ausgefuehrt, stellt Code fuer diesen zusammen
	function twpro_popup(twpro_item) {
		if (TWPro.twpro_failure) return '';
		var twpro_xhtml = '';
		if (TWPro.twpro_calculated && twpro_item.twpro_place) {
			if ((twpro_item.twpro_place == 'wear') || (twpro_item.twpro_place == 'bag')) {
				if (document.getElementById("twpro_jobList") && (document.getElementById("twpro_jobList").selectedIndex != 0)) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
						if (twpro_item.twpro_bonus == undefined) {
							TWPro.twpro_prepareItem(twpro_item);
							if (twpro_item.twpro_bonus) {
								for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
									twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
								}
							}
						}
						if (twpro_item.twpro_bonus) {
							var twpro_aktplus = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_selectedJob].shortName];
							if (twpro_aktplus > 0) {
								twpro_xhtml += '<span class="item_popup_bonus">+'+
								twpro_aktplus + ' ' + twpro_job.name+
								'<br /></span><br />';
							}
						}
					}
				}
			}
			if (twpro_item.twpro_place == 'trader') {
				if (twpro_item.twpro_bonus == undefined) {
					TWPro.twpro_prepareItem(twpro_item);
					if (twpro_item.twpro_bonus) {
						for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
							twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_testItem(TWPro.twpro_jobs[twpro_i], twpro_item);
						}
					}
				}
				if (twpro_item.twpro_bonus) {
					var twpro_j = 0;
					var twpro_plus = [];
					var twpro_better;
					for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
						twpro_better = twpro_item.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] - TWPro.twpro_jobs[twpro_i].twpro_bestStats[twpro_item.type];
						if (twpro_better > 0) {
							twpro_plus.push(twpro_better + ' ' + TWPro.twpro_jobs[twpro_i].name);
							twpro_j++;
						}
					}
					if (twpro_j > 0) {
						twpro_plus.sort(TWPro.twpro_sortPlus);
						twpro_xhtml += '<span class="item_popup_bonus"><table><tr><td>';
						var re_jobname = TWPro.twpro_jobs[parseInt(document.getElementById('twpro_jobList')[document.getElementById('twpro_jobList').selectedIndex].value)] || '';
						if(re_jobname) re_jobname = re_jobname.name;
						var bool_j = twpro_j > 30 && twpro_j <= 33;
						for (var twpro_i = 0; (twpro_i < twpro_plus.length) && (twpro_i < 33); twpro_i++) {
							twpro_xhtml += '<span style="white-space:nowrap;';
							if (TWPro.twpro_activeJob() && (twpro_plus[twpro_i].indexOf(re_jobname) != -1)) {
								twpro_xhtml += 'color:rgb(78, 55, 7);';
							}
							twpro_xhtml += '">+' + twpro_plus[twpro_i] + '</span><br />';
							if ((twpro_j <= 30 && twpro_i == 14) || (bool_j && (twpro_i == (Math.round(twpro_j / 2) - 1))) || (twpro_j > 33 && twpro_i == 16)) {
								twpro_xhtml += '</td><td>';
							}
						}
						if (twpro_i < twpro_plus.length) {
							twpro_xhtml += '...';
						}
						twpro_xhtml += '</td></tr></table></span><br />';
					}
				}
			}
		}
		return twpro_xhtml;
	}

	// fuegt Auswahlliste in das Inventar ein
	function twpro_insertList(twpro_data) {
		if (TWPro.twpro_failure) return;
		if (!TWPro.twpro_jobsort) {
			TWPro.twpro_jobsort = 'name';
		}
		TWPro.twpro_bag = {};
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_wear_items_list = '';
		TWPro.twpro_bag.twpro_countType = {};
		TWPro.twpro_bag.twpro_countType_diff = {};
		TWPro.twpro_bag.twpro_types = [];
		TWPro.twpro_setItems = {};
		TWPro.twpro_setItemsCount = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		TWPro.twpro_invHashTest = [];
		for (var twpro_type in Character.itemLevelRequirementDecrease) {
			if ((twpro_type != 'all') && (!isNaN(Character.itemLevelRequirementDecrease[twpro_type]))) {
				TWPro.twpro_bag.twpro_types.push(twpro_type);
				TWPro.twpro_bag.twpro_countType[twpro_type] = 0;
				TWPro.twpro_bag.twpro_countType_diff[twpro_type] = 0;
			}
		}
				TWPro.twpro_bag.twpro_types.push("belt");
				TWPro.twpro_bag.twpro_countType["belt"] = 0;
				TWPro.twpro_bag.twpro_countType_diff["belt"] = 0;
				TWPro.twpro_bag.twpro_types.push("pants");
				TWPro.twpro_bag.twpro_countType["pants"] = 0;
				TWPro.twpro_bag.twpro_countType_diff["pants"] = 0;


$('window_inventory').style.height = "502px";
var new_inventory ="data:image/gif;base64,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";

		var twpro_xhtml = '<div style="background:url(images/inventory/west_inventar_2.jpg); margin-top:-33px; margin-left:-15px; width:770px; height:100%;"></div><div style="position: absolute; background:url('+new_inventory+'); top:0px; margin-top:2px; margin-left:-9px; width:100%; height:49px;"></div>';
		twpro_data.page += twpro_xhtml;

	$('window_inventory_content').style.height = "460px";
		twpro_xhtml = '<div style="text-align:right;width:100%;position:relative;margin-top:-6px;height:50px;"><table width="200px" id="twpro_jobDisplay" style="display: inline;position: absolute; visibility:hidden; right:-34px; z-index:2;text-align:right;"><tr><td>';
		//animierte jobsort-buttons
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			var name = TWPro.twpro_sorts[i];
			twpro_xhtml += '<a href="javascript:" onmouseup="TWPro.twpro_sortList(\''+name+'\')"><img id="twpro_jobsort_link_'+name+'" alt="" src="images/transparent.png" width="20" height="17" style="background-image:url(data:image/png;base64,'+sortButtonImg+');background-position:-'+(i*20)+'px '+(TWPro.twpro_jobsort==name?0:-17)+'px" onmouseover="this.style.backgroundPosition=\'-'+(i*20)+'px 0\'" onmouseout="if(TWPro.twpro_jobsort!=\''+name+'\')this.style.backgroundPosition=\'-'+(i*20)+'px -17px\'"/></a>';
		}
		twpro_xhtml += '</td></tr><tr><td>';
		twpro_xhtml += '<input id="twpro_jobsort_filter" type="checkbox"' + (TWPro.twpro_preference('Hide_unjobs')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'Hide_unjobs\',this.checked);TWPro.twpro_clickfilterList()"/> <select id="twpro_jobList" size="1" onchange="TWPro.twpro_changeJob()" onclick="TWPro.twpro_clickList()" style="background-color: rgb(207, 195, 166); font-size: 10px; width:120px;"><option value="-1" id="twpro_wait" style="background-color: rgb(207, 195, 166);">'+TWPro.lang.STARTCALC+'</option></select>';
		twpro_xhtml += ' <input id="twpro_clothingfilter" type="checkbox"' + (TWPro.twpro_preference('dispJobClothingOnly')?' checked="checked"':'') + '  onclick="TWPro.twpro_preference(\'dispJobClothingOnly\',this.checked);TWPro.twpro_bagVis()" />';
		twpro_xhtml += '</td></tr></table></div>';
		twpro_data.page = twpro_data.page.replace(/<div(.*)top: 13px; left: 5px;"><h2>/, '<div$1top: 58px; left: 5px;"><h2>');
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
		  var rep_filter = new RegExp("<div id=\"filter_"+TWPro.twpro_bag.twpro_types[twpro_i]+"\"","g");
		  twpro_data.page = twpro_data.page.replace(rep_filter, '<div id="filter_'+TWPro.twpro_bag.twpro_types[twpro_i]+'" style="top:98px;"');
		}
		twpro_data.page = twpro_data.page.replace(/<div id="item_trader_button"/, '<div id="item_trader_button" style="position: absolute; margin-top:45px;"');
		twpro_data.page = twpro_xhtml+twpro_data.page;

		// settings for job rankings
		twpro_xhtml = '<div style="left:320px;position:absolute; top:0px; margin-top:3px;color:#C77341;text-align:center;line-height:160%">'+TWPro.lang.JOBRANKSETTINGS+'<br>';
		var imgorder = [20, 40, 60, 100], j=0;
		for(var i in TWPro.multipliers){
			twpro_xhtml += '<img src="images/transparent.png" alt="" style="background-image:url(data:image/png;base64,'+sortButtonImg+');background-position:-'+imgorder[j++]+'px 0;margin-left:5px" width="20" height="17" /><input type="text" style="background-color: rgb(207, 195, 166);width:23px" value="'+TWPro.multipliers[i]+'" onchange="TWPro.twpro_handleJobrank(this, \''+i+'\')" />';
		}
		twpro_xhtml += '</div>';
twpro_data.page += twpro_xhtml;
		// search inventory
		TWPro.searchInventory = {timer:null};
					//warten-gif-animation
		(new Image()).src = 'data:image/gif;base64,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'
		twpro_xhtml = '<label style="z-index:2;position:absolute;top:8px;right:26px;font-size:13px;font-weight:normal;font-style:italic;color:#636;cursor:pointer" for="twpro_searchinventory">'+TWPro.lang.SEARCHINVENTORY+'</label><input type="text" style="z-index:2;width:150px;background:#F0CD8B url(data:image/png;base64,'+searchButtonImg+') no-repeat scroll 0 0;padding:0 2px 0 19px" id="twpro_searchinventory" onfocus="previousSibling.style.display=\'none\'" onblur="if(this.value==\'\')previousSibling.style.display=\'block\'" onkeyup="TWPro.twpro_searchInventory(event.keyCode==13)" /><span id="twpro_search_help" style="z-index:2;font-size:13px;font-weight:bold;color:#191970;cursor:help;background:#D4C7B0;width:20px;height:17px">?</span>&nbsp;&nbsp;';
		
		twpro_data.page = twpro_data.page.replace(/<div(.*)text-align: center; top: 13px; left: 316px;"><h2>(.+)<\/h2>/, '<div id="twpro_bag" style="position:absolute; z-index:2;left: 318px; margin-top:6px;"><img src="/images/items/yield/bagpack.png" width="25" height="25"></div><div$1top: 58px; left: 316px;text-align: right;z-index:1;"><h2>$2'+twpro_xhtml+'</h2>');

		twpro_xhtml = '<div id ="display_sets" style="z-index:2;position:absolute;right:3px;top:105px;">';
		twpro_xhtml_2 = '';
		for (var twpro_set in TWPro.twpro_setBonus) {
			if (TWPro.twpro_setBonus[twpro_set][1].gender == Character.characterSex || TWPro.twpro_setBonus[twpro_set][1].gender == "mixed"){
		twpro_xhtml += '<a href="javascript:void(0)"><img id="twpro_set_filters_'+twpro_set+'_bg" src="images/inventory/bag.png" style="position:float;z-index:1;width:20px;height:20px;"/><img id="twpro_set_filters_'+twpro_set+'" alt="" src="'+TWPro.twpro_setBonus[twpro_set][1].image+'" style="position:float;z-index:2;width:20px;height:20px;margin-left:-20px;opacity:0.65;" onmouseover="this.setOpacity(parseFloat(this.style.opacity)+0.35);" onmouseout="this.setOpacity(parseFloat(this.style.opacity)-0.35);" onclick="this.setOpacity(1.35);TWPro.twpro_show_set(\''+twpro_set+'\')"/></a><br>';
		}
		else{
		twpro_xhtml_2 += '<a href="javascript:void(0)"><img id="twpro_set_filters_'+twpro_set+'_bg" src="images/inventory/bag.png" style="position:float;z-index:1;width:20px;height:20px;"/><img id="twpro_set_filters_'+twpro_set+'" alt="" src="'+TWPro.twpro_setBonus[twpro_set][1].image+'" style="position:float;z-index:2;width:20px;height:20px;margin-left:-20px;opacity:0.65;" onmouseover="this.setOpacity(parseFloat(this.style.opacity)+0.35);" onmouseout="this.setOpacity(parseFloat(this.style.opacity)-0.35);" onclick="this.setOpacity(1.35);TWPro.twpro_show_set(\''+twpro_set+'\')"/></a><br>';
			}

			}
		twpro_xhtml_2 += '</div>';
twpro_data.page += twpro_xhtml+twpro_xhtml_2;


	}

	function twpro_handleJobrank(field, type){
		var val = parseFloat(field.value);
		if(isNaN(val)) val = 1;
		field.value = val;
		TWPro.multipliers[type] = 1*val;
		var multipliers = [];
		for(var i in TWPro.multipliers){
			multipliers.push(TWPro.multipliers[i]);
		}
		TWPro.twpro_preference('multipliers', multipliers.join(':'));
		if(TWPro.twpro_jobsort == 'comb'){
			TWPro.twpro_sortList('comb');
		}
	}
	
	twpro_toggle_set = 0;
	function twpro_show_set(set_searched){
	  var anyresult = null;
	  if (twpro_toggle_set != set_searched){
		remove_highlight();
		twpro_toggle_set = set_searched;
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
		i, inv_id, nores = document.getElementById('twpro_nosearchresult');
		
		for(i=0; i<bag_items.length; i++){
		  if (bag_items[i].firstChild.getAttribute('src') !=null){
			bag_items[i].style.display = 'none';
			inv_id = (bag_items[i].id).replace("item_", "");
			if (Bag.getInstance().items[inv_id].obj.set != null){
			  if (Bag.getInstance().items[inv_id].obj.set.key == set_searched){
			  bag_items[i].style.display = '';
			  anyresult = 1;
			  }
			}
		  }
		}
		
		for (var twpro_wear in Wear.wear) {
		  if (Wear.wear[twpro_wear].obj.set != null){
			if (Wear.wear[twpro_wear].obj.set.key == set_searched){
				$('char_'+twpro_wear).className = $('char_'+twpro_wear).className + ' wear_'+twpro_wear+'_highlight';
			}
		  }
		}
		
		if(!anyresult){
			if(!nores){
				nores = document.createElement('span');
				nores.id = 'twpro_nosearchresult';
				nores.style.color = "#C77341";
				document.getElementById('bag').appendChild(nores);
			}
			nores.innerHTML = TWPro.lang.NOSEARCHRESULT.replace('%2', '<br /><a href="javascript:" onclick="TWPro.twpro_show_set(\''+set_searched+'\');">').replace('%3', '</a>').replace('%1', '<em>'+TWPro.twpro_setBonus[set_searched][1].name+'</em>');
		}
		else if(nores){
			nores.parentNode.removeChild(nores);
		}
	  }
	  else{
		remove_highlight();
		twpro_toggle_set = 0;
		TWPro.twpro_bagVis();
	  }
	  
	  function remove_highlight(){
		if (twpro_toggle_set != 0) {
		  $('twpro_set_filters_'+twpro_toggle_set).setOpacity(parseFloat($('twpro_set_filters_'+twpro_toggle_set).style.opacity)-0.35);
		  for (var twpro_wear in Wear.wear) {
			if (Wear.wear[twpro_wear].obj.set != null){
			  if (Wear.wear[twpro_wear].obj.set.key == twpro_toggle_set){
				  $('char_'+twpro_wear).className = $('char_'+twpro_wear).className.replace(' wear_'+twpro_wear+'_highlight', '');
			  }
			}
		  }
		}
	  }
	}
	
	function twpro_searchInventory(searchNow, updateItemId){
		if(!TWPro.searchInventory.cache && updateItemId) return;
		if(!searchNow){
			clearTimeout(TWPro.searchInventory.timer);
			TWPro.searchInventory.timer = setTimeout(TWPro.twpro_searchInventory, 500, true, updateItemId);
			return;
		}
		clearTimeout(TWPro.searchInventory.timer);
		TWPro.searchInventory.timer = null;
		var search = document.getElementById('twpro_searchinventory');
		if(!search) return;
		var cache, i, item,
			invent = document.getElementById('bag'),
			reJunk = /<[^>]+>|\n+/g, reSplit = /\t+/g,
			rePopupType = /"item_popup_type">([^<]+)<\/span>/,
			rePopupBonusAttr = /"item_popup_bonus_attr">([^<]+)<\/span>/,
			rePopupBonusSkill = /"item_popup_bonus_skill">([^<]+)<\/span>/,
			unjunk = function(subject, replace){return subject.replace(reJunk, replace||'').replace(reSplit, ' ').toLowerCase()},
			searchTerms = unjunk(search.value), isRegExp = false,
			anyresult;
		if(/[*?]/.test(searchTerms)){
			searchTerms = new RegExp(searchTerms.replace(/[.+\[\]()\\{}]/g, '\\$&').replace(/\?+/g, '[^\t]?').replace(/\*+/g, '[^\t]*?'));
			isRegExp = true;
		}
		var loadingButtonImg='data:image/gif;base64,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'
		search.style.backgroundImage = 'url('+loadingButtonImg+')';
		var processbagItem = function(iid, bag_item){
				if(bag_item){
					bag_obj = bag_item.obj;
					cache[iid] = unjunk(bag_obj.name);
					if((wat = bag_obj.description)){
						cache[iid] += '\t' + unjunk(wat);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupType))){
						cache[iid] += '\t' + unjunk(wat[1]);
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusAttr))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_item.popup.popup.xhtml.match(rePopupBonusSkill))){
						cache[iid] += '\t' + unjunk(wat[1], '\t');
					}
					if((wat = bag_obj.set)){
						cache[iid] += '\t' + unjunk(wat.name);
					}
				}
				if((item=invent.getElementById('item_'+iid))){
					disp = isRegExp ? searchTerms.test(cache[iid]) : cache[iid].indexOf(searchTerms) != -1;
					// don't add them together, FF 3.6 has an annoying bug: disp = false instead of '' or 'twpro_search_hide'
					disp = disp ? '' : 'twpro_search_hide';
					if(disp == 'twpro_search_hide'){
						item.className = item.className+' '+disp;
					}
					else{
					item.className = item.className.replace(/ twpro_search_hide/g, "");
					}
					//item.className = 'bag_item '+disp;
				}
			},
			bag_items = Bag.getInstance().items, i, disp
		if(!(cache = TWPro.searchInventory.cache)){
			cache = TWPro.searchInventory.cache = {};
			for(i in bag_items){
				processbagItem(i, bag_items[i]);
			}
		}
		else{
			for(i in cache){
				processbagItem(i);
			}
			if(bag_items[updateItemId]){
				processbagItem(updateItemId, bag_items[updateItemId]);
			}
		}
		TWPro.twpro_bagVis();
		search.style.backgroundImage = 'url(data:image/png;base64,'+searchButtonImg+')';
	}


	function twpro_bagVis(){
		var bag_items = document.getElementById('bag').getElementsByTagName('div'),
			i, hide = TWPro.twpro_preference('dispJobClothingOnly') && document.getElementById('twpro_jobList').selectedIndex != 0,
			anyresult,
			nores = document.getElementById('twpro_nosearchresult');;
		for(i=0; i<bag_items.length; i++){
			if(bag_items[i].id.substr(0, 5) != 'item_') continue;
			if(bag_items[i].className.indexOf('twpro_search_hide') != -1){
				continue;
			}
			if(hide && bag_items[i].firstChild.className == ''){
				bag_items[i].style.display = 'none';
			}
			else{
				bag_items[i].style.display = '';
				anyresult = 1;
			}
		}
		if(!anyresult){
			if(!nores){
				nores = document.createElement('div');
				nores.id = 'twpro_nosearchresult';
				nores.style.color = "#C77341";
				document.getElementById('bag').appendChild(nores);
			}
			nores.innerHTML = TWPro.lang.NOSEARCHRESULT.replace('%2', '<br /><a href="javascript:" onclick="document.getElementById(\'twpro_searchinventory\').value=\'\';TWPro.twpro_searchInventory(true)">').replace('%3', '</a>').replace('%1', '<em>'+document.getElementById('twpro_searchinventory').value.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&/g, '&amp;')+'</em>');
		}
		else if(nores){
			nores.parentNode.removeChild(nores);
		}
	}

	function twpro_sortList(twpro_jobSortItem) {
		if (TWPro.twpro_failure) return;
		TWPro.twpro_jobsort = twpro_jobSortItem;
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			TWPro.twpro_jobSortMark(TWPro.twpro_sorts[i], false);
		}
		TWPro.twpro_jobSortMark(twpro_jobSortItem, true);
		if (TWPro.twpro_calculated && document.getElementById("twpro_jobList")) {
			if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
				document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
				var twpro_selectedJobName = 'none';
				if (document.getElementById("twpro_jobList").selectedIndex != 0) {
					var twpro_selectedJob = parseInt(document.getElementById("twpro_jobList")[document.getElementById("twpro_jobList").selectedIndex].value);
					if (twpro_selectedJob >= 0) {
						twpro_selectedJobName = TWPro.twpro_jobs[twpro_selectedJob].shortName;
					}
				}
				document.getElementById("twpro_jobList").selectedIndex = 0;
				while (document.getElementById("twpro_jobList").lastChild.id != 'twpro_wait') {
					document.getElementById("twpro_jobList").removeChild(document.getElementById("twpro_jobList").lastChild);
				}
				TWPro.twpro_sortJobs();
				TWPro.twpro_insertListItems();
				for (var twpro_i = 0; twpro_i < TWPro.twpro_jobs.length; twpro_i++) {
					TWPro.twpro_jobs[twpro_i].twpro_jobid = twpro_i;
				}
				for (var twpro_i = 0; twpro_i < document.getElementById("twpro_jobList").options.length; twpro_i++) {
					var twpro_jobTest = parseInt(document.getElementById("twpro_jobList").options[twpro_i].value);
					if (twpro_jobTest >= 0) {
						if (twpro_selectedJobName == TWPro.twpro_jobs[twpro_jobTest].shortName) {
							document.getElementById("twpro_jobList").selectedIndex = twpro_i;
						}
					}
				}
				document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
			}
			else {
				TWPro.twpro_sortJobs();
			}
		}
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).blur();
	}

	function twpro_jobSortMark(twpro_jobSortItem, twpro_jobSortValue) {
		if (TWPro.twpro_failure) return;
		var twpro_bgposition = '';
		for(var i=0; i<TWPro.twpro_sorts.length; i++){
			if(TWPro.twpro_sorts[i] == twpro_jobSortItem){
				twpro_bgposition = (20*-i)+'px ';
				break;
			}
		}
		twpro_bgposition += twpro_jobSortValue ? '0px' : '-17px';
		document.getElementById('twpro_jobsort_link_' + twpro_jobSortItem).style.backgroundPosition = twpro_bgposition;
	}

	// macht die Liste sichtbar
	function twpro_showList() {
		if (TWPro.twpro_failure) return;
		$('twpro_jobsort_link_name').addMousePopup(new MousePopup(TWPro.lang.SORTBYNAME, 100, {opacity:0.95}));
		$('twpro_jobsort_link_erfahrung').addMousePopup(new MousePopup(TWPro.lang.SORTBYXP, 100, {opacity:0.95}));
		$('twpro_jobsort_link_lohn').addMousePopup(new MousePopup(TWPro.lang.SORTBYWAGES, 100, {opacity:0.95}));
		$('twpro_jobsort_link_glueck').addMousePopup(new MousePopup(TWPro.lang.SORTBYLUCK, 100, {opacity:0.95}));
		$('twpro_jobsort_link_comb').addMousePopup(new MousePopup(TWPro.lang.SORTBYCOMB, 100, {opacity:0.95}));
		$('twpro_jobsort_link_gefahr').addMousePopup(new MousePopup(TWPro.lang.SORTBYDANGER, 100, {opacity:0.95}));
		$('twpro_jobsort_link_laborp').addMousePopup(new MousePopup(TWPro.lang.SORTBYLABORP, 100, {opacity:0.95}));
		$('twpro_jobsort_filter').addMousePopup(new MousePopup(TWPro.lang.FILTERJOBS, 100, {opacity:0.95}));
		$('twpro_clothingfilter').addMousePopup(new MousePopup(TWPro.lang.FILTERCLOTHING, 100, {opacity:0.95}));
		$('twpro_search_help').addMousePopup(new MousePopup(TWPro.lang.SEARCHHELP, 100, {opacity:0.95}));

		for (var twpro_wear in Wear.wear) {
		  if (Wear.wear[twpro_wear].obj.set != null){
		  TWPro.twpro_setBonus[Wear.wear[twpro_wear].obj.set.key][1].name = Wear.wear[twpro_wear].obj.set.name;
		  }
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
		  if (bagitems[twpro_bag].obj.set != null){
			TWPro.twpro_setBonus[bagitems[twpro_bag].obj.set.key][1].name = bagitems[twpro_bag].obj.set.name;
		  }
		}	
		for (var twpro_set in TWPro.twpro_setBonus) {
		  if (TWPro.twpro_setBonus[twpro_set][1].name){
			$('twpro_set_filters_'+twpro_set).addMousePopup(new MousePopup('<b>'+TWPro.twpro_setBonus[twpro_set][1].name+'</b>', 100, {opacity:0.95})); 
		  }
		  else{
			$('twpro_set_filters_'+twpro_set).setOpacity(0.05);
			$('twpro_set_filters_'+twpro_set).style.cursor="default";
			$('twpro_set_filters_'+twpro_set).onclick="void(0)";
		  }
		}

		TWPro.twpro_bag.twpro_bagPopup = new MousePopup('', 100, {opacity:0.95});
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh = function () {
			this.setXHTML(TWPro.twpro_getBagPopup());
		};
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		$('twpro_bag').addMousePopup(TWPro.twpro_bag.twpro_bagPopup);

		//TWPro.twpro_invHash = [];
		if (TWPro.twpro_invHash == TWPro.twpro_invHashTest.join(',')) {
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
				if (Wear.wear[twpro_wear].obj.twpro_bonus) {
					Wear.wear[twpro_wear].obj.twpro_jobbonus = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus;
					//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
					//        {
					//          Wear.wear[twpro_wear].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Wear.wear[twpro_wear].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
					//        }
				}
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
				if (bagitems[twpro_bag].obj.twpro_bonus) {
					bagitems[twpro_bag].obj.twpro_jobbonus = TWPro.twpro_itemStorage[bagitems[twpro_bag].obj.item_id].twpro_jobbonus;
					//        for(var twpro_i=0;twpro_i<TWPro.twpro_jobs.length;twpro_i++)
					//        {
					//          Bag.getInstance().items[twpro_bag].obj.twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName] = TWPro.twpro_itemStorage[Bag.getInstance().items[twpro_bag].obj.item_id].twpro_jobbonus[TWPro.twpro_jobs[twpro_i].shortName];
					//        }
				}
			}
			TWPro.twpro_insertListItems();
			document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
		}
		document.getElementById('twpro_jobDisplay').style.visibility = 'visible';
	}

	function twpro_getBagPopup() {
		if (TWPro.twpro_failure) return '';
		eval(String(ItemPopup.prototype.getXHTML.toString().match(/var item_type_title.+"};/)));
		var twpro_xhtml = '';
		twpro_xhtml += '<div class="item_popup">';
		twpro_xhtml += '<span class="item_popup_title">'+TWPro.lang.INVENTSTATS+'</span>';
		twpro_xhtml += '<span class="item_popup_requirement_text"><hr>'+TWPro.lang.SELLVALUE+'<hr></span>';
		twpro_xhtml += '<table>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+document.getElementById('window_inventory_content').getElementsByTagName('h2')[1].innerHTML+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceWear + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+document.getElementById('window_inventory_content').getElementsByTagName('h2')[0].innerHTML.substring(0,document.getElementById('window_inventory_content').getElementsByTagName('h2')[0].innerHTML.indexOf(" <label"))+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceBag + ' $<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceItems + ' $</td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_priceYields + ' $<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + parseInt(TWPro.twpro_bag.twpro_priceWear + TWPro.twpro_bag.twpro_priceBag) + ' $</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '<hr><span style="text-align:right;font-weight:normal;float:right;">[&ne;]&nbsp;</span><span class="item_popup_requirement_text" style="align:left;">'+TWPro.lang.QUANTITIES+'</span><hr>';
		twpro_xhtml += '<table width="100%">';
		var twpro_all = 0;
		var twpro_all_diff = 0;
		for (var twpro_type in item_type_title){
		  if (twpro_type != "yield"){
			twpro_xhtml += '<tr><td class="item_popup_trader_price">'+item_type_title[twpro_type]+':&nbsp;&nbsp;</td>';
			twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_countType[twpro_type] + '</td>';
			twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + TWPro.twpro_bag.twpro_countType_diff[twpro_type] + ']</td></tr>';
			twpro_all += TWPro.twpro_bag.twpro_countType[twpro_type];
			twpro_all_diff += TWPro.twpro_bag.twpro_countType_diff[twpro_type];
		  }
		}
		twpro_xhtml += '<tr><td></td><td><hr></td><td><hr></td></tr><tr><td class="item_popup_trader_price">'+TWPro.lang.OBJECTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + twpro_all + '<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + twpro_all_diff + ']<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.PRODUCTS+':&nbsp;&nbsp;<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + TWPro.twpro_bag.twpro_countType['yield'] + '<hr></td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + TWPro.twpro_bag.twpro_countType_diff['yield'] + ']<hr></td></tr>';
		twpro_xhtml += '<tr><td class="item_popup_trader_price">'+TWPro.lang.TOTAL+':&nbsp;&nbsp;</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;">' + parseInt(twpro_all + TWPro.twpro_bag.twpro_countType['yield']) + '</td>';
		twpro_xhtml += '<td class="item_popup_trader_price" style="text-align:right;font-weight:normal;">[' + parseInt(twpro_all_diff + TWPro.twpro_bag.twpro_countType_diff['yield']) + ']</td></tr>';
		twpro_xhtml += '</table>';
		twpro_xhtml += '</div>';
		return twpro_xhtml;
	}

	// wird beim draufklicken auf die Liste ausgefuehrt, stoesst Berechnungen an
	function twpro_clickList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text != TWPro.lang.CALCJOB && document.getElementById('twpro_wait').text != TWPro.lang.CHOOSEJOB) {
			document.getElementById('twpro_wait').text = TWPro.lang.CALCJOB;
			window.setTimeout(TWPro.twpro_updateList, 0);
		}
	}
	function twpro_clickfilterList() {
		if (TWPro.twpro_failure) return;
		if (document.getElementById('twpro_wait').text == TWPro.lang.CHOOSEJOB) {
  //		document.getElementById('twpro_wait').text = TWPro.lang.LOADING;
		  var twpro_wait = document.getElementById('twpro_wait');
		  document.getElementById('twpro_jobList').style.backgroundColor = 'rgb(207, 195, 166)';
		  document.getElementById('twpro_jobList').innerHTML = '<option style="background-color: rgb(207, 195, 166);" id="twpro_wait" value="-1">'+twpro_wait.text+'</option>';
		  //twpro_clickList();
		  twpro_insertListItems();
		}
	}
	

	// stellt alle Jobs zusammen und fuegt einzelne Listenelemente ein
	// Liste wird erst mit function twpro_insertListItems gebaut
	function twpro_updateList() {
		if (TWPro.twpro_failure) return;
		if (!TWPro.twpro_calculated) {
			var twpro_jobCount = 0;
			for (var twpro_job in JobList) {
				TWPro.twpro_jobs[parseInt(twpro_job)] = JobList[twpro_job];
				TWPro.twpro_jobs[parseInt(twpro_job)].twpro_calculation = TWPro.twpro_jobs[parseInt(twpro_job)].formular.replace(/skills\./g, 'Character.skills.');
				twpro_jobCount++;
			}
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '3 * Character.skills.build + 1 * Character.skills.repair + 1 * Character.skills.leadership',
				'malus': 0,
				'name': TWPro.lang.CONSTRUCTION,
				'shortName': 'construct'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.HEALTH,
				'shortName': 'lifepoints'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.appearance + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGATT,
				'shortName': 'duelshootingatt'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 1 * Character.skills.tactic + 1 * Character.skills.shot',
				'malus': -1,
				'name': TWPro.lang.DUELSHOOTINGDEF,
				'shortName': 'duelshootingdef'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.reflex + 1 * Character.skills.tough + 1 * Character.skills.punch',
				'malus': -1,
				'name': TWPro.lang.DUELVIGOR,
				'shortName': 'duelvigor'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.endurance + 1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.FORTATTACK,
				'shortName': 'fortatt'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.aim + 1 * Character.skills.dodge + 2 * Character.skills.leadership + 2 * Character.skills.hide + 1 * Character.skills.health',
				'malus': -1,
				'name': TWPro.lang.FORTDEFEND,
				'shortName': 'fortdef'
			};
			twpro_jobCount++;
			TWPro.twpro_jobs[TWPro.twpro_jobs.length] = {
				'twpro_calculation': '1 * Character.skills.ride ',
				'malus': -1,
				'name': TWPro.lang.SKILLRIDE,
				'shortName': 'ride'
			};
			twpro_jobCount++;
			TWPro.twpro_sortJobs();
			while (TWPro.twpro_jobs.length > twpro_jobCount) {
				TWPro.twpro_jobs.pop();
			}
		}
		TWPro.twpro_calculateJobs();
		TWPro.twpro_sortJobs();
		TWPro.twpro_insertListItems();
		document.getElementById('twpro_wait').text = TWPro.lang.CHOOSEJOB;
	}

	function twpro_insertListItems() {
		if (TWPro.twpro_failure) return;
		
		var twpro_jobList = document.getElementById('twpro_jobList'),
			jobsort = TWPro.twpro_jobsort,
			twpro_jobElement, twpro_apstmp, extra;

			var moneyFactor = 1 + (PremiumBoni.hasBonus('money')?.50:0), multiplier;
//		jobRank = {};
			
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			twpro_apstmp = TWPro.twpro_jobs[twpro_i].twpro_aps;
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			var twpro_aktuelleap = twpro_job.twpro_skill - twpro_job.malus;
			var twpro_setCounter = new Object();
			for(var twpro_wear in Wear.wear){
				if(Wear.wear[twpro_wear].obj.twpro_bonus){
				  twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
				}
				if(Wear.wear[twpro_wear].obj.set != null){
				  if(twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]==undefined){
					twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
				  }
				  else {
					twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
				  }
				}
			}
			for(var twpro_set in twpro_setCounter){
				if(twpro_setCounter[twpro_set]>=2){
					twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
				}
			}
			twpro_jobElement = document.createElement('option');
			
				var n = 1;
					
				if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
					n = PremiumBoni.hasBonus('character') ? 1.10 : 1.05;
				twpro_aktuelleap = Math.floor(n*twpro_aktuelleap);
				twpro_job.twpro_aps = twpro_apstmp = Math.floor(n*twpro_apstmp);
				}
				multiplier = Math.pow(Math.max(1,twpro_apstmp),.2) * moneyFactor;
				TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin = Math.floor(5 * (.9 * TWPro.twpro_jobValues[twpro_job.shortName].glueck + 5) * multiplier);
				TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax = Math.floor(15 * (.9 * TWPro.twpro_jobValues[twpro_job.shortName].glueck + 5) * multiplier);
				TWPro.twpro_jobValues[twpro_job.shortName].wages = Math.round((.9 * TWPro.twpro_jobValues[twpro_job.shortName].lohn + 5) * multiplier  * 2);
				TWPro.twpro_jobValues[twpro_job.shortName].danger = Math.round((8*Math.pow(TWPro.twpro_jobValues[twpro_job.shortName].gefahr,1.35)) / (Math.max(1,twpro_apstmp)+3));
				
				TWPro.twpro_jobValues[twpro_job.shortName].jobrank = TWPro.multipliers.xp * TWPro.twpro_jobValues[twpro_job.shortName].erfahrung + 
												(TWPro.multipliers.wages * TWPro.twpro_jobValues[twpro_job.shortName].lohn + 
												TWPro.multipliers.luck * TWPro.twpro_jobValues[twpro_job.shortName].glueck ) * pow(Math.max(1,twpro_apstmp),0.2) + TWPro.multipliers.danger * (100 - (TWPro.twpro_jobValues[twpro_job.shortName].gefahr/((Math.max(1,twpro_apstmp)+3)/8)));
			
				TWPro.twpro_jobValues[twpro_job.shortName].experience = Math.floor(TWPro.twpro_jobValues[twpro_job.shortName].erfahrung*2*n);
	
			if ( jobsort == 'erfahrung' ) {
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].experience + ' xp';
			}
			else if ( jobsort ==  'lohn' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].wages + ' $';
			}
			else if ( jobsort ==  'glueck' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemin + ' - ' + TWPro.twpro_jobValues[twpro_job.shortName].luckvaluemax + ' $';
			}
			else if ( jobsort ==  'gefahr' ) { 
				extra = ' ' + TWPro.twpro_jobValues[twpro_job.shortName].danger + ' /!\\';
			}
			else if ( jobsort ==  'comb' ) {
				disp_jobrank =  Math.round(TWPro.twpro_jobValues[twpro_job.shortName].jobrank/(TWPro.multipliers.xp+TWPro.multipliers.wages+TWPro.multipliers.luck+TWPro.multipliers.danger))
				extra = ' ' + disp_jobrank + '%';
			}
			else {
				extra = '';
			}
			TWPro.twpro_jobValues[twpro_job.shortName].twpro_apstmp = twpro_apstmp;
			twpro_jobElement.value = twpro_i;
			twpro_strreplace = TWPro.twpro_jobs[twpro_i].name.replace(/&#039;/g,"\'");
			twpro_jobElement.appendChild(document.createTextNode(((twpro_strreplace.length > 25) ? (unescape(twpro_strreplace.substr(0, 23)) + '...') : unescape(twpro_strreplace)) + ' (' + eval(twpro_apstmp - 1) + ' / '+ eval(twpro_aktuelleap - 1) + ' '+TWPro.lang.LABORP+')'+extra));
			if (twpro_apstmp > 0) {
				if (twpro_aktuelleap <= 0) {
					twpro_jobElement.style.backgroundColor='rgb(230, 235, 108)'; // yellow
				}
				else {
					twpro_jobElement.style.backgroundColor = 'rgb(160, 218, 120)'; // green
				}
				twpro_jobList.appendChild(twpro_jobElement);
			}
			else if (!TWPro.twpro_preference('Hide_unjobs')) {
				twpro_jobElement.style.backgroundColor = 'rgb(232, 150, 120)'; // red
				twpro_jobList.appendChild(twpro_jobElement);
			}
		}
	}

	// bestimmt Sortierreihenfolge der Jobs in der Liste
	function twpro_sortJobs(){
		if (TWPro.twpro_failure) return;
		var sortby = TWPro.twpro_jobsort, twpro_jobValues = TWPro.twpro_jobValues;
		var sortfunc = function(twpro_a, twpro_b){
			var twpro_a_str = twpro_a.name,
				twpro_b_str = twpro_b.name;
			if(sortby == 'name'){
				return twpro_a_str.localeCompare(twpro_b_str);
			}
			if(sortby == 'comb'){
				return (twpro_jobValues[twpro_a.shortName].jobrank == twpro_jobValues[twpro_b.shortName].jobrank) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].jobrank - twpro_jobValues[twpro_a.shortName].jobrank);
			}
			if(sortby == 'erfahrung'){
				return (twpro_jobValues[twpro_a.shortName].experience == twpro_jobValues[twpro_b.shortName].experience) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].experience - twpro_jobValues[twpro_a.shortName].experience);
			} if(sortby == 'lohn'){
				return (twpro_jobValues[twpro_a.shortName].wages == twpro_jobValues[twpro_b.shortName].wages) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].wages - twpro_jobValues[twpro_a.shortName].wages);
			} if(sortby == 'glueck'){
				return (twpro_jobValues[twpro_a.shortName].luckvaluemax == twpro_jobValues[twpro_b.shortName].luckvaluemax) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName].luckvaluemax - twpro_jobValues[twpro_a.shortName].luckvaluemax);
			} if(sortby == 'gefahr'){
				return (twpro_jobValues[twpro_a.shortName].danger == twpro_jobValues[twpro_b.shortName].danger) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_a.shortName].danger - twpro_jobValues[twpro_b.shortName].danger);
			}  else {
				return (twpro_jobValues[twpro_a.shortName][sortby] == twpro_jobValues[twpro_b.shortName][sortby]) ? twpro_a_str.localeCompare(twpro_b_str) : (twpro_jobValues[twpro_b.shortName][sortby] - twpro_jobValues[twpro_a.shortName][sortby]);
			}
		}
		TWPro.twpro_jobs.sort(sortfunc);
		//if(sortby == 'danger') TWPro.twpro_jobs.reverse();
	}

	function twpro_sortPlus(twpro_a, twpro_b) {
		if (TWPro.twpro_failure) return 0;
		var twpro_a_num = parseInt(twpro_a.substring(0, twpro_a.search(/ /)));
		var twpro_b_num = parseInt(twpro_b.substring(0, twpro_b.search(/ /)));
		return twpro_b_num - twpro_a_num;
	}

	function twpro_initializeItems(twpro_place, twpro_itemlist) {
		if (TWPro.twpro_failure) return;
		var twpro_i = 0;
		if (twpro_place == 'wear') {
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].obj.twpro_place = twpro_place;
				Wear.wear[twpro_wear].obj.twpro_html = document.getElementById('char_' + Wear.wear[twpro_wear].obj.type);
				TWPro.twpro_bag.twpro_priceWear += Wear.wear[twpro_wear].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[Wear.wear[twpro_wear].obj.type]++;
				TWPro.twpro_bag.twpro_countType_diff[Wear.wear[twpro_wear].obj.type]++;
				TWPro.twpro_wear_items_list += ';'+Wear.wear[twpro_wear].obj.item_id+';';
				if (Wear.wear[twpro_wear].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += Wear.wear[twpro_wear].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += Wear.wear[twpro_wear].obj.sell_price;
				}
				if ((Wear.wear[twpro_wear].obj.set != null) && !TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id]) {
					TWPro.twpro_setItems[Wear.wear[twpro_wear].obj.item_id] = Wear.wear[twpro_wear].obj;
					TWPro.twpro_setItemsCount[Wear.wear[twpro_wear].obj.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id]) {
					TWPro.twpro_invHashTest[Wear.wear[twpro_wear].obj.item_id] = 1;
				}
			}
		}
		if (twpro_place == 'bag') {
			var twpro_itemcount;
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].obj.twpro_place = twpro_place;
				bagitems[twpro_bag].obj.twpro_html = bagitems[twpro_bag].bag_item;
				if (bagitems[twpro_bag].count_text) {
					twpro_itemcount = parseInt(bagitems[twpro_bag].count_text.firstChild.data);
				}
				else {
					twpro_itemcount = 1;
				}
				TWPro.twpro_bag.twpro_priceBag += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				TWPro.twpro_bag.twpro_countType[bagitems[twpro_bag].obj.type] += twpro_itemcount;
				if (TWPro.twpro_wear_items_list.indexOf(';'+bagitems[twpro_bag].obj.item_id+';') == -1) {
				  TWPro.twpro_bag.twpro_countType_diff[bagitems[twpro_bag].obj.type]++;
				}
				if (bagitems[twpro_bag].obj.type == 'yield') {
					TWPro.twpro_bag.twpro_priceYields += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				else {
					TWPro.twpro_bag.twpro_priceItems += twpro_itemcount * bagitems[twpro_bag].obj.sell_price;
				}
				if ((bagitems[twpro_bag].obj.set != null) && !TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id]) {
					TWPro.twpro_setItems[bagitems[twpro_bag].obj.item_id] = bagitems[twpro_bag].obj;
					TWPro.twpro_setItemsCount[bagitems[twpro_bag].obj.set.key]++;
				}
				if (!TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id]) {
					TWPro.twpro_invHashTest[bagitems[twpro_bag].obj.item_id] = 1;
				}
			}
		}
		else if (twpro_place == 'trader') {
			for (var twpro_obj in twpro_itemlist.items) {
				twpro_itemlist.items[twpro_obj].obj.twpro_place = twpro_place;
				twpro_itemlist.items[twpro_obj].obj.twpro_html = twpro_itemlist.items[twpro_obj].bag_item;
				twpro_itemlist.items[twpro_obj].popup.refresh();
				twpro_i++;
			}
		}
		else if (twpro_place == 'own') {
			for (var twpro_obj in twpro_itemlist.data) {
				twpro_itemlist.data[twpro_obj].twpro_place = twpro_place;
				twpro_i++;
			}
			for (var twpro_bag in twpro_itemlist.bags) {
				for (var twpro_obj in twpro_itemlist.bags[twpro_bag].items) {
					twpro_itemlist.bags[twpro_bag].items[twpro_obj].obj.twpro_html = twpro_itemlist.bags[twpro_bag].items[twpro_obj].bag_item;
				}
			}
		}
	}

	// ermittelt die optimalen Kleidungsstuecke und errechnet die resultierenden Arbeitspunkte
	function twpro_calculateJobs() {
		if (TWPro.twpro_failure) return;
		var twpro_setitembonus;
		var twpro_setitemjobname;
		for (var twpro_wear in Wear.wear) {
			TWPro.twpro_prepareItem(Wear.wear[twpro_wear].obj);
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			TWPro.twpro_prepareItem(bagitems[twpro_bag].obj);
		}
		TWPro.twpro_calculated = false;
		
		// alle Setberechnungen löschen
		TWPro.twpro_setItemsCalc = {};
		TWPro.twpro_setItemsEffect = false;
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_setItemsCalc[TWPro.twpro_bag.twpro_types[twpro_i]] = [null];
		}
		
		// Check ob Berechnung nötig und Flags setzen --> für 1er Sets müsste hier von >=2 auf >=1 geändert werden
		TWPro.twpro_setCount = {};
		for (var twpro_setItemId in TWPro.twpro_setItems) {
			var twpro_setItem = TWPro.twpro_setItems[twpro_setItemId];
			if (twpro_setItem.twpro_wearable && TWPro.twpro_setItemsCount[twpro_setItem.set.key] >= 2) {
				TWPro.twpro_setItemsCalc[twpro_setItem.type].push(twpro_setItem);
				TWPro.twpro_setCount[twpro_setItem.set.key] = 0;
				TWPro.twpro_setItemsEffect = true;
			}

		}
		if(!TWPro.twpro_re_att){
			TWPro.twpro_re_att = {};
			TWPro.twpro_re_skill = {};
			TWPro.twpro_re_skills = {};
			for(var twpro_attname in Character.skill_names){
				var skill_names = Character.skill_names[twpro_attname];
				TWPro.twpro_re_skills[twpro_attname] = new RegExp(skill_names.join('|'), 'g');
				TWPro.twpro_re_att[twpro_attname] = new RegExp(twpro_attname, 'g');
				for(var i=0; i<skill_names.length; i++){
					TWPro.twpro_re_skill[skill_names[i]] = new RegExp(skill_names[i], 'g');
				}
			}
		}
		var re_char_skills = /Character\.skills\./g;
		for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {
			var twpro_job = TWPro.twpro_jobs[twpro_i];
			twpro_job.twpro_jobid = twpro_i;
			twpro_job.twpro_skill = eval(twpro_job.twpro_calculation);
			twpro_job.twpro_skills = twpro_job.twpro_calculation.replace(/ \+ \d+$/, '').replace(re_char_skills, '');
			twpro_job.twpro_attributes = twpro_job.twpro_skills.replace(re_char_skills, '');
			for (var twpro_attname in Character.skill_names) {
				twpro_job.twpro_attributes = twpro_job.twpro_attributes.replace(TWPro.twpro_re_skills[twpro_attname], twpro_attname);
			}
			
			// Hier folgt Setberechnung, wenn oben Flag gesetzt wurde
			if (TWPro.twpro_setItemsEffect && !TWPro.twpro_setBonusParsed) {
				for (var twpro_itemSet in TWPro.twpro_setBonus) {
					var twpro_itemSetBouns = TWPro.twpro_setBonus[twpro_itemSet];
					// Berechnung ab hier auch für twpro_j=1 (war vorher 2) um auch 1er Sets zu berücksichtigen)
					for (var twpro_j = 2; twpro_j < twpro_itemSetBouns.length; twpro_j++) {
						twpro_setitembonus = twpro_itemSetBouns[twpro_j];
						twpro_setitemjobname = twpro_job.shortName;
						twpro_setitembonus.parsedBonus[twpro_setitemjobname] = (twpro_job.malus == -1 ? 0 : twpro_setitembonus.jobBonus.all) +
						(!twpro_setitembonus.jobBonus[twpro_setitemjobname] ? 0 : twpro_setitembonus.jobBonus[twpro_setitemjobname]) + TWPro.twpro_testItem(twpro_job, twpro_setitembonus);
					}
				}
			}
			twpro_job.twpro_bestStats = {};
			for (var twpro_j = 0; twpro_j < TWPro.twpro_bag.twpro_types.length; twpro_j++) {
				twpro_job.twpro_bestStats[TWPro.twpro_bag.twpro_types[twpro_j]] = 0;
			}
			for (var twpro_wear in Wear.wear) {
				TWPro.twpro_compareItem(twpro_job, Wear.wear[twpro_wear].obj);
			}
			for (var twpro_bag in bagitems) {
				TWPro.twpro_compareItem(twpro_job, bagitems[twpro_bag].obj);
			}
			twpro_job.twpro_aps = twpro_job.twpro_skill - Math.max(0, twpro_job.malus);
			for (var twpro_type in twpro_job.twpro_bestStats) {
				twpro_job.twpro_aps += twpro_job.twpro_bestStats[twpro_type];
			}
			if (TWPro.twpro_setItemsEffect) {
				var twpro_setItem;
				twpro_job.twpro_parsedItemBonus = {};
				twpro_job.twpro_bestCombi = {};
				for (var twpro_type in twpro_job.twpro_bestStats) {
					twpro_job.twpro_bestCombi[twpro_type] = 0;
					for (var twpro_j = 1; twpro_j < TWPro.twpro_setItemsCalc[twpro_type].length; twpro_j++) {
						twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_j];
						twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id] = TWPro.twpro_testItem(twpro_job, twpro_setItem);
					}
				}
				twpro_job.twpro_noSetAps = twpro_job.twpro_aps;
			}
		}
		if (TWPro.twpro_setItemsEffect) {
			TWPro.twpro_calcSets();
		}
		for(var i=0; i<TWPro.twpro_jobs.length; i++){
			var twpro_job = TWPro.twpro_jobs[i],
				n = 1;
			if(Character.characterClass == 'worker' && twpro_job.shortName == 'construct'){
				n = 1.05;
			}
	TWPro.twpro_jobValues[twpro_job.shortName].laborp = twpro_job.twpro_aps = Math.floor(n*twpro_job.twpro_aps);
	
		}
		TWPro.twpro_setBonusParsed = true;
		TWPro.twpro_invHash = TWPro.twpro_invHashTest.join(',');
		TWPro.twpro_calculated = true;
	}

	function twpro_calcSets() {
		var twpro_testCombi = {};
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			twpro_testCombi[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		var twpro_setCounter = TWPro.twpro_setCount;
		TWPro.twpro_testnextvalid = [];
		var twpro_testnextvalid = TWPro.twpro_testnextvalid;
		TWPro.twpro_testnextnamen = {};
		var twpro_testnextnamen = TWPro.twpro_testnextnamen;
		for (var twpro_set in twpro_setCounter) {
			twpro_testnextnamen[twpro_set] = twpro_testnextvalid.push(0) - 1;
		}
		var twpro_next = false;
		var twpro_set;
		do {
			for (var twpro_i=0; twpro_i<TWPro.twpro_jobs.length; twpro_i++) {		//twpro_i   = Job counter
				var twpro_job = TWPro.twpro_jobs[twpro_i];							//twpro_job = aktueller Job (twpro_i) der geparst wird
				var twpro_testAps = twpro_job.twpro_noSetAps;						//AP aus Job vor Setberechnung holen
				for (var twpro_type in twpro_testCombi) {
					if (twpro_testCombi[twpro_type] != 0) {
						twpro_testAps -= twpro_job.twpro_bestStats[twpro_type];
						var twpro_setItem = TWPro.twpro_setItemsCalc[twpro_type][twpro_testCombi[twpro_type]];
						twpro_testAps += twpro_job.twpro_parsedItemBonus[twpro_setItem.item_id];
					}
				}
				for (var twpro_set in twpro_setCounter) {
					if (twpro_setCounter[twpro_set] > 0) {																					//bei allen Sets, die mindestens 1 Item enthalten
						twpro_testAps += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];		//testwert um bonus für aktuelle Arbeit bei Set (Anzahl Items) erhöhen
					}
				}
				if (twpro_testAps > twpro_job.twpro_aps) {
					twpro_job.twpro_aps = twpro_testAps;
					for (var twpro_type in twpro_testCombi) {
						twpro_job.twpro_bestCombi[twpro_type] = twpro_testCombi[twpro_type];
					}
				}
			}
			do {
				//TWPro.anzahl3++;
				twpro_next = false;
				for (var twpro_type in twpro_testCombi) {
					var twpro_setItemsCalcType = TWPro.twpro_setItemsCalc[twpro_type];
					var twpro_testCombiType = twpro_testCombi[twpro_type];
					if (twpro_testCombiType != 0) {
						twpro_set = twpro_setItemsCalcType[twpro_testCombiType].set.key;
						if ((--twpro_setCounter[twpro_set]) == 1) {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
						}
						else {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
						}
					}
					if ((twpro_testCombiType + 1) < twpro_setItemsCalcType.length) {
						twpro_set = twpro_setItemsCalcType[++twpro_testCombi[twpro_type]].set.key;
						if ((++twpro_setCounter[twpro_set]) == 1) {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 1;
						}
						else {
							twpro_testnextvalid[twpro_testnextnamen[twpro_set]] = 0;
						}
						twpro_next = true;
						break;
					}
					else {
						twpro_testCombi[twpro_type] = 0;
					}
				}
			}
			while ((parseInt(twpro_testnextvalid.join(''), 10) > 0) && twpro_next);
		}
		while (twpro_next);
	}

	function twpro_prepareItem(twpro_item) {
		if (TWPro.twpro_failure) return;
		var twpro_storedItem;
		if (!TWPro.twpro_itemStorage[twpro_item.item_id]) {
			TWPro.twpro_itemStorage[twpro_item.item_id] = {};
			twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
		}
		else {
			twpro_storedItem = TWPro.twpro_itemStorage[twpro_item.item_id];
			if ((twpro_item.twpro_bonus = twpro_storedItem.twpro_bonus)) {
				twpro_item.twpro_jobbonus = {};
			}
			twpro_item.twpro_wearable = twpro_storedItem.twpro_wearable;
			return;
		}
		var twpro_i = 0;
		if (twpro_item.bonus.skills.length == undefined) {
			for (var twpro_skillname in twpro_item.bonus.skills) {
				twpro_i++;
			}
		}
		if (twpro_item.bonus.attributes.length == undefined) {
			for (var twpro_attname in twpro_item.bonus.attributes) {
				twpro_i++;
			}
		}
		if (twpro_i > 0) {
			twpro_item.twpro_bonus = true;
			twpro_item.twpro_jobbonus = {};
			twpro_storedItem.twpro_jobbonus = {};
		}
		else {
			twpro_item.twpro_bonus = false;
		}
		twpro_item.twpro_wearable = TWPro.twpro_wearItem(twpro_item);
		twpro_storedItem.twpro_bonus = twpro_item.twpro_bonus;
		twpro_storedItem.twpro_wearable = twpro_item.twpro_wearable;
	}

	function twpro_wearItem(twpro_item) {
		if (TWPro.twpro_failure) return false;
		if ((twpro_item.characterClass != null) && (twpro_item.characterClass != Character.characterClass)) {
			return false;
		}
		if (twpro_item.type == "belt" || twpro_item.type == "pants"){
		if ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease['all']) > Character.level)) {
			return false;
		}
		}
		else{
		if ((twpro_item.level != null) && ((twpro_item.level - Character.itemLevelRequirementDecrease[twpro_item.type] - Character.itemLevelRequirementDecrease['all']) > Character.level)) {
			return false;
		}
		}
		if ((twpro_item.characterSex != null) && ((twpro_item.characterSex != Character.characterSex) || (Character.characterClass == 'greenhorn'))) {
			return false;
		}
		return true;
	}

	function twpro_compareItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return;
		var twpro_aktplus = TWPro.twpro_testItem(twpro_job, twpro_item);
		if (twpro_item.twpro_bonus) {
			twpro_item.twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
			TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] = twpro_aktplus;
		}
		if (twpro_aktplus >= twpro_job.twpro_bestStats[twpro_item.type] && twpro_item.twpro_wearable) {
			twpro_job.twpro_bestStats[twpro_item.type] = twpro_aktplus;
		}
	}
	function twpro_testItem(twpro_job, twpro_item) {
		if (TWPro.twpro_failure) return 0;
		if (!twpro_item.twpro_bonus && !twpro_item.jobBonus) {
			return 0;
		}
		if (TWPro.twpro_itemStorage[twpro_item.item_id]) {
			if (TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName] != undefined) {
				return TWPro.twpro_itemStorage[twpro_item.item_id].twpro_jobbonus[twpro_job.shortName];
			}
		}
		var twpro_aktskills = twpro_job.twpro_skills;
		var twpro_aktattributes = twpro_job.twpro_attributes;
		if(twpro_item.bonus.skills.length !== 0){
			for (var twpro_skillname in twpro_item.bonus.skills) {
				twpro_aktskills = twpro_aktskills.replace(TWPro.twpro_re_skill[twpro_skillname], twpro_item.bonus.skills[twpro_skillname]);
			}
		}
		//if(twpro_item.bonus.attributes instanceof Array){
			for (var twpro_attname in twpro_item.bonus.attributes) {
				if(!TWPro.twpro_re_att[twpro_attname]) continue;
				twpro_aktattributes = twpro_aktattributes.replace(TWPro.twpro_re_att[twpro_attname], twpro_item.bonus.attributes[twpro_attname]);
			}
		//}
		return eval((twpro_aktskills+'+'+twpro_aktattributes).replace(/[a-z_]+/gi, '0'));
	}

	function twpro_changeItem(change) {

		if (TWPro.twpro_failure) return;
		TWPro.twpro_bag.twpro_priceWear = 0;
		TWPro.twpro_bag.twpro_priceBag = 0;
		TWPro.twpro_bag.twpro_priceItems = 0;
		TWPro.twpro_bag.twpro_priceYields = 0;
		TWPro.twpro_setItems = {};
		for (var twpro_set in TWPro.twpro_setBonus) {
			TWPro.twpro_setItemsCount[twpro_set] = 0;
		}
		for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
			TWPro.twpro_bag.twpro_countType[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
			TWPro.twpro_bag.twpro_countType_diff[TWPro.twpro_bag.twpro_types[twpro_i]] = 0;
		}
		//TWPro.twpro_invHash = [];
		TWPro.twpro_initializeItems('wear', null);
		TWPro.twpro_initializeItems('bag', null);
		TWPro.twpro_bag.twpro_bagPopup.twpro_refresh();
		if(change && change.inv_id && TWPro.searchInventory.cache){
			if(change.deleted) delete TWPro.searchInventory.cache[change.inv_id];
			else TWPro.twpro_searchInventory(true, change.inv_id);
		}
		if (document.getElementById('twpro_jobList').selectedIndex != 0) { // avoid full bag reload when using set filters
		  TWPro.twpro_changeJob();
		}
		}

	function twpro_changeJob() {
		if (TWPro.twpro_failure) return;
		if (TWPro.twpro_calculated) {

			$('window_inventory_title').innerHTML = AjaxWindow.possibleValues.inventory+'<label style="position:absolute;left:0px;top:0px;width:100%; text-align:center;"><label id="twpro_aktuelleapvalue" style="align:right;position:absolute;right:80px;top:-4px;border-style:solid;border-width:1px;padding:2px;font-size:13px;color:#000000;visibility:hidden;"></label></label>';

			var twpro_jobList = document.getElementById('twpro_jobList');
			var twpro_selected = twpro_jobList.selectedIndex;
			twpro_jobList.style.backgroundColor = twpro_jobList[twpro_selected].style.backgroundColor;
			var twpro_selectedJob = parseInt(twpro_jobList[twpro_selected].value);
			for (var twpro_i = 0; twpro_i < TWPro.twpro_bag.twpro_types.length; twpro_i++) {
				if (document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i])) {
					document.getElementById('char_' + TWPro.twpro_bag.twpro_types[twpro_i]).className = 'wear_' + TWPro.twpro_bag.twpro_types[twpro_i];
				}
			}
			for (var twpro_wear in Wear.wear) {
				Wear.wear[twpro_wear].popup.refresh();
			}
			var bagitems = Bag.getInstance().items;
			for (var twpro_bag in bagitems) {
				bagitems[twpro_bag].popup.refresh();
				bagitems[twpro_bag].obj.twpro_html.firstChild.className = '';
			}
			if (twpro_selectedJob >= 0) {
				var twpro_job = TWPro.twpro_jobs[twpro_selectedJob];
				TWPro.twpro_highlight(twpro_job);
				var twpro_aktuelleap = twpro_job.twpro_skill - Math.max(0, twpro_job.malus);
				var twpro_setCounter = {};
				for (var twpro_wear in Wear.wear) {
					if (Wear.wear[twpro_wear].obj.twpro_bonus) {
						twpro_aktuelleap += Wear.wear[twpro_wear].obj.twpro_jobbonus[twpro_job.shortName];
					}
					if (Wear.wear[twpro_wear].obj.set != null) {
						if (twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] == undefined) {
							twpro_setCounter[Wear.wear[twpro_wear].obj.set.key] = 1;
						}
						else {
							twpro_setCounter[Wear.wear[twpro_wear].obj.set.key]++;
						}
					}
				}
				for (var twpro_set in twpro_setCounter) {
					if (twpro_setCounter[twpro_set] >= 2) {
						twpro_aktuelleap += TWPro.twpro_setBonus[twpro_set][twpro_setCounter[twpro_set]].parsedBonus[twpro_job.shortName];
					}
				}

				document.getElementById('twpro_aktuelleapvalue').innerHTML = eval(twpro_job.twpro_aps -1) + ' / '+ eval(twpro_aktuelleap - 1) + ' ' +TWPro.lang.LABORP;
				if (twpro_aktuelleap > 0) {
					if (twpro_aktuelleap >= twpro_job.twpro_aps) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(118, 195, 237)'; // blue
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(160, 218, 120)'; // green
					}
				}
				else {
					if (twpro_job.twpro_aps > 0) {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(230, 235, 108)'; // yellow
					}
					else {
						document.getElementById('twpro_aktuelleapvalue').style.backgroundColor = 'rgb(232, 150, 120)'; // red
					}
				}
	//			document.getElementById('twpro_aktuelleap').style.visibility = 'visible';
				document.getElementById('twpro_aktuelleapvalue').style.visibility = 'visible';
			}
			else {
		//		document.getElementById('twpro_aktuelleap').style.visibility = 'hidden';
				document.getElementById('twpro_aktuelleapvalue').style.visibility = 'hidden';
			}
			TWPro.twpro_bagVis();
		}
	}

	function twpro_highlight(twpro_job) {
		if (TWPro.twpro_failure) return;
		for (var twpro_wear in Wear.wear) {
			var twpro_item = Wear.wear[twpro_wear].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
				}
			}
			else { if ((twpro_item.twpro_wearable) && ((twpro_item.type == 'animal') || ((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])))) {
					twpro_item.twpro_html.className = twpro_item.twpro_html.className + ' wear_' + twpro_item.type + '_highlight';
				}
			}
		}
		var bagitems = Bag.getInstance().items;
		for (var twpro_bag in bagitems) {
			var twpro_item = bagitems[twpro_bag].obj;
			if (TWPro.twpro_setItemsEffect && (twpro_job.twpro_bestCombi[twpro_item.type] > 0)) {
				if (TWPro.twpro_setItemsCalc[twpro_item.type][twpro_job.twpro_bestCombi[twpro_item.type]].item_id == twpro_item.item_id) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
				}
			}
			else { if ((twpro_item.twpro_wearable) && ((twpro_item.type != 'animal') && ((((twpro_item.type == 'yield') || (twpro_item.type == 'right_arm')) && (twpro_item.twpro_bonus == true) && (twpro_job.twpro_bestStats[twpro_item.type] > 0) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type])) || ((twpro_item.type != 'yield') && (twpro_item.type != 'right_arm') && (((twpro_item.twpro_bonus == false) && (twpro_job.twpro_bestStats[twpro_item.type] == 0)) || ((twpro_item.twpro_bonus == true) && (twpro_item.twpro_jobbonus[twpro_job.shortName] >= twpro_job.twpro_bestStats[twpro_item.type]))))))) {
					twpro_item.twpro_html.firstChild.className = 'wear_yield_highlight';
}
			}
		}
	}
	if(typeof window.TWPro == 'undefined'){try{
		window.TWPro = {};
		TWPro.lang = twpro_lang;
		TWPro.twpro_injectScript = twpro_injectScript;
		TWPro.twpro_preference = twpro_preference;
		TWPro.twpro_throwFailure = twpro_throwFailure;
		TWPro.twpro_injectionSwitch = twpro_injectionSwitch;
		TWPro.twpro_reportAccess = twpro_reportAccess;
		TWPro.twpro_getAuthor = twpro_getAuthor;
		TWPro.twpro_activeJob = twpro_activeJob;
		TWPro.twpro_getPlace = twpro_getPlace;
		TWPro.twpro_popup = twpro_popup;
		TWPro.twpro_insertList = twpro_insertList;
		TWPro.twpro_handleJobrank = twpro_handleJobrank;
		TWPro.twpro_searchInventory = twpro_searchInventory;
		TWPro.twpro_bagVis = twpro_bagVis;
		TWPro.twpro_sortList = twpro_sortList;
		TWPro.twpro_show_set = twpro_show_set;
		TWPro.twpro_jobSortMark = twpro_jobSortMark;
		TWPro.twpro_showList = twpro_showList;
		TWPro.twpro_getBagPopup = twpro_getBagPopup;
		TWPro.twpro_clickList = twpro_clickList;
		TWPro.twpro_clickfilterList = twpro_clickfilterList;
		TWPro.twpro_updateList = twpro_updateList;
		TWPro.twpro_insertListItems = twpro_insertListItems;
		TWPro.twpro_sortJobs = twpro_sortJobs;
		TWPro.twpro_sortPlus = twpro_sortPlus;
		TWPro.twpro_initializeItems = twpro_initializeItems;
		TWPro.twpro_calculateJobs = twpro_calculateJobs;
		TWPro.twpro_calcSets = twpro_calcSets;
		TWPro.twpro_prepareItem = twpro_prepareItem;
		TWPro.twpro_wearItem = twpro_wearItem;
		TWPro.twpro_compareItem = twpro_compareItem;
		TWPro.twpro_testItem = twpro_testItem;
		TWPro.twpro_changeItem = twpro_changeItem;
		TWPro.twpro_changeJob = twpro_changeJob;
		TWPro.twpro_highlight = twpro_highlight;
		TWPro.makefortlist = makefortlist;
		TWPro.makefortmessage = makefortmessage;
		//TWPro.twpro_injectScript();
		window.addEvent('domready', TWPro.twpro_injectScript);
		}catch(e){alert(e)}
	}
	// export other stuff, not related to TW Pro item stuff


	window.insertBBcode = insertBBcode;
	(function(){
		try{
			
			window.convertduelreport = convertduelreport;
			window.convertduelreportfunc = convertduelreportfunc;
			window.makefortmessage = makefortmessage;
			window.makefortlist = makefortlist;
			window.makeadvicemessage = makeadvicemessage;
			window.makeadvicelist = makeadvicelist;
			
			(Reports.show = eval('('+Reports.show.toString()
								 .replace('{', '{data=convertduelreport("window_reports_show_"+report_id, data);')
								 +')')).bind(Reports);
		}catch(e){}
	})();
	if(!('_expand_answer' in Messages)){
		Messages._expand_answer = Messages.expand_answer;
		Messages.expand_answer = function(){
			Messages._expand_answer();
			insertbbcodesfunc(document.getElementById('answer_field_row').getElementsByTagName('textarea')[0], false);
		};
	}
	// BBCode at reports
	try{
		/*(ReportPublish.selectPublish = eval('('+ReportPublish.selectPublish.toString()
			.replace(/(showMessage\(xhtml,\s*header,)[^,]+,[^,]+/,
					 'var reportHash=$("reportList_title_"+reportId);reportHash=reportHash?reportHash.href.match(/\'([^\']+)/)[1]:document.getElementById("window_reports_show_"+reportId).innerHTML.match(/showLink\\([0-9]+, \'([^\']+)/)[1];xhtml=\'BBCode: <input type="text" onclick="this.select();" value="[report=\'+reportId+reportHash+\']\'+reportTitle+\'[/report]" name="report_bbcode" size="35" style="text-align:center;" readonly="readonly" class="input_layout">\'+xhtml;$1400, 320'
					)
		+')')).bind(ReportPublish);*/
	}
	catch(e){}
}
}}} // check_TW_version ends here

{ // BBcodes
	function insertBBcode(startTag, endTag, elementid) {
		var input = document.getElementById(elementid);
		input.focus();
		/* für Internet Explorer */
		if (typeof document.selection != 'undefined') {
			/* Einfügen */
			var range = document.selection.createRange();
			var insText = range.text;
			range.text = startTag + insText + endTag;

			/* Cursorposition anpassen */
			range = document.selection.createRange();
			if (insText.length == 0) {
				range.move('character', -endTag.length);
			} else {
				range.moveStart('character', startTag.length + insText.length + endTag.length);
			}
			range.select();
		}
		/* für neuere auf Gecko basierende Browser */
		else if (typeof input.selectionStart != 'undefined') {
			/* BB code bugfix: scrolling by Lekensteyn <lekensteyn@gmail.com> */
			input.focus();
			var start = input.selectionStart;
			var end = input.selectionEnd;
			var sts = input.scrollTop;
			var ste = input.scrollHeight;
			var insText = input.value.substring(start, end);
			input.value = input.value.substr(0, start) + startTag + insText + endTag + input.value.substr(end);
			var pos;
			if(insText.length == 0){
				pos = start + startTag.length;
			}
			else{
				pos = start + startTag.length + insText.length + endTag.length;
			}
			input.selectionStart = pos;
			input.selectionEnd = pos;
			input.scrollTop = sts + input.scrollHeight - ste;
		}
	}

	function insertbbcodesfunc(messagebox, extended) {
		if(window.TWPro && !window.TWPro.enablebbcodes) return;
		var bbcodeplace = messagebox.parentNode;
		var elementidmessagebox;
		if(!(elementidmessagebox=messagebox.id)) elementidmessagebox = messagebox.id = 'twpro_bbbar'+Math.random();
		var bbs = ['b', 'i', 'u', 's', 'player', 'town', 'fort', 'quote=Author', 'url'];
		if(extended) bbs.push('img', 'color=red', 'size=10');
		var bbtemplate = ' <img src="images/transparent.png" onclick="insertBBcode(\'[%1]\', \'[/%2]\', \''+elementidmessagebox+'\');" alt="%1" style="background-image:url(../images/bbcodes.png);background-position: -%3px;height:20px;width:20px;margin:6px 1px;" />';
		var bbhtml = '';
		for(var i=0; i<bbs.length; i++){
			bbhtml += bbtemplate.replace(/%1/g, bbs[i]).replace(/%2/g, bbs[i].replace(/=.+/, '')).replace(/%3/g, i*20);
		}
		var bbbar = document.createElement('div');
		bbbar.id = 'new_bbbar';
		bbbar.innerHTML = bbhtml;
		bbcodeplace.insertBefore(bbbar, messagebox)

	}
}

var url = window.location.href;
if (url.indexOf("forum.php?page=") != -1) {
	if (url.indexOf("page=forum&mode=new_thread") != -1 || ((url.indexOf("&answer") != -1 || url.indexOf("&edit_post")) && url.indexOf("page=thread") != -1)) {
		window.insertBBcode = insertBBcode;
		var ta = document.getElementsByTagName('textarea');
		if(ta.length){
		  if(ta[0].parentNode.firstChild.id != 'new_bbbar')insertbbcodesfunc(ta[0], true);
		}
	}
}
})

if (url.indexOf("game.php") != -1) {

/***************************************************************
* DOM Storage Wrapper Class
* 
* Public members:
*     ctor({"session"|"local"}[, <namespace>])
*     setItem(<key>, <value>)
*     getItem(<key>, <default value>)
*     removeItem(<key>)
*     keys()
***************************************************************/
function Storage(type, namespace) {
	var object = this;

	if(typeof(type) != "string")
		type = "session";

	switch(type) {
		case "local": {
			object.storage = localStorage;
		} break;

		case "session": {
			object.storage = sessionStorage;
		} break;

		default: {
			object.storage = sessionStorage;
		} break;
	}

	if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
		namespace = "ScriptStorage";

	object.namespace = [namespace, "."].join("");

	object.setItem = function(key, value) {
		try {
			object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
		}
		catch(e) {
		}
	}

	object.getItem = function(key, defaultValue) {
		try {
			var value = object.storage.getItem(escape([object.namespace, key].join("")));
			if(value)
				return eval(value);
			else
				return defaultValue;
		}
		catch(e) {
			return defaultValue;
		}
	}

	object.removeItem = function(key) {
		try {
			object.storage.removeItem(escape([object.namespace, key].join("")));
		}
		catch(e) {
		}
	}

	object.keys = function() {
		var array = [];
		var i = 0;
		do {
			try {
				var key = unescape(object.storage.key(i++));
				if(key.indexOf(object.namespace) == 0 && object.storage.getItem(key))
					array.push(key.slice(object.namespace.length));
			}
			catch(e) {
				break;
			}
		} while(true);
		return array;
	}
}

/***************************************************************
* ScriptUpdater Class
* 
* Public members:
*     ScriptUpdater.check(<script id>, <current script version>[, <callback function>])
*     ScriptUpdater.forceCheck(<script id>, <current script version>[, <callback function>])
*     ScriptUpdater.forceNotice(<script id>, <current script version>[, <callback function>])
***************************************************************/
ScriptUpdater = {
	id: 74144,
	version: "1.03",
	scriptId: null,
	scriptCurrentVersion: null,
	scriptCallbackFunction: null,
	scriptUseNotice: null,
	scriptForceNotice: null,
	scriptMetaTags: null,
	scriptStorage: null,
	icons: {
		install: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
		close: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
		uso: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D"
	},


	$: function(id) {
		return document.getElementById(id);
	},

	initialize: function(scriptId, scriptCurrentVersion, scriptCallbackFunction, scriptUseNotice, scriptForceNotice) {
		ScriptUpdater.scriptId = scriptId;
		ScriptUpdater.scriptCurrentVersion = scriptCurrentVersion;
		ScriptUpdater.scriptCallbackFunction = typeof(scriptCallbackFunction) == "function" ? scriptCallbackFunction : false;
		ScriptUpdater.scriptUseNotice = scriptUseNotice;
		ScriptUpdater.scriptForceNotice = scriptForceNotice;
		if(ScriptUpdater.scriptStorage == null) {
			ScriptUpdater.scriptStorage = new Storage("local", "ScriptUpdater." + scriptId);
		}
	},

	setValue: function(key, value) {
		if(ScriptUpdater.scriptStorage != null) {
			ScriptUpdater.scriptStorage.setItem(key, value);
		}
	},

	getValue: function(key, defaultValue) {
		if(ScriptUpdater.scriptStorage != null) {
			return ScriptUpdater.scriptStorage.getItem(key, defaultValue);
		}
		else {
			return defaultValue;
		}
	},

	getOffers: function() {
		var offers = ScriptUpdater.getValue("offers", "");
		return (typeof(offers) == "undefined" || typeof(offers.length) == "undefined" || typeof(offers.push) == "undefined") ? new Array() : offers;
	},

	addOffer: function(version) {
		var offers = ScriptUpdater.getOffers();
		offers.push(version);
		ScriptUpdater.setValue("offers", offers);
	},

	alreadyOffered: function(version) {
		var offers = ScriptUpdater.getOffers();
		for(var i = 0; i < offers.length; i++) {
			if(version.toString() == offers[i].toString())
				return true;
		}
		return false;
	},

	addStyle: function(css) {
		var head = document.getElementsByTagName("head")[0];
		if (!head)
			return;
		var style = document.createElement("style");
		style.type = "text/css";
		style.textContent = css;
		head.appendChild(style);
	},

	parseMetaTags: function(metaTags) {
	 function find_meta(element, index, array) {  
	   return (element.indexOf("// @") != -1);  
	 }  
		var headers = {};
		var name, prefix, header, key, value;
		var lines = metaTags.split(/\n/).filter(find_meta);
		for(var i in lines) {
			if(typeof(lines[i]) == "string") {
				name = lines[i].match(/\/\/ @(\S+)\s*.*/)[1];
				value = lines[i].match(/\/\/ @\S+\s*(.*)/)[1];
				key = name.split(/:/).reverse()[0];
				prefix = name.split(/:/).reverse()[1];
				
				if(prefix) {
					if(!headers[prefix]) {
						headers[prefix] = new Object;
					}
					header = headers[prefix];
				}
				else {
					header = headers;
				}
				
				if(header[key] && !(header[key] instanceof Array)) {
					header[key] = new Array(header[key]);
				}

				if(header[key] instanceof Array)
					header[key].push(value);
				else
					header[key] = value;
			}
		}
		return headers;
	},

	checkRemoteScript: function() {
		
		if(ScriptUpdater.scriptCurrentVersion && !ScriptUpdater.alreadyOffered(ScriptUpdater.scriptCurrentVersion)) {
			ScriptUpdater.addOffer(ScriptUpdater.scriptCurrentVersion);
		}
		
		var date = new Date();
		ScriptUpdater.setValue("lastCheck", parseInt(date.getTime()));

		var su_script=document.createElement('iframe');
		su_script.setAttribute('id', 'updater');
		su_script.setAttribute('style', 'display:none;');
		su_script.src="http://userscripts.org/scripts/source/92414.meta.js";
		document.body.appendChild(su_script);

		window.addEventListener('message', onMessage, true);


		function onMessage(e){
		  myversion = unescape(e.data);
		  gonextstep();
		}
		function gonextstep(){
			ScriptUpdater.scriptMetaTags = ScriptUpdater.parseMetaTags(myversion);
			ScriptUpdater.setValue("versionAvailable", ScriptUpdater.scriptMetaTags.version);
			if(ScriptUpdater.scriptForceNotice || (!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version) && ScriptUpdater.scriptUseNotice)) {
				if(!ScriptUpdater.alreadyOffered(ScriptUpdater.scriptMetaTags.version)) {
					ScriptUpdater.addOffer(ScriptUpdater.scriptMetaTags.version);
				}
				ScriptUpdater.showNotice();
			}
			if(typeof(ScriptUpdater.scriptCallbackFunction) == "function") {
				ScriptUpdater.scriptCallbackFunction(ScriptUpdater.scriptMetaTags.version);
			}
		}
	},

	getLastCheck: function() {
		return ScriptUpdater.getValue("lastCheck", 0);
	},

	getInterval: function() {
		var interval = ScriptUpdater.getValue("interval", 86400000);
		return (typeof(interval) == "undefined" || !interval.toString().match(/^\d+$/)) ? 86400000 : parseInt(interval.toString());
	},

	setInterval: function(interval) {
		ScriptUpdater.setValue("interval", parseInt(interval));
	},

	check: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
		var date = new Date();
		if((date.getTime() - ScriptUpdater.getLastCheck()) > ScriptUpdater.getInterval()) {
			ScriptUpdater.checkRemoteScript();
		}
	},

	forceCheck: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, false);
		ScriptUpdater.checkRemoteScript();
	},

	forceNotice: function(scriptId, scriptVersion, scriptCallbackFunction) {
		ScriptUpdater.initialize(scriptId, scriptVersion, scriptCallbackFunction, true, true);
		ScriptUpdater.checkRemoteScript();
	},

	showNotice: function() {
		if(ScriptUpdater.scriptMetaTags.name && ScriptUpdater.scriptMetaTags.version) {
			ScriptUpdater.addStyle([
				["#ScriptUpdater", ScriptUpdater.scriptId, "Mask { position:fixed; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body * { border:none; font-size:12px; color:#333; font-weight:normal; margin:0; padding:0; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body { width:500px; margin:auto; top:125px; position:fixed; left:35%; text-align:left; background:#DED7C5; border:1px outset #333; padding:0; font-family:Arial; font-size:14px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em ; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body a { margin:0 .5em; text-decoration:underline; color:#000099; font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body strong { font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 { font-size:13px; font-weight:bold; padding:.5em; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h2 { font-weight:bold; margin:.5em 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; cursor:help; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body h1 a:hover { text-decoration:underline; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table { width:auto; margin:0 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr th { padding-left:2em; text-align:right; padding-right:.5em; line-height:2em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body table tr td { line-height:2em; font-weight:bold; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body li { list-style-type:circle; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Body p { font-size:12px; font-weight:normal; margin:1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "History { margin:0 1em 1em 1em; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em; width:448px; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "History ul { margin-left:2em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Close { float:right; cursor:pointer; height:14px; opacity:.5; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Close:hover { opacity:.9; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer { margin:.75em 1em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input { border:1px outset #666; padding:3px 5px 5px 20px; background:no-repeat 4px center #eee; -moz-border-radius:3px; cursor:pointer; width:70px; float:right; margin-left:.5em; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer input:hover { background-color:#f9f9f9; }"].join(""),
				["#ScriptUpdater", ScriptUpdater.scriptId, "Footer select { border:1px inset #666; }"].join(""),
				""
			].join("\n"));

			var html = new Array();
			html.push(["<h2><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.id, "\" target=\"_blank\" title=\"About the Userscripts.org Script Updater\"><img src=\"", ScriptUpdater.icons.uso, "\" align=\"absmiddle\" style=\"margin-top:-2px;\"/></a><img id=\"ScriptUpdater", ScriptUpdater.scriptId, "Close\" src=\"", ScriptUpdater.icons.close, "\" title=\"Close\"/>Userscripts.org Updater</h2>"].join(""));

			if(!ScriptUpdater.scriptForceNotice) {
				html.push(["<p>There is a new version of <strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\">", ScriptUpdater.scriptMetaTags.name, "</a></strong> available for installation.</p>"].join(""));
			}
			else {
				html.push(["<p><strong><a href=\"http://userscripts.org/scripts/show/", ScriptUpdater.scriptId, "\" target=\"_blank\" title=\"Go to script page\" style=\"margin:0; padding:0;\">", ScriptUpdater.scriptMetaTags.name, "</a></strong></p>"].join(""));
			}

			if(ScriptUpdater.scriptCurrentVersion) {
				html.push(["<p>You currently have version <strong>", ScriptUpdater.scriptCurrentVersion, "</strong> installed. The latest version is <strong>", ScriptUpdater.scriptMetaTags.version, "</strong></p>"].join(""));
			}

			if(ScriptUpdater.scriptMetaTags.history) {
				html.push(["<h2>Version History:</h2><div id=\"ScriptUpdater", ScriptUpdater.scriptId, "History\">"].join(""));

				var history = new Array();
				var version, desc;
				if(typeof(ScriptUpdater.scriptMetaTags.history) != "string") {
					for(var i = 0; i < ScriptUpdater.scriptMetaTags.history.length; i++) {
						version = ScriptUpdater.scriptMetaTags.history[i].match(/(\S+)\s+.*$/)[1];
						change = ScriptUpdater.scriptMetaTags.history[i].match(/\S+\s+(.*)$/)[1];
					
						history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
						history[version].push(change);
					}
				}
				else {
						version = ScriptUpdater.scriptMetaTags.history.match(/(\S+)\s+.*$/)[1];
						change = ScriptUpdater.scriptMetaTags.history.match(/\S+\s+(.*)$/)[1];
					history[version] = typeof(history[version]) == "undefined" ? new Array() : history[version];
					history[version].push(change);
				}

				for(var v in history) {
					if(typeof(v) == "string" && v.match(/v?[0-9.]+[a-z]?/) || typeof(v) == "number") {
						html.push(["<div style=\"margin-top:.75em;\"><strong>v", v, "</strong></div><ul>"].join(""));
						for(var i = 0; i < history[v].length; i++) {
							html.push(["<li>", history[v][i], "</li>"].join(""));
						}
						html.push("</ul>");
					}
				}

				html.push("</div>");
			}

			html.push(["<div id=\"ScriptUpdater" + ScriptUpdater.scriptId + "Footer\">", "<input type=\"button\" id=\"ScriptUpdater", ScriptUpdater.scriptId, "CloseButton\" value=\"Close\" style=\"background-image:url(", ScriptUpdater.icons.close, ")\"/><input type=\"button\" id=\"ScriptUpdater" + ScriptUpdater.scriptId + "BodyInstall\" value=\"Install\" style=\"background-image:url(", ScriptUpdater.icons.install, ");\"/>", "Check this script for updates "].join(""));
			html.push(["<select id=\"ScriptUpdater", ScriptUpdater.scriptId, "Interval\">",
				"<option value=\"3600000\">every hour</option>",
				"<option value=\"21600000\">every 6 hours</option>",
				"<option value=\"86400000\">every day</option>",
				"<option value=\"604800000\">every week</option>",
				"<option value=\"0\">never</option>",
			"</select>"].join(""));
			html.push("</div>");

			var noticeBackground = document.createElement("div");
			noticeBackground.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Mask"].join("");
			document.body.appendChild(noticeBackground);

			var noticeWrapper = document.createElement("div");
			noticeWrapper.setAttribute("style", "position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;");
			noticeWrapper.id = ["ScriptUpdater", ScriptUpdater.scriptId, "BodyWrapper"].join("");

			var notice = document.createElement("div");
			notice.id = ["ScriptUpdater", ScriptUpdater.scriptId, "Body"].join("");
			notice.innerHTML = html.join("");

			noticeWrapper.appendChild(notice);

			document.body.appendChild(noticeWrapper);

			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Close"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "CloseButton"].join("")).addEventListener("click", ScriptUpdater.closeNotice, true);
			ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "BodyInstall"].join("")).addEventListener("click", function() {
				setTimeout(ScriptUpdater.closeNotice, 500);
				document.location = ["http://userscripts.org/scripts/source/", ScriptUpdater.scriptId, ".user.js"].join("");
			}, true);

			var selector = ScriptUpdater.$(["ScriptUpdater", ScriptUpdater.scriptId, "Interval"].join(""));
			for(var i = 0; i < selector.options.length; i++) {
				if(selector.options[i].value.toString() == ScriptUpdater.getInterval().toString())
					selector.options[i].selected = true;
			}

			ScriptUpdater.setInterval(selector.value);
			selector.addEventListener("change", function() {
				ScriptUpdater.setInterval(selector.value);
			}, true);

			window.addEventListener("keyup", ScriptUpdater.keyUpHandler, true);
		}
	},

	closeNotice: function() {
		document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'BodyWrapper'].join("")));
		document.body.removeChild(ScriptUpdater.$(['ScriptUpdater', ScriptUpdater.scriptId, 'Mask'].join("")));
		window.removeEventListener("keyup", ScriptUpdater.keyUpHandler, true);
	},

	keyUpHandler: function(event) {
		switch(event.keyCode) {
			case 27:
				ScriptUpdater.closeNotice();
				break;
		}
	}
};

//ScriptUpdater.forceNotice(92414, twpro_version);
//ScriptUpdater.forceCheck(92414, twpro_version);
ScriptUpdater.check(92414, twpro_version);
}
}
else
{
  (function(f){var d=document,s=d.createElement('script');s.setAttribute('type','application/javascript');s.textContent = '('+f.toString()+')()';(d.body||d.head||d.documentElement).appendChild(s);s.parentNode.removeChild(s)})(function(){
	function sendMessage(){
	  var dstWindow = window.parent;
	  mymessage = String(escape(document.body.textContent));
	  if(dstWindow.postMessage){
		dstWindow.postMessage(mymessage, '*');
	  }
	}
	sendMessage();
  })
}