// ==UserScript==
// @name           all strs instances
// @namespace      http://userscripts.org/scripts/show/45328
// @include        http://localhost:8080/app
// @include        http://v3appec2/strsobvt2/app
// @include        http://v3appec2/strsobvt2/app
// @include        http://v3appec2/strsobvt/app
// @include        http://v3appec2/strsocfg/app
// @include        http://v3appec2/strsobvt2/app?service=external/MemberPages:MemberLogin
// @include        http://v3appec2/strsobvt/app?service=external/MemberPages:MemberLogin
// ==/UserScript==
  var browserUrl=window.location.href;
  var index=browserUrl.lastIndexOf('/app');
  var pageUrl=browserUrl.substr(index);
  if(document.getElementsByName('pageName')[0].value=='SCorePages:Login') {	
       document.getElementsByName('userName')[0].value='mary';
       document.getElementsByName('password')[0].value='12345678';
       document.getElementsByName('submitAction')[0].click();
  }

