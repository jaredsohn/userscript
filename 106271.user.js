// ==UserScript==
// @name           Seti pending credit link fix
// @namespace      http://sites.google.com/kenscode
// @description    Fix the Pending Credit link on your Seti@home homepage to point to a real list.
// @include        http://setiathome.berkeley.edu/home.php
// ==/UserScript==
var links = document.getElementsByTagName("A");
for(var i=0; i < links.length; i++) {
  if(links[i].href == "http://setiathome.berkeley.edu/pending.php") 
    links[i].href = links[i+2].href + "&offset=0&show_names=0&state=2&appid=";
}