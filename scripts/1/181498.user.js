// ==UserScript==
// @name        CapitalOne Credit auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for CapitalOne credit accounts
// @version     2.0.2
// @include     https://servicing.capitalone.com/c1/Login.aspx
// @include     https://login1.capitalone.com/loginweb/login/login.do
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

favicon();

setTimeout(function() {
   var u = document.forms[0].user;
   var p = document.forms[0].password;
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter User name (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter Password (just this once)\n\n')));
   if (u) u.value = document.forms[0].username.value = getValue(GM_getValue('u'));
   if (p) p.value = getValue(GM_getValue('p'));
   if (u) document.getElementById('cofisso_btn_login').click();
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
   link.href = 'https://www.capitalone.com/favicon.ico';
   document.getElementsByTagName('head')[0].appendChild(link);
}
