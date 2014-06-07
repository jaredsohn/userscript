// ==UserScript==
// @name Reddit Battlefield3 Profile Linker
// @version 1.3
// @description This will link a bf3 username in theflair to the battlefield 3 user profile
// @namespace http://userscripts.org/users/121730
// @include http://*.reddit.com/r/battlefield3*
// @include http://reddit.com/r/battlefield3*
// ==/UserScript==


flairs = document.getElementsByClassName('flair');
for( var i=0; i < flairs.length; i++){
  flair = flairs[i];
  username = flair.innerHTML;
  flair.innerHTML = '<a target="_blank" style="color: inherit;" href="http://battlelog.battlefield.com/bf3/user/' + username + '/">' + username + '</a>';
}
