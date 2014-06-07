// ==UserScript==
// @name Kontrola prenesenych dat pre datovo obmedzeny internet T-Com
// @include https://zona.telekom.sk/portal/dt?action=content&provider=SC_DSL
// ==/UserScript==

var rowNodes = document.evaluate(
  "//table[tbody/tr[1]/th/text() = 'Mesačné štatistiky']//tr",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

var datum = rowNodes.snapshotItem(2).cells.item(0).childNodes.item(0).childNodes.item(1).childNodes.item(0).nodeValue;
var dateParts = datum.split("-");

var dniVMesiaci = new Date(dateParts[2], dateParts[1], 0).getDate();
var maxMega = 2048;
var denPovoleneMB = maxMega / dniVMesiaci;

var aktualnaSuma = 0;

for (var i = 0 ; i < rowNodes.snapshotLength ; i ++ ) {
  
  var myRow = rowNodes.snapshotItem(i);
  var newCellAktualnaSuma = myRow.insertCell(myRow.cells.length);
  var newCellMaxPovolene = myRow.insertCell(myRow.cells.length);
  var newCellMBRezerva = myRow.insertCell(myRow.cells.length);
  var newCellDniRezerva = myRow.insertCell(myRow.cells.length);
  var newCellCenaNadRamec = myRow.insertCell(myRow.cells.length);
  
  if (i == 0) {

    myRow.cells.item(myRow.cells.length - 3).appendChild(document.createTextNode("dni v mesiaci:"));
    myRow.cells.item(myRow.cells.length - 2).appendChild(document.createTextNode(dniVMesiaci));
    
    myRow.cells.item(myRow.cells.length - 5).appendChild(document.createTextNode("max den MB:"));
    myRow.cells.item(myRow.cells.length - 4).appendChild(document.createTextNode(Math.round(denPovoleneMB * 100) / 100));
    
    myRow.cells.item(myRow.cells.length - 1).appendChild(document.createTextNode("nadramec: 0,016 E/MB"));
    
    continue;
  }
  
  if (i == 1) {
    newCellAktualnaSuma.appendChild(document.createTextNode("aktualna suma"));
    newCellMaxPovolene.appendChild(document.createTextNode("max povolene"));
    newCellMBRezerva.appendChild(document.createTextNode("MB rezerva"));
    newCellDniRezerva.appendChild(document.createTextNode("Dni rezerva"));
    newCellCenaNadRamec.appendChild(document.createTextNode("Nadramec Eur"));
    continue;
  }
  
  var denMB = parseFloat(myRow.cells.item(4).childNodes.item(1).childNodes.item(0).nodeValue.replace(",", ".").replace(/\s/g, ''));
  
  aktualnaSuma = aktualnaSuma + denMB;
  newCellAktualnaSuma.appendChild(document.createTextNode(Math.round(aktualnaSuma * 100)/100)); // zaokruhlime ...

  // niekedy chybaju riadky pre dni => nemozme spoliehat na 'i' pri nasobeni, musime nasobit dnom v mesiaci
  var datumTxt = myRow.cells.item(0).childNodes.item(0).childNodes.item(1).childNodes.item(0).nodeValue;
  var dateI = parseInt(datumTxt.split("-")[0], 10);
  
  var maxPovolene = dateI * denPovoleneMB;
  newCellMaxPovolene.appendChild(document.createTextNode(Math.round(maxPovolene * 100) / 100));
  
  var mbRezerva = maxPovolene - aktualnaSuma;
  newCellMBRezerva.appendChild(document.createTextNode(Math.round(mbRezerva * 100) / 100));
  
  var dniRezerva = mbRezerva / denPovoleneMB;
  var cisloDniRezerva = Math.round(dniRezerva * 100) / 100;
  cisloDniRezerva = cisloDniRezerva.toString();
  var dniRezervaTextNode = document.createTextNode(cisloDniRezerva);
  var dniRezervaBoldNode = document.createElement('b');
  if (dniRezerva < 0) {
    dniRezervaBoldNode.style.color = "red";
  }
  dniRezervaBoldNode.appendChild(dniRezervaTextNode);
  newCellDniRezerva.appendChild(dniRezervaBoldNode);
  
  // eur nad ramec 0.016 E/MB
  if (mbRezerva < 0) {
    
    var eurNadramec = Math.round(-mbRezerva * 0.016 * 100) / 100;
    var eurNadramecTextNode = document.createTextNode(eurNadramec + " Eur");
    
    var eurNadRamecBoldNode = document.createElement('b');
    eurNadRamecBoldNode.style.color = "red";
    
    eurNadRamecBoldNode.appendChild(eurNadramecTextNode);
    newCellCenaNadRamec.appendChild(eurNadRamecBoldNode);
  }
  
};

/*
 * este kontrolnu sumu z tabulky DSL & Optik & Dial-up
 */
var tableItems = document.evaluate(
  "//table[tbody/tr[1]/th/text() = 'DSL & Optik & Dial-up']",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

var sumTable = tableItems.snapshotItem(0);

var kontrolnaSum = 0;
for (var i = 2 ; i < sumTable.rows.length ; i ++ ) { // zaciname od druheho riadku
  var rowMB = sumTable.rows.item(i).cells.item(5).childNodes.item(1).childNodes.item(0).nodeValue;
  rowMB = parseFloat(rowMB.replace(",", ".").replace(/\s/g, ''));
  kontrolnaSum += rowMB;
}

var sumTableRow = sumTable.insertRow(sumTable.rows.length);

sumTableRow.insertCell(0);
var sumTxtCell = sumTableRow.insertCell(1);
sumTxtCell.appendChild(document.createTextNode("kontrolna suma: "));

sumTableRow.insertCell(2);
sumTableRow.insertCell(3);
sumTableRow.insertCell(4);

var sumTableCell = sumTableRow.insertCell(5);

sumTableCell.appendChild(document.createTextNode(Math.round( kontrolnaSum * 100 ) / 100));