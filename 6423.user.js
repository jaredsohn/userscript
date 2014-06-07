// ==UserScript==
// @name          support.netegrity.com-login
// @description   autologin: support.netegrity.com
// @version       0.1.0
// @include       https://support.netegrity.com/siteminderagent/forms/login/login.asp*
// ==/UserScript==

username = "<username>";
password = "<password>";

document.forms.namedItem('Login').elements.namedItem('USER').value = username;
document.forms.namedItem('Login').elements.namedItem('PASSWORD').value = password;
document.forms.namedItem('Login').submit();

