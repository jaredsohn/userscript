// ==UserScript==
// @name          GcShowAllLogs
// @namespace     http://www.sammyshp.de/
// @description   Insert a button to load all logs on geocaching.com or load them automatically.
// @author        Sven Karsten Greiner (SammysHP) <sven@sammyshp.de>
// @version       0.4
// @license       GPLv3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include       http://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

var currentPageIdx = 1;
var totalPages = 1;
var firstRecursion = true;
var num = 100;
var loadLink = null;

function init() {
    makeMenuToggle('loadAutomatically', false, 'Load all logs automatically');
    
    if (GM_getValue('loadAutomatically', false)) {
        loadAllLogs();
    } else {
        // Insert load-button
        loadLink = document.createElement('a');
        loadLink.innerHTML = "Load all logs";
        loadLink.setAttribute('style', 'cursor: pointer;');
        loadLink.addEventListener('click', loadAllLogs, false);
        unsafeWindow.$("#ctl00_ContentBody_lblFindCounts").next().append(document.createTextNode(" | "));
        unsafeWindow.$("#ctl00_ContentBody_lblFindCounts").next().append(loadLink);
    }
}

function makeMenuToggle(key, defaultValue, label) {
    value = GM_getValue(key, defaultValue);
    GM_registerMenuCommand(((value ? "[x] " : "[ ] ") + label), 
        function() {
            GM_setValue(key, !value);
    });
}

function loadAllLogs() {
    if (firstRecursion) {
        // disable original loader and show the loader-image
        unsafeWindow.currentPageIdx = 2;
        unsafeWindow.totalPages = 1;
        unsafeWindow.$("#cache_logs_table tfoot").show();
        
        // disable the load-link
        if (null != loadLink) {
            loadLink.removeEventListener('click', loadAllLogs, false);
            loadLink.setAttribute('style', 'color:#bbb;');
        }
        
        // we delete old logs, so it's easier to load 100 logs at once
        unsafeWindow.$("#cache_logs_table tbody").empty();
    }
    
    if (totalPages >= currentPageIdx) {
        GM_xmlhttpRequest({
            method: "GET",
            url: "/seek/geocache.logbook?tkn=" + unsafeWindow.userToken + "&idx=" + currentPageIdx + "&num=" + num + "&decrypt=" + unsafeWindow.decryptLogs,
            onload: function (response) {
                var jsonObject = JSON.parse(response.responseText);
                
                if (firstRecursion) {
                    firstRecursion = false;
                    totalPages = jsonObject.pageInfo.totalPages;
                }
                
                var newBody = unsafeWindow.$(document.createElement("TBODY"));
                unsafeWindow.$("#tmpl_CacheLogRow").tmpl(jsonObject.data,{includeAvatars: unsafeWindow.includeAvatars}).appendTo(newBody);
                newBody.find("a.tb_images").each(function() {
                    var $this = unsafeWindow.$(this);
                    $this.fancybox({
                        'type': 'image', 
                        'titlePosition': 'inside', 
                        'padding': 10,
                        titleFormat: function() { return $this.data('title'); } 
                    });
                });
                unsafeWindow.$("#cache_logs_table").append(newBody.children());
                
                currentPageIdx = jsonObject.pageInfo.idx + 1;
                
                // recursion!
                loadAllLogs();
            }
        });
    } else {
        // hide loader-image
        unsafeWindow.$("#cache_logs_table tfoot").hide();
    }
}

window.addEventListener('load', init, false);
