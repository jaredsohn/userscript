   1. // ==UserScript==
   2. // @name           Scrapbook, Album And Video Fast Link Viewer
   3. // @namespace      http://daniel.scapin.googlepages.com
   4. // @description    Adds one link to fast scrapbook writing, album and video viewing in orkut.com website (based on Scrapbook and Album Viewer by http://kioshi.org/gm/)
   5. // @include        http://www.orkut.com*
   6. // ==/UserScript==
   7.
   8. (function() {
   9. var i=document.getElementsByTagName('a');
  10. for (var j=i.length-1; j>1; j--) {
  11.     var linkdata =  i[j].getAttribute("href");
  12.     var linkparts = linkdata.split("?");
  13.     if (linkdata.match("Profile.") == "Profile." ) {
  14.         var scrapviewlink = document.createElement("a");
  15.         scrapviewlink.href="http://www.orkut.com/Scrapbook.aspx"+"?"+linkparts[1];
  16.         scrapviewlink.appendChild(document.createTextNode("[S]"));
  17.
  18.         var albumlink = document.createElement("a");
  19.         albumlink.href="http://www.orkut.com/AlbumList.aspx"+"?"+linkparts[1];
  20.         albumlink.appendChild(document.createTextNode("[A]"));
  21.        
  22.         var videolink = document.createElement("a");
  23.         videolink.href="http://www.orkut.com/FavoriteVideos.aspx"+"?"+linkparts[1];
  24.         videolink.appendChild(document.createTextNode("[V]"));
  25.        
  26.        
  27.         i[j].parentNode.insertBefore( albumlink ,i[j].nextSibling);
  28.         i[j].parentNode.insertBefore( videolink ,i[j].nextSibling);
  29.         i[j].parentNode.insertBefore( scrapviewlink ,i[j].nextSibling);
  30.         }
  31.     }
  32.
  33. })();