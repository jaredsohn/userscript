// --------------------------------------------------------------------------
// ==UserScript==
// @name           Show Bangumi ID
// @description    show bangumi id
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
//
// --------------------------------------------------------------------------


var nicks = document.getElementsByTagName("strong");
for (j = 0; j < nicks.length; j++)
  {if (nicks[j].parentNode.className == "inner"){
   var id = nicks[j].firstChild.href.split("/")[4];
   var text = nicks[j].textContent;
   nicks[j].firstChild.textContent = text + "(id: " + id + ")";
  }
  }