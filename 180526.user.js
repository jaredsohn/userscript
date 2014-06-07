// ==UserScript==
// @name        CapitalOne 360 auto-login
// @namespace   bo33b.dyndns.org
// @description Simple auto-login script for CapitalOne 360
// @version     2.0.1
// @include     https://secure.capitalone360.com/myaccount/banking/login.vm
// @include     https://secure.capitalone360.com/myaccount/banking/login_pinpad.vm
// @grant       GM_setValue
// @grant       GM_getValue
// ==/UserScript==

setTimeout(function() {
   var u = document.forms[1].publicUserId;
   var p = document.getElementById('customerAuthenticationResponse.PIN');
   if (u && !GM_getValue('u')) GM_setValue('u',setValue(prompt('Enter ID / Username (just this once)\n\n')));
   if (p && !GM_getValue('p')) GM_setValue('p',setValue(prompt('Enter PIN Code (just this once)\n\n')));
   if (u) {
      u.value = getValue(GM_getValue('u'));
      u.form.submit();
   }
   if (p) {
      document.getElementById('keyOnly').firstElementChild.style.visibility='hidden';
      document.getElementById('clickMessage').firstElementChild.click();
      for (var i=1,j='',k=document.getElementsByClassName('keypad')[1].innerHTML.split('this, &quot');i<=10;i++) j+=k[i].charAt(1);
      j = j.charAt(9)+j;
      p.value = getValue(GM_getValue('p'));
      for (var l=1,m=j.charAt(p.value.charAt(0));l<p.value.length;l++) m+=j.charAt(p.value.charAt(l));
      p.value = m;
      document.getElementById('continueButton').click();
   }
},11);

function setValue(v) {
   if (!v) return undefined;
   return window.btoa(unescape(encodeURIComponent(v)));
}

function getValue(v) {
   return decodeURIComponent(escape(window.atob(v)));
}
