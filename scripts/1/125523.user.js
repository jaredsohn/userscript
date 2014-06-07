// ==UserScript==
// @name           WF.TableExport.Blueprints
// @namespace      sk.seko
// @description    Exports blueprints to CSV
// @include        http://*.war-facts.com/blueprints.php?type=*
// @version        1.0
// ==/UserScript==

// CSV value separator
var CSV_SEPARATOR = ';'
// Window dimenstion and position
var WIN_DIM = 'width=900,height=600,left=100,top=100';
// Window attributes/properties
var WIN_ATTRS = 'location=no,status=no,menubar=no,titlebar=no,directories=no,copyhistory=no,scrollbars=yes,toolbar=no';
// Button/link name for CSV export
var CSV_LINK_NAME = '[CSV]';

// remove all colons and parse integer from string
function wfParseInt(s) {
    return parseInt(s.replace(/,/g, ''), 10);
}

// descend to text element
function wfText(s) {
    while (s.nodeName != '#text') {
        s = s.childNodes[0];
    }
    return s;
}

// find table with blueprints and create a link for csv export
window.GM_csv_blueprint_exporter = function() {
    var table = document.evaluate("//form[@action='/blueprints.php']/table",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (table) {
        unsafeWindow.GM_csv_blueprint_export_now = function() {
            exportToCSV(table);
        }
        var exCsv = document.createElement('a');
        exCsv.setAttribute('href', 'javascript:GM_csv_blueprint_export_now()');
        exCsv.setAttribute('id', 'csvexportblueprints');
        exCsv.title = 'Exports table to CSV format; '
         + 'copy and paste it to a .csv file and open it with your favourite spreadsheet application';
        exCsv.appendChild(document.createTextNode(CSV_LINK_NAME));
        table.rows[0].cells[2].appendChild(exCsv);
    }
}

// parse one blupeprint to array of values
function exportRow(row, number, isHeader) {
    var content = [];
    // bp header
    if (isHeader) {
        content.push('#');
        content.push('Name');
        content.push('Id');
        content.push('Inventor');
        content.push('Type');
    } else {
        var hdr = row.cells[1];
        content.push(number);
        content.push(hdr.childNodes[0].textContent);
        content.push(hdr.childNodes[1].textContent.replace(/[^0-9]/g,''));
        content.push(hdr.childNodes[4].textContent.replace(/^Inventor:\s*/, ''));
        content.push(hdr.childNodes[6].textContent);
     }
    // bp params
    var bp = row.cells[1].getElementsByTagName('table')[0];
    for (var i = 0; i < bp.rows.length; ++i) {
        var isGenerated = bp.rows[i].style.backgroundColor;
        if (!isGenerated) {
            if (isHeader) {
                content.push(bp.rows[i].cells[0].innerHTML.replace(/:\s*$/, ''));
            } else {
                content.push(wfParseInt(bp.rows[i].cells[1].innerHTML));
            }
        }
      }
    // prices & ores
    var ores = row.cells[2].getElementsByTagName('table')[0];
    for (var i = 0; i < 11; i++) {
        if (isHeader) {
            var orenum = wfText(ores.rows[i].cells[0].childNodes[0]);
            var v = orenum.nodeValue.replace(/:\s*$/, '');
            content.push(v);
        } else {
            var orenum = wfText(ores.rows[i].cells[1].childNodes[0]);
            content.push(wfParseInt(orenum.nodeValue));
        }
    }
    return content;
}

// parse whole table to array of lines
function exportTable(table) {
    var content = [];
    var num = 1;
    for (var r = 2; r < table.rows.length; ++r) {
        if (table.rows[r].cells.length >= 3) {
            if (r == 2) {
                // create table header first
                content.push(exportRow(table.rows[r], num, true));
            }
            content.push(exportRow(table.rows[r], num, false));
            ++num;
        } else {
            GM_log('Not a blueprint? row #' + r);
        }
    }
    return content;
}

// exports data to csv format
function exportToCSV(table) {
    var content = exportTable(table);
    // create csv
    var csv = '';
    for (var row = 0; row < content.length; ++row) {
      for (var col = 0; col < content[row].length; ++col) {
        var val = content[row][col];
        if (typeof val === 'string' && val.indexOf(CSV_SEPARATOR) != -1) {
            val = '"' + val + '"';
        }
        if (col != 0) csv += CSV_SEPARATOR;
        csv += val;
      }
      csv += '</br>';
    }
    var title = table.rows[1].cells[1].textContent;
    var doc = '<HTML><HEAD><TITLE>' + title + '</TITLE></HEAD>';
    doc += '<BODY>' + csv + '</BODY></HTML>';
    var win = window.open('', 'csvblueprints', WIN_ATTRS + ',' + WIN_DIM);
    win.document.getElementsByTagName('BODY')[0].innerHTML = '';
    win.document.writeln(doc);
    win.focus();
}

// register script
window.addEventListener("load", GM_csv_blueprint_exporter, false);
