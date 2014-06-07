// ==UserScript==
// @name           URLfixer
// @namespace      dfifcw
// @description    fix the url, make bjtu personal information system compatible with firefox
// @include        http://202.112.154.84:7777/zhxt_bks/*.html
// ==/UserScript==

window.addEventListener("DOMFrameContentLoaded", method, true);

function method(){
  
  var test = window.frames[0];

  var as = test.document.getElementsByTagName('a');

  as[0].href = "http://202.112.154.84:7777/pls/wwwpub/bks.loginwindow"
  as[1].href = "http://202.112.154.84:7777/pls/wwwpub/bks.NewPass"
  as[2].href = " http://202.112.154.84:7777/pls/wwwpub/bks.Logout"
  as[3].href = "http://202.112.154.84:7777/pls/wwwpub/bks.xjcx"
  as[4].href = " http://202.112.154.84:7777/pls/wwwpub/bkscjcx.jxjh";
  as[5].href = "http://202.112.154.84:7777/pls/wwwpub/bkscjcx.yxkc";
  as[6].href = "http://202.112.154.84:7777/pls/wwwpub/bkscjcx.curscopre";
  as[7].href = " http://202.112.154.84:7777/pls/wwwpub/bkscjcx.bjgkc";
}