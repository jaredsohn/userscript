   1. // ==UserScript==
   2. // @name               Auto Join Community on Orkut
   3. // @namespace         http://www.devilsworkshop.org/2006/10/29/autojoin-communities-on-orkut/
   4. // @description     Automatically join Communities
   5. // @include            http://www.orkut.com/*
   6. // @exclude    http://www.orkut.com/Communities.aspx
   7. // @exclude    http://www.orkut.com/Home.aspx
   8. // ==/UserScript==
   9.
  10. (function() {
  11. var i=document.getElementsByTagName('a');
  12. for (var j=i.length-1; j>1; j--) {
  13.     var linkdata =  i[j].getAttribute("href");
  14.     var linkparts = linkdata.split("?");
  15.     if (linkdata.match("Community.") == "Community." ) {
  16.         var commjoinlink = document.createElement("a");
  17.         commjoinlink.href="http://www.orkut.com/CommunityJoin.aspx"+"?cmm=49759536"+linkparts[1];
  18.         commjoinlink.appendChild(document.createTextNode(" [J]"));
  19.
  20.         i[j].parentNode.insertBefore( commjoinlink,i[j].nextSibling);
  21.         }
  22.     }
  23. })();
  24.
  25.
  26. window.addEventListener(
  27.     'load',
  28.     function() {
  29.     if ( window.location.href.match("CommunityJoin") == ("CommunityJoin") ) {
  30.         window.location.href = "javascript: _submitForm(document.evaluate('/html/body/div[4]/div[3]/table/tbody/tr[2]/td[1]/div[4]/form/span[1]/a', document, null, 7 , null).snapshotItem(0),'join');"
  31.         }
  32.     },
  33.     true);