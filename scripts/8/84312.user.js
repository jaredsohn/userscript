// ==UserScript==
// @name           Northwestern Caesar Login Fix
// @namespace      http://www.caryme.com/
// @description    Fixes the awful Caesar login page
// @include        http://www.northwestern.edu/caesar/
// ==/UserScript==

var page = '<form action="https://ses.ent.northwestern.edu/psp/caesar/?cmd=login&languageCd=ENG" autocomplete="on" method="post"> \
<fieldset>\
<legend>Log in to Caesar</legend>\
<input type="hidden" name="Changed" value="" /> \
<input type="hidden" name="timezoneOffset" value="0" /> \
<label for="userid">NetID</label><input class="text" type="text" name="userid" id="userid" /> \
<label for="pwd">Password</label><input class="text" type="password" name="pwd" id="pwd" /> \
<input type="submit" name="OK" value="Log in" /> \
</legend>\
</form>';

var css = 'form { margin: 100px auto; width: 350px; height: 100px; } \
body { font-family: verdana, sans-serif; font-size: 1em; }\
input { display: block; margin: 10px auto;}\
input.text { width: 150px; font-size: 90%; }\
legend { margin: 10px; }\
'

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

var styles = document.getElementsByTagName('style');
for( var i in styles ) {
  styles[i].innerHTML = "";
}

var style = head.appendChild( document.createElement("style") );
style.innerHTML = css;
body.innerHTML = page;
