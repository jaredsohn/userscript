// ==UserScript==
// @name           Activity Meter Boost
// @namespace      http://www.dmwit.com
// @description    Change the activity scale from 0-2 to 1-3
// @include        *dragongoserver.net/userinfo.php*
// @include        *dragongoserver.net/users.php*
// ==/UserScript==

function xpath(query, node) {
    if(node == null) node = document;
    return document.evaluate(query, node, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpathSingle(query, node) { return xpath(query, node).snapshotItem(0); }

function addStar(td) {
    var activityCount = xpath("img", td).snapshotLength;
    if(activityCount == 0) {
        var newStar = document.createElement('img');
        newStar.align   = 'middle';
        newStar.alt     = '*';
        newStar.src     = "data:image/gif,GIF89a%0D%00%0D%00%E3%09%00%E5%E5%E5%A0%A0%A0%97%97%97%BE%BE%BE%D1%D1%D1%AA%AA%AA%C7%C7%C7%DB%DB%DB%B4%B4%B4%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%0D%00%0D%00%00%04L%F0%C9%07%82%183K%22D%D1%CF%60%3CG%87P%06%10vX!%1C%95%10%3CH'%10%C6lu0%B2%FB5%CF(c%E8%14%0E%19%80%C1'%93%15%10)%9A%0D%87(uf%C1%93%EB%C1%E9P%10%18%EB%88P%20h%BA'%90%C4%8A%C9D%00%00%3B";
        td.appendChild(newStar);
    } else {
        td.appendChild(td.childNodes[0].cloneNode(true));
    }

    for(var i = 0; i < td.childNodes.length; i++)
        if(td.childNodes[i].nodeName == "#text") {
            td.removeChild(td.childNodes[i]);
            i--;
        }
}

if(/userinfo/.test(document.URL))
    addStar(xpathSingle("//table[@id='userInfos']//td[@class='Rubric' and text()='Activity']/parent::tr/td[2]"));
else if(/users/.test(document.URL)) {
    headerRow = xpath("//table[@id='userTable']//tr/th[1]/parent::tr/th");
    for(i = 0; i < headerRow.snapshotLength; i++)
        if(headerRow.snapshotItem(i).textContent == 'Activity') {
            activities = xpath("//table[@id='userTable']//tr[substring(@class,1,3)='Row']/td[" + String(i+1) + "]");
            for(j = 0; j < activities.snapshotLength; j++)
                addStar(activities.snapshotItem(j));
        }
}
