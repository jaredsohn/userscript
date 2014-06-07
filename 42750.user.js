// ==UserScript==
// @name           Realfree - Sidereel Script
// @shortname      RSS
// @include        http://*.sidereel.*/*
// @namespace      Created by Realfree. Support For The Kryzan Clan.
// @description    Sidereel Script
// @version        0.0.3
// @license        RF RSS
// @copyright      Realfree
// @changelog      Removed leaderboard1,Removed module
// ==/UserScript==
function checkForUpdates(){
    var scriptNumber = '42750';
    var scriptName = /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1];
    var currentVersion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1];
    if(date.getDate()+''+date.getMonth() == GM_getValue('lastUpdatecheck'))
        return;
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://userscripts.org/scripts/source/'+scriptNumber+'.meta.js',
        onload: function(e) {
            var lastVersion = /\/\/\s*@version\s*(.*)\s*\n/i.exec(e.responseText)[1];
            var lastChanges = /\/\/\s*@changelog\s*(.*)\s*\n/i.exec(e.responseText)[1];
            lastChanges = lastChanges.split('|');
            for(var x in lastChanges){
                lastChanges[x]='\n  '+lastChanges[x];
            }
            if (!lastVersion.match(currentVersion)){
                if(confirm('A new version of '+scriptName+' is available.\tDo you want to update?\n\nChangeLog (v.'+lastVersion+')'+lastChanges)){
                    GM_openInTab('http://userscripts.org/scripts/show/'+scriptNumber);
                    location.href = 'http://userscripts.org/scripts/source/'+scriptNumber+'.user.js';
                    return;
                }
                GM_setValue("lastUpdatecheck",date.getDate()+''+date.getMonth());
            }
        }
    });
}
//---------------------------------------------------------------Start Script------------------------
var id = document.getElementById('leaderboard1');
if (id) {
    id.parentNode.removeChild(id);
}
var targetNode = document.evaluate(
		"//*[@class='module']", document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
