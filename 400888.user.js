// ==UserScript==
// @name   safari.user.js
// @include http://*.2ch.net/*
// @include http://unkar.org/*
// @include http://jbbs.shitaraba.net/*
// @include http://*.bbspi*.com/*
// @exclude */get_domain.php*
// @exclude */bbs/writebox.cgi/*
// @exclude */p2.2ch.io/getf.cgi?*
// @author  LicenseFreeSoftware (CC BY-SA 3.0)
// @licence http://creativecommons.org/licenses/by-sa/3.0/deed.ja
// ==/UserScript==

(function(){if(''!=document.title){
  var ele=document.createElement('div');ele.id='sleipnir.user.js';ele.innerHTML="<style>*{font-weight: !important;font-size:9pt !important;"+
      "font-family:MeiryoKe_PGothic,'Helvetica Neue',Arial,Helvetica,'Lucida Grande','Hiragino Kaku Gothic ProN','ヒラギノ角ゴ ProN W3',Meiryo,メイリオ,'Meiryo UI',sans-serif !important;}</style>";
  var objBody=document.getElementsByTagName('body').item(0);
objBody.appendChild(ele);}})();