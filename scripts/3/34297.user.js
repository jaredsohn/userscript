// ==UserScript==
// @name           pixnet cleaner, pixnet  pixnet.net 痞客  痞客邦  去廣告
// @namespace      http://localhost
// @description    pixnet cleaner
// @include        http://*.pixnet.net/*
// ==/UserScript==

GM_addStyle("" +<r><![CDATA[ 
*[id^="ad-"], #activity,
a[href^="http://www.pixnet.net/newdirect.php?aid="],
div[id^="box"][class="box"],
div[id*="googleadsense"][class="box"],
div#footer > a[href^="http://EMKT.pixnet.net"],
div#footer > a[href^="http://blog.pixnet.net/EMKT"],
embed[id*="headerad"]
{
  display:none !important;
}
#search {
  top: 86px !important ;
}
#header {
  max-height: 100px !important ;
}
#container2 {
  background: url('web20_suck.jpg') !important ;
}
]]></r>
);
window.wrappedJSObject.pix.chgFamousBlock(3);

