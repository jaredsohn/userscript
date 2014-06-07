// ==UserScript==
// @name        US Bank auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for US Bank
// @version     2.0.1
// @include     https://www4.usbank.com/internetBanking/RequestRouter
// @include     https://www4.usbank.com/internetBanking/RequestRouter?requestCmdId=DisplayLoginPage
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

setTimeout(function() {
   var u = document.forms[0].USERID;
   var p = document.forms[0].PSWD;
   var a = document.forms[0].ANSWER;
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter Personal ID (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
   if (a) var q = a.parentNode.parentNode.previousSibling.previousSibling.textContent.trim();
   if (u) u.value = getValue(GM_getValue('u'));
   if (p) p.value = getValue(GM_getValue('p'));
   if (a) a.value = a.form.CHALLENGEANSWER.value = getAnswer(q);
   if (u||p||a) document.forms[0].submit();
   if (!document.forms[0]) location.reload();
},10);

function getAnswer(q) {
   var i = 0;
   while (i++ < 5) {
      if(!GM_getValue('a'+i)) {
          GM_setValue('a'+i,setValue(prompt(q+'\n\n')));
          GM_setValue('q'+i,q);
      }
      if (GM_getValue('q'+i) == q) {
         return getValue(GM_getValue('a'+i));
      }
   }
}

function setValue(v) {
   if (!v) return undefined;
   return window.btoa(unescape(encodeURIComponent(v)));
}

function getValue(v) {
   return decodeURIComponent(escape(window.atob(v)));
}
