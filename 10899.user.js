// ==UserScript==
// @name           Orkut : Add A Friend In One Click
// @namespace      http://www.orkut.com/Profile.aspx?uid=14982845311889996953
// @description    Add Anyone In Orkut As A Friend In One Click .
# This script will allow you to add a friend with just a click of button.
# When you install this script, you will see a [F] beside every user on Orkut.
# When you click on this [F], you will dierectly taken to the confirmation screen.
# Press YES to accept as friend.
// @include        http://www.orkut.com*
// @include        http://orkut.com*
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Profile.") == "Profile." ) {
        var friendlink = document.createElement("a");
        friendlink.href="http://www.orkut.com/FriendAdd.aspx"+"?"+linkparts[1];
        friendlink.appendChild(document.createTextNode("[F]"));

        i[j].parentNode.insertBefore( friendlink ,i[j].nextSibling);
        }
    }
})();