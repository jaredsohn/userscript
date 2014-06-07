// ==UserScript==         
// @name           ad_box
// @author         toshaman
// @description    removes the sidebar ad_box block on vkontakte.ru !(and block giftAd on the left )
// @namespace      http://userscripts.org/users/86618
// @include        http://*vkontakte.ru*
// ==/UserScript== 

 var thecss = new Array();
 if (document.styleSheets[0].cssRules) {
thecss = document.styleSheets[0].cssRules;
 } else {
thecss = document.styleSheets[0].rules; // IE
}

function hideBlock(classnm){ 

for (i=0;i<thecss.length;i++) {

 if (thecss[i].selectorText.indexOf(classnm)!=-1) {
//alert(thecss[i].selectorText);
 thecss[i].style.cssText="display:none!important;";
}
}
return true;
}

hideBlock("ad_box");
hideBlock("giftAd");