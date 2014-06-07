// ==UserScript==
// @name          GcFilterLogs
// @namespace     http://www.sammyshp.de/
// @description   Filters logs in geocaching.com
// @author        Sven Karsten Greiner (SammysHP) <sven@sammyshp.de>
// @version       0.3
// @licence       http://creativecommons.org/licenses/by-nc-nd/3.0/
// @license       (CC) by-nc-nd
// @include       http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

var pulldown;

function init() {
    // insert pulldown-box and register event
    pulldown  = document.createElement('select');
    pulldown.setAttribute('size', 1);
    
    var option = document.createElement('option');
    option.innerHTML = 'all';
    pulldown.appendChild(option);
    
    var logTypes = document.evaluate("//span[@id='ctl00_ContentBody_lblFindCounts']/p/img",
                                     document,
                                     null,
                                     XPathResult.ORDERED_NODE_ITERATOR_TYPE,
                                     null);
    var logType;
    
    while (logType = logTypes.iterateNext()) {
        var option = document.createElement('option');
        option.innerHTML = logType.alt;
        pulldown.appendChild(option);
    }
    
    pulldown.addEventListener('change', filterLogs, false);
    
    var container = document.createElement('p');
    container.appendChild(pulldown);
    
    document.getElementById('ctl00_ContentBody_lblFindCounts').appendChild(container);
}

function filterLogs() {
    var logs = document.evaluate("//table[@class='LogsTable']/tbody/tr/td/div/div/strong/img",
                                 document,
                                 null,
                                 XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                 null);
    
    for (var i=0 ; i < logs.snapshotLength; i++) {
        if (logs.snapshotItem(i).title == pulldown.value
            || 'all' == pulldown.value
            || ('Didn' == logs.snapshotItem(i).title && "Didn't find it" == pulldown.value)) {
            logs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', '');
        } else {
            logs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'display: none');
        }
    }
}

// make it clean, use events ;)
window.addEventListener('load', init, false);