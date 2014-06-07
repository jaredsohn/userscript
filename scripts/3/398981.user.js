// ==UserScript==
// @name      Auto-login to Maccabi
// @namespace  http://splintor.wordpress.com/
// @version    0.1
// @description  Automatically login to new Maccabi site - you need to edit the script to put your ID and password in it.
// @match      https://online.maccabi4u.co.il/dana-na/auth/url_44/welcome.cgi
// @copyright  2012+, splintor@gmail.com
// ==/UserScript==

var username = document.getElementById("onlyyou.username");
var password = document.getElementById("onlyyou.password");
if(username && password)
{
    username.value = "<put your ID here>";
    password.value = "<put your password here>";
    combine();
}