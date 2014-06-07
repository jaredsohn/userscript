// ==UserScript==
// @name           Remove The "is" (facebook)
// @include        http://*.facebook.com/profile.php*
// @include        http://facebook.com/profile.php*
// ==/UserScript==
var e = document.getElementById("profile_status").getElementsByTagName("span")[0]
e.textContent = e.textContent.substr(3);