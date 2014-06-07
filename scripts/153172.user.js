// ==UserScript==
// @name        Commerce Bank auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for Commerce Bank
// @version     2.0.1
// @include     https://bankcardsonline.commercebank.com/CommerceBank_Consumer/Login.do
// @include     https://bankcardsonline.commercebank.com/CommerceBank_Consumer/ProcessLogin.do
// @include     https://bankcardsonline.commercebank.com/CommerceBank_Consumer/SecondaryAuthMultiple.do
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

favicon();

setTimeout(function() {
   var u = document.forms[0].username;
   var p = document.forms[0].password;
   var a = document.forms[0].hintanswer;
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter User name (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
   if (a) var q = document.getElementsByClassName('normaltext_SIDE')[0].innerHTML.trim();
   if (u) u.value = getValue(GM_getValue('u'));
   if (p){p.value = getValue(GM_getValue('p')); p.setAttribute('autocomplete','off')};
   if (a){a.value = getAnswer(q); a.setAttribute('autocomplete','off')};
   document.forms[0].submit();
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

function favicon() {
   var link = document.createElement('link');
   link.rel = 'shortcut icon';
   link.type = 'image/x-icon';
   link.href = 'https://www.commercebank.com/favicon.ico';
   document.getElementsByTagName('head')[0].appendChild(link);
}
