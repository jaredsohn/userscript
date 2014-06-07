// ==UserScript==
// @name        Geizhals Product list export
// @namespace   geizhals
// @include     http://geizhals.at/?cat=*
// @version     6
// @grant       none
// ==/UserScript==

window.exportCSV = function(csv) {
    var table = document.getElementById('content_table').firstChild; // the tbody
    var header = document.getElementById('content_table_hdr');

    csv.value += 'Name';

    var priceCol = -1;    
    var childs = header.children;
    for(var i = 3; i < childs.length; i++) {
        if(childs[i].style.display == 'none') continue;
        var text = childs[i].firstChild.firstChild.textContent;
        csv.value += ';' + text;
        if(priceCol < 0 && text.contains('€')) {
            priceCol = i;
        }
    }
    csv.value += '\n';
    
    var priceRegexp = /.*(\d+,[\d-][\d-]).*/;
    childs = table.children;
    for(var i = 1; i < childs.length; i++) {
        csv.value += childs[i].children[2].firstChild.textContent;
        
        var columns = childs[i].children;
        for(var j = 3; j < columns.length; j++) {
            if(columns[j].style.display == 'none') continue;
            var text = columns[j].textContent;
            if(j == priceCol) {
                priceRegexp.exec(text);
                text = RegExp.$1.replace('--', '00');
            }
            csv.value += ';' + text;
        }
        csv.value += '\n';
        
        csv.style.height = i*1.2 + 'em';
    }
}

window.hideCSV = function() {
    var text = document.getElementById('csvText');
    if(text) {
        text.parentNode.removeChild(text);
    }
    document.getElementById('btnExportCSV').setAttribute('onclick', 'showCSV()');
    exportBtn.setAttribute('value', 'Zeige CSV');
}

window.showCSV = function () {
    var csv = document.createElement('textarea');
    csv.setAttribute('id', 'csvText');
    csv.setAttribute('readonly', '');
    csv.style.width = '100%';
       
    exportCSV(csv);
    
    var exportBtn = document.getElementById('btnExportCSV');
    exportBtn.parentNode.insertBefore(csv, exportBtn.nextSibling);
    
    exportBtn.setAttribute('value', 'Verstecke CSV');
    exportBtn.setAttribute('onclick', 'hideCSV()')
}

window.hideColumn = function(col, node) {
    if(typeof(Storage)!=="undefined")  {
      // Yes! localStorage and sessionStorage support!
      // Some code.....
      var colName = "column" + String(col);
      localStorage[colName] = node.checked ? "on" : "off";
    }
    
    var tbody = document.getElementById('content_table').firstChild;
    size = tbody.children.length;
    if(col < 0) {
      var headers = document.getElementById('content_table_hdr');
      col = headers.children.length + col;
    }
    
    for(var i = 0; i < size; i++) {
        var row = tbody.children[i];
        var cell = row.children[col];
        cell.style.display = (!node.checked ? 'none' : '');
    }
}

var exportBtn = document.createElement('input');
exportBtn.setAttribute('id', 'btnExportCSV');
exportBtn.setAttribute('type', 'button');
exportBtn.setAttribute('value', 'Zeige CSV');
exportBtn.setAttribute('onclick', 'showCSV()');

var refNode = document.getElementById('cmp_reset');
refNode.parentNode.insertBefore(exportBtn, refNode.nextSibling);


window.addColumnSettings = function(col, name) {
    var btn = document.createElement('input');
    btn.setAttribute('type', 'checkbox');
    btn.setAttribute('checked', '');
    btn.setAttribute('onChange', 'hideColumn('+col+', this)');
    
    refNode = document.getElementById('xf_table').firstChild;
    
    var tr = document.createElement('tr');
    
    var ratingTh1 = document.createElement('th');
    var ratingTh2 = document.createElement('th');

    ratingTh1['width'] = '1';
    ratingTh2.setAttribute('class', 'xf_th');
    var txt = document.createTextNode(name);
    ratingTh2.appendChild(txt);
    ratingTh1.appendChild(btn);
    tr.appendChild(ratingTh1);
    tr.appendChild(ratingTh2);
    var emptyTd = document.createElement('td');
    emptyTd.setAttribute('class', 'xf_td');
    emptyTd.appendChild(document.createTextNode(""));
    tr.appendChild(emptyTd);
    
    var styleClass = refNode.lastChild.getAttribute('class');
    tr.setAttribute('class', styleClass.contains('odd') ? 'xf_tr_even' : 'xf_tr_odd');
    refNode.appendChild(tr);    
    
    if(typeof(Storage)!=="undefined")  {
      // Yes! localStorage and sessionStorage support!
      // Some code.....
      var colName = "column" + String(col);
      if(localStorage[colName] == "off") {
        btn.checked = false;
        hideColumn(col, btn);
      }
    }
}

addColumnSettings(-5, 'Bewertung');
addColumnSettings(-4, 'Einträge');
addColumnSettings(-3, 'Lieferzeit');
addColumnSettings(-1, 'Händler mit Bestpreis');
