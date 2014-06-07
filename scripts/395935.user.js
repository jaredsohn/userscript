// ==UserScript==
// @name        CapitalOne Banking auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for CapitalOne banking
// @version     1.0b
// @include     https://banking.capitalone.com/
// @include     https://onlinebanking.capitalone.com/CapitalOne/SelfService/ChangeSecurityQuestionMFA.asp*
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

var i = setInterval(function() {
   var u = document.getElementById('hb-uid');
   var p = document.getElementById('hb-pw');
   var a = document.getElementById('ctlWorkflow_mfaChallengeUserControl_txtSecurityAnswer1');
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter User ID (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
   if (a) var q = document.getElementById('ctlWorkflow_mfaChallengeUserControl_litUserSecurityQuestion1').innerHTML;
   if (u) u.value = getValue(GM_getValue('u'));
   if (p) p.value = getValue(GM_getValue('p'));
   if (a) a.value = getAnswer(q);
   if (u == document.activeElement) {clearInterval(i);setTimeout('document.getElementById("submit-bank-hb").click();',1500)};
   if (a) {clearInterval(i);document.getElementById('ctlWorkflow_mfaChallengeUserControl_btnChallengeSubmit').click()};
},200);

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
