// ==UserScript==
// @name           Singles Top100 Simplifier v1.00
// @namespace      WorldSingleChartBautifier
// @description    Italian Only, for now - Questo script rende di rapidissima consultazione la classifica dei 100 singoli più venduti pubblicata su top40-charts.com 
// @include        http://top40-charts.com/chart.php?cid=35
// ==/UserScript==


// **************************************************************************
// **************** SPAZIO FUNZIONI DI SUPPORTO *****************************
// **************************************************************************

// quersta funzione crea nodi di qualsiasi tipo, eventualmente li riempe con
// del testo e poi rende indietro il nodo appena creato per successive 
// manipolazioni

function creaNodo(idNodo, nomeClasse, testoHtml, nomeTag) { 
  var Nodo = document.createElement(nomeTag||"div"); // Se non specifico, è un DIV
  if (idNodo) Nodo.id = idNodo; // Se ho dato l'id lo inserisco tra gli attributi
  if (nomeClasse) Nodo.className = nomeClasse; // idem
  if ("undefined" != typeof testoHtml) {
    // se ho del testo glielo inserisco dentro come figlio testuale
    Nodo.appendChild(document.createTextNode(testoHtml)); //
  } 
  return Nodo; // Infine passo il nodo appena creato, può sempre servire
}

// Questa funzione è presa da un libro di programmazione ed aggiunge
// quanto inserito come stringa al CSS presente (o meno) nell'HEAD della
// pagina. Verifico che altri script non usino lo stesso nome di funzione
if(!window.addGlobalStyle){
 function addGlobalStyle(css) {
		try {
			var elmHead, elmStyle;
			elmHead = document.getElementsByTagName('head')[0];
			elmStyle = document.createElement('style');
			elmStyle.type = 'text/css';
			elmHead.appendChild(elmStyle);
			elmStyle.innerHTML = css;
		} catch (e) {
			if (!document.styleSheets.length) {
				document.createStyleSheet();
			}
			document.styleSheets[0].cssText += css;
		}
 }
}


// **************************************************************************
// ********************** debug SCRIPT ********************************
// **************************************************************************

/*

// Marco tutti gli elementi che mi interessano come NON da rimuovere
var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table//*";

var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  
GM_log ("Rendo visibile la tabella che mi interessa << " + xPath + " >> -> " + snapResults.snapshotLength);
 
	for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
     elm.style.visibility = "visible";
}
	
var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table/tbody/tr/td";


var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  

GM_log ("Nascondo alcune celle " + snapResults.snapshotLength);
for (var i = 0; i <= 9; i++) {
		var elm = snapResults.snapshotItem(i);
    elm.style.visibility = "hidden";
}
          
*/ 
  
 

// **************************************************************************
// ********************** CORPO DELLO SCRIPT ********************************
// **************************************************************************
  
          
// ----------------------- Le posizioni attuali ---------------------------

var real_pos = new Array();
var count_pos = 0;

var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table/tbody/tr[position()>3]/td[1]";


var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  

for (var i = 0; i < snapResults.snapshotLength ; i++) {
		var elm = snapResults.snapshotItem(i);
    
    // devo usare questo if perchè prima di ogni cella buona ce n'è una vuota !!!
    if (elm.hasChildNodes() ) {
     count_pos ++;
     // DAL TD prendo il primo figlio, B, e il primo figlio è il testo, di cui 
     // leggo il nodeValue per leggerlo 
     real_pos[count_pos] = elm.firstChild.firstChild.nodeValue;
     /*
     GM_log ("Elemento n° " + count_pos + ": \nNome: " +  elm.nodeName + 
             " \nNodi: " + elm.childNodes.length + "\nTesto:" + 
             elm.innerHTML + "\nValore: "  + 
             elm.firstChild.firstChild.nodeValue);
     */
    }    
}

//GM_log ("Raccolte posizioni attuali in q.ta. " + ( real_pos.length - 1) );

// ----------------------- Le posizioni vecchie ---------------------------

var real_oldPos = new Array();
var count_oldPos = 0;

var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table/tbody/tr[position()>3]/td[3]/font";


var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  


