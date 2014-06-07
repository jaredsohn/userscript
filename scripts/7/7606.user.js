// ==UserScript==
// @name          Userscripts.org Login Bar
// @namespace     http://azrael.awardspace.co.uk/
// @description   A login bar for userscripts.org.
// @author        Peter "Azrael" Bunyan
// @include       http://userscripts.org/*
// @include       http://www.userscripts.org/*
// ==/UserScript==

login = document.getElementsByTagName('a')[4]
form = '<h5>Login</h5> \n\
<form action="/sessions" method="post" style="font-size: 125%;"> \n\
<p> \n\
  <label for="login">Email</label><br /> \n\
  <input id="login" name="login" type="text" /> \n\
</p> \n\
<p> \n\
  <label for="password">Password</label><br /> \n\
  <input id="password" name="password" type="password" /> \n\
</p> \n\
<input name="commit" type="submit" value="Login" /> \n\
</form>';
if (login.href.indexOf('/login') != -1) {
    document.getElementById('right').innerHTML = form + document.getElementById('right').innerHTML;
}
