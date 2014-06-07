// ==UserScript==
// @name           I Don't Know You People
// @namespace      bushi.net.nz
// @description    Selects "stranger" for all people on an OldFriends page. Then you can choose the ones you really know.
// @include        http://www.oldfriends.co.nz/*
// ==/UserScript==

var yesNo=document.getElementsByTagName('input');

for( i=0 ; i<yesNo.length ; i++ ) {
  if(yesNo[i].value=='stranger'){
    yesNo[i].checked=true;
  }
}
