// ==UserScript==
// @name           Remove Google Redirects
// @namespace      owlhawk.net
//@description    Removes the redirect on Google search result links and allows you to copy the real url. 
// @include        http://www.google.com/#hl=en*
// @include        http://www.google.com/webhp*
// @include        http://www.google.com/search*
// @include        http://www.google.com/
// @include        http://www.google.com/#sclient*
// ==/UserScript==
 
var newScript = document.createElement('script');
newScript.innerHTML = "window.rwt = function(){return true;};";
document.getElementById("xjsi").appendChild(newScript);