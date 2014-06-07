// ==UserScript==
// @name           orkut one click add to friend list
// @namespace      http://rb286.blogspot.com
// @description    just one click to add someone to ur friend-list
// @include        http://*.orkut.com*
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Profile.aspx") == "Profile.aspx" ) {
        var friendlink = document.createElement("a");

	//if(location.href.search("UniversalSearch.aspx") != -1 ) {
		//linkparts = linkparts[1].split("%3F");
	//}

        friendlink.href="http://www.orkut.com/FriendAdd.aspx"+"?"+linkparts[1];
        friendlink.appendChild(document.createTextNode("[F]"));

        var listlink = document.createElement("a");
        listlink.href="http://www.orkut.com/FriendsList.aspx"+"?"+linkparts[1];
        listlink.appendChild(document.createTextNode("[L]"));

        i[j].parentNode.insertBefore( friendlink ,i[j].nextSibling);
        i[j].parentNode.insertBefore( listlink ,i[j].nextSibling);
        }
    }
})();


