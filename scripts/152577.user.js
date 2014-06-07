// ==UserScript==
// @name        First Niagara Bank auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for First Niagara Bank
// @version     2.0.1
// @include     https://online1.openbank.com/fi71023/retail/logon
// @include     https://online1.openbank.com/fi71023/retail/logon/mfa/password
// @include     https://online1.openbank.com/fi71023/retail/logon/mfa/challenge*
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

favicon();

setTimeout(function() {
   var u = document.forms[0].j_username;
   var p = document.forms[0].password;
   var a = document.forms[0].answer;
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter Login ID (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
   if (a) var q = document.getElementsByClassName('regEntryTopLf')[6].innerHTML.split('(')[0];
   if (u) u.value = getValue(GM_getValue('u'));
   if (p) p.value = getValue(GM_getValue('p'));
   if (a) a.value = getAnswer(q);
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
   link.href = 'https://www.firstniagara.com/favicon.ico';
   document.getElementsByTagName('head')[0].appendChild(link);
}
