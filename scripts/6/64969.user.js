// ==UserScript==
// @author         shyangs
// @name           go out Mozest directly
// @description    點擊直接打開 Mozest 論壇未經驗證的外部連結
// @namespace      http://wiki.moztw.org/index.php/User:Shyangs
// @version        1.0
// @include        http://mozest.com/outgoing.php?u=*&c=*
// @include        http://board.mozest.com/*thread*
// @license        MIT License; http://opensource.org/licenses/mit-license.php
// ==/UserScript==
var regex=/^http:\/\/mozest\.com\/outgoing\.php\?u=(\S+?)&c=.*/;//http://mozest.com/outgoing.php?u=(Base64)&c=
var L=regex(location.href);//exec
if(L!==null){//自動跳轉
  location.href=atob(L[1]);//atob() 是把 Base64 資料轉回字串。 https://developer.mozilla.org/en/DOM/window.atob
}else{//連結處理
  var A=document.getElementsByTagName('a');
  var n=A.length;
  for(var i=0;i<n;i++){
    L=regex(A[i].href);
    if(L!==null){
      A[i].href=atob(L[1]);
    }
  }
}