// ==UserScript==
// @name          enhanced TwitterAutoLogin
// @description   Signs you in automatically on twitter
// @include       *twitter.com/
// @include       https://twitter.com/login
// ==/UserScript==


// enter personal info
var usr = "USERNAME_HERE"
var pas = "PASSWORD_HERE"


//----do not edit anything below this line-------
if (document.getElementById('have_an_account')) {location.href='https://twitter.com/login'}
else{
var input = document.getElementById("username_or_email");
var pass = document.getElementById("password");
input.value = usr;
pass.value = pas;
var evt = document.createEvent('MouseEvents'); 
evt.initMouseEvent('click', true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null); 
var el = document.getElementById('signin_submit');  
el.dispatchEvent(evt);
}