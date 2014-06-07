// ==UserScript==
// @name           Trademe - List a Similar Item
// @namespace      http://twitter.com/kerryemerson
// @include        http://www.trademe.co.nz/*
// @include        http://trademe.co.nz/*
// ==/UserScript==

var lsi = document.createElement("li");
var li; var c3; var c2; var c1; var c;
var ad=document.getElementsByTagName('div');

for (i=0; i<ad.length; i++)
{
   if (ad[i].className=='listingBreadCrumbs') {
      aa = ad[i].getElementsByTagName('a');

      if (aa[0].innerHTML == "Home") {
         lt = "GENERAL";
      } else if (aa[0].innerHTML == "Trade Me Motors") {
         lt = "CAR";
      } else if (aa[0].innerHTML == "Trade Me Property") {
         lt = "PROPERTY";
      } else if (aa[0].innerHTML == "Trade Me Jobs") {
         lt = "NONE";
      } else {
         lt = "NONE";
      }

      c3 = aa[aa.length-1].href;
      c2 = c3.split('/mcat-');
      if (c2.length>1) {
         c1 = c2[1].split('.htm');
         if (c1.length>1) {
            c = c1[0];
         }
      }
   }
}

lsi.innerHTML = '<li><a href="/Sell/Category.aspx?clear=y&group='+lt+'&mcat='+c+'">List a similar item</b></li>';
li = document.getElementById('SiteHeader_SideBar_Quicklinks_ListAnItem');
if (li && lt != "NONE") {
      li.parentNode.insertBefore(lsi, li.nextSibling);
}

