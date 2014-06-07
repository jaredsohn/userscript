// ==UserScript==
// @name       Facepunch Logout
// @namespace  http://facepunch.com/member.php?u=446188
// @version    1
// @description  adds a logout link to Facepunch
// @match      *facepunch.com/*
// @copyright  2012+, BTYM
// ==/UserScript==

if (document.URL.match(/.*facepunch\.com\/login\.php\?do=logout/))
    document.location = document.getElementsByClassName("blockrow restore")[0].getElementsByTagName("a")[0].href;

if (!document.getElementById("navbar_loginform"))
{
    var x = document.getElementById("navbar-login");
    var logout = document.createElement("a");
    logout.href = "login.php?do=logout";
    logout.innerText = "Log out";
    x.align = "right";
    x.appendChild(document.createElement("br"));
    x.appendChild(logout);
}