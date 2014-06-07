// ==UserScript==
// @name        Youtube opt in Ads per channel
// @namespace   schippi
// @include     http://www.youtube.com/watch*
// @version     1
// ==/UserScript==

var u = window.location.href;
if(u.search("user=") == -1){
   var cont = document.getElementById("watch7-user-header").innerHTML;
   var user=cont.replace(/.+\/user\//i,'').replace(/\?(?:.|\s)*/m,''); 
   window.location = u+"&user="+user;
}