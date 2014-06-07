// ==UserScript==
// @name        Flatex Login
// @namespace   http://unknown
// @description Login to Flatex (user name and password).
// @include     https://konto.flatex.de/onlinebanking-flatex/loginFormAction.do
// @exclude     https://konto.flatex.de/onlinebanking-flatex/loginFormAction.do?doPopulate=true
// @version     1
// @grant       none
// ==/UserScript==

var user='1234567890';
var passwd='password';

document.getElementsByName('userId.text')[0].value=user;
document.getElementsByName('pin.text')[0].value=passwd;
document.getElementsByName('loginButton')[0].click();
