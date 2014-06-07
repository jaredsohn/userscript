Source for "Orkut Pics Enlarger!"

   1. // ==UserScript==
   2. // @name           Orkut Pics Enlarger!
   3. // @description    This one basically replaces, all small pictures in orkut with their bigger counterpart!
   4. It does not resizes pictures locally BUT fetches bigger picture from orkut server automatically!
   5. // @include        http://*.orkut.com/*
   6. // ==/UserScript==
   7.
   8.
   9. (function() {
  10.         var i=document.getElementsByTagName('img');
  11.         for (var j=i.length-1; j>1; j--) {
  12.             var linkdata =  i[j].getAttribute("src");
  13.             if (linkdata.match("small") == "small" ) {
  14.                 linkdata=linkdata.replace(/small/,'medium');
  15.                 //GM_log(linkdata);
  16.                 var newi = document.createElement ('img');
  17.                 newi.src = linkdata;
  18.                 i[j].parentNode.replaceChild( newi ,i[j]);
  19.             }
  20.          }
  21.
  22.     })();
  23.
  24. //CSS fix needed here on window OnLoad event