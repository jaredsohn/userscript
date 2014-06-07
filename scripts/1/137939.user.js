// ==UserScript==
// @name           Wikipedia Table filter
// @namespace      benibela
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==


var tables = document.getElementsByClassName("wikitable");
var hiddenLists = new Array();
var hiddenNames = new Array();
var hiddenPropertiesDisplay = "";

if (tables.length > 0) {
  
function stringContains(str, list) {
  for (var i=0;i<list.length;i++)
    if (str == list[i] || (list[i] > 3 && str.indexOf(list[i]) >= 0)) return true;
  return false;
}

function arrayIndexOf(ar, v) {
  for (var i=0;i<ar.length;i++) if (ar[i] == v) return i;
  return -1;
}
function arrayContains(ar, v) {
  for (var i=0;i<ar.length;i++) if (ar[i] == v) return true;
  return false;
}

function updateHideText(){
  for (var i=0;i<hiddenLists.length;i++)
    hiddenLists[i].innerHTML = "<b>Hidden names:</b> " + (hiddenNames.join(", ")).replace("<", "&lt;")+
                              "<br>"+"<b>Hidden properties: </b>" + (hiddenPropertiesDisplay).replace("<", "&lt;");
}
function updateHide(){
  for (var i=0;i<tables.length;i++) {
    for (var r=0;r<tables[i].rows.length;r++)
      if (tables[i].rows[r].cells[0] && ( stringContains(tables[i].rows[r].cells[0].textContent, hiddenNames)) )
       
        tables[i].rows[r].style.display="none";
  }
  updateHideText();
}
  
function newButton(){
  var deleteThis = document.createElement("a"); 
  deleteThis.textContent = "x";
  deleteThis.addEventListener("click", function(e){
    var cell = e.target.parentNode;
    var row = cell.parentNode;
    if (cell == row.cells[0]) {
      if (cell.textContent == "x") {
        row.style.display = "none";  //empty row (repeated table headers, wikipedias idea of filtering)
      } else if (!arrayContains(hiddenNames, cell.textContent)) {
        hiddenNames.push(cell.textContent);
        updateHide();
      }
    } else if (row.parentNode.nodeName == "THEAD" || row.parentNode.nodeName == "TFOOT" 
               || (row.parentNode.nodeName == "TBODY" && row.parentNode.parentNode.rows[0] == row)) {
      if (hiddenPropertiesDisplay != "") hiddenPropertiesDisplay += ", ";
      hiddenPropertiesDisplay += " Column("+cell.textContent+") ";
      
      var table = row.parentNode.parentNode; //tbody actually
      var pos = arrayIndexOf(row.cells,cell);
      for (var i=0;i<table.rows.length;i++)
        table.rows[i].cells[pos].style.display = "none";
    } else {
      var table = row.parentNode; //tbody actually
      var pos = arrayIndexOf(row.cells,cell);
      var remove = cell.textContent;
      for (var i=0;i<table.rows.length;i++) 
        if (table.rows[i].cells[pos] && table.rows[i].cells[pos].textContent == remove) {
          if (!arrayContains(hiddenNames, table.rows[i].cells[0].textContent))
            hiddenNames.push(table.rows[i].cells[0].textContent);
        }
       if (hiddenPropertiesDisplay != "") hiddenPropertiesDisplay += ", ";
       if (table.nodeName == "TBODY") table = table.parentNode;
       hiddenPropertiesDisplay += table.rows[0].cells[pos].textContent + " = " + remove.substr(0, remove.length-1);
       
       updateHide();
    }
  });
  deleteThis.className = "delete-this-button";
  return deleteThis;
}

setTimeout(function(){
for (var i=0;i<tables.length;i++) {
  for (var r=0;r<tables[i].rows.length;r++)
    for (var c=0;c<tables[i].rows[r].cells.length;c++) {
      tables[i].rows[r].cells[c].appendChild(newButton());
    }
  var temp = document.createElement("div");
  tables[i].parentNode.insertBefore(temp, tables[i].nextSibling);
  hiddenLists.push(temp);
}}, 100);

var head = document.getElementsByTagName("head")[0];
var ele = head.appendChild(window.document.createElement("style"));
ele.innerHTML = ".delete-this-button {flush: right; display: inline-block; 0; bottom: 0; color: red; cursor: pointer}";

}