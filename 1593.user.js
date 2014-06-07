// Apache server-status user script
// version 1.2
// 2006-10-19
// Copyright (c) 2006, Henri Bourcereau
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Apache server-status", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name         Apache server-status
// @namespace     http://mmai.websiteburo.com/
// @description   Enhance Apache server-status pages
// @include       http://*/server-status*
// @include       https://*/server-status*
// @include       http://*/ovh-status*
// @include       https://*/ovh-status*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function addGlobalJavascript(js) {
    var head, javascript;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    javascript = document.createElement('script');
    javascript.setAttribute('language', 'javascript');
    javascript.innerHTML = js;
    head.appendChild(javascript);
}

function getText(node) {
  var letexte="";
  var children = node.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeType == 3) { // Text node
      letexte = letexte+children[i].nodeValue;
    }
    else {
      letexte = letexte + getText(children[i]) ;
    }
    if (children[i] == children[i].parentNode.lastChild) {
	return letexte;
	}
  }
}

//On specifie un style pour la table des slots
var tableElement = document.getElementsByTagName('table')[0];
tableElement.setAttribute('class', 'sortable')
tableElement.setAttribute('id', 'stats')
var listeth;
//Si version originale avec des th
listeth = tableElement.getElementsByTagName('th');
for (i=0; i<listeth.length; i++){
    listeth[i].setAttribute('class', 'tab');
}
//Sinon : il faut d'abord remplacer les td par des th
if (listeth.length == 0){
    lignetr = tableElement.getElementsByTagName('tr')[0];
    listetd = lignetr.getElementsByTagName('td');
    
    var trElement = document.createElement('tr');
    var tdElement;
    var stri = "";
    for (var i=0; i<listetd.length; i++){
        tdElement = listetd[i];
        var newElement = document.createElement('th')
        newElement.setAttribute('class', 'tab');
        var texteElement = document.createTextNode(getText(tdElement));
        newElement.appendChild(texteElement);
        trElement.appendChild(newElement);
    }
    lignetr.parentNode.replaceChild(trElement, lignetr);
    
}

//On applique les styles
addGlobalStyle('BODY,TD,TH,P{font-family: Verdana, Arial, Helvetica, sans-serif;font-size: 10pt;} TD {background:#FFFFFF; padding:2px;} PRE {font-family: Courier, Courier New; letter-spacing:2pt;}  TD.numeric {text-align:right;} TD.centered {text-align:center;} table.sortable a.sortheader {background-color:#eee; color:#666666;font-weight: bold;text-decoration: none; display: block;} table.sortable span.sortarrow {color: black;text-decoration: none;} a.bouton {float: right;color: #000000;font-size:12px;font-family:verdana;font-weight:bold;text-decoration: none;border:4px outset darkgray;background-color:lightgray;display: block;padding: 3px 5px;margin: 1px;}a.bouton:hover {background-color: gray;color:#000000;padding-left:4px;border:4px inset darkgray;}');

//On rafraichit la page toutes les 5 secondes
window.toggleRefresh = function(){
    if (window.letimeout){
        window.clearTimeout(window.letimeout);
        window.lienStop.innerHTML='<font color="green">Enable reloads</font>';
        window.letimeout = 0;
    }
    else{
        window.letimeout = window.setTimeout( "window.location.reload()", 5000);
        window.lienStop.innerHTML='<font color="red">Disable reloads</font>';
    }
}

window.letimeout = window.setTimeout( "window.location.reload()", 5000);
//Lien pour annuler le rafraichissement
window.lienStop = document.createElement('a');
//window.lienStop.setAttribute('onClick', 'window.toggleRefresh();');
window.lienStop.addEventListener("click", window.toggleRefresh, true);
window.lienStop.setAttribute('class', 'bouton');
window.lienStop.innerHTML='<font color="red">Disable reloads</font>';
//On ajoute le lien apres le titre
var titre;
titre = document.getElementsByTagName('h1')[0];
if (titre) {
    titre.parentNode.insertBefore(window.lienStop, titre.nextSibling);
}


