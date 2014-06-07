// ==UserScript==
// @name           FB Logout Button
// @description    Changes Homebutton to Logoutbutton
// ==/UserScript==

var link012 = document.getElementsByTagName("a");
for (var i123=0; link012.length>i123; i123++)
  {
  if(link012[i123].href=='https://www.facebook.com/?ref=tn_tnmn'&&link012[i123].innerHTML=='Startseite') {
    link012[i123].href = 'javascript:document.getElementById(\"logout_form\").submit();';
    link012[i123].innerHTML = 'Abmelden';
    }
  }