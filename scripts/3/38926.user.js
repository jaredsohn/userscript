// ==UserScript==
// @name           Skandiabanken - fyll inn innloggingsinfo
// @namespace      http://userscripts.org/users/59327
// @description    Fyll ut personnummer og eventuelt pin i boksen
// @include        https://secure.skandiabanken.no/SkbSecure/Authentication/Otp/Default.aspx
// ==/UserScript==

function set_fnr(fnr) {
  var box = document.getElementById('ctl00_MainContentPlaceHolder_boxLogin_txtCustomerID');
  if (box && fnr)
    box.value = fnr;
}

function get_fnr() {
  var fnr = GM_getValue('fnr', '');
  var fnr = prompt("Hvilket fødselsnummer vil du fylle inn?", fnr);
  GM_setValue('fnr', fnr);
  set_fnr(fnr);
}

function set_pin(pin) {
  var box = document.getElementById('ctl00_MainContentPlaceHolder_boxLogin_txtPin');
  if (box && pin)
    box.value = pin;
}
function get_pin() {
  var pin = GM_getValue('pin', '');
  pin = prompt("Hvilken PIN vil du fylle inn?", pin);
  GM_setValue('pin', pin);
  set_pin(pin);
}

GM_registerMenuCommand('Sett fødseslsnummer', get_fnr);
GM_registerMenuCommand('Sett PIN', get_pin);

(function() {
  if (GM_getValue('firstrun', 1)) {
     get_fnr();
     get_pin();
     GM_setValue('firstrun', 0);
  }
  else {
    set_fnr(GM_getValue('fnr', ''));
    set_pid(GM_getValue('pid', ''));
  }
})();
