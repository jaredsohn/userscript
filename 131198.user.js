// ==UserScript==
// @name        Parallels Automation Remember Password
// @namespace   mailto:oskar@osk.mine.nu
// @version     1.0
// @description Enable remembering of passwords on Parallels Automation login pages
// @include     https://*/servlet/Turbine/frm/single/
// ==/UserScript==
//
// Oskar Liljeblad <oskar@osk.mine.nu>, 2012-04-18


if (document.forms.length >= 1) {
  var form = document.forms[0];
  if (form != null && form.elements['password'] != null) {
    form.elements['password'].removeAttribute('autocomplete');
  }
}
