// ==UserScript==
// @name           Wikipedia - semi advanced search everywhere
// @namespace      jasdfwaaweajasasdfsdssfaew
// @description    this will add some of the check boxes to the search box as seen on the advanced search page
// @version        1.0
// @include        https://en.wikipedia.org*
// @include        http://en.wikipedia.org*
// @grant          none
// @downloadURL    http://userscripts.org/scripts/source/170540.user.js
// @updateURL      http://userscripts.org/scripts/source/170540.meta.js
// @homepageURL    http://userscripts.org/scripts/show/170540
// @icon           data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%04%03%00%00%00%81Tg%C7%00%00%000PLTE%05%03%05%88%87%88III%C8%C8%C8%A6%A6%A6'''kkk%E8%E8%E8%1A%19%1A%9A%9A%9AVVV%DA%D9%DA%B8%B8%B8767yyy%FB%FD%FBwL~%B1%00%00%00%09pHYs%00%01%CD%5E%00%01%CD%5E%01%B8r%93Z%00%00%013IDATx%5E%5D%D1%A1O%C3%40%14%06%F0%0FX%3A%8AX%10%84%20H%86%C0%2F%FC%01d%02L%D5Ucv%09a%19%06%02%8E%20ZI%26%08%01%05%82%1B%86L%D1%04%87a%18%82%1C%0A%81%D9%04A%91%90.%D0cl%EC%D1%F5.%85%DDg%DE%E5'%DE%97%DC%03%E9%E4%F5La%DB%84u%136M(%8F%C2m%B0q%E1%FD%83e%94*%98j%A4%10%01%01%F7a%A7P%C3a%91%BF%02%EF%1A%22X%1E%F1%FC5l%0Dw%10D%3C%20%8E%86%027%B7W%24%5E%FA%E8%20H%A0%8F%92%BC%24%9E%7D%91%C8%26%F0%0DA%3B%C4s-%E2c%09%7C%1D%9C%D7%C1%DAq%C5%FDx%0Cr%A9%02%00%99-%8A%B3%1F%C3lYe%E6%D4q%9CU%C7%01%A9%84g%18%E6%E9d%B8%E3%D9%23j%8B%1A%D6%EAU%DD%C2%E4%15D%F4%40m%D5%D2E!%7C%03%FBd%D2%9FH%80%7C%BB%DB%83%E8%CD%0F%D0R0%3D%D9%24%9F%91%3CBQA%07%19Z%104%80E%0A%A4%8BE%CEn%5C%144%D0.%E0%8BGX%7F%7F%3A%17%03%E2M)%D0%B1%BBRm%8E%DC%E5G%18%87%8AL%08M%E83%FD%F8%05%F9%2C%7Dn%ED%FBd%ED%00%00%00%00IEND%AEB%60%82

// ==/UserScript==

checkboxes='<span style="color:#111;margin:2px;margin-left:0px;border-left:1px solid #97c7e9;border-right:1px solid #97c7e9;border-top:1px solid #97c7e9;padding:4px 1px 0px 1px;font-size:70%;background-color:#EAF2F8;"> <input name="ns0" value="1" checked="checked" id="mw-search-ns0" type="checkbox"> Articles '+
'<input name="ns1" value="1" id="mw-search-ns1" type="checkbox"> T </span><span style="color:#111;margin:2px;margin-left:-1px;border-left:1px solid #97c7e9;border-right:1px solid #97c7e9;border-top:1px solid #97c7e9;padding:4px 1px 0px 1px;font-size:70%;background-color:#EAF2F8;"> '+
'<input name="ns2" value="1" id="mw-search-ns2" type="checkbox"> User '+
'<input name="ns3" value="1" id="mw-search-ns3" type="checkbox"> T </span><span style="color:#111;margin:2px;margin-left:-1px;border-left:1px solid #97c7e9;border-right:1px solid #97c7e9;border-top:1px solid #97c7e9;padding:4px 1px 0px 1px;font-size:70%;background-color:#EAF2F8;">'+
'<input name="ns4" value="1" id="mw-search-ns4" type="checkbox"> WP '+
'<input name="ns5" value="1" id="mw-search-ns5" type="checkbox"> T </span><br>'+
//'<input name="ns6" value="1" id="mw-search-ns6" type="checkbox"> File '+
//'<input name="ns7" value="1" id="mw-search-ns7" type="checkbox"> T '+
//'<input name="ns8" value="1" id="mw-search-ns8" type="checkbox"> MediaWiki '+
//'<input name="ns9" value="1" id="mw-search-ns9" type="checkbox"> T '+
//'<input name="ns10" value="1" id="mw-search-ns10" type="checkbox"> Template '+
//'<input name="ns11" value="1" id="mw-search-ns11" type="checkbox"> T <br>'+
//'<input name="ns12" value="1" id="mw-search-ns12" type="checkbox"> Help '+
//'<input name="ns13" value="1" id="mw-search-ns13" type="checkbox"> T '+
//'<input name="ns14" value="1" id="mw-search-ns14" type="checkbox"> Category '+
//'<input name="ns15" value="1" id="mw-search-ns15" type="checkbox"> T '+
//'<input name="ns100" value="1" id="mw-search-ns100" type="checkbox"> Portal '+
//'<input name="ns101" value="1" id="mw-search-ns101" type="checkbox"> T '+
//'<input name="ns108" value="1" id="mw-search-ns108" type="checkbox"> Book '+
//'<input name="ns109" value="1" id="mw-search-ns109" type="checkbox"> Book talk '+
//'<input name="ns446" value="1" id="mw-search-ns446" type="checkbox"> Education Program '+
//'<input name="ns447" value="1" id="mw-search-ns447" type="checkbox"> Education Program talk '+
//'<input name="ns710" value="1" id="mw-search-ns710" type="checkbox"> TimedText '+
//'<input name="ns711" value="1" id="mw-search-ns711" type="checkbox"> TimedText talk '+
//'<input name="ns828" value="1" id="mw-search-ns828" type="checkbox"> Module '+
//'<input name="ns829" value="1" id="mw-search-ns829" type="checkbox"> Module talk '+
//'<input name="redirs" value="1" checked="checked" id="redirs" type="checkbox"> List redirects '+
'<input value="advanced" name="profile" type="hidden">'+
'<input value="Search" name="fulltext" type="hidden">';


document.getElementById('searchform').innerHTML=document.getElementById('searchform').innerHTML+checkboxes;