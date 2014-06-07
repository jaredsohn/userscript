// ==UserScript==
// @name        HP Integrated Lights-Out Remember Passwords
// @namespace   mailto:oskar@osk.mine.nu
// @version     1.0
// @description Enable remembering of passwords on HP Integrated Lights-Out 2 and 3 login pages
// @include     https://*/
// @include     https://*/login.htm
// @include     https://*/html/login.html
// ==/UserScript==
//
// Oskar Liljeblad <oskar@osk.mine.nu>, 2011-04-09

if (document.title == 'HP Integrated Lights-Out 2 Login') {
  var form = document.forms.namedItem("loginForm");
  if (form != null && form.elements['UN'] != null && form.elements['LI'] != null) {
    form.elements['UN'].setAttribute('type', 'text');
    form.elements['UN'].removeAttribute('onkeydown');
    form.setAttribute('onsubmit', "if (MakeCookie()) window.location.pathname='index.htm'; return false;");
    form.elements['LI'].removeAttribute('onclick');
    form.elements['LI'].setAttribute('type', 'submit');
  }
}
else if (document.title == 'Integrated Lights-Out 3') {
  var unInput = document.getElementById('usernameInput');
  var pwInput = document.getElementById('passwordInput');
  var button = document.getElementById('ID_LOGON');
  if (unInput != null && pwInput != null && button != null) {
    unInput.removeAttribute('autocomplete');
    unInput.setAttribute('onkeypress', "if (event.keyCode == 13) signIn(); return true;");
    pwInput.removeAttribute('autocomplete');
    pwInput.setAttribute('onkeypress', "if (event.keyCode == 13) signIn(); return true;");
    button.setAttribute('onclick', 'signIn(); return false;');
  }
}
