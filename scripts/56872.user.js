// ==UserScript==
// @name           Userscripts: Show row index
// @version        1.0.1
// @author         danmana
// @namespace      http://userscripts.org/users/103443
// @description    Shows the row index in tables at userscripts.org
// @include        http://userscripts.org*
// @exclude        http://userscripts.org/topics*
// ==/UserScript==

window.addEventListener('load', show_index, false);

function show_index(){
    var tables = getPatternResult('//table[contains(@class,"wide")]');
    if (tables == null) 
        return;//there are no tables on this page
    var rowsPerPage = 0;
    if (document.location.href.match('http://userscripts\.org/(tags|forums|groups|users/.*/favorites|scripts/discuss)')) 
        rowsPerPage = 30;
    else if (document.location.href.match('http://userscripts\.org/scripts/search')) 
        rowsPerPage = 20;
    else if (document.location.href.match('http://userscripts\.org/scripts')) 
        rowsPerPage = 25;
    else if (document.location.href.match('http://userscripts\.org/users/.*/scripts')) 
        rowsPerPage = 50;
    else 
        rowsPerPage = 0;//an unknown page...
    var pagination = getPatternResult('//div[@class="pagination"]/span[@class="current"]/text()');
    var pageNumber = 0;
    if ((pagination != null) && (pagination.snapshotLength > 0)) 
        pageNumber = parseInt(pagination.snapshotItem(0).data) - 1;
    
    for (var i = 0; i < tables.snapshotLength; i++) {
        var rows = getPatternResult('tbody/tr', tables.snapshotItem(i));
        for (var j = 0; j < rows.snapshotLength; j++) {
            var tr = rows.snapshotItem(j);
            if (j == 0) {
                var th = document.createElement('th');
                th.className = 'tiny';
                th.innerHTML = 'Index';
                tr.insertBefore(th, tr.firstChild);
            }
            else {
                var td = document.createElement('td');
                td.className = 'inv ca';
                td.innerHTML = pageNumber * rowsPerPage + j;
                tr.insertBefore(td, tr.firstChild);
            }
            
        }
    }
}

/**
 * @param {String} pattern The pattern to search for.
 * @param {Node} context The context in which to evaluate the XPath expression.
 * @return {XPathResult} The result of the search.
 */
function getPatternResult(pattern, context){
    if (context == null) 
        context = document;
    return document.evaluate(pattern, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

