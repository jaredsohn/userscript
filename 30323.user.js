// ==UserScript==
// @name           GayRomeo_Msg_Shortcuts
// @namespace      http://www.stillewasser.info/GayRomeoMods
// @include        http*://www.gayromeo.com/*/main/personalList/PersonalListPage.php?*show=msg*
// @include        http*://www.planetromeo.com/*/main/personalList/PersonalListPage.php?*show=msg*
// @description    Add access keys to incoming messages
// @version        0.1.0
// ==/UserScript==

var msgList = document.evaluate(
    "//div[@class='row']/a", 
    document, 
    null, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

var pos = msgList.snapshotLength - 1;
var num = 1;

while (pos >= 0 && num <= 9) {
    msgList.snapshotItem(pos).setAttribute("accesskey", num);
    pos--;
    num++;
}