//On insere la bibliotheque de sorttable.js (http://www.kryogenix.org/code/browser/sorttable/) modifiee par Frank Ralf
addGlobalJavascript("sortTables();\n\nfunction sortTables() {\n	if (!document.getElementsByTagName) return;\n   var tbls = document.getElementsByTagName(\"table\");\n   \n   for (var ti=0;ti<tbls.length;ti++) {\n       var thisTbl = tbls[ti];\n	   if (((' '+thisTbl.className+' ').indexOf(\"sortable\") != -1) && (thisTbl.id)) {\n	   ts_makeSortable(thisTbl);\n	   }\n   }\n}\n\nfunction ts_makeSortable (table) {\n    if (table.rows && table.rows.length > 0) {\n        var firstRow = table.rows[0];\n    }\n    if (!firstRow) return;\n    \n    for (var i=0;i<firstRow.cells.length;i++) {\n        var cell = firstRow.cells[i];\n		var txt = ts_getInnerText(cell);\n\n        cell.innerHTML = '<a href=\"#\" class=\"sortheader\" column=\"'+i+'\">'+txt+'<span class=\"sortarrow\">&nbsp;&nbsp;&nbsp;</span></a>';\n\n		elmLinks = cell.getElementsByTagName(\"a\")\n		elmLinks[0].addEventListener(\n		'click', \n		function(event){\n			var lnk = event.target\n			var  col = lnk.getAttribute('column')\n			ts_resortTable(lnk, col)		\n			}, \n		false)\n    }\n}\n\n\nfunction ts_getInnerText(el) {\n	if (typeof el == \"string\") return el;\n	if (typeof el == \"undefined\") { return el };\n	if (el.innerText) return el.innerText;\n	var str = \"\";\n	\n	var cs = el.childNodes;\n	var l = cs.length;\n	for (var i = 0; i < l; i++) {\n		switch (cs[i].nodeType) {\n			case 1: \n				str += ts_getInnerText(cs[i]);\n				break;\n			case 3:\n				str += cs[i].nodeValue;\n				break;\n		}\n	}\n	return str;\n}\n\nfunction ts_resortTable(lnk) {\n\n    var span;\n    for (var ci=0;ci<lnk.childNodes.length;ci++) {\n        if (lnk.childNodes[ci].tagName && lnk.childNodes[ci].tagName.toLowerCase() == 'span') span = lnk.childNodes[ci];\n    }\n    var spantext =  ts_getInnerText(span);\n    var td = lnk.parentNode;\n    var column = td.cellIndex;\n    var table =  getParent(td,'TABLE');\n\n    if (table.rows.length <= 1) return;\n    var itm = ts_getInnerText(table.rows[1].cells[column]);\n    sortfn = ts_sort_caseinsensitive;\n    if (itm.match(/^\\d\\d[\\/-]\\d\\d[\\/-]\\d\\d\\d\\d$/)) sortfn = ts_sort_date;\n    if (itm.match(/^\\d\\d[\\/-]\\d\\d[\\/-]\\d\\d$/)) sortfn = ts_sort_date;\n    if (itm.match(/^[$]/)) sortfn = ts_sort_currency;\n    if (itm.match(/^[\\d\\.]+$/)) sortfn = ts_sort_numeric;\n    SORT_COLUMN_INDEX = column;\n    var firstRow = new Array();\n    var newRows = new Array();\n    for (i=0;i<table.rows[0].length;i++) { firstRow[i] = table.rows[0][i]; }\n    for (j=1;j<table.rows.length;j++) { newRows[j-1] = table.rows[j]; }\n\n    newRows.sort(sortfn);\n\n    if (span.getAttribute(\"sortdir\") == 'down') {\n        ARROW = '&nbsp;&nbsp;&uarr;';\n        newRows.reverse();\n        span.setAttribute('sortdir','up');\n    } else {\n        ARROW = '&nbsp;&nbsp;&darr;';\n        span.setAttribute('sortdir','down');\n    }\n    \n\n    for (i=0;i<newRows.length;i++) { if (!newRows[i].className || (newRows[i].className && (newRows[i].className.indexOf('sortbottom') == -1))) table.tBodies[0].appendChild(newRows[i]);}\n\n    for (i=0;i<newRows.length;i++) { if (newRows[i].className && (newRows[i].className.indexOf('sortbottom') != -1)) table.tBodies[0].appendChild(newRows[i]);}\n    \n\n    var allspans = document.getElementsByTagName(\"span\");\n    for (var ci=0;ci<allspans.length;ci++) {\n        if (allspans[ci].className == 'sortarrow') {\n            if ( getParent(allspans[ci],\"table\") ==  getParent(lnk,\"table\")) {\n                allspans[ci].innerHTML = '&nbsp;&nbsp;&nbsp;';\n            }\n        }\n    }\n        \n    span.innerHTML = ARROW;\n}\n\nfunction getParent (el, pTagName) {\n	if (el == null) return null;\n	else if (el.nodeType == 1 && el.tagName.toLowerCase() == pTagName.toLowerCase())	\n		return el;\n	else\n		return  getParent(el.parentNode, pTagName);\n}\nfunction ts_sort_date(a,b) {\n\n    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);\n    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);\n    if (aa.length == 10) {\n        dt1 = aa.substr(6,4)+aa.substr(3,2)+aa.substr(0,2);\n    } else {\n        yr = aa.substr(6,2);\n        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }\n        dt1 = yr+aa.substr(3,2)+aa.substr(0,2);\n    }\n    if (bb.length == 10) {\n        dt2 = bb.substr(6,4)+bb.substr(3,2)+bb.substr(0,2);\n    } else {\n        yr = bb.substr(6,2);\n        if (parseInt(yr) < 50) { yr = '20'+yr; } else { yr = '19'+yr; }\n        dt2 = yr+bb.substr(3,2)+bb.substr(0,2);\n    }\n    if (dt1==dt2) return 0;\n    if (dt1<dt2) return -1;\n    return 1;\n}\n\nfunction ts_sort_currency(a,b) { \n    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');\n    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).replace(/[^0-9.]/g,'');\n    return parseFloat(aa) - parseFloat(bb);\n}\n\nfunction ts_sort_numeric(a,b) { \n    aa = parseFloat(ts_getInnerText(a.cells[SORT_COLUMN_INDEX]));\n    if (isNaN(aa)) aa = 0;\n    bb = parseFloat(ts_getInnerText(b.cells[SORT_COLUMN_INDEX])); \n    if (isNaN(bb)) bb = 0;\n    return aa-bb;\n}\n\nfunction ts_sort_caseinsensitive(a,b) {\n    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]).toLowerCase();\n    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]).toLowerCase();\n    if (aa==bb) return 0;\n    if (aa<bb) return -1;\n    return 1;\n}\n\nfunction ts_sort_default(a,b) {\n    aa = ts_getInnerText(a.cells[SORT_COLUMN_INDEX]);\n    bb = ts_getInnerText(b.cells[SORT_COLUMN_INDEX]);\n    if (aa==bb) return 0;\n    if (aa<bb) return -1;\n    return 1;\n}\n\n\nfunction addEvent(elm, evType, fn, useCapture)\n\n{\n  if (elm.addEventListener){\n    elm.addEventListener(evType, fn, useCapture);\n    return true;\n  } else if (elm.attachEvent){\n    var r = elm.attachEvent(\"on\"+evType, fn);\n    return r;\n  } else {\n    alert(\"Handler could not be removed\");\n  }\n} \n");

