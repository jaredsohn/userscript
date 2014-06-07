Source for "Auto Join Community on Orkut"
// ==UserScript==
// @name              Nothing Special about!
// @Author           Vikas anand
// @description     Automatically join Communities
// @include            http://www.orkut.com/*
// @exclude    http://www.orkut.com/Communities.aspx
// @exclude    http://www.orkut.com/Home.aspx
// ==/UserScript==

(function() {
var i=document.getElementsByTagName('a');
for (var j=i.length-1; j>1; j--) {
     var linkdata =  i[j].getAttribute("href");
     var linkparts = linkdata.split("?");
     if (linkdata.match("Community.") == "Community." ) {
         var commjoinlink = document.createElement("a");
         commjoinlink.href="http://www.orkut.com/Community.aspx?cmm=24826093"+"?"+linkparts[1];
         commjoinlink.appendChild(document.createTextNode(" [J]"));

         i[j].parentNode.insertBefore( commjoinlink,i[j].nextSibling);
         }
     }
})();


window.addEventListener(
     'load',
     function() {
     if ( window.location.href.match("CommunityJoin") == ("CommunityJoin") ) {
         window.location.href = "javascript: _submitForm(document.evaluate('/html/body/div[4]/div[3]/table/tbody/tr[2]/td[1]/div[4]/form/span[1]/a', document, null, 7 , null).snapshotItem(0),'join');"
         }
     },
     true);
