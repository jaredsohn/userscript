// ==UserScript==
// @name           Neopets Login Form
// @namespace      HiddenChilli-Neopets-Login-Form
// @description    Shows a login form at every Neopets.com page. 
// @include        http://*.neopets.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var login = $('a[href*="/loginpage.phtml"]:contains("Login to Neopets!")');
if(login.length) {
  login.parent().html('\
  <form action="/login.phtml" method="post">\
    <label class="usernameLabel" for="username">Username</label>\
    <input type="text" name="username" id="username" />\
    <label class="passwordLabel" for="password">Password</label>\
    <input type="password" name="password" id="password" />\
    <input type="submit" name="login" value="Login" />\
    <input type="hidden" name="destination" value="' + location.href + '" />\
  </form>\
  ');
}