// ==UserScript==
// @name       Log in to Buzzport/T-square
// @namespace  twitter.com/brandonchastain
// @version    0.1
// @description  Auto logs you in. Make sure to fill in your username and password in the blanks.
// @match      https://login.gatech.edu/cas/login*
// @copyright  August 2012, Brandon Chastain
// ==/UserScript==

var username = 'xxxxxxxxxxxx';
var password = 'xxxxxxxxxxxx';

var currentLocation = document.location.toString();

var div = document.createElement("div");
div.appendChild(document.createTextNode("Logging you in..."));
div.setAttribute("style","font-size: 20; background-color: white; height: 100px;");
document.body.insertBefore(div, document.getElementById('header'));
document.getElementById('username').value = username;
document.getElementById('password').value = password;
document.getElementsByClassName('btn-submit')[0].click();