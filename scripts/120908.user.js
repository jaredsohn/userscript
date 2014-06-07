// ==UserScript==
// @name           Omit Hamine
// @namespace      http://friendsoftom.com
// @description    Ignores all posts by Zach of Mit Hamine
// @version        0.1
// @date           12-19-2011
// @author         Cutout
// ==/UserScript==


var smf_url = 'http://www.friendsoftom.com/forum/index.php';

var banned = new Array();
banned.push(4268); 

for (var i = 0; i < banned.length; i++) {
    var uid = banned[i];
    var expression = "id('forumposts')/form[1]/" + 
                "div[starts-with(@class, 'windowbg') " +
                "and descendant::a[contains(@href, 'u=" + uid + "')]]";
    var nodes = document.evaluate(expression, document, null, 
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var j = 0; j < nodes.snapshotLength; j++) {
        var node = nodes.snapshotItem(j);
        node.style.display = 'none';
    }
}