for (var i = 0; i < snapResults.snapshotLength ; i++) {
		var elm = snapResults.snapshotItem(i);
    count_oldPos ++;
    
    if ( elm.firstChild.hasChildNodes() ) {
      real_oldPos[count_oldPos] = elm.firstChild.firstChild.nodeValue;
    } else {
      real_oldPos[count_oldPos] = elm.firstChild.nodeValue;
    }
    /*    
          GM_log ("Elemento n° " + count_oldPos + ": \nNome: " +  elm.nodeName + 
             " \nNodi: " + elm.childNodes.length + 
             "\n\nValore nodo:" + elm.firstChild.nodeValue +
             "\n\nCon sottonodi?:" + elm.firstChild.hasChildNodes()
            );
    */
}

//GM_log ("Raccolte vecchie posizioni in q.ta. " +  ( real_oldPos.length -1) ) ;

// ----------------------- Le settimane che è in classifica ---------------------------


var real_weeks = new Array();
var count_weeks = 0;

var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table/tbody/tr[position()>3]/td[8]/font";


var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  

for (var i = 0; i < snapResults.snapshotLength ; i++) {
		var elm = snapResults.snapshotItem(i);
    
    count_weeks ++;
    real_weeks[count_weeks] = elm.firstChild.nodeValue;
    /*
    elm.style.border = "3px solid red";
    GM_log ("Elemento n° " + count_weeks + ": \nNome: " +  elm.nodeName + 
             " \nNodi: " + elm.childNodes.length + "\nTesto:" + 
             elm.firstChild.nodeValue);
    */
}


//GM_log ("Raccolte settimane in classifica in q.ta. " +( real_weeks.length - 1) );


// ----------------------- I titoli dei brani ---------------------------


var real_titles = new Array();
var count_titles = 0; 

// Ricavo i titoli dei brani
var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table/tbody/tr/td/table/tbody/tr/td[3]/div/b/a";


var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//GM_log ("Evidenzio le celle con titolo e artista " + snapResults.snapshotLength);
for (var i = 0; i < snapResults.snapshotLength ; i++) {
		var elm = snapResults.snapshotItem(i);
    count_titles ++;
    real_titles[count_titles] = elm.firstChild.nodeValue;
    /*
    elm.style.border = "3px solid green";
    GM_log ("Elemento verde n° " + i + ": \nNome: " +  elm.nodeName + 
            "\nNodi: " + elm.childNodes.length + 
            "\n\nTesto:\n" + elm.firstChild.nodeValue 
          );
    */
}

//GM_log ("Raccolti titoli in q.ta. " +( real_titles.length - 1) );


// ----------------------- Nome dell'artista ---------------------------


var real_artists = new Array();
var count_artists = 0;

// Ricavo i titoli dei brani
var xPath = "//div/table/tbody/tr/td/center" + 
            "/table[1]/tbody/tr/td" + 
            "/table/tbody/tr/td" +
            "/table[2]/tbody/tr/td"+
            "/table/tbody/tr/td/table/tbody/tr/td[3]/a";


