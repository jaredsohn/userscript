// ==UserScript==
// @name           30boxes Auto Login
// @namespace      30boxes
// @description    Automatically logs into 30boxes when http://www.30boxes.com/login is opened and the Password manager filled in a username and password.
// @include        http://30boxes.com/login*
// @include        http://www.30boxes.com/login*
// ==/UserScript==

if ( '' != document.getElementById('email').value )
{
  document.getElementById('plaintext').checked = true;
  
  var is = document.getElementsByTagName('input');
  for ( var k = 0; k < is.length; k++ )
    if ( 'Login' == is[k].alt ) is[k].click();
}
