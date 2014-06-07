// ==UserScript==
// @name        Dealbook Web Live Login
// @namespace   https://dealbookweb.live.gftforex.com
// @description Automatic login to Dealbook Web Live
// @include     https://dealbookweb.live.gftforex.com/
// @grant       none
// @version     1
// ==/UserScript==

var user='username';
var passwd='password';

document.getElementsByName('userName')[0].value=user;
document.getElementsByName('passwd')[0].value=passwd;
document.getElementsByName('system')[0].value='';
document.getElementById('submitButton').click();
