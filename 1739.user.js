Ã¯Â»Â¿// ==UserScript==
// @name           LastPageInTopic
// @namespace      http://sergim.net/greasemonkey
// @description    Adds a direct link to the last page of a topic in Orkut forums. Based on Alex Laier's FastScrapBook
// @include        http://www.orkut.com/Community*
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
    var linkdata =  i[j].getAttribute("href");
    var linkparts = linkdata.split("?");
    if (linkdata.match("CommMsgs.") == "CommMsgs." ) {
        var lastpagelink = document.createElement("a");
        lastpagelink.href="http://www.orkut.com/CommMsgs.aspx"+"?"+linkparts[1]+"&na=2";
        lastpagelink.appendChild(document.createTextNode("[L]"));

        i[j].parentNode.insertBefore( lastpagelink ,i[j].nextSibling);
        }
    }

})();