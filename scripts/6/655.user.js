
// BetterDir
// version 1.0 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that makes Apache 1.3-style
// directory listings prettier.  Test page:
// http://diveintomark.org/projects/greasemonkey/
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BetterDir", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BetterDir
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   make Apache 1.3-style directory listings prettier
// @include       *
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
    function addGlobalStyle(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    }

    var titles, pre, headers, table, caption;
    var tr0, header, i, j, a, nHeaders, th, pretext;
    var row, rows, nRows, odd, rest, restcols, tr, td;
    var nColumns, rightAlign, col, temp;
    var footer, footertext;
    
    titles = document.getElementsByTagName('title');
    // if page has no title, bail
    if (!titles.length) { return; }
    // if page title does not start with "Index of /", bail
    if (!(/^Index of \//.test(titles[0].textContent))) { return; }
    
    // If we can't find the PRE element, this is either
    // not a directory listing at all, or it's an
    // Apache 2.x listing with fancy table output enabled
    pre = document.evaluate(
        "//pre",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null).singleNodeValue;
    if (!pre) { return; }
    
    // find the column headers, or bail
    headers = document.evaluate(
        "//a[contains(@href, '?')]",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null);
    if (!headers) { return; }
    
    // Tables aren't evil, they're just supposed to be used for tabular data.
    // This is tabular data, so let's make a TABLE element
    table = document.createElement('table');
    // give the table a summary, for accessibility
    table.setAttribute('summary', 'Directory listing');
    caption = document.createElement('caption');
    // the "title" of the table should go in a CAPTION element
    // inside the TABLE element, for semantic purity
    caption.textContent = document.evaluate(
        "//head/title",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    table.appendChild(caption);
    
    tr0 = document.createElement('tr');
    nHeaders = 0;
    for (i = 0; i < headers.snapshotLength; i += 1) {
        header = headers.snapshotItem(i);
        // column headers go into TH elements, for accessibility
        th = document.createElement('th');
        a = document.createElement('a');
        a.href = header.href;
        a.textContent = header.textContent;
        // give each of the column header links a title,
        // to explain what the hell they do (it took me 5 years
        // to stumble onto this sorting feature -- 
        // titles might've helped, ya think?)
        a.title = "Sort by " + header.textContent.toLowerCase();
        th.appendChild(a);
        tr0.appendChild(th);
        nHeaders += 1;
    }
    table.appendChild(tr0);

    pretext = pre.innerHTML;
    if (/<hr/.test(pretext)) {
        pretext = pretext.split(/<hr.*?>/)[1];
    }
    rows = pretext.split(/\n/);
    nRows = rows.length;
    odd = true;
    for (i = 0; i < nRows; i += 1) {
        row = rows[i];
        row = row.replace(/^\s*|\s*$/g, '');
        if (!row) { continue; }
        if (/\<hr/.test(row)) { continue; }
        temp = row.split(/<\/a>/);
        a = temp[0] + '</a>';
        if (/<img/.test(a)) {
            a = a.split(/<img.*?>/)[1];
        }
        rest = temp[1];
        restcols = rest.split(/\s+/);

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.innerHTML = a;
        tr.appendChild(td);
        
        nColumns = restcols.length;
        rightAlign = false;
        for (j = 1 /* really */; j < nColumns; j += 1) {
            col = restcols[j];
            if (/\d\d:\d\d/.test(col)) {
                td.innerHTML = td.innerHTML + ' ' + col;
            } else {
                td = document.createElement('td');
                td.innerHTML = restcols[j];
                if (rightAlign) {
                    td.setAttribute('class', 'flushright');
                }
                tr.appendChild(td);
            }
            rightAlign = true;
        }
        while (nColumns <= nHeaders) {
            tr.appendChild(document.createElement('td'));
            nColumns += 1;
        }
        
        // zebra-stripe table rows, from
        // http://www.alistapart.com/articles/zebratables/
        // and http://www.alistapart.com/articles/tableruler/
        tr.style.backgroundColor = odd ? '#eee' : '#fff';
        tr.onmouseover = function() { this.className = 'ruled'; return false; };
        tr.onmouseout = function() { this.className = ''; return false; };
        table.appendChild(tr);

        odd = !odd;
    }

    // copy address footer -- probably a much easier way to do this,
    // but it's not always there (depends on httpd.conf options)
    footertext = document.evaluate(
        "//address",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;
    if (footertext) {
        footer = document.createElement('address');
        footer.innerHTML = footertext;
    }

    // this next line feels very zen-like
    document.body.innerHTML = '';
    
    // GreaseMonkey mythology states that wholesale DOM changes should
    // be done on load, rather than in the GM script itself.  I don't know
    //  if this is still true, or indeed if it was ever true, but
    // a little chicken sacrifice never hurt anyone except the chicken.
    window.addEventListener('load', 
        function() {
            document.body.appendChild(table);
            if (footer) {
                document.body.appendChild(footer);
            }
        },
        true);

    // now that everything is semantic and accessible,
    // make it a little prettier too
    addGlobalStyle(
'table {' +
'  border-collapse: collapse;' +
'  border-spacing: 0px 0px 5px 0px;' +
'  margin-top: 1em;' +
'  width: 100%;' +
'}' +
'caption {' +
'  text-align: left;' +
'  font-weight: bold;' +
'  font-size: 180%;' +
'  font-family: Optima, Verdana, sans-serif;' +
'}' +
'tr {' +
'  padding-bottom: 5px;' +
'}' +
'td, th {' +
'  font-size: medium;' +
'  text-align: right;' +
'}' +
'th {' +
'  font-family: Optima, Verdana, sans-serif;' +
'  padding-right: 10px;' +
'  padding-bottom: 0.5em;' +
'}' +
'th:first-child {' +
'  padding-left: 20px;' +
'}' +
'td:first-child,' +
'td:last-child,' +
'th:first-child,' +
'th:last-child {' +
'  text-align: left;' +
'}' +
'td {' +
'  font-family: monospace;' +
'  border-bottom: 1px solid silver;' +
'  padding: 3px 10px 3px 20px;' +
'  border-bottom: 1px dotted #003399;' +
'}' +
'td a {' +
'  text-decoration: none;' +
'}' +
'tr.ruled {' +
'  background-color: #ffeecc ! important;' +
'}' +
'address {' +
'  margin-top: 1em;' +
'  font-style: italic;' +
'  font-family: Optima, Verdana, sans-serif;' +
'  font-size: small;' +
'  background-color: transparent;' +
'  color: silver;' +
'}');
})();

//
// ChangeLog:
// 2005-07-08 - 1.0 - MAP - added license block
// 2005-04-21 - 0.9 - MAP - linted
// 2005-04-21 - 0.8 - MAP - changed addGlobalStyle to a normal function
// 2005-04-18 - 0.7 - MAP - tidy code
// 2005-04-15 - 0.6 - MAP - changed addGlobalStyle function to check for <head> element
// 2005-04-14 - 0.5 - MAP - older versions of Apache don't insert META tag, so check for page title instead
//
