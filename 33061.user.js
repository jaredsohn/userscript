// ==UserScript==
// @name           lj-cut text in the inbox
// @namespace      http://www.afunamatata.com/greasemonkey/
// @description    Show lj-cut text when viewing messages in the inbox
// @include        http://www.livejournal.com/inbox*
// ==/UserScript==

var inbox = document.getElementById('all_Body');
var cutAnchored = document.evaluate(".//td[@class='item']//a[@name = 'cutid1']", inbox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var inboxItems = new Object();

for(var i = 0; i < cutAnchored.snapshotLength; i++)
{
    var inboxItem = cutAnchored.snapshotItem(i).parentNode;
    var links = inboxItem.getElementsByTagName("a");
    var entryLink = links[links.length-1].href;
    fetchCutText(entryLink);
    inboxItems[entryLink] = inboxItem;
}


function fetchCutText(entryLink)
{

    // find date page
    GM_xmlhttpRequest({
        method: "GET",
        url: entryLink +"?mode=reply&format=light",
        onload: function(details) {
            var journalLink = entryLink.split("/").slice(0,-1).join('/');
            var dateRegex = new RegExp(journalLink+"/\\d{4}/\\d{2}/\\d{2}/");
            var dayLink = details.responseText.match(dateRegex);
            fetchCutTextFromDayPage(dayLink,entryLink);
        }
    });
}

function fetchCutTextFromDayPage(dayLink,entryLink)
{
    GM_xmlhttpRequest({
        method: "GET",
        url: dayLink+"",
        onload: function(details) {
            var cutRegex = new RegExp(entryLink+"#cutid(\\d+)\">(.*?)</a>","g");
            var cuts = new Object();
            var arr;            
            while((arr=cutRegex.exec(details.responseText))) {
                cuts["cutid"+arr[1]] = arr[2];
            }
            
            showCutText(entryLink,cuts);
        }
    });
}

function showCutText(entryLink,cuts) {
    var inboxItem = inboxItems[entryLink];
    var anchors = document.evaluate(".//a[contains(@name,'cutid')]", inboxItem, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    
    for(var i = 0; i < anchors.snapshotLength; i++) {
        var anchor = anchors.snapshotItem(i);
        var b = document.createElement("b");
        anchor.appendChild(b);        
        b.appendChild(document.createTextNode("( lj-cut text: " + cuts[anchor.name] + " )")); 
    }
}
