// ==UserScript==
// @name           	Auto Join Community on Orkut
// @namespace     	http://www.devilsworkshop.org/2006/10/29/autojoin-communities-on-

orkut/
// @description 	Automatically join Communities
// @include        	http://www.orkut.com/*
// @exclude	http://www.orkut.com/Communities.aspx
// @exclude	http://www.orkut.com/Home.aspx
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("Community.") == "Community." ) {
        var commjoinlink = document.createElement("a");
        commjoinlink.href="http://www.orkut.com/CommunityJoin.aspx"+"?"+linkparts[1];
        commjoinlink.appendChild(document.createTextNode(" [J]"));

        i[j].parentNode.insertBefore( commjoinlink,i[j].nextSibling);
        }
    }
})();
