// script that redirecting some specific text 
// version 1.0

// 02.12.2011
// Copyright (c) 2011, Jakobyen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Browse ImmoScout", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yasakli Engelli sitelere direk erisim
// @namespace     
// @description   Turk Telekom un yasaklamis oldugu yasaklama sayfasinin goruntulendigi sitelere direk erisimin saglanmasi
// @include       
// ==/UserScript==

//srinput = '<span class="erisime_engellenmis"></span>';
srinput1 = '5651';
srinput2 = 'Bu siteye erişim mahkeme kararıyla engellenmiştir.';
srinput3 = 'http://www.tib.gov.tr';
srinput4 = 'is taking too long to respond';
srinput = '<span class="erisime_engellenmis"></span>';
//output='<span class="erisime_engellenmis">Siteye erişmek için <a href="' + "http://www.darcan.net/?" + window.location.href + '">tıklayın</a></span>';
output='<span class="erisime_engellenmis">Siteye erismek için <a href="' + "http://www.kirzincirleri.com/v2/browse.php?u=" + window.location.href + '">TIKLAYIN</a></span>';
//document.body.innerHTML = document.body.innerHTML.replace(srinput,output);


 var found = window.find (srinput1);
 var found2 = window.find (srinput2);
 var found3 = window.find (srinput3);
 var found4 = window.find (srinput4);
 if (!found) {
   if (!found2) {
     if (!found3) {
       if (!found4) {
          
       } else {
          window.location = "http://www.kirzincirleri.com/v2/browse.php?u=" + window.location.href;            
       }
     } else {
        window.location = "http://www.kirzincirleri.com/v2/browse.php?u=" + window.location.href;            
     }
   } else {
      window.location = "http://www.kirzincirleri.com/v2/browse.php?u=" + window.location.href;            
   }   
 } else {
    window.location = "http://www.kirzincirleri.com/v2/browse.php?u=" + window.location.href;            
 }