var snapResults = document.evaluate(xPath, document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//GM_log ("Evidenzio le celle con l'artista " + snapResults.snapshotLength);
for (var i = 0; i < snapResults.snapshotLength ; i++) {
		var elm = snapResults.snapshotItem(i);
    count_artists ++;
    real_artists[count_artists] = elm.firstChild.nodeValue;
    /*
    elm.style.border = "3px solid green";
    GM_log ("Elemento verde n° " + i + ": \nNome: " +  elm.nodeName + 
            "\nNodi: " + elm.childNodes.length + 
            "\n\nTesto:\n" + elm.innerHTML 
          );
    */
}

//GM_log ("Raccolti artisti in q.ta. " +( real_artists.length - 1) );



// ----------------------- Svuoto la pagina ---------------------------

// Marco tutti gli elementi della pagina come da rimuovere

var snapResults = document.evaluate("//body/*", document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//GM_log ("Elementi, tutti, occultati: " + snapResults.snapshotLength);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
    elm.parentNode.removeChild(elm);
}

// Rimuovo anche tutto l''head'

var snapResults = document.evaluate("/html/head", document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//GM_log ("Elementi, tutti, occultati: " + snapResults.snapshotLength);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
		var elm = snapResults.snapshotItem(i);
    elm.parentNode.removeChild(elm);
}

// Poi lo ricreo e lo appeno ad HTML
var nuovo_head = creaNodo("","","","head");
var nuovo_titolo = creaNodo("","","Top100 - Versione stmapabile - by Realtebo","title");
nuovo_head.appendChild(nuovo_titolo);


// lo appendo solo nella prossima fase, poche righe sotto


// ----------------------- Ora creo la tabella ---------------------------

// mi procuro un riferimento al BODY html

var snapResults = document.evaluate("//body", document, null, 
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

//GM_log ("Body rintracciati: " + snapResults.snapshotlength);

var body = snapResults.snapshotItem(0);
// Sto inserendo l'header sotto html come ramo, ma prima di body come ordine
body.parentNode.insertBefore(nuovo_head, body);

// Tabelle
var table = creaNodo("","realTable","","table");
body.appendChild(table);
body.appendChild(document.createTextNode("\n") );

// Header
var table_head = creaNodo("","realTableHead","","tr");
table.appendChild(table_head);

// Celle dell'header
var table_head_pos = creaNodo("realPos","realTableHeadCell","Posizione","td");
table_head.appendChild(table_head_pos);
table_head_pos = creaNodo("realPosPrec","realTableHeadCell","Posizione Precedente","td");
table_head.appendChild(table_head_pos);
table_head_pos = creaNodo("realArtist","realTableHeadCell","Artista","td");
table_head.appendChild(table_head_pos);
table_head_pos = creaNodo("realSong","realTableHeadCell","Titolo del brano","td");
table_head.appendChild(table_head_pos);
table_head_pos = creaNodo("realWeeks","realTableHeadCell","Settimane","td");
table_head.appendChild(table_head_pos);

// Table Body

var table_body = creaNodo("","realTableBody","","tbody");
table.appendChild(table_body);

for (var riga= 1; riga<= 100 ; riga++) {

 // Ora vado ad aggiungere i vari valori letti lungo la pagina
 // Ci creo le celle, con rispettivi id e classi per poterli ben
 // personalizzare.
 
 // Prima però verifico che il brano non sia una nuova entrata
 // nel qual caso evidenzio la riga, dandogli un nome di classe-riga divero

 var id_row_name = "realRow"+(riga%2);
 if (real_oldPos[riga] == "New") {
  id_row_name = "newEntry";
 } 
 // Creo la riga  alternando tra 0 (zero) e 1 (uno) l'id, classe uguale
 var table_row = creaNodo( id_row_name ,"realTableRow","","tr");
 // Inserisco un piccolo effetto dinamico, per agevolare la lettura
 table_row.setAttribute("onMouseOver", "this.id='hoverOn' ");
 table_row.setAttribute("onMouseOut", "this.id='"+ id_row_name+ "'");
 table_body.appendChild(table_row);
 

 // Inserisco la cella con la posizione attuale
 var table_td = creaNodo("realPos","realTableTd", real_pos[riga]  ,"td");
 table_row.appendChild(table_td);
 
 // Inserisco la cella con la posizione precedente
 table_td = creaNodo("realPosPrec","realTableTd", real_oldPos[riga]  ,"td");
 table_row.appendChild(table_td);
 
 // Inserisco la cella con l'artista
 table_td = creaNodo("realArtist","realTableTd", real_artists[riga]  ,"td");
 table_row.appendChild(table_td);
 
  // Inserisco la cella con il titolo del brano
 table_td = creaNodo("realSong","realTableTd", real_titles[riga]  ,"td");
 table_row.appendChild(table_td);
 
  // Inserisco la cella con il numero di settimane che è in classifica
 table_td = creaNodo("realWeeks","realTableTd", real_weeks[riga]  ,"td");
 table_row.appendChild(table_td);
 
}

// Termino con una nota di stile
addGlobalStyle (
 "body { margin: 10px 50px 10px 50px;  background-color: AliceBlue;  border: 1px solid green;  font-family: Verdana; } \n"+ 
 "table {  width: 100% !important;  border: 1px solid gray; } \n" +
 "TD {  padding: 2px;  font-size: 0.8em; } \n" +
 "TR#realRow0 { background-color: #FFFFE0; } \n" +
 "TR#realRow1 { background-color: #B0E0E6; } \n" +
 "TR#newEntry { background-color: #FFB6C1 } \n" +
 "TR.realTableHead {  background-color: #FFE4C4; height: 2em; } \n" +
 "TD.realTableHeadCell { text-align: center;  font-weight: bold;  font-size: 1em; } \n" +
 "TD#realPos { font-weight: bold; text-align: center;  width: 110px !important; padding: 5px; } \n" +
 "TD#realPosPrec {  text-align: center; width: 110px !important; } \n" + 
 "TD#realSong { font-weight: bold; } \n" +
 "TD#realWeeks {  text-align: center; width: 110px !important; } \n" +
 "TD#realArtist { font-style: italic; } \n" +
 "TR#hoverOn { background-color: yellow; }"   
);
