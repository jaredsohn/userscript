   1. // ==UserScript==
   2. // @name           Super Sig 1.0
   3.
   4. // @description    Signature by Mystique Ryu
   5. // @include        http://www.orkut.com/Scrap*
   6. // @include        http://www.orkut.com/CommMsg*
   7. // @author        Mystique Ryu 

   8. // ==/UserScript==
   9.
  10. var signature = "<br><br><div style='font-family: Modern; font-size: 17px; text-align: center;'>[b][navy]█• ﺍﷲ ιѕ gяєαт•█ \n";
  11.
  12. function sign () {
  13. document.getElementsByTagName("textarea").item(0).value = "[/i][/u][/b]\n\n\n" + signature ;
  14. clearInterval (signid)
  15. }
  16. signid = setInterval (sign,2000)