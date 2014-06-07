// ==UserScript==
// @name        Guru.com sign-in password box paste/drag/drop/copy enabler
// @description Restores functionality that Guru.com senselessly disables
// @namespace   D05C5EFF-C03F-48AE-8FCF-25D79DA7FB63
// @include     https://www.guru.com/login.aspx*
// @version     1
// @grant       none
// ==/UserScript==
 
// grab the password box
var passwordBox = document.getElementById('ucLogin_txtPassword_txtPassword_TextBox');
if( !passwordBox ) {
    // if not found, show warning.
    alert('Password box not located.  Oops');
} else {
    // if found, undo Guru.com's damage
    passwordBox.removeAttribute('onpaste');
    passwordBox.removeAttribute('ondrop');
    passwordBox.removeAttribute('ondrag');
    passwordBox.removeAttribute('oncopy');
}